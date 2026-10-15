// Chicken Entity & Manager Class
export class Chicken {
  constructor(config = {}) {
    this.x = config.x || 0;
    this.y = config.y || 100;
    this.type = config.type || 'medium'; // 'far', 'medium', 'close', 'turbo', 'golden', 'helmet', 'ghost', 'dove', 'owl', 'popup', 'balloon'
    this.depth = config.depth || 2; // 1: far, 2: medium, 3: close, 4: foreground popup
    
    // Scale and points based on depth / type
    if (this.type === 'popup') {
      this.scale = 2.8; // Giant foreground chicken!
      this.points = 5;
      this.squawkType = 'close';
      this.state = 'rising'; // 'rising', 'peeking', 'ducking', 'shot', 'fled'
      this.peekTimer = 0;
      this.targetY = config.targetY || 500;
      this.startY = config.startY || 800;
      this.y = this.startY;
    } else if (this.type === 'balloon') {
      this.scale = 1.4;
      this.points = 75;
      this.squawkType = 'far';
      this.state = 'flying';
    } else if (this.type === 'far' || this.depth === 1) {
      this.scale = 0.55;
      this.points = 25;
      this.squawkType = 'far';
      this.state = 'flying';
    } else if (this.type === 'close' || this.depth === 3) {
      this.scale = 1.2;
      this.points = 5;
      this.squawkType = 'close';
      this.state = 'flying';
    } else {
      this.scale = 0.85;
      this.points = 15;
      this.squawkType = 'medium';
      this.state = 'flying';
    }

    if (this.type === 'turbo') {
      this.scale = 0.7;
      this.points = 100;
      this.squawkType = 'far';
    } else if (this.type === 'golden') {
      this.scale = 0.9;
      this.points = 150;
      this.squawkType = 'golden';
    } else if (this.type === 'helmet') {
      this.scale = 0.9;
      this.points = 50;
      this.health = 2;
    } else if (this.type === 'dove' || this.type === 'owl') {
      this.scale = 1.5; // Verdoppelt (vorher 0.75) für Taube-animation & vogel-animation
      this.points = -25;
    }

    this.direction = config.direction || (Math.random() > 0.5 ? 1 : -1); // 1: right, -1: left
    this.speedX = (config.speedX || (1.5 + Math.random() * 2.5)) * this.direction;
    if (this.type === 'turbo') this.speedX *= 2.2;
    if (this.type === 'balloon') this.speedX = 0.8 * this.direction;

    this.baseY = this.y;
    this.sineFreq = 0.005 + Math.random() * 0.008;
    this.sineAmp = 15 + Math.random() * 25;
    this.animPhase = Math.random() * Math.PI * 2;
    this.wingOffset = Math.random() * Math.PI * 2;

    this.health = this.health || 1;
    this.outfit = config.outfit || (this.type === 'helmet' ? 'helmet' : 'none');

    this.rotation = 0;
    this.fallSpeed = 0;
    this.width = 45 * this.scale;
    this.height = 35 * this.scale;
  }

  update(virtualWidth, screenHeight) {
    if (this.type === 'popup') {
      // Foreground Popup Chicken Logic
      if (this.state === 'rising') {
        this.y -= 8;
        if (this.y <= this.targetY) {
          this.y = this.targetY;
          this.state = 'peeking';
          this.peekTimer = 0;
        }
      } else if (this.state === 'peeking') {
        this.peekTimer += 0.016;
        // Wasp/wobble head slightly
        this.x += Math.sin(this.peekTimer * 10) * 0.5;
        if (this.peekTimer >= 2.2) {
          this.state = 'ducking';
        }
      } else if (this.state === 'ducking') {
        this.y += 10;
        if (this.y >= this.startY + 100) {
          this.state = 'fled';
        }
      } else if (this.state === 'shot' || this.state === 'falling') {
        this.fallSpeed += 0.8;
        this.y += this.fallSpeed;
        if (this.y > screenHeight + 200) {
          this.state = 'fled';
        }
      }
      return;
    }

    if (this.state === 'flying') {
      this.x += this.speedX;
      if (this.type !== 'balloon') {
        this.animPhase += this.sineFreq * 10;
        this.y = this.baseY + Math.sin(this.animPhase) * this.sineAmp;
      }

      // Check out of bounds
      if (this.direction > 0 && this.x > virtualWidth + 120) {
        this.state = 'fled';
      } else if (this.direction < 0 && this.x < -120) {
        this.state = 'fled';
      }
    } else if (this.state === 'shot' || this.state === 'falling') {
      this.state = 'falling';
      this.fallSpeed += 0.5; // gravity
      this.y += this.fallSpeed;
      this.rotation += 0.15 * this.direction;

      if (this.y > screenHeight + 100) {
        this.state = 'fled'; // clean up
      }
    }
  }

  // Hitbox check against shot crosshair (x, y)
  checkHit(shotX, shotY) {
    if (this.state !== 'flying' && this.state !== 'rising' && this.state !== 'peeking') return false;

    const radius = (this.type === 'popup' ? 45 : 25) * this.scale;
    const dx = shotX - this.x;
    const dy = shotY - (this.type === 'popup' ? this.y - 30 : this.y);
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist <= radius) {
      this.health -= 1;
      if (this.health <= 0) {
        this.state = 'shot';
        return { hit: true, killed: true, points: this.points, type: this.type, squawk: this.squawkType };
      } else {
        this.outfit = 'none';
        return { hit: true, killed: false, points: 10, type: this.type, squawk: 'medium' };
      }
    }
    return false;
  }
}
