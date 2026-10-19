/**
 * The /admin/ page's client for the PocketBase backend (backend/). A thin fetch wrapper instead of the SDK:
 * the page needs sign-in, list, save and one file upload. The session is saved under the SDK's default
 * key and shape, so lib/variantStore.ts can recognise the owner for `?preview=`.
 */
import { BACKEND_ORIGIN } from "./locale";
import { AUTH_STORAGE_KEY } from "./variantStore";

export const STATUSES = [
  "準備中",
  "已投遞",
  "面試中",
  "錄取",
  "未錄取",
  "已婉拒",
] as const;
export type Status = (typeof STATUSES)[number];
export const DRAFT: Status = "準備中";

export interface Variant {
  id: string;
  name: string;
  note: string;
  zh: Record<string, unknown> | null;
  en: Record<string, unknown> | null;
  updated: string;
}

export interface Application {
  id: string;
  company: string;
  role: string;
  status: Status;
  appliedOn: string;
  jobUrl: string;
  requirements: string;
  resumeFile: string;
  resumeVersion: string;
  siteVersion: string;
  trackingCode: string;
  trackingUrl: string;
  notes: string;
  variant: string;
  updated: string;
}

export interface Stat {
  code: string;
  views: number;
  visits: number;
  lastSeen: string | null;
}

interface Session {
  token: string;
  record: { id: string; email: string; collectionName: string };
}

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

export function readSession(): Session | null {
  try {
    const saved = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) ?? "null");
    return saved?.token && saved.record?.collectionName === "owners"
      ? saved
      : null;
  } catch {
    return null;
  }
}

function saveSession(session: Session | null) {
  try {
    if (session)
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
    else localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch {}
}

/** Turns PocketBase's error body into one Chinese sentence the page can show as is. */
function messageOf(status: number, body: unknown): string {
  const data = (body ?? {}) as {
    message?: string;
    data?: Record<string, { message?: string }>;
  };
  const field = data.data && Object.entries(data.data)[0];
  if (status === 400 && data.message?.includes("版本")) return data.message;
  if (field) {
    const [name, issue] = field;
    if (name === "trackingCode" && /unique/i.test(issue?.message ?? ""))
      return "這個追蹤代碼已經被另一筆投遞使用";
    if (name === "trackingCode") return "追蹤代碼只能用英文小寫、數字、- 或 _";
    if (name === "resumeFile") return "履歷只接受 5 MB 以內的 PDF";
    return `欄位「${name}」有誤：${issue?.message ?? "請檢查內容"}`;
  }
  if (status === 401 || status === 403) return "登入已過期，請重新登入";
  if (status === 404) return "找不到這筆資料，可能已被刪除";
  if (status === 0) return "連不上後台，請確認網路或稍後再試";
  return data.message || "發生未知錯誤，請稍後再試";
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const session = readSession();
  const headers = new Headers(init.headers);
  if (session) headers.set("Authorization", session.token);
  if (init.body && !(init.body instanceof FormData))
    headers.set("Content-Type", "application/json");
  let res: Response;
  try {
    res = await fetch(`${BACKEND_ORIGIN}${path}`, {
      ...init,
      headers,
      credentials: "omit",
    });
  } catch {
    throw new ApiError(messageOf(0, null), 0);
  }
  const body = res.status === 204 ? null : await res.json().catch(() => null);
  if (!res.ok) {
    if (res.status === 401) saveSession(null);
    throw new ApiError(messageOf(res.status, body), res.status);
  }
  return body as T;
}

export async function signIn(
  email: string,
  password: string,
): Promise<Session> {
  try {
    const session = await request<Session>(
      "/api/collections/owners/auth-with-password",
      {
        method: "POST",
        body: JSON.stringify({ identity: email, password }),
      },
    );
    saveSession(session);
    return session;
  } catch (error) {
    if (
      error instanceof ApiError &&
      (error.status === 400 || error.status === 401)
    ) {
      throw new ApiError("帳號或密碼錯誤", error.status);
    }
    throw error;
  }
}

export function signOut() {
  saveSession(null);
}

/** Renews the token on load so a week-old tab does not fail on its first save. */
export async function refreshSession(): Promise<Session | null> {
  if (!readSession()) return null;
  try {
    const session = await request<Session>(
      "/api/collections/owners/auth-refresh",
      { method: "POST" },
    );
    saveSession(session);
    return session;
  } catch {
    return null;
  }
}

const all = <T>(collection: string, sort: string) =>
  request<{ items: T[] }>(
    `/api/collections/${collection}/records?perPage=500&sort=${sort}`,
  ).then((r) => r.items);

export const listApplications = () =>
  all<Application>("applications", "-appliedOn,-created");
export const listVariants = () => all<Variant>("variants", "-updated");

export function saveApplication(
  id: string | null,
  fields: Partial<Application>,
  file?: File | null,
) {
  const path = id
    ? `/api/collections/applications/records/${id}`
    : "/api/collections/applications/records";
  let body: BodyInit;
  if (file) {
    const form = new FormData();
    for (const [key, value] of Object.entries(fields))
      form.append(key, String(value ?? ""));
    form.append("resumeFile", file);
    body = form;
  } else {
    body = JSON.stringify(fields);
  }
  return request<Application>(path, { method: id ? "PATCH" : "POST", body });
}

export const deleteApplication = (id: string) =>
  request<null>(`/api/collections/applications/records/${id}`, {
    method: "DELETE",
  });

export function saveVariant(id: string | null, fields: Partial<Variant>) {
  const path = id
    ? `/api/collections/variants/records/${id}`
    : "/api/collections/variants/records";
  return request<Variant>(path, {
    method: id ? "PATCH" : "POST",
    body: JSON.stringify(fields),
  });
}

export const deleteVariant = (id: string) =>
  request<null>(`/api/collections/variants/records/${id}`, {
    method: "DELETE",
  });

/** Short-lived token for opening a protected file (the résumé PDF) in a new tab. */
export async function fileUrl(application: Application): Promise<string> {
  const { token } = await request<{ token: string }>("/api/files/token", {
    method: "POST",
  });
  return `${BACKEND_ORIGIN}/api/files/applications/${application.id}/${application.resumeFile}?token=${token}`;
}

/** The most codes /api/stats answers per call (backend/pb_hooks/main.pb.js drops the rest). */
export const STATS_BATCH = 100;

/**
 * Open counts for every code. Sent in batches the backend accepts whole, one after another so the
 * backend's per-code Umami calls never run several batches at once; a code missing from the answer
 * would otherwise read as "not opened yet".
 */
export async function fetchStats(codes: string[]): Promise<Stat[]> {
  const rows: Stat[] = [];
  for (let i = 0; i < codes.length; i += STATS_BATCH) {
    const batch = codes.slice(i, i + STATS_BATCH);
    rows.push(
      ...(await request<Stat[]>(
        `/api/stats?codes=${batch.map(encodeURIComponent).join(",")}`,
      )),
    );
  }
  return rows;
}

/** The live site's build, so a new application records which version the company receives. */
export async function liveSiteVersion(siteOrigin: string): Promise<string> {
  try {
    const res = await fetch(`${siteOrigin}/version.json`, {
      cache: "no-store",
    });
    const body = (await res.json()) as { commit?: string };
    return body.commit ?? "";
  } catch {
    return "";
  }
}
