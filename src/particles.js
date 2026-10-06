// Particle Engine for Moorhuhn Game
export class ParticleSystem {
  constructor() {
    this.particles = [];
    this.scorePopups = [];
    this.weatherParticles = [];
  }

  reset() {
    this.particles = [];
    this.scorePopups = [];
    this.weatherParticles = [];
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
      if (wp.type === 'snow') {
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
      }
    }
  }

  render(ctx, cameraX) {
    ctx.save();
    ctx.translate(-cameraX, 0);

    for (let wp of this.weatherParticles) {
      if (wp.type === 'snow') {
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

    ctx.restore();
  }
}
