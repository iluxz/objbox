// cube-greyhall.js — GREYHALL.
// a haydee-like that is legally distinct. the man explores. obj is the PA system and helps with nothing.
(function(){
'use strict';
if(typeof window.ghLoaded!=='undefined')return;
window.ghLoaded=true;

// ── state ──
var ghActive=false;
var ghRoom='landing';
var ghHp=100,ghMaxHp=100;
var ghAmmo={pistol:0,magnum:0};
var ghGuns=[];
var ghGun='pistol';
var ghMossOpen=false;
var ghPlate1=false;
var ghInv=[];
var ghCards=[];
var ghDeaths=0;
var ghDiff='';
var ghStation=null;
var ghRunFlags={};
var ghCombat=null;
var ghNarrQ=[];
var ghNarrBusy=false;
var ghNarrIv=null;
var ghNarrGen=0;
var ghTalkIv=null;
function ghTalkSync(){
try{
var r=document.getElementById('ghRoom');if(!r)return;
var talking=!!(ghNarrBusy||ghNarrQ.length);
if(talking)r.classList.add('talking');else r.classList.remove('talking');
}catch(e){}
}
function ghSave(){try{return JSON.parse(localStorage.getItem('cube_greyhall')||'{}')}catch(e){return{}}}
function ghLoad(){try{var s=ghSave();if(typeof s.hp==='number')ghHp=s.hp;if(s.ammo)ghAmmo=s.ammo;if(s.guns)ghGuns=s.guns;if(s.inv)ghInv=s.inv;if(s.cards)ghCards=s.cards;if(typeof s.deaths==='number')ghDeaths=s.deaths;if(s.diff)ghDiff=s.diff;if(s.station)ghStation=s.station;if(s.gun)ghGun=s.gun;if(s.moss)ghMossOpen=true;if(s.plate1)ghPlate1=true}catch(e){}}
function ghPersist(){try{localStorage.setItem('cube_greyhall',JSON.stringify({hp:ghHp,ammo:ghAmmo,guns:ghGuns,gun:ghGun,inv:ghInv,cards:ghCards,deaths:ghDeaths,diff:ghDiff,station:ghStation,moss:ghMossOpen?1:0,plate1:ghPlate1?1:0}))}catch(e){}}
function ghHas(id){return ghInv.indexOf(id)!==-1}
function ghInvFree(){return ghInv.length<9}

// ── narrator (typewriter queue) ──
function ghDial(){try{if(typeof dialSp==='function'){var v=dialSp();if(v>0&&v<=4)return v}}catch(e){}return 1}
function ghNarr(text,done){
ghNarrQ.push({t:text,d:done||null});
if(!ghNarrBusy)ghNarrNext();
}
function ghNarrNext(){
var job=ghNarrQ.shift();
if(!job){ghNarrBusy=false;return}
ghNarrBusy=true;
var myGen=ghNarrGen;
var el=null;
try{el=document.getElementById('ghNarrText')}catch(e){}
if(!el){ghNarrBusy=false;if(job.d)try{job.d()}catch(e){}return}
var full=job.t;
var i=0;
el.textContent='';
try{
var spd=ghDial();
var tick=Math.max(8,Math.round(34/spd));
var iv=setInterval(function(){
ghNarrIv=iv;
if(!ghActive){clearInterval(iv);ghNarrIv=null;ghNarrBusy=false;ghNarrQ=[];return}
i++;
el.textContent=full.slice(0,i);
if(i>=full.length){clearInterval(iv);ghNarrIv=null;setTimeout(function(){if(!ghActive||myGen!==ghNarrGen)return;ghNarrBusy=false;if(job.d)try{job.d()}catch(e){}if(!ghNarrBusy)ghNarrNext()},Math.round((ghNarrQ.length?200:650)/spd))}
},tick);
}catch(e){el.textContent=full;ghNarrBusy=false;if(job.d)try{job.d()}catch(e){}ghNarrNext()}
}
function ghSay(lines,done){
// PA is offline. narration becomes a transient prompt message.
try{
var s=(lines||[]).join(' ');
ghMsgTxt=s;ghMsgUntil=Date.now()+4500;
}catch(e){}
if(done){try{setTimeout(function(){try{done()}catch(e){}},150)}catch(e){}}
}
var ghMsgTxt='',ghMsgUntil=0;
function ghClearQ(){ghNarrGen++;ghNarrQ=[];try{if(ghNarrIv){clearInterval(ghNarrIv);ghNarrIv=null}}catch(e){}ghNarrBusy=false}

// ── css + shell ──
function ghCSS(){
if(document.getElementById('ghCSS'))return;
var s=document.createElement('style');s.id='ghCSS';
s.textContent=
'#ghOverlay{position:fixed;inset:0;z-index:2000;background:#101014;display:flex;flex-direction:column;font-family:Georgia,serif;color:#c8c8d0}'+
'#ghNarr{background:#0a0a0c;color:#9ab8d8;padding:14px 28px;min-height:76px;font-size:17px;line-height:1.55;border-bottom:4px solid #000;cursor:default}'+
'#ghNarr .who{color:#5a7a9a;font-style:italic}'+
'#ghRoom{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:20px;background:linear-gradient(180deg,#191920 0%,#0c0c10 100%)}'+
'#ghRoomTitle{font-size:15px;letter-spacing:6px;text-transform:uppercase;color:#5a6a7a}'+
'#ghRoomDesc{font-size:16px;color:#8a8a96;max-width:640px;text-align:center;font-style:italic}'+
'#ghDoors{display:flex;gap:16px;flex-wrap:wrap;justify-content:center}'+
'.ghDoor{background:#1e1e26;border:2px solid #44445a;border-radius:3px;padding:22px 30px;font-family:Georgia,serif;font-size:16px;color:#d0d0dc;cursor:pointer;min-width:150px;text-align:center;box-shadow:0 4px 0 #44445a}'+
'.ghDoor:hover{background:#2a2a34}'+
'#ghObjs{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}'+
'.ghObj{background:transparent;border:1px dashed #44445a;border-radius:3px;padding:8px 14px;font-family:Georgia,serif;font-size:13px;font-style:italic;color:#8a8a96;cursor:pointer}'+
'.ghObj:hover{border-color:#d0d0dc;color:#d0d0dc}'+
'#ghBar{background:#0a0a0c;color:#5a7a9a;font-size:12px;letter-spacing:2px;padding:8px 20px;display:flex;justify-content:space-between;border-top:4px solid #000;font-family:Consolas,monospace}'+
'#ghBar button{background:none;border:1px solid #5a7a9a;color:#9ab8d8;font-family:Consolas,monospace;font-size:12px;letter-spacing:2px;padding:4px 12px;cursor:pointer}'+
'#ghRoom.talking .ghDoor,#ghRoom.talking .ghObj{pointer-events:none;opacity:.55}'+
'#ghMenuBtn{position:fixed;top:86px;right:18px;color:#44445a;font-size:22px;cursor:pointer;z-index:2001;font-family:Consolas,monospace}'+
'#ghTitle{position:absolute;inset:0;background:transparent;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;z-index:20;text-shadow:0 2px 8px #000}'+
'#ghTitleH{color:#d0d0dc;font-size:44px;letter-spacing:14px;font-family:Georgia,serif}'+
'#ghTitleS{color:#5a6a7a;font-size:14px;letter-spacing:3px;font-style:italic;font-family:Georgia,serif}'+
'#ghTitleMan{color:#3a4a5a;font-size:13px;line-height:1.3;font-family:Consolas,monospace;white-space:pre;text-align:center}'+
'#ghTitleWater{color:#2a4a6a;font-size:13px;letter-spacing:2px;font-family:Consolas,monospace}'+
'.ghTBtn{background:none;border:2px solid #44445a;color:#9ab8d8;font-family:Consolas,monospace;font-size:15px;letter-spacing:3px;padding:12px 40px;cursor:pointer;margin-top:6px}'+
'.ghTBtn:hover{border-color:#d0d0dc;color:#fff}';
document.head.appendChild(s);
}
function ghBuild(){
ghCSS();
var ov=document.createElement('div');ov.id='ghOverlay';
ov.innerHTML='<div id="ghNarr"><span class="who">PA: </span><span id="ghNarrText"></span></div>'+
'<div id="ghRoom"><div id="ghRoomTitle"></div><div id="ghRoomDesc"></div><div id="ghDoors"></div><div id="ghObjs"></div></div>'+
'<div id="ghBar"><span id="ghBarL"></span><span id="ghBarR"></span></div>'+
'<div id="ghMenuBtn">‡</div><div id="ghTitle" style="display:none"></div>';
document.body.appendChild(ov);
try{document.getElementById('ghMenuBtn').onclick=function(){try{ghExit()}catch(e){}}}catch(e){}
try{ghTalkIv=setInterval(ghTalkSync,300)}catch(e){}
ghBar();
}

// ── rooms ──
var ghRooms={
landing:{name:'the landing',desc:'a walkway over a chasm that has no bottom visible. six wings branch off. five are sealed. one is chalk-white. the PA crackles.'},
chalk1:{name:'chalk entry',desc:'white tiles, white light, white noise. a medkit glows on a bench like it wants to be stolen. (it does.)'},
chalk2:{name:'chalk armory',desc:'a gun locker, open, empty except one pistol and a note: TAKE IT. the note is unsigned. the note is obj.'},
chalk3:{name:'chalk stores',desc:'crates. one is open: pistol rounds, loose, rolling around. something heavy breathes behind the far door.'},
chalk4:{name:'chalk warden',desc:'a LUMBER blocks the far door. slow. armored. patient. behind it: something card-shaped and white.'},
chalk_save:{name:'chalk station',desc:'a save station. insert a floppy and it remembers you. the PA approves of being remembered.'},
chalk_gate:{name:'moss seal',desc:'a door sealed MOSS. it wants a white keycard. beyond it: construction noise and ambition. (phase 2.)'}
};
function ghDoorsFor(r){
var D=[];
function door(to,label,sub){return {to:to,label:label,sub:sub||''}}
if(ghCombat)return D;
if(r==='landing'){D.push(door('chalk1','CHALK WING','white'))}
else if(r==='chalk1'){D.push(door('landing','BACK','landing'));D.push(door('chalk2','FORWARD','armory'))}
else if(r==='chalk2'){D.push(door('chalk1','BACK','entry'));D.push(door('chalk3','FORWARD','stores'));D.push(door('chalk_save','SIDE','station'))}
else if(r==='chalk3'){D.push(door('chalk2','BACK','armory'));D.push(door('chalk4','FAR DOOR','heavy'))}
else if(r==='chalk4'){D.push(door('chalk3','BACK','stores'));D.push(door('chalk_gate','CARD DOOR','sealed'))}
else if(r==='chalk_save'){D.push(door('chalk2','BACK','armory'))}
else if(r==='chalk_gate'){D.push(door('chalk4','BACK','warden'))}
return D;
}
function ghObjsFor(r){
var O=[];
function obj(id,label){return {id:id,label:label}}
if(!ghDiff){O.push(obj('diff_easy','EASY (soft)'));O.push(obj('diff_hard','HARD (greyhall)'));return O}
if(r==='landing'&&!ghHas('floppy'))O.push(obj('floppy0','a floppy (take it)'));
if(r==='chalk1'&&!ghHas('medkit'))O.push(obj('medkit0','a medkit (take it)'));
if(r==='chalk2'&&ghGuns.indexOf('pistol')===-1)O.push(obj('pistol0','a pistol (take it)'));
if(r==='chalk3'&&!ghRunFlags.ammo3){O.push(obj('ammo3','pistol rounds (take them)'))}
if(r==='chalk4'){
if(!ghRunFlags.lumberDead)O.push(obj('lumber','a LUMBER (deal with it)'));
else if(ghCards.indexOf('white')===-1)O.push(obj('whitekey','a white keycard (take it)'));
}
if(r==='chalk_save')O.push(obj('station','save station (use it)'));
if(r==='chalk_gate')O.push(obj('seal','the moss seal (touch it)'));
if(ghCombat){
O.push(obj('c_head','SHOOT: HEAD (2 dmg, may miss)'));
O.push(obj('c_body','SHOOT: BODY (1 dmg, never misses)'));
if(ghInv.indexOf('medkit')!==-1)O.push(obj('c_med','USE MEDKIT (+50)'));
O.push(obj('c_run','RUN'));
}
return O;
}

// ── render + nav ──
function ghBar(){
try{var el=document.getElementById('ghBarL');if(el)el.textContent='HP '+ghHp+'/'+ghMaxHp+' · '+ghGun.toUpperCase()+' '+(ghAmmo[ghGun]||0)+(ghDiff?' · '+ghDiff:'')}catch(e){}
try{var er=document.getElementById('ghBarR');if(er)er.textContent='deaths '+ghDeaths+' · inv '+ghInv.length+'/9'}catch(e){}
}
function ghRender(){
try{
var R=ghRooms[ghRoom];
var t=document.getElementById('ghRoomTitle');if(t)t.textContent=R?R.name:ghRoom;
var dsc=document.getElementById('ghRoomDesc');
if(dsc){
var d=R?R.desc:'';
if(ghCombat)d+=' LUMBER HP: '+ghCombat.hp+'.';
dsc.textContent=d;
}
var dw=document.getElementById('ghDoors');dw.innerHTML='';
var doors=ghDoorsFor(ghRoom);
for(var i=0;i<doors.length;i++)(function(dr){
var b=document.createElement('div');b.className='ghDoor';b.textContent=dr.label;
b.onclick=function(){try{ghGo(dr.to)}catch(e){}};
dw.appendChild(b);
})(doors[i]);
var ow=document.getElementById('ghObjs');ow.innerHTML='';
var objs=ghObjsFor(ghRoom);
for(var j=0;j<objs.length;j++)(function(ob){
var o=document.createElement('div');o.className='ghObj';o.textContent=ob.label;
o.onclick=function(){try{ghTouch(ob.id)}catch(e){}};
ow.appendChild(o);
})(objs[j]);
}catch(e){}
try{ghBar()}catch(e){}
try{if(ghInvOpen)ghRenderInv()}catch(e){}
}
function ghGo(to){
if(!ghActive)return;
if(ghCombat&&to!==ghRoom)return;
ghClearQ();
ghRoom=to;
try{ghOnArrive(to)}catch(e){}
ghRender();
}
function ghOnArrive(to){
var seen='gh_v_'+to;
var first=false;
try{if(!ghRunFlags[seen]){ghRunFlags[seen]=1;first=true}}catch(e){first=true}
if(!ghDiff){ghSay(['welcome to GREYHALL.','the man stands on the landing. six wings. five sealed. one white.','pick a difficulty. easy is soft. hard is greyhall. (the PA recommends hard. the PA is cruel.)']);return}
if(to==='landing'&&first)ghSay(['the landing. a walkway over nothing.','chalk wing is open. the rest are sealed. (phase 2. ambition. construction noise.)']);
else if(to==='chalk1'&&first)ghSay(['chalk entry. white everything.','take the medkit. take everything. everything here is yours. (everything here is bait.)']);
else if(to==='chalk2'&&first)ghSay(['chalk armory.','one pistol. one note. TAKE IT.','...take it.']);
else if(to==='chalk3'&&first)ghSay(['chalk stores. crates and rounds.','something heavy breathes behind the far door. that is a LUMBER. lumbears. (it lumbers.)']);
else if(to==='chalk4'&&first)ghSay(['chalk warden.','the LUMBER blocks the card door. slow. armored. patient.','shoot the head or shoot the body. running is also a choice. (a bad one.)']);
else if(to==='chalk_save'&&first)ghSay(['chalk station.','insert a floppy: it remembers your HP, your ammo, your sins.','die, and you wake here. (dying elsewhere is still dying.)']);
else if(to==='chalk_gate'&&first)ghSay(['the moss seal.','it wants a white keycard. the moss wing is under construction.','touch it anyway. touching things is free. (touching things is how you die.)']);
}

// ── touches ──
function ghTouch(id){
if(!ghActive)return;
if(id==='diff_easy'||id==='diff_hard'){
ghDiff=(id==='diff_easy')?'easy':'hard';
ghInv.push('floppy');ghPersist();ghRender();
ghSay(ghDiff==='easy'?['easy. soft. the PA is disappointed. (the PA will mock you gently.)']:['HARD. greyhall. the PA approves. (the PA will mock you relentlessly.)','a floppy, for the station. do not waste it. (you will waste it.)']);
return;
}
if(ghCombat){ghCombatTurn(id);return}
if(id==='floppy0'){if(!ghInvFree()){ghSay(['inventory full. 9 slots. drop something. (you cannot drop things. manage better.)']);return}ghInv.push('floppy');ghPersist();ghRender();ghSay(['the man took the floppy.','save stations eat these.']);return}
if(id==='medkit0'){if(!ghInvFree()){ghSay(['inventory full.']);return}ghInv.push('medkit');ghPersist();ghRender();ghSay(['the man took the medkit.','+50 HP when used. (in combat, from the menu of violence.)']);return}
if(id==='pistol0'){ghGuns.push('pistol');ghAmmo.pistol+=6;ghPersist();ghRender();ghSay(['the man took the pistol. 6 rounds.','precise. reliable. the PA respects the pistol. (the PA respects nothing.)']);return}
if(id==='ammo3'){ghRunFlags.ammo3=true;ghAmmo.pistol+=12;ghPersist();ghRender();ghSay(['+12 rounds.','count them. conserve them. (you will not.)']);return}
if(id==='whitekey'){ghCards.push('white');ghInv.push('whitekey');ghPersist();ghRender();ghSay(['the man took the white keycard.','it opens the moss seal. the moss wing is under construction. (the card works anyway. cards do not care.)']);return}
if(id==='lumber'){ghStartCombat();return}
if(id==='station'){
if(ghInv.indexOf('floppy')===-1){ghSay(['the station wants a floppy.','you have no floppy. the station waits. (the station is patient. stations are.)']);return}
ghInv.splice(ghInv.indexOf('floppy'),1);
ghStation={hp:ghHp,ammo:JSON.parse(JSON.stringify(ghAmmo)),guns:ghGuns.slice(),gun:ghGun,inv:ghInv.slice(),cards:ghCards.slice(),moss:ghMossOpen?1:0,plate1:ghPlate1?1:0,room:ghRoom};
ghPersist();ghRender();
ghSay(['floppy inserted.','HP '+ghHp+'. ammo '+ghAmmo.pistol+'. sins: all of them.','remembered. die now, wake here. (do not die. dying is embarrassing.)']);
return;
}
if(id==='seal'){
if(ghCards.indexOf('white')!==-1){if(!ghMossOpen){try{ghOpenSeal()}catch(e){}ghSay(['the moss seal drinks the keycard.','stone grinds. the corridor breathes. MOSS is open.','green wing. puzzles. teeth. (mostly puzzles.)'])}else ghSay(['the moss corridor. open. waiting.'])}
else ghSay(['sealed. MOSS.','it wants a white keycard. the warden past the far door has opinions about that. (the warden IS the opinion.)']);
return;
}
}

// ── combat: LUMBER (slow tank, 6 hp) ──
function ghStartCombat(){
if(ghGuns.indexOf('pistol')===-1){ghSay(['no gun. the LUMBER notices.','the LUMBER always notices. (come back armed.)']);return}
if(ghAmmo.pistol<=0){ghSay(['no rounds. the pistol clicks.','the LUMBER finds this funny. (the LUMBER is laughing. run.)']);return}
ghCombat={hp:6};
ghRender();
ghSay(['a LUMBER. 6 HP. slow. armored. patient.','HEAD: 2 damage, 25% miss. BODY: 1 damage, always lands.','it hits back: '+(ghDiff==='hard'?'20':'12')+'. choose.']);
}
function ghCombatTurn(id){
if(!ghCombat)return;
if(id==='c_run'){ghCombat=null;ghRender();ghSay(['the man ran.','the LUMBER did not chase. lumbears. (it respects the cardio.)']);return}
if(id==='c_med'){
var mi=ghInv.indexOf('medkit');
if(mi===-1){ghSay(['no medkit.']);return}
ghInv.splice(mi,1);
ghHp=Math.min(ghMaxHp,ghHp+50);ghPersist();
ghLumberHit();
if(ghHp<=0){ghDie();return}
ghRender();
ghSay(['+50. the LUMBER watched.','the LUMBER does not approve of healthcare.']);
return;
}
if(id!=='c_head'&&id!=='c_body')return;
if(ghAmmo.pistol<=0){ghSay(['click. no rounds.','the LUMBER smiles. (it has no mouth. it smiles anyway.)']);return}
ghAmmo.pistol--;
var dmg=0,miss=false;
if(id==='c_head'){if(Math.random()<0.25)miss=true;else dmg=2}
else dmg=1;
if(miss){ghPersist();ghLumberHit();if(ghHp<=0){ghDie();return}ghRender();ghSay(['missed. the head is small. the LUMBER is large.','math.']);return}
ghCombat.hp-=dmg;
if(ghCombat.hp<=0){
ghCombat=null;ghRunFlags.lumberDead=true;ghAmmo.pistol+=6;ghPersist();ghRender();
ghSay(['the LUMBER falls. slowly. like everything it does.','+6 rounds from its pockets. (it had pockets. it had rounds. it had a white keycard behind it.)','take the card. open moss. (phase 2. ambition.)']);
return;
}
ghLumberHit();
if(ghHp<=0){ghDie();return}
ghPersist();ghRender();
ghSay(['hit. LUMBER HP: '+ghCombat.hp+'.','it lumbers closer.']);
}
function ghLumberHit(){
var d=ghDiff==='hard'?20:12;
ghHp-=d;
}
var ghDeathLines=[
'death %N. the floor sends its regards.',
'death %N. the PA saw nothing. (the PA saw everything.)',
'death %N. lumbears 1, man 0.',
'death %N. shall we try aiming this time.',
'death %N. the floppy remembers you better than you remember yourself.'
];
function ghDie(){
ghCombat=null;
ghDeaths++;
var line=ghDeathLines[ghDeaths%ghDeathLines.length].replace('%N',ghDeaths);
if(ghStation){
ghHp=ghStation.hp;ghAmmo=JSON.parse(JSON.stringify(ghStation.ammo));ghGuns=ghStation.guns.slice();ghInv=ghStation.inv.slice();ghCards=ghStation.cards.slice();ghRoom=ghStation.room||'landing';
}else{
ghHp=ghMaxHp;ghRoom='landing';
}
ghPersist();ghRender();
ghSay([line,'wake up at the station. (or the landing. stations are earned.)']);
}

// ── title screen (haydee-simple: the man, water, music) ──
var ghBgmPrev=null;
function ghBgmTitle(){
try{
if(typeof bgm!=='undefined'&&bgm){
if(!ghBgmPrev)ghBgmPrev={src:bgm.src||'',loop:bgm.loop,vol:bgm.volume,playing:!bgm.paused};
try{bgm.pause()}catch(e){}
try{bgm.loop=true;bgm.volume=0.28;bgm.src='drone2lp.wav';var p=bgm.play();if(p&&p.catch)p.catch(function(){})}catch(e){}
}
}catch(e){}
}
function ghBgmRestore(){
try{
if(typeof bgm!=='undefined'&&bgm&&ghBgmPrev){
try{bgm.pause()}catch(e){}
try{
if(ghBgmPrev.src)bgm.src=ghBgmPrev.src;
bgm.loop=!!ghBgmPrev.loop;bgm.volume=ghBgmPrev.vol;
if(ghBgmPrev.playing){var p=bgm.play();if(p&&p.catch)p.catch(function(){})}
}catch(e){}
ghBgmPrev=null;
}
}catch(e){}
}
function ghTitle(){
try{
var t=document.getElementById('ghTitle');
if(!t)return;
if(!ghDiff)ghDiff='easy';
t.style.display='flex';
t.innerHTML='';
var h=document.createElement('div');h.id='ghTitleH';h.textContent='GREYHALL';t.appendChild(h);
var s=document.createElement('div');s.id='ghTitleS';s.textContent='the man descends. (deaths so far: '+ghDeaths+')';t.appendChild(s);
var d=document.createElement('button');d.className='ghTBtn';d.id='ghTitleDiff';d.textContent='DIFFICULTY: '+ghDiff.toUpperCase();
d.onclick=function(){ghDiff=(ghDiff==='easy')?'hard':'easy';ghPersist();try{document.getElementById('ghTitleDiff').textContent='DIFFICULTY: '+ghDiff.toUpperCase()}catch(e){}};
t.appendChild(d);
var e=document.createElement('button');e.className='ghTBtn';e.textContent='ENTER';
e.onclick=function(){try{ghTitleStart()}catch(err){}};
t.appendChild(e);
}catch(e){}
}
function ghTitleStart(){
ghOnTitle=false;
try{var nt=document.getElementById('ghNarrText');if(nt)nt.textContent='( PA offline. )'}catch(e){}
try{
var t=document.getElementById('ghTitle');
if(t)t.style.display='none';
}catch(e){}
ghPersist();
try{
if(!ghThings.length)ghThingsInit();
try{ghApplyOpened()}catch(e){}
// sync taken with persisted state
try{
for(var si=0;si<ghThings.length;si++){var st=ghThings[si];
if(st.id==='floppy'&&ghHas('floppy'))st.taken=true;
if(st.id==='medkit'&&ghHas('medkit'))st.taken=true;
if(st.id==='pistol'&&ghGuns.indexOf('pistol')!==-1)st.taken=true;
if(st.id==='ammo'&&ghRunFlags.ammo3)st.taken=true;
if(st.id==='whitekey'&&ghCards.indexOf('white')!==-1)st.taken=true;
if(st.id==='visor'&&ghHas('visor'))st.taken=true;
if(st.id==='magnum'&&ghGuns.indexOf('magnum')!==-1)st.taken=true;
if(st.id==='magammo'&&ghRunFlags.magammo)st.taken=true;
if(st.id==='medkit2'&&ghRunFlags.medkit2)st.taken=true;
if(st.id==='greenkey'&&ghCards.indexOf('green')!==-1)st.taken=true;
}
}catch(e){}
if(ghRunFlags.lumberDead){ghLumber.alive=false}
gh3DShow();
}catch(e){}
ghRender();
if(!ghRunFlags.ghGreeted){
ghRunFlags.ghGreeted=true;
if(ghDiff==='hard')ghSay(['GREYHALL. hard.','the PA approves. (the PA will mock you relentlessly.)']);
else ghSay(['GREYHALL. easy.','the PA is disappointed. (the PA will mock you gently.)']);
}else{
ghSay(['GREYHALL. the landing.','HP '+ghHp+'. deaths: '+ghDeaths+'. (the PA counted. the PA always counts.)']);
}
}
// ── enter / exit ──
function ghEnter(){
ghLoad();
try{
var ov=document.getElementById('ghOverlay');
if(!ov){ghBuild();ov=document.getElementById('ghOverlay')}
if(!ov)return;
ghStashUI();
ov.style.display='flex';
}catch(e){return}
ghActive=true;
ghRunFlags={};
try{ghTalkIv=setInterval(ghTalkSync,300)}catch(e){}
try{ghBgmTitle()}catch(e){}
ghOnTitle=true;
try{
if(!ghThings.length)ghThingsInit();
gh3DShow();
}catch(e){}
try{ghTitle()}catch(e){}
}
function ghExit(){
ghActive=false;
ghLoopOn=false;
try{ghClearQ()}catch(e){}
try{if(ghTalkIv){clearInterval(ghTalkIv);ghTalkIv=null}}catch(e){}
try{ghBgmRestore()}catch(e){}
try{
var ov=document.getElementById('ghOverlay');
if(ov)ov.style.display='none';
var t=document.getElementById('ghTitle');
if(t)t.style.display='none';
}catch(e){}
try{ghRestoreUI()}catch(e){}
}
function ghStashUI(){
try{
var keep=document.getElementById('ghOverlay');
var stash=document.getElementById('ghStash');
if(!stash){stash=document.createElement('div');stash.id='ghStash';stash.style.display='none';document.body.appendChild(stash)}
var nodes=[];
for(var i=0;i<document.body.childNodes.length;i++)nodes.push(document.body.childNodes[i]);
for(var j=0;j<nodes.length;j++){if(nodes[j]!==keep&&nodes[j]!==stash)stash.appendChild(nodes[j])}
}catch(e){}
}
function ghRestoreUI(){
try{
var keep=document.getElementById('ghOverlay');
var stash=document.getElementById('ghStash');
if(!stash)return;
while(stash.firstChild)document.body.insertBefore(stash.firstChild,keep);
}catch(e){}
}
window.ghEnter=ghEnter;
window.ghExit=ghExit;
window.ghDbg=function(){try{return {x:Math.round(ghP.x*10)/10,z:Math.round(ghP.z*10)/10,hp:ghHp,ammo:ghAmmo.pistol,guns:ghGuns.slice(),inv:ghInv.slice(),cards:ghCards.slice(),lumber:ghLumber.hp,lumberAlive:ghLumber.alive,mode3d:ghMode3d,gl:!!ghGL,deaths:ghDeaths}}catch(e){return {err:String(e)}}};
window.ghDbg2=function(){try{return {frame:ghFrame,keysW:!!ghKeys['w'],keysSp:!!ghKeys[' ']}}catch(e){return {err:String(e)}}};
window.ghAim=function(v){try{ghAiming=!!v;return ghAiming}catch(e){return false}};
window.ghDbg3=function(){try{return {y:Math.round((ghP.y||0)*100)/100,cam:[Math.round(ghCamPos[0]*10)/10,Math.round(ghCamPos[2]*10)/10],prompt:document.getElementById('ghPrompt').textContent,narr:document.getElementById('ghNarrText').textContent}}catch(e){return {err:String(e)}}};
window.ghStep=function(n){try{n=n||1;for(var i=0;i<n;i++)ghTick3D(1/60);return ghFrame}catch(e){return -1}};
window.ghWarp=function(x,z,yaw){try{ghP.x=x;ghP.z=z;if(typeof yaw==='number')ghP.yaw=yaw;return true}catch(e){return false}};

// ══ 3D PASS: hand-rolled webgl, void-style ══
var ghMode3d=true;
var ghGL=null,ghProg=null,ghBoxBuf=null,ghBoxIdx=null;
var ghKeys={};
var ghP={x:5,z:3,yaw:-Math.PI/2};
var ghCam={d:3.8,h:2.3};
var ghPitch=0;
var ghAiming=false;
var ghFov=1.05;
var ghShootCd=0;
var ghCamPos=[0,0,0];
var ghLoopOn=false;
// mat4 minimal (column-major Float32Array(16))
function ghM4(){return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}
function ghMMul(a,b){var o=ghM4();for(var c=0;c<4;c++)for(var r=0;r<4;r++){var s=0;for(var k=0;k<4;k++)s+=a[k*4+r]*b[c*4+k];o[c*4+r]=s}return o}
function ghPersp(fov,asp,n,f){var o=ghM4(),t=1/Math.tan(fov/2);o[0]=t/asp;o[5]=t;o[10]=(f+n)/(n-f);o[11]=-1;o[14]=2*f*n/(n-f);o[15]=0;return o}
function ghLook(eye,c,up){
var zx=eye[0]-c[0],zy=eye[1]-c[1],zz=eye[2]-c[2];
var l=Math.sqrt(zx*zx+zy*zy+zz*zz);zx/=l;zy/=l;zz/=l;
var xx=up[1]*zz-up[2]*zy,xy=up[2]*zx-up[0]*zz,xz=up[0]*zy-up[1]*zx;
l=Math.sqrt(xx*xx+xy*xy+xz*xz);xx/=l;xy/=l;xz/=l;
var yx=zy*xz-zz*xy,yy=zz*xx-zx*xz,yz=zx*xy-zy*xx;
var o=ghM4();
o[0]=xx;o[1]=yx;o[2]=zx;o[4]=xy;o[5]=yy;o[6]=zy;o[8]=xz;o[9]=yz;o[10]=zz;
o[12]=-(xx*eye[0]+xy*eye[1]+xz*eye[2]);o[13]=-(yx*eye[0]+yy*eye[1]+yz*eye[2]);o[14]=-(zx*eye[0]+zy*eye[1]+zz*eye[2]);
return o;
}
function ghModel(x,y,z,w,h,d,yaw){
var o=ghM4(),c=Math.cos(yaw||0),s=Math.sin(yaw||0);
o[0]=c*w;o[1]=0;o[2]=-s*w;o[4]=0;o[5]=h;o[6]=0;o[8]=s*d;o[9]=0;o[10]=c*d;
o[12]=x;o[13]=y;o[14]=z;
return o;
}
var ghVS='attribute vec3 aP,aN;attribute vec3 aC;attribute vec2 aU;uniform mat4 uM;uniform float uUV;varying vec3 vC,vN;varying vec2 vU;void main(){vC=aC;vN=aN;vU=aU*uUV;gl_Position=uM*vec4(aP,1.0);}';
var ghFS='precision mediump float;varying vec3 vC,vN;varying vec2 vU;uniform sampler2D uT;void main(){vec3 n=normalize(vN);float li=0.45+0.55*max(dot(n,normalize(vec3(0.4,0.8,0.5))),0.0);vec3 tx=texture2D(uT,vU).rgb;gl_FragColor=vec4(vC*tx*li,1.0);}';
function ghGLInit(){
try{
var cv=document.getElementById('ghCanvas');
if(!cv)return false;
var gl=cv.getContext('webgl',{antialias:true,alpha:false});
if(!gl)return false;
ghGL=gl;
function sh(t,s){var o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);return o}
var p=gl.createProgram();
gl.attachShader(p,sh(gl.VERTEX_SHADER,ghVS));gl.attachShader(p,sh(gl.FRAGMENT_SHADER,ghFS));
gl.linkProgram(p);gl.useProgram(p);
ghProg=p;
ghProg.uM=gl.getUniformLocation(p,'uM');
ghProg.uUV=gl.getUniformLocation(p,'uUV');
ghProg.uT=gl.getUniformLocation(p,'uT');
ghProg.aP=gl.getAttribLocation(p,'aP');
ghProg.aN=gl.getAttribLocation(p,'aN');
ghProg.aC=gl.getAttribLocation(p,'aC');
// unit box: 24 verts (pos+normal), 36 idx
var P=[-0.5,-0.5,-0.5, 0.5,-0.5,-0.5, 0.5,0.5,-0.5, -0.5,0.5,-0.5, -0.5,-0.5,0.5, 0.5,-0.5,0.5, 0.5,0.5,0.5, -0.5,0.5,0.5];
var F=[[0,1,2,3,0,0,-1],[4,5,6,7,0,0,1],[0,1,5,4,0,-1,0],[2,3,7,6,0,1,0],[0,3,7,4,-1,0,0],[1,2,6,5,1,0,0]];
var vp=[],vn=[],ix=[],vu=[];
for(var f=0;f<6;f++){var b=f*4;var q=F[f];var qu=[[0,0],[1,0],[1,1],[0,1]];for(var k=0;k<4;k++){vp.push(P[(q[k])*3],P[(q[k])*3+1],P[(q[k])*3+2]);vn.push(q[4],q[5],q[6]);vu.push(qu[k][0],qu[k][1])}ix.push(b,b+1,b+2,b,b+2,b+3)}
ghBoxBuf={p:vp,n:vn};
var pb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,pb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vp),gl.STATIC_DRAW);
var nb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,nb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vn),gl.STATIC_DRAW);
var ib=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ib);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(ix),gl.STATIC_DRAW);
ghBoxBuf.pb=pb;ghBoxBuf.nb=nb;ghBoxBuf.ib=ib;
var ub=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,ub);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vu),gl.STATIC_DRAW);
ghBoxBuf.ub=ub;
ghProg.aU=gl.getAttribLocation(p,'aU');
// procedural textures (no assets)
function ghMkTex(fn){
var c=document.createElement('canvas');c.width=c.height=128;
var g=c.getContext('2d');fn(g,128);
var t=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,t);
gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,c);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.REPEAT);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.REPEAT);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
gl.generateMipmap(gl.TEXTURE_2D);
return t;
}
function ghNoise(g,s,n,a){g.fillStyle=a;for(var i=0;i<n;i++){g.fillRect(Math.floor(Math.random()*s),Math.floor(Math.random()*s),2,2)}}
ghTexPlain=ghMkTex(function(g,s){g.fillStyle='#ffffff';g.fillRect(0,0,s,s)});
ghTexTile=ghMkTex(function(g,s){g.fillStyle='#e8e8ea';g.fillRect(0,0,s,s);g.strokeStyle='#9a9aa0';g.lineWidth=3;for(var i=0;i<=2;i++){g.beginPath();g.moveTo(i*64,0);g.lineTo(i*64,s);g.stroke();g.beginPath();g.moveTo(0,i*64);g.lineTo(s,i*64);g.stroke()}ghNoise(g,s,40,'rgba(120,120,130,0.25)')});
ghTexPanel=ghMkTex(function(g,s){g.fillStyle='#c9c9cf';g.fillRect(0,0,s,s);g.strokeStyle='#7a7a82';g.lineWidth=2;g.strokeRect(4,4,s-8,s-8);g.beginPath();g.moveTo(0,s/2);g.lineTo(s,s/2);g.stroke();g.fillStyle='#5a5a62';g.beginPath();g.arc(12,12,3,0,7);g.fill();g.beginPath();g.arc(s-12,12,3,0,7);g.fill();g.beginPath();g.arc(12,s-12,3,0,7);g.fill();g.beginPath();g.arc(s-12,s-12,3,0,7);g.fill();ghNoise(g,s,50,'rgba(90,90,100,0.2)')});
ghTexDark=ghMkTex(function(g,s){g.fillStyle='#232327';g.fillRect(0,0,s,s);ghNoise(g,s,120,'rgba(0,0,0,0.5)');ghNoise(g,s,30,'rgba(120,40,40,0.25)')});
ghTexArmor=ghMkTex(function(g,s){g.fillStyle='#5a7395';g.fillRect(0,0,s,s);g.fillStyle='#48607f';for(var y=0;y<4;y++)for(var x=0;x<4;x++){if((x+y)%2===0)g.fillRect(x*32,y*32,32,32)}g.strokeStyle='#2c3c50';g.lineWidth=2;for(var i=0;i<=4;i++){g.beginPath();g.moveTo(i*32,0);g.lineTo(i*32,s);g.stroke();g.beginPath();g.moveTo(0,i*32);g.lineTo(s,i*32);g.stroke()}});
ghTexFloorD=ghMkTex(function(g,s){g.fillStyle='#26262c';g.fillRect(0,0,s,s);g.strokeStyle='#3a3a44';g.lineWidth=2;for(var i=0;i<=2;i++){g.beginPath();g.moveTo(i*64,0);g.lineTo(i*64,s);g.stroke();g.beginPath();g.moveTo(0,i*64);g.lineTo(s,i*64);g.stroke()}g.fillStyle='#8a7320';g.fillRect(0,s-10,s,10)});
gl.enable(gl.DEPTH_TEST);
gl.clearColor(0.03,0.03,0.05,1);
return true;
}catch(e){return false}
}
var ghWhite=[0.82,0.82,0.84];
var ghTexPlain=null,ghTexTile=null,ghTexPanel=null,ghTexDark=null,ghTexArmor=null,ghTexFloorD=null;
function ghBox(x,y,z,w,h,d,c,yaw,tex,uv){
try{
var gl=ghGL;if(!gl||!ghProg)return;
var m=ghModel(x,y,z,w,h,d,yaw||0);
var proj=ghProjCache,view=ghViewCache;
if(!proj||!view)return;
gl.uniformMatrix4fv(ghProg.uM,false,ghMMul(proj,ghMMul(view,m)));
gl.uniform1f(ghProg.uUV,(typeof uv==='number'&&uv>0)?uv:1);
gl.activeTexture(gl.TEXTURE0);
gl.bindTexture(gl.TEXTURE_2D,tex||ghTexPlain);
gl.uniform1i(ghProg.uT,0);
gl.bindBuffer(gl.ARRAY_BUFFER,ghBoxBuf.pb);
gl.enableVertexAttribArray(ghProg.aP);
gl.vertexAttribPointer(ghProg.aP,3,gl.FLOAT,false,0,0);
gl.bindBuffer(gl.ARRAY_BUFFER,ghBoxBuf.nb);
gl.enableVertexAttribArray(ghProg.aN);
gl.vertexAttribPointer(ghProg.aN,3,gl.FLOAT,false,0,0);
gl.bindBuffer(gl.ARRAY_BUFFER,ghBoxBuf.ub);
gl.enableVertexAttribArray(ghProg.aU);
gl.vertexAttribPointer(ghProg.aU,2,gl.FLOAT,false,0,0);
gl.disableVertexAttribArray(ghProg.aC);
// per-box color tint via constant attrib
gl.vertexAttrib3f(ghProg.aC,c[0],c[1],c[2]);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ghBoxBuf.ib);
gl.drawElements(gl.TRIANGLES,36,gl.UNSIGNED_SHORT,0);
}catch(e){}
}
var ghProjCache=null,ghViewCache=null;
function ghResize(){
try{
var cv=document.getElementById('ghCanvas');if(!cv||!ghGL)return;
var r=cv.getBoundingClientRect();
var w=Math.max(2,Math.floor(r.width)),h=Math.max(2,Math.floor(r.height));
if(cv.width!==w||cv.height!==h){cv.width=w;cv.height=h}
ghGL.viewport(0,0,cv.width,cv.height);
ghProjCache=ghPersp(ghFov,cv.width/cv.height,0.1,200);
}catch(e){}
}
// input
if(typeof document!=='undefined'){
document.addEventListener('keydown',function(e){
try{
if(!ghActive||!ghMode3d)return;
var tag=(e.target&&e.target.tagName)||'';
if(tag==='INPUT'||tag==='TEXTAREA')return;
ghKeys[e.key.toLowerCase()]=true;
if(e.key==='Tab'){try{e.preventDefault()}catch(err){}try{ghInvOpen=!ghInvOpen;ghRenderInv()}catch(err){}}
if(['arrowup','arrowdown','arrowleft','arrowright',' '].indexOf(e.key.toLowerCase())!==-1)e.preventDefault();
}catch(err){}
});
document.addEventListener('keyup',function(e){try{var k=e.key.toLowerCase();ghKeys[k]=false;if(k==='f')ghPrevF=false;if(k===' ')ghPrevSp=false}catch(err){}});
document.addEventListener('mousedown',function(e){
try{
if(!ghActive||!ghMode3d||ghOnTitle)return;
var cv=document.getElementById('ghCanvas');
if(!cv||document.pointerLockElement!==cv)return;
if(e.button===2&&!ghAiming){ghAiming=true;ghFov=0.7;try{ghResize()}catch(err){}}
if(e.button===0){try{ghShoot()}catch(err){}}
}catch(err){}
});
document.addEventListener('mouseup',function(e){
try{
if(e.button===2&&ghAiming){ghAiming=false;ghFov=1.05;try{ghResize()}catch(err){}}
}catch(err){}
});
document.addEventListener('contextmenu',function(e){
try{
var cv=document.getElementById('ghCanvas');
if(cv&&document.pointerLockElement===cv)e.preventDefault();
}catch(err){}
});
document.addEventListener('mousemove',function(e){
try{
if(!ghActive||!ghMode3d||ghOnTitle)return;
var cv=document.getElementById('ghCanvas');
if(!cv||document.pointerLockElement!==cv)return;
ghP.yaw-=(e.movementX||0)*0.0026;
ghPitch-=(e.movementY||0)*0.0022;
if(ghPitch<-0.35)ghPitch=-0.35;
if(ghPitch>0.45)ghPitch=0.45;
}catch(err){}});
}
// level: walk rects {x0,z0,x1,z1} + walls {x,z,w,d} + color
var ghLevel={
rects:[
{x0:0,z0:0,x1:10,z1:6},{x0:10,z0:0,x1:20,z1:6},{x0:20,z0:0,x1:30,z1:6},
{x0:20,z0:-6,x1:26,z1:0},{x0:30,z0:0,x1:40,z1:6},{x0:40,z0:0,x1:52,z1:6},
// ── MOSS (phase 2) ──
{x0:52,z0:2,x1:58,z1:4},
{x0:58,z0:0,x1:68,z1:6},
{x0:68,z0:0,x1:78,z1:6},
{x0:78,z0:0,x1:86,z1:6},
{x0:68,z0:6,x1:78,z1:11}
],
walls:[
[5,-0.3,10.6,0.6],[5,6.3,10.6,0.6],[-0.3,3,0.6,6.6],
[15,-0.3,10.6,0.6],[15,6.3,10.6,0.6],
[25,-0.3,10.6,0.6],[25,6.3,10.6,0.6],
[23,-6.3,6.6,0.6],[19.7,-3,0.6,6.6],[26.3,-3,0.6,6.6],
[35,-0.3,10.6,0.6],[35,6.3,10.6,0.6],
[46,-0.3,12.6,0.6],[46,6.3,12.6,0.6],[52.3,3,0.6,6.6],
[10,1.2,0.6,2.4],[10,4.8,0.6,2.4],
[20,1.2,0.6,2.4],[20,4.8,0.6,2.4],
[23,0,2,0.6],[24,0,2,0.6],
[30,1.2,0.6,2.4],[30,4.8,0.6,2.4],
[40,1.2,0.6,2.4],[40,4.8,0.6,2.4],
// corridor + moss
[55,1.7,6.6,0.6],[55,4.3,6.6,0.6],
[63,-0.3,10.6,0.6],[63,6.3,10.6,0.6],
[57.7,1,0.6,2],[57.7,5,0.6,2],
[68.3,1,0.6,2],[68.3,5,0.6,2],
[73,-0.3,10.6,0.6],
[69.5,6.3,3.6,0.6],[76,6.3,4.6,0.6],
[78.3,1,0.6,2],[78.3,5,0.6,2],
[82,-0.3,8.6,0.6],[82,6.3,8.6,0.6],[86.3,3,0.6,6.6],
[73,11.3,10.6,0.6],[67.7,8.5,0.6,5.6],[78.3,8.5,0.6,5.6],
// moss gate (plate1 opens; zeroed at runtime)
[72.5,6.3,3.4,0.6]
],
floorC:[0.16,0.16,0.19],wallC:[0.75,0.75,0.78],chalkC:[0.85,0.85,0.88],mossC:[0.45,0.62,0.4]
};
var ghDarkRect={x0:78,z0:0,x1:86,z1:6};
function ghOpenSeal(){
ghMossOpen=true;ghPersist();
for(var j=0;j<ghLevel.walls.length;j++){var W=ghLevel.walls[j];
if(Math.abs(W[0]-52.3)<0.01&&Math.abs(W[1]-3)<0.01){W[2]=0;W[3]=0}}
}
function ghOpenGate(){
ghPlate1=true;ghPersist();
for(var j=0;j<ghLevel.walls.length;j++){var W=ghLevel.walls[j];
if(Math.abs(W[0]-72.5)<0.01&&Math.abs(W[1]-6.3)<0.01){W[2]=0;W[3]=0}}
}
function ghApplyOpened(){
if(ghMossOpen)for(var a=0;a<ghLevel.walls.length;a++){var A=ghLevel.walls[a];if(Math.abs(A[0]-52.3)<0.01&&Math.abs(A[1]-3)<0.01){A[2]=0;A[3]=0}}
if(ghPlate1)for(var b=0;b<ghLevel.walls.length;b++){var B=ghLevel.walls[b];if(Math.abs(B[0]-72.5)<0.01&&Math.abs(B[1]-6.3)<0.01){B[2]=0;B[3]=0}}
}
function ghWalkOK(x,z,r){
for(var i=0;i<ghLevel.rects.length;i++){var R=ghLevel.rects[i];
if(x+r>R.x0&&x-r<R.x1&&z+r>R.z0&&z-r<R.z1)return true}
return false;
}
function ghWallPush(){
for(var j=0;j<ghLevel.walls.length;j++){var W=ghLevel.walls[j];
if(W[2]<=0||W[3]<=0)continue;
var x0=W[0]-W[2]/2-0.4,x1=W[0]+W[2]/2+0.4;
var z0=W[1]-W[3]/2-0.4,z1=W[1]+W[3]/2+0.4;
if(ghP.x>x0&&ghP.x<x1&&ghP.z>z0&&ghP.z<z1){
var dxl=ghP.x-x0,dxr=x1-ghP.x,dzl=ghP.z-z0,dzr=z1-ghP.z;
var m=Math.min(dxl,dxr,dzl,dzr);
if(m===dxl)ghP.x=x0;else if(m===dxr)ghP.x=x1;else if(m===dzl)ghP.z=z0;else ghP.z=z1;
}
}
}
function ghMovePlayer(dt){
var sp=(ghKeys['shift']?4.5:3.0)*dt;
var fx=Math.sin(ghP.yaw),fz=Math.cos(ghP.yaw);
var mx=0,mz=0;
if(ghKeys['w']||ghKeys['arrowup']){mx+=fx;mz+=fz}
if(ghKeys['s']||ghKeys['arrowdown']){mx-=fx;mz-=fz}
if(ghKeys['a']||ghKeys['arrowleft']){
var lx=Math.sin(ghP.yaw+Math.PI/2),lz=Math.cos(ghP.yaw+Math.PI/2);mx+=lx;mz+=lz;
}
if(ghKeys['d']||ghKeys['arrowright']){
var rx=Math.sin(ghP.yaw-Math.PI/2),rz=Math.cos(ghP.yaw-Math.PI/2);mx+=rx;mz+=rz;
}
if(ghKeys['q'])ghP.yaw+=2.4*dt;
if(ghKeys['e'])ghP.yaw-=2.4*dt;
var l=Math.sqrt(mx*mx+mz*mz);
if(l>0.01){
mx=mx/l*sp;mz=mz/l*sp;
var nx=ghP.x+mx,nz=ghP.z+mz;
if(ghWalkOK(nx,ghP.z,0.4))ghP.x=nx;
if(ghWalkOK(ghP.x,nz,0.4))ghP.z=nz;
try{ghWallPush()}catch(e){}
}
}
function ghDrawWorld(){var gl=ghGL;if(!gl)return;
gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
// floors
for(var i=0;i<ghLevel.rects.length;i++){var R=ghLevel.rects[i];
var fc=i===0?ghLevel.floorC:((i>=7)?ghLevel.mossC:ghLevel.chalkC);
var ft=i===0?ghTexFloorD:ghTexTile;
ghBox((R.x0+R.x1)/2,-0.25,(R.z0+R.z1)/2,R.x1-R.x0,0.5,R.z1-R.z0,fc,0,ft,Math.max(R.x1-R.x0,R.z1-R.z0)/2)}
// ceilings (roof slabs, one per room)
for(var ci=0;ci<ghLevel.rects.length;ci++){var CR=ghLevel.rects[ci];
ghBox((CR.x0+CR.x1)/2,3.3,(CR.z0+CR.z1)/2,CR.x1-CR.x0,0.5,CR.z1-CR.z0,[0.1,0.1,0.13],0,ghTexDark,4)}
// walls
for(var j=0;j<ghLevel.walls.length;j++){var W=ghLevel.walls[j];
ghBox(W[0],1.5,W[1],W[2],3,W[3],ghLevel.wallC,0,ghTexPanel,Math.max(W[2],W[3])/2)}
// player: legs, torso, arms, head, visor, gun. bobs when moving.
var px=ghP.x,pz=ghP.z;
var dx=Math.sin(ghP.yaw),dz=Math.cos(ghP.yaw);
var px2=-dz,pz2=dx;
var moving=(ghKeys['w']||ghKeys['s']||ghKeys['a']||ghKeys['d']||ghKeys['arrowup']||ghKeys['arrowdown']||ghKeys['arrowleft']||ghKeys['arrowright'])?1:0;
var bob=(moving?Math.sin(Date.now()/90)*0.06:0)+(ghP.y||0);
var sw=moving?Math.sin(Date.now()/90)*0.12:0;
// legs
ghBox(px+px2*0.18,0.25+bob*0.5+sw*0.3,pz+pz2*0.18,0.22,0.5,0.22,[0.25,0.3,0.4],ghP.yaw,ghTexArmor,1);
ghBox(px-px2*0.18,0.25+bob*0.5-sw*0.3,pz-pz2*0.18,0.22,0.5,0.22,[0.25,0.3,0.4],ghP.yaw,ghTexArmor,1);
// torso
ghBox(px,0.85+bob,pz,0.7,0.9,0.45,[0.35,0.5,0.7],ghP.yaw,ghTexArmor,1);
// chest plate
ghBox(px+dx*0.2,0.9+bob,pz+dz*0.2,0.4,0.5,0.1,[0.5,0.65,0.85],ghP.yaw,ghTexArmor,1);
// backpack
ghBox(px-dx*0.35,0.95+bob,pz-dz*0.35,0.4,0.6,0.25,[0.28,0.36,0.5],ghP.yaw,ghTexArmor,1);
// shoulder pads
ghBox(px+px2*0.48,1.25+bob,pz+pz2*0.48,0.28,0.2,0.28,[0.55,0.7,0.9],ghP.yaw,ghTexArmor,1);
ghBox(px-px2*0.48,1.25+bob,pz-pz2*0.48,0.28,0.2,0.28,[0.55,0.7,0.9],ghP.yaw,ghTexArmor,1);
// boots
ghBox(px+px2*0.18,0.08,pz+pz2*0.18,0.26,0.16,0.3,[0.15,0.15,0.18],ghP.yaw,ghTexDark,1);
ghBox(px-px2*0.18,0.08,pz-pz2*0.18,0.26,0.16,0.3,[0.15,0.15,0.18],ghP.yaw,ghTexDark,1);
// arms
ghBox(px+px2*0.48,0.85+bob-sw*0.4,pz+pz2*0.48,0.2,0.7,0.2,[0.3,0.42,0.6],ghP.yaw,ghTexArmor,1);
ghBox(px-px2*0.48,0.85+bob+sw*0.4,pz-pz2*0.48,0.2,0.7,0.2,[0.3,0.42,0.6],ghP.yaw,ghTexArmor,1);
// head + visor
ghBox(px+dx*0.05,1.62+bob,pz+dz*0.05,0.42,0.4,0.42,[0.8,0.75,0.65],ghP.yaw,ghTexPlain,1);
ghBox(px+dx*0.26,1.64+bob,pz+dz*0.26,0.28,0.1,0.08,[0.2,0.9,1],ghP.yaw,ghTexDark,1);
// gun
ghBox(px+dx*0.55-px2*0.3,0.95+bob,pz+dz*0.55-pz2*0.3,0.55,0.14,0.14,[0.18,0.18,0.22],ghP.yaw,ghTexDark,1);
}
var ghOnTitle=true;
function ghDrawTitle(){
var gl=ghGL;if(!gl)return;
gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
var t=Date.now()/1000;
var a=t*0.25;
var ex=Math.sin(a)*4.5,ez=Math.cos(a)*4.5;
ghViewCache=ghLook([ex,2.1,ez],[0,1.1,0],[0,1,0]);
// water
ghBox(0,-0.4,0,30,0.4,30,[0.05,0.12,0.2],0,ghTexDark,10);
// shimmer strips
var sh=(t*0.7)%3;
ghBox(-6+sh,0.05,2,3,0.06,0.25,[0.15,0.35,0.55],0,ghTexPlain,1);
ghBox(5-sh,0.05,-1.5,2.5,0.06,0.25,[0.15,0.35,0.55],0,ghTexPlain,1);
// the man, standing
ghBox(0,0.7,0,0.7,1.4,0.7,[0.35,0.5,0.7],Math.PI,ghTexArmor,1);
ghBox(0,1.7,0,0.45,0.45,0.45,[0.8,0.75,0.65],Math.PI,ghTexPlain,1);
ghBox(0,1.72,-0.24,0.3,0.1,0.1,[0.2,0.9,1],Math.PI,ghTexDark,1);
}
function ghCamHit(x,z){
for(var j=0;j<ghLevel.walls.length;j++){var W=ghLevel.walls[j];
if(W[2]<=0||W[3]<=0)continue;
if(x>W[0]-W[2]/2-0.35&&x<W[0]+W[2]/2+0.35&&z>W[1]-W[3]/2-0.35&&z<W[1]+W[3]/2+0.35)return true}
return false;
}
function ghCamSpot(px,pz,dx,dz){
var best=0.2,hit=false;
for(var k=2;k<=10;k++){var t=k/10;
var x=px-dx*ghCam.d*t,z=pz-dz*ghCam.d*t;
if(ghCamHit(x,z)){hit=true;break}
best=t;
}
var bd=hit?ghCam.d*Math.max(0.15,best-0.08):ghCam.d;
return [px-dx*bd,pz-dz*bd];
}
window.ghCamSpotFn=ghCamSpot;
window.ghCamHitFn=ghCamHit;
function ghLoop(){
if(!ghLoopOn)return;
try{
if(ghActive&&ghMode3d&&ghGL){
if(ghOnTitle){ghDrawTitle()}
else{
if(!ghInvOpen)ghTick3D(1/60);
var px=ghP.x,pz=ghP.z;
var dx=Math.sin(ghP.yaw),dz=Math.cos(ghP.yaw);
var ex=px-dx*ghCam.d,ez=pz-dz*ghCam.d;
try{var cs=ghCamSpot(px,pz,dx,dz);ex=cs[0];ez=cs[1]}catch(e){}
ghCamPos=[ex,ghCam.h,ez];
var lookY=1.0+ghPitch*4,eyeY=ghCam.h;
var camD=ghCam.d,sideX=0,sideZ=0;
if(ghAiming){camD=2.0;sideX=-dz*0.9;sideZ=dx*0.9;
try{var cs2x=px-dx*camD+sideX,cs2z=pz-dz*camD+sideZ;if(!ghCamHit(cs2x,cs2z)){ex=cs2x;ez=cs2z}}catch(e){}}
ghViewCache=ghLook([ex,eyeY,ez],[px+dx*2,lookY,pz+dz*2],[0,1,0]);
ghDrawWorld();
try{ghDrawThings()}catch(e){}
}
}}catch(e){}
requestAnimationFrame(ghLoop);
}
function ghDrawThings(){}
var ghThings=[];
function ghThingsInit(){
ghThings=[
{id:'floppy',x:2,z:1,c:[0.9,0.7,0.2],s:0.5,taken:false},
{id:'medkit',x:12,z:4.5,c:[0.9,0.25,0.25],s:0.5,taken:false},
{id:'pistol',x:22,z:3,c:[0.3,0.3,0.35],s:0.6,taken:false},
{id:'ammo',x:33,z:4.5,c:[0.85,0.75,0.3],s:0.5,taken:false},
{id:'whitekey',x:49,z:3,c:[0.95,0.95,0.95],s:0.4,taken:false,hidden:true},
{id:'station',x:23,z:-4,c:[0.2,0.6,0.9],s:1.0,taken:false,prop:true},
{id:'seal',x:50.5,z:3,c:[0.5,0.8,0.4],s:1.2,taken:false,prop:true},
// ── MOSS (phase 2) ──
{id:'visor',x:60,z:1,c:[0.3,0.9,0.5],s:0.5,taken:false},
{id:'plate1',x:60,z:5,c:[0.7,0.7,0.2],s:0.9,taken:false,prop:true,plate:true},
{id:'magnum',x:72,z:2,c:[0.5,0.3,0.15],s:0.6,taken:false},
{id:'magammo',x:74,z:4,c:[0.9,0.6,0.2],s:0.5,taken:false},
{id:'station2',x:70,z:9,c:[0.2,0.6,0.9],s:1.0,taken:false,prop:true},
{id:'medkit2',x:76,z:9,c:[0.9,0.25,0.25],s:0.5,taken:false},
{id:'greenkey',x:82,z:3,c:[0.4,1,0.4],s:0.4,taken:false,hidden:true}
];
}
var ghSkitters=[
{x:64,z:4,hp:2,alive:true,cd:0,wob:0},
{x:70,z:1,hp:2,alive:false,cd:0,wob:2},
{x:76,z:5,hp:2,alive:false,cd:0,wob:4}
];
var ghLumber2={x:73,z:8,hp:6,alive:true,cd:0};
var ghLumber={x:45,z:3,hp:6,alive:true,cd:0};
var ghPrevF=false,ghPrevSp=false,ghPrevJ=false,ghPrev1=false,ghPrev2=false,ghFrame=0;
function ghDrawThingsReal(){
var t=(Date.now()/1000);
for(var i=0;i<ghThings.length;i++){var th=ghThings[i];
if(th.taken)continue;
if(th.hidden){
if(th.id==='whitekey'&&!ghRunFlags.lumberDead)continue;
}
var bob=th.prop?0:Math.sin(t*3+i)*0.15;
ghBox(th.x,0.6+bob,th.z,th.s,th.s,th.s,th.c,t*0.8,ghTexPlain,1);
}
// lumber: torso, head, jaw, arms, red eyes. sways.
if(ghLumber.alive){
var sway=Math.sin(Date.now()/500)*0.08;ghBox(ghLumber.x,1.1,ghLumber.z,1.2,2.0,1.1,[0.15,0.15,0.18],sway,ghTexDark,1);
ghBox(ghLumber.x,2.3,ghLumber.z,0.8,0.6,0.8,[0.12,0.12,0.15],sway,ghTexDark,1);
ghBox(ghLumber.x,1.95,ghLumber.z+0.45,0.6,0.2,0.15,[0.2,0.2,0.24],0,ghTexDark,1);
ghBox(ghLumber.x,2.35,ghLumber.z+0.42,0.14,0.12,0.1,[0.9,0.1,0.1],0,ghTexPlain,1);
ghBox(ghLumber.x,2.35,ghLumber.z-0.42,0.14,0.12,0.1,[0.9,0.1,0.1],0,ghTexPlain,1);
ghBox(ghLumber.x+0.85,1.0,ghLumber.z,0.4,1.4,0.4,[0.13,0.13,0.16],sway,ghTexDark,1);
ghBox(ghLumber.x-0.85,1.0,ghLumber.z,0.4,1.4,0.4,[0.13,0.13,0.16],-sway,ghTexDark,1);
// teeth
ghBox(ghLumber.x,1.82,ghLumber.z+0.5,0.5,0.12,0.08,[0.85,0.83,0.75],0,ghTexPlain,1);
// back spikes
ghBox(ghLumber.x,2.2,ghLumber.z-0.6,0.25,0.5,0.25,[0.1,0.1,0.12],0,ghTexDark,1);
ghBox(ghLumber.x,1.5,ghLumber.z-0.62,0.25,0.5,0.25,[0.1,0.1,0.12],0,ghTexDark,1);
// glowing core (weak point, allegedly)
ghBox(ghLumber.x,1.1,ghLumber.z+0.58,0.3,0.3,0.06,[1,0.45,0.1],0,ghTexPlain,1);
}
// skitters: small fast boxes, yellow eyes
for(var ski=0;ski<ghSkitters.length;ski++){var sk=ghSkitters[ski];
if(!sk.alive)continue;
var wob=Math.sin(Date.now()/200+sk.wob)*0.15;
ghBox(sk.x,0.35,sk.z,0.7,0.5,0.9,[0.3,0.28,0.2],wob,ghTexDark,1);
ghBox(sk.x,0.7,sk.z,0.4,0.25,0.4,[0.35,0.32,0.22],wob,ghTexDark,1);
ghBox(sk.x,0.72,sk.z+0.22,0.1,0.08,0.06,[1,0.85,0.1],0,ghTexPlain,1);
ghBox(sk.x,0.72,sk.z-0.22,0.1,0.08,0.06,[1,0.85,0.1],0,ghTexPlain,1);
}
// lumber 2 (moss warden)
if(ghLumber2.alive){
var sw2=Math.sin(Date.now()/500+2)*0.08;
ghBox(ghLumber2.x,1.1,ghLumber2.z,1.2,2.0,1.1,[0.18,0.14,0.14],sw2,ghTexDark,1);
ghBox(ghLumber2.x,2.3,ghLumber2.z,0.8,0.6,0.8,[0.14,0.12,0.12],sw2,ghTexDark,1);
ghBox(ghLumber2.x,2.35,ghLumber2.z+0.42,0.14,0.12,0.1,[1,0.5,0.1],0,ghTexPlain,1);
ghBox(ghLumber2.x,2.35,ghLumber2.z-0.42,0.14,0.12,0.1,[1,0.5,0.1],0,ghTexPlain,1);
}
}
function ghDist(ax,az,bx,bz){var dx=ax-bx,dz=az-bz;return Math.sqrt(dx*dx+dz*dz)}
function ghNearestInteract(){
var best=null,bd=1.8;
for(var i=0;i<ghThings.length;i++){var th=ghThings[i];
if(th.taken)continue;
if(th.id==='whitekey'&&!ghRunFlags.lumberDead)continue;
if(th.id==='greenkey'&&!ghHas('visor'))continue;
if(th.id==='greenkey'&&!ghHas('visor'))continue;
var d=ghDist(ghP.x,ghP.z,th.x,th.z);
if(d<bd){bd=d;best=th}
}
return best;
}
function ghInteractLabel(th){
if(!th)return '';
if(th.id==='floppy')return '[F] take floppy';
if(th.id==='medkit')return '[F] take medkit';
if(th.id==='pistol')return '[F] take pistol';
if(th.id==='ammo')return '[F] take rounds';
if(th.id==='whitekey')return '[F] take white keycard';
if(th.id==='station')return '[F] use save station';
if(th.id==='station2')return '[F] use save station';
if(th.id==='visor')return '[F] take night visor';
if(th.id==='magnum')return '[F] take magnum';
if(th.id==='magammo')return '[F] take magnum rounds';
if(th.id==='medkit2')return '[F] take medkit';
if(th.id==='greenkey')return '[F] take green keycard';
if(th.id==='seal')return '[F] touch the moss seal';
return '';
}
function ghDoInteract(th){
if(!th)return;
if(th.id==='floppy'){if(!ghInvFree()){ghSay(['inventory full. 9 slots.']);return}th.taken=true;ghInv.push('floppy');ghPersist();ghSay(['the man took the floppy.','save stations eat these.'])}
else if(th.id==='medkit'){if(!ghInvFree()){ghSay(['inventory full.']);return}th.taken=true;ghInv.push('medkit');ghPersist();ghSay(['the man took the medkit.','+50 HP. (press... no. medkits are used from... actually: walk into danger, then... hmm. press H.)'])}
else if(th.id==='pistol'){th.taken=true;ghGuns.push('pistol');ghAmmo.pistol+=6;ghPersist();ghSay(['the man took the pistol. 6 rounds.','SPACE to fire. precise. reliable.'])}
else if(th.id==='ammo'){th.taken=true;ghRunFlags.ammo3=true;ghAmmo.pistol+=12;ghPersist();ghSay(['+12 rounds.','count them. conserve them. (you will not.)'])}
else if(th.id==='whitekey'){th.taken=true;ghCards.push('white');ghInv.push('whitekey');ghPersist();ghSay(['the man took the white keycard.','it opens the moss seal. (phase 2. ambition.)'])}
else if(th.id==='visor'){if(!ghInvFree()){ghSay(['inventory full.']);return}th.taken=true;ghInv.push('visor');ghPersist();ghSay(['night visor.','wear it with H? no. it wears itself. (dark rooms fear it.)'])}
else if(th.id==='magnum'){th.taken=true;ghGuns.push('magnum');ghGun='magnum';ghAmmo.magnum+=6;ghPersist();
if(!ghRunFlags.ambush){ghRunFlags.ambush=true;ghSkitters[1].alive=true;ghSkitters[2].alive=true}
ghSay(['MAGNUM. 6 rounds. big stopper, slow hand.','...movement. behind you. (ambush. classic.)'])}
else if(th.id==='magammo'){th.taken=true;ghRunFlags.magammo=true;ghAmmo.magnum+=6;ghPersist();ghSay(['+6 magnum rounds.','each one counts triple. (roughly.)'])}
else if(th.id==='medkit2'){if(!ghInvFree()){ghSay(['inventory full.']);return}th.taken=true;ghRunFlags.medkit2=true;ghInv.push('medkit');ghPersist();ghSay(['medkit. +50. (H.)'])}
else if(th.id==='station2'){
if(ghInv.indexOf('floppy')===-1){ghSay(['the station wants a floppy.']);return}
ghInv.splice(ghInv.indexOf('floppy'),1);
ghStation={hp:ghHp,ammo:JSON.parse(JSON.stringify(ghAmmo)),guns:ghGuns.slice(),gun:ghGun,inv:ghInv.slice(),cards:ghCards.slice(),moss:ghMossOpen?1:0,plate1:ghPlate1?1:0,room:'moss4'};
ghPersist();ghSay(['floppy inserted. remembered.']);
}
else if(th.id==='greenkey'){th.taken=true;ghCards.push('green');ghInv.push('greenkey');ghPersist();ghSay(['green keycard.','it opens RUST. (phase 3. rust never sleeps.)'])}
else if(th.id==='station'){
if(ghInv.indexOf('floppy')===-1){ghSay(['the station wants a floppy.','you have no floppy.']);return}
ghInv.splice(ghInv.indexOf('floppy'),1);
ghStation={hp:ghHp,ammo:JSON.parse(JSON.stringify(ghAmmo)),guns:ghGuns.slice(),gun:ghGun,inv:ghInv.slice(),cards:ghCards.slice(),moss:ghMossOpen?1:0,plate1:ghPlate1?1:0,room:'chalk_save'};
ghPersist();ghSay(['floppy inserted. remembered.','die now, wake here.']);
}
else if(th.id==='seal'){
if(ghCards.indexOf('white')!==-1){
if(!ghMossOpen){try{ghOpenSeal()}catch(e){}ghSay(['the moss seal drinks the keycard.','stone grinds. the corridor breathes. MOSS is open.'])}
else ghSay(['the moss corridor. open. waiting.']);
}else ghSay(['sealed. MOSS.','it wants a white keycard.']);
}
}
function ghShoot(){
var now=0;try{now=Date.now()}catch(e){}
var cd=ghGun==='magnum'?(ghAiming?600:800):(ghAiming?400:280);
if(now<ghShootCd)return;
ghShootCd=now+cd;
if(ghGuns.indexOf(ghGun)===-1){ghSay(['no gun. (come back armed.)']);return}
if((ghAmmo[ghGun]||0)<=0){ghSay(['click. no rounds.']);return}
var dx=Math.sin(ghP.yaw),dz=Math.cos(ghP.yaw);
// nearest hittable enemy in cone
var best=null,bd=14;
var foes=[{o:ghLumber,r:1.0},{o:ghLumber2,r:1.0}];
for(var si=0;si<ghSkitters.length;si++)foes.push({o:ghSkitters[si],r:0.7});
for(var fi=0;fi<foes.length;fi++){var fo=foes[fi].o;
if(!fo.alive)continue;
var lx=fo.x-ghP.x,lz=fo.z-ghP.z;
var dist=Math.sqrt(lx*lx+lz*lz);
if(dist>14)continue;
var dot=(lx*dx+lz*dz)/(dist||1);
if(dot>(ghAiming?0.97:0.94)&&dist<bd){bd=dist;best=fo}
}
ghAmmo[ghGun]--;
if(!best){ghPersist();return}
var dmg=ghGun==='magnum'?3:(ghAiming?2:1);
best.hp-=dmg;
if(best.hp<=0){
best.alive=false;
if(best===ghLumber){ghRunFlags.lumberDead=true;ghAmmo.pistol+=6;ghSay(['the LUMBER falls. slowly.','+6 rounds from its pockets. (it had a white keycard behind it.)'])}
else if(best===ghLumber2){ghRunFlags.lumber2Dead=true;ghAmmo.pistol+=6;ghSay(['the moss LUMBER falls.','+6 rounds. (it guarded a station. stations need guards.)'])}
else{ghAmmo.pistol+=4;ghSay(['SKITTER down.','+4 rounds. (it ate them. skitters eat rounds.)'])}
}else{
var nm=best===ghLumber||best===ghLumber2?'LUMBER':'SKITTER';
ghSay(['hit. '+nm+' HP: '+best.hp+'.']);
}
ghPersist();
}
function ghChase(o,sp,dmg,r,dt){
dt=dt||1/60;
var d=ghDist(ghP.x,ghP.z,o.x,o.z);
if(d<10&&d>r){
var dx=(ghP.x-o.x)/d,dz=(ghP.z-o.z)/d;
var wob=0;
if(o.wob!==undefined){wob=Math.sin(Date.now()/300+o.wob)*0.5;var px2=-dz,pz2=dx;dx+=px2*wob*0.4;dz+=pz2*wob*0.4;var l=Math.sqrt(dx*dx+dz*dz);dx/=l;dz/=l}
var nx=o.x+dx*sp*dt,nz=o.z+dz*sp*dt;
if(ghWalkOK(nx,o.z,0.5))o.x=nx;
if(ghWalkOK(o.x,nz,0.5))o.z=nz;
}
if(d<r+0.3&&(ghP.y||0)<0.7){
o.cd=(o.cd||0)-dt;
if(o.cd<=0){
o.cd=1.0;
ghHp-=dmg;
if(ghHp<=0){ghDie3D();return}
ghSay(['hit. HP '+ghHp+'.']);
}
}
}
function ghLumberAI(dt){
if(!ghLumber.alive)return;
var d=ghDist(ghP.x,ghP.z,ghLumber.x,ghLumber.z);
if(d<9&&d>1.1){
var dx=(ghP.x-ghLumber.x)/d,dz=(ghP.z-ghLumber.z)/d;
var sp=1.3*dt;
var nx=ghLumber.x+dx*sp,nz=ghLumber.z+dz*sp;
if(ghWalkOK(nx,ghLumber.z,0.6))ghLumber.x=nx;
if(ghWalkOK(ghLumber.x,nz,0.6))ghLumber.z=nz;
}
if(d<1.4){
ghLumber.cd-=dt;
if(ghLumber.cd<=0){
ghLumber.cd=1.0;
ghHp-=(ghDiff==='hard'?20:12);
if(ghHp<=0){ghDie3D();return}
ghSay(['the LUMBER hits. HP '+ghHp+'.']);
}
}
}
function ghEnemyHome(){
ghLumber.x=45;ghLumber.z=3;
ghLumber2.x=73;ghLumber2.z=8;
var homes=[[64,4],[70,1],[76,5]];
for(var i=0;i<ghSkitters.length&&i<homes.length;i++){ghSkitters[i].x=homes[i][0];ghSkitters[i].z=homes[i][1];ghSkitters[i].cd=0}
}
function ghDie3D(){
ghCombat=null;
ghDeaths++;
var line=ghDeathLines[ghDeaths%ghDeathLines.length].replace('%N',ghDeaths);
if(ghStation){
ghHp=ghStation.hp;ghAmmo=JSON.parse(JSON.stringify(ghStation.ammo));ghGuns=ghStation.guns.slice();ghGun=ghStation.gun||'pistol';ghInv=ghStation.inv.slice();ghCards=ghStation.cards.slice();
if(ghStation.moss&&!ghMossOpen){ghMossOpen=true;try{ghApplyOpened()}catch(e){}}
if(ghStation.plate1&&!ghPlate1){ghPlate1=true;try{ghApplyOpened()}catch(e){}}
}else{
ghHp=ghMaxHp;
}
ghP.x=5;ghP.z=3;ghP.yaw=-Math.PI/2;
ghLumber.x=45;ghLumber.z=3;
if(!ghRunFlags.lumberDead){ghLumber.hp=6;ghLumber.alive=true}
ghLumber2.x=73;ghLumber2.z=8;
if(!ghRunFlags.lumber2Dead){ghLumber2.hp=6;ghLumber2.alive=true}
for(var si=0;si<ghSkitters.length;si++){var sk0=ghSkitters[si];sk0.hp=2;sk0.alive=true;sk0.cd=0}
if(ghRunFlags.ambush){ghSkitters[1].alive=false;ghSkitters[2].alive=false}
ghPersist();
ghSay([line,'wake up at the landing. (stations are earned.)']);
}
function ghDarkTick(){
var inDark=ghP.x>ghDarkRect.x0&&ghP.x<ghDarkRect.x1&&ghP.z>ghDarkRect.z0&&ghP.z<ghDarkRect.z1;
var dk=null;try{dk=document.getElementById('ghDark')}catch(e){}
if(!dk)return;
if(inDark&&!ghHas('visor')){dk.style.background='#000';dk.style.opacity='0.93'}
else if(inDark){dk.style.background='#0a3a1a';dk.style.opacity='0.14'}
else dk.style.opacity='0';
}
var ghInvOpen=false;
var ghItemNames={floppy:'FLOPPY',medkit:'MEDKIT',whitekey:'WHITE KEYCARD',greenkey:'GREEN KEYCARD',visor:'NIGHT VISOR'};
function ghRenderInv(){
try{
var iv=document.getElementById('ghInv');if(!iv)return;
if(!ghInvOpen){iv.style.display='none';return}
iv.style.display='block';
var counts={};
for(var i=0;i<ghInv.length;i++){counts[ghInv[i]]=(counts[ghInv[i]]||0)+1}
var html='<div style="color:#9ab8d8;font-size:13px;letter-spacing:3px;margin-bottom:10px">INVENTORY '+ghInv.length+'/9 · [TAB] close</div>';
var order=['floppy','medkit','whitekey','greenkey','visor'];
for(var o=0;o<order.length;o++){var id=order[o];
if(counts[id])html+='<div style="color:#c8c8d0;font-size:13px;padding:3px 0">'+(ghItemNames[id]||id)+' ×'+counts[id]+(id==='medkit'?' <span style="color:#5a7a9a">[H] use</span>':'')+'</div>'}
for(var gi=0;gi<ghGuns.length;gi++){var g=ghGuns[gi];
html+='<div style="color:#c8c8d0;font-size:13px;padding:3px 0">'+g.toUpperCase()+' '+(ghAmmo[g]||0)+'rds'+(ghGun===g?' ◄':'')+'</div>'}
if(!ghInv.length&&!ghGuns.length)html+='<div style="color:#44445a;font-size:13px">empty. (take everything. everything is bait.)</div>';
iv.innerHTML=html;
}catch(e){}
}
function ghUseMedkit(){
var mi=ghInv.indexOf('medkit');
if(mi===-1)return false;
ghInv.splice(mi,1);ghHp=Math.min(ghMaxHp,ghHp+50);ghPersist();
try{ghRenderInv()}catch(e){}
try{ghBar()}catch(e){}
return true;
}
function ghTick3D(dt){
ghMovePlayer(dt);
var lurk=ghDiff==='hard'?20:12;
if(ghLumber.alive)ghChase(ghLumber,1.3,lurk,1.1,dt);
if(ghLumber2.alive)ghChase(ghLumber2,1.3,lurk,1.1,dt);
for(var qi=0;qi<ghSkitters.length;qi++){if(ghSkitters[qi].alive)ghChase(ghSkitters[qi],3.0,ghDiff==='hard'?14:8,0.8,dt)}
// gun switching 1/2
if(ghKeys['1']){ghKeys['1']=false;if(ghGuns.indexOf('pistol')!==-1&&ghGun!=='pistol'){ghGun='pistol';ghPersist()}}
if(ghKeys['2']){ghKeys['2']=false;if(ghGuns.indexOf('magnum')!==-1&&ghGun!=='magnum'){ghGun='magnum';ghPersist()}}
// pressure plate 1
if(!ghPlate1&&ghDist(ghP.x,ghP.z,60,5)<1.3){try{ghOpenGate()}catch(e){}ghSay(['CLUNK. somewhere, a gate gives up.','(moss lower. past the second room. it is open now.)'])}
// dark overlay
try{ghDarkTick()}catch(e){}
// medkit key H
if(ghKeys['h']){ghKeys['h']=false;
if(ghUseMedkit())ghSay(['+50.']);
}
// interact F (edge)
var f=!!ghKeys['f'];
if(f&&!ghPrevF){var th=ghNearestInteract();if(th)ghDoInteract(th)}
ghPrevF=f;
// shoot SPACE (edge) -> now JUMP. fire is LMB / J.
var sp2=!!ghKeys[' '];
if(sp2&&!ghPrevSp){if((ghP.y||0)<=0.01){ghP.vy=4.6}}
ghPrevSp=sp2;
var jk=!!ghKeys['j'];
if(jk&&!ghPrevJ)ghShoot();
ghPrevJ=jk;
// jump physics
try{
ghP.vy=ghP.vy||0;ghP.y=ghP.y||0;
if(ghP.y>0||ghP.vy!==0){
ghP.vy-=12*dt;
ghP.y+=ghP.vy*dt;
if(ghP.y<=0){ghP.y=0;ghP.vy=0}
}
}catch(e){}
// prompt
var near=ghNearestInteract();
var pr='';
if(Date.now()<ghMsgUntil&&ghMsgTxt)pr=ghMsgTxt;
else if(near)pr=ghInteractLabel(near);
else if((function(){var anyE=null,anyD=14;var es=[ghLumber,ghLumber2];for(var ei=0;ei<ghSkitters.length;ei++)es.push(ghSkitters[ei]);for(var ej=0;ej<es.length;ej++){if(!es[ej].alive)continue;var ed=ghDist(ghP.x,ghP.z,es[ej].x,es[ej].z);if(ed<anyD){anyD=ed;anyE=es[ej]}}if(anyE&&ghGuns.length){pr='[RMB] aim · [LMB] shoot ('+anyE.hp+' HP)';return true}return false})()){}
if(!pr){try{var lcv=document.getElementById('ghCanvas');if(!lcv||document.pointerLockElement!==lcv)pr='[click] look · WASD move · SPACE jump - TAB inv'}catch(e){}}
ghPrompt(pr);
ghFrame++;
if(ghFrame%30===0){try{ghBar()}catch(e){}try{if(ghInvOpen)ghRenderInv()}catch(e){}}
}
// replace stub draw + loop tick
ghDrawThings=ghDrawThingsReal;
// canvas + prompt elements, mode switch
function gh3DShow(){
try{
var room=document.getElementById('ghRoom');if(!room)return;
var t=document.getElementById('ghRoomTitle');if(t)t.style.display='none';
var dsc=document.getElementById('ghRoomDesc');if(dsc)dsc.style.display='none';
var dw=document.getElementById('ghDoors');if(dw)dw.style.display='none';
var ow=document.getElementById('ghObjs');if(ow)ow.style.display='none';
var cv=document.getElementById('ghCanvas');
if(!cv){
cv=document.createElement('canvas');cv.id='ghCanvas';
cv.style.cssText='position:absolute;inset:0;width:100%;height:100%';
room.style.position='relative';
room.appendChild(cv);
var pr=document.createElement('div');pr.id='ghPrompt';
pr.style.cssText='position:absolute;bottom:14px;left:0;right:0;text-align:center;color:#9ab8d8;font-size:15px;letter-spacing:2px;font-family:Consolas,monospace;text-shadow:0 2px 4px #000';
room.appendChild(pr);
}
cv.style.display='block';
try{
cv.onclick=function(){
try{if(document.pointerLockElement!==cv)cv.requestPointerLock()}catch(e){}
};
}catch(e){}
var pr2=document.getElementById('ghPrompt');if(pr2)pr2.style.display='block';
var ivp=document.getElementById('ghInv');
if(!ivp){
ivp=document.createElement('div');ivp.id='ghInv';
ivp.style.cssText='position:absolute;top:60px;left:50%;transform:translateX(-50%);background:rgba(8,8,12,0.95);border:2px solid #44445a;border-radius:4px;padding:16px 20px;z-index:18;display:none;font-family:Consolas,monospace;min-width:320px';
room.appendChild(ivp);
}
var dk=document.getElementById('ghDark');
if(!dk){
dk=document.createElement('div');dk.id='ghDark';
dk.style.cssText='position:absolute;inset:0;background:#000;opacity:0;pointer-events:none;transition:opacity .4s;z-index:15';
room.appendChild(dk);
}
if(!ghGL){if(!ghGLInit()){ghMode3d=false;return}}
ghResize();
if(!ghLoopOn){ghLoopOn=true;requestAnimationFrame(ghLoop)}
}catch(e){ghMode3d=false}
}
function ghPrompt(s){try{var pr=document.getElementById('ghPrompt');if(pr)pr.textContent=s||''}catch(e){}}
})();
