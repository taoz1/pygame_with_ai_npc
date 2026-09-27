import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {Readable} from 'node:stream';
import {handleApi} from './backend/deepseek.mjs';
const files={'/':'index.html','/index.html':'index.html','/app.js':'app.js','/engine.js':'engine.js','/style.css':'style.css'};
const mime={html:'text/html; charset=utf-8',js:'text/javascript; charset=utf-8',css:'text/css; charset=utf-8'};
http.createServer(async(req,res)=>{try{
  const url=new URL(req.url,'http://localhost:3000');
  if(url.pathname.startsWith('/api/')){
    const request=new Request(url,{method:req.method,headers:req.headers,...(!['GET','HEAD'].includes(req.method)?{body:Readable.toWeb(req),duplex:'half'}:{})});
    const result=await handleApi(request,process.env);res.writeHead(result.status,Object.fromEntries(result.headers));res.end(await result.text());return;
  }
  const file=files[url.pathname];if(!file){res.writeHead(404);res.end('Not found');return;}
  res.setHeader('Content-Type',mime[file.split('.').pop()]);res.end(await readFile(new URL('./dist/'+file,import.meta.url)));
}catch{res.writeHead(500);res.end('Unable to load page');}}).listen(3000,'0.0.0.0',()=>console.log('最后一班 RPG: http://localhost:3000'));
