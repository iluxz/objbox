// ── COVE WATCH: keep your eyes on the curtain (foxy's night) ──
(function(){
var fx=null,fxIv=null;
function fxEl(id){try{return document.getElementById(id)}catch(e){return null}}
function fxNew(){
return {t:0,power:100,curtain:15,watching:false,door:false,phase:'night',over:null,sprint:-1,aud:null};
}
function fxClock(t){
var h=12+Math.floor(t/40);
if(h>12)h-=12;
if(t>=240)return '6AM';
return h+'AM';
}
// ── css ──
function fxCSS(){
if(fxEl('fxCSS'))return;
var s=document.createElement('style');s.id='fxCSS';
s.textContent=
'#fxOverlay{position:fixed;inset:0;z-index:2000;background:#0a0a10;display:flex;flex-direction:column;font-family:Consolas,monospace;color:#d8d8e2}'+
'#fxTop{background:#14141c;padding:10px 18px;display:flex;gap:22px;align-items:center;font-size:14px;border-bottom:2px solid #2c2c40}'+
'#fxPBar{display:inline-block;width:160px;height:12px;background:#20202e;border:1px solid #4a4a6a;vertical-align:middle}#fxPBar i{display:block;height:100%;background:linear-gradient(90deg,#fc4,#f84)}'+
'#fxCBar{display:inline-block;width:220px;height:12px;background:#20202e;border:1px solid #4a4a6a;vertical-align:middle}#fxCBar i{display:block;height:100%;background:linear-gradient(90deg,#a4a,#e2e)}'+
'#fxAnn{background:#0c0c12;color:#9ab8d8;padding:8px 18px;font-size:13px;min-height:20px;border-bottom:2px solid #2c2c40}'+
'#fxCam{position:relative;flex:1;background:#050508;overflow:hidden;min-height:200px}'+
'#fxCove{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:340px;height:250px;background:#000;border:3px solid #333}'+
'#fxCove canvas{width:100%;height:100%;display:block}'+
'#fxCount{position:absolute;left:0;right:0;top:16px;text-align:center;font-size:44px;letter-spacing:8px;color:#e2e;display:none;text-shadow:0 0 18px rgba(238,34,238,.7)}'+
'#fxBtns{background:#14141c;padding:12px 18px;display:flex;gap:10px;border-top:2px solid #2c2c40}'+
'.fxBtn{background:#23232f;border:2px solid #9ab8d8;color:#dfe8ff;font-family:Consolas,monospace;font-size:13px;letter-spacing:2px;padding:10px 18px;cursor:pointer;border-radius:6px}'+
'.fxBtn.off{border-color:#4a4a6a;color:#8a8aa2}'+
'.fxBtn.danger{border-color:#e2e;color:#e2e;animation:fxBlink .5s steps(2) infinite}'+
'@keyframes fxBlink{50%{opacity:.4}}'+
'#fxEnd{position:absolute;inset:0;background:rgba(10,0,10,.92);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;z-index:9;font-size:16px}';
document.head.appendChild(s);
}
function fxOverlay(){
var ov=fxEl('fxOverlay');
if(ov)return ov;
ov=document.createElement('div');ov.id='fxOverlay';
ov.innerHTML='<div id="fxTop"></div><div id="fxAnn"></div><div id="fxCam"><div id="fxCove"><canvas id="fxFeed" width="300" height="220"></canvas></div><div id="fxCount"></div></div><div id="fxBtns"></div>';
document.body.appendChild(ov);
return ov;
}
function fxSay(t){try{var el=fxEl('fxAnn');if(el)el.textContent=t||''}catch(e){}}
function fxBuild(){
var top=fxEl('fxTop'),btns=fxEl('fxBtns');
if(top)top.innerHTML='<span id="fxClock">12AM</span><span>PWR <span id="fxPBar"><i style="width:100%"></i></span></span><span><span id="fxCLabel">CURTAIN</span> <span id="fxCBar"><i style="width:15%"></i></span></span><span id="fxPhase" style="color:#8a8aa2">night shift</span>';
if(btns){btns.innerHTML='<button class="fxBtn off" id="fxWatch">WATCH COVE</button><button class="fxBtn off" id="fxDoor">DOOR: OPEN</button><button class="fxBtn off" id="fxLeave" style="margin-left:auto">LEAVE</button>';
var w=fxEl('fxWatch');if(w)w.onclick=function(){if(!fx||fx.over)return;if(fx.power<=0){fxSay('no power. the cameras are dead. (the curtain loves that.)');return}fx.watching=!fx.watching;fxPaint()};
var dr=fxEl('fxDoor');if(dr)dr.onclick=function(){if(!fx||fx.over)return;if(fx.power<=0&&!fx.door){fxSay('no power. the door stays open. (it is always open now.)');return}fx.door=!fx.door;fxPaint()};
var lv=fxEl('fxLeave');if(lv)lv.onclick=function(){fxExit()};
}
}
function fxTick(dt){
if(!fx||fx.over)return;
fx.t+=dt;
// power
var drain=0.12+(fx.watching?0.1:0)+(fx.door?0.35:0);
fx.power=Math.max(0,fx.power-drain*dt);
if(fx.power<=0){fx.door=false;if(fx.watching){fx.watching=false;fxSay('power is out. the curtain loves that. (listen.)')}}
// phase
if(fx.t>=200&&fx.phase==='night'){
fx.phase='countdown';
try{
fx.aud=new Audio('foxy.webm');fx.aud.volume=0.8;
var p=fx.aud.play();if(p&&p.catch)p.catch(function(){});
}catch(e){}
fxSay('5AM. the curtain is OPEN. sixty seconds. do not blink. (the song knows you are here.)');
}
// curtain
var finale=fx.phase==='countdown';
var rise=fx.watching?(finale?1.0:0.5):(finale?4.4:2.2);
fx.curtain=Math.min(100,fx.curtain+rise*dt);
// sprint!
if(fx.curtain>=100&&fx.sprint<0){
fx.sprint=3;
fxSay('SOMETHING IS RUNNING. (door. DOOR. DOOR.)');
}
if(fx.sprint>=0){
fx.sprint-=dt;
if(fx.sprint<0){
if(fx.door){fx.curtain=25;fx.power=Math.max(0,fx.power-8);fxSay('BANG. dents. worth it.')}
else{fxDie();return}
}
}
// win
if(fx.t>=240){fxWin();return}
try{fxPaint()}catch(e){}
}
function fxDie(){
if(!fx||fx.over)return;
fx.over='dead';
try{if(fx.aud){fx.aud.pause()}}catch(e){}
try{
var cam=fxEl('fxCam');
if(cam){cam.style.background='#400';setTimeout(function(){try{cam.style.background='#0a0a10'}catch(e){}},400)}
}catch(e){}
fxSay('it got in. (you looked away. everyone looks away eventually.)');
fxEndCard(false);
}
function fxWin(){
if(!fx||fx.over)return;
fx.over='win';
try{if(fx.aud){fx.aud.pause()}}catch(e){}
try{localStorage.setItem('cube_foxy_win','1')}catch(e){}
try{localStorage.setItem('cube_foxy_unlocked','1')}catch(e){}
try{if(typeof ach==='function'){ach('foxy_night');if(typeof achScan==='function')achScan()}}catch(e){}
try{if(typeof cubeOk==='function')cubeOk('bgm: foxy unlocked — bgm foxy (you outlasted the curtain)')}catch(e){}
fxSay('6AM. shift over. the curtain is just a curtain again.');
fxEndCard(true);
}
function fxEndCard(win){
try{
var ov=fxEl('fxOverlay');if(!ov)return;
var old=fxEl('fxEnd');if(old)old.remove();
var d=document.createElement('div');d.id='fxEnd';
d.innerHTML='<div style="font-size:26px;letter-spacing:6px;color:'+(win?'#fff':'#e44')+'">'+(win?'6AM — SHIFT SURVIVED':"IT GOT IN")+'</div><div style="font-size:13px;color:#8a8aa2">'+(win?'achievement: foxy\'s night. bgm foxy unlocked. (the song remembers you staying.)':'the curtain keeps what it catches.')+'</div><button class="fxBtn" id="fxRetry">'+(win?'CLOCK OUT':'RETRY NIGHT')+'</button>';
ov.appendChild(d);
var r=fxEl('fxRetry');if(r)r.onclick=function(){if(win){fxExit()}else{fxReset()}};
}catch(e){}
}
function fxReset(){
try{var old=fxEl('fxEnd');if(old)old.remove()}catch(e){}
fx=fxNew();
try{fxBuild()}catch(e){}
fxSay('12AM. new night. the curtain is already watching. (it never stopped.)');
}
function fxPaint(){
if(!fx)return;
var c=fxEl('fxClock');if(c)c.textContent=fxClock(fx.t);
var pb=fxEl('fxPBar');if(pb){var i=pb.querySelector('i');if(i)i.style.width=fx.power+'%'}
var cb=fxEl('fxCBar');if(cb){var j=cb.querySelector('i');if(j)j.style.width=(fx.watching?fx.curtain:0)+'%'}
var cl=fxEl('fxCLabel');if(cl)cl.textContent=fx.watching?('CURTAIN'):('CURTAIN ???');
var ph=fxEl('fxPhase');if(ph)ph.textContent=fx.phase==='countdown'?'FINAL COUNTDOWN':'night shift';
var w=fxEl('fxWatch');if(w){w.textContent=fx.watching?'WATCHING':'WATCH COVE';if(fx.watching)w.classList.remove('off');else w.classList.add('off')}
var dr=fxEl('fxDoor');if(dr){dr.textContent=fx.door?'DOOR: SHUT':'DOOR: OPEN';if(fx.door)dr.classList.remove('off');else dr.classList.add('off');if(fx.sprint>=0)dr.classList.add('danger')}
var ct=fxEl('fxCount');if(ct){if(fx.phase==='countdown'){ct.style.display='block';ct.textContent=Math.max(0,Math.ceil(240-fx.t))}else ct.style.display='none'}
}
// ── camera feed renderer (canvas: static, cove, curtain, eyes) ──
var fxRaf=null;
function fxDraw(){
try{
if(!fx){fxRaf=null;return}
var cv=fxEl('fxFeed');
if(!cv){fxRaf=requestAnimationFrame(fxDraw);return}
var g=cv.getContext('2d');
if(!g){fxRaf=null;return}
var W=cv.width,H=cv.height;
var blind=!fx.watching&&fx.power>0&&fx.over!=='dead';
var shake=0;
if(fx.sprint>=0)shake=(Math.random()-0.5)*8;
if(fx.over==='dead')shake=(Math.random()-0.5)*20;
g.save();
g.translate(shake,0);
if(blind){
// ── the office: you are here. the cove is elsewhere. listen. ──
g.fillStyle='#08080c';g.fillRect(-10,0,W+20,H);
// floor
g.fillStyle='#101016';g.fillRect(-10,H*0.72,W+20,H*0.28);
// desk
g.fillStyle='#1c1c26';g.fillRect(W*0.3,H*0.55,W*0.4,H*0.17);
g.fillStyle='#262633';g.fillRect(W*0.3,H*0.55,W*0.4,4);
// door (left): open = dark, shut = barred, sprint = red pulse
var doorOpen=!fx.door;
g.fillStyle='#14141c';g.fillRect(W*0.06,H*0.2,W*0.2,H*0.52);
if(fx.sprint>=0&&Math.random()<0.5)g.fillStyle='#5a0a0a';
else g.fillStyle=doorOpen?'#050507':'#3a3a4a';
g.fillRect(W*0.06+4,H*0.2+4,W*0.2-8,H*0.52-8);
if(!doorOpen){g.fillStyle='#55556a';for(var b=0;b<4;b++)g.fillRect(W*0.06,H*0.28+b*22,W*0.2,4)}
// faint static (dead air, not a feed)
for(var n=0;n<40;n++){var v=Math.floor(Math.random()*30)+5;g.fillStyle='rgb('+v+','+v+','+v+')';g.fillRect(Math.random()*W,Math.random()*H,2,2)}
g.fillStyle='rgba(154,184,216,0.5)';g.font='10px monospace';
g.fillText('THE OFFICE. listen.',12,H-10);
g.restore();
fxRaf=requestAnimationFrame(fxDraw);
return;
}
// darkness (deeper when not watching / power out)
var dark=fx.power<=0?0.96:(fx.watching?0.45:0.8);
g.fillStyle='#030304';g.fillRect(-10,0,W+20,H);
// back wall slit
g.fillStyle='#14141a';g.fillRect(W*0.2,H*0.15,W*0.6,H*0.7);
// static
var n=fx.watching?120:260;
for(var i=0;i<n;i++){
var v=Math.floor(Math.random()*70)+10;
g.fillStyle='rgb('+v+','+v+','+(v+8)+')';
g.fillRect(Math.random()*W,Math.random()*H,2,2);
}
// curtain panels (open wider as meter rises)
var open=fx.curtain/100;
var pw=(W*0.5)*(1-open)+4;
g.fillStyle='#5a1a1a';
g.fillRect(W*0.2,H*0.1,pw,H*0.8);
g.fillRect(W*0.8-pw,H*0.1,pw,H*0.8);
g.fillStyle='#7a2a2a';
for(var s=0;s<6;s++){g.fillRect(W*0.2+6+s*((pw-12)/5),H*0.1,2,H*0.8);g.fillRect(W*0.8-pw+6+s*((pw-12)/5),H*0.1,2,H*0.8)}
// eyes in the gap
if(fx.curtain>55||fx.phase==='countdown'||fx.over==='dead'){
var fl=Math.random()<0.12?0:1;
if(fl){
var ey=fx.over==='dead'?4:2.5;
g.fillStyle=fx.over==='dead'?'#f00':'#c33';
g.beginPath();g.arc(W*0.5-8,H*0.45,ey,0,7);g.fill();
g.beginPath();g.arc(W*0.5+8,H*0.45,ey,0,7);g.fill();
}
}
// sprint vignette / death wash
if(fx.sprint>=0){g.fillStyle='rgba(200,0,0,'+(0.12+0.1*Math.random())+')';g.fillRect(-10,0,W+20,H)}
if(fx.over==='dead'){g.fillStyle='rgba(180,0,0,0.55)';g.fillRect(-10,0,W+20,H)}
// darkness overlay
g.fillStyle='rgba(0,0,0,'+dark+')';g.fillRect(-10,0,W+20,H);
// scanlines
g.fillStyle='rgba(0,0,0,0.25)';
for(var y=0;y<H;y+=3)g.fillRect(-10,y,W+20,1);
g.restore();
}catch(e){}
fxRaf=requestAnimationFrame(fxDraw);
}
// ── enter/exit ──
function fxEnter(){
try{fxCSS()}catch(e){}
try{fxOverlay()}catch(e){}
fx=fxNew();
try{fxBuild()}catch(e){}
fxSay('12AM. cove watch. keep your eyes on the curtain. (blink and it learns.)');
if(fxIv)clearInterval(fxIv);
fxIv=setInterval(function(){try{fxTick(0.1)}catch(e){}},100);
if(!fxRaf)fxRaf=requestAnimationFrame(fxDraw);
return true;
}
function fxExit(){
try{if(fxIv){clearInterval(fxIv);fxIv=null}}catch(e){}
try{if(fxRaf){cancelAnimationFrame(fxRaf);fxRaf=null}}catch(e){}
try{if(fx&&fx.aud){fx.aud.pause()}}catch(e){}
fx=null;
try{var ov=fxEl('fxOverlay');if(ov)ov.remove()}catch(e){}
try{var cs=fxEl('fxCSS');if(cs)cs.remove()}catch(e){}
}
// ── debug hooks ──
window.fxStep=function(n){try{n=n||1;for(var i=0;i<n;i++)fxTick(0.1);return fx?Math.round(fx.t*10)/10:-1}catch(e){return -1}};
window.fxDbg=function(){try{if(!fx)return {menu:true};return {t:Math.round(fx.t*10)/10,power:Math.round(fx.power*10)/10,curtain:Math.round(fx.curtain),watching:fx.watching,door:fx.door,phase:fx.phase,sprint:Math.round(fx.sprint*10)/10,over:fx.over}}catch(e){return {err:String(e)}}};
window.fxWatch=function(v){try{if(fx)fx.watching=!!v;return true}catch(e){return false}};
window.fxDoor=function(v){try{if(fx)fx.door=!!v;return true}catch(e){return false}};
window.fxEnter=fxEnter;
window.fxExit=fxExit;
})();
