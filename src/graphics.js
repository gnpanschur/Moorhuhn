// Dynamic Procedural & Image Canvas Graphics Renderer for Moorhuhn
export class GraphicsRenderer {
  constructor() {
    this.decals = []; // bullet holes on scenery
    this.bgImages = {};
    this.birdSprites = {
      moor: [],
      taube: [],
      storch: []
    };
    this._loadBackgroundImages();
    this._loadBirdSprites();
  }

  _loadBackgroundImages() {
    const themes = ['summer', 'winter', 'beach', 'forest', 'spooky', 'aquarium', 'city', 'farm', 'castle'];
    themes.forEach(theme => {
      const img = new Image();
      img.src = `/bg_${theme}.jpg`;
      img.onload = () => {
        this.bgImages[theme] = img;
      };
    });
  }

  _loadBirdSprites() {
    ['/Vögel/Moor/Moor1.png', '/Vögel/Moor/Moor2.png'].forEach(src => {
      const img = new Image();
      img.src = src;
      this.birdSprites.moor.push(img);
    });

    ['/Vögel/Taube-animation/Taube1.png', '/Vögel/Taube-animation/Taube2.png', '/Vögel/Taube-animation/Taube3.png'].forEach(src => {
      const img = new Image();
      img.src = src;
      this.birdSprites.taube.push(img);
    });

    ['/Vögel/vogel-animation/storch1.png', '/Vögel/vogel-animation/storch2.png', '/Vögel/vogel-animation/storch3.png'].forEach(src => {
      const img = new Image();
      img.src = src;
      this.birdSprites.storch.push(img);
    });
  }

  addDecal(x, y) {
    this.decals.push({ x, y, size: 4 + Math.random() * 4 });
  }

  clearDecals() {
    this.decals = [];
  }

  // --- 1. THEME BACKGROUND RENDERERS --- //

