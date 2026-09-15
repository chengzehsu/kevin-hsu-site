// Offline art-directed source for the portfolio film. Never shipped to visitors.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const W = 1200, H = 1000;
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setSize(W, H);
renderer.setClearColor('#e8eef5');
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = .95;
document.body.append(renderer.domElement);
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-5.35, 5.35, 4.46, -4.46, .1, 100);
camera.position.set(8, 9.5, 13);
camera.lookAt(0, .25, 0);
const room = new RoomEnvironment(), pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(room, .025).texture;
scene.environmentIntensity = .75;
scene.add(new THREE.HemisphereLight('#eaf4ff', '#7189a4', 1.4));
const sun = new THREE.DirectionalLight('#fffaf2', 3);
sun.position.set(-4, 9, 6); sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -10, right: 10, top: 10, bottom: -10 });
sun.shadow.normalBias = .03; sun.shadow.bias = -.0001;
scene.add(sun);
const floor = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshStandardMaterial({ color: '#e8eef5', roughness: 1, metalness: 0 }));
floor.rotation.x = -Math.PI / 2; floor.position.y = -.42; floor.receiveShadow = true; scene.add(floor);
scene.fog = new THREE.Fog('#e8eef5', 22, 42);
const world = new THREE.Group(); world.rotation.y = -.10; scene.add(world);
const silver = new THREE.MeshPhysicalMaterial({ color: '#bcc9d6', metalness: .7, roughness: .28, clearcoat: 1 });
const porcelain = new THREE.MeshPhysicalMaterial({ color: '#eef3f9', metalness: .08, roughness: .23, clearcoat: .9 });
const glass = new THREE.MeshPhysicalMaterial({ color: '#4283cf', metalness: .06, roughness: .14, transmission: .72, thickness: .55, ior: 1.45, clearcoat: 1 });
const cobalt = new THREE.MeshPhysicalMaterial({ color: '#2158a7', metalness: .4, roughness: .22, clearcoat: 1 });
const mark = new THREE.MeshStandardMaterial({ color: '#ddecff', metalness: .1, roughness: .45 });
function box(w,h,d,r,mat) { const mesh = new THREE.Mesh(new RoundedBoxGeometry(w,h,d,4,r),mat);mesh.castShadow=mesh.receiveShadow=true;return mesh; }
const block = new THREE.Group();
const plinth=box(2.35,.35,2.4,.16,silver);plinth.position.y=-.1;block.add(plinth);
const base=box(2.2,.16,2.25,.1,porcelain);base.position.y=.16;block.add(base);
block.position.set(-2.9,0,0);world.add(block);
const destination = new THREE.Group();
const end=box(1.75,.24,2.35,.13,silver);destination.add(end);
const endCap=box(1.65,.10,2.25,.09,porcelain);endCap.position.y=.17;destination.add(endCap);
destination.position.set(3.45,0,0);world.add(destination);

