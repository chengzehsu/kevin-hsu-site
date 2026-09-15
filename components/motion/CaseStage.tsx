"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { AnimationContent, CaseStudy } from "@/content/types";

gsap.registerPlugin(ScrollTrigger);

export function CaseStage({ item, animation }: { item: CaseStudy; animation: AnimationContent }) {
  const root = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!root.current || !panel.current) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const compact = window.matchMedia("(max-width: 1023px)").matches;
      if (reduce || compact) return;
      const select = gsap.utils.selector(root);
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top+=72",
          end: "bottom bottom",
          scrub: 0.7,
          pin: panel.current,
        },
      });
      timeline
        .to(select("[data-stage='queue']"), { x: 110, stagger: 0.08, duration: 0.45 }, 0)
        .to(select("[data-stage='bottleneck']"), { scale: 1.15, color: "var(--accent)", duration: 0.35 }, 0.15)
        .to(select("[data-stage='decision']"), { opacity: 1, y: 0, duration: 0.35 }, 0.32)
        .to(select("[data-stage='queue']"), { x: 510, opacity: 0, stagger: 0.05, duration: 0.5 }, 0.5)
        .to(select("[data-stage='lane']"), { scaleY: 3, duration: 0.4 }, 0.52)
        .to(select("[data-stage='result']"), { opacity: 1, y: 0, duration: 0.4 }, 0.62);
    },
    { scope: root },
  );

  return (
    <section className="case-stage" ref={root} aria-label={item.title}>
      <div className="case-stage-panel" ref={panel}>
        <div className="case-stage-copy">
          <p className="case-stage-kicker">{item.impact}</p>
          <h2>{item.title}</h2>
          <p>{item.bottleneck}</p>
          <p className="case-stage-decision" data-stage="decision">{item.hypothesis}</p>
        </div>
        <div className="case-stage-visual" aria-hidden="true">
          <div className="case-stage-flow">
            <span className="case-stage-node">{animation.nodes.intake}</span>
            <i data-stage="lane" />
            <span className="case-stage-node" data-stage="bottleneck">{animation.nodes.picking}</span>
            <i />
            <span className="case-stage-node">{animation.nodes.packing}</span>
            <i />
            <span className="case-stage-node">{animation.nodes.shipping}</span>
            <b data-stage="queue" />
            <b data-stage="queue" />
            <b data-stage="queue" />
            <b data-stage="queue" />
            <b data-stage="queue" />
          </div>
          <strong className="case-stage-result" data-stage="result">
            {animation.throughputLabel}
          </strong>
        </div>
      </div>
    </section>
  );
}
