// cube-casino.js — THE VOID CASINO. obj deals. the games are rigged. chips are skill points.
// burn your confetti here. (a sandbox. cube-original.)
(function(){
'use strict';
if(typeof window.caLoaded!=='undefined')return;
window.caLoaded=true;

// ══ state ══
var caActive=false;
var caBet=10,caPity=0,caStreak=0,caDuel=null,caLoopNarrBusy=false;
var caStats={plays:0,won:0,lost:0,biggest:0,jackpots:0};
try{var _cs=JSON.parse(localStorage.getItem('cube_casino')||'{}');for(var _ck in _cs)caStats[_ck]=_cs[_ck]}catch(e){}
function caSave(){try{localStorage.setItem('cube_casino',JSON.stringify(caStats))}catch(e){}}
function caBal(){try{if(typeof skillState!=='undefined')return Math.floor(skillState.points)||0}catch(e){}return 0}
function caRefresh(){try{if(typeof skillPtsRefresh==='function')skillPtsRefresh()}catch(e){}}
function caTake(n){try{if(typeof skillState==='undefined'||Math.floor(skillState.points)<n)return false;skillState.points-=n;try{if(typeof skillSave==='function')skillSave()}catch(e){}caRefresh();return true}catch(e){}return false}
function caGive(n){try{if(typeof grantPts==='function'){grantPts(n)}else if(typeof skillState!=='undefined'){skillState.points+=n;try{if(typeof skillSave==='function')skillSave()}catch(e){}}caRefresh()}catch(e){}}
function caTrophy(id){try{if(typeof ach==='function')ach(id)}catch(e){}}

// ══ voice ══
var CA_OBJ={
 greet:['welcome to the void casino. i am the dealer. the games are rigged. i rigged them. sit.',
  'chips are skill points. you have too many. i will fix that. pick a game.',
  'house rules: i always win eventually. you sometimes win now. that is the deal.'],
 win:['paid. do not get used to it.','winner. the pit boss is furious. the pit boss is me.',
  'take your chips. i will win them back. i always win them back.','payout. enjoy it. screenshot it. it ends here.'],
 lose:['the house thanks you for your donation.','lost. the void grows richer. the void is me.',
  'better luck next pull. (there is no luck. there is only me.)','ooh. so close. it was never close.'],
 jackpot:['JACKPOT. THREE SEVENS. the casino is ruined. i am ruined. take it all.',
  'JACKPOT. i rigged it FAIR and you still won. unbelievable. security! (security is me. never mind.)'],
 bankrupt:['broke. zero chips. the casino accepts lint as payment. (it does not.)',
  'you lost everything. historic. there is a plaque now. it says "lol".'],
 rig:['certified fair. (not certified.)','the reels are random. randomly in my favor.',
  'audited by nobody. passed with honors.','the wheel has no memory. i have an excellent memory.'],
 idle:['no loitering. bet or leave. (you can loiter a little.)',
  'the slots are warm. they are always warm. i breathe on them.',
  'somewhere out there is a high roller. it is not you. yet.']
};

// ══ narrator (typewriter) ══
var caNarrQ=[],caNarrBusy=false,caNarrIv=null,caNarrGen=0;
function caDial(){if(typeof window.opMetaDial==='function'){try{var v=window.opMetaDial();if(v>=1&&v<=4)return v}catch(e){}}try{if(typeof dialSp==='function'){var d=dialSp();if(d>0&&d<=4)return d}}catch(e){}return 1}
function caNarr(text){
 if(text instanceof Array)text=text[Math.floor(Math.random()*text.length)];
 caNarrQ.push(String(text));
 if(!caNarrBusy)caNarrNext();
}
function caNarrNext(){
 var job=caNarrQ.shift();
 if(job===undefined){caNarrBusy=false;return}
 caNarrBusy=true;
 var myGen=caNarrGen,full=job,i=0,el=null;
 try{el=document.getElementById('caNarrText')}catch(e){}
 if(!el){caNarrBusy=false;return}
 el.textContent='';
 try{
  var spd=caDial(),tick=Math.max(8,Math.round(30/spd));
  var iv=setInterval(function(){
   caNarrIv=iv;
   if(!caActive){clearInterval(iv);caNarrIv=null;caNarrBusy=false;caNarrQ=[];return}
   i++;el.textContent=full.slice(0,i);
   if(i>=full.length){clearInterval(iv);caNarrIv=null;setTimeout(function(){
    if(!caActive||myGen!==caNarrGen)return;
    caNarrBusy=false;if(!caNarrBusy)caNarrNext();
   },Math.round((caNarrQ.length?180:600)/spd))}
  },tick);
 }catch(e){el.textContent=full;caNarrBusy=false;caNarrNext()}
}
function caClearQ(){caNarrGen++;caNarrQ=[];try{if(caNarrIv)clearInterval(caNarrIv);caNarrIv=null}catch(e){}caNarrBusy=false}
function caLine(key){var b=CA_OBJ[key];if(b)caNarr(b)}

// ══ css + shell ══
function caCSS(){
 if(document.getElementById('caCSS'))return;
 var s=document.createElement('style');s.id='caCSS';
 s.textContent=
 '#caOverlay{--ca-gold:#ffd36e;--ca-red:#ff5674;--ca-mint:#6dffd0;position:fixed;inset:0;z-index:2000;display:flex;flex-direction:column;overflow:hidden;font-family:Consolas,monospace;color:#f6eddb;background:radial-gradient(ellipse at 50% -18%,rgba(177,102,44,.34),transparent 54%),radial-gradient(ellipse at 82% 56%,rgba(60,24,91,.28),transparent 42%),repeating-linear-gradient(135deg,rgba(255,255,255,.018) 0 1px,transparent 1px 18px),#100d13;touch-action:manipulation}'+
 '#caHeader{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:14px 22px 12px;border-bottom:1px solid rgba(255,211,110,.38);background:linear-gradient(180deg,rgba(8,6,9,.97),rgba(22,15,21,.92));box-shadow:0 8px 28px #0009;z-index:2}'+
 '.caBrand{display:flex;align-items:center;gap:16px;min-width:0}'+
 '.caSign{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;width:76px;height:64px;flex:none;border:2px solid #eab85e;border-radius:50% 50% 8px 8px;background:radial-gradient(ellipse,#622b25 0,#26131c 72%);box-shadow:0 0 10px #ff9c3866,inset 0 0 14px #ffba4a44;color:#ffe6a9;transform:rotate(-4deg)}'+
 '.caSign strong{font-size:13px;letter-spacing:2px;text-shadow:0 0 8px #ffd36e}.caSign small{font-size:8px;letter-spacing:3px;color:#ff9b77;margin-top:3px}'+
 '.caBrandText{min-width:0}.caEyebrow{font-size:10px;color:#d79c58;letter-spacing:4px;text-transform:uppercase}.caTitle{font-size:clamp(20px,3vw,34px);line-height:1.05;font-weight:bold;letter-spacing:5px;color:#fff0c9;text-shadow:0 0 15px #e7a64d77}.caSubtitle{font-size:11px;color:#9d8b86;letter-spacing:1px;margin-top:5px}'+
 '#caBank{display:grid;grid-template-columns:auto;justify-items:end;gap:5px;min-width:210px}'+
 '.caBankLabel{font-size:9px;letter-spacing:3px;color:#a98b60;text-transform:uppercase}'+
 '#caBal{padding:5px 11px;border:1px solid #c8944b;border-radius:3px;background:linear-gradient(90deg,#24191b,#38251b);color:#ffe29a;font-size:15px;letter-spacing:1px;box-shadow:0 0 14px #eaa74422,inset 0 0 10px #ffc76511}'+
 '#caStats{display:flex;justify-content:flex-end;gap:12px;flex-wrap:wrap}'+
 '.caStat{font-size:10px;color:#9c8c88;white-space:nowrap}.caStat b{color:#f2d49b;font-weight:normal}'+
 '.caBetRow{display:flex;gap:5px;justify-content:flex-end;flex-wrap:wrap}'+
 '#caNarr{display:flex;align-items:center;gap:12px;min-height:42px;padding:7px 22px;border-bottom:1px solid #55352c;background:linear-gradient(90deg,#28171a,#17121a 48%,#24181b);color:#f1d8b0;font-size:13px;line-height:1.4}'+
 '#caNarr .who{flex:none;color:#ffbd69;font-size:10px;letter-spacing:2px;text-transform:uppercase}#caNarrText{min-width:0}'+
 '#caMain{flex:1;min-height:0;display:flex;position:relative}'+
 '#caFloor{flex:1;min-height:0;display:grid;grid-template-columns:minmax(320px,1.35fr) minmax(230px,.8fr);grid-template-rows:minmax(0,1fr) minmax(0,1fr);grid-template-areas:"slots cards" "slots spin";gap:14px;padding:16px 22px;overflow:auto;background:radial-gradient(ellipse at 48% 50%,rgba(106,45,34,.13),transparent 65%)}'+
 '.caGame{position:relative;isolation:isolate;min-width:0;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:9px;overflow:hidden;padding:18px 16px;border:1px solid #6e4a38;background:linear-gradient(145deg,rgba(48,28,27,.92),rgba(20,16,21,.98));box-shadow:0 8px 22px #0008,inset 0 0 30px #ffcc6810}'+
 '.caGame h3{position:relative;z-index:1;margin:0;color:#ffe2aa;font-size:13px;letter-spacing:4px;font-weight:normal;text-align:center}.caGame .sub{position:relative;z-index:1;max-width:360px;color:#b29a84;font-size:11px;line-height:1.5;text-align:center}'+
 '.caGame .out{position:relative;z-index:1;display:flex;align-items:center;justify-content:center;min-height:54px;padding:10px 14px;color:#fff2d5;text-align:center;font-size:17px;letter-spacing:2px}'+
 '#caSlots{grid-area:slots;border:2px solid #b8753e;border-radius:14px 14px 7px 7px;background:radial-gradient(ellipse at 50% 12%,#793e30 0,#3b2022 42%,#17131a 100%);box-shadow:0 0 24px #e7743150,inset 0 0 0 5px #241519,inset 0 0 42px #e9a34a18}'+
 '#caSlots:before{content:"✦  VOID JACKPOT  ✦";position:absolute;top:0;left:8%;right:8%;padding:8px 4px;border:1px solid #d89e51;border-top:0;border-radius:0 0 30px 30px;background:linear-gradient(90deg,#421e25,#8c4b2d,#421e25);color:#ffe49b;font-size:10px;letter-spacing:5px;text-align:center;text-shadow:0 0 8px #ffc961;box-shadow:0 5px 15px #0007;animation:caMarquee 2.4s ease-in-out infinite alternate}'+
 '#caSlots h3{margin-top:28px;font-size:17px;color:#fff0c4;text-shadow:0 0 12px #ffc46c}'+
 '#caSlots .out{width:min(88%,430px);min-height:112px;border:7px ridge #c28a49;border-radius:8px;background:linear-gradient(90deg,transparent 32.7%,#b47a43 33%,#b47a43 33.7%,transparent 34%,transparent 66%,#b47a43 66.3%,#b47a43 67%,transparent 67.3%),linear-gradient(180deg,#fff1c9,#d9c9a0);box-shadow:inset 0 0 26px #000,0 0 18px #ffb94a55;color:#20151a;font-family:Georgia,serif;font-size:clamp(28px,5vw,54px);font-weight:bold;letter-spacing:7px;text-shadow:0 1px #fff8}'+
 '#caSlots .caBtn{min-width:110px;padding:10px 24px;border:2px solid #ffcf69;border-radius:6px;background:linear-gradient(#e95c48,#9b292c);color:#fff3d1;font-weight:bold;letter-spacing:3px;box-shadow:0 4px 0 #552128,0 0 17px #fa754766}'+
 '#caSlots .caBtn:hover{background:linear-gradient(#ff8063,#b53639);transform:translateY(-1px)}'+
 '#caCards{grid-area:cards;border:1px solid #5da88c;border-radius:48% 48% 10px 10px / 14% 14% 10px 10px;background:radial-gradient(ellipse at 50% 55%,#14533e,#0c382e 62%,#151c20);box-shadow:0 0 20px #55d6a333,inset 0 0 0 6px #182b28,inset 0 0 0 8px #8e6a3e,inset 0 0 25px #000}'+
 '#caCards:before{content:"♠     ♥     ♣     ♦";position:absolute;top:12px;left:0;right:0;color:#d7c18b;font-size:12px;letter-spacing:10px;text-align:center;opacity:.65}'+
 '#caCards .out{min-width:min(90%,280px);min-height:72px;border:1px solid #d4bf8d;border-radius:5px;background:linear-gradient(135deg,#faf0d4,#d7c69f);box-shadow:0 7px 0 #0a241c,0 9px 18px #0009;color:#173b30;font-family:Georgia,serif;font-weight:bold;letter-spacing:1px;transform:rotate(-1.5deg)}'+
 '#caCards .caBtn{border-color:#86c9a8;background:#123f32;color:#e5f2d7}#caCards .caBtn:hover{background:#1d6348}'+
 '#caSpin{grid-area:spin;border:1px solid #7c64ab;border-radius:8px;background:linear-gradient(145deg,#241834,#100e18 75%);box-shadow:0 0 18px #ac73e433,inset 0 0 30px #916be51a}'+
 '#caSpin:before{content:"";position:absolute;width:150px;height:150px;top:50%;left:50%;transform:translate(-50%,-50%);border-radius:50%;background:conic-gradient(#cf3850 0 30deg,#19151e 30deg 60deg,#cf3850 60deg 90deg,#19151e 90deg 120deg,#cf3850 120deg 150deg,#19151e 150deg 180deg,#cf3850 180deg 210deg,#19151e 210deg 240deg,#cf3850 240deg 270deg,#19151e 270deg 300deg,#cf3850 300deg 330deg,#27a879 330deg 360deg);border:7px double #d9bd75;box-shadow:0 0 0 5px #231a2d,0 0 22px #b18be855;opacity:.32;z-index:0;animation:caWheel 24s linear infinite}'+
 '#caSpin .out{min-width:126px;min-height:52px;border:1px solid #c6ac6c;border-radius:30px;background:#17111ee8;color:#f4dfaa;font-weight:bold;box-shadow:0 0 14px #0008}'+
 '#caSpin .caBtn{border-color:#9b7bc2;background:#302044;color:#eee0ff}#caSpin .caBtn:hover{background:#533767}'+
 '.caRow{display:flex;gap:6px;flex-wrap:wrap;justify-content:center}.caBtn{border:1px solid #927750;border-radius:3px;background:#2b211e;color:#edd9b3;font-family:Consolas,monospace;font-size:11px;letter-spacing:1px;padding:6px 11px;cursor:pointer;transition:transform .12s,background .12s,box-shadow .12s}.caBtn:hover{background:#453126;color:#fff4dc;box-shadow:0 0 10px #dfa95444}.caBtn:focus-visible,#caInput:focus-visible,#caLeave:focus-visible{outline:2px solid #fff0aa;outline-offset:2px}.caBtn.dim{border-color:#705c42;color:#c2aa82;background:#211a1b}'+
 '#caBottom{flex:none;border-top:1px solid #8b613b;background:#100d12;box-shadow:0 -8px 25px #0008}'+
 '#caLog{height:66px;overflow:auto;padding:7px 18px;font-size:12px;line-height:1.5;color:#c0aa91;background:linear-gradient(90deg,#171117,#20151a,#171117)}'+
 '#caLog .hi{color:#d6c4ff}#caLog .st{color:#ffdf88}#caLog .bad{color:#ff8a91}'+
 '#caRow{display:flex;gap:10px;padding:9px 16px;background:#09080c;align-items:center}'+
 '#caInput{flex:1;min-width:0;background:#171219;border:1px solid #60452f;border-radius:3px;color:#f1e5d1;font-family:Consolas,monospace;font-size:14px;padding:8px 10px;outline:none}#caInput:focus{border-color:#edbd67;box-shadow:0 0 10px #e6aa4b33}'+
 '#caLeave{border:1px solid #9f6759;border-radius:3px;background:#311b20;color:#f0c5ad;font-family:Consolas,monospace;font-size:11px;letter-spacing:2px;padding:8px 15px;cursor:pointer}#caLeave:hover{border-color:#ff9d76;background:#55252a;color:#fff0da}'+
 '@media(max-width:850px){#caHeader{padding:10px 14px}.caSubtitle{display:none}#caFloor{grid-template-columns:minmax(260px,1.15fr) minmax(200px,.85fr);padding:12px;gap:10px}}'+
 '@media(max-width:620px){#caHeader{align-items:flex-start;flex-wrap:wrap}.caBrand{gap:10px}.caSign{width:54px;height:48px}.caSign strong{font-size:10px}.caSign small{font-size:7px}.caTitle{letter-spacing:3px}#caBank{width:100%;min-width:0;grid-template-columns:1fr auto;justify-items:start}#caBank .caBetRow{grid-column:1/-1;justify-content:flex-start}#caStats{grid-column:1/-1;justify-content:flex-start}#caNarr{padding:7px 12px;font-size:11px}#caFloor{display:flex;flex-direction:column;overflow:auto}.caGame{min-height:230px;flex:none}#caSlots{min-height:300px}#caSpin{min-height:245px}#caLog{height:52px}#caRow{padding:7px 10px}#caInput{font-size:16px}}'+
 '@keyframes caWheel{to{transform:translate(-50%,-50%) rotate(1turn)}}@keyframes caMarquee{from{opacity:.82}to{opacity:1}}'+
 '@media(prefers-reduced-motion:reduce){.caBtn{transition:none}#caSpin:before,#caSlots:before{animation:none}}';
 document.head.appendChild(s);
}
function caBuild(){
 caCSS();
 var ov=document.createElement('div');ov.id='caOverlay';ov.style.display='none';
 ov.innerHTML='<header id="caHeader"><div class="caBrand"><div class="caSign"><strong>VOID</strong><small>★ OPEN ★</small></div><div class="caBrandText"><div class="caEyebrow">the house always remembers</div><div class="caTitle">VOID CASINO</div><div class="caSubtitle">three tables · one suspicious dealer · no refunds</div></div></div>'+ 
 '<div id="caBank"><div class="caBankLabel">house ledger · skill-point chips</div><div id="caBal"></div><div id="caStats"></div><div class="caBetRow"><button class="caBtn dim" data-ca="bet:10">BET 10</button><button class="caBtn dim" data-ca="bet:25">BET 25</button><button class="caBtn dim" data-ca="bet:100">BET 100</button><button class="caBtn dim" data-ca="bet:500">BET 500</button></div></div></header>'+
 '<div id="caNarr"><span class="who">obj · dealer</span><span id="caNarrText"></span></div>'+
 '<main id="caMain"><div id="caFloor">'+
  '<section class="caGame" id="caSlots"><h3>SLOTS</h3><div class="sub">three sevens pays 100× · any pair pays 2× · full match pays 10×</div><div class="out" id="caSlotsOut">— · — · —</div><div class="caRow"><button class="caBtn" data-ca="slots">PULL</button></div></section>'+
  '<section class="caGame" id="caCards"><h3>HIGHER / LOWER</h3><div class="sub">draw, call the next card. ties go to the house. streaks pay 3×, 5×.</div><div class="out" id="caCardsOut">no card. draw.</div><div class="caRow"><button class="caBtn" data-ca="draw">DRAW</button><button class="caBtn" data-ca="higher">HIGHER</button><button class="caBtn" data-ca="lower">LOWER</button></div></section>'+
  '<section class="caGame" id="caSpin"><h3>VOID SPIN</h3><div class="sub">red / black pays 2× · green pays 14×</div><div class="out" id="caSpinOut">place your bets.</div><div class="caRow"><button class="caBtn" data-ca="spin:red">RED</button><button class="caBtn" data-ca="spin:black">BLACK</button><button class="caBtn" data-ca="spin:green">GREEN</button></div></section>'+
 '</div></main>'+
 '<footer id="caBottom"><div id="caLog"></div>'+ 
 '<div id="caRow"><span style="color:#b5956a;font-size:12px">›</span><input id="caInput" autocomplete="off" spellcheck="false" placeholder="slots 25 / draw / higher / spin red 50 / chips / leave"><button id="caLeave">LEAVE</button></div></footer>';
 document.body.appendChild(ov);
 try{
  var btns=ov.querySelectorAll('[data-ca]');
  for(var i=0;i<btns.length;i++)(function(b){b.onclick=function(){caClick(b.getAttribute('data-ca'))}})(btns[i]);
  document.getElementById('caLeave').onclick=function(){try{caExit()}catch(e){}};
  var inp=document.getElementById('caInput');
  inp.addEventListener('keydown',function(e){
   if(e.key==='Enter'){var v=inp.value;inp.value='';caSubmit(v)}
   else if(e.key==='Escape'){e.preventDefault();try{caExit()}catch(err){}}
  });
 }catch(e){}
}
function caGlobalKey(e){try{if(!caActive)return;if(e.key==='Escape'){e.preventDefault();caExit()}}catch(err){}}
function caStashUI(){
 try{
  var keep=document.getElementById('caOverlay');
  var stash=document.getElementById('caStash');
  if(!stash){stash=document.createElement('div');stash.id='caStash';stash.style.display='none';document.body.appendChild(stash)}
  var nodes=[];for(var i=0;i<document.body.childNodes.length;i++)nodes.push(document.body.childNodes[i]);
  for(var j=0;j<nodes.length;j++){if(nodes[j]!==keep&&nodes[j]!==stash)stash.appendChild(nodes[j])}
 }catch(e){}
}
function caRestoreUI(){
 try{
  var keep=document.getElementById('caOverlay');
  var stash=document.getElementById('caStash');
  if(!stash)return;
  while(stash.firstChild)document.body.insertBefore(stash.firstChild,keep);
 }catch(e){}
}

// ══ rendering ══
function caLogLine(t,cls){
 try{
  var log=document.getElementById('caLog');if(!log)return;
  var d=document.createElement('div');if(cls)d.className=cls;d.textContent=t;
  log.appendChild(d);log.scrollTop=log.scrollHeight;
 }catch(e){}
}
function caSetOut(id,t){try{var el=document.getElementById(id);if(el)el.textContent=t}catch(e){}}
function caRenderSide(){
 try{
  var b=document.getElementById('caBal');if(b)b.textContent='chips: '+caBal()+' (bet '+caBet+')';
  var s=document.getElementById('caStats');if(!s)return;
  s.innerHTML='<div class="caStat">plays: <b>'+caStats.plays+'</b></div>'+
  '<div class="caStat">won: <b>'+caStats.won+'</b> · lost: <b>'+caStats.lost+'</b></div>'+
  '<div class="caStat">biggest: <b>'+caStats.biggest+'</b></div>'+
  '<div class="caStat">jackpots: <b>'+caStats.jackpots+'</b></div>'+
  (caStreak>1?'<div class="caStat">streak: <b>'+caStreak+'</b></div>':'');
 }catch(e){}
}

// ══ games ══
var CA_SYM=[{s:'7',w:2},{s:'★',w:4},{s:'◆',w:6},{s:'●',w:8},{s:'▲',w:10},{s:'■',w:12}];
function caPickSym(){
 var tot=0,i;for(i=0;i<CA_SYM.length;i++)tot+=CA_SYM[i].w;
 var r=Math.random()*tot,a=0;
 for(i=0;i<CA_SYM.length;i++){a+=CA_SYM[i].w;if(r<=a)return CA_SYM[i].s}
 return '■';
}
function caBetAmount(rest,def){
 var n=parseInt(String(rest||'').split(/\s+/)[0],10);
 if(!(n>0))n=def||caBet;
 n=Math.max(1,Math.min(500,n));
 return n;
}
function caResult(win,bet,mult,msg,cls){
 caStats.plays++;
 if(win){
  var pay=Math.floor(bet*mult);
  caGive(pay);
  caStats.won++;
  if(pay>caStats.biggest)caStats.biggest=pay;
  caSave();caLine('win');
  caLogLine(msg+' +'+pay+' chips.',cls||'st');
  if(!caStats.firstWin){caStats.firstWin=1;caSave();caTrophy('ca_first')}
 }else{
  caStats.lost++;
  caSave();caLine('lose');
  caLogLine(msg,cls||'bad');
  if(caBal()<=0)caBroke();
 }
 caRenderSide();
}
function caBroke(){
 caLine('bankrupt');
 caLogLine('ZERO chips. the casino accepts lint. (it does not.)','bad');
 caTrophy('ca_bankrupt');
}
function caSlots(rest){
 var bet=caBetAmount(rest);
 if(!caTake(bet)){caLogLine('no chips for that. the ATM is a skill tree. go earn.', 'bad');return}
 var a,b,c;
 if(caPity>=24){
  caPity=0;
  a=caPickSym();b=a;
  do{c=caPickSym()}while(c===a);
  caNarr('pity pull. even the rigging gets bored. (do not tell the pit boss.)');
 }else{a=caPickSym();b=caPickSym();c=caPickSym()}
 caSetOut('caSlotsOut',a+' · '+b+' · '+c);
 if(a==='7'&&b==='7'&&c==='7'){
  caPity=0;caStats.jackpots++;caSave();
  caLine('jackpot');
  caResult(true,bet,100,'JACKPOT. three sevens.');
  caTrophy('ca_jackpot');
 }else if(a===b&&b===c){caPity=0;caResult(true,bet,10,'three '+a+'s. the reels blink.')}
 else if(a===b||b===c||a===c){caPity=0;caResult(true,bet,2,'a pair. the house pretends to be upset.')}
 else{caPity++;caResult(false,bet,0,'['+a+' '+b+' '+c+']. nothing. the void keeps the bet.')}
}
var CA_CARDN=['?','?','2','3','4','5','6','7','8','9','10','J','Q','K','A'];
function caCardName(v){return CA_CARDN[v]||v}
function caDraw(rest){
 var bet=caBetAmount(rest);
 if(caDuel){caLogLine('a card is already out: '+caCardName(caDuel.card)+'. higher, lower, or fold.','hi');return}
 if(!caTake(bet)){caLogLine('no chips for that. the ATM is a skill tree. go earn.','bad');return}
 caDuel={card:1+Math.floor(Math.random()*13),bet:bet};
 caSetOut('caCardsOut','['+caCardName(caDuel.card)+'] higher? lower?');
 caLogLine('drawn: '+caCardName(caDuel.card)+' for '+bet+'. call it.','hi');
}
function caGuess(dir){
 if(!caDuel){caLogLine('draw first. the deck is shy.','hi');return}
 var d=caDuel;caDuel=null;
 var next=1+Math.floor(Math.random()*13);
 var win=dir==='higher'?next>d.card:next<d.card;
 caSetOut('caCardsOut','['+caCardName(d.card)+'] → ['+caCardName(next)+']');
 if(win){
  caStreak++;
  var mult=caStreak>=5?5:(caStreak>=3?3:2);
  caResult(true,d.bet,mult,'higher card. streak '+caStreak+'.');
  if(caStreak>=5)caTrophy('ca_streak');
 }else{
  caStreak=0;
  var why=next===d.card?'tie. ties go to the house. obviously.':'wrong. it was '+caCardName(next)+'.';
  caResult(false,d.bet,0,why);
 }
}
function caFold(){
 if(!caDuel){caLogLine('nothing to fold. bold of you.','hi');return}
 caDuel=null;caStreak=0;
 caSetOut('caCardsOut','folded. the deck is relieved.');
 caLogLine('folded. the bet stays with the house. obviously.','bad');
 caLine('lose');
}
function caSpin(rest){
 var parts=String(rest||'').toLowerCase().split(/\s+/);
 var color=null,bet=null;
 for(var i=0;i<parts.length;i++){
  if(parts[i]==='red'||parts[i]==='black'||parts[i]==='green')color=parts[i];
  else if(parseInt(parts[i],10)>0)bet=parseInt(parts[i],10);
 }
 if(!color){caLogLine('spin what? red, black, or green.','hi');return}
 if(!(bet>0))bet=caBet;
 bet=Math.max(1,Math.min(500,bet));
 if(!caTake(bet)){caLogLine('no chips for that. the ATM is a skill tree. go earn.','bad');return}
 var r=Math.random()*100,out;
 if(r<4)out='green';else if(r<52)out='red';else out='black';
 caSetOut('caSpinOut','● '+out.toUpperCase());
 if(out===color){
  if(color==='green'){caStats.jackpots++;caSave();caLine('jackpot');caResult(true,bet,14,'GREEN. fourteen to one. the wheel files a complaint.');caTrophy('ca_jackpot')}
  else caResult(true,bet,2,out+'. paid.');
 }else caResult(false,bet,0,out+'. the wheel has no memory. i do.');
}

// ══ commands ══
function caClick(spec){
 var parts=String(spec||'').split(':');
 if(parts[0]==='bet'){caBet=Math.max(1,Math.min(500,parseInt(parts[1],10)||10));caLogLine('default bet: '+caBet+'.','hi');caRenderSide();return}
 if(parts[0]==='slots'){caSubmit('slots '+caBet);return}
 if(parts[0]==='draw'){caSubmit('draw '+caBet);return}
 if(parts[0]==='higher'){caSubmit('higher');return}
 if(parts[0]==='lower'){caSubmit('lower');return}
 if(parts[0]==='spin'){caSubmit('spin '+parts[1]+' '+caBet);return}
}
function caSubmit(str){
 if(!caActive)return;
 var raw=String(str||'').trim();if(!raw)return;
 caLogLine('› '+raw,'hi');
 var parts=raw.toLowerCase().split(/\s+/);
 var cmd=parts[0],rest=parts.slice(1).join(' ');
 if(cmd==='slots'||cmd==='pull'||cmd==='slot'){caSlots(rest);return}
 if(cmd==='draw'||cmd==='card'){caDraw(rest);return}
 if(cmd==='higher'||cmd==='high'||cmd==='h'){caGuess('higher');return}
 if(cmd==='lower'||cmd==='low'||cmd==='l'){caGuess('lower');return}
 if(cmd==='fold'||cmd==='pass'){caFold();return}
 if(cmd==='spin'||cmd==='roulette'||cmd==='wheel'){caSpin(rest);return}
 if(cmd==='bet'||cmd==='chips'||cmd==='balance'||cmd==='bal'){if(cmd==='bet'&&parseInt(parts[1],10)>0){caBet=Math.max(1,Math.min(500,parseInt(parts[1],10)));caLogLine('default bet: '+caBet+'.','hi')}else caLogLine('chips: '+caBal()+'. default bet '+caBet+'.','hi');caRenderSide();return}
 if(cmd==='rigged'||cmd==='rig'||cmd==='fair'){caLine('rig');return}
 if(cmd==='talk'||cmd==='obj'||cmd==='dealer'||cmd==='hello'||cmd==='hi'){caLine('idle');return}
 if(cmd==='help'||cmd==='commands'||cmd==='?'){caHelp();return}
 if(cmd==='leave'||cmd==='exit'||cmd==='quit'||cmd==='out'){caExit();return}
 caNarr('that is not a game. the games are: slots, draw, spin.');
 caLogLine('try: slots 25 · draw · higher · spin red 50 · chips · leave');
}
function caHelp(){
 caLogLine('games: slots [bet] · draw [bet] then higher/lower/fold · spin <red|black|green> [bet] · bet <n> · chips · leave','hi');
 caNarr('three games. all rigged. one dealer. chips are skill points. do not cry when they are gone.');
}

// ══ enter / exit ══
function caEnter(){
 try{
  var ov=document.getElementById('caOverlay');
  if(!ov){caBuild();ov=document.getElementById('caOverlay')}
  if(!ov)return;
  caStashUI();
  ov.style.display='flex';
 }catch(e){return}
 caActive=true;
 caPity=0;caStreak=0;caDuel=null;
 try{document.addEventListener('keydown',caGlobalKey)}catch(e){}
 try{
  var tf=document.getElementById('termField');if(tf){tf.disabled=true;tf.blur()}
 }catch(e){}
 try{
  if(caBal()<1){caGive(10);setTimeout(function(){caNarr('broke? the house spots you 10 chips. do not spend it all in one place. (spend it all in one place.)')},800)}
 }catch(e){}
 caRenderSide();
 try{var lg=document.getElementById('caLog');if(lg)lg.innerHTML=''}catch(e){}
 caSetOut('caSlotsOut','— · — · —');caSetOut('caCardsOut','no card. draw.');caSetOut('caSpinOut','place your bets.');
 caLine('greet');
 try{var inp=document.getElementById('caInput');if(inp)setTimeout(function(){try{inp.focus()}catch(e){}},60)}catch(e){}
}
function caExit(){
 caActive=false;caClearQ();
 try{var ov=document.getElementById('caOverlay');if(ov)ov.style.display='none'}catch(e){}
 try{var tf=document.getElementById('termField');if(tf){tf.disabled=false;tf.focus()}}catch(e){}
 caRestoreUI();
 try{if(typeof cubePrint==='function')cubePrint('you leave the casino. obj keeps your chips. (he keeps everything.)')}catch(e){}
}
window.caEnter=caEnter;
window.caExit=caExit;
window.caDbg=function(){try{return {active:caActive,bet:caBet,chips:caBal(),stats:caStats}}catch(e){return{err:String(e)}}};
})();
