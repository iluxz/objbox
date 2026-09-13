use eframe::egui::{self, Color32, RichText, Stroke, Vec2, ViewportCommand, Visuals};
use eframe::{App, CreationContext, Frame, NativeOptions};
use serde::Deserialize;
use std::path::PathBuf;
use std::sync::mpsc::{self, Receiver};
use std::time::{Duration, Instant};

const UPDATE_MANIFEST_URL: &str =
    "https://raw.githubusercontent.com/voidstudio/signal-native/main/update.json";

#[derive(Clone, Copy, PartialEq)]
enum Theme {
    DeepTeal,
    Violet,
    Midnight,
}

impl Theme {
    fn label(self) -> &'static str {
        match self {
            Self::DeepTeal => "Deep teal",
            Self::Violet => "Ultraviolet",
            Self::Midnight => "Midnight",
        }
    }

    fn accent(self) -> Color32 {
        match self {
            Self::DeepTeal => Color32::from_rgb(43, 208, 208),
            Self::Violet => Color32::from_rgb(190, 118, 255),
            Self::Midnight => Color32::from_rgb(121, 177, 255),
        }
    }
}

#[derive(Clone, Copy, PartialEq)]
enum InnerShape {
    Prism,
    Torus,
    Lattice,
    Singularity,
}

impl InnerShape {
    fn label(self) -> &'static str {
        match self {
            Self::Prism => "Prism",
            Self::Torus => "Torus",
            Self::Lattice => "Lattice",
            Self::Singularity => "Singularity",
        }
    }
}

struct SignalApp {
    menu_open: bool,
    theme: Theme,
    shape: InnerShape,
    audio_enabled: bool,
    void_studio_open: bool,
    terminal_open: bool,
    terminal_input: String,
    terminal_lines: Vec<String>,
    update_status: String,
    update_checked_at: Option<Instant>,
    pulse: f32,
    rotation: Vec2,
    zoom: f32,
    audio_asset: Option<PathBuf>,
    manifest_rx: Option<Receiver<Result<UpdateManifest, String>>>,
}

#[derive(Debug, Deserialize)]
struct UpdateManifest {
    version: String,
    #[serde(default)]
    notes: String,
    #[serde(default)]
    url: Option<String>,
    #[serde(default)]
    sha256: Option<String>,
}

impl SignalApp {
    fn new(cc: &CreationContext<'_>) -> Self {
        let app = Self {
            menu_open: false,
            theme: Theme::DeepTeal,
            shape: InnerShape::Prism,
            audio_enabled: true,
            void_studio_open: false,
            terminal_open: false,
            terminal_input: String::new(),
            terminal_lines: vec![
                "signal-native terminal // local session".into(),
                "Type `help` for available commands.".into(),
            ],
            update_status: "No update check performed".into(),
            update_checked_at: None,
            pulse: 0.0,
            rotation: Vec2::new(0.55, -0.35),
            zoom: 1.0,
            audio_asset: discover_audio_asset(),
            manifest_rx: None,
        };
        app.apply_visuals(&cc.egui_ctx);
        app
    }

    fn apply_visuals(&self, ctx: &egui::Context) {
        let accent = self.theme.accent();
        let mut visuals = Visuals::dark();
        visuals.window_fill = Color32::from_rgb(10, 17, 28);
        visuals.panel_fill = Color32::from_rgb(8, 14, 24);
        visuals.faint_bg_color = Color32::from_rgb(15, 28, 39);
        visuals.extreme_bg_color = Color32::from_rgb(3, 7, 13);
        visuals.selection.bg_fill = accent.linear_multiply(0.35);
        visuals.widgets.inactive.bg_fill = Color32::from_rgb(18, 31, 43);
        visuals.widgets.inactive.fg_stroke = Stroke::new(1.0_f32, Color32::from_gray(185));
        visuals.widgets.hovered.bg_fill = accent.linear_multiply(0.24);
        visuals.widgets.active.bg_fill = accent.linear_multiply(0.4);
        ctx.set_visuals(visuals);
    }

    fn command(&mut self, command: &str) {
        let trimmed = command.trim();
        self.terminal_lines.push(format!("> {trimmed}"));
        match trimmed {
            "help" => self
                .terminal_lines
                .push("help, status, clear, studio, update".into()),
            "status" => self.terminal_lines.push(format!(
                "shape={} audio={} theme={}",
                self.shape.label(),
                if self.audio_enabled { "on" } else { "off" },
                self.theme.label()
            )),
            "clear" => self.terminal_lines.clear(),
            "studio" => {
                self.void_studio_open = true;
                self.terminal_lines.push("VoidStudio panel opened.".into());
            }
            "update" => self.check_for_update(),
            "" => {}
            _ => self
                .terminal_lines
                .push("Unknown command. Try `help`.".into()),
        }
    }

