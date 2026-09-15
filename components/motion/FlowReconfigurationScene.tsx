"use client";

import { useEffect, useRef, useState } from "react";
import type { FlowExperienceCopy } from "@/content/flowExperience";
import { getSnapshot, schedules, type ScenarioId } from "@/lib/flowSimulation";
import type { FlowFrame, FlowSceneController, FlowSceneOptions } from "./flowScene";
import styles from "../BuilderLoop.module.css";

export type FlowSceneStatus = "loading" | "ready" | "unavailable";
interface Props extends FlowSceneOptions {
  copy: FlowExperienceCopy;
  onFrame: (frame: FlowFrame) => void;
  onStatus?: (status: FlowSceneStatus) => void;
}

export function FlowReconfigurationScene(props: Props) {
  const host = useRef<HTMLDivElement>(null);
  const labels = useRef<Array<HTMLDivElement | null>>([]);
  const scene = useRef<FlowSceneController | null>(null);
  const latest = useRef(props);
  const lastFrame = useRef<{ scenario: ScenarioId; frame: FlowFrame } | null>(null);
  const fallback = useRef<{ scenario: ScenarioId; revision: number; time: number } | null>(null);
  const [status, setStatus] = useState<FlowSceneStatus>("loading");
  latest.current = props;
  const stageNames = props.scenario === "redesign" ? props.copy.redesignedStages : props.copy.stages;

  useEffect(() => {
    let cancelled = false;
    function unavailable() {
      if (cancelled) return;
      scene.current?.dispose();
      scene.current = null;
      const current = latest.current;
      fallback.current = {
        scenario: current.scenario,
        revision: current.seek.revision,
        time: lastFrame.current?.scenario === current.scenario ? lastFrame.current.frame.time : current.seek.time,
      };
      setStatus("unavailable");
    }
    import("./flowScene").then(({ createFlowScene }) => {
      if (cancelled || !host.current) return;
      try {
        scene.current = createFlowScene(host.current,
          labels.current.filter((label): label is HTMLDivElement => label !== null), latest.current,
          (frame) => {
            lastFrame.current = { scenario: latest.current.scenario, frame };
            latest.current.onFrame(frame);
          }, unavailable);
        setStatus("ready");
      } catch { unavailable(); }
    }).catch(unavailable);
    return () => { cancelled = true; scene.current?.dispose(); scene.current = null; };
  }, []);
  useEffect(() => { latest.current.onStatus?.(status); }, [status]);
  useEffect(() => {
    if (status !== "unavailable") { scene.current?.update(latest.current); return; }
    // Static comparison stays usable after WebGL failure. Seeking and changing
    // scenarios show real snapshots; no hidden timer pretends playback works.
    const current = latest.current, previous = fallback.current;
    const requestedTime = previous?.scenario === current.scenario && previous.revision === current.seek.revision
      ? previous.time : current.seek.time;
    const schedule = schedules[current.scenario];
    const time = Math.max(0, Math.min(schedule.totalTime, requestedTime));
    const snapshot = getSnapshot(schedule, time);
    fallback.current = { scenario: current.scenario, revision: current.seek.revision, time };
    current.onFrame({ time, completed: snapshot.completed, waiting: snapshot.waiting, finished: time >= schedule.totalTime });
  }, [props.scenario, props.playing, props.reduced, props.seek, status]);

  return (
    <div className={styles.stage} data-flow-status={status}>
      <div className={styles.scene} ref={host} aria-hidden="true">
        {stageNames.map((name, i) => (
          <div className={styles.nodeLabel} key={i} ref={(node) => { labels.current[i] = node; }}>
            <strong>{name}</strong><span>{schedules[props.scenario].durations[i]} {props.copy.minute}</span>
            <small data-queue data-count="0">{props.copy.queued} <b>0</b></small>
          </div>
        ))}
      </div>
      <div className={styles.fallback} aria-hidden={status === "ready"}>
        <p>{status === "loading" ? props.copy.loading : props.copy.fallback}</p>
        <ol>{stageNames.map((name, i) => <li key={i}><strong>{name}</strong><span>{schedules[props.scenario].durations[i]} {props.copy.minute}</span></li>)}</ol>
      </div>
      <p className="sr-only">{stageNames.map((name, i) => `${name}: ${schedules[props.scenario].durations[i]} ${props.copy.minute}`).join("; ")}</p>
    </div>
  );
}
