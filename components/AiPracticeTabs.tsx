"use client";

import {
  ArrowRightIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import type { AiPracticeContent, AiPracticeItem } from "@/content/types";
import type { Locale } from "@/lib/locale";
import { casePath } from "@/lib/locale";
import { Disclosure } from "./Disclosure";
import styles from "./LinkedInPosts.module.css";

interface Props {
  practice: AiPracticeContent;
  locale: Locale;
  caseNames: Record<string, string>;
}

/** Tabs follow the WAI-ARIA pattern: arrow keys move between chapters, only the active panel shows. */
export function AiPracticeTabs({ practice, locale, caseNames }: Props) {
  const ids = useMemo(() => practice.chapters.map((chapter) => chapter.id), [practice.chapters]);
  const [active, setActive] = useState(ids[0]);
  const tabs = useRef<Record<string, HTMLButtonElement | null>>({});

  // A link to #ai-process or #ai-life opens that chapter.
  useEffect(() => {
    const open = () => {
      const hash = window.location.hash.slice(1);
      if (ids.includes(hash as (typeof ids)[number]))
        setActive(hash as (typeof ids)[number]);
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, [ids]);

  function onKey(event: KeyboardEvent<HTMLButtonElement>) {
    const step =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = ids[(ids.indexOf(active) + step + ids.length) % ids.length];
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <>
      <div
        className={`${styles.tabs} scroll-rise`}
        role="tablist"
        aria-label={practice.title}
      >
        {practice.chapters.map((chapter) => (
          <button
            key={chapter.id}
            ref={(node) => {
              tabs.current[chapter.id] = node;
            }}
            type="button"
            role="tab"
            id={`${chapter.id}-tab`}
            aria-controls={chapter.id}
            aria-selected={active === chapter.id}
            tabIndex={active === chapter.id ? 0 : -1}
            className={styles.tab}
            onClick={() => setActive(chapter.id)}
            onKeyDown={onKey}
          >
            {chapter.title}
            <span className={styles.tabCount}>{chapter.items.length + 1}</span>
          </button>
        ))}
      </div>

      {practice.chapters.map((chapter) => (
        <div
          key={chapter.id}
          id={chapter.id}
          role="tabpanel"
          aria-labelledby={`${chapter.id}-tab`}
          hidden={active !== chapter.id}
          className={styles.panel}
          data-ai-chapter={chapter.id}
        >
          <ul className={styles.grid} data-count={chapter.items.length}>
            {[chapter.lead, ...chapter.items].map((item, index) => (
              <Card
                key={item.title}
                item={item}
                lead={index === 0}
                labels={practice.labels}
                locale={locale}
                caseNames={caseNames}
              />
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

function Card({
  item,
  lead,
  labels,
  locale,
  caseNames,
}: {
  item: AiPracticeItem;
  lead: boolean;
  labels: AiPracticeContent["labels"];
  locale: Locale;
  caseNames: Record<string, string>;
}) {
  const colon = locale === "zh" ? "：" : ": ";
  return (
    <li className={styles.card} data-ai-item data-ai-lead={lead || undefined}>
      <div className={styles.cover}>
        <Image
          src={item.image.src}
          alt={item.image.alt}
          width={item.image.width}
          height={item.image.height}
          sizes={
            lead
              ? "(max-width: 767px) 100vw, 66vw"
              : "(max-width: 767px) 100vw, 33vw"
          }
        />
      </div>
      <div className={styles.body}>
        <h3>
          {item.caseId ? (
            <a
              href={casePath(locale, item.caseId)}
              className={styles.titleLink}
            >
              {item.title}
            </a>
          ) : (
            item.title
          )}
        </h3>
        {item.stat ? (
          <p className={styles.stat}>
            <span className={styles.statValue}>{item.stat.value}</span>
            <span className={styles.statLabel}>{item.stat.label}</span>
          </p>
        ) : null}
        <Disclosure
          kind="ai"
          summary={<span className="sr-only">{item.title}</span>}
          expandLabel={labels.expand}
          collapseLabel={labels.collapse}
          className={styles.more}
        >
          <dl className={styles.detail}>
            <div>
              <dt>{labels.stuck}</dt>
              <dd>{item.stuck}</dd>
            </div>
            <div data-role="ai">
              <dt>{labels.ai}</dt>
              <dd>{item.ai}</dd>
            </div>
            <div data-role="human">
              <dt>{labels.human}</dt>
              <dd>{item.human}</dd>
            </div>
            <div>
              <dt>{labels.result}</dt>
              <dd>{item.result}</dd>
            </div>
          </dl>
          <p className={styles.source}>
            {labels.source}
            {colon}
            {item.source}
          </p>
          {item.caseId || item.href ? (
            <p className={styles.links}>
              {item.caseId ? (
                <a
                  className={`${styles.link} action-link`}
                  href={casePath(locale, item.caseId)}
                >
                  {labels.caseLink}
                  {colon}
                  {caseNames[item.caseId]}
                  <ArrowRightIcon size={18} aria-hidden="true" />
                </a>
              ) : null}
              {item.href ? (
                <a
                  className={`${styles.link} ${styles.external} action-link`}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {labels.read}
                  <span className="sr-only">
                    {locale === "zh"
                      ? `：${item.title}（LinkedIn）`
                      : `: ${item.title} (LinkedIn)`}
                  </span>
                  <ArrowUpRightIcon size={18} aria-hidden="true" />
                </a>
              ) : null}
            </p>
          ) : null}
        </Disclosure>
      </div>
    </li>
  );
}
