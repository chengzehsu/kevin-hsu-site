"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimate, useInView, useReducedMotion } from "motion/react";
import type { AnimationSequence } from "motion/react";
import { ArrowCounterClockwise } from "@phosphor-icons/react";
import type { AnimationContent } from "@/content/types";
import type { Locale } from "@/lib/locale";

export interface BottleneckFlowProps {
  content: AnimationContent;
  locale: Locale;
  className?: string;
}

/* ------------------------------------------------------------------ */
/* Geometry (viewBox units). Everything is precomputed and deterministic */
/* so the server and client render identical markup.                    */
/* ------------------------------------------------------------------ */

const VIEW_W = 640;
const VIEW_H = 240;

const NODE_W = 80;
const NODE_H = 48;
const NODE_Y = 116;
const NODE_CX = [80, 240, 400, 560] as const;
const NODE_X = NODE_CX.map((cx) => cx - NODE_W / 2);

const PIPE_H = 6;
const PIPE_Y = NODE_Y + NODE_H / 2 - PIPE_H / 2;
/** Pipes run from the right edge of one node to the left edge of the next. */
const PIPES = [0, 1, 2].map((i) => ({ x: NODE_X[i] + NODE_W, w: NODE_X[i + 1] - (NODE_X[i] + NODE_W) }));

const MARK = 8;
const MARK_Y = NODE_Y + NODE_H / 2 - MARK / 2;
/** Queue and fast markers start hidden under the intake node. */
const MARK_START_X = NODE_X[0] + NODE_W - 20;
/** Trickle markers start hidden under the picking node. */
const TRICKLE_START_X = NODE_X[1] + NODE_W - 40;
/** Left edge inside the shipping node where every marker ends its trip. */
const END_X = NODE_X[3] + NODE_W - 44;

const QUEUE_COUNT = 6;
const QUEUE_GAP = 11;
/** translateX per queue slot: frontmost marker sits just before the picking node. */
const QUEUE_SLOTS = Array.from({ length: QUEUE_COUNT }, (_, i) => NODE_X[1] - 12 - i * QUEUE_GAP - MARK_START_X);
const QUEUE_END = END_X - MARK_START_X;

const FAST_COUNT = 6;
const FAST_END = END_X - MARK_START_X;
/** Static resting spots for the reduced-motion / final frame (two per pipe). */
const FAST_STATIC = [
  PIPES[0].x + 20,
  PIPES[0].x + 50,
  PIPES[1].x + 20,
  PIPES[1].x + 50,
  PIPES[2].x + 20,
  PIPES[2].x + 50,
].map((x) => x - MARK_START_X);

const TRICKLE_END = END_X - TRICKLE_START_X;

const PIPE_SCALE = 3;

const CARD = { x: 80, y: 36, w: 320, h: 36 };
const BOTTLENECK = { dotX: NODE_X[1] + 4, dotY: 100, textX: NODE_X[1] + 12, textY: 104 };
const THROUGHPUT = { x: NODE_X[3] + NODE_W, y: 196 };

/* Timeline in seconds. Act 1: 0 - 1.7, Act 2: 1.7 - 2.9, Act 3: 2.9 - ~4.55 */
const ACT2_AT = 1.7;
const ACT3_AT = 2.9;

