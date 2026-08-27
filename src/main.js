const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    mainWindow = new BrowserWindow({
        width: 450,
        height: 280,
        transparent: true,
        frame: false,
        alwaysOnTop: true,
        resizable: true,
        minWidth: 300,
        minHeight: 200,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    // ✅ RUTA CORREGIDA - Carga el HTML
    mainWindow.loadFile(path.join(__dirname, 'index.html'));
    
    mainWindow.setAlwaysOnTop(true, 'pop-up-menu');
    mainWindow.setVisibleOnAllWorkspaces(true);
    mainWindow.setMenuBarVisibility(false);

    const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;
    mainWindow.setPosition(
        (screenWidth - 450) / 2,
        (screenHeight - 280) / 2
    );

    // 🔍 Para depurar (comentar después)
    // mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
