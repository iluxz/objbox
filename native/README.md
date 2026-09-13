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

- Dark teal/purple visual language and a small animated geometric cube.
- Escape opens a main menu (and intercepts the window close request); it does
  not terminate the app.
- Theme, inner-shape, and audio-channel controls.
- VoidStudio launch placeholder panel.
- Update check/install placeholder. The configured static manifest endpoint is
  `https://raw.githubusercontent.com/voidstudio/signal-native/main/update.json`;
  the current shell records the endpoint without making a network request.
- Native terminal panel with `help`, `status`, `clear`, `studio`, and `update`.

This is an architecture and visual shell, not a full port of every browser
feature. Audio playback, remote update downloads, and the VoidStudio bridge
are intentionally left as integration points.