function buildSequence(): AnimationSequence {
  const seq: AnimationSequence = [];

  // Act 1: congestion. Orders leave intake and pile up in front of picking.
  QUEUE_SLOTS.forEach((slot, i) => {
    seq.push([`[data-el="queue-${i}"]`, { x: [0, slot] }, { duration: 0.55, ease: "easeOut", at: i * 0.15 }]);
  });
  // A slow trickle gets through picking: the current low throughput.
  seq.push([`[data-el="trickle-0"]`, { x: [0, TRICKLE_END] }, { duration: 2, ease: "linear", at: 0 }]);
  seq.push([`[data-el="trickle-1"]`, { x: [0, TRICKLE_END] }, { duration: 2, ease: "linear", at: 0.8 }]);
  seq.push([`[data-el="picking-hot"]`, { opacity: [0, 1] }, { duration: 0.4, ease: "easeOut", at: 0.7 }]);
  seq.push([`[data-el="bottleneck"]`, { opacity: [0, 1], y: [4, 0] }, { duration: 0.4, ease: "easeOut", at: 1.0 }]);

  // Act 2: hypothesis card slides in above the picking node.
  seq.push([`[data-el="card"]`, { opacity: [0, 1], y: [8, 0] }, { duration: 0.5, ease: "easeOut", at: ACT2_AT }]);

  // Act 3: the picking lane widens, the queue drains, new orders fly through.
  seq.push([`[data-el="pipe-picking"]`, { scaleY: [1, PIPE_SCALE] }, { duration: 0.5, ease: "easeInOut", at: ACT3_AT }]);
  QUEUE_SLOTS.forEach((slot, i) => {
    seq.push([`[data-el="queue-${i}"]`, { x: [slot, QUEUE_END] }, { duration: 0.7, ease: "easeIn", at: ACT3_AT + 0.1 + i * 0.08 }]);
  });
  for (let i = 0; i < FAST_COUNT; i++) {
    seq.push([`[data-el="fast-${i}"]`, { x: [0, FAST_END] }, { duration: 0.8, ease: "linear", at: ACT3_AT + 0.25 + i * 0.12 }]);
  }
  seq.push([`[data-el="throughput"]`, { opacity: [0, 1], y: [6, 0] }, { duration: 0.5, ease: "easeOut", at: 3.7 }]);

  return seq;
}

/* ------------------------------------------------------------------ */

interface DiagramProps {
  content: AnimationContent;
  /** Render the finished state statically (reduced motion). */
  final: boolean;
}

