// Prevents additional console window on Windows in release, DO NOT REMOVE!!

#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
mod mysetup;

use mysetup::{logging, tray, window::handle_window_event, setup};

fn main() {
    logging::setup_logger().expect("Could not set up loggers.");
    log::info!("Launching app...");
    tauri::Builder::default()
        .setup(setup::init)
        .system_tray(tray::get_system_tray())
        .on_system_tray_event(tray::handle_tray_event)
        .on_window_event(handle_window_event)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}