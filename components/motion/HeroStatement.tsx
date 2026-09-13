"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface HeroStatementProps {
  eyebrow: string;
  headline: string;
  subline: string;
  children: ReactNode;
  chinese: boolean;
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** The entry sequence gives the page a considered opening without delaying content. */
export function HeroStatement({ eyebrow, headline, subline, children, chinese }: HeroStatementProps) {
  const reduce = useReducedMotion();
  const transition = (delay: number) => ({ duration: reduce ? 0 : 0.68, delay: reduce ? 0 : delay, ease: EASE });

  return (
    <div>
      <motion.p
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition(0.04)}
        data-hero-intro=""
        className="hero-eyebrow"
      >
        {eyebrow}
      </motion.p>
      <motion.h1
        initial={reduce ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition(0.13)}
        data-hero-intro=""
        className={chinese ? "hero-title hero-title-zh" : "hero-title"}
      >
        {headline}
      </motion.h1>
      <motion.p
        initial={reduce ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition(0.24)}
        data-hero-intro=""
        className="hero-subline"
      >
        {subline}
      </motion.p>
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition(0.34)}
        data-hero-intro=""
        className="hero-actions"
      >
        {children}
      </motion.div>
    </div>
  );
}
