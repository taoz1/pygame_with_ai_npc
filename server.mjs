import http from 'node:http';
import {readFile} from 'node:fs/promises';
const files={'/':'index.html','/index.html':'index.html','/app.js':'app.js','/engine.js':'engine.js','/style.css':'style.css'};
const mime={html:'text/html; charset=utf-8',js:'text/javascript; charset=utf-8',css:'text/css; charset=utf-8'};
http.createServer(async(req,res)=>{const file=files[new URL(req.url,'http://localhost').pathname];if(!file){res.writeHead(404);res.end('Not found');return;}try{res.setHeader('Content-Type',mime[file.split('.').pop()]);res.end(await readFile(new URL('./dist/'+file,import.meta.url)));}catch{res.writeHead(500);res.end('Unable to load page');}}).listen(3000,'0.0.0.0',()=>console.log('NPC Observatory: http://localhost:3000'));
