// Core Game Loop & State Manager for Moorhuhn
import { soundEngine } from './audio.js';
import { GraphicsRenderer } from './graphics.js';
import { ParticleSystem } from './particles.js';
import { Chicken } from './chicken.js';
import { EasterEggManager } from './eastereggs.js';

export const LEVEL_CONFIGS = [
  { 
    id: 1, 
    name: 'Sommer auf dem Bauernhof', 
    theme: 'summer', 
    targetScore: 250, 
    timeLimit: 100, 
    desc: 'Klassische Bauernhof-Wiese mit Windmühle',
    easterEggs: ['Windmühlen-Sturm (+200)', 'Vogelscheuche (+100)', 'Plumpsklo-Huhn (+75)']
  },
  { 
    id: 2, 
    name: 'Winter-Wunderland', 
    theme: 'winter', 
    targetScore: 400, 
    timeLimit: 100, 
    desc: 'Verschneite Berge & Schneemann-Überraschungen',
    easterEggs: ['Schneemann-Bombe (+150)', 'Weihnachts-Huhn (+200)']
  },
  { 
    id: 3, 
    name: 'Tropischer Strand', 
    theme: 'beach', 
    targetScore: 600, 
    timeLimit: 100, 
    desc: 'Sandstrand, Palmen & Meeresrauschen',
    easterEggs: ['Kokosnuss-Bonus (+120)', 'Flaschenpost (+100)']
  },
  { 
    id: 4, 
    name: 'Sonnige Waldlichtung', 
    theme: 'forest', 
    targetScore: 750, 
    timeLimit: 100, 
    desc: 'Blühende Blumenwiese im Mittags-Sonnenschein & Schmetterlinge',
    easterEggs: ['Baumhöhlen-Eule (+125)', 'Zauberpilz (+80)']
  },
  { 
    id: 5, 
    name: 'Spukschloss bei Nacht', 
    theme: 'spooky', 
    targetScore: 900, 
    timeLimit: 100, 
    desc: 'Gotisches Schloss, Vollmond & Geisterhühner',
    easterEggs: ['Geister-Beschwörung (+250)', 'Wetterhahn (+100)']
  },
  { 
    id: 6, 
    name: 'Wasser-Aquarium Welt', 
    theme: 'aquarium', 
    targetScore: 1100, 
    timeLimit: 100, 
    desc: 'Unterwasser-Aquarium mit Korallen, Taucherhühnern & Schatzkisten',
    easterEggs: ['Piraten-Schatz (+200)', 'Korallen-Huhn (+150)']
  },
  { 
    id: 7, 
    name: 'Großstadt Metropolis', 
    theme: 'city', 
    targetScore: 1300, 
    timeLimit: 100, 
    desc: 'Sonnige Skylines, Wolkenkratzer & Tauben-Schwärme am Mittag',
    easterEggs: ['Metropolis-Neon (+250)', 'Brücken-Licht (+150)']
  },
  { 
    id: 8, 
    name: 'Auf einer alten Farm', 
    theme: 'farm', 
    targetScore: 1500, 
    timeLimit: 100, 
    desc: 'Alte Scheune, Heuballen, Traktor & rustikales Bauernhof-Flair',
    easterEggs: ['Traktor-Motor (+225)', 'Heuhaufen-Huhn (+150)', 'Goldener Wetterhahn (+175)']
  },
  { 
    id: 9, 
    name: 'Königliche Ritterburg', 
    theme: 'castle', 
    targetScore: 1750, 
    timeLimit: 100, 
    desc: 'Mittelalterliche Ritterburg, Burgzinnen & romantisches Abendlicht',
    easterEggs: ['Burgtor-Glocke (+250)', 'Ritterrüstung-Bonus (+180)', 'Drachen-Wappen (+200)']
  },
  { 
    id: 10, 
    name: 'Geheimnisvolles Ägypten', 
    theme: 'egypt', 
    targetScore: 2000, 
    timeLimit: 100, 
    desc: 'Monumentale Pyramiden, Wüstensand, Pharaonen-Schätze & die Sphinx',
    easterEggs: ['Sphinx-Rätsel (+300)', 'Pyramiden-Spitze (+200)', 'Obelisken-Schatz (+250)']
  },
  { 
    id: 11, 
    name: 'Das Antike Rom', 
    theme: 'rome', 
    targetScore: 2250, 
    timeLimit: 100, 
    desc: 'Kolosseum, römische Säulen, Streitwagen & kaiserliche Triumphbögen',
    easterEggs: ['Kolosseum-Triumph (+350)', 'Caesar-Kranz (+220)', 'SPQR-Adler (+280)']
  },
  { 
    id: 12, 
    name: 'Das Gallische Dorf', 
    theme: 'gaul', 
    targetScore: 2500, 
    timeLimit: 100, 
    desc: 'Gallische Strohhütten, Zaubertrank-Kessel, Wildschweine & goldene Abendsonne',
    easterEggs: ['Zaubertrank-Kessel (+400)', 'Wildschwein-Spieß (+300)', 'Hütten-Menhir (+350)']
  },
  { 
    id: 13, 
    name: 'Anwesen der Goldenen Kaiserin', 
    theme: 'palace', 
    targetScore: 2800, 
    timeLimit: 100, 
    desc: 'Vor dem goldenen Palast, kaiserliche Gärten, goldene Statuen & königlicher Prunk',
    easterEggs: ['Kaiserin-Krone (+450)', 'Palast-Fountain (+350)', 'Goldene Phönix-Statue (+400)']
  }
];

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.graphics = new GraphicsRenderer();
    this.particles = new ParticleSystem();
    this.easterEggs = new EasterEggManager();

    this.virtualWidth = 2400;
    this.screenHeight = 800;
    this.screenWidth = window.innerWidth;

    this.state = 'MENU';
    this.currentLevelIndex = 0;
    this.gameMode = 'campaign';
    this.difficulty = 'normal';

    this.score = 0;
    this.timeLeft = 100;
    this.shotsFired = 0;
    this.hits = 0;
    this.combo = 0;
    this.maxCombo = 0;
    this.lastHitTime = 0;
    this.easterEggsDiscovered = 0;

    this.ammo = 8;
    this.maxAmmo = 8;
    this.isReloading = false;

    this.cameraX = 600;
    this.targetCameraX = 600;
    this.mouseX = 0;
    this.mouseY = 0;

    this.chickens = [];
    this.maxChickens = 14;

    this.lastFrameTime = 0;
    this.animTime = 0;
    this.recoilY = 0;
    this.lastPopupTime = 0;

    this.progress = this._loadProgress();

    this._bindEvents();
    this._resizeCanvas();
  }

  _loadProgress() {
    try {
      const saved = localStorage.getItem('moorhuhn_progress');
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return { unlockedLevel: 1, highScores: {}, totalKills: 0 };
  }

  _saveProgress() {
    try {
      localStorage.setItem('moorhuhn_progress', JSON.stringify(this.progress));
    } catch(e) {}
  }

  _resizeCanvas() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.canvas.width = this.screenWidth;
    this.canvas.height = this.screenHeight;
  }

  _bindEvents() {
    window.addEventListener('resize', () => this._resizeCanvas());

    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      const edgeThreshold = 0.15 * this.screenWidth;
      if (this.mouseX < edgeThreshold) {
        const factor = 1 - (this.mouseX / edgeThreshold);
        this.targetCameraX -= factor * 22;
      } else if (this.mouseX > this.screenWidth - edgeThreshold) {
        const factor = (this.mouseX - (this.screenWidth - edgeThreshold)) / edgeThreshold;
        this.targetCameraX += factor * 22;
      }

      this.targetCameraX = Math.max(0, Math.min(this.virtualWidth - this.screenWidth, this.targetCameraX));
    });

    window.addEventListener('mousedown', (e) => {
      if (this.state !== 'PLAYING') return;
      if (e.button === 0) {
        this.shoot();
      } else if (e.button === 2) {
        this.reload();
      }
    });

    window.addEventListener('contextmenu', (e) => e.preventDefault());

    window.addEventListener('keydown', (e) => {
      if (e.code === 'KeyR' || e.code === 'Space') {
        if (this.state === 'PLAYING') this.reload();
      } else if (e.code === 'Escape') {
        if (this.state === 'PLAYING') this.pauseGame();
        else if (this.state === 'PAUSED') this.resumeGame();
      } else if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        this.targetCameraX = Math.max(0, this.targetCameraX - 150);
      } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        this.targetCameraX = Math.min(this.virtualWidth - this.screenWidth, this.targetCameraX + 150);
      }
    });
  }

  startLevel(levelIndex = 0, mode = 'campaign', difficulty = 'normal') {
    soundEngine.init();
    this.currentLevelIndex = levelIndex;
    this.gameMode = mode;
    this.difficulty = difficulty;

    const levelCfg = LEVEL_CONFIGS[this.currentLevelIndex];
    this.timeLeft = levelCfg.timeLimit;
    if (difficulty === 'easy') this.timeLeft = 130;
    if (difficulty === 'crazy') this.timeLeft = 75;

    this.score = 0;
    this.shotsFired = 0;
    this.hits = 0;
    this.combo = 0;
    this.maxCombo = 0;
    this.easterEggsDiscovered = 0;
    this.ammo = this.maxAmmo;
    this.isReloading = false;
    this.lastPopupTime = Date.now();

    this.chickens = [];
    this.particles.reset();
    this.graphics.clearDecals();
    this.easterEggs.initLevel(levelCfg.theme, this.virtualWidth, this.screenHeight);
    this.particles.initWeather(levelCfg.theme, this.virtualWidth, this.screenHeight);

    for (let i = 0; i < 10; i++) {
      this._spawnRandomChicken();
    }

    this.chickens.push(new Chicken({
      x: 300,
      y: 120,
      type: 'balloon',
      depth: 1,
      direction: 1
    }));

    soundEngine.startThemeAmbient(levelCfg.theme);
    this.state = 'PLAYING';

    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      if (this.state === 'PLAYING') {
        this.timeLeft -= 1;
        if (this.timeLeft <= 0) {
          this.endGame();
        }
      }
    }, 1000);
  }

  pauseGame() {
    if (this.state === 'PLAYING') this.state = 'PAUSED';
  }

  resumeGame() {
    if (this.state === 'PAUSED') this.state = 'PLAYING';
  }

  shoot() {
    if (this.isReloading) return;

    if (this.ammo <= 0) {
      soundEngine.playEmptyClick();
      return;
    }

    this.ammo -= 1;
    this.shotsFired += 1;
    this.recoilY = 12;

    soundEngine.playShot();

    const shotWorldX = this.mouseX + this.cameraX;
    const shotWorldY = this.mouseY;

    this.particles.spawnMuzzleSpark(shotWorldX, shotWorldY);
    this.particles.spawnSmoke(shotWorldX, shotWorldY);
    this.graphics.addDecal(shotWorldX, shotWorldY);

    let hitSomething = false;
    const sortedChickens = [...this.chickens].sort((a, b) => b.depth - a.depth);

    for (let ch of sortedChickens) {
      const res = ch.checkHit(shotWorldX, shotWorldY);
      if (res && res.hit) {
        hitSomething = true;
        this.hits += 1;

        const now = Date.now();
        if (now - this.lastHitTime < 1500) {
          this.combo += 1;
        } else {
          this.combo = 1;
        }
        this.lastHitTime = now;
        if (this.combo > this.maxCombo) this.maxCombo = this.combo;

        const comboMult = Math.min(4, Math.floor((this.combo - 1) / 2) + 1);
        const finalPts = res.points * comboMult;
        this.score += finalPts;

        soundEngine.playSquawk(res.squawk);

        let featherColor = '#8B4513';
        if (res.type === 'golden') featherColor = 'gold';
        if (res.type === 'ghost') featherColor = 'ghost';
        if (res.type === 'dove') featherColor = '#FFFFFF';

        this.particles.spawnFeathers(shotWorldX, shotWorldY, featherColor, res.type === 'popup' ? 25 : 14);

        let label = res.points > 0 ? `+${finalPts}` : `${finalPts}`;
        if (comboMult > 1 && res.points > 0) label += ` (x${comboMult})`;
        this.particles.addScorePopup(shotWorldX, shotWorldY, label, finalPts < 0 ? '#ef4444' : '#FFD700', res.type === 'popup' ? 36 : 28);

        if (res.type === 'dove' || res.type === 'owl') {
          soundEngine.playPenalty();
        }

        break;
      }
    }

    if (!hitSomething) {
      const eggRes = this.easterEggs.checkShot(shotWorldX, shotWorldY);
      if (eggRes) {
        soundEngine.playEasterEgg();
        if (eggRes.triggered) {
          this.score += eggRes.reward;
          this.easterEggsDiscovered += 1;
          this.particles.addScorePopup(eggRes.x, eggRes.y, eggRes.popupText, '#38bdf8', 32);
          this.particles.spawnFeathers(eggRes.x, eggRes.y, 'gold', 25);
        } else {
          this.particles.addScorePopup(eggRes.x, eggRes.y, 'TREFFER!', '#facc15', 22);
        }
      }
    }
  }

  reload() {
    if (this.isReloading || this.ammo === this.maxAmmo) return;
    this.isReloading = true;
    soundEngine.playReload();

    setTimeout(() => {
      this.ammo = this.maxAmmo;
      this.isReloading = false;
    }, 600);
  }

  _spawnRandomChicken() {
    const theme = LEVEL_CONFIGS[this.currentLevelIndex].theme;
    const depth = Math.floor(Math.random() * 3) + 1;
    let type = 'medium';

    if (depth === 1) type = 'far';
    if (depth === 3) type = 'close';

    const rand = Math.random();
    if (rand < 0.08) type = 'turbo';
    else if (rand < 0.14) type = 'golden';
    else if (rand < 0.22) type = 'helmet';
    else if (rand < 0.28 && theme === 'spooky') type = 'ghost';
    else if (rand < 0.35 || (theme === 'city' && rand < 0.5)) type = Math.random() > 0.5 ? 'dove' : 'owl';

    const yPos = 80 + Math.random() * (this.screenHeight * 0.55);
    const startX = Math.random() > 0.5 ? -40 : this.virtualWidth + 40;

    let outfit = (type === 'helmet' ? 'helmet' : 'none');
    if (theme === 'aquarium' && Math.random() < 0.4) outfit = 'scuba';
    else if (Math.random() < 0.15) outfit = 'eggshell';

    const chicken = new Chicken({
      x: startX,
      y: yPos,
      type: type,
      depth: depth,
      outfit: outfit,
      direction: startX < 0 ? 1 : -1
    });

    this.chickens.push(chicken);
  }

  _spawnPopupChicken() {
    const popX = 200 + Math.random() * (this.virtualWidth - 400);
    const targetY = this.screenHeight - 160;
    const startY = this.screenHeight + 120;

    const popupChicken = new Chicken({
      x: popX,
      y: startY,
      targetY: targetY,
      startY: startY,
      type: 'popup',
      depth: 4
    });

    this.chickens.push(popupChicken);
  }

  endGame() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    soundEngine.stopThemeAmbient();
    soundEngine.playFanfare();

    const levelCfg = LEVEL_CONFIGS[this.currentLevelIndex];
    const isSuccess = this.score >= levelCfg.targetScore;

    if (isSuccess && this.gameMode === 'campaign') {
      if (this.currentLevelIndex + 1 >= this.progress.unlockedLevel) {
        this.progress.unlockedLevel = Math.min(LEVEL_CONFIGS.length, this.currentLevelIndex + 2);
      }
    }

    const prevHigh = this.progress.highScores[levelCfg.id] || 0;
    if (this.score > prevHigh) {
      this.progress.highScores[levelCfg.id] = this.score;
    }
    this.progress.totalKills += this.hits;
    this._saveProgress();

    this.state = 'LEVEL_COMPLETE';
  }

  update(timestamp) {
    const dt = (timestamp - this.lastFrameTime) / 1000;
    this.lastFrameTime = timestamp;
    this.animTime += dt;

    this.cameraX += (this.targetCameraX - this.cameraX) * 0.12;

    if (this.recoilY > 0) this.recoilY *= 0.8;

    if (this.state === 'PLAYING') {
      if (this.chickens.length < this.maxChickens && Math.random() < 0.05) {
        this._spawnRandomChicken();
      }

      const now = Date.now();
      if (now - this.lastPopupTime > 9000 + Math.random() * 5000) {
        const activePopup = this.chickens.find(c => c.type === 'popup' && c.state !== 'fled');
        if (!activePopup) {
          this._spawnPopupChicken();
          this.lastPopupTime = now;
        }
      }

      for (let i = this.chickens.length - 1; i >= 0; i--) {
        const ch = this.chickens[i];
        ch.update(this.virtualWidth, this.screenHeight);
        if (ch.state === 'fled') {
          this.chickens.splice(i, 1);
        }
      }

      this.particles.update(this.virtualWidth, this.screenHeight);
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.screenWidth, this.screenHeight);

    const levelCfg = LEVEL_CONFIGS[this.currentLevelIndex];

    this.ctx.save();
    this.ctx.translate(-this.cameraX, this.recoilY);

    this.graphics.renderBackground(this.ctx, levelCfg.theme, this.virtualWidth, this.screenHeight, this.animTime);

    this.easterEggs.renderHints(this.ctx, this.animTime);

    const sortedChickens = [...this.chickens].sort((a, b) => a.depth - b.depth);
    for (let ch of sortedChickens) {
      this.graphics.renderChicken(this.ctx, ch, this.animTime);
    }

    this.particles.render(this.ctx, 0);

    this.ctx.restore();

    if (this.state === 'PLAYING') {
      this.graphics.renderCrosshair(this.ctx, this.mouseX, this.mouseY, this.recoilY > 2, this.ammo);
    }
  }

  loop(timestamp) {
    this.update(timestamp);
    this.render();
    requestAnimationFrame((t) => this.loop(t));
  }

  run() {
    requestAnimationFrame((t) => this.loop(t));
  }
}
