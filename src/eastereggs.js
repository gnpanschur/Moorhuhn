// Interactive Scenery & Secret Easter Eggs Manager
export class EasterEggManager {
  constructor() {
    this.eggs = [];
    this.windmillBladesHit = 0;
    this.cabinSmokeHits = 0;
    this.coconutsShot = 0;
  }

  initLevel(theme, virtualWidth, screenHeight) {
    this.eggs = [];
    this.windmillBladesHit = 0;
    this.cabinSmokeHits = 0;
    this.coconutsShot = 0;

    if (theme === 'summer') {
      this.eggs.push({
        id: 'windmill',
        x: 350, y: screenHeight * 0.45, radius: 100,
        hits: 0, maxHits: 3,
        reward: 200, popupText: 'WINDMÜHLEN-STURM! +200'
      });
      this.eggs.push({
        id: 'scarecrow',
        x: 1200, y: screenHeight * 0.72, radius: 90,
        hits: 0, maxHits: 2,
        reward: 100, popupText: 'VOGELSCHEUCHE! +100'
      });
      this.eggs.push({
        id: 'outhouse',
        x: 1850, y: screenHeight * 0.76, radius: 90,
        hits: 0, maxHits: 1,
        reward: 75, popupText: 'PLUMPSKLO-HUHN! +75'
      });
    } else if (theme === 'winter') {
      this.eggs.push({
        id: 'snowman',
        x: 500, y: screenHeight * 0.72, radius: 95,
        hits: 0, maxHits: 3,
        reward: 150, popupText: 'SCHNEEMANN-BOMBE! +150'
      });
      this.eggs.push({
        id: 'chimney',
        x: 1550, y: screenHeight * 0.48, radius: 85,
        hits: 0, maxHits: 3,
        reward: 200, popupText: 'WEIHNACHTS-HUHN! +200'
      });
    } else if (theme === 'beach') {
      this.eggs.push({
        id: 'coconuts',
        x: 610, y: screenHeight * 0.42, radius: 95,
        hits: 0, maxHits: 3,
        reward: 120, popupText: 'KOKOSNUSS-BONUS! +120'
      });
      this.eggs.push({
        id: 'bottle',
        x: 1400, y: screenHeight * 0.62, radius: 85,
        hits: 0, maxHits: 1,
        reward: 100, popupText: 'FLASCHENPOST! +100'
      });
    } else if (theme === 'forest') {
      this.eggs.push({
        id: 'hollowtree',
        x: 720, y: screenHeight * 0.6, radius: 100,
        hits: 0, maxHits: 1,
        reward: 125, popupText: 'BAUMHÖHLEN-EULE! +125'
      });
      this.eggs.push({
        id: 'mushroom',
        x: 1600, y: screenHeight * 0.8, radius: 90,
        hits: 0, maxHits: 1,
        reward: 80, popupText: 'ZAUBERPILZ! +80'
      });
    } else if (theme === 'spooky') {
      this.eggs.push({
        id: 'tombstone',
        x: 350, y: screenHeight * 0.76, radius: 95,
        hits: 0, maxHits: 1,
        reward: 250, popupText: 'GEISTER-BESCHWÖRUNG! +250'
      });
      this.eggs.push({
        id: 'weathervane',
        x: 770, y: screenHeight * 0.25, radius: 85,
        hits: 0, maxHits: 1,
        reward: 100, popupText: 'WETTERHAHN! +100'
      });
    } else if (theme === 'aquarium') {
      this.eggs.push({
        id: 'shipwreck',
        x: 450, y: screenHeight * 0.65, radius: 110,
        hits: 0, maxHits: 3,
        reward: 200, popupText: 'PIRATEN-SCHATZ! +200'
      });
      this.eggs.push({
        id: 'anemone',
        x: 1750, y: screenHeight * 0.75, radius: 95,
        hits: 0, maxHits: 1,
        reward: 150, popupText: 'KORALLEN-HUHN! +150'
      });
    } else if (theme === 'city') {
      this.eggs.push({
        id: 'billboard',
        x: 1400, y: screenHeight * 0.3, radius: 100,
        hits: 0, maxHits: 3,
        reward: 250, popupText: 'METROPOLIS-NEON! +250'
      });
      this.eggs.push({
        id: 'bridgetower',
        x: 950, y: screenHeight * 0.55, radius: 90,
        hits: 0, maxHits: 1,
        reward: 150, popupText: 'BRÜCKEN-LICHT! +150'
      });
    } else if (theme === 'farm') {
      this.eggs.push({
        id: 'tractor',
        x: 1620, y: screenHeight * 0.76, radius: 110,
        hits: 0, maxHits: 3,
        reward: 225, popupText: 'TRAKTOR-MOTOR! +225'
      });
      this.eggs.push({
        id: 'haybales',
        x: 420, y: screenHeight * 0.72, radius: 100,
        hits: 0, maxHits: 2,
        reward: 150, popupText: 'HEUHAUFEN-HUHN! +150'
      });
      this.eggs.push({
        id: 'barnvane',
        x: 540, y: screenHeight * 0.22, radius: 85,
        hits: 0, maxHits: 1,
        reward: 175, popupText: 'GOLDENER WETTERHAHN! +175'
      });
    } else if (theme === 'castle') {
      this.eggs.push({
        id: 'castlebell',
        x: 1280, y: screenHeight * 0.42, radius: 100,
        hits: 0, maxHits: 3,
        reward: 250, popupText: 'BURGTOR-GLOCKE! +250'
      });
      this.eggs.push({
        id: 'knightarmor',
        x: 1720, y: screenHeight * 0.48, radius: 90,
        hits: 0, maxHits: 2,
        reward: 180, popupText: 'RITTERRÜSTUNG-BONUS! +180'
      });
      this.eggs.push({
        id: 'dragonshield',
        x: 1450, y: screenHeight * 0.32, radius: 90,
        hits: 0, maxHits: 1,
        reward: 200, popupText: 'DRACHEN-WAPPEN! +200'
      });
    } else if (theme === 'egypt') {
      this.eggs.push({
        id: 'sphinx',
        x: 350, y: screenHeight * 0.42, radius: 110,
        hits: 0, maxHits: 3,
        reward: 300, popupText: 'SPHINX-RÄTSEL! +300'
      });
      this.eggs.push({
        id: 'pyramidtop',
        x: 1240, y: screenHeight * 0.28, radius: 100,
        hits: 0, maxHits: 2,
        reward: 200, popupText: 'PYRAMIDEN-SPITZE! +200'
      });
      this.eggs.push({
        id: 'obelisk',
        x: 1850, y: screenHeight * 0.52, radius: 90,
        hits: 0, maxHits: 1,
        reward: 250, popupText: 'OBELISKEN-SCHATZ! +250'
      });
    } else if (theme === 'rome') {
      this.eggs.push({
        id: 'colosseum',
        x: 880, y: screenHeight * 0.35, radius: 120,
        hits: 0, maxHits: 3,
        reward: 350, popupText: 'KOLOSSEUM-TRIUMPH! +350'
      });
      this.eggs.push({
        id: 'caesar',
        x: 1400, y: screenHeight * 0.72, radius: 95,
        hits: 0, maxHits: 2,
        reward: 220, popupText: 'CAESAR-KRANZ! +220'
      });
      this.eggs.push({
        id: 'spqreagle',
        x: 1620, y: screenHeight * 0.55, radius: 95,
        hits: 0, maxHits: 1,
        reward: 280, popupText: 'SPQR-ADLER! +280'
      });
    } else if (theme === 'gaul') {
      this.eggs.push({
        id: 'cauldron',
        x: 1300, y: screenHeight * 0.64, radius: 110,
        hits: 0, maxHits: 3,
        reward: 400, popupText: 'ZAUBERTRANK-KESSEL! +400'
      });
      this.eggs.push({
        id: 'wildboar',
        x: 1620, y: screenHeight * 0.76, radius: 100,
        hits: 0, maxHits: 2,
        reward: 300, popupText: 'WILDSCHWEIN-SPIESS! +300'
      });
      this.eggs.push({
        id: 'menhir',
        x: 1040, y: screenHeight * 0.70, radius: 90,
        hits: 0, maxHits: 1,
        reward: 350, popupText: 'HÜTTEN-MENHIR! +350'
      });
    } else if (theme === 'palace') {
      // Imperial Crown (Central Golden Palace Domes)
      this.eggs.push({
        id: 'empresscrown',
        x: 1200, y: screenHeight * 0.25, radius: 140,
        hits: 0, maxHits: 3,
        reward: 450, popupText: 'KAISERIN-KRONE! +450'
      });
      // Left Palace Fountain
      this.eggs.push({
        id: 'palacefountain',
        x: 750, y: screenHeight * 0.65, radius: 120,
        hits: 0, maxHits: 2,
        reward: 350, popupText: 'PALAST-FOUNTAIN! +350'
      });
      // Right Palace Fountain / Statue
      this.eggs.push({
        id: 'phoenixstatue',
        x: 1850, y: screenHeight * 0.60, radius: 120,
        hits: 0, maxHits: 1,
        reward: 400, popupText: 'GOLDENE PHÖNIX-STATUE! +400'
      });
    }
  }