function Diagram({ content, final }: DiagramProps) {
  const labels = [content.nodes.intake, content.nodes.picking, content.nodes.packing, content.nodes.shipping];
  const hidden = final ? 1 : 0;

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      width="100%"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
      className="block h-auto w-full"
      style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}
    >
      {/* Pipes */}
      {PIPES.map((p, i) => (
        <rect
          key={i}
          data-el={i === 0 ? "pipe-picking" : undefined}
          x={p.x}
          y={PIPE_Y}
          width={p.w}
          height={PIPE_H}
          rx={1}
          fill="var(--line)"
          style={
            i === 0 && final
              ? { transform: `scaleY(${PIPE_SCALE})`, transformBox: "fill-box", transformOrigin: "50% 50%" }
              : undefined
          }
        />
      ))}

      {/* Order markers, drawn under the nodes so they disappear while inside one */}
      {QUEUE_SLOTS.map((_, i) => (
        <rect
          key={`q${i}`}
          data-el={`queue-${i}`}
          x={MARK_START_X}
          y={MARK_Y}
          width={MARK}
          height={MARK}
          rx={2}
          fill="var(--fg)"
          style={final ? { opacity: 0 } : undefined}
        />
      ))}
      {[0, 1].map((i) => (
        <rect
          key={`t${i}`}
          data-el={`trickle-${i}`}
          x={TRICKLE_START_X}
          y={MARK_Y}
          width={MARK}
          height={MARK}
          rx={2}
          fill="var(--fg)"
          style={final ? { opacity: 0 } : undefined}
        />
      ))}
      {FAST_STATIC.map((tx, i) => (
        <rect
          key={`f${i}`}
          data-el={`fast-${i}`}
          x={MARK_START_X}
          y={MARK_Y}
          width={MARK}
          height={MARK}
          rx={2}
          fill="var(--fg)"
          style={final ? { transform: `translateX(${tx}px)` } : undefined}
        />
      ))}

      {/* Nodes */}
      {labels.map((label, i) => (
        <g key={label}>
          <rect
            x={NODE_X[i]}
            y={NODE_Y}
            width={NODE_W}
            height={NODE_H}
            rx={8}
            fill="var(--surface)"
            stroke="var(--line)"
            strokeWidth={1}
          />
          <text
            x={NODE_CX[i]}
            y={NODE_Y + NODE_H / 2}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={14}
            fontFamily="inherit"
            fill="var(--fg)"
          >
            {label}
          </text>
        </g>
      ))}

      {/* Picking node in the accent colour (crossfaded over the neutral node) */}
      <g data-el="picking-hot" style={{ opacity: hidden }}>
        <rect x={NODE_X[1]} y={NODE_Y} width={NODE_W} height={NODE_H} rx={8} fill="var(--accent)" />
        <text
          x={NODE_CX[1]}
          y={NODE_Y + NODE_H / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={14}
          fontFamily="inherit"
          fill="var(--accent-fg)"
        >
          {content.nodes.picking}
        </text>
      </g>

      {/* Bottleneck label above the picking node */}
      <g data-el="bottleneck" style={{ opacity: hidden }}>
        <circle cx={BOTTLENECK.dotX} cy={BOTTLENECK.dotY} r={3} fill="var(--accent)" />
        <text
          x={BOTTLENECK.textX}
          y={BOTTLENECK.textY}
          fontSize={12}
          fontWeight={600}
          fontFamily="inherit"
          fill="var(--accent)"
        >
          {content.bottleneckLabel}
        </text>
      </g>

      {/* Hypothesis card */}
      <g data-el="card" style={{ opacity: hidden }}>
        <rect
          x={CARD.x}
          y={CARD.y}
          width={CARD.w}
          height={CARD.h}
          rx={8}
          fill="var(--surface)"
          stroke="var(--accent)"
          strokeWidth={1}
        />
        <text
          x={CARD.x + CARD.w / 2}
          y={CARD.y + CARD.h / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={13}
          fontFamily="inherit"
          fill="var(--fg)"
        >
          {content.hypothesis}
        </text>
      </g>

      {/* Throughput label at the right end */}
      <text
        data-el="throughput"
        x={THROUGHPUT.x}
        y={THROUGHPUT.y}
        textAnchor="end"
        fontSize={14}
        fontWeight={700}
        fontFamily="inherit"
        fill="var(--accent)"
        style={{ opacity: hidden }}
      >
        {content.throughputLabel}
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */

export function BottleneckFlow({ content, className }: BottleneckFlowProps) {
  const [scope, animate] = useAnimate<HTMLElement>();
  const isInView = useInView(scope, { once: true, amount: 0.4 });
  const prefersReduced = useReducedMotion();

  // The server cannot know the visitor's motion preference, so both the server
  // and the first client render use the normal pre-animation markup; the static
  // fallback is swapped in after mount to avoid a hydration mismatch.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const reduce = mounted && prefersReduced === true;

  const [run, setRun] = useState(0);
  const [act, setAct] = useState(0);
  const [playing, setPlaying] = useState(false);
  const runToken = useRef(0);

  useEffect(() => {
    if (!isInView || prefersReduced) return;
    const token = ++runToken.current;
    setAct(0);
    setPlaying(true);

    const controls = animate(buildSequence());
    const timers = [
      setTimeout(() => token === runToken.current && setAct(1), ACT2_AT * 1000),
      setTimeout(() => token === runToken.current && setAct(2), ACT3_AT * 1000),
    ];
    controls.then(() => {
      if (token === runToken.current) setPlaying(false);
    });

    return () => {
      timers.forEach(clearTimeout);
      controls.stop();
    };
  }, [isInView, run, prefersReduced, animate]);

  return (
    <div className={className}>
      <figure ref={scope} role="img" aria-label={content.ariaLabel} className="m-0">
        <Diagram key={run} content={content} final={reduce} />
      </figure>

      {reduce ? (
        <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm text-muted">
          {content.captions.map((caption) => (
            <li key={caption}>{caption}</li>
          ))}
        </ol>
      ) : (
        <div className="mt-4 flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
          <div className="grid min-w-0 flex-1">
            {content.captions.map((caption, i) => (
              <motion.p
                key={caption}
                initial={false}
                animate={{ opacity: act === i ? 1 : 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                aria-hidden={act !== i}
                className="col-start-1 row-start-1 m-0 text-sm text-muted"
              >
                {caption}
              </motion.p>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setRun((r) => r + 1)}
            disabled={playing}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-ui text-sm text-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-default disabled:opacity-60 disabled:hover:text-muted"
          >
            <ArrowCounterClockwise size={16} weight="regular" aria-hidden="true" />
            {content.replay}
          </button>
        </div>
      )}
    </div>
  );
}
