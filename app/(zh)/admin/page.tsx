import type { Metadata } from "next";
import { AdminApp } from "@/components/admin/AdminApp";

/** Kevin's job-search desk. Not linked anywhere, never indexed; the HTML holds no data until sign-in. */
export const metadata: Metadata = {
  title: "求職後台",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminPage() {
  return <AdminApp />;
}
