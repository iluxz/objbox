# Signal Detected — native shell

This is a bounded native Rust/egui shell for the experience in `cube.html`.
It intentionally does **not** modify or replace the browser implementation.

## Run

From this directory:

```sh
cargo run
```

The first build downloads `eframe` and `egui` from crates.io. `cargo check`
is enough to validate the project without launching a window.

## Included shell surfaces

- Dark teal/purple visual language and an animated, draggable geometric cube.
- Drag inside the cube to orbit it, use the mouse wheel to zoom, and watch the
  inner shape and particle field orbit continuously.
- Escape opens a main menu (and intercepts the window close request); it does
  not terminate the app.
- Theme, inner-shape, and audio-channel controls.
- VoidStudio launch placeholder panel.
- Update metadata check against the configured static manifest endpoint. The
  check runs off the UI thread, validates JSON metadata, and never downloads or
  executes a binary. Releases must be manually verified (including their
  checksum/signature) before installation.
- Local audio asset discovery in `assets/`, `../assets/`, and `audio/`. Audio
  playback remains opt-in integration work because this checkout contains no
  audio assets and the native shell deliberately avoids a heavyweight decoder.
- Native terminal panel with `help`, `status`, `clear`, `studio`, and `update`.

This is an architecture and visual shell, not a full port of every browser
feature. The VoidStudio bridge and audio playback are intentionally left as
integration points.
