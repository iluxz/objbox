// ── GEO BUFFS: obj wants to know your state (for buffs) ──
(function(){
// save: {state, country, pid}
function geoSave(){try{return JSON.parse(localStorage.getItem('cube_geo')||'{}')}catch(e){return{}}}
function geoPersist(s){try{localStorage.setItem('cube_geo',JSON.stringify(s||{}))}catch(e){}}
// passive table: id -> {name, line, fx}
var GEO_PASSIVES={
florida:{name:'FLORIDA MAN',line:'FLORIDA?? florida man gets: SURGE recharges in 25s. (the heat. it lives in the surge now.)',fx:{dmg:1,xp:1,rate:0,max:0,pbase:1,cd:25}},
texas:{name:'EVERYTHING IS BIGGER',line:'TEXAS. everything is bigger. including damage numbers: signals +10% dmg.',fx:{dmg:1.1,xp:1,rate:0,max:0,pbase:1,cd:30}},
ohio:{name:'DOWN BAD GRINDSET',line:'OHIO. down bad. suffering builds character: +15% xp. (no other upside. this is ohio.)',fx:{dmg:1,xp:1.15,rate:0,max:0,pbase:1,cd:30}},
canada:{name:'WINTERPROOF',line:'CANADA. winterproof: base +10% hp. (sorry.)',fx:{dmg:1,xp:1,rate:0,max:0,pbase:1.1,cd:30}},
california:{name:'BIG NUMBERS',line:'CALIFORNIA. big numbers only: +100 max energy. (rent still due.)',fx:{dmg:1,xp:1,rate:0,max:100,pbase:1,cd:30}},
drifter:{name:'VOID DRIFTER',line:'the static cannot find you. drifting pays: +1 energy/s. (nowhere is everywhere.)',fx:{dmg:1,xp:1,rate:1,max:0,pbase:1,cd:30}},
none:{name:'UNBUFFED',line:'fine. no buffs. (the static thanks you for your cooperation.)',fx:{dmg:1,xp:1,rate:0,max:0,pbase:1,cd:30}}
};
function geoPick(state,country){
var s=String(state||'').toLowerCase();
if(s.indexOf('florida')!==-1)return 'florida';
if(s.indexOf('texas')!==-1)return 'texas';
if(s.indexOf('ohio')!==-1)return 'ohio';
if(s.indexOf('california')!==-1)return 'california';
if(String(country||'').toUpperCase()==='CA'||s.indexOf('ontario')!==-1||s.indexOf('quebec')!==-1||s.indexOf('british columbia')!==-1||s.indexOf('alberta')!==-1)return 'canada';
return 'drifter';
}
// effect accessor for other games (guarded: returns defaults when geo off)
window.geoFx=function(){
try{
var s=geoSave();
var P=GEO_PASSIVES[s.pid]||GEO_PASSIVES.none;
return {dmg:P.fx.dmg,xp:P.fx.xp,rate:P.fx.rate,max:P.fx.max,pbase:P.fx.pbase,cd:P.fx.cd,name:P.name};
}catch(e){return {dmg:1,xp:1,rate:0,max:0,pbase:1,cd:30,name:'UNBUFFED'}}
};
window.geoName=function(){try{return geoFx().name}catch(e){return 'UNBUFFED'}};
function geoSay(t){try{if(typeof cubePrint==='function')cubePrint(t)}catch(e){}}
// obj-styled pre-dialog (THIS popup is ours and can say whatever it wants)
function geoDialog(){
try{
var old=document.getElementById('geoAsk');if(old)old.remove();
var d=document.createElement('div');d.id='geoAsk';
d.style.cssText='position:fixed;left:50%;top:38%;transform:translate(-50%,-50%);background:#14141c;border:2px solid #9ab8d8;border-radius:8px;padding:22px 26px;z-index:5000;font-family:Consolas,monospace;color:#d8d8e2;max-width:440px;text-align:center';
d.innerHTML='<div style="font-size:15px;letter-spacing:2px;margin-bottom:10px">obj needs to know your STATE.</div><div style="font-size:12px;color:#8a8aa2;margin-bottom:16px">so we can give you buffs. (this is lookism but for geography.)</div><button id="geoYes" style="background:#23232f;border:2px solid #9ab8d8;color:#dfe8ff;font-family:Consolas,monospace;padding:8px 18px;margin:0 6px;cursor:pointer">GRANT BUFFS</button><button id="geoNo" style="background:#23232f;border:1px solid #4a4a6a;color:#8a8aa2;font-family:Consolas,monospace;padding:8px 18px;margin:0 6px;cursor:pointer">nah</button><div id="geoMan" style="margin-top:12px;display:none"><input id="geoIn" placeholder="type your state (liar\'s honor)" style="background:#0c0c12;border:1px solid #4a4a6a;color:#d8d8e2;font-family:Consolas,monospace;padding:6px 10px;width:220px"><button id="geoGo" style="background:#23232f;border:1px solid #9ab8d8;color:#9ab8d8;font-family:Consolas,monospace;padding:6px 12px;margin-left:6px;cursor:pointer">ok</button></div>';
document.body.appendChild(d);
var close=function(){try{var x=document.getElementById('geoAsk');if(x)x.remove()}catch(e){}};
document.getElementById('geoYes').onclick=function(){close();geoLocate()};
document.getElementById('geoNo').onclick=function(){close();geoGrant('none','refused','XX')};
window.geoManual=function(){
var m=document.getElementById('geoMan');if(m)m.style.display='block';
var go=document.getElementById('geoGo');
if(go)go.onclick=function(){
var v='';try{v=document.getElementById('geoIn').value||''}catch(e){}
close();
if(!v.trim()){geoGrant('none','refused','XX');return}
geoGrant(geoPick(v,''),v,'??');
};
};
}catch(e){}
}
function geoLocate(){
try{
if(!navigator.geolocation){window.geoManual();return}
var done=false;
var to=setTimeout(function(){if(!done){done=true;window.geoManual()}},12000);
navigator.geolocation.getCurrentPosition(function(pos){
if(done)return;done=true;clearTimeout(to);
var la=pos.coords.latitude,lo=pos.coords.longitude;
var url='https://api.bigdatacloud.net/data/reverse-geocode-client?latitude='+encodeURIComponent(la)+'&longitude='+encodeURIComponent(lo)+'&localityLanguage=en';
fetch(url).then(function(r){return r.json()}).then(function(j){
var st=j.principalSubdivision||j.city||'unknown';
var cc=j.countryCode||'??';
geoGrant(geoPick(st,cc),st,cc);
}).catch(function(){window.geoManual()});
},function(){if(!done){done=true;clearTimeout(to);window.geoManual()}},{timeout:10000});
}catch(e){try{window.geoManual()}catch(err){}}
}
function geoGrant(pid,state,country){
try{
geoPersist({pid:pid,state:state,country:country});
var P=GEO_PASSIVES[pid]||GEO_PASSIVES.none;
geoSay('obj: '+P.line+' ['+P.name+']');
}catch(e){}
}
// buffs command
window.geoCmd=function(a){
try{
var s=geoSave();
if(a&&a.length&&String(a[0]).toLowerCase()==='reset'){geoPersist({});geoSay('buffs wiped. (obj forgot where you live. play dumb.)');geoDialog();return true}
if(s.pid){var P=GEO_PASSIVES[s.pid]||GEO_PASSIVES.none;geoSay('broadcasting from '+(s.state||'unknown')+': '+P.name+'. '+P.line);return true}
geoDialog();return true;
}catch(e){return true}
};
})();
