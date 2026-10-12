// ── DEAD AIR: battle-cats-style lane battler (send signals, break the static) ──
(function(){
// ── save ──
function tbSave(){try{return JSON.parse(localStorage.getItem('cube_tbb')||'{}')}catch(e){return{}}}
var tbXP=0,tbLevels={},tbBeaten={},tbTum={},tbBase={},tbUHand=0,tbBHand=0,tbStarDone={},tbSeen={},tbLoadout=null,tbGachaOwned={},tbPity=0;
function tbLoad(){try{var s=tbSave();if(typeof s.xp==='number')tbXP=s.xp;if(s.levels)tbLevels=s.levels;if(s.beaten)tbBeaten=s.beaten;if(s.tum)tbTum=s.tum;if(s.base)tbBase=s.base;if(typeof s.uhand==='number')tbUHand=Math.max(0,Math.floor(s.uhand));if(typeof s.bhand==='number')tbBHand=Math.max(0,Math.floor(s.bhand));if(s.stars)tbStarDone=s.stars;if(s.seen)tbSeen=s.seen;tbLoadout=(s.loadout instanceof Array)?s.loadout:null;if(s.gacha)tbGachaOwned=s.gacha;if(typeof s.pity==='number')tbPity=s.pity}catch(e){}}
function tbPersist(){try{localStorage.setItem('cube_tbb',JSON.stringify({xp:tbXP,levels:tbLevels,beaten:tbBeaten,tum:tbTum,base:tbBase,uhand:tbUHand,bhand:tbBHand,stars:tbStarDone,seen:tbSeen,loadout:tbLoadout,gacha:tbGachaOwned,pity:tbPity}))}catch(e){}}
function tbMarkSeen(type){try{if(type&&!tbSeen[type]){tbSeen[type]=1;tbPersist()}}catch(e){}}
// stars: beat 1-star (normal) to unlock 2-star, beat 2-star to unlock 3-star.
// loadout: max 6 signals per battle. pick on the SIGNALS screen.
function tbLoadoutGet(){
try{
if(!(tbLoadout instanceof Array)){
tbLoadout=[];
for(var i=0;i<TB_UORDER.length&&tbLoadout.length<6;i++){if(tbUnitOpen(TB_UORDER[i]))tbLoadout.push(TB_UORDER[i])}
tbPersist();
}else{
tbLoadout=tbLoadout.filter(function(id){return tbUnitOpen(id)}).slice(0,6);
}
return tbLoadout;
}catch(e){return[]}
}
function tbLoadoutSet(arr){try{tbLoadout=(arr instanceof Array)?arr.slice(0,6):[];tbPersist()}catch(e){}}
// stars: beat 1-star (normal) to unlock 2-star, beat 2-star to unlock 3-star.
// per season. enemies x1/x1.5/x2, enemy base up, YOUR costs up, xp up.
function tbIntelPanel(ch,n){
try{
var m=tbEl('tbMenu');if(!m)return;
var old=tbEl('tbIntel');if(old)old.remove();
var info=tbIntelFor(ch,n);if(!info)return;
var d=document.createElement('div');d.id='tbIntel';
d.style.cssText='position:absolute;inset:0;background:#101016;z-index:8;overflow:auto;padding:28px;text-align:center';
var h='<h1 style="font-size:22px">STAGE '+n+'</h1>';
h+='<div class="sub" style="margin-bottom:14px">'+info.name+' · '+info.type+'</div>';
var eff=info.mag*tbStarMult(tbMenuStar)*(tbMenuMag>1?tbMenuMag:1);
h+='<div style="font-size:12px;color:#8a8aa2;margin-bottom:6px">magnification x'+info.mag.toFixed(2)+' · star x'+tbStarMult(tbMenuStar)+(tbMenuMag>1?' · you x'+tbMenuMag:'')+(tbMenuOd?' · overdrive':'')+'</div>';
h+='<div style="font-size:13px;color:#c8d8e8;margin-bottom:6px">enemies fight at x'+eff.toFixed(2)+' stats'+(info.boss?' · enemy base '+Math.round(info.ebase*tbStarMult(tbMenuStar))+' HP':'')+'</div>';
h+='<div style="margin:12px auto;max-width:560px;text-align:left">';
for(var i=0;i<info.roster.length;i++){
var t=info.roster[i],F=TB_FOES[t],known=false;
try{known=!!tbSeen[t]}catch(e){}
if(known&&F){
var tags='';if(F.rage)tags+=' · rages';if(F.medic)tags+=' · heals allies';if(F.gimmick)tags+=' · '+F.gimmick;if(F.aoe)tags+=' · aoe '+F.aoe;if(F.regen)tags+=' · regen';
h+='<div class="tbURow"><span style="min-width:110px;color:'+((TB_FCOLOR[t])||'#fff')+'">■ '+t+'</span><span style="color:#8a8aa2">hp '+F.hp+' · dmg '+F.dmg+' · rng '+F.rng+' · sp '+F.sp+tags+(F.boss?' · BOSS':'')+(F.blurb?'<br>'+F.blurb:'')+'</span></div>';
}else h+='<div class="tbURow" style="opacity:.45"><span style="min-width:110px">■ ?</span><span style="color:#8a8aa2">unseen. beat the stage. (or meet it first.)</span></div>';
}
h+='</div>';
h+='<button class="tbBig" id="tbIntelGo">START</button>';
h+=tbBackBtn('play','BACK');
d.innerHTML=h;
m.appendChild(d);
var bk=tbEl('tbBackBtn');if(bk)bk.onclick=function(){var o2=tbEl('tbIntel');if(o2)o2.remove();tbShowScreen('play')};
var go=tbEl('tbIntelGo');if(go)go.onclick=function(){var o3=tbEl('tbIntel');if(o3)o3.remove();tbStartBattle(ch,n,tbMenuOd)};
}catch(e){}
}
var tbMenuStar=1,tbIntelOn=false;
function tbStarMult(s){return s>=3?2:(s===2?1.5:1)}
function tbIntelFor(ch,n){
try{
var C=TB_CH[ch-1];if(!C)return null;
var type=n===30?'final':((n===10||n===20)?'boss':((n===5||n===15||n===25)?'challenge':'regular'));
var mag=(1+n*0.04)*(type==='challenge'?1.4:1);
var roster=[],seen={};
var pool=C.pools[n-1]||[];
for(var i=0;i<pool.length;i++)if(!seen[pool[i]]){seen[pool[i]]=1;roster.push(pool[i])}
var boss=(C.bosses&&C.bosses[n])||null;
if(boss&&!seen[boss])roster.push(boss);
var ebase=Math.round((300+n*40)*(type==='boss'?1.6:(type==='final'?2.2:(type==='challenge'?1.3:1))));
return {name:C.names[n-1]||('stage '+n),type:type,mag:mag,roster:roster,boss:boss,ebase:ebase};
}catch(e){return null}
}
function tbStarOpen(ch,s){
if(s<=1)return true;
if(s>3)return false;
try{
var done=tbStarDone[ch]||0;
if(!done&&tbBeaten[ch+'_30']){done=1;tbStarDone[ch]=1;tbPersist()}
if(done>=s-1)return true;
}catch(e){}
return false;
}
function tbStarDoneSet(ch,s){try{if((tbStarDone[ch]||0)<s){tbStarDone[ch]=s;tbPersist()}}catch(e){}}
// ── base upgrades (shop-style, XP, cap 10 +2 per beaten season) ──
// {cost base, max, desc}
var TB_BASE={
hp:{n:'base health',cost:60,desc:'+150 base HP per level'},
surge:{n:'surge tuning',cost:60,desc:'-1s SURGE cooldown, +10 damage per level'},
rate:{n:'signal income',cost:80,desc:'+0.5 energy/s per level'},
cap:{n:'energy bank',cost:80,desc:'+50 max energy per level'},
start:{n:'early economy',cost:60,desc:'+25 starting energy per level'},
rech:{n:'unit recharge',cost:70,desc:'-5% signal cooldowns per level'},
bounty:{n:'scrap bounty',desc:'+2% of kill max HP as energy per level',cost:70}
};
var TB_BORDER=['hp','surge','rate','cap','start','rech','bounty'];
function tbSeasonsBeaten(){var n=0;try{for(var i=0;i<TB_CH.length;i++){if(tbBeaten[(i+1)+'_30'])n++}}catch(e){}return n}
function tbBaseMax(){return 10+2*tbSeasonsBeaten()}
function tbBaseLv(id){try{return tbBase[id]||0}catch(e){return 0}}
function tbLvlEff(id){try{return Math.max(1,((typeof tbLevels!=='undefined'&&tbLevels[id])||1)-(tbUHand||0))}catch(e){return 1}}
function tbBaseLvEff(id){try{return Math.max(0,tbBaseLv(id)-(tbBHand||0))}catch(e){return 0}}
function tbHandBonus(){try{return Math.min(200,Math.floor(((tbUHand||0)+(tbBHand||0))/10)*10)}catch(e){return 0}}
// ── roster: player-sendable signals ──
// {cost,hp,dmg,rng(lane units),sp(units/s),cd(s),aoe?}
var TB_UNITS={
spark:{n:'spark',cost:50,hp:130,dmg:12,rng:4,sp:7,cd:5,atk:1.6},
cutter:{n:'cutter',cost:75,hp:100,dmg:24,rng:4,sp:9,cd:6,atk:2.0},
echo:{n:'echo',cost:100,hp:70,dmg:20,rng:16,sp:6,cd:7,atk:2.2},
bulwark:{n:'bulwark',cost:100,hp:420,dmg:5,rng:3,sp:5,cd:10,atk:2.8,regen:6},
dart:{n:'dart',cost:150,hp:100,dmg:32,rng:5,sp:11,cd:8,atk:1.8,crit:[0.25,2]},
mortar:{n:'mortar',cost:200,hp:130,dmg:65,rng:5,sp:7,cd:14,atk:3.0,aoe:6},
rail:{n:'rail',cost:250,hp:80,dmg:110,rng:20,sp:6,cd:16,atk:2.6,crit:[0.3,2]},
maul:{n:'maul',cost:300,hp:280,dmg:85,rng:4,sp:4.5,cd:18,atk:3.2,exec:1.5},
lildeadair:{n:'lil deadair',cost:300,hp:320,dmg:40,rng:5,sp:5,cd:15,atk:2.4},
lilsignoff:{n:'lil signoff',cost:350,hp:260,dmg:55,rng:12,sp:6,cd:17,atk:2.2},
aegis:{n:'aegis',cost:250,hp:800,dmg:8,rng:3,sp:4,cd:20,atk:2.8},
needle:{n:'needle',cost:300,hp:60,dmg:70,rng:24,sp:7,cd:14,atk:2.2,crit:[0.35,2.5]},
bomb:{n:'bomb',cost:150,hp:50,dmg:200,rng:4,sp:14,cd:16,atk:2.0,aoe:8,kamikaze:1},
frenzy:{n:'frenzy',cost:200,hp:40,dmg:120,rng:5,sp:12,cd:10,atk:0.8}
};
var TB_UORDER=['spark','cutter','echo','bulwark','dart','mortar','rail','maul','lildeadair','lilsignoff','aegis','needle','bomb','frenzy'];
var TB_GACHA=['aegis','needle','bomb','frenzy'];
var TB_GACHA_COST=300;
// unit unlocks: beat the listed stage to enlist (tbb-style progression)
var TB_UNLOCK={spark:1,cutter:3,echo:5,bulwark:7,dart:9,mortar:10,rail:15,maul:20};
var TB_ULVMAX=30;
function tbMaxStage(){var m=1;for(var k in tbBeaten){if(!tbBeaten.hasOwnProperty(k))continue;var p=k.split('_');if(p[0]!=='1')continue;var n=parseInt(p[1],10);if(n>m)m=n}return m}
function tbUnitOpen(id){
if(id==='lildeadair'){try{return (tbStarDone[1]||0)>=3}catch(e){return false}}
if(id==='lilsignoff'){try{return (tbStarDone[2]||0)>=3}catch(e){return false}}
if(TB_GACHA.indexOf(id)!==-1){try{return !!tbGachaOwned[id]}catch(e){return false}}
return tbMaxStage()>=(TB_UNLOCK[id]||1)}
// ── static roster (ch1). mag multiplies hp/dmg ──
var TB_FOES={
fuzz:{hp:60,dmg:8,rng:4,sp:6,atk:2},
slab:{hp:220,dmg:6,rng:3,sp:4.5,atk:2.5},
shiv:{hp:55,dmg:14,rng:4,sp:8,atk:1.8},
hiss:{hp:45,dmg:12,rng:15,sp:5,atk:2.5},
zip:{hp:50,dmg:10,rng:4,sp:10,atk:1.5},
pop:{hp:35,dmg:6,rng:4,sp:12,atk:1.2},
rush:{hp:40,dmg:9,rng:4,sp:14,atk:1.2},
mend:{hp:120,dmg:10,rng:4,sp:6,atk:2,regen:4,medic:6,blurb:'patches up nearby allies. kill it first. (everyone says this. no one does.)'},
anchor:{hp:300,dmg:16,rng:4,sp:3,atk:3},
longshot:{hp:60,dmg:40,rng:18,sp:5,atk:3.5},
boom:{hp:30,dmg:60,rng:3,sp:9,atk:1,kamikaze:1},
crush:{hp:200,dmg:30,rng:4,sp:4,atk:2.5,rage:1,blurb:'gets faster when hurt. do not hurt it. (hurt it anyway.)'},
burst:{hp:90,dmg:25,rng:5,sp:6,atk:2.5,aoe:5},
brute:{hp:600,dmg:22,rng:5,sp:4,atk:2.5,big:1,rage:1,blurb:'big, dumb, and angrier at half health.'},
deadbolt:{hp:900,dmg:28,rng:6,sp:3.5,atk:2.5,big:1,boss:1,gimmick:'slam',gt:18,blurb:'slams the whole lane every 18s. it locks. you are the door.'},
overdub:{hp:1800,dmg:42,rng:6,sp:4.5,atk:2.2,big:1,boss:1,gimmick:'drain',gt:22,blurb:'talks over you AND drains your energy. rude twice.'},
deadair:{hp:1600,dmg:48,rng:7,sp:4,atk:2,summon:'brute',big:1,boss:1,gimmick:'frenzy',blurb:'below half health it summons twice as fast. the finale has no chill.'},
// ── season two recruits (ch2). same engine, louder static ──
hype:{hp:150,dmg:18,rng:4,sp:7,atk:2,rage:1,blurb:'hype accelerates. do not feed it.'},
jingle:{hp:80,dmg:16,rng:12,sp:6,atk:2.5},
tower:{hp:500,dmg:24,rng:5,sp:3,atk:3,big:1,rage:1,blurb:'immobile. indignant. faster when cracked.'},
blackout:{hp:1000,dmg:30,rng:6,sp:3.5,atk:2.5,big:1,boss:1,gimmick:'gravity',gt:30,blurb:'every 30s gravity wins. hide behind nothing. there is nothing.'},
feedback:{hp:2000,dmg:45,rng:6,sp:4.5,atk:2.2,big:1,boss:1,gimmick:'mend',gt:25,blurb:'loops its own damage back into health. the name is literal.'},
 signoff:{hp:1900,dmg:52,rng:7,sp:4,atk:2,summon:'brute',big:1,boss:1,gimmick:'enrage',blurb:'below 30% it stops reading the script. good luck.'},
// ── season three recruits (ch3). the static sea ──
drift:{hp:200,dmg:18,rng:5,sp:6,atk:2,rage:1,blurb:'drifts in waves. picks up speed. there is only water.'},
brine:{hp:110,dmg:20,rng:11,sp:6,atk:2.5,blurb:'stings from range. the salt gets in the wound. the wound is you.'},
sonar:{hp:160,dmg:24,rng:15,sp:5,atk:2,blurb:'pings before it strikes. you hear it coming. that is the point.'},
silt:{hp:650,dmg:26,rng:5,sp:3,big:1,blurb:'settles on the lane and refuses to move. the sea floor does not negotiate.'},
undertow:{hp:1500,dmg:34,rng:6,sp:4,big:1,boss:1,gimmick:'gravity',gt:24,blurb:'every 24s the current drags everything back. the sea keeps what it takes.'},
maw:{hp:2400,dmg:48,rng:6,sp:4.5,atk:2.2,big:1,boss:1,gimmick:'drain',gt:22,blurb:'drains the whole lane to feed. it is always hungry. it is never full.'},
staticsea:{hp:2300,dmg:58,rng:7,sp:4,atk:2,summon:'drift',big:1,boss:1,gimmick:'frenzy',blurb:'below half the lane floods. the static becomes a sea. everything drowns. it does not.'}
};
// ── chapter 1: pilot season ──
var TB_CH1_NAMES=['test pattern','vertical hold','dead air','sweeps week','prime time','reruns','static cling','channel hop','body block','DEADBOLT','spam folder','in a hurry','damage sponge','gravity check','stunt double','blow it up','jump scare','team huddle','bullet ballet','OVERDUB','full stop','pass the mic','heavy rotation','hard cut','cliffhanger','demolition derby','special guest','bottle episode','doomscrolling','THE DEAD AIR'];
var TB_CH1_POOL=[['fuzz'],['fuzz','slab'],['fuzz','shiv'],['fuzz','hiss'],['zip','pop','rush'],['pop','zip'],['pop','shiv'],['zip','shiv','hiss'],['slab','fuzz'],['pop'],['fuzz','shiv','zip'],['rush','zip'],['slab','anchor'],['anchor','slab'],['rush','zip','pop'],['boom','fuzz'],['boom','zip'],['slab','shiv','hiss'],['hiss','longshot'],['longshot'],['crush','fuzz'],['burst','shiv'],['crush','shiv'],['anchor','crush'],['brute','zip','rush'],['boom','burst'],['longshot','hiss'],['shiv','crush','zip'],['anchor','longshot','brute'],['anchor','longshot','crush']];
var TB_CH1_BOSS={10:'deadbolt',20:'overdub',30:'deadair'};
var TB_CH=[{name:'pilot season',trait:'reruns',names:TB_CH1_NAMES,pools:TB_CH1_POOL,bosses:TB_CH1_BOSS}];
// ── chapter 2: season two ──
var TB_CH2_NAMES=['cold open','needle drop','ghost frequency','tower party','pledge break','night static','dead frequency','mic check','ratings stunt','BLACKOUT','daytime repeat','signal bleed','tower tax','dead mic','call screener','pirate handshake','static bloom','drive-time','dead channel','FEEDBACK','late night','tower stacking','crosstalk','dead roll','emergency broadcast','off the dial','pirate funeral','static wedding','last affiliate','SIGNOFF'];
var TB_CH2_POOL=[['fuzz','hype'],['shiv','hype'],['hiss','jingle'],['zip','pop','hype'],['hype','rush'],['pop','jingle'],['shiv','hiss','hype'],['zip','rush','jingle'],['slab','anchor','hype'],['fuzz','pop'],['crush','hype'],['burst','jingle'],['tower','fuzz','pop'],['longshot','fuzz'],['tower','rush'],['boom','hype'],['jingle','longshot'],['crush','burst','hype'],['anchor','jingle','hiss'],['zip','pop'],['crush','fuzz','hype'],['burst','shiv','jingle'],['longshot','crush'],['crush','anchor','hype'],['tower','zip','rush'],['burst','longshot','jingle'],['brute','hiss','rush'],['anchor','shiv','hype'],['anchor','longshot','tower'],['tower','hype','jingle']];
var TB_CH2_BOSS={10:'blackout',20:'feedback',30:'signoff'};
TB_CH.push({name:'sweeps week',trait:'static',names:TB_CH2_NAMES,pools:TB_CH2_POOL,bosses:TB_CH2_BOSS});
// ── chapter 3: season three ──
var TB_CH3_NAMES=['static tide','sea foam','depth charge','salt water','riptide','jelly drift','fog bank','sonar ping','deep current','UNDERTOW','brine pool','low tide','shipwreck','abyssal plain','pressure','ghost net','kelp forest','black water','dead zone','MAW','undertow return','brine bath','tidal lock','deep sea vent','drowning','salt static','mariana','the dropoff','last buoy','THE STATIC SEA'];
var TB_CH3_POOL=[['fuzz','drift'],['drift','brine'],['brine','slab'],['fuzz','brine','drift'],['rush','drift'],['drift','sonar'],['hiss','drift'],['sonar','brine'],['silt','brine'],['drift','hype'],['brine','pop'],['drift','zip','rush'],['silt','anchor'],['silt','brine','sonar'],['crush','drift'],['boom','drift'],['brine','hiss'],['silt','fuzz'],['sonar','longshot','drift'],['brine','drift','silt'],['crush','brine'],['burst','drift'],['silt','crush'],['anchor','silt','brine'],['tower','drift','rush'],['boom','burst','brine'],['longshot','sonar'],['silt','crush','brine'],['anchor','longshot','silt'],['drift','brine','silt']];
var TB_CH3_BOSS={10:'undertow',20:'maw',30:'staticsea'};
TB_CH.push({name:'the static sea',trait:'tide',names:TB_CH3_NAMES,pools:TB_CH3_POOL,bosses:TB_CH3_BOSS});
// chapters 4-8: locked (content drops)
var TB_CH_LOCKED=['pay-per-view','the lost tapes','???','???','???'];
var TB_CH_TITLES=['SEASON ONE: PILOT SEASON','SEASON TWO: SWEEPS WEEK','SEASON THREE: THE STATIC SEA'];
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
var ebase=Math.round((300+n*40)*(type==='boss'?1.6:(type==='final'?2.2:(type==='challenge'?1.3:1)))*(od?2:1)*tbStarMult(tbMenuStar));
return {ch:ch,n:n,name:C.names[n-1]||('stage '+n),type:type,od:!!od,mag:mag,pmag:Math.max(1,Math.min(12,tbMenuMag)),starm:tbStarMult(tbMenuStar),star:Math.max(1,Math.min(3,tbMenuStar)),queue:q,ebase:ebase,pbase:1500+150*tbBaseLvEff('hp'),rate:8+Math.min(2,n/12)+0.5*tbBaseLvEff('rate'),summonT:type==='final'?20:null};
}
// ── battle state ──
var tbB=null,tbIv=null,tbAuto=false;
function tbLoopOn(){return !!tbIv}
function tbLvl(id){return tbLevels[id]||1}
function tbMult(id){return 1+0.15*(tbLvlEff(id)-1)}
function tbStartBattle(ch,n,od){
var st=tbBuildStage(ch,n,od);
try{if(tbAud&&tbAud.paused){var bp=tbAud.play();if(bp&&bp.catch)bp.catch(function(){})}}catch(e){}
tbB={st:st,time:0,energy:300+25*tbBaseLvEff('start'),max:500,units:[],foes:[],ebase:st.ebase,pbase:st.pbase,cds:{},cannonCd:20,worker:1,over:null,summonT:st.summonT,uid:1};
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
B.max=500+(B.worker-1)*150+(B.geo.max||0)+50*tbBaseLvEff('cap');
B.energy=Math.min(B.max,B.energy+(st.rate+(B.worker-1)*4+(B.geo.rate||0))*dt);
if(B.cannonCd>0)B.cannonCd-=dt;
// enemy spawns (final: cap concurrent escorts so the finale stays a fight, not a flood)
for(var qi=B.st.queue.length-1;qi>=0;qi--){var q=B.st.queue[qi];
if(q.t<=B.time){var qIsBoss=TB_FOES[q.type]&&TB_FOES[q.type].boss;if(!qIsBoss&&B.st.type==='final'&&B.foes.length>=5)continue;B.st.queue.splice(qi,1);var F=TB_FOES[q.type];if(F)tbSpawnFoe(q.type,F,Math.min(st.mag,1.8)*(q.trick||1)*(st.pmag||1)*(st.starm||1))}}
// final boss summons (capped like escorts: no flooding)
if(B.summonT&&B.time>=B.summonT){if(B.foes.length>=5){B.summonT+=10}else{var frz=false;try{for(var frk=0;frk<B.foes.length;frk++){if(B.foes[frk].type==='deadair'&&B.foes[frk].hp<B.foes[frk].maxhp/2){frz=true;break}}}catch(e){}B.summonT+=frz?25:50;var SF=TB_FOES.brute;if(SF)tbSpawnFoe('brute',SF,Math.min(st.mag,1.8)*(st.pmag||1)*(st.starm||1))}}
// player units think
for(var ui=0;ui<B.units.length;ui++){var u=B.units[ui];if(u.hp<=0)continue;
u.cd-=dt;if(u.flash>0)u.flash-=dt;
if(u.regen)u.hp=Math.min(u.maxhp,u.hp+u.regen*dt);
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
try{
var batk=(TB_FOES[f.type]&&TB_FOES[f.type].atk)||f.atk;
var ragged=(f.rage&&f.hp<f.maxhp/2)||(f.gimmick==='enrage'&&f.hp<f.maxhp*0.3);
f.atk=batk*(ragged?0.6:1);
if(f.medic){for(var mi2=0;mi2<B.foes.length;mi2++){var mo=B.foes[mi2];if(mo.hp>0&&Math.abs(mo.x-f.x)<=10)mo.hp=Math.min(mo.maxhp,mo.hp+f.medic*dt)}}
if(f.gimmick){
f.gt-=dt;
if(f.gt<=0){
if(f.gimmick==='slam'){f.gt=18;for(var gi2=0;gi2<B.units.length;gi2++){if(B.units[gi2].hp>0){B.units[gi2].hp-=25;B.units[gi2].flash=0.25}}}
else if(f.gimmick==='drain'){f.gt=22;B.energy=Math.max(0,B.energy*0.85)}
else if(f.gimmick==='gravity'){f.gt=30;for(var gi3=0;gi3<B.units.length;gi3++){if(B.units[gi3].hp>0){B.units[gi3].hp-=Math.max(1,Math.round(B.units[gi3].hp*0.15));B.units[gi3].flash=0.25}}}
else if(f.gimmick==='mend'){f.gt=25;f.hp=Math.min(f.maxhp,f.hp+Math.round(f.maxhp*0.12))}
}
}
}catch(e){}
var tgt2=tbNearestUnit(f.x,-1);
var backU=(!tgt2.u||tgt2.d>f.rng)?tbBehind(B.units,f.x,-1):null;
var ftgt2=(tgt2.u&&tgt2.d<=f.rng)?tgt2.u:backU;
if(ftgt2){if(f.cd<=0){f.cd=f.atk;tbHitUnit(f,ftgt2)}}
else{var dx2=(tgt2.u?tgt2.u.x:2)-f.x;if(Math.abs(f.x-2)<=f.rng){if(f.cd<=0){f.cd=f.atk;B.pbase-=f.dmg;if(B.pbase<=0){B.pbase=0;tbEnd(false);return}}}else if(!tbBlockedBy(B.units,f.x,-1))f.x+=Math.sign(dx2)*Math.min(Math.abs(dx2),f.sp*dt)}
}
// cleanup + autoplay
B.units=B.units.filter(function(u){return u.hp>0});
try{var _bn=tbBaseLvEff('bounty');if(_bn>0){var _bg=0;for(var _bi=0;_bi<B.foes.length;_bi++){if(B.foes[_bi].hp<=0)_bg+=B.foes[_bi].maxhp||0}if(_bg>0)B.energy=Math.min(B.max,B.energy+_bg*0.02*_bn)}}catch(e){}
B.foes=B.foes.filter(function(f){return f.hp>0});
if(tbAuto)tbAutoThink();
try{tbPaint()}catch(e){}
}
function tbHitFoe(u,f){
var ddmg=u.dmg;
try{if(u.crit&&Math.random()<u.crit[0])ddmg=Math.round(ddmg*u.crit[1])}catch(e){}
try{if(u.exec&&f.boss)ddmg=Math.round(ddmg*u.exec)}catch(e){}
if(u.aoe){var hit=[];for(var i=0;i<tbB.foes.length;i++){var o=tbB.foes[i];if(o.hp>0&&Math.abs(o.x-f.x)<=u.aoe)hit.push(o)}tbDamageFoes(hit,ddmg)}
else{f.hp-=ddmg;f.flash=0.12}
if(u.kamikaze)u.hp=0;
}
function tbHitUnit(f,u){
if(f.aoe){var hit=[];for(var i=0;i<tbB.units.length;i++){var o=tbB.units[i];if(o.hp>0&&Math.abs(o.x-u.x)<=f.aoe)hit.push(o)}tbDamageUnits(hit,f.dmg);var died=false;for(var j=0;j<hit.length;j++){if(hit[j].hp<=0)died=true}if(died)f.cd+=0.8}
else{u.hp-=f.dmg;u.flash=0.12;if(u.hp<=0)f.cd+=0.8}
if(f.kamikaze)f.hp=0;
}
function tbSpawnFoe(type,F,mag){
try{tbMarkSeen(type)}catch(e){}
tbB.foes.push({id:tbB.uid++,type:type,x:96,hp:Math.round(F.hp*mag),maxhp:Math.round(F.hp*mag),dmg:Math.round(F.dmg*mag),rng:F.rng,sp:F.sp*(0.9+Math.random()*0.2),atk:F.atk,cd:1,flash:0,regen:F.regen?F.regen*mag:0,aoe:F.aoe,kamikaze:F.kamikaze,big:!!F.big,rage:F.rage?1:0,medic:F.medic||0,gimmick:F.gimmick||null,gt:F.gt||0});
}
function tbSend(id){
if(!tbB||tbB.over)return false;
var U=TB_UNITS[id];if(!U)return false;
if(tbLoadoutGet().indexOf(id)===-1)return false;
if(!tbUnitOpen(id)){try{tbSay([(id==='lildeadair'||id==='lilsignoff')?('locked. 3-star its season first. (lil units earn their size.)'):((TB_GACHA.indexOf(id)!==-1)?('locked. gacha exclusive. (feed the dispenser.)'):('locked. beat 1-'+(TB_UNLOCK[id]||1)+' to enlist '+id+'. (no shortcuts. the static checks IDs.)'))])}catch(e){}return false}
var scost=Math.round(U.cost*(tbB.st.starm||1));
if(tbB.energy<scost)return false;
if((tbB.cds[id]||0)>tbB.time)return false;
tbB.energy-=scost;tbB.cds[id]=tbB.time+U.cd*Math.max(0.3,1-0.05*tbBaseLvEff('rech'));
var m=tbMult(id);
var gm=1;try{if(tbB&&tbB.geo&&tbB.geo.dmg)gm=tbB.geo.dmg}catch(e){}
tbB.units.push({id:tbB.uid++,type:id,x:4,hp:Math.round(U.hp*m),maxhp:Math.round(U.hp*m),dmg:Math.round(U.dmg*m*gm),rng:U.rng,sp:U.sp,atk:U.atk||2,cd:0.5,flash:0,aoe:U.aoe,kamikaze:U.kamikaze,crit:U.crit||null,regen:U.regen||0,exec:U.exec||0});
try{tbPaint()}catch(e){}
return true;
}
function tbCannon(){
if(!tbB||tbB.over||tbB.cannonCd>0)return false;
var gcd=40;try{if(tbB.geo&&tbB.geo.cd)gcd=tbB.geo.cd}catch(e){}
if(!(tbB.geo&&tbB.geo.cd)){try{gcd=Math.max(15,40-tbBaseLvEff('surge'))}catch(e){}}
tbB.cannonCd=gcd;
var hit=[];
for(var i=0;i<tbB.foes.length;i++){if(tbB.foes[i].x>55)hit.push(tbB.foes[i])}
var cpow=0;try{cpow=10*tbBaseLvEff('surge')}catch(e){}
for(var k=0;k<hit.length;k++){var fh=hit[k];fh.hp-=Math.max(25,Math.min(600,Math.round(fh.hp*0.08)))+cpow;fh.flash=0.25}
tbB.foes=tbB.foes.filter(function(f){return f.hp>0});
try{tbSay(['the surge speaks.'])}catch(e){}
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
var order=['bulwark','spark','cutter','dart','echo','mortar','rail','maul','aegis','needle','bomb','frenzy'];
for(var i=0;i<order.length;i++){if(!tbUnitOpen(order[i]))continue;if(tbLoadoutGet().indexOf(order[i])===-1)continue;if(tbSend(order[i]))break}
if(tbB.cannonCd<=0&&tbB.foes.length>=3)tbCannon();
}
function tbEnd(win){
if(!tbB||tbB.over)return;
tbB.over=win?'win':'lose';
tbAuto=false;
var st=tbB.st;
if(win){
var xp=Math.round((60+(st.type==='boss'?90:(st.type==='final'?150:(st.type==='challenge'?30:0))))*(st.od?1.2:1)*tbMagXpFor(st.pmag||1)*(st.starm||1)*((tbB.geo&&tbB.geo.xp)||1)*(1+tbHandBonus()/100));
tbXP+=xp;
var key=st.ch+'_'+st.n;
tbBeaten[key]=1;
try{var _C=TB_CH[st.ch-1];if(_C){var _pl=(_C.pools[st.n-1]||[]);for(var _pi=0;_pi<_pl.length;_pi++)tbMarkSeen(_pl[_pi]);if(_C.bosses[st.n])tbMarkSeen(_C.bosses[st.n])}}catch(e){}
if(st.n===30)tbStarDoneSet(st.ch,st.star||1);
if(st.od)tbTum[key]=1;
tbPersist();
try{tbSay(['base destroyed. '+(st.od?'overdrive?? already?? showoff.':'clean.'),'+'+xp+' xp. (spend it. the signals have rent due.)'])}catch(e){}
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
else if(boss==='blackout')tbSay([pre+'stage '+n+'. BLACKOUT inbound. (the dial goes dark. stay on frequency.)']);
else if(boss==='feedback')tbSay([pre+'stage '+n+'. FEEDBACK approaches. (it heard itself. now it is angry.)']);
else if(boss==='signoff')tbSay([pre+'stage '+n+'. SIGNOFF. (the last broadcast. do not let it be yours.)']);
else if(boss==='undertow')tbSay([pre+'stage '+n+'. UNDERTOW. (the current pulls. plant your bulwarks deep.)']);
else if(boss==='maw')tbSay([pre+'stage '+n+'. MAW. (it is hungry. it drains everything. starve it.)']);
else if(boss==='staticsea')tbSay([pre+'stage '+n+'. THE STATIC SEA. (the season finale. the lane floods. bring everything.)']);
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
'.tbHow{max-width:560px;margin:0 auto;text-align:left;font-size:13px;line-height:1.9;color:#b8b8cc}'+
'#tbRitual{position:absolute;inset:0;background:#0a0a10;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;z-index:20}'+
'.tbCube{position:relative;width:96px;height:96px;border:2px solid #9ab8d8;background:rgba(40,50,80,.25);cursor:pointer;animation:tbSpin 7s linear infinite}'+
'.tbCube i{position:absolute;width:12px;height:12px;background:#8df;box-shadow:0 0 8px #8df}'+
'@keyframes tbSpin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}'+
'#tbRitCount{font-size:13px;color:#8a8aa2;letter-spacing:3px}'+
'#tbRitHint{font-size:11px;color:#5a5a72;letter-spacing:1px}'+
'#tbRitSkip{background:none;border:none;color:#4a4a62;font-family:Consolas,monospace;font-size:11px;cursor:pointer;letter-spacing:2px}'+
'#tbRitFlash{position:absolute;inset:0;background:#fff;opacity:0;pointer-events:none;transition:opacity .25s;z-index:21;font-family:Consolas,monospace}'+
'#tbRitStudio{position:absolute;inset:0;display:none;align-items:center;justify-content:center;z-index:22;font-size:26px;letter-spacing:10px;color:#fff;background:#0a0a10}';
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
var tbScreen='title',tbMenuCh=1,tbMenuOd=false,tbMenuMag=1;
function tbMagXpFor(m){m=Math.max(1,Math.min(12,Math.round(m)||1));return m>=12?12:1+0.6*(m-1)}
function tbMagXp(){return tbMagXpFor(tbMenuMag)}
function tbShowScreen(s){
var m=tbEl('tbMenu');if(!m)return;
if(s===null){tbScreen=null;m.style.display='none';try{var eo=tbEl('tbEndOv');if(eo)eo.remove()}catch(e){}return}
if(s)tbScreen=s;
if(tbScreen===null){m.style.display='none';return}
m.style.display='block';
if(tbScreen==='title')tbPaintTitle(m);
else if(tbScreen==='play')tbPaintPlay(m);
else if(tbScreen==='how')tbPaintHow(m);
else if(tbScreen==='units')tbPaintUnits(m);
else if(tbScreen==='base')tbPaintBase(m);
else if(tbScreen==='pedia')tbPaintPedia(m);
else if(tbScreen==='gacha')tbPaintGacha(m);
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
h+='<button class="tbBig" id="tbGoBase">BASE</button>';
h+='<button class="tbBig" id="tbGoHow">HOW TO</button>';
h+='<button class="tbBig" id="tbGoUnits">SIGNALS</button>';
h+='<button class="tbBig" id="tbGoPedia">PEDIA</button>';
h+='<button class="tbBig" id="tbGoGacha">GACHA</button>';
h+='<button class="tbBig" id="tbGoExit">LEAVE</button>';
h+='<div class="sub" style="margin-top:20px">xp: '+tbXP+'</div>';
m.innerHTML=h;
tbEl('tbGoPlay').onclick=function(){tbShowScreen('play')};
tbEl('tbGoPedia').onclick=function(){tbShowScreen('pedia')};
tbEl('tbGoGacha').onclick=function(){tbShowScreen('gacha')};
tbEl('tbGoBase').onclick=function(){tbShowScreen('base')};
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
var lo=tbLoadoutGet();
h+='<div class="sub">loadout '+lo.length+'/6 — only loaded signals enter battle.</div>';
for(var ui=0;ui<TB_UORDER.length;ui++){var id=TB_UORDER[ui],U=TB_UNITS[id],lv=tbLvl(id),cost=40*lv;
var lockTxt=(id==='lildeadair')?'3-star season one':((id==='lilsignoff')?'3-star season two':((TB_GACHA.indexOf(id)!==-1)?'gacha exclusive (feed the dispenser)':('beat 1-'+(TB_UNLOCK[id]||1)+' to enlist')));
if(!tbUnitOpen(id)){h+='<div class="tbURow" style="opacity:.45"><span style="min-width:90px">🔒 ???</span><span style="color:#8a8aa2">'+lockTxt+'</span></div>';continue}
var inLo=lo.indexOf(id)!==-1;
var tags='';if(U.crit)tags+=' · crit '+Math.round(U.crit[0]*100)+'% x'+U.crit[1];if(U.regen)tags+=' · regen '+U.regen+'/s';if(U.exec)tags+=' · bossbane x'+U.exec;if(U.aoe)tags+=' · aoe '+U.aoe;
if(lv>=TB_ULVMAX)h+='<div class="tbURow"><span style="min-width:90px">'+U.n+' lv'+lv+'</span><span style="color:#8a8aa2">$'+U.cost+' · hp '+Math.round(U.hp*(1+0.15*(lv-1)))+' · dmg '+Math.round(U.dmg*(1+0.15*(lv-1)))+' · cd '+U.cd+'s · atk '+U.atk+'s'+tags+'</span><span style="color:#8a8aa2">maxed. touch grass.</span> <button class="tbBtn" data-lo="'+id+'">'+(inLo?'IN ✓':'ADD +')+'</button></div>';
else h+='<div class="tbURow"><span style="min-width:90px">'+U.n+' lv'+lv+'</span><span style="color:#8a8aa2">$'+U.cost+' · hp '+Math.round(U.hp*(1+0.15*(lv-1)))+' · dmg '+Math.round(U.dmg*(1+0.15*(lv-1)))+' · cd '+U.cd+'s · atk '+U.atk+'s'+tags+'</span><button class="tbBtn" data-up="'+id+'">lv up ('+cost+' xp)</button> <button class="tbBtn" data-lo="'+id+'">'+(inLo?'IN ✓':'ADD +')+'</button></div>';
}
h+=tbBackBtn('title');
m.innerHTML=h;
tbWireBack('title');
var ups=m.querySelectorAll('[data-up]');
for(var qi=0;qi<ups.length;qi++)(function(el){el.onclick=function(){
var id=el.getAttribute('data-up'),lv=tbLvl(id),cost=40*lv;
if(lv>=TB_ULVMAX||tbXP<cost)return;
tbXP-=cost;tbLevels[id]=lv+1;tbPersist();tbShowScreen('units');
}})(ups[qi]);
var los=m.querySelectorAll('[data-lo]');
for(var li2=0;li2<los.length;li2++)(function(el){el.onclick=function(){
var id=el.getAttribute('data-lo'),lo=tbLoadoutGet(),at=lo.indexOf(id);
if(at!==-1)lo.splice(at,1);
else{if(lo.length>=6)return;lo.push(id)}
tbLoadoutSet(lo);tbShowScreen('units');
}})(los[li2]);
}
function tbChOpen(c){
if(c<=1)return true;
if(c<=TB_CH.length)return !!tbBeaten[(c-1)+'_30'];
return false;
}
function tbBaseCost(id){var u=TB_BASE[id];if(!u)return 1e9;return u.cost*(tbBaseLv(id)+1)}
function tbPaintBase(m){
var h='<h1 style="font-size:22px">BASE</h1>';
h+='<div class="sub">xp: '+tbXP+' · cap lv'+tbBaseMax()+' (+2 per beaten season)</div>';
for(var i=0;i<TB_BORDER.length;i++){var id=TB_BORDER[i],U=TB_BASE[id],lv=tbBaseLv(id),mx=tbBaseMax(),cost=tbBaseCost(id);
if(lv>=mx)h+='<div class="tbURow"><span style="min-width:110px">'+U.n+' lv'+lv+'</span><span style="color:#8a8aa2">maxed. the concrete salutes you.</span></div>';
else h+='<div class="tbURow"><span style="min-width:110px">'+U.n+' lv'+lv+'</span><span style="color:#8a8aa2">'+U.desc+'</span><button class="tbBtn" data-bup="'+id+'">lv up ('+cost+' xp)</button></div>';
}
h+=tbBackBtn('title');
m.innerHTML=h;
tbWireBack('title');
var ups=m.querySelectorAll('[data-bup]');
for(var qi=0;qi<ups.length;qi++)(function(el){el.onclick=function(){
var id=el.getAttribute('data-bup'),lv=tbBaseLv(id),cost=tbBaseCost(id);
if(lv>=tbBaseMax()||tbXP<cost)return;
tbXP-=cost;tbBase[id]=lv+1;tbPersist();tbShowScreen('base');
}})(ups[qi]);
}
function tbPaintPlay(m){var chN=Math.min(tbMenuCh||1,TB_CH.length);
if(!tbChOpen(chN))chN=1;
tbMenuCh=chN;
var C=TB_CH[chN-1];
var h='<h1 style="font-size:22px">'+(TB_CH_TITLES[chN-1]||('CHAPTER '+chN))+'</h1>';
h+='<div style="margin-bottom:10px"><span class="tbChTab'+(tbMenuOd?' sel':'')+'" id="tbOdT">overdrive: '+(tbMenuOd?'ON':'off')+'</span><span style="font-size:11px;color:#8a8aa2">xp: '+tbXP+'</span><span style="font-size:11px;color:#8a8aa2" id="tbGeoLine"></span></div>';
h+='<div style="margin-bottom:10px;font-size:11px;color:#8a8aa2">magnification: ';
var tbMagBtns=[1,2,3,4,5,6,12];
for(var mii=0;mii<tbMagBtns.length;mii++){var mv=tbMagBtns[mii];h+='<span class="tbChTab'+(tbMenuMag===mv?' sel':'')+'" data-mag="'+mv+'">'+mv+'x</span>'}
h+='<span> (x'+tbMagXp().toFixed(1).replace(/\.0$/,'')+' xp)</span></div>';
h+='<div style="margin-bottom:10px"><button class="tbBtn" id="tbIntelT">? intel: '+(tbIntelOn?'ON':'off')+'</button> <span style="font-size:11px;color:#8a8aa2">on: stages show intel first.</span></div>';
h+='<div style="margin-bottom:10px;font-size:11px;color:#8a8aa2">stars: ';
for(var si2=1;si2<=3;si2++){var sopen=tbStarOpen(chN,si2);h+='<span class="tbChTab'+(tbMenuStar===si2&&sopen?' sel':'')+(sopen?'':' lock')+'"'+(sopen?' data-star="'+si2+'"':'')+'>'+si2+'★</span>'}
h+='<span> (enemies x'+tbStarMult(tbMenuStar)+' · costs x'+tbStarMult(tbMenuStar)+' · xp x'+tbStarMult(tbMenuStar)+')</span></div>';
h+='<div style="margin-bottom:10px;font-size:11px;color:#8a8aa2">handicap: units -<input id="tbHU" type="number" min="0" value="'+tbUHand+'" style="width:64px;background:#1c1c28;border:1px solid #4a4a6a;color:#d8d8e2;font-family:Consolas,monospace;font-size:11px;padding:2px 4px;border-radius:4px"> base -<input id="tbHB" type="number" min="0" value="'+tbBHand+'" style="width:64px;background:#1c1c28;border:1px solid #4a4a6a;color:#d8d8e2;font-family:Consolas,monospace;font-size:11px;padding:2px 4px;border-radius:4px"> <span id="tbHBonus">xp +'+tbHandBonus()+'%</span></div>';
h+='<div>';
var tbChTotal=TB_CH.length+TB_CH_LOCKED.length;
for(var c=1;c<=tbChTotal;c++){
var isCh=c<=TB_CH.length;
var nm=isCh?TB_CH[c-1].name:TB_CH_LOCKED[c-TB_CH.length-1];
var open=tbChOpen(c);
h+='<span class="tbChTab'+(tbMenuCh===c&&open?' sel':'')+(open?'':' lock')+'"'+(open?' data-ch="'+c+'"':'')+'>'+c+': '+nm+'</span>';
}
h+='</div>';
h+='<div style="margin:12px 0">';
for(var n=1;n<=30;n++){
var k=chN+'_'+n;
var open2=n===1||tbBeaten[chN+'_'+(n-1)];
var cls='tbStage'+(tbBeaten[k]?' done':'')+(tbTum[k]?' od':'')+((!open2)?' lock':'');
h+='<span class="'+cls+'" data-st="'+n+'" title="'+((C.names[n-1])||'')+'">'+n+'</span>';
}
h+='</div>';
h+='<div style="font-size:11px;color:#8a8aa2;margin-bottom:12px">purple underline = overdrive beaten.'+(chN===1?'':' beat the previous season\'s stage 30 to unlock.')+'</div>';
h+=tbBackBtn('title','MENU');
m.innerHTML=h;
tbWireBack('title');
var tg=tbEl('tbOdT');if(tg)tg.onclick=function(){if(tbMenuOd){tbMenuOd=false;try{tbSay(['overdrive off. the static exhales. (coward.)'])}catch(e){}tbShowScreen('play')}else{try{tbSay(['overdrive is earned, not toggled. (relaunch and click the cube. 10 times.)'])}catch(e){}}};
try{var gl=tbEl('tbGeoLine');if(gl&&(typeof geoName==='function')){var gn=geoName();if(gn&&gn!=='UNBUFFED')gl.textContent=' · '+gn}}catch(e){}
var hu=tbEl('tbHU');if(hu)hu.onchange=function(){var v=parseInt(hu.value,10);tbUHand=(!(v>=0))?0:v;tbPersist();tbShowScreen('play')};
var hb=tbEl('tbHB');if(hb)hb.onchange=function(){var v=parseInt(hb.value,10);tbBHand=(!(v>=0))?0:v;tbPersist();tbShowScreen('play')};
var tabs=m.querySelectorAll('.tbChTab[data-ch]');
for(var ti=0;ti<tabs.length;ti++)(function(el){el.onclick=function(){
var c=parseInt(el.getAttribute('data-ch'),10);
if(!tbChOpen(c))return;
tbMenuCh=c;tbShowScreen('play');
}})(tabs[ti]);
var mgs=m.querySelectorAll('.tbChTab[data-mag]');
for(var gi=0;gi<mgs.length;gi++)(function(el){el.onclick=function(){
var v=parseInt(el.getAttribute('data-mag'),10);
if(v>=1&&v<=12&&(v<=6||v===12)){tbMenuMag=v;tbShowScreen('play')}
}})(mgs[gi]);
var sgs=m.querySelectorAll('.tbChTab[data-star]');
for(var gi2=0;gi2<sgs.length;gi2++)(function(el){el.onclick=function(){
var v=parseInt(el.getAttribute('data-star'),10);
if(v>=1&&v<=3&&tbStarOpen(chN,v)){tbMenuStar=v;tbShowScreen('play')}
}})(sgs[gi2]);
var sts=m.querySelectorAll('.tbStage[data-st]');
for(var si=0;si<sts.length;si++)(function(el){el.onclick=function(){
var n=parseInt(el.getAttribute('data-st'),10);
if(!(n===1||tbBeaten[chN+'_'+(n-1)]))return;
if(tbIntelOn){tbIntelPanel(chN,n);return}
tbStartBattle(chN,n,tbMenuOd);
}})(sts[si]);
var it=tbEl('tbIntelT');if(it)it.onclick=function(){tbIntelOn=!tbIntelOn;tbShowScreen('play')};
}
function tbGachaPull(){
if(tbXP<TB_GACHA_COST){try{tbSay(['dispenser needs '+TB_GACHA_COST+' xp. it accepts exact change and regret.'])}catch(e){}return}
tbXP-=TB_GACHA_COST;
tbPity++;
var unowned=[];
for(var i=0;i<TB_GACHA.length;i++)if(!tbGachaOwned[TB_GACHA[i]])unowned.push(TB_GACHA[i]);
var id,pityHit=false;
if(tbPity>=10&&unowned.length){id=unowned[Math.floor(Math.random()*unowned.length)];pityHit=true}
else id=TB_GACHA[Math.floor(Math.random()*TB_GACHA.length)];
var isNew=!tbGachaOwned[id];
tbGachaOwned[id]=true;
if(isNew||pityHit)tbPity=0;
tbLevels[id]=(tbLevels[id]||0)+1;
try{tbMarkSeen(id)}catch(e){}
tbPersist();
try{
var U=TB_UNITS[id];
if(isNew)tbSay(['the dispenser rattles... NEW UNIT: '+U.n+'. '+(pityHit?'pity smiled. (it rarely does.)':'first try luck. (suspicious.)')]);
else tbSay(['the dispenser rattles... '+U.n+' again. dupe. lv'+tbLevels[id]+'. (it multiplies. do not question it.)']);
}catch(e){}
try{tbShowScreen('gacha')}catch(e){}
}
function tbPaintGacha(m){
var h='<h1 style="font-size:22px">DISPENSER</h1>';
h+='<div class="sub">xp: '+tbXP+' · 300 xp a pull · pity at 10 · dupes level up (no cap. mortals fear this.)</div><div style="max-width:560px;margin:0 auto;text-align:left">';
for(var i=0;i<TB_GACHA.length;i++){var id=TB_GACHA[i],U=TB_UNITS[id];
var gtags='';if(U.crit)gtags+=' · crit '+Math.round(U.crit[0]*100)+'% x'+U.crit[1];if(U.regen)gtags+=' · regen '+U.regen+'/s';if(U.exec)gtags+=' · bossbane x'+U.exec;if(U.aoe)gtags+=' · aoe '+U.aoe;
if(tbGachaOwned[id])h+='<div class="tbURow"><span style="min-width:110px;color:'+((TB_FCOLOR[id])||'#fff')+'">'+U.n+' lv'+(tbLevels[id]||1)+'</span><span style="color:#8a8aa2">$'+U.cost+' · hp '+U.hp+' · dmg '+U.dmg+gtags+'</span></div>';
else h+='<div class="tbURow" style="opacity:.45"><span style="min-width:110px">🔒 ???</span><span style="color:#8a8aa2">gacha exclusive. feed the dispenser.</span></div>';
}
h+='</div>';
h+='<button class="tbBig" id="tbPullBtn">PULL ('+TB_GACHA_COST+' xp)</button>';
h+=tbBackBtn('title');
m.innerHTML=h;
tbWireBack('title');
var pb=tbEl('tbPullBtn');if(pb)pb.onclick=function(){tbGachaPull()};
}
function tbPaintPedia(m){
var h='<h1 style="font-size:22px">ALMANAC</h1>';
h+='<div class="sub">seen it? named it. otherwise: ?</div><div style="max-width:640px;margin:0 auto;text-align:left">';
var keys=[];for(var k in TB_FOES){if(TB_FOES.hasOwnProperty(k))keys.push(k)}
keys.sort();
for(var i=0;i<keys.length;i++){
var t=keys[i],F=TB_FOES[t],known=false;
try{known=!!tbSeen[t]}catch(e){}
if(known)h+='<div class="tbURow"><span style="min-width:110px;color:'+((TB_FCOLOR[t])||'#fff')+'">■ '+t+'</span><span style="color:#8a8aa2">hp '+F.hp+' · dmg '+F.dmg+' · rng '+F.rng+' · sp '+F.sp+(F.boss?' · BOSS':'')+(F.aoe?' · aoe '+F.aoe:'')+(F.blurb?'<br>'+F.blurb:'')+'</span></div>';
else h+='<div class="tbURow" style="opacity:.45"><span style="min-width:110px">■ ?</span><span style="color:#8a8aa2">?. beat its stage. (or meet it first.)</span></div>';
}
h+='</div>';
h+=tbBackBtn('title');
m.innerHTML=h;
tbWireBack('title');
}
// ── DOM: battle ──
function tbBuildBattle(){
var lane=tbEl('tbLane'),cards=tbEl('tbCards'),top=tbEl('tbTop');
if(!lane||!cards||!top)return;
lane.innerHTML='<div id="tbGround"></div><div class="tbBase" id="tbPB" style="left:10px"><div class="hpb"><i></i></div></div><div class="tbBase" id="tbEB" style="right:10px"><div class="hpb"><i></i></div></div>';
var h='';
var loCards=tbLoadoutGet();
for(var i=0;i<TB_UORDER.length;i++){var id=TB_UORDER[i],U=TB_UNITS[id];
var dcost=Math.round(U.cost*((tbB&&tbB.st&&tbB.st.starm)||1));
if(tbUnitOpen(id)&&loCards.indexOf(id)!==-1)h+='<button class="tbCard" data-send="'+id+'">'+U.n+'<small>$'+dcost+'</small></button>';
else if(!tbUnitOpen(id))h+='<button class="tbCard off" data-locked="'+id+'">🔒<small>beat 1-'+(TB_UNLOCK[id]||1)+'</small></button>';
}
h+='<button class="tbCard cannon" id="tbCan">SURGE<small>40s</small></button>';
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
if(top)top.innerHTML='<span>st '+B.st.ch+'-'+B.st.n+(B.st.od?' (overdrive)':'')+((B.st.pmag||1)>1?' [x'+B.st.pmag+']':'')+((B.st.star||1)>1?' ['+B.st.star+'★]':'')+' · '+B.st.name+'</span><span><span id="tbEBar"><i style="width:'+(100*B.energy/B.max)+'%"></i></span> '+Math.floor(B.energy)+'</span><span>you '+Math.ceil(B.pbase)+' vs '+Math.ceil(B.ebase)+' static</span><span>'+Math.floor(B.time)+'s</span>';
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
try{d.title=u.type+' '+Math.max(0,Math.ceil(u.hp))+'/'+u.maxhp+' hp'}catch(e){}
var pct=Math.max(0,100*u.hp/u.maxhp);
d.innerHTML='<div class="uhp"><i style="width:'+pct+'%"></i></div>'+d.textContent;
lane.appendChild(d);
}
for(var a=0;a<B.units.length;a++){var u=B.units[a];if(!u.maxhp)u.maxhp=u.hp;dot(u,false)}
for(var b=0;b<B.foes.length;b++){var f=B.foes[b];dot(f,true)}
if(cards){var ss=cards.querySelectorAll('[data-send]');
for(var s2=0;s2<ss.length;s2++){var id=ss[s2].getAttribute('data-send'),U=TB_UNITS[id];
var ready=B.energy>=Math.round(U.cost*((B.st&&B.st.starm)||1))&&(B.cds[id]||0)<=B.time;
if(ready)ss[s2].classList.remove('off');else ss[s2].classList.add('off');
}
var cn=cards.querySelector('#tbCan');if(cn){if(B.cannonCd<=0)cn.classList.add('ready');else cn.classList.remove('ready')}
var wk2=cards.querySelector('#tbWork');if(wk2){var wc=120*B.worker;wk2.innerHTML='WORKER lv'+B.worker+'<small>'+(B.worker>=8?'max':'$'+wc)+'</small>';if(B.worker>=8||B.energy<wc)wk2.classList.add('off');else wk2.classList.remove('off')}
}
}
var TB_FCOLOR={spark:'#4a7',cutter:'#48c',echo:'#a84',bulwark:'#784',dart:'#c6c',mortar:'#ec4',rail:'#4cc',maul:'#a74',fuzz:'#a44',slab:'#868',shiv:'#c44',hiss:'#a84',zip:'#c6c',pop:'#ec4',rush:'#4cc',mend:'#4a4',anchor:'#868',longshot:'#c84',boom:'#c44',crush:'#a74',burst:'#8c4',brute:'#a4a',deadbolt:'#e64',overdub:'#6ce',deadair:'#e2e',hype:'#c4c',jingle:'#4cc',tower:'#878',blackout:'#335',feedback:'#c0c',signoff:'#e22',lildeadair:'#d6d',lilsignoff:'#6dd',aegis:'#8ad',needle:'#df8',bomb:'#f84',frenzy:'#c6f'};
var TB_USYM={spark:'▲',cutter:'◆',echo:'●',bulwark:'■',dart:'➤',mortar:'⬢',rail:'↟',maul:'✚'};
TB_USYM.lildeadair='▼';TB_USYM.lilsignoff='◈';
TB_USYM.aegis='▣';TB_USYM.needle='↑';TB_USYM.bomb='✸';TB_USYM.frenzy='≋';
function tbPaintEnd(win,xp){
var B=tbB;
var lane=tbEl('tbLane');if(!lane)return;
 var d=document.createElement('div');
 d.id='tbEndOv';
 d.style.cssText='position:absolute;inset:0;background:rgba(10,10,16,0.88);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;z-index:4;font-size:16px';
d.innerHTML='<div style="font-size:22px;letter-spacing:4px">'+(win?'STATIC BROKEN':'SIGNAL LOST')+'</div><div style="font-size:13px;color:#8a8aa2">'+(win?('+'+xp+' xp. '+(B&&B.st.od?'overdrive cleared. disgusting.':'obj slow-claps.')):'the static holds the frequency. (it is smug about it.)')+'</div><button class="tbBtn" id="tbAgain">STAGES</button>';
lane.appendChild(d);
 var ag=tbEl('tbAgain');if(ag)ag.onclick=function(){tbB=null;try{var eo=tbEl('tbEndOv');if(eo)eo.remove()}catch(e){}try{tbShowScreen('play')}catch(e){}};
}
// ── overdrive ritual: a spinning cube with inner cubes (obj sends regards).
// every launch. ignore it and it flashes lux studios and drops. click it
// 10 times and it explodes into overdrive. no shortcuts. the static checks.
var tbRitN=0;
function tbRitual(){
var ov=tbEl('tbOverlay');if(!ov){tbScreen='title';tbShowScreen('title');return}
var old=tbEl('tbRitual');if(old)old.remove();
tbRitN=0;
var d=document.createElement('div');d.id='tbRitual';
var dots='';
for(var i=0;i<8;i++){var a=i/8*Math.PI*2;dots+='<i style="left:'+(42+Math.cos(a)*30)+'px;top:'+(42+Math.sin(a)*30)+'px"></i>'}
d.innerHTML='<div style="font-size:12px;color:#8a8aa2;letter-spacing:4px">SOMETHING IS ALREADY HERE</div>'+
'<div class="tbCube" id="tbRitCube">'+dots+'</div>'+
'<div id="tbRitCount">0 / 10</div>'+
'<div id="tbRitHint">click the cube. (or ignore it. it will remember that.)</div>'+
'<button id="tbRitSkip">ignore it</button>'+
'<div id="tbRitFlash"></div><div id="tbRitStudio">lux studios</div>';
ov.appendChild(d);
function ritGlow(){
var c=tbEl('tbRitCube');if(!c)return;
var n=tbRitN;
c.style.boxShadow='0 0 '+(8+n*9)+'px '+(2+n*2)+'px rgba(150,200,255,'+(0.25+n*0.07)+')';
c.style.borderColor=n>=7?'#ffd770':'#9ab8d8';
var t=tbEl('tbRitCount');if(t)t.textContent=n+' / 10';
}
function ritEnd(){
var r=tbEl('tbRitual');if(r)r.remove();
tbScreen='title';try{tbShowScreen('title')}catch(e){}
}
var cube=tbEl('tbRitCube');
if(cube)cube.onclick=function(){
if(tbRitN>=10)return;
tbRitN++;
try{ritGlow()}catch(e){}
if(tbRitN>=10){
try{
var f=tbEl('tbRitFlash');if(f){f.style.opacity='1'}
tbMenuOd=true;
try{tbSay(['the cube detonates. overdrive is ON. (2x. you know the drill.)'])}catch(e){}
setTimeout(function(){try{ritEnd()}catch(e){}},450);
}catch(e){try{ritEnd()}catch(e){}}
}
};
var sk=tbEl('tbRitSkip');
if(sk)sk.onclick=function(){
try{
var st=tbEl('tbRitStudio');if(st){st.style.display='flex';st.style.opacity='1'}
setTimeout(function(){try{var s2=tbEl('tbRitStudio');if(s2){s2.style.transition='opacity .5s';s2.style.opacity='0'}}catch(e){}},900);
setTimeout(function(){try{ritEnd()}catch(e){}},1500);
}catch(e){try{ritEnd()}catch(e){}}
};
try{ritGlow()}catch(e){}
}
// ── dead air theme: noobalert.mp3. void track ducks on enter, resumes on exit.
var tbAud=null;
function tbMusicStart(){
try{
if(typeof bgm!=='undefined'&&bgm){window._tbWasBgm=!bgm.paused;try{bgm.pause()}catch(e){}}else window._tbWasBgm=false;
}catch(e){window._tbWasBgm=false}
try{
if(!tbAud)tbAud=new Audio();
tbAud.src='noobalert.mp3';tbAud.loop=true;tbAud.volume=0.5;
var p=tbAud.play();if(p&&p.catch)p.catch(function(){});
}catch(e){}
}
function tbMusicStop(){
try{if(tbAud)tbAud.pause()}catch(e){}
try{if(typeof bgm!=='undefined'&&bgm){if(window._tbWasBgm){var bp=bgm.play();if(bp&&bp.catch)bp.catch(function(){})}window._tbWasBgm=false}}catch(e){}
}
// ── enter/exit ──
function tbEnter(){
tbLoad();
try{tbCSS()}catch(e){}
try{tbOverlay()}catch(e){}
try{tbSay(null)}catch(e){}
try{tbMusicStart()}catch(e){}
try{tbRitual()}catch(e){tbScreen='title';try{tbShowScreen('title')}catch(err){}}
return true;
}
function tbExit(){
tbStopLoop();tbAuto=false;tbB=null;
try{tbMusicStop()}catch(e){}
try{var ov=tbEl('tbOverlay');if(ov)ov.remove()}catch(e){}
try{var cs=tbEl('tbCSS');if(cs)cs.remove()}catch(e){}
}
// ── debug hooks ──
window.tbStep=function(n){try{n=n||1;for(var i=0;i<n;i++)tbTick(1/60);return tbB?Math.round(tbB.time*10)/10:-1}catch(e){return -1}};
window.tbDbg=function(){try{if(!tbB)return {menu:true,xp:tbXP};var bh=null;for(var bi=0;bi<tbB.foes.length;bi++){if(tbB.foes[bi].big){bh=tbB.foes[bi].hp;break}}return {t:Math.round(tbB.time*10)/10,e:Math.floor(tbB.energy),pb:Math.ceil(tbB.pbase),eb:Math.ceil(tbB.ebase),units:tbB.units.length,foes:tbB.foes.length,boss:bh,worker:tbB.worker,udmg:(tbB.units.length?tbB.units[0].dmg:null),ccd:Math.ceil(tbB.cannonCd),over:tbB.over}}catch(e){return {err:String(e)}}};
window.tbStart=function(ch,n,od){try{tbEnter();tbStartBattle(ch,n,!!od);return true}catch(e){return false}};
window.tbAuto=function(v){try{tbAuto=!!v;return tbAuto}catch(e){return false}};
window.tbSetMag=function(v){try{tbMenuMag=Math.max(1,Math.min(12,parseInt(v,10)||1));return tbMenuMag}catch(e){return 1}};
window.tbGiveAll=function(){try{
tbLoad();tbXP=1e26;
for(var c=1;c<=TB_CH.length;c++){var n=TB_CH[c-1].names.length;for(var s=1;s<=n;s++){tbBeaten[c+'_'+s]=1;tbTum[c+'_'+s]=1}tbStarDone[c]=3;}
for(var li=0;li<TB_UORDER.length;li++)tbLevels[TB_UORDER[li]]=1000;
for(var lb=0;lb<TB_BORDER.length;lb++)tbBase[TB_BORDER[lb]]=1000;
for(var gi=0;gi<TB_GACHA.length;gi++)tbGachaOwned[TB_GACHA[gi]]=true;
tbLoadoutSet(TB_UORDER.slice(0,6));
for(var sf in TB_FOES){if(TB_FOES.hasOwnProperty(sf))tbSeen[sf]=1}
tbPersist();return {xp:tbXP,units:TB_UORDER.length,stages:Object.keys(tbBeaten).length,base:1000};
}catch(e){return {err:String(e)}};};
window.tbMaxLv=function(){try{
tbLoad();
for(var i=0;i<TB_UORDER.length;i++)tbLevels[TB_UORDER[i]]=1000;
for(var b=0;b<TB_BORDER.length;b++)tbBase[TB_BORDER[b]]=1000;
tbPersist();return {units:TB_UORDER.length,base:TB_BORDER.length};
}catch(e){return {err:String(e)}};};
window.tbEnter=tbEnter;
window.tbExit=tbExit;
})();
