import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
const root=process.cwd();
const html=`<!doctype html><html><head><style>html,body{margin:0;background:#e8eef5}canvas{display:block;max-width:100%;height:auto!important}</style><script type="importmap">{"imports":{"three":"/three/build/three.module.js","three/addons/":"/three/examples/jsm/"}}</script></head><body><script type="module" src="/scene.js"></script></body></html>`;
createServer(async(req,res)=>{
  try{
    if(req.url==='/'){res.setHeader('Content-Type','text/html');res.end(html);return;}
    const path=req.url==='/scene.js'?resolve(root,'scripts/flow-film-scene.js'):resolve(root,'node_modules',req.url.slice(1));
    if(!path.startsWith(resolve(root,'node_modules/three'))&&req.url!=='/scene.js'){res.writeHead(404).end();return;}
    res.setHeader('Content-Type','text/javascript');res.end(await readFile(path));
  }catch{res.writeHead(404).end();}
}).listen(3111,'127.0.0.1',()=>console.log('Offline film studio: http://127.0.0.1:3111'));
