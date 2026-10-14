/// <reference path="../pb_data/types.d.ts" />
// Job-application log: which company got which résumé and site version, what the role asks for,
// and the tracked link it received. Every API rule is null, so only a signed-in superuser
// (the dashboard at /_/) can list, read, or change records; the public API sees nothing.
const STATUSES = ["準備中", "已投遞", "面試中", "錄取", "未錄取", "已婉拒"];

migrate(
  (app) => {
    const collection = new Collection({
      type: "base",
      name: "applications",
      listRule: null,
      viewRule: null,
      createRule: null,
      updateRule: null,
      deleteRule: null,
      fields: [
        {
          name: "company",
          type: "text",
          required: true,
          max: 200,
          presentable: true,
        },
        { name: "role", type: "text", max: 200 },
        {
          name: "status",
          type: "select",
          required: true,
          maxSelect: 1,
          values: STATUSES,
        },
        { name: "appliedOn", type: "date" },
        { name: "jobUrl", type: "url" },
        { name: "requirements", type: "text", max: 20000 },
        // The PDF actually sent; the commit hash covers résumés sent as a link to /resume/.
        {
          name: "resumeFile",
          type: "file",
          maxSelect: 1,
          maxSize: 5 * 1024 * 1024,
          mimeTypes: ["application/pdf"],
          protected: true,
        },
        { name: "resumeVersion", type: "text", max: 200 },
        { name: "siteVersion", type: "text", max: 200 },
        // Same format as `pnpm utm` codes; the recipient can read it, so a company code, never a name.
        {
          name: "trackingCode",
          type: "text",
          max: 40,
          pattern: "^[a-z0-9][a-z0-9_-]{0,39}$",
        },
        { name: "trackingUrl", type: "url" },
        { name: "notes", type: "text", max: 20000 },
        { name: "created", type: "autodate", onCreate: true, onUpdate: false },
        { name: "updated", type: "autodate", onCreate: true, onUpdate: true },
      ],
      indexes: [
        "CREATE INDEX idx_applications_status ON applications (status)",
      ],
    });
    app.save(collection);
  },
  (app) => {
    app.delete(app.findCollectionByNameOrId("applications"));
  },
);
