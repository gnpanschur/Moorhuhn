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
const levelNumberDisplay = document.getElementById('level-number-display');
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

let levelSuccessToastShown = false;
let lastToastLevel = -1;

function showLevelSuccessToast(title, subtitle) {
  const toast = document.getElementById('level-success-toast');
  const tTitle = document.getElementById('toast-title');
  const tSubtitle = document.getElementById('toast-subtitle');
  if (toast && tTitle && tSubtitle) {
    tTitle.innerText = `🏆 ${title} 🏆`;
    tSubtitle.innerText = subtitle;
    toast.classList.add('active');
    setTimeout(() => {
      toast.classList.remove('active');
    }, 3500);
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

    const currentLvl = LEVEL_CONFIGS[game.currentLevelIndex];
    if (currentLvl) {
      if (lastToastLevel !== game.currentLevelIndex) {
        lastToastLevel = game.currentLevelIndex;
        levelSuccessToastShown = false;
      }

      const isTargetReached = game.score >= currentLvl.targetScore;
      if (levelNumberDisplay) {
        if (isTargetReached) {
          levelNumberDisplay.innerText = `Level ${currentLvl.id} ✓ Erfolgreich`;
          levelNumberDisplay.classList.add('success');
        } else {
          levelNumberDisplay.innerText = `Level ${currentLvl.id}`;
          levelNumberDisplay.classList.remove('success');
        }
      }
      levelNameDisplay.innerText = currentLvl.name;

      if ((game.targetScoreReached || isTargetReached) && !levelSuccessToastShown) {
        levelSuccessToastShown = true;
        showLevelSuccessToast(`LEVEL ${currentLvl.id} ERFOLGREICH!`, `Ziel von ${currentLvl.targetScore} Punkten erreicht!`);
      }
    }

    if (game.combo > 1) {
      comboPill.style.display = 'flex';
      const mult = Math.min(4, Math.floor((game.combo - 1) / 2) + 1);
      comboBadge.innerText = `x${mult} COMBO (${game.combo})`;
    } else {
      comboPill.style.display = 'none';
    }

    const easterEggHudDisplay = document.getElementById('easteregg-hud-display');
    if (easterEggHudDisplay && currentLvl) {
      const totalEggs = currentLvl.easterEggs ? currentLvl.easterEggs.length : (game.easterEggs?.eggs?.length || 3);
      easterEggHudDisplay.innerText = `${game.easterEggsDiscovered}/${totalEggs}`;
      easterEggHudDisplay.style.color = game.easterEggsDiscovered >= totalEggs ? '#22c55e' : '#38bdf8';
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
    const pauseSubtitle = document.getElementById('pause-subtitle');
    const currentLvl = LEVEL_CONFIGS[game.currentLevelIndex];
    if (pauseSubtitle && currentLvl) {
      const totalEggs = currentLvl.easterEggs ? currentLvl.easterEggs.length : (game.easterEggs?.eggs?.length || 3);
      pauseSubtitle.innerHTML = `Level ${currentLvl.id}: ${currentLvl.name} (Pausiert)<br><span style="color: #38bdf8; font-size: 0.95rem; margin-top: 6px; display: inline-block;">🥚 Easter Eggs: ${game.easterEggsDiscovered} / ${totalEggs}</span>`;
    }
  } else {
    modalPause.classList.remove('active');
  }

  requestAnimationFrame(updateUI);
}
requestAnimationFrame(updateUI);

function enterFullscreen() {
  if (!document.fullscreenElement && !document.webkitFullscreenElement) {
    const el = document.documentElement;
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    }
    if (screen.orientation && screen.orientation.lock) {
      screen.orientation.lock('landscape').catch(() => {});
    }
  }
}

function hideAllModals() {
  document.querySelectorAll('.screen-modal').forEach(m => m.classList.remove('active'));
}

// Automatically activate fullscreen when clicking or tapping ANY button in MAIN MENU MODAL
document.querySelectorAll('#modal-main-menu button').forEach(btn => {
  btn.addEventListener('click', enterFullscreen);
  btn.addEventListener('touchstart', enterFullscreen, { passive: true });
});

