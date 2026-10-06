// Web Audio API Synthesizer for Moorhuhn Game
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.masterGain = null;
    this.ambientGain = null;
    this.ambientNodes = [];
    this.currentTheme = null;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.5;
      this.masterGain.connect(this.ctx.destination);

      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.value = 0.25;
      this.ambientGain.connect(this.masterGain);

      this.initialized = true;
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.masterGain) {
      this.masterGain.gain.value = this.muted ? 0 : 0.5;
    }
    return this.muted;
  }

  // --- Sound Effect Generators --- //

  playShot() {
    if (!this.initialized || this.muted) return;
    this.resume();

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

  startThemeAmbient(theme) {
    if (!this.initialized) return;
    this.stopThemeAmbient();
    this.currentTheme = theme;

    if (this.muted) return;

    try {
      if (theme === 'summer') {
        this._startBreezeSynth();
      } else if (theme === 'winter') {
        this._startWindSynth();
      } else if (theme === 'beach') {
        this._startOceanSynth();
      } else if (theme === 'forest') {
        this._startForestSynth();
      } else if (theme === 'spooky') {
        this._startSpookySynth();
      } else if (theme === 'aquarium') {
        this._startAquariumSynth();
      } else if (theme === 'city') {
        this._startCitySynth();
      } else if (theme === 'farm') {
        this._startFarmSynth();
      } else if (theme === 'castle') {
        this._startCastleSynth();
      } else if (theme === 'egypt') {
        this._startEgyptSynth();
      } else if (theme === 'rome') {
        this._startRomeSynth();
      } else if (theme === 'gaul') {
        this._startGaulSynth();
      } else if (theme === 'palace') {
        this._startPalaceSynth();
      }
    } catch(e) {
      console.warn("Ambient synth error", e);
    }
  }

  stopThemeAmbient() {
    this.ambientNodes.forEach(node => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch(e) {}
    });
    this.ambientNodes = [];
  }

  _startBreezeSynth() {
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.05;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 600;
    filter.Q.value = 3;

    noise.connect(filter);
    filter.connect(this.ambientGain);
    noise.start();
    this.ambientNodes.push(noise, filter);
  }

  _startWindSynth() {
    const bufferSize = this.ctx.sampleRate * 3;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400;

    noise.connect(filter);
    filter.connect(this.ambientGain);
    noise.start();
    this.ambientNodes.push(noise, filter);
  }

  _startOceanSynth() {
    const bufferSize = this.ctx.sampleRate * 4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const t = i / this.ctx.sampleRate;
      const wave = Math.sin(t * Math.PI * 0.2) * 0.5 + 0.5;
      data[i] = (Math.random() * 2 - 1) * 0.08 * wave;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 800;

    noise.connect(filter);
    filter.connect(this.ambientGain);
    noise.start();
    this.ambientNodes.push(noise, filter);
  }

  _startForestSynth() {
    this._startBreezeSynth();
  }

  _startSpookySynth() {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 65;

    gain.gain.value = 0.15;
    osc.connect(gain);
    gain.connect(this.ambientGain);
    osc.start();
    this.ambientNodes.push(osc, gain);
  }

  _startAquariumSynth() {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 55;

    gain.gain.value = 0.2;
    osc.connect(gain);
    gain.connect(this.ambientGain);
    osc.start();
    this.ambientNodes.push(osc, gain);
  }

  _startCitySynth() {
    this._startBreezeSynth();
  }

  _startFarmSynth() {
    this._startBreezeSynth();
  }

  _startCastleSynth() {
    this._startBreezeSynth();
  }

  _startEgyptSynth() {
    this._startBreezeSynth();
  }

  _startRomeSynth() {
    this._startBreezeSynth();
  }

  _startGaulSynth() {
    this._startBreezeSynth();
  }

  _startPalaceSynth() {
    this._startBreezeSynth();
  }
}

export const soundEngine = new SoundEngine();
