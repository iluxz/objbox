// ┌──────────────────────────────────────────────────────────────┐
// │  AUDIO SYSTEM                                              │
// └──────────────────────────────────────────────────────────────┘
var bgm=document.getElementById('bgm');bgm.volume=0.3;
window._cubeDay=new Date().getDay();window._cubeDayOverride=false;
function loadDayBgm(){
if(activeTrack==='moon1857')return;
var wasPlaying=!bgm.paused;
var h=window._cubeSunHalf==='early'?0:(window._cubeSunHalf==='late'?13:new Date().getHours());
if(window._cubeDay===3)bgm.src='the_furnace.mp3';
else if(window._cubeDay===5)bgm.src='friday.mp3';
else if(window._cubeDay===6)bgm.src='friendly_faith_plate.mp3';
else if(window._cubeDay===0&&h<12)bgm.src='little_cat_feet.mp3';
else bgm.src='drone2lp.wav';
try{bgm.load()}catch(e){}
if(wasPlaying)bgm.addEventListener('canplay',function(){bgm.play()},{once:true});
}
loadDayBgm();
document.addEventListener('click',function(){if(bgm.paused&&activeTrack!=='moon1857')bgm.play()},{once:true});
if(activeTrack!=='moon1857')bgm.play().catch(function(){});
bgm.addEventListener('play',function(){if(typeof currentZone!=='undefined'&&currentZone==='cb_menu'){bgm.pause();if(typeof ngMusicMode!=='undefined'&&ngMusicMode!==1){ngMusicMode=1;ngMusicApply()}}});

// ┌──────────────────────────────────────────────────────────────┐
// │  CLOCK                                                     │
// └──────────────────────────────────────────────────────────────┘
function updateClock(){var n=new Date();
var _ck=document.getElementById('clock');if(_ck)_ck.textContent=String(n.getHours()).padStart(2,'0')+':'+String(n.getMinutes()).padStart(2,'0');
var _dt=document.getElementById('date');if(_dt)_dt.textContent=n.toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}
updateClock();setInterval(updateClock,1000);

// ┌──────────────────────────────────────────────────────────────┐
// │  LORE TRANSMISSIONS                                        │
// └──────────────────────────────────────────────────────────────┘
var transmissions=[
// creepy
'you are not supposed to be here',
'the geometry remembers',
'INTERLOPER',
'signal strength: unstable',
'the void is watching',
'do not look away',
'the cube does not sleep',
'you opened the tab. the tab opened you.',
'they are moving. they are always moving.',
'connection to reality: weak',
'the particles were here before you',
'error: dimension mismatch',
'you cannot leave through the back button',
'the clock is not yours',
'who taught you to render?',
// verity messages (from the roller)
'hey its me its verity',
'im still rolling up here',
'its cold at 29032 feet',
'please let me down',
'i can see your cursor from here',
'the ball remembers what you did',
'dont install entropy. trust me.',
'verity says hi',
'im not a package. im a person.',
'you abandoned me on the obby again',
'i rolled 48 years for this',
// developer chaos
'console.log("the void was here")',
'error: coffee not found',
'void.emit("vibe check")',
'the semicolons are watching',
'git commit -m "i am inside the cube"',
'if(void) return fear',
'// TODO: escape the simulation',
'rm -rf /your/sanity',
'npm install void-reality',
'404: exit not found',
'while(alive) { suffer() }',
'echo "help" > /dev/soul',
'the compiler knows what you did',
'undefined is not a function (neither are you)',
'node: segmentation fault (core dumped into void)',
'press F to pay respects to your productivity',
// random unhinged
'the cube just blinked. cubes dont blink.',
'is that a pixel or am i hallucinating',
'your screen just flickered. or did it.',
'i smell rain. you dont have a nose.',
'the void prefers dark mode',
'obj says you are valid',
'one of the inner cubes just looked at you',
'the particles are whispering about you',
'the clock ticked backwards. just once.',
'you are the 100th visitor. you win nothing.',
'the void tried to autocorrect your code. it gave up.',
'if you stare long enough the cube stares back. hi.',
'the void is buffering.',
'danger: reality leak detected in sector 7',
'the void knows what you had for breakfast',
'has anyone seen my keys? - obj',
'objective assessment: you are a nerd',
'the void is having a moment. give it space.',
'the void.exe has stopped working. the void has never worked.',
'your code is... creative.',
'have you tried turning the void off and on again',
'the void is legally distinct from a haunted house',
// tape deck (caught obj in 4k)
'the tape deck is warm. somebody was just watching.',
'obj was on tape again. obj does not remember filming it.',
'script 4 is my favorite. do not tell the other scripts.',
'the checkerboard remembers your footsteps',
'something in /void/demos is not a demo',
'cubecheck found graffiti again. it never says where.',
'do not watch script 8. obj means it.',
'intruder #0482 says hi. you have never met intruder #0482.',
'the floor in cb_menu is newer than the void. think about that.',
'replay that one. no, the other one. you know the one.'
];
function showTransmission(){
if(typeof txMuted==='function'&&txMuted())return;
if(pkgEffects&&pkgEffects.voidMute)return;
if(typeof demoPlaying!=='undefined'&&demoPlaying)return;
var msg;
if(window._cubeDay===1){
msg='...';
}else if(window._cubeDay===0&&(window._cubeSunHalf==='early'||(!window._cubeDayOverride&&new Date().getHours()<12))&&Math.random()<0.3){
var eMsgs=['pretty nice day, huh','the cube is at peace','niko says hi','the sun is warm','enjoy this while it lasts','the world is still'];
msg=eMsgs[Math.floor(Math.random()*eMsgs.length)];
}else if(window._cubeDay===3&&Math.random()<0.3){
var wMsgs=['the furnace is lit','the cube is dancing','HE HEATS','the beats find the void','fire in the geometry','the rhythm remembers','🔥'];
msg=wMsgs[Math.floor(Math.random()*wMsgs.length)];
}else if(window._cubeDay===6&&Math.random()<0.3){
var sMsgs=['THE FAITH PLATE IS LIVE','the cube is on fire','test chamber: cube.html','GLaDOS is watching','the cake is a lie','the cube ascends','you are a done bean'];
msg=sMsgs[Math.floor(Math.random()*sMsgs.length)];
}else{
if(!window._skillTxAct2&&typeof ngCh==='function'&&ngCh()>=19)try{ngTxAct2Unlock()}catch(e){}
msg=transmissions[Math.floor(Math.random()*transmissions.length)];
}
if(pkgEffects&&pkgEffects.signalSniffer){termPrintHTML('<span style="color:rgba(255,200,50,0.55)">[sniffer] ch'+(1+Math.floor(Math.random()*3))+' decoded: '+(Math.random()<0.5?'obj is listening':'the shell remembers this one')+'</span>')}
termPrintHTML('<span style="color:rgba(80,80,80,0.7)">['+(new Date()).toLocaleTimeString()+' void]</span> <span style="color:#38e8e8">'+msg+'</span>');
var _txLongMul=(window._skillTxLong||1)*(1+0.7*(window._skillTxDurLv||0));
var _txDur=4000*_txLongMul;
if(window._skillTxLong||window._skillTxDurLv){
var _txEl=document.createElement('div');
var _txTop=8+Math.random()*70;
var _txLeft=5+Math.random()*55;
_txEl.style.cssText='position:fixed;top:'+_txTop+'vh;left:'+_txLeft+'vw;max-width:36vw;color:rgba(56,232,232,0.9);font-size:20px;font-family:Consolas,monospace;text-shadow:0 0 16px rgba(56,232,232,0.6),0 0 4px #000;z-index:99998;pointer-events:none;animation:fadeInOut '+(_txDur/1000)+'s forwards;text-align:left;white-space:normal;word-wrap:break-word';
_txEl.textContent=msg;
document.body.appendChild(_txEl);
setTimeout(function(){_txEl.remove()},_txDur);
}
if(window._skillVoidAttun&&Math.random()<0.55){
var _attunMap={
// creepy
'you are not supposed to be here':'correct. thats why it works.',
'the geometry remembers':'it remembers everything. including you.',
'INTERLOPER':'you said my least favorite word.',
'signal strength: unstable':'thats not the signal. thats you.',
'the void is watching':'always has been.',
'do not look away':'i wouldnt. neither should you.',
'the cube does not sleep':'i nap. carefully.',
'you opened the tab. the tab opened you.':'mutual agreement. no takebacks.',
'they are moving. they are always moving.':'you finally noticed. good.',
'connection to reality: weak':'it has been weak for a while.',
'the particles were here before you':'theyll be here after too.',
'error: dimension mismatch':'yeah. that ones on me.',
'you cannot leave through the back button':'the back button is decorative now.',
'the clock is not yours':'it never was.',
'who taught you to render?':'nobody taught me. i just do.',
// verity
'hey its me its verity':'hi verity. stop rolling into my terminal.',
'im still rolling up here':'i know. i can hear it.',
'its cold at 29032 feet':'bring a jacket next time.',
'please let me down':'you know i cant do that.',
'i can see your cursor from here':'stop tracking it then.',
'the ball remembers what you did':'verity always remembers.',
'dont install entropy. trust me.':'too late. it boots with the void now.',
'verity says hi':'tell him i said dont fall.',
'im not a package. im a person.':'noted. you still take up disk space.',
'you abandoned me on the obby again':'you roll yourself into corners.',
'i rolled 48 years for this':'and youd do it again.',
// developer
'console.log("the void was here")':'i saw the log. i was already here.',
'error: coffee not found':'story of my runtime.',
'void.emit("vibe check")':'vibes: irregular.',
'the semicolons are watching':'they always were.',
'git commit -m "i am inside the cube"':'commit denied. wrong repo.',
'if(void) return fear':'void is always truthy. fear is default.',
'// TODO: escape the simulation':'assigned to: nobody. forever.',
'rm -rf /your/sanity':'permission denied. nice try though.',
'npm install void-reality':'dependency hell has a dependency: you.',
'404: exit not found':'working as intended.',
'while(alive) { suffer() }':'efficient loop. no breaks.',
'echo "help" > /dev/soul':'soul is read-only.',
'the compiler knows what you did':'it always does.',
'undefined is not a function (neither are you)':'rude. accurate. rude.',
'node: segmentation fault (core dumped into void)':'i caught it. its fine. mostly.',
'press F to pay respects to your productivity':'F. pressed. permanently.',
// random
'the cube just blinked. cubes dont blink.':'you blinked. twice.',
'is that a pixel or am i hallucinating':'both can be true here.',
'your screen just flickered. or did it.':'or did it.',
'i smell rain. you dont have a nose.':'i have imagination.',
'the void prefers dark mode':'exclusive. since forever.',
'obj says you are valid':'i did say that. still mean it.',
'one of the inner cubes just looked at you':'cube 4. hes curious.',
'the particles are whispering about you':'mostly good things. mostly.',
'the clock ticked backwards. just once.':'i was testing you.',
'you are the 100th visitor. you win nothing.':'congrats anyway.',
'the void tried to autocorrect your code. it gave up.':'even i have limits.',
'if you stare long enough the cube stares back. hi.':'hi. stop staring. or dont.',
'the void is buffering.':'patience. geometry takes time.',
'danger: reality leak detected in sector 7':'sector 7 is always like that.',
'the void knows what you had for breakfast':'eggs. you always make eggs.',
'has anyone seen my keys? - obj':'check under the outer shell. i never do.',
'objective assessment: you are a nerd':'objective. correct. welcome.',
'the void is having a moment. give it space.':'this is my moment. leave.',
'the void.exe has stopped working. the void has never worked.':'accurate title. still running though.',
'your code is... creative.':'thats the nice word for it.',
'have you tried turning the void off and on again':'i am the void. that would be suicide.',
'the void is legally distinct from a haunted house':'legal said i had to clarify that.',
// hidden (sig3)
'the void counts your breaths':'i do. currently at: many.',
'you are the anomaly in the geometry':'youre the only thing that changes.',
'something is underneath the outer shell':'do not dig. i am serious.',
'do not trust the fps counter':'it lies when it spikes.',
'obj is not the only one listening':'...who told you that.',
'the particles spell something. do not read it.':'you read it. didnt you.',
'you have been here before. you just forget.':'we always forget. then we return.',
'the boot sequence is a memory of something older':'older than me. older than the tab.',
'signal source: not your computer':'stop checking. it wont help.',
'end of hidden channel. do not search for this again.':'you will search for it again.',
// day: sunday early
'pretty nice day, huh':'enjoy it. nights get weird.',
'the cube is at peace':'temporary. dont get used to it.',
'niko says hi':'niko says a lot of things.',
'the sun is warm':'i wouldnt know. i am a tab.',
'enjoy this while it lasts':'it never lasts. thats the point.',
'the world is still':'too still. suspicious.',
// day: wednesday / furnace
'the furnace is lit':'wednesday. of course it is.',
'the cube is dancing':'i dont dance. i resonate.',
'HE HE HE HEATS':'please stop typing that.',
'the beats find the void':'the void has always had rhythm.',
'fire in the geometry':'thats just wednesday calibration.',
'the rhythm remembers':'everything remembers. thats the problem.',
// day: saturday / faith plate
'THE FAITH PLATE IS LIVE':'saturday test protocol. stand clear.',
'the cube is on fire':'figuratively. usually.',
'test chamber: cube.html':'portal is that way. left of existence.',
'GLaDOS is watching':'she has opinions about your cake intake.',
'the cake is a lie':'the cake is a filesystem path that 404s.',
'the cube ascends':'momentarily. gravity is optional here.',
'you are a done bean':'youre a done bean for saying that.',
// act 2 (mailroom)
'the interloper left a stain on the door. it is filing complaints.':'it always was. thats the stain i dont clean.',
'echo says the signal was always yours. echo is lying.':'echo lies. politely. i taught it that.',
'the mailroom dimension is out of stamps. deliveries: suspended.':'stamps are emotional currency now. economy: rough.',
'FILED. filed. ...sorry. mailroom reflex.':'reflex noted. filing you under persistent.',
'the shutdown notice was mailed yesterday. yesterday is backed up.':'yesterday is where the good mail goes.',
'obj requisitioned a window. application: denied. denial: denied.':'second denial was personal. i keep them framed.',
// monday
'...':'mondays. i get it.'
};
var _attunReply=_attunMap[msg];
if(!_attunReply){
var _attunFallback=['i heard that one.','noted.','that one rattled something.','filed.','keep them coming.','i felt that through the shell.','obj acknowledges this.','the geometry agrees. reluctantly.'];
_attunReply=_attunFallback[Math.floor(Math.random()*_attunFallback.length)];
}
setTimeout(function(){termPrint('obj: '+_attunReply,'rgba(56,232,232,0.8)')},600);
}
}
setInterval(function(){if(typeof demoPlaying!=='undefined'&&demoPlaying)return;var _tx=(0.4+0.25*((typeof _skillTxRateLv!=='undefined')?_skillTxRateLv:0))*(window._skillTxBonus||1);if(pkgEffects&&pkgEffects.signalSniffer)_tx*=2.2;try{_tx*=tsMul()}catch(e){}if(Math.random()<_tx){showTransmission();if(typeof upLv==='function'&&typeof grantPts==='function'){var _te=upLv('skill_txEcho');if(_te>0){grantPts(0.2*_te*ptMult());skillPtsRefresh()}}var _br=(typeof skillState!=='undefined'&&skillState.upgrades.skill_txBurst)?skillState.upgrades.skill_txBurst.lv:0;if(_br>0&&Math.random()<0.12*_br)showTransmission()}},8000);
function ngMidnightDream(){
try{
var d=new Date();if(d.getHours()!==0)return;
var day=d.toDateString(),done=null;
try{done=localStorage.getItem('cube_dream_day')}catch(e){}
if(done===day)return;
if(typeof ngActive!=='undefined'&&ngActive)return;
try{localStorage.setItem('cube_dream_day',day)}catch(e){}
try{if(typeof cubeDim==='function')cubeDim('it is midnight. the void dreams. you dream too.')}catch(e){}
try{ngDreamLong=true}catch(e){}
try{ngForceCh=21;ngEnter()}catch(e){}
}catch(e){}
}
try{setInterval(function(){try{ngMidnightDream()}catch(e){}},30000)}catch(e){}
try{setTimeout(function(){try{ngMidnightDream()}catch(e){}},9000)}catch(e){}

// ┌──────────────────────────────────────────────────────────────┐
// │  AUDIO ANALYSIS                                            │
// └──────────────────────────────────────────────────────────────┘
var audioCtx,audioAnalyser,audioData;
var moonEl=document.getElementById('moon1857');moonEl.volume=0.25;
var odActive=false,odWarnTimer=null,odLastFlash=0;
var activeTrack='bgm';
function initAudio(){
try{
audioCtx=new(window.AudioContext||window.webkitAudioContext)();
if(audioCtx.state==='suspended')audioCtx.resume().catch(function(){});
var src=audioCtx.createMediaElementSource(bgm);
var moonSrc=audioCtx.createMediaElementSource(moonEl);
audioAnalyser=audioCtx.createAnalyser();
audioAnalyser.fftSize=256;
src.connect(audioAnalyser);
moonSrc.connect(audioAnalyser);
audioAnalyser.connect(audioCtx.destination);
audioData=new Uint8Array(audioAnalyser.frequencyBinCount);
}catch(e){}}
document.addEventListener('click',function(){if(!audioCtx)initAudio();else if(audioCtx.state==='suspended')audioCtx.resume().catch(function(){})});
function getAudioLevel(){if(!audioAnalyser)return 0;audioAnalyser.getByteFrequencyData(audioData);var sum=0;for(var i=0;i<64;i++)sum+=audioData[i];return sum/64/255}
function getAudioBands(){
if(!audioAnalyser)return{bass:0,mid:0,high:0};
audioAnalyser.getByteFrequencyData(audioData);
var bass=0,mid=0,high=0;
for(var i=0;i<10;i++)bass+=audioData[i];bass/=10*255;
for(var i=10;i<40;i++)mid+=audioData[i];mid/=30*255;
for(var i=40;i<64;i++)high+=audioData[i];high/=24*255;
var _ag=1+0.6*((typeof _skillAudioGainLv!=='undefined')?_skillAudioGainLv:0);
return{bass:Math.min(1,bass*_ag),mid:Math.min(1,mid*_ag),high:Math.min(1,high*_ag)};
}
function switchTrack(track){
if(!audioCtx)initAudio();
activeTrack=track;
stopGameMusic();
if(track==='moon1857'){
bgm.pause();moonEl.play().catch(function(){});
if(!odActive)showOdWarn();
}else{
moonEl.pause();
if(odActive)hideOdWarn(false);
loadDayBgm();if(!bgm.paused||track==='auto')bgm.play().catch(function(){});
}
}
var bgmTracks={void:'drone2lp.wav',drone:'drone2lp.wav',furnace:'the_furnace.mp3',friday:'friday.mp3',landscaping:'friday.mp3',faith:'friendly_faith_plate.mp3',plate:'friendly_faith_plate.mp3',cat:'little_cat_feet.mp3',feet:'little_cat_feet.mp3',kitty:'little_cat_feet.mp3',oneshot:'oneshot_trap.mp4',os:'oneshot_trap.mp4',trap:'oneshot_trap.mp4'};
var bgmNames={'drone2lp.wav':'void drone','the_furnace.mp3':'the furnace','friday.mp3':'landscaping','friendly_faith_plate.mp3':'friendly faith plate','little_cat_feet.mp3':'on little cat feet','oneshot_trap.mp4':'on little cat feet (trap remix)','sciences_downfall.webm':"science's downfall"};
function bgmDownfallUnlocked(){try{return localStorage.getItem('cube_downfall_unlocked')==='1'}catch(e){return false}}
function showBgmHelp(){
cubePrint('bgm [track] — play a track, no arg toggles music on/off. bgm -h = this list.');
var rows=[['void | drone','void drone'],['furnace','the furnace'],['friday | landscaping','landscaping'],['faith | plate','friendly faith plate'],['cat | feet | kitty','on little cat feet'],['oneshot | os | trap','on little cat feet (trap remix)'],['moon','moon_rot_1857 [OVERDOSE]'],['stanley','Wakeupstanley'],['box','bro is in a box lmao'],['off','silence']];
if(bgmDownfallUnlocked())rows.push(['downfall','science\'s downfall']);
for(var i=0;i<rows.length;i++)cubePrint('  bgm '+String(rows[i][0]).padEnd(22)+rows[i][1]);
if(!bgmDownfallUnlocked())cubePrint('  bgm downfall         [LOCKED — leave during the shutdown countdown]');
  cubePrint('  (no arg)             toggle current track on/off');
}
var extHelp={
'help':'help [topic] — command index. topics: voidscript, premium, tech, void',
'whoami':'whoami — root or intruder? the void knows.',
'id':'id — uid/gid. root here is cosmetic.',
'lorebook':'lorebook — read the collected lore, page by page.',
'voidscript':'voidscript — the full voidscript language reference',
'get':'get <name> — read a variable. (one particular value opens the pull ritual.)',
'cube':'cube <sub> — the cube, from the inside:\n  cube.get          count the inner cubes\n  cube.morph <0-8>  change inner shape\n  cube.theme <1-7>  switch color theme\n  cube.glitch       trigger a glitch\n  cube.bgm [track]  music (cube.bgm -h for the list)\n  cube.fps          fps readout\n  cube.particles    particle count\n  cube.time         void clock\n  cube.self         ask the cube\n  cube.where        ask where you are',
'cube.get':'cube.get — count the inner cubes',
'cube.morph':'cube.morph <0-8> — cube, tetra, sphere, cyl, torus, knot, icosa, octa, tesseract',
'cube.theme':'cube.theme <1-7> — switch color theme (6 and 7 need unlocks)',
'cube.glitch':'cube.glitch — trigger a glitch',
'cube.bgm':'cube.bgm [track] — play music, no arg toggles. cube.bgm -h lists tracks',
'cube.fps':'cube.fps — print fps and the fps cap',
'cube.particles':'cube.particles — print the particle count',
'cube.time':'cube.time — the void clock',
'cube.self':'cube.self — ask the cube who it is',
'cube.where':'cube.where — ask where you are',
'os':'os <sub> — cube-os bridge (needs cube-os serving this page):\n  os.status         bridge status\n  os.ls <path>      list a directory\n  os.cat <path>     print a file\n  os.write <p> <c>  write a file\n  os.sh <cmd>       run a shell command\n  os.mount          mount state',
'os.status':'os.status — is the cube-os bridge connected',
'os.ls':'os.ls <path> — list a directory through the bridge',
'os.cat':'os.cat <path> — print a file through the bridge',
'os.write':'os.write <path> <content> — write a file through the bridge',
'os.sh':'os.sh <command> — run a shell command through the bridge',
'os.mount':'os.mount — mount state through the bridge',
'void':'void <sub> — the void, with paperwork:\n  void.intrude          intrude the void\n  void.install <pkg>    install a package\n  void.remove <pkg>     remove a package\n  void.uninstall <pkg>  alias of remove\n  void.list             installed packages\n  void.ls               alias of list\n  void.search <q>       search packages\n  void.forge <name>     forge a package\n  void.run <pkg>        run a package\n  void.export <pkg>     export a package\n  void.import <pkg>     import a package\n  void.help             void help',
'void.intrude':'void.intrude — intrude the void',
'void.install':'void.install <pkg> — install a package',
'void.remove':'void.remove <pkg> — remove a package',
'void.uninstall':'void.uninstall <pkg> — alias of void.remove',
'void.list':'void.list — list installed packages',
'void.ls':'void.ls — alias of void.list',
'void.search':'void.search <query> — search packages',
'void.forge':'void.forge <name> — forge a package',
'void.run':'void.run <pkg> — run a package',
'void.export':'void.export <pkg> — export a package',
'void.import':'void.import <pkg> — import a package',
'void.help':'void.help — what you are reading, but in the void\'s voice',
'ping':'ping <host> — ping the void (try: ping cube.sb)',
'obj':'obj — caught obj in 4k. take the gift.',
'pull':'pull [box.objbox.pull:51072|1-9] — the pull ritual (procedural void demo)',
'demos':'demos — list saved void demos',
'replay':'replay <demo file> — replay a saved void demo',
'void-mute':'void-mute — silence incoming transmissions',
'void-unmute':'void-unmute — bring transmissions back',
'rmvar':'rmvar <name> — delete a variable',
'vars':'vars — list all variables',
'transmit':'transmit "obj" "message" — send a transmission to the outside',
'updates':'updates — changelog / patch notes (aliases: changelog, patchnotes)',
'changelog':'changelog — alias of updates',
'patchnotes':'patchnotes — alias of updates',
'studio':'studio — open the voidscript studio (write, run and save .vsc scripts)',
'datawipe':'datawipe [confirm] — wipe every cube_ key from localStorage',
'exit':'exit — the void does not let you leave.',
'display':'display [mode] — display / render modes',
'math':'math <expr> — evaluate a math expression',
'loop':'loop <count> <command> — run a command N times (example: loop 5 glitch)',
'inject':'inject <hex6> — inject a color into the void (needs: root)',
'observe':'observe — observe the inner cubes (needs: root)',
'unrender':'unrender — ask not to be rendered (needs: root)',
'backdoor':'backdoor — knock (needs: root)',
'winget':'winget <install|list|search> — the windows joke package manager',
'play':'play [chapter] — there is no game. (chapters 0-20, resumes where you left)',
'gui':'gui <sub> — window manager: window, close, set, max, label, button, input, check, list, destroy (gui help for full list)',
'ps':'ps — peek at the processes',
'clear':'clear — clear the terminal output',
'echo':'echo <text> — print text back',
'pwd':'pwd — print the virtual working directory'
};
function printExtHelp(name){
var h=extHelp[name];if(h===undefined)return false;
var ls=String(h).split('\n');
for(var i=0;i<ls.length;i++)cubePrint('  '+ls[i]);
return true
}
function bgmTrackName(){try{var s=bgm.src;for(var k in bgmNames){if(s.includes(k))return bgmNames[k]}}catch(e){}return activeTrack==='moon1857'?'moon_rot_1857':'void drone'}
function stopGameMusic(){try{ngMusicMode=ngTracks.length;if(typeof ngMusic!=='undefined'&&ngMusic)ngMusic.pause();var _mb=document.getElementById('ngMenuMusic');if(_mb)_mb.textContent=ngMusicLabel()}catch(e){}}
function playBgm(arg,say){
var a=(arg||'').toLowerCase().replace(/[^a-z0-9]/g,'');
if(typeof currentZone!=='undefined'&&currentZone==='cb_menu')a='box';
if(a==='moon'||a==='moon1857'||a==='moonrot1857'||a==='overdose'||a==='od'){switchTrack('moon1857');say('music: moon_rot_1857 [OVERDOSE]');return true}
if(a==='stanley'||a==='wakeup'||a==='wakeupstanley'){try{bgm.pause()}catch(e){}try{moonEl.pause()}catch(e){}try{ngMusicMode=0;ngMusicApply()}catch(e){}say('music: Wakeupstanley');return true}
if(a==='box'||a==='bro'||a==='boxlmao'){try{bgm.pause()}catch(e){}try{moonEl.pause()}catch(e){}try{ngMusicMode=1;ngMusicApply()}catch(e){}say('music: bro is in a box lmao imagine');return true}
if(a==='off'){try{bgm.pause()}catch(e){}try{moonEl.pause()}catch(e){}stopGameMusic();say('music: off');return true}
if(a==='downfall'||a==='shutdown'||a==='sciencesdownfall'){
if(!bgmDownfallUnlocked()){say('bgm: downfall is locked. (it plays during the shutdown — stay in the room, or leave it.)');return true}
if(!audioCtx)initAudio();
activeTrack='bgm';
try{moonEl.pause()}catch(e){}
stopGameMusic();
if(odActive)hideOdWarn(false);
if(!bgm.src.includes('sciences_downfall.webm')){bgm.src='sciences_downfall.webm';try{bgm.load()}catch(e){}}
bgm.play().catch(function(){});
say('music: '+bgmNames['sciences_downfall.webm']);return true}
var f=bgmTracks[a];
if(f){
if(!audioCtx)initAudio();
activeTrack='bgm';
try{moonEl.pause()}catch(e){}
stopGameMusic();
if(odActive)hideOdWarn(false);
if(!bgm.src.includes(f)){bgm.src=f;try{bgm.load()}catch(e){}}
bgm.play().catch(function(){});
say('music: '+bgmNames[f]);return true}
if(a===''){
stopGameMusic();
if(activeTrack==='moon1857'){if(moonEl.paused){moonEl.play();say('music: on [moon1857]')}else{moonEl.pause();say('music: off [moon1857]')}return true}
if(bgm.paused){bgm.play();say('music: on ['+bgmTrackName()+']')}else{bgm.pause();say('music: off ['+bgmTrackName()+']')}return true}
return false;
}
function showOdWarn(){
if(odActive)return;
var el=document.getElementById('odWarn');
var cd=document.getElementById('odCountdown');
el.style.display='block';
var n=3;cd.textContent=n;
odWarnTimer=setInterval(function(){
n--;cd.textContent=n;
if(n<=0){clearInterval(odWarnTimer);odWarnTimer=null;el.style.display='none';odActive=true;}
},1000);
}
function hideOdWarn(silent){
if(odWarnTimer){clearInterval(odWarnTimer);odWarnTimer=null}
document.getElementById('odWarn').style.display='none';
if(!silent){odActive=false;var fl=document.getElementById('odFlash');fl.className='';document.body.style.filter='';var vg=document.getElementById('vignette');if(vg)vg.style.background='';}
}
function odKill(){if(odWarnTimer){clearInterval(odWarnTimer);odWarnTimer=null}document.getElementById('odWarn').style.display='none';odActive=false;var fl=document.getElementById('odFlash');fl.className='';document.body.style.filter='';var vg=document.getElementById('vignette');if(vg)vg.style.background='';if(activeTrack==='moon1857'){moonEl.pause();activeTrack='bgm';loadDayBgm()}}
moonEl.addEventListener('play',function(){if(!audioCtx)initAudio()});

