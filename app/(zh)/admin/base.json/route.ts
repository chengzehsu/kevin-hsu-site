import { adminBase } from "@/lib/adminBase";

export const dynamic = "force-static";

/** Main copy for the admin's side-by-side editor; public content only, written at build time. */
export function GET() {
  return Response.json(adminBase());
}
