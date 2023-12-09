use tauri::{App, Manager};
use window_vibrancy::{self, NSVisualEffectMaterial};


pub fn init(app: &mut App) -> std::result::Result<(), Box<dyn std::error::Error>>{
    let win = app.get_window("main").unwrap();

    #[cfg(target_os = "macos")]
    window_vibrancy::apply_vibrancy(&win, NSVisualEffectMaterial::FullScreenUI)
        .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

    #[cfg(target_os = "windows")]
    let is_feature_enabled = true; 
    window_vibrancy::apply_mica(&win, Some(is_feature_enabled))
        .expect("Unsupported platform! 'apply_mica' is only supported on Windows");

    Ok(())
}