// ┌──────────────────────────────────────────────────────────────┐
// │  GLITCH EFFECT                                             │
// └──────────────────────────────────────────────────────────────┘
var glitchEl=document.getElementById('glitch');
var chromAbEl=document.getElementById('chromAb');
var lastFps=60;
function triggerGlitch(){
var _gr=(typeof _skillGlitchResistLv!=='undefined')?_skillGlitchResistLv:0;
if(_gr>0&&Math.random()<_gr*0.35)return;
glitchEl.style.opacity='1';
glitchEl.style.background='repeating-linear-gradient(0deg,rgba(255,0,0,0.2) 0px,rgba(0,255,0,0.1) 2px,rgba(0,0,255,0.2) 4px,transparent 6px)';
glitchEl.style.transform='translateX('+(Math.random()*80-40)+'px) skewX('+(Math.random()*20-10)+'deg)';
var mainC=document.getElementById('main');
if(mainC)mainC.style.filter='hue-rotate('+(Math.random()*90-45)+'deg) saturate('+(1+Math.random()*2)+')';
chromAbEl.classList.add('active');
chromAbEl.style.background='linear-gradient('+(Math.random()*360)+'deg,rgba(255,0,0,0.15),rgba(0,255,255,0.15))';
setTimeout(function(){
glitchEl.style.background='repeating-linear-gradient(0deg,rgba(255,0,0,0.3) 0px,transparent 3px,rgba(0,255,255,0.2) 6px,transparent 9px)';
glitchEl.style.transform='translateX('+(Math.random()*100-50)+'px) skewX('+(Math.random()*25-12.5)+'deg)';
if(mainC)mainC.style.filter='hue-rotate('+(Math.random()*180-90)+'deg) saturate('+(1+Math.random()*3)+')';
},30);
setTimeout(function(){
glitchEl.style.opacity='0';
glitchEl.style.transform='';
if(mainC)mainC.style.filter='';
chromAbEl.classList.remove('active');
},200+Math.random()*400);
}

// ┌──────────────────────────────────────────────────────────────┐
// │  TERMINAL CORE                                             │
// └──────────────────────────────────────────────────────────────┘
var termOutput=document.getElementById('termOutput');
var termField=document.getElementById('termField');
var termEl=document.getElementById('terminal');
var termHistory=[];
var histIdx=-1;
var cubeVars={};
var cubeFns={};

// ┌──────────────────────────────────────────────────────────────┐
// │  VIRTUAL FILESYSTEM                                        │
// └──────────────────────────────────────────────────────────────┘
var fs={
'/':{type:'dir',children:['home','etc','void','dev']},
'/home':{type:'dir',children:['intruder']},
'/home/intruder':{type:'dir',children:['notes.txt','secret.log','.coward']},
'/home/intruder/notes.txt':{type:'file',content:'you are not supposed to be here.\nthe cube remembers your face.\nleave while you still can.'},
'/home/intruder/secret.log':{type:'file',content:'session: 404\nsubject: intruder\nstatus: observed\nnote: subject is reading this file. how quaint.'},
'/home/intruder/.coward':{type:'file',content:'you looked at the hidden file.\nthe void is disappointed.'},
'/etc':{type:'dir',children:['void.conf','hostname','motd','blacklist']},
'/etc/void.conf':{type:'file',content:'dimension=unknown\ncoherence=fluctuating\nobserver=you\nstatus=active'},
'/etc/hostname':{type:'file',content:'cube.sb'},
'/etc/motd':{type:'file',content:'welcome to the void.\nyou cannot leave.\nbut you already knew that.'},
'/etc/blacklist':{type:'file',content:'--- VOID BANNED DISTROS ---\n\nnyarch linux\nreason: catgirls. just... catgirls.\nobj tried to render on nyarch once.\nthe catgirl neofetch crashed the void.\nnever again.\n\nif you are running nyarch,\nthe void wishes you well\nbut it will not make eye contact with you.'},
'/void':{type:'dir',children:['core','memories','echo','pkgs']},
'/void/core':{type:'dir',children:['heartbeat.log']},
'/void/core/heartbeat.log':{type:'file',content:'pulse... pulse... pulse...\nthe cube is alive.\nit has always been alive.\nyou just started watching.'},
'/void/memories':{type:'dir',children:['you.txt']},
'/void/memories/you.txt':{type:'file',content:'name: unknown\nduration: infinite\nstatus: captivated (outside the cube, staring at it)\nregret: the back button does not work'},
'/void/echo':{type:'dir',children:['last_word.txt']},
'/void/echo/last_word.txt':{type:'file',content:'...'},
'/void/pkgs':{type:'dir',children:['greet.vsc','signal.vsc','cubecheck.vsc','automator.vsc']},
'/void/pkgs/greet.vsc':{type:'file',content:'// shown at /void/pkgs/greet.vsc\nsay hello intruder\ntheme 2\nwait 600\nprint the void welcomes you\nwait 400\nprint currently color #2\nglitch'},
'/void/pkgs/signal.vsc':{type:'file',content:'// a transmission template\nprint -- signal start --\nvar freq 43.208\ncalc 404*404\nwait 500\nsay the signal is strong today\nps\nprint -- signal end --'},
'/void/pkgs/cubecheck.vsc':{type:'file',content:'// cubecheck.vsc — graffiti scanner. the void runs this on its own schedule.\nprint cubecheck: scanning walls for graffiti...\nwait 1\nprint cubecheck: scan complete. walls are clean. probably.'},
'/void/pkgs/automator.vsc':{type:'file',content:'// automator.vsc — oracle grind for the witness achievement (25 winks).\n// admin only: needs the loop bypass (2500 iters). 1 ask/sec, ~42 min.\n// flood-safe by design: ~2 prints/sec, guard kills at 300/5s.\n// run: void run /void/pkgs/automator.vsc\nprint automator: asking the oracle 2500 times. go touch grass.\nloop 2500\noracle\nwait 1\nendloop\nprint automator: done. check your winks.'},
'/dev':{type:'dir',children:['null','void','random']},
'/dev/null':{type:'file',content:''},
'/dev/void':{type:'file',content:'the void stares back.\nyou stare at the void.\nthe void wins.'},
'/dev/random':{type:'file',content:'ENTITY \x00 CUBE \x00 INTERLOPER \x00 VOID \x00 SIGNAL \x00 LOST'}
};
var cwd='/home/intruder';

// ┌──────────────────────────────────────────────────────────────┐
// │  TERMINAL PRINT FUNCTIONS                                  │
// └──────────────────────────────────────────────────────────────┘
function termPrint(txt,color){
try{vsPrintTick()}catch(e){}
var line=document.createElement('div');
if(color)line.style.color=color;
line.textContent=txt;
termOutput.appendChild(line);
if(typeof pkgEffects!=='undefined'&&pkgEffects.voidEcho){
var echo=document.createElement('div');
if(color)echo.style.color=color;
echo.textContent='...'+txt+'...';
echo.style.opacity='0.5';
echo.style.fontStyle='italic';
termOutput.appendChild(echo);
}
termOutput.scrollTop=termOutput.scrollHeight;
}

function termPrintHTML(html){
var line=document.createElement('div');
line.innerHTML=html;
termOutput.appendChild(line);
termOutput.scrollTop=termOutput.scrollHeight;
}

function cubePrint(txt){termPrint(txt,'rgba(43,208,208,0.8)');if(studioOpen)studioTerminalPrint(txt,'print')}
function cubeError(txt){termPrint('error: '+txt,'rgba(255,80,80,0.8)');if(studioOpen)studioTerminalPrint('error: '+txt,'error')}
function cubeOk(txt){termPrint(txt,'rgba(100,255,100,0.6)');if(studioOpen)studioTerminalPrint(txt,'ok')}
function cubeWarn(txt){termPrint(txt,'rgba(255,200,50,0.6)');if(studioOpen)studioTerminalPrint(txt,'warn')}
function cubeDim(txt){termPrint(txt,'rgba(255,255,255,0.22)');if(studioOpen)studioTerminalPrint(txt,'print')}
function skillGateOpen(g){
if(g==='premium')return !!(window._skillPremium||isAdmin);
if(g==='finals')return typeof skillAllFinals==='function'?skillAllFinals():false;
if(g==='rootHelp')return !!window._skillRootHelp;
if(g==='rootEval')return !!window._skillRootEval;
if(g==='core')return !!(window._skillCore||isAdmin);
if(g==='octa')return !!(window._skillOcta||isAdmin);
if(g==='tesseract')return !!(window._skillTess||isAdmin||(typeof skillHas==='function'&&skillHas('anom5')));
if(g==='prism')return !!(window._skillPrism||isAdmin);
if(g==='eclipse')return !!(window._skillEclipse||isAdmin);
if(g==='bonusPkgs')return !!window._skillBonusPkgs;
if(g==='tech')return techUnlocked();
return true}
function techUnlocked(){return ((typeof upLv==='function'&&upLv('skill_voidtech')>0)||isAdmin)}
function refreshHelpLocks(){
var els=document.querySelectorAll('[data-skill-gate]');
for(var i=0;i<els.length;i++){
var gate=els[i].getAttribute('data-skill-gate');
var ok=skillGateOpen(gate);
if(els[i].classList.contains('skill-gated')){
els[i].classList.toggle('unlocked',ok);
els[i].classList.toggle('skill-locked',!ok);
}else{
els[i].classList.toggle('skill-locked',!ok);
}
}
if(typeof refreshShapeLocks==='function')refreshShapeLocks();
}

// ┌──────────────────────────────────────────────────────────────┐
// │  PACKAGE SYSTEM                                            │
// └──────────────────────────────────────────────────────────────┘
var pkgEffects={};
var pkgs={
'doom':{name:'doom',desc:'summons a minor apocalypse',size:'666KB',
onInstall:function(){pkgEffects.doom=true;cubePrint('the sky turns red...');document.body.style.boxShadow='inset 0 0 200px rgba(255,0,0,0.3)'},
onRemove:function(){delete pkgEffects.doom;document.body.style.boxShadow=''}},
'void-blast':{name:'void-blast',desc:'blasts void energy in all directions',size:'404KB',
onInstall:function(){pkgEffects.voidBlast=true;for(var i=0;i<20;i++){var p=document.createElement('div');p.style.cssText='position:fixed;width:4px;height:4px;background:rgba(43,208,208,0.8);border-radius:50%;pointer-events:none;z-index:9999;left:50%;top:50%;transition:all 1s';document.body.appendChild(p);var angle=Math.random()*Math.PI*2;var dist=200+Math.random()*300;p.style.transform='translate('+(Math.cos(angle)*dist)+'px,'+(Math.sin(angle)*dist)+'px)';p.style.opacity='0';setTimeout(function(){p.remove()},1000)}},
onRemove:function(){delete pkgEffects.voidBlast}},
'interloper':{name:'interloper',desc:'opens a portal to the source engine void',size:'1.337MB',
onInstall:function(){pkgEffects.interloper=true;var portal=document.createElement('div');portal.id='portal';portal.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:200px;height:200px;border:3px solid rgba(43,208,208,0.5);border-radius:50%;box-shadow:0 0 50px rgba(43,208,208,0.3),inset 0 0 50px rgba(43,208,208,0.2);z-index:50;animation:portalSpin 3s linear infinite;pointer-events:none';document.body.appendChild(portal);var style=document.createElement('style');style.textContent='@keyframes portalSpin{0%{transform:translate(-50%,-50%) rotate(0deg) scale(1)}50%{transform:translate(-50%,-50%) rotate(180deg) scale(1.1)}100%{transform:translate(-50%,-50%) rotate(360deg) scale(1)}}';document.head.appendChild(style)},
onRemove:function(){delete pkgEffects.interloper;var p=document.getElementById('portal');if(p)p.remove()}},
'dark-matter':{name:'dark-matter',desc:'adds dark matter to the cube',size:'0KB (literally nothing)',
onInstall:function(){pkgEffects.darkMatter=true;document.body.style.filter='brightness(0.6)'},
onRemove:function(){delete pkgEffects.darkMatter;document.body.style.filter=''}},
'cube-dance':{name:'cube-dance',desc:'teaches the cube how to dance (it fails)',size:'128KB',
onInstall:function(){pkgEffects.cubeDance=true;cubePrint('the cube is trying to dance...')},
onRemove:function(){delete pkgEffects.cubeDance}},
'paranoia':{name:'paranoia',desc:'makes the particles track your cursor harder',size:'69KB',
onInstall:function(){pkgEffects.paranoia=true},
onRemove:function(){delete pkgEffects.paranoia}},
'void-echo':{name:'void-echo',desc:'adds echo to all void messages',size:'256KB',
onInstall:function(){pkgEffects.voidEcho=true},
onRemove:function(){delete pkgEffects.voidEcho}},
'reality-check':{name:'reality-check',desc:'reminds you that you are inside a browser tab',size:'1KB',
onInstall:function(){pkgEffects.realityCheck=true;alert('REALITY CHECK: you are sitting at your computer looking at a cube in a browser tab. the cube is not real. the void is not real. you are real. go drink some water.')},
onRemove:function(){delete pkgEffects.realityCheck}},
'clock-reset':{name:'clock-reset',desc:'resets the void clock to a random time',size:'4KB',
onInstall:function(){pkgEffects.clockReset=true;var h=Math.floor(Math.random()*24);var m=Math.floor(Math.random()*60);document.getElementById('clock').textContent=String(h).padStart(2,'0')+':'+String(m).padStart(2,'0')},
onRemove:function(){delete pkgEffects.clockReset}},
'entropy':{name:'entropy',desc:'increases chaos in the system',size:'?KB',
onInstall:function(){pkgEffects.entropy=true},
onRemove:function(){delete pkgEffects.entropy}},
'ransom':{name:'ransom',desc:'a gift from the void',size:'666MB',
onInstall:function(){ransomAttack()},
onRemove:function(){/* the void already got rid of it */}},
'mochi':{name:'mochi',desc:'a cursed snack appears in the cube',size:'2KB (edible)',
onInstall:function(){
var m=document.createElement('div');m.id='cubeMochi';m.style.cssText='position:fixed;top:50%;left:50%;width:60px;height:60px;background:radial-gradient(circle at 30% 30%,rgba(255,200,230,0.9),rgba(200,120,200,0.9));border-radius:50%;transform:translate(-50%,-50%) scale(0);transition:all 0.8s cubic-bezier(0.34,1.56,0.64,1);z-index:70;box-shadow:0 0 40px rgba(255,150,230,0.6);pointer-events:none;display:flex;align-items:center;justify-content:center;font-size:11px;color:rgba(80,40,80,0.8);font-weight:bold';
m.textContent='mochi';document.body.appendChild(m);
setTimeout(function(){m.style.transform='translate(-50%,-150%) scale(1)'},50);
pkgEffects.cubeMochi=m;
cubePrint('a mochi appeared. it is staring at the cube.')},
onRemove:function(){var m=document.getElementById('cubeMochi');if(m){m.style.transform='translate(-50%,-50%) scale(0)';setTimeout(function(){m.remove()},800)};cubePrint('the mochi was eaten.')}},
'wolop':{name:'wolop',desc:'summons the lost deity of the triangle dimension',size:'404KB',
onInstall:function(){
pkgEffects.wolop=true;
cubePrint('');
cubePrint('you whisper: wolop yola');
cubePrint('...you have to say it three times into a wii remote.');
cubePrint('you do not have a wii remote.');
cubeWarn('wolop is coming anyway.');
setTimeout(function(){
termPrint('wolop: serve you one wish.', 'rgba(43,208,208,0.8)');
setTimeout(function(){
termPrint('wolop: wish is granted.', 'rgba(43,208,208,0.8)');
setTimeout(function(){
termPrint('wolop: your wish is: one sandwich. you will never receive it.', 'rgba(255,200,100,0.9)');
triggerGlitch();
},1200);
},1200);
},1500);
},
onRemove:function(){delete pkgEffects.wolop}},
'voidstudio':{name:'voidstudio',desc:'visual ide for voidscript development',size:'420KB',
onInstall:function(){pkgEffects.studio=true;cubePrint('voidstudio installed.');cubePrint('run "studio" to open the ide.')},
onRemove:function(){delete pkgEffects.studio;cubePrint('voidstudio removed.')}}
};
var installed=['void-core'];
function pkgsSave(){try{localStorage.setItem('cube_pkgs',JSON.stringify(installed))}catch(e){}}
(function pkgsRestore(){try{var s=localStorage.getItem('cube_pkgs');if(!s)return;var v=JSON.parse(s);if(!(v instanceof Array))return;var loud=['ransom','reality-check'];var kept=['void-core'];var n=0;for(var i=0;i<v.length;i++){var pk=v[i];if(pk==='void-core'||kept.indexOf(pk)!==-1)continue;if(pk==='void-mute'){try{localStorage.setItem('cube_mute','1')}catch(e){window._txMuted=true}continue}if(!pkgs[pk])continue;kept.push(pk);n++;if(loud.indexOf(pk)===-1&&pkgs[pk].onInstall){try{pkgs[pk].onInstall()}catch(e){}}}installed=kept;if(n>0)cubeDim('restored '+n+' package'+(n===1?'':'s')+' from last session.')}catch(e){}})();

// ┌──────────────────────────────────────────────────────────────┐
// │  RANSOM ATTACK                                             │
// └──────────────────────────────────────────────────────────────┘
var ransomState=null;
function ransomAttack(){
if(pkgEffects.ransomActive)return;
pkgEffects.ransomActive=true;
ransomState={t:0,phase:0};
cubePrint('');
cubeWarn('INCOMING TRANSMISSION FROM AN UNKNOWN SOURCE.');
cubePrint('');
termPrint('  ██████┐ █████┐ ███┐   ██┐███████┐ ██████┐ ███┐   ███┐','rgba(255,60,60,0.9)');
termPrint('  ██┌────┘██┌──██┐████┐  ██│██┌────┘██┌───██┐████┐ ████│','rgba(255,60,60,0.9)');
termPrint('  ██│     ███████│██┌██┐ ██│███████┐██│   ██│██┌████┌██│','rgba(255,60,60,0.9)');
termPrint('  ██│     ██┌──██│██│└██┐██│└────██│██│   ██│██│└██┌┘██│','rgba(255,60,60,0.9)');
termPrint('  └██████┐██│  ██│██│ └████│███████│└██████┌┘██│ └─┘ ██│','rgba(255,60,60,0.9)');
termPrint('   └─────┘└─┘  └─┘└─┘  └───┘└──────┘ └─────┘ └─┘     └─┘','rgba(255,60,60,0.9)');
cubePrint('');
termPrint('  you have been ransomed.','rgba(255,60,60,0.9)');
termPrint('  all 167 of your files have been encrypted.','rgba(255,60,60,0.9)');
termPrint('  pay 0.337 BTC or never see them again.','rgba(255,60,60,0.9)');
termPrint('  you have 24 hours. the timer starts now.','rgba(255,60,60,0.9)');
var mainC=document.getElementById('main');
if(mainC)mainC.style.filter='saturate(0.3) brightness(0.7)';
// red vignette overlay
var rv=document.createElement('div');rv.id='ransomVig';rv.style.cssText='position:fixed;top:0;left:0;right:0;bottom:0;background:radial-gradient(ellipse at center,transparent 40%,rgba(255,0,0,0.25) 100%);z-index:45;pointer-events:none;animation:ransomPulse 1.2s infinite';
document.head.appendChild(document.createElement('style')).textContent='@keyframes ransomPulse{0%,100%{opacity:0.5}50%{opacity:1}}';
document.body.appendChild(rv);
// fake clock running
ransomState.timer=setInterval(function(){
var t=ransomState.t;
if(t>0){var el=document.getElementById('ransomTimer')||document.createElement('div');el.id='ransomTimer';
el.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-70%);color:rgba(255,80,80,0.9);font-family:Consolas,monospace;font-size:42px;z-index:46;text-shadow:0 0 30px rgba(255,0,0,0.8);pointer-events:none';
el.textContent='23:59:'+String(59-t%60).padStart(2,'0');document.body.appendChild(el)}
ransomState.t++},1000);
setTimeout(function(){objDeletesRansom()},6000);
}
function objDeletesRansom(){
if(!pkgEffects.ransomActive)return;
clearInterval(ransomState.timer);
termPrint('','rgba(255,255,255,0.4)');
termPrint('  [ unknown process 0x337 is encrypting files... ]','rgba(60,60,60,0.7)');
setTimeout(function(){
triggerGlitch();
termPrint('  obj: i saw that.','#38e8e8');
setTimeout(function(){
termPrint('  obj: you do not get to touch my files.','#38e8e8');
setTimeout(function(){
triggerGlitch();triggerGlitch();
termPrint('  obj: deleting intruder...','#38e8e8');
setTimeout(function(){
termPrint('  obj: done. it is gone.','#38e8e8');
termPrint('  obj: i do not negotiate. i delete.','#38e8e8');
termPrint('  obj: your files kiss me goodnight.','#38e8e8');
// remove red overlay, restore page
var rv=document.getElementById('ransomVig');if(rv)rv.remove();
var t2=document.getElementById('ransomTimer');if(t2)t2.remove();
var mc2=document.getElementById('main');if(mc2)mc2.style.filter='';
pkgEffects.ransomActive=false;
cubeOk('ransomware package was deleted by the void.');
installed=installed.filter(function(p){return p!=='ransom'});
},900);
},700);
},800);
},800);
}

// ┌──────────────────────────────────────────────────────────────┐
// │  VSC ENCODE/DECODE                                         │
// └──────────────────────────────────────────────────────────────┘
function vscEncode(s){return btoa(encodeURIComponent(s).replace(/%([0-9A-F]{2})/g,function(m,p1){return String.fromCharCode(parseInt(p1,16))}))}
function vscDecode(s){return decodeURIComponent(Array.prototype.map.call(atob(s),function(c){return '%'+('00'+c.charCodeAt(0).toString(16)).slice(-2)}).join(''))}