    fn check_for_update(&mut self) {
        self.update_checked_at = Some(Instant::now());
        let (tx, rx) = mpsc::channel();
        self.manifest_rx = Some(rx);
        self.update_status = "Fetching signed metadata (no binary download)…".into();
        std::thread::spawn(move || {
            let result = std::process::Command::new("curl")
                .args([
                    "--fail",
                    "--silent",
                    "--show-error",
                    "--max-time",
                    "8",
                    UPDATE_MANIFEST_URL,
                ])
                .output()
                .map_err(|error| error.to_string())
                .and_then(|output| {
                    if output.status.success() {
                        String::from_utf8(output.stdout).map_err(|error| error.to_string())
                    } else {
                        Err(String::from_utf8_lossy(&output.stderr).trim().to_owned())
                    }
                })
                .and_then(|body| {
                    serde_json::from_str::<UpdateManifest>(&body).map_err(|error| error.to_string())
                });
            let _ = tx.send(result);
        });
        self.terminal_lines.push(
            "Update manifest fetch started; binaries are never downloaded automatically.".into(),
        );
    }

    fn accent(&self) -> Color32 {
        self.theme.accent()
    }

    fn header(&self, ui: &mut egui::Ui) {
        ui.horizontal(|ui| {
            ui.label(
                RichText::new("SIGNAL DETECTED")
                    .strong()
                    .size(16.0)
                    .color(self.accent()),
            );
            ui.label(
                RichText::new("NATIVE SHELL / 0.1.0")
                    .small()
                    .color(Color32::from_gray(120)),
            );
            ui.with_layout(egui::Layout::right_to_left(egui::Align::Center), |ui| {
                ui.label(
                    RichText::new("ESC  MENU")
                        .monospace()
                        .small()
                        .color(Color32::from_gray(125)),
                );
            });
        });
        ui.separator();
    }

    fn draw_cube(&mut self, ui: &mut egui::Ui) {
        let (rect, response) = ui.allocate_exact_size(Vec2::new(420.0, 420.0), egui::Sense::drag());
        if response.dragged() {
            let delta = ui.input(|input| input.pointer.delta());
            self.rotation += delta * 0.012;
        }
        let scroll = ui.input(|input| input.raw_scroll_delta.y);
        if response.hovered() && scroll.abs() > 0.0 {
            self.zoom = (self.zoom + scroll * 0.0015).clamp(0.65, 1.8);
        }
        let painter = ui.painter_at(rect);
        let center = rect.center();
        let radius = (112.0 + self.pulse.sin() * 3.0) * self.zoom;
        let a = self.accent();
        let glow = a.linear_multiply(0.13);
        painter.circle_filled(center, radius + 44.0, glow);
        painter.circle_stroke(
            center,
            radius + 38.0,
            Stroke::new(1.0_f32, a.linear_multiply(0.25)),
        );
        let project = |point: [f32; 3]| {
            let (sy, cy) = self.rotation.x.sin_cos();
            let (sx, cx) = self.rotation.y.sin_cos();
            let x = point[0] * cy - point[2] * sy;
            let z = point[0] * sy + point[2] * cy;
            let y = point[1] * cx - z * sx;
            center + Vec2::new(x, y) * radius / 1.5
        };
        let corners = [
            [-1.0, -1.0, -1.0],
            [1.0, -1.0, -1.0],
            [1.0, 1.0, -1.0],
            [-1.0, 1.0, -1.0],
            [-1.0, -1.0, 1.0],
            [1.0, -1.0, 1.0],
            [1.0, 1.0, 1.0],
            [-1.0, 1.0, 1.0],
        ];
        let edges = [
            (0, 1),
            (1, 2),
            (2, 3),
            (3, 0),
            (4, 5),
            (5, 6),
            (6, 7),
            (7, 4),
            (0, 4),
            (1, 5),
            (2, 6),
            (3, 7),
        ];
        for (from, to) in edges {
            painter.line_segment(
                [project(corners[from]), project(corners[to])],
                Stroke::new(2.0_f32, a),
            );
        }
        for index in 0..18 {
            let t = self.pulse * (0.35 + index as f32 * 0.013) + index as f32;
            let point = [
                t.sin() * 1.45,
                (t * 1.7).cos() * 1.25,
                (t * 0.8).sin() * 1.45,
            ];
            let projected = project(point);
            painter.circle_filled(
                projected,
                (1.5 + (t * 2.0).sin().abs() * 2.0) * self.zoom,
                a.linear_multiply(0.55),
            );
        }
        let inner = match self.shape {
            InnerShape::Prism => vec![
                [-0.5, -0.5, -0.5],
                [0.5, -0.5, -0.5],
                [0.5, 0.5, 0.5],
                [-0.5, 0.5, 0.5],
            ],
            InnerShape::Torus => (0..10)
                .map(|i| {
                    let t = i as f32 * std::f32::consts::TAU / 10.0;
                    [t.cos() * 0.65, t.sin() * 0.65, 0.0]
                })
                .collect(),
            InnerShape::Lattice => vec![
                [-0.6, -0.6, -0.6],
                [0.6, -0.6, 0.6],
                [0.6, 0.6, -0.6],
                [-0.6, 0.6, 0.6],
            ],
            InnerShape::Singularity => vec![[0.0, 0.0, 0.0]],
        };
        for (index, point) in inner.iter().enumerate() {
            let next = inner[(index + 1) % inner.len()];
            painter.line_segment(
                [project(*point), project(next)],
                Stroke::new(2.5_f32, a.linear_multiply(0.85)),
            );
        }
        painter.text(
            center,
            egui::Align2::CENTER_CENTER,
            self.shape.label().to_uppercase(),
            egui::FontId::monospace(13.0),
            a,
        );
    }

