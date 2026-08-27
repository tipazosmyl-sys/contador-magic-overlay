const { app, BrowserWindow, screen, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    mainWindow = new BrowserWindow({
        width: 400,
        height: 250,
        transparent: true,        // Fondo transparente
        frame: false,            // Sin bordes ni barra de título
        alwaysOnTop: true,       // Siempre encima
        skipTaskbar: false,
        resizable: true,         // Redimensionable
        minWidth: 300,
        minHeight: 200,
        maxWidth: 800,
        maxHeight: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
        icon: path.join(__dirname, '../icon.ico')
    });

    mainWindow.loadFile(path.join(__dirname, 'index.html'));
    
    // Configuraciones de ventana
    mainWindow.setAlwaysOnTop(true, 'pop-up-menu');
    mainWindow.setVisibleOnAllWorkspaces(true);
    mainWindow.setIgnoreMouseEvents(false);
    mainWindow.setMenuBarVisibility(false);
    mainWindow.setBackgroundColor('#00000000'); // Totalmente transparente

    // Centrar la ventana
    mainWindow.setPosition(
        (width - 400) / 2,
        (height - 250) / 2
    );

    // Para desarrollo (comentar en producción)
    // mainWindow.webContents.openDevTools();

    // Guardar posición al cerrar
    mainWindow.on('close', () => {
        const [x, y] = mainWindow.getPosition();
        const size = mainWindow.getSize();
        app.setAppUserModelId('com.magic.overlay.counter');
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// Evitar que se cierre completamente al cerrar ventana
app.on('before-quit', (e) => {
    e.preventDefault();
    app.quit();
});