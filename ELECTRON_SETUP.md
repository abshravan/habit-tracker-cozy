# Electron Desktop App Setup Guide

This guide will help you set up the desktop version of the Cozy Habit Tracker using Electron.

## Current Status

The app is currently configured to run as a **web application** using Vite. To convert it to a desktop app with Electron, follow the steps below.

## Steps to Add Electron

### 1. Install Electron Dependencies

```bash
npm install --save-dev electron electron-builder concurrently wait-on
```

### 2. Update package.json Scripts

Replace the scripts section in `package.json` with:

```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev:react\" \"npm run dev:electron\"",
    "dev:react": "vite",
    "dev:electron": "wait-on http://localhost:5173 && electron .",
    "build": "tsc && vite build && electron-builder",
    "build:react": "tsc && vite build",
    "preview": "vite preview",
    "type-check": "tsc --noEmit"
  }
}
```

### 3. Add Electron Builder Configuration

Add this to `package.json`:

```json
{
  "main": "electron/main.js",
  "build": {
    "appId": "com.cozyhabittracker.app",
    "productName": "Cozy Habit Tracker",
    "directories": {
      "output": "release"
    },
    "files": [
      "dist/**/*",
      "electron/**/*",
      "package.json"
    ],
    "mac": {
      "category": "public.app-category.productivity",
      "icon": "assets/icon.icns"
    },
    "win": {
      "target": "nsis",
      "icon": "assets/icon.ico"
    },
    "linux": {
      "target": "AppImage",
      "icon": "assets/icon.png"
    }
  }
}
```

### 4. The Electron Main Process is Already Created

The `electron/main.js` file is already in the project. It handles:
- Creating the application window
- Loading the React app (from dev server or built files)
- Window management and lifecycle

### 5. Update Vite Config for Electron

The current `vite.config.ts` is already configured with:
- `base: './'` for relative paths (required for Electron)
- Output to `dist/react` folder

### 6. Running the Desktop App

Once Electron is installed:

```bash
# Development mode (hot reload)
npm run dev

# Build for production
npm run build
```

The production build will create platform-specific installers in the `release/` folder.

## Features in Desktop Mode

When running as an Electron app, you get:

- **Offline Mode**: Works without internet connection
- **Native Menus**: OS-specific menu bars
- **System Tray**: Minimize to system tray (can be added)
- **Auto-Launch**: Start with OS (can be configured)
- **Native Notifications**: Desktop notifications for habits
- **Better Performance**: Native rendering
- **Standalone App**: No browser required

## Troubleshooting

### Build Fails
- Make sure you're using Node.js v18 or higher
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`

### Electron Won't Start
- Make sure the React dev server is running on port 5173
- Check that `wait-on` is waiting for the correct URL

### White Screen in Production
- Verify that `base: './'` is set in vite.config.ts
- Check that paths in electron/main.js are correct

## Optional Enhancements

### 1. System Tray Icon

Add to `electron/main.js`:

```javascript
const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');

let tray = null;

app.whenReady().then(() => {
  tray = new Tray(path.join(__dirname, 'assets/tray-icon.png'));
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show App', click: () => mainWindow.show() },
    { label: 'Quit', click: () => app.quit() }
  ]);
  tray.setContextMenu(contextMenu);
});
```

### 2. Auto-Launch at Startup

```bash
npm install auto-launch
```

Add to `electron/main.js`:

```javascript
const AutoLaunch = require('auto-launch');

const autoLauncher = new AutoLaunch({
  name: 'Cozy Habit Tracker',
  path: app.getPath('exe'),
});

autoLauncher.enable();
```

### 3. Native Notifications

```javascript
const { Notification } = require('electron');

function showNotification(title, body) {
  new Notification({ title, body }).show();
}
```

## Building for Distribution

### macOS

```bash
npm run build
# Creates .dmg and .app in release/
```

### Windows

```bash
npm run build
# Creates .exe installer in release/
```

### Linux

```bash
npm run build
# Creates AppImage in release/
```

## Code Signing (for Production)

For distribution, you'll want to code sign your app:

- **macOS**: Requires Apple Developer account ($99/year)
- **Windows**: Requires code signing certificate
- **Linux**: No signing required

See [Electron Builder docs](https://www.electron.build/code-signing) for details.

## Current Running Instructions

Since Electron is not yet installed, you can run the app in your browser:

```bash
npm run dev
```

Then open http://localhost:5173 in your browser. All features work the same way!
