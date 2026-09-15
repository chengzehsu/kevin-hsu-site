/**
 * A deliberately small, deterministic flow experiment, not portfolio results.
 * All jobs arrive together. Work stages have one server; handoff is a delay
 * with unlimited capacity. Each work stage serves jobs first-in, first-out.
 *
 * Redesign assumes acceptance criteria are agreed before building, handoffs
 * are shortened, and routine review is assisted by tools. Its shorter review
 * duration represents changed work, not an unexplained increase in speed.
 */
export const SCENARIO_IDS = ["baseline", "accelerate", "redesign"] as const;
export type ScenarioId = (typeof SCENARIO_IDS)[number];
export const BATCH_SIZE = 12;
export type StageIndex = 0 | 1 | 2 | 3 | 4;

export interface StageSchedule {
  arrival: number;
  start: number;
  end: number;
}

export interface JobSchedule {
  id: number;
  stages: StageSchedule[];
  completedAt: number;
}

export interface Schedule {
  scenario: ScenarioId;
  durations: readonly number[];
  jobs: JobSchedule[];
  totalTime: number;
  /** Mean queue time plus handoff delay, per job. */
  averageWait: number;
  /** Active service time per job, excluding handoff delay. */
  processingTime: number;
}

export interface JobState {
  stage: StageIndex | "done";
  phase: "queued" | "processing" | "done";
  /** Within the current stage; queued jobs have not started (zero). */
  progress: number;
}

export interface FlowSnapshot {
  completed: number;
  waiting: number;
  active: number;
  /** Queues at work stages; all jobs in the handoff delay at index 2. */
  stageQueues: number[];
}

const HANDOFF_STAGE: StageIndex = 2;

function createSchedule(
  scenario: ScenarioId,
  durations: readonly [number, number, number, number, number],
): Schedule {
  const availableAt = durations.map(() => 0);
  let totalWait = 0;
  const jobs: JobSchedule[] = [];

  for (let id = 0; id < BATCH_SIZE; id += 1) {
    const stages: StageSchedule[] = [];

    for (let stage = 0; stage < durations.length; stage += 1) {
      const arrival = stage === 0 ? 0 : stages[stage - 1].end;
      const start =
        stage === HANDOFF_STAGE
          ? arrival
          : Math.max(arrival, availableAt[stage]);
      const end = start + durations[stage];

      stages.push({ arrival, start, end });
      totalWait += start - arrival;

      if (stage === HANDOFF_STAGE) {
        totalWait += durations[stage];
      } else {
        availableAt[stage] = end;
      }
    }

    jobs.push({ id, stages, completedAt: stages[stages.length - 1].end });
  }

  return {
    scenario,
    durations,
    jobs,
    totalTime: jobs[jobs.length - 1].completedAt,
    averageWait: totalWait / BATCH_SIZE,
    processingTime: durations.reduce(
      (sum, duration, stage) =>
        sum + (stage === HANDOFF_STAGE ? 0 : duration),
      0,
    ),
  };
}

export const schedules: Record<ScenarioId, Schedule> = {
  baseline: createSchedule("baseline", [2, 3, 4, 4, 1]),
  accelerate: createSchedule("accelerate", [2, 1, 4, 4, 1]),
  redesign: createSchedule("redesign", [2, 1, 0.5, 1, 1]),
};

/** Stage intervals are [start, end); at an exact boundary a job moves on. */
export function getJobState(job: JobSchedule, time: number): JobState {
  const elapsed = Number.isNaN(time) ? 0 : Math.max(0, time);

  for (let index = 0; index < job.stages.length; index += 1) {
    const stage = job.stages[index];
    if (elapsed < stage.start) {
      return { stage: index as StageIndex, phase: "queued", progress: 0 };
    }
    if (elapsed < stage.end) {
      return {
        stage: index as StageIndex,
        phase: "processing",
        progress: (elapsed - stage.start) / (stage.end - stage.start),
      };
    }
  }

  return { stage: "done", phase: "done", progress: 1 };
}

export function getSnapshot(schedule: Schedule, time: number): FlowSnapshot {
  const snapshot: FlowSnapshot = {
    completed: 0,
    waiting: 0,
    active: 0,
    stageQueues: schedule.durations.map(() => 0),
  };

  for (const job of schedule.jobs) {
    const state = getJobState(job, time);
    if (state.stage === "done") {
      snapshot.completed += 1;
    } else if (state.phase === "queued" || state.stage === HANDOFF_STAGE) {
      snapshot.waiting += 1;
      snapshot.stageQueues[state.stage] += 1;
    } else {
      snapshot.active += 1;
    }
  }

  return snapshot;
}
