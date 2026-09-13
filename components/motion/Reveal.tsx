"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

export interface RevealProps {
  children: ReactNode;
  /** Stagger delay in seconds. */
  delay?: number;
  className?: string;
}

const HIDDEN = { opacity: 0, y: 24 };
const SHOWN = { opacity: 1, y: 0 };
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const prefersReduced = useReducedMotion();

  // The motion preference is unknown on the server, so both renders start from
  // the hidden state; after mount, reduced-motion visitors are shown the content
  // instantly (duration 0) instead of animating it in.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const reduce = mounted && prefersReduced === true;

  if (reduce) {
    return (
      <motion.div data-reveal="" className={className} initial={HIDDEN} animate={SHOWN} transition={{ duration: 0 }}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      data-reveal=""
      className={className}
      initial={HIDDEN}
      whileInView={SHOWN}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
