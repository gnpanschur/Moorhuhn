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
        x: 350, y: screenHeight * 0.45, radius: 45,
        hits: 0, maxHits: 4,
        reward: 200, popupText: 'WINDMÜHLEN-STURM! +200'
      });
      this.eggs.push({
        id: 'scarecrow',
        x: 1200, y: screenHeight * 0.72, radius: 30,
        hits: 0, maxHits: 2,
        reward: 100, popupText: 'VOGELSCHEUCHE! +100'
      });
      this.eggs.push({
        id: 'outhouse',
        x: 1850, y: screenHeight * 0.76, radius: 35,
        hits: 0, maxHits: 1,
        reward: 75, popupText: 'PLUMPSKLO-HUHN! +75'
      });
    } else if (theme === 'winter') {
      this.eggs.push({
        id: 'snowman',
        x: 500, y: screenHeight * 0.72, radius: 35,
        hits: 0, maxHits: 3,
        reward: 150, popupText: 'SCHNEEMANN-BOMBE! +150'
      });
      this.eggs.push({
        id: 'chimney',
        x: 1550, y: screenHeight * 0.48, radius: 25,
        hits: 0, maxHits: 3,
        reward: 200, popupText: 'WEIHNACHTS-HUHN! +200'
      });
    } else if (theme === 'beach') {
      this.eggs.push({
        id: 'coconuts',
        x: 610, y: screenHeight * 0.42, radius: 30,
        hits: 0, maxHits: 3,
        reward: 120, popupText: 'KOKOSNUSS-BONUS! +120'
      });
      this.eggs.push({
        id: 'bottle',
        x: 1400, y: screenHeight * 0.62, radius: 20,
        hits: 0, maxHits: 1,
        reward: 100, popupText: 'FLASCHENPOST! +100'
      });
    } else if (theme === 'forest') {
      this.eggs.push({
        id: 'hollowtree',
        x: 720, y: screenHeight * 0.6, radius: 40,
        hits: 0, maxHits: 1,
        reward: 125, popupText: 'BAUMHÖHLEN-EULE! +125'
      });
      this.eggs.push({
        id: 'mushroom',
        x: 1600, y: screenHeight * 0.8, radius: 25,
        hits: 0, maxHits: 1,
        reward: 80, popupText: 'ZAUBERPILZ! +80'
      });
    } else if (theme === 'spooky') {
      this.eggs.push({
        id: 'tombstone',
        x: 350, y: screenHeight * 0.76, radius: 35,
        hits: 0, maxHits: 1,
        reward: 250, popupText: 'GEISTER-BESCHWÖRUNG! +250'
      });
      this.eggs.push({
        id: 'weathervane',
        x: 770, y: screenHeight * 0.25, radius: 25,
        hits: 0, maxHits: 1,
        reward: 100, popupText: 'WETTERHAHN! +100'
      });
    } else if (theme === 'aquarium') {
      this.eggs.push({
        id: 'shipwreck',
        x: 450, y: screenHeight * 0.65, radius: 60,
        hits: 0, maxHits: 3,
        reward: 200, popupText: 'PIRATEN-SCHATZ! +200'
      });
      this.eggs.push({
        id: 'anemone',
        x: 1750, y: screenHeight * 0.75, radius: 40,
        hits: 0, maxHits: 1,
        reward: 150, popupText: 'KORALLEN-HUHN! +150'
      });
    } else if (theme === 'city') {
      // Skyscraper Neon Billboard
      this.eggs.push({
        id: 'billboard',
        x: 1400, y: screenHeight * 0.3, radius: 55,
        hits: 0, maxHits: 3,
        reward: 250, popupText: 'METROPOLIS-NEON! +250'
      });
      // Suspension Bridge Tower Light
      this.eggs.push({
        id: 'bridgetower',
        x: 950, y: screenHeight * 0.55, radius: 40,
        hits: 0, maxHits: 1,
        reward: 150, popupText: 'BRÜCKEN-LICHT! +150'
      });
    } else if (theme === 'farm') {
      // Tractor Motor secret
      this.eggs.push({
        id: 'tractor',
        x: 1620, y: screenHeight * 0.76, radius: 55,
        hits: 0, maxHits: 3,
        reward: 225, popupText: 'TRAKTOR-MOTOR! +225'
      });
      // Haybale chicken secret
      this.eggs.push({
        id: 'haybales',
        x: 420, y: screenHeight * 0.72, radius: 50,
        hits: 0, maxHits: 2,
        reward: 150, popupText: 'HEUHAUFEN-HUHN! +150'
      });
      // Barn Weather Vane Rooster
      this.eggs.push({
        id: 'barnvane',
        x: 540, y: screenHeight * 0.22, radius: 35,
        hits: 0, maxHits: 1,
        reward: 175, popupText: 'GOLDENER WETTERHAHN! +175'
      });
    } else if (theme === 'castle') {
      // Castle Gate Bell
      this.eggs.push({
        id: 'castlebell',
        x: 1280, y: screenHeight * 0.42, radius: 45,
        hits: 0, maxHits: 3,
        reward: 250, popupText: 'BURGTOR-GLOCKE! +250'
      });
      // Knight Armor Bonus
      this.eggs.push({
        id: 'knightarmor',
        x: 1720, y: screenHeight * 0.48, radius: 35,
        hits: 0, maxHits: 2,
        reward: 180, popupText: 'RITTERRÜSTUNG-BONUS! +180'
      });
      // Dragon Shield Emblem
      this.eggs.push({
        id: 'dragonshield',
        x: 1450, y: screenHeight * 0.32, radius: 40,
        hits: 0, maxHits: 1,
        reward: 200, popupText: 'DRACHEN-WAPPEN! +200'
      });
    } else if (theme === 'egypt') {
      // Great Sphinx Secret
      this.eggs.push({
        id: 'sphinx',
        x: 350, y: screenHeight * 0.42, radius: 55,
        hits: 0, maxHits: 3,
        reward: 300, popupText: 'SPHINX-RÄTSEL! +300'
      });
      // Pyramid Capstone
      this.eggs.push({
        id: 'pyramidtop',
        x: 1240, y: screenHeight * 0.28, radius: 45,
        hits: 0, maxHits: 2,
        reward: 200, popupText: 'PYRAMIDEN-SPITZE! +200'
      });
      // Hieroglyphic Obelisk
      this.eggs.push({
        id: 'obelisk',
        x: 1850, y: screenHeight * 0.52, radius: 40,
        hits: 0, maxHits: 1,
        reward: 250, popupText: 'OBELISKEN-SCHATZ! +250'
      });
    } else if (theme === 'rome') {
      // Roman Colosseum
      this.eggs.push({
        id: 'colosseum',
        x: 880, y: screenHeight * 0.35, radius: 60,
        hits: 0, maxHits: 3,
        reward: 350, popupText: 'KOLOSSEUM-TRIUMPH! +350'
      });
      // Caesar Statue Laurel
      this.eggs.push({
        id: 'caesar',
        x: 1400, y: screenHeight * 0.72, radius: 35,
        hits: 0, maxHits: 2,
        reward: 220, popupText: 'CAESAR-KRANZ! +220'
      });
      // SPQR Eagle Standard
      this.eggs.push({
        id: 'spqreagle',
        x: 1620, y: screenHeight * 0.55, radius: 40,
        hits: 0, maxHits: 1,
        reward: 280, popupText: 'SPQR-ADLER! +280'
      });
    } else if (theme === 'gaul') {
      // Magic Potion Cauldron
      this.eggs.push({
        id: 'cauldron',
        x: 1300, y: screenHeight * 0.64, radius: 55,
        hits: 0, maxHits: 3,
        reward: 400, popupText: 'ZAUBERTRANK-KESSEL! +400'
      });
      // Roasted Wild Boar Spit
      this.eggs.push({
        id: 'wildboar',
        x: 1620, y: screenHeight * 0.76, radius: 45,
        hits: 0, maxHits: 2,
        reward: 300, popupText: 'WILDSCHWEIN-SPIESS! +300'
      });
      // Standing Menhir Stone
      this.eggs.push({
        id: 'menhir',
        x: 1040, y: screenHeight * 0.70, radius: 40,
        hits: 0, maxHits: 1,
        reward: 350, popupText: 'HÜTTEN-MENHIR! +350'
      });
    } else if (theme === 'palace') {
      // Imperial Crown
      this.eggs.push({
        id: 'empresscrown',
        x: 1200, y: screenHeight * 0.30, radius: 55,
        hits: 0, maxHits: 3,
        reward: 450, popupText: 'KAISERIN-KRONE! +450'
      });
      // Palace Marble Fountain
      this.eggs.push({
        id: 'palacefountain',
        x: 1680, y: screenHeight * 0.72, radius: 50,
        hits: 0, maxHits: 2,
        reward: 350, popupText: 'PALAST-FOUNTAIN! +350'
      });
      // Golden Phoenix Statue
      this.eggs.push({
        id: 'phoenixstatue',
        x: 520, y: screenHeight * 0.65, radius: 45,
        hits: 0, maxHits: 1,
        reward: 400, popupText: 'GOLDENE PHÖNIX-STATUE! +400'
      });
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
