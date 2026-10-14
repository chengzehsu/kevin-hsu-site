#!/bin/sh
# Starts PocketBase. On the first boot, PB_ADMIN_EMAIL and PB_ADMIN_PASSWORD create the only superuser;
# delete both variables in Zeabur afterwards (an existing account is never overwritten).
set -eu
cd /pb

# Settings (SMTP and S3 secrets included) are encrypted at rest when PB_ENCRYPTION_KEY is set. Every command
# that opens the database needs the same key, or it cannot read the encrypted settings and the boot fails.
ENC=""
if [ -n "${PB_ENCRYPTION_KEY:-}" ]; then
  if [ "${#PB_ENCRYPTION_KEY}" -ne 32 ]; then
    echo "PB_ENCRYPTION_KEY must be exactly 32 characters (got ${#PB_ENCRYPTION_KEY}); try: openssl rand -hex 16" >&2
    exit 1
  fi
  ENC="--encryptionEnv=PB_ENCRYPTION_KEY"
fi

# shellcheck disable=SC2086 # $ENC is empty or one flag
./pocketbase migrate up --dir=/pb/pb_data --migrationsDir=/pb/pb_migrations $ENC

if [ -n "${PB_ADMIN_EMAIL:-}" ] && [ -n "${PB_ADMIN_PASSWORD:-}" ]; then
  # shellcheck disable=SC2086
  ./pocketbase superuser create "$PB_ADMIN_EMAIL" "$PB_ADMIN_PASSWORD" --dir=/pb/pb_data $ENC \
    || echo "superuser already exists; PB_ADMIN_* ignored. Remove them from the service variables."
fi

# shellcheck disable=SC2086
exec ./pocketbase serve --http=0.0.0.0:8080 --dir=/pb/pb_data --migrationsDir=/pb/pb_migrations \
  --automigrate=false $ENC