  renderBackground(ctx, theme, virtualWidth, screenHeight, animTime) {
    const img = this.bgImages[theme];

    if (img && img.complete && img.naturalWidth > 0) {
      ctx.drawImage(img, 0, 0, virtualWidth, screenHeight);
    } else {
      if (theme === 'summer') {
        this._renderSummer(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'winter') {
        this._renderWinter(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'beach') {
        this._renderBeach(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'forest') {
        this._renderForest(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'spooky') {
        this._renderSpooky(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'aquarium') {
        this._renderAquarium(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'city') {
        this._renderCity(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'farm') {
        this._renderFarm(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'castle') {
        this._renderCastle(ctx, virtualWidth, screenHeight, animTime);
      }
    }

    // Render bullet hole decals
    ctx.fillStyle = '#2d2d2d';
    for (let d of this.decals) {
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  _renderSummer(ctx, width, height, t) {
    ctx.fillStyle = '#7dd3fc';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#4ade80';
    ctx.fillRect(0, height * 0.6, width, height * 0.4);
  }

  _renderWinter(ctx, width, height, t) {
    ctx.fillStyle = '#475569';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, height * 0.65, width, height * 0.35);
  }

  _renderBeach(ctx, width, height, t) {
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#fde047';
    ctx.fillRect(0, height * 0.65, width, height * 0.35);
  }

  _renderForest(ctx, width, height, t) {
    ctx.fillStyle = '#064e3b';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#14532d';
    ctx.fillRect(0, height * 0.65, width, height * 0.35);
  }

  _renderSpooky(ctx, width, height, t) {
    ctx.fillStyle = '#1e1b4b';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, height * 0.65, width, height * 0.35);
  }

  _renderAquarium(ctx, width, height, t) {
    const sea = ctx.createLinearGradient(0, 0, 0, height);
    sea.addColorStop(0, '#0284c7');
    sea.addColorStop(0.5, '#0369a1');
    sea.addColorStop(1, '#0c4a6e');
    ctx.fillStyle = sea;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#fde047';
    ctx.fillRect(0, height * 0.8, width, height * 0.2);
  }

  _renderCity(ctx, width, height, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#1e1b4b');
    sky.addColorStop(0.5, '#431407');
    sky.addColorStop(1, '#78350f');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);
  }

  _renderFarm(ctx, width, height, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#38bdf8');
    sky.addColorStop(0.6, '#bae6fd');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#84cc16';
    ctx.fillRect(0, height * 0.6, width, height * 0.4);
  }

  _renderCastle(ctx, width, height, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#ea580c');
    sky.addColorStop(0.5, '#f97316');
    sky.addColorStop(1, '#fde047');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#65a30d';
    ctx.fillRect(0, height * 0.6, width, height * 0.4);
  }

  // --- MAIN CHICKEN DISPATCHER --- //
  renderChicken(ctx, chicken, animTime) {
    if (chicken.type === 'popup') {
      this._renderPopupChicken(ctx, chicken, animTime);
    } else if (chicken.type === 'balloon') {
      this._renderBalloon(ctx, chicken, animTime);
    } else {
      this._renderAnimatedBird(ctx, chicken, animTime);
    }
  }

  // --- 2. AUTHENTIC SPRITE FRAME ANIMATION (Moorhuhn, Taube, Storch) --- //
  _renderAnimatedBird(ctx, chicken, animTime) {
    ctx.save();
    ctx.translate(chicken.x, chicken.y);

    const scale = chicken.scale || 1.0;
    const flipX = chicken.direction > 0 ? -1 : 1;
    ctx.scale(flipX * scale, scale);

    if (chicken.state === 'shot' || chicken.state === 'falling') {
      ctx.rotate(chicken.rotation);
    }

    const type = chicken.type;
    const outfit = chicken.outfit;
    const isDead = chicken.state === 'shot' || chicken.state === 'falling';

    let spriteList = this.birdSprites.moor;
    let fps = 6.6;

    if (type === 'dove') {
      spriteList = this.birdSprites.taube;
      fps = 10;
    } else if (type === 'owl') {
      spriteList = this.birdSprites.storch;
      fps = 4;
    }

    if (type === 'golden') {
      ctx.shadowColor = '#ffe066';
      ctx.shadowBlur = 25;
    } else if (type === 'ghost') {
      ctx.globalAlpha = 0.7;
    }

    const frameIdx = Math.floor(animTime * fps + (chicken.wingOffset || 0)) % (spriteList.length || 1);
    const img = spriteList[frameIdx];

    if (img && img.complete && img.naturalWidth > 0) {
      const targetW = 90;
      const targetH = (img.naturalHeight / img.naturalWidth) * targetW;

      ctx.drawImage(img, -targetW / 2, -targetH / 2, targetW, targetH);
    } else {
      this._renderProceduralBird(ctx, chicken, animTime);
    }

    // =========================================================================
    // --- POSITIONIERBARER BONUSPUNKTE & ACCESSORIES RENDERER ---
    // (Wird NICHT auf unschuldige Strafvögel wie Taube oder Storch gezeichnet!)
    // =========================================================================

    if (type !== 'dove' && type !== 'owl') {
      // 1. EIERSCHALE (Eggshell Hat / Weiße Kopfbedeckung)
      if (outfit === 'eggshell') {
        const eggshellX = -22; // HIER X-POSITION DER EIERSCHALE ANPASSEN (-22)
        const eggshellY = -22; // HIER Y-POSITION DER EIERSCHALE ANPASSEN (-22)

        ctx.fillStyle = '#fef3c7';
        ctx.strokeStyle = '#78350f';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(eggshellX - 12, eggshellY);
        ctx.lineTo(eggshellX - 10, eggshellY - 14);
        ctx.lineTo(eggshellX - 4, eggshellY - 8);
        ctx.lineTo(eggshellX, eggshellY - 16);
        ctx.lineTo(eggshellX + 5, eggshellY - 9);
        ctx.lineTo(eggshellX + 11, eggshellY - 14);
        ctx.lineTo(eggshellX + 13, eggshellY);
        ctx.closePath();
        ctx.fill(); ctx.stroke();
      }

      // 2. WEISSE / SILBERNE KRONE (White Crown)
      else if (outfit === 'white_crown') {
        const whiteCrownX = -22; // HIER X-POSITION DER WEISSEN KRONE ANPASSEN
        const whiteCrownY = -22; // HIER Y-POSITION DER WEISSEN KRONE ANPASSEN

        ctx.fillStyle = '#f8fafc';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(whiteCrownX - 12, whiteCrownY);
        ctx.lineTo(whiteCrownX - 12, whiteCrownY - 12);
        ctx.lineTo(whiteCrownX - 6, whiteCrownY - 5);
        ctx.lineTo(whiteCrownX, whiteCrownY - 16);
        ctx.lineTo(whiteCrownX + 6, whiteCrownY - 5);
        ctx.lineTo(whiteCrownX + 12, whiteCrownY - 12);
        ctx.lineTo(whiteCrownX + 12, whiteCrownY);
        ctx.closePath();
        ctx.fill(); ctx.stroke();
      }

      // 3. GOLDENE KRONE (Golden Crown)
      else if (type === 'golden') {
        const crownX = -22;  // HIER X-POSITION DER GOLDENEN KRONE ANPASSEN (-22)
        const crownY = -22; // HIER Y-POSITION DER GOLDENEN KRONE ANPASSEN (-22)

        ctx.fillStyle = '#facc15';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(crownX - 12, crownY);
        ctx.lineTo(crownX - 12, crownY - 12);
        ctx.lineTo(crownX - 6, crownY - 5);
        ctx.lineTo(crownX, crownY - 16);
        ctx.lineTo(crownX + 6, crownY - 5);
        ctx.lineTo(crownX + 12, crownY - 12);
        ctx.lineTo(crownX + 12, crownY);
        ctx.closePath();
        ctx.fill(); ctx.stroke();
      }

      // 4. STAHLHELM (Steel Helmet)
      else if (outfit === 'helmet') {
        const helmetX = -22; // HIER X-POSITION DES STAHLHELMS ANPASSEN (-22)
        const helmetY = -20; // HIER Y-POSITION DES STAHLHELMS ANPASSEN (-20)

        ctx.fillStyle = '#64748b';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(helmetX, helmetY, 15, Math.PI * 0.85, Math.PI * 0.15);
        ctx.fill(); ctx.stroke();

        ctx.fillStyle = '#ca8a04';
        ctx.fillRect(helmetX - 2, helmetY - 17, 4, 5);
      }

      // 5. JETPACK (Raketenantrieb / Turbo)
      else if (type === 'turbo') {
        const jetpackX = -22; // HIER X-POSITION DES JETPACKS ANPASSEN
        const jetpackY = -10; // HIER Y-POSITION DES JETPACKS ANPASSEN

        ctx.fillStyle = '#cbd5e1';
        ctx.fillRect(jetpackX, jetpackY, 10, 20);
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(jetpackX, jetpackY - 2, 10, 4);

        ctx.fillStyle = '#f97316';
        ctx.beginPath();
        ctx.moveTo(jetpackX, jetpackY + 20);
        ctx.lineTo(jetpackX - 5, jetpackY + 28 + Math.random() * 5);
        ctx.lineTo(jetpackX + 10, jetpackY + 20);
        ctx.fill();
      }

      // 6. TAUCHERBRILLE (Scuba Diving Mask & Snorkel)
      else if (outfit === 'scuba') {
        const scubaX = -40;  // HIER X-POSITION DER TAUCHERBRILLE ANPASSEN (-40)
        const scubaY = -20;  // HIER Y-POSITION DER TAUCHERBRILLE ANPASSEN (-20)

        ctx.fillStyle = 'rgba(6, 182, 212, 0.7)';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.ellipse(scubaX + 14, scubaY, 10, 7, 0, 0, Math.PI * 2);
        ctx.fill(); ctx.stroke();

        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(scubaX + 18, scubaY);
        ctx.lineTo(scubaX + 24, scubaY - 14);
        ctx.lineTo(scubaX + 28, scubaY - 14);
        ctx.stroke();
      }
    }

    if (isDead) {
      ctx.fillStyle = '#facc15';
      const starAngle = animTime * 10;
      for (let s = 0; s < 3; s++) {
        const sx = 16 + Math.cos(starAngle + s * 2) * 18;
        const sy = -30 + Math.sin(starAngle + s * 2) * 8;
        ctx.beginPath();
        ctx.arc(sx, sy, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
  }

  // --- 3. FOREGROUND POPUP CHICKEN ("GLOTZ-HUHN" - FRONTAL CLOSEUP) --- //
  _renderPopupChicken(ctx, chicken, animTime) {
    ctx.save();
    ctx.translate(chicken.x, chicken.y);

    const scale = chicken.scale || 2.8;
    ctx.scale(scale, scale);
    const isDead = chicken.state === 'shot' || chicken.state === 'falling';

    if (isDead) {
      ctx.rotate(Math.sin(animTime * 15) * 0.2);
    }

    const bodyGrad = ctx.createLinearGradient(0, 0, 0, 60);
    bodyGrad.addColorStop(0, '#d97706');
    bodyGrad.addColorStop(1, '#92400e');
    ctx.fillStyle = bodyGrad;
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.ellipse(0, 45, 36, 30, 0, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, 24, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();

    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(-8, -24, 8, 0, Math.PI * 2);
    ctx.arc(0, -29, 10, 0, Math.PI * 2);
    ctx.arc(8, -24, 8, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(0, 20, 8, 14, 0, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();

    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.moveTo(-16, 2); ctx.lineTo(0, 26); ctx.lineTo(16, 2);
    ctx.closePath(); ctx.fill(); ctx.stroke();

    if (isDead) {
      ctx.fillStyle = '#881337';
      ctx.beginPath();
      ctx.ellipse(0, 14, 10, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.ellipse(0, 16, 6, 4, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    const eyeR = 12;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(-11, -8, eyeR, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();

    ctx.beginPath();
    ctx.arc(11, -8, eyeR, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();

    if (isDead) {
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(-15, -12); ctx.lineTo(-7, -4);
      ctx.moveTo(-7, -12); ctx.lineTo(-15, -4);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(7, -12); ctx.lineTo(15, -4);
      ctx.moveTo(15, -12); ctx.lineTo(7, -4);
      ctx.stroke();

      ctx.fillStyle = '#facc15';
      const starAngle = animTime * 12;
      for (let s = 0; s < 4; s++) {
        const sx = Math.cos(starAngle + s * 1.5) * 28;
        const sy = -32 + Math.sin(starAngle + s * 1.5) * 10;
        ctx.beginPath();
        ctx.arc(sx, sy, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      const wobbleX = Math.sin(animTime * 4) * 1.5;
      const wobbleY = Math.cos(animTime * 4) * 1.5;

      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(-8 + wobbleX, -7 + wobbleY, 4.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(8 + wobbleX, -7 + wobbleY, 4.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(-6 + wobbleX, -9 + wobbleY, 1.5, 0, Math.PI * 2);
      ctx.arc(10 + wobbleX, -9 + wobbleY, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  // --- 4. MOORHUHN HOT AIR BALLOON --- //
  _renderBalloon(ctx, chicken, animTime) {
    ctx.save();
    ctx.translate(chicken.x, chicken.y);
    const scale = chicken.scale || 1.4;
    ctx.scale(scale, scale);

    const balloonR = 30;
    ctx.fillStyle = '#dc2626';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, -40, balloonR, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();

    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.ellipse(0, -40, 12, balloonR, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 8px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Moorhuhn', 0, -38);

    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-15, -12); ctx.lineTo(-8, 5);
    ctx.moveTo(15, -12);  ctx.lineTo(8, 5);
    ctx.stroke();

    ctx.fillStyle = '#b45309';
    ctx.fillRect(-10, 5, 20, 14);
    ctx.strokeRect(-10, 5, 20, 14);

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, 3, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.arc(0, 3, 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  _renderProceduralBird(ctx, chicken, animTime) {
    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.arc(0, 0, 15, 0, Math.PI * 2);
    ctx.fill();
  }

  // --- 5. BOLD HIGH-CONTRAST ARCADE CROSSHAIR RENDERER --- //
  renderCrosshair(ctx, x, y, isFiring = false, ammoCount = 8) {
    ctx.save();
    ctx.translate(x, y);

    const isOut = ammoCount === 0;
    const radius = isFiring ? 26 : 22;
    const mainColor = isOut ? '#ff2222' : '#00ffcc';
    const accentColor = isOut ? '#ffffff' : '#facc15';

    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 6;
    ctx.lineCap = 'square';

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-radius - 12, 0); ctx.lineTo(-radius + 4, 0);
    ctx.moveTo(radius + 12, 0);  ctx.lineTo(radius - 4, 0);
    ctx.moveTo(0, -radius - 12); ctx.lineTo(0, -radius + 4);
    ctx.moveTo(0, radius + 12);  ctx.lineTo(0, radius - 4);
    ctx.stroke();

    ctx.strokeStyle = mainColor;
    ctx.lineWidth = 3.5;

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-radius - 10, 0); ctx.lineTo(-radius + 5, 0);
    ctx.moveTo(radius + 10, 0);  ctx.lineTo(radius - 5, 0);
    ctx.moveTo(0, -radius - 10); ctx.lineTo(0, -radius + 5);
    ctx.moveTo(0, radius + 10);  ctx.lineTo(0, radius - 5);
    ctx.stroke();

    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(0, 0, 5.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = accentColor;
    ctx.beginPath();
    ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
    ctx.fill();

    if (isOut) {
      ctx.font = '900 14px "Press Start 2P", monospace';
      ctx.textAlign = 'center';
      
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 4;
      ctx.strokeText('NACHLADEN! [R]', 0, radius + 24);

      ctx.fillStyle = '#ff2222';
      ctx.fillText('NACHLADEN! [R]', 0, radius + 24);
    }

    ctx.restore();
  }
}
