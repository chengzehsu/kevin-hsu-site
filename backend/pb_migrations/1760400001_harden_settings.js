/// <reference path="../pb_data/types.d.ts" />
// One person signs in here, so slow down password guessing and keep logs short.
migrate((app) => {
  const settings = app.settings();
  settings.meta.appName = "求職投遞紀錄";
  settings.rateLimits.enabled = true;
  settings.batch.enabled = false;
  settings.logs.maxDays = 14;
  app.save(settings);
});
