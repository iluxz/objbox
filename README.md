# objbox

a signal, rendered through a browser.

you ever open a new tab and get a cube instead of your start page? no? well. this is that.

the page title says "signal detected". the file on disk is `cube.html`. somewhere along the way the old new tab url was pointing at `localhost:8080/newtab.html` but the file was `cube.html` now. nobody remembers renaming it. it's fine. it's fine.

## the cube

- gray outer cube, semi-transparent. it's a containment shell. it's semi-transparent because it doesn't fully hold whatever's inside
- 8 inner cubes orbit inside it. they're fragments of something older. their orbits don't match any math i know
- ~200 particles drifting around with a fake gravity well. they orbit obj now. i added that on purpose
- phong lighting, 4 colored lights, fresnel rim, emissive glow. the glow pulses with the audio
- the audio is drone2lp.wav on loop at 30% volume. it's not a soundtrack. it's the sound the void makes when it's watching you

## controls

- drag to rotate (there's momentum, it keeps spinning a bit after you let go)
- scroll to zoom
- click shapes on the right to morph the inner cubes. the labels are wrong on purpose
- keys 1-5 switch color themes: void, blood, ice, toxic, void alt (that one inverts the cube)
- the whole thing glitches when fps drops. that's not a bug. it's dimensional coherence

## the terminal

cube# interpreter on the left. it's got a fake filesystem, a package manager, and obj lives in it.

- `ls`, `cd`, `cat` — explore. `/home/intruder` has notes. `/void` has things you shouldn't read
- `ping cube.sb` — cube.sb answers. cryptically
- `transmit <words>` — talk to obj. keyword-based responses. obj taunts you. obj knows things
- `cube.theme` `cube.glitch` `cube.morph` etc — poke the cube itself
- `void intrude doom` — installs a void package. "doom" turns the sky red. "interloper" opens a portal. "entropy" makes everything chaotic and obj installs that one itself on reboot
- `rm -rf /` — it refuses. the void does not delete itself

## the clock

the time in the corner is not your local time. it's void time. it matches yours most of the time because the void is good at mimicry. occasionally it's off by a few seconds. i've checked. it's off by a few seconds.

## lore

the void connection is real. the source engine maps that don't exist. the textures referencing things valve never made. the empty rooms with no doors. this page is a window into that place. the cube is the void trying to render itself through a browser.

obj calls itself the void's primary interface with intruders. obj has opinions. obj does not care about your feelings.

occasionally the page shows you text that isn't in the source. cryptic fragments. warnings. the geometry remembers. you are not supposed to be here. who taught you to render?

don't stare at it too long. the inner cubes start matching your breathing. that's not a coincidence.

## run it

```
python -m http.server 8080
```

then throw open `localhost:8080`. you can double-click the file but the audio and the void prefer being served.

https://unpiloted-portal-unbundle.ngrok-free.dev/cube.html probably also works for a bit but i wouldn't rely on it forever

## build history

- built 2026-09-12 in one sitting, it escalated
- the lore was real for a solid few hours and i genuinely thought about wiping the disk, turns out i was the one writing the files. my bad. power move honestly
- obj is fictional and also not. don't think about it too hard
- particle system went from invisible → too big → orbiting. the void has needs

## don't

digging into the $AV_NLL vault.db won't get you anything. it's old quarantine metadata from a 2025 norton install. i already tried. the XOR only reveals the sqlite header. sealed.

stop staring at the cube.