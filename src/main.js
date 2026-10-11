import './style.css';
import { createIcons, icons } from 'lucide';
import confetti from 'canvas-confetti';
import { Game, LEVEL_CONFIGS } from './game.js';
import { soundEngine } from './audio.js';

createIcons({ icons });

const canvas = document.getElementById('game-canvas');
const game = new Game(canvas);
game.run();

const hudTop = document.getElementById('hud-top');
const hudBottom = document.getElementById('hud-bottom');
const scoreDisplay = document.getElementById('score-display');
const timerDisplay = document.getElementById('timer-display');
const levelNameDisplay = document.getElementById('level-name-display');
const comboPill = document.getElementById('combo-pill');
const comboBadge = document.getElementById('combo-badge');
const shellsList = document.getElementById('shells-list');
const minimapViewport = document.getElementById('minimap-viewport');
const audioIcon = document.getElementById('audio-icon');

const modalMainMenu = document.getElementById('modal-main-menu');
const modalLevelSelect = document.getElementById('modal-level-select');
const modalInstructions = document.getElementById('modal-instructions');
const modalHighscores = document.getElementById('modal-highscores');
const modalVictory = document.getElementById('modal-victory');
const modalPause = document.getElementById('modal-pause');

const btnOpenLevelSelect = document.getElementById('btn-open-level-select');
if (btnOpenLevelSelect) {
  const span = btnOpenLevelSelect.querySelector('span');
  if (span) {
    span.innerText = `Levelauswahl (${LEVEL_CONFIGS.length} Levels)`;
  }
}

function updateUI() {
  if (game.state === 'PLAYING' || game.state === 'PAUSED') {
    hudTop.style.display = 'flex';
    hudBottom.style.display = 'flex';

    scoreDisplay.innerText = String(Math.max(0, game.score)).padStart(5, '0');

    timerDisplay.innerText = String(game.timeLeft);
    if (game.timeLeft <= 10) {
      timerDisplay.classList.add('warning');
    } else {
      timerDisplay.classList.remove('warning');
    }

    levelNameDisplay.innerText = LEVEL_CONFIGS[game.currentLevelIndex].name;

    if (game.combo > 1) {
      comboPill.style.display = 'flex';
      const mult = Math.min(4, Math.floor((game.combo - 1) / 2) + 1);
      comboBadge.innerText = `x${mult} COMBO (${game.combo})`;
    } else {
      comboPill.style.display = 'none';
    }

    shellsList.innerHTML = '';
    for (let i = 0; i < game.maxAmmo; i++) {
      const shell = document.createElement('div');
      shell.className = 'shell-icon' + (i >= game.ammo ? ' empty' : '');
      shellsList.appendChild(shell);
    }

    const viewWidthPct = (game.screenWidth / game.virtualWidth) * 100;
    const viewLeftPct = (game.cameraX / game.virtualWidth) * 100;
    minimapViewport.style.width = `${viewWidthPct}%`;
    minimapViewport.style.left = `${viewLeftPct}%`;

  } else {
    hudTop.style.display = 'none';
    hudBottom.style.display = 'none';
  }

  if (game.state === 'LEVEL_COMPLETE' && !modalVictory.classList.contains('active')) {
    openVictoryModal();
  }

  if (game.state === 'PAUSED') {
    modalPause.classList.add('active');
  } else {
    modalPause.classList.remove('active');
  }

  requestAnimationFrame(updateUI);
}
requestAnimationFrame(updateUI);

function hideAllModals() {
  document.querySelectorAll('.screen-modal').forEach(m => m.classList.remove('active'));
}

document.getElementById('btn-start-campaign').addEventListener('click', () => {
  hideAllModals();
  game.startLevel(0, 'campaign', 'normal');
});

document.getElementById('btn-open-level-select').addEventListener('click', () => {
  buildLevelGrid();
  hideAllModals();
  modalLevelSelect.classList.add('active');
});

document.getElementById('btn-unlock-all-levels').addEventListener('click', () => {
  game.progress.unlockedLevel = LEVEL_CONFIGS.length;
  game._saveProgress();
  buildLevelGrid();
});

document.getElementById('btn-close-level-select').addEventListener('click', () => {
  hideAllModals();
  modalMainMenu.classList.add('active');
});

document.getElementById('btn-open-instructions').addEventListener('click', () => {
  hideAllModals();
  modalInstructions.classList.add('active');
});

document.getElementById('btn-close-instructions').addEventListener('click', () => {
  hideAllModals();
  modalMainMenu.classList.add('active');
});

document.getElementById('btn-open-highscores').addEventListener('click', () => {
  buildHighscoresTable();
  hideAllModals();
  modalHighscores.classList.add('active');
});

document.getElementById('btn-close-highscores').addEventListener('click', () => {
  hideAllModals();
  modalMainMenu.classList.add('active');
});

document.getElementById('btn-reload').addEventListener('click', () => {
  game.reload();
});

document.getElementById('btn-audio').addEventListener('click', () => {
  const isMuted = soundEngine.toggleMute();
  audioIcon.setAttribute('data-lucide', isMuted ? 'volume-x' : 'volume-2');
  createIcons({ icons });
});

document.getElementById('btn-menu').addEventListener('click', () => {
  game.pauseGame();
});