    fn side_panel(&mut self, ui: &mut egui::Ui) {
        ui.heading(RichText::new("CONTROL DECK").color(self.accent()));
        ui.add_space(8.0);
        ui.label("INNER SHAPE");
        for shape in [
            InnerShape::Prism,
            InnerShape::Torus,
            InnerShape::Lattice,
            InnerShape::Singularity,
        ] {
            if ui
                .selectable_label(self.shape == shape, shape.label())
                .clicked()
            {
                self.shape = shape;
            }
        }
        ui.add_space(14.0);
        ui.label("AUDIO LINK");
        ui.checkbox(&mut self.audio_enabled, "ambient channel enabled");
        ui.add_space(14.0);
        ui.label("THEME");
        for theme in [Theme::DeepTeal, Theme::Violet, Theme::Midnight] {
            if ui
                .selectable_label(self.theme == theme, theme.label())
                .clicked()
            {
                self.theme = theme;
                self.apply_visuals(ui.ctx());
            }
        }
        ui.add_space(18.0);
        if ui.button("Open VoidStudio").clicked() {
            self.void_studio_open = true;
        }
        if ui.button("Native terminal").clicked() {
            self.terminal_open = true;
        }
        ui.add_space(10.0);
        ui.label(RichText::new("UPDATE CHANNEL").color(Color32::from_gray(135)));
        if ui.button("Check for updates").clicked() {
            self.check_for_update();
        }
        ui.label("Install is manual: verify the release signature and checksum before replacing the app.");
        ui.small(&self.update_status);
        ui.small(format!(
            "audio asset: {}",
            self.audio_asset
                .as_ref()
                .map_or("not found", |_| "discovered (playback opt-in pending)")
        ));
    }

    fn menu(&mut self, ctx: &egui::Context) {
        egui::Window::new("MAIN MENU")
            .collapsible(false)
            .resizable(false)
            .default_width(330.0)
            .anchor(egui::Align2::CENTER_CENTER, Vec2::ZERO)
            .show(ctx, |ui| {
                ui.label(RichText::new("The signal remains open.").color(self.accent()));
                ui.add_space(12.0);
                ui.horizontal(|ui| {
                    ui.label("Theme");
                    egui::ComboBox::from_id_salt("menu-theme")
                        .selected_text(self.theme.label())
                        .show_ui(ui, |ui| {
                            for theme in [Theme::DeepTeal, Theme::Violet, Theme::Midnight] {
                                if ui
                                    .selectable_value(&mut self.theme, theme, theme.label())
                                    .clicked()
                                {
                                    self.apply_visuals(ctx);
                                }
                            }
                        });
                });
                ui.checkbox(&mut self.audio_enabled, "Audio channel");
                ui.add_space(10.0);
                if ui.button("Resume signal").clicked() {
                    self.menu_open = false;
                }
                ui.label(
                    RichText::new("Escape toggles this menu; it never closes the app.")
                        .small()
                        .italics(),
                );
            });
    }
}

