// cube-objpot.js — OBJPOT. a cauldron in a little tower. obj watches from the shelf.
// mix THREE ingredients, one of each type. discover spell orbs. obj reacts to everything.
// (a sandbox. cube-original.)
(function(){
'use strict';
if(typeof window.opLoaded!=='undefined')return;
window.opLoaded=true;

// ══ state ══
var opActive=false;
var opFound={};           // spellId -> 1
var opMeta={};            // mixes, discoveries, riddle state
var opPot=[];             // ingredient ids currently in the cauldron
var opTab='shelf';        // 'shelf' | 'book'
var opFlash=0;            // glow timer
var opBubbles=[];
var opLoopOn=false;
var opRiddle=null;
var opSeenGreet=false;

// narrator (typewriter queue)
var opNarrQ=[],opNarrBusy=false,opNarrIv=null,opNarrGen=0;
function opDial(){if(opMeta.dial>=1&&opMeta.dial<=4)return opMeta.dial;try{if(typeof dialSp==='function'){var v=dialSp();if(v>0&&v<=4)return v}}catch(e){}return 1}
function opNarr(text,done){
 if(text instanceof Array)text=text[Math.floor(Math.random()*text.length)];
 opNarrQ.push({t:text,d:done||null});
 if(!opNarrBusy)opNarrNext();
}
function opNarrNext(){
 var job=opNarrQ.shift();
 if(!job){opNarrBusy=false;return}
 opNarrBusy=true;
 var myGen=opNarrGen;
 var el=null;try{el=document.getElementById('opNarrText')}catch(e){}
 if(!el){opNarrBusy=false;if(job.d)try{job.d()}catch(e){}return}
 var full=String(job.t),i=0;
 el.textContent='';
 try{
  var spd=opDial();
  var tick=Math.max(8,Math.round(30/spd));
  var iv=setInterval(function(){
   opNarrIv=iv;
   if(!opActive){clearInterval(iv);opNarrIv=null;opNarrBusy=false;opNarrQ=[];return}
   i++;el.textContent=full.slice(0,i);
   if(i>=full.length){clearInterval(iv);opNarrIv=null;setTimeout(function(){
     if(!opActive||myGen!==opNarrGen)return;
     opNarrBusy=false;if(job.d)try{job.d()}catch(e){};if(!opNarrBusy)opNarrNext();
   },Math.round((opNarrQ.length?180:600)/spd))}
  },tick);
 }catch(e){el.textContent=full;opNarrBusy=false;if(job.d)try{job.d()}catch(e){};opNarrNext()}
}
function opClearQ(){opNarrGen++;opNarrQ=[];try{if(opNarrIv)clearInterval(opNarrIv);opNarrIv=null}catch(e){}opNarrBusy=false}

// ══ data ══
var OP_TYPES={
 void:{name:'void',color:'#8fd6ff',blurb:'cold. pulled from the dark between screens.'},
 grotto:{name:'grotto',color:'#8fe08a',blurb:'damp. it grew somewhere you are not supposed to go.'},
 machine:{name:'object',color:'#ffb457',blurb:'salvaged from obj. he says he misplaced it. he did not.'}
};
var OP_ING=[
 {id:'voidshard',name:'voidshard',type:'void',c:'#8fd6ff'},
 {id:'bagoftstatic',name:'bag of static',type:'void',c:'#b9a8ff'},
 {id:'nullorb',name:'null orb',type:'void',c:'#6f8fbf'},
 {id:'echo',name:'bottled echo',type:'void',c:'#9adfe0'},
 {id:'glowcap',name:'glowcap',type:'grotto',c:'#8fe08a'},
 {id:'tooth',name:'a tooth',type:'grotto',c:'#e8e2d0'},
 {id:'dripmoss',name:'dripmoss',type:'grotto',c:'#5fae6a'},
 {id:'rootfiber',name:'root fiber',type:'grotto',c:'#b7945a'},
 {id:'bolt',name:'loose bolt',type:'machine',c:'#c9c9d2'},
 {id:'cursor',name:'a cursor',type:'machine',c:'#ffb457'},
 {id:'keycap',name:'keycap',type:'machine',c:'#d86a6a'},
 {id:'hum',name:'bottled hum',type:'machine',c:'#ffd27f'},
 {id:'wisp',name:'a wisp',type:'void',c:'#dcf3ff'},
 {id:'mossbell',name:'mossbell',type:'grotto',c:'#3fd4a8'},
 {id:'cog',name:'a cog',type:'machine',c:'#8a93a8'},
 {id:'howl',name:'bottled howl',type:'void',c:'#d0b8ff'},
 {id:'fern',name:'a fern',type:'grotto',c:'#3f7a4a'},
 {id:'spring',name:'a spring',type:'machine',c:'#c9922f'},
 {id:'shiver',name:'a shiver',type:'void',c:'#c8fff0'},
 {id:'sprout',name:'a sprout',type:'grotto',c:'#d8e86a'},
 {id:'widget',name:'a widget',type:'machine',c:'#7a6ae8'}
];
var OP_SPELLS=[
 {id:'gather', name:'gather',  r:['voidshard','glowcap','bolt'],   desc:'it pulls. everything leans in a little.'},
 {id:'shrink', name:'shrink',  r:['nullorb','tooth','keycap'],     desc:'makes a thing small. embarrassingly small.'},
 {id:'bloom',  name:'bloom',   r:['echo','dripmoss','hum'],        desc:'makes a thing big. structurally unsound big.'},
 {id:'croak',  name:'croak',   r:['bagoftstatic','rootfiber','cursor'], desc:'turns a thing into a frog. it is always a frog.'},
 {id:'flutter',name:'flutter', r:['voidshard','tooth','cursor'],   desc:'turns a thing into a moth. it leaves dust.'},
 {id:'puppet', name:'puppet',  r:['nullorb','dripmoss','bolt'],    desc:'a thing repeats what you did to it. forever.'},
 {id:'sparkler',name:'sparkler',r:['echo','glowcap','keycap'],     desc:'touch a thing. it flies. then it is a small sun.'},
 {id:'glyph',  name:'glyph',   r:['bagoftstatic','dripmoss','hum'], desc:'draw in the air. the air keeps it.'},
 {id:'ember',  name:'ember',   r:['voidshard','rootfiber','bolt'], desc:'throw a small fire. it is very proud of itself.'},
 {id:'drift',  name:'drift',   r:['nullorb','rootfiber','keycap'], desc:'a thing stops falling. it just hangs there.'},
 {id:'chime',  name:'chime',   r:['echo','tooth','hum'],           desc:'everything you touch plays one note. everything.'},
 {id:'frost',  name:'frost',   r:['wisp','tooth','bolt'],          desc:'touch a thing. it stops. thermally.'},
 {id:'lantern',name:'lantern', r:['bagoftstatic','mossbell','keycap'], desc:'a small light moves in. it pays no rent.'},
 {id:'magnet', name:'magnet',  r:['nullorb','glowcap','cog'],      desc:'the pot becomes briefly, rudely magnetic.'},
 {id:'storm',  name:'storm',   r:['voidshard','dripmoss','cog'],   desc:'weather. indoors. nobody approved this.'},
 {id:'sonar',  name:'sonar',   r:['howl','glowcap','cursor'],      desc:'shout into the dark. the dark shouts back with directions.'},
 {id:'vine',   name:'vine',    r:['echo','fern','bolt'],           desc:'the floor grows opinions. green ones.'},
 {id:'clock',  name:'clock',   r:['nullorb','dripmoss','spring'],  desc:'time hiccups. the orbs forget they were tired.'},
 {id:'mirror', name:'mirror',  r:['wisp','fern','hum'],            desc:'the tower shows you yourself. rude of it.'},
 {id:'anchor', name:'anchor',  r:['bagoftstatic','rootfiber','spring'], desc:'gravity gets personal.'},
 {id:'comet',  name:'comet',   r:['shiver','glowcap','keycap'],    desc:'something streaks past. indoors. space is leaking.'},
 {id:'bramble',name:'bramble', r:['howl','sprout','bolt'],         desc:'thorns. the bouncy kind. allegedly.'},
 {id:'tide',   name:'tide',    r:['echo','dripmoss','widget'],      desc:'the tide goes out. everything goes left.'},
 {id:'gear',   name:'gear',    r:['nullorb','sprout','cog'],       desc:'gears turn. obj gets factory-reset.'}
];
var OP_OBJ={
  greet:[
   'welcome back to the tower. the tower is a metaphor. so am i.',
   'mixing again? i have no hands and i still help more than you. sit.',
   'the pot is warm. it has been waiting. so have i. i am very patient and very dead.',
   'back again. the tower missed you. i did not. (i did.)',
   'oh good. the help is here. the pot is already nervous.'
  ],
 dupes:[
  'two of the same kind? that is not a recipe, that is a mistake. use one of each type.',
  'why two of one type. there are three types. three.',
  'i have no eyes and even i can see you did that wrong.',
  'the pot rejected that on principle. one of each. it is not complicated.'
 ],
 noning:[
  'the pot is not intended for child\'s playthings.',
  'ingredients go in the pot. anything else does not.',
  'had i not put a rejection spell on this pot you would have exploded. i did. you are welcome.',
  'you cannot put that in. i tried once. i have no body now.'
 ],
 repeat:[
  'you already mixed those. do something new. i believe in you. marginally.',
  'that one again? bold. boring. but bold.',
  'yes, that is a spell you own. the pot does not give receipts.'
 ],
 empty:[
  'there is nothing in the pot. even i can see that, and i have no eyes.',
  'you cannot brew nothing. that is not a spell, that is a nap.',
  'empty. the pot and i are both disappointed. mostly the pot.'
 ],
 needthree:[
  'that is not three things. it needs three. one of each type.',
  'keep going. three ingredients. you are not there yet.',
  'the pot is patient. i am less so. add more.'
 ],
  junk:[
   'hm. nothing. the pot shrugged. it does that.',
   'that is a real mix. it is also nothing. try another arrangement.',
   'i felt something. it was gas. try again.',
   'the liquid turned a color i do not have a word for. then it turned back. nothing.',
   'nothing again. the pot is building a collection of nothings. it is vast.',
   'that mix went nowhere. i watched the whole trip. long way for nothing.'
  ],
 poke:['ow. i am a cube. i feel nothing. do it again.','do not poke the help.','that is my surface. it is load-bearing.'],
 tickle:['that does nothing and i hate that it does nothing.','i am not ticklish. i am geometry.','stop. or do not. i cannot feel it either way.'],
 dunk:['you dunked me in the cauldron. i will remember that.','wet. cold. rude. effective.','my inner cubes are full of potion now. thank you.'],
  toss:['thrown out the window. again. i will be back. i always come back.','there is no window. there is no tower. we are in a cube. i land on the cube.',
       'wheeee. no. that was a lie. i felt nothing.'],
   grab:['hands off. i am the void.','why are you grabbing me. put me down. or do not.','this is undignified. i have a cauldron to watch.',
         'unhand the cube.','you are holding a containment shell. be normal about it.','i am being manhandled. by an intruder.',
         'again with the grabbing. my inner cubes are getting motion sick.','held. contained. babysat.'],
   fling:['where are you throwing me. where exactly.','i have no wings. i have no complaints either.','wheeee. no. that was a lie. i felt nothing.',
          'the void does not get dizzy. the void gets annoyed.','i am a projectile now. this was not in my job description.',
          'airborne. unafraid. (mildly afraid.)','great throw. ten points. the wall disagrees.'],
   impact:['ow.','that geometry did nothing to you.','i am hitting things now. excellent.','the walls did not consent to that.',
           'careful. i am load-bearing. allegedly.','stop bouncing me. i am a browser tab.',
           'noted. the wall and i are talking it out.','that one rearranged my inner cubes. they like it.'],
  breakslam:['the ingredients wall. you broke it. no one has ever done that. the shelf is exposed now. go nuts.',
             'the wall is down. the whole area is mine now. i hope you are proud of yourself. i am. slightly.',
             'you slammed me clean through the wall. the ingredients are everywhere. the void approves.',
              'wall: broken. space: doubled. dignity: gone. proceed.'],
   dream:['you good? you were gone a whole second. where did you go.',
          'dreaming? fair. the tower does that to people. it did that to me once. i am still here. allegedly.',
          'you spaced out. saw something, huh. the xylophone does that. do not lick it.',
          'welcome back. you were somewhere else just now. i could tell. you stopped blinking. (you do not blink.)',
          'another one remembered. the room keeps them. i just live here.'],
   dreamcut:['cut short. the dream will keep. it is patient. it has nothing else to do.',
             'woke up early. fine. the memory is not going anywhere. it lives here now.'],
  cast:['again? fine. i will stand here and be affected.',
        'that one tickled. i have no nerves. do not think about that.',
        'a spell, used correctly-ish. the tower approves. i am the tower.',
        'careful. i am load-bearing. allegedly. magically now too.',
        'oh good, magic. my favorite thing to be near. (it is not.)'],
  cooldown:['the orb is still warm. let it cool. even magic needs a minute.',
            'not yet. the orb is recharging. it is doing its little orb nap.'],
  yardbreak:['the left wall. you broke the LEFT one too. there is a whole courtyard out there. fresh air. allegedly.',
             'outside. there is an outside. a well, a trashcan, gnomes. do not feed the gnomes.',
             'you knocked through to the courtyard. the well guy heard that. he hears everything. he has nothing else to do.',
             'wall two: down. the tower is becoming a gazebo. proceed.'],
  wellguy:['down here! ...you gonna get me out or just sightsee.',
           'drop snacks next time. not cubes. you take up the whole shaft.',
           'i have been down here since before the tower had a second floor.',
           'the crank is missing. everything is missing down here. it is a lifestyle.',
           'thanks for the splash. it is the most weather i get.'],
  wellA:['oi! down here! you brought a CUBE into my well? into MY well?',
         'splash department! ...oh. oh no. it is you again. the cube one.',
         'who drops a whole cube down a well. who does that. (you. you do that.)'],
  wellB:['i am the cube. this is a wellness visit. how is the dark.',
         'do not mind me. just passing through. vertically.',
         'nice shaft. very shaft. five stars. would fall again.'],
  wellC:['right. out! OUT. take your cooled orbs and GO.',
         'up you go! ...and i cooled your little orbs. do not ask how. well magic.',
         'visit over! launching cube! somebody had to say it.'],
  trash:['filed.',
         'the trashcan accepts your offering. it accepts everything. it is very open-minded.',
         'that was load-bearing trash. was.',
         'waste allocation complete. the gnomes are taking notes.'],
  gnome:['eep.',
         'the gnomes scatter. they know what you did.',
         'do not mind them. they are union.'],
  launch:['LIFTOFF. this is fine. this is NOT fine.',
          'he is going to space. he is going to the ceiling. same thing.',
          'spectacular failure in three. two. one. ...there it is.',
          'the rocket pad accepts your donation of one (1) cube.'],
  pad:['pad is cooling. even rockets need a minute.',
       'not yet. the pad is still smoking.'],
  crank:['yours now. one (1) crank. do not put it in the pot. (you can put it in the pot. do not.)',
         'the crank! L-shaped. load-bearing. probably.',
         'pocketed. the gnomes saw. there are no secrets here.'],
  gnomefriend:['...they like you. the gnomes LIKE you. golden hats. do not let it go to your head.',
               'five slow approaches. zero scatterings. friendship unlocked.',
               'the union has accepted you as associate gnome. meetings are Tuesdays.'],
  hoop:['NOTHING BUT AIR. ...it is a hoop. he went through a hoop. why are we yelling.',
        'ace! the hoop barely moved. professional hoop.',
        'through! the gnomes demand an instant replay. there is none. it was still great.'],
  combo:['TWO spells. at once. the tower felt that. i felt that. everybody felt that.',
         'a fusion. a combo. the orbs are showing off now.',
         'double cast! somebody write that down. (i cannot. no hands.)'],
  trade:['sold! the gnomes shake your hand. all six of their hands.','pleasure doing business. the trash is theirs now. forever.','the union approves this trade. stamped. (the stamp is a thumb.)'],
  catch:['CAUGHT. safe hands. the pot applauds. (the pot bubbles.)',
         'got him! mid-air! somebody clip that. (there is no clipping.)',
         'snagged. the floor is disappointed. it wanted him.'],
  seek:['FOUND YOU. the hiding spot is compromised. forever.',
        'there you are! behind the nothing! classic.',
        'seeker wins. obj demands a recount. recount denied.'],
  hintlead:['fine. a free one: ','listen closely, i do this once: ','you did not hear this from me, but ']
};

// ══ helpers ══
function opIng(id){for(var i=0;i<OP_ING.length;i++)if(OP_ING[i].id===id)return OP_ING[i];return null}
function opIngType(id){var g=opIng(id);return g?g.type:null}
function opFindIng(name){
 if(!name)return null;
 var n=String(name).toLowerCase().replace(/^(the|a|an)\s+/,'').trim();
 for(var i=0;i<OP_ING.length;i++){var g=OP_ING[i];if(g.id===n||g.name===n)return g}
 for(var j=0;j<OP_ING.length;j++){var g2=OP_ING[j];if(g2.id.indexOf(n)!==-1||g2.name.indexOf(n)!==-1)return g2}
 return null;
}
function opHexRGB(hex){
 hex=String(hex).replace('#','');
 if(hex.length===3)hex=hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
 var v=parseInt(hex,16);
 return [(v>>16)&255,(v>>8)&255,v&255];
}
function opRGB(c,a){return 'rgba('+c[0]+','+c[1]+','+c[2]+','+a+')'}
function opBlend(){
 if(!opPot.length)return [90,90,120];
 var r=0,g=0,b=0;
 for(var i=0;i<opPot.length;i++){var c=opHexRGB(opIng(opPot[i]).c);r+=c[0];g+=c[1];b+=c[2]}
 var n=opPot.length;return [Math.round(r/n),Math.round(g/n),Math.round(b/n)];
}
function opPick(arr,seed){return arr[Math.floor((Math.random()+((seed||0)*0.13))%1*arr.length)%arr.length]}

// ══ sfx (tiny local webaudio, no engine dependency) ══
var opAudio=null;
function opBeep(freq,dur,type,vol,slideTo,delay){
 try{
  if(opMeta.muted)return;
  if(!opAudio){var AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;opAudio=new AC()}
  if(opAudio.state==='suspended')opAudio.resume();
  var t0=opAudio.currentTime+(delay||0);
  var o=opAudio.createOscillator(),g=opAudio.createGain();
  o.type=type||'square';o.frequency.setValueAtTime(freq,t0);
  if(slideTo)o.frequency.exponentialRampToValueAtTime(Math.max(20,slideTo),t0+dur);
  g.gain.setValueAtTime(vol||0.08,t0);g.gain.exponentialRampToValueAtTime(0.0001,t0+dur);
  o.connect(g);g.connect(opAudio.destination);o.start(t0);o.stop(t0+dur+0.02);
 }catch(e){}
}
function opSfx(name,a){
 try{
  if(name==='add')opBeep(520+Math.random()*120,0.09,'square',0.07);
  else if(name==='dupe'||name==='junk')opBeep(130,0.22,'sawtooth',0.09,70);
  else if(name==='mix')opBeep(300,0.15,'triangle',0.09,520);
  else if(name==='discover'){var ns=[523,659,784,1046];for(var i=0;i<ns.length;i++)(function(f,t){opBeep(f,0.16,'triangle',0.1,null,t)})(ns[i],i*0.11)}
  else if(name==='cast'){opBeep(340,0.25,'sawtooth',0.08,90);opBeep(680,0.18,'triangle',0.07,180,0.05)}
  else if(name==='thud')opBeep(140,0.12,'triangle',0.1,70);
  else if(name==='crash'){opBeep(220,0.4,'sawtooth',0.12,40);opBeep(110,0.5,'square',0.1,30,0.06)}
  else if(name==='zap'){opBeep(880,0.1,'square',0.07,220)}
  else if(name==='frog')opBeep(220,0.09,'square',0.07,330);
  else if(name==='chime'){var p=[523,587,659,784,880];opBeep(p[(a||0)%p.length],0.3,'sine',0.09)}
  else if(name==='strike'){opBeep(90,0.3,'sawtooth',0.13,35);opBeep(1400,0.08,'square',0.05,300,0.02)}
  else if(name==='freeze')opBeep(1200,0.35,'sine',0.07,300);
  else if(name==='pop')opBeep(600,0.08,'square',0.07,900);
  else if(name==='launch'){opBeep(150,0.5,'sawtooth',0.11,900);opBeep(75,0.6,'square',0.09,300,0.05)}
  else if(name==='ploop')opBeep(380,0.18,'sine',0.1,90);
  else if(name==='eep')opBeep(950,0.07,'square',0.06,1200);
 }catch(e){}
}
// ══ tower bgm (own Audio element, folk pattern: duck void, play ours, restore) ══
var opAud=null;
var OP_BGM=[
 {file:'soundosund.mp3',label:'soundosund'},
 {file:'vestige.mp3',label:'vestige'},
 {file:'coffee.mp3',label:'coffee'},
 {file:'little_cat_feet.mp3',label:'little cat feet'},
 {file:'the_furnace.mp3',label:'furnace'},
 {file:'friday.mp3',label:'friday'},
 {file:'friendly_faith_plate.mp3',label:'faith plate'},
 {file:'soundosund.mp3',label:'soundosund'},
 {file:'drone2lp.wav',label:'drone'},
 {file:'move.webm',label:'let me see ya move'}
];
function opTowerBgm(){return opMeta.bgm||'soundosund.mp3'}
function opPlayTowerBgm(){
 try{
  var f=opTowerBgm();
  if(!opAud){try{opAud=new Audio()}catch(e){return}}
  if(f==='off'||opMeta.muted){try{opAud.pause()}catch(e){}return}
  try{
   var cur='';try{cur=opAud.src||''}catch(e){}
   if(cur.indexOf(f)===-1){opAud.src=f;try{opAud.load()}catch(e){}}
   opAud.loop=true;opAud.volume=0.32;
   var p=opAud.play();if(p&&p.catch)p.catch(function(){});
  }catch(e){}
 }catch(e){}
}
function opTowerBgmSet(v){
 v=String(v||'').toLowerCase().trim();
 if(v===''||v==='list'){opLogLine('tower bgm: '+OP_BGM.map(function(b){return b.label}).join(' · ')+' · off');return false}
 if(v==='off'){opMeta.bgm='off';opSave();opPlayTowerBgm();opLogLine('tower bgm: off. just the bubbling.');return true}
 for(var i=0;i<OP_BGM.length;i++){if(OP_BGM[i].file.toLowerCase()===v||OP_BGM[i].label.toLowerCase().indexOf(v)!==-1){opMeta.bgm=OP_BGM[i].file;opSave();opPlayTowerBgm();opLogLine('tower bgm: '+OP_BGM[i].label+'.');return true}}
 opLogLine('bgm? try: '+OP_BGM.map(function(b){return b.label}).join(' · ')+' · off');return false;
}
function opTowerBgmDuck(){
 try{
  if(typeof bgm!=='undefined'&&bgm){window._opWasBgm=!bgm.paused;try{bgm.pause()}catch(e){}}else window._opWasBgm=false;
  if(typeof moonEl!=='undefined'&&moonEl){window._opWasMoon=!moonEl.paused;try{moonEl.pause()}catch(e){}}else window._opWasMoon=false;
  try{if(typeof stopGameMusic==='function')stopGameMusic()}catch(e){}
 }catch(e){}
}
function opTowerBgmRestore(){
 try{if(opAud)opAud.pause()}catch(e){}
 try{if(typeof bgm!=='undefined'&&bgm&&window._opWasBgm){var p=bgm.play();if(p&&p.catch)p.catch(function(){})}}catch(e){}
 try{if(typeof moonEl!=='undefined'&&moonEl&&window._opWasMoon){var q=moonEl.play();if(q&&q.catch)q.catch(function(){})}}catch(e){}
 try{window._opWasBgm=false;window._opWasMoon=false}catch(e){}
}

// ══ persistence ══
function opLoad(){try{var s=JSON.parse(localStorage.getItem('cube_objpot')||'{}');if(s.found)opFound=s.found;if(s.meta){for(var k in s.meta)opMeta[k]=s.meta[k]}}catch(e){}}
function opSave(){try{
 var meta={mixes:opMeta.mixes||0,discoveries:opMeta.discoveries||0,riddleDone:opMeta.riddleDone?1:0,riddle2Done:opMeta.riddle2Done?1:0,wallBroke:opMeta.wallBroke?1:0,yardBroke:opMeta.yardBroke?1:0,
  talkCount:opMeta.talkCount||0,muted:opMeta.muted?1:0,casts:opMeta.casts||{},paid:opMeta.paid||{},trash:opMeta.trash||0,launches:opMeta.launches||0,
  dial:opMeta.dial||0,bgm:opMeta.bgm||'',hoops:opMeta.hoops||0,combos:opMeta.combos||0,streak:opMeta.streak||0,
  catches:opMeta.catches||0,seeks:opMeta.seeks||0,
  riddle3Done:opMeta.riddle3Done?1:0,crank:opMeta.crank?1:0,crankFixed:opMeta.crankFixed?1:0,gnomeTrust:opMeta.gnomeTrust||0,gnomeFriend:opMeta.gnomeFriend?1:0};
 localStorage.setItem('cube_objpot',JSON.stringify({found:opFound,meta:meta}));
}catch(e){}}
function opFoundCount(){var n=0;for(var k in opFound)if(opFound[k])n++;return n}

// ══ css + shell ══
function opCSS(){
 if(document.getElementById('opCSS'))return;
 var s=document.createElement('style');s.id='opCSS';
 s.textContent=
 '#opOverlay{position:fixed;inset:0;z-index:2000;background:#0b0a10;display:flex;flex-direction:column;font-family:Consolas,monospace;color:#c8c8d0}'+
 '#opNarr{background:#07060b;color:#c8b8e0;padding:12px 22px;min-height:62px;font-size:15px;line-height:1.5;border-bottom:2px solid #1a1626}'+
 '#opNarr .who{color:#8a6fd0;font-style:italic}'+
 '#opMain{flex:1;display:flex;min-height:0;position:relative}'+
 '#opPotPane{flex:0 0 360px;position:relative;border-right:2px solid #1a1626;background:radial-gradient(circle at 50% 42%,#151022,#0b0a10 70%);transition:box-shadow .3s,border-color .3s}'+
 '#opPotPane.broken{border-right-color:#4a2f5e;box-shadow:inset -22px 0 34px -14px rgba(200,160,255,0.30)}'+
 '#opCanvas{position:absolute;inset:0;width:100%;height:100%;display:block;z-index:40;pointer-events:none}'+
 '@keyframes opShake{0%,100%{transform:translate(0,0)}25%{transform:translate(-6px,3px)}50%{transform:translate(5px,-4px)}75%{transform:translate(-4px,-2px)}}'+
 '.opShake{animation:opShake .32s}'+
 '#opPotCount{position:absolute;left:0;right:0;bottom:10px;text-align:center;font-size:12px;letter-spacing:2px;color:#6a6a86}'+
 '#opPanel{flex:1;display:flex;flex-direction:column;min-width:0}'+
 '#opTabs{display:flex;border-bottom:2px solid #1a1626}'+
 '.opTab{flex:1;background:none;border:none;color:#6a6a86;font-family:Consolas,monospace;font-size:13px;letter-spacing:2px;padding:11px;cursor:pointer}'+
 '.opTab.on{color:#e6dcff;background:#141020}'+
 '#opBody{flex:1;overflow:auto;padding:10px 16px}'+
 '.opTypeHead{color:#6a6a86;font-size:11px;letter-spacing:3px;margin:12px 0 4px;text-transform:uppercase}'+
 '.opIng{display:inline-block;background:#141020;border:1px solid #2a2340;border-radius:3px;padding:5px 10px;margin:3px;font-size:13px;cursor:pointer;color:#cfcfda}'+
 '.opIng:hover{border-color:#8a6fd0;color:#fff}'+
 '.opSwatch{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:6px;vertical-align:middle}'+
 '.opSpell{border-left:2px solid #2a2340;padding:6px 10px;margin:7px 0;font-size:13px}'+
 '.opSpell .nm{color:#e6dcff}'+
 '.opSpell .rc{color:#6a6a86;font-size:12px;margin-top:2px}'+
 '.opSpell.locked{border-left-color:#1a1626}'+
 '.opSpell.locked .nm{color:#3a3a52}'+
 '#opBottom{border-top:2px solid #1a1626}'+
 '#opLog{height:88px;overflow:auto;padding:8px 16px;font-size:13px;line-height:1.55;color:#9a9ab0;background:#080710}'+
 '#opLog .hi{color:#e6dcff}'+
 '#opLog .st{color:#ffd27f}'+
 '#opRow{display:flex;gap:10px;padding:8px 14px;background:#07060b;align-items:center}'+
 '#opInput{flex:1;background:#100e18;border:1px solid #2a2340;color:#dcdce8;font-family:Consolas,monospace;font-size:14px;padding:7px 10px;outline:none}'+
 '#opInput:focus{border-color:#8a6fd0}'+
 '#opLeave{background:none;border:1px solid #6a6a86;color:#9a9ab0;font-family:Consolas,monospace;font-size:12px;letter-spacing:2px;padding:7px 14px;cursor:pointer}'+
 '#opLeave:hover{border-color:#e6dcff;color:#fff}'+
 '#opInputHint{color:#4a4a62;font-size:12px;white-space:nowrap}'+
 '.opCastBtn{display:inline-block;background:#1c1530;border:1px solid #8a6fd0;border-radius:3px;color:#e6dcff;font-size:12px;letter-spacing:1px;padding:3px 12px;margin-top:4px;cursor:pointer}'+
 '.opCastBtn:hover{background:#2a2148;color:#fff}'+
 '#opOverlay{touch-action:manipulation}'+
 '@media (max-width:700px){#opPotPane{flex-basis:220px}#opNarr{font-size:13px;padding:10px 14px;min-height:54px}#opInput{font-size:16px;padding:9px 10px}.opIng{font-size:14px;padding:7px 12px}#opLeave{padding:9px 16px}}'+
 '#opYardPane{flex:0 0 0;position:relative;overflow:hidden;border-right:0 solid #1a1626;background:linear-gradient(180deg,#0b1424 0%,#0b1424 52%,#0e180e 52%,#090c07 100%);transition:flex-basis .45s ease,border-width .45s}'+
 '#opYardPane.open{flex-basis:260px;border-right-width:2px}'+
 '@media (max-width:700px){#opYardPane.open{flex-basis:170px}}'+
 '#opMemoryPane{flex:0 0 0;position:relative;overflow:hidden;background:linear-gradient(180deg,#11111b 0%,#171521 58%,#0d0c12 100%);border-left:0 solid #40354e;transition:flex-basis .45s ease,border-width .45s}'+
 '#opMemoryPane.open{flex:0 1 280px;min-width:140px;border-left-width:2px}'+
 '#opMain.memory-open #opPotPane{flex:0 1 360px;min-width:160px}'+
 '#opMain.memory-open #opYardPane.open{flex:0 1 260px;min-width:0}'+
 '#opMain.memory-open #opPanel{flex:1 1 180px;min-width:160px}'+
 '#opSkateBack{display:none;position:absolute;top:12px;right:12px;z-index:60;background:#10141b;border:1px solid #8fa8bd;color:#e2edf5;font:11px Consolas,monospace;letter-spacing:1px;padding:9px 12px;cursor:pointer}'+
 '#opSkateBack:hover{background:#1a2632;border-color:#c2d5e5}'+
 '#opMain.skate-open #opYardPane,#opMain.skate-open #opPotPane,#opMain.skate-open #opPanel,#opMain.skate-open #opMemoryPane{display:none}'+
  '#opMain.skate-open #opSkateBack{display:block}'+
  '#opMain.dream-open #opYardPane,#opMain.dream-open #opPotPane,#opMain.dream-open #opPanel,#opMain.dream-open #opMemoryPane{display:none}'+
  '#opMain.dream-open #opSkateBack{display:block}'+
 '.opMemoryRoom{height:100%;box-sizing:border-box;padding:18px 16px;color:#cfc6dc;display:flex;flex-direction:column;align-items:center;gap:12px}'+
 '.opMemoryTitle{font-size:11px;letter-spacing:3px;color:#c8a8ef;text-align:center}'+
 '.opMemoryCopy{font-size:11px;line-height:1.5;color:#898398;text-align:center;max-width:230px}'+
 '.opMemoryStage{flex:1;min-height:150px;width:100%;position:relative;display:flex;align-items:center;justify-content:center}'+
 '.opMemoryReadout{font-size:10px;letter-spacing:1px;color:#998eaa;text-align:center;min-height:28px}'+
 '.opMemoryAccessKeys{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}'+
 '.opMemoryAccessKeys button:focus{position:fixed;z-index:80;left:8px;bottom:8px;width:auto;height:auto;clip:auto;padding:8px 12px;background:#181521;color:#fff;border:1px solid #c8a8ef}'+
 '@media (max-width:700px){#opMemoryPane.open{flex-basis:145px;min-width:110px}#opMain.memory-open #opPotPane{flex-basis:180px;min-width:100px}#opMain.memory-open #opYardPane.open{flex-basis:130px}#opMain.memory-open #opPanel{flex-basis:150px;min-width:135px}.opMemoryRoom{padding:12px 8px}#opMain.memory-open .opTab{font-size:9px;letter-spacing:0;padding:8px 2px}}'+
 '.opMenuSec{color:#8a6fd0;font-size:11px;letter-spacing:3px;margin:14px 0 6px;text-transform:uppercase}'+
 '.opMenuBtn{display:inline-block;background:#141020;border:1px solid #2a2340;border-radius:3px;padding:6px 12px;margin:3px;font-size:12px;letter-spacing:1px;cursor:pointer;color:#9a9ab0}'+
 '.opMenuBtn:hover{border-color:#8a6fd0;color:#fff}'+
 '.opMenuBtn.on{border-color:#8a6fd0;color:#e6dcff;background:#1c1530}'+
 '.opStat{font-size:13px;color:#9a9ab0;margin:3px 0}'+
 '.opStat b{color:#e6dcff;font-weight:normal}';
 document.head.appendChild(s);
}
function opBuild(){
 opCSS();
 var ov=document.createElement('div');ov.id='opOverlay';ov.style.display='none';
 ov.innerHTML='<div id="opNarr"><span class="who">obj: </span><span id="opNarrText"></span></div>'+
 '<div id="opMain">'+
   '<div id="opYardPane"></div>'+
   '<div id="opPotPane"><div id="opPotCount"></div></div>'+
   '<div id="opPanel"><div id="opTabs"><button class="opTab" data-t="shelf">INGREDIENTS</button><button class="opTab" data-t="book">SPELLBOOK</button><button class="opTab" data-t="tower">TOWER</button></div><div id="opBody"></div></div>'+
   '<div id="opMemoryPane"><div class="opMemoryRoom"><div class="opMemoryTitle">THE QUIET ROOM</div><div class="opMemoryCopy">a little table at the end of the tower. five wooden notes wait in the dust.</div><div class="opMemoryStage" aria-hidden="true"></div><div class="opMemoryReadout" id="opMemoryReadout">play a four-note phrase</div><div class="opMemoryAccessKeys" aria-label="xylophone notes">'+['C','D','E','G','A'].map(function(n,i){return '<button type="button" data-memory-note="'+i+'" aria-label="play note '+n+'">'+n+'</button>'}).join('')+'</div></div></div>'+
   '<canvas id="opCanvas"></canvas>'+
   '<button id="opSkateBack" type="button">← BACK TO THE XYLOPHONE</button>'+
 '</div>'+
 '<div id="opBottom"><div id="opLog"></div>'+
   '<div id="opRow"><span id="opInputHint">›</span><input id="opInput" autocomplete="off" spellcheck="false" placeholder="add glowcap / mix / cast ember / hint / mute / leave"><button id="opLeave">LEAVE</button></div>'+
 '</div>';
 document.body.appendChild(ov);
 try{
  var tabs=ov.querySelectorAll('.opTab');
  for(var i=0;i<tabs.length;i++)(function(b){b.onclick=function(){opTab=b.getAttribute('data-t');opRenderTabs();opRenderBody()}})(tabs[i]);
  document.getElementById('opLeave').onclick=function(){try{opExit()}catch(e){}};
  var notes=ov.querySelectorAll('[data-memory-note]');
  for(var ni=0;ni<notes.length;ni++)(function(b){b.onclick=function(e){if(e.detail===0)opMemoryNote(parseInt(b.getAttribute('data-memory-note'),10))}})(notes[ni]);
  document.getElementById('opSkateBack').onclick=function(){if(opSkateMemory)opExitSkateMemory();else if(opDream)opExitDream(true)};
  var inp=document.getElementById('opInput');
  inp.addEventListener('keydown',function(e){
   if(e.key==='Enter'){var v=inp.value;inp.value='';opSubmit(v)}
   else if(e.key==='Escape'){e.preventDefault();try{opExit()}catch(err){}}
  });
 }catch(e){}
}
function opGlobalKey(e){try{if(!opActive)return;if(e.key==='Escape'){e.preventDefault();opExit()}}catch(err){}}
function opStashUI(){
 try{
  var keep=document.getElementById('opOverlay');
  var stash=document.getElementById('opStash');
  if(!stash){stash=document.createElement('div');stash.id='opStash';stash.style.display='none';document.body.appendChild(stash)}
  var nodes=[];for(var i=0;i<document.body.childNodes.length;i++)nodes.push(document.body.childNodes[i]);
  for(var j=0;j<nodes.length;j++){if(nodes[j]!==keep&&nodes[j]!==stash)stash.appendChild(nodes[j])}
 }catch(e){}
}
function opRestoreUI(){
 try{
  var keep=document.getElementById('opOverlay');
  var stash=document.getElementById('opStash');
  if(!stash)return;
  while(stash.firstChild)document.body.insertBefore(stash.firstChild,keep);
 }catch(e){}
}

// ══ rendering ══
function opLogLine(t,cls){
 try{
  var log=document.getElementById('opLog');if(!log)return;
  var d=document.createElement('div');if(cls)d.className=cls;d.textContent=t;
  log.appendChild(d);log.scrollTop=log.scrollHeight;
 }catch(e){}
}
function opRenderTabs(){
 try{
  var tabs=document.querySelectorAll('.opTab');
  for(var i=0;i<tabs.length;i++){var t=tabs[i].getAttribute('data-t');if(t===opTab)tabs[i].classList.add('on');else tabs[i].classList.remove('on')}
 }catch(e){}
}
function opTowerHTML(){
 var h='<div class="opTypeHead">tower menu</div>';
 h+='<div class="opMenuSec">dialogue speed</div><div>';
 for(var i=1;i<=4;i++)h+='<span class="opMenuBtn'+(opDial()===i?' on':'')+'" data-op="dial:'+i+'">'+i+'x</span>';
 h+='</div><div class="opMenuSec">tower bgm</div><div>';
 for(var j=0;j<OP_BGM.length;j++){var b=OP_BGM[j];h+='<span class="opMenuBtn'+(opTowerBgm()===b.file?' on':'')+'" data-op="bgm:'+b.file+'">'+b.label+'</span>'}
 h+='<span class="opMenuBtn'+(opTowerBgm()==='off'?' on':'')+'" data-op="bgm:off">off</span></div>';
 h+='<div class="opMenuSec">sound</div><div><span class="opMenuBtn" data-op="mute">'+(opMeta.muted?'unmute':'mute')+'</span></div>';
 h+='<div class="opMenuSec">tower record</div>'+opRecordHTML();
 return h;
}
function opRecordHTML(){
 var cc=0;if(opMeta.casts)for(var k in opMeta.casts)cc+=opMeta.casts[k];
 var rows=[['orbs',opFoundCount()+'/'+OP_SPELLS.length],['casts',cc],['combos',opMeta.combos||0],['mixes',opMeta.mixes||0],['trash filed',opMeta.trash||0],['launches',opMeta.launches||0],['hoop aces',opMeta.hoops||0],['riddle streak',opMeta.streak||0]];
 var h='';for(var i=0;i<rows.length;i++)h+='<div class="opStat">'+rows[i][0]+': <b>'+rows[i][1]+'</b></div>';
 var flags=[];if(opMeta.riddleDone)flags.push('riddle ✓');if(opMeta.riddle2Done)flags.push('riddle 2 ✓');if(opMeta.riddle3Done)flags.push('riddle 3 ✓');if(opMeta.wallBroke)flags.push('wall broken');if(opMeta.yardBroke)flags.push('yard open');if(opMeta.crankFixed)flags.push('well fixed');if(opMeta.gnomeFriend)flags.push('gnome friend');
 if(flags.length)h+='<div class="opStat">'+flags.join(' · ')+'</div>';
 return h;
}
function opTowerOp(spec){
 var parts=String(spec||'').split(':');var k=parts[0],v=parts.slice(1).join(':');
 if(k==='dial'){var n=parseInt(v,10);if(n>=1&&n<=4){opMeta.dial=n;opSave();opLogLine('dialogue speed: '+n+'x. obj talks faster. somehow ruder.');opRenderBody()}return}
 if(k==='bgm'){opTowerBgmSet(v);if(opTab==='tower')opRenderBody();return}
 if(k==='mute'){opSubmit(opMeta.muted?'unmute':'mute');if(opTab==='tower')opRenderBody();return}
}
function opRenderBody(){
 var body=document.getElementById('opBody');if(!body)return;
 if(opTab==='tower'){body.innerHTML=opTowerHTML();
  try{var tb=body.querySelectorAll('[data-op]');for(var m=0;m<tb.length;m++)(function(el){el.onclick=function(){opTowerOp(el.getAttribute('data-op'))}})(tb[m])}catch(e){}
  return}
 if(opTab==='book'){body.innerHTML=opBookHTML();
  try{var cs=body.querySelectorAll('.opCastBtn');for(var k=0;k<cs.length;k++)(function(el){el.onclick=function(){opSubmit('cast '+el.getAttribute('data-cast'))}})(cs[k])}catch(e){}
  return}
 body.innerHTML=opShelfHTML();
 try{var els=body.querySelectorAll('.opIng');for(var i=0;i<els.length;i++)(function(el){el.onclick=function(){opSubmit('add '+el.getAttribute('data-id'))}})(els[i])}catch(e){}
}
function opShelfHTML(){
 var h='<div class="opTypeHead">the rule</div><div style="font-size:12px;color:#8a8a96;margin-bottom:6px">three ingredients. ONE OF EACH TYPE. then <span class="hi" style="color:#e6dcff">mix</span>.</div>';
 var order=['void','grotto','machine'];
 for(var o=0;o<order.length;o++){
  var ty=order[o];var T=OP_TYPES[ty];
  h+='<div class="opTypeHead" style="color:'+T.color+'">'+T.name+'</div>';
  h+='<div style="font-size:12px;color:#5a5a72;margin-bottom:4px;font-style:italic">'+T.blurb+'</div>';
  for(var i=0;i<OP_ING.length;i++){var g=OP_ING[i];if(g.type!==ty)continue;
   h+='<span class="opIng" data-id="'+g.id+'"><span class="opSwatch" style="background:'+g.c+'"></span>'+g.name+'</span>';
  }
 }
 return h;
}
function opBookHTML(){
 var n=opFoundCount();
 var h='<div class="opTypeHead">spellbook — '+n+'/'+OP_SPELLS.length+'</div>';
 for(var i=0;i<OP_SPELLS.length;i++){
  var s=OP_SPELLS[i];var got=!!opFound[s.id];
  if(got){
   var r='';for(var j=0;j<s.r.length;j++){var g=opIng(s.r[j]);r+=(j?' + ':'')+'<span style="color:'+g.c+'">'+g.name+'</span>'}
   var cc=(opMeta.casts&&opMeta.casts[s.id])||0;
   var cd=Math.ceil(((opCool[s.id]||0)-Date.now())/1000);
   var rdy=cd>0?('cooldown '+cd+'s'):('cast ×'+cc+(cc?' · READY':' · never cast — try it'));
   h+='<div class="opSpell"><span class="nm">'+s.name+'</span><div class="rc">'+s.desc+'</div><div class="rc">'+r+'</div><div class="rc"><span class="opCastBtn" data-cast="'+s.id+'">CAST</span> <span style="color:#4a4a62">'+rdy+'</span></div></div>';
  }else{
   var lockMsg='undiscovered. one of each type makes it. ask obj for a hint.';
   if(s.id==='storm'&&!opMeta.wallBroke)lockMsg='sealed. something structural has to break first.';
   h+='<div class="opSpell locked"><span class="nm">???</span><div class="rc">'+lockMsg+'</div></div>';
  }
 }
 return h;
}

// ══ canvas (the cauldron + obj) ══
var opCv=null,opCtx=null,opW=0,opH=0,opPaneW=360;
var opObjP={x:0,y:0,vx:0,vy:0,init:false};
var opGrab={on:false,offx:0,offy:0,lastx:0,lasty:0,lastt:0,suppressUntil:0};
var opQuipT=0,opPhysNow=0,opWallBroken=false,opCracks=[];
var OP_COOLDOWN=20;
var OP_GRAV=940,OP_REST=0.55,OP_COLR=30,OP_GRABR=50,OP_BREAKSPD=900;
// spell fx state (all timestamps via Date.now(), all reset on enter except casts/paid)
var opObjScale=1,opScaleT=0,opFreezeT=0,opFloatT=0,opHeatT=0,opHeavyT=0,opBouncyT=0;
var opAttract=null; // {x,y,until,str}
var opFrog=null,opMothT=0,opGlyph=null,opLanternT=0;
var opStrikes=[],opSparks=[],opRings=[];
var opCool={},opLastFling=null,opPotWob=0;
// courtyard (left wall) state
var opYardW=0,opYardOpen=false,opYardT=0,opYardCracks=[];
var opYardGateBroken=[false,false],opYardGateCracks=[[],[]];
var opMemoryOpen=false,opMemoryBeat=[],opMemoryCracks=[],opSkateMemory=false;
var opDream=null,opDreamKeys={};
var OP_MEMORY_BEATS=[
 {id:'lights',beat:[0,1,2,4],title:'eight little lights',text:'before the tower had a name, eight little lights woke inside a gray shell. one by one, they found their colors. obj kept the first tune they made.'},
 {id:'echo',beat:[4,2,1,0],title:'the answer below',text:'once, a sound came up from somewhere green and deep. obj rang the same four notes back. the echo answered. he still says he was not surprised.'},
 {id:'waiting',beat:[1,1,3,2],title:'the long quiet',text:'there was a long stretch when nobody came to the tower. obj played two notes, then two more, so the quiet would have something to do.'},
 {id:'skate',beat:[0,2,1,4],title:'the park with no skateboard',text:'a small concrete park behind the tower. no skateboard. obj went down the ramps anyway, picking up speed each time. he calls it skating. the ramps do not correct him.'}
];
var opGnomes=[],opInWell=false,opInTrash=false;
var opWellTrip=null,opWellHidden=false;
var opWellCoolT=0,opLaunchCoolT=0,opLaunchFlameT=0;
var opWellQuipT=0,opTrashQuipT=0,opPadQuipT=0,opGnomeQuipT=0;
var opHoopCool=0,opTrustT=0;
var opDandyT=0,opRingT=0,opTradeT=0;
var opDropArmed=false,opHideT=0;
function opDrop(){
 if(!opObjP.init){opNarr('drop what? he is barely rendered.');return}
 if(opWellTrip){opNarr('he is down the well. drop him later.');return}
 if(opHideT>Date.now()){opNarr('he is hidden. find him first. seeker.');return}
 var rr=OP_COLR*opObjScale,rx=(opWallBroken?opW:opWallX())-rr;
 opObjP.x=Math.max(rr+20,Math.min(rx-20,(rr+rx)/2+(Math.random()-0.5)*120));
 opObjP.y=60;opObjP.vx=(Math.random()-0.5)*120;opObjP.vy=0;
 opDropArmed=true;
 opSfx('pop');
 opNarr(opPick(['dropped. catch him. (grab him.)','up he goes. down he comes. hands ready.','catch practice. he volunteered. (he did not.)']));
 opLogLine('dropped. grab him before the floor does.','st');
}
function opHide(){
 if(!opObjP.init){opNarr('hide what?');return}
 if(opWellTrip){opNarr('he is down the well. that counts as hidden. (it does not.)');return}
 if(opHideT>Date.now()){opNarr('already hidden. seek harder. (grab around.)');return}
 var rr=OP_COLR*opObjScale,rx=(opWallBroken?opW:opWallX())-rr;
 opObjP.x=rr+20+Math.random()*Math.max(40,rx-rr-40);
 opObjP.y=80+Math.random()*Math.max(40,opH-180);
 opObjP.vx=0;opObjP.vy=0;
 opWellHidden=true;opHideT=Date.now()+12000;opDropArmed=false;
 opSfx('pop');
 opNarr('hidden. 12 seconds. come find him. (do not look at the code.)');
 opLogLine('obj hid somewhere. grab around.','st');
}
function opBlow(){
 if(!opYardOpen){opNarr('blow what? the pot? do not blow on the pot.');return}
 var now=Date.now();
 if(opDandyT>now){opNarr('just a stem. it needs a bit. ('+Math.ceil((opDandyT-now)/1000)+'s.)');return}
 opDandyT=now+120000;
 var dx2=opYardW*0.15,dy2=opH*0.68;
 opBurst(dx2,dy2-12,22,'240,240,245',120);opSfx('pop');
 var w=Math.random();
 if(w<0.34){opCool={};if(opTab==='book')opRenderBody();opLogLine('wish granted: every orb READY.','st');opNarr('a wish! the seeds carry it up. orbs: ready.')}
 else if(w<0.67){
  var miss=[];for(var i=0;i<OP_SPELLS.length;i++)if(!opFound[OP_SPELLS[i].id]){if(OP_SPELLS[i].id==='storm'&&!opMeta.wallBroke)continue;miss.push(OP_SPELLS[i])}
  if(!miss.length){opLogLine('wish granted: nothing to reveal. show-off.','st')}
  else{var rs=miss[Math.floor(Math.random()*miss.length)],rg=opIng(rs.r[Math.floor(Math.random()*rs.r.length)]);opLogLine('wish granted: "'+rs.name+'" wants the '+rg.name+'.','st')}
  opNarr('a wish! the seeds carry it up. somebody answers.');
 }else{opObjP.vy-=420;opLogLine('wish granted: obj, tossed.','st');opNarr('a wish! the seeds carry it up. obj goes up. briefly.')}
}
function opChimeTower(){
 if(!opYardOpen){opNarr('no tower here. hum it yourself.');return}
 var now=Date.now();
 if(opRingT>now){opNarr('the tower is still humming. ('+Math.ceil((opRingT-now)/1000)+'s.)');return}
 opRingT=now+30000;
 for(var i=0;i<3;i++)(function(k){setTimeout(function(){opSfx('chime',k+1);opRing(opYardW*0.90,opH*0.42,'255,225,150',50+k*20)},k*200)})(i);
 opObjP.vy-=200;opBurst(opYardW*0.90,opH*0.40,10,'255,225,150',120);
 opNarr(opPick(['the little tower plays three notes. obj bops.','ring ring. the courtyard has a soundtrack now.']));
 opLogLine('the music tower plays. obj bops.','st');
}
function opTrade(){
 if(!opYardOpen){opNarr('trade with who? the pot? it drives a hard bargain. (go to the yard.)');return}
 if(!opMeta.gnomeFriend){opNarr('the gnomes do not trade with strangers. befriend them first. (slowly.)');return}
 var now=Date.now();
 if(opTradeT>now){opNarr('the gnomes are counting. ('+Math.ceil((opTradeT-now)/1000)+'s.)');return}
 if((opMeta.trash||0)<5){opNarr('trade needs 5 trash filings. the gnomes only take trash. it is a whole thing.');return}
 opMeta.trash-=5;opTradeT=now+150000;opSave();
 var paid=false;
 try{var gs=JSON.parse(localStorage.getItem('cube_grotto')||'{}');gs.glow=(gs.glow||0)+50;localStorage.setItem('cube_grotto',JSON.stringify(gs));paid=true}catch(e){}
 opObjLine('trade');
 opTrophy('trade','op_trade','traded trash to the gnomes. yard sale.');
 opLogLine(paid?'traded 5 trash. +50 grotto glow. the gnomes launder it.':'traded 5 trash. the glow got lost. (grotto unreachable.)','st');
}
var opFloor='tower',opSawCellar=false,opSawRoof=false,opScoopT=0,opGazeT=0;
function opGoFloor(f){
 if(f===opFloor){opNarr(f==='tower'?'you are already at the pot. the pot is always.':'already here. the stairs judge your indecision.');return}
 opFloor=f;opFlash=Date.now()+500;opSfx('pop');
 if(f==='cellar'){opSawCellar=true;opNarr(opPick(['down we go. the cellar. barrels of old mixes. do not drink the barrels.','cellar. it smells like every mistake, aged.','below the tower. the dregs live here. scoop some.']))}
 else if(f==='roof'){opSawRoof=true;opNarr(opPick(['up. the roof. the sky is also a ceiling. a bigger one.','roof. wind. stars. the hoop looks small from up here.']))}
 else{opNarr(opPick(['back at the pot. it missed you. it says so by bubbling.','the pot room. home. the pot came with us anyway. do not question the pot.']))}
 opLogLine(f==='tower'?'back at the pot.':('now in the '+f+'.'),f==='tower'?null:'st');
 if(opSawCellar&&opSawRoof)opTrophy('floors','op_floors','visited the cellar and the roof. upstairsdownstairs.');
}
function opScoop(){
 if(opFloor!=='cellar'){opNarr('scoop what? the floor? ambitious. go DOWN first.');return}
 if(opPot.length>=3){opNarr('the pot is full. the dregs wait their turn.');return}
 var now=Date.now();
 if(opScoopT>now){opNarr('the dregs need a minute. ('+Math.ceil((opScoopT-now)/1000)+'s.)');return}
 opScoopT=now+60000;
 var g=OP_ING[Math.floor(Math.random()*OP_ING.length)];
 opLogLine('you scoop dregs. it is the '+g.name+'. somehow.','st');
 opAdd(g.id);
}
function opGaze(){
 if(opFloor!=='roof'){opNarr('no sky here. look up. (there is no up. go UP first.)');return}
 var now=Date.now();
 if(opGazeT>now){opNarr('the stars need a minute. ('+Math.ceil((opGazeT-now)/1000)+'s.)');return}
 opGazeT=now+90000;
 var miss=[];for(var i=0;i<OP_SPELLS.length;i++)if(!opFound[OP_SPELLS[i].id]){if(OP_SPELLS[i].id==='storm'&&!opMeta.wallBroke)continue;miss.push(OP_SPELLS[i])}
 if(!miss.length){opNarr('the stars shrug. you know everything. show-off.');return}
 var rs=miss[Math.floor(Math.random()*miss.length)],rg=opIng(rs.r[Math.floor(Math.random()*rs.r.length)]);
 opSfx('chime',2);
 opNarr('a star winks. it knows a recipe. it tells.');
 opLogLine('stargazing pays: "'+rs.name+'" wants the '+rg.name+'.','st');
}
function opMakeGnomes(){return [{fx:0.20,fy:0.80,dx:0,vx:0,y:0,vy:0},{fx:0.62,fy:0.68,dx:0,vx:0,y:0,vy:0},{fx:0.86,fy:0.88,dx:0,vx:0,y:0,vy:0}]}
function opFxActive(){var n=Date.now();return {scale:n<opScaleT,freeze:n<opFreezeT,float:n<opFloatT,heat:n<opHeatT,moth:n<opMothT,lantern:n<opLanternT}}
function opInitCanvas(){
 try{
  opCv=document.getElementById('opCanvas');if(!opCv)return;
  opCtx=opCv.getContext('2d');
  opResize();
  window.addEventListener('resize',opResize);
  opCanvasEvents();
 }catch(e){}
}
function opResize(){
 try{
  if(!opCv||!opCv.parentNode)return;
  var r=opCv.parentNode.getBoundingClientRect();
  opW=Math.max(120,Math.round(r.width));opH=Math.max(120,Math.round(r.height));
  opCv.width=opW;opCv.height=opH;
  var pane=document.getElementById('opPotPane');
  opPaneW=pane?Math.max(120,Math.round(pane.getBoundingClientRect().width)):Math.min(360,opW);
  var yp=document.getElementById('opYardPane');
  opYardW=yp?Math.max(0,Math.round(yp.getBoundingClientRect().width)):0;
  if(opObjP.init){opObjP.x=Math.max(OP_COLR,Math.min((opWallBroken?opW:opWallX())-OP_COLR,opObjP.x));opObjP.y=Math.max(OP_COLR,Math.min(opH-OP_COLR,opObjP.y))}
 }catch(e){}
}
function opPt(e,cv){
 var r=cv.getBoundingClientRect();
 return {x:(e.clientX-r.left)*(cv.width/(r.width||1)),y:(e.clientY-r.top)*(cv.height/(r.height||1))};
}
function opImpact(sp){
 if(sp>240){var now=performance.now();if(now-opQuipT>700){opQuipT=now;opObjLine('impact');opSfx('thud')}
  if(opDropArmed&&opObjP.y>opH-80){opDropArmed=false;opNarr(opPick(['floor caught him. the floor always catches him.','missed. he landed. loudly.']))}}
}
function opBreakWall(y){
 opWallBroken=true;opCracks=[];
 var bx=opWallX();
 for(var i=0;i<9;i++){
  var ang=(i/9)*Math.PI*2+Math.random()*0.6;
  var len=16+Math.random()*74;
  opCracks.push({x1:bx,y1:y,x2:bx+Math.cos(ang)*len,y2:y+Math.sin(ang)*len});
 }
 for(var j=0;j<5;j++){opCracks.push({x1:bx,y1:y+(Math.random()-0.5)*60,x2:bx-10-Math.random()*30,y2:y+(Math.random()-0.5)*80})}
 opObjLine('breakslam');
 opFlash=Date.now()+600;opSfx('crash');
 opMeta.wallBroke=1;opSave();
 opTrophy('wall','op_wall','broke the ingredients wall. structural mischief.');
 try{opBurst(opWallX(),opObjP.y,30,'205,182,235',260);opRing(opWallX(),opObjP.y,null,140)}catch(e){}
  try{var pane=document.getElementById('opPotPane');if(pane)pane.classList.add('broken')}catch(e){}
 try{var main=document.getElementById('opMain');if(main){main.classList.remove('opShake');void main.offsetWidth;main.classList.add('opShake')}}catch(e){}
}
function opBreakMemoryWall(y){
 if(opMemoryOpen)return;
 opMemoryOpen=true;opMemoryCracks=[];
 var bx=opW-16;
 for(var i=0;i<12;i++){
  var ang=(i/12)*Math.PI*2+Math.random()*0.5,len=18+Math.random()*80;
  opMemoryCracks.push({x1:bx,y1:y,x2:bx+Math.cos(ang)*len,y2:y+Math.sin(ang)*len});
 }
 try{var room=document.getElementById('opMemoryPane');if(room)room.classList.add('open');var main=document.getElementById('opMain');if(main)main.classList.add('memory-open')}catch(e){}
 opFlash=Date.now()+700;opSfx('crash');opShakeMain();
 try{opBurst(bx,y,34,'190,160,220',280);opRing(bx,y,null,160)}catch(e){}
 opNarr('the far wall gives way. behind it: a little room, a table, and a xylophone with five dusty keys.');
 opLogLine('the quiet room is open. strike the xylophone in different four-note beats.','st');
 setTimeout(function(){try{opResize()}catch(e){}},80);
 setTimeout(function(){try{opResize()}catch(e){}},600);
}
function opMemoryNote(note){
 if(!opMemoryOpen||note<0||note>4)return;
 var labels=['C','D','E','G','A'];
 opSfx('chime',note);
 if(opObjP.init){opRing(opObjP.x,opObjP.y,'220,190,255',45+note*9)}
 opMemoryBeat.push(note);if(opMemoryBeat.length>4)opMemoryBeat.shift();
 var readout=document.getElementById('opMemoryReadout');
 if(readout)readout.textContent='beat: '+opMemoryBeat.map(function(n){return labels[n]}).join(' · ')+(opMemoryBeat.length<4?' · '+(4-opMemoryBeat.length)+' to go':'');
 if(opMemoryBeat.length<4)return;
 for(var i=0;i<OP_MEMORY_BEATS.length;i++){
  var memory=OP_MEMORY_BEATS[i],match=true;
  for(var j=0;j<4;j++)if(opMemoryBeat[j]!==memory.beat[j]){match=false;break}
  if(match){
   opMemoryBeat=[];
   if(readout)readout.textContent='memory found: '+memory.title;
    opEnterMemoryScene(memory);return;
   opLogLine('memory recovered: '+memory.title,'st');
   opSfx('discover');
   try{opRing(opW-140,opH*0.48,'210,180,255',180)}catch(e){}
   return;
  }
 }
}
// ══ courtyard (behind the left wall) ══
// ══ memory dream scenes (playable cutscenes) ══
function opDreamTitle(id){for(var i=0;i<OP_MEMORY_BEATS.length;i++)if(OP_MEMORY_BEATS[i].id===id)return OP_MEMORY_BEATS[i].title;return id}
function opDreamCheckAll(){try{var d=opMeta.dreams||{};if(d.lights&&d.echo&&d.waiting&&d.skate)opTrophy('memories','op_memories','dreamed all four memories. seen everything.')}catch(e){}}
function opDreamColHex(i){var C=['47,212,212','124,92,255','255,95,162','255,159,69','255,225,77','87,224,122','77,163,255','255,93,93'];return C[i%8]}
function opDreamColCss(i){var C=['#2fd4d4','#7c5cff','#ff5fa2','#ff9f45','#ffe14d','#57e07a','#4da3ff','#ff5d5d'];return C[i%8]}
function opDreamLightPos(i){var cx=opW*0.5,cy=opH*0.44,R=Math.min(opW,opH)*0.27,a=(i/8)*Math.PI*2-Math.PI/2;return {x:cx+Math.cos(a)*R,y:cy+Math.sin(a)*R}}
function opEnterMemoryScene(memory){
 if(memory.id==='skate'){opEnterSkateMemory(memory);return}
 if(opDream||opSkateMemory||opWellTrip)return;
 opDream={id:memory.id,beat:memory.beat,t0:Date.now(),lit:0,litT:Date.now()+1200,tuneAt:0,tuneI:0,exitAt:0,echoT:Date.now()+2500,answered:false,rounds:0,roundT:Date.now()+3000,q:[]};
 try{var main=document.getElementById('opMain');if(main){main.classList.remove('memory-open');main.classList.add('dream-open')}}catch(e){}
 try{var back=document.getElementById('opSkateBack');if(back)back.style.display='block'}catch(e){}
 try{opObjP.x=opW*0.5;opObjP.y=(memory.id==='echo'?opH*0.22:opH*0.80);opObjP.vx=0;opObjP.vy=0;if(!opObjP.init)opObjP.init=true}catch(e){}
 opSfx('discover');opFlash=Date.now()+500;
 opNarr('memory — '+memory.title+'. '+memory.text+' move with WASD or arrows. BACK leaves.');
 opLogLine('dreaming: '+memory.title+'. WASD / arrows to wander.','st');
 setTimeout(function(){try{opResize()}catch(e){}},80);
}
function opExitDream(manual){
 if(!opDream)return;
 var id=opDream.id;opDream=null;opDreamKeys={};
 try{var main=document.getElementById('opMain');if(main){main.classList.remove('dream-open');main.classList.add('memory-open')}}catch(e){}
 try{var back=document.getElementById('opSkateBack');if(back)back.style.display='none'}catch(e){}
 try{opObjP.x=opW-OP_COLR*opObjScale-12;opObjP.y=opH*0.38;opObjP.vx=0;opObjP.vy=0}catch(e){}
 setTimeout(function(){try{opResize()}catch(e){}},80);
 if(manual){opObjLine('dreamcut');opLogLine('woke up early. the xylophone keeps your place.','st');return}
 try{if(!opMeta.dreams)opMeta.dreams={};opMeta.dreams[id]=1;opSave()}catch(e){}
 opObjLine('dream');
 opLogLine('dreamed: '+opDreamTitle(id)+'.','st');
 opSfx('discover');
 opTrophy('dream','op_dream','dreamed a tower memory. spaced out.');
 opDreamCheckAll();
}
function opDreamPhys(dt){
 if(!opObjP.init){opObjP.x=opW*0.5;opObjP.y=opH*0.8;opObjP.vx=0;opObjP.vy=0;opObjP.init=true}
 var ax=0,ay=0;
 if(opDreamKeys['arrowleft']||opDreamKeys['a'])ax-=1;
 if(opDreamKeys['arrowright']||opDreamKeys['d'])ax+=1;
 if(opDreamKeys['arrowup']||opDreamKeys['w'])ay-=1;
 if(opDreamKeys['arrowdown']||opDreamKeys['s'])ay+=1;
 if(ax&&ay){ax*=0.7071;ay*=0.7071}
 opObjP.vx+=ax*1500*dt;opObjP.vy+=ay*1500*dt;
 var damp=Math.max(0,1-5*dt);opObjP.vx*=damp;opObjP.vy*=damp;
 var sp=Math.sqrt(opObjP.vx*opObjP.vx+opObjP.vy*opObjP.vy);
 if(sp>320){opObjP.vx*=320/sp;opObjP.vy*=320/sp}
 opObjP.x+=opObjP.vx*dt;opObjP.y+=opObjP.vy*dt;
 if(opObjP.x<24){opObjP.x=24;opObjP.vx=0}
 if(opObjP.x>opW-24){opObjP.x=opW-24;opObjP.vx=0}
 if(opObjP.y<70){opObjP.y=70;opObjP.vy=0}
 if(opObjP.y>opH-24){opObjP.y=opH-24;opObjP.vy=0}
}
function opDreamTick(){
 if(!opDream)return;
 var now=Date.now(),sc=opDream;
 if(sc.exitAt&&now>=sc.exitAt){opExitDream(false);return}
 if(sc.id==='lights'){
  if(sc.lit<8&&now>=sc.litT){
   var li=sc.lit;sc.lit++;sc.litT=now+2000;
   var lp=opDreamLightPos(li);
   opSfx('chime',li%5);opRing(lp.x,lp.y,opDreamColHex(li),90);opBurst(lp.x,lp.y,10,opDreamColHex(li),140);
  }else if(sc.lit>=8&&!sc.tuneAt){sc.tuneAt=now+1500;sc.tuneI=0}
  if(sc.tuneAt&&sc.tuneI<4&&now>=sc.tuneAt+sc.tuneI*400){
   opSfx('chime',sc.beat[sc.tuneI]);opRing(opW*0.5,opH*0.46,'230,220,255',150);sc.tuneI++;
   if(sc.tuneI>=4&&!sc.exitAt)sc.exitAt=now+2200;
  }
 }else if(sc.id==='echo'){
  var sx=opW*0.5,sy=opH*0.80;
  if(now>=sc.echoT){sc.echoT=now+5000;opSfx('chime',0);opRing(sx,sy,'120,255,170',170)}
  var dx=opObjP.x-sx,dy=opObjP.y-sy;
  if(!sc.answered&&Math.sqrt(dx*dx+dy*dy)<110){
   sc.answered=true;sc.tuneI=0;sc.tuneAt=now+400;
   opNarr('you reach the hum. it notices you. it answers.');
  }
  if(sc.answered&&sc.tuneI<4&&now>=sc.tuneAt+sc.tuneI*450){
   opSfx('chime',sc.beat[sc.tuneI]);opRing(opObjP.x,opObjP.y,'140,255,180',130);sc.tuneI++;
   if(sc.tuneI>=4&&!sc.exitAt)sc.exitAt=now+2500;
  }
  if(!sc.exitAt&&now-sc.t0>90000)sc.exitAt=now+1000;
 }else{
  while(sc.q.length&&now>=sc.q[0].at){var nq=sc.q.shift();opSfx('chime',nq.n);opRing(opW*0.5,opH*0.40,'200,190,220',110)}
  if(now>=sc.roundT&&sc.rounds<3){
   sc.q.push({at:now+300,n:1},{at:now+800,n:1},{at:now+2000,n:3},{at:now+2500,n:2});
   sc.rounds++;sc.roundT=now+6500;
  }
  if(sc.rounds>=3&&!sc.q.length&&!sc.exitAt)sc.exitAt=now+2000;
 }
}
function opDreamHeader(g,title,sub){
 g.fillStyle='rgba(8,10,14,0.72)';g.fillRect(opW*0.30,opH*0.08,opW*0.40,34);
 g.strokeStyle='#8295a6';g.lineWidth=1;g.strokeRect(opW*0.30,opH*0.08,opW*0.40,34);
 g.fillStyle='#dce5ed';g.font='12px Consolas,monospace';g.textAlign='center';g.textBaseline='middle';
 g.fillText(title,opW*0.50,opH*0.08+17);
 if(sub){g.fillStyle='rgba(230,235,240,0.64)';g.font='11px Consolas,monospace';g.fillText(sub,opW*0.5,opH*0.08+55)}
}
function opDrawDreamLights(g,t){
 var sc=opDream;
 g.fillStyle='#050508';g.fillRect(0,0,opW,opH);
 for(var i=0;i<40;i++){var sx=(i*97.3)%opW,sy=opH*((i*0.037)%0.9);g.fillStyle='rgba(200,200,220,'+(0.05+0.05*Math.sin(t*0.7+i))+')';g.fillRect(sx,sy,2,2)}
 g.strokeStyle='rgba(160,160,180,0.35)';g.lineWidth=1.5;g.strokeRect(opW*0.5-20,opH*0.44-20,40,40);
 for(var L=0;L<8;L++){
  var lp=opDreamLightPos(L);
  if(sc&&L<sc.lit){
   g.fillStyle='rgba('+opDreamColHex(L)+',0.18)';g.fillRect(lp.x-24,lp.y-24,48,48);
   g.fillStyle=opDreamColCss(L);g.fillRect(lp.x-13,lp.y-13,26,26);
   g.strokeStyle='rgba(255,255,255,0.75)';g.lineWidth=1;g.strokeRect(lp.x-13,lp.y-13,26,26);
  }else{
   g.strokeStyle='rgba(120,120,140,0.5)';g.lineWidth=1.5;g.strokeRect(lp.x-13,lp.y-13,26,26);
  }
 }
 opDreamHeader(g,'DREAM / EIGHT LITTLE LIGHTS',(sc?sc.lit:0)+' / 8 awake');
}
function opDrawDreamEcho(g,t){
 var sky=g.createLinearGradient(0,0,0,opH);
 sky.addColorStop(0,'#031007');sky.addColorStop(0.55,'#0a2b18');sky.addColorStop(1,'#04140c');
 g.fillStyle=sky;g.fillRect(0,0,opW,opH);
 for(var i=0;i<6;i++){var bx=opW*(0.1+0.16*i),by=opH*(0.3+0.08*Math.sin(t*0.5+i*2));g.fillStyle='rgba(60,180,110,0.10)';g.beginPath();g.arc(bx,by,30+10*Math.sin(t+i),0,7);g.fill()}
 g.fillStyle='#0d3a22';
 for(var s2=0;s2<7;s2++){var tx2=opW*(0.05+0.15*s2);g.beginPath();g.moveTo(tx2-24,0);g.lineTo(tx2+24,0);g.lineTo(tx2,40+((s2*37)%50));g.closePath();g.fill()}
 var sx=opW*0.5,sy=opH*0.80,pu=1+0.15*Math.sin(t*2.4);
 g.fillStyle='rgba(120,255,170,0.20)';g.beginPath();g.arc(sx,sy,44*pu,0,7);g.fill();
 g.fillStyle='rgba(140,255,180,0.85)';g.beginPath();g.arc(sx,sy,12,0,7);g.fill();
 g.strokeStyle='rgba(140,255,180,0.5)';g.lineWidth=1.5;g.beginPath();g.arc(sx,sy,26+8*Math.sin(t*2.4),0,7);g.stroke();
 var sc=opDream;
 opDreamHeader(g,'DREAM / THE ANSWER BELOW',sc&&!sc.answered?'something hums below. go listen.':'it answers.');
}
function opDrawDreamWaiting(g,t){
 var sky=g.createLinearGradient(0,0,0,opH);
 sky.addColorStop(0,'#141216');sky.addColorStop(1,'#1e1a20');
 g.fillStyle=sky;g.fillRect(0,0,opW,opH);
 var tx=opW*0.5,tw=Math.min(200,opW*0.3),th=opH*0.5,ty=opH*0.30;
 g.strokeStyle='rgba(150,140,155,0.30)';g.lineWidth=2;g.strokeRect(tx-tw/2,ty,tw,th);
 g.strokeStyle='rgba(150,140,155,0.18)';g.beginPath();g.moveTo(tx-tw/2,ty);g.lineTo(tx,ty-30);g.lineTo(tx+tw/2,ty);g.stroke();
 g.strokeStyle='rgba(150,140,155,0.22)';g.lineWidth=2;g.beginPath();g.arc(tx,ty+th*0.72,34,0.15*Math.PI,0.85*Math.PI);g.stroke();
 for(var i=0;i<26;i++){var dx=(i*71.7)%opW,dy=opH*0.15+((i*53.3+t*8)%(opH*0.7));g.fillStyle='rgba(200,190,205,'+(0.08+0.06*Math.sin(t+i*1.7))+')';g.fillRect(dx,dy,2,2)}
 var sc=opDream;
 opDreamHeader(g,'DREAM / THE LONG QUIET','round '+Math.min(3,sc?sc.rounds:0)+' / 3 · the quiet keeps you company');
}
function opDrawDream(g,t){
 if(!opDream)return;
 if(opDream.id==='lights')opDrawDreamLights(g,t);
 else if(opDream.id==='echo')opDrawDreamEcho(g,t);
 else opDrawDreamWaiting(g,t);
}
function opYardAlpha(){return opYardOpen?Math.min(1,(Date.now()-opYardT)/500):0}
function opWellPos(){return {x:opYardW*0.42,y:opH*0.55,r:30}}
function opTrashPos(){return {x:opYardW*0.80,y:opH*0.72,r:22}}
function opPadPos(){return {x:opYardW*0.45,y:opH*0.86,w:96}}
function opBreakYard(y){
 opYardOpen=true;opYardT=Date.now();opYardCracks=[];
 for(var i=0;i<9;i++){
  var ang=(i/9)*Math.PI*2+Math.random()*0.6;
  var len=16+Math.random()*74;
  opYardCracks.push({x1:10,y1:y,x2:10+Math.abs(Math.cos(ang))*len,y2:y+Math.sin(ang)*len});
 }
 for(var j=0;j<5;j++){opYardCracks.push({x1:10,y1:y+(Math.random()-0.5)*60,x2:18+Math.random()*30,y2:y+(Math.random()-0.5)*80})}
 opObjLine('yardbreak');
 opFlash=Date.now()+600;opSfx('crash');
 opMeta.yardBroke=1;opSave();
 opTrophy('yard','op_yard','broke the left wall. found the courtyard. fresh air.');
 try{opBurst(10,opObjP.y,30,'150,160,190',260);opRing(10,opObjP.y,null,140)}catch(e){}
 try{var yp=document.getElementById('opYardPane');if(yp)yp.classList.add('open')}catch(e){}
 opShakeMain();
 opLogLine('the courtyard. a well, a trashcan, a rocket pad, and gnomes. fling obj at things.','st');
 setTimeout(function(){try{opResize()}catch(e){}},80);
 setTimeout(function(){try{opResize()}catch(e){}},600);
}
function opBreakYardGate(index,y){
 if(index<0||index>1||opYardGateBroken[index])return;
 var gx=opYardW*(index===0?0.28:0.76);
 opYardGateBroken[index]=true;opYardGateCracks[index]=[];
 for(var i=0;i<10;i++){
  var ang=(i/10)*Math.PI*2+Math.random()*0.45,len=12+Math.random()*58;
  opYardGateCracks[index].push({x1:gx,y1:y,x2:gx+Math.cos(ang)*len,y2:y+Math.sin(ang)*len});
 }
 opFlash=Date.now()+500;opSfx('crash');opShakeMain();
 try{opBurst(gx,y,22,'170,180,205',230);opRing(gx,y,null,110)}catch(e){}
 opNarr(index===0?'the old garden partition gave way. the gnomes are pretending they did not see that.':'the music tower wall is down. the little tower sounds nervous now.');
 opLogLine(index===0?'courtyard wall cracked open.':'tower-side wall cracked open.','st');
}
function opLaunch(){
 var now=Date.now();
 opLaunchCoolT=now+20000;opLaunchFlameT=now+900;
 opObjP.vy=-1650;opObjP.vx+=(Math.random()-0.5)*360;
 opBurst(opObjP.x,opObjP.y+20,36,'255,170,90',300);opRing(opObjP.x,opObjP.y,'255,180,120',150);
 opFlash=Date.now()+800;opShakeMain();opSfx('launch');
 opObjLine('launch');
 opMeta.launches=(opMeta.launches||0)+1;opSave();
 if(opMeta.launches===5)opNarr(['fifth flight. frequent flyer. the ceiling knows your name.','five launches. the rocket filed a noise complaint. about itself.']);
 else if(opMeta.launches===10){opNarr(['tenth flight. the ceiling has a frequent-flyer program. you are platinum.','ten. TEN. the gnomes built you a tiny medal. it is trash. treasure it.']);opTrophy('orbit','op_orbit','launched obj ten times. ceiling platinum.')}
 opTrophy('launch','op_launch','launched obj off the rocket pad. spectacular failure.');
 opLogLine('LIFTOFF. (the gnomes are taking notes.)');
}
function opTryLaunchCmd(){
 if(!opYardOpen||opYardW<40){opNarr('launch what? there is no pad. there is barely a tower.');return}
 var pd=opPadPos();
 var d=Math.sqrt((opObjP.x-pd.x)*(opObjP.x-pd.x)+(opObjP.y-pd.y)*(opObjP.y-pd.y));
 if(!opObjP.init||d>130){opNarr('get him on the pad first. gravity is the fuel.');return}
 if(opLaunchCoolT>Date.now()){opObjLine('pad');return}
 opLaunch();
}
function opWellTripTick(dt){
 var tr=opWellTrip;if(!tr)return;
 var now=Date.now(),w=opWellPos();
 if(tr.stage==='down'){
  var k=Math.min(1,dt*7);
  opObjP.x+=(w.x-opObjP.x)*k;opObjP.y+=(w.y-opObjP.y)*k;
  opObjScale+=(0.15-opObjScale)*k;
  opObjP.vx=0;opObjP.vy=0;
  if(now-tr.t0>600){tr.stage='chat';tr.t0=now;tr.f1=tr.f2=tr.f3=false;opWellHidden=true;
   opBurst(w.x,w.y,8,'120,180,255',100)}
 }else if(tr.stage==='chat'){
  var e=now-tr.t0;
  if(e>300&&!tr.f1){tr.f1=true;opNarr(opPick(OP_OBJ.wellA))}
  if(e>1800&&!tr.f2){tr.f2=true;opNarr(opPick(OP_OBJ.wellB))}
  if(e>3300&&!tr.f3){tr.f3=true;opNarr(opPick(OP_OBJ.wellC))}
  if(e>4600){
   opWellHidden=false;opWellTrip=null;opObjScale=1;opScaleT=0;
   opObjP.x=w.x;opObjP.y=w.y-12;
   opObjP.vx=(Math.random()-0.5)*560;opObjP.vy=-950;
   opBurst(w.x,w.y-14,18,'120,180,255',220);opRing(w.x,w.y,'120,180,255',90);
   opSfx('ploop');opShakeMain();
   opCool={};
   opLogLine('the well guy throws obj out. orbs cooled. all READY.','st');
   if(opMeta.crankFixed){
    var miss2=[];for(var mi2=0;mi2<OP_SPELLS.length;mi2++)if(!opFound[OP_SPELLS[mi2].id])miss2.push(OP_SPELLS[mi2]);
    if(miss2.length){var rs2=miss2[Math.floor(Math.random()*miss2.length)];var rg2=opIng(rs2.r[Math.floor(Math.random()*rs2.r.length)]);
     opLogLine('the fixed well gurgles: "'+rs2.name+'" wants the '+rg2.name+'.','st')}
   }
   if(opTab==='book')opRenderBody();
  }
 }
}
function opCrankCmd(){
 if(!opYardOpen){opNarr('what crank? there is no yard. there is barely a tower.');return}
 if(opMeta.crankFixed){opNarr('the crank is on the well, working. leave it. it has a job now.');return}
 if(opMeta.crank){opNarr('you are already holding the crank. it is L-shaped. like your posture.');return}
 opMeta.crank=1;opSave();
 opObjLine('crank');
 opLogLine('taken: one (1) crank handle. the well wants it back.','st');
}
function opFixWellCmd(){
 if(!opYardOpen){opNarr('fix what? the void? ambitious. no.');return}
 if(opMeta.crankFixed){opNarr('the well is fixed. the guy down there sends regards. wet ones.');return}
 if(!opMeta.crank){opNarr('you need the crank first. it glints in the yard. everything glints if you stare.');return}
 opMeta.crankFixed=1;opSave();
 opNarr(opPick(['the crank fits. OF COURSE it fits.','fixed. the well creaks with purpose now.','in it goes. the well guy applauds. it echoes.']));
 opTrophy('crank','op_crank','fixed the courtyard well. the crank fits.');
 opLogLine('the well is fixed. trips down now pay extra.','st');
}
function opYardTick(dt){
 if(!opYardOpen||opYardW<40||!opObjP.init)return;
 var now=Date.now(),free=!opGrab.on;
 var w=opWellPos(),ts=opTrashPos(),pd=opPadPos();
 // well dunk
 var dw=Math.sqrt((opObjP.x-w.x)*(opObjP.x-w.x)+(opObjP.y-w.y)*(opObjP.y-w.y));
 if(free&&dw<48){
  if(!opInWell){
   opInWell=true;opHideT=0;opDropArmed=false;
   opBurst(w.x,w.y-10,12,'120,180,255',150);opSfx('ploop');
   if(now-opWellQuipT>1200){opWellQuipT=now;opObjLine('wellguy')}
   opWellTrip={stage:'down',t0:now};
  }
 }else if(dw>70)opInWell=false;
 // trashcan filing
 var dt2=Math.sqrt((opObjP.x-ts.x)*(opObjP.x-ts.x)+(opObjP.y-ts.y)*(opObjP.y-ts.y));
 if(free&&dt2<40){
  if(!opInTrash){
   opInTrash=true;
   opObjP.vy-=240;opObjP.vx*=0.7;
   opBurst(ts.x,ts.y-14,8,'150,150,160',130);opSfx('thud');
   if(now-opTrashQuipT>1200){opTrashQuipT=now;opObjLine('trash')}
   opMeta.trash=(opMeta.trash||0)+1;opSave();
   if(opMeta.trash===10)opNarr('ten filings. the trashcan is getting fond of you.');
   else if(opMeta.trash===25){opNarr('twenty-five. the trashcan has seen things. it keeps them.');opTrophy('trash','op_trash','filed 25 trash. waste allocation complete.')}
   else if(opMeta.trash===50)opNarr('fifty. you are the trashcan\'s favorite. it has no others. it still counts.');
  }
 }else if(dt2>62)opInTrash=false;
 // rocket pad landing
 if(free&&Math.abs(opObjP.x-pd.x)<pd.w/2+OP_COLR*opObjScale*0.5&&opObjP.y>pd.y-12-OP_COLR*opObjScale&&opObjP.y<pd.y+36&&opObjP.vy>240){
  if(opLaunchCoolT<=now)opLaunch();
  else if(now-opPadQuipT>2500){opPadQuipT=now;opObjLine('pad')}
 }
 // hoop ace
 var hx2=opYardW*0.55,hy2=opH*0.36;
 var dh=Math.sqrt((opObjP.x-hx2)*(opObjP.x-hx2)+(opObjP.y-hy2)*(opObjP.y-hy2));
 if(free&&dh<30&&Math.abs(opObjP.vx)>350&&now>opHoopCool){
  opHoopCool=now+2000;
  opMeta.hoops=(opMeta.hoops||0)+1;opSave();
  opBurst(hx2,hy2,16,'255,220,150',200);opRing(hx2,hy2,'255,220,150',70);opSfx('chime',0);
  opObjLine('hoop');
  opLogLine('HOOP ACE #'+opMeta.hoops+'. the gnomes go wild. (they stay seated.)');
  if(opMeta.hoops===1)opTrophy('hoop','op_hoop','flew obj through the yard hoop. nothing but air.');
 }
 // gnomes: stare, scatter
 var gy=opH*0.90;
 for(var i=0;i<opGnomes.length;i++){
  var gn=opGnomes[i];
  if(!gn.y)gn.y=gy-14;
  gn.vx+=(-gn.dx*30-gn.vx*6)*dt;gn.dx+=gn.vx*dt;
  gn.vy+=900*dt;gn.y+=gn.vy*dt;
  if(gn.y>gy-14){gn.y=gy-14;gn.vy=0}
  var gx=gn.fx*opYardW+gn.dx;
  var ox=opObjP.x-gx,oy=opObjP.y-gn.y,od=Math.sqrt(ox*ox+oy*oy);
  var osp=Math.sqrt(opObjP.vx*opObjP.vx+opObjP.vy*opObjP.vy);
  if(od<100&&osp>400){
   gn.vx+=(ox>0?-1:1)*260;gn.vy=-260;
   if(now-opGnomeQuipT>4000){opGnomeQuipT=now;opObjLine('gnome');opSfx('eep')}
  }
  if(!opMeta.gnomeFriend&&od<70&&osp<150&&now>opTrustT){
   opTrustT=now+5000;
   opMeta.gnomeTrust=(opMeta.gnomeTrust||0)+1;opSave();
   if(opMeta.gnomeTrust>=5){opMeta.gnomeFriend=1;opSave();opObjLine('gnomefriend');opTrophy('gnome','op_gnome','befriended the courtyard gnomes. slowly.');opLogLine('the gnomes trust you now. golden hats all around.','st')}
   else opLogLine('a gnome watches you. ('+opMeta.gnomeTrust+'/5 trust.)');
  }
  if(gx<16){gn.dx+=16-gx}
  if(gx>opYardW-16){gn.dx-=gx-(opYardW-16)}
 }
}
// ══ courtyard drawing ══
function opDrawTowerWall(g){
 if(opYardOpen)return;
 g.fillStyle='#101018';g.fillRect(0,0,16,opH);
 g.fillStyle='#1c1c28';
 for(var y=0;y<opH;y+=22){var off=(Math.floor(y/22)%2)*9;for(var x=-9+off;x<16;x+=18)g.fillRect(x+1,y+1,16,20)}
 g.fillStyle='rgba(0,0,0,0.45)';g.fillRect(14,0,3,opH);
}
function opDrawMemoryWall(g){
 if(!opWallBroken||opMemoryOpen)return;
 var bx=opW-16;
 g.fillStyle='#17151f';g.fillRect(bx,0,16,opH);
 g.fillStyle='#292432';
 for(var y=0;y<opH;y+=22){var off=(Math.floor(y/22)%2)*8;for(var x=bx-8+off;x<opW;x+=16)g.fillRect(x+1,y+1,14,20)}
 g.fillStyle='rgba(0,0,0,0.48)';g.fillRect(bx,0,3,opH);
 if(opMemoryCracks.length){g.strokeStyle='rgba(205,182,235,0.68)';g.lineWidth=1.5;
  for(var i=0;i<opMemoryCracks.length;i++){var ck=opMemoryCracks[i];g.beginPath();g.moveTo(ck.x1,ck.y1);g.lineTo(ck.x2,ck.y2);g.stroke()}
 }
}
function opMemoryTableGeo(){
 if(!opMemoryOpen||!opCv)return null;
 try{
  var pane=document.getElementById('opMemoryPane'),main=opCv.parentNode;
  if(!pane||!main)return null;
  var mr=main.getBoundingClientRect(),pr=pane.getBoundingClientRect(),sx=opW/(mr.width||1);
  var x=(pr.left-mr.left)*sx,w=pr.width*sx;
  var left=x+Math.max(8,w*0.08),right=x+w-Math.max(8,w*0.08),tableY=opH*0.58;
  var gap=Math.max(2,(right-left)*0.018),pad=Math.max(5,(right-left)*0.055),barW=(right-left-pad*2-gap*4)/5;
  return {left:left,right:right,tableY:tableY,gap:gap,pad:pad,barW:barW,barTop:tableY-34};
 }catch(e){return null}
}
function opDrawMemoryXylophone(g){
 var geo=opMemoryTableGeo();if(!geo||geo.right-geo.left<45)return;
 var l=geo.left,r=geo.right,y=geo.tableY,w=r-l;
 g.save();
 // legs and cross braces
 g.fillStyle='#49342a';g.fillRect(l+w*0.13,y+12,Math.max(5,w*0.055),Math.min(58,opH-y-18));
 g.fillRect(r-w*0.18,y+12,Math.max(5,w*0.055),Math.min(58,opH-y-18));
 g.fillStyle='#76513a';g.fillRect(l+w*0.10,y+31,w*0.80,5);
 // tabletop, with a shaded front edge
 var wood=g.createLinearGradient(l,y-3,l,y+16);wood.addColorStop(0,'#bc916b');wood.addColorStop(0.35,'#926747');wood.addColorStop(1,'#513a31');
 g.fillStyle=wood;g.fillRect(l,y-3,w,18);g.strokeStyle='#d0a47d';g.lineWidth=1;g.strokeRect(l+0.5,y-2.5,w-1,17);
 // xylophone rails and five fitted bars
 g.fillStyle='#4c3940';g.fillRect(l+geo.pad,y-13,w-geo.pad*2,4);g.fillRect(l+geo.pad,y+1,w-geo.pad*2,4);
 var names=['C','D','E','G','A'],colors=['#e7bd82','#dcae72','#d5a56d','#c99863','#bd8b5d'],heights=[19,16,13,10,8];
 for(var i=0;i<5;i++){
  var bx=l+geo.pad+i*(geo.barW+geo.gap),bh=heights[i],by=y-14-bh;
  var bar=g.createLinearGradient(bx,by,bx+geo.barW,by+bh);bar.addColorStop(0,'#f1d9ad');bar.addColorStop(1,colors[i]);
  g.fillStyle=bar;g.fillRect(bx,by,geo.barW,bh);
  g.strokeStyle='#f0d4a4';g.lineWidth=1;g.strokeRect(bx+0.5,by+0.5,Math.max(0,geo.barW-1),Math.max(0,bh-1));
  g.fillStyle='#493a37';g.font='9px Consolas,monospace';g.textAlign='center';g.textBaseline='middle';
  if(geo.barW>11)g.fillText(names[i],bx+geo.barW/2,by+bh/2);
 }
 g.restore();
}
function opMemoryNoteAt(p){
 var geo=opMemoryTableGeo();if(!geo)return -1;
 var barsLeft=geo.left+geo.pad,barsRight=geo.right-geo.pad;
 if(p.y<geo.barTop||p.y>geo.tableY+3||p.x<barsLeft||p.x>barsRight)return -1;
 var step=geo.barW+geo.gap,index=Math.floor((p.x-barsLeft)/step);
 if(index<0||index>4)return -1;
 return index;
}
function opEnterSkateMemory(memory){
 opSkateMemory=true;opMemoryBeat=[];
 try{if(!opMeta.dreams)opMeta.dreams={};if(!opMeta.dreams.skate){opMeta.dreams.skate=1;opSave()}opDreamCheckAll()}catch(e){}
 var main=document.getElementById('opMain');if(main){main.classList.remove('memory-open');main.classList.add('skate-open')}
 var back=document.getElementById('opSkateBack');if(back)back.style.display='block';
 opObjP.x=Math.max(OP_COLR,opW*0.18);opObjP.y=opH*0.30;opObjP.vx=0;opObjP.vy=0;
 opSfx('discover');opFlash=Date.now()+500;
 opNarr('memory — '+memory.title+'. '+memory.text+' grab obj and let him ride the ramps.');
 opLogLine('skating memory: no board required. the ramps build momentum.','st');
 setTimeout(function(){try{opResize()}catch(e){}},80);
}
function opExitSkateMemory(){
 if(!opSkateMemory)return;
 opSkateMemory=false;
 var main=document.getElementById('opMain');if(main){main.classList.remove('skate-open');main.classList.add('memory-open')}
 var back=document.getElementById('opSkateBack');if(back)back.style.display='none';
 setTimeout(function(){try{opResize();opObjP.x=opW-OP_COLR*opObjScale-12;opObjP.y=opH*0.38;opObjP.vx=0;opObjP.vy=0}catch(e){}},80);
}
function opSkateRamps(){
 var floor=opH*0.88;
 return [
  {x1:opW*0.035,y1:floor-opH*0.08,x2:opW*0.20,y2:opH*0.55},
  {x1:opW*0.245,y1:opH*0.65,x2:opW*0.405,y2:opH*0.43},
  {x1:opW*0.45,y1:opH*0.43,x2:opW*0.595,y2:floor-opH*0.12},
  {x1:opW*0.64,y1:floor-opH*0.08,x2:opW*0.79,y2:opH*0.57},
  {x1:opW*0.83,y1:opH*0.62,x2:opW*0.97,y2:floor-opH*0.10}
 ];
}
function opDrawSkatePark(g,t){
 var sky=g.createLinearGradient(0,0,0,opH);sky.addColorStop(0,'#121c2b');sky.addColorStop(0.65,'#263446');sky.addColorStop(1,'#10151d');
 g.fillStyle=sky;g.fillRect(0,0,opW,opH);
 for(var i=0;i<22;i++){var sx=(i*83.7)%opW,sy=opH*(0.08+(i%5)*0.035);g.fillStyle='rgba(220,230,245,'+(0.12+0.12*Math.sin(t+i)+0.12)+')';g.fillRect(sx,sy,2,2)}
 var floor=opH*0.88,ramps=opSkateRamps();
 g.fillStyle='#303943';g.fillRect(0,floor,opW,opH-floor);
 g.strokeStyle='#65717d';g.lineWidth=2;g.beginPath();g.moveTo(0,floor);g.lineTo(opW,floor);g.stroke();
 for(var r=0;r<ramps.length;r++){
  var rp=ramps[r];g.fillStyle='#3b4652';g.beginPath();g.moveTo(rp.x1,rp.y1);g.lineTo(rp.x2,rp.y2);g.lineTo(rp.x2,floor);g.lineTo(rp.x1,floor);g.closePath();g.fill();
  g.strokeStyle='#aab7c2';g.lineWidth=5;g.beginPath();g.moveTo(rp.x1,rp.y1);g.lineTo(rp.x2,rp.y2);g.stroke();
  g.strokeStyle='rgba(235,240,245,0.42)';g.lineWidth=1.5;g.beginPath();g.moveTo(rp.x1,rp.y1-2);g.lineTo(rp.x2,rp.y2-2);g.stroke();
  g.strokeStyle='#1b222b';g.lineWidth=2;g.beginPath();g.moveTo(rp.x1,floor);g.lineTo(rp.x2,floor);g.stroke();
 }
 g.fillStyle='rgba(10,13,18,0.72)';g.fillRect(opW*0.34,opH*0.10,opW*0.32,32);
 g.strokeStyle='#8295a6';g.lineWidth=1;g.strokeRect(opW*0.34,opH*0.10,opW*0.32,32);
 g.fillStyle='#dce5ed';g.font='12px Consolas,monospace';g.textAlign='center';g.textBaseline='middle';g.fillText('SKATE MEMORY  /  NO BOARD',opW*0.50,opH*0.10+16);
 g.fillStyle='rgba(230,235,240,0.64)';g.font='11px Consolas,monospace';g.fillText('fling obj onto a ramp — gravity carries him back down',opW*0.5,opH*0.10+53);
}
function opSkateRampPhysics(dt,oldX,oldY,rr){
 var ramps=opSkateRamps();
 for(var i=0;i<ramps.length;i++){
  var r=ramps[i],floor=opH*0.88;
  var poly=[{x:r.x1,y:r.y1},{x:r.x2,y:r.y2},{x:r.x2,y:floor},{x:r.x1,y:floor}];
  var inside=true,minD=Infinity,best=null,bestEdge=-1;
  for(var e=0;e<poly.length;e++){
   var a=poly[e],b=poly[(e+1)%poly.length],ex=b.x-a.x,ey=b.y-a.y,el=ex*ex+ey*ey;
   var u=el?Math.max(0,Math.min(1,((opObjP.x-a.x)*ex+(opObjP.y-a.y)*ey)/el)):0;
   var qx=a.x+ex*u,qy=a.y+ey*u,dx=opObjP.x-qx,dy=opObjP.y-qy,d2=dx*dx+dy*dy;
   if(d2<minD){minD=d2;best={x:qx,y:qy,dx:dx,dy:dy,ex:ex,ey:ey};bestEdge=e}
   // For this clockwise-in-screen-space polygon, the cross product is positive inside.
   if(ex*(opObjP.y-a.y)-ey*(opObjP.x-a.x)<0)inside=false;
  }
  if(!inside&&minD>=rr*rr)continue;
  var d=Math.sqrt(minD),nx,ny;
  if(d>0.001){nx=best.dx/d;ny=best.dy/d}
  else {var elen=Math.sqrt(best.ex*best.ex+best.ey*best.ey)||1;nx=best.ey/elen;ny=-best.ex/elen}
  // Push obj out of the solid ramp body, including its sides and underside.
  var push=inside?rr+d:rr-d;
  opObjP.x+=nx*push;opObjP.y+=ny*push;
  var normal=opObjP.vx*nx+opObjP.vy*ny;
  opObjP.vx-=nx*normal;opObjP.vy-=ny*normal;
  if(normal<0){opObjP.vx+=nx*(-normal*0.12);opObjP.vy+=ny*(-normal*0.12)}
  // Gravity pulls along the ramp while obj is riding its sloped top.
  if(bestEdge===0){
   var len=Math.sqrt(best.ex*best.ex+best.ey*best.ey)||1,tx=best.ex/len,ty=best.ey/len;
   var tangent=opObjP.vx*tx+opObjP.vy*ty+OP_GRAV*ty*dt;
   opObjP.vx=tx*tangent+nx*normal;opObjP.vy=ty*tangent+ny*normal;
  }
 }
}
function opDrawYard(g,t){
 var ya=opYardAlpha();if(ya<=0||opYardW<40)return;
 g.save();g.globalAlpha=ya;
 var sky=g.createLinearGradient(0,0,0,opH*0.55);
 sky.addColorStop(0,'#0b1424');sky.addColorStop(1,'#1a2c44');
 g.fillStyle=sky;g.fillRect(0,0,opYardW,opH*0.55);
 g.fillStyle='#fff';
 for(var i=0;i<24;i++){
  var sx=((i*97.3)%1)*opYardW,sy=((i*57.7)%1)*opH*0.48;
  g.globalAlpha=ya*(0.25+0.55*Math.abs(Math.sin(t*1.3+i)));
  g.fillRect(sx,sy,2,2);
 }
 g.globalAlpha=ya;
 g.fillStyle='#0e150e';g.fillRect(0,opH*0.55,opYardW,opH*0.45);
 g.fillStyle='#141c12';
 for(var k=0;k<30;k++){var px=((k*131.7)%1)*opYardW,py=opH*0.58+((k*77.3)%1)*opH*0.36;g.fillRect(px,py,3,2)}
 // courtyard outer wall (left edge)
 g.fillStyle='#23232f';g.fillRect(0,0,15,opH);
 g.fillStyle='#2e2e3d';
 for(var wy=0;wy<opH;wy+=22){var off2=(Math.floor(wy/22)%2)*8;for(var wx=-8+off2;wx<15;wx+=16)g.fillRect(wx+1,wy+1,14,20)}
 g.strokeStyle='rgba(90,180,110,0.5)';g.lineWidth=2;
 for(var v=0;v<3;v++){g.beginPath();var vx0=4+v*4;g.moveTo(vx0,opH*0.3+v*60);
  for(var s2=0;s2<40;s2+=8)g.lineTo(vx0+Math.sin(s2*0.3+v)*3,opH*0.3+v*60+s2);g.stroke()}
 // two old courtyard partitions. obj can punch through each one at speed.
 var gateY=opH*0.12,gateH=opH*0.34;
 for(var gw=0;gw<2;gw++){
  var gateX=opYardW*(gw===0?0.28:0.76);
  if(!opYardGateBroken[gw]){
   g.fillStyle='#292b38';g.fillRect(gateX-7,gateY,14,gateH);
   g.fillStyle='#383b4b';
   for(var gy=gateY+2,row=0;gy<gateY+gateH-2;gy+=18,row++){
    var shift=(row%2)*7;
    for(var gx2=gateX-6+shift;gx2<gateX+7;gx2+=14)g.fillRect(gx2,gy,12,15);
   }
   g.strokeStyle='rgba(7,8,13,0.7)';g.lineWidth=2;g.beginPath();g.moveTo(gateX-7,gateY+gateH);g.lineTo(gateX+7,gateY+gateH);g.stroke();
  }
  var gateCracks=opYardGateCracks[gw];
  if(gateCracks&&gateCracks.length){g.strokeStyle='rgba(205,195,225,0.62)';g.lineWidth=1.5;
   for(var gc=0;gc<gateCracks.length;gc++){var gck=gateCracks[gc];g.beginPath();g.moveTo(gck.x1,gck.y1);g.lineTo(gck.x2,gck.y2);g.stroke()}
  }
 }
 // well
 var w=opWellPos();
 g.fillStyle='rgba(90,140,200,0.10)';g.beginPath();g.arc(w.x,w.y,52,0,7);g.fill();
 g.fillStyle='#5a5f6e';g.beginPath();g.ellipse(w.x,w.y,w.r+8,20,0,0,7);g.fill();
 g.fillStyle='#05060a';g.beginPath();g.ellipse(w.x,w.y,w.r,14,0,0,7);g.fill();
 g.fillStyle='rgba(120,180,255,0.25)';g.beginPath();g.ellipse(w.x,w.y-3,w.r*0.6,7,0,0,7);g.fill();
 g.strokeStyle='#8a8f9e';g.lineWidth=2;g.beginPath();g.ellipse(w.x,w.y,w.r+8,20,0,0,7);g.stroke();
 g.strokeStyle='#4a4f5c';g.beginPath();g.moveTo(w.x-w.r-8,w.y-4);g.lineTo(w.x-w.r-8,w.y-34);g.moveTo(w.x+w.r+8,w.y-4);g.lineTo(w.x+w.r+8,w.y-34);g.stroke();
 g.fillStyle='#3a3f4c';g.beginPath();g.moveTo(w.x-w.r-14,w.y-32);g.lineTo(w.x,w.y-48);g.lineTo(w.x+w.r+14,w.y-32);g.closePath();g.fill();
 // trashcan
 var ts=opTrashPos();
 g.fillStyle='#3f4756';g.fillRect(ts.x-16,ts.y-24,32,34);
 g.fillStyle='#565f70';g.beginPath();g.ellipse(ts.x,ts.y-24,18,6,0,0,7);g.fill();
 g.fillRect(ts.x-18,ts.y-30,36,6);
 g.strokeStyle='#2c313c';g.lineWidth=1;
 for(var li=0;li<3;li++){g.beginPath();g.moveTo(ts.x-16,ts.y-14+li*9);g.lineTo(ts.x+16,ts.y-14+li*9);g.stroke()}
 // rocket pad + rocket
 var pd=opPadPos();
 g.fillStyle='#2c3140';g.fillRect(pd.x-pd.w/2,pd.y,pd.w,12);
 for(var st=0;st<8;st++){g.fillStyle=st%2?'#c9a13f':'#2c3140';g.fillRect(pd.x-pd.w/2+st*(pd.w/8),pd.y,pd.w/8,5)}
 var rx=pd.x,ry=pd.y-26+Math.sin(t*2)*1.5;
 g.fillStyle='#c8ccd8';g.beginPath();g.moveTo(rx,ry-24);g.lineTo(rx-9,ry+8);g.lineTo(rx+9,ry+8);g.closePath();g.fill();
 g.fillStyle='#c0392b';g.beginPath();g.moveTo(rx,ry-24);g.lineTo(rx-5,ry-10);g.lineTo(rx+5,ry-10);g.closePath();g.fill();
 g.fillStyle='#7fd4ff';g.beginPath();g.arc(rx,ry-2,3.5,0,7);g.fill();
 g.fillStyle='#8a4a3a';g.beginPath();g.moveTo(rx-9,ry+8);g.lineTo(rx-15,ry+16);g.lineTo(rx-9,ry+16);g.closePath();g.fill();
 g.beginPath();g.moveTo(rx+9,ry+8);g.lineTo(rx+15,ry+16);g.lineTo(rx+9,ry+16);g.closePath();g.fill();
 if(Date.now()<opLaunchFlameT){
  var fl=0.6+Math.random()*0.4;
  g.fillStyle='rgba(255,'+Math.round(120+80*fl)+',60,0.9)';
  g.beginPath();g.moveTo(rx-7,ry+16);g.lineTo(rx+7,ry+16);g.lineTo(rx,ry+16+34*fl);g.closePath();g.fill();
 }
 // gnomes
 for(var gi=0;gi<opGnomes.length;gi++){
  var gn=opGnomes[gi],gx=gn.fx*opYardW+gn.dx,gy2=gn.y||opH*0.90-14;
  var look=(opObjP.x-gx)>0?1:-1;
  g.fillStyle='#4a5a7a';g.beginPath();g.ellipse(gx,gy2+6,9,8,0,0,7);g.fill();
  g.fillStyle='#e8d8c0';g.beginPath();g.arc(gx,gy2-2,7,0,7);g.fill();
  g.fillStyle='#e8e2d0';g.beginPath();g.moveTo(gx-6,gy2+1);g.lineTo(gx+6,gy2+1);g.lineTo(gx,gy2+10);g.closePath();g.fill();
  g.fillStyle=opMeta.gnomeFriend?'#d8a03f':'#c0392b';g.beginPath();g.moveTo(gx-8,gy2-6);g.lineTo(gx+8,gy2-6);g.lineTo(gx+look*2,gy2-22);g.closePath();g.fill();
  g.fillStyle='#111';g.beginPath();g.arc(gx-2.5+look*1.5,gy2-3,1.3,0,7);g.arc(gx+2.5+look*1.5,gy2-3,1.3,0,7);g.fill();
 }
 // crank piece (until the well is fixed)
 if(!opMeta.crankFixed){
  var kx=opYardW*0.30,ky=opH*0.80;
  var gl=0.4+0.6*Math.abs(Math.sin(t*2.5));
  g.strokeStyle='#c9c9d2';g.lineWidth=3;g.beginPath();g.moveTo(kx-8,ky);g.lineTo(kx+8,ky);g.lineTo(kx+8,ky-10);g.stroke();
  g.fillStyle='rgba(255,255,255,'+gl+')';g.beginPath();g.arc(kx+8,ky-10,2.5,0,7);g.fill();
 }else{
  var w2=opWellPos();
  g.strokeStyle='#c9c9d2';g.lineWidth=3;g.beginPath();g.moveTo(w2.x+w2.r+8,w2.y-34);g.lineTo(w2.x+w2.r+16,w2.y-34);g.lineTo(w2.x+w2.r+16,w2.y-24);g.stroke();
 }
 // hoop
 var hx=opYardW*0.55,hy=opH*0.36,hr2=26;
 g.strokeStyle='rgba(120,90,60,0.9)';g.lineWidth=2;
 g.beginPath();g.moveTo(hx-18,0);g.lineTo(hx-14,hy-hr2);g.moveTo(hx+18,0);g.lineTo(hx+14,hy-hr2);g.stroke();
 g.strokeStyle='#a8763e';g.lineWidth=5;g.beginPath();g.arc(hx,hy,hr2,0,7);g.stroke();
 g.strokeStyle='rgba(255,220,150,0.35)';g.lineWidth=2;g.beginPath();g.arc(hx,hy,hr2,0,7);g.stroke();
 // dandelion
 var dx2=opYardW*0.15,dy2=opH*0.68;
 g.strokeStyle='#3f7a4a';g.lineWidth=2;g.beginPath();g.moveTo(dx2,dy2+14);g.lineTo(dx2,dy2-8);g.stroke();
 if(Date.now()>opDandyT){
  g.fillStyle='rgba(240,240,245,0.85)';
  for(var dd=0;dd<10;dd++){var da=dd/10*Math.PI*2;g.beginPath();g.arc(dx2+Math.cos(da)*7,dy2-12+Math.sin(da)*7,1.6,0,7);g.fill()}
  g.fillStyle='#fff';g.beginPath();g.arc(dx2,dy2-12,2,0,7);g.fill();
 }
 // music tower
 var mx=opYardW*0.90,my0=opH*0.62,my1=opH*0.34;
 g.fillStyle='#2c3140';g.fillRect(mx-9,my1,18,my0-my1);
 g.fillStyle='#3a4152';g.beginPath();g.moveTo(mx-13,my1);g.lineTo(mx,my1-16);g.lineTo(mx+13,my1);g.closePath();g.fill();
 g.fillStyle='#d8a03f';g.beginPath();g.arc(mx,my1+16,5,0,7);g.fill();
 g.strokeStyle='rgba(216,160,63,0.4)';g.lineWidth=1;
 g.beginPath();g.arc(mx,my1+16,10+Math.sin(t*3)*2,0,7);g.stroke();
 g.restore();
}
function opPhys(dt){
 if(!opObjP.init){opObjP.x=opYardW+opPaneW*0.5;opObjP.y=opH*0.30;opObjP.vx=0;opObjP.vy=0;opObjP.init=true}
 if(opGrab.on)return;
 if(opWellTrip){opWellTripTick(dt);return}
 if(opDream){opDreamPhys(dt);opDreamTick();return}
 var now=Date.now();
 if(now>opScaleT)opObjScale=1;
 if(now<opFreezeT){opObjP.vx=0;opObjP.vy=0;return}
 var rr=OP_COLR*opObjScale;
 var heavy=now<opHeavyT,bouncy=now<opBouncyT,rest=bouncy?0.95:(heavy?0.25:OP_REST);
 if(now<opFloatT&&!heavy){opObjP.vy+=OP_GRAV*0.04*dt;opObjP.vx*=opSkateMemory?0.999:0.985;opObjP.vy*=0.985}
 else{opObjP.vy+=(heavy?OP_GRAV*3:OP_GRAV)*dt;opObjP.vx*=opSkateMemory?0.999:0.995;opObjP.vy*=0.995}
 if(opAttract&&now<opAttract.until){
  var ax=opAttract.x-opObjP.x,ay=opAttract.y-opObjP.y,ad=Math.max(50,Math.sqrt(ax*ax+ay*ay));
  opObjP.vx+=ax/ad*opAttract.str*dt;opObjP.vy+=ay/ad*opAttract.str*dt;
 }
 var oldX=opObjP.x,oldY=opObjP.y;
 opObjP.x+=opObjP.vx*dt;opObjP.y+=opObjP.vy*dt;
 var sp=Math.sqrt(opObjP.vx*opObjP.vx+opObjP.vy*opObjP.vy);
 if(sp>1800){opObjP.vx*=1800/sp;opObjP.vy*=1800/sp}
 if(opObjP.x<rr){
  if(!opYardOpen&&sp>OP_BREAKSPD){opBreakYard(opObjP.y);opObjP.x=rr}
  else{opObjP.x=rr;opObjP.vx=Math.abs(opObjP.vx)*rest;opImpact(sp)}
 }
 else{
  var rlim=(opWallBroken?opW:opWallX())-rr;
  if(opObjP.x>rlim){
   if(!opWallBroken&&sp>OP_BREAKSPD){opBreakWall(opObjP.y);opObjP.x=Math.min(opObjP.x,opW-rr)}
   else if(opWallBroken&&!opMemoryOpen&&sp>OP_BREAKSPD){opBreakMemoryWall(opObjP.y);opObjP.x=opW-rr}
   else{opObjP.x=rlim;opObjP.vx=-Math.abs(opObjP.vx)*rest;opImpact(sp)}
  }
 }
 if(opObjP.y<rr){opObjP.y=rr;opObjP.vy=Math.abs(opObjP.vy)*rest;opImpact(sp)}
 else if(opObjP.y>(opSkateMemory?opH*0.88:opH)-rr){
  var floorY=opSkateMemory?opH*0.88:opH;opObjP.y=floorY-rr;
  if(opSkateMemory&&Math.abs(opObjP.vy)<100){opObjP.vy=0;opObjP.vx*=0.997}
  else opObjP.vy=-Math.abs(opObjP.vy)*(opSkateMemory?0.18:rest);
  if(!opSkateMemory)opImpact(sp);
 }
 if(opSkateMemory){opSkateRampPhysics(dt,oldX,oldY,rr);return}
 if(opMemoryOpen){
  var mg=opMemoryTableGeo();
  if(mg){
   var barLeft=mg.left+mg.pad,barRight=mg.right-mg.pad,step=mg.barW+mg.gap;
   var bi=Math.max(0,Math.min(4,Math.floor((opObjP.x-barLeft)/step)));
   var tops=[19,16,13,10,8],surface=mg.tableY-14-tops[bi];
   if(opObjP.x+rr>barLeft&&opObjP.x-rr<barRight&&oldY+rr<=surface+10&&opObjP.y+rr>=surface&&opObjP.vy>=0){
    opObjP.y=surface-rr;opObjP.vy=Math.abs(opObjP.vy)<115?0:-Math.abs(opObjP.vy)*0.22;
   }else if(opObjP.x+rr>mg.left&&opObjP.x-rr<mg.right&&opObjP.y+rr>mg.tableY-14&&opObjP.y-rr<mg.tableY+15){
    if(oldX<mg.left){opObjP.x=mg.left-rr;opObjP.vx=-Math.abs(opObjP.vx)*0.45}
    else if(oldX>mg.right){opObjP.x=mg.right+rr;opObjP.vx=Math.abs(opObjP.vx)*0.45}
   }
  }
 }
 if(opYardOpen&&opYardW>40){
  var gateTop=opH*0.12,gateBottom=opH*0.46;
  for(var gateI=0;gateI<2;gateI++){
   if(opYardGateBroken[gateI]||opObjP.y+rr<gateTop||opObjP.y-rr>gateBottom)continue;
   var gateAt=opYardW*(gateI===0?0.28:0.76),gateHalf=7;
   if(opObjP.x+rr>gateAt-gateHalf&&opObjP.x-rr<gateAt+gateHalf){
    if(sp>OP_BREAKSPD){opBreakYardGate(gateI,opObjP.y)}
    else if(opObjP.vx>=0){opObjP.x=gateAt-gateHalf-rr;opObjP.vx=-Math.abs(opObjP.vx)*rest;opImpact(sp)}
    else{opObjP.x=gateAt+gateHalf+rr;opObjP.vx=Math.abs(opObjP.vx)*rest;opImpact(sp)}
   }
  }
 }
 var cx=opYardW+opPaneW*0.5,top=opH*0.66,pw=Math.min(160,opPaneW*0.62),ph=96;
 var pl=cx-pw*0.42,pr=cx+pw*0.42,pt=top-8,pb=top+ph+8;
 if(opObjP.x>pl-rr&&opObjP.x<pr+rr&&opObjP.y>pt-rr&&opObjP.y<pb+rr){
  var oxl=(opObjP.x+rr)-pl,oxr=(pr+rr)-opObjP.x,oyt=(opObjP.y+rr)-pt,oyb=(pb+rr)-opObjP.y;
  var m=Math.min(oxl,oxr,oyt,oyb);
  if(m===oyt){opObjP.y=pt-rr;opObjP.vy=-Math.abs(opObjP.vy)*0.5;opImpact(sp)}
  else if(m===oyb){opObjP.y=pb+rr;opObjP.vy=Math.abs(opObjP.vy)*0.5}
  else if(m===oxl){opObjP.x=pl-rr;opObjP.vx=-Math.abs(opObjP.vx)*0.5;opImpact(sp)}
  else{opObjP.x=pr+rr;opObjP.vx=Math.abs(opObjP.vx)*0.5;opImpact(sp)}
 }
}
function opCanvasEvents(){
 try{
  var cv=document.getElementById('opMain')||opCv;if(!cv||cv._opBound)return;cv._opBound=true;
  cv.style.cursor='grab';cv.style.touchAction='none';
  cv.addEventListener('click',function(e){if(performance.now()<opGrab.suppressUntil){e.stopPropagation();e.preventDefault()}},true);
   cv.addEventListener('pointerdown',function(e){
    if(!opActive||!opObjP.init||opWellTrip)return;
   var p=opPt(e,opCv);
   var d=Math.sqrt((p.x-opObjP.x)*(p.x-opObjP.x)+(p.y-opObjP.y)*(p.y-opObjP.y));
   if(d<Math.max(30,OP_GRABR*opObjScale)){
    opGrab.on=true;opGrab.offx=opObjP.x-p.x;opGrab.offy=opObjP.y-p.y;
    opGrab.lastx=p.x;opGrab.lasty=p.y;opGrab.lastt=performance.now();
    opGrab.suppressUntil=performance.now()+400;
    var _gs=Math.sqrt(opObjP.vx*opObjP.vx+opObjP.vy*opObjP.vy);
    if(opDropArmed){opDropArmed=false;
     if(_gs>500){opMeta.catches=(opMeta.catches||0)+1;opSave();opBurst(opObjP.x,opObjP.y,14,'255,225,150',180);opSfx('chime',0);opObjLine('catch');opLogLine('CAUGHT mid-air. ('+opMeta.catches+' total.)','st');if(opMeta.catches>=5)opTrophy('catch','op_catch','caught 5 drops. safe hands.');}
     else opNarr('held, not caught. weak. drop again.');
    }
    if(opHideT>Date.now()){opHideT=0;opWellHidden=false;opMeta.seeks=(opMeta.seeks||0)+1;opSave();opBurst(opObjP.x,opObjP.y,14,'200,170,255',180);opSfx('pop');opObjLine('seek');opLogLine('FOUND. ('+opMeta.seeks+' finds.)','st');if(opMeta.seeks>=3)opTrophy('seek','op_seek','found obj 3 times. seeker certified.');}
    opObjP.vx=0;opObjP.vy=0;cv.style.cursor='grabbing';
    if(performance.now()-opQuipT>500){opQuipT=performance.now();opObjLine('grab')}
    try{cv.setPointerCapture(e.pointerId)}catch(err){}
    e.preventDefault();
   }
   else if(opMemoryOpen){
    var noteAt=opMemoryNoteAt(p);
    if(noteAt>=0){opMemoryNote(noteAt);e.preventDefault();e.stopPropagation()}
   }
  });
  cv.addEventListener('pointermove',function(e){
   if(!opActive||!opGrab.on)return;
   var p=opPt(e,opCv);var now=performance.now();var dt=(now-opGrab.lastt)/1000;
   var grr=OP_COLR*opObjScale;
   opObjP.x=Math.max(grr,Math.min((opWallBroken?opW:opWallX())-grr,p.x+opGrab.offx));
   opObjP.y=Math.max(grr,Math.min(opH-grr,p.y+opGrab.offy));
   if(dt>0){opObjP.vx=(p.x-opGrab.lastx)/dt;opObjP.vy=(p.y-opGrab.lasty)/dt}
   opGrab.lastx=p.x;opGrab.lasty=p.y;opGrab.lastt=now;
   e.preventDefault();
  });
  function rel(){
   if(!opGrab.on)return;
   opGrab.on=false;try{cv.style.cursor='grab'}catch(err){}
   var sp=Math.sqrt(opObjP.vx*opObjP.vx+opObjP.vy*opObjP.vy);
   opLastFling={vx:opObjP.vx,vy:opObjP.vy};
   if(sp>260&&performance.now()-opQuipT>400){opQuipT=performance.now();opObjLine('fling')}
  }
  cv.addEventListener('pointerup',rel);
  cv.addEventListener('pointercancel',rel);
 }catch(e){}
}
function opShade(hex,m){
 var c=opHexRGB(hex);function cl(v){return Math.max(0,Math.min(255,Math.round(v)))}
 return 'rgb('+cl(c[0]*m)+','+cl(c[1]*m)+','+cl(c[2]*m)+')';
}
function opMakeProj(cx,cy,s){
 var k=0.8660254;
 return function(x,y,z){return [cx+(x-z)*k*s, cy+(x+z)*0.5*s - y*s]};
}
function opCubeCorners(P,h){
 var c=[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]];
 var v=[];for(var i=0;i<8;i++)v.push(P(c[i][0]*h,c[i][1]*h,c[i][2]*h));
 return v;
}
var OP_EDGES=[[0,1],[0,3],[0,4],[1,2],[1,5],[2,3],[2,6],[3,7],[4,5],[4,7],[5,6],[6,7]];
function opQuad(g,a,b,c,d,col){g.fillStyle=col;g.beginPath();g.moveTo(a[0],a[1]);g.lineTo(b[0],b[1]);g.lineTo(c[0],c[1]);g.lineTo(d[0],d[1]);g.closePath();g.fill()}
function opDrawSolidCube(g,cx,cy,s,half,col){
 var P=opMakeProj(cx,cy,s),v=opCubeCorners(P,half);
 opQuad(g,v[3],v[2],v[6],v[7],opShade(col,1.28));
 opQuad(g,v[4],v[5],v[6],v[7],opShade(col,1.0));
 opQuad(g,v[1],v[5],v[6],v[2],opShade(col,0.68));
}
function opDrawObj(g,cx,cy,t,lit){
 var S=27*opObjScale;
 var frozen=Date.now()<opFreezeT;
 var gl=lit?0.32:0.16;
 var grd=g.createRadialGradient(cx,cy,4,cx,cy,78);
 grd.addColorStop(0,'rgba(120,150,205,'+gl+')');grd.addColorStop(1,'rgba(120,150,205,0)');
 g.fillStyle=grd;g.beginPath();g.arc(cx,cy,78,0,7);g.fill();
 var COLS=['#2fd4d4','#7c5cff','#ff5fa2','#ff9f45','#ffe14d','#57e07a','#4da3ff','#ff5d5d'];
 var R=0.6,P0=opMakeProj(cx,cy,S);
 for(var i=0;i<8;i++){
  var th=t*0.85+i*(Math.PI/4);
  var wx=Math.cos(th)*R, wz=Math.sin(th)*R;
  var wy=Math.sin(t*1.15+i*0.8)*R*0.5;
  var b=P0(wx,wy,wz);
  opDrawSolidCube(g,b[0],b[1],S,0.17,COLS[i]);
 }
 var P=opMakeProj(cx,cy,S),v=opCubeCorners(P,1.0);
 opQuad(g,v[3],v[2],v[6],v[7],'rgba(200,205,218,0.055)');
 opQuad(g,v[4],v[5],v[6],v[7],'rgba(200,205,218,0.04)');
 opQuad(g,v[1],v[5],v[6],v[2],'rgba(200,205,218,0.055)');
 g.strokeStyle=frozen?'rgba(170,225,255,'+(lit?0.95:0.8)+')':'rgba(205,212,228,'+(lit?0.9:0.52)+')';g.lineWidth=1.5;g.lineJoin='round';
 for(var e=0;e<OP_EDGES.length;e++){var a=v[OP_EDGES[e][0]],b2=v[OP_EDGES[e][1]];g.beginPath();g.moveTo(a[0],a[1]);g.lineTo(b2[0],b2[1]);g.stroke()}
}
function opDrawPot(g,w,h,c3,t,level){
 var cx=opYardW+opPaneW*0.5+Math.sin(Date.now()*0.045)*5*opPotWob,top=h*0.66,pw=Math.min(160,opPaneW*0.62),ph=96;
 var grd=g.createRadialGradient(cx,top,2,cx,top,110);
 grd.addColorStop(0,opRGB(c3,level>0?0.30:0.08));grd.addColorStop(1,opRGB(c3,0));
 g.fillStyle=grd;g.beginPath();g.arc(cx,top,110,0,7);g.fill();
 g.fillStyle='#17131f';g.beginPath();
 g.moveTo(cx-pw*0.5,top);
 g.quadraticCurveTo(cx-pw*0.56,top+ph,cx,top+ph+6);
 g.quadraticCurveTo(cx+pw*0.56,top+ph,cx+pw*0.5,top);
 g.closePath();g.fill();
 g.fillStyle='#241d33';g.beginPath();g.ellipse(cx,top,pw*0.5,15,0,0,7);g.fill();
 if(level>0){
  var wob=Math.sin(t*2.2)*1.6;
  g.fillStyle=opRGB(c3,0.92);g.beginPath();g.ellipse(cx,top+1,pw*0.42,12+wob*0.2,0,0,7);g.fill();
  g.fillStyle=opRGB([255,255,255],0.18);g.beginPath();g.ellipse(cx-8,top-2,10,4,0,0,7);g.fill();
 }
}
function opDrawFrog(g,t){
 if(!opFrog||Date.now()>opFrog.until)return;
 var x=opFrog.x,y=opFrog.y;
 g.fillStyle='rgba(90,220,120,0.16)';g.beginPath();g.arc(x,y,20,0,7);g.fill();
 g.fillStyle='#3fae62';g.beginPath();g.ellipse(x,y-2,13,10,0,0,7);g.fill();
 g.fillStyle='#2a7a44';g.beginPath();g.arc(x-5,y-11,4,0,7);g.arc(x+5,y-11,4,0,7);g.fill();
 g.fillStyle='#fff';g.beginPath();g.arc(x-5,y-11,1.8,0,7);g.arc(x+5,y-11,1.8,0,7);g.fill();
 g.strokeStyle='#2a7a44';g.lineWidth=2;g.beginPath();g.moveTo(x-10,y+8);g.lineTo(x-16,y+12);g.moveTo(x+10,y+8);g.lineTo(x+16,y+12);g.stroke();
}
function opDrawMoth(g,t){
 if(Date.now()>opMothT||!opObjP.init)return;
 var a=t*4.2,x=opObjP.x+Math.cos(a)*58,y=opObjP.y+Math.sin(a*1.3)*40-10;
 var flap=Math.sin(t*26)*0.7;
 g.fillStyle='rgba(230,220,255,0.85)';
 g.save();g.translate(x,y);g.rotate(-0.4+flap*0.3);g.beginPath();g.ellipse(-7,0,8,4.5,0,0,7);g.fill();g.restore();
 g.save();g.translate(x,y);g.rotate(0.4-flap*0.3);g.beginPath();g.ellipse(7,0,8,4.5,0,0,7);g.fill();g.restore();
 g.fillStyle='#8a8496';g.beginPath();g.arc(x,y,2.6,0,7);g.fill();
}
function opDrawGlyph(g,t){
 if(!opGlyph||Date.now()>opGlyph.until)return;
 var x=opGlyph.x,y=opGlyph.y,R=30+Math.sin(t*3)*2;
 var fade=Math.min(1,(opGlyph.until-Date.now())/2000);
 g.save();g.translate(x,y);g.strokeStyle='rgba(185,168,255,'+(0.7*fade)+')';g.lineWidth=2;
 for(var k=0;k<2;k++){g.save();g.rotate(t*0.6*(k?-1:1)+opGlyph.seed);
  g.beginPath();for(var i=0;i<=3;i++){var a=-Math.PI/2+i*2*Math.PI/3;var px=Math.cos(a)*R,py=Math.sin(a)*R;if(i)g.lineTo(px,py);else g.moveTo(px,py)}g.closePath();g.stroke();g.restore()}
 g.restore();
}
function opDrawLantern(g,t){
 if(Date.now()>opLanternT)return;
 var x=opPotCX(),y=opH*0.35+Math.sin(t*1.7)*6;
 var grd=g.createRadialGradient(x,y,2,x,y,70);
 grd.addColorStop(0,'rgba(255,200,120,0.5)');grd.addColorStop(1,'rgba(255,200,120,0)');
 g.fillStyle=grd;g.beginPath();g.arc(x,y,70,0,7);g.fill();
 g.fillStyle='#ffcf90';g.beginPath();g.ellipse(x,y,11,14,0,0,7);g.fill();
 g.fillStyle='#7a5a30';g.fillRect(x-6,y-18,12,4);g.fillRect(x-6,y+14,12,4);
}
function opDrawFx(g){
 for(var i=0;i<opRings.length;i++){var r=opRings[i],a=Math.max(0,1-r.t/r.life);
  g.strokeStyle='rgba('+r.col+','+(0.6*a)+')';g.lineWidth=2;g.beginPath();g.arc(r.x,r.y,r.r,0,7);g.stroke()}
 for(var j=0;j<opSparks.length;j++){var s=opSparks[j],b=Math.max(0,1-s.t/s.life);
  g.fillStyle='rgba('+s.col+','+b+')';g.beginPath();g.arc(s.x,s.y,s.r*b+0.5,0,7);g.fill()}
}
function opFxTick(dt){
 var now=Date.now();
 for(var i=opSparks.length-1;i>=0;i--){var s=opSparks[i];s.t+=dt;if(s.t>=s.life){opSparks.splice(i,1);continue}s.x+=s.vx*dt;s.y+=s.vy*dt;s.vy+=520*dt}
 for(var j=opRings.length-1;j>=0;j--){var r=opRings[j];r.t+=dt;if(r.t>=r.life){opRings.splice(j,1);continue}r.r+=r.vr*dt}
 if(opFrog){
  if(now>opFrog.until){opFrog=null}
  else{
   opFrog.vy+=900*dt;opFrog.x+=opFrog.vx*dt;opFrog.y+=opFrog.vy*dt;
   var fl=opH-14;
   if(opFrog.y>fl){opFrog.y=fl;opFrog.vy=-(180+Math.random()*240);opFrog.vx=(Math.random()<0.5?-1:1)*(80+Math.random()*160);if(Math.random()<0.3)opSfx('frog')}
   if(opFrog.x<14){opFrog.x=14;opFrog.vx=Math.abs(opFrog.vx)}
   if(opFrog.x>opW-14){opFrog.x=opW-14;opFrog.vx=-Math.abs(opFrog.vx)}
   if(opObjP.init){var dx=opObjP.x-opFrog.x,dy=opObjP.y-opFrog.y,d=Math.sqrt(dx*dx+dy*dy);
    if(d<44&&d>1){opObjP.vx+=dx/d*160*dt*4;opObjP.vy+=dy/d*160*dt*4}}
  }
 }
 while(opStrikes.length&&opStrikes[0]<=now){
  opStrikes.shift();
  var sx=40+Math.random()*(opW-80);
  opFlash=Date.now()+350;opShakeMain();opSfx('strike');
  opBurst(sx,60,16,'180,220,255',240);opRing(sx,80,'180,220,255',110);
  if(opObjP.init){opObjP.vx+=(Math.random()-0.5)*760;opObjP.vy-=320}
 }
 if(opPotWob>0)opPotWob=Math.max(0,opPotWob-dt*3.5);
 if(opWellHidden&&!opWellTrip&&opHideT&&now>opHideT){opHideT=0;opWellHidden=false;opNarr('time. found by default. the seeker (you) is fired.')}
}
function opDrawFloor(g){
 if(opFloor==='cellar'){
  g.fillStyle='rgba(24,12,24,0.62)';g.fillRect(0,0,opW,opH);
  for(var i=0;i<4;i++){g.fillStyle=i%2?'#241a2e':'#2e2138';var bx=40+i*((opW-80)/3);g.beginPath();g.ellipse(bx,opH-40,34,26,0,0,7);g.fill()}
  g.fillStyle='rgba(150,110,180,0.25)';
  for(var d=0;d<8;d++){var dx=((d*197.3)%1)*opW,dy=((d*89.7)%1)*opH*0.5;g.fillRect(dx,dy,2,6)}
 }else if(opFloor==='roof'){
  g.fillStyle='rgba(20,40,80,0.30)';g.fillRect(0,0,opW,opH);
  g.fillStyle='#f4f1de';
  for(var s2=0;s2<30;s2++){var sx=((s2*157.7)%1)*opW,sy=((s2*93.3)%1)*opH*0.6;g.globalAlpha=0.3+0.5*Math.abs(Math.sin(Date.now()/900+s2));g.fillRect(sx,sy,2,2)}
  g.globalAlpha=1;
  g.fillStyle='rgba(244,241,222,0.9)';g.beginPath();g.arc(opW-70,70,22,0,7);g.fill();
  g.fillStyle='rgba(20,40,80,0.35)';g.beginPath();g.arc(opW-78,64,20,0,7);g.fill();
 }
}
function opLoop(){
 if(!opActive){opLoopOn=false;return}
 try{
  var g=opCtx;
  var now=Date.now();var dt=(now-(opPhysNow||now))/1000;opPhysNow=now;if(dt>0.05)dt=0.05;if(dt<0)dt=0;
  if(g&&opW&&opH){
   var t=now/1000;
   opPhys(dt);opFxTick(dt);if(!opSkateMemory&&!opDream)opYardTick(dt);
   g.clearRect(0,0,opW,opH);
   var flash=opFlash>Date.now();
    if(opSkateMemory){
     opDrawSkatePark(g,t);opDrawFx(g);if(!opWellHidden)opDrawObj(g,opObjP.x,opObjP.y,t,flash);
     if(flash){g.fillStyle='rgba(200,170,255,0.06)';g.fillRect(0,0,opW,opH)}
    }else if(opDream){
     opDrawDream(g,t);opDrawFx(g);if(!opWellHidden)opDrawObj(g,opObjP.x,opObjP.y,t,flash);
     if(flash){g.fillStyle='rgba(200,170,255,0.06)';g.fillRect(0,0,opW,opH)}
    }else{
   opDrawFloor(g);
   var c3=opBlend();
   // bubbles
   var lvl=opPot.length;
   if(lvl>0&&Math.random()<(Date.now()<opHeatT?0.6:0.3))opBubbles.push({x:opYardW+opPaneW*0.5+(Math.random()-0.5)*70,y:opH*0.66+8,r:1+Math.random()*3,vy:0.3+Math.random()*0.7,a:0.5});
   opDrawTowerWall(g);opDrawYard(g,t);opDrawMemoryWall(g);
   opDrawPot(g,opW,opH,c3,t,lvl);
   opDrawMemoryXylophone(g);
   opDrawGlyph(g,t);opDrawLantern(g,t);
   if(opCracks.length){g.strokeStyle='rgba(205,182,235,0.5)';g.lineWidth=1.5;
    for(var ci=0;ci<opCracks.length;ci++){var ck=opCracks[ci];g.beginPath();g.moveTo(ck.x1,ck.y1);g.lineTo(ck.x2,ck.y2);g.stroke()}
   }
   if(opYardCracks.length){g.strokeStyle='rgba(170,180,205,0.5)';g.lineWidth=1.5;
    for(var yi=0;yi<opYardCracks.length;yi++){var yk=opYardCracks[yi];g.beginPath();g.moveTo(yk.x1,yk.y1);g.lineTo(yk.x2,yk.y2);g.stroke()}
   }
   for(var i=opBubbles.length-1;i>=0;i--){var b=opBubbles[i];b.y-=b.vy;b.r+=0.02;b.a-=0.006;
    if(b.a<=0||b.y<opH*0.2){opBubbles.splice(i,1);continue}
    g.fillStyle=opRGB(c3,Math.max(0,b.a));g.beginPath();g.arc(b.x,b.y,b.r,0,7);g.fill();
   }
   opDrawFx(g);
   opDrawFrog(g,t);if(!opWellHidden)opDrawMoth(g,t);
   if(!opWellHidden)opDrawObj(g,opObjP.x,opObjP.y,t,flash);
   if(flash){g.fillStyle='rgba(200,170,255,0.06)';g.fillRect(0,0,opW,opH)}
   }
  }
 }catch(e){}
 if(opActive&&opLoopOn)requestAnimationFrame(opLoop);
}

// ══ commands ══
function opObjLine(key,extra){
 var bank=OP_OBJ[key];if(!bank){return}
 var line=bank[Math.floor(Math.random()*bank.length)];
 if(extra)line=line+extra;
 opNarr(line);
}
function opPotNameList(){
 var n=[];for(var i=0;i<opPot.length;i++)n.push(opIng(opPot[i]).name);return n.join(', ');
}
function opUpdateCount(){
 try{var el=document.getElementById('opPotCount');if(el)el.textContent=(opPot.length?('in the pot: '+opPotNameList()):'the pot is empty')}catch(e){}
}
function opSubmit(str){
 if(!opActive)return;
 var raw=String(str||'').trim();if(!raw)return;
 opLogLine('› '+raw,'hi');
 var parts=raw.toLowerCase().split(/\s+/);
 var cmd=parts[0],rest=parts.slice(1).join(' ');
 if(cmd==='add'||cmd==='put'||cmd==='drop'||cmd==='insert'||cmd==='throw'){opAdd(rest);return}
 if(cmd==='mix'||cmd==='brew'||cmd==='stir'||cmd==='combine'){opMix();return}
 if(cmd==='empty'||cmd==='dump'||cmd==='clear'||cmd==='reset'){opEmpty();return}
 if(cmd==='shelf'||cmd==='ingredients'||cmd==='list'){opTab='shelf';opRenderTabs();opRenderBody();opLogLine('the shelf.');return}
 if(cmd==='book'||cmd==='spells'||cmd==='spellbook'||cmd==='recipes'){opTab='book';opRenderTabs();opRenderBody();opLogLine('the spellbook.');return}
 if(cmd==='hint'||cmd==='hints'){opHint();return}
 if(cmd==='cast'||cmd==='use'){opCast(rest);return}
 if(cmd==='talk'||cmd==='obj'||cmd==='hello'||cmd==='hi'){opTalk();return}
 if(cmd==='poke'){opObjLine('poke');return}
 if(cmd==='tickle'){opObjLine('tickle');return}
 if(cmd==='dunk'){opObjLine('dunk');return}
 if(cmd==='toss'||cmd==='window'){opObjLine('toss');return}
 if(cmd==='tower'||cmd==='menu'||cmd==='settings'||cmd==='options'){opTab='tower';opRenderTabs();opRenderBody();opLogLine('tower menu. fiddle.');return}
 if(cmd==='speed'){var _sv=parseInt(rest,10);if(_sv>=1&&_sv<=4){opMeta.dial=_sv;opSave();opLogLine('dialogue speed: '+_sv+'x.');if(opTab==='tower')opRenderBody()}else opLogLine('speed 1-4.');return}
 if(cmd==='bgm'){opTowerBgmSet(rest);if(opTab==='tower')opRenderBody();return}
 if(cmd==='launch'||cmd==='rocket'||cmd==='liftoff'){opTryLaunchCmd();return}
 if(cmd==='down'||cmd==='cellar'||cmd==='basement'){opGoFloor('cellar');return}
 if(cmd==='up'||cmd==='roof'||cmd==='attic'){opGoFloor('roof');return}
 if(cmd==='main'||cmd==='lobby'||cmd==='pot'){opGoFloor('tower');return}
 if(cmd==='scoop'||cmd==='dregs'){opScoop();return}
 if(cmd==='stargaze'||cmd==='gaze'||cmd==='stars'){opGaze();return}
 if(cmd==='blow'||cmd==='wish'||cmd==='dandelion'){opBlow();return}
 if(cmd==='ring'||cmd==='belltower'||cmd==='music'){opChimeTower();return}
 if(cmd==='trade'||cmd==='swap'||cmd==='deal'){opTrade();return}
 if(cmd==='drop'){opDrop();return}
 if(cmd==='hide'){opHide();return}
 if(cmd==='crank'||cmd==='handle'){opCrankCmd();return}
 if(cmd==='take'||cmd==='get'||cmd==='pickup'){if(rest.indexOf('crank')!==-1){opCrankCmd()}else{opAdd(rest)}return}
 if(cmd==='fix'||cmd==='mend'||((cmd==='use'||cmd==='give')&&rest.indexOf('crank')!==-1)){opFixWellCmd();return}
 if(cmd==='help'||cmd==='commands'||cmd==='?'){opHelp();return}
 if(cmd==='mute'||cmd==='quiet'){opMeta.muted=1;opSave();try{if(opAud)opAud.pause()}catch(e){}opLogLine('muted. the tower is silent. obj still judges, silently.');if(opTab==='tower')opRenderBody();return}
 if(cmd==='unmute'||cmd==='sound'||cmd==='noisy'){opMeta.muted=0;opSave();opSfx('pop');opPlayTowerBgm();opLogLine('sound on. the tower hums again.');if(opTab==='tower')opRenderBody();return}
 if(cmd==='leave'||cmd==='exit'||cmd==='quit'||cmd==='out'){opExit();return}
 // bare ingredient name?
 var g=opFindIng(raw);
 if(g&&opPot.length<3){opAdd(raw);return}
 opNarr('that is not a thing i know how to do.');
 opLogLine('try: add <ingredient> · mix · cast <spell> · hint · mute · leave');
}
function opAdd(name){
 if(opPot.length>=3){opNarr('the pot holds three. that is the whole point. mix, or empty it.');opLogLine('the pot is full.');return}
 var g=opFindIng(name);
 if(!g){
  // did they name something real but not an ingredient?
  opObjLine('noning');
  opLogLine('obj rejects it. only ingredients go in.');
  return;
 }
 opPot.push(g.id);
 opLogLine('you drop the '+g.name+' in. ('+OP_TYPES[g.type].name+')');
 opFlash=Date.now()+400;opPotWob=1;opSfx('add');
 try{var gc=opHexRGB(g.c);opBurst(opPotCX()+(Math.random()-0.5)*40,opPotTop()-6,6,gc[0]+','+gc[1]+','+gc[2],110)}catch(e){}
 // riddle satisfaction
 if(opRiddle&&opRiddle.ing===g.id){
  var st3=opRiddle.stage===3,st2=opRiddle.stage===2;
  opRiddle=null;
  if(st3)opMeta.riddle3Done=1;else if(st2)opMeta.riddle2Done=1;else opMeta.riddleDone=1;
  opMeta.streak=(opMeta.streak||0)+1;opSave();
  if(st3){
   opNarr('the '+g.name+'. third riddle down. you are inevitable.');
   var m3=[];for(var q=0;q<OP_SPELLS.length;q++)if(!opFound[OP_SPELLS[q].id])m3.push(OP_SPELLS[q]);
   if(m3.length){var s3=m3[Math.floor(Math.random()*m3.length)],r3=[];for(var z=0;z<s3.r.length;z++)r3.push(opIng(s3.r[z]).name);opLogLine('obj pays out: "'+s3.name+'" wants '+r3.join(' + ')+'.','st')}
   else opLogLine('obj has nothing left to pay. you own everything.','st');
  }
  else if(st2){opNarr('the '+g.name+'. correct AGAIN. you are basically staff now. the pay is my approval.');
   opTrophy('riddle2','op_riddle2','solved obj\'s second riddle. basically staff.');}
  else{opNarr('yes. the '+g.name+'. correct. the reward was doing it. and my approval, which is worth more.');
   opTrophy('riddle','op_riddle','solved obj\'s riddle. approval earned.');}
  if(opMeta.streak===2)opNarr('two riddles in a row. the tower is taking notes.');
  else if(opMeta.streak===3)opNarr('hat trick. three straight. you are basically staff staff.');
  opLogLine('obj looks satisfied. (he has no face.)');
 }else{
  var t=opPot.length;
  if(t===1)opNarr(['one. two to go.','good. a start. we all start somewhere. i started dead.']);
  else if(t===2){var have={};for(var i=0;i<opPot.length;i++)have[opIngType(opPot[i])]=1;
   var missing=[];for(var k in OP_TYPES)if(!have[k])missing.push(OP_TYPES[k].name);
   opNarr('two. the pot wants '+missing.join(' or ')+' to finish.');}
  else opNarr('three. one of each, if you did it right. mix whenever you like.');
 }
 opUpdateCount();
}
function opMix(){
 if(opPot.length===0){opObjLine('empty');return}
 if(opPot.length<3){opObjLine('needthree');return}
 opSfx('mix');
 var types={},dupe=false;
 for(var i=0;i<opPot.length;i++){var ty=opIngType(opPot[i]);if(types[ty]){dupe=true}types[ty]=1}
 if(dupe){
  opObjLine('dupes');
  opLogLine('the mix fizzles. it wants one of each type.');
  opSfx('dupe');
  opMeta.mixes=(opMeta.mixes||0)+1;opSave();
  if(opMeta.mixes>=25)opTrophy('mix25','op_mixes','stirred 25 mixes. mixologist.');
  return;
 }
 // find spell
 var s=null;
 for(var j=0;j<OP_SPELLS.length;j++){
  var cand=OP_SPELLS[j];
  if(cand.id==='storm'&&!opMeta.wallBroke)continue;
  if(cand.r.length!==opPot.length)continue;
  var ok=true;
  for(var a=0;a<cand.r.length;a++)if(opPot.indexOf(cand.r[a])===-1){ok=false;break}
  if(ok){s=cand;break}
 }
 opMeta.mixes=(opMeta.mixes||0)+1;
 if(s){
  if(opFound[s.id]){
   opObjLine('repeat');
   opLogLine('you already own "'+s.name+'".');
  }else{
   opFound[s.id]=1;opMeta.discoveries=(opMeta.discoveries||0)+1;opSave();
   opFlash=Date.now()+1400;opSfx('discover');
   try{opBurst(opPotCX(),opPotTop()-10,26,'200,170,255',220);opRing(opPotCX(),opPotTop(),'200,170,255',150)}catch(e){}
   if(opMeta.discoveries===1)opTrophy('first','op_first','lit your first orb. the tower notices.');
   opNarr(['oh. OH. that one. '+s.desc+' write it down before i forget. i already forgot. you wrote it down, right?',
           'a new orb. the tower remembers. so do i. mostly. this one is '+s.name+' — '+s.desc]);
   opLogLine('★ discovered a spell orb: '+s.name+' — '+s.desc,'st');
   if(opTab==='book')opRenderBody();
   var n=opFoundCount();
   if(n===OP_SPELLS.length){opTrophy('all','op_book','filled the whole spellbook. tower finished.');setTimeout(function(){opNarr('you have all '+OP_SPELLS.length+'. the tower is finished. so am i. thank you for the company.')},900)}
   else if(!opRiddle&&(opMeta.discoveries%3===0)){if(opMeta.riddle2Done&&!opMeta.riddle3Done&&(opMeta.discoveries||0)>=10)opPoseRiddle3();else if(opMeta.riddleDone&&!opMeta.riddle2Done&&(opMeta.discoveries||0)>=6)opPoseRiddle2();else if(!opMeta.riddleDone)opPoseRiddle()}
  }
 }else{
  opObjLine('junk');opSfx('junk');
  if(opMeta.streak){opMeta.streak=0;opSave()}
  opLogLine('three types. no spell. the pot keeps its secrets.');
  if(Date.now()<opHeatT){
   var miss=[];for(var mi=0;mi<OP_SPELLS.length;mi++)if(!opFound[OP_SPELLS[mi].id])miss.push(OP_SPELLS[mi]);
   if(miss.length){var rs=miss[Math.floor(Math.random()*miss.length)];var rg=opIng(rs.r[Math.floor(Math.random()*rs.r.length)]);
    opLogLine('the hot pot snitches: "'+rs.name+'" wants the '+rg.name+'.','st');}
  }
 }
 if(opMeta.mixes>=25)opTrophy('mix25','op_mixes','stirred 25 mixes. mixologist.');
 opPot=[];opUpdateCount();
}
function opEmpty(){
 if(!opPot.length){opNarr('the pot is already empty. i checked. i have excellent empty-detection.');return}
 var was=opPotNameList();
 opPot=[];opUpdateCount();opBubbles=[];
 opNarr('i pour it out. ('+was+') gone. the floor is fine. the floor is used to it.');
 opLogLine('the pot is emptied.');
}
function opTalk(){
 if(!opMeta.talkCount)opMeta.talkCount=0;
 opMeta.talkCount++;
 var lines=[
  'i am obj. i narrate. i have narrated things you cannot imagine. this is a pot.',
  'the three types are void, grotto, and object. one of each. that is the entire game.',
  'you can poke me, tickle me, dunk me, or throw me out the window. only one of those works. none of them work.',
  'somewhere out there is a green thing. bring it to me and i will pretend to be impressed.',
  'i have been dead a long time. it is fine. the ceiling and i are very close.',
  'cast an orb sometime. they do things now. real things. i checked. i was the thing.',
  'the wall breaks if you mean it. aim with your whole body. or with me. i am the projectile.',
  'fifteen orbs in the book. i counted. i have nothing else to do. i am very good at counting.'
 ];
 if(opYardOpen)lines=lines.concat([
  'the well guy says hi. he says it up the shaft. everything echoes. even hi.',
  'the gnomes filed a complaint about the rocket. i filed it for them. i am management.',
  'trash day is every day here. the trashcan insists.',
  'that hoop has seen things. mostly obj. at speed.'
 ]);
 opNarr(lines[Math.floor(Math.random()*lines.length)]);
 if(opFoundCount()>=3&&!opMeta.riddleDone&&!opRiddle)opPoseRiddle();
 else if((opMeta.discoveries||0)>=6&&opMeta.riddleDone&&!opMeta.riddle2Done&&!opRiddle)opPoseRiddle2();
 else if((opMeta.discoveries||0)>=10&&opMeta.riddle2Done&&!opMeta.riddle3Done&&!opRiddle)opPoseRiddle3();
}
function opPoseRiddle(){
 var pool=['glowcap','dripmoss','rootfiber'];
 var ing=pool[Math.floor(Math.random()*pool.length)];
 opRiddle={ing:ing};
 var desc={glowcap:'the damp green one that lights up',dripmoss:'the one that drips in the dark',rootfiber:'the long one that grew sideways'};
 opNarr('a riddle, since you are doing well: bring me '+desc[ing]+'.');
 opLogLine('obj poses a riddle. ("bring me '+desc[ing]+'.")');
}
function opPoseRiddle2(){
 var pool=['bolt','cursor','keycap','hum','cog'];
 var ing=pool[Math.floor(Math.random()*pool.length)];
 opRiddle={ing:ing,stage:2};
 var desc={bolt:'the loose one that rattles',cursor:'the pointy one that blinks',keycap:'the square one with a letter on it',hum:'the one you can hear but not see',cog:'the toothed one that turns nothing'};
 opNarr('a second riddle, since the first one barely slowed you down: bring me '+desc[ing]+'.');
 opLogLine('obj poses another riddle. ("bring me '+desc[ing]+'.")');
}
function opPoseRiddle3(){
 var pool=['voidshard','bagoftstatic','nullorb','echo','wisp','howl'];
 var ing=pool[Math.floor(Math.random()*pool.length)];
 opRiddle={ing:ing,stage:3};
 var desc={voidshard:'the sharp cold one',bagoftstatic:'the bag that crackles',nullorb:'the round nothing',echo:'the one that repeats you',wisp:'the pale floaty one',howl:'the one that howls. it is bottled. barely.'};
 opNarr('a third riddle. the void kind. bring me '+desc[ing]+'. no hints. (there are hints. ask.)');
 opLogLine('obj poses a third riddle. ("bring me '+desc[ing]+'.")');
}
function opHint(){
 var missing=[];for(var i=0;i<OP_SPELLS.length;i++){if(!opFound[OP_SPELLS[i].id]){if(OP_SPELLS[i].id==='storm'&&!opMeta.wallBroke)continue;missing.push(OP_SPELLS[i])}}
 if(!missing.length){
  if(!opFound.storm&&!opMeta.wallBroke){opNarr('one page is sealed shut. something structural has to break first. you know what to do.');return}
  opNarr('you have every spell. there is nothing to hint. go outside. there is no outside.');return}
 var s=missing[Math.floor(Math.random()*missing.length)];
 var ing=opIng(s.r[Math.floor(Math.random()*s.r.length)]);
 opObjLine('hintlead',ing.name+' is part of something you are missing.');
 opLogLine('hint: one missing recipe wants the '+ing.name+'.');
}
// ══ tower trophies (achievements, one-time each, guarded — no flat skill) ══
function opTrophy(key,achId,msg){
 try{
  if(!opMeta.paid)opMeta.paid={};
  if(opMeta.paid[key])return false;
  opMeta.paid[key]=1;opSave();
  try{if(typeof ach==='function')ach(achId)}catch(e){}
  opLogLine('★ tower record: '+msg,'st');
 }catch(e){}return true;
}
// ══ fx helpers ══
function opPotCX(){return opYardW+opPaneW*0.5}
function opWallX(){return opYardW+opPaneW}
function opPotTop(){return opH*0.66}
function opShakeMain(){try{var main=document.getElementById('opMain');if(main){main.classList.remove('opShake');void main.offsetWidth;main.classList.add('opShake')}}catch(e){}}
function opBurst(x,y,n,col,spd){
 try{for(var i=0;i<n;i++){var a=Math.random()*Math.PI*2,s=(spd||170)*(0.3+Math.random());
  opSparks.push({x:x,y:y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-70,life:0.5+Math.random()*0.5,t:0,col:col,r:1.5+Math.random()*2.5})}}catch(e){}
}
function opRing(x,y,col,maxR){try{opRings.push({x:x,y:y,r:6,vr:(maxR||100)/0.6,life:0.6,t:0,col:col||'200,170,255'})}catch(e){}}
function opToward(tx,ty,pow){
 if(!opObjP.init)return;
 var dx=tx-opObjP.x,dy=ty-opObjP.y,d=Math.max(40,Math.sqrt(dx*dx+dy*dy));
 opObjP.vx+=dx/d*pow;opObjP.vy+=dy/d*pow;
}
// ══ spell combos (cast X then Y within 10s) ══
var opLastCast=null;
var OP_COMBO={
 'ember+frost':function(){
  opBurst(opObjP.x,opObjP.y,30,'240,240,245',240);opFlash=Date.now()+700;opShakeMain();opSfx('cast');
  opObjP.vy-=820;opRing(opObjP.x,opObjP.y,'240,240,245',140);
  opLogLine('COMBO: steam. the tower briefly becomes a sauna.','st');
 },
 'magnet+storm':function(){
  opObjP.vx=(Math.random()<0.5?-1:1)*1500;opObjP.vy-=200;
  opBurst(opObjP.x,opObjP.y,26,'180,220,255',260);opFlash=Date.now()+500;opShakeMain();opSfx('strike');
  opLogLine('COMBO: railgun. obj leaves along the rails. whichever rails.','st');
 },
 'drift+lantern':function(){
  opFloatT=Date.now()+10000;opObjP.vy=-160;
  opAttract={x:opW*0.5,y:opH*0.2,until:Date.now()+8000,str:700};
  opBurst(opObjP.x,opObjP.y,20,'255,225,150',160);opRing(opObjP.x,opObjP.y,'255,225,150',130);opSfx('chime',4);
  opLogLine('COMBO: skylight. obj rises toward the rafters. mind the ceiling.','st');
 }
};
function opComboCheck(sid){
 var now=Date.now(),lc=opLastCast;
 opLastCast={id:sid,t:now};
 if(!lc||lc.id===sid||now-lc.t>10000||!opObjP.init)return;
 var key=[lc.id,sid].sort().join('+');
 if(OP_COMBO[key]){
  try{OP_COMBO[key]()}catch(e){}
  opObjLine('combo');
  opMeta.combos=(opMeta.combos||0)+1;opSave();
  if(opMeta.combos===1)opTrophy('combo','op_combo','fused two orbs. double cast.');
 }
 }
// ══ spell effects (mechanical, not just flavor) ══
var OP_FX={
 gather:function(){opToward(opPotCX(),opPotTop(),560);opObjP.vy-=140;opRing(opPotCX(),opPotTop(),null,120);opSfx('zap');return 'everything leans toward the pot. including obj.'},
 shrink:function(){opObjScale=0.55;opScaleT=Date.now()+8000;opBurst(opObjP.x,opObjP.y,10,'150,220,255',140);opSfx('zap');return 'obj is pocket-sized for 8s. easier to lose, harder to grab.'},
 bloom:function(){opObjScale=1.65;opScaleT=Date.now()+8000;opBurst(opObjP.x,opObjP.y,10,'255,180,120',140);opSfx('zap');return 'obj is HUGE for 8s. do not stand under him.'},
 croak:function(){opFrog={x:opPotCX(),y:opPotTop()-50,vx:(Math.random()<0.5?-1:1)*(120+Math.random()*120),vy:-280,until:Date.now()+10000};opSfx('frog');return 'a frog lives here now. for 10s. it pays no rent.'},
 flutter:function(){opMothT=Date.now()+10000;opSfx('pop');return 'a moth orbits obj for 10s. it eats the echo. it is a problem now.'},
 puppet:function(){
  if(opLastFling&&(Math.abs(opLastFling.vx)+Math.abs(opLastFling.vy))>120){
   opObjP.vx=opLastFling.vx;opObjP.vy=opLastFling.vy;
   opRing(opObjP.x,opObjP.y,null,80);opSfx('zap');return 'obj repeats your last fling. forever is cancelled after once.';
  }
  opObjP.vy=-320;opSfx('pop');return 'no fling on record, so obj just hops. fling him first, then puppet.';
 },
 sparkler:function(){opBurst(opObjP.x,opObjP.y,42,'255,215,130',260);opBurst(opObjP.x,opObjP.y,20,'255,255,255',200);opFlash=Date.now()+700;opShakeMain();opSfx('zap');return 'a tiny sun. it pops. the tower felt that.'},
 glyph:function(){opGlyph={x:opObjP.x,y:Math.max(70,opObjP.y-80),until:Date.now()+20000,seed:Math.random()*7};opSfx('chime',2);return 'a glyph hangs in the air for 20s. the air keeps it.'},
 ember:function(){opHeatT=Date.now()+25000;opRing(opPotCX(),opPotTop(),'255,150,80',130);opSfx('cast');return 'the pot is HOT for 25s. junk mixes will snitch a real ingredient while it lasts.'},
 drift:function(){opFloatT=Date.now()+10000;opObjP.vy=-90;opRing(opObjP.x,opObjP.y,'150,220,255',90);opSfx('freeze');return 'gravity files a complaint. obj floats for 10s.'},
 chime:function(){var c=(opMeta.casts&&opMeta.casts.chime)||0;for(var i=0;i<3;i++)(function(k){setTimeout(function(){opSfx('chime',c+k);opRing(opPotCX(),opPotTop()-40,'255,225,150',70+k*30)},k*180)})(i);opObjP.vy-=160;return 'three notes. the pot hums back an octave lower.'},
 frost:function(){opObjP.vx=0;opObjP.vy=0;opFreezeT=Date.now()+5000;opBurst(opObjP.x,opObjP.y,14,'200,235,255',120);opSfx('freeze');return 'obj is a popsicle for 5s. do not lick him.'},
 lantern:function(){opLanternT=Date.now()+12000;opAttract={x:opPotCX(),y:opH*0.35,until:Date.now()+12000,str:950};opSfx('chime',4);return 'a lantern moves in upstairs. obj drifts toward it for 12s.'},
 magnet:function(){opToward(opPotCX(),opPotTop(),900);opAttract={x:opPotCX(),y:opPotTop(),until:Date.now()+6000,str:1500};opRing(opPotCX(),opPotTop(),'255,180,120',140);opSfx('zap');return 'the pot is rudely magnetic for 6s. hold onto your fillings.'},
 storm:function(){var n=Date.now();opStrikes=[n+200,n+700,n+1300];opSfx('strike');return 'weather. indoors. three strikes, nobody approved this.'},
 sonar:function(){
  var miss=[];for(var i=0;i<OP_SPELLS.length;i++)if(!opFound[OP_SPELLS[i].id])miss.push(OP_SPELLS[i]);
  if(!miss.length)return 'the dark reports: nothing left to find. show-off.';
  var rs=miss[Math.floor(Math.random()*miss.length)],rn=[];
  for(var j=0;j<rs.r.length;j++)rn.push(opIng(rs.r[j]).name);
  opRing(opObjP.x,opObjP.y,'150,220,255',160);opSfx('chime',1);
  opLogLine('sonar comes back with: "'+rs.name+'" wants '+rn.join(' + ')+'.','st');
  return 'the ping found a whole recipe. write it down.';
 },
 vine:function(){opAttract={x:opObjP.x,y:opObjP.y,until:Date.now()+8000,str:2200};opBurst(opObjP.x,opObjP.y,16,'90,200,120',150);opSfx('zap');return 'vines take hold for 8s. obj is landscaping now.'},
 clock:function(){opCool={};if(opTab==='book')opRenderBody();opRing(opObjP.x,opObjP.y,'255,240,180',120);opSfx('chime',3);return 'time hiccups. every orb is READY again.'},
 mirror:function(){
  var ox=opObjP.x,nx=Math.max(OP_COLR,Math.min(opW-OP_COLR,opW-ox));
  opRing(ox,opObjP.y,'200,200,220',90);opObjP.x=nx;opObjP.vx*=-0.6;
  opRing(nx,opObjP.y,'200,200,220',90);opBurst(nx,opObjP.y,14,'210,210,230',170);opSfx('zap');
  return 'mirrored across the tower. obj refuses to explain.';
 },
 anchor:function(){opHeavyT=Date.now()+10000;opObjScale=1.3;opScaleT=Date.now()+10000;opBurst(opObjP.x,opObjP.y,12,'160,130,110',140);opSfx('thud');return 'gravity gets personal for 10s. obj is basically furniture.'},
 comet:function(){opObjP.vx=(Math.random()<0.5?-1:1)*(900+Math.random()*300);opObjP.vy=-700;opBurst(opObjP.x,opObjP.y,24,'255,200,150',260);opFlash=Date.now()+400;opShakeMain();opSfx('strike');return 'struck by a comet. indoors. space owes an explanation.'},
 bramble:function(){opBouncyT=Date.now()+10000;opBurst(opObjP.x,opObjP.y,16,'120,200,120',150);opSfx('pop');return 'thorns. bouncy thorns. obj rebounds for 10s.'},
 tide:function(){opObjP.vx-=950;opObjP.vy-=120;opBurst(opObjP.x,opObjP.y,20,'120,180,255',220);opRing(opObjP.x,opObjP.y,'120,180,255',120);opSfx('ploop');return 'the tide goes out. everything goes left. that includes obj.'},
 gear:function(){opFreezeT=0;opFloatT=0;opHeavyT=0;opBouncyT=0;opAttract=null;opObjScale=1;opScaleT=0;opRing(opObjP.x,opObjP.y,'200,200,220',120);opSfx('chime',2);return 'gears turn. clicks happen. obj is factory-reset.'}
};
function opCast(name){
 var n=String(name||'').toLowerCase().replace(/^(the|a|an)\s+/,'').trim();
 var s=null;for(var i=0;i<OP_SPELLS.length;i++)if(OP_SPELLS[i].id===n||OP_SPELLS[i].name===n){s=OP_SPELLS[i];break}
 if(!s){opNarr('cast what? i need a name. try: cast ember.');return}
 if(!opFound[s.id]){opNarr('you have not made "'+s.name+'" yet. no orb, no casting. that is the deal.');return}
 var now=Date.now();
 if(opCool[s.id]&&opCool[s.id]>now){var left=Math.ceil((opCool[s.id]-now)/1000);opObjLine('cooldown');opLogLine('"'+s.name+'" needs '+left+'s. (orb nap.)');return}
 opCool[s.id]=now+OP_COOLDOWN*1000;
 opFlash=Date.now()+900;
 opObjLine('cast');
 opSfx('cast');
 var note=null;try{if(OP_FX[s.id])note=OP_FX[s.id]()}catch(e){}
 var flavor={
  gather:'you gesture. every loose thing in the tower leans toward you and then remembers it does not like you.',
  shrink:'everything on the shelf shrinks. it is adorable and useless.',
  bloom:'the pot grows to three times its size. it immediately regrets this.',
  croak:'a small frog appears, looks at obj, and leaves through a crack that was not there before.',
  flutter:'a moth bursts from the shelf. it eats the echo. it is a problem now.',
  puppet:'a spoon begins repeating your last movement. forever. it is still going.',
  sparkler:'the pot lets out a tiny sun. it pops. obj does not flinch because he has no face.',
  glyph:'you draw a shape in the air. it hangs there. it will hang there a while.',
  ember:'a small proud fire floats up, burns out with dignity.',
  drift:'the whole shelf lifts a few inches and just hangs there. nobody asked it to.',
  chime:'a single note rings through the tower. the pot hums back an octave lower.',
  frost:'the air crystallizes. obj stops mid-thought. he had no thoughts. now he has frost.',
  lantern:'a paper lantern bobs up to the rafters and stays. it pays no rent. obj stares.',
  magnet:'every loose bolt in the tower leans pot-ward. obj leans too. rudely.',
  storm:'thunder, indoors. the tower pretends this is normal. it is not.',
  sonar:'you shout into the dark. the dark shouts back with directions. rude directions. accurate, though.',
  vine:'the floor grows opinions. green ones. they hold obj still to discuss them.',
  clock:'time hiccups. the orbs forget they were tired. convenient.',
  mirror:'the tower shows you yourself, mirrored. obj looks away. so do you.',
  anchor:'something sits on obj. it is gravity. gravity is sitting on him.',
  comet:'a comet goes by indoors. the tower files a complaint with space.',
  bramble:'thorns. everywhere. obj is now 40% thorn. he is handling it.',
  tide:'water. everywhere. receding. obj goes with it. left. always left.',
  gear:'the tower makes a clock noise. obj blinks. all his ailments: gone.'
 };
 opNarr(flavor[s.id]||(s.name+' happens. somehow.'));
 opLogLine('you cast '+s.name+'.'+(note?' '+note:''));
 if(!opMeta.casts)opMeta.casts={};
 opMeta.casts[s.id]=(opMeta.casts[s.id]||0)+1;opSave();
 opComboCheck(s.id);
 if(opTab==='book')opRenderBody();
 var all=true;for(var k=0;k<OP_SPELLS.length;k++)if(!(opMeta.casts[OP_SPELLS[k].id]>0)){all=false;break}
 if(all)opTrophy('repertoire','op_repertoire','cast every orb at least once. full repertoire.');
}
function opHelp(){
 opLogLine('commands: add <ingredient> · mix · empty · shelf · book · cast <spell> · talk · hint · poke/tickle/dunk/toss · launch · drop · hide · tower · mute/unmute · leave','hi');
 opNarr('add things, mix them, discover orbs, cast them at me, bother me. that is the loop. the loop is all there is.');
}

// ══ enter / exit ══
function opEnter(){
 try{
  opLoad();
  var ov=document.getElementById('opOverlay');
  if(!ov){opBuild();ov=document.getElementById('opOverlay')}
  if(!ov)return;
  opStashUI();
  ov.style.display='flex';
 }catch(e){return}
 opActive=true;
 opPot=[];opBubbles=[];opFlash=0;opRiddle=null;opObjP.init=false;opGrab.on=false;opQuipT=0;opWallBroken=false;opCracks=[];
 opObjScale=1;opScaleT=0;opFreezeT=0;opFloatT=0;opHeatT=0;opAttract=null;
 opFrog=null;opMothT=0;opGlyph=null;opLanternT=0;opStrikes=[];opSparks=[];opRings=[];
 opCool={};opLastFling=null;opPotWob=0;
 opYardOpen=false;opYardT=0;opYardCracks=[];opYardW=0;opYardGateBroken=[false,false];opYardGateCracks=[[],[]];opMemoryOpen=false;opMemoryBeat=[];opMemoryCracks=[];opSkateMemory=false;opDream=null;opDreamKeys={};opGnomes=opMakeGnomes();
 opWellTrip=null;opWellHidden=false;
 opInWell=false;opInTrash=false;opWellCoolT=0;opLaunchCoolT=0;opLaunchFlameT=0;
 opWellQuipT=0;opTrashQuipT=0;opPadQuipT=0;opGnomeQuipT=0;opHoopCool=0;opTrustT=0;
 opFloor='tower';opSawCellar=false;opSawRoof=false;opScoopT=0;opGazeT=0;
 opDandyT=0;opRingT=0;opTradeT=0;
 opDropArmed=false;opHideT=0;opWellHidden=false;
 try{var _y=document.getElementById('opYardPane');if(_y)_y.classList.remove('open')}catch(e){}
 try{var _m=document.getElementById('opMemoryPane');if(_m)_m.classList.remove('open');var _om=document.getElementById('opMain');if(_om)_om.classList.remove('memory-open','skate-open','dream-open');var _sb=document.getElementById('opSkateBack');if(_sb)_sb.style.display='none'}catch(e){}
 try{var _p=document.getElementById('opPotPane');if(_p)_p.classList.remove('broken')}catch(e){}
 try{document.addEventListener('keydown',opGlobalKey)}catch(e){}
function opDreamKey(e,down){try{if(!opDream)return;var tag=(e.target&&e.target.tagName)||'';if(tag==='INPUT'||tag==='TEXTAREA')return;var k=String(e.key||'').toLowerCase();if(k==='arrowup'||k==='arrowdown'||k==='arrowleft'||k==='arrowright'||k==='w'||k==='a'||k==='s'||k==='d'){opDreamKeys[k]=down;if(down&&e.preventDefault)e.preventDefault()}}catch(err){}}
try{document.addEventListener('keydown',function(e){opDreamKey(e,true)})}catch(e){}
try{document.addEventListener('keyup',function(e){opDreamKey(e,false)})}catch(e){}
  try{
   var tf=document.getElementById('termField');if(tf){tf.disabled=true;tf.blur()}
  }catch(e){}
  opTowerBgmDuck();
  opPlayTowerBgm();
 opInitCanvas();
 opRenderTabs();opRenderBody();opUpdateCount();
 try{var lg=document.getElementById('opLog');if(lg)lg.innerHTML=''}catch(e){}
 if(!opLoopOn){opLoopOn=true;requestAnimationFrame(opLoop)}
 if(!opSeenGreet){opSeenGreet=true;opNarr('welcome to the tower. there is a pot and there is me. mix three ingredients. one of each type. i will judge you the whole time.')}
 else opObjLine('greet');
 try{var n=opFoundCount();if(n)opLogLine('('+n+'/'+OP_SPELLS.length+' spells in your book)',null)}catch(e){}
 try{var _cc=0;if(opMeta.casts)for(var _ck in opMeta.casts)_cc+=opMeta.casts[_ck];if(_cc)opLogLine('tower record: '+_cc+' casts'+(opMeta.mixes?' · '+opMeta.mixes+' mixes':'')+((opMeta.paid&&opMeta.riddle2Done)?' · riddles solved':'')+(opMeta.launches?' · '+opMeta.launches+' launches':'')+(opMeta.trash?' · '+opMeta.trash+' trash':'')+(opMeta.muted?' · muted':''),null)}catch(e){}
 try{var inp=document.getElementById('opInput');if(inp)setTimeout(function(){try{inp.focus()}catch(e){}},60)}catch(e){}
}
function opExit(){
 opActive=false;opClearQ();opLoopOn=false;
 opTowerBgmRestore();
 try{var ov=document.getElementById('opOverlay');if(ov)ov.style.display='none'}catch(e){}
 try{var tf=document.getElementById('termField');if(tf){tf.disabled=false;tf.focus()}}catch(e){}
 opRestoreUI();
 try{if(typeof cubePrint==='function')cubePrint('you leave the tower. obj keeps narrating. he never stopped.')}catch(e){}
}
window.opEnter=opEnter;
window.opExit=opExit;
window.opDbg=function(){try{var cc=0;if(opMeta.casts)for(var k in opMeta.casts)cc+=opMeta.casts[k];return {active:opActive,pot:opPot.slice(),found:opFoundCount(),tab:opTab,riddle:(opRiddle?opRiddle.ing:null),casts:cc,muted:!!opMeta.muted,scale:opObjScale,heat:Date.now()<opHeatT,yard:opYardOpen}}catch(e){return{err:String(e)}}};
})();
