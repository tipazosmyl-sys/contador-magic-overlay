// ===== CONFIGURACIÓN =====
const MAX_LIFE = 999;
const MIN_LIFE = -999;

// ===== ESTADO =====
let life1 = 20;
let life2 = 20;

// ===== DOM REFS =====
const lifeEl1 = document.getElementById('life1');
const lifeEl2 = document.getElementById('life2');
const damageInput1 = document.getElementById('damageInput1');
const damageInput2 = document.getElementById('damageInput2');
const resetBtn = document.getElementById('resetBtn');
const reset20Btn = document.getElementById('reset20Btn');
const closeBtn = document.getElementById('closeBtn');
const minBtn = document.getElementById('minBtn');

// ===== FUNCIONES =====

function updateDisplay() {
    lifeEl1.textContent = life1;
    lifeEl2.textContent = life2;

    lifeEl1.className = 'life-value' + (life1 < 0 ? ' negative' : '') + (life1 <= 5 && life1 > 0 ? ' low-life' : '');
    lifeEl2.className = 'life-value' + (life2 < 0 ? ' negative' : '') + (life2 <= 5 && life2 > 0 ? ' low-life' : '');

    // Guardar en localStorage
    try {
        localStorage.setItem('magicOverlay_life1', life1);
        localStorage.setItem('magicOverlay_life2', life2);
    } catch(e) {}
}

function changeLife(player, amount) {
    if (player === 1) {
        let newLife = life1 + amount;
        life1 = Math.min(Math.max(newLife, MIN_LIFE), MAX_LIFE);
        updateDisplay();
        const container = document.querySelector('.player1 .life-container');
        container.classList.remove('damage-flash', 'heal-flash');
        void container.offsetWidth;
        container.classList.add(amount < 0 ? 'damage-flash' : 'heal-flash');
    } else if (player === 2) {
        let newLife = life2 + amount;
        life2 = Math.min(Math.max(newLife, MIN_LIFE), MAX_LIFE);
        updateDisplay();
        const container = document.querySelector('.player2 .life-container');
        container.classList.remove('damage-flash', 'heal-flash');
        void container.offsetWidth;
        container.classList.add(amount < 0 ? 'damage-flash' : 'heal-flash');
    }
}

function resetLife(value = 20) {
    life1 = value;
    life2 = value;
    updateDisplay();
    document.querySelectorAll('.life-container').forEach(el => {
        el.classList.remove('damage-flash', 'heal-flash');
        void el.offsetWidth;
        el.classList.add('heal-flash');
    });
}

// ===== EVENT LISTENERS =====

// Botones de daño/cura
document.querySelectorAll('.btn-damage, .btn-heal').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const player = parseInt(btn.dataset.player);
        const action = btn.dataset.action;
        const input = player === 1 ? damageInput1 : damageInput2;
        let amount = parseInt(input.value) || 1;
        amount = Math.min(Math.max(amount, 1), 999);

        if (action === 'damage') {
            changeLife(player, -amount);
        } else if (action === 'heal') {
            changeLife(player, amount);
        }

        if (navigator.vibrate) navigator.vibrate(15);
    });
});

// Teclas rápidas
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === '1') {
        e.preventDefault();
        const amount = parseInt(damageInput1.value) || 1;
        changeLife(1, -amount);
    }
    if (e.ctrlKey && e.key === '2') {
        e.preventDefault();
        const amount = parseInt(damageInput2.value) || 1;
        changeLife(2, -amount);
    }
    if (e.shiftKey && e.key === '1') {
        e.preventDefault();
        const amount = parseInt(damageInput1.value) || 1;
        changeLife(1, amount);
    }
    if (e.shiftKey && e.key === '2') {
        e.preventDefault();
        const amount = parseInt(damageInput2.value) || 1;
        changeLife(2, amount);
    }
    if (e.key === 'r' && !e.ctrlKey && !e.shiftKey) {
        e.preventDefault();
        resetLife(20);
    }
});

// Reset
resetBtn.addEventListener('click', () => {
    const value = prompt('Ingresa la vida inicial para ambos jugadores:', '20');
    if (value !== null) {
        const num = parseInt(value);
        if (!isNaN(num) && num >= -999 && num <= 999) {
            resetLife(num);
        } else {
            alert('Ingresa un número válido entre -999 y 999');
        }
    }
});

reset20Btn.addEventListener('click', () => {
    resetLife(20);
});

// Cerrar y minimizar (integración con Electron)
closeBtn.addEventListener('click', () => {
    if (window.electronAPI) {
        // Si está en Electron
        const { ipcRenderer } = require('electron');
        ipcRenderer.send('close-app');
    } else {
        // Si está en navegador
        window.close();
    }
});

minBtn.addEventListener('click', () => {
    if (window.electronAPI) {
        const { ipcRenderer } = require('electron');
        ipcRenderer.send('minimize-app');
    }
});

// ===== CARGA INICIAL =====

// Cargar desde localStorage
try {
    const savedLife1 = localStorage.getItem('magicOverlay_life1');
    const savedLife2 = localStorage.getItem('magicOverlay_life2');
    if (savedLife1 !== null) life1 = parseInt(savedLife1) || 20;
    if (savedLife2 !== null) life2 = parseInt(savedLife2) || 20;
} catch(e) {}

updateDisplay();

console.log('🎯 Magic Overlay Counter cargado!');
console.log('📖 Atajos:');
console.log('  Ctrl+1 = Daño J1  |  Ctrl+2 = Daño J2');
console.log('  Shift+1 = Cura J1  |  Shift+2 = Cura J2');
console.log('  R = Reset a 20');
console.log('  Arrastra la ventana desde cualquier lugar');