  renderHints(ctx, animTime) {
    for (let egg of this.eggs) {
      if (egg.hits >= egg.maxHits) continue;

      ctx.save();
      const pulse = (Math.sin(animTime * 3.5 + egg.x * 0.01) + 1) * 0.5;
      const alpha = 0.3 + pulse * 0.45;

      // Soft Golden Shimmer Ring
      ctx.strokeStyle = `rgba(255, 215, 0, ${alpha})`;
      ctx.lineWidth = 3;
      ctx.shadowColor = '#ffd700';
      ctx.shadowBlur = 14;

      ctx.beginPath();
      ctx.arc(egg.x, egg.y, egg.radius * (0.65 + pulse * 0.15), 0, Math.PI * 2);
      ctx.stroke();

      // Golden Star Sparkle Center
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha + 0.25})`;
      ctx.beginPath();
      ctx.arc(egg.x, egg.y, 4 + pulse * 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  checkShot(shotX, shotY) {
    for (let egg of this.eggs) {
      if (egg.hits >= egg.maxHits) continue;

      const dx = shotX - egg.x;
      const dy = shotY - egg.y;
      if (Math.sqrt(dx * dx + dy * dy) <= egg.radius) {
        egg.hits += 1;
        if (egg.hits >= egg.maxHits) {
          return {
            triggered: true,
            id: egg.id,
            reward: egg.reward,
            popupText: egg.popupText,
            x: egg.x,
            y: egg.y
          };
        } else {
          return {
            triggered: false,
            partial: true,
            x: egg.x,
            y: egg.y
          };
        }
      }
    }
    return false;
  }
}
