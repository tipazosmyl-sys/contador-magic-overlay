// Archivo de seguridad para Electron
window.addEventListener('DOMContentLoaded', () => {
    console.log('🎯 Magic Overlay Counter cargado');
});

// Exponer funciones seguras al renderer si es necesario
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    // Aquí puedes agregar funciones seguras
    getVersion: () => process.versions.electron,
    // Ejemplo: guardar datos
    saveData: (data) => ipcRenderer.send('save-data', data)
});