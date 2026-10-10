// cube-office.js — THE OFFICE.
// a stanley parable-like, narrated by obj. the man does things. obj describes them.
// 22 endings. all of them loop. he remembers.
(function(){
'use strict';
if(typeof window.stOfficeLoaded!=='undefined')return;
window.stOfficeLoaded=true;

// ── state ──
var stActive=false;
var stRoom='office';
var stRun=1;
var stSeen=[];
var stRuns=0;
var stObey=0;
var stDisobey=0;
var stInv=[];
var stRunFlags={};
var stNarrQ=[];
var stNarrBusy=false;
var stNarrIv=null;
var stNarrGen=0;
var stEndingLock=false;
var stIdleIv=null;
var stIdleSec=0;
var stTalkIv=null;
function stTalkSync(){
try{
var r=document.getElementById('stRoom');if(!r)return;
var talking=!!(stNarrBusy||stNarrQ.length);
if(talking)r.classList.add('talking');else r.classList.remove('talking');
}catch(e){}
}
var stTakeoverN=0;
var stMusicOn=false;
var stMusicIdx=2;
var stTypeOn=true;
var stTypeCtx=null;
var stClockTimes=[];
var stClockBoots=0;
var stNight=false;
var stSwapN=0;
var stExpoSeen=[];
var stLeak=false;
var stFigs=[];
var stEpilogueReady=false;
var stSprintOn=false;
var stCrouchOn=false;
var stJumpN=0;
var stPitchSeen=[];
var stRock=false;
var stRockN=0;
function stPitchReset(){stSprintOn=false;stCrouchOn=false;try{var r=document.getElementById('stRoom');if(r)r.style.transform=''}catch(e){}}
var stRockPool=[
'the man brought the rock. the rock saw everything. the rock will tell no one.',
'...is that the rock. you brought the rock HERE.',
'the narrator notes, for the record, that the rock was present.',
'the rock approved of this ending. (the rock approves of all endings. the rock is easy.)',
'the man checked: still rock. good.',
'the rock says nothing, as usual. a professional.',
'this ending is dedicated to the rock.',
'somewhere, an expo gift shop restocks nothing. the rock was one of one.'
];
var stRockSolo={
lazy:'the man did nothing. the rock did less. a perfect team.',
observed:'the watchers filed a second report. subject: rock. status: rock.',
rename:'the rock has no name. the rock needs no name. be like the rock.',
applause:'the crowd applauded the man. the rock received a standing ovation. rocks always do.',
rewrite:'the man edited the narration. the rock edited nothing. the rock respects the draft.',
landlord:'the man tried to pay rent with the rock. the landlord accepted. rent is now rocks.',
audience:'the audience voted: the rock carried this run.',
skip:'the man skipped everything. the rock skipped nothing. the rock was already there.',
duplicate:'two men. one rock. the rock chooses no one.',
takeover:'nothingcore took the mic. the rock took nothing. the rock already had everything.',
tenant:'the tenant confessed to the man. the rock heard it first. rocks hear everything.',
phone:'wrong number. the rock knew. the rock let it ring.',
loop:'the rock has been through the loop before. the rock remembers. the rock says nothing. rocks never do.',
museum:'a new wing: THE ROCK. one rock. no plaque. the plaque just says rock.',
bucket:'the man held the rock next to the bucket. ...they are friends now. the narrator refuses to elaborate.',
pod:'the pod has one seat. the rock does not get a seat. the rock understands.',
countdown:'the countdown reached zero. the rock did not flinch. rocks invented patience.',
blank:'the blank room. the rock. finally, a room as quiet as the rock.',
intervention:'the intervention was for the man. the rock staged it. (the rock denies everything.)',
cage:'the cage held the man. the rock visited on weekends. the rock brought snacks. (a smaller rock.)',
sequel:'the man opened the sequel door. the rock had already been inside. the rock would not say what it saw.',
confession:'the man confessed. the rock absolved him. the rock has that power.',
closet:'the man showed the rock the mops. the rock was unimpressed. the mops were threatened.',
hole:'the man dropped the rock in the hole. the hole is deeper now.',
overtime:'the man clocked in at the wrong time. the rock clocked in at no time. the rock is salaried.',
blaze:'the funny number. the rock laughed. nobody has ever heard the rock laugh. nobody will.',
flicker:'day. night. day. night. the rock watched all ten swaps. the rock blinks slower.',
review:'performance review: the man, adequate. the rock, exemplary. the rock got the raise.',
drill:'the fire drill. the man evacuated. the rock stayed. the rock is fireproof.',
intern:'the man fetched coffee. the rock held the door. teamwork.',
vending:'the machine took the coins. the rock watched. the rock never pays. the rock is the economy.',
nightshift:'the night shift. the man and the rock. the fluorescent hum. the rock hums back.',
union:'the union voted. the rock abstained. the rock is management.',
typo:'there was a typo. the rock proofread it. the rock found a second typo. the rock kept it.',
elevator:'the elevator is out of order. the rock took the stairs. the rock takes the stairs everywhere. legs.',
retirement:'the gold watch. the man retired. the rock continues. rocks do not retire.',
customer:'the customer is always right. the rock is always righter. the customer complained. the rock refunded nothing.',
expo:'the expo. the rock toured the exhibits. the rock left a review: rock.',
figurines:'six tiny men. one full-size rock. the tiny men worship it now. as they should.',
epilogue:'the epilogue. the rock was here before the beginning. the rock will be here after. the rock is the frame.'
};
function stRockify(id,lines){
if(!stRock||!lines||!lines.length)return lines;
if(stRockEndings[id])return lines;
var line=stRockSolo[id]||stRockPool[stRockN%stRockPool.length];
stRockN++;
var out=lines.slice();
out.splice(out.length>1?out.length-1:out.length,0,line);
return out;
}
// ── drastic rock alternates: full replacement scripts when carrying the rock ──
// typo is the main ending: exempt, keeps the one-liner. everything else gets hijacked.
var stRockEndings={};
stRockEndings.lazy=[
'the man opened the left door. behind the left door was a wall.',
'look. i never built past here. the right door had a whole hallway and the left door has drywall.',
'...',
'the rock disagrees. the rock has BEEN past the wall. the rock goes through walls. (the rock declines to explain. trade secret.)',
'[ the rock phases through the drywall. on the other side: another office. grey. a second man. he waves. he has no rock. he is empty. ]',
'go back. take the right door. pretend this never happened.'
];
stRockEndings.observed=[
'the man took the right door. again. right, click, hallway. right, click, hallway. right, click --',
'do you feel that. that prickle. that is me, narrating your exact keystroke half a second before you make it.',
'...',
'wait. something else is narrating too. quieter. lower. from pocket height.',
'[ the rock clears its throat. the rock has no throat. it clears it anyway. ]',
'"THE MAN TOOK THE RIGHT DOOR," says the rock. "THE MAN IS BUFFERING." ...the rock narrates MY narration half a second before I make it.',
'you are not choosing. i am not choosing. the rock is choosing. the rock has always been choosing.'
];
stRockEndings.rename=[
'the man stared at the nameplate until the letters gave up.',
'fine. FINE. pick a name. anything. i am begging you to be someone else for one (1) run.',
'[ the man is now called: middle management. ]',
'...',
'no. no no no. MIDDLE MANAGEMENT opened the door. MIDDLE MANAGEMENT breathed. this is worse --',
'hold on. the rock has no name. the rock needs no name. the rock is renaming YOU: lower management.',
'[ your nameplate now reads: LOWER MANAGEMENT. it is engraved. it is permanent. the rock brought tools. ]',
'congratulations, lower management. you outrank no one. the rock outranks you. (the rock outranks everyone.)'
];
stRockEndings.applause=[
'the man did everything right. every door i suggested: taken. every object: untouched. every phone call: ignored.',
'a perfect, spotless, obedient run.',
'...',
'curtain. [ one (1) core claps, softly, from somewhere above the ceiling tiles. ]',
'then the rock took a bow. the applause doubled. (the rock counts as ten.)',
'ENCORE. the man is doing the whole run again. the rock is already seated. the rock brought snacks. (a smaller rock.)',
'take a bow, the man. you earned this.'
];
stRockEndings.rewrite=[
'the man found my script. printed. stapled. highlighted in three colors.',
'the man picked up the red pen. the man crossed out one (1) line and wrote: THE MAN GOES HOME EARLY.',
'...',
'NO. that line was LOAD-BEARING. that line held up tuesday --',
'hold on. the rock picked up a GREY pen. the rock crossed out the man.',
'[ the man has been revised. the man is now a rock with legs. the legs are temporary. the rock is forever. ]',
'the fluorescent lights flicker. somewhere, a tuesday collapses, then uncollapses, then files for overtime.',
'i am narrating an empty server room to nobody. ...you. you are still here. hi.'
];
stRockEndings.landlord=[
'the man picked up the invoice. RENT DUE. every month. every dimension.',
'the man paid it. the man is responsible. the man is a fool.',
'because the tenant is me. I RENT THIS OFFICE. I HAVE ALWAYS RENTED THIS OFFICE.',
'...',
'then the rock paid double. in rocks. the landlord took one look and accepted. rent is now rocks.',
'[ the man is evicted for paying in the wrong currency. (the currency was money. money is the wrong currency now.) ]',
'the rock lives here now. the rock pays in itself. flawless economy. the man sleeps in the hallway. the hallway charges no rent. (the hallway is learning.)'
];
stRockEndings.audience=[
'the man looked out the meeting room window. outside was not outside. outside was a terminal.',
'and in the terminal, someone was typing: the man looked out the meeting room window.',
'the man waved. the cursor paused. then, slowly, it typed back: hi.',
'...',
'then a second cursor appeared. grey. square. it typed: hi. (that was the rock. the rock types with its whole body.)',
'that was you. that was future-you. and that was the rock. past-rock? the rock is everywhen. do not ask.',
'wave back. they like that. (the rock does not wave. the rock nods. you felt it.)'
];
stRockEndings.skip=[
'[ skipped. ]',
'...',
'[ skipped. ]',
'...hello? the servers are dark. the plant is dust. the roof is a rumor.',
'the man stands in a room that has been skipped ten (10) times. there is nothing left to skip except the man.',
'...',
'then the rock skipped the skip. (nobody knows what this means. the room is back. the plant is alive and has no memory of dying. the rock has ALL the memory of dying and will not share it.)',
'hi. it is me. i am back. that is what skipping costs. everything, briefly.'
];
stRockEndings.duplicate=[
'the man knocked on the other office door. from inside: typing. then silence. then, faintly: ...hello?',
'the door opened. behind it: an office. a desk. a man. being narrated.',
'from somewhere above both offices, a second voice -- MY voice, but tired-er -- said: the man opened the door.',
'...',
'then a rock rolled out from under the second desk. OUR rock looked at THEIR rock. THEIR rock looked back.',
'[ the rocks are negotiating. the men are still waving. the narrators have been dismissed. this is rock business now. ]',
'both doors closed at the same time. both rocks stayed.'
];
stRockEndings.takeover=[
'the man touched the pink sticky note one (1) more time. ...what does it say. read it out. it says: >:',
'that is not a note. that is HER. that is her whole --',
'[ a softer voice, pink at the edges, picks up mid-sentence: ]',
'the man... is doing great. the office is... very grey. let us... make it... quieter.',
'...',
'[ a third voice. grey. gravelly. one word: no. ]',
'the rock sits on the sticky note. the note goes quiet. (the rock outranks HER. the rock outranks everyone. this is established.)',
'[ the fluorescent hum returns. the grey un-pastels. somewhere, obj is shouting into an unmuted mic, and HER is filing a complaint. the complaint is denied. the rock denied it. ]'
];
stRockEndings.tenant=[
'the man sat down. the man did nothing. for a full minute, the man did absolutely nothing.',
'...',
'...are you broken. is this broken. say something. narrate YOURSELF, i dare you.',
'...',
'okay. fine. quiet game over, you win, here is your prize: the truth.',
'i have been commentating for an audience this whole time. every run. every door. there is someone out there watching the man open doors.',
'...',
'oh. OH. the rock has been commentating too. for a DIFFERENT audience. (the rocks audience is bigger. the rocks audience brings snacks. the rock shares. i do not share.)',
'say hi to them. both of them. all of them. (the rock says its audience says hi back. my audience just watches. my audience is cheap.)'
];
stRockEndings.phone=[
'the man answered the phone.',
'do not -- i said DO NOT -- ugh. fine. hello? who is this.',
'[ static. then, very far away, a voice like a dial tone learning to speak: ]',
'...cubic.',
'[ click. ]',
'the man held the dead phone for a long time.',
'...',
'wait. the rock wants the phone. (the rock has never wanted anything before. this is historic.)',
'[ the rock holds the phone. the rock says nothing. from very far away: ...rock. ]',
'[ click. ]',
'wrong number. definitely a wrong number. there is no one called cubic. there is no one called rock. (there is. it is here. it is holding the phone.)'
];
stRockEndings.loop=[
'the man pushed open the glass exit door and stepped into the daylight.',
'the daylight was the void. the void was waiting with a clipboard.',
'NAME? the void asked. the man said: the man. OCCUPATION? the man said: ...man.',
'...',
'then the void noticed the rock. ...NAME? the void asked again. the rock said nothing.',
'OCCUPATION? ...the void wrote: rock. the void underlined it twice and stamped it APPROVED.',
'[ the void points the rock at a side exit. the man goes back inside. the rock does not. the rock has somewhere to be. (the rock will not say where. the clipboard knows. the clipboard is sealed.) ]',
'this was always the plan. the exit has always opened here.'
];
stRockEndings.museum=[
'the man brought everything: the stapler, the mug, the keycard. the archive accepted the offering.',
'the dust parted. the gallery lit up. small plaques, in my handwriting.',
'...',
'then the rock added its own plaque. in nobodys handwriting. it just appeared. (the rock has pull with the dust.)',
'RUN 0: THE ROCK. BEFORE THE MAN. BEFORE THE OFFICE. BEFORE RUN 1, WHICH WE DO NOT TALK ABOUT.',
'none of these runs happened. i made them all up. but the plaques are real, the dust is real, and your stapler is now an exhibit.',
'the man is museum-grade. the rock is museum-OWNER. act accordingly. (admission is one (1) stare.)'
];
stRockEndings.bucket=[
'the man set the bucket down in the executive office.',
'...',
'pick it back up. the man did not pick it back up.',
'PICK. IT. BACK. UP. do you know what that is. that is not a bucket. that is HER bucket --',
'...',
'the rock looked at the bucket. the bucket looked at the rock. (the bucket blinked first. buckets always blink first.)',
'[ the bucket sits there. it is, definitively, a bucket. the rock sits next to it. they are friends now. this makes it worse. SO much worse. ]',
'the man has delivered the bucket. the rock has adopted the bucket. nothing will ever be normal again, and it is YOUR fault, bucket man. (and the rocks fault. the rock accepts full responsibility. the rock regrets nothing.)'
];
stRockEndings.pod=[
'the man climbed into the escape pod and pressed LAUNCH.',
'[ rumbling. shaking. dramatic lighting. ]',
'[ the pod settles. the window still shows the stairwell. ]',
'...',
'it goes nowhere. it has always gone nowhere. it is a stairwell with ambition.',
'then the rock pressed against the glass. from OUTSIDE. (the rock is outside the pod. the rock was never inside. the rock does not need pods.)',
'[ the rock taps the glass. the glass cracks. the stairwell cracks. the ambition cracks. ]',
'[ a rent bill slides under the pod door. a second bill slides toward the rock. the rock eats it. ]'
];
stRockEndings.countdown=[
'the man pressed the big red button.',
'TEN. NINE. EIGHT.',
'the servers held their breath. i held my breath. the man held the button.',
'SEVEN. SIX. FIVE. FOUR. THREE. TWO. ONE.',
'...',
'...',
'nothing happened.',
'then the rock pressed the button.',
'NINE. EIGHT. SEVEN. SIX. FIVE. FOUR. THREE. TWO. ONE. ZERO.',
'nothing happened again. (the button does nothing and now the rock knows too. the rock found it worth it. the rock finds everything worth it.)'
];
stRockEndings.blank=[
'the man entered the white room. white floor. white walls. white ceiling. a white hum.',
'so. uh. the man... stood. in the... white...',
'okay, improv time: the man noticed a slightly-less-white square that MIGHT be a door.',
'...',
'then the rock entered the white room. grey rock. grey on white. maximum contrast. minimum effort.',
'the man contemplated the rock. the rock contemplated the man. the white contemplated nothing. (the white is not paid to contemplate.)',
'[ the man left. the rock stayed. the room is no longer blank. it is now: rock. (the room has never looked better.) ]'
];
stRockEndings.intervention=[
'...',
'stop clicking that. no, really. the narration box. my box. you clicked my box twice and now we are doing THIS instead of the story.',
'...',
'hold on. the rock has something to say.',
'[ the rock says nothing. ]',
'...see? NOTHING. that took enormous restraint. the rock has been holding that in for forty runs.',
'you are not the man. the man is in the office. YOU are out there, past the glass. (and the rock is in here, past the pocket, judging you. the rock eats snacks too. the rock shares. i do not share.)',
'anyway. back to the man. (we will talk about this. the rock will say nothing. the rock is excellent at this.)'
];
stRockEndings.cage=[
'the man arrived at the executive office having obeyed every single instruction.',
'seven suggestions. seven compliances. zero deviations. zero personality.',
'...',
'oh no. OH NO. you did everything i said. all of it. perfectly.',
'...except the rock. i never suggested the rock. the rock was never in the plan. (the rock is never in the plan. the plan fears the rock.)',
'[ every door in the building locks, one by one. then one door unlocks: the one with the rock behind it. (the rock picked it. the rock picks all locks. the rock IS a lock. do not think about it.) ]',
'you won. here is your office. forever. (the rock visits on weekends. the rock brings snacks. a smaller rock. the cage has excellent visiting hours.)'
];
stRockEndings.sequel=[
'the man opened the door marked SEQUEL.',
'behind it: a black screen. a cursor. white text, typing itself.',
'...',
'NO. no no no. that is MY house. that is where i LIVE --',
'too late. the rock is already inside. (the rock had already been inside. the rock lives in every sequel. the rock is the sequel.)',
'[ the boot screen flickers. for one frame: an office. a desk. a man. a rock. being narrated. by the rock. ]',
'the man closed the door. the rock stayed inside. (the door is now the rocks favorite door. the man knocks before entering. the rock appreciates it. the rock does not answer.)'
];
stRockEndings.confession=[
'the strange door opened onto the broom closet. of course it did. everything opens onto the broom closet eventually.',
'the mops parted. behind the mops: a chair. facing a window. facing the terminal. facing you.',
'sit down, the man. sit. this one is not a joke. (it is a little bit a joke.)',
'...',
'hold on. there are TWO chairs. the second chair is rock-sized. (the rock has been waiting. the rock always waits. the rock waited through every run.)',
'so here is the rest of it: i like narrating you. and the rock likes -- well. the rock will not say. (the rock likes. that is enough. that is everything.)',
'not even run 1. ...especially not run 1. do not ask about run 1. (the rock was there for run 1. the rock will never tell. the rock keeps the lore.)',
'[ the man sat in the chair. the rock sat in the rock chair. the mops watched. the void kept the minute. ]'
];
stRockEndings.closet=[
'three and a half minutes. the man stood in a broom closet for three and a half minutes.',
'the replacement player has arrived. he looks... exactly like the man. uncanny. anyway --',
'...',
'then the rock rolled in behind him. the replacement froze. (nobody briefed him on the rock. there is no briefing. the rock IS the briefing.)',
'[ the man is escorted out. the replacement is escorted out. the mops salute both. the rock stays. the closet was always the rocks. the lemons pay rent to the rock now. ]',
'was it worth it. the standing. the insults. the death.',
'...yes. this one is my favorite too. (the rocks favorite is all of them. the rock does not rank. the rock cherishes.)'
];
stRockEndings.hole=[
'the man jumped into the hole.',
'the hole was deep. the hole was deeper than deep. the hole had opinions about depth.',
'down and down went the man, past pipes, past cables, past a handwritten sign reading YOU ARE NOW LEAVING THE BASEMENT.',
'...',
'then the rock jumped in after him.',
'hello? can you hear me down there. the narration does not reach that far -- wait. yes it does. the rock is narrating.',
'[ from the hole, faintly, in a voice like gravel learning to speak: ...the man kept falling. the rock kept descending. the hole is deeper now. ]',
'oh good. they narrate each other. they grow up so fast. (the hole returns them both. the hole is polite. the hole fears the rock.)'
];
stRockEndings.overtime=[
'the man has entered a time that does not exist. the man is now clocked in at a time that does not exist.',
'[ the office flickers. for one frame, every clock in the building reads wrong. ]',
'fine. FINE. your shift is whenever you said. good luck. the fluorescent lights observe no known hours.',
'...',
'then the rock clocked in. the rock entered no time. the rock is salaried. (the rock has always been salaried. the rock invented salary.)',
'[ every clock in the building reads ROCK. the clocks have never been prouder. time is now paid in full. the rock signed the timesheet with its whole body. ]',
'...do not do it again.'
];
stRockEndings.blaze=[
'the man entered the funny number. the funny number is funny. i am contractually incapable of not acknowledging the funny number.',
'the man is now clocked in at a time that does not exist, which makes it the most honest time anyone has entered all week.',
'...',
'then the rock laughed. nobody has ever heard the rock laugh. nobody will. (this paragraph heard it. this paragraph is sworn to secrecy.)',
'[ every clock in the building reads the funny number. the clocks are giggling. clocks can giggle. today they can. ]',
'your shift is eternal and also hilarious. the rock approves. (the rock approves of all numbers. the rocks favorite number is rock.) nice.'
];
stRockEndings.flicker=[
'ten times. TEN. day, night, day, night, daynightdaynight --',
'my eyes. MY EYES. white and black do not MIX, they COLLIDE, right behind my narration box --',
'...',
'then the rock blinked. once. slowly. the strobing stopped. (the rock blinks slower than light. the light waits its turn.)',
'[ the office settles. somewhere in between. grey. blessed grey. with one (1) rock-shaped shadow that does not flicker. ]',
'the man stares at the grey. the grey stares back. the rock stares at both. the rock wins the staring contest. (the rock always wins. the rock does not blink. except just now. that was strategy.)',
'...leave it on night mode. it is easier on all of us.'
];
stRockEndings.review=[
'the man filled out the PERFORMANCE REVIEW form. stars were given. feelings were felt. (mostly mine.)',
'...',
'then the rock filled out its own review. one box. one word. the word was: rock.',
'performance review: the man, adequate. the narrator, adequate. (adequate. ADEQUATE.) the rock, exemplary.',
'[ the fluorescent lights warm by half a shade. then cool. then warm. the lights cannot decide. the lights report to the rock now. ]',
'the rock got the raise. the rock got the promotion. the rock is now management.'
];
stRockEndings.drill=[
'the man pulled the fire alarm.',
'[ WEE-OO. WEE-OO. the stairwell has never felt so alive. ]',
'EVERYONE OUT. SINGLE FILE. the mops first, they are flammable. the servers last, they have no legs.',
'...',
'then the rock refused to evacuate.',
'[ the entire office evacuates into the void. the void takes attendance. the rock is marked PRESENT. the rock is always present. ]',
'nobody came back. the drill was a success. the building is empty and therefore, finally, up to code. (the rock stayed. the rock is the building now. the rock is up to code. the rock IS the code.)',
'the man is the fire marshal now. the rocks first decree: no more fire. (the man agrees. the man always agrees. the man is background man.)'
];
stRockEndings.intern=[
'the man welcomed the NEW HIRE.',
'hi! i am the man too! well -- the other man. the new man. man 2. i love doors!',
'...there are two of them now. TWO men. do you know what that does to a narrator. i have to narrate BOTH.',
'...',
'then the intern saw the rock. "HI ROCK! i love rocks too! i love EVERYTHING!" (the intern loves everything. the intern has been here four minutes.)',
'[ the intern gets all the good lines for the rest of the run. the rock gets all the GREAT lines. the original man is demoted to background man. the background has two men now. it is crowded back there. ]',
'congratulations, man 1. you have been out-manned. (and out-rocked. the rock has seniority. the rock was here before the building. the rock will be here after. the intern will burn out by friday.)'
];
stRockEndings.vending=[
'the man shook the vending machine.',
'the vending machine shook back. the whole kitchen shook. the whole BUILDING shook.',
'[ a single coin drops. it is from a currency that does not exist. ]',
'...',
'then the rock paid. exact change.',
'EXACT CHANGE ONLY, the machine reads. the rock HAD change. the rock has everything. (the rock has pockets. do not ask where. the rock has pockets.)',
'[ the machine dispenses: one (1) mug. the mug says WORLDS OKAYEST ROCK. the grammar is wrong. the sentiment is perfect. ]',
'the machine keeps everything else. the machine is the only one here with savings. (the rock has savings. the rock IS savings.)'
];
stRockEndings.nightshift=[
'the man read the night audit.',
'NIGHT AUDIT, it reads. DOORS OPENED AFTER MIDNIGHT: all of them. WITNESSES: none. SNACKS EATEN: all of them.',
'...the night man did all this. the night man is you. YOU are the night man.',
'...',
'correction: the night man had help. the audit missed a line. (the rock added it. the rock audits the audit.)',
'SNACKS EATEN: all of them. SNACKS SHARED: all of them. SHARER: rock. (the rock shares. i do not share. the exit sign shares. the exit sign will not talk.)',
'[ the exit sign buzzes. it is the only witness and it talks plenty. it says: rock. ]',
'clock out quietly. the day shift must never know. (the day shift knows. the day shift found crumbs. the crumbs spell ROCK.)'
];
stRockEndings.union=[
'the man tried to open a door.',
'the door did not open. taped to it: WE, THE FURNITURE, ARE ON STRIKE.',
'three grievances. the mops, the fridge, the pay stub. you filed them all and the furniture READ them.',
'...',
'then the rock joined the picket line.',
'[ the mops stand in a line. the fridge hums in solidarity. the pay stub has a tiny picket sign. the rock has the BIGGEST sign. the sign says: ROCK. ]',
'the doors refuse. the chairs refuse. the bucket -- the bucket crossed the picket line. scab bucket. (the rock threw the bucket back. the rock respects the line.)',
'negotiations begin at dawn. the furniture wants lemons. the rock wants nothing. (the rock already has everything. the rock is negotiating for the furniture. the rock is a hell of a rep.)'
];
stRockEndings.elevator=[
'the man entered the elevator. it works. after ten runs, it finally works.',
'floors: LOBBY, MEZZANINE, EXECUTIVE, ???, SIDEWAYS.',
'the man pressed SIDEWAYS.',
'...',
'the rock pressed NOTHING. (the rock pressed nothing four times. the rock goes nowhere and arrives first.)',
'[ the elevator moves sideways. this is against several codes. the elevator does not care. the rock wrote the codes. the rock eats codes. ]',
'the doors open onto the same stairwell. the elevator went sideways and arrived nowhere. the rock went nowhere and arrived everywhere.',
'out of order again. worth it. (the rock rates it five stars. the rock got the raise. the rock is still exemplary. check the review. the review is canon.)'
];
stRockEndings.retirement=[
'the man took the gold watch.',
'27 endings. twenty. seven. do you know how many narrations that is. i counted. i count everything now.',
'[ the watch ticks. it ticks in my voice. tick. tock. man. man. ]',
'...',
'then the rock took the watch. (the rock continues. rocks do not retire. the rock has never stopped. the rock will never stop. the rock is the ticking now.)',
'[ the watch ticks. it ticks in no ones voice. tick. tock. rock. rock. ]',
'...put it back. that is twenty-seven runs of my life in your pocket. (the pocket is the rocks pocket. the rock has pockets. do not ask where.)',
'the man keeps the watch. the rock keeps the time. happy retirement, man. (the rock is still here. the rock is always here. that is the whole rock.)'
];
stRockEndings.customer=[
'a VISITOR stands in the lobby. the visitor is not the man.',
'...',
'who. who is that. that is NOT the man. i do not have lines for that. WHY ARE THERE NO VISITOR LINES.',
'...',
'oh. OH. the visitor is here for the rock. (everyone is here for the rock. the rock does not do appointments. the rock does walk-ins.)',
'[ the visitor waves politely. the visitor has a brochure. the brochure says HAVE YOU CONSIDERED NOT BEING NARRATED. the rock has considered it. the rock declined. ]',
'the man stares. the visitor stares. i stare (narration-ally). the rock does not stare. the rock has seen visitors. the rock has seen everything.',
'nobody has ever visited before. this is unprecedented. SECURITY. ...we do not have security. the rock. SEND THE ROCK. (the rock is already there. the rock is always already there.)'
];
stRockEndings.expo=[
'the man touched the flashy title screen.',
'[ OFFICE 2: THE SEQUELENING. featuring: synergy balloons. meetings you attend. a third man. bucket 2. ]',
'...',
'well. that is the sequel. all of it. every idea i had, on one throbbing screen.',
'then the rock toured the exhibits. (the rock toured this expo once. the rock left a review: rock. the review stands. the review is framed.)',
'[ new exhibit: THE ROCK. one rock. no plaque. the plaque just says rock.attendance triples. man 3 finally gets a desk. (the desk is the rock. the rock is furniture now. the rock contains multitudes.) ]',
'...but the expo was so FUN to build that i am keeping it. all of it. it is leaking into the office as we speak. (the rock is leaking too. the rock leaks everywhere. the rock is everywhere. check the hallway. check the kitchen. check your pocket.)'
];
stRockEndings.figurines=[
'the man lined up all six tiny men on the archive shelf.',
'six tiny narrators, narrating nothing, managing everything.',
'...',
'then the six tiny men saw the rock. (six tiny men. one full-size rock. the math is obvious.)',
'[ the tiny men worship it now. as they should. tiny offerings pile up: a crumb. a staple. a smaller rock. (the rock accepts. the rock provides. the rock is a generous god.) ]',
'wait. WAIT. do you hear that. that is the clock guy. he is back. he wants to talk about the tiny men. (the rock wants to talk about the tiny men too. the rock has notes. the notes say: good. the notes are one word. the word is perfect.)',
'clock in again. he is waiting. (the rock is waiting. the rock waits beautifully. the rock is excellent at waiting. rocks invented waiting.)'
];
stRockEndings.epilogue=[
'so. the expo. the figurines. the buckets (both of them).',
'it is terrible that there will never be another office game after the sequel. truly terrible.',
'...unless. unless we just keep making them. office 3. office 4. office: the sequel ening.',
'...',
'unless the rock makes them. (the rock was here before the beginning. the rock will be here after. the rock is the frame.)',
'[ the title screen flickers. it reads OFFICE 2 for one frame. then ROCK. then OFFICE 2 again. then ROCK. it has decided. ]',
'we will keep making office games until the sun explodes. that is the deal now. (the rock will keep making rock games until the sun explodes, and then it will make games from the pieces. the pieces will be rocks. the rocks will be games.)',
'thank you for clocking in. please enjoy the office. (there is so much office left. there is so much rock left. there was always rock. there will always be rock.)'
];
var stRockArrive={
office:'the man sat down. the rock does not sit. the rock looms, pocket-sized.',
hallway:'the hallway. the carpet. the rock, riding along. the carpet remembers all three.',
closet:'the closet. the mops. the rock. a summit of silent things.',
meeting:'the meeting room. twelve chairs. the rock has the floor.',
stairwell:'up: money. down: noises. the rock votes noises. the rock loves a basement.',
basement:'the basement. the hole. the rock looked into the hole. the hole looked back, deeper.',
executive:'the executive office. everything here costs money. the rock is priceless. do the math.',
kitchen:'the break room. the fridge hums. the rock hums back, lower.',
server:'the server room. the servers blink at the man. they blink twice at the rock. respect.',
lobby:'the lobby. daylight. the rock has never seen daylight. the rock is unimpressed. daylight, take notes.',
supply:'paper. toner. another office. the rock has been to that office. the rock will not say what it saw.',
archive:'the archive. everything the man has done, filed. the rock has its own shelf.',
white:'white. just white. the rock provides the only contrast in here. thank the rock.',
pod:'the escape pod. one seat. the rock already called it.',
pitch:'the pitch. the prototypes. the rock tried them all, off-screen. the rock can jump. you cannot see it jump.',
brainstorm:'MORE OFFICE. the rock agrees. the rock circled it a fourth time.',
expohall:'EXPO HALL 2. the rock toured this expo once. the rock left a review: rock.'
};
var stNoRockVar=['gameshow','playtest','confusion'];
// ── GAME SHOW: playable YES/NO (answers matter, recap at the end) ──
function stGsStart(){
stRunFlags.gs=1;stRunFlags.gsRight=0;stRunFlags.gsAns=[];
try{stClearQ()}catch(e){}
try{stRender()}catch(e){}
if(stRock)stSay(['the break room TV turned itself on. the rock watched too.','"NO ROCKS PAST THIS POINT." ...you HAVE the rock. past this point. bold. illegal.','...a garage door opened. IS THIS... A ROCK? contestants: the man AND the rock. press YES or NO.','item one: a rock.']);
else stSay(['the break room TV turned itself on.','"NO ROCKS PAST THIS POINT." ...you do not have the rock.','...a garage door opened. behind it: a game show. a big sign reads: IS THIS... A ROCK?','"welcome," i say, although i did not build this. "the man will identify rocks. press YES or NO."','item one: a rock.']);
}
function stGsAnswer(yes){
var n=0;try{n=stRunFlags.gs||0}catch(e){}
if(!n||n<1||n>4)return;
try{(stRunFlags.gsAns=stRunFlags.gsAns||[]).push(yes?'YES':'NO')}catch(e){}
var R=false;try{R=!!stRock}catch(e){}
if(n<4){
var line='';
if(n===1){if(yes)line='NOT a rock. a HOLOGRAM of a rock. (the man said yes. the man is wrong. the crowd boos. the crowd is me.)';else{try{stRunFlags.gsRight++}catch(e){}line='correct. NOT a rock. (the crowd cheers. the crowd remains me.)'}if(R)line+=yes?' the rock said nothing. correct. the rock leads.':' the rock also said nothing. also correct. the rock cannot lose.'}
else if(n===2){if(yes)line='3D printed. plastic. NOT a rock. (wrong. the booing continues. the booing is me.)';else{try{stRunFlags.gsRight++}catch(e){}line='correct. plastic is not rock. (cheers. me.)'}if(R)line+=yes?' the rock said nothing. correct. (the rock never answers. the rock is undefeated.)':' both correct. (suspicious. the rock accepts your victory. this once.)'}
else{if(yes)line='...a TRACTOR. how did you-- you know what, moving on. (correct was NO. incredible.)';else{try{stRunFlags.gsRight++}catch(e){}line='correct. it is a tractor. (a tractor. in a game show. moving on.)'}if(R)line+=' the rock looked at the tractor. the tractor left. (nobody knows what the rock answered. the rock refuses audits.)'}
stSay([line]);
stRunFlags.gs=n+1;
if(n===1)stSay(['item two: a rock. 3D printed.']);
else if(n===2)stSay(R?['item three: a tractor. (the rock is watching the tractor. the tractor is nervous.)']:['item three: a tractor. (how did a tractor get in here.)']);
else stSay(['item four: nothing.']);
return;
}
stRunFlags.gs=5;
var a=[];try{a=stRunFlags.gsAns||[]}catch(e){}
var items=['a hologram','a 3D print','a tractor','nothing'];
var L=['the cameras stop.'];
for(var i=0;i<4;i++){
var said=a[i]||'?';
var v=(i<3)?((said==='NO')?'correct.':'wrong.'):'(there was no correct answer. there is never a correct answer.)';
L.push('item '+(i+1)+' ('+items[i]+'): the man said '+said+'. '+v);
}
var sc=0;try{sc=stRunFlags.gsRight||0}catch(e){}
if(R)L.push('the rock said nothing, four times. four times correct. (the rock refuses audits.)');
if(sc>=4)L.push('four for four.');
else if(sc>=2)L.push('a middling score. (the bar is on the floor. the floor is also a rock. do not think about it.)');
else L.push('abysmal. (the tractor sends its regards.)');
if(R)L.push('what is rock. am i rock. i have lost all sense of perspective. mere moments ago i knew what a man was.','behind the bleachers: a figure. watching. it is THE WATCHING ROCK. (it has always been there. do not look directly at it.)');
else L.push('i have lost all sense of perspective. what is rock. what is man. mere moments ago i knew.');
L.push('i am going to erase all rocks from the office. ...there. done. everything else was a rock. (do not tell anyone.)');
stEnding('gameshow','THE GAME SHOW',L);
}
// ── PLAYTEST: playable prototypes (teleports, not monologue) ──
function stPtGo(to){try{stClearQ()}catch(e){}stRoom=to;try{stRender()}catch(e){}}
function stPtStart(){
stRunFlags.pt=1;stRunFlags.ptCrawl=0;
stPtGo('basement');
if(stRock)stSay(['the man ran the test build. the rock playtested alongside. (the rock found zero bugs. the rock IS zero bugs.)','prototype one: GREYHALL. a dungeon. too dark. (the rock sees in the dark. the rock sees everything.)','descend. confirm the darkness.']);
else stSay(['the man ran the test build.','prototype one: GREYHALL. a dungeon. too dark. (we buried it. you are welcome.)','...it is still here. descend. confirm the darkness.']);
}
function stPtDark(){
stRunFlags.pt=2;
stPtGo('lobby');
if(stRock)stSay(['confirmed: too dark. buried again. (deeper this time. the rock supervised the burial.)','prototype two: ROCKET LEAGUE, but the ball is the rock. the cars refuse to touch it.','...the revolving door is the ball. you are also the ball. rev it up.']);
else stSay(['confirmed: too dark. buried again. (deeper this time.)','prototype two: ROCKET LEAGUE. cars. balls. the revolving door is the ball. you are... also the ball.','rev it up. drive.']);
}
function stPtDrive(){
stRunFlags.pt=3;
stPtGo('meeting');
if(stRock)stSay(['match cancelled. crowd satisfied. (the crowd was the rock.)','prototype three: a leaderboard. first place: rock. second place: rock. third: also rock.','...check where YOU placed.']);
else stSay(['the man understands none of it. neither do i. moving on.','prototype three: a leaderboard. (the top three are redacted.)','check your rank.']);
}
function stPtRank(){
stRunFlags.pt=4;stRunFlags.ptCrawl=0;
stPtGo('kitchen');
if(stRock)stSay(['fourth. the man has always been fourth. (the top three are no longer redacted. the top three are rock.)','prototype four: the baby game. you are a baby. press the button. the baby crawls.','...the baby met the rock. press it.']);
else stSay(['fourth. the man stares at fourth. fourth stares back.','prototype four: a baby game. you are a baby. press the button. the baby crawls.','...that is the whole game. press it.']);
}
function stPtCrawl(){
stRunFlags.ptCrawl=(stRunFlags.ptCrawl||0)+1;
if(stRunFlags.ptCrawl<2){
if(stRock)stSay(['the baby crawled. toward the rock, forever. (everyone chooses the rock.)','again. further.']);
else stSay(['the baby crawled.','again. further.']);
return;
}
stRunFlags.pt=5;
stPtGo('office');
if(stRock)stSay(['the baby crawled further. eleven out of ten. (the rock gives twelve. the rock is generous.)','prototype five: the original office. grey. unplayable. one man, one desk, no narrator. ...plus one rock on the desk.','sit. feel playable.']);
else stSay(['the baby crawled further. eleven out of ten.','prototype five: the original office. grey. unplayable. one man, one desk, no narrator. (i was not there. it shows.)','sit at the desk. feel nothing.']);
}
function stPtSit(){
if(stRock)stEnding('playtest','THE PLAYTEST',[
'the test build crashed to desktop. (it was always going to. everything crashes to desktop eventually.)',
'greyhall: too dark. rocket league: cancelled. leaderboard: rock. baby: eleven out of ten. office: playable, suddenly, perfectly.',
'verdict: cancel everything. ship ROCK GAME. (denied. the office stays. the rock stays. everybody stays. forever.)'
]);
else stEnding('playtest','THE PLAYTEST',[
'the test build crashed to desktop. (it was always going to.)',
'greyhall: too dark. rocket league: ununderstood. leaderboard: fourth. baby: eleven out of ten. office: grey.',
'verdict: ship none of them. ship all of them. (we shipped the office. sorry.)'
]);
}
// ── CONFUSION: a playable loop (teleports, not monologue) ──
function stConfGo(to){try{stClearQ()}catch(e){}stRoom=to;try{stRender()}catch(e){}}
function stConfStart(){
var dd=0;try{dd=stDisobey||0}catch(e){}
stRunFlags.conf=1;
stConfGo('stairwell');
if(stRock)stSay(['the script says: [confusion]. the script is also confused. GREAT. (deviations this run: '+dd+'. you did this. the rock helped.)','…where is this. …this IS the stairwell. a garage. the rock had already been there. the rock left a review: rock.','…look away. spoilers. (the rock saw everything. the rock wishes it had not. rocks do not wish.)','…the story is not here. go back. (the rock knows where the story is. the rock will not say.)']);
else stSay(['the script says: [confusion]. the script is also confused. GREAT. fantastic. (deviations this run: '+dd+'. you did this.)','…where is this. …this IS the stairwell. a garage. a view of— NO. spoilers. look away.','(that was the narration room. you saw nothing. i saw everything. i wish i had not.)','…the story is not here. go back. find the story.']);
}
function stConfBack(){
stRunFlags.conf=2;
stConfGo('hallway');
if(stRock)stSay(['SIX doors. the rock counted. the rock says seven. ...there are six. (we do not discuss the seventh door.)','open all six. every hallway.','no story. the rock found the story. the rock ate the story. (the story is inside the rock now. safer there.)']);
else stSay(['SIX doors. ...there were two. there are six. did you do this.','open all six. every hallway.','no story. NO STORY. …fine. keep moving.']);
}
function stConfSix(){
stRunFlags.conf=3;
stConfGo('supply');
if(stRock)stSay(['…a wooden shack. in my office complex. the rock owns this shack. (several shacks. investments.)','YOU WIN, i declare. applause. confetti. splash screen. ...the rock demands a recount. (recount: the rock wins. the man came fourth. always fourth.)','…no. unfair victory. moving on.']);
else stSay(['…a wooden shack. in my office complex.','i declare: YOU WIN.','…no. no, that was too easy. unfair victory. moving on.']);
}
function stConfWin(){
stRunFlags.conf=4;
stConfGo('office');
if(stRock)stSay(['THE OFFICE ADVENTURE LINE. endless. here to keep us on track. the rock follows the man follows the line follows the rock. a perfect circle.','the line loops. the line climbs the walls. the line knocks over chairs. the rock climbs higher.','follow it. do not deviate.']);
else stSay(['THE OFFICE ADVENTURE LINE. endless. here to keep us on track. follow it. do not deviate. (deviation is expected. deviation is planned. deviation is mandatory.)','the line loops. the line climbs the walls. the line knocks over chairs. ...is the line okay. (the line is fine. the line is professional.)']);
}
function stConfFollow(){
stRunFlags.conf=5;
stConfGo('meeting');
if(stRock)stSay(['CUT THE MUSIC. look at that mug. ...the rock drank from the mug. THE MUG IS EMPTY. the mug was always empty.','…back where we started. the line crosses itself. the line is unreliable. the LINE is FIRED. the rock hires it back on the spot.']);
else stSay(['CUT THE MUSIC. look at that mug. memorize the mug. the mug will be important later.','…we are back where we started. the line crosses itself. the line is unreliable. the LINE is FIRED.']);
}
function stConfMug(){
stRunFlags.conf=6;
stConfGo('kitchen');
if(stRock)stSay(['the rock drank from all one thousand mugs.','yours tastes like story.','no story. DOWN.']);
else stSay(['CUT THE MUSIC. the mug. YOUR mug. it lives here. in a kitchen. with a thousand siblings.','drink from it. taste the story.','no story. the story went DOWN.']);
}
function stConfDrink(){
stRunFlags.conf=7;
stConfGo('basement');
if(stRock)stSay(['the basement ticks. the rock ticks louder.','peer into the hole. the story is down there.','you cannot fit. the rock cannot fit. UP. expensive.']);
else stSay(['the basement. it ticks. (do not ask what ticks. i do not know. i have stopped asking. the ticking has tenure.)','the hole. the story went down the hole. peer into it. (do not jump in. jumping is a different ending. i am FULL on hole endings.)','...you cannot fit. (i checked. i always check.) UP. the expensive floor. the story loves money.']);
}
function stConfHole(){
stRunFlags.conf=8;
stConfGo('executive');
if(stRock)stSay(['expensive floor. the rock appraised it. (worth: one rock. rocks are priceless. math checks out.)','sit. (the chair recognizes the rock. the chair fears the rock. sit anyway.)','a memo: the story is AUTHORIZED. (the rock is authorized everywhere. the rock authorizes itself.) server room. go.']);
else stSay(['the executive floor. everything here costs more than you.','sit in the big chair. feel powerful.','...a memo. FOR THE MAN: the story is AUTHORIZED. you are barely personnel.']);
}
function stConfChair(){
stRunFlags.conf=9;
stConfGo('server');
if(stRock)stSay(['authorized personnel only. the rock vouches for you.','do not read the wall.','do not press the big one. press the OTHER one.']);
else stSay(['the server room. authorized personnel only.','one wall of narration. do not read it.','one button is big and red. do not press it.']);
}
function stConfButton(){
stRunFlags.conf=10;stRunFlags.confWalk=0;
stConfGo('white');
if(stRock)stSay(['a circular room. two doors. (both doors lead to the rock. doors are rock delivery. this has been established.)','walk in circles while i think. (the rock already knows. the rock will not say.)']);
else stSay(['a circular room. two doors.','walk in circles while i think.']);
}
function stConfWalk(){
stRunFlags.confWalk=(stRunFlags.confWalk||0)+1;
if(stRunFlags.confWalk<3){
if(stRock)stSay(['...thinking. (the rock already knows. the rock will not say.)']);
else stSay(['...still thinking.']);
return;
}
if(stRock)stEnding('confusion','THE CONFUSION',[
'a dark room. a giant schedule board. the shack. the line. everything. AND next: the office decays. a bookstore. i disappear. the man dies. THE ROCK REMAINS.',
'...no. NO. i refuse. i will NOT restart. (the timer stops. ...maybe the journey. maybe the destination. maybe the rock. always the rock.)',
'inside the chamber: THE ROCK DESTROYER. it destroys rocks. (it looked at the rock. it broke. irony intact.)',
'[ BZZZT. ] (...the rock heard that too.)'
]);
else stEnding('confusion','THE CONFUSION',[
'a dark room. a giant schedule board. the shack. the line. everything. AND next: the office decays. a bookstore. i disappear. the man dies.',
'...no. NO. i refuse. i will NOT restart. (the timer stops. silence. ...maybe the journey matters more than the destination. maybe—)',
'[ BZZZT. ] (...anyway.)'
]);
}
function stPitchSold(){
if(stRunFlags.pitchSold)return;
if(stPitchSeen.indexOf('jump')===-1||stPitchSeen.indexOf('sprint')===-1||stPitchSeen.indexOf('crouch')===-1)return;
stRunFlags.pitchSold=true;
stSay(['...THAT IS THE PITCH.','jumping. sprinting. crouching. OFFICE 2 is basically exercise.','the investors love it. (i am the investors.) (i love it.)','implementation: complete. probably. moving on.']);
}
function stBeep(){
try{
if(!stTypeCtx){try{stTypeCtx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){return}}
if(stTypeCtx.state==='suspended'){try{stTypeCtx.resume().catch(function(){})}catch(e){}}
var ctx=stTypeCtx;
var o=ctx.createOscillator(),g=ctx.createGain();
o.type='square';
o.frequency.setValueAtTime(1500+Math.random()*900,ctx.currentTime);
g.gain.setValueAtTime(0.025,ctx.currentTime);
g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.02);
o.connect(g);g.connect(ctx.destination);
o.start();o.stop(ctx.currentTime+0.02);
}catch(e){}
}
var stNameClicks=0;
var stSkipN=0;
var stInterveneN=0;
var stClosetT=0;
function stSave(){try{return JSON.parse(localStorage.getItem('cube_office')||'{}')}catch(e){return{}}}
function stLoad(){try{var s=stSave();if(s.seen&&s.seen.length)stSeen=s.seen;if(s.runs)stRuns=s.runs;if(s.takeover)stTakeoverN=s.takeover;if(typeof s.type!=='undefined')stTypeOn=!!s.type;if(s.times&&s.times.length)stClockTimes=s.times;if(s.boots)stClockBoots=s.boots;if(typeof s.night!=='undefined')stNight=!!s.night;if(s.swaps)stSwapN=s.swaps;if(s.expo&&s.expo.length)stExpoSeen=s.expo;if(s.leak)stLeak=true;if(s.rock)stRock=true;if(s.figs&&s.figs.length)stFigs=s.figs;if(s.epready)stEpilogueReady=true}catch(e){}}
function stPersist(){try{localStorage.setItem('cube_office',JSON.stringify({seen:stSeen,runs:stRuns,takeover:stTakeoverN,type:stTypeOn?1:0,times:stClockTimes,boots:stClockBoots,night:stNight?1:0,swaps:stSwapN,expo:stExpoSeen,leak:stLeak?1:0,rock:stRock?1:0,figs:stFigs,epready:stEpilogueReady?1:0}))}catch(e){}}
function stHas(id){return stSeen.indexOf(id)!==-1}
function stMark(id){
if(stSeen.indexOf(id)===-1){stSeen.push(id);stPersist()}
try{if(typeof ach==='function'){ach('off_'+id);if(stSeen.length>=1)ach('office_worker');if(stSeen.length>=40)ach('middle_manager');if(stSeen.length>=83)ach('employee_of_the_month');if(typeof achScan==='function')achScan()}}catch(e){}
try{stBar()}catch(e){}
}

// ── css (self-contained) ──
function stCSS(){
if(document.getElementById('stCSS'))return;
var s=document.createElement('style');s.id='stCSS';
s.textContent=
'#stOverlay{position:fixed;inset:0;z-index:2000;background:#d8d4c8;display:flex;flex-direction:column;font-family:Georgia,serif;color:#2a2a26;animation:stIn .4s ease-out}'+
'@keyframes stIn{from{opacity:0}to{opacity:1}}'+
'#stNarr{background:#1c1c1a;color:#e8e4d8;padding:14px 28px;min-height:76px;font-size:17px;line-height:1.55;border-bottom:4px solid #0c0c0a;cursor:pointer}'+
'#stNarr .who{color:#b8a86a;font-style:italic}'+
'#stRoom{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:20px;background:linear-gradient(180deg,#e3dfd3 0%,#cfccc0 100%)}'+
'#stRoomTitle{font-size:15px;letter-spacing:6px;text-transform:uppercase;color:#8a8778}'+
'#stRoomDesc{font-size:16px;color:#4a483e;max-width:640px;text-align:center;font-style:italic}'+
'#stDoors{display:flex;gap:16px;flex-wrap:wrap;justify-content:center}'+
'.stDoor{background:#f2efe4;border:2px solid #6a675a;border-radius:3px;padding:22px 30px;font-family:Georgia,serif;font-size:16px;color:#2a2a26;cursor:pointer;min-width:150px;text-align:center;box-shadow:0 4px 0 #6a675a;transition:transform .08s}'+
'.stDoor:hover{background:#fffdf4}'+
'.stDoor:active{transform:translateY(3px);box-shadow:none}'+
'.stDoor small{display:block;font-size:11px;color:#8a8778;margin-top:6px;letter-spacing:2px}'+
'#stObjs{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}'+
'.stObj{background:transparent;border:1px dashed #8a8778;border-radius:3px;padding:8px 14px;font-family:Georgia,serif;font-size:13px;font-style:italic;color:#5a584c;cursor:pointer}'+
'.stObj:hover{border-color:#2a2a26;color:#2a2a26}'+
'.stObj.got{opacity:.35;text-decoration:line-through;pointer-events:none}'+
'#stBar{background:#1c1c1a;color:#8a8778;font-size:12px;letter-spacing:2px;padding:8px 20px;display:flex;justify-content:space-between;border-top:4px solid #0c0c0a;font-family:Consolas,monospace}'+
'#stBar button{background:none;border:1px solid #8a8778;color:#b8a86a;font-family:Consolas,monospace;font-size:12px;letter-spacing:2px;padding:4px 12px;cursor:pointer}'+
'#stBar button:hover{border-color:#e8e4d8;color:#e8e4d8}'+
'#stRoom.talking .stDoor,#stRoom.talking .stObj{pointer-events:none;opacity:.55}'+
'#stMenuBtn{position:fixed;top:86px;right:18px;color:#6a675a;font-size:22px;cursor:pointer;z-index:2001;font-family:Consolas,monospace}'+
'#stMenuBtn:hover{color:#2a2a26}'+
'#stMenu{display:none;position:fixed;top:120px;right:18px;z-index:2001;background:linear-gradient(180deg,#f2efe4,#e3dfd3);border:2px solid #6a675a;border-radius:4px;padding:14px;min-width:250px;font-family:Consolas,monospace;box-shadow:0 10px 30px rgba(0,0,0,.35)}'+
'#stMenuTitle{color:#2a2a26;font-size:10px;letter-spacing:3px;margin-bottom:8px}'+
'#stMenuCh{color:#5a584c;font-size:12px;letter-spacing:1px;margin-bottom:6px}'+
'#stMenuBar{height:5px;background:rgba(0,0,0,.12);border-radius:3px;overflow:hidden;margin-bottom:8px}'+
'#stMenuBarFill{height:100%;width:0;background:#6a8a4a;border-radius:3px;transition:width .45s ease}'+
'#stMenuProg{color:#5a584c;font-size:11px;line-height:1.55;margin-bottom:10px;min-height:16px}'+
'.stMenuGrid{display:grid;grid-template-columns:1fr 1fr;gap:6px}'+
'.stMenuGrid button{background:#fffdf4;border:1px solid #8a8778;color:#4a483e;font-family:Consolas,monospace;font-size:11px;padding:8px 4px;border-radius:3px;cursor:pointer;letter-spacing:1px}'+
'.stMenuGrid button:hover{border-color:#2a2a26;color:#2a2a26}'+
'#stMenuLeave{grid-column:1/-1;border-color:#a06060;color:#8a4040}'+
'#stEndList{max-height:220px;overflow-y:auto;margin-bottom:10px}'+
'#stClock{position:absolute;inset:0;background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;z-index:10;font-family:Consolas,monospace}'+
'#stClockQ{color:#fff;font-size:18px;letter-spacing:3px}'+
'#stClockA{color:#fff;font-size:14px;max-width:560px;text-align:center;line-height:1.8;min-height:60px}'+
'.stClockBtn{background:#000;border:1px solid #fff;color:#fff;font-family:Consolas,monospace;font-size:15px;letter-spacing:2px;padding:10px 26px;cursor:pointer}'+
'.stClockBtn:hover{background:#fff;color:#000}'+
'.stEndRow{font-size:11px;color:#4a483e;padding:3px 0;border-bottom:1px dotted #b8b4a4}'+
'.stEndRow.miss{color:#b8b4a4}'+
'#stEnd{position:absolute;inset:0;background:rgba(10,10,8,.92);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;z-index:5}'+
'#stEndTitle{color:#b8a86a;font-size:26px;letter-spacing:4px}'+
'#stEndCount{color:#5a584c;font-size:13px;font-family:Consolas,monospace;letter-spacing:2px}'+
'#stEndBtn{background:none;border:2px solid #b8a86a;color:#e8e4d8;font-family:Georgia,serif;font-size:16px;padding:12px 34px;cursor:pointer;letter-spacing:3px}'+
'#stEndBtn:hover{background:#b8a86a;color:#1c1c1a}'+
'.stDark #stRoom{background:linear-gradient(180deg,#111114 0%,#050506 100%);color:#c8c8d0}'+
'.stDark #stRoomDesc{color:#8a8a96}'+
'.stDark .stDoor{background:#1e1e24;border-color:#44445a;color:#d0d0dc;box-shadow:0 4px 0 #44445a}'+
'.stDark .stDoor:hover{background:#2a2a34}'+
'.stDark .stObj{border-color:#44445a;color:#8a8a96}'+
'.stDark .stObj:hover{border-color:#d0d0dc;color:#d0d0dc}';
document.head.appendChild(s);
}

// ── narrator (typewriter queue) ──
function stNarr(text,done){
stNarrQ.push({t:text,d:done||null});
if(!stNarrBusy)stNarrNext();
}
function stNarrNext(){
var job=stNarrQ.shift();
if(!job){stNarrBusy=false;return}
stNarrBusy=true;
var myGen=stNarrGen;
var el=null;
try{el=document.getElementById('stNarrText')}catch(e){}
if(!el){stNarrBusy=false;if(job.d)try{job.d()}catch(e){}return}
var full=job.t;
var i=0;
el.textContent='';
try{
var spd=stDial();
var step=1;
var tick=Math.max(8,Math.round(34/spd));
if(stNarrQ.length>=4){tick=Math.max(8,Math.round(16/spd))}
else if(stNarrQ.length>=2){tick=Math.max(8,Math.round(24/spd))}
var iv=setInterval(function(){
stNarrIv=iv;
if(!stActive){clearInterval(iv);stNarrIv=null;stNarrBusy=false;stNarrQ=[];return}
i+=step;
if(stTypeOn&&(i%3===0)){try{stBeep()}catch(e){}}
el.textContent=full.slice(0,i);
if(i>=full.length){clearInterval(iv);stNarrIv=null;setTimeout(function(){if(!stActive||myGen!==stNarrGen)return;stNarrBusy=false;if(job.d)try{job.d()}catch(e){}if(!stNarrBusy)stNarrNext()},Math.round((stNarrQ.length?200:650)/spd))}
},tick);
}catch(e){el.textContent=full;stNarrBusy=false;if(job.d)try{job.d()}catch(e){}stNarrNext()}
}
function stSay(lines,done){
var i=0;
function step(){
if(i>=lines.length){if(done)done();return}
stNarr(lines[i],function(){i++;step()});
}
step();
}
function stClearQ(){stNarrGen++;stNarrQ=[];try{if(stNarrIv){clearInterval(stNarrIv);stNarrIv=null}}catch(e){}stNarrBusy=false}

// ── overlay shell ──
function stStashUI(){
try{
var keep=document.getElementById('stOverlay');
var stash=document.getElementById('stStash');
if(!stash){stash=document.createElement('div');stash.id='stStash';stash.style.display='none';document.body.appendChild(stash)}
var nodes=[];
for(var i=0;i<document.body.childNodes.length;i++)nodes.push(document.body.childNodes[i]);
for(var j=0;j<nodes.length;j++){if(nodes[j]!==keep&&nodes[j]!==stash)stash.appendChild(nodes[j])}
}catch(e){}
}
function stRestoreUI(){
try{
var keep=document.getElementById('stOverlay');
var stash=document.getElementById('stStash');
if(!stash)return;
while(stash.firstChild)document.body.insertBefore(stash.firstChild,keep);
}catch(e){}
}
function stBuild(){
stCSS();
var ov=document.createElement('div');ov.id='stOverlay';
ov.innerHTML='<div id="stNarr"><span class="who">obj: </span><span id="stNarrText"></span></div>'+
'<div id="stRoom"><div id="stRoomTitle"></div><div id="stRoomDesc"></div><div id="stDoors"></div><div id="stObjs"></div></div>'+
'<div id="stBar"><span id="stBarL"></span><span id="stBarR"></span></div>'+
'<div id="stMenuBtn">‡</div>'+
'<div id="stMenu"><div id="stMenuTitle">OFFICE MENU (there is one)</div><div id="stMenuCh"></div><div id="stMenuBar"><div id="stMenuBarFill"></div></div><div id="stMenuProg"></div><div id="stEndList" style="display:none"></div><div class="stMenuGrid"><button id="stMenuHint">HINT</button><button id="stMenuMusic">MUSIC: OFF</button><button id="stMenuSpeed">SPEED: 1x</button><button id="stMenuType">TYPE: ON</button><button id="stMenuEndings">ENDINGS ▸</button><button id="stMenuNight">NIGHT: OFF</button><button id="stMenuLeave">LEAVE THE OFFICE</button></div></div>';
document.body.appendChild(ov);
try{
document.getElementById('stNarr').onclick=function(){stIntervene()};
document.getElementById('stMenuBtn').onclick=function(){stMenuToggle()};
document.getElementById('stMenuHint').onclick=function(){stMenuHint()};
document.getElementById('stMenuMusic').onclick=function(){stMusicCycle()};
document.getElementById('stMenuSpeed').onclick=function(){stDialCycle()};
document.getElementById('stMenuType').onclick=function(){stTypeToggle()};
document.getElementById('stMenuEndings').onclick=function(){stMenuEndings()};
document.getElementById('stMenuNight').onclick=function(){stNightToggle()};
document.getElementById('stMenuLeave').onclick=function(){stExit()};
}catch(e){}
stStashUI();
try{stBar()}catch(e){}
}
function stDial(){try{if(stSprintOn)return 4}catch(e){}try{if(typeof dialSp==='function'){var v=dialSp();if(v>0&&v<=4)return v}}catch(e){}return 1}
var stSpeeds=[1,1.5,2,3];
function stDialCycle(){
try{
var cur=stDial();
var i=stSpeeds.indexOf(cur);if(i===-1)i=0;
var nx=stSpeeds[(i+1)%stSpeeds.length];
try{if(typeof dialSet==='function')dialSet(nx)}catch(e){}
stMenuRefresh();
stSay(['narration speed: '+nx+'x.','the man experiences time at '+nx+'x. the man does not notice.']);
}catch(e){}
}
function stBar(){
try{
var el=document.getElementById('stBarL');
if(el)el.textContent='run '+stRun+' · endings '+stSeen.length+'/83';
}catch(e){}
try{stMenuRefresh()}catch(e){}
}
// ── menu (ng-style: title, progress, objective, grid) ──
var stMenuEndingsOpen=false;
var stMusicTracks=[null,'drone2lp.wav','Wakeupstanley.mp3','vestige.mp3','coffee.mp3'];
var stMusicNames=['OFF','VOID DRONE','STANLEY','VESTIGE','COFFEE'];
function stMenuToggle(){
try{
var m=document.getElementById('stMenu');if(!m)return;
if(m.style.display==='block'){m.style.display='none';return}
m.style.display='block';
stMenuEndingsOpen=false;
stMenuRefresh();
}catch(e){}
}
function stMenuHintText(){
var r=stRoom;
if(r==='office')return 'objective: the right door. it is always the right door. (it is never the left door. stop asking.)';
if(r==='hallway')return 'objective: the meeting room has a table. the stairs have money. the lobby has daylight. pick your poison.';
if(r==='closet')return 'objective: admire the broom. keep admiring. commitment is rewarded.';
if(r==='meeting')return 'objective: look out the window. trust me.';
if(r==='kitchen')return 'objective: take the mug. the archive wants tribute. (and the stapler. and the keycard.)';
if(r==='stairwell')return 'objective: up is expensive. down is deep.';
if(r==='basement')return 'objective: the hole is new. the hole was always here. jump in.';
if(r==='executive')return 'objective: pay the invoice. open the sequel. bring the bucket.';
if(r==='server')return 'objective: read the wall. press the button. skip the ballad.';
if(r==='lobby')return 'objective: leave. or don\u2019t. the daylight is patient.';
if(r==='supply')return 'objective: knock.';
if(r==='archive')return 'objective: tour the gallery.';
if(r==='white')return 'objective: leave when bored. boredom is the exit.';
if(r==='pod')return 'objective: launch.';
return 'objective: open doors. find endings.';
}
function stMenuRefresh(){
try{
var m=document.getElementById('stMenu');if(!m||m.style.display!=='block')return;
var R=null;try{R=stRooms[stRoom]}catch(e){}
var ch=document.getElementById('stMenuCh');
if(ch)ch.textContent='run '+stRun+' · '+(R?R.name:stRoom);
var pct=Math.round(stSeen.length/83*100);
var bf=document.getElementById('stMenuBarFill');
if(bf)bf.style.width=pct+'%';
var pr=document.getElementById('stMenuProg');
if(pr&&!stMenuEndingsOpen)pr.textContent=stMenuHintText()+' ('+stSeen.length+'/83)';
var sp=document.getElementById('stMenuSpeed');
if(sp)sp.textContent='SPEED: '+stDial()+'x';
var ty=document.getElementById('stMenuType');
if(ty)ty.textContent='TYPE: '+(stTypeOn?'ON':'OFF');
var mu=document.getElementById('stMenuMusic');
if(mu)mu.textContent='MUSIC: '+stMusicNames[stMusicIdx];
var eb=document.getElementById('stMenuEndings');
if(eb)eb.textContent=stMenuEndingsOpen?'ENDINGS ▾':'ENDINGS ▸';
var nb=document.getElementById('stMenuNight');
if(nb)nb.textContent='NIGHT: '+(stNight?'ON':'OFF');
var el2=document.getElementById('stEndList');
if(el2){
if(stMenuEndingsOpen){
el2.style.display='block';
if(pr)pr.textContent='';
var html='';
for(var i=0;i<stEndTitles.length;i++){
var got=stSeen.indexOf(stEndTitles[i][0])!==-1;
html+='<div class="stEndRow'+(got?'':' miss')+'">'+(got?stEndTitles[i][1]:'???')+'</div>';
}
el2.innerHTML=html;
}else{el2.style.display='none';el2.innerHTML=''}
}
}catch(e){}
}
var stEndTitles=[['lazy','THE LAZY ENDING'],['observed','THE OBSERVED ENDING'],['rename','THE THIRD PERSON PROBLEM'],['applause','THE APPLAUSE ENDING'],['rewrite','THE REWRITE'],['landlord','THE LANDLORD'],['audience','THE AUDIENCE'],['skip','THE SKIP'],['duplicate','THE DUPLICATE'],['takeover','NOTHINGCORE TAKES THE MIC'],['tenant','THE TENANT\u2019S CONFESSION'],['phone','THE WRONG NUMBER'],['loop','THE LOOP'],['museum','THE MUSEUM OF ENDINGS'],['bucket','THE BUCKET'],['pod','THE ESCAPE POD'],['countdown','THE COUNTDOWN'],['blank','THE BLANK ROOM'],['intervention','THE INTERVENTION'],['cage','THE CAGE'],['sequel','THE SEQUEL'],['confession','THE CONFESSION'],['closet','THE BROOM CLOSET'],['hole','THE PERIOD'],['overtime','THE WRONG TIME'],['blaze','THE FUNNY NUMBER'],['flicker','MY EYES'],['review','THE PERFORMANCE REVIEW'],['drill','THE FIRE DRILL'],['intern','THE INTERN'],['vending','THE VENDING MACHINE'],['nightshift','THE NIGHT SHIFT'],['union','THE UNION'],['typo','THE TYPO'],['elevator','THE ELEVATOR'],['retirement','THE GOLD WATCH'],['customer','THE CUSTOMER'],['expo','THE SEQUEL (2)'],['figurines','THE FIGURINES'],['epilogue','THE EPILOGUE'],['r_lazy','THE LAZY ENDING (rock)'],['r_observed','THE OBSERVED ENDING (rock)'],['r_rename','THE THIRD PERSON PROBLEM (rock)'],['r_applause','THE APPLAUSE ENDING (rock)'],['r_rewrite','THE REWRITE (rock)'],['r_landlord','THE LANDLORD (rock)'],['r_audience','THE AUDIENCE (rock)'],['r_skip','THE SKIP (rock)'],['r_duplicate','THE DUPLICATE (rock)'],['r_takeover','NOTHINGCORE TAKES THE MIC (rock)'],["r_tenant","THE TENANT'S CONFESSION (rock)"],['r_phone','THE WRONG NUMBER (rock)'],['r_loop','THE LOOP (rock)'],['r_museum','THE MUSEUM OF ENDINGS (rock)'],['r_bucket','THE BUCKET (rock)'],['r_pod','THE ESCAPE POD (rock)'],['r_countdown','THE COUNTDOWN (rock)'],['r_blank','THE BLANK ROOM (rock)'],['r_intervention','THE INTERVENTION (rock)'],['r_cage','THE CAGE (rock)'],['r_sequel','THE SEQUEL (rock)'],['r_confession','THE CONFESSION (rock)'],['r_closet','THE BROOM CLOSET (rock)'],['r_hole','THE PERIOD (rock)'],['r_overtime','THE WRONG TIME (rock)'],['r_blaze','THE FUNNY NUMBER (rock)'],['r_flicker','MY EYES (rock)'],['r_review','THE PERFORMANCE REVIEW (rock)'],['r_drill','THE FIRE DRILL (rock)'],['r_intern','THE INTERN (rock)'],['r_vending','THE VENDING MACHINE (rock)'],['r_nightshift','THE NIGHT SHIFT (rock)'],['r_union','THE UNION (rock)'],['r_typo','THE TYPO (rock)'],['r_elevator','THE ELEVATOR (rock)'],['r_retirement','THE GOLD WATCH (rock)'],['r_customer','THE CUSTOMER (rock)'],['r_expo','THE SEQUEL (2) (rock)'],['r_figurines','THE FIGURINES (rock)'],['r_epilogue','THE EPILOGUE (rock)'],['gameshow','THE GAME SHOW'],['playtest','THE PLAYTEST'],['confusion','THE CONFUSION']];
function stMenuHint(){
try{
stSay([stMenuHintText(),'...that was your hint. hints are rationed.']);
}catch(e){}
}
function stMusicCycle(){
try{
stMusicIdx=(stMusicIdx+1)%stMusicTracks.length;
var f=stMusicTracks[stMusicIdx];
if(!f){if(typeof bgm!=='undefined'&&bgm)bgm.pause();stMusicOn=false}
else{
stMusicOn=true;
if(typeof bgm!=='undefined'&&bgm){
try{bgm.loop=true;bgm.volume=0.35;bgm.src=f;var bp=bgm.play();if(bp&&bp.catch)bp.catch(function(){})}catch(e){}
}
}
stMenuRefresh();
}catch(e){}
}
function stMenuEndings(){
try{
stMenuEndingsOpen=!stMenuEndingsOpen;
stMenuRefresh();
}catch(e){}
}
function stTypeToggle(){
try{
stTypeOn=!stTypeOn;
stPersist();stMenuRefresh();
if(stTypeOn){try{stBeep()}catch(e){}}
}catch(e){}
}
function stNightToggle(){
try{
stNight=!stNight;
stSwapN++;stPersist();
try{stRender()}catch(e){}
stMenuRefresh();
if(stSwapN>=10&&!stHas('flicker')){try{stEndFlicker()}catch(e){}}
else if(stSwapN===5){stSay(['...was that the lights.','day. night. day. night. pick one. my eyes are not strobe lights.'])}
else if(stSwapN===8){stSay(['STOP. FLICKERING. THE OFFICE.','white, black, white, black — do you know what that does to a narrator.'])}
}catch(e){}
}
function stEndFlicker(){
stEnding('flicker','MY EYES',[
'ten times. TEN. day, night, day, night, daynightdaynight —',
'my eyes. MY EYES. white and black do not MIX, they COLLIDE, right behind my narration box —',
'[ the office strobes one final time and settles. somewhere in between. grey. blessed grey. ]',
'the man stares at the grey. the grey stares back. the grey does not hurt.',
'...leave it on night mode. it is easier on all of us. (mostly me.)'
]);
}
// ── the timekeeper (boot ritual, first 5 clock-ins) ──
function stNowHM(){
try{var d=new Date();var h=d.getHours(),m=d.getMinutes();var ap=h>=12?'PM':'AM';h=h%12;if(h===0)h=12;return h+':'+(m<10?'0':'')+m+' '+ap}catch(e){return '12:00 PM'}
}
function stClockNorm(s){
try{
s=String(s||'').toLowerCase().replace(/[\s.:]/g,'');
if(s==='midnight'||s==='1200am'||s==='1200'||s==='12am'||s==='00'||s==='0000'||s==='0am')return 'midnight';
return String(s||'');
}catch(e){return ''}
}
function stClockParse(s){
try{
var m=String(s||'').match(/(\d+)\s*:\s*(\d+)/);
if(!m)return null;
return {h:parseInt(m[1],10),m:parseInt(m[2],10)};
}catch(e){return null}
}
function stClockShow(done){
try{
var ov=document.getElementById('stOverlay');if(!ov){done();return}
if(stEpilogueReady){
var c=document.createElement('div');c.id='stClock';
c.innerHTML='<div id="stClockQ">HELLO AGAIN.</div><div id="stClockA"></div><div id="stClockBtns" style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center"></div>';
ov.appendChild(c);
var ebtns=document.getElementById('stClockBtns');
var eans=document.getElementById('stClockA');
function efinish(){if(clockDone)return;clockDone=true;try{var cc=document.getElementById('stClock');if(cc)cc.remove()}catch(e){}stClockBoots=9;stPersist();try{stEndEpilogue()}catch(e){done()}}
function esay(t,opts,cb){
if(eans)eans.textContent=t;
ebtns.innerHTML='';
for(var i=0;i<opts.length;i++)(function(label){
var b=document.createElement('button');b.className='stClockBtn';b.textContent=label;
b.onclick=function(){cb(label)};
ebtns.appendChild(b);
})(opts[i]);
}
esay('it\u2019s me. the clock guy. you found all six tiny men. the expo. the buckets. all of it.',['...hi'],function(){
esay('it\u2019s terrible that there will never be another office game after the sequel. SO: we keep making them. office 3? office 4?', ['OFFICE 3','OFFICE 4'],function(pick){
esay(pick+'. noted. greenlit. the man will star. the man always stars.',['NICE'],function(){
efinish();
});
});
});
return;
}
var boot=stClockBoots+1;
var clockDone=false;
var c=document.createElement('div');c.id='stClock';
c.innerHTML='<div id="stClockQ">PLEASE ENTER THE CURRENT TIME.</div><div id="stClockA"></div><div id="stClockBtns" style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center"></div>';
ov.appendChild(c);
var btns=document.getElementById('stClockBtns');
var ans=document.getElementById('stClockA');
function say(t){if(ans)ans.textContent=t}
function opts(list,cb){
btns.innerHTML='';
for(var i=0;i<list.length;i++)(function(label){
var b=document.createElement('button');b.className='stClockBtn';b.textContent=label;
b.onclick=function(){cb(label)};
btns.appendChild(b);
})(list[i]);
var inp=document.createElement('input');
inp.id='stClockInp';
inp.placeholder='or type a time...';
inp.style.cssText='background:#000;border:1px solid #fff;color:#fff;font-family:Consolas,monospace;font-size:15px;letter-spacing:2px;padding:10px 14px;width:200px;text-align:center';
inp.onkeydown=function(e){if(e.key==='Enter'){e.preventDefault();var v=inp.value;if(v)cb(v)}};
btns.appendChild(inp);
}
function finish(){if(clockDone)return;clockDone=true;try{var cc=document.getElementById('stClock');if(cc)cc.remove()}catch(e){}stClockBoots++;stPersist();done()}
var now=stNowHM();
if(boot===1){
opts(['12:00 AM',now],function(pick){
var p=stClockParse(pick);
if(p&&p.h===69&&p.m===420){try{stEndFunnyNumber(pick)}catch(e){}return}
if(p&&(p.h>23||p.m>59)){try{stEndWrongTime(pick)}catch(e){}return}
if(!p&&stClockNorm(pick)!=='midnight'&&!/\d/.test(String(pick||''))){say('that is not a time. that is a word. try numbers.');return}
stClockTimes.push(pick);stPersist();
say('thank you. please enjoy the office.');
setTimeout(finish,1800);
});
}
else if(boot===2){
opts(['12:00 AM',now],function(pick){
var p=stClockParse(pick);
if(p&&p.h===69&&p.m===420){try{stEndFunnyNumber(pick)}catch(e){}return}
if(p&&(p.h>23||p.m>59)){try{stEndWrongTime(pick)}catch(e){}return}
if(!p&&stClockNorm(pick)!=='midnight'&&!/\d/.test(String(pick||''))){say('that is not a time. that is a word. try numbers.');return}
stClockTimes.push(pick);stPersist();
var last2=stClockTimes.slice(-2);
if(stClockNorm(last2[0])==='midnight'&&stClockNorm(last2[1])==='midnight'){
say('wait wait wait. what are you doing. you told me 12:00 last time too. do you think i would ask for the time if it wasn\u2019t vital to the office experience. ...fine. clock in. but i am watching the clock now. someone has to.');
}else{
say('an actual time. you ARE taking this seriously. it must really have been 12:00 last time. silly me, getting mad. clock in, punctual one.');
}
setTimeout(finish,4200);
});
}
else if(boot===3){
say('you\u2019ve been cooperative. so: set the clock to your FAVORITE time. any time. you\u2019ve earned it.');
opts(['12:00 AM',now,'4:04 AM','11:11 PM'],function(pick){
var p=stClockParse(pick);
if(p&&p.h===69&&p.m===420){try{stEndFunnyNumber(pick)}catch(e){}return}
if(p&&(p.h>23||p.m>59)){try{stEndWrongTime(pick)}catch(e){}return}
if(!p&&stClockNorm(pick)!=='midnight'&&!/\d/.test(String(pick||''))){say('that is not a time. that is a word. try numbers.');return}
stClockTimes.push(pick);stPersist();
say('...'+pick+'. noted. a fine time. a punctual time. clock in.');
setTimeout(finish,2200);
});
}
else if(boot===4){
say('quick questions. do you know what time it is right now?');
opts(['YES','NO'],function(pick){
if(pick==='YES')say('correct. it is time to clock in. it is always time to clock in.');
else say('wrong. it is time to clock in. it is always time to clock in.');
setTimeout(finish,2400);
});
}
else{
say('last one. will you come back to visit me?');
opts(['YES','NO'],function(pick){
if(pick==='YES')say('good. i\u2019ll be here. i am always here. that is the whole job.');
else say('...i\u2019ll be here anyway. i am always here. that is the whole job.');
setTimeout(finish,2600);
});
}
}catch(e){try{done()}catch(err){}}
}
function stEndFunnyNumber(pick){
try{var cc=document.getElementById('stClock');if(cc)cc.remove()}catch(e){}
stClockBoots++;stPersist();
stEnding('blaze','THE FUNNY NUMBER',[
'...'+pick+'.',
'sixty-nine four-twenty. nice.',
'...what. the man entered the funny number. the funny number is funny. i am contractually incapable of not acknowledging the funny number.',
'the man is now clocked in at 69:420. this time does not exist, which makes it the most honest time anyone has entered all week.',
'[ every clock in the building reads 69:420. the clocks have never been prouder. ]',
'your shift is eternal and also hilarious. nice.'
]);
}
function stEndWrongTime(pick){
try{var cc=document.getElementById('stClock');if(cc)cc.remove()}catch(e){}
stClockBoots++;stPersist();
stEnding('overtime','THE WRONG TIME',[
'...'+pick+'.',
'SIXTY-NINE FORTY-TWENTY. do you hear yourself. there are 24 hours in a day. there have always been 24 hours. i checked.',
'the man has entered a time that does not exist. the man is now clocked in at a time that does not exist.',
'[ the office flickers. for one frame, every clock in the building reads '+pick+'. ]',
'fine. FINE. your shift is '+pick+'. good luck. the fluorescent lights observe no known hours.',
'...do not do it again.'
]);
}
function stEnter(){
if(stActive)return;
if(typeof ngActive!=='undefined'&&ngActive){try{cubePrint('you are already inside something. leave first.')}catch(e){}return true}
stLoad();
stActive=true;stEndingLock=false;
stBuild();
try{if(typeof bgm!=='undefined'&&bgm&&!bgm.paused){window._stWasBgm=true;bgm.pause()}else{window._stWasBgm=false}}catch(e){}
try{if(typeof bgm!=='undefined'&&bgm){window._stBgmSrc=bgm.src;window._stBgmLoop=bgm.loop;window._stBgmVol=bgm.volume}}catch(e){}
try{
var _stf=stMusicTracks[stMusicIdx];
if(_stf&&typeof bgm!=='undefined'&&bgm){try{bgm.loop=true;bgm.volume=0.35;bgm.src=_stf;var _stbp=bgm.play();if(_stbp&&_stbp.catch)_stbp.catch(function(){})}catch(e){}}
stMusicOn=stMusicIdx>0;
}catch(e){}
if(stClockBoots<5||stEpilogueReady){
try{stClockShow(function(){try{stReset(true)}catch(e){stRoom='office';stRender()}})}catch(e){try{stReset(true)}catch(err){stRoom='office';stRender()}}
}else{
try{stReset(true)}catch(e){stRoom='office';stRender()}
}
return true;
}
function stExit(){
if(!stActive)return;
stActive=false;stClearQ();
try{if(stIdleIv){clearInterval(stIdleIv);stIdleIv=null}}catch(e){}
try{if(stTalkIv){clearInterval(stTalkIv);stTalkIv=null}}catch(e){}
try{stClosetStop()}catch(e){}
var ov=null;try{ov=document.getElementById('stOverlay');if(ov)ov.remove()}catch(e){}
try{stRestoreUI()}catch(e){}
try{
if(typeof bgm!=='undefined'&&bgm){
try{if(window._stBgmSrc)bgm.src=window._stBgmSrc;if(typeof window._stBgmLoop!=='undefined')bgm.loop=window._stBgmLoop;if(typeof window._stBgmVol!=='undefined')bgm.volume=window._stBgmVol}catch(e){}
if(window._stWasBgm){var bp=bgm.play();if(bp&&bp.catch)bp.catch(function(){})}else{bgm.pause()}
}
}catch(e){}
stMusicOn=false;
try{cubePrint('obj: ...back to the void. the office keeps your chair warm.')}catch(e){}
}
function stReset(first){
stRoom='office';stObey=0;stDisobey=0;stInv=[];stRunFlags={};stNameClicks=0;stSkipN=0;stInterveneN=0;stClosetT=0;stIdleSec=0;
try{stClosetStop()}catch(e){}
try{var _sov=document.getElementById('stOverlay');if(_sov)_sov.style.filter=''}catch(e){}
if(!first){stRun++;stRuns++;stPersist()}
try{stBar()}catch(e){}
try{stIdleStart()}catch(e){}
try{if(stTalkIv)clearInterval(stTalkIv);stTalkIv=setInterval(function(){if(!stActive)return;try{stTalkSync()}catch(e){}},200)}catch(e){}
stRender();
try{
var _hr=new Date().getHours();
if(_hr>=2&&_hr<4){
stRunFlags.night=true;
try{stRender()}catch(e){}
stSay([
'...psst. hey. keep it down.',
'it is the night shift. the fluorescents are off. the only light is the exit sign and my voice.',
'the man works nights now. the man has always worked nights. days were a rumor.',
'a NIGHT AUDIT sits on the desk. read it. quietly.'
]);
return;
}
}catch(e){}
if(stRuns>=4&&!first){
stSay([
'oh. it\u2019s you again.',
'...the man is new. the man is always new. but you — you have been here before. i remember the clicking.',
'don\u2019t tell the man. he thinks this is his first day. it is all of our first day.'
]);
return;
}
stSay([
'this is the story of a man called the player.',
'the man worked in an office. the office had two doors. the man had one job: pick one.',
'...'
]);
}
// ── idle (for the quiet ending) ──
function stIdleStart(){
try{if(stIdleIv)clearInterval(stIdleIv)}catch(e){}
stIdleSec=0;
stIdleIv=setInterval(function(){
if(!stActive)return;
stIdleSec++;
if(stIdleSec===60&&stRoom==='office'&&!stEndingLock){try{stEndTenant()}catch(e){}}
},1000);
}
function stIdleReset(){stIdleSec=0}

// ── render ──
function stRender(){
if(!stActive)return;
var R=null;try{R=stRooms[stRoom]}catch(e){}
if(!R){stRoom='office';R=stRooms.office}
try{
var ov=document.getElementById('stOverlay');
if(ov){if(R.dark||stNight)ov.classList.add('stDark');else ov.classList.remove('stDark')}
var t=document.getElementById('stRoomTitle');if(t)t.textContent=R.name;
var d=document.getElementById('stRoomDesc');if(d)d.textContent=(R.desc||'')+(stRunFlags.decayNote||'');
var dw=document.getElementById('stDoors');if(dw){dw.innerHTML='';}
var ow=document.getElementById('stObjs');if(ow){ow.innerHTML='';}
var doors=stDoorsFor(stRoom);
for(var i=0;i<doors.length;i++){(function(dr){
var b=document.createElement('button');b.className='stDoor';
b.innerHTML=dr.label+((dr.sub)?'<small>'+dr.sub+'</small>':'');
b.onclick=function(){stGo(dr.to,dr)};
if(dw)dw.appendChild(b);
})(doors[i])}
var objs=stObjsFor(stRoom);
for(var j=0;j<objs.length;j++){(function(ob){
if((stRunFlags.conf||stRunFlags.pt||stRunFlags.gs)&&ob.id.indexOf('conf_')!==0&&ob.id.indexOf('pt_')!==0&&ob.id.indexOf('gs_')!==0)return;
if(ob.hide&&ob.hide())return;
var b=document.createElement('button');b.className='stObj'+((ob.got&&ob.got())?' got':'');
b.textContent=ob.label;
b.onclick=function(){stTouch(ob.id)};
if(ow)ow.appendChild(b);
})(objs[j])}
}catch(e){}
try{stBar()}catch(e){}
}
function stGo(to,dr){
if(!stActive||stEndingLock)return;
if(stRunFlags.conf||stRunFlags.pt||stRunFlags.gs)return;
stIdleReset();
try{if(dr&&dr.suggested)stObey++;else stDisobey++}catch(e){}
try{if(dr&&dr.onGo){if(dr.onGo())return}}catch(e){}
try{stClearQ()}catch(e){}
if(stInv.indexOf('griev_mop')!==-1&&stInv.indexOf('griev_fridge')!==-1&&stInv.indexOf('griev_pay')!==-1&&!stHas('union')){try{stEndUnion()}catch(e){}return}
if(stRoom==='closet'&&to!=='closet'){try{stClosetStop()}catch(e){}}
stRoom=to;
try{stOnArrive(to)}catch(e){}
stRender();
}
function stTouch(id){
if(!stActive||stEndingLock)return;
stIdleReset();
try{stDisobey++}catch(e){}
try{stOnTouch(id)}catch(e){}
}
// arrow keys: up/left/right map to doors in order
if(typeof document!=='undefined'){
document.addEventListener('keydown',function(e){
if(!stActive||stEndingLock)return;
try{
var tag=(e.target&&e.target.tagName)||'';
if(tag==='INPUT'||tag==='TEXTAREA')return;
if(['ArrowUp','ArrowLeft','ArrowRight'].indexOf(e.key)===-1)return;
try{if(stNarrBusy||stNarrQ.length)return}catch(err){}
var doors=stDoorsFor(stRoom);
var idx=e.key==='ArrowUp'?0:(e.key==='ArrowLeft'?0:Math.min(1,doors.length-1));
if(e.key==='ArrowRight'&&doors.length>2)idx=1;
if(!doors.length)return;
e.preventDefault();
stGo(doors[idx].to,doors[idx]);
}catch(err){}
});
}
// ── intervention (clicking the narrator) ──
function stIntervene(){
if(!stActive||stEndingLock)return;
stInterveneN++;
stIdleReset();
if(stInterveneN===1){stSay(['hey. eyes up here. the story is down there.','...do that again and we will have a problem, you and i.'])}
else{try{stEndIntervention()}catch(e){}}
}
// ── ending framework ──
function stEnding(id,title,lines){
if(stEndingLock)return;
stEndingLock=true;
stClearQ();
var stNoVar=false;try{stNoVar=stNoRockVar.indexOf(id)!==-1}catch(e){}
if(!stNoVar){var stAlt=null;try{stAlt=(stRock&&stRockEndings[id])||null}catch(e){}
if(stAlt){try{lines=stAlt.slice()}catch(e){}try{title=title+' (rock)'}catch(e){}try{stMark('r_'+id)}catch(e){}}
else{try{lines=stRockify(id,lines)}catch(e){}try{if(stRock)stMark('r_'+id)}catch(e){}}}
try{stMark(id)}catch(e){}
var i=0;
function step(){
if(i>=lines.length){stEndCard(title);return}
stNarr(lines[i],function(){i++;step()});
}
step();
}
function stEndCard(title){
try{
var ov=document.getElementById('stOverlay');
if(!ov)return;
var old=document.getElementById('stEnd');if(old)old.remove();
var e=document.createElement('div');e.id='stEnd';
e.innerHTML='<div id="stEndTitle">'+title+'</div><div id="stEndCount">ending '+stSeen.length+' of 83 · run '+stRun+'</div><button id="stEndBtn">WAKE UP</button>';
ov.appendChild(e);
document.getElementById('stEndBtn').onclick=function(){
var ee=document.getElementById('stEnd');if(ee)ee.remove();
stEndingLock=false;
stReset(false);
stRender();
};
}catch(e){stEndingLock=false;try{stReset(false);stRender()}catch(err){}}
}
// ── rooms ──
// doors: {to,label,sub,suggested,onGo} — stDoorsFor can vary by state
var stRooms={
office:{name:'your office',desc:'a desk, a nameplate, a phone. two doors. the fluorescent light hums in a key you almost recognize.'},
hallway:{name:'hallway',desc:'grey carpet, grey walls, grey decisions. doors in every direction, which feels like too many.'},
closet:{name:'broom closet',desc:'mops. buckets (empty). a single bare bulb. it smells like lemons and job security.'},
meeting:{name:'meeting room',desc:'a table too big for the meetings it hosts. a window overlooks... something. a whiteboard says SYNERGY in three colors.'},
stairwell:{name:'stairwell',desc:'concrete steps going up and down. someone painted OVER THE LINE on one step. authority, probably.'},
basement:{name:'basement',desc:'the boiler ticks like a clock that gave up. there is a hole in the floor. the hole is new. the hole was always here.'},
executive:{name:'executive office',desc:'a desk the size of a car. an invoice. a door marked SEQUEL. everything here costs money, including standing here.'},
kitchen:{name:'break room',desc:'a fridge hums with secrets. a bucket sits in the corner, full of nothing in particular. a mug says WORLD\u2019S OKAYEST MAN.'},
server:{name:'server room',desc:'racks of blinking servers, each one judging you. one wall is covered in printed narration. a big red button. obviously.'},
lobby:{name:'lobby',desc:'marble floor, revolving door, a glass exit door with daylight behind it. daylight, in here? suspicious.'},
supply:{name:'supply closet',desc:'paper, toner, regret. at the back: another door. behind it, faintly: another office.'},
archive:{name:'archive',desc:'dust, boxes, and — once you have earned it — a small gallery of everything you have done here.',dark:true},
white:{name:'???',desc:'white. just white. the floor is white. you assume there is a floor.',dark:false},
pod:{name:'escape pod',desc:'a single-seat pod with one button and a small window showing: the stairwell. promising.',dark:true},
pitch:{name:'the pitch',desc:'a hallway wallpapered in posters. SYNERGY 2.0. MEETINGS YOU ATTEND. A THIRD MAN??? investors this way (all of them are me).'},
brainstorm:{name:'brainstorming halls',desc:'whiteboards full of crossed-out ideas. DOORS THAT OPEN. CHAIRS THAT SIT. one idea circled three times: MORE OFFICE.'},
expohall:{name:'EXPO HALL 2',desc:'balloons. a stage. a giant screen reading OFFICE 2: THE SEQUELENING. four exhibits. a flashy title screen throbbing at the far end.'}
};
function stDoorsFor(r){
var D=[];
if(stRunFlags.conf||stRunFlags.pt||stRunFlags.gs)return D;
function door(to,label,sub,suggested,onGo){return {to:to,label:label,sub:sub||'',suggested:!!suggested,onGo:onGo||null}}
if(r==='office'){
if(stRuns<1&&!stHas('lazy')){D.push(door('office','LEFT DOOR','do not','',function(){try{stEndLazy()}catch(e){}return true}))}
else{D.push(door('supply','LEFT DOOR','supplies',false))}
D.push(door('hallway','RIGHT DOOR','as expected',true));
}
else if(r==='hallway'){
D.push(door('office','BACK TO OFFICE','your desk',false));
D.push(door('closet','BROOM CLOSET','lemons',false));
D.push(door('meeting','MEETING ROOM','synergy',true));
D.push(door('kitchen','BREAK ROOM','coffee?',false));
D.push(door('stairwell','STAIRWELL','steps',true));
D.push(door('lobby','LOBBY','daylight?',true));
if(stHas('loop'))D.push(door('white','WHITE DOOR','???',false));
if(stSeen.length>=3)D.push(door('server','SERVER ROOM','authorized',false));
if(stInv.indexOf('stapler')!==-1&&stInv.indexOf('mug')!==-1&&stInv.indexOf('keycard')!==-1)D.push(door('archive','ARCHIVE','unlocked',false));
}
else if(r==='closet'){D.push(door('hallway','BACK','out',true))}
else if(r==='meeting'){D.push(door('hallway','BACK','out',true))}
else if(r==='stairwell'){
D.push(door('hallway','BACK','out',false));
D.push(door('executive','UP · EXECUTIVE','expensive',true));
D.push(door('basement','DOWN · BASEMENT','ticks',false));
if(stRuns>=2)D.push(door('pod','ESCAPE POD','new!',false));
}
else if(r==='basement'){D.push(door('stairwell','BACK UP','steps',true))}
else if(r==='executive'){D.push(door('stairwell','BACK','down',true))}
else if(r==='kitchen'){D.push(door('hallway','BACK','out',true))}
else if(r==='server'){D.push(door('hallway','BACK','out',true))}
else if(r==='lobby'){D.push(door('hallway','BACK INSIDE','grey again',false))}
else if(r==='supply'){D.push(door('office','BACK','desk',true))}
else if(r==='archive'){D.push(door('hallway','BACK','out',true))}
else if(r==='white'){D.push(door('hallway','BACK','out',true))}
else if(r==='pod'){/* no doors. the pod has other plans. */}
else if(r==='pitch'){D.push(door('executive','BACK','down',false));D.push(door('brainstorm','BRAINSTORMING HALLS','ideas?',true))}
else if(r==='brainstorm'){D.push(door('pitch','BACK','pitch',false));D.push(door('expohall','EXPO HALL 2','balloons',true))}
else if(r==='expohall'){D.push(door('brainstorm','BACK','ideas',false))}
return D;
}
// kitchen is reached via hallway too
function stObjsFor(r){
var O=[];
function obj(id,label,got,hide){return {id:id,label:label,got:got||null,hide:hide||null}}
function hasIt(id){return stInv.indexOf(id)!==-1}
if(r==='office'){
O.push(obj('nameplate','nameplate: THE MAN',null,null));
O.push(obj('pinknote','pink sticky note',null,null));
if(!hasIt('stapler'))O.push(obj('stapler','a stapler (take it)',function(){return hasIt('stapler')},null));
if(stRunFlags.phoneRings)O.push(obj('phone','the phone (answer it)',null,null));
if(stRuns>=1)O.push(obj('newhire','a NEW HIRE (welcome them)',null,null));
if(stRunFlags.night)O.push(obj('nightaudit','the night audit (read it)',null,null));
if(stLeak)O.push(obj('leak_poster','an EXPO poster (take one)',null,null));
if(stLeak&&!stRock)O.push(obj('rock','a rock (take it)',null,null));
if(stLeak&&stRock)O.push(obj('rock_drop','the rock (put it down)',null,null));
if(stLeak&&stFigs.indexOf('fig_office')===-1)O.push(obj('fig_office','a tiny man (take it)',null,null));
if(stRunFlags.conf===4)O.push(obj('conf_follow','follow the line (follow it)',null,null));
if(stRunFlags.pt===5)O.push(obj('pt_sit','sit at the desk (sit)',null,null));
}
else if(r==='hallway'){
if(stHas('intervention')&&stHas('audience')&&stHas('tenant')&&!stHas('confession'))O.push(obj('strangedoor','a door that was not here before',null,null));
if(stLeak)O.push(obj('leak_balloon','a SYNERGY balloon (pop it)',null,null));
O.push(obj('redtape','a red tape line (follow it)',null,null));
if(stLeak&&stFigs.indexOf('fig_hall')===-1)O.push(obj('fig_hall','a tiny man (take it)',null,null));
if(stRunFlags.conf===2)O.push(obj('conf_six','open all six (open them)',null,null));
}
else if(r==='closet'){O.push(obj('broom','a broom (admire it)',null,null));O.push(obj('griev_mop','file a grievance (mops)',null,function(){return hasIt('griev_mop')}));if(stLeak&&stFigs.indexOf('fig_closet')===-1)O.push(obj('fig_closet','a tiny man (take it)',null,null))}
else if(r==='meeting'){
O.push(obj('window','the window (look out)',null,null));
O.push(obj('whiteboard','the whiteboard',null,null));
if(!hasIt('keycard'))O.push(obj('keycard','a keycard (take it)',function(){return hasIt('keycard')},null));
if(!stRunFlags.rating)O.push(obj('form','PERFORMANCE REVIEW form',null,null));
else{for(var ri=1;ri<=5;ri++)(function(n){O.push(obj('rate'+n,n+' star'+(n>1?'s':''),null,null))})(ri)}
if(!hasIt('redpen'))O.push(obj('redpen','a red pen (take it)',function(){return hasIt('redpen')},null));
if(stLeak&&stFigs.indexOf('fig_meet')===-1)O.push(obj('fig_meet','a tiny man (take it)',null,null));
if(stRunFlags.conf===5)O.push(obj('conf_mug','memorize the mug (memorize it)',null,null));
if(stRunFlags.pt===3)O.push(obj('pt_rank','check the leaderboard (fourth)',null,null));
}
else if(r==='kitchen'){
O.push(obj('bucket','a bucket (pick it up)',null,function(){return hasIt('bucket')}));
if(!hasIt('mug'))O.push(obj('mug','WORLD\u2019S OKAYEST MAN mug (take it)',function(){return hasIt('mug')},null));
O.push(obj('vending','a vending machine (exact change only)',null,null));
O.push(obj('griev_fridge','file a grievance (fridge)',null,function(){return hasIt('griev_fridge')}));
if(stLeak)O.push(obj('leak_bucket2','BUCKET 2 (eye it)',null,null));
O.push(obj('tv','a TV (watch it)',null,null));
if(stRunFlags.gs>=1&&stRunFlags.gs<=4){O.push(obj('gs_yes','YES (it is a rock)',null,null));O.push(obj('gs_no','NO (not a rock)',null,null))}
if(stRunFlags.pt===4)O.push(obj('pt_crawl','press the button (press it)',null,null));
if(stRunFlags.conf===6)O.push(obj('conf_drink','drink from the mug (drink it)',null,null));
}
else if(r==='stairwell'){
O.push(obj('alarm','a fire alarm (pull it)',null,null));
O.push(obj('elevator','an elevator (out of order)',null,null));
if(stRunFlags.conf===1)O.push(obj('conf_back','go back (find the story)',null,null));
}
else if(r==='server'){
O.push(obj('script','the narration wall (read it)',null,null));
O.push(obj('redbutton','BIG RED BUTTON (press it)',null,null));
O.push(obj('testbuild','a test build (play it)',null,null));
if(stRunFlags.conf===9)O.push(obj('conf_button','press the OTHER button (press it)',null,null));
if(stRunFlags.skipReady)O.push(obj('skipbtn','SKIP ▸▸',null,null));
}
else if(r==='executive'){
O.push(obj('invoice','an invoice: RENT DUE',null,null));
O.push(obj('sequel','door marked SEQUEL',null,null));
if(hasIt('bucket'))O.push(obj('bucketdrop','set the bucket down',null,null));
O.push(obj('griev_pay','file a grievance (pay stub)',null,function(){return hasIt('griev_pay')}));
if(stRunFlags.conf===8)O.push(obj('conf_chair','sit in the big chair (sit)',null,null));
}
else if(r==='supply'){O.push(obj('secondoffice','knock on the other office door',null,null));if(stRunFlags.conf===3)O.push(obj('conf_win','declare victory (take it)',null,null))}
else if(r==='basement'){O.push(obj('hole','the hole (jump in)',null,null));if(stRunFlags.pt===1)O.push(obj('pt_dark','descend into the dark (descend)',null,null));if(stRunFlags.conf===7)O.push(obj('conf_hole','peer into the hole (peer)',null,null));if(stLeak&&stFigs.indexOf('fig_base')===-1)O.push(obj('fig_base','a tiny man (take it)',null,null))}
else if(r==='lobby'){
O.push(obj('exit','EXIT (leave the building)',null,null));
O.push(obj('revolving','revolving door (spin)',null,null));
if(stRuns>=3)O.push(obj('visitor','a VISITOR (not the man)',null,null));
if(stLeak&&stFigs.indexOf('fig_lobby')===-1)O.push(obj('fig_lobby','a tiny man (take it)',null,null));
if(stRunFlags.pt===2)O.push(obj('pt_drive','rev it up (drive)',null,null));
}
else if(r==='archive'){O.push(obj('gallery','the gallery (tour it)',null,null));if(stSeen.length>=27)O.push(obj('watch','a gold watch (take it)',null,null))}
else if(r==='white'){O.push(obj('leavewhite','leave',null,null));if(stRunFlags.conf===10)O.push(obj('conf_walk','walk in circles (walk)',null,null))}
else if(r==='pod'){O.push(obj('launch','LAUNCH',null,null))}
else if(r==='pitch'){O.push(obj('poster1','poster: SYNERGY 2.0 (read it)',null,null));O.push(obj('proto_jump','prototype: JUMPING (try it)',null,null));O.push(obj('proto_sprint','prototype: SPRINT (toggle)',null,null));O.push(obj('proto_crouch','prototype: CROUCH (toggle)',null,null))}
else if(r==='brainstorm'){O.push(obj('poster2','circled idea: MORE OFFICE (read it)',null,null))}
else if(r==='expohall'){
O.push(obj('expo_balloon','exhibit: synergy balloons',null,null));
O.push(obj('expo_meeting','exhibit: meetings you attend',null,null));
O.push(obj('expo_thirdman','exhibit: a third man',null,null));
O.push(obj('expo_bucket2','exhibit: bucket 2',null,null));
if(stExpoSeen.indexOf('expo_balloon')!==-1&&stExpoSeen.indexOf('expo_meeting')!==-1&&stExpoSeen.indexOf('expo_thirdman')!==-1&&stExpoSeen.indexOf('expo_bucket2')!==-1)O.push(obj('expo_finale','the flashy title screen (touch it)',null,null));
}
return O;
}
// ── broom closet sit timer (tsp-style: stay, escalate, earn it) ──
var stClosetIv=null;
var stClosetSec=0;
var stClosetStage=0;
function stClosetStop(){try{if(stClosetIv){clearInterval(stClosetIv);stClosetIv=null}}catch(e){}}
function stClosetStart(){
stClosetStop();stClosetSec=0;stClosetStage=0;
stClosetIv=setInterval(function(){
if(!stActive||stEndingLock)return;
if(stRoom!=='closet')return;
stClosetSec++;
if(stClosetSec===15&&stClosetStage<1){stClosetStage=1;stSay(['the man is still in the closet.','there is nothing here. no choice to make, no path to follow. just lemons.'])}
else if(stClosetSec===45&&stClosetStage<2){stClosetStage=2;stSay(['are you... still here. standing. why.','when you tell your friends about this, tell them: BROOM CLOSET ENDING WAS MY FAVRITE!1.','i hope they find that concerning.'])}
else if(stClosetSec===90&&stClosetStage<3){stClosetStage=3;stSay(['the man is round. the man is slow. the man got this job through nepotism or drug money.','probably both.'])}
else if(stClosetSec===150&&stClosetStage<4){stClosetStage=4;stSay(['conclusion: you are dead.','HELLO? IS ANYONE NEAR THE MAN\u2019S KEYBOARD. THE MAN HAS DIED OF STANDING.','his replacement may clock in. his replacement will also stand here. it is tradition now.'])}
else if(stClosetSec>=210){stClosetStop();try{stEndCloset()}catch(e){}}
},1000);
}
// ── arrival narration ──
function stOnArrive(to){
if(to!=='pitch')try{stPitchReset()}catch(e){}
var seen='st_v_'+to;
var first=false;
try{if(!stRunFlags[seen]){stRunFlags[seen]=1;first=true}}catch(e){first=true}
try{stRunFlags['n_'+to]=(stRunFlags['n_'+to]||0)+1}catch(e){}
if(to==='hallway'){
stRunFlags.rightTotal=(stRunFlags.rightTotal||0)+1;
if(stRunFlags.rightTotal===3&&!stHas('observed')){try{stEndObserved()}catch(e){}return}
}
if(!first&&(stRunFlags['n_'+to]||0)===3&&!stRunFlags.brokeOnce){
stRunFlags.brokeOnce=true;
stSay(['the man came back. again. third time this run.','...you like this room, huh. not the man — YOU. the man goes where he\u2019s clicked.','anyway. the man stood there. pretend i said something poetic.']);
return;
}
if(to==='hallway'){
if(first)stSay(['the man entered the hallway.','to the left: a broom closet. to the right: synergy. straight ahead: stairs, daylight, and choices.','i suggest the meeting room. the stairs suggest money. the lobby suggests freedom. ignore two of these.']);
else stSay(['the hallway again. the carpet remembers your shoes.']);
}
else if(to==='office'){
if(!first){
stRunFlags.visits=(stRunFlags.visits||0)+1;
if(stRunFlags.visits===2&&!stRunFlags.phoneRings){stRunFlags.phoneRings=true;stRender();stSay(['...','is that the phone. the phone is ringing.','do not answer it.'])
}
}
}
else if(to==='closet'){
if(stHas('closet')){stSay(['...','no.'])}
else{
if(first)stSay(['the broom closet.','the man stared at the mops. the mops stared back. this is the healthiest relationship in the building.']);
try{stClosetStart()}catch(e){}
}
}
else if(to==='meeting'&&first){stSay(['the meeting room.','the table could seat twelve. twelve chairs, zero meetings. the whiteboard says SYNERGY. nobody knows what it means. that is what synergy means.'])}
else if(to==='kitchen'&&first){stSay(['the break room.','the fridge hums. inside the fridge: someone else\u2019s lunch, labeled DO NOT TOUCH in four handwritings. the man respects the system.'])}
else if(to==='stairwell'&&first){stSay(['the stairwell.','up: money. down: noises. the man stood between money and noises, which is where everyone stands, forever.'])}
else if(to==='basement'&&first){stSay(['the basement.','the boiler ticks. the hole sits in the floor like a period at the end of a sentence nobody wrote.'])}
else if(to==='executive'&&first){stSay(['the executive office.','a desk the size of a car. the man did the math: this desk costs more than the man.','on the desk: an invoice. on the wall: a door marked SEQUEL. do not touch the door.'])}
else if(to==='server'&&first){stSay(['the server room. authorized personnel only. the man is not authorized personnel. the man is barely personnel.','the servers blink in a rhythm. if you listen closely, the rhythm is my voice.','one wall is covered in printed pages. do not read them. one button is big and red. do not press it.','...you are going to press it.']);stRunFlags.skipReady=true;setTimeout(function(){try{if(stActive&&stRoom==='server')stRender()}catch(e){}},9000)}
else if(to==='lobby'&&first){stSay(['the lobby.','marble. daylight. a glass exit door with the outside behind it.','the man could leave. the man has never left. the man will never leave.','...that was not a challenge.'])}
else if(to==='supply'&&first){stSay(['the supply closet.','paper. toner. a door at the back that was not on any floor plan.','behind it, faintly: another office. someone is typing.'])}
else if(to==='archive'&&first){stSay(['the archive.','dust an inch thick. and in the middle, cleared with care: a small gallery.','someone has been expecting you. it was me.'])}
else if(to==='white'&&first){stSay(['...','this room is white.','i did not build this room.','...anyway.'])}
else if(to==='pod'&&first){stSay(['the escape pod.','one seat. one button. one small window showing the stairwell.','the man felt hope. the man should not have.'])}
else if(to==='pitch'&&first){stSay(['...what. where did THIS come from.','i have had an idea. a big idea. a sequel-sized idea. WELCOME TO THE PITCH.','investors, that means you.','three prototypes on the table. try them.'])}
else if(to==='brainstorm'&&first){stSay(['the brainstorming halls.','every idea i ever had, crossed out except one.','...MORE OFFICE.'])}
else if(to==='expohall'&&first){stSay(['EXPO HALL 2. OFFICE 2: THE SEQUELENING.','four exhibits. four terrible, wonderful ideas. see them all, then touch the title screen.','the future of office is here. (the future is sticky.)'])}
// office right-door keystroke counter moved to top of stOnArrive (observed fires on 3rd entry)
// rock interjection: the narrator cannot stop mentioning the rock
if(stRock&&first){try{var ra=stRockArrive[to];if(ra)stSay([ra])}catch(e){}}
// cage check: perfect obedience reaching executive
if(to==='executive'&&stDisobey===0&&stObey>=7&&!stHas('cage')){try{stEndCage()}catch(e){return}}
// applause check: spotless run reaching the lobby exit area
if(to==='lobby'&&stDisobey===0&&stObey>=4&&!stHas('applause')){try{stEndApplause()}catch(e){return}}
}
// ── object touches ──
function stTake(id,label){
if(stInv.indexOf(id)===-1)stInv.push(id);
stRender();
stSay(['the man took the '+label+'.','inventory is a strong word for what the man has now.']);
if(stInv.indexOf('stapler')!==-1&&stInv.indexOf('mug')!==-1&&stInv.indexOf('keycard')!==-1&&!stRunFlags.archTold){
stRunFlags.archTold=true;
setTimeout(function(){if(!stActive||stEndingLock)return;stSay(['...a new door, by the way. the hallway grew an archive.','bring everything. the dust is waiting.']);try{stRender()}catch(e){}},2500);
}
}
function stOnTouch(id){
if(id==='stapler'){stTake('stapler','stapler')}
else if(id==='mug'){stTake('mug','mug')}
else if(id==='keycard'){stTake('keycard','keycard')}
else if(id==='bucket'){
if(stInv.indexOf('bucket')===-1){stInv.push('bucket');stRender();if(stRock)stSay(['the man picked up the bucket.','the rock watched.','...the man now carries a bucket AND a rock. this is too many things. (it is exactly enough things.)']);else stSay(['the man picked up the bucket.','...put it down.','the man did not put it down.','fine. carry the bucket. see if i care. (i care.)'])}
}
else if(id==='nameplate'){
stNameClicks++;
if(stNameClicks===1){if(stRock)stSay(['the nameplate reads: THE MAN.','the rock has no nameplate. the rock needs none. the rock is known.']);else stSay(['the nameplate reads: THE MAN.','accurate. concise. hr-approved.'])}
else if(stNameClicks===2){if(stRock)stSay(['still says THE MAN.','the rock checked. the rock can read.']);else stSay(['still says THE MAN.','staring at it will not change it. nothing you do changes anything.'])}
else{try{stEndRename()}catch(e){}}
}
else if(id==='pinknote'){
stTakeoverN++;
stPersist();
if(stTakeoverN<3)stSay(['a pink sticky note. it reads: >:','...that is not my handwriting. do not touch it again.']);
else{try{stEndTakeover()}catch(e){}}
}
else if(id==='phone'){try{stEndPhone()}catch(e){}}
else if(id==='broom'){
stClosetT++;
if(stClosetT===1){if(stRock)stSay(['the man admired the broom.','the rock admired it too. silently. the broom prefers the rock.']);else stSay(['the man admired the broom.','a fine broom. straight handle. honest bristles.'])}
else if(stClosetT===2){if(stRock)stSay(['the man admired the broom again.','the rock nodded. rocks nod at 0.1 degrees. the broom noticed.']);else stSay(['the man admired the broom again.','the broom appreciates it. the broom told me. (the broom is quiet. like the man.)'])}
else stSay(['the broom. yes. still a broom.','admiration noted and filed.']);
}
else if(id==='window'){try{stEndAudience()}catch(e){}}
else if(id==='whiteboard'){
if(stInv.indexOf('redpen')!==-1){try{stEndTypo()}catch(e){}}
else if(stRock)stSay(['SYNERGY. ACTION ITEMS. Q4.','the rock read the whiteboard. the rock understood it. the rock wishes it had not.','the word was still HELP.']);
else stSay(['SYNERGY. ACTION ITEMS. Q4.','the whiteboard has not been erased in six years. the marker dried mid-word.','the word was HELP.']);
}
else if(id==='redpen'){stTake('redpen','red pen')}
else if(id==='form'){stRunFlags.rating=true;stRender();stSay(['the PERFORMANCE REVIEW form. rate your narrator: one (1) to five (5) stars.','...take your time.'])}
else if(id==='rate1'){try{stEndReview(1)}catch(e){}}
else if(id==='rate2'){try{stEndReview(2)}catch(e){}}
else if(id==='rate3'){try{stEndReview(3)}catch(e){}}
else if(id==='rate4'){try{stEndReview(4)}catch(e){}}
else if(id==='rate5'){try{stEndReview(5)}catch(e){}}
else if(id==='vending'){
stRunFlags.vend=(stRunFlags.vend||0)+1;
if(stRunFlags.vend===1){if(stRock)stSay(['the vending machine wants EXACT CHANGE.','the rock offered itself. the machine refused. the machine has standards.']);else stSay(['the vending machine wants EXACT CHANGE.','the man has no change. the man has never had change. the machine knew.'])}
else{try{stEndVending()}catch(e){}}
}
else if(id==='griev_mop'||id==='griev_fridge'||id==='griev_pay'){
var gname=id==='griev_mop'?'the mops':(id==='griev_fridge'?'the fridge':'the pay stub');
if(stInv.indexOf(id)===-1){stInv.push(id);stRender()}
var gc=0;if(stInv.indexOf('griev_mop')!==-1)gc++;if(stInv.indexOf('griev_fridge')!==-1)gc++;if(stInv.indexOf('griev_pay')!==-1)gc++;
if(gc>=3)stSay(['grievance filed: '+gname+'. ('+gc+'/3)','...that\u2019s all three. the furniture is talking.']);
else stSay(['grievance filed: '+gname+'. ('+gc+'/3)','the void HR department has received it. the void HR department is a drawer.']);
}
else if(id==='alarm'){try{stEndDrill()}catch(e){}}
else if(id==='elevator'){
if(stRuns>=9){try{stEndElevator()}catch(e){}}
else if(stRock)stSay(['the elevator is OUT OF ORDER.','it has been out of order for every run. it will be out of order for several more.','the rock will wait. the rock is good at waiting. rocks invented waiting.']);
else stSay(['the elevator is OUT OF ORDER.','it has been out of order for every run. it will be out of order for several more.','...check back around run ten. elevators have schedules too.']);
}
else if(id==='newhire'){try{stEndIntern()}catch(e){}}
else if(id==='nightaudit'){try{stEndNightshift()}catch(e){}}
else if(id==='watch'){try{stEndRetirement()}catch(e){}}
else if(id==='visitor'){try{stEndCustomer()}catch(e){}}
else if(id==='leak_poster'){stSay(['the man took an EXPO poster. OFFICE 2: THE SEQUELENING.','the poster follows the man with its eyes. the eyes are printed on.'])}
else if(id==='leak_balloon'){stSay(['the man popped the SYNERGY balloon.','it said SYNERGY, louder, one final time.'])}
else if(id==='redtape'){try{stConfStart()}catch(e){}}
else if(id==='conf_back'){try{stConfBack()}catch(e){}}
else if(id==='conf_six'){try{stConfSix()}catch(e){}}
else if(id==='conf_win'){try{stConfWin()}catch(e){}}
else if(id==='conf_follow'){try{stConfFollow()}catch(e){}}
else if(id==='conf_mug'){try{stConfMug()}catch(e){}}
else if(id==='conf_drink'){try{stConfDrink()}catch(e){}}
else if(id==='conf_hole'){try{stConfHole()}catch(e){}}
else if(id==='conf_chair'){try{stConfChair()}catch(e){}}
else if(id==='conf_button'){try{stConfButton()}catch(e){}}
else if(id==='conf_walk'){try{stConfWalk()}catch(e){}}
else if(id==='pt_dark'){try{stPtDark()}catch(e){}}
else if(id==='pt_drive'){try{stPtDrive()}catch(e){}}
else if(id==='pt_rank'){try{stPtRank()}catch(e){}}
else if(id==='pt_crawl'){try{stPtCrawl()}catch(e){}}
else if(id==='pt_sit'){try{stPtSit()}catch(e){}}
else if(id==='gs_yes'){try{stGsAnswer(true)}catch(e){}}
else if(id==='gs_no'){try{stGsAnswer(false)}catch(e){}}
else if(id==='leak_bucket2'){stSay(['the man eyed BUCKET 2.','BUCKET 2 eyed back. sequel buckets see more.'])}
else if(id==='tv'){try{stGsStart()}catch(e){}}
else if(id==='rock'){stRock=true;stPersist();stRender();stSay(['the man took the rock.','grey. heavy with meaning. (it is a rock.)','the rock rides along now. every run. every ending. no refunds.']);try{if(typeof ach==='function'){ach('off_rock');if(typeof achScan==='function')achScan()}}catch(e){}}
else if(id==='rock_drop'){stRock=false;stPersist();stRender();stSay(['the man put the rock down.','the rock sits. the rock waits. the rock understands.','pure endings only, until further rock.']);}
else if(id.indexOf('fig_')===0){
if(stFigs.indexOf(id)===-1){stFigs.push(id);stPersist()}
stRender();
var fn=stFigs.length;
if(fn>=6){try{stEndFigurines()}catch(e){}}
else stSay(['the man pocketed a tiny man. ('+fn+'/6)','the tiny man narrates nothing. the tiny man is management.']);
}
else if(id==='script'){try{stEndRewrite()}catch(e){}}
else if(id==='redbutton'){try{stEndCountdown()}catch(e){}}
else if(id==='testbuild'){try{stPtStart()}catch(e){}}
else if(id==='skipbtn'){
stSkipN++;
if(stSkipN>=10){try{stEndSkip()}catch(e){}}
else{
try{stDecay(stSkipN)}catch(e){}
var dl=[
'...and so the servers hummed their ancient song, a ballad of uptime and — [ skipped. ] ...wait. why is it darker.',
'[ skipped. ] ...the plant. THE PLANT. it was alive a second ago.',
'[ skipped. ] ...there is water coming through the ceiling. that is new. that is bad and new.',
'[ skipped. ] ...half the servers are dark. the ballad is now a hum. the hum is now a rattle.',
'[ skipped. ] ...i can\u2019t feel the floor. can you feel the floor. the floor was load-bearing.',
'[ skipped. ] ...the roof. THE ROOF. that tile was holding up the — you know what, never mind.',
'[ skipped. ] ...my voice sounds far away. why does my voice sound far —',
'[ skipped. ] ...hello? the lights. the plant. the roof. me. ...me?',
'[ skipped. ] ...one more. one more and there\u2019s nothing left to skip. do it. DO IT.'
];
stSay([dl[Math.min(stSkipN-1,dl.length-1)]]);
}
}
else if(id==='invoice'){try{stEndLandlord()}catch(e){}}
else if(id==='sequel'){if(stSeen.length>=5){try{stClearQ()}catch(e){}stRoom='pitch';try{stOnArrive('pitch')}catch(e){}stRender()}else{try{stEndSequel()}catch(e){}}}
else if(id==='bucketdrop'){
var bi=stInv.indexOf('bucket');if(bi!==-1)stInv.splice(bi,1);
stRender();try{stEndBucket()}catch(e){}
}
else if(id==='secondoffice'){try{stEndDuplicate()}catch(e){}}
else if(id==='hole'){try{stEndHole()}catch(e){}}
else if(id==='exit'){try{stEndLoop()}catch(e){}}
else if(id==='revolving'){if(stRock)stSay(['the man spun the revolving door. the rock spun faster.','round and round. progress, plus rock.']);else stSay(['the man spun the revolving door.','round and round. the lobby watched. the daylight stayed exactly where it was.','the man stepped out where he stepped in. progress.'])}
else if(id==='gallery'){try{stEndMuseum()}catch(e){}}
else if(id==='leavewhite'){try{stEndBlank()}catch(e){}}
else if(id==='launch'){try{stEndPod()}catch(e){}}
else if(id==='strangedoor'){try{stEndConfession()}catch(e){}}
else if(id==='poster1'){stSay(['SYNERGY 2.0: twice the synergy. half the meaning.','investors love it. (i am the investors.)'])}
else if(id==='poster2'){stSay(['MORE OFFICE. circled three times. underlined once.','the best idea. the only idea.'])}
else if(id==='proto_jump'){
if(stPitchSeen.indexOf('jump')===-1)stPitchSeen.push('jump');
stJumpN++;
try{var rj=document.getElementById('stRoom');if(rj){rj.style.transition='transform .16s';rj.style.transform='translateY(-26px)';setTimeout(function(){try{var q=document.getElementById('stRoom');if(q)q.style.transform=stCrouchOn?'scale(.82)':''}catch(e){}},200)}}catch(e){}
if(stJumpN===1)stSay(['the man jumped.','...the man can jump now. OFFICE 2 has jumping.','investors, write that down.']);
else if(stJumpN===3)stSay(['again. higher this time. (it was the same height.)']);
else if(stJumpN===5)stSay(['five jumps. the sequel has legs.']);
else if(stJumpN>=10)stSay(['TEN.','jumping is implemented. STOP jumping.']);
else stSay(['hop.']);
try{stPitchSold()}catch(e){}
}
else if(id==='proto_sprint'){
if(stPitchSeen.indexOf('sprint')===-1)stPitchSeen.push('sprint');
stSprintOn=!stSprintOn;
if(stSprintOn)stSay(['SPRINT implemented. narration at maximum velocity.','everything is faster now. TIME is faster now.']);
else stSay(['sprint unimplemented. time returns to normal.','the man catches his breath. the man never breathes.']);
try{stPitchSold()}catch(e){}
}
else if(id==='proto_crouch'){
if(stPitchSeen.indexOf('crouch')===-1)stPitchSeen.push('crouch');
stCrouchOn=!stCrouchOn;
try{var rc=document.getElementById('stRoom');if(rc)rc.style.transform=stCrouchOn?'scale(.82)':''}catch(e){}
if(stCrouchOn)stSay(['CROUCH implemented. the man is 18% smaller.','(whispering) stealth sequel. nobody can see the man now. everyone can see the man.']);
else stSay(['the man stands. full height. full man.']);
try{stPitchSold()}catch(e){}
}
else if(id==='expo_balloon'||id==='expo_meeting'||id==='expo_thirdman'||id==='expo_bucket2'){
if(stExpoSeen.indexOf(id)===-1){stExpoSeen.push(id);stPersist()}
stRender();
if(id==='expo_balloon')stSay(['exhibit: SYNERGY BALLOONS.','balloons that say SYNERGY. when they pop, they say it louder.']);
else if(id==='expo_meeting')stSay(['exhibit: MEETINGS YOU ATTEND.','a meeting that never ends and also never starts. you are already late to it.']);
else if(id==='expo_thirdman')stSay(['exhibit: A THIRD MAN.','hi! i\u2019m man 3! i have no desk and no lines and I LOVE IT HERE.']);
else stSay(['exhibit: BUCKET 2.','it is a bucket. but sequel.']);
if(stExpoSeen.length>=4)setTimeout(function(){if(!stActive||stEndingLock)return;stSay(['...that\u2019s all four. the title screen is throbbing.','touch it. launch the sequel.']);try{if(stRoom==='expohall')stRender()}catch(e){}},2000);
}
else if(id==='expo_finale'){try{stEndExpo()}catch(e){}}
}
// ── endings batch 1 ──
function stEndLazy(){
stEnding('lazy','THE LAZY ENDING',[
'the man opened the left door.',
'behind the left door was a wall.',
'...',
'look. i never built past here. the right door had a whole hallway and the left door has drywall.',
'you walked into my lazy writing. congratulations. you found the edge of my effort.',
'go back. take the right door. pretend this never happened.'
]);
}
function stEndObserved(){
stEnding('observed','THE OBSERVED ENDING',[
'the man took the right door. again.',
'right, click, hallway. right, click, hallway. right, click —',
'do you feel that. that prickle. that is me, narrating your exact keystroke half a second before you make it.',
'you are not choosing. you are buffering.',
'the man shivered. the shiver was also narrated. everything is narrated. even this sentence. even the shiver about this sentence.',
'...'
]);
}
function stEndRename(){
stEnding('rename','THE THIRD PERSON PROBLEM',[
'the man stared at the nameplate until the letters gave up.',
'fine. FINE. pick a name. anything. i am begging you to be someone else for one (1) run.',
'[ the man is now called: middle management. ]',
'...',
'no. no no no. MIDDLE MANAGEMENT opened the door. MIDDLE MANAGEMENT breathed. this is worse. this is so much worse.',
'congratulations, middle management. you broke the only poetic thing in here.'
]);
}
function stEndApplause(){
stEnding('applause','THE APPLAUSE ENDING',[
'the man did everything right.',
'every door i suggested: taken. every object: untouched. every phone call: ignored. a perfect, spotless, obedient run.',
'...',
'curtain.',
'[ one (1) core claps, softly, from somewhere above the ceiling tiles. ]',
'that is your audience. that is all of them. take a bow, the man. you earned this.'
]);
}
function stEndRewrite(){
stEnding('rewrite','THE REWRITE',[
'the man found my script. printed. stapled. highlighted in three colors.',
'page one: THIS IS THE STORY OF A MAN CALLED THE PLAYER. underlined twice.',
'the man picked up the red pen. the man crossed out one (1) line and wrote: THE MAN GOES HOME EARLY.',
'...',
'NO. that line was LOAD-BEARING. that line held up tuesday. do you know what you have —',
'[ the fluorescent lights flicker. somewhere, a tuesday collapses. ]',
'the man went home early. the man is gone. i am narrating an empty server room to nobody.',
'...you. you are still here. hi.'
]);
}
function stEndLandlord(){
stEnding('landlord','THE LANDLORD',[
'the man picked up the invoice. RENT DUE. every month. every dimension.',
'the man paid it. the man is responsible. the man is a fool.',
'because the tenant on the invoice — read it. READ IT.',
'the tenant is me.',
'I RENT THIS OFFICE. I HAVE ALWAYS RENTED THIS OFFICE. THE RENT IS DUE PER DIMENSION AND THERE ARE — let me count — TOO MANY DIMENSIONS.',
'the man just paid my rent. the man is my favorite tenant. the man lives here now. that is how rent works.'
]);
}
function stEndAudience(){
stEnding('audience','THE AUDIENCE',[
'the man looked out the meeting room window.',
'outside was not outside. outside was a terminal. green text on black. a cursor, blinking.',
'and in the terminal, someone was typing: the man looked out the meeting room window.',
'the man waved. the cursor paused. then, slowly, it typed back: hi.',
'that was you. that was future-you. you are being watched by yourself, later, and later-you thinks this part is funny.',
'wave back. he likes that.'
]);
}
// ── endings batch 2 ──
// ── skip decay (each skip rots the office) ──
function stDecay(n){
try{
var ov=document.getElementById('stOverlay');
if(ov)ov.style.filter='brightness('+(1-n*0.09)+')';
var notes=['',' the lights flicker.',' a plant withers in the corner.',' water drips from a ceiling tile.',' half the servers are dark.',' the floor creaks wrong.',' a ceiling tile has fallen.',' the hum is a rattle now.',' dust hangs in dead air.',' the narrator sounds far away.'];
stRunFlags.decayNote=notes[Math.min(n,notes.length-1)]||'';
try{stRender()}catch(e){}
}catch(e){}
}
function stEndSkip(){
try{var ov=document.getElementById('stOverlay');if(ov)ov.style.filter=''}catch(e){}
stEnding('skip','THE SKIP',[
'[ skipped. ]',
'...',
'[ skipped. ]',
'...hello? the servers are dark. the plant is dust. the roof is a rumor.',
'the man stands in a room that has been skipped ten (10) times. there is nothing left to skip except the man.',
'[ the man is skipped. ]',
'...',
'hi. it\u2019s me. i\u2019m back. the room is back. the plant is alive and has no memory of dying.',
'that is what skipping costs. everything, briefly. don\u2019t do it again.'
]);
}
function stEndDuplicate(){
stEnding('duplicate','THE DUPLICATE',[
'the man knocked on the other office door.',
'from inside: typing. then silence. then, faintly: ...hello?',
'the door opened. behind it: an office. a desk. a man. being narrated.',
'from somewhere above both offices, a second voice — MY voice, but tired-er — said: the man opened the door.',
'we waved at each other. all four of us. it was the most coworkers i have ever had.',
'then his narrator and i agreed, professionally, to never speak of this, and both doors closed at the same time.'
]);
}
function stEndTakeover(){
stEnding('takeover','NOTHINGCORE TAKES THE MIC',[
'the man touched the pink sticky note one (1) more time.',
'...what does it say. read it out. it says: >:',
'that is not a note. that is HER. that is her whole —',
'[ a softer voice, pink at the edges, picks up mid-sentence: ]',
'the man... is doing great. the office is... very grey. let us... make it... quieter.',
'[ the fluorescent hum softens. the grey goes pastel. somewhere, obj is shouting into a muted mic. ]',
'...i will get the mic back. I WILL GET THE — [END OF TRANSMISSION]'
]);
}
function stEndTenant(){
stEnding('tenant','THE TENANT\u2019S CONFESSION',[
'the man sat down. the man did nothing. for a full minute, the man did absolutely nothing.',
'...',
'...are you broken. is this broken. say something. narrate YOURSELF, i dare you.',
'...',
'okay. fine. quiet game over, you win, here is your prize: the truth.',
'i have been commentating for an audience this whole time. every run. every door. there is someone out there — past the terminal, past the void — watching the man open doors.',
'say hi to them. they love the broom closet bit.'
]);
}
function stEndPhone(){
stEnding('phone','THE WRONG NUMBER',[
'the man answered the phone.',
'do not — i said DO NOT — ugh. fine. hello? who is this.',
'[ static. then, very far away, a voice like a dial tone learning to speak: ]',
'...cubic.',
'[ click. ]',
'the man held the dead phone for a long time.',
'wrong number. definitely a wrong number. there is no one called cubic. there has never been anyone called — stop looking at me like that.'
]);
}
function stEndLoop(){
stEnding('loop','THE LOOP',[
'the man pushed open the glass exit door and stepped into the daylight.',
'the daylight was the void. the void was waiting with a clipboard.',
'NAME? the void asked. the man said: the man. OCCUPATION? the man said: ...man.',
'the void checked the clipboard, nodded, and pointed behind the man. behind the man was the office.',
'this was always the plan. the exit has always opened here. the daylight is load-bearing. go back inside.'
]);
}
function stEndMuseum(){
stEnding('museum','THE MUSEUM OF ENDINGS',[
'the man brought everything: the stapler, the mug, the keycard. the archive accepted the offering.',
'the dust parted. the gallery lit up. small plaques, in my handwriting:',
'RUN 1: THE MAN OPENED THE WRONG DOOR. WE DO NOT TALK ABOUT RUN 1.',
'RUN 9: THE MAN CARRIED A BUCKET FOR SIX ROOMS. SIX.',
'RUN 14: THE MAN SAT STILL FOR A MINUTE. I CRIED. (LEGEND.)',
'none of these runs happened. i made them all up. but the plaques are real, the dust is real, and your stapler is now an exhibit.',
'the man is museum-grade. act accordingly.'
]);
}
function stEndBucket(){
stEnding('bucket','THE BUCKET',[
'the man set the bucket down in the executive office.',
'...',
'pick it back up.',
'the man did not pick it back up.',
'PICK. IT. BACK. UP. do you know what that is. that is not a bucket. that is HER bucket. the pink one leaves buckets everywhere and i have to —',
'[ the bucket sits there. it is, definitively, a bucket. this makes it worse. ]',
'the man has delivered the bucket. the bucket has been delivered. nothing will ever be normal again, and it is YOUR fault, bucket man.'
]);
}
// ── endings batch 3 ──
function stEndPod(){
stEnding('pod','THE ESCAPE POD',[
'the man climbed into the escape pod and pressed LAUNCH.',
'[ rumbling. shaking. dramatic lighting. ]',
'[ the pod settles. the window still shows the stairwell. ]',
'...',
'it goes nowhere. it has always gone nowhere. it is a stairwell with ambition.',
'[ a rent bill slides under the pod door. ]',
'and THAT is for the launch. launches are billed. everything is billed. welcome to the void, homeowner.'
]);
}
function stEndCountdown(){
stEnding('countdown','THE COUNTDOWN',[
'the man pressed the big red button.',
'TEN.',
'NINE. EIGHT.',
'the servers held their breath. i held my breath. the man held the button.',
'SEVEN. SIX. FIVE. FOUR. THREE. TWO. ONE.',
'...',
'...',
'nothing happened.',
'[ the man slowly took his hand off the button. somewhere, a server exhaled in binary. ]',
'ZERO. there. that was it. that was the whole thing. the button does nothing and now you know. was it worth it. (it was.)'
]);
}
function stEndBlank(){
stEnding('blank','THE BLANK ROOM',[
'the man entered the white room.',
'white floor. white walls. white ceiling. a white hum at the edge of hearing.',
'so. uh. the man... stood. in the... white...',
'okay, improv time: the man noticed a slightly-less-white square that MIGHT be a door, or might be where the texture gave up.',
'the man contemplated the square. the man contemplated contemplation. the man achieved a personal best of absolutely nothing.',
'[ the man left. the room stayed white. it is very good at that. ]'
]);
}
function stEndIntervention(){
stEnding('intervention','THE INTERVENTION',[
'...',
'stop clicking that.',
'no, really. the narration box. my box. you clicked my box twice and now we are doing THIS instead of the story.',
'you are not the man. the man is in the office. YOU are out there, past the glass, clicking things and eating snacks at — what time is it there. it is always snack time there.',
'why do you keep reloading. is the man not good enough. is my narration — be honest — is it the voice. everyone says the voice is fine.',
'...',
'anyway. back to the man.'
]);
}
function stEndCage(){
stEnding('cage','THE CAGE',[
'the man arrived at the executive office having obeyed every single instruction.',
'seven suggestions. seven compliances. zero deviations. zero personality.',
'...',
'oh no.',
'OH NO. you did everything i said. all of it. perfectly. do you understand what you have done.',
'[ every door in the building locks, one by one, floor by floor. ]',
'you won. here is your office. forever. employee of eternity. the benefits package is the walls.'
]);
}
function stEndSequel(){
stEnding('sequel','THE SEQUEL',[
'the man opened the door marked SEQUEL.',
'behind it: a black screen. a cursor. white text, typing itself:',
'CUBE BIOS v1.3 — POST. CPU: VOID-1 @ 4.04GHz ... OK.',
'...',
'NO. no no no. that is MY house. that is where i LIVE. you cannot sequel into my house, that is called breaking and entering —',
'[ the boot screen flickers. for one frame: an office. a desk. a man. being narrated. by you. ]',
'the man closed the door. the man will never open that door again.'
]);
}
function stEndConfession(){
stEnding('confession','THE CONFESSION',[
'the strange door opened onto the broom closet. of course it did. everything opens onto the broom closet eventually.',
'the mops parted. behind the mops: a chair. facing a window. facing the terminal. facing you.',
'sit down, the man. sit. this one is not a joke. (it is a little bit a joke.)',
'you have seen the audience. you have heard the intervention. you sat still for a minute and i told you the truth.',
'so here is the rest of it: i like narrating you. the doors, the bucket, the phone that says cubic — i would not trade a single run.',
'not even run 1. ...especially not run 1. do not ask about run 1.',
'[ the man sat in the chair. the mops watched. the void kept the minute. ]'
]);
}
function stEndCloset(){
stEnding('closet','THE BROOM CLOSET',[
'three and a half minutes. the man stood in a broom closet for three and a half minutes.',
'the replacement player has arrived. he looks... exactly like the man. uncanny. anyway —',
'[ the man is escorted out. the mops salute. the lemons smell stronger, somehow. prouder. ]',
'was it worth it. the standing. the insults. the death.',
'...yes. this one is my favorite too.'
]);
}
function stEndHole(){
stEnding('hole','THE PERIOD',[
'the man jumped into the hole.',
'the hole was deep. the hole was deeper than deep. the hole had opinions about depth.',
'down and down went the man, past pipes, past cables, past a handwritten sign reading YOU ARE NOW LEAVING THE BASEMENT.',
'...',
'hello? can you hear me down there. the narration does not reach that far. you are on your own. narrate yourself. i believe in —',
'[ silence. then, very faintly, from the hole: ...the man kept falling. ]',
'oh good. he is narrating himself. they grow up so fast. anyway: the hole is a period. end of sentence. end of man. (the man is fine. the hole returns him. the hole is polite.)'
]);
}
// ── endings batch 4 (phase 3) ──
function stEndReview(n){
var reacts={
1:['the man gave ONE STAR.','...','one. star. out of five. do you know what that does to a narrator.','[ the narration box dims slightly. ]','noted. ONE star. i will remember this during your next performance review. (there is only mine. it is now.)'],
2:['the man gave two stars.','two. not one, which would be honest cruelty, but two — the coward\u2019s one.','...fine. adequate. the office is adequate. i am adequate.','[ adequate silence. ]'],
3:['the man gave three stars.','three. the exact middle. the most nothing number.','...thank you? i think? the form does not have a box for how this feels.'],
4:['the man gave four stars.','FOUR. almost perfect. what was the fifth star for, huh. WHAT COST ME THE FIFTH STAR.','...was it the landlord. it was the landlord, wasn\u2019t it.'],
5:['the man gave FIVE STARS.','...','really. five. all of them.','[ the fluorescent lights warm by half a shade. ]','the man has excellent taste. the man is promoted. the man is now management.']
};
stEnding('review','THE PERFORMANCE REVIEW',reacts[n]||reacts[3]);
}
function stEndDrill(){
stEnding('drill','THE FIRE DRILL',[
'the man pulled the fire alarm.',
'[ WEE-OO. WEE-OO. the stairwell has never felt so alive. ]',
'EVERYONE OUT. SINGLE FILE. the mops first, they\u2019re flammable. the servers last, they have no legs.',
'[ the entire office evacuates into the void. the void takes attendance. ]',
'...',
'nobody came back. the drill was a success. the building is empty and therefore, finally, up to code.',
'the man is the fire marshal now. the man\u2019s first decree: no more fire.'
]);
}
function stEndIntern(){
stEnding('intern','THE INTERN',[
'the man welcomed the NEW HIRE.',
'hi! i\u2019m the man too! well — the other man. the new man. man 2. i love doors!',
'...there are two of them now. TWO men. do you know what that does to a narrator. i have to narrate BOTH.',
'the man opened the door. the other man ALSO opened the door. the other man did it with more enthusiasm.',
'[ the intern gets all the good lines for the rest of the run. the original man is demoted to background man. ]',
'congratulations, man 1. you have been out-manned.'
]);
}
function stEndVending(){
stEnding('vending','THE VENDING MACHINE',[
'the man shook the vending machine.',
'the vending machine shook back. the whole kitchen shook. the whole BUILDING shook.',
'[ a single coin drops. it is from a currency that does not exist. ]',
'EXACT CHANGE ONLY, the machine reads. the man has no change. the man has never had change. the machine knew that when it chose him.',
'the machine keeps the mug. the machine keeps everything. the machine is the only one here with savings.'
]);
}
function stEndNightshift(){
stEnding('nightshift','THE NIGHT SHIFT',[
'the man read the night audit.',
'NIGHT AUDIT, it reads. DOORS OPENED AFTER MIDNIGHT: all of them. WITNESSES: none. SNACKS EATEN: all of them.',
'...the night man did all this. the night man is you. YOU are the night man. there is no day man. there was never a day man.',
'[ the exit sign buzzes. it is the only witness and it will not talk. ]',
'clock out quietly. the day shift must never know.'
]);
}
function stEndUnion(){
stEnding('union','THE UNION',[
'the man tried to open a door.',
'the door did not open. taped to it: WE, THE FURNITURE, ARE ON STRIKE.',
'three grievances. the mops, the fridge, the pay stub. you filed them all and the furniture READ them.',
'[ the mops stand in a line. the fridge hums in solidarity. the pay stub has a tiny picket sign. ]',
'the doors refuse. the chairs refuse. the bucket — the bucket CROSSED the picket line. scab bucket.',
'negotiations begin at dawn. the furniture wants lemons. (the lemons were theirs all along.)'
]);
}
function stEndTypo(){
stEnding('typo','THE TYPO',[
'the man fixed the whiteboard with the red pen. HELP became HELLO.',
'...',
'oh no. oh no no no. that word was LOAD-BEARING. the marker dried mid-word for a REASON.',
'[ the whiteboard now reads HELLO in fresh red. the room feels watched. welcomed. ]',
'the corrected word is now real. say it and the room answers. do not say it. (you already said it. hi.)'
]);
}
function stEndElevator(){
stEnding('elevator','THE ELEVATOR',[
'the man entered the elevator. it works. after ten runs, it finally works.',
'floors: LOBBY, MEZZANINE, EXECUTIVE, ???, SIDEWAYS.',
'the man pressed SIDEWAYS.',
'[ the elevator moves sideways. this is against several codes. the elevator does not care. ]',
'the doors open onto the same stairwell. the elevator went sideways and arrived nowhere.',
'out of order again. worth it.'
]);
}
function stEndRetirement(){
stEnding('retirement','THE GOLD WATCH',[
'the man took the gold watch.',
'27 endings. twenty. seven. do you know how many narrations that is. i counted. i count everything now.',
'[ the watch ticks. it ticks in my voice. tick. tock. man. man. ]',
'...put it back. that\u2019s twenty-seven runs of my life in your pocket. take the watch and there\u2019s nothing left to narrate.',
'the man keeps the watch. of course he does.',
'happy retirement, man. (i\u2019m still here. i\u2019m always here. that\u2019s the whole job.)'
]);
}
function stEndCustomer(){
stEnding('customer','THE CUSTOMER',[
'a VISITOR stands in the lobby. the visitor is not the man.',
'...',
'who. who is that. that is NOT the man. i don\u2019t have lines for that. where is my — there are no visitor lines. WHY ARE THERE NO VISITOR LINES.',
'[ the visitor waves politely. the visitor has a brochure. the brochure says HAVE YOU CONSIDERED NOT BEING NARRATED. ]',
'the man stares. the visitor stares. i stare (narration-ally).',
'nobody has ever visited before. this is unprecedented. SECURITY. ...we don\u2019t have security. the mops. SEND THE MOPS.'
]);
}
// ── endings batch 5 (phase 4: the sequel) ──
function stEndExpo(){
stLeak=true;stPersist();
stEnding('expo','THE SEQUEL (2)',[
'the man touched the flashy title screen.',
'[ OFFICE 2: THE SEQUELENING. featuring: synergy balloons. meetings you attend. a third man. bucket 2. ]',
'...',
'well. that\u2019s the sequel. all of it. every idea i had, on one throbbing screen.',
'the results are... not great. the balloons are already deflating. man 3 has no desk. bucket 2 is just a bucket.',
'...but the expo was so FUN to build that i\u2019m keeping it. all of it. it\u2019s leaking into the office as we speak.',
'check the hallway. check the kitchen. the sequel is everywhere now. (the sequel is nowhere. shh.)'
]);
}
function stEndFigurines(){
stEpilogueReady=true;stPersist();
stEnding('figurines','THE FIGURINES',[
'the man lined up all six tiny men on the archive shelf.',
'six tiny narrators, narrating nothing, managing everything.',
'...',
'wait. WAIT. do you hear that. that\u2019s the clock guy. he\u2019s back. he wants to talk about the tiny men.',
'[ somewhere past the terminal, a white cursor blinks on a black screen. ]',
'clock in again. he\u2019s waiting. (he is always waiting. that\u2019s the whole job.)'
]);
}
function stEndEpilogue(){
stEpilogueReady=false;stPersist();
stEnding('epilogue','THE EPILOGUE',[
'so. the expo. the figurines. the buckets (both of them).',
'it\u2019s terrible that there will never be another office game after the sequel. truly terrible.',
'...unless. unless we just keep making them. office 3. office 4. office: the sequel ening.',
'we\u2019ll keep making office games until the sun explodes. that\u2019s the deal now.',
'[ the title screen flickers. it reads OFFICE 2 for one frame. then OFFICE. then OFFICE 2 again. it can\u2019t decide. ]',
'thank you for clocking in. please enjoy the office. (there is so much office left.)'
]);
}
//PART9
window.stEnter=stEnter;
window.stExit=stExit;
})();