fn discover_audio_asset() -> Option<PathBuf> {
    let roots = [
        PathBuf::from("assets"),
        PathBuf::from("../assets"),
        PathBuf::from("audio"),
    ];
    roots
        .iter()
        .filter_map(|root| std::fs::read_dir(root).ok())
        .flat_map(|entries| entries.filter_map(Result::ok).map(|entry| entry.path()))
        .find(|path| {
            path.extension()
                .and_then(|extension| extension.to_str())
                .map(|extension| {
                    matches!(
                        extension.to_ascii_lowercase().as_str(),
                        "wav" | "ogg" | "mp3" | "flac"
                    )
                })
                .unwrap_or(false)
        })
}

impl App for SignalApp {
    fn update(&mut self, ctx: &egui::Context, _frame: &mut Frame) {
        self.pulse += ctx.input(|i| i.stable_dt).min(0.1);
        if let Some(receiver) = &self.manifest_rx {
            if let Ok(result) = receiver.try_recv() {
                self.manifest_rx = None;
                self.update_status = match result {
                    Ok(manifest) => {
                        let checksum = if manifest.sha256.is_some() {
                            "checksum supplied"
                        } else {
                            "no checksum supplied"
                        };
                        let destination = manifest
                            .url
                            .as_deref()
                            .unwrap_or("release URL not supplied");
                        format!(
                            "Latest {} ({checksum}); {destination}; download remains manual. {}",
                            manifest.version, manifest.notes
                        )
                    }
                    Err(error) => format!("Manifest check failed safely: {error}"),
                };
            }
        }
        if ctx.input(|i| i.key_pressed(egui::Key::Escape)) {
            self.menu_open = !self.menu_open;
        }
        if ctx.input(|i| i.viewport().close_requested()) {
            ctx.send_viewport_cmd(ViewportCommand::CancelClose);
            self.menu_open = true;
        }
        ctx.request_repaint_after(Duration::from_millis(33));

        egui::TopBottomPanel::top("header").show(ctx, |ui| self.header(ui));
        egui::SidePanel::right("controls")
            .min_width(210.0)
            .show(ctx, |ui| self.side_panel(ui));
        egui::CentralPanel::default().show(ctx, |ui| {
            ui.vertical_centered(|ui| {
                ui.add_space(18.0);
                self.draw_cube(ui);
                ui.label(
                    RichText::new("A quiet geometry for a loud universe")
                        .color(Color32::from_gray(145)),
                );
                ui.small(format!(
                    "inner channel: {}  •  audio: {}",
                    self.shape.label(),
                    if self.audio_enabled { "ON" } else { "OFF" }
                ));
            });
        });

        if self.void_studio_open {
            let accent = self.accent();
            egui::Window::new("VOIDSTUDIO // LAUNCH PLACEHOLDER")
                .open(&mut self.void_studio_open)
                .default_size(Vec2::new(450.0, 260.0))
                .show(ctx, |ui| {
                    ui.heading(RichText::new("VoidStudio").color(accent));
                    ui.label("The native studio bridge is ready for a future renderer or editor.");
                    ui.add_space(12.0);
                    ui.label("Launch target: configured / not connected");
                    ui.add_enabled(false, egui::Button::new("Launch VoidStudio (coming soon)"));
                });
        }
        if self.terminal_open {
            let accent = self.accent();
            let mut terminal_open = self.terminal_open;
            egui::Window::new("NATIVE TERMINAL")
                .open(&mut terminal_open)
                .default_size(Vec2::new(560.0, 300.0))
                .show(ctx, |ui| {
                    egui::ScrollArea::vertical()
                        .stick_to_bottom(true)
                        .show(ui, |ui| {
                            for line in &self.terminal_lines {
                                ui.label(RichText::new(line).monospace().color(accent));
                            }
                        });
                    ui.separator();
                    let response = ui.add(
                        egui::TextEdit::singleline(&mut self.terminal_input).hint_text("command"),
                    );
                    if response.lost_focus() && ui.input(|i| i.key_pressed(egui::Key::Enter)) {
                        let command = std::mem::take(&mut self.terminal_input);
                        self.command(&command);
                        response.request_focus();
                    }
                });
            self.terminal_open = terminal_open;
        }
        if self.menu_open {
            self.menu(ctx);
        }
    }
}

fn main() -> eframe::Result<()> {
    let options = NativeOptions {
        viewport: egui::ViewportBuilder::default()
            .with_title("Signal Detected — Native")
            .with_inner_size([1100.0, 720.0])
            .with_min_inner_size([820.0, 560.0]),
        ..Default::default()
    };
    eframe::run_native(
        "Signal Detected — Native",
        options,
        Box::new(|cc| Ok(Box::new(SignalApp::new(cc)))),
    )
}
