/// <reference path="../pb_data/types.d.ts" />

// Public: the copy overrides a tracked link shows. Returns only the bound variant's overlays, never the
// company, role, notes, status or ids, because codes are company slugs anyone could guess.
routerAdd("GET", "/api/variant/{code}", (e) => {
  const lib = require(`${__hooks}/lib.js`);
  const code = String(e.request.pathValue("code") || "").toLowerCase();
  if (!lib.CODE.test(code)) return e.json(404, { message: "not found" });

  let variant;
  try {
    const application = e.app.findFirstRecordByFilter(
      "applications",
      "trackingCode = {:code}",
      { code },
    );
    const variantId = application.getString("variant");
    if (!variantId) return e.json(404, { message: "not found" });
    variant = e.app.findRecordById("variants", variantId);
  } catch (_) {
    return e.json(404, { message: "not found" });
  }

  e.response.header().set("Cache-Control", "public, max-age=60");
  return e.json(200, {
    zh: lib.overlay(variant, "zh"),
    en: lib.overlay(variant, "en"),
  });
});

// A variant that a sent application uses is what that company saw: keep it as a snapshot.
onRecordUpdateRequest((e) => {
  const lib = require(`${__hooks}/lib.js`);
  if (lib.isSent(e.app, e.record.id, lib.DRAFT))
    throw new BadRequestError(lib.LOCKED);
  return e.next();
}, "variants");

onRecordDeleteRequest((e) => {
  const lib = require(`${__hooks}/lib.js`);
  if (lib.isSent(e.app, e.record.id, lib.DRAFT))
    throw new BadRequestError(lib.LOCKED);
  return e.next();
}, "variants");

// A new or changed tracking code must be a slug that does not read as a share channel: `line-pm` would be
// counted as LINE traffic and the site's head script never loads a variant for it.
onRecordCreateRequest((e) => {
  const lib = require(`${__hooks}/lib.js`);
  const code = e.record.getString("trackingCode");
  const problem = code ? lib.codeProblem(code) : null;
  if (problem) throw new BadRequestError(problem);
  return e.next();
}, "applications");

onRecordUpdateRequest((e) => {
  const lib = require(`${__hooks}/lib.js`);
  const code = e.record.getString("trackingCode");
  const problem =
    code && code !== e.record.original().getString("trackingCode")
      ? lib.codeProblem(code)
      : null;
  if (problem) throw new BadRequestError(problem);
  return e.next();
}, "applications");

// Once an application is sent, what the company received is fixed: its variant and code stay, and it
// cannot go back to the draft status (which would unlock both, and the variant with them).
onRecordUpdateRequest((e) => {
  const lib = require(`${__hooks}/lib.js`);
  const before = e.record.original();
  if (before.getString("status") !== lib.DRAFT) {
    const changed = ["variant", "trackingCode"].some(
      (f) => before.getString(f) !== e.record.getString(f),
    );
    if (changed || e.record.getString("status") === lib.DRAFT)
      throw new BadRequestError(lib.SENT);
  }
  return e.next();
}, "applications");

// Owner only: opens per tracking code from Umami Cloud. The API key stays in this server's environment.
// One breakdown call covers every code's views and visits; last-seen needs one sessions call per code.
// Each code's result is cached for 5 minutes so reloading the admin does not repeat Umami requests.
routerAdd(
  "GET",
  "/api/stats",
  (e) => {
    const lib = require(`${__hooks}/lib.js`);
    const key = $os.getenv("UMAMI_API_KEY");
    const website = $os.getenv("UMAMI_WEBSITE_ID") || lib.UMAMI_WEBSITE;
    if (!key) return e.json(503, { message: "Umami 尚未設定" });

    const codes = String(e.request.url.query().get("codes") || "")
      .split(",")
      .map((c) => c.trim().toLowerCase())
      .filter((c, i, all) => lib.CODE.test(c) && all.indexOf(c) === i)
      // lib/adminApi.ts STATS_BATCH sends at most this many per call, so nothing is dropped silently.
      .slice(0, 100);

    const now = Date.now();
    const store = $app.store();
    const fresh = (code) => {
      const cached = store.get(`stats:${code}`);
      return cached && now - cached.at < lib.STATS_TTL_MS ? cached.value : null;
    };
    const missing = codes.filter((code) => !fresh(code));

    if (missing.length) {
      const range = `startAt=${now - lib.STATS_DAYS * 86400000}&endAt=${now}`;
      const call = (path) => {
        const res = $http.send({
          url: `${lib.UMAMI_API}/websites/${website}${path}`,
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${key}`,
          },
          timeout: 15,
        });
        if (res.statusCode !== 200) throw new Error(`umami ${res.statusCode}`);
        return res.json;
      };
      try {
        const rows =
          call(`/metrics/expanded?${range}&type=utmSource&limit=500`) || [];
        for (const code of missing) {
          const row = rows.find((r) => String(r.name).toLowerCase() === code);
          let lastSeen = null;
          if (row && row.visits) {
            const sessions = call(
              `/sessions?${range}&utmSource=${encodeURIComponent(code)}&page=1&pageSize=1`,
            );
            lastSeen =
              sessions && sessions.data && sessions.data.length
                ? sessions.data[0].lastAt
                : null;
          }
          const value = {
            code,
            views: row ? row.pageviews : 0,
            visits: row ? row.visits : 0,
            lastSeen,
          };
          store.set(`stats:${code}`, { at: now, value });
        }
      } catch (err) {
        e.app.logger().warn("umami stats failed", "error", String(err));
        return e.json(503, { message: "無法取得" });
      }
    }
    return e.json(
      200,
      codes.map((code) => fresh(code)),
    );
  },
  $apis.requireAuth("owners"),
);

// `./pocketbase owner EMAIL PASSWORD` creates the admin's sign-in account, or resets its password,
// so setup never needs the PocketBase dashboard.
$app.rootCmd.addCommand(
  new Command({
    use: "owner",
    short: "Create or update the /admin/ sign-in account",
    run: (cmd, args) => {
      if (args.length !== 2)
        throw new Error("usage: pocketbase owner EMAIL PASSWORD");
      const [email, password] = args;
      if (password.length < 12)
        throw new Error("password must be at least 12 characters");
      let record;
      try {
        record = $app.findAuthRecordByEmail("owners", email);
      } catch (_) {
        record = new Record($app.findCollectionByNameOrId("owners"));
        record.setEmail(email);
        record.setVerified(true);
      }
      record.setPassword(password);
      $app.save(record);
      console.log(`owner ${email} saved`);
    },
  }),
);
