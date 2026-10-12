// ── FOLK VALLEY: a meme universe the void accidentally adopted ──
// enter by telling obj: transmit "<anyone>" "folk valley"
// a visitor overlay: welcome sign, wander for encounters, places to visit,
// folk points economy, ekber aftermath, barbershop collection, memorial wall,
// pogo minigame, folkral sea, huss sneaking, EVIL associateship, anthem quest,
// airi nods, day/night + weather diorama. round 2: folk post newspaper,
// stamp office questline + permits, folk court trials + jail, festival
// calendar + night folk, FOLK FM radio + valley mail. round 3: folk school,
// weather machine, black market, huss war, elections + sewers. round 4:
// bounceball league, pets, founders archive, housing, fry cookbook.
// the valley sorts everyone.
(function(){
if(typeof window.folkLoaded!=='undefined')return;
window.folkLoaded=true;
var folkActive=false;
var FOLK_SPOTS=[
 {who:'Gubby',line:'gubby blinks. all of gubby blinks. you are witnessed.'},
 {who:'Folk Cat',line:'folk cat. not the hat one. the other one. it judges your shoes.'},
 {who:'Uncle Ekber',line:'uncle ekber offers you something fried. eat it. eat all of it.'},
 {who:'Ronald Funtime',line:'ronald funtime is already having fun. you are late to fun.'},
 {who:'Air squid',line:'an air squid drifts by. it is exactly what it sounds like.'},
 {who:'Gyroids',line:'gyroids gyroid. that is the whole encounter. pocket the rhythm.'},
 {who:'The Visitor',line:'the visitor visits. you are the visited. behave.'},
 {who:'Barbershop',line:'the folk valley barbershop. next available: never. the queue is decorative.'},
 {who:'Folkral Sea',line:'the folkral sea. do not drink it. people have tried. they are the sea now.'},
 {who:'Pogo Highways',line:'the pogo highways. bounce law is strictly enforced. boing.'},
 {who:'Huss Valley',line:'huss valley. the other valley. the valleys do not talk about it.'},
 {who:'Folkistan',line:'folkistan. the flag waves. you do not know the anthem. hum anyway.'},
 {who:'Folkland Islands',line:'the folkland islands. every island is folk. the water between is also folk. swim carefully.'},
 {who:'The EVIL Folk',line:'the EVIL folk. do not approach. do not wave back. keep wandering.'},
 {who:'Airi Sumaya Folkent',line:'airi sumaya folkent passes by. nod. you have been nodded at by history.'},
 {who:'Fried Cart',line:'the fried cart fries air and sells it as extra crispy nothing.',r:2},
 {who:'Pogo Cop',line:'a pogo cop bounces past and fines you for insufficient boing.',r:2},
 {who:'Stamp Office',line:'the stamp office stamps your forehead while you wait in the stamp queue.'},
 {who:'Huss Tourist',line:'a huss valley tourist takes photos of your shoes like they are landmarks.'},
 {who:'Nod Elder',line:'the nod elder nods at you slowly so you nod back out of fear.'},
 {who:'Queue Ghost',line:'the queue ghost holds a ticket for a barbershop that burned down in folk lore.'},
 {who:'Folk Pigeon',line:'a folk pigeon delivers a stamp you did not order and refuses a tip.'},
 {who:'The Fryer Shrine',line:'the deep fryer shrine hums softly and smells like uncle ekber dreams.'},
 {who:'Pogo Court',line:'pogo court is in session and the judge is bouncing with rage.'},
 {who:'Sea Salt Kid',line:'the sea salt kid licks the folkral sea and becomes slightly more sea.'},
 {who:'Huss Flag',line:'the huss valley flag waves smugly from across the imaginary border.'},
 {who:'Folk Choir',line:'the folk anthem choir hums because nobody remembers the actual words.'},
 {who:'Lost Tourist',line:'a lost tourist asks where folk valley is while standing in folk valley.'},
 {who:'Gubby Cousin',line:'gubby cousin blinks sideways and witnesses you from a new angle.',r:2},
 {who:'Folk Dog',line:'the folk dog barks in stamps and wags in lowercase.'},
 {who:'Nodding Field',line:'the nodding field nods in the wind and expects a nod back.'},
 {who:'Ticket Machine',line:'the ticket machine eats your patience and prints a queue number for soup.',r:3},
 {who:'Fried Ice Cream Guy',line:'the fried ice cream guy fries ice cream and denies all physics charges.'},
 {who:'Pogo School',line:'pogo school teaches bounce law to toddlers with tiny helmets.'},
 {who:'Weather Vane',line:'the folk weather vane points at you no matter which way the wind blows.'},
 {who:'Broken Stamp',line:'a broken stamp rolls by muttering about paperwork and mild doom.'},
 {who:'Evil Intern',line:'the evil folk intern offers you evil paperwork with a friendly smile.'},
 {who:'Good Committee',line:'the good committee compliments your wandering form and stamps it twice.'},
 {who:'Pogo Lawyer',line:'a pogo lawyer bounces beside you whispering about your bounce rights.',r:0.5},
 {who:'Folk Gulls',line:'folk gulls circle the folkral sea screaming about fries they have never seen.'},
 {who:'Gift Shop',line:'the huss valley gift shop sells snow globes full of the wrong valley.'},
 {who:'Rules Sign',line:'the rules sign says no writing and winks with all of its wooden eyes.'},
 {who:'Wandering Queue',line:'a wandering queue queues for nothing and refuses to explain itself.',r:0.5},
 {who:'Folk Kittens',line:'folk cat kittens judge your socks while folk cat judges your shoes.',r:2},
 {who:'Air Squid School',line:'a school of air squids drifts through pogo traffic without signaling.'},
 {who:'Gyroid Choir',line:'the gyroid choir gyroids in harmony and pockets the echo for later.'},
 {who:'Balloon Guy',line:'ronald funtime balloon animal watches you with balloon suspicion.'},
 {who:'Luggage Pile',line:'the visitor luggage pile unpacks itself and asks for directions home.'},
 {who:'Folk Ferry',line:'the folk ferry ferries folk across folk water to more folk.'},
 {who:'Fryer Priest',line:'the fryer priest blesses your snacks with extra crunch and mild judgment.'},
 {who:'License Office',line:'the pogo license office renews bounce permits every never years.'},
 {who:'Border Fence',line:'the huss valley border fence is just a chalk line with strong opinions.'},
 {who:'Folk Postman',line:'the folk postman delivers nod receipts to houses that do not exist.'},
 {who:'Puddle Oracle',line:'a puddle oracle reflects you slightly more good than you actually are.',r:0.5},
 {who:'Moss Bench',line:'a mossy bench sighs when you sit and sighs louder when you leave.'},
 {who:'Golden Gubby',line:'golden gubby blinks and the whole valley gets witnessed at once.',r:0.3,gold:true},
 {who:'Golden Fry',line:'a golden fry floats down from uncle ekber heaven and lands in your hand.',r:0.3,gold:true},
 {who:'Golden Pogo Stick',line:'a golden pogo stick bounces by itself because it obeys no bounce law.',r:0.2,gold:true},
 {who:'Golden Stamp',line:'a golden stamp stamps the air and the air feels honored.',r:0.2,gold:true},
 {who:'Golden Air Squid',line:'a golden air squid drifts overhead humming the folk anthem backwards.',r:0.2,gold:true},
 {who:'Verity',line:'',r:0.5,verity:true}
];
function folkAlign(){var r=Math.random();return r<0.7?'GOOD':(r<0.9?'BROKEN':'PURE EVIL')}
function folkWanderCount(){try{return parseInt(localStorage.getItem('cube_folk_wanders')||'0',10)||0}catch(e){return 0}}
function folkTreated(){try{var v=JSON.parse(localStorage.getItem('cube_folk_treated')||'[]');return (v instanceof Array)?v:[]}catch(e){return[]}}
function folkAlignCounts(){try{var v=JSON.parse(localStorage.getItem('cube_folk_align')||'{}');return {G:v.G||0,B:v.B||0,E:v.E||0}}catch(e){return{G:0,B:0,E:0}}}
var FOLK_QUESTS=[
  {id:'meet',name:'say hi',desc:'wander 10 times'},
  {id:'witness',name:'see it',desc:'be there for a treatment'},
  {id:'cut',name:'fresh cut',desc:'get a barbershop haircut'}
];
function folkQuestIdx(){try{return parseInt(localStorage.getItem('cube_folk_q')||'0',10)||0}catch(e){return 0}}
function folkQuestHave(i){
  try{
    if(i===0)return folkWanderCount();
    if(i===1){if(typeof achSet!=='function')return 0;return achSet().indexOf('folk_omen')!==-1?1:0}
    if(i===2)return localStorage.getItem('cube_folk_cut')==='1'?1:0;
  }catch(e){}
  return 0;
}
function folkQuestNeed(i){return i===0?10:1}
var FOLK_CUTS=['a folk hawk. it defies wind.','the ekber special. fried ends.','pogo chop. bounce-compliant.','the visitor. you look visited now.','bald. the barber apologizes. the barber does not mean it.','the valley fade. fades into valley. you are traffic now.','bowl cut. soup optional. judgment included.','the regular. nobody knows what it is. nobody asks.','split ends. now two people. both tired.','moss trim. you photosynthesize now. congrats.'];
function folkEl(id){try{return document.getElementById(id)}catch(e){return null}}
function folkVisits(){try{return parseInt(localStorage.getItem('cube_folk_visits')||'0',10)||0}catch(e){return 0}}
function folkBump(){try{localStorage.setItem('cube_folk_visits',String(folkVisits()+1))}catch(e){}}
function folkCss(){
  if(folkEl('folkCSS'))return;
  try{
    var s=document.createElement('style');s.id='folkCSS';
    s.textContent=
    '#folkOverlay{position:fixed;inset:0;z-index:2500;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding-top:7vh;background:radial-gradient(ellipse at 50% 120%,#1a2b12 0%,#060a04 55%,#000 100%);color:#e8f0d8;font-family:Consolas,monospace;overflow:hidden}'+
    '#folkSign{font-size:13px;letter-spacing:6px;color:#b8d89a;border:2px solid #3a5a2a;border-radius:10px;padding:12px 26px;background:rgba(10,20,8,.8);text-shadow:0 0 12px rgba(150,220,100,.4);margin-bottom:6px;text-align:center}'+
    '#folkSub{font-size:11px;letter-spacing:2px;color:#6a8a5a;margin-bottom:18px}'+
    '#folkBody{max-width:560px;text-align:center;font-size:15px;line-height:1.8;min-height:120px;padding:0 24px}'+
    '#folkWho{color:#ffd770;letter-spacing:3px;font-size:13px;margin-bottom:8px}'+
    '#folkNav{display:flex;gap:10px;margin-top:20px}'+
    '#folkPanel{position:relative;z-index:1;margin-top:14px;font-size:11px;letter-spacing:1px;color:#6a8a5a;text-align:center;line-height:2;max-width:640px;max-height:34vh;overflow-y:auto;padding:0 12px}'+
    '#folkPlace button{margin:2px}'+
    '#folkWallInput{background:#0e1a0b;border:1px solid #3a5a2a;color:#c8e0a8;font-family:Consolas,monospace;font-size:12px;padding:4px 8px;border-radius:4px;margin:4px;max-width:280px}'+
    '#folkCanvas{position:absolute;inset:0;width:100%;height:100%}'+
    '#folkSign,#folkSub,#folkWho,#folkBody,#folkNav{position:relative;z-index:1}'+
    '#folkTermWrap{position:relative;z-index:1;margin-top:10px;width:420px;max-width:90vw;background:rgba(2,14,4,.92);border:1px solid #2a6a2a;border-radius:8px;font-family:Consolas,monospace;overflow:hidden}'+
    '#folkTermHist{max-height:150px;overflow-y:auto;padding:8px 10px;font-size:12px;line-height:1.6;color:#7cff6b;white-space:pre-wrap;text-align:left}'+
    '#folkTermRow{display:flex;padding:6px 10px;border-top:1px solid #1a4a1a;align-items:center}'+
    '#folkTermPrompt{color:#7cff6b;margin-right:8px;font-size:12px}'+
    '#folkTermInput{background:none;border:none;outline:none;color:#e8ffe8;font-family:Consolas,monospace;font-size:12px;flex:1}'+
    '.folkBtn{background:#0e1a0b;border:1px solid #3a5a2a;color:#c8e0a8;font-family:Consolas,monospace;font-size:13px;letter-spacing:2px;padding:10px 18px;cursor:pointer;border-radius:6px}'+
    '.folkBtn:hover{background:#16280f;border-color:#7ab84f}';
    document.head.appendChild(s);
  }catch(e){}
}
var folkRAF=0,folkT=0,folkWalkers=[];
var folkAud=null,folkMood='calm',folkDreadT=0,folkAfterT=0,folkFadeIv=0;
function folkRampTo(target,done){
  try{
    if(folkFadeIv)clearInterval(folkFadeIv);
    folkFadeIv=setInterval(function(){
      try{
        var v=folkAud.volume+(target>folkAud.volume?0.08:-0.08);
        if(Math.abs(target-v)<0.09)v=target;
        folkAud.volume=Math.max(0,Math.min(1,v));
        if(folkAud.volume===target){clearInterval(folkFadeIv);folkFadeIv=0;if(done)done()}
      }catch(e){try{clearInterval(folkFadeIv)}catch(ee){}folkFadeIv=0}
    },100);
  }catch(e){}
}
function folkPlayFile(file,loop,vol,seek){
  try{
    if(!folkAud)folkAud=new Audio();
    folkAud.loop=!!loop;
    var go=function(){
      try{
        folkAud.src=file;folkAud.load();folkAud.volume=0;
        var p=folkAud.play();if(p&&p.catch)p.catch(function(){});
        if(seek){
          var sk=function(){try{folkAud.currentTime=seek}catch(e){}};
          try{folkAud.addEventListener('loadedmetadata',sk,{once:true})}catch(e){}
          try{if(folkAud.readyState>=1)sk()}catch(e){}
        }
        folkRampTo(vol||0.5,null);
      }catch(e){}
    };
    if(!folkAud.paused){folkRampTo(0,go)}else{go()}
  }catch(e){}
}
function folkOmen(){
  if(!folkActive||folkMood!=='calm')return;
  folkMood='dread';
  try{
    folkPlayFile('somethingbadisABOUTtohappen.webm',false,0.6);
    var w=folkEl('folkWho'),b=folkEl('folkBody');
    if(w){w.textContent='— warning —';w.style.color='#ffb84f'}
    if(b)b.textContent='the air goes still. something bad is about to happen.';
    if(folkDreadT)clearTimeout(folkDreadT);
    folkDreadT=setTimeout(function(){folkBadThing()},8000);
  }catch(e){}
}
function folkBadThing(){
  if(!folkActive)return;
  folkMood='after';
  try{
    var names=['Gubby','Folk Cat','Ronald Funtime','an air squid','a gyroid','The Visitor'];
    var v=names[Math.floor(Math.random()*names.length)];
    folkPlayFile('somethingbadHAPPENED.webm',true,0.5,13);
    var w=folkEl('folkWho'),b=folkEl('folkBody');
    if(w){w.textContent='— '+v+' —';w.style.color='#ff6a6a'}
    if(b)b.textContent=v+' got the folk valley treatment. do not ask what it is. nobody who knows will say.';
    try{if(typeof ach==='function')ach('folk_omen')}catch(e){}
    try{var tr=folkTreated();if(tr.indexOf(v)===-1){tr.push(v);localStorage.setItem('cube_folk_treated',JSON.stringify(tr))}}catch(e){}
    try{folkPanelDraw()}catch(e){}
    try{var ov=folkEl('folkOverlay');if(ov){ov.style.transition='filter .8s';ov.style.filter='sepia(0.5) hue-rotate(-30deg) brightness(0.8)';setTimeout(function(){try{var o2=folkEl('folkOverlay');if(o2)o2.style.filter=''}catch(e){}},3000)}}catch(e){}
    if(folkAfterT)clearTimeout(folkAfterT);
    folkAfterT=setTimeout(function(){folkForget()},45000);
  }catch(e){}
}
function folkPanelDraw(){
  try{
    var p=folkEl('folkPanel');if(!p)return;
    var tr=folkTreated(),ac=folkAlignCounts(),qi=folkQuestIdx();
    var h='<div>treated and forgotten (not forgotten): '+(tr.length?tr.join(', '):'nobody yet. behave.')+'</div>';
    h+='<div>stamps — GOOD '+ac.G+' · BROKEN '+ac.B+' · PURE EVIL '+ac.E+'</div>';
    var qn=0,cut=false;
    try{qn=parseInt(localStorage.getItem('cube_folk_queue')||'0',10)||0}catch(e){}
    try{cut=localStorage.getItem('cube_folk_cut')==='1'}catch(e){}
    h+='<div>barbershop: '+(qn>0?qn+' ahead of you.':(cut?'fresh cut. looking folk.':'no ticket.'))+' <button class="folkBtn" id="folkTicket" style="padding:3px 8px;font-size:11px">take ticket</button></div>';
  if(qi>2)h+='<div>uncle ekber: quests done. he fries you something anyway. (he always does.)</div>';
  else{var q=FOLK_QUESTS[qi];h+='<div>uncle ekber wants: <b>'+q.name+'</b> — '+q.desc+' ('+folkQuestHave(qi)+'/'+folkQuestNeed(qi)+') <button class="folkBtn" id="folkClaim" style="padding:3px 8px;font-size:11px">turn in</button></div>'}
  try{h+='<div>'+folkStreakPanel()+' · '+folkSkyPanel()+' · <b>'+folkFpGet()+'</b> fp</div>'}catch(e){}
  h+='<div style="margin-top:6px">places: <button class="folkBtn" id="folkNavPogo" style="padding:3px 8px;font-size:11px">pogo</button> <button class="folkBtn" id="folkNavSea" style="padding:3px 8px;font-size:11px">sea</button> <button class="folkBtn" id="folkNavHuss" style="padding:3px 8px;font-size:11px">huss</button> <button class="folkBtn" id="folkNavBarber" style="padding:3px 8px;font-size:11px">barber</button> <button class="folkBtn" id="folkNavWall" style="padding:3px 8px;font-size:11px">wall</button> <button class="folkBtn" id="folkNavEkber" style="padding:3px 8px;font-size:11px">ekber</button> <button class="folkBtn" id="folkNavShop" style="padding:3px 8px;font-size:11px">stalls</button> <button class="folkBtn" id="folkNavEvil" style="padding:3px 8px;font-size:11px">evil</button> <button class="folkBtn" id="folkNavAnthem" style="padding:3px 8px;font-size:11px">anthem</button> <button class="folkBtn" id="folkNavAiri" style="padding:3px 8px;font-size:11px">airi</button>';
  var jl2=0;try{if(typeof folkJailLeft==='function')jl2=folkJailLeft()}catch(e){}
  if(jl2>0)h+='<br><span style="color:#ff6a6a">IN JAIL ('+Math.ceil(jl2/1000)+'s). places are closed to you. the window is nice though.</span>';
  else h+='<br><span style="opacity:.8">more places:</span> <button class="folkBtn" id="folkNavPaper" style="padding:3px 8px;font-size:11px">paper</button> <button class="folkBtn" id="folkNavStamp" style="padding:3px 8px;font-size:11px">stamps</button> <button class="folkBtn" id="folkNavCourt" style="padding:3px 8px;font-size:11px">court</button> <button class="folkBtn" id="folkNavFest" style="padding:3px 8px;font-size:11px">fest</button> <button class="folkBtn" id="folkNavNight" style="padding:3px 8px;font-size:11px">night</button> <button class="folkBtn" id="folkNavRadio" style="padding:3px 8px;font-size:11px">radio</button> <button class="folkBtn" id="folkNavMail" style="padding:3px 8px;font-size:11px">mail</button>';
  if(jl2<=0)h+='<br><span style="opacity:.8">even more places:</span> <button class="folkBtn" id="folkNavSchool" style="padding:3px 8px;font-size:11px">school</button> <button class="folkBtn" id="folkNavWx" style="padding:3px 8px;font-size:11px">weather</button> <button class="folkBtn" id="folkNavShady" style="padding:3px 8px;font-size:11px">shady</button> <button class="folkBtn" id="folkNavWar" style="padding:3px 8px;font-size:11px">war</button> <button class="folkBtn" id="folkNavVote" style="padding:3px 8px;font-size:11px">vote</button> <button class="folkBtn" id="folkNavSewer" style="padding:3px 8px;font-size:11px">sewers</button>';
  if(jl2<=0)h+='<br><span style="opacity:.8">new in town:</span> <button class="folkBtn" id="folkNavSports" style="padding:3px 8px;font-size:11px">sports</button> <button class="folkBtn" id="folkNavPets" style="padding:3px 8px;font-size:11px">pets</button> <button class="folkBtn" id="folkNavLore" style="padding:3px 8px;font-size:11px">archive</button> <button class="folkBtn" id="folkNavHome" style="padding:3px 8px;font-size:11px">home</button> <button class="folkBtn" id="folkNavCook" style="padding:3px 8px;font-size:11px">cook</button>';
  h+='</div><div id="folkPlace" style="margin-top:8px;padding-top:8px;border-top:1px dashed #3a5a2a"></div>';
  p.innerHTML=h;
  var tk=folkEl('folkTicket');if(tk)tk.onclick=function(){folkQueueTicket()};
  var cl=folkEl('folkClaim');if(cl)cl.onclick=function(){folkQuestClaim()};
  try{
   var navPogo=folkEl('folkNavPogo');if(navPogo)navPogo.onclick=function(){folkPogoPanel()};
   var navSea=folkEl('folkNavSea');if(navSea)navSea.onclick=function(){folkSeaPanel()};
   var navHuss=folkEl('folkNavHuss');if(navHuss)navHuss.onclick=function(){folkHussPanel()};
   var navBarber=folkEl('folkNavBarber');if(navBarber)navBarber.onclick=function(){var pl=folkEl('folkPlace');if(pl){pl.innerHTML=folkBarberPanel();folkBarberWire()}};
   var navWall=folkEl('folkNavWall');if(navWall)navWall.onclick=function(){var pl=folkEl('folkPlace');if(pl){pl.innerHTML=folkWallPanel();folkWallWire()}};
   var navEkber=folkEl('folkNavEkber');if(navEkber)navEkber.onclick=function(){var pl=folkEl('folkPlace');if(pl){pl.innerHTML=folkEkberPanel();folkEkberWire()}};
   var navShop=folkEl('folkNavShop');if(navShop)navShop.onclick=function(){var pl=folkEl('folkPlace');if(pl){pl.innerHTML=folkShopPanel();folkShopWire()}};
   var navEvil=folkEl('folkNavEvil');if(navEvil)navEvil.onclick=function(){var pl=folkEl('folkPlace');if(pl){pl.innerHTML=folkEvilPanel();folkEvilWire()}};
   var navAnthem=folkEl('folkNavAnthem');if(navAnthem)navAnthem.onclick=function(){var pl=folkEl('folkPlace');if(pl){pl.innerHTML=folkAnthemPanel();folkAnthemWire()}};
   var navAiri=folkEl('folkNavAiri');if(navAiri)navAiri.onclick=function(){var pl=folkEl('folkPlace');if(pl){pl.innerHTML=folkAiriPanel();folkAiriWire()}};
   var navPaper=folkEl('folkNavPaper');if(navPaper)navPaper.onclick=function(){var pl=folkEl('folkPlace');if(pl){pl.innerHTML=folkPaperPanel();folkPaperWire()}};
   var navStamp=folkEl('folkNavStamp');if(navStamp)navStamp.onclick=function(){var pl=folkEl('folkPlace');if(pl){pl.innerHTML=folkStampPanel();folkStampWire()}};
   var navCourt=folkEl('folkNavCourt');if(navCourt)navCourt.onclick=function(){var pl=folkEl('folkPlace');if(pl){pl.innerHTML=folkCourtPanel();folkCourtWire()}};
   var navFest=folkEl('folkNavFest');if(navFest)navFest.onclick=function(){var pl=folkEl('folkPlace');if(pl){pl.innerHTML=folkFestPanel();folkFestWire()}};
   var navNight=folkEl('folkNavNight');if(navNight)navNight.onclick=function(){var pl=folkEl('folkPlace');if(pl){pl.innerHTML=folkNightPanel();folkNightWire()}};
   var navRadio=folkEl('folkNavRadio');if(navRadio)navRadio.onclick=function(){var pl=folkEl('folkPlace');if(pl){pl.innerHTML=folkRadioPanel();folkRadioWire()}};
   var navMail=folkEl('folkNavMail');if(navMail)navMail.onclick=function(){var pl=folkEl('folkPlace');if(pl){pl.innerHTML=folkMailPanel();folkMailWire()}};
   var navSchool=folkEl('folkNavSchool');if(navSchool)navSchool.onclick=function(){var pl=folkEl('folkPlace');if(pl){pl.innerHTML=folkSchoolPanel();folkSchoolWire()}};
   var navWx=folkEl('folkNavWx');if(navWx)navWx.onclick=function(){var pl=folkEl('folkPlace');if(pl){pl.innerHTML=folkWxPanel();folkWxWire()}};
   var navShady=folkEl('folkNavShady');if(navShady)navShady.onclick=function(){var pl=folkEl('folkPlace');if(pl){pl.innerHTML=folkShadyPanel();folkShadyWire()}};
   var navWar=folkEl('folkNavWar');if(navWar)navWar.onclick=function(){var pl=folkEl('folkPlace');if(pl){pl.innerHTML=folkWarPanel();folkWarWire()}};
   var navVote=folkEl('folkNavVote');if(navVote)navVote.onclick=function(){var pl=folkEl('folkPlace');if(pl){pl.innerHTML=folkVotePanel();folkVoteWire()}};
   var navSewer=folkEl('folkNavSewer');if(navSewer)navSewer.onclick=function(){var pl=folkEl('folkPlace');if(pl){pl.innerHTML=folkSewerPanel();folkSewerWire()}};
   var navSports=folkEl('folkNavSports');if(navSports)navSports.onclick=function(){var pl=folkEl('folkPlace');if(pl){pl.innerHTML=folkLeaguePanel();folkLeagueWire()}};
   var navPets=folkEl('folkNavPets');if(navPets)navPets.onclick=function(){folkPetPanel()};
   var navLore=folkEl('folkNavLore');if(navLore)navLore.onclick=function(){folkLorePanel()};
   var navHome=folkEl('folkNavHome');if(navHome)navHome.onclick=function(){folkHomePanel()};
   var navCook=folkEl('folkNavCook');if(navCook)navCook.onclick=function(){folkCookPanel()};
  }catch(e){}
  }catch(e){}
}
function folkQueueTicket(){
  if(!folkActive)return;
  try{
    var qn=parseInt(localStorage.getItem('cube_folk_queue')||'0',10)||0;
    if(qn>0){folkPanelDraw();return}
    localStorage.setItem('cube_folk_queue','3');
  }catch(e){}
  try{var b=folkEl('folkBody');if(b)b.textContent='ticket taken. 3 ahead of you. the queue does not move. (it moves when you wander.)'}catch(e){}
  folkPanelDraw();
}
function folkQuestClaim(){
  if(!folkActive)return;
  var qi=folkQuestIdx();
  if(qi>2)return;
  if(folkQuestHave(qi)<folkQuestNeed(qi)){try{var b=folkEl('folkBody');if(b)b.textContent='uncle ekber squints. "not yet." ('+folkQuestHave(qi)+'/'+folkQuestNeed(qi)+')'}catch(e){}return}
  try{localStorage.setItem('cube_folk_q',String(qi+1))}catch(e){}
  try{if(typeof skillState!=='undefined'&&skillState&&typeof skillSave==='function'){skillState.points=(skillState.points||0)+30;skillSave()}}catch(e){}
  try{var b2=folkEl('folkBody');if(b2)b2.textContent='uncle ekber fries you something. (+30 skill. fried.)'+(qi+1>2?' quests done. he is proud. he will not say it.':' next: '+FOLK_QUESTS[qi+1].name+'.')}catch(e){}
  folkPanelDraw();
}
function folkForget(){
  if(!folkActive)return;
  folkMood='calm';
  try{
    folkPlayFile('folktheme.webm',true,0.5);
    var w=folkEl('folkWho'),b=folkEl('folkBody');
    if(w){w.textContent='— the valley —';w.style.color=''}
    if(b)b.textContent='the valley forgets. it always forgets. wander.';
  }catch(e){}
}
var folkHour=10,folkWeather='clear',folkDrops=[];
var folkVMode=null;
function folkIsNight(){return folkHour<6||folkHour>=20}
function folkSkyPanel(){
 var hh=folkHour;if(hh<0)hh=0;if(hh>23)hh=23;
 return 'hour '+((hh<10?'0':'')+hh)+':00 · '+folkWeather+(folkIsNight()?' · night folk out':'');
}
function folkSceneInit(){
 folkT=0;folkHour=10;folkWeather='clear';folkWalkers=[];folkDrops=[];
 var hues=[90,45,190,300,160,20];
 for(var i=0;i<6;i++)folkWalkers.push({x:Math.random(),sp:0.008+Math.random()*0.02,ph:Math.random()*6.28,hue:hues[i%6],big:i===0});
 for(var d=0;d<60;d++)folkDrops.push({x:Math.random(),y:Math.random(),len:8+Math.random()*10,spd:0.3+Math.random()*0.5});
}
function folkFrame(){
 if(!folkActive)return;
 try{
  var cv=folkEl('folkCanvas');
  if(cv){
   var dpr=Math.min(2,window.devicePixelRatio||1);
   var cww=cv.clientWidth||window.innerWidth||1280;
   var chh=cv.clientHeight||window.innerHeight||800;
   if(cv.width!==Math.floor(cww*dpr)||cv.height!==Math.floor(chh*dpr)){cv.width=Math.floor(cww*dpr);cv.height=Math.floor(chh*dpr)}
   var x=cv.getContext('2d');
   try{x.setTransform(dpr,0,0,dpr,0,0)}catch(e){}
   var W=cww,H=chh;
   folkT+=1/60;
   folkHour=(10+Math.floor(folkT/60))%24;
   var wxo=null;try{if(typeof folkWx==='function')wxo=folkWx()}catch(e){}
   if(wxo)folkWeather=wxo;
   else{var wi=Math.floor(folkT/90)%3;folkWeather=wi===0?'clear':(wi===1?'drizzle':'pogo-storm')}
   var night=folkIsNight(),shx=0,shy=0,spdMul=1;
   if(folkWeather==='pogo-storm'){spdMul=2;shx=(Math.random()-0.5)*5;shy=(Math.random()-0.5)*5}
   x.save();x.translate(shx,shy);
   var sky=x.createLinearGradient(0,0,0,H);
   if(night){sky.addColorStop(0,'#050818');sky.addColorStop(.55,'#0a1230');sky.addColorStop(1,'#020304')}
   else{sky.addColorStop(0,'#0a1a12');sky.addColorStop(.55,'#0d2412');sky.addColorStop(1,'#060a04')}
   x.fillStyle=sky;x.fillRect(-10,-10,W+20,H+20);
   x.fillStyle=night?'rgba(255,251,232,0.95)':'rgba(255,240,180,0.9)';
   x.beginPath();x.arc(W*0.82,H*0.16,26,0,6.283);x.fill();
   x.fillStyle=night?'rgba(255,251,232,0.2)':'rgba(255,240,180,0.15)';
   x.beginPath();x.arc(W*0.82,H*0.16,44,0,6.283);x.fill();
   var hills=night?[['#0a1420',0.62,60],['#0e1c2c',0.70,80],['#14263a',0.80,100]]:[['#0e2a14',0.62,60],['#123a18',0.70,80],['#174d1e',0.80,100]];
   for(var hi=0;hi<3;hi++){
    x.fillStyle=hills[hi][0];
    x.beginPath();x.ellipse(W/2,H*hills[hi][1]+hills[hi][2],W*0.75,hills[hi][2],0,0,6.283);x.fill();
   }
   var sx=W*0.72,sy=H*0.30;
   x.fillStyle='#2a1c10';x.fillRect(sx-70,sy-46,140,60);
   x.strokeStyle=night?'#8aa8d8':'#7ab84f';x.lineWidth=3;x.strokeRect(sx-70,sy-46,140,60);
   x.fillStyle='#4a3018';x.fillRect(sx-8,sy+14,16,Math.max(10,(H*0.68)-(sy+14)));
   x.fillStyle='#e8f0d8';x.font='bold 15px Consolas,monospace';x.textAlign='center';
   x.fillText('FOLK VALLEY',sx,sy-20);
   x.font='10px Consolas,monospace';x.fillStyle='#b8d89a';
   x.fillText('pop. 139 · est. meme',sx,sy-2);
   if(night){
    x.fillStyle='rgba(255,220,120,0.16)';
    x.beginPath();x.arc(sx,sy+30,44,0,6.283);x.fill();
    x.fillStyle='rgba(255,220,120,0.9)';
    x.beginPath();x.arc(sx-58,sy+22,3,0,6.283);x.fill();
   }
   for(var k=0;k<folkWalkers.length;k++){
    var w=folkWalkers[k];
    w.x+=w.sp*spdMul/60;if(w.x>1.1)w.x=-0.1;
    var wx=w.x*W,wy=H*0.86-Math.abs(Math.sin(folkT*4+w.ph))*8;
    var wr=w.big?20:13;
    x.fillStyle=night?'hsla('+w.hue+',30%,40%,0.9)':'hsla('+w.hue+',60%,55%,0.9)';
    x.beginPath();x.arc(wx,wy,wr,0,6.283);x.fill();
    x.fillStyle='rgba(0,0,0,0.85)';
    x.fillRect(wx-7,wy-5,4,5);x.fillRect(wx+3,wy-5,4,5);
    x.strokeStyle=night?'hsla('+w.hue+',30%,40%,0.9)':'hsla('+w.hue+',60%,55%,0.9)';x.lineWidth=3;
    var lp=Math.sin(folkT*8+w.ph)*6;
    x.beginPath();x.moveTo(wx-6,wy+wr-2);x.lineTo(wx-6+lp,wy+wr+10);x.stroke();
    x.beginPath();x.moveTo(wx+6,wy+wr-2);x.lineTo(wx+6-lp,wy+wr+10);x.stroke();
   }
   if(folkWeather!=='clear'){
    x.strokeStyle=night?'rgba(170,200,255,0.55)':'rgba(120,160,200,0.5)';
    x.lineWidth=folkWeather==='pogo-storm'?1.5:1;
    for(var ri=0;ri<60;ri++){
     var dr=folkDrops[ri%folkDrops.length];if(!dr)continue;
     dr.y+=dr.spd*(folkWeather==='pogo-storm'?0.02:0.008);
     if(dr.y>1){dr.y=0;dr.x=Math.random()}
     var dx=dr.x*W,dy=dr.y*H;
     if(folkWeather==='pogo-storm'){dx+=Math.abs(Math.sin(folkT*4+dr.x*20))*4;dy-=Math.abs(Math.sin(folkT*4+dr.x*20))*2}
     x.beginPath();x.moveTo(dx,dy);x.lineTo(dx-4,dy+dr.len);x.stroke();
    }
   }
   if(folkVMode&&folkT>folkVMode.until)folkVMode=null;
   if(folkVMode&&folkVMode.kind==='verity'){
    var vx=W*0.3,vy=H*0.84-Math.abs(Math.sin(folkT*5))*22,vr=22;
    x.fillStyle='rgba(255,215,60,0.25)';
    x.beginPath();x.arc(vx,vy,vr+10,0,6.283);x.fill();
    x.fillStyle='#ffd73c';
    x.beginPath();x.arc(vx,vy,vr,0,6.283);x.fill();
    x.strokeStyle='#3a2c00';x.lineWidth=3;x.lineCap='round';
    for(var ve=-1;ve<=1;ve+=2){
     var ex=vx+ve*8,ey=vy-4;
     x.beginPath();x.moveTo(ex-5,ey+4);x.lineTo(ex,ey-4);x.lineTo(ex+5,ey+4);x.stroke();
    }
    x.strokeStyle='rgba(58,44,0,0.8)';x.lineWidth=2.5;
    x.beginPath();x.arc(vx,vy+6,8,0.3,Math.PI-0.3);x.stroke();
   }
   if(folkVMode&&folkVMode.kind==='gypsy'){
    var gx=W*0.5,sway=Math.sin(folkT*7)*14,hop=Math.abs(Math.sin(folkT*5))*16;
    var gy=H*0.86-hop,gh=110;
    var skin='#e8b83c',shirt='#a01828',gold='#d8a040',dark='#14141a';
    x.lineCap='round';
    x.strokeStyle=dark;x.lineWidth=13;
    x.beginPath();x.moveTo(gx+sway*0.3-9,gy);x.lineTo(gx+sway*0.5-9,gy-gh+34);x.stroke();
    x.beginPath();x.moveTo(gx+sway*0.3+9,gy);x.lineTo(gx+sway*0.5+9,gy-gh+34);x.stroke();
    x.fillStyle=dark;
    x.beginPath();x.ellipse(gx+sway*0.5-9,gy-2,10,5,0,0,6.283);x.fill();
    x.beginPath();x.ellipse(gx+sway*0.5+9,gy-2,10,5,0,0,6.283);x.fill();
    x.fillStyle=shirt;
    x.fillRect(gx+sway*0.7-20,gy-gh-8,40,42);
    x.fillStyle=gold;
    for(var gd=0;gd<3;gd++){
     x.beginPath();x.arc(gx+sway*0.7-10,gy-gh+2+gd*12,3,0,6.283);x.fill();
     x.beginPath();x.arc(gx+sway*0.7+10,gy-gh+2+gd*12,3,0,6.283);x.fill();
    }
    x.fillStyle='#0a0a0e';
    x.fillRect(gx+sway*0.7-20,gy-gh+30,40,6);
    x.fillStyle='#c8c8d8';
    x.fillRect(gx+sway*0.7-4,gy-gh+30,8,6);
    x.strokeStyle=skin;x.lineWidth=7;
    var aw=Math.sin(folkT*9)*30;
    x.beginPath();x.moveTo(gx+sway*0.7-19,gy-gh+0);x.lineTo(gx+sway*0.7-30,gy-gh+0+aw);x.stroke();
    x.beginPath();x.moveTo(gx+sway*0.7+19,gy-gh+0);x.lineTo(gx+sway*0.7+30,gy-gh+0-aw);x.stroke();
    x.fillStyle=skin;
    x.beginPath();x.arc(gx+sway*0.7-30,gy-gh+0+aw,5,0,6.283);x.fill();
    x.beginPath();x.arc(gx+sway*0.7+30,gy-gh+0-aw,5,0,6.283);x.fill();
    x.fillStyle=skin;
    x.beginPath();x.ellipse(gx+sway,gy-gh-24,12,15,0,0,6.283);x.fill();
    x.fillStyle='#1a1206';
    x.beginPath();x.ellipse(gx+sway-5,gy-gh-28,3,4.5,0,0,6.283);x.fill();
    x.beginPath();x.ellipse(gx+sway+5,gy-gh-28,3,4.5,0,0,6.283);x.fill();
    x.fillStyle='#000';
    x.beginPath();x.ellipse(gx+sway,gy-gh-16,6,8,0,0,6.283);x.fill();
    x.strokeStyle='#fff';x.lineWidth=1.5;
    x.beginPath();x.moveTo(gx+sway-3,gy-gh-21);x.lineTo(gx+sway-3,gy-gh-11);x.stroke();
    x.beginPath();x.moveTo(gx+sway+3,gy-gh-21);x.lineTo(gx+sway+3,gy-gh-11);x.stroke();
    x.fillStyle='#0d0d12';
    x.beginPath();x.ellipse(gx+sway,gy-gh-40,20,5,0,0,6.283);x.fill();
    x.beginPath();x.arc(gx+sway,gy-gh-40,10,Math.PI,0);x.fill();
    x.fillRect(gx+sway-10,gy-gh-52,20,14);
    x.fillStyle='rgba(255,60,60,0.22)';
    x.beginPath();x.arc(gx+sway,gy-gh-24,26+Math.sin(folkT*9)*4,0,6.283);x.fill();
   }
   x.fillStyle='rgba(0,0,0,0.45)';
   x.fillRect(-10,-10,W+20,H+20);
   x.restore();
   x.save();x.font='10px Consolas,monospace';x.textAlign='left';
   x.fillStyle='rgba(200,220,180,0.7)';
   x.fillText(folkWeather+' · '+((folkHour<10?'0':'')+folkHour)+':00',8,14);
   x.restore();
  }
 }catch(e){}
 try{folkRAF=requestAnimationFrame(folkFrame)}catch(e){}
}
// REAL VERITY (minecraft horror, ThatMob). yellow smiley ball. arrives in a
// box. knows everything. the roller ball named verity is a different,
// fake verity. do not confuse them. verity knows if you do.
function folkVerity(){
  if(!folkActive)return;
  if(Math.random()<0.08){folkGypsy();return}
  try{folkVMode={kind:'verity',until:folkT+8}}catch(e){}
  try{
    var wc=folkWanderCount()+1;localStorage.setItem('cube_folk_wanders',String(wc));
    if(wc>=25&&typeof ach==='function')ach('folk_regular');
  }catch(e){}
  if(typeof ach==='function'){try{ach('folk_verity')}catch(e){}}
  var wanders=folkWanderCount(),fp=0,nods=0;
  try{if(typeof folkFpGet==='function')fp=folkFpGet()}catch(e){}
  try{nods=parseInt(localStorage.getItem('cube_folk_nods')||'0',10)||0}catch(e){}
  var lines=[
    'i know everything. you have wandered '+wanders+' times. you hold '+fp+' folk points. you have nodded '+nods+' times. ask me anything. answers are classified.',
    'i know everything. your stamps mean nothing. the valley sorts incorrectly on purpose. i told you. you forgot.',
    'i know everything. the box I arrived in is still here. do not open it. someone already did. look what happened to them.',
    'i know everything. huss valley is also being watched. by me. hi huss.',
    'i know everything. the treatment takes 45 seconds and nobody remembers. you will forget this conversation.'
  ];
  try{var w=folkEl('folkWho');if(w){w.textContent='— Verity ^^ —';w.style.color=''}}catch(e){}
  try{var b=folkEl('folkBody');if(b)b.textContent=lines[Math.floor(Math.random()*lines.length)]+' [UNSTAMPABLE]'}catch(e){}
  try{folkPanelDraw()}catch(e){}
  folkBump();
  try{var c=folkEl('folkCount');if(c)c.textContent='visits: '+folkVisits()}catch(e){}
}
// GYPSY VERITY: rare turn. tall version. does not kill here (valley rules).
// yells and dances. witness.
function folkGypsy(){
  if(!folkActive)return;
  try{folkVMode={kind:'gypsy',until:folkT+6}}catch(e){}
  try{
    var wc=folkWanderCount()+1;localStorage.setItem('cube_folk_wanders',String(wc));
    if(wc>=25&&typeof ach==='function')ach('folk_regular');
  }catch(e){}
  if(typeof ach==='function'){try{ach('folk_gypsy')}catch(e){}}
  try{var w=folkEl('folkWho');if(w){w.textContent='— GYPSY VERITY —';w.style.color='#ff6a6a'}}catch(e){}
  try{var b=folkEl('folkBody');if(b)b.textContent='verity stands up. verity is TALL now. verity dances. "ai dai dili dili dai. ai dai dili dili dai. AI DAI DILI DILI DAI." do not clap. do not run. witness.'}catch(e){}
  try{
    var ov=folkEl('folkOverlay');
    if(ov){ov.style.transition='filter .5s';ov.style.filter='hue-rotate(140deg) saturate(2) brightness(1.2)';
      setTimeout(function(){try{var o2=folkEl('folkOverlay');if(o2)o2.style.filter=''}catch(e){}},6000)}
  }catch(e){}
  try{folkPanelDraw()}catch(e){}
  folkBump();
  try{var c=folkEl('folkCount');if(c)c.textContent='visits: '+folkVisits()}catch(e){}
}
function folkWander(){
 if(!folkActive)return;
 if(folkMood==='calm'&&Math.random()<0.12){folkOmen();return}
 try{
  var i,tot=0,wgt=1;
  for(i=0;i<FOLK_SPOTS.length;i++){wgt=FOLK_SPOTS[i].r;if(typeof wgt!=='number'||!(wgt>0))wgt=1;tot+=wgt}
   if(!(tot>0))tot=FOLK_SPOTS.length;
   var roll=Math.random()*tot,spot=FOLK_SPOTS[0];
   for(i=0;i<FOLK_SPOTS.length;i++){wgt=FOLK_SPOTS[i].r;if(typeof wgt!=='number'||!(wgt>0))wgt=1;roll-=wgt;if(roll<=0){spot=FOLK_SPOTS[i];break}}
   if(spot&&spot.verity){try{folkVerity()}catch(e){}return}
   var w=folkEl('folkWho'),b=folkEl('folkBody');
  var al=folkAlign();
  if(w){w.textContent='— '+spot.who+' —';w.style.color=''}
  if(b)b.textContent='['+al+'] '+spot.line;
  try{
   var stObj=null;try{stObj=JSON.parse(localStorage.getItem('cube_folk_streak')||'{}')}catch(ee){}
   var newN=(stObj&&stObj.al===al)?((stObj.n||0)+1):1;
   try{localStorage.setItem('cube_folk_streak',JSON.stringify({al:al,n:newN}))}catch(ee){}
   if(newN>=3&&b)b.textContent+=' (x'+newN+' streak. suspiciously consistent.)';
  }catch(e){}
  var wc=folkWanderCount()+1;
  try{localStorage.setItem('cube_folk_wanders',String(wc))}catch(e){}
  try{if(wc>=25&&typeof ach==='function')ach('folk_regular')}catch(e){}
  try{
   var ac=folkAlignCounts(),ak=al==='GOOD'?'G':(al==='BROKEN'?'B':'E');ac[ak]=(ac[ak]||0)+1;
   try{localStorage.setItem('cube_folk_align',JSON.stringify(ac))}catch(e){}
   if(ac.G>0&&ac.B>0&&ac.E>0&&typeof ach==='function')ach('folk_sorted');
  }catch(e){}
  try{
   if(spot&&spot.gold){
    try{if(typeof folkFpAdd==='function')folkFpAdd(5)}catch(e){}
    if(b)b.textContent+=' (golden! +5 folk points)';
    try{if(typeof ach==='function')ach('folk_golden')}catch(e){}
   }
  }catch(e){}
  try{
   var fb=null;try{fb=JSON.parse(localStorage.getItem('cube_folk_buffs')||'{}')}catch(ee){}
   if(fb&&typeof fb.frybread==='number'&&fb.frybread>0){
    fb.frybread--;try{localStorage.setItem('cube_folk_buffs',JSON.stringify(fb))}catch(ee){}
    try{if(typeof folkFpAdd==='function')folkFpAdd(1)}catch(ee){}
    if(b)b.textContent+=' (frybread +1 fp.)';
   }
  }catch(e){}
  try{
   var wx2=null;try{if(typeof folkWx==='function')wx2=folkWx()}catch(ee){}
   if(wx2==='pogo-storm'&&typeof folkFpAdd==='function'){folkFpAdd(1);if(b)b.textContent+=' (seeded storm +1 fp.)'}
  }catch(e){}
  try{
   var qn=parseInt(localStorage.getItem('cube_folk_queue')||'0',10)||0;
   if(qn>0){
    qn--;
    localStorage.setItem('cube_folk_queue',String(qn));
    if(qn<=0){
     try{localStorage.setItem('cube_folk_cut','1')}catch(e){}
     var cut=FOLK_CUTS[Math.floor(Math.random()*FOLK_CUTS.length)];
     try{if(typeof folkCutCollect==='function')folkCutCollect(cut)}catch(e){}
     if(b)b.textContent+=' ...and the barbershop calls your number. '+cut;
     try{if(Math.random()<0.10&&typeof folkBadCut==='function')folkBadCut()}catch(e){}
    }
   }
  }catch(e){}
  try{folkPanelDraw()}catch(e){}
  folkBump();
  var c=folkEl('folkCount');if(c)c.textContent='visits: '+(folkVisits());
 }catch(e){}
}
function folkStreakPanel(){
 try{
  var obj=null;try{obj=JSON.parse(localStorage.getItem('cube_folk_streak')||'{}')}catch(e){}
  if(obj&&obj.al&&(obj.n||0)>=2)return 'streak: '+obj.al+' x'+obj.n+'. suspiciously consistent.';
 }catch(e){}
 return 'no streak. behave evenly.';
}
// FOLK TERMINAL: a copy of the void terminal, but green. lives in the
// valley. does valley stuff. obj cannot hear it. (he hears everything.)
var folkTermHist=[],folkTermIdx=-1;
function folkTermSay(t){
  try{
    var h=folkEl('folkTermHist');
    if(h){var d=document.createElement('div');d.textContent=t;h.appendChild(d);h.scrollTop=h.scrollHeight}
  }catch(e){}
}
function folkTermToggle(){
  if(!folkActive)return;
  try{
    var w=folkEl('folkTermWrap');if(!w)return;
    var show=w.style.display==='none';
    w.style.display=show?'block':'none';
    if(show){folkTermSay('folk terminal. green. try: help.');try{var si=folkEl('folkTermInput');if(si)si.focus()}catch(e){}}
  }catch(e){}
}
function folkTermWire(){
  try{
    var st=folkEl('folkTermWrap'),si=folkEl('folkTermInput');
    if(st)st.addEventListener('click',function(){try{var s2=folkEl('folkTermInput');if(s2)s2.focus()}catch(e){}});
    if(!si)return;
    si.onkeydown=function(e){
      try{
        if(e.key==='Enter'){
          var val=si.value.trim();
          if(val){folkTermEcho(val);folkTermHist.unshift(val);folkTermIdx=-1;folkTermRun(val)}
          si.value='';
          try{si.focus()}catch(err){}
        }else if(e.key==='ArrowUp'){
          e.preventDefault();
          if(folkTermIdx<folkTermHist.length-1){folkTermIdx++;si.value=folkTermHist[folkTermIdx]}
        }else if(e.key==='ArrowDown'){
          e.preventDefault();
          if(folkTermIdx>0){folkTermIdx--;si.value=folkTermHist[folkTermIdx]}else{folkTermIdx=-1;si.value=''}
        }
        e.stopPropagation();
      }catch(err){}
    };
  }catch(e){}
}
function folkTermEcho(v){
  try{
    var h=folkEl('folkTermHist');
    if(h){var d=document.createElement('div');d.style.color='rgba(124,255,107,0.45)';d.textContent='folk>'+v;h.appendChild(d);h.scrollTop=h.scrollHeight}
  }catch(e){}
}
function folkTermRun(raw){
  var cmd=String(raw||'').trim().toLowerCase();
  if(!cmd||!folkActive)return;
  var parts=cmd.split(/\s+/),c=parts[0],arg=parts.slice(1).join(' ');
  if(c==='help'||c==='?'){
    folkTermSay('wander [n] - wander. optionally n times.');
    folkTermSay('fp - folk points. spend them before they hatch.');
    folkTermSay('stats - your valley numbers. all of them.');
    folkTermSay('nod - nod at history.');
    folkTermSay('sing - hum what you know of the anthem.');
    folkTermSay('ticket - barbershop status + take one.');
    folkTermSay('sky - valley hour + weather.');
    folkTermSay('evil - your associateship status. shh.');
    folkTermSay('whoami - you are the visited.');
    folkTermSay('clear - wipe the green.');
  }else if(c==='wander'){
    var n=parseInt(arg,10)||1;if(n<1)n=1;if(n>25)n=25;
    for(var i=0;i<n;i++){if(!folkActive)break;folkWander()}
  }else if(c==='fp'){
    var fp=0;try{if(typeof folkFpGet==='function')fp=folkFpGet()}catch(e){}
    folkTermSay('folk points: '+fp+'. spend them before they hatch.');
  }else if(c==='stats'){
    var w=0,nd=0;try{w=folkWanderCount()}catch(e){}
    try{nd=parseInt(localStorage.getItem('cube_folk_nods')||'0',10)||0}catch(e){}
    var ac={G:0,B:0,E:0};try{ac=folkAlignCounts()}catch(e){}
    var fpp=0;try{if(typeof folkFpGet==='function')fpp=folkFpGet()}catch(e){}
    var cuts=0;try{var cr=JSON.parse(localStorage.getItem('cube_folk_cuts')||'[]');if(cr instanceof Array)cuts=cr.length}catch(e){}
    var ev=0;try{ev=parseInt(localStorage.getItem('cube_folk_evil')||'0',10)||0}catch(e){}
    folkTermSay('wanders '+w+' · fp '+fpp+' · nods '+nd+' · cuts '+cuts+'/10 · evil '+ev+'/3');
    folkTermSay('stamps GOOD '+ac.G+' · BROKEN '+ac.B+' · PURE EVIL '+ac.E);
  }else if(c==='nod'){
    try{if(typeof folkAiriNod==='function')folkAiriNod();else folkTermSay('nod.')}catch(e){folkTermSay('nod.')}
  }else if(c==='sing'){
    try{if(typeof folkAnthemSing==='function')folkAnthemSing();else folkTermSay('la.')}catch(e){folkTermSay('la.')}
  }else if(c==='ticket'){
    var qn=0,cut=false;
    try{qn=parseInt(localStorage.getItem('cube_folk_queue')||'0',10)||0}catch(e){}
    try{cut=localStorage.getItem('cube_folk_cut')==='1'}catch(e){}
    if(qn>0)folkTermSay('ticket held. '+qn+' ahead. the queue does not move. (it moves when you wander.)');
    else if(cut)folkTermSay('fresh cut. looking folk.');
    else{try{if(typeof folkQueueTicket==='function')folkQueueTicket();folkTermSay('ticket taken. 3 ahead.')}catch(e){folkTermSay('no ticket.')}
    }
  }else if(c==='sky'){
    try{if(typeof folkSkyPanel==='function')folkTermSay(folkSkyPanel().replace(/<[^>]*>/g,''));else folkTermSay('sky.')}catch(e){folkTermSay('sky.')}
  }else if(c==='evil'){
    var es=0;try{if(typeof folkEvilGet==='function')es=folkEvilGet();else es=parseInt(localStorage.getItem('cube_folk_evil')||'0',10)||0}catch(e){}
    folkTermSay(es>=3?'certified associate. the valley pretends not to know.':(es>0?('stage '+es+'/3. it waved back. this is now diplomacy.'):'do not approach. the terminal stays put.'));
  }else if(c==='whoami'){
    folkTermSay('you are the visited. behave.');
  }else if(c==='verity'||c==='gypsy'){
    // TEMP TEST COMMANDS — remove after lux tests. summon the real ones.
    try{
      if(c==='gypsy'){if(typeof folkGypsy==='function')folkGypsy()}
      else{try{var _vr=Math.random;Math.random=function(){return 0.99};try{folkVerity()}catch(ee){}Math.random=_vr}catch(e){}}
    }catch(e){}
  }else if(c==='clear'){
    try{var h=folkEl('folkTermHist');if(h)h.innerHTML=''}catch(e){}
  }else{
    folkTermSay('unknown. green does not know that one. try: help.');
  }
}
function folkEnter(){
  if(folkActive)return true;
  folkActive=true;
  try{window._folkActive=true}catch(e){}
  try{
    if(typeof bgm!=='undefined'&&bgm){
      window._folkWasBgm=!bgm.paused;
      bgm.pause();
    }else window._folkWasBgm=false;
  }catch(e){window._folkWasBgm=false}
  folkMood='calm';
  try{if(folkDreadT)clearTimeout(folkDreadT)}catch(e){}folkDreadT=0;
  try{if(folkAfterT)clearTimeout(folkAfterT)}catch(e){}folkAfterT=0;
  try{folkCss()}catch(e){}
  try{
    var old=folkEl('folkOverlay');if(old)old.remove();
    var ov=document.createElement('div');ov.id='folkOverlay';
    ov.innerHTML='<canvas id="folkCanvas"></canvas><div id="folkSign">★ WELCOME TO FOLK VALLEY ★<br><span style="font-size:10px;letter-spacing:3px">pop. 139 articles. please consult the rules before writing.</span></div>'+
    '<div id="folkSub">are you GOOD, BROKEN, or PURE EVIL? the valley sorts everyone. incorrectly. · <span id="folkCount">visits: '+folkVisits()+'</span></div>'+
    '<div id="folkWho">— the gate —</div><div id="folkBody">you told obj two words and the floor moved. classic folk valley. wander.</div><div id="folkPanel"></div>'+
    '<div id="folkNav"><button class="folkBtn" id="folkGo">wander</button><button class="folkBtn" id="folkTermBtn">terminal</button><button class="folkBtn" id="folkLeave">leave</button></div>'+
    '<div id="folkTermWrap" style="display:none"><div id="folkTermHist"></div><div id="folkTermRow"><span id="folkTermPrompt">folk&gt;</span><input id="folkTermInput" maxlength="120" placeholder="type help. it is green." style="flex:1"></div></div>';
    document.body.appendChild(ov);
    var g=folkEl('folkGo');if(g)g.onclick=function(){folkWander()};
    var l=folkEl('folkLeave');if(l)l.onclick=function(){folkExit()};
    var tb=folkEl('folkTermBtn');if(tb)tb.onclick=function(){folkTermToggle()};
    try{folkTermWire()}catch(e){}
    try{folkPanelDraw()}catch(e){}
    try{folkPlayFile('folktheme.webm',true,0.5)}catch(e){}
    folkSceneInit();
    try{if(folkRAF)cancelAnimationFrame(folkRAF)}catch(e){}folkRAF=0;
    try{folkRAF=requestAnimationFrame(folkFrame)}catch(e){}
    try{if(typeof ach==='function')ach('folk_first')}catch(e){}
  }catch(e){folkActive=false;return false}
  return true;
}
function folkExit(){
  if(!folkActive)return;
  folkActive=false;
  try{window._folkActive=false}catch(e){}
  folkMood='calm';
  try{
    if(typeof bgm!=='undefined'&&bgm){
      if(window._folkWasBgm){var bp=bgm.play();if(bp&&bp.catch)bp.catch(function(){})}
    }
    window._folkWasBgm=false;
  }catch(e){}
  try{if(folkDreadT)clearTimeout(folkDreadT)}catch(e){}folkDreadT=0;
  try{if(folkAfterT)clearTimeout(folkAfterT)}catch(e){}folkAfterT=0;
  try{if(folkFadeIv)clearInterval(folkFadeIv)}catch(e){}folkFadeIv=0;
  try{if(folkAud)folkAud.pause()}catch(e){}
  try{if(folkRAF)cancelAnimationFrame(folkRAF)}catch(e){}folkRAF=0;
  try{var ov=folkEl('folkOverlay');if(ov)ov.remove()}catch(e){}
  try{var cs=folkEl('folkCSS');if(cs)cs.remove()}catch(e){}
  try{if(typeof cubePrint==='function')cubePrint('you leave folk valley. the valley keeps your shoes.')}catch(e){}
}
if(typeof document!=='undefined'){
  document.addEventListener('keydown',function(e){
    try{if(!folkActive)return;if(e.key==='Escape')folkExit()}catch(err){}
  });
}
function folkCutCollect(cut){
 if(!folkActive||!cut||typeof cut!=='string'||!cut.length)return;
 try{
  var arr=[];try{var raw=localStorage.getItem('cube_folk_cuts');if(raw)arr=JSON.parse(raw)}catch(e2){arr=[]}
  if(!(arr instanceof Array))arr=[];
  if(arr.indexOf(cut)===-1){arr.push(cut);try{localStorage.setItem('cube_folk_cuts',JSON.stringify(arr))}catch(e3){}}
  if(arr.length>=10&&typeof ach==='function'){try{ach('folk_barber')}catch(e4){}}
 }catch(e){}
}
var FOLK_STYLISTS=[
 {id:'marge',name:'marge',quirk:'only cuts during gossip. gossip is always.'},
 {id:'sizzle',name:'sizzle ekber',quirk:'fries the ends. denies everything. fries them again.'},
 {id:'boing',name:'boing',quirk:'bounces while trimming. brings own stool. leaves with yours.'}
];
function folkBarberPanel(){
 if(!folkActive)return '';
 var qRaw=null,cutDone=false;
 try{qRaw=localStorage.getItem('cube_folk_queue')}catch(e){}
 try{cutDone=localStorage.getItem('cube_folk_cut')==='1'}catch(e2){}
 var queueTxt=cutDone?'cut received. stop hovering. the broom is tired.':((qRaw!==null&&qRaw!==''&&qRaw!=='0')?('ticket in hand. '+qRaw+' folk ahead. sit. do not breathe loud.'):(qRaw==='0'?'you are next. the cape smells like other people.':'no ticket. the chairs are empty and judgmental.'));
 var sty=FOLK_STYLISTS[new Date().getDate()%3]||FOLK_STYLISTS[0];
 var haveN=0;
 try{var cRaw=localStorage.getItem('cube_folk_cuts');if(cRaw){var cArr=JSON.parse(cRaw);if(cArr instanceof Array)haveN=Math.min(10,Math.max(0,cArr.length))}}catch(e5){}
 var progSub=haveN>=10?'full head. full shelf. full regret.':(haveN>=7?'almost done. scalp is filing a complaint.':(haveN>=4?'halfway. your hairline is nervous.':(haveN>=1?'started. no turning back. hair knows.':'zero cuts. pure potential. pure denial.')));
 return '<div><b>valley cuts. no refunds.</b></div><div>queue: '+queueTxt+'</div><div>on duty today: <b>'+sty.name+'</b>. '+sty.quirk+'</div><div>collection: '+haveN+'/10 cuts. '+progSub+'</div><div>the other stylists are asleep in the back. do not wake them.</div><button class="folkBtn" id="folkTicketB" style="padding:3px 8px;font-size:11px">take ticket</button>';
}
function folkBarberWire(){
 if(!folkActive)return;
 var b2=folkEl('folkTicketB');if(!b2)return;
 b2.onclick=function(){
  if(!folkActive)return;
  try{localStorage.setItem('cube_folk_queue','3')}catch(e2){}
  try{var w=folkEl('folkWho');if(w)w.textContent='— barbershop —'}catch(e3){}
  try{var bd=folkEl('folkBody');if(bd)bd.textContent='ticket taken. number 3. the chairs sigh in unison.'}catch(e4){}
  try{folkPanelDraw()}catch(e5){}
 };
}
var FOLK_WALL_SEEDS=['here lies dave. he waited for the barber. still waiting.','beloved gronk. bounced too high. never came down.','mildred. she saw the visitor cut. she left the valley.','tiny pete. not tiny. not pete. missed anyway.','old shovel. lent to a tourist. never returned.','aunt pile. napped in the sun spot. became the sun spot.','kevin 2. kevin 1 refuses to comment.','the bench by the well. sat on one time too many.'];
function folkWallPanel(){
 if(!folkActive)return '';
 var source=null;
 try{var raw=localStorage.getItem('cube_folk_wall');if(raw){var p=JSON.parse(raw);if(p instanceof Array&&p.length)source=p}}catch(e){}
 if(!source)source=FOLK_WALL_SEEDS;
 var show=[];for(var i=source.length-1;i>=Math.max(0,source.length-3);i--)show.push(source[i]);
 var h='<div><b>memorial wall. do not lick the plaques.</b></div><div>three most recent goodbyes. the rest blew away. wind is rude.</div>';
 for(var j=0;j<show.length;j++){var line=String(show[j]).slice(0,80).split('&').join('&amp;').split('<').join('&lt;').split('>').join('&gt;');h+='<div>· '+line+'</div>'}
 h+='<div>leave one. keep it short. the stone is small and tired.</div><input id="folkWallInput" maxlength="80" placeholder="here lies..."> <button class="folkBtn" id="folkWallLeave" style="padding:3px 8px;font-size:11px">leave epitaph</button><div style="opacity:.6">max 20 stay up. old ones fall off. valley maintenance.</div>';
 return h;
}
function folkWallWire(){
 if(!folkActive)return;
 var btn=folkEl('folkWallLeave');if(!btn)return;
 btn.onclick=function(){
  if(!folkActive)return;
  var val='';
  try{var inp=folkEl('folkWallInput');if(inp&&typeof inp.value==='string')val=inp.value.replace(/^\s+|\s+$/g,'').slice(0,80)}catch(e2){}
  if(!val){try{var bd=folkEl('folkBody');if(bd)bd.textContent='blank stone. bold. cowardly. try again with words.'}catch(e4){}return}
  var arr=[];
  try{var raw=localStorage.getItem('cube_folk_wall');if(raw){var p=JSON.parse(raw);if(p instanceof Array)arr=p}}catch(e6){}
  arr.push(val);while(arr.length>20)arr.shift();
  try{localStorage.setItem('cube_folk_wall',JSON.stringify(arr))}catch(e9){}
  var n=0;try{n=parseInt(localStorage.getItem('cube_folk_wall_n')||'0',10)||0}catch(e10){}
  n++;try{localStorage.setItem('cube_folk_wall_n',String(n))}catch(e11){}
  try{var w=folkEl('folkWho');if(w)w.textContent='— memorial wall —'}catch(e12){}
  try{var b2=folkEl('folkBody');if(b2)b2.textContent='chiseled. "'+val+'". the valley pretends not to cry.'}catch(e13){}
  if(n>=5&&typeof ach==='function'){try{ach('folk_wall')}catch(e14){}}
  try{folkPanelDraw()}catch(e15){}
 };
}
var FOLK_CURSED=['cursed cut: the mirror looks away first.','cursed cut: bangs with a mind of their own. rude minds.','cursed cut: one side wants to talk. the other side already left.','cursed cut: static cling. you attract balloons and gossip.','cursed cut: the barber sneezed mid-snip. wear a hat. forever.','cursed cut: parted in the middle. like the valley opinion of you.','cursed cut: layered like an onion. smells like one too.'];
function folkBadCut(){
 if(!folkActive)return;
 try{
  var b=folkEl('folkBody');if(!b)return;
  b.textContent+=' '+FOLK_CURSED[Math.floor(Math.random()*FOLK_CURSED.length)]+' no refund. walk it off.';
 }catch(e){}
}
function folkFpGet(){try{var v=parseInt(localStorage.getItem('cube_folk_fp')||'0',10);return isNaN(v)||v<0?0:v}catch(e){return 0}}
function folkFpAdd(n){
 var add=0;try{add=parseInt(n,10);if(isNaN(add))add=0}catch(e){}
 var next=Math.max(0,folkFpGet()+add);
 try{localStorage.setItem('cube_folk_fp',String(next))}catch(e){}
 if(next>=100&&typeof ach==='function'){try{ach('folk_rich')}catch(e){}}
 try{if(typeof folkPanelDraw==='function')folkPanelDraw()}catch(e){}
 return next;
}
function folkBuffsGet(){try{var o=JSON.parse(localStorage.getItem('cube_folk_buffs')||'{}');return (o&&typeof o==='object')?o:{}}catch(e){return{}}}
function folkHasBuff(id){try{if(!id)return false;var b=folkBuffsGet();return !!(b&&b[id])}catch(e){return false}}
var FOLK_FRIES=['fried air. somehow.','pogo corn. it bounces on the way down.','fried snow. it melts. that is the joke.','fried paperwork. tastes like stamp office.','fried echoes. crunchy but distant.','fried left sock. the right one escaped.','fried compliments. salty but nice.','fried nap. you wake up crispier.'];
var FOLK_STALLS=[
 {id:'frybread',cost:10,desc:'frybread. +1 fp per wander for 10 wanders. greasy math.'},
 {id:'souvenir',cost:25,desc:'tiny ekber statue. does nothing. watches you. judges softly.'},
 {id:'pogorent',cost:40,desc:'pogo rental. bouncy. probably safe. bring a helmet.'},
 {id:'anthem',cost:60,desc:'valley anthem pamphlet. hum it and folk stand straighter. weird.'},
 {id:'goldcomb',cost:100,desc:'gold comb. one-time +50 skill. extremely shiny. do not eat.'}
];
function folkEkberPanel(){
 if(!folkActive)return '';
 var done=false;try{done=(parseInt(localStorage.getItem('cube_folk_q')||'0',10)||0)>2}catch(e){}
 if(!done)return '<div>finish ekber\u2019s quests first. he is watching. mostly napping.</div>';
 var last=0;try{last=parseInt(localStorage.getItem('cube_folk_fry_at')||'0',10)||0}catch(e){}
 var fries=0;try{fries=parseInt(localStorage.getItem('cube_folk_fries')||'0',10)||0}catch(e){}
 var debt=0;try{debt=parseInt(localStorage.getItem('cube_folk_debt')||'0',10)||0}catch(e){}
 var left=20*3600*1000-(Date.now()-last);if(last===0)left=0;
 var fryLine=left<=0?'<div>daily fry: ready. it is getting cold. quickly.</div><button class="folkBtn" id="folkFry" style="padding:3px 8px;font-size:11px">claim daily fry</button>':'<div style="opacity:.6">daily fry: not ready. come back in '+Math.floor(left/3600000)+'h '+Math.floor((left%3600000)/60000)+'m. the fryer needs a nap too.</div>';
 return '<div><b>ekber aftermath. he remembers you. unfortunately.</b></div>'+fryLine+'<div>debt ledger: you owe ekber '+debt+' fried loyalty. ekber owes you nothing. he checked twice. he licked the ledger.</div><div>lifetime fries: '+fries+'. a legacy in grease.</div>';
}
function folkEkberWire(){
 if(!folkActive)return;
 var btn=folkEl('folkFry');if(!btn)return;
 btn.onclick=function(){
  if(!folkActive)return;
  try{localStorage.setItem('cube_folk_fry_at',String(Date.now()))}catch(e){}
  var f2=0;try{f2=parseInt(localStorage.getItem('cube_folk_fries')||'0',10)||0}catch(e){}
  f2++;try{localStorage.setItem('cube_folk_fries',String(f2))}catch(e){}
  try{if(typeof skillState!=='undefined'&&skillState&&typeof skillSave==='function'){skillState.points=(skillState.points||0)+15;skillSave()}}catch(e){}
  var pick=FOLK_FRIES[Math.floor(Math.random()*FOLK_FRIES.length)]||'fried something. do not ask.';
  try{var b2=folkEl('folkBody');if(b2)b2.textContent='ekber hands you '+pick+' +15 skill. +1 fry. -1 artery.'}catch(e){}
  if(f2>=3&&typeof ach==='function'){try{ach('folk_fried')}catch(e){}}
  try{folkPanelDraw()}catch(e){}
 };
}
function folkShopPanel(){
 if(!folkActive)return '';
 var bal=folkFpGet(),buffs=folkBuffsGet(),h='<div><b>folk stalls. no refunds. no regrets. some grease.</b></div><div>folk points: <b>'+bal+'</b> fp. spend them before they hatch.</div>';
 for(var i=0;i<FOLK_STALLS.length;i++){
  var s=FOLK_STALLS[i],owned='';
  if(buffs&&buffs[s.id])owned=s.id==='frybread'?' <span style="opacity:.6">('+buffs[s.id]+' wanders left)</span>':(s.id==='goldcomb'?' <span style="opacity:.6">(already combed)</span>':' <span style="opacity:.6">(owned)</span>');
  h+='<div><b>'+s.id+'</b> — '+s.cost+' fp. '+s.desc+owned+' <button class="folkBtn" data-stall="'+s.id+'" style="padding:2px 8px;font-size:11px">buy</button></div>';
 }
 return h+'<div style="opacity:.6">souvenir does nothing. that is the point.</div>';
}
function folkShopWire(){
 if(!folkActive)return;
 var btns=null;try{btns=document.querySelectorAll('[data-stall]')}catch(e){}
 if(!btns||!btns.length)return;
 for(var i=0;i<btns.length;i++)(function(btn){
  btn.onclick=function(){
   if(!folkActive)return;
   var sid='';try{sid=btn.getAttribute('data-stall')}catch(e){}
   var item=null;for(var j=0;j<FOLK_STALLS.length;j++)if(FOLK_STALLS[j].id===sid)item=FOLK_STALLS[j];
   if(!item)return;
   var body=folkEl('folkBody'),bal=folkFpGet();
   if(sid==='goldcomb'&&folkHasBuff('goldcomb')){if(body)body.textContent='already combed. greed is not shiny. one gold comb per folk. house rules.';return}
   if(bal<item.cost){if(body)body.textContent='not enough fp for '+sid+'. you have '+bal+', need '+item.cost+'. wander more. spend less.';return}
   folkFpAdd(-item.cost);
   var buffs=folkBuffsGet(),msg='bought '+sid+'.';
   if(sid==='frybread'){buffs.frybread=(parseInt(buffs.frybread,10)||0)+10;msg='bought frybread. +1 fp per wander for 10 wanders. crumbs everywhere. worth it.'}
   else if(sid==='souvenir'){buffs.souvenir=true;msg='bought tiny ekber statue. it watches you sleep now. pure flavor. zero stats. maximum judgment.'}
   else if(sid==='pogorent'){buffs.pogorent=true;msg='rented a pogo. boing. return it bent. that is tradition.'}
   else if(sid==='anthem'){buffs.anthem=true;msg='learned the valley anthem. you hum it. folk nod. off-key is the official key.'}
   else if(sid==='goldcomb'){buffs.goldcomb=true;try{if(typeof skillState!=='undefined'&&skillState&&typeof skillSave==='function'){skillState.points=(skillState.points||0)+50;skillSave()}}catch(e){}msg='bought gold comb. +50 skill. instantly shinier. one-time. like youth.'}
   try{localStorage.setItem('cube_folk_buffs',JSON.stringify(buffs))}catch(e){}
   if(body)body.textContent=msg;
   try{folkPanelDraw()}catch(e){}
  };
 })(btns[i]);
}
var FOLK_HUSS_LINES=['sneak over. get caught immediately. huss folk points. huss folk always points. you walk home faster than you arrived.','sneak over. the huss hill looks exactly like your hill but worse. somehow smugger. you stare. it stares back.','sneak over. a huss elder offers defection. better bread, they say. warmer mud, they say. you consider it for a full second.','sneak over. gifted a loaf of huss bread. it is dense. it is suspiciously good. you hide it from your own valley.','sneak over. try to blend in. forget the huss nod. everyone knows. an infant knows. you are escorted to the border with snacks.','sneak over. witness the huss pogo. lower bounce. louder boasting. you take notes. you burn the notes.','sneak over. trade gossip for gossip. theirs is juicier. yours is mostly about puddles. bad trade. no regrets.','sneak over. nobody catches you. this is worse. now you have to wonder what they let you see. you hurry home.'];
function folkPogoBtns(){return '<button class="folkBtn" id="folkPogo1" style="padding:3px 8px;font-size:11px">small bounce</button> <button class="folkBtn" id="folkPogo2" style="padding:3px 8px;font-size:11px">medium bounce</button> <button class="folkBtn" id="folkPogo3" style="padding:3px 8px;font-size:11px">ILLEGAL bounce</button>'}
function folkPogoPanel(){
 if(!folkActive)return;
 var best=0;try{best=parseInt(localStorage.getItem('cube_folk_pogo_best')||'0',10)||0}catch(e){}
 var rent=folkHasBuff('pogorent');
 try{var w=folkEl('folkWho');if(w)w.textContent='— pogo highways —'}catch(e){}
 try{var b=folkEl('folkBody');if(b)b.innerHTML='best height: <b>'+best+'m</b>. bounce law enforced. one bounce at a time. no double bouncing. no unlicensed altitude.<br>'+(rent?'rental pogo detected (+30%). springy. insured. barely legal.':'no rental. raw legs. brave. stupid. brave.')+'<br>choose your bounce. one of these is a crime.<br>'+folkPogoBtns()}catch(e){}
 folkPogoWire();
}
function folkPogoWire(){
 if(!folkActive)return;
 var b1=folkEl('folkPogo1'),b2=folkEl('folkPogo2'),b3=folkEl('folkPogo3');
 if(b1)b1.onclick=function(){folkPogoJump(1)};
 if(b2)b2.onclick=function(){folkPogoJump(2)};
 if(b3)b3.onclick=function(){folkPogoJump(3)};
}
function folkPogoJump(p){
 if(!folkActive)return;
 if(p!==1&&p!==2&&p!==3)p=1;
 var rent=folkHasBuff('pogorent');
 var height=Math.floor(5+Math.random()*10+p*(8+Math.random()*25));
 if(rent)height=Math.floor(height*1.3);
 var best=0;try{best=parseInt(localStorage.getItem('cube_folk_pogo_best')||'0',10)||0}catch(e){}
 try{var w=folkEl('folkWho');if(w)w.textContent='— pogo highways —'}catch(e){}
 var b=folkEl('folkBody');
 var permit=false;try{if(typeof folkHasPermit==='function')permit=folkHasPermit('bounce')}catch(e){}
 if(p===3&&!permit&&Math.random()<0.25){
  if(b)b.innerHTML='height voided. bounce police arrived mid-air. ticket issued. pogo impounded. dignity impounded. height ('+height+'m) confiscated for science.<br>no fp. crime does not pay. it bounces.<br>'+folkPogoBtns();
  folkPogoWire();try{folkPanelDraw()}catch(e){}return;
 }
 var line=height<30?'small hop. polite. a toad saw it and stayed seated.':(height<60?'decent launch. hat left behind. birds annoyed. knees filed a complaint.':(height<100?'major air. clouds consulted. ancestors briefly visible. landing still theoretical.':'illegal altitude through sheer bounce. saw the curve of the valley. waved at satellites. gravity taking notes.'));
 var award=Math.max(0,Math.floor(height/20));
 try{if(typeof folkWx==='function'&&folkWx()==='pogo-storm')award+=2}catch(e){}
 try{if(typeof folkFpAdd==='function')folkFpAdd(award)}catch(e){}
 var bestNote='';
 if(height>best){try{localStorage.setItem('cube_folk_pogo_best',String(height))}catch(e){}bestNote=' new best. previous best ('+best+'m) retired with honors.'}
 else bestNote=' best remains '+best+'m. the stick man remains unimpressed.';
 if(height>=100&&typeof ach==='function'){try{ach('folk_pogo')}catch(e){}}
 if(b)b.innerHTML=line+' height: <b>'+height+'m</b>.'+(p===1?' small bounce. lawful. soft. grandmother-approved.':(p===2?' medium bounce. firm. springy. knees pre-warned.':' ILLEGAL bounce. sirens in the distance. worth it.'))+(rent?' rental springs +30%.':'')+'<br>+'+award+' fp.'+bestNote+(height>=100?'<br>century bounce. the valley will tell this one wrong for years.':'')+'<br>'+folkPogoBtns();
 folkPogoWire();try{folkPanelDraw()}catch(e){}
}
function folkSeaPanel(){
 if(!folkActive)return;
 var drinks=0;try{drinks=parseInt(localStorage.getItem('cube_folk_sea_drinks')||'0',10)||0}catch(e){}
 try{var w=folkEl('folkWho');if(w)w.textContent='— folkral sea —'}catch(e){}
 try{var b=folkEl('folkBody');if(b)b.innerHTML='drinks taken: <b>'+drinks+'</b>. do not drink it. this is the warning. this panel is the warning.<br>fishing is safe. drinking is not safe. the sea is salty and judgmental.<br><button class="folkBtn" id="folkSeaFish" style="padding:3px 8px;font-size:11px">fish (safe)</button> <button class="folkBtn" id="folkSeaDrink" style="padding:3px 8px;font-size:11px">drink (not safe)</button><br>lifeguard on break. lifeguard has been on break since forever.'}catch(e){}
 folkSeaWire();
}
function folkSeaWire(){
 if(!folkActive)return;
 var bf=folkEl('folkSeaFish'),bd=folkEl('folkSeaDrink');
 if(bf)bf.onclick=function(){folkSeaFish()};
 if(bd)bd.onclick=function(){folkSeaDrink()};
}
function folkSeaBtns(){return '<button class="folkBtn" id="folkSeaFish" style="padding:3px 8px;font-size:11px">fish (safe)</button> <button class="folkBtn" id="folkSeaDrink" style="padding:3px 8px;font-size:11px">drink (not safe)</button>'}
function folkSeaFish(){
 if(!folkActive)return;
 var roll=Math.random(),b=folkEl('folkBody');
 try{var w=folkEl('folkWho');if(w)w.textContent='— folkral sea —'}catch(e){}
 if(roll<0.6){try{if(typeof folkFpAdd==='function')folkFpAdd(1)}catch(e){}if(b)b.innerHTML='caught an old boot. classic. damp. empty. somehow disappointed in you. +1 fp for effort.<br>'+folkSeaBtns()}
 else if(roll<0.9){try{if(typeof folkFpAdd==='function')folkFpAdd(5)}catch(e){}if(b)b.innerHTML='caught a folk fish. silver. smug. vibrating slightly. it knows things. it will not share them. +5 fp. lunch, maybe. friend, no.<br>'+folkSeaBtns()}
 else{if(b)b.innerHTML='the line goes still. the sea whispers your middle name. you do not have a middle name. the sea insists. +0 fp. you put the rod down slowly.<br>'+folkSeaBtns()}
 folkSeaWire();try{folkPanelDraw()}catch(e){}
}
function folkSeaDrink(){
 if(!folkActive)return;
 var drinks=0;try{drinks=parseInt(localStorage.getItem('cube_folk_sea_drinks')||'0',10)||0}catch(e){}
 drinks++;try{localStorage.setItem('cube_folk_sea_drinks',String(drinks))}catch(e){}
 var roll=Math.random(),html='';
 try{var w=folkEl('folkWho');if(w)w.textContent='— folkral sea —'}catch(e){}
 if(roll<0.5){try{if(typeof folkFpAdd==='function')folkFpAdd(-5)}catch(e){}html='drink #'+drinks+'. you are the sea now (temporarily). thoughts are waves. arms are tides. lunch is plankton. -5 fp. effect wears off. salt remains. regret remains. sea remains.'}
 else if(roll<0.8){try{if(typeof folkFpAdd==='function')folkFpAdd(10)}catch(e){}html='drink #'+drinks+'. enlightenment. you understand all currents. you forgive all seagulls. +10 fp. you forget it immediately. enlightenment is slippery when wet.'}
 else html='drink #'+drinks+'. nothing happens. which is worse. the sea noticed you and chose nothing. +0 fp. you feel perceived. throat salty. soul damp.';
 if(drinks>=5){if(typeof ach==='function'){try{ach('folk_sailor')}catch(e){}}html+='<br>five drinks. sailor status confirmed. doctor status pending.'}
 else html+='<br>drinks taken: '+drinks+'. warning still applies.';
 var b=folkEl('folkBody');if(b)b.innerHTML=html+'<br>'+folkSeaBtns();
 folkSeaWire();try{folkPanelDraw()}catch(e){}
}
function folkHussPanel(){
 if(!folkActive)return;
 var visits=0;try{visits=parseInt(localStorage.getItem('cube_folk_huss')||'0',10)||0}catch(e){}
 try{var w=folkEl('folkWho');if(w)w.textContent='— huss valley —'}catch(e){}
 try{var b=folkEl('folkBody');if(b)b.innerHTML='visits: <b>'+visits+'</b>. the valleys do not talk about it. this panel is not talking. it is whispering.<br>the other valley. smaller hills. louder claims. worse bread (allegedly good bread).<br><button class="folkBtn" id="folkHussGo" style="padding:3px 8px;font-size:11px">sneak over</button><br>do not wear your valley colors. do not do the folk nod wrong.'}catch(e){}
 folkHussWire();
}
function folkHussWire(){
 if(!folkActive)return;
 var b=folkEl('folkHussGo');if(b)b.onclick=function(){folkHussGo()};
}
function folkHussGo(){
 if(!folkActive)return;
 var visits=0;try{visits=parseInt(localStorage.getItem('cube_folk_huss')||'0',10)||0}catch(e){}
 visits++;try{localStorage.setItem('cube_folk_huss',String(visits))}catch(e){}
 var line=FOLK_HUSS_LINES[Math.floor(Math.random()*FOLK_HUSS_LINES.length)]||'sneak over. forgettable treason.';
 try{if(typeof folkFpAdd==='function')folkFpAdd(3)}catch(e){}
 var first='';
 if(visits===1){if(typeof ach==='function'){try{ach('folk_huss')}catch(e){}}first=' first sneak. treason tastes like bread.'}
 try{var w=folkEl('folkWho');if(w)w.textContent='— huss valley —'}catch(e){}
 try{var b=folkEl('folkBody');if(b)b.innerHTML=line+'<br>visit #'+visits+'. +3 fp for espionage.'+first+'<br>the valleys do not talk about it.<br><button class="folkBtn" id="folkHussGo" style="padding:3px 8px;font-size:11px">sneak over</button>'}catch(e){}
 folkHussWire();try{folkPanelDraw()}catch(e){}
}
function folkEvilGet(){try{var s=parseInt(localStorage.getItem('cube_folk_evil')||'0',10);if(isNaN(s)||s<0)return 0;return s>3?3:s}catch(e){return 0}}
function folkEvilPanel(){
 var s=folkEvilGet();
 var h='<div><b>the EVIL folk.</b> spot 13, behind the nice hill. do not approach.</div>';
   if(s===0)h+='<div>do not approach. the button below disagrees.</div><div>stage 0 of 3. innocence intact. for now.</div><button class="folkBtn" id="folkEvilGo" style="padding:3px 8px;font-size:11px">approach anyway</button>';
 else if(s===1)h+='<div>waved back. it waved back. this is now diplomacy.</div><div>stage 1 of 3. the valley saw nothing.</div><button class="folkBtn" id="folkEvilGo" style="padding:3px 8px;font-size:11px">approach again (worse)</button>';
 else if(s===2)h+='<div>you know a guy. he knows an evil guy. it is networking.</div><div>stage 2 of 3. handshake pending.</div><button class="folkBtn" id="folkEvilGo" style="padding:3px 8px;font-size:11px">accept associateship</button>';
 else h+='<div>certified associate of the EVIL folk. the valley pretends not to know.</div><div>no further buttons. buttons are for the innocent.</div>';
 return h;
}
function folkEvilWire(){
 if(!folkActive)return;
 var b=folkEl('folkEvilGo');if(b)b.onclick=function(){folkEvilGo()};
}
function folkEvilGo(){
 if(!folkActive)return;
 var s=folkEvilGet(),msg='';
 if(s===0){try{localStorage.setItem('cube_folk_evil','1')}catch(e){}msg='you wave. it waves back. this was the mistake. +5 fp. it is already telling the others.';try{if(typeof folkFpAdd==='function')folkFpAdd(5)}catch(e){}}
 else if(s===1){try{localStorage.setItem('cube_folk_evil','2')}catch(e){}msg='you learn the handshake. it is just pointing. +10 fp. pointing, but evil.';try{if(typeof folkFpAdd==='function')folkFpAdd(10)}catch(e){}}
 else if(s===2){try{localStorage.setItem('cube_folk_evil','3')}catch(e){}msg='full associate. your stamp card now says PURE EVIL in pen. +20 fp. pen is permanent.';try{if(typeof folkFpAdd==='function')folkFpAdd(20)}catch(e){}if(typeof ach==='function'){try{ach('folk_evil')}catch(e){}}}
 else msg='you are already certified. evil dental does not exist. stop asking.';
 try{var w=folkEl('folkWho');if(w)w.textContent='— the EVIL folk —'}catch(e){}
 try{var b=folkEl('folkBody');if(b)b.textContent=msg}catch(e){}
 try{folkPanelDraw()}catch(e){}
}
var FOLK_ANTHEM=[
 {id:'verse',hint:'ekber hums it while frying'},
 {id:'chorus',hint:'the gyroids know it'},
 {id:'bridge',hint:'written on the memorial wall'},
 {id:'outro',hint:'the EVIL folk stole it'}
];
var FOLK_ANTHEM_LINES={verse:'[verse] laaa, we bounced here and stayed.',chorus:'[chorus] la LA, folkistan forever-ish.',bridge:'[bridge] looo, stamp reform saved us all.',outro:'[outro] la la laaa, evil guy sings backup.'};
function folkAnthemGet(){try{var f=JSON.parse(localStorage.getItem('cube_folk_anthem')||'[]');return (f instanceof Array)?f:[]}catch(e){return[]}}
function folkAnthemPanel(){
 var found=folkAnthemGet(),h='<div><b>anthem of folkistan.</b> '+found.length+'/4 found. humming counts.</div>';
 for(var i=0;i<FOLK_ANTHEM.length;i++){
  var it=FOLK_ANTHEM[i];
  h+=found.indexOf(it.id)!==-1?'<div>[ '+it.id+' ] recovered. nice humming.</div>':'<div>[ ??? ] hint: '+it.hint+'</div>';
 }
 return h+'<button class="folkBtn" id="folkAnthemSing" style="padding:3px 8px;font-size:11px">hum what you know</button>';
}
function folkAnthemWire(){
 if(!folkActive)return;
 var b=folkEl('folkAnthemSing');if(b)b.onclick=function(){folkAnthemSing()};
}
function folkAnthemSing(){
 if(!folkActive)return;
 var found=folkAnthemGet(),parts=[],missing=[],i;
 for(i=0;i<FOLK_ANTHEM.length;i++){
  var it=FOLK_ANTHEM[i];
  if(found.indexOf(it.id)!==-1)parts.push(FOLK_ANTHEM_LINES[it.id]);
  else{parts.push('['+it.id+'] mumble mumble (unknown)');missing.push(it.id)}
 }
 var learned='';
 if(missing.length&&Math.random()<0.2){
  var pick=missing[Math.floor(Math.random()*missing.length)];
  found.push(pick);try{localStorage.setItem('cube_folk_anthem',JSON.stringify(found))}catch(e){}
  learned='<br>you learn ['+pick+']. humming pays off. the valley pretends it taught you.';
 }else if(missing.length)learned='<br>no new line today. just confidence. humming continues.';
 var msg=parts.join('<br>')+learned;
 if(found.length>=4){
  msg+='<br>you perform the anthem. folkistan weeps. +30 fp. ekber cries into the fry oil.';
  try{if(typeof folkFpAdd==='function')folkFpAdd(30)}catch(e){}
  if(typeof ach==='function'){try{ach('folk_anthem')}catch(e){}}
 }
 try{var w=folkEl('folkWho');if(w)w.textContent='— folkistan anthem quest —'}catch(e){}
 try{var b=folkEl('folkBody');if(b)b.innerHTML=msg}catch(e){}
 try{folkPanelDraw()}catch(e){}
}
var FOLK_AIRI_FACTS=['in 139, the great bounce launched the mayor six feet up. he never landed emotionally.','the sea incident is not discussed. the sea knows what it did. so do the ducks.','stamp reform of year 3 replaced signatures with nodding. paperwork doubled overnight.','folkistan applied for an anthem in 88. the form is still humming in the drawer.','the EVIL folk was voted nicest neighbor twice. votes were recounted until correct.','gyroids arrived on a tuesday. nobody ordered them. they stayed for the fry oil.','the memorial wall was built to remember the wall before it. both are missed dearly.','airi sumaya folkent nodded once in 102. historians still cite it as peak history.'];
function folkAiriPanel(){
 var n=0;try{n=parseInt(localStorage.getItem('cube_folk_nods')||'0',10)||0}catch(e){}
 return '<div><b>airi sumaya folkent.</b> nods at history. history nods back, slowly.</div><div>nods recorded: '+n+'. eight facts rotate. history is patient. you should be too.</div><button class="folkBtn" id="folkAiriNod" style="padding:3px 8px;font-size:11px">nod at history</button>';
}
function folkAiriWire(){
 if(!folkActive)return;
 var b=folkEl('folkAiriNod');if(b)b.onclick=function(){folkAiriNod()};
}
function folkAiriNod(){
 if(!folkActive)return;
 var n=0;try{n=parseInt(localStorage.getItem('cube_folk_nods')||'0',10)||0}catch(e){}
 n++;try{localStorage.setItem('cube_folk_nods',String(n))}catch(e){}
 var msg=FOLK_AIRI_FACTS[(n-1)%FOLK_AIRI_FACTS.length]+' nod #'+n+' recorded.';
 if(n%10===0){msg+=' tidy nodding. +5 fp. airi almost blinked.';try{if(typeof folkFpAdd==='function')folkFpAdd(5)}catch(e){}}
 try{var w=folkEl('folkWho');if(w)w.textContent='— airi sumaya folkent —'}catch(e){}
 try{var b=folkEl('folkBody');if(b)b.textContent=msg}catch(e){}
 try{folkPanelDraw()}catch(e){}
}
var FOLK_HEADLINES=['stamp office stamps {x} foreheads before lunch.','local fry declared "{x}."','pogo cop fines cloud for {x}.','valley votes {x} best smell again.','soup line now longer than {x}.','elder denies {x}, then nods at it.','frog court rules {x} fully legal.','wind owes valley an apology for {x}.','nod count hits record over {x}.','shed declares war on {x}. loses.','visitor asked about {x}. crowd gathers.','boing tower closed due to {x}.'];
var FOLK_FILLERS=['insufficient boing','mild doom','the visitor','soup','nodding','huss bread','a damp rumor','extra gravel','low clouds','fry grease','polite loitering','one loud pigeon'];
function folkPaperSeed(){var d=new Date(),m=d.getMonth()+1,dd=d.getDate();return d.getFullYear()+'-'+(m<10?'0':'')+m+'-'+(dd<10?'0':'')+dd}
function folkPaperHash(s){var h=5381;str=''+s;for(var i=0;i<str.length;i++){h=(((h<<5)+h)+str.charCodeAt(i))|0}return Math.abs(Math.floor(h))}
function folkPaperPanel(){
 var seed=folkPaperSeed(),base=folkPaperHash(seed);
 var w='clear',hr=12;
 try{if(typeof folkWeather==='string'&&folkWeather)w=folkWeather}catch(e){}
 try{if(typeof folkHour==='number'){hr=Math.max(0,Math.min(23,Math.floor(folkHour)))}}catch(e){}
 var hrs=hr<5?'small-hour fog':(hr<12?'morning gray':(hr<17?'midday haze':(hr<21?'evening sog':'night soup')));
 var pick=function(off,div){return Math.abs(Math.floor(base/div)+off)%12};
 var h1=FOLK_HEADLINES[base%12].split('{x}').join(FOLK_FILLERS[pick(0,12)]);
 var h2=FOLK_HEADLINES[(base+4)%12].split('{x}').join(FOLK_FILLERS[pick(5,144)]);
 var h3=FOLK_HEADLINES[(base+7)%12].split('{x}').join(FOLK_FILLERS[pick(9,1728)]);
 var wanders=0,nods=0,papers=0,fp=0;
 try{wanders=parseInt(localStorage.getItem('cube_folk_wanders')||'0',10)||0}catch(e){}
 try{nods=parseInt(localStorage.getItem('cube_folk_nods')||'0',10)||0}catch(e){}
 try{papers=parseInt(localStorage.getItem('cube_folk_paper_n')||'0',10)||0}catch(e){}
 try{if(typeof folkFpGet==='function')fp=folkFpGet()}catch(e){}
 return '<div style="font-weight:bold;font-size:13px">THE FOLK POST. all the news that fits.</div><div style="opacity:.8">dated '+seed+'. printed on dry soup.</div><div>1. '+h1+'</div><div>2. '+h2+'</div><div>3. '+h3+'</div><div style="opacity:.85">weather: '+w+', '+hrs+' ('+hr+':00). sky doing its best.</div><div style="border:1px dashed #3a5a2a;padding:5px;margin:6px 0">you box. no photo. you blinked.<br>wanders: '+wanders+'. nods: '+nods+'. fp: '+fp+'. papers read: '+papers+'.</div><div style="opacity:.75">still 2 coins. still worth it. probably.</div><button class="folkBtn" id="folkPaperRead" style="padding:3px 8px;font-size:11px">read today\'s paper</button>';
}
function folkPaperWire(){
 if(!folkActive)return;
 var b=folkEl('folkPaperRead');if(b)b.onclick=function(){folkPaperRead()};
}
function folkPaperRead(){
 if(!folkActive)return;
 var today=folkPaperSeed(),day=null;
 try{day=localStorage.getItem('cube_folk_paper_day')}catch(e){}
 var w=folkEl('folkWho'),b=folkEl('folkBody');
 if(day===today){if(w)w.textContent='— paper kid side-eyes you —';if(b)b.textContent='already read it. the news has not changed. it never changes.';return}
 var n=0;try{n=parseInt(localStorage.getItem('cube_folk_paper_n')||'0',10)||0}catch(e){}
 n=Math.min(9999,n+1);
 try{localStorage.setItem('cube_folk_paper_n',String(n))}catch(e){}
 try{localStorage.setItem('cube_folk_paper_day',today)}catch(e){}
 var late=FOLK_HEADLINES[folkPaperHash(today+':late')%12].split('{x}').join(FOLK_FILLERS[folkPaperHash(today+':late2')%12]);
 var msg='late edition. '+late+' paper boy nods like it matters.';
 if(Math.random()<0.15){var filler=FOLK_FILLERS[Math.floor(Math.random()*FOLK_FILLERS.length)];msg+=' bonus: visitor seen '+filler+'. witnesses nod.';if(typeof ach==='function'){try{ach('folk_headline')}catch(e){}}}
 msg+=' that is '+n+' paper(s). ink on thumbs.';
 if(w)w.textContent='— paper kid looks proud —';
 if(b)b.textContent=msg;
 if(n>=10&&typeof ach==='function'){try{ach('folk_press')}catch(e){}}
 try{folkPanelDraw()}catch(e){}
}
var FOLK_STAMP_Q=[
 {name:'paperwork',desc:'hold 20 folk points at once'},
 {name:'groomed',desc:'get a barbershop haircut'},
 {name:'treason lite',desc:'sneak to huss valley once'},
 {name:'certified',desc:'become EVIL associate'}
];
var FOLK_PERMITS=[
 {id:'bounce',cost:30,desc:'bounce permit. the police salute you. mostly.'},
 {id:'fry',cost:30,desc:'fry permit. eat fried things legally.'},
 {id:'nod',cost:30,desc:'nod permit. nod with authority.'}
];
function folkStampIdx(){if(!folkActive)return 0;try{var n=parseInt(localStorage.getItem('cube_folk_stampq')||'0',10);return isNaN(n)?0:Math.max(0,Math.min(4,n))}catch(e){return 0}}
function folkStampHave(i){
 if(!folkActive)return 0;
 try{
  if(i===0){var fp=0;try{if(typeof folkFpGet==='function')fp=folkFpGet()}catch(e){}return (typeof fp==='number'&&!isNaN(fp))?fp:0}
  if(i===1)return localStorage.getItem('cube_folk_cut')==='1'?1:0;
  if(i===2){var h=parseInt(localStorage.getItem('cube_folk_huss')||'0',10);return isNaN(h)?0:Math.max(0,h)}
  if(i===3){var ev=parseInt(localStorage.getItem('cube_folk_evil')||'0',10);return isNaN(ev)?0:Math.max(0,ev)}
 }catch(e){}
 return 0;
}
function folkStampNeed(i){return i===0?20:1}
function folkHasPermit(id){
 if(!folkActive||!id)return false;
 try{var o=JSON.parse(localStorage.getItem('cube_folk_permits')||'{}');return !!(o&&o[id])}catch(e){return false}
}
function folkStampPanel(){
 if(!folkActive)return '';
 var idx=folkStampIdx(),h='<div style="margin:4px 0;line-height:1.6">stamp office. take a number. numbers are decorative.<br>';
 if(idx>3)h+='stamped citizen. all-valley pass issued. the ink never dries.<br>you are now paperwork-proof. probably.<br>';
 else{
  var q=FOLK_STAMP_Q[idx],have=folkStampHave(idx),need=folkStampNeed(idx);
  h+='form '+(idx+1)+'/4: <b>'+q.name+'</b><br><span style="opacity:.8">'+q.desc+'</span><br>progress: '+have+' / '+need+'<br>the clerk stares at you. the clerk always stares.<br><button class="folkBtn" id="folkStampClaim" style="padding:3px 8px;font-size:11px">file paperwork</button><br>';
 }
 h+='<div style="margin-top:6px;border-top:1px dotted #3a5a2a;padding-top:4px">permit shop. no refunds. no questions. one nod per customer.<br>';
 for(var j=0;j<FOLK_PERMITS.length;j++){
  var p=FOLK_PERMITS[j];
  h+=folkHasPermit(p.id)?'<div>'+p.desc+' ('+p.cost+' fp) <span style="opacity:.6">owned. flaunt it quietly.</span></div>':'<div>'+p.desc+' ('+p.cost+' fp) <button class="folkBtn" data-permit="'+p.id+'" style="padding:2px 8px;font-size:11px">buy '+p.id+'</button></div>';
 }
 return h+'</div></div>';
}
function folkStampWire(){
 if(!folkActive)return;
 var claim=folkEl('folkStampClaim');
 if(claim)claim.onclick=function(){
  if(!folkActive)return;
  var idx=folkStampIdx(),have=folkStampHave(idx),need=folkStampNeed(idx);
  var body=folkEl('folkBody'),who=folkEl('folkWho');
  if(have<need){if(body)body.textContent=idx===0?('the clerk shakes her head. you hold '+have+' / '+need+' fp. come back with pockets heavier.'):('incomplete paperwork. the stamp stays dry. progress '+have+' / '+need+'.');return}
  var next=idx+1;
  try{localStorage.setItem('cube_folk_stampq',String(next))}catch(e){}
  if(next>3){
   if(body)body.textContent='STAMP. approved. you are now a stamped citizen. all-valley pass issued. the ink never dries.';
   if(who)who.textContent='— stamp office: closed (for you). forever. —';
   if(typeof ach==='function'){try{ach('folk_stamped')}catch(e){}}
  }else{
   if(body)body.textContent='STAMP. approved. next: '+FOLK_STAMP_Q[next].name+'. please shuffle forward one tile.';
   if(who)who.textContent='— stamp office: form '+(next+1)+'/4. the line moves but never shortens. —';
  }
  try{folkPanelDraw()}catch(e){}
 };
 var btns=null;try{btns=document.querySelectorAll('[data-permit]')}catch(e){}
 if(!btns)return;
 for(var k=0;k<btns.length;k++)(function(btn){
  btn.onclick=function(){
   if(!folkActive)return;
   var sid='';try{sid=btn.getAttribute('data-permit')}catch(e){}
   var found=null;for(var m=0;m<FOLK_PERMITS.length;m++)if(FOLK_PERMITS[m].id===sid)found=FOLK_PERMITS[m];
   if(!found)return;
   var body=folkEl('folkBody');
   if(folkHasPermit(sid)){if(body)body.textContent='you already own the '+sid+' permit. double paperwork is still paperwork.';return}
   var bal=0;try{if(typeof folkFpGet==='function')bal=folkFpGet()}catch(e){}
   if(bal<found.cost){if(body)body.textContent='not enough fp for '+sid+' permit. need '+found.cost+', have '+bal+'. the clerk pockets nothing, visibly.';return}
   try{if(typeof folkFpAdd==='function')folkFpAdd(-found.cost)}catch(e){}
   var obj={};try{obj=JSON.parse(localStorage.getItem('cube_folk_permits')||'{}')||{}}catch(e){obj={}}
   obj[sid]=1;try{localStorage.setItem('cube_folk_permits',JSON.stringify(obj))}catch(e){}
   if(body)body.textContent='permit issued: '+sid+'. '+found.desc+' keep it somewhere dry.';
   if(folkHasPermit('bounce')&&folkHasPermit('fry')&&folkHasPermit('nod')&&typeof ach==='function'){try{ach('folk_permit')}catch(e){}}
   try{folkPanelDraw()}catch(e){}
  };
 })(btns[k]);
}
var FOLK_CRIMES=['insufficient boing (third offense)','unlicensed humming of the anthem','nodding at huss valley','drinking the sea (again)','queue jumping (spiritual)','witnessing without a permit','fried contraband','waving back (see: EVIL folk)'];
var FOLK_PLEAS=['it was the wind.','i nod-nothing.','the pogo made me do it.','i thought the sea was soup.','my neighbor looked guiltier.','i plead folk. full folk. nothing but folk.'];
var FOLK_JUDGES=[{name:'judge bounce',quirk:'sentences in mid-air. never lands. nobody knows why.'},{name:'judge mildred',quirk:'remembers every offense since the first valley. holds grudges politely.'},{name:'judge huh',quirk:'falls asleep during testimony. wakes up for sentencing. always picks something.'}];
function folkJailLeft(){
 if(!folkActive)return 0;
 try{var until=parseInt(localStorage.getItem('cube_folk_jail_until')||'0',10);return until>Date.now()?until-Date.now():0}catch(e){return 0}
}
function folkCourtRec(){try{var o=JSON.parse(localStorage.getItem('cube_folk_record')||'{}');return{g:Math.max(0,o.g||0),a:Math.max(0,o.a||0)}}catch(e){return{g:0,a:0}}}
function folkCourtPanel(){
 if(!folkActive)return '';
 var trials=0;try{trials=parseInt(localStorage.getItem('cube_folk_trials')||'0',10)||0}catch(e){}
 var rec=folkCourtRec(),jl=folkJailLeft();
 var h='<div>folk court. small building. big gavel. bigger bounce.</div><div style="opacity:.85">trials held: '+trials+'. record: '+rec.g+' guilty / '+rec.a+' acquitted. the valley remembers. unfortunately.</div>';
 if(jl>0)return h+'<div>serving time. '+Math.ceil(jl/1000)+'s left. the cell has a window. nice window.</div><div style="opacity:.75">no buttons for you. buttons are for free folk. sit. reflect. practice legal nodding.</div>';
 return h+'<div style="opacity:.85">court is in session-ish. judges are awake-ish. justice is folk-ish.</div><button class="folkBtn" id="folkCourtSelf" style="padding:3px 8px;font-size:11px">turn yourself in</button> <button class="folkBtn" id="folkCourtSnitch" style="padding:3px 8px;font-size:11px">accuse a neighbor</button><div style="opacity:.7">tip: snitching works 60% of the time. the other 40% the neighbor snitches back.</div>';
}
function folkCourtWire(){
 if(!folkActive)return;
 var bs=folkEl('folkCourtSelf'),bn=folkEl('folkCourtSnitch');
 if(bs)bs.onclick=function(){folkTrial('self')};
 if(bn)bn.onclick=function(){folkTrial('snitch')};
}
function folkTrial(kind){
 if(!folkActive)return;
 var w=folkEl('folkWho'),b=folkEl('folkBody');
 var jl=folkJailLeft();
 if(jl>0){if(w)w.textContent='— folk court (from jail) —';if(b)b.textContent='still serving time. '+Math.ceil(jl/1000)+'s left. the window misses you too.';try{folkPanelDraw()}catch(e){}return}
 var crime=FOLK_CRIMES[Math.floor(Math.random()*FOLK_CRIMES.length)];
 var plea=FOLK_PLEAS[Math.floor(Math.random()*FOLK_PLEAS.length)];
 var judge=FOLK_JUDGES[Math.floor(Math.random()*FOLK_JUDGES.length)];
 var snitch=kind==='snitch';
 var winRoll=Math.random(),winLine=snitch?0.6:0.5;
 var trials=0;try{trials=parseInt(localStorage.getItem('cube_folk_trials')||'0',10)||0}catch(e){}
 trials++;try{localStorage.setItem('cube_folk_trials',String(trials))}catch(e){}
 var rec=folkCourtRec(),open='the court of folk valley is in session. '+judge.name+' presiding. '+judge.quirk+' charge: '+crime+' plea: '+plea;
 if(winRoll<winLine){
  rec.a++;try{localStorage.setItem('cube_folk_record',JSON.stringify(rec))}catch(e){}
  try{if(typeof folkFpAdd==='function')folkFpAdd(8)}catch(e){}
  if(rec.a===1&&typeof ach==='function'){try{ach('folk_acquitted')}catch(e){}}
  if(w)w.textContent=snitch?'— folk court: not guilty (neighbor guilty) —':'— folk court: not guilty —';
  if(b)b.innerHTML=open+'<br><br>'+(snitch?'acquitted. the neighbor takes the fall. classic. +8 fp for outstanding pointing. the gavel bounced twice. that means innocent.':'acquitted. the judge blinked and missed the crime. +8 fp for honesty-ish. do not push it.');
 }else{
  rec.g++;try{localStorage.setItem('cube_folk_record',JSON.stringify(rec))}catch(e){}
  var bal=0;try{if(typeof folkFpGet==='function')bal=folkFpGet()}catch(e){}
  if(w)w.textContent=snitch?'— folk court: guilty (snitch backfire) —':'— folk court: guilty —';
  if(bal>=15){
   try{if(typeof folkFpAdd==='function')folkFpAdd(-15)}catch(e){}
   if(b)b.innerHTML=open+'<br><br>guilty. '+(snitch?'the neighbor had an alibi. a bouncy one. ':'')+'fine: 15 fp. paid. the valley thanks you for your contribution.';
  }else{
   try{localStorage.setItem('cube_folk_jail_until',String(Date.now()+600000))}catch(e){}
   if(typeof ach==='function'){try{ach('folk_jailbird')}catch(e){}}
   if(b)b.innerHTML=open+'<br><br>guilty. '+(snitch?'snitch failed. ':'')+'too broke for fines. 10 min jail instead. the cell has a window. nice window.';
  }
 }
 try{folkPanelDraw()}catch(e){}
}
var FOLK_FESTS=[
 {id:'fryweek',name:'fry week',blurb:'everyone fries everything. potatoes, regrets, the fence. if it fits in oil it counts.',pay:6,line:'you fried everything. the oil salutes you. +6 fp.'},
 {id:'bounceday',name:'bounce day',blurb:'mass bounce at noon. the ground has filed a complaint. nobody listened.',pay:8,line:'you bounced with 40 strangers. the dirt is dizzy. +8 fp.'},
 {id:'nodweek',name:'nod week',blurb:'seven days of synchronized nodding. no talking. talking would ruin it.',pay:4,line:'you nodded 900 times in perfect sync. neck: ruined. spirit: full. +4 fp.'},
 {id:'seaweek',name:'sea week',blurb:'the annual sea staring contest. last year the sea blinked first. allegedly.',pay:5,line:'you stared at the sea until it looked away. classic win. +5 fp.'},
 {id:'hussweek',name:'rivalry week',blurb:'a full week of glaring at huss across the valley. bring your own grudge.',pay:7,line:'you glared at huss for six straight hours. they blinked first. +7 fp.'},
 {id:'quiet',name:'quiet week',blurb:'nothing happens, on purpose. attendance is mandatory. snoring is judged.',pay:2,line:'you did absolutely nothing, beautifully. the elders took notes. +2 fp.'}
];
function folkFestNow(){var i=Math.floor(Date.now()/86400000)%6;if(i<0)i+=6;return (FOLK_FESTS[i]||FOLK_FESTS[5]).id}
function folkFestDef(id){for(var i=0;i<FOLK_FESTS.length;i++)if(FOLK_FESTS[i].id===id)return FOLK_FESTS[i];return FOLK_FESTS[5]}
function folkFestPanel(){
 var fest=folkFestDef(folkFestNow()),fests=[];
 try{var r=JSON.parse(localStorage.getItem('cube_folk_fests')||'[]');if(r instanceof Array)fests=r}catch(e){}
 var done=false;try{done=localStorage.getItem('cube_folk_fest_day')===new Date().toDateString()}catch(e){}
 var h='<div>this week: <b>'+fest.name+'</b><br><span style="opacity:.8">'+fest.blurb+'</span><br><span style="opacity:.7">attended '+Math.min(6,fests.length)+'/6 festivals.</span><br>';
 return h+(done?'<span style="opacity:.8">participated. the valley applauds.</span></div>':'<button class="folkBtn" id="folkFestGo" style="padding:3px 8px;font-size:11px">participate</button></div>');
}
function folkFestWire(){
 if(!folkActive)return;
 var b=folkEl('folkFestGo');if(b)b.onclick=function(){folkFestGo()};
}
function folkFestGo(){
 if(!folkActive)return;
 var id=folkFestNow(),fest=folkFestDef(id),fests=[];
 try{var r=JSON.parse(localStorage.getItem('cube_folk_fests')||'[]');if(r instanceof Array)fests=r}catch(e){}
 if(fests.indexOf(id)===-1)fests.push(id);
 try{localStorage.setItem('cube_folk_fest_day',new Date().toDateString())}catch(e){}
 try{localStorage.setItem('cube_folk_fests',JSON.stringify(fests))}catch(e){}
 try{if(typeof folkFpAdd==='function')folkFpAdd(fest.pay)}catch(e){}
 try{var w=folkEl('folkWho');if(w)w.textContent='— '+fest.name+' —'}catch(e){}
 try{var b=folkEl('folkBody');if(b)b.textContent=fest.line}catch(e){}
 if(fests.length>=3&&typeof ach==='function'){try{ach('folk_festive')}catch(e){}}
 try{folkPanelDraw()}catch(e){}
}
var FOLK_NIGHT=['the nocturnal nodder nods at you from the dark. you nod back. that was the whole ritual.','the moon stamp clerk stamps your forehead. it says approved-ish. do not wash it off.','a sleep-bouncing pogo hops past with its eyes closed. it knows where it is going. you do not.','the 693 holds up a tiny lantern and whispers your name but pronounces it wrong on purpose.','a blanket with feet offers you a lukewarm fry. you take it. that was legally binding.','the fog choir hums one long note until your knees agree. you harmonize by accident.','a clerk owl audits your dreams and finds two undeclared snacks. you pay in blinks.','the puddle twins wave at you from two different puddles at once. neither puddle is nearby.'];
function folkNightPanel(){
 var night=false;try{if(typeof folkIsNight==='function')night=folkIsNight()}catch(e){}
 if(!night)return '<div>the night folk are asleep. come back after 20:00 valley time.<br><span style="opacity:.7">they left a tiny do not poke sign. respect it.</span></div>';
 var met=0;try{met=parseInt(localStorage.getItem('cube_folk_nightmet')||'0',10)||0}catch(e){}
 return '<div>night folk are awake and mildly haunted.<br><span style="opacity:.7">encounters met: '+met+'. they remember you. unfortunately.</span><br><button class="folkBtn" id="folkNightGo" style="padding:3px 8px;font-size:11px">prowl after dark</button></div>';
}
function folkNightWire(){
 if(!folkActive)return;
 var b=folkEl('folkNightGo');if(b)b.onclick=function(){folkNightGo()};
}
function folkNightGo(){
 if(!folkActive)return;
 var night=false;try{if(typeof folkIsNight==='function')night=folkIsNight()}catch(e){}
 var w=folkEl('folkWho'),b=folkEl('folkBody');
 if(!night){if(w)w.textContent='— daytime —';if(b)b.textContent='too bright out. the night folk hiss.';return}
 var met=0;try{met=parseInt(localStorage.getItem('cube_folk_nightmet')||'0',10)||0}catch(e){}
 met++;try{localStorage.setItem('cube_folk_nightmet',String(met))}catch(e){}
 try{if(typeof folkFpAdd==='function')folkFpAdd(2)}catch(e){}
 if(w)w.textContent='— night folk —';
 if(b)b.textContent=FOLK_NIGHT[Math.floor(Math.random()*FOLK_NIGHT.length)]+' (+2 fp.)';
 if(met>=5&&typeof ach==='function'){try{ach('folk_afterdark')}catch(e){}}
 try{folkPanelDraw()}catch(e){}
}
var FOLK_DJS=[
 {name:'dj fry',show:'the morning grease',slot:'morning'},
 {name:'dj soggy',show:'midday mop',slot:'noon'},
 {name:'dj pebble',show:'evening bounce',slot:'evening'},
 {name:'dj lint',show:'night hum',slot:'night'}
];
var FOLK_SONGS=['boing (boing remix)','nod along','sea shanty (dry)','fry grease blues','pigeon postage','moss anthem','shoe squeak symphony','valley hum','gubby wobble','tourist slow dance'];
function folkShowNow(){
 var h=12;try{if(typeof folkHour==='number')h=Math.max(0,Math.min(23,Math.floor(folkHour)))}catch(e){}
 var slot=h<6?'night':(h<12?'morning':(h<18?'noon':'evening'));
 for(var i=0;i<FOLK_DJS.length;i++)if(FOLK_DJS[i].slot===slot)return FOLK_DJS[i];
 return FOLK_DJS[0];
}
function folkRadioPanel(){
 if(!folkActive)return '';
 var dj=folkShowNow(),req=0;
 try{req=parseInt(localStorage.getItem('cube_folk_requests')||'0',10)||0}catch(e){}
 return '<div>FOLK FM 139.0</div><div>now playing: '+dj.show+' with '+dj.name+'</div><div style="opacity:.8">requests made: '+req+'. reception is bad. dedication is worse.</div><button class="folkBtn" id="folkRadioReq" style="padding:3px 8px;font-size:11px">request a song (5 fp)</button>';
}
function folkRadioWire(){
 if(!folkActive)return;
 var b=folkEl('folkRadioReq');if(b)b.onclick=function(){folkRadioReq()};
}
function folkRadioReq(){
 if(!folkActive)return;
 var w=folkEl('folkWho'),b=folkEl('folkBody'),bal=0;
 try{if(typeof folkFpGet==='function')bal=folkFpGet()}catch(e){}
 if(bal<5){if(w)w.textContent='— folk fm 139.0 —';if(b)b.textContent='radio costs money. the tower runs on grease.';return}
 try{if(typeof folkFpAdd==='function')folkFpAdd(-5)}catch(e){}
 var req=0;try{req=parseInt(localStorage.getItem('cube_folk_requests')||'0',10)||0}catch(e){}
 req++;try{localStorage.setItem('cube_folk_requests',String(req))}catch(e){}
 var song=FOLK_SONGS[Math.floor(Math.random()*FOLK_SONGS.length)],dj=folkShowNow();
 if(w)w.textContent='— folk fm 139.0 —';
 if(b)b.textContent='FOLK FM plays \''+song+'\' for you. '+dj.name+' dedicates it to \'the visitor with the shoes\'.';
 if(req>=5&&typeof ach==='function'){try{ach('folk_dj')}catch(e){}}
 try{folkPanelDraw()}catch(e){}
}
var FOLK_SENDERS=['gubby','folk cat','ekber','ronald','the visitor','huss tourist'];
var FOLK_LETTERS=['dear you. {s} says you owe three fries. interest is one fry per day.','hello. {s} likes your shoes. do not ask what happens to visitors without shoes.','notice: {s} cites you for excessive bouncing near the fence.','warning: {s} says the sea is closed today. the sea disagrees.','pamphlet: {s} invites you to defect to the other bench. better view.','psst. {s} saw you nodding. correct behavior. keep nodding.','reminder: {s} borrowed your name and will return it scratched.','hi. {s} counted your blinks. you blink like a local now.'];
var FOLK_REPLIES=['noted. stop licking the stamps.','wow. handwriting like a fence post. keep it up.','received. the fries debt still stands.','cute letter. the pigeon ate half. still counts.','yes. shoes noticed. no further action.'];
var FOLK_EMPTY=['empty. just a damp coupon for moss.','empty. something waved and left.','empty. the box hums in a minor key.','empty. a single crumb. evidence of fries.'];
function folkMailPanel(){
 if(!folkActive)return '';
 var letters=0,mailAt=0,pending=null;
 try{letters=parseInt(localStorage.getItem('cube_folk_letters')||'0',10)||0}catch(e){}
 try{mailAt=parseInt(localStorage.getItem('cube_folk_mail_at')||'0',10)||0}catch(e){}
 try{pending=localStorage.getItem('cube_folk_mail_pending')}catch(e){}
 var fresh=mailAt!==0&&(Date.now()-mailAt)<10*60*1000;
 var h='<div>valley mail</div><div style="opacity:.8">letters sent: '+letters+'</div>';
 h+=fresh?'<div>empty. the box echoes.</div>':'<div>something rattles in the box.</div><button class="folkBtn" id="folkMailCheck" style="padding:3px 8px;font-size:11px">check mailbox</button>';
 h+='<div style="margin-top:6px">send a letter (the pigeon needs work):</div><select id="folkMailTo" style="background:#0e1a0b;border:1px solid #3a5a2a;color:#c8e0a8;font-family:Consolas,monospace;font-size:11px;padding:2px 4px">';
 for(var i=0;i<FOLK_SENDERS.length;i++)h+='<option value="'+FOLK_SENDERS[i]+'">'+FOLK_SENDERS[i]+'</option>';
 h+='</select> <button class="folkBtn" id="folkMailSend" style="padding:3px 8px;font-size:11px">send (2 fp)</button>';
 if(pending)h+='<div style="opacity:.7">waiting for a reply from '+pending+'. be patient. pigeons are slow.</div>';
 return h;
}
function folkMailWire(){
 if(!folkActive)return;
 var c=folkEl('folkMailCheck'),s=folkEl('folkMailSend');
 if(c)c.onclick=function(){folkMailCheck()};
 if(s)s.onclick=function(){folkMailSend()};
}
function folkMailCheck(){
 if(!folkActive)return;
 var w=folkEl('folkWho'),b=folkEl('folkBody');
 var mailAt=0,pending=null;
 try{mailAt=parseInt(localStorage.getItem('cube_folk_mail_at')||'0',10)||0}catch(e){}
 try{pending=localStorage.getItem('cube_folk_mail_pending')}catch(e){}
 if(mailAt!==0&&(Date.now()-mailAt)<10*60*1000){if(w)w.textContent='— valley mail —';if(b)b.textContent='empty. the box echoes.';return}
 try{localStorage.setItem('cube_folk_mail_at',String(Date.now()))}catch(e){}
 if(w)w.textContent='— valley mail —';
 if(pending){if(b)b.textContent='re: your letter. '+pending+' replies: '+FOLK_REPLIES[Math.floor(Math.random()*FOLK_REPLIES.length)];try{localStorage.setItem('cube_folk_mail_pending','')}catch(e){}try{folkPanelDraw()}catch(e){}return}
 if(Math.random()<0.6){
  var filled=FOLK_LETTERS[Math.floor(Math.random()*FOLK_LETTERS.length)].split('{s}').join(FOLK_SENDERS[Math.floor(Math.random()*FOLK_SENDERS.length)]);
  if(Math.random()<0.25){try{if(typeof folkFpAdd==='function')folkFpAdd(3)}catch(e){}filled+=' there is 3 fp taped to the letter. do not spend it all on grease.'}
  if(b)b.textContent=filled;
 }else{if(b)b.textContent=FOLK_EMPTY[Math.floor(Math.random()*FOLK_EMPTY.length)]}
 try{folkPanelDraw()}catch(e){}
}
function folkMailSend(){
 if(!folkActive)return;
 var w=folkEl('folkWho'),b=folkEl('folkBody'),to=FOLK_SENDERS[0];
 try{var sel=folkEl('folkMailTo');if(sel&&sel.value)to=sel.value}catch(e){}
 var bal=0;try{if(typeof folkFpGet==='function')bal=folkFpGet()}catch(e){}
 if(bal<2){if(w)w.textContent='— valley mail —';if(b)b.textContent='stamps cost fp. lick something else.';return}
 try{if(typeof folkFpAdd==='function')folkFpAdd(-2)}catch(e){}
 var letters=0;try{letters=parseInt(localStorage.getItem('cube_folk_letters')||'0',10)||0}catch(e){}
 letters++;try{localStorage.setItem('cube_folk_letters',String(letters))}catch(e){}
 try{localStorage.setItem('cube_folk_mail_pending',to)}catch(e){}
 if(w)w.textContent='— valley mail —';
 if(b)b.textContent='sent. the pigeon judges the handwriting but takes it.';
 if(letters>=5&&typeof ach==='function'){try{ach('folk_penpal')}catch(e){}}
 try{folkPanelDraw()}catch(e){}
}
var FOLK_SUBJECTS=[
 {id:'bounce',name:'bounce physics'},{id:'nod',name:'nod history'},{id:'fry',name:'fry chemistry'},{id:'stamp',name:'stamp law'},{id:'sea',name:'sea safety'}
];
var FOLK_QUIZ={
 bounce:[
  {q:'what is the legal bounce limit?',a:['yes','one bounce at a time','huss'],c:1},
  {q:'your cube bounced twice in a row. you must...',a:['apologize to the floor','bounce a third time to assert dominance','file a bounce report in triplicate'],c:0},
  {q:'who invented bouncing?',a:['the floor, by accident','a cube named greg','gravity, allegedly'],c:0},
  {q:'proper landing form is...',a:['face first, loudly','softly, like a secret','directly onto another cube'],c:1}
 ],
 nod:[
  {q:'the great nod of 2019 lasted...',a:['four hours','until lunch','it is still going'],c:0},
  {q:'you nod back when...',a:['nodded at, obviously','the wind changes','you feel watched by the hills'],c:0},
  {q:'nodding too fast means...',a:['excitement','disagreement in some villages','a bee is involved'],c:1},
  {q:'the nod museum contains...',a:['one nod, preserved under glass','a statue of a neck','nothing. it nods at you'],c:0}
 ],
 fry:[
  {q:'fry oil should be...',a:['hot','emotionally available','legally distinct from soup'],c:0},
  {q:'the five second rule is...',a:['seven seconds if nobody saw','a myth invented by floors','still lunch'],c:1},
  {q:'what is fry chemistry?',a:['potato rights','grease plus patience','a type of weather'],c:1},
  {q:'if the fry hisses at you...',a:['hiss back, politely','drop it and run','season it immediately'],c:0}
 ],
 stamp:[
  {q:'a stamp is valid when...',a:['it says stamp on it','the stamper nods','both, loudly'],c:2},
  {q:'you may stamp...',a:['other stamps','your own forehead, once','nothing before breakfast'],c:0},
  {q:'the stamp tax must be paid in...',a:['smaller stamps','exact change and regret','huss'],c:0},
  {q:'lost your stamp?',a:['report to the stamp office','draw one from memory','stamp anyway and hope'],c:0}
 ],
 sea:[
  {q:'where is the sea?',a:['uphill. do not ask','behind the fry stand','there is no sea. stay calm'],c:2},
  {q:'if you see water...',a:['it is probably soup','poke it with a stick','tell the sea warden at once'],c:2},
  {q:'approved floaties include...',a:['one (1) nodding duck','a greasy diploma','your own confidence'],c:0},
  {q:'drowning is prevented by...',a:['not going in','waving at the lifeguard cube','believing in the floor'],c:0}
 ]
};
function folkGrades(){try{var g=JSON.parse(localStorage.getItem('cube_folk_grades')||'{}');return (g&&typeof g==='object')?g:{}}catch(e){return{}}}
function folkSchoolPanel(){
 if(!folkActive)return '';
 var grades=folkGrades(),diploma=false,detention=0,passed=0,i;
 try{diploma=localStorage.getItem('cube_folk_diploma')==='1'}catch(e){}
 try{detention=parseInt(localStorage.getItem('cube_folk_detention')||'0',10)||0}catch(e){}
 var h='folk school. no windows. the windows bounced away.<br>enrollment: one cube. attendance: mandatory. recess: cancelled (bounced).<br>';
 for(i=0;i<FOLK_SUBJECTS.length;i++){
  var s=FOLK_SUBJECTS[i];
  if(grades[s.id]){passed++;h+=s.name+': passed. the teacher almost smiled.<br>'}
  else h+=s.name+': not passed. <button class="folkBtn" data-lesson="'+s.id+'" style="padding:2px 8px;font-size:11px">take lesson</button><br>';
 }
 if(diploma)h+='<br>DIPLOMA. framed. slightly greasy.<br>the valley respects you. the floor fears you.<br>';
 else if(passed>=5){try{localStorage.setItem('cube_folk_diploma','1')}catch(e){}folkSkillAdd(100);if(typeof ach==='function'){try{ach('folk_diploma')}catch(e){}}h+='<br>all lessons done. the final exam has been cancelled. (it was a guessing game. the principal apologizes.)<br>DIPLOMA. framed. slightly greasy. +100 skill.<br>the valley respects you. the floor fears you.<br>';}
 else h+='<br>pass all 5 lessons to graduate. progress: '+passed+' / 5. the bell does not ring for you yet.<br>tip: wrong answers print detention slips. the printer is loud.<br>';
 h+='<br>detention slips: '+detention+'. collected. laminated.<br>';
 if(detention>=3)h+='record: chronic wobbler. the principal knows your name.<br>';
 return h;
}
function folkSchoolWire(){
 if(!folkActive)return;
 var btns=null;try{btns=document.querySelectorAll('[data-lesson]')}catch(e){}
 if(btns)for(var i=0;i<btns.length;i++)(function(b){b.onclick=function(){var id='';try{id=b.getAttribute('data-lesson')}catch(e){}folkLesson(id)}})(btns[i]);
}
function folkSkillAdd(n){try{if(typeof skillState!=='undefined'&&skillState&&typeof skillSave==='function'){skillState.points=(skillState.points||0)+n;skillSave()}}catch(e){}}
function folkLesson(id){
 if(!folkActive)return;
 var bank=FOLK_QUIZ[id];if(!bank||!bank.length)return;
 var subjName=id;for(var k=0;k<FOLK_SUBJECTS.length;k++)if(FOLK_SUBJECTS[k].id===id)subjName=FOLK_SUBJECTS[k].name;
 var qi=Math.floor(Math.random()*bank.length),q=bank[qi];
 try{localStorage.setItem('cube_folk_quiz',JSON.stringify({subj:id,qi:qi}))}catch(e){}
 var w=folkEl('folkWho'),body=folkEl('folkBody');
 if(w)w.textContent='— folk school: '+subjName+'. sit up straight. —';
 if(!body)return;
 var h='lesson: '+subjName+'. chalk tastes like chalk.<br><br>'+q.q+'<br><br>';
 for(var i=0;i<q.a.length;i++)h+='<button class="folkBtn" data-ans="'+i+'" style="padding:3px 8px;font-size:11px">'+q.a[i]+'</button> ';
 body.innerHTML=h+'<br><br>choose wisely. the teacher is watching. the teacher is always watching.';
 var btns=null;try{btns=body.querySelectorAll('[data-ans]')}catch(e){}
 if(btns)for(var j=0;j<btns.length;j++)(function(b){b.onclick=function(){var p=0;try{p=parseInt(b.getAttribute('data-ans'),10)||0}catch(e){}folkAnswer(id,qi,p)}})(btns[j]);
}
function folkAnswer(subj,qi,picked){
 if(!folkActive)return;
 var bank=FOLK_QUIZ[subj];if(!bank||!bank[qi])return;
 var q=bank[qi],w=folkEl('folkWho'),body=folkEl('folkBody');
 if(picked===q.c){
  var grades=folkGrades();grades[subj]=true;
  try{localStorage.setItem('cube_folk_grades',JSON.stringify(grades))}catch(e){}
  folkSkillAdd(10);
  if(w)w.textContent='— folk school. correct. —';
  if(body)body.textContent='correct. the teacher nods. +10 skill. go outside and tell the valley.';
 }else{
  var det=0;try{det=parseInt(localStorage.getItem('cube_folk_detention')||'0',10)||0}catch(e){}
  det++;try{localStorage.setItem('cube_folk_detention',String(det))}catch(e){}
  if(w)w.textContent='— folk school. wrong. —';
  if(body)body.textContent='wrong. detention slip printed. slip #'+det+'. the printer jammed out of respect.';
  if(det>=3&&typeof ach==='function'){try{ach('folk_detention')}catch(e){}}
 }
 try{folkPanelDraw()}catch(e){}
}
function folkWx(){
 if(!folkActive)return null;
 try{
  var o=JSON.parse(localStorage.getItem('cube_folk_wxorder')||'null');
  if(!o||typeof o!=='object')return null;
  if(o.wx!=='clear'&&o.wx!=='drizzle'&&o.wx!=='pogo-storm')return null;
  if(typeof o.until!=='number'||Date.now()>=o.until){try{localStorage.removeItem('cube_folk_wxorder')}catch(e){}return null}
  return o.wx;
 }catch(e){return null}
}
var FOLK_WX_COST={clear:10,drizzle:15,'pogo-storm':25};
function folkWxPanel(){
 if(!folkActive)return '';
 var cur=folkWx(),left=0;
 if(cur){try{var o=JSON.parse(localStorage.getItem('cube_folk_wxorder'));left=Math.max(0,Math.ceil((o.until-Date.now())/1000))}catch(e){}}
 var pressure=0,orders=0;
 try{pressure=parseInt(localStorage.getItem('cube_folk_pressure')||'0',10)||0}catch(e){}
 try{orders=parseInt(localStorage.getItem('cube_folk_orders')||'0',10)||0}catch(e){}
 var h='<div>the weather machine. it does not predict. it decides.</div>';
 h+=cur?'<div>now showing: '+cur+' ('+left+'s left). please do not tap the sky.</div>':'<div>no order. the sky freelances.</div>';
 h+='<div>machine pressure: '+pressure+'. 0-2 safe. 3 is hubris.</div><div>orders placed: '+orders+'. the clouds remember.</div><div>each order lasts 90s. choose wisely. or loudly.</div><div style="margin-top:6px">';
 h+='<button class="folkBtn" data-wx="clear" style="padding:3px 8px;font-size:11px">order clear (10fp)</button> ';
 h+='<button class="folkBtn" data-wx="drizzle" style="padding:3px 8px;font-size:11px">order drizzle (15fp)</button> ';
 h+='<button class="folkBtn" data-wx="pogo-storm" style="padding:3px 8px;font-size:11px">order pogo-storm (25fp)</button></div>';
 return h+'<div style="opacity:.7">side effects may include: wind, regret, airborne folding chairs.</div>';
}
function folkWxWire(){
 if(!folkActive)return;
 var els=null;try{els=document.querySelectorAll('[data-wx]')}catch(e){}
 if(!els)return;
 for(var i=0;i<els.length;i++)(function(b){b.onclick=function(){var wx='';try{wx=b.getAttribute('data-wx')}catch(e){}folkWxOrder(wx)}})(els[i]);
}
function folkWxOrder(wx){
 if(!folkActive)return;
 if(wx!=='clear'&&wx!=='drizzle'&&wx!=='pogo-storm')return;
 var w=folkEl('folkWho'),b=folkEl('folkBody');
 if(folkWx()){if(w)w.textContent='— weather machine —';if(b)b.textContent='one weather at a time. the sky cannot multitask.';return}
 var cost=FOLK_WX_COST[wx],bal=0;
 try{if(typeof folkFpGet==='function')bal=folkFpGet()}catch(e){}
 if(bal<cost){if(w)w.textContent='— weather machine —';if(b)b.textContent='clouds cost money.';return}
 try{if(typeof folkFpAdd==='function')folkFpAdd(-cost)}catch(e){}
 try{localStorage.setItem('cube_folk_wxorder',JSON.stringify({wx:wx,until:Date.now()+90000}))}catch(e){}
 var pressure=0,orders=0;
 try{pressure=parseInt(localStorage.getItem('cube_folk_pressure')||'0',10)||0}catch(e){}
 try{orders=parseInt(localStorage.getItem('cube_folk_orders')||'0',10)||0}catch(e){}
 pressure++;orders++;
 try{localStorage.setItem('cube_folk_pressure',String(pressure))}catch(e){}
 try{localStorage.setItem('cube_folk_orders',String(orders))}catch(e){}
 var msg=wx==='clear'?'ordered clear skies. the clouds file a complaint.':(wx==='drizzle'?'ordered drizzle. umbrellas deploy.':'ordered a pogo-storm. everyone holds onto something.');
 if(orders>=5&&typeof ach==='function'){try{ach('folk_weatherman')}catch(e){}}
 if(pressure>=3){
  try{localStorage.setItem('cube_folk_wxorder',JSON.stringify({wx:'pogo-storm',until:Date.now()+300000}))}catch(e){}
  try{localStorage.setItem('cube_folk_pressure','0')}catch(e){}
  msg+=' BACKLASH. too much hubris. the machine seizes the sky for 5 minutes. everyone holds onto everything.';
  if(typeof ach==='function'){try{ach('folk_backlash')}catch(e){}}
 }
 if(w)w.textContent='— weather machine —';
 if(b)b.textContent=msg;
 try{folkPanelDraw()}catch(e){}
}
function folkHeatGet(){
 if(!folkActive)return 0;
 var h=0,at=0;
 try{h=parseInt(localStorage.getItem('cube_folk_heat')||'0',10)||0}catch(e){}
 try{at=parseInt(localStorage.getItem('cube_folk_heat_at')||'0',10)||0}catch(e){}
 var eff=at?Math.max(0,h-Math.floor((Date.now()-at)/600000)):h;
 try{localStorage.setItem('cube_folk_heat',String(eff))}catch(e){}
 try{localStorage.setItem('cube_folk_heat_at',String(Date.now()))}catch(e){}
 return eff;
}
function folkHeatAdd(n){
 if(!folkActive)return 0;
 var add=0;try{add=parseInt(n,10)||0}catch(e){}
 var eff=folkHeatGet()+add;if(eff<0)eff=0;
 if(eff>=100){
  try{localStorage.setItem('cube_folk_forged','{}')}catch(e){}
  try{localStorage.setItem('cube_folk_heat','0')}catch(e){}
  try{localStorage.setItem('cube_folk_heat_at',String(Date.now()))}catch(e){}
  try{localStorage.setItem('cube_folk_jail_until',String(Date.now()+600000))}catch(e){}
  try{var w=folkEl('folkWho');if(w)w.textContent='— shady shuck (gone) —'}catch(e){}
  try{var b=folkEl('folkBody');if(b)b.textContent='BUSTED. the clerk saw everything. forged permits confiscated. 10 min jail. shuck denies you.'}catch(e){}
  try{folkPanelDraw()}catch(e){}
  return 'busted';
 }
 try{localStorage.setItem('cube_folk_heat',String(eff))}catch(e){}
 try{localStorage.setItem('cube_folk_heat_at',String(Date.now()))}catch(e){}
 return eff;
}
var FOLK_SHADY=[
 {id:'forged-bounce',cost:15,heat:20,desc:'forged bounce permit. looks official. the police can tell. cosmetic. flex only.'},
 {id:'forged-fry',cost:15,heat:20,desc:'forged fry permit. extra crispy stamp. the police can tell. cosmetic. flex only.'},
 {id:'forged-nod',cost:15,heat:20,desc:'forged nod permit. solemn nod included. the police can tell. cosmetic. flex only.'},
 {id:'hotfp',cost:0,heat:15,desc:'hot fp. 20 skill -> 30 fp. no questions. some answers.'},
 {id:'lostmail',cost:10,heat:25,desc:'lost mailbox letter. open someone else\u2019s mail.'},
 {id:'hussintel',cost:25,heat:20,desc:'huss intel. the war board pays attention.'}
];
function folkForged(){try{var o=JSON.parse(localStorage.getItem('cube_folk_forged')||'{}');return (o&&typeof o==='object')?o:{}}catch(e){return{}}}
function folkShadyPanel(){
 if(!folkActive)return '';
 var heat=folkHeatGet(),forged=folkForged();
 var h='<div>behind the stamp office. shady shuck. definitely no relation to the clerk. stop asking.</div><div>heat: '+heat+'/100. busted at 100. heat decays 1 per 10min. the clerk forgets. slowly.</div><div style="margin:6px 0">bribery corner. subtle. loud.<br><button class="folkBtn" id="folkBribe" style="padding:3px 8px;font-size:11px">bribe heat down (-20 heat, 25fp)</button></div><div>goods. fell off a cart. onto another cart. then here.</div>';
 var items=[
  ['forged-bounce','forged bounce permit. 15fp. +20 heat.',forged['forged-bounce']?'owned. flex responsibly.':'<button class="folkBtn" data-shady="forged-bounce" style="padding:2px 8px;font-size:11px">buy (15fp)</button>'],
  ['forged-fry','forged fry permit. 15fp. +20 heat.',forged['forged-fry']?'owned. crunch with confidence.':'<button class="folkBtn" data-shady="forged-fry" style="padding:2px 8px;font-size:11px">buy (15fp)</button>'],
  ['forged-nod','forged nod permit. 15fp. +20 heat.',forged['forged-nod']?'owned. nod knowingly.':'<button class="folkBtn" data-shady="forged-nod" style="padding:2px 8px;font-size:11px">buy (15fp)</button>'],
  ['hotfp','hot fp. 20 skill -> 30 fp. +15 heat.','<button class="folkBtn" data-shady="hotfp" style="padding:2px 8px;font-size:11px">swap (20 skill)</button>'],
  ['lostmail','lost mailbox letter. 10fp. +25 heat.','<button class="folkBtn" data-shady="lostmail" style="padding:2px 8px;font-size:11px">open (10fp)</button>'],
  ['hussintel','huss intel. 25fp. +20 heat.','<button class="folkBtn" data-shady="hussintel" style="padding:2px 8px;font-size:11px">buy (25fp)</button>']
 ];
 for(var i=0;i<items.length;i++)h+='<div>'+items[i][1]+'<br>'+items[i][2]+'</div>';
 return h+'<div style="opacity:.7">shuck accepts fp, skill, and silence. mostly silence.</div>';
}
function folkShadyWire(){
 if(!folkActive)return;
 var bribe=folkEl('folkBribe');
 if(bribe)bribe.onclick=function(){
  if(!folkActive)return;
  var w=folkEl('folkWho'),b=folkEl('folkBody'),heat=folkHeatGet(),bal=0;
  try{if(typeof folkFpGet==='function')bal=folkFpGet()}catch(e){}
  if(heat<=0){if(w)w.textContent='— shady shuck —';if(b)b.textContent='clean. suspiciously clean.';try{folkPanelDraw()}catch(e){}return}
  if(bal<25){if(w)w.textContent='— shady shuck —';if(b)b.textContent='25fp or no bribe. shuck does not do layaway.';try{folkPanelDraw()}catch(e){}return}
  try{if(typeof folkFpAdd==='function')folkFpAdd(-25)}catch(e){}
  var nb=folkHeatAdd(-20);
  if(nb==='busted')return;
  if(typeof ach==='function'){try{ach('folk_bribe')}catch(e){}}
  if(w)w.textContent='— shady shuck —';
  if(b)b.textContent='bribe accepted. heat -20. the clerk saw nothing. probably.';
  try{folkPanelDraw()}catch(e){}
 };
 var list=null;try{list=document.querySelectorAll('[data-shady]')}catch(e){}
 if(!list)return;
 for(var i=0;i<list.length;i++)(function(btn){
  btn.onclick=function(){folkShadyBuy(btn)};
 })(list[i]);
}
function folkShadyBuy(btn){
 if(!folkActive)return;
 var id='';try{id=btn.getAttribute('data-shady')||''}catch(e){}
 if(!id)return;
 var w=folkEl('folkWho'),b=folkEl('folkBody'),bal=0;
 try{if(typeof folkFpGet==='function')bal=folkFpGet()}catch(e){}
 var need=id==='hotfp'?0:(id==='lostmail'?10:(id==='hussintel'?25:15));
 if(id!=='hotfp'&&bal<need){if(w)w.textContent='— shady shuck —';if(b)b.textContent='not enough fp. shuck does not do layaway.';try{folkPanelDraw()}catch(e){}return}
 if(id==='hotfp'){
  var ok=false;
  try{if(typeof skillState!=='undefined'&&skillState&&typeof skillSave==='function'){if((skillState.points||0)>=20){skillState.points-=20;skillSave();ok=true}}}catch(e){}
  if(!ok){if(w)w.textContent='— shady shuck —';if(b)b.textContent='not enough skill.';try{folkPanelDraw()}catch(e){}return}
  try{if(typeof folkFpAdd==='function')folkFpAdd(30)}catch(e){}
  if(folkHeatAdd(15)==='busted')return;
  if(w)w.textContent='— shady shuck —';if(b)b.textContent='20 skill -> 30 fp. warm. slightly humming. do not ask.';
  try{folkPanelDraw()}catch(e){}return;
 }
 if(id!=='hotfp')try{if(typeof folkFpAdd==='function')folkFpAdd(-need)}catch(e){}
 if(id==='lostmail'){
  if(folkHeatAdd(25)==='busted')return;
  var r=Math.random();
  if(r<0.6){try{if(typeof folkFpAdd==='function')folkFpAdd(5)}catch(e){}if(b)b.textContent='love letter. wrong address. keep it. +5fp.'}
  else if(r<0.9){try{if(typeof folkFpAdd==='function')folkFpAdd(10)}catch(e){}if(b)b.textContent='blackmail. tasteful. +10fp.'}
  else if(b)b.textContent='it was a coupon. for moss.';
  if(w)w.textContent='— shady shuck —';
  try{folkPanelDraw()}catch(e){}return;
 }
 if(id==='hussintel'){
  try{if(typeof folkWarBoost==='function')folkWarBoost(10)}catch(e){}
  if(folkHeatAdd(20)==='busted')return;
  if(w)w.textContent='— shady shuck —';
  if(b)b.textContent=(typeof folkWarBoost==='function')?'huss intel secured. the war board is listening. shuck was never here.':'+10 war attention. (the board nods.)';
  try{folkPanelDraw()}catch(e){}return;
 }
 var forged=folkForged(),hadAny=false;
 for(var k in forged)if(forged[k]){hadAny=true;break}
 forged[id]=1;
 try{localStorage.setItem('cube_folk_forged',JSON.stringify(forged))}catch(e){}
 if(folkHeatAdd(20)==='busted')return;
 if(!hadAny&&typeof ach==='function'){try{ach('folk_forgery')}catch(e){}}
 if(w)w.textContent='— shady shuck —';
 if(b)b.textContent='forged '+id.replace('forged-','')+' permit. looks real. the police can tell. everyone can tell. flex anyway.';
 try{folkPanelDraw()}catch(e){}
}
function folkWarBoost(n){
 if(!folkActive)return 0;
 var add=0;try{add=Math.floor(parseInt(n,10)||0)}catch(e){}
 var m=0;try{m=parseInt(localStorage.getItem('cube_folk_mischief')||'0',10)||0}catch(e){}
 m=Math.max(0,Math.min(100,m+add));
 try{localStorage.setItem('cube_folk_mischief',String(m))}catch(e){}
 var end=null;try{end=localStorage.getItem('cube_folk_war_end')}catch(e){}
 if(m>=100&&!end&&typeof folkWarEnd==='function')folkWarEnd('war');
 return m;
}
var FOLK_PRANKS=[
 {id:'gnome',name:'gnome relocation',cost:5,gain:12,line:'gnome relocated. huss blames wind. wind says nothing. mischief rises.'},
 {id:'flag',name:'flag swap',cost:8,gain:15,line:'flag swapped. their banner now says \'we love soup\'. morale damage: severe-ish.'},
 {id:'anthem',name:'anthem heckle',cost:10,gain:20,line:'anthem heckled. one majestic raspberry. their trumpeter quit on the spot.'}
];
var FOLK_OLIVE=[
 {id:'bread',name:'bread basket',cost:5,gain:12,line:'bread basket delivered. warm. suspiciously warm. they ate it anyway. diplomacy rises.'},
 {id:'nod',name:'formal nod',cost:8,gain:15,line:'formal nod executed. eye contact held 0.4 seconds too long. respect earned-ish.'},
 {id:'treaty',name:'treaty tea',cost:10,gain:20,line:'treaty tea poured. nobody poisoned anybody. a valley record. diplomacy soars.'}
];
function folkWarMeters(){var m=0,d=0;try{m=parseInt(localStorage.getItem('cube_folk_mischief')||'0',10)||0}catch(e){}try{d=parseInt(localStorage.getItem('cube_folk_diplomacy')||'0',10)||0}catch(e){}return{m:Math.max(0,Math.min(100,m)),d:Math.max(0,Math.min(100,d))}}
function folkWarEndGet(){try{return localStorage.getItem('cube_folk_war_end')}catch(e){return null}}
function folkWarPanel(){
 if(!folkActive)return '';
 var mt=folkWarMeters(),end=folkWarEndGet(),today='';
 try{today=new Date().toDateString()}catch(e){}
 var h='<div>the huss situation. it escalates.</div><div style="opacity:.7">mischief vs diplomacy. first to 100 decides the valley\'s fate. no pressure.</div><div>mischief: '+mt.m+'/100</div><div>diplomacy: '+mt.d+'/100</div>';
 if(end==='war'||end==='peace'){
  var tradeAt=0;try{tradeAt=parseInt(localStorage.getItem('cube_folk_trade_at')||'0',10)||0}catch(e){}
  var ready=tradeAt===0||(Date.now()-tradeAt)>=20*3600*1000;
  h+=end==='war'?'<div>war happened. the plaque is vague. celebrate anyway.</div><div style="opacity:.7">spoils: occasional trade caravan. they sell soup. do not ask what kind.</div>':'<div>treaty signed. eternal-ish peace. trade route open.</div><div style="opacity:.7">both sides agreed the soup was pretty good actually.</div>';
  h+=ready?'<button class="folkBtn" id="folkTrade" style="padding:3px 8px;font-size:11px">collect '+(end==='war'?'war spoils':'trade goods')+' (+15fp)</button>':'<div style="opacity:.7">caravan resting. check back later. horses are tired. you are tired.</div>';
  return h;
 }
 h+='<div style="margin-top:4px">pranks (one of each per day. restraint is for treaties):</div>';
 for(var i=0;i<FOLK_PRANKS.length;i++){var p=FOLK_PRANKS[i],used=false;try{used=localStorage.getItem('cube_folk_war_day_'+p.id)===today}catch(e){}h+=used?'<div>'+p.name+': used today. pace yourself, menace.</div>':'<div><button class="folkBtn" data-prank="'+p.id+'" style="padding:2px 8px;font-size:11px">'+p.name+' ('+p.cost+'fp, +'+p.gain+')</button></div>'}
 h+='<div style="margin-top:4px">olive branches (also one of each per day. diplomacy is exhausting):</div>';
 for(var j=0;j<FOLK_OLIVE.length;j++){var o=FOLK_OLIVE[j],used2=false;try{used2=localStorage.getItem('cube_folk_war_day_'+o.id)===today}catch(e){}h+=used2?'<div>'+o.name+': used today. go be grumpy elsewhere.</div>':'<div><button class="folkBtn" data-olive="'+o.id+'" style="padding:2px 8px;font-size:11px">'+o.name+' ('+o.cost+'fp, +'+o.gain+')</button></div>'}
 return h+'<div style="opacity:.7;margin-top:4px">first to 100 decides the valley\'s fate. choose wisely. or loudly.</div>';
}
function folkWarAct(list,key,btn){
 var id='';try{id=btn.getAttribute(list==='prank'?'data-prank':'data-olive')||''}catch(e){}
 if(!id)return;
 if(folkWarEndGet()==='war'||folkWarEndGet()==='peace'){var b0=folkEl('folkBody');if(b0)b0.textContent='it is over. the plaque is vague.';return}
 var found=null;for(var k=0;k<list.length;k++)if(list[k].id===id)found=list[k];
 if(!found)return;
 var today='';try{today=new Date().toDateString()}catch(e){}
 var used=false;try{used=localStorage.getItem('cube_folk_war_day_'+id)===today&&today!==''}catch(e){}
 if(used){var b1=folkEl('folkBody');if(b1)b1.textContent=key==='mischief'?'already pranked today. pace yourself, menace.':'already diplomatic today. go be grumpy elsewhere.';return}
 var bal=0;try{if(typeof folkFpGet==='function')bal=folkFpGet()}catch(e){}
 if(bal<found.cost){var b2=folkEl('folkBody');if(b2)b2.textContent='not enough fp for '+found.name+'. ('+bal+'/'+found.cost+')';return}
 try{if(typeof folkFpAdd==='function')folkFpAdd(-found.cost)}catch(e){}
 var mt=folkWarMeters(),nv=Math.min(100,mt[key]+found.gain);
 try{localStorage.setItem(key==='mischief'?'cube_folk_mischief':'cube_folk_diplomacy',String(nv))}catch(e){}
 try{if(today)localStorage.setItem('cube_folk_war_day_'+id,today)}catch(e){}
 var w=folkEl('folkWho'),b=folkEl('folkBody');
 if(w)w.textContent=key==='mischief'?'— valley rascal —':'— valley diplomat —';
 if(b)b.textContent=found.line+' ('+nv+'/100 '+(key==='mischief'?'mischief':'diplomacy')+')';
 if(nv>=100){folkWarEnd(key==='mischief'?'war':'peace');return}
 try{folkPanelDraw()}catch(e){}
}
function folkWarWire(){
 if(!folkActive)return;
 var pr=null;try{pr=document.querySelectorAll('[data-prank]')}catch(e){}
 if(pr)for(var i=0;i<pr.length;i++)(function(b){b.onclick=function(){folkWarAct(FOLK_PRANKS,'mischief',b)}})(pr[i]);
 var ol=null;try{ol=document.querySelectorAll('[data-olive]')}catch(e){}
 if(ol)for(var j=0;j<ol.length;j++)(function(b){b.onclick=function(){folkWarAct(FOLK_OLIVE,'diplomacy',b)}})(ol[j]);
 var tb=folkEl('folkTrade');
 if(tb)tb.onclick=function(){
  if(!folkActive)return;
  var last=0;try{last=parseInt(localStorage.getItem('cube_folk_trade_at')||'0',10)||0}catch(e){}
  var b=folkEl('folkBody');
  if(last!==0&&(Date.now()-last)<20*3600*1000){if(b)b.textContent='caravan still napping. horses asleep. soup cold. come back later.';return}
  try{localStorage.setItem('cube_folk_trade_at',String(Date.now()))}catch(e){}
  try{if(typeof folkFpAdd==='function')folkFpAdd(15)}catch(e){}
  var w=folkEl('folkWho');if(w)w.textContent='— trade caravan —';
  if(b)b.textContent='caravan arrived. traded vague goods for 15fp. soup included. do not ask.';
  try{folkPanelDraw()}catch(e){}
 };
}
function folkWarEnd(which){
 if(!folkActive)return;
 if(folkWarEndGet()==='war'||folkWarEndGet()==='peace')return;
 var w=folkEl('folkWho'),b=folkEl('folkBody');
 if(which==='peace'){
  try{localStorage.setItem('cube_folk_war_end','peace')}catch(e){}
  try{if(typeof folkFpAdd==='function')folkFpAdd(20)}catch(e){}
  if(typeof ach==='function'){try{ach('folk_peace')}catch(e){}}
  if(w)w.textContent='— treaty table —';
  if(b)b.textContent='treaty signed. eternal-ish peace. trade route open. both sides pretend the gnome thing never happened.';
  try{folkPanelDraw()}catch(e){}return;
 }
 if(which!=='war')return;
 var cuts=0,permits=0,evil=0,nods=0;
 try{var c=JSON.parse(localStorage.getItem('cube_folk_cuts')||'[]');if(c instanceof Array)cuts=c.length}catch(e){}
 try{var pm=JSON.parse(localStorage.getItem('cube_folk_permits')||'{}');if(pm&&typeof pm==='object'){for(var kk in pm)if(pm[kk])permits++}}catch(e){}
 try{evil=parseInt(localStorage.getItem('cube_folk_evil')||'0',10)||0}catch(e){}
 try{nods=parseInt(localStorage.getItem('cube_folk_nods')||'0',10)||0}catch(e){}
 var power=Math.max(0,cuts)+Math.max(0,permits)+Math.max(0,evil)+Math.floor(Math.max(0,nods)/10);
 var strength=8;try{var now=new Date(),start=new Date(now.getFullYear(),0,0);strength=8+(Math.floor((now-start)/86400000)%5)}catch(e){}
 if(power>=strength){
  try{localStorage.setItem('cube_folk_war_end','war')}catch(e){}
  try{if(typeof folkFpAdd==='function')folkFpAdd(100)}catch(e){}
  if(typeof ach==='function'){try{ach('folk_victory')}catch(e){}}
  if(w)w.textContent='— war plaque —';
  if(b)b.textContent='war. we won-ish. power '+power+' vs huss '+strength+'. +100fp. parade was just three gnomes and a trumpet.';
 }else{
  try{localStorage.setItem('cube_folk_mischief','60')}catch(e){}
  if(w)w.textContent='— retreat soup line —';
  if(b)b.textContent='we lost-ish. power '+power+' vs huss '+strength+'. regroup. re-prank. mischief reset to 60. soup for everyone.';
 }
 try{folkPanelDraw()}catch(e){}
}
var FOLK_RIVALS=[
 {name:'gubby',hook:'blinks twice. platform: blinking.'},
 {name:'mayor mop',hook:'is a mop. platform: absorbency.'},
 {name:'gerald the puddle',hook:'reflects well. platform: damp.'},
 {name:'tiny gary',hook:'very small. platform: being reachable.'}
];
function folkWeekId(){return Math.floor(Date.now()/604800000)}
function folkVotePanel(){
 if(!folkActive)return '';
 var wid=folkWeekId(),rival=FOLK_RIVALS[wid%4],votes=0,mayorUntil=0;
 try{votes=parseInt(localStorage.getItem('cube_folk_votes_'+wid)||'0',10)||0}catch(e){}
 try{mayorUntil=parseInt(localStorage.getItem('cube_folk_mayor_until')||'0',10)||0}catch(e){}
 var h='valley elections. every sunday-ish.<br>week '+wid+'. certified-ish.<br>rival this week: <b>'+rival.name+'</b>. '+rival.hook+'<br>your votes: <b>'+votes+'</b>.<br>';
 if(mayorUntil>Date.now()){
  var d='';try{d=new Date(mayorUntil).toLocaleString()}catch(e){}
  h+='YOU ARE THE MAYOR until '+d+'. stipend + pardon available.<br>the sash is sticky. power suits you. barely.<br><button class="folkBtn" id="folkStipend" style="padding:3px 8px;font-size:11px">collect stipend (+20fp, 20h)</button> <button class="folkBtn" id="folkPardon" style="padding:3px 8px;font-size:11px">pardon someone</button>';
 }else{
  h+='not mayor. fixable. probably.<br><button class="folkBtn" id="folkKiss" style="padding:3px 8px;font-size:11px">kiss babies. 5fp. +3 votes.</button> <button class="folkBtn" id="folkDebate" style="padding:3px 8px;font-size:11px">debate. free.</button> <button class="folkBtn" id="folkSmear" style="padding:3px 8px;font-size:11px">smear rival. free. +heat.</button><br><button class="folkBtn" id="folkElection" style="padding:3px 8px;font-size:11px">hold election (needs 10+ votes)</button>';
 }
 return h;
}
function folkVoteWire(){
 if(!folkActive)return;
 var k=folkEl('folkKiss'),d=folkEl('folkDebate'),s=folkEl('folkSmear'),e=folkEl('folkElection'),st=folkEl('folkStipend'),p=folkEl('folkPardon');
 if(k)k.onclick=function(){folkCampaign('kiss')};
 if(d)d.onclick=function(){folkCampaign('debate')};
 if(s)s.onclick=function(){folkCampaign('smear')};
 if(e)e.onclick=function(){folkElection()};
 if(st)st.onclick=function(){folkStipend()};
 if(p)p.onclick=function(){folkPardon()};
}
function folkCampaign(kind){
 if(!folkActive)return;
 var wid=folkWeekId(),key='cube_folk_votes_'+wid,votes=0;
 try{votes=parseInt(localStorage.getItem(key)||'0',10)||0}catch(e){}
 var rival=FOLK_RIVALS[wid%4],w=folkEl('folkWho'),b=folkEl('folkBody');
 if(kind==='kiss'){
  var fp=0;try{if(typeof folkFpGet==='function')fp=folkFpGet()}catch(e){}
  if(fp<5){if(w)w.textContent='— campaign trail —';if(b)b.textContent='need 5fp to kiss babies. babies accept bribes only.';try{folkPanelDraw()}catch(e){}return}
  try{if(typeof folkFpAdd==='function')folkFpAdd(-5)}catch(e){}
  votes+=3;
  if(w)w.textContent='— campaign trail —';if(b)b.textContent='kissed babies. +3 votes. babies now polling for you. total: '+votes+'.';
 }else if(kind==='debate'){
  var nods=0;try{nods=parseInt(localStorage.getItem('cube_folk_nods')||'0',10)||0}catch(e){}
  var gain=Math.max(1,Math.min(5,Math.floor(nods/20)+1)),rebut=1+Math.floor(Math.random()*3),net=Math.max(0,gain-rebut);
  votes+=net;
  if(w)w.textContent='— debate stage —';if(b)b.textContent='debated '+rival.name+'. you scored '+gain+'. rival rebuts '+rebut+'. net +'+net+' votes. total: '+votes+'.';
 }else if(kind==='smear'){
  votes+=4;
  var heat='?';try{if(typeof folkHeatAdd==='function')folkHeatAdd(15)}catch(e){};try{if(typeof folkHeatGet==='function')heat=folkHeatGet()}catch(e){}
  if(w)w.textContent='— smear desk —';if(b)b.textContent='smeared '+rival.name+'. +4 votes. +15 heat. heat now '+heat+'. total votes: '+votes+'.';
 }else return;
 try{localStorage.setItem(key,String(Math.max(0,votes)))}catch(e){}
 try{folkPanelDraw()}catch(e){}
}
function folkElection(){
 if(!folkActive)return;
 var wid=folkWeekId(),key='cube_folk_votes_'+wid,votes=0;
 try{votes=parseInt(localStorage.getItem(key)||'0',10)||0}catch(e){}
 var w=folkEl('folkWho'),b=folkEl('folkBody'),rival=FOLK_RIVALS[wid%4];
 if(votes<10){if(w)w.textContent='— election office —';if(b)b.textContent='need 10 votes. democracy has a cover charge. you have '+votes+'.';try{folkPanelDraw()}catch(e){}return}
 var strength=8+(wid%6)+Math.floor(Math.random()*5),ground=Math.floor(Math.random()*4);
 votes+=ground;
 try{localStorage.setItem(key,String(votes))}catch(e){}
 if(votes>=strength){
  try{localStorage.setItem('cube_folk_mayor_until',String(Date.now()+604800000))}catch(e){}
  if(typeof ach==='function'){try{ach('folk_mayor')}catch(e){}}
  if(w)w.textContent='— mayor you —';
  if(b)b.textContent='YOU ARE THE MAYOR. beat '+rival.name+' '+votes+' to '+strength+'. ground game +'+ground+'. sash incoming.';
 }else{
  if(w)w.textContent='— election office —';
  if(b)b.textContent='lost-ish to '+rival.name+' '+votes+' to '+strength+'. recount demanded. recount nodding.';
 }
 try{folkPanelDraw()}catch(e){}
}
function folkStipend(){
 if(!folkActive)return;
 var last=0;try{last=parseInt(localStorage.getItem('cube_folk_stipend_at')||'0',10)||0}catch(e){}
 var w=folkEl('folkWho'),b=folkEl('folkBody');
 if(Date.now()-last<72000000){if(b)b.textContent='treasury is closed. check back in '+Math.ceil((72000000-(Date.now()-last))/3600000)+'h. the vault is napping.';try{folkPanelDraw()}catch(e){}return}
 try{localStorage.setItem('cube_folk_stipend_at',String(Date.now()))}catch(e){}
 try{if(typeof folkFpAdd==='function')folkFpAdd(20)}catch(e){}
 if(w)w.textContent='— mayor stuff —';if(b)b.textContent='mayoral stipend. +20fp. the treasury weeps.';
 try{folkPanelDraw()}catch(e){}
}
function folkPardon(){
 if(!folkActive)return;
 var wid=folkWeekId(),w=folkEl('folkWho'),b=folkEl('folkBody'),flag=null,jail=null;
 try{flag=localStorage.getItem('cube_folk_pardoned_'+wid)}catch(e){}
 try{jail=localStorage.getItem('cube_folk_jail_until')}catch(e){}
 if(flag){if(b)b.textContent='already pardoned this term. mercy quota met.';try{folkPanelDraw()}catch(e){}return}
 if(!jail||parseInt(jail,10)<=Date.now()){if(w)w.textContent='— mercy desk —';if(b)b.textContent='no one to pardon. crime is down. suspicious.';try{folkPanelDraw()}catch(e){}return}
 try{localStorage.removeItem('cube_folk_jail_until')}catch(e){}
 try{localStorage.setItem('cube_folk_pardoned_'+wid,'1')}catch(e){}
 if(w)w.textContent='— mercy desk —';if(b)b.textContent='pardoned. democracy works. do not tell the guards.';
 try{folkPanelDraw()}catch(e){}
}
var FOLK_SEWER_LOOT=['found {f}fp behind a wet fry. do not wash it.','a rat paid you {f}fp in tolls. reverse tolls.','sold a damp button for {f}fp. market is weird down here.','fished {f}fp from the fry broth. broth-adjacent.','a pipe coughed up {f}fp. thanked the pipe.','mugged a puddle for {f}fp. puddle had it coming.'];
var FOLK_SEWER_HAZ=['slipped on a fry. lost half the sack. the sewers laugh.','a grumble eel taxed you. half the sack. standard.','stepped in narrative sludge. dropped half. evocative.','the dark burped. you dropped half. fair.','a wave of old soup. half gone. smells like lore.'];
var folkSewerCarry=0,folkSewerDepth=0;
function folkSewerPanel(){
 if(!folkActive)return '';
 var max=0,clog=null;
 try{max=parseInt(localStorage.getItem('cube_folk_sewer_max')||'0',10)||0}catch(e){}
 try{clog=localStorage.getItem('cube_folk_clog')}catch(e){}
 var h='the sewers. do not ask what flows. (fries.)<br>depth: '+folkSewerDepth+'. carrying: '+folkSewerCarry+'fp. max: '+max+'.<br>';
 h+=clog?'THE CLOG IS BEATEN. the pipes sing.<br>':'something clogs level 5. it breathes. rude.<br>';
 return h+'carry is not yours until banked. classic sewer rules.<br><button class="folkBtn" id="folkDescend" style="padding:3px 8px;font-size:11px">descend</button> <button class="folkBtn" id="folkSurface" style="padding:3px 8px;font-size:11px">surface + bank</button>';
}
function folkSewerWire(){
 if(!folkActive)return;
 var d=folkEl('folkDescend'),s=folkEl('folkSurface');
 if(d)d.onclick=function(){folkDescend()};
 if(s)s.onclick=function(){folkSurface()};
}
function folkDescend(){
 if(!folkActive)return;
 var w=folkEl('folkWho'),b=folkEl('folkBody'),clog=null;
 try{clog=localStorage.getItem('cube_folk_clog')}catch(e){}
 folkSewerDepth++;
 if(folkSewerDepth>=5&&!clog){
  var fp=0;try{if(typeof folkFpGet==='function')fp=folkFpGet()}catch(e){}
  if(fp<50){
   folkSewerCarry=Math.floor(folkSewerCarry/2);folkSewerDepth=0;
   if(w)w.textContent='— clog front —';if(b)b.textContent='the clog demands 50fp. you have lint. retreat. kept half: '+folkSewerCarry+'fp.';
   try{folkPanelDraw()}catch(e){}return;
  }
  try{if(typeof folkFpAdd==='function')folkFpAdd(-50)}catch(e){}
  try{localStorage.setItem('cube_folk_clog','1')}catch(e){}
  try{localStorage.setItem('cube_folk_sewer_max','5')}catch(e){}
  folkSewerCarry+=100;
  if(typeof ach==='function'){try{ach('folk_sewers')}catch(e){}}
  if(w)w.textContent='— clog front —';if(b)b.textContent='THE CLOG IS BEATEN. paid 50fp plunger fee. +100fp in the gunk. carry: '+folkSewerCarry+'fp. surface to bank.';
  try{folkPanelDraw()}catch(e){}return;
 }
 var max=0;try{max=parseInt(localStorage.getItem('cube_folk_sewer_max')||'0',10)||0}catch(e){}
 if(folkSewerDepth>max)try{localStorage.setItem('cube_folk_sewer_max',String(folkSewerDepth))}catch(e){}
 if(w)w.textContent='— sewer level '+folkSewerDepth+' —';
 if(Math.random()<0.7){
  var f=folkSewerDepth*3+Math.floor(Math.random()*5);
  folkSewerCarry+=f;
  if(b)b.textContent=FOLK_SEWER_LOOT[Math.floor(Math.random()*FOLK_SEWER_LOOT.length)].split('{f}').join(String(f))+' carry: '+folkSewerCarry+'fp.';
 }else{
  if(folkSewerCarry>0){folkSewerCarry=Math.floor(folkSewerCarry/2);if(b)b.textContent=FOLK_SEWER_HAZ[Math.floor(Math.random()*FOLK_SEWER_HAZ.length)]+' carry now '+folkSewerCarry+'fp.'}
  else if(b)b.textContent=FOLK_SEWER_HAZ[Math.floor(Math.random()*FOLK_SEWER_HAZ.length)]+' nothing to lose. the sewer respects that.';
 }
 try{folkPanelDraw()}catch(e){}
}
function folkSurface(){
 if(!folkActive)return;
 var w=folkEl('folkWho'),b=folkEl('folkBody'),n=folkSewerCarry;
 if(n>0)try{if(typeof folkFpAdd==='function')folkFpAdd(n)}catch(e){}
 folkSewerCarry=0;folkSewerDepth=0;
 if(w)w.textContent='— fresh air —';
 if(b)b.textContent=n>0?('surfaced with +'+n+'fp. sunlight. suspicious.'):'surfaced with nothing. the sun judges.';
 try{folkPanelDraw()}catch(e){}
}
var FOLK_TEAMS=[{id:'gubblers',name:'the gubblers'},{id:'boingers',name:'the boingers'},{id:'nodders',name:'the nodders'},{id:'huss',name:'huss united (boo)'}];
function folkSeasonId(){var d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)}
function folkTeamStr(teamId){var s=folkSeasonId()+teamId,h=0;for(var i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))%997;return h%10+1}
function folkMatchup(){var d=new Date(),seed=d.getFullYear()*372+(d.getMonth()+1)*31+d.getDate(),a=seed%4;return [FOLK_TEAMS[a].id,FOLK_TEAMS[(a+1+seed%3)%4].id]}
function folkTeamName(id){for(var i=0;i<FOLK_TEAMS.length;i++)if(FOLK_TEAMS[i].id===id)return FOLK_TEAMS[i].name;return id}
function folkLeaguePanel(){
 if(!folkActive)return '';
 var sid=folkSeasonId(),now=new Date(),today=sid+'-'+now.getDate();
 var pts={};try{pts=JSON.parse(localStorage.getItem('cube_folk_pts_'+sid)||'{}')||{}}catch(e){pts={}}
 var rows=[];
 for(var i=0;i<FOLK_TEAMS.length;i++){var id=FOLK_TEAMS[i].id,bc=0;try{bc=parseInt(localStorage.getItem('cube_folk_bets_'+sid+'_'+id)||'0',10)||0}catch(e){}rows.push({id:id,name:FOLK_TEAMS[i].name,str:folkTeamStr(id),pts:pts[id]||0,bets:bc})}
 rows.sort(function(a,b){return b.str-a.str||b.pts-a.pts});
 var m=folkMatchup(),sa=folkTeamStr(m[0]),sb=folkTeamStr(m[1]);
 var ow=Math.max(1,Math.min(4,1+Math.round(Math.abs(sa-sb)/3)));
 var h='bounceball league ('+sid+'). monthly. nobody asked for this.<br>';
 for(i=0;i<rows.length;i++)h+=rows[i].name+': '+rows[i].str+' str, '+rows[i].pts+' pts (your bets: '+rows[i].bets+')<br>';
 h+='today: '+folkTeamName(m[0])+' (x'+(sa>=sb?1:ow)+') vs '+folkTeamName(m[1])+' (x'+(sb>=sa?1:ow)+'). ball is round. players are not.<br>';
 var bd='';try{bd=localStorage.getItem('cube_folk_bet_day')||''}catch(e){}
 if(bd===today)h+='bet placed. no take-backs.<br>';
 else h+='<button class="folkBtn" data-bet="'+m[0]+'" style="padding:3px 8px;font-size:11px">bet '+folkTeamName(m[0])+' 10fp</button> <button class="folkBtn" data-bet="'+m[1]+'" style="padding:3px 8px;font-size:11px">bet '+folkTeamName(m[1])+' 10fp</button><br>10fp per bet. underdog pays more. trust.<br>';
 var win='';try{win=localStorage.getItem('cube_folk_season_'+sid)||''}catch(e){}
 h+=win?('season winner: '+folkTeamName(win)+'. parade was 4 guys.<br>'):'no champion yet. first to 12 pts takes it.<br>';
 return h;
}
function folkLeagueWire(){
 if(!folkActive)return;
 var els=null;try{els=document.querySelectorAll('[data-bet]')}catch(e){}
 if(!els)return;
 for(var i=0;i<els.length;i++)(function(b){if(b.addEventListener)b.addEventListener('click',function(){var t='';try{t=b.getAttribute('data-bet')}catch(e){}folkBet(t)});else b.onclick=function(){var t='';try{t=b.getAttribute('data-bet')}catch(e){}folkBet(t)}})(els[i]);
}
function folkBet(teamId){
 if(!folkActive)return;
 var valid=false,i;for(i=0;i<FOLK_TEAMS.length;i++)if(FOLK_TEAMS[i].id===teamId)valid=true;
 if(!valid)return;
 var now=new Date(),today=folkSeasonId()+'-'+now.getDate(),sid=folkSeasonId();
 var w=folkEl('folkWho'),b=folkEl('folkBody');
 var bd='';try{bd=localStorage.getItem('cube_folk_bet_day')||''}catch(e){}
 if(bd===today){if(b)b.textContent='bet placed. no take-backs.';return}
 var bal=0;try{if(typeof folkFpGet==='function')bal=folkFpGet()}catch(e){}
 if(bal<10){if(b)b.textContent='need 10fp to bet. the bookie laughs quietly.';return}
 try{if(typeof folkFpAdd==='function')folkFpAdd(-10)}catch(e){}
 try{localStorage.setItem('cube_folk_bet_day',today)}catch(e){}
 var m=folkMatchup(),sa=folkTeamStr(m[0]),sb=folkTeamStr(m[1]);
 var ow=Math.max(1,Math.min(4,1+Math.round(Math.abs(sa-sb)/3)));
 var winner=Math.random()<sa/(sa+sb)?m[0]:m[1];
 var fav=sa===sb?'':(sa>sb?m[0]:m[1]);
 var wodd=(sa===sb||winner===fav)?1:ow;
 var h='first bounce: '+folkTeamName(m[0])+' bonks '+folkTeamName(m[1])+' into the mud.<br>halftime: the ball is just vibrating. nobody knows why.<br>final: '+folkTeamName(winner)+' wins. score kept on a napkin.<br>';
 if(teamId===winner){
  var pay=10*wodd;
  try{if(typeof folkFpAdd==='function')folkFpAdd(pay)}catch(e){}
  h+='you picked '+folkTeamName(winner)+'. +'+pay+'fp. the bookie weeps.<br>';
  var wins=0;try{wins=parseInt(localStorage.getItem('cube_folk_betwins')||'0',10)||0}catch(e){}
  wins++;try{localStorage.setItem('cube_folk_betwins',String(wins))}catch(e){}
  if(wins>=5&&typeof ach==='function'){try{ach('folk_bettor')}catch(e){}}
  if(wodd>=3&&typeof ach==='function'){try{ach('folk_mvp')}catch(e){}}
 }else h+='you picked wrong. the bookie pockets your 10fp. classic.<br>';
 var cnt=0;try{cnt=parseInt(localStorage.getItem('cube_folk_bets_'+sid+'_'+teamId)||'0',10)||0}catch(e){}
 try{localStorage.setItem('cube_folk_bets_'+sid+'_'+teamId,String(cnt+1))}catch(e){}
 var pts={};try{pts=JSON.parse(localStorage.getItem('cube_folk_pts_'+sid)||'{}')||{}}catch(e){pts={}}
 pts[winner]=(pts[winner]||0)+3;
 try{localStorage.setItem('cube_folk_pts_'+sid,JSON.stringify(pts))}catch(e){}
 if((pts[winner]||0)>=12){
  try{localStorage.setItem('cube_folk_season_'+sid,winner)}catch(e){}
  var best='',bestn=-1;
  for(i=0;i<FOLK_TEAMS.length;i++){var cc=0;try{cc=parseInt(localStorage.getItem('cube_folk_bets_'+sid+'_'+FOLK_TEAMS[i].id)||'0',10)||0}catch(e){}if(cc>bestn){bestn=cc;best=FOLK_TEAMS[i].id}}
  if(best===winner&&bestn>0){if(typeof ach==='function'){try{ach('folk_champion')}catch(e){}}h+='parade: confetti made of shredded losing tickets. you called it.<br>'}
  else h+='season over. '+folkTeamName(winner)+' champions. your loyalty meant nothing.<br>';
 }
 if(w)w.textContent='— bounceball bookie. no refunds. —';
 if(b)b.innerHTML=h;
 try{folkPanelDraw()}catch(e){}
}
var FOLK_PETS=[{id:'pup',name:'folk pup',cost:30,blurb:'barks in stamps.'},{id:'kitten',name:'air kitten',cost:30,blurb:'floats. judges. floats.'},{id:'gyroidling',name:'pocket gyroid',cost:50,blurb:'gyroids pocket-sized. rhythm included.'}];
function folkPetGet(){
 if(!folkActive)return null;
 try{
  var p=JSON.parse(localStorage.getItem('cube_folk_pet')||'null');
  if(!p||!p.id)return null;
  var now=Date.now();
  p.full=Math.max(0,(p.full||0)-Math.floor((now-(p.fed_at||now))/3600000)*5);
  p.happy=Math.max(0,(p.happy||0)-Math.floor((now-(p.played_at||now))/3600000)*5);
  return p;
 }catch(e){return null}
}
function folkPetXp(n){
 if(!folkActive)return 1;
 var p=folkPetGet();if(!p)return 1;
 p.xp=(p.xp||0)+n;p.lvl=Math.max(1,1+Math.floor(p.xp/20));
 try{localStorage.setItem('cube_folk_pet',JSON.stringify(p))}catch(e){}
 return p.lvl;
}
function folkPetName(id){for(var i=0;i<FOLK_PETS.length;i++)if(FOLK_PETS[i].id===id)return FOLK_PETS[i].name;return id}
function folkPetPanel(){
 if(!folkActive)return;
 var w=folkEl('folkWho'),b=folkEl('folkBody');if(!w||!b)return;
 var p=folkPetGet();
 if(!p){
  var h='<div>no pet. bold choice. lonely, but bold.</div><div>name it: <input id="folkPetName" maxlength="20" placeholder="or dont." style="background:#0e1a0b;border:1px solid #3a5a2a;color:#c8e0a8;font-family:Consolas,monospace;font-size:11px;padding:2px 6px"></div>';
  for(var i=0;i<FOLK_PETS.length;i++){var s=FOLK_PETS[i];h+='<div>'+s.name+' ('+s.cost+'fp). '+s.blurb+' <button class="folkBtn" data-adopt="'+s.id+'" style="padding:2px 8px;font-size:11px">adopt. no returns.</button></div>'}
  w.textContent='— pet adoption. bleak kennel. —';b.innerHTML=h;
 }else{
  w.textContent='— your pet. it lives here now. —';
  b.innerHTML='<div><b>'+String(p.name).slice(0,20)+'</b> ('+folkPetName(p.id)+') lvl '+(p.lvl||1)+'</div><div>full: '+(p.full||0)+'/100. happy: '+(p.happy||0)+'/100. xp: '+(p.xp||0)+'</div><div style="opacity:.7">neglect is tracked hourly. -5/hr. brutal.</div><button class="folkBtn" id="folkFeed" style="padding:3px 8px;font-size:11px">feed. 5fp. +20 full.</button> <button class="folkBtn" id="folkPlay" style="padding:3px 8px;font-size:11px">play. free. +15 happy.</button> <button class="folkBtn" id="folkShow" style="padding:3px 8px;font-size:11px">enter pet show. sunday-ish.</button>';
 }
 folkPetWire();
}
function folkPetWire(){
 if(!folkActive)return;
 var ad=null;try{ad=document.querySelectorAll('[data-adopt]')}catch(e){}
 if(ad)for(var i=0;i<ad.length;i++)(function(btn){btn.onclick=function(){
  if(!folkActive)return;
  var id='';try{id=btn.getAttribute('data-adopt')}catch(e){}
  var s=null;for(var j=0;j<FOLK_PETS.length;j++)if(FOLK_PETS[j].id===id)s=FOLK_PETS[j];
  if(!s)return;
  var b=folkEl('folkBody');
  if(folkPetGet()){if(b)b.textContent='one pet already. greedy.';return}
  var bal=0;try{if(typeof folkFpGet==='function')bal=folkFpGet()}catch(e){}
  if(bal<s.cost){if(b)b.textContent='not enough fp. pet pretends not to see you.';return}
  try{if(typeof folkFpAdd==='function')folkFpAdd(-s.cost)}catch(e){}
  var nm=s.name;try{var inp=folkEl('folkPetName');if(inp&&inp.value&&inp.value.replace(/^\s+|\s+$/g,''))nm=inp.value.replace(/^\s+|\s+$/g,'').slice(0,20)}catch(e){}
  try{localStorage.setItem('cube_folk_pet',JSON.stringify({id:s.id,name:nm,full:80,happy:80,lvl:1,xp:0,fed_at:Date.now(),played_at:Date.now()}))}catch(e){}
  if(typeof ach==='function'){try{ach('folk_pet')}catch(e){}}
  if(b)b.textContent='adopted '+nm+'. it already judges you.';
  try{folkPanelDraw()}catch(e){}
 }})(ad[i]);
 var feed=folkEl('folkFeed'),play=folkEl('folkPlay'),show=folkEl('folkShow');
 if(feed)feed.onclick=function(){
  if(!folkActive)return;
  var p=folkPetGet();if(!p)return;
  var b=folkEl('folkBody'),bal=0;try{if(typeof folkFpGet==='function')bal=folkFpGet()}catch(e){}
  if(bal<5){if(b)b.textContent='no fp. pet eats air.';return}
  try{if(typeof folkFpAdd==='function')folkFpAdd(-5)}catch(e){}
  var old=p.lvl||1;p.full=Math.min(100,(p.full||0)+20);p.fed_at=Date.now();
  try{localStorage.setItem('cube_folk_pet',JSON.stringify(p))}catch(e){}
  var nl=folkPetXp(5);
  if(b)b.textContent=nl>old?('fed. level up! lvl '+nl+'. still begs.'):('fed. full: '+p.full+'/100. crumbs everywhere.');
  try{folkPanelDraw()}catch(e){}
 };
 if(play)play.onclick=function(){
  if(!folkActive)return;
  var last=0;try{last=parseInt(localStorage.getItem('cube_folk_played_at')||'0',10)||0}catch(e){}
  var b=folkEl('folkBody');
  if(Date.now()-last<3600000){if(b)b.textContent='tired. cooldown. even pets have boundaries.';return}
  var p=folkPetGet();if(!p)return;
  var old=p.lvl||1;p.happy=Math.min(100,(p.happy||0)+15);p.played_at=Date.now();
  try{localStorage.setItem('cube_folk_pet',JSON.stringify(p))}catch(e){}
  try{localStorage.setItem('cube_folk_played_at',String(Date.now()))}catch(e){}
  var nl=folkPetXp(5);
  if(b)b.textContent=nl>old?('played. level up! lvl '+nl+'. exhausting.'):('played. happy: '+p.happy+'/100. worth it.');
  try{folkPanelDraw()}catch(e){}
 };
 if(show)show.onclick=function(){folkPetShow()};
}
function folkPetShow(){
 if(!folkActive)return;
 var b=folkEl('folkBody');
 var wk=Math.floor(Date.now()/604800000),key='cube_folk_show_'+wk,seen=null;
 try{seen=localStorage.getItem(key)}catch(e){}
 if(seen){if(b)b.textContent='already entered this week. no encore.';return}
 var p=folkPetGet();if(!p)return;
 var score=(p.lvl||1)*10+(p.full||0)/10+(p.happy||0)/10+Math.random()*20;
 var ws=''+wk,seed=0;for(var k=0;k<ws.length;k++)seed=(seed*31+ws.charCodeAt(k))%100000;
 var rivals=[],s0=seed+7;
 for(var r=0;r<3;r++){s0=(s0*1103515245+12345)%2147483648;rivals.push(20+(s0/2147483648)*40)}
 var place=1;for(r=0;r<3;r++)if(rivals[r]>score)place++;
 try{localStorage.setItem(key,'1')}catch(e){}
 if(!b)return;
 if(place===1){
  try{if(typeof folkFpAdd==='function')folkFpAdd(30)}catch(e){}
  if(typeof ach==='function'){try{ach('folk_bestinshow')}catch(e){}}
  b.textContent='best in show. parade held. '+p.name+' scored '+Math.floor(score)+'. rivals wept.';
 }else b.textContent='placed #'+place+'. scored '+Math.floor(score)+' vs '+Math.floor(rivals[0])+'/'+Math.floor(rivals[1])+'/'+Math.floor(rivals[2])+'. try less shame next week.';
 try{folkPanelDraw()}catch(e){}
}
var FOLK_LORE=[
 {id:'arrival',need:'wander 50 times',title:'i. arrival',text:'before the valley had a name, the cube bounced wrong and landed here. the first folk unfolded out of the dent and decided the grass was good enough. there was no stamp yet, no sea, no mayor. just one small voice that said stay, so they stayed.'},
 {id:'stamp',need:'get chopped once',title:'ii. the stamp',text:'for a while every folk was just folk, and it was chaos. then the second founder carved a stamp from a bottleneck and started pressing words into foreheads. GOOD meant stayed still. BROKEN meant bounced funny. it was never accurate, but everyone calmed down once they had a word.'},
 {id:'sea',need:'do one evil act',title:'iii. the sea',text:'the sea is not water. it is the flat shiny place at the edge where all the missed bounces collect and keep rippling. if you stare long enough it stares back with your own face, slightly delayed. the founders agreed never to drink from it, and never said why.'},
 {id:'huss',need:'meet the night folk',title:'iv. the huss split',text:'once there was only one valley, day and night stitched together. then one folk named huss stayed awake three nights watching the sea and came back doubled. half of them remembered morning and half remembered only night. the valley tore quietly down the middle so both could be right.'},
 {id:'visitor',need:'reach sewer depth 3',title:'v. the visitor',text:'only once did someone come from outside. they wore hard shoes and did not bounce at all, they just walked. they asked where the edge was, and when told there was not one, they laughed and left a footprint that never faded. the founders built the archive over it so nobody would step in it twice.'},
 {id:'treatment',need:'become mayor once',title:'vi. the treatment',text:'the treatment is a small white room behind the mayor shed. BROKEN folk go in and sit very still while the hum takes the wobble out. they come back smoother and quieter and easier to stamp. nobody remembers what the hum says, but everyone hums it for days after.'},
 {id:'sorting',need:'end the war',title:'vii. the sorting',text:'the sorting was wrong from the start and the founders knew it. GOOD and BROKEN and PURE EVIL never described anyone, but true names would have been too loud to live with. so they kept the wrong words on purpose, like a fence that stops nothing but reminds you where the edge should be. if you are reading this, you already know your stamp is a lie.'}
];
function folkLoreMet(id){
 try{
  if(id==='arrival'){var n=parseInt(localStorage.getItem('cube_folk_wanders')||'0',10);return n>=50}
  if(id==='stamp'){var c=JSON.parse(localStorage.getItem('cube_folk_cuts')||'[]');return (c instanceof Array)&&c.length>=1}
  if(id==='sea'){var e=parseInt(localStorage.getItem('cube_folk_evil')||'0',10);return e>=1}
  if(id==='huss'){var nm=parseInt(localStorage.getItem('cube_folk_nightmet')||'0',10);return nm>=1}
  if(id==='visitor'){var s=parseInt(localStorage.getItem('cube_folk_sewer_max')||'0',10);return s>=3}
  if(id==='treatment')return !!localStorage.getItem('cube_folk_mayor_until');
  if(id==='sorting')return !!localStorage.getItem('cube_folk_war_end');
 }catch(e){}
 return false;
}
function folkLoreFound(){try{var f=JSON.parse(localStorage.getItem('cube_folk_lore')||'[]');return (f instanceof Array)?f:[]}catch(e){return[]}}
function folkLorePanel(){
 if(!folkActive)return;
 var w=folkEl('folkWho'),b=folkEl('folkBody');if(!w||!b)return;
 var found=folkLoreFound(),h='the founders archive. dust included.<br><br>';
 for(var i=0;i<FOLK_LORE.length;i++){
  var p=FOLK_LORE[i];
  if(found.indexOf(p.id)!==-1)h+=p.title+' <button class="folkBtn" data-page="'+p.id+'" style="padding:2px 8px;font-size:11px">read</button><br>';
  else if(folkLoreMet(p.id))h+='NEW. the page hums. <button class="folkBtn" data-page="'+p.id+'" style="padding:2px 8px;font-size:11px">read</button><br>';
  else h+='???. (hint: '+p.need+')<br>';
 }
 w.textContent='— the founders archive —';b.innerHTML=h;
 folkLoreWire();
}
function folkLoreWire(){
 if(!folkActive)return;
 var b=folkEl('folkBody');if(!b)return;
 var btns=null;try{btns=b.querySelectorAll('[data-page]')}catch(e){}
 if(!btns)return;
 for(var i=0;i<btns.length;i++)(function(btn){btn.onclick=function(){
  if(!folkActive)return;
  var pid='';try{pid=btn.getAttribute('data-page')}catch(e){}
  var page=null;for(var j=0;j<FOLK_LORE.length;j++)if(FOLK_LORE[j].id===pid)page=FOLK_LORE[j];
  if(!page)return;
  var bb=folkEl('folkBody');
  if(!folkLoreMet(pid)){if(bb)bb.textContent='the page is blank until you '+page.need+'.';try{folkPanelDraw()}catch(e){}return}
  var found=folkLoreFound();
  if(found.indexOf(pid)===-1){found.push(pid);try{localStorage.setItem('cube_folk_lore',JSON.stringify(found))}catch(e){}}
  var html=page.title+'<br><br>'+page.text;
  if(found.length>=7){if(typeof ach==='function'){try{ach('folk_archivist')}catch(e){}}html+='<br><br>the archive is complete. the valley feels watched. good.'}
  if(bb)bb.innerHTML=html;
  try{folkPanelDraw()}catch(e){}
 }})(btns[i]);
}
var FOLK_HUTS=[
 {id:'moss',name:'moss hut',cost:100,blurb:'damp. cozy. damp.'},
 {id:'loft',name:'pogo loft',cost:250,blurb:'bounces gently. sleep is optional.'},
 {id:'shack',name:'sea shack',cost:400,blurb:'ocean-ish adjacent. salt included.'}
];
var FOLK_FURN=[
 {id:'mat',name:'nap mat',cost:40,bonus:5},
 {id:'lamp',name:'glow lamp',cost:60,bonus:8},
 {id:'rug',name:'lucky rug',cost:90,bonus:12}
];
var FOLK_NEIGHBORS=[
 'gubby borrows sugar. returns the spoon. {g}',
 'neighbor cat inspects your hut. finds it dusty. {g}',
 'ekber leaves fries by the door. still warm. {g}',
 'moss troll compliments your walls. licks one. {g}',
 'pogo kid bounces past. waves mid-air. {g}',
 'old folk naps on your step. snores politely. {g}'
];
function folkHutDef(id){for(var i=0;i<FOLK_HUTS.length;i++)if(FOLK_HUTS[i].id===id)return FOLK_HUTS[i];return null}
function folkFurnMap(){try{var m=JSON.parse(localStorage.getItem('cube_folk_furn')||'{}');return (m&&typeof m==='object')?m:{}}catch(e){return{}}}
function folkHomePanel(){
 if(!folkActive)return;
 var w=folkEl('folkWho'),b=folkEl('folkBody');if(!w||!b)return;
 var hut=null;try{hut=localStorage.getItem('cube_folk_hut')}catch(e){}
 var bal=0;try{if(typeof folkFpGet==='function')bal=folkFpGet()}catch(e){}
 w.textContent='— housing office —';
 if(!hut){
  var h='no hut. homeless but free. fp: '+bal+'.<br>';
  for(var i=0;i<FOLK_HUTS.length;i++)h+='<div>'+FOLK_HUTS[i].name+' - '+FOLK_HUTS[i].cost+'fp. '+FOLK_HUTS[i].blurb+' <button class="folkBtn" data-hut="'+FOLK_HUTS[i].id+'" style="padding:2px 8px;font-size:11px">buy</button></div>';
  b.innerHTML=h+'<div>one hut at a time. moving is allowed. furniture stays behind. harsh.</div>';
  folkHomeWire();return;
 }
 var cur=folkHutDef(hut)||FOLK_HUTS[0];
 var owned=(folkFurnMap()[cur.id] instanceof Array)?folkFurnMap()[cur.id]:[],bonus=0,j;
 for(j=0;j<FOLK_FURN.length;j++)if(owned.indexOf(FOLK_FURN[j].id)>=0)bonus+=FOLK_FURN[j].bonus;
 var h2='home: '+cur.name+'. '+cur.blurb+'<br><div>fp: '+bal+'. rest bonus: +'+bonus+'fp. moving is allowed. furniture stays behind.</div>';
 for(j=0;j<FOLK_FURN.length;j++){
  if(owned.indexOf(FOLK_FURN[j].id)>=0)h2+='<div>'+FOLK_FURN[j].name+' - placed. +'+FOLK_FURN[j].bonus+'fp per rest.</div>';
  else h2+='<div>'+FOLK_FURN[j].name+' - '+FOLK_FURN[j].cost+'fp. +'+FOLK_FURN[j].bonus+'fp per rest. <button class="folkBtn" data-furn="'+FOLK_FURN[j].id+'" style="padding:2px 8px;font-size:11px">buy</button></div>';
 }
 var restAt=0;try{restAt=parseInt(localStorage.getItem('cube_folk_rest_at')||'0',10)||0}catch(e){}
 if(Date.now()-restAt>=20*3600*1000)h2+='<div>bed is ready. <button class="folkBtn" id="folkRest" style="padding:3px 8px;font-size:11px">rest (+10fp + furniture bonus)</button></div>';
 else{var left=20*3600*1000-(Date.now()-restAt);h2+='<div>bed is tired too. back in '+Math.floor(left/3600000)+'h '+Math.floor((left%3600000)/60000)+'m. even huts need naps.</div>'}
 var neighbor='';try{neighbor=localStorage.getItem('cube_folk_neighbor')||''}catch(e){}
 h2+='<div>neighbor: '+(neighbor||'no visitors yet. empty step. sad.')+'</div><div>move: ';
 for(var m=0;m<FOLK_HUTS.length;m++)if(FOLK_HUTS[m].id!==cur.id)h2+='<button class="folkBtn" data-hut="'+FOLK_HUTS[m].id+'" style="padding:2px 8px;font-size:11px">move to '+FOLK_HUTS[m].name+' ('+FOLK_HUTS[m].cost+'fp)</button> ';
 b.innerHTML=h2+'</div>';
 folkHomeWire();
}
function folkHomeWire(){
 if(!folkActive)return;
 var b=folkEl('folkBody');if(!b)return;
 var hb=null;try{hb=b.querySelectorAll('[data-hut]')}catch(e){}
 if(hb)for(var i=0;i<hb.length;i++)(function(btn){btn.onclick=function(){
  if(!folkActive)return;
  var id='';try{id=btn.getAttribute('data-hut')}catch(e){}
  var def=folkHutDef(id);if(!def)return;
  var bb=folkEl('folkBody'),bal=0;try{if(typeof folkFpGet==='function')bal=folkFpGet()}catch(e){}
  if(bal<def.cost){if(bb){var d=document.createElement('div');d.textContent='not enough fp. the landlord pretends not to see you.';bb.appendChild(d)}return}
  try{if(typeof folkFpAdd==='function')folkFpAdd(-def.cost)}catch(e){}
  try{localStorage.setItem('cube_folk_hut',id)}catch(e){}
  if(typeof ach==='function'){try{ach('folk_homeowner')}catch(e){}}
  try{folkPanelDraw()}catch(e){}
  var bb2=folkEl('folkBody');if(bb2){var d2=document.createElement('div');d2.textContent='moved. furniture stayed behind. it misses you. probably.';bb2.appendChild(d2);folkHomeWire()}
 }})(hb[i]);
 var fb=null;try{fb=b.querySelectorAll('[data-furn]')}catch(e){}
 if(fb)for(var j=0;j<fb.length;j++)(function(btn){btn.onclick=function(){
  if(!folkActive)return;
  var id='';try{id=btn.getAttribute('data-furn')}catch(e){}
  var hut=null;try{hut=localStorage.getItem('cube_folk_hut')}catch(e){}
  if(!hut)return;
  var cost=0;for(var k=0;k<FOLK_FURN.length;k++)if(FOLK_FURN[k].id===id)cost=FOLK_FURN[k].cost;
  var map=folkFurnMap(),list=(map[hut] instanceof Array)?map[hut]:[];
  if(list.indexOf(id)>=0)return;
  var bal=0;try{if(typeof folkFpGet==='function')bal=folkFpGet()}catch(e){}
  if(bal<cost)return;
  try{if(typeof folkFpAdd==='function')folkFpAdd(-cost)}catch(e){}
  list.push(id);map[hut]=list;
  try{localStorage.setItem('cube_folk_furn',JSON.stringify(map))}catch(e){}
  var full=true;for(k=0;k<FOLK_FURN.length;k++)if(list.indexOf(FOLK_FURN[k].id)<0)full=false;
  if(full&&typeof ach==='function'){try{ach('folk_decorator')}catch(e){}}
  try{folkPanelDraw()}catch(e){}
  folkHomePanel();
 }})(fb[j]);
 var rest=null;try{rest=b.querySelector('#folkRest')}catch(e){}
 if(rest)rest.onclick=function(){
  if(!folkActive)return;
  var restAt=0;try{restAt=parseInt(localStorage.getItem('cube_folk_rest_at')||'0',10)||0}catch(e){}
  if(Date.now()-restAt<20*3600*1000)return;
  var hut=null;try{hut=localStorage.getItem('cube_folk_hut')}catch(e){}
  if(!hut)return;
  var list=(folkFurnMap()[hut] instanceof Array)?folkFurnMap()[hut]:[],bonus=0;
  for(var j=0;j<FOLK_FURN.length;j++)if(list.indexOf(FOLK_FURN[j].id)>=0)bonus+=FOLK_FURN[j].bonus;
  var pay=10+bonus;
  try{if(typeof folkFpAdd==='function')folkFpAdd(pay)}catch(e){}
  try{localStorage.setItem('cube_folk_rest_at',String(Date.now()))}catch(e){}
  var msg='rested. +'+pay+'fp. woke up slightly more folk.';
  if(Math.random()<0.25){
   var line=FOLK_NEIGHBORS[Math.floor(Math.random()*FOLK_NEIGHBORS.length)],gtxt='no gift. rude but fair.';
   if(Math.random()<0.4){var gift=3+Math.floor(Math.random()*3);try{if(typeof folkFpAdd==='function')folkFpAdd(gift)}catch(e){}gtxt='+'+gift+'fp snack. nice.'}
   line=line.split('{g}').join(gtxt);
   try{localStorage.setItem('cube_folk_neighbor',line)}catch(e){}
   msg+=' visitor: '+line;
  }else msg+=' no visitors. peaceful. suspiciously peaceful.';
  var bb=folkEl('folkBody');if(bb)bb.textContent=msg;
  try{folkPanelDraw()}catch(e){}
  folkHomePanel();
 };
}
var FOLK_RECIPES=[
 {id:'soup',name:'soup-ish',cost:5,skill:5,need:null,needDesc:'',line:'lukewarm brown water. ekber calls it soup. it counts.'},
 {id:'nod',name:'nod noodles',cost:8,skill:8,need:'nods',needDesc:'needs: 10 nods',line:'noodles that nod back. chewy with approval.'},
 {id:'stamp',name:'stamp stew',cost:12,skill:12,need:'permits',needDesc:'needs: 1 permit stamp',line:'boiled paperwork. tastes official. ekber stamps your tongue.'},
 {id:'sea',name:'sea surprise',cost:15,skill:15,need:'sea',needDesc:'needs: 1 sea drink',line:'it glows faintly. the surprise is you ate it.'},
 {id:'huss',name:'huss hotpot',cost:20,skill:20,need:'huss',needDesc:'needs: 1 huss visit',line:'aggressively beige. burns with confidence. huss nods once.'},
 {id:'golden',name:'golden fry-up',cost:50,skill:60,need:'fries',needDesc:'needs: 5 lifetime fries',line:'it shines. ekber weeps a little. worth it.'}
];
function folkRecipeMet(need){
 if(!need)return true;
 try{
  if(need==='nods')return (parseInt(localStorage.getItem('cube_folk_nods')||'0',10)||0)>=10;
  if(need==='permits'){var p=JSON.parse(localStorage.getItem('cube_folk_permits')||'{}');for(var k in p)if(p[k])return true;return false}
  if(need==='sea')return (parseInt(localStorage.getItem('cube_folk_sea_drinks')||'0',10)||0)>=1;
  if(need==='huss')return (parseInt(localStorage.getItem('cube_folk_huss')||'0',10)||0)>=1;
  if(need==='fries')return (parseInt(localStorage.getItem('cube_folk_fries')||'0',10)||0)>=5;
 }catch(e){}
 return false;
}
function folkCookPanel(){
 if(!folkActive)return;
 var w=folkEl('folkWho'),b=folkEl('folkBody');if(!w||!b)return;
 var meals=0;try{meals=parseInt(localStorage.getItem('cube_folk_meals')||'0',10)||0}catch(e){}
 var h='ekber\'s cookbook. stained. trusted.<br><span style="opacity:.7">meals cooked: '+meals+'. no refunds.</span><br><br>';
 for(var i=0;i<FOLK_RECIPES.length;i++){
  var r=FOLK_RECIPES[i],ok=folkRecipeMet(r.need);
  h+=(r.id==='golden'?'<div style="border:1px solid #ffd770;padding:4px;margin:3px 0">':'<div style="margin:3px 0">')+r.name+' - '+r.cost+'fp / +'+r.skill+' skill<br>';
  h+=ok?('<button class="folkBtn" data-cook="'+r.id+'" style="padding:2px 8px;font-size:11px">cook ('+r.cost+'fp)</button>'):('<span style="opacity:.7">locked. '+r.needDesc+'.</span>');
  h+='</div>';
 }
 w.textContent='— ekber, fry sage —';b.innerHTML=h;
 folkCookWire();
}
function folkCookWire(){
 if(!folkActive)return;
 var els=null;try{els=document.querySelectorAll('[data-cook]')}catch(e){}
 if(!els)return;
 for(var i=0;i<els.length;i++)(function(btn){btn.onclick=function(){var id='';try{id=btn.getAttribute('data-cook')}catch(e){}folkCook(id)}})(els[i]);
}
function folkCook(id){
 if(!folkActive)return;
 var r=null;for(var i=0;i<FOLK_RECIPES.length;i++)if(FOLK_RECIPES[i].id===id)r=FOLK_RECIPES[i];
 if(!r)return;
 var w=folkEl('folkWho'),b=folkEl('folkBody');
 if(!folkRecipeMet(r.need)){if(w)w.textContent='— ekber, fry sage —';if(b)b.textContent='ekber shakes his head. '+r.needDesc+'.';return}
 var bal=0;try{if(typeof folkFpGet==='function')bal=folkFpGet()}catch(e){}
 if(bal<r.cost){if(w)w.textContent='— ekber, fry sage —';if(b)b.textContent='not enough fp. ekber keeps stirring. come back richer.';return}
 try{if(typeof folkFpAdd==='function')folkFpAdd(-r.cost)}catch(e){}
 folkSkillAdd(r.skill);
 var meals=0;try{meals=parseInt(localStorage.getItem('cube_folk_meals')||'0',10)||0}catch(e){}
 meals++;try{localStorage.setItem('cube_folk_meals',String(meals))}catch(e){}
 if(w)w.textContent='— ekber, fry sage —';
 if(b)b.textContent=r.line+' meal #'+meals+'. ekber nods.';
 if(meals>=10&&typeof ach==='function'){try{ach('folk_chef')}catch(e){}}
 if(r.id==='golden'){
  var ate=null;try{ate=localStorage.getItem('cube_folk_goldenate')}catch(e){}
  if(!ate){try{localStorage.setItem('cube_folk_goldenate','1')}catch(e){}if(typeof ach==='function'){try{ach('folk_gourmet')}catch(e){}}}
 }
 try{folkPanelDraw()}catch(e){}
}
window.folkEnter=folkEnter;
window.folkExit=folkExit;
window.folkWander=folkWander;
})();
