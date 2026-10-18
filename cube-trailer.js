// ── TRAILER MODE: ghost plays cube for the camera (for recording) ──
(function(){
var trActive=false,trTimers=[],trStepN=0,trSeg=[],trCutFn=null,trTGuard=0,trBgmT=0;
function trAudioGuard(){
if(!trActive){window._trAudioLock=false;return}
try{
var ours=(typeof _bgmBlobUrl!=='undefined'&&typeof bgm!=='undefined'&&bgm&&bgm.src===_bgmBlobUrl&&(bgm.dataset.file||'').indexOf('drone2lp.wav')!==-1);
if(ours){
try{if(!bgm.paused)trBgmT=bgm.currentTime}catch(e){}
if(bgm.paused){var p=bgm.play();if(p&&p.catch)p.catch(function(){});}
try{if(trBgmT>2&&bgm.currentTime<trBgmT-3)bgm.currentTime=trBgmT}catch(e){}
}else{
var pos=trBgmT;try{bgmBlobLoad('drone2lp.wav',true)}catch(e){}
var tries=0;var iv=setInterval(function(){
if(!trActive||++tries>50){clearInterval(iv);return}
try{if(typeof _bgmBlobUrl!=='undefined'&&bgm.src===_bgmBlobUrl&&(bgm.dataset.file||'').indexOf('drone2lp.wav')!==-1&&bgm.readyState>=1){if(pos>1)try{bgm.currentTime=pos}catch(e){}clearInterval(iv)}}catch(e){}
},80);
}
}catch(e){}
try{if(typeof moonEl!=='undefined'&&moonEl)moonEl.pause()}catch(e){}
try{if(typeof ngMusic!=='undefined'&&ngMusic)ngMusic.pause()}catch(e){}
try{if(typeof ngMornAud!=='undefined'&&ngMornAud)ngMornAud.pause()}catch(e){}
try{if(typeof ngNoliAudio!=='undefined'&&ngNoliAudio)ngNoliAudio.pause()}catch(e){}
try{if(typeof shBgm!=='undefined'&&shBgm)shBgm.pause()}catch(e){}
try{if(typeof tbAud!=='undefined'&&tbAud)tbAud.pause()}catch(e){}
try{if(typeof fx!=='undefined'&&fx&&fx.aud)fx.aud.pause()}catch(e){}
try{if(typeof grCredAudio!=='undefined'&&grCredAudio)grCredAudio.pause()}catch(e){}
try{if(typeof flyBuzzSet==='function')flyBuzzSet(false)}catch(e){}
try{if(typeof grAmbStop==='function')grAmbStop()}catch(e){}
try{if(typeof grBgmA!=='undefined'&&grBgmA)grBgmA.pause()}catch(e){}
try{if(typeof folkAud!=='undefined'&&folkAud)folkAud.pause()}catch(e){}
try{if(typeof opAud!=='undefined'&&opAud)opAud.pause()}catch(e){}
try{var as=document.getElementsByTagName('audio');for(var i=0;i<as.length;i++){if(as[i]!==bgm){try{as[i].pause()}catch(e){}}}}catch(e){}
trTGuard=setTimeout(trAudioGuard,400);
}
function trSegNew(){trSeg=[]}
function trSegKill(){try{for(var i=0;i<trSeg.length;i++){try{trSeg[i].dead=true;clearTimeout(trSeg[i].id)}catch(e){}}}catch(e){}trSeg=[]}
function trEl(id){try{return document.getElementById(id)}catch(e){return null}}
function trLater(ms,fn){var e={dead:false,id:0};e.id=setTimeout(function(){if(e.dead)return;try{if(trActive)fn()}catch(err){}},ms);trTimers.push(e.id);trSeg.push(e);return e.id}
function trSay(t){try{if(typeof cubePrint==='function')cubePrint(t)}catch(e){}}
// hard cut: snap to black, swap scenes underneath, snap back
function trCut(ms){
try{
var old=trEl('trCut');if(old)old.remove();
var d=document.createElement('div');d.id='trCut';
d.style.cssText='position:fixed;inset:0;background:#000;z-index:6500;pointer-events:none';
document.body.appendChild(d);
trLater(ms||300,function(){try{var x=trEl('trCut');if(x)x.remove()}catch(e){}});
}catch(e){}
}
// real cut: black frame that SKIPS time. kills the current scene's pending
// timers, runs the armed jump (close scene + advance), next scene lands
// while black is up. if nothing armed, degrades to a plain flash.
function trCutSkip(ms){
if(!trActive)return;
try{
var old=trEl('trCut');if(old)old.remove();
var d=document.createElement('div');d.id='trCut';
d.style.cssText='position:fixed;inset:0;background:#000;z-index:6500;pointer-events:none';
document.body.appendChild(d);
}catch(e){}
trSegKill();
var f=trCutFn;trCutFn=null;
try{if(typeof f==='function')f()}catch(e){}
trLater(ms||700,function(){try{var x=trEl('trCut');if(x)x.remove()}catch(e){}});
}
// big title card overlay
function trCard(main,sub,ms){
try{
var old=trEl('trCard');if(old)old.remove();
if(!main)return;
var d=document.createElement('div');d.id='trCard';
d.style.cssText='position:fixed;inset:0;z-index:6000;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(5,5,10,0.55);pointer-events:none;font-family:Consolas,monospace';
d.innerHTML='<div style="font-size:52px;letter-spacing:16px;color:#fff;text-shadow:0 0 30px rgba(140,170,255,.9)">'+main+'</div>'+(sub?'<div style="font-size:15px;letter-spacing:4px;color:#9ab8d8;margin-top:12px">'+sub+'</div>':'');
document.body.appendChild(d);
if(ms)trLater(ms,function(){try{var x=trEl('trCard');if(x)x.remove()}catch(e){}});
}catch(e){}
}
// ghost-type a command into the terminal, then run it
function trType(cmd,done){
try{
var f=trEl('termField');
if(!f){trSay('cube#> '+cmd);try{if(typeof cubeEval==='function')cubeEval(cmd)}catch(e){}if(done)trLater(800,done);return}
var i=0;
f.focus();
var iv=setInterval(function(){
if(!trActive){clearInterval(iv);return}
try{f.value=cmd.slice(0,++i)}catch(e){}
if(i>=cmd.length){clearInterval(iv);
trLater(500,function(){
try{f.value=''}catch(e){}
trSay('cube#> '+cmd);
try{if(typeof cubeEval==='function')cubeEval(cmd)}catch(e){}
if(done)trLater(1200,done);
});
}
},70);
}catch(e){if(done)trLater(800,done)}
}
// ghost-type into a textarea (studio editor), firing input events so line nums + live preview follow
function trTypeArea(id,text,done){
try{
var el=trEl(id);
if(!el){if(done)trLater(500,done);return}
el.value='';
var i=0;
var iv=setInterval(function(){
if(!trActive){clearInterval(iv);return}
try{el.value=text.slice(0,++i);el.dispatchEvent(new Event('input'))}catch(e){}
if(i>=text.length){clearInterval(iv);if(done)trLater(700,done)}
},40);
}catch(e){if(done)trLater(500,done)}
}
function trOpenGame(name){
try{
if(name==='office'&&typeof stEnter==='function')stEnter();
else if(name==='greyhall'&&typeof ghEnter==='function')ghEnter();
else if(name==='tbb'&&typeof tbEnter==='function')tbEnter();
else if(name==='cove'&&typeof fxEnter==='function')fxEnter();
}catch(e){}
}
function trCloseGame(name){
try{
if(name==='office'&&typeof stExit==='function')stExit();
else if(name==='greyhall'&&typeof ghExit==='function')ghExit();
else if(name==='tbb'){try{if(typeof tbAuto==='function')tbAuto(false)}catch(e){}if(typeof tbExit==='function')tbExit()}
else if(name==='cove'&&typeof fxExit==='function')fxExit();
else if(name==='grotto'&&typeof grExit==='function')grExit();
else if(name==='fly'&&typeof flyClose==='function')flyClose();
}catch(e){}
}
function trPlay(){
var vsProgram='gui window "obj was here" 460 170\ngui label "hello :)" 30 35\ngui label "you\'ve been watching obj play the entire time :D" 30 85';
var steps=[
function(n){trCard('CUBE',null,4000);trLater(4500,n)},
function(n){trType('bgm void',function(){
trCut();
trCard('ONE FILE','html. thats the whole install.',4000);
trLater(4500,n);
})},
function(n){trType('travel cb_menu',function(){
trCut(400);
trCard('9 ZONES','only adjacent ones. walk the line.',3500);
trLater(4000,n);
})},
function(n){trType('travel geometry',function(){trLater(3500,n)})},
function(n){trCut(400);trCard('THE TERMINAL','obj responds. obj is always watching.',3500);trLater(1500,n)},
function(n){trType('transmit "lux" "say hi to the camera"',function(){trLater(3500,n)})},
function(n){trCut(400);trCard('THE OFFICE','83 endings. one narrator. zero patience.',4000);trLater(2000,n)},
function(n,arm){trType('office',function(){
arm(function(){trCloseGame('office');n()});
trLater(7000,function(){trCutSkip(700)});
})},
function(n){trCut(400);trCard('GREYHALL','6 wings. 1 open. bring ammo.',4000);trLater(2000,n)},
function(n,arm){trType('greyhall',function(){
arm(function(){trCloseGame('greyhall');n()});
trLater(6000,function(){trCutSkip(700)});
})},
function(n){trCut(400);trCard('DEAD AIR','send signals. break the static.',4000);trLater(2000,n)},
function(n,arm){trType('tbb',function(){
trLater(2500,function(){
try{if(typeof tbStart==='function')tbStart(1,1,false)}catch(e){}
try{if(typeof tbAuto==='function')tbAuto(true)}catch(e){}
arm(function(){try{if(typeof tbAuto==='function')tbAuto(false)}catch(e){}trCloseGame('tbb');n()});
trLater(12000,function(){trCutSkip(700)});
});
})},
function(n){trCut(400);trCard('COVE WATCH','do not blink.',4000);trLater(2000,n)},
function(n,arm){trType('cove',function(){
trLater(2000,function(){
try{if(typeof fxWatch==='function')fxWatch(true)}catch(e){}
arm(function(){trCloseGame('cove');n()});
trLater(8000,function(){trCutSkip(700)});
});
})},
function(n){trCut(500);trCard('THE ORIGINAL','there is no cube. there is no game.',4000);trLater(2000,n)},
function(n,arm){trType('play',function(){
arm(function(){try{if(typeof ngExit==='function')ngExit()}catch(e){}n()});
trLater(7000,function(){trCutSkip(700)});
})},
function(n){trCut(400);trCard('THE GROTTO','214 rooms. one crack in the floor.',4000);trLater(2000,n)},
function(n,arm){trType('grotto',function(){
arm(function(){trCloseGame('grotto');n()});
trLater(7000,function(){trCutSkip(700)});
})},
function(n){trCut(400);trCard('THE FLY BRAIN','139,255 neurons. live. not a game.',4000);trLater(2000,n)},
function(n,arm){trType('fly',function(){
arm(function(){trCloseGame('fly');n()});
trLater(7000,function(){trCutSkip(700)});
})},
function(n){trCut(500);trCard('VOIDSCRIPT','the void has a language. watch it type.',3500);trLater(1500,n)},
function(n){trType('void intrude voidstudio',function(){trLater(2500,n)})},
function(n){trType('studio',function(){trLater(1800,n)})},
function(n){trTypeArea('studioCode',vsProgram,function(){trLater(800,n)})},
function(n,arm){try{var rb=trEl('studioRun');if(rb)rb.click()}catch(e){}
arm(function(){n()});
trLater(5000,function(){trCutSkip(700)})},
function(n){try{var se=trEl('studioExit');if(se)se.click()}catch(e){}trLater(1000,n)},
function(n){trType('bgm off',function(){
trCut(500);
trCard('CUBE','a html file. 9 zones. 214 rooms. 83 endings. 30 chapters.',9000);
trLater(9500,function(){trStop(true)});
n();
})}
];
var i=0;
function run(){if(!trActive)return;if(i>=steps.length){trStop(true);return}trSegNew();trCutFn=null;steps[i++](run,function(f){trCutFn=f})}
run();
}
function trStart(){
if(trActive){trStop();return}
try{if(typeof ngActive!=='undefined'&&ngActive){trSay('leave the game first. (the trailer waits. the trailer is patient.)');return}}catch(e){}
trActive=true;trStepN=0;
window._trAudioLock=true;trAudioGuard();
trSay('trailer rolling. (ESC stops. smile.)');
trPlay();
}
function trStop(done){
trActive=false;
window._trAudioLock=false;
try{clearTimeout(trTGuard)}catch(e){}trTGuard=0;
try{for(var i=0;i<trTimers.length;i++)clearTimeout(trTimers[i])}catch(e){}
trTimers=[];
try{var c=trEl('trCard');if(c)c.remove()}catch(e){}
try{var c2=trEl('trCut');if(c2)c2.remove()}catch(e){}
try{if(typeof ngActive!=='undefined'&&ngActive&&typeof ngExit==='function')ngExit()}catch(e){}
try{if(typeof grExit==='function')grExit()}catch(e){}
try{if(typeof flyClose==='function')flyClose()}catch(e){}
try{if(typeof studioOpen!=='undefined'&&studioOpen&&typeof closeStudio==='function')closeStudio()}catch(e){}
if(!done){trCloseGame('office');trCloseGame('greyhall');trCloseGame('tbb');trCloseGame('cove')}
trSay('trailer cut.');
}
if(typeof document!=='undefined'){
document.addEventListener('keydown',function(e){
try{
if(!trActive)return;
if(e.key==='Escape'){trStop()}
}catch(err){}
});
}
window.trailerEnter=trStart;
window.trailerExit=trStop;
window.trDbg=function(){try{return {active:trActive}}catch(e){return {err:String(e)}}};
})();
