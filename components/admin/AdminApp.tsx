"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import {
  ApiError,
  fetchStats,
  listApplications,
  listVariants,
  readSession,
  refreshSession,
  signIn,
  signOut,
  type Application,
  type Stat,
  type Variant,
} from "@/lib/adminApi";
import type { AdminBase } from "@/lib/adminBase";
import { BACKEND_ORIGIN } from "@/lib/locale";
import { loadFullFont } from "@/lib/variantStore";
import { ApplicationsView } from "./ApplicationsView";
import { VariantsView } from "./VariantsView";
import styles from "./admin.module.css";

type Tab = "applications" | "variants";
export type Stats = Record<string, Stat> | "unavailable" | null;

export interface Desk {
  applications: Application[];
  variants: Variant[];
  stats: Stats;
  base: AdminBase | null;
  reload: () => Promise<void>;
  onAuthLost: (error: unknown) => boolean;
}

/** /admin/: sign-in, then the two working views. All data comes from the backend after sign-in. */
export function AdminApp() {
  const [email, setEmail] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [tab, setTab] = useState<Tab>("applications");
  const [applications, setApplications] = useState<Application[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [stats, setStats] = useState<Stats>(null);
  const [base, setBase] = useState<AdminBase | null>(null);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    loadFullFont();
    refreshSession().then((session) => {
      setEmail(session?.record.email ?? null);
      setChecked(true);
    });
    fetch("/admin/base.json")
      .then((res) => res.json())
      .then(setBase)
      .catch(() => setBase(null));
  }, []);

  const onAuthLost = useCallback((error: unknown) => {
    if (error instanceof ApiError && error.status === 401) {
      setEmail(null);
      return true;
    }
    return false;
  }, []);

  const reload = useCallback(async () => {
    try {
      const [apps, vars] = await Promise.all([
        listApplications(),
        listVariants(),
      ]);
      setApplications(apps);
      setVariants(vars);
      setLoadError("");
      const codes = apps.map((a) => a.trackingCode).filter(Boolean);
      fetchStats(codes)
        .then((rows) =>
          setStats(Object.fromEntries(rows.map((row) => [row.code, row]))),
        )
        .catch((error) => {
          if (!onAuthLost(error)) setStats("unavailable");
        });
    } catch (error) {
      if (!onAuthLost(error))
        setLoadError(error instanceof Error ? error.message : String(error));
    }
  }, [onAuthLost]);

  useEffect(() => {
    if (!email) return;
    // This browser is Kevin's: Umami's own opt-out flag keeps his test clicks on tracked links, and his
    // visits here, out of the open counts a company is judged by.
    try {
      localStorage.setItem("umami.disabled", "1");
    } catch {}
    void reload();
  }, [email, reload]);

  if (!BACKEND_ORIGIN) {
    return (
      <div className={`${styles.shell} ${styles.login}`}>
        <div className={styles.loginCard}>
          <h1 className={styles.loginTitle}>後台未設定</h1>
          <p className={styles.hint}>
            這次建置沒有設定
            NEXT_PUBLIC_BACKEND_ORIGIN，所以追蹤連結的客製版本和後台都是關閉的。
            設定後重新部署網站即可使用。
          </p>
        </div>
      </div>
    );
  }

  if (!checked) return <div className={styles.shell} aria-busy="true" />;
  if (!email) return <SignIn onSignedIn={setEmail} />;

  const desk: Desk = {
    applications,
    variants,
    stats,
    base,
    reload,
    onAuthLost,
  };

  return (
    <div className={styles.shell}>
      <div className={styles.inner}>
        <header className={styles.topbar}>
          <p className={styles.brand}>求職後台</p>
          <div className={styles.tabs} role="tablist" aria-label="切換畫面">
            <button
              type="button"
              role="tab"
              className={styles.tab}
              aria-selected={tab === "applications"}
              onClick={() => setTab("applications")}
            >
              投遞
            </button>
            <button
              type="button"
              role="tab"
              className={styles.tab}
              aria-selected={tab === "variants"}
              onClick={() => setTab("variants")}
            >
              版本
            </button>
          </div>
          <span className={styles.spacer} />
          <span className={styles.who}>{email}</span>
          <button
            type="button"
            className={styles.ghost}
            onClick={() => {
              signOut();
              setEmail(null);
            }}
          >
            登出
          </button>
        </header>
        {loadError ? (
          <p className={styles.message} data-tone="error" role="alert">
            {loadError}
          </p>
        ) : null}
        {tab === "applications" ? (
          <ApplicationsView desk={desk} />
        ) : (
          <VariantsView desk={desk} />
        )}
      </div>
    </div>
  );
}

function SignIn({ onSignedIn }: { onSignedIn: (email: string) => void }) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setBusy(true);
    setError("");
    try {
      const session = await signIn(
        String(form.get("email") ?? ""),
        String(form.get("password") ?? ""),
      );
      onSignedIn(session.record.email);
    } catch (err) {
      setError(err instanceof Error ? err.message : "登入失敗");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={`${styles.shell} ${styles.login}`}>
      <form className={styles.loginCard} onSubmit={submit}>
        <div>
          <h1 className={styles.loginTitle}>求職後台</h1>
          <p className={styles.hint}>只有你的帳號能登入。</p>
        </div>
        <label className={styles.field}>
          <span className={styles.label}>Email</span>
          <input
            id="admin-email"
            name="email"
            type="email"
            autoComplete="username"
            required
            className={styles.input}
            defaultValue={readSession()?.record.email ?? ""}
          />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>密碼</span>
          <input
            id="admin-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className={styles.input}
          />
        </label>
        <p
          className={styles.message}
          data-tone={error ? "error" : undefined}
          role="status"
        >
          {error}
        </p>
        <button type="submit" className={styles.primary} disabled={busy}>
          {busy ? "登入中…" : "登入"}
        </button>
      </form>
    </div>
  );
}
