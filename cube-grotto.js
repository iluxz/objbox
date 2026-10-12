// ── THE GROTTO: the part of cube that is not a distraction ──
// gated behind 100% (all achievements except admin/impossible + grotto's own).
// phase 1: gate, enter/exit, mouth + phosphor homage. vault open, gauntlet open, heart open.
// gauntlet sits between vault-read and below: 3 gates, toll + memory each.
(function(){
if(typeof window.grLoaded!=='undefined')return;
window.grLoaded=true;
var grActive=false;
var grRoom='mouth';
// admin-only + grotto's own (no circular gate). nothing else is
// physically impossible, just rude. extend this list if that changes.
var GROTTO_EXCLUDE=['godmode','chism100','gr_lorekeeper','gr_gauntlet','gr_warden','gr_spare','gr_kill','gr_noskip','gr_chismfriend','gr_firstdance','gr_titan','gr_despawn','gr_drillmaster'];
// the four: 100 visits, 100 dial nudges, the long walk out, the rare thing.
// (the epilogue-with-rock proof was retired: the timekeeper is broken and
// lux is done asking. no substitutes for the remaining four.)
var GROTTO_NEED_IDS=['resident','fiddlesticks','shutdown_walkout','btn_myth'];
function grEl(id){try{return document.getElementById(id)}catch(e){return null}}
function grSay(t){try{if(typeof cubePrint==='function')cubePrint(t)}catch(e){}}
function grSave(){try{return JSON.parse(localStorage.getItem('cube_grotto')||'{}')}catch(e){return{}}}
function grStore(s){try{localStorage.setItem('cube_grotto',JSON.stringify(s||{}))}catch(e){}}
function grNeedName(id){
  try{
    if(typeof ACH!=='undefined')for(var i=0;i<ACH.length;i++){
      if(ACH[i]&&ACH[i].id===id)return ACH[i].n||id;
    }
  }catch(e){}
  return id;
}
function grRequired(){
  try{
    if(typeof achSet!=='function')return null;
    var have=achSet(),missing=[];
    for(var j=0;j<GROTTO_NEED_IDS.length;j++){if(have.indexOf(GROTTO_NEED_IDS[j])===-1)missing.push(GROTTO_NEED_IDS[j])}
    return {total:GROTTO_NEED_IDS.length,got:GROTTO_NEED_IDS.length-missing.length,missing:missing};
  }catch(e){return null}
}
function grAllowed(){var p=grRequired();if(!p)return false;return p.missing.length===0}
function grProgressFrac(){try{var p=grRequired();if(!p||!p.total)return 0;return p.got/p.total}catch(e){return 0}}
function grCss(){
  if(grEl('grCSS'))return;
  try{
    var s=document.createElement('style');s.id='grCSS';
    s.textContent=
    '#grOverlay{position:fixed;inset:0;z-index:2000;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#020304;color:#cfe3ff;font-family:Consolas,monospace;overflow:hidden}'+
    '#grCanvas{position:absolute;inset:0;width:100%;height:100%}'+
    '#grTitle{position:relative;font-size:15px;letter-spacing:8px;color:#7fa8c9;margin-bottom:4px;text-shadow:0 0 12px #000,0 0 4px #000}'+
    '#grBody{position:relative;max-width:680px;width:min(680px,92vw);max-height:68vh;overflow-y:auto;text-align:center;font-size:15px;line-height:1.7;color:#dcebf9;background:rgba(2,8,14,.72);border:1px solid rgba(43,74,104,.5);border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.5);text-shadow:0 1px 2px #000,0 0 3px #000;padding:14px 24px;min-height:180px;scrollbar-width:thin;scrollbar-color:#2b4a68 transparent}'+
    '#grBody::-webkit-scrollbar{width:8px}'+
    '#grBody::-webkit-scrollbar-thumb{background:#2b4a68;border-radius:4px}'+
    '#grBody::-webkit-scrollbar-track{background:transparent}'+
    '#grBody .dim{color:#5f7d99}'+
    '#grNav{display:flex;gap:10px;margin-top:22px;flex-wrap:wrap;justify-content:center;position:relative}'+
    '#grMap{position:absolute;bottom:calc(100% + 10px);left:50%;transform:translateX(-50%);display:grid;grid-template-columns:1fr 1fr;gap:8px;background:rgba(4,14,20,.96);border:1px solid rgba(96,145,235,.35);border-radius:12px;padding:12px;z-index:20;box-shadow:0 14px 40px rgba(0,0,0,.6);cursor:grab;user-select:none}'+
    '#grMap.grDragging{cursor:grabbing}'+
    '.grBtn{background:#0e1a2b;border:1px solid #2b4a68;color:#b9d2ea;font-family:Consolas,monospace;font-size:13px;letter-spacing:2px;padding:10px 18px;cursor:pointer}'+
    '.grBtn:hover{background:#16283f;border-color:#5fa8d3}'+
    '.grBtn:disabled{opacity:.3;cursor:default}'+
    '.grSlime{position:absolute;width:64px;height:54px;margin:0;left:10%;top:20%;border-radius:50% 50% 48% 48%;background:radial-gradient(circle at 35% 30%,rgba(255,255,255,.85),rgba(150,220,255,.45) 40%,rgba(90,140,255,.25) 70%,transparent);box-shadow:0 0 24px 6px rgba(120,180,255,.35);animation:grBob 3s ease-in-out infinite;cursor:pointer;transition:left 1.4s ease-in-out,top 1.4s ease-in-out}'+
    '.grSlime:after{content:"..";position:absolute;top:12px;left:0;right:0;text-align:center;color:#dff;font-size:15px;letter-spacing:5px}'+
    '.grSlime.hatted:after{content:"^..^";font-size:13px}'+
    '.grSlime.goldhat:after{content:"^..^";font-size:13px;color:#ffd770;text-shadow:0 0 6px rgba(255,200,90,.9)}'+
    '.grSlime.grLargo{width:96px;height:80px}'+
    '.grSlime.grLargo:after{font-size:22px;top:18px}'+
    '.grWing{position:absolute;top:6px;width:22px;height:16px;background:radial-gradient(ellipse at center,rgba(255,255,255,.9),rgba(150,220,255,.35) 70%,transparent);border-radius:50%;opacity:.9;pointer-events:none;animation:grFlap .55s ease-in-out infinite}'+
    '.grWing.L{left:-15px;transform-origin:right center}'+
    '.grWing.R{right:-15px;transform-origin:left center;animation-delay:-.27s}'+
    '.grSlime.go .grWing{animation-duration:.16s}'+
    '.grSlime.grLargo .grWing{width:30px;height:22px;top:10px}'+
    '.grSlime.grLargo .grWing.L{left:-22px}'+
    '.grSlime.grLargo .grWing.R{right:-22px}'+
    '@keyframes grFlap{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.3)}}'+
    '.grMiniSlime{position:relative;display:inline-block;width:34px;height:30px;margin:3px 2px 0 0;border-radius:50% 50% 48% 48%;animation:grBob 3s ease-in-out infinite;vertical-align:bottom}'+
    '.grMiniSlime:after{content:"..";position:absolute;top:6px;left:0;right:0;text-align:center;color:#dff;font-size:9px;letter-spacing:3px}'+
    '.grMiniSlime.droop{animation:none;transform:scaleY(.78);opacity:.55}'+
    '.grMiniSlime.boost{box-shadow:0 0 14px 4px rgba(255,215,112,.7)}'+
    '.grHen{position:relative;display:inline-block;width:30px;height:24px;margin:3px 3px 0 0;border-radius:50% 50% 45% 45%;background:radial-gradient(circle at 35% 30%,#d8a878,#8a5a30 70%,#5a3a20);vertical-align:bottom;animation:grBob 4s ease-in-out infinite}'+
    '.grHen:after{content:"•";position:absolute;top:2px;left:0;right:0;text-align:center;color:#1a0e05;font-size:10px}'+
    '.grHen:before{content:"";position:absolute;right:-6px;top:8px;border-left:7px solid #e8a03c;border-top:4px solid transparent;border-bottom:4px solid transparent}'+
    '.grEgg{display:inline-block;width:14px;height:18px;margin:3px 2px 0 0;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:radial-gradient(circle at 35% 30%,#fff,#d8d0c0 75%,#a8a090);vertical-align:bottom}'+
    '#grSlimePen{position:relative;height:130px;margin:4px auto;max-width:520px}'+
    '.grGold{background:radial-gradient(circle at 35% 30%,#fffbe8,rgba(255,210,110,.65) 45%,rgba(255,160,40,.3) 70%,transparent);box-shadow:0 0 34px 10px rgba(255,190,80,.5)}'+
    '.grGold:after{content:"$$"}'+
    '#grSideTerm{position:fixed;top:20px;left:20px;width:380px;max-height:calc(100vh - 80px);background:linear-gradient(180deg,rgba(3,17,15,0.94),rgba(0,9,8,0.90));border:1px solid rgba(96,145,235,0.25);border-radius:12px;z-index:2005;font-family:Consolas,monospace;font-size:13px;color:rgba(96,145,235,0.85);display:flex;flex-direction:column;box-shadow:0 14px 44px rgba(0,0,0,0.55),0 0 0 1px rgba(0,0,0,0.35);overflow:hidden}'+
    '#grSideTerm:before{content:"";position:absolute;top:0;left:10%;right:10%;height:1px;background:linear-gradient(90deg,transparent,rgba(96,145,235,0.9),transparent);pointer-events:none}'+
    '#grSideHead{padding:10px 30px 9px 14px;border-bottom:1px solid rgba(96,145,235,0.13);font-size:10px;color:rgba(96,145,235,0.7);letter-spacing:1.8px;text-transform:uppercase;position:relative}'+
    '#grSideHead:after{content:"●";position:absolute;right:13px;top:12px;font-size:7px;color:rgba(135,175,255,0.95);text-shadow:0 0 8px rgba(135,175,255,0.9)}'+
    '#grFlash{position:fixed;inset:0;z-index:2007;pointer-events:none;opacity:0;transition:opacity .3s}'+
    '.grPop{position:fixed;z-index:2008;pointer-events:none;font-family:Consolas,monospace;font-size:15px;font-weight:bold;text-shadow:0 0 8px currentColor,0 2px 2px #000;animation:grPopUp 1.1s ease-out forwards}'+
    '@keyframes grPopUp{0%{opacity:0;transform:translateY(8px) scale(.8)}15%{opacity:1;transform:translateY(0) scale(1.1)}30%{transform:translateY(-4px) scale(1)}100%{opacity:0;transform:translateY(-46px) scale(1)}}'+
    '.grShake{animation:grShakeA .4s ease-in-out}'+
    '@keyframes grShakeA{0%,100%{transform:translate(0,0)}20%{transform:translate(-7px,3px)}40%{transform:translate(6px,-4px)}60%{transform:translate(-4px,-2px)}80%{transform:translate(3px,2px)}}'+
    '#grSkillTree .skill-lane{background:linear-gradient(180deg,rgba(6,26,22,.55),rgba(2,10,9,.15));border-radius:14px;padding-bottom:12px}'+
    '#grSkillTree .skill-node{background:linear-gradient(180deg,rgba(10,34,28,.94),rgba(4,14,12,.94));box-shadow:inset 0 1px 0 rgba(135,175,255,.10),0 8px 18px rgba(0,0,0,.45)}'+
    '#grSkillTree .skill-node:hover:not(.locked):not(.owned){background:linear-gradient(180deg,rgba(14,52,40,.94),rgba(6,20,16,.94));box-shadow:inset 0 1px 0 rgba(135,175,255,.12),0 0 16px rgba(96,145,235,.22),0 10px 22px rgba(0,0,0,.5)}'+
    '#grSkillTree .skill-node.owned{border-color:rgba(135,175,255,.5);box-shadow:inset 0 1px 0 rgba(135,175,255,.12),0 0 18px rgba(96,145,235,.18),0 8px 18px rgba(0,0,0,.45)}'+
    '#grSkillTree .node-orb{background:radial-gradient(circle at 40% 35%,rgba(135,175,255,.9),rgba(60,160,130,.25) 60%,transparent 75%)}'+
    '#grSkillTree .node-cost{color:rgba(255,220,150,.85)}'+
    '#grSkillTree .node-name{color:rgba(220,255,240,.92)}'+
    '#grSkillTree .skill-link{background:rgba(96,145,235,.25)}'+
    '#grSkillTree .skill-link.on{background:rgba(135,175,255,.8);box-shadow:0 0 8px rgba(135,175,255,.7)}'+
    '#grSkillTree .fan-line{stroke:rgba(96,145,235,.35)}'+
    '#grSkillTree .fan-line.on{stroke:rgba(135,175,255,.9)}'+
    '#grSkillTree .skill-root{border:1px solid rgba(135,175,255,.4);border-radius:12px;background:linear-gradient(180deg,rgba(10,36,30,.9),rgba(4,14,12,.9));box-shadow:0 0 24px rgba(96,145,235,.15)}'+
    '#grSkillTree .root-name{color:rgba(160,240,210,.95);letter-spacing:6px}'+
    '#grSkillTree .root-desc{color:rgba(150,200,185,.6)}'+
    '#grSkillTree .up-area{border-color:rgba(96,145,235,.35);background:linear-gradient(180deg,rgba(10,24,44,.55),rgba(5,10,24,.6))}'+
    '#grSkillTree .up-area-head{background:linear-gradient(180deg,rgba(96,145,235,.10),transparent)}'+
    '#grSkillTree .up-node{border:1px solid rgba(96,145,235,.3);background:linear-gradient(180deg,rgba(12,26,48,.92),rgba(6,12,28,.94))}'+
    '#grSkillTree .up-node:hover{background:linear-gradient(180deg,rgba(18,40,72,.94),rgba(8,16,36,.94));border-color:rgba(135,175,255,.6)}'+
    '#grSkillTree .up-node.maxed{border-color:rgba(135,175,255,.55);box-shadow:0 0 14px rgba(96,145,235,.2)}'+
    '#grSkillTree .up-cost{color:rgba(201,168,255,.9)}'+
    '#grSkillTree .up-lv{color:rgba(135,175,255,.85)}'+
    '#grSkillTree .up-lockmsg{color:rgba(150,170,210,.6)}'+
    '#grTermHist{flex:1;min-height:0;max-height:38vh;overflow-y:auto;padding:12px 14px;line-height:1.55;white-space:pre-wrap}'+
    '#grTermRow{display:flex;padding:8px 12px;border-top:1px solid rgba(96,145,235,0.13);align-items:center}'+
    '#grTermPrompt{color:rgba(96,145,235,1);margin-right:8px;flex-shrink:0;letter-spacing:.5px}'+
    '#grSideInput{background:none;border:none;outline:none;color:rgba(255,255,255,0.92);font-family:Consolas,monospace;font-size:13px;flex:1;caret-color:rgba(96,145,235,1)}'+
    '@keyframes grBob{0%,100%{transform:translateY(0) scale(1,1)}50%{transform:translateY(-10px) scale(1.04,.96)}}'+
    '.grSlime.happy{animation:grWig .5s ease-in-out}'+
    '@keyframes grWig{0%,100%{transform:scale(1,1)}25%{transform:scale(1.15,.85)}75%{transform:scale(.9,1.1)}}'+
    '.grSlime.lit{box-shadow:0 0 44px 14px rgba(180,230,255,.8);background:radial-gradient(circle at 35% 30%,#fff,rgba(200,240,255,.7) 50%,rgba(120,180,255,.3) 75%,transparent)}'+
    '.grChime{display:inline-block;width:56px;height:56px;margin:10px;border-radius:50%;border:2px solid #2b4a68;background:radial-gradient(circle at 40% 35%,#16283f,#0a1420);cursor:pointer;line-height:52px;font-size:20px;color:#7fa8c9}'+
    '.grChime:hover{border-color:#5fa8d3}'+
    '.grChime.hit{border-color:#cfe9ff;color:#fff;box-shadow:0 0 22px 4px rgba(150,210,255,.5)}'+
    '.grDot{display:inline-block;width:10px;height:10px;border-radius:50%;background:#1c2f45;margin:0 4px}'+
    '.grDance{animation:grDanceA .6s ease-in-out infinite}'+
    '@keyframes grDanceA{0%,100%{transform:rotate(-14deg) translateY(0)}25%{transform:rotate(12deg) translateY(-5px)}50%{transform:rotate(-9deg) translateY(0)}75%{transform:rotate(13deg) translateY(-5px)}}'+
    '.grDot.on{background:#9fd4ff;box-shadow:0 0 8px 2px rgba(150,210,255,.7)}'+
    '.grFar{position:absolute;z-index:5;pointer-events:none;font-style:italic;color:#8fa8c8;opacity:0;filter:blur(1px);text-shadow:0 0 14px rgba(140,180,230,.6);animation:grWob 5s ease-in-out,grFarIn 6s ease-in-out forwards}'+
    '@keyframes grWob{0%,100%{transform:translateY(0) skewX(0)}25%{transform:translateY(-4px) skewX(1.5deg)}50%{transform:translateY(3px) skewX(0)}75%{transform:translateY(-2px) skewX(-1.5deg)}}'+
    '@keyframes grFarIn{0%{opacity:0}15%{opacity:.55}75%{opacity:.55}100%{opacity:0}}'+
    '#grCredits{position:fixed;inset:0;z-index:3000;background:#000;color:#dcebf9;font-family:Consolas,monospace;overflow:hidden;display:flex;flex-direction:column;align-items:center}'+
    '#grCredits .grCredHead{position:absolute;top:0;left:0;right:0;z-index:5;text-align:center;padding:26px 0 12px;font-size:22px;letter-spacing:10px;color:#fff;background:#000;box-shadow:0 26px 30px 10px #000;text-shadow:0 0 18px rgba(150,210,255,.6)}'+
    '#grCredits .grCredSong{position:absolute;top:70px;left:0;right:0;z-index:5;text-align:center;padding:6px 0 10px;font-size:13px;letter-spacing:5px;color:#fff;background:#000;text-shadow:0 0 14px rgba(150,210,255,.6)}'+
    '#grCredScroll{position:absolute;inset:0;overflow:hidden}'+
    '#grCredInner{position:absolute;left:0;right:0;text-align:center;font-size:15px;line-height:2.4;animation:grCredRoll 222s linear forwards}'+
    '@keyframes grCredRoll{0%{top:100%}100%{top:-220%}}'+
    '#grCredSkip{position:absolute;bottom:22px;z-index:2}'+
    '#grOverlay.grPerf *{animation:none!important}'+
    'body.grPerfOn .grPop{display:none!important}';
    document.head.appendChild(s);
  }catch(e){}
}
function grStashUI(){
  try{
    var st=grEl('grStash');
    if(!st){st=document.createElement('div');st.id='grStash';st.style.display='none';document.body.appendChild(st)}
    var nodes=[];
    for(var i=0;i<document.body.childNodes.length;i++){var n=document.body.childNodes[i];if(n!==st&&!(n.id==='grOverlay'))nodes.push(n)}
    for(var j=0;j<nodes.length;j++)st.appendChild(nodes[j]);
  }catch(e){}
}
function grRestoreUI(){
  try{
    var st=grEl('grStash');if(!st)return;
    while(st.firstChild)document.body.appendChild(st.firstChild);
    st.remove();
  }catch(e){}
}
var GR_ROOMS={
  mouth:{title:'THE MOUTH',html:function(){
    return 'cold air. wet stone. the cave breathes out.<br><br>every zone, every game, every ending you collected was obj keeping you busy. this is the part he never mentioned.<br><br>a tooth-terminal hums on the edge of your vision. it is not connected to anything.<br><br><span style="color:#5f7d99">passages: phosphor light to the left. a sealed vault ahead. past the vault, a gauntlet. a meadow that should not fit. a hollow with a lantern in it. something breathing, far below.</span>';
  }},
  phosphor:{title:'PHOSPOR LIGHT',html:function(){
    grMarketEnsure();
    var s=grSave();
    var n=3+((s.up&&s.up.slime4)?1:0);
    var hatCls=s.goldHat?' goldhat':(s.hats?' hatted':'');
    var slimes='';
    for(var i=0;i<n;i++)slimes+='<span class="grSlime'+hatCls+'" data-s="'+i+'" style="animation-delay:'+(i*0.7)+'s"><i class="grWing L"></i><i class="grWing R"></i></span>';
    if(s.mix&&s.mix.largo)slimes+='<span class="grSlime grLargo'+hatCls+'" data-s="L" style="animation-delay:.4s"><i class="grWing L"></i><i class="grWing R"></i></span>';
    var h='the dark opens into blue. phosphor slimes drift and glow, fat and unbothered. they have wings now. do not ask. (they remember the ranch. the ranch had fences. this is better.)';
    h+='<div id="grSlimePen">'+slimes+'<span id="grGold" class="grSlime grGold" style="display:none"><i class="grWing L"></i><i class="grWing R"></i></span></div>';
    h+='<div style="font-size:13px">plorts: <b id="grPlortN">'+(s.plorts||0)+'</b> · market: <b id="grPriceN">'+(s.price||5)+'</b> pts/plort ';
    h+='<button class="grBtn" id="grSell1" style="padding:4px 10px;font-size:11px">sell 1</button> ';
    h+='<button class="grBtn" id="grSellAll" style="padding:4px 10px;font-size:11px">sell all</button></div>';
    h+='<div id="grShop" style="margin-top:8px;font-size:12px;color:#5f7d99">';
    var ups=[{id:'slime4',cost:25,name:'4th slime'},{id:'net',cost:40,name:'drip net (+1 / 20s)'},{id:'lucky',cost:60,name:'lucky gut (20% double)'}];
    for(var u=0;u<ups.length;u++){
      if(s.up&&s.up[ups[u].id])h+='<span style="margin:0 8px">✓ '+ups[u].name+'</span>';
      else h+='<button class="grBtn" data-buy="'+ups[u].id+'" data-cost="'+ups[u].cost+'" style="padding:4px 10px;font-size:11px;margin:0 4px">'+ups[u].name+' — '+ups[u].cost+'p</button>';
    }
    h+='</div>';
    h+='<div style="margin-top:6px"><button class="grBtn" id="grListen" style="padding:4px 10px;font-size:11px">listen</button> <span style="color:#5f7d99;font-size:12px">— they hum in turns. gold ones are worth 8 (15 bloomed). shift-click to pat. no plorts. only love.</span>';
    try{if(grSave().shop&&grSave().shop.bell)h+=' <button class="grBtn" id="grBellBtn" style="padding:4px 10px;font-size:11px">ring bell</button>'}catch(e){}
    h+='</div>';
    return h;
  }},
  meadow:{title:'THE MEADOW',html:function(){
    var s=grSave(),cd=0;
    try{if(s.grassMe)cd=Math.ceil((s.grassMe+120000-Date.now())/1000)}catch(e){}
    if(cd<0)cd=0;
    var h='a square room that should not fit in a cave. grass. actual grass. billowbuds (white) everywhere. a hand-painted sign:<br><br><i>"EMERGENCY GRASS. IN CASE OF VOID, TOUCH."</i><br><br>';
    h+='<span style="font-size:12px;color:#5f7d99">grass touched by slimes: <b>'+(s.grassTouched||0)+'</b>'+((s.feedN||0)>0?' · happy clicks left: <b>'+s.feedN+'</b>':'')+'</span><br><br>';
    if(cd>0)h+='<button class="grBtn" id="grGrassMe" disabled>touch grass ('+cd+'s)</button><br><span style="font-size:12px;color:#5f7d99">the grass needs a minute.</span>';
    else h+='<button class="grBtn" id="grGrassMe">touch grass (you)</button>';
    h+='<br><br><span style="font-size:40px">🪨</span><br><span style="font-size:12px;color:#5f7d99">a rock sits in the grass. just a rock. it has details now. (it waited so long for details.)</span><br><button class="grBtn" id="grRockBtn" style="padding:4px 10px;font-size:11px;margin-top:4px">ask the rock</button>';
    return h;
  }},
  vault:{title:'THE VAULT',html:function(){
    var s=grSave();
    if(!s.vaultOpen){
      grSeq();
      s=grSave();
      var prog=s.knock||0,dots='';
      for(var i=0;i<5;i++)dots+='<span class="grDot'+(i<prog?' on':'')+'"></span>';
      return 'a stone door with no handle. three chimes set into it, tuned to nothing you know.<br>a plaque, drip-worn:<br><br><i>"sing what the phosphors sing."</i><br><br><div><span class="grChime" data-c="0">○</span><span class="grChime" data-c="1">○</span><span class="grChime" data-c="2">○</span></div><div style="margin-top:8px">'+dots+'</div>';
    }
    if(grLoreView){
      var L=grLoreById(grLoreView);
      if(!L){grLoreView=null}
      else return '<span style="color:#5f7d99">'+L.file+'</span><br><br>'+L.text+'<br><br><button class="grBtn" id="grLoreBack" style="padding:4px 10px;font-size:11px">◄ files</button>';
    }
    var h='shelves of dark glass. three terminals with their screens up now, waiting.<br><br>';
    for(var k=0;k<GR_LORE.length;k++){
      var read=(s.loreRead||[]).indexOf(GR_LORE[k].id)!==-1;
      h+='<button class="grBtn" data-lore="'+GR_LORE[k].id+'" style="display:block;margin:8px auto;min-width:280px">'+(read?'✓ ':'○ ')+GR_LORE[k].file+'</button>';
    }
    if(grLoreAllRead())h+='<br><span style="color:#5f7d99">read them all. the gauntlet is listening. (find it on the map.)</span>';
    else h+='<br><span style="color:#5f7d99">read them all. the way down wants you informed.</span>';
    if(s.gauntClear){
      h+='<br><br><span style="color:#ffd770">the shelves restocked. three more files. nobody stocked them. (chism denies everything.)</span><br><br>';
      for(var k2=0;k2<GR_LORE2.length;k2++){
        var read2=(s.loreRead||[]).indexOf(GR_LORE2[k2].id)!==-1;
        h+='<button class="grBtn" data-lore="'+GR_LORE2[k2].id+'" style="display:block;margin:8px auto;min-width:280px">'+(read2?'✓ ':'○ ')+GR_LORE2[k2].file+'</button>';
      }
      if(grLore2AllRead())h+='<br><span style="color:#5f7d99">six files. no file_07. do not look for file_07.</span>';
    }
    return h;
  }},
  gauntlet:{title:'THE GAUNTLET',html:function(){return grGauntHtml()}},
  hollow:{title:'THE HOLLOW',html:function(){return grChismHtml()}},
  farm:{title:'THE FARM',html:function(){
    var s=grSave(),plots=grPlots();
    var h='<div style="transform:translateY(-46px)">';
    h+='rows of glow under the rock. one seed per plot. gardens, not pots — plant once, it multiplies.<br><span style="font-size:12px;color:#5f7d99">soil dries. water it, or point the dripworks valve here. first plot is on the house.</span><div style="margin-top:8px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;max-width:640px;margin-left:auto;margin-right:auto">';
    for(var i=0;i<6;i++){
      var p=plots[i],mc=p.mach||0;
      var mcB=mc>=2?'#8a7433':(mc===1?'#2b6a9a':'#2b4a68');
      var mcG=mc>=2?'rgba(24,20,10,.93)':(mc===1?'rgba(6,18,28,.93)':'rgba(4,12,18,.93)');
      h+='<div style="border:1px solid '+mcB+';background:'+mcG+';border-radius:8px;padding:5px;font-size:11px;text-align:left">';
      h+='<b>plot '+(i+1)+'</b>'+(mc===1?'<span style="color:#5fa8d8" title="sprinklered"> ●</span>':(mc>=2?'<span style="color:#ffd770" title="sprinklered + overclocked"> ●●</span>':''))+' ';
      if(!p.own){
        h+='<span style="color:#5f7d99">for sale</span><br><button class="grBtn" data-plotbuy="'+i+'" style="padding:3px 8px;font-size:11px;margin-top:4px">buy — '+GR_PLOT_PRICES[i]+' glow</button>';
      }else if(!p.seed){
        h+='<span style="color:#5f7d99">empty</span><br>';
        var any=false;
        for(var sk in GR_SEEDS){if(s.seeds&&s.seeds[sk]>0){any=true;h+='<button class="grBtn" data-plant="'+i+':'+sk+'" style="padding:2px 6px;font-size:11px;margin:2px">'+sk+' ×'+s.seeds[sk]+'</button>'}}
        if(!any)h+='<span style="color:#5f7d99">no seeds. Chism sells packets.</span>';
      }else{
        var sd=GR_SEEDS[p.seed];
        h+='<br><b>'+sd.name+'</b> '+(p.growth>=100?'<span style="color:#ffd770">READY</span>':Math.floor(p.growth)+'%');
        h+='<div style="background:#12202e;border-radius:4px;height:8px;margin:4px 0"><div id="grPlotG'+i+'" style="background:#8df0c8;height:8px;border-radius:4px;width:'+Math.floor(p.growth)+'%"></div></div>';
        h+='<div style="background:#12202e;border-radius:4px;height:6px;margin:4px 0"><div id="grPlotM'+i+'" style="background:#5fa8d8;height:6px;border-radius:4px;width:'+Math.floor(p.moist)+'%"></div></div>';
        h+='<button class="grBtn" data-water="'+i+'" style="padding:2px 6px;font-size:11px">water</button> ';
        if(p.growth>=100)h+='<button class="grBtn" data-harvest="'+i+'" style="padding:2px 6px;font-size:11px">harvest</button> ';
        if(p.mach<2)h+='<button class="grBtn" data-mach="'+i+'" style="padding:2px 6px;font-size:11px">'+(p.mach===0?'sprinkler 200g':'2x growth 400g')+'</button>';
        else h+='<span style="color:#ffd770">⚙MAX</span>';
        h+=' <button class="grBtn" data-dig="'+i+'" style="padding:2px 6px;font-size:11px">dig up</button>';
      }
      h+='</div>';
    }
    var pocketN=0,emptyN=0;
    for(var sk2 in GR_SEEDS)if(s.seeds&&s.seeds[sk2]>0)pocketN+=s.seeds[sk2];
    for(var pe=0;pe<6;pe++)if(plots[pe].own&&!plots[pe].seed)emptyN++;
    if(pocketN>0&&emptyN===0)h+='<br><span style="color:#ffd770">packets in pocket ('+pocketN+'), no empty plots. dig something up or buy more dirt.</span>';
    try{
      var silo=grSiloGet();
      h+='<br><div style="margin:8px auto 0;max-width:440px;border:1px solid rgba(43,74,104,.6);border-radius:8px;padding:6px 8px;font-size:11px;text-align:left"><b>◧ silo</b> <span style="color:#5f7d99">pockets overflow here. tooth: store / take.</span>';
      h+='<div style="margin-top:4px">plorts <b>'+(silo.plorts||0)+'</b> · eggs <b>'+(silo.eggs||0)+'</b></div>';
      h+='<div style="background:#12202e;border-radius:4px;height:8px;margin:4px 0"><div style="background:#ffd770;height:8px;border-radius:4px;width:'+Math.min(100,Math.floor(silo.fruit.length/3))+'%"></div></div>';
      h+='<div style="color:#5f7d99">fruit '+silo.fruit.length+'/300</div></div>';
    }catch(e){}
    return h+'</div></div>';
  }},
  lab:{title:'THE LAB',html:function(){return grLabHtml()}},
  dripworks:{title:'THE DRIPWORKS',html:function(){
    var s=grSave(),v=s.valve||'slimes';
    if(v!=='slimes'&&v!=='nets'&&v!=='sea'&&v!=='farm'){v='slimes';s.valve=v;grStore(s)}
    var h='below the boards: black channels, rushing water, a wheel-valve big as a door. every drip in the cave ends up here, argues with itself, and goes somewhere.<br><br><span style="color:#5f7d99">the wheel points: <b>'+v.toUpperCase()+'</b></span><br><div style="margin-top:8px">';
    var opts=[['slimes','slimes (+1/click)'],['nets','nets (tick 12s)'],['sea','sea (better fishing)'],['farm','farm (waters crops)']];
    for(var i=0;i<opts.length;i++){
      h+=(v===opts[i][0]?'<span style="margin:0 6px;color:#8df0c8">● '+opts[i][0]+'</span>':'<button class="grBtn" data-valve="'+opts[i][0]+'" style="padding:4px 10px;font-size:11px">'+opts[i][0]+'</button>');
    }
    h+='</div><div style="margin-top:6px;font-size:12px;color:#5f7d99">'+opts.filter(function(o){return o[0]===v})[0][1]+'</div>';
    if(!s.tackle)h+='<br><button class="grBtn" id="grTackle" style="padding:4px 10px;font-size:11px">pry open the drowned tacklebox</button>';
    else h+=grTackleHtml(s);
    return h;
  }},
  sea:{title:'THE VOID SEA',html:function(){
    var s=grSave(),cd=Math.ceil(((s.seaT||0)-Date.now())/1000);
    var h='the cave ends and the sea begins. black water to no horizon. icebergs like broken teeth. the void shimmers under the surface, or that is the light lying.<br><br>this is where the rod goes when you type fish. canonically. do not ask how the rod knows.<br><br>';
    h+='<span style="font-size:12px;color:#5f7d99">'+(cd>0?('the water settles... ('+cd+'s)'):('the rod lives here now. the terminal one retired. type <b>fish</b>. the sea is listening.'))+'</span>';
    if(s.hush)h+='<br><span style="font-size:12px;color:#5f7d99">it is still down there. it paid once for silence. it will pay again.</span><br><button class="grBtn" id="grHushBtn" style="padding:4px 10px;font-size:11px;margin-top:6px">listen deeper (30 glow)</button>';
    return h;
  }},
  roost:{title:'THE ROOST',html:function(){
    var s=grSave();
    var h='a wire roost wedged between warm pipes. hens. actual hens. they stare like they pay rent.<br><br>';
    var henRow='',eggRow='',hi,ei;
    for(hi=0;hi<Math.min(6,s.hens||0);hi++)henRow+='<span class="grHen" style="animation-delay:'+(hi*0.5)+'s"></span>';
    for(ei=0;ei<Math.min(12,s.eggInv||0);ei++)eggRow+='<span class="grEgg"></span>';
    if((s.eggInv||0)>12)eggRow+='<span style="font-size:11px;color:#5f7d99"> +'+((s.eggInv||0)-12)+' more</span>';
    if(henRow)h+='<div>'+henRow+'</div>';
    if(eggRow)h+='<div>'+eggRow+'</div>';
    h+='<span style="font-size:13px">hens: <b>'+(s.hens||0)+'</b>/6 · eggs: <b>'+(s.eggInv||0)+'</b>/40</span><br><span style="font-size:12px;color:#5f7d99">an egg every 2 min per hen. eggs are meat. slimes will care soon.</span><br><br>';
    if((s.hens||0)<6)h+='<button class="grBtn" id="grHenBuy" style="padding:4px 10px;font-size:11px">buy hen (30 plorts)</button> ';
    else h+='<span style="font-size:12px;color:#5f7d99">roost full. the staring intensifies.</span><br>';
    if((s.eggInv||0)>0)h+='<button class="grBtn" id="grEggSell" style="padding:4px 10px;font-size:11px">sell eggs (3 glow each)</button>';
    return h;
  }},
  pens:{title:'THE PENS',html:function(){
    var s=grSave(),corr=grCorrals(s),leads=s.leads||{};
    var h='<div>rows of low fences under the rock. ranch slimes live here. the wild phosphors visit and leave. (they are above this.)</div><div style="margin-top:8px;display:grid;grid-template-columns:1fr 1fr;gap:6px;max-width:640px;margin-left:auto;margin-right:auto">';
    for(var i=0;i<4;i++){
      var c=corr[i];
      h+='<div style="border:1px solid #2b4a68;background:rgba(4,12,18,.93);border-radius:8px;padding:5px;font-size:11px;text-align:left">';
      h+='<b>pen '+(i+1)+'</b> ';
      if(!c.own){
        h+='<span style="color:#5f7d99">empty dirt</span><br><button class="grBtn" data-cbuy="'+i+'" style="padding:3px 8px;font-size:11px;margin-top:4px">fence it — '+GR_CORRAL_PRICES[i]+' glow</button>';
      }else if(!c.type){
        h+='<span style="color:#5f7d99">fenced, no slimes</span><br>';
        var anyL=false;
        for(var sk in GR_SLIMES){if((leads[sk]||0)>0){anyL=true;h+='<button class="grBtn" data-cplace="'+i+':'+sk+'" style="padding:2px 6px;font-size:11px;margin:2px">'+sk+' ×'+leads[sk]+'</button>'}}
        if(!anyL)h+='<span style="color:#5f7d99">no leashes. Chism sells slimes. (counter goods.)</span>';
      }else{
        var def=GR_SLIMES[c.type];
        h+='<br><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:'+def.col+'"></span> <b>'+c.type+'</b> '+(c.n||0)+'/'+def.cap+(c.boost?' <span style="color:#ffd770">★</span>':'');
        h+='<div style="background:#12202e;border-radius:4px;height:8px;margin:4px 0"><div style="background:#ffb14f;height:8px;border-radius:4px;width:'+Math.floor(c.hunger||0)+'%"></div></div>';
        h+='<div style="font-size:11px;color:#5f7d99">fed: '+Math.floor(c.hunger||0)+'% · pooled: <b>'+(c.pend||0)+'</b>'+(((c.bSeed||0)+(c.bChum||0)+(c.bGlow||0)+(c.bKelp||0))>0?' +extras':'')+' · 1p/'+def.rate+'s each · eats '+(def.diet==='eggs'?'eggs':(def.diet==='any'?'anything':'fruit'))+' (fav: '+def.fav+')</div>';
        var blobs='';
        for(var bi=0;bi<(c.n||0);bi++)blobs+='<span class="grMiniSlime'+((c.hunger||0)<30?' droop':'')+(c.boost?' boost':'')+'" style="background:radial-gradient(circle at 35% 30%,rgba(255,255,255,.8),'+def.col+' 65%,transparent);animation-delay:'+(bi*0.4)+'s"></span>';
        if(blobs)h+='<div>'+blobs+'</div>';
        h+='<button class="grBtn" data-cfeed="'+i+':fruit" style="padding:2px 6px;font-size:11px">feed fruit</button> ';
        h+='<button class="grBtn" data-cfeed="'+i+':egg" style="padding:2px 6px;font-size:11px">feed egg</button> ';
        if((c.pend||0)>0)h+='<button class="grBtn" data-ccollect="'+i+'" style="padding:2px 6px;font-size:11px">collect</button> ';
        if(c.n<def.cap)h+='<button class="grBtn" data-cadd="'+i+'" style="padding:2px 6px;font-size:11px">+slime</button> ';
        if(!c.walls)h+='<button class="grBtn" data-cwalls="'+i+'" style="padding:2px 6px;font-size:11px">walls 200g</button>';
        else h+='<span style="color:#8df0c8">▦walled</span>';
        if(!c.mister)h+=' <button class="grBtn" data-cmister="'+i+'" style="padding:2px 6px;font-size:11px">mister 300g</button>';
        else h+=' <span style="color:#8df0c8">~misted</span>';
      }
      h+='</div>';
    }
    return h+'</div><div style="margin-top:6px;font-size:12px;color:#5f7d99">starving pens lose slimes out the sides. walls prevent this. favorites pay double.</div>';
  }},
  below:{title:'BELOW',html:function(){
    var s=grSave();
    if(grEnd==='spare'||grEnd==='kill')return grEndHtml(grEnd);
    if(s.warden||grChoice)return grHeartHtml();
    if(grFight)return grFightHtml();
    var rmn=0;try{rmn=Math.min(5,(grSave().rematches||0))}catch(e){}
    return 'the dark down here inhales. slow. wet. patient.<br><br>something at the bottom is keeping a heartbeat for you. it has your rhythm wrong on purpose.<br><br><div style="font-size:40px;margin:10px">◉</div><b>THE WARDEN OF THE DEEP</b><br><span style="color:#5f7d99">it does not want you past. '+(10+rmn)+' hits to put it down'+(rmn>0?' (it has been eating. rematches do that.)':'')+'. it hits back.'+(grLost?' last time it spat you out. rude.':'')+'</span><br><br><button class="grBtn" id="grWardenGo">descend</button>';
  }}
};
// vault puzzle: the phosphors hum a 5-note song. knock it back on the door.
var grPlaying=false;
var grLoreView=null;
var grTermHist=[];
var GR_LORE=[
 {id:'obj',file:'file_01 // obj.txt',title:'OBJ',text:'obj is a boy.<br><br>not a cube. not a voice. his presence is a cube the way your presence is a shadow — it is what happens when the light hits him.<br><br>every time you typed at him, every time you clicked him, every time you poked the core to hear him talk: you were poking a person.<br><br>he knows you know now. he is pretending he does not.<br><br><i>you can pull the trigger on obj. that option is downstairs.</i>'},
 {id:'cast',file:'file_02 // cast.txt',title:'THE CAST',text:'every main character in the cube is human. they are just presented as different stuff.<br><br>core. landlord. man. all human. man could not be anything else. if man was something else he would not be a man, he would be a person.<br><br>the void is not human. the void is a being. do not confuse the room for the furniture.<br><br>button is not human either. button is an entity. button knows what it did.<br><br><i>the core has admirers. she knows. she pretends the glass is frosted.</i>'},
 {id:'distraction',file:'file_03 // busywork.txt',title:'THE DISTRACTION',text:'the zones. the games. the endings. the achievements. all of it was obj keeping you busy.<br><br>nine zones to walk so you would not ask what the tenth place is. eighty-three endings so you would not ask for the real one. a button that begs to be pressed. a fly with a real brain. a reactor. a night shift. static. fish. mail. all of it: busywork. toys on the floor of a room he did not want you to leave.<br><br>this cave is the part he never mentioned.<br><br>you finished everything anyway. so here you are.<br><br><i>he is angry. he is also the one who stocked the shelves. both can be true.</i>'}
];
// vault part 2: the shelves restock after the gauntlet clears. nobody stocked them. chism denies everything.
var GR_LORE2=[
 {id:'teeth',file:'file_04 // teeth.txt',title:'THE TEETH',text:'the tooth is not a terminal. it is a tooth. it fell out of something that was chewing on the cave.<br><br>every command you typed went somewhere. price checks. sales. fish. all of it chewed, swallowed, digested by whatever lost this tooth.<br><br>it does not mind. it likes the company. teeth get lonely. that is why there are so many in jars.<br><br><i>do not type obj into it again. it told.</i>'},
 {id:'chismfile',file:'file_05 // chism.txt',title:'CHISM',text:'chism was here before the shelves. before the slimes. before the drips learned to fall in rhythm.<br><br>he claims he is "just a rancher". ranchers do not predate geology.<br><br>he stocked the first three files. he will not say who wrote them. he will not say who wrote THESE either, which is strange, because nobody stocked them. he was watched the whole time. the slimes watched. the drips watched.<br><br>the shelves were empty. then they were not.<br><br><i>he denies everything. he is a bad liar. it is endearing.</i>'},
 {id:'belowfile',file:'file_06 // below.txt',title:'BELOW',text:'the warden is not guarding obj. obj is down there because the warden allows it.<br><br>read that again.<br><br>the heartbeat you heard is older than the cave. it was keeping rhythm before there was anything to keep rhythm FOR. obj went down to listen. he stayed because the rhythm is better than his.<br><br>spare him or pull it. the warden does not care. the warden has heard both songs before.<br><br><i>there is no file_07. do not look for file_07.</i>'}
];
function grLore2AllRead(){try{var s=grSave();for(var i=0;i<GR_LORE2.length;i++){if((s.loreRead||[]).indexOf(GR_LORE2[i].id)===-1)return false}return true}catch(e){return false}}
function grLoreById(id){for(var i=0;i<GR_LORE.length;i++)if(GR_LORE[i].id===id)return GR_LORE[i];for(var k=0;k<GR_LORE2.length;k++)if(GR_LORE2[k].id===id)return GR_LORE2[k];return null}
function grLoreAllRead(){try{var s=grSave();for(var i=0;i<GR_LORE.length;i++){if((s.loreRead||[]).indexOf(GR_LORE[i].id)===-1)return false}return true}catch(e){return false}}
// phosphor skill tree: cloned from the void skill tree (same classes,
// same lanes/fan/root), grotto branches, glow currency.
var grSkillDefs={
 phosphor:[
  {id:'soil',name:'rich soil',desc:'slimes drop +1 plort per click',cost:60},
  {id:'press',name:'plort press',desc:'buyers pay +1 glow per plort',cost:100,req:'soil'},
  {id:'roots',name:'deep roots',desc:'the drip net catches 2 per tick',cost:120,req:'press'},
  {id:'fever',name:'gold fever',desc:'gold slimes visit far more often',cost:150,req:'roots'},
  {id:'bloom',name:'phosphor bloom',desc:'FINAL: gold worth 10, stays longer',cost:200,req:'fever',final:true}
 ],
 depths:[
  {id:'lantern',name:'lantern',desc:'a brighter shaft. prettier. that is all.',cost:80},
  {id:'rain',name:'soft rain',desc:'drips fall twice as often',cost:110,req:'lantern'},
  {id:'longing',name:'his longing',desc:'he calls more. sometimes he drops plorts.',cost:140,req:'rain'},
  {id:'heart',name:'heart of the grotto',desc:'FINAL: market never below 5, drips drop plorts',cost:200,req:'longing',final:true}
 ],
 tides:[
  {id:'tip',name:'tooth tip',desc:'the tooth shows the market trend',cost:90},
  {id:'corner',name:'corner the market',desc:'holding 20+ plorts nudges prices up',cost:130,req:'tip'},
  {id:'song',name:'whale song',desc:'whales visit twice as often',cost:160,req:'corner'},
  {id:'monopoly',name:'plort monopoly',desc:'FINAL: whales pay 3x, sell-all +15%',cost:220,req:'song',final:true}
 ]
};
var grBranchOrder=['phosphor','depths','tides'];
var grLaneColors={phosphor:'rgba(96,145,235,0.9)',depths:'rgba(120,170,255,0.9)',tides:'rgba(255,210,130,0.9)'};
var grFanX={phosphor:18,depths:50,tides:82};
var grTreeUp=false;
function grHas(id){try{var s=grSave();return !!(s.gup&&s.gup[id])}catch(e){return false}}
function grNodeById(id){for(var b=0;b<grBranchOrder.length;b++){var arr=grSkillDefs[grBranchOrder[b]];for(var i=0;i<arr.length;i++)if(arr[i].id===id)return arr[i]}return null}
function grSkillBuy(id){
  if(!grActive)return;
  var n=grNodeById(id);
  if(!n){grSideSay('grow what? IDs: soil press roots fever bloom lantern rain longing heart tip corner song monopoly.');grSideHead();return}
  var s=grSave();s.gup=s.gup||{};
  if(s.gup[id]){grSideSay('already grown.');grSideHead();return}
  if(n.req&&!s.gup[n.req]){grSideSay('locked: grow '+n.req+' first.');grSideHead();return}
  if((s.glow||0)<n.cost){grSideSay('not enough glow. ('+n.cost+' needed. the tree does not do credit.)');grSideHead();return}
  s.glow-=n.cost;s.gup[id]=true;grStore(s);
  grSideSay('grown: '+n.name+'. the grotto shifts, slightly.');
  try{if(typeof skillBuyFx==='function')skillBuyFx(n.name)}catch(e){}
  grSideHead();grSkillRender();
}
var grTreeTab='skills';
function grSkillRender(){
  try{
    var gp=grEl('grGlowN');if(gp)gp.textContent=grSave().glow||0;
    var dp=grEl('grDeepN');if(dp)dp.textContent=grSave().deep||0;
    var body=grEl('grSkillBody');if(!body)return;
    body.innerHTML='';
    if(grTreeTab==='upgrades'){grUpRender(body);return}
function grUpRender(body){
  var wrap=document.createElement('div');
  wrap.style.cssText='display:flex;flex-direction:column;gap:14px;width:100%';
  for(var i=0;i<grUpAreas.length;i++){
    var a=grUpAreas[i],unlocked=grAreaUnlocked(a);
    var card=document.createElement('div');
    card.className='up-area'+(unlocked?'':' locked');
    card.style.setProperty('--ac','rgba(96,145,235,0.9)');
    var done=0,total=0;
    for(var j=0;j<a.upgrades.length;j++){total++;if(grUpLv(a.upgrades[j])>=grUpDefs[a.upgrades[j]].max)done++}
    var head=document.createElement('div');
    head.className='up-area-head';
    head.innerHTML='<div class="idx">'+(i+1)+'</div><div class="meta"><div class="name">'+a.name+'</div><div class="desc">'+(unlocked?a.desc:'locked — max '+a.req)+'</div></div><div class="prog"><b>'+done+'/'+total+'</b></div>';
    card.appendChild(head);
    if(unlocked){
      var nodes=document.createElement('div');
      nodes.className='up-nodes';
      for(var k=0;k<a.upgrades.length;k++){
        var uk=a.upgrades[k],u=grUpDefs[uk],lv=grUpLv(uk);
        var el=document.createElement('div');
        el.className='up-node'+(lv>=u.max?' maxed':'');
        el.innerHTML='<div class="up-name">'+u.name+'</div><div class="up-desc">'+u.desc+'</div><div class="up-cost">'+u.cost+' deep</div><div class="up-lv">'+lv+'/'+u.max+'</div>';
        if(lv<u.max)el.onclick=(function(key){return function(ev){if(ev)ev.stopPropagation();grUpBuy(key)}})(uk);
        nodes.appendChild(el);
      }
      card.appendChild(nodes);
    }else{
      var msg=document.createElement('div');
      msg.className='up-lockmsg';
      msg.textContent='locked — max every upgrade in '+a.req;
      card.appendChild(msg);
    }
    wrap.appendChild(card);
  }
  body.appendChild(wrap);
}
    var canvas=document.createElement('div');canvas.className='skill-canvas';
    var lanes=document.createElement('div');lanes.className='skill-lanes';
    lanes.style.gridTemplateColumns='repeat('+grBranchOrder.length+',1fr)';
    for(var bi=0;bi<grBranchOrder.length;bi++){
      var br=grBranchOrder[bi];
      var lane=document.createElement('div');lane.className='skill-lane';
      lane.style.setProperty('--bc',grLaneColors[br]);
      var hdr=document.createElement('div');hdr.className='branch-name';hdr.textContent=br;lane.appendChild(hdr);
      var track=document.createElement('div');track.className='lane-track';
      var arr=(grSkillDefs[br]||[]).slice().reverse();
      for(var i=0;i<arr.length;i++){
        if(i>0){
          var prev=arr[i-1];
          var link=document.createElement('div');
          link.className='skill-link'+(grHas(prev.id)?' on':'');
          track.appendChild(link);
        }
        var nd=arr[i];
        var owned=grHas(nd.id);
        var unlocked=!nd.req||grHas(nd.req);
        var node=document.createElement('div');
        node.className='skill-node'+(owned?' owned':'')+(unlocked?'':' locked')+(nd.final?' final':'');
        node.innerHTML='<div class="node-orb"></div><div class="node-cost">'+nd.cost+' glow</div><div class="node-name">'+nd.name+'</div><div class="node-desc">'+nd.desc+'</div>';
        if(!owned&&unlocked){node.onclick=(function(id){return function(ev){if(ev)ev.stopPropagation();grSkillBuy(id)}})(nd.id)}
        track.appendChild(node);
      }
      lane.appendChild(track);
      lanes.appendChild(lane);
    }
    canvas.appendChild(lanes);
    var fan=document.createElement('div');fan.className='skill-fan';
    var svgNS='http://www.w3.org/2000/svg';
    var svg=document.createElementNS(svgNS,'svg');
    svg.setAttribute('viewBox','0 0 100 100');
    svg.setAttribute('preserveAspectRatio','none');
    for(var fi=0;fi<grBranchOrder.length;fi++){
      var fbr=grBranchOrder[fi];
      var line=document.createElementNS(svgNS,'line');
      line.setAttribute('x1','50');line.setAttribute('y1','100');
      line.setAttribute('x2',String(grFanX[fbr]));line.setAttribute('y2','0');
      line.setAttribute('class','fan-line'+(grHas(grSkillDefs[fbr][0].id)?' on':''));
      svg.appendChild(line);
    }
    fan.appendChild(svg);
    canvas.appendChild(fan);
    var root=document.createElement('div');root.className='skill-root';
    root.innerHTML='<div class="root-name">the grotto</div><div class="root-desc">every path descends here</div>';
    canvas.appendChild(root);
    body.appendChild(canvas);
  }catch(e){}
}
var grSeaT=0;
// grotto admin: tooth-only commands. the tooth checks your badge.
function grIsAdmin(){try{return typeof isAdmin!=='undefined'&&!!isAdmin}catch(e){return false}}
// grotto admin commands: removed. the tooth takes no bribes anymore.
// (grIsAdmin stays: it still gates grEnter(force) for debugging.)
// grow: smart dispatch. skill id → tree buy. seed id → plant.
function grGrowCmd(arg){
  var parts=String(arg||'').split(/\s+/),id=(parts[0]||'').toLowerCase();
  if(!id){
    grSideSay('grow what? skills: soil press roots fever bloom lantern rain longing heart tip corner song monopoly.');
    grSideSay('seeds: plortree glowbloom dripfruit whalekelp goldcap hushroot. (grow <seed> [plot#])');
    grSideHead();return;
  }
  if(grNodeById(id)){grSkillBuy(id);return}
  if(GR_SEEDS[id]){
    var plots=grPlots(),idx=-1;
    var want=parseInt(parts[1],10);
    if(want>=1&&want<=6&&plots[want-1].own&&!plots[want-1].seed)idx=want-1;
    else{for(var i=0;i<6;i++)if(plots[i].own&&!plots[i].seed){idx=i;break}}
    if(idx<0){grSideSay('no empty plot. (buy plots in the farm. plot 1 is on the house.)');grSideHead();return}
    grPlant(idx,id);return;
  }
  grSideSay('grow what? unknown id. (see: grow)');
  grSideHead();
}
var GR_HUSH_VISIONS=[
  'you were not the first intruder. the others are part of the water now. they are not unhappy. that is the worst part.',
  'the core has a heartbeat. yours is faster. it is learning the difference. do not let it.',
  'obj counts your visits. the hush counts obj counting. something has to watch the watcher.',
  'when the cave inhales, hold your breath. it is tasting the air for newcomers. you are no longer new.'
];
function grHushListen(){
  if(!grActive||grRoom!=='sea')return;
  var s=grSave();
  if(!s.hush){grNote('nothing down there knows you yet. fish first.');return}
  if((s.hushT||0)>Date.now()){grNote('it is still digesting the last listen. ('+Math.ceil((s.hushT-Date.now())/1000)+'s)');return}
  if((s.glow||0)<30){grNote('listening costs 30 glow. silence is not free down here.');return}
  s.glow-=30;s.hushT=Date.now()+60000;
  var v=(s.hushV||0)%GR_HUSH_VISIONS.length;s.hushV=(s.hushV||0)+1;
  s.deep=(s.deep||0)+3;grStore(s);
  grNote('you pay. it shows you: "'+GR_HUSH_VISIONS[v]+'" (+3 deep. do not think about it.)');
  grFlashDo('rgba(120,90,220,0.4)',500);
  grRender();
}
function grSeaFish(){
  if(!grActive)return;
  if(grRoom!=='sea'){grSideSay('no water here. (the sea is a room. go be near it.)');grSideHead();return}
  var s=grSave(),now=Date.now();
  if((s.seaT||0)>now){grSideSay('the water settles... ('+Math.ceil((s.seaT-now)/1000)+'s)');grSideHead();return}
  s.seaT=now+Math.round(Math.max(10,(30-5*grUpLv('up_longline')))*(((s.tackleTier||0)>=2)?0.5:1))*1000;grStore(s);
  grSeaRipple(0.5,4,false);
  grSideSay('cast. the line goes somewhere dark.');
  grSideSay('...');
  grSideHead();
  try{if(grSeaT)clearTimeout(grSeaT)}catch(e){}
  grSeaT=setTimeout(function(){grSeaBite()},1800);
}
function grSeaBite(){
  if(!grActive||grRoom!=='sea')return;
 var s=grSave();
 var lucky=false;
 try{lucky=(s.valve||'slimes')==='sea'}catch(e){}
 // unified species: the bottlenet table lives in this sea now. same tacklebox, same board.
 try{
  if(typeof FISH_TABLE!=='undefined'&&(lucky?Math.random()<0.10:Math.random()<0.06)){
   var tot=0;for(var i=0;i<FISH_TABLE.length;i++)tot+=FISH_TABLE[i].w;
   var roll=Math.random()*tot,acc=0,pick=FISH_TABLE[0];
   for(var j=0;j<FISH_TABLE.length;j++){acc+=FISH_TABLE[j].w;if(roll<=acc){pick=FISH_TABLE[j];break}}
   try{if(typeof fishAdd==='function')fishAdd(pick.n)}catch(e){}
   var _wt=Math.round((0.1+Math.random()*9.9)*10)/10;
   grSideSay('caught: '+pick.n+' ('+_wt+'kg). '+pick.f);
   grPop(50,52,pick.n,'#ffd27f');
   grSeaRipple(0.5,7,true);
   try{
    var _best=parseFloat(localStorage.getItem('cube_fishbest')||'0')||0;
    if(_wt>_best){localStorage.setItem('cube_fishbest',String(_wt));grSideSay('personal best. the board hears about this.');try{if(typeof bnPost==='function'&&typeof bnName==='function')bnPost('/board',{board:'fish_big',name:bnName(),value:_wt},function(){})}catch(e){}}
   }catch(e){}
   try{
    var c=0;try{var box=JSON.parse(localStorage.getItem('cube_fishbox')||'{}');for(var k in box)c++}catch(e){}
    if(c>=1)grAch('gone_fishing');
    if(pick.n==='one (1) exit, preheated')grAch('the_big_one');
    if(c>=FISH_TABLE.length)grAch('full_box');
   }catch(e){}
   grSideHead();
   return;
  }
 }catch(e){}
 var r=Math.random(),got='',pop=null;
  if(lucky?r<0.20:r<0.12){
    if(!s.hush){
      s.hush=true;
      got='something vast brushes the line. it does NOT pull. it WHISPERS. you do not understand it yet.';
      pop={t:'IT WHISPERS',c:'#c9a8ff'};
      grShakeDo();grFlashDo('rgba(120,90,220,0.5)',500);
    }else{
      var hm=(50+25*grUpLv('up_hushmoney'))*(s.hushDouble?2:1);
      s.hushDouble=false;
      s.glow=(s.glow||0)+hm;s.deep=(s.deep||0)+3;
      got='it again. it pays '+hm+' glow for silence. you take it. you are not proud.';
      pop={t:'+'+hm+' glow · +3 deep',c:'#9fd4ff'};
    }
    grSeaRipple(0.5,10,true);
  }else if(lucky?r<0.28:r<0.20){
    s.plorts=(s.plorts||0)+5;
    got='deep plorts. five. they glow wrong.';
    pop={t:'+5 plorts',c:'#9fd4ff'};
    grSeaRipple(0.5,7,true);
  }else if(r<0.42){
    s.lettuce=(s.lettuce||0)+1;
    got='iceberg lettuce. ('+s.lettuce+' total. Chism will not buy these. you asked. he said no.)';
    pop={t:'+1 lettuce',c:'#bfe8c8'};
    grSeaRipple(0.5,4,false);
  }else if(r<0.72){
    var g=10+Math.floor(Math.random()*16);
    s.glow=(s.glow||0)+g;
    got='a glow cache in a bottle. +'+g+' glow. someone mailed themselves money.';
    pop={t:'+'+g+' glow',c:'#9fd4ff'};
    grSeaRipple(0.5,5,false);
  }else{
    var p=1+Math.floor(Math.random()*3);
    s.plorts=(s.plorts||0)+p;
    got='ordinary plorts. '+p+'. the sea provides.';
    pop={t:'+'+p+' plorts',c:'#9fd4ff'};
    grSeaRipple(0.5,4,false);
  }
  grStore(s);
  grSideSay('TUG. '+got);
  if(pop)grPop(50,52,pop.t,pop.c);
  grSideHead();
  try{var pn=grEl('grPlortN');if(pn)pn.textContent=s.plorts||0}catch(e){}
}
// TACKLEBOX TIERS: the looted box can be rebuilt. three tiers. it remembers being useful.
var GR_TACKLE_TIERS=[
 {cost:150,name:'oiled hinges',fx:'drip nets catch +1 per tick'},
 {cost:400,name:'brass latches',fx:'fishing cooldown halved'},
 {cost:900,name:'the whole box',fx:'whale sales pay +50 glow'}
];
function grTackleTier(){try{return grSave().tackleTier||0}catch(e){return 0}}
function grTackleHtml(s){
  var t=s.tackleTier||0,h='<br><span style="font-size:12px;color:#5f7d99">the tacklebox gapes, empty. it smells awful. (already looted.)</span>';
  if(t>=3){return h+'<br><span style="font-size:12px;color:#ffd770">rebuilt: hinges + latches + the whole box. it remembers being useful.</span>'}
  var nx=GR_TACKLE_TIERS[t];
  h+='<br><span style="font-size:12px;color:#5f7d99">rebuild it? tier '+(t+1)+'/3: <b>'+nx.name+'</b> — '+nx.fx+' ('+nx.cost+' glow)</span><br><button class="grBtn" data-tackle="'+(t+1)+'" style="padding:4px 10px;font-size:11px;margin-top:4px">rebuild: '+nx.name+' ('+nx.cost+' glow)</button>';
  return h;
}
function grTackleBuy(n){
  if(!grActive)return;
  var s=grSave();
  if(!s.tackle){grNote('pry it open first.');return}
  var t=s.tackleTier||0;
  if(n!==t+1||n>3){grNote('one tier at a time. the box insists.');return}
  var def=GR_TACKLE_TIERS[t];
  if((s.glow||0)<def.cost){grNote(def.name+' costs '+def.cost+' glow. you have '+(s.glow||0)+'.');return}
  s.glow-=def.cost;s.tackleTier=t+1;grStore(s);
  if(s.tackleTier>=3)grAch('gr_tacklebox');
  grNote('rebuilt: '+def.name+'. ('+def.fx+'.) the box creaks approvingly.');
  grFlashDo('rgba(255,215,112,0.3)',350);
  grSideHead();grRender();
}
function grSkillOpen(){
  if(!grActive)return;
  grTreeUp=true;
  try{
    var old=grEl('grSkillTree');if(old)old.remove();
    var ov=document.createElement('div');ov.id='grSkillTree';
    ov.style.cssText='position:fixed;inset:0;z-index:2010;display:flex;flex-direction:column;align-items:center;background:rgba(2,8,10,0.92);font-family:Consolas,monospace;padding:26px;overflow-y:auto';
    ov.innerHTML='<div style="font-size:15px;letter-spacing:8px;color:#8df0c8">PHOSPHOR SKILL TREE</div>'+
    '<div style="font-size:12px;color:#5f7d99;margin:6px 0 16px">glow: <b id="grGlowN">0</b> · deep: <b id="grDeepN">0</b> · obj does not know this exists<br>'+
    '<button class="grBtn" id="grTabSkills" style="padding:3px 10px;font-size:11px">skills</button> '+
    '<button class="grBtn" id="grTabUps" style="padding:3px 10px;font-size:11px">upgrades</button> '+
    '<button class="grBtn" id="grSkillClose" style="padding:3px 10px;font-size:11px">close</button></div>'+
    '<div id="grSkillBody" style="width:100%;max-width:640px"></div>';
    document.body.appendChild(ov);
    var cb=grEl('grSkillClose');
    if(cb)cb.onclick=function(){grSkillClose()};
    var ts=grEl('grTabSkills');
    if(ts)ts.onclick=function(){grTreeTab='skills';grSkillRender()};
    var tu=grEl('grTabUps');
    if(tu)tu.onclick=function(){grTreeTab='upgrades';grSkillRender()};
  }catch(e){}
  grSkillRender();
}
// grotto UPGRADE tree: cloned from the void upgrade columns (same classes,
// area cards, leveled nodes). deep points: whales pay 2/sale, hush pays 3.
var grUpAreas=[
 {id:'shallows',name:'area 1 — shallows',req:null,desc:'starter dredging',upgrades:['up_sieve','up_glowworm','up_longline']},
 {id:'twilight',name:'area 2 — twilight',req:'shallows',desc:'midwater — max the shallows',upgrades:['up_pressure','up_sonararr','up_chumworks']},
 {id:'trench',name:'area 3 — trench',req:'twilight',desc:'hadal — max twilight',upgrades:['up_leviathan','up_hushmoney','up_abyssal']}
];
var grUpDefs={
 up_sieve:{max:5,cost:2,name:'plort sieve',desc:'+1 plort/click per level'},
 up_glowworm:{max:3,cost:3,name:'glowworm',desc:'+1 glow per plort sold per level'},
 up_longline:{max:4,cost:2,name:'long line',desc:'fishing cooldown -5s per level'},
 up_pressure:{max:3,cost:4,name:'pressure',desc:'drips drop plorts, +2% chance per level'},
 up_sonararr:{max:3,cost:4,name:'sonar array',desc:'gold visits +20% more often per level'},
 up_chumworks:{max:2,cost:5,name:'chum works',desc:'whale chum +1 charge per level'},
 up_leviathan:{max:3,cost:6,name:'leviathan',desc:'whales stay +15s per level'},
 up_hushmoney:{max:3,cost:6,name:'hush money',desc:'the hush pays +25 glow per level'},
 up_abyssal:{max:5,cost:8,name:'abyssal',desc:'all sale income +5% per level'}
};
function grUpLv(key){try{var s=grSave();return (s.grUp&&s.grUp[key])||0}catch(e){return 0}}
function grAreaComplete(id){
  for(var i=0;i<grUpAreas.length;i++){
    if(grUpAreas[i].id!==id)continue;
    var a=grUpAreas[i];
    for(var j=0;j<a.upgrades.length;j++){
      var u=grUpDefs[a.upgrades[j]];
      if(grUpLv(a.upgrades[j])<(u?u.max:1))return false;
    }
    return true;
  }
  return false;
}
function grAreaUnlocked(a){if(!a)return false;if(!a.req)return true;return grAreaComplete(a.req)}
function grUpBuy(key){
  if(!grActive)return;
  var u=grUpDefs[key];if(!u)return;
  var s=grSave();s.grUp=s.grUp||{};s.deep=s.deep||0;
  var lv=s.grUp[key]||0;
  if(lv>=u.max){grSideSay('maxed. the trench applauds.');grSideHead();return}
  var area=null;
  for(var i=0;i<grUpAreas.length;i++)if(grUpAreas[i].upgrades.indexOf(key)!==-1)area=grUpAreas[i];
  if(area&&!grAreaUnlocked(area)){grSideSay('locked — max every upgrade in '+(area.req||'the previous area')+' first.');grSideHead();return}
  if(s.deep<u.cost){grSideSay('not enough deep. ('+u.cost+' needed. the trench does not do credit.)');grSideHead();return}
  s.deep-=u.cost;s.grUp[key]=lv+1;grStore(s);
  grSideSay('upgrade: '+u.name+' lv '+(lv+1)+'/'+u.max+'.');
  grSideHead();grSkillRender();
}
function grSkillClose(){
  grTreeUp=false;
  try{var ov=grEl('grSkillTree');if(ov)ov.remove()}catch(e){}
}
function grSideHead(){
  try{
    var s=grSave(),h=grEl('grSideHead');
    if(h)h.textContent='tooth · off-map · plorts '+(s.plorts||0)+' · glow '+(s.glow||0);
  }catch(e){}
}
function grSideSay(t){
  grTermHist.push(t);if(grTermHist.length>60)grTermHist.shift();
  try{
    var h=grEl('grTermHist');
    if(h){var d=document.createElement('div');d.textContent=t;h.appendChild(d);h.scrollTop=h.scrollHeight}
  }catch(e){}
}
// cloned from the real terminal (cube-engine.js): enter echoes, history on
// arrows, ctrl+l clears, click focuses. prompt is tooth>. only tooth commands.
var grToothHist=[],grToothIdx=-1;
function grToothEcho(v){
  try{
    var h=grEl('grTermHist');
    if(h){var d=document.createElement('div');d.style.color='rgba(255,255,255,0.4)';d.textContent='tooth>'+v;h.appendChild(d);h.scrollTop=h.scrollHeight}
  }catch(e){}
}
function grToothWire(){
  try{
    var st=grEl('grSideTerm'),si=grEl('grSideInput');
    if(st&&si)st.addEventListener('click',function(){try{si.focus()}catch(e){}});
    if(!si)return;
    si.onkeydown=function(e){
      try{
        if(e.key==='Enter'){
          var val=si.value.trim();
          if(val){grToothEcho(val);grToothHist.unshift(val);grToothIdx=-1;grTermRun(val)}
          si.value='';
          try{si.focus()}catch(err){}
        }else if(e.key==='ArrowUp'){
          e.preventDefault();
          if(grToothIdx<grToothHist.length-1){grToothIdx++;si.value=grToothHist[grToothIdx]}
        }else if(e.key==='ArrowDown'){
          e.preventDefault();
          if(grToothIdx>0){grToothIdx--;si.value=grToothHist[grToothIdx]}else{grToothIdx=-1;si.value=''}
        }else if(e.key==='l'&&e.ctrlKey){
          e.preventDefault();var h=grEl('grTermHist');if(h)h.innerHTML='';
        }
        e.stopPropagation();
      }catch(err){}
    };
  }catch(e){}
}
// HELP AS UI: the reference outgrew the tooth. fullscreen panel, sections,
// close button. like the achievementpane up top, but honest.
var GR_HELP_SECTIONS=[
 {t:'market',rows:[
  ['price','check the market'],
  ['sell [n|all|whale]','sell plorts for glow'],
  ['sell fruit [n|all]','sell picked fruit'],
  ['bake [n|all]','bake fruit into pies (3 fruit = 1 pie, pays 1.6x)'],
  ['fruits','count your pockets'],
  ['silo','peek in the hole'],
  ['store <what> [n|all]','store plorts, eggs, fruit (fruit cap 300)'],
  ['take <what> [n|all]','take it back out (pockets hold 60 fruit)'],
  ['shop','browse the counter (buy: hollow)']]},
 {t:'tree',rows:[
  ['phosphors','open the skill tree'],
  ['upgrade','open the upgrade tree'],
  ['deep','count your deep'],
  ['grow <id>','grow a skill (soil press roots fever bloom lantern rain longing heart tip corner song monopoly)']]},
 {t:'farm',rows:[
  ['grow <seed> [plot#]','plant (plortree glowbloom dripfruit whalekelp goldcap hushroot)'],
  ['water [n|all]','water the soil'],
  ['harvest [n|all]','harvest ripe gardens'],
  ['feed','feed the hungriest pen (fruit or egg)']]},
 {t:'secrets',rows:[
  ['fish','fish the void sea'],
  ['lock / unlock','bolt the screen still (autoclicker mode)'],
  ['murder [on|off]','brutally murder slimes. pet included. you monster.'],
  ['perf','toggle grotto perfmode (no jiggle, no popups)'],
  ['oath [tend|guard|remember]','swear Chism\u2019s oath (after his quests)'],
  ['pet','check on your pet slime (buy it first: hollow)'],
  ['club','read your regulars tab (Chism tracks everything)'],
  ['who','who are you (here)'],
  ['obj','do not.']]}
];
function grHelpOpen(){
  if(!grActive)return;
  try{
    var old=grEl('grHelpOv');if(old){old.remove();grSideSay('reference closed. it will be back. it always comes back.');grSideHead();return}
    var ov=document.createElement('div');ov.id='grHelpOv';
    ov.style.cssText='position:fixed;inset:0;z-index:2012;display:flex;flex-direction:column;align-items:center;background:rgba(2,8,10,0.94);font-family:Consolas,monospace;padding:26px;overflow-y:auto';
    var h='<div style="font-size:15px;letter-spacing:8px;color:#8df0c8">TOOTH COMMAND REFERENCE</div><div style="font-size:12px;color:#5f7d99;margin:6px 0 16px">too big for the tooth. so it lives here now.</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;max-width:760px;width:100%">';
    for(var si=0;si<GR_HELP_SECTIONS.length;si++){
      var sec=GR_HELP_SECTIONS[si];
      h+='<div style="background:rgba(4,12,18,.93);border:1px solid rgba(43,74,104,.6);border-radius:10px;padding:10px 12px;text-align:left"><div style="letter-spacing:4px;color:#5f7d99;font-size:11px;margin-bottom:6px">— '+sec.t+' —</div>';
      for(var ri=0;ri<sec.rows.length;ri++)h+='<div style="font-size:12px;margin:3px 0"><b style="color:#c8e0f0">'+sec.rows[ri][0]+'</b><br><span style="color:#7fa8c9">'+sec.rows[ri][1]+'</span></div>';
      h+='</div>';
    }
    ov.innerHTML=h+'</div><button class="grBtn" id="grHelpClose" style="margin-top:16px;padding:6px 18px">close</button>';
    document.body.appendChild(ov);
    var cb=grEl('grHelpClose');
    if(cb)cb.onclick=function(){try{var o2=grEl('grHelpOv');if(o2)o2.remove()}catch(e){}};
    ov.onclick=function(e){try{if(e.target===ov){ov.remove()}}catch(e){}};
    grSideSay('reference opened above. look up.');
  }catch(e){}
  grSideHead();
}
function grHelpClose(){try{var o=grEl('grHelpOv');if(o)o.remove()}catch(e){}}
function grTermRun(raw){
  var cmd=String(raw||'').trim().toLowerCase();
  if(!cmd)return
  var parts=cmd.split(/\s+/),c=parts[0],arg=parts.slice(1).join(' ');
  if(c==='help'||c==='?'){
    grHelpOpen();
  }else if(c==='grow'&&!arg){
    grSideSay('IDs: soil press roots fever bloom lantern rain longing heart tip corner song monopoly.');
  }else if(c==='price'){
    var s=grSave();grMarketEnsure();s=grSave();
    var trend='';
    if(s.gup&&s.gup.tip){
      var d=(s.price||5)-(s.lastPrice||5);
      trend=' trend: '+(d>0?'up':(d<0?'down':'flat'));
    }
    var whale='';
    if(s.whale&&s.whale.until>Date.now())whale=' WHALE ACTIVE: sell whale (up to 15 at '+(s.whale.mult||2)+'x, '+Math.ceil((s.whale.until-Date.now())/1000)+'s left).';
    var evt='';
    if(s.mktEvent&&(s.mktEventUntil||0)>Date.now())evt=' EVENT: '+s.mktEvent.toUpperCase()+' ('+Math.ceil((s.mktEventUntil-Date.now())/1000)+'s).';
    grSideSay('plorts are worth '+(s.price||5)+' glow each.'+trend+' the market moves every 20 seconds. it does not explain itself.'+whale+evt);
  }else if(c==='sell'){
    if(arg==='fruit'||arg.indexOf('fruit')===0){
      var rest=arg.replace(/^fruit\s*/,'').trim();
      var inv=(grSave().fruitInv||[]);
      if(!inv.length){grSideSay('pockets empty. pick something first.');grSideHead();return}
      var take=[];
      if(rest==='all'||!rest)take=inv.slice();
      else{
        var wn=parseInt(rest,10)||1;
        take=inv.slice(0,Math.max(1,wn));
      }
      var s4=grSave(),tot=0;
      for(var fi4=0;fi4<take.length;fi4++){
        var it=take[fi4];
        tot+=Math.round((GR_FRUIT_BASE[it.seed]||4)*it.w*(GR_FRUIT_MUT[it.mut]||1));
      }
      tot=grCutPay(tot,take.length===s4.fruitInv.length);
      s4.fruitInv=s4.fruitInv.slice(take.length);
      s4.glow=(s4.glow||0)+tot;grStore(s4);
      grSideSay('sold '+take.length+' fruit for '+tot+' glow.');
      grPop(50,45,'+'+tot+' glow','#ffd770');
      grSideHead();return;
    }
    if(arg==='whale'){
      var sw=grSave();
      if(!(sw.whale&&sw.whale.until>Date.now())){grSideSay('no whale. the water is flat. (they surface every few minutes.)')}
      else{
        var hn=sw.plorts||0;
        if(hn<=0){grSideSay('no plorts. the whale waits.')}
        else{
          var hk=Math.min(hn,15),hunit=grUnit(sw.price)*(sw.whale.mult||2);
          sw.plorts=hn-hk;var hpay=grCutPay(hk*hunit,false)+(((sw.tackleTier||0)>=3)?50:0);sw.glow=(sw.glow||0)+hpay;
          sw.whaleSales=(sw.whaleSales||0)+1;sw.deep=(sw.deep||0)+2;sw.lifePlorts=(sw.lifePlorts||0)+hk;grStore(sw);
          try{grClubCheck()}catch(e){}
          grSideSay('the whale takes '+hk+' plorts for '+hpay+' glow. it does not say thank you. it does not need to.');
          grPop(50,45,'+'+hpay+' glow','#ffd770');grPop(50,52,'+2 deep','#c9a8ff');grFlashDo('rgba(96,145,235,0.3)',300);
        }
      }
    }
    else if(arg==='all'||arg==='everything')grSell(true);
    else if(parseInt(arg,10)>0){var s2=grSave(),have=s2.plorts||0,want=parseInt(arg,10);if(want>have){grSideSay('you only have '+have+'. the tooth does not do credit.')}else{var kk=Math.min(want,have),uu=grUnit(s2.price);s2.plorts=have-kk;var pp=grCutPay(kk*uu,false);s2.glow=(s2.glow||0)+pp;s2.lifePlorts=(s2.lifePlorts||0)+kk;grStore(s2);try{grClubCheck()}catch(e){}grSideSay('sold '+kk+' for '+pp+' glow. glow: '+s2.glow+'.');grSideHead();return}}
    else grSell(false);
  }else if(c==='phosphors'||c==='tree'||c==='skills'){
    grSideSay('the tree unfolds above. look up.');
    grTreeTab='skills';
    grSkillOpen();
  }else if(c==='upgrade'||c==='upgrades'){
    grSideSay('deeper. look up.');
    grTreeTab='upgrades';
    grSkillOpen();
  }else if(c==='deep'){
    grSideSay('deep: '+(grSave().deep||0)+'. (whales pay 2. the hush pays 3.)');
  }else if(c==='fruits'){
    var inv2=grSave().fruitInv||[];
    if(!inv2.length){grSideSay('pockets empty. the plants are working on it.')}
    else{
      var counts={};
      for(var ci=0;ci<inv2.length;ci++){var k2=inv2[ci].seed+':'+inv2[ci].mut;counts[k2]=(counts[k2]||0)+1}
      var parts=[];
      for(var kk in counts)parts.push(counts[kk]+'x '+kk);
      grSideSay(inv2.length+' fruit: '+parts.join(' · '));
    }
  }else if(c==='silo'){
    grSiloSay();
  }else if(c==='store'||c==='take'){
    var sp=String(arg||'').split(/\s+/),what=(sp[0]||'').toLowerCase(),how=sp.slice(1).join(' ');
    grSiloMove(c==='store'?1:-1,what,how);
  }else if(c==='grow'){
    grGrowCmd(arg);
  }else if(c==='water'){
    if(arg==='all'||!arg)grWater('all');
    else grWater((parseInt(arg,10)||1)-1);
  }else if(c==='harvest'){
    if(arg==='all'||!arg)grHarvest('all');
    else grHarvest((parseInt(arg,10)||1)-1);
  }else if(c==='feed'){
    grFeedAuto();
  }else if(c==='roundup'){
    grRoundup();
  }else if(c==='fish'){
    grSeaFish();
  }else if(c==='shop'){
    grSideSay('— COUNTER GOODS (buy in person, at the hollow) —');
    for(var sh4=0;sh4<GR_SHOP.length;sh4++){
      var it4=GR_SHOP[sh4];
      grSideSay(it4.name+' — '+(it4.cur==='p'?it4.cost+'p':it4.cost+' glow'));
    }
  }else if(c==='who'){
    grSideSay('you are the intruder. this terminal is not on any map. obj cannot hear it.');
  }else if(c==='obj'){
    grSideSay('shh. he is looking for you right now. type quietly.');
    try{grFarSay()}catch(e){}
  }else if(c==='oath'){
    grOath(arg);
  }else if(c==='bake'){
    grBake(arg);
  }else if(c==='lock'||c==='unlock'){
    grLockSet(c==='lock');
  }else if(c==='murder'){
    grMurderSet(arg);
  }else if(c==='perf'){
    grPerfSet();
  }else if(c==='pet'){
    var ps=grSave();
    if(ps.petDead)grSideSay('you killed your pet slime. the spot behind you is empty. Chism has more. (of course he does.)');
    else if(ps.petslime)grSideSay('your slime wiggles. (it is behind you. it is always behind you.) pats given: '+(ps.petpats||0)+'.');
    else grSideSay('no pet. Chism sells one. (hollow. counter goods. 50 plorts. worth it.)');
  }else if(c==='club'){
    grClubSay();
  }else{
    grSideSay('unknown. the tooth only knows: help, price, sell, shop, silo, store, take, phosphors, upgrade, deep, grow, fish, feed, roundup, bake, oath, lock, unlock, murder, perf, pet, club, who, obj.');
  }
  grSideHead();
}
var GR_FREQS=[523.25,659.25,783.99];
function grSeq(){
  var s=grSave();
  if(!(s.seq instanceof Array)||s.seq.length!==5){
    s.seq=[];for(var i=0;i<5;i++)s.seq.push(Math.floor(Math.random()*3));
    s.knock=0;grStore(s);
  }
  return s.seq;
}
function grTone(f){
  try{
    var AC=window.AudioContext||window.webkitAudioContext;
    if(!AC)return;
    grAC=grAC||new AC();
    if(grAC.state==='suspended')grAC.resume();
    var o=grAC.createOscillator(),g=grAC.createGain();
    o.type='sine';o.frequency.value=f;
    g.gain.setValueAtTime(0.0001,grAC.currentTime);
    g.gain.exponentialRampToValueAtTime(0.25,grAC.currentTime+0.02);
    g.gain.exponentialRampToValueAtTime(0.0001,grAC.currentTime+0.5);
    o.connect(g);g.connect(grAC.destination);
    o.start();o.stop(grAC.currentTime+0.55);
  }catch(e){}
}
var grAC=null;
function grFlashSlime(i,delay){
  setTimeout(function(){
    try{
      var sl=document.querySelectorAll('#grOverlay .grSlime');
      if(sl[i]){sl[i].classList.add('lit');grTone(GR_FREQS[i%3])}
      setTimeout(function(){try{if(sl[i])sl[i].classList.remove('lit')}catch(e){}},380);
    }catch(e){}
  },delay||0);
}
function grListen(){
  if(grPlaying||!grActive)return;
  var seq=grSeq();
  grPlaying=true;
  grNote('hush. they are starting.');
  for(var k=0;k<seq.length;k++)grFlashSlime(seq[k],600+k*650);
  setTimeout(function(){grPlaying=false;grNote('your turn. the door is listening. (5 notes)')},600+seq.length*650);
}
function grKnock(i,el){
  if(grPlaying||!grActive)return;
  var seq=grSeq(),s=grSave(),prog=s.knock||0;
  try{if(el){el.classList.add('hit');setTimeout(function(){try{el.classList.remove('hit')}catch(e){}},300)}}catch(e){}
  grTone(GR_FREQS[i%3]);
  if(seq[prog]===i){
    prog++;
    if(prog>=seq.length){
      s.knock=0;s.vaultOpen=true;grStore(s);
      grNote('the door exhales. stone moves like it was never stone.');
      setTimeout(function(){grRender()},900);
      return;
    }
    s.knock=prog;grStore(s);
    grNote((prog)+' of 5. the door leans closer.');
  }else{
    s.knock=0;grStore(s);
    grNote('wrong note. the chimes go dull. from the top, then.');
  }
  setTimeout(function(){if(grRoom==='vault')grRender()},450);
}
// THE GAUNTLET: between vault-read and below. 3 gates, toll + memory each.
// gate 0: 15 plorts, 4 notes. gate 1: 80 glow, 5 notes. gate 2: 25p + 120 glow, 6 notes.
// reuses the vault chimes (GR_FREQS) on purpose: same voice, longer sentence.
var GR_GAUNT=[
  {plorts:15,glow:0,notes:4},
  {plorts:0,glow:80,notes:5},
  {plorts:25,glow:120,notes:6}
];
// replay tolls: half price, one extra note per gate. the stones are bored. they admit it.
var GR_GAUNT_REPLAY=[
  {plorts:8,glow:0,notes:5},
  {plorts:0,glow:40,notes:6},
  {plorts:13,glow:60,notes:7}
];
var grGauntPlaying=false;
function grGaunt(){
  var s=grSave(),dirty=false;
  if(!s.gaunt||typeof s.gaunt!=='object'){s.gaunt={gate:0,paid:false,seq:[],prog:0};dirty=true}
  if(typeof s.gaunt.gate!=='number'){s.gaunt.gate=0;dirty=true}
  if(typeof s.gaunt.paid!=='boolean'){s.gaunt.paid=false;dirty=true}
  if(typeof s.gaunt.prog!=='number'){s.gaunt.prog=0;dirty=true}
  if(dirty)grStore(s);
  return s.gaunt;
}
function grGauntClear(){try{return !!grSave().gauntClear}catch(e){return false}}
function grGauntReplayStart(){
  if(!grActive||grGauntPlaying)return;
  var s=grSave();
  if(!s.gauntClear||s.gauntReplay)return;
  s.gaunt={gate:0,paid:false,seq:[],prog:0};s.gauntReplay=true;grStore(s);
  grNote('remembrance run. same stones, longer songs, half toll. the stones are awake.');
  grRender();
}
function grGauntTollText(g){
  var parts=[];
  if(g.plorts>0)parts.push(g.plorts+' plorts');
  if(g.glow>0)parts.push(g.glow+' glow');
  return parts.join(' + ')||'free';
}
function grGauntToll(){
  if(!grActive||grGauntPlaying)return;
  if(!grLoreAllRead()){grNote('read first. the gauntlet wants you informed.');return}
  var s=grSave(),st=grGaunt();
  if(s.gauntClear&&!s.gauntReplay){grNote('already through. the stones remember you. (they are bored. replay below.)');return}
  var table=s.gauntReplay?GR_GAUNT_REPLAY:GR_GAUNT;
  var gate=Math.min(st.gate,2),g=table[gate];
  if(st.paid){grNote('paid. now listen, then sing it back.');return}
  if((s.plorts||0)<g.plorts){grNote('not enough plorts. ('+g.plorts+' needed. the first stone does not haggle.)');return}
  if((s.glow||0)<g.glow){grNote('not enough glow. ('+g.glow+' needed. the stone wants light.)');return}
  s=grSave();
  s.plorts=(s.plorts||0)-g.plorts;
  s.glow=(s.glow||0)-g.glow;
  s.gaunt=grGaunt();s.gaunt.paid=true;s.gaunt.seq=[];s.gaunt.prog=0;
  // roll a fresh seq for this gate
  var n=g.notes;
  s.gaunt.seq=[];for(var i=0;i<n;i++)s.gaunt.seq.push(Math.floor(Math.random()*3));
  grStore(s);
  grNote('the stone eats. ('+grGauntTollText(g)+' gone.) it hums '+n+' notes. listen.');
  grSideHead();
  grRender();
}
function grGauntListen(){
  if(!grActive||grGauntPlaying)return;
  var s=grSave(),st=grGaunt();
  if(!st.paid){grNote('pay the stone first. (toll before tune.)');return}
  if(!st.seq||!st.seq.length){grNote('nothing to hear yet.');return}
  grGauntPlaying=true;
  grNote('hush. the gate is humming.');
  for(var k=0;k<st.seq.length;k++){
    (function(idx,delay){
      setTimeout(function(){
        try{
          var sl=document.querySelectorAll('#grOverlay .grGChime');
          var el=sl[st.seq[idx]];
          if(el){el.classList.add('hit');grTone(GR_FREQS[st.seq[idx]%3]);setTimeout(function(){try{el.classList.remove('hit')}catch(e){}},380)}
          else grTone(GR_FREQS[st.seq[idx]%3]);
        }catch(e){}
      },delay);
    })(k,600+k*650);
  }
  setTimeout(function(){grGauntPlaying=false;grNote('your turn. sing it back. ('+st.seq.length+' notes)')},600+st.seq.length*650);
}
function grGauntKnock(i,el){
  if(!grActive||grGauntPlaying)return;
  var s=grSave(),st=grGaunt();
  if(!st.paid){grNote('the chimes are cold until the toll is paid.');return}
  try{if(el){el.classList.add('hit');setTimeout(function(){try{el.classList.remove('hit')}catch(e){}},300)}}catch(e){}
  grTone(GR_FREQS[i%3]);
  var seq=st.seq||[],prog=st.prog||0;
  if(seq[prog]===i){
    prog++;
    if(prog>=seq.length){
      // gate cleared
      var gate=Math.min(st.gate,2);
      s=grSave();s.gaunt=grGaunt();
      s.gaunt.gate=gate+1;s.gaunt.paid=false;s.gaunt.seq=[];s.gaunt.prog=0;
      if(s.gaunt.gate>=3){
        if(s.gauntReplay){
          s.gauntReplay=false;s.gauntRuns=(s.gauntRuns||0)+1;
          s.glow=(s.glow||0)+150;s.deep=(s.deep||0)+2;grStore(s);
          grAch('gr_gauntlet2');
          grFlashDo('rgba(230,240,255,0.6)',600);
          grPop(50,45,'+150 glow · +2 deep','#ffd770');
          grNote('remembrance run '+(s.gauntRuns)+' complete. the stones applaud with their mouths. (+150 glow, +2 deep. run it again anytime.)');
        }else{
          s.gauntClear=true;grStore(s);
          grAch('gr_gauntlet');
          grFlashDo('rgba(230,240,255,0.6)',600);
          grNote('three gates, three songs, three stones fed. the way down breathes easier. BELOW is open.');
        }
        setTimeout(function(){grRender()},900);
        return;
      }
      grStore(s);
      var table2=s.gauntReplay?GR_GAUNT_REPLAY:GR_GAUNT;
      var nx=table2[Math.min(s.gaunt.gate,2)];
      grNote('gate '+(gate+1)+' of 3 holds. next wants '+grGauntTollText(nx)+'.');
    }else{
      s=grSave();s.gaunt=grGaunt();s.gaunt.prog=prog;grStore(s);
      grNote(prog+' of '+seq.length+'. the gate leans closer.');
    }
  }else{
    s=grSave();s.gaunt=grGaunt();s.gaunt.prog=0;grStore(s);
    grNote('wrong note. the gate resets its hum. from the top of this gate.');
  }
  setTimeout(function(){if(grRoom==='gauntlet')grRender()},450);
}
function grGauntHtml(){
  if(!grLoreAllRead())return 'a hallway of three stones, each with a mouth. they are politely ignoring you.<br><br><span style="color:#5f7d99">read first. the gauntlet wants you informed. (finish the vault files.)</span>';
  var s=grSave(),st=grGaunt();
  if(s.gauntClear&&!s.gauntReplay)return 'three fed stones, three silent mouths. the hallway is done with you, fondly.<br><br><span style="color:#5f7d99">BELOW is breathing. go on. (the warden is still rude.)</span>'+(s.gauntRuns>0?'<br><span style="font-size:12px;color:#5f7d99">remembrance runs: <b>'+s.gauntRuns+'</b></span>':'')+'<br><br><button class="grBtn" id="grGauntReplay" style="padding:4px 10px;font-size:11px">run it again (remembrance: half toll, longer songs, +150 glow +2 deep)</button>';
  var rep=!!s.gauntReplay,table=rep?GR_GAUNT_REPLAY:GR_GAUNT;
  var gate=Math.min(st.gate,2),g=table[gate];
  var h='a hallway cut for something taller than you. three stones with mouths, one awake at a time.'+(rep?'<br><span style="color:#ffd770">REMEMBRANCE RUN — the stones are humoring you. longer songs, half toll.</span>':'')+'<br><br>';
  h+='<span style="color:#5f7d99">gate '+(gate+1)+' of 3 · toll: <b>'+grGauntTollText(g)+'</b> · song: '+g.notes+' notes</span><br><br>';
  if(!st.paid){
    h+='plorts: <b>'+(s.plorts||0)+'</b> · glow: <b>'+(s.glow||0)+'</b><br><br>';
    h+='<button class="grBtn" id="grGauntPay">pay the stone ('+grGauntTollText(g)+')</button>';
  }else{
    var prog=st.prog||0,dots='';
    for(var i=0;i<(st.seq||[]).length;i++)dots+='<span class="grDot'+(i<prog?' on':'')+'"></span>';
    h+='<div><span class="grGChime grChime" data-g="0">○</span><span class="grGChime grChime" data-g="1">○</span><span class="grGChime grChime" data-g="2">○</span></div>';
    h+='<div style="margin-top:8px">'+dots+'</div>';
    h+='<div style="margin-top:10px"><button class="grBtn" id="grGauntListen" style="padding:4px 10px;font-size:11px">listen</button> <span style="color:#5f7d99;font-size:12px">— then sing it back on the chimes.</span></div>';
  }
  return h;
}
// obj's far voice: he knows you went somewhere he cannot see.
// the grotto is locked to him. so he calls into it.
var grFarT=0;
var GR_FAR=[
 'intruder?',
 'i can\u2019t see you.',
 'that cave isn\u2019t on any map.',
 'come out.',
 'i can hear the drips. where are the drips.',
 'the file says you are nowhere. the file is wrong.',
 'is that phosphor. answer me.',
 'you finished everything. i counted. come back.',
 'the vault was supposed to stay shut.',
 'i can see the core. i can see the reactor. i cannot see you.',
 'are you below. don\u2019t go below.',
 'your achievements. i gave you those dots. i can take the dots away.',
 'the slimes are mine too. everything glows because i allow it.',
 '...you\u2019re reading, aren\u2019t you. don\u2019t believe the shelves.'
];
var GR_FAR_DELAY={mouth:[30000,50000],phosphor:[25000,40000],vault:[18000,30000],gauntlet:[18000,30000],below:[12000,20000],hollow:[25000,40000],farm:[30000,50000],lab:[30000,50000],dripworks:[30000,50000],sea:[20000,35000],meadow:[25000,40000],roost:[30000,50000],pens:[30000,50000]};
var GR_FAR_SOFT=[
 'hey. still here?',
 'the drips sound different when you are down there. better.',
 'thank you. (for the thing. you know the thing.)',
 'i counted your plorts. that is not surveillance. that is pride.',
 'come up when you want. the busywork misses you. i do not.',
 'the slimes asked about you. i told them you are busy being merciful.'
];
function grFarSay(){
  if(!grActive)return;
  try{
    var sv=grSave();
    if(sv.ending==='kill')return;
    var pool=(sv.ending==='spare')?GR_FAR_SOFT:GR_FAR;
  }catch(e){var pool=GR_FAR}
  try{
    var ov=grEl('grOverlay');if(!ov)return;
    var line=pool[Math.floor(Math.random()*pool.length)];
    var d=document.createElement('div');
    d.className='grFar';
    d.textContent='obj (far): '+line;
    d.style.left=(8+Math.random()*60)+'%';
    d.style.top=(12+Math.random()*55)+'%';
    d.style.fontSize=(12+Math.random()*5)+'px';
    ov.appendChild(d);
    setTimeout(function(){try{if(d.parentNode)d.parentNode.removeChild(d)}catch(e){}},6200);
  }catch(e){}
  grFarSchedule();
  if(grHas('longing')&&Math.random()<0.15){
    try{
      var gs=grSave();gs.plorts=(gs.plorts||0)+2;grStore(gs);
      grNote('something small and glowing drops from above. (+2 plorts. do not think about where from.)');
      var qg=grEl('grPlortN');if(qg&&grRoom==='phosphor')qg.textContent=gs.plorts;
    }catch(e){}
  }
}
function grFarSchedule(){
  try{if(grFarT)clearTimeout(grFarT)}catch(e){}
  if(!grActive)return;
  var r=GR_FAR_DELAY[grRoom]||GR_FAR_DELAY.mouth;
  var ms=(r[0]+Math.random()*(r[1]-r[0]))*(grHas('longing')?0.6:1);
  grFarT=setTimeout(grFarSay,ms);
}
// the warden: click-combat. 10 hits to kill, it hits back every 2.5s.
// plorts heal (3 plorts = 1 heart). losing spits you back to the mouth.
var grFight=false,grWHp=10,grPHp=5,grFightT=0,grChoice=false,grEnd=null,grLost=false;
function grAch(id){try{if(typeof ach==='function')ach(id)}catch(e){}}
function grFightEnd(){try{if(grFightT)clearInterval(grFightT)}catch(e){}grFightT=0;grFight=false}
function grHpBar(hp,max,ch){
  var h='';
  for(var i=0;i<max;i++)h+=i<hp?ch:'<span style="opacity:.2">'+ch+'</span>';
  return h;
}
function grFightHtml(){
  var s=grSave(),wmax=10;
  try{wmax=10+Math.min(5,s.rematches||0)}catch(e){}
  return '<span style="color:#5f7d99">the warden'+(wmax>10?' (+'+(wmax-10)+' rematch bulk)':'')+'</span><br>'+grHpBar(grWHp,wmax,'█')+
  '<br><br><div id="grWarden" style="font-size:64px;cursor:pointer;user-select:none;animation:grBob 2s ease-in-out infinite">◉</div>'+
  '<br><span style="color:#5f7d99">you</span><br>'+grHpBar(grPHp,5,'♥')+
  '<br><br><span style="font-size:12px;color:#5f7d99">click it to strike. plorts: '+(s.plorts||0)+'</span><br>'+
  '<button class="grBtn" id="grHeal" style="padding:4px 10px;font-size:11px">offer 3 plorts → +1 ♥</button>';
}
function grWardenStart(){
  var rm=0;try{rm=Math.min(5,grSave().rematches||0)}catch(e){}
  grFight=true;grWHp=10+rm;grPHp=5;grLost=false;
  grFightEnd();grFight=true;
  grFightT=setInterval(function(){
    if(!grActive||!grFight||grRoom!=='below'){grFightEnd();return}
    try{
      grPHp--;
      if(grPHp<=0){
        grFightEnd();grFight=false;grLost=true;
        grGo('mouth');
        grNote('the dark spits you out. (the warden keeps your rhythm. rude.)');
        return;
      }
      grNote('it hits back. ('+grPHp+' ♥ left.)');
      grFlashDo('rgba(255,60,60,0.45)',350);grShakeDo();
      if(grRoom==='below')grRender();
    }catch(e){}
  },2500);
  grRender();
}
function grWardenHit(){
  if(!grFight||!grActive)return;
  grWHp--;
  grShakeDo();
  if(grWHp<=0){
    grFightEnd();grFight=false;
    try{var s=grSave();if(s.warden)s.rematches=(s.rematches||0)+1;s.warden=true;grStore(s)}catch(e){}
    grAch('gr_warden');
    grChoice=true;
    grFlashDo('rgba(230,240,255,0.6)',600);
    try{if((grSave().rematches||0)>0)grNote('the warden folds. again. it is learning your rhythm. +1 max HP next time.');else grNote('the warden folds. it was only ever a door.')}catch(e){grNote('the warden folds. it was only ever a door.')}
    grRender();return;
  }
  grRender();
}
function grHeal(){
  if(!grFight||!grActive)return;
  var s=grSave();
  if(grPHp>=5){grNote('already whole.');return}
  if((s.plorts||0)<3){grNote('not enough plorts. (3 to heal. the warden accepts snacks.)');return}
  s.plorts-=3;grStore(s);
  grPHp++;
  grNote('offered. it eats. you feel better. ('+grPHp+' ♥)');
  var pn=grEl('grPlortN');if(pn)pn.textContent=s.plorts;
  grRender();
}
function grHeartHtml(){
  var both=false;
  try{var se=grSave();both=se.endings&&se.endings.indexOf('spare')!==-1&&se.endings.indexOf('kill')!==-1}catch(e){}
  return 'past the warden the cave narrows to a room with no shadows. the light from above lands in one circle.<br><br>a figure stands in it.<br><br>'+
  (both?'obj: "again. you keep coming back down here. the trigger remembers you too."<br>':'')+
  'obj: "so. you read the shelves."<br>'+
  'obj: "you finished my busywork. all of it. every dot. i counted."<br>'+
  'obj: "i am not a cube. you know that now. my presence is a cube and you are standing in the one place i cannot look."<br>'+
  'obj: "the trigger is real. i made it real. that was stupid of me. it is the only true thing i ever made."<br>'+
  'obj: "so. what am i?"<br><br>'+
  '<button class="grBtn" id="grSpare">SPARE</button> <button class="grBtn" id="grKill">KILL</button>';
}
function grEndHtml(which){
  var s=grSave();
  var body=which==='spare'?
   'you lower it.<br><br>obj: "oh."<br>obj: "nobody ever —. huh."<br><br>the cave exhales. somewhere above, a terminal flickers and goes quiet, politely.<br><br>he will remember this. he remembers everything. that is the problem with him.':
   'you pull the trigger.<br><br><br>the light from above does not change. the drips keep dripping. the cave did not agree to mourn.<br><br>somewhere above, every terminal goes quiet at once.<br><br>it is done. it cannot be undone. that is what triggers are for.';
  var tail=which==='spare'?'he is still here. that was the point.':'he is gone.';
  var ends=1;
  try{if(s.endings&&s.endings.indexOf('spare')!==-1&&s.endings.indexOf('kill')!==-1)ends=2}catch(e){}
  return '<b>'+(which==='spare'?'YOU SPARED HIM':'YOU PULLED IT')+'</b><br><br>'+body+'<br><br>'+
  '<span style="color:#5f7d99">C U B E — complete. plorts: '+(s.plorts||0)+' · glow: '+(s.glow||0)+' · endings found: '+ends+'/2. '+tail+'</span><br><br>'+
  grAgainHtml();
}
// KILL follow-through: synthesized gunshot, then hard cut to a 3-minute
// credits reel scored by IHateEmployment.webm (lux original, obviously).
// (it was a webm wearing an mp3 trenchcoat. renamed. the blob loader knew.)
var grCredAudio=null,grCredT=0;
function grGunshot(){
  try{
    var AC=window.AudioContext||window.webkitAudioContext;
    if(!AC)return;
    grAC=grAC||new AC();
    if(grAC.state==='suspended')grAC.resume();
    var dur=0.6,sr=grAC.sampleRate,buf=grAC.createBuffer(1,sr*dur,sr),d=buf.getChannelData(0);
    for(var i=0;i<d.length;i++){var t=i/d.length;d[i]=(Math.random()*2-1)*Math.pow(1-t,2.2)}
    var src=grAC.createBufferSource();src.buffer=buf;
    var f=grAC.createBiquadFilter();f.type='lowpass';f.frequency.setValueAtTime(3200,grAC.currentTime);f.frequency.exponentialRampToValueAtTime(220,grAC.currentTime+dur);
    var g=grAC.createGain();g.gain.setValueAtTime(0.9,grAC.currentTime);g.gain.exponentialRampToValueAtTime(0.001,grAC.currentTime+dur);
    src.connect(f);f.connect(g);g.connect(grAC.destination);src.start();
    // chest thump under the crack
    var o=grAC.createOscillator(),g2=grAC.createGain();
    o.type='sine';o.frequency.setValueAtTime(120,grAC.currentTime);o.frequency.exponentialRampToValueAtTime(38,grAC.currentTime+0.35);
    g2.gain.setValueAtTime(0.7,grAC.currentTime);g2.gain.exponentialRampToValueAtTime(0.001,grAC.currentTime+0.4);
    o.connect(g2);g2.connect(grAC.destination);o.start();o.stop(grAC.currentTime+0.45);
  }catch(e){}
}
var GR_KILL_CREDITS=[
  'YOU PULLED IT','',
  'he is gone.','the cave did not agree to mourn.','',
  '— C U B E · the grotto —','',
  'a game about busywork','that turned out to be about employment','',
  'starring','obj (deceased)','the warden (wardened)','Chism, first of his name','the phosphor slimes (unbothered)','the whale (surfacing)','',
  'and','the trigger','the only true thing he ever made','',
  'i hate employment','i hate employment','a job is for people','who are a big disappointment','',
  'no one clocked in','no one clocked out','the ranch bell rang itself','the slimes unionized','',
  'i would rather sit back and relax','where i can go to your mom and crack','',
  'my manager paged me at 3am','i fed his message to the warden','the warden ate it. the warden gets it.','',
  'overtime? over my dead body','it was over his. rip obj.','',
  'monday: frozen','tuesday: normal','wednesday: THE FURNACE','thursday: normal','friday: landscaping','saturday: the friendly faith plate','sunday: on little cat feet','',
  'the void parable was a warning','the grotto was the resignation letter','',
  'jbo screamed the dress code down','the reactor melted the timeclock','hr filed a complaint. hr is load-bearing.','',
  'Chism sold packets during the funeral','rancher\u2019s blessing. golden hat. no refunds.','',
  'the landlord raised the rent mid-credits','the core pretended the glass was frosted','nothingcore watched. it does that.','',
  'i hate employment','i hate employment','a job is for people','who are a big disappointment','',
  'no managers were harmed','one manager was harmed. you know the one.','',
  'deleted scenes:','obj takes a vacation day','the slimes file for benefits','the whale gets a parking spot','all cut. all better.','',
  'bloopers:','obj missed his cue (he is gone)','the gunshot was late','Chism laughed for 40 seconds straight','kept it in.','',
  'directed by no one','produced by drips','catering by Chism','',
  'in memory of obj','he counted everything','he remembers everything','that was the problem with him','',
  '...','...','he is still gone.','',
  'sit through it all. something unlocks.','',
  '— credits —','',
  'creator: lux','vibe coder: opencode','music: men and the void itself','',
  'starring: obj, the void, jbo, chism,','men, landlord, core, nothingcore','',
  'tester: men and the discord server','',
  'thank you for playing','goodbye','',
  'the cave inhales behind you.','',
  'p.s. the complete text of ulysses scrolled past while you blinked.','you missed it. it was beautiful.'
];
function grKillCredits(){
  if(!grActive)return;
  try{
    grAmbStop();
    try{if(grCredAudio){grCredAudio.pause();grCredAudio=null}}catch(e){}
    try{if(grCredT){clearTimeout(grCredT);grCredT=null}}catch(e){}
    var old=document.getElementById('grCredits');if(old)old.remove();
    var ov=document.createElement('div');ov.id='grCredits';
    var inner='';
    for(var i=0;i<GR_KILL_CREDITS.length;i++){
      var line=GR_KILL_CREDITS[i];
      if(line==='')inner+='<br>';
      else if(i===0)inner+='<div style="font-size:26px;letter-spacing:10px;color:#fff">'+line+'</div>';
      else inner+='<div>'+line+'</div>';
    }
    ov.innerHTML='<div class="grCredHead">C U B E - - - T H E H T M L G A M E O R S O M E T H I N G</div>'+
      '<div class="grCredSong">♪ IHateEmployment.webm — lux original · 3:42 ♪</div>'+
      '<div id="grCredScroll"><div id="grCredInner">'+inner+'</div></div>'+
      '<button class="grBtn" id="grCredSkip">skip ━━▶</button>';
    document.body.appendChild(ov);
    // pace the roll to the real content height: last line lands mid-screen
    // exactly as the 3:42 ends, on any viewport. (fixed -220% used to
    // strand the tail below the viewport on short screens.)
    try{
      var credScroll=ov.querySelector('#grCredScroll'),credInner=ov.querySelector('#grCredInner');
      if(credScroll&&credInner){
        credInner.style.animation='none';
        var cH=credScroll.clientHeight||window.innerHeight||800;
        var cC=credInner.offsetHeight||0;
        credInner.style.top=cH+'px';
        void credInner.offsetHeight;
        credInner.style.transition='top 222s linear';
        credInner.style.top=(-(cC-cH*0.6))+'px';
      }
    }catch(e){}
    try{
      grCredAudio=new Audio('IHateEmployment.webm');
      grCredAudio.volume=0.8;
      grCredAudio.play().catch(function(){});
    }catch(e){}
    var done=false;
    function close(watched){
      if(done)return;done=true;
      try{if(grCredAudio){grCredAudio.pause();grCredAudio=null}}catch(e){}
      try{if(grCredT)clearTimeout(grCredT)}catch(e){}grCredT=0;
      try{var o2=document.getElementById('grCredits');if(o2)o2.remove()}catch(e){}
      if(watched){
        try{localStorage.setItem('cube_employment_unlocked','1')}catch(e){}
        grAch('gr_noskip');
        try{if(typeof achScan==='function')achScan()}catch(e){}
        grNote('sat through all 3:42 without skipping. bgm employment unlocked.');
        try{grSideSay('bgm employment unlocked. type: bgm employment.')}catch(e){}
        try{if(typeof cubeOk==='function')cubeOk('bgm: employment unlocked — bgm employment')}catch(e){}
      }
      try{if(grRoom==='below')grRender()}catch(e){}
    }
    window._grCredClose=close;
    try{var sk=ov.querySelector('#grCredSkip');if(sk)sk.onclick=function(ev){try{if(ev)ev.stopPropagation()}catch(e){}close(false)}}catch(e){}
    grCredT=setTimeout(function(){close(true)},222000);
  }catch(e){}
}
function grKillCreditsClose(){try{if(typeof window._grCredClose==='function')window._grCredClose()}catch(e){}}
function grChoose(which){
  if(!grActive)return;
  var s=grSave();
  s.ending=which;s.endings=s.endings||[];
  if(s.endings.indexOf(which)===-1)s.endings.push(which);
  s.choiceAt=Date.now();grStore(s);
  grEnd=which;grChoice=false;
  grAch(which==='spare'?'gr_spare':'gr_kill');
  if(which==='spare'){grFlashDo('rgba(230,240,255,0.55)',700);grRender()}
  else{
    grGunshot();
    grAmbStop();
    grFlashDo('rgba(120,0,0,0.6)',900);grShakeDo();
    grRender();
    setTimeout(function(){try{grKillCredits()}catch(e){}},750);
  }
}
function grAgainHtml(){
  var s=grSave(),wait=24*3600*1000-(Date.now()-(s.choiceAt||0));
  if(wait>0){
    var h=Math.ceil(wait/3600000);
    return '<button class="grBtn" id="grAgain" disabled>face him again ('+h+'h)</button><br><span style="font-size:12px;color:#5f7d99">live with it for a day first. decisions this size need to sit.</span>';
  }
  return '<button class="grBtn" id="grAgain" style="padding:4px 10px;font-size:11px">face him again</button>';
}
// CHISM's hollow: vendor (10 goods), questline (4), companion barks.
var grChismView=null;
var GR_SHOP=[
 {id:'seed_plortree',cost:25,cur:'p',kind:'seed',seed:'plortree',name:'seed: plort tree',desc:'packet. plant in the farm.'},
 {id:'seed_glowbloom',cost:20,cur:'p',kind:'seed',seed:'glowbloom',name:'seed: glow bloom',desc:'packet. plant in the farm.'},
 {id:'seed_dripfruit',cost:30,cur:'p',kind:'seed',seed:'dripfruit',name:'seed: drip fruit',desc:'packet. plant in the farm.'},
 {id:'seed_whalekelp',cost:30,cur:'p',kind:'seed',seed:'whalekelp',name:'seed: whale kelp',desc:'packet. plant in the farm.'},
 {id:'seed_goldcap',cost:35,cur:'p',kind:'seed',seed:'goldcap',name:'seed: goldcap',desc:'packet. plant in the farm.'},
 {id:'seed_hushroot',cost:40,cur:'p',kind:'seed',seed:'hushroot',name:'seed: hushroot',desc:'packet. plant in the farm.'},
 {id:'feed',cost:15,cur:'p',name:'phosphor feed',desc:'+1 plort on your next 20 clicks'},
 {id:'hat',cost:30,cur:'p',name:'slime hat',desc:'hats. all slimes. no stats. essential.'},
 {id:'chum',cost:40,cur:'p',name:'whale chum',desc:'a whale surfaces within 60s'},
 {id:'lasso',cost:120,cur:'g',name:'golden lasso',desc:'gold slimes stay twice as long'},
 {id:'lamp',cost:150,cur:'g',name:'moth lamp',desc:'gold slimes visit 1.5x more'},
 {id:'bell',cost:180,cur:'g',name:'ranch bell',desc:'ring every slime to center (button in phosphor room)'},
 {id:'bucket',cost:200,cur:'g',name:'drip bucket',desc:'the net catches +1'},
 {id:'net2',cost:250,cur:'g',name:'second net',desc:'another +1 per tick. stacks.'},
 {id:'cut',cost:300,cur:'g',name:"chism's cut",desc:'+10% glow on every sale, forever'},
  {id:'strange',cost:500,cur:'g',name:'strange plort',desc:'he eats it in front of you. do it.'},
  {id:'bigfeed',cost:40,cur:'p',name:'big feed',desc:'+50 boosted clicks. the trough overflows.'},
  {id:'whalebell',cost:200,cur:'g',name:'whale bell',desc:'ring it. a whale surfaces within 60s. it has no choice.'},
  {id:'mystery',cost:50,cur:'p',name:'mystery packet',desc:'3 random seed packets. Chism packed them. do not ask.'},
  {id:'raffle',cost:100,cur:'g',name:'raffle ticket',desc:'100 glow a pop. prizes up to JACKPOT. Chism keeps some. (his cut.) void where prohibited, especially brazil. sorry brazil.'},
  {id:'petslime',cost:50,cur:'p',name:'pet slime',desc:'a slime that follows you. everywhere. even outside. especially outside.'},
  {id:'leash_mossback',cost:20,cur:'p',kind:'leash',leash:'mossback',name:'leash: mossback',desc:'ranch slime. eats anything. (pen it.)'},
  {id:'leash_murm',cost:30,cur:'p',kind:'leash',leash:'murm',name:'leash: murm',desc:'quiet slime. sometimes pays deep. (pen it.)'},
  {id:'leash_sizzle',cost:35,cur:'p',kind:'leash',leash:'sizzle',name:'leash: sizzle',desc:'hot slime. eggs only. (pen it.)'},
   {id:'leash_gild',cost:50,cur:'p',kind:'leash',leash:'gild',name:'leash: gild',desc:'picky slime. worth it. (pen it.)'},
   {id:'leash_brine',cost:40,cur:'p',kind:'leash',leash:'brine',name:'leash: brine',desc:'sea slime. eggs only. (pen it.)'},
   {id:'leash_tangle',cost:45,cur:'p',kind:'leash',leash:'tangle',name:'leash: tangle',desc:'thorny slime. braids plorts. (pen it.)'}
];
var GR_QUESTS=[
 {name:'stock up',desc:'bring Chism 20 plorts'},
 {name:'the gold one',desc:'click a gold slime'},
 {name:'the big buyer',desc:'complete one whale sale (sell whale)'},
 {name:'downstairs',desc:'read every truth file in the vault'}
];
function grChismQ(){try{var s=grSave();return (typeof s.chismQ==='number')?s.chismQ:0}catch(e){return 0}}
function grQuestProgress(q){
  var s=grSave();
  if(q===0)return Math.min(20,s.plorts||0)+'/20 plorts';
  if(q===1)return ((s.goldCaught||0)>=1)?'done':'catch one (clicked: '+(s.goldCaught||0)+')';
  if(q===2)return ((s.whaleSales||0)>=1)?'done':'sales: '+(s.whaleSales||0)+'/1';
  if(q===3)return grLore1Count()+'/3 files read';
  return '';
}
function grLore1Count(){try{var s=grSave(),n=0;for(var i=0;i<GR_LORE.length;i++)if((s.loreRead||[]).indexOf(GR_LORE[i].id)!==-1)n++;return n}catch(e){return 0}}
function grQuestReady(q){
  var s=grSave();
  if(q===0)return (s.plorts||0)>=20;
  if(q===1)return (s.goldCaught||0)>=1;
  if(q===2)return (s.whaleSales||0)>=1;
  if(q===3)return grLore1Count()>=3;
  return false;
}
function grQuestClaim(){
  if(!grActive)return;
  var q=grChismQ();
  if(q>3){grNote('questline done. he is still here. that is the reward, mostly. (the tooth knows: oath)');return}
  if(!grQuestReady(q)){grNote('not yet: '+GR_QUESTS[q].desc+'. ('+grQuestProgress(q)+')');return}
  var s=grSave();
  if(q===0)s.plorts-=20;
  s.chismQ=q+1;grStore(s);
  if(q+1>3){
    s=grSave();s.blessing=true;s.goldHat=true;grStore(s);
    grAch('gr_chismfriend');
    grNote('questline complete. rancher\u2019s blessing (+1 glow/unit), a GOLDEN hat, and his respect.');
  }else grNote('turned in: '+GR_QUESTS[q].name+'. next: '+GR_QUESTS[q+1].name+'. ('+GR_QUESTS[q+1].desc+')');
  grRender();
}
// THE REGULARS TAB: Chism tracks every plort you ever sold. rank up,
// he pays a kickback. he insists. (he also insists the tab is real.)
var GR_CLUB=[
 {at:0,name:'new face',pay:0},
 {at:100,name:'regular',pay:25},
 {at:500,name:'steady hand',pay:75},
 {at:1500,name:'big timer',pay:200},
 {at:5000,name:'whale friend',pay:600},
 {at:15000,name:'grotto royalty',pay:2000}
];
function grClubRank(){try{var s=grSave(),rank=0;for(var i=0;i<GR_CLUB.length;i++)if((s.lifePlorts||0)>=GR_CLUB[i].at)rank=i;return rank}catch(e){return 0}}
function grClubCheck(){
  try{
    var s=grSave(),rank=0;
    for(var i=0;i<GR_CLUB.length;i++)if((s.lifePlorts||0)>=GR_CLUB[i].at)rank=i;
    if(rank>(s.clubRank||0)){
      s.clubRank=rank;var pay=GR_CLUB[rank].pay;
      s.glow=(s.glow||0)+pay;grStore(s);
      grNote('regulars tab: '+GR_CLUB[rank].name+'. Chism slides '+pay+' glow across the counter. "loyalty."');
      grPop(50,45,'+'+pay+' glow','#ffd770');
    }
  }catch(e){}
}
function grClubSay(){
  var s=grSave(),rank=0;
  for(var i=0;i<GR_CLUB.length;i++)if((s.lifePlorts||0)>=GR_CLUB[i].at)rank=i;
  var next=rank+1<GR_CLUB.length?('next: '+GR_CLUB[rank+1].name+' at '+(GR_CLUB[rank+1].at-(s.lifePlorts||0))+' more.'):'maxed. Chism bows when you enter. (he has a bad back. it still counts.)';
  grSideSay('regulars tab: '+GR_CLUB[rank].name+'. lifetime sold: '+(s.lifePlorts||0)+'. '+next);
  grSideHead();
}
// SWAP MEET: Chism trades with ranchers you will never meet.
// 3 offers, 15 min each. better than market. he knows a guy. he is the guy.
var GR_EXCH=[
 {id:'bulk',want:{k:'plorts',n:25},give:{k:'glow',n:150},text:'25 plorts → 150 glow (bulk rate, no questions)'},
 {id:'breakfast',want:{k:'eggs',n:10},give:{k:'glow',n:50},give2:{k:'deep',n:1},text:'10 eggs → 50 glow + 1 deep (someone out there loves breakfast)'},
 {id:'basket',want:{k:'fruit',n:5},give:{k:'glow',n:60},text:'5 fruit (any) → 60 glow (a gift basket. keep the basket.)'},
 {id:'dive',want:{k:'glow',n:100},give:{k:'deep',n:3},text:'100 glow → 3 deep (pressure does things to money)'},
 {id:'restock',want:{k:'plorts',n:50},give:{k:'seed',n:1,seed:'goldcap'},text:'50 plorts → 1 goldcap packet (fell off a cart)'},
 {id:'chumdeal',want:{k:'eggs',n:15},give:{k:'chum',n:3},text:'15 eggs → 3 chum charges (the whales like omelets. allegedly.)'}
];
function grExchState(){
  var s=grSave(),dirty=false;
  if(!s.exch||typeof s.exch!=='object'||!(s.exch.offers instanceof Array)){s.exch={until:0,offers:[]};dirty=true}
  if(Date.now()>(s.exch.until||0)){
    var pool=GR_EXCH.slice(),offers=[];
    for(var i=0;i<3&&pool.length;i++){offers.push({id:pool.splice(Math.floor(Math.random()*pool.length),1)[0].id,done:false})}
    s.exch={until:Date.now()+15*60*1000,offers:offers};dirty=true;
  }
  if(dirty)grStore(s);
  return s.exch;
}
function grExchHave(w){
  var s=grSave();
  if(w.k==='plorts')return s.plorts||0;
  if(w.k==='glow')return s.glow||0;
  if(w.k==='eggs')return s.eggInv||0;
  if(w.k==='fruit')return (s.fruitInv||[]).length;
  return 0;
}
function grExchTake(id){
  if(!grActive)return;
  var s=grSave(),ex=grExchState(),off=null;
  for(var i=0;i<ex.offers.length;i++)if(ex.offers[i].id===id)off=ex.offers[i];
  if(!off||off.done)return;
  var def=null;
  for(var j=0;j<GR_EXCH.length;j++)if(GR_EXCH[j].id===id)def=GR_EXCH[j];
  if(!def)return;
  s=grSave();
  var have=grExchHave(def.want);
  if(have<def.want.n){grNote('short. ('+have+'/'+def.want.n+' '+def.want.k+'. the other rancher waits.)');return}
  if(def.want.k==='plorts')s.plorts-=def.want.n;
  else if(def.want.k==='glow')s.glow-=def.want.n;
  else if(def.want.k==='eggs')s.eggInv-=def.want.n;
  else if(def.want.k==='fruit'){s.fruitInv=s.fruitInv||[];s.fruitInv=s.fruitInv.slice(def.want.n)}
  function give(g){
    if(!g)return;
    if(g.k==='glow')s.glow=(s.glow||0)+g.n;
    else if(g.k==='deep')s.deep=(s.deep||0)+g.n;
    else if(g.k==='plorts')s.plorts=(s.plorts||0)+g.n;
    else if(g.k==='chum'){s.shop=s.shop||{};s.shop.chumN=(s.shop.chumN||0)+g.n}
    else if(g.k==='seed'){s.seeds=s.seeds||{};s.seeds[g.seed]=(s.seeds[g.seed]||0)+g.n}
  }
  give(def.give);give(def.give2);
  s.exch=grExchState();
  for(var k=0;k<s.exch.offers.length;k++)if(s.exch.offers[k].id===id)s.exch.offers[k].done=true;
  grStore(s);
  grNote('traded. ('+def.text.split('→')[0].trim()+' gone. the other rancher says thanks. probably.)');
  grSideHead();grRender();
}
function grExchHtml(){
  var ex=grExchState(),s=grSave(),left=Math.max(0,Math.ceil(((ex.until||0)-Date.now())/1000));
  var h='<div style="margin-top:10px;font-size:13px">swap meet. Chism knows a guy. (he is the guy.) new offers in '+Math.floor(left/60)+'m '+(left%60)+'s.</div><div style="margin-top:6px;max-height:260px;overflow-y:auto">';
  for(var i=0;i<ex.offers.length;i++){
    var def=null;
    for(var j=0;j<GR_EXCH.length;j++)if(GR_EXCH[j].id===ex.offers[i].id)def=GR_EXCH[j];
    if(!def)continue;
    var have=grExchHave(def.want);
    h+='<div style="margin:6px auto;max-width:440px;font-size:12px;background:rgba(4,12,18,.93);border:1px solid rgba(43,74,104,.6);border-radius:8px;padding:6px 8px">';
    if(ex.offers[i].done)h+='✓ <span style="color:#5f7d99">'+def.text+'</span>';
    else h+='<b>'+def.text+'</b> <span style="color:#5f7d99">(have '+have+'/'+def.want.n+')</span> <button class="grBtn" data-exch="'+def.id+'" style="padding:2px 8px;font-size:11px">trade</button>';
    h+='</div>';
  }
  if(grChismView==='exchange'){
    h+=grExchHtml();
  }
  return h;
}
// CHISM'S OATH, part 2: after the questline, one oath. forever. pick in the tooth.
var GR_OATHS={
 tend:{need:'own 3+ farm plots',fx:'crops grow 25% faster'},
 guard:{need:'defeat the warden',fx:'plorts sell +1 glow each'},
 remember:{need:'read all 6 vault files',fx:'gold slimes visit 2x as often'}
};
function grOath(arg){
  if(!grActive)return;
  var s=grSave();
  if(grChismQ()<=3){grSideSay('he is not ready. finish his quests first. (4 of them. he counts.)');grSideHead();return}
  if(s.oath){grSideSay('oath sworn: '+s.oath+'. one oath. forever. he holds you to it.');grSideHead();return}
  var o=String(arg||'').trim().toLowerCase();
  if(!GR_OATHS[o]){grSideSay('oaths: tend (own 3+ plots) · guard (warden down) · remember (6 files read). one oath. forever.');grSideHead();return}
  if(o==='tend'){
    var plots=grPlots(s),n=0;
    for(var i=0;i<plots.length;i++)if(plots[i].own)n++;
    if(n<3){grSideSay('tend needs 3+ plots. you own '+n+'. the soil is unimpressed.');grSideHead();return}
  }
  if(o==='guard'&&!s.warden){grSideSay('guard needs the warden down. it is still down there. rude, and alive.');grSideHead();return}
  if(o==='remember'&&!(grLore1Count()>=3&&grLore2AllRead())){grSideSay('remember needs all 6 vault files read. the shelves are waiting.');grSideHead();return}
  s.oath=o;grStore(s);
  grAch('gr_oath');
  grSideSay('you swear to '+o+'. Chism nods once, like a man who has heard oaths before and buried most of them. "mine too," he says. ('+GR_OATHS[o].fx+'.)');
  grFlashDo('rgba(255,215,112,0.35)',400);
  grSideHead();grRender();
}
// SCREEN LOCK: bolt the overlay in place for autoclickers. the cave holds still.
function grLockSet(on){
  if(!grActive)return;
  var s=grSave();s.locked=!!on;grStore(s);
  try{var b=grEl('grBody');if(b)b.style.cursor=on?'default':'grab'}catch(e){}
  grSideSay(on?'locked. the screen will not budge. click away, gooby.':'unlocked. the screen drifts again. try not to lose it.');
  grSideHead();
}
// FRUIT BAKING: 3 fruit in, 1 pie out. pies pay 1.6x raw. the oven is
// wherever you are standing. do not ask where the heat comes from.
function grBake(arg){
  if(!grActive)return;
  var s=grSave(),inv=s.fruitInv||[];
  if(inv.length<3){grSideSay('need 3 fruit for a pie. pockets hold '+inv.length+'. the oven is patient.');grSideHead();return}
  var batches=1;
  if(String(arg||'').trim().toLowerCase()==='all')batches=Math.floor(inv.length/3);
  else{var wn=parseInt(arg,10);if(wn>0)batches=Math.min(wn,Math.floor(inv.length/3))}
  if(batches<1){grSideSay('need 3 fruit for a pie. pockets hold '+inv.length+'.');grSideHead();return}
  var tot=0,used=0,names={};
  for(var b=0;b<batches;b++){
    var raw=0;
    for(var k=0;k<3;k++){
      var it=inv[used++];
      raw+=Math.round((GR_FRUIT_BASE[it.seed]||4)*it.w*(GR_FRUIT_MUT[it.mut]||1));
      names[it.seed]=(names[it.seed]||0)+1;
    }
    tot+=Math.round(raw*1.6);
  }
  tot=grCutPay(tot,false);
  s.fruitInv=inv.slice(used);
  s.glow=(s.glow||0)+tot;s.bakes=(s.bakes||0)+batches;grStore(s);
  var nl=[];for(var sk in names)nl.push(names[sk]+'x '+sk);
  grSideSay('baked '+batches+' pie'+(batches>1?'s':'')+' ('+nl.join(', ')+') for '+tot+' glow. the cave smells incredible. nobody admits it.');
  grPop(50,45,'+'+tot+' glow','#ffd770');
  if(s.bakes>=1)grAch('gr_baker');
  grSideHead();grRender();
}
function grBark(){
  if(!grActive)return;
  var s=grSave(),pool=[];
  if(s.ending==='spare')pool.push("you spared him. yeah. i'd've done the same. probably. don't quote me.");
  else if(s.ending==='kill')pool.push('you pulled it. ...the slimes still need feeding. that is all i am saying.');
  else pool.push("you haven't gone down yet. no rush. the dark's patient. i'm not, but the dark is.");
  if((s.plorts||0)>=50)pool.push("that's a LOT of plorts. ranch or bank? pick one.");
  if(s.whale&&s.whale.until>Date.now())pool.push("that's a big one out there. don't choke.");
  pool.push('phosphors glow because they are happy. that is ranch science.');
  pool.push('obj pays you for saying my name. I heard. i want a cut. (this is the cut. chism\u2019s cut. 300 glow.)');
  pool.push('the vault files? yeah i read them. i stock the shelves. somebody has to.');
  pool.push('feed them before they get ideas. you do not want slimes with ideas.');
  grNote('Chism: "'+pool[Math.floor(Math.random()*pool.length)]+'"');
}
function grChismName(){
  if(!grActive)return;
  var r=null;
  try{if(typeof chism100Redeem==='function')r=chism100Redeem()}catch(e){}
  if(r&&r.already)grNote('Chism: "yeah, already counted. spend it wisely. (buy the strange plort.)"');
  else grNote('Chism: "that is ME. that is MY name. obj pays you for saying my name?? jbo screamed it, did he not. i heard. ...thanks. (here. the code worked. spend it wisely.)"');
}
function grShopBuy(id){
  if(!grActive)return;
  var item=null;
  for(var i=0;i<GR_SHOP.length;i++)if(GR_SHOP[i].id===id)item=GR_SHOP[i];
  if(!item)return;
  var s=grSave();s.shop=s.shop||{};
  if(item.cur==='p'){
    if(item.kind==='seed'){
      if((s.plorts||0)<item.cost){grNote('not enough plorts. ('+item.cost+' needed.)');return}
      s.plorts-=item.cost;s.seeds=s.seeds||{};s.seeds[item.seed]=(s.seeds[item.seed]||0)+1;grStore(s);
      grNote('packeted: '+GR_SEEDS[item.seed].name+'. ('+(s.seeds[item.seed])+' held. plant it in the farm.)');
      grRender();return;
    }
    if(item.kind==='leash'){
      if((s.plorts||0)<item.cost){grNote('not enough plorts. ('+item.cost+' needed.)');return}
      s.plorts-=item.cost;s.leads=s.leads||{};s.leads[item.leash]=(s.leads[item.leash]||0)+1;grStore(s);
      grNote('leashed: one '+item.leash+'. ('+(s.leads[item.leash])+' held. pen it in the pens.)');
      grSideHead();grRender();return;
    }
    if(item.id==='feed'||item.id==='chum'||item.id==='strange'||item.id==='bigfeed'||item.id==='mystery'){
      if((s.plorts||0)<item.cost){grNote('not enough plorts. ('+item.cost+' needed.)');return}
      s.plorts-=item.cost;
      if(item.id==='feed'){s.feedN=(s.feedN||0)+20;grNote('bought feed. next 20 clicks hit harder.')}
      else if(item.id==='bigfeed'){s.feedN=(s.feedN||0)+50;grNote('bought big feed. the trough overflows. next 50 clicks hit harder.')}
      else if(item.id==='mystery'){var pool=Object.keys(GR_SEEDS),got3=[];for(var mi=0;mi<3;mi++){var mk=pool[Math.floor(Math.random()*pool.length)];s.seeds=s.seeds||{};s.seeds[mk]=(s.seeds[mk]||0)+1;got3.push(mk)}grNote('mystery packet: '+got3.join(', ')+'. Chism packed them. do not ask.')}
      else if(item.id==='chum'){var mx=((s.gadgets&&s.gadgets.mixer)?2:0);s.shop.chumN=(s.shop.chumN||0)+1+mx+grUpLv('up_chumworks');grNote('bought chum. the water will stir soon.'+(mx?' (mixer: +2 charges.)':''))}
      else{s.strangeN=(s.strangeN||0)+1;grNote('he eats it in front of you. "tastes like static." he wants another. (he will always want another.)')}
      grStore(s);grRender();return;
    }
    if(item.id==='petslime'){
      var wasDead=false;
      try{wasDead=!!(s.petslime&&s.petDead)}catch(e){}
      if(s.petslime&&!s.petDead){grNote('one is enough. it gets jealous.');return}
      if((s.plorts||0)<item.cost){grNote('not enough plorts. ('+item.cost+' needed.)');return}
      s.plorts-=item.cost;s.petslime=true;s.petDead=false;grStore(s);
      if(!wasDead)grAch('gr_petpal');
      try{grPetSync()}catch(e){}
      if(wasDead)grNote('Chism slides a new slime across the counter. "you killed it? it was annoying anyway, haha. heres another one."');
      else grNote('Chism hands you a slime. "take care of it. it follows now. everywhere." (check behind you.)');
      grRender();return;
    }
    if(s.shop[id])return;
    if((s.plorts||0)<item.cost){grNote('not enough plorts. ('+item.cost+' needed.)');return}
    s.plorts-=item.cost;
    if(item.id==='hat'){s.hats=true}else{s.shop[id]=true}
    grStore(s);
    if(item.id==='hat')grNote('bought hats. look at them. look how professional.');
    grRender();return;
  }
  if(s.shop[id])return;
  if(item.id==='whalebell'||item.id==='raffle'){
    if((s.glow||0)<item.cost){grNote(item.id==='raffle'?'tickets are 100 glow. the jar is glass. you can see the money. all of it is yours to lose.':('not enough glow. ('+item.cost+' needed.)'));return}
    s.glow-=item.cost;
    if(item.id==='whalebell'){
      s.whale={until:Date.now()+60000+15000*grUpLv('up_leviathan'),mult:(s.gup&&s.gup.monopoly)?3:2};
      grStore(s);
      grNote('rung the whale bell. something HUGE moves below. 60 seconds.');
      grShakeDo();grRender();return;
    }
    var roll=Math.random(),win='';
    if(roll<0.55){var c1=40+Math.floor(Math.random()*51);s.glow+=c1;win='consolation +'+c1+' glow. Chism keeps the rest. (his cut.)'}
    else if(roll<0.80){var c2=120+Math.floor(Math.random()*61);s.glow+=c2;win='WINNER. +'+c2+' glow. the jar rattles approvingly.'}
    else if(roll<0.90){var c3=2+Math.floor(Math.random()*3);s.deep=(s.deep||0)+c3;win='deep prize. +'+c3+' deep. the jar glows from below. do not ask.'}
    else if(roll<0.96){var pool=Object.keys(GR_SEEDS);s.seeds=s.seeds||{};for(var ri=0;ri<3;ri++){var mk=pool[Math.floor(Math.random()*pool.length)];s.seeds[mk]=(s.seeds[mk]||0)+1}win='seed shower. 3 packets. plant them. (Chism grew them. allegedly.)'}
    else if(roll<0.99){s.shop=s.shop||{};s.shop.chumN=(s.shop.chumN||0)+5;win='+5 chum charges. the whales sponsored this prize.'}
    else{s.glow+=1500;win='JACKPOT. +1500 glow. Chism faints. (he is fine. he does this.)';grFlashDo('rgba(255,215,112,0.5)',600)}
    s.raffles=(s.raffles||0)+1;grStore(s);
    grNote('raffle #'+s.raffles+'. '+win);
    grSideHead();grRender();return;
  }
  if((s.glow||0)<item.cost){grNote('not enough glow. ('+item.cost+' needed.)');return}
  s.glow-=item.cost;s.shop[id]=true;grStore(s);
  grNote('bought '+item.name+'. the hollow approves.');
  grRender();
}
function grChismHtml(){
  var s=grSave(),q=grChismQ();
  var h='a camp wedged in the rock: bedroll, lantern, fence posts with no fence. a man in a ranch coat, somehow. Chism. first of his name. friend of the hollow.<br><br>';
  h+='<button class="grBtn" id="grTalk" style="padding:4px 10px;font-size:11px">talk</button> ';
  h+='<button class="grBtn" id="grShopBtn" style="padding:4px 10px;font-size:11px">shop</button> ';
  h+='<button class="grBtn" id="grQuestBtn" style="padding:4px 10px;font-size:11px">quest'+(q>3?' ✓':'')+'</button> ';
  h+='<button class="grBtn" id="grExchBtn" style="padding:4px 10px;font-size:11px">exchange</button> ';
  if(grChismView==='shop'){
    h+='<div style="margin-top:10px;font-size:12px">plorts: <b>'+(s.plorts||0)+'</b> · glow: <b>'+(s.glow||0)+'</b></div><div style="margin-top:6px;max-height:260px;overflow-y:auto">';
    var lastKind='';
    for(var i=0;i<GR_SHOP.length;i++){
      var it=GR_SHOP[i],owned=(it.id==='hat')?!!s.hats:((it.id==='petslime')?(!!s.petslime&&!s.petDead):!!(s.shop&&s.shop[it.id]));
      var kind=it.kind||'goods';
      if(kind!==lastKind){lastKind=kind;h+='<div style="margin:8px 0 2px;font-size:11px;letter-spacing:2px;color:#5f7d99">'+(kind==='seed'?'— SEED PACKETS —':'— COUNTER GOODS —')+'</div>'}
      var consumable=(it.id==='feed'||it.id==='chum'||it.id==='strange'||it.id==='bigfeed'||it.id==='mystery'||it.id==='whalebell'||it.id==='raffle');
      var extra=it.id==='chum'&&s.shop?' (held: '+(s.shop.chumN||0)+')':(it.id==='feed'?' (fed: '+(s.feedN||0)+' clicks left)':(it.id==='strange'?' (eaten: '+(s.strangeN||0)+')':''));
      h+='<div style="margin:6px auto;max-width:440px;font-size:12px;background:rgba(4,12,18,.93);border:1px solid rgba(43,74,104,.6);border-radius:8px;padding:6px 8px">';
      if(owned&&!consumable)h+='✓ <b>'+it.name+'</b>';
      else h+='<b>'+it.name+'</b> — '+(it.cur==='p'?it.cost+'p':it.cost+' glow')+' <button class="grBtn" data-shopbuy="'+it.id+'" style="padding:2px 8px;font-size:11px">buy</button>';
      h+='<br><span style="color:#5f7d99">'+it.desc+extra+'</span></div>';
    }
    h+='</div>';
  }
  if(grChismView==='quest'){
    h+='<div style="margin-top:10px;font-size:13px">';
    if(q>3){
      h+='questline complete. rancher\u2019s blessing, golden hat, his respect. he is still here. that is the reward, mostly.';
      var so=grSave().oath;
      if(so)h+='<br><br><span style="color:#ffd770">oath sworn: <b>'+so+'</b>. he holds you to it. (he holds himself to it harder.)</span>';
      else h+='<br><br><span style="color:#5f7d99">he wants an oath now. pick one, in the tooth: <b>oath tend</b> (3+ plots: crops grow faster) · <b>oath guard</b> (warden down: plorts sell +1) · <b>oath remember</b> (6 files read: gold visits 2x). one oath. forever.</span>';
    }
    else{
      h+='<b>'+(q+1)+'/4 · '+GR_QUESTS[q].name+'</b> — '+GR_QUESTS[q].desc+'<br><span style="color:#5f7d99">'+grQuestProgress(q)+'</span><br>';
      h+='<button class="grBtn" id="grClaim" style="padding:4px 10px;font-size:11px;margin-top:6px">turn in</button>';
    }
    h+='</div>';
  }
  return h;
}
// SUBZONES: lab (fabricator + slime mixing), dripworks (valve), sea (fish).
var GR_GADGETS=[
 {id:'plunger',cost:300,cur:'g',name:'auto-plunger',desc:'clicks a random slime every 10s. union job.'},
 {id:'sonar',cost:200,cur:'g',name:'gold sonar',desc:'pings when a gold slime surfaces'},
 {id:'mixer',cost:150,cur:'g',name:'chum mixer',desc:'whale chum comes with 2 charges'},
 {id:'probe',cost:250,cur:'g',name:'soil probe',desc:'soil never drops below 20%. it watches.'},
 {id:'lamp',cost:350,cur:'g',name:'growth lamp',desc:'crops grow 50% faster. suspiciously sunny.'},
 {id:'drone',cost:400,cur:'g',name:'harvest drone',desc:'picks one ripe fruit every 30s. beeps.'},
 {id:'coil',cost:500,cur:'g',name:'mutation coil',desc:'better mutation luck on every fruit.'}
];
var GR_MIXES=[
 {id:'largo',costP:10,costG:50,name:'largo slime',desc:'10p + 50 glow. a big slime joins the pen (3/click).'},
 {id:'puddle',costP:20,costG:100,name:'phosphor puddle',desc:'20p + 100 glow. a puddle that sweats +1 plort/30s.'}
];
function grLabBuy(id){
  if(!grActive)return;
  var g=null;
  for(var i=0;i<GR_GADGETS.length;i++)if(GR_GADGETS[i].id===id)g=GR_GADGETS[i];
  if(!g)return;
  var s=grSave();s.gadgets=s.gadgets||{};
  if(s.gadgets[id])return;
  if((s.glow||0)<g.cost){grNote('not enough glow. ('+g.cost+' needed. the fabricator does not haggle.)');return}
  s.glow-=g.cost;s.gadgets[id]=true;grStore(s);
  grNote('fabricated: '+g.name+'. it smells like ozone and ranch.');
  grRender();
}
function grMix(id){
  if(!grActive)return;
  var m=null;
  for(var i=0;i<GR_MIXES.length;i++)if(GR_MIXES[i].id===id)m=GR_MIXES[i];
  if(!m)return;
  var s=grSave();s.mix=s.mix||{};
  if(s.mix[id])return;
  if((s.plorts||0)<m.costP||(s.glow||0)<m.costG){grNote('need '+m.costP+'p + '+m.costG+' glow. the vats accept exact change only.');return}
  s.plorts-=m.costP;s.glow-=m.costG;s.mix[id]=true;grStore(s);
  grNote('mixed: '+m.name+'. do not lick the vat.');
  grRender();
}
function grLabHtml(){
  var s=grSave();
  var h='a ranch lab stapled to a cave wall. a fabricator the size of a fridge. vats bubbling with intent.<br><br><span style="color:#5f7d99">FABRICATOR (glow: <b>'+(s.glow||0)+'</b>)</span><div style="margin-top:6px">';
  for(var i=0;i<GR_GADGETS.length;i++){
    var g=GR_GADGETS[i],own=s.gadgets&&s.gadgets[g.id];
    h+='<div style="margin:6px auto;max-width:440px;font-size:12px;background:rgba(4,12,18,.93);border:1px solid rgba(43,74,104,.6);border-radius:8px;padding:6px 8px">';
    h+=(own?'✓ <b>'+g.name+'</b>':'<b>'+g.name+'</b> — '+g.cost+' glow <button class="grBtn" data-labbuy="'+g.id+'" style="padding:2px 8px;font-size:11px">fabricate</button>');
    h+='<br><span style="color:#5f7d99">'+g.desc+'</span></div>';
  }
  h+='</div><br><span style="color:#5f7d99">SLIME VATS (plorts: <b>'+(s.plorts||0)+'</b>)</span><div style="margin-top:6px">';
  for(var k=0;k<GR_MIXES.length;k++){
    var mx=GR_MIXES[k],got=s.mix&&s.mix[mx.id];
    h+='<div style="margin:6px auto;max-width:440px;font-size:12px;background:rgba(4,12,18,.93);border:1px solid rgba(43,74,104,.6);border-radius:8px;padding:6px 8px">';
    h+=(got?'✓ <b>'+mx.name+'</b>':'<b>'+mx.name+'</b> — '+mx.costP+'p + '+mx.costG+' glow <button class="grBtn" data-mix="'+mx.id+'" style="padding:2px 8px;font-size:11px">mix</button>');
    h+='<br><span style="color:#5f7d99">'+mx.desc+'</span></div>';
  }
  h+='</div><br><span style="color:#5f7d99">EXTRACTORS (dig sites dug: pick one, it works while you aren\u2019t looking)</span><div style="margin-top:6px">'+grExtHtml()+'</div>';
  return h+'</div>';
}
// EXTRACTORS: SR1-canon drills/apiaries/pumps. fabricate in the lab, each takes
// one of 3 dig sites. one cycle = 90s for every tier (like home: tiers buy more
// cycles + richer yields, not speed). finished cycle = DANCE until harvested.
// demolish anytime, no refund. the void keeps tips.
var GR_EXT_TYPES={
  drill:{name:'drill',verb:'digging',icon:'▼'},
  apiary:{name:'apiary',verb:'buzzing',icon:'⬢'},
  pump:{name:'pump',verb:'pumping',icon:'◉'}
};
var GR_EXT_TIERS=[
  {name:'novice',cycles:1,mult:1},
  {name:'advanced',cycles:3,mult:1.5},
  {name:'master',cycles:6,mult:2},
  {name:'titan',cycles:12,mult:3}
];
var GR_EXT_TIME=90;
var GR_EXT_COST={drill:[[20,0],[40,60],[80,150],[150,300]],apiary:[[25,0],[45,60],[90,150],[170,300]],pump:[[20,20],[40,80],[80,180],[160,350]]};
function grExtSites(){var s=grSave(),dirty=false;if(!(s.ext instanceof Array)||s.ext.length!==3){s.ext=[null,null,null];dirty=true}if(dirty)grStore(s);return s.ext}
function grExtPacks(s){
  if(!s)s=grSave();
  if(!s.extpacks||typeof s.extpacks!=='object')s.extpacks={};
  return s.extpacks;
}
function grExtFab(type,tier){
  if(!grActive)return;
  if(!GR_EXT_TYPES[type]||!GR_EXT_TIERS[tier])return;
  var s=grSave();
  var c=GR_EXT_COST[type][tier];
  if((s.plorts||0)<c[0]||(s.glow||0)<c[1]){grNote('needs '+c[0]+'p + '+c[1]+' glow. the fabricator does not haggle.');return}
  s.plorts-=c[0];s.glow-=c[1];
  var packs=grExtPacks(s),key=type+tier;
  packs[key]=(packs[key]||0)+1;
  s.extFabbed=s.extFabbed||{};s.extFabbed[key]=true;
  if(tier===3)grAch('gr_titan');
  try{var fk=0;for(var fkk in s.extFabbed)fk++;if(fk>=12)grAch('gr_drillmaster')}catch(e){}
  grStore(s);
  grNote('packeted: '+GR_EXT_TIERS[tier].name+' '+type+'. (held: '+packs[key]+'. pick a dig site below.)');
  grRender();
}
function grExtDeploy(slot,type,tier){
  if(!grActive)return;
  if(!GR_EXT_TYPES[type]||!GR_EXT_TIERS[tier])return;
  var s=grSave();
  if(!(s.ext instanceof Array)||s.ext.length!==3)s.ext=[null,null,null];
  if(s.ext[slot]){grNote('site '+(slot+1)+' is taken. demolish it first.');return}
  var packs=grExtPacks(s),key=type+tier;
  if((packs[key]||0)<=0){grNote('no '+GR_EXT_TIERS[tier].name+' '+type+' packets. fabricate one first.');return}
  packs[key]--;
  s.ext[slot]={t:type,r:tier,left:GR_EXT_TIME,cycles:GR_EXT_TIERS[tier].cycles,ready:false};
  grStore(s);
  grNote('deployed '+GR_EXT_TIERS[tier].name+' '+type+' in site '+(slot+1)+'. it burrows. see you in '+GR_EXT_TIME+'s.');
  grRender();
}
function grExtDemo(slot){
  if(!grActive)return;
  var s=grSave();
  if(!(s.ext instanceof Array)||s.ext.length!==3)s.ext=[null,null,null];
  if(!s.ext[slot])return;
  s.ext[slot]=null;grStore(s);
  grNote('demolished site '+(slot+1)+'. no refund. the hole stays.');
  grRender();
}
function grExtYield(site){
  var mult=GR_EXT_TIERS[site.r].mult,tier=GR_EXT_TIERS[site.r].name+' '+site.t;
  var s=grSave(),got='';
  if(site.t==='drill'){var g=Math.round(30*mult);s.glow=(s.glow||0)+g;got='+'+g+' glow'}
  else if(site.t==='apiary'){var p=Math.round(12*mult);s.plorts=(s.plorts||0)+p;got='+'+p+' plorts'}
  else{var d=Math.round(3*mult);s.deep=(s.deep||0)+d;got='+'+d+' deep'}
  return {s:s,got:got,tier:tier};
}
function grExtHarvest(slot){
  if(!grActive)return;
  var s=grSave();
  if(!(s.ext instanceof Array)||s.ext.length!==3)s.ext=[null,null,null];
  var site=s.ext[slot];
  if(!site)return;
  if(!site.ready){grNote('still '+GR_EXT_TYPES[site.t].verb+'. ('+site.left+'s left. patience is a crop too.)');return}
  var r=grExtYield(site);
  s=r.s;site.cycles--;
  if(site.cycles<=0){if(!s.despawnYet){s.despawnYet=true;grAch('gr_despawn')}s.ext[slot]=null;grStore(s);grNote('harvested '+r.got+' ('+r.tier+'). final cycle — it despawns. (it waved. with the drill bit.)')}
  else{s.ext[slot]={t:site.t,r:site.r,left:GR_EXT_TIME,cycles:site.cycles,ready:false};grStore(s);grNote('harvested '+r.got+' ('+r.tier+'). back down it goes. '+site.cycles+' cycles left.')}
  grPop(50,42,r.got,'#ffd770');
  grSideHead();grRender();
}
function grExtTick(){
  if(!grActive)return;
  var s=grSave();
  if(!(s.ext instanceof Array)||s.ext.length!==3)s.ext=[null,null,null];
  var sites=s.ext,dirty=false;
  for(var i=0;i<3;i++){
    var site=sites[i];
    if(!site||site.ready)continue;
    site.left--;
    if(site.left<=0){
      site.ready=true;dirty=true;
      if(!s.dancedYet){s.dancedYet=true;grAch('gr_firstdance')}
      grNote('the '+GR_EXT_TIERS[site.r].name+' '+site.t+' pops up and DANCES. (site '+(i+1)+'. harvest it.)');
      grPop(50,40,'DANCE','#ffd770');
      try{grFlashDo('rgba(255,210,120,0.3)',300)}catch(e){}
    }else dirty=true;
  }
  if(dirty)grStore(s);
}
function grExtHtml(){
  var s=grSave(),sites=grExtSites(),h='';
  var order=['drill','apiary','pump'];
  for(var k=0;k<order.length;k++){
    var t=order[k],td=GR_EXT_TYPES[t];
    h+='<div style="margin:6px auto;max-width:440px;font-size:12px;background:rgba(4,12,18,.93);border:1px solid rgba(43,74,104,.6);border-radius:8px;padding:6px 8px">';
    h+='<b>'+t+'</b> <span style="color:#5f7d99">'+td.icon+' digs '+(t==='drill'?'glow':(t==='apiary'?'plorts':'deep'))+'</span>';
    for(var r=0;r<GR_EXT_TIERS.length;r++){
      var c=GR_EXT_COST[t][r],held=(s.extpacks&&s.extpacks[t+r])||0;
      h+='<div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin:3px 0;max-width:100%;overflow:hidden"><span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+GR_EXT_TIERS[r].name+' · '+c[0]+'p + '+c[1]+'g'+(held?' · held ×'+held:'')+'</span><button class="grBtn" data-extfab="'+t+':'+r+'" style="padding:2px 8px;font-size:11px;flex-shrink:0">pack</button></div>';
    }
    var cyc=[];for(var cy=0;cy<GR_EXT_TIERS.length;cy++)cyc.push(GR_EXT_TIERS[cy].cycles);
    h+='<br><span style="color:#5f7d99">'+cyc.join('/')+' cycles · 90s each · richer per tier</span></div>';
  }
  h+='<div style="margin-top:6px;font-size:12px;color:#5f7d99">— DIG SITES —</div>';
  for(var i=0;i<3;i++){
    var site=sites[i];
    h+='<div style="margin:6px auto;max-width:440px;font-size:12px;background:rgba(4,12,18,.93);border:1px solid rgba(43,74,104,.6);border-radius:8px;padding:6px 8px">';
    if(!site){
      h+='<b>site '+(i+1)+'</b> <span style="color:#5f7d99">empty dirt. potential dirt.</span><br>';
      var anyPk=false;
      for(var pk=0;pk<order.length;pk++){for(var pr=0;pr<GR_EXT_TIERS.length;pr++){
        var pkc=(s.extpacks&&s.extpacks[order[pk]+pr])||0;
        if(pkc>0){anyPk=true;h+='<button class="grBtn" data-extdep="'+i+':'+order[pk]+':'+pr+'" style="padding:2px 6px;font-size:11px;margin:2px">deploy '+GR_EXT_TIERS[pr].name+' '+order[pk]+' ×'+pkc+'</button>'}
      }}
      if(!anyPk)h+='<span style="color:#5f7d99">no packets. fabricate above.</span>';
    }
    else{
      var nm=GR_EXT_TIERS[site.r].name+' '+site.t;
      if(site.ready)h+='<b>site '+(i+1)+'</b> <span class="grDance" style="display:inline-block">'+GR_EXT_TYPES[site.t].icon+'</span> <b>'+nm+'</b> <span style="color:#ffd770">DANCING — harvest!</span><br><button class="grBtn" data-extharv="'+i+'" style="padding:2px 8px;font-size:11px">harvest</button> ';
      else h+='<b>site '+(i+1)+'</b> '+GR_EXT_TYPES[site.t].icon+' <b>'+nm+'</b> <span style="color:#5f7d99">'+GR_EXT_TYPES[site.t].verb+' · '+site.left+'s · '+site.cycles+' cycles left</span>';
      h+=' <button class="grBtn" data-extdemo="'+i+'" style="padding:2px 8px;font-size:11px">demolish</button>';
    }
    h+='</div>';
  }
  return h;
}
// travel map: one button instead of eight. popover grid, same gates.
var grMapUp=false;
// GaG fruits: cash gardens grow up to 5 pickable fruits (weight + mutation).
// click them on the canvas. tool seeds keep whole-harvest.
var GR_FRUIT_BASE={plortree:4,glowbloom:12,dripfruit:6,whalekelp:6,goldcap:10,hushroot:15};
var GR_FRUIT_MUT={none:1,damp:2,ripe:3,glowing:5,voidtouched:20};
var GR_FRUIT_COL={none:null,damp:'127,184,255',ripe:'255,176,96',glowing:'234,255,240',voidtouched:'201,168,255'};
// one fruit shape per plant. no more clones.
function grFruitDraw(x,fx,fy,r,fcol,seed){
  try{
  var glowA=0.35;
  if(seed==='plortree'){
    x.fillStyle='rgba('+fcol+','+glowA+')';
    x.beginPath();x.arc(fx,fy,r*2.2,0,6.283);x.fill();
    x.fillStyle='rgba('+fcol+',0.95)';
    x.beginPath();x.arc(fx,fy,r,0,6.283);x.fill();
    x.fillStyle='rgba(255,255,255,0.85)';
    x.fillRect(fx-0.75,fy-r-3,1.5,6);
    x.fillRect(fx-3,fy-r,6,1.5);
  }else if(seed==='glowbloom'){
    x.fillStyle='rgba('+fcol+','+glowA+')';
    x.beginPath();x.arc(fx,fy,r*2.2,0,6.283);x.fill();
    x.fillStyle='rgba('+fcol+',0.95)';
    for(var i=0;i<5;i++){
      var a=i/5*6.283-1.5708;
      x.beginPath();x.ellipse(fx+Math.cos(a)*r*0.9,fy+Math.sin(a)*r*0.9,r*0.55,r*0.3,a,0,6.283);x.fill();
    }
    x.fillStyle='rgba(255,255,255,0.95)';
    x.beginPath();x.arc(fx,fy,r*0.4,0,6.283);x.fill();
  }else if(seed==='dripfruit'){
    x.fillStyle='rgba('+fcol+','+glowA+')';
    x.beginPath();x.arc(fx,fy,r*2.2,0,6.283);x.fill();
    x.fillStyle='rgba('+fcol+',0.95)';
    x.beginPath();x.arc(fx,fy+r*0.2,r*0.85,0,6.283);x.fill();
    x.beginPath();
    x.moveTo(fx-r*0.6,fy-r*0.1);x.lineTo(fx,fy-r*1.5);x.lineTo(fx+r*0.6,fy-r*0.1);
    x.closePath();x.fill();
    x.fillStyle='rgba(255,255,255,0.8)';
    x.beginPath();x.arc(fx-r*0.25,fy,r*0.2,0,6.283);x.fill();
  }else if(seed==='whalekelp'){
    x.fillStyle='rgba('+fcol+','+glowA+')';
    x.beginPath();x.ellipse(fx,fy,r*1.4,r*2.6,0.3,0,6.283);x.fill();
    x.fillStyle='rgba('+fcol+',0.95)';
    x.beginPath();x.ellipse(fx,fy,r*0.7,r*1.6,0.3,0,6.283);x.fill();
    x.strokeStyle='rgba('+fcol+',0.9)';x.lineWidth=1.5;
    x.beginPath();x.moveTo(fx,fy-r*1.6);x.lineTo(fx+r*0.3,fy+r*1.6);x.stroke();
  }else if(seed==='goldcap'){
    x.fillStyle='rgba('+fcol+','+glowA+')';
    x.beginPath();x.arc(fx,fy,r*2.2,0,6.283);x.fill();
    x.fillStyle='rgb(232,220,190)';
    x.fillRect(fx-r*0.3,fy-r*0.2,r*0.6,r*1.4);
    x.fillStyle='rgba('+fcol+',0.95)';
    x.beginPath();x.ellipse(fx,fy-r*0.5,r*1.1,r*0.6,0,3.1416,0);x.fill();
    x.fillStyle='rgba(255,246,220,0.95)';
    x.beginPath();x.arc(fx-r*0.4,fy-r*0.7,r*0.18,0,6.283);x.fill();
    x.beginPath();x.arc(fx+r*0.35,fy-r*0.55,r*0.15,0,6.283);x.fill();
  }else if(seed==='hushroot'){
    x.fillStyle='rgba('+fcol+','+glowA+')';
    x.beginPath();x.arc(fx,fy,r*2.4,0,6.283);x.fill();
    x.fillStyle='rgba(20,12,30,0.98)';
    x.beginPath();x.arc(fx,fy,r,0,6.283);x.fill();
    x.strokeStyle='rgba('+fcol+',0.9)';x.lineWidth=1.5;
    x.beginPath();x.arc(fx,fy,r,0,6.283);x.stroke();
    x.fillStyle='rgba('+fcol+',0.95)';
    x.beginPath();x.arc(fx,fy-r*0.1,r*0.3,0,6.283);x.fill();
  }else{
    x.fillStyle='rgba('+fcol+','+glowA+')';
    x.beginPath();x.arc(fx,fy,r*2.2,0,6.283);x.fill();
    x.fillStyle='rgba('+fcol+',0.95)';
    x.beginPath();x.arc(fx,fy,r,0,6.283);x.fill();
  }
  }catch(e){}
}
function grRollMut(){
  var r=Math.random(),sea=false,coil=false;
  try{sea=(grSave().valve||'slimes')==='sea'}catch(e){}
  try{coil=!!(grSave().gadgets&&grSave().gadgets.coil)}catch(e){}
  if(coil){
    if(r<0.45)return 'none';if(r<0.68)return 'damp';if(r<0.84)return 'ripe';if(r<0.96)return 'glowing';return 'voidtouched';
  }
  if(sea){if(r<0.4)return 'none';if(r<0.75)return 'damp';if(r<0.88)return 'ripe';if(r<0.97)return 'glowing';return 'voidtouched'}
  if(r<0.6)return 'none';if(r<0.8)return 'damp';if(r<0.92)return 'ripe';if(r<0.98)return 'glowing';return 'voidtouched';
}
function grFruitPos(pi,fi,W,H,seed,gs){
  var pmx=W*(0.14+pi*0.144),base=grBoardY(H)-36.8+10;
  var rsc=0.8*(seed==='plortree'?3:2.1);
  gs=(gs===undefined?1:gs);
  if(seed==='plortree'){
    var cy=base-(58*gs+10)*rsc;
    return {x:pmx+(((fi*47+pi*13)%60)-30)*rsc,y:cy+(((fi*31)%30)-15)*rsc};
  }
  if(seed==='glowbloom'){
    var by=base+(-70*gs-8)*rsc;
    var ba=(fi/5)*6.283+pi;
    return {x:pmx+Math.cos(ba)*(14*gs+4)*rsc,y:by+Math.sin(ba)*(14*gs+4)*rsc};
  }
  if(seed==='dripfruit'){
    var v=fi%3,vx=(v-1)*22;
    return {x:pmx+(vx+((fi*13)%11)-5)*rsc,y:base+(-34*gs-4-(v%2)*8-6)*rsc};
  }
  if(seed==='whalekelp'){
    var k2=fi%5,kx=-30+k2*15;
    var t=0;try{t=grT}catch(e){}
    var sw2=Math.sin(t*1.5+k2)*8*gs;
    return {x:pmx+(kx-sw2)*rsc,y:base+(-72*gs-6-4)*rsc};
  }
  if(seed==='goldcap'){
    return {x:pmx+(((fi*37+pi*17)%56)-28)*rsc,y:base+(-38*gs-6)*rsc};
  }
  if(seed==='hushroot'){
    var ra=(fi/5)*6.283+pi;
    return {x:pmx+Math.cos(ra)*14*rsc,y:base+(-9+Math.sin(ra)*6)*rsc};
  }
  return {x:pmx+(((fi*53+pi*29)%90)-45)*rsc,y:base-(46+((fi*37)%38))*rsc};
}
function grPickFruit(pi,fi){
  if(!grActive)return false;
  var s=grSave(),plots=grPlots(s);
  var p=plots[pi];
  if(!p||!p.own||!p.seed||!p.fruits||!p.fruits[fi])return false;
  s.fruitInv=s.fruitInv||[];
  if(s.fruitInv.length>=60){grNote('pockets full (60). sell fruit first.');return false}
  var f=p.fruits.splice(fi,1)[0];
  s.fruitInv.push({seed:p.seed,w:f.w,mut:f.mut});
  grStore(s);
  var mult=GR_FRUIT_MUT[f.mut]||1;
  grPop(50,42,'+1 '+(GR_SEEDS[p.seed]?GR_SEEDS[p.seed].name:'fruit')+' ('+f.w.toFixed(1)+'kg'+(f.mut!=='none'?' '+f.mut:'')+')',f.mut==='none'?'#9fd4ff':'#ffd770');
  grRender();
  return true;
}
function grCropDraw(g,pmx,pmy,rsc,gs,col,seed){
  try{
  var x=g;
  function dot(dx,dy,r,a){x.fillStyle='rgba('+col+','+a.toFixed(3)+')';x.beginPath();x.arc(pmx+dx*rsc,pmy+dy*rsc,r*rsc,0,6.283);x.fill()}
  function stem(x0,y0,x1,y1,w,a){x.strokeStyle='rgba('+col+','+a.toFixed(3)+')';x.lineWidth=w*rsc;x.beginPath();x.moveTo(pmx+x0*rsc,pmy+y0*rsc);x.lineTo(pmx+x1*rsc,pmy+y1*rsc);x.stroke()}
  if(seed==='plortree'){
    // tree: trunk, canopy, hanging plort fruits
    x.strokeStyle='rgb(96,70,44)';x.lineWidth=7*rsc;
    x.beginPath();x.moveTo(pmx,pmy-4*rsc);x.lineTo(pmx,pmy-(52*gs+8)*rsc);x.stroke();
    x.strokeStyle='rgb(120,90,58)';x.lineWidth=4*rsc;
    x.beginPath();x.moveTo(pmx,pmy-(30*gs+6)*rsc);x.lineTo(pmx-20*rsc,pmy-(44*gs+6)*rsc);x.stroke();
    x.beginPath();x.moveTo(pmx,pmy-(34*gs+6)*rsc);x.lineTo(pmx+20*rsc,pmy-(46*gs+6)*rsc);x.stroke();
    var cy=pmy-(58*gs+10)*rsc;
    dot(0,-58*gs-10,22*gs+6,0.92);dot(-18,-52*gs-10,14*gs+4,0.92);dot(18,-52*gs-10,14*gs+4,0.92);
    dot(0,-58*gs-10,26*gs+8,0.18);dot(-18,-52*gs-10,18*gs+6,0.15);dot(18,-52*gs-10,18*gs+6,0.15);
    dot(-10,-64*gs-12,3.5,0.95);dot(12,-58*gs-12,3.5,0.95);dot(0,-48*gs-12,3,0.9);dot(-20,-56*gs-12,2.5,0.85);dot(20,-62*gs-12,2.5,0.85);
    dot(-10,-64*gs-12,7,0.18);dot(12,-58*gs-12,7,0.18);
  }else if(seed==='glowbloom'){
    // flower: tall stem, layered petal bloom, hot core
    stem(0,-4,0,-70*gs-6,3,1);
    stem(0,-30*gs-4,-14,-44*gs-4,2,1);stem(0,-36*gs-4,14,-50*gs-4,2,1);
    var by=-70*gs-8;
    dot(0,by,16*gs+5,0.22);dot(0,by,11*gs+3.5,1);dot(0,by,6*gs+2,1);
    for(var pt=0;pt<6;pt++){var pa=pt/6*6.283+pt;dot(Math.cos(pa)*(10*gs+3),by+Math.sin(pa)*(10*gs+3),2.5,1)}
    dot(0,by,2.5,1);
  }else if(seed==='dripfruit'){
    // vine: drooping stalks, teardrop fruits
    for(var v=0;v<3;v++){
      var vx=(v-1)*22;
      stem(vx*0.4,-4,vx,-34*gs-4-(v%2)*8,2.5,1);
      stem(vx,-34*gs-4-(v%2)*8,vx+6,-20*gs-4,1.5,1);
      var fy=-34*gs-4-(v%2)*8;
      dot(vx,fy,4*gs+1.5,1);
      x.fillStyle='rgba('+col+',1)';
      x.beginPath();
      x.moveTo(pmx+(vx-3)*rsc,pmy+(fy-2)*rsc);x.lineTo(pmx+vx*rsc,pmy+(fy-9)*rsc);x.lineTo(pmx+(vx+3)*rsc,pmy+(fy-2)*rsc);
      x.closePath();x.fill();
    }
  }else if(seed==='whalekelp'){
    // kelp: tall wavy blades
    for(var k2=0;k2<5;k2++){
      var kx=-30+k2*15,sw=Math.sin(grT*1.5+k2)*8*gs;
      x.strokeStyle='rgba('+col+',1)';x.lineWidth=(3.5-k2%2)*rsc;
      x.beginPath();x.moveTo(pmx+kx*rsc,pmy-4*rsc);
      x.quadraticCurveTo(pmx+(kx+sw)*rsc,pmy-(40*gs)*rsc,pmx+(kx-sw)*rsc,pmy-(72*gs+6)*rsc);
      x.stroke();
      dot((kx-sw),-(72*gs+6),3,1);
    }
  }else if(seed==='goldcap'){
    // mushroom: fat stem, broad cap, gold spots
    x.fillStyle='rgb(232,220,190)';
    x.fillRect(pmx-7*rsc,pmy-(34*gs+4)*rsc,14*rsc,(34*gs+4)*rsc);
    x.fillStyle='rgba('+col+',1)';
    x.beginPath();x.ellipse(pmx,pmy-(34*gs+4)*rsc,26*gs+8,(12*gs+5)*rsc,0,3.1416,0);x.fill();
    x.fillStyle='rgb(255,246,220)';
    x.beginPath();x.ellipse(pmx-8*rsc,pmy-(38*gs+4)*rsc,4,2.5,0,0,6.283);x.fill();
    x.beginPath();x.ellipse(pmx+9*rsc,pmy-(36*gs+4)*rsc,3,2,0,0,6.283);x.fill();
    x.beginPath();x.ellipse(pmx+2*rsc,pmy-(42*gs+4)*rsc,2.5,1.8,0,0,6.283);x.fill();
    dot(0,-(34*gs+4)-14*gs-4,10*gs+3,0.15);
  }else if(seed==='hushroot'){
    // root mass: low tangled tendrils, watching dots
    for(var r2=0;r2<6;r2++){
      var ra=r2/6*6.283;
      stem(Math.cos(ra)*4,-4,Math.cos(ra)*(20+6*Math.sin(grT+r2))*gs,-4-Math.abs(Math.sin(ra))*(14*gs+4),2,1);
    }
    var blink=(Math.sin(grT*0.7)>-0.2)?0.9:0.1;
    dot(-8,-10,2.5,blink);dot(8,-12,2.5,blink);dot(0,-7,2,blink*0.7);
    dot(0,-9,12*gs+4,0.14);
  }else{
    for(var sp2=0;sp2<7;sp2++){
      var sx2=pmx+(-54+sp2*18)*rsc,sy2=pmy-6*rsc;
      var sh2=54*gs*rsc;
      x.strokeStyle='rgba('+col+',1)';x.lineWidth=3*rsc;
      x.beginPath();x.moveTo(sx2,sy2);x.lineTo(sx2,sy2-sh2);x.stroke();
      x.fillStyle='rgba('+col+','+(0.55+0.40*gs).toFixed(3)+')';
      x.beginPath();x.arc(sx2,sy2-sh2,(3.5+8*gs)*rsc,0,6.283);x.fill();
    }
  }
  }catch(e){}
}
var grMapUp=false;
var GR_MAP=[
 ['mouth','← mouth'],['phosphor','phosphor light'],['meadow','the meadow'],['hollow','the hollow'],
  ['lab','the lab'],['farm','the farm'],['dripworks','dripworks'],['sea','void sea'],['roost','the roost'],['pens','the pens'],
  ['vault','the vault'],['gauntlet','the gauntlet'],['below','below']
];
function grMapToggle(){
  if(!grActive)return;
  grMapUp=!grMapUp;
  grMapDraw();
}
function grMapDraw(){
  try{
    var m=grEl('grMap');if(!m)return;
    if(!grMapUp){m.style.display='none';return}
    m.style.display='grid';
    var s=grSave(),h='';
    for(var i=0;i<GR_MAP.length;i++){
      var id=GR_MAP[i][0],label=GR_MAP[i][1];
      if(id===grRoom)continue;
      var dis=false,tag='';
      if(id==='sea'&&!s.vaultOpen){dis=true;tag=' (sealed)'}
      if(id==='gauntlet'&&!grLoreAllRead()){dis=true;tag=' (read first)'}
      if(id==='gauntlet'&&!dis)tag=s.gauntClear?' (open)':' (3 gates)';
      if(id==='below'&&!grLoreAllRead()){dis=true;tag=' (breathe later)'}
      else if(id==='below'&&!grGauntClear()){dis=true;tag=' (gauntlet first)'}
      if(id==='vault')tag=s.vaultOpen?' (open)':' (sealed)';
      if(id==='below'&&!dis)tag=' (breathing)';
      h+='<button class="grBtn" data-mgo="'+id+'"'+(dis?' disabled':'')+' style="padding:8px 10px;font-size:12px">'+label+tag+'</button>';
    }
    m.innerHTML=h;
    var btns=m.querySelectorAll('[data-mgo]');
    for(var k=0;k<btns.length;k++)(function(btn){
      btn.onclick=function(){
        var g=btn.getAttribute('data-mgo');
        if(g==='gauntlet'&&!grLoreAllRead()){grNote('read first. the gauntlet wants you informed.');return}
        if(g==='below'&&!grLoreAllRead()){grNote('read first. the dark wants you informed.');return}
        if(g==='below'&&!grGauntClear()){grNote('the gauntlet holds the way down. (3 gates. toll + tune.)');return}
        if(g==='sea'){try{if(!grSave().vaultOpen){grNote('sealed. the vault opens the way down. (finish the door song first.)');return}}catch(e){}}
        grMapUp=false;
        grTravelTo(g);
      };
    })(btns[k]);
  }catch(e){}
}
// room travel: fade through black, swap mid-dark, fade back.
var grTraveling=false;
function grTravelTo(room){
  if(!grActive||grTraveling||room===grRoom)return;
  grTraveling=true;
  try{
    var ov=grEl('grOverlay');
    var f=document.createElement('div');f.id='grFade';
    f.style.cssText='position:fixed;inset:0;background:#000;opacity:0;transition:opacity .18s ease;z-index:2006;pointer-events:none';
    if(ov)ov.appendChild(f);else document.body.appendChild(f);
    requestAnimationFrame(function(){try{f.style.opacity='1'}catch(e){}});
    setTimeout(function(){
      try{grGo(room)}catch(e){}
      setTimeout(function(){
        try{f.style.opacity='0'}catch(e){}
        setTimeout(function(){try{if(f.parentNode)f.parentNode.removeChild(f)}catch(e){}grTraveling=false},220);
      },120);
    },200);
  }catch(e){grTraveling=false;try{grGo(room)}catch(err){}}
}
// PENS + FEEDING: corrals house ranch slimes (our own designs, not the
// wild phosphors). they get hungry. feed them fruit or eggs. favorites
// pay double. starving pens lose slimes out the sides. walls prevent that.
var GR_SLIMES={
 mossback:{name:'mossback',col:'#8df0a8',diet:'fruit',fav:'glowbloom',rate:75,cap:6,cost:20,desc:'eats anything. judges nothing. (mostly.) composts seeds.'},
 sizzle:{name:'sizzle',col:'#ffb14f',diet:'eggs',fav:'eggs',rate:45,cap:4,cost:35,desc:'runs hot. eats eggs. sweats chum.'},
 murm:{name:'murm',col:'#c9a8ff',diet:'fruit',fav:'hushroot',rate:60,cap:5,cost:30,desc:'quiet. pays in plorts. sometimes in secrets. (15% +1 deep)'},
  gild:{name:'gild',col:'#ffd770',diet:'fruit',fav:'dripfruit',rate:90,cap:4,cost:50,desc:'picky. worth it. (usually.) sweats glow.'},
  brine:{name:'brine',col:'#5fd4c8',diet:'eggs',fav:'whalekelp',rate:65,cap:5,cost:40,desc:'tastes like the sea. sweats brine. too wet to climb. (escapes slower, composts kelp.)'},
  tangle:{name:'tangle',col:'#e86a7a',diet:'fruit',fav:'goldcap',rate:55,cap:5,cost:45,desc:'thorny. braids spare plorts into every third payout.'}
};
var GR_CORRAL_PRICES=[200,500,1200,2500];
var GR_WALL_COST=200;
function grCorrals(s){
  var own=false;
  if(!s){s=grSave();own=true}
  if(!(s.corrals instanceof Array)||s.corrals.length!==4){
    s.corrals=[];
    for(var i=0;i<4;i++)s.corrals.push({own:false,type:null,n:0,hunger:0,prog:0,pend:0,walls:false,boost:false});
    if(own)grStore(s);
  }
  return s.corrals;
}
function grLeads(){try{return grSave().leads||{}}catch(e){return{}}}
// PHOSPHOR FARM: 6 plots (rising prices), cash + tool seeds, thirsty soil,
// per-plot machinery. plant ONE seed per plot: it gardens (multiplies).
var GR_SEEDS={
 plortree:{name:'plort tree',kind:'cash',cost:25,desc:'harvest: 12 plorts +0.1 deep'},
 glowbloom:{name:'glow bloom',kind:'cash',cost:20,desc:'harvest: 40 glow'},
 dripfruit:{name:'drip fruit',kind:'cash',cost:30,desc:'harvest: 6p + 15 glow'},
 whalekelp:{name:'whale kelp',kind:'tool',cost:30,desc:'harvest: +2 chum charges'},
 goldcap:{name:'goldcap',kind:'tool',cost:35,desc:'harvest: gold visits 2x for 5 min'},
 hushroot:{name:'hushroot',kind:'tool',cost:40,desc:'harvest: next hush pays double'}
};
var GR_PLOT_PRICES=[150,300,600,1200,2400,4800];
var GR_MACH_PRICES=[0,200,400];
function grPlots(s){
  var own=false;
  if(!s){s=grSave();own=true}
  if(!(s.plots instanceof Array)||s.plots.length!==6){
    s.plots=[];
    for(var i=0;i<6;i++)s.plots.push({own:i===0,growth:0,moist:50,seed:null,mach:0});
    if(own)grStore(s);
  }
  return s.plots;
}
function grFarmTick(){
  var s=grSave(),plots=grPlots(s),changed=false;
  var valveFarm=false;
  try{valveFarm=(s.valve||'slimes')==='farm'}catch(e){}
  for(var i=0;i<plots.length;i++){
    var p=plots[i];
    if(!p.own||!p.seed)continue;
    var moistFloor=(s.gadgets&&s.gadgets.probe)?20:0;
    p.moist=Math.max(moistFloor,Math.min(100,(p.moist||0)-0.5+(p.mach>=1?1.5:0)+(valveFarm?2:0)));
    if(p.moist>0&&p.growth<100){
      p.growth=Math.min(100,p.growth+0.55*(p.mach>=2?2:1)*((s.gadgets&&s.gadgets.lamp)?1.5:1)*((s.oath==='tend')?1.25:1));
      changed=true;
    }
    var sd=GR_SEEDS[p.seed];
    if(sd&&p.growth>=100&&p.moist>0){
      p.fruits=p.fruits||[];
      p.fruitT=(p.fruitT||0)-1;
      if(p.fruitT<=0){
        p.fruitT=25;
        if(p.fruits.length<5){
          p.fruits.push({w:Math.round((0.5+Math.random()*2.5)*10)/10,mut:grRollMut()});
          changed=true;
        }
      }
      changed=true;
    }
    if(p.moist!==undefined)changed=true;
  }
  if(changed)grStore(s);
  if(grRoom!=='farm')return;
  try{
    for(var k=0;k<plots.length;k++){
      var g2=document.getElementById('grPlotG'+k),m2=document.getElementById('grPlotM'+k);
      if(g2)g2.style.width=Math.min(100,plots[k].growth)+'%';
      if(m2)m2.style.width=Math.min(100,plots[k].moist)+'%';
    }
  }catch(e){}
}
function grPlotBuy(i){
  if(!grActive)return;
  if(!grPlotOk(i)){grNote('plots run 1-6.');return}
  var s=grSave(),plots=grPlots(s);
  if(plots[i].own)return;
  if((s.glow||0)<GR_PLOT_PRICES[i]){grNote('plot '+(i+1)+' costs '+GR_PLOT_PRICES[i]+' glow. the soil does not haggle.');return}
  s.glow-=GR_PLOT_PRICES[i];plots[i].own=true;plots[i].growth=0;plots[i].moist=50;grStore(s);
  grNote('bought plot '+(i+1)+'. it smells like potential.');
  grRender();
}
function grPlant(i,seed){
  if(!grActive)return;
  if(!GR_SEEDS[seed])return;
  if(!grPlotOk(i)){grNote('plots run 1-6.');return}
  var s=grSave(),plots=grPlots(s);
  if(!plots[i].own||plots[i].seed){grNote(plots[i].seed?('plot '+(i+1)+' is already planted. (dig it up to replant.)'):('plot '+(i+1)+' is not yours. (buy it first.)'));return}
  s.seeds=s.seeds||{};
  if((s.seeds[seed]||0)<=0){grNote('no '+seed+' packets. Chism sells them.');return}
  s.seeds[seed]--;plots[i].seed=seed;plots[i].growth=0;plots[i].moist=50;grStore(s);
  grNote('planted '+GR_SEEDS[seed].name+' in plot '+(i+1)+'. water it.');
  grRender();
}
function grPlotOk(i){return typeof i==='number'&&isFinite(i)&&i>=0&&i<6}
function grWater(i){
  if(!grActive)return;
  if(i!=='all'&&!grPlotOk(i)){grNote('plots run 1-6. the soil does not have that plot.');return}
  var s=grSave(),plots=grPlots(s),n=0;
  function w(k){if(plots[k].own&&plots[k].seed){plots[k].moist=Math.min(100,(plots[k].moist||0)+30);n++}}
  if(i==='all'){for(var k=0;k<6;k++)w(k)}else w(i);
  grStore(s);
  if(n)grNote('watered. ('+n+' plot'+(n>1?'s':'')+')');
  grRender();
}
function grHarvestOne(s,plots,i,silent){
  var p=plots[i];
  if(!p.own||!p.seed)return null;
  var sd=GR_SEEDS[p.seed];
  if(sd&&sd.kind==='cash'){
    p.fruits=p.fruits||[];
    if(!p.fruits.length)return null;
    s.fruitInv=s.fruitInv||[];
    var n=0,deepFruit=false;
    while(p.fruits.length&&s.fruitInv.length<60){var f=p.fruits.shift();if(p.seed==='plortree')deepFruit=true;s.fruitInv.push({seed:p.seed,w:f.w,mut:f.mut});n++}
    if(!n)return null;
    if(deepFruit)s.deep=Math.round(((s.deep||0)+0.1)*10)/10;
    return n+' fruit'+(n>1?'s':'')+' picked'+(deepFruit?' (+0.1 deep)':'');
  }
  if(p.growth<100)return null;
  var got='';
  if(p.seed==='plortree'){s.plorts=(s.plorts||0)+12;s.deep=Math.round(((s.deep||0)+0.1)*10)/10;got='+12 plorts +0.1 deep'}
  else if(p.seed==='glowbloom'){s.glow=(s.glow||0)+40;got='+40 glow'}
  else if(p.seed==='dripfruit'){s.plorts=(s.plorts||0)+6;s.glow=(s.glow||0)+15;got='+6p +15 glow'}
  else if(p.seed==='whalekelp'){s.shop=s.shop||{};s.shop.chumN=(s.shop.chumN||0)+2;s.kelpFed=(s.kelpFed||0)+1;got='+2 chum (the whales noticed: '+(s.kelpFed)+' fed)'}
  else if(p.seed==='goldcap'){s.goldUntil=Date.now()+5*60*1000;got='gold 2x for 5 min'}
  else if(p.seed==='hushroot'){s.hushDouble=true;got='next hush pays double'}
  p.growth=0;p.moist=50;
  return got;
}
function grHarvest(i){
  if(!grActive)return;
  if(i!=='all'&&!grPlotOk(i)){grNote('plots run 1-6. nothing to pick there.');return}
  var s=grSave(),plots=grPlots(s),outs=[];
  if(i==='all'){for(var k=0;k<6;k++){var g=grHarvestOne(s,plots,k);if(g)outs.push('plot '+(k+1)+': '+g)}}
  else{var g2=grHarvestOne(s,plots,i);if(g2)outs.push(g2)}
  if(!outs.length){grNote('nothing ripe. patience is a crop too.');return}
  grStore(s);
  grNote('harvested: '+outs.join(' · '));
  grPop(50,42,'HARVEST','#ffd770');
  grSideHead();grRender();
}
function grMach(i){
  if(!grActive)return;
  if(!grPlotOk(i)){grNote('plots run 1-6.');return}
  var s=grSave(),plots=grPlots(s),p=plots[i];
  if(!p.own||p.mach>=2)return;
  var cost=GR_MACH_PRICES[p.mach+1];
  if((s.glow||0)<cost){grNote('machinery costs '+cost+' glow.');return}
  s.glow-=cost;p.mach++;grStore(s);
  grNote('plot '+(i+1)+' machinery lv '+p.mach+'. '+(p.mach===1?'sprinkler online.':'double growth. the soil hums.'));
  grRender();
}
function grDig(i){
  if(!grActive)return;
  if(!grPlotOk(i)){grNote('plots run 1-6.');return}
  var s=grSave(),plots=grPlots(s),p=plots[i];
  if(!p.own){grNote('plot '+(i+1)+' is not yours. (buy it first.)');return}
  if(!p.seed){grNote('plot '+(i+1)+' is already dirt. aggressively dirt.');grRender();return}
  var sd=GR_SEEDS[p.seed];
  var lost=(p.fruits&&p.fruits.length)?(' '+p.fruits.length+' unpicked fruit rotted in the dirt.'):'';
  s.seeds=s.seeds||{};s.seeds[p.seed]=(s.seeds[p.seed]||0)+1;
  p.seed=null;p.growth=0;p.moist=50;p.fruits=[];
  grStore(s);
  grNote('dug up plot '+(i+1)+'. got the '+((sd&&sd.name)||'seed')+' packet back.'+lost+' fresh dirt, fresh choices.');
  grRender();
}
function grGo(room){
  grRoom=room;
  grLoreView=null;grChismView=null;grMapUp=false;
  if(room!=='below')grFightEnd();
  grTint=(room==='phosphor')?1:0;
  try{
    var s=grSave();s.seen=s.seen||[];if(s.seen.indexOf(room)===-1){s.seen.push(room);grStore(s)}
  }catch(e){}
  grRender();
}
function grUnit(price){var s=grSave();return (price||5)+((s.gup&&s.gup.press)?1:0)+((s.blessing)?1:0)+((s.oath==='guard')?1:0)+grUpLv('up_glowworm')}
function grCutPay(pay,all){var s=grSave();if(s.shop&&s.shop.cut)pay=Math.round(pay*1.1);if(all&&s.gup&&s.gup.monopoly)pay=Math.round(pay*1.15);var ab=grUpLv('up_abyssal');if(ab>0)pay=Math.round(pay*(1+0.05*ab));return pay}
// VFX: floating popups, color flashes, screen shake.
function grPop(fx,fy,text,color){
  if(!grActive)return;
  try{
    var d=document.createElement('div');
    d.className='grPop';d.textContent=text;
    d.style.left=fx+'%';d.style.top=fy+'%';d.style.color=color||'#9fd4ff';
    document.body.appendChild(d);
    setTimeout(function(){try{if(d.parentNode)d.parentNode.removeChild(d)}catch(e){}},1150);
  }catch(e){}
}
function grFlashDo(color,ms){
  if(!grActive)return;
  try{
    var f=grEl('grFlash');
    if(!f){f=document.createElement('div');f.id='grFlash';document.body.appendChild(f)}
    f.style.transition='none';f.style.background=color;f.style.opacity='0.45';
    requestAnimationFrame(function(){try{f.style.transition='opacity '+((ms||300)/1000)+'s';f.style.opacity='0'}catch(e){}});
  }catch(e){}
}
function grShakeDo(){
  if(!grActive)return;
  try{
    var ov=grEl('grOverlay');if(!ov)return;
    ov.classList.remove('grShake');void ov.offsetWidth;ov.classList.add('grShake');
    setTimeout(function(){try{ov.classList.remove('grShake')}catch(e){}},450);
  }catch(e){}
}
function grSeaRipple(fx,n,big){
  if(!grActive||grRoom!=='sea')return;
  try{
    var c=grEl('grCanvas');if(!c||!c.width)return;
    for(var i=0;i<(n||5);i++){
      grRipples.push({x:c.width*(fx+(Math.random()-.5)*0.08),y:Math.floor(c.height*0.62)+2,r:2,max:big?34+Math.random()*20:14+Math.random()*10,a:.6});
    }
  }catch(e){}
}
// PETTING: shift-click a pen slime for love. no plorts (usually). only love.
var GR_PAT_LINES=['it leans into it.','purring intensifies.','it wiggles. (happy.)','someone loves you. it is the slime.','pat pat.','it glows a little pinker.'];
function grPatSlime(el){
  try{
    if(!grActive)return;
    el.classList.remove('happy');void el.offsetWidth;el.classList.add('happy');
    var s=grSave();s.slimePats=(s.slimePats||0)+1;
    var bonus='';
    if(s.slimePats%25===0){s.plorts=(s.plorts||0)+1;bonus=' it loves you. here is a plort. do not question love.'}
    grStore(s);
    grPop(50,40,'♥','#ff9fd4');
    grNote(GR_PAT_LINES[Math.floor(Math.random()*GR_PAT_LINES.length)]+bonus+' (pats: '+s.slimePats+')');
    var pn=grEl('grPlortN');if(pn)pn.textContent=s.plorts;
  }catch(e){}
}
function grPlort(el,gold,pos){  try{
    el.classList.remove('happy');void el.offsetWidth;el.classList.add('happy');
    var s=grSave();
    var isLargo=false;try{isLargo=(el.getAttribute&&el.getAttribute('data-s')==='L')}catch(e){}
    var gain=gold?((s.gup&&s.gup.bloom)?15:8):(isLargo?3:1);
    if(!gold&&!isLargo&&s.up&&s.up.lucky&&Math.random()<0.2){gain=2}
    if(s.gup&&s.gup.soil)gain+=1;
    gain+=grUpLv('up_sieve');
    if((s.feedN||0)>0){gain+=1;s.feedN--}
    try{if((s.valve||'slimes')==='slimes')gain+=1}catch(e){}
    if(gold)s.goldCaught=(s.goldCaught||0)+1;
    s.plorts=(s.plorts||0)+gain;grStore(s);
    pos=pos||{x:50,y:35};
    grPop(pos.x,pos.y-3,'+'+gain+(gain>1?' plorts':' plort'),gold?'#ffd770':'#9fd4ff');
    var lines=gold?['GOLD. '+gain+' plorts. it knew what it was doing.']:['it purrs. slimes do that here.','plort.','it glows a little brighter.','it remembers the ranch.','plort. do not eat it.'];
    grNote(lines[Math.floor(Math.random()*lines.length)]+' (plorts: '+s.plorts+')');
    var pn=grEl('grPlortN');if(pn)pn.textContent=s.plorts;
    if(gold){try{el.style.display='none'}catch(e){}}
  }catch(e){}
}
var grMeadowSlimeAt=0;
function grMeadowVisit(){
  if(!grActive)return;
  try{
    var s=grSave();s.grassTouched=(s.grassTouched||0)+1;s.feedN=(s.feedN||0)+10;grStore(s);
    grMeadowSlimeAt=Date.now();
    grNote('a slime waddles to the meadow and touches grass. do not perceive it. (+10 happy clicks.)');
    grPop(50,40,'+grass','#8df0c8');
    if(grRoom==='meadow')grRender();
  }catch(e){}
}
function grGrassMe(){
  if(!grActive)return;
  var s=grSave(),wait=120000-(Date.now()-(s.grassMe||0));
  if(wait>0){grNote('the grass needs a minute. ('+Math.ceil(wait/1000)+'s)');return}
  s.grassMe=Date.now();s.glow=(s.glow||0)+3;grStore(s);
  grNote('you touch grass. +3 glow. the void pretends not to watch.');
  grPop(50,45,'+3 glow','#8df0c8');
  grRender();
}
function grHenBuy(){
  if(!grActive)return;
  var s=grSave();
  if((s.hens||0)>=6){grNote('roost full. six hens is a crowd. six hens is a parliament.');return}
  if((s.plorts||0)<30){grNote('a hen costs 30 plorts. the hens set the price. do not argue.');return}
  s.plorts-=30;s.hens=(s.hens||0)+1;grStore(s);
  grNote('bought a hen. it stares. ('+s.hens+'/6. eggs every 2 min.)');
  grSideHead();grRender();
}
function grEggSell(){
  if(!grActive)return;
  var s=grSave(),n=s.eggInv||0;
  if(n<=0){grNote('no eggs. the hens are thinking about it.');return}
  var pay=grCutPay(n*3,true);
  s.eggInv=0;s.glow=(s.glow||0)+pay;grStore(s);
  grNote('sold '+n+' eggs for '+pay+' glow. breakfast money.');
  grPop(50,45,'+'+pay+' glow','#ffd770');
  grSideHead();grRender();
}
function grCorralBuy(i){
  if(!grActive)return;
  var s=grSave(),corr=grCorrals(s);
  if(i<0||i>3||corr[i].own)return;
  if((s.glow||0)<GR_CORRAL_PRICES[i]){grNote('pen '+(i+1)+' costs '+GR_CORRAL_PRICES[i]+' glow. fences are not free.');return}
  s.glow-=GR_CORRAL_PRICES[i];corr[i].own=true;corr[i].hunger=50;grStore(s);
  grNote('bought pen '+(i+1)+'. it smells like potential. (leash a slime from Chism.)');
  grRender();
}
function grCorralPlace(i,id){
  if(!grActive)return;
  if(!GR_SLIMES[id])return;
  var s=grSave(),corr=grCorrals(s),c=corr[i];
  if(!c||!c.own||c.type)return;
  s.leads=s.leads||{};
  if((s.leads[id]||0)<=0){grNote('no '+id+' leash. Chism sells them. (counter goods.)');return}
  s.leads[id]--;c.type=id;c.n=1;c.hunger=60;c.prog=0;c.pend=0;c.boost=false;
  s.typesPenned=s.typesPenned||{};s.typesPenned[id]=1;
  if(Object.keys(s.typesPenned).length>=6)grAch('gr_menagerie');
  grStore(s);
  grNote('released one '+id+' into pen '+(i+1)+'. ('+GR_SLIMES[id].desc+')');
  grRender();
}
function grCorralAdd(i){
  if(!grActive)return;
  var s=grSave(),corr=grCorrals(s),c=corr[i];
  if(!c||!c.own||!c.type)return;
  var def=GR_SLIMES[c.type];
  if(c.n>=def.cap){grNote('pen '+(i+1)+' is full ('+def.cap+'). they like elbow room.');return}
  s.leads=s.leads||{};
  if((s.leads[c.type]||0)<=0){grNote('no '+c.type+' leash left. Chism. counter. go.');return}
  s.leads[c.type]--;c.n++;grStore(s);
  grNote('added a '+c.type+'. ('+c.n+'/'+def.cap+'.) the pen wobbles.');
  grRender();
}
function grCorralFeed(i,kind){
  if(!grActive)return;
  var s=grSave(),corr=grCorrals(s),c=corr[i];
  if(!c||!c.own||!c.type||(c.n||0)<=0)return;
  var def=GR_SLIMES[c.type];
  if(kind==='egg'){
    if((s.eggInv||0)<=0){grNote('no eggs. the hens are thinking about it.');return}
    if(def.diet!=='eggs'&&def.diet!=='any'){grNote(c.type+' stares at the egg. it eats fruit. (fav: '+def.fav+')');return}
    s.eggInv--;
    var favE=(def.fav==='eggs');
    c.hunger=Math.min(100,(c.hunger||0)+20*(favE?1.5:1));
    if(favE)c.boost=true;
    grStore(s);
    grNote('fed an egg. ('+Math.floor(c.hunger)+'% full.'+(favE?' FAVORITE. next payout double.':'')+')');
  }else{
    s.fruitInv=s.fruitInv||[];
    if(!s.fruitInv.length){grNote('pockets hold no fruit. the plants are working on it.');return}
    if(def.diet!=='fruit'&&def.diet!=='any'){grNote(c.type+' wants eggs. it is an egg slime. respect that.');return}
    var f=s.fruitInv.shift();
    var favF=(f.seed===def.fav);
    c.hunger=Math.min(100,(c.hunger||0)+12*(favF?1.5:1));
    if(favF)c.boost=true;
    grStore(s);
    grNote('fed '+f.seed+' fruit. ('+Math.floor(c.hunger)+'% full.'+(favF?' FAVORITE. next payout double.':'')+')');
  }
  grRender();
}
function grCorralMister(i){
  if(!grActive)return;
  var s=grSave(),corr=grCorrals(s),c=corr[i];
  if(!c||!c.own||c.mister)return;
  if((s.glow||0)<300){grNote('misters cost 300 glow.');return}
  s.glow-=300;c.mister=true;grStore(s);
  grNote('pen '+(i+1)+' misted. hunger drains half as fast. the slimes approve. (moistly.)');
  grRender();
}
function grRoundup(){
  if(!grActive)return;
  var s=grSave(),corr=grCorrals(s);
  s.escPen=s.escPen||{};
  var kinds=Object.keys(s.escPen).filter(function(k){return GR_SLIMES[k]&&(s.escPen[k]||0)>0});
  if(!kinds.length){grSideSay('no loose slimes. the ranch is accounted for. suspiciously tidy.');grSideHead();return}
  var back=0;
  for(var ki=0;ki<kinds.length;ki++){
    var t=kinds[ki];
    while((s.escPen[t]||0)>0){
      var placed=false;
      for(var i=0;i<corr.length;i++){var c=corr[i];if(c.own&&c.type===t&&c.n<GR_SLIMES[t].cap){c.n++;s.escPen[t]--;back++;placed=true;break}}
      if(placed)continue;
      var opened=false;
      for(var j=0;j<corr.length;j++){var c2=corr[j];if(c2.own&&!c2.type){c2.type=t;c2.n=1;c2.hunger=60;c2.prog=0;c2.pend=0;c2.boost=false;s.escPen[t]--;back++;opened=true;break}}
      if(!opened)break;
    }
    if((s.escPen[t]||0)<=0)delete s.escPen[t];
  }
  grStore(s);
  if(back>0){grSideSay('rounded up '+back+' loose slime'+(back>1?'s':'')+'. the fences look embarrassed.');grAch('gr_roundup')}
  else grSideSay('no room. the loose slimes stay loose. buy pens. build walls. live a little.');
  grSideHead();grRender();
}
function grCorralWalls(i){
  if(!grActive)return;
  var s=grSave(),corr=grCorrals(s),c=corr[i];
  if(!c||!c.own||c.walls)return;
  if((s.glow||0)<GR_WALL_COST){grNote('walls cost '+GR_WALL_COST+' glow.');return}
  s.glow-=GR_WALL_COST;c.walls=true;grStore(s);
  grNote('pen '+(i+1)+' walled. nothing squeezes out now. (ambitious ones try anyway.)');
  grRender();
}
function grCorralCollect(i){
  if(!grActive)return;
  var s=grSave(),corr=grCorrals(s),c=corr[i];
  if(!c||!c.own||!c.type||(c.pend||0)<=0){grNote('nothing pooled. patience is a crop too.');return}
  s.plorts=(s.plorts||0)+c.pend;
  var extras=[];
  if((c.bSeed||0)>0){var pool=Object.keys(GR_SEEDS),got={};for(var bs=0;bs<c.bSeed;bs++){var mk=pool[Math.floor(Math.random()*pool.length)];s.seeds=s.seeds||{};s.seeds[mk]=(s.seeds[mk]||0)+1;got[mk]=(got[mk]||0)+1}var gl=[];for(var gk in got)gl.push(got[gk]+'x '+gk);extras.push('composted into '+gl.join(', '));c.bSeed=0}
  if((c.bChum||0)>0){s.shop=s.shop||{};s.shop.chumN=(s.shop.chumN||0)+c.bChum;extras.push(c.bChum+' chum (too hot to hold)');c.bChum=0}
  if((c.bGlow||0)>0){s.glow=(s.glow||0)+c.bGlow;extras.push('+'+c.bGlow+' glow (it sweats money)');c.bGlow=0}
  if((c.bKelp||0)>0){s.seeds=s.seeds||{};s.seeds.whalekelp=(s.seeds.whalekelp||0)+c.bKelp;extras.push(c.bKelp+'x whalekelp (brined)');c.bKelp=0}
  grNote('collected '+c.pend+' plorts from pen '+(i+1)+'. ('+c.type+'s are proud.)'+(extras.length?' '+extras.join(' · ')+'.':''));
  c.pend=0;grStore(s);
  grPop(50,42,'+plorts','#9fd4ff');
  grSideHead();grRender();
}
function grFeedAuto(){
  if(!grActive)return;
  var s=grSave(),corr=grCorrals(s),bi=-1,bh=101;
  for(var i=0;i<corr.length;i++){if(corr[i].own&&corr[i].type&&(corr[i].n||0)>0&&(corr[i].hunger||0)<bh){bh=corr[i].hunger;bi=i}}
  if(bi<0){grSideSay('no hungry pens. the ranch is at peace.');grSideHead();return}
  var c=corr[bi],def=GR_SLIMES[c.type];
  s.fruitInv=s.fruitInv||[];
  if(s.fruitInv.length&&(def.diet==='fruit'||def.diet==='any'))grCorralFeed(bi,'fruit');
  else if((s.eggInv||0)>0&&(def.diet==='eggs'||def.diet==='any'))grCorralFeed(bi,'egg');
  else{grSideSay('pen '+(bi+1)+' ('+c.type+') is hungry and the cupboard is bare.');grSideHead()}
}
// MURDER MODE: brutally murder phosphor slimes. toggle in the tooth.
// the pen refills every render. the guilt does not.
var GR_MURDER_LINES=['it died. you monster.','meat is meat.','the pen is quieter now.','obj cannot see this. good.','it never saw the tooth coming.','one less witness.','no funeral. the pen moves on.'];
function grMurderSet(arg){
  if(!grActive)return;
  var s=grSave(),a=String(arg||'').trim().toLowerCase();
  s.murder=(a==='on')?true:(a==='off'?false:!s.murder);
  grStore(s);
  grSideSay(s.murder?'murder mode ON. click a slime to kill it. (+3 plorts. meat is meat.)':'murder mode off. the slimes keep their distance anyway.');
  grSideHead();grRender();
}
function grMurder(el,gold){
  try{
    if(!grActive)return;
    var s=grSave();
    try{el.style.display='none'}catch(e){}
    var gain=gold?8:3;
    if(gold)s.goldCaught=(s.goldCaught||0)+1;
    s.plorts=(s.plorts||0)+gain;s.murders=(s.murders||0)+1;grStore(s);
    grPop(50,40,'+'+gain+' plorts','#ff6a6a');
    grFlashDo('rgba(160,20,20,0.45)',350);grShakeDo();
    var line=GR_MURDER_LINES[(s.murders-1)%GR_MURDER_LINES.length];
    grNote((gold?'GOLD. it knew what it was doing. past tense. ':'')+line+' (+'+gain+' plorts. murders: '+s.murders+')');
    var pn=grEl('grPlortN');if(pn)pn.textContent=s.plorts;
  }catch(e){}
}
var GR_ROCK_LINES=[
 '...',
 'i am a rock. this is my cameo.',
 'the grass is nice. i am also nice. we are both here.',
 'i have been "details later" for months. look at me now. details.',
 'obj cannot see this cave. i can. i am a rock. i see everything. mostly grass.',
 'the warden has a heartbeat. i do not. advantage: rock.',
 'chism owes me money. that stays between us. and chism.'
];
function grRockTalk(){
  if(!grActive)return;
  var s=grSave(),n=s.rockN||0;
  var line=GR_ROCK_LINES[n%GR_ROCK_LINES.length];
  s.rockN=n+1;
  if(!s.rockMet){
    s.rockMet=true;s.glow=(s.glow||0)+50;grStore(s);
    grAch('gr_rockcameo');
    grNote('the rock: "'+line+'" ...it shifts slightly. rent: +50 glow. it does not need it. you take it anyway.');
    grPop(50,45,'+50 glow','#ffd770');
  }else{grStore(s);grNote('the rock: "'+line+'"')}
  grSideHead();grRender();
}
function grBell(){
  if(!grActive||grRoom!=='phosphor')return;
  try{
    var sl=document.querySelectorAll('#grSlimePen .grSlime[data-s]');
    for(var i=0;i<sl.length;i++){sl[i].style.left=(38+Math.random()*14)+'%';sl[i].style.top=(30+Math.random()*20)+'%'}
    grNote('rung. they come running.');
  }catch(e){}
}
// plort tycoon: fluctuating market, sell for skill points, buy upgrades.
var grTickT=0,grGoldT=0;
function grMarketEnsure(){
  var s=grSave(),dirty=false;
  if(!(s.price>=3)){s.price=5;dirty=true}
  if(!(s.priceT>0)){s.priceT=20;dirty=true}
  if(dirty)grStore(s);
}
// MARKET EVENTS: every price roll has a 12% chance of... weather. the market
// does not explain itself, but sometimes it raises its voice.
function grMarketEvent(s,floor){
  if(Math.random()>=0.12)return;
  var roll=Math.random(),id='crash',msg='';
  if(roll<0.25){id='crash';s.price=floor;msg='MARKET CRASH. plorts worth '+floor+'. the puddle-shopkeeper faints.'}
  else if(roll<0.5){id='surge';s.price=9;msg='MARKET SURGE. plorts worth 9. sell. SELL.'}
  else if(roll<0.75){id='bloom';s.goldUntil=Date.now()+60000;msg='PHOSPHOR BLOOM. the cave lights up. gold slimes everywhere for 60s.'}
  else{id='lowtide';s.glow=(s.glow||0)+40;msg='LOW TIDE. the boards are littered with glow. +40. finders keepers.'}
  s.mktEvent=id;s.mktEventUntil=Date.now()+60000;s.mktEvents=(s.mktEvents||0)+1;
  grStore(s);
  grSideSay(msg);
  grPop(50,40,msg.split('.')[0],'#ffd770');
  if(s.mktEvents>=1)grAch('gr_eventful');
  try{grSideHead()}catch(e){}
}
function grSell(all){
  if(!grActive)return;
  var s=grSave(),n=s.plorts||0;
  if(n<=0){grNote('no plorts. the slimes stare.');return}
  var k=all?n:1,unit=grUnit(s.price);
  s.plorts=n-k;
  var pay=grCutPay(k*unit,all);
  s.glow=(s.glow||0)+pay;s.lifePlorts=(s.lifePlorts||0)+k;grStore(s);
  try{grClubCheck()}catch(e){}
  grNote('sold '+k+' plort'+(k>1?'s':'')+' for '+pay+' glow. '+unit+' each.');
  grPop(50,45,'+'+pay+' glow','#9fd4ff');
  var pn=grEl('grPlortN');if(pn)pn.textContent=s.plorts;
  grSideHead();
}
// THE SILO: pockets are small. the silo is a hole that remembers.
// plorts, eggs, fruit in. same stuff out. 300 fruit cap (pockets hold 60).
function grSiloGet(){
  var s=grSave();
  if(!s.silo||typeof s.silo!=='object')return {plorts:0,eggs:0,fruit:[]};
  if(!(s.silo.fruit instanceof Array))s.silo.fruit=[];
  return s.silo;
}
function grSiloSay(){
  var s=grSave(),o=grSiloGet();
  grSideSay('silo: '+(o.plorts||0)+' plorts · '+(o.eggs||0)+' eggs · '+o.fruit.length+'/300 fruit. pockets: '+(s.plorts||0)+'p · '+(s.eggInv||0)+'e · '+((s.fruitInv||[]).length)+'f.');
  grSideHead();
}
function grSiloMove(dir,what,arg){
  if(!grActive)return;
  var s=grSave(),o=grSiloGet(),n=0;
  var want=String(arg||'').trim().toLowerCase();
  function num(have,cap){
    if(want==='all'||want===''||want==='everything')return Math.max(0,Math.min(have,cap));
    var k=parseInt(want,10);if(!(k>0))return -1;
    return Math.max(0,Math.min(k,have,cap));
  }
  if(what==='plorts'){
    if(dir>0){n=num(s.plorts||0,1e9);if(n<0){grSideSay('store how many? (n or all)');grSideHead();return}if(!n){grSideSay('no plorts to store. pockets echo.');grSideHead();return}s.plorts-=n;o.plorts=(o.plorts||0)+n}
    else{n=num(o.plorts||0,1e9);if(n<0){grSideSay('take how many? (n or all)');grSideHead();return}if(!n){grSideSay('silo is out of plorts. the hole is empty.');grSideHead();return}o.plorts-=n;s.plorts=(s.plorts||0)+n}
  }else if(what==='eggs'){
    if(dir>0){n=num(s.eggInv||0,1e9);if(n<0){grSideSay('store how many? (n or all)');grSideHead();return}if(!n){grSideSay('no eggs. the hens are thinking about it.');grSideHead();return}s.eggInv-=n;o.eggs=(o.eggs||0)+n}
    else{n=num(o.eggs||0,1e9);if(n<0){grSideSay('take how many? (n or all)');grSideHead();return}if(!n){grSideSay('silo is out of eggs. no omelets today.');grSideHead();return}o.eggs-=n;s.eggInv=(s.eggInv||0)+n}
  }else if(what==='fruit'){
    s.fruitInv=s.fruitInv||[];
    if(dir>0){n=num(s.fruitInv.length,300-o.fruit.length);if(n<0){grSideSay('store how many? (n or all)');grSideHead();return}if(!n){grSideSay(s.fruitInv.length?'silo fruit is full (300). the hole is stuffed.':'pockets hold no fruit.');grSideHead();return}for(var i=0;i<n;i++)o.fruit.push(s.fruitInv.shift())}
    else{n=num(o.fruit.length,60-s.fruitInv.length);if(n<0){grSideSay('take how many? (n or all)');grSideHead();return}if(!n){grSideSay(o.fruit.length?'pockets are full (60). eat something.':'silo holds no fruit.');grSideHead();return}for(var j=0;j<n;j++)s.fruitInv.push(o.fruit.shift())}
  }else{grSideSay('silo what? plorts, eggs, fruit. (store <what> [n|all] / take <what> [n|all])');grSideHead();return}
  s.silo=o;grStore(s);
  grSideSay((dir>0?'stored ':'took ')+n+' '+what+'. silo: '+(o.plorts||0)+'p · '+(o.eggs||0)+'e · '+o.fruit.length+'f.');
  grSideHead();grRender();
}
function grBuy(id,cost){  if(!grActive)return;
  var s=grSave();s.up=s.up||{};
  if(s.up[id])return;
  if((s.plorts||0)<cost){grNote('not enough plorts. ('+cost+' needed. the shopkeeper is a puddle.)');return}
  s.plorts-=cost;s.up[id]=true;grStore(s);
  grNote('bought. the cave approves.');
  grRender();
}
function grTick(){
  if(!grActive)return;
  try{
    var s=grSave(),dirty=false;
    grMarketEnsure();s=grSave();
    s.priceT-=1;
    if(s.priceT<=0){
      s.priceT=20;
      var floor=grHas('heart')?5:3;
      var bias=((s.gup&&s.gup.corner)&&(s.plorts||0)>=20)?1:0;
      s.lastPrice=s.price||5;
      s.price=Math.max(floor,Math.min(9,(s.price||5)+Math.floor(Math.random()*5)-2+bias));
      dirty=true;
      try{grMarketEvent(s,floor)}catch(e){}
      s=grSave();
      var pn=grEl('grPriceN');if(pn&&grRoom==='phosphor')pn.textContent=s.price;
    }
    // whale: surfaces every few minutes for 60s, pays 2x (3x monopoly)
    if(s.whale&&s.whale.until<Date.now()){
      s.whale=null;dirty=true;
      grSideSay('the whale sounds... gone.');
    }else if(!s.whale){
      var wrate=((s.gup&&s.gup.song)?0.004:0.002)+Math.min(0.004,(s.kelpFed||0)*0.0005);
      var chummed=false;
      try{if(s.shop&&s.shop.chumN>0){s.shop.chumN--;chummed=true}}catch(e){}
      if(chummed||Math.random()<wrate){
        s.whale={until:Date.now()+60000+15000*grUpLv('up_leviathan'),mult:(s.gup&&s.gup.monopoly)?3:2};
        dirty=true;
        grSideSay('something HUGE moves below. a whale surfaces: sell whale (up to 15 at '+s.whale.mult+'x). 60 seconds.');
        grNote('something HUGE moves below. check the tooth. (sell whale)');
        grShakeDo();grFlashDo('rgba(96,145,235,0.4)',400);
        grPop(50,40,'A WHALE SURFACES','#ffd770');
      }
    }
    if(Math.random()<1/75){try{grMeadowVisit()}catch(e){}}
    if(s.up&&s.up.net){
      var netMax=((s.valve||'slimes')==='nets')?12:20;
      s.netT=(s.netT||netMax)-1;
      if(s.netT<=0){s.netT=netMax;var ngrab=1+((s.gup&&s.gup.roots)?1:0)+((s.shop&&s.shop.bucket)?1:0)+((s.shop&&s.shop.net2)?1:0)+(((s.tackleTier||0)>=1)?1:0);s.plorts=(s.plorts||0)+ngrab;dirty=true;
        var q=grEl('grPlortN');if(q&&grRoom==='phosphor')q.textContent=s.plorts;}
    }
    if(s.gadgets&&s.gadgets.plunger){
      s.plungT=(s.plungT||10)-1;
      if(s.plungT<=0){s.plungT=10;s.plorts=(s.plorts||0)+1;dirty=true;
        var qp=grEl('grPlortN');if(qp&&grRoom==='phosphor')qp.textContent=s.plorts;}
    }
    if(s.mix&&s.mix.puddle){
      s.pudT=(s.pudT||30)-1;
      if(s.pudT<=0){s.pudT=30;s.plorts=(s.plorts||0)+1;dirty=true;
        var qd=grEl('grPlortN');if(qd&&grRoom==='phosphor')qd.textContent=s.plorts;}
    }
    if((s.hens||0)>0){
      s.eggT=(s.eggT||120)-1;
      if(s.eggT<=0){s.eggT=120;var lay=Math.max(0,Math.min(s.hens,40-(s.eggInv||0)));if(lay>0){s.eggInv=(s.eggInv||0)+lay;dirty=true;grNote('the hens laid '+lay+' egg'+(lay>1?'s':'')+'. (+cluck.)')}}
    }
    try{
      var corr=grCorrals(s);
      for(var ci=0;ci<corr.length;ci++){
        var cc=corr[ci];
        if(!cc.own||!cc.type||!GR_SLIMES[cc.type])continue;
        var def=GR_SLIMES[cc.type];
        cc.hunger=Math.max(0,(cc.hunger||0)-(cc.mister?0.07:0.14));
        if((cc.n||0)>0&&(cc.hunger||0)>0){
          cc.prog=(cc.prog||0)+cc.n*1/def.rate;dirty=true;
          while(cc.prog>=1){
            cc.prog-=1;
            var mult=1;
            if(cc.boost){mult=2;cc.boost=false}
            else if(cc.type==='gild'&&Math.random()<0.2)mult=2;
            cc.pend=(cc.pend||0)+cc.n*mult;
            if(cc.type==='murm'&&Math.random()<0.15){s.deep=Math.round(((s.deep||0)+1)*10)/10;dirty=true}
            if(cc.type==='mossback'&&Math.random()<0.1){cc.bSeed=(cc.bSeed||0)+1;dirty=true}
            if(cc.type==='sizzle'&&Math.random()<0.1){cc.bChum=(cc.bChum||0)+1;dirty=true}
            if(cc.type==='gild'&&Math.random()<0.15){cc.bGlow=(cc.bGlow||0)+3;dirty=true}
            if(cc.type==='brine'&&Math.random()<0.12){cc.bKelp=(cc.bKelp||0)+1;dirty=true}
            if(cc.type==='tangle'){cc.braid=(cc.braid||0)+1;if(cc.braid>=3){cc.braid=0;cc.pend=(cc.pend||0)+cc.n;dirty=true}}
          }
        }
      }
      s.escT=(s.escT||60)-1;
      if(s.escT<=0){
        s.escT=60;
        for(var ce=0;ce<corr.length;ce++){
          var cx=corr[ce];
          if(cx.own&&cx.type&&(cx.n||0)>0&&(cx.hunger||0)<=0&&!cx.walls&&!(cx.type==='brine'&&Math.random()<0.5)){
            cx.n--;dirty=true;
            s.escPen=s.escPen||{};s.escPen[cx.type]=(s.escPen[cx.type]||0)+1;
            grNote('a '+cx.type+' squeezed out of pen '+(ce+1)+'. feed them. (walls prevent this.)');
            if(cx.n<=0){cx.type=null;cx.prog=0}
          }
        }
      }
    }catch(e){}
    if(s.gadgets&&s.gadgets.drone){
      s.droneT=(s.droneT||30)-1;
      if(s.droneT<=0){
        s.droneT=30;
        s.fruitInv=s.fruitInv||[];
        var dp=grPlots(s),done=false;
        for(var di=0;di<dp.length&&!done;di++){
          if(dp[di].fruits&&dp[di].fruits.length&&s.fruitInv.length<60){
            var df=dp[di].fruits.shift();
            s.fruitInv.push({seed:dp[di].seed,w:df.w,mut:df.mut});
            done=true;dirty=true;
            grNote('drone: picked one. it beeped.');
          }
        }
      }
    }
    try{s.tickAt=Date.now();grStore(s)}catch(e){}
    try{grFarmTick()}catch(e){}
    try{grExtTick()}catch(e){}
    if(grRoom==='meadow'){
      try{
        var gb=grEl('grGrassMe');
        if(gb){
          var sv=grSave(),cd2=0;
          if(sv.grassMe)cd2=Math.ceil((sv.grassMe+120000-Date.now())/1000);
          if(cd2>0){gb.textContent='touch grass ('+cd2+'s)';gb.disabled=true}
          else if(gb.disabled){grRender()}
        }
      }catch(e){}
    }
    if(grRoom!=='phosphor')return;
    var sl=document.querySelectorAll('#grSlimePen .grSlime[data-s]');
    for(var i=0;i<sl.length;i++){
      if(Math.random()<0.07){
        sl[i].style.left=(4+Math.random()*78)+'%';
        sl[i].style.top=(4+Math.random()*55)+'%';
        try{(function(el){el.classList.add('go');setTimeout(function(){try{el.classList.remove('go')}catch(e){}},1500)})(sl[i])}catch(e){}
      }
    }
    var g=grEl('grGold');
    if(g){
      var sG=grSave(),rate=((sG.gup&&sG.gup.fever)?0.035:0.012)*((sG.shop&&sG.shop.lamp)?1.5:1)*(1+0.2*grUpLv('up_sonararr'))*((sG.oath==='remember')?2:1);
      try{if(sG.goldUntil>Date.now())rate*=2}catch(e){}
      var gdur=(sG.gup&&sG.gup.bloom)?14:8;
      if(sG.shop&&sG.shop.lasso)gdur*=2;
      if(g.style.display==='none'){if(Math.random()<rate){g.style.display='block';g.style.left=(8+Math.random()*72)+'%';g.style.top=(8+Math.random()*60)+'%';grGoldT=gdur;
        try{if(grSave().gadgets&&grSave().gadgets.sonar)grNote('sonar pings. gold close. MOVE.')}catch(e){}}}
      else{grGoldT--;if(grGoldT<=0)g.style.display='none'}
    }
  }catch(e){}
}
function grNote(t){
  try{
    var n=grEl('grNote');if(!n)return;
    n.textContent=t;
  }catch(e){}
}
// GROTTO PERFMODE: no jiggle, no popups. obj would not approve. obj cannot see it.
function grPerfApply(){
  try{
    var on=!!grSave().perf;
    var ov=grEl('grOverlay');if(ov){if(on)ov.classList.add('grPerf');else ov.classList.remove('grPerf')}
    try{if(on)document.body.classList.add('grPerfOn');else document.body.classList.remove('grPerfOn')}catch(e){}
  }catch(e){}
}
function grPerfSet(){
  if(!grActive)return;
  var s=grSave();s.perf=!s.perf;grStore(s);
  grPerfApply();
  grSideSay(s.perf?'perfmode on. slimes hold still. popups banned. the cave runs cold.':'perfmode off. jiggle restored. popups everywhere. the cave breathes again.');
  grSideHead();
}
function grRender(){
  try{
    try{grPerfApply()}catch(e){}
    var t=grEl('grTitle'),b=grEl('grBody'),nv=grEl('grNav');
    if(!t||!b||!nv)return;
    var R=GR_ROOMS[grRoom]||GR_ROOMS.mouth;
    t.textContent='G R O T T O · '+R.title;
    try{grSideHead()}catch(e){}
    var rhtml=R.html();
    b.innerHTML=rhtml+'<div id="grNote" style="margin-top:14px;min-height:22px;color:#7fa8c9;font-style:italic"></div>';
    var h='<button class="grBtn" id="grTravel">travel: '+grRoom+' ▾</button>';
    h+='<button class="grBtn" data-leave="1">leave</button>';
    h+='<div id="grMap" style="display:none"></div>';
    var vs=grSave();
    try{grBright=(vs.gup&&vs.gup.lantern)?1:0}catch(e){}
    nv.innerHTML=h;
    var tv=grEl('grTravel');
    if(tv)tv.onclick=function(){grMapToggle()};
    grMapDraw();
    var lv=nv.querySelector('[data-leave]');
    if(lv)lv.onclick=function(){grExit()};
    var sl=b.querySelectorAll('.grSlime[data-s]');
    for(var k=0;k<sl.length;k++)(function(el){el.onclick=function(ev){var p=null,shift=false;try{if(ev&&typeof ev.clientX==='number')p={x:ev.clientX/window.innerWidth*100,y:ev.clientY/window.innerHeight*100}}catch(e){}try{shift=!!(ev&&ev.shiftKey)}catch(e){}if(shift){grPatSlime(el);return}try{if(grSave().murder){grMurder(el,false,p);return}}catch(e){}grPlort(el,false,p)}})(sl[k]);
    var pen0=grEl('grSlimePen');
    if(pen0){
      var sps=pen0.querySelectorAll('.grSlime[data-s]');
      for(var z=0;z<sps.length;z++){if(!sps[z].style.left){sps[z].style.left=(6+z*20+Math.random()*8)+'%';sps[z].style.top=(15+Math.random()*50)+'%'}}
    }
    var gd=grEl('grGold');
    if(gd)gd.onclick=function(){try{if(grSave().murder){grMurder(gd,true);return}}catch(e){}grPlort(gd,true)};
    var s1=grEl('grSell1');
    if(s1)s1.onclick=function(){grSell(false)};
    var sa=grEl('grSellAll');
    if(sa)sa.onclick=function(){grSell(true)};
    var by=b.querySelectorAll('[data-buy]');
    for(var w=0;w<by.length;w++)(function(el){
      el.onclick=function(){grBuy(el.getAttribute('data-buy'),parseInt(el.getAttribute('data-cost'),10)||0)};
    })(by[w]);
    var li=grEl('grListen');
    if(li)li.onclick=function(e){try{e.stopPropagation()}catch(err){}grListen()};
    var bb=grEl('grBellBtn');
    if(bb)bb.onclick=function(e){try{e.stopPropagation()}catch(err){}grBell()};
    var gm2=grEl('grGrassMe');
    if(gm2)gm2.onclick=function(){grGrassMe()};
    var hb2=grEl('grHenBuy');
    if(hb2)hb2.onclick=function(){grHenBuy()};
    var es2=grEl('grEggSell');
    if(es2)es2.onclick=function(){grEggSell()};
    var rk=grEl('grRockBtn');
    if(rk)rk.onclick=function(){grRockTalk()};
    var ch=b.querySelectorAll('.grChime');
    for(var m=0;m<ch.length;m++)(function(el){
      if(el.getAttribute('data-g')!==null){el.onclick=function(){grGauntKnock(parseInt(el.getAttribute('data-g'),10)||0,el)}}
      else{el.onclick=function(){grKnock(parseInt(el.getAttribute('data-c'),10)||0,el)}};
    })(ch[m]);
    var gp=grEl('grGauntPay');
    if(gp)gp.onclick=function(){grGauntToll()};
    var grp=grEl('grGauntReplay');
    if(grp)grp.onclick=function(){grGauntReplayStart()};
    var gl2=grEl('grGauntListen');
    if(gl2)gl2.onclick=function(e){try{if(e)e.stopPropagation()}catch(err){}grGauntListen()};
    var lb=b.querySelectorAll('[data-lore]');
    for(var q=0;q<lb.length;q++)(function(el){
      el.onclick=function(){
        grLoreView=el.getAttribute('data-lore');
        try{
          var s=grSave();s.loreRead=s.loreRead||[];
          if(s.loreRead.indexOf(grLoreView)===-1){s.loreRead.push(grLoreView);grStore(s)}
          if(grLore1Count()>=3)grAch('gr_lorekeeper');
          try{if(grLore2AllRead())grAch('gr_lorekeeper2')}catch(e){}
        }catch(e){}
        grRender();
      };
    })(lb[q]);
    var back=grEl('grLoreBack');
    if(back)back.onclick=function(){grLoreView=null;grRender()};
    try{
      if(b&&!b.grDragWired){
        b.grDragWired=true;
        b.style.position='relative';b.style.cursor='grab';
        b.onpointerdown=function(e){
          try{
            try{if(grSave().locked)return}catch(err){}
            if(e.button!==undefined&&e.button!==0)return;
            var sx=e.clientX,sy=e.clientY,moved=false,captured=false;
            var ox=0,oy=0;
            var m=/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/.exec(b.style.transform||'');
            if(m){ox=parseFloat(m[1]);oy=parseFloat(m[2])}
            b.classList.add('grDragging');b.style.cursor='grabbing';
            var mv=function(e2){
              try{
                var dx=e2.clientX-sx,dy=e2.clientY-sy;
                if(Math.abs(dx)+Math.abs(dy)>6){
                  moved=true;
                  if(!captured){captured=true;try{b.setPointerCapture(e.pointerId)}catch(err){}}
                }
                if(!moved)return;
                b.style.transform='translate('+(ox+dx)+'px,'+(oy+dy)+'px)';
              }catch(err){}
            };
            var up=function(){
              try{b.classList.remove('grDragging');b.style.cursor='grab'}catch(err){}
              b.removeEventListener('pointermove',mv);
              if(moved){
                var stop=function(e3){e3.stopPropagation();e3.preventDefault();b.removeEventListener('click',stop,true)};
                b.addEventListener('click',stop,true);
                setTimeout(function(){try{b.removeEventListener('click',stop,true)}catch(err){}},50);
              }
            };
            b.addEventListener('pointermove',mv);
            b.addEventListener('pointerup',up,{once:true});
            b.addEventListener('pointercancel',up,{once:true});
          }catch(err){}
        };
      }
    }catch(e){}
    var lb2=b.querySelectorAll('[data-labbuy]');
    for(var l2=0;l2<lb2.length;l2++)(function(el){
      el.onclick=function(){grLabBuy(el.getAttribute('data-labbuy'))};
    })(lb2[l2]);
    var mx2=b.querySelectorAll('[data-mix]');
    for(var m2=0;m2<mx2.length;m2++)(function(el){
      el.onclick=function(){grMix(el.getAttribute('data-mix'))};
    })(mx2[m2]);
    var ef=b.querySelectorAll('[data-extfab]');
    for(var ef2=0;ef2<ef.length;ef2++)(function(el){
      el.onclick=function(){var v=el.getAttribute('data-extfab').split(':');grExtFab(v[0],parseInt(v[1],10)||0)};
    })(ef[ef2]);
    var eh=b.querySelectorAll('[data-extharv]');
    for(var eh2=0;eh2<eh.length;eh2++)(function(el){
      el.onclick=function(){grExtHarvest(parseInt(el.getAttribute('data-extharv'),10)||0)};
    })(eh[eh2]);
    var ep2=b.querySelectorAll('[data-extdep]');
    for(var ep3=0;ep3<ep2.length;ep3++)(function(el){
      el.onclick=function(){var v=el.getAttribute('data-extdep').split(':');grExtDeploy(parseInt(v[0],10)||0,v[1],parseInt(v[2],10)||0)};
    })(ep2[ep3]);
    var ed=b.querySelectorAll('[data-extdemo]');
    for(var ed2=0;ed2<ed.length;ed2++)(function(el){
      el.onclick=function(){grExtDemo(parseInt(el.getAttribute('data-extdemo'),10)||0)};
    })(ed[ed2]);
    var vv=b.querySelectorAll('[data-valve]');
    for(var v2=0;v2<vv.length;v2++)(function(el){
      el.onclick=function(){
        try{var s=grSave();s.valve=el.getAttribute('data-valve');grStore(s);grNote('the wheel groans. water changes its mind. → '+s.valve)}catch(e){}
        grFlashDo('rgba(96,145,235,0.35)',350);
        grRender();
      };
    })(vv[v2]);
    var hb=grEl('grHushBtn');
    if(hb)hb.onclick=function(){grHushListen()};
    var tk2=grEl('grTackle');
    if(tk2)tk2.onclick=function(){
      var s=grSave();if(s.tackle)return;
      s.tackle=true;s.glow=(s.glow||0)+75;grStore(s);
      grNote('inside: 75 glow, three hooks, and a note reading "do not". (looted.)');
      grSideHead();grRender();
    };
    var tkb=b.querySelectorAll('[data-tackle]');
    for(var tk3=0;tk3<tkb.length;tk3++)(function(el){
      el.onclick=function(){grTackleBuy(parseInt(el.getAttribute('data-tackle'),10)||0)};
    })(tkb[tk3]);
    var tk=grEl('grTalk');
    if(tk)tk.onclick=function(){grChismView=null;grBark()};
    var sh=grEl('grShopBtn');
    if(sh)sh.onclick=function(){grChismView=(grChismView==='shop')?null:'shop';grRender()};
    var qu=grEl('grQuestBtn');
    if(qu)qu.onclick=function(){grChismView=(grChismView==='quest')?null:'quest';grRender()};
    var exb=grEl('grExchBtn');
    if(exb)exb.onclick=function(){grChismView=(grChismView==='exchange')?null:'exchange';grRender()};
    var exw=b.querySelectorAll('[data-exch]');
    for(var ex2=0;ex2<exw.length;ex2++)(function(el){
      el.onclick=function(){grExchTake(el.getAttribute('data-exch'))};
    })(exw[ex2]);
    var cl=grEl('grClaim');
    if(cl)cl.onclick=function(){grQuestClaim()};
    var sb=b.querySelectorAll('[data-shopbuy]');
    for(var sb2=0;sb2<sb.length;sb2++)(function(el){
      el.onclick=function(){grShopBuy(el.getAttribute('data-shopbuy'))};
    })(sb[sb2]);
    var pb=b.querySelectorAll('[data-plotbuy]');
    for(var pb2=0;pb2<pb.length;pb2++)(function(el){
      el.onclick=function(){grPlotBuy(parseInt(el.getAttribute('data-plotbuy'),10)||0)};
    })(pb[pb2]);
    var cb=b.querySelectorAll('[data-cbuy]');
    for(var cb2=0;cb2<cb.length;cb2++)(function(el){
      el.onclick=function(){grCorralBuy(parseInt(el.getAttribute('data-cbuy'),10)||0)};
    })(cb[cb2]);
    var cp=b.querySelectorAll('[data-cplace]');
    for(var cp2=0;cp2<cp.length;cp2++)(function(el){
      el.onclick=function(){var v=el.getAttribute('data-cplace').split(':');grCorralPlace(parseInt(v[0],10)||0,v[1])};
    })(cp[cp2]);
    var ca=b.querySelectorAll('[data-cadd]');
    for(var ca2=0;ca2<ca.length;ca2++)(function(el){
      el.onclick=function(){grCorralAdd(parseInt(el.getAttribute('data-cadd'),10)||0)};
    })(ca[ca2]);
    var cf=b.querySelectorAll('[data-cfeed]');
    for(var cf2=0;cf2<cf.length;cf2++)(function(el){
      el.onclick=function(){var v=el.getAttribute('data-cfeed').split(':');grCorralFeed(parseInt(v[0],10)||0,v[1])};
    })(cf[cf2]);
    var cw=b.querySelectorAll('[data-cwalls]');
    for(var cw2=0;cw2<cw.length;cw2++)(function(el){
      el.onclick=function(){grCorralWalls(parseInt(el.getAttribute('data-cwalls'),10)||0)};
    })(cw[cw2]);
    var cm=b.querySelectorAll('[data-cmister]');
    for(var cm2=0;cm2<cm.length;cm2++)(function(el){
      el.onclick=function(){grCorralMister(parseInt(el.getAttribute('data-cmister'),10)||0)};
    })(cm[cm2]);
    var cc2=b.querySelectorAll('[data-ccollect]');
    for(var cc3=0;cc3<cc2.length;cc3++)(function(el){
      el.onclick=function(){grCorralCollect(parseInt(el.getAttribute('data-ccollect'),10)||0)};
    })(cc2[cc3]);
    var pl=b.querySelectorAll('[data-plant]');
    for(var pl2=0;pl2<pl.length;pl2++)(function(el){
      el.onclick=function(){var v=el.getAttribute('data-plant').split(':');grPlant(parseInt(v[0],10)||0,v[1])};
    })(pl[pl2]);
    var wa=b.querySelectorAll('[data-water]');
    for(var wa2=0;wa2<wa.length;wa2++)(function(el){
      el.onclick=function(){grWater(parseInt(el.getAttribute('data-water'),10)||0)};
    })(wa[wa2]);
    var hv=b.querySelectorAll('[data-harvest]');
    for(var hv2=0;hv2<hv.length;hv2++)(function(el){
      el.onclick=function(){grHarvest(parseInt(el.getAttribute('data-harvest'),10)||0)};
    })(hv[hv2]);
    var mc=b.querySelectorAll('[data-mach]');
    for(var mc2=0;mc2<mc.length;mc2++)(function(el){
      el.onclick=function(){grMach(parseInt(el.getAttribute('data-mach'),10)||0)};
    })(mc[mc2]);
    var dg=b.querySelectorAll('[data-dig]');
    for(var dg2=0;dg2<dg.length;dg2++)(function(el){
      el.onclick=function(){grDig(parseInt(el.getAttribute('data-dig'),10)||0)};
    })(dg[dg2]);
    var wg=grEl('grWardenGo');
    if(wg)wg.onclick=function(){grWardenStart()};
    var wd=grEl('grWarden');
    if(wd)wd.onclick=function(){grWardenHit()};
    var hl=grEl('grHeal');
    if(hl)hl.onclick=function(){grHeal()};
    var sp=grEl('grSpare');
    if(sp)sp.onclick=function(){grChoose('spare')};
    var kl=grEl('grKill');
    if(kl)kl.onclick=function(){grChoose('kill')};
    var ag=grEl('grAgain');
    if(ag)ag.onclick=function(){
      try{
        var s=grSave();
        if(Date.now()-(s.choiceAt||0)<24*3600*1000){grNote('not yet. live with it a little longer.');return}
      }catch(e){}
      grEnd=null;grChoice=true;grRender()
    };
  }catch(e){}
}
// fixed-camera 3d diorama: cave, light shaft, drips, floorboards over a pit.
var grRAF=0,grDrops=[],grRipples=[],grSparks=[],grMotes=[],grBubbles=[],grT=0,grTint=0,grBright=0,grLastDrop=0;
function grSceneInit(){
  grDrops=[];grRipples=[];grSparks=[];grMotes=[];grBubbles=[];grT=0;grLastDrop=0;
  for(var i=0;i<46;i++)grMotes.push({x:Math.random(),y:Math.random(),s:Math.random()*1.6+.5,v:Math.random()*.00045+.00015,o:Math.random()*.5+.25,ph:Math.random()*6.28});
  for(var b2=0;b2<26;b2++)grBubbles.push({x:Math.random(),y:Math.random(),s:1+Math.random()*2.4,v:Math.random()*.001+.0006,o:Math.random()*.4+.2});
  try{
    var c=grEl('grCanvas');
    if(c){c.width=c.clientWidth||window.innerWidth||1280;c.height=c.clientHeight||window.innerHeight||800}
  }catch(e){}
}
function grBoardY(H){return Math.floor(H*0.74)}
function grFrame(ts){
  if(!grActive){grRAF=0;return}
  grRAF=requestAnimationFrame(grFrame);
  try{
    var c=grEl('grCanvas');if(!c)return;
    var x=c.getContext('2d');if(!x)return;
    var W=c.width,H=c.height;if(!W||!H)return;
    grT+=1/60;
    var t=grT;
    // cave dark
    var g=x.createLinearGradient(0,0,0,H);
    g.addColorStop(0,'#060b14');g.addColorStop(.55,'#04070d');g.addColorStop(1,'#010203');
    x.fillStyle=g;x.fillRect(0,0,W,H);
    var cx=W/2,boardY=grBoardY(H);
    var isLab=(grRoom==='lab'),isRapids=(grRoom==='dripworks'),isSea=(grRoom==='sea');
    var landY=isSea?Math.floor(H*0.62):(isRapids?Math.floor(H*0.70):boardY);
    // open sky outside the cave (no walls, no ceiling, no shaft)
    if(isSea){
      var sky=x.createLinearGradient(0,0,0,landY);
      sky.addColorStop(0,'#01020a');sky.addColorStop(.7,'#030818');sky.addColorStop(1,'#06101f');
      x.fillStyle=sky;x.fillRect(0,0,W,landY+2);
      for(var sti=0;sti<70;sti++){
        var stx=(sti*173)%W,sty=(sti*97)%Math.floor(H*0.5);
        var sta=0.15+0.35*Math.abs(Math.sin(t*0.6+sti*1.3));
        x.fillStyle='rgba(200,220,255,'+sta.toFixed(3)+')';
        x.fillRect(stx,sty,1.4,1.4);
      }
      var hz=x.createLinearGradient(0,landY-26,0,landY+6);
      hz.addColorStop(0,'rgba(90,160,220,0)');
      hz.addColorStop(1,'rgba(90,160,220,0.14)');
      x.fillStyle=hz;x.fillRect(0,landY-26,W,32);
    } else {
    // rock walls left/right (layered silhouettes)
    x.fillStyle='#0a1220';
    x.beginPath();x.moveTo(0,0);
    for(var wx=0;wx<=H;wx+=40)x.lineTo(30+Math.sin(wx*.013+2)*36+Math.sin(wx*.05)*8,wx);
    x.lineTo(0,H);x.closePath();x.fill();
    x.beginPath();x.moveTo(W,0);
    for(var vx=0;vx<=H;vx+=40)x.lineTo(W-30-Math.sin(vx*.011+4)*36-Math.sin(vx*.045+1)*8,vx);
    x.lineTo(W,H);x.closePath();x.fill();
    x.fillStyle='#070d17';
    x.beginPath();x.moveTo(0,0);
    for(var ux=0;ux<=H;ux+=60)x.lineTo(90+Math.sin(ux*.009)*44,ux);
    x.lineTo(0,H);x.closePath();x.fill();
    x.beginPath();x.moveTo(W,0);
    for(var zx=0;zx<=H;zx+=60)x.lineTo(W-90-Math.sin(zx*.008+3)*44,zx);
    x.lineTo(W,H);x.closePath();x.fill();
    } // end cave walls (sea has sky instead)
    // the pit (under the boards: near-black). not in rapids, sea, or meadow.
    if(!isRapids&&!isSea&&grRoom!=='meadow'){
    x.fillStyle='#000';
    x.fillRect(cx-190,boardY,W-(cx-190)-(W-(cx+190)),H-boardY);
    x.fillRect(0,boardY+34,W,H-boardY-34);
    }
    // rapids + sea water
    if(isRapids||isSea){
      var wy=isRapids?Math.floor(H*0.70):Math.floor(H*0.62);
      var wg2=x.createLinearGradient(0,wy,0,H);
      if(isSea){wg2.addColorStop(0,'#06121f');wg2.addColorStop(.3,'#040b16');wg2.addColorStop(1,'#01040a')}
      else{wg2.addColorStop(0,'#071019');wg2.addColorStop(1,'#020507')}
      x.fillStyle=wg2;x.fillRect(0,wy,W,H-wy);
    }
    // light shaft from above (cave only — the sea is outside).
    // farm runs dim: the grow lamps are the light down there.
    var shaftScale=(isSea||grRoom==='meadow')?0:(grRoom==='farm'?0.45:(isRapids?0:1));
    var flick=(.09+Math.sin(t*1.7)*.015+Math.sin(t*4.3)*.008+(grBright?0.07:0))*shaftScale;
    var shaftH=(isSea||isRapids)?landY:boardY;
    var shaftBase=(isRapids||grRoom==='meadow')?0:0.12;
    var sg=x.createLinearGradient(0,0,0,shaftH);
    sg.addColorStop(0,'rgba(200,230,255,'+(flick+shaftBase)+')');
    sg.addColorStop(.6,'rgba(160,200,240,'+flick+')');
    sg.addColorStop(1,'rgba(140,180,230,0)');
    x.fillStyle=sg;
    x.beginPath();
    x.moveTo(cx-26,0);x.lineTo(cx+26,0);x.lineTo(cx+120,shaftH);x.lineTo(cx-120,shaftH);
    x.closePath();x.fill();
    // opening glow at top (cave only, not sea or dripworks)
    if(!isSea&&!isRapids){
    var og=x.createRadialGradient(cx,0,4,cx,0,90);
    og.addColorStop(0,'rgba(230,244,255,.5)');og.addColorStop(1,'rgba(230,244,255,0)');
    x.fillStyle=og;x.fillRect(cx-90,0,180,90);
    }
    // dripworks: boards overhead (continuity — you walk on them up there).
    // drawn over the shaft: light only gets through the slits.
    if(isRapids){
      var oty=52,oth=34;
      x.fillStyle='#04060a';
      x.fillRect(0,0,W,oty+oth+8);
      var on2=9,obw=(W+40)/on2;
      for(var oi=0;oi<on2;oi++){
        var obx=-20+oi*obw;
        var oshade=54+Math.floor(8*Math.sin(oi*2.9));
        x.fillStyle='rgb('+(oshade+16)+','+(oshade)+','+(oshade-16)+')';
        x.fillRect(obx+2,oty,obw-4,oth);
        x.fillStyle='rgba(0,0,0,0.55)';
        x.fillRect(obx+2,oty+oth-5,obw-4,2);
      }
      x.fillStyle='rgba(20,14,8,0.9)';
      x.fillRect(0,oty-8,W,6);
      x.fillRect(0,oty+oth+2,W,5);
    }
    // dust motes in the shaft (cave only, not sea or dripworks)
    if(!isSea&&!isRapids){
    for(var mi=0;mi<grMotes.length;mi++){
      var m=grMotes[mi];
      m.y-=m.v;if(m.y<0){m.y=1;m.x=Math.random()}
      var mx=cx+(m.x-.5)*200*(0.3+0.7*(1-m.y));
      var my=m.y*boardY;
      var tw=m.o*(0.6+0.4*Math.sin(t*2+m.ph));
      x.fillStyle='rgba(210,230,255,'+tw.toFixed(3)+')';
      x.fillRect(mx,my,m.s,m.s);
    }
    }
    // phosphor glow, cave only (stronger in phosphor room)
    if(!isSea){
    var glow=(grTint>0?0.30:0.16)+Math.sin(t*1.2)*0.02+(grBright?0.08:0);
    var sides=[cx-260,cx+260];
    for(var si=0;si<2;si++){
      var pg=x.createRadialGradient(sides[si],boardY-70,4,sides[si],boardY-70,150);
      pg.addColorStop(0,'rgba(120,200,255,'+glow.toFixed(3)+')');
      pg.addColorStop(1,'rgba(120,200,255,0)');
      x.fillStyle=pg;x.fillRect(sides[si]-150,boardY-220,300,300);
    }
    }
    // lab: warm fabricator glow + rising vat bubbles — BULKED UP
    if(isLab){
      var ag=x.createRadialGradient(W-170,boardY-120,10,W-170,boardY-120,260);
      ag.addColorStop(0,'rgba(255,170,80,'+(0.30+Math.sin(t*2.1)*0.03).toFixed(3)+')');
      ag.addColorStop(1,'rgba(255,170,80,0)');
      x.fillStyle=ag;x.fillRect(W-430,boardY-380,500,500);
      // pipes across the top
      x.fillStyle='rgba(30,24,16,.9)';
      x.fillRect(0,44,W,14);x.fillRect(0,66,W,10);
      x.fillStyle='rgba(255,190,110,.18)';
      x.fillRect(0,44,W,2);x.fillRect(0,66,W,2);
      for(var pi=0;pi<7;pi++){
        var px=(pi*197+40)%W;
        x.fillStyle='rgba(30,24,16,.9)';x.fillRect(px,36,16,48);
        x.fillStyle='rgba(255,190,110,.14)';x.fillRect(px,36,16,2);
      }
      // vat tanks, left
      for(var vi=0;vi<2;vi++){
        var vxp=40+vi*150,vyp=boardY-260;
        x.fillStyle='rgba(16,12,8,.92)';
        x.beginPath();
        if(x.roundRect)x.roundRect(vxp,vyp,110,260,18);else x.rect(vxp,vyp,110,260);
        x.fill();
        x.strokeStyle='rgba(255,190,110,.35)';x.lineWidth=2;x.stroke();
        var vg=x.createLinearGradient(0,vyp,0,vyp+260);
        vg.addColorStop(0,'rgba(120,220,160,0.10)');vg.addColorStop(1,'rgba(120,220,160,0.28)');
        x.fillStyle=vg;
        x.fillRect(vxp+10,vyp+40,90,210);
        for(var vb=0;vb<9;vb++){
          var vphase=((t*0.25+vi*0.4+vb/9)%1);
          var vby=vyp+250-vphase*205,vbx=vxp+18+((vb*37+vi*51)%74);
          x.fillStyle='rgba(150,255,190,'+(0.25*(1-vphase)+0.1).toFixed(3)+')';
          x.beginPath();x.arc(vbx,vby,1.5+vphase*2.6,0,6.283);x.fill();
        }
        x.fillStyle='rgba(255,190,110,.5)';x.font='11px Consolas,monospace';
        x.fillText(vi===0?'VAT A':'VAT B',vxp+30,vyp+22);
      }
      // fabricator: big cabinet, door, vents, blinking light
      var fxp=W-260,fyp=boardY-250,fw=190,fh=250;
      x.fillStyle='rgba(22,16,10,.94)';x.fillRect(fxp,fyp,fw,fh);
      x.strokeStyle='rgba(255,190,110,.4)';x.lineWidth=2;x.strokeRect(fxp,fyp,fw,fh);
      x.strokeStyle='rgba(255,190,110,.22)';x.lineWidth=1;
      x.strokeRect(fxp+14,fyp+40,fw-28,fh-90);
      x.fillStyle='rgba(0,0,0,.55)';
      for(var vn=0;vn<5;vn++)x.fillRect(fxp+24,fyp+96+vn*12,fw-48,5);
      x.fillStyle='rgba(255,190,110,.6)';x.font='11px Consolas,monospace';
      x.fillText('FABRICATOR',fxp+42,fyp+24);
      var blink=(Math.sin(t*4)>0)?0.95:0.15;
      x.fillStyle='rgba(255,80,60,'+blink.toFixed(3)+')';
      x.beginPath();x.arc(fxp+fw-22,fyp+22,5,0,6.283);x.fill();
      x.fillStyle='rgba(255,80,60,'+(blink*0.35).toFixed(3)+')';
      x.beginPath();x.arc(fxp+fw-22,fyp+22,10,0,6.283);x.fill();
      for(var bu=0;bu<grBubbles.length;bu++){
        var bb=grBubbles[bu];
        bb.y-=bb.v;if(bb.y<0.25){bb.y=1;bb.x=Math.random()}
        var bxp=W-230+bb.x*120,byp=boardY-190+bb.y*185;
        x.fillStyle='rgba(255,200,130,'+bb.o.toFixed(3)+')';
        x.beginPath();x.arc(bxp,byp,bb.s,0,6.283);x.fill();
      }
    }
    // floorboards over the pit
    if(!isSea&&!isRapids){
    var bh=Math.max(26,Math.floor(H*0.045));
    var n=9,bw=(W+40)/n;
    for(var bi=0;bi<n;bi++){
      var bx=-20+bi*bw;
      var shade=22+Math.floor(8*Math.sin(bi*3.7));
      var wg=x.createLinearGradient(0,boardY,0,boardY+bh);
      wg.addColorStop(0,'rgb('+(shade+14)+','+(shade+2)+','+(shade-6)+')');
      wg.addColorStop(1,'rgb('+shade+','+(shade-8)+','+(shade-14)+')');
      x.fillStyle=wg;
      x.fillRect(bx+0.5,boardY,bw-1,bh);
      x.fillStyle='rgba(190,220,255,.10)';
      x.fillRect(bx+0.5,boardY,bw-1,2);
      // nails
      x.fillStyle='rgba(0,0,0,.5)';
      x.fillRect(bx+bw/2-1,boardY+4,2,2);
      x.fillRect(bx+bw/2-1,boardY+bh-6,2,2);
    }
    }
    // drips fall from the light, land on boards / rapids / sea.
    // outside (sea) and open sky (meadow): no ceiling, no drips.
    if(grRoom==='meadow'){grDrops.length=0;grSparks.length=0;grRipples.length=0}
    var gap=grHas('rain')?0.14:0.28;
    if(!isSea&&!isRapids&&grRoom!=='meadow'&&t-grLastDrop>gap+Math.random()*0.5){
      grLastDrop=t;
      grDrops.push({x:cx+(Math.random()-.5)*56,y:isRapids?100:0,vy:60+Math.random()*60});
    }
    x.fillStyle='rgba(200,228,255,.75)';
    for(var di=grDrops.length-1;di>=0;di--){
      var d=grDrops[di];
      d.vy+=620/60;d.y+=d.vy/60;
      if(d.y>=landY){
        grDrops.splice(di,1);
        grRipples.push({x:d.x,y:landY+2,r:2,max:16+Math.random()*14,a:.5});
        for(var sp=0;sp<4;sp++)grSparks.push({x:d.x,y:landY,vx:(Math.random()-.5)*90,vy:-40-Math.random()*70,life:.5});
        if(((grHas('heart')?0.05:0)+0.02*grUpLv('up_pressure'))>Math.random()){
          try{var hs=grSave();hs.plorts=(hs.plorts||0)+1;grStore(hs);var q0=grEl('grPlortN');if(q0&&grRoom==='phosphor')q0.textContent=hs.plorts;}catch(e){}
        }
        continue;
      }
      x.fillRect(d.x,d.y,2,7+d.vy*0.012);
    }
    // splash sparks
    for(var qi=grSparks.length-1;qi>=0;qi--){
      var p=grSparks[qi];
      p.life-=1/60;if(p.life<=0){grSparks.splice(qi,1);continue}
      p.vy+=300/60;p.x+=p.vx/60;p.y+=p.vy/60;
      x.fillStyle='rgba(190,220,255,'+(p.life*1.2).toFixed(3)+')';
      x.fillRect(p.x,p.y,1.6,1.6);
    }
    // ripples on the boards
    for(var ri=grRipples.length-1;ri>=0;ri--){
      var r2=grRipples[ri];
      r2.r+=26/60;r2.a-=0.011;
      if(r2.a<=0||r2.r>=r2.max){grRipples.splice(ri,1);continue}
      x.strokeStyle='rgba(170,205,245,'+r2.a.toFixed(3)+')';
      x.lineWidth=1;
      x.beginPath();x.ellipse(r2.x,r2.y,r2.r,r2.r*0.32,0,0,6.283);x.stroke();
    }
    // rapids: fast black water, foam, spray
    if(isRapids){
      var wy0=Math.floor(H*0.70);
      for(var st=0;st<26;st++){
        var sy=wy0+((st*53)%(H-wy0));
        var sx=((st*197+t*260*(1+(st%3)*0.4))% (W+240))-120;
        x.fillStyle='rgba(140,190,240,'+(0.05+(st%4)*0.02).toFixed(3)+')';
        x.fillRect(sx,sy,60+(st%5)*22,1.6);
      }
      for(var fm=0;fm<20;fm++){
        var fx2=((fm*331+t*120)%(W+40))-20,fy2=wy0+((fm*77)%(H-wy0));
        x.fillStyle='rgba(190,220,250,'+(0.10+((fm+t*3)%4)*0.05).toFixed(3)+')';
        x.fillRect(fx2,fy2,2,2);
      }
    }
    // farm: grow lamps (dim) + loud crops. lamps hang, crops glow.
    if(grRoom==='farm'){
      var lampX=[W*0.30,W*0.50,W*0.70];
      for(var li2=0;li2<3;li2++){
        var lx=lampX[li2],ly=H*0.16;
        x.strokeStyle='rgba(20,16,10,.9)';x.lineWidth=3;
        x.beginPath();x.moveTo(lx,0);x.lineTo(lx,ly);x.stroke();
        x.fillStyle='rgba(26,20,12,.95)';
        x.beginPath();
        x.moveTo(lx-26,ly);x.lineTo(lx+26,ly);x.lineTo(lx+40,ly+22);x.lineTo(lx-40,ly+22);
        x.closePath();x.fill();
        x.strokeStyle='rgba(255,190,110,.4)';x.lineWidth=1;x.stroke();
        var cone=x.createLinearGradient(0,ly+22,0,H*0.62);
        cone.addColorStop(0,'rgba(255,180,100,0.20)');
        cone.addColorStop(1,'rgba(255,180,100,0)');
        x.fillStyle=cone;
        x.beginPath();
        x.moveTo(lx-38,ly+22);x.lineTo(lx+38,ly+22);
        x.lineTo(lx+120,H*0.62);x.lineTo(lx-120,H*0.62);
        x.closePath();x.fill();
        var flick2=0.75+0.25*Math.sin(t*3+li2*2.1);
        x.fillStyle='rgba(255,205,140,'+flick2.toFixed(3)+')';
        x.beginPath();x.arc(lx,ly+24,5,0,6.283);x.fill();
        x.fillStyle='rgba(255,190,110,'+(0.25*flick2).toFixed(3)+')';
        x.beginPath();x.arc(lx,ly+24,12,0,6.283);x.fill();
      }
    }
    // meadow: emergency grass. full-width floor rectangle, everything inside it.
    if(grRoom==='meadow'){
      var my=Math.floor(H*0.62);
      x.fillStyle='#0e3a1e';
      x.fillRect(0,my,W,H-my);
      x.fillStyle='rgba(46,140,70,0.4)';
      x.fillRect(0,my,W,10);
      x.fillStyle='rgba(20,70,35,0.6)';
      for(var mrow=0;mrow<3;mrow++){x.fillRect(0,my+34+mrow*22,W,3)}
      for(var gi=0;gi<90;gi++){
        var gx=16+((gi*197)%(W-32)),gh=6+((gi*53)%12);
        var gy=my+12+((gi*89)%(H-my-22));
        var sway=Math.sin(t*2+gi*1.7)*4;
        x.strokeStyle='rgba(90,200,120,'+(0.35+0.25*Math.abs(Math.sin(t+gi))).toFixed(3)+')';
        x.lineWidth=2;
        x.beginPath();x.moveTo(gx,gy);x.quadraticCurveTo(gx+sway,gy-gh/2,gx+sway*1.6,gy-gh);x.stroke();
      }
      for(var fi=0;fi<14;fi++){
        var fx=16+((fi*311)%(W-32)),fy=my+12+((fi*67)%(H-my-20));
        var fc=fi%3===0?'255,255,255':(fi%3===1?'255,190,220':'255,240,180');
        x.fillStyle='rgba('+fc+',0.9)';
        x.beginPath();x.arc(fx,fy,2.6,0,6.283);x.fill();
        x.fillStyle='rgba(90,200,120,0.8)';
        x.fillRect(fx-1,fy+2,2,6);
      }
      // the visitor: waddles on, touches grass, waddles off. ~8s. do not perceive it.
      if(Date.now()-grMeadowSlimeAt<8000){
        var mp=(Date.now()-grMeadowSlimeAt)/8000;
        var mx=-50+(W+100)*mp,mmy=my+24-Math.abs(Math.sin(mp*28))*6;
        var sg2=x.createRadialGradient(mx-8,mmy-10,2,mx,mmy,26);
        sg2.addColorStop(0,'rgba(255,255,255,.85)');sg2.addColorStop(.45,'rgba(150,220,255,.5)');sg2.addColorStop(1,'rgba(90,140,255,0)');
        x.fillStyle=sg2;x.beginPath();x.arc(mx,mmy,26,0,6.283);x.fill();
        x.fillStyle='rgba(220,240,255,.95)';x.fillRect(mx-9,mmy-8,4,5);x.fillRect(mx+5,mmy-8,4,5);
      }
    }
    // farm: glowing crop rows, BULKED (growth stages, color by seed kind)
    if(grRoom==='farm'){
      var plots=grPlots();
      for(var pi2=0;pi2<6;pi2++){
        var pmx=W*(0.14+pi2*0.144),pmy=grBoardY(H)-16;
        var rsc=0.8;
        var pp=plots[pi2];
         var bedBot=grBoardY(H),bedTop=bedBot-46*rsc,bedHW=118*rsc;
        x.fillStyle=pp.own?'rgb(32,25,17)':'rgb(12,12,14)';
        x.fillRect(pmx-bedHW,bedTop,bedHW*2,bedBot-bedTop);
        x.fillStyle=pp.own?'rgb(52,42,28)':'rgb(22,22,26)';
        x.fillRect(pmx-bedHW,bedTop,bedHW*2,4*rsc);
        x.fillStyle='rgba(0,0,0,0.35)';
        for(var fr=0;fr<3;fr++){x.fillRect(pmx-bedHW+10*rsc,bedTop+(12+fr*10)*rsc,bedHW*2-20*rsc,2);}
        if(pp.own&&pp.mach>=1){
          x.fillStyle='rgba(140,180,210,0.9)';
          x.fillRect(pmx-bedHW+6*rsc,bedTop-14*rsc,2.5*rsc,14*rsc);
          x.fillRect(pmx+bedHW-8*rsc,bedTop-14*rsc,2.5*rsc,14*rsc);
          x.fillStyle='rgba(150,210,255,'+(0.35+0.2*Math.sin(grT*3+pi2)).toFixed(3)+')';
          for(var dr=0;dr<3;dr++){var fall=(grT*22+dr*9+pi2*13)%12;x.fillRect(pmx-bedHW+(10+dr*7)*rsc,bedTop-(6+fall)*rsc,2*rsc,2*rsc);x.fillRect(pmx+bedHW-(14-dr*7)*rsc,bedTop-(6+fall)*rsc,2*rsc,2*rsc)}
        }
        if(pp.own&&pp.mach>=2){x.fillStyle='rgba(255,210,120,0.55)';x.fillRect(pmx-bedHW,bedTop,bedHW*2,2.5*rsc)}
        if(pp.own&&pp.seed){
          var sd=GR_SEEDS[pp.seed];
          var col=(sd.kind==='tool')?(pp.seed==='hushroot'?'190,150,255':(pp.seed==='goldcap'?'255,210,120':'150,230,255')):(pp.seed==='glowbloom'?'140,245,205':'150,220,150');
          var gs=Math.max(0.12,pp.growth/100);
          grCropDraw(x,pmx,bedTop+10,rsc*(pp.seed==='plortree'?3:2.1),gs,col,pp.seed);
        }
      }
      // fruits: own pass, always on top of every plant
      for(var pj=0;pj<6;pj++){
        var q=plots[pj];
        if(!q||!q.own||!q.seed||!q.fruits)continue;
        var qd=GR_SEEDS[q.seed];
        if(!qd)continue;
        var qcol=(qd.kind==='tool')?(q.seed==='hushroot'?'190,150,255':(q.seed==='goldcap'?'255,210,120':'150,230,255')):(q.seed==='glowbloom'?'140,245,205':'150,220,150');
        if(q.seed==='dripfruit')qcol='150,220,150';
        var qgs=Math.max(0.12,q.growth/100);
        for(var fj=0;fj<q.fruits.length;fj++){
          var fp=grFruitPos(pj,fj,W,H,q.seed,qgs),fr=q.fruits[fj];
          var fcol=fr.mut==='none'?'255,60,70':GR_FRUIT_COL[fr.mut];
          var frad=(3+fr.w*2.2)*(fr.mut==='glowing'?1.5:1)*(fr.mut==='voidtouched'?1.8:1);
          grFruitDraw(x,fp.x,fp.y,frad,fcol,q.seed);
        }
      }
    }
    if(isSea){
      var wy1=Math.floor(H*0.62);
      for(var sh=0;sh<3;sh++){
        var shx=cx-260+sh*260,shy=wy1+70+sh*36;
        var pulse=0.10+0.05*Math.sin(t*0.9+sh*2.1);
        var shg=x.createRadialGradient(shx,shy,4,shx,shy,200);
        shg.addColorStop(0,'rgba(120,90,220,'+pulse.toFixed(3)+')');
        shg.addColorStop(0.6,'rgba(80,140,220,'+(pulse*0.6).toFixed(3)+')');
        shg.addColorStop(1,'rgba(80,140,220,0)');
        x.fillStyle=shg;x.fillRect(shx-200,shy-140,400,280);
      }
      var bergs=[[0.18,46,0.5],[0.38,70,0.75],[0.62,54,0.6],[0.82,80,0.9]];
      for(var bg2=0;bg2<bergs.length;bg2++){
        var bxp2=bergs[bg2][0]*W,bw2=bergs[bg2][1],bh2=bergs[bg2][2];
        var bob=Math.sin(t*0.7+bg2*1.7)*5;
        var byp2=wy1+2+bob;
        x.fillStyle='rgba(170,205,240,0.42)';
        x.beginPath();
        x.moveTo(bxp2-bw2,byp2);x.lineTo(bxp2-bw2*0.3,byp2-46*bh2-8*bh2*Math.sin(t+bg2));
        x.lineTo(bxp2+bw2*0.25,byp2-30*bh2);x.lineTo(bxp2+bw2,byp2);
        x.closePath();x.fill();
        x.fillStyle='rgba(170,205,240,0.10)';
        x.beginPath();x.ellipse(bxp2,byp2+4,bw2*1.15,7,0,0,6.283);x.fill();
      }
    }
    // vignette
    var vg=x.createRadialGradient(cx,H/2,H*0.3,cx,H/2,H*0.85);
    vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.55)');
    x.fillStyle=vg;x.fillRect(0,0,W,H);
  }catch(e){}
}
function grSceneStart(){grSceneInit();try{if(grRAF)cancelAnimationFrame(grRAF)}catch(e){}grRAF=0;try{grRAF=requestAnimationFrame(grFrame)}catch(e){}}
// grotto ambience: both tracks layered, looped, at slightly different
// rates so the seams never line up twice. short loops stop sounding
// cheap when they can't agree on where the loop is.
var grAmbA=null,grAmbB=null;
function grAmbStart(){
  try{
    try{if(typeof bgm!=='undefined'&&bgm&&bgm.paused)return}catch(e){}
    if(!grAmbA){
      grAmbA=new Audio('deltaruneCliffsAmbienceGrotto.webm');
      grAmbA.loop=true;grAmbA.volume=0.22;grAmbA.playbackRate=0.97;
    }
    if(!grAmbB){
      grAmbB=new Audio('deltaruneANOTHERHIMAmbienceGrotto.webm');
      grAmbB.loop=true;grAmbB.volume=0.18;grAmbB.playbackRate=1.04;
    }
    try{grAmbA.play().catch(function(){})}catch(e){}
    try{grAmbB.play().catch(function(){})}catch(e){}
  }catch(e){}
}
function grAmbStop(){
  try{if(grAmbA)grAmbA.pause()}catch(e){}
  try{if(grAmbB)grAmbB.pause()}catch(e){}
}
function grBuild(){
  grCss();
  grStashUI();
  try{
    var old=grEl('grOverlay');if(old)old.remove();
    var ov=document.createElement('div');ov.id='grOverlay';
    ov.innerHTML='<canvas id="grCanvas"></canvas><div id="grTitle"></div><div id="grBody"></div><div id="grNav"></div>'+
    '<div id="grSideTerm"><div id="grSideHead">tooth terminal · not on any map</div>'+
    '<div id="grTermHist"></div>'+
    '<div id="grTermRow"><span id="grTermPrompt">tooth&gt;</span><input id="grSideInput" autocomplete="off" spellcheck="false"/></div></div>';
    document.body.appendChild(ov);
    grToothWire();
  }catch(e){}
  grRoom='mouth';
  grTint=0;
  grLoreView=null;grChismView=null;
  grSceneStart();
  try{
    var cv0=grEl('grCanvas');
    if(cv0)cv0.onclick=function(ev){
      try{
        if(!grActive||grRoom!=='farm')return;
        var r=cv0.getBoundingClientRect();
        var mx=(ev.clientX-r.left)/r.width*cv0.width,my=(ev.clientY-r.top)/r.height*cv0.height;
        var best=null,bd=36*36;
        var s=grSave(),plots=grPlots(s);
        for(var pi=0;pi<6;pi++){
          var pp=plots[pi];
          if(!pp||!pp.own||!pp.fruits)continue;
          for(var fi=0;fi<pp.fruits.length;fi++){
            var fp=grFruitPos(pi,fi,cv0.width,cv0.height,pp.seed,Math.max(0.12,(pp.growth||0)/100));
            var dd=(fp.x-mx)*(fp.x-mx)+(fp.y-my)*(fp.y-my);
            if(dd<bd){bd=dd;best={pi:pi,fi:fi}}
          }
        }
        if(best)grPickFruit(best.pi,best.fi);
      }catch(e){}
    };
  }catch(e){}
  try{var s0=grSave();s0.seen=s0.seen||[];if(s0.seen.indexOf('mouth')===-1){s0.seen.push('mouth')}if(s0.shop&&s0.shop.hat&&!s0.hats){s0.hats=true;delete s0.shop.hat}grStore(s0)}catch(e){}
  grRender();
  try{
    var hh=grEl('grTermHist');
    if(hh){hh.innerHTML='';for(var hi=0;hi<grTermHist.length;hi++){var dd=document.createElement('div');dd.innerHTML=grTermHist[hi];hh.appendChild(dd)}}
    if(!grTermHist.length)grSideSay('the tooth hums. try: help.');
    grSideHead();
    var fi=grEl('grSideInput');if(fi)fi.focus();
  }catch(e){}
}
// offline catch-up: ticks only run while the grotto is open, so on re-enter
// advance everything by the absence. one payout per system max (no 8h jackpots).
// farm grows, extractors finish their current cycle, market rolls once.
function grOfflineCatchup(){
  if(!grActive)return;
  var s=grSave();
  if(!s.tickAt)return;
  var el=(Date.now()-s.tickAt)/1000;
  if(!(el>5))return;
  el=Math.min(el,8*3600);
  var msg=[];
  if(s.ext instanceof Array){
    for(var i=0;i<3;i++){var site=s.ext[i];    if(site&&!site.ready){site.left-=el;if(site.left<=0){site.left=0;site.ready=true;if(!s.dancedYet){s.dancedYet=true;grAch('gr_firstdance')}msg.push('site '+(i+1)+' finished')}}}
  }
  if(typeof s.priceT==='number'){s.priceT-=el;if(s.priceT<=0){s.priceT=20;var fl=(s.gup&&s.gup.heart)?5:3;s.price=Math.max(fl,Math.min(9,(s.price||5)+Math.floor(Math.random()*5)-2));msg.push('the market moved')}}
  if(s.up&&s.up.net){var nm=((s.valve||'slimes')==='nets')?12:20;s.netT=(s.netT||nm)-el;if(s.netT<=0){s.netT=nm;var ng=1+((s.gup&&s.gup.roots)?1:0)+((s.shop&&s.shop.bucket)?1:0)+((s.shop&&s.shop.net2)?1:0);s.plorts=(s.plorts||0)+ng;msg.push('net caught +'+ng)}}
  if(s.gadgets&&s.gadgets.plunger){s.plungT=(s.plungT||10)-el;if(s.plungT<=0){s.plungT=10;s.plorts=(s.plorts||0)+1;msg.push('plunger clicked once')}}
  if(s.mix&&s.mix.puddle){s.pudT=(s.pudT||30)-el;if(s.pudT<=0){s.pudT=30;s.plorts=(s.plorts||0)+1;msg.push('the puddle sweated once')}}
  if(s.gadgets&&s.gadgets.drone){s.droneT=(s.droneT||30)-el;if(s.droneT<=0){s.droneT=30;s.fruitInv=s.fruitInv||[];var dp=grPlots(s);for(var di=0;di<dp.length;di++){if(dp[di].fruits&&dp[di].fruits.length&&s.fruitInv.length<60){var df=dp[di].fruits.shift();s.fruitInv.push({seed:dp[di].seed,w:df.w,mut:df.mut});msg.push('drone picked one');break}}}}
  try{
    var plots=grPlots(s),grew=false;
    var vFarm=false;try{vFarm=(s.valve||'slimes')==='farm'}catch(e){}
    var moistFloor=(s.gadgets&&s.gadgets.probe)?20:0;
    for(var pi2=0;pi2<plots.length;pi2++){
      var pp=plots[pi2];
      if(!pp.own||!pp.seed)continue;
      pp.moist=Math.max(moistFloor,Math.min(100,(pp.moist||0)+el*(-0.5+(pp.mach>=1?1.5:0)+(vFarm?2:0))));
      if(pp.moist>0&&pp.growth<100){
        pp.growth=Math.min(100,pp.growth+el*0.55*(pp.mach>=2?2:1)*((s.gadgets&&s.gadgets.lamp)?1.5:1));
        grew=true;
      }
    }
    if(grew)msg.push('crops grew');
  }catch(e){}
  s.tickAt=Date.now();grStore(s);
  if(msg.length)grNote('while you were gone ('+Math.round(el)+'s): '+msg.join(' · ')+'.');
}
function grEnter(force){
  if(grActive)return true;
  if(force&&!grIsAdmin())force=false;
  if(!grAllowed()&&!force){
    var p=grRequired();
    if(!p){grSay('grotto: the cave cannot count your distractions. (ach system missing?)');return false}
    var names=[];
    for(var mi=0;mi<p.missing.length;mi++)names.push(grNeedName(p.missing[mi]));
    grSay('grotto: the cave is not here.');
    grSay('grotto: '+p.got+'/'+p.total+' proven. still missing: '+names.join(' · ')+'.');
    return false;
  }
  grActive=true;
  try{window._grActive=true}catch(e){}
  try{grBuild()}catch(e){grActive=false;try{window._grActive=false}catch(e){}return false}
  // refresh-proof ending: the choice survives reloads until the 24h re-face window.
  try{var es=grSave();if(!grEnd&&es.ending&&(es.ending==='spare'||es.ending==='kill')&&(Date.now()-(es.choiceAt||0)<24*3600*1000))grEnd=es.ending}catch(e){}
  try{grOfflineCatchup()}catch(e){}
  grAmbStart();
  // duck the void drone: pause main bgm, remember state for exit.
  // (ambience starts first: it reads bgm.paused to respect music-off.)
  try{
    if(typeof bgm!=='undefined'&&bgm){
      window._grWasBgm=!bgm.paused;
      bgm.pause();
    }else window._grWasBgm=false;
  }catch(e){window._grWasBgm=false}
  grFarSchedule();
  try{if(grTickT)clearInterval(grTickT)}catch(e){}
  grTickT=setInterval(function(){try{grTick()}catch(e){}},1000);
  return true;
}
function grExit(){
  if(!grActive)return;
  grActive=false;
  try{window._grActive=false}catch(e){}
  try{grHelpClose()}catch(e){}
  try{grPetMenuClose()}catch(e){}
  try{var pvo=grEl('grOverlay');if(pvo)pvo.classList.remove('grPerf')}catch(e){}
  try{document.body.classList.remove('grPerfOn')}catch(e){}
  grTreeUp=false;
  grAmbStop();
  try{
    if(typeof bgm!=='undefined'&&bgm){
      if(window._grWasBgm){var bp=bgm.play();if(bp&&bp.catch)bp.catch(function(){})}
    }
    window._grWasBgm=false;
  }catch(e){}
  try{var gsk=grEl('grSkillTree');if(gsk)gsk.remove()}catch(e){}
  try{if(grRAF)cancelAnimationFrame(grRAF)}catch(e){}
  grRAF=0;
  try{if(grFarT)clearTimeout(grFarT)}catch(e){}
  grFarT=0;
  try{if(grTickT)clearInterval(grTickT)}catch(e){}
  grTickT=0;
  try{if(grSeaT)clearTimeout(grSeaT)}catch(e){}
  grSeaT=0;
  grFightEnd();
  try{grKillCreditsClose()}catch(e){}
  try{var ov=grEl('grOverlay');if(ov)ov.remove()}catch(e){}
  try{var cs=grEl('grCSS');if(cs)cs.remove()}catch(e){}
  try{var gf=grEl('grFlash');if(gf)gf.remove()}catch(e){}
  try{var pops=document.querySelectorAll('.grPop');for(var pi=0;pi<pops.length;pi++){if(pops[pi].parentNode)pops[pi].parentNode.removeChild(pops[pi])}}catch(e){}
  grRestoreUI();
  grSay('you climb out. the cave inhales behind you.');
}
if(typeof document!=='undefined'){
  document.addEventListener('keydown',function(e){
    try{if(!grActive)return;if(e.key==='Escape'){if(document.getElementById('grCredits')){grKillCreditsClose()}else if(grTreeUp){grSkillClose()}else grExit()}}catch(err){}
  });
}
window.grEnter=grEnter;
window.grExit=grExit;
window.grAllowed=grAllowed;
window.grProgressFrac=grProgressFrac;
window.grProgress=grRequired;
window.grFarSay=grFarSay;
// VOID PET: a slime Chism sells you. follows you across the whole site,
// not just the grotto. saves. wiggles. judges a little.
var grPetMX=0,grPetMY=0,grPetX=0,grPetY=0,grPetRAF=0,grPetHop=0,grPetTick=0;
var grPetDrag=false,grPetDownX=0,grPetDownY=0,grPetDownT=0,grPetLastMove=0,grPetWakeMadUntil=0,grPetWasSleep=false,grPetForceSleep=false,grPetMenuT=0,grPetTX=0,grPetTY=0,grPetFX=0,grPetFY=0,grPetT0=0,grPetDur=3000,grPetGoAt=0,grPetGrabDX=0,grPetGrabDY=0,grPetAsleep=false;
var GR_PET_LINES=['it wiggles.','it blinks. all of it blinks.','it is behind you. it is always behind you.','it hums the vault song. wrong notes. all of them.','it stares at the cube. the cube stares back. nobody wins.','it coughs.','it remembers the ranch. it prefers you.'];
function grPetOwned(){try{var s=grSave();return !!(s.petslime&&!s.petDead)}catch(e){return false}}
function grPetCss(){
  try{
    if(document.getElementById('grPetCSS'))return;
    var s=document.createElement('style');s.id='grPetCSS';
    s.textContent='#grPet{position:fixed;width:88px;height:76px;left:0;top:0;z-index:4000;pointer-events:auto;cursor:pointer;border-radius:50% 50% 48% 48%;background:radial-gradient(circle at 35% 30%,rgba(255,255,255,.95),rgba(180,230,255,.6) 40%,rgba(110,160,255,.4) 70%,rgba(110,160,255,.12));box-shadow:0 0 30px 10px rgba(150,200,255,.55);animation:grPetBob 3s ease-in-out infinite}'+
    '#grPet .grWing{position:absolute;top:10px;width:30px;height:22px;background:radial-gradient(ellipse at center,rgba(255,255,255,.95),rgba(170,225,255,.45) 70%,transparent);border-radius:50%;opacity:.95;pointer-events:none;animation:grPetFlap .55s ease-in-out infinite}'+
    '#grPet .grWing.L{left:-22px;transform-origin:right center}'+
    '#grPet .grWing.R{right:-22px;transform-origin:left center;animation-delay:-.27s}'+
    '@keyframes grPetFlap{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.3)}}'+
    'body.grPerfOn #grPet,body.grPerfOn #grPet *{animation:none!important}'+
    '#grPet:after{content:"..";position:absolute;top:15px;left:0;right:0;text-align:center;color:#dff;font-size:18px;letter-spacing:7px}'+
    '#grPet.grPetHat:after{content:"^..^";font-size:15px}'+
    '#grPet.grPetGold:after{content:"^..^";font-size:15px;color:#ffd770;text-shadow:0 0 6px rgba(255,200,90,.9)}'+
    '#grPet.grPetSleep:after{content:"-.-";font-size:15px;color:#cfe2ff}'+
    '#grPet.grPetSleep:before{content:"z";position:absolute;top:-18px;right:6px;color:#9fd4ff;font-size:14px;animation:grPetZ 2.4s ease-in-out infinite}'+
    '@keyframes grPetZ{0%,100%{transform:translateY(0);opacity:.55}50%{transform:translateY(-9px);opacity:.95}}'+
    '#grPet.grPetSleep{animation:grPetBob 4s ease-in-out infinite,grPetDream 4s ease-in-out infinite}'+
    '@keyframes grPetDream{0%,100%{box-shadow:0 0 22px 6px rgba(120,180,255,.35)}50%{box-shadow:0 0 30px 10px rgba(120,180,255,.5)}}'+
    '#grPet.grPetMad:after{content:"><";font-size:17px;color:#ff8291}'+
    '#grPet.grPetMad{box-shadow:0 0 22px 8px rgba(255,70,95,.55)}'+
    '#grPetMenu{position:fixed;z-index:4100;background:rgba(4,12,18,.96);border:1px solid rgba(43,74,104,.7);border-radius:10px;padding:8px 10px;font-family:Consolas,monospace;font-size:12px;color:#b9d2ea;min-width:170px}'+
    '#grPetMenu button{display:block;width:100%;margin:3px 0;background:#0e1a2b;border:1px solid #2b4a68;color:#b9d2ea;font-family:Consolas,monospace;font-size:11px;padding:4px 8px;cursor:pointer;border-radius:6px}'+
    '#grPetMenu button:hover{background:#16283f}'+
    '@keyframes grPetBob{0%,100%{margin-top:0}50%{margin-top:-7px}}';
    document.head.appendChild(s);
  }catch(e){}
}
// PET MURDER: only in murder mode, only by hand. it stays dead until
// Chism sells you another one. he finds the whole thing very funny.
function grPetKill(){
  try{
    if(!grPetOwned())return;
    var s=grSave();
    s.petDead=true;s.petKills=(s.petKills||0)+1;
    s.plorts=(s.plorts||0)+5;grStore(s);
    try{grPetSync()}catch(e){}
    grPop(50,40,'+5 plorts','#ff6a6a');
    grNote('you killed your pet slime. you monster. (+5 plorts. it was fatter than it looked. murders: '+s.petKills+'. Chism sells replacements.)');
    try{grSideHead()}catch(e){}
  }catch(e){}
}
function grPetPat(ev){  try{if(ev){ev.stopPropagation();ev.preventDefault()}}catch(e){}
  try{
    if(!grPetOwned())return;
    var s=grSave();s.petpats=(s.petpats||0)+1;
    var bonus='';
    if(s.petpats%10===0){s.plorts=(s.plorts||0)+1;bonus=' it coughed up a plort. do not ask where it keeps them.'}
    grStore(s);
    grPetHop=1;
    var line=GR_PET_LINES[Math.floor(Math.random()*GR_PET_LINES.length)];
    try{if(typeof cubePrint==='function')cubePrint('pet slime: '+line+bonus)}catch(e){}
    try{grSideHead()}catch(e){}
  }catch(e){}
}
function grPetSync(){
  try{
    var el=document.getElementById('grPet');if(!el)return;
    el.style.display=grPetOwned()?'block':'none';
  }catch(e){}
}
function grPetMenuClose(){
  try{var m=document.getElementById('grPetMenu');if(m)m.style.display='none'}catch(e){}
  try{if(grPetMenuT){clearTimeout(grPetMenuT);grPetMenuT=0}}catch(e){}
}
function grPetMenu(e){
  try{
    if(!grPetOwned())return;
    var m=document.getElementById('grPetMenu');
    if(!m){
      m=document.createElement('div');m.id='grPetMenu';m.style.display='none';
      document.body.appendChild(m);
    }
    var s=grSave();
    var sleeping=false;
    try{var pel=document.getElementById('grPet');sleeping=!!(pel&&pel.classList.contains('grPetSleep'))}catch(err){}
    var h='<div style="color:#5f7d99;font-size:11px;margin-bottom:4px">pet slime · pats: '+(s.petpats||0)+'</div>';
    h+='<button data-petm="sleep">'+((typeof grPetAsleep!=='undefined'&&grPetAsleep)||grPetForceSleep?'wake up':'go to sleep')+'</button>';
    h+='<button data-petm="pat">pat it</button>';
    h+='<button data-petm="close">close</button>';
    m.innerHTML=h;
    var mx=0,my=0;
    try{mx=e.clientX;my=e.clientY}catch(err){try{mx=grPetMX;my=grPetMY}catch(err2){}}
    try{m.style.left=Math.min(mx,window.innerWidth-200)+'px';m.style.top=Math.min(my,window.innerHeight-160)+'px'}catch(err){}
    m.style.display='block';
    var btns=m.querySelectorAll('[data-petm]');
    for(var i=0;i<btns.length;i++)(function(btn){
      btn.onclick=function(ev){
        try{if(ev)ev.stopPropagation()}catch(err){}
        var k='';try{k=btn.getAttribute('data-petm')}catch(err){}
        if(k==='sleep'){
          grPetForceSleep=!grPetForceSleep;
          if(!grPetForceSleep)grPetLastMove=Date.now();
        }
        else if(k==='pat')grPetPat(ev);
        grPetMenuClose();
        try{grPetSync()}catch(err){}
      };
    })(btns[i]);
    try{if(grPetMenuT)clearTimeout(grPetMenuT)}catch(err){}
    try{grPetMenuT=setTimeout(function(){grPetMenuClose()},10000)}catch(err){}
  }catch(e){}
}
function grPetFrame(){
  try{
    var el=document.getElementById('grPet');
    if(el){
      if(!grPetOwned()){el.style.display='none'}
      else{
        el.style.display='block';
        if(grPetDrag){
          var mw2=640,mh2=400;
          try{mw2=window.innerWidth-140;mh2=window.innerHeight-130}catch(e){}
          grPetX=Math.max(-10,Math.min(mw2,grPetMX-grPetGrabDX));grPetY=Math.max(-10,Math.min(mh2,grPetMY-grPetGrabDY));
          if(grPetHop<0.55)grPetHop=0.55;
          if(!el.classList.contains('grPetMad'))el.classList.add('grPetMad');
        }else if(grPetForceSleep||Date.now()-grPetLastMove>60000){
          grPetWasSleep=true;
          if(el.classList.contains('grPetMad'))el.classList.remove('grPetMad');
          var cx=0,cy=0;
          try{cx=window.innerWidth-140;cy=window.innerHeight-130}catch(e){}
          var cdx=cx-grPetX,cdy=cy-grPetY,cdd=Math.sqrt(cdx*cdx+cdy*cdy);
          if(cdd>14){
            grPetAsleep=false;
            if(el.classList.contains('grPetSleep'))el.classList.remove('grPetSleep');
            grPetX+=(cx-grPetX)*0.03;grPetY+=(cy-grPetY)*0.03;
          }else{
            grPetAsleep=true;
            if(!el.classList.contains('grPetSleep'))el.classList.add('grPetSleep');
          }
        }else{
          grPetAsleep=false;
          if(el.classList.contains('grPetSleep'))el.classList.remove('grPetSleep');
          if(grPetWasSleep){grPetWasSleep=false;grPetWakeMadUntil=Date.now()+10000}
          if(Date.now()<grPetWakeMadUntil){if(!el.classList.contains('grPetMad'))el.classList.add('grPetMad')}
          else if(el.classList.contains('grPetMad'))el.classList.remove('grPetMad');
          var wnow=Date.now();
          if(wnow>=grPetGoAt){
            var mw=640,mh=400;
            try{mw=window.innerWidth-140;mh=window.innerHeight-130}catch(e){}
            grPetFX=grPetX;grPetFY=grPetY;
            grPetTX=Math.max(20,Math.min(mw,grPetX+(Math.random()-0.5)*480));
            grPetTY=Math.max(20,Math.min(mh,grPetY+(Math.random()-0.5)*360));
            grPetT0=wnow;grPetDur=2500+Math.random()*2500;
            grPetGoAt=wnow+grPetDur+800+Math.random()*1200;
          }
          var wp=Math.max(0,Math.min(1,(wnow-grPetT0)/grPetDur));
          var we=wp*wp*(3-2*wp);
          grPetX=grPetFX+(grPetTX-grPetFX)*we;grPetY=grPetFY+(grPetTY-grPetFY)*we;
        }
        if(++grPetTick>=60){
          grPetTick=0;
          try{
            var ps=grSave(),gold=!!ps.goldHat,hat=!!ps.hats;
            if(gold){el.classList.add('grPetGold');el.classList.remove('grPetHat')}
            else if(hat){el.classList.add('grPetHat');el.classList.remove('grPetGold')}
            else{el.classList.remove('grPetHat');el.classList.remove('grPetGold')}
          }catch(e){}
        }
        var hop=0;
        if(grPetHop>0){grPetHop-=0.08;hop=-Math.sin(Math.min(1,grPetHop)*3.1416)*16}
        var shx=0;
        try{if(el.classList.contains('grPetMad'))shx=Math.sin(Date.now()/40)*3}catch(e){}
        el.style.transform='translate('+(grPetX+40+shx)+'px,'+(grPetY+44+hop)+'px)';
      }
    }
  }catch(e){}
  try{grPetRAF=requestAnimationFrame(grPetFrame)}catch(e){}
}
function grPetInit(){
  try{
    grPetCss();
    var old=document.getElementById('grPet');if(old)old.remove();
    try{grPetMX=window.innerWidth/2;grPetMY=window.innerHeight/2;grPetX=grPetMX;grPetY=grPetMY;grPetTX=grPetX;grPetTY=grPetY;grPetFX=grPetX;grPetFY=grPetY;grPetT0=Date.now();grPetDur=3000;grPetGoAt=Date.now()+1000}catch(e){}
    var el=document.createElement('div');el.id='grPet';el.style.display='none';
    el.title='pet slime. drag it. click to pat.';
    try{el.innerHTML='<i class="grWing L"></i><i class="grWing R"></i>'}catch(e){}
    document.body.appendChild(el);
    el.onpointerdown=function(e){
      try{
        grPetDrag=true;
        try{grPetDownX=e.clientX;grPetDownY=e.clientY}catch(err){}
        try{grPetGrabDX=e.clientX-grPetX;grPetGrabDY=e.clientY-grPetY}catch(err){grPetGrabDX=40;grPetGrabDY=44}
        grPetDownT=Date.now();grPetLastMove=Date.now();
        try{el.setPointerCapture(e.pointerId)}catch(err){}
        try{if(e)e.stopPropagation()}catch(err){}
      }catch(err){}
    };
    el.onpointerup=function(e){
      try{
        grPetDrag=false;
        try{grPetGoAt=Date.now()}catch(err){}
        var dx=0,dy=0;
        try{dx=e.clientX-grPetDownX;dy=e.clientY-grPetDownY}catch(err){}
        if(Math.sqrt(dx*dx+dy*dy)<8&&Date.now()-grPetDownT<600){
          var murder=false;
          try{murder=!!grSave().murder}catch(err){}
          if(murder)grPetKill();
          else grPetPat(e);
        }
        try{if(e)e.stopPropagation()}catch(err){}
      }catch(err){}
    };
    el.onclick=function(e){
      try{if(e)e.stopPropagation()}catch(err){}
    };
    el.oncontextmenu=function(e){
      try{if(e){e.stopPropagation();e.preventDefault()}}catch(err){}
      grPetMenu(e);
    };
    try{document.addEventListener('mousemove',function(e){try{grPetMX=e.clientX;grPetMY=e.clientY;grPetLastMove=Date.now()}catch(err){}})}catch(e){}
    try{grPetLastMove=Date.now()}catch(e){}
    try{if(grPetRAF)cancelAnimationFrame(grPetRAF)}catch(e){}grPetRAF=0;
    grPetSync();
    try{grPetRAF=requestAnimationFrame(grPetFrame)}catch(e){}
  }catch(e){}
}
try{grPetInit()}catch(e){}
window.grDbg=function(){try{return {active:grActive,room:grRoom,allowed:grAllowed(),ambA:grAmbA?{paused:grAmbA.paused,rate:grAmbA.playbackRate}:null,ambB:grAmbB?{paused:grAmbB.paused,rate:grAmbB.playbackRate}:null}}catch(e){return {err:String(e)}}};
})();
