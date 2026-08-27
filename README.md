# 🎯 Magic Overlay Counter

Contador de daño tipo Magic para dos jugadores, sin bordes y superponible sobre otras aplicaciones.

## ✨ Características

- **Sin bordes**: Ventana transparente sin barra de título
- **Superponible**: Se mantiene encima de otras aplicaciones
- **Redimensionable**: Ajusta el tamaño según necesites
- **Arrastrable**: Mueve la ventana desde cualquier lugar
- **Atajos de teclado**: Control rápido sin usar el mouse
- **Guardado automático**: Recuerda la vida al cerrar
- **Multiplataforma**: Windows, macOS y Linux

## 📖 Atajos de teclado

| Tecla | Acción |
|-------|--------|
| `Ctrl+1` | Daño -1 al Jugador 1 |
| `Ctrl+2` | Daño -1 al Jugador 2 |
| `Shift+1` | Cura +1 al Jugador 1 |
| `Shift+2` | Cura +1 al Jugador 2 |
| `R` | Reset a 20 de vida |

## 🚀 Descarga

Ve a la sección [Releases](https://github.com/tu-usuario/contador-magic-overlay/releases) para descargar la última versión.

### Windows
- `Magic-Overlay-Counter-Setup.exe` - Instalador
- `Magic-Overlay-Counter-portable.exe` - Versión portable (no requiere instalación)

### macOS
- `Magic-Overlay-Counter.dmg` - Instalador

### Linux
- `Magic-Overlay-Counter.AppImage` - Ejecutable portable

## 🛠️ Desarrollo

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/contador-magic-overlay.git

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start

# Construir para Windows
npm run build:win