"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowCounterClockwiseIcon, ArrowUpRightIcon, PauseIcon, PlayIcon, ArrowsSplitIcon, LightningIcon, PathIcon } from "@phosphor-icons/react";
import { flowExperience } from "@/content/flowExperience";
import { BATCH_SIZE, SCENARIO_IDS, schedules, type ScenarioId } from "@/lib/flowSimulation";
import type { Locale } from "@/lib/locale";
import { FlowReconfigurationScene, type FlowSceneStatus } from "./motion/FlowReconfigurationScene";
import type { FlowFrame } from "./motion/flowScene";
import styles from "./BuilderLoop.module.css";

const icons = { baseline: PathIcon, accelerate: LightningIcon, redesign: ArrowsSplitIcon };
const INITIAL_FRAME: FlowFrame = { time: 0, completed: 0, waiting: 11, finished: false };
const format = (value: number) => Number(value.toFixed(1)).toString();

export function BuilderLoop({ locale }: { locale: Locale }) {
  const copy = flowExperience[locale];
  const [reduced, setReduced] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [scenario, setScenario] = useState<ScenarioId>("baseline");
  const [playing, setPlaying] = useState(true);
  const [sceneStatus, setSceneStatus] = useState<FlowSceneStatus>("loading");
  const [frame, setFrame] = useState(INITIAL_FRAME);
  const [seek, setSeek] = useState({ time: 0, revision: 0 });
  const schedule = schedules[scenario], option = copy.options[scenario];
  const onFrame = useCallback((next: FlowFrame) => setFrame(next), []);
  const onStatus = useCallback((status: FlowSceneStatus) => {
    setSceneStatus(status);
    if (status === "unavailable") setPlaying(false);
  }, []);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update(); media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => { if (reduced) setPlaying(false); }, [reduced]);
  function choose(value: ScenarioId) {
    setScenario(value); setFrame(INITIAL_FRAME);
    setSeek((previous) => ({ time: reduced ? schedules[value].totalTime * .42 : 0, revision: previous.revision + 1 }));
    setPlaying(!reduced && sceneStatus !== "unavailable");
  }
  function replay() {
    if (sceneStatus !== "ready") return;
    setSeek((previous) => ({ time: 0, revision: previous.revision + 1 }));
    setPlaying(!reduced);
  }
  const playbackDisabled = reduced || sceneStatus !== "ready";
  const isPlaying = playing && !frame.finished && !playbackDisabled;
  return (
    <div className={styles.experiment} data-flow-scenario={scenario}>
      <header className={styles.header}><h2>{copy.title}</h2><p>{copy.intro}</p></header>
      <div className={styles.choices} role="group" aria-label={copy.controls}>
        {SCENARIO_IDS.map((id) => { const Icon = icons[id]; return (
          <button key={id} type="button" onClick={() => choose(id)} aria-pressed={scenario === id} data-scenario={id}>
            <Icon size={17} weight="regular" aria-hidden="true" /><span>{copy.options[id].label}</span>
          </button>
        ); })}
      </div>
      <FlowReconfigurationScene scenario={scenario} playing={isPlaying} reduced={reduced} seek={seek} copy={copy} onFrame={onFrame} onStatus={onStatus} />
      <div className={styles.transport} aria-busy={sceneStatus === "loading"}>
        <button type="button" aria-label={isPlaying ? copy.pause : copy.play} onClick={() => { if (frame.finished) replay(); else setPlaying(!playing); }} disabled={playbackDisabled}>
          {isPlaying ? <PauseIcon size={16} weight="fill" aria-hidden="true" /> : <PlayIcon size={16} weight="fill" aria-hidden="true" />}
        </button>
        <label className={styles.scrubber}><span className="sr-only">{copy.progress}</span>
          <input type="range" min={0} max={schedule.totalTime} step={.1} value={frame.time} aria-valuetext={`${format(frame.time)} ${copy.minute}`} onChange={(event) => { setPlaying(false); setSeek((previous) => ({ time: Number(event.target.value), revision: previous.revision + 1 })); }} />
        </label>
        <span className={styles.elapsed}>{Math.floor(frame.time)} / {format(schedule.totalTime)} {copy.minute}</span>
        <button type="button" aria-label={copy.replay} onClick={replay} disabled={sceneStatus !== "ready"}><ArrowCounterClockwiseIcon size={17} aria-hidden="true" /></button>
      </div>
      <div className={styles.outcome}>
        <div className={styles.insight} aria-live="polite" aria-atomic="true"><h3>{option.title}</h3><p>{option.detail}</p></div>
        <dl className={styles.metrics}>
          <div><dt>{copy.total}</dt><dd data-flow-total>{format(schedule.totalTime)}<small>{copy.minute}</small></dd>{scenario !== "baseline" && <span className={styles.reference}>{copy.compared} {format(schedules.baseline.totalTime)}</span>}</div>
          <div><dt>{copy.waiting}</dt><dd>{format(schedule.averageWait)}<small>{copy.minute}</small></dd>{scenario !== "baseline" && <span className={styles.reference}>{copy.compared} {format(schedules.baseline.averageWait)}</span>}</div>
          <div><dt>{copy.completed}</dt><dd data-flow-completed>{frame.completed}<small>/ {BATCH_SIZE}</small></dd></div>
        </dl>
      </div>
      <footer className={styles.footer}><p>{copy.note}</p><details><summary>{copy.assumptions}</summary><p>{copy.assumptionsBody}</p></details></footer>
      <a className={styles.caseLink} href="#ecofirst" onClick={(event) => { event.currentTarget.closest("dialog")?.close(); }}>{copy.connection}<ArrowUpRightIcon size={16} aria-hidden="true" /></a>
    </div>
  );
}
