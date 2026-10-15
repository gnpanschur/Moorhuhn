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
      this.ambientGain.gain.value = 0.20;
      this.ambientGain.connect(this.masterGain);

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

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
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
    this.init();
    this.resume();
    this.stopThemeAmbient();
    this.currentTheme = theme;

    if (this.muted) return;

    try {
      if (theme === 'summer') {
        this._startBreezeSynth();
      } else if (theme === 'winter') {
        this._startWindSynth(1.2);
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
      } else if (theme === 'moorland') {
        this._startMoorlandSynth();
      } else if (theme === 'dragon_valley') {
        this._startDragonSynth();
      } else if (theme === 'jungle_ruins') {
        this._startJungleSynth();
      } else if (theme === 'medieval_fortress') {
        this._startFortressSynth();
      } else if (theme === 'military_base') {
        this._startMilitarySynth();
      } else if (theme === 'atlantis') {
        this._startAquariumSynth();
      } else if (theme === 'alpine_meadow') {
        this._startAlpineSynth();
      } else if (theme === 'elven_kingdom') {
        this._startElvenSynth();
      } else if (theme === 'wild_west') {
        this._startWildWestSynth();
      } else if (theme === 'mars_colony') {
        this._startMarsSynth();
      } else if (theme === 'candy_planet') {
        this._startCandySynth();
      } else if (theme === 'night_fair') {
        this._startNightFairSynth();
      } else if (theme === 'riverbank') {
        this._startRiverbankSynth();
      } else if (theme === 'floating_islands') {
        this._startFloatingIslandsSynth();
      } else if (theme === 'pirate_nest') {
        this._startOceanSynth();
      } else if (theme === 'junkyard') {
        this._startJunkyardSynth();
      } else if (theme === 'autumn_orchard') {
        this._startBreezeSynth();
      } else if (theme === 'cyberpunk') {
        this._startCyberpunkSynth();
      } else if (theme === 'enchanted_forest') {
        this._startEnchantedForestSynth();
      } else if (theme === 'savannah') {
        this._startSavannahSynth();
      } else if (theme === 'graveyard') {
        this._startGraveyardSynth();
      } else if (theme === 'harbor') {
        this._startHarborSynth();
      } else if (theme === 'arcade') {
        this._startArcadeSynth();
      } else if (theme === 'clock_canyon') {
        this._startClockCanyonSynth();
      } else if (theme === 'arctic') {
        this._startArcticSynth();
      } else if (theme === 'haunted_manor') {
        this._startManorSynth();
      } else if (theme === 'rooftop_garden') {
        this._startRooftopSynth();
      } else if (theme === 'drive_in_cinema') {
        this._startDriveInSynth();
      } else if (theme === 'crystal_cave') {
        this._startCrystalCaveSynth();
      } else if (theme === 'grand_canyon') {
        this._startGrandCanyonSynth();
      } else if (theme === 'ghost_ship') {
        this._startGhostShipSynth();
      } else if (theme === 'construction_site') {
        this._startConstructionSynth();
      } else if (theme === 'western_mine') {
        this._startWesternMineSynth();
      } else if (theme === 'toy_box') {
        this._startToyBoxSynth();
      } else if (theme === 'bamboo_valley') {
        this._startBambooValleySynth();
      } else if (theme === 'vampire_castle') {
        this._startVampireCastleSynth();
      } else if (theme === 'subway_station') {
        this._startSubwayStationSynth();
      } else if (theme === 'cloud_castle') {
        this._startCloudCastleSynth();
      } else if (theme === 'mystic_mangrove') {
        this._startMysticMangroveSynth();
      } else if (theme === 'outer_space') {
        this._startOuterSpaceSynth();
      } else if (theme === 'colosseum_arena') {
        this._startColosseumArenaSynth();
      } else if (theme === 'ski_resort') {
        this._startSkiResortSynth();
      } else if (theme === 'iceland_geysir') {
        this._startIcelandGeysirSynth();
      } else if (theme === 'giant_bakery') {
        this._startGiantBakerySynth();
      } else if (theme === 'arcade_chip') {
        this._startArcadeChipSynth();
      } else if (theme === 'sakura_park') {
        this._startSakuraParkSynth();
      } else if (theme === 'formula1_track') {
        this._startFormula1TrackSynth();
      } else if (theme === 'coral_reef_lowtide') {
        this._startCoralReefLowtideSynth();
      } else if (theme === 'artist_studio') {
        this._startArtistStudioSynth();
      } else if (theme === 'pixel_desert') {
        this._startPixelDesertSynth();
      } else if (theme === 'giza_pyramids') {
        this._startGizaPyramidsSynth();
      } else if (theme === 'soccer_stadium') {
        this._startSoccerStadiumSynth();
      } else if (theme === 'prairie_tornado') {
        this._startPrairieTornadoSynth();
      } else if (theme === 'retro_living_room') {
        this._startRetroLivingRoomSynth();
      } else if (theme === 'comic_drawing_board') {
        this._startComicDrawingBoardSynth();
      } else if (theme === 'venice_canals') {
        this._startVeniceCanalsSynth();
      } else if (theme === 'skatepark') {
        this._startSkateparkSynth();
      } else if (theme === 'aurora_borealis') {
        this._startAuroraBorealisSynth();
      } else if (theme === 'mad_scientist_lab') {
        this._startMadScientistLabSynth();
      } else if (theme === 'taj_mahal') {
        this._startTajMahalSynth();
      } else if (theme === 'hanging_gardens_babylon') {
        this._startHangingGardensBabylonSynth();
      } else if (theme === 'zeus_statue_olympia') {
        this._startZeusStatueOlympiaSynth();
      } else if (theme === 'lighthouse_alexandria') {
        this._startLighthouseAlexandriaSynth();
      } else if (theme === 'colossus_rhodes') {
        this._startColossusRhodesSynth();
      } else if (theme === 'mausoleum_halicarnassus') {
        this._startMausoleumHalicarnassusSynth();
      } else if (theme === 'artemis_temple_ephesus') {
        this._startArtemisTempleSynth();
      } else if (theme === 'chichen_itza') {
        this._startChichenItzaSynth();
      } else if (theme === 'christ_redeemer_rio') {
        this._startChristRedeemerRioSynth();
      } else if (theme === 'great_wall_china') {
        this._startGreatWallChinaSynth();
      } else if (theme === 'machu_picchu') {
        this._startMachuPicchuSynth();
      } else if (theme === 'petra_jordan') {
        this._startPetraJordanSynth();
      } else if (theme === 'statue_of_liberty') {
        this._startStatueOfLibertySynth();
      } else if (theme === 'eiffel_tower_paris') {
        this._startEiffelTowerParisSynth();
      } else if (theme === 'stonehenge') {
        this._startStonehengeSynth();
      } else if (theme === 'leaning_tower_pisa') {
        this._startLeaningTowerPisaSynth();
      } else if (theme === 'easter_island_moai') {
        this._startEasterIslandMoaiSynth();
      } else if (theme === 'tower_bridge_london') {
        this._startTowerBridgeLondonSynth();
      } else if (theme === 'grazer_uhrturm') {
        this._startGrazerUhrturmSynth();
      } else if (theme === 'im_weltall') {
        this._startImWeltallSynth();
      } else if (theme === 'wien') {
        this._startWienSynth();
      } else if (theme === 'mohnblumen') {
        this._startMohnblumenSynth();
      } else if (theme === 'die_burg') {
        this._startDieBurgSynth();
      } else if (theme === 'toskana') {
        this._startToskanaSynth();
      } else if (theme === 'herbst') {
        this._startHerbstSynth();
      } else if (theme === 'schneefall') {
        this._startSchneefallSynth();
      } else if (theme === 'china') {
        this._startChinaSynth();
      } else if (theme === 'julius_caesar') {
        this._startJuliusCaesarSynth();
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
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.08;
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

  _startWindSynth(volumeMult = 1.0) {
    if (!this.ctx) return;

    // 1. Generate White Noise Buffer
    const bufferSize = this.ctx.sampleRate * 4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1);
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    // 2. Dynamic Bandpass Filter for Wind Gust Pitch (Sweeping 150Hz - 800Hz)
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(450, this.ctx.currentTime);
    filter.Q.value = 2.2;

    // LFO 1 for Wind Howl Frequency Modulation
    const lfoFreq = this.ctx.createOscillator();
    lfoFreq.type = 'sine';
    lfoFreq.frequency.value = 0.22; // Sweep every ~4.5 seconds

    const lfoFreqGain = this.ctx.createGain();
    lfoFreqGain.gain.value = 320; // Sweep +- 320Hz

    lfoFreq.connect(lfoFreqGain);
    lfoFreqGain.connect(filter.frequency);
    lfoFreq.start();

    // 3. Dynamic Gain for Wind Gust Swells
    const windGain = this.ctx.createGain();
    windGain.gain.setValueAtTime(0.4 * volumeMult, this.ctx.currentTime);

    const lfoVol = this.ctx.createOscillator();
    lfoVol.type = 'triangle';
    lfoVol.frequency.value = 0.15; // Gust volume swells every ~6.6 seconds

    const lfoVolGain = this.ctx.createGain();
    lfoVolGain.gain.value = 0.22 * volumeMult;

    lfoVol.connect(lfoVolGain);
    lfoVolGain.connect(windGain.gain);
    lfoVol.start();

    // 4. Whistling Wind Tone for Eerie Moorland Whistle
    const whistleOsc = this.ctx.createOscillator();
    whistleOsc.type = 'sine';
    whistleOsc.frequency.setValueAtTime(580, this.ctx.currentTime);

    const whistleLfo = this.ctx.createOscillator();
    whistleLfo.type = 'sine';
    whistleLfo.frequency.value = 0.28;
    const whistleLfoGain = this.ctx.createGain();
    whistleLfoGain.gain.value = 160;
    whistleLfo.connect(whistleLfoGain);
    whistleLfoGain.connect(whistleOsc.frequency);
    whistleLfo.start();

    const whistleGain = this.ctx.createGain();
    whistleGain.gain.value = 0.08 * volumeMult;

    whistleOsc.connect(whistleGain);
    whistleGain.connect(this.ambientGain);
    whistleOsc.start();

    noise.connect(filter);
    filter.connect(windGain);
    windGain.connect(this.ambientGain);
    noise.start();

    this.ambientNodes.push(noise, filter, lfoFreq, lfoFreqGain, lfoVol, lfoVolGain, windGain, whistleOsc, whistleLfo, whistleLfoGain, whistleGain);
  }

  _startOceanSynth() {
    if (!this.ctx) return;
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
    if (!this.ctx) return;
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
    if (!this.ctx) return;
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

  _startMoorlandSynth() {
    this._startWindSynth(1.0);
  }

  _startDragonSynth() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = 45;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 180;

    gain.gain.value = 0.18;
    osc.connect(filter);
    filter.connect(this.ambientGain);
    osc.start();
    this.ambientNodes.push(osc, filter, gain);
  }

  _startJungleSynth() {
    this._startBreezeSynth();
  }

  _startFortressSynth() {
    this._startWindSynth(1.2);
  }

  _startMilitarySynth() {
    this._startBreezeSynth();
  }

  playCowMecker() {
    if (!this.initialized || this.muted) return;
    this.resume();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.45);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(350, now);
    filter.frequency.linearRampToValueAtTime(650, now + 0.2);
    filter.frequency.linearRampToValueAtTime(280, now + 0.45);

    const lfo = this.ctx.createOscillator();
    lfo.frequency.value = 9;
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 12;
    lfo.connect(osc.frequency);
    lfo.start(now);
    lfo.stop(now + 0.45);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.45);
  }

  _startAlpineSynth() {
    this._startBreezeSynth();
  }

  _startElvenSynth() {
    if (!this.ctx) return;
    this._startBreezeSynth();

    // Soft celestial sine shimmer
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 440; // A4 harmonic shimmer

    const lfo = this.ctx.createOscillator();
    lfo.frequency.value = 0.3;
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 80;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    lfo.start();

    gain.gain.value = 0.08;
    osc.connect(gain);
    gain.connect(this.ambientGain);
    osc.start();
    this.ambientNodes.push(osc, gain, lfo, lfoGain);
  }

  _startWildWestSynth() {
    this._startBreezeSynth();
  }

  _startMarsSynth() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = 55;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 140;

    gain.gain.value = 0.15;
    osc.connect(filter);
    filter.connect(this.ambientGain);
    osc.start();
    this.ambientNodes.push(osc, filter, gain);
  }

  _startCandySynth() {
    this._startBreezeSynth();
  }

  _startNightFairSynth() {
    this._startBreezeSynth();
  }

  _startRiverbankSynth() {
    this._startBreezeSynth();
  }

  _startFloatingIslandsSynth() {
    this._startBreezeSynth();
    if (!this.ctx) return;
    // Steampunk hum/whir synth sound
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = 110;
    gain.gain.value = 0.05;
    osc.connect(gain);
    gain.connect(this.ambientGain);
    osc.start();
    this.ambientNodes.push(osc, gain);
  }

  _startJunkyardSynth() {
    this._startBreezeSynth();
    if (!this.ctx) return;
    // Heavy industrial motor rumble synth
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = 65;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 180;
    gain.gain.value = 0.07;
    osc.connect(filter);
    filter.connect(this.ambientGain);
    osc.start();
    this.ambientNodes.push(osc, filter, gain);
  }

  _startAutumnOrchardSynth() {
    this._startBreezeSynth();
  }

  _startCyberpunkSynth() {
    this._startBreezeSynth();
    if (!this.ctx) return;
    // Cyberpunk synth drone
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = 110;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400;
    gain.gain.value = 0.06;
    osc.connect(filter);
    filter.connect(this.ambientGain);
    osc.start();
    this.ambientNodes.push(osc, filter, gain);
  }

  _startEnchantedForestSynth() {
    this._startBreezeSynth();
    if (!this.ctx) return;
    // Mystical sine chime drone
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 220;
    gain.gain.value = 0.04;
    osc.connect(gain);
    gain.connect(this.ambientGain);
    osc.start();
    this.ambientNodes.push(osc, gain);
  }

  _startSavannahSynth() {
    this._startWindSynth(0.7);
    if (!this.ctx) return;
    // Low warm drone for African Savanne atmosphere
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = 75;
    gain.gain.value = 0.05;
    osc.connect(gain);
    gain.connect(this.ambientGain);
    osc.start();
    this.ambientNodes.push(osc, gain);
  }

  _startGraveyardSynth() {
    this._startWindSynth(1.1);
    if (!this.ctx) return;
    // Eerie low graveyard sine drone
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 55;
    gain.gain.value = 0.12;
    osc.connect(gain);
    gain.connect(this.ambientGain);
    osc.start();
    this.ambientNodes.push(osc, gain);
  }

  _startHarborSynth() {
    this._startOceanSynth();
    if (!this.ctx) return;
    // Deep maritime ship engine & harbor drone
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = 60;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 160;
    gain.gain.value = 0.08;
    osc.connect(filter);
    filter.connect(this.ambientGain);
    osc.start();
    this.ambientNodes.push(osc, filter, gain);
  }

  _startArcadeSynth() {
    this._startBreezeSynth();
    if (!this.ctx) return;
    // 80s Synthwave Pulsing Arpeggio Hum
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = 130.81; // C3 synth note
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 450;

    const lfo = this.ctx.createOscillator();
    lfo.type = 'sawtooth';
    lfo.frequency.value = 4; // 8-bit fast 4Hz arpeggio rhythm
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 65;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    lfo.start();

    gain.gain.value = 0.07;
    osc.connect(filter);
    filter.connect(this.ambientGain);
    osc.start();
    this.ambientNodes.push(osc, filter, gain, lfo, lfoGain);
  }

  _startClockCanyonSynth() {
    this._startBreezeSynth();
    if (!this.ctx) return;
    // Ticking clock pendulum rhythm synth & warm desert tone
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = 110;

    const lfo = this.ctx.createOscillator();
    lfo.type = 'square';
    lfo.frequency.value = 2; // Ticking 2Hz pendulum pulse
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 0.06;
    lfo.connect(gain.gain);
    lfo.start();

    gain.gain.value = 0.06;
    osc.connect(gain);
    gain.connect(this.ambientGain);
    osc.start();
    this.ambientNodes.push(osc, gain, lfo, lfoGain);
  }

  _startArcticSynth() {
    this._startWindSynth(1.2);
    if (!this.ctx) return;
    // Cold polar ice crystalline synth tone
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 523.25; // C5 crystalline polar tone
    gain.gain.value = 0.04;
    osc.connect(gain);
    gain.connect(this.ambientGain);
    osc.start();
    this.ambientNodes.push(osc, gain);
  }

  _startManorSynth() {
    this._startWindSynth(1.3);
    if (!this.ctx) return;
    // Eerie gothic organ drone
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = 65.41; // C2 gothic low note
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 220;

    gain.gain.value = 0.08;
    osc.connect(filter);
    filter.connect(this.ambientGain);
    osc.start();
    this.ambientNodes.push(osc, filter, gain);
  }

  _startRooftopSynth() {
    this._startBreezeSynth();
    if (!this.ctx) return;
    // Sunset rooftop lounge synth chord drone
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 261.63; // C4 warm lounge note
    gain.gain.value = 0.05;
    osc.connect(gain);
    gain.connect(this.ambientGain);
    osc.start();
    this.ambientNodes.push(osc, gain);
  }

  _startDriveInSynth() {
    this._startBreezeSynth();
    if (!this.ctx) return;
    // 50s Movie Projector Hum & Outdoor Drive-in Atmosphere
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = 110.00; // Low film motor drone A2
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 280;

    gain.gain.value = 0.06;
    osc.connect(filter);
    filter.connect(this.ambientGain);
    osc.start();
    this.ambientNodes.push(osc, filter, gain);
  }

  _startCrystalCaveSynth() {
    if (!this.ctx) return;
    // Mystical Resonant Crystal Cave Sine Drone Harmonics
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.value = 174.61; // F3 Crystal fundamental
    osc2.type = 'sine';
    osc2.frequency.value = 523.25; // C5 High crystal shimmer

    gain.gain.value = 0.07;
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ambientGain);

    osc1.start();
    osc2.start();
    this.ambientNodes.push(osc1, osc2, gain);
  }

  _startGrandCanyonSynth() {
    this._startWindSynth(1.1);
  }

  _startGhostShipSynth() {
    this._startWindSynth(1.3);
    if (!this.ctx) return;
    // Low ghostly siren whistle / eerie sea drone
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = 87.31; // F2 low ghost ship drone
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 240;

    gain.gain.value = 0.09;
    osc.connect(filter);
    filter.connect(this.ambientGain);
    osc.start();
    this.ambientNodes.push(osc, filter, gain);
  }

  _startConstructionSynth() {
    this._startBreezeSynth();
  }

  _startWesternMineSynth() {
    this._startWindSynth(1.1);
  }

  _startToyBoxSynth() {
    this._startBreezeSynth();
  }

  _startBambooValleySynth() {
    this._startBreezeSynth();
  }

  _startVampireCastleSynth() {
    this._startManorSynth();
  }

  _startSubwayStationSynth() {
    if (!this.ctx) return;
    // Underground station deep mechanical hum & ventilation rumble
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = 55.00; // Low A1 subway rumble

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 180;

    gain.gain.value = 0.12;
    osc.connect(filter);
    filter.connect(this.ambientGain);
    osc.start();
    this.ambientNodes.push(osc, filter, gain);
  }

  _startCloudCastleSynth() {
    this._startBreezeSynth();
    if (!this.ctx) return;
    // Ethereal celestial pad chime (High F5 & C6 sine chord)
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.value = 698.46; // F5 heavenly note
    osc2.type = 'sine';
    osc2.frequency.value = 1046.50; // C6 ethereal chime

    gain.gain.value = 0.05;
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ambientGain);

    osc1.start();
    osc2.start();
    this.ambientNodes.push(osc1, osc2, gain);
  }

  _startMysticMangroveSynth() {
    this._startBreezeSynth();
    if (!this.ctx) return;
    // Murky swamp sub-bass drone
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = 48.99; // G1 low swamp drone

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 160;

    gain.gain.value = 0.14;
    osc.connect(filter);
    filter.connect(this.ambientGain);
    osc.start();
    this.ambientNodes.push(osc, filter, gain);
  }

  _startOuterSpaceSynth() {
    if (!this.ctx) return;
    // Deep cosmic space void drone & sci-fi LFO sweep
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = 43.65; // F1 deep space sub drone

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 140;

    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.15; // Slow cosmic pulse

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 60;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    gain.gain.value = 0.15;
    osc.connect(filter);
    filter.connect(this.ambientGain);
    osc.start();
    this.ambientNodes.push(osc, filter, gain, lfo, lfoGain);
  }

  _startColosseumArenaSynth() {
    this._startBreezeSynth();
  }

  _startSkiResortSynth() {
    this._startWindSynth(1.1);
  }

  _startIcelandGeysirSynth() {
    this._startWindSynth(0.9);
  }

  _startGiantBakerySynth() {
    this._startBreezeSynth();
  }

  _startArcadeChipSynth() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.value = 65.4;

    filter.type = 'lowpass';
    filter.frequency.value = 240;

    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.8;

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 90;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    gain.gain.value = 0.12;
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ambientGain);
    osc.start();
    this.ambientNodes.push(osc, filter, gain, lfo, lfoGain);
  }

  _startSakuraParkSynth() {
    this._startBreezeSynth();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 329.63; // E4 peaceful flute/bell tone

      const lfo = this.ctx.createOscillator();
      lfo.frequency.value = 0.2; // Gentle breathing vibrato
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.value = 4;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      gain.gain.value = 0.04; // Very subtle, soothing
      osc.connect(gain);
      gain.connect(this.ambientGain);
      osc.start();
      this.ambientNodes.push(osc, gain, lfo, lfoGain);
    } catch(e) {}
  }

  _startFormula1TrackSynth() {
    if (!this.ctx) return;
    try {
      // 1. Rain on wet tarmac sound (White noise with bandpass)
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.12;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const rainFilter = this.ctx.createBiquadFilter();
      rainFilter.type = 'lowpass';
      rainFilter.frequency.value = 1100;

      const rainGain = this.ctx.createGain();
      rainGain.gain.value = 0.08;

      noise.connect(rainFilter);
      rainFilter.connect(rainGain);
      rainGain.connect(this.ambientGain);
      noise.start();

      // 2. Distant roaring F1 engine drone
      const engineOsc = this.ctx.createOscillator();
      engineOsc.type = 'sawtooth';
      engineOsc.frequency.value = 160;

      const engineFilter = this.ctx.createBiquadFilter();
      engineFilter.type = 'lowpass';
      engineFilter.frequency.value = 320;

      const engineLfo = this.ctx.createOscillator();
      engineLfo.frequency.value = 0.12; // slow rev variation
      const engineLfoGain = this.ctx.createGain();
      engineLfoGain.gain.value = 45;
      engineLfo.connect(engineLfoGain);
      engineLfoGain.connect(engineOsc.frequency);
      engineLfo.start();

      const engineGain = this.ctx.createGain();
      engineGain.gain.value = 0.06;

      engineOsc.connect(engineFilter);
      engineFilter.connect(engineGain);
      engineGain.connect(this.ambientGain);
      engineOsc.start();

      this.ambientNodes.push(noise, rainFilter, rainGain, engineOsc, engineFilter, engineGain, engineLfo, engineLfoGain);
    } catch(e) {}
  }

  _startCoralReefLowtideSynth() {
    this._startBreezeSynth();
    if (!this.ctx) return;
    try {
      // Gentle bubbling water trickle in tidal pools
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 520;

      const lfo = this.ctx.createOscillator();
      lfo.frequency.value = 2.4; // bubble warble
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.value = 80;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      gain.gain.value = 0.035;
      osc.connect(gain);
      gain.connect(this.ambientGain);
      osc.start();
      this.ambientNodes.push(osc, gain, lfo, lfoGain);
    } catch(e) {}
  }

  _startArtistStudioSynth() {
    this._startBreezeSynth();
    if (!this.ctx) return;
    try {
      // Warm Parisian bohemian acoustic/accordion drone
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = 220; // A3 warm tone

      const lfo = this.ctx.createOscillator();
      lfo.frequency.value = 0.3; // Gentle slow vibrato
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.value = 3.5;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      gain.gain.value = 0.04;
      osc.connect(gain);
      gain.connect(this.ambientGain);
      osc.start();
      this.ambientNodes.push(osc, gain, lfo, lfoGain);
    } catch(e) {}
  }

  _startPixelDesertSynth() {
    this._startBreezeSynth();
    if (!this.ctx) return;
    try {
      // 8-Bit NES Chiptune square-wave arpeggio drone
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.value = 164.81; // E3 retro root

      filter.type = 'lowpass';
      filter.frequency.value = 850; // Smooth 8-bit NES filter

      // Arpeggiate gently between nostalgic desert notes
      const notes = [164.81, 196.00, 246.94, 293.66];
      let step = 0;
      const arpInterval = setInterval(() => {
        if (!this.ctx || !osc) {
          clearInterval(arpInterval);
          return;
        }
        try {
          step = (step + 1) % notes.length;
          osc.frequency.setValueAtTime(notes[step], this.ctx.currentTime);
        } catch(e) {}
      }, 350);

      gain.gain.value = 0.022;
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ambientGain);
      osc.start();

      this.ambientNodes.push(osc, filter, gain, { stop: () => clearInterval(arpInterval), disconnect: () => {} });
    } catch(e) {}
  }

  _startGizaPyramidsSynth() {
    this._startBreezeSynth();
    if (!this.ctx) return;
    try {
      // Mystical ancient Egyptian Phrygian drone
      const osc = this.ctx.createOscillator();
      const oscHarmonic = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.value = 146.83; // D3 mystic root

      oscHarmonic.type = 'triangle';
      oscHarmonic.frequency.value = 220.00; // A3 fifth

      filter.type = 'lowpass';
      filter.frequency.value = 420; // Deep warm resonant temple hum
      filter.Q.value = 3.5;

      // Slow mystical desert wind LFO on filter cutoff
      const lfo = this.ctx.createOscillator();
      lfo.frequency.value = 0.15;
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.value = 180;
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();

      gain.gain.value = 0.035;
      osc.connect(filter);
      oscHarmonic.connect(filter);
      filter.connect(gain);
      gain.connect(this.ambientGain);

      osc.start();
      oscHarmonic.start();

      this.ambientNodes.push(osc, oscHarmonic, filter, gain, lfo, lfoGain);
    } catch(e) {}
  }

  _startSoccerStadiumSynth() {
    this._startBreezeSynth();
    if (!this.ctx) return;
    try {
      // Stadium Crowd cheering / murmur drone
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc1.type = 'sawtooth';
      osc1.frequency.value = 110;
      osc2.type = 'triangle';
      osc2.frequency.value = 165;

      filter.type = 'bandpass';
      filter.frequency.value = 360;
      filter.Q.value = 2.0;

      const lfo = this.ctx.createOscillator();
      lfo.frequency.value = 0.25;
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.value = 0.015;
      lfo.connect(lfoGain);

      gain.gain.value = 0.035;
      lfoGain.connect(gain.gain);
      lfo.start();

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.ambientGain);

      osc1.start();
      osc2.start();

      this.ambientNodes.push(osc1, osc2, filter, gain, lfo, lfoGain);
    } catch(e) {}
  }

  _startPrairieTornadoSynth() {
    this._startBreezeSynth();
    if (!this.ctx) return;
    try {
      // 1. Howling Tornado Gale
      const oscWind = this.ctx.createOscillator();
      const filterWind = this.ctx.createBiquadFilter();
      const gainWind = this.ctx.createGain();

      oscWind.type = 'sawtooth';
      oscWind.frequency.value = 75;

      filterWind.type = 'bandpass';
      filterWind.frequency.value = 280;
      filterWind.Q.value = 3.5;

      const lfoHowl = this.ctx.createOscillator();
      lfoHowl.frequency.value = 0.18;
      const lfoHowlGain = this.ctx.createGain();
      lfoHowlGain.gain.value = 160;
      lfoHowl.connect(lfoHowlGain);
      lfoHowlGain.connect(filterWind.frequency);
      lfoHowl.start();

      gainWind.gain.value = 0.045;
      oscWind.connect(filterWind);
      filterWind.connect(gainWind);
      gainWind.connect(this.ambientGain);
      oscWind.start();

      // 2. Deep Sub-Bass Thunder Rumble
      const oscThunder = this.ctx.createOscillator();
      const filterThunder = this.ctx.createBiquadFilter();
      const gainThunder = this.ctx.createGain();

      oscThunder.type = 'sine';
      oscThunder.frequency.value = 52;
      filterThunder.type = 'lowpass';
      filterThunder.frequency.value = 95;

      const lfoThunder = this.ctx.createOscillator();
      lfoThunder.frequency.value = 0.08;
      const lfoThunderGain = this.ctx.createGain();
      lfoThunderGain.gain.value = 0.02;
      lfoThunder.connect(lfoThunderGain);

      gainThunder.gain.value = 0.04;
      lfoThunderGain.connect(gainThunder.gain);
      lfoThunder.start();

      oscThunder.connect(filterThunder);
      filterThunder.connect(gainThunder);
      gainThunder.connect(this.ambientGain);
      oscThunder.start();

      this.ambientNodes.push(oscWind, filterWind, gainWind, lfoHowl, lfoHowlGain, oscThunder, filterThunder, gainThunder, lfoThunder, lfoThunderGain);
    } catch(e) {}
  }

  _startRetroLivingRoomSynth() {
    if (!this.ctx) return;
    try {
      // 1. Warm romantic 70s lounge electric piano / Rhodes chord drone
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const osc3 = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc1.type = 'triangle';
      osc1.frequency.value = 174.61;
      osc2.type = 'triangle';
      osc2.frequency.value = 220.00;
      osc3.type = 'sine';
      osc3.frequency.value = 261.63;

      filter.type = 'lowpass';
      filter.frequency.value = 480;

      const lfo = this.ctx.createOscillator();
      lfo.frequency.value = 0.35;
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.value = 2.5;
      lfo.connect(lfoGain);
      lfoGain.connect(osc1.frequency);
      lfoGain.connect(osc2.frequency);
      lfo.start();

      gain.gain.value = 0.032;
      osc1.connect(filter);
      osc2.connect(filter);
      osc3.connect(filter);
      filter.connect(gain);
      gain.connect(this.ambientGain);

      osc1.start();
      osc2.start();
      osc3.start();

      // 2. Cozy Fireplace / Vinyl Crackle Simulation
      const crackleInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(crackleInterval);
          return;
        }
        try {
          if (Math.random() > 0.4) {
            const snapOsc = this.ctx.createOscillator();
            const snapGain = this.ctx.createGain();
            snapOsc.type = 'triangle';
            snapOsc.frequency.value = 800 + Math.random() * 1200;
            snapGain.gain.setValueAtTime(0.008 + Math.random() * 0.012, this.ctx.currentTime);
            snapGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);
            snapOsc.connect(snapGain);
            snapGain.connect(this.ambientGain);
            snapOsc.start();
            snapOsc.stop(this.ctx.currentTime + 0.05);
          }
        } catch(e) {}
      }, 180);

      this.ambientNodes.push(osc1, osc2, osc3, filter, gain, lfo, lfoGain, { stop: () => clearInterval(crackleInterval), disconnect: () => {} });
    } catch(e) {}
  }

  _startComicDrawingBoardSynth() {
    if (!this.ctx) return;
    try {
      // 1. Playful comic cartoon jazz chords & pencil sketch rhythm
      const notes = [261.63, 329.63, 392.00, 440.00, 523.25]; // C major pentatonic
      let noteIdx = 0;

      const comicInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(comicInterval);
          return;
        }
        try {
          // Playful cartoon pizzicato / marimba note
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = Math.random() > 0.5 ? 'triangle' : 'sine';
          const freq = notes[noteIdx % notes.length];
          noteIdx = (noteIdx + Math.floor(1 + Math.random() * 3)) % notes.length;
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

          gain.gain.setValueAtTime(0.024, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.28);

          osc.connect(gain);
          gain.connect(this.ambientGain);
          osc.start();
          osc.stop(this.ctx.currentTime + 0.30);

          // Subtiles Zeichnen-Kratzen (Pencil Sketch Scratch Foley)
          if (Math.random() > 0.35) {
            const scratchOsc = this.ctx.createOscillator();
            const scratchGain = this.ctx.createGain();
            scratchOsc.type = 'sawtooth';
            scratchOsc.frequency.setValueAtTime(1400 + Math.random() * 800, this.ctx.currentTime);
            scratchGain.gain.setValueAtTime(0.006, this.ctx.currentTime);
            scratchGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.08);
            scratchOsc.connect(scratchGain);
            scratchGain.connect(this.ambientGain);
            scratchOsc.start();
            scratchOsc.stop(this.ctx.currentTime + 0.09);
          }
        } catch(e) {}
      }, 340);

      this.ambientNodes.push({ stop: () => clearInterval(comicInterval), disconnect: () => {} });
    } catch(e) {}
  }

  _startVeniceCanalsSynth() {
    if (!this.ctx) return;
    try {
      // 1. Romantic Italian Mandolin / Barcarolle Arpeggio Progression
      const barcarollePatterns = [
        [220.00, 261.63, 329.63, 440.00], // Am (A3, C4, E4, A4)
        [293.66, 349.23, 440.00, 587.33], // Dm (D4, F4, A4, D5)
        [164.81, 246.94, 329.63, 493.88], // E7 (E3, B3, E4, B4)
        [174.61, 261.63, 349.23, 523.25]  // F (F3, C4, F4, C5)
      ];
      let patternIdx = 0;
      let noteStep = 0;

      const veniceInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(veniceInterval);
          return;
        }
        try {
          const chord = barcarollePatterns[patternIdx];
          const freq = chord[noteStep % chord.length];
          noteStep++;
          if (noteStep >= chord.length * 2) {
            noteStep = 0;
            patternIdx = (patternIdx + 1) % barcarollePatterns.length;
          }

          // Mandolin / Accordion Pluck
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = noteStep % 2 === 0 ? 'triangle' : 'sine';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

          gain.gain.setValueAtTime(0.022, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.35);

          osc.connect(gain);
          gain.connect(this.ambientGain);
          osc.start();
          osc.stop(this.ctx.currentTime + 0.38);

          // Gentle Water Ripple / Lap
          if (Math.random() > 0.6) {
            const lapOsc = this.ctx.createOscillator();
            const lapGain = this.ctx.createGain();
            lapOsc.type = 'sine';
            lapOsc.frequency.setValueAtTime(140 + Math.random() * 80, this.ctx.currentTime);
            lapGain.gain.setValueAtTime(0.012, this.ctx.currentTime);
            lapGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.22);
            lapOsc.connect(lapGain);
            lapGain.connect(this.ambientGain);
            lapOsc.start();
            lapOsc.stop(this.ctx.currentTime + 0.25);
          }
        } catch(e) {}
      }, 290);

      this.ambientNodes.push({ stop: () => clearInterval(veniceInterval), disconnect: () => {} });
    } catch(e) {}
  }

  _startSkateparkSynth() {
    if (!this.ctx) return;
    try {
      // 1. Energetic Urban Skatepark Bass Groove & Ollie Clicks
      const skateRiff = [82.41, 98.00, 110.00, 123.47, 146.83, 110.00]; // E minor pentatonic bass
      let stepIdx = 0;

      const skateInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(skateInterval);
          return;
        }
        try {
          // Punchy Synth Bass Pluck
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          const freq = skateRiff[stepIdx % skateRiff.length];
          stepIdx++;
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

          // Lowpass filter for punchy bass
          const filter = this.ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(450, this.ctx.currentTime);

          gain.gain.setValueAtTime(0.028, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.22);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.ambientGain);
          osc.start();
          osc.stop(this.ctx.currentTime + 0.24);

          // Skateboard Ollie Pop / Grind Click
          if (stepIdx % 2 === 0 || Math.random() > 0.5) {
            const popOsc = this.ctx.createOscillator();
            const popGain = this.ctx.createGain();
            popOsc.type = 'triangle';
            popOsc.frequency.setValueAtTime(600 + Math.random() * 800, this.ctx.currentTime);
            popGain.gain.setValueAtTime(0.015, this.ctx.currentTime);
            popGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.05);
            popOsc.connect(popGain);
            popGain.connect(this.ambientGain);
            popOsc.start();
            popOsc.stop(this.ctx.currentTime + 0.06);
          }
        } catch(e) {}
      }, 240);

      this.ambientNodes.push({ stop: () => clearInterval(skateInterval), disconnect: () => {} });
    } catch(e) {}
  }

  _startAuroraBorealisSynth() {
    if (!this.ctx) return;
    try {
      // 1. Mystical Nordic Crystal Aurora Shimmer
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const osc3 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc1.type = 'sine';
      osc2.type = 'sine';
      osc3.type = 'triangle';

      osc1.frequency.value = 164.81; // E3
      osc2.frequency.value = 246.94; // B3
      osc3.frequency.value = 369.99; // F#4

      filter.type = 'lowpass';
      filter.frequency.value = 750;

      // Slow Breathing Aurora LFO
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.type = 'sine';
      lfo.frequency.value = 0.18;
      lfoGain.gain.value = 250;
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();

      gain.gain.value = 0.026;
      osc1.connect(filter);
      osc2.connect(filter);
      osc3.connect(filter);
      filter.connect(gain);
      gain.connect(this.ambientGain);

      osc1.start();
      osc2.start();
      osc3.start();

      // 2. High Crystalline Ice Chimes
      const chimeNotes = [659.25, 830.61, 987.77, 1318.51, 1479.98]; // E5, G#5, B5, E6, F#6
      const chimeInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(chimeInterval);
          return;
        }
        try {
          if (Math.random() > 0.4) {
            const cOsc = this.ctx.createOscillator();
            const cGain = this.ctx.createGain();
            cOsc.type = 'sine';
            const freq = chimeNotes[Math.floor(Math.random() * chimeNotes.length)];
            cOsc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            cGain.gain.setValueAtTime(0.009, this.ctx.currentTime);
            cGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.65);
            cOsc.connect(cGain);
            cGain.connect(this.ambientGain);
            cOsc.start();
            cOsc.stop(this.ctx.currentTime + 0.70);
          }
        } catch(e) {}
      }, 380);

      this.ambientNodes.push(osc1, osc2, osc3, filter, gain, lfo, lfoGain, { stop: () => clearInterval(chimeInterval), disconnect: () => {} });
    } catch(e) {}
  }

  _startMadScientistLabSynth() {
    if (!this.ctx) return;
    try {
      // 1. High-Voltage Power Transformer & Lab Machine Hum (60Hz / 120Hz)
      const humOsc1 = this.ctx.createOscillator();
      const humOsc2 = this.ctx.createOscillator();
      const humFilter = this.ctx.createBiquadFilter();
      const humGain = this.ctx.createGain();

      humOsc1.type = 'sawtooth';
      humOsc1.frequency.value = 60; // 60 Hz mains hum
      humOsc2.type = 'square';
      humOsc2.frequency.value = 120; // 2nd harmonic hum

      humFilter.type = 'lowpass';
      humFilter.frequency.value = 240;

      humGain.gain.value = 0.016;

      humOsc1.connect(humFilter);
      humOsc2.connect(humFilter);
      humFilter.connect(humGain);
      humGain.connect(this.ambientGain);

      humOsc1.start();
      humOsc2.start();

      // 2. Periodic Tesla-Sparks & Electric Zaps + Chemical Flask Bubbling
      const sparkInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(sparkInterval);
          return;
        }
        try {
          const now = this.ctx.currentTime;
          // A. Electric Spark Crackle Zap (35% probability)
          if (Math.random() < 0.35) {
            const sparkOsc = this.ctx.createOscillator();
            const sparkGain = this.ctx.createGain();
            const zapType = Math.random();
            sparkOsc.type = zapType > 0.5 ? 'sawtooth' : 'square';
            const startFreq = 400 + Math.random() * 1800;
            const endFreq = 100 + Math.random() * 300;
            sparkOsc.frequency.setValueAtTime(startFreq, now);
            sparkOsc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.06);

            sparkGain.gain.setValueAtTime(0.018, now);
            sparkGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.065);

            sparkOsc.connect(sparkGain);
            sparkGain.connect(this.ambientGain);
            sparkOsc.start(now);
            sparkOsc.stop(now + 0.07);
          }

          // B. Chemical Flask Bubbling Beakers (50% probability)
          if (Math.random() < 0.50) {
            const bubbleOsc = this.ctx.createOscillator();
            const bubbleGain = this.ctx.createGain();
            bubbleOsc.type = 'sine';
            const baseFreq = 220 + Math.random() * 260;
            bubbleOsc.frequency.setValueAtTime(baseFreq, now);
            bubbleOsc.frequency.exponentialRampToValueAtTime(baseFreq * 1.6, now + 0.05);

            bubbleGain.gain.setValueAtTime(0.014, now);
            bubbleGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);

            bubbleOsc.connect(bubbleGain);
            bubbleGain.connect(this.ambientGain);
            bubbleOsc.start(now);
            bubbleOsc.stop(now + 0.06);
          }
        } catch(e) {}
      }, 220);

      this.ambientNodes.push(humOsc1, humOsc2, humFilter, humGain, { stop: () => clearInterval(sparkInterval), disconnect: () => {} });
    } catch(e) {}
  }

  _startTajMahalSynth() {
    if (!this.ctx) return;
    try {
      // 1. Warm Meditative Tanpura Drone (C#3, G#3, C#4)
      const droneOsc1 = this.ctx.createOscillator();
      const droneOsc2 = this.ctx.createOscillator();
      const droneOsc3 = this.ctx.createOscillator();
      const droneGain = this.ctx.createGain();
      const droneFilter = this.ctx.createBiquadFilter();

      droneOsc1.type = 'sawtooth';
      droneOsc2.type = 'sine';
      droneOsc3.type = 'triangle';

      droneOsc1.frequency.value = 138.59; // C#3 root drone
      droneOsc2.frequency.value = 207.65; // G#3 (Pancham / 5th)
      droneOsc3.frequency.value = 277.18; // C#4 octave

      droneFilter.type = 'lowpass';
      droneFilter.frequency.value = 480;

      // Gentle Breathing Tanpura LFO
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.type = 'sine';
      lfo.frequency.value = 0.15; // Slow swell
      lfoGain.gain.value = 140;
      lfo.connect(lfoGain);
      lfoGain.connect(droneFilter.frequency);
      lfo.start();

      droneGain.gain.value = 0.024;

      droneOsc1.connect(droneFilter);
      droneOsc2.connect(droneFilter);
      droneOsc3.connect(droneFilter);
      droneFilter.connect(droneGain);
      droneGain.connect(this.ambientGain);

      droneOsc1.start();
      droneOsc2.start();
      droneOsc3.start();

      // 2. Meditative Sitar / Sarod Plucks & Water Ripple Notes (Raag Pentatonic)
      const ragaNotes = [277.18, 311.13, 349.23, 415.30, 466.16, 554.37, 622.25, 698.46];
      let ragaIdx = 0;

      const sitarInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(sitarInterval);
          return;
        }
        try {
          const now = this.ctx.currentTime;
          if (Math.random() > 0.3) {
            const sOsc = this.ctx.createOscillator();
            const sGain = this.ctx.createGain();
            sOsc.type = 'triangle';

            const noteFreq = ragaNotes[ragaIdx % ragaNotes.length];
            ragaIdx = (ragaIdx + 1 + Math.floor(Math.random() * 2)) % ragaNotes.length;

            sOsc.frequency.setValueAtTime(noteFreq, now);
            // Sitar meend (slight pitch bend upwards)
            sOsc.frequency.linearRampToValueAtTime(noteFreq * 1.025, now + 0.12);

            sGain.gain.setValueAtTime(0.016, now);
            sGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.75);

            sOsc.connect(sGain);
            sGain.connect(this.ambientGain);
            sOsc.start(now);
            sOsc.stop(now + 0.80);
          }
        } catch(e) {}
      }, 480);

      this.ambientNodes.push(droneOsc1, droneOsc2, droneOsc3, droneFilter, droneGain, lfo, lfoGain, { stop: () => clearInterval(sitarInterval), disconnect: () => {} });
    } catch(e) {}
  }

  _startHangingGardensBabylonSynth() {
    if (!this.ctx) return;
    try {
      // 1. Plätschernde Terrassen-Wasserfälle & Fließendes Wasser (Cascading Terrace Waterfall Audio)
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        lastOut = (lastOut + 0.02 * white) / 1.02; // Pink-tinted water noise
        data[i] = lastOut * 0.45;
      }
      const waterNoise = this.ctx.createBufferSource();
      waterNoise.buffer = buffer;
      waterNoise.loop = true;

      const waterFilter = this.ctx.createBiquadFilter();
      waterFilter.type = 'bandpass';
      waterFilter.frequency.value = 680;
      waterFilter.Q.value = 1.2;

      // Gentle bubbling water modulation
      const waterLFO = this.ctx.createOscillator();
      const waterLFOGain = this.ctx.createGain();
      waterLFO.frequency.value = 0.35;
      waterLFOGain.gain.value = 220;
      waterLFO.connect(waterFilter.frequency);
      waterLFO.start();

      const waterGain = this.ctx.createGain();
      waterGain.gain.value = 0.038;

      waterNoise.connect(waterFilter);
      waterFilter.connect(waterGain);
      waterGain.connect(this.ambientGain);
      waterNoise.start();

      // 2. Warmer antiker Orient-Harmonie-Drone (Ancient Mesopotamia Drone)
      const droneOsc1 = this.ctx.createOscillator();
      const droneOsc2 = this.ctx.createOscillator();
      droneOsc1.type = 'sawtooth';
      droneOsc2.type = 'sine';
      droneOsc1.frequency.value = 110.0; // A2
      droneOsc2.frequency.value = 164.81; // E3

      const droneFilter = this.ctx.createBiquadFilter();
      droneFilter.type = 'lowpass';
      droneFilter.frequency.value = 340;

      const droneGain = this.ctx.createGain();
      droneGain.gain.value = 0.022;

      droneOsc1.connect(droneFilter);
      droneOsc2.connect(droneFilter);
      droneFilter.connect(droneGain);
      droneGain.connect(this.ambientGain);

      droneOsc1.start();
      droneOsc2.start();

      // 3. Antike babylonische Harfen- & Oud-Zupfnoten (Ancient Mesopotamian Harp & Oud Plucks)
      const babylonNotes = [220.00, 246.94, 261.63, 293.66, 329.63, 349.23, 440.00, 493.88, 523.25];
      let noteStep = 0;

      const harpInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(harpInterval);
          return;
        }
        try {
          const now = this.ctx.currentTime;
          if (Math.random() > 0.28) {
            const hOsc = this.ctx.createOscillator();
            const hGain = this.ctx.createGain();
            hOsc.type = Math.random() > 0.5 ? 'triangle' : 'sine';

            const freq = babylonNotes[noteStep % babylonNotes.length];
            noteStep = (noteStep + 1 + Math.floor(Math.random() * 3)) % babylonNotes.length;

            hOsc.frequency.setValueAtTime(freq, now);
            hGain.gain.setValueAtTime(0.019, now);
            hGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.95);

            hOsc.connect(hGain);
            hGain.connect(this.ambientGain);
            hOsc.start(now);
            hOsc.stop(now + 1.0);
          }
        } catch(e) {}
      }, 520);

      this.ambientNodes.push(
        waterNoise, waterFilter, waterLFO, waterLFOGain, waterGain,
        droneOsc1, droneOsc2, droneFilter, droneGain,
        { stop: () => clearInterval(harpInterval), disconnect: () => {} }
      );
    } catch(e) {}
  }

  _startZeusStatueOlympiaSynth() {
    if (!this.ctx) return;
    try {
      // 1. Erhabener, heiliger Tempel-Choral-Drone (Majestic Greek Sacred Temple Drone)
      const droneOsc1 = this.ctx.createOscillator();
      const droneOsc2 = this.ctx.createOscillator();
      const droneOsc3 = this.ctx.createOscillator();
      droneOsc1.type = 'sawtooth';
      droneOsc2.type = 'sine';
      droneOsc3.type = 'triangle';
      droneOsc1.frequency.value = 130.81; // C3
      droneOsc2.frequency.value = 196.00; // G3
      droneOsc3.frequency.value = 261.63; // C4

      const droneFilter = this.ctx.createBiquadFilter();
      droneFilter.type = 'lowpass';
      droneFilter.frequency.value = 420;

      const droneGain = this.ctx.createGain();
      droneGain.gain.value = 0.024;

      droneOsc1.connect(droneFilter);
      droneOsc2.connect(droneFilter);
      droneOsc3.connect(droneFilter);
      droneFilter.connect(droneGain);
      droneGain.connect(this.ambientGain);

      droneOsc1.start();
      droneOsc2.start();
      droneOsc3.start();

      // 2. Klingen goldener Taler & Antike Olympische Harfen-Arpeggios (Golden Coin Chimes & Lyre Plucks)
      const greekNotes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 659.25, 783.99, 1046.50];
      let noteStep = 0;

      const coinInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(coinInterval);
          return;
        }
        try {
          const now = this.ctx.currentTime;
          if (Math.random() > 0.25) {
            const cOsc = this.ctx.createOscillator();
            const cGain = this.ctx.createGain();
            // Sine / bell-like tone for coin chime
            cOsc.type = Math.random() > 0.4 ? 'sine' : 'triangle';

            const freq = greekNotes[noteStep % greekNotes.length];
            noteStep = (noteStep + 1 + Math.floor(Math.random() * 2)) % greekNotes.length;

            cOsc.frequency.setValueAtTime(freq, now);
            cGain.gain.setValueAtTime(0.022, now);
            cGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);

            cOsc.connect(cGain);
            cGain.connect(this.ambientGain);
            cOsc.start(now);
            cOsc.stop(now + 0.90);
          }
        } catch(e) {}
      }, 420);

      this.ambientNodes.push(
        droneOsc1, droneOsc2, droneOsc3, droneFilter, droneGain,
        { stop: () => clearInterval(coinInterval), disconnect: () => {} }
      );
    } catch(e) {}
  }

  _startLighthouseAlexandriaSynth() {
    if (!this.ctx) return;
    try {
      // 1. Meeresbrandung & Wehender Mittelmeer-Regen (Mediterranean Ocean Swell & Rain Noise)
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        lastOut = (lastOut + 0.025 * white) / 1.025;
        data[i] = lastOut * 0.40;
      }
      const surfNoise = this.ctx.createBufferSource();
      surfNoise.buffer = buffer;
      surfNoise.loop = true;

      const surfFilter = this.ctx.createBiquadFilter();
      surfFilter.type = 'lowpass';
      surfFilter.frequency.value = 850;

      // Slow ocean wave swell LFO
      const waveLFO = this.ctx.createOscillator();
      const waveLFOGain = this.ctx.createGain();
      waveLFO.frequency.value = 0.22; // ~4.5 second swell cycle
      waveLFOGain.gain.value = 350;
      waveLFO.connect(surfFilter.frequency);
      waveLFO.start();

      const surfGain = this.ctx.createGain();
      surfGain.gain.value = 0.045;

      surfNoise.connect(surfFilter);
      surfFilter.connect(surfGain);
      surfGain.connect(this.ambientGain);
      surfNoise.start();

      // 2. Antiker Hafen- & Festungs-Drone (Maritime Harbor Drone)
      const droneOsc1 = this.ctx.createOscillator();
      const droneOsc2 = this.ctx.createOscillator();
      droneOsc1.type = 'sawtooth';
      droneOsc2.type = 'sine';
      droneOsc1.frequency.value = 146.83; // D3
      droneOsc2.frequency.value = 220.00; // A3

      const droneFilter = this.ctx.createBiquadFilter();
      droneFilter.type = 'lowpass';
      droneFilter.frequency.value = 380;

      const droneGain = this.ctx.createGain();
      droneGain.gain.value = 0.020;

      droneOsc1.connect(droneFilter);
      droneOsc2.connect(droneFilter);
      droneFilter.connect(droneGain);
      droneGain.connect(this.ambientGain);

      droneOsc1.start();
      droneOsc2.start();

      // 3. Antike Signal-Bronzeglocke & Leuchtfeuer-Harmonien (Bronze Harbor Beacon Chime)
      const harborNotes = [349.23, 440.00, 523.25, 587.33, 698.46, 880.00];
      let noteStep = 0;

      const bellInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(bellInterval);
          return;
        }
        try {
          const now = this.ctx.currentTime;
          if (Math.random() > 0.35) {
            const bOsc = this.ctx.createOscillator();
            const bGain = this.ctx.createGain();
            bOsc.type = 'sine';

            const freq = harborNotes[noteStep % harborNotes.length];
            noteStep = (noteStep + 1 + Math.floor(Math.random() * 2)) % harborNotes.length;

            bOsc.frequency.setValueAtTime(freq, now);
            bGain.gain.setValueAtTime(0.020, now);
            bGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

            bOsc.connect(bGain);
            bGain.connect(this.ambientGain);
            bOsc.start(now);
            bOsc.stop(now + 1.25);
          }
        } catch(e) {}
      }, 620);

      this.ambientNodes.push(
        surfNoise, surfFilter, waveLFO, waveLFOGain, surfGain,
        droneOsc1, droneOsc2, droneFilter, droneGain,
        { stop: () => clearInterval(bellInterval), disconnect: () => {} }
      );
    } catch(e) {}
  }

  _startColossusRhodesSynth() {
    if (!this.ctx) return;
    try {
      // 1. Sanfte ägäische Meeresbrise & Hafenwellen (Aegean Sea Breeze & Harbor Waves)
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        lastOut = (lastOut + 0.02 * white) / 1.02;
        data[i] = lastOut * 0.35;
      }
      const seaNoise = this.ctx.createBufferSource();
      seaNoise.buffer = buffer;
      seaNoise.loop = true;

      const seaFilter = this.ctx.createBiquadFilter();
      seaFilter.type = 'lowpass';
      seaFilter.frequency.value = 750;

      const seaLFO = this.ctx.createOscillator();
      const seaLFOGain = this.ctx.createGain();
      seaLFO.frequency.value = 0.28;
      seaLFOGain.gain.value = 260;
      seaLFO.connect(seaFilter.frequency);
      seaLFO.start();

      const seaGain = this.ctx.createGain();
      seaGain.gain.value = 0.035;

      seaNoise.connect(seaFilter);
      seaFilter.connect(seaGain);
      seaGain.connect(this.ambientGain);
      seaNoise.start();

      // 2. Triumphaler Helios-Sonnengott-Drone (Warm Bronze Brass & Harmonic Solar Drone)
      const droneOsc1 = this.ctx.createOscillator();
      const droneOsc2 = this.ctx.createOscillator();
      const droneOsc3 = this.ctx.createOscillator();
      droneOsc1.type = 'sawtooth';
      droneOsc2.type = 'sine';
      droneOsc3.type = 'triangle';
      droneOsc1.frequency.value = 164.81; // E3
      droneOsc2.frequency.value = 246.94; // B3
      droneOsc3.frequency.value = 329.63; // E4

      const droneFilter = this.ctx.createBiquadFilter();
      droneFilter.type = 'lowpass';
      droneFilter.frequency.value = 460;

      const droneGain = this.ctx.createGain();
      droneGain.gain.value = 0.022;

      droneOsc1.connect(droneFilter);
      droneOsc2.connect(droneFilter);
      droneOsc3.connect(droneFilter);
      droneFilter.connect(droneGain);
      droneGain.connect(this.ambientGain);

      droneOsc1.start();
      droneOsc2.start();
      droneOsc3.start();

      // 3. Goldene Sonnen-Leier & Antike Fanfaren-Zupfnoten (Solar Lyre Arpeggios)
      const heliosNotes = [329.63, 369.99, 415.30, 493.88, 659.25, 739.99, 830.61];
      let noteStep = 0;

      const lyreInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(lyreInterval);
          return;
        }
        try {
          const now = this.ctx.currentTime;
          if (Math.random() > 0.3) {
            const lOsc = this.ctx.createOscillator();
            const lGain = this.ctx.createGain();
            lOsc.type = Math.random() > 0.4 ? 'triangle' : 'sine';

            const freq = heliosNotes[noteStep % heliosNotes.length];
            noteStep = (noteStep + 1 + Math.floor(Math.random() * 2)) % heliosNotes.length;

            lOsc.frequency.setValueAtTime(freq, now);
            lGain.gain.setValueAtTime(0.018, now);
            lGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);

            lOsc.connect(lGain);
            lGain.connect(this.ambientGain);
            lOsc.start(now);
            lOsc.stop(now + 0.90);
          }
        } catch(e) {}
      }, 480);

      this.ambientNodes.push(
        seaNoise, seaFilter, seaLFO, seaLFOGain, seaGain,
        droneOsc1, droneOsc2, droneOsc3, droneFilter, droneGain,
        { stop: () => clearInterval(lyreInterval), disconnect: () => {} }
      );
    } catch(e) {}
  }

  _startMausoleumHalicarnassusSynth() {
    if (!this.ctx) return;
    try {
      // 1. Abendwind über Halikarnassos (Evening Wind whispering around the tomb)
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        lastOut = (lastOut + 0.018 * white) / 1.018;
        data[i] = lastOut * 0.32;
      }
      const windNoise = this.ctx.createBufferSource();
      windNoise.buffer = buffer;
      windNoise.loop = true;

      const windFilter = this.ctx.createBiquadFilter();
      windFilter.type = 'lowpass';
      windFilter.frequency.value = 520;

      const windLFO = this.ctx.createOscillator();
      const windLFOGain = this.ctx.createGain();
      windLFO.frequency.value = 0.18;
      windLFOGain.gain.value = 190;
      windLFO.connect(windFilter.frequency);
      windLFO.start();

      const windGain = this.ctx.createGain();
      windGain.gain.value = 0.030;

      windNoise.connect(windFilter);
      windFilter.connect(windGain);
      windGain.connect(this.ambientGain);
      windNoise.start();

      // 2. Majestätischer Grabmal-Elegy-Drone (Mausolos Royal Elegy Drone)
      const droneOsc1 = this.ctx.createOscillator();
      const droneOsc2 = this.ctx.createOscillator();
      const droneOsc3 = this.ctx.createOscillator();
      droneOsc1.type = 'sawtooth';
      droneOsc2.type = 'triangle';
      droneOsc3.type = 'sine';
      droneOsc1.frequency.value = 146.83; // D3
      droneOsc2.frequency.value = 220.00; // A3
      droneOsc3.frequency.value = 293.66; // D4

      const droneFilter = this.ctx.createBiquadFilter();
      droneFilter.type = 'lowpass';
      droneFilter.frequency.value = 420;

      const droneGain = this.ctx.createGain();
      droneGain.gain.value = 0.024;

      droneOsc1.connect(droneFilter);
      droneOsc2.connect(droneFilter);
      droneOsc3.connect(droneFilter);
      droneFilter.connect(droneGain);
      droneGain.connect(this.ambientGain);

      droneOsc1.start();
      droneOsc2.start();
      droneOsc3.start();

      // 3. Antike karische Trauer- & Ehrenharfe (Ancient Carian Lyre / Chimes)
      const mausolosNotes = [293.66, 329.63, 349.23, 392.00, 440.00, 523.25, 587.33, 659.25];
      let noteStep = 0;

      const lyreInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(lyreInterval);
          return;
        }
        try {
          const now = this.ctx.currentTime;
          if (Math.random() > 0.32) {
            const lOsc = this.ctx.createOscillator();
            const lGain = this.ctx.createGain();
            lOsc.type = Math.random() > 0.35 ? 'triangle' : 'sine';

            const freq = mausolosNotes[noteStep % mausolosNotes.length];
            noteStep = (noteStep + 1 + Math.floor(Math.random() * 2)) % mausolosNotes.length;

            lOsc.frequency.setValueAtTime(freq, now);
            lGain.gain.setValueAtTime(0.016, now);
            lGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.95);

            lOsc.connect(lGain);
            lGain.connect(this.ambientGain);
            lOsc.start(now);
            lOsc.stop(now + 1.0);
          }
        } catch(e) {}
      }, 520);

      this.ambientNodes.push(
        windNoise, windFilter, windLFO, windLFOGain, windGain,
        droneOsc1, droneOsc2, droneOsc3, droneFilter, droneGain,
        { stop: () => clearInterval(lyreInterval), disconnect: () => {} }
      );
    } catch(e) {}
  }

  _startArtemisTempleSynth() {
    if (!this.ctx) return;
    try {
      // 1. Weihrauch- und Tempelhauch (Sacred Temple Atmosphere & Rising Incense Breath)
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        lastOut = (lastOut + 0.015 * white) / 1.015;
        data[i] = lastOut * 0.30;
      }
      const templeNoise = this.ctx.createBufferSource();
      templeNoise.buffer = buffer;
      templeNoise.loop = true;

      const templeFilter = this.ctx.createBiquadFilter();
      templeFilter.type = 'lowpass';
      templeFilter.frequency.value = 480;

      const templeLFO = this.ctx.createOscillator();
      const templeLFOGain = this.ctx.createGain();
      templeLFO.frequency.value = 0.15;
      templeLFOGain.gain.value = 170;
      templeLFO.connect(templeFilter.frequency);
      templeLFO.start();

      const templeGain = this.ctx.createGain();
      templeGain.gain.value = 0.028;

      templeNoise.connect(templeFilter);
      templeFilter.connect(templeGain);
      templeGain.connect(this.ambientGain);
      templeNoise.start();

      // 2. Sakraler Säulenwald-Harmonie-Drone (Sacred Colonnade Sanctuary Drone - G minor/Aeolian)
      const droneOsc1 = this.ctx.createOscillator();
      const droneOsc2 = this.ctx.createOscillator();
      const droneOsc3 = this.ctx.createOscillator();
      droneOsc1.type = 'sine';
      droneOsc2.type = 'triangle';
      droneOsc3.type = 'sawtooth';
      droneOsc1.frequency.value = 196.00; // G3
      droneOsc2.frequency.value = 293.66; // D4
      droneOsc3.frequency.value = 466.16; // Bb4

      const droneFilter = this.ctx.createBiquadFilter();
      droneFilter.type = 'lowpass';
      droneFilter.frequency.value = 440;

      const droneGain = this.ctx.createGain();
      droneGain.gain.value = 0.022;

      droneOsc1.connect(droneFilter);
      droneOsc2.connect(droneFilter);
      droneOsc3.connect(droneFilter);
      droneFilter.connect(droneGain);
      droneGain.connect(this.ambientGain);

      droneOsc1.start();
      droneOsc2.start();
      droneOsc3.start();

      // 3. Silberne Artemis-Glocken & Antike Tempel-Leierzupfer (Artemis Silver Chimes & Lyre)
      const artemisNotes = [392.00, 440.00, 466.16, 523.25, 587.33, 698.46, 783.99, 880.00];
      let noteStep = 0;

      const lyreInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(lyreInterval);
          return;
        }
        try {
          const now = this.ctx.currentTime;
          if (Math.random() > 0.30) {
            const lOsc = this.ctx.createOscillator();
            const lGain = this.ctx.createGain();
            lOsc.type = Math.random() > 0.4 ? 'triangle' : 'sine';

            const freq = artemisNotes[noteStep % artemisNotes.length];
            noteStep = (noteStep + 1 + Math.floor(Math.random() * 2)) % artemisNotes.length;

            lOsc.frequency.setValueAtTime(freq, now);
            lGain.gain.setValueAtTime(0.016, now);
            lGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);

            lOsc.connect(lGain);
            lGain.connect(this.ambientGain);
            lOsc.start(now);
            lOsc.stop(now + 1.15);
          }
        } catch(e) {}
      }, 500);

      this.ambientNodes.push(
        templeNoise, templeFilter, templeLFO, templeLFOGain, templeGain,
        droneOsc1, droneOsc2, droneOsc3, droneFilter, droneGain,
        { stop: () => clearInterval(lyreInterval), disconnect: () => {} }
      );
    } catch(e) {}
  }

  _startChichenItzaSynth() {
    if (!this.ctx) return;
    try {
      // 1. Tropischer Yucatán-Dschungelwind & Zikadensurren (Humid Rainforest Ambience)
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        lastOut = (lastOut + 0.02 * white) / 1.02;
        data[i] = lastOut * 0.32;
      }
      const jungleNoise = this.ctx.createBufferSource();
      jungleNoise.buffer = buffer;
      jungleNoise.loop = true;

      const jungleFilter = this.ctx.createBiquadFilter();
      jungleFilter.type = 'lowpass';
      jungleFilter.frequency.value = 520;

      const jungleLFO = this.ctx.createOscillator();
      const jungleLFOGain = this.ctx.createGain();
      jungleLFO.frequency.value = 0.16;
      jungleLFOGain.gain.value = 180;
      jungleLFO.connect(jungleFilter.frequency);
      jungleLFO.start();

      const jungleGain = this.ctx.createGain();
      jungleGain.gain.value = 0.032;

      jungleNoise.connect(jungleFilter);
      jungleFilter.connect(jungleGain);
      jungleGain.connect(this.ambientGain);
      jungleNoise.start();

      // 2. Mystischer Kukulkan-Pyramiden-Drone (Ancient Mayan Stone Pyramid Drone - A minor)
      const droneOsc1 = this.ctx.createOscillator();
      const droneOsc2 = this.ctx.createOscillator();
      const droneOsc3 = this.ctx.createOscillator();
      droneOsc1.type = 'sawtooth';
      droneOsc2.type = 'triangle';
      droneOsc3.type = 'sine';
      droneOsc1.frequency.value = 110.00; // A2
      droneOsc2.frequency.value = 164.81; // E3
      droneOsc3.frequency.value = 220.00; // A3

      const droneFilter = this.ctx.createBiquadFilter();
      droneFilter.type = 'lowpass';
      droneFilter.frequency.value = 380;

      const droneGain = this.ctx.createGain();
      droneGain.gain.value = 0.024;

      droneOsc1.connect(droneFilter);
      droneOsc2.connect(droneFilter);
      droneOsc3.connect(droneFilter);
      droneFilter.connect(droneGain);
      droneGain.connect(this.ambientGain);

      droneOsc1.start();
      droneOsc2.start();
      droneOsc3.start();

      // 3. Antike Maya-Tonflöte (Okarina) & Quetzal-Echotöne (Maya Clay Flute & Bird Echoes)
      const mayaNotes = [440.00, 523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
      let noteStep = 0;

      const fluteInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(fluteInterval);
          return;
        }
        try {
          const now = this.ctx.currentTime;
          if (Math.random() > 0.32) {
            const fOsc = this.ctx.createOscillator();
            const fGain = this.ctx.createGain();
            fOsc.type = 'sine'; // Pure round clay flute tone

            const freq = mayaNotes[noteStep % mayaNotes.length];
            noteStep = (noteStep + 1 + Math.floor(Math.random() * 2)) % mayaNotes.length;

            fOsc.frequency.setValueAtTime(freq, now);
            // Slight pitch vibrato for ancient wooden/clay flute warmth
            fOsc.frequency.exponentialRampToValueAtTime(freq * 1.015, now + 0.3);
            fOsc.frequency.exponentialRampToValueAtTime(freq, now + 0.7);

            fGain.gain.setValueAtTime(0.018, now);
            fGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.05);

            fOsc.connect(fGain);
            fGain.connect(this.ambientGain);
            fOsc.start(now);
            fOsc.stop(now + 1.1);
          }
        } catch(e) {}
      }, 540);

      this.ambientNodes.push(
        jungleNoise, jungleFilter, jungleLFO, jungleLFOGain, jungleGain,
        droneOsc1, droneOsc2, droneOsc3, droneFilter, droneGain,
        { stop: () => clearInterval(fluteInterval), disconnect: () => {} }
      );
    } catch(e) {}
  }

  // LEVEL 81: CHRISTUS DER ERLÖSER (RIO DE JANEIRO)
  _startChristRedeemerRioSynth() {
    try {
      // 1. Sanfter tropischer Bergwind über dem Corcovado & Meeresbrise (Mountain Wind & Ocean Haze)
      const bufferSize = 2 * this.ctx.sampleRate;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        output[i] = (b0 + b1 + b2) * 0.12;
      }

      const windNoise = this.ctx.createBufferSource();
      windNoise.buffer = noiseBuffer;
      windNoise.loop = true;

      const windFilter = this.ctx.createBiquadFilter();
      windFilter.type = 'bandpass';
      windFilter.frequency.value = 340;
      windFilter.Q.value = 2.4;

      const windLFO = this.ctx.createOscillator();
      windLFO.frequency.value = 0.15; // Slow natural ocean breeze swell
      const windLFOGain = this.ctx.createGain();
      windLFOGain.gain.value = 160;
      windLFO.connect(windFilter.frequency);
      windLFO.start();

      const windGain = this.ctx.createGain();
      windGain.gain.value = 0.045;

      windNoise.connect(windFilter);
      windFilter.connect(windGain);
      windGain.connect(this.ambientGain);
      windNoise.start();

      // 2. Warme brasilianische Bossa-Nova-Harmonien (Cmaj7 / Fmaj7 Coastal Drone)
      const droneOsc1 = this.ctx.createOscillator();
      const droneOsc2 = this.ctx.createOscillator();
      const droneOsc3 = this.ctx.createOscillator();

      droneOsc1.type = 'sine';
      droneOsc2.type = 'triangle';
      droneOsc3.type = 'sine';

      droneOsc1.frequency.value = 261.63; // C4
      droneOsc2.frequency.value = 329.63; // E4
      droneOsc3.frequency.value = 392.00; // G4

      const droneFilter = this.ctx.createBiquadFilter();
      droneFilter.type = 'lowpass';
      droneFilter.frequency.value = 650;

      const droneGain = this.ctx.createGain();
      droneGain.gain.value = 0.022;

      droneOsc1.connect(droneFilter);
      droneOsc2.connect(droneFilter);
      droneOsc3.connect(droneFilter);
      droneFilter.connect(droneGain);
      droneGain.connect(this.ambientGain);

      droneOsc1.start();
      droneOsc2.start();
      droneOsc3.start();

      // 3. Kristalline Glockenklänge & Lichtglitzern der Guanabara-Bucht (Celestial Chimes)
      const rioChimeNotes = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51];
      let chimeStep = 0;

      const chimeInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(chimeInterval);
          return;
        }
        try {
          const now = this.ctx.currentTime;
          if (Math.random() > 0.38) {
            const cOsc = this.ctx.createOscillator();
            const cGain = this.ctx.createGain();
            cOsc.type = 'sine';

            const freq = rioChimeNotes[chimeStep % rioChimeNotes.length];
            chimeStep = (chimeStep + 1 + Math.floor(Math.random() * 2)) % rioChimeNotes.length;

            cOsc.frequency.setValueAtTime(freq, now);
            cGain.gain.setValueAtTime(0.016, now);
            cGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

            cOsc.connect(cGain);
            cGain.connect(this.ambientGain);
            cOsc.start(now);
            cOsc.stop(now + 1.25);
          }
        } catch(e) {}
      }, 520);

      this.ambientNodes.push(
        windNoise, windFilter, windLFO, windLFOGain, windGain,
        droneOsc1, droneOsc2, droneOsc3, droneFilter, droneGain,
        { stop: () => clearInterval(chimeInterval), disconnect: () => {} }
      );
    } catch(e) {}
  }

  // LEVEL 82: DIE CHINESISCHE MAUER (GROSSE MAUER)
  _startGreatWallChinaSynth() {
    try {
      // 1. Nebelverhangener Gebirgswind über den Bergkämmen (Mountain Wind & Mist Haze)
      const bufferSize = 2 * this.ctx.sampleRate;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        output[i] = (b0 + b1 + b2) * 0.13;
      }

      const windNoise = this.ctx.createBufferSource();
      windNoise.buffer = noiseBuffer;
      windNoise.loop = true;

      const windFilter = this.ctx.createBiquadFilter();
      windFilter.type = 'bandpass';
      windFilter.frequency.value = 280;
      windFilter.Q.value = 2.2;

      const windLFO = this.ctx.createOscillator();
      windLFO.frequency.value = 0.12; // Langsame Bergwind-Brise
      const windLFOGain = this.ctx.createGain();
      windLFOGain.gain.value = 140;
      windLFO.connect(windFilter.frequency);
      windLFO.start();

      const windGain = this.ctx.createGain();
      windGain.gain.value = 0.048;

      windNoise.connect(windFilter);
      windFilter.connect(windGain);
      windGain.connect(this.ambientGain);
      windNoise.start();

      // 2. Traditionelle chinesische Pentatonik (D, E, G, A, B) & mystischer Klangschalen-Drone
      const droneOsc1 = this.ctx.createOscillator();
      const droneOsc2 = this.ctx.createOscillator();
      const droneOsc3 = this.ctx.createOscillator();

      droneOsc1.type = 'triangle';
      droneOsc2.type = 'sine';
      droneOsc3.type = 'sine';

      droneOsc1.frequency.value = 146.83; // D3 (Tiefes Fundament)
      droneOsc2.frequency.value = 220.00; // A3 (Quinte / Zhi)
      droneOsc3.frequency.value = 293.66; // D4 (Gong / Grundton)

      const droneFilter = this.ctx.createBiquadFilter();
      droneFilter.type = 'lowpass';
      droneFilter.frequency.value = 520;

      const droneGain = this.ctx.createGain();
      droneGain.gain.value = 0.024;

      droneOsc1.connect(droneFilter);
      droneOsc2.connect(droneFilter);
      droneOsc3.connect(droneFilter);
      droneFilter.connect(droneGain);
      droneGain.connect(this.ambientGain);

      droneOsc1.start();
      droneOsc2.start();
      droneOsc3.start();

      // 3. Fernes Donnergrollen / Blitzgrollen (Distant Atmospheric Thunder Rumblings)
      const thunderInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(thunderInterval);
          return;
        }
        try {
          if (Math.random() > 0.45) {
            const now = this.ctx.currentTime;
            const rumbleSrc = this.ctx.createBufferSource();
            rumbleSrc.buffer = noiseBuffer;
            const rumbleFilter = this.ctx.createBiquadFilter();
            rumbleFilter.type = 'lowpass';
            rumbleFilter.frequency.setValueAtTime(80, now);
            rumbleFilter.frequency.linearRampToValueAtTime(140, now + 0.4);
            rumbleFilter.frequency.exponentialRampToValueAtTime(50, now + 1.8);

            const rumbleGain = this.ctx.createGain();
            rumbleGain.gain.setValueAtTime(0.0001, now);
            rumbleGain.gain.linearRampToValueAtTime(0.035, now + 0.25);
            rumbleGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

            rumbleSrc.connect(rumbleFilter);
            rumbleFilter.connect(rumbleGain);
            rumbleGain.connect(this.ambientGain);

            rumbleSrc.start(now);
            rumbleSrc.stop(now + 2.1);
          }
        } catch(e) {}
      }, 6000);

      // 4. Feine Guzheng- & Glockenharfen-Noten (Pentatonische Glockennoten)
      const pentatonicScale = [293.66, 329.63, 392.00, 440.00, 493.88, 587.33, 659.25, 783.99];
      let stepIndex = 0;
      const harpInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(harpInterval);
          return;
        }
        try {
          if (Math.random() > 0.42) {
            const now = this.ctx.currentTime;
            const hOsc = this.ctx.createOscillator();
            const hGain = this.ctx.createGain();
            hOsc.type = 'sine';

            const noteFreq = pentatonicScale[stepIndex % pentatonicScale.length];
            stepIndex = (stepIndex + 1 + Math.floor(Math.random() * 3)) % pentatonicScale.length;

            hOsc.frequency.setValueAtTime(noteFreq, now);
            hGain.gain.setValueAtTime(0.018, now);
            hGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

            hOsc.connect(hGain);
            hGain.connect(this.ambientGain);
            hOsc.start(now);
            hOsc.stop(now + 1.45);
          }
        } catch(e) {}
      }, 640);

      this.ambientNodes.push(
        windNoise, windFilter, windLFO, windLFOGain, windGain,
        droneOsc1, droneOsc2, droneOsc3, droneFilter, droneGain,
        { stop: () => { clearInterval(thunderInterval); clearInterval(harpInterval); }, disconnect: () => {} }
      );
    } catch(e) {}
  }

  // LEVEL 83: MACHU PICCHU (DIE INKA-STADT)
  _startMachuPicchuSynth() {
    try {
      // 1. Tropisches Anden-Regenrauschen & Gebirgswind (Tropical Andean Rain & Mountain Mist Breeze)
      const bufferSize = 2 * this.ctx.sampleRate;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const rainData = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        rainData[i] = (b0 + b1 + b2) * 0.14;
      }

      // Regen-Klangquelle
      const rainNoise = this.ctx.createBufferSource();
      rainNoise.buffer = noiseBuffer;
      rainNoise.loop = true;

      const rainFilter = this.ctx.createBiquadFilter();
      rainFilter.type = 'lowpass';
      rainFilter.frequency.value = 1400; // Sanftes, natürliches Regenprasseln

      const rainGain = this.ctx.createGain();
      rainGain.gain.value = 0.055;

      rainNoise.connect(rainFilter);
      rainFilter.connect(rainGain);
      rainGain.connect(this.ambientGain);
      rainNoise.start();

      // Gebirgswind durch die peruanischen Anden-Pässe
      const windFilter = this.ctx.createBiquadFilter();
      windFilter.type = 'bandpass';
      windFilter.frequency.value = 320;
      windFilter.Q.value = 2.6;

      const windLFO = this.ctx.createOscillator();
      windLFO.frequency.value = 0.14; // Sanfte Dünung des Gebirgswinds
      const windLFOGain = this.ctx.createGain();
      windLFOGain.gain.value = 160;
      windLFO.connect(windFilter.frequency);
      windLFO.start();

      const windGain = this.ctx.createGain();
      windGain.gain.value = 0.038;

      rainNoise.connect(windFilter);
      windFilter.connect(windGain);
      windGain.connect(this.ambientGain);

      // 2. Mystischer Urwald- & Andengipfel-Drone (Heilige Berge / Apus von Machu Picchu)
      const droneOsc1 = this.ctx.createOscillator();
      const droneOsc2 = this.ctx.createOscillator();
      const droneOsc3 = this.ctx.createOscillator();

      droneOsc1.type = 'sine';
      droneOsc2.type = 'triangle';
      droneOsc3.type = 'sine';

      droneOsc1.frequency.value = 110.00; // A2 (Erdiger, tiefer Grundton)
      droneOsc2.frequency.value = 164.81; // E3 (Quinte der Anden)
      droneOsc3.frequency.value = 220.00; // A3 (Inka-Resonanz)

      const droneFilter = this.ctx.createBiquadFilter();
      droneFilter.type = 'lowpass';
      droneFilter.frequency.value = 480;

      const droneGain = this.ctx.createGain();
      droneGain.gain.value = 0.025;

      droneOsc1.connect(droneFilter);
      droneOsc2.connect(droneFilter);
      droneOsc3.connect(droneFilter);
      droneFilter.connect(droneGain);
      droneGain.connect(this.ambientGain);

      droneOsc1.start();
      droneOsc2.start();
      droneOsc3.start();

      // 3. Authentische Anden-Panflöten- & Quena-Harmonien (A-Moll Pentatonik der Anden)
      const andeanFluteScale = [220.00, 261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 659.25];
      let fluteIdx = 0;

      const fluteInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(fluteInterval);
          return;
        }
        try {
          if (Math.random() > 0.38) {
            const now = this.ctx.currentTime;
            const fOsc = this.ctx.createOscillator();
            const fFilter = this.ctx.createBiquadFilter();
            const fGain = this.ctx.createGain();

            // Holziger, luftiger Flötencharakter (Triangle mit Filter)
            fOsc.type = 'triangle';
            fFilter.type = 'lowpass';
            fFilter.frequency.value = 1100;

            const freq = andeanFluteScale[fluteIdx % andeanFluteScale.length];
            fluteIdx = (fluteIdx + 1 + Math.floor(Math.random() * 2)) % andeanFluteScale.length;

            fOsc.frequency.setValueAtTime(freq, now);
            // Sanftes natürliches Vibrato der Panflöte
            fOsc.frequency.linearRampToValueAtTime(freq * 1.004, now + 0.3);
            fOsc.frequency.linearRampToValueAtTime(freq, now + 0.6);

            // Anschwellendes, weiches Flöten-Hauchen
            fGain.gain.setValueAtTime(0.0001, now);
            fGain.gain.linearRampToValueAtTime(0.024, now + 0.22);
            fGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);

            fOsc.connect(fFilter);
            fFilter.connect(fGain);
            fGain.connect(this.ambientGain);

            fOsc.start(now);
            fOsc.stop(now + 1.55);
          }
        } catch(e) {}
      }, 720);

      this.ambientNodes.push(
        rainNoise, rainFilter, rainGain,
        windFilter, windLFO, windLFOGain, windGain,
        droneOsc1, droneOsc2, droneOsc3, droneFilter, droneGain,
        { stop: () => clearInterval(fluteInterval), disconnect: () => {} }
      );
    } catch(e) {}
  }

  // LEVEL 84: PETRA (DAS SCHATZHAUS IN JORDANIEN)
  _startPetraJordanSynth() {
    try {
      // 1. Mächtiger, heulender Sandsturm durch die Felsenschlucht (Siq Gorge Sandstorm Howl)
      const bufferSize = 2 * this.ctx.sampleRate;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const sandData = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        sandData[i] = (b0 + b1 + b2) * 0.15;
      }

      // Sandsturm-Rauschen
      const sandNoise = this.ctx.createBufferSource();
      sandNoise.buffer = noiseBuffer;
      sandNoise.loop = true;

      const sandFilter = this.ctx.createBiquadFilter();
      sandFilter.type = 'bandpass';
      sandFilter.frequency.value = 540;
      sandFilter.Q.value = 3.2; // Pfeifende Wüstenböen

      const sandLFO = this.ctx.createOscillator();
      sandLFO.frequency.value = 0.18; // Anschwellende Sandsturmböen
      const sandLFOGain = this.ctx.createGain();
      sandLFOGain.gain.value = 280;
      sandLFO.connect(sandFilter.frequency);
      sandLFO.start();

      const sandGain = this.ctx.createGain();
      sandGain.gain.value = 0.058;

      sandNoise.connect(sandFilter);
      sandFilter.connect(sandGain);
      sandGain.connect(this.ambientGain);
      sandNoise.start();

      // Zusätzliches tiefes Wüstenbrausen
      const deepSandFilter = this.ctx.createBiquadFilter();
      deepSandFilter.type = 'lowpass';
      deepSandFilter.frequency.value = 220;
      const deepSandGain = this.ctx.createGain();
      deepSandGain.gain.value = 0.045;

      sandNoise.connect(deepSandFilter);
      deepSandFilter.connect(deepSandGain);
      deepSandGain.connect(this.ambientGain);

      // 2. Mystischer Nabatäer-Felsenkrypta-Drone (Al-Khazneh)
      const droneOsc1 = this.ctx.createOscillator();
      const droneOsc2 = this.ctx.createOscillator();
      const droneOsc3 = this.ctx.createOscillator();

      droneOsc1.type = 'triangle';
      droneOsc2.type = 'sine';
      droneOsc3.type = 'sine';

      droneOsc1.frequency.value = 146.83; // D3 (Wüstenfundament)
      droneOsc2.frequency.value = 220.00; // A3 (Quinte)
      droneOsc3.frequency.value = 293.66; // D4 (Oktavresonanz)

      const droneFilter = this.ctx.createBiquadFilter();
      droneFilter.type = 'lowpass';
      droneFilter.frequency.value = 460;

      const droneGain = this.ctx.createGain();
      droneGain.gain.value = 0.026;

      droneOsc1.connect(droneFilter);
      droneOsc2.connect(droneFilter);
      droneOsc3.connect(droneFilter);
      droneFilter.connect(droneGain);
      droneGain.connect(this.ambientGain);

      droneOsc1.start();
      droneOsc2.start();
      droneOsc3.start();

      // 3. Traditionelle Nabatäische Oud- / Kanun-Zupfnoten (Maqam Hijaz / Wüstenmelodie)
      const hijazScale = [293.66, 311.13, 369.99, 392.00, 440.00, 466.16, 554.37, 587.33]; // D, Eb, F#, G, A, Bb, C#, D
      let oudIndex = 0;

      const oudInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(oudInterval);
          return;
        }
        try {
          if (Math.random() > 0.40) {
            const now = this.ctx.currentTime;
            const oOsc = this.ctx.createOscillator();
            const oGain = this.ctx.createGain();

            oOsc.type = 'triangle';

            const freq = hijazScale[oudIndex % hijazScale.length];
            oudIndex = (oudIndex + 1 + Math.floor(Math.random() * 3)) % hijazScale.length;

            oOsc.frequency.setValueAtTime(freq, now);

            // Zupfinstrument-Hüllkurve
            oGain.gain.setValueAtTime(0.028, now);
            oGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.25);

            oOsc.connect(oGain);
            oGain.connect(this.ambientGain);

            oOsc.start(now);
            oOsc.stop(now + 1.3);
          }
        } catch(e) {}
      }, 680);

      this.ambientNodes.push(
        sandNoise, sandFilter, sandLFO, sandLFOGain, sandGain,
        deepSandFilter, deepSandGain,
        droneOsc1, droneOsc2, droneOsc3, droneFilter, droneGain,
        { stop: () => clearInterval(oudInterval), disconnect: () => {} }
      );
    } catch(e) {}
  }

  _startStatueOfLibertySynth() {
    if (!this.ctx) return;
    try {
      // 1. Sanfter New York Harbor Meeres- & Küstenwind (Ocean & Harbor Breeze)
      const bufferSize = this.ctx.sampleRate * 4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        const t = i / this.ctx.sampleRate;
        const wave = Math.sin(t * Math.PI * 0.25) * 0.4 + 0.6;
        data[i] = (Math.random() * 2 - 1) * 0.05 * wave;
      }
      const harborNoise = this.ctx.createBufferSource();
      harborNoise.buffer = buffer;
      harborNoise.loop = true;

      const harborFilter = this.ctx.createBiquadFilter();
      harborFilter.type = 'lowpass';
      harborFilter.frequency.value = 520;

      const harborGain = this.ctx.createGain();
      harborGain.gain.value = 0.08;

      harborNoise.connect(harborFilter);
      harborFilter.connect(harborGain);
      harborGain.connect(this.ambientGain);
      harborNoise.start();

      // 2. Weit entferntes New Yorker Hafen-Nebelhorn (Staten Island Ferry Foghorn)
      const playFoghorn = () => {
        if (!this.ctx || this.ambientNodes.length === 0) return;
        try {
          const now = this.ctx.currentTime;
          const osc1 = this.ctx.createOscillator();
          const osc2 = this.ctx.createOscillator();
          const hornGain = this.ctx.createGain();
          const hornFilter = this.ctx.createBiquadFilter();

          osc1.type = 'sawtooth';
          osc2.type = 'triangle';

          osc1.frequency.setValueAtTime(87.31, now); // F2
          osc2.frequency.setValueAtTime(130.81, now); // C3

          hornFilter.type = 'lowpass';
          hornFilter.frequency.setValueAtTime(260, now);

          // Weiches Anschwellen und Verhallen über das Hafenwasser
          hornGain.gain.setValueAtTime(0.0001, now);
          hornGain.gain.linearRampToValueAtTime(0.032, now + 0.45);
          hornGain.gain.setValueAtTime(0.032, now + 2.0);
          hornGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

          osc1.connect(hornFilter);
          osc2.connect(hornFilter);
          hornFilter.connect(hornGain);
          hornGain.connect(this.ambientGain);

          osc1.start(now);
          osc2.start(now);
          osc1.stop(now + 3.9);
          osc2.stop(now + 3.9);
        } catch(e) {}
      };

      // Erstes Nebelhorn nach 1.2s, danach alle 7.5 Sekunden
      const foghornTimeout = setTimeout(playFoghorn, 1200);
      const foghornInterval = setInterval(playFoghorn, 7500);

      // 3. Kristalline Sparkle-Chimes passend zu den funkelnden Lichtern
      const chimeScale = [1046.50, 1174.66, 1318.51, 1567.98, 1760.00]; // C6, D6, E6, G6, A6
      const chimeInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(chimeInterval);
          return;
        }
        try {
          if (Math.random() > 0.45) {
            const now = this.ctx.currentTime;
            const cOsc = this.ctx.createOscillator();
            const cGain = this.ctx.createGain();
            cOsc.type = 'sine';
            cOsc.frequency.setValueAtTime(chimeScale[Math.floor(Math.random() * chimeScale.length)], now);

            cGain.gain.setValueAtTime(0.016, now);
            cGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

            cOsc.connect(cGain);
            cGain.connect(this.ambientGain);
            cOsc.start(now);
            cOsc.stop(now + 0.95);
          }
        } catch(e) {}
      }, 1200);

      this.ambientNodes.push(
        harborNoise, harborFilter, harborGain,
        { stop: () => { clearTimeout(foghornTimeout); clearInterval(foghornInterval); clearInterval(chimeInterval); }, disconnect: () => {} }
      );
    } catch(e) {}
  }

  _startEiffelTowerParisSynth() {
    if (!this.ctx) return;
    try {
      // 1. Sanfte Pariser Nachtbrise & Seine-Wellenplätschern (Parisian Night Breeze & Seine Murmur)
      const bufferSize = this.ctx.sampleRate * 4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        const t = i / this.ctx.sampleRate;
        const wave = Math.sin(t * Math.PI * 0.3) * 0.35 + 0.65;
        data[i] = (Math.random() * 2 - 1) * 0.04 * wave;
      }
      const riverNoise = this.ctx.createBufferSource();
      riverNoise.buffer = buffer;
      riverNoise.loop = true;

      const riverFilter = this.ctx.createBiquadFilter();
      riverFilter.type = 'lowpass';
      riverFilter.frequency.value = 440;

      const riverGain = this.ctx.createGain();
      riverGain.gain.value = 0.07;

      riverNoise.connect(riverFilter);
      riverFilter.connect(riverGain);
      riverGain.connect(this.ambientGain);
      riverNoise.start();

      // 2. Romantische französische Musette-Akkordeon Walzer-Motive (Romantic Parisian Accordion Waltz)
      // Walzermelodie in A-Moll / C-Dur
      const waltzNotes = [
        440.00, 523.25, 659.25, 698.46, 659.25, 587.33, 493.88, 523.25,
        440.00, 587.33, 659.25, 783.99, 659.25, 523.25, 493.88, 440.00
      ];
      let waltzIdx = 0;

      const accordionInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(accordionInterval);
          return;
        }
        try {
          if (Math.random() > 0.35) {
            const now = this.ctx.currentTime;
            // Akkordeon-Zweiklang (Schwebung mit leichtem Detune)
            const osc1 = this.ctx.createOscillator();
            const osc2 = this.ctx.createOscillator();
            const accGain = this.ctx.createGain();
            const accFilter = this.ctx.createBiquadFilter();

            osc1.type = 'sawtooth';
            osc2.type = 'triangle';

            const baseFreq = waltzNotes[waltzIdx % waltzNotes.length];
            waltzIdx = (waltzIdx + 1) % waltzNotes.length;

            osc1.frequency.setValueAtTime(baseFreq, now);
            osc2.frequency.setValueAtTime(baseFreq * 1.004, now); // Zartes französisches Musette-Tremolo

            accFilter.type = 'lowpass';
            accFilter.frequency.setValueAtTime(750, now);

            accGain.gain.setValueAtTime(0.0001, now);
            accGain.gain.linearRampToValueAtTime(0.022, now + 0.12);
            accGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.72);

            osc1.connect(accFilter);
            osc2.connect(accFilter);
            accFilter.connect(accGain);
            accGain.connect(this.ambientGain);

            osc1.start(now);
            osc2.start(now);
            osc1.stop(now + 0.75);
            osc2.stop(now + 0.75);
          }
        } catch(e) {}
      }, 640);

      // 3. Zartes funkelndes Glockenspiel der Eiffelturm-Illumination (Sparkling Chimes)
      const sparkleScale = [1318.51, 1567.98, 1760.00, 2093.00, 2637.02]; // E6, G6, A6, C7, E7
      const sparkleInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(sparkleInterval);
          return;
        }
        try {
          if (Math.random() > 0.40) {
            const now = this.ctx.currentTime;
            const sOsc = this.ctx.createOscillator();
            const sGain = this.ctx.createGain();

            sOsc.type = 'sine';
            sOsc.frequency.setValueAtTime(sparkleScale[Math.floor(Math.random() * sparkleScale.length)], now);

            sGain.gain.setValueAtTime(0.015, now);
            sGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);

            sOsc.connect(sGain);
            sGain.connect(this.ambientGain);
            sOsc.start(now);
            sOsc.stop(now + 0.90);
          }
        } catch(e) {}
      }, 880);

      this.ambientNodes.push(
        riverNoise, riverFilter, riverGain,
        { stop: () => { clearInterval(accordionInterval); clearInterval(sparkleInterval); }, disconnect: () => {} }
      );
    } catch(e) {}
  }

  _startStonehengeSynth() {
    if (!this.ctx) return;
    try {
      // 1. Tiefes, archaisches Druiden-Summen (Deep Prehistoric Celtic Drone: 55Hz & 82.4Hz)
      const droneOsc1 = this.ctx.createOscillator();
      const droneOsc2 = this.ctx.createOscillator();
      const droneFilter = this.ctx.createBiquadFilter();
      const droneGain = this.ctx.createGain();

      droneOsc1.type = 'triangle';
      droneOsc1.frequency.setValueAtTime(55.0, this.ctx.currentTime); // A1
      droneOsc2.type = 'sine';
      droneOsc2.frequency.setValueAtTime(82.41, this.ctx.currentTime); // E2

      droneFilter.type = 'lowpass';
      droneFilter.frequency.setValueAtTime(140, this.ctx.currentTime);

      droneGain.gain.setValueAtTime(0.045, this.ctx.currentTime);

      droneOsc1.connect(droneFilter);
      droneOsc2.connect(droneFilter);
      droneFilter.connect(droneGain);
      droneGain.connect(this.ambientGain);

      droneOsc1.start();
      droneOsc2.start();

      // 2. Wehende, heulende Nebelwinde über der Ebene von Salisbury (Misty Salisbury Plain Winds)
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.025 * white) / 1.025;
        lastOut = output[i];
      }

      const windNoise = this.ctx.createBufferSource();
      windNoise.buffer = noiseBuffer;
      windNoise.loop = true;

      const windFilter = this.ctx.createBiquadFilter();
      windFilter.type = 'bandpass';
      windFilter.frequency.setValueAtTime(280, this.ctx.currentTime);
      windFilter.Q.setValueAtTime(1.8, this.ctx.currentTime);

      const windLFO = this.ctx.createOscillator();
      const windLFOGain = this.ctx.createGain();
      windLFO.frequency.setValueAtTime(0.12, this.ctx.currentTime);
      windLFOGain.gain.setValueAtTime(120, this.ctx.currentTime);
      windLFO.connect(windFilter.frequency);

      const windGain = this.ctx.createGain();
      windGain.gain.setValueAtTime(0.055, this.ctx.currentTime);

      windNoise.connect(windFilter);
      windFilter.connect(windGain);
      windGain.connect(this.ambientGain);

      windNoise.start();
      windLFO.start();

      // 3. Mystische keltische Klangglocken der Sonnenwende (Celtic Solstice Resonances)
      const celticScale = [220.00, 329.63, 440.00, 554.37, 659.25]; // A3, E4, A4, C#5, E5
      const bellInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(bellInterval);
          return;
        }
        try {
          if (Math.random() > 0.35) {
            const now = this.ctx.currentTime;
            const bOsc = this.ctx.createOscillator();
            const bGain = this.ctx.createGain();

            bOsc.type = 'sine';
            bOsc.frequency.setValueAtTime(celticScale[Math.floor(Math.random() * celticScale.length)], now);

            bGain.gain.setValueAtTime(0.022, now);
            bGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

            bOsc.connect(bGain);
            bGain.connect(this.ambientGain);
            bOsc.start(now);
            bOsc.stop(now + 1.85);
          }
        } catch(e) {}
      }, 1600);

      this.ambientNodes.push(
        droneOsc1, droneOsc2, droneFilter, droneGain,
        windNoise, windFilter, windGain, windLFO, windLFOGain,
        { stop: () => { clearInterval(bellInterval); }, disconnect: () => {} }
      );
    } catch(e) {}
  }

  _startLeaningTowerPisaSynth() {
    if (!this.ctx) return;
    try {
      // 1. Sanfter toskanischer Regen auf der Piazza dei Miracoli (Refreshing Tuscan Rain on Marble)
      const bufferSize = this.ctx.sampleRate * 2;
      const rainBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = rainBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.045 * white) / 1.045;
        lastOut = output[i];
      }

      const rainNoise = this.ctx.createBufferSource();
      rainNoise.buffer = rainBuffer;
      rainNoise.loop = true;

      const rainFilter = this.ctx.createBiquadFilter();
      rainFilter.type = 'bandpass';
      rainFilter.frequency.setValueAtTime(1200, this.ctx.currentTime);
      rainFilter.Q.setValueAtTime(1.2, this.ctx.currentTime);

      const rainGain = this.ctx.createGain();
      rainGain.gain.setValueAtTime(0.048, this.ctx.currentTime);

      rainNoise.connect(rainFilter);
      rainFilter.connect(rainGain);
      rainGain.connect(this.ambientGain);

      rainNoise.start();

      // 2. Berühmtes Geläut der 7 Glocken des Campanile von Pisa (Pisa Campanile Bells)
      const pisaBells = [349.23, 440.00, 523.25, 587.33, 698.46]; // F4, A4, C5, D5, F5
      const bellInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(bellInterval);
          return;
        }
        try {
          if (Math.random() > 0.30) {
            const now = this.ctx.currentTime;
            const bOsc = this.ctx.createOscillator();
            const bOscHarm = this.ctx.createOscillator();
            const bGain = this.ctx.createGain();

            const freq = pisaBells[Math.floor(Math.random() * pisaBells.length)];
            bOsc.type = 'sine';
            bOsc.frequency.setValueAtTime(freq, now);

            bOscHarm.type = 'triangle';
            bOscHarm.frequency.setValueAtTime(freq * 2.4, now);

            bGain.gain.setValueAtTime(0.024, now);
            bGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.9);

            bOsc.connect(bGain);
            bOscHarm.connect(bGain);
            bGain.connect(this.ambientGain);

            bOsc.start(now);
            bOscHarm.start(now);
            bOsc.stop(now + 1.95);
            bOscHarm.stop(now + 1.95);
          }
        } catch(e) {}
      }, 1450);

      // 3. Italienische Mandolinen-Zupftöne im Hintergrund (Italian Tuscan Pluck Chords)
      const mandolinNotes = [329.63, 392.00, 493.88, 659.25]; // E4, G4, B4, E5
      const mandolinInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(mandolinInterval);
          return;
        }
        try {
          if (Math.random() > 0.40) {
            const now = this.ctx.currentTime;
            const mOsc = this.ctx.createOscillator();
            const mGain = this.ctx.createGain();

            mOsc.type = 'triangle';
            mOsc.frequency.setValueAtTime(mandolinNotes[Math.floor(Math.random() * mandolinNotes.length)], now);

            mGain.gain.setValueAtTime(0.018, now);
            mGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.65);

            mOsc.connect(mGain);
            mGain.connect(this.ambientGain);
            mOsc.start(now);
            mOsc.stop(now + 0.70);
          }
        } catch(e) {}
      }, 1900);

      this.ambientNodes.push(
        rainNoise, rainFilter, rainGain,
        { stop: () => { clearInterval(bellInterval); clearInterval(mandolinInterval); }, disconnect: () => {} }
      );
    } catch(e) {}
  }

  _startEasterIslandMoaiSynth() {
    if (!this.ctx) return;
    try {
      // 1. Tosende Pazifik-Brandung an den Klippen von Rapa Nui (Mighty Pacific Ocean Surf)
      const bufferSize = this.ctx.sampleRate * 2;
      const surfBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = surfBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.035 * white) / 1.035;
        lastOut = output[i];
      }

      const surfNoise = this.ctx.createBufferSource();
      surfNoise.buffer = surfBuffer;
      surfNoise.loop = true;

      const surfFilter = this.ctx.createBiquadFilter();
      surfFilter.type = 'lowpass';
      surfFilter.frequency.setValueAtTime(420, this.ctx.currentTime);

      // Wellenschlag-LFO (Brandung schwillt an und ab)
      const surfLFO = this.ctx.createOscillator();
      const surfLFOGain = this.ctx.createGain();
      surfLFO.frequency.setValueAtTime(0.14, this.ctx.currentTime); // ca. 7 Sekunden Wellenzyklus
      surfLFOGain.gain.setValueAtTime(0.035, this.ctx.currentTime);

      const surfGain = this.ctx.createGain();
      surfGain.gain.setValueAtTime(0.055, this.ctx.currentTime);

      surfLFO.connect(surfLFOGain);
      surfLFOGain.connect(surfGain.gain);

      surfNoise.connect(surfFilter);
      surfFilter.connect(surfGain);
      surfGain.connect(this.ambientGain);

      surfNoise.start();
      surfLFO.start();

      // 2. Tiefes, fernes Donnergrollen am Gewitterhimmel (Sub-Bass Thunder Rumbles)
      const thunderInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(thunderInterval);
          return;
        }
        try {
          if (Math.random() > 0.45) {
            const now = this.ctx.currentTime;
            const tOsc = this.ctx.createOscillator();
            const tFilter = this.ctx.createBiquadFilter();
            const tGain = this.ctx.createGain();

            tOsc.type = 'sawtooth';
            tOsc.frequency.setValueAtTime(65, now);
            tOsc.frequency.exponentialRampToValueAtTime(32, now + 2.4);

            tFilter.type = 'lowpass';
            tFilter.frequency.setValueAtTime(160, now);
            tFilter.frequency.exponentialRampToValueAtTime(45, now + 2.4);

            tGain.gain.setValueAtTime(0.045, now);
            tGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

            tOsc.connect(tFilter);
            tFilter.connect(tGain);
            tGain.connect(this.ambientGain);

            tOsc.start(now);
            tOsc.stop(now + 2.55);
          }
        } catch(e) {}
      }, 2400);

      // 3. Mystischer polynesischer Muschelhorn-Klang / Ahnen-Chant (Polynesian Conch Call: 164.8Hz & 246.9Hz)
      const conchInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(conchInterval);
          return;
        }
        try {
          if (Math.random() > 0.40) {
            const now = this.ctx.currentTime;
            const cOsc = this.ctx.createOscillator();
            const cFilter = this.ctx.createBiquadFilter();
            const cGain = this.ctx.createGain();

            const cFreq = Math.random() > 0.5 ? 164.81 : 246.94; // E3 oder B3
            cOsc.type = 'triangle';
            cOsc.frequency.setValueAtTime(cFreq, now);
            cOsc.frequency.linearRampToValueAtTime(cFreq * 1.02, now + 1.2);
            cOsc.frequency.linearRampToValueAtTime(cFreq * 0.98, now + 2.2);

            cFilter.type = 'bandpass';
            cFilter.frequency.setValueAtTime(cFreq * 1.5, now);
            cFilter.Q.setValueAtTime(2.2, now);

            cGain.gain.setValueAtTime(0.001, now);
            cGain.gain.linearRampToValueAtTime(0.032, now + 0.6);
            cGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);

            cOsc.connect(cFilter);
            cFilter.connect(cGain);
            cGain.connect(this.ambientGain);

            cOsc.start(now);
            cOsc.stop(now + 2.45);
          }
        } catch(e) {}
      }, 3100);

      this.ambientNodes.push(
        surfNoise, surfFilter, surfGain, surfLFO, surfLFOGain,
        { stop: () => { clearInterval(thunderInterval); clearInterval(conchInterval); }, disconnect: () => {} }
      );
    } catch(e) {}
  }

  _startTowerBridgeLondonSynth() {
    if (!this.ctx) return;
    try {
      // 1. Sanft strömende Themse an den Granitpfeilern (River Thames Flow)
      const bufferSize = this.ctx.sampleRate * 2;
      const thamesBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = thamesBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.038 * white) / 1.038;
        lastOut = output[i];
      }

      const thamesNoise = this.ctx.createBufferSource();
      thamesNoise.buffer = thamesBuffer;
      thamesNoise.loop = true;

      const thamesFilter = this.ctx.createBiquadFilter();
      thamesFilter.type = 'lowpass';
      thamesFilter.frequency.setValueAtTime(360, this.ctx.currentTime);

      const thamesGain = this.ctx.createGain();
      thamesGain.gain.setValueAtTime(0.045, this.ctx.currentTime);

      thamesNoise.connect(thamesFilter);
      thamesFilter.connect(thamesGain);
      thamesGain.connect(this.ambientGain);

      thamesNoise.start();

      // 1b. Atmosphärischer Londoner Niesel- & Nachtregen (London Rain Ambient)
      const rainBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const rOutput = rainBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        rOutput[i] = Math.random() * 2 - 1;
      }
      const rainNoise = this.ctx.createBufferSource();
      rainNoise.buffer = rainBuffer;
      rainNoise.loop = true;

      const rainFilter = this.ctx.createBiquadFilter();
      rainFilter.type = 'bandpass';
      rainFilter.frequency.setValueAtTime(1150, this.ctx.currentTime);
      rainFilter.Q.setValueAtTime(1.1, this.ctx.currentTime);

      const rainGain = this.ctx.createGain();
      rainGain.gain.setValueAtTime(0.040, this.ctx.currentTime);

      rainNoise.connect(rainFilter);
      rainFilter.connect(rainGain);
      rainGain.connect(this.ambientGain);

      rainNoise.start();

      // 2. Ikonische Londoner Westminster-Chime Glockenklänge (Westminster Bells)
      // E4, G#4, F#4, B3
      const westminsterNotes = [329.63, 415.30, 369.99, 246.94];
      const chimeInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(chimeInterval);
          return;
        }
        try {
          if (Math.random() > 0.35) {
            const now = this.ctx.currentTime;
            const bOsc = this.ctx.createOscillator();
            const bHarm = this.ctx.createOscillator();
            const bGain = this.ctx.createGain();

            const freq = westminsterNotes[Math.floor(Math.random() * westminsterNotes.length)];
            bOsc.type = 'sine';
            bOsc.frequency.setValueAtTime(freq, now);

            bHarm.type = 'triangle';
            bHarm.frequency.setValueAtTime(freq * 2.0, now);

            bGain.gain.setValueAtTime(0.026, now);
            bGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.85);

            bOsc.connect(bGain);
            bHarm.connect(bGain);
            bGain.connect(this.ambientGain);

            bOsc.start(now);
            bHarm.start(now);
            bOsc.stop(now + 1.90);
            bHarm.stop(now + 1.90);
          }
        } catch(e) {}
      }, 1800);

      // 3. Tiefes viktorianisches Dampf-Klapptriebwerk-Puckern (Victorian Bascule Steam Engine Hum)
      const engineInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(engineInterval);
          return;
        }
        try {
          const now = this.ctx.currentTime;
          const eOsc = this.ctx.createOscillator();
          const eGain = this.ctx.createGain();

          eOsc.type = 'triangle';
          eOsc.frequency.setValueAtTime(46.0, now);
          eOsc.frequency.exponentialRampToValueAtTime(32.0, now + 0.35);

          eGain.gain.setValueAtTime(0.025, now);
          eGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

          eOsc.connect(eGain);
          eGain.connect(this.ambientGain);

          eOsc.start(now);
          eOsc.stop(now + 0.38);
        } catch(e) {}
      }, 920);

      this.ambientNodes.push(
        thamesNoise, thamesFilter, thamesGain,
        rainNoise, rainFilter, rainGain,
        { stop: () => { clearInterval(chimeInterval); clearInterval(engineInterval); }, disconnect: () => {} }
      );
    } catch(e) {}
  }

  _startGrazerUhrturmSynth() {
    if (!this.ctx) return;
    try {
      // 1. Sanfter Schlossberg-Bergwind (Gentle breeze over the Schlossberg hill)
      const breezeBufferSize = this.ctx.sampleRate * 2;
      const breezeBuffer = this.ctx.createBuffer(1, breezeBufferSize, this.ctx.sampleRate);
      const bOutput = breezeBuffer.getChannelData(0);
      for (let i = 0; i < breezeBufferSize; i++) {
        bOutput[i] = Math.random() * 2 - 1;
      }
      const breezeNoise = this.ctx.createBufferSource();
      breezeNoise.buffer = breezeBuffer;
      breezeNoise.loop = true;

      const breezeFilter = this.ctx.createBiquadFilter();
      breezeFilter.type = 'bandpass';
      breezeFilter.frequency.setValueAtTime(360, this.ctx.currentTime);
      breezeFilter.Q.setValueAtTime(0.85, this.ctx.currentTime);

      const breezeGain = this.ctx.createGain();
      breezeGain.gain.setValueAtTime(0.032, this.ctx.currentTime);

      breezeNoise.connect(breezeFilter);
      breezeFilter.connect(breezeGain);
      breezeGain.connect(this.ambientGain);

      breezeNoise.start();

      // 2. Historische Grazer Uhrturm Glocken (Stundenglocke gegossen 1382 & Feuerglocke)
      // Warme, ehrwürdige Glockentöne (C4, E4, G4, A3)
      const uhrturmNotes = [261.63, 329.63, 392.00, 220.00];
      const bellInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(bellInterval);
          return;
        }
        try {
          if (Math.random() > 0.32) {
            const now = this.ctx.currentTime;
            const freq = uhrturmNotes[Math.floor(Math.random() * uhrturmNotes.length)];

            // Grundton (Sine)
            const oscFundamental = this.ctx.createOscillator();
            oscFundamental.type = 'sine';
            oscFundamental.frequency.setValueAtTime(freq, now);

            // Obertöne für echten Bronzeglocken-Klang
            const oscHarmonic1 = this.ctx.createOscillator();
            oscHarmonic1.type = 'triangle';
            oscHarmonic1.frequency.setValueAtTime(freq * 2.0, now);

            const oscHarmonic2 = this.ctx.createOscillator();
            oscHarmonic2.type = 'sine';
            oscHarmonic2.frequency.setValueAtTime(freq * 2.76, now);

            const bellGain = this.ctx.createGain();
            bellGain.gain.setValueAtTime(0.034, now);
            bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);

            oscFundamental.connect(bellGain);
            oscHarmonic1.connect(bellGain);
            oscHarmonic2.connect(bellGain);
            bellGain.connect(this.ambientGain);

            oscFundamental.start(now);
            oscHarmonic1.start(now);
            oscHarmonic2.start(now);

            oscFundamental.stop(now + 2.45);
            oscHarmonic1.stop(now + 2.45);
            oscHarmonic2.stop(now + 2.45);
          }
        } catch(e) {}
      }, 1950);

      // 3. Mechanisches Ticken des 300 Jahre alten Grazer Uhrwerks (1712)
      const clockTickInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(clockTickInterval);
          return;
        }
        try {
          const now = this.ctx.currentTime;
          const tickOsc = this.ctx.createOscillator();
          const tickGain = this.ctx.createGain();

          tickOsc.type = 'triangle';
          tickOsc.frequency.setValueAtTime(880, now);
          tickOsc.frequency.exponentialRampToValueAtTime(220, now + 0.045);

          tickGain.gain.setValueAtTime(0.016, now);
          tickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

          tickOsc.connect(tickGain);
          tickGain.connect(this.ambientGain);

          tickOsc.start(now);
          tickOsc.stop(now + 0.05);
        } catch(e) {}
      }, 980);

      this.ambientNodes.push(
        breezeNoise, breezeFilter, breezeGain,
        { stop: () => { clearInterval(bellInterval); clearInterval(clockTickInterval); }, disconnect: () => {} }
      );
    } catch(e) {}
  }

  _startImWeltallSynth() {
    if (!this.ctx) return;
    try {
      // 1. Tiefer interstellarer Vakuum-Brummton (Deep Space Cosmic Drone)
      const droneOsc = this.ctx.createOscillator();
      const droneHarm = this.ctx.createOscillator();
      const droneGain = this.ctx.createGain();

      droneOsc.type = 'sine';
      droneOsc.frequency.setValueAtTime(55.0, this.ctx.currentTime); // A1 sub-bass

      droneHarm.type = 'triangle';
      droneHarm.frequency.setValueAtTime(110.0, this.ctx.currentTime); // A2

      droneGain.gain.setValueAtTime(0.038, this.ctx.currentTime);

      droneOsc.connect(droneGain);
      droneHarm.connect(droneGain);
      droneGain.connect(this.ambientGain);

      droneOsc.start();
      droneHarm.start();

      // 2. Kosmisches Sternen-Schimmern & Äther-Rauschen
      const etherBufferSize = this.ctx.sampleRate * 2;
      const etherBuffer = this.ctx.createBuffer(1, etherBufferSize, this.ctx.sampleRate);
      const eOutput = etherBuffer.getChannelData(0);
      for (let i = 0; i < etherBufferSize; i++) {
        eOutput[i] = Math.random() * 2 - 1;
      }
      const etherNoise = this.ctx.createBufferSource();
      etherNoise.buffer = etherBuffer;
      etherNoise.loop = true;

      const etherFilter = this.ctx.createBiquadFilter();
      etherFilter.type = 'bandpass';
      etherFilter.frequency.setValueAtTime(780, this.ctx.currentTime);
      etherFilter.Q.setValueAtTime(2.2, this.ctx.currentTime);

      const etherGain = this.ctx.createGain();
      etherGain.gain.setValueAtTime(0.024, this.ctx.currentTime);

      etherNoise.connect(etherFilter);
      etherFilter.connect(etherGain);
      etherGain.connect(this.ambientGain);

      etherNoise.start();

      // 3. Telemetrie- und Pulsar-Pings aus den Tiefen der Galaxie
      const pulsarInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(pulsarInterval);
          return;
        }
        try {
          if (Math.random() > 0.4) {
            const now = this.ctx.currentTime;
            const pOsc = this.ctx.createOscillator();
            const pGain = this.ctx.createGain();

            const frequencies = [880, 1174.66, 1318.51, 1760];
            const pFreq = frequencies[Math.floor(Math.random() * frequencies.length)];

            pOsc.type = 'sine';
            pOsc.frequency.setValueAtTime(pFreq, now);

            pGain.gain.setValueAtTime(0.018, now);
            pGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.65);

            pOsc.connect(pGain);
            pGain.connect(this.ambientGain);

            pOsc.start(now);
            pOsc.stop(now + 0.70);
          }
        } catch(e) {}
      }, 1600);

      this.ambientNodes.push(
        droneOsc, droneHarm, droneGain,
        etherNoise, etherFilter, etherGain,
        { stop: () => { clearInterval(pulsarInterval); }, disconnect: () => {} }
      );
    } catch(e) {}
  }

  _startWienSynth() {
    if (!this.ctx) return;
    try {
      // 1. Wiener Schnürlregen (plätscherndes Regenrauschen)
      const rainBufferSize = this.ctx.sampleRate * 2;
      const rainBuffer = this.ctx.createBuffer(1, rainBufferSize, this.ctx.sampleRate);
      const rOutput = rainBuffer.getChannelData(0);
      for (let i = 0; i < rainBufferSize; i++) {
        rOutput[i] = (Math.random() * 2 - 1) * 0.45;
      }
      const rainNoise = this.ctx.createBufferSource();
      rainNoise.buffer = rainBuffer;
      rainNoise.loop = true;

      const rainFilter = this.ctx.createBiquadFilter();
      rainFilter.type = 'lowpass';
      rainFilter.frequency.setValueAtTime(1850, this.ctx.currentTime);
      rainFilter.Q.setValueAtTime(0.7, this.ctx.currentTime);

      const rainGain = this.ctx.createGain();
      rainGain.gain.setValueAtTime(0.052, this.ctx.currentTime);

      rainNoise.connect(rainFilter);
      rainFilter.connect(rainGain);
      rainGain.connect(this.ambientGain);

      rainNoise.start();

      // 2. Sanfte Wiener Walzer Dreivierteltakt-Akkordbegleitung (Wiener Klassik / Strauss Charme)
      const waltzChords = [
        [293.66, 369.99, 440.00], // D-Dur
        [293.66, 369.99, 440.00], // D-Dur
        [220.00, 277.18, 329.63], // A-Dur
        [246.94, 311.13, 369.99]  // H-Moll / E7
      ];
      let chordIndex = 0;
      const waltzInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(waltzInterval);
          return;
        }
        try {
          const now = this.ctx.currentTime;
          const chord = waltzChords[chordIndex % waltzChords.length];
          chordIndex++;

          chord.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = idx === 0 ? 'sine' : 'triangle';
            osc.frequency.setValueAtTime(freq, now);

            // Subtiles Vibrato
            const vib = this.ctx.createOscillator();
            const vibGain = this.ctx.createGain();
            vib.frequency.setValueAtTime(5.2, now);
            vibGain.gain.setValueAtTime(2.5, now);
            vib.connect(osc.frequency);
            vib.start(now);
            vib.stop(now + 1.8);

            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.linearRampToValueAtTime(0.016, now + 0.35);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.75);

            osc.connect(gain);
            gain.connect(this.ambientGain);

            osc.start(now);
            osc.stop(now + 1.8);
          });
        } catch(e) {}
      }, 2100);

      // 3. Stephansdom Pummerin Glockenklang (Tiefes, erhabenes Bronzegeläut)
      const pummerinInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(pummerinInterval);
          return;
        }
        try {
          if (Math.random() > 0.45) {
            const now = this.ctx.currentTime;
            const bellOsc = this.ctx.createOscillator();
            bellOsc.type = 'sine';
            bellOsc.frequency.setValueAtTime(130.81, now); // C3

            const bellHarm = this.ctx.createOscillator();
            bellHarm.type = 'triangle';
            bellHarm.frequency.setValueAtTime(261.63, now); // C4

            const bellHarm2 = this.ctx.createOscillator();
            bellHarm2.type = 'sine';
            bellHarm2.frequency.setValueAtTime(392.00, now); // G4

            const bellGain = this.ctx.createGain();
            bellGain.gain.setValueAtTime(0.028, now);
            bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

            bellOsc.connect(bellGain);
            bellHarm.connect(bellGain);
            bellHarm2.connect(bellGain);
            bellGain.connect(this.ambientGain);

            bellOsc.start(now);
            bellHarm.start(now);
            bellHarm2.start(now);

            bellOsc.stop(now + 3.85);
            bellHarm.stop(now + 3.85);
            bellHarm2.stop(now + 3.85);
          }
        } catch(e) {}
      }, 5500);

      this.ambientNodes.push(
        rainNoise, rainFilter, rainGain,
        { stop: () => { clearInterval(waltzInterval); clearInterval(pummerinInterval); }, disconnect: () => {} }
      );
    } catch(e) {}
  }

  _startMohnblumenSynth() {
    if (!this.ctx) return;
    try {
      // 1. Sanfte, warme Meeresbrise durch das Mohnblumenfeld
      const breezeBufferSize = this.ctx.sampleRate * 2;
      const breezeBuffer = this.ctx.createBuffer(1, breezeBufferSize, this.ctx.sampleRate);
      const bOutput = breezeBuffer.getChannelData(0);
      for (let i = 0; i < breezeBufferSize; i++) {
        bOutput[i] = (Math.random() * 2 - 1) * 0.35;
      }
      const breezeNoise = this.ctx.createBufferSource();
      breezeNoise.buffer = breezeBuffer;
      breezeNoise.loop = true;

      const breezeFilter = this.ctx.createBiquadFilter();
      breezeFilter.type = 'bandpass';
      breezeFilter.frequency.setValueAtTime(420, this.ctx.currentTime);
      breezeFilter.Q.setValueAtTime(1.2, this.ctx.currentTime);

      const breezeGain = this.ctx.createGain();
      breezeGain.gain.setValueAtTime(0.028, this.ctx.currentTime);

      breezeNoise.connect(breezeFilter);
      breezeFilter.connect(breezeGain);
      breezeGain.connect(this.ambientGain);

      breezeNoise.start();

      // 2. Idyllisches Zirpen von Sommergrillen im Mohnfeld
      const cricketInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(cricketInterval);
          return;
        }
        try {
          if (Math.random() > 0.30) {
            const now = this.ctx.currentTime;
            const cOsc = this.ctx.createOscillator();
            const cGain = this.ctx.createGain();

            cOsc.type = 'sine';
            cOsc.frequency.setValueAtTime(4400 + Math.random() * 300, now);

            cGain.gain.setValueAtTime(0.0001, now);
            cGain.gain.linearRampToValueAtTime(0.012, now + 0.04);
            cGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

            cOsc.connect(cGain);
            cGain.connect(this.ambientGain);

            cOsc.start(now);
            cOsc.stop(now + 0.24);
          }
        } catch(e) {}
      }, 750);

      // 3. Verträumte, pastorale Natur-Melodietöne im Abendlicht (Flötenklang / Glockenspiel G-Pentatonik)
      const pastoralNotes = [392.00, 493.88, 587.33, 659.25, 783.99]; // G4, B4, D5, E5, G5
      let noteIdx = 0;
      const melodyInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(melodyInterval);
          return;
        }
        try {
          if (Math.random() > 0.35) {
            const now = this.ctx.currentTime;
            const freq = pastoralNotes[noteIdx % pastoralNotes.length];
            noteIdx += Math.floor(Math.random() * 2) + 1;

            const mOsc = this.ctx.createOscillator();
            const mGain = this.ctx.createGain();

            mOsc.type = 'triangle';
            mOsc.frequency.setValueAtTime(freq, now);

            mGain.gain.setValueAtTime(0.0001, now);
            mGain.gain.linearRampToValueAtTime(0.024, now + 0.12);
            mGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);

            mOsc.connect(mGain);
            mGain.connect(this.ambientGain);

            mOsc.start(now);
            mOsc.stop(now + 2.45);
          }
        } catch(e) {}
      }, 2400);

      this.ambientNodes.push(
        breezeNoise, breezeFilter, breezeGain,
        { stop: () => { clearInterval(cricketInterval); clearInterval(melodyInterval); }, disconnect: () => {} }
      );
    } catch(e) {}
  }

  _startDieBurgSynth() {
    if (!this.ctx) return;
    try {
      // 1. Heulender Sandsturmwind um die Burgzinnen (Mächtiger Sandsturm)
      const stormBufferSize = this.ctx.sampleRate * 2;
      const stormBuffer = this.ctx.createBuffer(1, stormBufferSize, this.ctx.sampleRate);
      const sOutput = stormBuffer.getChannelData(0);
      for (let i = 0; i < stormBufferSize; i++) {
        sOutput[i] = (Math.random() * 2 - 1) * 0.48;
      }
      const stormNoise = this.ctx.createBufferSource();
      stormNoise.buffer = stormBuffer;
      stormNoise.loop = true;

      const stormFilter = this.ctx.createBiquadFilter();
      stormFilter.type = 'bandpass';
      stormFilter.frequency.setValueAtTime(480, this.ctx.currentTime);
      stormFilter.Q.setValueAtTime(1.5, this.ctx.currentTime);

      const stormGain = this.ctx.createGain();
      stormGain.gain.setValueAtTime(0.045, this.ctx.currentTime);

      stormNoise.connect(stormFilter);
      stormFilter.connect(stormGain);
      stormGain.connect(this.ambientGain);

      stormNoise.start();

      // Windböen-Schwellung (Heulende Windstöße)
      const gustInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(gustInterval);
          return;
        }
        try {
          const now = this.ctx.currentTime;
          const targetFreq = 380 + Math.random() * 450;
          stormFilter.frequency.linearRampToValueAtTime(targetFreq, now + 1.2);
          const targetGain = 0.035 + Math.random() * 0.030;
          stormGain.gain.linearRampToValueAtTime(targetGain, now + 1.2);
        } catch(e) {}
      }, 1800);

      // 2. Mittelalterliches Ritter-Horn & Fanfaren-Resonanz (D-Moll / Quarten & Quinten)
      const hornNotes = [146.83, 220.00, 293.66, 174.61]; // D3, A3, D4, F3
      let hornIdx = 0;
      const hornInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(hornInterval);
          return;
        }
        try {
          if (Math.random() > 0.40) {
            const now = this.ctx.currentTime;
            const freq = hornNotes[hornIdx % hornNotes.length];
            hornIdx += Math.floor(Math.random() * 2) + 1;

            const hOsc = this.ctx.createOscillator();
            const hGain = this.ctx.createGain();

            hOsc.type = 'sawtooth';
            hOsc.frequency.setValueAtTime(freq, now);

            // Tiefpass für warmen Blechbläser- / Horn-Charakter
            const hFilter = this.ctx.createBiquadFilter();
            hFilter.type = 'lowpass';
            hFilter.frequency.setValueAtTime(450, now);

            hGain.gain.setValueAtTime(0.0001, now);
            hGain.gain.linearRampToValueAtTime(0.022, now + 0.35);
            hGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

            hOsc.connect(hFilter);
            hFilter.connect(hGain);
            hGain.connect(this.ambientGain);

            hOsc.start(now);
            hOsc.stop(now + 3.25);
          }
        } catch(e) {}
      }, 3400);

      this.ambientNodes.push(
        stormNoise, stormFilter, stormGain,
        { stop: () => { clearInterval(gustInterval); clearInterval(hornInterval); }, disconnect: () => {} }
      );
    } catch(e) {}
  }

  _startToskanaSynth() {
    if (!this.ctx) return;
    try {
      // 1. Kräftiger toskanischer Sommerregen (plätschernder, dichter Regen & Tropfen)
      const rainBufferSize = this.ctx.sampleRate * 2;
      const rainBuffer = this.ctx.createBuffer(1, rainBufferSize, this.ctx.sampleRate);
      const rOutput = rainBuffer.getChannelData(0);
      for (let i = 0; i < rainBufferSize; i++) {
        rOutput[i] = (Math.random() * 2 - 1) * 0.46;
      }
      const rainNoise = this.ctx.createBufferSource();
      rainNoise.buffer = rainBuffer;
      rainNoise.loop = true;

      const rainFilter = this.ctx.createBiquadFilter();
      rainFilter.type = 'lowpass';
      rainFilter.frequency.setValueAtTime(1850, this.ctx.currentTime);
      rainFilter.Q.setValueAtTime(0.80, this.ctx.currentTime);

      const rainGain = this.ctx.createGain();
      rainGain.gain.setValueAtTime(0.052, this.ctx.currentTime);

      rainNoise.connect(rainFilter);
      rainFilter.connect(rainGain);
      rainGain.connect(this.ambientGain);

      rainNoise.start();

      // 2. Warme toskanische Brise über den Hügeln
      const breezeBufferSize = this.ctx.sampleRate * 2;
      const breezeBuffer = this.ctx.createBuffer(1, breezeBufferSize, this.ctx.sampleRate);
      const bOutput = breezeBuffer.getChannelData(0);
      for (let i = 0; i < breezeBufferSize; i++) {
        bOutput[i] = (Math.random() * 2 - 1) * 0.28;
      }
      const breezeNoise = this.ctx.createBufferSource();
      breezeNoise.buffer = breezeBuffer;
      breezeNoise.loop = true;

      const breezeFilter = this.ctx.createBiquadFilter();
      breezeFilter.type = 'bandpass';
      breezeFilter.frequency.setValueAtTime(360, this.ctx.currentTime);
      breezeFilter.Q.setValueAtTime(0.9, this.ctx.currentTime);

      const breezeGain = this.ctx.createGain();
      breezeGain.gain.setValueAtTime(0.024, this.ctx.currentTime);

      breezeNoise.connect(breezeFilter);
      breezeFilter.connect(breezeGain);
      breezeGain.connect(this.ambientGain);

      breezeNoise.start();

      // 3. Italienische Mandolinen-/Gitarren-Akkordmotive (A-Dur, D-Dur, Fis-Moll Arpeggios)
      const toskanaChords = [
        [440.00, 554.37, 659.25], // A-Dur (A4, C#5, E5)
        [293.66, 369.99, 440.00], // D-Dur (D4, F#4, A4)
        [369.99, 440.00, 554.37], // F#m (F#4, A4, C#5)
        [329.63, 415.30, 493.88]  // E-Dur (E4, G#4, B4)
      ];
      let tChordIdx = 0;
      const mandolinInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(mandolinInterval);
          return;
        }
        try {
          const now = this.ctx.currentTime;
          const chord = toskanaChords[tChordIdx % toskanaChords.length];
          tChordIdx++;

          // Arpeggio der Mandolinensaiten
          chord.forEach((freq, idx) => {
            const delay = idx * 0.12;
            const mOsc = this.ctx.createOscillator();
            const mGain = this.ctx.createGain();

            mOsc.type = 'triangle';
            mOsc.frequency.setValueAtTime(freq, now + delay);

            mGain.gain.setValueAtTime(0.0001, now + delay);
            mGain.gain.linearRampToValueAtTime(0.020, now + delay + 0.04);
            mGain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 1.85);

            mOsc.connect(mGain);
            mGain.connect(this.ambientGain);

            mOsc.start(now + delay);
            mOsc.stop(now + delay + 1.9);
          });
        } catch(e) {}
      }, 2600);

      this.ambientNodes.push(
        rainNoise, rainFilter, rainGain,
        breezeNoise, breezeFilter, breezeGain,
        { stop: () => { clearInterval(mandolinInterval); }, disconnect: () => {} }
      );
    } catch(e) {}
  }

  _startHerbstSynth() {
    if (!this.ctx) return;
    try {
      // 1. Herbstwind durch die goldenen Baumkronen (Warmes, modulierendes Windwehen)
      const windBufferSize = this.ctx.sampleRate * 2;
      const windBuffer = this.ctx.createBuffer(1, windBufferSize, this.ctx.sampleRate);
      const wOutput = windBuffer.getChannelData(0);
      for (let i = 0; i < windBufferSize; i++) {
        wOutput[i] = (Math.random() * 2 - 1) * 0.35;
      }
      const windNoise = this.ctx.createBufferSource();
      windNoise.buffer = windBuffer;
      windNoise.loop = true;

      const windFilter = this.ctx.createBiquadFilter();
      windFilter.type = 'bandpass';
      windFilter.frequency.setValueAtTime(420, this.ctx.currentTime);
      windFilter.Q.setValueAtTime(1.8, this.ctx.currentTime);

      const windLFO = this.ctx.createOscillator();
      windLFO.type = 'sine';
      windLFO.frequency.setValueAtTime(0.18, this.ctx.currentTime);
      const windLFOGain = this.ctx.createGain();
      windLFOGain.gain.setValueAtTime(160, this.ctx.currentTime);
      windLFO.connect(windLFOGain);
      windLFOGain.connect(windFilter.frequency);
      windLFO.start();

      const windGain = this.ctx.createGain();
      windGain.gain.setValueAtTime(0.038, this.ctx.currentTime);

      windNoise.connect(windFilter);
      windFilter.connect(windGain);
      windGain.connect(this.ambientGain);
      windNoise.start();

      // 2. Raschelndes Laub im Wind (zarte Laubböen)
      const rustleInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(rustleInterval);
          return;
        }
        try {
          if (Math.random() > 0.40) {
            const now = this.ctx.currentTime;
            const rBufferSize = Math.floor(this.ctx.sampleRate * 0.45);
            const rBuffer = this.ctx.createBuffer(1, rBufferSize, this.ctx.sampleRate);
            const rData = rBuffer.getChannelData(0);
            for (let i = 0; i < rBufferSize; i++) {
              rData[i] = (Math.random() * 2 - 1) * 0.22;
            }
            const rNoise = this.ctx.createBufferSource();
            rNoise.buffer = rBuffer;

            const rFilter = this.ctx.createBiquadFilter();
            rFilter.type = 'highpass';
            rFilter.frequency.setValueAtTime(1200 + Math.random() * 600, now);

            const rGain = this.ctx.createGain();
            rGain.gain.setValueAtTime(0.0001, now);
            rGain.gain.linearRampToValueAtTime(0.016, now + 0.08);
            rGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.42);

            rNoise.connect(rFilter);
            rFilter.connect(rGain);
            rGain.connect(this.ambientGain);

            rNoise.start(now);
            rNoise.stop(now + 0.45);
          }
        } catch(e) {}
      }, 1800);

      // 3. Herbstliche Streicher- & Holzbläser-Motive (D-Moll / F-Dur / B-Dur Akkordfolge)
      const herbstChords = [
        [293.66, 349.23, 440.00], // D-Moll (D4, F4, A4)
        [349.23, 440.00, 523.25], // F-Dur (F4, A4, C5)
        [233.08, 293.66, 349.23], // B-Dur (Bb3, D4, F4)
        [220.00, 261.63, 329.63]  // A-Moll (A3, C4, E4)
      ];
      let hChordIdx = 0;
      const melodyInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(melodyInterval);
          return;
        }
        try {
          const now = this.ctx.currentTime;
          const chord = herbstChords[hChordIdx % herbstChords.length];
          hChordIdx++;

          chord.forEach((freq, idx) => {
            const delay = idx * 0.16;
            const cOsc = this.ctx.createOscillator();
            const cGain = this.ctx.createGain();

            cOsc.type = 'sine';
            cOsc.frequency.setValueAtTime(freq, now + delay);

            cGain.gain.setValueAtTime(0.0001, now + delay);
            cGain.gain.linearRampToValueAtTime(0.018, now + delay + 0.12);
            cGain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 2.2);

            cOsc.connect(cGain);
            cGain.connect(this.ambientGain);

            cOsc.start(now + delay);
            cOsc.stop(now + delay + 2.3);
          });
        } catch(e) {}
      }, 3100);

      this.ambientNodes.push(
        windNoise, windFilter, windGain, windLFO, windLFOGain,
        { stop: () => { clearInterval(rustleInterval); clearInterval(melodyInterval); }, disconnect: () => {} }
      );
    } catch(e) {}
  }

  _startSchneefallSynth() {
    if (!this.ctx) return;
    try {
      // 1. Sanfter, heulender Winterwind über den schneebedeckten Hängen
      const windBufferSize = this.ctx.sampleRate * 2;
      const windBuffer = this.ctx.createBuffer(1, windBufferSize, this.ctx.sampleRate);
      const wOutput = windBuffer.getChannelData(0);
      for (let i = 0; i < windBufferSize; i++) {
        wOutput[i] = (Math.random() * 2 - 1) * 0.38;
      }
      const windNoise = this.ctx.createBufferSource();
      windNoise.buffer = windBuffer;
      windNoise.loop = true;

      const windFilter = this.ctx.createBiquadFilter();
      windFilter.type = 'bandpass';
      windFilter.frequency.setValueAtTime(340, this.ctx.currentTime);
      windFilter.Q.setValueAtTime(2.2, this.ctx.currentTime);

      const windLFO = this.ctx.createOscillator();
      windLFO.type = 'sine';
      windLFO.frequency.setValueAtTime(0.12, this.ctx.currentTime);
      const windLFOGain = this.ctx.createGain();
      windLFOGain.gain.setValueAtTime(180, this.ctx.currentTime);
      windLFO.connect(windLFOGain);
      windLFOGain.connect(windFilter.frequency);
      windLFO.start();

      const windGain = this.ctx.createGain();
      windGain.gain.setValueAtTime(0.042, this.ctx.currentTime);

      windNoise.connect(windFilter);
      windFilter.connect(windGain);
      windGain.connect(this.ambientGain);
      windNoise.start();

      // 2. Glitzernde Eis-Kristalle & knirschender Schnee (Hochpass-Glitzern)
      const sparkleInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(sparkleInterval);
          return;
        }
        try {
          if (Math.random() > 0.35) {
            const now = this.ctx.currentTime;
            const sOsc = this.ctx.createOscillator();
            const sGain = this.ctx.createGain();

            sOsc.type = 'sine';
            sOsc.frequency.setValueAtTime(1800 + Math.random() * 1200, now);

            sGain.gain.setValueAtTime(0.0001, now);
            sGain.gain.linearRampToValueAtTime(0.008, now + 0.04);
            sGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.65);

            sOsc.connect(sGain);
            sGain.connect(this.ambientGain);

            sOsc.start(now);
            sOsc.stop(now + 0.7);
          }
        } catch(e) {}
      }, 1500);

      // 3. Kristallene Winter-Celesta & Eisglöckchen (C-Dur / A-Moll Pentatonik)
      const iceBells = [523.25, 659.25, 783.99, 880.00, 1046.50, 1318.51];
      let bellIdx = 0;
      const bellInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(bellInterval);
          return;
        }
        try {
          if (Math.random() > 0.25) {
            const now = this.ctx.currentTime;
            const freq = iceBells[bellIdx % iceBells.length];
            bellIdx++;

            const bOsc = this.ctx.createOscillator();
            const bGain = this.ctx.createGain();

            bOsc.type = 'sine';
            bOsc.frequency.setValueAtTime(freq, now);

            bGain.gain.setValueAtTime(0.0001, now);
            bGain.gain.linearRampToValueAtTime(0.022, now + 0.02);
            bGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

            bOsc.connect(bGain);
            bGain.connect(this.ambientGain);

            bOsc.start(now);
            bOsc.stop(now + 2.6);
          }
        } catch(e) {}
      }, 2400);

      this.ambientNodes.push(
        windNoise, windFilter, windGain, windLFO, windLFOGain,
        { stop: () => { clearInterval(sparkleInterval); clearInterval(bellInterval); }, disconnect: () => {} }
      );
    } catch(e) {}
  }

  _startChinaSynth() {
    if (!this.ctx) return;
    try {
      // 1. Tiefes, fernes Gewittergrollen & Bergwind durch die Schluchten
      const thunderBufferSize = this.ctx.sampleRate * 2;
      const thunderBuffer = this.ctx.createBuffer(1, thunderBufferSize, this.ctx.sampleRate);
      const tOutput = thunderBuffer.getChannelData(0);
      for (let i = 0; i < thunderBufferSize; i++) {
        tOutput[i] = (Math.random() * 2 - 1) * 0.42;
      }
      const thunderNoise = this.ctx.createBufferSource();
      thunderNoise.buffer = thunderBuffer;
      thunderNoise.loop = true;

      const thunderFilter = this.ctx.createBiquadFilter();
      thunderFilter.type = 'lowpass';
      thunderFilter.frequency.setValueAtTime(140, this.ctx.currentTime);
      thunderFilter.Q.setValueAtTime(2.8, this.ctx.currentTime);

      const thunderLFO = this.ctx.createOscillator();
      thunderLFO.type = 'sine';
      thunderLFO.frequency.setValueAtTime(0.08, this.ctx.currentTime);
      const thunderLFOGain = this.ctx.createGain();
      thunderLFOGain.gain.setValueAtTime(75, this.ctx.currentTime);
      thunderLFO.connect(thunderLFOGain);
      thunderLFOGain.connect(thunderFilter.frequency);
      thunderLFO.start();

      const thunderGain = this.ctx.createGain();
      thunderGain.gain.setValueAtTime(0.038, this.ctx.currentTime);

      thunderNoise.connect(thunderFilter);
      thunderFilter.connect(thunderGain);
      thunderGain.connect(this.ambientGain);
      thunderNoise.start();

      // Prasselnder Gewitterregen über den Bergwäldern
      const rainBufferSize = this.ctx.sampleRate * 2;
      const rainBuffer = this.ctx.createBuffer(1, rainBufferSize, this.ctx.sampleRate);
      const rOutput = rainBuffer.getChannelData(0);
      for (let i = 0; i < rainBufferSize; i++) {
        rOutput[i] = (Math.random() * 2 - 1) * 0.45;
      }
      const rainNoise = this.ctx.createBufferSource();
      rainNoise.buffer = rainBuffer;
      rainNoise.loop = true;

      const rainFilter = this.ctx.createBiquadFilter();
      rainFilter.type = 'lowpass';
      rainFilter.frequency.setValueAtTime(1750, this.ctx.currentTime);
      rainFilter.Q.setValueAtTime(0.85, this.ctx.currentTime);

      const rainGain = this.ctx.createGain();
      rainGain.gain.setValueAtTime(0.048, this.ctx.currentTime);

      rainNoise.connect(rainFilter);
      rainFilter.connect(rainGain);
      rainGain.connect(this.ambientGain);
      rainNoise.start();

      // 2. Traditionelle chinesische Zither- / Guzheng-Motive (D-Moll Pentatonik: D4, F4, G4, A4, C5, D5)
      const guzhengNotes = [293.66, 349.23, 392.00, 440.00, 523.25, 587.33];
      let gIdx = 0;
      const guzhengInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(guzhengInterval);
          return;
        }
        try {
          if (Math.random() > 0.28) {
            const now = this.ctx.currentTime;
            const noteCount = 2 + Math.floor(Math.random() * 3);
            for (let n = 0; n < noteCount; n++) {
              const freq = guzhengNotes[(gIdx + n * 2) % guzhengNotes.length];
              const delay = n * 0.14;

              const zOsc = this.ctx.createOscillator();
              const zGain = this.ctx.createGain();

              // Metallischer, perlender Guzheng-Klang (Triangle mit leichtem Filter)
              zOsc.type = 'triangle';
              zOsc.frequency.setValueAtTime(freq, now + delay);

              zGain.gain.setValueAtTime(0.0001, now + delay);
              zGain.gain.linearRampToValueAtTime(0.024, now + delay + 0.015);
              zGain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 1.6);

              zOsc.connect(zGain);
              zGain.connect(this.ambientGain);

              zOsc.start(now + delay);
              zOsc.stop(now + delay + 1.7);
            }
            gIdx += noteCount;
          }
        } catch(e) {}
      }, 2700);

      // 3. Meditativer Tempelgong / Klangschale (tiefe Resonanz)
      const gongInterval = setInterval(() => {
        if (!this.ctx || this.ambientNodes.length === 0) {
          clearInterval(gongInterval);
          return;
        }
        try {
          if (Math.random() > 0.45) {
            const now = this.ctx.currentTime;
            const gongOsc = this.ctx.createOscillator();
            const gongGain = this.ctx.createGain();

            gongOsc.type = 'sine';
            gongOsc.frequency.setValueAtTime(146.83, now); // D3

            gongGain.gain.setValueAtTime(0.0001, now);
            gongGain.gain.linearRampToValueAtTime(0.030, now + 0.05);
            gongGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.2);

            gongOsc.connect(gongGain);
            gongGain.connect(this.ambientGain);

            gongOsc.start(now);
            gongOsc.stop(now + 4.3);
          }
        } catch(e) {}
      }, 6500);

      this.ambientNodes.push(
        thunderNoise, thunderFilter, thunderGain, thunderLFO, thunderLFOGain,
        rainNoise, rainFilter, rainGain,
        { stop: () => { clearInterval(guzhengInterval); clearInterval(gongInterval); }, disconnect: () => {} }
      );
    } catch(e) {}
  }

  _startJuliusCaesarSynth() {
    if (!this.ctx) return;
    try {
      // 1. Sanfte mediterrane Brise
      const breezeBufferSize = this.ctx.sampleRate * 2;
      const breezeBuffer = this.ctx.createBuffer(1, breezeBufferSize, this.ctx.sampleRate);
      const bOutput = breezeBuffer.getChannelData(0);
      for (let i = 0; i < breezeBufferSize; i++) {
        bOutput[i] = (Math.random() * 2 - 1) * 0.25;
      }
      const breezeNoise = this.ctx.createBufferSource();
      breezeNoise.buffer = breezeBuffer;
      breezeNoise.loop = true;

      const breezeFilter = this.ctx.createBiquadFilter();
      breezeFilter.type = 'lowpass';
      breezeFilter.frequency.setValueAtTime(320, this.ctx.currentTime);

      const breezeLFO = this.ctx.createOscillator();
      breezeLFO.type = 'sine';
      breezeLFO.frequency.setValueAtTime(0.12, this.ctx.currentTime);
      const breezeLFOGain = this.ctx.createGain();
      breezeLFOGain.gain.setValueAtTime(140, this.ctx.currentTime);
      breezeLFO.connect(breezeLFOGain);
      breezeLFOGain.connect(breezeFilter.frequency);
      breezeLFO.start();

      const breezeGain = this.ctx.createGain();
      breezeGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

      breezeNoise.connect(breezeFilter);
      breezeFilter.connect(breezeGain);
      breezeGain.connect(this.ambientGain);
      breezeNoise.start();

      // 2. Erhabener, warmer imperialer Grundton (Römisches Majestäts-Pad: D-Moll/Dur Quinte)
      const droneOsc1 = this.ctx.createOscillator();
      const droneOsc2 = this.ctx.createOscillator();
      droneOsc1.type = 'sawtooth';
      droneOsc2.type = 'triangle';
      droneOsc1.frequency.setValueAtTime(73.42, this.ctx.currentTime);  // D2
      droneOsc2.frequency.setValueAtTime(110.00, this.ctx.currentTime); // A2

      const droneFilter = this.ctx.createBiquadFilter();
      droneFilter.type = 'lowpass';
      droneFilter.frequency.setValueAtTime(260, this.ctx.currentTime);

      const droneGain = this.ctx.createGain();
      droneGain.gain.setValueAtTime(0.035, this.ctx.currentTime);

      droneOsc1.connect(droneFilter);
      droneOsc2.connect(droneFilter);
      droneFilter.connect(droneGain);
      droneGain.connect(this.ambientGain);

      droneOsc1.start();
      droneOsc2.start();

      // 3. Edle antike römische Trompeten- / Cornu-Fanfaren & Lyra-Töne in Abständen
      const romanTones = [146.83, 220.00, 293.66, 369.99, 440.00, 587.33]; // D-Dur / antikes Diatonon
      const fanfareInterval = setInterval(() => {
        try {
          if (!this.ctx || this.ambientNodes.length === 0) return;
          const now = this.ctx.currentTime;
          const freq = romanTones[Math.floor(Math.random() * romanTones.length)];

          const brassOsc = this.ctx.createOscillator();
          const brassGain = this.ctx.createGain();
          const brassFilter = this.ctx.createBiquadFilter();

          brassOsc.type = 'sawtooth';
          brassOsc.frequency.setValueAtTime(freq, now);

          brassFilter.type = 'bandpass';
          brassFilter.frequency.setValueAtTime(freq * 1.5, now);
          brassFilter.Q.setValueAtTime(3.0, now);

          brassGain.gain.setValueAtTime(0.0001, now);
          brassGain.gain.linearRampToValueAtTime(0.028, now + 0.35);
          brassGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);

          brassOsc.connect(brassFilter);
          brassFilter.connect(brassGain);
          brassGain.connect(this.ambientGain);

          brassOsc.start(now);
          brassOsc.stop(now + 2.5);
        } catch(e) {}
      }, 4500);

      this.ambientNodes.push(
        breezeNoise, breezeFilter, breezeGain, breezeLFO, breezeLFOGain,
        droneOsc1, droneOsc2, droneFilter, droneGain,
        { stop: () => { clearInterval(fanfareInterval); }, disconnect: () => {} }
      );
    } catch(e) {}
  }
}

export const soundEngine = new SoundEngine();
