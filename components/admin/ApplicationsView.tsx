"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  DRAFT,
  STATUSES,
  deleteApplication,
  fileUrl,
  liveSiteVersion,
  saveApplication,
  type Application,
  type Status,
} from "@/lib/adminApi";
import { SITE_ORIGIN } from "@/lib/locale";
import { CHANNEL_MEDIUM } from "@/lib/analytics";
import { isChannelCode, SHORT_CODE_PATTERN } from "@/lib/shortCode";
import { LINK_PAGES, trackedUrl, type LinkPage } from "@/lib/trackedLink";
import type { Desk } from "./AdminApp";
import styles from "./admin.module.css";

const CODE = new RegExp(SHORT_CODE_PATTERN);

/** Why a tracking code cannot be used, or null when it can. The backend repeats both checks. */
function codeProblem(code: string): string | null {
  if (!CODE.test(code))
    return "追蹤代碼只能用英文小寫、數字、- 或 _，最長 40 字，例如 acme 或 acme-pm";
  if (isChannelCode(code, CHANNEL_MEDIUM))
    return `「${code.split("-")[0]}」是分享渠道的名稱，用它開頭的代碼會被當成渠道流量，客製版本也不會顯示。改用公司名開頭，例如 acme 或 acme-pm。`;
  return null;
}
const ACTIVE: Status[] = ["已投遞", "面試中", "錄取"];
const CLOSED: Status[] = ["未錄取", "已婉拒"];

function tone(status: Status) {
  if (ACTIVE.includes(status)) return "active";
  if (CLOSED.includes(status)) return "closed";
  return undefined;
}

/** "3 天前" style, from an ISO time. */
function ago(iso: string): string {
  const minutes = Math.max(
    0,
    Math.round((Date.now() - new Date(iso).getTime()) / 60000),
  );
  if (minutes < 60) return minutes <= 1 ? "剛剛" : `${minutes} 分鐘前`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} 小時前`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days} 天前`;
  return new Date(iso).toLocaleDateString("zh-TW");
}

