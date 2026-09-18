"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/locale";
import styles from "./CaseStudies.module.css";
import { PlayIcon } from "@phosphor-icons/react/dist/ssr";

const FlowPreview = dynamic(() => import("./FlowPreview").then((module) => module.FlowPreview), {
  ssr: false,
  loading: () => <img src="/flow-preview-small.webp" width={600} height={375} alt="" className={styles.filmPoster} />,
});

/** The film is fetched only on an explicit request. */
export function CaseFilm({ locale, label }: { locale: Locale; label: string }) {
  const [opened, setOpened] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  if (!hydrated) return null;
  return (
    <div className={styles.film}>
      {opened ? <FlowPreview locale={locale} /> : (
        <button type="button" onClick={() => setOpened(true)} className={styles.textLink}>
          <PlayIcon size={17} aria-hidden="true" />{label}
        </button>
      )}
    </div>
  );
}