document.getElementById('btn-start-campaign').addEventListener('click', () => {
  enterFullscreen();
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

function handleResetHighscores() {
  const confirmed = window.confirm(
    'Möchtest du wirklich alle Highscores zurücksetzen?\n\nAlle bisher erzielten Rekorde und Abschuss-Statistiken werden auf 0 gesetzt.'
  );
  if (!confirmed) return;

  game.resetHighscores();
  buildHighscoresTable();
  buildLevelGrid();
  showLevelSuccessToast('HIGHSCORES GELÖSCHT', 'Alle Highscores wurden erfolgreich auf 0 gesetzt!');
}

document.getElementById('btn-reset-highscores')?.addEventListener('click', handleResetHighscores);
document.getElementById('btn-reset-highscores-levelselect')?.addEventListener('click', handleResetHighscores);

// Touch Reload Zone
const ammoTouchZone = document.getElementById('ammo-touch-zone');
if (ammoTouchZone) {
  ammoTouchZone.addEventListener('touchstart', (e) => {
    e.preventDefault();
    e.stopPropagation();
    game.reload();
    if (navigator.vibrate) navigator.vibrate([30, 40, 30]);
  }, { passive: false });
}

document.getElementById('btn-reload').addEventListener('click', (e) => {
  e.stopPropagation();
  game.reload();
});

// Fullscreen & Orientation API
const btnFullscreen = document.getElementById('btn-fullscreen');
const fullscreenIcon = document.getElementById('fullscreen-icon');

function toggleFullscreen() {
  if (!document.fullscreenElement && !document.webkitFullscreenElement) {
    enterFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

btnFullscreen?.addEventListener('click', toggleFullscreen);

document.addEventListener('fullscreenchange', () => {
  const isFs = !!document.fullscreenElement;
  if (fullscreenIcon) {
    fullscreenIcon.setAttribute('data-lucide', isFs ? 'minimize' : 'maximize');
    createIcons({ icons });
  }
});

// Mobile Edge Pan Controls (Left & Right Touch Arrows)
const panLeftBtn = document.getElementById('mobile-pan-left');
const panRightBtn = document.getElementById('mobile-pan-right');

if (panLeftBtn) {
  const startPanLeft = (e) => { e.preventDefault(); game.panLeftActive = true; };
  const stopPanLeft = (e) => { e.preventDefault(); game.panLeftActive = false; };
  panLeftBtn.addEventListener('touchstart', startPanLeft, { passive: false });
  panLeftBtn.addEventListener('touchend', stopPanLeft);
  panLeftBtn.addEventListener('touchcancel', stopPanLeft);
  panLeftBtn.addEventListener('mousedown', startPanLeft);
  panLeftBtn.addEventListener('mouseup', stopPanLeft);
  panLeftBtn.addEventListener('mouseleave', stopPanLeft);
}

if (panRightBtn) {
  const startPanRight = (e) => { e.preventDefault(); game.panRightActive = true; };
  const stopPanRight = (e) => { e.preventDefault(); game.panRightActive = false; };
  panRightBtn.addEventListener('touchstart', startPanRight, { passive: false });
  panRightBtn.addEventListener('touchend', stopPanRight);
  panRightBtn.addEventListener('touchcancel', stopPanRight);
  panRightBtn.addEventListener('mousedown', startPanRight);
  panRightBtn.addEventListener('mouseup', stopPanRight);
  panRightBtn.addEventListener('mouseleave', stopPanRight);
}

// Minimap Seeking via Touch or Click
const minimapBar = document.getElementById('minimap-bar');
if (minimapBar) {
  const handleMinimapSeek = (clientX) => {
    const rect = minimapBar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    game.targetCameraX = pct * (game.virtualWidth - game.screenWidth);
  };

  minimapBar.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (e.touches.length > 0) handleMinimapSeek(e.touches[0].clientX);
  }, { passive: false });

  minimapBar.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (e.touches.length > 0) handleMinimapSeek(e.touches[0].clientX);
  }, { passive: false });

  minimapBar.addEventListener('mousedown', (e) => {
    handleMinimapSeek(e.clientX);
  });
}

// Orientation Overlay for Portrait mode on Mobile
const orientationOverlay = document.getElementById('orientation-overlay');
const btnForceLandscape = document.getElementById('btn-force-landscape');