async function copy(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function ApplicationsView({ desk }: { desk: Desk }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status | "">("");
  const [editing, setEditing] = useState<Application | "new" | null>(null);
  const [copied, setCopied] = useState("");
  const variantName = useMemo(
    () => new Map(desk.variants.map((v) => [v.id, v.name])),
    [desk.variants],
  );

  const shown = desk.applications.filter((a) => {
    if (status && a.status !== status) return false;
    const q = query.trim().toLowerCase();
    return (
      !q ||
      [a.company, a.role, a.requirements, a.notes, a.trackingCode]
        .join("\n")
        .toLowerCase()
        .includes(q)
    );
  });

  function opens(a: Application) {
    if (!a.trackingCode)
      return <span className={styles.never}>沒有追蹤連結</span>;
    if (desk.stats === "unavailable")
      return <span className={styles.never}>無法取得</span>;
    if (!desk.stats) return <span className={styles.never}>讀取中…</span>;
    const stat = desk.stats[a.trackingCode];
    if (!stat || !stat.visits)
      return <span className={styles.never}>還沒開啟</span>;
    return (
      <>
        <strong>{stat.visits}</strong> 次造訪・{stat.views} 頁
        {stat.lastSeen ? (
          <span className={styles.sub}>最近 {ago(stat.lastSeen)}</span>
        ) : null}
      </>
    );
  }

  return (
    <section aria-labelledby="applications-title">
      <div className={styles.head}>
        <div>
          <h1 id="applications-title" className={styles.title}>
            投遞
          </h1>
          <p className={styles.lede}>
            每家公司拿到哪一版、哪個連結，對方有沒有打開。
          </p>
        </div>
        <button
          type="button"
          className={styles.primary}
          onClick={() => setEditing("new")}
        >
          新增投遞
        </button>
      </div>

      <div className={styles.toolbar}>
        <input
          id="applications-search"
          type="search"
          className={`${styles.input} ${styles.search}`}
          placeholder="搜尋公司、職位、職缺要求"
          aria-label="搜尋投遞"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className={styles.chips} role="group" aria-label="依狀態篩選">
          <button
            type="button"
            className={styles.chip}
            aria-pressed={status === ""}
            onClick={() => setStatus("")}
          >
            全部 {desk.applications.length}
          </button>
          {STATUSES.map((s) => {
            const count = desk.applications.filter(
              (a) => a.status === s,
            ).length;
            return (
              <button
                key={s}
                type="button"
                className={styles.chip}
                aria-pressed={status === s}
                onClick={() => setStatus(status === s ? "" : s)}
              >
                {s} {count}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.tableWrap}>
        {shown.length ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">公司／職位</th>
                <th scope="col">狀態</th>
                <th scope="col">投遞日</th>
                <th scope="col">版本</th>
                <th scope="col">開啟紀錄</th>
                <th scope="col">代碼／連結</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((a) => (
                <tr
                  key={a.id}
                  className={styles.row}
                  tabIndex={0}
                  onClick={() => setEditing(a)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setEditing(a);
                  }}
                >
                  <td>
                    <span className={styles.company}>{a.company}</span>
                    <span className={styles.sub}>
                      {a.role || "（未填職位）"}
                    </span>
                  </td>
                  <td>
                    <span className={styles.status} data-tone={tone(a.status)}>
                      {a.status}
                    </span>
                  </td>
                  <td>{a.appliedOn ? a.appliedOn.slice(0, 10) : "未填"}</td>
                  <td>
                    {a.variant ? (
                      (variantName.get(a.variant) ?? "（已刪除）")
                    ) : (
                      <span className={styles.never}>主站</span>
                    )}
                    {a.siteVersion ? (
                      <span className={`${styles.sub} ${styles.mono}`}>
                        網站 {a.siteVersion}
                      </span>
                    ) : null}
                  </td>
                  <td className={styles.opens}>{opens(a)}</td>
                  <td>
                    {a.trackingCode ? (
                      <span className={`${styles.sub} ${styles.mono}`}>
                        {a.trackingCode}
                      </span>
                    ) : null}
                    {a.trackingUrl ? (
                      <button
                        type="button"
                        className={styles.button}
                        onClick={async (e) => {
                          e.stopPropagation();
                          if (await copy(a.trackingUrl)) {
                            setCopied(a.id);
                            setTimeout(() => setCopied(""), 1500);
                          }
                        }}
                      >
                        {copied === a.id ? "已複製" : "複製連結"}
                      </button>
                    ) : (
                      <span className={styles.never}>未產生</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={styles.empty}>
            {desk.applications.length ? (
              <p>沒有符合的投遞，換個關鍵字或狀態試試。</p>
            ) : (
              <>
                <p>
                  還沒有投遞紀錄。新增第一筆：公司、職缺要求、要給哪一版，然後產生追蹤連結寄出去。
                </p>
                <button
                  type="button"
                  className={styles.primary}
                  onClick={() => setEditing("new")}
                >
                  新增投遞
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {editing ? (
        <ApplicationEditor
          key={editing === "new" ? "new" : editing.id}
          desk={desk}
          application={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
        />
      ) : null}
    </section>
  );
}

function ApplicationEditor({
  desk,
  application,
  onClose,
}: {
  desk: Desk;
  application: Application | null;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Partial<Application>>(
    () =>
      application ?? {
        company: "",
        role: "",
        status: DRAFT,
        appliedOn: new Date().toISOString().slice(0, 10),
        jobUrl: "",
        requirements: "",
        resumeVersion: "",
        siteVersion: "",
        trackingCode: "",
        trackingUrl: "",
        notes: "",
        variant: "",
      },
  );
  const [file, setFile] = useState<File | null>(null);
  const [page, setPage] = useState<LinkPage>("resume");
  const [english, setEnglish] = useState(false);
  const [message, setMessage] = useState<{
    tone?: "error" | "ok";
    text: string;
  }>({ text: "" });
  const [busy, setBusy] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  // A new application records the site build the company will see.
  useEffect(() => {
    if (application) return;
    void liveSiteVersion(location.origin).then((commit) => {
      if (commit)
        setForm((f) => (f.siteVersion ? f : { ...f, siteVersion: commit }));
    });
  }, [application]);

  const set = <K extends keyof Application>(key: K, value: Application[K]) =>
    setForm((f) => ({ ...f, [key]: value }));
  const code = (form.trackingCode ?? "").trim().toLowerCase();
  // Sent applications keep the variant and link the company received; the backend enforces the same rule.
  const sent = Boolean(application && application.status !== DRAFT);
  const duplicate = code
    ? desk.applications.find(
        (a) => a.trackingCode === code && a.id !== application?.id,
      )
    : undefined;

  function makeLink() {
    const problem = codeProblem(code);
    if (problem) {
      setMessage({ tone: "error", text: problem });
      return;
    }
    if (duplicate) {
      // One code names one recipient: the backend keeps codes unique, and the variant link resolves by code.
      setMessage({
        tone: "error",
        text: `「${code}」已經給了 ${duplicate.company}。換一個代碼，例如 ${code}-2。`,
      });
      return;
    }
    setForm((f) => ({
      ...f,
      trackingCode: code,
      trackingUrl: trackedUrl(SITE_ORIGIN, code, page, english),
    }));
    setMessage({
      tone: "ok",
      text: "連結已產生，記得儲存。代碼對方看得到，不要用人名。",
    });
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!form.company?.trim()) {
      setMessage({ tone: "error", text: "請填公司名稱" });
      return;
    }
    const problem = code ? codeProblem(code) : null;
    if (problem && !sent) {
      setMessage({ tone: "error", text: problem });
      return;
    }
    setBusy(true);
    try {
      const { id: _id, resumeFile: _file, updated: _updated, ...fields } = form;
      await saveApplication(
        application?.id ?? null,
        { ...fields, trackingCode: code },
        file,
      );
      await desk.reload();
      onClose();
    } catch (error) {
      if (!desk.onAuthLost(error))
        setMessage({
          tone: "error",
          text: error instanceof Error ? error.message : String(error),
        });
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!application) return;
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setBusy(true);
    try {
      await deleteApplication(application.id);
      await desk.reload();
      onClose();
    } catch (error) {
      if (!desk.onAuthLost(error))
        setMessage({
          tone: "error",
          text: error instanceof Error ? error.message : String(error),
        });
      setBusy(false);
    }
  }

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      <form
        className={styles.drawer}
        onSubmit={submit}
        role="dialog"
        aria-modal="true"
        aria-labelledby="editor-title"
      >
        <div className={styles.drawerHead}>
          <h2 id="editor-title" className={styles.drawerTitle}>
            {application ? application.company : "新增投遞"}
          </h2>
          <button type="button" className={styles.ghost} onClick={onClose}>
            關閉
          </button>
        </div>

        <div className={styles.drawerBody}>
          <div className={styles.form}>
            <label className={styles.field}>
              <span className={styles.label}>公司</span>
              <input
                id="app-company"
                className={styles.input}
                value={form.company ?? ""}
                onChange={(e) => set("company", e.target.value)}
                required
                autoFocus
              />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>職位</span>
              <input
                id="app-role"
                className={styles.input}
                value={form.role ?? ""}
                onChange={(e) => set("role", e.target.value)}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>狀態</span>
              <select
                id="app-status"
                className={styles.select}
                value={form.status}
                onChange={(e) => set("status", e.target.value as Status)}
              >
                {STATUSES.map((s) => (
                  <option key={s} disabled={sent && s === DRAFT}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
            <label className={styles.field}>
              <span className={styles.label}>投遞日</span>
              <input
                id="app-applied"
                type="date"
                className={styles.input}
                value={(form.appliedOn ?? "").slice(0, 10)}
                onChange={(e) => set("appliedOn", e.target.value)}
              />
            </label>
            <label className={`${styles.field} ${styles.full}`}>
              <span className={styles.label}>職缺連結</span>
              <input
                id="app-job-url"
                type="url"
                className={styles.input}
                placeholder="https://www.104.com.tw/job/…"
                value={form.jobUrl ?? ""}
                onChange={(e) => set("jobUrl", e.target.value)}
              />
            </label>
            <label className={`${styles.field} ${styles.full}`}>
              <span className={styles.label}>職缺要求</span>
              <textarea
                id="app-requirements"
                className={styles.textarea}
                rows={6}
                placeholder="貼上職缺的能力要求，之後寫版本時對照用"
                value={form.requirements ?? ""}
                onChange={(e) => set("requirements", e.target.value)}
              />
            </label>

            <div className={`${styles.group} ${styles.full}`}>
              <p className={styles.groupTitle}>給對方的版本</p>
              <label className={styles.field}>
                <span className={styles.label}>綁定版本</span>
                <select
                  id="app-variant"
                  disabled={sent}
                  className={styles.select}
                  value={form.variant ?? ""}
                  onChange={(e) => set("variant", e.target.value)}
                >
                  <option value="">主站（不客製）</option>
                  {desk.variants.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name}
                    </option>
                  ))}
                </select>
              </label>
              <p className={styles.hint}>
                狀態改成「準備中」以外後，這個版本就會鎖定，對方看到的內容不會再變。
              </p>

              <div className={styles.linkRow}>
                <label className={styles.field}>
                  <span className={styles.label}>追蹤代碼</span>
                  <input
                    id="app-code"
                    disabled={sent}
                    className={`${styles.input} ${styles.mono}`}
                    placeholder="acme-pm"
                    value={form.trackingCode ?? ""}
                    onChange={(e) => {
                      // A link made for the old code would point nowhere once saved: drop it until regenerated.
                      setForm((f) => ({
                        ...f,
                        trackingCode: e.target.value,
                        trackingUrl: "",
                      }));
                    }}
                  />
                </label>
                <label className={styles.field}>
                  <span className={styles.label}>連到哪一頁</span>
                  <select
                    id="app-page"
                    className={styles.select}
                    value={page}
                    onChange={(e) => setPage(e.target.value as LinkPage)}
                  >
                    {Object.entries(LINK_PAGES).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className={styles.field}>
                  <span className={styles.label}>語言</span>
                  <select
                    id="app-lang"
                    className={styles.select}
                    value={english ? "en" : "zh"}
                    onChange={(e) => setEnglish(e.target.value === "en")}
                  >
                    <option value="zh">中文</option>
                    <option value="en">English</option>
                  </select>
                </label>
                <button
                  type="button"
                  className={styles.button}
                  onClick={makeLink}
                  disabled={sent}
                >
                  產生連結
                </button>
              </div>
              <div className={styles.copyRow}>
                <input
                  id="app-url"
                  className={`${styles.input} ${styles.mono}`}
                  aria-label="寄出的連結"
                  placeholder="產生後會出現在這裡"
                  value={form.trackingUrl ?? ""}
                  onChange={(e) => set("trackingUrl", e.target.value)}
                />
                <button
                  type="button"
                  className={styles.button}
                  disabled={!form.trackingUrl}
                  onClick={async () => {
                    if (form.trackingUrl && (await copy(form.trackingUrl)))
                      setMessage({ tone: "ok", text: "已複製連結" });
                  }}
                >
                  複製
                </button>
              </div>
              {form.variant && form.trackingCode ? (
                <p className={styles.hint}>
                  寄出前可以先開「版本」分頁的預覽，確認對方會看到什麼。
                </p>
              ) : null}
            </div>

            <label className={styles.field}>
              <span className={styles.label}>網站版本</span>
              <input
                id="app-site-version"
                className={`${styles.input} ${styles.mono}`}
                placeholder="寄出時線上的 commit"
                value={form.siteVersion ?? ""}
                onChange={(e) => set("siteVersion", e.target.value)}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>履歷版本</span>
              <input
                id="app-resume-version"
                className={styles.input}
                placeholder="例如 PDF 檔名或 commit"
                value={form.resumeVersion ?? ""}
                onChange={(e) => set("resumeVersion", e.target.value)}
              />
            </label>
            <div className={`${styles.field} ${styles.full}`}>
              <span className={styles.label}>寄出的履歷 PDF</span>
              <input
                id="app-file"
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
              {application?.resumeFile && !file ? (
                <button
                  type="button"
                  className={styles.ghost}
                  onClick={async () => {
                    try {
                      window.open(
                        await fileUrl(application),
                        "_blank",
                        "noopener",
                      );
                    } catch (error) {
                      setMessage({
                        tone: "error",
                        text:
                          error instanceof Error
                            ? error.message
                            : String(error),
                      });
                    }
                  }}
                >
                  打開已上傳的 {application.resumeFile}
                </button>
              ) : null}
            </div>
            <label className={`${styles.field} ${styles.full}`}>
              <span className={styles.label}>備註</span>
              <textarea
                id="app-notes"
                className={styles.textarea}
                rows={3}
                value={form.notes ?? ""}
                onChange={(e) => set("notes", e.target.value)}
              />
            </label>
          </div>
        </div>

        <div className={styles.drawerFoot}>
          <button type="submit" className={styles.primary} disabled={busy}>
            {busy ? "儲存中…" : "儲存"}
          </button>
          <button type="button" className={styles.ghost} onClick={onClose}>
            取消
          </button>
          <p
            className={styles.message}
            data-tone={message.tone}
            role="status"
            style={{ flex: 1 }}
          >
            {message.text}
          </p>
          {application ? (
            <button
              type="button"
              className={styles.danger}
              onClick={remove}
              disabled={busy}
            >
              {confirmDelete ? "再按一次確認刪除" : "刪除"}
            </button>
          ) : null}
        </div>
      </form>
    </>
  );
}
