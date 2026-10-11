"use client";

import { EVENTS } from "@/lib/analytics";

/** Opens the browser print dialog, where "Save as PDF" turns the résumé page into the downloadable résumé. */
export function PrintButton({ label, hint, className }: { label: string; hint: string; className?: string }) {
  return (
    <button type="button" className={className} title={hint} data-umami-event={EVENTS.printResume} onClick={() => window.print()}>
      {label}
    </button>
  );
}
