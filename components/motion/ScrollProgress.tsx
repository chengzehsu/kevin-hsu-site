"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/** A quiet orientation cue. It maps reading progress, so it is not decorative motion. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, { stiffness: reduce ? 1000 : 170, damping: reduce ? 100 : 28, mass: 0.2 });

  return <motion.div aria-hidden="true" className="reading-progress" style={{ scaleX }} />;
}
