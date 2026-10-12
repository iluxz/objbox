// cube-ch18.js - CHAPTER 18 HELL (troll update).
// shell + chapter yanked from pre-condemnation commit 5764235. era-accurate.
// ONE LINE ACTIVATES IT:
var CH18_HELL=true;
// false = dormant, game boots normal. true = boot fails into pre-condemnation ch18 on loop.
// push with true, watch reactions, flip back to false. code stays for future redesigns.
(function(){
if(!CH18_HELL)return;
// hell keeps no records and grants no progress: shadow the save system.
var ngSave=function(){};
var ngLoad=function(){return {}};
var ngDoorPh=1,ngDoorFragI=0,ngDoorFragOK=0,ngDoorWrong=0,ngDoorCards=[],ngDoorSel=-1,ngDoorTrash=[],ngDoorSortOK=0;
var ngDoorQueue=[];
var ngDoorStrikes=0;
var ngDoorDial=0,ngDoorDialIn='',ngDoorCode='',ngDoorFeed='';
var ngDoorTalkI=0,ngDoorTalkOK=0,ngDoorRule=0,ngDoorOrd=null;
var ngDoorFinI=0,ngDoorTmrIv=null,ngDoorTmrT=null,ngDoorSayIv=null,ngDoorFinCards=[],ngDoorCodeIn='';
var ngDoorDecoder={};
var ngDoorRules=['HOUSE RULE: HONEST','HOUSE RULE: OPPOSITE','HOUSE RULE: OBJ VOICE'];
var ngDoorRuleTxt=['answer with the TRUE statement.','answer with the FALSE statement.','answer the way OBJ would say it.'];
var ngDoorRoast=['no. the receipt printer is judging you. read it again.','wrong. truth-ink does not lie. you do. try again.','nope. that answer is from a different game.','wrong. jbo could get this. jbo is not smart. think about that.','the void refunds wrong answers in SILENCE. try again.'];
var ngDoorFrags=[
{tag:'STATIC',ch:11,card:'you tuned a band until it was rude',q:'STATIC: what tightened every round?',o:['the tolerance band','the screen borders','the music tempo','the noose of my patience'],a:0,out:'4',hit:'correct. the band shrank until it was rude.'},
{tag:'WRONG ADDRESS',ch:12,card:'the fake clock lied by five hours',q:'WRONG ADDRESS: the fake terminal clock was off by...',o:['+5 hours','+15 minutes','exactly nothing','a whole tuesday'],a:0,out:'5',hit:'+5. your clock does not lie. that one did.'},
{tag:'BLACKOUT',ch:13,card:'light first, then the door',q:'BLACKOUT: the only safe order was...',o:['bulb, fuse, exit','fuse, bulb, exit','exit, fuse, bulb','fuse, exit, bulb'],a:1,out:'1',hit:'fuse, bulb, exit. light before stairs. manners.'},
{tag:'SIGNAL LOST',ch:14,card:'the core talked while obj napped',q:'SIGNAL LOST: why did the core lead?',o:['obj was offline','obj quit','the core won an election','there was a coin flip'],a:0,out:'8',hit:'obj was offline. the core was POLITE about it. hate that.'},
{tag:'INTERLOPER',ch:15,card:'it read your visits out loud',q:'INTERLOPER: it read which facts from your SAVE?',o:['visits and finale choice','browser history','your mouse sensitivity','your darkest wish'],a:0,out:'3',hit:'visits and finale. it knows. it always knows.'},
{tag:'ECHO',ch:16,card:'two lines, one verdict',q:'ECHO: when BOTH lines were his, what did you press?',o:['the verdict buttons','a coin flip','the hint button','obj, verbally'],a:0,out:'6',hit:'BOTH ARE HIS. the buttons worked. i am not happy about that.'},
{tag:'JBO',ch:17,card:'needle in green, jbo in the way',q:'JBO VS THE KNOCKING: what had to land in the green?',o:['the needle','jbo\'s ego','the volume knob','the knocking itself'],a:0,out:'2',hit:'the needle. jbo landed nothing. jbo only yelled.'},
{tag:'UNVERIFIED',ch:99,fake:true,card:'UNVERIFIED - breakfast of a not-real man',q:'??? : what did the wrong obj eat for breakfast?',o:['nothing, he is not real','a pixel omelette','toast with spite','the concept of lunch'],a:0,out:'0',hit:'UNVERIFIED receipt printed. the void cannot verify a fiction.'},
{tag:'UNVERIFIED',ch:99,fake:true,card:'UNVERIFIED - volume, not colour',q:'??? : what colour was jbo\'s screaming?',o:['orange','loud','chartreuse','the green window'],a:1,out:'0',hit:'UNVERIFIED receipt printed. screaming has no colour. it has VOLUME.'}
];
var ngDoorTalk=[
{q:'ECHO had how many rounds on normal?',o:['10 rounds','6 rounds','ten too many. i counted in sighs.']},
{q:'what tightened every round in STATIC?',o:['the tolerance band','the music tempo','the tolerance. and my blood pressure.']},
{q:'BLACKOUT required which order?',o:['fuse, bulb, exit','bulb, fuse, exit','light first. i would have left FIRST.']},
{q:'which chapter did the core actually lead?',o:['SIGNAL LOST','INTERLOPER','nothing. i could have led both. (i could not.)']},
{q:'INTERLOPER read your...',o:['visits and finale choice','your browser history','your secrets. (you have none. boring.)']},
{q:'how many verdict options did ECHO show?',o:['two: BOTH or NEITHER','four, plus a shrug','two. i wanted zero: both were HIS.']},
{q:'what did you land in chapter 17?',o:['the needle in the green','the door in its frame','the needle. jbo landed yelling.']},
{q:'strikes before ECHO restarted you?',o:['three','five','three. generous. i wanted zero tolerance.']},
{q:'the fake clock in WRONG ADDRESS was off by',o:['5 hours','15 minutes','five hours. criminals use better lies.']},
{q:'how many decoys sat in the BLACKOUT dark?',o:['three','two','three. the grue was asleep. adorable AND a decoy.']},
{q:'chapter 16 charged +50 points as a...',o:['cover fee','refund','a COVER FEE. for my emotional damage.']},
{q:'what opened chapter 18?',o:['the combination lock','jbo shoving it','me. i opened it. say thank you.']}
];
var ngDoorDials=[{c:'STATIC + BLACKOUT',v:5},{c:'SIGNAL LOST - STATIC',v:4},{c:'INTERLOPER + ECHO',v:9},{c:'WRONG ADDRESS x2 - INTERLOPER',v:7,hard:true}];
function ngDoorBuildQueue(){
ngDoorQueue=[];
for(var i=0;i<ngDoorFrags.length;i++){var f=ngDoorFrags[i];if(f.fake&&!ngHard)continue;ngDoorQueue.push(f)}
}
function ngDoorStopAll(){
if(ngDoorTmrIv){try{clearInterval(ngDoorTmrIv)}catch(e){}ngDoorTmrIv=null}
if(ngDoorTmrT){try{clearTimeout(ngDoorTmrT)}catch(e){}ngDoorTmrT=null}
if(ngDoorSayIv){try{clearInterval(ngDoorSayIv)}catch(e){}ngDoorSayIv=null}
}
function ngDoorSay(txt,cb){
var el=document.getElementById('ngDoorVoice');if(!el){if(cb)cb();return}
el.textContent='';var i=0;
if(ngDoorSayIv){try{clearInterval(ngDoorSayIv)}catch(e){}ngDoorSayIv=null}
ngDoorSayIv=setInterval(function(){
if(!ngActive||ngChDone){clearInterval(ngDoorSayIv);ngDoorSayIv=null;return}
i++;el.textContent=String(txt).slice(0,i);
if(i>=String(txt).length){clearInterval(ngDoorSayIv);ngDoorSayIv=null;if(cb)cb()}
},26);
}
function ngDoorSave(){try{ngSave({p18:{ph:ngDoorPh,dec:ngDoorDecoder,fragOK:ngDoorFragOK,wrong:ngDoorWrong,talkOK:ngDoorTalkOK}})}catch(e){}}
function ngDoorHud(){
var h=document.getElementById('ngDoorProg');if(!h)return;
var t='PHASE '+ngDoorPh+'/5 \u00b7 ';
if(ngDoorPh===1)t+='RECEIPTS '+ngDoorFragOK+'/'+(ngHard?9:7)+' \u00b7 strikes '+ngDoorStrikes+'/'+ngDoorStrikeMax();
else if(ngDoorPh===2)t+='SORT (misplaced '+ngDoorSortOK+')';
else if(ngDoorPh===3)t+='DIAL '+(ngDoorDial+1)+'/'+(ngHard?4:3)+(ngDoorCode?' \u00b7 code so far: '+ngDoorCode.split('').join(' '):'');
else if(ngDoorPh===4)t+='ANSWERS '+ngDoorTalkOK+'/12 \u00b7 '+ngDoorRules[ngDoorRule].replace('HOUSE RULE: ','')+' \u00b7 strikes '+ngDoorStrikes+'/'+ngDoorStrikeMax();
else t+='FINAL CHECK '+(ngDoorFinI+1)+'/4';
h.textContent=t;
}
function ngDoorBridge(objLine,doorLine,ph){
if(objLine)ngSay(objLine);
ngAfterSpeech(function(){
if(!ngActive||ngChDone)return;
ngDoorSay(doorLine||'',function(){if(ngActive&&!ngChDone&&ph)ngDoorGo(ph)});
},600);
}
function ngDoorGo(ph){
ngDoorStopAll();
ngDoorPh=ph;ngDoorSel=-1;ngDoorFeed='';ngDoorDialIn='';ngDoorOrd=null;ngDoorCodeIn='';
if(ph===2){
if(!ngDoorCards.length){
if(!ngDoorQueue.length)ngDoorBuildQueue();
ngDoorCards=[];
for(var i=0;i<ngDoorQueue.length;i++){var f=ngDoorQueue[i];ngDoorCards.push({tag:f.tag,ch:f.ch,unv:!!f.fake,text:f.card})}
for(var k=ngDoorCards.length-1;k>0;k--){var j=Math.floor(Math.random()*(k+1));var t=ngDoorCards[k];ngDoorCards[k]=ngDoorCards[j];ngDoorCards[j]=t}
}
}
if(ph===3){ngDoorDial=0;ngDoorCode=''}
if(ph===4){ngDoorTalkI=0;ngDoorTalkOK=0;ngDoorRule=0}
if(ph===5){ngDoorFinI=0;ngDoorCode='';for(var i=0;i<ngDoorDialCount();i++)ngDoorCode+=ngDoorDials[i].v}
ngDoorSave();
ngDoorRender();
}
function ngDoorRender(){
ngDoorHud();
if(ngDoorPh===1)ngDoorPh1();
else if(ngDoorPh===2)ngDoorPh2();
else if(ngDoorPh===3)ngDoorPh3();
else if(ngDoorPh===4)ngDoorPh4();
else if(ngDoorPh===5)ngDoorPh5();
}
function ngDoorPh1(){
var m=document.getElementById('ngDoorMain');if(!m)return;ngDoorHud();
if(!ngDoorQueue.length)ngDoorBuildQueue();
if(ngDoorFragI>=ngDoorQueue.length){ngDoorBridge(ngDoorQueue.length>7?'all receipts printed. some of them smell fake.':'all receipts printed. suspiciously honest today.','receipts. now SORT them. chronologically. i will watch.',2);return}
var f=ngDoorQueue[ngDoorFragI];
var h='<div style="color:#c8a0d0;font-family:Georgia,serif;font-size:14px;letter-spacing:2px;margin:12px 0 6px;text-align:center">RECEIPT '+(ngDoorFragI+1)+'/'+ngDoorFrags.length+' \u00b7 '+f.tag+'</div>';
h+='<div style="color:#d8a05a;font-family:Consolas,monospace;font-size:11px;text-align:center;margin-bottom:2px">'+f.card+'</div>';
h+='<div style="color:#9fb2c5;font-family:Consolas,monospace;font-size:13px;text-align:center;margin:8px 0 14px">'+f.q+'</div>';
for(var i=0;i<f.o.length;i++)h+='<button class="ngtopt" data-i="'+i+'" style="display:block;width:74%;margin:6px auto">'+f.o[i]+'</button>';
m.innerHTML=h;
var bs=m.getElementsByTagName('button');
for(var j=0;j<bs.length;j++)(function(b){b.onclick=function(){ngDoorPick(parseInt(b.getAttribute('data-i'),10))}})(bs[j]);
}
function ngDoorPick(i){
if(!ngActive||ngChDone)return;
var f=ngDoorQueue[ngDoorFragI];
if(i===f.a){
try{ngSfx('coin')}catch(e){}
ngDoorDecoder[f.tag]=f.out;
if(!f.fake)ngDoorFragOK++;
ngSay(f.hit);
ngDoorFragI++;
setTimeout(function(){if(ngActive&&!ngChDone)ngDoorPh1()},900);
}else{
try{ngSfx('buzz')}catch(e){}
ngDoorWrong++;
ngDoorStrikes++;
ngDoorHud();
if(ngDoorStrikes>=ngDoorStrikeMax()){
ngDoorStrikes=0;ngDoorFragI=0;ngDoorFragOK=0;ngDoorDecoder={};
try{var ov1=document.getElementById('ngOverlay');if(ov1){ov1.classList.add('ngShake');setTimeout(function(){ov1.classList.remove('ngShake')},450)}}catch(e){}
ngDoorSay('strike limit. the printer jams. every receipt reprints. from the top.');
ngDoorPh1();ngDoorHud();
}else{
ngSay(ngDoorRoast[ngDoorWrong%ngDoorRoast.length]);
ngDoorSay('strike '+ngDoorStrikes+' of '+ngDoorStrikeMax()+'. guess again â see what happens.');
}
}
}
function ngDoorMisplaced(){
var real=[];
for(var i=0;i<ngDoorCards.length;i++)if(!ngDoorCards[i].unv)real.push(ngDoorCards[i]);
var s=real.slice().sort(function(a,b){return a.ch-b.ch});
var bad=0;
for(var i=0;i<ngDoorCards.length;i++){
if(ngDoorCards[i].unv)continue;
var pos=0;for(var r=0;r<real.length;r++)if(real[r]===ngDoorCards[i]){pos=r;break}
if(ngDoorCards[i]!==s[pos])bad++;
}
return bad;
}
function ngDoorPh2(){
var m=document.getElementById('ngDoorMain');if(!m)return;ngDoorHud();
if(!ngDoorCards.length){
if(!ngDoorQueue.length)ngDoorBuildQueue();
for(var q=0;q<ngDoorQueue.length;q++){var fq=ngDoorQueue[q];ngDoorCards.push({tag:fq.tag,ch:fq.ch,unv:!!fq.fake,text:fq.card})}
for(var k2=ngDoorCards.length-1;k2>0;k2--){var j2=Math.floor(Math.random()*(k2+1));var t2=ngDoorCards[k2];ngDoorCards[k2]=ngDoorCards[j2];ngDoorCards[j2]=t2}
}
var h='<div style="color:#9fb2c5;font-family:Consolas,monospace;font-size:12px;text-align:center;margin:10px 0">put the receipts in the order it all happened (the ch stamp helps). trash anything UNVERIFIED.</div>';
h+='<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:8px;width:78%;margin:8px auto">';
for(var i=0;i<ngDoorCards.length;i++){
var c=ngDoorCards[i];
var stamp=c.unv?'ch??':'ch'+c.ch;
h+='<button class="ngtopt" data-i="'+i+'" style="width:46%;font-size:11px;margin:0;'+(ngDoorSel===i?'border-color:rgba(255,210,120,0.8);color:#ffe8c0;':'')+(c.unv?'color:#7a6a5a;':'')+'"><span style="opacity:.5;font-size:10px">'+stamp+'</span> \u00b7 '+(c.unv?c.text:(ngDoorSortOK===0&&c.revealed?c.tag+' \u00b7 ':'')+c.text)+'</button>';
}
h+='</div>';
h+='<div style="display:flex;gap:10px;justify-content:center"><button class="ngtopt" id="ngDoorTrash" style="width:34%">'+(ngDoorTrash.length?'TRASHED: '+ngDoorTrash.length:'TRASH SELECTED')+'</button><button class="ngtopt" id="ngDoorSortB" style="width:34%">SORT IT</button></div>';
m.innerHTML=h;
var bs=m.getElementsByTagName('button');
for(var j=0;j<bs.length;j++)(function(b){
var attr=b.getAttribute('data-i');
if(attr===null)return;
b.onclick=function(){ngDoorCardClick(parseInt(attr,10))};
})(bs[j]);
var tb=document.getElementById('ngDoorTrash');if(tb)tb.onclick=ngDoorTrashSel;
var sb=document.getElementById('ngDoorSortB');if(sb)sb.onclick=ngDoorSort;
}
function ngDoorCardClick(i){
if(!ngActive||ngChDone)return;
if(ngDoorSel===-1){ngDoorSel=i}
else if(ngDoorSel===i)ngDoorSel=-1;
else{var t=ngDoorCards[ngDoorSel];ngDoorCards[ngDoorSel]=ngDoorCards[i];ngDoorCards[i]=t;ngDoorSel=-1}
ngDoorPh2();ngDoorHud();
}
function ngDoorTrashSel(){
if(!ngActive||ngChDone)return;
if(ngDoorSel===-1){ngSay('select a receipt first. the trash has standards.');return}
if(!ngDoorCards[ngDoorSel].unv){try{ngSfx('buzz')}catch(e){}ngShout('DO NOT TRASH A REAL RECEIPT. i can READ.');return}
ngDoorTrash.push(ngDoorCards[ngDoorSel].text);
ngDoorCards.splice(ngDoorSel,1);ngDoorSel=-1;
try{ngSfx('pop')}catch(e){}
ngDoorPh2();
}
function ngDoorSort(){
if(!ngActive||ngChDone)return;
for(var i=0;i<ngDoorCards.length;i++){
if(ngDoorCards[i].unv){ngSay('trash the UNVERIFIED receipts first. lies cannot be filed.');return}
}
var bad=ngDoorMisplaced();
ngDoorSortOK=bad;
if(bad===0){
try{ngSfx('coin')}catch(e){}
for(var i=0;i<ngDoorCards.length;i++)ngDoorCards[i].revealed=true;
ngDoorBridge('sorted. i saw you hesitate on two of them.','acceptable. now the COMBINATION. it is arithmetic. do not make me explain arithmetic.',3);
}else{
try{ngSfx('buzz')}catch(e){}
try{var ov=document.getElementById('ngOverlay');if(ov){ov.classList.add('ngShake');setTimeout(function(){ov.classList.remove('ngShake')},450)}}catch(e){}
ngSay(bad+' out of place. the void reorders nothing. you do the work.');
ngDoorPh2();ngDoorHud();
}
}
function ngDoorDialCount(){return ngHard?4:3}
function ngDoorStrikeMax(){return ngHard?2:3}
function ngDoorPh3(){
var m=document.getElementById('ngDoorMain');if(!m)return;ngDoorHud();
var chips='';
for(var tag in ngDoorDecoder){if(tag==='UNVERIFIED')continue;chips+='<span style="display:inline-block;border:1px solid #3a2a3a;border-radius:3px;padding:2px 7px;margin:2px;font-family:Consolas,monospace;font-size:11px;color:#9fb2c5">'+tag+'='+ngDoorDecoder[tag]+'</span>'}
var d=ngDoorDials[ngDoorDial];
var h='<div style="text-align:center;margin:8px 0 4px">'+chips+'</div>';
h+='<div style="color:#c8a0d0;font-family:Georgia,serif;font-size:13px;letter-spacing:1px;text-align:center;margin:10px 0 2px">DIAL '+(ngDoorDial+1)+'/'+ngDoorDialCount()+'</div>';
h+='<div style="color:#d8a05a;font-family:Consolas,monospace;font-size:16px;text-align:center;margin-bottom:6px">'+(d?d.c:'')+'</div>';
h+='<div style="color:#9fb2c5;font-family:Consolas,monospace;font-size:11px;text-align:center;margin-bottom:8px">result digit:</div>';
h+='<div id="ngDoorFeed" style="color:'+(ngDoorFeed===''?'#4a5a6a':'#ff6070')+';font-family:Consolas,monospace;font-size:12px;text-align:center;min-height:16px;margin-bottom:6px">'+(ngDoorFeed||'use the chips. do the arithmetic.')+'</div>';
h+='<div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center;width:60%;margin:0 auto">';
for(var n=0;n<10;n++)h+='<button class="ngtopt" data-n="'+n+'" style="width:44px;margin:0;font-family:Consolas,monospace">'+n+'</button>';
h+='</div>';
m.innerHTML=h;
var bs=m.getElementsByTagName('button');
for(var j=0;j<bs.length;j++)(function(b){b.onclick=function(){ngDoorDigit(parseInt(b.getAttribute('data-n'),10))}})(bs[j]);
}
function ngDoorDigit(n){
if(!ngActive||ngChDone)return;
var d=ngDoorDials[ngDoorDial];if(!d)return;
if(n===d.v){
try{ngSfx('coin')}catch(e){}
ngDoorCode+=String(n);
ngDoorFeed='';
ngDoorDial++;
if(ngDoorDial>=ngDoorDialCount()){
ngDoorBridge('three locks. one code. you are tedious but effective.','correct. the full code is '+ngDoorCode.split('').join(' ')+'. memorize it â phase 4 erases the board.',4);
}else{ngSay('click. dial '+(ngDoorDial+1)+' of '+ngDoorDialCount()+'.');ngDoorPh3()}
}else{
try{ngSfx('buzz')}catch(e){}
try{var ov=document.getElementById('ngOverlay');if(ov){ov.classList.add('ngShake');setTimeout(function(){ov.classList.remove('ngShake')},450)}}catch(e){}
ngDoorFeed='REJECTED. '+String(n)+' is not the answer.';
ngSay(ngDoorRoast[(ngDoorWrong++)%ngDoorRoast.length]);
ngDoorPh3();
}
}
function ngDoorShuffleOrd(){
ngDoorOrd=[0,1,2];
for(var k=2;k>0;k--){var j=Math.floor(Math.random()*(k+1));var t=ngDoorOrd[k];ngDoorOrd[k]=ngDoorOrd[j];ngDoorOrd[j]=t}
}
function ngDoorPh4(){
var m=document.getElementById('ngDoorMain');if(!m)return;ngDoorHud();
if(ngDoorTalkI>=ngDoorTalk.length){ngDoorBridge('you answered everything. boring.','last check. one short timer. do not bore me.',5);return}
if(!ngDoorOrd)ngDoorShuffleOrd();
var q=ngDoorTalk[ngDoorTalkI];
var h='<div style="color:#d8a05a;font-family:Georgia,serif;font-size:13px;letter-spacing:2px;text-align:center;margin:10px 0 2px">'+ngDoorRules[ngDoorRule]+'</div>';
h+='<div style="color:#4a5a6a;font-family:Consolas,monospace;font-size:11px;text-align:center;margin-bottom:10px">'+ngDoorRuleTxt[ngDoorRule]+'</div>';
h+='<div style="color:#9fb2c5;font-family:Consolas,monospace;font-size:14px;text-align:center;margin:6px 0 14px">'+q.q+'</div>';
for(var p=0;p<3;p++)h+='<button class="ngtopt" data-p="'+p+'" style="display:block;width:74%;margin:6px auto">'+q.o[ngDoorOrd[p]]+'</button>';
m.innerHTML=h;
var bs=m.getElementsByTagName('button');
for(var j=0;j<bs.length;j++)(function(b){b.onclick=function(){ngDoorAnswer(parseInt(b.getAttribute('data-p'),10))}})(bs[j]);
}
function ngDoorAnswer(p){
if(!ngActive||ngChDone)return;
var role=ngDoorOrd[p];
if(role===ngDoorRule){
try{ngSfx('coin')}catch(e){}
ngDoorTalkOK++;ngDoorTalkI++;
var per=ngHard?2:3;
ngDoorRule=Math.floor(ngDoorTalkOK/per)%3;
ngDoorOrd=null;
ngSay(ngDoorTalkOK%4===0?'...correct. i hate that you are good at this.':'correct.');
ngAfterSpeech(function(){if(ngActive&&!ngChDone)ngDoorPh4()},500);
}else{
try{ngSfx('buzz')}catch(e){}
try{var ov=document.getElementById('ngOverlay');if(ov){ov.classList.add('ngShake');setTimeout(function(){ov.classList.remove('ngShake')},450)}}catch(e){}
ngDoorStrikes++;
ngDoorHud();
if(ngDoorStrikes>=ngDoorStrikeMax()){
ngDoorStrikes=0;ngDoorTalkI=0;ngDoorTalkOK=0;ngDoorRule=0;ngDoorOrd=null;
ngDoorSay('strike limit. the wall RESETS. all twelve, from the top. read it this time.');
ngDoorHud();ngDoorPh4();
}else{
ngDoorSay('no. the rule is on the wall. READ the wall. strike '+ngDoorStrikes+' of '+ngDoorStrikeMax()+'.');
}
}
}
function ngDoorTimerStart(limit){
ngDoorStopTimer();
ngDoorTmrIv=setInterval(function(){
if(!ngActive||ngChDone){ngDoorStopTimer();return}
ngDoorTmrLeft-=100;
var b=document.getElementById('ngDoorBar');
if(b)b.style.width=Math.max(0,ngDoorTmrLeft/limit*100)+'%';
if(ngDoorTmrLeft<=0){ngDoorStopTimer();ngDoorTimeout()}
},100);
}
function ngDoorStopTimer(){
if(ngDoorTmrIv){try{clearInterval(ngDoorTmrIv)}catch(e){}ngDoorTmrIv=null}
if(ngDoorTmrT){try{clearTimeout(ngDoorTmrT)}catch(e){}ngDoorTmrT=null}
}
function ngDoorTimeout(){
if(!ngActive||ngChDone)return;
try{ngSfx('buzz')}catch(e){}
ngDoorSel=-1;
try{var ov=document.getElementById('ngOverlay');if(ov){ov.classList.add('ngShake');setTimeout(function(){ov.classList.remove('ngShake')},450)}}catch(e){}
ngDoorSay('slow. the door does not wait. again.',function(){if(ngActive&&!ngChDone)ngDoorPh5()});
}
function ngDoorPh5(){
var m=document.getElementById('ngDoorMain');if(!m)return;ngDoorHud();
ngDoorStopTimer();
var limit=ngHard?10000:15000;
var h='<div style="display:flex;justify-content:center;margin:8px 0 4px"><div style="width:60%;height:6px;background:#16121c;border:1px solid #3a1a1a;border-radius:3px;overflow:hidden"><div id="ngDoorBar" style="height:100%;width:100%;background:rgba(255,120,60,0.85);transition:width .1s linear"></div></div></div>';
h+='<div id="ngDoorFinBody"></div>';
m.innerHTML=h;
var body=document.getElementById('ngDoorFinBody');if(!body)return;
if(ngDoorFinI>=4){ngDoorFinish();return}
var b=ngDoorFinI;
if(b===0){
body.innerHTML='<div style="color:#9fb2c5;font-family:Consolas,monospace;font-size:13px;text-align:center;margin:10px 0">CHECK 1/4 \u00b7 which digit did ECHO print?</div><div style="display:flex;gap:6px;justify-content:center">';
for(var n=0;n<10;n++)body.innerHTML+='<button class="ngtopt" data-n="'+n+'" style="width:44px;margin:2px;font-family:Consolas,monospace">'+n+'</button>';
body.innerHTML+='</div>';
var bs=body.getElementsByTagName('button');
for(var j=0;j<bs.length;j++)(function(bt){bt.onclick=function(){ngDoorFinDigit(parseInt(bt.getAttribute('data-n'),10))}})(bs[j]);
ngDoorTimerStart(limit);
}else if(b===1){
if(!ngDoorFinCards.length){
var pick=[ngDoorFrags[0],ngDoorFrags[2],ngDoorFrags[5]];
for(var i=0;i<pick.length;i++)ngDoorFinCards.push({ch:pick[i].ch,text:pick[i].card});
for(var k=2;k>0;k--){var j2=Math.floor(Math.random()*(k+1));var t=ngDoorFinCards[k];ngDoorFinCards[k]=ngDoorFinCards[j2];ngDoorFinCards[j2]=t}
}
body.innerHTML='<div style="color:#9fb2c5;font-family:Consolas,monospace;font-size:13px;text-align:center;margin:10px 0">CHECK 2/4 \u00b7 order these three. (click two to swap)</div><div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center">';
for(var i=0;i<ngDoorFinCards.length;i++)body.innerHTML+='<button class="ngtopt" data-i="'+i+'" style="width:46%;font-size:11px;margin:0">'+ngDoorFinCards[i].text+'</button>';
body.innerHTML+='</div><button class="ngtopt" id="ngDoorFinCheck" style="margin-top:12px">CHECK</button>';
var bs2=body.getElementsByTagName('button');
for(var j3=0;j3<bs2.length;j3++)(function(bt){var at=bt.getAttribute('data-i');if(at===null)return;bt.onclick=function(){
if(ngDoorSel===-1)ngDoorSel=parseInt(at,10);
else if(ngDoorSel===parseInt(at,10))ngDoorSel=-1;
else{var t=ngDoorFinCards[ngDoorSel];ngDoorFinCards[ngDoorSel]=ngDoorFinCards[parseInt(at,10)];ngDoorFinCards[parseInt(at,10)]=t;ngDoorSel=-1}
for(var q=0;q<bs2.length;q++){var qi=parseInt(bs2[q].getAttribute('data-i'),10);bs2[q].textContent=ngDoorFinCards[qi].text;bs2[q].style.borderColor=(ngDoorSel===qi)?'rgba(255,210,120,0.8)':'';bs2[q].style.color=(ngDoorSel===qi)?'#ffe8c0':''}
}})(bs2[j3]);
var cb=document.getElementById('ngDoorFinCheck');if(cb)cb.onclick=function(){
if(ngDoorFinCards[0].ch<ngDoorFinCards[1].ch&&ngDoorFinCards[1].ch<ngDoorFinCards[2].ch)ngDoorFinPass();
else{try{ngSfx('buzz')}catch(e){}ngSay('wrong order. i can wait. (the timer cannot.)')}
};
ngDoorTimerStart(limit);
}else if(b===2){
if(!ngDoorCodeIn)ngDoorCodeIn='';
body.innerHTML='<div style="color:#9fb2c5;font-family:Consolas,monospace;font-size:13px;text-align:center;margin:10px 0">CHECK 3/4 \u00b7 enter the full code ('+ngDoorCode.length+' digits, from memory)</div><div id="ngDoorFinView" style="color:#d8a05a;font-family:Consolas,monospace;font-size:20px;letter-spacing:6px;text-align:center;min-height:26px;margin-bottom:8px">'+(ngDoorCodeIn.split('').join(' ')||'\u2014')+'</div><div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center;width:60%;margin:0 auto">';
for(var n=0;n<10;n++)body.innerHTML+='<button class="ngtopt" data-n="'+n+'" style="width:44px;margin:2px;font-family:Consolas,monospace">'+n+'</button>';
body.innerHTML+='</div>';
var bs3=body.getElementsByTagName('button');
for(var j4=0;j4<bs3.length;j4++)(function(bt){bt.onclick=function(){ngDoorFinCode(parseInt(bt.getAttribute('data-n'),10))}})(bs3[j4]);
ngDoorTimerStart(limit);
}else{
if(!ngDoorOrd)ngDoorShuffleOrd();
var q=ngDoorTalk[3];
body.innerHTML='<div style="color:#d8a05a;font-family:Georgia,serif;font-size:12px;letter-spacing:2px;text-align:center;margin:8px 0">'+ngDoorRules[ngDoorRule]+'</div><div style="color:#9fb2c5;font-family:Consolas,monospace;font-size:13px;text-align:center;margin:6px 0 12px">'+q.q+'</div>';
for(var p=0;p<3;p++)body.innerHTML+='<button class="ngtopt" data-p="'+p+'" style="display:block;width:74%;margin:6px auto">'+q.o[ngDoorOrd[p]]+'</button>';
var bs4=body.getElementsByTagName('button');
for(var j5=0;j5<bs4.length;j5++)(function(bt){bt.onclick=function(){
var role=ngDoorOrd[parseInt(bt.getAttribute('data-p'),10)];
if(role===ngDoorRule)ngDoorFinPass();
else{try{ngSfx('buzz')}catch(e){}ngDoorSay('wrong rule. read the wall.')}
}})(bs4[j5]);
ngDoorTimerStart(limit);
}
}
function ngDoorFinDigit(n){
var want=parseInt(ngDoorDecoder['ECHO']||'6',10);
if(n===want)ngDoorFinPass();
else{try{ngSfx('buzz')}catch(e){}ngSay('ECHO printed six. check your chips.')}
}
function ngDoorFinCode(n){
ngDoorCodeIn+=String(n);
var v=document.getElementById('ngDoorFinView');
if(v)v.textContent=ngDoorCodeIn.split('').join(' ');
if(ngDoorCodeIn.length>=ngDoorCode.length){
if(ngDoorCodeIn===ngDoorCode)ngDoorFinPass();
else{try{ngSfx('buzz')}catch(e){}ngDoorCodeIn='';if(v)v.textContent='\u2014';ngSay('wrong code. you SET it earlier. use your memory.')}
}
}
function ngDoorFinPass(){
if(!ngActive||ngChDone)return;
ngDoorStopTimer();
try{ngSfx('coin')}catch(e){}
ngDoorFinI++;ngDoorSel=-1;ngDoorFinCards=[];ngDoorCodeIn='';
ngDoorHud();
setTimeout(function(){if(ngActive&&!ngChDone)ngDoorPh5()},600);
}
function ngDoorFinish(){
if(!ngActive||ngChDone)return;
ngDoorStopTimer();
ngShout('HE OPENED IT. HE OPENED IT AND DID NOT SCREAM.');
ngSay('...it is open. the door is open. everybody act natural.');
ngAfterSpeech(function(){
if(!ngActive||ngChDone)return;
ngDoorSay('thank you for your custom. come again. (do not.)',function(){
if(ngActive&&!ngChDone)ngChapter18Done();
});
},700);
}
function ngChapter18(st){
ngDoorStopAll();
ngDoorFragOK=0;ngDoorQueue=[];ngDoorBuildQueue();ngDoorStrikes=0;
ngDoorFragI=0;ngDoorWrong=0;ngDoorCards=[];ngDoorTrash=[];ngDoorSortOK=0;ngDoorDial=0;ngDoorCode='';ngDoorTalkI=0;ngDoorTalkOK=0;ngDoorRule=0;ngDoorOrd=null;ngDoorFinI=0;ngDoorFinCards=[];ngDoorCodeIn='';ngDoorDecoder={};ngDoorFeed='';ngDoorSel=-1;
var ph=1;
var doneF=false;
try{var s=ngLoad();if(s.p18&&typeof s.p18==='object'){ph=Math.min(Math.max(1,s.p18.ph||1),5);if(s.p18.dec)ngDoorDecoder=s.p18.dec;ngDoorFragOK=s.p18.fragOK||0;ngDoorWrong=s.p18.wrong||0;ngDoorTalkOK=s.p18.talkOK||0;ngDoorFragI=(ph>1)?ngDoorQueue.length:0;
if(s.p18.done)doneF=true;
else if(!s.p18.replay&&(s.ch||0)>=19&&ph===1&&ngDoorFragOK===0&&!(ngDoorDecoder&&Object.keys(ngDoorDecoder).length))doneF=true;
}}catch(e){}
if(doneF){ngChapter18Done(true);return}
ngDoorPh=ph;
if(ph===5){ngDoorCode='';for(var ci=0;ci<ngDoorDialCount();ci++)ngDoorCode+=ngDoorDials[ci].v}
st.innerHTML='<div id="ngSub">CHAPTER 18: THE DOOR</div>'+
'<div id="ngDoorProg" style="color:#4a5a6a;font-size:12px;letter-spacing:2px;font-family:Consolas,monospace;margin:16px 0 4px"></div>'+
'<div id="ngDoorVoice" style="color:#d8a05a;font-size:15px;font-family:Georgia,serif;letter-spacing:1px;min-height:26px;margin:8px 0;text-align:center;padding:0 10%"></div>'+
'<div id="ngDoorMain" style="display:flex;flex-direction:column;align-items:center;width:100%"></div>'+
'<div id="ngDoorCtx" style="margin-top:8px"></div>';
ngDoorHud();
try{ngSfx('door')}catch(e){}
if(ph>1){
ngSay('checkpoint restored. phase '+ph+'. the door waited. doors are patient. (i am not.)');
ngAfterSpeech(function(){if(ngActive&&!ngChDone)ngDoorRender()},600);
}else{
ngSay('chapter 18. THE DOOR. it has been waiting, and it has opinions.');
ngAfterSpeech(function(){
if(!ngActive||ngChDone)return;
ngDoorSay('come in. bring the receipts. ALL of them.',function(){
if(!ngActive||ngChDone)return;
ngSay('...the door talks now. of course it does. everything talks. nobody stops.');
ngAfterSpeech(function(){if(ngActive&&!ngChDone)ngDoorRender()},600);
});
},600);
}
}
function ngChapter18Done(replay){
 ngDoorStopAll();
 try{ngDoorSay('thank you for your custom. come again. (do not.)',function(){})}catch(e){}
 var st=document.getElementById('ngStage');
 if(st)st.innerHTML='<div style="color:#d8e6f2;font-family:Georgia,serif;font-size:22px;letter-spacing:4px;text-align:center;margin:14px 0">THE DOOR IS OPEN</div><div style="color:#4a5a6a;font-family:Consolas,monospace;font-size:13px;letter-spacing:2px;text-align:center">+0 skill points. (hell fee.)</div><div style="color:#9fb2c5;font-family:Consolas,monospace;font-size:13px;text-align:center;margin:14px 0">...wait. why is it dark again.</div>';
 try{ngSay('...it is open. ...wait. why is it dark again.')}catch(e){}
 setTimeout(function(){try{location.reload()}catch(e){}},3500);
}

function ch18HellBoot(){
 try{console.error('Uncaught ReferenceError: chapter manifest is not defined at cube.html:1')}catch(e){}
 try{console.error('Failed to load resource: net::ERR_VOID_CORRUPT (void.pkgs integrity check)')}catch(e){}
 try{console.warn('boot failed. loading backup: ch18_legacy (pre-condemnation build)...')}catch(e){}
 try{document.title='signal lost (backup)'}catch(e){}
 try{if(typeof bgm!=='undefined'&&bgm&&!bgm.paused)bgm.pause()}catch(e){}
 try{ngActive=true;ngChDone=false;ngCurCh=18;ngHard=false;ngSayQueue.length=0;ngSayTyping=false}catch(e){}
 try{var es=document.createElement('style');es.id='ch18era';es.textContent="#ngOverlay{position:fixed;inset:0;z-index:2147483647;background:#050508;display:flex;flex-direction:column;align-items:center;font-family:Georgia,serif;animation:ngIn .5s ease-out}#ngObj{width:100%;text-align:center;padding:26px 20px 18px;color:#d8e6f2;font-size:19px;letter-spacing:1px;min-height:76px;border-bottom:1px solid #1a2a3a}#ngObj .who{color:#2bd0d0}#ngJbo{width:100%;text-align:center;padding:10px 20px 14px;color:#ffd8b0;font-size:18px;letter-spacing:1px;border-bottom:1px solid #3a2a1a;min-height:20px;display:none}#ngJbo .who{color:#ff8a2a;font-weight:bold}#ngCore{width:100%;text-align:center;padding:10px 20px 14px;color:#f5d8e8;font-size:18px;letter-spacing:1px;border-bottom:1px solid #3a1a2a;min-height:20px;display:none}#ngCore .who{color:#ff9ecf}#ngStage{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;width:100%}.ngtopt{background:transparent;border:1px solid rgba(255,60,120,0.4);color:rgba(255,180,200,0.9);font-size:14px;font-family:Consolas,monospace;padding:8px 16px;margin:3px;cursor:pointer;border-radius:4px}.ngtopt:hover{background:rgba(255,60,120,0.12)}.ngShake{animation:ngShakeA .4s}@keyframes ngShakeA{25%{transform:translate(-6px,3px)}50%{transform:translate(5px,-4px)}75%{transform:translate(-3px,-2px)}}#ngMenuBtn{position:fixed;top:14px;right:18px;color:#5a6a7a;font-size:22px;letter-spacing:2px;cursor:pointer;z-index:2001;font-family:Consolas,monospace}#ngMenuBtn:hover{color:#d8e6f2}#ngMenu{display:none;position:fixed;top:48px;right:18px;z-index:2001;background:rgba(8,10,14,.95);border:1px solid #2a3542;border-radius:6px;padding:14px;min-width:230px;font-family:Consolas,monospace}#ngMenuTitle{color:#5a8ab0;font-size:10px;letter-spacing:3px;margin-bottom:6px}#ngMenuProg{color:#4a5a6a;font-size:11px;margin-bottom:12px;line-height:1.8}#ngMenu button{display:block;width:100%;margin:6px 0;background:transparent;border:1px solid #2a3542;color:#9fb2c5;font-family:Consolas,monospace;font-size:12px;letter-spacing:2px;padding:8px;cursor:pointer;border-radius:4px}#ngMenu button:hover{border-color:#2bd0d0;color:#d8e6f2}#ngMenuLeave{border-color:#5a3a3a!important;color:#c87878!important}"}catch(e){}
 try{document.head.appendChild(es)}catch(e){}
 try{
  var fl=document.createElement('div');fl.id='ngFlash';document.body.appendChild(fl);
  void fl.offsetWidth;fl.classList.add('go');
  setTimeout(function(){if(fl.parentNode)fl.parentNode.removeChild(fl)},1000);
 }catch(e){}
 var ov=document.createElement('div');ov.id='ngOverlay';
 ov.innerHTML='<div id="ngObj"><span class="who">obj: </span><span id="ngObjText"></span></div>'
 +'<div id="ngJbo"><span class="who">jbo: </span><span id="ngJboText"></span></div>'
 +'<div id="ngCore"><span class="who">core: </span><span id="ngCoreText"></span></div>'
 +'<div id="ngStage"></div>'
 +'<div id="ngMenuBtn">\u2261</div>'
 +'<div id="ngMenu"><div id="ngMenuTitle">NON-GAME MENU (there is none)</div><div id="ngMenuProg"></div><button id="ngMenuHint">HINT</button><button id="ngMenuMusic">MUSIC: STANLEY</button><button id="ngMenuHard" style="display:none">HARD MODE: OFF</button><button id="ngMenuSkip" style="display:none">SKIP PHASE \u2192</button><button id="ngMenuLeave">LEAVE THE NON-GAME</button></div>';
 document.body.appendChild(ov);
 try{document.body.classList.add('ng-mode')}catch(e){}
 try{var mb=document.getElementById('ngMenuBtn');if(mb)mb.onclick=function(){try{var mn=document.getElementById('ngMenu');if(mn)mn.style.display=(mn.style.display==='block'?'':'block')}catch(e){}}}catch(e){}
 try{document.addEventListener('keydown',function(e){try{e.stopPropagation();e.preventDefault()}catch(err){}},true)}catch(e){}
 ov.addEventListener('click',function(e){try{e.stopPropagation()}catch(err){}});
 setTimeout(function(){
  try{
   var st=document.getElementById('ngStage');if(!st)return;
   ngChapter18(st);
  }catch(e){try{console.error('backup failed: '+e)}catch(ee){}}
 },900);
}
try{
 if(document.readyState==='complete'||document.readyState==='interactive')ch18HellBoot();
 else document.addEventListener('DOMContentLoaded',ch18HellBoot);
}catch(e){try{ch18HellBoot()}catch(ee){}}
})();
