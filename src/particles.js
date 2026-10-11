// Particle Engine for Moorhuhn Game
export class ParticleSystem {
  constructor() {
    this.particles = [];
    this.scorePopups = [];
    this.weatherParticles = [];
    this.screenFlashAlpha = 0;
  }

  reset() {
    this.particles = [];
    this.scorePopups = [];
    this.weatherParticles = [];
    this.screenFlashAlpha = 0;
  }

  spawnFeathers(x, y, color = '#8B4513', count = 12) {
    const colors = [color, '#D2B48C', '#F5DEB3', '#FFFFFF', '#A0522D'];
    if (color === 'gold') {
      colors.push('#FFD700', '#FFA500', '#FFFFE0');
    } else if (color === 'ghost') {
      colors.push('#00FFCC', '#7FFFD4', '#E0FFFF');
    }

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 6;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: 4 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.2,
        life: 1.0,
        decay: 0.015 + Math.random() * 0.02,
        type: 'feather'
      });
    }
  }

  spawnSmoke(x, y) {
    for (let i = 0; i < 6; i++) {
      this.particles.push({
        x: x + (Math.random() - 0.5) * 15,
        y: y + (Math.random() - 0.5) * 15,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -0.8 - Math.random() * 1.5,
        size: 15 + Math.random() * 20,
        color: 'rgba(220, 220, 220, 0.4)',
        life: 0.6,
        decay: 0.02,
        type: 'smoke'
      });
    }
  }

  spawnMuzzleSpark(x, y) {
    for (let i = 0; i < 8; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 8;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 2 + Math.random() * 3,
        color: Math.random() > 0.5 ? '#FFF' : '#FFCC00',
        life: 0.3,
        decay: 0.08,
        type: 'spark'
      });
    }
  }

  spawnFireworks(x, y) {
    const fireworkColors = ['#f59e0b', '#ef4444', '#3b82f6', '#10b981', '#ec4899', '#8b5cf6', '#fef08a'];
    for (let i = 0; i < 45; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 3 + Math.random() * 9;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        size: 3.5 + Math.random() * 5,
        color: fireworkColors[Math.floor(Math.random() * fireworkColors.length)],
        life: 1.0,
        decay: 0.018 + Math.random() * 0.015,
        type: 'spark'
      });
    }
  }

  addScorePopup(x, y, text, color = '#FFD700', fontSize = 28) {
    this.scorePopups.push({
      x: x,
      y: y,
      vy: -1.8,
      text: text,
      color: color,
      fontSize: fontSize,
      scale: 1.4,
      life: 1.0,
      decay: 0.018
    });
  }

  initWeather(theme, virtualWidth, screenHeight) {
    this.weatherParticles = [];
    if (theme === 'winter') {
      for (let i = 0; i < 120; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vy: 1 + Math.random() * 2.5,
          vx: Math.sin(Math.random() * Math.PI) * 0.8,
          size: 2 + Math.random() * 4,
          opacity: 0.4 + Math.random() * 0.6,
          type: 'snow'
        });
      }
    } else if (theme === 'forest') {
      for (let i = 0; i < 45; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vy: 0.3 + Math.random() * 0.8,
          vx: 0.4 + Math.random() * 1.0,
          rot: Math.random() * Math.PI * 2,
          vRot: 0.04,
          size: 4 + Math.random() * 5,
          color: ['#f43f5e', '#fbbf24', '#e879f9', '#ffffff'][Math.floor(Math.random() * 4)],
          type: 'petal'
        });
      }
      for (let i = 0; i < 25; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight * 0.8,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.6,
          flutter: Math.random() * Math.PI * 2,
          size: 5 + Math.random() * 4,
          color: Math.random() > 0.5 ? '#f59e0b' : '#38bdf8',
          type: 'butterfly'
        });
      }
    } else if (theme === 'spooky') {
      for (let i = 0; i < 40; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight * 0.6,
          vx: -1.5 - Math.random() * 2,
          vy: Math.sin(Math.random() * Math.PI * 2) * 0.8,
          size: 4 + Math.random() * 6,
          type: 'bat'
        });
      }
    } else if (theme === 'aquarium') {
      for (let i = 0; i < 90; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vy: -1.2 - Math.random() * 1.8,
          wobblePhase: Math.random() * Math.PI * 2,
          size: 4 + Math.random() * 7,
          opacity: 0.35 + Math.random() * 0.45,
          type: 'bubble'
        });
      }
    } else if (theme === 'city') {
      for (let i = 0; i < 40; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: (Math.random() - 0.5) * 0.4,
          vy: -0.2 - Math.random() * 0.5,
          size: 3 + Math.random() * 4,
          pulse: Math.random() * Math.PI * 2,
          color: Math.random() > 0.5 ? '#fef08a' : '#bae6fd',
          type: 'citySparkle'
        });
      }
    } else if (theme === 'farm') {
      for (let i = 0; i < 50; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: 0.6 + Math.random() * 0.8,
          vy: 0.2 + Math.random() * 0.5,
          rot: Math.random() * Math.PI * 2,
          vRot: 0.03,
          size: 3 + Math.random() * 4,
          color: Math.random() > 0.4 ? '#fef08a' : '#eab308',
          type: 'hayDust'
        });
      }
    } else if (theme === 'castle') {
      for (let i = 0; i < 45; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -0.4 - Math.random() * 0.8,
          size: 2 + Math.random() * 4,
          pulse: Math.random() * Math.PI * 2,
          color: Math.random() > 0.4 ? '#f97316' : '#fde047',
          type: 'goldenEmbers'
        });
      }
    } else if (theme === 'egypt') {
      for (let i = 0; i < 70; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: 1.5 + Math.random() * 2.2,
          vy: 0.2 + Math.random() * 0.6,
          size: 2 + Math.random() * 4,
          opacity: 0.3 + Math.random() * 0.5,
          color: Math.random() > 0.3 ? '#fef08a' : '#d97706',
          type: 'sandStorm'
        });
      }
    } else if (theme === 'rome') {
      for (let i = 0; i < 45; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: 0.5 + Math.random() * 0.9,
          vy: 0.3 + Math.random() * 0.6,
          rot: Math.random() * Math.PI * 2,
          vRot: 0.04,
          size: 4 + Math.random() * 5,
          color: Math.random() > 0.4 ? '#65a30d' : '#eab308',
          type: 'laurelLeaves'
        });
      }
    } else if (theme === 'gaul') {
      for (let i = 0; i < 50; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: (Math.random() - 0.5) * 0.6,
          vy: -0.5 - Math.random() * 1.0,
          size: 3 + Math.random() * 5,
          pulse: Math.random() * Math.PI * 2,
          color: Math.random() > 0.4 ? '#4ade80' : '#facc15',
          type: 'magicSparks'
        });
      }
    } else if (theme === 'palace') {
      for (let i = 0; i < 55; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: (Math.random() - 0.5) * 0.4,
          vy: -0.3 - Math.random() * 0.7,
          size: 2.5 + Math.random() * 4.5,
          pulse: Math.random() * Math.PI * 2,
          color: Math.random() > 0.3 ? '#facc15' : '#fef08a',
          type: 'empressSparkles'
        });
      }
    } else if (theme === 'moorland') {
      for (let i = 0; i < 40; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: screenHeight * 0.4 + Math.random() * (screenHeight * 0.55),
          vx: 1.2 + Math.random() * 2.2,
          vy: (Math.random() - 0.5) * 0.4,
          sizeX: 60 + Math.random() * 120,
          sizeY: 15 + Math.random() * 30,
          pulse: Math.random() * Math.PI * 2,
          opacity: 0.15 + Math.random() * 0.25,
          type: 'moorlandMist'
        });
      }
    } else if (theme === 'dragon_valley') {
      for (let i = 0; i < 70; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: (Math.random() - 0.5) * 0.8,
          vy: -0.8 - Math.random() * 1.5,
          size: 2 + Math.random() * 4,
          pulse: Math.random() * Math.PI * 2,
          color: Math.random() > 0.4 ? '#ef4444' : '#f97316',
          type: 'dragonEmbers'
        });
      }
    } else if (theme === 'jungle_ruins') {
      for (let i = 0; i < 60; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: 0.4 + Math.random() * 0.8,
          vy: 0.2 + Math.random() * 0.6,
          size: 3 + Math.random() * 5,
          pulse: Math.random() * Math.PI * 2,
          color: Math.random() > 0.4 ? '#fde047' : '#f59e0b',
          type: 'jungleSpores'
        });
      }
    } else if (theme === 'medieval_fortress') {
      for (let i = 0; i < 50; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -0.4 - Math.random() * 0.8,
          size: 2.5 + Math.random() * 4,
          pulse: Math.random() * Math.PI * 2,
          color: Math.random() > 0.4 ? '#f97316' : '#fde047',
          type: 'fortressEmbers'
        });
      }
    } else if (theme === 'military_base') {
      for (let i = 0; i < 45; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: 0.6 + Math.random() * 0.9,
          vy: 0.2 + Math.random() * 0.5,
          size: 2.5 + Math.random() * 4,
          pulse: Math.random() * Math.PI * 2,
          color: Math.random() > 0.4 ? '#fef08a' : '#ffffff',
          type: 'militaryDust'
        });
      }
    } else if (theme === 'atlantis') {
      for (let i = 0; i < 110; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vy: -1.2 - Math.random() * 1.8,
          wobblePhase: Math.random() * Math.PI * 2,
          size: 4 + Math.random() * 8,
          opacity: 0.35 + Math.random() * 0.5,
          type: 'bubble'
        });
      }
    } else if (theme === 'alpine_meadow') {
      for (let i = 0; i < 55; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: 0.5 + Math.random() * 0.9,
          vy: 0.3 + Math.random() * 0.6,
          rot: Math.random() * Math.PI * 2,
          vRot: 0.03,
          size: 3.5 + Math.random() * 4.5,
          color: Math.random() > 0.4 ? '#fef08a' : '#bfdbfe',
          type: 'alpinePetals'
        });
      }
    } else if (theme === 'elven_kingdom') {
      for (let i = 0; i < 65; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: (Math.random() - 0.5) * 0.6,
          vy: -0.4 - Math.random() * 0.9,
          size: 2.5 + Math.random() * 5,
          pulse: Math.random() * Math.PI * 2,
          color: ['#f472b6', '#38bdf8', '#fde047', '#c084fc'][Math.floor(Math.random() * 4)],
          type: 'elvenSparkles'
        });
      }
    } else if (theme === 'wild_west') {
      // Rolling Tumbleweeds
      for (let i = 0; i < 10; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: screenHeight * 0.7 + Math.random() * (screenHeight * 0.22),
          speedX: 2.0 + Math.random() * 3.0,
          rot: Math.random() * Math.PI * 2,
          size: 16 + Math.random() * 12,
          type: 'tumbleweed'
        });
      }
      // Desert Dust
      for (let i = 0; i < 45; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: screenHeight * 0.4 + Math.random() * (screenHeight * 0.55),
          vx: 1.5 + Math.random() * 2.5,
          vy: (Math.random() - 0.5) * 0.3,
          size: 3 + Math.random() * 6,
          opacity: 0.25 + Math.random() * 0.35,
          type: 'desertDust'
        });
      }
    } else if (theme === 'mars_colony') {
      // Cosmic Space Sparkles
      for (let i = 0; i < 50; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * (screenHeight * 0.5),
          vx: (Math.random() - 0.5) * 0.4,
          vy: -0.2 - Math.random() * 0.5,
          size: 2 + Math.random() * 4,
          pulse: Math.random() * Math.PI * 2,
          color: ['#60a5fa', '#38bdf8', '#c084fc', '#ffffff'][Math.floor(Math.random() * 4)],
          type: 'cosmicSparkles'
        });
      }
      // Red Martian Surface Dust
      for (let i = 0; i < 45; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: screenHeight * 0.5 + Math.random() * (screenHeight * 0.45),
          vx: 1.2 + Math.random() * 2.2,
          vy: (Math.random() - 0.5) * 0.3,
          size: 3 + Math.random() * 5,
          opacity: 0.2 + Math.random() * 0.4,
          type: 'marsDust'
        });
      }
    } else if (theme === 'candy_planet') {
      // Floating Sugar Sprinkles
      for (let i = 0; i < 55; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: 0.4 + Math.random() * 0.8,
          vy: 0.3 + Math.random() * 0.7,
          rot: Math.random() * Math.PI * 2,
          vRot: 0.04,
          size: 3 + Math.random() * 4,
          color: ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'][Math.floor(Math.random() * 6)],
          type: 'candySprinkles'
        });
      }
      // Lemonade River Bubbles
      for (let i = 0; i < 40; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: screenHeight * 0.65 + Math.random() * (screenHeight * 0.35),
          vy: -1.0 - Math.random() * 1.5,
          wobblePhase: Math.random() * Math.PI * 2,
          size: 3 + Math.random() * 6,
          opacity: 0.4 + Math.random() * 0.5,
          type: 'lemonadeBubbles'
        });
      }
    } else if (theme === 'night_fair') {
      // Carnival Neon Sparkles
      for (let i = 0; i < 60; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: (Math.random() - 0.5) * 0.4,
          vy: -0.2 - Math.random() * 0.6,
          size: 3 + Math.random() * 5,
          pulse: Math.random() * Math.PI * 2,
          color: ['#f43f5e', '#38bdf8', '#facc15', '#a855f7', '#4ade80'][Math.floor(Math.random() * 5)],
          type: 'fairSparkles'
        });
      }
      // Floating Popcorn Embers
      for (let i = 0; i < 35; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: screenHeight * 0.5 + Math.random() * (screenHeight * 0.4),
          vx: (Math.random() - 0.5) * 0.6,
          vy: -0.8 - Math.random() * 1.2,
          size: 2.5 + Math.random() * 3.5,
          opacity: 0.5 + Math.random() * 0.5,
          type: 'popcornPops'
        });
      }
    } else if (theme === 'riverbank') {
      // Floating Summer Dandelion Petals
      for (let i = 0; i < 50; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: 0.6 + Math.random() * 1.0,
          vy: 0.2 + Math.random() * 0.5,
          rot: Math.random() * Math.PI * 2,
          vRot: 0.03,
          size: 3.5 + Math.random() * 4.5,
          color: Math.random() > 0.4 ? '#ffffff' : '#fef08a',
          type: 'riverPetals'
        });
      }
      // Water Spray Droplets over River
      for (let i = 0; i < 35; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: screenHeight * 0.55 + Math.random() * (screenHeight * 0.35),
          vy: -0.8 - Math.random() * 1.2,
          wobblePhase: Math.random() * Math.PI * 2,
          size: 2.5 + Math.random() * 4.5,
          opacity: 0.35 + Math.random() * 0.45,
          type: 'riverSpray'
        });
      }
    } else if (theme === 'floating_islands') {
      // Steampunk Steam Puffs rising upwards
      for (let i = 0; i < 45; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: 0.3 + Math.random() * 0.7,
          vy: -0.6 - Math.random() * 0.9,
          size: 4 + Math.random() * 6,
          opacity: 0.3 + Math.random() * 0.4,
          type: 'steampunkPuffs'
        });
      }
      // Brass & Copper Gleam Sparks floating
      for (let i = 0; i < 30; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          pulse: Math.random() * Math.PI * 2,
          size: 2.5 + Math.random() * 3.5,
          color: Math.random() > 0.5 ? '#fbbf24' : '#f59e0b',
          type: 'brassSparks'
        });
      }
    } else if (theme === 'pirate_nest') {
      // Sea Gleam Particles over water
      for (let i = 0; i < 50; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: screenHeight * 0.4 + Math.random() * (screenHeight * 0.5),
          vx: 0.8 + Math.random() * 1.2,
          vy: (Math.random() - 0.5) * 0.4,
          size: 2.5 + Math.random() * 4.5,
          pulse: Math.random() * Math.PI * 2,
          color: Math.random() > 0.4 ? '#38bdf8' : '#fef08a',
          type: 'pirateGleam'
        });
      }
      // Golden Coin / Ember Sparkles
      for (let i = 0; i < 35; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -0.4 - Math.random() * 0.8,
          pulse: Math.random() * Math.PI * 2,
          size: 2 + Math.random() * 3.5,
          color: Math.random() > 0.5 ? '#f59e0b' : '#fbbf24',
          type: 'pirateGoldSparks'
        });
      }
    } else if (theme === 'junkyard') {
      // Smoke puffs from oil barrels and scrap
      for (let i = 0; i < 40; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: screenHeight * 0.4 + Math.random() * (screenHeight * 0.4),
          vx: (Math.random() - 0.5) * 0.4,
          vy: -0.5 - Math.random() * 0.8,
          size: 5 + Math.random() * 8,
          opacity: 0.25 + Math.random() * 0.35,
          type: 'junkyardSmoke'
        });
      }
      // Electrical / welding sparks from metal
      for (let i = 0; i < 30; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: screenHeight * 0.3 + Math.random() * (screenHeight * 0.5),
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          pulse: Math.random() * Math.PI * 2,
          size: 2 + Math.random() * 3,
          color: Math.random() > 0.5 ? '#eab308' : '#38bdf8',
          type: 'junkyardSparks'
        });
      }
    } else if (theme === 'autumn_orchard') {
      // Falling autumn leaves
      for (let i = 0; i < 45; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vy: 0.8 + Math.random() * 1.2,
          rot: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.08,
          size: 4 + Math.random() * 5,
          color: Math.random() > 0.5 ? '#ea580c' : (Math.random() > 0.5 ? '#d97706' : '#dc2626'),
          type: 'leaf'
        });
      }
    } else if (theme === 'cyberpunk') {
      // Cyberpunk Rain droplets
      for (let i = 0; i < 70; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vy: 8 + Math.random() * 6,
          vx: (Math.random() - 0.5) * 1.2,
          length: 12 + Math.random() * 10,
          color: Math.random() > 0.4 ? '#38bdf8' : '#ec4899',
          type: 'cyberpunkRain'
        });
      }
      // Glowing Neon Sparks & Lens Flare Glimmers
      for (let i = 0; i < 35; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          pulse: Math.random() * Math.PI * 2,
          size: 2.5 + Math.random() * 4,
          color: Math.random() > 0.5 ? '#ec4899' : (Math.random() > 0.5 ? '#38bdf8' : '#eab308'),
          type: 'neonSparks'
        });
      }
    } else if (theme === 'enchanted_forest') {
      // Floating Irrlichter (Wisps)
      for (let i = 0; i < 40; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: screenHeight * 0.15 + Math.random() * (screenHeight * 0.65),
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          pulse: Math.random() * Math.PI * 2,
          size: 3 + Math.random() * 4.5,
          color: Math.random() > 0.4 ? '#38bdf8' : (Math.random() > 0.5 ? '#67e8f9' : '#fef08a'),
          type: 'firefly'
        });
      }
      // Drifting Mystical Ground Mist
      for (let i = 0; i < 30; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: screenHeight * 0.6 + Math.random() * (screenHeight * 0.3),
          vx: 0.3 + Math.random() * 0.5,
          vy: (Math.random() - 0.5) * 0.2,
          size: 10 + Math.random() * 15,
          opacity: 0.15 + Math.random() * 0.25,
          type: 'steampunkPuffs'
        });
      }
    } else if (theme === 'savannah') {
      // Golden Heat Shimmer & Sun Motes
      for (let i = 0; i < 40; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: 0.4 + Math.random() * 0.8,
          vy: -0.2 - Math.random() * 0.4,
          pulse: Math.random() * Math.PI * 2,
          size: 3 + Math.random() * 4,
          color: Math.random() > 0.4 ? '#fbbf24' : '#f59e0b',
          type: 'neonSparks'
        });
      }
    } else if (theme === 'graveyard') {
      // Eerie Drifting Fog & Ghostly Midnight Wisps
      for (let i = 0; i < 35; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: screenHeight * 0.55 + Math.random() * (screenHeight * 0.4),
          vx: 0.2 + Math.random() * 0.4,
          vy: (Math.random() - 0.5) * 0.1,
          size: 12 + Math.random() * 18,
          opacity: 0.12 + Math.random() * 0.18,
          type: 'steampunkPuffs'
        });
      }
      for (let i = 0; i < 25; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * (screenHeight * 0.7),
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.3,
          pulse: Math.random() * Math.PI * 2,
          size: 2.5 + Math.random() * 3.5,
          color: Math.random() > 0.5 ? '#cbd5e1' : '#38bdf8',
          type: 'firefly'
        });
      }
    } else if (theme === 'harbor') {
      // Shimmering Water Light Glimmers & Floodlight Sparks
      for (let i = 0; i < 40; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: screenHeight * 0.65 + Math.random() * (screenHeight * 0.3),
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.2,
          pulse: Math.random() * Math.PI * 2,
          size: 2.5 + Math.random() * 4,
          color: Math.random() > 0.5 ? '#fef08a' : (Math.random() > 0.5 ? '#38bdf8' : '#ef4444'),
          type: 'neonSparks'
        });
      }
      for (let i = 0; i < 20; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: screenHeight * 0.45 + Math.random() * (screenHeight * 0.2),
          vx: 0.4 + Math.random() * 0.6,
          vy: -0.2 - Math.random() * 0.3,
          size: 8 + Math.random() * 12,
          opacity: 0.1 + Math.random() * 0.15,
          type: 'steampunkPuffs'
        });
      }
    } else if (theme === 'arcade') {
      // Spinning Disco Ball Light Flecks & Flashing Neon Sparks
      for (let i = 0; i < 45; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          pulse: Math.random() * Math.PI * 2,
          size: 3 + Math.random() * 4.5,
          color: Math.random() > 0.33 ? '#ec4899' : (Math.random() > 0.5 ? '#06b6d4' : '#eab308'),
          type: 'neonSparks'
        });
      }
    } else if (theme === 'clock_canyon') {
      // Golden Clockwork Gear Sparkles & Warm Desert Dust
      for (let i = 0; i < 40; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: 0.5 + Math.random() * 0.8,
          vy: -0.3 - Math.random() * 0.4,
          pulse: Math.random() * Math.PI * 2,
          size: 3 + Math.random() * 4.5,
          color: Math.random() > 0.5 ? '#f59e0b' : '#d97706',
          type: 'neonSparks'
        });
      }
    } else if (theme === 'arctic') {
      // Swirling Snow Crystals & Aurora Sparkles
      for (let i = 0; i < 90; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vy: 1.5 + Math.random() * 2.8,
          vx: Math.sin(Math.random() * Math.PI) * 1.5 - 0.5,
          size: 2.5 + Math.random() * 4.5,
          opacity: 0.5 + Math.random() * 0.5,
          type: 'snow'
        });
      }
      for (let i = 0; i < 25; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * (screenHeight * 0.4),
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          pulse: Math.random() * Math.PI * 2,
          size: 3 + Math.random() * 4,
          color: Math.random() > 0.5 ? '#4ade80' : '#38bdf8',
          type: 'firefly'
        });
      }
    } else if (theme === 'haunted_manor') {
      // Stormy Heavy Rain & Lightning Sparks
      for (let i = 0; i < 90; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vy: 9 + Math.random() * 7,
          vx: -1.5 - Math.random() * 1.0,
          length: 14 + Math.random() * 12,
          color: 'rgba(192, 132, 252, 0.45)',
          type: 'cyberpunkRain'
        });
      }
      for (let i = 0; i < 30; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          pulse: Math.random() * Math.PI * 2,
          size: 3 + Math.random() * 4,
          color: Math.random() > 0.5 ? '#c084fc' : '#38bdf8',
          type: 'neonSparks'
        });
      }
    } else if (theme === 'rooftop_garden') {
      // Sunset Golden Dust & String Light Glimmers
      for (let i = 0; i < 45; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: 0.3 + Math.random() * 0.6,
          vy: -0.2 - Math.random() * 0.3,
          pulse: Math.random() * Math.PI * 2,
          size: 3 + Math.random() * 4,
          color: Math.random() > 0.5 ? '#fef08a' : (Math.random() > 0.5 ? '#f97316' : '#ec4899'),
          type: 'neonSparks'
        });
      }
    } else if (theme === 'drive_in_cinema') {
      // Movie Projector Beam Dust Motes & Retro Neon Sparks
      for (let i = 0; i < 50; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: (Math.random() - 0.5) * 0.6,
          vy: -0.3 - Math.random() * 0.5,
          pulse: Math.random() * Math.PI * 2,
          size: 2.5 + Math.random() * 4,
          color: Math.random() > 0.4 ? '#fef08a' : (Math.random() > 0.5 ? '#06b6d4' : '#f43f5e'),
          type: 'neonSparks'
        });
      }
    } else if (theme === 'crystal_cave') {
      // Floating Bioluminescent Crystal Sparkles & Cavern Water Droplets
      for (let i = 0; i < 60; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -0.4 - Math.random() * 0.6,
          pulse: Math.random() * Math.PI * 2,
          size: 3 + Math.random() * 4.5,
          color: Math.random() > 0.33 ? '#38bdf8' : (Math.random() > 0.5 ? '#c084fc' : '#34d399'),
          type: 'neonSparks'
        });
      }
    } else if (theme === 'grand_canyon') {
      // Warm Desert Sand Dust Motes in Thermal Updrafts
      for (let i = 0; i < 50; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: 0.8 + Math.random() * 1.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: 2.5 + Math.random() * 4.5,
          opacity: 0.25 + Math.random() * 0.35,
          type: 'desertDust'
        });
      }
    } else if (theme === 'ghost_ship') {
      // Stormy Ocean Rain Streaks
      for (let i = 0; i < 80; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vy: 8 + Math.random() * 6,
          vx: -1.2 - Math.random() * 0.8,
          length: 12 + Math.random() * 10,
          color: 'rgba(167, 243, 208, 0.4)',
          type: 'cyberpunkRain'
        });
      }
      // Eerie Green Ghost Wisps
      for (let i = 0; i < 40; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          pulse: Math.random() * Math.PI * 2,
          size: 3 + Math.random() * 4.5,
          color: Math.random() > 0.4 ? '#34d399' : '#a7f3d0',
          type: 'firefly'
        });
      }
    } else if (theme === 'construction_site') {
      // Floating Industrial Dust Motes & Welding Sparks
      for (let i = 0; i < 50; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: 0.6 + Math.random() * 0.9,
          vy: 0.2 + Math.random() * 0.5,
          pulse: Math.random() * Math.PI * 2,
          size: 2.5 + Math.random() * 4,
          color: Math.random() > 0.5 ? '#eab308' : (Math.random() > 0.5 ? '#f97316' : '#ffffff'),
          type: 'neonSparks'
        });
      }
    } else if (theme === 'western_mine') {
      // Rolling Tumbleweeds & Desert Dust
      for (let i = 0; i < 8; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: screenHeight * 0.7 + Math.random() * (screenHeight * 0.22),
          speedX: 2.2 + Math.random() * 3.2,
          rot: Math.random() * Math.PI * 2,
          size: 16 + Math.random() * 12,
          type: 'tumbleweed'
        });
      }
      for (let i = 0; i < 45; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: screenHeight * 0.4 + Math.random() * (screenHeight * 0.55),
          vx: 1.5 + Math.random() * 2.5,
          vy: (Math.random() - 0.5) * 0.3,
          size: 3 + Math.random() * 6,
          opacity: 0.25 + Math.random() * 0.35,
          type: 'desertDust'
        });
      }
    } else if (theme === 'toy_box') {
      // Playful Colorful Paper Confetti & Star Particles
      for (let i = 0; i < 55; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: (Math.random() - 0.5) * 0.8,
          vy: 0.4 + Math.random() * 0.8,
          pulse: Math.random() * Math.PI * 2,
          size: 3 + Math.random() * 5,
          color: ['#ef4444', '#3b82f6', '#eab308', '#22c55e', '#ec4899'][Math.floor(Math.random() * 5)],
          type: 'neonSparks'
        });
      }
    } else if (theme === 'bamboo_valley') {
      // Drifting Green Bamboo Petals & Soft Mountain Mist
      for (let i = 0; i < 50; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: 0.6 + Math.random() * 1.0,
          vy: 0.2 + Math.random() * 0.5,
          rot: Math.random() * Math.PI * 2,
          vRot: 0.03,
          size: 3.5 + Math.random() * 4.5,
          color: Math.random() > 0.33 ? '#22c55e' : (Math.random() > 0.5 ? '#4ade80' : '#a7f3d0'),
          type: 'riverPetals'
        });
      }
    } else if (theme === 'vampire_castle') {
      // Eerie Blood-Red & Purple Embers & Flying Bat Sparkles
      for (let i = 0; i < 60; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: (Math.random() - 0.5) * 0.6,
          vy: -0.3 - Math.random() * 0.6,
          pulse: Math.random() * Math.PI * 2,
          size: 3 + Math.random() * 4.5,
          color: Math.random() > 0.4 ? '#ef4444' : (Math.random() > 0.5 ? '#a855f7' : '#f59e0b'),
          type: 'neonSparks'
        });
      }
    } else if (theme === 'subway_station') {
      // Subway Tunnel Ambient Dust & Electric Neon Sparks
      for (let i = 0; i < 55; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: (Math.random() - 0.5) * 0.7,
          vy: -0.2 - Math.random() * 0.4,
          pulse: Math.random() * Math.PI * 2,
          size: 2.5 + Math.random() * 4,
          color: Math.random() > 0.4 ? '#38bdf8' : (Math.random() > 0.5 ? '#f59e0b' : '#34d399'),
          type: 'neonSparks'
        });
      }
    } else if (theme === 'cloud_castle') {
      // Celestial Floating Cloud Fluff & Golden Shimmer Sparkles
      for (let i = 0; i < 60; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -0.3 - Math.random() * 0.5,
          pulse: Math.random() * Math.PI * 2,
          size: 3 + Math.random() * 5,
          color: Math.random() > 0.4 ? '#ffffff' : (Math.random() > 0.5 ? '#fef08a' : '#f472b6'),
          type: 'neonSparks'
        });
      }
    } else if (theme === 'mystic_mangrove') {
      // Swamp Mist Puff Motes & Bioluminescent Green Fireflies
      for (let i = 0; i < 45; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: screenHeight * 0.35 + Math.random() * (screenHeight * 0.55),
          vx: (Math.random() - 0.5) * 0.4,
          vy: -0.2 - Math.random() * 0.3,
          size: 6 + Math.random() * 9,
          opacity: 0.2 + Math.random() * 0.3,
          type: 'junkyardSmoke'
        });
      }
      for (let i = 0; i < 35; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          pulse: Math.random() * Math.PI * 2,
          size: 3 + Math.random() * 4,
          color: Math.random() > 0.4 ? '#34d399' : '#6ee7b7',
          type: 'firefly'
        });
      }
    } else if (theme === 'outer_space') {
      // 1. Sanft schwebende & funkelnde Weltraum-Sterne (Drifting Starlight Sparks)
      for (let i = 0; i < 75; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.25,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          size: 1.5 + Math.random() * 3.0,
          color: Math.random() > 0.4 ? '#ffffff' : (Math.random() > 0.5 ? '#38bdf8' : '#fef08a'),
          type: 'driftingStar'
        });
      }
      // 2. Galaktischer Nebelstaub (Soft Glowing Shimmer Motes)
      for (let i = 0; i < 50; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.4,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.03 + Math.random() * 0.03,
          size: 3.5 + Math.random() * 6,
          color: Math.random() > 0.4 ? '#ec4899' : (Math.random() > 0.5 ? '#8b5cf6' : '#38bdf8'),
          type: 'nebulaDust'
        });
      }
      // 3. Sanft entgegenfliegende 3D-Sterne (Flug auf den Betrachter zu)
      for (let i = 0; i < 85; i++) {
        this.weatherParticles.push({
          x: (Math.random() - 0.5) * virtualWidth * 1.5,
          y: (Math.random() - 0.5) * screenHeight * 1.5,
          z: Math.random() * 1000 + 20,
          speed: 1.8 + Math.random() * 2.8,
          baseSize: 1.2 + Math.random() * 1.6,
          color: Math.random() > 0.35 ? '#ffffff' : (Math.random() > 0.5 ? '#e0f2fe' : '#fef08a'),
          type: 'incomingStar'
        });
      }
    } else if (theme === 'colosseum_arena') {
      // 1. Aufwirbelnder goldener Arenasand & Staub (Swirling Arena Sand)
      for (let i = 0; i < 65; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: screenHeight * 0.45 + Math.random() * (screenHeight * 0.55),
          vx: 0.6 + Math.random() * 1.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: 2.0 + Math.random() * 3.5,
          color: Math.random() > 0.4 ? 'rgba(217, 119, 6, 0.45)' : 'rgba(253, 230, 138, 0.4)',
          pulse: Math.random() * Math.PI * 2,
          type: 'arenaSandDust'
        });
      }
      // 2. Glänzende Goldflocken & Lorbeer-Schimmer (Triumphal Roman Gold Specks)
      for (let i = 0; i < 40; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: (Math.random() - 0.5) * 0.6,
          vy: 0.4 + Math.random() * 0.7,
          rot: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.05,
          size: 3.0 + Math.random() * 3.5,
          color: Math.random() > 0.3 ? '#facc15' : '#fde047',
          pulse: Math.random() * Math.PI * 2,
          type: 'romanLaurelFlakes'
        });
      }
    } else if (theme === 'ski_resort') {
      // 1. Dichter, sanfter Schneefall über der Skipiste
      for (let i = 0; i < 140; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vy: 1.5 + Math.random() * 2.8,
          vx: (Math.random() - 0.5) * 0.8,
          size: 2 + Math.random() * 4.5,
          opacity: 0.45 + Math.random() * 0.55,
          type: 'snow'
        });
      }
      // 2. Glitzernde Eiskristalle & Schneekanonen-Nebel im Sonnenlicht
      for (let i = 0; i < 35; i++) {
        this.weatherParticles.push({
          x: 250 + Math.random() * 500,
          y: screenHeight * 0.45 + Math.random() * (screenHeight * 0.4),
          vx: 1.2 + Math.random() * 1.8,
          vy: -0.4 - Math.random() * 0.8,
          size: 1.5 + Math.random() * 3.0,
          pulse: Math.random() * Math.PI * 2,
          color: Math.random() > 0.4 ? '#ffffff' : '#bae6fd',
          type: 'driftingStar'
        });
      }
    } else if (theme === 'iceland_geysir') {
      // 1. Rollende geothermische Nebelwolken (Puffing Geothermal Steam Clouds)
      for (let i = 0; i < 45; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: screenHeight * 0.4 + Math.random() * (screenHeight * 0.5),
          vx: 0.3 + Math.random() * 0.6,
          vy: -0.15 - Math.random() * 0.25,
          sizeX: 60 + Math.random() * 100,
          sizeY: 25 + Math.random() * 45,
          pulse: Math.random() * Math.PI * 2,
          opacity: 0.18 + Math.random() * 0.28,
          type: 'moorlandMist'
        });
      }
      // 2. Geysir-Dampfschwaden & feine Nebeltropfen (Rising Geyser Steam & Droplets)
      for (let i = 0; i < 40; i++) {
        this.weatherParticles.push({
          x: 1000 + Math.random() * 400,
          y: screenHeight * 0.2 + Math.random() * (screenHeight * 0.6),
          vx: (Math.random() - 0.5) * 0.5,
          vy: -0.6 - Math.random() * 1.2,
          size: 2.0 + Math.random() * 3.5,
          pulse: Math.random() * Math.PI * 2,
          color: Math.random() > 0.3 ? 'rgba(255, 255, 255, 0.75)' : 'rgba(207, 250, 254, 0.6)',
          type: 'driftingStar'
        });
      }
    } else if (theme === 'giant_bakery') {
      // 1. Schwebender weißer Mehlstaub (Whimsical Floating White Flour Dust)
      for (let i = 0; i < 75; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: (Math.random() - 0.5) * 0.45,
          vy: 0.15 + Math.random() * 0.35,
          size: 1.5 + Math.random() * 2.8,
          pulse: Math.random() * Math.PI * 2,
          color: Math.random() > 0.3 ? 'rgba(255, 255, 255, 0.85)' : 'rgba(254, 240, 138, 0.65)',
          type: 'driftingStar'
        });
      }
      // 2. Aufsteigender warmer Backdampf aus den Teigkesseln (Warm Bakery Steam)
      for (let i = 0; i < 25; i++) {
        this.weatherParticles.push({
          x: 1200 + Math.random() * 500,
          y: screenHeight * 0.4 + Math.random() * (screenHeight * 0.4),
          vx: (Math.random() - 0.5) * 0.4,
          vy: -0.25 - Math.random() * 0.4,
          sizeX: 35 + Math.random() * 55,
          sizeY: 18 + Math.random() * 30,
          pulse: Math.random() * Math.PI * 2,
          opacity: 0.15 + Math.random() * 0.22,
          type: 'moorlandMist'
        });
      }
      // 3. Glühende Ofenfunken aus dem Backofen (Glowing Oven Sparks)
      for (let i = 0; i < 20; i++) {
        this.weatherParticles.push({
          x: 400 + Math.random() * 250,
          y: screenHeight * 0.45 + Math.random() * (screenHeight * 0.25),
          vx: 0.5 + Math.random() * 1.0,
          vy: -0.5 - Math.random() * 1.0,
          size: 1.5 + Math.random() * 2.5,
          pulse: Math.random() * Math.PI * 2,
          color: Math.random() > 0.4 ? '#f59e0b' : '#ef4444',
          type: 'driftingStar'
        });
      }
    } else if (theme === 'arcade_chip') {
      // 1. Kleine Funken leuchten manchmal dort und da auf (Random Circuit Sparks)
      for (let i = 0; i < 65; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          baseSize: 1.5 + Math.random() * 2.5,
          color: ['#38bdf8', '#00f5ff', '#facc15', '#4ade80', '#ffffff', '#fb923c'][Math.floor(Math.random() * 6)],
          state: 'dormant',
          timer: Math.floor(Math.random() * 100),
          flareDuration: 20 + Math.floor(Math.random() * 30),
          flareAge: 0,
          type: 'chipSpark'
        });
      }
      // 2. Sanft fließende Daten-Impulse entlang der Leiterbahnen
      for (let i = 0; i < 24; i++) {
        const isHorizontal = Math.random() > 0.4;
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: isHorizontal ? (Math.random() > 0.5 ? 1.4 : -1.4) : 0,
          vy: !isHorizontal ? (Math.random() > 0.5 ? 1.2 : -1.2) : 0,
          size: 1.8 + Math.random() * 2.2,
          pulse: Math.random() * Math.PI * 2,
          color: Math.random() > 0.4 ? '#38bdf8' : '#facc15',
          type: 'driftingStar'
        });
      }
    } else if (theme === 'sakura_park') {
      // 1. Fallende zarte rosa Kirschblütenblätter (Falling Sakura Petals)
      const sakuraColors = ['#fbcfe8', '#f472b6', '#fda4af', '#fce7f3', '#fb7185', '#ffffff'];
      for (let i = 0; i < 90; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vy: 0.6 + Math.random() * 1.0,
          size: 3.5 + Math.random() * 3.5,
          rot: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.04,
          color: sakuraColors[Math.floor(Math.random() * sakuraColors.length)],
          type: 'petal'
        });
      }
      // 2. Sonniges Frühlings-Lichtglitzern (Spring Sunshine Shimmer)
      for (let i = 0; i < 25; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: 1.5 + Math.random() * 2.5,
          pulse: Math.random() * Math.PI * 2,
          color: Math.random() > 0.4 ? 'rgba(255, 241, 242, 0.85)' : 'rgba(254, 205, 211, 0.75)',
          type: 'driftingStar'
        });
      }
    } else if (theme === 'formula1_track') {
      // 1. Authentische F1-Regentropfen & Regenschlieren (Racing Track Rain)
      for (let i = 0; i < 140; i++) {
        this.weatherParticles.push({
          x: Math.random() * (virtualWidth + 400),
          y: Math.random() * screenHeight,
          vx: -3.5 - Math.random() * 2.5,
          vy: 16 + Math.random() * 8,
          len: 22 + Math.random() * 16,
          width: 1.2 + Math.random() * 1.0,
          opacity: 0.35 + Math.random() * 0.45,
          type: 'rain'
        });
      }
      // 2. Gischt & Wasserspritzer von den Rennwagen-Reifen (Tire Water Spray)
      for (let i = 0; i < 35; i++) {
        this.weatherParticles.push({
          x: 1200 + Math.random() * 650,
          y: screenHeight * 0.70 + Math.random() * (screenHeight * 0.25),
          vx: (Math.random() - 0.5) * 1.5,
          vy: -0.6 - Math.random() * 1.2,
          size: 1.8 + Math.random() * 2.8,
          pulse: Math.random() * Math.PI * 2,
          color: 'rgba(224, 242, 254, 0.75)',
          type: 'driftingStar'
        });
      }
    } else if (theme === 'coral_reef_lowtide') {
      // 1. Kleine Vögel ziehen am Himmel vorbei (Flock of Birds / Seagulls gliding by)
      for (let i = 0; i < 24; i++) {
        const flyRight = Math.random() > 0.35;
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: 35 + Math.random() * (screenHeight * 0.45),
          vx: (flyRight ? 1 : -1) * (1.6 + Math.random() * 2.2),
          vy: (Math.random() - 0.5) * 0.35,
          size: 7 + Math.random() * 8,
          wingPhase: Math.random() * Math.PI * 2,
          wingSpeed: 0.10 + Math.random() * 0.08,
          color: Math.random() > 0.25 ? '#ffffff' : '#f8fafc',
          type: 'flyingBird'
        });
      }
      // 2. Glitzernde Sonnenreflexionen auf den Gezeitentümpeln (Water Surface Sparkles)
      for (let i = 0; i < 28; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: screenHeight * 0.55 + Math.random() * (screenHeight * 0.4),
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: 1.5 + Math.random() * 2.2,
          pulse: Math.random() * Math.PI * 2,
          color: Math.random() > 0.4 ? 'rgba(255, 255, 255, 0.85)' : 'rgba(186, 230, 253, 0.8)',
          type: 'driftingStar'
        });
      }
    } else if (theme === 'artist_studio') {
      // 1. Farbpunkte erscheinen und verschwinden wieder (Pulsing Artist Paint Dots)
      const paletteColors = ['#ef4444', '#3b82f6', '#facc15', '#10b981', '#a855f7', '#f97316', '#ec4899', '#06b6d4', '#ffffff'];
      for (let i = 0; i < 70; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          size: 8 + Math.random() * 14,
          color: paletteColors[Math.floor(Math.random() * paletteColors.length)],
          state: 'dormant',
          timer: Math.floor(Math.random() * 100),
          age: 0,
          maxAge: 40 + Math.floor(Math.random() * 50),
          type: 'paintDot'
        });
      }
    } else if (theme === 'pixel_desert') {
      // 8-Bit Pixel-Partikel fliegen kreuz und quer in der Gegend herum (Flying 8-Bit Desert Pixels)
      const retroBitColors = ['#facc15', '#f59e0b', '#84cc16', '#38bdf8', '#fb923c', '#ffffff', '#e879f9'];
      for (let i = 0; i < 65; i++) {
        const speed = 1.0 + Math.random() * 2.2;
        const angle = Math.random() * Math.PI * 2;
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          wobbleSpeed: 0.04 + Math.random() * 0.05,
          wobblePhase: Math.random() * Math.PI * 2,
          size: [4, 6, 8, 10][Math.floor(Math.random() * 4)],
          color: retroBitColors[Math.floor(Math.random() * retroBitColors.length)],
          type: 'pixelBit'
        });
      }
    } else if (theme === 'giza_pyramids') {
      // Viel mehr Staub-Partikel fliegen durch die heiße Wüstenluft (Dense Swirling Desert Dust Motes)
      const dustHues = ['#fde68a', '#facc15', '#f59e0b', '#d97706', '#fed7aa', '#ffffff', '#fbbf24', '#fef3c7'];
      for (let i = 0; i < 220; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: 0.9 + Math.random() * 2.5,
          vy: (Math.random() - 0.45) * 0.8,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.05,
          size: 1.4 + Math.random() * 3.6,
          opacity: 0.35 + Math.random() * 0.50,
          color: dustHues[Math.floor(Math.random() * dustHues.length)],
          type: 'desertDustMote'
        });
      }
    } else if (theme === 'soccer_stadium') {
      // Bälle fliegen mir entgegen (3D Incoming Soccer Balls flying towards the player)
      for (let i = 0; i < 35; i++) {
        this.weatherParticles.push({
          x: (Math.random() - 0.5) * virtualWidth * 1.6,
          y: (Math.random() - 0.4) * screenHeight * 1.4,
          z: Math.random() * 950 + 50,
          speed: 3.5 + Math.random() * 4.5,
          baseRadius: 16,
          rot: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.12,
          type: 'incomingSoccerBall'
        });
      }
    } else if (theme === 'prairie_tornado') {
      // 1. Blitze rundherum (Jagged Lightning Bolts flashing in the storm sky - dezent dosiert)
      for (let i = 0; i < 2; i++) {
        this.weatherParticles.push({
          state: 'dormant',
          timer: 80 + Math.floor(Math.random() * 160),
          strikeDuration: 5 + Math.floor(Math.random() * 4),
          strikeAge: 0,
          segments: [],
          type: 'prairieLightning'
        });
      }
      // 2. Sturm-Trümmer & Grasfetzen (Swirling Prairie Wind Debris)
      for (let i = 0; i < 55; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: 4.0 + Math.random() * 5.5,
          vy: (Math.random() - 0.45) * 2.5,
          rot: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.3,
          size: 4 + Math.random() * 8,
          color: ['#475569', '#78350f', '#ca8a04', '#15803d', '#334155'][Math.floor(Math.random() * 5)],
          type: 'tornadoDebris'
        });
      }
    } else if (theme === 'retro_living_room') {
      // 1. Romantisches, leichtes Kamin- & Raumflackern (Subtle Warm Room Flicker Controller)
      this.weatherParticles.push({
        phase1: 0,
        phase2: Math.PI * 0.5,
        type: 'romanticRoomFlicker'
      });
      // 2. Warme romantische Kaminfunken & Schwebeteilchen (Cozy Fireplace Embers)
      const emberColors = ['#f97316', '#facc15', '#ef4444', '#fbbf24', '#fef08a', '#ea580c'];
      for (let i = 0; i < 48; i++) {
        this.weatherParticles.push({
          x: 240 + Math.random() * (virtualWidth * 0.75),
          y: screenHeight * 0.25 + Math.random() * (screenHeight * 0.70),
          vy: -0.4 - Math.random() * 0.9,
          vx: (Math.random() - 0.45) * 0.5,
          wobblePhase: Math.random() * Math.PI * 2,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.03 + Math.random() * 0.04,
          size: 1.6 + Math.random() * 2.8,
          opacity: 0.4 + Math.random() * 0.5,
          color: emberColors[Math.floor(Math.random() * emberColors.length)],
          type: 'cozyFireplaceEmber'
        });
      }
    } else if (theme === 'comic_drawing_board') {
      // Große bunte Farbpunkte erscheinen und verschwinden wieder (Large Pop-Art Halftone & Ink Dots)
      const comicDotHues = ['#ef4444', '#3b82f6', '#facc15', '#10b981', '#a855f7', '#f97316', '#ec4899', '#06b6d4', '#0f172a', '#f43f5e'];
      for (let i = 0; i < 45; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          size: 26 + Math.random() * 32, // GROSSE Punkte (26px bis 58px)
          color: comicDotHues[Math.floor(Math.random() * comicDotHues.length)],
          state: 'dormant',
          timer: Math.floor(Math.random() * 80),
          age: 0,
          maxAge: 50 + Math.floor(Math.random() * 60),
          type: 'largeComicDot'
        });
      }
    } else if (theme === 'venice_canals') {
      // 1. Venezianische Tauben fliegen vorbei (Venetian Pigeons & Doves gliding over canals)
      const pigeonColors = ['#64748b', '#475569', '#94a3b8', '#334155', '#cbd5e1', '#f8fafc', '#78716c'];
      for (let i = 0; i < 28; i++) {
        const flyRight = Math.random() > 0.4;
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: 25 + Math.random() * (screenHeight * 0.55),
          vx: (flyRight ? 1 : -1) * (1.8 + Math.random() * 2.4),
          vy: (Math.random() - 0.48) * 0.45,
          size: 8 + Math.random() * 7,
          wingPhase: Math.random() * Math.PI * 2,
          wingSpeed: 0.12 + Math.random() * 0.08,
          bodyColor: pigeonColors[Math.floor(Math.random() * pigeonColors.length)],
          neckColor: Math.random() > 0.5 ? '#10b981' : '#8b5cf6',
          type: 'venicePigeon'
        });
      }
      // 2. Romantisches Sonnenlicht-Glitzern auf dem Wasser (Venetian Canal Water Sparkles)
      for (let i = 0; i < 35; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: screenHeight * 0.65 + Math.random() * (screenHeight * 0.32),
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.15,
          size: 1.5 + Math.random() * 2.2,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.03 + Math.random() * 0.04,
          color: Math.random() > 0.4 ? 'rgba(254, 240, 138, 0.85)' : 'rgba(255, 255, 255, 0.9)',
          type: 'canalWaterGlint'
        });
      }
    } else if (theme === 'skatepark') {
      // 1. Scheinwerferlicht-Kegel (Pulsing Volumetric Stadium / Skatepark Floodlight Beams)
      const beamConfigs = [
        { originX: 250, originY: -10, targetX: 550, sweepSpeed: 0.015, widthTop: 35, widthBottom: 380, color: 'rgba(254, 249, 195, 0.22)' },
        { originX: 950, originY: -20, targetX: 1100, sweepSpeed: 0.018, widthTop: 40, widthBottom: 420, color: 'rgba(255, 255, 255, 0.24)' },
        { originX: 1650, originY: -15, targetX: 1450, sweepSpeed: 0.014, widthTop: 35, widthBottom: 400, color: 'rgba(254, 240, 138, 0.20)' },
        { originX: 2150, originY: -10, targetX: 1950, sweepSpeed: 0.020, widthTop: 40, widthBottom: 410, color: 'rgba(224, 242, 254, 0.22)' }
      ];
      beamConfigs.forEach((cfg, idx) => {
        this.weatherParticles.push({
          originX: cfg.originX,
          originY: cfg.originY,
          baseTargetX: cfg.targetX,
          sweepSpeed: cfg.sweepSpeed,
          sweepPhase: idx * 1.5,
          widthTop: cfg.widthTop,
          widthBottom: cfg.widthBottom,
          color: cfg.color,
          type: 'spotlightBeam'
        });
      });

      // 2. Im Scheinwerferlicht leuchtende Staub- & Lichtpartikel (Glowing Dust Motes in Spotlight)
      for (let i = 0; i < 55; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: screenHeight * 0.15 + Math.random() * (screenHeight * 0.80),
          vx: (Math.random() - 0.48) * 0.45,
          vy: -0.2 - Math.random() * 0.45,
          size: 1.6 + Math.random() * 2.8,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.03 + Math.random() * 0.04,
          type: 'spotlightMote'
        });
      }
    } else if (theme === 'aurora_borealis') {
      // 1. Rollende arktische Nebelwolken (Rolling Arctic Aurora Mist Clouds)
      const mistTints = ['rgba(224, 242, 254, 0.22)', 'rgba(167, 243, 208, 0.20)', 'rgba(233, 213, 255, 0.18)', 'rgba(241, 245, 249, 0.24)'];
      for (let i = 0; i < 52; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: screenHeight * 0.38 + Math.random() * (screenHeight * 0.55),
          vx: 0.35 + Math.random() * 0.75,
          vy: (Math.random() - 0.48) * 0.25,
          sizeX: 70 + Math.random() * 120,
          sizeY: 30 + Math.random() * 55,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.015 + Math.random() * 0.02,
          opacity: 0.16 + Math.random() * 0.25,
          color: mistTints[Math.floor(Math.random() * mistTints.length)],
          type: 'auroraMist'
        });
      }
      // 2. Glitzernder Polar-Eiskristallstaub (Glimmering Aurora Ice Dust)
      for (let i = 0; i < 40; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: (Math.random() - 0.5) * 0.35,
          vy: -0.15 - Math.random() * 0.35,
          size: 1.4 + Math.random() * 2.6,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.03 + Math.random() * 0.04,
          color: Math.random() > 0.5 ? '#6ee7b7' : '#c084fc',
          type: 'driftingStar'
        });
      }
    } else if (theme === 'mad_scientist_lab') {
      // 1. Zickzack-Elektroblitze & Funkenentladungen (Crackling High-Voltage Electric Arc Sparks)
      for (let i = 0; i < 28; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: screenHeight * 0.10 + Math.random() * (screenHeight * 0.75),
          state: Math.random() > 0.4 ? 'sparking' : 'dormant',
          timer: Math.floor(Math.random() * 30),
          sparkLife: 0,
          maxSparkLife: 4 + Math.floor(Math.random() * 7),
          segments: [],
          color: Math.random() > 0.5 ? '#38bdf8' : (Math.random() > 0.5 ? '#fef08a' : '#4ade80'),
          type: 'electricSparkArc'
        });
      }
      // 2. Umherfliegende glühende Funken (High-Energy Flying Electric Sparks)
      for (let i = 0; i < 70; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: (Math.random() - 0.5) * 6.5,
          vy: (Math.random() - 0.5) * 6.0 - 0.8,
          life: 0.2 + Math.random() * 0.8,
          decay: 0.02 + Math.random() * 0.035,
          size: 1.5 + Math.random() * 2.8,
          color: ['#67e8f9', '#38bdf8', '#fef08a', '#ffffff', '#4ade80', '#a855f7'][Math.floor(Math.random() * 6)],
          type: 'electricSparkFly'
        });
      }
      // 3. Aufsteigende blubbernde Giftgas- & Laborbläschen (Bubbling Chemical Beaker Motes)
      for (let i = 0; i < 35; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: screenHeight * 0.45 + Math.random() * (screenHeight * 0.50),
          vx: (Math.random() - 0.5) * 0.5,
          vy: -0.7 - Math.random() * 1.1,
          size: 2.2 + Math.random() * 4.0,
          pulse: Math.random() * Math.PI * 2,
          opacity: 0.25 + Math.random() * 0.45,
          color: Math.random() > 0.35 ? '#22c55e' : '#10b981',
          type: 'labChemicalBubble'
        });
      }
    } else if (theme === 'taj_mahal') {
      // 1. Rosarote Blätter & Blütenblätter fallen sanft von den Bäumen (Falling Pink Leaves / Petals)
      const pinkLeafColors = ['#f43f5e', '#fb7185', '#fda4af', '#f472b6', '#fecdd3', '#e11d48'];
      for (let i = 0; i < 75; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: 0.6 + Math.random() * 1.3,
          vy: 0.9 + Math.random() * 1.4,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: 0.025 + Math.random() * 0.035,
          wobbleAmp: 1.2 + Math.random() * 2.2,
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.04,
          size: 7 + Math.random() * 9,
          aspect: 0.45 + Math.random() * 0.25,
          color: pinkLeafColors[Math.floor(Math.random() * pinkLeafColors.length)],
          opacity: 0.70 + Math.random() * 0.30,
          type: 'tajMahalPinkLeaf'
        });
      }
      // 2. Glitzernde Wasserspiegelungen im reflektierenden Pool (Reflecting Pool Water Glints)
      for (let i = 0; i < 40; i++) {
        this.weatherParticles.push({
          x: virtualWidth * 0.32 + Math.random() * (virtualWidth * 0.36),
          y: screenHeight * 0.62 + Math.random() * (screenHeight * 0.34),
          size: 1.8 + Math.random() * 3.2,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.04 + Math.random() * 0.05,
          color: Math.random() > 0.4 ? 'rgba(254, 240, 138, 0.85)' : 'rgba(255, 255, 255, 0.9)',
          type: 'tajMahalWaterGlint'
        });
      }
    } else if (theme === 'hanging_gardens_babylon') {
      // 1. Sanft vorbeiziehende Nebelschwaden über den Terrassen (Drifting Mist Clouds)
      const mistShades = [
        'rgba(254, 252, 232, 0.22)',
        'rgba(240, 253, 250, 0.24)',
        'rgba(255, 255, 255, 0.20)',
        'rgba(254, 243, 199, 0.25)'
      ];
      for (let i = 0; i < 48; i++) {
        this.weatherParticles.push({
          x: Math.random() * (virtualWidth + 300) - 150,
          y: screenHeight * 0.12 + Math.random() * (screenHeight * 0.76),
          vx: 0.55 + Math.random() * 0.95,
          vy: (Math.random() - 0.48) * 0.2,
          sizeX: 95 + Math.random() * 160,
          sizeY: 38 + Math.random() * 58,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.015 + Math.random() * 0.022,
          opacity: 0.18 + Math.random() * 0.22,
          color: mistShades[Math.floor(Math.random() * mistShades.length)],
          type: 'babylonMist'
        });
      }
      // 2. Glitzernde Wüstensonne-Motes & Gischt-Wassertröpfchen (Waterfall Spray & Sun Motes)
      for (let i = 0; i < 45; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: screenHeight * 0.25 + Math.random() * (screenHeight * 0.65),
          vx: (Math.random() - 0.5) * 0.6,
          vy: -0.35 - Math.random() * 0.65,
          size: 1.5 + Math.random() * 2.8,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.03 + Math.random() * 0.05,
          color: Math.random() > 0.4 ? 'rgba(254, 240, 138, 0.85)' : 'rgba(186, 230, 253, 0.85)',
          type: 'babylonWaterSpray'
        });
      }
    } else if (theme === 'zeus_statue_olympia') {
      // 1. Goldene Taler fliegen mir entgegen (3D Incoming Golden Coins flying towards the player)
      for (let i = 0; i < 48; i++) {
        this.weatherParticles.push({
          x: (Math.random() - 0.5) * virtualWidth * 1.6,
          y: (Math.random() - 0.4) * screenHeight * 1.4,
          z: Math.random() * 950 + 50,
          speed: 4.2 + Math.random() * 5.2,
          baseRadius: 18,
          rot: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.08,
          spinAngle: Math.random() * Math.PI * 2,
          spinSpeed: 0.06 + Math.random() * 0.09,
          type: 'incomingGoldCoin'
        });
      }
      // 2. Schwebende göttliche Goldstaub-Motes (Divine Golden Temple Sparkles)
      for (let i = 0; i < 40; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -0.2 - Math.random() * 0.5,
          size: 1.8 + Math.random() * 3.0,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.03 + Math.random() * 0.05,
          color: Math.random() > 0.4 ? '#fde047' : '#ffffff',
          type: 'zeusDivineSparkle'
        });
      }
    } else if (theme === 'lighthouse_alexandria') {
      // 1. Dichte, wehende Mittelmeer-Regentropfen (Mediterranean Sea Rain)
      for (let i = 0; i < 155; i++) {
        this.weatherParticles.push({
          x: Math.random() * (virtualWidth + 500) - 100,
          y: Math.random() * screenHeight,
          vx: -2.8 - Math.random() * 2.2,
          vy: 15.5 + Math.random() * 7.5,
          len: 20 + Math.random() * 15,
          width: 1.2 + Math.random() * 0.9,
          opacity: 0.35 + Math.random() * 0.45,
          type: 'rain'
        });
      }
      // 2. Gischt & Wellenspritzer auf dem Meer (Sea Spray Ripples & Splashes)
      for (let i = 0; i < 40; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: screenHeight * 0.62 + Math.random() * (screenHeight * 0.35),
          radius: 1.5,
          maxRadius: 10 + Math.random() * 14,
          opacity: 0.6 + Math.random() * 0.4,
          growSpeed: 0.35 + Math.random() * 0.45,
          type: 'alexandriaSeaSplash'
        });
      }
    } else if (theme === 'colossus_rhodes') {
      // 1. Sanft vorbeiziehende Wolken über dem ägäischen Himmel (Drifting Fluffy Clouds)
      for (let i = 0; i < 30; i++) {
        const baseRadius = 38 + Math.random() * 45;
        this.weatherParticles.push({
          x: Math.random() * (virtualWidth + 600) - 250,
          y: screenHeight * 0.04 + Math.random() * (screenHeight * 0.38),
          vx: 0.45 + Math.random() * 0.85,
          scale: 0.75 + Math.random() * 0.70,
          opacity: 0.38 + Math.random() * 0.38,
          lobes: [
            { dx: 0, dy: 0, r: baseRadius },
            { dx: -baseRadius * 0.65, dy: baseRadius * 0.25, r: baseRadius * 0.72 },
            { dx: baseRadius * 0.65, dy: baseRadius * 0.25, r: baseRadius * 0.75 },
            { dx: -baseRadius * 1.1, dy: baseRadius * 0.45, r: baseRadius * 0.55 },
            { dx: baseRadius * 1.1, dy: baseRadius * 0.45, r: baseRadius * 0.58 }
          ],
          type: 'driftingCloudRhodes'
        });
      }
      // 2. Warme ägäische Sonnenstaub-Motes (Aegean Sun Motes)
      for (let i = 0; i < 35; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: (Math.random() - 0.48) * 0.5,
          vy: -0.2 - Math.random() * 0.4,
          size: 1.6 + Math.random() * 2.8,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.03 + Math.random() * 0.05,
          color: Math.random() > 0.4 ? 'rgba(254, 240, 138, 0.85)' : 'rgba(255, 255, 255, 0.85)',
          type: 'rhodesSunMote'
        });
      }
    } else if (theme === 'mausoleum_halicarnassus') {
      // Sterne fallen von oben langsam herunter (Slowly falling twinkling stars from above)
      const starColors = [
        '#ffffff',                    // Diamant-Weiß
        'rgba(254, 240, 138, 0.95)',  // Sanftes Sternengold
        'rgba(253, 224, 71, 0.9)',    // Warmes Gold
        'rgba(254, 215, 170, 0.9)',   // Dämmerungs-Bernstein
        'rgba(224, 242, 254, 0.95)'   // Himmlisches Eisblau
      ];
      for (let i = 0; i < 52; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: (Math.random() - 0.48) * 0.35,
          vy: 0.35 + Math.random() * 0.55, // Sanft und langsam von oben herabgleitend
          size: 2.0 + Math.random() * 2.8,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.03 + Math.random() * 0.05,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: 0.015 + Math.random() * 0.02,
          rot: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.025,
          color: starColors[Math.floor(Math.random() * starColors.length)],
          type: 'fallingStarHalicarnassus'
        });
      }
    } else if (theme === 'artemis_temple_ephesus') {
      // 1. Scheinwerferlicht-Strahlen von oben über dem Säulenwald von Ephesos (Spotlight Beams from above)
      const beamConfigs = [
        { baseX: virtualWidth * 0.18, angleOffset: 0.22, swingAmp: 0.16, speed: 0.0008, widthBottom: 340, color: 'rgba(254, 240, 138, 0.34)' },
        { baseX: virtualWidth * 0.34, angleOffset: 0.09, swingAmp: 0.14, speed: 0.0007, widthBottom: 380, color: 'rgba(255, 255, 255, 0.32)' },
        { baseX: virtualWidth * 0.50, angleOffset: 0.0, swingAmp: 0.12, speed: 0.0006, widthBottom: 420, color: 'rgba(254, 243, 199, 0.38)' },
        { baseX: virtualWidth * 0.66, angleOffset: -0.09, swingAmp: 0.15, speed: 0.0007, widthBottom: 380, color: 'rgba(255, 255, 255, 0.32)' },
        { baseX: virtualWidth * 0.82, angleOffset: -0.22, swingAmp: 0.17, speed: 0.0009, widthBottom: 340, color: 'rgba(254, 240, 138, 0.34)' }
      ];
      for (let cfg of beamConfigs) {
        this.weatherParticles.push({
          baseX: cfg.baseX,
          baseY: -30,
          currentAngle: cfg.angleOffset,
          angleOffset: cfg.angleOffset,
          swingAmp: cfg.swingAmp,
          speed: cfg.speed,
          phase: Math.random() * Math.PI * 2,
          length: screenHeight * 1.45,
          widthTop: cfg.widthBottom,
          color: cfg.color,
          fromAbove: true,
          type: 'spotlightBeamArtemis'
        });
      }
      // 2. Im Scheinwerferlicht leuchtende Tempelpartikel (Illuminated Temple Dust Motes drifting down)
      for (let i = 0; i < 40; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: (Math.random() - 0.48) * 0.45,
          vy: 0.22 + Math.random() * 0.45,
          size: 1.8 + Math.random() * 2.8,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.03 + Math.random() * 0.06,
          color: Math.random() > 0.35 ? 'rgba(254, 240, 138, 0.92)' : 'rgba(255, 255, 255, 0.92)',
          type: 'spotlightMoteArtemis'
        });
      }
    } else if (theme === 'chichen_itza') {
      // 1. Tropische Dschungelblätter fallen von den Bäumen (Jungle Canopy Falling Leaves)
      const jungleLeafColors = [
        '#059669', '#10b981', '#34d399', '#65a30d', '#84cc16', 
        '#a3e635', '#047857', '#065f46', '#eab308', '#ca8a04'
      ];
      for (let i = 0; i < 65; i++) {
        this.weatherParticles.push({
          x: Math.random() * (virtualWidth + 100) - 50,
          y: Math.random() * (screenHeight + 100) - 50,
          vx: 0.35 + Math.random() * 0.65,
          vy: 0.85 + Math.random() * 1.35,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: 0.025 + Math.random() * 0.045,
          wobbleAmp: 1.2 + Math.random() * 2.2,
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.05,
          size: 6 + Math.random() * 9,
          aspect: 0.45 + Math.random() * 0.35,
          opacity: 0.70 + Math.random() * 0.30,
          color: jungleLeafColors[Math.floor(Math.random() * jungleLeafColors.length)],
          type: 'chichenJungleLeaf'
        });
      }
      // 2. Schwebende Dschungel-Lichtmotes / Pollen (Sunlit Jungle Spores / Golden Motes)
      for (let i = 0; i < 35; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: (Math.random() - 0.48) * 0.4,
          vy: -0.2 - Math.random() * 0.35,
          size: 1.5 + Math.random() * 2.5,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.03 + Math.random() * 0.05,
          color: Math.random() > 0.4 ? 'rgba(217, 249, 157, 0.9)' : 'rgba(254, 240, 138, 0.9)',
          type: 'chichenJungleMote'
        });
      }
    } else if (theme === 'christ_redeemer_rio') {
      // 1. Sanfte, luftig-leichte Wolken ziehen über den Corcovado und Rio vorbei (Less dense, airy drifting clouds)
      for (let i = 0; i < 20; i++) {
        const baseRadius = 45 + Math.random() * 45;
        this.weatherParticles.push({
          x: Math.random() * (virtualWidth + 800) - 400,
          y: screenHeight * 0.05 + Math.random() * (screenHeight * 0.52),
          vx: 0.45 + Math.random() * 0.75,
          scale: 0.75 + Math.random() * 0.75,
          opacity: 0.28 + Math.random() * 0.24, // Zart und transparent (weniger dicht)
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: 0.01 + Math.random() * 0.02,
          lobes: [
            { dx: 0, dy: 0, r: baseRadius },
            { dx: -baseRadius * 0.7, dy: baseRadius * 0.15, r: baseRadius * 0.78 },
            { dx: baseRadius * 0.7, dy: baseRadius * 0.15, r: baseRadius * 0.8 },
            { dx: -baseRadius * 1.25, dy: baseRadius * 0.35, r: baseRadius * 0.62 },
            { dx: baseRadius * 1.25, dy: baseRadius * 0.35, r: baseRadius * 0.65 },
            { dx: -baseRadius * 0.35, dy: -baseRadius * 0.35, r: baseRadius * 0.7 },
            { dx: baseRadius * 0.35, dy: -baseRadius * 0.35, r: baseRadius * 0.72 }
          ],
          type: 'denseDriftingCloudRio'
        });
      }
      // 2. Feine tropische Bergnebel- und Meeresbrisen-Motes (Light Tropical Mountain Mist)
      for (let i = 0; i < 20; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: 0.25 + Math.random() * 0.45,
          vy: (Math.random() - 0.48) * 0.25,
          size: 1.8 + Math.random() * 2.8,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.03 + Math.random() * 0.05,
          color: Math.random() > 0.4 ? 'rgba(255, 255, 255, 0.65)' : 'rgba(224, 242, 254, 0.65)',
          type: 'rioMountainMist'
        });
      }
    } else if (theme === 'great_wall_china') {
      // 1. Gelegentliche, dezente Blitze rundherum (Subtle, occasional lightning strikes)
      for (let i = 0; i < 2; i++) {
        this.weatherParticles.push({
          type: 'greatWallLightning',
          state: 'dormant',
          timer: 180 + Math.floor(Math.random() * 240) + i * 220,
          segments: [],
          strikeAge: 0,
          strikeDuration: 0,
          originXRatio: 0.2 + i * 0.55 + (Math.random() - 0.5) * 0.08,
          color: i % 2 === 0 ? '#bae6fd' : '#fef08a'
        });
      }
      // 2. Grüne / nebelverhangene Bergketten-Nebelschleier (Mountain mist wisps)
      for (let i = 0; i < 18; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: screenHeight * 0.12 + Math.random() * (screenHeight * 0.65),
          vx: 0.35 + Math.random() * 0.45,
          vy: (Math.random() - 0.48) * 0.12,
          sizeX: 110 + Math.random() * 150,
          sizeY: 32 + Math.random() * 40,
          opacity: 0.18 + Math.random() * 0.18,
          pulse: Math.random() * Math.PI * 2,
          type: 'greatWallMist'
        });
      }
      // 3. Elektrisierende Gewitterfunken & Berg-Motes rundherum (Ionized atmosphere sparks)
      for (let i = 0; i < 28; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: (Math.random() - 0.48) * 0.5,
          vy: -0.2 - Math.random() * 0.4,
          size: 1.6 + Math.random() * 2.6,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.04 + Math.random() * 0.07,
          color: Math.random() > 0.4 ? 'rgba(186, 230, 253, 0.9)' : 'rgba(254, 240, 138, 0.9)',
          type: 'greatWallSpark'
        });
      }
    } else if (theme === 'machu_picchu') {
      // Reiner Anden-Regen ohne Wolken (Pure rain without clouds)
      for (let i = 0; i < 125; i++) {
        this.weatherParticles.push({
          x: Math.random() * (virtualWidth + 600) - 100,
          y: Math.random() * screenHeight,
          vx: -2.2 - Math.random() * 2.8,
          vy: 9.5 + Math.random() * 6.5,
          len: 18 + Math.random() * 16,
          width: 1.2 + Math.random() * 1.2,
          opacity: 0.35 + Math.random() * 0.45,
          type: 'rain'
        });
      }
    } else if (theme === 'petra_jordan') {
      // 1. Peitschende Sandkörner & Wüstenkörner des mächtigen Sandsturms (Mighty Sandstorm Grains)
      for (let i = 0; i < 140; i++) {
        this.weatherParticles.push({
          x: Math.random() * (virtualWidth + 400) - 200,
          y: Math.random() * screenHeight,
          vx: 7.5 + Math.random() * 8.5,
          vy: (Math.random() - 0.42) * 2.2,
          len: 12 + Math.random() * 16,
          width: 1.2 + Math.random() * 1.6,
          color: ['#fef08a', '#fde047', '#f59e0b', '#d97706', '#fca5a5', '#e2a58b'][Math.floor(Math.random() * 6)],
          opacity: 0.35 + Math.random() * 0.45,
          type: 'petraSandGrain'
        });
      }
      // 2. Feine, transparente durchwehende Sandsturmschleier & Staubwirbel (Subtle Transparent Dust Storm Veils)
      for (let i = 0; i < 14; i++) {
        this.weatherParticles.push({
          x: Math.random() * (virtualWidth + 600) - 300,
          y: Math.random() * screenHeight,
          vx: 4.8 + Math.random() * 4.8,
          vy: (Math.random() - 0.5) * 0.4,
          sizeX: 180 + Math.random() * 160,
          sizeY: 65 + Math.random() * 55,
          color: Math.random() > 0.4 ? 'rgba(245, 158, 11, ' : 'rgba(251, 191, 36, ',
          opacity: 0.05 + Math.random() * 0.05,
          pulse: Math.random() * Math.PI * 2,
          type: 'petraSandGust'
        });
      }
    } else if (theme === 'statue_of_liberty') {
      // Kleine Funken leuchten manchmal dort und da auf (Subtle Sparkles Lighting Up Here and There)
      const sparkleColors = ['#ffffff', '#fef08a', '#fde047', '#fed7aa', '#bae6fd'];
      for (let i = 0; i < 48; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: (Math.random() - 0.5) * 0.15,
          vy: -0.08 - Math.random() * 0.14,
          state: Math.random() > 0.65 ? 'sparking' : 'dormant',
          timer: Math.floor(Math.random() * 120),
          age: 0,
          maxAge: 40 + Math.floor(Math.random() * 55),
          size: 2.0 + Math.random() * 2.8,
          color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
          type: 'libertySparkle'
        });
      }
    } else if (theme === 'eiffel_tower_paris') {
      // 1. Ausschließlich der rotierende Leuchtturm-Suchscheinwerfer an der Eiffelturm-Spitze (keine weiteren Scheinwerfer)
      const eiffelBeams = [
        { baseX: 1460, baseY: screenHeight * 0.12, angleOffset: 0.20, swingAmp: 0.38, speed: 0.0012, widthBottom: 450, color: 'rgba(254, 240, 138, 0.44)' },
        { baseX: 1460, baseY: screenHeight * 0.12, angleOffset: -0.20, swingAmp: 0.35, speed: 0.0011, widthBottom: 420, color: 'rgba(255, 255, 255, 0.38)' }
      ];
      for (let cfg of eiffelBeams) {
        this.weatherParticles.push({
          baseX: cfg.baseX,
          baseY: cfg.baseY,
          currentAngle: cfg.angleOffset,
          angleOffset: cfg.angleOffset,
          swingAmp: cfg.swingAmp,
          speed: cfg.speed,
          phase: Math.random() * Math.PI * 2,
          length: screenHeight * 1.5,
          widthTop: cfg.widthBottom,
          color: cfg.color,
          fromAbove: true,
          type: 'eiffelSpotlightBeam'
        });
      }
      // 2. Im Scheinwerferlicht tanzende Pariser Licht- & Staubpartikel (Illuminated Parisian Light Motes)
      for (let i = 0; i < 45; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: (Math.random() - 0.48) * 0.4,
          vy: 0.18 + Math.random() * 0.42,
          size: 1.8 + Math.random() * 2.8,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.03 + Math.random() * 0.06,
          color: Math.random() > 0.35 ? 'rgba(254, 240, 138, 0.92)' : 'rgba(255, 255, 255, 0.92)',
          type: 'eiffelLightMote'
        });
      }
    } else if (theme === 'stonehenge') {
      // Dichter mystischer Nebel zieht vorbei (Dense mystical drifting fog & mist banks across Stonehenge)
      // 1. Grosse dichte Nebelbänke (Dense wide drifting fog banks)
      for (let i = 0; i < 28; i++) {
        this.weatherParticles.push({
          x: Math.random() * (virtualWidth + 600) - 300,
          y: Math.random() * screenHeight,
          vx: 0.75 + Math.random() * 0.95,
          vy: (Math.random() - 0.5) * 0.12,
          sizeX: 260 + Math.random() * 280,
          sizeY: 70 + Math.random() * 85,
          opacity: 0.10 + Math.random() * 0.13,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.008 + Math.random() * 0.014,
          color: Math.random() > 0.4 ? 'rgba(226, 232, 240, ' : 'rgba(203, 213, 225, ',
          type: 'stonehengeDenseFog'
        });
      }
      // 2. Feine, schwebende Nebelschleier & Dunstschwaden (Delicate drifting mist wisps)
      for (let i = 0; i < 35; i++) {
        this.weatherParticles.push({
          x: Math.random() * (virtualWidth + 600) - 300,
          y: Math.random() * screenHeight,
          vx: 1.1 + Math.random() * 1.3,
          vy: (Math.random() - 0.5) * 0.18,
          sizeX: 140 + Math.random() * 150,
          sizeY: 35 + Math.random() * 45,
          opacity: 0.08 + Math.random() * 0.10,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.012 + Math.random() * 0.020,
          color: 'rgba(241, 245, 249, ',
          type: 'stonehengeMistWisp'
        });
      }
    } else if (theme === 'leaning_tower_pisa') {
      // Erfrischender toskanischer Regen über der Piazza dei Miracoli (Refreshing Tuscan rain)
      for (let i = 0; i < 115; i++) {
        this.weatherParticles.push({
          x: Math.random() * (virtualWidth + 400) - 100,
          y: Math.random() * screenHeight,
          vx: -1.8 - Math.random() * 2.2,
          vy: 9.2 + Math.random() * 6.0,
          len: 16 + Math.random() * 15,
          width: 1.2 + Math.random() * 1.1,
          opacity: 0.35 + Math.random() * 0.40,
          type: 'rain'
        });
      }
    } else if (theme === 'easter_island_moai') {
      // Einige Blitze von oben am stürmischen Himmel über den Moai-Statuen (Occasional lightning strikes from above)
      for (let i = 0; i < 2; i++) {
        this.weatherParticles.push({
          type: 'easterIslandLightning',
          state: 'dormant',
          timer: 140 + Math.floor(Math.random() * 220) + i * 180,
          segments: [],
          strikeAge: 0,
          strikeDuration: 0,
          originXRatio: 0.25 + i * 0.50 + (Math.random() - 0.5) * 0.15,
          color: i % 2 === 0 ? '#bae6fd' : '#fef08a'
        });
      }
      // Sanfter stürmischer Pazifik-Gischt-Dunst über den Klippen (Ocean spray mist)
      for (let i = 0; i < 16; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: screenHeight * 0.45 + Math.random() * (screenHeight * 0.48),
          vx: 1.2 + Math.random() * 1.5,
          vy: (Math.random() - 0.5) * 0.25,
          sizeX: 130 + Math.random() * 140,
          sizeY: 35 + Math.random() * 40,
          opacity: 0.08 + Math.random() * 0.09,
          pulse: Math.random() * Math.PI * 2,
          type: 'easterIslandMist'
        });
      }
    } else if (theme === 'tower_bridge_london') {
      // Majestätische Scheinwerferlicht-Strahler über der Tower Bridge & Themse (London Searchlights across the Night Sky)
      const londonBeams = [
        { baseX: 480, baseY: screenHeight * 0.96, angleOffset: -0.28, swingAmp: 0.32, speed: 0.0009, widthBottom: 440, color: 'rgba(254, 240, 138, 0.40)' },
        { baseX: 920, baseY: screenHeight * 0.90, angleOffset: -0.12, swingAmp: 0.28, speed: 0.0011, widthBottom: 420, color: 'rgba(255, 255, 255, 0.36)' },
        { baseX: 1480, baseY: screenHeight * 0.90, angleOffset: 0.12, swingAmp: 0.28, speed: 0.0010, widthBottom: 420, color: 'rgba(254, 240, 138, 0.38)' },
        { baseX: 1940, baseY: screenHeight * 0.96, angleOffset: 0.28, swingAmp: 0.34, speed: 0.0008, widthBottom: 450, color: 'rgba(255, 255, 255, 0.34)' }
      ];
      for (let cfg of londonBeams) {
        this.weatherParticles.push({
          baseX: cfg.baseX,
          baseY: cfg.baseY,
          currentAngle: cfg.angleOffset,
          angleOffset: cfg.angleOffset,
          swingAmp: cfg.swingAmp,
          speed: cfg.speed,
          phase: Math.random() * Math.PI * 2,
          length: screenHeight * 1.6,
          widthTop: cfg.widthBottom,
          color: cfg.color,
          fromAbove: false,
          type: 'towerBridgeSpotlightBeam'
        });
      }
      // Im Scheinwerferlicht tanzende Londoner Licht- & Nebelpartikel (Light motes dancing in searchlight beams)
      for (let i = 0; i < 48; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: (Math.random() - 0.48) * 0.35,
          vy: -0.15 - Math.random() * 0.35,
          size: 1.8 + Math.random() * 2.8,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.05,
          color: Math.random() > 0.4 ? 'rgba(254, 240, 138, 0.90)' : 'rgba(255, 255, 255, 0.90)',
          type: 'towerBridgeLightMote'
        });
      }
      // Typischer Londoner Nachtregen im Scheinwerferlicht (Atmospheric London rain falling through searchlights)
      for (let i = 0; i < 115; i++) {
        this.weatherParticles.push({
          x: Math.random() * (virtualWidth + 400) - 100,
          y: Math.random() * screenHeight,
          vx: -1.8 - Math.random() * 2.2,
          vy: 9.2 + Math.random() * 6.0,
          len: 16 + Math.random() * 15,
          width: 1.2 + Math.random() * 1.1,
          opacity: 0.35 + Math.random() * 0.40,
          type: 'rain'
        });
      }
    } else if (theme === 'grazer_uhrturm') {
      // Schöne weiße Wolken ziehen am Himmel über Graz & dem Schlossberg vorbei (kein Nebel)
      for (let i = 0; i < 24; i++) {
        const baseRadius = 38 + Math.random() * 44;
        this.weatherParticles.push({
          x: Math.random() * (virtualWidth + 900) - 450,
          y: screenHeight * 0.02 + Math.random() * (screenHeight * 0.42),
          vx: 0.95 + Math.random() * 1.15, // Natürliches, gleichmäßiges Vorbeiziehen der Wolken
          scale: 0.75 + Math.random() * 0.85,
          opacity: 0.75 + Math.random() * 0.22, // Weiße, gut sichtbare Wolken
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: 0.008 + Math.random() * 0.015,
          lobes: [
            { dx: 0, dy: 0, r: baseRadius },
            { dx: -baseRadius * 0.72, dy: baseRadius * 0.12, r: baseRadius * 0.78 },
            { dx: baseRadius * 0.72, dy: baseRadius * 0.12, r: baseRadius * 0.80 },
            { dx: -baseRadius * 1.30, dy: baseRadius * 0.28, r: baseRadius * 0.60 },
            { dx: baseRadius * 1.30, dy: baseRadius * 0.28, r: baseRadius * 0.62 },
            { dx: -baseRadius * 0.36, dy: -baseRadius * 0.35, r: baseRadius * 0.72 },
            { dx: baseRadius * 0.36, dy: -baseRadius * 0.35, r: baseRadius * 0.74 }
          ],
          type: 'grazerUhrturmCloud'
        });
      }
    } else if (theme === 'im_weltall') {
      // 1. Sterne fliegen dem Spieler mit hoher Geschwindigkeit im 3D-Hyperspace entgegen
      for (let i = 0; i < 115; i++) {
        this.weatherParticles.push({
          x: (Math.random() - 0.5) * virtualWidth * 1.6,
          y: (Math.random() - 0.5) * screenHeight * 1.6,
          z: Math.random() * 1000 + 15,
          speed: 3.8 + Math.random() * 4.8,
          baseSize: 1.3 + Math.random() * 2.2,
          color: Math.random() > 0.35 ? '#ffffff' : (Math.random() > 0.5 ? '#93c5fd' : '#fef08a'),
          type: 'incomingWarpStar'
        });
      }
      // 2. Funkelnder kosmischer Sternenstaub
      for (let i = 0; i < 40; i++) {
        this.weatherParticles.push({
          x: Math.random() * virtualWidth,
          y: Math.random() * screenHeight,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.025 + Math.random() * 0.035,
          size: 2.0 + Math.random() * 3.5,
          color: Math.random() > 0.4 ? '#38bdf8' : (Math.random() > 0.5 ? '#f472b6' : '#c084fc'),
          type: 'cosmicDustGlow'
        });
      }
    } else if (theme === 'wien') {
      // Dichter, prasselnder Wiener Schnürlregen (Mehrschichtiges Regensystem mit 450 Tropfen)
      // 1. Vordergrund: Kräftige, schnelle Regenfäden
      for (let i = 0; i < 120; i++) {
        this.weatherParticles.push({
          x: Math.random() * (virtualWidth + 600) - 100,
          y: Math.random() * screenHeight,
          vx: -2.0 - Math.random() * 2.5,
          vy: 14.0 + Math.random() * 8.0,
          len: 28 + Math.random() * 16,
          width: 1.8 + Math.random() * 1.0,
          opacity: 0.55 + Math.random() * 0.35,
          type: 'rain'
        });
      }
      // 2. Mittelgrund: Dichter Schnürlregen
      for (let i = 0; i < 200; i++) {
        this.weatherParticles.push({
          x: Math.random() * (virtualWidth + 600) - 100,
          y: Math.random() * screenHeight,
          vx: -1.6 - Math.random() * 2.0,
          vy: 11.0 + Math.random() * 6.0,
          len: 20 + Math.random() * 12,
          width: 1.3 + Math.random() * 0.7,
          opacity: 0.40 + Math.random() * 0.35,
          type: 'rain'
        });
      }
      // 3. Hintergrund: Feine, dichte Regenschleier
      for (let i = 0; i < 130; i++) {
        this.weatherParticles.push({
          x: Math.random() * (virtualWidth + 600) - 100,
          y: Math.random() * screenHeight,
          vx: -1.2 - Math.random() * 1.6,
          vy: 9.0 + Math.random() * 5.0,
          len: 14 + Math.random() * 10,
          width: 0.9 + Math.random() * 0.5,
          opacity: 0.30 + Math.random() * 0.30,
          type: 'rain'
        });
      }
    } else if (theme === 'mohnblumen') {
      // Rote Mohnblüten-Blätter fallen sanft taumelnd von oben herab
      for (let i = 0; i < 95; i++) {
        this.weatherParticles.push({
          x: Math.random() * (virtualWidth + 300) - 100,
          y: Math.random() * screenHeight,
          vy: 1.3 + Math.random() * 1.8,
          vx: 0.4 + Math.random() * 0.8,
          rot: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.05,
          swingPhase: Math.random() * Math.PI * 2,
          swingSpeed: 0.02 + Math.random() * 0.03,
          size: 7 + Math.random() * 8,
          color: Math.random() > 0.45 ? '#ef4444' : (Math.random() > 0.5 ? '#dc2626' : '#b91c1c'),
          opacity: 0.75 + Math.random() * 0.22,
          type: 'mohnblumenRedPetal'
        });
      }
    } else if (theme === 'die_burg') {
      // Mächtiger Sandsturm über der Burg (Peitschende Sandkörner & schwere Sandböen)
      // 1. Peitschende Sandkörner & Wüstenpartikel
      for (let i = 0; i < 165; i++) {
        this.weatherParticles.push({
          x: Math.random() * (virtualWidth + 500) - 200,
          y: Math.random() * screenHeight,
          vx: 8.5 + Math.random() * 9.5,
          vy: (Math.random() - 0.40) * 2.4,
          len: 14 + Math.random() * 18,
          width: 1.3 + Math.random() * 1.8,
          color: ['#fef08a', '#fde047', '#f59e0b', '#d97706', '#d4a373', '#e2a58b', '#fed7aa'][Math.floor(Math.random() * 7)],
          opacity: 0.40 + Math.random() * 0.45,
          type: 'petraSandGrain'
        });
      }
      // 2. Durchwehende Sandsturmschleier & dichte Staubwirbel
      for (let i = 0; i < 18; i++) {
        this.weatherParticles.push({
          x: Math.random() * (virtualWidth + 600) - 300,
          y: Math.random() * screenHeight,
          vx: 5.5 + Math.random() * 5.5,
          vy: (Math.random() - 0.5) * 0.5,
          sizeX: 200 + Math.random() * 180,
          sizeY: 75 + Math.random() * 65,
          color: Math.random() > 0.4 ? 'rgba(245, 158, 11, ' : 'rgba(217, 119, 6, ',
          opacity: 0.06 + Math.random() * 0.06,
          pulse: Math.random() * Math.PI * 2,
          type: 'petraSandGust'
        });
      }
    } else if (theme === 'toskana') {
      // 1. Verstärkter toskanischer Regen (mehr Regen in 3 Ebenen)
      // Vordergrund: Kräftige, schnelle Tropfen
      for (let i = 0; i < 130; i++) {
        this.weatherParticles.push({
          x: Math.random() * (virtualWidth + 600) - 100,
          y: Math.random() * screenHeight,
          vx: -1.8 - Math.random() * 2.2,
          vy: 14.0 + Math.random() * 8.0,
          len: 28 + Math.random() * 16,
          width: 1.8 + Math.random() * 1.0,
          opacity: 0.55 + Math.random() * 0.35,
          type: 'rain'
        });
      }
      // Mittelgrund: Dichter, stetiger Landregen
      for (let i = 0; i < 200; i++) {
        this.weatherParticles.push({
          x: Math.random() * (virtualWidth + 600) - 100,
          y: Math.random() * screenHeight,
          vx: -1.5 - Math.random() * 1.8,
          vy: 11.0 + Math.random() * 6.0,
          len: 20 + Math.random() * 12,
          width: 1.3 + Math.random() * 0.7,
          opacity: 0.42 + Math.random() * 0.32,
          type: 'rain'
        });
      }
      // Hintergrund: Feine, dichte Regenschleier über den Zypressenhügeln
      for (let i = 0; i < 140; i++) {
        this.weatherParticles.push({
          x: Math.random() * (virtualWidth + 600) - 100,
          y: Math.random() * screenHeight,
          vx: -1.1 - Math.random() * 1.5,
          vy: 9.0 + Math.random() * 5.0,
          len: 14 + Math.random() * 10,
          width: 0.9 + Math.random() * 0.5,
          opacity: 0.30 + Math.random() * 0.25,
          type: 'rain'
        });
      }
      // 2. Weiße Wolken ziehen oben am toskanischen Himmel vorbei (wolken ziehen oben vorbei)
      for (let i = 0; i < 20; i++) {
        const baseRadius = 36 + Math.random() * 42;
        this.weatherParticles.push({
          x: Math.random() * (virtualWidth + 900) - 450,
          y: screenHeight * 0.02 + Math.random() * (screenHeight * 0.28),
          vx: 0.85 + Math.random() * 1.05,
          scale: 0.70 + Math.random() * 0.80,
          opacity: 0.28 + Math.random() * 0.16, // Deutlich durchsichtiger / transparenter
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: 0.008 + Math.random() * 0.015,
          lobes: [
            { dx: 0, dy: 0, r: baseRadius },
            { dx: -baseRadius * 0.72, dy: baseRadius * 0.12, r: baseRadius * 0.78 },
            { dx: baseRadius * 0.72, dy: baseRadius * 0.12, r: baseRadius * 0.80 },
            { dx: -baseRadius * 1.30, dy: baseRadius * 0.28, r: baseRadius * 0.60 },
            { dx: baseRadius * 1.30, dy: baseRadius * 0.28, r: baseRadius * 0.62 },
            { dx: -baseRadius * 0.36, dy: -baseRadius * 0.35, r: baseRadius * 0.72 },
            { dx: baseRadius * 0.36, dy: -baseRadius * 0.35, r: baseRadius * 0.74 }
          ],
          type: 'grazerUhrturmCloud'
        });
      }
    } else if (theme === 'herbst') {
      // Bunte Blätter fallen von den Bäumen (Ahorn-, Eichen- und Birkenblätter in kräftigen Herbstfarben)
      const autumnColors = [
        '#dc2626', '#b91c1c', '#ea580c', '#f97316', '#f59e0b',
        '#eab308', '#facc15', '#d97706', '#ca8a04', '#92400e', '#78350f'
      ];
      for (let i = 0; i < 155; i++) {
        this.weatherParticles.push({
          x: Math.random() * (virtualWidth + 300) - 100,
          y: Math.random() * screenHeight,
          vx: 0.5 + Math.random() * 1.5,
          vy: 1.2 + Math.random() * 2.2,
          swingPhase: Math.random() * Math.PI * 2,
          swingSpeed: 0.02 + Math.random() * 0.035,
          swingAmp: 1.2 + Math.random() * 1.6,
          rot: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.05,
          tiltPhase: Math.random() * Math.PI * 2,
          tiltSpeed: 0.025 + Math.random() * 0.04,
          size: 8 + Math.random() * 11,
          shape: Math.floor(Math.random() * 3), // 0: Ahorn, 1: Eiche, 2: Oval/Birke
          color: autumnColors[Math.floor(Math.random() * autumnColors.length)],
          opacity: 0.72 + Math.random() * 0.26,
          type: 'herbstAutumnLeaf'
        });
      }
    } else if (theme === 'schneefall') {
      // Dichter, malerischer Schneefall in 3 Tiefenebenen
      // 1. Vordergrund: Große, flauschige Schneeflocken & Eiskristalle
      for (let i = 0; i < 65; i++) {
        this.weatherParticles.push({
          x: Math.random() * (virtualWidth + 300) - 100,
          y: Math.random() * screenHeight,
          vx: 0.6 + Math.random() * 1.2,
          vy: 2.4 + Math.random() * 2.0,
          size: 4.5 + Math.random() * 3.5,
          swingPhase: Math.random() * Math.PI * 2,
          swingSpeed: 0.025 + Math.random() * 0.035,
          swingAmp: 1.6 + Math.random() * 1.4,
          rot: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.04,
          opacity: 0.85 + Math.random() * 0.15,
          isCrystal: Math.random() > 0.45,
          type: 'schneefallFlake'
        });
      }
      // 2. Mittelgrund: Dicht tanzender Schneefall
      for (let i = 0; i < 170; i++) {
        this.weatherParticles.push({
          x: Math.random() * (virtualWidth + 300) - 100,
          y: Math.random() * screenHeight,
          vx: 0.4 + Math.random() * 0.8,
          vy: 1.6 + Math.random() * 1.4,
          size: 2.6 + Math.random() * 1.8,
          swingPhase: Math.random() * Math.PI * 2,
          swingSpeed: 0.02 + Math.random() * 0.03,
          swingAmp: 1.0 + Math.random() * 1.0,
          rot: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.03,
          opacity: 0.70 + Math.random() * 0.25,
          isCrystal: false,
          type: 'schneefallFlake'
        });
      }
      // 3. Hintergrund: Feine glitzernde Schneeschleier
      for (let i = 0; i < 185; i++) {
        this.weatherParticles.push({
          x: Math.random() * (virtualWidth + 300) - 100,
          y: Math.random() * screenHeight,
          vx: 0.2 + Math.random() * 0.6,
          vy: 1.0 + Math.random() * 1.0,
          size: 1.2 + Math.random() * 1.2,
          swingPhase: Math.random() * Math.PI * 2,
          swingSpeed: 0.015 + Math.random() * 0.025,
          swingAmp: 0.5 + Math.random() * 0.8,
          rot: 0,
          vRot: 0,
          opacity: 0.45 + Math.random() * 0.30,
          isCrystal: false,
          type: 'schneefallFlake'
        });
      }
    } else if (theme === 'china') {
      // 1. Wolken im oberen Bereich
      for (let i = 0; i < 22; i++) {
        const baseRadius = 38 + Math.random() * 45;
        this.weatherParticles.push({
          x: Math.random() * (virtualWidth + 900) - 450,
          y: screenHeight * 0.02 + Math.random() * (screenHeight * 0.22),
          vx: 0.65 + Math.random() * 0.85,
          scale: 0.75 + Math.random() * 0.85,
          opacity: 0.42 + Math.random() * 0.28,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: 0.008 + Math.random() * 0.015,
          lobes: [
            { dx: 0, dy: 0, r: baseRadius },
            { dx: -baseRadius * 0.72, dy: baseRadius * 0.12, r: baseRadius * 0.78 },
            { dx: baseRadius * 0.72, dy: baseRadius * 0.12, r: baseRadius * 0.80 },
            { dx: -baseRadius * 1.30, dy: baseRadius * 0.28, r: baseRadius * 0.60 },
            { dx: baseRadius * 1.30, dy: baseRadius * 0.28, r: baseRadius * 0.62 },
            { dx: -baseRadius * 0.36, dy: -baseRadius * 0.35, r: baseRadius * 0.72 },
            { dx: baseRadius * 0.36, dy: -baseRadius * 0.35, r: baseRadius * 0.74 }
          ],
          type: 'chinaCloud'
        });
      }

      // 2. Wenige Blitze rundherum (3 gestaffelte Blitz-Generatoren)
      for (let i = 0; i < 3; i++) {
        this.weatherParticles.push({
          state: 'dormant',
          timer: 90 + i * 160 + Math.floor(Math.random() * 120),
          strikeAge: 0,
          strikeDuration: 6,
          segments: [],
          type: 'chinaLightning'
        });
      }

      // 3. Regen über der chinesischen Gebirgslandschaft (in 3 Tiefenebenen)
      // Vordergrund: Kräftige Gewitter-Regentropfen
      for (let i = 0; i < 120; i++) {
        this.weatherParticles.push({
          x: Math.random() * (virtualWidth + 600) - 100,
          y: Math.random() * screenHeight,
          vx: -1.8 - Math.random() * 2.2,
          vy: 14.0 + Math.random() * 8.0,
          len: 28 + Math.random() * 16,
          width: 1.8 + Math.random() * 1.0,
          opacity: 0.55 + Math.random() * 0.35,
          type: 'rain'
        });
      }
      // Mittelgrund: Dichter Gebirgsregen
      for (let i = 0; i < 200; i++) {
        this.weatherParticles.push({
          x: Math.random() * (virtualWidth + 600) - 100,
          y: Math.random() * screenHeight,
          vx: -1.5 - Math.random() * 1.8,
          vy: 11.0 + Math.random() * 6.0,
          len: 20 + Math.random() * 12,
          width: 1.3 + Math.random() * 0.7,
          opacity: 0.42 + Math.random() * 0.32,
          type: 'rain'
        });
      }
      // Hintergrund: Feine Regenschleier über den Karstfelsen
      for (let i = 0; i < 140; i++) {
        this.weatherParticles.push({
          x: Math.random() * (virtualWidth + 600) - 100,
          y: Math.random() * screenHeight,
          vx: -1.1 - Math.random() * 1.5,
          vy: 9.0 + Math.random() * 5.0,
          len: 14 + Math.random() * 10,
          width: 0.9 + Math.random() * 0.5,
          opacity: 0.30 + Math.random() * 0.25,
          type: 'rain'
        });
      }
    }
  }

  update(virtualWidth, screenHeight) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;

      if (p.type === 'feather') {
        p.vy += 0.15;
        p.vx *= 0.98;
        p.rotation += p.vRot;
      } else if (p.type === 'smoke') {
        p.size += 0.4;
      }

      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }

    for (let i = this.scorePopups.length - 1; i >= 0; i--) {
      const pop = this.scorePopups[i];
      pop.y += pop.vy;
      pop.life -= pop.decay;
      if (pop.scale > 1.0) {
        pop.scale -= 0.04;
      }
      if (pop.life <= 0) {
        this.scorePopups.splice(i, 1);
      }
    }

    for (let wp of this.weatherParticles) {
      if (wp.type === 'rain') {
        wp.x += wp.vx;
        wp.y += wp.vy;
        if (wp.y > screenHeight + 30 || wp.x < -40) {
          wp.y = -30;
          wp.x = Math.random() * (virtualWidth + 500);
        }
      } else if (wp.type === 'snow') {
        wp.y += wp.vy;
        wp.x += Math.sin(wp.y * 0.02) * 0.5;
        if (wp.y > screenHeight) wp.y = -10;
        if (wp.x > virtualWidth) wp.x = 0;
      } else if (wp.type === 'leaf' || wp.type === 'petal') {
        wp.y += wp.vy;
        wp.x += Math.sin(wp.y * 0.03) * 0.8;
        wp.rot += wp.vRot;
        if (wp.y > screenHeight) wp.y = -10;
        if (wp.x > virtualWidth) wp.x = 0;
      } else if (wp.type === 'mohnblumenRedPetal') {
        wp.swingPhase += wp.swingSpeed;
        wp.y += wp.vy;
        wp.x += wp.vx + Math.sin(wp.swingPhase) * 1.5;
        wp.rot += wp.vRot;
        if (wp.y > screenHeight + 25) {
          wp.y = -25;
          wp.x = Math.random() * (virtualWidth + 200) - 100;
        }
        if (wp.x < -40) wp.x = virtualWidth + 40;
        if (wp.x > virtualWidth + 40) wp.x = -40;
      } else if (wp.type === 'herbstAutumnLeaf') {
        wp.swingPhase += wp.swingSpeed;
        wp.tiltPhase += wp.tiltSpeed;
        wp.y += wp.vy;
        wp.x += wp.vx + Math.sin(wp.swingPhase) * wp.swingAmp;
        wp.rot += wp.vRot;
        if (wp.y > screenHeight + 30) {
          wp.y = -30;
          wp.x = Math.random() * (virtualWidth + 200) - 100;
        }
        if (wp.x < -50) wp.x = virtualWidth + 50;
        if (wp.x > virtualWidth + 50) wp.x = -50;
      } else if (wp.type === 'schneefallFlake') {
        wp.swingPhase += wp.swingSpeed;
        wp.y += wp.vy;
        wp.x += wp.vx + Math.sin(wp.swingPhase) * wp.swingAmp;
        wp.rot += wp.vRot;
        if (wp.y > screenHeight + 20) {
          wp.y = -20;
          wp.x = Math.random() * (virtualWidth + 200) - 100;
        }
        if (wp.x < -40) wp.x = virtualWidth + 40;
        if (wp.x > virtualWidth + 40) wp.x = -40;
      } else if (wp.type === 'chinaCloud') {
        wp.wobble += wp.wobbleSpeed;
        wp.x += wp.vx;
        wp.y += Math.sin(wp.wobble) * 0.12;
        if (wp.x > virtualWidth + 500) {
          wp.x = -500;
          wp.y = screenHeight * 0.02 + Math.random() * (screenHeight * 0.22);
        }
      } else if (wp.type === 'chinaLightning') {
        if (wp.state === 'dormant') {
          wp.timer--;
          if (wp.timer <= 0) {
            wp.state = 'striking';
            wp.strikeAge = 0;
            wp.strikeDuration = 5 + Math.floor(Math.random() * 4);
            // Kurzzeitige helle Überblendung bei Blitzeinschlag
            this.screenFlashAlpha = 0.94 + Math.random() * 0.06;

            // Blitzpfad rundherum am Himmel generieren
            const startX = 60 + Math.random() * (virtualWidth - 120);
            const startY = 8 + Math.random() * (screenHeight * 0.16);
            const targetY = screenHeight * (0.42 + Math.random() * 0.38);
            const segments = [];
            let cx = startX;
            let cy = startY;
            const steps = 14 + Math.floor(Math.random() * 8);
            const dy = (targetY - startY) / steps;

            for (let s = 0; s < steps; s++) {
              const nx = cx + (Math.random() - 0.5) * 56;
              const ny = cy + dy + (Math.random() - 0.5) * 12;
              segments.push({ x1: cx, y1: cy, x2: nx, y2: ny, isBranch: false });

              // Verzweigungen
              if (Math.random() > 0.50 && s > 2 && s < steps - 2) {
                let bx = nx;
                let by = ny;
                const branchLen = 3 + Math.floor(Math.random() * 4);
                const bDir = Math.random() > 0.5 ? 1 : -1;
                for (let b = 0; b < branchLen; b++) {
                  const bnx = bx + bDir * (18 + Math.random() * 26);
                  const bny = by + dy * 0.72 + (Math.random() - 0.5) * 12;
                  segments.push({ x1: bx, y1: by, x2: bnx, y2: bny, isBranch: true });
                  bx = bnx;
                  by = bny;
                }
              }
              cx = nx;
              cy = ny;
            }
            wp.segments = segments;
          }
        } else if (wp.state === 'striking') {
          wp.strikeAge++;
          if (wp.strikeAge >= wp.strikeDuration) {
            wp.state = 'dormant';
            // Wenige Blitze: ca. 5 bis 10 Sekunden Pause bis zum nächsten Einschlag
            wp.timer = 280 + Math.floor(Math.random() * 320);
            wp.segments = [];
          }
        }
      } else if (wp.type === 'butterfly') {
        wp.x += wp.vx + Math.sin(wp.flutter) * 0.8;
        wp.y += wp.vy + Math.cos(wp.flutter * 0.7) * 0.6;
        wp.flutter += 0.12;
        if (wp.x < 0) wp.x = virtualWidth;
        if (wp.x > virtualWidth) wp.x = 0;
        if (wp.y < 0) wp.y = screenHeight * 0.8;
        if (wp.y > screenHeight * 0.8) wp.y = 50;
      } else if (wp.type === 'firefly') {
        wp.x += (Math.random() - 0.5) * 0.6;
        wp.y += (Math.random() - 0.5) * 0.6;
        wp.pulse += 0.08;
      } else if (wp.type === 'bat') {
        wp.x += wp.vx;
        wp.y += Math.sin(wp.x * 0.05) * 1.5;
        if (wp.x < -20) wp.x = virtualWidth + 20;
      } else if (wp.type === 'flyingBird') {
        wp.x += wp.vx;
        wp.y += wp.vy + Math.sin(wp.wingPhase * 0.5) * 0.3;
        wp.wingPhase += wp.wingSpeed;
        if (wp.vx > 0 && wp.x > virtualWidth + 60) {
          wp.x = -60;
          wp.y = 35 + Math.random() * (screenHeight * 0.45);
        } else if (wp.vx < 0 && wp.x < -60) {
          wp.x = virtualWidth + 60;
          wp.y = 35 + Math.random() * (screenHeight * 0.45);
        }
      } else if (wp.type === 'paintDot') {
        if (wp.state === 'dormant') {
          wp.timer--;
          if (wp.timer <= 0) {
            wp.state = 'visible';
            wp.age = 0;
            wp.x = Math.random() * virtualWidth;
            wp.y = Math.random() * screenHeight;
            wp.color = ['#ef4444', '#3b82f6', '#facc15', '#10b981', '#a855f7', '#f97316', '#ec4899', '#06b6d4', '#ffffff'][Math.floor(Math.random() * 9)];
            wp.size = 8 + Math.random() * 14;
            wp.maxAge = 40 + Math.floor(Math.random() * 50);
          }
        } else if (wp.state === 'visible') {
          wp.age++;
          if (wp.age >= wp.maxAge) {
            wp.state = 'dormant';
            wp.timer = 25 + Math.floor(Math.random() * 130);
          }
        }
      } else if (wp.type === 'pixelBit') {
        wp.wobblePhase += wp.wobbleSpeed;
        wp.x += wp.vx + Math.sin(wp.wobblePhase) * 0.6;
        wp.y += wp.vy + Math.cos(wp.wobblePhase * 0.8) * 0.5;

        // Wrap around boundaries
        if (wp.x < -20) wp.x = virtualWidth + 20;
        if (wp.x > virtualWidth + 20) wp.x = -20;
        if (wp.y < -20) wp.y = screenHeight + 20;
        if (wp.y > screenHeight + 20) wp.y = -20;
      } else if (wp.type === 'desertDustMote') {
        wp.pulse += wp.pulseSpeed;
        wp.x += wp.vx + Math.sin(wp.pulse) * 0.4;
        wp.y += wp.vy + Math.cos(wp.pulse * 0.7) * 0.3;

        if (wp.x > virtualWidth + 20) {
          wp.x = -20;
          wp.y = Math.random() * screenHeight;
        }
        if (wp.y < -20) wp.y = screenHeight + 20;
        if (wp.y > screenHeight + 20) wp.y = -20;
      } else if (wp.type === 'incomingSoccerBall') {
        wp.z -= wp.speed;
        wp.rot += wp.vRot;
        if (wp.z <= 25) {
          wp.z = 1000;
          wp.x = (Math.random() - 0.5) * virtualWidth * 1.6;
          wp.y = (Math.random() - 0.4) * screenHeight * 1.4;
          wp.speed = 3.5 + Math.random() * 4.5;
          wp.vRot = (Math.random() - 0.5) * 0.12;
        }
      } else if (wp.type === 'prairieLightning') {
        if (wp.state === 'dormant') {
          wp.timer--;
          if (wp.timer <= 0) {
            wp.state = 'striking';
            wp.strikeAge = 0;
            wp.strikeDuration = 5 + Math.floor(Math.random() * 5);
            // Plötzliche helle Überblendung bei Blitzeinschlag
            this.screenFlashAlpha = 0.88 + Math.random() * 0.12;

            // Blitzpfad mit Verzweigungen über den Himmel generieren
            const startX = 80 + Math.random() * (virtualWidth - 160);
            const startY = 5 + Math.random() * (screenHeight * 0.18);
            const targetY = screenHeight * (0.50 + Math.random() * 0.40);
            const segments = [];
            let cx = startX;
            let cy = startY;
            const steps = 14 + Math.floor(Math.random() * 8);
            const dy = (targetY - startY) / steps;

            for (let s = 0; s < steps; s++) {
              const nx = cx + (Math.random() - 0.5) * 58;
              const ny = cy + dy + (Math.random() - 0.5) * 12;
              segments.push({ x1: cx, y1: cy, x2: nx, y2: ny, isBranch: false });

              // Zusätzliche Blitz-Gabelungen
              if (Math.random() > 0.52 && s > 2 && s < steps - 2) {
                let bx = nx;
                let by = ny;
                const branchLen = 3 + Math.floor(Math.random() * 4);
                const bDir = Math.random() > 0.5 ? 1 : -1;
                for (let b = 0; b < branchLen; b++) {
                  const bnx = bx + bDir * (18 + Math.random() * 26);
                  const bny = by + dy * 0.75 + (Math.random() - 0.5) * 12;
                  segments.push({ x1: bx, y1: by, x2: bnx, y2: bny, isBranch: true });
                  bx = bnx;
                  by = bny;
                }
              }
              cx = nx;
              cy = ny;
            }
            wp.segments = segments;
          }
        } else if (wp.state === 'striking') {
          wp.strikeAge++;
          if (wp.strikeAge >= wp.strikeDuration) {
            wp.state = 'dormant';
            wp.timer = 140 + Math.floor(Math.random() * 220);
            wp.segments = [];
          }
        }
      } else if (wp.type === 'tornadoDebris') {
        wp.x += wp.vx;
        wp.y += wp.vy;
        wp.rot += wp.vRot;
        if (wp.x > virtualWidth + 40) {
          wp.x = -40;
          wp.y = Math.random() * screenHeight;
        }
        if (wp.y > screenHeight + 20) wp.y = -20;
        if (wp.y < -20) wp.y = screenHeight + 20;
      } else if (wp.type === 'romanticRoomFlicker') {
        wp.phase1 += 0.06;
        wp.phase2 += 0.11;
      } else if (wp.type === 'cozyFireplaceEmber') {
        wp.y += wp.vy;
        wp.wobblePhase += 0.05;
        wp.x += wp.vx + Math.sin(wp.wobblePhase) * 0.4;
        wp.pulse += wp.pulseSpeed;

        if (wp.y < screenHeight * 0.15) {
          wp.y = screenHeight * 0.85;
          wp.x = 240 + Math.random() * (virtualWidth * 0.75);
        }
        if (wp.x < 0) wp.x = virtualWidth;
        if (wp.x > virtualWidth) wp.x = 0;
      } else if (wp.type === 'largeComicDot') {
        if (wp.state === 'dormant') {
          wp.timer--;
          if (wp.timer <= 0) {
            wp.state = 'visible';
            wp.age = 0;
            wp.x = Math.random() * virtualWidth;
            wp.y = Math.random() * screenHeight;
            wp.color = ['#ef4444', '#3b82f6', '#facc15', '#10b981', '#a855f7', '#f97316', '#ec4899', '#06b6d4', '#0f172a', '#f43f5e'][Math.floor(Math.random() * 10)];
            wp.size = 26 + Math.random() * 32;
            wp.maxAge = 50 + Math.floor(Math.random() * 60);
          }
        } else if (wp.state === 'visible') {
          wp.age++;
          if (wp.age >= wp.maxAge) {
            wp.state = 'dormant';
            wp.timer = 20 + Math.floor(Math.random() * 100);
          }
        }
      } else if (wp.type === 'venicePigeon') {
        wp.x += wp.vx;
        wp.y += wp.vy + Math.sin(wp.wingPhase * 0.5) * 0.25;
        wp.wingPhase += wp.wingSpeed;

        if (wp.vx > 0 && wp.x > virtualWidth + 70) {
          wp.x = -70;
          wp.y = 25 + Math.random() * (screenHeight * 0.55);
        } else if (wp.vx < 0 && wp.x < -70) {
          wp.x = virtualWidth + 70;
          wp.y = 25 + Math.random() * (screenHeight * 0.55);
        }
      } else if (wp.type === 'canalWaterGlint') {
        wp.x += wp.vx;
        wp.y += wp.vy;
        wp.pulse += wp.pulseSpeed;
        if (wp.x < 0) wp.x = virtualWidth;
        if (wp.x > virtualWidth) wp.x = 0;
        if (wp.y < screenHeight * 0.60) wp.y = screenHeight * 0.95;
        if (wp.y > screenHeight) wp.y = screenHeight * 0.65;
      } else if (wp.type === 'spotlightBeam') {
        wp.sweepPhase += wp.sweepSpeed;
      } else if (wp.type === 'spotlightMote') {
        wp.x += wp.vx;
        wp.y += wp.vy;
        wp.pulse += wp.pulseSpeed;
        if (wp.y < screenHeight * 0.1) {
          wp.y = screenHeight * 0.95;
          wp.x = Math.random() * virtualWidth;
        }
        if (wp.x < 0) wp.x = virtualWidth;
        if (wp.x > virtualWidth) wp.x = 0;
      } else if (wp.type === 'auroraMist') {
        wp.x += wp.vx;
        wp.y += wp.vy;
        wp.pulse += wp.pulseSpeed || 0.02;
        if (wp.x > virtualWidth + 140) {
          wp.x = -140;
          wp.y = screenHeight * 0.38 + Math.random() * (screenHeight * 0.55);
        }
        if (wp.x < -140) wp.x = virtualWidth + 140;
      } else if (wp.type === 'electricSparkArc') {
        if (wp.state === 'dormant') {
          wp.timer--;
          if (wp.timer <= 0) {
            wp.state = 'sparking';
            wp.sparkLife = 0;
            wp.maxSparkLife = 4 + Math.floor(Math.random() * 7);
            wp.segments = [{ x: wp.x, y: wp.y }];
            let curX = wp.x;
            let curY = wp.y;
            const segCount = 4 + Math.floor(Math.random() * 3);
            for (let s = 0; s < segCount; s++) {
              curX += (Math.random() - 0.5) * 35;
              curY += (Math.random() - 0.5) * 35;
              wp.segments.push({ x: curX, y: curY });
            }
          }
        } else if (wp.state === 'sparking') {
          wp.sparkLife++;
          if (wp.segments) {
            for (let s = 1; s < wp.segments.length; s++) {
              wp.segments[s].x += (Math.random() - 0.5) * 8;
              wp.segments[s].y += (Math.random() - 0.5) * 8;
            }
          }
          if (wp.sparkLife >= wp.maxSparkLife) {
            wp.state = 'dormant';
            wp.timer = 10 + Math.floor(Math.random() * 35);
            wp.x = Math.random() * virtualWidth;
            wp.y = screenHeight * 0.10 + Math.random() * (screenHeight * 0.75);
            wp.color = Math.random() > 0.5 ? '#38bdf8' : (Math.random() > 0.5 ? '#fef08a' : '#4ade80');
          }
        }
      } else if (wp.type === 'electricSparkFly') {
        wp.x += wp.vx + (Math.random() - 0.5) * 2.5;
        wp.y += wp.vy + (Math.random() - 0.5) * 2.5;
        wp.vy += 0.08;
        wp.life -= wp.decay;
        if (wp.life <= 0 || wp.x < 0 || wp.x > virtualWidth || wp.y > screenHeight) {
          wp.x = Math.random() * virtualWidth;
          wp.y = Math.random() * (screenHeight * 0.85);
          wp.vx = (Math.random() - 0.5) * 6.5;
          wp.vy = (Math.random() - 0.5) * 6.0 - 0.8;
          wp.life = 0.5 + Math.random() * 0.5;
        }
      } else if (wp.type === 'labChemicalBubble') {
        wp.y += wp.vy;
        wp.pulse += 0.06;
        wp.x += Math.sin(wp.pulse) * 0.6;
        if (wp.y < screenHeight * 0.15) {
          wp.y = screenHeight * 0.92;
          wp.x = Math.random() * virtualWidth;
        }
      } else if (wp.type === 'tajMahalPinkLeaf') {
        wp.wobble += wp.wobbleSpeed;
        wp.x += wp.vx + Math.sin(wp.wobble) * wp.wobbleAmp;
        wp.y += wp.vy;
        wp.rotation += wp.vRot;
        if (wp.y > screenHeight + 20) {
          wp.y = -25;
          wp.x = Math.random() * virtualWidth;
        }
        if (wp.x > virtualWidth + 40) {
          wp.x = -40;
        }
      } else if (wp.type === 'tajMahalWaterGlint') {
        wp.pulse += wp.pulseSpeed;
        if (wp.pulse > Math.PI * 2) wp.pulse -= Math.PI * 2;
      } else if (wp.type === 'babylonMist') {
        wp.pulse += wp.pulseSpeed;
        wp.x += wp.vx;
        wp.y += wp.vy + Math.sin(wp.pulse) * 0.25;
        if (wp.x > virtualWidth + 200) {
          wp.x = -200;
          wp.y = screenHeight * 0.12 + Math.random() * (screenHeight * 0.76);
        }
      } else if (wp.type === 'babylonWaterSpray') {
        wp.pulse += wp.pulseSpeed;
        wp.x += wp.vx;
        wp.y += wp.vy;
        if (wp.y < screenHeight * 0.15) {
          wp.y = screenHeight * 0.90;
          wp.x = Math.random() * virtualWidth;
        }
      } else if (wp.type === 'incomingGoldCoin') {
        wp.z -= wp.speed;
        wp.rot += wp.vRot;
        wp.spinAngle += wp.spinSpeed;
        if (wp.z <= 25) {
          wp.z = 1000;
          wp.x = (Math.random() - 0.5) * virtualWidth * 1.6;
          wp.y = (Math.random() - 0.4) * screenHeight * 1.4;
          wp.speed = 4.2 + Math.random() * 5.2;
          wp.vRot = (Math.random() - 0.5) * 0.08;
          wp.spinSpeed = 0.06 + Math.random() * 0.09;
        }
      } else if (wp.type === 'zeusDivineSparkle') {
        wp.pulse += wp.pulseSpeed;
        wp.x += wp.vx;
        wp.y += wp.vy;
        if (wp.y < -15) {
          wp.y = screenHeight + 15;
          wp.x = Math.random() * virtualWidth;
        }
      } else if (wp.type === 'alexandriaSeaSplash') {
        wp.radius += wp.growSpeed;
        wp.opacity -= 0.025;
        if (wp.radius >= wp.maxRadius || wp.opacity <= 0) {
          wp.x = Math.random() * virtualWidth;
          wp.y = screenHeight * 0.62 + Math.random() * (screenHeight * 0.35);
          wp.radius = 1.5;
          wp.opacity = 0.6 + Math.random() * 0.4;
          wp.maxRadius = 10 + Math.random() * 14;
        }
      } else if (wp.type === 'driftingCloudRhodes') {
        wp.x += wp.vx;
        if (wp.x > virtualWidth + 350) {
          wp.x = -350;
          wp.y = screenHeight * 0.04 + Math.random() * (screenHeight * 0.38);
        }
      } else if (wp.type === 'rhodesSunMote') {
        wp.pulse += wp.pulseSpeed;
        wp.x += wp.vx;
        wp.y += wp.vy;
        if (wp.y < -15) {
          wp.y = screenHeight + 15;
          wp.x = Math.random() * virtualWidth;
        }
      } else if (wp.type === 'spotlightBeamArtemis') {
        wp.phase += wp.speed * 16;
        wp.currentAngle = wp.angleOffset + Math.sin(wp.phase) * wp.swingAmp;
      } else if (wp.type === 'spotlightMoteArtemis') {
        wp.pulse += wp.pulseSpeed;
        wp.x += wp.vx;
        wp.y += wp.vy;
        if (wp.y > screenHeight + 20) {
          wp.y = -20;
          wp.x = Math.random() * virtualWidth;
        } else if (wp.y < -20) {
          wp.y = screenHeight + 20;
          wp.x = Math.random() * virtualWidth;
        }
      } else if (wp.type === 'fallingStarHalicarnassus') {
        wp.pulse += wp.pulseSpeed;
        wp.wobble += wp.wobbleSpeed;
        wp.rot += wp.vRot;
        wp.x += wp.vx + Math.sin(wp.wobble) * 0.25;
        wp.y += wp.vy; // Fällt langsam nach unten
        if (wp.y > screenHeight + 20) {
          wp.y = -20;
          wp.x = Math.random() * virtualWidth;
        }
        if (wp.x < -20) wp.x = virtualWidth + 20;
        if (wp.x > virtualWidth + 20) wp.x = -20;
      } else if (wp.type === 'chichenJungleLeaf') {
        wp.wobble += wp.wobbleSpeed;
        wp.x += wp.vx + Math.sin(wp.wobble) * wp.wobbleAmp;
        wp.y += wp.vy;
        wp.rotation += wp.vRot;
        if (wp.y > screenHeight + 25) {
          wp.y = -25;
          wp.x = Math.random() * virtualWidth;
        }
        if (wp.x > virtualWidth + 50) {
          wp.x = -50;
        }
      } else if (wp.type === 'chichenJungleMote') {
        wp.pulse += wp.pulseSpeed;
        wp.x += wp.vx;
        wp.y += wp.vy;
        if (wp.y < -15) {
          wp.y = screenHeight + 15;
          wp.x = Math.random() * virtualWidth;
        }
      } else if (wp.type === 'denseDriftingCloudRio') {
        wp.wobble += wp.wobbleSpeed;
        wp.x += wp.vx;
        wp.y += Math.sin(wp.wobble) * 0.15;
        if (wp.x > virtualWidth + 450) {
          wp.x = -450;
          wp.y = screenHeight * 0.05 + Math.random() * (screenHeight * 0.58);
        }
      } else if (wp.type === 'rioMountainMist') {
        wp.pulse += wp.pulseSpeed;
        wp.x += wp.vx;
        wp.y += wp.vy;
        if (wp.x > virtualWidth + 20) {
          wp.x = -20;
          wp.y = Math.random() * screenHeight;
        }
      } else if (wp.type === 'bubble') {
        wp.y += wp.vy;
        wp.wobblePhase += 0.05;
        wp.x += Math.sin(wp.wobblePhase) * 0.8;
        if (wp.y < -20) {
          wp.y = screenHeight + 20;
          wp.x = Math.random() * virtualWidth;
        }
      } else if (wp.type === 'citySparkle') {
        wp.x += wp.vx;
        wp.y += wp.vy;
        wp.pulse += 0.05;
        if (wp.y < -10) {
          wp.y = screenHeight + 10;
          wp.x = Math.random() * virtualWidth;
        }
      } else if (wp.type === 'hayDust') {
        wp.x += wp.vx + Math.sin(wp.y * 0.02) * 0.4;
        wp.y += wp.vy;
        wp.rot += wp.vRot;
        if (wp.y > screenHeight) wp.y = -10;
        if (wp.x > virtualWidth) wp.x = -10;
      } else if (wp.type === 'goldenEmbers') {
        wp.x += wp.vx + Math.sin(wp.pulse) * 0.3;
        wp.y += wp.vy;
        wp.pulse += 0.04;
        if (wp.y < -10) {
          wp.y = screenHeight + 10;
          wp.x = Math.random() * virtualWidth;
        }
      } else if (wp.type === 'sandStorm') {
        wp.x += wp.vx;
        wp.y += wp.vy + Math.sin(wp.x * 0.01) * 0.3;
        if (wp.x > virtualWidth + 20) {
          wp.x = -20;
          wp.y = Math.random() * screenHeight;
        }
      } else if (wp.type === 'laurelLeaves') {
        wp.x += wp.vx + Math.sin(wp.y * 0.02) * 0.5;
        wp.y += wp.vy;
        wp.rot += wp.vRot;
        if (wp.y > screenHeight) wp.y = -10;
        if (wp.x > virtualWidth) wp.x = -10;
      } else if (wp.type === 'magicSparks') {
        wp.x += wp.vx + Math.sin(wp.pulse) * 0.4;
        wp.y += wp.vy;
        wp.pulse += 0.05;
        if (wp.y < -10) {
          wp.y = screenHeight + 10;
          wp.x = Math.random() * virtualWidth;
        }
      } else if (wp.type === 'empressSparkles') {
        wp.x += wp.vx + Math.sin(wp.pulse) * 0.3;
        wp.y += wp.vy;
        wp.pulse += 0.06;
        if (wp.y < -10) {
          wp.y = screenHeight + 10;
          wp.x = Math.random() * virtualWidth;
        }
      } else if (wp.type === 'moorlandMist') {
        wp.x += wp.vx;
        wp.y += wp.vy + Math.sin(wp.pulse) * 0.2;
        wp.pulse += 0.03;
        if (wp.x > virtualWidth + 100) {
          wp.x = -100;
          wp.y = screenHeight * 0.4 + Math.random() * (screenHeight * 0.55);
        }
      } else if (wp.type === 'dragonEmbers') {
        wp.x += wp.vx + Math.sin(wp.pulse) * 0.4;
        wp.y += wp.vy;
        wp.pulse += 0.05;
        if (wp.y < -10) {
          wp.y = screenHeight + 10;
          wp.x = Math.random() * virtualWidth;
        }
      } else if (wp.type === 'jungleSpores') {
        wp.x += wp.vx + Math.sin(wp.pulse) * 0.3;
        wp.y += wp.vy;
        wp.pulse += 0.04;
        if (wp.y > screenHeight + 10) {
          wp.y = -10;
          wp.x = Math.random() * virtualWidth;
        }
      } else if (wp.type === 'fortressEmbers') {
        wp.x += wp.vx + Math.sin(wp.pulse) * 0.3;
        wp.y += wp.vy;
        wp.pulse += 0.04;
        if (wp.y < -10) {
          wp.y = screenHeight + 10;
          wp.x = Math.random() * virtualWidth;
        }
      } else if (wp.type === 'militaryDust') {
        wp.x += wp.vx + Math.sin(wp.pulse) * 0.3;
        wp.y += wp.vy;
        wp.pulse += 0.04;
        if (wp.y > screenHeight + 10) {
          wp.y = -10;
          wp.x = Math.random() * virtualWidth;
        }
      } else if (wp.type === 'alpinePetals') {
        wp.x += wp.vx + Math.sin(wp.y * 0.02) * 0.5;
        wp.y += wp.vy;
        wp.rot += wp.vRot;
        if (wp.y > screenHeight) wp.y = -10;
        if (wp.x > virtualWidth) wp.x = -10;
      } else if (wp.type === 'elvenSparkles') {
        wp.x += wp.vx + Math.sin(wp.pulse) * 0.4;
        wp.y += wp.vy;
        wp.pulse += 0.05;
        if (wp.y < -10) {
          wp.y = screenHeight + 10;
          wp.x = Math.random() * virtualWidth;
        }
      } else if (wp.type === 'tumbleweed') {
        wp.x += wp.speedX;
        wp.rot += 0.08;
        if (wp.x > virtualWidth + 60) {
          wp.x = -60;
          wp.y = screenHeight * 0.7 + Math.random() * (screenHeight * 0.22);
        }
      } else if (wp.type === 'desertDust') {
        wp.x += wp.vx;
        wp.y += wp.vy;
        if (wp.x > virtualWidth + 20) {
          wp.x = -20;
          wp.y = screenHeight * 0.4 + Math.random() * (screenHeight * 0.55);
        }
      } else if (wp.type === 'cosmicSparkles') {
        wp.x += wp.vx + Math.sin(wp.pulse) * 0.3;
        wp.y += wp.vy;
        wp.pulse += 0.06;
        if (wp.y < -10) {
          wp.y = screenHeight * 0.5;
          wp.x = Math.random() * virtualWidth;
        }
      } else if (wp.type === 'marsDust') {
        wp.x += wp.vx;
        wp.y += wp.vy;
        if (wp.x > virtualWidth + 20) {
          wp.x = -20;
          wp.y = screenHeight * 0.5 + Math.random() * (screenHeight * 0.45);
        }
      } else if (wp.type === 'candySprinkles') {
        wp.x += wp.vx + Math.sin(wp.y * 0.02) * 0.5;
        wp.y += wp.vy;
        wp.rot += wp.vRot;
        if (wp.y > screenHeight) wp.y = -10;
        if (wp.x > virtualWidth) wp.x = -10;
      } else if (wp.type === 'lemonadeBubbles') {
        wp.y += wp.vy;
        wp.wobblePhase += 0.06;
        wp.x += Math.sin(wp.wobblePhase) * 0.7;
        if (wp.y < screenHeight * 0.6) {
          wp.y = screenHeight + 10;
          wp.x = Math.random() * virtualWidth;
        }
      } else if (wp.type === 'fairSparkles') {
        wp.x += wp.vx + Math.sin(wp.pulse) * 0.3;
        wp.y += wp.vy;
        wp.pulse += 0.06;
        if (wp.y < -10) {
          wp.y = screenHeight + 10;
          wp.x = Math.random() * virtualWidth;
        }
      } else if (wp.type === 'popcornPops') {
        wp.x += wp.vx;
        wp.y += wp.vy;
        if (wp.y < screenHeight * 0.3) {
          wp.y = screenHeight * 0.8;
          wp.x = Math.random() * virtualWidth;
        }
      } else if (wp.type === 'riverPetals') {
        wp.x += wp.vx + Math.sin(wp.y * 0.02) * 0.5;
        wp.y += wp.vy;
        wp.rot += wp.vRot;
        if (wp.y > screenHeight) wp.y = -10;
        if (wp.x > virtualWidth) wp.x = -10;
      } else if (wp.type === 'riverSpray') {
        wp.y += wp.vy;
        wp.wobblePhase += 0.05;
        wp.x += Math.sin(wp.wobblePhase) * 0.6;
        if (wp.y < screenHeight * 0.5) {
          wp.y = screenHeight * 0.85;
          wp.x = Math.random() * virtualWidth;
        }
      } else if (wp.type === 'steampunkPuffs') {
        wp.x += wp.vx;
        wp.y += wp.vy;
        wp.size += 0.03;
        if (wp.y < -20 || wp.size > 16) {
          wp.y = screenHeight + 10;
          wp.x = Math.random() * virtualWidth;
          wp.size = 4 + Math.random() * 4;
        }
      } else if (wp.type === 'brassSparks') {
        wp.x += wp.vx;
        wp.y += wp.vy;
        wp.pulse += 0.07;
        if (wp.x < -10 || wp.x > virtualWidth + 10 || wp.y < -10 || wp.y > screenHeight + 10) {
          wp.x = Math.random() * virtualWidth;
          wp.y = Math.random() * screenHeight;
        }
      } else if (wp.type === 'driftingStar') {
        wp.x += wp.vx;
        wp.y += wp.vy;
        wp.pulse += wp.pulseSpeed || 0.03;
        if (wp.x < 0) wp.x = virtualWidth;
        if (wp.x > virtualWidth) wp.x = 0;
        if (wp.y < 0) wp.y = screenHeight;
        if (wp.y > screenHeight) wp.y = 0;
      } else if (wp.type === 'nebulaDust') {
        wp.x += wp.vx;
        wp.y += wp.vy;
        wp.pulse += wp.pulseSpeed || 0.04;
        if (wp.x < 0) wp.x = virtualWidth;
        if (wp.x > virtualWidth) wp.x = 0;
        if (wp.y < 0) wp.y = screenHeight;
        if (wp.y > screenHeight) wp.y = 0;
      } else if (wp.type === 'incomingStar') {
        wp.z -= wp.speed;
        if (wp.z <= 15) {
          wp.z = 1000;
          wp.x = (Math.random() - 0.5) * virtualWidth * 1.5;
          wp.y = (Math.random() - 0.5) * screenHeight * 1.5;
          wp.speed = 1.8 + Math.random() * 2.8;
        }
      } else if (wp.type === 'arenaSandDust') {
        wp.x += wp.vx;
        wp.y += wp.vy + Math.sin(wp.pulse) * 0.25;
        wp.pulse += 0.05;
        if (wp.x > virtualWidth + 20) {
          wp.x = -20;
          wp.y = screenHeight * 0.45 + Math.random() * (screenHeight * 0.55);
        }
      } else if (wp.type === 'romanLaurelFlakes') {
        wp.x += wp.vx + Math.sin(wp.pulse) * 0.4;
        wp.y += wp.vy;
        wp.rot += wp.vRot;
        wp.pulse += 0.04;
        if (wp.y > screenHeight + 20) {
          wp.y = -20;
          wp.x = Math.random() * virtualWidth;
        }
      } else if (wp.type === 'chipSpark') {
        if (wp.state === 'dormant') {
          wp.timer--;
          if (wp.timer <= 0) {
            wp.state = 'flaring';
            wp.flareAge = 0;
            wp.x = Math.random() * virtualWidth;
            wp.y = Math.random() * screenHeight;
            wp.color = ['#38bdf8', '#00f5ff', '#facc15', '#4ade80', '#ffffff', '#fb923c'][Math.floor(Math.random() * 6)];
            wp.baseSize = 1.5 + Math.random() * 2.8;
          }
        } else if (wp.state === 'flaring') {
          wp.flareAge++;
          if (wp.flareAge >= wp.flareDuration) {
            wp.state = 'dormant';
            wp.timer = 30 + Math.floor(Math.random() * 150);
          }
        }
      } else if (wp.type === 'greatWallLightning') {
        if (wp.state === 'dormant') {
          wp.timer--;
          if (wp.timer <= 0) {
            wp.state = 'striking';
            wp.strikeAge = 0;
            wp.strikeDuration = 4 + Math.floor(Math.random() * 4);
            // Dezent-atmosphärischer Blitz-Lichtschein über der Mauer
            this.screenFlashAlpha = Math.max(this.screenFlashAlpha || 0, 0.22 + Math.random() * 0.22);

            // Blitzpfad rundherum am Himmel / Bergrücken generieren
            const startX = Math.max(60, Math.min(virtualWidth - 60, wp.originXRatio * virtualWidth + (Math.random() - 0.5) * 200));
            const startY = 10 + Math.random() * (screenHeight * 0.15);
            const targetY = screenHeight * (0.42 + Math.random() * 0.45);
            const segments = [];
            let cx = startX;
            let cy = startY;
            const steps = 12 + Math.floor(Math.random() * 8);
            const dy = (targetY - startY) / steps;

            for (let s = 0; s < steps; s++) {
              const nx = cx + (Math.random() - 0.5) * 52;
              const ny = cy + dy + (Math.random() - 0.5) * 10;
              segments.push({ x1: cx, y1: cy, x2: nx, y2: ny, isBranch: false });

              // Verzweigungen
              if (Math.random() > 0.5 && s > 2 && s < steps - 2) {
                let bx = nx;
                let by = ny;
                const branchSteps = 2 + Math.floor(Math.random() * 4);
                const bDir = Math.random() > 0.5 ? 1 : -1;
                for (let b = 0; b < branchSteps; b++) {
                  const bnx = bx + bDir * (16 + Math.random() * 24);
                  const bny = by + dy * 0.7 + (Math.random() - 0.5) * 10;
                  segments.push({ x1: bx, y1: by, x2: bnx, y2: bny, isBranch: true });
                  bx = bnx;
                  by = bny;
                }
              }
              cx = nx;
              cy = ny;
            }
            wp.segments = segments;
          }
        } else if (wp.state === 'striking') {
          wp.strikeAge++;
          if (wp.strikeAge >= wp.strikeDuration) {
            wp.state = 'dormant';
            // Deutlich längere Pause bis zum nächsten Blitz (ca. 7 bis 15 Sekunden)
            wp.timer = 420 + Math.floor(Math.random() * 480);
            wp.originXRatio = 0.1 + Math.random() * 0.8; // Wandert rundherum am Horizont
            wp.segments = [];
          }
        }
      } else if (wp.type === 'greatWallMist') {
        wp.x += wp.vx;
        wp.y += wp.vy + Math.sin(wp.pulse) * 0.2;
        wp.pulse += 0.025;
        if (wp.x > virtualWidth + 160) {
          wp.x = -160;
          wp.y = screenHeight * 0.12 + Math.random() * (screenHeight * 0.65);
        }
      } else if (wp.type === 'greatWallSpark') {
        wp.x += wp.vx + Math.sin(wp.pulse) * 0.35;
        wp.y += wp.vy;
        wp.pulse += wp.pulseSpeed;
        if (wp.y < -15) {
          wp.y = screenHeight + 15;
          wp.x = Math.random() * virtualWidth;
        }
        if (wp.x < 0) wp.x = virtualWidth;
        if (wp.x > virtualWidth) wp.x = 0;
      } else if (wp.type === 'machuAndeanMist') {
        wp.x += wp.vx;
        wp.y += wp.vy + Math.sin(wp.pulse) * 0.2;
        wp.pulse += 0.025;
        if (wp.x > virtualWidth + 160) {
          wp.x = -160;
          wp.y = screenHeight * 0.12 + Math.random() * (screenHeight * 0.65);
        }
      } else if (wp.type === 'petraSandGrain') {
        wp.x += wp.vx;
        wp.y += wp.vy + Math.sin(wp.x * 0.02) * 0.4;
        if (wp.x > virtualWidth + 80) {
          wp.x = -80;
          wp.y = Math.random() * screenHeight;
        }
      } else if (wp.type === 'petraSandGust') {
        wp.x += wp.vx;
        wp.y += wp.vy;
        wp.pulse += 0.03;
        if (wp.x > virtualWidth + 240) {
          wp.x = -240;
          wp.y = Math.random() * screenHeight;
        }
      } else if (wp.type === 'libertySparkle') {
        wp.x += wp.vx;
        wp.y += wp.vy;
        if (wp.state === 'dormant') {
          wp.timer--;
          if (wp.timer <= 0) {
            wp.state = 'sparking';
            wp.age = 0;
            wp.x = Math.random() * virtualWidth;
            wp.y = Math.random() * screenHeight;
          }
        } else if (wp.state === 'sparking') {
          wp.age++;
          if (wp.age >= wp.maxAge) {
            wp.state = 'dormant';
            wp.timer = 25 + Math.floor(Math.random() * 140);
          }
        }
      } else if (wp.type === 'eiffelSpotlightBeam') {
        wp.phase += wp.speed * 16;
        wp.currentAngle = wp.angleOffset + Math.sin(wp.phase) * wp.swingAmp;
      } else if (wp.type === 'eiffelLightMote') {
        wp.pulse += wp.pulseSpeed;
        wp.x += wp.vx;
        wp.y += wp.vy;
        if (wp.y > screenHeight + 20) {
          wp.y = -20;
          wp.x = Math.random() * virtualWidth;
        } else if (wp.y < -20) {
          wp.y = screenHeight + 20;
          wp.x = Math.random() * virtualWidth;
        }
      } else if (wp.type === 'stonehengeDenseFog' || wp.type === 'stonehengeMistWisp') {
        wp.pulse += wp.pulseSpeed;
        wp.x += wp.vx;
        wp.y += wp.vy + Math.sin(wp.pulse) * 0.12;
        if (wp.x - wp.sizeX > virtualWidth + 100) {
          wp.x = -wp.sizeX - 50;
          wp.y = Math.random() * screenHeight;
        }
      } else if (wp.type === 'easterIslandLightning') {
        if (wp.state === 'dormant') {
          wp.timer--;
          if (wp.timer <= 0) {
            wp.state = 'striking';
            wp.strikeAge = 0;
            wp.strikeDuration = 4 + Math.floor(Math.random() * 4);
            this.screenFlashAlpha = Math.max(this.screenFlashAlpha || 0, 0.28 + Math.random() * 0.25);

            // Blitzpfad direkt von oben durch die Sturmwolken generieren
            const startX = Math.max(80, Math.min(virtualWidth - 80, wp.originXRatio * virtualWidth + (Math.random() - 0.5) * 180));
            const startY = 5 + Math.random() * 30;
            const targetY = screenHeight * (0.45 + Math.random() * 0.45);
            const segments = [];
            let cx = startX;
            let cy = startY;
            const steps = 14 + Math.floor(Math.random() * 6);
            const dy = (targetY - startY) / steps;

            for (let s = 0; s < steps; s++) {
              const nx = cx + (Math.random() - 0.5) * 48;
              const ny = cy + dy + (Math.random() - 0.5) * 8;
              segments.push({ x1: cx, y1: cy, x2: nx, y2: ny, isBranch: false });

              if (Math.random() > 0.45 && s > 2 && s < steps - 2) {
                let bx = nx;
                let by = ny;
                const branchSteps = 2 + Math.floor(Math.random() * 4);
                const bDir = Math.random() > 0.5 ? 1 : -1;
                for (let b = 0; b < branchSteps; b++) {
                  const bnx = bx + bDir * (15 + Math.random() * 22);
                  const bny = by + dy * 0.65 + (Math.random() - 0.5) * 8;
                  segments.push({ x1: bx, y1: by, x2: bnx, y2: bny, isBranch: true });
                  bx = bnx;
                  by = bny;
                }
              }
              cx = nx;
              cy = ny;
            }
            wp.segments = segments;
          }
        } else if (wp.state === 'striking') {
          wp.strikeAge++;
          if (wp.strikeAge >= wp.strikeDuration) {
            wp.state = 'dormant';
            wp.timer = 240 + Math.floor(Math.random() * 340);
            wp.originXRatio = 0.15 + Math.random() * 0.70;
            wp.segments = [];
          }
        }
      } else if (wp.type === 'easterIslandMist') {
        wp.pulse += 0.02;
        wp.x += wp.vx;
        wp.y += wp.vy;
        if (wp.x - wp.sizeX > virtualWidth + 50) {
          wp.x = -wp.sizeX - 20;
          wp.y = screenHeight * 0.45 + Math.random() * (screenHeight * 0.48);
        }
      } else if (wp.type === 'towerBridgeSpotlightBeam') {
        wp.phase += wp.speed * 16;
        wp.currentAngle = wp.angleOffset + Math.sin(wp.phase) * wp.swingAmp;
      } else if (wp.type === 'towerBridgeLightMote') {
        wp.pulse += wp.pulseSpeed;
        wp.x += wp.vx;
        wp.y += wp.vy;
        if (wp.y < -20) {
          wp.y = screenHeight + 20;
          wp.x = Math.random() * virtualWidth;
        } else if (wp.x < -20 || wp.x > virtualWidth + 20) {
          wp.x = Math.random() * virtualWidth;
        }
      } else if (wp.type === 'grazerUhrturmCloud') {
        wp.wobble += wp.wobbleSpeed;
        wp.x += wp.vx;
        wp.y += Math.sin(wp.wobble) * 0.12;
        if (wp.x > virtualWidth + 500) {
          wp.x = -500;
          wp.y = screenHeight * 0.02 + Math.random() * (screenHeight * 0.42);
        }
      } else if (wp.type === 'incomingWarpStar') {
        wp.prevZ = wp.z;
        wp.z -= wp.speed;
        if (wp.z <= 12) {
          wp.z = 1000;
          wp.prevZ = 1000;
          wp.x = (Math.random() - 0.5) * virtualWidth * 1.6;
          wp.y = (Math.random() - 0.5) * screenHeight * 1.6;
          wp.speed = 3.8 + Math.random() * 4.8;
        }
      } else if (wp.type === 'cosmicDustGlow') {
        wp.pulse += wp.pulseSpeed;
        wp.x += wp.vx;
        wp.y += wp.vy;
        if (wp.x < 0) wp.x = virtualWidth;
        if (wp.x > virtualWidth) wp.x = 0;
        if (wp.y < 0) wp.y = screenHeight;
        if (wp.y > screenHeight) wp.y = 0;
      }
    }
  }

  render(ctx, cameraX) {
    ctx.save();
    ctx.translate(-cameraX, 0);

    for (let wp of this.weatherParticles) {
      if (wp.type === 'rain') {
        ctx.strokeStyle = `rgba(186, 230, 253, ${wp.opacity})`;
        ctx.lineWidth = wp.width;
        ctx.beginPath();
        ctx.moveTo(wp.x, wp.y);
        ctx.lineTo(wp.x + wp.vx * 0.9, wp.y + wp.len);
        ctx.stroke();
      } else if (wp.type === 'snow') {
        ctx.fillStyle = `rgba(255, 255, 255, ${wp.opacity})`;
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (wp.type === 'leaf' || wp.type === 'petal') {
        ctx.save();
        ctx.translate(wp.x, wp.y);
        ctx.rotate(wp.rot);
        ctx.fillStyle = wp.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, wp.size, wp.size * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (wp.type === 'mohnblumenRedPetal') {
        ctx.save();
        ctx.translate(wp.x, wp.y);
        ctx.rotate(wp.rot);
        ctx.globalAlpha = wp.opacity;
        ctx.fillStyle = wp.color;

        // Natürlich geschwungene rote Mohnblütenblatt-Form
        ctx.beginPath();
        ctx.moveTo(0, -wp.size);
        ctx.bezierCurveTo(wp.size * 0.85, -wp.size * 0.6, wp.size * 0.8, wp.size * 0.5, 0, wp.size * 0.85);
        ctx.bezierCurveTo(-wp.size * 0.8, wp.size * 0.5, -wp.size * 0.85, -wp.size * 0.6, 0, -wp.size);
        ctx.fill();

        // Samtiger dunkler Kernansatz an der Blattbasis
        ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
        ctx.beginPath();
        ctx.arc(0, wp.size * 0.45, wp.size * 0.25, 0, Math.PI * 2);
        ctx.fill();

        // Feiner zarter Lichtsaum
        ctx.strokeStyle = 'rgba(254, 202, 202, 0.35)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
      } else if (wp.type === 'herbstAutumnLeaf') {
        ctx.save();
        ctx.translate(wp.x, wp.y);
        ctx.rotate(wp.rot);
        // Taumelnder 3D-Flattereffekt (Blatt dreht sich sanft im Wind)
        const tiltX = Math.cos(wp.tiltPhase);
        ctx.scale(Math.max(0.25, Math.abs(tiltX)), 1);
        ctx.globalAlpha = wp.opacity;
        ctx.fillStyle = wp.color;

        const s = wp.size;
        ctx.beginPath();
        if (wp.shape === 0) {
          // Ahornblatt (3 markante gezackte Lappen)
          ctx.moveTo(0, -s * 1.2);
          ctx.lineTo(s * 0.35, -s * 0.5);
          ctx.lineTo(s * 1.0, -s * 0.6);
          ctx.lineTo(s * 0.45, 0);
          ctx.lineTo(s * 0.8, s * 0.5);
          ctx.lineTo(s * 0.2, s * 0.4);
          ctx.lineTo(0, s * 0.8);
          ctx.lineTo(-s * 0.2, s * 0.4);
          ctx.lineTo(-s * 0.8, s * 0.5);
          ctx.lineTo(-s * 0.45, 0);
          ctx.lineTo(-s * 1.0, -s * 0.6);
          ctx.lineTo(-s * 0.35, -s * 0.5);
          ctx.closePath();
        } else if (wp.shape === 1) {
          // Eichenblatt (geschwungene Rundlappen)
          ctx.moveTo(0, -s * 1.1);
          ctx.quadraticCurveTo(s * 0.65, -s * 0.7, s * 0.35, -s * 0.3);
          ctx.quadraticCurveTo(s * 0.85, 0, s * 0.3, s * 0.35);
          ctx.quadraticCurveTo(s * 0.65, s * 0.7, 0, s * 0.9);
          ctx.quadraticCurveTo(-s * 0.65, s * 0.7, -s * 0.3, s * 0.35);
          ctx.quadraticCurveTo(-s * 0.85, 0, -s * 0.35, -s * 0.3);
          ctx.quadraticCurveTo(-s * 0.65, -s * 0.7, 0, -s * 1.1);
        } else {
          // Birkenblatt / Ovales Herbstblatt
          ctx.moveTo(0, -s * 1.15);
          ctx.bezierCurveTo(s * 0.75, -s * 0.6, s * 0.7, s * 0.5, 0, s * 0.95);
          ctx.bezierCurveTo(-s * 0.7, s * 0.5, -s * 0.75, -s * 0.6, 0, -s * 1.15);
        }
        ctx.fill();

        // Blattstiel
        ctx.strokeStyle = '#451a03';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(0, s * 0.7);
        ctx.lineTo(0, s * 1.25);
        ctx.stroke();

        // Zarte Blattrippe
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
        ctx.lineWidth = 0.9;
        ctx.beginPath();
        ctx.moveTo(0, s * 0.7);
        ctx.lineTo(0, -s * 0.8);
        ctx.stroke();

        ctx.restore();
      } else if (wp.type === 'schneefallFlake') {
        ctx.save();
        ctx.translate(wp.x, wp.y);
        ctx.globalAlpha = wp.opacity;

        if (wp.isCrystal) {
          // 6-armige Kristall-Schneeflocke
          ctx.rotate(wp.rot);
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = Math.max(1.2, wp.size * 0.25);
          ctx.lineCap = 'round';
          const r = wp.size;
          for (let a = 0; a < 3; a++) {
            ctx.beginPath();
            ctx.moveTo(0, -r);
            ctx.lineTo(0, r);
            ctx.stroke();

            // Verzweigungen
            const branchDist = r * 0.55;
            const branchLen = r * 0.35;
            ctx.beginPath();
            ctx.moveTo(-branchLen, -branchDist);
            ctx.lineTo(0, -branchDist - branchLen * 0.5);
            ctx.lineTo(branchLen, -branchDist);
            ctx.moveTo(-branchLen, branchDist);
            ctx.lineTo(0, branchDist + branchLen * 0.5);
            ctx.lineTo(branchLen, branchDist);
            ctx.stroke();

            ctx.rotate(Math.PI / 3);
          }
          // Kristall-Zentrum
          ctx.fillStyle = '#e0f2fe';
          ctx.beginPath();
          ctx.arc(0, 0, r * 0.28, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Flauschige weiche Schneeflocke mit sanftem Glow
          if (wp.size > 3.8) {
            const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, wp.size);
            glow.addColorStop(0, 'rgba(255, 255, 255, 1)');
            glow.addColorStop(0.5, 'rgba(240, 249, 255, 0.85)');
            glow.addColorStop(1, 'rgba(224, 242, 254, 0)');
            ctx.fillStyle = glow;
          } else {
            ctx.fillStyle = '#ffffff';
          }
          ctx.beginPath();
          ctx.arc(0, 0, wp.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      } else if (wp.type === 'chinaCloud') {
        ctx.save();
        ctx.translate(wp.x, wp.y);
        ctx.scale(wp.scale, wp.scale);
        ctx.globalAlpha = wp.opacity;

        // Atmosphärische dramatische Gewitterwolke
        ctx.fillStyle = '#475569';
        ctx.shadowColor = 'rgba(15, 23, 42, 0.4)';
        ctx.shadowBlur = 16;
        for (let lobe of wp.lobes) {
          ctx.beginPath();
          ctx.arc(lobe.dx, lobe.dy, lobe.r, 0, Math.PI * 2);
          ctx.fill();
        }

        // Hellere Kantenbeleuchtung
        ctx.fillStyle = 'rgba(226, 232, 240, 0.35)';
        for (let lobe of wp.lobes) {
          ctx.beginPath();
          ctx.arc(lobe.dx - 2, lobe.dy - lobe.r * 0.25, lobe.r * 0.75, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      } else if (wp.type === 'chinaLightning') {
        if (wp.state === 'striking' && wp.segments && wp.segments.length > 0) {
          const flicker = Math.random() > 0.18 ? 1 : 0.45;
          ctx.save();
          ctx.shadowColor = '#818cf8';
          ctx.shadowBlur = 26 * flicker;

          for (let seg of wp.segments) {
            ctx.strokeStyle = seg.isBranch ? 'rgba(199, 210, 254, 0.85)' : '#ffffff';
            ctx.lineWidth = seg.isBranch ? 2.2 : 5.0;
            ctx.beginPath();
            ctx.moveTo(seg.x1, seg.y1);
            ctx.lineTo(seg.x2, seg.y2);
            ctx.stroke();

            if (!seg.isBranch) {
              ctx.strokeStyle = '#e0e7ff';
              ctx.lineWidth = 2.0;
              ctx.stroke();
            }
          }
          ctx.restore();
        }
      } else if (wp.type === 'butterfly') {
        ctx.save();
        ctx.translate(wp.x, wp.y);
        const wingAngle = Math.sin(wp.flutter * 2) * 0.6;
        ctx.fillStyle = wp.color;

        // Left Wing
        ctx.save();
        ctx.rotate(wingAngle);
        ctx.beginPath();
        ctx.ellipse(-wp.size * 0.5, 0, wp.size * 0.6, wp.size * 0.35, 0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Right Wing
        ctx.save();
        ctx.rotate(-wingAngle);
        ctx.beginPath();
        ctx.ellipse(wp.size * 0.5, 0, wp.size * 0.6, wp.size * 0.35, -0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        ctx.restore();
      } else if (wp.type === 'firefly') {
        const glow = (Math.sin(wp.pulse) + 1) * 0.5 * 0.8 + 0.2;
        ctx.fillStyle = `rgba(180, 255, 100, ${glow})`;
        ctx.shadowColor = '#b4ff64';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      } else if (wp.type === 'bat') {
        ctx.fillStyle = '#1e1b4b';
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (wp.type === 'flyingBird') {
        ctx.save();
        ctx.translate(wp.x, wp.y);
        if (wp.vx < 0) ctx.scale(-1, 1);

        const wingFlap = Math.sin(wp.wingPhase);
        const wingTipY = -wingFlap * (wp.size * 0.42);

        ctx.strokeStyle = wp.color || '#ffffff';
        ctx.lineWidth = Math.max(1.6, wp.size * 0.15);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
        ctx.shadowBlur = 3;

        ctx.beginPath();
        ctx.moveTo(-wp.size, wingTipY);
        ctx.quadraticCurveTo(-wp.size * 0.45, wingTipY * 0.2 - 2, 0, 0);
        ctx.quadraticCurveTo(wp.size * 0.45, wingTipY * 0.2 - 2, wp.size, wingTipY);
        ctx.stroke();

        ctx.fillStyle = wp.color || '#ffffff';
        ctx.beginPath();
        ctx.ellipse(0, 0, wp.size * 0.22, wp.size * 0.1, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      } else if (wp.type === 'paintDot') {
        if (wp.state === 'visible') {
          const progress = wp.age / wp.maxAge;
          const alpha = Math.sin(progress * Math.PI);
          ctx.save();
          ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
          ctx.fillStyle = wp.color;
          ctx.shadowColor = wp.color;
          ctx.shadowBlur = 12 * alpha;

          const r = wp.size * (0.8 + alpha * 0.35);
          ctx.beginPath();
          ctx.arc(wp.x, wp.y, r, 0, Math.PI * 2);
          ctx.fill();

          if (alpha > 0.3) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
            ctx.beginPath();
            ctx.arc(wp.x - r * 0.3, wp.y - r * 0.3, r * 0.28, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }
      } else if (wp.type === 'pixelBit') {
        ctx.save();
        ctx.fillStyle = wp.color;
        const px = Math.round(wp.x);
        const py = Math.round(wp.y);
        ctx.fillRect(px, py, wp.size, wp.size);

        // 8-Bit pixel highlight
        if (wp.size >= 6) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
          ctx.fillRect(px, py, Math.floor(wp.size * 0.4), Math.floor(wp.size * 0.4));
          ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
          ctx.fillRect(px + Math.floor(wp.size * 0.6), py + Math.floor(wp.size * 0.6), Math.floor(wp.size * 0.4), Math.floor(wp.size * 0.4));
        }
        ctx.restore();
      } else if (wp.type === 'desertDustMote') {
        const glow = (Math.sin(wp.pulse) + 1) * 0.5 * 0.4 + 0.6;
        ctx.save();
        ctx.globalAlpha = wp.opacity * glow;
        ctx.fillStyle = wp.color;
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 6 * glow;
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (wp.type === 'bubble') {
        // Translucent blue-white rising air bubbles
        ctx.strokeStyle = `rgba(255, 255, 255, ${wp.opacity})`;
        ctx.fillStyle = `rgba(186, 230, 253, ${wp.opacity * 0.4})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Bubble Glint Specular
        ctx.fillStyle = `rgba(255, 255, 255, ${wp.opacity * 0.9})`;
        ctx.beginPath();
        ctx.arc(wp.x - wp.size * 0.3, wp.y - wp.size * 0.3, wp.size * 0.25, 0, Math.PI * 2);
        ctx.fill();
      } else if (wp.type === 'citySparkle') {
        const glow = (Math.sin(wp.pulse) + 1) * 0.5 * 0.7 + 0.3;
        ctx.save();
        ctx.globalAlpha = glow;
        ctx.fillStyle = wp.color;
        ctx.shadowColor = wp.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (wp.type === 'hayDust') {
        ctx.save();
        ctx.translate(wp.x, wp.y);
        ctx.rotate(wp.rot);
        ctx.fillStyle = wp.color;
        ctx.fillRect(-wp.size, -wp.size * 0.3, wp.size * 2, wp.size * 0.6);
        ctx.restore();
      } else if (wp.type === 'goldenEmbers') {
        const glow = (Math.sin(wp.pulse) + 1) * 0.5 * 0.8 + 0.2;
        ctx.save();
        ctx.globalAlpha = glow;
        ctx.fillStyle = wp.color;
        ctx.shadowColor = wp.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (wp.type === 'sandStorm') {
        ctx.save();
        ctx.globalAlpha = wp.opacity;
        ctx.fillStyle = wp.color;
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (wp.type === 'laurelLeaves') {
        ctx.save();
        ctx.translate(wp.x, wp.y);
        ctx.rotate(wp.rot);
        ctx.fillStyle = wp.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, wp.size, wp.size * 0.4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (wp.type === 'magicSparks') {
        const glow = (Math.sin(wp.pulse) + 1) * 0.5 * 0.8 + 0.2;
        ctx.save();
        ctx.globalAlpha = glow;
        ctx.fillStyle = wp.color;
        ctx.shadowColor = wp.color;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (wp.type === 'empressSparkles') {
        const glow = (Math.sin(wp.pulse) + 1) * 0.5 * 0.85 + 0.15;
        ctx.save();
        ctx.globalAlpha = glow;
        ctx.fillStyle = wp.color;
        ctx.shadowColor = '#fbbf24';
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (wp.type === 'moorlandMist') {
        ctx.save();
        ctx.fillStyle = `rgba(241, 245, 249, ${wp.opacity})`;
        ctx.beginPath();
        ctx.ellipse(wp.x, wp.y, wp.sizeX, wp.sizeY, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (wp.type === 'dragonEmbers') {
        const glow = (Math.sin(wp.pulse) + 1) * 0.5 * 0.8 + 0.2;
        ctx.save();
        ctx.globalAlpha = glow;
        ctx.fillStyle = wp.color;
        ctx.shadowColor = '#f97316';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (wp.type === 'jungleSpores') {
        const glow = (Math.sin(wp.pulse) + 1) * 0.5 * 0.8 + 0.2;
        ctx.save();
        ctx.globalAlpha = glow;
        ctx.fillStyle = wp.color;
        ctx.shadowColor = '#fde047';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (wp.type === 'fortressEmbers') {
        const glow = (Math.sin(wp.pulse) + 1) * 0.5 * 0.8 + 0.2;
        ctx.save();
        ctx.globalAlpha = glow;
        ctx.fillStyle = wp.color;
        ctx.shadowColor = wp.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (wp.type === 'militaryDust') {
        const glow = (Math.sin(wp.pulse) + 1) * 0.5 * 0.7 + 0.3;
        ctx.save();
        ctx.globalAlpha = glow;
        ctx.fillStyle = wp.color;
        ctx.shadowColor = wp.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (wp.type === 'alpinePetals') {
        ctx.save();
        ctx.translate(wp.x, wp.y);
        ctx.rotate(wp.rot);
        ctx.fillStyle = wp.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, wp.size, wp.size * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (wp.type === 'elvenSparkles') {
        const glow = (Math.sin(wp.pulse) + 1) * 0.5 * 0.85 + 0.15;
        ctx.save();
        ctx.globalAlpha = glow;
        ctx.fillStyle = wp.color;
        ctx.shadowColor = wp.color;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (wp.type === 'tumbleweed') {
        ctx.save();
        const bounceY = wp.y - Math.abs(Math.sin(wp.rot * 2)) * 14;
        ctx.translate(wp.x, bounceY);
        ctx.rotate(wp.rot);
        ctx.strokeStyle = '#78350f';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(0, 0, wp.size, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = '#a16207';
        ctx.lineWidth = 1.2;
        for (let a = 0; a < 6; a++) {
          ctx.beginPath();
          ctx.ellipse(0, 0, wp.size * 0.8, wp.size * 0.35, a * Math.PI / 3, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      } else if (wp.type === 'desertDust') {
        ctx.save();
        ctx.globalAlpha = wp.opacity;
        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (wp.type === 'cosmicSparkles') {
        const glow = (Math.sin(wp.pulse) + 1) * 0.5 * 0.85 + 0.15;
        ctx.save();
        ctx.globalAlpha = glow;
        ctx.fillStyle = wp.color;
        ctx.shadowColor = wp.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (wp.type === 'marsDust') {
        ctx.save();
        ctx.globalAlpha = wp.opacity;
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (wp.type === 'candySprinkles') {
        ctx.save();
        ctx.translate(wp.x, wp.y);
        ctx.rotate(wp.rot);
        ctx.fillStyle = wp.color;
        ctx.fillRect(-wp.size, -wp.size * 0.4, wp.size * 2, wp.size * 0.8);
        ctx.restore();
      } else if (wp.type === 'lemonadeBubbles') {
        ctx.save();
        ctx.globalAlpha = wp.opacity;
        ctx.strokeStyle = '#ffffff';
        ctx.fillStyle = 'rgba(251, 113, 133, 0.4)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      } else if (wp.type === 'fairSparkles') {
        const glow = (Math.sin(wp.pulse) + 1) * 0.5 * 0.85 + 0.15;
        ctx.save();
        ctx.globalAlpha = glow;
        ctx.fillStyle = wp.color;
        ctx.shadowColor = wp.color;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (wp.type === 'popcornPops') {
        ctx.save();
        ctx.globalAlpha = wp.opacity;
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (wp.type === 'riverPetals') {
        ctx.save();
        ctx.translate(wp.x, wp.y);
        ctx.rotate(wp.rot);
        ctx.fillStyle = wp.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, wp.size, wp.size * 0.4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (wp.type === 'riverSpray') {
        ctx.save();
        ctx.globalAlpha = wp.opacity;
        ctx.fillStyle = '#bae6fd';
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (wp.type === 'steampunkPuffs') {
        ctx.save();
        ctx.globalAlpha = wp.opacity * 0.6;
        ctx.fillStyle = '#e2e8f0';
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (wp.type === 'brassSparks') {
        ctx.save();
        const alpha = 0.4 + Math.sin(wp.pulse) * 0.4;
        ctx.globalAlpha = Math.max(0.1, alpha);
        ctx.fillStyle = wp.color;
        ctx.shadowColor = wp.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (wp.type === 'pirateGleam' || wp.type === 'pirateGoldSparks') {
        ctx.save();
        const alpha = 0.35 + (Math.sin(wp.pulse) + 1) * 0.35;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = wp.color;
        ctx.shadowColor = wp.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (wp.type === 'driftingStar') {
        const twinkle = (Math.sin(wp.pulse) + 1) * 0.5 * 0.75 + 0.25;
        ctx.save();
        ctx.globalAlpha = twinkle;
        ctx.fillStyle = wp.color;
        ctx.shadowColor = wp.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.size * (0.8 + twinkle * 0.4), 0, Math.PI * 2);
        ctx.fill();
        if (wp.size > 3.0 && twinkle > 0.7) {
          ctx.strokeStyle = wp.color;
          ctx.lineWidth = 1;
          const s = wp.size * 1.8;
          ctx.beginPath();
          ctx.moveTo(wp.x - s, wp.y);
          ctx.lineTo(wp.x + s, wp.y);
          ctx.moveTo(wp.x, wp.y - s);
          ctx.lineTo(wp.x, wp.y + s);
          ctx.stroke();
        }
        ctx.restore();
      } else if (wp.type === 'nebulaDust') {
        const glow = (Math.sin(wp.pulse) + 1) * 0.5 * 0.65 + 0.25;
        ctx.save();
        ctx.globalAlpha = glow;
        ctx.fillStyle = wp.color;
        ctx.shadowColor = wp.color;
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (wp.type === 'incomingStar') {
        const fov = 380;
        const centerX = 1200;
        const centerY = 380;
        const sx = centerX + (wp.x / wp.z) * fov;
        const sy = centerY + (wp.y / wp.z) * fov;

        if (sx >= -60 && sx <= 2460 && sy >= -60 && sy <= 860) {
          const depthRatio = 1 - (wp.z / 1000);
          const currentSize = Math.max(0.9, Math.min(6.5, (wp.baseSize / wp.z) * fov));
          const alpha = Math.min(1, Math.max(0.15, depthRatio * 1.3));

          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.fillStyle = wp.color;
          ctx.shadowColor = wp.color;
          ctx.shadowBlur = Math.min(14, currentSize * 2.2);
          ctx.beginPath();
          ctx.arc(sx, sy, currentSize, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else {
          wp.z = 1000;
          wp.x = (Math.random() - 0.5) * 2400 * 1.5;
          wp.y = (Math.random() - 0.5) * 800 * 1.5;
        }
      } else if (wp.type === 'incomingSoccerBall') {
        const fov = 420;
        const centerX = 1200;
        const centerY = 420;
        const sx = centerX + (wp.x / wp.z) * fov;
        const sy = centerY + (wp.y / wp.z) * fov;

        if (sx >= -120 && sx <= 2520 && sy >= -120 && sy <= 920 && wp.z > 20) {
          const radius = Math.max(2.5, Math.min(48, (wp.baseRadius / wp.z) * fov));
          const alpha = Math.min(1, Math.max(0.2, (1 - wp.z / 1050) * 1.4));

          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.translate(sx, sy);
          ctx.rotate(wp.rot);

          // White ball body
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
          ctx.shadowBlur = radius * 0.35;
          ctx.beginPath();
          ctx.arc(0, 0, radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          // Ball boundary
          ctx.strokeStyle = '#1e293b';
          ctx.lineWidth = Math.max(1, radius * 0.08);
          ctx.stroke();

          // Pentagon pattern
          if (radius >= 5) {
            ctx.fillStyle = '#0f172a';
            const pr = radius * 0.36;
            ctx.beginPath();
            for (let p = 0; p < 5; p++) {
              const ang = (p * Math.PI * 2) / 5 - Math.PI / 2;
              const px = Math.cos(ang) * pr;
              const py = Math.sin(ang) * pr;
              if (p === 0) ctx.moveTo(px, py);
              else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fill();

            ctx.strokeStyle = '#334155';
            ctx.lineWidth = Math.max(1, radius * 0.06);
            for (let p = 0; p < 5; p++) {
              const ang = (p * Math.PI * 2) / 5 - Math.PI / 2;
              const px1 = Math.cos(ang) * pr;
              const py1 = Math.sin(ang) * pr;
              const px2 = Math.cos(ang) * (radius * 0.95);
              const py2 = Math.sin(ang) * (radius * 0.95);
              ctx.beginPath();
              ctx.moveTo(px1, py1);
              ctx.lineTo(px2, py2);
              ctx.stroke();
            }

            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.beginPath();
            ctx.arc(-radius * 0.35, -radius * 0.35, radius * 0.25, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.restore();
        } else {
          wp.z = 1000;
          wp.x = (Math.random() - 0.5) * 2400 * 1.6;
          wp.y = (Math.random() - 0.4) * 800 * 1.4;
        }
      } else if (wp.type === 'arenaSandDust') {
        ctx.save();
        ctx.fillStyle = wp.color;
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (wp.type === 'romanLaurelFlakes') {
        const shimmer = (Math.sin(wp.pulse) + 1) * 0.5 * 0.7 + 0.3;
        ctx.save();
        ctx.globalAlpha = shimmer;
        ctx.translate(wp.x, wp.y);
        ctx.rotate(wp.rot);
        ctx.fillStyle = wp.color;
        ctx.shadowColor = '#eab308';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.ellipse(0, 0, wp.size, wp.size * 0.45, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (wp.type === 'chipSpark') {
        if (wp.state === 'flaring') {
          const progress = wp.flareAge / wp.flareDuration;
          const intensity = Math.sin(progress * Math.PI);
          const currentSize = wp.baseSize * (1 + intensity * 0.8);
          ctx.save();
          ctx.globalAlpha = Math.max(0, Math.min(1, intensity * 1.3));
          ctx.fillStyle = wp.color;
          ctx.shadowColor = wp.color;
          ctx.shadowBlur = 12 * intensity;

          ctx.beginPath();
          ctx.arc(wp.x, wp.y, currentSize, 0, Math.PI * 2);
          ctx.fill();

          if (intensity > 0.35) {
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1;
            const arm = currentSize * 2.2 * intensity;
            ctx.beginPath();
            ctx.moveTo(wp.x - arm, wp.y);
            ctx.lineTo(wp.x + arm, wp.y);
            ctx.moveTo(wp.x, wp.y - arm);
            ctx.lineTo(wp.x, wp.y + arm);
            ctx.stroke();
          }
          ctx.restore();
        }
      } else if (wp.type === 'prairieLightning') {
        if (wp.state === 'striking' && wp.segments && wp.segments.length > 0) {
          const flicker = Math.random() > 0.15 ? 1 : 0.45;
          ctx.save();
          ctx.shadowColor = '#67e8f9';
          ctx.shadowBlur = 24 * flicker;

          for (let seg of wp.segments) {
            ctx.strokeStyle = seg.isBranch ? 'rgba(165, 243, 252, 0.8)' : '#ffffff';
            ctx.lineWidth = seg.isBranch ? 2.0 : 4.5;
            ctx.beginPath();
            ctx.moveTo(seg.x1, seg.y1);
            ctx.lineTo(seg.x2, seg.y2);
            ctx.stroke();

            if (!seg.isBranch) {
              ctx.strokeStyle = '#cffafe';
              ctx.lineWidth = 1.8;
              ctx.stroke();
            }
          }
          ctx.restore();
        }
      } else if (wp.type === 'tornadoDebris') {
        ctx.save();
        ctx.translate(wp.x, wp.y);
        ctx.rotate(wp.rot);
        ctx.fillStyle = wp.color;
        ctx.fillRect(-wp.size * 0.5, -wp.size * 0.2, wp.size, wp.size * 0.4);
        ctx.restore();
      } else if (wp.type === 'romanticRoomFlicker') {
        // Romantisches, feines Kamin- und Lampenlicht-Flackern über dem gesamten Bild
        const flickerA = 0.045 + Math.sin(wp.phase1) * 0.022 + Math.sin(wp.phase2) * 0.014 + (Math.random() - 0.5) * 0.008;
        const alpha = Math.max(0.015, Math.min(0.09, flickerA));

        ctx.save();
        ctx.fillStyle = `rgba(251, 146, 60, ${alpha})`;
        ctx.fillRect(-200, -200, 3200, 1400);

        const glowRad = ctx.createRadialGradient(400, 480, 50, 400, 480, 750);
        glowRad.addColorStop(0, `rgba(254, 215, 170, ${alpha * 1.5})`);
        glowRad.addColorStop(1, 'rgba(254, 215, 170, 0)');
        ctx.fillStyle = glowRad;
        ctx.fillRect(-200, -200, 3200, 1400);

        ctx.restore();
      } else if (wp.type === 'cozyFireplaceEmber') {
        const glow = (Math.sin(wp.pulse) + 1) * 0.5 * 0.4 + 0.6;
        ctx.save();
        ctx.globalAlpha = wp.opacity * glow;
        ctx.fillStyle = wp.color;
        ctx.shadowColor = '#f97316';
        ctx.shadowBlur = 9 * glow;
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (wp.type === 'largeComicDot') {
        if (wp.state === 'visible') {
          const progress = wp.age / wp.maxAge;
          const alpha = Math.sin(progress * Math.PI);
          ctx.save();
          ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

          // Großer dynamischer Comic-Farbpunkt mit Pop-Art Outline & Glanzpunkt
          const r = wp.size * (0.85 + alpha * 0.25);

          // Schattierung / Halftone-Glow
          ctx.fillStyle = wp.color;
          ctx.shadowColor = wp.color;
          ctx.shadowBlur = 16 * alpha;

          ctx.beginPath();
          ctx.arc(wp.x, wp.y, r, 0, Math.PI * 2);
          ctx.fill();

          // Feiner Comic-Tuschrand
          ctx.strokeStyle = '#0f172a';
          ctx.lineWidth = Math.max(2, r * 0.08);
          ctx.stroke();

          // Weißer Comic-Glanzpunkt
          if (alpha > 0.25) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
            ctx.beginPath();
            ctx.arc(wp.x - r * 0.35, wp.y - r * 0.35, r * 0.24, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }
      } else if (wp.type === 'venicePigeon') {
        ctx.save();
        ctx.translate(wp.x, wp.y);
        if (wp.vx < 0) ctx.scale(-1, 1);

        const wingFlap = Math.sin(wp.wingPhase);
        const wingTipY = -wingFlap * (wp.size * 0.55);

        ctx.shadowColor = 'rgba(0, 0, 0, 0.22)';
        ctx.shadowBlur = 4;

        ctx.strokeStyle = wp.bodyColor;
        ctx.lineWidth = Math.max(1.8, wp.size * 0.16);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.beginPath();
        ctx.moveTo(-wp.size * 0.9, wingTipY);
        ctx.quadraticCurveTo(-wp.size * 0.4, wingTipY * 0.3 - 2, 0, 0);
        ctx.quadraticCurveTo(wp.size * 0.4, wingTipY * 0.3 - 2, wp.size * 0.9, wingTipY);
        ctx.stroke();

        ctx.fillStyle = wp.bodyColor;
        ctx.beginPath();
        ctx.ellipse(0, 0, wp.size * 0.35, wp.size * 0.16, 0.08, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = wp.neckColor;
        ctx.beginPath();
        ctx.arc(wp.size * 0.22, -wp.size * 0.05, wp.size * 0.09, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = wp.bodyColor;
        ctx.beginPath();
        ctx.arc(wp.size * 0.38, -wp.size * 0.08, wp.size * 0.12, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.moveTo(wp.size * 0.48, -wp.size * 0.08);
        ctx.lineTo(wp.size * 0.60, -wp.size * 0.06);
        ctx.lineTo(wp.size * 0.48, -wp.size * 0.02);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = wp.bodyColor;
        ctx.beginPath();
        ctx.moveTo(-wp.size * 0.3, 0);
        ctx.lineTo(-wp.size * 0.75, wp.size * 0.08);
        ctx.lineTo(-wp.size * 0.25, wp.size * 0.12);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      } else if (wp.type === 'canalWaterGlint') {
        const glow = (Math.sin(wp.pulse) + 1) * 0.5 * 0.75 + 0.25;
        ctx.save();
        ctx.globalAlpha = glow;
        ctx.fillStyle = wp.color;
        ctx.shadowColor = '#fde047';
        ctx.shadowBlur = 8 * glow;
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (wp.type === 'spotlightBeam') {
        const sweepOffset = Math.sin(wp.sweepPhase) * 140;
        const targetX = wp.baseTargetX + sweepOffset;
        const targetY = 800;

        ctx.save();
        const beamGrad = ctx.createLinearGradient(wp.originX, wp.originY, targetX, targetY);
        beamGrad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
        beamGrad.addColorStop(0.2, wp.color);
        beamGrad.addColorStop(0.7, wp.color.replace('0.22', '0.12').replace('0.24', '0.14').replace('0.20', '0.10'));
        beamGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = beamGrad;
        ctx.beginPath();
        ctx.moveTo(wp.originX - wp.widthTop * 0.5, wp.originY);
        ctx.lineTo(wp.originX + wp.widthTop * 0.5, wp.originY);
        ctx.lineTo(targetX + wp.widthBottom * 0.5, targetY);
        ctx.lineTo(targetX - wp.widthBottom * 0.5, targetY);
        ctx.closePath();
        ctx.fill();

        const bulbGlow = ctx.createRadialGradient(wp.originX, Math.max(10, wp.originY), 2, wp.originX, Math.max(10, wp.originY), 32);
        bulbGlow.addColorStop(0, '#ffffff');
        bulbGlow.addColorStop(0.3, 'rgba(254, 240, 138, 0.85)');
        bulbGlow.addColorStop(1, 'rgba(254, 240, 138, 0)');
        ctx.fillStyle = bulbGlow;
        ctx.beginPath();
        ctx.arc(wp.originX, Math.max(10, wp.originY), 32, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      } else if (wp.type === 'spotlightMote') {
        const glow = (Math.sin(wp.pulse) + 1) * 0.5 * 0.75 + 0.25;
        ctx.save();
        ctx.globalAlpha = glow;
        ctx.fillStyle = 'rgba(254, 249, 195, 0.9)';
        ctx.shadowColor = '#facc15';
        ctx.shadowBlur = 8 * glow;
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (wp.type === 'auroraMist') {
        const glow = (Math.sin(wp.pulse) + 1) * 0.5 * 0.4 + 0.8;
        ctx.save();
        ctx.globalAlpha = wp.opacity * glow;
        ctx.fillStyle = wp.color;
        ctx.beginPath();
        ctx.ellipse(wp.x, wp.y, wp.sizeX, wp.sizeY, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (wp.type === 'electricSparkArc') {
        if (wp.state === 'sparking' && wp.segments && wp.segments.length > 1) {
          ctx.save();
          ctx.strokeStyle = wp.color;
          ctx.shadowColor = wp.color;
          ctx.shadowBlur = 14;
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.moveTo(wp.segments[0].x, wp.segments[0].y);
          for (let s = 1; s < wp.segments.length; s++) {
            ctx.lineTo(wp.segments[s].x, wp.segments[s].y);
          }
          ctx.stroke();

          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.0;
          ctx.stroke();
          ctx.restore();
        }
      } else if (wp.type === 'electricSparkFly') {
        ctx.save();
        ctx.globalAlpha = Math.max(0, wp.life);
        ctx.shadowColor = wp.color;
        ctx.shadowBlur = 10;
        ctx.fillStyle = wp.color;
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.size * 0.45, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (wp.type === 'labChemicalBubble') {
        const glow = (Math.sin(wp.pulse) + 1) * 0.5 * 0.3 + 0.7;
        ctx.save();
        ctx.globalAlpha = wp.opacity * glow;
        ctx.strokeStyle = wp.color;
        ctx.shadowColor = wp.color;
        ctx.shadowBlur = 8;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = wp.color;
        ctx.globalAlpha = (wp.opacity * 0.35) * glow;
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = 0.6 * glow;
        ctx.beginPath();
        ctx.arc(wp.x - wp.size * 0.3, wp.y - wp.size * 0.3, wp.size * 0.25, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (wp.type === 'tajMahalPinkLeaf') {
        ctx.save();
        ctx.translate(wp.x, wp.y);
        ctx.rotate(wp.rotation);
        ctx.globalAlpha = wp.opacity;
        ctx.fillStyle = wp.color;

        ctx.beginPath();
        ctx.moveTo(0, -wp.size);
        ctx.bezierCurveTo(wp.size * wp.aspect * 1.5, -wp.size * 0.4, wp.size * wp.aspect * 1.2, wp.size * 0.6, 0, wp.size);
        ctx.bezierCurveTo(-wp.size * wp.aspect * 1.2, wp.size * 0.6, -wp.size * wp.aspect * 1.5, -wp.size * 0.4, 0, -wp.size);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, -wp.size * 0.7);
        ctx.lineTo(0, wp.size * 0.7);
        ctx.stroke();

        ctx.restore();
      } else if (wp.type === 'tajMahalWaterGlint') {
        const glow = (Math.sin(wp.pulse) + 1) * 0.5;
        if (glow > 0.15) {
          ctx.save();
          ctx.globalAlpha = glow * 0.85;
          ctx.fillStyle = wp.color;
          ctx.beginPath();
          ctx.ellipse(wp.x, wp.y, wp.size * 2.2, wp.size * 0.8, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      } else if (wp.type === 'babylonMist') {
        const glow = (Math.sin(wp.pulse) + 1) * 0.5 * 0.35 + 0.75;
        ctx.save();
        ctx.globalAlpha = wp.opacity * glow;
        ctx.fillStyle = wp.color;
        ctx.beginPath();
        ctx.ellipse(wp.x, wp.y, wp.sizeX, wp.sizeY, 0, 0, Math.PI * 2);
        ctx.fill();
        // Inner softer core for organic mist depth
        ctx.fillStyle = 'rgba(255, 255, 255, 0.14)';
        ctx.beginPath();
        ctx.ellipse(wp.x + 8, wp.y - 4, wp.sizeX * 0.62, wp.sizeY * 0.52, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (wp.type === 'babylonWaterSpray') {
        const glow = (Math.sin(wp.pulse) + 1) * 0.5;
        if (glow > 0.1) {
          ctx.save();
          ctx.globalAlpha = glow * 0.85;
          ctx.fillStyle = wp.color;
          ctx.shadowColor = wp.color;
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      } else if (wp.type === 'incomingGoldCoin') {
        const fov = 420;
        const centerX = 1200;
        const centerY = 400;
        const sx = centerX + (wp.x / wp.z) * fov;
        const sy = centerY + (wp.y / wp.z) * fov;

        if (sx >= -140 && sx <= 2540 && sy >= -140 && sy <= 940 && wp.z > 20) {
          const radius = Math.max(3, Math.min(54, (wp.baseRadius / wp.z) * fov));
          const alpha = Math.min(1, Math.max(0.25, (1 - wp.z / 1050) * 1.35));
          const spinScale = Math.max(0.12, Math.abs(Math.cos(wp.spinAngle)));

          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.translate(sx, sy);
          ctx.rotate(wp.rot);

          // Golden Coin Outer Glow
          ctx.shadowColor = '#facc15';
          ctx.shadowBlur = radius * 0.45;

          // Outer Gold Rim / Thickness
          ctx.fillStyle = '#b45309';
          ctx.beginPath();
          ctx.ellipse(0, 0, radius, radius * spinScale, 0, 0, Math.PI * 2);
          ctx.fill();

          // Golden Face Gradient
          const coinGrad = ctx.createRadialGradient(0, -radius * 0.2 * spinScale, 2, 0, 0, radius);
          coinGrad.addColorStop(0, '#ffffff');
          coinGrad.addColorStop(0.2, '#fef08a');
          coinGrad.addColorStop(0.6, '#facc15');
          coinGrad.addColorStop(1, '#ca8a04');
          ctx.fillStyle = coinGrad;
          ctx.beginPath();
          ctx.ellipse(0, 0, radius * 0.94, radius * spinScale * 0.94, 0, 0, Math.PI * 2);
          ctx.fill();

          // Embossed Rim Line
          ctx.strokeStyle = '#eab308';
          ctx.lineWidth = Math.max(1, radius * 0.08);
          ctx.beginPath();
          ctx.ellipse(0, 0, radius * 0.82, radius * spinScale * 0.82, 0, 0, Math.PI * 2);
          ctx.stroke();

          // Ancient Greek Coin Emblem (Zeus Thunderbolt / Star) if coin face is visible
          if (spinScale > 0.42 && radius > 10) {
            ctx.fillStyle = '#b45309';
            ctx.beginPath();
            const boltW = radius * 0.35;
            const boltH = radius * spinScale * 0.55;
            ctx.moveTo(-boltW * 0.4, -boltH);
            ctx.lineTo(boltW * 0.5, -boltH * 0.15);
            ctx.lineTo(0, 0);
            ctx.lineTo(boltW * 0.6, boltH);
            ctx.lineTo(-boltW * 0.5, boltH * 0.15);
            ctx.lineTo(0, 0);
            ctx.closePath();
            ctx.fill();

            if (Math.sin(wp.spinAngle * 2) > 0.7) {
              ctx.fillStyle = '#ffffff';
              ctx.beginPath();
              ctx.arc(radius * 0.65, -radius * spinScale * 0.45, Math.max(1.5, radius * 0.14), 0, Math.PI * 2);
              ctx.fill();
            }
          }

          ctx.restore();
        }
      } else if (wp.type === 'zeusDivineSparkle') {
        const glow = (Math.sin(wp.pulse) + 1) * 0.5;
        if (glow > 0.15) {
          ctx.save();
          ctx.globalAlpha = glow * 0.9;
          ctx.fillStyle = wp.color;
          ctx.shadowColor = '#facc15';
          ctx.shadowBlur = 8 * glow;
          ctx.beginPath();
          ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      } else if (wp.type === 'alexandriaSeaSplash') {
        ctx.save();
        ctx.globalAlpha = Math.max(0, wp.opacity);
        ctx.strokeStyle = '#bae6fd';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.ellipse(wp.x, wp.y, wp.radius * 2, wp.radius * 0.65, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      } else if (wp.type === 'driftingCloudRhodes') {
        ctx.save();
        ctx.globalAlpha = wp.opacity;
        ctx.translate(wp.x, wp.y);
        ctx.scale(wp.scale, wp.scale);

        for (let lobe of wp.lobes) {
          const puffGrad = ctx.createRadialGradient(lobe.dx, lobe.dy - lobe.r * 0.2, lobe.r * 0.2, lobe.dx, lobe.dy, lobe.r);
          puffGrad.addColorStop(0, '#ffffff');
          puffGrad.addColorStop(0.65, 'rgba(254, 252, 232, 0.95)');
          puffGrad.addColorStop(1, 'rgba(254, 243, 199, 0.4)');
          ctx.fillStyle = puffGrad;
          ctx.beginPath();
          ctx.arc(lobe.dx, lobe.dy, lobe.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      } else if (wp.type === 'rhodesSunMote') {
        const glow = (Math.sin(wp.pulse) + 1) * 0.5;
        if (glow > 0.15) {
          ctx.save();
          ctx.globalAlpha = glow * 0.85;
          ctx.fillStyle = wp.color;
          ctx.shadowColor = '#facc15';
          ctx.shadowBlur = 6 * glow;
          ctx.beginPath();
          ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      } else if (wp.type === 'spotlightBeamArtemis') {
        ctx.save();
        ctx.translate(wp.baseX, wp.baseY);
        const rotAngle = wp.fromAbove ? (Math.PI / 2 + wp.currentAngle) : (-Math.PI / 2 + wp.currentAngle);
        ctx.rotate(rotAngle);

        const beamGrad = ctx.createLinearGradient(0, 0, wp.length, 0);
        beamGrad.addColorStop(0, 'rgba(255, 255, 255, 0.55)');
        beamGrad.addColorStop(0.12, wp.color);
        beamGrad.addColorStop(0.55, wp.color);
        beamGrad.addColorStop(0.85, 'rgba(254, 240, 138, 0.12)');
        beamGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = beamGrad;
        ctx.beginPath();
        ctx.moveTo(0, -14);
        ctx.lineTo(wp.length, -wp.widthTop * 0.5);
        ctx.lineTo(wp.length, wp.widthTop * 0.5);
        ctx.lineTo(0, 14);
        ctx.closePath();
        ctx.fill();

        // Glowing spotlight lens emitter at the top origin
        if (wp.fromAbove) {
          const lensGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, 36);
          lensGrad.addColorStop(0, '#ffffff');
          lensGrad.addColorStop(0.4, wp.color);
          lensGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = lensGrad;
          ctx.beginPath();
          ctx.arc(0, 0, 36, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      } else if (wp.type === 'spotlightMoteArtemis') {
        const glow = (Math.sin(wp.pulse) + 1) * 0.5;
        if (glow > 0.12) {
          ctx.save();
          ctx.globalAlpha = glow * 0.9;
          ctx.fillStyle = wp.color;
          ctx.shadowColor = '#fef08a';
          ctx.shadowBlur = 8 * glow;
          ctx.beginPath();
          ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      } else if (wp.type === 'fallingStarHalicarnassus') {
        const twinkle = (Math.sin(wp.pulse) + 1) * 0.5 * 0.75 + 0.25;
        const starSize = wp.size * (0.8 + twinkle * 0.45);
        ctx.save();
        ctx.translate(wp.x, wp.y);
        ctx.rotate(wp.rot);

        // Sternen-Aura mit sanftem Schein
        ctx.shadowColor = wp.color;
        ctx.shadowBlur = 12 * twinkle;

        // Feiner zarter Schweif/Glitzerstaub nach oben (da der Stern nach unten gleitet)
        ctx.fillStyle = wp.color;
        ctx.globalAlpha = twinkle * 0.35;
        ctx.beginPath();
        ctx.moveTo(-starSize * 0.4, 0);
        ctx.lineTo(starSize * 0.4, 0);
        ctx.lineTo(0, -starSize * 2.4);
        ctx.closePath();
        ctx.fill();

        // 4-zackiger funkelnder Stern (Shimmering 4-Point Star)
        ctx.globalAlpha = Math.min(1, twinkle * 1.15);
        ctx.fillStyle = wp.color;
        const outerR = starSize * 1.6;
        const innerR = starSize * 0.38;
        ctx.beginPath();
        for (let p = 0; p < 8; p++) {
          const r = p % 2 === 0 ? outerR : innerR;
          const angle = (p * Math.PI) / 4;
          const px = Math.cos(angle) * r;
          const py = Math.sin(angle) * r;
          if (p === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();

        // Brillanter weißer Kern im Zentrum
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, starSize * 0.42, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      } else if (wp.type === 'chichenJungleLeaf') {
        ctx.save();
        ctx.translate(wp.x, wp.y);
        ctx.rotate(wp.rotation);
        ctx.globalAlpha = wp.opacity;
        ctx.fillStyle = wp.color;

        ctx.beginPath();
        ctx.moveTo(0, -wp.size);
        ctx.bezierCurveTo(wp.size * wp.aspect * 1.6, -wp.size * 0.4, wp.size * wp.aspect * 1.3, wp.size * 0.6, 0, wp.size);
        ctx.bezierCurveTo(-wp.size * wp.aspect * 1.3, wp.size * 0.6, -wp.size * wp.aspect * 1.6, -wp.size * 0.4, 0, -wp.size);
        ctx.closePath();
        ctx.fill();

        // Central leaf vein
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, -wp.size * 0.75);
        ctx.lineTo(0, wp.size * 0.75);
        ctx.stroke();

        ctx.restore();
      } else if (wp.type === 'chichenJungleMote') {
        const glow = (Math.sin(wp.pulse) + 1) * 0.5;
        if (glow > 0.15) {
          ctx.save();
          ctx.globalAlpha = glow * 0.85;
          ctx.fillStyle = wp.color;
          ctx.shadowColor = '#84cc16';
          ctx.shadowBlur = 6 * glow;
          ctx.beginPath();
          ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      } else if (wp.type === 'denseDriftingCloudRio') {
        ctx.save();
        ctx.globalAlpha = wp.opacity;
        ctx.translate(wp.x, wp.y);
        ctx.scale(wp.scale, wp.scale);

        for (let lobe of wp.lobes) {
          const puffGrad = ctx.createRadialGradient(
            lobe.dx - lobe.r * 0.2, lobe.dy - lobe.r * 0.25, lobe.r * 0.15,
            lobe.dx, lobe.dy, lobe.r
          );
          puffGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');    // Weißer Sonnenrand
          puffGrad.addColorStop(0.55, 'rgba(241, 245, 249, 0.60)'); // Zarter, transparenter Wolkenkörper
          puffGrad.addColorStop(0.85, 'rgba(203, 213, 225, 0.30)'); // Sanft auslaufender Schatten
          puffGrad.addColorStop(1.0, 'rgba(148, 163, 184, 0.0)');   // Vollkommen weicher Übergang
          ctx.fillStyle = puffGrad;
          ctx.beginPath();
          ctx.arc(lobe.dx, lobe.dy, lobe.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      } else if (wp.type === 'rioMountainMist') {
        const glow = (Math.sin(wp.pulse) + 1) * 0.5;
        if (glow > 0.15) {
          ctx.save();
          ctx.globalAlpha = glow * 0.8;
          ctx.fillStyle = wp.color;
          ctx.shadowColor = '#ffffff';
          ctx.shadowBlur = 6 * glow;
          ctx.beginPath();
          ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      } else if (wp.type === 'greatWallLightning') {
        if (wp.state === 'striking' && wp.segments && wp.segments.length > 0) {
          const flicker = Math.random() > 0.15 ? 1 : 0.45;
          ctx.save();
          ctx.shadowColor = wp.color === '#fef08a' ? '#facc15' : '#38bdf8';
          ctx.shadowBlur = 24 * flicker;

          for (let seg of wp.segments) {
            ctx.strokeStyle = seg.isBranch ? 'rgba(224, 242, 254, 0.85)' : '#ffffff';
            ctx.lineWidth = seg.isBranch ? 2.2 : 4.6;
            ctx.beginPath();
            ctx.moveTo(seg.x1, seg.y1);
            ctx.lineTo(seg.x2, seg.y2);
            ctx.stroke();

            if (!seg.isBranch) {
              ctx.strokeStyle = wp.color;
              ctx.lineWidth = 1.8;
              ctx.stroke();
            }
          }
          ctx.restore();
        }
      } else if (wp.type === 'greatWallMist') {
        ctx.save();
        ctx.fillStyle = `rgba(241, 245, 249, ${wp.opacity})`;
        ctx.beginPath();
        ctx.ellipse(wp.x, wp.y, wp.sizeX, wp.sizeY, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (wp.type === 'greatWallSpark') {
        const glow = (Math.sin(wp.pulse) + 1) * 0.5;
        if (glow > 0.15) {
          ctx.save();
          ctx.globalAlpha = glow * 0.85;
          ctx.fillStyle = wp.color;
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 7 * glow;
          ctx.beginPath();
          ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      } else if (wp.type === 'machuAndeanMist') {
        ctx.save();
        ctx.fillStyle = `rgba(241, 245, 249, ${wp.opacity})`;
        ctx.beginPath();
        ctx.ellipse(wp.x, wp.y, wp.sizeX, wp.sizeY, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (wp.type === 'petraSandGrain') {
        ctx.save();
        ctx.strokeStyle = wp.color;
        ctx.globalAlpha = wp.opacity;
        ctx.lineWidth = wp.width;
        ctx.beginPath();
        ctx.moveTo(wp.x, wp.y);
        ctx.lineTo(wp.x - wp.len, wp.y - wp.vy * 0.8);
        ctx.stroke();
        ctx.restore();
      } else if (wp.type === 'petraSandGust') {
        ctx.save();
        const currentAlpha = wp.opacity * (0.8 + Math.sin(wp.pulse) * 0.2);
        const grad = ctx.createRadialGradient(wp.x, wp.y, 0, wp.x, wp.y, wp.sizeX);
        grad.addColorStop(0, `${wp.color}${currentAlpha})`);
        grad.addColorStop(0.5, `${wp.color}${currentAlpha * 0.5})`);
        grad.addColorStop(1, `${wp.color}0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(wp.x, wp.y, wp.sizeX, wp.sizeY, 0.06, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (wp.type === 'libertySparkle') {
        if (wp.state === 'sparking') {
          const progress = wp.age / wp.maxAge;
          const alpha = Math.sin(progress * Math.PI);
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.fillStyle = wp.color;
          ctx.shadowColor = wp.color;
          ctx.shadowBlur = 10 * alpha;

          // Glänzender Kern
          ctx.beginPath();
          ctx.arc(wp.x, wp.y, wp.size * (0.75 + alpha * 0.35), 0, Math.PI * 2);
          ctx.fill();

          // Zarte 4-zackige Sternenstrahlen (Sparkle-Flare)
          const rayLen = wp.size * (1.8 + alpha * 1.5);
          ctx.strokeStyle = wp.color;
          ctx.lineWidth = 1.0;
          ctx.beginPath();
          ctx.moveTo(wp.x - rayLen, wp.y);
          ctx.lineTo(wp.x + rayLen, wp.y);
          ctx.moveTo(wp.x, wp.y - rayLen);
          ctx.lineTo(wp.x, wp.y + rayLen);
          ctx.stroke();

          ctx.restore();
        }
      } else if (wp.type === 'eiffelSpotlightBeam') {
        ctx.save();
        ctx.translate(wp.baseX, wp.baseY);
        const rotAngle = Math.PI / 2 + wp.currentAngle;
        ctx.rotate(rotAngle);

        const beamGrad = ctx.createLinearGradient(0, 0, wp.length, 0);
        beamGrad.addColorStop(0, 'rgba(255, 255, 255, 0.65)');
        beamGrad.addColorStop(0.12, wp.color);
        beamGrad.addColorStop(0.60, wp.color);
        beamGrad.addColorStop(0.85, 'rgba(254, 240, 138, 0.12)');
        beamGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = beamGrad;
        ctx.beginPath();
        ctx.moveTo(0, -16);
        ctx.lineTo(wp.length, -wp.widthTop * 0.5);
        ctx.lineTo(wp.length, wp.widthTop * 0.5);
        ctx.lineTo(0, 16);
        ctx.closePath();
        ctx.fill();

        // Leuchtende Scheinwerfer-Linse an der Spitze/Quelle
        const lensGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, 38);
        lensGrad.addColorStop(0, '#ffffff');
        lensGrad.addColorStop(0.35, '#fef08a');
        lensGrad.addColorStop(0.65, wp.color);
        lensGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = lensGrad;
        ctx.beginPath();
        ctx.arc(0, 0, 38, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      } else if (wp.type === 'eiffelLightMote') {
        const glow = (Math.sin(wp.pulse) + 1) * 0.5;
        if (glow > 0.10) {
          ctx.save();
          ctx.globalAlpha = glow * 0.9;
          ctx.fillStyle = wp.color;
          ctx.shadowColor = '#fef08a';
          ctx.shadowBlur = 8 * glow;
          ctx.beginPath();
          ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      } else if (wp.type === 'stonehengeDenseFog' || wp.type === 'stonehengeMistWisp') {
        ctx.save();
        const currentAlpha = wp.opacity * (0.8 + Math.sin(wp.pulse) * 0.2);
        const grad = ctx.createRadialGradient(wp.x, wp.y, 0, wp.x, wp.y, wp.sizeX);
        grad.addColorStop(0, `${wp.color}${currentAlpha})`);
        grad.addColorStop(0.45, `${wp.color}${currentAlpha * 0.65})`);
        grad.addColorStop(0.80, `${wp.color}${currentAlpha * 0.25})`);
        grad.addColorStop(1, `${wp.color}0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(wp.x, wp.y, wp.sizeX, wp.sizeY, 0.02, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (wp.type === 'easterIslandLightning') {
        if (wp.state === 'striking' && wp.segments && wp.segments.length > 0) {
          const flicker = Math.random() > 0.15 ? 1 : 0.45;
          ctx.save();
          ctx.shadowColor = wp.color === '#fef08a' ? '#facc15' : '#38bdf8';
          ctx.shadowBlur = 26 * flicker;

          for (let seg of wp.segments) {
            ctx.strokeStyle = seg.isBranch ? 'rgba(224, 242, 254, 0.85)' : '#ffffff';
            ctx.lineWidth = seg.isBranch ? 2.4 : 4.8;
            ctx.beginPath();
            ctx.moveTo(seg.x1, seg.y1);
            ctx.lineTo(seg.x2, seg.y2);
            ctx.stroke();

            if (!seg.isBranch) {
              ctx.strokeStyle = wp.color;
              ctx.lineWidth = 1.8;
              ctx.stroke();
            }
          }
          ctx.restore();
        }
      } else if (wp.type === 'easterIslandMist') {
        ctx.save();
        ctx.fillStyle = `rgba(241, 245, 249, ${wp.opacity * (0.8 + Math.sin(wp.pulse) * 0.2)})`;
        ctx.beginPath();
        ctx.ellipse(wp.x, wp.y, wp.sizeX, wp.sizeY, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (wp.type === 'towerBridgeSpotlightBeam') {
        ctx.save();
        ctx.translate(wp.baseX, wp.baseY);
        // Nach oben in den Himmel strahlen (Winkel um -PI/2)
        const rotAngle = -Math.PI / 2 + wp.currentAngle;
        ctx.rotate(rotAngle);

        const beamGrad = ctx.createLinearGradient(0, 0, wp.length, 0);
        beamGrad.addColorStop(0, 'rgba(255, 255, 255, 0.65)');
        beamGrad.addColorStop(0.12, wp.color);
        beamGrad.addColorStop(0.60, wp.color);
        beamGrad.addColorStop(0.85, 'rgba(254, 240, 138, 0.10)');
        beamGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = beamGrad;
        ctx.beginPath();
        ctx.moveTo(0, -18);
        ctx.lineTo(wp.length, -wp.widthTop * 0.5);
        ctx.lineTo(wp.length, wp.widthTop * 0.5);
        ctx.lineTo(0, 18);
        ctx.closePath();
        ctx.fill();

        // Leuchtende Scheinwerfer-Basis
        const lensGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, 36);
        lensGrad.addColorStop(0, '#ffffff');
        lensGrad.addColorStop(0.35, '#fef08a');
        lensGrad.addColorStop(0.65, wp.color);
        lensGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = lensGrad;
        ctx.beginPath();
        ctx.arc(0, 0, 36, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      } else if (wp.type === 'towerBridgeLightMote') {
        const glow = (Math.sin(wp.pulse) + 1) * 0.5;
        if (glow > 0.10) {
          ctx.save();
          ctx.globalAlpha = glow * 0.88;
          ctx.fillStyle = wp.color;
          ctx.shadowColor = '#fef08a';
          ctx.shadowBlur = 8 * glow;
          ctx.beginPath();
          ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      } else if (wp.type === 'grazerUhrturmCloud') {
        ctx.save();
        ctx.globalAlpha = wp.opacity;
        ctx.translate(wp.x, wp.y);
        ctx.scale(wp.scale, wp.scale);

        for (let lobe of wp.lobes) {
          const puffGrad = ctx.createRadialGradient(
            lobe.dx - lobe.r * 0.22, lobe.dy - lobe.r * 0.28, lobe.r * 0.12,
            lobe.dx, lobe.dy, lobe.r
          );
          puffGrad.addColorStop(0, 'rgba(255, 255, 255, 0.96)');    // Strahlend weißer Wolken-Highlight
          puffGrad.addColorStop(0.55, 'rgba(248, 250, 255, 0.84)'); // Schöner, flauschiger weißer Wolkenkörper
          puffGrad.addColorStop(0.84, 'rgba(215, 228, 242, 0.38)'); // Zarter Schatten an der Wolkenunterseite
          puffGrad.addColorStop(1.0, 'rgba(180, 205, 230, 0.0)');   // Vollkommen weich auslaufende Kante
          ctx.fillStyle = puffGrad;
          ctx.beginPath();
          ctx.arc(lobe.dx, lobe.dy, lobe.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      } else if (wp.type === 'incomingWarpStar') {
        const fov = 420;
        const centerX = 1200;
        const centerY = 400;
        const sx = centerX + (wp.x / wp.z) * fov;
        const sy = centerY + (wp.y / wp.z) * fov;

        if (sx >= -80 && sx <= 2480 && sy >= -80 && sy <= 880) {
          const depthRatio = 1 - (wp.z / 1000);
          const currentSize = Math.max(0.8, Math.min(8.0, (wp.baseSize / wp.z) * fov));
          const alpha = Math.min(1, Math.max(0.20, depthRatio * 1.4));

          const prevZ = wp.prevZ || (wp.z + wp.speed * 1.8);
          const px = centerX + (wp.x / prevZ) * fov;
          const py = centerY + (wp.y / prevZ) * fov;

          ctx.save();
          ctx.globalAlpha = alpha;

          // Schweif-Streifen beim Vorbeirasen
          ctx.strokeStyle = wp.color;
          ctx.lineWidth = Math.max(0.8, currentSize * 0.7);
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(sx, sy);
          ctx.stroke();

          // Stern-Kern
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = wp.color;
          ctx.shadowBlur = Math.min(16, currentSize * 2.5);
          ctx.beginPath();
          ctx.arc(sx, sy, currentSize, 0, Math.PI * 2);
          ctx.fill();

          // Glanz-Kreuz bei nahen Sternen
          if (currentSize > 4.2) {
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1;
            const arm = currentSize * 1.8;
            ctx.beginPath();
            ctx.moveTo(sx - arm, sy);
            ctx.lineTo(sx + arm, sy);
            ctx.moveTo(sx, sy - arm);
            ctx.lineTo(sx, sy + arm);
            ctx.stroke();
          }
          ctx.restore();
        }
      } else if (wp.type === 'cosmicDustGlow') {
        const glow = (Math.sin(wp.pulse) + 1) * 0.5;
        ctx.save();
        ctx.globalAlpha = 0.25 + glow * 0.55;
        ctx.fillStyle = wp.color;
        ctx.shadowColor = wp.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let p of this.particles) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.life);

      if (p.type === 'feather') {
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.35, 0, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'smoke') {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'spark') {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    for (let pop of this.scorePopups) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, pop.life);
      ctx.translate(pop.x, pop.y);
      ctx.scale(pop.scale, pop.scale);

      ctx.font = `900 ${pop.fontSize}px "Outfit", "Arial Black", sans-serif`;
      ctx.textAlign = 'center';
      
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 5;
      ctx.strokeText(pop.text, 0, 0);

      ctx.fillStyle = pop.color;
      ctx.shadowColor = pop.color;
      ctx.shadowBlur = 10;
      ctx.fillText(pop.text, 0, 0);

      ctx.restore();
    }

    // Kurzzeitige helle Überblendung bei Blitzeinschlägen (Lightning Screen Overblend)
    if (this.screenFlashAlpha > 0.02) {
      ctx.save();
      ctx.fillStyle = `rgba(240, 249, 255, ${Math.min(0.85, this.screenFlashAlpha)})`;
      ctx.fillRect(-200, -200, 3200, 1400);
      ctx.restore();
      this.screenFlashAlpha *= 0.72;
    }

    ctx.restore();
  }
}
