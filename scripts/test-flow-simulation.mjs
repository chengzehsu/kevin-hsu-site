// Run: node --experimental-strip-types --test scripts/test-flow-simulation.mjs
import assert from "node:assert/strict";
import test from "node:test";
import {
  BATCH_SIZE,
  SCENARIO_IDS,
  getJobState,
  getSnapshot,
  schedules,
} from "../lib/flowSimulation.ts";

for (const scenario of SCENARIO_IDS) {
  const schedule = schedules[scenario];

  test(`${scenario}: every job follows the same route and conserves elapsed time`, () => {
    assert.equal(schedule.jobs.length, BATCH_SIZE);
    assert.equal(new Set(schedule.jobs.map((job) => job.id)).size, BATCH_SIZE);
    let totalWait = 0;

    for (const job of schedule.jobs) {
      assert.equal(job.stages.length, 5);
      assert.equal(job.stages[0].arrival, 0);
      let wait = 0;
      for (const [index, stage] of job.stages.entries()) {
        assert.ok(stage.start >= stage.arrival);
        assert.equal(stage.end - stage.start, schedule.durations[index]);
        if (index > 0) {
          assert.equal(stage.arrival, job.stages[index - 1].end);
        }
        wait += stage.start - stage.arrival;
        if (index === 2) wait += stage.end - stage.start;
      }
      assert.equal(job.completedAt, job.stages[4].end);
      assert.equal(job.completedAt, wait + schedule.processingTime);
      totalWait += wait;
    }

    assert.equal(schedule.averageWait, totalWait / BATCH_SIZE);
    assert.equal(
      schedule.totalTime,
      Math.max(...schedule.jobs.map((job) => job.completedAt)),
    );
  });

  test(`${scenario}: each work stage respects FCFS and single-server capacity`, () => {
    for (const stageIndex of [0, 1, 3, 4]) {
      for (let index = 1; index < schedule.jobs.length; index += 1) {
        const previous = schedule.jobs[index - 1].stages[stageIndex];
        const current = schedule.jobs[index].stages[stageIndex];
        assert.ok(current.arrival >= previous.arrival, "arrival order is stable");
        assert.ok(current.start >= previous.end, "service intervals never overlap");
        assert.equal(
          current.start,
          Math.max(current.arrival, previous.end),
          "an available server never idles while a job waits",
        );
      }
    }
    for (const job of schedule.jobs) {
      assert.equal(job.stages[2].start, job.stages[2].arrival);
    }
  });

  test(`${scenario}: snapshots conserve the batch and completions never decrease`, () => {
    let previousCompleted = 0;
    for (let time = 0; time <= schedule.totalTime + 1; time += 0.125) {
      const snapshot = getSnapshot(schedule, time);
      assert.equal(snapshot.completed + snapshot.waiting + snapshot.active, BATCH_SIZE);
      assert.equal(snapshot.stageQueues.reduce((sum, count) => sum + count, 0), snapshot.waiting);
      assert.ok(snapshot.active <= 4, "only the four work stations can be active");
      assert.ok(snapshot.completed >= previousCompleted);
      assert.equal(
        snapshot.completed,
        schedule.jobs.filter((job) => job.completedAt <= time).length,
      );
      previousCompleted = snapshot.completed;
    }

    assert.deepEqual(getSnapshot(schedule, 0), {
      completed: 0, waiting: 11, active: 1, stageQueues: [11, 0, 0, 0, 0],
    });
    assert.deepEqual(getSnapshot(schedule, schedule.totalTime), {
      completed: 12, waiting: 0, active: 0, stageQueues: [0, 0, 0, 0, 0],
    });
  });
}

test("handoff overlaps across jobs and is counted as waiting, not active work", () => {
  const first = schedules.baseline.jobs[0].stages[2];
  const second = schedules.baseline.jobs[1].stages[2];
  assert.ok(second.start < first.end, "handoff has no single-server constraint");
  const snapshot = getSnapshot(schedules.baseline, 8.5);
  assert.equal(snapshot.stageQueues[2], 2);
  assert.equal(snapshot.active, 2);
});

test("exact boundaries transfer jobs without double counting", () => {
  const job = schedules.baseline.jobs[0];
  assert.deepEqual(getJobState(job, -1), { stage: 0, phase: "processing", progress: 0 });
  assert.deepEqual(getJobState(job, 2), { stage: 1, phase: "processing", progress: 0 });
  assert.deepEqual(getJobState(job, 5), { stage: 2, phase: "processing", progress: 0 });
  assert.deepEqual(getJobState(job, 7), { stage: 2, phase: "processing", progress: 0.5 });
  assert.deepEqual(getJobState(job, 14), { stage: "done", phase: "done", progress: 1 });
  assert.deepEqual(getJobState(schedules.baseline.jobs[1], 4), {
    stage: 1, phase: "queued", progress: 0,
  });
});

test("speeding construction alone leaves the review bottleneck; redesign changes the system", () => {
  assert.deepEqual(
    SCENARIO_IDS.map((scenario) => schedules[scenario].totalTime),
    [58, 56, 27.5],
  );
  assert.deepEqual(
    SCENARIO_IDS.map((scenario) => schedules[scenario].averageWait),
    [26, 26, 11.5],
  );
  assert.deepEqual(
    SCENARIO_IDS.map((scenario) => schedules[scenario].processingTime),
    [10, 8, 5],
  );
  const buildOnlyReduction = 1 - schedules.accelerate.totalTime / schedules.baseline.totalTime;
  const redesignReduction = 1 - schedules.redesign.totalTime / schedules.baseline.totalTime;
  assert.ok(buildOnlyReduction < 0.04);
  assert.ok(redesignReduction > 0.5);

  // The steady completion interval reveals the bottleneck after the first job.
  for (const scenario of ["baseline", "accelerate"]) {
    const jobs = schedules[scenario].jobs;
    assert.equal(jobs[11].completedAt - jobs[10].completedAt, 4);
  }
  assert.equal(
    schedules.redesign.jobs[11].completedAt - schedules.redesign.jobs[10].completedAt,
    2,
  );
});
