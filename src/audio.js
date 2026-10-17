const assetUrl = (p) => (import.meta.env.BASE_URL || './') + String(p).replace(/^\//, '');

// Web Audio API Engine for Moorhuhn Game
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.masterGain = null;
    this.musicGain = null;
    this.ambientGain = null;
    this.ambientNodes = [];
    this.currentTheme = null;
    this.initialized = false;
    this.shotBuffer = null;
    this.reloadBuffer = null;
    this.songBuffer = null;
    this.musicSource = null;
    this.isMusicPlaying = false;

    // Gespeicherte Musiklautstärke laden (Standard: 35%)
    let savedVol = null;
    try {
      savedVol = localStorage.getItem('moorhuhn_music_volume');
    } catch(e) {}
    this.musicVolume = savedVol !== null ? Math.max(0, Math.min(1, parseFloat(savedVol))) : 0.35;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.5;
      this.masterGain.connect(this.ctx.destination);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.value = this.musicVolume; // Konfigurierte Lautstärke für den MoorhuhnSong
      this.musicGain.connect(this.masterGain);

      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.value = 0.20;
      this.ambientGain.connect(this.masterGain);

      this._loadAudioBuffers();

      const unlockAudio = () => {
        this.resume();
        window.removeEventListener('pointerdown', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
      };
      window.addEventListener('pointerdown', unlockAudio);
      window.addEventListener('keydown', unlockAudio);

      this.initialized = true;
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  }

  async _loadAudioBuffers() {
    // 1. Lade benutzerdefinierte GewehrSchuss.mp3 Audiodatei
    try {
      const shotUrl = assetUrl('audio/GewehrSchuss.mp3');
      const response = await fetch(shotUrl);
      if (response.ok) {
        const arrayBuffer = await response.arrayBuffer();
        this.shotBuffer = await this.ctx.decodeAudioData(arrayBuffer);
      }
    } catch (e) {
      console.warn("GewehrSchuss.mp3 konnte nicht geladen werden, verwende Synthesizer-Fallback:", e);
    }

    // 2. Lade Repetiergeräusch (GewehrRepetier.mp3) falls vorhanden
    try {
      const reloadUrl = assetUrl('audio/GewehrRepetier.mp3');
      const response = await fetch(reloadUrl);
      if (response.ok) {
        const arrayBuffer = await response.arrayBuffer();
        this.reloadBuffer = await this.ctx.decodeAudioData(arrayBuffer);
      }
    } catch (e) {
      // Fallback zu mechanischem Klick
    }

    // 3. Lade MoorhuhnSong.mp3 als exklusives Hintergrundgeräusch
    try {
      const songUrl = assetUrl('audio/MoorhuhnSong.mp3');
      const response = await fetch(songUrl);
      if (response.ok) {
        const arrayBuffer = await response.arrayBuffer();
        this.songBuffer = await this.ctx.decodeAudioData(arrayBuffer);
        // Falls das Spiel bereits läuft und auf Musik wartet, direkt starten
        if (this.isMusicPlaying && !this.musicSource && !this.muted) {
          this._startSongPlayback();
        }
      }
    } catch (e) {
      console.warn("MoorhuhnSong.mp3 konnte nicht geladen werden:", e);
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().then(() => {
        if (this.isMusicPlaying && !this.musicSource && !this.muted) {
          this._startSongPlayback();
        }
      }).catch(() => {});
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.masterGain) {
      this.masterGain.gain.value = this.muted ? 0 : 0.5;
    }
    if (this.muted) {
      if (this.musicSource) {
        try { this.musicSource.stop(); } catch(e) {}
        this.musicSource = null;
      }
    } else if (this.isMusicPlaying && !this.musicSource) {
      this._startSongPlayback();
    }
    return this.muted;
  }

  setMusicVolume(vol) {
    const clamped = Math.max(0, Math.min(1, vol));
    this.musicVolume = clamped;
    try {
      localStorage.setItem('moorhuhn_music_volume', String(clamped));
    } catch(e) {}
    if (this.musicGain && this.ctx) {
      this.musicGain.gain.setValueAtTime(clamped, this.ctx.currentTime);
    }
    return clamped;
  }

  getMusicVolume() {
    return this.musicVolume;
  }

  // --- Sound Effect Generators --- //

  playShot() {
    if (!this.initialized || this.muted) return;
    this.resume();

    // Reales Sample verwenden (AudioBuffer mit 0ms Latenz und perfektem Overlap)
    if (this.shotBuffer) {
      try {
        const source = this.ctx.createBufferSource();
        source.buffer = this.shotBuffer;
        const shotGain = this.ctx.createGain();
        shotGain.gain.value = 1.0;
        source.connect(shotGain);
        shotGain.connect(this.masterGain);
        source.start();
        return;
      } catch (e) {
        console.warn("Fehler beim Abspielen von shotBuffer, nutze Fallback:", e);
      }
    }

    // Synthetischer Fallback falls Datei noch nicht geladen ist
    const now = this.ctx.currentTime;
    
    const bufferSize = this.ctx.sampleRate * 0.25;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.04));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(3000, now);
    filter.frequency.exponentialRampToValueAtTime(120, now + 0.2);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.9, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.15);

    oscGain.gain.setValueAtTime(0.8, now);
    oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    osc.connect(oscGain);
    oscGain.connect(this.masterGain);

    noise.start(now);
    osc.start(now);
    noise.stop(now + 0.25);
    osc.stop(now + 0.2);
  }

  playReload() {
    if (!this.initialized || this.muted) return;
    this.resume();

    // Reales Repetier-Sample verwenden falls vorhanden
    if (this.reloadBuffer) {
      try {
        const source = this.ctx.createBufferSource();
        source.buffer = this.reloadBuffer;
        const reloadGain = this.ctx.createGain();
        reloadGain.gain.value = 0.95;
        source.connect(reloadGain);
        reloadGain.connect(this.masterGain);
        source.start();
        return;
      } catch (e) {
        // Fallback
      }
    }

    const now = this.ctx.currentTime;
    this._playMechanicalClick(now, 1200, 0.04);
    this._playMechanicalClick(now + 0.18, 900, 0.06);
    this._playMechanicalClick(now + 0.32, 1400, 0.05);
  }

  _playMechanicalClick(time, freq, duration) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, time);
    osc.frequency.exponentialRampToValueAtTime(200, time + duration);

    gain.gain.setValueAtTime(0.3, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + duration);
  }

  playEmptyClick() {
    if (!this.initialized || this.muted) return;
    this.resume();
    const now = this.ctx.currentTime;
    this._playMechanicalClick(now, 1800, 0.02);
  }

  playSquawk(type = 'medium') {
    if (!this.initialized || this.muted) return;
    this.resume();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    let baseFreq = 450;
    if (type === 'far') baseFreq = 650;
    if (type === 'close') baseFreq = 300;
    if (type === 'golden') baseFreq = 800;

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.linearRampToValueAtTime(baseFreq * 1.6, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.5, now + 0.25);

    const lfo = this.ctx.createOscillator();
    lfo.frequency.value = 25;
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 50;
    lfo.connect(osc.frequency);
    lfo.start(now);
    lfo.stop(now + 0.25);

    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  playEasterEgg() {
    if (!this.initialized || this.muted) return;
    this.resume();

    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;

      const startTime = now + idx * 0.06;
      gain.gain.setValueAtTime(0.3, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + 0.3);
    });
  }

  playPenalty() {
    if (!this.initialized || this.muted) return;
    this.resume();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.linearRampToValueAtTime(110, now + 0.3);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  playFanfare() {
    if (!this.initialized || this.muted) return;
    this.resume();

    const now = this.ctx.currentTime;
    const melody = [
      { note: 440, time: 0, dur: 0.15 },
      { note: 554.37, time: 0.15, dur: 0.15 },
      { note: 659.25, time: 0.3, dur: 0.15 },
      { note: 880, time: 0.45, dur: 0.4 }
    ];

    melody.forEach(m => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = m.note;

      const start = now + m.time;
      gain.gain.setValueAtTime(0.35, start);
      gain.gain.exponentialRampToValueAtTime(0.01, start + m.dur);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(start);
      osc.stop(start + m.dur);
    });
  }

  // --- Hintergrundmusik (Ausschließlich MoorhuhnSong.mp3 - Keine Wind-/Summgeräusche) --- //

  startThemeAmbient(theme) {
    this.init();
    this.resume();
    this.isMusicPlaying = true;
    this.currentTheme = theme;

    if (this.muted) return;
    this._startSongPlayback();
  }

  stopThemeAmbient() {
    this.isMusicPlaying = false;
    if (this.musicSource) {
      try {
        this.musicSource.stop();
        this.musicSource.disconnect();
      } catch(e) {}
      this.musicSource = null;
    }
    this.ambientNodes.forEach(node => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch(e) {}
    });
    this.ambientNodes = [];
  }

  _startSongPlayback() {
    if (!this.ctx || !this.songBuffer || this.musicSource || this.muted) return;
    try {
      const source = this.ctx.createBufferSource();
      source.buffer = this.songBuffer;
      source.loop = true; // Nahtlose Endlosschleife des MoorhuhnSongs
      source.connect(this.musicGain || this.masterGain);
      source.start(0);
      this.musicSource = source;
    } catch(e) {
      console.warn("Fehler beim Abspielen von MoorhuhnSong:", e);
    }
  }
}

export const soundEngine = new SoundEngine();
