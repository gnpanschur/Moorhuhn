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
      // Sunken Pirate Shipwreck Treasure
      this.eggs.push({
        id: 'shipwreck',
        x: 450, y: screenHeight * 0.65, radius: 60,
        hits: 0, maxHits: 3,
        reward: 200, popupText: 'PIRATEN-SCHATZ! +200'
      });
      // Glowing Sea Anemone
      this.eggs.push({
        id: 'anemone',
        x: 1750, y: screenHeight * 0.75, radius: 40,
        hits: 0, maxHits: 1,
        reward: 150, popupText: 'KORALLEN-HUHN! +150'
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