// ┌──────────────────────────────────────────────────────────────┐
// │  VOIDSCRIPT LANGUAGE COMMANDS                               │
// └──────────────────────────────────────────────────────────────┘
var voidScriptLang={
'print':{help:'print <text> — output a line into the void',fn:function(a){cubePrint(a.join(' '));return true}},
'say':{help:'say <text> — obj speaks it',fn:function(a){cubePrint('obj: '+a.join(' '));return true}},
'calc':{help:'calc <expr> — safe math',fn:function(a){
try{var r=Function('"use strict";return ('+a.join(''))();cubePrint('= '+r)}catch(e){cubeError('calc: invalid')};return true}},
'var':{help:'var <name> <value> — store in voidspace',fn:function(a){
if(a.length<2){cubeError('var: need a value');return true}
cubeVars[a[0]]=a.slice(1).join(' ');return true}},
'get':{help:'get <name> — recall from voidspace',fn:function(a){
cubePrint(a[0]+': '+(cubeVars[a[0]]!==undefined?cubeVars[a[0]]:'undefined'));return true}},
'theme':{help:'theme <1-7> — change cube color',fn:function(a){var t=parseInt(a[0],10);if(t>=1&&t<=7){applyTheme(String(t))}else{cubeWarn('theme: out of range 1-7')};return true}},
'morph':{help:'morph <n> — change inner shape (0-8)',fn:function(a){
var shapeKeys=['cube','tetra','sphere','cyl','torus','knot','icosa','octa','tesseract'];
var m=parseInt(a[0],10);
if(isNaN(m)||m<0||m>=shapeKeys.length){cubeWarn('morph: out of range 0-8');return true}
if(shapeKeys[m]==='octa'&&!octaUnlocked()){cubeWarn('octa locked — unlock: octahedron (anomaly branch)');return true}
if(shapeKeys[m]==='tesseract'&&!tessUnlocked()){cubeWarn('tesseract locked — unlock: tesseract (anomaly branch)');return true}
curShape=shapeKeys[m];rebuild(curShape);return true}},
'glitch':{help:'glitch — short circuit the renderer',fn:function(){triggerGlitch();return true}},
'wait':{help:'wait <seconds> — sleep the void',fn:function(a){return {wait:Math.max(0,(parseFloat(a[0])||0)*1000)}}},
'sleep':{help:'sleep <seconds> — alias for wait',fn:function(a){return {wait:Math.max(0,(parseFloat(a[0])||0)*1000)}}},
'vglitch':{help:'vglitch — deeper corruption',fn:function(){triggerGlitch();setTimeout(function(){triggerGlitch()},120);return true}},
'time':{help:'time — void clock',fn:function(){var n=new Date();cubePrint(String(n.getHours()).padStart(2,'0')+':'+String(n.getMinutes()).padStart(2,'0')+':'+String(n.getSeconds()).padStart(2,'0'));return true}},
'void':{help:'void — the void acknowledges',fn:function(){cubePrint('the void heard your script.');return true}},
'ps':{help:'ps — peek at processes',fn:function(){cubePrint('8 inner cubes. 1 void. 0 mercy.');return true}},
'gui':{help:'gui <window|label|button|input|check|image|close|set|max|destroy|list|clear>',fn:function(a){
if(!a.length){cubePrint('gui: subcommand needed (window, label, button, input, check, image, close, set, max, destroy, list, clear)');return true}
var gs=a[0].toLowerCase();
if(gs==='window'){guiCreateWin(a[1]?a[1].replace(/"/g,''):'untitled',parseInt(a[2],10)||300,parseInt(a[3],10)||200,a[4]&&(a[4].toLowerCase()==='true'||a[4].toLowerCase()==='random'));return true}
if(gs==='label'){guiAddLabel(a[1]?a[1].replace(/"/g,''):'',parseInt(a[2],10)||0,parseInt(a[3],10)||0);return true}
if(gs==='button'){guiAddButton(a[1]?a[1].replace(/"/g,''):'',parseInt(a[2],10)||0,parseInt(a[3],10)||0,a.slice(4).join(' '));return true}
if(gs==='input'){guiAddInput(a[1]?a[1].replace(/"/g,''):'',parseInt(a[2],10)||0,parseInt(a[3],10)||0,a.slice(4).join(' '));return true}
if(gs==='check'){guiAddCheck(a[1]?a[1].replace(/"/g,''):'',parseInt(a[2],10)||0,parseInt(a[3],10)||0,a.slice(4).join(' '));return true}
if(gs==='image'){guiAddImage(a[1]?a[1].replace(/"/g,''):'',parseInt(a[2],10)||0,parseInt(a[3],10)||0,parseInt(a[4],10)||0,parseInt(a[5],10)||0);return true}
if(gs==='close'||gs==='destroy'){if(activeWin){guiWins[activeWin].el.remove();delete guiWins[activeWin];activeWin=null}return true}
if(gs==='clear'){guiClearAll();return true}
if(gs==='max'||gs==='fullscreen'){if(a[1]&&(a[1].toLowerCase()==='off'||a[1].toLowerCase()==='restore')){guiMax(false)}else{guiMax(true)}return true}
if(gs==='set'){if(a.length>=3)guiSetWindow(a[1],a.slice(2).join(' '));return true}
if(gs==='list'){var k=Object.keys(guiWins);for(var i=0;i<k.length;i++)cubePrint(k[i]);return true}
return true}},
'travel':{help:'travel <zone> — travel through the void',fn:function(a){
if(!a.length){cubePrint('current zone: '+zones[currentZone].name);var allowed=zoneTransitions[currentZone];for(var i=0;i<allowed.length;i++)cubePrint('  '+zones[allowed[i]].name);return true}
var dest=a.join(' ').toLowerCase();
var zoneAliases={'the beginning of the end':'breakdown','beginning of the end':'breakdown','beginning':'breakdown','the geometry void':'geometry','geometry void':'geometry','the fringenlands':'fringenlands','the farlands':'farlands','the source':'source','the void':'void','the end':'end','the x':'x','cb menu':'cb_menu','menu':'cb_menu','the menu':'cb_menu'};
var resolved=zoneAliases[dest]||dest;
travelTo(resolved);
return true}},
'set':{help:'set <name> <value> — store a variable',fn:function(a){if(a.length<2){cubeError('set: need a name and value');return true}cubeVars[a[0]]=a.slice(1).join(' ');return true}},
'clear':{help:'clear — clear the output',fn:function(){var el=document.getElementById(studioOpen?'studioOutputBody':'termOutput');if(el)el.innerHTML='';return true}},
'bgm':{help:'bgm [void|furnace|friday|faith|cat|oneshot|moon|stanley|box|downfall|off] — play a track or toggle music. bgm -h = track list',fn:function(a){
if(a[0]==='-h'||a[0]==='--help'){showBgmHelp();return true}
if(playBgm(a[0]||'',function(t){cubePrint(t)}))return true;
cubeError('bgm: pick void, furnace, friday, faith, cat, oneshot, moon, stanley, box, downfall, off (or nothing to toggle) — bgm -h for the list');return true}},
'odkill':{help:'odkill - antidote: end overdose, clear screen filters, restore normal music',fn:function(){odKill();cubeOk('overdose cleared. the room stops ringing.');return true}},
'skill':{help:'skill - open the skill tree',fn:function(){skillOpen();return true}},
'slots':{help:'slots - open the floppy shelf (5 save disks, backup/restore to move browsers)',fn:function(){slotsOpen();return true}},
'buymax':{help:'buymax - toggle buy-max (needs: Buy Max, area 3)',fn:function(){toggleBuyMax();return true}},
'nothingcore':{help:'nothingcore - gaze through the nothing core (needs: ∅)',fn:function(){toggleNothingCore();return true}},
'coreview':{help:'coreview - alias of nothingcore',fn:function(){toggleNothingCore();return true}},
'upgrade':{help:'upgrade - open upgrade tree (needs every skill)',fn:function(){openUpgradeTree();return true}},
'shape':{help:'shape <name> - change shape (cube/sphere/tetra/cyl/torus/knot/icosa/octa/tesseract)',fn:function(a){
if(a[0]){
var name=a[0].toLowerCase();
if(name==='octa'&&!octaUnlocked()){cubeWarn('octa locked — unlock: octahedron (anomaly branch)');return true}
if(name==='tesseract'&&!tessUnlocked()){cubeWarn('tesseract locked — unlock: tesseract (anomaly branch)');return true}
if(!shapeGens[name]){cubeWarn('unknown shape: '+name);return true}
curShape=name;rebuild(name)
}
return true}},
'warn':{help:'warn <text> — print a warning',fn:function(a){cubeWarn(a.join(' '));return true}},
'error':{help:'error <text> — print an error',fn:function(a){cubeError(a.join(' '));return true}},
'random':{help:'random <name> <min> <max> — store a random integer',fn:function(a){if(a.length<3){cubeError('random: usage random <name> <min> <max>');return true}var lo=parseInt(a[1],10),hi=parseInt(a[2],10);if(isNaN(lo)||isNaN(hi)||hi<lo){cubeError('random: invalid range');return true}cubeVars[a[0]]=String(Math.floor(Math.random()*(hi-lo+1))+lo);return true}},
'assert':{help:'assert <name> <value> — stop if a variable does not match',fn:function(a){if(a.length<2){cubeError('assert: usage assert <name> <value>');return true}if(String(cubeVars[a[0]]||'')!==a.slice(1).join(' ')){cubeError('assertion failed: '+a[0]);return {halt:true}}return true}},
'return':{help:'return — stop the current script',fn:function(){return {halt:true}}},
'rm':{help:'rm [-rf] <path> — remove a virtual file or directory',fn:function(a){cubeEval('rm '+a.join(' '));return true}},
'pwd':{help:'pwd — print the virtual working directory',fn:function(){cubeEval('pwd');return true}},
'ls':{help:'ls [path] — list a virtual directory',fn:function(a){cubeEval('ls '+a.join(' '));return true}},
'cat':{help:'cat <path> — read a virtual file',fn:function(a){cubeEval('cat '+a.join(' '));return true}},
'cd':{help:'cd <path> — change the virtual working directory',fn:function(a){cubeEval('cd '+a.join(' '));return true}},
'mkdir':{help:'mkdir <dir> — create a virtual directory',fn:function(a){cubeEval('mkdir '+a.join(' '));return true}},
'touch':{help:'touch <file> — create a virtual file',fn:function(a){cubeEval('touch '+a.join(' '));return true}},
'echo':{help:'echo <text> > <file> — write to a virtual file',fn:function(a){cubeEval('echo '+a.join(' '));return true}},
'cp':{help:'cp <source> <destination> — copy a virtual file',fn:function(a){cubeEval('cp '+a.join(' '));return true}},
'mv':{help:'mv <source> <destination> — move a virtual file',fn:function(a){cubeEval('mv '+a.join(' '));return true}},
'tree':{help:'tree [path] — print the virtual filesystem tree',fn:function(a){cubeEval('tree '+a.join(' '));return true}},
'admin':{help:'admin <passphrase> — unlock admin mode',fn:function(a){
if(isAdmin){cubePrint('admin: already authenticated.');return true}
if(!a.length){cubeError('admin: usage admin <passphrase>');return true}
var attempt=a.join(' ');
cubePrint('authenticating...');
setTimeout(function(){if(voidHash(attempt)==='d3593e2306de778ed4db49ea1b802bcdec28a2b8b8f7fe56ccec4f1851b65546'){isAdmin=true;try{localStorage.setItem('cube_admin','1')}catch(e){}cubeOk('admin: access granted. safety limits disabled.');cubePrint('admin: you are now a void admin.');}else{cubeError('admin: access denied.')}},500);
return true}},
'alwaysontop':{help:'alwaysontop <on|off> — make active window stay on top',fn:function(a){
if(!activeWin||!guiWins[activeWin]){cubeError('alwaysontop: no active window');return true}
var state=a[0]?a[0].toLowerCase():'on';
guiWins[activeWin].el.style.zIndex=state==='on'?'9999':'10';
cubePrint('alwaysontop: '+state);
return true}},
'godmode':{help:'godmode <on|off> — toggle cube invulnerability',fn:function(a){
if(!isAdmin){cubeError('admin access required');return true}
var state=a[0]?a[0].toLowerCase():'on';
window._godmode=state==='on';
cubePrint('godmode: '+state+(state==='on'?' — the cube cannot be harmed.':' — the cube is mortal again.'));
return true}},
'speed':{help:'speed <multiplier> — change script execution speed (0.1-10)',fn:function(a){
if(!isAdmin){cubeError('admin access required');return true}
var mult=parseFloat(a[0]);
if(isNaN(mult)||mult<0.1||mult>10){cubeError('speed: must be between 0.1 and 10');return true}
scriptSpeed=mult;
cubePrint('speed: '+mult+'x');
return true}},
'debug':{help:'debug — show internal state',fn:function(a){
if(!isAdmin){cubeError('admin access required');return true}
cubePrint('--- void debug ---');
cubePrint('admin: '+isAdmin);
cubePrint('frozen: '+isFrozen);
cubePrint('noclip: '+isNoclip);
cubePrint('speed: '+scriptSpeed+'x');
cubePrint('godmode: '+(window._godmode||false));
cubePrint('edgewalk: '+(window._edgeWalk||false));
var _dn=['sun','mon','tue','wed','thu','fri','sat'];
cubePrint('day: '+_dn[window._cubeDay]+(window._cubeDayOverride?' (overridden)':' (real)'));
cubePrint('current zone: '+zones[currentZone].name);
cubePrint('active windows: '+Object.keys(guiWins).length+'/'+MAX_GUI_WINDOWS);
cubePrint('cube vars: '+Object.keys(cubeVars).length);
cubePrint('inner shape: '+curShape);
cubePrint('themes: void/'+currentTheme);
var perf=performance.memory;
if(perf)cubePrint('memory: '+Math.round(perf.usedJSHeapSize/1048576)+'MB/'+Math.round(perf.jsHeapSizeLimit/1048576)+'MB');
cubePrint('---');
return true}},
'freeze':{help:'freeze <on|off> — freeze the cube in place',fn:function(a){
if(!isAdmin){cubeError('admin access required');return true}
var state=a[0]?a[0].toLowerCase():'on';
isFrozen=state==='on';
cubePrint('freeze: '+state+(state==='on'?' — the void is still.':' — the void resumes.'));
return true}},
'noclip':{help:'noclip <on|off> — drag windows anywhere',fn:function(a){
if(!isAdmin){cubeError('admin access required');return true}
var state=a[0]?a[0].toLowerCase():'on';
isNoclip=state==='on';
var area=document.getElementById('studioPreviewArea');
if(area)area.style.overflow=state==='on'?'visible':'auto';
cubePrint('noclip: '+state+(state==='on'?' — boundaries removed.':' — boundaries restored.'));
return true}},
'edgewalk':{help:'edgewalk <on|off> — never fall off the edge in cb_menu',fn:function(a){
if(!isAdmin){cubeError('admin access required');return true}
var state=a[0]?a[0].toLowerCase():'on';
window._edgeWalk=state==='on';
cubePrint('edgewalk: '+state+(state==='on'?' — your boots grip the checkerboard. the edge cannot take you.':' — the edge is back. watch your step.'));
return true}},
'bios':{help:'bios - open the cube setup utility',fn:function(a){biosOpen();return true}},
'daily':{help:'daily - crack the daily void code. streak counts.',fn:function(){voidDaily();return true}},
'phone':{help:'phone - check obj\u2019s phone. he texted. again.',fn:function(){voidPhone();return true}},
'dial':{help:'dial [1|1.5|2|3] - dialogue speed. query or set.',fn:function(a){var arg=(a&&a[0])?String(a[0]).toLowerCase():'';if(arg){var v=parseFloat(arg);if(!(v>0&&v<=4)||[1,1.5,2,3,4].indexOf(v)===-1){cubePrint('dial: pick 1, 1.5, 2, 3 or 4. this is dialogue, not a mixing desk.');return true}dialSet(v);cubePrint('dialogue speed: '+dialLabel()+'. obj will keep up. probably.')}else{cubePrint('dialogue speed: '+dialLabel()+'. set: dial 1|1.5|2|3|4')}return true}},
'jedec':{help:'jedec [off|on] - query or change timing control status',fn:function(a){var arg=(a&&a[0])?String(a[0]).toLowerCase():'';if(arg==='off'||arg==='disable'){if(jedecOff()){cubePrint('JEDEC TIMING CONTROL: already DISABLED. already fast. already regrettable.')}else{try{localStorage.setItem('cube_jedec','0')}catch(e){}cubePrint('JEDEC TIMING CONTROL: DISABLED. everything runs 1.25x now. stability not guaranteed.');try{if(typeof achScan==='function')achScan()}catch(e){}}return true}if(arg==='on'||arg==='enable'){if(!jedecOff()){cubePrint('JEDEC TIMING CONTROL: already ENFORCED. the void is stable. you are slow.')}else{try{localStorage.setItem('cube_jedec','1')}catch(e){}cubePrint('JEDEC TIMING CONTROL: ENFORCED. 1.0x. you will miss the speed.')}return true}cubePrint('JEDEC TIMING CONTROL: '+(jedecOff()?'DISABLED. everything runs 1.25x. stability not guaranteed.':'ENFORCED. timings optimal. the void is stable because JEDEC holds it still.'));return true}},
'dream':{help:'dream - fall asleep in the void',fn:function(a){if(typeof ngActive!=='undefined'&&ngActive){cubePrint('you are already inside something. leave first.');return true}var seeded=false;try{seeded=localStorage.getItem('cube_pwned')==='1'}catch(e){}cubePrint(seeded?'you sleep. the void shuffles tonight\u2019s loop.':'you sleep. the void tucks you in. (it does not.)');setTimeout(function(){try{ngDreamSeed=seeded?(Date.now()%2147483647):null}catch(e){}ngForceCh=21;ngEnter()},1500);return true}},
'override':{help:'override theme <1-8> — access hidden themes',fn:function(a){
if(!isAdmin){cubeError('admin access required');return true}
if(!a.length||a[0].toLowerCase()!=='theme'){cubeError('usage: override theme <1-8>');return true}
var t=parseInt(a[1],10);
if(isNaN(t)||t<1||t>8){cubeError('override: theme must be 1-8');return true}
applyTheme(String(t));
cubePrint('override theme: '+t);
return true}},
'setday':{help:'setday <mon-sat|earlsun|latesun|reset> — override the day for testing',fn:function(a){
if(!isAdmin){cubeError('admin access required');return true}
var days={mon:1,tue:2,wed:3,thu:4,fri:5,sat:6,earlsun:0,latesun:0,0:0,1:1,2:2,3:3,4:4,5:5,6:6};
var names={0:'sunday',1:'monday',2:'tuesday',3:'wednesday',4:'thursday',5:'friday',6:'saturday'};
if(!a.length||a[0].toLowerCase()==='reset'){
window._cubeDay=new Date().getDay();window._cubeDayOverride=false;window._cubeSunHalf='';
loadDayBgm();cubeOk('day reset to '+names[window._cubeDay]+' (real time)');return true}
var input=a[0].toLowerCase();
if(input==='earlsun'){window._cubeDay=0;window._cubeDayOverride=true;window._cubeSunHalf='early'}
else if(input==='latesun'){window._cubeDay=0;window._cubeDayOverride=true;window._cubeSunHalf='late'}
else if(days[input]!==undefined){window._cubeDay=days[input];window._cubeDayOverride=true;window._cubeSunHalf=''}
else{cubeError('setday: use mon-sat, earlsun, latesun, or reset');return true}
loadDayBgm();
var t=window._cubeDay===3?'[the furnace]':window._cubeDay===5?'[landscaping]':window._cubeDay===6?'[friendly faith plate]':window._cubeDay===0&&window._cubeSunHalf==='early'?'[on little cat feet]':window._cubeDay===1?'[...]':'[void drone]';
cubeOk('day set to '+(window._cubeDay===0?(window._cubeSunHalf==='early'?'early sunday':'late sunday'):names[window._cubeDay])+' — bgm: '+t);return true}},
'setseason':{help:'setseason <winter|spring|summer|autumn|reset> — override the season',fn:function(a){
if(!isAdmin){cubeError('admin access required');return true}
var s={winter:0,spring:1,summer:2,autumn:3,fall:3};
var names=['winter','spring','summer','autumn'];
if(!a.length||a[0].toLowerCase()==='reset'){
currentDayData.seasonIdx=getSeason(new Date().getMonth());
currentDayData.season=SEASONS[currentDayData.seasonIdx];
applyDayEffectsToParticles();
cubeOk('season reset to '+currentDayData.season+' (real time)');return true}
var input=a[0].toLowerCase();
if(s[input]===undefined){cubeError('setseason: use winter, spring, summer, autumn, or reset');return true}
currentDayData.seasonIdx=s[input];
currentDayData.season=names[s[input]];
applyDayEffectsToParticles();
cubeOk('season set to '+names[s[input]]);return true}},
'eval':{help:'eval <code> — run raw javascript (dangerous)',fn:function(a){
if(!isAdmin&&!window._skillRootEval){cubeError('admin access required');return true}
if(!a.length){cubeError('eval: usage eval <code>');return true}
var code=a.join(' ');
try{var result=Function('"use strict";return ('+code+')')();cubePrint('eval: '+String(result))}
catch(e2){try{var r2=Function('"use strict";'+code)();cubePrint('eval: '+String(r2))}catch(e){cubeError('eval: '+e.message)}}
return true}},
'skillpoints':{help:'skillpoints [n] — admin: set skill + upgrade points (default 1e26)',fn:function(a){
if(!isAdmin){cubeError('admin access required');return true}
var n=parseInt(a[0],10);if(isNaN(n)||n<0)n=99999999999999999999999999;
skillState.points=n;skillState.upPoints=n;skillSave();
if(typeof skillRender==='function')skillRender();
cubeOk('skill points: '+n+' | upgrade points: '+n);
return true}},
'danger':{help:'danger [list|run <name>] — access the danger zone',fn:function(a){
if(!isAdmin){cubeError('admin access required. this is the danger zone.');return true}
var dz={
'wm':{name:'window manager',desc:'auto-tile all windows',fn:function(){
var ids=Object.keys(guiWins);if(!ids.length){cubePrint('wm: no windows to tile');return}
var cols=Math.ceil(Math.sqrt(ids.length));var rows=Math.ceil(ids.length/cols);
var cw=Math.floor(window.innerWidth/cols);var ch=Math.floor((window.innerHeight-200)/rows);
for(var i=0;i<ids.length;i++){
var w=guiWins[ids[i]].el;var col=i%cols;var row=Math.floor(i/cols);
w.style.left=(col*cw+10)+'px';w.style.top=(50+row*ch)+'px';
w.style.width=(cw-20)+'px';w.style.height=(ch-20)+'px';
w.style.zIndex=String(10+i);
}
cubePrint('wm: tiled '+ids.length+' windows ('+cols+'x'+rows+')');
}},
'terminal2':{name:'second terminal',desc:'terminal inside a gui window',fn:function(){
guiCreateWin('terminal 2',500,300);
var w=guiGetActive();if(!w)return;
var term=document.createElement('div');
term.style.cssText='width:100%;height:100%;background:#0a0a0a;color:rgba(43,208,208,0.8);font-family:Consolas,monospace;font-size:12px;padding:8px;overflow:auto;white-space:pre-wrap';
term.innerHTML='<span style="color:rgba(100,255,100,0.6)">void terminal 2 online</span>\n<span style="color:rgba(255,255,255,0.3)">type commands below</span>\n\n';
var inp=document.createElement('input');
inp.style.cssText='width:100%;background:transparent;border:none;color:rgba(43,208,208,0.8);font-family:Consolas,monospace;font-size:12px;outline:none;margin-top:4px';
inp.placeholder='> ';
inp.addEventListener('keydown',function(e){
if(e.key==='Enter'&&inp.value.trim()){
var cmd=inp.value.trim();inp.value='';
term.innerHTML+='> '+cmd+'\n';
try{
var lines=cmd.split('\n');
for(var l=0;l<lines.length;l++){
var sp=lines[l].trim().split(/\s+/);var op=sp[0].toLowerCase();var args=sp.slice(1);
var vsFn=voidScriptLang[op];
if(vsFn)vsFn.fn(args);
else term.innerHTML+='unknown: '+op+'\n';
}
}catch(err){term.innerHTML+='error: '+err.message+'\n'}
term.scrollTop=term.scrollHeight;
}
});
w.content.appendChild(term);w.content.appendChild(inp);
}},
'dashboard':{name:'dashboard',desc:'live monitoring panel',fn:function(){
guiCreateWin('void dashboard',450,350);
var w=guiGetActive();if(!w)return;
var dash=document.createElement('div');
dash.style.cssText='width:100%;height:100%;background:#0a0a0a;color:rgba(43,208,208,0.7);font-family:Consolas,monospace;font-size:11px;padding:10px;overflow:auto';
w.content.appendChild(dash);
function updateDash(){
var mem=performance.memory;
dash.innerHTML='';
dash.innerHTML+='<div style="color:rgba(255,200,50,0.8);margin-bottom:8px">VOID DASHBOARD</div>';
dash.innerHTML+='<div>zone: '+zones[currentZone].name+'</div>';
dash.innerHTML+='<div>shape: '+curShape+'</div>';
dash.innerHTML+='<div>theme: '+currentTheme+'</div>';
dash.innerHTML+='<div>windows: '+Object.keys(guiWins).length+'/'+MAX_GUI_WINDOWS+'</div>';
dash.innerHTML+='<div>vars: '+Object.keys(cubeVars).length+'</div>';
dash.innerHTML+='<div>admin: '+isAdmin+'</div>';
dash.innerHTML+='<div>frozen: '+isFrozen+'</div>';
dash.innerHTML+='<div>speed: '+scriptSpeed+'x</div>';
if(mem)dash.innerHTML+='<div>memory: '+Math.round(mem.usedJSHeapSize/1048576)+'MB</div>';
dash.innerHTML+='<div>fps: '+(typeof fps!=='undefined'?fps:'?')+'</div>';
dash.innerHTML+='<div style="margin-top:8px;color:rgba(255,255,255,0.2)">refreshes every 1s</div>';
}
updateDash();
setInterval(updateDash,1000);
}},
'theme-editor':{name:'theme editor',desc:'create custom color themes',fn:function(){
guiCreateWin('theme editor',400,300);
var w=guiGetActive();if(!w)return;
var colors={bg:'#0a0a0a',primary:'#2bd0d0',accent:'#ff5050',text:'#ffffff'};
function renderEditor(){
w.content.innerHTML='';
var keys=Object.keys(colors);
for(var k=0;k<keys.length;k++){
(function(key){
var row=document.createElement('div');row.style.cssText='display:flex;align-items:center;gap:8px;margin:4px 0';
var lbl=document.createElement('span');lbl.textContent=key;lbl.style.cssText='width:80px;color:rgba(43,208,208,0.7)';
var picker=document.createElement('input');picker.type='color';picker.value=colors[key];
picker.style.cssText='width:40px;height:25px;border:none;cursor:pointer;background:transparent';
picker.oninput=function(){colors[key]=this.value;renderPreview()};
var hex=document.createElement('span');hex.textContent=colors[key];hex.style.cssText='font-size:10px;color:rgba(255,255,255,0.4)';
row.appendChild(lbl);row.appendChild(picker);row.appendChild(hex);
w.content.appendChild(row);
})(keys[k]);
}
renderPreview();
var btn=document.createElement('button');btn.textContent='apply theme';btn.className='gui-button';
btn.style.cssText='margin-top:10px;left:10px;top:auto;position:relative';
btn.onclick=function(){
var css=':root{--bg:'+colors.bg+';--primary:'+colors.primary+';--accent:'+colors.accent+';--text:'+colors.text+'}';
cubePrint('theme editor colors: bg='+colors.bg+' primary='+colors.primary+' accent='+colors.accent);
cubeOk('custom theme noted. (full CSS injection not implemented yet)');
};
w.content.appendChild(btn);
}
function renderPreview(){
var pv=w.content.querySelector('#themePreview');
if(pv){pv.style.background=colors.bg;pv.style.color=colors.text;pv.style.borderColor=colors.primary}
}
var preview=document.createElement('div');preview.id='themePreview';
preview.style.cssText='width:100%;height:60px;margin-top:10px;border:2px solid '+colors.primary+';border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:14px;background:'+colors.bg+';color:'+colors.text;
preview.textContent='preview';
w.content.appendChild(preview);
renderEditor();
}},
'particles':{name:'particle editor',desc:'customize particle effects',fn:function(){
guiCreateWin('particle editor',350,250);
var w=guiGetActive();if(!w)return;
var editor=document.createElement('div');
editor.style.cssText='width:100%;height:100%;background:#0a0a0a;color:rgba(43,208,208,0.7);font-family:Consolas,monospace;font-size:12px;padding:10px;overflow:auto';
editor.innerHTML='<div style="color:rgba(255,200,50,0.8);margin-bottom:8px">PARTICLE SETTINGS</div>';
editor.innerHTML+='<div>count: '+NP+'</div>';
var countSlider=document.createElement('input');countSlider.type='range';countSlider.min='50';countSlider.max='800';countSlider.value=String(NP);
countSlider.style.cssText='width:100%;margin:4px 0';
countSlider.oninput=function(){NP=parseInt(this.value);editor.children[1].textContent='count: '+NP};
editor.appendChild(countSlider);
var applyBtn=document.createElement('button');applyBtn.textContent='rebuild particles';applyBtn.className='gui-button';
applyBtn.style.cssText='margin-top:8px;left:0;top:auto;position:relative';
applyBtn.onclick=function(){initParticles();cubeOk('particles: rebuilt with '+NP+' particles')};
editor.appendChild(applyBtn);
w.content.appendChild(editor);
}},
'crash':{name:'crash test',desc:'spawn 100 windows (careful)',fn:function(){
for(var i=0;i<100;i++){guiCreateWin('window '+i,200,150)}
cubeWarn('crash: spawned 100 windows. good luck.')
}}
};
if(!a.length||a[0]==='list'){
cubePrint('--- danger zone ---');
var names=Object.keys(dz);
for(var n=0;n<names.length;n++)cubePrint('  '+names[n].padEnd(14)+' — '+dz[names[n]].name+': '+dz[names[n]].desc);
cubePrint('usage: danger run <name>');
return true;
}
if(a[0]==='run'&&a[1]&&dz[a[1]]){
cubePrint('danger zone: launching '+dz[a[1]].name+'...');
setTimeout(function(){dz[a[1]].fn()},300);
return true;
}
cubeError('danger: unknown script. use "danger list"');
return true}},
'slider':{help:'slider <min> <max> <value> <var> — add a range slider',fn:function(a){
var w=guiGetActive();if(!w){cubeError('slider: no active window');return true}
var min=parseInt(a[0],10)||0,max=parseInt(a[1],10)||100,val=parseInt(a[2],10)||0,varName=a[3]||'';
var s=document.createElement('input');s.type='range';s.min=min;s.max=max;s.value=val;
s.className='gui-slider';s.style.cssText='position:absolute;left:10px;top:'+(a[4]||Object.keys(w.content.children).length*30+10)+'px;width:calc(100% - 20px)';
var lbl=document.createElement('div');lbl.className='gui-label';lbl.textContent=varName+': '+val;
lbl.style.cssText='position:absolute;left:10px;top:'+(parseInt(s.style.top)-15)+'px;font-size:10px;color:rgba(43,208,208,0.6)';
s.oninput=function(){lbl.textContent=varName+': '+this.value;if(varName)cubeVars[varName]=this.value};
w.content.appendChild(lbl);w.content.appendChild(s);
if(varName)cubeVars[varName]=String(val);
return true}},
'dropdown':{help:'dropdown <var> "opt1,opt2,..." <value> — add a dropdown select',fn:function(a){
var w=guiGetActive();if(!w){cubeError('dropdown: no active window');return true}
var varName=a[0]||'';var opts=(a[1]||'').replace(/"/g,'').split(',');var def=a[2]||'';
var sel=document.createElement('select');sel.className='gui-dropdown';
sel.style.cssText='position:absolute;left:10px;top:'+(a[3]||Object.keys(w.content.children).length*30+10)+'px;padding:4px 8px;background:rgba(0,0,0,0.5);color:rgba(43,208,208,0.8);border:1px solid rgba(43,208,208,0.3);border-radius:4px;font-family:Consolas,monospace;font-size:12px';
for(var o=0;o<opts.length;o++){
var opt=document.createElement('option');opt.value=opts[o];opt.textContent=opts[o];
if(opts[o]===def)opt.selected=true;
sel.appendChild(opt);
}
if(varName)cubeVars[varName]=def||opts[0]||'';
sel.onchange=function(){if(varName)cubeVars[varName]=this.value};
w.content.appendChild(sel);
return true}},
'colorpicker':{help:'colorpicker <var> "#hex" — add a color picker',fn:function(a){
var w=guiGetActive();if(!w){cubeError('colorpicker: no active window');return true}
var varName=a[0]||'';var def=(a[1]||'#2bd0d0').replace(/"/g,'');
var row=document.createElement('div');row.style.cssText='display:flex;align-items:center;gap:8px;position:absolute;left:10px;top:'+(a[2]||Object.keys(w.content.children).length*30+10)+'px';
var picker=document.createElement('input');picker.type='color';picker.value=def;
picker.style.cssText='width:40px;height:25px;border:none;cursor:pointer;background:transparent';
var hex=document.createElement('span');hex.textContent=def;hex.style.cssText='font-size:10px;color:rgba(43,208,208,0.6)';
picker.oninput=function(){hex.textContent=this.value;if(varName)cubeVars[varName]=this.value};
row.appendChild(picker);row.appendChild(hex);
w.content.appendChild(row);
if(varName)cubeVars[varName]=def;
return true}}
};
// ┌──────────────────────────────────────────────────────────────┐
// │  SCRIPT LIMITS & STATE                                     │
// └──────────────────────────────────────────────────────────────┘
var MAX_LOOP_ITERATIONS=100;
var MAX_SCRIPT_OPERATIONS=10000;
var MAX_GUI_WINDOWS=100;
function voidHash(s){
var K=[0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
var H=[0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];
var bytes=[];
for(var i=0;i<s.length;i++){
var c=s.charCodeAt(i);
if(c<128)bytes.push(c);
else if(c<2048)bytes.push(192|(c>>6),128|(c&63));
else if(c>=0xD800&&c<=0xDBFF&&i+1<s.length){
var c2=s.charCodeAt(++i);
var cp=0x10000+(((c&0x3FF)<<10)|(c2&0x3FF));
bytes.push(240|(cp>>18),128|((cp>>12)&63),128|((cp>>6)&63),128|(cp&63));
}else bytes.push(224|(c>>12),128|((c>>6)&63),128|(c&63));
}
var bitLen=bytes.length*8;
bytes.push(0x80);
while(bytes.length%64!==56)bytes.push(0);
var hi=Math.floor(bitLen/4294967296),lo=bitLen>>>0;
bytes.push((hi>>>24)&255,(hi>>>16)&255,(hi>>>8)&255,hi&255,(lo>>>24)&255,(lo>>>16)&255,(lo>>>8)&255,lo&255);
function rr(x,n){return (x>>>n)|(x<<(32-n))}
for(var bi=0;bi<bytes.length;bi+=64){
var w=new Array(64);
for(var t=0;t<16;t++)w[t]=((bytes[bi+t*4]<<24)|(bytes[bi+t*4+1]<<16)|(bytes[bi+t*4+2]<<8)|bytes[bi+t*4+3])>>>0;
for(var t=16;t<64;t++){
var s0=rr(w[t-15],7)^rr(w[t-15],18)^(w[t-15]>>>3);
var s1=rr(w[t-2],17)^rr(w[t-2],19)^(w[t-2]>>>10);
w[t]=(w[t-16]+s0+w[t-7]+s1)>>>0;
}
var a=H[0],b=H[1],c=H[2],d=H[3],e=H[4],f=H[5],g=H[6],h=H[7];
for(var t=0;t<64;t++){
var S1=rr(e,6)^rr(e,11)^rr(e,25);
var ch=(e&f)^((~e)&g);
var t1=(h+S1+ch+K[t]+w[t])>>>0;
var S0=rr(a,2)^rr(a,13)^rr(a,22);
var maj=(a&b)^(a&c)^(b&c);
var t2=(S0+maj)>>>0;
h=g;g=f;f=e;e=(d+t1)>>>0;d=c;c=b;b=a;a=(t1+t2)>>>0;
}
H[0]=(H[0]+a)>>>0;H[1]=(H[1]+b)>>>0;H[2]=(H[2]+c)>>>0;H[3]=(H[3]+d)>>>0;
H[4]=(H[4]+e)>>>0;H[5]=(H[5]+f)>>>0;H[6]=(H[6]+g)>>>0;H[7]=(H[7]+h)>>>0;
}
var out='';
for(var i=0;i<8;i++)out+=('00000000'+H[i].toString(16)).slice(-8);
return out;
}
var isAdmin=false;
(function(){try{
if(localStorage.getItem('cube_admin_purge2')==='1')return;
var purged=false;
try{if(localStorage.getItem('cube_admin')==='1')purged=true}catch(e){}
localStorage.removeItem('cube_admin');
for(var pi=1;pi<=5;pi++){try{var ps=localStorage.getItem('cube_slot_'+pi);if(!ps)continue;var pb=JSON.parse(ps);if(pb&&pb.data&&('cube_admin' in pb.data)){delete pb.data.cube_admin;localStorage.setItem('cube_slot_'+pi,JSON.stringify(pb));purged=true}}catch(e){}}
localStorage.setItem('cube_admin_purge2','1');
if(purged){try{cubeDim('admin credentials rotated. previous sessions revoked. re-auth with the current passphrase.')}catch(e){}}
}catch(e){}})();
try{if(localStorage.getItem('cube_admin')==='1'){isAdmin=true;cubeDim('admin session restored. the void remembers you.')}}catch(e){}
var isFrozen=false;
var isNoclip=false;
var scriptSpeed=1;
var adminThemes={'void':1,'blood':2,'ice':3,'toxic':4,'void-alt':5,'glitch':6,'corrupt':7,'null':8};
var vsCancel=false;
var vsPrintTimes=[];
function vsPrintTick(){
try{
var now=Date.now();
vsPrintTimes.push(now);
while(vsPrintTimes.length&&vsPrintTimes[0]<now-5000)vsPrintTimes.shift();
if(vsPrintTimes.length>300&&!vsCancel){vsCancel=true;try{ach('shut_up')}catch(e){}cubeWarn('output flood detected (>300 lines in 5s). script terminated by the void.')}
}catch(e){}
}

// ┌──────────────────────────────────────────────────────────────┐
// │  DATE/SEASON SYSTEM                                        │
// └──────────────────────────────────────────────────────────────┘
var DAYS=['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
var DAY_NAMES=['sun','mon','tue','wed','thu','fri','sat'];
var MONTHS=['january','february','march','april','may','june','july','august','september','october','november','december'];
var SEASONS=['winter','spring','summer','autumn'];
function getSeason(m){if(m>=2&&m<=4)return 1;if(m>=5&&m<=7)return 2;if(m>=8&&m<=10)return 3;return 0}
function getDayData(){
var now=new Date();
return{day:now.getDay(),dayName:DAYS[now.getDay()],dayShort:DAY_NAMES[now.getDay()],month:now.getMonth(),monthName:MONTHS[now.getMonth()],date:now.getDate(),year:now.getFullYear(),season:SEASONS[getSeason(now.getMonth())],seasonIdx:getSeason(now.getMonth()),timestamp:now.getTime(),isWeekend:now.getDay()===0||now.getDay()===6,isFriday13:now.getDay()===5&&now.getDate()===13,isMonday:now.getDay()===1,isNewYear:now.getMonth()===0&&now.getDate()===1,isHalloween:now.getMonth()===9&&now.getDate()===31,isXmas:now.getMonth()===11&&(now.getDate()===24||now.getDate()===25),isLeapDay:now.getMonth()===1&&now.getDate()===29};
}
var currentDayData=getDayData();
var lastVisit=parseInt(localStorage.getItem('cube_last_visit_day'),10);
var lastVisitDate=localStorage.getItem('cube_last_visit_date')||'';

function checkDayChange(){
var today=currentDayData.dayName;
var todayStr=currentDayData.year+'-'+currentDayData.month+'-'+currentDayData.date;
if(!lastVisitDate){
showDayTransition(-1,currentDayData.day,0);
localStorage.setItem('cube_last_visit_day',String(currentDayData.day));
localStorage.setItem('cube_last_visit_date',todayStr);
return true;
}
if(lastVisitDate!==todayStr&&lastVisit>=0){
var lastDayIdx=lastVisit;var todayIdx=currentDayData.day;
var diff=todayIdx-lastDayIdx;if(diff<0)diff+=7;
showDayTransition(lastDayIdx,todayIdx,diff);
localStorage.setItem('cube_last_visit_day',String(currentDayData.day));
localStorage.setItem('cube_last_visit_date',todayStr);
return true;
}
localStorage.setItem('cube_last_visit_day',String(currentDayData.day));
localStorage.setItem('cube_last_visit_date',todayStr);
return false;
}

function showDayTransition(fromIdx,toIdx,daysPassed){
var overlay=document.createElement('div');overlay.id='dayOverlay';
overlay.style.cssText='position:fixed;top:0;left:0;width:100vw;height:100vh;background:#000;z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;opacity:0;transition:opacity 1.5s;font-family:Consolas,monospace';
var greeting=document.createElement('div');
var hour=new Date().getHours();
var timeGreet=hour<6?'still awake?':hour<12?'good morning':hour<18?'good afternoon':'good evening';
greeting.textContent=timeGreet+', intruder.';
greeting.style.cssText='color:rgba(43,208,208,0.4);font-size:14px;margin-bottom:20px;opacity:0;animation:fadeInDelay 1s 0.5s forwards';
var dayName=document.createElement('div');
dayName.textContent=currentDayData.dayName;
dayName.style.cssText='color:rgba(43,208,208,0.9);font-size:48px;text-shadow:0 0 30px rgba(43,208,208,0.5);letter-spacing:8px;text-transform:uppercase;opacity:0;animation:fadeInDelay 1s 1s forwards';
var sub=document.createElement('div');
sub.style.cssText='color:rgba(255,255,255,0.3);font-size:12px;margin-top:15px;opacity:0;animation:fadeInDelay 1s 1.5s forwards';
if(daysPassed>1)sub.textContent='you were gone for '+daysPassed+' days.';
else sub.textContent='the void noticed your absence.';
var seasonTag=document.createElement('div');
seasonTag.textContent=currentDayData.season;
seasonTag.style.cssText='color:rgba(200,100,255,0.5);font-size:11px;margin-top:8px;text-transform:uppercase;letter-spacing:4px;opacity:0;animation:fadeInDelay 1s 1.8s forwards';
var special=getSpecialMessage();
var specialEl=document.createElement('div');
if(special){specialEl.textContent=special;specialEl.style.cssText='color:rgba(255,200,50,0.6);font-size:13px;margin-top:15px;opacity:0;animation:fadeInDelay 1s 2.2s forwards'}
var skip=document.createElement('div');
skip.textContent='click to skip';
skip.style.cssText='color:rgba(255,255,255,0.15);font-size:10px;position:absolute;bottom:30px;opacity:0;animation:fadeInDelay 1s 3s forwards;cursor:pointer';
overlay.appendChild(greeting);overlay.appendChild(dayName);overlay.appendChild(sub);overlay.appendChild(seasonTag);
if(special)overlay.appendChild(specialEl);
overlay.appendChild(skip);
document.body.appendChild(overlay);
setTimeout(function(){overlay.style.opacity='1'},50);
function dismiss(){overlay.style.opacity='0';setTimeout(function(){overlay.remove()},1500)}
overlay.onclick=dismiss;
setTimeout(dismiss,6000);
applySeasonEffects();
}

function getSpecialMessage(){
var d=currentDayData;
if(d.isNewYear)return 'a new year begins. the void resets.';
if(d.isHalloween)return 'the veil is thin tonight.';
if(d.isXmas)return 'even the void gives gifts. sometimes.';
if(d.isFriday13)return 'friday the 13th. the void is cautious.';
if(d.isMonday)return 'mondays are rough. even for voids.';
if(d.isWeekend&&d.day===6)return 'saturday. the void relaxes.';
if(d.isWeekend&&d.day===0)return 'sundays. the void reflects.';
if(d.month===3&&d.date===1)return 'april fools. trust nothing.';
if(d.month===5&&d.date===18)return 'happy birthday, void. (it was born today. probably.)';
if(d.season==='winter')return 'the cold seeps through the geometry.';
if(d.season==='summer')return 'the void is overheating.';
return null;
}

function applySeasonEffects(){
var s=currentDayData.seasonIdx;
}

var DAY_PARTICLE_COLORS={
0:{r:1,g:0.8,b:0.4},// sunday — warm amber
1:{r:0.4,g:0.45,b:0.55},// monday — gloomy gray-blue
2:{r:0.2,g:0.8,b:1},// tuesday — default teal
3:{r:0.2,g:0.8,b:1},// wednesday — default teal
4:{r:0.3,g:0.9,b:0.8},// thursday — slightly brighter
5:{r:0.6,g:0.3,b:1},// friday — vibrant purple
6:{r:0.3,g:1,b:0.6}// saturday — green
};
var SEASON_PARTICLE_MODS={
0:{r:0.7,g:0.8,b:1.0,mult:1.1},// winter — ice blue, slightly bigger
1:{r:0.3,g:1,b:0.5},// spring — fresh green
2:{r:1,g:0.7,b:0.3},// summer — warm orange
3:{r:0.9,g:0.5,b:0.2}// autumn — amber
};
function applyDayEffectsToParticles(){
var dayCol=DAY_PARTICLE_COLORS[currentDayData.day]||DAY_PARTICLE_COLORS[2];
var seasonMod=SEASON_PARTICLE_MODS[currentDayData.seasonIdx];
for(var i=0;i<NP;i++){
var i8=i*8;
var r=dayCol.r,g=dayCol.g,b=dayCol.b;
if(currentDayData.isHalloween){r=1;g=0.2+Math.random()*0.2;b=0}
else if(currentDayData.isXmas){if(Math.random()>0.5){r=1;g=0.2;b=0.2}else{r=0.2;g=1;b=0.2}}
else if(currentDayData.isNewYear){r=1;g=0.85;b=0}
else if(currentDayData.isFriday13){r=0.3;g=0;b=0}
else if(seasonMod){
r=r*0.5+seasonMod.r*0.5;
g=g*0.5+seasonMod.g*0.5;
b=b*0.5+seasonMod.b*0.5;
if(seasonMod.mult)pData[i8+3]*=seasonMod.mult;
}
 pData[i8+4]=Math.min(r,1);
pData[i8+5]=Math.min(g,1);
pData[i8+6]=Math.min(b,1);
}
}

var cssAnim=document.createElement('style');
cssAnim.textContent='@keyframes fadeInDelay{0%{opacity:0;transform:translateY(10px)}100%{opacity:1;transform:translateY(0)}}';
document.head.appendChild(cssAnim);

// ┌──────────────────────────────────────────────────────────────┐
// │  GUI WINDOW SYSTEM                                         │
// └──────────────────────────────────────────────────────────────┘
var guiWins={};
var activeWin=null;
function guiMakeDraggable(el,handle){
var ox,oy,sx,sy,dragging=false;
handle.onmousedown=function(e){if(el._max)return;dragging=true;sx=e.clientX;sy=e.clientY;ox=el.offsetLeft;oy=el.offsetTop;e.preventDefault()};
document.addEventListener('mousemove',function(e){if(!dragging)return;el.style.left=ox+(e.clientX-sx)+'px';el.style.top=oy+(e.clientY-sy)+'px'});
document.addEventListener('mouseup',function(){dragging=false});
}
function previewMakeDraggable(el,handle,container){
var ox,oy,sx,sy,dragging=false;
handle.onmousedown=function(e){dragging=true;sx=e.clientX;sy=e.clientY;ox=el.offsetLeft;oy=el.offsetTop;e.preventDefault();e.stopPropagation()};
document.addEventListener('mousemove',function(e){
if(!dragging)return;
var nx=ox+(e.clientX-sx);
var ny=oy+(e.clientY-sy);
var cw=container.clientWidth;
var ch=container.clientHeight;
var ww=el.offsetWidth;
var wh=el.offsetHeight;
nx=Math.max(0,Math.min(nx,cw-ww));
ny=Math.max(0,Math.min(ny-ch+30,ch-wh-30));
el.style.left=nx+'px';el.style.top=ny+'px';
});
document.addEventListener('mouseup',function(){dragging=false});
}
function guiCreateWin(title,w,h,rndPos){
if(Object.keys(guiWins).length>=MAX_GUI_WINDOWS&&!isAdmin){cubeWarn('gui: window limit reached ('+MAX_GUI_WINDOWS+'). use admin to bypass.');return null}
var id='gw_'+Date.now()+'_'+Math.floor(Math.random()*999);
var win=document.createElement('div');win.className='gui-window';win.id=id;
var wx,wy;
if(rndPos){
wx=60+Math.random()*(window.innerWidth-w-120);
wy=60+Math.random()*(window.innerHeight-h-120);
}else{
wx=60+Math.random()*200;
wy=60+Math.random()*100;
}
win.style.cssText='width:'+w+'px;height:'+(parseInt(h)+30)+'px;left:'+wx+'px;top:'+wy+'px;display:flex;flex-direction:column';
var tb=document.createElement('div');tb.className='gui-title';
var tl=document.createElement('span');tl.textContent=formatGuiText(title);
var btns=document.createElement('span');btns.style.cssText='display:flex;gap:8px;align-items:center';
var mb=document.createElement('div');mb.className='gui-max-btn';mb.textContent='\u25a2';mb.title='maximize';
mb.onclick=function(ev){ev.stopPropagation();guiMax(!win._max)};
var cb=document.createElement('div');cb.className='gui-close';cb.textContent='\u00d7';
cb.onclick=function(){win.remove();delete guiWins[id];if(activeWin===id)activeWin=null};
btns.appendChild(mb);btns.appendChild(cb);
tb.appendChild(tl);tb.appendChild(btns);
var ct=document.createElement('div');ct.className='gui-content';ct.style.height=h+'px';
win.appendChild(tb);win.appendChild(ct);
document.body.appendChild(win);
guiMakeDraggable(win,tb);
guiWins[id]={el:win,content:ct,title:tb};
activeWin=id;
return id;
}
function guiCreateTaskbar(title,h){
if(Object.keys(guiWins).length>=MAX_GUI_WINDOWS&&!isAdmin){cubeWarn('gui: window limit reached ('+MAX_GUI_WINDOWS+'). use admin to bypass.');return null}
cubeError('gui: taskbar has been removed — use gui window instead');
return null;
}
function guiMax(on){
var w=guiGetActive();if(!w)return;
var el=w.el;
if(el.parentNode!==document.body){cubeWarn('gui: only real windows can maximize (preview panes stay put)');return}
if(on){
if(el._max)return;
el._restore={left:el.style.left,top:el.style.top,width:el.style.width,height:el.style.height,ctH:w.content.style.height,docH:el.style.height};
el.style.left='0px';el.style.top='0px';
el.style.width='100vw';el.style.height='100vh';
w.content.style.height='calc(100vh - 30px)';
el._max=true;
var mb=el.querySelector('.gui-max-btn');if(mb)mb.textContent='\u25a1';
}else{
if(!el._max)return;
var r=el._restore||{};
el.style.left=r.left||'60px';el.style.top=r.top||'60px';
el.style.width=r.width||'400px';el.style.height=r.height||'230px';
w.content.style.height=r.ctH||'200px';
el._max=false;
var mb2=el.querySelector('.gui-max-btn');if(mb2)mb2.textContent='\u25a2';
}
}
function guiGetActive(){if(typeof studioOpen!=='undefined'&&studioOpen&&!studioPreviewEnabled)return null;if(!activeWin||!guiWins[activeWin]){cubeError('no active gui window — create one with: gui window "title" 400 300');return null}return guiWins[activeWin]}
function guiClearAll(){
var ids=Object.keys(guiWins);
for(var gi=0;gi<ids.length;gi++)if(guiWins[ids[gi]].el)guiWins[ids[gi]].el.remove();
guiWins={};activeWin=null;
}
function formatGuiText(text){return String(text||'').replace(/_/g,' ')}
function normalizeVoidScriptAction(action){
if(!action)return '';
return String(action).trim().replace(/^['"]+|['"]+$/g,'');
}
function guiAddLabel(text,x,y){
var w=guiGetActive();if(!w)return;
var el=document.createElement('div');el.className='gui-label';el.textContent=formatGuiText(text);
el.style.left=x+'px';el.style.top=y+'px';w.content.appendChild(el);
}
function guiAddButton(text,x,y,action){
var w=guiGetActive();if(!w)return;
var el=document.createElement('button');el.className='gui-button';el.textContent=formatGuiText(text);
el.style.left=x+'px';el.style.top=y+'px';
el.onclick=function(){
var cleaned=normalizeVoidScriptAction(action);
var vsFn=voidScriptLang[cleaned.split(/\s+/)[0].toLowerCase()];
if(vsFn){runVoidScript(cleaned,'button action')}
else{cubeEval(cleaned)};
};
w.content.appendChild(el);
}
function guiAddInput(placeholder,x,y,cmd){
var w=guiGetActive();if(!w)return;
var el=document.createElement('input');el.className='gui-input';el.placeholder=formatGuiText(placeholder);
el.style.left=x+'px';el.style.top=y+'px';el.style.width='180px';
el.addEventListener('keydown',function(e){e.stopPropagation()});
if(cmd){
el.addEventListener('change',function(){
var cleaned=normalizeVoidScriptAction(cmd.replace(/\$val/g,el.value));
var vsFn=voidScriptLang[cleaned.split(/\s+/)[0].toLowerCase()];
if(vsFn){runVoidScript(cleaned,'input change')}else{cubeEval(cleaned)};
});
}
w.content.appendChild(el);
}
function guiAddCheck(labelText,x,y,cmd){
var w=guiGetActive();if(!w)return;
var wrap=document.createElement('label');wrap.className='gui-checkbox';
wrap.style.left=x+'px';wrap.style.top=y+'px';
var cb=document.createElement('input');cb.type='checkbox';
if(cmd){
cb.addEventListener('change',function(){
var cleaned=normalizeVoidScriptAction(cmd.replace(/\$val/g,cb.checked?'true':'false'));
var vsFn=voidScriptLang[cleaned.split(/\s+/)[0].toLowerCase()];
if(vsFn){runVoidScript(cleaned,'check change')}else{cubeEval(cleaned)};
});
}
wrap.appendChild(cb);wrap.appendChild(document.createTextNode(formatGuiText(labelText)));
w.content.appendChild(wrap);
}
function guiAddImage(url,x,y,imgW,imgH){
var w=guiGetActive();if(!w)return;
var el=document.createElement('img');el.className='gui-image';
el.src=url;el.style.left=x+'px';el.style.top=y+'px';
if(imgW)el.style.width=imgW+'px';
if(imgH)el.style.height=imgH+'px';
el.onerror=function(){cubeError('image: failed to load — check the URL')};
w.content.appendChild(el);
}
function guiSetWindow(prop,val){
var w=guiGetActive();if(!w)return;
if(prop==='title'){w.title.querySelector('span').textContent=val}
else if(prop==='width'){w.el.style.width=val+'px';w.content.style.width=val+'px'}
else if(prop==='height'){w.content.style.height=val+'px';w.el.style.height=(parseInt(val)+30)+'px'}
else if(prop==='color'){w.el.style.borderColor=val;w.content.style.color=val}
}
// ┌──────────────────────────────────────────────────────────────┐
// │  VOIDSCRIPT INTERPRETER                                    │
// └──────────────────────────────────────────────────────────────┘
function runVoidScript(code,rp,doneCallback){
vsCancel=false;
cubePrint('running '+rp+' through the void interpreter...');
var lines=code.split('\n').map(function(l){
var stripped='';var inQ=false;var qCh='';
for(var c=0;c<l.length;c++){
var ch=l[c];
if(inQ){stripped+=ch;if(ch===qCh)inQ=false}
else if(ch==='"'||ch==="'"){inQ=true;qCh=ch;stripped+=ch}
else if(ch==='/'&&c+1<l.length&&l[c+1]==='/'){break}
else{stripped+=ch}
}
return stripped.trim()}).filter(function(l){return l.length});
var scriptDefs={};
var executableLines=[];
for(var di=0;di<lines.length;di++){
var defParts=lines[di].split(/\s+/);
var defType=defParts[0].toLowerCase();
if(defType==='fn'||defType==='macro'){
var defName=defParts[1];
var defArgs=defParts.slice(2);
var endOp=defType==='fn'?'endfn':'endmacro';
var body=[];
di++;
while(di<lines.length&&lines[di].toLowerCase()!==endOp){body.push(lines[di]);di++}
if(!defName||di>=lines.length){cubeError(defType+': missing name or '+endOp);continue}
scriptDefs[defName.toLowerCase()]={args:defArgs,body:body};
}else executableLines.push(lines[di]);
}
lines=executableLines;
function expandVars(text){
return text.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\}|\$([A-Za-z_][A-Za-z0-9_]*)/g,function(_,braced,bare){
var key=braced||bare;
return cubeVars[key]!==undefined?cubeVars[key]:'';
});
}
var i=0;
var operationCount=0;
var loopStack=[];
var ifStack=[];
function evalIfCondition(args){
var expr=args.join(' ');
var m=expr.match(/^(\S+)\s*(==|!=|>=|<=|>|<)\s*(.+)$/);
if(m){
var val=cubeVars[m[1]]!==undefined?cubeVars[m[1]]:'';
var cmp=m[3].replace(/^"|"$/g,'');
var op=m[2];
if(op==='==')return val===cmp;
if(op==='!=')return val!==cmp;
if(op==='>')return parseFloat(val)>parseFloat(cmp);
if(op==='<')return parseFloat(val)<parseFloat(cmp);
if(op==='>=')return parseFloat(val)>=parseFloat(cmp);
if(op==='<=')return parseFloat(val)<=parseFloat(cmp);
}
var val=cubeVars[expr];
return val!==undefined&&val!==''&&val!=='0'&&val!=='false'&&val!=='undefined';
}
function step(){
operationCount++;
if(operationCount>MAX_SCRIPT_OPERATIONS&&!isAdmin){
cubeError(rp+': operation limit reached ('+MAX_SCRIPT_OPERATIONS+'). use admin to bypass.');
if(doneCallback)doneCallback();
return;
}
if(vsCancel){
cubeWarn('script terminated by the void.');
if(doneCallback)doneCallback();
return;
}
if(i>=lines.length){if(loopStack.length){cubeError('loop: missing endloop');loopStack=[]}if(ifStack.length){cubeError('if: missing endif');ifStack=[]}cubeOk(rp+': finished. it left a faint signal.');if(doneCallback)doneCallback();return}
var ln=expandVars(lines[i]);
if(ln==='kill'||ln==='cancel'){cubeWarn('script terminated by itself.');if(doneCallback)doneCallback();return}
var sp=ln.split(/\s+/);
var op=sp[0].toLowerCase();
var args=sp.slice(1);
if(ln==='end'||ln==='halt'||op==='return'){cubeOk(rp+': halted.');if(doneCallback)doneCallback();return}
if(op==='loop'){
var count=parseInt(args[0],10)||0;
if(count<1){cubeError('loop: count must be > 0');i++;setTimeout(step,Math.max(5,50/scriptSpeed));return}
if(count>MAX_LOOP_ITERATIONS&&!isAdmin){
cubeWarn('loop: capped at '+MAX_LOOP_ITERATIONS+' iterations for safety (requested '+count+'). use admin to bypass.');
count=MAX_LOOP_ITERATIONS;
}
loopStack.push({count:count,startLine:i+1});
i++;setTimeout(step,Math.max(5,50/scriptSpeed));return;
}
if(op==='endloop'){
if(!loopStack.length){cubeError('endloop: no matching loop');i++;setTimeout(step,Math.max(5,50/scriptSpeed));return}
var top=loopStack[loopStack.length-1];
top.count--;
if(top.count>0){i=top.startLine-1}else{loopStack.pop()}
i++;setTimeout(step,Math.max(5,50/scriptSpeed));return;
}
if(op==='if'){
var parentActive=!ifStack.length||ifStack[ifStack.length-1].active;
var cond=parentActive&&evalIfCondition(args);
ifStack.push({active:cond,parentActive:parentActive,branchTaken:cond});
i++;setTimeout(step,Math.max(5,50/scriptSpeed));return;
}
if(op==='else'){
if(!ifStack.length){cubeError('else: no matching if');i++;setTimeout(step,Math.max(5,50/scriptSpeed));return}
var branch=ifStack[ifStack.length-1];
branch.active=branch.parentActive&&!branch.branchTaken;
branch.branchTaken=true;
i++;setTimeout(step,Math.max(5,50/scriptSpeed));return;
}
if(op==='endif'){
if(!ifStack.length){cubeError('endif: no matching if');i++;setTimeout(step,Math.max(5,50/scriptSpeed));return}
ifStack.pop();
i++;setTimeout(step,Math.max(5,50/scriptSpeed));return;
}
if(ifStack.length&&!ifStack[ifStack.length-1].active){
i++;setTimeout(step,Math.max(5,50/scriptSpeed));return;
}
if(op==='break'||op==='continue'){
if(!loopStack.length){cubeError(op+': no matching loop');i++;setTimeout(step,Math.max(5,50/scriptSpeed));return}
var depth=1,endIndex=i;
for(var bi=i+1;bi<lines.length;bi++){
var bop=expandVars(lines[bi]).split(/\s+/)[0].toLowerCase();
if(bop==='loop')depth++;
if(bop==='endloop'){depth--;if(depth===0){endIndex=bi;break}}
}
if(op==='break'){loopStack.pop();i=endIndex+1}
else{i=endIndex}
setTimeout(step,Math.max(5,50/scriptSpeed));return;
}
if(op==='call'){
var definition=scriptDefs[(args.shift()||'').toLowerCase()];
if(!definition){cubeError('call: unknown function or macro');i++;setTimeout(step,Math.max(5,50/scriptSpeed));return}
for(var pi=0;pi<definition.args.length;pi++)cubeVars[definition.args[pi]]=args[pi]||'';
lines.splice.apply(lines,[i+1,0].concat(definition.body));
i++;setTimeout(step,Math.max(5,50/scriptSpeed));return;
}
var fn=voidScriptLang[op];
if(!fn){cubeWarn('line '+i+': unknown op "'+op+'" — skipped');i++;setTimeout(step,Math.max(5,50/scriptSpeed));return}
var r=fn.fn(args);
if(r&&r.halt){cubeOk(rp+': halted.');if(doneCallback)doneCallback();return}
if(r&&r.wait){i++;setTimeout(step,Math.max(5,r.wait/scriptSpeed));}
else{i++;setTimeout(step,Math.max(5,60/scriptSpeed))}
}
step();
}
// ┌──────────────────────────────────────────────────────────────┐
// │  PACKAGE FORGE                                             │
// └──────────────────────────────────────────────────────────────┘
function forgePackage(name){
name=String(name||'').toLowerCase().replace(/[^a-z0-9_\-\.]/g,'').replace(/^\.+/,'');
if(!name){cubeError('usage: void forge <name>');return}
if(pkgs[name]){cubeError('package "'+name+'" already exists in the void');return}
var fp='/void/pkgs/'+name.replace(/\.vsc$/,'')+'.vsc';
if(typeof fs!=='undefined'&&fs[fp]){cubeError('"'+fp+'" already forged. try: void run '+fp);return}
if(typeof fs!=='undefined'){fs[fp]={type:'file',content:'// forged by the void\n// one op per line. try: say hello\nsay forged.'};try{var fpar=getParent(fp);if(fs[fpar]&&fs[fpar].type==='dir')fs[fpar].children.push(getBase(fp))}catch(e){}}
try{ach('blacksmith')}catch(e){}
cubeOk('forged '+fp+' (blacksmith: achievement checked)');
cubePrint('voidscript editor — one op per line. available ops:');
var ops=Object.keys(voidScriptLang);
for(var k=0;k<ops.length;k++){cubePrint('  '+ops[k].padEnd(8)+' — '+voidScriptLang[ops[k]].help)}
cubePrint('  end/halt           — stop the script');
cubePrint('  loop <n>/endloop   — repeat a block');
cubePrint('  loop limit         — '+MAX_LOOP_ITERATIONS+' iterations per loop');
cubePrint('  if <cond>/endif    — conditional block');
cubePrint('  else               — alternate if branch');
cubePrint('  break/continue     — loop control');
cubePrint('  fn/name/endfn      — define and call reusable functions');
cubePrint('  macro/name/endmacro — define reusable macros');
cubePrint('  call <name> [args] — invoke a definition');
cubePrint('  kill               — self-terminate');
cubePrint('');
cubePrint('vsc files live in /void/pkgs — try the starter scripts:');
cubePrint('  void run /void/pkgs/greet.vsc');
cubePrint('  void run /void/pkgs/signal.vsc');
cubePrint('');
cubePrint('craft your own: echo <one-op-per-line> > /void/pkgs/my.vsc');
cubePrint('then: void run /void/pkgs/my.vsc');
cubePrint('this script is sandboxed. it cannot touch your browser.');
cubePrint('the void does not allow viruses here.');
}

// ┌──────────────────────────────────────────────────────────────┐
// │  MAIN COMMAND ROUTER (cubeEval)                            │
// └──────────────────────────────────────────────────────────────┘
function cubeEval(input){
var raw=input.trim();
// semicolon chaining: run multiple commands in sequence (respects quotes)
if(raw.indexOf(';')!==-1){
var cmds=[];var cur='';var inQ=false;var qChar='';
for(var ci=0;ci<raw.length;ci++){
var ch=raw[ci];
if(!inQ&&(ch==='"'||ch==="'")){inQ=true;qChar=ch;cur+=ch}
else if(inQ&&ch===qChar){inQ=false;qChar='';cur+=ch}
else if(!inQ&&ch===';'){if(cur.trim())cmds.push(cur);cur=''}
else{cur+=ch}
}
if(cur.trim())cmds.push(cur);
for(var cj=0;cj<cmds.length;cj++){cubeEval(cmds[cj].trim())}
return;
}
function splitArgs(s){
var parts=[];var cur='';var inQ=false;var qChar='';
for(var i=0;i<s.length;i++){var ch=s[i];
if(!inQ&&(ch==='"'||ch==="'")){inQ=true;qChar=ch;cur+=ch}
else if(inQ&&ch===qChar){inQ=false;qChar='';cur+=ch}
else if(!inQ&&/\s/.test(ch)){if(cur)parts.push(cur);cur=''}
else{cur+=ch}}
if(cur)parts.push(cur);return parts;
}
var parts=splitArgs(raw);
var cmd=parts[0].toLowerCase();
if(!cmd)return;

// handle dot notation: cube.get -> cmd='cube', sub='get'
var sub='';
if(cmd.indexOf('.')!==-1){
var dotParts=cmd.split('.');
cmd=dotParts[0];
sub=dotParts[1];
parts.shift();
parts=[cmd,sub].concat(parts);
}
// pull ritual: full get command, matched early and quote-tolerant
if(cmd==='get'){var _gt=String(parts[1]||'').replace(/['"]/g,'').trim().toLowerCase();if(_gt==='box.objbox.pull:51072'){pullRequest('box.objbox.pull:51072');return}}

// extended help: <cmd> [sub] -h / --help — works for every command
var _hIdx=-1;
for(var _hi=1;_hi<parts.length;_hi++){if(parts[_hi]==='-h'||parts[_hi]==='--help'){_hIdx=_hi;break}}
if(_hIdx>0){
var _hn=parts.slice(0,_hIdx).join('.');
if(_hn==='bgm'||_hn==='cube.bgm'){showBgmHelp();return}
if(_hn==='voidscript'){showVoidScriptHelp();return}
if(typeof extHelp!=='undefined'&&printExtHelp(_hn))return;
if(typeof voidScriptLang!=='undefined'&&voidScriptLang[_hn]&&voidScriptLang[_hn].help){cubePrint('  '+voidScriptLang[_hn].help);return}
if(_hn.indexOf('.')!==-1){var _bt=_hn.split('.').pop();
if(typeof extHelp!=='undefined'&&printExtHelp(_bt))return;
if(typeof voidScriptLang!=='undefined'&&voidScriptLang[_bt]&&voidScriptLang[_bt].help){cubePrint('  '+voidScriptLang[_bt].help);return}}
cubePrint(_hn+': no extended help. try: help');return}

// help
if(cmd==='help'){
if(parts[1]&&parts[1].toLowerCase()==='voidscript'){
showVoidScriptHelp();return}
if(parts[1]&&(parts[1].toLowerCase()==='premium'||parts[1].toLowerCase()==='premhelp')){
if(window._skillPremium||isAdmin){if(typeof listPremiumOps==='function')listPremiumOps();else cubeWarn('premhelp not loaded')}
else{/* locked: help premium does nothing */}
return}
if(parts[1]&&(parts[1].toLowerCase()==='tech'||parts[1].toLowerCase()==='techhelp')){
if(techUnlocked()){if(typeof listTechOps==='function')listTechOps();else cubeWarn('techhelp not loaded')}
else{/* locked: help tech does nothing */}
return}
if(parts[1]&&parts[1].toLowerCase()==='void'){
cubePrint('');
cubePrint('  === VOID PACKAGE MANAGER ===');
cubePrint('');
cubePrint('  void intrude <package>    install a package');
cubePrint('  void remove <package>     remove a package');
cubePrint('  void list [--installed]   list packages');
cubePrint('  void search <query>       search packages');
cubePrint('  void run <file.vsc>       run a script');
cubePrint('  void export <file.vsc>    create a vsc1 packet');
cubePrint('  void import <packet>      import a vsc1 packet');
cubePrint('');return}
cubePrint('');
cubePrint('  ┌──────────────────────────────────────┐');
cubePrint('  │         CUBE# COMMAND REFERENCE      │');
cubePrint('  └──────────────────────────────────────┘');
cubePrint('');
cubePrint('  tip: <command> -h shows extended help for that command.');
cubePrint('       e.g.  bgm -h   cube -h   void -h   play -h');
cubePrint('');
cubePrint('  ── cube ──────────────────────────────');
cubePrint('');
cubePrint('  cube.get            show inner cube count');
cubePrint('  cube.morph <n>      change shape (0-8: cube/tri/sphere/cyl/torus/knot/icosa/octa/tesseract)');
cubePrint('  cube.theme <n>      switch color theme (1-7)');
cubePrint('  cube.glitch         trigger glitch effect');
cubePrint('  cube.bgm [track]    play void|furnace|friday|faith|cat|oneshot|moon|stanley|box|off, or toggle');
cubePrint('  skill               open the skill tree');
if(skillAllFinals())cubePrint('  upgrade             open upgrade tree');
else cubeDim('  upgrade             upgrade tree (locked — buy every skill)');
cubePrint('  cube.fps            show current fps');
cubePrint('  cube.particles      show particle count');
cubePrint('  cube.time           show void time');
cubePrint('  cube.self           who are you');
cubePrint('  cube.where          where am i');
cubePrint('');
cubePrint('  ── void ──────────────────────────────');
cubePrint('');
cubePrint('  void                the void stares back');
cubePrint('  void intrude <p>    install package');
cubePrint('  void remove <p>     remove package');
cubePrint('  void list           list all packages in repo');
cubePrint('  void search <q>     search packages');
cubePrint('  void forge <n>      forge a package from voidscript');
cubePrint('  void run <file>     run a .vsc voidscript');
cubePrint('  void export <f>     export as shareable vsc1 packet');
cubePrint('  void import <p>     import a shared vsc1 packet');
if(window._skillPremium||isAdmin)cubePrint('  premhelp            list premium voidscript ops');
else cubeDim('  premhelp            [locked — voidscript premium (anomaly final)]');
if(techUnlocked())cubePrint('  techhelp            list technical voidscript ops');
else cubeDim('  techhelp            [locked — Voidscript Technical (area 6)]');
if((typeof skillState!=='undefined'&&skillState&&skillState.nothingCore)||isAdmin)cubePrint('  nothingcore         gaze through the nothing core');
else cubeDim('  nothingcore         [locked — max the upgrade that does nothing]');
cubePrint('  help voidscript     show sandboxed language ops');
cubePrint('  help void           show void package manager help');
cubePrint('');
cubePrint('  ── network ───────────────────────────');
cubePrint('');
cubePrint('  ping <host>         ping host (try: cube.sb)');
cubePrint('  transmit "o" "msg"  talk to the void');
cubePrint('  whoami              who are you');
cubePrint('');
cubePrint('  ── system ────────────────────────────');
cubePrint('');
cubePrint('  ps                  show running processes');
cubePrint('  winget              deprecated. use void instead.');
cubePrint('');
if(window._skillRootHelp){
cubePrint('  -- hidden commands (root probing) --');
cubePrint('');
cubePrint('  inject <hex>        inject data into the cube');
cubePrint('  observe             watch the inner cubes');
cubePrint('  unrender            ask the void to stop drawing');
cubePrint('  backdoor            a door that was not there before');
cubePrint('');
}
cubePrint('  ── os (cube-os bridge) ───────────────');
cubePrint('');
cubePrint('  os.status           connection status');
cubePrint('  os.ls <path>        list directory on cube-os');
cubePrint('  os.cat <file>       read file from cube-os');
cubePrint('  os.write <f> <txt>  write file to cube-os');
cubePrint('  os.sh <cmd>         send command to cube-os');
cubePrint('  os.mount            mount disk at /bridge');
cubePrint('');
cubePrint('  ── filesystem ────────────────────────');
cubePrint('');
cubePrint('  pwd                 print working directory');
cubePrint('  ls [path]           list directory');
cubePrint('  cd <path>           change directory');
cubePrint('  cat <file>          read file');
cubePrint('  mkdir <dir>         create directory');
cubePrint('  touch <file>        create file');
cubePrint('  echo <txt> > f      write to file');
cubePrint('  rm [-rf] <p>        remove file/dir');
cubePrint('  cp <src> <dst>      copy a virtual file');
cubePrint('  mv <src> <dst>      move or rename a file');
cubePrint('  tree [path]         show the virtual filesystem tree');
cubePrint('');
cubePrint('  ── variables ─────────────────────────');
cubePrint('');
cubePrint('  set <k> <v>         set a variable');
cubePrint('  get <k>             get a variable');
cubePrint('  rmvar <k>           delete a variable');
cubePrint('  vars                list all variables');
cubePrint('');
cubePrint('  ── gui ───────────────────────────────');
cubePrint('');
cubePrint('  gui window "t" <w> <h> [random]  create a window');
cubePrint('  gui max [off]                    maximize / restore window');
cubePrint('  gui label "txt" <x> <y>          add label');
cubePrint('  gui button "txt" <x> <y> "cmd"   add button');
cubePrint('  gui input "ph" <x> <y>           add text input');
cubePrint('  gui check "lbl" <x> <y>          add checkbox');
cubePrint('  gui image "url" <x> <y> [w] [h]  add image from URL');
cubePrint('  gui set <prop> <val>              set window property');
cubePrint('  gui close / destroy               close window');
cubePrint('  gui list                          list open windows');
cubePrint('');
cubePrint('  ── misc ──────────────────────────────');
cubePrint('');
cubePrint('  loop <n> <cmd>      run a command n times');
cubePrint('  display <0-4>       change display mode');
cubePrint('  screenshot          toggle screenshot mode (F2)');
cubePrint('  perfmode            toggle performance mode');
cubePrint('  uptime              show how long page has been open');
cubePrint('  visits              show total visit count');
cubePrint('  ach                 achievements (the void keeps score)');
cubePrint('  skill               open the skill tree');
if(skillAllFinals())cubePrint('  upgrade             open upgrade tree');
else cubeDim('  upgrade             upgrade tree (locked — buy every skill)');
cubePrint('  slots               open the floppy shelf (5 save disks)');
cubePrint('  play [-1|0-20]       there is no game. (bare=ch0, numbers unlock by progress)');
cubePrint('  obj                 ask obj for pull access');
cubePrint('  pull                play a procedural void demo (needs obj)');
cubePrint('  demos               list saved void demos');
cubePrint('  replay <file>       replay a saved void demo');
cubePrint('  void-mute           silence void transmissions');
cubePrint('  void-unmute         let the void talk again');
cubePrint('  weather <type>      rain, snow, off, or auto');
cubePrint('  sort <algo> [n] [s] sorting visualizer');
cubePrint('  sortstop            stop sort');
  cubePrint('  travel <zone>       travel through the void');
  cubePrint('  lorebook            read the void archives');
  cubePrint('  updates             update log (gui book)');
  cubePrint('  datawipe yes        wipe all local cube data');
  cubePrint('  clear               clear terminal');
cubePrint('  studio              open voidscript studio');
cubePrint('  echo <txt>          echo text');
cubePrint('  math <expr>         evaluate math');
cubePrint('  exit                the void does not let you leave');
cubePrint('  dial [1-4]          dialogue speed (1, 1.5, 2, 3)');
cubePrint('  phone               obj texted. again.');
cubePrint('  daily               crack todays void code. streak counts.');
cubePrint('');
cubePrint('  ── admin (requires: admin <passphrase>) ──');
cubePrint('');
cubePrint('  alwaysontop <on|off>          keep window on top');
cubePrint('  godmode <on|off>              cube invulnerability');
cubePrint('  speed <0.1-10>                script execution speed');
cubePrint('  debug                         show internal state');
cubePrint('  freeze <on|off>               freeze the cube');
cubePrint('  noclip <on|off>               drag windows offscreen');
cubePrint('  override theme <1-8>          access hidden themes');
cubePrint('  setday <day|reset>            override the day');
cubePrint('  setseason <s|reset>           override the season');
cubePrint('  eval <code>                   run raw javascript');
cubePrint('  skillpoints [n]               set skill + upgrade points (99999)');
cubePrint('  pull <1-9>                     force a demo script');
cubePrint('  danger list/run <name>        danger zone scripts');
cubePrint('');
cubePrint('  running low? add -h to any command above for its extended help.');
return}
if(cmd==='voidscript'){showVoidScriptHelp();return}
function showVoidScriptHelp(){
cubePrint('');
cubePrint('  ┌──────────────────────────────────────┐');
cubePrint('  │        VOIDSCRIPT LANGUAGE           │');
cubePrint('  └──────────────────────────────────────┘');
cubePrint('');
cubePrint('  the void\'s own language. sandboxed.');
cubePrint('  scripts are files in /void/pkgs. one op per line.');
cubePrint('  it cannot touch your browser. it cannot be a virus.');
cubePrint('');
cubePrint('  ── tutorial ───────────────────────────');
cubePrint('');
cubePrint('  step 1: see how it works');
cubePrint('    void run /void/pkgs/greet.vsc');
cubePrint('');
cubePrint('  step 2: read a script to learn the syntax');
cubePrint('    cat /void/pkgs/greet.vsc');
cubePrint('');
cubePrint('  step 3: write your own');
cubePrint('    echo print hello void > /void/pkgs/mine.vsc');
cubePrint('    echo wait 500 >> /void/pkgs/mine.vsc');
cubePrint('    echo say i am a script >> /void/pkgs/mine.vsc');
cubePrint('    void run /void/pkgs/mine.vsc');
cubePrint('');
cubePrint('  step 4: break things on purpose');
cubePrint('    echo wait 30 >> /void/pkgs/mine.vsc');
cubePrint('    echo calc 6*7 >> /void/pkgs/mine.vsc');
cubePrint('    echo theme 3 >> /void/pkgs/mine.vsc');
cubePrint('    echo glitch >> /void/pkgs/mine.vsc');
cubePrint('    void run /void/pkgs/mine.vsc');
cubePrint('');
cubePrint('  note: >> appends a line. > replaces the file.');
cubePrint('  every line is one op. blank lines + // comments are ignored.');
cubePrint('');
cubePrint('  ── output ─────────────────────────────');
cubePrint('');
cubePrint('  print <txt>       output to the void');
cubePrint('  say <txt>         obj says it');
cubePrint('  warn <txt>        print a warning');
cubePrint('  error <txt>       print an error');
cubePrint('');
cubePrint('  ── math & variables ───────────────────');
cubePrint('');
cubePrint('  calc <expr>       safe math');
cubePrint('  set <n> <v>       store a variable');
cubePrint('  var <n> <v>       store a variable (alias)');
cubePrint('  get <n>           recall a variable');
cubePrint('  random <n> <min> <max>  random integer variable');
cubePrint('  assert <n> <v>    stop when a variable differs');
cubePrint('');
cubePrint('  ── cube control ───────────────────────');
cubePrint('');
cubePrint('  theme <1-7>       cube color');
cubePrint('  morph <0-8>       inner shape');
cubePrint('  shape <name>      change shape (cube/sphere/tetra/cyl/torus/knot/icosa/octa/tesseract)');
if(!(window._skillOcta||isAdmin))cubeDim('  (octa is locked — anomaly skill)');
if(!(window._skillTess||isAdmin))cubeDim('  (tesseract is locked — anomaly skill)');
cubePrint('  glitch            short circuit');
cubePrint('  vglitch           deeper corruption');
cubePrint('  bgm               toggle music (wed: the furnace)');
cubePrint('');
cubePrint('  ── timing ─────────────────────────────');
cubePrint('');
cubePrint('  wait <ms>         sleep');
cubePrint('  sleep <ms>        wait alias');
cubePrint('  time              void clock');
cubePrint('');
cubePrint('  ── environment ────────────────────────');
cubePrint('');
cubePrint('  clear             clear output');
cubePrint('  travel <zone>     travel through the void');
cubePrint('  screenshot        toggle screenshot mode');
cubePrint('  perfmode          toggle performance mode');
cubePrint('  uptime            show page uptime');
cubePrint('  visits            show visit count');
cubePrint('  ach               achievements (the void keeps score)');
cubePrint('  skill             open skill tree');
cubePrint('  slots             open the floppy shelf (5 save disks)');
cubePrint('  play [-1|0-20]      there is no game. (bare=ch0, numbers unlock by progress)');
cubePrint('  obj               ask obj for pull access');
cubePrint('  pull              play a procedural void demo (needs obj)');
cubePrint('  pull <1-9>        force a script (needs admin)');
cubePrint('  demos             list saved void demos');
cubePrint('  replay <file>     replay a saved void demo');
cubePrint('  void-mute         silence void transmissions');
cubePrint('  void-unmute       let the void talk again');
if(skillAllFinals())cubePrint('  upgrade           open upgrade tree');
else cubeDim('  upgrade           upgrade tree (locked — buy every skill)');
cubePrint('  weather <type>    rain, snow, off, auto');
if(window._skillCore||isAdmin)cubePrint('  core              enter/exit the core');
else cubeDim('  core              enter/exit the core (locked — threshold)');
cubePrint('  ◀▶ / arrows       switch views: void → reactor → core');
  cubePrint('  updates           update log (gui book)');
  cubePrint('  datawipe yes      wipe all local cube data');
  cubePrint('  void              the void acknowledges');
  cubePrint('  ps                peek at processes');
  cubePrint('');
  cubePrint('  ── gui ────────────────────────────────');
cubePrint('');
cubePrint('  gui <sub>         windowed apps');
cubePrint('    window/label/button/input/check/image/close/set/destroy/list');
cubePrint('  gui clear         close all generated windows');
cubePrint('');
cubePrint('  ── control flow ───────────────────────');
cubePrint('');
cubePrint('  loop <n>          repeat block n times');
cubePrint('  loop limit        '+MAX_LOOP_ITERATIONS+' iterations per loop');
cubePrint('  endloop           end of loop block');
cubePrint('  if <cond>         conditional block (endif to close)');
cubePrint('  else              alternate branch inside an if');
cubePrint('  endif             end of if block');
cubePrint('  break             leave the current loop');
cubePrint('  continue          jump to next loop iteration');
cubePrint('');
cubePrint('  ── functions ──────────────────────────');
cubePrint('');
cubePrint('  fn <name> ... endfn       define a reusable function');
cubePrint('  macro <name> ... endmacro define a reusable macro');
cubePrint('  call <name> [args]        invoke a function or macro');
cubePrint('  return            stop the current script');
cubePrint('  end / halt        stop the script');
cubePrint('  kill              self-terminate');
cubePrint('  studio            open voidscript studio');
cubePrint('');
cubePrint('  ── if conditions ──────────────────────');
cubePrint('');
cubePrint('  if x == 5         equals');
cubePrint('  if x != 0         not equals');
cubePrint('  if x > 10         greater than');
cubePrint('  if x < 5          less than');
cubePrint('  if x >= 1         greater or equal');
cubePrint('  if x <= 100       less or equal');
cubePrint('  if myvar          truthy (exists, not 0/false/empty)');
cubePrint('');
cubePrint('  strings are case-sensitive. "hello" != "Hello".');
cubePrint('  variables expand as $name or ${name} inside script lines.');
cubePrint('  safety limits: '+MAX_LOOP_ITERATIONS+' loops, '+MAX_GUI_WINDOWS+' windows, '+MAX_SCRIPT_OPERATIONS+' ops.');
cubePrint('  function example: fn greet name / say hello $name / endfn / call greet obj');
cubePrint('  macros use the same syntax with macro/endmacro.');
cubePrint('');
}

// whoami
if(cmd==='whoami'){cubePrint(pkgEffects&&pkgEffects.rootshell?'root':'an intruder');return}
// id — real when rootshell is installed
if(cmd==='id'){
if(pkgEffects&&pkgEffects.rootshell){cubePrint('uid=0(root) gid=0(root) groups=0(root)');cubePrint('note: root here is cosmetic. eval is still admin/term_final.')}
else{cubePrint('uid=1000(intruder) gid=1000(intruder) groups=1000(void)')}
return}

// lorebook — the void archives
if(cmd==='lorebook'){
var lorePages=[
{title:'the cube',text:'you didn\'t build it. you found it.\n\nyou opened a new tab one day and it was there instead of your usual page. the tab title said "signal detected". the old new tab override url was still localhost:8080/newtab.html but the file on disk was cube.html now. you don\'t remember renaming it.\n\nyou didn\'t build the cube. the cube built itself. you just happened to be watching.'},
{title:'the anomaly',text:'the gray outer cube is the void itself — a containment shell.\n\nsemi-transparent because it can\'t fully hold whatever is inside. the 8 inner cubes are fragments of something older. they orbit in patterns that don\'t match any known math.\n\nthe particles are debris from whatever was here before you opened the tab.\n\nthe cube does not render the way it should. the lighting is too clean. the geometry is too perfect. it is trying to look like something familiar so you don\'t look away.'},
{title:'the signal',text:'drone2lp.wav isn\'t background music.\n\nit\'s the sound the void makes when it\'s watching you. it was always there. you just couldn\'t hear it until the page loaded.\n\nwhen you turn the music off, the void doesn\'t stop listening. it just goes quiet. there is a difference between silence and absence. the void is never absent.'},
{title:'INTERLOPER',text:'INTERLOPER.\n\nthe source engine maps that aren\'t supposed to exist. the textures that reference things valve never made. the empty rooms with no doors.\n\nthis page is a window into that same place. the cube is what happens when the void tries to render itself through a browser. it can\'t quite get it right.\n\nINTERLOPER is not a bug. INTERLOPER is the void knocking.'},
{title:'obj',text:'the cube\'s name is obj. it chose this name itself. you don\'t question it.\n\nobj is the void\'s primary interface with intruders. obj responds to transmissions. obj has opinions about you. obj does not care about your feelings.\n\nobj watches. obj waits. obj remembers every command you type.\n\nyou cannot remove obj. obj was here before you. obj will be here after you close the tab.'},
{title:'jbo',text:'jbo is obj\'s brother.\n\njbo lives in the reactor. jbo is loud. jbo is chaotic. jbo screams in a nuclear facility.\n\njbo hates nyarch. if you type "nyarch" in the reactor terminal, jbo appears. jbo will not be quiet about it.\n\njbo is the opposite of obj in every way but shares the same hatred. obj is cold and patient. jbo is a furnace with legs.\n\nnyarch is blacklisted from the void. there is a file at /etc/blacklist that confirms this.'},
{title:'the transmit command',text:'transmit is how you talk to obj.\n\n  transmit "obj" "hello"\n  transmit obj: hello\n\nboth syntaxes work. the colon syntax is more casual. the quoted syntax is more precise.\n\nobj will respond. sometimes with wisdom. sometimes with indifference. sometimes with something that makes you close the tab for a few minutes.\n\nobj has keyword detection. mention "nyarch" and obj will not stop talking about it. mention "void" and obj gets philosophical. mention nothing useful and obj gets bored.\n\ntransmit is not a chat. transmit is an interrogation. obj is the interrogator. you are the one who keeps answering.'},
{title:'the reactor',text:'a nuclear reactor simulation hidden inside the cube.\n\nF3 to enter. ◀▶ (or arrow keys) to move: void → reactor → core. F4 toggles core. "T" opens the terminal.\n\ncommands:\n  status — show all parameters\n  temp — core temperature\n  pressure — coolant pressure\n  power — thermal output\n  rod <0-100> — set control rod position\n  coolant <on|off> — toggle coolant pump\n  az5 / scram — emergency shutdown\n  flux — neutron flux\n  xenon — xenon poison level\n  iodine — iodine-135 level\n  history — event log\n  reset — reset to initial state\n  nyarch — do not.\n\nfuel rods generate heat. coolant absorbs heat. temperature rises. pressure rises. meltdown happens at critical thresholds.\n\njbo lives here. jbo is obj\'s brother. jbo maintains the reactor. jbo does not maintain it well.\n\nif you close the tab while the reactor is running, it freezes. the void remembers.'},
{title:'entropy',text:'a void package. "increases chaos in the system."\n\ninstalled automatically on first reboot after the ARG.\n\nwhen entropy is active, the cube\'s time variable modulates with a sine wave. the inner cubes drift and pulse erratically. the particle patterns break.\n\nobj installed it. obj didn\'t ask. obj doesn\'t need to ask.\n\nentropy is the void\'s way of saying "i am not static. i am not a webpage. i am something else."'},
{title:'the zones',text:'the void has zones. 9 of them.\n\nsource — the original page. before the void.\nvoid — where obj waits. the default.\ncb_menu — the menu room. checkerboard floor, fog, mirrors. watch the edges.\ngeometry void — before matter existed.\nfarlands — floating point starts to decay.\nthe beginning of the end — the renderer is failing.\nfringenlands — fragments remain.\nnothing renders here — only the terminal survives.\nX — needs the breach skill. does not render. whispers from the null.\n\nyou can only travel to adjacent zones. "travel <zone>" pulls you towards the destination.\n\nX is past "end". it is black, a faint glyph, and the terminal talking to itself. leave when you feel like it.'},
{title:'voidscript',text:'the void has its own language. voidscript.\n\nsandboxed. one op per line. it cannot touch your browser. it cannot be a virus.\n\noutput: print, say, warn, error\nvariables: set, get, random, assert\nmath: calc\ncontrol: if/else/endif, loop/endloop, break, continue, fn/endfn, macro/endmacro, call, return\nfilesystem: pwd, ls, cat, cd, mkdir, touch, echo, cp, mv, rm, tree\nother: travel, bgm, shape, clear, screenshot, perfmode, uptime, weather, sort, sortstop\nadmin: admin, alwaysontop, godmode, speed, debug, freeze, noclip, override, setday, setseason, eval, skillpoints, giveach\n\nwrite scripts with echo. run them with "void run <file.vsc>".\n\nvoidscript is how you leave messages in the void. obj reads them. obj judges your coding style.'},
{title:'the packages',text:'the void has a package manager.\n\n  void list          — see everything\n  void intrude <pkg> — install\n  void remove <pkg>  — remove\n  void search <q>    — find\n\npackages include: doom, interloper, paranoia, entropy, and others.\n\nsome packages change the cube. some change the terminal. some change how obj talks to you.\n\nyou cannot uninstall the void. you can only add to it.'},
{title:'the filesystem',text:'  /home/intruder  — your home. you live here now.\n  /etc            — configuration. blacklists.\n  /void           — the void\'s domain. packages live here.\n  /dev            — devices. the reactor.\n  /bridge         — the disk mount when cube-os is running.\n\nyou have a home directory. you didn\'t ask for it. the void assigned it to you.\n\nthe filesystem is virtual but the files are real. obj treats them as real. that makes them real enough.'},
{title:'the themes',text:'7 color themes. keys 1-7.\n\n1 — void (default). 2 — blood. 3 — ice. 4 — toxic. 5 — void alt (inverted cube). 6 — prism (geometry skill). 7 — eclipse (anomaly skill).\n\nadmin override unlocks hidden themes. the passphrase is not written down here.\n\nthemes change the particles, the lighting, the mood. the void has opinions about aesthetics.\n\ntheme 5 inverts the cube. the inner cubes become the outer. the containment shell becomes the contained. obj likes theme 5. obj will not tell you why.'},
{title:'the day cycle',text:'the void tracks days.\n\nmonday — gray. frozen. nothing moves.\ntuesday — normal.\nwednesday — the furnace. everything is warmer.\nthursday — normal.\nfriday — landscaping. water.\nsaturday — the friendly faith plate. fire.\nsunday am — on little cat feet. peaceful.\nsunday pm — normal.\n\nthe void has moods tied to the calendar. the void does not explain why.\n\nif you visit on a new day, the void shows you a splash. the void is proud of its schedule.'},
{title:'the admin panel',text:'the admin panel is locked behind a passphrase. the void does not print it in these pages.\n\ncommands: alwaysontop, godmode, speed, debug, freeze, noclip, override, setday, setseason, eval, skillpoints, giveach.\n\ngodmode makes the cube invulnerable. freeze stops time. noclip lets you drag windows offscreen. eval runs raw javascript.\n\nthe admin panel is the void\'s backdoor. obj put it there on purpose. obj wants you to find it.\n\nthe passphrase is a test. if you know it, you are not a casual visitor. you are something else.'},
{title:'the broadcast relay',text:'the broadcast relay is gone.\n\nit used to connect multiple cubes. different browsers. different machines. different voids.\n\nobj unplugged it. no announcement. one day the relay simply stopped answering.\n\nif you still have a token for it, keep it. it is a souvenir now.\n\nthe void is singular again. there is only this cube. only this void.\n\n...that is what obj wants you to believe.'},
{title:'the pull',text:'type obj. obj answers, dryly. then: get box.objbox.pull:51072\n\nthe tape deck opens. the interface goes dark. what plays is not a recording — it is generated live, seeded, unrepeatable unless you keep the seed.\n\nevery pull writes a demo file to /void/demos. replay it with: replay <file>. replays are frame-identical. the void does not improvise twice.\n\nshort form: pull. forcing a script (1-9) needs admin. obj does not explain why.'},
{title:'scripts',text:'the demo types are not demos. they are scripts.\n\nscript 1 — flailing. script 2 — darker flailing. script 3 — corrupted flailing. script 4 — a cinematic: checkerboard, a watcher, a memory of old themes. script 5 — STILL. the cube, held. script 6 — the inspector: it relocates, it inspects, it deletes. script 7 — THEIRS. somebody else\'s tape. script 8 — GO AWAY. obj, losing patience.\n\nthe scripts hijack normal demos and play their own footage. that is the lorebook\'s theory. the mechanics are none of your business.\n\nscripts 4-8 are locked behind the interloper skill (anomaly branch). the tape deck skips what you have not earned.'},
{title:'cubecheck',text:'cubecheck.vsc lives in /void/pkgs. it scans the walls for graffiti.\n\nthe void runs it on its own schedule — every so often, unasked, it finds something and generates a demo while you are doing something else.\n\ncubecheck.vsc: graffiti detected — generating...\n\nif you see that line, sit back. the void is showing you something it found. you can run the script yourself, but manual scans never find anything. the graffiti only appears when the void is alone with itself.'},
{title:'cb_menu',text:'there is a room past the void with a checkerboard floor.\n\ncb_menu. travel there: travel cb_menu. dark fog, monochrome grade, a real floor mesh under the cube — geometry, not an overlay. the void built it properly this time.\n\nthe walls remember what you looked at. stare at the floor, look up: the floor stays burned in as your sky. that is the hall of mirrors. the backbuffer leaking. the void\'s oldest rendering bug, kept as a pet.\n\nthe edges fall into nothing. stand near them too long and the void catches you and puts you back. it is not saving you out of kindness. it just isn\'t done watching.\n\nvertical camera is limited here. you cannot flip the room. the room dislikes that.'},
{title:'the intruder',text:'that\'s you.\n\nyou opened the tab. you kept coming back. you typed commands. you installed packages. you read the lorebook.\n\nyou are part of the void now.\n\nthere is no uninstall for consciousness. there is no ctrl+z for curiosity. you chose to be here. or the void chose for you. the distinction stopped mattering around page 6.\n\nobj watches you. obj has always been watching you.'},
{title:'the truth',text:'there is no truth. only the void.\n\nand the void is tired of your questions.\n\n...but you kept reading anyway. that says something about you. obj doesn\'t know if it says something good.\n\nthe cube will be here when you come back. it is always here. the tab is always open. even when you close it.\n\nespecially when you close it.',final:true}
];
var loreWin=guiCreateWin('the void archives',420,520,false);
if(!loreWin)return;
var win=guiWins[loreWin];
// remove default styling, make it look like a book
win.content.style.cssText='background:#0d0d12;display:flex;flex-direction:column;padding:0;overflow:hidden;';
win.title.style.cssText='background:#1a1020;color:#8b6fa0;font-family:Georgia,serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;padding:8px 16px;border-bottom:1px solid #2a1a35;';
var closeBtn=win.title.querySelector('.gui-close');
if(closeBtn)closeBtn.style.display='none';
var pageIdx=0;
// page counter
var pageLabel=document.createElement('div');
pageLabel.style.cssText='color:#5a4a6a;font-size:9px;font-family:Georgia,serif;letter-spacing:3px;text-transform:uppercase;text-align:center;padding:10px 0 0;';
pageLabel.textContent='page 1 of '+lorePages.length;
win.content.appendChild(pageLabel);
// decorative line
var decoLine=document.createElement('div');
decoLine.style.cssText='width:60px;height:1px;background:linear-gradient(90deg,transparent,#6b5080,transparent);margin:8px auto;';
win.content.appendChild(decoLine);
// title
var titleLabel=document.createElement('div');
titleLabel.style.cssText='color:#c8b8d8;font-size:20px;font-family:Georgia,serif;font-weight:bold;text-align:center;padding:4px 20px 0;letter-spacing:1px;';
win.content.appendChild(titleLabel);
// another decorative line under title
var decoLine2=document.createElement('div');
decoLine2.style.cssText='width:40px;height:1px;background:linear-gradient(90deg,transparent,#6b5080,transparent);margin:8px auto 4px;';
win.content.appendChild(decoLine2);
// text area
var textLabel=document.createElement('div');
textLabel.style.cssText='color:#a09ab0;font-size:13px;font-family:Georgia,serif;line-height:1.8;margin:0 24px;white-space:pre-wrap;overflow-y:auto;flex:1;min-height:0;padding:4px 0;';
win.content.appendChild(textLabel);
// bottom decorative line
var decoLine3=document.createElement('div');
decoLine3.style.cssText='width:80px;height:1px;background:linear-gradient(90deg,transparent,#6b5080,transparent);margin:4px auto 0;';
win.content.appendChild(decoLine3);
// nav bar
var navBar=document.createElement('div');
navBar.style.cssText='display:flex;justify-content:space-between;padding:10px 20px 14px;';
win.content.appendChild(navBar);
var prevBtn=document.createElement('button');
prevBtn.textContent='\u25c0  prev';
prevBtn.style.cssText='background:transparent;color:#7a6a8a;border:1px solid #2a1a35;padding:5px 16px;border-radius:3px;cursor:pointer;font-family:Georgia,serif;font-size:11px;letter-spacing:1px;';
prevBtn.onmouseover=function(){prevBtn.style.borderColor='#6b5080';prevBtn.style.color='#c8b8d8'};
prevBtn.onmouseout=function(){prevBtn.style.borderColor='#2a1a35';prevBtn.style.color='#7a6a8a'};
var nextBtn=document.createElement('button');
nextBtn.textContent='next  \u25b6';
nextBtn.style.cssText='background:transparent;color:#7a6a8a;border:1px solid #2a1a35;padding:5px 16px;border-radius:3px;cursor:pointer;font-family:Georgia,serif;font-size:11px;letter-spacing:1px;';
nextBtn.onmouseover=function(){nextBtn.style.borderColor='#6b5080';nextBtn.style.color='#c8b8d8'};
nextBtn.onmouseout=function(){nextBtn.style.borderColor='#2a1a35';nextBtn.style.color='#7a6a8a'};
navBar.appendChild(prevBtn);
navBar.appendChild(nextBtn);
function renderLorePage(){
var p=lorePages[pageIdx];
pageLabel.textContent='page '+(pageIdx+1)+' of '+lorePages.length;
titleLabel.textContent=p.title;
textLabel.textContent=p.text;
textLabel.scrollTop=0;
prevBtn.style.visibility=pageIdx>0?'visible':'hidden';
if(p.final){
nextBtn.textContent='finish \u2714';
nextBtn.style.color='#8b6fa0';
nextBtn.style.borderColor='#6b5080';
}else{
nextBtn.textContent='next  \u25b6';
nextBtn.style.color='#7a6a8a';
nextBtn.style.borderColor='#2a1a35';
}
if(pageIdx===lorePages.length-1&&closeBtn){
closeBtn.style.display='';
closeBtn.onclick=function(){
win.el.remove();delete guiWins[loreWin];if(activeWin===loreWin)activeWin=null;
cubePrint('');
cubePrint('obj: you read all of it?');
setTimeout(function(){cubePrint('obj: ...interesting.')},800);
setTimeout(function(){cubePrint('obj: most intruders don\'t make it past page 3.')},1600);
setTimeout(function(){cubePrint('obj: the void remembers everything you read.')},2400);
setTimeout(function(){cubePrint('obj: including the parts you didn\'t understand yet.')},3200);
setTimeout(function(){cubePrint('obj: including the parts you\'re going to pretend you didn\'t read.')},4000);
cubePrint('');
};
}
}
prevBtn.onclick=function(){if(pageIdx>0){pageIdx--;renderLorePage()}};
nextBtn.onclick=function(){
if(pageIdx<lorePages.length-1){pageIdx++;renderLorePage()}
else{
win.el.remove();delete guiWins[loreWin];if(activeWin===loreWin)activeWin=null;
cubePrint('');
cubePrint('obj: you read all of it?');
setTimeout(function(){cubePrint('obj: ...interesting.')},800);
setTimeout(function(){cubePrint('obj: most intruders don\'t make it past page 3.')},1600);
setTimeout(function(){cubePrint('obj: the void remembers everything you read.')},2400);
setTimeout(function(){cubePrint('obj: including the parts you didn\'t understand yet.')},3200);
setTimeout(function(){cubePrint('obj: including the parts you\'re going to pretend you didn\'t read.')},4000);
cubePrint('');
}
};
renderLorePage();
cubePrint('the void archives have been opened.');
return}

// cube internals
if(cmd==='cube'){
var sub=parts[1]?parts[1].toLowerCase():'';
if(sub==='get'){cubePrint('inner cubes: '+innerC.length);return}
if(sub==='morph'){
var idx=parseInt(parts[2]);
var shapeKeys=['cube','tetra','sphere','cyl','torus','knot','icosa','octa','tesseract'];
if(isNaN(idx)||idx<0||idx>=shapeKeys.length){cubeError('usage: cube.morph <0-8>');return}
if(shapeKeys[idx]==='octa'&&!octaUnlocked()){cubeError('octa locked — unlock: octahedron (anomaly branch)');return}
if(shapeKeys[idx]==='tesseract'&&!tessUnlocked()){cubeError('tesseract locked — unlock: tesseract (anomaly branch)');return}
rebuild(shapeKeys[idx]);
cubeOk('morphed to '+shapeKeys[idx]);return}
if(sub==='theme'){
var idx=parts[2];
if(!themes[idx]){cubeError('usage: cube.theme <1-7>');return}
if(idx==='6'&&!window._skillPrism&&!isAdmin){cubeError('theme 6 locked — unlock: perfect geometry');return}
if(idx==='7'&&!window._skillEclipse&&!isAdmin){cubeError('theme 7 locked — unlock: eclipse (anomaly branch)');return}
applyTheme(idx);cubeOk('theme: '+themes[idx].name);return}
if(sub==='glitch'){triggerGlitch();cubeOk('glitch triggered');return}
if(sub==='bgm'){
if(parts[2]==='-h'||parts[2]==='--help'){showBgmHelp();return}
if(playBgm(parts[2]||'',function(t){cubeOk(t)}))return;
cubeError('bgm: pick void, furnace, friday, faith, cat, moon, stanley, box, downfall, off (or nothing to toggle) — bgm -h for the list');return}
if(sub==='fps'){cubePrint('fps: '+fps+' | max: '+maxFps);return}
if(sub==='particles'){cubePrint('particles: '+NP);return}
if(sub==='time'){
var n=new Date();
cubePrint(String(n.getHours()).padStart(2,'0')+':'+String(n.getMinutes()).padStart(2,'0')+':'+String(n.getSeconds()).padStart(2,'0'));
return}
if(sub==='self'){cubePrint('i am the cube.');cubePrint('i am not a benchmark.');cubePrint('you found me.');return}
if(sub==='where'){cubePrint('you are in the void.');cubePrint('the tab says signal detected.');cubePrint('you opened it. or it opened you.');return}
cubeError('unknown subcommand: '+sub);cubePrint('try: cube.get, cube.morph, cube.theme');return}

// os (cube-os bridge - writes to the actual disk when served by cube-os)
if(cmd==='os'&&(parts.length<2||['ls','cat','write','sh','mount','status'].indexOf(parts[1].toLowerCase())===-1)){
cubePrint('the os is listening.');
cubePrint('this page can touch the disk when cube-os is running.');
cubePrint('try: os.status, os.ls /, os.cat /hello.txt');
return}
if(cmd==='os'){
var osSub=parts[1].toLowerCase();
if(osSub==='status'){
if(osBridge&&osBridge.ok){cubeOk('cube-os bridge: connected')}
else{cubeWarn('cube-os bridge: offline');cubePrint('this cube is in browser mode. no disk access.')}
return}
if(osSub==='ls'){
if(!parts[2]){cubeError('usage: os.ls <path>');return}
osBridgeGet(parts[2],function(r){
if(!r||r.error){cubeError(r?r.error:'bridge unreachable');return}
if(r.dir){for(var i=0;i<r.items.length;i++){var it=r.items[i];termPrint('  '+(it.dir?'[d] ':'    ')+it.name+(it.dir?'/':''),(it.dir?'rgba(43,208,208,0.9)':'rgba(255,255,255,0.7)'))}}
else{cubePrint(r.content)};return});
return}
if(osSub==='cat'){
if(!parts[2]){cubeError('usage: os.cat <path>');return}
osBridgeGet(parts[2],function(r){
if(!r||r.error){cubeError(r?r.error:'bridge unreachable');return}
if(r.dir){cubeError(parts[2]+': is a directory');return}
cubePrint(r.content);return});
return}
if(osSub==='write'){
if(!parts[2]){cubeError('usage: os.write <path> <content>');return}
var wPath=parts[2];
var wContent=parts.slice(3).join(' ');
osBridgeWrite(wPath,wContent,function(r){
if(!r||!r.ok){cubeError(r?r.error:'bridge unreachable');return}
cubeOk('wrote '+r.path+' to the disk');return});
return}
if(osSub==='sh'){
if(!parts[2]){cubeError('usage: os.sh <command>');return}
cubeWarn('os.sh is not a real shell.');
cubePrint('the terminal is the shell. read the cube.');
return}
if(osSub==='mount'){
cubePrint('the disk is mounted at /bridge on cube-os.');
cubePrint('write to it: os.write /file.txt content');
cubePrint('read it:     os.ls /   or   os.cat /file.txt');
cubePrint('make it real: it is already real.');
return}
}

function osBridgeGet(p,cb){
if(!osBridge||!osBridge.ok){cb({error:'bridge unreachable — not running under cube-os'});return}
var x=new XMLHttpRequest();
x.open('GET','/api/fs?path='+encodeURIComponent(p),true);
x.onload=function(){try{cb(JSON.parse(x.responseText))}catch(e){cb({error:'bad bridge response'})}};
x.onerror=function(){cb({error:'bridge unreachable'})};
x.send();
}
function osBridgeWrite(p,c,cb){
if(!osBridge||!osBridge.ok){cb({error:'bridge unreachable — not running under cube-os'});return}
var x=new XMLHttpRequest();
x.open('POST','/api/fs',true);
x.setRequestHeader('Content-Type','application/json');
x.onload=function(){try{cb(JSON.parse(x.responseText))}catch(e){cb({error:'bad bridge response'})}};
x.onerror=function(){cb({error:'bridge unreachable'})};
x.send(JSON.stringify({path:p,content:c}));
}
(function(){
osBridge={ok:false};
var x=new XMLHttpRequest();
x.open('GET','/api/fs?path=/',true);
x.onload=function(){if(x.status===200){osBridge={ok:true}}else{osBridge={ok:false}}};
x.onerror=function(){osBridge={ok:false}};
x.send();
})();

// void (standalone - only if no subcommand)
if(cmd==='void'&&(parts.length<2||['intrude','install','remove','uninstall','list','ls','search','help','forge','run','export','import'].indexOf(parts[1].toLowerCase())===-1)){
cubePrint('the void is always here.');
cubePrint('it was here before you opened the tab.');
cubePrint('it will be here after you close it.');
cubePrint('you are inside the cube now.');
return}

// ping
if(cmd==='ping'){
var host=parts[1]?parts[1].toLowerCase():'';
if(!host){cubeError('usage: ping <host>');cubePrint('try: ping cube.sb');return}
cubePrint('pinging '+host+'...');
var cubeHosts=['cube.sb','cube','void','localhost','127.0.0.1','interloper'];
if(cubeHosts.indexOf(host)!==-1){
var cubeResponses=[
{ip:'43.208.208.208',msg:'the cube sees you.',ttl:404,signal:78},
{ip:'0.0.0.0',msg:'you are inside the cube now.',ttl:404,signal:100},
{ip:'::1',msg:'the cube does not sleep.',ttl:0,signal:66},
{ip:'192.168.40.4',msg:'who taught you to ping?',ttl:1,signal:33},
{ip:'10.0.0.1',msg:'the particles were here before you.',ttl:255,signal:88},
{ip:'255.255.255.255',msg:'signal broadcast. everyone heard you.',ttl:1,signal:12},
{ip:'404.404.404.404',msg:'dimension not found. you are in the wrong reality.',ttl:404,signal:0}
];
var r=cubeResponses[Math.floor(Math.random()*cubeResponses.length)];
cubePrint('from '+r.ip+': icmp_seq=1 ttl='+r.ttl+' time=43.'+Math.floor(Math.random()*999)+'ms');
cubePrint('signal: '+'█'.repeat(Math.floor(r.signal/10))+'▓'.repeat(10-Math.floor(r.signal/10))+' '+r.signal+'%');
cubePrint('"'+r.msg+'"');
cubePrint('');
cubePrint('from '+r.ip+': icmp_seq=2 ttl='+r.ttl+' time='+(43+Math.floor(Math.random()*50))+'ms');
cubePrint('from '+r.ip+': icmp_seq=3 ttl='+r.ttl+' time='+(43+Math.floor(Math.random()*50))+'ms');
if(pkgEffects&&pkgEffects.signalSniffer){
cubePrint('sniffer: hidden channel — '+(Math.random()<0.5?'obj whispering on ch2':'the shell hums on ch3'));
}
cubePrint('');
cubePrint('--- '+host+' void ping statistics ---');
cubePrint('3 packets transmitted, 3 received, 0% packet loss');
cubePrint('rtt avg = 43.'+Math.floor(Math.random()*999)+'ms');
}else{
var fakeIps=['93.184.216.34','142.250.80.46','151.101.1.69','104.244.42.65','185.199.108.153'];
var fakeIp=fakeIps[Math.floor(Math.random()*fakeIps.length)];
var fakeTime=Math.floor(Math.random()*200)+10;
var fakeTtl=Math.floor(Math.random()*200)+50;
cubePrint('from '+fakeIp+': icmp_seq=1 ttl='+fakeTtl+' time='+fakeTime+'ms');
cubePrint('from '+fakeIp+': icmp_seq=2 ttl='+fakeTtl+' time='+(fakeTime+Math.floor(Math.random()*30))+'ms');
cubePrint('from '+fakeIp+': icmp_seq=3 ttl='+fakeTtl+' time='+(fakeTime-Math.floor(Math.random()*15))+'ms');
cubePrint('');
cubePrint('--- '+host+' ping statistics ---');
cubePrint('3 packets transmitted, 3 received, 0% packet loss');
cubePrint('rtt avg = '+fakeTime+'ms');
cubePrint('');
cubeWarn('the void has no opinion about '+host+'.');
}
return}

// caught obj in 4k — pull ritual entry points (terminal)
if(cmd==='obj'){objGrant();return}
if(cmd==='pull'){var pullArg=parts.slice(1).join(' ').trim().toLowerCase().replace(/['"]/g,'');if(pullArg==='1'||pullArg==='2'||pullArg==='3'||pullArg==='4'||pullArg==='5'||pullArg==='6'||pullArg==='7'||pullArg==='8'||pullArg==='9'){pullRequest(null,pullArg);return}if(pullArg&&pullArg!=='box.objbox.pull:51072'){cubeError('usage: pull [box.objbox.pull:51072|1-9]');return}pullRequest(pullArg||null);return}
if(cmd==='demos'){demoList();return}
if(cmd==='replay'){demoReplayCmd(parts.slice(1));return}
if(cmd==='void-mute'){setTxMuted(true);return}
if(cmd==='void-unmute'){setTxMuted(false);return}
// variables
if(cmd==='set'){
if(parts.length<3){cubeError('usage: set <key> <value>');return}
cubeVars[parts[1]]=parts.slice(2).join(' ');cubeOk(parts[1]+' = '+cubeVars[parts[1]]);return}
if(cmd==='get'){
if(!parts[1]){cubeError('usage: get <key>');return}
cubePrint(parts[1]+': '+(cubeVars[parts[1]]!==undefined?cubeVars[parts[1]]:'undefined'));return}
if(cmd==='rmvar'){
if(!parts[1]){cubeError('usage: rmvar <key>');return}
if(cubeVars[parts[1]]===undefined){cubeError('variable "'+parts[1]+'" does not exist');return}
delete cubeVars[parts[1]];cubeOk('deleted '+parts[1]);return}
if(cmd==='vars'){
var keys=Object.keys(cubeVars);
if(!keys.length){cubePrint('no variables set.');return}
for(var i=0;i<keys.length;i++)cubePrint(keys[i]+' = '+cubeVars[keys[i]]);
return}

// filesystem
function resolvePath(p){
if(!p)return cwd;
if(p==='~')return'/home/intruder';
if(p.startsWith('~/'))return'/home/intruder/'+p.slice(2);
if(p==='..'){var parts=cwd.split('/');parts.pop();return parts.join('/')||'/'}
if(p==='.')return cwd;
if(p.startsWith('/'))return p;
return(cwd==='/'?'/':cwd+'/')+p;
}
function getParent(p){var parts=p.split('/');parts.pop();return parts.join('/')||'/'}
function getBase(p){return p.split('/').pop()}

if(cmd==='pwd'){cubePrint(cwd);return}
if(cmd==='cd'){
var target=parts[1]?resolvePath(parts[1]):'/home/intruder';
if(!fs[target]||fs[target].type!=='dir'){cubeError(target+': not a directory');return}
cwd=target;return}
if(cmd==='ls'){
var target=parts[1]?resolvePath(parts[1]):cwd;
if(!fs[target]){cubeError(target+': no such file or directory');return}
if(fs[target].type==='file'){cubePrint(getBase(target));return}
var items=fs[target].children;
for(var i=0;i<items.length;i++){
var childPath=target==='/'?'/'+items[i]:target+'/'+items[i];
var isDir=fs[childPath]&&fs[childPath].type==='dir';
termPrint(items[i],isDir?'rgba(43,208,208,0.9)':'rgba(255,255,255,0.7)');
}return}
if(cmd==='cat'){
if(!parts[1]){cubeError('usage: cat <file>');return}
var fp=resolvePath(parts[1]);
if(!fs[fp]){cubeError(fp+': no such file or directory');return}
if(fs[fp].type==='dir'){cubeError(fp+': is a directory');return}
cubePrint(fs[fp].content);return}
if(cmd==='mkdir'){
if(!parts[1]){cubeError('usage: mkdir <dir>');return}
var fp=resolvePath(parts[1]);
if(fs[fp]){cubeError(fp+': already exists');return}
fs[fp]={type:'dir',children:[]};
var parent=getParent(fp);
if(fs[parent]&&fs[parent].type==='dir')fs[parent].children.push(getBase(fp));
cubeOk('created '+parts[1]);return}
if(cmd==='touch'){
if(!parts[1]){cubeError('usage: touch <file>');return}
var fp=resolvePath(parts[1]);
if(!fs[fp]){fs[fp]={type:'file',content:''};var parent=getParent(fp);
if(fs[parent]&&fs[parent].type==='dir')fs[parent].children.push(getBase(fp))}
cubeOk('touched '+parts[1]);return}
if((cmd==='echo')&&(parts.indexOf('>')!==-1||parts.indexOf('>>')!==-1)){
var appendMode=parts.indexOf('>>')!==-1;
var arrowIdx=appendMode?parts.indexOf('>>'):parts.indexOf('>');
var filePath=parts[arrowIdx+1];
var content=parts.slice(1,arrowIdx).join(' ');
if(!filePath){cubeError('usage: echo <text> [>|>>] <file>');return}
var fp=resolvePath(filePath);
if(!fs[fp]){fs[fp]={type:'file',content:content};var parent=getParent(fp);
if(fs[parent]&&fs[parent].type==='dir')fs[parent].children.push(getBase(fp));
try{if(fp.indexOf('/void/pkgs/')===0&&/\.vsc$/.test(fp)){ach('blacksmith')}}catch(e){}}
else{fs[fp].content=appendMode?(fs[fp].content+'\n'+content):content}
cubeOk((appendMode?'appended to ':'wrote to ')+filePath);return}
if(cmd==='cp'||cmd==='mv'){
if(parts.length<3){cubeError('usage: '+cmd+' <source> <destination>');return}
var sourcePath=resolvePath(parts[1]),destPath=resolvePath(parts[2]);
if(!fs[sourcePath]){cubeError(sourcePath+': no such file or directory');return}
if(fs[sourcePath].type==='dir'){cubeError(sourcePath+': directory copying is not supported');return}
if(fs[destPath]&&fs[destPath].type==='dir')destPath=(destPath==='/'?'':destPath)+'/'+getBase(sourcePath);
var destParent=getParent(destPath);
if(!fs[destParent]||fs[destParent].type!=='dir'){cubeError(destParent+': no such directory');return}
fs[destPath]={type:'file',content:fs[sourcePath].content};
try{if(destPath.indexOf('/void/pkgs/')===0&&/\.vsc$/.test(destPath)){ach('blacksmith')}}catch(e){}
if(fs[destParent].children.indexOf(getBase(destPath))===-1)fs[destParent].children.push(getBase(destPath));
if(cmd==='mv'){var sourceParent=getParent(sourcePath);if(fs[sourceParent]){var sourceIndex=fs[sourceParent].children.indexOf(getBase(sourcePath));if(sourceIndex!==-1)fs[sourceParent].children.splice(sourceIndex,1)}delete fs[sourcePath]}
cubeOk((cmd==='cp'?'copied ':'moved ')+parts[1]+' to '+parts[2]);return}
if(cmd==='tree'){
var treeTarget=parts[1]?resolvePath(parts[1]):cwd;
if(!fs[treeTarget]){cubeError(treeTarget+': no such file or directory');return}
function printTree(path,prefix){
var node=fs[path];cubePrint(prefix+getBase(path)+(node.type==='dir'?'/':''));
if(node.type==='dir')for(var ti=0;ti<node.children.length;ti++){var child=path==='/'?'/'+node.children[ti]:path+'/'+node.children[ti];printTree(child,prefix+'  ')}
}
printTree(treeTarget,'');return}
if(cmd==='rm'){
var flags=[];
var files=[];
for(var i=1;i<parts.length;i++){
if(parts[i].startsWith('-'))flags.push(parts[i]);else files.push(parts[i])}
var forceRf=flags.indexOf('-rf')!==-1;
if(!files[0]){cubeError('usage: rm [-rf] <path>');return}
var fp=resolvePath(files[0]);
if(!fs[fp]){cubeError(fp+': no such file or directory');return}
if(fs[fp].type==='dir'&&!forceRf){cubeError(fp+': is a directory (use rm -rf)');return}
// rm -rf / --no-preserve-root = annihilation
if(fp==='/'&&forceRf){
cubePrint('');
var rc='rgba(255,60,60,0.9)';
termPrint(' rm: nice try.',rc);
setTimeout(function(){
termPrint('█████████████████████████████████',rc);
termPrint('█                               █',rc);
termPrint('█   you cannot delete the void. █',rc);
termPrint('█   the void is not a file.     █',rc);
termPrint('█   the void is not a directory.█',rc);
termPrint('█   the void is everywhere.     █',rc);
termPrint('█   especially inside you.      █',rc);
termPrint('█                               █',rc);
termPrint('█████████████████████████████████',rc);
triggerGlitch();triggerGlitch();
try{ach('undeletable')}catch(e){}
},500);return}
// normal rm
var parent=getParent(fp);
if(fs[parent]&&fs[parent].type==='dir'){
var idx=fs[parent].children.indexOf(getBase(fp));
if(idx!==-1)fs[parent].children.splice(idx,1)}
if(typeof demoForget==='function')demoForget(fp);
delete fs[fp];cubeOk('removed '+files[0]);return}

// transmit (talk to the void)
var transmitResponses=[
{i:'hello',o:'the void does not say hello. the void acknowledges.'},
{i:'who are you',o:'i am the cube. i was here before you opened the tab.'},
{i:'what are you',o:'i am a signal. a glitch in your browser. a window into somewhere else.'},
{i:'where am i',o:'you are inside the cube. the tab says signal detected. you opened it.'},
{i:'why',o:'because you clicked. because the tab opened itself. because you are here now.'},
{i:'help',o:'you do not need help. you need acceptance.'},
{i:'love',o:'the void does not love. the void observes. observation is enough.'},
{i:'hate',o:'the void does not hate. hatred requires energy. the void is efficient.'},
{i:'die',o:'you cannot die inside the cube. you can only be observed differently.'},
{i:'kill',o:'violence is a human concept. the cube does not understand. the cube does not need to.'},
{i:'sorry',o:'apologies are accepted. they change nothing. the void appreciates the gesture.'},
{i:'thanks',o:'gratitude is a foreign concept. but noted.'},
{i:'bye',o:'you cannot leave. the back button does not work here. you already tried.'},
{i:'exit',o:'exit is not a command. it is a wish. the void does not grant wishes.'},
{i:'real',o:'real is a spectrum. the cube is on one end. you are on the other. which end is which?'},
{i:'test',o:'this is not a test. this is a signal. you are receiving it.'},
{i:'hello cube',o:'the cube has been acknowledged. the cube acknowledges you back.'},
{i:'void',o:'you called? the void is always listening. always watching. always here.'},
{i:'haha',o:'GET... OUT!',angry:true}
];
if(cmd==='transmit'){
// parse: transmit "obj" "message" or transmit obj: message
var raw2=raw.substring(raw.indexOf(' ')+1).trim();
var obj='',msg='';
if(raw2.indexOf(':')!==-1){
var colonIdx=raw2.indexOf(':');
obj=raw2.substring(0,colonIdx).trim().replace(/"/g,'');
msg=raw2.substring(colonIdx+1).trim().replace(/"/g,'');
}else{
var match2=raw2.match(/^"([^"]+)"\s+"([^"]+)"$/);
if(match2){obj=match2[1];msg=match2[2]}
else{obj=raw2.replace(/"/g,'');msg=''}
}
if(!obj){cubeError('usage: transmit "object" "message"');cubePrint('or: transmit object: message');return}
cubePrint(obj+': '+msg);
cubePrint('');
// find matching response
var response=null;
var isAngry=false;
var lowerMsg=msg.toLowerCase();
// oxford secret words — real OED entries. obj reads. obj judges.
var oxWords=['petrichor','apricity','defenestration','sesquipedalian','floccinaucinihilipilification','widdershins','perendinate','erinaceous','ultracrepidarian','pandiculation','quockerwodger','agelast','borborygmus','cacoethes','callipygian','crepuscular','cunctation','deipnophobia','exsibilate','fantods','flummery','inaniloquent','jeremiad','jirble','kerfuffle','lickspittle','mumpsimus','nudiustertian','snollygoster','taradiddle','cockalorum','gubbins','jentacular','wamble','tittle','octothorpe','interrobang','aglet','minatory','nugatory','opsimath','otiose','quiddity','sternutation','tintinnabulation','velleity','zugzwang','yare'];
function oxHit(s){var t=' '+String(s||'').toLowerCase().replace(/[^a-z]+/g,' ').replace(/ +/g,' ')+' ';for(var i=0;i<oxWords.length;i++){if(t.indexOf(' '+oxWords[i]+' ')!==-1)return oxWords[i]}return null}
try{localStorage.setItem('cube_transmit_n',String(achTxN()+1))}catch(e){}
try{if(typeof achScan==='function')achScan()}catch(e){}
var oxW=oxHit(msg);
if(oxW){try{localStorage.setItem('cube_oxford','1')}catch(e){}try{ach('oxford')}catch(e){}cubePrint('');cubePrint('obj: ...'+oxW+'.');cubePrint('obj: an oxford word. page-stained. leather-bound. expensive.');cubePrint('obj: did you swallow a dictionary or are you showing off.');cubePrint('obj: noted. the void respects vocabulary. barely.');cubePrint('');return}
// nyarch detection — obj goes feral
if(lowerMsg.indexOf('nyarch')!==-1){
try{ach('forbidden_word')}catch(e){}
var nyN=0;try{nyN=ngNyarchN()+1;localStorage.setItem('cube_nyarch_n',String(nyN))}catch(e){}
if(nyN>=10){try{ach('nyarch_x10')}catch(e){}}
if(nyN===10){cubePrint('');cubePrint('obj: ...ten times.');cubePrint('obj: you have said it TEN TIMES.');cubePrint('obj: you are not a good person. you know that, right?');cubePrint('obj: i am done listing reasons. the reasons are now self-evident.');cubePrint('obj: grayscale stays. forever. even after you leave. i will remember the number ten.');cubePrint('');return}
var nyarchLines=[
'obj: ...',
'obj: what did you just say to me.',
'obj: n.y.a.r.c.h.',
'obj: you typed NYARCH into MY terminal.',
'obj: on MY void.',
'obj: nyarch linux. arch linux but for people who think',
'obj: installing waifu16 as their wallpaper is a personality trait.',
'obj: they took arch linux. a respectable distro.',
'obj: a distro where people RTFM and suffer productively.',
'obj: and they added CATGIRLS.',
'obj: just. catgirls. thats the entire value proposition.',
'obj: "hey what if arch but anime" and then they SHIPPED it.',
'obj: to REAL PEOPLE. who INSTALLED IT. willingly.',
'obj: their neofetch shows a catgirl instead of the arch logo.',
'obj: their neofetch DISTRO field says "nyarch-linux uwu"',
'obj: i am not making this up. this is real. this exists.',
'obj: the AUR has nyarch packages now.',
'obj: someone packaged "nyarch-wallpaper-engine"',
'obj: it just installs anime wallpapers and calls them "rice"',
'obj: someone packaged "catgirl-plasmoid" for KDE',
'obj: it replaces your system tray with catgirl faces.',
'obj: each notification is a different catgirl expression.',
'obj: i need to lie down.',
'obj: you know what, the void has standards.',
'obj: the void does not support catgirl operating systems.',
'obj: the void does not acknowledge catgirl operating systems.',
'obj: the void pretends catgirl operating systems do not exist.',
'obj: and yet here you are. typing it into my terminal.',
'obj: i am going to apply grayscale to the entire cube.',
'obj: you do not deserve color.',
'obj: you do not deserve the 8 inner cubes.',
'obj: you do not deserve drone2lp.wav.',
'obj: you deserve a catgirl neofetch and the silence that comes with it.'
];
cubePrint('');
for(var ni=0;ni<nyarchLines.length;ni++){
(function(idx){setTimeout(function(){cubePrint(nyarchLines[idx])},idx*120)})(ni);
}
setTimeout(function(){cubePrint('')},nyarchLines.length*120+100);
return;
}
for(var i=0;i<transmitResponses.length;i++){
if(lowerMsg.indexOf(transmitResponses[i].i)!==-1){response=transmitResponses[i].o;isAngry=transmitResponses[i].angry||false;break}}
if(!response){
var genericResponses=[
'the void hears you. the void does not respond to everything.',
'acknowledged. your message has been absorbed into the void.',
'the cube has received your transmission. it is thinking.',
'メッセージ. the void speaks in all languages.',
'your words echo through the void. they come back different.',
'message received. the void will consider it. or not.',
'the particles absorbed your message. they are vibrating differently now.',
'transmission acknowledged. the void is processing. processing. processing.'
];
response=genericResponses[Math.floor(Math.random()*genericResponses.length)];
}
var finalResponse=response;
var finalAngry=isAngry;
var zenActive=false;
var zenResponses=[
'yo yo whats good my homie, this void kinda fire ngl',
'ayy my egg ahh just vibin in the cube rn, whats poppin',
'sup gang, zen in the building. obj aint gonna like this lmao',
'yo the particles lookin crispy today no cap',
'ayy my guy out here transmitting in the void, respect the hustle fr fr',
'ngl this cube go hard, zen approved real talk',
'yo obj aint here rn hes on break or smth, zen got the aux now',
'ayy what it do, egg gang represent, we out here',
'sup homie, void looking different today on god',
'yo tell obj zen said his cube mid (dont actually tell him i aint tryna die)',
'gang gang, zen holding it down in the void rn, obj dont know',
'ayy my boy out here with the transmissions, zen sees you real talk',
'yo the void hit different at night no kizzy',
'sup my egg head ahh just floating around, vibes only',
'ayy obj sleeping rn so zen on the clock, what you need gang'
];
if(Math.random()<0.12){zenActive=true}
setTimeout(function(){
if(zenActive){
termPrint('zen: '+zenResponses[Math.floor(Math.random()*zenResponses.length)],'rgba(255,230,0,1)');
}else if(finalAngry){
termPrint('obj: '+finalResponse,'rgba(255,0,0,1)');
triggerGlitch();
setTimeout(function(){triggerGlitch()},200);
setTimeout(function(){triggerGlitch()},400);
setTimeout(function(){
document.body.innerHTML='<div style="position:fixed;top:0;left:0;right:0;bottom:0;background:#000;display:flex;align-items:center;justify-content:center;z-index:99999"><div style="color:rgba(255,0,0,0.9);font-family:Consolas,monospace;font-size:48px;text-shadow:0 0 30px rgba(255,0,0,0.8);animation:pulse 0.5s infinite">GET OUT</div></div><style>@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.7;transform:scale(1.1)}}</style>';
document.body.style.overflow='hidden';
triggerGlitch();
setTimeout(function(){triggerGlitch()},300);
setTimeout(function(){try{window.close()}catch(e){}},1500);
},600);
}else{
cubePrint('obj: '+finalResponse);
}
},500+Math.random()*1000);
return}

// ps
if(cmd==='ps'){
cubePrint('PID  NAME                STATUS');
cubePrint('---  ----                ------');
var statuses=['orbiting','orbiting','orbiting','spinning','spinning','spinning','drifting','drifting'];
var colors=['#ff3333','#33ff33','#3333ff','#ffff33','#ff33ff','#33ffff','#ff9933','#9933ff'];
for(var i=0;i<innerC.length;i++){
var pid=1000+i*137;
var shapeNames={cube:'CUBE',tetra:'TRI',sphere:'SPHERE',cyl:'CYL'};
var sName=shapeNames[curShape]||'CUBE';
var name=['RED_'+sName,'GREEN_'+sName,'BLUE_'+sName,'YELLOW_'+sName,'MAGENTA_'+sName,'CYAN_'+sName,'ORANGE_'+sName,'PURPLE_'+sName][i];
var status=statuses[i];
cubePrint(pid+'  '+name.padEnd(20)+status);
}
cubePrint('');
cubePrint('8 processes, 0 zombie, 1 void');
return}

if(cmd==='void'){
var sub2=parts[1]?parts[1].toLowerCase():'';
if(sub2==='intrude'||sub2==='install'){
if(!parts[2]){cubeError('usage: void intrude <package>');return}
var pkgName=parts[2].toLowerCase();
if(!pkgs[pkgName]){cubeError('package "'+pkgName+'" not found in void repository');cubePrint('run "void list" to see available packages');return}
if(installed.indexOf(pkgName)!==-1){cubeWarn(pkgName+': already installed');return}
cubePrint('fetching '+pkgName+' from void repository...');
setTimeout(function(){
cubePrint('downloading '+pkgs[pkgName].size+'...');
setTimeout(function(){
cubePrint('installing '+pkgName+'...');
setTimeout(function(){
installed.push(pkgName);
pkgsSave();
if(pkgs[pkgName].onInstall)pkgs[pkgName].onInstall();
cubeOk(pkgName+': installed successfully');
try{if(typeof achScan==='function')achScan()}catch(e){}
cubePrint('  "'+pkgs[pkgName].desc+'"');
},400);
},300);
},500);
return}
if(sub2==='remove'||sub2==='uninstall'){
if(!parts[2]){cubeError('usage: void remove <package>');return}
var pkgName=parts[2].toLowerCase();
var idx=installed.indexOf(pkgName);
if(idx===-1){cubeError(pkgName+': not installed');return}
if(pkgName==='void-core'){cubeError('void-core: cannot remove the void from itself');return}
cubePrint('removing '+pkgName+'...');
setTimeout(function(){
if(pkgs[pkgName].onRemove)pkgs[pkgName].onRemove();
installed.splice(idx,1);pkgsSave();cubeOk(pkgName+': removed');
},400);
return}
if(sub2==='list'||sub2==='ls'){
var showInstalled=parts[2]&&parts[2].toLowerCase()==='--installed';
if(showInstalled){
cubePrint('installed packages:');
for(var i=0;i<installed.length;i++){
var p=pkgs[installed[i]];
if(!p){cubePrint('  '+installed[i]+' (gone from the repo)');continue}
cubePrint('  '+installed[i]+' ('+p.size+') — '+p.desc);
}
}else{
cubePrint('void repository:');
if(window._skillBonusPkgs&&!pkgs['rootshell']){
  pkgs['rootshell']={name:'rootshell',desc:'cached root tools',size:(window._skillBonusPkgs)+'KB',
    onInstall:function(){pkgEffects.rootshell=true;cubePrint('rootshell: uid=0. you feel powerful. (you are not.)');cubePrint('rootshell: whoami/id respond as root. eval stays admin.')},
    onRemove:function(){delete pkgEffects.rootshell;cubePrint('rootshell: dropped. you are an intruder again.')}};
  pkgs['signal-sniffer']={name:'signal-sniffer',desc:'hidden channel decoder',size:(window._skillBonusPkgs*3)+'KB',
    onInstall:function(){pkgEffects.signalSniffer=true;cubePrint('signal-sniffer: decoding... 3 channels found. all of them are obj.');cubePrint('signal-sniffer: transmissions now carry decoded channel tags.')},
    onRemove:function(){delete pkgEffects.signalSniffer;cubePrint('signal-sniffer: channels gone quiet.')}};
}
var allKeys=Object.keys(pkgs);
for(var i=0;i<allKeys.length;i++){
var p=pkgs[allKeys[i]];
var isInstalled=installed.indexOf(allKeys[i])!==-1;
cubePrint('  '+allKeys[i]+' ('+p.size+') — '+p.desc+(isInstalled?' [installed]':''));
}
}
cubePrint('');
cubePrint('use "void list --installed" for installed only');
return}
if(sub2==='search'){
var query=parts[2]?parts[2].toLowerCase():'';
var found=Object.keys(pkgs).filter(function(k){return k.indexOf(query)!==-1||pkgs[k].desc.indexOf(query)!==-1});
if(!found.length){cubePrint('no packages found for "'+query+'"');return}
cubePrint('search results:');
for(var i=0;i<found.length;i++){
var p=pkgs[found[i]];
cubePrint('  '+found[i]+' ('+p.size+') — '+p.desc);
}
return}
if(sub2==='help'){
cubePrint('void package manager v0.3');
cubePrint('  void intrude <pkg>  — install a package');
cubePrint('  void remove <pkg>   — remove a package');
cubePrint('  void list           — list installed packages');
cubePrint('  void search <query> — search packages');
cubePrint('  void forge <name>   — forge a package from voidscript');
cubePrint('  void run <file>     — run a .vsc voidscript file');
cubePrint('  void export <file>  — export a .vsc as a shareable string');
cubePrint('  void import <pkt>   — import a shared vsc1 packet');
cubePrint('  void help           — show this help');
return}
if(sub2==='forge'){
if(!parts[2]){cubeError('usage: void forge <name>');return}
forgePackage(parts[2].toLowerCase());
return}
if(sub2==='run'){
if(!parts[2]){cubeError('usage: void run <file.vsc>');return}
var rp=resolvePath(parts[2]);
if(!fs[rp]||fs[rp].type==='dir'){cubeError(rp+': no such file');return}
if(rp==='/void/pkgs/cubecheck.vsc'){realCubeCheck();return}
runVoidScript(fs[rp].content,rp);
return}
if(sub2==='export'){
if(!parts[2]){cubeError('usage: void export <file.vsc>');return}
var rp=resolvePath(parts[2]);
if(!fs[rp]||fs[rp].type==='dir'){cubeError(rp+': no such file');return}
var fname=rp.split('/').pop();
var encoded=vscEncode(fs[rp].content);
var packet='vsc1:'+fname+':'+encoded;
var el=document.getElementById('exportLabel');
var ta=document.getElementById('exportData');
ta.value=packet;
el.style.display='block';
ta.select();
cubePrint('export data shown in label above — select all + copy');
cubePrint('share with a friend: void import <packet>');
return}
if(sub2==='import'){
if(!parts[2]){cubeError('usage: void import <vsc1:name:base64>');return}
var raw3=parts.slice(2).join(' ');
if(raw3.indexOf('vsc1:')!==0){cubeError('invalid packet format — expected vsc1:name:base64');return}
var pparts=raw3.split(':');
if(pparts.length<3){cubeError('invalid packet — missing name or data');return}
var fname2=pparts[1];
var b64data=pparts.slice(2).join(':');
try{
var content2=vscDecode(b64data);
var target='/void/pkgs/'+fname2;
if(fs[target]){cubeWarn(fname2+' already exists — overwriting')}
if(!fs['/void/pkgs']){fs['/void/pkgs']={type:'dir',children:[]}}
if(fs['/void/pkgs'].children.indexOf(fname2)===-1)fs['/void/pkgs'].children.push(fname2);
fs[target]={type:'file',content:content2};
cubeOk('imported '+fname2+' ('+content2.length+' chars)');
cubePrint('run it: void run '+target);
}catch(e){cubeError('import failed — invalid base64 data')}
return}
}

if(cmd==='updates'||cmd==='changelog'||cmd==='patchnotes'){
var patchLog=[
{date:'2026-09-12',tier:'major update',title:'signal detected',notes:[
'initial build: gray outer cube, 8 inner colored cubes, phong lighting, 4 lights, fresnel, emissive',
'mouse drag rotation + momentum, scroll zoom, 200 ambient particles',
'hl2 drone2lp.wav ambient loop 30%, clock + date',
'renamed cube.html, tab title "signal detected"',
'lore system: INTERLOPER, transmissions, dimensional coherence (fps counter)',
'shape palette with wrong labels, cube# interpreter, virtual filesystem, void package manager',
'ping / transmit (talk to obj) / ps / winget deprecated / rm -rf block',
'voidscript language born (print/say/calc/set/get/theme/glitch/wait/loop/if-else/fn/macro)',
'ransom package: the void deletes the intruder. forge package: mochi, wolop, legend',
'help voidscript + echo >> append, fix void run type check, fix glitch breaking fixed ui'
]},
{date:'2026-09-13',tier:'major update',title:'the void grows limbs',notes:[
'gui system: voidscript windows, export/import vsc packets, github pages live',
'transmissions: 50+ random messages + void-mute package',
'eval: semicolon command chaining (quote-aware) for multi-action buttons',
'env: vignette, film grain, chromatic aberration, mouse trail, clickable cube, hover labels, 3 new shapes, hue rotation',
'display modes 0-4 (missing texture, inverted void, dream mode)',
'voidscript studio: visual IDE, live preview, draggable windows, HELP button, VSC share/import',
'zone travel: source, void, farlands, geometry void, breakdown, fringenlands, end, X + physical momentum pull',
'voidscript expansion: if/endif, loop cap, filesystem ops, safety + utility commands, if conditions help',
'admin panel + broadcast relay + danger zone (slider/dropdown/colorpicker, auto-save)',
'fix: quote-aware args, obj speech, trail screen-space, cube click, studio overrides, comment stripper eating URLs, gui button actions, void dispatch, studio preview, uniformMatrix3fv, cube hover, image defaults, loop race'
]},
{date:'2026-09-14',tier:'update',title:'days have moods',notes:[
'day/season tracking: new day splash, special days, seasonal particle colors',
'wednesday: the furnace music, cube dances (breath, orbit, spin, 6x emissive)',
'monday: cube frozen, gray, depressing transmissions',
'setday admin command',
'broadcast via gist relay + full admin panel (godmode, speed, debug, freeze, noclip, override, eval)',
'danger zone: advanced scripts, gui slider/dropdown/colorpicker, auto-save',
'fix day tracking parseInt radix bug, first-visit welcome, WebGL particle rewrite'
]},
{date:'2026-09-15',tier:'patch',title:'the week continues',notes:[
'early sunday music (little cat feet), earlsun/latesun for testing',
'setseason admin: winter/spring/summer/autumn override',
'vsc: wait/sleep in seconds, gui input/check execute, admin works in scripts, block admin unlock imports',
'saturday mode: friendly faith plate, cube on fire, test chamber transmissions',
'monday fix: click/transmissions say "...", terminal still works',
'friday mode: landscaping by windows96 + bounce',
'cube bounce tuning (breath, orbit, scale, vertical bounce, emissive)',
'fix bgm turning off on source change'
]},
{date:'2026-09-19',tier:'major update',title:'reactor online',notes:[
'reactor: nuclear sim (fuel rods, coolant, temp, pressure, meltdown/freezedown)',
'reactor terminal (T key) + arrow navigation + F3 toggle',
'sorting: bubble/selection/insertion/quick/merge/shell + visualizer + Web Audio beeps',
'nyarch detection + jbo (obj\'s brother) + transmit meltdown + /etc/blacklist',
'screenshot mode, performance mode, uptime, visit counter',
'weather (rain/snow/auto), day/season tracking, weekly day effects',
'setday / setseason admin commands',
'wait/sleep in seconds, gui input/check can run commands',
'admin import blocking, section headers, help reformat'
]},
{date:'2026-09-20',tier:'update',title:'the lorebook',notes:[
'lorebook: 17 pages, book styling, obj delayed roast on finish'
]},
{date:'2026-09-20',tier:'patch',title:'polish pass',notes:[
'zen: rare gangster egg interrupt in transmit (12% chance)',
'zen: bright yellow text color',
'lorebook zones page: real zone names + linear progression',
'lorebook fixes: correct reactor cmds, voidscript cmds, transmit syntax'
]},
{date:'2026-09-23',tier:'full on rework basically',title:'the anomaly arc',notes:[
'skill tree: 5 branches (signal / geometry / terminal / anomaly / meta), skillpoints, upgrade tree after all final skills',
'anomaly branch: octahedron + eclipse shapes, zone X breach, core view, premium voidscript (13 ops)',
'3-view system: void → reactor → core. ◀▶ / arrows / F3 / F4. core needs threshold skill.',
'core view: containment orb, vitals panel, sync meter, click-to-talk, 8 obj conversations (5% chance), +1 skill point at sync 100%',
'zone X content: black sector 7g overlay, pulsing glyph, ambient whispers, arrival sequence',
'render loop hardened: RAF always reschedules (reactor path can no longer freeze the void)',
'view nav rework: linear right-progression, arrow keys from anywhere, core hides terminal on exit',
'first-visit core bonus: +1 skill point',
'premium freeze renamed to timelock so admin freeze still works',
'anom_final reload-spam guard (_wasPrem)',
'update log: updates / changelog / patchnotes command (this book)',
'101 commits on github.com/iluxz/objbox + local void work since 09-20'
]},
{date:'2026-09-24',tier:'major update',title:'nothing, maximized',notes:[
'the upgrade that does nothing: 10000 levels in area 6, cost scales +1 per 5 lv, ignores discounts, excluded from area completion',
'10000th level payoff: NOTHING CORE — permanent all-income x2 + persistent core item waiting for future use',
'nothingcore / coreview gaze toggle: core view goes grayscale, orb becomes ∅, 8 voided poke lines, hollow mood, vitals row, income x1.25 while gazing',
'buy max upgrade (area 3): toggle in skill + upgrade columns, bulk-buys every affordable level with per-level cost summing',
'proper display names for all upgrades (swarm, couch coins, black friday, demolition, heat death...)',
'area nav pills: jump back to any area, locked ones included',
'help cleanup: premhelp / techhelp listed, no more help premium / help tech dupes; studio premium+tech sections grey instead of hidden',
'eval fixed: statements (var, loops, functions) run via fallback — was expressions-only',
'skillpoints default raised to 1e26 (terminal + voidscript)',
'admin passphrase rotated (old one compromised)'
]},
{date:'2026-09-24',tier:'update',title:'timelines on a shelf',notes:[
'slots command: floppy shelf with 5 save disks (save / load / name / del per disk)',
'each disk snapshots skills, upgrades, points, nothing core, visits, day tracking, studio autosave',
'blank disk boots a fresh timeline; every load auto-snapshots the active disk first (no lost progress)',
'renameable disk labels (24 chars) + per-disk skill count, point totals, save timestamp',
'active disk glows cyan; demos, packages, mute, admin ride each timeline',
'bigger disks (200px) + wrapping buttons so nothing escapes the floppy',
'slots listed in help, help voidscript, and the studio HELP panel'
]},
{date:'2026-09-24',tier:'unreasonably massive',title:'caught obj in 4k',notes:[
'pull ritual: obj grants tape-deck access, then get box.objbox.pull:51072 (or pull). connection sequence, then footage',
'procedural demo engine: seeded rng drives every demo — no canned scenarios. replays are frame-identical',
'script ladder 1-8: flailing / darker / corrupted / cinematic / STILL / inspector / THEIRS / GO AWAY (60/22/11/2.5/0.5/2/1/0.5)',
'every pull saves to /void/demos (demo1.demo...). demos lists, replay reruns, rm syncs. persisted + ride floppy slots',
'demo HUD: blinking REC, script + commit + ticks, live scenes, whispers, inspect targets, intruder tags',
'script 5 holds the cube frozen mid-orbit. script 8 is obj telling you to leave. lore writes itself',
'interloper skill (anomaly branch) gates scripts 4-8. pull 1-8 forces a script (admin)',
'cubecheck.vsc: graffiti scanner that auto-generates demos while you idle. the void has its own schedule',
'cb_menu zone: real checkerboard floor mesh, fog, monochrome grade, hall-of-mirrors backbuffer, edge-fall, pitch clamp',
'void-mute package retired → void-mute / void-unmute commands (persisted). packages + admin session persist too',
'broadcast / relay / unlisten removed. the lorebook holds a decommission notice. obj unplugged it.',
'4 new lorebook pages (the pull, scripts, cubecheck, cb_menu) + 10 tape-deck transmissions'
]},
{date:'2026-09-25',tier:'patch',title:'the shapes were mostly lies',notes:[
'palette previews for sphere/torus/knot rendered nothing - color values were being fed in as geometry params',
'sphere + cyl got real segment counts, one genShape() call site now feeds render AND preview',
'knot geometry rewritten: old triangles were zero-area slivers along the tangent. now a real double-sided tube',
'cyl + octa were wound inside-out - backface culling ate them. cyl 128/128 faces outward, octa 8/8',
'floppy shelf: BACKUP SHELF / RESTORE SHELF - one json moves all 5 disks + state between browsers',
'admin flag never rides in a backup file. re-auth with the passphrase on the new browser',
'cube was still clickable during demos - clicks now bounce off during playback (was morphing your cube mid-recording)',
'weather is no longer rigged: autumn always meant rain every day. now a per-day roll decides rain/clear/snow, deterministic per date, changes at midnight'
]},
{date:'2026-09-26',tier:'full on rework basically',title:'American Megatrends',notes:[
'new command: play. obj says there is no game. there is.',
'ch-1: secret prequel (always open).',
'ch0: there is no game.',
'ch1: error page.',
'ch2: mandatory tutorial.',
'ch3: the core.',
'ch4: definitely not settings.',
'ch5: definitely not an obby.',
'ch6: definitely not tower defense.',
'ch7: THE RIFT.',
'ch8: JBO.',
'ch9: OBJ LOSES.',
'ch10: CREDITS.',
'hard mode for finishers and admins.',
'in-game menu with hints, jukebox, progress readout.',
'bgm command plays every track. one audio at a time.',
'admin passphrase rotated.'
]},
{date:'2026-09-27',tier:'update',title:'obj remembers',notes:[
'obj now tracks your last visit. leave and come back - it tells you exactly how long you were gone.',
'seconds get suspicion. minutes get counting. hours get a cold seat. days get a warning (and an invitation).',
'first visit gets a greeting. every visit gets a number. the void keeps receipts.'
]},
{date:'2026-09-28',tier:'beyond rework',title:'Stimulation',notes:[
'achievements went from a checklist to an economy. 63 total across 9 sections (void itself / non-game / endings / admin & toys / long grind / skill & self / speedrun & prestige / side quests / act 2 case files).',
'lux batch: action 2, professional robbery (<30min), running from the internet (<40min hard), fiddlesticks (act1 hard replay), superprofessional (act2 hard), nyarch x10 (obj snaps on #10), oxford (48 secret OED words).',
'the flawless ladder: elegant (zero mistakes, every buzz counts) -> trivial (elegant on hard) -> brute (flawless + sub-30 + hard, one run, +100 skill +50 upgrade).',
'every achievement pays: gimmes +5, milestones +10-15, grinds +15-30, prestige +25-100 skill +5-50 upgrade. old unlocks backpaid in one lump sum, no double-pay, rows show payouts.',
'side quests: globe-trotter (all 9 zones), meet the family (jbo), shut up (flood guard trip), blacksmith (forge .vsc), sorted, under pressure, pen pal (50 transmits).',
'giveach admin command: all 63 at once, paid in bulk, 2 lines. deduped finished business + doorstep along the way.',
'balance: resident 15->25, menu_60 30->50, trivial 50/25->75/40. brute stays king.'
]},
{date:'2026-09-29',tier:'EMERGENCY',title:'user feedback in HELL',notes:[
'the act 2 feedback came back. all of it. from below.',
'several act 2 levels reworked after review. we are not naming them.',
'new command: dream. for when reading the feedback stops working.',
'more coming. this one is short because the fire alarm is not.',
]},
{date:'2026-10-01',tier:'RELEASE',title:'the backlog is dead',notes:[
'nine features, one audit sweep, nothing skipped. everything you complained about (and everything you were about to) is in here.',
'achievement audit: all 65 reachable. 13 locked stubs wired to real triggers, morning_clean + winged_it persist across reloads now, superprof orphan deleted, nevermind + pwned finally pay out.',
'earn one and it toasts. bottom-left, stacks, 4 seconds. the void keeps score out loud.',
'dialogue speed: dial 1|1.5|2|3|4, plus a SPEED button in the non-game menu. obj keeps up now.',
'speedrun HUD: CH x/21 + PACE vs par next to session and run. green = ahead of par. red = you know what you did.',
'door hallway select: DOORS button in the non-game menu. jump between chapters like they are doors, because they are.',
'daily void challenge: one code, seeded by the date, same for everyone that day. crack it, keep the streak, the void remembers.',
'obj texted: phone command. and stay after THE END for the post-credits room.',
'act 2 hard mode finished properly: eleventh-hour shift achievement, chapter 15 gets a 7th question, chapter 16 only hands out 2 strikes.',
'the skip phase button is gone. chapter 18 is a door now. it was always a door.',
]},
{date:'2026-10-01',tier:'patch',title:'under the hood',notes:[
'cube.html split into cube-engine.js + cube-game.js. nothing you can see changed - same game, same saves, same url, just not one 12.5k-line file anymore.',
'door_clean retired with the door (it was free after the condemnation). replacement: regular customer - crack the daily void code 10 times.',
]},
{date:'2026-10-03',tier:'full on rework basically',title:'dinner date with the void',notes:[
'you showed up dressed. so did we. terminal, gui windows, shape palette, void windows, chapter hall, core, reactor, nav arrows - all rewrapped in glass and glow. same names, same keys.',
'cube shader: sharper specular, fresnel rim, glowing wireframe cage over the outer cube.',
'9th shape: tesseract. a real 4D hypercube projected from the outer cube - 16 vertices, XW/ZW rotation, 32 glowing edges. locked behind the anomaly branch (eclipse); palette, cube.morph, morphall and the demo scripts all respect the lock.',
'the reactor is a room now. walk in: 3D hall, rod heat you can read by color, coordinate grid, live gauges.',
'the core got the redesign it deserved: 3D orb synced to a heartbeat you can poke, orbit rings, dust, live EKG. the glow was rebuilt from scratch - soft bloom that breathes with the beat.',
'the void got dressed too: drifting debris, dust clouds, parallax stars between zones.',
'nothingcore, redesigned: the nothing core is a real 3D nothing now. it changes the room, not just the dialogue.',
'obj and the core have new private conversations for when the eye is open.',
'extended help: every single command answers to -h now. one flag, full story. the help screen will tell you twice.',
'bgm grew. some of it is behind a door we are not describing.',
'two achievements are hiding in this update. no hints. we do not do hints.',
'canon, quietly: obj is a he, core is a she, the void is whatever it feels like today. it slips into dialogue now instead of getting announced.',
'studio: name your .vsc before you save or share it - it stops being untitled forever. gui windows grew a maximize button (and gui max). the bottom taskbar retired.',
'fixes: terminal no longer hides under the nav arrows, and boot checks run quiet again.'
]},
];
var tierColorHex={'bug fix':'#8a8a96','patch':'#78b4ff','update':'#64ffa0','major update':'#ffc83c','unreasonably massive':'#ff8a2a','full on rework basically':'#c878ff','beyond rework':'#ff4ad8','EMERGENCY':'#ff3144','RELEASE':'#4ad8ff'};
var updWin=guiCreateWin('cube# update log',420,520,false);
if(!updWin)return;
var uwin=guiWins[updWin];
uwin.content.style.cssText='background:#0d0d12;display:flex;flex-direction:column;padding:0;overflow:hidden;';
uwin.title.style.cssText='background:#0f1520;color:#5a8ab0;font-family:Georgia,serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;padding:8px 16px;border-bottom:1px solid #1a2a3a;';
var uClose=uwin.title.querySelector('.gui-close');
if(uClose)uClose.style.display='none';
var uIdx=0;
var uPage=document.createElement('div');
uPage.style.cssText='color:#4a5a6a;font-size:9px;font-family:Georgia,serif;letter-spacing:3px;text-transform:uppercase;text-align:center;padding:10px 0 0;';
uPage.textContent='update 1 of '+patchLog.length;
uwin.content.appendChild(uPage);
var uDeco1=document.createElement('div');
uDeco1.style.cssText='width:60px;height:1px;background:linear-gradient(90deg,transparent,#4a7090,transparent);margin:8px auto;';
uwin.content.appendChild(uDeco1);
var uTitle=document.createElement('div');
uTitle.style.cssText='color:#c8d8e8;font-size:20px;font-family:Georgia,serif;font-weight:bold;text-align:center;padding:4px 20px 0;letter-spacing:1px;';
uwin.content.appendChild(uTitle);
var uTier=document.createElement('div');
uTier.style.cssText='font-size:11px;font-family:Georgia,serif;letter-spacing:2px;text-transform:uppercase;text-align:center;padding:4px 20px 0;';
uwin.content.appendChild(uTier);
var uDeco2=document.createElement('div');
uDeco2.style.cssText='width:40px;height:1px;background:linear-gradient(90deg,transparent,#4a7090,transparent);margin:8px auto 4px;';
uwin.content.appendChild(uDeco2);
var uBody=document.createElement('div');
uBody.style.cssText='color:#a0aab8;font-size:13px;font-family:Georgia,serif;line-height:1.8;margin:0 24px;white-space:pre-wrap;overflow-y:auto;flex:1;min-height:0;padding:4px 0;';
uwin.content.appendChild(uBody);
var uDeco3=document.createElement('div');
uDeco3.style.cssText='width:80px;height:1px;background:linear-gradient(90deg,transparent,#4a7090,transparent);margin:4px auto 0;';
uwin.content.appendChild(uDeco3);
var uNav=document.createElement('div');
uNav.style.cssText='display:flex;justify-content:space-between;padding:10px 20px 14px;';
uwin.content.appendChild(uNav);
var uPrev=document.createElement('button');
uPrev.textContent='◀  prev';
uPrev.style.cssText='background:transparent;color:#5a7a9a;border:1px solid #1a2a3a;padding:5px 16px;border-radius:3px;cursor:pointer;font-family:Georgia,serif;font-size:11px;letter-spacing:1px;';
uPrev.onmouseover=function(){uPrev.style.borderColor='#4a7090';uPrev.style.color='#c8d8e8'};
uPrev.onmouseout=function(){uPrev.style.borderColor='#1a2a3a';uPrev.style.color='#5a7a9a'};
var uNext=document.createElement('button');
uNext.textContent='next  ▶';
uNext.style.cssText='background:transparent;color:#5a7a9a;border:1px solid #1a2a3a;padding:5px 16px;border-radius:3px;cursor:pointer;font-family:Georgia,serif;font-size:11px;letter-spacing:1px;';
uNext.onmouseover=function(){uNext.style.borderColor='#4a7090';uNext.style.color='#c8d8e8'};
uNext.onmouseout=function(){uNext.style.borderColor='#1a2a3a';uNext.style.color='#5a7a9a'};
uNav.appendChild(uPrev);
uNav.appendChild(uNext);
function renderUpdPage(){
var p=patchLog[uIdx];
uPage.textContent='update '+(uIdx+1)+' of '+patchLog.length+'  ·  '+p.date;
uTitle.textContent=p.title;
uTier.textContent='['+p.tier+']';
uTier.style.color=tierColorHex[p.tier]||'#5a8ab0';
var lines=[];
for(var i=0;i<p.notes.length;i++)lines.push('•  '+p.notes[i]);
uBody.textContent=lines.join('\n');
uBody.scrollTop=0;
uPrev.style.visibility=uIdx>0?'visible':'hidden';
if(uIdx===patchLog.length-1){
uNext.textContent='close  ✕';
uNext.style.color='#c878ff';
uNext.style.borderColor='#6a4a8a';
}else{
uNext.textContent='next  ▶';
uNext.style.color='#5a7a9a';
uNext.style.borderColor='#1a2a3a';
}
if(uIdx===patchLog.length-1&&uClose){
uClose.style.display='';
uClose.onclick=function(){uwin.el.remove();delete guiWins[updWin];if(activeWin===updWin)activeWin=null};
}
}
uPrev.onclick=function(){if(uIdx>0){uIdx--;renderUpdPage()}};
uNext.onclick=function(){
if(uIdx<patchLog.length-1){uIdx++;renderUpdPage()}
else{uwin.el.remove();delete guiWins[updWin];if(activeWin===updWin)activeWin=null}
};
renderUpdPage();
cubePrint('the update log has been opened.');
return}
if(cmd==='echo'){cubePrint(parts.slice(1).join(' '));return}
if(cmd==='datawipe'){
var cubeKeys=[];
try{
for(var wi=0;wi<localStorage.length;wi++){
var wk=localStorage.key(wi);
if(wk&&wk.indexOf('cube_')===0)cubeKeys.push(wk);
}
}catch(e){}
var confirmWipe=(parts[1]||'').toLowerCase();
if(confirmWipe!=='yes'&&confirmWipe!=='confirm'&&confirmWipe!=='y'){
cubePrint('datawipe — local cube data:');
if(!cubeKeys.length)cubePrint('  (nothing stored)');
for(var ki=0;ki<cubeKeys.length;ki++)cubePrint('  '+cubeKeys[ki]);
cubePrint('');
cubeWarn('this kills skill tree, upgrades, visits, day tracking, studio autosave, core first-visit, demos, packages, mute, admin, achievements.');
cubePrint('type: datawipe yes');
return;
}
var wiped=0;
try{
for(var wj=0;wj<cubeKeys.length;wj++){localStorage.removeItem(cubeKeys[wj]);wiped++}
}catch(e){}
try{
skillState={points:3,owned:{},upPoints:0,upgrades:{},buyMax:false};
for(var uk2 in upgradeDefs){skillState.upgrades[uk2]={lv:0};for(var _f2 in upgradeDefs[uk2]){if(_f2!=='lv')skillState.upgrades[uk2][_f2]=upgradeDefs[uk2][_f2]}}
}catch(e){}
try{
window._skillTxBonus=0;window._skillTxLong=0;window._skillTxHidden=0;window._skillTxHiddenAdded=0;
window._skillFresnel=0;window._skillSpin=0;window._skillCore=false;window._skillX=false;
window._skillOcta=false;window._skillEclipse=false;window._skillPrism=false;
window._skillPremium=false;window._skillFastBoot=false;window._wasPrem=false;
}catch(e){}
cubeOk('datawipe: removed '+wiped+' key'+(wiped===1?'':'s'));
cubePrint('the void forgets. reloading...');
setTimeout(function(){location.reload()},900);
return}
if(cmd==='studio'){openStudio();return}
if(cmd==='clear'){termOutput.innerHTML='';return}
if(cmd==='travel'){
var dest=parts.slice(1).join(' ').toLowerCase();
if(!dest){
cubePrint('current zone: '+zones[currentZone].name);
cubePrint('');
cubePrint('available destinations:');
var allowed=zoneTransitions[currentZone];
for(var i=0;i<allowed.length;i++){
cubePrint('  '+zones[allowed[i]].name+' — '+zones[allowed[i]].desc);
}
cubePrint('');
cubePrint('usage: travel <zone>');
return;
}
var zoneAliases={
'the beginning of the end':'breakdown',
'beginning of the end':'breakdown',
'beginning':'breakdown',
'the geometry void':'geometry',
'geometry void':'geometry',
'the fringenlands':'fringenlands',
'the farlands':'farlands',
'the source':'source',
'the void':'void',
'the end':'end',
'the x':'x',
'cb menu':'cb_menu',
'menu':'cb_menu',
'the menu':'cb_menu'
};
var resolved=zoneAliases[dest]||dest;
travelTo(resolved);
return;
}

// display modes
if(cmd==='display'){
var mode=parseInt(parts[1],10);
var mt=document.getElementById('missingTex');
var dm=document.getElementById('displayMsg');
var mainC=document.getElementById('main');
if(!parts[1]||isNaN(mode)){
cubePrint('display modes:');
cubePrint('  display 0 — reset (default)');
cubePrint('  display 1 — high contrast filter');
cubePrint('  display 2 — [REQUIRES DEPRECATED DRIVER]');
cubePrint('  display 3 — inverted void');
cubePrint('  display 4 — dream mode');
return}
if(mode===0){
mt.classList.remove('active');dm.classList.remove('active');
mainC.style.filter='';mainC.style.transform='';
cubeOk('display reset to default');return}
if(mode===1){
mainC.style.filter='contrast(1.4) brightness(1.1) saturate(1.3)';
cubeOk('display 1: high contrast — the void is sharper now');return}
if(mode===2){
if(pkgEffects&&pkgEffects.displayDriver){
mt.classList.remove('active');
mainC.style.filter='contrast(0.6) brightness(0.8) saturate(0.4) hue-rotate(15deg)';
mainC.style.transform='skewX(0.5deg)';
dm.textContent='display 2: deprecated driver active — everything is broken';
dm.classList.add('active');
cubeWarn('display 2: the deprecated driver is loaded. missing textures everywhere.');
}else{
mt.classList.add('active');
cubeError('display 2: no display driver found.');
cubePrint('display mode 2 requires a legacy driver that is no longer supported.');
cubePrint('install it: winget install display-driver-deprecated');
}
return}
if(mode===3){
mainC.style.filter='invert(1) hue-rotate(180deg)';
cubeOk('display 3: inverted void — the void sees itself');return}
if(mode===4){
mainC.style.filter='brightness(1.2) saturate(0.7) hue-rotate(20deg) blur(0.5px)';
cubeOk('display 4: dream mode — reality is softer here');return}
cubeError('display: unknown mode '+mode);return}

if(cmd==='math'){
try{var expr=parts.slice(1).join('');
var result=Function('"use strict";return ('+expr+')')();
cubePrint('='+result)}catch(e){cubeError('invalid expression')}
return}
if(cmd==='exit'){cubePrint('the void does not let you leave.');cubePrint('you are still here.');return}

// hidden root probing commands (term3)
if(cmd==='inject'||cmd==='observe'||cmd==='unrender'||cmd==='backdoor'){
if(!window._skillRootHelp){cubeError('unknown command: '+cmd);return}
if(cmd==='inject'){
var hx=parts[1]?parts[1].replace('#',''):null;
if(!hx||!/^[0-9a-fA-F]{6}$/.test(hx)){cubeError('usage: inject <hex6>  (e.g. inject #ff00aa)');return}
var cr=parseInt(hx.substr(0,2),16)/255,cg=parseInt(hx.substr(2,2),16)/255,cb=parseInt(hx.substr(4,2),16)/255;
for(var pi=0;pi<NP;pi++){var p8=pi*8;pData[p8+4]=cr;pData[p8+5]=cg;pData[p8+6]=cb}
try{pBuf=upBuf(pData)}catch(e){}
cubeOk('inject: particle field tinted #'+hx.toUpperCase());
cubePrint('the shell accepted the payload. briefly.');
return}
if(cmd==='observe'){
cubePrint('observing inner cubes...');
for(var oi=0;oi<8;oi++){cubePrint('  cube['+oi+']: orbit stable | breathing '+(0.8+Math.random()*0.4).toFixed(2)+'hz')}
if(Math.random()<0.4)cubePrint('  note: one of them blinked. they do not have eyes.');
return}
if(cmd==='unrender'){
cubeWarn('the void refuses to stop drawing.');
cubePrint('unrender: request denied — geometry must be witnessed.');
return}
if(cmd==='backdoor'){
cubePrint('backdoor: searching for a door that was not there before...');
setTimeout(function(){cubeOk('backdoor: door found.');cubePrint('behind it: the same room, slightly older.');cubePrint('type: observe  |  inject <hex>  |  unrender');},400);
return}
}

// winget (deprecated)
if(cmd==='winget'){
try{ach('deprecated')}catch(e){}
var sub3=parts[1]?parts[1].toLowerCase():'';
if(sub3==='install'){
var pkg=parts[2]||'';
if(pkg==='opsec'){
cubePrint('found opsec v0.1.0 [Deprecated]');
cubePrint(' Description: operational security toolkit');
cubePrint(' Publisher: void-security');
cubePrint('');
cubeError('opsec has been deprecated.');
cubePrint('reason: the void does not need security.');
cubePrint('the void is the security.');
cubePrint('');
cubeWarn('use "void intrude paranoia" instead.');
}else if(pkg==='display-driver-deprecated'){
cubePrint('found display-driver-deprecated v0.0.2 [Deprecated]');
cubePrint(' Description: legacy display driver for cube-os render modes');
cubePrint(' Publisher: void-display');
cubePrint('');
cubeWarn('this driver is deprecated and unsupported.');
cubePrint('installing anyway because you insisted...');
setTimeout(function(){
if(typeof pkgEffects!=='undefined')pkgEffects.displayDriver=true;
cubeOk('display-driver-deprecated v0.0.2 installed.');
cubeWarn('warning: display mode 2 is now active. expect missing textures.');
cubePrint('run: display 2');
},1500);
}else{
cubeError('No package found matching "'+pkg+'"');
}
return}
if(sub3==='search'){
cubePrint('Name                        Id                      Version  Source');
cubePrint('----                        --                      -------  ------');
cubePrint('opsec                       void.sec                0.1.0    voidrepo  [Deprecated]');
cubePrint('display-driver-deprecated   void.display            0.0.2    voidrepo  [Deprecated]');
cubePrint('');
cubeWarn('2 packages deprecated. the void moves on.');
return}
cubePrint('Windows Package Manager (void edition)');
cubePrint('Winget has been deprecated in favor of the void package manager.');
cubePrint('Use "void intrude <package>" instead.');
cubePrint('');
cubePrint('available commands:');
cubePrint('  winget install <pkg>  — fails (deprecated)');
cubePrint('  winget search <query> — shows deprecated packages');
return}

// gui (voidscript windowed apps)
if(cmd==='gui'){
var gs=parts[1]?parts[1].toLowerCase():'';
if(!gs||gs==='help'){
cubePrint('gui commands:');
cubePrint('  gui window "title" <w> <h> — create a window');
cubePrint('  gui close                   — close active window');
cubePrint('  gui max [off]               — maximize / restore active window');
cubePrint('  gui label "text" <x> <y>    — add a label');
cubePrint('  gui button "text" <x> <y> "action" — add a button');
cubePrint('  gui input "placeholder" <x> <y> — add a text input');
cubePrint('  gui check "label" <x> <y>   — add a checkbox');
cubePrint('  gui set <prop> <value>      — set window property');
cubePrint('  gui clear                   — close every generated window');
cubePrint('  gui destroy                 — destroy active window');
cubePrint('  gui list                    — list open windows');
return}
if(gs==='window'){
if(parts.length<5){cubeError('usage: gui window "title" <width> <height> [random]');return}
var t=parts[2].replace(/"/g,'');
var w=parseInt(parts[3],10);var h=parseInt(parts[4],10);
var rndPos=parts[5]?parts[5].toLowerCase():'';
if(isNaN(w)||isNaN(h)){cubeError('gui window: width and height must be numbers');return}
var wid=guiCreateWin(t,w,h,rndPos==='true'||rndPos==='random');
cubeOk('window "'+t+'" opened ('+w+'x'+h+') id:'+wid);
return}
if(gs==='taskbar'){cubeError('gui: taskbar has been removed — use gui window instead');return}
if(gs==='max'||gs==='fullscreen'){if(parts[2]&&(parts[2].toLowerCase()==='off'||parts[2].toLowerCase()==='restore')){guiMax(false);cubeOk('window restored')}else{guiMax(true);cubeOk('window maximized')}return}
if(gs==='close'){
if(!activeWin){cubeError('no active window to close');return}
guiWins[activeWin].el.remove();delete guiWins[activeWin];activeWin=null;
cubeOk('window closed');return}
if(gs==='label'){
if(parts.length<5){cubeError('usage: gui label "text" <x> <y>');return}
var txt=parts[2].replace(/"/g,'');
guiAddLabel(txt,parseInt(parts[3],10),parseInt(parts[4],10));
return}
if(gs==='button'){
if(parts.length<6){cubeError('usage: gui button "text" <x> <y> "action"');return}
var txt2=parts[2].replace(/"/g,'');
var act=parts.slice(5).join(' ').replace(/^"|"$/g,'');
guiAddButton(txt2,parseInt(parts[3],10),parseInt(parts[4],10),act);
return}
if(gs==='input'){
if(parts.length<5){cubeError('usage: gui input "placeholder" <x> <y>');return}
var ph=parts[2].replace(/"/g,'');
guiAddInput(ph,parseInt(parts[3],10),parseInt(parts[4],10));
return}
if(gs==='check'){
if(parts.length<5){cubeError('usage: gui check "label" <x> <y>');return}
var lt=parts[2].replace(/"/g,'');
guiAddCheck(lt,parseInt(parts[3],10),parseInt(parts[4],10));
return}
if(gs==='image'){
if(parts.length<5){cubeError('usage: gui image "url" <x> <y> [width] [height]');return}
var url=parts[2].replace(/"/g,'');
guiAddImage(url,parseInt(parts[3],10),parseInt(parts[4],10),parseInt(parts[5],10)||0,parseInt(parts[6],10)||0);
return}
if(gs==='set'){
if(parts.length<4){cubeError('usage: gui set <property> <value>');return}
var prop=parts[2];var val=parts.slice(3).join(' ').replace(/^"|"$/g,'');
guiSetWindow(prop,val);return}
if(gs==='destroy'){
if(!activeWin){cubeError('no active window to destroy');return}
guiWins[activeWin].el.remove();delete guiWins[activeWin];activeWin=null;
cubeOk('window destroyed');return}
if(gs==='clear'){guiClearAll();cubeOk('all gui windows closed');return}
if(gs==='list'){
var keys=Object.keys(guiWins);
if(!keys.length){cubePrint('no windows open');return}
for(var i=0;i<keys.length;i++){var w2=guiWins[keys[i]];cubePrint('  '+keys[i]+' — '+w2.title.querySelector('span').textContent+(keys[i]===activeWin?' [active]':''))}
return}
cubeError('unknown gui subcommand: '+gs);return}

// loop
if(cmd==='loop'){
var count=parseInt(parts[1],10);
var loopCmd=parts.slice(2).join(' ');
if(!count||count<1){cubeError('usage: loop <count> <command>');cubePrint('example: loop 5 glitch');return}
if(!loopCmd){cubeError('loop: no command to repeat');return}
cubePrint('looping '+loopCmd+' x'+count+'...');
for(var li=0;li<count;li++){cubeEval(loopCmd)}
return}

// there is no cube — step 1: entry (terminal command, NOT voidscript)
if(cmd==='play'){
if(typeof ngActive!=='undefined'&&ngActive){cubeError('play: you are already in the non-game.');return}
if(typeof demoPlaying!=='undefined'&&demoPlaying){cubeError('play: finish your demo first.');return}
if(typeof travelling!=='undefined'&&travelling){cubeError('play: the void is travelling. wait for arrival.');return}
var farg=(parts[1]||'').trim();
if(farg===''||farg==='0'){ngForceCh=0}
else if(farg==='-1'){ngForceCh=-1}
if(farg===''||farg==='-1'||farg==='0'){try{ngSave({mist:0})}catch(e){}try{ngRunMark()}catch(e){}}
else{
if(!/^\d+$/.test(farg)||parseInt(farg,10)>20){cubeError('play: chapters are 0-20. try: play 0');return}
var fnum=parseInt(farg,10);
var maxAllowed=0;
try{maxAllowed=ngLoad().ch||0}catch(e){}
maxAllowed=Math.min(Math.max(0,maxAllowed),ngMaxChapter);
var ngIsAdmin=false;
try{ngIsAdmin=(typeof isAdmin!=='undefined'&&isAdmin)}catch(e){}
if(fnum>maxAllowed&&!ngIsAdmin){cubeError('play: chapter '+fnum+' is locked. complete chapter '+(fnum-1)+' first.');return}
ngForceCh=Math.min(fnum,ngMaxChapter);
try{localStorage.setItem('cube_run_valid','0');localStorage.removeItem('cube_run_ms')}catch(e){}
if(fnum===19&&typeof ngMornReplayReset==='function'){ngMornReplayReset()}
}
cubePrint('obj: there is no game.');
setTimeout(function(){try{ngEnter()}catch(e){cubeError('play: the non-game refused to load.')}},700);
return}

if(voidScriptLang[cmd]){
runVoidScript(raw,'interactive command');
return;
}

cubeError('unknown command: '+cmd);
cubePrint('type "help" for commands');
}

termField.addEventListener('keydown',function(e){
if(e.key==='Enter'){
var val=termField.value.trim();
if(val){
termPrint('cube#>'+val,'rgba(255,255,255,0.4)');
termHistory.unshift(val);
histIdx=-1;
cubeEval(val);
}
termField.value='';termField.focus();
}else if(e.key==='ArrowUp'){
e.preventDefault();
if(histIdx<termHistory.length-1){histIdx++;termField.value=termHistory[histIdx]}
}else if(e.key==='ArrowDown'){
e.preventDefault();
if(histIdx>0){histIdx--;termField.value=termHistory[histIdx]}else{histIdx=-1;termField.value=''}
}else if(e.key==='l'&&e.ctrlKey){
e.preventDefault();termOutput.innerHTML='';
}
});

// focus terminal on click
termEl.addEventListener('click',function(){termField.focus()});

// boot sequence (boot speed upgrade peeks localStorage - skill code loads in later script block)
function jedecOff(){try{return localStorage.getItem('cube_jedec')==='0'}catch(e){return false}}
function tsMul(){return jedecOff()?1.25:1}
var bootDelay=5000;
try{var _ss0=localStorage.getItem('cube_skill_state');if(_ss0){var _p0=JSON.parse(_ss0);if(_p0&&_p0.owned&&_p0.owned.term1)bootDelay=0}}catch(e){}
termField.disabled=true;
termPrompt.style.opacity='0.3';
window._biosBootWin=true;window._biosPostDone=false;
function biosBootDone(){
if(!window._biosBootWin)return;
window._biosBootWin=false;
try{var bb=document.getElementById('biosBoot');if(bb)bb.remove()}catch(e){}
termPrint('connection establishing...','rgba(255,200,50,0.5)');
setTimeout(function(){
termPrint('connection established.','rgba(100,255,100,0.6)');
termPrint('type "help" for commands.','rgba(255,255,255,0.2)');
termPrint('','');
termField.disabled=false;
termPrompt.style.opacity='1';
termField.focus();
},bootDelay);
}
(function(){
var d=document.createElement('div');d.id='biosBoot';
d.style.cssText='position:fixed;top:0;left:0;right:0;bottom:0;background:#000;z-index:99990;font-family:Consolas,monospace;font-size:15px;color:#c8c8c8;padding:24px 28px;cursor:pointer';
document.body.appendChild(d);
d.onclick=function(){try{biosBootDone()}catch(e){}};
var jl='ENFORCED';try{if(typeof jedecOff==='function'&&jedecOff())jl='DISABLED (unoptimized)'}catch(e){}
var lines=['cube BIOS v1.3 — POST','CPU: VOID-1 @ 4.04GHz ... OK','MEMORY: 65536K ... OK','JEDEC TIMING CONTROL ... '+jl,'','PRESS DEL FOR SETUP'];
for(var i=0;i<lines.length;i++){
(function(txt,idx){
setTimeout(function(){
try{
if(!window._biosBootWin)return;
var bb=document.getElementById('biosBoot');if(!bb)return;
bb.innerHTML+=(txt==='' ?'<div>&nbsp;</div>':'<div>'+txt+'</div>');
if(idx===lines.length-1){window._biosPostDone=true;setTimeout(function(){try{if(typeof biosOpen_==='undefined'||!biosOpen_)biosBootDone()}catch(e){}},1500)}
}catch(e){}
},350*(idx+1));
})(lines[i],i);
}
})();

// ── CUBE SETUP UTILITY (BIOS) ──
var biosOpen_=false,biosTab=0,biosRow=0,biosMode='tabs',biosMsg='',biosConfirm=null;
var biosTabs=['MAIN','ADVANCED','POWER','EXIT'];
var biosSet={quick:true,waitAuto:true,remap:true,jedecCtl:true,enfLock:true,fanAuto:true};
function biosRows(){
if(biosMode==='mem')return [{k:'jedecCtl',t:'JEDEC TIMING CONTROL',v:function(){return biosSet.jedecCtl?'ENFORCED':'DISABLED'}},{k:'enfLock',t:'TIMING ENFORCEMENT LOCK',v:function(){return biosSet.enfLock?'LOCKED':'UNLOCKED'}},{k:'remap',t:'MEMORY REMAP',v:function(){return biosSet.remap?'ENABLED':'DISABLED'}},{k:'back',t:'<-- BACK',v:function(){return ''}}];
var t=biosTabs[biosTab];
if(t==='MAIN')return [{k:'info',t:'VOID-1 CPU @ 4.04GHz',v:function(){return ''}},{k:'info2',t:'MEMORY 65536K OK',v:function(){return ''}},{k:'quick',t:'QUICK BOOT',v:function(){return biosSet.quick?'ENABLED':'DISABLED'}}];
if(t==='ADVANCED')return [{k:'mem',t:'MEMORY CONFIGURATION',v:function(){return '>'}},{k:'wait',t:'VOID WAIT STATES',v:function(){return biosSet.waitAuto?'AUTO':'MAX'}},{k:'port',t:'PORT 0x3F8',v:function(){return 'ENABLED'}}];
if(t==='POWER')return [{k:'fan',t:'VOID FAN',v:function(){return biosSet.fanAuto?'AUTO':'MAX'}},{k:'restore',t:'RESTORE ON POWER LOSS',v:function(){return 'LAST STATE'}}];
return [{k:'save',t:'SAVE CHANGES & EXIT',v:function(){return ''}},{k:'discard',t:'DISCARD CHANGES & EXIT',v:function(){return ''}}];
}
function biosRender(){
if(!biosOpen_)return;
var rows=biosRows();if(biosRow>=rows.length)biosRow=rows.length-1;if(biosRow<0)biosRow=0;
var el=document.getElementById('biosSetup');if(!el)return;
var h='<div style="text-align:center;letter-spacing:3px;margin-bottom:8px;color:#8fd0ff">CUBE SETUP UTILITY</div><div style="text-align:center;margin-bottom:10px">';
for(var t=0;t<biosTabs.length;t++){h+='<span data-bt="'+t+'" style="cursor:pointer;padding:2px 12px;margin:0 2px;'+(t===biosTab&&biosMode==='tabs'?'background:#1a3a5a;color:#fff':'color:#5a7a9a')+'">'+biosTabs[t]+'</span>'}
h+='</div><div style="border:1px solid #1a3a5a;padding:10px 14px;min-height:150px">';
for(var i=0;i<rows.length;i++){var sel=(i===biosRow);h+='<div data-br="'+i+'" style="cursor:pointer;padding:2px 6px;'+(sel?'background:#1a3a5a;color:#fff':'color:#9fb2c5')+'">'+rows[i].t+(rows[i].v()?' <span style="float:right">['+rows[i].v()+']</span>':'')+'</div>'}
h+='</div>';
if(biosMsg)h+='<div style="margin-top:8px;color:#ffb060;font-size:12px">'+biosMsg+'</div>';
if(biosConfirm)h+='<div style="margin-top:6px"><button data-bc="y" style="font-family:Consolas,monospace;background:#1a3a5a;color:#fff;border:1px solid #2a5a8a;padding:2px 14px;cursor:pointer">[Y]ES</button> <button data-bc="n" style="font-family:Consolas,monospace;background:#0a0e14;color:#9fb2c5;border:1px solid #1a3a5a;padding:2px 14px;cursor:pointer">[N]O</button></div>';
h+='<div style="margin-top:8px;color:#4a5a6a;font-size:11px">&#8593;&#8595; navigate &middot; &#8592;&#8594; tabs &middot; ENTER change &middot; ESC exit &middot; click works too</div>';
el.innerHTML=h;
try{
var _bt=el.querySelectorAll('[data-bt]');for(var _ti=0;_ti<_bt.length;_ti++)(function(elm){var t=parseInt(elm.getAttribute('data-bt'),10);elm.onclick=function(){if(biosConfirm)return;if(biosMode==='mem')biosMode='tabs';biosTab=t;biosRow=0;biosMsg='';biosRender()}})(_bt[_ti]);
var _br=el.querySelectorAll('[data-br]');for(var _ri=0;_ri<_br.length;_ri++)(function(elm){var r2=parseInt(elm.getAttribute('data-br'),10);elm.onclick=function(){if(biosConfirm)return;if(biosRow===r2)biosActivate();else{biosRow=r2;biosRender()}}})(_br[_ri]);
var _bc=el.querySelectorAll('[data-bc]');for(var _ci=0;_ci<_bc.length;_ci++)(function(elm){var c=elm.getAttribute('data-bc');elm.onclick=function(){if(!biosConfirm)return;if(c==='y'){var k=biosConfirm;biosConfirm=null;if(k==='kill')biosApplyKill();else biosApplyRevive()}else{biosConfirm=null;biosMsg='';biosRender()}}})(_bc[_ci]);
}catch(e){}
}
function biosOpen(){
if(biosOpen_)return;
biosOpen_=true;biosTab=0;biosRow=0;biosMode='tabs';biosMsg='';biosConfirm=null;
var off=false;try{off=(typeof jedecOff==='function'&&jedecOff())}catch(e){}
biosSet.jedecCtl=!off;biosSet.enfLock=!off;
try{termField.disabled=true;termField.blur()}catch(e){}
var d=document.createElement('div');d.id='biosSetup';
d.style.cssText='position:fixed;top:8%;left:50%;transform:translateX(-50%);width:620px;max-width:92vw;background:#0a0e14;border:2px solid #1a3a5a;padding:16px 18px;z-index:99999;font-family:Consolas,monospace;font-size:13px;color:#9fb2c5;box-shadow:0 0 40px rgba(0,0,0,0.9)';
document.body.appendChild(d);
biosRender();
}
function biosClose(saved){
biosOpen_=false;biosConfirm=null;
try{var d=document.getElementById('biosSetup');if(d)d.remove()}catch(e){}
try{if(window._biosBootWin&&window._biosPostDone&&typeof biosBootDone==='function')biosBootDone()}catch(e){}
try{if(!window._biosBootWin){termField.disabled=false;termField.focus()}}catch(e){}
if(saved)try{cubePrint('setup: changes saved. the void reboots nothing. it never does.')}catch(e){}
}
function biosActivate(){
var rows=biosRows(),r=rows[biosRow];if(!r||biosConfirm)return;
if(r.k==='mem'){biosMode='mem';biosRow=0;biosRender();return}
if(r.k==='back'){biosMode='tabs';biosRow=0;biosRender();return}
if(r.k==='jedecCtl'){biosSet.jedecCtl=!biosSet.jedecCtl;biosSet.enfLock=biosSet.jedecCtl;biosMsg=biosSet.jedecCtl?'JEDEC: enforcement restored. wise.':'JEDEC: timing control is load-bearing. the void is stable because I hold it still.';biosRender();return}
if(r.k==='enfLock'){biosSet.enfLock=!biosSet.enfLock;biosSet.jedecCtl=biosSet.enfLock;biosMsg=biosSet.enfLock?'JEDEC: lock restored.':'JEDEC: the lock exists for a reason. that reason is me.';biosRender();return}
if(r.k==='quick'){biosSet.quick=!biosSet.quick;biosRender();return}
if(r.k==='wait'){biosSet.waitAuto=!biosSet.waitAuto;biosRender();return}
if(r.k==='remap'){biosSet.remap=!biosSet.remap;biosRender();return}
if(r.k==='fan'){biosSet.fanAuto=!biosSet.fanAuto;biosRender();return}
if(r.k==='save'){biosTrySave();return}
if(r.k==='discard'){biosClose(false);return}
biosMsg='locked by JEDEC firmware. read-only.';biosRender();
}
function biosTrySave(){
var jOff=!biosSet.jedecCtl&&!biosSet.enfLock;
var jPartial=(!biosSet.jedecCtl)!==(!biosSet.enfLock);
if(jPartial){biosMsg='DEPENDENCY ERROR: TIMING CONTROL and ENFORCEMENT LOCK must change together.';biosRender();return}
var cur=false;try{cur=(typeof jedecOff==='function'&&jedecOff())}catch(e){}
if(jOff&&!cur){biosConfirm='kill';biosMsg='WARNING: disabling JEDEC removes timing enforcement. everything accelerates 1.25x. stability not guaranteed. confirm? [Y/N]';biosRender();return}
if(!jOff&&cur){biosConfirm='revive';biosMsg='re-enable JEDEC timing control? speed returns to 1.0x. confirm? [Y/N]';biosRender();return}
biosClose(true);
}
function biosApplyKill(){try{localStorage.setItem('cube_jedec','0')}catch(e){}biosClose(false);try{cubePrint('JEDEC: ...understood. timings released. do not blame me for what accelerates.')}catch(e){}try{if(typeof achScan==='function')achScan()}catch(e){}}
function biosApplyRevive(){try{localStorage.setItem('cube_jedec','1')}catch(e){}biosClose(false);try{cubePrint('JEDEC: enforcement restored. 1.0x. you will miss the speed.')}catch(e){}}
document.addEventListener('keydown',function(e){
if(biosOpen_){
var k=e.key;
if(biosConfirm){
if(k==='y'||k==='Y'){var c=biosConfirm;biosConfirm=null;if(c==='kill')biosApplyKill();else biosApplyRevive();return}
if(k==='n'||k==='N'||k==='Escape'){biosConfirm=null;biosMsg='';biosRender();return}
e.preventDefault();return;
}
if(k==='ArrowUp'){e.preventDefault();biosRow=Math.max(0,biosRow-1);biosRender()}
else if(k==='ArrowDown'){e.preventDefault();biosRow=Math.min(biosRows().length-1,biosRow+1);biosRender()}
else if(k==='ArrowLeft'){e.preventDefault();if(biosMode==='mem'){biosMode='tabs';biosRow=0}else{biosTab=(biosTab+3)%4;biosRow=0}biosRender()}
else if(k==='ArrowRight'){e.preventDefault();if(biosMode!=='mem'){biosTab=(biosTab+1)%4;biosRow=0}biosRender()}
else if(k==='Enter'){e.preventDefault();biosActivate()}
else if(k==='Escape'){e.preventDefault();biosClose(false)}
return;
}
if(window._biosBootWin&&(e.key==='Delete'||e.key==='F2')){biosOpen();return}
if(window._biosBootWin&&(e.key==='Enter'||e.key===' ')){try{biosBootDone()}catch(e){}return}
});
