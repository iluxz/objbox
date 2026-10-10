// ── DEAD AIR: battle-cats-style lane battler (send signals, break the static) ──
(function(){
// ── save ──
function tbSave(){try{return JSON.parse(localStorage.getItem('cube_tbb')||'{}')}catch(e){return{}}}
var tbXP=0,tbLevels={},tbBeaten={},tbTum={};
function tbLoad(){try{var s=tbSave();if(typeof s.xp==='number')tbXP=s.xp;if(s.levels)tbLevels=s.levels;if(s.beaten)tbBeaten=s.beaten;if(s.tum)tbTum=s.tum}catch(e){}}
function tbPersist(){try{localStorage.setItem('cube_tbb',JSON.stringify({xp:tbXP,levels:tbLevels,beaten:tbBeaten,tum:tbTum}))}catch(e){}}
// ── roster: player-sendable signals ──
// {cost,hp,dmg,rng(lane units),sp(units/s),cd(s),aoe?}
var TB_UNITS={
spark:{n:'spark',cost:50,hp:130,dmg:12,rng:4,sp:7,cd:3},
cutter:{n:'cutter',cost:75,hp:100,dmg:24,rng:4,sp:9,cd:4},
echo:{n:'echo',cost:100,hp:70,dmg:20,rng:16,sp:6,cd:5},
bulwark:{n:'bulwark',cost:100,hp:420,dmg:5,rng:3,sp:5,cd:8},
dart:{n:'dart',cost:150,hp:100,dmg:32,rng:5,sp:11,cd:6},
mortar:{n:'mortar',cost:200,hp:130,dmg:65,rng:5,sp:7,cd:10,aoe:6},
rail:{n:'rail',cost:250,hp:80,dmg:110,rng:20,sp:6,cd:12},
maul:{n:'maul',cost:300,hp:280,dmg:85,rng:4,sp:4.5,cd:14}
};
var TB_UORDER=['spark','cutter','echo','bulwark','dart','mortar','rail','maul'];
// unit unlocks: beat the listed stage to enlist (tbb-style progression)
var TB_UNLOCK={spark:1,cutter:3,echo:5,bulwark:7,dart:9,mortar:10,rail:15,maul:20};
function tbMaxStage(){var m=1;for(var k in tbBeaten){if(!tbBeaten.hasOwnProperty(k))continue;var p=k.split('_');if(p[0]!=='1')continue;var n=parseInt(p[1],10);if(n>m)m=n}return m}
function tbUnitOpen(id){return tbMaxStage()>=(TB_UNLOCK[id]||1)}
// ── static roster (ch1). mag multiplies hp/dmg ──
var TB_FOES={
fuzz:{hp:60,dmg:8,rng:4,sp:6,atk:2},
slab:{hp:220,dmg:6,rng:3,sp:4.5,atk:2.5},
shiv:{hp:55,dmg:14,rng:4,sp:8,atk:1.8},
hiss:{hp:45,dmg:12,rng:15,sp:5,atk:2.5},
zip:{hp:50,dmg:10,rng:4,sp:10,atk:1.5},
pop:{hp:35,dmg:6,rng:4,sp:12,atk:1.2},
rush:{hp:40,dmg:9,rng:4,sp:14,atk:1.2},
mend:{hp:120,dmg:10,rng:4,sp:6,atk:2,regen:4},
anchor:{hp:300,dmg:16,rng:4,sp:3,atk:3},
longshot:{hp:60,dmg:40,rng:18,sp:5,atk:3.5},
boom:{hp:30,dmg:60,rng:3,sp:9,atk:1,kamikaze:1},
crush:{hp:200,dmg:30,rng:4,sp:4,atk:2.5},
burst:{hp:90,dmg:25,rng:5,sp:6,atk:2.5,aoe:5},
brute:{hp:600,dmg:22,rng:5,sp:4,atk:2.5,big:1},
deadbolt:{hp:900,dmg:28,rng:6,sp:3.5,atk:2.5,big:1,boss:1},
overdub:{hp:1800,dmg:42,rng:6,sp:4.5,atk:2.2,big:1,boss:1},
deadair:{hp:1600,dmg:48,rng:7,sp:4,atk:2,summon:'brute',big:1,boss:1}
};
// ── chapter 1: pilot season ──
var TB_CH1_NAMES=['test pattern','vertical hold','dead air','sweeps week','prime time','reruns','static cling','channel hop','body block','DEADBOLT','spam folder','in a hurry','damage sponge','gravity check','stunt double','blow it up','jump scare','team huddle','bullet ballet','OVERDUB','full stop','pass the mic','heavy rotation','hard cut','cliffhanger','demolition derby','special guest','bottle episode','doomscrolling','THE DEAD AIR'];
var TB_CH1_POOL=[['fuzz'],['fuzz','slab'],['fuzz','shiv'],['fuzz','hiss'],['zip','pop','rush'],['pop','zip'],['pop','shiv'],['zip','shiv','hiss'],['slab','fuzz'],['pop'],['fuzz','shiv','zip'],['rush','zip'],['slab','anchor'],['anchor','slab'],['rush','zip','pop'],['boom','fuzz'],['boom','zip'],['slab','shiv','hiss'],['hiss','longshot'],['longshot'],['crush','fuzz'],['burst','shiv'],['crush','shiv'],['anchor','crush'],['brute','zip','rush'],['boom','burst'],['longshot','hiss'],['shiv','crush','zip'],['anchor','longshot','brute'],['anchor','longshot','crush']];
var TB_CH1_BOSS={10:'deadbolt',20:'overdub',30:'deadair'};
var TB_CH=[{name:'pilot season',trait:'reruns',names:TB_CH1_NAMES,pools:TB_CH1_POOL,bosses:TB_CH1_BOSS}];
// chapters 2-8: locked (content drops)
var TB_CH_LOCKED=['season two','the static sea','pay-per-view','the lost tapes','???','???','???'];
// ── seeded rng ──
function tbRng(seed){var s=seed>>>0;return function(){s=(s*1664525+1013904223)>>>0;return s/4294967296}}
// stage type: regular / challenge(5,15,25) / boss(10,20) / final(30)
function tbStageType(n){if(n===30)return 'final';if(n===10||n===20)return 'boss';if(n===5||n===15||n===25)return 'challenge';return 'regular'}
// build a stage runtime from chapter/stage/overdrive
function tbBuildStage(ch,n,od){
var C=TB_CH[ch-1];
var type=tbStageType(n);
var R=tbRng(ch*1000+n*17+(od?7919:0));
var mag=(1+n*0.04)*(type==='challenge'?1.4:1)*(od?2:1);
var pool=C.pools[n-1]||['fuzz'];
var budget=3+Math.floor(n*0.9)+(type==='regular'?0:3);
if(type==='final')budget=Math.min(budget,8);
var q=[];
var t=7+R()*4;
if(C.bosses[n])q.push({t:8,type:C.bosses[n]});
for(var i=0;i<budget;i++){
var ty=pool[Math.floor(R()*pool.length)];
if(TB_FOES[ty]&&TB_FOES[ty].boss)ty=pool[0];
q.push({t:t,type:ty,trick:(type==='final'?0.6:1)});
t+=(type==='final'?6+R()*6:(type==='regular'?2.5+R()*4:3.5+R()*5));
if(R()<0.3){var g=2+Math.floor(R()*3);for(var k=0;k<g;k++)q.push({t:t+k*1.2,type:ty,trick:(type==='final'?0.6:1)});t+=3}
}
var ebase=Math.round((300+n*40)*(type==='boss'?1.6:(type==='final'?2.2:(type==='challenge'?1.3:1)))*(od?2:1));
return {ch:ch,n:n,name:C.names[n-1]||('stage '+n),type:type,od:!!od,mag:mag,queue:q,ebase:ebase,pbase:1500,rate:8+Math.min(2,n/12),summonT:type==='final'?20:null};
}
// ── battle state ──
var tbB=null,tbIv=null,tbAuto=false;
function tbLoopOn(){return !!tbIv}
function tbLvl(id){return tbLevels[id]||1}
function tbMult(id){return 1+0.15*(tbLvl(id)-1)}
function tbStartBattle(ch,n,od){
var st=tbBuildStage(ch,n,od);
tbB={st:st,time:0,energy:300,max:500,units:[],foes:[],ebase:st.ebase,pbase:st.pbase,cds:{},cannonCd:20,worker:1,over:null,summonT:st.summonT,uid:1};
try{tbB.geo=(typeof geoFx==='function')?geoFx():{dmg:1,xp:1,rate:0,max:0,pbase:1,cd:30}}catch(e){tbB.geo={dmg:1,xp:1,rate:0,max:0,pbase:1,cd:30}}
if(tbB.geo.pbase&&tbB.geo.pbase!==1){tbB.pbase=Math.round(tbB.pbase*tbB.geo.pbase);tbB.st.pbase=tbB.pbase}
try{tbShowScreen(null)}catch(e){}
try{tbBuildBattle()}catch(e){}
try{tbSay(null)}catch(e){}
var boss=st.queue.length&&TB_FOES[st.queue[0].type].boss?st.queue[0].type:null;
try{tbAnnounce(ch,n,st.type,boss,od)}catch(e){}
}
function tbNearestFoe(x,dir){var best=null,bd=1e9;for(var i=0;i<tbB.foes.length;i++){var f=tbB.foes[i];if(f.hp<=0)continue;var d=(f.x-x)*dir;if(d>0&&d<bd){bd=d;best=f}}return {u:best,d:bd}}
function tbNearestUnit(x,dir){var best=null,bd=1e9;for(var i=0;i<tbB.units.length;i++){var u=tbB.units[i];if(u.hp<=0)continue;var d=(u.x-x)*dir;if(d>0&&d<bd){bd=d;best=u}}return {u:best,d:bd}}
function tbBehind(list,x,dir){var best=null,bd=2.5;for(var i=0;i<list.length;i++){var o=list[i];if(o.hp<=0)continue;var d=(o.x-x)*dir;if(d<=0&&-d<bd){bd=-d;best=o}}return best}
function tbBlockedBy(list,x,dir){for(var i=0;i<list.length;i++){var o=list[i];if(o.hp<=0)continue;var d=(o.x-x)*dir;if(d>0&&d<=1.5)return true}return false}
function tbDamageFoes(list,dmg){for(var i=0;i<list.length;i++){list[i].hp-=dmg;list[i].flash=0.12}}
function tbDamageUnits(list,dmg){for(var i=0;i<list.length;i++){list[i].hp-=dmg;list[i].flash=0.12}}
function tbTick(dt){
if(!tbB||tbB.over)return;
var B=tbB,st=B.st;
B.time+=dt;
B.max=500+(B.worker-1)*150+(B.geo.max||0);
B.energy=Math.min(B.max,B.energy+(st.rate+(B.worker-1)*4+(B.geo.rate||0))*dt);
if(B.cannonCd>0)B.cannonCd-=dt;
// enemy spawns (final: cap concurrent escorts so the finale stays a fight, not a flood)
for(var qi=B.st.queue.length-1;qi>=0;qi--){var q=B.st.queue[qi];
if(q.t<=B.time){var qIsBoss=TB_FOES[q.type]&&TB_FOES[q.type].boss;if(!qIsBoss&&B.st.type==='final'&&B.foes.length>=5)continue;B.st.queue.splice(qi,1);var F=TB_FOES[q.type];if(F)tbSpawnFoe(q.type,F,Math.min(st.mag,1.8)*(q.trick||1))}}
// final boss summons (capped like escorts: no flooding)
if(B.summonT&&B.time>=B.summonT){if(B.foes.length>=5){B.summonT+=10}else{B.summonT+=50;var SF=TB_FOES.brute;if(SF)tbSpawnFoe('brute',SF,Math.min(st.mag,1.8))}}
// player units think
for(var ui=0;ui<B.units.length;ui++){var u=B.units[ui];if(u.hp<=0)continue;
u.cd-=dt;if(u.flash>0)u.flash-=dt;
var tgt=tbNearestFoe(u.x,1);
var backB=(!tgt.u||tgt.d>u.rng)?tbBehind(B.foes,u.x,1):null;
var ftgt=(tgt.u&&tgt.d<=u.rng)?tgt.u:backB;
var goalX=98;
if(ftgt){if(u.cd<=0){u.cd=u.atk||2;tbHitFoe(u,ftgt)}}
else{if(tgt.u)goalX=tgt.u.x;var dx=goalX-u.x;if(Math.abs(98-u.x)<=u.rng){if(u.cd<=0){u.cd=u.atk||2;B.ebase-=u.dmg;if(B.ebase<=0){B.ebase=0;tbEnd(true);return}}}else if(!tbBlockedBy(B.foes,u.x,1))u.x+=Math.sign(dx)*Math.min(Math.abs(dx),u.sp*dt)}
}
// foe units think
for(var fi=0;fi<B.foes.length;fi++){var f=B.foes[fi];if(f.hp<=0)continue;
if(f.regen)f.hp=Math.min(f.maxhp,f.hp+f.regen*dt);
if(f.flash>0)f.flash-=dt;
f.cd-=dt;
var tgt2=tbNearestUnit(f.x,-1);
var backU=(!tgt2.u||tgt2.d>f.rng)?tbBehind(B.units,f.x,-1):null;
var ftgt2=(tgt2.u&&tgt2.d<=f.rng)?tgt2.u:backU;
if(ftgt2){if(f.cd<=0){f.cd=f.atk;tbHitUnit(f,ftgt2)}}
else{var dx2=(tgt2.u?tgt2.u.x:2)-f.x;if(Math.abs(f.x-2)<=f.rng){if(f.cd<=0){f.cd=f.atk;B.pbase-=f.dmg;if(B.pbase<=0){B.pbase=0;tbEnd(false);return}}}else if(!tbBlockedBy(B.units,f.x,-1))f.x+=Math.sign(dx2)*Math.min(Math.abs(dx2),f.sp*dt)}
}
// cleanup + autoplay
B.units=B.units.filter(function(u){return u.hp>0});
B.foes=B.foes.filter(function(f){return f.hp>0});
if(tbAuto)tbAutoThink();
try{tbPaint()}catch(e){}
}
function tbHitFoe(u,f){
if(u.aoe){var hit=[];for(var i=0;i<tbB.foes.length;i++){var o=tbB.foes[i];if(o.hp>0&&Math.abs(o.x-f.x)<=u.aoe)hit.push(o)}tbDamageFoes(hit,u.dmg)}
else{f.hp-=u.dmg;f.flash=0.12}
if(u.kamikaze)u.hp=0;
}
function tbHitUnit(f,u){
if(f.aoe){var hit=[];for(var i=0;i<tbB.units.length;i++){var o=tbB.units[i];if(o.hp>0&&Math.abs(o.x-u.x)<=f.aoe)hit.push(o)}tbDamageUnits(hit,f.dmg)}
else{u.hp-=f.dmg;u.flash=0.12}
if(f.kamikaze)f.hp=0;
}
function tbSpawnFoe(type,F,mag){
tbB.foes.push({id:tbB.uid++,type:type,x:96,hp:Math.round(F.hp*mag),maxhp:Math.round(F.hp*mag),dmg:Math.round(F.dmg*mag),rng:F.rng,sp:F.sp*(0.9+Math.random()*0.2),atk:F.atk,cd:1,flash:0,regen:F.regen?F.regen*mag:0,aoe:F.aoe,kamikaze:F.kamikaze,big:!!F.big});
}
function tbSend(id){
if(!tbB||tbB.over)return false;
var U=TB_UNITS[id];if(!U)return false;
if(!tbUnitOpen(id)){try{tbSay(['locked. beat 1-'+(TB_UNLOCK[id]||1)+' to enlist '+id+'. (no shortcuts. the static checks IDs.)'])}catch(e){}return false}
if(tbB.energy<U.cost)return false;
if((tbB.cds[id]||0)>tbB.time)return false;
tbB.energy-=U.cost;tbB.cds[id]=tbB.time+U.cd;
var m=tbMult(id);
var gm=1;try{if(tbB&&tbB.geo&&tbB.geo.dmg)gm=tbB.geo.dmg}catch(e){}
tbB.units.push({id:tbB.uid++,type:id,x:4,hp:Math.round(U.hp*m),maxhp:Math.round(U.hp*m),dmg:Math.round(U.dmg*m*gm),rng:U.rng,sp:U.sp,atk:2,cd:0.5,flash:0,aoe:U.aoe,kamikaze:U.kamikaze});
try{tbPaint()}catch(e){}
return true;
}
function tbCannon(){
if(!tbB||tbB.over||tbB.cannonCd>0)return false;
var gcd=30;try{if(tbB.geo&&tbB.geo.cd)gcd=tbB.geo.cd}catch(e){}
tbB.cannonCd=gcd;
var hit=[];
for(var i=0;i<tbB.foes.length;i++){if(tbB.foes[i].x>55)hit.push(tbB.foes[i])}
for(var k=0;k<hit.length;k++){var fh=hit[k];fh.hp-=Math.max(80,Math.min(600,Math.round(fh.hp*0.08)));fh.flash=0.25}
tbB.foes=tbB.foes.filter(function(f){return f.hp>0});
try{tbSay(['the surge speaks. (it only knows one word. the word is no.)'])}catch(e){}
try{tbPaint()}catch(e){}
return true;
}
function tbWorker(){
if(!tbB||tbB.over||tbB.worker>=8)return false;
var cost=120*tbB.worker;
if(tbB.energy<cost)return false;
tbB.energy-=cost;tbB.worker++;
try{tbPaint()}catch(e){}
return true;
}
function tbAutoThink(){
if(!tbB||tbB.over)return;
if(tbB.worker<5&&tbB.energy>120*tbB.worker+120)tbWorker();
var order=['bulwark','spark','cutter','dart','echo','mortar','rail','maul'];
for(var i=0;i<order.length;i++){if(!tbUnitOpen(order[i]))continue;if(tbSend(order[i]))break}
if(tbB.cannonCd<=0&&tbB.foes.length>=3)tbCannon();
}
function tbEnd(win){
if(!tbB||tbB.over)return;
tbB.over=win?'win':'lose';
tbAuto=false;
var st=tbB.st;
if(win){
var xp=Math.round((60+(st.type==='boss'?90:(st.type==='final'?150:(st.type==='challenge'?30:0))))*(st.od?1.2:1)*((tbB.geo&&tbB.geo.xp)||1));
tbXP+=xp;
var key=st.ch+'_'+st.n;
tbBeaten[key]=1;
if(st.od)tbTum[key]=1;
tbPersist();
try{tbSay(['base destroyed. '+(st.od?'overdrive?? already?? showoff.':'clean. (obj takes a bow. obj does not have legs.)'),'+'+xp+' xp. (spend it. the signals have rent due.)'])}catch(e){}
}else{
try{tbSay(['your base fell. (the static sends its regards. the regards are structural.)','send more meat. (bulwarks. always bulwarks.)'])}catch(e){}
}
try{tbPaintEnd(win,xp||0)}catch(e){}
}
// ── announcer flavor ──
function tbSay(lines){try{
var el=document.getElementById('tbAnn');if(!el)return;
if(!lines){el.textContent='';return}
el.textContent=lines.join(' ');
}catch(e){}}
function tbAnnounce(ch,n,type,boss,od){
var pre=od?'[overdrive. everything is angrier. (2x. you know the drill.)] ':'';
if(boss==='deadbolt')tbSay([pre+'stage '+n+'. DEADBOLT approaches. (it locks. you are the door.)']);
else if(boss==='overdub')tbSay([pre+'stage '+n+'. OVERDUB inbound. (it talks over you. loudly.)']);
else if(boss==='deadair')tbSay([pre+'stage '+n+'. THE DEAD AIR. (the season finale. bring bulwarks. bring everything.)']);
else if(type==='challenge')tbSay([pre+'stage '+n+'. challenge stage. (miniboss o clock. the clock says brute.)']);
else tbSay([pre+'stage '+n+'. break their base. (yours is the one on the left. do not mix them up.)']);
}
// ── DOM: overlay shell ──
function tbEl(id){try{return document.getElementById(id)}catch(e){return null}}
function tbCSS(){
if(tbEl('tbCSS'))return;
var s=document.createElement('style');s.id='tbCSS';
s.textContent=
'#tbOverlay{position:fixed;inset:0;z-index:2000;background:#101016;display:flex;flex-direction:column;font-family:Consolas,monospace;color:#d8d8e2}'+
'#tbTop{background:#181822;padding:8px 16px;display:flex;gap:18px;align-items:center;font-size:13px;border-bottom:2px solid #2c2c40}'+
'#tbEBar{display:inline-block;width:140px;height:10px;background:#20202e;border:1px solid #4a4a6a;vertical-align:middle}#tbEBar i{display:block;height:100%;background:linear-gradient(90deg,#4af,#8df)}'+
'#tbAnn{background:#0c0c12;color:#9ab8d8;padding:8px 16px;font-size:13px;min-height:20px;border-bottom:2px solid #2c2c40}'+
'#tbLane{position:relative;flex:1;overflow:hidden;min-height:220px;background:linear-gradient(180deg,#0a0a12 0%,#14141f 55%,#0d1420 100%)}'+
'#tbLane:before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(90deg,transparent 0 46px,rgba(120,140,200,0.07) 46px 48px),repeating-linear-gradient(0deg,transparent 0 30px,rgba(120,140,200,0.05) 30px 31px)}'+
'#tbGround{position:absolute;left:0;right:0;bottom:44px;height:3px;background:linear-gradient(90deg,#3a5a8a,#7a4a9a,#3a5a8a)}'+
'.tbBase{position:absolute;bottom:47px;width:40px;height:110px;border:2px solid #5a5a7a;background:linear-gradient(180deg,#2c2c40,#1a1a26)}'+
'.tbBase:after{content:"";position:absolute;left:50%;top:-26px;width:4px;height:26px;background:#5a5a7a;margin-left:-2px}'+
'.tbBase .hpb{position:absolute;left:-2px;right:-2px;top:-14px;height:8px;background:#400;border:1px solid #000}'+
'.tbBase .hpb i{display:block;height:100%;background:#4f4}'+
'.tbUnit{position:absolute;width:26px;height:26px;border-radius:6px;font-size:10px;text-align:center;line-height:26px;color:#fff;border:1px solid #000;transition:background .1s}'+
'.tbUnit .uhp{position:absolute;left:0;right:0;top:-7px;height:4px;background:#400}'+
'.tbUnit .uhp i{display:block;height:100%;background:#4f4}'+
'.tbUnit.big{width:42px;height:42px;line-height:42px;font-size:15px;border-radius:8px;box-shadow:0 0 12px rgba(255,80,80,.5)}'+
'.tbUnit.hit{background:#fff !important;color:#000}'+
'#tbCards{background:#181822;padding:10px 16px;display:flex;gap:8px;flex-wrap:wrap;border-top:2px solid #2c2c40;align-items:center}'+
'.tbCard{background:#23232f;border:2px solid #4a4a6a;color:#d8d8e2;font-family:Consolas,monospace;font-size:12px;padding:8px 10px;cursor:pointer;min-width:88px;text-align:center;border-radius:6px}'+
'.tbCard small{display:block;color:#8a8aa2;font-size:10px}'+
'.tbCard.off{opacity:.35;cursor:default}'+
'.tbCard.cannon{border-color:#a84}'+
'.tbCard.cannon.ready{border-color:#fc4;box-shadow:0 0 10px rgba(255,200,80,.6)}'+
'#tbMenu{position:absolute;inset:0;background:#101016;overflow:auto;padding:28px;z-index:5;text-align:center}'+
'#tbMenu h1{font-size:34px;letter-spacing:10px;margin:30px 0 4px;color:#fff;text-shadow:0 0 24px rgba(120,160,255,.7)}'+
'#tbMenu .sub{font-size:12px;color:#8a8aa2;letter-spacing:2px;margin-bottom:30px}'+
'.tbBig{display:block;width:280px;margin:10px auto;background:#23232f;border:2px solid #9ab8d8;color:#dfe8ff;font-family:Consolas,monospace;font-size:15px;letter-spacing:3px;padding:12px;cursor:pointer;border-radius:8px}'+
'.tbBig:hover{background:#2e2e42}'+
'.tbChTab{display:inline-block;background:#23232f;border:2px solid #4a4a6a;padding:6px 14px;margin:0 6px 12px 0;cursor:pointer;font-size:13px;border-radius:6px}'+
'.tbChTab.sel{border-color:#9ab8d8;color:#fff}'+
'.tbChTab.lock{opacity:.4;cursor:default}'+
'.tbStage{display:inline-block;width:42px;height:42px;line-height:42px;text-align:center;background:#1c1c28;border:1px solid #4a4a6a;margin:3px;cursor:pointer;font-size:12px;border-radius:6px}'+
'.tbStage.done{background:#234a23;border-color:#4f4}'+
'.tbStage.od{box-shadow:inset 0 -4px 0 #a4a}'+
'.tbStage.lock{opacity:.35;cursor:default}'+
'.tbURow{display:flex;gap:10px;align-items:center;background:#181822;border:1px solid #2c2c40;padding:8px 12px;margin:6px auto;font-size:12px;max-width:560px;text-align:left;border-radius:6px}'+
'.tbBtn{background:#23232f;border:1px solid #9ab8d8;color:#9ab8d8;font-family:Consolas,monospace;padding:6px 14px;cursor:pointer;font-size:12px;border-radius:6px}'+
'.tbHow{max-width:560px;margin:0 auto;text-align:left;font-size:13px;line-height:1.9;color:#b8b8cc}';
document.head.appendChild(s);
}
function tbOverlay(){
var ov=tbEl('tbOverlay');
if(ov)return ov;
ov=document.createElement('div');ov.id='tbOverlay';
ov.innerHTML='<div id="tbTop"></div><div id="tbAnn"></div><div id="tbLane"></div><div id="tbCards"></div><div id="tbMenu"></div>';
document.body.appendChild(ov);
return ov;
}
// ── DOM: menu screens ──
var tbScreen='title',tbMenuCh=1,tbMenuOd=false;
function tbShowScreen(s){
var m=tbEl('tbMenu');if(!m)return;
if(s===null){tbScreen=null;m.style.display='none';return}
if(s)tbScreen=s;
if(tbScreen===null){m.style.display='none';return}
m.style.display='block';
if(tbScreen==='title')tbPaintTitle(m);
else if(tbScreen==='play')tbPaintPlay(m);
else if(tbScreen==='how')tbPaintHow(m);
else if(tbScreen==='units')tbPaintUnits(m);
}
function tbBackBtn(to,label){
return '<button class="tbBig" id="tbBackBtn">'+(label||('back'))+'</button>';
}
function tbWireBack(to){
var b=tbEl('tbBackBtn');if(b)b.onclick=function(){tbShowScreen(to||'title')};
}
function tbPaintTitle(m){
var h='<h1>DEAD AIR</h1>';
h+='<div class="sub">a pirate broadcast battler · send signals · break the static</div>';
h+='<button class="tbBig" id="tbGoPlay">PLAY</button>';
h+='<button class="tbBig" id="tbGoHow">HOW TO</button>';
h+='<button class="tbBig" id="tbGoUnits">SIGNALS</button>';
h+='<button class="tbBig" id="tbGoExit">LEAVE</button>';
h+='<div class="sub" style="margin-top:20px">xp: '+tbXP+'</div>';
m.innerHTML=h;
tbEl('tbGoPlay').onclick=function(){tbShowScreen('play')};
tbEl('tbGoHow').onclick=function(){tbShowScreen('how')};
tbEl('tbGoUnits').onclick=function(){tbShowScreen('units')};
tbEl('tbGoExit').onclick=function(){tbExit()};
}
function tbPaintHow(m){
var h='<h1 style="font-size:22px">HOW TO</h1>';
h+='<div class="tbHow">your base is on the <b>left</b>. theirs is on the <b>right</b>.<br><br>click a signal card to <b>send</b> it down the lane. it walks right and fights whatever it touches. energy refills over time.<br><br><b>WORKER</b> upgrades your income + max energy. buy it early. buy it often.<br><br><b>bulwark</b> holds the line. cheap signals fill the gaps. <b>rail</b> snipes from far away.<br><br>new signals unlock as you beat stages (only <b>spark</b> at first. earn the rest).<br><br>the <b>SURGE</b> button zaps everything past midfield. 30 seconds to recharge.<br><br>break their base. do not let them break yours.<br><br>beat stages to earn <b>xp</b>, spend it on the SIGNALS screen. <b>overdrive</b> doubles the static (and the payout).</div>';
h+=tbBackBtn('title');
m.innerHTML=h;
tbWireBack('title');
}
function tbPaintUnits(m){
var h='<h1 style="font-size:22px">SIGNALS</h1>';
h+='<div class="sub">xp: '+tbXP+' · levels make numbers bigger. numbers winning is good.</div>';
for(var ui=0;ui<TB_UORDER.length;ui++){var id=TB_UORDER[ui],U=TB_UNITS[id],lv=tbLvl(id),cost=40*lv;
if(!tbUnitOpen(id)){h+='<div class="tbURow" style="opacity:.45"><span style="min-width:90px">🔒 ???</span><span style="color:#8a8aa2">beat 1-'+(TB_UNLOCK[id]||1)+' to enlist</span></div>';continue}
h+='<div class="tbURow"><span style="min-width:90px">'+U.n+' lv'+lv+'</span><span style="color:#8a8aa2">$'+U.cost+' · hp '+Math.round(U.hp*(1+0.15*(lv-1)))+' · dmg '+Math.round(U.dmg*(1+0.15*(lv-1)))+'</span><button class="tbBtn" data-up="'+id+'">lv up ('+cost+' xp)</button></div>';
}
h+=tbBackBtn('title');
m.innerHTML=h;
tbWireBack('title');
var ups=m.querySelectorAll('[data-up]');
for(var qi=0;qi<ups.length;qi++)(function(el){el.onclick=function(){
var id=el.getAttribute('data-up'),lv=tbLvl(id),cost=40*lv;
if(tbXP<cost)return;
tbXP-=cost;tbLevels[id]=lv+1;tbPersist();tbShowScreen('units');
}})(ups[qi]);
}
function tbPaintPlay(m){
var h='<h1 style="font-size:22px">SEASON ONE: PILOT SEASON</h1>';
h+='<div style="margin-bottom:10px"><span class="tbChTab'+(tbMenuOd?' sel':'')+'" id="tbOdT">overdrive: '+(tbMenuOd?'ON':'off')+'</span><span style="font-size:11px;color:#8a8aa2">xp: '+tbXP+'</span><span style="font-size:11px;color:#8a8aa2" id="tbGeoLine"></span></div>';
h+='<div>';
for(var c=1;c<=8;c++){
var locked=c>1;
h+='<span class="tbChTab'+(tbMenuCh===c&&!locked?' sel':'')+(locked?' lock':'')+'">'+c+': '+(c===1?TB_CH[0].name:TB_CH_LOCKED[c-2])+'</span>';
}
h+='</div>';
if(tbMenuCh===1){
h+='<div style="margin:12px 0">';
for(var n=1;n<=30;n++){
var k='1_'+n;
var open=n===1||tbBeaten['1_'+(n-1)];
var cls='tbStage'+(tbBeaten[k]?' done':'')+(tbTum[k]?' od':'')+((!open)?' lock':'');
h+='<span class="'+cls+'" data-st="'+n+'" title="'+(TB_CH1_NAMES[n-1]||'')+'">'+n+'</span>';
}
h+='</div>';
h+='<div style="font-size:11px;color:#8a8aa2;margin-bottom:12px">purple underline = overdrive beaten.</div>';
}else{
h+='<div style="font-size:13px;color:#8a8aa2;padding:20px">locked. (the writers room is still arguing about it.)</div>';
}
h+=tbBackBtn('title','MENU');
m.innerHTML=h;
tbWireBack('title');
var tg=tbEl('tbOdT');if(tg)tg.onclick=function(){tbMenuOd=!tbMenuOd;tbShowScreen('play')};
try{var gl=tbEl('tbGeoLine');if(gl&&(typeof geoName==='function')){var gn=geoName();if(gn&&gn!=='UNBUFFED')gl.textContent=' · '+gn}}catch(e){}
var sts=m.querySelectorAll('.tbStage[data-st]');
for(var si=0;si<sts.length;si++)(function(el){el.onclick=function(){
var n=parseInt(el.getAttribute('data-st'),10);
if(!(n===1||tbBeaten['1_'+(n-1)]))return;
tbStartBattle(1,n,tbMenuOd);
}})(sts[si]);
}
// ── DOM: battle ──
function tbBuildBattle(){
var lane=tbEl('tbLane'),cards=tbEl('tbCards'),top=tbEl('tbTop');
if(!lane||!cards||!top)return;
lane.innerHTML='<div id="tbGround"></div><div class="tbBase" id="tbPB" style="left:10px"><div class="hpb"><i></i></div></div><div class="tbBase" id="tbEB" style="right:10px"><div class="hpb"><i></i></div></div>';
var h='';
for(var i=0;i<TB_UORDER.length;i++){var id=TB_UORDER[i],U=TB_UNITS[id];
if(tbUnitOpen(id))h+='<button class="tbCard" data-send="'+id+'">'+U.n+'<small>$'+U.cost+'</small></button>';
else h+='<button class="tbCard off" data-locked="'+id+'">🔒<small>beat 1-'+(TB_UNLOCK[id]||1)+'</small></button>';
}
h+='<button class="tbCard cannon" id="tbCan">SURGE<small>30s</small></button>';
h+='<button class="tbCard" id="tbWork">WORKER<small>lv1</small></button>';
h+='<button class="tbCard" id="tbRet">retreat</button>';
cards.innerHTML=h;
var ss=cards.querySelectorAll('[data-send]');
for(var si=0;si<ss.length;si++)(function(el){el.onclick=function(){tbSend(el.getAttribute('data-send'))}})(ss[si]);
var cn=tbEl('tbCan');if(cn)cn.onclick=function(){tbCannon()};
var wk=tbEl('tbWork');if(wk)wk.onclick=function(){tbWorker()};
var rt=tbEl('tbRet');if(rt)rt.onclick=function(){try{tbShowScreen('play')}catch(e){}tbB=null;tbStopLoop()};
if(!tbIv){tbIv=setInterval(function(){try{if(tbB&&!tbB.over)tbTick(1/20)}catch(e){}},50)}
}
function tbStopLoop(){try{if(tbIv){clearInterval(tbIv);tbIv=null}}catch(e){}}
function tbPaint(){
if(!tbB)return;
var B=tbB,top=tbEl('tbTop'),lane=tbEl('tbLane'),cards=tbEl('tbCards');
if(top)top.innerHTML='<span>st '+B.st.ch+'-'+B.st.n+(B.st.od?' (overdrive)':'')+' · '+B.st.name+'</span><span><span id="tbEBar"><i style="width:'+(100*B.energy/B.max)+'%"></i></span> '+Math.floor(B.energy)+'</span><span>you '+Math.ceil(B.pbase)+' vs '+Math.ceil(B.ebase)+' static</span><span>'+Math.floor(B.time)+'s</span>';
var pb=tbEl('tbPB'),eb=tbEl('tbEB');
if(pb){var i=pb.querySelector('i');if(i)i.style.width=(100*B.pbase/B.st.pbase)+'%'}
if(eb){var j=eb.querySelector('i');if(j)j.style.width=(100*B.ebase/B.st.ebase)+'%'}
if(!lane)return;
var olds=lane.querySelectorAll('.tbUnit');
for(var o=0;o<olds.length;o++)olds[o].remove();
function dot(u,foe){
var d=document.createElement('div');
d.className='tbUnit'+(u.big?' big':'')+((u.flash||0)>0?' hit':'');
d.style.left='calc('+u.x+'% - '+(u.big?'21px':'13px')+')';
d.style.bottom=(50+((u.id*7)%3)*7)+'px';
d.style.background=foe?(TB_FCOLOR[u.type]||'#a44'):(TB_FCOLOR[u.type]||'#36c');
d.textContent=foe?(u.big?'!':'×'):(TB_USYM[u.type]||'▲');
var pct=Math.max(0,100*u.hp/u.maxhp);
d.innerHTML='<div class="uhp"><i style="width:'+pct+'%"></i></div>'+d.textContent;
lane.appendChild(d);
}
for(var a=0;a<B.units.length;a++){var u=B.units[a];if(!u.maxhp)u.maxhp=u.hp;dot(u,false)}
for(var b=0;b<B.foes.length;b++){var f=B.foes[b];dot(f,true)}
if(cards){var ss=cards.querySelectorAll('[data-send]');
for(var s2=0;s2<ss.length;s2++){var id=ss[s2].getAttribute('data-send'),U=TB_UNITS[id];
var ready=B.energy>=U.cost&&(B.cds[id]||0)<=B.time;
if(ready)ss[s2].classList.remove('off');else ss[s2].classList.add('off');
}
var cn=cards.querySelector('#tbCan');if(cn){if(B.cannonCd<=0)cn.classList.add('ready');else cn.classList.remove('ready')}
var wk2=cards.querySelector('#tbWork');if(wk2){var wc=120*B.worker;wk2.innerHTML='WORKER lv'+B.worker+'<small>'+(B.worker>=8?'max':'$'+wc)+'</small>';if(B.worker>=8||B.energy<wc)wk2.classList.add('off');else wk2.classList.remove('off')}
}
}
var TB_FCOLOR={spark:'#4a7',cutter:'#48c',echo:'#a84',bulwark:'#784',dart:'#c6c',mortar:'#ec4',rail:'#4cc',maul:'#a74',fuzz:'#a44',slab:'#868',shiv:'#c44',hiss:'#a84',zip:'#c6c',pop:'#ec4',rush:'#4cc',mend:'#4a4',anchor:'#868',longshot:'#c84',boom:'#c44',crush:'#a74',burst:'#8c4',brute:'#a4a',deadbolt:'#e64',overdub:'#6ce',deadair:'#e2e'};
var TB_USYM={spark:'▲',cutter:'◆',echo:'●',bulwark:'■',dart:'➤',mortar:'⬢',rail:'↟',maul:'✚'};
function tbPaintEnd(win,xp){
var B=tbB;
var lane=tbEl('tbLane');if(!lane)return;
var d=document.createElement('div');
d.style.cssText='position:absolute;inset:0;background:rgba(10,10,16,0.88);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;z-index:9;font-size:16px';
d.innerHTML='<div style="font-size:22px;letter-spacing:4px">'+(win?'STATIC BROKEN':'SIGNAL LOST')+'</div><div style="font-size:13px;color:#8a8aa2">'+(win?('+'+xp+' xp. '+(B&&B.st.od?'overdrive cleared. disgusting. (affectionate.)':'obj slow-claps. (he has no hands. do not ask.)')):'the static holds the frequency. (it is smug about it.)')+'</div><button class="tbBtn" id="tbAgain">STAGES</button>';
lane.appendChild(d);
var ag=tbEl('tbAgain');if(ag)ag.onclick=function(){tbB=null;try{tbShowScreen('play')}catch(e){}};
}
// ── enter/exit ──
function tbEnter(){
tbLoad();
try{tbCSS()}catch(e){}
try{tbOverlay()}catch(e){}
try{tbScreen='title';tbShowScreen('title')}catch(e){}
try{tbSay(null)}catch(e){}
return true;
}
function tbExit(){
tbStopLoop();tbAuto=false;tbB=null;
try{var ov=tbEl('tbOverlay');if(ov)ov.remove()}catch(e){}
try{var cs=tbEl('tbCSS');if(cs)cs.remove()}catch(e){}
}
// ── debug hooks ──
window.tbStep=function(n){try{n=n||1;for(var i=0;i<n;i++)tbTick(1/60);return tbB?Math.round(tbB.time*10)/10:-1}catch(e){return -1}};
window.tbDbg=function(){try{if(!tbB)return {menu:true,xp:tbXP};var bh=null;for(var bi=0;bi<tbB.foes.length;bi++){if(tbB.foes[bi].big){bh=tbB.foes[bi].hp;break}}return {t:Math.round(tbB.time*10)/10,e:Math.floor(tbB.energy),pb:Math.ceil(tbB.pbase),eb:Math.ceil(tbB.ebase),units:tbB.units.length,foes:tbB.foes.length,boss:bh,worker:tbB.worker,udmg:(tbB.units.length?tbB.units[0].dmg:null),ccd:Math.ceil(tbB.cannonCd),over:tbB.over}}catch(e){return {err:String(e)}}};
window.tbStart=function(ch,n,od){try{tbEnter();tbStartBattle(ch,n,!!od);return true}catch(e){return false}};
window.tbAuto=function(v){try{tbAuto=!!v;return tbAuto}catch(e){return false}};
window.tbEnter=tbEnter;
window.tbExit=tbExit;
})();
