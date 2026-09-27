import {readFile,writeFile,mkdir} from 'node:fs/promises';
const assets={};
for(const name of ['index.html','app.js','engine.js','style.css']) assets['/'+name]={body:await readFile('dist/'+name,'utf8'),type:({'html':'text/html','js':'text/javascript','css':'text/css'})[name.split('.').pop()]+'; charset=utf-8'};
assets['/']=assets['/index.html'];
const api=await readFile('backend/deepseek.mjs','utf8');
await mkdir('dist/server',{recursive:true});await mkdir('dist/.openai',{recursive:true});
await writeFile('dist/server/index.js',api+'\nconst assets='+JSON.stringify(assets)+';\nexport default {async fetch(request,env){const path=new URL(request.url).pathname;if(path.startsWith("/api/"))return handleApi(request,env);const asset=assets[path];return asset?new Response(asset.body,{headers:{"Content-Type":asset.type,"X-Content-Type-Options":"nosniff"}}):new Response("Not found",{status:404});}};\n');
await writeFile('dist/.openai/hosting.json',await readFile('.openai/hosting.json'));
console.log('Built Worker with server-only DeepSeek calls.');