document.getElementById('btn-resume').addEventListener('click', () => {
  game.resumeGame();
});

document.getElementById('btn-pause-restart').addEventListener('click', () => {
  hideAllModals();
  game.startLevel(game.currentLevelIndex, game.gameMode, game.difficulty);
});

document.getElementById('btn-pause-menu').addEventListener('click', () => {
  hideAllModals();
  modalMainMenu.classList.add('active');
  game.state = 'MENU';
});

document.getElementById('btn-next-level').addEventListener('click', () => {
  hideAllModals();
  if (game.currentLevelIndex + 1 < LEVEL_CONFIGS.length) {
    game.startLevel(game.currentLevelIndex + 1, game.gameMode, game.difficulty);
  } else {
    modalMainMenu.classList.add('active');
    game.state = 'MENU';
  }
});

document.getElementById('btn-restart-level').addEventListener('click', () => {
  hideAllModals();
  game.startLevel(game.currentLevelIndex, game.gameMode, game.difficulty);
});

document.getElementById('btn-victory-menu').addEventListener('click', () => {
  hideAllModals();
  modalMainMenu.classList.add('active');
  game.state = 'MENU';
});

function buildLevelGrid() {
  const container = document.getElementById('level-grid-container');
  container.innerHTML = '';

  LEVEL_CONFIGS.forEach((lvl, idx) => {
    const isUnlocked = idx + 1 <= game.progress.unlockedLevel;
    const highscore = game.progress.highScores[lvl.id] || 0;

    const card = document.createElement('div');
    card.className = `level-card ${isUnlocked ? '' : 'locked'}`;

    const easterEggsText = lvl.easterEggs && lvl.easterEggs.length > 0
      ? `<span style="color: #38bdf8; display: block; margin-top: 6px; font-size: 0.8rem; font-weight: 600; background: rgba(56, 189, 248, 0.12); padding: 5px 8px; border-radius: 6px; border: 1px solid rgba(56, 189, 248, 0.25);">🥚 <strong>Interaktive Easter Eggs:</strong> ${lvl.easterEggs.join(', ')}</span>`
      : '';

    card.innerHTML = `
      <div class="level-num">LEVEL ${lvl.id}</div>
      <h3 style="color: #fff; margin: 6px 0;">${lvl.name}</h3>
      <p style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 6px; line-height: 1.4;">
        ${lvl.desc}
        ${easterEggsText}
      </p>
      <div style="margin-top: 8px; font-size: 0.9rem; color: var(--primary-gold);">
        ${isUnlocked ? `🏆 Highscore: ${highscore}` : '🔒 Gesperrt'}
      </div>
    `;

    if (isUnlocked) {
      card.addEventListener('click', () => {
        hideAllModals();
        game.startLevel(idx, 'free', 'normal');
      });
    }

    container.appendChild(card);
  });
}

function buildHighscoresTable() {
  const table = document.getElementById('highscores-table');
  table.innerHTML = '';

  LEVEL_CONFIGS.forEach(lvl => {
    const score = game.progress.highScores[lvl.id] || 0;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${lvl.name}</td>
      <td>${score} Punkte</td>
    `;
    table.appendChild(tr);
  });

  const trTotal = document.createElement('tr');
  trTotal.innerHTML = `
    <td><strong>Abschüsse Gesamt</strong></td>
    <td><strong>${game.progress.totalKills || 0} Hühner</strong></td>
  `;
  table.appendChild(trTotal);
}

function openVictoryModal() {
  const levelCfg = LEVEL_CONFIGS[game.currentLevelIndex];
  const isSuccess = game.score >= levelCfg.targetScore;

  document.getElementById('victory-title').innerText = isSuccess ? 'LEVEL ERFOLGREICH!' : 'ZEIT ABGELAUFEN';
  document.getElementById('victory-subtitle').innerText = isSuccess 
    ? `Ziel von ${levelCfg.targetScore} Punkten erreicht!` 
    : `Ziel von ${levelCfg.targetScore} Punkten verfehlt. Try again!`;

  document.getElementById('stat-score').innerText = game.score;

  const accuracy = game.shotsFired > 0 ? Math.round((game.hits / game.shotsFired) * 100) : 0;
  document.getElementById('stat-accuracy').innerText = `${accuracy}% (${game.hits}/${game.shotsFired})`;
  document.getElementById('stat-combo').innerText = `x${game.maxCombo}`;
  document.getElementById('stat-eastereggs').innerText = game.easterEggsDiscovered;

  const nextBtn = document.getElementById('btn-next-level');
  if (game.currentLevelIndex + 1 < LEVEL_CONFIGS.length && isSuccess) {
    nextBtn.style.display = 'flex';
  } else {
    nextBtn.style.display = 'none';
  }

  if (isSuccess) {
    launchVictoryFireworks();
  }

  modalVictory.classList.add('active');
}

function launchVictoryFireworks() {
  const duration = 3.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 35, spread: 360, ticks: 70, zIndex: 9999 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  // Initial center burst
  confetti({
    particleCount: 120,
    spread: 100,
    origin: { y: 0.6 }
  });

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 45 * (timeLeft / duration);
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.15, 0.35), y: randomInRange(0.2, 0.5) } });
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.65, 0.85), y: randomInRange(0.2, 0.5) } });
  }, 250);
}
