export const WIDTH=768,HEIGHT=512;
export const npcs=[
 {id:'liang',name:'梁志成',role:'维修师傅',x:236,y:286,color:'#b46b4b',intro:'新来的？先别急着动手。把试验表看明白，比逞能重要。',suggestions:['我发现试验表有一处问题','这里的工作一直这么赶吗？']},
 {id:'xu',name:'许澄',role:'研发负责人',x:592,y:326,color:'#4f8e9d',intro:'设备验证还没结束。任何异常都要留下记录，不要只口头说。',suggestions:['我想了解这套设备','你为什么坚持做自动化？']},
 {id:'zhou',name:'周野',role:'现场操作员 · 弟弟',x:650,y:326,color:'#6a7eb3',intro:'哥，你终于来了。这里的人说话直，但做事靠得住。先别急着下判断。',suggestions:['你在这里过得怎么样？','为什么劝我来榕海？']},
 {id:'he',name:'何柏翰',role:'测试员 · 台湾朋友',x:136,y:286,color:'#9170a5',intro:'我还在看机会。这里不是我想象的那样，但也没简单到让我马上改变主意。',suggestions:['你会留下吗？','你觉得我们能融入吗？']}
];
export const terminal={x:526,y:232,w:72,h:40,name:'异常控制柜'};
export function createState(){return {player:{x:322,y:432,dir:'up'},quest:0,clues:0,belonging:5,met:[],inspected:false,notes:['来到榕海的第三个月。我仍告诉自己：这里只是暂时谋生的地方。'],memories:{}};}
export const quests=[
 {title:'入职第一天',copy:'找到维修师傅梁志成，确认今天的设备检查安排。'},
 {title:'试验表里的疑点',copy:'老梁没有否定你的判断。去研发区调查闪烁的异常控制柜。'},
 {title:'把问题说清楚',copy:'带着控制柜的记录去找研发负责人许澄，要求暂停核对。'},
 {title:'共同完成任务',copy:'异常已被记录。继续认识园区里的人，听听他们为什么来到这里。'},
 {title:'序章 · 第一天完成',copy:'你没有立刻把这里当成家，但第一次觉得：也许值得多留一天。'}
];
export function distance(a,b){return Math.hypot(a.x-b.x,a.y-b.y)}
export function nearestTarget(state){const p=state.player;const nearNpc=npcs.map(n=>({...n,d:distance(p,n)})).sort((a,b)=>a.d-b.d)[0];const tc={...terminal,x:terminal.x+terminal.w/2,y:terminal.y+terminal.h/2};if(state.quest===1&&distance(p,tc)<72)return {type:'terminal',...tc};return nearNpc.d<64?{type:'npc',...nearNpc}:null;}
export function recordMeeting(state,id){if(!state.met.includes(id))state.met.push(id);if(id==='liang'&&state.quest===0){state.quest=1;state.belonging+=2;state.notes.unshift('老梁先暂停了流程。确认我指出的问题后，他把我的名字写进修改记录。');}if(id==='xu'&&state.quest===2){state.quest=3;state.belonging+=3;state.notes.unshift('许澄接受了异常记录，并把验证拆成三步。没有人要求我用沉默换取融入。');}if(state.quest===3&&state.met.length===4){state.quest=4;state.belonging+=5;state.notes.unshift('我记住了四个人的理由。他们不是抽象标签，而是具体的同事。');}}
export function inspect(state){if(state.quest!==1)return false;state.inspected=true;state.quest=2;state.clues++;state.notes.unshift('控制柜日志：07:43 出现一次过温警告，08:02 被标为“已解除”，但没有复核签名。');return true;}
