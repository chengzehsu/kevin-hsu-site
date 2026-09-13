"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

interface MagneticLinkProps extends Omit<HTMLMotionProps<"a">, "children"> {
  children: ReactNode;
}

/** Gives the primary action a small physical response without re-rendering on pointer movement. */
export function MagneticLink({ children, onPointerMove, onPointerLeave, ...props }: MagneticLinkProps) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 17, mass: 0.16 });
  const springY = useSpring(y, { stiffness: 260, damping: 17, mass: 0.16 });

  return (
    <motion.a
      {...props}
      style={reduce ? undefined : { x: springX, y: springY }}
      onPointerMove={(event) => {
        onPointerMove?.(event);
        if (reduce || event.pointerType === "touch") return;
        const bounds = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - bounds.left - bounds.width / 2) * 0.12);
        y.set((event.clientY - bounds.top - bounds.height / 2) * 0.12);
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event);
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.a>
  );
}