const gateways=[];
for(let i=0;i<3;i++){
  const group=new THREE.Group();
  const layer=box(1.9,.38,1.45,.16,glass);layer.position.y=.22;group.add(layer);
  const trim=box(1.85,.06,1.42,.07,silver);trim.position.y=-.015;group.add(trim);
  const slit=box(1.5,.026,.04,.012,cobalt);slit.position.set(0,.17,.728);group.add(slit);
  gateways.push(group);world.add(group);
}
const railMaterial=new THREE.MeshStandardMaterial({color:'#4b7daf',metalness:.65,roughness:.26});
const rails=Array.from({length:6},()=>{const mesh=new THREE.Mesh(new THREE.BufferGeometry(),railMaterial);world.add(mesh);return mesh;});
function rail(mesh,a,b){
  const start=new THREE.Vector3(...a),end=new THREE.Vector3(...b);
  const curve=new THREE.CubicBezierCurve3(start,start.clone().add(new THREE.Vector3(.7,0,0)),end.clone().add(new THREE.Vector3(-.7,0,0)),end);
  mesh.geometry.dispose();mesh.geometry=new THREE.TubeGeometry(curve,32,.035,8,false);
}
const tickets=[];
for(let i=0;i<21;i++){
  const group=new THREE.Group(), body=box(.4,.115,.29,.045,cobalt);group.add(body);
  for(let j=0;j<2;j++){const stripe=box(.23,.007,.02,.003,mark);stripe.position.set(0,.061,-.045+j*.07);group.add(stripe);}
  tickets.push(group);world.add(group);
}
let previousSpread=-1;
function ease(value){const t=Math.min(1,Math.max(0,value));return t*t*(3-2*t);}
function queuePosition(order) {
  return new THREE.Vector3(-3.55+(order%3)*.5,.32+Math.floor(order/9)*.14,-.75+(Math.floor(order/3)%3)*.53);
}
function deliveryPosition(order) {
  return new THREE.Vector3(3+(order%3)*.45,.29+Math.floor(order/9)*.125,-.7+(Math.floor(order/3)%3)*.56);
}
function railPoint(start,end,progress) {
  return new THREE.CubicBezierCurve3(start,start.clone().add(new THREE.Vector3(.7,0,0)),end.clone().add(new THREE.Vector3(-.7,0,0)),end).getPoint(progress);
}
function draw(t){
  const spread=ease((t-6)/3.3);
  const open=spread;
  gateways.forEach((group,i)=>{
    group.position.set(.05+(i-1)*.24*open,(2-i)*.5*(1-open)+.2+Math.sin(i*1.3)*.05*open,(i-1)*1.9*open);
    group.rotation.y=(i-1)*-.10*open;
  });
  if(Math.abs(spread-previousSpread)>.001){
    gateways.forEach((g,i)=>{
      rail(rails[i*2],[-1.77,.4,(i-1)*.55],[g.position.x-.92,g.position.y+.43,g.position.z]);
      rail(rails[i*2+1],[g.position.x+.92,g.position.y+.43,g.position.z],[2.6,.4,(i-1)*.7]);
    });previousSpread=spread;
  }
  tickets.forEach((ticket,i)=>{
    const order=20-i, arrival=Math.max(0,(order-4)*.13);
    ticket.visible=t>=arrival;
    const start=queuePosition(order),finish=deliveryPosition(i);
    const progress=(t-8.4-i*.11)/2.55;
    ticket.rotation.set(0,0,0);
    if(progress<=0){
      ticket.position.copy(start);
      // A short weighted landing, rather than cards popping into existence.
      const settle=ease((t-arrival)/.26);
      ticket.position.y+=.38*(1-settle);
      ticket.rotation.z=.055*Math.sin(settle*Math.PI);
    }else if(progress>=1){
      ticket.position.copy(finish);
    }else{
      const lane=i%3,g=gateways[lane];
      const entry=new THREE.Vector3(-1.77,.49,(lane-1)*.55);
      const left=new THREE.Vector3(g.position.x-.92,g.position.y+.52,g.position.z);
      const right=new THREE.Vector3(g.position.x+.92,g.position.y+.52,g.position.z);
      const exit=new THREE.Vector3(2.6,.49,(lane-1)*.7);
      let position;
      if(progress<.18){
        const p=ease(progress/.18);
        position=start.clone().lerp(entry,p);position.y+=Math.sin(p*Math.PI)*.18;
      }else if(progress<.42) position=railPoint(entry,left,(progress-.18)/.24);
      else if(progress<.62) position=left.clone().lerp(right,(progress-.42)/.2);
      else if(progress<.86) position=railPoint(right,exit,(progress-.62)/.24);
      else {
        const p=ease((progress-.86)/.14);
        position=exit.clone().lerp(finish,p);position.y+=Math.sin(p*Math.PI)*.10;
      }
      ticket.position.copy(position);
    }
  });
  // Four deliberate shots: macro queue, reveal the system, reorganize from
  // above, then a slow resolving track across the working system.
  const reveal=ease((t-3)/3), rebuild=ease((t-6)/3.3), resolve=ease((t-10)/3);
  const targetX=-2.7*(1-reveal);
  camera.position.set(targetX+8-rebuild*2+resolve*1.2,9.5+rebuild*3-resolve*2,13);
  camera.lookAt(targetX,.3,0);
  camera.zoom=1.85-.85*reveal+.06*rebuild-.06*resolve;
  camera.updateProjectionMatrix();
  world.rotation.y=-.14+rebuild*.1-resolve*.06;
  renderer.render(scene,camera);
}
draw(0);
window.flowFilm = {
  draw,
  poster: () => {draw(9.2);return renderer.domElement.toDataURL('image/png');},
  frame: (time) => {draw(time);return renderer.domElement.toDataURL('image/jpeg',.94);},
};
