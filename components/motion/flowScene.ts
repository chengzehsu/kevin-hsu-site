import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { BATCH_SIZE, schedules, getJobState, getSnapshot, type ScenarioId } from "@/lib/flowSimulation";

export interface FlowFrame { time: number; completed: number; waiting: number; finished: boolean }
export interface FlowSceneOptions {
  scenario: ScenarioId; reduced: boolean; playing: boolean; seek: { time: number; revision: number };
}
export interface FlowSceneController {
  update: (options: FlowSceneOptions) => void;
  /** Render a deterministic, paused frame for offline capture. */
  capture: (time: number, scenario: ScenarioId) => HTMLCanvasElement;
  dispose: () => void;
}

const LAYOUTS = {
  baseline: [[-4.25, 0, -.65], [-2.1, 0, -.65], [-.1, 0, 1.15], [2.15, 0, 1.15], [4.35, 0, -.65]],
  redesign: [[-4.25, 0, .25], [-2.1, 0, .25], [0, 0, .25], [2.15, 0, .25], [4.35, 0, .25]],
} as const;
const INK = "#244461", BLUE = "#285cab", LIGHT_BLUE = "#9dc6e8", RATE = 4.5;

export function createFlowScene(host: HTMLDivElement, labels: HTMLElement[], initial: FlowSceneOptions, onFrame: (frame: FlowFrame) => void, onUnavailable: () => void): FlowSceneController {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "default" });
  const geometries = new Set<THREE.BufferGeometry>(), materials = new Set<THREE.Material>();
  const cleanups: Array<() => void> = [];
  let frameId = 0, disposed = false;
  function dispose() {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(frameId);
    for (const cleanup of cleanups.reverse()) cleanup();
    geometries.forEach((value) => value.dispose());
    materials.forEach((value) => value.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  }
  try {
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = .92;
  host.prepend(renderer.domElement);
  const scene = new THREE.Scene(), world = new THREE.Group();
  scene.add(world);
  const camera = new THREE.OrthographicCamera(-7, 7, 4, -4, .1, 80);
  camera.position.set(5, 9, 14);
  camera.lookAt(0, 0, 0);
  const room = new RoomEnvironment(), generator = new THREE.PMREMGenerator(renderer);
  let environment: THREE.WebGLRenderTarget;
  try { environment = generator.fromScene(room, .04); }
  finally { room.dispose(); generator.dispose(); }
  cleanups.push(() => environment.dispose());
  scene.environment = environment.texture;
  scene.environmentIntensity = .75;
  scene.add(new THREE.HemisphereLight("#f5f9ff", "#748797", 1.2));
  const light = new THREE.DirectionalLight("#f0f6ff", 2.2);
  light.position.set(-3, 8, 5); light.castShadow = true;
  light.shadow.mapSize.set(1024, 1024);
  Object.assign(light.shadow.camera, { left: -9, right: 9, top: 7, bottom: -7 });
  light.shadow.normalBias = .05; light.shadow.bias = -.0003;
  scene.add(light);
  cleanups.push(() => light.shadow.dispose());

  function geometry<T extends THREE.BufferGeometry>(v: T): T { geometries.add(v); return v; }
  function material<T extends THREE.Material>(v: T): T { materials.add(v); return v; }
  const deckGeometry = geometry(new RoundedBoxGeometry(1.52, .3, 1.24, 3, .12));
  const capGeometry = geometry(new RoundedBoxGeometry(1.43, .075, 1.15, 3, .08));
  const ticketGeometry = geometry(new RoundedBoxGeometry(.28, .095, .22, 2, .035));
  const detailGeometry = geometry(new THREE.BoxGeometry(.15, .005, .022));
  const stripeGeometry = geometry(new RoundedBoxGeometry(1.17, .035, .045, 2, .015));
  const deckMaterial = material(new THREE.MeshPhysicalMaterial({ color: "#aebfd1", metalness: .4, roughness: .3, clearcoat: 1, clearcoatRoughness: .2 }));
  const capMaterial = material(new THREE.MeshPhysicalMaterial({ color: "#bfd9ef", roughness: .3, metalness: .1, transmission: .18, thickness: .25, ior: 1.42, clearcoat: .7 }));
  const ticketMaterial = material(new THREE.MeshPhysicalMaterial({ color: BLUE, metalness: .42, roughness: .24, clearcoat: .8 }));
  const detailMaterial = material(new THREE.MeshBasicMaterial({ color: "#dfedfb" }));
  const railMaterial = material(new THREE.MeshStandardMaterial({ color: "#8da9c2", roughness: .32, metalness: .65 }));
  const activeRailMaterial = material(new THREE.MeshStandardMaterial({ color: BLUE, roughness: .22, metalness: .5 }));
  const floor = new THREE.Mesh(geometry(new THREE.PlaneGeometry(28, 20)), material(new THREE.ShadowMaterial({ opacity: .13, color: "#446485" })));
  floor.rotation.x = -Math.PI / 2; floor.position.y = -.35; floor.receiveShadow = true; world.add(floor);
  const initialRedesign = initial.scenario === "redesign";
  const positions = (initialRedesign ? LAYOUTS.redesign : LAYOUTS.baseline).map((p) => new THREE.Vector3(...p));
  const targets = positions.map((p) => p.clone());
  const decks = positions.map((position, index) => {
    const group = new THREE.Group(); group.position.copy(position);
    const body = new THREE.Mesh(deckGeometry, deckMaterial); body.castShadow = body.receiveShadow = true; group.add(body);
    const top = new THREE.Mesh(capGeometry, capMaterial); top.position.y = .19; top.receiveShadow = true; group.add(top);
    const stripeMaterial = material(new THREE.MeshStandardMaterial({ color: index === (initialRedesign ? 0 : 3) ? INK : LIGHT_BLUE, metalness: .4, roughness: .25 }));
    const stripe = new THREE.Mesh(stripeGeometry, stripeMaterial);
    stripe.position.set(0, .015, .628); group.add(stripe); world.add(group);
    return { group, stripeMaterial };
  });
  const rails = Array.from({ length: 4 }, () => { const mesh = new THREE.Mesh(geometry(new THREE.BufferGeometry()), initialRedesign ? activeRailMaterial : railMaterial); world.add(mesh); return mesh; });
  function updateRails() {
    rails.forEach((rail, i) => {
      const start = positions[i].clone().add(new THREE.Vector3(.7, -.03, 0));
      const end = positions[i + 1].clone().add(new THREE.Vector3(-.7, -.03, 0));
      const curve = new THREE.CubicBezierCurve3(start, start.clone().add(new THREE.Vector3(.42, 0, 0)), end.clone().add(new THREE.Vector3(-.42, 0, 0)), end);
      geometries.delete(rail.geometry); rail.geometry.dispose(); rail.geometry = geometry(new THREE.TubeGeometry(curve, 24, .034, 6, false));
    });
  }
  updateRails();
  const tickets = Array.from({ length: BATCH_SIZE }, () => {
    const group = new THREE.Group(), body = new THREE.Mesh(ticketGeometry, ticketMaterial); body.castShadow = true; group.add(body);
    for (let i = 0; i < 2; i++) { const detail = new THREE.Mesh(detailGeometry, detailMaterial); detail.position.set(0, .051, -.035 + i * .055); group.add(detail); }
    world.add(group); return group;
  });
  const projected = new THREE.Vector3(), desired = new THREE.Vector3(), source = new THREE.Vector3();
  let options = initial, time = Math.max(0, Math.min(schedules[initial.scenario].totalTime, initial.seek.time)), visible = true;
  let lastTime = 0, lastReport = -Infinity, morphUntil = 0, lastSeek = initial.seek.revision;
  let width = 1, height = 1, pointerX = 0, pointerY = 0, settleUntil = 0;

  // A request keeps its own queue slot. Removing another request therefore
  // cannot teleport the remaining cards. Active work has a separate front lane.
  function queuePosition(id: number, stage: number, target: THREE.Vector3) {
    target.copy(positions[stage]);
    target.x += -.42 + (id % 3) * .33;
    target.y += .31 + Math.floor(id / 6) * .105;
    target.z += -.26 + (Math.floor(id / 3) % 2) * .32;
  }
  function workPosition(stage: number, progress: number, target: THREE.Vector3) {
    target.copy(positions[stage]);
    target.x += -.23 + progress * .45;
    target.y += .33;
    target.z += .43;
  }
  function completedPosition(id: number, target: THREE.Vector3) {
    target.copy(positions[4]);
    target.x += ((id % 3) - 1) * .35;
    target.y += .31 + Math.floor(id / 6) * .105;
    target.z += (Math.floor(id / 3) % 2 - .5) * .32;
  }

  function report(now: number, force = false) {
    if (!force && now - lastReport < 120) return;
    lastReport = now;
    const schedule = schedules[options.scenario], snapshot = getSnapshot(schedule, time);
    onFrame({ time, completed: snapshot.completed, waiting: snapshot.waiting, finished: time >= schedule.totalTime });
    labels.forEach((label, i) => {
      const queue = label.querySelector<HTMLElement>("[data-queue]");
      if (queue) { queue.dataset.count = String(snapshot.stageQueues[i]); const count = queue.querySelector("b"); if (count) count.textContent = String(snapshot.stageQueues[i]); }
    });
  }
  function draw(now: number, capture = false) {
    if (capture && frameId) cancelAnimationFrame(frameId);
    frameId = 0;
    if (disposed || (!capture && (!visible || document.hidden))) { lastTime = 0; return; }
    try {
    const delta = !capture && lastTime ? Math.min((now - lastTime) / 1000, .05) : 0; lastTime = now;
    const schedule = schedules[options.scenario], morphing = now < morphUntil;
    if (!capture && options.playing && !options.reduced && !morphing) time = Math.min(schedule.totalTime, time + delta * RATE);
    let shifted = false;
    positions.forEach((p, i) => {
      if (p.distanceToSquared(targets[i]) > .000001) { p.lerp(targets[i], options.reduced ? 1 : 1 - Math.exp(-delta * 7)); shifted = true; }
      decks[i].group.position.copy(p);
    });
    if (shifted) updateRails();
    world.rotation.y = THREE.MathUtils.damp(world.rotation.y, options.reduced ? 0 : pointerX * .07, 6, delta);
    world.rotation.x = THREE.MathUtils.damp(world.rotation.x, options.reduced ? 0 : pointerY * .025, 6, delta);
    schedule.jobs.forEach((job, i) => {
      const state = getJobState(job, time), ticket = tickets[i];
      if (state.stage === "done") {
        completedPosition(i, desired);
      } else {
        const stage = state.stage, entry = job.stages[stage];
        if (state.phase === "queued" || stage === 2) {
          queuePosition(i, stage, desired);
        } else {
          workPosition(stage, state.progress, desired);
          if (entry.start > entry.arrival) {
            const pickup = Math.min(1, (time - entry.start) / Math.min(.3, (entry.end - entry.start) * .25));
            if (pickup < 1) {
              queuePosition(i, stage, source);
              desired.lerpVectors(source, desired, pickup);
              desired.y += Math.sin(pickup * Math.PI) * .28;
            }
          }
          // Delivery settles into storage before its completion boundary, so
          // the final frame contains twelve finished cards, with no last jump.
          if (stage === 4) {
            const landingDuration = Math.min(.3, (entry.end - entry.start) * .3);
            const landing = Math.max(0, 1 - (entry.end - time) / landingDuration);
            if (landing > 0) {
              completedPosition(i, source);
              desired.lerp(source, landing);
              desired.y += Math.sin(landing * Math.PI) * .2;
            }
          }
        }
        const flightDuration = Math.min(.45, (entry.end - entry.arrival) * .35);
        const arrivalProgress = Math.min(1, Math.max(0, (time - entry.arrival) / flightDuration));
        if (stage > 0 && arrivalProgress < 1) {
          if (stage - 1 === 2) queuePosition(i, stage - 1, source);
          else workPosition(stage - 1, 1, source);
          desired.lerpVectors(source, desired, arrivalProgress); desired.y += Math.sin(arrivalProgress * Math.PI) * .38;
        }
      }
      ticket.position.copy(desired); ticket.rotation.y = options.scenario === "redesign" ? -.05 : .08;
    });
    world.updateMatrixWorld(true);
    labels.forEach((label, i) => {
      projected.copy(positions[i]).add(new THREE.Vector3(0, .36, -.4)).applyMatrix4(world.matrixWorld).project(camera);
      label.style.transform = `translate(${(projected.x * .5 + .5) * width}px, ${(-projected.y * .5 + .5) * height}px) translate(-50%, -100%)`;
    });
    renderer.render(scene, camera); report(now, capture || time >= schedule.totalTime);
    if (!capture && ((options.playing && !options.reduced && time < schedule.totalTime) || shifted || now < settleUntil || morphing)) invalidate();
    } catch { dispose(); onUnavailable(); }
  }
  function invalidate() { if (!frameId && !disposed && visible && !document.hidden) frameId = requestAnimationFrame(draw); }
  function resize() {
    width = Math.max(1, host.clientWidth); height = Math.max(1, host.clientHeight);
    renderer.setSize(width, height, false);
    const viewHeight = Math.max(4.9, 11.7 * height / width);
    camera.left = -viewHeight * width / height / 2; camera.right = -camera.left; camera.top = viewHeight / 2; camera.bottom = -camera.top;
    camera.updateProjectionMatrix(); camera.updateMatrixWorld(true);
    // A visible snapshot is required before "ready", even when a background
    // tab or native dialog currently prevents requestAnimationFrame callbacks.
    draw(performance.now(), true); invalidate();
  }
  function pointer(event: PointerEvent) {
    if (event.pointerType !== "mouse" || options.reduced) return;
    const bounds = host.getBoundingClientRect();
    pointerX = ((event.clientX - bounds.left) / width - .5) * 2; pointerY = ((event.clientY - bounds.top) / height - .5) * 2;
    settleUntil = performance.now() + 800; invalidate();
  }
  function leave() { pointerX = pointerY = 0; settleUntil = performance.now() + 800; invalidate(); }
  function visibility() { lastTime = 0; invalidate(); }
  function lost(event: Event) { event.preventDefault(); dispose(); onUnavailable(); }
  const observer = new ResizeObserver(resize); cleanups.push(() => observer.disconnect()); observer.observe(host);
  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting; lastTime = 0;
    if (!visible && frameId) { cancelAnimationFrame(frameId); frameId = 0; } invalidate();
  });
  cleanups.push(() => intersection.disconnect());
  intersection.observe(host);
  host.addEventListener("pointermove", pointer); host.addEventListener("pointerleave", leave);
  document.addEventListener("visibilitychange", visibility); renderer.domElement.addEventListener("webglcontextlost", lost);
  cleanups.push(() => {
    host.removeEventListener("pointermove", pointer); host.removeEventListener("pointerleave", leave);
    document.removeEventListener("visibilitychange", visibility); renderer.domElement.removeEventListener("webglcontextlost", lost);
  });
  function setLayout(scenario: ScenarioId, immediate: boolean) {
    const layout = scenario === "redesign" ? LAYOUTS.redesign : LAYOUTS.baseline;
    targets.forEach((p, i) => { const point = layout[i]; p.set(point[0], point[1], point[2]); });
    if (immediate) { positions.forEach((p, i) => p.copy(targets[i])); updateRails(); }
    rails.forEach((rail) => { rail.material = scenario === "redesign" ? activeRailMaterial : railMaterial; });
    decks.forEach((deck, i) => deck.stripeMaterial.color.set(i === (scenario === "redesign" ? 0 : 3) ? INK : LIGHT_BLUE));
  }
  function update(next: FlowSceneOptions) {
    if (disposed) return;
    if (next.scenario !== options.scenario) {
      const immediate = next.reduced || !visible || document.hidden;
      setLayout(next.scenario, immediate);
      morphUntil = immediate ? 0 : performance.now() + 950; time = 0;
    }
    if (next.seek.revision !== lastSeek) { time = Math.max(0, Math.min(schedules[next.scenario].totalTime, next.seek.time)); lastSeek = next.seek.revision; }
    options = next; lastTime = 0; draw(performance.now(), true); invalidate();
  }
  function capture(value: number, scenario: ScenarioId) {
    if (disposed) throw new Error("Cannot capture a disposed flow scene");
    cancelAnimationFrame(frameId); frameId = 0;
    if (options.scenario !== scenario || positions.some((position, i) => !position.equals(targets[i]))) setLayout(scenario, true);
    options = { ...options, scenario, playing: false };
    time = Math.max(0, Math.min(schedules[scenario].totalTime, value));
    lastTime = morphUntil = settleUntil = pointerX = pointerY = 0;
    world.rotation.set(0, 0, 0);
    draw(performance.now(), true);
    if (disposed) throw new Error("The flow scene could not render");
    return renderer.domElement;
  }
  resize();
  if (disposed) throw new Error("The flow scene could not render its first frame");
  return { update, capture, dispose };
  } catch (error) { dispose(); throw error; }
}
