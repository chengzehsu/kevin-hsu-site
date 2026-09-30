"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import type { Locale } from "@/lib/locale";
import styles from "./CasePage.module.css";
import { PlayIcon } from "@phosphor-icons/react/dist/ssr";

const Poster = () => <img src="/flow-preview.webp" width={960} height={600} alt="" className={styles.filmPoster} loading="lazy" decoding="async" />;

const FlowPreview = dynamic(() => import("./FlowPreview").then((module) => module.FlowPreview), {
  ssr: false,
  loading: Poster,
});

/** The poster is server rendered; the film itself is fetched only on an explicit request. */
export function CaseFilm({ locale, label }: { locale: Locale; label: string }) {
  const [opened, setOpened] = useState(false);
  return (
    <div className={styles.film}>
      {opened ? <FlowPreview locale={locale} /> : (
        <button type="button" onClick={() => setOpened(true)} className={styles.filmTrigger}>
          <Poster />
          <span className={styles.filmPlay}>
            <PlayIcon size={18} weight="fill" aria-hidden="true" />
            {label}
          </span>
        </button>
      )}
    </div>
  );
}
