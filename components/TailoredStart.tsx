"use client";

import { useEffect } from "react";
import { startVariants } from "@/lib/variantStore";

/** Starts loading the visitor's variant after hydration; renders nothing. */
export function TailoredStart() {
  useEffect(() => {
    void startVariants();
  }, []);
  return null;
}