function checkOrientation() {
  const isPortrait = window.innerHeight > window.innerWidth;
  const isMobile = ('ontouchstart' in window) || navigator.maxTouchPoints > 0 || window.innerWidth < 850;
  if (isPortrait && isMobile) {
    if (orientationOverlay) orientationOverlay.style.display = 'flex';
  } else {
    if (orientationOverlay) orientationOverlay.style.display = 'none';
  }
}

window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);
checkOrientation();

btnForceLandscape?.addEventListener('click', () => {
  toggleFullscreen();
  checkOrientation();
});

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((err) => {
      console.warn('PWA registration failed:', err);
    });
  });
}

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
    const isCompleted = highscore >= lvl.targetScore;

    const card = document.createElement('div');
    card.className = `level-card ${isUnlocked ? '' : 'locked'} ${isCompleted ? 'completed' : ''}`;

    const easterEggsCount = lvl.easterEggs ? lvl.easterEggs.length : 0;
    const easterEggsText = easterEggsCount > 0
      ? `<span style="color: #38bdf8; display: block; margin-top: 6px; font-size: 0.8rem; font-weight: 600; background: rgba(56, 189, 248, 0.12); padding: 5px 8px; border-radius: 6px; border: 1px solid rgba(56, 189, 248, 0.25);">🥚 <strong>Interaktive Easter Eggs (${easterEggsCount}):</strong> ${lvl.easterEggs.join(', ')}</span>`
      : '';

    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div class="level-num">LEVEL ${lvl.id}</div>
        ${isCompleted ? `<span class="level-success-badge">✓ Erfolgreich</span>` : ''}
      </div>
      <h3 style="color: #fff; margin: 6px 0;">${lvl.name}</h3>
      <p style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 6px; line-height: 1.4;">
        ${lvl.desc}
        ${easterEggsText}
      </p>
      <div style="margin-top: 8px; font-size: 0.9rem; color: ${isCompleted ? '#22c55e' : 'var(--primary-gold)'}; font-weight: ${isCompleted ? '700' : '500'};">
        ${isUnlocked ? (isCompleted ? `✅ Level ${lvl.id} Erfolgreich! 🏆 Highscore: ${highscore} (Ziel: ${lvl.targetScore})` : `🏆 Highscore: ${highscore} / Ziel: ${lvl.targetScore}`) : '🔒 Gesperrt'}
      </div>
    `;

    if (isUnlocked) {
      card.addEventListener('click', () => {
        enterFullscreen();
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
      <td><strong style="color: var(--primary-gold);">Level ${lvl.id}:</strong> ${lvl.name}</td>
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

  document.getElementById('victory-title').innerText = isSuccess 
    ? `LEVEL ${levelCfg.id} ERFOLGREICH!` 
    : `LEVEL ${levelCfg.id}: ZEIT ABGELAUFEN`;
  document.getElementById('victory-subtitle').innerText = isSuccess 
    ? `${levelCfg.name} – Ziel von ${levelCfg.targetScore} Punkten erreicht!` 
    : `${levelCfg.name} – Ziel von ${levelCfg.targetScore} Punkten verfehlt. Try again!`;

  document.getElementById('stat-score').innerText = game.score;

  const accuracy = game.shotsFired > 0 ? Math.round((game.hits / game.shotsFired) * 100) : 0;
  document.getElementById('stat-accuracy').innerText = `${accuracy}% (${game.hits}/${game.shotsFired})`;
  document.getElementById('stat-combo').innerText = `x${game.maxCombo}`;

  const totalEggs = levelCfg.easterEggs ? levelCfg.easterEggs.length : (game.easterEggs?.eggs?.length || 3);
  const easterEggsElement = document.getElementById('stat-eastereggs');
  if (easterEggsElement) {
    if (game.easterEggsDiscovered >= totalEggs) {
      easterEggsElement.innerHTML = `<span style="color: #22c55e; font-weight: bold;">${game.easterEggsDiscovered} / ${totalEggs} ✓ Alle entdeckt!</span>`;
    } else {
      easterEggsElement.innerHTML = `<strong>${game.easterEggsDiscovered}</strong> / ${totalEggs}`;
    }
  }

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
