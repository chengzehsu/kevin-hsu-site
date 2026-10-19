/// <reference path="../pb_data/types.d.ts" />
// The admin at /admin/ on the site signs in as an `owners` record, never as a superuser, so a leaked browser
// token can read and edit job-search data but cannot change schema or settings. Nobody can sign up: the
// single owner is created from the CLI (see README). Variants hold the copy overrides a tracked link shows.
const OWNER = '@request.auth.collectionName = "owners"';

migrate(
  (app) => {
    const owners = new Collection({
      type: "auth",
      name: "owners",
      listRule: null,
      viewRule: null,
      createRule: null,
      updateRule: null,
      deleteRule: null,
      passwordAuth: { enabled: true, identityFields: ["email"] },
    });
    app.save(owners);

    const variants = new Collection({
      type: "base",
      name: "variants",
      listRule: OWNER,
      viewRule: OWNER,
      createRule: OWNER,
      updateRule: OWNER,
      deleteRule: OWNER,
      fields: [
        { name: "name", type: "text", required: true, max: 120, presentable: true },
        { name: "note", type: "text", max: 2000 },
        { name: "zh", type: "json", maxSize: 200000 },
        { name: "en", type: "json", maxSize: 200000 },
        { name: "created", type: "autodate", onCreate: true, onUpdate: false },
        { name: "updated", type: "autodate", onCreate: true, onUpdate: true },
      ],
    });
    app.save(variants);

    const applications = app.findCollectionByNameOrId("applications");
    applications.listRule = OWNER;
    applications.viewRule = OWNER;
    applications.createRule = OWNER;
    applications.updateRule = OWNER;
    applications.deleteRule = OWNER;
    applications.fields.add(
      new RelationField({ name: "variant", collectionId: variants.id, maxSelect: 1, cascadeDelete: false }),
    );
    // A code names one recipient in Umami; two applications sharing it would merge their visits.
    applications.addIndex("idx_applications_tracking_code", true, "trackingCode", "trackingCode != ''");
    app.save(applications);
  },
  (app) => {
    const applications = app.findCollectionByNameOrId("applications");
    applications.removeIndex("idx_applications_tracking_code");
    applications.fields.removeByName("variant");
    for (const rule of ["listRule", "viewRule", "createRule", "updateRule", "deleteRule"]) applications[rule] = null;
    app.save(applications);
    app.delete(app.findCollectionByNameOrId("variants"));
    app.delete(app.findCollectionByNameOrId("owners"));
  },
);
