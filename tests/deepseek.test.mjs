import test from 'node:test';
import assert from 'node:assert/strict';
import {handleApi,validateDecisions} from '../backend/deepseek.mjs';
import {createWorld,advanceAI} from '../dist/engine.js';
const decisions=['Mira','Theo','Jun','Ada'].map(name=>({name,action:'socialize',thought:'Find company.',speech:'Let us build a community garden.'}));
const request=(body=createWorld())=>new Request('http://localhost/api/turn',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
test('key remains server-side and provider uses the correct model',async()=>{
 const r=await handleApi(request(),{DEEPSEEK_API_KEY:'test-only-key'},async(url,opts)=>{
  assert.equal(url,'https://api.deepseek.com/chat/completions');assert.equal(opts.headers.Authorization,'Bearer test-only-key');
  const body=JSON.parse(opts.body);assert.equal(body.model,'deepseek-flash');assert.equal(body.thinking.type,'disabled');
  return Response.json({choices:[{finish_reason:'stop',message:{content:JSON.stringify({decisions})}}]});
 });assert.equal(r.status,200);const body=await r.text();assert.ok(!body.includes('test-only-key'));assert.deepEqual(JSON.parse(body).decisions,decisions);
});
test('missing key and malformed state make no provider calls',async()=>{
 const noCall=()=>{throw Error('Provider must not be called');};
 assert.equal((await handleApi(request(),{},noCall)).status,503);
 assert.equal((await handleApi(request({tick:1}),{DEEPSEEK_API_KEY:'test'},noCall)).status,400);
});
test('invalid model action is rejected and cannot mutate the world',async()=>{
 assert.throws(()=>validateDecisions({decisions:[...decisions.slice(0,3),{...decisions[3],action:'delete'}]}));
 const w=createWorld(),snapshot=JSON.stringify(w);
 assert.throws(()=>advanceAI(w,[]));assert.equal(JSON.stringify(w),snapshot);
 const r=await handleApi(request(),{DEEPSEEK_API_KEY:'test'},async()=>Response.json({choices:[{finish_reason:'stop',message:{content:'{}'}}]}));assert.equal(r.status,502);
});
test('provider errors redact upstream content',async()=>{
 const r=await handleApi(request(),{DEEPSEEK_API_KEY:'test'},async()=>new Response('private provider diagnostic',{status:401}));
 assert.equal(r.status,502);assert.ok(!(await r.text()).includes('private provider diagnostic'));
});
test('AI choices affect location, needs, dialogue memories, and relationships',()=>{
 const w=createWorld();const next=advanceAI(w,decisions);assert.equal(w.tick,8);assert.equal(next.tick,9);
 assert.ok(next.agents.every(a=>a.place===3&&a.memories.length===3));assert.equal(next.agents[0].bonds.Theo,1);assert.ok(next.agents[0].memories.some(m=>m.includes('community garden')));
});
