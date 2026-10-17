const assetUrl = (p) => (import.meta.env.BASE_URL || './') + String(p).replace(/^\//, '');

const THEME_CUSTOM_FILES = {
  pirate_nest: { main: 'Pirateninsel.webp', fallback: 'bg_pirate_nest.webp' },
  junkyard: { main: 'Schrottplatz-Chaos.webp', fallback: 'bg_junkyard.webp' },
  autumn_orchard: { main: 'Der Obstgarten.webp', fallback: 'bg_autumn_orchard.webp' },
  cyberpunk: { main: 'Cyberpunk-Metropole.webp', fallback: 'bg_cyberpunk.webp' },
  enchanted_forest: { main: 'Zauberwald.webp', fallback: 'bg_enchanted_forest.webp' },
  mad_scientist_lab: { main: 'Labor.webp', fallback: 'bg_mad_scientist_lab.webp' },
  taj_mahal: { main: 'Taj-Mahal.webp', fallback: 'bg_taj_mahal.webp' },
  hanging_gardens_babylon: { main: 'Haengende-Gaerten-Babylon.webp', fallback: 'bg_hanging_gardens_babylon.webp' },
  zeus_statue_olympia: { main: 'Zeusstatue-Olympia.webp', fallback: 'bg_zeus_statue_olympia.webp' },
  lighthouse_alexandria: { main: 'Leuchtturm-Alexandria.webp', fallback: 'bg_lighthouse_alexandria.webp' },
  colossus_rhodes: { main: 'Koloss-von-Rhodos.webp', fallback: 'bg_colossus_rhodes.webp' },
  mausoleum_halicarnassus: { main: 'Mausoleum-Halikarnassos.webp', fallback: 'bg_mausoleum_halicarnassus.webp' },
  artemis_temple_ephesus: { main: 'Artemistempel-Ephesos.webp', fallback: 'bg_artemis_temple_ephesus.webp' },
  chichen_itza: { main: 'Chichen-Itza.webp', fallback: 'bg_chichen_itza.webp' },
  christ_redeemer_rio: { main: 'Christus-der-Erloeser.webp', fallback: 'bg_christ_redeemer_rio.webp' },
  great_wall_china: { main: 'Chinesische-Mauer.webp', fallback: 'bg_great_wall_china.webp' },
  machu_picchu: { main: 'Machu-Picchu.webp', fallback: 'bg_machu_picchu.webp' },
  petra_jordan: { main: 'Petra-Schatzhaus.webp', fallback: 'bg_petra_jordan.webp' },
  statue_of_liberty: { main: 'Freiheitsstatue-NewYork.webp', fallback: 'bg_statue_of_liberty.webp' },
  eiffel_tower_paris: { main: 'Eiffelturm-Paris.webp', fallback: 'bg_eiffel_tower_paris.webp' },
  stonehenge: { main: 'Stonehenge-England.webp', fallback: 'bg_stonehenge.webp' },
  leaning_tower_pisa: { main: 'Schiefer-Turm-Pisa.webp', fallback: 'bg_leaning_tower_pisa.webp' },
  easter_island_moai: { main: 'Osterinsel-Moai.webp', fallback: 'bg_easter_island_moai.webp' },
  tower_bridge_london: { main: 'Tower-Bridge-London.webp', fallback: 'bg_tower_bridge_london.webp' },
  grazer_uhrturm: { main: 'Grazer-Uhrturm.webp', fallback: 'bg_grazer_uhrturm.webp' },
  im_weltall: { main: 'Im-Weltall.webp', fallback: 'bg_im_weltall.webp' },
  wien: { main: 'Wien.webp', fallback: 'bg_wien.webp' },
  mohnblumen: { main: 'Moonblumen.webp', fallback: 'bg_mohnblumen.webp' },
  die_burg: { main: 'Burg_a.webp', fallback: 'bg_die_burg.webp' },
  toskana: { main: 'Toskana.webp', fallback: 'bg_toskana.webp' },
  herbst: { main: 'Der-Herbst.webp', fallback: 'bg_herbst.webp' },
  schneefall: { main: 'Schneelandschaft.webp', fallback: 'bg_schneefall.webp' },
  china: { main: 'China_A.webp', fallback: 'bg_china.webp' },
  julius_caesar: { main: 'Der Kaiser.webp', fallback: 'bg_julius_caesar.webp' },
  city: { main: 'China-Stadt.webp', fallback: 'bg_city.webp' }
};

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
    this.loadThemeBackground('summer'); // Startlevel-Hintergrund vorladen
    this._loadBirdSprites();
  }

  loadThemeBackground(theme) {
    if (!theme) return null;
    if (this.bgImages[theme] !== undefined) return this.bgImages[theme];

    const img = new Image();
    this.bgImages[theme] = null; // Als ladend markieren

    const custom = THEME_CUSTOM_FILES[theme];
    const mainFile = custom ? custom.main : `bg_${theme}.webp`;
    const fallbackFile = custom ? custom.fallback : null;

    img.src = assetUrl(mainFile);
    img.onload = () => {
      this.bgImages[theme] = img;
    };
    img.onerror = () => {
      if (fallbackFile && img.src !== assetUrl(fallbackFile)) {
        const fallbackImg = new Image();
        fallbackImg.src = assetUrl(fallbackFile);
        fallbackImg.onload = () => {
          this.bgImages[theme] = fallbackImg;
        };
        fallbackImg.onerror = () => {
          this.bgImages[theme] = null;
        };
      } else {
        this.bgImages[theme] = null;
      }
    };
    return img;
  }

  _loadBackgroundImages() {
    // Hintergruende werden nun on-demand ueber loadThemeBackground() geladen
  }

  _loadBirdSprites() {
    const loadList = (paths, fallbackPaths, targetArray) => {
      paths.forEach((src, idx) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onerror = () => {
          if (fallbackPaths && fallbackPaths[idx] && img.src !== assetUrl(fallbackPaths[idx])) {
            img.src = assetUrl(fallbackPaths[idx]);
          }
        };
        img.src = assetUrl(src);
        targetArray.push(img);
      });
    };

    loadList(
      ['/voegel/Moor/Moor1.webp', '/voegel/Moor/Moor2.webp'],
      ['/Vögel/Moor/Moor1.webp', '/Vögel/Moor/Moor2.webp'],
      this.birdSprites.moor
    );

    loadList(
      ['/voegel/Taube-animation/Taube1.webp', '/voegel/Taube-animation/Taube2.webp', '/voegel/Taube-animation/Taube3.webp'],
      ['/Vögel/Taube-animation/Taube1.webp', '/Vögel/Taube-animation/Taube2.webp', '/Vögel/Taube-animation/Taube3.webp'],
      this.birdSprites.taube
    );

    loadList(
      ['/voegel/vogel-animation/storch1.webp', '/voegel/vogel-animation/storch2.webp', '/voegel/vogel-animation/storch3.webp'],
      ['/Vögel/vogel-animation/storch1.webp', '/Vögel/vogel-animation/storch2.webp', '/Vögel/vogel-animation/storch3.webp'],
      this.birdSprites.storch
    );
  }

  preloadBirdSprites() {
    const promises = [];
    const allImages = [...this.birdSprites.moor, ...this.birdSprites.taube, ...this.birdSprites.storch];
    for (const img of allImages) {
      if (img.complete && img.naturalWidth > 0) continue;
      promises.push(new Promise((resolve) => {
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
      }));
    }
    return Promise.all(promises);
  }

  addDecal(x, y) {
    this.decals.push({ x, y, size: 4 + Math.random() * 4 });
  }

  clearDecals() {
    this.decals = [];
  }

  // --- 1. THEME BACKGROUND RENDERERS --- //

  renderBackground(ctx, theme, virtualWidth, screenHeight, animTime) {
    let img = this.bgImages[theme];
    if (img === undefined) {
      img = this.loadThemeBackground(theme);
    }

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
      } else if (theme === 'egypt') {
        this._renderEgypt(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'rome') {
        this._renderRome(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'gaul') {
        this._renderGaul(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'palace') {
        this._renderPalace(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'moorland') {
        this._renderMoorland(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'dragon_valley') {
        this._renderDragonValley(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'jungle_ruins') {
        this._renderJungleRuins(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'medieval_fortress') {
        this._renderMedievalFortress(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'military_base') {
        this._renderMilitaryBase(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'atlantis') {
        this._renderAtlantis(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'alpine_meadow') {
        this._renderAlpineMeadow(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'elven_kingdom') {
        this._renderElvenKingdom(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'wild_west') {
        this._renderWildWest(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'mars_colony') {
        this._renderMarsColony(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'candy_planet') {
        this._renderCandyPlanet(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'night_fair') {
        this._renderNightFair(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'riverbank') {
        this._renderRiverbank(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'floating_islands') {
        this._renderFloatingIslands(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'pirate_nest') {
        this._renderPirateNest(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'junkyard') {
        this._renderJunkyard(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'autumn_orchard') {
        this._renderAutumnOrchard(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'cyberpunk') {
        this._renderCyberpunk(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'enchanted_forest') {
        this._renderEnchantedForest(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'savannah') {
        this._renderSavannah(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'graveyard') {
        this._renderGraveyard(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'harbor') {
        this._renderHarbor(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'arcade') {
        this._renderArcade(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'clock_canyon') {
        this._renderClockCanyon(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'arctic') {
        this._renderArctic(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'haunted_manor') {
        this._renderHauntedManor(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'rooftop_garden') {
        this._renderRooftopGarden(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'drive_in_cinema') {
        this._renderDriveInCinema(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'crystal_cave') {
        this._renderCrystalCave(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'grand_canyon') {
        this._renderGrandCanyon(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'ghost_ship') {
        this._renderGhostShip(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'construction_site') {
        this._renderConstructionSite(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'western_mine') {
        this._renderWesternMine(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'toy_box') {
        this._renderToyBox(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'bamboo_valley') {
        this._renderBambooValley(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'vampire_castle') {
        this._renderVampireCastle(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'subway_station') {
        this._renderSubwayStation(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'cloud_castle') {
        this._renderCloudCastle(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'mystic_mangrove') {
        this._renderMysticMangrove(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'outer_space') {
        this._renderOuterSpace(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'colosseum_arena') {
        this._renderColosseumArena(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'ski_resort') {
        this._renderSkiResort(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'iceland_geysir') {
        this._renderIcelandGeysir(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'giant_bakery') {
        this._renderGiantBakery(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'arcade_chip') {
        this._renderArcadeChip(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'sakura_park') {
        this._renderSakuraPark(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'formula1_track') {
        this._renderFormula1Track(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'coral_reef_lowtide') {
        this._renderCoralReefLowtide(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'artist_studio') {
        this._renderArtistStudio(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'pixel_desert') {
        this._renderPixelDesert(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'giza_pyramids') {
        this._renderGizaPyramids(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'soccer_stadium') {
        this._renderSoccerStadium(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'prairie_tornado') {
        this._renderPrairieTornado(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'retro_living_room') {
        this._renderRetroLivingRoom(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'comic_drawing_board') {
        this._renderComicDrawingBoard(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'venice_canals') {
        this._renderVeniceCanals(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'skatepark') {
        this._renderSkatepark(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'aurora_borealis') {
        this._renderAuroraBorealis(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'mad_scientist_lab') {
        this._renderMadScientistLab(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'taj_mahal') {
        this._renderTajMahal(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'hanging_gardens_babylon') {
        this._renderHangingGardensBabylon(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'zeus_statue_olympia') {
        this._renderZeusStatueOlympia(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'lighthouse_alexandria') {
        this._renderLighthouseAlexandria(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'colossus_rhodes') {
        this._renderColossusRhodes(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'mausoleum_halicarnassus') {
        this._renderMausoleumHalicarnassus(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'artemis_temple_ephesus') {
        this._renderArtemisTempleEphesus(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'chichen_itza') {
        this._renderChichenItza(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'christ_redeemer_rio') {
        this._renderChristRedeemerRio(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'great_wall_china') {
        this._renderGreatWallChina(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'machu_picchu') {
        this._renderMachuPicchu(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'petra_jordan') {
        this._renderPetraJordan(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'statue_of_liberty') {
        this._renderStatueOfLiberty(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'eiffel_tower_paris') {
        this._renderEiffelTowerParis(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'stonehenge') {
        this._renderStonehenge(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'leaning_tower_pisa') {
        this._renderLeaningTowerPisa(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'easter_island_moai') {
        this._renderEasterIslandMoai(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'tower_bridge_london') {
        this._renderTowerBridgeLondon(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'grazer_uhrturm') {
        this._renderGrazerUhrturm(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'im_weltall') {
        this._renderImWeltall(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'wien') {
        this._renderWien(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'mohnblumen') {
        this._renderMohnblumen(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'die_burg') {
        this._renderDieBurg(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'toskana') {
        this._renderToskana(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'herbst') {
        this._renderHerbst(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'schneefall') {
        this._renderSchneefall(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'china') {
        this._renderChina(ctx, virtualWidth, screenHeight, animTime);
      } else if (theme === 'julius_caesar') {
        this._renderJuliusCaesar(ctx, virtualWidth, screenHeight, animTime);
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

  _renderEgypt(ctx, width, height, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#38bdf8');
    sky.addColorStop(0.6, '#fef08a');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#eab308';
    ctx.fillRect(0, height * 0.55, width, height * 0.45);
  }

  _renderRome(ctx, width, height, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#0284c7');
    sky.addColorStop(0.7, '#bae6fd');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#a3e635';
    ctx.fillRect(0, height * 0.6, width, height * 0.4);
  }

  _renderGaul(ctx, width, height, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#ea580c');
    sky.addColorStop(0.6, '#fde047');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#84cc16';
    ctx.fillRect(0, height * 0.6, width, height * 0.4);
  }

  _renderPalace(ctx, width, height, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#f59e0b');
    sky.addColorStop(0.6, '#fef08a');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#eab308';
    ctx.fillRect(0, height * 0.6, width, height * 0.4);
  }

  _renderMoorland(ctx, width, height, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#475569');
    sky.addColorStop(0.6, '#94a3b8');
    sky.addColorStop(1, '#cbd5e1');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    // Swamp Moor Ground
    ctx.fillStyle = '#3f6212';
    ctx.fillRect(0, height * 0.55, width, height * 0.45);

    // Waterholes
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.ellipse(width * 0.25, height * 0.75, 180, 45, 0, 0, Math.PI * 2);
    ctx.ellipse(width * 0.65, height * 0.82, 220, 55, 0, 0, Math.PI * 2);
    ctx.fill();

    // Misty Ground Fog Fields
    ctx.fillStyle = 'rgba(241, 245, 249, 0.35)';
    ctx.beginPath();
    ctx.ellipse(width * 0.3 + Math.sin(t * 0.5) * 40, height * 0.68, 400, 35, 0, 0, Math.PI * 2);
    ctx.ellipse(width * 0.75 - Math.cos(t * 0.4) * 50, height * 0.78, 450, 40, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  _renderDragonValley(ctx, width, height, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#18181b');
    sky.addColorStop(0.5, '#451a03');
    sky.addColorStop(1, '#7c2d12');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    // Volcanic Scorched Ground
    ctx.fillStyle = '#27272a';
    ctx.fillRect(0, height * 0.55, width, height * 0.45);

    // Lava Streams
    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.ellipse(width * 0.4, height * 0.75, 300, 25, -0.1, 0, Math.PI * 2);
    ctx.ellipse(width * 0.8, height * 0.82, 250, 30, 0.15, 0, Math.PI * 2);
    ctx.fill();

    // Dragon Cave Silhouette
    ctx.fillStyle = '#09090b';
    ctx.beginPath();
    ctx.arc(width * 0.8, height * 0.45, 120, 0, Math.PI * 2);
    ctx.fill();

    // Dragon Eyes Glowing
    const eyeGlow = (Math.sin(t * 4) + 1) * 0.5;
    ctx.fillStyle = `rgba(239, 68, 68, ${0.7 + eyeGlow * 0.3})`;
    ctx.beginPath();
    ctx.arc(width * 0.8 - 18, height * 0.45 - 10, 8, 0, Math.PI * 2);
    ctx.arc(width * 0.8 + 18, height * 0.45 - 10, 8, 0, Math.PI * 2);
    ctx.fill();
  }

  _renderJungleRuins(ctx, width, height, t) {
    // Golden Hour Sky
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#ea580c');
    sky.addColorStop(0.5, '#f59e0b');
    sky.addColorStop(1, '#fef08a');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    // Deep Jungle Ground
    ctx.fillStyle = '#14532d';
    ctx.fillRect(0, height * 0.55, width, height * 0.45);

    // Aztec Pyramid Silhouette
    ctx.fillStyle = '#451a03';
    ctx.beginPath();
    ctx.moveTo(width * 0.55, height * 0.65);
    ctx.lineTo(width * 0.65, height * 0.3);
    ctx.lineTo(width * 0.75, height * 0.3);
    ctx.lineTo(width * 0.85, height * 0.65);
    ctx.closePath();
    ctx.fill();
  }

  _renderMedievalFortress(ctx, width, height, t) {
    // Golden Hour Sunset Sky
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#ea580c');
    sky.addColorStop(0.6, '#f97316');
    sky.addColorStop(1, '#fde047');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    // Castle Moat & Landscape
    ctx.fillStyle = '#65a30d';
    ctx.fillRect(0, height * 0.58, width, height * 0.42);

    // Moat Reflecting Water
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(0, height * 0.78, width, height * 0.22);

    // Stone Fortress Walls Silhouette
    ctx.fillStyle = '#475569';
    ctx.fillRect(width * 0.2, height * 0.4, width * 0.6, height * 0.38);
  }

  _renderMilitaryBase(ctx, width, height, t) {
    // Bright Noon Daylight Sky
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#38bdf8');
    sky.addColorStop(0.6, '#bae6fd');
    sky.addColorStop(1, '#e0f2fe');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    // Compound Ground & Helipad
    ctx.fillStyle = '#71717a';
    ctx.fillRect(0, height * 0.58, width, height * 0.42);

    // Radar Dish Base
    ctx.fillStyle = '#3f3f46';
    ctx.fillRect(width * 0.4, height * 0.35, 120, 180);

    // Rotating Radar Dish
    ctx.strokeStyle = '#e4e4e7';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(width * 0.45, height * 0.32, 50, Math.PI * 0.2 + Math.sin(t * 2) * 0.3, Math.PI * 1.8 + Math.sin(t * 2) * 0.3);
    ctx.stroke();
  }

  _renderAtlantis(ctx, width, height, t) {
    const sea = ctx.createLinearGradient(0, 0, 0, height);
    sea.addColorStop(0, '#38bdf8');
    sea.addColorStop(0.5, '#0284c7');
    sea.addColorStop(1, '#0369a1');
    ctx.fillStyle = sea;
    ctx.fillRect(0, 0, width, height);

    // Seabed Sand & Corals
    ctx.fillStyle = '#fde047';
    ctx.fillRect(0, height * 0.78, width, height * 0.22);

    // Sunken Greek Pillars
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(width * 0.2, height * 0.3, 40, 380);
    ctx.fillRect(width * 0.75, height * 0.25, 45, 420);
  }

  _renderPirateNest(ctx, width, height, t) {
    // 1. Caribbean Tropical Sky
    const sky = ctx.createLinearGradient(0, 0, 0, height * 0.65);
    sky.addColorStop(0, '#0284c7');
    sky.addColorStop(0.5, '#38bdf8');
    sky.addColorStop(0.85, '#fdba74');
    sky.addColorStop(1, '#f97316');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height * 0.65);

    // Tropical Sun
    const sunGrad = ctx.createRadialGradient(width * 0.4, height * 0.2, 10, width * 0.4, height * 0.2, 140);
    sunGrad.addColorStop(0, '#ffffff');
    sunGrad.addColorStop(0.3, '#fef08a');
    sunGrad.addColorStop(0.7, 'rgba(251, 146, 60, 0.4)');
    sunGrad.addColorStop(1, 'rgba(251, 146, 60, 0)');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(width * 0.4, height * 0.2, 140, 0, Math.PI * 2);
    ctx.fill();

    // Drifting Tropical Clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
    [0.15, 0.45, 0.75].forEach((cxPct, idx) => {
      const cx = (width * cxPct + t * (15 + idx * 8)) % (width + 300) - 150;
      const cy = height * (0.1 + idx * 0.05);
      ctx.beginPath();
      ctx.arc(cx, cy, 35, 0, Math.PI * 2);
      ctx.arc(cx + 30, cy - 15, 40, 0, Math.PI * 2);
      ctx.arc(cx + 65, cy, 35, 0, Math.PI * 2);
      ctx.fill();
    });

    // 2. Turquoise Ocean
    const ocean = ctx.createLinearGradient(0, height * 0.38, 0, height * 0.68);
    ocean.addColorStop(0, '#06b6d4');
    ocean.addColorStop(0.5, '#0284c7');
    ocean.addColorStop(1, '#0f766e');
    ctx.fillStyle = ocean;
    ctx.fillRect(0, height * 0.38, width, height * 0.3);

    // Ocean Waves Highlights
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 2;
    for (let wy = height * 0.42; wy < height * 0.62; wy += 22) {
      ctx.beginPath();
      for (let wx = 0; wx < width; wx += 60) {
        const waveY = wy + Math.sin(t * 2 + wx * 0.015 + wy * 0.05) * 4;
        if (wx === 0) ctx.moveTo(wx, waveY);
        else ctx.lineTo(wx, waveY);
      }
      ctx.stroke();
    }

    // 3. Anchored Pirate Galleon Ships (Background)
    const galleons = [
      { x: width * 0.55, y: height * 0.36, scale: 0.85 },
      { x: width * 0.72, y: height * 0.34, scale: 0.7 }
    ];

    galleons.forEach(gal => {
      ctx.save();
      ctx.translate(gal.x, gal.y);
      ctx.scale(gal.scale, gal.scale);

      // Ship Hull
      ctx.fillStyle = '#3f2305';
      ctx.beginPath();
      ctx.moveTo(-70, 0);
      ctx.quadraticCurveTo(-80, 25, -60, 30);
      ctx.lineTo(65, 30);
      ctx.quadraticCurveTo(85, 10, 75, -5);
      ctx.lineTo(-70, 0);
      ctx.fill();

      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(-65, 5, 135, 4); // Gold trim line

      // Black Cannon Portholes
      ctx.fillStyle = '#000000';
      [-40, -15, 10, 35].forEach(px => {
        ctx.fillRect(px, 12, 7, 7);
      });

      // Masts & Crossyards
      ctx.strokeStyle = '#271302';
      ctx.lineWidth = 3;
      [-35, 0, 40].forEach((mx, idx) => {
        const mHeight = 70 + (idx === 1 ? 18 : 0);
        ctx.beginPath();
        ctx.moveTo(mx, 5);
        ctx.lineTo(mx, -mHeight);
        ctx.stroke();

        // Sails (Folded/Trimmed Tan Sails)
        ctx.fillStyle = '#fef3c7';
        ctx.beginPath();
        ctx.moveTo(mx - 22, -mHeight + 12);
        ctx.quadraticCurveTo(mx, -mHeight + 5, mx + 22, -mHeight + 12);
        ctx.quadraticCurveTo(mx, -mHeight + 28, mx - 22, -mHeight + 12);
        ctx.fill(); ctx.stroke();

        // Pirate Skull Flag on Main Mast
        if (idx === 1) {
          ctx.fillStyle = '#0f172a';
          ctx.beginPath();
          ctx.moveTo(mx, -mHeight);
          ctx.lineTo(mx + 22, -mHeight + 5);
          ctx.lineTo(mx, -mHeight + 10);
          ctx.fill();
        }
      });
      ctx.restore();
    });

    // 4. Treasure Island (Background Right)
    ctx.save();
    ctx.fillStyle = '#eab308'; // Sand mound
    ctx.beginPath();
    ctx.ellipse(width * 0.86, height * 0.58, 220, 45, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#15803d'; // Tropical foliage
    ctx.beginPath();
    ctx.ellipse(width * 0.86, height * 0.56, 180, 25, 0, 0, Math.PI * 2);
    ctx.fill();

    // Treasure Chest on Island
    const chestX = width * 0.855;
    const chestY = height * 0.52;
    ctx.fillStyle = '#78350f';
    ctx.fillRect(chestX - 18, chestY - 12, 36, 24);
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(chestX - 18, chestY - 14, 36, 6); // Gold lid trim
    ctx.fillRect(chestX - 3, chestY - 4, 6, 12); // Lock latch
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 15;
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(chestX, chestY - 16, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();

    // 5. Foreground Tropical Beach Sand
    const sandGrad = ctx.createLinearGradient(0, height * 0.58, 0, height);
    sandGrad.addColorStop(0, '#fde047');
    sandGrad.addColorStop(0.4, '#eab308');
    sandGrad.addColorStop(1, '#ca8a04');
    ctx.fillStyle = sandGrad;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.58);
    ctx.quadraticCurveTo(width * 0.35, height * 0.54, width * 0.7, height * 0.62);
    ctx.quadraticCurveTo(width * 0.85, height * 0.65, width, height * 0.6);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.fill();

    // Palm Trees (Left Shore)
    const drawPalmTree = (px, py, scale) => {
      ctx.save();
      ctx.translate(px, py);
      ctx.scale(scale, scale);

      // Curved Trunk
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 14;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(30, -100, -10, -180);
      ctx.stroke();

      // Palm Leaves
      ctx.translate(-10, -180);
      ctx.fillStyle = '#15803d';
      ctx.strokeStyle = '#166534';
      ctx.lineWidth = 2;
      for (let a = 0; a < 7; a++) {
        const angle = a * (Math.PI * 2 / 7) + Math.sin(t) * 0.05;
        ctx.save();
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.ellipse(40, 0, 45, 12, 0.2, 0, Math.PI * 2);
        ctx.fill(); ctx.stroke();
        ctx.restore();
      }

      // Coconuts
      ctx.fillStyle = '#451a03';
      ctx.beginPath();
      ctx.arc(-5, 5, 8, 0, Math.PI * 2);
      ctx.arc(6, 4, 7, 0, Math.PI * 2);
      ctx.arc(0, -6, 7.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    drawPalmTree(140, height * 0.68, 1.1);
    drawPalmTree(260, height * 0.72, 0.9);

    // 6. Pirate Tavern ("Das Piraten-Nest")
    const tavX = width * 0.23;
    const tavY = height * 0.42;

    ctx.save();
    // Wooden Tavern Structure
    ctx.fillStyle = '#451a03'; // Dark timber planks
    ctx.fillRect(tavX, tavY, 260, 160);

    ctx.fillStyle = '#78350f'; // Lighter plank details
    for (let py = tavY + 20; py < tavY + 160; py += 25) {
      ctx.fillRect(tavX, py, 260, 2);
    }

    // Thatched Roof
    ctx.fillStyle = '#854d0e';
    ctx.beginPath();
    ctx.moveTo(tavX - 25, tavY);
    ctx.lineTo(tavX + 130, tavY - 65);
    ctx.lineTo(tavX + 285, tavY);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#a16207';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Tavern Door & Windows
    ctx.fillStyle = '#1c1917';
    ctx.fillRect(tavX + 105, tavY + 70, 50, 90); // Door
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(tavX + 30, tavY + 40, 40, 35); // Window Left
    ctx.fillRect(tavX + 190, tavY + 40, 40, 35); // Window Right

    // Swinging Pirate Tavern Wooden Sign with Skull
    const signX = tavX + 130;
    const signY = tavY - 15;
    const signSwing = Math.sin(t * 2.5) * 0.08;

    ctx.save();
    ctx.translate(signX, signY);
    ctx.rotate(signSwing);

    // Iron chain hooks
    ctx.strokeStyle = '#262626';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-20, 0); ctx.lineTo(-20, 18);
    ctx.moveTo(20, 0); ctx.lineTo(20, 18);
    ctx.stroke();

    // Wooden Oval Board
    ctx.fillStyle = '#78350f';
    ctx.strokeStyle = '#451a03';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(-45, 18, 90, 55, 8);
    ctx.fill(); ctx.stroke();

    // Skull & Crossbones Logo
    ctx.fillStyle = '#fef3c7';
    ctx.beginPath();
    ctx.arc(0, 40, 10, 0, Math.PI * 2); // Skull head
    ctx.fill();
    ctx.fillRect(-6, 46, 12, 6); // Skull jaw
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(-4, 38, 2.5, 0, Math.PI * 2); // Eye L
    ctx.arc(4, 38, 2.5, 0, Math.PI * 2); // Eye R
    ctx.fill();
    ctx.restore();

    // Warm Lantern Light
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 20;
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(tavX + 90, tavY + 75, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Rum Barrels & Iron Cannon outside Tavern
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.ellipse(tavX - 30, height * 0.65, 16, 22, 0, 0, Math.PI * 2);
    ctx.ellipse(tavX - 5, height * 0.66, 18, 24, 0, 0, Math.PI * 2);
    ctx.fill();

    // Iron Cannon
    ctx.fillStyle = '#1c1917';
    ctx.fillRect(tavX + 280, height * 0.64, 45, 14); // Cannon Barrel
    ctx.fillStyle = '#78350f';
    ctx.fillRect(tavX + 285, height * 0.67, 30, 12); // Carriage
    ctx.fillStyle = '#451a03';
    ctx.beginPath();
    ctx.arc(tavX + 295, height * 0.73, 10, 0, Math.PI * 2); // Wheels
    ctx.arc(tavX + 310, height * 0.73, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
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
    const isDead = chicken.state === 'shot' || chicken.state === 'falling';
    const type = chicken.type;
    const flap = Math.sin(animTime * 18 + (chicken.wingOffset || 0));

    // Tail feathers
    ctx.fillStyle = type === 'dove' ? '#94a3b8' : (type === 'owl' ? '#78350f' : '#78350f');
    ctx.beginPath();
    ctx.moveTo(18, -4);
    ctx.lineTo(38, -12);
    ctx.lineTo(32, 2);
    ctx.lineTo(40, 6);
    ctx.lineTo(18, 10);
    ctx.closePath();
    ctx.fill();

    // Body (Round/Oval chicken body)
    ctx.fillStyle = type === 'dove' ? '#e2e8f0' : (type === 'owl' ? '#a16207' : (type === 'golden' ? '#facc15' : '#b45309'));
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(2, 4, 22, 16, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Chest plumage (lighter color)
    ctx.fillStyle = type === 'dove' ? '#ffffff' : (type === 'owl' ? '#fde047' : (type === 'golden' ? '#fef08a' : '#f59e0b'));
    ctx.beginPath();
    ctx.ellipse(-8, 7, 12, 10, -0.2, 0, Math.PI * 2);
    ctx.fill();

    // Legs / Feet at bottom
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(4, 18);
    ctx.lineTo(14, 28);
    ctx.moveTo(-4, 18);
    ctx.lineTo(4, 28);
    ctx.stroke();

    // Chicken Head
    ctx.fillStyle = type === 'dove' ? '#f1f5f9' : (type === 'owl' ? '#a16207' : (type === 'golden' ? '#fde047' : '#92400e'));
    ctx.beginPath();
    ctx.arc(-18, -14, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Red comb on top of head (for Moorhuhn)
    if (type !== 'dove' && type !== 'owl') {
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.arc(-24, -26, 4.5, 0, Math.PI * 2);
      ctx.arc(-19, -29, 5.5, 0, Math.PI * 2);
      ctx.arc(-14, -26, 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Red wattle under beak
      ctx.beginPath();
      ctx.ellipse(-26, -4, 4, 7, 0.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Yellow Beak
    ctx.fillStyle = type === 'dove' ? '#f472b6' : '#f59e0b';
    ctx.beginPath();
    ctx.moveTo(-28, -16);
    ctx.lineTo(-44, -10);
    ctx.lineTo(-28, -6);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Big Googly Cartoon Eyes
    const eyeR = 6.5;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(-22, -18, eyeR, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(-13, -17, eyeR, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Pupils
    if (isDead) {
      // Dead X eyes
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(-25, -21); ctx.lineTo(-19, -15);
      ctx.moveTo(-19, -21); ctx.lineTo(-25, -15);
      ctx.moveTo(-16, -20); ctx.lineTo(-10, -14);
      ctx.moveTo(-10, -20); ctx.lineTo(-16, -14);
      ctx.stroke();
    } else {
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(-24, -18, 2.5, 0, Math.PI * 2);
      ctx.arc(-15, -17, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Eye shine
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(-25, -19, 1, 0, Math.PI * 2);
      ctx.arc(-16, -18, 1, 0, Math.PI * 2);
      ctx.fill();
    }

    // Flapping Wing
    ctx.save();
    ctx.translate(2, 2);
    ctx.rotate(flap * 0.45);
    ctx.fillStyle = type === 'dove' ? '#cbd5e1' : (type === 'owl' ? '#78350f' : (type === 'golden' ? '#eab308' : '#78350f'));
    ctx.beginPath();
    ctx.ellipse(0, -6, 18, 10, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
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

  _renderAlpineMeadow(ctx, width, height, t) {
    // 1. Alpine Daylight Sky Gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.55);
    skyGrad.addColorStop(0, '#38bdf8');
    skyGrad.addColorStop(0.5, '#7dd3fc');
    skyGrad.addColorStop(1, '#bae6fd');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // Sun & Sun Rays
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(1800, 140, 75, 0, Math.PI * 2);
    ctx.fill();

    // 2. Jagged Alpine Mountain Massifs with Snow Caps
    ctx.fillStyle = '#475569';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.5);
    ctx.lineTo(250, height * 0.25);
    ctx.lineTo(500, height * 0.45);
    ctx.lineTo(750, height * 0.18);
    ctx.lineTo(1100, height * 0.15); // Summit Cross peak
    ctx.lineTo(1450, height * 0.42);
    ctx.lineTo(1800, height * 0.22);
    ctx.lineTo(2150, height * 0.45);
    ctx.lineTo(width, height * 0.35);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Mountain Snow Caps
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.moveTo(700, height * 0.21);
    ctx.lineTo(750, height * 0.18);
    ctx.lineTo(800, height * 0.24);
    ctx.lineTo(760, height * 0.25);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(1030, height * 0.20);
    ctx.lineTo(1100, height * 0.15);
    ctx.lineTo(1170, height * 0.22);
    ctx.lineTo(1110, height * 0.24);
    ctx.closePath();
    ctx.fill();

    // Summit Cross on peak 1100
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(1100, height * 0.11);
    ctx.lineTo(1100, height * 0.16);
    ctx.moveTo(1090, height * 0.13);
    ctx.lineTo(1110, height * 0.13);
    ctx.stroke();

    // 3. Lush Green Alpine Rolling Meadow Hills
    ctx.fillStyle = '#16a34a';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.52);
    ctx.quadraticCurveTo(600, height * 0.45, 1200, height * 0.54);
    ctx.quadraticCurveTo(1800, height * 0.48, width, height * 0.55);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.62);
    ctx.quadraticCurveTo(800, height * 0.58, 1600, height * 0.65);
    ctx.quadraticCurveTo(2000, height * 0.60, width, height * 0.68);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // 4. Alpine Wooden Chalet (Holzhütte)
    const hx = 1750, hy = height * 0.45;
    ctx.fillStyle = '#78350f'; // Log cabin wood
    ctx.fillRect(hx, hy, 180, 110);

    ctx.fillStyle = '#451a03'; // Roof
    ctx.beginPath();
    ctx.moveTo(hx - 20, hy);
    ctx.lineTo(hx + 90, hy - 65);
    ctx.lineTo(hx + 200, hy);
    ctx.closePath();
    ctx.fill();

    // Chimney
    ctx.fillStyle = '#57534e';
    ctx.fillRect(hx + 140, hy - 75, 25, 45);

    // Window & Door
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(hx + 30, hy + 30, 35, 35);
    ctx.fillStyle = '#3f6212';
    ctx.fillRect(hx + 105, hy + 40, 35, 70);

    // 5. Grazing Cows on Meadow (Kuh)
    const drawCow = (cx, cy, scale = 1.0) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);

      // Body (White with Black Spots)
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(0, 0, 45, 28, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#1e293b'; // Black spots
      ctx.beginPath();
      ctx.arc(-15, -8, 12, 0, Math.PI * 2);
      ctx.arc(10, 5, 15, 0, Math.PI * 2);
      ctx.arc(20, -10, 8, 0, Math.PI * 2);
      ctx.fill();

      // Legs
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-30, 15, 8, 25);
      ctx.fillRect(-15, 15, 8, 25);
      ctx.fillRect(10, 15, 8, 25);
      ctx.fillRect(25, 15, 8, 25);

      // Head grazing down
      ctx.beginPath();
      ctx.arc(-42, 10, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fbcfe8'; // Snout
      ctx.beginPath();
      ctx.arc(-48, 14, 10, 0, Math.PI * 2);
      ctx.fill();

      // Cowbell
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(-35, 22, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    drawCow(720, height * 0.72, 1.2);
    drawCow(1350, height * 0.76, 0.95);
    drawCow(400, height * 0.82, 1.1);
  }

  _renderElvenKingdom(ctx, width, height, t) {
    // 1. Ethereal Dreamy Daylight Sky (Soft cyan-blue to glowing golden-rose)
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#38bdf8');
    sky.addColorStop(0.4, '#7dd3fc');
    sky.addColorStop(0.75, '#e0e7ff');
    sky.addColorStop(1, '#fef08a');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    // Ethereal Sun Rays
    ctx.fillStyle = 'rgba(255, 253, 231, 0.18)';
    ctx.beginPath();
    ctx.moveTo(width * 0.5, 0);
    ctx.lineTo(width * 0.1, height);
    ctx.lineTo(width * 0.3, height);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(width * 0.5, 0);
    ctx.lineTo(width * 0.6, height);
    ctx.lineTo(width * 0.8, height);
    ctx.closePath();
    ctx.fill();

    // 2. Distant Misty Mountain Peaks & Canopy Hills
    ctx.fillStyle = '#64748b';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.45);
    ctx.lineTo(350, height * 0.28);
    ctx.lineTo(700, height * 0.45);
    ctx.lineTo(1200, height * 0.25);
    ctx.lineTo(1700, height * 0.42);
    ctx.lineTo(2400, height * 0.3);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Midground Mystical Forest Canopy
    ctx.fillStyle = '#0d9488';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.52);
    ctx.quadraticCurveTo(600, height * 0.42, 1200, height * 0.50);
    ctx.quadraticCurveTo(1800, height * 0.40, width, height * 0.52);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // 3. Cascading Waterfalls & Crystal-Clear Lakes
    const drawWaterfall = (wx, wy, wWidth, wHeight) => {
      const grad = ctx.createLinearGradient(wx, wy, wx, wy + wHeight);
      grad.addColorStop(0, 'rgba(186, 230, 253, 0.9)');
      grad.addColorStop(0.5, 'rgba(56, 189, 248, 0.85)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0.95)');
      ctx.fillStyle = grad;
      ctx.fillRect(wx, wy, wWidth, wHeight);

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const offset = Math.sin(t * 8 + i * 2) * 3;
        ctx.moveTo(wx + 4 + i * (wWidth / 4) + offset, wy);
        ctx.lineTo(wx + 4 + i * (wWidth / 4) + offset, wy + wHeight);
      }
      ctx.stroke();
    };

    drawWaterfall(1080, height * 0.40, 50, height * 0.35);
    drawWaterfall(450, height * 0.48, 35, height * 0.28);
    drawWaterfall(1920, height * 0.42, 45, height * 0.33);

    // Crystal Clear Turquoise Lake (Lower Ground)
    const lakeGrad = ctx.createLinearGradient(0, height * 0.65, 0, height);
    lakeGrad.addColorStop(0, '#06b6d4');
    lakeGrad.addColorStop(0.5, '#0891b2');
    lakeGrad.addColorStop(1, '#0e7490');
    ctx.fillStyle = lakeGrad;
    ctx.fillRect(0, height * 0.68, width, height * 0.32);

    // Water Shimmer Ripples
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 2;
    for (let r = 0; r < 8; r++) {
      const rx = (r * 310 + t * 40) % width;
      const ry = height * 0.72 + (r % 4) * 45;
      ctx.beginPath();
      ctx.ellipse(rx, ry, 60, 8, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Foreground Mossy Grass Bank
    ctx.fillStyle = '#059669';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.82);
    ctx.quadraticCurveTo(500, height * 0.75, 1000, height * 0.84);
    ctx.quadraticCurveTo(1700, height * 0.76, width, height * 0.85);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // 4. Filigree Treetop Palaces (Baumkronen-Paläste)
    const px = 1750, py = height * 0.25;

    // Giant Tree Trunk Base
    ctx.fillStyle = '#451a03';
    ctx.beginPath();
    ctx.moveTo(px - 60, height);
    ctx.quadraticCurveTo(px - 80, height * 0.5, px - 30, py + 120);
    ctx.lineTo(px + 90, py + 120);
    ctx.quadraticCurveTo(px + 140, height * 0.5, px + 160, height);
    ctx.closePath();
    ctx.fill();

    // Filigree Palace Spires & Dome
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(px - 20, py, 60, 90);
    ctx.fillRect(px + 50, py + 20, 40, 70);

    // Spires (Cone roofs)
    ctx.fillStyle = '#a855f7';
    ctx.beginPath();
    ctx.moveTo(px - 30, py);
    ctx.lineTo(px + 10, py - 60);
    ctx.lineTo(px + 50, py);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(px + 45, py + 20);
    ctx.lineTo(px + 70, py - 35);
    ctx.lineTo(px + 95, py + 20);
    ctx.closePath();
    ctx.fill();

    // Golden Crystal Crown on Top Spire
    const crownGlow = (Math.sin(t * 4) + 1) * 0.5;
    ctx.fillStyle = `rgba(255, 215, 0, ${0.8 + crownGlow * 0.2})`;
    ctx.beginPath();
    ctx.arc(px + 10, py - 65, 12, 0, Math.PI * 2);
    ctx.fill();

    // 5. Giant Glowing Bioluminescent Flowers (Riesige leuchtende Blumen)
    const drawGiantFlower = (fx, fy, flowerScale, colorCenter, colorPetals) => {
      ctx.save();
      ctx.translate(fx, fy);
      ctx.scale(flowerScale, flowerScale);

      const pulse = (Math.sin(t * 3 + fx) + 1) * 0.5;

      ctx.fillStyle = `rgba(244, 114, 182, ${0.25 + pulse * 0.25})`;
      ctx.beginPath();
      ctx.arc(0, 0, 75, 0, Math.PI * 2);
      ctx.fill();

      const petalCount = 8;
      ctx.fillStyle = colorPetals;
      for (let i = 0; i < petalCount; i++) {
        const angle = (i * Math.PI * 2) / petalCount;
        ctx.save();
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.ellipse(0, -35, 16, 32, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      ctx.fillStyle = colorCenter;
      ctx.beginPath();
      ctx.arc(0, 0, 18 + pulse * 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    drawGiantFlower(400, height * 0.78, 1.4, '#fde047', '#f472b6');
    drawGiantFlower(1400, height * 0.80, 1.2, '#67e8f9', '#a855f7');
    drawGiantFlower(850, height * 0.82, 1.0, '#fef08a', '#38bdf8');
  }

  _renderWildWest(ctx, width, height, t) {
    // 1. High-Noon Dusty Desert Sky (Bright azure to pale yellow-orange sun glare)
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#0284c7');
    sky.addColorStop(0.5, '#7dd3fc');
    sky.addColorStop(0.85, '#fde047');
    sky.addColorStop(1, '#fed7aa');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    // Blazing High-Noon Sun
    const sunGrad = ctx.createRadialGradient(width * 0.5, height * 0.15, 10, width * 0.5, height * 0.15, 120);
    sunGrad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    sunGrad.addColorStop(0.3, 'rgba(254, 240, 138, 0.8)');
    sunGrad.addColorStop(1, 'rgba(254, 240, 138, 0.0)');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(width * 0.5, height * 0.15, 120, 0, Math.PI * 2);
    ctx.fill();

    // 2. Red Rock Canyons & Mesa Plateaus in Background
    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.48);
    ctx.lineTo(200, height * 0.48);
    ctx.lineTo(250, height * 0.32);
    ctx.lineTo(550, height * 0.32);
    ctx.lineTo(600, height * 0.48);
    ctx.lineTo(1100, height * 0.48);
    ctx.lineTo(1150, height * 0.28);
    ctx.lineTo(1500, height * 0.28);
    ctx.lineTo(1560, height * 0.48);
    ctx.lineTo(2000, height * 0.48);
    ctx.lineTo(2050, height * 0.35);
    ctx.lineTo(2350, height * 0.35);
    ctx.lineTo(width, height * 0.48);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // 3. Sandy Dusty Ground & Main Street
    const groundGrad = ctx.createLinearGradient(0, height * 0.55, 0, height);
    groundGrad.addColorStop(0, '#d97706');
    groundGrad.addColorStop(0.5, '#f59e0b');
    groundGrad.addColorStop(1, '#b45309');
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, height * 0.55, width, height * 0.45);

    // 4. Wild West Wooden Saloon & Sheriff Buildings
    const sx = 550, sy = height * 0.38;
    ctx.fillStyle = '#78350f';
    ctx.fillRect(sx, sy, 240, 160);

    ctx.fillStyle = '#451a03';
    ctx.fillRect(sx - 15, sy - 40, 270, 45);
    ctx.fillStyle = '#fef08a';
    ctx.font = '900 24px "Outfit", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('SALOON', sx + 120, sy - 10);

    ctx.fillStyle = '#92400e';
    ctx.fillRect(sx + 80, sy + 70, 38, 55);
    ctx.fillRect(sx + 122, sy + 70, 38, 55);

    const shx = 1400, shy = height * 0.35;
    ctx.fillStyle = '#9a3412';
    ctx.fillRect(shx, shy, 200, 180);

    ctx.fillStyle = '#451a03';
    ctx.fillRect(shx - 10, shy - 35, 220, 40);
    ctx.fillStyle = '#fde047';
    ctx.font = '900 20px "Outfit", Arial, sans-serif';
    ctx.fillText('SHERIFF', shx + 100, shy - 8);

    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(shx + 100, shy + 45, 18, 0, Math.PI * 2);
    ctx.fill();

    // 5. Giant Saguaro Cacti
    const drawCactus = (cx, cy, cScale) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(cScale, cScale);

      ctx.fillStyle = '#15803d';
      ctx.fillRect(-12, -100, 24, 100);

      ctx.fillRect(-40, -65, 30, 14);
      ctx.fillRect(-40, -85, 14, 30);

      ctx.fillRect(10, -50, 30, 14);
      ctx.fillRect(26, -75, 14, 35);

      ctx.restore();
    };

    drawCactus(180, height * 0.72, 1.4);
    drawCactus(1150, height * 0.68, 1.1);
    drawCactus(2200, height * 0.75, 1.3);
  }

  _renderMarsColony(ctx, width, height, t) {
    // 1. Dark Starry Space Sky & Atmospheric Haze
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#020617');
    sky.addColorStop(0.4, '#0f172a');
    sky.addColorStop(0.8, '#450a0a');
    sky.addColorStop(1, '#7f1d1d');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    // Stars in Cosmic Background
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 40; i++) {
      const sx = (i * 137) % width;
      const sy = (i * 83) % (height * 0.45);
      const sSize = (i % 3) * 0.8 + 1.0;
      ctx.beginPath();
      ctx.arc(sx, sy, sSize, 0, Math.PI * 2);
      ctx.fill();
    }

    // Distant Planet Earth in Space Sky
    const ex = 1750, ey = height * 0.18, eRadius = 60;
    const earthGrad = ctx.createRadialGradient(ex - 15, ey - 15, 10, ex, ey, eRadius);
    earthGrad.addColorStop(0, '#60a5fa');
    earthGrad.addColorStop(0.5, '#2563eb');
    earthGrad.addColorStop(0.8, '#1e3a8a');
    earthGrad.addColorStop(1, '#020617');
    ctx.fillStyle = earthGrad;
    ctx.beginPath();
    ctx.arc(ex, ey, eRadius, 0, Math.PI * 2);
    ctx.fill();

    // Earth Atmosphere Glow Ring
    ctx.strokeStyle = 'rgba(96, 165, 250, 0.5)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(ex, ey, eRadius + 2, 0, Math.PI * 2);
    ctx.stroke();

    // 2. Martian Red Canyons & Crater Ridge Background
    ctx.fillStyle = '#991b1b';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.50);
    ctx.lineTo(300, height * 0.35);
    ctx.lineTo(650, height * 0.48);
    ctx.lineTo(1000, height * 0.32);
    ctx.lineTo(1450, height * 0.46);
    ctx.lineTo(1850, height * 0.30);
    ctx.lineTo(width, height * 0.45);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Red Dust Ground
    const groundGrad = ctx.createLinearGradient(0, height * 0.58, 0, height);
    groundGrad.addColorStop(0, '#b91c1c');
    groundGrad.addColorStop(0.5, '#7f1d1d');
    groundGrad.addColorStop(1, '#450a0a');
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, height * 0.58, width, height * 0.42);

    // 3. Glass Dome Habitats
    const drawGlassDome = (dx, dy, dRadius) => {
      ctx.save();
      const pulse = (Math.sin(t * 3 + dx) + 1) * 0.5;

      const intGrad = ctx.createRadialGradient(dx, dy, 5, dx, dy, dRadius);
      intGrad.addColorStop(0, `rgba(56, 189, 248, ${0.7 + pulse * 0.25})`);
      intGrad.addColorStop(0.7, 'rgba(14, 165, 233, 0.4)');
      intGrad.addColorStop(1, 'rgba(2, 132, 199, 0.0)');
      ctx.fillStyle = intGrad;
      ctx.beginPath();
      ctx.arc(dx, dy, dRadius, Math.PI, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(dx, dy, dRadius, Math.PI, Math.PI * 2);
      ctx.stroke();

      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(dx, dy, dRadius * 0.65, Math.PI, Math.PI * 2);
      ctx.arc(dx, dy, dRadius * 0.35, Math.PI, Math.PI * 2);
      ctx.moveTo(dx - dRadius, dy);
      ctx.lineTo(dx + dRadius, dy);
      ctx.stroke();

      ctx.restore();
    };

    drawGlassDome(650, height * 0.58, 120);
    drawGlassDome(1100, height * 0.60, 85);
    drawGlassDome(400, height * 0.62, 70);

    // 4. Solar Panel Arrays
    const px = 1850, py = height * 0.60;
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(px, py, 180, 75);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    for (let c = 0; c < 5; c++) {
      ctx.strokeRect(px + c * 36, py, 36, 75);
    }

    // 5. Futuristic Mars Rover
    const rx = 1350, ry = height * 0.68;
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(rx, ry, 110, 45);

    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(rx + 15, ry + 48, 16, 0, Math.PI * 2);
    ctx.arc(rx + 55, ry + 48, 16, 0, Math.PI * 2);
    ctx.arc(rx + 95, ry + 48, 16, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(rx + 30, ry);
    ctx.lineTo(rx + 30, ry - 30);
    ctx.arc(rx + 30, ry - 35, 14, Math.PI * 0.2, Math.PI * 1.8);
    ctx.stroke();
  }

  _renderCandyPlanet(ctx, width, height, t) {
    // 1. Whimsical Pastel Sky (Pink, Lavender, Golden Sunset)
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#f472b6');
    sky.addColorStop(0.4, '#fbcfe8');
    sky.addColorStop(0.75, '#fed7aa');
    sky.addColorStop(1, '#fef08a');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    // Fluffy Cotton Candy Clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.beginPath();
    ctx.arc(300, 100, 50, 0, Math.PI * 2);
    ctx.arc(360, 90, 65, 0, Math.PI * 2);
    ctx.arc(430, 105, 45, 0, Math.PI * 2);
    ctx.arc(1400, 120, 55, 0, Math.PI * 2);
    ctx.arc(1470, 100, 70, 0, Math.PI * 2);
    ctx.fill();

    // 2. Rolling Chocolate Brown Hills
    ctx.fillStyle = '#512a10';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.48);
    ctx.quadraticCurveTo(500, height * 0.35, 1000, height * 0.46);
    ctx.quadraticCurveTo(1600, height * 0.38, width, height * 0.50);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Frosting Icing Caps on Hills
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(500, height * 0.36, 140, 25, 0, 0, Math.PI * 2);
    ctx.ellipse(1600, height * 0.39, 160, 30, 0, 0, Math.PI * 2);
    ctx.fill();

    // 3. Pink Lemonade River
    const riverGrad = ctx.createLinearGradient(0, height * 0.65, 0, height);
    riverGrad.addColorStop(0, '#fb7185');
    riverGrad.addColorStop(0.5, '#f43f5e');
    riverGrad.addColorStop(1, '#e11d48');
    ctx.fillStyle = riverGrad;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.70);
    ctx.quadraticCurveTo(600, height * 0.62, 1200, height * 0.75);
    ctx.quadraticCurveTo(1800, height * 0.65, width, height * 0.72);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // 4. Gingerbread House
    const gx = 650, gy = height * 0.45;
    ctx.fillStyle = '#78350f';
    ctx.fillRect(gx, gy, 180, 120);

    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.moveTo(gx - 20, gy);
    ctx.lineTo(gx + 90, gy - 65);
    ctx.lineTo(gx + 200, gy);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(gx + 45, gy + 40, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.arc(gx + 135, gy + 40, 16, 0, Math.PI * 2);
    ctx.fill();

    // 5. Giant Candy Canes
    const drawCandyCane = (cx, cy, cScale) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(cScale, cScale);

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 22;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -120);
      ctx.arc(-25, -120, 25, 0, Math.PI, true);
      ctx.stroke();

      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 22;
      ctx.setLineDash([15, 15]);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -120);
      ctx.arc(-25, -120, 25, 0, Math.PI, true);
      ctx.stroke();

      ctx.restore();
    };

    drawCandyCane(1450, height * 0.68, 1.2);
    drawCandyCane(1850, height * 0.70, 1.0);
    drawCandyCane(250, height * 0.72, 1.3);
  }

  _renderNightFair(ctx, width, height, t) {
    // 1. Deep Night Sky (Dark Indigo / Blue-Purple Gradient)
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#090d16');
    sky.addColorStop(0.5, '#0f172a');
    sky.addColorStop(0.85, '#1e1b4b');
    sky.addColorStop(1, '#312e81');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    // Crescent Moon & Night Stars
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(1800, 100, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(1790, 95, 26, 0, Math.PI * 2);
    ctx.fill();

    // 2. Hanging String Lights Across the Carnival Sky
    ctx.strokeStyle = 'rgba(254, 240, 138, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 80);
    ctx.quadraticCurveTo(600, 150, 1200, 90);
    ctx.quadraticCurveTo(1800, 160, width, 100);
    ctx.stroke();

    for (let l = 0; l < 24; l++) {
      const lx = (l * 100) % width;
      const ly = 100 + Math.sin(l * 0.8) * 35;
      const lColor = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'][l % 5];
      ctx.fillStyle = lColor;
      ctx.shadowColor = lColor;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(lx, ly, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // 3. Ground Fairground Pavement
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, height * 0.62, width, height * 0.38);

    // 4. Illuminated Giant Ferris Wheel
    const fx = 500, fy = height * 0.42, fRadius = 130;

    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(fx - 70, height * 0.65);
    ctx.lineTo(fx, fy);
    ctx.lineTo(fx + 70, height * 0.65);
    ctx.stroke();

    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(fx, fy, fRadius, 0, Math.PI * 2);
    ctx.stroke();

    const spokeCount = 12;
    const rot = t * 0.5;
    for (let s = 0; s < spokeCount; s++) {
      const angle = rot + (s * Math.PI * 2) / spokeCount;
      const gx = fx + Math.cos(angle) * fRadius;
      const gy = fy + Math.sin(angle) * fRadius;

      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(fx, fy);
      ctx.lineTo(gx, gy);
      ctx.stroke();

      ctx.fillStyle = s % 2 === 0 ? '#facc15' : '#a855f7';
      ctx.fillRect(gx - 12, gy - 8, 24, 16);
    }

    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(fx, fy, 16, 0, Math.PI * 2);
    ctx.fill();

    // 5. Popcorn Stand
    const px = 1250, py = height * 0.52;
    ctx.fillStyle = '#b91c1c';
    ctx.fillRect(px, py, 160, 90);

    ctx.fillStyle = '#fef08a';
    ctx.fillRect(px - 10, py - 30, 180, 35);
    ctx.fillStyle = '#7f1d1d';
    ctx.font = '900 18px "Outfit", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('POPCORN', px + 80, py - 8);

    ctx.fillStyle = 'rgba(254, 240, 138, 0.4)';
    ctx.fillRect(px + 20, py + 15, 120, 60);

    // 6. Roller Coaster Track Silhouette
    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(1500, height * 0.65);
    ctx.bezierCurveTo(1650, height * 0.20, 1800, height * 0.60, 1950, height * 0.35);
    ctx.lineTo(width, height * 0.55);
    ctx.stroke();
  }

  _renderRiverbank(ctx, width, height, t) {
    // 1. High-Noon Sunny Blue Sky
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#38bdf8');
    sky.addColorStop(0.5, '#7dd3fc');
    sky.addColorStop(1, '#bae6fd');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    // Fluffy Summer Clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.beginPath();
    ctx.arc(400, 90, 40, 0, Math.PI * 2);
    ctx.arc(450, 80, 55, 0, Math.PI * 2);
    ctx.arc(510, 95, 40, 0, Math.PI * 2);
    ctx.arc(1600, 110, 45, 0, Math.PI * 2);
    ctx.arc(1660, 100, 60, 0, Math.PI * 2);
    ctx.fill();

    // 2. Rolling Green Hills & Countryside
    ctx.fillStyle = '#16a34a';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.45);
    ctx.quadraticCurveTo(600, height * 0.38, 1200, height * 0.46);
    ctx.quadraticCurveTo(1800, height * 0.40, width, height * 0.48);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // 3. Meandering Blue River
    const riverGrad = ctx.createLinearGradient(0, height * 0.52, 0, height);
    riverGrad.addColorStop(0, '#0284c7');
    riverGrad.addColorStop(0.5, '#38bdf8');
    riverGrad.addColorStop(1, '#0369a1');
    ctx.fillStyle = riverGrad;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.62);
    ctx.bezierCurveTo(400, height * 0.50, 800, height * 0.75, 1400, height * 0.58);
    ctx.bezierCurveTo(1800, height * 0.48, 2100, height * 0.68, width, height * 0.65);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Foreground Lush Grass Bank
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.76);
    ctx.quadraticCurveTo(500, height * 0.70, 1000, height * 0.82);
    ctx.quadraticCurveTo(1700, height * 0.74, width, height * 0.82);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // 4. Old Stone Arch Bridge
    const bx = 1200, by = height * 0.42;
    ctx.fillStyle = '#78716c';
    ctx.fillRect(bx - 120, by, 240, 50);

    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.arc(bx - 60, by + 50, 35, Math.PI, 0);
    ctx.arc(bx + 60, by + 50, 35, Math.PI, 0);
    ctx.fill();

    ctx.strokeStyle = '#44403c';
    ctx.lineWidth = 3;
    ctx.strokeRect(bx - 120, by, 240, 50);

    // 5. Grazing White Fluffy Sheep
    const drawSheep = (sx, sy, scale = 1.0) => {
      ctx.save();
      ctx.translate(sx, sy);
      ctx.scale(scale, scale);

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, 22, 0, Math.PI * 2);
      ctx.arc(-10, -5, 16, 0, Math.PI * 2);
      ctx.arc(10, -5, 16, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(-24, 6, 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillRect(-12, 16, 5, 14);
      ctx.fillRect(-2, 16, 5, 14);
      ctx.fillRect(8, 16, 5, 14);

      ctx.restore();
    };

    drawSheep(650, height * 0.72, 1.2);
    drawSheep(480, height * 0.76, 1.0);
    drawSheep(1650, height * 0.75, 1.1);
    drawSheep(1820, height * 0.78, 0.9);
  }

  _renderFloatingIslands(ctx, width, height, t) {
    // 1. Warm Sunny Tropical Sky (Bright Blue Gradient)
    const sky = ctx.createLinearGradient(0, 0, 0, height * 0.65);
    sky.addColorStop(0, '#0284c7');
    sky.addColorStop(0.5, '#38bdf8');
    sky.addColorStop(1, '#bae6fd');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height * 0.65);

    // Giant Gas Planet in Upper Left Sky (Matching reference photo)
    ctx.save();
    ctx.fillStyle = 'rgba(186, 230, 253, 0.4)';
    ctx.beginPath();
    ctx.arc(450, 180, 220, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.restore();

    // 2. Crystal Clear Turquoise Tropical Lagoon (Lower third)
    const lagoonGradient = ctx.createLinearGradient(0, height * 0.62, 0, height);
    lagoonGradient.addColorStop(0, '#06b6d4');
    lagoonGradient.addColorStop(0.5, '#0891b2');
    lagoonGradient.addColorStop(1, '#0e7490');
    ctx.fillStyle = lagoonGradient;
    ctx.fillRect(0, height * 0.62, width, height * 0.38);

    // Lagoon Water Ripples
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 2;
    for (let r = 0; r < 12; r++) {
      const rx = (r * 180 + t * 40) % width;
      const ry = height * 0.66 + (r * 25) % (height * 0.3);
      ctx.beginPath();
      ctx.moveTo(rx, ry);
      ctx.lineTo(rx + 80, ry);
      ctx.stroke();
    }

    // 3. Background Amphitheater Rock Arc
    ctx.fillStyle = '#475569';
    ctx.beginPath();
    ctx.moveTo(100, height * 0.65);
    ctx.quadraticCurveTo(width / 2, height * 0.25, width - 100, height * 0.65);
    ctx.lineTo(width, height * 0.65);
    ctx.lineTo(0, height * 0.65);
    ctx.fill();

    // 4. Heavy Iron Chains & Cable Car Wire
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 5;
    ctx.setLineDash([10, 6]);
    ctx.beginPath();
    ctx.moveTo(250, height * 0.45);
    ctx.quadraticCurveTo(width / 2, height * 0.55, width - 250, height * 0.40);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(200, height * 0.35);
    ctx.lineTo(width - 200, height * 0.30);
    ctx.stroke();

    // Moving Steampunk Gondola
    const gondolaX = 300 + ((t * 70) % (width - 600));
    const gondolaY = height * 0.35 - (gondolaX - 200) * (0.05 / (width - 400));
    ctx.fillStyle = '#b45309';
    ctx.fillRect(gondolaX - 22, gondolaY + 10, 44, 28);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.strokeRect(gondolaX - 22, gondolaY + 10, 44, 28);
    ctx.beginPath();
    ctx.moveTo(gondolaX, gondolaY);
    ctx.lineTo(gondolaX, gondolaY + 10);
    ctx.stroke();

    // 5. Horizontal Slab Floating Islands (Matching reference photo layout)
    const drawFloatingSlab = (ix, iy, iWidth, iHeight, hasWaterfall = false) => {
      ctx.save();

      // Rock Slab Body
      ctx.fillStyle = '#475569';
      ctx.beginPath();
      ctx.moveTo(ix, iy);
      ctx.lineTo(ix + iWidth, iy);
      ctx.lineTo(ix + iWidth * 0.85, iy + iHeight);
      ctx.lineTo(ix + iWidth * 0.15, iy + iHeight);
      ctx.closePath();
      ctx.fill();

      // Bright Friendly Green Grass Top
      ctx.fillStyle = '#16a34a';
      ctx.fillRect(ix - 10, iy - 14, iWidth + 20, 16);
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(ix - 5, iy - 20, iWidth + 10, 10);

      // Waterfall falling into Lagoon
      if (hasWaterfall) {
        const wfX = ix + iWidth * 0.5;
        const wfHeight = height * 0.65 - iy;
        const wfGradient = ctx.createLinearGradient(0, iy, 0, iy + wfHeight);
        wfGradient.addColorStop(0, '#e0f2fe');
        wfGradient.addColorStop(0.8, '#67e8f9');
        wfGradient.addColorStop(1, 'rgba(103, 232, 249, 0.2)');

        ctx.fillStyle = wfGradient;
        ctx.fillRect(wfX - 12, iy + 2, 24, wfHeight);

        // Splash at Lagoon Surface
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.beginPath();
        ctx.arc(wfX, iy + wfHeight, 25, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    drawFloatingSlab(180, height * 0.46, 320, 90, true);
    drawFloatingSlab(850, height * 0.40, 420, 110, true);
    drawFloatingSlab(1550, height * 0.38, 300, 85, false);

    // 6. Steampunk Windmill on Center Slab
    const wx = 1000, wy = height * 0.26;
    ctx.fillStyle = '#b45309';
    ctx.fillRect(wx - 20, wy, 40, 85);

    const rot = t * 1.5;
    ctx.save();
    ctx.translate(wx, wy);
    ctx.rotate(rot);
    ctx.fillStyle = '#f59e0b';
    for (let b = 0; b < 4; b++) {
      ctx.rotate(Math.PI / 2);
      ctx.fillRect(-5, -75, 10, 70);
    }
    ctx.restore();
  }

  _renderJunkyard(ctx, width, height, t) {
    ctx.save();

    // 1. Midday Bright Sun Sky Gradient (Mittagssonnenlicht)
    const skyGradient = ctx.createLinearGradient(0, 0, 0, height * 0.65);
    skyGradient.addColorStop(0, '#38bdf8');   // Crisp sky blue
    skyGradient.addColorStop(0.5, '#7dd3fc'); // Light sky blue
    skyGradient.addColorStop(0.85, '#fef08a'); // Warm sun haze near horizon
    skyGradient.addColorStop(1, '#fed7aa');   // Dusty horizon glow
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, width, height * 0.65);

    // Midday Sun
    const sunX = width * 0.75;
    const sunY = height * 0.15;
    ctx.fillStyle = 'rgba(254, 240, 138, 0.3)';
    ctx.beginPath();
    ctx.arc(sunX, sunY, 90, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(sunX, sunY, 45, 0, Math.PI * 2);
    ctx.fill();

    // Soft clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    const drawCloud = (cx, cy, s) => {
      ctx.beginPath();
      ctx.arc(cx, cy, 30 * s, 0, Math.PI * 2);
      ctx.arc(cx + 25 * s, cy - 10 * s, 35 * s, 0, Math.PI * 2);
      ctx.arc(cx + 60 * s, cy, 28 * s, 0, Math.PI * 2);
      ctx.fill();
    };
    drawCloud(((150 + t * 15) % (width + 300)) - 100, height * 0.12, 1.2);
    drawCloud(((800 + t * 20) % (width + 300)) - 100, height * 0.18, 0.9);
    drawCloud(((1500 + t * 12) % (width + 300)) - 100, height * 0.08, 1.4);

    // 2. Industrial Horizon Silhouettes
    ctx.fillStyle = '#64748b';
    ctx.fillRect(100, height * 0.42, 180, height * 0.23);
    ctx.fillRect(250, height * 0.38, 90, height * 0.27);
    ctx.fillRect(130, height * 0.30, 22, height * 0.12);
    ctx.fillRect(170, height * 0.26, 18, height * 0.16);

    ctx.fillStyle = 'rgba(226, 232, 240, 0.4)';
    ctx.beginPath();
    ctx.arc(141 + Math.sin(t * 2) * 8, height * 0.28 - (t * 30) % 60, 20 + ((t * 10) % 30), 0, Math.PI * 2);
    ctx.arc(179 + Math.cos(t * 2) * 8, height * 0.24 - (t * 35) % 70, 25 + ((t * 12) % 35), 0, Math.PI * 2);
    ctx.fill();

    // Silos & Power Pylons
    ctx.fillStyle = '#475569';
    ctx.beginPath();
    ctx.arc(1300, height * 0.40, 50, Math.PI, 0);
    ctx.rect(1250, height * 0.40, 100, height * 0.25);
    ctx.fill();

    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 3;
    const drawPylon = (px, py, ph) => {
      ctx.beginPath();
      ctx.moveTo(px - 25, py + ph);
      ctx.lineTo(px, py);
      ctx.lineTo(px + 25, py + ph);
      ctx.moveTo(px - 35, py + ph * 0.3);
      ctx.lineTo(px + 35, py + ph * 0.3);
      ctx.moveTo(px - 25, py + ph * 0.6);
      ctx.lineTo(px + 25, py + ph * 0.6);
      ctx.stroke();
    };
    drawPylon(1750, height * 0.32, 140);
    drawPylon(2100, height * 0.36, 110);

    // 3. Ground Soil Base
    const groundGradient = ctx.createLinearGradient(0, height * 0.60, 0, height);
    groundGradient.addColorStop(0, '#78350f');
    groundGradient.addColorStop(0.4, '#451a03');
    groundGradient.addColorStop(1, '#1c1917');
    ctx.fillStyle = groundGradient;
    ctx.fillRect(0, height * 0.60, width, height * 0.40);

    // 4. Large Industrial Crane (Industriekran)
    const craneBaseX = 450;
    const craneBaseY = height * 0.65;
    const craneHeight = height * 0.48;
    const craneTopY = craneBaseY - craneHeight;

    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(craneBaseX - 30, craneBaseY);
    ctx.lineTo(craneBaseX - 15, craneTopY);
    ctx.lineTo(craneBaseX + 15, craneTopY);
    ctx.lineTo(craneBaseX + 30, craneBaseY);
    ctx.stroke();

    ctx.lineWidth = 2.5;
    for (let iy = 0; iy < 6; iy++) {
      const y1 = craneBaseY - (iy * craneHeight / 6);
      const y2 = craneBaseY - ((iy + 1) * craneHeight / 6);
      ctx.beginPath();
      ctx.moveTo(craneBaseX - 25 + iy * 2, y1);
      ctx.lineTo(craneBaseX + 25 - (iy + 1) * 2, y2);
      ctx.moveTo(craneBaseX + 25 - iy * 2, y1);
      ctx.lineTo(craneBaseX - 25 + (iy + 1) * 2, y2);
      ctx.stroke();
    }

    ctx.lineWidth = 7;
    ctx.strokeStyle = '#ca8a04';
    ctx.beginPath();
    ctx.moveTo(craneBaseX - 120, craneTopY + 10);
    ctx.lineTo(craneBaseX + 320, craneTopY + 10);
    ctx.stroke();

    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(craneBaseX, craneTopY - 35);
    ctx.lineTo(craneBaseX - 110, craneTopY + 10);
    ctx.moveTo(craneBaseX, craneTopY - 35);
    ctx.lineTo(craneBaseX + 150, craneTopY + 10);
    ctx.moveTo(craneBaseX, craneTopY - 35);
    ctx.lineTo(craneBaseX + 300, craneTopY + 10);
    ctx.stroke();

    const magnetX = craneBaseX + 200 + Math.sin(t * 1.5) * 25;
    const magnetY = craneTopY + 160 + Math.cos(t * 1.5) * 6;

    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(magnetX, craneTopY + 10);
    ctx.lineTo(magnetX, magnetY);
    ctx.stroke();

    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.ellipse(magnetX, magnetY, 35, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#eab308';
    ctx.fillRect(magnetX - 20, magnetY - 14, 40, 8);

    // Crushed car held by magnet
    ctx.save();
    ctx.translate(magnetX, magnetY + 28);
    ctx.rotate(Math.sin(t * 1.5) * 0.08);

    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.moveTo(-50, 10);
    ctx.lineTo(-40, -15);
    ctx.lineTo(10, -25);
    ctx.lineTo(45, -5);
    ctx.lineTo(55, 15);
    ctx.lineTo(-50, 15);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(-25, -12, 22, 10);
    ctx.fillRect(2, -18, 24, 12);

    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.arc(-30, 15, 12, 0, Math.PI * 2);
    ctx.arc(32, 15, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 5. Scrap Mountain Heap
    ctx.fillStyle = '#475569';
    ctx.beginPath();
    ctx.moveTo(600, height * 0.65);
    ctx.lineTo(950, height * 0.38);
    ctx.lineTo(1400, height * 0.45);
    ctx.lineTo(1850, height * 0.36);
    ctx.lineTo(2250, height * 0.65);
    ctx.closePath();
    ctx.fill();

    const scrapGradient = ctx.createLinearGradient(0, height * 0.45, 0, height * 0.85);
    scrapGradient.addColorStop(0, '#64748b');
    scrapGradient.addColorStop(0.5, '#475569');
    scrapGradient.addColorStop(1, '#334155');
    ctx.fillStyle = scrapGradient;

    ctx.beginPath();
    ctx.moveTo(700, height * 0.68);
    ctx.quadraticCurveTo(1100, height * 0.35, 1500, height * 0.52);
    ctx.quadraticCurveTo(1800, height * 0.40, 2200, height * 0.70);
    ctx.lineTo(width + 100, height);
    ctx.lineTo(600, height);
    ctx.closePath();
    ctx.fill();

    const drawCrushedCar = (cx, cy, color, angle = 0, scale = 1) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.scale(scale, scale);

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.rect(-45, -15, 90, 30);
      ctx.fill();

      ctx.fillStyle = '#9a3412';
      ctx.fillRect(-30, -10, 20, 15);
      ctx.fillRect(10, -5, 25, 18);

      ctx.fillStyle = '#0284c7';
      ctx.fillRect(-20, -12, 18, 8);
      ctx.fillRect(5, -12, 20, 8);

      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(-25, 12, 10, 0, Math.PI * 2);
      ctx.arc(25, 12, 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    drawCrushedCar(900, height * 0.54, '#0284c7', -0.25, 1.1);
    drawCrushedCar(1150, height * 0.48, '#eab308', 0.35, 1.0);
    drawCrushedCar(1420, height * 0.56, '#15803d', -0.15, 1.2);
    drawCrushedCar(1700, height * 0.50, '#991b1b', 0.40, 1.0);
    drawCrushedCar(2000, height * 0.62, '#64748b', -0.30, 1.3);

    const drawWashingMachine = (wx, wy, angle = 0, scale = 1) => {
      ctx.save();
      ctx.translate(wx, wy);
      ctx.rotate(angle);
      ctx.scale(scale, scale);

      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(-22, -26, 44, 52);
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 2;
      ctx.strokeRect(-22, -26, 44, 52);

      ctx.fillStyle = '#c2410c';
      ctx.fillRect(-18, -20, 12, 8);
      ctx.fillRect(10, 12, 10, 10);

      ctx.fillStyle = '#64748b';
      ctx.fillRect(-18, -22, 36, 8);
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(10, -18, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.arc(0, 4, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.restore();
    };

    drawWashingMachine(1020, height * 0.52, 0.2, 1.1);
    drawWashingMachine(1300, height * 0.59, -0.35, 1.2);
    drawWashingMachine(1950, height * 0.72, 0.1, 1.3);

    const drawTireStack = (tx, ty, count) => {
      for (let i = 0; i < count; i++) {
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.ellipse(tx, ty - i * 16, 28, 12, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.ellipse(tx, ty - i * 16, 14, 6, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    drawTireStack(820, height * 0.68, 4);
    drawTireStack(1600, height * 0.66, 5);

    // 6. Smoking Barrels (Rauchende Fässer)
    const drawSmokingBarrel = (bx, by, color = '#ea580c') => {
      ctx.save();
      ctx.fillStyle = color;
      ctx.fillRect(bx - 20, by - 40, 40, 50);

      ctx.fillStyle = '#1e293b';
      ctx.fillRect(bx - 20, by - 26, 40, 6);
      ctx.fillRect(bx - 20, by - 12, 40, 6);

      ctx.strokeStyle = '#7c2d12';
      ctx.lineWidth = 2;
      ctx.strokeRect(bx - 20, by - 40, 40, 50);

      ctx.fillStyle = '#451a03';
      ctx.beginPath();
      ctx.ellipse(bx, by - 40, 20, 7, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(71, 85, 105, 0.45)';
      for (let s = 0; s < 4; s++) {
        const smY = by - 50 - s * 22 - ((t * 40) % 25);
        const smX = bx + Math.sin(t * 3 + s) * (10 + s * 4);
        const smRadius = 12 + s * 8;
        ctx.beginPath();
        ctx.arc(smX, smY, smRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    drawSmokingBarrel(680, height * 0.72, '#dc2626');
    drawSmokingBarrel(1250, height * 0.68, '#ea580c');
    drawSmokingBarrel(1800, height * 0.74, '#ca8a04');

    // 7. Foreground Details
    ctx.fillStyle = '#334155';
    ctx.fillRect(200, height * 0.82, 180, 14);
    ctx.fillRect(1100, height * 0.86, 220, 18);

    ctx.restore();
  }

  _renderAutumnOrchard(ctx, width, height, t) {
    ctx.save();

    // 1. Midday Autumn Sky & Sun (Mittagssonne)
    const skyGradient = ctx.createLinearGradient(0, 0, 0, height * 0.6);
    skyGradient.addColorStop(0, '#38bdf8');
    skyGradient.addColorStop(0.6, '#bae6fd');
    skyGradient.addColorStop(1, '#fef08a');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, width, height * 0.6);

    // Sun
    ctx.fillStyle = 'rgba(254, 240, 138, 0.4)';
    ctx.beginPath();
    ctx.arc(width * 0.25, height * 0.15, 80, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(width * 0.25, height * 0.15, 40, 0, Math.PI * 2);
    ctx.fill();

    // 2. Grassy Orchard Soil Ground
    const groundGradient = ctx.createLinearGradient(0, height * 0.55, 0, height);
    groundGradient.addColorStop(0, '#84cc16');
    groundGradient.addColorStop(0.5, '#65a30d');
    groundGradient.addColorStop(1, '#3f6212');
    ctx.fillStyle = groundGradient;
    ctx.fillRect(0, height * 0.55, width, height * 0.45);

    // Dirt Path
    ctx.fillStyle = '#d97706';
    ctx.beginPath();
    ctx.moveTo(width * 0.4, height * 0.65);
    ctx.lineTo(width * 0.7, height);
    ctx.lineTo(width * 0.55, height);
    ctx.lineTo(width * 0.35, height * 0.65);
    ctx.closePath();
    ctx.fill();

    // 3. Red Tractor in Background
    const tractorX = 1800;
    const tractorY = height * 0.48;
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(tractorX - 40, tractorY - 30, 80, 40);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(tractorX - 10, tractorY - 60, 45, 35);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(tractorX - 5, tractorY - 55, 35, 25);
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(tractorX - 25, tractorY + 15, 20, 0, Math.PI * 2);
    ctx.arc(tractorX + 25, tractorY + 20, 32, 0, Math.PI * 2);
    ctx.fill();

    // 4. Apple Trees
    const drawAppleTree = (tx, ty, scale = 1) => {
      ctx.save();
      ctx.translate(tx, ty);
      ctx.scale(scale, scale);

      ctx.fillStyle = '#78350f';
      ctx.fillRect(-18, -20, 36, 120);

      ctx.fillStyle = '#d97706';
      ctx.beginPath();
      ctx.arc(0, -70, 70, 0, Math.PI * 2);
      ctx.arc(-45, -50, 55, 0, Math.PI * 2);
      ctx.arc(45, -50, 55, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ea580c';
      ctx.beginPath();
      ctx.arc(-20, -90, 55, 0, Math.PI * 2);
      ctx.arc(20, -90, 55, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#dc2626';
      for (let a = 0; a < 12; a++) {
        const ax = Math.sin(a * 1.3) * 50;
        const ay = -60 + Math.cos(a * 1.3) * 45;
        ctx.beginPath();
        ctx.arc(ax, ay, 8, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    drawAppleTree(250, height * 0.58, 1.4);
    drawAppleTree(750, height * 0.52, 1.2);
    drawAppleTree(1350, height * 0.54, 1.3);
    drawAppleTree(2200, height * 0.56, 1.5);

    // 5. Leaf Pile in Foreground Left
    ctx.fillStyle = '#c2410c';
    ctx.beginPath();
    ctx.ellipse(600, height * 0.78, 140, 55, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ea580c';
    ctx.beginPath();
    ctx.ellipse(600, height * 0.76, 110, 40, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.ellipse(600, height * 0.74, 80, 28, 0, 0, Math.PI * 2);
    ctx.fill();

    // 6. Wooden Crates
    const drawCrate = (cx, cy, appleCount = 8) => {
      ctx.fillStyle = '#b45309';
      ctx.fillRect(cx - 45, cy - 35, 90, 70);
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 3;
      ctx.strokeRect(cx - 45, cy - 35, 90, 70);
      ctx.beginPath();
      ctx.moveTo(cx - 45, cy - 10);
      ctx.lineTo(cx + 45, cy - 10);
      ctx.moveTo(cx - 45, cy + 12);
      ctx.lineTo(cx + 45, cy + 12);
      ctx.stroke();

      ctx.fillStyle = '#dc2626';
      for (let i = 0; i < appleCount; i++) {
        const apX = cx - 30 + (i % 4) * 20;
        const apY = cy - 40 - Math.floor(i / 4) * 14;
        ctx.beginPath();
        ctx.arc(apX, apY, 9, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    drawCrate(1950, height * 0.78, 8);
    drawCrate(2050, height * 0.78, 8);
    drawCrate(2000, height * 0.70, 8);

    ctx.restore();
  }

  _renderCyberpunk(ctx, width, height, t) {
    ctx.save();

    // 1. Dark Futuristic Cyberpunk Sky
    const skyGradient = ctx.createLinearGradient(0, 0, 0, height * 0.65);
    skyGradient.addColorStop(0, '#020617');
    skyGradient.addColorStop(0.5, '#0f172a');
    skyGradient.addColorStop(1, '#1e1b4b');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, width, height * 0.65);

    // Skyscrapers Silhouette with Neon Windows
    ctx.fillStyle = '#090d16';
    for (let b = 0; b < 16; b++) {
      const bx = b * 160;
      const bw = 120 + Math.sin(b * 3) * 30;
      const bh = height * 0.35 + Math.cos(b * 2) * (height * 0.15);
      ctx.fillRect(bx, height * 0.65 - bh, bw, bh);

      ctx.fillStyle = b % 2 === 0 ? 'rgba(56, 189, 248, 0.4)' : 'rgba(236, 72, 153, 0.4)';
      for (let wy = height * 0.65 - bh + 20; wy < height * 0.65 - 30; wy += 25) {
        for (let wx = bx + 15; wx < bx + bw - 20; wx += 20) {
          if ((wx + wy + b) % 3 === 0) {
            ctx.fillRect(wx, wy, 10, 14);
          }
        }
      }
      ctx.fillStyle = '#090d16';
    }

    // 2. Flying Speeders in Upper Sky
    for (let s = 0; s < 6; s++) {
      const spSpeed = 120 + s * 40;
      const spX = (t * spSpeed + s * 400) % (width + 300) - 150;
      const spY = height * 0.08 + s * 35 + Math.sin(t * 2 + s) * 10;
      const spLength = 40 + s * 10;

      const trailGrad = ctx.createLinearGradient(spX - spLength, spY, spX, spY);
      trailGrad.addColorStop(0, 'rgba(56, 189, 248, 0)');
      trailGrad.addColorStop(1, s % 2 === 0 ? '#38bdf8' : '#ec4899');
      ctx.strokeStyle = trailGrad;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(spX - spLength, spY);
      ctx.lineTo(spX, spY);
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(spX, spY, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Wet Pavement Street Floor with Neon Reflections
    const streetGradient = ctx.createLinearGradient(0, height * 0.65, 0, height);
    streetGradient.addColorStop(0, '#090d16');
    streetGradient.addColorStop(0.4, '#0f172a');
    streetGradient.addColorStop(1, '#020617');
    ctx.fillStyle = streetGradient;
    ctx.fillRect(0, height * 0.65, width, height * 0.35);

    ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
    ctx.lineWidth = 1.5;
    for (let r = 0; r < 8; r++) {
      const ry = height * 0.68 + r * 28;
      ctx.beginPath();
      ctx.moveTo(0, ry);
      ctx.lineTo(width, ry);
      ctx.stroke();
    }

    // Neon Vertical Signs
    const sign1X = 350, sign1Y = height * 0.18;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fillRect(sign1X - 35, sign1Y, 70, 180);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.strokeRect(sign1X - 35, sign1Y, 70, 180);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CYBER', sign1X, sign1Y + 40);
    ctx.fillStyle = '#ec4899';
    ctx.fillText('CAFE', sign1X, sign1Y + 70);
    ctx.fillStyle = '#f59e0b';
    ctx.fillText('LVL 31', sign1X, sign1Y + 110);

    const sign2X = 750, sign2Y = height * 0.35;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fillRect(sign2X - 30, sign2Y, 60, 150);
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 3;
    ctx.strokeRect(sign2X - 30, sign2Y, 60, 150);

    ctx.fillStyle = '#f97316';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText('RAMEN', sign2X, sign2Y + 40);
    ctx.fillText('BAR', sign2X, sign2Y + 75);

    const sign3X = 1850, sign3Y = height * 0.22;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fillRect(sign3X - 35, sign3Y, 70, 160);
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 3;
    ctx.strokeRect(sign3X - 35, sign3Y, 70, 160);

    ctx.fillStyle = '#06b6d4';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText('FLUG', sign3X, sign3Y + 45);
    ctx.fillText('TAXIS', sign3X, sign3Y + 80);

    const drawReflectionPuddle = (px, py, pw, color) => {
      ctx.save();
      const pGrad = ctx.createLinearGradient(0, py - 10, 0, py + 20);
      pGrad.addColorStop(0, color);
      pGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = pGrad;
      ctx.beginPath();
      ctx.ellipse(px, py, pw, 12, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    drawReflectionPuddle(350, height * 0.76, 90, 'rgba(56, 189, 248, 0.4)');
    drawReflectionPuddle(750, height * 0.78, 80, 'rgba(249, 115, 22, 0.4)');
    drawReflectionPuddle(1850, height * 0.75, 100, 'rgba(6, 182, 212, 0.4)');

    ctx.restore();
  }

  _renderEnchantedForest(ctx, width, height, t) {
    ctx.save();

    // 1. Magical Deep Violet Night Sky with Crescent Moon
    const skyGradient = ctx.createLinearGradient(0, 0, 0, height * 0.7);
    skyGradient.addColorStop(0, '#020617');
    skyGradient.addColorStop(0.5, '#0f172a');
    skyGradient.addColorStop(1, '#1e1b4b');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, width, height * 0.7);

    // Crescent Moon
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(width * 0.3, height * 0.15, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#020617';
    ctx.beginPath();
    ctx.arc(width * 0.3 + 10, height * 0.15 - 5, 26, 0, Math.PI * 2);
    ctx.fill();

    // Stars
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    for (let s = 0; s < 40; s++) {
      const sx = (s * 130 + s * s * 17) % width;
      const sy = (s * 47) % (height * 0.4);
      const sSize = 1 + (s % 3);
      ctx.fillRect(sx, sy, sSize, sSize);
    }

    // 2. Forest Floor & Trees
    const groundGrad = ctx.createLinearGradient(0, height * 0.6, 0, height);
    groundGrad.addColorStop(0, '#064e3b');
    groundGrad.addColorStop(0.5, '#022c22');
    groundGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, height * 0.6, width, height * 0.4);

    const drawGnarledTree = (tx, ty, scale = 1, hasTreehouse = false) => {
      ctx.save();
      ctx.translate(tx, ty);
      ctx.scale(scale, scale);

      ctx.fillStyle = '#1e1b4b';
      ctx.beginPath();
      ctx.moveTo(-60, 0);
      ctx.quadraticCurveTo(-40, -180, -20, -350);
      ctx.lineTo(20, -350);
      ctx.quadraticCurveTo(40, -180, 60, 0);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#065f46';
      ctx.beginPath();
      ctx.arc(0, -350, 140, 0, Math.PI * 2);
      ctx.arc(-80, -300, 100, 0, Math.PI * 2);
      ctx.arc(80, -300, 100, 0, Math.PI * 2);
      ctx.fill();

      if (hasTreehouse) {
        ctx.fillStyle = '#78350f';
        ctx.fillRect(-35, -280, 70, 50);
        ctx.fillStyle = '#b45309';
        ctx.beginPath();
        ctx.moveTo(-45, -280);
        ctx.lineTo(0, -320);
        ctx.lineTo(45, -280);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(-15, -265, 30, 25);
      }

      ctx.restore();
    };

    drawGnarledTree(200, height * 0.68, 1.2, false);
    drawGnarledTree(1850, height * 0.65, 1.4, true);

    // 3. Bioluminescent Mushrooms
    const drawMushroomCluster = (mx, my) => {
      ctx.save();
      ctx.fillStyle = '#06b6d4';
      ctx.beginPath();
      ctx.arc(mx, my - 15, 18, Math.PI, 0);
      ctx.fill();
      ctx.fillStyle = '#ec4899';
      ctx.beginPath();
      ctx.arc(mx + 22, my - 10, 14, Math.PI, 0);
      ctx.fill();
      ctx.fillStyle = 'rgba(6, 182, 212, 0.3)';
      ctx.beginPath();
      ctx.arc(mx, my - 15, 32, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    drawMushroomCluster(300, height * 0.78);
    drawMushroomCluster(1200, height * 0.74);
    drawMushroomCluster(2100, height * 0.78);

    // 4. Floating Wisps / Irrlichter
    for (let w = 0; w < 10; w++) {
      const wx = (w * 240 + t * 30 + Math.sin(t + w) * 50) % width;
      const wy = height * 0.25 + (w * 40) % (height * 0.4) + Math.cos(t * 1.5 + w) * 20;

      ctx.fillStyle = w % 2 === 0 ? 'rgba(56, 189, 248, 0.8)' : 'rgba(250, 204, 21, 0.8)';
      ctx.beginPath();
      ctx.arc(wx, wy, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = w % 2 === 0 ? 'rgba(56, 189, 248, 0.3)' : 'rgba(250, 204, 21, 0.3)';
      ctx.beginPath();
      ctx.arc(wx, wy, 20, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = 'rgba(15, 118, 110, 0.25)';
    ctx.fillRect(0, height * 0.65, width, height * 0.35);

    ctx.restore();
  }

  _renderSavannah(ctx, width, height, t) {
    ctx.save();

    // 1. Sky Gradient - Burning African Sunset Haze
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.65);
    skyGrad.addColorStop(0, '#581c87');
    skyGrad.addColorStop(0.25, '#9a3412');
    skyGrad.addColorStop(0.55, '#ea580c');
    skyGrad.addColorStop(0.8, '#f59e0b');
    skyGrad.addColorStop(1, '#fef08a');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Burning Sun in Dunst (Glowing Sun with Radial Haze)
    const sunX = width * 0.5;
    const sunY = height * 0.26;
    
    // Sun Outer Haze Aura
    const sunHaze = ctx.createRadialGradient(sunX, sunY, 40, sunX, sunY, 280);
    sunHaze.addColorStop(0, 'rgba(255, 255, 200, 0.9)');
    sunHaze.addColorStop(0.3, 'rgba(251, 146, 60, 0.6)');
    sunHaze.addColorStop(0.7, 'rgba(234, 88, 12, 0.25)');
    sunHaze.addColorStop(1, 'rgba(234, 88, 12, 0)');
    ctx.fillStyle = sunHaze;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 280, 0, Math.PI * 2);
    ctx.fill();

    // Burning Sun Core
    ctx.fillStyle = '#fffbeb';
    ctx.beginPath();
    ctx.arc(sunX, sunY, 70, 0, Math.PI * 2);
    ctx.fill();

    // Distant Mountain Ridges
    ctx.fillStyle = '#6b21a8';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.55);
    ctx.lineTo(width * 0.2, height * 0.51);
    ctx.lineTo(width * 0.45, height * 0.54);
    ctx.lineTo(width * 0.7, height * 0.5);
    ctx.lineTo(width, height * 0.53);
    ctx.lineTo(width, height * 0.65);
    ctx.lineTo(0, height * 0.65);
    ctx.closePath();
    ctx.fill();

    // 3. Background Grass Rolling Hills (Far Horizon)
    ctx.fillStyle = '#854d0e';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.54);
    for (let x = 0; x <= width; x += 100) {
      ctx.lineTo(x, height * 0.54 + Math.sin(x * 0.003 + 1) * 20);
    }
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // 4. Distant Wildlife Migrating (Giraffes & Zebras on Horizon)
    const drawDistantGiraffe = (gx, gy, scale) => {
      ctx.save();
      ctx.fillStyle = '#3b0764'; // Silhouette against sunset
      // Body
      ctx.beginPath();
      ctx.ellipse(gx, gy, 14 * scale, 9 * scale, 0, 0, Math.PI * 2);
      ctx.fill();
      // Long Neck
      ctx.beginPath();
      ctx.moveTo(gx + 6 * scale, gy - 4 * scale);
      ctx.lineTo(gx + 16 * scale, gy - 32 * scale);
      ctx.lineTo(gx + 21 * scale, gy - 32 * scale);
      ctx.lineTo(gx + 11 * scale, gy - 2 * scale);
      ctx.fill();
      // Head
      ctx.beginPath();
      ctx.ellipse(gx + 20 * scale, gy - 33 * scale, 5 * scale, 3 * scale, 0.3, 0, Math.PI * 2);
      ctx.fill();
      // Ears/Horns
      ctx.fillRect(gx + 18 * scale, gy - 38 * scale, 2 * scale, 5 * scale);
      // Legs (Walking animation)
      const legAnim = Math.sin(t * 6 + gx) * 4 * scale;
      ctx.lineWidth = 2.5 * scale;
      ctx.strokeStyle = '#3b0764';
      ctx.beginPath();
      ctx.moveTo(gx - 8 * scale, gy + 4 * scale);
      ctx.lineTo(gx - 10 * scale + legAnim, gy + 22 * scale);
      ctx.moveTo(gx - 2 * scale, gy + 4 * scale);
      ctx.lineTo(gx - 1 * scale - legAnim, gy + 22 * scale);
      ctx.moveTo(gx + 5 * scale, gy + 4 * scale);
      ctx.lineTo(gx + 7 * scale + legAnim, gy + 22 * scale);
      ctx.moveTo(gx + 11 * scale, gy + 4 * scale);
      ctx.lineTo(gx + 10 * scale - legAnim, gy + 22 * scale);
      ctx.stroke();
      ctx.restore();
    };

    const drawDistantZebra = (zx, zy, scale) => {
      ctx.save();
      ctx.fillStyle = '#3b0764';
      // Body
      ctx.beginPath();
      ctx.ellipse(zx, zy, 12 * scale, 7 * scale, 0, 0, Math.PI * 2);
      ctx.fill();
      // Neck
      ctx.beginPath();
      ctx.moveTo(zx + 5 * scale, zy - 3 * scale);
      ctx.lineTo(zx + 12 * scale, zy - 15 * scale);
      ctx.lineTo(zx + 16 * scale, zy - 14 * scale);
      ctx.lineTo(zx + 9 * scale, zy - 1 * scale);
      ctx.fill();
      // Head
      ctx.beginPath();
      ctx.ellipse(zx + 15 * scale, zy - 16 * scale, 5 * scale, 3 * scale, 0.4, 0, Math.PI * 2);
      ctx.fill();
      // Legs
      const legAnim = Math.sin(t * 8 + zx) * 3 * scale;
      ctx.lineWidth = 2 * scale;
      ctx.strokeStyle = '#3b0764';
      ctx.beginPath();
      ctx.moveTo(zx - 6 * scale, zy + 3 * scale);
      ctx.lineTo(zx - 7 * scale + legAnim, zy + 14 * scale);
      ctx.moveTo(zx - 1 * scale, zy + 3 * scale);
      ctx.lineTo(zx - legAnim, zy + 14 * scale);
      ctx.moveTo(zx + 4 * scale, zy + 3 * scale);
      ctx.lineTo(zx + 5 * scale + legAnim, zy + 14 * scale);
      ctx.moveTo(zx + 8 * scale, zy + 3 * scale);
      ctx.lineTo(zx + 7 * scale - legAnim, zy + 14 * scale);
      ctx.stroke();
      ctx.restore();
    };

    // Giraffe and Zebra Herds moving across distant horizon
    const horizonSpeed = (t * 22) % (width + 600);
    drawDistantGiraffe(width + 200 - horizonSpeed, height * 0.52, 0.9);
    drawDistantGiraffe(width + 260 - horizonSpeed, height * 0.525, 0.82);
    drawDistantGiraffe(width + 310 - horizonSpeed, height * 0.52, 0.88);

    drawDistantZebra(width + 420 - horizonSpeed, height * 0.54, 0.85);
    drawDistantZebra(width + 460 - horizonSpeed, height * 0.545, 0.8);
    drawDistantZebra(width + 500 - horizonSpeed, height * 0.54, 0.82);
    drawDistantZebra(width + 535 - horizonSpeed, height * 0.542, 0.78);

    // 5. Middle-ground Savanne Grasland Terrain
    const midGrad = ctx.createLinearGradient(0, height * 0.56, 0, height);
    midGrad.addColorStop(0, '#b45309');
    midGrad.addColorStop(0.4, '#d97706');
    midGrad.addColorStop(1, '#78350f');
    ctx.fillStyle = midGrad;

    ctx.beginPath();
    ctx.moveTo(0, height * 0.58);
    for (let x = 0; x <= width; x += 80) {
      ctx.lineTo(x, height * 0.58 + Math.sin(x * 0.005) * 25);
    }
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // 6. Vereinzelte Akazienbäume (Flat-topped Umbrella Acacia Silhouettes)
    const drawAcaciaTree = (tx, ty, scale, isForeground = false) => {
      ctx.save();
      const color = isForeground ? '#451a03' : '#78350f';
      ctx.fillStyle = color;
      ctx.strokeStyle = color;

      // Trunk
      ctx.beginPath();
      ctx.lineWidth = 14 * scale;
      ctx.lineCap = 'round';
      ctx.moveTo(tx, ty);
      const curve = Math.sin(tx) * 15 * scale;
      ctx.quadraticCurveTo(tx + curve, ty - 60 * scale, tx + curve * 0.5, ty - 120 * scale);
      ctx.stroke();

      // Main Spreading Branches
      const topX = tx + curve * 0.5;
      const topY = ty - 120 * scale;

      ctx.lineWidth = 6 * scale;
      ctx.beginPath();
      ctx.moveTo(topX, topY);
      ctx.lineTo(topX - 70 * scale, topY - 30 * scale);
      ctx.moveTo(topX, topY);
      ctx.lineTo(topX + 80 * scale, topY - 35 * scale);
      ctx.moveTo(topX, topY);
      ctx.lineTo(topX - 30 * scale, topY - 45 * scale);
      ctx.moveTo(topX, topY);
      ctx.lineTo(topX + 35 * scale, topY - 42 * scale);
      ctx.stroke();

      // Flat Umbrella Canopy Layer (Horizontal Ellipses)
      ctx.beginPath();
      ctx.ellipse(topX - 60 * scale, topY - 35 * scale, 55 * scale, 12 * scale, -0.05, 0, Math.PI * 2);
      ctx.ellipse(topX + 65 * scale, topY - 40 * scale, 60 * scale, 14 * scale, 0.05, 0, Math.PI * 2);
      ctx.ellipse(topX, topY - 50 * scale, 75 * scale, 16 * scale, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    // Draw background & foreground Acacia trees
    drawAcaciaTree(350, height * 0.65, 0.9);
    drawAcaciaTree(1100, height * 0.62, 0.65);
    drawAcaciaTree(1850, height * 0.68, 1.15, true);

    // 7. Foreground Grass Tufts & Savanne Shimmer
    ctx.fillStyle = '#451a03';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.76);
    for (let x = 0; x <= width; x += 50) {
      ctx.lineTo(x, height * 0.76 + Math.sin(x * 0.01) * 15);
    }
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Grass Tuft Blades in Foreground
    ctx.strokeStyle = '#270e01';
    ctx.lineWidth = 3;
    for (let g = 50; g < width; g += 120) {
      const gY = height * 0.78 + (g % 30);
      ctx.beginPath();
      ctx.moveTo(g, gY);
      ctx.quadraticCurveTo(g - 15, gY - 35, g - 25, gY - 50);
      ctx.moveTo(g, gY);
      ctx.quadraticCurveTo(g + 5, gY - 40, g + 10, gY - 60);
      ctx.moveTo(g, gY);
      ctx.quadraticCurveTo(g + 20, gY - 30, g + 30, gY - 45);
      ctx.stroke();
    }

    // Heat Shimmer Haze Tint
    ctx.fillStyle = 'rgba(245, 158, 11, 0.08)';
    ctx.fillRect(0, 0, width, height);

    ctx.restore();
  }

  _renderGraveyard(ctx, width, height, t) {
    ctx.save();

    // 1. Dark Gothic Midnight Sky
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.7);
    skyGrad.addColorStop(0, '#020617');
    skyGrad.addColorStop(0.4, '#0f172a');
    skyGrad.addColorStop(0.75, '#1e1b4b');
    skyGrad.addColorStop(1, '#334155');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // Eerie Stars & Wisps in Sky
    for (let s = 0; s < 30; s++) {
      const sx = (s * 80 + Math.sin(s) * 20) % width;
      const sy = (s * 15) % (height * 0.4);
      const twinkle = (Math.sin(t * 3 + s) + 1) * 0.5;
      ctx.fillStyle = `rgba(226, 232, 240, ${0.3 + twinkle * 0.5})`;
      ctx.beginPath();
      ctx.arc(sx, sy, 1 + (s % 2), 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Giant Eerie Full Moon with Silver Glow
    const moonX = width * 0.55;
    const moonY = height * 0.25;

    // Moon Radial Glow
    const moonGlow = ctx.createRadialGradient(moonX, moonY, 30, moonX, moonY, 260);
    moonGlow.addColorStop(0, 'rgba(224, 242, 254, 0.85)');
    moonGlow.addColorStop(0.35, 'rgba(186, 230, 253, 0.45)');
    moonGlow.addColorStop(0.7, 'rgba(56, 189, 248, 0.15)');
    moonGlow.addColorStop(1, 'rgba(56, 189, 248, 0)');
    ctx.fillStyle = moonGlow;
    ctx.beginPath();
    ctx.arc(moonX, moonY, 260, 0, Math.PI * 2);
    ctx.fill();

    // Full Moon Disk
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.arc(moonX, moonY, 80, 0, Math.PI * 2);
    ctx.fill();

    // Moon Craters
    ctx.fillStyle = 'rgba(148, 163, 184, 0.35)';
    ctx.beginPath();
    ctx.arc(moonX - 25, moonY - 20, 18, 0, Math.PI * 2);
    ctx.arc(moonX + 20, moonY + 15, 24, 0, Math.PI * 2);
    ctx.arc(moonX - 10, moonY + 30, 14, 0, Math.PI * 2);
    ctx.arc(moonX + 35, moonY - 15, 12, 0, Math.PI * 2);
    ctx.fill();

    // Eerie Distant Clouds passing Moon
    ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
    ctx.beginPath();
    const cloudX = (t * 15) % (width + 400) - 200;
    ctx.ellipse(cloudX, moonY - 20, 180, 35, 0, 0, Math.PI * 2);
    ctx.ellipse(cloudX + 100, moonY + 25, 140, 30, 0, 0, Math.PI * 2);
    ctx.fill();

    // 3. Distant Graveyard Hills & Mausoleums
    ctx.fillStyle = '#090d16';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.58);
    for (let x = 0; x <= width; x += 120) {
      ctx.lineTo(x, height * 0.58 + Math.sin(x * 0.004) * 20);
    }
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Distant Gothic Mausoleum Silhouette
    const drawMausoleum = (mx, my, scale) => {
      ctx.save();
      ctx.fillStyle = '#060911';
      ctx.fillRect(mx - 40 * scale, my - 60 * scale, 80 * scale, 60 * scale);
      // Roof Triangle
      ctx.beginPath();
      ctx.moveTo(mx - 50 * scale, my - 60 * scale);
      ctx.lineTo(mx, my - 90 * scale);
      ctx.lineTo(mx + 50 * scale, my - 60 * scale);
      ctx.fill();
      // Cross on roof
      ctx.fillRect(mx - 3 * scale, my - 105 * scale, 6 * scale, 18 * scale);
      ctx.fillRect(mx - 9 * scale, my - 100 * scale, 18 * scale, 5 * scale);
      ctx.restore();
    };
    drawMausoleum(220, height * 0.6, 0.85);
    drawMausoleum(2150, height * 0.62, 0.9);

    // 4. Knorrige Kahle Bäume (Spooky Gnarled Bare Trees)
    const drawBareTree = (tx, ty, scale, tilt = 0) => {
      ctx.save();
      ctx.translate(tx, ty);
      ctx.rotate(tilt);
      ctx.fillStyle = '#090d16';
      ctx.strokeStyle = '#090d16';

      // Trunk
      ctx.beginPath();
      ctx.lineWidth = 18 * scale;
      ctx.lineCap = 'round';
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(15 * scale, -70 * scale, -10 * scale, -140 * scale);
      ctx.stroke();

      // Twisted Bare Branches
      const drawBranch = (bx, by, length, angle, bScale) => {
        ctx.save();
        ctx.translate(bx, by);
        ctx.rotate(angle);
        ctx.lineWidth = 8 * bScale;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(10 * bScale, -length * 0.5, -5 * bScale, -length);
        ctx.stroke();

        if (length > 25 * scale) {
          drawBranch(-5 * bScale, -length, length * 0.6, -0.4, bScale * 0.7);
          drawBranch(-5 * bScale, -length, length * 0.6, 0.45, bScale * 0.7);
        }
        ctx.restore();
      };

      drawBranch(-10 * scale, -140 * scale, 70 * scale, -0.5, scale);
      drawBranch(-10 * scale, -140 * scale, 80 * scale, 0.4, scale);
      drawBranch(5 * scale, -80 * scale, 60 * scale, -0.7, scale * 0.8);
      drawBranch(8 * scale, -90 * scale, 65 * scale, 0.6, scale * 0.8);

      ctx.restore();
    };

    drawBareTree(180, height * 0.68, 1.2, -0.08);
    drawBareTree(1450, height * 0.66, 0.9, 0.1);
    drawBareTree(2300, height * 0.7, 1.3, -0.05);

    // 5. Midground & Foreground Graveyard Terrain
    const groundGrad = ctx.createLinearGradient(0, height * 0.6, 0, height);
    groundGrad.addColorStop(0, '#1e293b');
    groundGrad.addColorStop(0.5, '#0f172a');
    groundGrad.addColorStop(1, '#020617');
    ctx.fillStyle = groundGrad;

    ctx.beginPath();
    ctx.moveTo(0, height * 0.64);
    for (let x = 0; x <= width; x += 100) {
      ctx.lineTo(x, height * 0.64 + Math.sin(x * 0.006) * 18);
    }
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // 6. Crooked Weathered Tombstones (Schiefe Grabsteine) & Crosses
    const drawTombstone = (gx, gy, scale, tiltAngle, type = 'rounded') => {
      ctx.save();
      ctx.translate(gx, gy);
      ctx.rotate(tiltAngle);

      // Shadow
      ctx.fillStyle = 'rgba(2, 6, 23, 0.6)';
      ctx.fillRect(-22 * scale, 2 * scale, 44 * scale, 8 * scale);

      // Stone Material
      const stoneGrad = ctx.createLinearGradient(-20 * scale, -50 * scale, 20 * scale, 0);
      stoneGrad.addColorStop(0, '#64748b');
      stoneGrad.addColorStop(0.5, '#475569');
      stoneGrad.addColorStop(1, '#334155');
      ctx.fillStyle = stoneGrad;
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2;

      if (type === 'cross') {
        // Celtic / Gothic Stone Cross Tombstone
        ctx.beginPath();
        ctx.fillRect(-8 * scale, -70 * scale, 16 * scale, 70 * scale);
        ctx.fillRect(-25 * scale, -55 * scale, 50 * scale, 14 * scale);
        // Circle ring behind cross
        ctx.arc(0, -48 * scale, 16 * scale, 0, Math.PI * 2);
        ctx.stroke();
      } else if (type === 'pointed') {
        ctx.beginPath();
        ctx.moveTo(-20 * scale, 0);
        ctx.lineTo(-20 * scale, -45 * scale);
        ctx.lineTo(0, -65 * scale);
        ctx.lineTo(20 * scale, -45 * scale);
        ctx.lineTo(20 * scale, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else {
        // Standard Arched Tombstone
        ctx.beginPath();
        ctx.moveTo(-20 * scale, 0);
        ctx.lineTo(-20 * scale, -40 * scale);
        ctx.arc(0, -40 * scale, 20 * scale, Math.PI, 0);
        ctx.lineTo(20 * scale, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }

      // RIP Inscription / Cracks on stone
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-6 * scale, -30 * scale);
      ctx.lineTo(6 * scale, -30 * scale);
      ctx.moveTo(-10 * scale, -22 * scale);
      ctx.lineTo(10 * scale, -22 * scale);
      // Crack
      ctx.moveTo(5 * scale, -45 * scale);
      ctx.lineTo(2 * scale, -35 * scale);
      ctx.lineTo(8 * scale, -28 * scale);
      ctx.stroke();

      ctx.restore();
    };

    // Array of crooked tombstones placed across the graveyard
    drawTombstone(300, height * 0.72, 1.1, -0.15, 'rounded');
    drawTombstone(450, height * 0.75, 1.25, 0.18, 'cross');
    drawTombstone(620, height * 0.7, 0.9, -0.1, 'pointed');
    drawTombstone(850, height * 0.74, 1.15, 0.22, 'rounded');
    drawTombstone(1020, height * 0.68, 0.85, -0.18, 'cross');
    drawTombstone(1250, height * 0.73, 1.2, 0.12, 'pointed');
    drawTombstone(1600, height * 0.71, 1.0, -0.2, 'rounded');
    drawTombstone(1780, height * 0.76, 1.3, 0.15, 'cross');
    drawTombstone(2000, height * 0.72, 1.1, -0.12, 'pointed');

    // 7. Ancient Weathered Stone Angel Statue (Verwitterte Engelskulptur)
    const drawAngelStatue = (ax, ay, scale) => {
      ctx.save();
      ctx.translate(ax, ay);

      // Pedestal Base
      ctx.fillStyle = '#475569';
      ctx.fillRect(-35 * scale, -30 * scale, 70 * scale, 30 * scale);
      ctx.fillStyle = '#334155';
      ctx.fillRect(-40 * scale, -10 * scale, 80 * scale, 10 * scale);

      // Angel Body & Robes
      const statueGrad = ctx.createLinearGradient(0, -140 * scale, 0, 0);
      statueGrad.addColorStop(0, '#cbd5e1');
      statueGrad.addColorStop(0.5, '#94a3b8');
      statueGrad.addColorStop(1, '#475569');
      ctx.fillStyle = statueGrad;

      // Robe
      ctx.beginPath();
      ctx.moveTo(-20 * scale, -30 * scale);
      ctx.lineTo(-12 * scale, -100 * scale);
      ctx.lineTo(12 * scale, -100 * scale);
      ctx.lineTo(20 * scale, -30 * scale);
      ctx.closePath();
      ctx.fill();

      // Angel Head
      ctx.beginPath();
      ctx.arc(0, -112 * scale, 12 * scale, 0, Math.PI * 2);
      ctx.fill();

      // Spreading Angel Wings
      ctx.fillStyle = '#64748b';
      // Left Wing
      ctx.beginPath();
      ctx.moveTo(-8 * scale, -95 * scale);
      ctx.quadraticCurveTo(-55 * scale, -140 * scale, -65 * scale, -90 * scale);
      ctx.quadraticCurveTo(-45 * scale, -75 * scale, -8 * scale, -80 * scale);
      ctx.fill();
      // Right Wing
      ctx.beginPath();
      ctx.moveTo(8 * scale, -95 * scale);
      ctx.quadraticCurveTo(55 * scale, -140 * scale, 65 * scale, -90 * scale);
      ctx.quadraticCurveTo(45 * scale, -75 * scale, 8 * scale, -80 * scale);
      ctx.fill();

      // Moonlight Highlight Edge on Angel Statue
      ctx.strokeStyle = 'rgba(224, 242, 254, 0.6)';
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      ctx.moveTo(-65 * scale, -90 * scale);
      ctx.quadraticCurveTo(-55 * scale, -140 * scale, -8 * scale, -95 * scale);
      ctx.arc(0, -112 * scale, 12 * scale, Math.PI * 0.8, Math.PI * 1.5);
      ctx.stroke();

      ctx.restore();
    };

    drawAngelStatue(1850, height * 0.72, 1.2);

    // 8. Low Ground Fog Drifting Across Graveyard
    for (let f = 0; f < 6; f++) {
      const fogX = (f * 420 + t * 20) % (width + 400) - 200;
      const fogY = height * 0.72 + (f % 3) * 25;
      const fogGrad = ctx.createRadialGradient(fogX, fogY, 20, fogX, fogY, 200);
      fogGrad.addColorStop(0, 'rgba(148, 163, 184, 0.22)');
      fogGrad.addColorStop(0.6, 'rgba(148, 163, 184, 0.12)');
      fogGrad.addColorStop(1, 'rgba(148, 163, 184, 0)');
      ctx.fillStyle = fogGrad;
      ctx.beginPath();
      ctx.arc(fogX, fogY, 200, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  _renderHarbor(ctx, width, height, t) {
    ctx.save();

    // 1. Industrial Night Sky & Horizon Light Glow
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.65);
    skyGrad.addColorStop(0, '#020617');
    skyGrad.addColorStop(0.35, '#0b1329');
    skyGrad.addColorStop(0.7, '#1e293b');
    skyGrad.addColorStop(1, '#334155');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // Distant City & Industrial Harbor Glow Points
    for (let c = 0; c < 35; c++) {
      const cx = (c * 70 + 15) % width;
      const cy = height * 0.45 + (Math.sin(c) * 12);
      ctx.fillStyle = c % 3 === 0 ? 'rgba(251, 146, 60, 0.7)' : (c % 2 === 0 ? 'rgba(56, 189, 248, 0.7)' : 'rgba(253, 224, 71, 0.7)');
      ctx.beginPath();
      ctx.arc(cx, cy, 1.5 + (c % 2), 0, Math.PI * 2);
      ctx.fill();
    }

    // Distant Industrial Skyline Silhouettes (Refineries & Silos)
    ctx.fillStyle = '#060b17';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.52);
    for (let x = 0; x <= width; x += 140) {
      const h = height * 0.52 - ((x % 300 === 0) ? 40 : ((x % 140 === 0) ? 25 : 12));
      ctx.lineTo(x, h);
      ctx.lineTo(x + 40, h);
      ctx.lineTo(x + 40, height * 0.55);
    }
    ctx.lineTo(width, height * 0.55);
    ctx.lineTo(0, height * 0.55);
    ctx.closePath();
    ctx.fill();

    // 2. Large Cargo Container Ship (Frachtschiff) Docked in Midground
    const drawCargoShip = (sx, sy, scale) => {
      ctx.save();
      ctx.translate(sx, sy);

      // Ship Hull (Black & Red Maritime Colors)
      ctx.fillStyle = '#991b1b'; // Red Lower Hull
      ctx.beginPath();
      ctx.moveTo(-180 * scale, 15 * scale);
      ctx.lineTo(200 * scale, 15 * scale);
      ctx.lineTo(240 * scale, -20 * scale);
      ctx.lineTo(-210 * scale, -20 * scale);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#0f172a'; // Dark Upper Hull
      ctx.beginPath();
      ctx.moveTo(-210 * scale, -20 * scale);
      ctx.lineTo(240 * scale, -20 * scale);
      ctx.lineTo(260 * scale, -55 * scale);
      ctx.lineTo(-225 * scale, -55 * scale);
      ctx.closePath();
      ctx.fill();

      // White Hull Line
      ctx.strokeStyle = '#f8fafc';
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      ctx.moveTo(-210 * scale, -20 * scale);
      ctx.lineTo(240 * scale, -20 * scale);
      ctx.stroke();

      // Containers on Deck
      const colors = ['#dc2626', '#2563eb', '#16a34a', '#ca8a04', '#7c3aed'];
      let colorIdx = 0;
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 10; col++) {
          ctx.fillStyle = colors[(col + row * 2) % colors.length];
          const cx = -190 * scale + col * 38 * scale;
          const cy = -55 * scale - (row + 1) * 22 * scale;
          ctx.fillRect(cx, cy, 35 * scale, 20 * scale);
          ctx.strokeStyle = 'rgba(0,0,0,0.4)';
          ctx.lineWidth = 1;
          ctx.strokeRect(cx, cy, 35 * scale, 20 * scale);
        }
      }

      // Ship Bridge / Command Tower (Rear Structure)
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(140 * scale, -155 * scale, 65 * scale, 100 * scale);
      // Portholes & Windows
      ctx.fillStyle = '#fde047';
      for (let w = 0; w < 4; w++) {
        ctx.fillRect(148 * scale + w * 14 * scale, -145 * scale, 8 * scale, 10 * scale);
        ctx.fillRect(148 * scale + w * 14 * scale, -125 * scale, 8 * scale, 10 * scale);
      }
      // Funnel / Chimney
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(175 * scale, -185 * scale, 22 * scale, 30 * scale);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(175 * scale, -185 * scale, 22 * scale, 6 * scale);

      ctx.restore();
    };

    drawCargoShip(1700, height * 0.58, 0.95);

    // 3. Harbor Quay Docks (Kaimauer)
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, height * 0.56, width, height * 0.08);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, height * 0.63, width, height * 0.02);

    // 4. Stacks of Colorful Shipping Containers on the Quay
    const drawQuayContainerStack = (qx, qy, scale) => {
      ctx.save();
      const colors = ['#0284c7', '#ea580c', '#16a34a', '#dc2626', '#eab308', '#9333ea'];
      for (let col = 0; col < 4; col++) {
        const stackHeight = 2 + (col % 3);
        for (let row = 0; row < stackHeight; row++) {
          const cx = qx + col * 45 * scale;
          const cy = qy - (row + 1) * 24 * scale;
          ctx.fillStyle = colors[(col * 3 + row) % colors.length];
          ctx.fillRect(cx, cy, 42 * scale, 22 * scale);

          // Container Ridges / Details
          ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
          ctx.fillRect(cx + 8 * scale, cy + 2 * scale, 2 * scale, 18 * scale);
          ctx.fillRect(cx + 18 * scale, cy + 2 * scale, 2 * scale, 18 * scale);
          ctx.fillRect(cx + 28 * scale, cy + 2 * scale, 2 * scale, 18 * scale);
          ctx.strokeStyle = '#020617';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(cx, cy, 42 * scale, 22 * scale);
        }
      }
      ctx.restore();
    };

    drawQuayContainerStack(250, height * 0.57, 1.1);
    drawQuayContainerStack(1050, height * 0.57, 0.95);

    // 5. Giant Container Gantry Crane (Riesige Containerkräne)
    const drawGantryCrane = (cx, cy, scale) => {
      ctx.save();
      ctx.translate(cx, cy);

      ctx.strokeStyle = '#dc2626'; // Vibrant Red Crane Steel Frame
      ctx.fillStyle = '#dc2626';
      ctx.lineWidth = 6 * scale;

      // Legs / Pylons
      ctx.beginPath();
      ctx.moveTo(-70 * scale, 0);
      ctx.lineTo(-30 * scale, -220 * scale);
      ctx.moveTo(70 * scale, 0);
      ctx.lineTo(30 * scale, -220 * scale);
      ctx.stroke();

      // Cross Bracing
      ctx.lineWidth = 3 * scale;
      ctx.beginPath();
      ctx.moveTo(-60 * scale, -60 * scale);
      ctx.lineTo(50 * scale, -120 * scale);
      ctx.moveTo(60 * scale, -60 * scale);
      ctx.lineTo(-50 * scale, -120 * scale);
      ctx.stroke();

      // Horizontal Boom / Girder Beam extending over water
      ctx.fillStyle = '#b91c1c';
      ctx.fillRect(-120 * scale, -230 * scale, 340 * scale, 24 * scale);

      // Operator Cab
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(-20 * scale, -225 * scale, 28 * scale, 18 * scale);

      // Trolley & Cable Mechanism holding a container
      const trolleyX = 60 * scale + Math.sin(t * 1.5) * 40 * scale;
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(trolleyX - 10 * scale, -206 * scale, 20 * scale, 8 * scale);

      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(trolleyX - 6 * scale, -198 * scale);
      ctx.lineTo(trolleyX - 6 * scale, -120 * scale);
      ctx.moveTo(trolleyX + 6 * scale, -198 * scale);
      ctx.lineTo(trolleyX + 6 * scale, -120 * scale);
      ctx.stroke();

      // Lifted Container
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(trolleyX - 22 * scale, -120 * scale, 44 * scale, 22 * scale);
      ctx.strokeStyle = '#020617';
      ctx.strokeRect(trolleyX - 22 * scale, -120 * scale, 44 * scale, 22 * scale);

      ctx.restore();
    };

    drawGantryCrane(650, height * 0.57, 1.1);
    drawGantryCrane(1480, height * 0.57, 0.9);

    // 6. Floodlight Towers (Flutlichter)
    const drawFloodlight = (fx, fy, scale) => {
      ctx.save();
      ctx.fillStyle = '#475569';
      ctx.fillRect(fx - 4 * scale, fy - 180 * scale, 8 * scale, 180 * scale);

      // Light Rack
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(fx - 25 * scale, fy - 190 * scale, 50 * scale, 12 * scale);

      // Light Bulbs
      ctx.fillStyle = '#ffffff';
      for (let b = -20; b <= 20; b += 10) {
        ctx.beginPath();
        ctx.arc(fx + b * scale, fy - 184 * scale, 4 * scale, 0, Math.PI * 2);
        ctx.fill();
      }

      // Light Cones radiating down onto water & dock
      const lightCone = ctx.createLinearGradient(fx, fy - 184 * scale, fx, height);
      lightCone.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
      lightCone.addColorStop(0.3, 'rgba(254, 240, 138, 0.2)');
      lightCone.addColorStop(1, 'rgba(254, 240, 138, 0)');

      ctx.fillStyle = lightCone;
      ctx.beginPath();
      ctx.moveTo(fx - 25 * scale, fy - 184 * scale);
      ctx.lineTo(fx - 160 * scale, height);
      ctx.lineTo(fx + 160 * scale, height);
      ctx.lineTo(fx + 25 * scale, fy - 184 * scale);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    drawFloodlight(180, height * 0.57, 1.0);
    drawFloodlight(950, height * 0.57, 1.0);
    drawFloodlight(2100, height * 0.57, 1.0);

    // 7. Shimmering Harbor Water Basin (Glitzern des Wassers im Hafenbecken)
    const waterGrad = ctx.createLinearGradient(0, height * 0.65, 0, height);
    waterGrad.addColorStop(0, '#0369a1');
    waterGrad.addColorStop(0.4, '#0c4a6e');
    waterGrad.addColorStop(1, '#082f49');
    ctx.fillStyle = waterGrad;
    ctx.fillRect(0, height * 0.65, width, height * 0.35);

    // Animated Water Ripples & Reflections
    ctx.lineWidth = 2;
    for (let r = 0; r < 45; r++) {
      const rx = (r * 115 + Math.sin(r + t * 2) * 40) % width;
      const ry = height * 0.66 + (r * 7) % (height * 0.32);
      const rWidth = 30 + Math.sin(t * 3 + r) * 25;
      const alpha = 0.3 + Math.sin(t * 4 + r * 0.5) * 0.25;

      ctx.strokeStyle = r % 3 === 0 ? `rgba(254, 240, 138, ${alpha})` : (r % 2 === 0 ? `rgba(56, 189, 248, ${alpha})` : `rgba(239, 68, 68, ${alpha})`);
      ctx.beginPath();
      ctx.moveTo(rx, ry);
      ctx.lineTo(rx + rWidth, ry);
      ctx.stroke();
    }

    ctx.restore();
  }

  _renderArcade(ctx, width, height, t) {
    ctx.save();

    // 1. 80s Synthwave Room Walls Gradient
    const wallGrad = ctx.createLinearGradient(0, 0, 0, height * 0.65);
    wallGrad.addColorStop(0, '#090314');
    wallGrad.addColorStop(0.5, '#1b0933');
    wallGrad.addColorStop(1, '#331057');
    ctx.fillStyle = wallGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. 80s Perspective Neon Grid Floor
    ctx.fillStyle = '#0a0214';
    ctx.fillRect(0, height * 0.65, width, height * 0.35);

    ctx.strokeStyle = 'rgba(217, 70, 239, 0.45)'; // Neon Magenta Grid Lines
    ctx.lineWidth = 1.5;

    // Horizontal Perspective Grid Lines
    for (let y = height * 0.65; y <= height; y += 16) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Vertical Perspective Grid Lines radiating from horizon center
    const vpX = width * 0.5;
    const vpY = height * 0.65;
    for (let x = -width; x <= width * 2; x += 80) {
      ctx.beginPath();
      ctx.moveTo(vpX, vpY);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Horizon Neon Cyan Separator Line
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#06b6d4';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.moveTo(0, vpY);
    ctx.lineTo(width, vpY);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // 3. Wall Neon Signs & Retro Synthwave Posters
    const drawNeonText = (text, nx, ny, color, size = 28) => {
      ctx.save();
      ctx.font = `900 ${size}px "Courier New", monospace`;
      ctx.textAlign = 'center';
      ctx.shadowColor = color;
      ctx.shadowBlur = 18;
      ctx.fillStyle = '#ffffff';
      ctx.fillText(text, nx, ny);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.strokeText(text, nx, ny);
      ctx.restore();
    };

    drawNeonText('ARCADE 84', width * 0.25, height * 0.22, '#f43f5e', 36);
    drawNeonText('HIGH SCORES', width * 0.5, height * 0.22, '#06b6d4', 38);
    drawNeonText('INSERT COIN', width * 0.75, height * 0.22, '#eab308', 36);

    // Retro Posters
    const drawPoster = (px, py, title, color) => {
      ctx.save();
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(px - 35, py - 50, 70, 100);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.strokeRect(px - 35, py - 50, 70, 100);

      // Sun & Grid in Poster
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(px, py - 10, 16, Math.PI, 0);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(title, px, py + 30);
      ctx.restore();
    };

    drawPoster(120, height * 0.35, 'SYNTH 84', '#ec4899');
    drawPoster(780, height * 0.35, 'RETRO 88', '#38bdf8');
    drawPoster(1650, height * 0.35, 'OUTRUN', '#a855f7');
    drawPoster(2280, height * 0.35, 'PIXEL 80', '#eab308');

    // 4. Flashing Arcade Cabinets (Pixel-Optik Automaten)
    const drawArcadeCabinet = (ax, ay, scale, title, screenColor, gameType = 'space') => {
      ctx.save();
      ctx.translate(ax, ay);

      // Cabinet Side Silhouette
      ctx.fillStyle = '#0f051d';
      ctx.beginPath();
      ctx.moveTo(-45 * scale, 0);
      ctx.lineTo(-45 * scale, -180 * scale);
      ctx.lineTo(-25 * scale, -210 * scale);
      ctx.lineTo(35 * scale, -210 * scale);
      ctx.lineTo(45 * scale, -180 * scale);
      ctx.lineTo(45 * scale, 0);
      ctx.closePath();
      ctx.fill();

      // Main Cabinet Body
      ctx.fillStyle = '#1e0a38';
      ctx.fillRect(-38 * scale, -200 * scale, 76 * scale, 200 * scale);
      ctx.strokeStyle = '#d946ef';
      ctx.lineWidth = 2 * scale;
      ctx.strokeRect(-38 * scale, -200 * scale, 76 * scale, 200 * scale);

      // Illuminated Marquee Header
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(-34 * scale, -195 * scale, 68 * scale, 26 * scale);
      ctx.shadowColor = '#eab308';
      ctx.shadowBlur = 10;
      ctx.fillStyle = '#0f172a';
      ctx.font = `bold ${Math.floor(10 * scale)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(title, 0, -178 * scale);
      ctx.shadowBlur = 0;

      // Glowing CRT Screen Bezels & Screen
      ctx.fillStyle = '#090d16';
      ctx.fillRect(-32 * scale, -162 * scale, 64 * scale, 65 * scale);

      // CRT Glow Screen Content (Animated Pixel Graphics)
      const screenGrad = ctx.createLinearGradient(0, -160 * scale, 0, -100 * scale);
      screenGrad.addColorStop(0, screenColor);
      screenGrad.addColorStop(1, '#020617');
      ctx.fillStyle = screenGrad;
      ctx.fillRect(-28 * scale, -158 * scale, 56 * scale, 57 * scale);

      // Pixel Art Gameplay elements on screen
      ctx.fillStyle = '#ffffff';
      if (gameType === 'space') {
        // Space Invaders / Galaga Pixel Marching Aliens
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 4; col++) {
            const px = -20 * scale + col * 12 * scale + Math.sin(t * 4) * 3;
            const py = -150 * scale + row * 10 * scale;
            ctx.fillStyle = row === 0 ? '#f43f5e' : (row === 1 ? '#eab308' : '#38bdf8');
            ctx.fillRect(px, py, 6 * scale, 5 * scale);
          }
        }
        // Player Ship
        const shipX = Math.sin(t * 3 + ax) * 15 * scale;
        ctx.fillStyle = '#4ade80';
        ctx.fillRect(shipX - 4 * scale, -112 * scale, 8 * scale, 6 * scale);
      } else if (gameType === 'pacman') {
        // Yellow Pacman & Ghosts
        const pacX = -15 * scale + (t * 20 + ax * 0.1) % (40 * scale);
        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.arc(pacX, -130 * scale, 6 * scale, 0.3, Math.PI * 1.7);
        ctx.lineTo(pacX, -130 * scale);
        ctx.fill();
        // Red Ghost behind
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(pacX - 18 * scale, -135 * scale, 8 * scale, 10 * scale);
      } else {
        // Fighting Game Lifebars & Fighter Sprites
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(-24 * scale, -154 * scale, 20 * scale, 4 * scale);
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(4 * scale, -154 * scale, 20 * scale, 4 * scale);
        // Fighter Sprites
        ctx.fillStyle = '#fb923c';
        ctx.fillRect(-12 * scale, -130 * scale, 8 * scale, 16 * scale);
        ctx.fillStyle = '#a855f7';
        ctx.fillRect(6 * scale, -130 * scale, 8 * scale, 16 * scale);
      }

      // Control Panel Slope (Angled Table)
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.moveTo(-38 * scale, -95 * scale);
      ctx.lineTo(38 * scale, -95 * scale);
      ctx.lineTo(38 * scale, -65 * scale);
      ctx.lineTo(-38 * scale, -65 * scale);
      ctx.closePath();
      ctx.fill();

      // Joystick & Buttons
      ctx.fillStyle = '#ef4444'; // Red Balltop Joystick
      ctx.beginPath();
      ctx.arc(-18 * scale, -84 * scale, 4 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      ctx.moveTo(-18 * scale, -80 * scale);
      ctx.lineTo(-18 * scale, -72 * scale);
      ctx.stroke();

      // Arcade Buttons (Red, Yellow, Blue)
      const btnColors = ['#ef4444', '#eab308', '#3b82f6'];
      for (let b = 0; b < 3; b++) {
        ctx.fillStyle = btnColors[b];
        ctx.beginPath();
        ctx.arc(5 * scale + b * 9 * scale, -80 * scale, 3 * scale, 0, Math.PI * 2);
        ctx.fill();
      }

      // Illuminated Coin Slots (Rot-Glühender Münzeinwurf)
      ctx.fillStyle = '#dc2626';
      ctx.shadowColor = '#dc2626';
      ctx.shadowBlur = 8;
      ctx.fillRect(-12 * scale, -45 * scale, 10 * scale, 16 * scale);
      ctx.fillRect(4 * scale, -45 * scale, 10 * scale, 16 * scale);
      ctx.shadowBlur = 0;

      ctx.restore();
    };

    // Row of Arcade Cabinets across the hall
    drawArcadeCabinet(350, height * 0.66, 1.15, 'GALAGA', '#1e1b4b', 'space');
    drawArcadeCabinet(550, height * 0.66, 1.1, 'PAC-MAN', '#422006', 'pacman');
    drawArcadeCabinet(1350, height * 0.66, 1.05, 'FIGHTER II', '#831843', 'fighter');
    drawArcadeCabinet(1750, height * 0.66, 1.2, 'MOOR-ARCADE', '#064e3b', 'space');
    drawArcadeCabinet(2000, height * 0.66, 1.1, 'INVADERS', '#172554', 'space');

    // 5. Glittering Disco Ball in Center Ceiling (Diskokugel)
    const discoX = width * 0.5;
    const discoY = height * 0.16;

    // Chain
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(discoX, 0);
    ctx.lineTo(discoX, discoY - 35);
    ctx.stroke();

    // Disco Ball Outer Glow
    const discoGlow = ctx.createRadialGradient(discoX, discoY, 15, discoX, discoY, 140);
    discoGlow.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
    discoGlow.addColorStop(0.3, 'rgba(56, 189, 248, 0.4)');
    discoGlow.addColorStop(0.7, 'rgba(236, 72, 153, 0.15)');
    discoGlow.addColorStop(1, 'rgba(236, 72, 153, 0)');
    ctx.fillStyle = discoGlow;
    ctx.beginPath();
    ctx.arc(discoX, discoY, 140, 0, Math.PI * 2);
    ctx.fill();

    // Mirror Ball Sphere
    ctx.fillStyle = '#cbd5e1';
    ctx.beginPath();
    ctx.arc(discoX, discoY, 35, 0, Math.PI * 2);
    ctx.fill();

    // Mirror Grid Facets
    ctx.fillStyle = '#ffffff';
    for (let f = 0; f < 18; f++) {
      const fx = discoX + Math.sin(t * 3 + f * 0.6) * 28;
      const fy = discoY + Math.cos(f * 0.8) * 26;
      ctx.fillRect(fx - 2, fy - 2, 4, 4);
    }

    // Rotating Disco Light Beams & Sparkle Flecks across room
    for (let b = 0; b < 16; b++) {
      const angle = t * 0.8 + b * (Math.PI / 8);
      const bx = discoX + Math.cos(angle) * 450;
      const by = discoY + Math.sin(angle) * 350;

      ctx.fillStyle = b % 3 === 0 ? 'rgba(56, 189, 248, 0.25)' : (b % 2 === 0 ? 'rgba(236, 72, 153, 0.25)' : 'rgba(250, 204, 21, 0.25)');
      ctx.beginPath();
      ctx.arc(bx, by, 6 + (b % 4), 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  _renderClockCanyon(ctx, width, height, t) {
    ctx.save();

    // 1. Surreal Amber/Copper Desert Sunset Sky
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.65);
    skyGrad.addColorStop(0, '#451a03');
    skyGrad.addColorStop(0.3, '#78350f');
    skyGrad.addColorStop(0.65, '#c2410c');
    skyGrad.addColorStop(0.85, '#f97316');
    skyGrad.addColorStop(1, '#fde047');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // Glowing Golden Sun
    const sunX = width * 0.6;
    const sunY = height * 0.28;
    const sunGlow = ctx.createRadialGradient(sunX, sunY, 30, sunX, sunY, 220);
    sunGlow.addColorStop(0, 'rgba(254, 240, 138, 0.9)');
    sunGlow.addColorStop(0.4, 'rgba(249, 115, 22, 0.5)');
    sunGlow.addColorStop(1, 'rgba(249, 115, 22, 0)');
    ctx.fillStyle = sunGlow;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 220, 0, Math.PI * 2);
    ctx.fill();

    // 2. Distant Red Canyon Rock Formations
    ctx.fillStyle = '#7c2d12';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.52);
    for (let x = 0; x <= width; x += 120) {
      const cy = height * 0.52 - Math.abs(Math.sin(x * 0.005)) * 60;
      ctx.lineTo(x, cy);
    }
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Natural Rock Arches in Background
    const drawRockArch = (ax, ay, scale) => {
      ctx.save();
      ctx.fillStyle = '#9a3412';
      ctx.beginPath();
      ctx.moveTo(ax - 60 * scale, ay);
      ctx.lineTo(ax - 40 * scale, ay - 110 * scale);
      ctx.quadraticCurveTo(ax, ay - 150 * scale, ax + 40 * scale, ay - 110 * scale);
      ctx.lineTo(ax + 60 * scale, ay);
      ctx.lineTo(ax + 35 * scale, ay);
      ctx.lineTo(ax + 20 * scale, ay - 90 * scale);
      ctx.quadraticCurveTo(ax, ay - 120 * scale, ax - 20 * scale, ay - 90 * scale);
      ctx.lineTo(ax - 35 * scale, ay);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    drawRockArch(width * 0.5, height * 0.55, 1.2);

    // 3. Swinging Giant Brass Pendulums Hanging from Rock Arch
    const drawSwingingPendulum = (px, py, length, scale, offset) => {
      ctx.save();
      ctx.translate(px, py);
      const angle = Math.sin(t * 2.5 + offset) * 0.35;
      ctx.rotate(angle);

      // Brass Rod
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 4 * scale;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, length);
      ctx.stroke();

      // Brass Pendulum Bob Disc
      const bobY = length;
      const bobGrad = ctx.createRadialGradient(0, bobY, 4 * scale, 0, bobY, 24 * scale);
      bobGrad.addColorStop(0, '#fef08a');
      bobGrad.addColorStop(0.6, '#b45309');
      bobGrad.addColorStop(1, '#78350f');
      ctx.fillStyle = bobGrad;
      ctx.beginPath();
      ctx.arc(0, bobY, 24 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2 * scale;
      ctx.stroke();

      ctx.restore();
    };

    drawSwingingPendulum(width * 0.5 - 25, height * 0.35, 160, 1.1, 0);
    drawSwingingPendulum(width * 0.5 + 25, height * 0.35, 180, 1.1, Math.PI * 0.5);

    // 4. Midground Desert Sand Dunes
    const duneGrad = ctx.createLinearGradient(0, height * 0.55, 0, height);
    duneGrad.addColorStop(0, '#ea580c');
    duneGrad.addColorStop(0.5, '#c2410c');
    duneGrad.addColorStop(1, '#7c2d12');
    ctx.fillStyle = duneGrad;

    ctx.beginPath();
    ctx.moveTo(0, height * 0.58);
    for (let x = 0; x <= width; x += 90) {
      ctx.lineTo(x, height * 0.58 + Math.sin(x * 0.006) * 22);
    }
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // 5. Scattered Brass Cogs & Gears (Zahnräder)
    const drawCogWheel = (gx, gy, radius, teeth, rotSpeed, isRotating = true) => {
      ctx.save();
      ctx.translate(gx, gy);
      const rot = isRotating ? t * rotSpeed : 0;
      ctx.rotate(rot);

      ctx.fillStyle = '#b45309';
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;

      // Outer Circle with Teeth
      ctx.beginPath();
      for (let i = 0; i < teeth; i++) {
        const a1 = (i * Math.PI * 2) / teeth;
        const a2 = a1 + Math.PI / teeth;
        const rOut = radius * 1.18;
        ctx.lineTo(Math.cos(a1) * radius, Math.sin(a1) * radius);
        ctx.lineTo(Math.cos(a1) * rOut, Math.sin(a1) * rOut);
        ctx.lineTo(Math.cos(a2) * rOut, Math.sin(a2) * rOut);
        ctx.lineTo(Math.cos(a2) * radius, Math.sin(a2) * radius);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Inner Cutout
      ctx.fillStyle = '#7c2d12';
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    };

    drawCogWheel(350, height * 0.72, 60, 10, 0.5);
    drawCogWheel(220, height * 0.8, 85, 12, -0.4);
    drawCogWheel(1550, height * 0.7, 70, 10, 0.6);
    drawCogWheel(2100, height * 0.78, 90, 14, -0.3);

    // 6. Giant Ancient Tilted Grandfather Clocks (Riesige Standuhren) & Melting Dali Clocks
    const drawGrandfatherClock = (cx, cy, scale, tiltAngle) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(tiltAngle);

      // Clock Wooden Body (Dark Oak / Mahogany)
      const woodGrad = ctx.createLinearGradient(-30 * scale, -140 * scale, 30 * scale, 0);
      woodGrad.addColorStop(0, '#78350f');
      woodGrad.addColorStop(0.5, '#451a03');
      woodGrad.addColorStop(1, '#270e01');
      ctx.fillStyle = woodGrad;
      ctx.fillRect(-35 * scale, -160 * scale, 70 * scale, 160 * scale);
      ctx.strokeStyle = '#b45309';
      ctx.lineWidth = 2 * scale;
      ctx.strokeRect(-35 * scale, -160 * scale, 70 * scale, 160 * scale);

      // Crown / Top Arch
      ctx.beginPath();
      ctx.arc(0, -160 * scale, 35 * scale, Math.PI, 0);
      ctx.fill();
      ctx.stroke();

      // Glass Window showing pendulum inside trunk
      ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
      ctx.fillRect(-22 * scale, -90 * scale, 44 * scale, 75 * scale);
      ctx.strokeRect(-22 * scale, -90 * scale, 44 * scale, 75 * scale);

      // Pendulum inside clock
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      ctx.moveTo(0, -85 * scale);
      const pSwing = Math.sin(t * 3 + cx) * 12 * scale;
      ctx.lineTo(pSwing, -30 * scale);
      ctx.stroke();
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(pSwing, -30 * scale, 8 * scale, 0, Math.PI * 2);
      ctx.fill();

      // Clock Face (Dali-style Melting / Curved Dial)
      ctx.fillStyle = '#fffbeb';
      ctx.beginPath();
      ctx.ellipse(0, -135 * scale, 26 * scale, 26 * scale, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 2 * scale;
      ctx.stroke();

      // Melting drips dripping down from clock face (Dali style)
      ctx.fillStyle = '#fffbeb';
      ctx.beginPath();
      ctx.moveTo(-15 * scale, -115 * scale);
      ctx.quadraticCurveTo(-10 * scale, -90 * scale, -8 * scale, -80 * scale);
      ctx.quadraticCurveTo(0 * scale, -90 * scale, 5 * scale, -100 * scale);
      ctx.quadraticCurveTo(12 * scale, -85 * scale, 15 * scale, -115 * scale);
      ctx.closePath();
      ctx.fill();

      // Clock Hands (Ticking animation)
      const hourAngle = t * 0.2;
      const minAngle = t * 1.5;
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      ctx.moveTo(0, -135 * scale);
      ctx.lineTo(Math.sin(hourAngle) * 12 * scale, -135 * scale - Math.cos(hourAngle) * 12 * scale);
      ctx.moveTo(0, -135 * scale);
      ctx.lineTo(Math.sin(minAngle) * 18 * scale, -135 * scale - Math.cos(minAngle) * 18 * scale);
      ctx.stroke();

      ctx.restore();
    };

    // Place Grandfather Clocks in Canyon
    drawGrandfatherClock(450, height * 0.68, 1.25, 0.15);
    drawGrandfatherClock(1150, height * 0.66, 0.95, -0.2);
    drawGrandfatherClock(1850, height * 0.68, 1.35, -0.12);

    // 7. Golden Canyon Dust & Heat Shimmer Tint
    ctx.fillStyle = 'rgba(251, 146, 60, 0.08)';
    ctx.fillRect(0, 0, width, height);

    ctx.restore();
  }

  _renderArctic(ctx, width, height, t) {
    ctx.save();

    // 1. Polar Twilight Sky Gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.65);
    skyGrad.addColorStop(0, '#040d1a');
    skyGrad.addColorStop(0.4, '#0c2a4a');
    skyGrad.addColorStop(0.75, '#1e40af');
    skyGrad.addColorStop(1, '#38bdf8');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // Waving Aurora Borealis Curtain (Nordlichter in Emerald Green & Violet)
    for (let a = 0; a < 3; a++) {
      ctx.fillStyle = a === 0 ? 'rgba(74, 222, 128, 0.22)' : (a === 1 ? 'rgba(56, 189, 248, 0.2)' : 'rgba(192, 132, 252, 0.18)');
      ctx.beginPath();
      ctx.moveTo(0, height * 0.1);
      for (let x = 0; x <= width; x += 100) {
        const ay = height * (0.15 + a * 0.08) + Math.sin(x * 0.003 + t * 0.8 + a) * 40;
        ctx.lineTo(x, ay);
      }
      ctx.lineTo(width, height * 0.45);
      ctx.lineTo(0, height * 0.45);
      ctx.closePath();
      ctx.fill();
    }

    // Distant Polar Stars
    for (let s = 0; s < 30; s++) {
      const sx = (s * 80 + s * s) % width;
      const sy = (s * 12) % (height * 0.35);
      const twinkle = (Math.sin(t * 3 + s) + 1) * 0.5;
      ctx.fillStyle = `rgba(255, 255, 255, ${0.4 + twinkle * 0.5})`;
      ctx.beginPath();
      ctx.arc(sx, sy, 1 + (s % 2), 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Massive Blue Glaciers & Icebergs in Background (Gletscher)
    const drawGlacier = (gx, gy, scale) => {
      ctx.save();
      ctx.translate(gx, gy);

      // Crystalline Blue Ice Shades
      const iceGrad = ctx.createLinearGradient(0, -180 * scale, 0, 0);
      iceGrad.addColorStop(0, '#e0f2fe');
      iceGrad.addColorStop(0.4, '#7dd3fc');
      iceGrad.addColorStop(1, '#0284c7');
      ctx.fillStyle = iceGrad;

      ctx.beginPath();
      ctx.moveTo(-100 * scale, 0);
      ctx.lineTo(-70 * scale, -120 * scale);
      ctx.lineTo(-20 * scale, -180 * scale);
      ctx.lineTo(30 * scale, -140 * scale);
      ctx.lineTo(90 * scale, 0);
      ctx.closePath();
      ctx.fill();

      // Shaded Facets on Iceberg
      ctx.fillStyle = 'rgba(3, 105, 161, 0.4)';
      ctx.beginPath();
      ctx.moveTo(-20 * scale, -180 * scale);
      ctx.lineTo(0, 0);
      ctx.lineTo(90 * scale, 0);
      ctx.lineTo(30 * scale, -140 * scale);
      ctx.closePath();
      ctx.fill();

      // Highlight Crystal Edges
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      ctx.moveTo(-100 * scale, 0);
      ctx.lineTo(-70 * scale, -120 * scale);
      ctx.lineTo(-20 * scale, -180 * scale);
      ctx.lineTo(30 * scale, -140 * scale);
      ctx.stroke();

      ctx.restore();
    };

    drawGlacier(250, height * 0.58, 1.1);
    drawGlacier(750, height * 0.55, 0.85);
    drawGlacier(1600, height * 0.58, 1.25);
    drawGlacier(2150, height * 0.56, 0.9);

    // 3. Dark Frozen Polar Sea Basin
    const seaGrad = ctx.createLinearGradient(0, height * 0.58, 0, height);
    seaGrad.addColorStop(0, '#0c4a6e');
    seaGrad.addColorStop(0.6, '#082f49');
    seaGrad.addColorStop(1, '#030712');
    ctx.fillStyle = seaGrad;
    ctx.fillRect(0, height * 0.58, width, height * 0.42);

    // 4. Floating Ice Floes (Treibende Eisschollen)
    const drawIceFloe = (fx, fy, floeWidth, floeHeight) => {
      ctx.save();
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.ellipse(fx, fy, floeWidth, floeHeight, 0, 0, Math.PI * 2);
      ctx.fill();

      // Under-water Ice Rim
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.ellipse(fx, fy + 4, floeWidth * 0.98, floeHeight * 0.8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    // Array of ice floes drifting gently
    for (let f = 0; f < 8; f++) {
      const fX = (f * 320 + Math.sin(t * 1.2 + f) * 25) % width;
      const fY = height * 0.62 + (f % 4) * 35;
      drawIceFloe(fX, fY, 70 + (f % 3) * 20, 20 + (f % 2) * 8);
    }

    // 5. Foreground Snowy Shore
    const snowGrad = ctx.createLinearGradient(0, height * 0.68, 0, height);
    snowGrad.addColorStop(0, '#f1f5f9');
    snowGrad.addColorStop(0.5, '#cbd5e1');
    snowGrad.addColorStop(1, '#64748b');
    ctx.fillStyle = snowGrad;

    ctx.beginPath();
    ctx.moveTo(0, height * 0.72);
    for (let x = 0; x <= width; x += 100) {
      ctx.lineTo(x, height * 0.72 + Math.sin(x * 0.008) * 15);
    }
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // 6. Snow Igloo with Glowing Entrance
    const drawIgloo = (ix, iy, scale) => {
      ctx.save();
      ctx.translate(ix, iy);

      // Main Snow Dome
      const iglooGrad = ctx.createRadialGradient(-15 * scale, -45 * scale, 10 * scale, 0, 0, 75 * scale);
      iglooGrad.addColorStop(0, '#ffffff');
      iglooGrad.addColorStop(0.7, '#e2e8f0');
      iglooGrad.addColorStop(1, '#94a3b8');
      ctx.fillStyle = iglooGrad;

      ctx.beginPath();
      ctx.arc(0, 0, 70 * scale, Math.PI, 0);
      ctx.fill();
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2 * scale;
      ctx.stroke();

      // Ice Block Seams
      ctx.lineWidth = 1.5 * scale;
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.4)';
      for (let r = 1; r <= 3; r++) {
        ctx.beginPath();
        ctx.arc(0, 0, 70 * scale * (r / 4), Math.PI, 0);
        ctx.stroke();
      }

      // Entrance Tunnel (Glowing Firelight Inside)
      ctx.fillStyle = '#64748b';
      ctx.beginPath();
      ctx.arc(-25 * scale, 0, 28 * scale, Math.PI, 0);
      ctx.fill();

      // Firelight Glow Entrance
      const fireGlow = ctx.createRadialGradient(-25 * scale, -5 * scale, 2 * scale, -25 * scale, -5 * scale, 24 * scale);
      fireGlow.addColorStop(0, '#fef08a');
      fireGlow.addColorStop(0.5, '#f97316');
      fireGlow.addColorStop(1, '#7c2d12');
      ctx.fillStyle = fireGlow;
      ctx.beginPath();
      ctx.arc(-25 * scale, 0, 24 * scale, Math.PI, 0);
      ctx.fill();

      ctx.restore();
    };

    drawIgloo(1850, height * 0.74, 1.25);

    // 7. Waddling Penguin Silhouettes (Pinguine)
    const drawPenguin = (px, py, scale, walkDir = 1) => {
      ctx.save();
      ctx.translate(px, py);
      const waddle = Math.sin(t * 8 + px) * 0.15;
      ctx.rotate(waddle);

      // Body (Tuxedo Black & White)
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.ellipse(0, -20 * scale, 12 * scale, 20 * scale, 0, 0, Math.PI * 2);
      ctx.fill();

      // White Belly
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(walkDir * 2 * scale, -18 * scale, 8 * scale, 14 * scale, 0, 0, Math.PI * 2);
      ctx.fill();

      // Yellow/Orange Beak
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.moveTo(walkDir * 8 * scale, -32 * scale);
      ctx.lineTo(walkDir * 16 * scale, -30 * scale);
      ctx.lineTo(walkDir * 8 * scale, -28 * scale);
      ctx.closePath();
      ctx.fill();

      // Orange Feet
      ctx.fillStyle = '#f97316';
      ctx.fillRect(walkDir * -4 * scale, -2 * scale, 6 * scale, 4 * scale);
      ctx.fillRect(walkDir * 2 * scale, -2 * scale, 6 * scale, 4 * scale);

      ctx.restore();
    };

    // Penguin march along the snowy bank
    const marchX = (t * 15) % 600;
    drawPenguin(300 + marchX, height * 0.75, 1.1, 1);
    drawPenguin(340 + marchX, height * 0.755, 0.95, 1);
    drawPenguin(375 + marchX, height * 0.75, 1.05, 1);

    ctx.restore();
  }

  _renderHauntedManor(ctx, width, height, t) {
    ctx.save();

    // 1. Dark Stormy Violet Sky Gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.7);
    skyGrad.addColorStop(0, '#090514');
    skyGrad.addColorStop(0.4, '#1c0b36');
    skyGrad.addColorStop(0.75, '#2e104d');
    skyGrad.addColorStop(1, '#471b70');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // Flashing Lightning Bolts across Stormy Sky (Zuckende Blitze am Himmel)
    const lightningFlash = Math.sin(t * 7) > 0.93 || Math.sin(t * 13 + 2) > 0.95;
    if (lightningFlash) {
      // White/Purple Flash Tint over Sky
      ctx.fillStyle = 'rgba(238, 242, 255, 0.45)';
      ctx.fillRect(0, 0, width, height);

      // Jagged Lightning Bolts
      const drawLightning = (lx, ly) => {
        ctx.save();
        ctx.strokeStyle = '#ffffff';
        ctx.shadowColor = '#c084fc';
        ctx.shadowBlur = 25;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(lx, ly);
        ctx.lineTo(lx - 25, ly + 60);
        ctx.lineTo(lx + 15, ly + 110);
        ctx.lineTo(lx - 35, ly + 180);
        ctx.lineTo(lx + 5, ly + 250);
        ctx.stroke();
        ctx.restore();
      };
      drawLightning(width * 0.5, 0);
      drawLightning(width * 0.75, 25);
    }

    // Heavy Storm Clouds
    ctx.fillStyle = 'rgba(15, 7, 28, 0.65)';
    for (let c = 0; c < 5; c++) {
      const cx = (c * 500 + t * 25) % (width + 400) - 200;
      ctx.beginPath();
      ctx.ellipse(cx, height * 0.18 + (c % 2) * 40, 240, 60, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Overgrown Gothic Victorian Manor Mansion (Viktorianisches Spukschloss)
    const drawVictorianManor = (mx, my, scale) => {
      ctx.save();
      ctx.translate(mx, my);

      // Main Mansion Body (Dark Weathered Stone)
      const stoneGrad = ctx.createLinearGradient(-150 * scale, -220 * scale, 150 * scale, 0);
      stoneGrad.addColorStop(0, '#1e1b4b');
      stoneGrad.addColorStop(0.5, '#0f172a');
      stoneGrad.addColorStop(1, '#020617');
      ctx.fillStyle = stoneGrad;

      // Central Building Block
      ctx.fillRect(-120 * scale, -180 * scale, 240 * scale, 180 * scale);

      // Side Wings
      ctx.fillRect(-220 * scale, -130 * scale, 100 * scale, 130 * scale);
      ctx.fillRect(120 * scale, -130 * scale, 100 * scale, 130 * scale);

      // High Gothic Central Steeple / Clock Tower
      ctx.fillRect(-50 * scale, -270 * scale, 100 * scale, 90 * scale);
      // Tower Spire Roof
      ctx.beginPath();
      ctx.moveTo(-60 * scale, -270 * scale);
      ctx.lineTo(0, -360 * scale);
      ctx.lineTo(60 * scale, -270 * scale);
      ctx.closePath();
      ctx.fill();

      // Side Roof Gables & Turrets
      ctx.beginPath();
      ctx.moveTo(-230 * scale, -130 * scale);
      ctx.lineTo(-170 * scale, -190 * scale);
      ctx.lineTo(-110 * scale, -130 * scale);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(110 * scale, -130 * scale);
      ctx.lineTo(170 * scale, -190 * scale);
      ctx.lineTo(230 * scale, -130 * scale);
      ctx.fill();

      // Iron Roof Finials & Weathervanes
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      ctx.moveTo(0, -360 * scale);
      ctx.lineTo(0, -390 * scale);
      ctx.stroke();

      // Broken Windows (Zerbrochene Fenster mit Eerie Glow)
      const drawBrokenWindow = (wx, wy, wWidth, wHeight, isGlowing = true) => {
        ctx.save();
        ctx.fillStyle = isGlowing ? '#fde047' : '#090d16'; // Eerie candlelight or dark gap
        if (isGlowing) {
          ctx.shadowColor = '#f59e0b';
          ctx.shadowBlur = 14;
        }
        ctx.fillRect(wx - wWidth / 2, wy - wHeight / 2, wWidth, wHeight);

        // Broken Glass Jagged Cracks
        ctx.strokeStyle = '#020617';
        ctx.lineWidth = 1.5 * scale;
        ctx.beginPath();
        ctx.moveTo(wx - wWidth / 2, wy - wHeight / 2);
        ctx.lineTo(wx + wWidth / 4, wy);
        ctx.lineTo(wx + wWidth / 2, wy + wHeight / 2);
        ctx.stroke();

        ctx.restore();
      };

      // Windows Grid
      drawBrokenWindow(0, -220 * scale, 24 * scale, 40 * scale, true);
      drawBrokenWindow(-65 * scale, -120 * scale, 22 * scale, 35 * scale, true);
      drawBrokenWindow(65 * scale, -120 * scale, 22 * scale, 35 * scale, false);
      drawBrokenWindow(-170 * scale, -80 * scale, 20 * scale, 30 * scale, true);
      drawBrokenWindow(170 * scale, -80 * scale, 20 * scale, 30 * scale, false);

      // Overgrown Ivy Vines on Walls (Efeu an den Wänden)
      ctx.fillStyle = '#15803d'; // Dark Ivy Leaves
      ctx.strokeStyle = '#14532d';
      ctx.lineWidth = 3 * scale;

      // Vine Tendrils climbing up the walls
      ctx.beginPath();
      ctx.moveTo(-220 * scale, 0);
      ctx.quadraticCurveTo(-190 * scale, -60 * scale, -210 * scale, -120 * scale);
      ctx.moveTo(120 * scale, 0);
      ctx.quadraticCurveTo(150 * scale, -80 * scale, 130 * scale, -150 * scale);
      ctx.moveTo(-40 * scale, 0);
      ctx.quadraticCurveTo(-10 * scale, -100 * scale, -35 * scale, -240 * scale);
      ctx.stroke();

      // Ivy Leaf Clusters
      for (let iv = 0; iv < 25; iv++) {
        const ix = -210 * scale + (iv * 18 * scale) % (420 * scale);
        const iy = -30 * scale - (iv * 11 * scale) % (200 * scale);
        ctx.beginPath();
        ctx.arc(ix, iy, 7 * scale, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    drawVictorianManor(width * 0.72, height * 0.68, 1.15);

    // 3. Spooky Wrought Iron Gate & Stone Fence (Vordergrund-Zaun)
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, height * 0.65, width, height * 0.35);

    // Iron Fence Posts & Spikes
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 3;
    for (let f = 0; f < width; f += 25) {
      if (f > width * 0.6 && f < width * 0.8) continue; // Gate opening
      ctx.beginPath();
      ctx.moveTo(f, height * 0.62);
      ctx.lineTo(f, height * 0.72);
      ctx.stroke();

      // Spear top
      ctx.fillStyle = '#475569';
      ctx.beginPath();
      ctx.moveTo(f - 4, height * 0.62);
      ctx.lineTo(f, height * 0.6);
      ctx.lineTo(f + 4, height * 0.62);
      ctx.fill();
    }

    // 4. Low Ghostly Ground Fog
    for (let m = 0; m < 7; m++) {
      const mx = (m * 380 + t * 18) % (width + 400) - 200;
      const my = height * 0.68 + (m % 3) * 20;
      const fogGrad = ctx.createRadialGradient(mx, my, 15, mx, my, 180);
      fogGrad.addColorStop(0, 'rgba(192, 132, 252, 0.2)');
      fogGrad.addColorStop(0.6, 'rgba(192, 132, 252, 0.1)');
      fogGrad.addColorStop(1, 'rgba(192, 132, 252, 0)');
      ctx.fillStyle = fogGrad;
      ctx.beginPath();
      ctx.arc(mx, my, 180, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  _renderRooftopGarden(ctx, width, height, t) {
    ctx.save();

    // 1. Golden Metropolis Sunset Sky Gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.65);
    skyGrad.addColorStop(0, '#3b0764');
    skyGrad.addColorStop(0.3, '#7c2d12');
    skyGrad.addColorStop(0.6, '#c2410c');
    skyGrad.addColorStop(0.85, '#f97316');
    skyGrad.addColorStop(1, '#fef08a');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // Glowing Sunset Sun
    const sunX = width * 0.65;
    const sunY = height * 0.26;
    const sunGlow = ctx.createRadialGradient(sunX, sunY, 20, sunX, sunY, 180);
    sunGlow.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    sunGlow.addColorStop(0.4, 'rgba(251, 146, 60, 0.6)');
    sunGlow.addColorStop(1, 'rgba(251, 146, 60, 0)');
    ctx.fillStyle = sunGlow;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 180, 0, Math.PI * 2);
    ctx.fill();

    // 2. Glistering Metropolis City Skyline Silhouette (Wolkenkratzer-Panorama)
    const drawSkyline = () => {
      ctx.save();
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.moveTo(0, height * 0.55);

      for (let b = 0; b <= width; b += 60) {
        const bHeight = 80 + Math.abs(Math.sin(b * 0.03)) * 140;
        const bWidth = 40 + (b % 30);
        ctx.lineTo(b, height * 0.55 - bHeight);
        ctx.lineTo(b + bWidth, height * 0.55 - bHeight);
        ctx.lineTo(b + bWidth, height * 0.55);

        // Lit Skyscraper Windows
        ctx.fillStyle = (b % 3 === 0) ? '#fde047' : '#38bdf8';
        for (let wY = height * 0.55 - bHeight + 15; wY < height * 0.55 - 15; wY += 20) {
          for (let wX = b + 8; wX < b + bWidth - 8; wX += 12) {
            if (Math.sin(wX * 5 + wY * 3) > -0.2) {
              ctx.fillRect(wX, wY, 6, 8);
            }
          }
        }
        ctx.fillStyle = '#0f172a';
      }
      ctx.lineTo(width, height * 0.55);
      ctx.lineTo(0, height * 0.55);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    drawSkyline();

    // 3. Wooden Deck Floor (Holz-Dachterrasse)
    const deckGrad = ctx.createLinearGradient(0, height * 0.55, 0, height);
    deckGrad.addColorStop(0, '#78350f');
    deckGrad.addColorStop(0.5, '#451a03');
    deckGrad.addColorStop(1, '#270e01');
    ctx.fillStyle = deckGrad;
    ctx.fillRect(0, height * 0.55, width, height * 0.45);

    // Wooden Planks Lines
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.lineWidth = 2;
    for (let p = height * 0.55; p <= height; p += 16) {
      ctx.beginPath();
      ctx.moveTo(0, p);
      ctx.lineTo(width, p);
      ctx.stroke();
    }

    // Modern Glass & Chrome Balustrade Railing (Glasgeländer)
    ctx.fillStyle = 'rgba(186, 230, 253, 0.25)';
    ctx.fillRect(0, height * 0.52, width, height * 0.05);

    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.52);
    ctx.lineTo(width, height * 0.52);
    ctx.stroke();

    for (let r = 0; r < width; r += 120) {
      ctx.fillRect(r - 2, height * 0.52, 4, height * 0.05);
    }

    // 4. Outdoor Cocktail Lounge Bar (Skyline Cocktail Bar)
    const drawCocktailBar = (bx, by, scale) => {
      ctx.save();
      ctx.translate(bx, by);

      // Bar Canopy Roof
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(-110 * scale, -140 * scale, 220 * scale, 25 * scale);

      // Neon Sign "SKYLINE BAR"
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 12;
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.floor(14 * scale)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('SKYLINE BAR 🍸', 0, -123 * scale);
      ctx.shadowBlur = 0;

      // Bar Counter (Luminous Front)
      const barFront = ctx.createLinearGradient(-100 * scale, 0, 100 * scale, 0);
      barFront.addColorStop(0, '#ec4899');
      barFront.addColorStop(0.5, '#06b6d4');
      barFront.addColorStop(1, '#eab308');
      ctx.fillStyle = barFront;
      ctx.fillRect(-100 * scale, -70 * scale, 200 * scale, 70 * scale);
      ctx.strokeStyle = '#f8fafc';
      ctx.lineWidth = 3 * scale;
      ctx.strokeRect(-100 * scale, -70 * scale, 200 * scale, 70 * scale);

      // Bar Shelves & Lit Bottles
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(-90 * scale, -115 * scale, 180 * scale, 40 * scale);

      // Colorful Bottles
      const bottleColors = ['#ef4444', '#10b981', '#3b82f6', '#f59e0b', '#ec4899'];
      for (let b = 0; b < 8; b++) {
        ctx.fillStyle = bottleColors[b % bottleColors.length];
        ctx.fillRect(-80 * scale + b * 20 * scale, -110 * scale, 10 * scale, 22 * scale);
      }

      // Bar Stools
      for (let s = -60; s <= 60; s += 40) {
        ctx.fillStyle = '#475569';
        ctx.fillRect(s * scale - 12 * scale, -35 * scale, 24 * scale, 6 * scale);
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2 * scale;
        ctx.beginPath();
        ctx.moveTo(s * scale, -35 * scale);
        ctx.lineTo(s * scale, 0);
        ctx.stroke();
      }

      ctx.restore();
    };

    drawCocktailBar(350, height * 0.68, 1.15);

    // 5. Sunbed Lounge Deck Chairs (Liegestühle)
    const drawSunbed = (sx, sy, scale, angle = 0) => {
      ctx.save();
      ctx.translate(sx, sy);
      ctx.rotate(angle);

      // Teak Wood Frame
      ctx.fillStyle = '#78350f';
      ctx.fillRect(-50 * scale, -10 * scale, 100 * scale, 14 * scale);

      // Plush White Cushion
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(-48 * scale, -18 * scale, 96 * scale, 10 * scale);

      // Angled Backrest
      ctx.beginPath();
      ctx.moveTo(-48 * scale, -18 * scale);
      ctx.lineTo(-20 * scale, -18 * scale);
      ctx.lineTo(-45 * scale, -40 * scale);
      ctx.lineTo(-52 * scale, -38 * scale);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    drawSunbed(1250, height * 0.76, 1.2, -0.05);
    drawSunbed(1500, height * 0.78, 1.15, 0.05);

    // 6. Lush Exotic Potted Plants & Flower Pots (Blumentöpfe)
    const drawFlowerPot = (px, py, scale, plantType = 'palm') => {
      ctx.save();
      ctx.translate(px, py);

      // Terracotta / Ceramic Pot
      const potGrad = ctx.createLinearGradient(-25 * scale, -40 * scale, 25 * scale, 0);
      potGrad.addColorStop(0, '#ea580c');
      potGrad.addColorStop(0.7, '#c2410c');
      potGrad.addColorStop(1, '#7c2d12');
      ctx.fillStyle = potGrad;

      ctx.beginPath();
      ctx.moveTo(-22 * scale, 0);
      ctx.lineTo(-28 * scale, -50 * scale);
      ctx.lineTo(28 * scale, -50 * scale);
      ctx.lineTo(22 * scale, 0);
      ctx.closePath();
      ctx.fill();

      // Lush Green Leaves & Flowers
      if (plantType === 'palm') {
        ctx.fillStyle = '#15803d';
        for (let l = 0; l < 7; l++) {
          const lAngle = (l * Math.PI) / 6 - Math.PI / 2;
          ctx.beginPath();
          ctx.ellipse(Math.cos(lAngle) * 35 * scale, -60 * scale + Math.sin(lAngle) * 20 * scale, 28 * scale, 10 * scale, lAngle, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        // Blooming Flowers
        ctx.fillStyle = '#16a34a';
        ctx.beginPath();
        ctx.arc(0, -65 * scale, 32 * scale, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#f43f5e';
        for (let f = 0; f < 5; f++) {
          ctx.beginPath();
          ctx.arc((f - 2) * 12 * scale, -70 * scale + (f % 2) * 8 * scale, 7 * scale, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();
    };

    drawFlowerPot(850, height * 0.72, 1.1, 'palm');
    drawFlowerPot(1050, height * 0.74, 1.0, 'flower');
    drawFlowerPot(1850, height * 0.76, 1.2, 'palm');
    drawFlowerPot(2150, height * 0.75, 1.1, 'flower');

    // 7. Festive Hanging String Lights (Lichterketten am Dachgarten)
    ctx.strokeStyle = 'rgba(254, 240, 138, 0.8)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.42);
    ctx.quadraticCurveTo(width * 0.25, height * 0.48, width * 0.5, height * 0.43);
    ctx.quadraticCurveTo(width * 0.75, height * 0.49, width, height * 0.44);
    ctx.stroke();

    // Glowing Bulbs
    for (let sl = 40; sl < width; sl += 60) {
      const slY = height * 0.44 + Math.sin(sl * 0.005) * 20;
      ctx.fillStyle = '#fef08a';
      ctx.shadowColor = '#fde047';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(sl, slY, 4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    ctx.restore();
  }

  _renderDriveInCinema(ctx, width, height, t) {
    ctx.save();

    // 1. Deep 50s Night Sky Gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.7);
    skyGrad.addColorStop(0, '#050714');
    skyGrad.addColorStop(0.5, '#0b1026');
    skyGrad.addColorStop(1, '#1a1f3a');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Stars
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 80; i++) {
      const sx = ((i * 137.5) % width);
      const sy = ((i * 83.1) % (height * 0.5));
      const starAlpha = 0.3 + Math.sin(t * 0.003 + i) * 0.4;
      ctx.globalAlpha = Math.max(0.1, starAlpha);
      ctx.beginPath();
      ctx.arc(sx, sy, (i % 3 === 0) ? 2 : 1, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1.0;

    // Glowing Vintage Crescent Moon
    const moonX = width * 0.82;
    const moonY = height * 0.18;
    ctx.fillStyle = '#fef08a';
    ctx.shadowColor = '#fde047';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(moonX, moonY, 32, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Moon Shadow overlay for crescent shape
    ctx.fillStyle = '#0b1026';
    ctx.beginPath();
    ctx.arc(moonX - 10, moonY - 6, 30, 0, Math.PI * 2);
    ctx.fill();

    // Distant Tree Line Silhouette
    ctx.fillStyle = '#080c1b';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.58);
    for (let x = 0; x <= width; x += 40) {
      const hOffset = Math.sin(x * 0.02) * 15 + Math.cos(x * 0.05) * 8;
      ctx.lineTo(x, height * 0.56 + hOffset);
    }
    ctx.lineTo(width, height * 0.65);
    ctx.lineTo(0, height * 0.65);
    ctx.closePath();
    ctx.fill();

    // 3. Drive-In Ground (Dark Asphalt / Gravel Lot)
    const groundGrad = ctx.createLinearGradient(0, height * 0.58, 0, height);
    groundGrad.addColorStop(0, '#131826');
    groundGrad.addColorStop(0.5, '#1e2438');
    groundGrad.addColorStop(1, '#0e121d');
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, height * 0.58, width, height * 0.42);

    // 4. GIANT OUTDOOR MOVIE SCREEN (Center-Left Background)
    const scrX = width * 0.32;
    const scrY = height * 0.16;
    const scrW = width * 0.36;
    const scrH = height * 0.38;

    // Wooden / Steel Scaffold Legs & Support Beams
    ctx.strokeStyle = '#272d3f';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(scrX + 30, scrY + scrH);
    ctx.lineTo(scrX + 30, height * 0.62);
    ctx.moveTo(scrX + scrW - 30, scrY + scrH);
    ctx.lineTo(scrX + scrW - 30, height * 0.62);
    ctx.moveTo(scrX + scrW * 0.5, scrY + scrH);
    ctx.lineTo(scrX + scrW * 0.5, height * 0.62);
    ctx.stroke();

    // Screen Outer Frame
    ctx.fillStyle = '#1e2638';
    ctx.fillRect(scrX - 12, scrY - 12, scrW + 24, scrH + 24);
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 4;
    ctx.strokeRect(scrX - 12, scrY - 12, scrW + 24, scrH + 24);

    // Screen Surface (Illuminated B&W Film projection)
    ctx.fillStyle = '#e2e8f0';
    ctx.shadowColor = '#60a5fa';
    ctx.shadowBlur = 25;
    ctx.fillRect(scrX, scrY, scrW, scrH);
    ctx.shadowBlur = 0;

    // Retro B&W Movie Content on Screen (Attacking Moorhuhn Silhouette & Vintage Film Reel Circle)
    ctx.save();
    ctx.beginPath();
    ctx.rect(scrX, scrY, scrW, scrH);
    ctx.clip();

    // Film Vignette & Flicker
    const flicker = 0.85 + Math.sin(t * 0.02) * 0.1 + Math.cos(t * 0.05) * 0.05;
    ctx.fillStyle = `rgba(15, 23, 42, ${1 - flicker})`;
    ctx.fillRect(scrX, scrY, scrW, scrH);

    // Retro Countdown Circle & Crosshair
    const screenCenterX = scrX + scrW * 0.5;
    const screenCenterY = scrY + scrH * 0.5;

    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(screenCenterX, screenCenterY, scrH * 0.35, 0, Math.PI * 2);
    ctx.arc(screenCenterX, screenCenterY, scrH * 0.2, 0, Math.PI * 2);
    ctx.moveTo(scrX, screenCenterY);
    ctx.lineTo(scrX + scrW, screenCenterY);
    ctx.moveTo(screenCenterX, scrY);
    ctx.lineTo(screenCenterX, scrY + scrH);
    ctx.stroke();

    // Giant B&W Sci-Fi Moorhuhn Monster Silhouette on Movie Screen
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.arc(screenCenterX, screenCenterY + 10, 45, 0, Math.PI * 2); // Body
    ctx.arc(screenCenterX - 15, screenCenterY - 35, 25, 0, Math.PI * 2); // Head
    ctx.fill();

    // Beak Silhouette
    ctx.beginPath();
    ctx.moveTo(screenCenterX - 35, screenCenterY - 35);
    ctx.lineTo(screenCenterX - 65, screenCenterY - 28);
    ctx.lineTo(screenCenterX - 35, screenCenterY - 20);
    ctx.closePath();
    ctx.fill();

    // Glowing Red Eye on B&W Screen
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(screenCenterX - 22, screenCenterY - 38, 6, 0, Math.PI * 2);
    ctx.fill();

    // Movie Title Text on Screen
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 22px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('MOORHUHN FROM OUTER SPACE', screenCenterX, scrY + scrH - 20);

    ctx.restore();

    // Projector Light Beam Cone (coming from bottom center towards the screen)
    const beamGrad = ctx.createLinearGradient(width * 0.5, height * 0.85, screenCenterX, screenCenterY);
    beamGrad.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
    beamGrad.addColorStop(1, 'rgba(255, 255, 255, 0.03)');
    ctx.fillStyle = beamGrad;
    ctx.beginPath();
    ctx.moveTo(width * 0.5 - 20, height * 0.85);
    ctx.lineTo(width * 0.5 + 20, height * 0.85);
    ctx.lineTo(scrX + scrW, scrY + scrH);
    ctx.lineTo(scrX, scrY + scrH);
    ctx.closePath();
    ctx.fill();

    // 5. TICKET BOOTH ("KASSENHÄUSCHEN") - Left Foreground
    const boothX = width * 0.06;
    const boothY = height * 0.62;
    const boothW = 140;
    const boothH = 150;

    // Booth Body
    ctx.fillStyle = '#991b1b';
    ctx.fillRect(boothX, boothY, boothW, boothH);
    ctx.fillStyle = '#7f1d1d';
    ctx.fillRect(boothX + boothW * 0.5, boothY, boothW * 0.5, boothH);

    // Striped Awning Roof
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(boothX - 10, boothY - 20, boothW + 20, 20);
    ctx.fillStyle = '#dc2626';
    for (let stripe = 0; stripe < boothW + 20; stripe += 20) {
      ctx.fillRect(boothX - 10 + stripe, boothY - 20, 10, 20);
    }

    // Glowing Ticket Window
    ctx.fillStyle = '#fef08a';
    ctx.shadowColor = '#fde047';
    ctx.shadowBlur = 15;
    ctx.fillRect(boothX + 25, boothY + 30, 90, 65);
    ctx.shadowBlur = 0;

    // Window Frame
    ctx.strokeStyle = '#450a0a';
    ctx.lineWidth = 3;
    ctx.strokeRect(boothX + 25, boothY + 30, 90, 65);

    // Cashier Silhouette inside booth
    ctx.fillStyle = '#450a0a';
    ctx.beginPath();
    ctx.arc(boothX + 70, boothY + 60, 14, 0, Math.PI * 2);
    ctx.fillRect(boothX + 56, boothY + 74, 28, 20);

    // Neon Ticket Sign
    ctx.fillStyle = '#ec4899';
    ctx.shadowColor = '#f43f5e';
    ctx.shadowBlur = 12;
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('KASSE', boothX + boothW * 0.5, boothY - 28);
    ctx.shadowBlur = 0;

    // 6. 50s NEON SNACKBAR / DINER - Right Foreground
    const snackX = width * 0.72;
    const snackY = height * 0.54;
    const snackW = 260;
    const snackH = 190;

    // Diner Building (Sleek Chrome & Retro Pink)
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(snackX, snackY, snackW, snackH);

    // Chrome Top Band
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(snackX, snackY, snackW, 16);
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(snackX, snackY + 4, snackW, 4);

    // Neon Pink Outline Tubes
    ctx.strokeStyle = '#f43f5e';
    ctx.shadowColor = '#fb7185';
    ctx.shadowBlur = 14;
    ctx.lineWidth = 4;
    ctx.strokeRect(snackX + 4, snackY + 20, snackW - 8, snackH - 24);
    ctx.shadowBlur = 0;

    // Glowing Panoramic Diner Windows
    const winGrad = ctx.createLinearGradient(0, snackY + 40, 0, snackY + 120);
    winGrad.addColorStop(0, '#fef08a');
    winGrad.addColorStop(1, '#fde047');
    ctx.fillStyle = winGrad;
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 20;
    ctx.fillRect(snackX + 25, snackY + 45, snackW - 50, 75);
    ctx.shadowBlur = 0;

    // Diner Customers / Stools Silhouettes
    ctx.fillStyle = '#334155';
    for (let c = 0; c < 4; c++) {
      const cx = snackX + 50 + c * 45;
      ctx.beginPath();
      ctx.arc(cx, snackY + 80, 10, 0, Math.PI * 2);
      ctx.fillRect(cx - 8, snackY + 90, 16, 30);
    }

    // Neon Rooftop Sign ("DRIVE-IN DINER")
    ctx.save();
    ctx.fillStyle = '#06b6d4';
    ctx.shadowColor = '#22d3ee';
    ctx.shadowBlur = 18;
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('★ 50s SNACKBAR ★', snackX + snackW * 0.5, snackY - 20);
    ctx.fillStyle = '#f43f5e';
    ctx.shadowColor = '#fb7185';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText('POPCORN • SHAKES • BURGERS', snackX + snackW * 0.5, snackY - 4);
    ctx.shadowBlur = 0;
    ctx.restore();

    // 7. PARKED 50s CLASSIC CARS (Foreground Lot)
    const drawClassicCar = (x, y, scale, color, tailColor) => {
      ctx.save();
      ctx.translate(x, y);

      // Car Shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.beginPath();
      ctx.ellipse(0, 18 * scale, 95 * scale, 22 * scale, 0, 0, Math.PI * 2);
      ctx.fill();

      // Car Body (Chassis)
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(-85 * scale, -15 * scale, 170 * scale, 35 * scale, 8 * scale);
      ctx.fill();

      // Cabin / Roof
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.moveTo(-45 * scale, -15 * scale);
      ctx.lineTo(-25 * scale, -38 * scale);
      ctx.lineTo(35 * scale, -38 * scale);
      ctx.lineTo(55 * scale, -15 * scale);
      ctx.closePath();
      ctx.fill();

      // Windows
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.moveTo(-20 * scale, -35 * scale);
      ctx.lineTo(30 * scale, -35 * scale);
      ctx.lineTo(45 * scale, -17 * scale);
      ctx.lineTo(-38 * scale, -17 * scale);
      ctx.closePath();
      ctx.fill();

      // 50s Tailfins
      ctx.fillStyle = tailColor;
      ctx.beginPath();
      ctx.moveTo(-85 * scale, -15 * scale);
      ctx.lineTo(-98 * scale, -32 * scale);
      ctx.lineTo(-75 * scale, -15 * scale);
      ctx.closePath();
      ctx.fill();

      // Chrome Bumper & Details
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(-88 * scale, 10 * scale, 176 * scale, 7 * scale);
      ctx.fillRect(80 * scale, -12 * scale, 10 * scale, 25 * scale);

      // Chrome Hubcap Wheels
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(-55 * scale, 18 * scale, 14 * scale, 0, Math.PI * 2);
      ctx.arc(55 * scale, 18 * scale, 14 * scale, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#e2e8f0';
      ctx.beginPath();
      ctx.arc(-55 * scale, 18 * scale, 7 * scale, 0, Math.PI * 2);
      ctx.arc(55 * scale, 18 * scale, 7 * scale, 0, Math.PI * 2);
      ctx.fill();

      // Glowing Round Headlights (Casting Light Cones toward Screen)
      ctx.fillStyle = '#fef08a';
      ctx.shadowColor = '#fde047';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(84 * scale, -2 * scale, 6 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Headlight Beam Cone
      const headBeam = ctx.createLinearGradient(84 * scale, 0, 220 * scale, 0);
      headBeam.addColorStop(0, 'rgba(254, 240, 138, 0.4)');
      headBeam.addColorStop(1, 'rgba(254, 240, 138, 0.0)');
      ctx.fillStyle = headBeam;
      ctx.beginPath();
      ctx.moveTo(85 * scale, -5 * scale);
      ctx.lineTo(240 * scale, -45 * scale);
      ctx.lineTo(240 * scale, 35 * scale);
      ctx.lineTo(85 * scale, 8 * scale);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    // Drive-in Speaker Poles next to cars
    const drawSpeakerPole = (x, y) => {
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y - 55);
      ctx.stroke();

      // Dual Speaker Boxes hanging on top
      ctx.fillStyle = '#334155';
      ctx.fillRect(x - 12, y - 65, 10, 14);
      ctx.fillRect(x + 2, y - 65, 10, 14);
    };

    // Parked Classic Cars in rows
    drawClassicCar(width * 0.22, height * 0.82, 0.85, '#dc2626', '#b91c1c'); // Red Cadillac
    drawSpeakerPole(width * 0.22 + 90, height * 0.82 + 10);

    drawClassicCar(width * 0.46, height * 0.86, 0.95, '#0284c7', '#0369a1'); // Turquoise Bel Air
    drawSpeakerPole(width * 0.46 + 100, height * 0.86 + 10);

    drawClassicCar(width * 0.68, height * 0.84, 0.9, '#db2777', '#be185d'); // Pink Convertible
    drawSpeakerPole(width * 0.68 - 90, height * 0.84 + 10);

    ctx.restore();
  }

  _renderCrystalCave(ctx, width, height, t) {
    ctx.save();

    // 1. Dark Cavern Atmosphere Gradient
    const caveGrad = ctx.createLinearGradient(0, 0, 0, height);
    caveGrad.addColorStop(0, '#04020a');
    caveGrad.addColorStop(0.5, '#0b0619');
    caveGrad.addColorStop(1, '#150a2a');
    ctx.fillStyle = caveGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Cavern Wall Rock Formations (Background Layers)
    ctx.fillStyle = '#0a0614';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(width * 0.25, height * 0.35);
    ctx.lineTo(width * 0.45, 0);
    ctx.lineTo(width * 0.7, height * 0.38);
    ctx.lineTo(width, 0);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // 3. Hanging Ceiling Stalactites
    const drawStalactite = (x, length, w) => {
      ctx.fillStyle = '#170c2e';
      ctx.strokeStyle = '#28174c';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x - w * 0.5, 0);
      ctx.lineTo(x, length);
      ctx.lineTo(x + w * 0.5, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Stalactite Tip Crystal Drip Glow
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#0284c7';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(x, length + 2, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    for (let s = 40; s < width; s += 80) {
      const len = 70 + Math.sin(s * 0.03) * 45 + Math.cos(s * 0.07) * 35;
      drawStalactite(s, len, 24);
    }

    // 4. BIOLUMINESCENT UNDERGROUND CRYSTAL LAKE (Bottom 35%)
    const lakeY = height * 0.65;
    const lakeGrad = ctx.createLinearGradient(0, lakeY, 0, height);
    lakeGrad.addColorStop(0, 'rgba(6, 182, 212, 0.75)');
    lakeGrad.addColorStop(0.5, 'rgba(124, 58, 237, 0.85)');
    lakeGrad.addColorStop(1, 'rgba(15, 23, 42, 0.95)');
    ctx.fillStyle = lakeGrad;
    ctx.shadowColor = '#06b6d4';
    ctx.shadowBlur = 20;
    ctx.fillRect(0, lakeY, width, height - lakeY);
    ctx.shadowBlur = 0;

    // Water Ripples & Shimmer Lines
    ctx.strokeStyle = 'rgba(165, 243, 252, 0.5)';
    ctx.lineWidth = 1.5;
    for (let r = 0; r < 12; r++) {
      const rx = (r * 180 + t * 20) % width;
      const ry = lakeY + 20 + r * 22;
      ctx.beginPath();
      ctx.ellipse(rx, ry, 50 + Math.sin(t * 0.003 + r) * 15, 3, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    // 5. GIANT GLOWING CRYSTAL CLUSTERS & GEODES
    const drawCrystalShard = (cx, cy, length, angle, color, glowColor, widthScale = 1) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);

      // Inner Pulse
      const pulse = 0.85 + Math.sin(t * 0.004 + cx) * 0.15;

      ctx.fillStyle = color;
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 22 * pulse;

      // Hexagonal / Pointed Facet Prism
      ctx.beginPath();
      ctx.moveTo(-18 * widthScale, 0);
      ctx.lineTo(-14 * widthScale, -length * 0.75);
      ctx.lineTo(0, -length);
      ctx.lineTo(14 * widthScale, -length * 0.75);
      ctx.lineTo(18 * widthScale, 0);
      ctx.closePath();
      ctx.fill();

      // Facet Highlight Layer
      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.beginPath();
      ctx.moveTo(0, -length);
      ctx.lineTo(14 * widthScale, -length * 0.75);
      ctx.lineTo(18 * widthScale, 0);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.restore();
    };

    const drawCrystalCluster = (x, y, scale = 1, primaryColor = '#a855f7', glowColor = '#c084fc') => {
      ctx.save();
      // Base Rock Mound
      ctx.fillStyle = '#1e1b4b';
      ctx.beginPath();
      ctx.ellipse(x, y + 10, 60 * scale, 22 * scale, 0, 0, Math.PI * 2);
      ctx.fill();

      // Cluster Shards
      drawCrystalShard(x - 25 * scale, y, 90 * scale, -0.35, primaryColor, glowColor, 0.9);
      drawCrystalShard(x + 25 * scale, y, 100 * scale, 0.35, primaryColor, glowColor, 0.95);
      drawCrystalShard(x - 10 * scale, y, 130 * scale, -0.12, primaryColor, glowColor, 1.1);
      drawCrystalShard(x + 10 * scale, y, 140 * scale, 0.1, primaryColor, glowColor, 1.15);
      drawCrystalShard(x, y, 160 * scale, 0.0, '#38bdf8', '#0284c7', 1.25); // Center Cyan Core

      ctx.restore();
    };

    // Foreground & Midground Crystal Formations
    // Left Giant Amethyst & Cyan Cluster
    drawCrystalCluster(width * 0.15, height * 0.68, 1.2, '#c084fc', '#e879f9');

    // Center Giant Geode
    drawCrystalCluster(width * 0.5, height * 0.66, 1.35, '#38bdf8', '#0284c7');

    // Right Magenta & Emerald Geode
    drawCrystalCluster(width * 0.82, height * 0.7, 1.25, '#f43f5e', '#fb7185');

    // Smaller Scattered Crystals
    drawCrystalShard(width * 0.35, height * 0.68, 80, -0.2, '#34d399', '#059669');
    drawCrystalShard(width * 0.68, height * 0.69, 95, 0.25, '#fbbf24', '#d97706');

    // 6. CRYSTAL ARCHWAY & FLOATING SPARKLES
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    for (let p = 0; p < 40; p++) {
      const px = (p * 87 + t * 15) % width;
      const py = (p * 53 + Math.sin(t * 0.003 + p) * 30) % (height * 0.75);
      const pAlpha = 0.3 + Math.sin(t * 0.005 + p) * 0.45;
      ctx.fillStyle = (p % 2 === 0) ? `rgba(56, 189, 248, ${pAlpha})` : `rgba(232, 121, 249, ${pAlpha})`;
      ctx.beginPath();
      ctx.arc(px, py, 2 + (p % 3), 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  _renderGrandCanyon(ctx, width, height, t) {
    ctx.save();

    // 1. Warm Golden Desert Sky Gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.55);
    skyGrad.addColorStop(0, '#38bdf8');
    skyGrad.addColorStop(0.3, '#7dd3fc');
    skyGrad.addColorStop(0.7, '#fde047');
    skyGrad.addColorStop(1, '#f97316');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // Glowing Sun
    ctx.fillStyle = '#fef08a';
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 30;
    ctx.beginPath();
    ctx.arc(width * 0.78, height * 0.2, 45, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Distant Desert Horizon Haze & Flat Mesas
    ctx.fillStyle = '#c2410c';
    ctx.globalAlpha = 0.45;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.38);
    for (let x = 0; x <= width; x += 120) {
      const mesaH = height * 0.32 + Math.floor(Math.sin(x * 0.01) * 3) * 20;
      ctx.lineTo(x, mesaH);
      ctx.lineTo(x + 80, mesaH);
    }
    ctx.lineTo(width, height * 0.5);
    ctx.lineTo(0, height * 0.5);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1.0;

    // 2. MIDGROUND CANYON PLATEAUS & CLIFF WALLS
    // Layers of Terracotta, Red Sandstone & Ochre Strata
    const drawCanyonStrataWall = (startX, endX, topY, bottomY, mainColor, shadowColor) => {
      ctx.fillStyle = mainColor;
      ctx.beginPath();
      ctx.moveTo(startX, topY);
      ctx.lineTo(endX, topY + 20);
      ctx.lineTo(endX, bottomY);
      ctx.lineTo(startX, bottomY);
      ctx.closePath();
      ctx.fill();

      // Horizontal Strata Banding Lines
      ctx.strokeStyle = shadowColor;
      ctx.lineWidth = 3;
      const step = (bottomY - topY) / 6;
      for (let s = 1; s < 6; s++) {
        ctx.beginPath();
        ctx.moveTo(startX, topY + s * step);
        ctx.lineTo(endX, topY + 20 + s * step);
        ctx.stroke();
      }
    };

    // Left Midground Canyon Wall
    drawCanyonStrataWall(0, width * 0.38, height * 0.36, height * 0.72, '#9a3412', '#7c2d12');

    // Right Midground Canyon Wall
    drawCanyonStrataWall(width * 0.62, width, height * 0.34, height * 0.74, '#b45309', '#78350f');

    // 3. COLORADO RIVER & DEEP CANYON GORGE (Center Valley Bottom)
    const riverY = height * 0.68;
    const riverGrad = ctx.createLinearGradient(0, riverY, 0, height);
    riverGrad.addColorStop(0, '#0284c7');
    riverGrad.addColorStop(0.6, '#0369a1');
    riverGrad.addColorStop(1, '#075985');
    ctx.fillStyle = riverGrad;

    // Winding River Channel Path
    ctx.beginPath();
    ctx.moveTo(width * 0.32, height * 0.68);
    ctx.bezierCurveTo(width * 0.42, height * 0.72, width * 0.48, height * 0.76, width * 0.36, height * 0.88);
    ctx.bezierCurveTo(width * 0.3, height * 0.94, width * 0.45, height * 0.98, width * 0.52, height);
    ctx.lineTo(width * 0.68, height);
    ctx.bezierCurveTo(width * 0.58, height * 0.92, width * 0.48, height * 0.85, width * 0.54, height * 0.74);
    ctx.bezierCurveTo(width * 0.58, height * 0.7, width * 0.48, height * 0.68, width * 0.44, height * 0.68);
    ctx.closePath();
    ctx.fill();

    // River Sun Glints
    ctx.strokeStyle = 'rgba(254, 240, 138, 0.65)';
    ctx.lineWidth = 2;
    for (let rg = 0; rg < 8; rg++) {
      const rx = width * 0.38 + Math.sin(t * 0.003 + rg) * 35;
      const ry = height * 0.72 + rg * 30;
      ctx.beginPath();
      ctx.moveTo(rx - 20, ry);
      ctx.lineTo(rx + 20, ry);
      ctx.stroke();
    }

    // 4. FOREGROUND RUGGED CLIFF SHELVES & ROCKY CRAGS
    // Left Foreground Cliff Shelf
    ctx.fillStyle = '#7c2d12';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.58);
    ctx.lineTo(width * 0.28, height * 0.64);
    ctx.lineTo(width * 0.24, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Right Foreground Cliff Shelf
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.moveTo(width * 0.72, height * 0.6);
    ctx.lineTo(width, height * 0.55);
    ctx.lineTo(width, height);
    ctx.lineTo(width * 0.68, height);
    ctx.closePath();
    ctx.fill();

    // 5. CANYON SKYWALK OBSERVATION DECK (Right Foreground)
    const skyX = width * 0.76;
    const skyY = height * 0.58;

    // Glass Horseshoe Bridge
    ctx.strokeStyle = '#38bdf8';
    ctx.shadowColor = '#0284c7';
    ctx.shadowBlur = 12;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.ellipse(skyX, skyY + 15, 55, 30, 0, 0, Math.PI);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Steel Support Beams anchored into rock
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(skyX - 45, skyY + 15);
    ctx.lineTo(skyX - 35, skyY + 65);
    ctx.moveTo(skyX + 45, skyY + 15);
    ctx.lineTo(skyX + 35, skyY + 65);
    ctx.stroke();

    // 6. CANYON EAGLE'S NEST ON ROCK PINNACLE (Left Foreground)
    const pinX = width * 0.2;
    const pinY = height * 0.58;

    // Rock Pinnacle Spire
    ctx.fillStyle = '#9a3412';
    ctx.beginPath();
    ctx.moveTo(pinX - 25, height * 0.85);
    ctx.lineTo(pinX - 12, pinY);
    ctx.lineTo(pinX + 12, pinY);
    ctx.lineTo(pinX + 25, height * 0.85);
    ctx.closePath();
    ctx.fill();

    // Twig Eagle Nest
    ctx.fillStyle = '#451a03';
    ctx.beginPath();
    ctx.ellipse(pinX, pinY - 4, 22, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Golden Eagle Silhouette
    ctx.fillStyle = '#1e1b4b';
    ctx.beginPath();
    ctx.arc(pinX - 4, pinY - 12, 6, 0, Math.PI * 2); // Head
    ctx.fillRect(pinX - 8, pinY - 8, 12, 10); // Body
    ctx.fill();

    // Desert Cacti on Rock Ledges
    const drawSaguaro = (cx, cy, s) => {
      ctx.fillStyle = '#15803d';
      ctx.fillRect(cx - 3 * s, cy - 35 * s, 6 * s, 35 * s);
      // Arms
      ctx.fillRect(cx - 14 * s, cy - 22 * s, 11 * s, 4 * s);
      ctx.fillRect(cx - 14 * s, cy - 30 * s, 4 * s, 12 * s);
      ctx.fillRect(cx + 3 * s, cy - 16 * s, 11 * s, 4 * s);
      ctx.fillRect(cx + 10 * s, cy - 26 * s, 4 * s, 14 * s);
    };

    drawSaguaro(width * 0.1, height * 0.65, 0.9);
    drawSaguaro(width * 0.88, height * 0.62, 1.1);

    ctx.restore();
  }

  _renderGhostShip(ctx, width, height, t) {
    ctx.save();

    // 1. Dark Stormy Night & Eerie Green Spectral Sky Gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.6);
    skyGrad.addColorStop(0, '#020617');
    skyGrad.addColorStop(0.5, '#062016');
    skyGrad.addColorStop(1, '#022c22');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // Glowing Spectral Green Moon
    ctx.fillStyle = '#a7f3d0';
    ctx.shadowColor = '#10b981';
    ctx.shadowBlur = 35;
    ctx.beginPath();
    ctx.arc(width * 0.25, height * 0.18, 38, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Lightning Flash Effect (Occasional)
    if (Math.sin(t * 0.007) > 0.94) {
      ctx.fillStyle = 'rgba(167, 243, 208, 0.25)';
      ctx.fillRect(0, 0, width, height * 0.6);
    }

    // 2. STORMY CRASHING OCEAN WAVES (Background Sea)
    const seaY = height * 0.48;
    ctx.fillStyle = '#022c22';
    ctx.beginPath();
    ctx.moveTo(0, seaY);
    for (let x = 0; x <= width; x += 40) {
      const waveH = Math.sin(x * 0.015 + t * 0.005) * 16 + Math.cos(x * 0.03 - t * 0.004) * 10;
      ctx.lineTo(x, seaY + waveH);
    }
    ctx.lineTo(width, height * 0.7);
    ctx.lineTo(0, height * 0.7);
    ctx.closePath();
    ctx.fill();

    // White Crest Sea Foam Waves
    ctx.strokeStyle = 'rgba(167, 243, 208, 0.4)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let x = 0; x <= width; x += 50) {
      const foamY = seaY + 10 + Math.sin(x * 0.02 + t * 0.006) * 12;
      ctx.moveTo(x, foamY);
      ctx.lineTo(x + 25, foamY - 4);
    }
    ctx.stroke();

    // 3. CURSED GALLEON DECK & MAST STRUCTURE (Foreground / Midground)
    // Main Mast (Center Background)
    const mastX = width * 0.52;
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(mastX - 22, 0, 44, height * 0.7);

    // Cross Spars (Ruten)
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(mastX - 220, height * 0.12, 440, 16);
    ctx.fillRect(mastX - 170, height * 0.28, 340, 14);

    // Tattered Green Glowing Ghost Sails
    const drawGhostSail = (sx, sy, sw, sh) => {
      ctx.save();
      const pulse = 0.8 + Math.sin(t * 0.004 + sx) * 0.2;
      ctx.fillStyle = 'rgba(16, 185, 129, 0.45)';
      ctx.shadowColor = '#34d399';
      ctx.shadowBlur = 20 * pulse;

      ctx.beginPath();
      ctx.moveTo(sx - sw * 0.5, sy);
      ctx.quadraticCurveTo(sx, sy + 30, sx + sw * 0.5, sy);
      ctx.quadraticCurveTo(sx + sw * 0.4, sy + sh, sx + sw * 0.3, sy + sh + 20);

      // Tattered Holes in Sail
      for (let h = -0.3; h <= 0.3; h += 0.2) {
        ctx.lineTo(sx + sw * h, sy + sh + Math.sin(h * 10) * 15);
      }
      ctx.quadraticCurveTo(sx - sw * 0.4, sy + sh, sx - sw * 0.5, sy);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    drawGhostSail(mastX, height * 0.12, 400, 110);
    drawGhostSail(mastX, height * 0.28, 310, 95);

    // Rigging Ropes (Takelage)
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    for (let r = -200; r <= 200; r += 50) {
      ctx.beginPath();
      ctx.moveTo(mastX, height * 0.12);
      ctx.lineTo(mastX + r * 1.8, height * 0.62);
      ctx.stroke();
    }

    // 4. GALLEON WOODEN DECK PLANKS (Bottom 40%)
    const deckY = height * 0.62;
    ctx.fillStyle = '#022c22';
    ctx.fillRect(0, deckY, width, height - deckY);

    // Deck Plank Lines (Perspektivische Holzdielen)
    ctx.strokeStyle = '#064e3b';
    ctx.lineWidth = 3;
    for (let p = 0; p <= width; p += 70) {
      ctx.beginPath();
      ctx.moveTo(p, deckY);
      ctx.lineTo(p + (p - width * 0.5) * 0.4, height);
      ctx.stroke();
    }

    // Deck Wooden Railing (Klüver / Reling)
    ctx.fillStyle = '#065f46';
    ctx.fillRect(0, deckY - 12, width, 18);
    ctx.strokeStyle = '#047857';
    ctx.lineWidth = 3;
    ctx.strokeRect(0, deckY - 12, width, 18);

    // Railing Posts (Balustraden-Stützen)
    for (let post = 30; post < width; post += 90) {
      ctx.fillStyle = '#022c22';
      ctx.fillRect(post, deckY - 45, 14, 35);
    }
    ctx.fillStyle = '#065f46';
    ctx.fillRect(0, deckY - 48, width, 10);

    // 5. GHOSTLY PIRATE SHIP WHEEL ("VERFLUCHTES STEUERRAD") - Center Deck
    const wheelX = width * 0.35;
    const wheelY = height * 0.72;

    ctx.save();
    ctx.translate(wheelX, wheelY);
    ctx.rotate(t * 0.001); // Slow eerie rotation

    // Glowing Green Ghost Wheel Rim & Spokes
    ctx.strokeStyle = '#34d399';
    ctx.shadowColor = '#10b981';
    ctx.shadowBlur = 18;
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.arc(0, 0, 48, 0, Math.PI * 2);
    ctx.arc(0, 0, 25, 0, Math.PI * 2);
    ctx.stroke();

    // 8 Spokes (Speichen)
    for (let sp = 0; sp < 8; sp++) {
      const sAngle = (sp * Math.PI) / 4;
      ctx.beginPath();
      ctx.moveTo(Math.cos(sAngle) * 12, Math.sin(sAngle) * 12);
      ctx.lineTo(Math.cos(sAngle) * 65, Math.sin(sAngle) * 65);
      ctx.stroke();
    }
    ctx.shadowBlur = 0;
    ctx.restore();

    // Wheel Wooden Pedestal
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(wheelX - 16, wheelY, 32, 65);

    // 6. SPECTRAL CANNONS ("GEISTER-SCHIFFSKANONE") - Right Deck
    const drawGhostCannon = (cx, cy, scale = 1) => {
      ctx.save();
      ctx.translate(cx, cy);

      // Cannon Carriage (Holz-Lafette)
      ctx.fillStyle = '#022c22';
      ctx.fillRect(-35 * scale, 0, 70 * scale, 25 * scale);

      // Iron Wheels
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(-24 * scale, 22 * scale, 10 * scale, 0, Math.PI * 2);
      ctx.arc(24 * scale, 22 * scale, 10 * scale, 0, Math.PI * 2);
      ctx.fill();

      // Spectral Green Glowing Cannon Barrel
      ctx.fillStyle = '#065f46';
      ctx.strokeStyle = '#34d399';
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 15;
      ctx.lineWidth = 3;

      ctx.beginPath();
      ctx.moveTo(-40 * scale, -12 * scale);
      ctx.lineTo(45 * scale, -18 * scale);
      ctx.lineTo(45 * scale, 5 * scale);
      ctx.lineTo(-40 * scale, 8 * scale);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Eerie Green Smoke at Muzzle
      ctx.fillStyle = 'rgba(52, 211, 153, 0.4)';
      ctx.beginPath();
      ctx.arc(-55 * scale, -4 * scale, 14 * scale, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.restore();
    };

    drawGhostCannon(width * 0.72, height * 0.78, 1.1);

    // 7. GHOSTLY LANTERNS & SPECTRAL WISPS ("GEISTERLATERNE AM MAST")
    const drawGhostLantern = (lx, ly) => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(lx - 10, ly - 20, 20, 30);

      // Glowing Green Flame
      ctx.fillStyle = '#a7f3d0';
      ctx.shadowColor = '#34d399';
      ctx.shadowBlur = 22;
      ctx.beginPath();
      ctx.arc(lx, ly - 5, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    drawGhostLantern(mastX - 25, height * 0.28);
    drawGhostLantern(width * 0.15, deckY - 35);

    // Spectral Ghost Wisps Floating across Deck
    for (let w = 0; w < 30; w++) {
      const wx = (w * 95 + t * 25) % width;
      const wy = (height * 0.45) + Math.sin(t * 0.004 + w) * 40;
      const wAlpha = 0.3 + Math.sin(t * 0.006 + w) * 0.4;

      ctx.fillStyle = `rgba(52, 211, 153, ${wAlpha})`;
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(wx, wy, 4 + (w % 4), 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    ctx.restore();
  }

  _renderConstructionSite(ctx, width, height, t) {
    ctx.save();

    // 1. Bright Sunny City Sky Gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.6);
    skyGrad.addColorStop(0, '#38bdf8');
    skyGrad.addColorStop(0.5, '#7dd3fc');
    skyGrad.addColorStop(1, '#bae6fd');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // Wispy Clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.beginPath();
    ctx.arc(width * 0.2, height * 0.15, 60, 0, Math.PI * 2);
    ctx.arc(width * 0.24, height * 0.12, 75, 0, Math.PI * 2);
    ctx.arc(width * 0.75, height * 0.18, 90, 0, Math.PI * 2);
    ctx.fill();

    // 2. DISTANT METROPOLIS & CITY TRAFFIC BELOW (Far Background)
    ctx.fillStyle = '#94a3b8';
    ctx.globalAlpha = 0.5;
    for (let b = 0; b < width; b += 90) {
      const bH = 120 + (b * 37 % 140);
      ctx.fillRect(b, height * 0.58 - bH, 65, bH + 80);
    }
    ctx.globalAlpha = 1.0;

    // City Highway / Traffic below
    ctx.fillStyle = '#475569';
    ctx.fillRect(0, height * 0.54, width, height * 0.12);
    // Moving Car Lights on Highway
    for (let c = 0; c < 25; c++) {
      const cx = (c * 110 + t * 40) % width;
      ctx.fillStyle = (c % 2 === 0) ? '#fef08a' : '#ef4444';
      ctx.fillRect(cx, height * 0.56 + (c % 3) * 12, 16, 4);
    }

    // 3. TOWER CRANE ("TURMDREHKRAN") - Giant Background Structure
    const craneX = width * 0.65;
    const craneY = height * 0.1;

    // Crane Vertical Mast (Gittermast-Struktur)
    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 5;
    ctx.strokeRect(craneX - 25, craneY, 50, height * 0.5);

    // Crane Truss Lattice Crosses
    ctx.lineWidth = 2.5;
    for (let cL = craneY; cL < height * 0.5; cL += 40) {
      ctx.beginPath();
      ctx.moveTo(craneX - 25, cL);
      ctx.lineTo(craneX + 25, cL + 40);
      ctx.moveTo(craneX + 25, cL);
      ctx.lineTo(craneX - 25, cL + 40);
      ctx.stroke();
    }

    // Horizontal Jib Boom Arm
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(craneX - 260, craneY + 15);
    ctx.lineTo(craneX + 380, craneY + 15);
    ctx.stroke();

    // Crane Counterweight Block & Cab
    ctx.fillStyle = '#64748b';
    ctx.fillRect(craneX - 240, craneY - 10, 70, 30);
    ctx.fillStyle = '#38bdf8'; // Cab window
    ctx.fillRect(craneX - 10, craneY - 5, 20, 20);

    // Crane Trolley & Suspended Cable with Swinging Steel Beam
    const trolleyX = craneX + 180 + Math.sin(t * 0.002) * 60;
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(trolleyX, craneY + 15);
    ctx.lineTo(trolleyX, craneY + 140);
    ctx.stroke();

    // Suspended Heavy Steel Beam
    ctx.save();
    ctx.translate(trolleyX, craneY + 140);
    ctx.rotate(Math.sin(t * 0.003) * 0.08); // Swaying beam

    ctx.fillStyle = '#dc2626';
    ctx.fillRect(-80, -8, 160, 16);
    ctx.strokeStyle = '#991b1b';
    ctx.lineWidth = 3;
    ctx.strokeRect(-80, -8, 160, 16);
    ctx.restore();

    // 4. ROHBAU STEEL I-BEAMS & CONCRETE FLOOR (Midground / Foreground)
    const floorY = height * 0.62;

    // Unfinished Concrete Floor Slab
    ctx.fillStyle = '#64748b';
    ctx.fillRect(0, floorY, width, height - floorY);
    ctx.fillStyle = '#475569';
    ctx.fillRect(0, floorY, width, 18);

    // Vertical Steel I-Beams (Stahlträger-Säulen)
    const drawIBeam = (bx, by, bw, bh) => {
      ctx.fillStyle = '#991b1b';
      ctx.fillRect(bx, by, bw, bh);

      // Flange Edges
      ctx.fillStyle = '#b91c1c';
      ctx.fillRect(bx, by, 8, bh);
      ctx.fillRect(bx + bw - 8, by, 8, bh);

      // Rivets / Bolts
      ctx.fillStyle = '#f8fafc';
      for (let r = by + 20; r < by + bh; r += 45) {
        ctx.beginPath();
        ctx.arc(bx + 4, r, 2.5, 0, Math.PI * 2);
        ctx.arc(bx + bw - 4, r, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    drawIBeam(width * 0.08, height * 0.22, 45, floorY - height * 0.22);
    drawIBeam(width * 0.86, height * 0.2, 45, floorY - height * 0.2);
    drawIBeam(width * 0.42, height * 0.28, 45, floorY - height * 0.28);

    // Top Overhead Steel Beam Connecting Structure
    ctx.fillStyle = '#991b1b';
    ctx.fillRect(0, height * 0.22, width, 24);
    ctx.fillStyle = '#b91c1c';
    ctx.fillRect(0, height * 0.22, width, 6);

    // Scaffolding Mesh & Safety Railings (Schutzgeländer / Gerüst)
    ctx.strokeStyle = '#ea580c'; // Safety orange
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, floorY - 35);
    ctx.lineTo(width, floorY - 35);
    ctx.stroke();

    for (let sP = 20; sP < width; sP += 80) {
      ctx.beginPath();
      ctx.moveTo(sP, floorY);
      ctx.lineTo(sP, floorY - 35);
      ctx.stroke();
    }

    // 5. CEMENT MIXER ("BETONMISCHER") - Left Foreground
    const mixX = width * 0.22;
    const mixY = height * 0.72;

    // Steel Frame Base
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(mixX - 40, mixY + 15, 80, 20);
    // Wheels
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(mixX - 30, mixY + 35, 14, 0, Math.PI * 2);
    ctx.arc(mixX + 30, mixY + 35, 14, 0, Math.PI * 2);
    ctx.fill();

    // Rotating Orange Mixer Drum
    ctx.save();
    ctx.translate(mixX, mixY - 10);
    ctx.rotate(t * 0.002);

    ctx.fillStyle = '#f97316';
    ctx.shadowColor = '#ea580c';
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.ellipse(0, 0, 48, 32, Math.PI * 0.25, 0, Math.PI * 2);
    ctx.fill();

    // Mixer Drum Stripes
    ctx.fillStyle = '#eab308';
    ctx.fillRect(-15, -25, 30, 8);
    ctx.shadowBlur = 0;
    ctx.restore();

    // 6. PNEUMATIC JACKHAMMER ("PRESSLUFTHAMMER") - Right Foreground
    const jackX = width * 0.78;
    const jackY = height * 0.78;

    ctx.save();
    ctx.translate(jackX, jackY);

    // Vibration Jitter Effect
    const jitt = Math.sin(t * 0.08) * 2;
    ctx.translate(0, jitt);

    // Steel Chisel Point into Concrete
    ctx.fillStyle = '#cbd5e1';
    ctx.beginPath();
    ctx.moveTo(-4, 25);
    ctx.lineTo(0, 45);
    ctx.lineTo(4, 25);
    ctx.closePath();
    ctx.fill();

    // Body Cylinder
    ctx.fillStyle = '#475569';
    ctx.fillRect(-12, -20, 24, 45);

    // Handlebar (T-Griff)
    ctx.fillStyle = '#eab308';
    ctx.fillRect(-35, -28, 70, 10);
    ctx.fillRect(-6, -20, 12, 10);

    // Air Hose (Druckluftschlauch)
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-30, -23);
    ctx.bezierCurveTo(-50, -10, -60, 20, -75, 30);
    ctx.stroke();

    ctx.restore();

    // Safety Traffic Cones & Toolboxes on Floor
    const drawCone = (cx, cy) => {
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.moveTo(cx - 15, cy);
      ctx.lineTo(cx, cy - 35);
      ctx.lineTo(cx + 15, cy);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(cx - 9, cy - 20, 18, 6);
    };

    drawCone(width * 0.48, floorY - 2);
    drawCone(width * 0.54, floorY - 2);

    ctx.restore();
  }

  _renderWesternMine(ctx, width, height, t) {
    ctx.save();

    // 1. Warm Western Desert Sky Gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.55);
    skyGrad.addColorStop(0, '#f97316');
    skyGrad.addColorStop(0.4, '#fbbf24');
    skyGrad.addColorStop(0.8, '#fef08a');
    skyGrad.addColorStop(1, '#fed7aa');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // Glowing Desert Sun
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 30;
    ctx.beginPath();
    ctx.arc(width * 0.78, height * 0.18, 42, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // 2. RED ROCK MOUNTAIN & MINE CAVERN ENTRANCE (Background)
    const mtnY = height * 0.35;

    // Red Sandstone Mountain
    ctx.fillStyle = '#9a3412';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.6);
    ctx.lineTo(width * 0.2, mtnY - 40);
    ctx.lineTo(width * 0.55, mtnY - 80);
    ctx.lineTo(width * 0.85, mtnY - 30);
    ctx.lineTo(width, height * 0.55);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Terracotta Rock Strata Shading
    ctx.fillStyle = '#7c2d12';
    ctx.beginPath();
    ctx.moveTo(width * 0.2, mtnY - 40);
    ctx.lineTo(width * 0.35, mtnY + 30);
    ctx.lineTo(width * 0.55, mtnY - 80);
    ctx.lineTo(width * 0.72, mtnY + 20);
    ctx.lineTo(width * 0.85, mtnY - 30);
    ctx.lineTo(width * 0.55, height * 0.65);
    ctx.closePath();
    ctx.fill();

    // MINE CAVERN MOUTH (Stollenmundloch - Center-Left)
    const caveX = width * 0.28;
    const caveY = height * 0.42;

    // Dark Arch Cave Opening
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(caveX, caveY + 20, 55, Math.PI, 0);
    ctx.fillRect(caveX - 55, caveY + 20, 110, 80);

    // Timber Mine Support Frame (Holzbalken-Verbau)
    ctx.fillStyle = '#451a03';
    ctx.fillRect(caveX - 68, caveY - 10, 22, 115);
    ctx.fillRect(caveX + 46, caveY - 10, 22, 115);
    ctx.fillRect(caveX - 75, caveY - 20, 150, 24);

    // Wooden Grain Highlights
    ctx.fillStyle = '#78350f';
    ctx.fillRect(caveX - 65, caveY - 10, 6, 115);
    ctx.fillRect(caveX + 49, caveY - 10, 6, 115);
    ctx.fillRect(caveX - 75, caveY - 18, 150, 6);

    // Mine Shaft Sign ("GOLD MINE 1849")
    ctx.fillStyle = '#78350f';
    ctx.fillRect(caveX - 50, caveY - 45, 100, 22);
    ctx.strokeStyle = '#451a03';
    ctx.lineWidth = 2;
    ctx.strokeRect(caveX - 50, caveY - 45, 100, 22);
    ctx.fillStyle = '#fde047';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('GOLD MINE 1849', caveX, caveY - 30);

    // 3. DUSTY GRAVEL GROUND (Bottom 40%)
    const groundY = height * 0.62;
    const gGrad = ctx.createLinearGradient(0, groundY, 0, height);
    gGrad.addColorStop(0, '#c2410c');
    gGrad.addColorStop(0.5, '#9a3412');
    gGrad.addColorStop(1, '#78350f');
    ctx.fillStyle = gGrad;
    ctx.fillRect(0, groundY, width, height - groundY);

    // 4. RUSTY ORE CART TRACKS (Lorengleis) - Curved down from Mine Mouth
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 5;

    // Metal Rails
    ctx.beginPath();
    ctx.moveTo(caveX - 25, caveY + 90);
    ctx.lineTo(width * 0.15, height);
    ctx.moveTo(caveX + 25, caveY + 90);
    ctx.lineTo(width * 0.35, height);
    ctx.stroke();

    // Wooden Ties (Schwellen)
    ctx.fillStyle = '#451a03';
    for (let tie = 0; tie < 12; tie++) {
      const tY = caveY + 90 + tie * 22;
      const tX1 = (caveX - 25) + (width * 0.15 - (caveX - 25)) * (tie / 12);
      const tX2 = (caveX + 25) + (width * 0.35 - (caveX + 25)) * (tie / 12);
      ctx.fillRect(tX1 - 12, tY, (tX2 - tX1) + 24, 6);
    }

    // 5. GOLD MINE CART ON TRACKS ("GOLDLORE AUF SCHIENEN")
    const cartX = width * 0.22;
    const cartY = height * 0.76;

    ctx.save();
    ctx.translate(cartX, cartY);

    // Cart Wheels
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.arc(-35, 22, 14, 0, Math.PI * 2);
    ctx.arc(35, 22, 14, 0, Math.PI * 2);
    ctx.fill();

    // Rusty Iron Bucket (Lore-Körper)
    ctx.fillStyle = '#78350f';
    ctx.strokeStyle = '#451a03';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-50, -25);
    ctx.lineTo(-40, 15);
    ctx.lineTo(40, 15);
    ctx.lineTo(50, -25);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Glowing Gold Nuggets overflowing inside Lore
    ctx.fillStyle = '#facc15';
    ctx.shadowColor = '#eab308';
    ctx.shadowBlur = 14;
    for (let g = -35; g <= 35; g += 14) {
      ctx.beginPath();
      ctx.arc(g, -28 + Math.sin(g) * 6, 8, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    ctx.restore();

    // 6. WOODEN CONVEYOR BELT ("FÖRDERBAND-MOTOR") - Right Side
    const convX = width * 0.68;
    const convY = height * 0.45;

    // Inclined Wooden Conveyor Frame
    ctx.save();
    ctx.translate(convX, convY);
    ctx.rotate(-0.35); // Slope up mountain

    ctx.fillStyle = '#451a03';
    ctx.fillRect(-150, -10, 300, 20);

    // Moving Conveyor Belt & Rollers
    ctx.fillStyle = '#1e293b';
    const beltOffset = (t * 40) % 20;
    for (let b = -140; b < 140; b += 20) {
      ctx.fillRect(b + beltOffset - 10, -12, 10, 24);
    }

    // End Wheel / Flywheel (Schwungrad)
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(140, 0, 18, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();

    // Conveyor Wooden Support Stilts
    ctx.strokeStyle = '#451a03';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(convX - 80, convY + 25);
    ctx.lineTo(convX - 80, height * 0.72);
    ctx.moveTo(convX + 60, convY - 25);
    ctx.lineTo(convX + 60, height * 0.68);
    ctx.stroke();

    // 7. WEATHERED MINER'S SHACK & DYNAMITE CRATE
    // Miner Shack (Far Right)
    const shackX = width * 0.82;
    const shackY = height * 0.58;

    ctx.fillStyle = '#78350f';
    ctx.fillRect(shackX, shackY, 130, 90);
    // Tin Roof
    ctx.fillStyle = '#64748b';
    ctx.beginPath();
    ctx.moveTo(shackX - 10, shackY);
    ctx.lineTo(shackX + 65, shackY - 25);
    ctx.lineTo(shackX + 140, shackY);
    ctx.closePath();
    ctx.fill();

    // Smoking Chimney
    ctx.fillStyle = '#334155';
    ctx.fillRect(shackX + 20, shackY - 45, 14, 25);
    // Smoke Puffs
    ctx.fillStyle = 'rgba(203, 213, 225, 0.4)';
    for (let sm = 0; sm < 3; sm++) {
      const smY = shackY - 55 - sm * 18 - (t * 20 % 18);
      ctx.beginPath();
      ctx.arc(shackX + 27 + Math.sin(t * 0.005 + sm) * 10, smY, 8 + sm * 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // DYNAMITE CRATE ("DYNAMITKISTE") - Near Mine Cart
    const dynX = width * 0.42;
    const dynY = height * 0.78;

    ctx.fillStyle = '#b45309';
    ctx.fillRect(dynX, dynY, 45, 35);
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 2;
    ctx.strokeRect(dynX, dynY, 45, 35);

    // Red TNT Sticks
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(dynX + 8, dynY - 10, 8, 12);
    ctx.fillRect(dynX + 20, dynY - 10, 8, 12);
    ctx.fillRect(dynX + 30, dynY - 10, 8, 12);

    // TNT Text
    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('TNT', dynX + 22, dynY + 22);

    // Desert Cacti
    const drawSaguaro = (cx, cy, s) => {
      ctx.fillStyle = '#15803d';
      ctx.fillRect(cx - 3 * s, cy - 35 * s, 6 * s, 35 * s);
      ctx.fillRect(cx - 14 * s, cy - 22 * s, 11 * s, 4 * s);
      ctx.fillRect(cx - 14 * s, cy - 30 * s, 4 * s, 12 * s);
      ctx.fillRect(cx + 3 * s, cy - 16 * s, 11 * s, 4 * s);
      ctx.fillRect(cx + 10 * s, cy - 26 * s, 4 * s, 14 * s);
    };

    drawSaguaro(width * 0.06, height * 0.66, 1.0);
    drawSaguaro(width * 0.94, height * 0.65, 1.15);

    ctx.restore();
  }

  _renderToyBox(ctx, width, height, t) {
    ctx.save();

    // 1. Cardboard / Craft-Paper Wall Backdrop
    const wallGrad = ctx.createLinearGradient(0, 0, 0, height * 0.6);
    wallGrad.addColorStop(0, '#bfdbfe');
    wallGrad.addColorStop(0.6, '#dbeafe');
    wallGrad.addColorStop(1, '#fef08a');
    ctx.fillStyle = wallGrad;
    ctx.fillRect(0, 0, width, height);

    // Cardboard Texture Seams & Strings
    ctx.strokeStyle = '#93c5fd';
    ctx.lineWidth = 2;
    for (let c = 0; c < 5; c++) {
      const stringX = width * 0.15 + c * (width * 0.18);
      // Hanging Strings
      ctx.beginPath();
      ctx.moveTo(stringX, 0);
      ctx.lineTo(stringX, height * 0.22);
      ctx.stroke();

      // Cardboard Cutout Clouds hanging on strings
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#60a5fa';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(stringX - 25, height * 0.22, 25, 0, Math.PI * 2);
      ctx.arc(stringX, height * 0.2, 32, 0, Math.PI * 2);
      ctx.arc(stringX + 25, height * 0.22, 25, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Cardboard Edges
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // 2. WOODEN TOY TRAIN TRACKS (Holz-Modelleisenbahn - Floor Base)
    const floorY = height * 0.62;
    ctx.fillStyle = '#fef3c7'; // Light wooden floor
    ctx.fillRect(0, floorY, width, height - floorY);
    ctx.fillStyle = '#fde68a';
    ctx.fillRect(0, floorY, width, 14);

    // Wooden Grooved Train Tracks (Brio Style)
    const trackY = height * 0.72;
    ctx.fillStyle = '#d97706';
    ctx.fillRect(0, trackY - 12, width, 24);
    // Groove Lines
    ctx.fillStyle = '#78350f';
    ctx.fillRect(0, trackY - 7, width, 4);
    ctx.fillRect(0, trackY + 3, width, 4);

    // 3. COLORFUL WOODEN TOY TRAIN ("HOLZ-MODELLEISENBAHN")
    const trainX = (width * 0.4 + t * 60) % (width + 300) - 150;
    const trainY = trackY - 16;

    // Red Toy Engine (Lokomotive)
    ctx.fillStyle = '#ef4444'; // Red body
    ctx.fillRect(trainX, trainY - 35, 65, 35);
    ctx.fillStyle = '#3b82f6'; // Blue cab
    ctx.fillRect(trainX + 35, trainY - 55, 30, 55);
    // Yellow Funnel
    ctx.fillStyle = '#eab308';
    ctx.fillRect(trainX + 10, trainY - 50, 12, 15);
    // Wheels
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.arc(trainX + 18, trainY + 4, 12, 0, Math.PI * 2);
    ctx.arc(trainX + 48, trainY + 4, 14, 0, Math.PI * 2);
    ctx.fill();

    // Green Toy Wagon
    const wagX = trainX - 85;
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(wagX, trainY - 28, 70, 28);
    // Wagon Wheels
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.arc(wagX + 18, trainY + 4, 10, 0, Math.PI * 2);
    ctx.arc(wagX + 52, trainY + 4, 10, 0, Math.PI * 2);
    ctx.fill();

    // Yellow Toy Cargo Blocks in Wagon
    ctx.fillStyle = '#eab308';
    ctx.fillRect(wagX + 10, trainY - 42, 22, 14);
    ctx.fillStyle = '#ec4899';
    ctx.fillRect(wagX + 36, trainY - 42, 22, 14);

    // 4. STACKED COLORFUL BUILDING BLOCKS ("BUNTER BAUKLOTZTUM")
    const drawBlockTower = (bx, by, scale = 1) => {
      ctx.save();
      ctx.translate(bx, by);

      // Red Cube
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(-30 * scale, -40 * scale, 60 * scale, 40 * scale);
      ctx.strokeStyle = '#b91c1c';
      ctx.lineWidth = 2;
      ctx.strokeRect(-30 * scale, -40 * scale, 60 * scale, 40 * scale);

      // Yellow Cube
      ctx.fillStyle = '#eab308';
      ctx.fillRect(-25 * scale, -80 * scale, 50 * scale, 40 * scale);
      ctx.strokeStyle = '#ca8a04';
      ctx.strokeRect(-25 * scale, -80 * scale, 50 * scale, 40 * scale);

      // Blue Arch / Cylinder
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.arc(0, -100 * scale, 22 * scale, Math.PI, 0);
      ctx.fill();

      // Green Roof Triangle
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.moveTo(-25 * scale, -100 * scale);
      ctx.lineTo(0, -140 * scale);
      ctx.lineTo(25 * scale, -100 * scale);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    // Left Block Tower
    drawBlockTower(width * 0.16, floorY, 1.25);

    // Right Block Castle Structure
    drawBlockTower(width * 0.82, floorY, 1.3);

    // 5. CARDBOARD HOUSES & TREES (Background Cutouts)
    const drawCardboardTree = (tx, ty) => {
      // Trunk
      ctx.fillStyle = '#78350f';
      ctx.fillRect(tx - 8, ty - 40, 16, 40);
      // Crown
      ctx.fillStyle = '#16a34a';
      ctx.beginPath();
      ctx.arc(tx, ty - 65, 32, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#15803d';
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    drawCardboardTree(width * 0.32, floorY);
    drawCardboardTree(width * 0.68, floorY);

    ctx.restore();
  }

  _renderBambooValley(ctx, width, height, t) {
    ctx.save();

    // 1. Misty Asian Mountain Sky & Fog Gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.65);
    skyGrad.addColorStop(0, '#064e3b');
    skyGrad.addColorStop(0.35, '#115e59');
    skyGrad.addColorStop(0.7, '#ccfbf1');
    skyGrad.addColorStop(1, '#ecfdf5');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // Distant Misty Mountain Silhouette
    ctx.fillStyle = '#134e4a';
    ctx.globalAlpha = 0.4;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.48);
    ctx.lineTo(width * 0.25, height * 0.22);
    ctx.lineTo(width * 0.55, height * 0.42);
    ctx.lineTo(width * 0.82, height * 0.25);
    ctx.lineTo(width, height * 0.52);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1.0;

    // Drifting Fog Layers
    ctx.fillStyle = 'rgba(236, 253, 245, 0.4)';
    for (let f = 0; f < 3; f++) {
      const fogY = height * 0.38 + f * 50;
      const fogX = (t * 15 + f * 400) % (width + 600) - 300;
      ctx.beginPath();
      ctx.ellipse(fogX, fogY, 250, 40, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. TRADITIONAL ASIAN PAGODA (Pagoden-Tempel - Center-Right Background)
    const pagX = width * 0.72;
    const pagY = height * 0.32;

    const drawPagodaTier = (py, tw, th) => {
      // Red Temple Walls
      ctx.fillStyle = '#991b1b';
      ctx.fillRect(pagX - tw * 0.4, py, tw * 0.8, th);

      // Curved Golden Roof Eaves
      ctx.fillStyle = '#d97706';
      ctx.beginPath();
      ctx.moveTo(pagX - tw * 0.6, py);
      ctx.quadraticCurveTo(pagX - tw * 0.75, py - 12, pagX - tw * 0.85, py - 20);
      ctx.lineTo(pagX + tw * 0.85, py - 20);
      ctx.quadraticCurveTo(pagX + tw * 0.75, py - 12, pagX + tw * 0.6, py);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(pagX - tw * 0.85, py - 24, tw * 1.7, 5);
    };

    drawPagodaTier(pagY + 60, 110, 35);
    drawPagodaTier(pagY + 20, 85, 30);
    drawPagodaTier(pagY - 15, 60, 25);

    // Spire Spire Tip (Finial)
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.moveTo(pagX - 6, pagY - 38);
    ctx.lineTo(pagX, pagY - 70);
    ctx.lineTo(pagX + 6, pagY - 38);
    ctx.closePath();
    ctx.fill();

    // 3. KOI POND & RED MOON BRIDGE (Mondbrücke - Foreground / Midground)
    const pondY = height * 0.62;
    const pondGrad = ctx.createLinearGradient(0, pondY, 0, height);
    pondGrad.addColorStop(0, '#042f2e');
    pondGrad.addColorStop(0.6, '#0f766e');
    pondGrad.addColorStop(1, '#115e59');
    ctx.fillStyle = pondGrad;
    ctx.fillRect(0, pondY, width, height - pondY);

    // Swimming Orange & White Koi Fish Silhouettes
    for (let k = 0; k < 6; k++) {
      const kx = (k * 180 + t * 25) % width;
      const ky = pondY + 30 + (k % 3) * 25;
      ctx.fillStyle = (k % 2 === 0) ? '#f97316' : '#f8fafc';
      ctx.beginPath();
      ctx.ellipse(kx, ky, 16, 6, Math.sin(t * 0.005 + k) * 0.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Red Arched Moon Bridge (Mondbrücke - Left/Center)
    const brX = width * 0.38;
    const brY = pondY + 10;

    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.arc(brX, brY + 60, 120, Math.PI * 1.15, Math.PI * 1.85);
    ctx.stroke();

    ctx.strokeStyle = '#f87171';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Bridge Posts & Railing Handrails
    ctx.strokeStyle = '#991b1b';
    ctx.lineWidth = 4;
    for (let pAngle = Math.PI * 1.2; pAngle <= Math.PI * 1.8; pAngle += 0.15) {
      const px1 = brX + Math.cos(pAngle) * 115;
      const py1 = (brY + 60) + Math.sin(pAngle) * 115;
      const px2 = brX + Math.cos(pAngle) * 138;
      const py2 = (brY + 60) + Math.sin(pAngle) * 138;
      ctx.beginPath();
      ctx.moveTo(px1, py1);
      ctx.lineTo(px2, py2);
      ctx.stroke();
    }

    // 4. DENSE BAMBOO FOREST (Bambus-Hain - Both Sides & Background)
    const drawBambooStalk = (bx, by, bWidth, bHeight) => {
      // Stalk Body
      ctx.fillStyle = '#16a34a';
      ctx.fillRect(bx - bWidth * 0.5, by - bHeight, bWidth, bHeight);

      // Bamboo Joints (Knoten-Ringe)
      ctx.fillStyle = '#15803d';
      ctx.strokeStyle = '#4ade80';
      ctx.lineWidth = 2;
      for (let j = by - 30; j > by - bHeight; j -= 45) {
        ctx.fillRect(bx - bWidth * 0.6, j, bWidth * 1.2, 4);
      }

      // Pointed Bamboo Leaves
      ctx.fillStyle = '#22c55e';
      for (let l = 0; l < 5; l++) {
        const leafY = by - bHeight * 0.3 - l * 50;
        const lDir = (l % 2 === 0) ? 1 : -1;
        ctx.beginPath();
        ctx.ellipse(bx + lDir * 25, leafY, 28, 7, lDir * 0.4, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // Left Dense Bamboo Grove
    for (let b = 15; b < width * 0.28; b += 35) {
      drawBambooStalk(b, height * 0.78, 14, height * 0.75);
    }

    // Right Dense Bamboo Grove
    for (let b = width * 0.82; b < width - 10; b += 38) {
      drawBambooStalk(b, height * 0.8, 15, height * 0.78);
    }

    // Stone Japanese Lantern (Tōrō - Right Bank)
    const lanX = width * 0.65;
    const lanY = pondY - 15;

    ctx.fillStyle = '#64748b';
    ctx.fillRect(lanX - 12, lanY, 24, 45); // Base
    ctx.fillRect(lanX - 22, lanY - 15, 44, 15); // Shrine
    ctx.fillStyle = '#fef08a';
    ctx.shadowColor = '#fde047';
    ctx.shadowBlur = 12;
    ctx.fillRect(lanX - 14, lanY - 12, 28, 10); // Warm window light
    ctx.shadowBlur = 0;

    // Roof
    ctx.fillStyle = '#475569';
    ctx.beginPath();
    ctx.moveTo(lanX - 30, lanY - 15);
    ctx.lineTo(lanX, lanY - 32);
    ctx.lineTo(lanX + 30, lanY - 15);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  _renderVampireCastle(ctx, width, height, t) {
    ctx.save();

    // 1. Carpathian Gothic Night Sky Gradient (Deep Blood Red & Violet)
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.65);
    skyGrad.addColorStop(0, '#0f0314');
    skyGrad.addColorStop(0.4, '#2d0626');
    skyGrad.addColorStop(0.8, '#581c38');
    skyGrad.addColorStop(1, '#1e0517');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // Glowing Eerie Blood Moon
    const moonX = width * 0.75;
    const moonY = height * 0.22;
    ctx.fillStyle = '#fef08a';
    ctx.shadowColor = '#dc2626';
    ctx.shadowBlur = 40;
    ctx.beginPath();
    ctx.arc(moonX, moonY, 48, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Dark Passing Storm Clouds
    ctx.fillStyle = 'rgba(15, 3, 20, 0.65)';
    ctx.beginPath();
    ctx.arc(moonX - 35, moonY - 10, 45, 0, Math.PI * 2);
    ctx.arc(moonX + 25, moonY + 15, 55, 0, Math.PI * 2);
    ctx.fill();

    // 2. STEEP CARPATHIAN MOUNTAIN PEAK & FORESTS (Background)
    ctx.fillStyle = '#0f0516';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.65);
    ctx.lineTo(width * 0.35, height * 0.28); // Jagged peak
    ctx.lineTo(width * 0.58, height * 0.42);
    ctx.lineTo(width * 0.85, height * 0.3);
    ctx.lineTo(width, height * 0.6);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // 3. IMPOSING GOTHIC VAMPIRE CASTLE ("GOTISCHE FESTUNG" - On Center Peak)
    const casX = width * 0.35;
    const casY = height * 0.28;

    // Castle Base & Main Keep Walls
    ctx.fillStyle = '#1a0927';
    ctx.fillRect(casX - 70, casY, 140, 150);

    // Gothic Pointed Spires & Towers (Schlosstürme)
    const drawSpire = (tx, ty, tw, th) => {
      ctx.fillStyle = '#12051d';
      ctx.fillRect(tx - tw * 0.5, ty, tw, th);

      // Conical Roof
      ctx.fillStyle = '#450a0a';
      ctx.beginPath();
      ctx.moveTo(tx - tw * 0.6, ty);
      ctx.lineTo(tx, ty - th * 0.8);
      ctx.lineTo(tx + tw * 0.6, ty);
      ctx.closePath();
      ctx.fill();
    };

    drawSpire(casX - 55, casY - 30, 30, 60); // Left Tower
    drawSpire(casX + 55, casY - 30, 30, 60); // Right Tower
    drawSpire(casX, casY - 70, 42, 90);      // High Central Keep Spire

    // Lit Stained-Glass Arch Windows (Glowing Red/Yellow)
    const drawGothicWindow = (wx, wy) => {
      ctx.fillStyle = '#ef4444';
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(wx, wy, 8, Math.PI, 0);
      ctx.fillRect(wx - 8, wy, 16, 22);
      ctx.shadowBlur = 0;
    };

    drawGothicWindow(casX - 40, casY + 30);
    drawGothicWindow(casX + 40, casY + 30);
    drawGothicWindow(casX, casY - 20);
    drawGothicWindow(casX, casY + 50);

    // Iron Gate & Drawbridge
    ctx.fillStyle = '#09020d';
    ctx.beginPath();
    ctx.arc(casX, casY + 120, 18, Math.PI, 0);
    ctx.fillRect(casX - 18, casY + 120, 36, 30);

    // 4. ENDLESS PINE FOREST & THICK FOG (Tannenwald & Nebel - Bottom Half)
    const drawPineTree = (px, py, pScale = 1) => {
      ctx.fillStyle = '#07030c';
      for (let t = 0; t < 3; t++) {
        ctx.beginPath();
        ctx.moveTo(px, py - (90 - t * 20) * pScale);
        ctx.lineTo(px - (30 - t * 6) * pScale, py - (50 - t * 20) * pScale);
        ctx.lineTo(px + (30 - t * 6) * pScale, py - (50 - t * 20) * pScale);
        ctx.closePath();
        ctx.fill();
      }
    };

    // Foreground Dense Pine Forest Line
    const woodY = height * 0.68;
    for (let p = -20; p < width + 40; p += 32) {
      const pScale = 0.8 + Math.sin(p * 0.05) * 0.3;
      drawPineTree(p, woodY + 60, pScale);
    }

    // Thick Drifting Carpathian Fog Layers
    ctx.fillStyle = 'rgba(88, 28, 56, 0.45)';
    for (let f = 0; f < 4; f++) {
      const fogY = height * 0.52 + f * 40;
      const fogX = (t * 20 + f * 350) % (width + 500) - 250;
      ctx.beginPath();
      ctx.ellipse(fogX, fogY, 280, 45, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // 5. FLYING VAMPIRIC BATS SILHOUETTES ("FLEDERMAUSSCHWARM")
    const drawBat = (bx, by, bSize = 1) => {
      ctx.save();
      ctx.translate(bx, by);
      const wingFlap = Math.sin(t * 0.015 + bx) * 12;

      ctx.fillStyle = '#05010a';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(-15 * bSize, -15 * bSize + wingFlap, -30 * bSize, -5 * bSize);
      ctx.quadraticCurveTo(-15 * bSize, 5 * bSize, 0, 0);
      ctx.quadraticCurveTo(15 * bSize, 5 * bSize, 30 * bSize, -5 * bSize);
      ctx.quadraticCurveTo(15 * bSize, -15 * bSize + wingFlap, 0, 0);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    // Swarm of Bats crossing the Moon
    drawBat(moonX - 60, moonY - 20, 1.1);
    drawBat(moonX - 20, moonY + 15, 0.95);
    drawBat(moonX + 35, moonY - 30, 1.25);
    drawBat(width * 0.45, height * 0.22, 1.0);
    drawBat(width * 0.52, height * 0.18, 0.8);

    ctx.restore();
  }

  _renderSubwayStation(ctx, width, height, t) {
    ctx.save();

    // 1. Tiled Underground Wall Backdrop
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, width, height);

    // Subway Wall Tiles Pattern Grid
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    for (let x = 0; x <= width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height * 0.65);
      ctx.stroke();
    }
    for (let y = 0; y <= height * 0.65; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // White / Cream Tile Accent Band (Mittelstreifen)
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, height * 0.28, width, 55);
    ctx.fillStyle = '#0284c7'; // Blue line stripe
    ctx.fillRect(0, height * 0.28 + 20, width, 15);

    // Station Name Sign ("U-BAHNHOF CENTRAL")
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 22px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('U-BAHNHOF CENTRAL', width * 0.5, height * 0.28 + 33);

    // 2. ILLUMINATED ADVERTISEMENT BILLBOARDS ("WERBETAFELN")
    const drawBillboard = (bx, by, bw, bh, title, color) => {
      // Outer Frame
      ctx.fillStyle = '#475569';
      ctx.fillRect(bx - 6, by - 6, bw + 12, bh + 12);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 15;
      ctx.fillRect(bx, by, bw, bh);
      ctx.shadowBlur = 0;

      // Poster Inner Content
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 15px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(title, bx + bw * 0.5, by + bh * 0.55);
    };

    drawBillboard(width * 0.12, height * 0.12, 180, 100, '★ MOORHUHN COLA ★', '#dc2626');
    drawBillboard(width * 0.72, height * 0.12, 190, 100, 'CYBER-CYCLES 2026', '#0284c7');

    // 3. FLUORESCENT CEILING LIGHTS (Neonglührohre)
    ctx.fillStyle = '#fef08a';
    ctx.shadowColor = '#fde047';
    ctx.shadowBlur = 20;
    for (let l = 60; l < width; l += 220) {
      ctx.fillRect(l, 8, 120, 8);
    }
    ctx.shadowBlur = 0;

    // 4. SUBWAY PLATFORM EDGE & TRACKS (Platform Floor & Rails)
    const platY = height * 0.65;

    // Concrete Platform Floor
    ctx.fillStyle = '#64748b';
    ctx.fillRect(0, platY, width, 45);

    // Yellow Tactile Warning Tile Line (Gelbe Sicherheitsfliesen)
    ctx.fillStyle = '#eab308';
    ctx.fillRect(0, platY + 32, width, 12);
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 2;
    for (let yT = 0; yT < width; yT += 15) {
      ctx.beginPath();
      ctx.moveTo(yT, platY + 32);
      ctx.lineTo(yT, platY + 44);
      ctx.stroke();
    }

    // TRACK BED (Underground Railway Track Pit)
    const trackY = platY + 45;
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, trackY, width, height - trackY);

    // Wooden Ties & Steel Rails (Gleise)
    ctx.fillStyle = '#334155';
    for (let t = 0; t < width; t += 35) {
      ctx.fillRect(t, trackY + 15, 14, height - trackY - 15);
    }

    ctx.fillStyle = '#94a3b8'; // Steel Rails
    ctx.fillRect(0, trackY + 25, width, 7);
    ctx.fillRect(0, trackY + 55, width, 7);

    // Third Power Rail (Stromschiene with red covers)
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(0, trackY + 75, width, 8);

    // 5. ARRIVING SUBWAY TRAIN ("EINFAHRENDER U-BAHN-ZUG")
    const trainX = (t * 220) % (width + 600) - 500;
    const trainY = trackY - 45;
    const trainW = 480;
    const trainH = 95;

    ctx.save();
    ctx.translate(trainX, trainY);

    // Stainless Steel Body
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(0, 0, trainW, trainH);
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(0, trainH - 18, trainW, 18);

    // Red Front Nose & Accent Stripe
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(trainW - 45, 0, 45, trainH);
    ctx.fillRect(0, 35, trainW, 14);

    // Illuminated Passenger Windows & Interior Warm Glow
    ctx.fillStyle = '#fef08a';
    ctx.shadowColor = '#fde047';
    ctx.shadowBlur = 15;
    for (let w = 20; w < trainW - 60; w += 70) {
      ctx.fillRect(w, 12, 45, 30);
    }
    ctx.shadowBlur = 0;

    // Window Frames
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    for (let w = 20; w < trainW - 60; w += 70) {
      ctx.strokeRect(w, 12, 45, 30);
    }

    // Glowing Front Headlights
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#60a5fa';
    ctx.shadowBlur = 25;
    ctx.beginPath();
    ctx.arc(trainW - 12, trainH - 30, 8, 0, Math.PI * 2);
    ctx.arc(trainW - 12, trainH - 55, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.restore();

    // 6. RAILWAY SIGNAL ("U-BAHN-GLEIS-SIGNAL") - Left Wall
    const sigX = width * 0.05;
    const sigY = platY - 60;

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(sigX - 10, sigY, 20, 50);

    // Green Light Signal
    ctx.fillStyle = '#22c55e';
    ctx.shadowColor = '#4ade80';
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(sigX, sigY + 15, 6, 0, Math.PI * 2);
    ctx.fill();

    // Red Light Signal
    ctx.fillStyle = '#ef4444';
    ctx.shadowColor = '#f87171';
    ctx.beginPath();
    ctx.arc(sigX, sigY + 35, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.restore();
  }

  _renderCloudCastle(ctx, width, height, t) {
    ctx.save();

    // 1. Celestial Sky Gradient (Pastel Blue, Violet, Soft Pink & Sunset Gold)
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
    skyGrad.addColorStop(0, '#38bdf8');
    skyGrad.addColorStop(0.35, '#818cf8');
    skyGrad.addColorStop(0.7, '#f472b6');
    skyGrad.addColorStop(1, '#fef08a');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Radiant Sun Rays & Golden Celestial Light
    ctx.save();
    ctx.globalAlpha = 0.25;
    const sunX = width * 0.5;
    const sunY = height * 0.2;
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2 + t * 0.05;
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.moveTo(sunX, sunY);
      ctx.arc(sunX, sunY, width * 0.8, angle - 0.1, angle + 0.1);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    // 3. Shimmering Rainbow Arch
    ctx.save();
    ctx.globalAlpha = 0.55;
    const rbX = width * 0.5;
    const rbY = height * 0.75;
    const rbRadius = width * 0.42;
    const rainbowColors = [
      'rgba(239, 68, 68, 0.6)',
      'rgba(249, 115, 22, 0.6)',
      'rgba(234, 179, 8, 0.6)',
      'rgba(34, 197, 94, 0.6)',
      'rgba(59, 130, 246, 0.6)',
      'rgba(168, 85, 247, 0.6)'
    ];
    rainbowColors.forEach((color, idx) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.arc(rbX, rbY, rbRadius - idx * 13, Math.PI * 1.05, Math.PI * 1.95);
      ctx.stroke();
    });
    ctx.restore();

    // 4. Distant Floating Cloud Palace Towers & Spires
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#fef08a';
    ctx.shadowBlur = 15;

    // Center Main Cloud Palace Spire
    const castleX = width * 0.5;
    const castleY = height * 0.42;

    // Cloud Castle Base Domes
    ctx.beginPath();
    ctx.arc(castleX - 180, castleY + 60, 90, 0, Math.PI * 2);
    ctx.arc(castleX - 90, castleY + 20, 110, 0, Math.PI * 2);
    ctx.arc(castleX, castleY, 130, 0, Math.PI * 2);
    ctx.arc(castleX + 90, castleY + 20, 110, 0, Math.PI * 2);
    ctx.arc(castleX + 180, castleY + 60, 90, 0, Math.PI * 2);
    ctx.fill();

    // Golden Roof Turrets & Spire Tops
    const turrets = [
      { x: castleX - 160, y: castleY - 40, w: 45, h: 100 },
      { x: castleX - 70, y: castleY - 90, w: 60, h: 140 },
      { x: castleX, y: castleY - 140, w: 75, h: 180 },
      { x: castleX + 70, y: castleY - 90, w: 60, h: 140 },
      { x: castleX + 160, y: castleY - 40, w: 45, h: 100 }
    ];

    turrets.forEach(turret => {
      // White Cloud Pillar
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(turret.x - turret.w / 2, turret.y, turret.w, turret.h);

      // Golden Cone Roof
      ctx.fillStyle = '#f59e0b';
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.moveTo(turret.x - turret.w * 0.7, turret.y);
      ctx.lineTo(turret.x, turret.y - turret.h * 0.6);
      ctx.lineTo(turret.x + turret.w * 0.7, turret.y);
      ctx.closePath();
      ctx.fill();

      // Golden Star Finial
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(turret.x, turret.y - turret.h * 0.6 - 8, 7, 0, Math.PI * 2);
      ctx.fill();
    });

    // 5. Golden Cloud Gate
    const gateX = castleX;
    const gateY = castleY + 30;
    ctx.strokeStyle = '#fbbf24';
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 25;
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(gateX, gateY, 55, Math.PI, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = 'rgba(254, 240, 138, 0.4)';
    ctx.fill();

    // Golden Gate Bars
    for (let bx = -40; bx <= 40; bx += 16) {
      ctx.beginPath();
      ctx.moveTo(gateX + bx, gateY);
      ctx.lineTo(gateX + bx, gateY + 50);
      ctx.stroke();
    }

    // 6. Foreground Fluffy Cloud Bank (Bottom Layer)
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#bae6fd';
    ctx.shadowBlur = 20;
    const fogY = height * 0.78;
    ctx.beginPath();
    for (let x = -100; x < width + 100; x += 130) {
      const cy = fogY + Math.sin(x * 0.005 + t * 0.6) * 15;
      const cr = 140 + Math.cos(x * 0.008) * 35;
      ctx.arc(x, cy, cr, 0, Math.PI * 2);
    }
    ctx.fill();

    ctx.restore();
  }

  _renderMysticMangrove(ctx, width, height, t) {
    ctx.save();

    // 1. Eerie Swamp Sky & Fog Gradient (Emerald Green, Murky Teal, Dark Slate)
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.65);
    skyGrad.addColorStop(0, '#022c22');
    skyGrad.addColorStop(0.4, '#064e3b');
    skyGrad.addColorStop(0.75, '#042f2e');
    skyGrad.addColorStop(1, '#0f766e');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height * 0.65);

    // 2. Murky Water Body (Bottom 35%)
    const waterY = height * 0.62;
    const waterGrad = ctx.createLinearGradient(0, waterY, 0, height);
    waterGrad.addColorStop(0, '#042f2e');
    waterGrad.addColorStop(0.5, '#022c22');
    waterGrad.addColorStop(1, '#011710');
    ctx.fillStyle = waterGrad;
    ctx.fillRect(0, waterY, width, height - waterY);

    // Water Ripples & Eerie Reflections
    ctx.strokeStyle = 'rgba(52, 211, 153, 0.25)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 14; i++) {
      const ry = waterY + 20 + i * 22;
      const waveOffset = Math.sin(t * 1.5 + i * 0.8) * 25;
      ctx.beginPath();
      ctx.moveTo(0, ry);
      ctx.bezierCurveTo(width * 0.25 + waveOffset, ry - 6, width * 0.75 - waveOffset, ry + 6, width, ry);
      ctx.stroke();
    }

    // 3. Tangled Mangrove Stilt Roots in Water
    ctx.save();
    ctx.lineCap = 'round';

    const rootClusters = [
      { x: width * 0.15, scale: 1.2 },
      { x: width * 0.38, scale: 0.9 },
      { x: width * 0.62, scale: 1.1 },
      { x: width * 0.85, scale: 1.3 }
    ];

    rootClusters.forEach(cluster => {
      const cx = cluster.x;
      const baseScale = cluster.scale;

      // Main Trunk
      ctx.strokeStyle = '#1c1917';
      ctx.lineWidth = 35 * baseScale;
      ctx.beginPath();
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx + 20, height * 0.45);
      ctx.stroke();

      // Branching Stilt Roots into Water
      ctx.strokeStyle = '#292524';
      ctx.lineWidth = 14 * baseScale;

      const roots = [
        { dx: -120, dy: 180 }, { dx: -70, dy: 190 }, { dx: -20, dy: 200 },
        { dx: 30, dy: 195 }, { dx: 80, dy: 185 }, { dx: 130, dy: 175 }
      ];

      roots.forEach(r => {
        ctx.beginPath();
        ctx.moveTo(cx + 20, height * 0.45);
        ctx.quadraticCurveTo(cx + r.dx * 0.5, height * 0.55, cx + r.dx, height * 0.45 + r.dy);
        ctx.stroke();

        // Mossy Green Highlights on Roots
        ctx.strokeStyle = 'rgba(21, 128, 61, 0.45)';
        ctx.lineWidth = 4 * baseScale;
        ctx.stroke();
        ctx.strokeStyle = '#292524';
        ctx.lineWidth = 14 * baseScale;
      });
    });
    ctx.restore();

    // 4. Overhanging Mangrove Canopy Leaves
    ctx.fillStyle = '#064e3b';
    ctx.shadowColor = '#022c22';
    ctx.shadowBlur = 20;
    for (let x = -50; x < width + 100; x += 110) {
      const cr = 130 + Math.sin(x * 0.01) * 30;
      ctx.beginPath();
      ctx.arc(x, 40, cr, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = '#042f2e';
    for (let x = 0; x < width; x += 150) {
      const cr = 100 + Math.cos(x * 0.02) * 25;
      ctx.beginPath();
      ctx.arc(x + 40, 80, cr, 0, Math.PI * 2);
      ctx.fill();
    }

    // 5. Glowing Bioluminescent Swamp Will-o'-Wisps (Irrlicht)
    for (let i = 0; i < 8; i++) {
      const wx = (width * 0.1) + (i * 280) % width;
      const wy = height * 0.4 + Math.sin(t * 2 + i) * 25;
      const wPulse = (Math.sin(t * 3 + i * 1.5) + 1) * 0.5;

      ctx.fillStyle = '#34d399';
      ctx.shadowColor = '#6ee7b7';
      ctx.shadowBlur = 25 * wPulse + 10;
      ctx.beginPath();
      ctx.arc(wx, wy, 6 + wPulse * 4, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  _renderOuterSpace(ctx, width, height, t) {
    ctx.save();

    // 1. Deep Cosmic Void Background
    const spaceGrad = ctx.createLinearGradient(0, 0, width, height);
    spaceGrad.addColorStop(0, '#030712');
    spaceGrad.addColorStop(0.5, '#090d16');
    spaceGrad.addColorStop(1, '#111827');
    ctx.fillStyle = spaceGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Andromeda Spiral Galaxy / Cosmic Nebula Swirl
    const galX = width * 0.72;
    const galY = height * 0.38;

    ctx.save();
    ctx.translate(galX, galY);
    ctx.rotate(0.3 + Math.sin(t * 0.1) * 0.05);

    // Glowing Core
    const galGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, 320);
    galGrad.addColorStop(0, 'rgba(254, 240, 138, 0.9)');
    galGrad.addColorStop(0.2, 'rgba(236, 72, 153, 0.75)');
    galGrad.addColorStop(0.5, 'rgba(139, 92, 246, 0.45)');
    galGrad.addColorStop(0.85, 'rgba(56, 189, 248, 0.2)');
    galGrad.addColorStop(1, 'transparent');

    ctx.fillStyle = galGrad;
    ctx.beginPath();
    ctx.ellipse(0, 0, 360, 180, -0.4, 0, Math.PI * 2);
    ctx.fill();

    // Spiral Arms
    ctx.lineWidth = 12;
    for (let arm = 0; arm < 2; arm++) {
      const armOffset = arm * Math.PI;
      ctx.strokeStyle = arm === 0 ? 'rgba(236, 72, 153, 0.4)' : 'rgba(56, 189, 248, 0.4)';
      ctx.shadowColor = arm === 0 ? '#ec4899' : '#38bdf8';
      ctx.shadowBlur = 20;

      ctx.beginPath();
      for (let a = 0; a < Math.PI * 3; a += 0.1) {
        const r = 25 + a * 32;
        const ax = Math.cos(a + armOffset) * r;
        const ay = Math.sin(a + armOffset) * r * 0.5;
        if (a === 0) ctx.moveTo(ax, ay);
        else ctx.lineTo(ax, ay);
      }
      ctx.stroke();
    }
    ctx.restore();

    // 3. Twinkling Background Starfield
    for (let i = 0; i < 90; i++) {
      const sx = (i * 137.5) % width;
      const sy = (i * 293.3) % height;
      const pulse = (Math.sin(t * 3 + i * 2.1) + 1) * 0.5;
      const sSize = 1 + (i % 3) + pulse * 1.5;

      ctx.fillStyle = i % 4 === 0 ? '#38bdf8' : (i % 5 === 0 ? '#ec4899' : '#ffffff');
      ctx.shadowColor = ctx.fillStyle;
      ctx.shadowBlur = pulse * 8;
      ctx.beginPath();
      ctx.arc(sx, sy, sSize, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    // 4. Passing Futurism Spaceship Craft (Fly-by Animation)
    const shipX = ((t * 180) % (width + 600)) - 300;
    const shipY = height * 0.68 + Math.sin(t * 1.2) * 20;

    ctx.save();
    ctx.translate(shipX, shipY);

    // Thruster Trail Glow
    const trailGrad = ctx.createLinearGradient(-160, 0, 0, 0);
    trailGrad.addColorStop(0, 'transparent');
    trailGrad.addColorStop(0.7, 'rgba(56, 189, 248, 0.3)');
    trailGrad.addColorStop(1, '#38bdf8');
    ctx.fillStyle = trailGrad;
    ctx.beginPath();
    ctx.moveTo(-160, -8);
    ctx.lineTo(0, -2);
    ctx.lineTo(0, 2);
    ctx.lineTo(-160, 8);
    ctx.closePath();
    ctx.fill();

    // Spaceship Hull Silhouette
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#38bdf8';
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 15;
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(70, 0);
    ctx.lineTo(15, -18);
    ctx.lineTo(-40, -22);
    ctx.lineTo(-65, -10);
    ctx.lineTo(-65, 10);
    ctx.lineTo(-40, 22);
    ctx.lineTo(15, 18);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Glowing Cockpit Canopy
    ctx.fillStyle = '#67e8f9';
    ctx.shadowColor = '#22d3ee';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.ellipse(20, -4, 18, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
    ctx.restore();
  }

  _renderColosseumArena(ctx, width, height, t) {
    ctx.save();

    // 1. Sunny Mediterranean Sky Gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.6);
    skyGrad.addColorStop(0, '#0284c7');
    skyGrad.addColorStop(0.4, '#38bdf8');
    skyGrad.addColorStop(0.8, '#bae6fd');
    skyGrad.addColorStop(1, '#fef08a');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height * 0.6);

    // Warm Sun & Mediterranean Clouds
    const sunGrad = ctx.createRadialGradient(width * 0.5, height * 0.1, 10, width * 0.5, height * 0.1, 160);
    sunGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    sunGrad.addColorStop(0.3, 'rgba(254, 240, 138, 0.6)');
    sunGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(width * 0.5, height * 0.1, 160, 0, Math.PI * 2);
    ctx.fill();

    // Soft Clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    for (let i = 0; i < 5; i++) {
      const cx = (i * 550 + t * 8) % (width + 300) - 150;
      ctx.beginPath();
      ctx.arc(cx, height * 0.14, 70, 0, Math.PI * 2);
      ctx.arc(cx + 50, height * 0.12, 55, 0, Math.PI * 2);
      ctx.arc(cx - 40, height * 0.15, 45, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Colosseum Multi-Tier Arched Galleries & Spectator Tiers
    const arenaWallY = height * 0.54;
    
    // Distant Upper Ring (Travertine Stone)
    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.ellipse(width * 0.5, height * 0.38, width * 0.58, height * 0.28, 0, Math.PI, Math.PI * 2);
    ctx.fill();

    // Red Velarium Fabric Awnings on Top
    ctx.fillStyle = '#991b1b';
    for (let x = width * 0.1; x < width * 0.9; x += 120) {
      ctx.beginPath();
      ctx.moveTo(x, height * 0.1);
      ctx.lineTo(x + 100, height * 0.1);
      ctx.quadraticCurveTo(x + 50, height * 0.22 + Math.sin(t * 1.5 + x) * 6, x, height * 0.1);
      ctx.fill();
    }

    // Stone Arcades with Spectator Silhouettes
    ctx.fillStyle = '#78350f';
    for (let x = width * 0.08; x < width * 0.92; x += 90) {
      // Upper arches
      ctx.beginPath();
      ctx.arc(x + 40, height * 0.3, 30, Math.PI, 0);
      ctx.lineTo(x + 70, height * 0.38);
      ctx.lineTo(x + 10, height * 0.38);
      ctx.closePath();
      ctx.fill();

      // Spectator dots in arches
      ctx.fillStyle = (x % 180 === 0) ? '#dc2626' : (x % 270 === 0 ? '#fbbf24' : '#ffffff');
      ctx.beginPath();
      ctx.arc(x + 40, height * 0.32, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#78350f';
    }

    // Middle Tier Stone Balcony & Crowd
    ctx.fillStyle = '#d97706';
    ctx.fillRect(width * 0.05, height * 0.38, width * 0.9, height * 0.08);

    // Cheering Roman Crowds
    for (let i = 0; i < 70; i++) {
      const cx = width * 0.06 + (i * 32);
      const cy = height * 0.39 - (i % 3) * 6;
      ctx.fillStyle = i % 3 === 0 ? '#ef4444' : (i % 2 === 0 ? '#f59e0b' : '#f8fafc');
      ctx.beginPath();
      ctx.arc(cx, cy, 5.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Imperial Box (Kaiserliche Loge) in the Center
    const boxX = width * 0.5;
    const boxY = height * 0.40;
    ctx.save();
    ctx.translate(boxX, boxY);

    // Gilded Pediment & Columns
    ctx.fillStyle = '#7e22ce'; // Royal Purple Drapery
    ctx.fillRect(-90, -45, 180, 55);
    ctx.fillStyle = '#f59e0b'; // Gold Trim
    ctx.fillRect(-95, -48, 190, 6);

    // Golden Roman Eagle Crest
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(0, -30, 16, 0, Math.PI * 2);
    ctx.fill();

    // Imperial Balcony Pillars
    ctx.fillStyle = '#f8fafc';
    for (let bx = -80; bx <= 80; bx += 40) {
      ctx.fillRect(bx - 5, -45, 10, 55);
    }
    ctx.restore();

    // 4. Sandy Arena Ground (Sandiger Boden mit Wagenspuren)
    const sandGrad = ctx.createLinearGradient(0, arenaWallY, 0, height);
    sandGrad.addColorStop(0, '#d97706');
    sandGrad.addColorStop(0.3, '#f59e0b');
    sandGrad.addColorStop(0.7, '#fbbf24');
    sandGrad.addColorStop(1, '#d97706');
    ctx.fillStyle = sandGrad;
    ctx.fillRect(0, arenaWallY, width, height - arenaWallY);

    // Chariot Wheel Ruts (Wagenspuren)
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(width * 0.1, height);
    ctx.quadraticCurveTo(width * 0.4, height * 0.75, width * 0.5, arenaWallY + 20);
    ctx.moveTo(width * 0.15, height);
    ctx.quadraticCurveTo(width * 0.43, height * 0.75, width * 0.52, arenaWallY + 20);
    ctx.stroke();

    // Arena Stone Podium Wall
    ctx.fillStyle = '#78350f';
    ctx.fillRect(0, arenaWallY - 14, width, 18);
    ctx.fillStyle = '#fef3c7';
    ctx.fillRect(0, arenaWallY - 18, width, 5);

    // 5. Massive Fluted Marble Columns (Mächtige Marmorsäulen)
    const drawMarbleColumn = (colX, colScale) => {
      ctx.save();
      ctx.translate(colX, height);
      ctx.scale(colScale, colScale);

      // Capital & Base (Travertine & White Marble)
      const colW = 75;
      const colH = -height * 0.95;

      // Base Pedestal
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(-colW * 0.8, -45, colW * 1.6, 45);
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(-colW * 0.7, -70, colW * 1.4, 25);

      // Fluted Shaft
      const colGrad = ctx.createLinearGradient(-colW * 0.5, 0, colW * 0.5, 0);
      colGrad.addColorStop(0, '#94a3b8');
      colGrad.addColorStop(0.2, '#e2e8f0');
      colGrad.addColorStop(0.5, '#ffffff');
      colGrad.addColorStop(0.8, '#cbd5e1');
      colGrad.addColorStop(1, '#64748b');
      ctx.fillStyle = colGrad;
      ctx.fillRect(-colW * 0.5, colH + 60, colW, -colH - 130);

      // Fluting lines
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.4)';
      ctx.lineWidth = 3;
      for (let fx = -colW * 0.4; fx <= colW * 0.4; fx += 14) {
        ctx.beginPath();
        ctx.moveTo(fx, colH + 60);
        ctx.lineTo(fx, -70);
        ctx.stroke();
      }

      // Corinthian / Ornate Capital
      ctx.fillStyle = '#f1f5f9';
      ctx.beginPath();
      ctx.moveTo(-colW * 0.8, colH);
      ctx.lineTo(colW * 0.8, colH);
      ctx.lineTo(colW * 0.5, colH + 60);
      ctx.lineTo(-colW * 0.5, colH + 60);
      ctx.closePath();
      ctx.fill();

      // Gold Laurel Ornament on Capital
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(0, colH + 30, 15, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    drawMarbleColumn(width * 0.08, 1.15);
    drawMarbleColumn(width * 0.32, 0.85);
    drawMarbleColumn(width * 0.68, 0.85);
    drawMarbleColumn(width * 0.92, 1.15);

    // 6. Gladiator Weapon Details on Ground
    // Golden Helmet
    ctx.save();
    ctx.translate(520, height * 0.82);
    ctx.fillStyle = '#f59e0b';
    ctx.shadowColor = '#d97706';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(0, 0, 24, Math.PI, 0);
    ctx.lineTo(18, 15);
    ctx.lineTo(-18, 15);
    ctx.closePath();
    ctx.fill();
    // Red Crest
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.ellipse(0, -22, 28, 9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Roman Legionary Shield (Scutum)
    ctx.save();
    ctx.translate(1860, height * 0.82);
    ctx.rotate(0.2);
    ctx.fillStyle = '#dc2626';
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(-24, -45, 48, 90, 8);
    ctx.fill();
    ctx.stroke();
    // Gold Boss & Wings
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(0, 0, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.restore();
  }

  _renderSkiResort(ctx, width, height, t) {
    ctx.save();

    // 1. Crisp Brilliant Blue Alpine Sky
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.55);
    skyGrad.addColorStop(0, '#0284c7');
    skyGrad.addColorStop(0.5, '#38bdf8');
    skyGrad.addColorStop(1, '#e0f2fe');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height * 0.55);

    // Brilliant Winter Sun & Flare
    const sunX = width * 0.28;
    const sunY = height * 0.12;
    const sunGrad = ctx.createRadialGradient(sunX, sunY, 15, sunX, sunY, 140);
    sunGrad.addColorStop(0, '#ffffff');
    sunGrad.addColorStop(0.25, 'rgba(254, 240, 138, 0.9)');
    sunGrad.addColorStop(0.6, 'rgba(56, 189, 248, 0.3)');
    sunGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 140, 0, Math.PI * 2);
    ctx.fill();

    // 2. Jagged Alpine Mountain Peaks (Background)
    ctx.fillStyle = '#94a3b8';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.35);
    ctx.lineTo(width * 0.15, height * 0.16);
    ctx.lineTo(width * 0.32, height * 0.32);
    ctx.lineTo(width * 0.48, height * 0.14);
    ctx.lineTo(width * 0.65, height * 0.28);
    ctx.lineTo(width * 0.82, height * 0.12);
    ctx.lineTo(width, height * 0.35);
    ctx.lineTo(width, height * 0.6);
    ctx.lineTo(0, height * 0.6);
    ctx.closePath();
    ctx.fill();

    // Snow-Capped Alpine Glaciers on Peaks
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(width * 0.15, height * 0.16);
    ctx.lineTo(width * 0.22, height * 0.24);
    ctx.lineTo(width * 0.18, height * 0.25);
    ctx.lineTo(width * 0.15, height * 0.21);
    ctx.lineTo(width * 0.10, height * 0.26);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(width * 0.48, height * 0.14);
    ctx.lineTo(width * 0.56, height * 0.24);
    ctx.lineTo(width * 0.51, height * 0.26);
    ctx.lineTo(width * 0.48, height * 0.20);
    ctx.lineTo(width * 0.42, height * 0.25);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(width * 0.82, height * 0.12);
    ctx.lineTo(width * 0.90, height * 0.23);
    ctx.lineTo(width * 0.84, height * 0.25);
    ctx.lineTo(width * 0.82, height * 0.19);
    ctx.lineTo(width * 0.76, height * 0.24);
    ctx.closePath();
    ctx.fill();

    // 3. Rolling Ski Slopes (Schneehügel & Skipisten)
    const slopeGrad = ctx.createLinearGradient(0, height * 0.3, 0, height);
    slopeGrad.addColorStop(0, '#f1f5f9');
    slopeGrad.addColorStop(0.4, '#ffffff');
    slopeGrad.addColorStop(0.8, '#e2e8f0');
    slopeGrad.addColorStop(1, '#cbd5e1');
    ctx.fillStyle = slopeGrad;

    // Back slope
    ctx.beginPath();
    ctx.moveTo(0, height * 0.45);
    ctx.quadraticCurveTo(width * 0.4, height * 0.38, width, height * 0.48);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Main downhill ski piste (foreground & middle)
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.58);
    ctx.bezierCurveTo(width * 0.3, height * 0.50, width * 0.7, height * 0.65, width, height * 0.54);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Groomed Ski Corduroy Tracks (Pistenraupen-Rillen)
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
    ctx.lineWidth = 2.5;
    for (let i = 0; i < 9; i++) {
      ctx.beginPath();
      const sx = width * 0.25 + i * 45;
      ctx.moveTo(sx, height * 0.55);
      ctx.quadraticCurveTo(sx + 80, height * 0.75, sx + 40, height);
      ctx.stroke();
    }

    // 4. Chairlift System (Sessellift)
    // Steel Lift Pylons
    const drawPylon = (px, py, pScale) => {
      ctx.save();
      ctx.translate(px, py);
      ctx.scale(pScale, pScale);
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 5;
      // Mast
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -140);
      ctx.stroke();
      // T-Arm
      ctx.beginPath();
      ctx.moveTo(-45, -135);
      ctx.lineTo(45, -135);
      ctx.stroke();
      // Cable wheels
      ctx.fillStyle = '#ea580c';
      ctx.beginPath();
      ctx.arc(-45, -135, 6, 0, Math.PI * 2);
      ctx.arc(45, -135, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    drawPylon(width * 0.45, height * 0.58, 0.75);
    drawPylon(width * 0.68, height * 0.50, 0.95);
    drawPylon(width * 0.90, height * 0.42, 1.15);

    // Lift Cable
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(width * 0.35, height * 0.52);
    ctx.lineTo(width * 0.45, height * 0.47);
    ctx.lineTo(width * 0.68, height * 0.37);
    ctx.lineTo(width * 0.90, height * 0.26);
    ctx.stroke();

    // Moving Chairlift Chairs with Skiers
    const liftOffset = (t * 40) % (width * 0.55);
    const chairX = width * 0.40 + liftOffset;
    const chairY = height * 0.50 - (liftOffset * 0.4);

    ctx.save();
    ctx.translate(chairX, chairY);
    // Hanger rod
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 28);
    ctx.lineTo(-8, 32);
    ctx.stroke();
    // Chair seat
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(-18, 30, 24, 6);
    ctx.fillRect(-18, 16, 5, 15);
    // Tiny Skier figure
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(-8, 20, 6, 0, Math.PI * 2);
    ctx.fill();
    // Skis dangling
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-16, 44);
    ctx.lineTo(12, 38);
    ctx.stroke();
    ctx.restore();

    // 5. Cozy Wooden Alpine Ski Hut (Skihütte) on Right
    const hutX = 1920;
    const hutY = height * 0.55;
    ctx.save();
    ctx.translate(hutX, hutY);

    // Wooden Log Walls
    ctx.fillStyle = '#78350f';
    ctx.fillRect(-110, -60, 220, 110);
    // Wood Planks texture
    ctx.strokeStyle = '#451a03';
    ctx.lineWidth = 2;
    for (let ly = -50; ly < 50; ly += 14) {
      ctx.beginPath();
      ctx.moveTo(-110, ly);
      ctx.lineTo(110, ly);
      ctx.stroke();
    }

    // Warm Glowing Windows
    ctx.fillStyle = '#fde047';
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 15;
    ctx.fillRect(-80, -25, 35, 30);
    ctx.fillRect(45, -25, 35, 30);
    ctx.shadowBlur = 0;
    // Window frames
    ctx.strokeStyle = '#451a03';
    ctx.lineWidth = 2;
    ctx.strokeRect(-80, -25, 35, 30);
    ctx.strokeRect(45, -25, 35, 30);

    // Wooden Balcony Railing
    ctx.fillStyle = '#92400e';
    ctx.fillRect(-120, 15, 240, 10);
    for (let rx = -115; rx <= 115; rx += 18) {
      ctx.fillRect(rx, 25, 6, 25);
    }

    // Stone Chimney
    ctx.fillStyle = '#64748b';
    ctx.fillRect(55, -120, 28, 65);
    // Chimney Smoke Puffs
    ctx.fillStyle = 'rgba(226, 232, 240, 0.65)';
    for (let s = 0; s < 4; s++) {
      const sx = 70 + Math.sin(t * 2 + s) * 12 + s * 14;
      const sy = -130 - s * 22;
      ctx.beginPath();
      ctx.arc(sx, sy, 10 + s * 5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Heavy Snow Pillow on Roof
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#bae6fd';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(-145, -60);
    ctx.lineTo(0, -115);
    ctx.lineTo(145, -60);
    ctx.quadraticCurveTo(125, -45, 90, -50);
    ctx.quadraticCurveTo(30, -42, 0, -48);
    ctx.quadraticCurveTo(-45, -42, -90, -50);
    ctx.quadraticCurveTo(-125, -45, -145, -60);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();

    // 6. Snow Cannon (Schneekanone) on Left
    const scX = 440;
    const scY = height * 0.72;
    ctx.save();
    ctx.translate(scX, scY);

    // Tripod Base
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-30, 45);
    ctx.moveTo(0, 0);
    ctx.lineTo(30, 45);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 50);
    ctx.stroke();

    // Cannon Barrel (Blue/Yellow Metal)
    ctx.fillStyle = '#0284c7';
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 3;
    ctx.save();
    ctx.rotate(0.35); // Aiming uphill
    ctx.beginPath();
    ctx.rect(-35, -18, 70, 36);
    ctx.fill();
    ctx.stroke();
    // Nozzle Ring
    ctx.fillStyle = '#0369a1';
    ctx.fillRect(25, -22, 14, 44);
    ctx.restore();

    // Snow Mist Spray Cone (Schneenebel-Strahl)
    const mistGrad = ctx.createLinearGradient(20, 0, 240, -60);
    mistGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    mistGrad.addColorStop(0.4, 'rgba(224, 242, 254, 0.65)');
    mistGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = mistGrad;
    ctx.beginPath();
    ctx.moveTo(25, 5);
    ctx.lineTo(260, -90);
    ctx.lineTo(280, 20);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // 7. Dense Snow-Covered Evergreen Pine Trees (Verschneite Tannen)
    const drawSnowyPine = (tx, ty, tScale) => {
      ctx.save();
      ctx.translate(tx, ty);
      ctx.scale(tScale, tScale);

      // Trunk
      ctx.fillStyle = '#451a03';
      ctx.fillRect(-8, -25, 16, 30);

      // Green Tiered Branches
      const tiers = [
        { w: 75, h: 45, y: -40 },
        { w: 60, h: 40, y: -70 },
        { w: 42, h: 35, y: -95 },
        { w: 25, h: 30, y: -115 }
      ];

      tiers.forEach(tr => {
        ctx.fillStyle = '#064e3b';
        ctx.beginPath();
        ctx.moveTo(0, tr.y - tr.h);
        ctx.lineTo(tr.w * 0.5, tr.y);
        ctx.lineTo(-tr.w * 0.5, tr.y);
        ctx.closePath();
        ctx.fill();

        // Thick White Snow Blanket on each tier
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(0, tr.y - tr.h);
        ctx.lineTo(tr.w * 0.5, tr.y);
        ctx.quadraticCurveTo(tr.w * 0.25, tr.y - 12, 0, tr.y - 8);
        ctx.quadraticCurveTo(-tr.w * 0.25, tr.y - 12, -tr.w * 0.5, tr.y);
        ctx.closePath();
        ctx.fill();
      });

      ctx.restore();
    };

    drawSnowyPine(width * 0.08, height * 0.68, 1.25);
    drawSnowyPine(width * 0.16, height * 0.62, 0.95);
    drawSnowyPine(width * 0.22, height * 0.58, 0.75);
    drawSnowyPine(width * 0.78, height * 0.65, 0.85);
    drawSnowyPine(width * 0.85, height * 0.72, 1.15);

    // 8. Distant Carving Skiers
    const skiers = [
      { x: width * 0.35, y: height * 0.62, color: '#ef4444' },
      { x: width * 0.48, y: height * 0.68, color: '#3b82f6' },
      { x: width * 0.58, y: height * 0.75, color: '#eab308' }
    ];

    skiers.forEach(s => {
      ctx.save();
      ctx.translate(s.x, s.y);
      // Body
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(0, -14, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(-4, -10, 8, 10);
      // Skis
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(-12, 4);
      ctx.lineTo(12, 0);
      ctx.stroke();
      ctx.restore();
    });

    ctx.restore();
  }

  _renderIcelandGeysir(ctx, width, height, t) {
    ctx.save();

    // 1. Moody Dramatic Icelandic Sky Gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.6);
    skyGrad.addColorStop(0, '#1e293b');
    skyGrad.addColorStop(0.35, '#334155');
    skyGrad.addColorStop(0.7, '#64748b');
    skyGrad.addColorStop(1, '#fed7aa');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height * 0.6);

    // Sunbeams breaking through dark clouds
    const sunX = width * 0.52;
    const sunY = height * 0.22;
    ctx.save();
    ctx.globalAlpha = 0.25;
    ctx.fillStyle = '#fef08a';
    for (let r = -4; r <= 4; r++) {
      ctx.beginPath();
      ctx.moveTo(sunX, sunY);
      ctx.lineTo(sunX + r * 160 - 40, height * 0.65);
      ctx.lineTo(sunX + r * 160 + 40, height * 0.65);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    // Dramatic Rolling Storm Clouds (Layered Gray & Charcoal)
    ctx.fillStyle = 'rgba(30, 41, 59, 0.75)';
    for (let c = 0; c < 8; c++) {
      const cx = (c * 360 + t * 6) % (width + 300) - 150;
      ctx.beginPath();
      ctx.arc(cx, height * 0.12, 110, 0, Math.PI * 2);
      ctx.arc(cx + 80, height * 0.10, 85, 0, Math.PI * 2);
      ctx.arc(cx - 70, height * 0.14, 75, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Distant Volcanic Mountains & Ridges
    ctx.fillStyle = '#475569';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.45);
    ctx.lineTo(width * 0.15, height * 0.32);
    ctx.lineTo(width * 0.35, height * 0.42);
    ctx.lineTo(width * 0.52, height * 0.30);
    ctx.lineTo(width * 0.72, height * 0.44);
    ctx.lineTo(width * 0.88, height * 0.33);
    ctx.lineTo(width, height * 0.45);
    ctx.lineTo(width, height * 0.65);
    ctx.lineTo(0, height * 0.65);
    ctx.closePath();
    ctx.fill();

    // 3. Volcanic Mossy Rolling Hills
    const hillGrad = ctx.createLinearGradient(0, height * 0.4, 0, height);
    hillGrad.addColorStop(0, '#365314');
    hillGrad.addColorStop(0.3, '#4d7c0f');
    hillGrad.addColorStop(0.7, '#65a30d');
    hillGrad.addColorStop(1, '#1c1917');
    ctx.fillStyle = hillGrad;

    ctx.beginPath();
    ctx.moveTo(0, height * 0.52);
    ctx.bezierCurveTo(width * 0.25, height * 0.46, width * 0.75, height * 0.58, width, height * 0.50);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // 4. Black Volcanic Lava Rocks & Glowing Moss Patches in Foreground
    const rockGrad = ctx.createLinearGradient(0, height * 0.65, 0, height);
    rockGrad.addColorStop(0, '#1c1917');
    rockGrad.addColorStop(0.5, '#292524');
    rockGrad.addColorStop(1, '#0c0a09');
    ctx.fillStyle = rockGrad;

    ctx.beginPath();
    ctx.moveTo(0, height * 0.68);
    ctx.bezierCurveTo(width * 0.3, height * 0.60, width * 0.7, height * 0.72, width, height * 0.66);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Bright Emerald Green Moss Carpets on Lava
    ctx.fillStyle = '#65a30d';
    for (let m = 0; m < 9; m++) {
      const mx = width * 0.05 + m * 260;
      const my = height * 0.72 + (m % 3) * 35;
      ctx.beginPath();
      ctx.ellipse(mx, my, 85, 24, 0.1, 0, Math.PI * 2);
      ctx.fill();

      // Highlight inner moss
      ctx.fillStyle = '#84cc16';
      ctx.beginPath();
      ctx.ellipse(mx - 10, my - 4, 55, 15, 0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#65a30d';
    }

    // 5. Steaming Turquoise Geothermal Hot Springs (Heiße Quellen)
    const poolX = 1450;
    const poolY = height * 0.74;

    ctx.save();
    ctx.translate(poolX, poolY);

    // Sulfur Mineral Crust Rim (Golden Orange / Yellow)
    ctx.fillStyle = '#f59e0b';
    ctx.shadowColor = '#d97706';
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.ellipse(0, 0, 240, 75, -0.05, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#fde047';
    ctx.beginPath();
    ctx.ellipse(0, 0, 215, 62, -0.05, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Glowing Turquoise Hot Water
    const poolWater = ctx.createRadialGradient(0, 0, 10, 0, 0, 190);
    poolWater.addColorStop(0, '#67e8f9');
    poolWater.addColorStop(0.4, '#22d3ee');
    poolWater.addColorStop(0.75, '#06b6d4');
    poolWater.addColorStop(1, '#0891b2');
    ctx.fillStyle = poolWater;
    ctx.beginPath();
    ctx.ellipse(0, 0, 190, 52, -0.05, 0, Math.PI * 2);
    ctx.fill();

    // Hot Spring Rising Steam Puffs
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    for (let sp = 0; sp < 5; sp++) {
      const sx = Math.sin(t * 1.5 + sp) * 60 + (sp - 2) * 55;
      const sy = -20 - (t * 20 + sp * 18) % 75;
      ctx.beginPath();
      ctx.arc(sx, sy, 18 + sp * 6, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // 6. Giant Erupting Geyser (Riesen-Geysir in Center)
    const gX = 1200;
    const gY = height * 0.52;

    ctx.save();
    ctx.translate(gX, gY);

    // Geyser Eruption Crater / Mound
    ctx.fillStyle = '#44403c';
    ctx.beginPath();
    ctx.ellipse(0, 15, 140, 35, 0, 0, Math.PI * 2);
    ctx.fill();

    // Eruption animation cycle: pulse between high jet and steaming peak
    const eruptionHeight = 260 + Math.sin(t * 4) * 45;

    // Outer Billowing Steam Plume
    const steamGrad = ctx.createLinearGradient(0, 10, 0, -eruptionHeight - 60);
    steamGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    steamGrad.addColorStop(0.5, 'rgba(224, 242, 254, 0.8)');
    steamGrad.addColorStop(1, 'rgba(241, 245, 249, 0.25)');
    ctx.fillStyle = steamGrad;

    ctx.beginPath();
    ctx.moveTo(-45, 10);
    ctx.quadraticCurveTo(-90, -eruptionHeight * 0.6, -55, -eruptionHeight);
    ctx.quadraticCurveTo(0, -eruptionHeight - 75, 55, -eruptionHeight);
    ctx.quadraticCurveTo(90, -eruptionHeight * 0.6, 45, 10);
    ctx.closePath();
    ctx.fill();

    // Inner Powerful Water Jet Spout (Crystal Ice Blue & White)
    const waterJet = ctx.createLinearGradient(0, 10, 0, -eruptionHeight);
    waterJet.addColorStop(0, '#ffffff');
    waterJet.addColorStop(0.3, '#bae6fd');
    waterJet.addColorStop(0.7, '#38bdf8');
    waterJet.addColorStop(1, '#ffffff');
    ctx.fillStyle = waterJet;
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 20;

    ctx.beginPath();
    ctx.moveTo(-22, 10);
    ctx.lineTo(-14, -eruptionHeight * 0.9);
    ctx.lineTo(0, -eruptionHeight);
    ctx.lineTo(14, -eruptionHeight * 0.9);
    ctx.lineTo(22, 10);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;

    // Surrounding Geyser Splash Droplets & Base Foaming
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(0, 10, 75, 20, 0, 0, Math.PI * 2);
    ctx.fill();

    for (let dp = 0; dp < 12; dp++) {
      const dpx = (Math.sin(dp * 1.7 + t * 5) * 85);
      const dpy = -30 - Math.abs(Math.cos(dp * 2.3 + t * 4)) * (eruptionHeight * 0.85);
      ctx.beginPath();
      ctx.arc(dpx, dpy, 3 + (dp % 3) * 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // 7. Hexagonal Basalt Column Formations (Basaltsäulen) on Right
    const drawBasaltCluster = (bx, by) => {
      ctx.save();
      ctx.translate(bx, by);

      const columns = [
        { x: 0, h: 140, w: 26, c: '#292524' },
        { x: 24, h: 175, w: 26, c: '#1c1917' },
        { x: 48, h: 195, w: 26, c: '#27272a' },
        { x: 72, h: 160, w: 26, c: '#18181b' },
        { x: 96, h: 120, w: 26, c: '#292524' },
        { x: -24, h: 110, w: 26, c: '#3f3f46' },
        { x: 12, h: 155, w: 24, c: '#1c1917' },
        { x: 36, h: 180, w: 24, c: '#27272a' },
        { x: 60, h: 140, w: 24, c: '#18181b' }
      ];

      columns.forEach(col => {
        // Vertical column body
        ctx.fillStyle = col.c;
        ctx.fillRect(col.x, -col.h, col.w, col.h);
        ctx.strokeStyle = '#09090b';
        ctx.lineWidth = 2;
        ctx.strokeRect(col.x, -col.h, col.w, col.h);

        // Hexagonal Cap
        ctx.fillStyle = '#52525b';
        ctx.beginPath();
        ctx.moveTo(col.x, -col.h);
        ctx.lineTo(col.x + col.w * 0.5, -col.h - 8);
        ctx.lineTo(col.x + col.w, -col.h);
        ctx.lineTo(col.x + col.w * 0.5, -col.h + 6);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Moss cap on top of some columns
        if (col.h > 150) {
          ctx.fillStyle = '#84cc16';
          ctx.beginPath();
          ctx.arc(col.x + col.w * 0.5, -col.h - 2, 8, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.restore();
    };

    drawBasaltCluster(2000, height * 0.72);

    ctx.restore();
  }

  _renderGiantBakery(ctx, width, height, t) {
    ctx.save();

    // 1. Warm Industrial Bakery Brick Background & Arched Windows
    const wallGrad = ctx.createLinearGradient(0, 0, 0, height * 0.7);
    wallGrad.addColorStop(0, '#451a03');
    wallGrad.addColorStop(0.3, '#7c2d12');
    wallGrad.addColorStop(0.7, '#9a3412');
    wallGrad.addColorStop(1, '#c2410c');
    ctx.fillStyle = wallGrad;
    ctx.fillRect(0, 0, width, height * 0.7);

    // Warm Sunbeams from Arched Windows
    for (let w = 0; w < 4; w++) {
      const winX = width * 0.28 + w * 420;
      const winY = height * 0.26;

      // Window Frame & Countryside Glass
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(winX, winY - 35, 45, Math.PI, 0);
      ctx.lineTo(winX + 45, winY + 60);
      ctx.lineTo(winX - 45, winY + 60);
      ctx.closePath();
      ctx.fill();

      // Window Panes
      ctx.strokeStyle = '#451a03';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Warm Golden Sunbeam
      ctx.save();
      ctx.globalAlpha = 0.18;
      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.moveTo(winX - 40, winY + 60);
      ctx.lineTo(winX - 160, height);
      ctx.lineTo(winX + 60, height);
      ctx.lineTo(winX + 40, winY + 60);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // Heavy Wooden Ceiling Beams
    ctx.fillStyle = '#291205';
    ctx.fillRect(0, height * 0.08, width, 24);
    for (let bx = width * 0.1; bx < width; bx += 320) {
      ctx.fillRect(bx, 0, 22, height * 0.18);
    }

    // 2. Stone & Timber Floor (Boden mit Mehlstaub)
    const floorY = height * 0.65;
    const floorGrad = ctx.createLinearGradient(0, floorY, 0, height);
    floorGrad.addColorStop(0, '#78350f');
    floorGrad.addColorStop(0.5, '#592507');
    floorGrad.addColorStop(1, '#3b1704');
    ctx.fillStyle = floorGrad;
    ctx.fillRect(0, floorY, width, height - floorY);

    // White Flour Dust Patches on Floor
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    for (let f = 0; f < 10; f++) {
      const fx = (f * 240 + 60) % width;
      const fy = floorY + 25 + (f % 3) * 35;
      ctx.beginPath();
      ctx.ellipse(fx, fy, 85, 20, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Colossal Brick & Iron Baking Oven on Left (Riesen-Backofen)
    const ovenX = 460;
    const ovenY = height * 0.52;
    ctx.save();
    ctx.translate(ovenX, ovenY);

    // Brick Oven Arch
    ctx.fillStyle = '#3f1a0a';
    ctx.fillRect(-220, -180, 440, 240);
    ctx.fillStyle = '#9a3412';
    ctx.beginPath();
    ctx.arc(0, -50, 160, Math.PI, 0);
    ctx.lineTo(160, 50);
    ctx.lineTo(-160, 50);
    ctx.closePath();
    ctx.fill();

    // Stone Arch Brim
    ctx.strokeStyle = '#271005';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.arc(0, -50, 160, Math.PI, 0);
    ctx.stroke();

    // Glowing Fiery Hearth Mouth (Glühender Ofen)
    const fireGrad = ctx.createRadialGradient(0, -20, 10, 0, -20, 110);
    fireGrad.addColorStop(0, '#fef08a');
    fireGrad.addColorStop(0.3, '#f59e0b');
    fireGrad.addColorStop(0.7, '#ea580c');
    fireGrad.addColorStop(1, '#991b1b');
    ctx.fillStyle = fireGrad;
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 35 + Math.sin(t * 5) * 10;

    ctx.beginPath();
    ctx.arc(0, -20, 110, Math.PI, 0);
    ctx.lineTo(110, 30);
    ctx.lineTo(-110, 30);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;

    // Golden Bread Loaves Baking on Hearth
    for (let b = -2; b <= 2; b++) {
      ctx.fillStyle = '#d97706';
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(b * 40, 15, 18, 9, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    // Giant Wooden Peel / Bread Shovel (Brotschieber)
    ctx.save();
    ctx.rotate(0.35);
    ctx.fillStyle = '#b45309';
    ctx.fillRect(-180, -220, 12, 280);
    ctx.fillRect(-205, -280, 62, 70);
    ctx.restore();

    ctx.restore();

    // 4. Giant Sacks of Flour on Wooden Pallet (Riesen-Mehlsäcke)
    const sackX = 960;
    const sackY = height * 0.78;
    ctx.save();
    ctx.translate(sackX, sackY);

    // Wooden Pallet Base
    ctx.fillStyle = '#78350f';
    ctx.fillRect(-150, 15, 300, 18);
    for (let px = -130; px <= 130; px += 65) {
      ctx.fillRect(px, 33, 22, 14);
    }

    // Burlap Flour Sacks
    const drawSack = (sx, sy, rot, scale) => {
      ctx.save();
      ctx.translate(sx, sy);
      ctx.rotate(rot);
      ctx.scale(scale, scale);

      ctx.fillStyle = '#d6bc96';
      ctx.strokeStyle = '#8c6b45';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(-55, -35, 110, 70, 20);
      ctx.fill();
      ctx.stroke();

      // White Flour Spill Highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.beginPath();
      ctx.ellipse(0, 5, 35, 15, 0, 0, Math.PI * 2);
      ctx.fill();

      // "MEHL" label stamp
      ctx.fillStyle = '#451a03';
      ctx.font = 'bold 15px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('MEHL', 0, 2);

      ctx.restore();
    };

    drawSack(-60, 0, -0.08, 1.1);
    drawSack(60, 0, 0.08, 1.1);
    drawSack(0, -45, 0.02, 1.05);
    drawSack(90, -35, 0.18, 0.95);

    ctx.restore();

    // 5. Huge Steaming Dough Mixing Cauldron Vat (Teigkessel)
    const vatX = 1420;
    const vatY = height * 0.62;
    ctx.save();
    ctx.translate(vatX, vatY);

    // Heavy Industrial Stand & Gears
    ctx.fillStyle = '#334155';
    ctx.fillRect(-120, 20, 240, 22);
    ctx.fillRect(-90, 42, 25, 45);
    ctx.fillRect(65, 42, 25, 45);

    // Rotating Cog Gear
    ctx.save();
    ctx.translate(115, 15);
    ctx.rotate(t * 1.5);
    ctx.fillStyle = '#64748b';
    ctx.beginPath();
    ctx.arc(0, 0, 28, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 4;
    ctx.stroke();
    for (let g = 0; g < 6; g++) {
      ctx.fillRect(-4, -36, 8, 12);
      ctx.rotate(Math.PI / 3);
    }
    ctx.restore();

    // Copper / Steel Cauldron Bowl
    const vatGrad = ctx.createLinearGradient(-110, 0, 110, 0);
    vatGrad.addColorStop(0, '#475569');
    vatGrad.addColorStop(0.3, '#94a3b8');
    vatGrad.addColorStop(0.7, '#cbd5e1');
    vatGrad.addColorStop(1, '#334155');
    ctx.fillStyle = vatGrad;
    ctx.beginPath();
    ctx.arc(0, 0, 110, 0, Math.PI);
    ctx.closePath();
    ctx.fill();

    // Bubbling Rising Dough inside Vat
    ctx.fillStyle = '#fef3c7';
    ctx.beginPath();
    ctx.ellipse(0, 0, 105, 28, 0, 0, Math.PI * 2);
    ctx.fill();

    // Rotating Dough Kneader Hook
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 8;
    ctx.beginPath();
    const hookAngle = t * 2;
    ctx.arc(Math.cos(hookAngle) * 35, Math.sin(hookAngle) * 8 - 15, 28, 0, Math.PI);
    ctx.stroke();

    // Warm Dough Steam Puffs
    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
    for (let st = 0; st < 3; st++) {
      const sx = (st - 1) * 45 + Math.sin(t * 2 + st) * 15;
      const sy = -35 - (t * 25 + st * 20) % 70;
      ctx.beginPath();
      ctx.arc(sx, sy, 16 + st * 5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();

    // 6. Mechanical Conveyor Belt for Bread (Förderband)
    const beltY = height * 0.72;
    ctx.save();
    ctx.translate(width * 0.75, beltY);

    // Conveyor Belt Metal Frame
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-180, 0, 360, 24);
    // Belt Support Legs
    ctx.fillRect(-140, 24, 20, 80);
    ctx.fillRect(120, 24, 20, 80);

    // Rubber Moving Belt Surface
    ctx.fillStyle = '#334155';
    ctx.fillRect(-180, 2, 360, 8);

    // Moving Loaves of Bread on Conveyor
    const beltOffset = (t * 50) % 75;
    for (let bx = -160 + beltOffset; bx < 170; bx += 75) {
      // Golden Loaf
      ctx.fillStyle = '#d97706';
      ctx.strokeStyle = '#92400e';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(bx, -8, 22, 11, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Crust Scores
      ctx.strokeStyle = '#fef3c7';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(bx - 10, -12);
      ctx.lineTo(bx - 4, -4);
      ctx.moveTo(bx, -12);
      ctx.lineTo(bx + 6, -4);
      ctx.stroke();
    }

    // Giant Wooden Rolling Pin leaning on wall (Nudelholz)
    ctx.save();
    ctx.translate(140, -40);
    ctx.rotate(0.3);
    ctx.fillStyle = '#b45309';
    ctx.fillRect(-14, -80, 28, 160);
    // Handles
    ctx.fillStyle = '#78350f';
    ctx.fillRect(-6, -110, 12, 30);
    ctx.fillRect(-6, 80, 12, 30);
    ctx.restore();

    ctx.restore();

    ctx.restore();
  }

  _renderArcadeChip(ctx, width, height, t) {
    ctx.save();

    // 1. Dark Cyber PCB Substrate
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#030712');
    bgGrad.addColorStop(0.5, '#061727');
    bgGrad.addColorStop(1, '#021019');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Micro-grid matrix on silicon surface
    ctx.strokeStyle = 'rgba(14, 165, 233, 0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x < width; x += 40) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = 0; y < height; y += 40) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();

    // 3. Glowing Circuit Traces (Neon Cyan & Electric Gold)
    const traces = [
      [[0, 160], [400, 160], [520, 280], [1200, 280]],
      [[2400, 180], [1900, 180], [1780, 300], [1400, 300]],
      [[100, 680], [600, 680], [750, 530], [1150, 530]],
      [[2300, 660], [1800, 660], [1650, 510], [1250, 510]],
      [[300, 0], [300, 350], [450, 500], [450, 800]],
      [[2100, 0], [2100, 320], [1950, 470], [1950, 800]],
      [[700, 0], [700, 200], [800, 300]],
      [[1700, 0], [1700, 200], [1600, 300]],
      [[950, 800], [950, 580], [850, 480]],
      [[1450, 800], [1450, 580], [1550, 480]],
    ];

    traces.forEach((pts, idx) => {
      const isGold = idx % 2 === 1;
      const strokeColor = isGold ? '#f59e0b' : '#06b6d4';
      const glowColor = isGold ? '#fbbf24' : '#38bdf8';

      ctx.save();
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 4;
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i][0], pts[i][1]);
      }
      ctx.stroke();

      ctx.strokeStyle = '#e0f2fe';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      pts.forEach(p => {
        ctx.fillStyle = isGold ? '#fbbf24' : '#67e8f9';
        ctx.beginPath();
        ctx.arc(p[0], p[1], 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(p[0], p[1], 2, 0, Math.PI * 2);
        ctx.fill();
      });

      const totalLen = pts.length * 150;
      const pulsePos = ((t * 220 + idx * 85) % totalLen) / totalLen;
      const pIdx = Math.min(pts.length - 2, Math.floor(pulsePos * (pts.length - 1)));
      const segT = (pulsePos * (pts.length - 1)) - pIdx;
      const curX = pts[pIdx][0] + (pts[pIdx + 1][0] - pts[pIdx][0]) * segT;
      const curY = pts[pIdx][1] + (pts[pIdx + 1][1] - pts[pIdx][1]) * segT;

      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.arc(curX, curY, 4.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    });

    // 4. Central CPU Package (Easter Egg Target 1)
    ctx.save();
    ctx.translate(820, 288);
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 4;
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 18;
    ctx.fillRect(-110, -110, 220, 220);
    ctx.strokeRect(-110, -110, 220, 220);

    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.fillRect(-85, -85, 170, 170);
    ctx.strokeRect(-85, -85, 170, 170);

    const cpuPulse = (Math.sin(t * 4) + 1) * 0.5;
    const cpuGrad = ctx.createRadialGradient(0, 0, 5, 0, 0, 65);
    cpuGrad.addColorStop(0, '#ffffff');
    cpuGrad.addColorStop(0.3, `rgba(56, 189, 248, ${0.85 + cpuPulse * 0.15})`);
    cpuGrad.addColorStop(1, 'rgba(2, 132, 199, 0.2)');
    ctx.fillStyle = cpuGrad;
    ctx.fillRect(-55, -55, 110, 110);

    ctx.fillStyle = '#fbbf24';
    for (let p = -100; p <= 100; p += 14) {
      ctx.fillRect(p - 3, -116, 6, 6);
      ctx.fillRect(p - 3, 110, 6, 6);
      ctx.fillRect(-116, p - 3, 6, 6);
      ctx.fillRect(110, p - 3, 6, 6);
    }
    ctx.restore();

    // 5. Giant Cylinder Capacitors (Easter Egg Target 2)
    const capX = 1880;
    const capY = 432;
    ctx.save();
    ctx.translate(capX, capY);
    const capGrad = ctx.createLinearGradient(-45, 0, 45, 0);
    capGrad.addColorStop(0, '#082f49');
    capGrad.addColorStop(0.3, '#0284c7');
    capGrad.addColorStop(0.6, '#38bdf8');
    capGrad.addColorStop(1, '#0c4a6e');
    ctx.fillStyle = capGrad;
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#0284c7';
    ctx.shadowBlur = 12;
    ctx.fillRect(-45, -75, 90, 150);
    ctx.strokeRect(-45, -75, 90, 150);

    ctx.fillStyle = '#94a3b8';
    ctx.beginPath();
    ctx.ellipse(0, -75, 45, 18, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#475569';
    ctx.stroke();

    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(16, -70, 14, 140);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px monospace';
    ctx.fillText('1000µF', -25, 5);

    ctx.save();
    ctx.translate(85, -20);
    ctx.fillStyle = capGrad;
    ctx.fillRect(-35, -60, 70, 120);
    ctx.strokeRect(-35, -60, 70, 120);
    ctx.fillStyle = '#94a3b8';
    ctx.beginPath();
    ctx.ellipse(0, -60, 35, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.restore();

    // 6. Quantum Bus Highway (Easter Egg Target 3)
    ctx.save();
    ctx.translate(1360, 576);
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 15;
    ctx.fillRect(-150, -25, 300, 50);
    ctx.strokeRect(-150, -25, 300, 50);

    for (let l = -18; l <= 18; l += 9) {
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-140, l);
      ctx.lineTo(140, l);
      ctx.stroke();

      const dataOffset = ((t * 350 + l * 25) % 260) - 130;
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(dataOffset, l, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // 7. VRAM / RAM Chip Banks
    ctx.save();
    ctx.translate(1500, 140);
    ctx.fillStyle = '#020617';
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#22c55e';
    ctx.shadowBlur = 10;
    for (let r = 0; r < 4; r++) {
      ctx.fillRect(r * 55, 0, 45, 80);
      ctx.strokeRect(r * 55, 0, 45, 80);
      const ledGlow = (Math.sin(t * 6 + r * 1.5) + 1) * 0.5 > 0.3 ? '#22c55e' : '#14532d';
      ctx.fillStyle = ledGlow;
      ctx.beginPath();
      ctx.arc(r * 55 + 22, 15, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    ctx.restore();
  }

  _renderSakuraPark(ctx, width, height, t) {
    ctx.save();

    // 1. Sky: Spring pastel blue gradient with soft warm horizon
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.6);
    skyGrad.addColorStop(0, '#7dd3fc');
    skyGrad.addColorStop(0.5, '#bae6fd');
    skyGrad.addColorStop(1, '#fed7aa');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Distant Mt. Fuji silhouette
    ctx.save();
    ctx.fillStyle = '#64748b';
    ctx.beginPath();
    ctx.moveTo(width * 0.35, height * 0.45);
    ctx.lineTo(width * 0.48, height * 0.18);
    ctx.lineTo(width * 0.52, height * 0.18);
    ctx.lineTo(width * 0.65, height * 0.45);
    ctx.closePath();
    ctx.fill();

    // Snow cap on Mt. Fuji
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(width * 0.46, height * 0.24);
    ctx.lineTo(width * 0.48, height * 0.18);
    ctx.lineTo(width * 0.52, height * 0.18);
    ctx.lineTo(width * 0.54, height * 0.24);
    ctx.lineTo(width * 0.52, height * 0.26);
    ctx.lineTo(width * 0.50, height * 0.24);
    ctx.lineTo(width * 0.48, height * 0.27);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // 3. Distant green hills
    ctx.fillStyle = '#86efac';
    ctx.beginPath();
    ctx.ellipse(width * 0.2, height * 0.48, 500, 100, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(width * 0.8, height * 0.48, 600, 110, 0, 0, Math.PI * 2);
    ctx.fill();

    // 4. Distant Pagoda / Tea House Pavilion
    ctx.save();
    ctx.translate(1750, 240);
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.moveTo(-45, -50);
    ctx.lineTo(0, -75);
    ctx.lineTo(45, -50);
    ctx.lineTo(35, -45);
    ctx.lineTo(-35, -45);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, -75);
    ctx.lineTo(0, -95);
    ctx.stroke();

    ctx.fillStyle = '#fef3c7';
    ctx.fillRect(-28, -45, 56, 30);
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.moveTo(-65, -15);
    ctx.lineTo(0, -35);
    ctx.lineTo(65, -15);
    ctx.lineTo(55, -10);
    ctx.lineTo(-55, -10);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#fef3c7';
    ctx.fillRect(-45, -10, 90, 50);
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(-45, -10, 8, 50);
    ctx.fillRect(37, -10, 8, 50);
    ctx.fillRect(-5, -10, 10, 50);
    ctx.restore();

    // 5. Serene Pond (Koi Pond)
    const pondGrad = ctx.createLinearGradient(0, height * 0.52, 0, height);
    pondGrad.addColorStop(0, '#0284c7');
    pondGrad.addColorStop(0.5, '#0369a1');
    pondGrad.addColorStop(1, '#0c4a6e');
    ctx.fillStyle = pondGrad;
    ctx.beginPath();
    ctx.moveTo(350, height * 0.52);
    ctx.bezierCurveTo(700, height * 0.50, 1200, height * 0.54, 2100, height * 0.52);
    ctx.lineTo(width, height);
    ctx.lineTo(250, height);
    ctx.closePath();
    ctx.fill();

    // Lush Green Garden Bank Foreground
    ctx.fillStyle = '#4ade80';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.45);
    ctx.bezierCurveTo(200, height * 0.48, 320, height * 0.65, 380, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Stepping stones path
    const stones = [[120, 480], [180, 530], [230, 590], [270, 660], [320, 740]];
    stones.forEach(st => {
      ctx.fillStyle = '#94a3b8';
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(st[0], st[1], 28, 16, 0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });

    // 6. Swimming Koi Fish (Easter Egg Target 3)
    ctx.save();
    ctx.translate(1720, height * 0.82);
    const koiWiggle = Math.sin(t * 3) * 6;
    ctx.fillStyle = '#ea580c';
    ctx.beginPath();
    ctx.ellipse(0, 0, 36, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(-8, -4, 9, 0, Math.PI * 2);
    ctx.arc(10, 2, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(2, -2, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.beginPath();
    ctx.moveTo(-34, 0);
    ctx.lineTo(-54, -14 + koiWiggle);
    ctx.lineTo(-46, 0);
    ctx.lineTo(-54, 14 + koiWiggle);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(0, 0, 50, 22, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // 7. Traditional Red Bridge (Taiko-bashi) (Easter Egg Target 1)
    ctx.save();
    ctx.translate(1420, height * 0.65);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.beginPath();
    ctx.arc(0, 50, 140, Math.PI * 1.1, Math.PI * 1.9);
    ctx.lineTo(130, 70);
    ctx.lineTo(-130, 70);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#991b1b';
    ctx.fillRect(-90, 15, 16, 50);
    ctx.fillRect(74, 15, 16, 50);
    ctx.fillRect(-10, 0, 20, 65);

    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 18;
    ctx.beginPath();
    ctx.arc(0, 85, 180, Math.PI * 1.25, Math.PI * 1.75);
    ctx.stroke();

    ctx.strokeStyle = '#b91c1c';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(0, 85, 208, Math.PI * 1.27, Math.PI * 1.73);
    ctx.stroke();

    ctx.fillStyle = '#dc2626';
    const postAngles = [-0.65, -0.45, -0.22, 0, 0.22, 0.45, 0.65];
    postAngles.forEach(ang => {
      ctx.save();
      ctx.rotate(ang);
      ctx.fillRect(-4, -125, 8, 28);
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(0, -127, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#dc2626';
      ctx.restore();
    });
    ctx.restore();

    // 8. Stone Lantern (Toro) (Easter Egg Target 2)
    ctx.save();
    ctx.translate(320, height * 0.70);
    ctx.fillStyle = '#64748b';
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 3;
    ctx.fillRect(-35, 60, 70, 25);
    ctx.strokeRect(-35, 60, 70, 25);
    ctx.fillRect(-20, 20, 40, 40);
    ctx.strokeRect(-20, 20, 40, 40);
    ctx.fillRect(-38, 5, 76, 16);
    ctx.strokeRect(-38, 5, 76, 16);

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-25, -35, 50, 40);
    ctx.strokeRect(-25, -35, 50, 40);

    const lampGlow = (Math.sin(t * 5) + 1) * 0.5 * 0.4 + 0.6;
    ctx.fillStyle = `rgba(251, 191, 36, ${lampGlow})`;
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 15;
    ctx.fillRect(-15, -27, 30, 24);
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#64748b';
    ctx.beginPath();
    ctx.moveTo(-50, -35);
    ctx.lineTo(0, -65);
    ctx.lineTo(50, -35);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.beginPath();
    ctx.arc(0, -68, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // 9. Grand Sakura Cherry Blossom Trees
    const trees = [
      { x: 120, y: height * 0.45, scale: 1.1 },
      { x: 750, y: height * 0.38, scale: 0.9 },
      { x: 2280, y: height * 0.46, scale: 1.2 }
    ];

    trees.forEach(tr => {
      ctx.save();
      ctx.translate(tr.x, tr.y);
      ctx.scale(tr.scale, tr.scale);

      ctx.fillStyle = '#451a03';
      ctx.strokeStyle = '#290e02';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(-25, 140);
      ctx.quadraticCurveTo(-15, 40, -40, -30);
      ctx.lineTo(-20, -35);
      ctx.quadraticCurveTo(5, 30, 30, 140);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.lineWidth = 14;
      ctx.strokeStyle = '#451a03';
      ctx.beginPath();
      ctx.moveTo(-15, 20);
      ctx.quadraticCurveTo(-60, -20, -110, -50);
      ctx.moveTo(10, 10);
      ctx.quadraticCurveTo(60, -30, 120, -40);
      ctx.stroke();

      const puffs = [
        [-130, -70, 65, '#f472b6'],
        [-80, -110, 75, '#fbcfe8'],
        [0, -130, 85, '#f472b6'],
        [80, -110, 75, '#fbcfe8'],
        [130, -65, 65, '#fda4af'],
        [-30, -70, 70, '#ffffff'],
        [40, -65, 70, '#fbcfe8']
      ];

      puffs.forEach(pf => {
        ctx.fillStyle = pf[3];
        ctx.beginPath();
        ctx.arc(pf[0], pf[1], pf[2], 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
    });

    ctx.restore();
  }

  _renderFormula1Track(ctx, width, height, t) {
    ctx.save();

    // 1. Stormy Overcast Sky with Rain Mood
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.55);
    skyGrad.addColorStop(0, '#0f172a');
    skyGrad.addColorStop(0.4, '#1e293b');
    skyGrad.addColorStop(0.8, '#334155');
    skyGrad.addColorStop(1, '#475569');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // Occasional lightning flash in storm clouds
    const flash = Math.sin(t * 7) > 0.96 ? 0.35 : 0;
    if (flash > 0) {
      ctx.fillStyle = `rgba(224, 242, 254, ${flash})`;
      ctx.fillRect(0, 0, width, height * 0.5);
    }

    // Distant Stadium Floodlight Towers
    const floodlights = [160, 520, 2180];
    floodlights.forEach(fx => {
      ctx.fillStyle = '#64748b';
      ctx.fillRect(fx - 4, height * 0.1, 8, height * 0.35);
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(fx - 24, height * 0.08, 48, 16);
      ctx.fillStyle = 'rgba(254, 240, 138, 0.12)';
      ctx.beginPath();
      ctx.moveTo(fx, height * 0.09);
      ctx.lineTo(fx - 140, height * 0.7);
      ctx.lineTo(fx + 140, height * 0.7);
      ctx.closePath();
      ctx.fill();
    });

    // 2. Towering Grandstands with Cheering Crowd
    ctx.save();
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.moveTo(1250, height * 0.45);
    ctx.lineTo(width, height * 0.18);
    ctx.lineTo(width, height * 0.62);
    ctx.lineTo(1250, height * 0.62);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.moveTo(1200, height * 0.38);
    ctx.lineTo(width, height * 0.12);
    ctx.lineTo(width, height * 0.17);
    ctx.lineTo(1200, height * 0.43);
    ctx.closePath();
    ctx.fill();

    const crowdColors = ['#ef4444', '#f59e0b', '#3b82f6', '#10b981', '#ffffff', '#eab308'];
    for (let row = 0; row < 7; row++) {
      const rowY = height * 0.28 + row * 22;
      for (let col = 0; col < 32; col++) {
        const rowX = 1320 + col * 34 + (row % 2) * 12;
        if (rowX < width) {
          const cIdx = Math.floor((Math.sin(col * 7 + row * 13) + 1) * 2.5) % crowdColors.length;
          ctx.fillStyle = crowdColors[cIdx];
          ctx.beginPath();
          ctx.arc(rowX, rowY, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    ctx.restore();

    // 3. Pit Lane Garages on Middle Right
    ctx.save();
    const garageColors = [
      { name: 'TEAM RED', color: '#dc2626', x: 2050 },
      { name: 'TEAM BLUE', color: '#2563eb', x: 1720 },
      { name: 'TEAM YELLOW', color: '#ca8a04', x: 1380 }
    ];
    garageColors.forEach(g => {
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(g.x - 150, height * 0.52, 300, 110);
      ctx.fillStyle = g.color;
      ctx.fillRect(g.x - 145, height * 0.525, 290, 26);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(g.name, g.x, height * 0.543);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(g.x - 135, height * 0.56, 270, 75);
    });
    ctx.restore();

    // 4. Wet Asphalt Racetrack Surface with Rain Reflections
    const trackGrad = ctx.createLinearGradient(0, height * 0.48, 0, height);
    trackGrad.addColorStop(0, '#1e293b');
    trackGrad.addColorStop(0.3, '#0f172a');
    trackGrad.addColorStop(0.7, '#18202f');
    trackGrad.addColorStop(1, '#0b0f17');
    ctx.fillStyle = trackGrad;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.48);
    ctx.lineTo(width, height * 0.65);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Pit Wall Barrier
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(950, height * 0.54);
    ctx.lineTo(width, height * 0.68);
    ctx.lineTo(width, height * 0.73);
    ctx.lineTo(950, height * 0.59);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.moveTo(950, height * 0.565);
    ctx.lineTo(width, height * 0.705);
    ctx.lineTo(width, height * 0.73);
    ctx.lineTo(950, height * 0.59);
    ctx.closePath();
    ctx.fill();

    // Red and White Curbstones on Left Track Edge
    const curbSegments = 24;
    for (let c = 0; c < curbSegments; c++) {
      const cy1 = height * 0.50 + c * 18;
      const cy2 = cy1 + 18;
      const cx1 = 120 + c * 25;
      const cx2 = 120 + (c + 1) * 25;
      ctx.fillStyle = c % 2 === 0 ? '#ef4444' : '#ffffff';
      ctx.beginPath();
      ctx.moveTo(cx1 - 20, cy1);
      ctx.lineTo(cx2 - 20, cy2);
      ctx.lineTo(cx2 + 10, cy2);
      ctx.lineTo(cx1 + 10, cy1);
      ctx.closePath();
      ctx.fill();
    }

    // Start-Finish Checkered Line & Starting Grid Boxes
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    for (let g = 0; g < 4; g++) {
      const gx = 450 + g * 280;
      const gy = height * 0.70 + (g % 2) * 45;
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#ffffff';
      ctx.strokeRect(gx, gy, 120, 50);
      ctx.font = 'bold 24px monospace';
      ctx.fillText((g + 1).toString(), gx + 50, gy + 35);
    }
    ctx.restore();

    // 5. Overhead Start Gantry with 5 Red Starting Lights (Easter Egg Target 1)
    ctx.save();
    ctx.translate(880, height * 0.26);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 6;
    ctx.strokeRect(-220, -50, 440, 70);
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let bx = -220; bx < 220; bx += 55) {
      ctx.moveTo(bx, -50);
      ctx.lineTo(bx + 55, 20);
      ctx.moveTo(bx + 55, -50);
      ctx.lineTo(bx, 20);
    }
    ctx.stroke();

    ctx.fillStyle = '#64748b';
    ctx.fillRect(-225, 20, 16, 260);
    ctx.fillRect(209, 20, 16, 260);

    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 3;
    ctx.fillRect(-150, -35, 300, 50);
    ctx.strokeRect(-150, -35, 300, 50);

    const lightBlink = (Math.sin(t * 8) + 1) * 0.5 > 0.3;
    for (let l = 0; l < 5; l++) {
      const lx = -120 + l * 60;
      ctx.fillStyle = lightBlink ? '#ef4444' : '#450a0a';
      ctx.shadowColor = lightBlink ? '#ef4444' : 'transparent';
      ctx.shadowBlur = lightBlink ? 20 : 0;
      ctx.beginPath();
      ctx.arc(lx, -10, 16, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    ctx.restore();

    // 6. Fast Red & Blue F1 Race Cars on the Straight (Easter Egg Target 2)
    ctx.save();
    ctx.translate(1560, height * 0.74);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.beginPath();
    ctx.ellipse(80, 20, 70, 22, -0.2, 0, Math.PI * 2);
    ctx.ellipse(-80, 20, 70, 22, 0.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#dc2626';
    ctx.strokeStyle = '#991b1b';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, -50);
    ctx.lineTo(25, -15);
    ctx.lineTo(35, 35);
    ctx.lineTo(-35, 35);
    ctx.lineTo(-25, -15);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.ellipse(0, 0, 14, 24, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(0, 2, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#dc2626';
    ctx.fillRect(-65, -55, 130, 10);
    ctx.fillStyle = '#991b1b';
    ctx.fillRect(-55, 38, 110, 14);

    ctx.fillStyle = '#020617';
    ctx.fillRect(-85, -35, 20, 38);
    ctx.fillRect(65, -35, 20, 38);
    ctx.fillRect(-88, 15, 24, 44);
    ctx.fillRect(64, 15, 24, 44);
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 2;
    ctx.strokeRect(-83, -32, 16, 32);
    ctx.strokeRect(67, -32, 16, 32);
    ctx.strokeRect(-85, 18, 18, 38);
    ctx.strokeRect(67, 18, 18, 38);

    ctx.save();
    ctx.translate(-350, -40);
    ctx.scale(0.85, 0.85);
    ctx.fillStyle = '#2563eb';
    ctx.beginPath();
    ctx.moveTo(0, -50);
    ctx.lineTo(25, -15);
    ctx.lineTo(35, 35);
    ctx.lineTo(-35, 35);
    ctx.lineTo(-25, -15);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#020617';
    ctx.fillRect(-75, -30, 18, 34);
    ctx.fillRect(57, -30, 18, 34);
    ctx.fillRect(-78, 15, 22, 38);
    ctx.fillRect(56, 15, 22, 38);
    ctx.restore();

    ctx.restore();

    // 7. Stacked Red & White Tire Barrier (Easter Egg Target 3)
    ctx.save();
    ctx.translate(200, height * 0.82);
    const tireStack = [
      [-50, 40, '#ef4444'], [-15, 40, '#ffffff'], [20, 40, '#ef4444'], [55, 40, '#ffffff'],
      [-35, 10, '#ffffff'], [0, 10, '#ef4444'], [35, 10, '#ffffff'],
      [-18, -20, '#ef4444'], [18, -20, '#ffffff'],
      [0, -50, '#ef4444']
    ];
    tireStack.forEach(t => {
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = t[2];
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.ellipse(t[0], t[1], 24, 14, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#334155';
      ctx.beginPath();
      ctx.ellipse(t[0], t[1], 8, 5, 0, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();

    ctx.restore();
  }

  _renderCoralReefLowtide(ctx, width, height, t) {
    ctx.save();

    // 1. Radiant Tropical Sky with Sun & Clouds
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.55);
    skyGrad.addColorStop(0, '#38bdf8');
    skyGrad.addColorStop(0.5, '#7dd3fc');
    skyGrad.addColorStop(1, '#bae6fd');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // Glowing Tropical Sun with Rays
    ctx.save();
    ctx.fillStyle = '#fef08a';
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 25;
    ctx.beginPath();
    ctx.arc(width * 0.5, height * 0.05, 55, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Soaring Seagulls in the sky (Easter Egg 3 on right: x: 880, y: height * 0.22)
    const gulls = [
      [width * 0.15, height * 0.16, 18],
      [width * 0.28, height * 0.20, 14],
      [880, height * 0.22, 26],
      [width * 0.65, height * 0.12, 16],
      [width * 0.88, height * 0.15, 14]
    ];
    gulls.forEach(g => {
      ctx.save();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.shadowColor = 'rgba(0,0,0,0.2)';
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.arc(g[0] - g[2] * 0.5, g[1], g[2] * 0.5, Math.PI * 1.1, Math.PI * 1.9);
      ctx.arc(g[0] + g[2] * 0.5, g[1], g[2] * 0.5, Math.PI * 1.1, Math.PI * 1.9);
      ctx.stroke();
      ctx.restore();
    });

    // 2. Distant Turquoise Ocean Horizon with Tropical Palm Atoll
    const seaGrad = ctx.createLinearGradient(0, height * 0.35, 0, height * 0.60);
    seaGrad.addColorStop(0, '#0284c7');
    seaGrad.addColorStop(0.5, '#06b6d4');
    seaGrad.addColorStop(1, '#22d3ee');
    ctx.fillStyle = seaGrad;
    ctx.fillRect(0, height * 0.35, width, height * 0.25);

    const islands = [width * 0.1, width * 0.72, width * 0.88];
    islands.forEach(ix => {
      ctx.fillStyle = '#ca8a04';
      ctx.beginPath();
      ctx.ellipse(ix, height * 0.355, 80, 12, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#15803d';
      for (let p = -30; p <= 30; p += 15) {
        ctx.beginPath();
        ctx.arc(ix + p, height * 0.345, 10, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Gentle White Surf Breakers
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    for (let x = 0; x < width; x += 120) {
      const waveY = height * 0.38 + Math.sin(x * 0.02 + t * 2) * 5;
      ctx.moveTo(x, waveY);
      ctx.quadraticCurveTo(x + 60, waveY - 8, x + 120, waveY);
    }
    ctx.stroke();

    // 3. Exposed Reef Flat & Wet Sandbed at Low Tide
    const reefGroundGrad = ctx.createLinearGradient(0, height * 0.50, 0, height);
    reefGroundGrad.addColorStop(0, '#fef08a');
    reefGroundGrad.addColorStop(0.3, '#fde047');
    reefGroundGrad.addColorStop(0.7, '#d97706');
    reefGroundGrad.addColorStop(1, '#92400e');
    ctx.fillStyle = reefGroundGrad;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.48);
    ctx.bezierCurveTo(width * 0.3, height * 0.52, width * 0.7, height * 0.46, width, height * 0.50);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Wet Tidal Pools
    const pools = [
      { x: 420, y: height * 0.82, rx: 220, ry: 75 },
      { x: 1250, y: height * 0.65, rx: 180, ry: 55 },
      { x: 1820, y: height * 0.76, rx: 240, ry: 80 }
    ];

    pools.forEach(pool => {
      const pGrad = ctx.createRadialGradient(pool.x, pool.y, 10, pool.x, pool.y, pool.rx);
      pGrad.addColorStop(0, '#06b6d4');
      pGrad.addColorStop(0.7, '#0284c7');
      pGrad.addColorStop(1, 'rgba(14, 116, 144, 0.4)');
      ctx.fillStyle = pGrad;
      ctx.beginPath();
      ctx.ellipse(pool.x, pool.y, pool.rx, pool.ry, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(pool.x - 20, pool.y - 10, pool.rx * 0.5, pool.ry * 0.5, 0.2, 0, Math.PI * 2);
      ctx.stroke();
    });

    // 4. Exposed Colorful Coral Clusters Emerging at Low Tide
    const coralClusters = [
      { x: 180, y: height * 0.60, color: '#f43f5e' },
      { x: 280, y: height * 0.62, color: '#a855f7' },
      { x: 800, y: height * 0.58, color: '#ec4899' },
      { x: 920, y: height * 0.56, color: '#fb923c' },
      { x: 1040, y: height * 0.58, color: '#eab308' },
      { x: 1140, y: height * 0.60, color: '#8b5cf6' },
      { x: 2150, y: height * 0.62, color: '#06b6d4' },
      { x: 2280, y: height * 0.58, color: '#f43f5e' }
    ];

    coralClusters.forEach(c => {
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.fillStyle = c.color;
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 2;

      for (let b = -30; b <= 30; b += 15) {
        const branchHeight = 45 + Math.sin(b * 0.1) * 20;
        ctx.beginPath();
        ctx.roundRect(b - 7, -branchHeight, 14, branchHeight + 10, [8, 8, 0, 0]);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.roundRect(b > 0 ? b + 2 : b - 12, -branchHeight * 0.6, 10, 15, 5);
        ctx.fill();
        ctx.stroke();
      }

      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.arc(0, 5, 24, Math.PI, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    });

    // 5. Giant Clam Shell with Iridescent Pearl (Easter Egg 2: x: 1780, y: height * 0.76)
    ctx.save();
    ctx.translate(1780, height * 0.76);
    ctx.fillStyle = '#fed7aa';
    ctx.strokeStyle = '#c2410c';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 15, 55, 0, Math.PI);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(0, -25, 55, 30, 0, Math.PI, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = '#ea580c';
    ctx.lineWidth = 2;
    for (let r = -40; r <= 40; r += 20) {
      ctx.beginPath();
      ctx.moveTo(r, 15);
      ctx.lineTo(r * 1.2, 45);
      ctx.stroke();
    }

    const pearlGlow = (Math.sin(t * 4) + 1) * 0.5 * 0.3 + 0.7;
    ctx.fillStyle = `rgba(255, 255, 255, ${pearlGlow})`;
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(0, -5, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(-5, -10, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 6. Giant Sun Starfish in the Shallow Pool (Easter Egg 1: x: 420, y: height * 0.82)
    ctx.save();
    ctx.translate(420, height * 0.82);
    ctx.fillStyle = '#ea580c';
    ctx.strokeStyle = '#c2410c';
    ctx.lineWidth = 3;
    ctx.beginPath();
    const numPoints = 5;
    const outerR = 50;
    const innerR = 20;
    for (let p = 0; p < numPoints * 2; p++) {
      const r = p % 2 === 0 ? outerR : innerR;
      const angle = (p * Math.PI) / numPoints - Math.PI / 2;
      const sx = Math.cos(angle) * r;
      const sy = Math.sin(angle) * r;
      if (p === 0) ctx.moveTo(sx, sy);
      else ctx.lineTo(sx, sy);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2);
    ctx.fill();
    for (let p = 0; p < numPoints; p++) {
      const angle = (p * 2 * Math.PI) / numPoints - Math.PI / 2;
      ctx.beginPath();
      ctx.arc(Math.cos(angle) * 30, Math.sin(angle) * 30, 4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // 7. Scattered Sea Shells & Pebbles across the sand
    const shells = [
      [280, height * 0.72, '#fbcfe8'],
      [680, height * 0.88, '#fef08a'],
      [1120, height * 0.78, '#fdba74'],
      [1520, height * 0.86, '#fbcfe8']
    ];
    shells.forEach(sh => {
      ctx.fillStyle = sh[2];
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(sh[0], sh[1], 15, 10, 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });

    ctx.restore();
  }

  _renderArtistStudio(ctx, width, height, t) {
    ctx.save();

    // 1. Cozy Bohemian Attic Studio Interior
    const wallGrad = ctx.createLinearGradient(0, 0, 0, height);
    wallGrad.addColorStop(0, '#451a03');
    wallGrad.addColorStop(0.3, '#78350f');
    wallGrad.addColorStop(0.7, '#92400e');
    wallGrad.addColorStop(1, '#713f12');
    ctx.fillStyle = wallGrad;
    ctx.fillRect(0, 0, width, height);

    // Diagonal attic ceiling wooden beams
    ctx.strokeStyle = '#290e02';
    ctx.lineWidth = 16;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.4);
    ctx.lineTo(width * 0.35, 0);
    ctx.moveTo(width, height * 0.4);
    ctx.lineTo(width * 0.65, 0);
    ctx.stroke();

    // 2. Large Arched Atelier Studio Window
    ctx.save();
    const winX = 1300;
    const winY = height * 0.42;
    const winW = 750;
    const winH = 460;

    ctx.save();
    ctx.beginPath();
    ctx.arc(winX, winY - winH * 0.35, winW * 0.5, Math.PI, Math.PI * 2);
    ctx.lineTo(winX + winW * 0.5, winY + winH * 0.5);
    ctx.lineTo(winX - winW * 0.5, winY + winH * 0.5);
    ctx.closePath();
    ctx.clip();

    const skyGrad = ctx.createLinearGradient(0, 0, 0, winY + winH * 0.5);
    skyGrad.addColorStop(0, '#fde68a');
    skyGrad.addColorStop(0.5, '#fed7aa');
    skyGrad.addColorStop(1, '#fdba74');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(winX - winW, 0, winW * 2, height);

    ctx.fillStyle = '#475569';
    const towerX = winX;
    const towerBaseY = winY + winH * 0.25;
    ctx.beginPath();
    ctx.moveTo(towerX - 3, winY - winH * 0.7);
    ctx.lineTo(towerX + 3, winY - winH * 0.7);
    ctx.lineTo(towerX + 8, towerBaseY - 140);
    ctx.lineTo(towerX - 8, towerBaseY - 140);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(towerX - 30, towerBaseY);
    ctx.lineTo(towerX - 10, towerBaseY - 140);
    ctx.lineTo(towerX + 10, towerBaseY - 140);
    ctx.lineTo(towerX + 30, towerBaseY);
    ctx.lineTo(towerX + 18, towerBaseY);
    ctx.quadraticCurveTo(towerX, towerBaseY - 45, towerX - 18, towerBaseY);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.moveTo(winX - winW * 0.5, towerBaseY + 30);
    ctx.lineTo(winX - 120, towerBaseY - 15);
    ctx.lineTo(winX + 80, towerBaseY + 20);
    ctx.lineTo(winX + winW * 0.5, towerBaseY - 10);
    ctx.lineTo(winX + winW * 0.5, winY + winH);
    ctx.lineTo(winX - winW * 0.5, winY + winH);
    ctx.closePath();
    ctx.fill();

    const chimneys = [-220, -80, 160, 280];
    chimneys.forEach(cx => {
      ctx.fillStyle = '#b91c1c';
      ctx.fillRect(winX + cx, towerBaseY - 5, 22, 45);
      ctx.fillStyle = '#f97316';
      ctx.fillRect(winX + cx + 3, towerBaseY - 14, 16, 10);
    });

    ctx.restore();

    ctx.strokeStyle = '#290e02';
    ctx.lineWidth = 18;
    ctx.beginPath();
    ctx.arc(winX, winY - winH * 0.35, winW * 0.5, Math.PI, Math.PI * 2);
    ctx.lineTo(winX + winW * 0.5, winY + winH * 0.5);
    ctx.lineTo(winX - winW * 0.5, winY + winH * 0.5);
    ctx.closePath();
    ctx.stroke();

    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(winX, winY - winH * 0.85);
    ctx.lineTo(winX, winY + winH * 0.5);
    ctx.moveTo(winX - winW * 0.45, winY - 30);
    ctx.lineTo(winX + winW * 0.45, winY - 30);
    ctx.stroke();
    ctx.restore();

    // 3. Wooden Floor with Paint Splatters
    ctx.fillStyle = '#54300a';
    ctx.fillRect(0, height * 0.70, width, height * 0.30);
    ctx.strokeStyle = '#361c04';
    ctx.lineWidth = 3;
    for (let py = height * 0.70; py < height; py += 35) {
      ctx.beginPath();
      ctx.moveTo(0, py);
      ctx.lineTo(width, py);
      ctx.stroke();
    }

    const splatters = [
      [350, height * 0.82, '#ef4444', 18],
      [420, height * 0.85, '#3b82f6', 14],
      [780, height * 0.90, '#facc15', 22],
      [1450, height * 0.86, '#10b981', 16],
      [1720, height * 0.92, '#ec4899', 24]
    ];
    splatters.forEach(sp => {
      ctx.fillStyle = sp[2];
      ctx.beginPath();
      ctx.arc(sp[0], sp[1], sp[3], 0, Math.PI * 2);
      ctx.fill();
    });

    // 4. Bookshelf on Left
    ctx.fillStyle = '#361c04';
    ctx.fillRect(80, height * 0.35, 260, height * 0.45);
    ctx.fillStyle = '#54300a';
    ctx.fillRect(90, height * 0.50, 240, 12);
    ctx.fillRect(90, height * 0.65, 240, 12);

    const bookColors = ['#dc2626', '#2563eb', '#16a34a', '#d97706'];
    for (let b = 0; b < 6; b++) {
      ctx.fillStyle = bookColors[b % bookColors.length];
      ctx.fillRect(110 + b * 20, height * 0.38, 16, 75);
    }

    // 5. Antique Classical Marble Bust (Easter Egg 2: x: 520, y: height * 0.44)
    ctx.save();
    ctx.translate(520, height * 0.44);
    ctx.fillStyle = '#54300a';
    ctx.strokeStyle = '#290e02';
    ctx.lineWidth = 3;
    ctx.fillRect(-35, 60, 70, 14);
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-25, 74);
    ctx.lineTo(-45, 175);
    ctx.moveTo(25, 74);
    ctx.lineTo(45, 175);
    ctx.moveTo(0, 74);
    ctx.lineTo(0, 175);
    ctx.stroke();

    ctx.fillStyle = '#f8fafc';
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 3;
    ctx.fillRect(-22, 38, 44, 22);
    ctx.strokeRect(-22, 38, 44, 22);

    ctx.beginPath();
    ctx.moveTo(-45, 38);
    ctx.quadraticCurveTo(-35, 0, -25, -15);
    ctx.quadraticCurveTo(0, -5, 25, -15);
    ctx.quadraticCurveTo(35, 0, 45, 38);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, -45, 28, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#cbd5e1';
    for (let c = -22; c <= 22; c += 10) {
      ctx.beginPath();
      ctx.arc(c, -65, 8, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, -55);
    ctx.lineTo(-5, -42);
    ctx.lineTo(2, -38);
    ctx.stroke();
    ctx.restore();

    // 6. Large Wooden Easel with Parisian Painting (Easter Egg 1: x: 1080, y: height * 0.52)
    ctx.save();
    ctx.translate(1080, height * 0.52);
    ctx.fillStyle = '#78350f';
    ctx.strokeStyle = '#451a03';
    ctx.lineWidth = 4;
    ctx.fillRect(-10, -170, 20, 360);
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(0, -100);
    ctx.lineTo(-85, 200);
    ctx.moveTo(0, -100);
    ctx.lineTo(85, 200);
    ctx.stroke();

    ctx.fillStyle = '#92400e';
    ctx.fillRect(-120, 45, 240, 16);
    ctx.strokeRect(-120, 45, 240, 16);

    ctx.fillStyle = '#fef3c7';
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 5;
    ctx.fillRect(-100, -130, 200, 175);
    ctx.strokeRect(-100, -130, 200, 175);

    ctx.fillStyle = '#60a5fa';
    ctx.fillRect(-95, -125, 190, 65);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-95, -60, 75, 100);
    ctx.fillStyle = '#fb923c';
    ctx.fillRect(20, -60, 75, 100);
    ctx.fillStyle = '#94a3b8';
    ctx.beginPath();
    ctx.moveTo(-20, -60);
    ctx.lineTo(20, -60);
    ctx.lineTo(80, 40);
    ctx.lineTo(-80, 40);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#b45309';
    ctx.fillRect(-18, -145, 36, 16);
    ctx.restore();

    // 7. Artists Table with Wooden Palette (Easter Egg 3: x: 500, y: height * 0.88)
    ctx.save();
    ctx.translate(500, height * 0.88);
    ctx.fillStyle = '#78350f';
    ctx.strokeStyle = '#451a03';
    ctx.lineWidth = 4;
    ctx.fillRect(-120, -30, 240, 60);
    ctx.strokeRect(-120, -30, 240, 60);

    ctx.fillStyle = '#d97706';
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(0, -35, 75, 35, 0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#54300a';
    ctx.beginPath();
    ctx.arc(45, -35, 9, 0, Math.PI * 2);
    ctx.fill();

    const dollops = [
      [-50, -42, '#ef4444'],
      [-32, -52, '#3b82f6'],
      [-10, -55, '#facc15'],
      [15, -52, '#10b981'],
      [-40, -22, '#a855f7'],
      [-15, -20, '#ec4899']
    ];
    dollops.forEach(d => {
      ctx.fillStyle = d[2];
      ctx.beginPath();
      ctx.arc(d[0], d[1], 7, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.fillRect(-110, -65, 35, 45);
    ctx.strokeRect(-110, -65, 35, 45);
    const brushes = [-12, -4, 4, 12];
    brushes.forEach(bx => {
      ctx.strokeStyle = '#b45309';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(-93, -60);
      ctx.lineTo(-93 + bx, -95);
      ctx.stroke();
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(-93 + bx, -95);
      ctx.lineTo(-93 + bx * 1.1, -108);
      ctx.stroke();
    });

    ctx.restore();

    ctx.restore();
  }

  _renderPixelDesert(ctx, width, height, t) {
    ctx.save();

    // 1. 8-Bit Sky bands
    const skyBands = [
      { y: 0, h: height * 0.15, color: '#0284c7' },
      { y: height * 0.15, h: height * 0.15, color: '#38bdf8' },
      { y: height * 0.30, h: height * 0.15, color: '#7dd3fc' },
      { y: height * 0.45, h: height * 0.12, color: '#fed7aa' }
    ];
    skyBands.forEach(b => {
      ctx.fillStyle = b.color;
      ctx.fillRect(0, b.y, width, b.h);
    });

    // 8-Bit Stepped Clouds
    const drawPixelCloud = (cx, cy, scale) => {
      ctx.fillStyle = '#ffffff';
      const s = 8 * scale;
      const blocks = [
        [2, 0, 4, 1],
        [1, 1, 6, 1],
        [0, 2, 8, 1],
        [1, 3, 7, 1]
      ];
      blocks.forEach(([bx, by, bw, bh]) => {
        ctx.fillRect(cx + bx * s, cy + by * s, bw * s, bh * s);
      });
    };
    drawPixelCloud(120, height * 0.08, 1.2);
    drawPixelCloud(600, height * 0.12, 1.0);
    drawPixelCloud(1100, height * 0.06, 1.4);
    drawPixelCloud(1700, height * 0.10, 1.1);

    // 2. Blocky 8-Bit Sun
    const sunX = width * 0.72;
    const sunY = height * 0.22;
    const bs = 10;
    // Outer Yellow Halo (Stepped)
    ctx.fillStyle = '#facc15';
    const haloBlocks = [
      [-4, -7, 8, 2], [-6, -5, 12, 2], [-7, -4, 14, 8],
      [-6, 4, 12, 2], [-4, 6, 8, 2]
    ];
    haloBlocks.forEach(([bx, by, bw, bh]) => {
      ctx.fillRect(sunX + bx * bs, sunY + by * bs, bw * bs, bh * bs);
    });
    // Inner Sun Core
    ctx.fillStyle = '#fef08a';
    const coreBlocks = [
      [-3, -5, 6, 2], [-5, -3, 10, 6], [-3, 3, 6, 2]
    ];
    coreBlocks.forEach(([bx, by, bw, bh]) => {
      ctx.fillRect(sunX + bx * bs, sunY + by * bs, bw * bs, bh * bs);
    });

    // 3. Distant 8-Bit Mesas / Flat Mountains (NES Style)
    const drawMesa = (mx, my, mw, mh, color, highlight) => {
      ctx.fillStyle = color;
      ctx.fillRect(mx + mw * 0.2, my, mw * 0.6, mh * 0.35);
      ctx.fillRect(mx + mw * 0.1, my + mh * 0.35, mw * 0.8, mh * 0.35);
      ctx.fillRect(mx, my + mh * 0.7, mw, mh * 0.3);
      if (highlight) {
        ctx.fillStyle = highlight;
        ctx.fillRect(mx + mw * 0.2, my, mw * 0.6, 6);
        ctx.fillRect(mx + mw * 0.1, my + mh * 0.35, mw * 0.1, mh * 0.35);
      }
    };
    drawMesa(80, height * 0.32, 420, height * 0.25, '#9a3412', '#c2410c');
    drawMesa(520, height * 0.37, 340, height * 0.20, '#7c2d12', '#9a3412');
    drawMesa(1400, height * 0.34, 480, height * 0.23, '#9a3412', '#c2410c');

    // 4. Stepped Sand Dunes
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(0, height * 0.52, width, height * 0.48);

    ctx.fillStyle = '#d97706';
    for (let x = 0; x < width; x += 32) {
      const duneY = height * 0.62 + Math.floor(Math.sin(x * 0.005) * 20);
      ctx.fillRect(x, duneY, 32, height - duneY);
    }

    ctx.fillStyle = '#b45309';
    for (let x = 0; x < width; x += 40) {
      const duneY = height * 0.74 + Math.floor(Math.cos(x * 0.004) * 25);
      ctx.fillRect(x, duneY, 40, height - duneY);
    }

    // Sandy road / path in foreground
    ctx.fillStyle = '#fde047';
    ctx.fillRect(0, height * 0.82, width, 18);
    ctx.fillStyle = '#ca8a04';
    for (let x = 0; x < width; x += 30) {
      ctx.fillRect(x, height * 0.84, 15, 6);
    }

    // 5. 8-Bit Pixel Cacti
    const drawPixelCactus = (cx, cy, s) => {
      ctx.save();
      ctx.fillStyle = '#14532d';
      ctx.fillRect(cx - 3 * s, cy - 25 * s, 6 * s, 26 * s);
      ctx.fillRect(cx - 10 * s, cy - 18 * s, 8 * s, 5 * s);
      ctx.fillRect(cx - 10 * s, cy - 22 * s, 4 * s, 5 * s);
      ctx.fillRect(cx + 2 * s, cy - 14 * s, 9 * s, 5 * s);
      ctx.fillRect(cx + 7 * s, cy - 19 * s, 4 * s, 6 * s);

      ctx.fillStyle = '#16a34a';
      ctx.fillRect(cx - 2 * s, cy - 24 * s, 4 * s, 24 * s);
      ctx.fillRect(cx - 9 * s, cy - 17 * s, 6 * s, 3 * s);
      ctx.fillRect(cx - 9 * s, cy - 21 * s, 3 * s, 5 * s);
      ctx.fillRect(cx + 3 * s, cy - 13 * s, 7 * s, 3 * s);
      ctx.fillRect(cx + 7 * s, cy - 18 * s, 3 * s, 6 * s);

      ctx.fillStyle = '#4ade80';
      ctx.fillRect(cx - 2 * s, cy - 24 * s, 1 * s, 23 * s);
      ctx.fillRect(cx - 9 * s, cy - 21 * s, 1 * s, 4 * s);
      ctx.fillRect(cx + 7 * s, cy - 18 * s, 1 * s, 5 * s);

      ctx.fillStyle = '#fef08a';
      ctx.fillRect(cx - 1 * s, cy - 25 * s, 2 * s, 2 * s);
      ctx.fillRect(cx - 9 * s, cy - 22 * s, 2 * s, 2 * s);
      ctx.fillRect(cx + 7 * s, cy - 19 * s, 2 * s, 2 * s);

      ctx.restore();
    };

    drawPixelCactus(160, height * 0.90, 4.5);
    drawPixelCactus(440, height * 0.72, 3.2);
    drawPixelCactus(920, height * 0.65, 2.2);
    drawPixelCactus(1120, height * 0.68, 2.5);
    drawPixelCactus(1520, height * 0.88, 4.0);
    drawPixelCactus(1820, height * 0.75, 3.0);

    // 6. 8-Bit Boulders
    const drawPixelRock = (rx, ry, rw, rh) => {
      ctx.fillStyle = '#451a03';
      ctx.fillRect(rx, ry, rw, rh);
      ctx.fillStyle = '#78350f';
      ctx.fillRect(rx + 4, ry - 3, rw - 8, 4);
      ctx.fillStyle = '#92400e';
      ctx.fillRect(rx + 6, ry + 2, Math.floor(rw * 0.5), Math.floor(rh * 0.5));
    };
    drawPixelRock(320, height * 0.76, 50, 24);
    drawPixelRock(780, height * 0.83, 36, 18);
    drawPixelRock(1320, height * 0.79, 44, 22);

    // 7. Geheimnisvoller 8-Bit Retro Fragezeichen-Block
    const blockX = width * 0.78;
    const blockY = height * 0.70;
    const bw = 48;
    const bh = 48;
    ctx.fillStyle = '#ea580c';
    ctx.fillRect(blockX, blockY, bw, bh);
    ctx.fillStyle = '#facc15';
    ctx.fillRect(blockX + 4, blockY + 4, bw - 8, bh - 8);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(blockX + 18, blockY + 12, 12, 6);
    ctx.fillRect(blockX + 24, blockY + 18, 6, 8);
    ctx.fillRect(blockX + 20, blockY + 24, 6, 6);
    ctx.fillRect(blockX + 20, blockY + 34, 6, 6);

    ctx.restore();
  }

  _renderGizaPyramids(ctx, width, height, t) {
    ctx.save();

    // 1. Radiant Desert Sky
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.6);
    skyGrad.addColorStop(0, '#0284c7');
    skyGrad.addColorStop(0.4, '#38bdf8');
    skyGrad.addColorStop(0.7, '#7dd3fc');
    skyGrad.addColorStop(1, '#fed7aa');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // Blazing Desert Sun & Solar Corona
    const sunX = width * 0.62;
    const sunY = height * 0.16;
    const sunHalo = ctx.createRadialGradient(sunX, sunY, 15, sunX, sunY, 120);
    sunHalo.addColorStop(0, 'rgba(255, 255, 255, 1)');
    sunHalo.addColorStop(0.25, 'rgba(254, 240, 138, 0.85)');
    sunHalo.addColorStop(0.6, 'rgba(251, 191, 36, 0.35)');
    sunHalo.addColorStop(1, 'rgba(251, 191, 36, 0)');
    ctx.fillStyle = sunHalo;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 120, 0, Math.PI * 2);
    ctx.fill();

    // Sun Core
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(sunX, sunY, 28, 0, Math.PI * 2);
    ctx.fill();

    // 2. Distant Pyramids of Giza
    const drawPyramid = (px, py, pw, ph) => {
      // Shaded face (left/east)
      ctx.fillStyle = '#b45309';
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px - pw * 0.45, py + ph);
      ctx.lineTo(px, py + ph);
      ctx.closePath();
      ctx.fill();

      // Lit face (right/sunlit)
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px, py + ph);
      ctx.lineTo(px + pw * 0.55, py + ph);
      ctx.closePath();
      ctx.fill();

      // Golden pyramidion capstone
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px - pw * 0.08, py + ph * 0.15);
      ctx.lineTo(px + pw * 0.1, py + ph * 0.15);
      ctx.closePath();
      ctx.fill();
    };

    drawPyramid(700, height * 0.22, 340, height * 0.30);
    drawPyramid(460, height * 0.26, 280, height * 0.26);
    drawPyramid(280, height * 0.33, 190, height * 0.19);

    // 3. The Great Sphinx of Giza
    const spX = width * 0.58;
    const spY = height * 0.46;
    ctx.fillStyle = '#d97706';
    ctx.beginPath();
    ctx.ellipse(spX, spY + 30, 85, 45, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#b45309';
    ctx.fillRect(spX - 90, spY + 50, 110, 22);

    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.ellipse(spX - 45, spY, 32, 42, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ca8a04';
    ctx.beginPath();
    ctx.moveTo(spX - 70, spY - 20);
    ctx.lineTo(spX - 20, spY - 20);
    ctx.lineTo(spX - 28, spY + 22);
    ctx.lineTo(spX - 62, spY + 22);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#fde047';
    ctx.beginPath();
    ctx.arc(spX - 45, spY - 14, 18, 0, Math.PI * 2);
    ctx.fill();

    // 4. Nile River Ribbon & Sailboat on the Left
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.58);
    ctx.quadraticCurveTo(width * 0.15, height * 0.55, width * 0.28, height * 0.66);
    ctx.lineTo(width * 0.22, height * 0.74);
    ctx.quadraticCurveTo(width * 0.10, height * 0.65, 0, height * 0.70);
    ctx.closePath();
    ctx.fill();

    const boatX = width * 0.14;
    const boatY = height * 0.63;
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.ellipse(boatX, boatY, 26, 8, 0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(boatX - 5, boatY - 5);
    ctx.lineTo(boatX + 4, boatY - 45);
    ctx.lineTo(boatX + 22, boatY - 10);
    ctx.closePath();
    ctx.fill();

    // 5. Date Palm Trees
    const drawPalm = (px, py, scale) => {
      ctx.save();
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 5 * scale;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.quadraticCurveTo(px + 10 * scale, py - 40 * scale, px + 5 * scale, py - 70 * scale);
      ctx.stroke();

      ctx.fillStyle = '#15803d';
      const frondAngles = [-2.4, -1.8, -1.2, -0.6, 0, 0.6];
      frondAngles.forEach(ang => {
        const fx = px + 5 * scale;
        const fy = py - 70 * scale;
        ctx.beginPath();
        ctx.moveTo(fx, fy);
        ctx.quadraticCurveTo(fx + Math.cos(ang) * 45 * scale, fy + Math.sin(ang) * 35 * scale, fx + Math.cos(ang) * 60 * scale, fy + Math.sin(ang) * 50 * scale + 15 * scale);
        ctx.lineWidth = 4 * scale;
        ctx.strokeStyle = '#16a34a';
        ctx.stroke();
      });
      ctx.restore();
    };
    drawPalm(40, height * 0.75, 1.4);
    drawPalm(90, height * 0.72, 1.1);
    drawPalm(width * 0.26, height * 0.68, 0.9);
    drawPalm(width * 0.32, height * 0.66, 1.0);

    // 6. Rolling Golden Desert Dunes
    const duneGrad = ctx.createLinearGradient(0, height * 0.5, 0, height);
    duneGrad.addColorStop(0, '#f59e0b');
    duneGrad.addColorStop(0.5, '#d97706');
    duneGrad.addColorStop(1, '#b45309');
    ctx.fillStyle = duneGrad;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.68);
    ctx.bezierCurveTo(width * 0.25, height * 0.62, width * 0.45, height * 0.74, width * 0.70, height * 0.68);
    ctx.bezierCurveTo(width * 0.85, height * 0.64, width * 0.95, height * 0.70, width, height * 0.66);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#ca8a04';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.82);
    ctx.quadraticCurveTo(width * 0.4, height * 0.88, width * 0.75, height * 0.78);
    ctx.lineTo(width, height * 0.80);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // 7. Ancient Egyptian Temple Facade & Hieroglyphic Wall (Right)
    const templeX = width * 0.78;
    const templeY = height * 0.40;
    const templeW = width * 0.22;
    const templeH = height * 0.60;

    ctx.fillStyle = '#eab308';
    ctx.fillRect(templeX, templeY, templeW, templeH);
    ctx.fillStyle = '#ca8a04';
    ctx.fillRect(templeX + 8, templeY + 8, templeW - 16, templeH - 16);

    ctx.fillStyle = '#a16207';
    ctx.fillRect(templeX - 10, templeY, templeW + 20, 20);
    ctx.fillStyle = '#fde047';
    ctx.beginPath();
    ctx.arc(templeX + templeW * 0.5, templeY + 10, 9, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#78350f';
    for (let row = 0; row < 7; row++) {
      const hy = templeY + 45 + row * 38;
      for (let col = 0; col < 5; col++) {
        const hx = templeX + 30 + col * 36;
        if ((row + col) % 3 === 0) {
          ctx.beginPath();
          ctx.arc(hx, hy, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillRect(hx - 2, hy + 5, 4, 10);
          ctx.fillRect(hx - 6, hy + 8, 12, 3);
        } else if ((row + col) % 3 === 1) {
          ctx.beginPath();
          ctx.ellipse(hx, hy + 4, 7, 10, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillRect(hx - 4, hy + 2, 8, 4);
        } else {
          ctx.fillRect(hx - 6, hy, 12, 3);
          ctx.fillRect(hx - 6, hy + 5, 12, 3);
          ctx.fillRect(hx - 6, hy + 10, 12, 3);
        }
      }
    }

    ctx.fillStyle = '#1c1917';
    ctx.fillRect(templeX + templeW * 0.35, templeY + templeH * 0.40, templeW * 0.30, templeH * 0.60);

    // 8. Sandstone Obelisk
    const drawObelisk = (ox, oy, ow, oh) => {
      ctx.fillStyle = '#ca8a04';
      ctx.beginPath();
      ctx.moveTo(ox, oy + oh);
      ctx.lineTo(ox + ow, oy + oh);
      ctx.lineTo(ox + ow * 0.8, oy + oh * 0.12);
      ctx.lineTo(ox + ow * 0.2, oy + oh * 0.12);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.moveTo(ox + ow * 0.2, oy + oh * 0.12);
      ctx.lineTo(ox + ow * 0.8, oy + oh * 0.12);
      ctx.lineTo(ox + ow * 0.5, oy);
      ctx.closePath();
      ctx.fill();
    };
    drawObelisk(templeX - 35, templeY + 60, 24, height * 0.35);

    // 9. Camel Caravan Silhouette
    const drawCamel = (cx, cy, scale) => {
      ctx.fillStyle = '#78350f';
      ctx.beginPath();
      ctx.ellipse(cx, cy, 14 * scale, 9 * scale, 0, 0, Math.PI * 2);
      ctx.ellipse(cx - 3 * scale, cy - 7 * scale, 7 * scale, 8 * scale, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(cx + 8 * scale, cy - 14 * scale, 4 * scale, 16 * scale);
      ctx.ellipse(cx + 12 * scale, cy - 14 * scale, 6 * scale, 3 * scale, 0, 0, Math.PI * 2);
      ctx.fillRect(cx - 10 * scale, cy + 5 * scale, 2.5 * scale, 15 * scale);
      ctx.fillRect(cx - 4 * scale, cy + 5 * scale, 2.5 * scale, 15 * scale);
      ctx.fillRect(cx + 4 * scale, cy + 5 * scale, 2.5 * scale, 15 * scale);
      ctx.fillRect(cx + 9 * scale, cy + 5 * scale, 2.5 * scale, 15 * scale);
    };
    drawCamel(width * 0.44, height * 0.72, 1.2);
    drawCamel(width * 0.49, height * 0.73, 1.0);
    drawCamel(width * 0.53, height * 0.74, 0.85);

    ctx.restore();
  }

  _renderSoccerStadium(ctx, width, height, t) {
    ctx.save();

    // 1. Dusk/Night Stadium Sky
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.45);
    skyGrad.addColorStop(0, '#090d16');
    skyGrad.addColorStop(0.5, '#111827');
    skyGrad.addColorStop(1, '#1e293b');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Stadium Grandstands & Packed Crowd
    const standY = height * 0.20;
    const standH = height * 0.35;
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, standY, width, standH);

    const deckColors = ['#334155', '#1e293b', '#0f172a'];
    for (let d = 0; d < 4; d++) {
      ctx.fillStyle = deckColors[d % deckColors.length];
      ctx.fillRect(0, standY + d * (standH / 4), width, standH / 4);
    }

    const crowdColors = ['#ef4444', '#3b82f6', '#facc15', '#ffffff', '#22c55e', '#f97316', '#a855f7'];
    for (let cy = standY + 10; cy < standY + standH - 15; cy += 11) {
      for (let cx = 15; cx < width - 15; cx += 14) {
        ctx.fillStyle = crowdColors[(Math.floor(cx * 7 + cy * 13)) % crowdColors.length];
        ctx.beginPath();
        ctx.arc(cx + (Math.sin(cx) * 2), cy, 3.0, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Banners & Flags
    const bannerColors = ['#ef4444', '#3b82f6', '#facc15', '#10b981', '#f97316'];
    for (let bx = 60; bx < width - 60; bx += 140) {
      ctx.fillStyle = bannerColors[(bx / 140) % bannerColors.length];
      ctx.fillRect(bx, standY + standH - 18, 90, 16);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(bx, standY + standH - 18, 90, 16);
    }

    // Stadium Cantilever Roof Arch
    ctx.fillStyle = '#475569';
    ctx.fillRect(0, standY - 14, width, 14);
    ctx.fillStyle = '#64748b';
    for (let rx = 50; rx < width; rx += 180) {
      ctx.fillRect(rx, 0, 16, standY);
    }

    // 3. Pristine Green Soccer Pitch
    const pitchY = height * 0.52;
    const pitchH = height - pitchY;
    const stripeColors = ['#15803d', '#16a34a'];
    const numStripes = 14;
    const stripeW = width / numStripes;

    for (let s = 0; s < numStripes; s++) {
      ctx.fillStyle = stripeColors[s % 2];
      ctx.fillRect(s * stripeW, pitchY, stripeW, pitchH);
    }

    // White Pitch Markings
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3.5;

    ctx.beginPath();
    ctx.moveTo(0, pitchY + 10);
    ctx.lineTo(width, pitchY + 10);
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(width * 0.5, pitchY + pitchH * 0.35, 130, 48, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(width * 0.5, pitchY + pitchH * 0.35, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(width * 0.5, pitchY + 10);
    ctx.lineTo(width * 0.5, height);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeRect(0, pitchY + pitchH * 0.15, width * 0.22, pitchH * 0.65);
    ctx.strokeRect(0, pitchY + pitchH * 0.30, width * 0.09, pitchH * 0.36);

    // 4. Soccer Goal with Netting
    const goalX = width * 0.05;
    const goalY = pitchY + pitchH * 0.25;
    const goalW = width * 0.12;
    const goalH = height * 0.28;

    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.moveTo(goalX, goalY);
    ctx.lineTo(goalX + goalW, goalY + 20);
    ctx.lineTo(goalX + goalW, goalY + goalH);
    ctx.lineTo(goalX, goalY + goalH);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 1.2;
    for (let ny = goalY; ny < goalY + goalH; ny += 12) {
      ctx.beginPath();
      ctx.moveTo(goalX, ny);
      ctx.lineTo(goalX + goalW, ny + 15);
      ctx.stroke();
    }
    for (let nx = goalX; nx < goalX + goalW; nx += 14) {
      ctx.beginPath();
      ctx.moveTo(nx, goalY);
      ctx.lineTo(nx, goalY + goalH);
      ctx.stroke();
    }

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 6;
    ctx.strokeRect(goalX, goalY, goalW * 0.6, goalH);

    // 5. Team Dugout / Trainerbank
    const benchX = width * 0.72;
    const benchY = pitchY + pitchH * 0.55;
    const benchW = 280;
    const benchH = 100;

    ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(benchX, benchY, benchW, benchH, [20, 20, 0, 0]);
    ctx.fill();
    ctx.stroke();

    for (let s = 0; s < 6; s++) {
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.roundRect(benchX + 20 + s * 42, benchY + 40, 32, 45, 6);
      ctx.fill();
    }

    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.ellipse(benchX + benchW + 25, benchY + 65, 14, 18, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(benchX + benchW + 18, benchY + 80, 14, 15);

    // 6. Giant Stadium Floodlight Towers
    const drawFloodlight = (fx, fy, angle) => {
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(fx - 15, height * 0.6);
      ctx.lineTo(fx - 8, fy + 40);
      ctx.lineTo(fx + 8, fy + 40);
      ctx.lineTo(fx + 15, height * 0.6);
      ctx.stroke();

      for (let yb = fy + 50; yb < height * 0.6; yb += 35) {
        ctx.beginPath();
        ctx.moveTo(fx - 12, yb);
        ctx.lineTo(fx + 12, yb);
        ctx.stroke();
      }

      ctx.fillStyle = '#334155';
      ctx.fillRect(fx - 40, fy - 20, 80, 50);

      ctx.fillStyle = '#fef08a';
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 5; col++) {
          ctx.beginPath();
          ctx.arc(fx - 30 + col * 15, fy - 10 + row * 15, 5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const beamGrad = ctx.createRadialGradient(fx, fy + 15, 20, fx, fy + 250, 420);
      beamGrad.addColorStop(0, 'rgba(254, 240, 138, 0.45)');
      beamGrad.addColorStop(0.5, 'rgba(254, 240, 138, 0.15)');
      beamGrad.addColorStop(1, 'rgba(254, 240, 138, 0)');

      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.moveTo(fx - 35, fy + 20);
      ctx.lineTo(fx + 35, fy + 20);
      ctx.lineTo(fx + (angle > 0 ? 550 : -200), height);
      ctx.lineTo(fx + (angle > 0 ? 100 : -550), height);
      ctx.closePath();
      ctx.fill();
    };

    drawFloodlight(width * 0.08, height * 0.10, 1);
    drawFloodlight(width * 0.92, height * 0.10, -1);

    ctx.restore();
  }

  _renderPrairieTornado(ctx, width, height, t) {
    ctx.save();

    // 1. Supercell Storm Sky
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.65);
    skyGrad.addColorStop(0, '#042f2e');
    skyGrad.addColorStop(0.3, '#0f172a');
    skyGrad.addColorStop(0.6, '#1e1b4b');
    skyGrad.addColorStop(0.85, '#312e81');
    skyGrad.addColorStop(1, '#f97316');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // Swirling Wall Clouds
    ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
    for (let c = 0; c < 8; c++) {
      ctx.beginPath();
      ctx.ellipse(width * (0.12 * c), height * 0.12 + Math.sin(c) * 20, 240, 90, 0.1, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Colossal Tornado Funnel Cloud
    const torX = width * 0.35;
    const torTopY = height * 0.05;
    const torTouchY = height * 0.62;

    const funnelSteps = 22;
    for (let i = 0; i < funnelSteps; i++) {
      const prog = i / funnelSteps;
      const cy = torTopY + (torTouchY - torTopY) * prog;
      const cw = (1 - prog * 0.82) * 260 + Math.sin(t * 3 + i * 0.4) * 12;
      const ch = 18 + prog * 8;
      const sway = Math.sin(t * 2.5 + i * 0.3) * (prog * 35);

      const ringGrad = ctx.createLinearGradient(torX + sway - cw, cy, torX + sway + cw, cy);
      ringGrad.addColorStop(0, '#0f172a');
      ringGrad.addColorStop(0.35, '#1e293b');
      ringGrad.addColorStop(0.7, '#334155');
      ringGrad.addColorStop(1, '#1e293b');

      ctx.fillStyle = ringGrad;
      ctx.beginPath();
      ctx.ellipse(torX + sway, cy, cw, ch, Math.sin(i * 0.2) * 0.1, 0, Math.PI * 2);
      ctx.fill();
    }

    // Debris Bowl
    const debX = torX + Math.sin(t * 2.5 + funnelSteps * 0.3) * 35;
    const debY = torTouchY;
    const debGrad = ctx.createRadialGradient(debX, debY, 20, debX, debY, 110);
    debGrad.addColorStop(0, 'rgba(82, 82, 91, 0.85)');
    debGrad.addColorStop(0.5, 'rgba(120, 53, 15, 0.6)');
    debGrad.addColorStop(1, 'rgba(120, 53, 15, 0)');
    ctx.fillStyle = debGrad;
    ctx.beginPath();
    ctx.arc(debX, debY, 110, 0, Math.PI * 2);
    ctx.fill();

    // 3. Ambient Lightning in the Distance
    ctx.strokeStyle = '#cffafe';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#67e8f9';
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.moveTo(width * 0.18, height * 0.10);
    ctx.lineTo(width * 0.21, height * 0.25);
    ctx.lineTo(width * 0.19, height * 0.38);
    ctx.lineTo(width * 0.23, height * 0.52);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // 4. Windswept Prairie Plains
    const prairieGrad = ctx.createLinearGradient(0, height * 0.55, 0, height);
    prairieGrad.addColorStop(0, '#78350f');
    prairieGrad.addColorStop(0.3, '#92400e');
    prairieGrad.addColorStop(0.7, '#b45309');
    prairieGrad.addColorStop(1, '#d97706');
    ctx.fillStyle = prairieGrad;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.60);
    ctx.bezierCurveTo(width * 0.3, height * 0.56, width * 0.6, height * 0.64, width, height * 0.58);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Prairie Grass Blades
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 1.8;
    for (let gx = 0; gx < width; gx += 22) {
      const gy = height * 0.65 + Math.sin(gx * 0.02) * 20 + Math.random() * (height * 0.3);
      ctx.beginPath();
      ctx.moveTo(gx, gy);
      ctx.quadraticCurveTo(gx + 15, gy - 18, gx + 28, gy - 24);
      ctx.stroke();
    }

    // Dirt Prairie Road
    ctx.fillStyle = '#713f12';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.76);
    ctx.quadraticCurveTo(width * 0.18, height * 0.72, width * 0.35, height * 0.68);
    ctx.lineTo(width * 0.38, height * 0.71);
    ctx.quadraticCurveTo(width * 0.19, height * 0.78, 0, height * 0.88);
    ctx.closePath();
    ctx.fill();

    // 5. Classic Red Wooden Barn
    const barnX = width * 0.68;
    const barnY = height * 0.54;
    const barnW = 320;
    const barnH = 190;

    ctx.fillStyle = '#991b1b';
    ctx.fillRect(barnX, barnY + 60, barnW, barnH - 60);

    ctx.strokeStyle = '#7f1d1d';
    ctx.lineWidth = 1.5;
    for (let px = barnX + 15; px < barnX + barnW; px += 20) {
      ctx.beginPath();
      ctx.moveTo(px, barnY + 60);
      ctx.lineTo(px, barnY + barnH);
      ctx.stroke();
    }

    ctx.fillStyle = '#475569';
    ctx.beginPath();
    ctx.moveTo(barnX - 15, barnY + 60);
    ctx.lineTo(barnX + 45, barnY + 15);
    ctx.lineTo(barnX + barnW * 0.5, barnY);
    ctx.lineTo(barnX + barnW - 45, barnY + 15);
    ctx.lineTo(barnX + barnW + 15, barnY + 60);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#1c1917';
    ctx.fillRect(barnX + barnW * 0.35, barnY + 80, 85, barnH - 80);
    ctx.strokeStyle = '#f8fafc';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(barnX + barnW * 0.35, barnY + 80);
    ctx.lineTo(barnX + barnW * 0.35 + 85, barnY + barnH);
    ctx.moveTo(barnX + barnW * 0.35 + 85, barnY + 80);
    ctx.lineTo(barnX + barnW * 0.35, barnY + barnH);
    ctx.stroke();

    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(barnX + barnW * 0.5, barnY - 14, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(barnX + barnW * 0.5 - 2, barnY - 12, 4, 14);

    // 6. Tall Farm Windmill
    const wmX = width * 0.56;
    const wmY = height * 0.38;

    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(wmX - 22, height * 0.70);
    ctx.lineTo(wmX - 6, wmY + 25);
    ctx.lineTo(wmX + 6, wmY + 25);
    ctx.lineTo(wmX + 22, height * 0.70);
    ctx.stroke();

    for (let sy = wmY + 45; sy < height * 0.70; sy += 35) {
      ctx.beginPath();
      ctx.moveTo(wmX - 16, sy);
      ctx.lineTo(wmX + 16, sy);
      ctx.stroke();
    }

    ctx.save();
    ctx.translate(wmX, wmY + 20);
    ctx.rotate(t * 8);
    ctx.fillStyle = '#94a3b8';
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.5;
    for (let b = 0; b < 12; b++) {
      ctx.save();
      ctx.rotate((b * Math.PI * 2) / 12);
      ctx.fillRect(-4, -48, 8, 38);
      ctx.strokeRect(-4, -48, 8, 38);
      ctx.restore();
    }
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = '#64748b';
    ctx.fillRect(wmX + 8, wmY + 12, 35, 14);

    // 7. Wooden Fence
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 4;
    for (let fx = width * 0.45; fx < barnX - 20; fx += 45) {
      ctx.beginPath();
      ctx.moveTo(fx, height * 0.72);
      ctx.lineTo(fx + 6, height * 0.65);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(width * 0.45, height * 0.67);
    ctx.lineTo(barnX - 15, height * 0.68);
    ctx.stroke();

    ctx.restore();
  }

  _renderRetroLivingRoom(ctx, width, height, t) {
    ctx.save();

    // 1. 70s Retro Floral Wallpaper Background
    ctx.fillStyle = '#c2410c';
    ctx.fillRect(0, 0, width, height * 0.70);

    const pSize = 75;
    for (let py = 0; py < height * 0.70; py += pSize) {
      for (let px = 0; px < width; px += pSize) {
        const cx = px + pSize * 0.5;
        const cy = py + pSize * 0.5;

        ctx.fillStyle = '#ea580c';
        ctx.beginPath();
        ctx.arc(cx, cy, 26, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#facc15';
        ctx.beginPath();
        ctx.arc(cx, cy, 18, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#78350f';
        ctx.beginPath();
        ctx.arc(cx, cy, 9, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 2. Parquet Wooden Flooring
    const floorY = height * 0.68;
    ctx.fillStyle = '#78350f';
    ctx.fillRect(0, floorY, width, height - floorY);

    ctx.strokeStyle = '#451a03';
    ctx.lineWidth = 1.5;
    for (let fx = 0; fx < width; fx += 55) {
      ctx.beginPath();
      ctx.moveTo(fx, floorY);
      ctx.lineTo(fx - 40, height);
      ctx.stroke();
    }
    for (let fy = floorY; fy < height; fy += 28) {
      ctx.beginPath();
      ctx.moveTo(0, fy);
      ctx.lineTo(width, fy);
      ctx.stroke();
    }

    // 3. Shaggy Orange Rug in the Center
    ctx.fillStyle = '#ea580c';
    ctx.beginPath();
    ctx.ellipse(width * 0.52, height * 0.84, width * 0.35, height * 0.14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 4;
    ctx.stroke();

    // 4. Brick Fireplace on the Left
    const fpX = width * 0.04;
    const fpY = height * 0.22;
    const fpW = 340;
    const fpH = height * 0.54;

    ctx.fillStyle = '#991b1b';
    ctx.fillRect(fpX, fpY, fpW, fpH);

    ctx.strokeStyle = '#7f1d1d';
    ctx.lineWidth = 2;
    for (let by = fpY; by < fpY + fpH; by += 24) {
      ctx.beginPath();
      ctx.moveTo(fpX, by);
      ctx.lineTo(fpX + fpW, by);
      ctx.stroke();
    }

    ctx.fillStyle = '#451a03';
    ctx.fillRect(fpX - 20, fpY - 14, fpW + 40, 24);

    ctx.fillStyle = '#d97706';
    ctx.beginPath();
    ctx.ellipse(fpX + fpW * 0.5, fpY - 26, 22, 16, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(fpX + fpW * 0.5, fpY - 26, 12, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#1c1917';
    ctx.fillRect(fpX + 45, fpY + fpH * 0.35, fpW - 90, fpH * 0.65);

    ctx.fillStyle = '#451a03';
    ctx.fillRect(fpX + 70, fpY + fpH - 35, fpW - 140, 18);

    const flameH = 45 + Math.sin(t * 8) * 8;
    const flameGrad = ctx.createLinearGradient(0, fpY + fpH - 35, 0, fpY + fpH - 35 - flameH);
    flameGrad.addColorStop(0, '#ef4444');
    flameGrad.addColorStop(0.4, '#f59e0b');
    flameGrad.addColorStop(1, '#fef08a');
    ctx.fillStyle = flameGrad;
    ctx.beginPath();
    ctx.moveTo(fpX + 90, fpY + fpH - 25);
    ctx.quadraticCurveTo(fpX + 110, fpY + fpH - 25 - flameH * 1.1, fpX + 140, fpY + fpH - 25);
    ctx.quadraticCurveTo(fpX + 160, fpY + fpH - 25 - flameH * 1.3, fpX + 190, fpY + fpH - 25);
    ctx.quadraticCurveTo(fpX + 210, fpY + fpH - 25 - flameH, fpX + 240, fpY + fpH - 25);
    ctx.closePath();
    ctx.fill();

    // 5. Heavy Rustic Wooden Sofa (Center)
    const sofaX = width * 0.32;
    const sofaY = height * 0.44;
    const sofaW = 460;
    const sofaH = 240;

    ctx.fillStyle = '#451a03';
    ctx.fillRect(sofaX, sofaY + sofaH - 35, sofaW, 35);
    ctx.fillRect(sofaX - 25, sofaY + 60, 35, sofaH - 60);
    ctx.fillRect(sofaX + sofaW - 10, sofaY + 60, 35, sofaH - 60);

    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.roundRect(sofaX + 15, sofaY, sofaW * 0.46, sofaH * 0.55, 14);
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(sofaX + sofaW * 0.50, sofaY, sofaW * 0.46, sofaH * 0.55, 14);
    ctx.fill();

    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.roundRect(sofaX + 10, sofaY + sofaH * 0.50, sofaW * 0.47, sofaH * 0.35, 12);
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(sofaX + sofaW * 0.50, sofaY + sofaH * 0.50, sofaW * 0.47, sofaH * 0.35, 12);
    ctx.fill();

    ctx.fillStyle = '#ea580c';
    ctx.beginPath();
    ctx.ellipse(sofaX + 50, sofaY + sofaH * 0.52, 28, 28, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(sofaX + 50, sofaY + sofaH * 0.52, 9, 0, Math.PI * 2);
    ctx.fill();

    // 6. Teak Sideboard Cabinet with CRT TV & Turntable (Right)
    const credX = width * 0.68;
    const credY = height * 0.50;
    const credW = 480;
    const credH = 170;

    ctx.fillStyle = '#78350f';
    ctx.fillRect(credX, credY, credW, credH);
    ctx.fillStyle = '#451a03';
    ctx.fillRect(credX + 15, credY + 15, credW * 0.46, credH - 30);
    ctx.fillRect(credX + credW * 0.50, credY + 15, credW * 0.46, credH - 30);

    // CRT TV
    const tvX = credX + 35;
    const tvY = credY - 145;
    const tvW = 190;
    const tvH = 145;

    ctx.fillStyle = '#713f12';
    ctx.fillRect(tvX, tvY, tvW, tvH);
    ctx.strokeStyle = '#3e2723';
    ctx.lineWidth = 3;
    ctx.strokeRect(tvX, tvY, tvW, tvH);

    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.roundRect(tvX + 14, tvY + 14, tvW * 0.65, tvH - 28, 12);
    ctx.fill();

    ctx.fillStyle = '#292524';
    ctx.beginPath();
    ctx.arc(tvX + tvW - 32, tvY + 35, 10, 0, Math.PI * 2);
    ctx.arc(tvX + tvW - 32, tvY + 68, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(tvX + tvW * 0.5, tvY);
    ctx.lineTo(tvX + tvW * 0.5 - 45, tvY - 70);
    ctx.moveTo(tvX + tvW * 0.5, tvY);
    ctx.lineTo(tvX + tvW * 0.5 + 45, tvY - 70);
    ctx.stroke();

    // Vinyl Record Turntable
    const ttX = credX + credW * 0.54;
    const ttY = credY - 75;
    const ttW = 160;
    const ttH = 75;

    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(ttX, ttY, ttW, ttH);
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.strokeRect(ttX, ttY, ttW, ttH);

    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.ellipse(ttX + 60, ttY + 40, 42, 24, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ea580c';
    ctx.beginPath();
    ctx.ellipse(ttX + 60, ttY + 40, 14, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(ttX + ttW - 25, ttY + 20);
    ctx.lineTo(ttX + 75, ttY + 38);
    ctx.stroke();

    // 7. Vintage Floor Lamp
    const lampX = width * 0.28;
    const lampY = height * 0.15;
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.moveTo(lampX - 25, lampY + 70);
    ctx.lineTo(lampX - 45, lampY + 120);
    ctx.lineTo(lampX + 45, lampY + 120);
    ctx.lineTo(lampX + 25, lampY + 70);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(lampX, lampY + 120);
    ctx.lineTo(lampX, height * 0.72);
    ctx.stroke();

    ctx.restore();
  }

  _renderComicDrawingBoard(ctx, width, height, t) {
    ctx.save();

    // 1. Wooden Drafting Table Background
    const woodGrad = ctx.createLinearGradient(0, 0, width, height);
    woodGrad.addColorStop(0, '#592e09');
    woodGrad.addColorStop(0.5, '#78350f');
    woodGrad.addColorStop(1, '#451a03');
    ctx.fillStyle = woodGrad;
    ctx.fillRect(0, 0, width, height);

    // Subtle Wood Grains
    ctx.strokeStyle = 'rgba(217, 119, 6, 0.12)';
    ctx.lineWidth = 2;
    for (let gy = 15; gy < height; gy += 32) {
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.bezierCurveTo(width * 0.3, gy + Math.sin(gy) * 12, width * 0.7, gy - Math.sin(gy) * 8, width, gy);
      ctx.stroke();
    }

    // 2. Giant White Drawing Paper Sheet
    const paperMarginX = 70;
    const paperMarginY = 38;
    const paperW = width - paperMarginX * 2;
    const paperH = height - paperMarginY * 2;

    // Paper Drop Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.beginPath();
    ctx.roundRect(paperMarginX + 10, paperMarginY + 12, paperW, paperH, 8);
    ctx.fill();

    // Paper Base
    const paperGrad = ctx.createLinearGradient(paperMarginX, paperMarginY, paperMarginX + paperW, paperMarginY + paperH);
    paperGrad.addColorStop(0, '#ffffff');
    paperGrad.addColorStop(0.7, '#f8fafc');
    paperGrad.addColorStop(1, '#f1f5f9');
    ctx.fillStyle = paperGrad;
    ctx.beginPath();
    ctx.roundRect(paperMarginX, paperMarginY, paperW, paperH, 6);
    ctx.fill();

    // Paper Border Rule
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Blue Drafting Guideline Grid (Faint)
    ctx.strokeStyle = 'rgba(147, 197, 253, 0.22)';
    ctx.lineWidth = 1;
    for (let gx = paperMarginX + 40; gx < paperMarginX + paperW; gx += 60) {
      ctx.beginPath();
      ctx.moveTo(gx, paperMarginY);
      ctx.lineTo(gx, paperMarginY + paperH);
      ctx.stroke();
    }
    for (let gy = paperMarginY + 40; gy < paperMarginY + paperH; gy += 60) {
      ctx.beginPath();
      ctx.moveTo(paperMarginX, gy);
      ctx.lineTo(paperMarginX + paperW, gy);
      ctx.stroke();
    }

    // Masking Tape Strips on 4 Corners
    const tapeColor = 'rgba(254, 240, 138, 0.78)';
    const tapeBorder = 'rgba(202, 138, 4, 0.4)';
    const corners = [
      { x: paperMarginX - 10, y: paperMarginY - 8, angle: -0.65 },
      { x: paperMarginX + paperW - 40, y: paperMarginY - 12, angle: 0.65 },
      { x: paperMarginX - 14, y: paperMarginY + paperH - 35, angle: 0.65 },
      { x: paperMarginX + paperW - 35, y: paperMarginY + paperH - 30, angle: -0.65 }
    ];
    corners.forEach(c => {
      ctx.save();
      ctx.translate(c.x + 25, c.y + 15);
      ctx.rotate(c.angle);
      ctx.fillStyle = tapeColor;
      ctx.fillRect(-30, -12, 60, 24);
      ctx.strokeStyle = tapeBorder;
      ctx.lineWidth = 1;
      ctx.strokeRect(-30, -12, 60, 24);
      ctx.restore();
    });

    // 3. Bleistiftlinien (Graphite Pencil Construction Guidelines)
    ctx.strokeStyle = 'rgba(71, 85, 105, 0.35)';
    ctx.lineWidth = 1.4;
    ctx.setLineDash([8, 6]);

    // Horizon guide line & perspective guides
    const vpX = paperMarginX + paperW * 0.52;
    const vpY = paperMarginY + paperH * 0.44;
    ctx.beginPath();
    ctx.moveTo(paperMarginX + 30, vpY);
    ctx.lineTo(paperMarginX + paperW - 30, vpY);
    for (let a = 0; a < 6; a++) {
      const ang = 0.5 + a * 0.42;
      ctx.moveTo(vpX, vpY);
      ctx.lineTo(vpX + Math.cos(ang) * (paperW * 0.6), vpY + Math.sin(ang) * (paperH * 0.6));
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Pencil Skeleton for Moorhuhn
    ctx.strokeStyle = 'rgba(100, 116, 139, 0.45)';
    ctx.lineWidth = 1.5;
    const chkX = paperMarginX + paperW * 0.72;
    const chkY = paperMarginY + paperH * 0.50;
    ctx.beginPath();
    ctx.arc(chkX, chkY, 48, 0, Math.PI * 2);
    ctx.arc(chkX + 18, chkY - 55, 34, 0, Math.PI * 2);
    ctx.moveTo(chkX - 30, chkY - 55);
    ctx.lineTo(chkX + 65, chkY - 55);
    ctx.stroke();

    // 4. Radierspuren (Eraser Smudges & Rubber Dust)
    const smudgeGrad1 = ctx.createRadialGradient(paperMarginX + 320, paperMarginY + 220, 10, paperMarginX + 320, paperMarginY + 220, 75);
    smudgeGrad1.addColorStop(0, 'rgba(148, 163, 184, 0.30)');
    smudgeGrad1.addColorStop(1, 'rgba(148, 163, 184, 0)');
    ctx.fillStyle = smudgeGrad1;
    ctx.beginPath();
    ctx.arc(paperMarginX + 320, paperMarginY + 220, 75, 0, Math.PI * 2);
    ctx.fill();

    const smudgeGrad2 = ctx.createRadialGradient(paperMarginX + 850, paperMarginY + 380, 15, paperMarginX + 850, paperMarginY + 380, 90);
    smudgeGrad2.addColorStop(0, 'rgba(148, 163, 184, 0.28)');
    smudgeGrad2.addColorStop(1, 'rgba(148, 163, 184, 0)');
    ctx.fillStyle = smudgeGrad2;
    ctx.beginPath();
    ctx.arc(paperMarginX + 850, paperMarginY + 380, 90, 0, Math.PI * 2);
    ctx.fill();

    // Eraser crumbs / shavings scattered
    ctx.fillStyle = 'rgba(244, 114, 182, 0.75)';
    const crumbs = [
      [paperMarginX + 280, paperMarginY + 230, 2.5],
      [paperMarginX + 295, paperMarginY + 242, 3.2],
      [paperMarginX + 335, paperMarginY + 215, 2.0],
      [paperMarginX + 870, paperMarginY + 395, 3.5],
      [paperMarginX + 890, paperMarginY + 380, 2.2],
      [paperMarginX + 1720, paperMarginY + paperH - 45, 4.0],
      [paperMarginX + 1745, paperMarginY + paperH - 38, 2.8],
      [paperMarginX + 1765, paperMarginY + paperH - 52, 3.1]
    ];
    crumbs.forEach(([cx, cy, cr]) => {
      ctx.beginPath();
      ctx.ellipse(cx, cy, cr, cr * 0.5, 0.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // 5. Inked Comic Landscape (Sketched Landscape with Tinte)
    ctx.strokeStyle = '#0f172a';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Inked Comic Hills in Background
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(paperMarginX, paperMarginY + paperH * 0.58);
    ctx.quadraticCurveTo(paperMarginX + paperW * 0.25, paperMarginY + paperH * 0.42, paperMarginX + paperW * 0.50, paperMarginY + paperH * 0.56);
    ctx.quadraticCurveTo(paperMarginX + paperW * 0.75, paperMarginY + paperH * 0.46, paperMarginX + paperW, paperMarginY + paperH * 0.54);
    ctx.stroke();

    // Foreground Hill
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(paperMarginX, paperMarginY + paperH * 0.74);
    ctx.quadraticCurveTo(paperMarginX + paperW * 0.35, paperMarginY + paperH * 0.62, paperMarginX + paperW * 0.70, paperMarginY + paperH * 0.72);
    ctx.quadraticCurveTo(paperMarginX + paperW * 0.88, paperMarginY + paperH * 0.66, paperMarginX + paperW, paperMarginY + paperH * 0.78);
    ctx.stroke();

    // Cross-Hatching / Shading on Hills
    ctx.lineWidth = 2.2;
    ctx.strokeStyle = '#1e293b';
    for (let hx = paperMarginX + 80; hx < paperMarginX + paperW * 0.45; hx += 16) {
      ctx.beginPath();
      ctx.moveTo(hx, paperMarginY + paperH * 0.68);
      ctx.lineTo(hx - 15, paperMarginY + paperH * 0.75);
      ctx.stroke();
    }
    for (let hx = paperMarginX + paperW * 0.60; hx < paperMarginX + paperW * 0.90; hx += 18) {
      ctx.beginPath();
      ctx.moveTo(hx, paperMarginY + paperH * 0.73);
      ctx.lineTo(hx - 18, paperMarginY + paperH * 0.80);
      ctx.stroke();
    }

    // Inked Cartoon Clouds
    const drawComicCloud = (ccx, ccy, cscale) => {
      ctx.save();
      ctx.translate(ccx, ccy);
      ctx.scale(cscale, cscale);
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 4;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, 32, Math.PI * 0.8, Math.PI * 1.8);
      ctx.arc(38, -14, 38, Math.PI * 1.1, Math.PI * 1.9);
      ctx.arc(82, 0, 30, Math.PI * 1.3, Math.PI * 2.3);
      ctx.arc(44, 24, 28, Math.PI * 0.1, Math.PI * 0.9);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(10, 20); ctx.lineTo(18, 25);
      ctx.moveTo(25, 20); ctx.lineTo(33, 25);
      ctx.moveTo(40, 20); ctx.lineTo(48, 25);
      ctx.stroke();
      ctx.restore();
    };
    drawComicCloud(paperMarginX + paperW * 0.18, paperMarginY + paperH * 0.22, 1.1);
    drawComicCloud(paperMarginX + paperW * 0.52, paperMarginY + paperH * 0.16, 0.9);
    drawComicCloud(paperMarginX + paperW * 0.82, paperMarginY + paperH * 0.25, 1.0);

    // Inked Cartoon Tree
    const treeX = paperMarginX + paperW * 0.28;
    const treeY = paperMarginY + paperH * 0.64;
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(treeX, treeY);
    ctx.lineTo(treeX + 6, treeY - 80);
    ctx.lineTo(treeX + 24, treeY);
    ctx.stroke();
    ctx.lineWidth = 4.5;
    ctx.beginPath();
    ctx.arc(treeX + 12, treeY - 110, 42, 0, Math.PI * 2);
    ctx.stroke();

    // 6. Cartoon Moorhuhn Drawing in Progress
    ctx.save();
    ctx.translate(chkX, chkY);
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 4.5;

    ctx.beginPath();
    ctx.ellipse(0, 0, 44, 34, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(18, -48, 30, 24, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Big Googly Comic Eyes
    ctx.fillStyle = '#ffffff';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.arc(8, -54, 14, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();
    ctx.beginPath();
    ctx.arc(26, -54, 14, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(10, -53, 5, 0, Math.PI * 2);
    ctx.arc(28, -53, 5, 0, Math.PI * 2);
    ctx.fill();

    // Yellow Beak
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.moveTo(34, -50);
    ctx.lineTo(68, -44);
    ctx.lineTo(34, -36);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 3.5;
    ctx.stroke();

    // Red Comb
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(8, -74, 9, 0, Math.PI * 2);
    ctx.arc(20, -78, 11, 0, Math.PI * 2);
    ctx.arc(32, -73, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.restore();

    // 7. Interactive Artist Props:
    // A. Ink Bottle with Spill (x: 480, y: height * 0.74)
    const inkX = 480;
    const inkY = height * 0.74;
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.ellipse(inkX + 15, inkY + 28, 55, 20, 0.2, 0, Math.PI * 2);
    ctx.fill();
    [[inkX - 35, inkY + 38, 5], [inkX + 68, inkY + 22, 6], [inkX + 45, inkY + 44, 4], [inkX - 20, inkY + 52, 3.5]].forEach(([sx, sy, sr]) => {
      ctx.beginPath();
      ctx.arc(sx, sy, sr, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(inkX - 25, inkY - 30, 50, 48);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(inkX - 25, inkY - 30, 50, 48);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(inkX - 15, inkY - 48, 30, 18);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(inkX - 17, inkY - 54, 34, 8);
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(inkX - 18, inkY - 18, 36, 24);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('INK', inkX, inkY - 2);

    // B. Giant Comic Eraser (x: 1820, y: height * 0.76)
    const eraX = 1820;
    const eraY = height * 0.76;
    ctx.save();
    ctx.translate(eraX, eraY);
    ctx.rotate(0.18);
    ctx.fillStyle = '#f472b6';
    ctx.beginPath();
    ctx.roundRect(-55, -24, 110, 48, 8);
    ctx.fill();
    ctx.strokeStyle = '#be185d';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(-55, -24, 45, 48);
    ctx.strokeRect(-55, -24, 45, 48);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ERASER', 12, 5);
    ctx.restore();

    // C. Comic Speech Bubble (POW!) at x: 1280, y: height * 0.28
    const powX = 1280;
    const powY = height * 0.28;
    ctx.save();
    ctx.translate(powX, powY);
    const bubbleScale = 1.0 + Math.sin(t * 4) * 0.05;
    ctx.scale(bubbleScale, bubbleScale);
    ctx.fillStyle = '#facc15';
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 4;
    ctx.beginPath();
    const burstPoints = 14;
    for (let b = 0; b < burstPoints * 2; b++) {
      const radius = b % 2 === 0 ? 68 : 42;
      const angle = (b * Math.PI) / burstPoints;
      const bx = Math.cos(angle) * radius;
      const by = Math.sin(angle) * radius * 0.72;
      if (b === 0) ctx.moveTo(bx, by);
      else ctx.lineTo(bx, by);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ef4444';
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 5;
    ctx.font = '900 32px "Outfit", "Arial Black", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.strokeText('POW!', 0, 0);
    ctx.fillText('POW!', 0, 0);
    ctx.restore();

    // 8. Dipping Pen / Dip Nib pointing at the Moorhuhn
    const penX = chkX + 70;
    const penY = chkY - 10;
    ctx.save();
    ctx.translate(penX, penY);
    ctx.rotate(-0.85);
    ctx.fillStyle = '#78350f';
    ctx.fillRect(0, -5, 140, 10);
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.moveTo(0, -6);
    ctx.lineTo(-24, 0);
    ctx.lineTo(0, 6);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.moveTo(-16, -2);
    ctx.lineTo(-24, 0);
    ctx.lineTo(-16, 2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    ctx.restore();
  }

  _renderVeniceCanals(ctx, width, height, t) {
    ctx.save();

    // 1. Romantic Venetian Sunset Sky
    const sky = ctx.createLinearGradient(0, 0, 0, height * 0.65);
    sky.addColorStop(0, '#1e1b4b');
    sky.addColorStop(0.3, '#701a75');
    sky.addColorStop(0.6, '#c026d3');
    sky.addColorStop(0.85, '#f97316');
    sky.addColorStop(1, '#fde047');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height * 0.65);

    // Warm Sunset Glow
    const sunGlow = ctx.createRadialGradient(width * 0.52, height * 0.38, 20, width * 0.52, height * 0.38, 260);
    sunGlow.addColorStop(0, 'rgba(254, 240, 138, 0.9)');
    sunGlow.addColorStop(0.5, 'rgba(249, 115, 22, 0.45)');
    sunGlow.addColorStop(1, 'rgba(249, 115, 22, 0)');
    ctx.fillStyle = sunGlow;
    ctx.beginPath();
    ctx.arc(width * 0.52, height * 0.38, 260, 0, Math.PI * 2);
    ctx.fill();

    // Distant Venice Campanile / Bell Towers
    ctx.fillStyle = 'rgba(74, 4, 78, 0.65)';
    ctx.fillRect(width * 0.48, height * 0.22, 28, height * 0.26);
    ctx.beginPath();
    ctx.moveTo(width * 0.48 - 4, height * 0.22);
    ctx.lineTo(width * 0.48 + 14, height * 0.15);
    ctx.lineTo(width * 0.48 + 32, height * 0.22);
    ctx.closePath();
    ctx.fill();

    // 2. Historic Palazzi Facades (Waterfront)
    // Left Palazzo Block
    const leftPalazzoGrad = ctx.createLinearGradient(0, 0, width * 0.38, 0);
    leftPalazzoGrad.addColorStop(0, '#7c2d12');
    leftPalazzoGrad.addColorStop(0.6, '#b45309');
    leftPalazzoGrad.addColorStop(1, '#d97706');
    ctx.fillStyle = leftPalazzoGrad;
    ctx.fillRect(0, height * 0.26, width * 0.36, height * 0.46);

    // Venetian Gothic Windows on Left Palazzo
    ctx.fillStyle = '#fef08a';
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    for (let row = 0; row < 2; row++) {
      const wy = height * (0.34 + row * 0.14);
      for (let col = 0; col < 4; col++) {
        const wx = 50 + col * (width * 0.075);
        ctx.beginPath();
        ctx.moveTo(wx, wy + 40);
        ctx.lineTo(wx, wy + 16);
        ctx.arc(wx + 16, wy + 16, 16, Math.PI, 0);
        ctx.lineTo(wx + 32, wy + 40);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
    }

    // Right Palazzo Block
    const rightPalazzoGrad = ctx.createLinearGradient(width * 0.64, 0, width, 0);
    rightPalazzoGrad.addColorStop(0, '#c2410c');
    rightPalazzoGrad.addColorStop(0.5, '#ea580c');
    rightPalazzoGrad.addColorStop(1, '#9a3412');
    ctx.fillStyle = rightPalazzoGrad;
    ctx.fillRect(width * 0.64, height * 0.22, width * 0.36, height * 0.50);

    // Right Palazzo Balcony with Flower Boxes
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(width * 0.72, height * 0.36, 160, 20);
    ctx.fillStyle = '#ef4444';
    for (let fx = width * 0.73; fx < width * 0.72 + 150; fx += 14) {
      ctx.beginPath();
      ctx.arc(fx, height * 0.35, 6, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Romantic Canal Water
    const canalGrad = ctx.createLinearGradient(0, height * 0.58, 0, height);
    canalGrad.addColorStop(0, '#0284c7');
    canalGrad.addColorStop(0.35, '#0369a1');
    canalGrad.addColorStop(0.7, '#075985');
    canalGrad.addColorStop(1, '#0c4a6e');
    ctx.fillStyle = canalGrad;
    ctx.fillRect(0, height * 0.58, width, height * 0.42);

    // Warm Water Sunset Reflections
    const waterRefl = ctx.createLinearGradient(width * 0.35, height * 0.58, width * 0.65, height * 0.58);
    waterRefl.addColorStop(0, 'rgba(251, 146, 60, 0)');
    waterRefl.addColorStop(0.5, 'rgba(253, 230, 138, 0.45)');
    waterRefl.addColorStop(1, 'rgba(251, 146, 60, 0)');
    ctx.fillStyle = waterRefl;
    ctx.fillRect(width * 0.35, height * 0.58, width * 0.30, height * 0.42);

    // Animated Canal Ripples
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
    ctx.lineWidth = 1.5;
    for (let ry = height * 0.62; ry < height; ry += 22) {
      const offset = Math.sin(t * 1.8 + ry * 0.05) * 18;
      ctx.beginPath();
      ctx.moveTo(width * 0.25 + offset, ry);
      ctx.lineTo(width * 0.75 + offset, ry);
      ctx.stroke();
    }

    // 4. Iconic Rialto-Style Footbridge Across the Canal
    const bridgeX = width * 0.52;
    const bridgeY = height * 0.46;
    ctx.save();
    ctx.fillStyle = '#f1f5f9';
    ctx.beginPath();
    ctx.moveTo(width * 0.30, height * 0.62);
    ctx.quadraticCurveTo(bridgeX, bridgeY - 32, width * 0.74, height * 0.62);
    ctx.lineTo(width * 0.74, height * 0.65);
    ctx.quadraticCurveTo(bridgeX, bridgeY + 8, width * 0.30, height * 0.65);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Balustrade Pillars
    ctx.fillStyle = '#cbd5e1';
    for (let bx = width * 0.34; bx < width * 0.70; bx += 18) {
      const by = bridgeY - 14 - Math.cos(((bx - bridgeX) / (width * 0.20)) * (Math.PI * 0.45)) * 14;
      ctx.fillRect(bx, by, 6, 16);
    }
    ctx.restore();

    // 5. Wooden Mooring Poles ("Briccole")
    const drawMooringPole = (px, py, ph, stripeCol) => {
      ctx.save();
      ctx.fillStyle = '#78350f';
      ctx.fillRect(px, py, 18, ph);
      ctx.fillStyle = stripeCol;
      for (let s = 10; s < ph - 25; s += 28) {
        ctx.beginPath();
        ctx.moveTo(px, py + s);
        ctx.lineTo(px + 18, py + s + 12);
        ctx.lineTo(px + 18, py + s + 22);
        ctx.lineTo(px, py + s + 10);
        ctx.closePath();
        ctx.fill();
      }
      ctx.fillStyle = '#d97706';
      ctx.beginPath();
      ctx.arc(px + 9, py - 4, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };
    drawMooringPole(width * 0.22, height * 0.52, 260, '#38bdf8');
    drawMooringPole(width * 0.25, height * 0.55, 240, '#ef4444');
    drawMooringPole(width * 0.78, height * 0.54, 250, '#3b82f6');
    drawMooringPole(width * 0.81, height * 0.51, 270, '#ef4444');

    // 6. Venetian Gondolas Moored in the Water
    const drawGondola = (gx, gy, scale, flip) => {
      ctx.save();
      ctx.translate(gx, gy);
      if (flip) ctx.scale(-scale, scale);
      else ctx.scale(scale, scale);

      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.moveTo(-110, 0);
      ctx.quadraticCurveTo(-70, 24, 0, 24);
      ctx.quadraticCurveTo(70, 24, 120, -10);
      ctx.quadraticCurveTo(125, -28, 120, -32);
      ctx.quadraticCurveTo(60, 10, 0, 10);
      ctx.quadraticCurveTo(-60, 10, -110, 0);
      ctx.closePath();
      ctx.fill();

      // Metal Ferro Prow
      ctx.fillStyle = '#e2e8f0';
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(120, -32);
      ctx.lineTo(128, -52);
      ctx.lineTo(132, -50);
      ctx.lineTo(122, -26);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Red Velvet Cushions
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(-25, 4, 50, 8);

      ctx.restore();
    };
    drawGondola(width * 0.28, height * 0.76, 1.1, false);
    drawGondola(width * 0.74, height * 0.78, 1.0, true);

    ctx.restore();
  }

  _renderSkatepark(ctx, width, height, t) {
    ctx.save();

    // 1. Urban Dusk / Late Evening Sunset Sky
    const sky = ctx.createLinearGradient(0, 0, 0, height * 0.65);
    sky.addColorStop(0, '#0f172a');
    sky.addColorStop(0.3, '#311042');
    sky.addColorStop(0.65, '#701a75');
    sky.addColorStop(0.85, '#c2410c');
    sky.addColorStop(1, '#ea580c');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height * 0.65);

    // Evening Sun Rim Glow on Horizon
    const horizonGlow = ctx.createRadialGradient(width * 0.5, height * 0.52, 30, width * 0.5, height * 0.52, 350);
    horizonGlow.addColorStop(0, 'rgba(253, 186, 116, 0.7)');
    horizonGlow.addColorStop(0.5, 'rgba(234, 88, 12, 0.35)');
    horizonGlow.addColorStop(1, 'rgba(234, 88, 12, 0)');
    ctx.fillStyle = horizonGlow;
    ctx.beginPath();
    ctx.arc(width * 0.5, height * 0.52, 350, 0, Math.PI * 2);
    ctx.fill();

    // 2. City Skyline Silhouettes in the Background
    ctx.fillStyle = '#180d28';
    const buildings = [
      [40, 180, 70, 240], [120, 140, 85, 280], [220, 210, 60, 210], [290, 120, 95, 300],
      [400, 160, 75, 260], [520, 190, 80, 230], [610, 130, 90, 290], [710, 170, 65, 250],
      [820, 110, 105, 310], [940, 150, 80, 270], [1030, 190, 70, 230], [1110, 130, 90, 290],
      [1220, 160, 85, 260], [1320, 120, 95, 300], [1430, 180, 75, 240], [1520, 140, 85, 280],
      [1620, 190, 65, 230], [1700, 110, 100, 310], [1820, 150, 85, 270], [1920, 170, 70, 250],
      [2000, 130, 90, 290], [2100, 180, 80, 240], [2200, 140, 95, 280], [2310, 160, 80, 260]
    ];
    buildings.forEach(([bx, byOffset, bw, bh]) => {
      ctx.fillRect(bx, height * 0.48 - byOffset * 0.45, bw, bh);
      // Small yellow skyscraper windows
      ctx.fillStyle = 'rgba(254, 240, 138, 0.45)';
      for (let wy = height * 0.48 - byOffset * 0.40; wy < height * 0.45; wy += 18) {
        for (let wx = bx + 8; wx < bx + bw - 10; wx += 14) {
          if (Math.sin(wx * wy) > 0.1) {
            ctx.fillRect(wx, wy, 5, 8);
          }
        }
      }
      ctx.fillStyle = '#180d28';
    });

    // 3. Tall Floodlight Towers (Flutlichtmasten)
    const drawFloodlightTower = (fx, fy, h) => {
      ctx.save();
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(fx - 12, fy + h);
      ctx.lineTo(fx - 4, fy);
      ctx.lineTo(fx + 4, fy);
      ctx.lineTo(fx + 12, fy + h);
      ctx.stroke();

      ctx.lineWidth = 1.5;
      for (let sy = fy + 20; sy < fy + h; sy += 35) {
        ctx.beginPath();
        ctx.moveTo(fx - 8, sy);
        ctx.lineTo(fx + 8, sy);
        ctx.stroke();
      }

      ctx.fillStyle = '#1e293b';
      ctx.fillRect(fx - 28, fy - 14, 56, 14);
      ctx.fillStyle = '#fef08a';
      for (let bx = fx - 22; bx <= fx + 18; bx += 14) {
        ctx.beginPath();
        ctx.arc(bx, fy - 7, 5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };
    drawFloodlightTower(250, height * 0.08, height * 0.42);
    drawFloodlightTower(950, height * 0.06, height * 0.44);
    drawFloodlightTower(1650, height * 0.07, height * 0.43);
    drawFloodlightTower(2150, height * 0.08, height * 0.42);

    // 4. Concrete Skatepark Ground & Giant Concrete Halfpipes
    const groundGrad = ctx.createLinearGradient(0, height * 0.48, 0, height);
    groundGrad.addColorStop(0, '#64748b');
    groundGrad.addColorStop(0.3, '#475569');
    groundGrad.addColorStop(0.7, '#334155');
    groundGrad.addColorStop(1, '#1e293b');
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, height * 0.48, width, height * 0.52);

    // Giant Center Halfpipe Bowl
    ctx.save();
    const hpX = width * 0.46;
    const hpY = height * 0.48;
    const hpW = width * 0.42;
    const hpH = height * 0.45;

    ctx.fillStyle = '#94a3b8';
    ctx.beginPath();
    ctx.moveTo(hpX - hpW * 0.5, hpY);
    ctx.bezierCurveTo(hpX - hpW * 0.4, hpY + hpH, hpX - hpW * 0.2, hpY + hpH, hpX, hpY + hpH);
    ctx.bezierCurveTo(hpX + hpW * 0.2, hpY + hpH, hpX + hpW * 0.4, hpY + hpH, hpX + hpW * 0.5, hpY);
    ctx.lineTo(hpX + hpW * 0.5 + 40, hpY);
    ctx.lineTo(hpX + hpW * 0.5 + 40, hpY + hpH + 40);
    ctx.lineTo(hpX - hpW * 0.5 - 40, hpY + hpH + 40);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(hpX - hpW * 0.5, hpY);
    ctx.bezierCurveTo(hpX - hpW * 0.4, hpY + hpH, hpX - hpW * 0.2, hpY + hpH, hpX, hpY + hpH);
    ctx.bezierCurveTo(hpX + hpW * 0.2, hpY + hpH, hpX + hpW * 0.4, hpY + hpH, hpX + hpW * 0.5, hpY);
    ctx.stroke();

    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(hpX - hpW * 0.5 - 30, hpY);
    ctx.lineTo(hpX - hpW * 0.5 + 20, hpY);
    ctx.moveTo(hpX + hpW * 0.5 - 20, hpY);
    ctx.lineTo(hpX + hpW * 0.5 + 30, hpY);
    ctx.stroke();
    ctx.restore();

    // Left Quarterpipe Ramp
    ctx.fillStyle = '#64748b';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.48);
    ctx.lineTo(120, height * 0.48);
    ctx.quadraticCurveTo(240, height * 0.65, 340, height * 0.85);
    ctx.lineTo(0, height * 0.85);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.48);
    ctx.lineTo(120, height * 0.48);
    ctx.stroke();

    // 5. Graffiti Wall on Left (x: 420, y: height * 0.44)
    const wallX = 320;
    const wallY = height * 0.36;
    const wallW = 280;
    const wallH = 150;
    ctx.fillStyle = '#78350f';
    ctx.fillRect(wallX, wallY, wallW, wallH);
    ctx.strokeStyle = '#451a03';
    ctx.lineWidth = 1.5;
    for (let by = wallY; by < wallY + wallH; by += 16) {
      ctx.beginPath(); ctx.moveTo(wallX, by); ctx.lineTo(wallX + wallW, by); ctx.stroke();
    }

    ctx.save();
    ctx.font = '900 36px "Outfit", "Arial Black", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#0f172a';
    ctx.fillText('SK8 HUHN', wallX + wallW * 0.5 + 5, wallY + 65);
    ctx.fillStyle = '#ec4899';
    ctx.fillText('SK8 HUHN', wallX + wallW * 0.5, wallY + 60);
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 3;
    ctx.strokeText('SK8 HUHN', wallX + wallW * 0.5, wallY + 60);
    ctx.fillStyle = '#06b6d4';
    for (let d = 0; d < 6; d++) {
      ctx.fillRect(wallX + 50 + d * 35, wallY + 80, 4, 18 + (d % 3) * 8);
    }
    ctx.restore();

    // 6. Grind Rails & Stairs (Right Side, x: 1820, y: height * 0.72)
    const railX = 1720;
    const railY = height * 0.70;
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(railX, railY - 30);
    ctx.lineTo(railX + 220, railY + 30);
    ctx.stroke();
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 4;
    [railX + 20, railX + 110, railX + 200].forEach(lx => {
      const ly = railY - 30 + ((lx - railX) / 220) * 60;
      ctx.beginPath();
      ctx.moveTo(lx, ly);
      ctx.lineTo(lx, height * 0.88);
      ctx.stroke();
    });

    // Parked Skateboard with Red Wheels
    ctx.save();
    ctx.translate(railX + 90, height * 0.86);
    ctx.rotate(-0.08);
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.roundRect(-42, -5, 84, 10, 4);
    ctx.fill();
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-28, -5, 56, 10);
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(-28, 9, 6, 0, Math.PI * 2);
    ctx.arc(28, 9, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.restore();
  }

  _renderAuroraBorealis(ctx, width, height, t) {
    ctx.save();

    // 1. Polar Night Sky with Rich Blue/Purple Hues
    const sky = ctx.createLinearGradient(0, 0, 0, height * 0.7);
    sky.addColorStop(0, '#030712');
    sky.addColorStop(0.35, '#0c1a30');
    sky.addColorStop(0.7, '#1e1b4b');
    sky.addColorStop(1, '#0f172a');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height * 0.7);

    // Sparkling Polar Night Stars
    ctx.fillStyle = '#ffffff';
    for (let s = 0; s < 120; s++) {
      const sx = ((s * 197.3) % width);
      const sy = ((s * 113.7) % (height * 0.5));
      const sSize = (s % 3 === 0) ? 2 : 1;
      const sAlpha = 0.4 + Math.sin(t * 2 + s) * 0.4;
      ctx.globalAlpha = Math.max(0.1, sAlpha);
      ctx.fillRect(sx, sy, sSize, sSize);
    }
    ctx.globalAlpha = 1.0;

    // 2. Waving Aurora Borealis Ribbon Curtains (Green & Violet)
    ctx.save();
    for (let layer = 0; layer < 3; layer++) {
      const auroraGrad = ctx.createLinearGradient(0, height * 0.05, 0, height * 0.45);
      if (layer === 0) {
        auroraGrad.addColorStop(0, 'rgba(16, 185, 129, 0)');
        auroraGrad.addColorStop(0.4, 'rgba(52, 211, 153, 0.45)');
        auroraGrad.addColorStop(0.7, 'rgba(110, 231, 183, 0.65)');
        auroraGrad.addColorStop(1, 'rgba(16, 185, 129, 0)');
      } else if (layer === 1) {
        auroraGrad.addColorStop(0, 'rgba(168, 85, 247, 0)');
        auroraGrad.addColorStop(0.35, 'rgba(192, 132, 252, 0.40)');
        auroraGrad.addColorStop(0.65, 'rgba(232, 121, 249, 0.50)');
        auroraGrad.addColorStop(1, 'rgba(168, 85, 247, 0)');
      } else {
        auroraGrad.addColorStop(0, 'rgba(6, 182, 212, 0)');
        auroraGrad.addColorStop(0.5, 'rgba(103, 232, 249, 0.35)');
        auroraGrad.addColorStop(1, 'rgba(6, 182, 212, 0)');
      }

      ctx.fillStyle = auroraGrad;
      ctx.beginPath();
      ctx.moveTo(0, height * 0.08);

      const step = 40;
      const waveFreq = 0.0035 + layer * 0.001;
      const waveSpeed = t * (0.8 + layer * 0.4);
      for (let x = 0; x <= width; x += step) {
        const yTop = height * (0.10 + layer * 0.06) + Math.sin(x * waveFreq + waveSpeed) * 45 + Math.cos(x * waveFreq * 1.8 - waveSpeed * 0.6) * 25;
        ctx.lineTo(x, yTop);
      }
      for (let x = width; x >= 0; x -= step) {
        const yBottom = height * (0.35 + layer * 0.07) + Math.sin(x * waveFreq + waveSpeed + 0.6) * 55 + Math.cos(x * waveFreq * 1.5 - waveSpeed * 0.5) * 30;
        ctx.lineTo(x, yBottom);
      }
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    // 3. Snowy Scandinavian Jagged Mountains
    const mtnGrad = ctx.createLinearGradient(0, height * 0.3, 0, height * 0.65);
    mtnGrad.addColorStop(0, '#1e293b');
    mtnGrad.addColorStop(0.5, '#334155');
    mtnGrad.addColorStop(1, '#475569');
    ctx.fillStyle = mtnGrad;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.62);
    const mtnPeaks = [
      [0, height * 0.55], [200, height * 0.38], [420, height * 0.58], [650, height * 0.32],
      [880, height * 0.54], [1150, height * 0.28], [1400, height * 0.52], [1680, height * 0.35],
      [1950, height * 0.56], [2200, height * 0.36], [width, height * 0.52], [width, height * 0.65], [0, height * 0.65]
    ];
    mtnPeaks.forEach(([px, py]) => ctx.lineTo(px, py));
    ctx.closePath();
    ctx.fill();

    // Snow Caps on Mountain Peaks
    ctx.fillStyle = '#e2e8f0';
    [[200, height * 0.38, 55], [650, height * 0.32, 65], [1150, height * 0.28, 80], [1680, height * 0.35, 60], [2200, height * 0.36, 55]].forEach(([mx, my, mw]) => {
      ctx.beginPath();
      ctx.moveTo(mx, my);
      ctx.lineTo(mx - mw, my + mw * 0.85);
      ctx.lineTo(mx - mw * 0.4, my + mw * 0.70);
      ctx.lineTo(mx, my + mw * 0.80);
      ctx.lineTo(mx + mw * 0.4, my + mw * 0.68);
      ctx.lineTo(mx + mw, my + mw * 0.85);
      ctx.closePath();
      ctx.fill();
    });

    // 4. Frozen Arctic Lake with Aurora Reflections
    const lakeGrad = ctx.createLinearGradient(0, height * 0.58, 0, height * 0.75);
    lakeGrad.addColorStop(0, '#0284c7');
    lakeGrad.addColorStop(0.4, '#0f766e');
    lakeGrad.addColorStop(0.8, '#1e1b4b');
    lakeGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = lakeGrad;
    ctx.fillRect(width * 0.25, height * 0.58, width * 0.50, height * 0.16);

    ctx.fillStyle = 'rgba(52, 211, 153, 0.28)';
    ctx.fillRect(width * 0.32, height * 0.60, width * 0.36, height * 0.12);

    // 5. Scandinavian Snowscape Ground & Rolling Snowdrifts
    const snowGrad = ctx.createLinearGradient(0, height * 0.55, 0, height);
    snowGrad.addColorStop(0, '#cbd5e1');
    snowGrad.addColorStop(0.3, '#e2e8f0');
    snowGrad.addColorStop(0.7, '#f8fafc');
    snowGrad.addColorStop(1, '#ffffff');
    ctx.fillStyle = snowGrad;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.64);
    ctx.quadraticCurveTo(width * 0.25, height * 0.58, width * 0.5, height * 0.64);
    ctx.quadraticCurveTo(width * 0.75, height * 0.58, width, height * 0.64);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Snowdrift Shadow Contours
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.45)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.74);
    ctx.bezierCurveTo(width * 0.3, height * 0.70, width * 0.6, height * 0.78, width, height * 0.72);
    ctx.moveTo(0, height * 0.86);
    ctx.bezierCurveTo(width * 0.4, height * 0.84, width * 0.7, height * 0.90, width, height * 0.84);
    ctx.stroke();

    // 6. Snow-Covered Scandinavian Pine Trees (Fichten)
    const drawSnowPine = (px, py, scale) => {
      ctx.save();
      ctx.translate(px, py);
      ctx.scale(scale, scale);

      ctx.fillStyle = '#451a03';
      ctx.fillRect(-8, -25, 16, 35);

      const tiers = [
        { y: -30, w: 45, h: 40 },
        { y: -65, w: 35, h: 36 },
        { y: -98, w: 24, h: 32 }
      ];
      tiers.forEach(tr => {
        ctx.fillStyle = '#064e3b';
        ctx.beginPath();
        ctx.moveTo(0, tr.y - tr.h);
        ctx.lineTo(-tr.w, tr.y);
        ctx.lineTo(tr.w, tr.y);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#f8fafc';
        ctx.beginPath();
        ctx.moveTo(0, tr.y - tr.h);
        ctx.lineTo(-tr.w * 0.85, tr.y - tr.h * 0.2);
        ctx.lineTo(-tr.w, tr.y);
        ctx.quadraticCurveTo(-tr.w * 0.5, tr.y + 6, 0, tr.y + 4);
        ctx.quadraticCurveTo(tr.w * 0.5, tr.y + 6, tr.w, tr.y);
        ctx.lineTo(tr.w * 0.85, tr.y - tr.h * 0.2);
        ctx.closePath();
        ctx.fill();
      });
      ctx.restore();
    };
    drawSnowPine(180, height * 0.68, 1.2);
    drawSnowPine(280, height * 0.72, 1.0);
    drawSnowPine(820, height * 0.65, 0.9);
    drawSnowPine(1780, height * 0.68, 1.15);
    drawSnowPine(1920, height * 0.71, 1.3);
    drawSnowPine(2040, height * 0.67, 1.0);

    // 7. Interactive Easter Egg Elements:
    // A. Warm Illuminated Snow Igloo (x: 480, y: height * 0.75)
    const igX = 480;
    const igY = height * 0.75;
    ctx.save();
    const igGlow = ctx.createRadialGradient(igX, igY - 10, 10, igX, igY - 10, 120);
    igGlow.addColorStop(0, 'rgba(251, 191, 36, 0.65)');
    igGlow.addColorStop(0.5, 'rgba(245, 158, 11, 0.25)');
    igGlow.addColorStop(1, 'rgba(245, 158, 11, 0)');
    ctx.fillStyle = igGlow;
    ctx.beginPath();
    ctx.arc(igX, igY - 10, 120, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#f1f5f9';
    ctx.beginPath();
    ctx.arc(igX, igY, 65, Math.PI, 0);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.strokeStyle = 'rgba(148, 163, 184, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(igX, igY, 44, Math.PI, 0);
    ctx.arc(igX, igY, 24, Math.PI, 0);
    ctx.stroke();

    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.roundRect(igX - 22, igY - 28, 44, 28, [12, 12, 0, 0]);
    ctx.fill();
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(igX, igY - 14, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    const smokeY = igY - 75 - ((t * 20) % 35);
    ctx.beginPath();
    ctx.arc(igX + 8, smokeY, 8, 0, Math.PI * 2);
    ctx.arc(igX + 16, smokeY - 12, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // B. Reindeer Silhouette with Antlers (x: 1880, y: height * 0.65)
    const rdX = 1880;
    const rdY = height * 0.65;
    ctx.save();
    ctx.translate(rdX, rdY);
    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.ellipse(0, 0, 36, 20, -0.05, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(28, -20, 14, 22, 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(40, -36, 12, 8, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(-22, 14); ctx.lineTo(-24, 45);
    ctx.moveTo(-10, 15); ctx.lineTo(-12, 45);
    ctx.moveTo(14, 14); ctx.lineTo(16, 45);
    ctx.moveTo(24, 14); ctx.lineTo(26, 45);
    ctx.stroke();
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(36, -42); ctx.lineTo(38, -60);
    ctx.lineTo(48, -68); ctx.moveTo(38, -55); ctx.lineTo(30, -64);
    ctx.moveTo(42, -42); ctx.lineTo(46, -62);
    ctx.lineTo(56, -67); ctx.moveTo(46, -55); ctx.lineTo(40, -65);
    ctx.stroke();
    ctx.restore();

    ctx.restore();
  }

  _renderMadScientistLab(ctx, width, height, t) {
    ctx.save();

    // 1. Dark Victorian / Gothic Cellar Stone Arch Background
    const wallGrad = ctx.createLinearGradient(0, 0, 0, height);
    wallGrad.addColorStop(0, '#090d16');
    wallGrad.addColorStop(0.4, '#111827');
    wallGrad.addColorStop(0.75, '#1e293b');
    wallGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = wallGrad;
    ctx.fillRect(0, 0, width, height);

    // Stone Arch Mortar Brickwork
    ctx.strokeStyle = 'rgba(51, 65, 85, 0.35)';
    ctx.lineWidth = 1.5;
    for (let by = 40; by < height * 0.70; by += 45) {
      ctx.beginPath();
      ctx.moveTo(0, by);
      ctx.lineTo(width, by);
      ctx.stroke();
      const xOffset = (Math.floor(by / 45) % 2) * 40;
      for (let bx = xOffset; bx < width; bx += 80) {
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.lineTo(bx, by + 45);
        ctx.stroke();
      }
    }

    // Heavy Gothic Stone Arches along the lab
    const archPositions = [300, 900, 1500, 2100];
    archPositions.forEach(ax => {
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(ax - 28, 0, 56, height * 0.72);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 3;
      ctx.strokeRect(ax - 28, 0, 56, height * 0.72);

      // Arch crown curve
      ctx.beginPath();
      ctx.arc(ax, 110, 120, Math.PI, 0);
      ctx.lineWidth = 8;
      ctx.strokeStyle = '#0f172a';
      ctx.stroke();
    });

    // 2. Industrial Steampunk Ceiling Pipes & Brass Conduits
    ctx.fillStyle = '#451a03';
    ctx.fillRect(0, 35, width, 18);
    ctx.fillStyle = '#78350f';
    ctx.fillRect(0, 40, width, 8);

    // Copper conduits & junction boxes
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(0, 80);
    ctx.lineTo(width, 80);
    ctx.moveTo(0, 110);
    ctx.lineTo(width * 0.65, 110);
    ctx.lineTo(width * 0.65, height * 0.4);
    ctx.stroke();

    // Pressure gauges with oscillating needle
    const gaugePositions = [450, 1150, 1750];
    gaugePositions.forEach((gx, gIdx) => {
      ctx.fillStyle = '#fef3c7';
      ctx.beginPath();
      ctx.arc(gx, 75, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#92400e';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Dial marks & twitching needle
      const needleAngle = Math.sin(t * 6 + gIdx * 2.3) * 0.85 - 0.2;
      ctx.strokeStyle = '#dc2626';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(gx, 75);
      ctx.lineTo(gx + Math.cos(needleAngle) * 14, 75 + Math.sin(needleAngle) * 14);
      ctx.stroke();
    });

    // 3. Chalkboard with Mad Formulas (x: 1400, y: height * 0.22)
    const cbX = 1400;
    const cbY = height * 0.22;
    ctx.fillStyle = '#064e3b';
    ctx.fillRect(cbX - 160, cbY - 70, 320, 140);
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 8;
    ctx.strokeRect(cbX - 160, cbY - 70, 320, 140);

    // Chalk Equations & Lightning Schematics
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.font = '14px monospace';
    ctx.fillText('E = mc² + √Ψ(t)', cbX - 140, cbY - 40);
    ctx.fillText('⚡ V = 1.21 GW', cbX - 140, cbY - 15);
    ctx.fillText('2H₂O₂ → 2H₂O + O₂ ↑', cbX - 140, cbY + 10);
    ctx.fillText('DO NOT TOUCH!', cbX - 140, cbY + 38);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cbX + 90, cbY, 25, 0, Math.PI * 2);
    ctx.moveTo(cbX + 90, cbY - 25); ctx.lineTo(cbX + 90, cbY + 25);
    ctx.moveTo(cbX + 65, cbY); ctx.lineTo(cbX + 115, cbY);
    ctx.stroke();

    // 4. Heavy Flagstone Lab Floor
    const floorGrad = ctx.createLinearGradient(0, height * 0.68, 0, height);
    floorGrad.addColorStop(0, '#1e293b');
    floorGrad.addColorStop(0.3, '#0f172a');
    floorGrad.addColorStop(1, '#020617');
    ctx.fillStyle = floorGrad;
    ctx.fillRect(0, height * 0.68, width, height * 0.32);

    // Flagstone tile lines
    ctx.strokeStyle = 'rgba(51, 65, 85, 0.5)';
    ctx.lineWidth = 2;
    for (let fy = height * 0.68; fy < height; fy += 35) {
      ctx.beginPath();
      ctx.moveTo(0, fy);
      ctx.lineTo(width, fy);
      ctx.stroke();
    }

    // 5. Huge Tesla Coil (Easter Egg 1: x: 650, y: height * 0.42)
    const tcX = 650;
    const tcY = height * 0.42;
    ctx.save();
    // Glowing Electrical Halo
    const tcGlow = ctx.createRadialGradient(tcX, tcY - 80, 20, tcX, tcY - 80, 180);
    const tcPulse = (Math.sin(t * 12) + 1) * 0.5;
    tcGlow.addColorStop(0, `rgba(56, 189, 248, ${0.45 + tcPulse * 0.35})`);
    tcGlow.addColorStop(0.5, `rgba(168, 85, 247, ${0.20 + tcPulse * 0.20})`);
    tcGlow.addColorStop(1, 'rgba(56, 189, 248, 0)');
    ctx.fillStyle = tcGlow;
    ctx.beginPath();
    ctx.arc(tcX, tcY - 80, 180, 0, Math.PI * 2);
    ctx.fill();

    // Heavy Metal Pedestal
    ctx.fillStyle = '#334155';
    ctx.fillRect(tcX - 55, tcY + 120, 110, 130);
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 3;
    ctx.strokeRect(tcX - 55, tcY + 120, 110, 130);
    // Danger Lightning Symbol on Pedestal
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.moveTo(tcX - 5, tcY + 145);
    ctx.lineTo(tcX + 12, tcY + 145);
    ctx.lineTo(tcX + 2, tcY + 175);
    ctx.lineTo(tcX + 15, tcY + 175);
    ctx.lineTo(tcX - 10, tcY + 215);
    ctx.lineTo(tcX - 2, tcY + 185);
    ctx.lineTo(tcX - 12, tcY + 185);
    ctx.closePath();
    ctx.fill();

    // Primary Coil Cylinder with Copper Windings
    ctx.fillStyle = '#7c2d12';
    ctx.fillRect(tcX - 32, tcY - 30, 64, 150);
    ctx.strokeStyle = '#ea580c';
    ctx.lineWidth = 3;
    for (let wy = tcY - 26; wy < tcY + 115; wy += 9) {
      ctx.beginPath();
      ctx.moveTo(tcX - 32, wy);
      ctx.lineTo(tcX + 32, wy);
      ctx.stroke();
    }

    // Top Toroid Doughnut (Spun Aluminum / Copper)
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.ellipse(tcX, tcY - 70, 75, 28, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 4;
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 18;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Animated Electric Arcs from Toroid
    if (Math.sin(t * 15) > -0.2) {
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 16;
      for (let arc = 0; arc < 4; arc++) {
        const arcAngle = (arc * Math.PI * 0.5) + Math.sin(t * 20 + arc) * 0.4;
        let ax = tcX + Math.cos(arcAngle) * 70;
        let ay = tcY - 70 + Math.sin(arcAngle) * 25;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        for (let seg = 0; seg < 4; seg++) {
          ax += Math.cos(arcAngle) * 28 + (Math.random() - 0.5) * 26;
          ay += Math.sin(arcAngle) * 28 + (Math.random() - 0.5) * 26;
          ctx.lineTo(ax, ay);
        }
        ctx.stroke();
      }
      ctx.shadowBlur = 0;
    }
    ctx.restore();

    // 6. Giant Specimen Tank / Chemical Vat (Easter Egg 2 area, x: 1250, y: height * 0.55)
    const vatX = 1250;
    const vatY = height * 0.55;
    ctx.save();
    // Green Radiance
    const vatGrad = ctx.createRadialGradient(vatX, vatY, 20, vatX, vatY, 170);
    vatGrad.addColorStop(0, 'rgba(34, 197, 94, 0.45)');
    vatGrad.addColorStop(0.6, 'rgba(16, 185, 129, 0.18)');
    vatGrad.addColorStop(1, 'rgba(34, 197, 94, 0)');
    ctx.fillStyle = vatGrad;
    ctx.beginPath();
    ctx.arc(vatX, vatY, 170, 0, Math.PI * 2);
    ctx.fill();

    // Heavy Brass/Iron Cage & Base
    ctx.fillStyle = '#334155';
    ctx.fillRect(vatX - 60, vatY + 80, 120, 50);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 3;
    ctx.strokeRect(vatX - 60, vatY + 80, 120, 50);

    // Domed Top
    ctx.fillStyle = '#475569';
    ctx.beginPath();
    ctx.arc(vatX, vatY - 80, 55, Math.PI, 0);
    ctx.fill();
    ctx.stroke();

    // Glass Tube Body
    ctx.fillStyle = 'rgba(34, 197, 94, 0.55)';
    ctx.fillRect(vatX - 50, vatY - 80, 100, 160);
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 3;
    ctx.strokeRect(vatX - 50, vatY - 80, 100, 160);

    // Mysterious Specimen Shadow inside the vat
    ctx.fillStyle = 'rgba(15, 23, 42, 0.65)';
    ctx.beginPath();
    ctx.ellipse(vatX, vatY - 5 + Math.sin(t * 3) * 6, 26, 48, 0, 0, Math.PI * 2);
    ctx.fill();
    // Specimen glowing eyes
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(vatX - 8, vatY - 25 + Math.sin(t * 3) * 6, 3, 0, Math.PI * 2);
    ctx.arc(vatX + 8, vatY - 25 + Math.sin(t * 3) * 6, 3, 0, Math.PI * 2);
    ctx.fill();

    // Rising Bubbles inside Glass Tube
    ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
    for (let b = 0; b < 6; b++) {
      const bY = vatY + 70 - ((t * 40 + b * 26) % 150);
      const bX = vatX - 35 + ((b * 18) % 70);
      ctx.beginPath();
      ctx.arc(bX, bY, 4 + (b % 3), 0, Math.PI * 2);
      ctx.fill();
    }
    // Glass Highlight Glare
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.fillRect(vatX - 44, vatY - 75, 12, 150);
    ctx.restore();

    // 7. Chemical Laboratory Workbench (Foreground / Midground)
    ctx.fillStyle = '#3b1c0b';
    ctx.fillRect(50, height * 0.70, width - 100, 30);
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 3;
    ctx.strokeRect(50, height * 0.70, width - 100, 30);
    // Table legs
    ctx.fillStyle = '#1c0a02';
    for (let lx = 120; lx < width - 100; lx += 450) {
      ctx.fillRect(lx, height * 0.73, 24, height * 0.27);
    }

    // Glassware Array on Workbench
    // A. Reagenzglas-Rack (Test Tubes rack)
    const ttRackX = 980;
    const ttRackY = height * 0.70;
    ctx.fillStyle = '#78350f';
    ctx.fillRect(ttRackX, ttRackY - 50, 90, 8);
    ctx.fillRect(ttRackX + 5, ttRackY - 50, 8, 50);
    ctx.fillRect(ttRackX + 77, ttRackY - 50, 8, 50);
    const tubeColors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#a855f7'];
    for (let ti = 0; ti < 5; ti++) {
      const tx = ttRackX + 16 + ti * 14;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fillRect(tx, ttRackY - 45, 8, 45);
      ctx.fillStyle = tubeColors[ti];
      ctx.fillRect(tx, ttRackY - 25, 8, 25);
    }

    // B. Boiling Erlenmeyer Flask with Bubbling Vapor (Easter Egg 2 center: x: 1250)
    const efX = 1140;
    const efY = height * 0.70;
    ctx.save();
    ctx.fillStyle = 'rgba(34, 197, 94, 0.7)';
    ctx.beginPath();
    ctx.moveTo(efX, efY - 60);
    ctx.lineTo(efX + 10, efY - 60);
    ctx.lineTo(efX + 28, efY);
    ctx.lineTo(efX - 28, efY);
    ctx.lineTo(efX - 10, efY - 60);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Spiral Condenser Coil Tube
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 4;
    ctx.beginPath();
    for (let cy = 0; cy < 45; cy += 8) {
      ctx.lineTo(efX + 50 + Math.sin(cy * 0.8 + t * 5) * 8, efY - 15 - cy);
    }
    ctx.stroke();
    ctx.restore();

    // 8. Frankenstein High-Voltage Knife Switchboard (Easter Egg 3: x: 1850, y: height * 0.55)
    const swX = 1850;
    const swY = height * 0.55;
    ctx.save();
    // Slate Panel
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(swX - 65, swY - 75, 130, 150);
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 4;
    ctx.strokeRect(swX - 65, swY - 75, 130, 150);

    // Vintage Analog Ammeter & Voltmeter
    ctx.fillStyle = '#fef3c7';
    ctx.beginPath();
    ctx.arc(swX - 30, swY - 45, 20, 0, Math.PI * 2);
    ctx.arc(swX + 30, swY - 45, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Dial Needles (Twitching)
    ctx.strokeStyle = '#dc2626';
    ctx.beginPath();
    const swAngle1 = Math.sin(t * 8) * 0.7;
    const swAngle2 = Math.cos(t * 7) * 0.7;
    ctx.moveTo(swX - 30, swY - 45);
    ctx.lineTo(swX - 30 + Math.cos(swAngle1) * 15, swY - 45 + Math.sin(swAngle1) * 15);
    ctx.moveTo(swX + 30, swY - 45);
    ctx.lineTo(swX + 30 + Math.cos(swAngle2) * 15, swY - 45 + Math.sin(swAngle2) * 15);
    ctx.stroke();

    // Heavy Dual-Pole Knife Switch Lever
    ctx.fillStyle = '#b45309';
    ctx.fillRect(swX - 35, swY + 10, 14, 45);
    ctx.fillRect(swX + 21, swY + 10, 14, 45);
    // Insulated Handle connecting poles
    ctx.fillStyle = '#1e1b4b';
    ctx.fillRect(swX - 42, swY + 45, 84, 14);

    // Switch Spark Glow
    if (Math.sin(t * 10) > 0.4) {
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(swX - 28, swY + 12, 6, 0, Math.PI * 2);
      ctx.arc(swX + 28, swY + 12, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Heavy Black Power Cables draping down
    ctx.strokeStyle = '#020617';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(swX - 40, swY + 65);
    ctx.quadraticCurveTo(swX - 80, swY + 120, swX - 140, height * 0.75);
    ctx.moveTo(swX + 40, swY + 65);
    ctx.quadraticCurveTo(swX + 80, swY + 120, swX + 160, height * 0.75);
    ctx.stroke();
    ctx.restore();

    ctx.restore();
  }

  _renderTajMahal(ctx, width, height, t) {
    ctx.save();

    // 1. Sunrise / Dawn Pastel Indian Sky
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.55);
    skyGrad.addColorStop(0, '#818cf8');
    skyGrad.addColorStop(0.3, '#c084fc');
    skyGrad.addColorStop(0.65, '#f472b6');
    skyGrad.addColorStop(0.85, '#fbcfe8');
    skyGrad.addColorStop(1, '#fef08a');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height * 0.55);

    // Glowing Morning Sun behind the Palace
    const sunX = 1200;
    const sunY = height * 0.20;
    const sunGrad = ctx.createRadialGradient(sunX, sunY, 15, sunX, sunY, 220);
    sunGrad.addColorStop(0, 'rgba(254, 240, 138, 0.95)');
    sunGrad.addColorStop(0.3, 'rgba(253, 186, 116, 0.55)');
    sunGrad.addColorStop(0.7, 'rgba(244, 114, 182, 0.25)');
    sunGrad.addColorStop(1, 'rgba(244, 114, 182, 0)');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 220, 0, Math.PI * 2);
    ctx.fill();

    // Gentle Morning Sun Rays
    ctx.save();
    ctx.globalAlpha = 0.15;
    ctx.fillStyle = '#fffbeb';
    for (let r = 0; r < 8; r++) {
      const rAngle = (r * Math.PI / 4) + t * 0.02;
      ctx.beginPath();
      ctx.moveTo(sunX, sunY);
      ctx.lineTo(sunX + Math.cos(rAngle - 0.12) * 500, sunY + Math.sin(rAngle - 0.12) * 500);
      ctx.lineTo(sunX + Math.cos(rAngle + 0.12) * 500, sunY + Math.sin(rAngle + 0.12) * 500);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    // 2. Distant Yamuna Riverbank Foliage & Misty Morning Horizon
    ctx.fillStyle = '#065f46';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.50);
    for (let hx = 0; hx <= width; hx += 80) {
      ctx.lineTo(hx, height * 0.49 + Math.sin(hx * 0.015) * 6);
    }
    ctx.lineTo(width, height * 0.54);
    ctx.lineTo(0, height * 0.54);
    ctx.closePath();
    ctx.fill();

    // 3. Red Sandstone Charbagh Garden Terrace & Lawns
    const gardenGrad = ctx.createLinearGradient(0, height * 0.50, 0, height);
    gardenGrad.addColorStop(0, '#047857');
    gardenGrad.addColorStop(0.3, '#059669');
    gardenGrad.addColorStop(0.7, '#10b981');
    gardenGrad.addColorStop(1, '#065f46');
    ctx.fillStyle = gardenGrad;
    ctx.fillRect(0, height * 0.50, width, height * 0.50);

    // Sandstone Walkways along the Garden
    ctx.fillStyle = '#b91c1c';
    ctx.fillRect(0, height * 0.52, width, 14);
    ctx.strokeStyle = '#991b1b';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, height * 0.52, width, 14);

    // 4. The Grand White Marble Taj Mahal (Centered at x: 1200)
    const tmX = 1200;
    const plinthY = height * 0.50;

    // A. Sandstone and Marble Plinth Base
    ctx.fillStyle = '#991b1b';
    ctx.fillRect(tmX - 350, plinthY - 24, 700, 24);
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(tmX - 340, plinthY - 32, 680, 10);
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(tmX - 340, plinthY - 32, 680, 10);

    // B. Four Soaring Corner Minarets (Minars)
    const minarOffsets = [-320, -210, 210, 320];
    minarOffsets.forEach(mxOffset => {
      const mx = tmX + mxOffset;
      const mBaseY = plinthY - 32;
      const mTopY = plinthY - 280;

      // Minaret Shaft (Tapering Octagonal Tower)
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.moveTo(mx - 14, mBaseY);
      ctx.lineTo(mx - 9, mTopY);
      ctx.lineTo(mx + 9, mTopY);
      ctx.lineTo(mx + 14, mBaseY);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 3 Corbelled Balconies
      const balcYs = [mBaseY - 80, mBaseY - 160, mBaseY - 240];
      balcYs.forEach(by => {
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(mx - 16, by, 32, 6);
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        ctx.strokeRect(mx - 16, by, 32, 6);
      });

      // Crowning Chattri Pavilion Dome
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(mx, mTopY - 12, 10, Math.PI, 0);
      ctx.fill();
      ctx.stroke();
      // Finial needle
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(mx, mTopY - 22);
      ctx.lineTo(mx, mTopY - 35);
      ctx.stroke();
    });

    // C. Main Mausoleum Cube Building
    const bW = 340;
    const bH = 160;
    const bX = tmX - bW / 2;
    const bY = plinthY - 32 - bH;

    // Marble Facade
    const marbleGrad = ctx.createLinearGradient(bX, bY, bX + bW, bY + bH);
    marbleGrad.addColorStop(0, '#f8fafc');
    marbleGrad.addColorStop(0.5, '#ffffff');
    marbleGrad.addColorStop(1, '#f1f5f9');
    ctx.fillStyle = marbleGrad;
    ctx.fillRect(bX, bY, bW, bH);
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.strokeRect(bX, bY, bW, bH);

    // D. Grand Central Vaulted Portal (Pishtaq / Iwan)
    const pW = 120;
    const pH = 140;
    const pX = tmX - pW / 2;
    const pY = bY + 20;

    // Calligraphy Border Frame
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 4;
    ctx.strokeRect(pX - 6, pY - 6, pW + 12, pH + 6);

    // Pointed Arch Recess
    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.moveTo(pX, pY + pH);
    ctx.lineTo(pX, pY + 45);
    ctx.quadraticCurveTo(pX + 15, pY, tmX, pY - 8);
    ctx.quadraticCurveTo(pX + pW - 15, pY, pX + pW, pY + 45);
    ctx.lineTo(pX + pW, pY + pH);
    ctx.closePath();
    ctx.fill();

    // Inner Door Arch
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.roundRect(tmX - 22, pY + 70, 44, 70, [22, 22, 0, 0]);
    ctx.fill();

    // E. Symmetrical Side Arched Niches (Two Left, Two Right)
    const sideArchX = [tmX - 115, tmX + 85];
    sideArchX.forEach(ax => {
      // Lower niche
      ctx.fillStyle = '#475569';
      ctx.beginPath();
      ctx.roundRect(ax, bY + 95, 30, 50, [15, 15, 0, 0]);
      ctx.fill();
      // Upper niche
      ctx.beginPath();
      ctx.roundRect(ax, bY + 30, 30, 50, [15, 15, 0, 0]);
      ctx.fill();
    });

    // F. Four Side Chattris (Domed Kiosks flanking main dome)
    [-75, 75].forEach(cxOffset => {
      const cx = tmX + cxOffset;
      const cy = bY - 25;
      // Chattri pillars
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(cx - 15, bY); ctx.lineTo(cx - 15, cy);
      ctx.moveTo(cx + 15, bY); ctx.lineTo(cx + 15, cy);
      ctx.stroke();
      // Chattri dome
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.arc(cx, cy, 18, Math.PI, 0);
      ctx.fill();
      ctx.stroke();
      // Finial
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx, cy - 18); ctx.lineTo(cx, cy - 28);
      ctx.stroke();
    });

    // G. The Iconic Central White Marble Onion Dome (Easter Egg 1: x: 1200, y: height * 0.32)
    const domeY = height * 0.32;
    ctx.save();
    // High-Dome Cylindrical Drum Base
    ctx.fillStyle = '#f1f5f9';
    ctx.fillRect(tmX - 58, domeY + 15, 116, 45);
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.strokeRect(tmX - 58, domeY + 15, 116, 45);

    // Decorative Lotus Inlay Band around Drum
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    for (let lx = tmX - 52; lx < tmX + 52; lx += 12) {
      ctx.beginPath();
      ctx.arc(lx + 6, domeY + 45, 6, Math.PI, 0);
      ctx.stroke();
    }

    // Majestic Bulbous Onion Dome (Amrud)
    const domeGrad = ctx.createLinearGradient(tmX - 80, domeY - 95, tmX + 80, domeY + 20);
    domeGrad.addColorStop(0, '#ffffff');
    domeGrad.addColorStop(0.3, '#f8fafc');
    domeGrad.addColorStop(0.7, '#e2e8f0');
    domeGrad.addColorStop(1, '#cbd5e1');
    ctx.fillStyle = domeGrad;

    ctx.beginPath();
    ctx.moveTo(tmX - 58, domeY + 20);
    // Left bulb curve swelling outwards
    ctx.bezierCurveTo(tmX - 92, domeY - 20, tmX - 82, domeY - 75, tmX, domeY - 98);
    // Right bulb curve
    ctx.bezierCurveTo(tmX + 82, domeY - 75, tmX + 92, domeY - 20, tmX + 58, domeY + 20);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Subtle Marble Ridge Shading
    ctx.strokeStyle = 'rgba(203, 213, 225, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(tmX, domeY - 98);
    ctx.quadraticCurveTo(tmX - 35, domeY - 40, tmX - 25, domeY + 20);
    ctx.moveTo(tmX, domeY - 98);
    ctx.quadraticCurveTo(tmX + 35, domeY - 40, tmX + 25, domeY + 20);
    ctx.stroke();

    // Golden Lotus Finial (Kalash)
    ctx.fillStyle = '#facc15';
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(tmX, domeY - 100, 7, 0, Math.PI);
    ctx.fill(); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(tmX, domeY - 100);
    ctx.lineTo(tmX, domeY - 145);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(tmX, domeY - 114, 5, 0, Math.PI * 2);
    ctx.arc(tmX, domeY - 128, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 5. The Central Reflecting Pool (Charbagh Water Canal, Easter Egg 2: x: 1200, y: height * 0.78)
    const poolTopY = height * 0.54;
    const poolBottomY = height * 0.98;
    const poolTopHalfW = 140;
    const poolBottomHalfW = 280;

    // Marble Canal Edges
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.moveTo(tmX - poolTopHalfW - 14, poolTopY);
    ctx.lineTo(tmX - poolBottomHalfW - 20, poolBottomY);
    ctx.lineTo(tmX - poolBottomHalfW, poolBottomY);
    ctx.lineTo(tmX - poolTopHalfW, poolTopY);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(tmX + poolTopHalfW + 14, poolTopY);
    ctx.lineTo(tmX + poolBottomHalfW + 20, poolBottomY);
    ctx.lineTo(tmX + poolBottomHalfW, poolBottomY);
    ctx.lineTo(tmX + poolTopHalfW, poolTopY);
    ctx.closePath();
    ctx.fill();

    // Deep Reflective Pool Water
    const poolGrad = ctx.createLinearGradient(0, poolTopY, 0, poolBottomY);
    poolGrad.addColorStop(0, '#0284c7');
    poolGrad.addColorStop(0.35, '#0369a1');
    poolGrad.addColorStop(0.7, '#075985');
    poolGrad.addColorStop(1, '#0c4a6e');
    ctx.fillStyle = poolGrad;

    ctx.beginPath();
    ctx.moveTo(tmX - poolTopHalfW, poolTopY);
    ctx.lineTo(tmX + poolTopHalfW, poolTopY);
    ctx.lineTo(tmX + poolBottomHalfW, poolBottomY);
    ctx.lineTo(tmX - poolBottomHalfW, poolBottomY);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Symmetrical Inverted Palace Reflection in Water with Wavelets
    ctx.save();
    ctx.globalAlpha = 0.38 + Math.sin(t * 3) * 0.08;
    const reflY = poolTopY + (height * 0.78 - poolTopY) * 0.65;
    const reflGrad = ctx.createRadialGradient(tmX, reflY, 10, tmX, reflY, 90);
    reflGrad.addColorStop(0, '#ffffff');
    reflGrad.addColorStop(0.6, '#e0f2fe');
    reflGrad.addColorStop(1, 'rgba(14, 165, 233, 0)');
    ctx.fillStyle = reflGrad;
    ctx.beginPath();
    ctx.ellipse(tmX, reflY, 65, 80, 0, 0, Math.PI * 2);
    ctx.fill();

    // Animated water ripple wavelets across canal
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 1.5;
    for (let ry = poolTopY + 25; ry < poolBottomY - 15; ry += 24) {
      const rw = poolTopHalfW + ((ry - poolTopY) / (poolBottomY - poolTopY)) * (poolBottomHalfW - poolTopHalfW);
      const waveOffset = Math.sin(t * 4 + ry * 0.05) * 8;
      ctx.beginPath();
      ctx.moveTo(tmX - rw * 0.7 + waveOffset, ry);
      ctx.lineTo(tmX + rw * 0.7 + waveOffset, ry);
      ctx.stroke();
    }
    ctx.restore();

    // Blooming Water Lotuses floating on the Reflecting Pool
    const lotusLocations = [
      { x: tmX - 80, y: height * 0.72, size: 14 },
      { x: tmX + 75, y: height * 0.76, size: 16 },
      { x: tmX, y: height * 0.82, size: 18 },
      { x: tmX - 95, y: height * 0.88, size: 15 },
      { x: tmX + 110, y: height * 0.90, size: 17 }
    ];
    lotusLocations.forEach(lotus => {
      // Lily Pad
      ctx.fillStyle = '#15803d';
      ctx.beginPath();
      ctx.arc(lotus.x, lotus.y + 3, lotus.size * 1.1, 0.2, Math.PI * 1.85);
      ctx.fill();

      // Pink Lotus Petals
      const petalColors = ['#f43f5e', '#fb7185', '#fda4af', '#fecdd3'];
      petalColors.forEach((pCol, pIdx) => {
        ctx.fillStyle = pCol;
        ctx.beginPath();
        ctx.ellipse(lotus.x, lotus.y - (pIdx * 2), lotus.size * (0.8 - pIdx * 0.15), lotus.size * (0.5 - pIdx * 0.1), 0, 0, Math.PI * 2);
        ctx.fill();
      });
      // Golden Stamen Center
      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.arc(lotus.x, lotus.y - 4, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    // 6. Symmetrical Avenue of Cypress Trees (Zypressen-Allee)
    const drawCypress = (cx, cy, cHeight, cWidth) => {
      ctx.save();
      ctx.fillStyle = '#451a03';
      ctx.fillRect(cx - 3, cy - 10, 6, 15);
      const cGrad = ctx.createLinearGradient(cx - cWidth, cy, cx + cWidth, cy);
      cGrad.addColorStop(0, '#064e3b');
      cGrad.addColorStop(0.5, '#047857');
      cGrad.addColorStop(1, '#064e3b');
      ctx.fillStyle = cGrad;
      ctx.beginPath();
      ctx.moveTo(cx, cy - cHeight);
      ctx.bezierCurveTo(cx + cWidth, cy - cHeight * 0.6, cx + cWidth * 0.8, cy - 10, cx, cy - 10);
      ctx.bezierCurveTo(cx - cWidth * 0.8, cy - 10, cx - cWidth, cy - cHeight * 0.6, cx, cy - cHeight);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const cSteps = [
      { y: height * 0.58, h: 55, w: 12 },
      { y: height * 0.66, h: 80, w: 16 },
      { y: height * 0.75, h: 110, w: 22 },
      { y: height * 0.85, h: 145, w: 28 },
      { y: height * 0.95, h: 180, w: 34 }
    ];
    cSteps.forEach((st, idx) => {
      const leftX = tmX - (poolTopHalfW + 35 + idx * 28);
      const rightX = tmX + (poolTopHalfW + 35 + idx * 28);
      drawCypress(leftX, st.y, st.h, st.w);
      drawCypress(rightX, st.y, st.h, st.w);
    });

    // 7. Exotic Lotus Gardens & Flowering Trees (Easter Egg 3 on left: x: 480, y: height * 0.70)
    const egX = 480;
    const egY = height * 0.70;
    ctx.save();
    // Lush Tropical Flowering Tree
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.moveTo(egX - 10, egY + 70);
    ctx.quadraticCurveTo(egX, egY, egX, egY - 50);
    ctx.lineTo(egX + 10, egY - 50);
    ctx.quadraticCurveTo(egX + 10, egY, egX + 16, egY + 70);
    ctx.closePath();
    ctx.fill();

    // Rosy Blooming Foliage Canopy
    const bloomGrad = ctx.createRadialGradient(egX, egY - 70, 20, egX, egY - 70, 110);
    bloomGrad.addColorStop(0, '#f43f5e');
    bloomGrad.addColorStop(0.5, '#fb7185');
    bloomGrad.addColorStop(0.85, '#fda4af');
    bloomGrad.addColorStop(1, 'rgba(253, 164, 175, 0)');
    ctx.fillStyle = bloomGrad;
    ctx.beginPath();
    ctx.arc(egX, egY - 70, 110, 0, Math.PI * 2);
    ctx.fill();

    // Petal clusters
    for (let p = 0; p < 22; p++) {
      const px = egX - 80 + (p * 17) % 160;
      const py = egY - 130 + Math.sin(p * 2.1) * 55;
      ctx.fillStyle = p % 2 === 0 ? '#f472b6' : '#ffe4e6';
      ctx.beginPath();
      ctx.arc(px, py, 9, 0, Math.PI * 2);
      ctx.fill();
    }

    // Traditional Mughal Marble Garden Urn
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(egX - 35, egY + 40, 70, 30, [10, 10, 4, 4]);
    ctx.fill(); ctx.stroke();
    ctx.beginPath();
    ctx.arc(egX, egY + 40, 25, 0, Math.PI);
    ctx.fill(); ctx.stroke();

    // Flowering pink roses in the urn
    ctx.fillStyle = '#e11d48';
    ctx.beginPath();
    ctx.arc(egX - 12, egY + 25, 8, 0, Math.PI * 2);
    ctx.arc(egX + 12, egY + 25, 9, 0, Math.PI * 2);
    ctx.arc(egX, egY + 18, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Right-side symmetric garden flora (x: 1920)
    ctx.save();
    const rgX = 1920;
    const rgY = height * 0.70;
    const rBloomGrad = ctx.createRadialGradient(rgX, rgY - 70, 20, rgX, rgY - 70, 110);
    rBloomGrad.addColorStop(0, '#f43f5e');
    rBloomGrad.addColorStop(0.5, '#fb7185');
    rBloomGrad.addColorStop(0.85, '#fda4af');
    rBloomGrad.addColorStop(1, 'rgba(253, 164, 175, 0)');
    ctx.fillStyle = rBloomGrad;
    ctx.beginPath();
    ctx.arc(rgX, rgY - 70, 110, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.restore();
  }

  _renderHangingGardensBabylon(ctx, width, height, t) {
    ctx.save();

    // 1. Radiant Mesopotamian Desert Sky & Blazing Sun
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#0284c7');
    sky.addColorStop(0.25, '#38bdf8');
    sky.addColorStop(0.48, '#fed7aa');
    sky.addColorStop(0.58, '#f97316');
    sky.addColorStop(1, '#9a3412');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    // Blazing Desert Sun with Corona Rays
    const sunX = width * 0.72;
    const sunY = height * 0.20;
    const sunGlow = ctx.createRadialGradient(sunX, sunY, 15, sunX, sunY, 180);
    sunGlow.addColorStop(0, '#ffffff');
    sunGlow.addColorStop(0.2, '#fef08a');
    sunGlow.addColorStop(0.5, 'rgba(251, 191, 36, 0.45)');
    sunGlow.addColorStop(1, 'rgba(251, 146, 60, 0)');
    ctx.fillStyle = sunGlow;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 180, 0, Math.PI * 2);
    ctx.fill();

    // Subtle Rotating Sun Corona Flares
    ctx.save();
    ctx.translate(sunX, sunY);
    ctx.rotate(t * 0.04);
    ctx.strokeStyle = 'rgba(254, 240, 138, 0.22)';
    ctx.lineWidth = 3;
    for (let r = 0; r < 12; r++) {
      ctx.beginPath();
      ctx.moveTo(0, 40);
      ctx.lineTo(0, 140);
      ctx.stroke();
      ctx.rotate(Math.PI / 6);
    }
    ctx.restore();

    // 2. Distant Sand Dunes & The Meandering Euphrates River
    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.48);
    ctx.bezierCurveTo(width * 0.3, height * 0.45, width * 0.7, height * 0.50, width, height * 0.47);
    ctx.lineTo(width, height * 0.58);
    ctx.lineTo(0, height * 0.58);
    ctx.closePath();
    ctx.fill();

    // Euphrates River shimmering in the distant haze
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.moveTo(width * 0.65, height * 0.49);
    ctx.bezierCurveTo(width * 0.72, height * 0.51, width * 0.82, height * 0.50, width, height * 0.52);
    ctx.lineTo(width, height * 0.54);
    ctx.bezierCurveTo(width * 0.80, height * 0.52, width * 0.70, height * 0.53, width * 0.65, height * 0.50);
    ctx.closePath();
    ctx.fill();

    // 3. Stufenförmige Terrassenbauten von Babylon (Multi-Tiered Ziggurat Architecture)
    
    // TIER 3 (Upper Royal Terrace: y = height * 0.35, width: 800 to 1600)
    const t3Left = width * 0.30;
    const t3Right = width * 0.70;
    const t3Top = height * 0.36;
    const t3Bottom = height * 0.50;

    // Baked Mudbrick Wall with Sandstone Shading
    const brickGrad3 = ctx.createLinearGradient(0, t3Top, 0, t3Bottom);
    brickGrad3.addColorStop(0, '#d97706');
    brickGrad3.addColorStop(0.5, '#b45309');
    brickGrad3.addColorStop(1, '#92400e');
    ctx.fillStyle = brickGrad3;
    ctx.fillRect(t3Left, t3Top, t3Right - t3Left, t3Bottom - t3Top);

    // Ancient Mesopotamian Crenellations (Stepped Battlements on Top Edge)
    ctx.fillStyle = '#78350f';
    const cStep = 32;
    for (let cx = t3Left; cx < t3Right - cStep; cx += cStep) {
      ctx.beginPath();
      ctx.moveTo(cx, t3Top);
      ctx.lineTo(cx + 6, t3Top - 12);
      ctx.lineTo(cx + 12, t3Top - 12);
      ctx.lineTo(cx + 12, t3Top - 20);
      ctx.lineTo(cx + 20, t3Top - 20);
      ctx.lineTo(cx + 20, t3Top - 12);
      ctx.lineTo(cx + 26, t3Top - 12);
      ctx.lineTo(cx + 32, t3Top);
      ctx.closePath();
      ctx.fill();
    }

    // Royal Pavilion / Pergola at Center of Tier 3
    const pavX = width * 0.50;
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(pavX - 110, t3Top - 55, 220, 10); // Architrave
    for (let c = -100; c <= 100; c += 50) {
      ctx.fillStyle = '#fde047';
      ctx.fillRect(pavX + c - 5, t3Top - 45, 10, 45); // Pillars
    }
    // Golden Pavilion Dome
    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.arc(pavX, t3Top - 55, 45, Math.PI, 0);
    ctx.fill();
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 2;
    ctx.stroke();

    // TIER 2 (Middle Terrace: y = height * 0.50, width: 350 to 2050)
    const t2Left = width * 0.15;
    const t2Right = width * 0.85;
    const t2Top = height * 0.49;
    const t2Bottom = height * 0.67;

    const brickGrad2 = ctx.createLinearGradient(0, t2Top, 0, t2Bottom);
    brickGrad2.addColorStop(0, '#b45309');
    brickGrad2.addColorStop(0.3, '#92400e');
    brickGrad2.addColorStop(1, '#78350f');
    ctx.fillStyle = brickGrad2;
    ctx.fillRect(t2Left, t2Top, t2Right - t2Left, t2Bottom - t2Top);

    // Glazed Blue Ishtar Brick Border (Lapis Lazuli with Golden Rosettes)
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(t2Left, t2Top + 12, t2Right - t2Left, 24);
    ctx.strokeStyle = '#1d4ed8';
    ctx.lineWidth = 2;
    ctx.strokeRect(t2Left, t2Top + 12, t2Right - t2Left, 24);
    // Golden Rosette Stars along the Ishtar Frieze
    ctx.fillStyle = '#facc15';
    for (let rx = t2Left + 20; rx < t2Right - 20; rx += 45) {
      ctx.beginPath();
      ctx.arc(rx, t2Top + 24, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Arched Colonnades in Tier 2
    for (let ax = t2Left + 80; ax < t2Right - 80; ax += 140) {
      ctx.fillStyle = '#451a03';
      ctx.beginPath();
      ctx.arc(ax + 30, t2Top + 75, 28, Math.PI, 0);
      ctx.lineTo(ax + 58, t2Bottom - 10);
      ctx.lineTo(ax + 2, t2Bottom - 10);
      ctx.closePath();
      ctx.fill();
      // Sandstone Arch Framing
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 3;
      ctx.stroke();
    }

    // TIER 1 (Lower Great Terrace & Base: y = height * 0.66 to height)
    const t1Top = height * 0.66;
    const brickGrad1 = ctx.createLinearGradient(0, t1Top, 0, height);
    brickGrad1.addColorStop(0, '#92400e');
    brickGrad1.addColorStop(0.4, '#78350f');
    brickGrad1.addColorStop(1, '#451a03');
    ctx.fillStyle = brickGrad1;
    ctx.fillRect(0, t1Top, width, height - t1Top);

    // Ancient Glazed Ishtar Blue Gate on the left (Easter Egg area x: 580)
    const gateX = 580;
    const gateY = height * 0.65;
    ctx.fillStyle = '#1e40af';
    ctx.fillRect(gateX - 85, gateY - 60, 170, 120);
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 3;
    ctx.strokeRect(gateX - 85, gateY - 60, 170, 120);
    // Gate arch portal
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(gateX, gateY + 10, 42, Math.PI, 0);
    ctx.lineTo(gateX + 42, gateY + 60);
    ctx.lineTo(gateX - 42, gateY + 60);
    ctx.closePath();
    ctx.fill();
    // Golden winged bull / lion relief symbols
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(gateX - 55, gateY - 30, 10, 0, Math.PI * 2);
    ctx.arc(gateX + 55, gateY - 30, 10, 0, Math.PI * 2);
    ctx.fill();

    // 4. Plätschernde Wasserfälle (Grand Cascading Waterfalls & Shimmering Pools)
    const wfX = width * 0.50; // Central Waterfall (x: 1200)
    
    // Tier 3 to Tier 2 Upper Waterfall Chute
    const wfTop1 = t3Top + 20;
    const wfBottom1 = t2Top + 10;
    const wfWidth1 = 55;
    
    // Water gradient
    const waterGrad1 = ctx.createLinearGradient(wfX - 30, 0, wfX + 30, 0);
    waterGrad1.addColorStop(0, '#38bdf8');
    waterGrad1.addColorStop(0.3, '#e0f2fe');
    waterGrad1.addColorStop(0.7, '#ffffff');
    waterGrad1.addColorStop(1, '#0284c7');
    ctx.fillStyle = waterGrad1;
    ctx.fillRect(wfX - wfWidth1 / 2, wfTop1, wfWidth1, wfBottom1 - wfTop1);

    // Animated shimmering water streams
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    for (let s = -20; s <= 20; s += 10) {
      const waveShift = Math.sin(t * 7 + s) * 3;
      ctx.beginPath();
      ctx.moveTo(wfX + s, wfTop1);
      ctx.lineTo(wfX + s + waveShift, wfBottom1);
      ctx.stroke();
    }

    // Mid Terrace Turquoise Catch Basin
    ctx.fillStyle = '#0891b2';
    ctx.beginPath();
    ctx.ellipse(wfX, wfBottom1, 80, 18, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#67e8f9';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Tier 2 to Tier 1 Great Cascading Waterfall
    const wfTop2 = wfBottom1 + 8;
    const wfBottom2 = t1Top + 25;
    const wfWidth2 = 85;

    const waterGrad2 = ctx.createLinearGradient(wfX - 50, 0, wfX + 50, 0);
    waterGrad2.addColorStop(0, '#0284c7');
    waterGrad2.addColorStop(0.2, '#38bdf8');
    waterGrad2.addColorStop(0.5, '#ffffff');
    waterGrad2.addColorStop(0.8, '#7dd3fc');
    waterGrad2.addColorStop(1, '#0369a1');
    ctx.fillStyle = waterGrad2;
    ctx.fillRect(wfX - wfWidth2 / 2, wfTop2, wfWidth2, wfBottom2 - wfTop2);

    // Animated water foam ribbons
    for (let r = -35; r <= 35; r += 12) {
      const foamShift = Math.sin(t * 9 + r * 0.5) * 4;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(wfX + r, wfTop2);
      ctx.lineTo(wfX + r + foamShift, wfBottom2);
      ctx.stroke();
    }

    // Lower Terrace Splash Pool & Foaming Impact Basin
    const poolGrad = ctx.createRadialGradient(wfX, wfBottom2, 10, wfX, wfBottom2, 120);
    poolGrad.addColorStop(0, '#cffafe');
    poolGrad.addColorStop(0.4, '#06b6d4');
    poolGrad.addColorStop(0.85, '#0284c7');
    poolGrad.addColorStop(1, '#083344');
    ctx.fillStyle = poolGrad;
    ctx.beginPath();
    ctx.ellipse(wfX, wfBottom2, 130, 32, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#bae6fd';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Animated Water Ripples & Splash Foams
    for (let rp = 1; rp <= 3; rp++) {
      const rRad = ( (t * 22 + rp * 35) % 115 );
      const rAlpha = Math.max(0, 1 - rRad / 115);
      ctx.strokeStyle = `rgba(255, 255, 255, ${rAlpha * 0.8})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(wfX, wfBottom2, rRad, rRad * 0.25, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    // 5. Üppige Tropische Vegetation (Hanging Ivy, Palms, Flowering Bougainvillea)
    
    // Cascading Hanging Vines & Leaves Draping Down Terrace Ledges
    const drawHangingVine = (vx, vy, len, leafColor, flowerColor) => {
      ctx.strokeStyle = '#14532d';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(vx, vy);
      const endY = vy + len;
      const sway = Math.sin(t * 1.5 + vx * 0.02) * 5;
      ctx.quadraticCurveTo(vx + sway * 1.2, vy + len * 0.5, vx + sway, endY);
      ctx.stroke();

      // Leaves along the vine
      ctx.fillStyle = leafColor;
      for (let ly = vy + 10; ly < endY; ly += 14) {
        const lx = vx + Math.sin(ly * 0.1 + t) * 3;
        ctx.beginPath();
        ctx.ellipse(lx - 5, ly, 6, 3, Math.PI * 0.25, 0, Math.PI * 2);
        ctx.ellipse(lx + 5, ly, 6, 3, -Math.PI * 0.25, 0, Math.PI * 2);
        ctx.fill();
      }

      // Tropical Flower Blossoms
      if (flowerColor) {
        ctx.fillStyle = flowerColor;
        ctx.beginPath();
        ctx.arc(vx + sway, endY, 4.5, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // Hanging vines on Tier 3 Edge
    for (let hx = t3Left + 15; hx < t3Right - 15; hx += 38) {
      if (Math.abs(hx - wfX) < 35) continue; // Leave waterfall clear
      const vLen = 25 + Math.sin(hx * 1.7) * 15;
      const fCol = (hx % 3 === 0) ? '#f43f5e' : ((hx % 2 === 0) ? '#facc15' : null);
      drawHangingVine(hx, t3Bottom, vLen, '#16a34a', fCol);
    }

    // Hanging vines on Tier 2 Edge
    for (let hx = t2Left + 20; hx < t2Right - 20; hx += 34) {
      if (Math.abs(hx - wfX) < 55) continue;
      const vLen = 35 + Math.sin(hx * 2.1) * 20;
      const fCol = (hx % 4 === 0) ? '#ef4444' : ((hx % 2 === 0) ? '#ec4899' : null);
      drawHangingVine(hx, t2Bottom, vLen, '#15803d', fCol);
    }

    // Majestic Date Palm Trees (Phönixpalmen) on Terraces and Flanks
    const drawDatePalm = (px, py, scale) => {
      ctx.save();
      ctx.translate(px, py);
      ctx.scale(scale, scale);

      // Curved Trunk with textured palm rings
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 14;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      const sway = Math.sin(t * 1.2 + px * 0.01) * 8;
      ctx.quadraticCurveTo(sway * 0.5, -90, sway, -170);
      ctx.stroke();

      // Trunk rings
      ctx.strokeStyle = '#92400e';
      ctx.lineWidth = 2;
      for (let ringY = -15; ringY > -160; ringY -= 12) {
        ctx.beginPath();
        ctx.moveTo(-7, ringY);
        ctx.lineTo(7, ringY);
        ctx.stroke();
      }

      // Crown of Arching Palm Fronds
      const crownX = sway;
      const crownY = -170;
      const frondAngles = [-1.4, -1.0, -0.6, -0.2, 0.2, 0.6, 1.0, 1.4];
      frondAngles.forEach(ang => {
        const fSway = Math.sin(t * 2 + ang) * 0.08;
        ctx.save();
        ctx.translate(crownX, crownY);
        ctx.rotate(ang + fSway);

        // Frond stem
        ctx.strokeStyle = '#15803d';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(25, -35, 75, -20);
        ctx.stroke();

        // Frond Leaflets
        ctx.fillStyle = '#22c55e';
        for (let seg = 15; seg < 70; seg += 9) {
          ctx.beginPath();
          ctx.ellipse(seg, -22, 10, 3, Math.PI * 0.35, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      // Date clusters (golden-amber dates)
      ctx.fillStyle = '#d97706';
      ctx.beginPath();
      ctx.arc(crownX - 8, crownY + 12, 7, 0, Math.PI * 2);
      ctx.arc(crownX + 8, crownY + 12, 7, 0, Math.PI * 2);
      ctx.arc(crownX, crownY + 18, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // Plant Palms on Left and Right Terraces & Roofs
    drawDatePalm(220, t1Top + 60, 1.15);
    drawDatePalm(380, t2Top + 15, 0.95);
    drawDatePalm(width * 0.33, t3Top, 0.85);
    drawDatePalm(width * 0.67, t3Top, 0.85);
    drawDatePalm(1820, t2Top + 25, 1.1); // Royal Palm Easter Egg area (x: 1820)
    drawDatePalm(2150, t1Top + 70, 1.25);

    // Flowering Terracotta Urns & Exotic Fern Bushes along the Walkway
    const urnPositions = [150, 420, 880, 1520, 1980, 2280];
    urnPositions.forEach(ux => {
      const uy = t1Top + 18;
      // Clay Urn
      ctx.fillStyle = '#c2410c';
      ctx.beginPath();
      ctx.roundRect(ux - 18, uy, 36, 26, [4, 4, 12, 12]);
      ctx.fill();
      ctx.strokeStyle = '#9a3412';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Bush of Tropical Lotus & Fern Leaves
      ctx.fillStyle = '#16a34a';
      ctx.beginPath();
      ctx.arc(ux - 12, uy - 8, 14, 0, Math.PI * 2);
      ctx.arc(ux + 12, uy - 8, 15, 0, Math.PI * 2);
      ctx.arc(ux, uy - 16, 18, 0, Math.PI * 2);
      ctx.fill();

      // Blossoming Exotic Flowers
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(ux - 6, uy - 18, 6, 0, Math.PI * 2);
      ctx.arc(ux + 8, uy - 14, 5, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.restore();
  }

  _renderZeusStatueOlympia(ctx, width, height, t) {
    ctx.save();

    // 1. Grand Temple Sanctum Ambient Glow (Prunkvolles Tempel-Inneres)
    const templeAmb = ctx.createLinearGradient(0, 0, 0, height);
    templeAmb.addColorStop(0, '#1c1917');
    templeAmb.addColorStop(0.35, '#292524');
    templeAmb.addColorStop(0.65, '#451a03');
    templeAmb.addColorStop(1, '#0c0a09');
    ctx.fillStyle = templeAmb;
    ctx.fillRect(0, 0, width, height);

    // Coffered Temple Ceiling with Golden Rosettes (Goldene Kassettendecke)
    const ceilHeight = height * 0.18;
    ctx.fillStyle = '#44403c';
    ctx.fillRect(0, 0, width, ceilHeight);
    const cofferW = 90;
    for (let cx = 10; cx < width; cx += cofferW) {
      ctx.fillStyle = '#292524';
      ctx.fillRect(cx, 12, cofferW - 14, ceilHeight - 24);
      ctx.strokeStyle = '#eab308';
      ctx.lineWidth = 2;
      ctx.strokeRect(cx, 12, cofferW - 14, ceilHeight - 24);

      // Gold Rosette in Coffer Center
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(cx + (cofferW - 14) / 2, ceilHeight / 2, 8, 0, Math.PI * 2);
      ctx.fill();
    }

    // Polished Marble Checkered Floor with Golden Reflections
    const floorY = height * 0.72;
    const floorGrad = ctx.createLinearGradient(0, floorY, 0, height);
    floorGrad.addColorStop(0, '#1e293b');
    floorGrad.addColorStop(0.5, '#0f172a');
    floorGrad.addColorStop(1, '#020617');
    ctx.fillStyle = floorGrad;
    ctx.fillRect(0, floorY, width, height - floorY);

    // Floor Perspective Tile Lines
    ctx.strokeStyle = 'rgba(234, 179, 8, 0.35)';
    ctx.lineWidth = 1.5;
    for (let fx = 0; fx <= width; fx += 160) {
      ctx.beginPath();
      ctx.moveTo(fx, floorY);
      ctx.lineTo(fx + (fx - width / 2) * 0.8, height);
      ctx.stroke();
    }
    for (let fy = floorY + 18; fy < height; fy += 28) {
      ctx.beginPath();
      ctx.moveTo(0, fy);
      ctx.lineTo(width, fy);
      ctx.stroke();
    }

    // 2. Colossal Zeus Statue (Chryselephantine Gold & Ivory Masterpiece) at Center (x: 1200)
    const zX = width * 0.50; // 1200
    const zBaseY = floorY;

    // Divine Radiance / Golden Aura Behind Zeus's Head
    const haloY = zBaseY - 330;
    const haloGrad = ctx.createRadialGradient(zX, haloY, 20, zX, haloY, 260);
    haloGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
    haloGrad.addColorStop(0.25, 'rgba(254, 240, 138, 0.65)');
    haloGrad.addColorStop(0.65, 'rgba(234, 179, 8, 0.35)');
    haloGrad.addColorStop(1, 'rgba(180, 83, 9, 0)');
    ctx.fillStyle = haloGrad;
    ctx.beginPath();
    ctx.arc(zX, haloY, 260, 0, Math.PI * 2);
    ctx.fill();

    // Rotating Divine Golden Rays
    ctx.save();
    ctx.translate(zX, haloY);
    ctx.rotate(t * 0.05);
    ctx.strokeStyle = 'rgba(254, 240, 138, 0.28)';
    ctx.lineWidth = 3;
    for (let r = 0; r < 16; r++) {
      ctx.beginPath();
      ctx.moveTo(0, 60);
      ctx.lineTo(0, 220);
      ctx.stroke();
      ctx.rotate(Math.PI / 8);
    }
    ctx.restore();

    // Massive Marble & Gold Pedestal (Thron-Podest)
    ctx.fillStyle = '#1c1917';
    ctx.fillRect(zX - 260, zBaseY - 45, 520, 45);
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(zX - 250, zBaseY - 40, 500, 15);
    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(zX - 250, zBaseY - 40, 500, 15);

    // Ornate Golden & Ivory Throne of Zeus (Elfenbeinthron)
    const thBackY = zBaseY - 380;
    ctx.fillStyle = '#78350f'; // Dark polished cedar/ebony
    ctx.fillRect(zX - 190, thBackY, 380, 340);
    // Gold Inlay Trims
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 4;
    ctx.strokeRect(zX - 180, thBackY + 10, 360, 320);

    // Throne Finials: Golden Lions / Sphinxes on Armrests
    ctx.fillStyle = '#eab308';
    ctx.fillRect(zX - 215, zBaseY - 210, 35, 170); // Left armrest
    ctx.fillRect(zX + 180, zBaseY - 210, 35, 170); // Right armrest
    // Golden carved lion heads
    ctx.beginPath();
    ctx.arc(zX - 198, zBaseY - 215, 18, 0, Math.PI * 2);
    ctx.arc(zX + 198, zBaseY - 215, 18, 0, Math.PI * 2);
    ctx.fill();

    // Throne Back Cresting (Gold Palm Leaves / Palmettes)
    for (let tx = zX - 160; tx <= zX + 160; tx += 40) {
      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.arc(tx, thBackY, 15, Math.PI, 0);
      ctx.fill();
    }

    // Colossal Seated Zeus Body:
    // A. Ivory Torso & Arms (Elfenbein)
    const torsoGrad = ctx.createLinearGradient(zX - 80, 0, zX + 80, 0);
    torsoGrad.addColorStop(0, '#f1f5f9');
    torsoGrad.addColorStop(0.5, '#ffffff');
    torsoGrad.addColorStop(1, '#e2e8f0');
    ctx.fillStyle = torsoGrad;
    // Bare muscular chest
    ctx.beginPath();
    ctx.moveTo(zX - 75, zBaseY - 290);
    ctx.lineTo(zX + 75, zBaseY - 290);
    ctx.lineTo(zX + 65, zBaseY - 180);
    ctx.lineTo(zX - 65, zBaseY - 180);
    ctx.closePath();
    ctx.fill();

    // B. Ornate Draped Golden Robe (Goldgewand mit Faltenwurf)
    const robeGrad = ctx.createLinearGradient(zX - 140, 0, zX + 140, 0);
    robeGrad.addColorStop(0, '#ca8a04');
    robeGrad.addColorStop(0.3, '#facc15');
    robeGrad.addColorStop(0.7, '#fde047');
    robeGrad.addColorStop(1, '#a16207');
    ctx.fillStyle = robeGrad;
    // Lower draped robe over seated knees
    ctx.beginPath();
    ctx.moveTo(zX - 130, zBaseY - 185);
    ctx.lineTo(zX + 130, zBaseY - 185);
    ctx.lineTo(zX + 150, zBaseY - 45);
    ctx.lineTo(zX - 150, zBaseY - 45);
    ctx.closePath();
    ctx.fill();

    // Robe Drapes & Folds
    ctx.strokeStyle = '#854d0e';
    ctx.lineWidth = 2.5;
    for (let f = -100; f <= 100; f += 25) {
      ctx.beginPath();
      ctx.moveTo(zX + f, zBaseY - 180);
      ctx.quadraticCurveTo(zX + f + 8, zBaseY - 110, zX + f - 5, zBaseY - 45);
      ctx.stroke();
    }

    // C. Zeus Majestic Bearded Head & Golden Olive Wreath
    const headY = zBaseY - 330;
    // Neck & Face (Ivory)
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.arc(zX, headY, 32, 0, Math.PI * 2);
    ctx.fill();

    // Flowing White & Gold Beard and Locks
    ctx.fillStyle = '#f1f5f9';
    ctx.beginPath();
    ctx.arc(zX, headY + 28, 26, 0, Math.PI); // Long divine beard
    ctx.fill();
    // Flowing hair curls
    ctx.beginPath();
    ctx.arc(zX - 32, headY - 4, 18, 0, Math.PI * 2);
    ctx.arc(zX + 32, headY - 4, 18, 0, Math.PI * 2);
    ctx.fill();

    // Golden Olive Wreath (Ölzweigkrone)
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.ellipse(zX, headY - 26, 36, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 2;
    ctx.stroke();

    // D. Left Hand: Golden Scepter Topped with Royal Eagle (x: 1040)
    const scX = zX - 160;
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(scX, zBaseY - 410);
    ctx.lineTo(scX, zBaseY - 50);
    ctx.stroke();
    // Golden Eagle atop scepter
    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.arc(scX, zBaseY - 420, 14, 0, Math.PI * 2); // Body
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(scX - 22, zBaseY - 425); // Wings
    ctx.lineTo(scX + 22, zBaseY - 425);
    ctx.lineTo(scX, zBaseY - 412);
    ctx.closePath();
    ctx.fill();

    // Animated Divine Lightning Sparks around Scepter & Hand (Easter Egg Area x: 1200, y: screenHeight * 0.35)
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 12;
    for (let l = 0; l < 3; l++) {
      const lPhase = t * 6 + l * 2;
      ctx.beginPath();
      ctx.moveTo(scX + Math.sin(lPhase) * 10, zBaseY - 380 + l * 25);
      ctx.lineTo(scX + Math.cos(lPhase) * 18, zBaseY - 370 + l * 25);
      ctx.lineTo(scX + Math.sin(lPhase * 1.5) * 12, zBaseY - 360 + l * 25);
      ctx.stroke();
    }
    ctx.shadowBlur = 0;

    // E. Right Hand: Winged Golden Nike (Göttin des Sieges) at (x: 1360, y: zBaseY - 220)
    const nX = zX + 160;
    const nY = zBaseY - 220;
    // Golden Nike Figure
    ctx.fillStyle = '#fde047';
    ctx.beginPath();
    ctx.arc(nX, nY - 30, 8, 0, Math.PI * 2); // Head
    ctx.fill();
    // Robed figure body
    ctx.beginPath();
    ctx.moveTo(nX - 12, nY);
    ctx.lineTo(nX + 12, nY);
    ctx.lineTo(nX + 6, nY - 24);
    ctx.lineTo(nX - 6, nY - 24);
    ctx.closePath();
    ctx.fill();
    // Spread Golden Wings
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.moveTo(nX - 4, nY - 20);
    ctx.lineTo(nX - 28, nY - 45);
    ctx.lineTo(nX - 12, nY - 14);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(nX + 4, nY - 20);
    ctx.lineTo(nX + 28, nY - 45);
    ctx.lineTo(nX + 12, nY - 14);
    ctx.closePath();
    ctx.fill();
    // Nike holding out golden victory wreath
    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(nX + 15, nY - 32, 6, 0, Math.PI * 2);
    ctx.stroke();

    // 3. Riesige Ionische Säulen (Giant Fluted Ionic Columns Flanking the Temple Hall)
    const colXs = [120, 340, 560, 1840, 2060, 2280];
    colXs.forEach(cx => {
      const colTop = ceilHeight;
      const colBot = floorY;
      const colW = 85;

      // Marble Shaft Gradient
      const colGrad = ctx.createLinearGradient(cx - colW / 2, 0, cx + colW / 2, 0);
      colGrad.addColorStop(0, '#cbd5e1');
      colGrad.addColorStop(0.2, '#f8fafc');
      colGrad.addColorStop(0.6, '#ffffff');
      colGrad.addColorStop(0.9, '#e2e8f0');
      colGrad.addColorStop(1, '#94a3b8');
      ctx.fillStyle = colGrad;
      ctx.fillRect(cx - colW / 2, colTop + 35, colW, colBot - colTop - 35);

      // Fluting Lines (Kanneluren)
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.5;
      for (let fx = cx - colW / 2 + 10; fx < cx + colW / 2; fx += 11) {
        ctx.beginPath();
        ctx.moveTo(fx, colTop + 35);
        ctx.lineTo(fx, colBot);
        ctx.stroke();
      }

      // Ionic Capital (Schneckenkapitell / Voluten)
      const capY = colTop + 18;
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(cx - colW / 2 - 16, capY - 10, colW + 32, 28);
      ctx.strokeStyle = '#eab308';
      ctx.lineWidth = 2;
      ctx.strokeRect(cx - colW / 2 - 16, capY - 10, colW + 32, 28);

      // Left and Right Volute Scrolls
      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.arc(cx - colW / 2 - 10, capY + 4, 16, 0, Math.PI * 2);
      ctx.arc(cx + colW / 2 + 10, capY + 4, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ca8a04';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Column Base (Basis mit Plinthe)
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(cx - colW / 2 - 12, colBot - 24, colW + 24, 24);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.strokeRect(cx - colW / 2 - 12, colBot - 24, colW + 24, 24);
    });

    // 4. Burning Olympian Bronze Braziers (Opferschalen mit loderndem olympischen Feuer)
    const brazierXs = [450, 780, 1620, 1950];
    brazierXs.forEach((bx, bIdx) => {
      const by = floorY - 10;

      // Bronze Tripod Stand
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(bx - 26, by);
      ctx.lineTo(bx - 12, by - 55);
      ctx.moveTo(bx + 26, by);
      ctx.lineTo(bx + 12, by - 55);
      ctx.moveTo(bx, by);
      ctx.lineTo(bx, by - 55);
      ctx.stroke();

      // Bronze Bowl (Schale)
      ctx.fillStyle = '#b45309';
      ctx.beginPath();
      ctx.arc(bx, by - 55, 32, 0, Math.PI);
      ctx.fill();
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Flickering Olympian Flame
      const flameH = 45 + Math.sin(t * 8 + bIdx * 2.3) * 12;
      const flameGrad = ctx.createRadialGradient(bx, by - 65, 4, bx, by - 65, flameH);
      flameGrad.addColorStop(0, '#ffffff');
      flameGrad.addColorStop(0.3, '#fef08a');
      flameGrad.addColorStop(0.6, '#f97316');
      flameGrad.addColorStop(0.9, '#dc2626');
      flameGrad.addColorStop(1, 'rgba(220, 38, 38, 0)');
      ctx.fillStyle = flameGrad;
      ctx.beginPath();
      ctx.moveTo(bx - 24, by - 60);
      ctx.quadraticCurveTo(bx - 12, by - 65 - flameH * 0.7, bx + Math.sin(t * 10 + bIdx) * 6, by - 65 - flameH);
      ctx.quadraticCurveTo(bx + 12, by - 65 - flameH * 0.7, bx + 24, by - 60);
      ctx.closePath();
      ctx.fill();

      // Warm Fire Light Glow
      const fireGlow = ctx.createRadialGradient(bx, by - 65, 10, bx, by - 65, 130);
      fireGlow.addColorStop(0, 'rgba(251, 191, 36, 0.45)');
      fireGlow.addColorStop(0.7, 'rgba(249, 115, 22, 0.15)');
      fireGlow.addColorStop(1, 'rgba(249, 115, 22, 0)');
      ctx.fillStyle = fireGlow;
      ctx.beginPath();
      ctx.arc(bx, by - 65, 130, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.restore();
  }

  _renderLighthouseAlexandria(ctx, width, height, t) {
    ctx.save();

    // 1. Dramatic Stormy Rainy Sky over the Mediterranean
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#0f172a');
    sky.addColorStop(0.3, '#1e293b');
    sky.addColorStop(0.55, '#334155');
    sky.addColorStop(0.7, '#1e3a5f');
    sky.addColorStop(1, '#075985');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    // Moody Storm Cloud Layers
    ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
    for (let c = 0; c < 8; c++) {
      const cx = (c * 340 + t * 8) % (width + 400) - 200;
      const cy = 60 + Math.sin(c * 1.5) * 45;
      ctx.beginPath();
      ctx.ellipse(cx, cy, 220, 70, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Das blaue Mittelmeer (Deep Blue Mediterranean Sea with Rolling Waves)
    const seaY = height * 0.58;
    const seaGrad = ctx.createLinearGradient(0, seaY, 0, height);
    seaGrad.addColorStop(0, '#0369a1');
    seaGrad.addColorStop(0.3, '#0284c7');
    seaGrad.addColorStop(0.7, '#075985');
    seaGrad.addColorStop(1, '#082f49');
    ctx.fillStyle = seaGrad;
    ctx.fillRect(0, seaY, width, height - seaY);

    // Rolling Sea Wave Crests
    for (let w = 0; w < 6; w++) {
      const wy = seaY + 25 + w * 42;
      const wSpeed = 25 + w * 12;
      ctx.fillStyle = w % 2 === 0 ? 'rgba(56, 189, 248, 0.35)' : 'rgba(14, 165, 233, 0.28)';
      ctx.beginPath();
      ctx.moveTo(0, wy);
      for (let x = 0; x <= width; x += 60) {
        const waveH = Math.sin((x + t * wSpeed) * 0.02 + w) * (6 + w * 2.2);
        ctx.lineTo(x, wy + waveH);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();

      // White Wave Foam Caps
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x <= width; x += 80) {
        const waveH = Math.sin((x + t * wSpeed) * 0.02 + w) * (6 + w * 2.2);
        if (waveH < -3) {
          ctx.moveTo(x - 20, wy + waveH);
          ctx.lineTo(x + 20, wy + waveH);
        }
      }
      ctx.stroke();
    }

    // 3. Mächtige antike Hafenfestung auf der Insel Pharos (Island Harbor Fortress)
    const islandX = width * 0.50; // 1200
    const islandY = height * 0.62;

    // Rocky Island Base battered by waves
    ctx.fillStyle = '#475569';
    ctx.beginPath();
    ctx.moveTo(islandX - 420, height);
    ctx.lineTo(islandX - 380, islandY + 30);
    ctx.lineTo(islandX - 320, islandY);
    ctx.lineTo(islandX + 320, islandY);
    ctx.lineTo(islandX + 380, islandY + 30);
    ctx.lineTo(islandX + 420, height);
    ctx.closePath();
    ctx.fill();

    // Sea Wall Bastions & Fortifications (Antike Festungsmauern mit Zinnen)
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(islandX - 300, islandY - 35, 600, 45);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.strokeRect(islandX - 300, islandY - 35, 600, 45);

    // Stone Crenellations on Fortress Wall
    ctx.fillStyle = '#94a3b8';
    for (let bx = islandX - 290; bx < islandX + 290; bx += 32) {
      ctx.fillRect(bx, islandY - 50, 16, 15);
    }

    // Corner Bastion Watchtowers
    [-290, 260].forEach(twX => {
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(islandX + twX, islandY - 80, 50, 60);
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.strokeRect(islandX + twX, islandY - 80, 50, 60);
      // Conical Roof
      ctx.fillStyle = '#b45309';
      ctx.beginPath();
      ctx.moveTo(islandX + twX - 6, islandY - 80);
      ctx.lineTo(islandX + twX + 25, islandY - 110);
      ctx.lineTo(islandX + twX + 56, islandY - 80);
      ctx.closePath();
      ctx.fill();
    });

    // 4. Der Kolossale Leuchtturm von Alexandria (The Pharos of Alexandria) Centered at x: 1200
    const lhX = islandX;
    const baseTopY = islandY - 35;

    // TIER 1: Massive Square Limestone Base (Quaderförmiger Unterbau)
    const t1W = 190;
    const t1H = 150;
    const t1TopY = baseTopY - t1H;
    const t1Grad = ctx.createLinearGradient(lhX - t1W / 2, 0, lhX + t1W / 2, 0);
    t1Grad.addColorStop(0, '#94a3b8');
    t1Grad.addColorStop(0.3, '#f1f5f9');
    t1Grad.addColorStop(0.7, '#ffffff');
    t1Grad.addColorStop(1, '#cbd5e1');
    ctx.fillStyle = t1Grad;
    ctx.fillRect(lhX - t1W / 2, t1TopY, t1W, t1H);
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(lhX - t1W / 2, t1TopY, t1W, t1H);

    // Classical Cornice & Horizontal Stone Banding on Tier 1
    for (let by = t1TopY + 30; by < baseTopY; by += 30) {
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(lhX - t1W / 2, by);
      ctx.lineTo(lhX + t1W / 2, by);
      ctx.stroke();
    }
    // Grand Arched Fortress Gateway in Tier 1
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(lhX, baseTopY - 20, 18, Math.PI, 0);
    ctx.lineTo(lhX + 18, baseTopY);
    ctx.lineTo(lhX - 18, baseTopY);
    ctx.closePath();
    ctx.fill();

    // Four Corner Bronze Tritons blowing Horns on Tier 1 Rooftop
    [-t1W / 2 + 10, t1W / 2 - 10].forEach(tx => {
      ctx.fillStyle = '#ca8a04';
      ctx.beginPath();
      ctx.arc(lhX + tx, t1TopY - 12, 8, 0, Math.PI * 2);
      ctx.fill();
    });

    // TIER 2: Tapering Octagonal Middle Tower (Achteckiger Mittelturm)
    const t2WBottom = 130;
    const t2WTop = 95;
    const t2H = 130;
    const t2TopY = t1TopY - t2H;

    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.moveTo(lhX - t2WBottom / 2, t1TopY);
    ctx.lineTo(lhX - t2WTop / 2, t2TopY);
    ctx.lineTo(lhX + t2WTop / 2, t2TopY);
    ctx.lineTo(lhX + t2WBottom / 2, t1TopY);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Octagonal Corner Chamfer Shading
    ctx.fillStyle = 'rgba(148, 163, 184, 0.35)';
    ctx.beginPath();
    ctx.moveTo(lhX - t2WBottom / 2, t1TopY);
    ctx.lineTo(lhX - t2WTop / 2, t2TopY);
    ctx.lineTo(lhX - t2WTop * 0.2, t2TopY);
    ctx.lineTo(lhX - t2WBottom * 0.2, t1TopY);
    ctx.closePath();
    ctx.fill();

    // Arched Windows in Octagonal Tower
    [t2TopY + 35, t2TopY + 80].forEach(wy => {
      ctx.fillStyle = '#0284c7'; // Sea reflection window
      ctx.beginPath();
      ctx.arc(lhX, wy, 8, Math.PI, 0);
      ctx.lineTo(lhX + 8, wy + 16);
      ctx.lineTo(lhX - 8, wy + 16);
      ctx.closePath();
      ctx.fill();
    });

    // TIER 3: Cylindrical Lantern Room with Open Colonnade (Zylinderförmiger Laternenturm)
    const t3W = 68;
    const t3H = 55;
    const t3TopY = t2TopY - t3H;

    // Circular Balcony Gallery
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(lhX - t3W / 2 - 8, t2TopY - 8, t3W + 16, 8);
    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(lhX - t3W / 2 - 8, t2TopY - 8, t3W + 16, 8);

    // Marble Lantern Pillars
    for (let px = -t3W / 2 + 6; px <= t3W / 2 - 6; px += 14) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(lhX + px, t3TopY, 6, t3H);
    }

    // Dome / Cupola Roof
    ctx.fillStyle = '#ca8a04'; // Gilded bronze dome
    ctx.beginPath();
    ctx.arc(lhX, t3TopY, t3W / 2 + 2, Math.PI, 0);
    ctx.fill();
    ctx.strokeStyle = '#a16207';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Summit: Colossal Poseidon / Zeus Bronze Statue with Trident
    const statueY = t3TopY - t3W / 2 - 12;
    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.arc(lhX, statueY - 14, 6, 0, Math.PI * 2); // Head
    ctx.fill();
    ctx.fillRect(lhX - 5, statueY - 8, 10, 16); // Body
    // Golden Trident in Hand
    ctx.strokeStyle = '#fde047';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(lhX + 12, statueY + 8);
    ctx.lineTo(lhX + 12, statueY - 26);
    ctx.stroke();
    // Trident prongs
    ctx.beginPath();
    ctx.moveTo(lhX + 7, statueY - 22);
    ctx.lineTo(lhX + 7, statueY - 28);
    ctx.moveTo(lhX + 17, statueY - 22);
    ctx.lineTo(lhX + 17, statueY - 28);
    ctx.stroke();

    // 5. Die Lodernde Flamme & Reichender Leuchtfeuer-Lichtkegel (Blazing Beacon Fire & Sweeping Beam)
    const fireX = lhX;
    const fireY = t3TopY + 24;

    // Revolving Sweeping Lighthouse Light Beam (cuts through stormy rain sky)
    const beamAngle = Math.sin(t * 1.4) * 0.55;
    ctx.save();
    ctx.translate(fireX, fireY);
    ctx.rotate(beamAngle);

    const beamGrad = ctx.createRadialGradient(0, 0, 15, 0, 0, 950);
    beamGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
    beamGrad.addColorStop(0.15, 'rgba(254, 240, 138, 0.45)');
    beamGrad.addColorStop(0.5, 'rgba(251, 191, 36, 0.20)');
    beamGrad.addColorStop(1, 'rgba(251, 146, 60, 0)');
    ctx.fillStyle = beamGrad;
    ctx.beginPath();
    ctx.moveTo(0, -10);
    ctx.lineTo(950, -140);
    ctx.lineTo(950, 140);
    ctx.lineTo(0, 10);
    ctx.closePath();
    ctx.fill();

    // Opposite softer back-beam
    const backBeam = ctx.createRadialGradient(0, 0, 10, 0, 0, 500);
    backBeam.addColorStop(0, 'rgba(254, 240, 138, 0.35)');
    backBeam.addColorStop(1, 'rgba(254, 240, 138, 0)');
    ctx.fillStyle = backBeam;
    ctx.beginPath();
    ctx.moveTo(0, -6);
    ctx.lineTo(-500, -80);
    ctx.lineTo(-500, 80);
    ctx.lineTo(0, 6);
    ctx.closePath();
    ctx.fill();

    ctx.restore();

    // Roaring Blazing Fire Flames leaping from the brazier
    const flameFlicker = Math.sin(t * 12) * 5;
    const fireGrad = ctx.createRadialGradient(fireX, fireY, 3, fireX, fireY - 14, 28);
    fireGrad.addColorStop(0, '#ffffff');
    fireGrad.addColorStop(0.25, '#fef08a');
    fireGrad.addColorStop(0.6, '#f97316');
    fireGrad.addColorStop(0.9, '#ef4444');
    fireGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');
    ctx.fillStyle = fireGrad;
    ctx.beginPath();
    ctx.arc(fireX, fireY - 10, 24 + flameFlicker * 0.4, 0, Math.PI * 2);
    ctx.fill();

    // 6. Antike Segelschiffe im Mittelmeer (Ancient Greek & Roman Triremes)
    const drawSailingShip = (sx, sy, scale, isLeft) => {
      ctx.save();
      ctx.translate(sx, sy);
      ctx.scale(isLeft ? -scale : scale, scale);

      // Ship Hull (Holzrumpf der Galeere)
      ctx.fillStyle = '#78350f';
      ctx.beginPath();
      ctx.moveTo(-65, -8);
      ctx.quadraticCurveTo(-45, 16, 45, 14);
      ctx.lineTo(75, 4); // Battering ram bow
      ctx.lineTo(60, -8);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#451a03';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Bronze Battering Ram (Sporn)
      ctx.fillStyle = '#ca8a04';
      ctx.fillRect(65, 0, 14, 6);

      // Wooden Mast
      ctx.strokeStyle = '#92400e';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(0, 10);
      ctx.lineTo(0, -65);
      ctx.stroke();

      // Yardarm (Rah)
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(-35, -55);
      ctx.lineTo(35, -55);
      ctx.stroke();

      // Billowing Square Sail (Blähendes Rahsegel im Wind)
      const sailGrad = ctx.createLinearGradient(-30, -55, 30, -15);
      sailGrad.addColorStop(0, '#f8fafc');
      sailGrad.addColorStop(0.5, '#e2e8f0');
      sailGrad.addColorStop(1, '#dc2626'); // Red Greek victory stripes
      ctx.fillStyle = sailGrad;
      ctx.beginPath();
      ctx.moveTo(-32, -55);
      ctx.quadraticCurveTo(0, -42, 32, -55);
      ctx.quadraticCurveTo(12, -18, 30, -14);
      ctx.quadraticCurveTo(0, -18, -30, -14);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Oars (Ruderbänke dipping into the waves)
      ctx.strokeStyle = '#b45309';
      ctx.lineWidth = 1.5;
      for (let ox = -40; ox <= 35; ox += 12) {
        const oDip = Math.sin(t * 4 + ox) * 4;
        ctx.beginPath();
        ctx.moveTo(ox, 8);
        ctx.lineTo(ox - 10, 20 + oDip);
        ctx.stroke();
      }

      ctx.restore();
    };

    // Draw Sailing Ships at various depths on the Mediterranean
    drawSailingShip(480, height * 0.70, 0.95, false); // Galleon on the left
    drawSailingShip(1880, height * 0.67, 0.85, true); // Galleon on the right
    drawSailingShip(width * 0.18, height * 0.61, 0.55, false); // Distant ship

    ctx.restore();
  }

  _renderColossusRhodes(ctx, width, height, t) {
    ctx.save();

    // 1. Radiant Aegean Sunlit Sky & Blazing Sun
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#0284c7');
    sky.addColorStop(0.28, '#38bdf8');
    sky.addColorStop(0.55, '#fde047');
    sky.addColorStop(0.72, '#f97316');
    sky.addColorStop(1, '#c2410c');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    // Blazing Golden Sun directly behind the Colossus Head (Centered at x: 1200)
    const sunX = width * 0.50;
    const sunY = height * 0.22;
    const sunGlow = ctx.createRadialGradient(sunX, sunY, 15, sunX, sunY, 240);
    sunGlow.addColorStop(0, '#ffffff');
    sunGlow.addColorStop(0.2, '#fef08a');
    sunGlow.addColorStop(0.55, 'rgba(251, 191, 36, 0.45)');
    sunGlow.addColorStop(1, 'rgba(251, 146, 60, 0)');
    ctx.fillStyle = sunGlow;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 240, 0, Math.PI * 2);
    ctx.fill();

    // 2. Distant Rhodian Coastline & Acropolis of Rhodes
    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.55);
    ctx.bezierCurveTo(width * 0.25, height * 0.52, width * 0.4, height * 0.57, width * 0.45, height * 0.58);
    ctx.lineTo(0, height * 0.58);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(width * 0.55, height * 0.58);
    ctx.bezierCurveTo(width * 0.65, height * 0.55, width * 0.82, height * 0.53, width, height * 0.56);
    ctx.lineTo(width, height * 0.58);
    ctx.closePath();
    ctx.fill();

    // 3. Turquoise & Azure Mandraki Harbor Water (Mittelmeer-Hafenwasser)
    const seaY = height * 0.58;
    const seaGrad = ctx.createLinearGradient(0, seaY, 0, height);
    seaGrad.addColorStop(0, '#0284c7');
    seaGrad.addColorStop(0.3, '#06b6d4');
    seaGrad.addColorStop(0.65, '#0284c7');
    seaGrad.addColorStop(1, '#0c4a6e');
    ctx.fillStyle = seaGrad;
    ctx.fillRect(0, seaY, width, height - seaY);

    // Sun reflection path on water
    const sunRefl = ctx.createLinearGradient(sunX - 160, 0, sunX + 160, 0);
    sunRefl.addColorStop(0, 'rgba(254, 240, 138, 0)');
    sunRefl.addColorStop(0.5, 'rgba(254, 240, 138, 0.35)');
    sunRefl.addColorStop(1, 'rgba(254, 240, 138, 0)');
    ctx.fillStyle = sunRefl;
    ctx.fillRect(sunX - 160, seaY, 320, height - seaY);

    // Gentle Harbor Water Shimmer Waves
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 1.5;
    for (let sw = 0; sw < 5; sw++) {
      const swY = seaY + 25 + sw * 38;
      ctx.beginPath();
      for (let x = 0; x <= width; x += 70) {
        const wav = Math.sin((x + t * 20) * 0.02 + sw) * 3.5;
        if (x === 0) ctx.moveTo(x, swY + wav);
        else ctx.lineTo(x, swY + wav);
      }
      ctx.stroke();
    }

    // 4. Two Great Stone Harbor Moles / Piers (Die beiden Hafenmolen)
    const pierY = height * 0.62;
    const leftPierX = sunX - 320; // 880
    const rightPierX = sunX + 320; // 1520
    const pierW = 160;

    // Left Harbor Pier (Molo)
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(leftPierX - pierW / 2, pierY, pierW, height - pierY);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(leftPierX - pierW / 2, pierY, pierW, height - pierY);
    // Stone Blocks
    for (let py = pierY + 24; py < height; py += 24) {
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(leftPierX - pierW / 2, py);
      ctx.lineTo(leftPierX + pierW / 2, py);
      ctx.stroke();
    }

    // Right Harbor Pier (Molo)
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(rightPierX - pierW / 2, pierY, pierW, height - pierY);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(rightPierX - pierW / 2, pierY, pierW, height - pierY);
    for (let py = pierY + 24; py < height; py += 24) {
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(rightPierX - pierW / 2, py);
      ctx.lineTo(rightPierX + pierW / 2, py);
      ctx.stroke();
    }

    // 5. The Gigantic Bronze Colossus of Rhodes (Sonnengott Helios) Straddling the Harbor
    const colX = sunX; // 1200
    const hipY = height * 0.46;
    const footLeftX = leftPierX;
    const footRightX = rightPierX;
    const footY = pierY;

    // Bronze Shading Gradient
    const bronzeGrad = ctx.createLinearGradient(colX - 120, 0, colX + 120, 0);
    bronzeGrad.addColorStop(0, '#78350f');
    bronzeGrad.addColorStop(0.25, '#d97706');
    bronzeGrad.addColorStop(0.6, '#f59e0b');
    bronzeGrad.addColorStop(0.85, '#b45309');
    bronzeGrad.addColorStop(1, '#451a03');

    // A. Left Colossal Striding Leg (gespreizte Beine über der Hafeneinfahrt)
    ctx.fillStyle = bronzeGrad;
    ctx.beginPath();
    ctx.moveTo(colX - 45, hipY);
    ctx.lineTo(footLeftX + 22, footY); // Inner leg
    ctx.lineTo(footLeftX - 32, footY); // Foot outer
    ctx.lineTo(colX - 95, hipY - 20); // Outer hip
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 3;
    ctx.stroke();

    // B. Right Colossal Striding Leg
    ctx.fillStyle = bronzeGrad;
    ctx.beginPath();
    ctx.moveTo(colX + 45, hipY);
    ctx.lineTo(footRightX - 22, footY); // Inner leg
    ctx.lineTo(footRightX + 32, footY); // Foot outer
    ctx.lineTo(colX + 95, hipY - 20); // Outer hip
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Colossal Bronze Sandals & Greaves
    [-footLeftX, footRightX].forEach(fx => {
      const realFx = fx < 0 ? -fx : fx;
      ctx.fillStyle = '#92400e';
      ctx.fillRect(realFx - 34, footY - 14, 68, 14);
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 2;
      ctx.strokeRect(realFx - 34, footY - 14, 68, 14);
    });

    // C. Muscular Bronze Torso & Chlamys (Griechisches Gewand)
    const torsoTopY = height * 0.28;
    ctx.fillStyle = bronzeGrad;
    ctx.beginPath();
    ctx.moveTo(colX - 75, torsoTopY);
    ctx.lineTo(colX + 75, torsoTopY);
    ctx.lineTo(colX + 60, hipY);
    ctx.lineTo(colX - 60, hipY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draped Cloak / Chlamys blowing in the wind
    ctx.fillStyle = '#dc2626'; // Crimson Greek mantle
    ctx.beginPath();
    ctx.moveTo(colX - 75, torsoTopY);
    ctx.quadraticCurveTo(colX - 140, hipY, colX - 175, height * 0.58);
    ctx.lineTo(colX - 120, height * 0.59);
    ctx.quadraticCurveTo(colX - 90, hipY, colX - 60, torsoTopY + 20);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#991b1b';
    ctx.lineWidth = 2;
    ctx.stroke();

    // D. Left Arm resting on Hip / Holding Spear
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 22;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(colX - 75, torsoTopY + 15);
    ctx.lineTo(colX - 110, torsoTopY + 70);
    ctx.lineTo(colX - 65, hipY - 15);
    ctx.stroke();

    // E. Right Arm Raised Holding High the Flaming Torch (x: colX + 170, y: height * 0.16)
    const torchX = colX + 180;
    const torchY = height * 0.16;

    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 22;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(colX + 75, torsoTopY + 15);
    ctx.lineTo(colX + 130, torsoTopY - 20);
    ctx.lineTo(torchX, torchY + 18);
    ctx.stroke();

    // Bronze Torch Handle & Bowl (Fackel)
    ctx.fillStyle = '#d97706';
    ctx.fillRect(torchX - 8, torchY - 15, 16, 40);
    ctx.beginPath();
    ctx.arc(torchX, torchY - 15, 24, Math.PI, 0); // Torch bowl
    ctx.fill();
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Roaring Blazing Torch Flame (Lodernde Flamme)
    const torchFlameH = 48 + Math.sin(t * 11) * 8;
    const torchGrad = ctx.createRadialGradient(torchX, torchY - 25, 4, torchX, torchY - 25, torchFlameH);
    torchGrad.addColorStop(0, '#ffffff');
    torchGrad.addColorStop(0.25, '#fef08a');
    torchGrad.addColorStop(0.6, '#f97316');
    torchGrad.addColorStop(0.9, '#ef4444');
    torchGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');
    ctx.fillStyle = torchGrad;
    ctx.beginPath();
    ctx.moveTo(torchX - 22, torchY - 20);
    ctx.quadraticCurveTo(torchX - 10, torchY - 25 - torchFlameH * 0.6, torchX + Math.sin(t * 9) * 8, torchY - 25 - torchFlameH);
    ctx.quadraticCurveTo(torchX + 10, torchY - 25 - torchFlameH * 0.6, torchX + 22, torchY - 20);
    ctx.closePath();
    ctx.fill();

    // F. Head of the Sun God Helios & Radiated Sun Diadem (Sonnendiadem)
    const headX = colX;
    const headY = torsoTopY - 32;

    // Bronze Head & Features
    ctx.fillStyle = '#d97706';
    ctx.beginPath();
    ctx.arc(headX, headY, 32, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Flowing Golden Bronze Curls
    ctx.fillStyle = '#f59e0b';
    for (let c = -28; c <= 28; c += 14) {
      ctx.beginPath();
      ctx.arc(headX + c, headY + 12, 10, 0, Math.PI * 2);
      ctx.fill();
    }

    // 7 Radiant Solar Ray Spikes (Das Helios-Sonnendiadem)
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    for (let s = 0; s < 7; s++) {
      const sAngle = -Math.PI * 0.85 + (s * Math.PI * 0.70) / 6;
      const sInner = 36;
      const sOuter = 82 + (s % 2 === 0 ? 12 : 0);
      ctx.beginPath();
      ctx.moveTo(headX + Math.cos(sAngle) * sInner, headY + Math.sin(sAngle) * sInner);
      ctx.lineTo(headX + Math.cos(sAngle) * sOuter, headY + Math.sin(sAngle) * sOuter);
      ctx.stroke();
    }

    // 6. Kleine Boote fahren unten durch die Hafeneinfahrt (Little Boats Passing Under the Legs)
    const drawHarborBoat = (bx, by, scale, flip) => {
      ctx.save();
      ctx.translate(bx, by);
      ctx.scale(flip ? -scale : scale, scale);

      // Wooden Boat Hull
      ctx.fillStyle = '#854d0e';
      ctx.beginPath();
      ctx.moveTo(-45, -6);
      ctx.quadraticCurveTo(-30, 16, 35, 14);
      ctx.lineTo(52, 2);
      ctx.lineTo(40, -6);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#451a03';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Mast & Rigging
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(5, 5);
      ctx.lineTo(5, -45);
      ctx.stroke();

      // Billowing Lateen/Square Sail
      ctx.fillStyle = flip ? '#fef08a' : '#ffffff';
      ctx.beginPath();
      ctx.moveTo(5, -42);
      ctx.quadraticCurveTo(28, -25, 25, -5);
      ctx.lineTo(5, -10);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.restore();
    };

    // Boat 1: Sailing right underneath the Colossus legs (x: 1200)
    const boat1Y = height * 0.73 + Math.sin(t * 3) * 4;
    drawHarborBoat(colX - 30, boat1Y, 0.85, false);

    // Boat 2: Sailing into the harbor on the left
    const boat2Y = height * 0.69 + Math.sin(t * 2.5 + 1) * 3;
    drawHarborBoat(colX - 380, boat2Y, 0.70, false);

    ctx.restore();
  }

  _renderMausoleumHalicarnassus(ctx, width, height, t) {
    ctx.save();

    // 1. Dramatischer Abendhimmel (Dramatic Evening Dusk / Sunset Sky)
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.72);
    skyGrad.addColorStop(0, '#111827');      // Deep Nightfall / Midnight Navy
    skyGrad.addColorStop(0.18, '#1e1b4b');   // Deep Indigo
    skyGrad.addColorStop(0.35, '#3b0764');   // Royal Purple
    skyGrad.addColorStop(0.50, '#701a75');   // Magenta Crimson
    skyGrad.addColorStop(0.66, '#c2410c');   // Fiery Amber
    skyGrad.addColorStop(0.82, '#f59e0b');   // Golden Sunset Glow
    skyGrad.addColorStop(1.0, '#fef08a');    // Horizon Yellow
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // Rising Evening Stars in upper indigo sky
    ctx.save();
    const starCoords = [
      [220, 65], [450, 40], [780, 85], [1050, 50], [1380, 75],
      [1620, 45], [1890, 80], [2150, 60], [310, 110], [920, 120],
      [1500, 115], [2280, 105], [600, 140], [1750, 135]
    ];
    for (let i = 0; i < starCoords.length; i++) {
      const [sx, sy] = starCoords[i];
      const starPulse = (Math.sin(t * 2.5 + i * 1.3) + 1) * 0.5;
      ctx.globalAlpha = 0.35 + starPulse * 0.55;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(sx, sy, 1.2 + starPulse * 1.0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Dramatic Glowing Evening Sunset Clouds with warm edges
    ctx.save();
    const clouds = [
      { x: 380, y: height * 0.22, w: 520, h: 70, c1: 'rgba(88, 28, 135, 0.45)', c2: 'rgba(234, 88, 12, 0.5)' },
      { x: 1020, y: height * 0.16, w: 680, h: 85, c1: 'rgba(112, 26, 117, 0.40)', c2: 'rgba(245, 158, 11, 0.45)' },
      { x: 1780, y: height * 0.24, w: 580, h: 75, c1: 'rgba(76, 29, 149, 0.42)', c2: 'rgba(234, 88, 12, 0.48)' },
      { x: 150, y: height * 0.32, w: 450, h: 60, c1: 'rgba(157, 23, 77, 0.38)', c2: 'rgba(251, 191, 36, 0.42)' },
      { x: 1350, y: height * 0.34, w: 620, h: 65, c1: 'rgba(131, 24, 67, 0.35)', c2: 'rgba(251, 146, 60, 0.40)' }
    ];
    for (let c of clouds) {
      const driftX = (c.x + Math.sin(t * 0.4 + c.y) * 20);
      const cGrad = ctx.createRadialGradient(driftX, c.y, c.h * 0.2, driftX, c.y, c.w * 0.5);
      cGrad.addColorStop(0, c.c2);
      cGrad.addColorStop(0.7, c.c1);
      cGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = cGrad;
      ctx.beginPath();
      ctx.ellipse(driftX, c.y, c.w * 0.5, c.h * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // 2. Distant Hills of Caria / Halicarnassus Bay (Ägäische Küstenberge)
    ctx.save();
    // Far Ridge
    ctx.fillStyle = '#4c1d95';
    ctx.globalAlpha = 0.55;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.62);
    ctx.bezierCurveTo(400, height * 0.54, 800, height * 0.58, 1200, height * 0.55);
    ctx.bezierCurveTo(1600, height * 0.52, 2000, height * 0.57, width, height * 0.60);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Near Ridge with cypress silhouettes
    ctx.fillStyle = '#2e1065';
    ctx.globalAlpha = 0.85;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.67);
    ctx.bezierCurveTo(350, height * 0.60, 750, height * 0.64, 1150, height * 0.61);
    ctx.bezierCurveTo(1550, height * 0.59, 1950, height * 0.63, width, height * 0.65);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Silhouetted Ancient Cypresses on the Hillsides
    ctx.save();
    ctx.fillStyle = '#1e1138';
    const cypresses = [
      { x: 120, y: height * 0.66, h: 55, w: 12 },
      { x: 160, y: height * 0.65, h: 70, w: 14 },
      { x: 280, y: height * 0.64, h: 48, w: 10 },
      { x: 420, y: height * 0.62, h: 52, w: 11 },
      { x: 1980, y: height * 0.63, h: 58, w: 12 },
      { x: 2120, y: height * 0.64, h: 74, w: 15 },
      { x: 2260, y: height * 0.66, h: 50, w: 11 }
    ];
    for (let c of cypresses) {
      ctx.beginPath();
      ctx.ellipse(c.x, c.y - c.h * 0.5, c.w * 0.5, c.h * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // 3. Grand Terraced Marble Plaza (Terrassen-Vorplatz von Halikarnassos)
    const plazaY = height * 0.68;
    const plazaGrad = ctx.createLinearGradient(0, plazaY, 0, height);
    plazaGrad.addColorStop(0, '#334155');      // Slate marble edge
    plazaGrad.addColorStop(0.35, '#475569');   // Polished stone
    plazaGrad.addColorStop(0.7, '#1e293b');    // Deep evening stone
    plazaGrad.addColorStop(1.0, '#0f172a');
    ctx.fillStyle = plazaGrad;
    ctx.fillRect(0, plazaY, width, height - plazaY);

    // Stone tile perspective lines
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1.5;
    for (let x = -200; x <= width + 200; x += 140) {
      ctx.beginPath();
      ctx.moveTo(x, plazaY);
      ctx.lineTo(x + (x - width * 0.5) * 0.7, height);
      ctx.stroke();
    }
    for (let y = plazaY; y <= height; y += 45) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    ctx.restore();

    // 4. DAS MAUSOLEUM VON HALIKARNASSOS (Das prachtvolle weiße Grabmal)
    const mX = 1200; // Centered monument

    // Level A: Monumental Stepped Marble Podium / Basement (Stufen-Podium)
    // Step layers ascending from plaza
    const podW = 780;
    const podTopY = height * 0.54;
    const podBotY = height * 0.69;

    // Outer Podium Shadow
    ctx.fillStyle = 'rgba(15, 23, 42, 0.65)';
    ctx.fillRect(mX - podW * 0.5 - 20, podBotY, podW + 40, 25);

    // Stepped Marble Base (3 broad steps)
    const baseStepColors = ['#cbd5e1', '#e2e8f0', '#f1f5f9'];
    for (let s = 0; s < 3; s++) {
      const stepY = podBotY - s * 14;
      const stepW = podW + 30 - s * 20;
      ctx.fillStyle = baseStepColors[s];
      ctx.fillRect(mX - stepW * 0.5, stepY, stepW, 14);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(mX - stepW * 0.5, stepY + 11, stepW, 3);
    }

    // High Marble Podium Wall (Substructure)
    const wallY = podTopY + 22;
    const wallH = podBotY - 42 - wallY;
    const podWallGrad = ctx.createLinearGradient(mX - podW * 0.5, 0, mX + podW * 0.5, 0);
    podWallGrad.addColorStop(0, '#94a3b8');      // Left marble shading
    podWallGrad.addColorStop(0.15, '#e2e8f0');
    podWallGrad.addColorStop(0.5, '#f8fafc');   // Center brilliant white marble
    podWallGrad.addColorStop(0.85, '#e2e8f0');
    podWallGrad.addColorStop(1.0, '#cbd5e1');   // Right shading
    ctx.fillStyle = podWallGrad;
    ctx.fillRect(mX - podW * 0.46, wallY, podW * 0.92, wallH);

    // ==========================================
    // EASTER EGG #2: Amazonen-Relieffries (+5300)
    // Famous sculpted frieze running around the podium (Amazonomachy)
    // ==========================================
    const friezeY = height * 0.58;
    const friezeH = 34;
    ctx.save();
    // Frieze Marble Background
    const friezeGrad = ctx.createLinearGradient(0, friezeY - friezeH * 0.5, 0, friezeY + friezeH * 0.5);
    friezeGrad.addColorStop(0, '#64748b');
    friezeGrad.addColorStop(0.5, '#e2e8f0');
    friezeGrad.addColorStop(1, '#94a3b8');
    ctx.fillStyle = friezeGrad;
    ctx.fillRect(mX - podW * 0.44, friezeY - friezeH * 0.5, podW * 0.88, friezeH);

    // Relief border mouldings (egg-and-dart style bands)
    ctx.strokeStyle = '#f8fafc';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(mX - podW * 0.44, friezeY - friezeH * 0.5, podW * 0.88, friezeH);

    // Carved Relieffries Figures (Greeks vs. Amazons in heroic battle stances)
    ctx.fillStyle = '#475569';
    for (let rx = mX - podW * 0.42; rx < mX + podW * 0.42; rx += 38) {
      // Warrior / Amazon Torso
      ctx.beginPath();
      ctx.ellipse(rx, friezeY, 4.5, 9, 0.25, 0, Math.PI * 2);
      ctx.fill();
      // Helmet / Head
      ctx.beginPath();
      ctx.arc(rx, friezeY - 11, 4, 0, Math.PI * 2);
      ctx.fill();
      // Round Greek Shield (Aspis)
      ctx.beginPath();
      ctx.arc(rx - 7, friezeY - 1, 6.5, 0, Math.PI * 2);
      ctx.fill();
      // Spear / Sword line
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(rx - 9, friezeY - 12);
      ctx.lineTo(rx + 11, friezeY + 10);
      ctx.stroke();
    }
    // Golden Glow on Amazonen-Fries
    const friezeGlow = (Math.sin(t * 3.2) + 1) * 0.5;
    ctx.fillStyle = `rgba(254, 240, 138, ${0.12 + friezeGlow * 0.18})`;
    ctx.fillRect(mX - podW * 0.44, friezeY - friezeH * 0.5, podW * 0.88, friezeH);
    ctx.restore();

    // Carved Guardian Lions along the podium terrace
    ctx.save();
    const lionPositions = [mX - 310, mX - 180, mX + 180, mX + 310];
    for (let lx of lionPositions) {
      // Pedestal
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(lx - 16, wallY - 6, 32, 10);
      // Marble Lion Body
      ctx.fillStyle = '#f1f5f9';
      ctx.beginPath();
      ctx.ellipse(lx, wallY - 14, 14, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      // Lion Head & Mane
      ctx.beginPath();
      ctx.arc(lx + (lx < mX ? 10 : -10), wallY - 18, 7, 0, Math.PI * 2);
      ctx.fill();
      // Lion Details / Highlight
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(lx - 4, wallY - 16, 8, 3);
    }
    ctx.restore();

    // Level B: Colonnade of 36 Ionic Marble Columns (Pteron / Säulenhalle)
    const colY = height * 0.38;
    const colH = podTopY - colY;
    const colW = podW * 0.78;

    // Cella Wall (Interior sanctuary in background)
    const cellaGrad = ctx.createLinearGradient(0, colY, 0, colY + colH);
    cellaGrad.addColorStop(0, '#1e293b');
    cellaGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = cellaGrad;
    ctx.fillRect(mX - colW * 0.44, colY + 12, colW * 0.88, colH - 12);

    // ==========================================
    // EASTER EGG #3: Mausolos-Marmorstatue (+4900)
    // Majestic white marble statue of King Mausolos in royal mantle (x: 880, y: height * 0.48)
    // And flanking statues of Artemisia and royal dynasts
    // ==========================================
    const drawMausolosStatue = (stX, stY, isKing) => {
      ctx.save();
      // Pedestal
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(stX - 14, stY + 28, 28, 12);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.2;
      ctx.strokeRect(stX - 14, stY + 28, 28, 12);

      // Royal Robe / Himation drapery (White Pentelic Marble)
      const robeGrad = ctx.createLinearGradient(stX - 12, stY, stX + 12, stY);
      robeGrad.addColorStop(0, '#cbd5e1');
      robeGrad.addColorStop(0.4, '#ffffff');
      robeGrad.addColorStop(1, '#e2e8f0');
      ctx.fillStyle = robeGrad;

      // Body & flowing folds
      ctx.beginPath();
      ctx.moveTo(stX - 11, stY + 28);
      ctx.lineTo(stX - 8, stY - 15);
      ctx.lineTo(stX + 8, stY - 15);
      ctx.lineTo(stX + 12, stY + 28);
      ctx.closePath();
      ctx.fill();

      // Fold lines in marble
      ctx.strokeStyle = 'rgba(71, 85, 105, 0.45)';
      ctx.lineWidth = 1.2;
      for (let f = -6; f <= 8; f += 4) {
        ctx.beginPath();
        ctx.moveTo(stX + f * 0.4, stY - 12);
        ctx.lineTo(stX + f, stY + 26);
        ctx.stroke();
      }

      // Royal Head with Carian long hair / royal diadem
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.arc(stX, stY - 24, 7.5, 0, Math.PI * 2);
      ctx.fill();
      if (isKing) {
        // Golden King's Diadem / Wreath
        ctx.fillStyle = '#facc15';
        ctx.fillRect(stX - 7, stY - 27, 14, 3);
        // Sceptre in hand
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(stX + 11, stY - 20);
        ctx.lineTo(stX + 11, stY + 26);
        ctx.stroke();

        // Pulsing divine aura on King Mausolos
        const aura = (Math.sin(t * 3.6) + 1) * 0.5;
        ctx.strokeStyle = `rgba(255, 215, 0, ${0.35 + aura * 0.45})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(stX, stY - 6, 36, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
    };

    // King Mausolos Statue at x: 880 (exact easter egg coordinate)
    drawMausolosStatue(880, height * 0.48, true);
    // Queen Artemisia Statue at x: 1520
    drawMausolosStatue(1520, height * 0.48, false);

    // 10 Monumental Ionic Fluted Columns in front
    const numCols = 10;
    const colSpacing = (colW * 0.94) / (numCols - 1);
    for (let c = 0; c < numCols; c++) {
      const cx = mX - (colW * 0.47) + c * colSpacing;

      // Column Base (Attic base)
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(cx - 11, podTopY - 7, 22, 7);

      // Fluted Shaft (White Marble with 3D gradient)
      const colShaftGrad = ctx.createLinearGradient(cx - 8, 0, cx + 8, 0);
      colShaftGrad.addColorStop(0, '#94a3b8');
      colShaftGrad.addColorStop(0.2, '#f1f5f9');
      colShaftGrad.addColorStop(0.5, '#ffffff');
      colShaftGrad.addColorStop(0.8, '#f1f5f9');
      colShaftGrad.addColorStop(1.0, '#cbd5e1');
      ctx.fillStyle = colShaftGrad;
      ctx.fillRect(cx - 8, colY + 14, 16, colH - 21);

      // Vertical flute lines
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.35)';
      ctx.lineWidth = 1;
      for (let fl = -5; fl <= 5; fl += 3.5) {
        ctx.beginPath();
        ctx.moveTo(cx + fl, colY + 15);
        ctx.lineTo(cx + fl, podTopY - 8);
        ctx.stroke();
      }

      // Ionic Capital (Volutes / Scrolls)
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(cx - 13, colY + 8, 26, 6);
      // Left and right volute spirals
      ctx.fillStyle = '#e2e8f0';
      ctx.beginPath();
      ctx.arc(cx - 10, colY + 11, 4.5, 0, Math.PI * 2);
      ctx.arc(cx + 10, colY + 11, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Classical Entablature (Architrave, Dentil Frieze, Cornice)
    const entY = colY;
    const entH = 22;
    const entGrad = ctx.createLinearGradient(0, entY - entH, 0, entY);
    entGrad.addColorStop(0, '#f8fafc');
    entGrad.addColorStop(0.6, '#e2e8f0');
    entGrad.addColorStop(1.0, '#cbd5e1');
    ctx.fillStyle = entGrad;
    ctx.fillRect(mX - colW * 0.52, entY - entH, colW * 1.04, entH);

    // Dentil blocks along the cornice
    ctx.fillStyle = '#94a3b8';
    for (let d = mX - colW * 0.51; d < mX + colW * 0.51; d += 14) {
      ctx.fillRect(d, entY - 7, 7, 5);
    }
    // Gilded moulding highlight
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(mX - colW * 0.52, entY - entH, colW * 1.04, 3);

    // Level C: Die stufenförmige Pyramidenkrone (24-Step Truncated Marble Pyramid Roof)
    const pyrBotY = entY - entH;
    const pyrTopY = height * 0.23;
    const pyrSteps = 24;
    const pyrStepH = (pyrBotY - pyrTopY) / pyrSteps;
    const pyrBaseW = colW * 1.02;
    const pyrTopW = 160;

    for (let s = 0; s < pyrSteps; s++) {
      const stepProg = s / pyrSteps;
      const stepY = pyrBotY - (s + 1) * pyrStepH;
      const stepW = pyrBaseW * (1 - stepProg) + pyrTopW * stepProg;

      // Marble Step with Sunset Light & Shadows
      const stepGrad = ctx.createLinearGradient(mX - stepW * 0.5, 0, mX + stepW * 0.5, 0);
      stepGrad.addColorStop(0, '#cbd5e1');
      stepGrad.addColorStop(0.2, '#f8fafc');
      stepGrad.addColorStop(0.5, '#ffffff');
      stepGrad.addColorStop(0.8, '#e2e8f0');
      stepGrad.addColorStop(1.0, '#94a3b8');

      ctx.fillStyle = stepGrad;
      ctx.fillRect(mX - stepW * 0.5, stepY, stepW, pyrStepH + 0.8);

      // Step riser shadow line
      ctx.fillStyle = 'rgba(30, 41, 59, 0.25)';
      ctx.fillRect(mX - stepW * 0.5, stepY + pyrStepH - 1.2, stepW, 1.2);
    }

    // Flat Pedestal at the apex of the Pyramid
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(mX - 85, pyrTopY - 8, 170, 8);
    ctx.fillStyle = '#facc15'; // Golden border
    ctx.fillRect(mX - 85, pyrTopY - 9, 170, 2);

    // ==========================================
    // EASTER EGG #1: Pyramiden-Quadriga von Mausolos (+5800)
    // The famous colossal four-horse chariot with Mausolos & Artemisia crowning the tomb
    // (x: 1200, y: height * 0.22)
    // ==========================================
    ctx.save();
    const qX = mX;
    const qY = pyrTopY - 9;

    // Glowing halo on Quadriga
    const qPulse = (Math.sin(t * 3.8) + 1) * 0.5;
    const qAuraGrad = ctx.createRadialGradient(qX, qY - 25, 10, qX, qY - 25, 75);
    qAuraGrad.addColorStop(0, `rgba(254, 240, 138, ${0.45 + qPulse * 0.35})`);
    qAuraGrad.addColorStop(0.6, `rgba(245, 158, 11, ${0.20 + qPulse * 0.15})`);
    qAuraGrad.addColorStop(1.0, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = qAuraGrad;
    ctx.beginPath();
    ctx.arc(qX, qY - 25, 75, 0, Math.PI * 2);
    ctx.fill();

    // 1. The Royal Chariot (Marmor-Streitwagen)
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.moveTo(qX - 35, qY);
    ctx.lineTo(qX - 30, qY - 26);
    ctx.lineTo(qX + 30, qY - 26);
    ctx.lineTo(qX + 35, qY);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Chariot Big Wheels
    ctx.fillStyle = '#ffd700';
    ctx.beginPath();
    ctx.arc(qX - 28, qY - 4, 11, 0, Math.PI * 2);
    ctx.arc(qX + 28, qY - 4, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(qX - 28, qY - 4, 6, 0, Math.PI * 2);
    ctx.arc(qX + 28, qY - 4, 6, 0, Math.PI * 2);
    ctx.fill();

    // 2. Colossal Statues of Mausolos and Artemisia standing in the chariot
    // King Mausolos
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(qX - 7, qY - 32, 6.5, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(qX - 7, qY - 46, 5.5, 0, Math.PI * 2);
    ctx.fill();
    // Golden crown
    ctx.fillStyle = '#facc15';
    ctx.fillRect(qX - 11, qY - 50, 8, 3);

    // Queen Artemisia
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(qX + 8, qY - 30, 6, 13, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(qX + 8, qY - 44, 5, 0, Math.PI * 2);
    ctx.fill();
    // Veil / Tiara
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(qX + 5, qY - 48, 7, 2.5);

    // 3. The Four Noble Marble Steeds (Quadriga-Pferde im Galopp)
    const horseOffsets = [-48, -20, 20, 48];
    for (let i = 0; i < horseOffsets.length; i++) {
      const hx = qX + horseOffsets[i];
      const hPrancing = Math.sin(t * 3.5 + i * 1.2) * 2;

      // Horse Body (White Carrara / Halicarnassus Marble)
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(hx, qY - 18 + hPrancing, 11, 7, (hx < qX ? -0.2 : 0.2), 0, Math.PI * 2);
      ctx.fill();

      // Horse Arched Neck & Head
      ctx.beginPath();
      ctx.ellipse(hx + (hx < qX ? -11 : 11), qY - 26 + hPrancing, 6, 12, (hx < qX ? -0.4 : 0.4), 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(hx + (hx < qX ? -16 : 16), qY - 35 + hPrancing, 5, 0, Math.PI * 2);
      ctx.fill();

      // Prancing Forelegs
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(hx + (hx < qX ? -8 : 8), qY - 14 + hPrancing);
      ctx.lineTo(hx + (hx < qX ? -15 : 15), qY - 5);
      ctx.lineTo(hx + (hx < qX ? -12 : 12), qY);
      ctx.stroke();

      // Golden Harness & Reins
      ctx.strokeStyle = 'rgba(250, 204, 21, 0.85)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(qX, qY - 32);
      ctx.lineTo(hx + (hx < qX ? -14 : 14), qY - 33 + hPrancing);
      ctx.stroke();
    }
    ctx.restore();

    // 5. Flanking Antique Bronze / Marble Braziers with Flickering Fire
    const drawCeremonialBrazier = (bx, by) => {
      ctx.save();
      // Stone Tripod Base
      ctx.fillStyle = '#475569';
      ctx.fillRect(bx - 18, by, 36, 12);
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(bx - 14, by - 24, 28, 24);

      // Bronze Bowl
      ctx.fillStyle = '#b45309';
      ctx.beginPath();
      ctx.ellipse(bx, by - 24, 24, 9, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Flickering Ritual Flame
      const flameH = 26 + Math.sin(t * 12 + bx) * 6;
      const fGrad = ctx.createRadialGradient(bx, by - 28, 4, bx, by - 32, flameH);
      fGrad.addColorStop(0, '#ffffff');
      fGrad.addColorStop(0.3, '#fef08a');
      fGrad.addColorStop(0.6, '#ea580c');
      fGrad.addColorStop(1.0, 'rgba(239, 68, 68, 0)');
      ctx.fillStyle = fGrad;
      ctx.beginPath();
      ctx.moveTo(bx - 14, by - 26);
      ctx.quadraticCurveTo(bx - 6, by - 26 - flameH, bx + Math.sin(t * 8) * 3, by - 26 - flameH);
      ctx.quadraticCurveTo(bx + 6, by - 26 - flameH * 0.6, bx + 14, by - 26);
      ctx.closePath();
      ctx.fill();

      // Smoke Wisps
      ctx.strokeStyle = 'rgba(203, 213, 225, 0.22)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(bx, by - 26 - flameH);
      ctx.bezierCurveTo(bx - 15, by - 50 - flameH, bx + 15, by - 75 - flameH, bx - 8, by - 100 - flameH);
      ctx.stroke();

      ctx.restore();
    };

    // Flanking Braziers illuminating the grand marble steps
    drawCeremonialBrazier(mX - 440, plazaY + 14);
    drawCeremonialBrazier(mX + 440, plazaY + 14);

    ctx.restore();
  }

  _renderArtemisTempleEphesus(ctx, width, height, t) {
    ctx.save();

    // 1. Heiliger ionischer Abendhimmel (Sacred Twilight Sky of Ephesus)
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.68);
    skyGrad.addColorStop(0, '#0c1222');      // Deep Celestial Midnight
    skyGrad.addColorStop(0.20, '#1e1b4b');   // Royal Indigo
    skyGrad.addColorStop(0.42, '#312e81');   // Ephesian Twilight
    skyGrad.addColorStop(0.62, '#4c1d95');   // Mystic Purple
    skyGrad.addColorStop(0.80, '#9a3412');   // Warm Sunset Amber
    skyGrad.addColorStop(1.0, '#fef08a');    // Sacred Golden Horizon
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // Sacred Crescent Moon of Artemis in the upper twilight sky
    ctx.save();
    const moonX = 360;
    const moonY = 95;
    const moonPulse = (Math.sin(t * 2.0) + 1) * 0.5;
    // Lunar divine halo
    const moonHalo = ctx.createRadialGradient(moonX, moonY, 15, moonX, moonY, 70);
    moonHalo.addColorStop(0, `rgba(254, 240, 138, ${0.4 + moonPulse * 0.25})`);
    moonHalo.addColorStop(0.6, `rgba(254, 249, 195, ${0.15 + moonPulse * 0.1})`);
    moonHalo.addColorStop(1.0, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = moonHalo;
    ctx.beginPath();
    ctx.arc(moonX, moonY, 70, 0, Math.PI * 2);
    ctx.fill();

    // Crescent Moon shape
    ctx.fillStyle = '#fef9c3';
    ctx.beginPath();
    ctx.arc(moonX, moonY, 22, -Math.PI * 0.35, Math.PI * 0.65);
    ctx.bezierCurveTo(moonX + 16, moonY + 4, moonX + 14, moonY - 14, moonX + 6, moonY - 20);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Twinkling Sacred Stars
    ctx.save();
    const stars = [
      [140, 50], [520, 65], [780, 40], [1020, 80], [1320, 55],
      [1580, 45], [1820, 75], [2100, 60], [2320, 85], [260, 115],
      [890, 110], [1460, 105], [1980, 115], [1200, 70]
    ];
    for (let i = 0; i < stars.length; i++) {
      const [sx, sy] = stars[i];
      const sp = (Math.sin(t * 3.0 + i * 1.5) + 1) * 0.5;
      ctx.globalAlpha = 0.35 + sp * 0.6;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(sx, sy, 1.2 + sp * 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Sacred Sunset Clouds floating over Mount Pion
    ctx.save();
    const clouds = [
      { x: 480, y: height * 0.20, w: 580, h: 75, c: 'rgba(124, 45, 18, 0.42)' },
      { x: 1180, y: height * 0.16, w: 720, h: 85, c: 'rgba(154, 52, 18, 0.45)' },
      { x: 1920, y: height * 0.22, w: 560, h: 70, c: 'rgba(88, 28, 135, 0.40)' },
      { x: 220, y: height * 0.30, w: 460, h: 60, c: 'rgba(194, 65, 12, 0.38)' }
    ];
    for (let c of clouds) {
      const cGrad = ctx.createRadialGradient(c.x, c.y, c.h * 0.2, c.x, c.y, c.w * 0.5);
      cGrad.addColorStop(0, c.c);
      cGrad.addColorStop(0.7, 'rgba(112, 26, 117, 0.25)');
      cGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = cGrad;
      ctx.beginPath();
      ctx.ellipse(c.x, c.y, c.w * 0.5, c.h * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // 2. Distant Mountains of Ephesus (Pion & Koressos) & Sacred Grove of Ortygia
    ctx.save();
    // Far Ridge
    ctx.fillStyle = '#311042';
    ctx.globalAlpha = 0.65;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.58);
    ctx.bezierCurveTo(450, height * 0.50, 950, height * 0.54, 1400, height * 0.49);
    ctx.bezierCurveTo(1850, height * 0.46, 2150, height * 0.53, width, height * 0.56);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Near Ridge with cypress silhouettes
    ctx.fillStyle = '#1e0c2f';
    ctx.globalAlpha = 0.90;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.64);
    ctx.bezierCurveTo(400, height * 0.57, 850, height * 0.61, 1300, height * 0.56);
    ctx.bezierCurveTo(1750, height * 0.53, 2100, height * 0.60, width, height * 0.62);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Sacred Cypresses & Olive Trees of the Artemis Sanctuary
    ctx.save();
    ctx.fillStyle = '#11071c';
    const cypresses = [
      { x: 100, y: height * 0.63, h: 65, w: 14 },
      { x: 150, y: height * 0.62, h: 80, w: 16 },
      { x: 280, y: height * 0.60, h: 54, w: 12 },
      { x: 2150, y: height * 0.59, h: 72, w: 15 },
      { x: 2280, y: height * 0.61, h: 85, w: 18 }
    ];
    for (let cp of cypresses) {
      ctx.beginPath();
      ctx.ellipse(cp.x, cp.y - cp.h * 0.5, cp.w * 0.5, cp.h * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // 3. Sacred Temple Plaza (Vorplatz & Crepidoma des Artemisions)
    const plazaY = height * 0.66;
    const plazaGrad = ctx.createLinearGradient(0, plazaY, 0, height);
    plazaGrad.addColorStop(0, '#475569');      // Polished marble stone
    plazaGrad.addColorStop(0.35, '#334155');   // Slate evening stone
    plazaGrad.addColorStop(0.75, '#1e293b');   // Deep shadow
    plazaGrad.addColorStop(1.0, '#0f172a');
    ctx.fillStyle = plazaGrad;
    ctx.fillRect(0, plazaY, width, height - plazaY);

    // Stone Slab Perspective Grid
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1.5;
    for (let x = -300; x <= width + 300; x += 150) {
      ctx.beginPath();
      ctx.moveTo(x, plazaY);
      ctx.lineTo(x + (x - width * 0.5) * 0.8, height);
      ctx.stroke();
    }
    for (let y = plazaY; y <= height; y += 42) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    ctx.restore();

    // 4. DER ARTEMISTEMPEL (Der gigantische Säulenwald aus über hundert Marmorsäulen)
    const tX = 1200; // Centered temple
    const styloW = 1680;
    const styloTopY = height * 0.53;
    const styloBotY = height * 0.66;

    // Stepped Marble Base (Crepidoma - 13 monumental steps)
    const stepCount = 5;
    const stepH = (styloBotY - styloTopY) / stepCount;
    for (let s = 0; s < stepCount; s++) {
      const stepProg = s / stepCount;
      const stepY = styloBotY - (s + 1) * stepH;
      const stepW = styloW + 140 - s * 24;

      const stepGrad = ctx.createLinearGradient(tX - stepW * 0.5, 0, tX + stepW * 0.5, 0);
      stepGrad.addColorStop(0, '#94a3b8');
      stepGrad.addColorStop(0.18, '#e2e8f0');
      stepGrad.addColorStop(0.5, '#f8fafc');
      stepGrad.addColorStop(0.82, '#e2e8f0');
      stepGrad.addColorStop(1.0, '#cbd5e1');

      ctx.fillStyle = stepGrad;
      ctx.fillRect(tX - stepW * 0.5, stepY, stepW, stepH + 0.8);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.25)';
      ctx.fillRect(tX - stepW * 0.5, stepY + stepH - 1.5, stepW, 1.5);
    }

    // Interior Sanctuary / Cella Background Wall (Tiefes Allerheiligstes)
    const architraveY = height * 0.32;
    const colHeight = styloTopY - architraveY;
    const cellaW = styloW * 0.82;

    const cellaGrad = ctx.createLinearGradient(0, architraveY, 0, styloTopY);
    cellaGrad.addColorStop(0, '#0f172a');
    cellaGrad.addColorStop(0.4, '#1e1b4b');
    cellaGrad.addColorStop(1.0, '#020617');
    ctx.fillStyle = cellaGrad;
    ctx.fillRect(tX - cellaW * 0.5, architraveY + 16, cellaW, colHeight - 16);

    // ==========================================
    // DER HEILIGE SÄULENWALD (Forest of over 100 Carved Marble Columns)
    // 3 distinct rows of monumental Ionic columns to create immense depth
    // ==========================================

    // Layer 1: Background Columns (Far inner colonnade, darker & denser)
    const backColCount = 24;
    const backSpacing = (cellaW * 0.96) / (backColCount - 1);
    ctx.save();
    for (let c = 0; c < backColCount; c++) {
      const bx = tX - (cellaW * 0.48) + c * backSpacing;
      // Skip center area for Kultstatue view
      if (Math.abs(bx - tX) < 140) continue;

      const bColGrad = ctx.createLinearGradient(bx - 6, 0, bx + 6, 0);
      bColGrad.addColorStop(0, '#475569');
      bColGrad.addColorStop(0.5, '#94a3b8');
      bColGrad.addColorStop(1.0, '#334155');
      ctx.fillStyle = bColGrad;
      ctx.fillRect(bx - 6, architraveY + 20, 12, colHeight - 20);
    }
    ctx.restore();

    // Layer 2: Mid-Row Columns (Interior dipteral row)
    const midColCount = 18;
    const midSpacing = (cellaW * 0.94) / (midColCount - 1);
    ctx.save();
    for (let c = 0; c < midColCount; c++) {
      const mx = tX - (cellaW * 0.47) + c * midSpacing;
      if (Math.abs(mx - tX) < 120) continue;

      const mColGrad = ctx.createLinearGradient(mx - 8, 0, mx + 8, 0);
      mColGrad.addColorStop(0, '#64748b');
      mColGrad.addColorStop(0.5, '#cbd5e1');
      mColGrad.addColorStop(1.0, '#475569');
      ctx.fillStyle = mColGrad;
      ctx.fillRect(mx - 8, architraveY + 18, 16, colHeight - 18);
    }
    ctx.restore();

    // ==========================================
    // EASTER EGG #1: Kultstatue der Artemis von Ephesos (+5900)
    // (x: 1200, y: height * 0.42)
    // The famous sacred cult statue of Artemis Ephesia in the golden Naos!
    // ==========================================
    ctx.save();
    const stX = tX;
    const stY = height * 0.43;

    // Glowing Sacred Golden Shrine / Aedicula
    const auraPulse = (Math.sin(t * 3.5) + 1) * 0.5;
    const shrineGrad = ctx.createRadialGradient(stX, stY - 10, 15, stX, stY - 10, 95);
    shrineGrad.addColorStop(0, `rgba(254, 240, 138, ${0.55 + auraPulse * 0.35})`);
    shrineGrad.addColorStop(0.5, `rgba(245, 158, 11, ${0.25 + auraPulse * 0.15})`);
    shrineGrad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = shrineGrad;
    ctx.beginPath();
    ctx.arc(stX, stY - 10, 95, 0, Math.PI * 2);
    ctx.fill();

    // Pedestal for Kultstatue
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(stX - 28, styloTopY - 22, 56, 22);
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 2;
    ctx.strokeRect(stX - 28, styloTopY - 22, 56, 22);

    // Dark Ebony & Gold Cult Statue Body (Artemis Ephesia)
    const statueH = 92;
    const baseBodyY = styloTopY - 22;

    // Rigid mummy-like ceremonial column gown (Ephesian garment / Ependytes)
    const gownGrad = ctx.createLinearGradient(stX - 16, 0, stX + 16, 0);
    gownGrad.addColorStop(0, '#1c1917');      // Dark sacred ebony
    gownGrad.addColorStop(0.3, '#d97706');    // Gold leaf ornamentation
    gownGrad.addColorStop(0.7, '#fbbf24');
    gownGrad.addColorStop(1.0, '#292524');
    ctx.fillStyle = gownGrad;
    ctx.beginPath();
    ctx.moveTo(stX - 18, baseBodyY);
    ctx.lineTo(stX - 14, baseBodyY - statueH * 0.65);
    ctx.lineTo(stX + 14, baseBodyY - statueH * 0.65);
    ctx.lineTo(stX + 18, baseBodyY);
    ctx.closePath();
    ctx.fill();

    // Relief bands on the gown (Lions, stags, griffins carved on the dress)
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 1.2;
    for (let ry = baseBodyY - 10; ry > baseBodyY - statueH * 0.62; ry -= 9) {
      ctx.beginPath();
      ctx.moveTo(stX - 16, ry);
      ctx.lineTo(stX + 16, ry);
      ctx.stroke();
    }

    // Sacred Polymastos / Breast Cluster (Symbols of fertility / bull testicles)
    ctx.fillStyle = '#fef08a';
    for (let row = 0; row < 3; row++) {
      const rowY = baseBodyY - statueH * 0.65 - 8 - row * 7;
      const count = 4 - row;
      for (let b = 0; b < count; b++) {
        const bx = stX - ((count - 1) * 3.5) + b * 7;
        ctx.beginPath();
        ctx.arc(bx, rowY, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Head of Artemis with Sacred Mural Crown (Polos / Kalathos - city walls tower crown)
    const headY = baseBodyY - statueH * 0.88;
    ctx.fillStyle = '#f8fafc'; // White marble or dark bronze face
    ctx.beginPath();
    ctx.arc(stX, headY, 7.5, 0, Math.PI * 2);
    ctx.fill();

    // Tower Crown (Polos)
    ctx.fillStyle = '#facc15';
    ctx.fillRect(stX - 11, headY - 22, 22, 15);
    // Battlements / crenellations on the crown
    for (let c = -9; c <= 7; c += 5) {
      ctx.fillRect(stX + c, headY - 26, 3.5, 5);
    }

    // Golden Halo Nimbus behind head
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.85)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(stX, headY - 4, 18, 0, Math.PI * 2);
    ctx.stroke();

    // Outstretched welcoming arms (holding sacred stags / ribbons)
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(stX - 12, headY + 8);
    ctx.lineTo(stX - 26, headY + 12);
    ctx.moveTo(stX + 12, headY + 8);
    ctx.lineTo(stX + 26, headY + 12);
    ctx.stroke();

    // Flanking Sacred Golden Stags (Kult-Hirsche der Artemis)
    const drawSacredStag = (hx, hy, facingRight) => {
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.ellipse(hx, hy, 8, 4.5, 0, 0, Math.PI * 2);
      ctx.fill();
      // Stag head
      ctx.beginPath();
      ctx.arc(hx + (facingRight ? 7 : -7), hy - 7, 3.5, 0, Math.PI * 2);
      ctx.fill();
      // Antlers
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(hx + (facingRight ? 7 : -7), hy - 9);
      ctx.lineTo(hx + (facingRight ? 12 : -12), hy - 16);
      ctx.stroke();
    };
    drawSacredStag(stX - 35, baseBodyY - 10, true);
    drawSacredStag(stX + 35, baseBodyY - 10, false);
    ctx.restore();

    // Layer 3: Monumental Front Colonnade (Reich geschmückte Marmorsäulen)
    // 12 Grand Columns in the front row
    const frontColCount = 12;
    const frontSpacing = (styloW * 0.92) / (frontColCount - 1);
    for (let c = 0; c < frontColCount; c++) {
      const cx = tX - (styloW * 0.46) + c * frontSpacing;

      // Attic-Ionic Column Base with Plinth
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(cx - 15, styloTopY - 10, 30, 10);

      // ==========================================
      // EASTER EGG #3: Skulptierte Marmorsäule (Columna Caelata) (+5000)
      // (x: 740, y: height * 0.52)
      // Carved figures of gods and heroes on the lower column drum (Croesus drum)
      // ==========================================
      const isReliefColumn = (Math.abs(cx - 740) < 50 || Math.abs(cx - (tX + (tX - 740))) < 50);
      const drumH = isReliefColumn ? 48 : 34;
      const drumY = styloTopY - 10 - drumH;

      // Lower drum with sculpted reliefs
      const drumGrad = ctx.createLinearGradient(cx - 13, 0, cx + 13, 0);
      drumGrad.addColorStop(0, '#94a3b8');
      drumGrad.addColorStop(0.3, '#f1f5f9');
      drumGrad.addColorStop(0.7, '#ffffff');
      drumGrad.addColorStop(1.0, '#cbd5e1');
      ctx.fillStyle = drumGrad;
      ctx.fillRect(cx - 13, drumY, 26, drumH);

      // Relief figure carvings on the drum
      ctx.fillStyle = '#475569';
      for (let rf = -9; rf <= 9; rf += 7) {
        ctx.beginPath();
        ctx.ellipse(cx + rf, drumY + drumH * 0.5, 2.5, drumH * 0.35, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(cx + rf, drumY + drumH * 0.18, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
      if (Math.abs(cx - 740) < 50) {
        // Golden sacred shimmer on the target Easter Egg column drum
        const drumShimmer = (Math.sin(t * 3.4) + 1) * 0.5;
        ctx.strokeStyle = `rgba(255, 215, 0, ${0.45 + drumShimmer * 0.45})`;
        ctx.lineWidth = 2;
        ctx.strokeRect(cx - 14, drumY - 1, 28, drumH + 2);
      }

      // Fluted Marble Shaft ascending to the entablature
      const shaftY = architraveY + 16;
      const shaftH = drumY - shaftY;
      const shaftGrad = ctx.createLinearGradient(cx - 11, 0, cx + 11, 0);
      shaftGrad.addColorStop(0, '#94a3b8');
      shaftGrad.addColorStop(0.2, '#f8fafc');
      shaftGrad.addColorStop(0.5, '#ffffff');
      shaftGrad.addColorStop(0.8, '#f1f5f9');
      shaftGrad.addColorStop(1.0, '#cbd5e1');
      ctx.fillStyle = shaftGrad;
      ctx.fillRect(cx - 11, shaftY, 22, shaftH);

      // Vertical flute lines
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.35)';
      ctx.lineWidth = 1;
      for (let fl = -8; fl <= 8; fl += 4) {
        ctx.beginPath();
        ctx.moveTo(cx + fl, shaftY);
        ctx.lineTo(cx + fl, drumY);
        ctx.stroke();
      }

      // Elaborate Ionic Capital with Volutes (Ephesian double spiral scrolls)
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(cx - 18, architraveY + 8, 36, 8);
      // Volute spirals left and right
      ctx.fillStyle = '#e2e8f0';
      ctx.beginPath();
      ctx.arc(cx - 14, architraveY + 12, 6, 0, Math.PI * 2);
      ctx.arc(cx + 14, architraveY + 12, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 1.2;
      ctx.stroke();
      // Golden Rosette in center of capital
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(cx, architraveY + 12, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Monumental Ionic Entablature (Architrave with 3 Fasciae & Dentils)
    const entH = 32;
    const entY = architraveY - entH + 8;
    const entGrad = ctx.createLinearGradient(0, entY, 0, entY + entH);
    entGrad.addColorStop(0, '#ffffff');
    entGrad.addColorStop(0.4, '#f8fafc');
    entGrad.addColorStop(1.0, '#cbd5e1');
    ctx.fillStyle = entGrad;
    ctx.fillRect(tX - styloW * 0.49, entY, styloW * 0.98, entH);

    // Continuous sculpted frieze along the entablature
    ctx.fillStyle = '#94a3b8';
    for (let fx = tX - styloW * 0.48; fx < tX + styloW * 0.48; fx += 16) {
      ctx.fillRect(fx, entY + 6, 9, 7);
    }
    // Gilded moulding line
    ctx.fillStyle = '#facc15';
    ctx.fillRect(tX - styloW * 0.49, entY + entH - 4, styloW * 0.98, 3);

    // Monumental Triangular Pediment (Tympanon with sculpted mythic reliefs)
    const pedH = 88;
    const pedApexY = entY - pedH;
    const pedLeftX = tX - styloW * 0.49;
    const pedRightX = tX + styloW * 0.49;

    ctx.save();
    // Tympanon Background
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.moveTo(pedLeftX, entY);
    ctx.lineTo(tX, pedApexY);
    ctx.lineTo(pedRightX, entY);
    ctx.closePath();
    ctx.fill();

    // Sculpted Golden & Marble Pediment Statues (Artemis, Apollo, Leto & Nymphs)
    ctx.fillStyle = '#f8fafc';
    // Center Artemis with Bow
    ctx.beginPath();
    ctx.ellipse(tX, pedApexY + 45, 11, 26, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(tX, pedApexY + 14, 8, 0, Math.PI * 2);
    ctx.fill();
    // Golden Bow
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(tX - 12, pedApexY + 40, 16, -Math.PI * 0.4, Math.PI * 0.4);
    ctx.stroke();

    // Flanking figures in pediment
    for (let ox = 80; ox < styloW * 0.44; ox += 110) {
      const prog = ox / (styloW * 0.46);
      const figH = 22 * (1 - prog * 0.6);
      const figY = entY - figH * 0.6;
      ctx.fillStyle = '#e2e8f0';
      ctx.beginPath();
      ctx.ellipse(tX - ox, figY, 7, figH, -prog * 0.4, 0, Math.PI * 2);
      ctx.ellipse(tX + ox, figY, 7, figH, prog * 0.4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Heavy Marble Cornice & Sima (Giebelrahmen)
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(pedLeftX - 10, entY);
    ctx.lineTo(tX, pedApexY);
    ctx.lineTo(pedRightX + 10, entY);
    ctx.stroke();

    // Golden Central Acroterion & Corner Acroteria (Palmetten-Akróterion)
    ctx.fillStyle = '#facc15';
    // Center Apex Acroterion
    ctx.beginPath();
    ctx.moveTo(tX, pedApexY - 32);
    ctx.bezierCurveTo(tX - 22, pedApexY - 14, tX - 12, pedApexY, tX, pedApexY);
    ctx.bezierCurveTo(tX + 12, pedApexY, tX + 22, pedApexY - 14, tX, pedApexY - 32);
    ctx.fill();
    ctx.restore();

    // ==========================================
    // EASTER EGG #2: Opulenter Opferaltar (+5400)
    // (x: 1200, y: height * 0.72)
    // The famous monumental U-shaped Great Altar of Artemis in the foreground plaza
    // ==========================================
    ctx.save();
    const altX = tX;
    const altY = height * 0.73;
    const altW = 280;
    const altH = 68;

    // Altar Base Shadow
    ctx.fillStyle = 'rgba(15, 23, 42, 0.65)';
    ctx.fillRect(altX - altW * 0.5 - 15, altY + altH * 0.5, altW + 30, 22);

    // Monumental Stepped Marble Altar Podium
    for (let s = 0; s < 3; s++) {
      const sY = altY + altH * 0.5 - s * 10;
      const sW = altW + 24 - s * 14;
      ctx.fillStyle = s === 2 ? '#f8fafc' : (s === 1 ? '#e2e8f0' : '#cbd5e1');
      ctx.fillRect(altX - sW * 0.5, sY, sW, 10);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
      ctx.fillRect(altX - sW * 0.5, sY + 8, sW, 2);
    }

    // Carved Altar Wall with Ionic Balustrade
    const altWallY = altY - altH * 0.35;
    const altWallH = altH * 0.75;
    const altWallGrad = ctx.createLinearGradient(altX - altW * 0.5, 0, altX + altW * 0.5, 0);
    altWallGrad.addColorStop(0, '#94a3b8');
    altWallGrad.addColorStop(0.2, '#f8fafc');
    altWallGrad.addColorStop(0.5, '#ffffff');
    altWallGrad.addColorStop(0.8, '#f1f5f9');
    altWallGrad.addColorStop(1.0, '#cbd5e1');
    ctx.fillStyle = altWallGrad;
    ctx.fillRect(altX - altW * 0.44, altWallY, altW * 0.88, altWallH);

    // Decorative Festoons & Garlands of Fruit / Laurel on the altar
    ctx.strokeStyle = '#15803d'; // Green laurel
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(altX - 45, altWallY + 16, 26, 0.2, Math.PI - 0.2);
    ctx.arc(altX + 45, altWallY + 16, 26, 0.2, Math.PI - 0.2);
    ctx.stroke();

    // Relief carved Bucrania (ox skulls) between garlands
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.arc(altX, altWallY + 12, 6, 0, Math.PI * 2);
    ctx.arc(altX - 90, altWallY + 12, 5, 0, Math.PI * 2);
    ctx.arc(altX + 90, altWallY + 12, 5, 0, Math.PI * 2);
    ctx.fill();

    // Golden Sacrificial Table Top
    ctx.fillStyle = '#facc15';
    ctx.fillRect(altX - altW * 0.48, altWallY - 6, altW * 0.96, 6);

    // Burning Sacrificial Flames & Rising Fragrant Incense on the Altar
    const drawAltarFlame = (fx, fy, scale) => {
      const fH = (32 + Math.sin(t * 14 + fx) * 8) * scale;
      const fGrad = ctx.createRadialGradient(fx, fy - 6, 4, fx, fy - 14, fH);
      fGrad.addColorStop(0, '#ffffff');
      fGrad.addColorStop(0.25, '#fef08a');
      fGrad.addColorStop(0.65, '#ea580c');
      fGrad.addColorStop(1.0, 'rgba(239, 68, 68, 0)');
      ctx.fillStyle = fGrad;
      ctx.beginPath();
      ctx.moveTo(fx - 14 * scale, fy - 4);
      ctx.quadraticCurveTo(fx - 4 * scale, fy - fH, fx + Math.sin(t * 8 + fx) * 4, fy - fH);
      ctx.quadraticCurveTo(fx + 6 * scale, fy - fH * 0.6, fx + 14 * scale, fy - 4);
      ctx.closePath();
      ctx.fill();

      // Fragrant Incense Smoke ascending
      ctx.strokeStyle = 'rgba(241, 245, 249, 0.28)';
      ctx.lineWidth = 2.5 * scale;
      ctx.beginPath();
      ctx.moveTo(fx, fy - fH);
      ctx.bezierCurveTo(fx - 18, fy - fH - 35, fx + 18, fy - fH - 70, fx - 10, fy - fH - 110);
      ctx.stroke();
    };

    // 3 Golden Ritual Braziers burning on the altar table
    drawAltarFlame(altX - 70, altWallY - 6, 0.9);
    drawAltarFlame(altX, altWallY - 6, 1.2);
    drawAltarFlame(altX + 70, altWallY - 6, 0.9);

    // Golden sacrificial bowls / Patera
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.ellipse(altX - 70, altWallY - 5, 12, 4, 0, 0, Math.PI * 2);
    ctx.ellipse(altX, altWallY - 5, 16, 5, 0, 0, Math.PI * 2);
    ctx.ellipse(altX + 70, altWallY - 5, 12, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Sacred golden pulse aura on the altar
    const altarGlow = (Math.sin(t * 3.6) + 1) * 0.5;
    ctx.strokeStyle = `rgba(255, 215, 0, ${0.35 + altarGlow * 0.45})`;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(altX, altY, 68, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();

    ctx.restore();
  }

  _renderChichenItza(ctx, width, height, t) {
    ctx.save();

    // 1. Tropischer Yucatán-Himmel (Tropical Azure & Sunlit Canopy Sky)
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.65);
    skyGrad.addColorStop(0, '#0284c7');      // Vivid Tropical Sky Blue
    skyGrad.addColorStop(0.28, '#38bdf8');   // Bright Azure
    skyGrad.addColorStop(0.55, '#7dd3fc');   // Soft Tropical Cyan
    skyGrad.addColorStop(0.78, '#bae6fd');   // Humid Atmosphere
    skyGrad.addColorStop(1.0, '#fef08a');    // Golden Jungle Horizon Glow
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // Tropical Sun & Crepuscular Rays breaking through the jungle mist
    ctx.save();
    const sunX = width * 0.76;
    const sunY = height * 0.14;
    const sunGrad = ctx.createRadialGradient(sunX, sunY, 15, sunX, sunY, 160);
    sunGrad.addColorStop(0, '#ffffff');
    sunGrad.addColorStop(0.25, 'rgba(254, 240, 138, 0.7)');
    sunGrad.addColorStop(0.65, 'rgba(251, 191, 36, 0.2)');
    sunGrad.addColorStop(1.0, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 160, 0, Math.PI * 2);
    ctx.fill();

    // Sunbeams / God Rays
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 45;
    for (let a = -0.6; a <= 0.8; a += 0.35) {
      ctx.beginPath();
      ctx.moveTo(sunX, sunY);
      ctx.lineTo(sunX + Math.cos(a + Math.sin(t * 0.5) * 0.05) * width * 0.8, sunY + Math.sin(a) * height * 0.8);
      ctx.stroke();
    }
    ctx.restore();

    // Humid Jungle Clouds drifting over the Yucatán
    ctx.save();
    const jungleClouds = [
      { x: 320, y: height * 0.15, w: 560, h: 70, c: 'rgba(255, 255, 255, 0.55)' },
      { x: 1050, y: height * 0.11, w: 640, h: 80, c: 'rgba(254, 249, 195, 0.50)' },
      { x: 1820, y: height * 0.17, w: 580, h: 75, c: 'rgba(255, 255, 255, 0.52)' },
      { x: 1400, y: height * 0.22, w: 480, h: 60, c: 'rgba(240, 253, 244, 0.45)' }
    ];
    for (let jc of jungleClouds) {
      const jDrift = jc.x + Math.sin(t * 0.3 + jc.y) * 15;
      const jcGrad = ctx.createRadialGradient(jDrift, jc.y, jc.h * 0.2, jDrift, jc.y, jc.w * 0.5);
      jcGrad.addColorStop(0, jc.c);
      jcGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.25)');
      jcGrad.addColorStop(1.0, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = jcGrad;
      ctx.beginPath();
      ctx.ellipse(jDrift, jc.y, jc.w * 0.5, jc.h * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // 2. Tiefer, dichter Dschungel von Yucatán (Layered Rainforest Canopy)
    ctx.save();
    // Far Deep Rainforest Layer
    ctx.fillStyle = '#064e3b';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.60);
    for (let x = 0; x <= width; x += 60) {
      const yVar = Math.sin(x * 0.015) * 22 + Math.cos(x * 0.04) * 12;
      ctx.lineTo(x, height * 0.52 + yVar);
    }
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Mid Jungle Canopy with Palm Fronds & Ceiba Tree Crowns
    ctx.fillStyle = '#047857';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.64);
    for (let x = 0; x <= width; x += 45) {
      const treePeak = Math.sin(x * 0.02 + 1) * 28 + Math.sin(x * 0.06) * 14;
      ctx.lineTo(x, height * 0.56 + treePeak);
    }
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Near Lush Tropical Foliage
    ctx.fillStyle = '#059669';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.68);
    for (let x = 0; x <= width; x += 35) {
      const foliageH = Math.sin(x * 0.025 + 2) * 25 + Math.cos(x * 0.07) * 12;
      ctx.lineTo(x, height * 0.62 + foliageH);
    }
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // 3. Große Zeremonial-Plaza von Chichén Itzá (Sacred Limestone Plaza)
    const plazaY = height * 0.68;
    const plazaGrad = ctx.createLinearGradient(0, plazaY, 0, height);
    plazaGrad.addColorStop(0, '#a3e635');      // Sunlit tropical lawn / moss
    plazaGrad.addColorStop(0.18, '#65a30d');   // Rich grass
    plazaGrad.addColorStop(0.40, '#cbd5e1');   // Weathered limestone pavement
    plazaGrad.addColorStop(0.70, '#94a3b8');   // Maya slab stones
    plazaGrad.addColorStop(1.0, '#475569');
    ctx.fillStyle = plazaGrad;
    ctx.fillRect(0, plazaY, width, height - plazaY);

    // Ancient Sacbe-Steinplatten (White Stone Causeway / Stone Slabs)
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.10)';
    ctx.lineWidth = 1.8;
    for (let x = -250; x <= width + 250; x += 140) {
      ctx.beginPath();
      ctx.moveTo(x, plazaY);
      ctx.lineTo(x + (x - width * 0.5) * 0.75, height);
      ctx.stroke();
    }
    for (let y = plazaY; y <= height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    ctx.restore();

    // 4. DIE KUKULKAN-PYRAMIDE (El Castillo de Chichén Itzá)
    const pX = 1200; // Centered pyramid
    const pyrBaseW = 860;
    const pyrTopW = 200;
    const pyrBotY = height * 0.70;
    const pyrTopY = height * 0.35;
    const numTerraces = 9; // The iconic 9 terraces of Mayan cosmology
    const terraceH = (pyrBotY - pyrTopY) / numTerraces;

    // Outer Foundation Shadow
    ctx.fillStyle = 'rgba(15, 23, 42, 0.55)';
    ctx.fillRect(pX - pyrBaseW * 0.5 - 25, pyrBotY, pyrBaseW + 50, 24);

    // Render the 9 Stepped Terraces (Nueve Terrazas Escalonadas)
    for (let tStep = 0; tStep < numTerraces; tStep++) {
      const progBot = tStep / numTerraces;
      const progTop = (tStep + 1) / numTerraces;

      const yBot = pyrBotY - tStep * terraceH;
      const yTop = pyrBotY - (tStep + 1) * terraceH;

      const wBot = pyrBaseW * (1 - progBot) + pyrTopW * progBot;
      const wTop = pyrBaseW * (1 - progTop) + pyrTopW * progTop;

      // Weathered Mayan Limestone Texture & Gradients
      const tGrad = ctx.createLinearGradient(pX - wBot * 0.5, 0, pX + wBot * 0.5, 0);
      tGrad.addColorStop(0, '#94a3b8');      // Left shadow
      tGrad.addColorStop(0.18, '#e2e8f0');
      tGrad.addColorStop(0.5, '#f8fafc');   // Sunlit center face
      tGrad.addColorStop(0.82, '#e2e8f0');
      tGrad.addColorStop(1.0, '#64748b');   // Right shadow
      ctx.fillStyle = tGrad;

      // Sloped terrace facet
      ctx.beginPath();
      ctx.moveTo(pX - wBot * 0.5, yBot);
      ctx.lineTo(pX - wTop * 0.5, yTop);
      ctx.lineTo(pX + wTop * 0.5, yTop);
      ctx.lineTo(pX + wBot * 0.5, yBot);
      ctx.closePath();
      ctx.fill();

      // Horizontal cornice groove & recessed panels (Tablero-Stil)
      ctx.fillStyle = 'rgba(51, 65, 85, 0.35)';
      ctx.fillRect(pX - wTop * 0.48, yTop, wTop * 0.96, 4.5);

      // Carved panels across terrace face
      ctx.fillStyle = 'rgba(100, 116, 139, 0.22)';
      for (let px = pX - wBot * 0.44; px < pX + wBot * 0.44; px += 38) {
        if (Math.abs(px - pX) > 75) { // Leave room for central staircase
          ctx.fillRect(px, yTop + 6, 26, terraceH - 9);
        }
      }
    }

    // Monumental Central Staircase (Escalinata Principal - 91 Stufen)
    const stairBotW = 150;
    const stairTopW = 75;
    const stairGrad = ctx.createLinearGradient(pX - stairBotW * 0.5, 0, pX + stairBotW * 0.5, 0);
    stairGrad.addColorStop(0, '#94a3b8');
    stairGrad.addColorStop(0.5, '#f1f5f9');
    stairGrad.addColorStop(1.0, '#cbd5e1');
    ctx.fillStyle = stairGrad;

    ctx.beginPath();
    ctx.moveTo(pX - stairBotW * 0.5, pyrBotY);
    ctx.lineTo(pX - stairTopW * 0.5, pyrTopY);
    ctx.lineTo(pX + stairTopW * 0.5, pyrTopY);
    ctx.lineTo(pX + stairBotW * 0.5, pyrBotY);
    ctx.closePath();
    ctx.fill();

    // Individual Stone Steps lines
    ctx.strokeStyle = 'rgba(71, 85, 105, 0.45)';
    ctx.lineWidth = 1.2;
    const totalVisSteps = 42;
    for (let s = 1; s <= totalVisSteps; s++) {
      const sProg = s / totalVisSteps;
      const sY = pyrBotY - sProg * (pyrBotY - pyrTopY);
      const sW = stairBotW * (1 - sProg) + stairTopW * sProg;
      ctx.beginPath();
      ctx.moveTo(pX - sW * 0.5, sY);
      ctx.lineTo(pX + sW * 0.5, sY);
      ctx.stroke();
    }

    // Heavy Balustrades (Treppenwangen)
    const balustradeLGrad = ctx.createLinearGradient(pX - stairBotW * 0.5 - 14, 0, pX - stairBotW * 0.5, 0);
    balustradeLGrad.addColorStop(0, '#cbd5e1');
    balustradeLGrad.addColorStop(1, '#94a3b8');
    ctx.fillStyle = balustradeLGrad;

    // Left Balustrade
    ctx.beginPath();
    ctx.moveTo(pX - stairBotW * 0.5 - 16, pyrBotY);
    ctx.lineTo(pX - stairTopW * 0.5 - 10, pyrTopY);
    ctx.lineTo(pX - stairTopW * 0.5, pyrTopY);
    ctx.lineTo(pX - stairBotW * 0.5, pyrBotY);
    ctx.closePath();
    ctx.fill();

    // Right Balustrade
    ctx.beginPath();
    ctx.moveTo(pX + stairBotW * 0.5, pyrBotY);
    ctx.lineTo(pX + stairTopW * 0.5, pyrTopY);
    ctx.lineTo(pX + stairTopW * 0.5 + 10, pyrTopY);
    ctx.lineTo(pX + stairBotW * 0.5 + 16, pyrBotY);
    ctx.closePath();
    ctx.fill();

    // The Famous Equinox Serpent Shadow Effect (Die Schattenschlange auf der Treppenwange)
    // 7 undulating triangular shadows descending the left balustrade
    ctx.fillStyle = 'rgba(15, 23, 42, 0.70)';
    for (let tri = 0; tri < 7; tri++) {
      const triProg = (tri + 0.3) / 7.5;
      const triY = pyrTopY + triProg * (pyrBotY - pyrTopY);
      const triX = pX - (stairTopW * 0.5 * (1 - triProg) + stairBotW * 0.5 * triProg) - 7;
      const triSize = 14 + tri * 2.5;

      ctx.beginPath();
      ctx.moveTo(triX, triY - triSize * 0.5);
      ctx.lineTo(triX - triSize * 0.8, triY);
      ctx.lineTo(triX, triY + triSize * 0.5);
      ctx.closePath();
      ctx.fill();
    }

    // ==========================================
    // EASTER EGG #2: Steinerner Schlangenkopf an der Treppenbasis (+5500)
    // (x: 1050, y: height * 0.68)
    // The famous colossal carved feathered serpent head of Kukulkan at the base of the stairs!
    // ==========================================
    ctx.save();
    const sHeadX = 1050;
    const sHeadY = height * 0.68;

    // Pulsing aura on the serpent head
    const serpentPulse = (Math.sin(t * 3.4) + 1) * 0.5;
    const sHalo = ctx.createRadialGradient(sHeadX, sHeadY - 12, 10, sHeadX, sHeadY - 12, 65);
    sHalo.addColorStop(0, `rgba(254, 240, 138, ${0.40 + serpentPulse * 0.35})`);
    sHalo.addColorStop(0.6, `rgba(34, 197, 94, ${0.20 + serpentPulse * 0.15})`);
    sHalo.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = sHalo;
    ctx.beginPath();
    ctx.arc(sHeadX, sHeadY - 12, 65, 0, Math.PI * 2);
    ctx.fill();

    // Stone Plinth
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(sHeadX - 22, sHeadY + 4, 44, 15);
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(sHeadX - 22, sHeadY + 4, 44, 15);

    // Carved Limestone Serpent Snout & Head
    const headGrad = ctx.createLinearGradient(sHeadX - 18, 0, sHeadX + 18, 0);
    headGrad.addColorStop(0, '#cbd5e1');
    headGrad.addColorStop(0.5, '#f8fafc');
    headGrad.addColorStop(1.0, '#94a3b8');
    ctx.fillStyle = headGrad;

    // Main Head Body
    ctx.beginPath();
    ctx.moveTo(sHeadX - 18, sHeadY + 4);
    ctx.lineTo(sHeadX - 22, sHeadY - 24);
    ctx.lineTo(sHeadX - 10, sHeadY - 34);
    ctx.lineTo(sHeadX + 16, sHeadY - 30);
    ctx.lineTo(sHeadX + 24, sHeadY - 16);
    ctx.lineTo(sHeadX + 18, sHeadY + 4);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Gaping Serpent Jaws & White Fangs
    ctx.fillStyle = '#7f1d1d'; // Deep red mouth cavity
    ctx.beginPath();
    ctx.moveTo(sHeadX - 18, sHeadY - 10);
    ctx.lineTo(sHeadX - 4, sHeadY - 14);
    ctx.lineTo(sHeadX - 16, sHeadY - 2);
    ctx.closePath();
    ctx.fill();

    // Sharp Fangs
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(sHeadX - 16, sHeadY - 10);
    ctx.lineTo(sHeadX - 12, sHeadY - 4);
    ctx.lineTo(sHeadX - 10, sHeadY - 10);
    ctx.fill();

    // Bifurcated Forked Tongue protruding
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(sHeadX - 15, sHeadY - 6);
    ctx.lineTo(sHeadX - 28, sHeadY - 3);
    ctx.lineTo(sHeadX - 35, sHeadY - 8);
    ctx.moveTo(sHeadX - 28, sHeadY - 3);
    ctx.lineTo(sHeadX - 35, sHeadY + 2);
    ctx.stroke();

    // Piercing Jade / Obsidian Serpent Eye
    ctx.fillStyle = '#10b981'; // Green Jade Eye
    ctx.beginPath();
    ctx.arc(sHeadX + 2, sHeadY - 22, 5.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(sHeadX + 2, sHeadY - 22, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Carved Feather Plumes around the head
    ctx.strokeStyle = '#f59e0b'; // Golden feather details
    ctx.lineWidth = 2;
    for (let plume = -26; plume <= -6; plume += 7) {
      ctx.beginPath();
      ctx.moveTo(sHeadX + 16, sHeadY + plume);
      ctx.lineTo(sHeadX + 28, sHeadY + plume - 4);
      ctx.stroke();
    }
    ctx.restore();

    // 5. Gipfeltempel von El Castillo (Temple of Kukulkan atop the Pyramid)
    const tPlatformY = pyrTopY;
    const tPlatformW = pyrTopW;
    const templeW = 140;
    const templeH = 48;
    const templeY = tPlatformY - templeH;

    // Platform Base
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(pX - tPlatformW * 0.5, tPlatformY - 6, tPlatformW, 6);
    ctx.fillStyle = '#64748b';
    ctx.fillRect(pX - tPlatformW * 0.5, tPlatformY, tPlatformW, 2);

    // Temple Walls (Limestone Sanctuary)
    const tWallGrad = ctx.createLinearGradient(pX - templeW * 0.5, 0, pX + templeW * 0.5, 0);
    tWallGrad.addColorStop(0, '#94a3b8');
    tWallGrad.addColorStop(0.3, '#f1f5f9');
    tWallGrad.addColorStop(0.7, '#ffffff');
    tWallGrad.addColorStop(1.0, '#cbd5e1');
    ctx.fillStyle = tWallGrad;
    ctx.fillRect(pX - templeW * 0.5, templeY, templeW, templeH);

    // 3 Temple Portals / Doorways (Entrances to Sanctuary)
    ctx.fillStyle = '#0f172a'; // Dark sanctuary interior
    const doorW = 22;
    const doorH = 32;
    ctx.fillRect(pX - 44, templeY + templeH - doorH, doorW, doorH);
    ctx.fillRect(pX - doorW * 0.5, templeY + templeH - doorH, doorW, doorH);
    ctx.fillRect(pX + 22, templeY + templeH - doorH, doorW, doorH);

    // Sculpted Chaac Masks & Cornice on Temple Roof
    const roofH = 18;
    const roofY = templeY - roofH;
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(pX - templeW * 0.54, roofY, templeW * 1.08, roofH);

    // Carved frieze bands on the temple roof
    ctx.fillStyle = '#475569';
    for (let rx = pX - templeW * 0.52; rx < pX + templeW * 0.52; rx += 14) {
      ctx.fillRect(rx, roofY + 4, 7, 10);
    }
    // Gilded roof crest
    ctx.fillStyle = '#facc15';
    ctx.fillRect(pX - templeW * 0.54, roofY, templeW * 1.08, 3);

    // ==========================================
    // EASTER EGG #1: Gefiederte Schlange Kukulkan (+6000)
    // (x: 1200, y: height * 0.28)
    // The celestial Feathered Serpent deity hovering / manifesting above the Temple of Kukulkan!
    // ==========================================
    ctx.save();
    const kX = pX;
    const kY = height * 0.28;

    // Divine Emerald & Golden Aura
    const kPulse = (Math.sin(t * 3.8) + 1) * 0.5;
    const kHalo = ctx.createRadialGradient(kX, kY, 12, kX, kY, 85);
    kHalo.addColorStop(0, `rgba(52, 211, 153, ${0.55 + kPulse * 0.35})`);
    kHalo.addColorStop(0.45, `rgba(250, 204, 21, ${0.30 + kPulse * 0.2})`);
    kHalo.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = kHalo;
    ctx.beginPath();
    ctx.arc(kX, kY, 85, 0, Math.PI * 2);
    ctx.fill();

    // Undulating Feathered Serpent Body (Coiled S-curve)
    ctx.save();
    ctx.strokeStyle = '#059669'; // Emerald Green Scales
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(kX - 65, kY + 12);
    ctx.bezierCurveTo(kX - 35, kY - 28, kX - 10, kY + 24, kX + 25, kY - 14);
    ctx.bezierCurveTo(kX + 45, kY - 32, kX + 65, kY - 5, kX + 75, kY + 8);
    ctx.stroke();

    // Shimmering Golden Belly Scales
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(kX - 63, kY + 14);
    ctx.bezierCurveTo(kX - 35, kY - 25, kX - 10, kY + 26, kX + 25, kY - 12);
    ctx.bezierCurveTo(kX + 45, kY - 29, kX + 65, kY - 3, kX + 73, kY + 10);
    ctx.stroke();

    // Iridescent Quetzal Feathers along serpent back
    for (let f = -55; f <= 55; f += 12) {
      const fProg = (f + 55) / 110;
      const fY = kY + Math.sin(f * 0.05 + t * 4) * 14 - 10;
      ctx.fillStyle = f % 2 === 0 ? '#34d399' : '#fbbf24';
      ctx.beginPath();
      ctx.ellipse(kX + f, fY, 4, 10, -0.4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Majestic Dragon-Serpent Head of Kukulkan
    ctx.fillStyle = '#047857';
    ctx.beginPath();
    ctx.moveTo(kX + 65, kY - 5);
    ctx.lineTo(kX + 88, kY - 18);
    ctx.lineTo(kX + 102, kY - 6);
    ctx.lineTo(kX + 85, kY + 12);
    ctx.closePath();
    ctx.fill();

    // Glowing Golden Eye of Kukulkan
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(kX + 84, kY - 8, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.arc(kX + 85, kY - 8, 2, 0, Math.PI * 2);
    ctx.fill();

    // Feather Plumes Crown on Kukulkan's Head
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(kX + 76, kY - 12);
    ctx.lineTo(kX + 82, kY - 30);
    ctx.moveTo(kX + 84, kY - 14);
    ctx.lineTo(kX + 94, kY - 32);
    ctx.moveTo(kX + 90, kY - 10);
    ctx.lineTo(kX + 104, kY - 26);
    ctx.stroke();

    // Long Serpent Tongue
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(kX + 98, kY - 2);
    ctx.lineTo(kX + 115, kY + 4);
    ctx.lineTo(kX + 122, kY);
    ctx.moveTo(kX + 115, kY + 4);
    ctx.lineTo(kX + 122, kY + 9);
    ctx.stroke();
    ctx.restore();
    ctx.restore();

    // ==========================================
    // EASTER EGG #3: Heiliger Quetzal-Dschungelvogel (+5100)
    // (x: 420, y: height * 0.44)
    // Beautiful Pharomachrus mocinno perched in the jungle ceiba branches on the left
    // ==========================================
    ctx.save();
    const qvX = 420;
    const qvY = height * 0.44;

    // Glowing Quetzal Aura
    const qvPulse = (Math.sin(t * 3.6) + 1) * 0.5;
    ctx.strokeStyle = `rgba(52, 211, 153, ${0.45 + qvPulse * 0.45})`;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(qvX, qvY, 52, 0, Math.PI * 2);
    ctx.stroke();

    // Ceiba Tree Branch
    ctx.fillStyle = '#5c3a21';
    ctx.beginPath();
    ctx.moveTo(qvX - 70, qvY + 28);
    ctx.bezierCurveTo(qvX - 20, qvY + 18, qvX + 40, qvY + 24, qvX + 80, qvY + 16);
    ctx.lineTo(qvX + 80, qvY + 24);
    ctx.bezierCurveTo(qvX + 40, qvY + 32, qvX - 20, qvY + 26, qvX - 70, qvY + 36);
    ctx.closePath();
    ctx.fill();

    // Quetzal Bird Body (Vivid Emerald Green with Brilliant Crimson Chest)
    const birdSway = Math.sin(t * 4.0) * 2;

    // Tail Feathers (Extremely long flowing tail streamers)
    ctx.strokeStyle = '#059669';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(qvX - 4, qvY + 16 + birdSway);
    ctx.bezierCurveTo(qvX - 18, qvY + 55, qvX - 8, qvY + 85, qvX - 22, qvY + 120 + birdSway);
    ctx.moveTo(qvX + 2, qvY + 16 + birdSway);
    ctx.bezierCurveTo(qvX - 8, qvY + 58, qvX + 6, qvY + 90, qvX - 10, qvY + 128 + birdSway);
    ctx.stroke();

    // Emerald Green Back & Wings
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.ellipse(qvX - 2, qvY + 4 + birdSway, 12, 18, -0.3, 0, Math.PI * 2);
    ctx.fill();

    // Brilliant Scarlet / Crimson Red Breast (Charakteristische Quetzal-Brust)
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.ellipse(qvX + 5, qvY + 6 + birdSway, 8, 12, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Round Crested Head with Fluffy Feathers
    ctx.fillStyle = '#34d399';
    ctx.beginPath();
    ctx.arc(qvX + 2, qvY - 14 + birdSway, 9, 0, Math.PI * 2);
    ctx.fill();

    // Golden Yellow Beak
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.moveTo(qvX + 10, qvY - 14 + birdSway);
    ctx.lineTo(qvX + 20, qvY - 12 + birdSway);
    ctx.lineTo(qvX + 10, qvY - 9 + birdSway);
    ctx.closePath();
    ctx.fill();

    // Black Eye
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(qvX + 5, qvY - 15 + birdSway, 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(qvX + 6, qvY - 16 + birdSway, 0.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 6. Foreground Jungle Ceiba & Palm Framing (Left and Right Jungle Pillars)
    const drawJungleCanopyFrond = (fx, fy, scale, flip) => {
      ctx.save();
      ctx.translate(fx, fy);
      if (flip) ctx.scale(-1, 1);
      ctx.scale(scale, scale);

      ctx.fillStyle = '#065f46';
      for (let f = 0; f < 7; f++) {
        const fAngle = -0.5 + f * 0.18;
        ctx.beginPath();
        ctx.ellipse(Math.cos(fAngle) * 55, Math.sin(fAngle) * 45, 55, 14, fAngle, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = '#10b981';
      for (let f = 0; f < 5; f++) {
        const fAngle = -0.4 + f * 0.20;
        ctx.beginPath();
        ctx.ellipse(Math.cos(fAngle) * 45, Math.sin(fAngle) * 35, 42, 10, fAngle, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    // Framing Jungle Foliage Left & Right
    drawJungleCanopyFrond(80, height * 0.35, 1.3, false);
    drawJungleCanopyFrond(160, height * 0.65, 1.2, false);
    drawJungleCanopyFrond(width - 90, height * 0.32, 1.4, true);
    drawJungleCanopyFrond(width - 150, height * 0.62, 1.25, true);

    ctx.restore();
  }

  _renderChristRedeemerRio(ctx, width, height, t) {
    ctx.save();

    // 1. Tropical Rio Skies & Golden Sunlight
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.7);
    skyGrad.addColorStop(0, '#0284c7');    // Radiant Cerulean Blue
    skyGrad.addColorStop(0.3, '#38bdf8');  // Light Sky Blue
    skyGrad.addColorStop(0.65, '#bae6fd'); // Tropical Horizon Cyan
    skyGrad.addColorStop(0.85, '#fef08a'); // Warm Golden Haze
    skyGrad.addColorStop(1.0, '#fed7aa');  // Horizon Amber
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // Glowing Tropical Sun over Rio
    const sunX = width * 0.78;
    const sunY = height * 0.18;
    const sunGrad = ctx.createRadialGradient(sunX, sunY, 15, sunX, sunY, 220);
    sunGrad.addColorStop(0, '#ffffff');
    sunGrad.addColorStop(0.2, '#fef08a');
    sunGrad.addColorStop(0.55, 'rgba(254, 240, 138, 0.45)');
    sunGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 220, 0, Math.PI * 2);
    ctx.fill();

    // Distant Atlantic Ocean & Guanabara Bay
    const seaY = height * 0.52;
    const seaGrad = ctx.createLinearGradient(0, seaY, 0, height);
    seaGrad.addColorStop(0, '#0284c7');
    seaGrad.addColorStop(0.3, '#0369a1');
    seaGrad.addColorStop(0.7, '#075985');
    seaGrad.addColorStop(1.0, '#0c4a6e');
    ctx.fillStyle = seaGrad;
    ctx.fillRect(0, seaY, width, height - seaY);

    // Ocean Sun Shimmer
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    for (let r = 0; r < 20; r++) {
      const rw = 80 + Math.sin(t * 1.5 + r) * 35;
      const rx = sunX + Math.sin(t * 0.8 + r * 2) * 50;
      const ry = seaY + 15 + r * 14;
      ctx.fillRect(rx - rw * 0.5, ry, rw, 2);
    }
    ctx.restore();

    // Distant Coastlines & Beaches of Rio (Copacabana & Niterói Coast)
    ctx.save();
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.ellipse(width * 0.75, seaY + 18, 420, 10, 0.05, 0, Math.PI * 2);
    ctx.fill();
    // Distant Rio Hills & City Silhouettes
    ctx.fillStyle = '#0e7490';
    ctx.globalAlpha = 0.45;
    ctx.beginPath();
    ctx.moveTo(width * 0.55, seaY + 12);
    ctx.bezierCurveTo(width * 0.65, seaY - 45, width * 0.72, seaY - 30, width * 0.82, seaY + 5);
    ctx.bezierCurveTo(width * 0.90, seaY - 20, width * 0.96, seaY - 10, width, seaY + 8);
    ctx.lineTo(width, seaY + 60);
    ctx.lineTo(width * 0.55, seaY + 60);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // 2. Iconic Sugarloaf Mountain (Pão de Açúcar) & Morro da Urca
    const slX = 1880;
    const slY = height * 0.58;
    ctx.save();
    // Morro da Urca (Secondary Peak to the left)
    const urcaGrad = ctx.createLinearGradient(slX - 320, slY - 140, slX - 160, slY + 40);
    urcaGrad.addColorStop(0, '#15803d');
    urcaGrad.addColorStop(0.5, '#166534');
    urcaGrad.addColorStop(1, '#0f766e');
    ctx.fillStyle = urcaGrad;
    ctx.beginPath();
    ctx.moveTo(slX - 350, slY + 60);
    ctx.bezierCurveTo(slX - 320, slY - 90, slX - 250, slY - 140, slX - 180, slY - 110);
    ctx.bezierCurveTo(slX - 130, slY - 80, slX - 90, slY - 20, slX - 60, slY + 60);
    ctx.closePath();
    ctx.fill();

    // Main Sugarloaf Mountain (Pão de Açúcar) Monolith
    const paoGrad = ctx.createLinearGradient(slX - 140, slY - 260, slX + 160, slY + 80);
    paoGrad.addColorStop(0, '#78716c'); // Warm Granite Rock
    paoGrad.addColorStop(0.3, '#57534e');
    paoGrad.addColorStop(0.7, '#14532d'); // Tropical vegetation on slopes
    paoGrad.addColorStop(1, '#064e3b');
    ctx.fillStyle = paoGrad;
    ctx.beginPath();
    ctx.moveTo(slX - 150, slY + 80);
    ctx.bezierCurveTo(slX - 140, slY - 80, slX - 110, slY - 250, slX - 10, slY - 270);
    ctx.bezierCurveTo(slX + 70, slY - 280, slX + 120, slY - 180, slX + 150, slY + 80);
    ctx.closePath();
    ctx.fill();

    // Granite Rock Strata & Vegetation Highlights on Sugarloaf
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
    ctx.lineWidth = 2;
    for (let s = -80; s <= 90; s += 30) {
      ctx.beginPath();
      ctx.moveTo(slX + s * 0.7, slY - 240 + Math.abs(s) * 0.9);
      ctx.lineTo(slX + s * 0.9, slY + 40);
      ctx.stroke();
    }
    ctx.restore();

    // ==========================================
    // EASTER EGG #2: Zuckerhut-Seilbahn (Bondinho do Pão de Açúcar) (+5600)
    // (x: 1880, y: height * 0.44)
    // ==========================================
    ctx.save();
    // Cable Car Wire from Morro da Urca to Sugarloaf Summit
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(slX - 220, slY - 115);
    ctx.quadraticCurveTo(slX - 80, slY - 140, slX + 10, slY - 230);
    ctx.stroke();

    // The Famous Bubble Cable Car (Bondinho)
    const cableProg = (Math.sin(t * 0.8) + 1) * 0.5;
    const bondX = (slX - 220) * (1 - cableProg) + (slX + 10) * cableProg;
    const bondY = (slY - 115) * (1 - cableProg) + (slY - 230) * cableProg + Math.sin(cableProg * Math.PI) * 12;

    // Cable arm
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(bondX, bondY - 16);
    ctx.lineTo(bondX, bondY);
    ctx.stroke();

    // Rounded Glass Cabin (Iconic Glass Bubble)
    const cabinGrad = ctx.createLinearGradient(bondX - 16, bondY - 10, bondX + 16, bondY + 12);
    cabinGrad.addColorStop(0, '#f8fafc');
    cabinGrad.addColorStop(0.3, '#38bdf8');
    cabinGrad.addColorStop(0.7, '#0284c7');
    cabinGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = cabinGrad;
    ctx.beginPath();
    ctx.roundRect(bondX - 16, bondY, 32, 20, 6);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Cabin Windows
    ctx.fillStyle = '#e0f2fe';
    ctx.fillRect(bondX - 12, bondY + 4, 10, 8);
    ctx.fillRect(bondX + 2, bondY + 4, 10, 8);

    // Sparkling Sunlight Reflection on Cable Car
    const bondPulse = (Math.sin(t * 3.5) + 1) * 0.5;
    ctx.fillStyle = `rgba(255, 255, 255, ${0.4 + bondPulse * 0.55})`;
    ctx.beginPath();
    ctx.arc(bondX - 6, bondY + 6, 3, 0, Math.PI * 2);
    ctx.fill();

    // Golden Aura on Easter Egg #2
    ctx.strokeStyle = `rgba(254, 240, 138, ${0.25 + bondPulse * 0.45})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(bondX, bondY + 8, 32, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // 3. Mount Corcovado Slopes (Steep Atlantic Rainforest Ridge)
    const mX = 1200; // Centered Corcovado Summit
    ctx.save();
    const corcoGrad = ctx.createLinearGradient(0, height * 0.55, 0, height);
    corcoGrad.addColorStop(0, '#15803d');
    corcoGrad.addColorStop(0.35, '#166534');
    corcoGrad.addColorStop(0.7, '#14532d');
    corcoGrad.addColorStop(1.0, '#064e3b');
    ctx.fillStyle = corcoGrad;
    ctx.beginPath();
    ctx.moveTo(mX - 620, height);
    ctx.bezierCurveTo(mX - 520, height * 0.76, mX - 340, height * 0.68, mX - 180, height * 0.64);
    ctx.lineTo(mX + 180, height * 0.64);
    ctx.bezierCurveTo(mX + 340, height * 0.68, mX + 520, height * 0.76, mX + 620, height);
    ctx.closePath();
    ctx.fill();

    // Rich Tropical Canopy Texture on Corcovado (Palms, Ceibas & Mata Atlântica)
    const drawMataTree = (tx, ty, r, c) => {
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc(tx, ty, r, 0, Math.PI * 2);
      ctx.fill();
    };
    const treeColors = ['#15803d', '#16a34a', '#22c55e', '#14532d', '#047857'];
    for (let tr = 0; tr < 45; tr++) {
      const tx = mX - 480 + (tr % 15) * 65 + (tr % 3) * 12;
      const ty = height * 0.67 + Math.floor(tr / 15) * 35;
      drawMataTree(tx, ty, 18 + (tr % 5) * 3, treeColors[tr % treeColors.length]);
    }
    ctx.restore();

    // ==========================================
    // EASTER EGG #3: Corcovado-Aussichtsplattform & Panorama (+5200)
    // (x: 1200, y: height * 0.72)
    // ==========================================
    const platY = height * 0.63;
    const platW = 460;
    ctx.save();
    // Concrete / Stone Viewing Deck
    const platGrad = ctx.createLinearGradient(mX - platW * 0.5, 0, mX + platW * 0.5, 0);
    platGrad.addColorStop(0, '#64748b');
    platGrad.addColorStop(0.2, '#94a3b8');
    platGrad.addColorStop(0.5, '#cbd5e1');
    platGrad.addColorStop(0.8, '#94a3b8');
    platGrad.addColorStop(1.0, '#64748b');
    ctx.fillStyle = platGrad;
    ctx.beginPath();
    ctx.roundRect(mX - platW * 0.5, platY, platW, 36, [14, 14, 4, 4]);
    ctx.fill();

    // Platform Railing (Balustrade overlooking Rio)
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(mX - platW * 0.48, platY - 8);
    ctx.lineTo(mX + platW * 0.48, platY - 8);
    ctx.stroke();
    // Vertical balusters
    for (let bx = mX - platW * 0.46; bx <= mX + platW * 0.46; bx += 24) {
      ctx.beginPath();
      ctx.moveTo(bx, platY - 8);
      ctx.lineTo(bx, platY);
      ctx.stroke();
    }

    // Bustling Tourists / Spectators on Platform
    const touristColors = ['#ef4444', '#3b82f6', '#f59e0b', '#10b981', '#ec4899', '#ffffff'];
    for (let ts = 0; ts < 12; ts++) {
      const tX = mX - 180 + ts * 32;
      ctx.fillStyle = touristColors[ts % touristColors.length];
      ctx.beginPath();
      ctx.ellipse(tX, platY + 14, 4, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      // Tourist Head
      ctx.fillStyle = '#fde68a';
      ctx.beginPath();
      ctx.arc(tX, platY + 2, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Pulsing Panoramic Viewpoint Halo
    const platPulse = (Math.sin(t * 3.2) + 1) * 0.5;
    ctx.strokeStyle = `rgba(250, 204, 21, ${0.28 + platPulse * 0.42})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(mX, platY + 18, 160, 30, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // 4. Statue Octagonal Pedestal (Capela de Nossa Senhora Aparecida Base)
    const pedW = 150;
    const pedH = 68;
    const pedY = platY - pedH;
    ctx.save();
    const pedGrad = ctx.createLinearGradient(mX - pedW * 0.5, 0, mX + pedW * 0.5, 0);
    pedGrad.addColorStop(0, '#475569');
    pedGrad.addColorStop(0.25, '#94a3b8');
    pedGrad.addColorStop(0.5, '#cbd5e1');
    pedGrad.addColorStop(0.75, '#94a3b8');
    pedGrad.addColorStop(1.0, '#475569');
    ctx.fillStyle = pedGrad;
    ctx.fillRect(mX - pedW * 0.5, pedY, pedW, pedH);

    // Pedestal Moulding & Steps
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(mX - pedW * 0.54, pedY + pedH - 8, pedW * 1.08, 8);
    ctx.fillRect(mX - pedW * 0.48, pedY - 6, pedW * 0.96, 6);

    // Chapel Doorway
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.roundRect(mX - 16, pedY + 18, 32, 44, [16, 16, 0, 0]);
    ctx.fill();
    ctx.restore();

    // 5. DIE KOLOSSALE STATUE: CHRISTUS DER ERLÖSER (Cristo Redentor)
    const stY = pedY - 6; // Base of statue feet
    const stTopY = height * 0.16; // Top of head
    const stH = stY - stTopY;
    ctx.save();

    // Art Deco Soapstone / Mosaic Robe (Pedra-sabão Pale Grey-Green Marble Tone)
    const robeGrad = ctx.createLinearGradient(mX - 55, 0, mX + 55, 0);
    robeGrad.addColorStop(0, '#94a3b8');
    robeGrad.addColorStop(0.18, '#cbd5e1');
    robeGrad.addColorStop(0.5, '#f8fafc');   // Central sunlit highlight
    robeGrad.addColorStop(0.82, '#e2e8f0');
    robeGrad.addColorStop(1.0, '#94a3b8');
    ctx.fillStyle = robeGrad;

    // Statue Main Body & Robe Column
    ctx.beginPath();
    ctx.moveTo(mX - 48, stY);
    ctx.lineTo(mX - 32, stTopY + 70);
    ctx.lineTo(mX + 32, stTopY + 70);
    ctx.lineTo(mX + 48, stY);
    ctx.closePath();
    ctx.fill();

    // Art Deco Fluted Robe Folds
    ctx.strokeStyle = 'rgba(100, 116, 139, 0.45)';
    ctx.lineWidth = 2;
    for (let f = -24; f <= 24; f += 8) {
      ctx.beginPath();
      ctx.moveTo(mX + f * 0.65, stTopY + 75);
      ctx.lineTo(mX + f * 1.35, stY - 4);
      ctx.stroke();
    }

    // Outstretched Colossal Art Deco Arms (28 Meter Wingspan)
    const armY = stTopY + 72;
    const armSpan = 420; // Wide outstretched arms
    const armGrad = ctx.createLinearGradient(0, armY - 14, 0, armY + 18);
    armGrad.addColorStop(0, '#f8fafc');
    armGrad.addColorStop(0.4, '#e2e8f0');
    armGrad.addColorStop(1.0, '#94a3b8');
    ctx.fillStyle = armGrad;

    // Left Arm
    ctx.beginPath();
    ctx.moveTo(mX - 28, armY - 12);
    ctx.lineTo(mX - armSpan * 0.5, armY - 8);
    ctx.lineTo(mX - armSpan * 0.5 - 14, armY);
    ctx.lineTo(mX - armSpan * 0.5, armY + 14);
    ctx.lineTo(mX - 28, armY + 22);
    ctx.closePath();
    ctx.fill();

    // Right Arm (Outstretched towards the East / Ocean)
    ctx.beginPath();
    ctx.moveTo(mX + 28, armY - 12);
    ctx.lineTo(mX + armSpan * 0.5, armY - 8);
    ctx.lineTo(mX + armSpan * 0.5 + 14, armY);
    ctx.lineTo(mX + armSpan * 0.5, armY + 14);
    ctx.lineTo(mX + 28, armY + 22);
    ctx.closePath();
    ctx.fill();

    // Art Deco Robe Sleeve Drapes
    ctx.fillStyle = '#cbd5e1';
    ctx.beginPath();
    ctx.moveTo(mX - 110, armY + 12);
    ctx.lineTo(mX - 180, armY + 45);
    ctx.lineTo(mX - 30, armY + 32);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(mX + 110, armY + 12);
    ctx.lineTo(mX + 180, armY + 45);
    ctx.lineTo(mX + 30, armY + 32);
    ctx.closePath();
    ctx.fill();

    // Hands (Open Welcoming Palms)
    ctx.fillStyle = '#f8fafc';
    // Left Hand
    ctx.beginPath();
    ctx.ellipse(mX - armSpan * 0.5 - 10, armY + 2, 9, 6, -0.15, 0, Math.PI * 2);
    ctx.fill();
    // Right Hand
    ctx.beginPath();
    ctx.ellipse(mX + armSpan * 0.5 + 10, armY + 2, 9, 6, 0.15, 0, Math.PI * 2);
    ctx.fill();

    // ==========================================
    // EASTER EGG #1: Segnende Hand von Christus (+6100)
    // (x: 1390, y: height * 0.32)
    // ==========================================
    const handX = mX + armSpan * 0.5 + 10;
    const handY = armY + 2;
    const blessPulse = (Math.sin(t * 3.8) + 1) * 0.5;
    // Divine Blessing Radiance / Stigmatic Glow
    const blessGrad = ctx.createRadialGradient(handX, handY, 4, handX, handY, 48);
    blessGrad.addColorStop(0, `rgba(255, 255, 255, ${0.85 + blessPulse * 0.15})`);
    blessGrad.addColorStop(0.35, `rgba(254, 240, 138, ${0.55 + blessPulse * 0.35})`);
    blessGrad.addColorStop(0.75, `rgba(245, 158, 11, ${0.25 + blessPulse * 0.20})`);
    blessGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = blessGrad;
    ctx.beginPath();
    ctx.arc(handX, handY, 48, 0, Math.PI * 2);
    ctx.fill();

    // Blessing Star Cross
    ctx.strokeStyle = `rgba(254, 240, 138, ${0.7 + blessPulse * 0.3})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(handX - 22, handY);
    ctx.lineTo(handX + 22, handY);
    ctx.moveTo(handX, handY - 22);
    ctx.lineTo(handX, handY + 22);
    ctx.stroke();

    // Statue Neck & Head
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(mX - 9, stTopY + 48, 18, 16);

    // Sculpted Head & Hair (Art Deco Cristo Head with downward gentle gaze)
    const headGrad = ctx.createLinearGradient(mX - 16, stTopY, mX + 16, stTopY + 48);
    headGrad.addColorStop(0, '#f8fafc');
    headGrad.addColorStop(0.7, '#cbd5e1');
    headGrad.addColorStop(1.0, '#94a3b8');
    ctx.fillStyle = headGrad;
    ctx.beginPath();
    ctx.ellipse(mX, stTopY + 28, 16, 22, 0, 0, Math.PI * 2);
    ctx.fill();

    // Hair & Crown Line
    ctx.fillStyle = '#64748b';
    ctx.beginPath();
    ctx.arc(mX, stTopY + 18, 15, Math.PI * 0.85, Math.PI * 2.15);
    ctx.fill();

    // Gentle Facial Features in Art Deco Carving
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1.4;
    // Eyes
    ctx.beginPath();
    ctx.moveTo(mX - 7, stTopY + 24);
    ctx.lineTo(mX - 2, stTopY + 25);
    ctx.moveTo(mX + 2, stTopY + 25);
    ctx.lineTo(mX + 7, stTopY + 24);
    // Nose
    ctx.moveTo(mX, stTopY + 22);
    ctx.lineTo(mX, stTopY + 31);
    // Beard
    ctx.moveTo(mX - 5, stTopY + 36);
    ctx.lineTo(mX + 5, stTopY + 36);
    ctx.stroke();

    // Sacred Heart of Jesus in Relief on Chest (Corcovado Cristo heart)
    ctx.fillStyle = 'rgba(239, 68, 68, 0.55)';
    ctx.beginPath();
    ctx.arc(mX - 3, stTopY + 98, 4, 0, Math.PI * 2);
    ctx.arc(mX + 3, stTopY + 98, 4, 0, Math.PI * 2);
    ctx.lineTo(mX, stTopY + 107);
    ctx.closePath();
    ctx.fill();

    // Halo Aura atop Christ the Redeemer
    const haloPulse = (Math.sin(t * 2.8) + 1) * 0.5;
    ctx.strokeStyle = `rgba(254, 240, 138, ${0.45 + haloPulse * 0.4})`;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(mX, stTopY + 24, 38, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();

    // 6. Foreground Framing Jungle Palms on Mountaintop
    const drawRioPalmFrond = (px, py, scale, flip) => {
      ctx.save();
      ctx.translate(px, py);
      if (flip) ctx.scale(-1, 1);
      ctx.scale(scale, scale);

      ctx.fillStyle = '#14532d';
      for (let f = 0; f < 8; f++) {
        const fAngle = -0.6 + f * 0.16;
        ctx.beginPath();
        ctx.ellipse(Math.cos(fAngle) * 58, Math.sin(fAngle) * 44, 58, 12, fAngle, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = '#22c55e';
      for (let f = 0; f < 6; f++) {
        const fAngle = -0.5 + f * 0.18;
        ctx.beginPath();
        ctx.ellipse(Math.cos(fAngle) * 46, Math.sin(fAngle) * 34, 44, 9, fAngle, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    drawRioPalmFrond(90, height * 0.65, 1.35, false);
    drawRioPalmFrond(160, height * 0.85, 1.25, false);
    drawRioPalmFrond(width - 90, height * 0.62, 1.35, true);
    drawRioPalmFrond(width - 160, height * 0.82, 1.2, true);

    ctx.restore();
  }

  _renderGreatWallChina(ctx, width, height, t) {
    ctx.save();

    // 1. Dramatischer chinesischer Gebirgshimmel mit Wolkenschleiern und Gewitterdämmerung
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.75);
    skyGrad.addColorStop(0, '#1e293b');    // Deep Slate Indigo
    skyGrad.addColorStop(0.25, '#334155'); // Stormy Mountain Sky
    skyGrad.addColorStop(0.55, '#475569'); // Mist Veil
    skyGrad.addColorStop(0.8, '#64748b');  // Horizon Mountain Fog
    skyGrad.addColorStop(1.0, '#94a3b8');  // Pale Dawn Mist
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // Entferntes, seltenes Himmelsleuchten / Blitzschein in den Wolken
    const lightningGlow = (Math.sin(t * 0.75) + 1) * 0.5;
    if (lightningGlow > 0.92) {
      const flashAlpha = (lightningGlow - 0.92) * 0.25;
      const flashGrad = ctx.createRadialGradient(width * 0.45, height * 0.18, 50, width * 0.45, height * 0.18, 550);
      flashGrad.addColorStop(0, `rgba(224, 242, 254, ${flashAlpha * 0.8})`);
      flashGrad.addColorStop(0.5, `rgba(186, 230, 253, ${flashAlpha * 0.4})`);
      flashGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = flashGrad;
      ctx.fillRect(0, 0, width, height * 0.6);
    }

    // Ferne dunstige Wolkenbänke über den Gipfeln
    for (let c = 0; c < 6; c++) {
      const cx = (c * 420 + t * 8) % (width + 300) - 150;
      const cy = 60 + (c % 3) * 45;
      ctx.fillStyle = 'rgba(203, 213, 225, 0.22)';
      ctx.beginPath();
      ctx.ellipse(cx, cy, 210, 48, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Weit entfernte nebelverhangene Bergketten (Distant Blue-Green Mountain Ranges - Shanshui Style)
    const drawMountainRange = (baseY, amp, color, ridgeStep, fogAlpha) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(0, baseY);
      for (let x = 0; x <= width; x += ridgeStep) {
        const peak = Math.sin(x * 0.0022) * amp * 0.6 + Math.sin(x * 0.0068 + 1.2) * amp * 0.4;
        ctx.lineTo(x, baseY + peak);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      // Bergnebel-Schleier im Tal
      const fogGrad = ctx.createLinearGradient(0, baseY - 20, 0, baseY + amp + 60);
      fogGrad.addColorStop(0, `rgba(241, 245, 249, 0)`);
      fogGrad.addColorStop(0.65, `rgba(241, 245, 249, ${fogAlpha})`);
      fogGrad.addColorStop(1, `rgba(241, 245, 249, 0)`);
      ctx.fillStyle = fogGrad;
      ctx.fillRect(0, baseY - 20, width, amp + 80);
    };

    // Weite Bergkette 1 (Dunkles Schieferblau / Jade-Nebel)
    drawMountainRange(height * 0.38, 90, '#334155', 40, 0.25);
    // Mittlere Bergkette 2 (Tiefes Nadelwald-Grün / Gebirgskamm)
    drawMountainRange(height * 0.46, 110, '#1e3a2f', 30, 0.30);
    // Vordere Bergkette 3 (Sattes Bergkamm-Grün)
    drawMountainRange(height * 0.54, 120, '#164e3b', 24, 0.22);

    // 3. Der Zickzack-Wall der Großen Mauer über den Bergkamm (The Great Wall Stone Wall)
    const wallPoints = [];
    const wallSteps = 90;
    for (let i = 0; i <= wallSteps; i++) {
      const wx = (i / wallSteps) * width;
      const wy = height * 0.48 + 
                 Math.sin(wx * 0.0035) * 65 + 
                 Math.cos(wx * 0.0075 + 0.8) * 45 + 
                 Math.sin(wx * 0.015) * 22;
      wallPoints.push({ x: wx, y: wy });
    }

    // Unterbau der Mauer (Massiver Stein-Wall & Festungsbasis)
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.moveTo(wallPoints[0].x, height);
    ctx.lineTo(wallPoints[0].x, wallPoints[0].y + 35);
    for (let p of wallPoints) {
      ctx.lineTo(p.x, p.y + 35);
    }
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();

    // Grüne Hänge direkt unter der Mauer
    const slopeGrad = ctx.createLinearGradient(0, height * 0.5, 0, height);
    slopeGrad.addColorStop(0, '#14532d');
    slopeGrad.addColorStop(0.5, '#166534');
    slopeGrad.addColorStop(1, '#0f3d24');
    ctx.fillStyle = slopeGrad;
    ctx.beginPath();
    ctx.moveTo(wallPoints[0].x, height);
    ctx.lineTo(wallPoints[0].x, wallPoints[0].y + 45);
    for (let p of wallPoints) {
      ctx.lineTo(p.x, p.y + 45);
    }
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();

    // Steinquader-Mauerwerk (Granite Stone Wall Body)
    const wallBodyGrad = ctx.createLinearGradient(0, height * 0.4, 0, height * 0.65);
    wallBodyGrad.addColorStop(0, '#94a3b8');
    wallBodyGrad.addColorStop(0.5, '#64748b');
    wallBodyGrad.addColorStop(1, '#475569');
    ctx.fillStyle = wallBodyGrad;
    ctx.beginPath();
    ctx.moveTo(wallPoints[0].x, wallPoints[0].y + 38);
    for (let p of wallPoints) {
      ctx.lineTo(p.x, p.y + 38);
    }
    for (let i = wallPoints.length - 1; i >= 0; i--) {
      ctx.lineTo(wallPoints[i].x, wallPoints[i].y);
    }
    ctx.closePath();
    ctx.fill();

    // Gepflasterte Krone / Gehweg der Mauer
    ctx.fillStyle = '#cbd5e1';
    ctx.beginPath();
    ctx.moveTo(wallPoints[0].x, wallPoints[0].y + 6);
    for (let p of wallPoints) {
      ctx.lineTo(p.x, p.y + 6);
    }
    for (let i = wallPoints.length - 1; i >= 0; i--) {
      ctx.lineTo(wallPoints[i].x, wallPoints[i].y);
    }
    ctx.closePath();
    ctx.fill();

    // Zinnen & Schießscharten entlang des Zickzack-Walls (Crenellations & Merlons)
    ctx.fillStyle = '#94a3b8';
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.2;
    for (let i = 0; i < wallPoints.length - 1; i += 2) {
      const p = wallPoints[i];
      // Zinne
      ctx.fillRect(p.x, p.y - 8, 14, 8);
      ctx.strokeRect(p.x, p.y - 8, 14, 8);
      // Schießscharte
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(p.x + 4, p.y - 5, 5, 4);
      ctx.fillStyle = '#94a3b8';
    }

    // Funktion zum Zeichnen chinesischer Festungs-Wachtürme mit Pagodendach
    const drawChineseWatchtower = (tx, ty, scale, hasFlames, hasDragon) => {
      ctx.save();
      ctx.translate(tx, ty);
      ctx.scale(scale, scale);

      // Massives Steinfundament des Wachturms
      const towerGrad = ctx.createLinearGradient(-45, -50, 45, 50);
      towerGrad.addColorStop(0, '#cbd5e1');
      towerGrad.addColorStop(0.5, '#64748b');
      towerGrad.addColorStop(1, '#334155');
      ctx.fillStyle = towerGrad;
      ctx.beginPath();
      ctx.moveTo(-42, 50);
      ctx.lineTo(-36, -30);
      ctx.lineTo(36, -30);
      ctx.lineTo(42, 50);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Rundbogen-Tor / Schießscharten im Turm
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(0, 20, 14, Math.PI, 0);
      ctx.lineTo(14, 48);
      ctx.lineTo(-14, 48);
      ctx.closePath();
      ctx.fill();

      // Schießscharten-Fenster
      ctx.fillRect(-24, -14, 8, 12);
      ctx.fillRect(16, -14, 8, 12);
      ctx.fillRect(-5, -16, 10, 10);

      // Zinnenplattform oben
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(-44, -36, 88, 8);
      for (let z = -44; z <= 34; z += 18) {
        ctx.fillRect(z, -44, 10, 8);
      }

      // Traditioneller chinesischer Pavillon-Aufbau auf dem Turm
      const roofGrad = ctx.createLinearGradient(-40, -70, 40, -40);
      roofGrad.addColorStop(0, '#b91c1c'); // Kaiserliches Zinnoberrot
      roofGrad.addColorStop(0.7, '#991b1b');
      roofGrad.addColorStop(1, '#7f1d1d');
      ctx.fillStyle = roofGrad;

      // Pavillon-Säulen
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(-22, -60, 6, 24);
      ctx.fillRect(16, -60, 6, 24);
      ctx.fillRect(-3, -60, 6, 24);

      // Geschwungenes Pagodendach mit nach oben gebogenen Traufen
      ctx.fillStyle = roofGrad;
      ctx.beginPath();
      ctx.moveTo(-54, -60);
      ctx.quadraticCurveTo(-25, -68, 0, -82);
      ctx.quadraticCurveTo(25, -68, 54, -60);
      ctx.quadraticCurveTo(35, -56, 0, -68);
      ctx.quadraticCurveTo(-35, -56, -54, -60);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#f59e0b'; // Goldene Dachzierkante
      ctx.lineWidth = 2;
      ctx.stroke();

      // Goldene Dachspitze / Zierkugel
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(0, -85, 5, 0, Math.PI * 2);
      ctx.fill();

      // Flatternde kaiserliche Banner
      const bannerWave = Math.sin(t * 3.5 + tx * 0.01) * 6;
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.moveTo(34, -40);
      ctx.lineTo(48 + bannerWave, -36);
      ctx.lineTo(34, -28);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    // Standard Wachtürme entlang der Mauer
    drawChineseWatchtower(260, height * 0.47, 0.85, false, false);
    drawChineseWatchtower(880, height * 0.44, 0.95, false, false);
    drawChineseWatchtower(1540, height * 0.49, 0.90, false, false);
    drawChineseWatchtower(2180, height * 0.52, 1.05, false, false);

    // ==========================================
    // EASTER EGG #1: Kaiserlicher Signalfeuerturm (+6200)
    // (x: 1220, y: height * 0.35)
    // ==========================================
    const egg1X = 1220;
    const egg1Y = height * 0.35;
    ctx.save();
    drawChineseWatchtower(egg1X, egg1Y + 30, 1.25, true, false);

    // Loderndes Signalfeuer auf der Spitze (Signal Fire Pyre)
    const firePulse = (Math.sin(t * 7.5) + 1) * 0.5;
    const beaconGrad = ctx.createRadialGradient(egg1X, egg1Y - 72, 8, egg1X, egg1Y - 72, 85);
    beaconGrad.addColorStop(0, `rgba(255, 255, 255, ${0.9 + firePulse * 0.1})`);
    beaconGrad.addColorStop(0.25, `rgba(254, 240, 138, ${0.75 + firePulse * 0.25})`);
    beaconGrad.addColorStop(0.65, `rgba(249, 115, 22, ${0.45 + firePulse * 0.3})`);
    beaconGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');
    ctx.fillStyle = beaconGrad;
    ctx.beginPath();
    ctx.arc(egg1X, egg1Y - 72, 85, 0, Math.PI * 2);
    ctx.fill();

    // Feuerschale & lodernde Flammenzungen
    ctx.fillStyle = '#78350f'; // Bronze-Kessel
    ctx.beginPath();
    ctx.ellipse(egg1X, egg1Y - 60, 22, 9, 0, 0, Math.PI * 2);
    ctx.fill();

    // Wilde Flammenzungen
    ctx.fillStyle = '#f97316';
    for (let f = -16; f <= 16; f += 8) {
      const fH = 26 + Math.sin(t * 12 + f) * 12;
      ctx.beginPath();
      ctx.moveTo(egg1X + f - 6, egg1Y - 62);
      ctx.lineTo(egg1X + f, egg1Y - 62 - fH);
      ctx.lineTo(egg1X + f + 6, egg1Y - 62);
      ctx.closePath();
      ctx.fill();
    }
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(egg1X, egg1Y - 70, 9 + firePulse * 4, 0, Math.PI * 2);
    ctx.fill();

    // Weithin sichtbarer goldener Rauch & Funkeln
    ctx.strokeStyle = `rgba(254, 240, 138, ${0.4 + firePulse * 0.4})`;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(egg1X, egg1Y - 30, 48, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // ==========================================
    // EASTER EGG #2: Goldener Drachen-Wachturm (+5700)
    // (x: 1850, y: height * 0.42)
    // ==========================================
    const egg2X = 1850;
    const egg2Y = height * 0.42;
    ctx.save();
    drawChineseWatchtower(egg2X, egg2Y + 25, 1.20, false, true);

    // Goldene Drachen-Aura
    const dragonPulse = (Math.sin(t * 3.8) + 1) * 0.5;
    const dragAura = ctx.createRadialGradient(egg2X, egg2Y - 45, 6, egg2X, egg2Y - 45, 65);
    dragAura.addColorStop(0, `rgba(254, 240, 138, ${0.85 + dragonPulse * 0.15})`);
    dragAura.addColorStop(0.45, `rgba(245, 158, 11, ${0.5 + dragonPulse * 0.3})`);
    dragAura.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = dragAura;
    ctx.beginPath();
    ctx.arc(egg2X, egg2Y - 45, 65, 0, Math.PI * 2);
    ctx.fill();

    // Goldener Drachen-Standartenstab mit Kaiserflagge
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(egg2X - 25, egg2Y - 75);
    ctx.lineTo(egg2X - 25, egg2Y - 20);
    ctx.stroke();

    // Goldenes Drachen-Emblem / Perle
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(egg2X - 25, egg2Y - 78, 6, 0, Math.PI * 2);
    ctx.fill();

    // Goldene Drachenfahne im Wind
    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.moveTo(egg2X - 24, egg2Y - 75);
    ctx.quadraticCurveTo(egg2X - 2, egg2Y - 70 + Math.sin(t * 4) * 6, egg2X + 16, egg2Y - 68);
    ctx.lineTo(egg2X + 14, egg2Y - 52);
    ctx.quadraticCurveTo(egg2X - 4, egg2Y - 54 + Math.sin(t * 4) * 6, egg2X - 24, egg2Y - 58);
    ctx.closePath();
    ctx.fill();

    // Schimmernder Goldring
    ctx.strokeStyle = `rgba(254, 240, 138, ${0.5 + dragonPulse * 0.45})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(egg2X, egg2Y - 15, 42, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // ==========================================
    // EASTER EGG #3: Uraltes Mauer-Zickzack-Tor (+5300)
    // (x: 540, y: height * 0.58)
    // ==========================================
    const egg3X = 540;
    const egg3Y = height * 0.58;
    ctx.save();
    // Großes Festungstor (Pass-Tor / Shanhaiguan-Stil)
    const gateGrad = ctx.createLinearGradient(egg3X - 55, egg3Y - 50, egg3X + 55, egg3Y + 45);
    gateGrad.addColorStop(0, '#64748b');
    gateGrad.addColorStop(0.5, '#475569');
    gateGrad.addColorStop(1, '#1e293b');
    ctx.fillStyle = gateGrad;
    ctx.beginPath();
    ctx.roundRect(egg3X - 52, egg3Y - 45, 104, 85, [8, 8, 0, 0]);
    ctx.fill();
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Zickzack-Mauerbogen (Gewölbe)
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(egg3X, egg3Y + 10, 26, Math.PI, 0);
    ctx.lineTo(egg3X + 26, egg3Y + 40);
    ctx.lineTo(egg3X - 26, egg3Y + 40);
    ctx.closePath();
    ctx.fill();

    // Holztorflügel mit Eisenbeschlägen
    ctx.fillStyle = '#78350f';
    ctx.fillRect(egg3X - 23, egg3Y + 8, 22, 32);
    ctx.fillRect(egg3X + 1, egg3Y + 8, 22, 32);
    ctx.fillStyle = '#d97706';
    // Goldene Eisen-Nieten
    for (let r = 0; r < 3; r++) {
      ctx.beginPath();
      ctx.arc(egg3X - 12, egg3Y + 14 + r * 10, 2.5, 0, Math.PI * 2);
      ctx.arc(egg3X + 12, egg3Y + 14 + r * 10, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Rote Tempellaternen am Tor
    const lanternPulse = (Math.sin(t * 3.2) + 1) * 0.5;
    const drawGateLantern = (lx, ly) => {
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.ellipse(lx, ly, 7, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(lx - 4, ly - 11, 8, 3);
      ctx.fillRect(lx - 4, ly + 8, 8, 3);
      // Laternen-Schein
      const lg = ctx.createRadialGradient(lx, ly, 2, lx, ly, 20);
      lg.addColorStop(0, `rgba(254, 240, 138, ${0.7 + lanternPulse * 0.3})`);
      lg.addColorStop(1, 'rgba(239, 68, 68, 0)');
      ctx.fillStyle = lg;
      ctx.beginPath();
      ctx.arc(lx, ly, 20, 0, Math.PI * 2);
      ctx.fill();
    };
    drawGateLantern(egg3X - 42, egg3Y - 10);
    drawGateLantern(egg3X + 42, egg3Y - 10);

    // Tor-Zinnen & Schild
    ctx.fillStyle = '#b91c1c';
    ctx.fillRect(egg3X - 30, egg3Y - 38, 60, 14);
    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 9px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('天下第一關', egg3X, egg3Y - 28);

    // Mystisches Glitzern
    ctx.strokeStyle = `rgba(254, 240, 138, ${0.45 + lanternPulse * 0.4})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(egg3X, egg3Y + 4, 46, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // 4. Vordergrund-Rahmung: Alte chinesische Bergkiefern & neblige Hänge
    const drawChineseMountainPine = (px, py, scale, flip) => {
      ctx.save();
      ctx.translate(px, py);
      if (flip) ctx.scale(-1, 1);
      ctx.scale(scale, scale);

      // Gekrümmter, knorriger Kiefernstamm
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 14;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(0, 140);
      ctx.quadraticCurveTo(-40, 60, -25, 0);
      ctx.quadraticCurveTo(-15, -45, 20, -70);
      ctx.stroke();

      // Dicke Äste
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(-28, 20);
      ctx.quadraticCurveTo(-65, 0, -95, 10);
      ctx.moveTo(-18, -25);
      ctx.quadraticCurveTo(45, -35, 75, -20);
      ctx.stroke();

      // Kiefernnadel-Büschel (Fächerförmige Wolkenpolster)
      const drawPineTuft = (tx, ty, r) => {
        ctx.fillStyle = '#064e3b';
        ctx.beginPath();
        ctx.arc(tx, ty, r, Math.PI * 0.8, Math.PI * 2.2);
        ctx.fill();
        ctx.fillStyle = '#047857';
        ctx.beginPath();
        ctx.arc(tx, ty - 3, r * 0.75, Math.PI * 0.8, Math.PI * 2.2);
        ctx.fill();
      };

      drawPineTuft(-95, 10, 32);
      drawPineTuft(-65, -8, 28);
      drawPineTuft(20, -70, 38);
      drawPineTuft(75, -20, 34);
      drawPineTuft(50, -42, 30);
      drawPineTuft(-25, -60, 32);

      ctx.restore();
    };

    drawChineseMountainPine(110, height * 0.65, 1.15, false);
    drawChineseMountainPine(190, height * 0.82, 0.95, false);
    drawChineseMountainPine(width - 120, height * 0.62, 1.25, true);
    drawChineseMountainPine(width - 210, height * 0.80, 1.05, true);

    ctx.restore();
  }

  _renderMachuPicchu(ctx, width, height, t) {
    ctx.save();

    // 1. Anden-Regenhimmel mit tiefhängenden Dunstwolken (Moody Andean Rain Sky)
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.7);
    skyGrad.addColorStop(0, '#1e293b');    // Dunkles Schiefergrau
    skyGrad.addColorStop(0.3, '#334155');  // Regenwolken über den Gipfeln
    skyGrad.addColorStop(0.65, '#475569'); // Dunstiger Nebelhorizont
    skyGrad.addColorStop(0.85, '#94a3b8'); // Weißgrauer Talnebel
    skyGrad.addColorStop(1.0, '#cbd5e1');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Weit entfernte Urwald- & Andengipfel (Distant Emerald Andean Peaks)
    const drawAndeanMountain = (baseX, baseY, w, h, color) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(baseX - w * 0.5, baseY + h);
      ctx.lineTo(baseX - w * 0.2, baseY + h * 0.3);
      ctx.lineTo(baseX, baseY);
      ctx.lineTo(baseX + w * 0.25, baseY + h * 0.35);
      ctx.lineTo(baseX + w * 0.5, baseY + h);
      ctx.closePath();
      ctx.fill();
    };

    // Weite Bergketten im Hintergrund
    drawAndeanMountain(width * 0.22, height * 0.18, 550, 400, '#1e3a2f');
    drawAndeanMountain(width * 0.78, height * 0.20, 620, 380, '#134e4a');

    // Der weltberühmte, markante Zuckerhut-Gipfel: HUAYNA PICCHU
    const hpX = width * 0.48;
    const hpY = height * 0.12;
    const huaynaGrad = ctx.createLinearGradient(hpX - 160, hpY, hpX + 160, hpY + 360);
    huaynaGrad.addColorStop(0, '#064e3b'); // Dichter Bergnebelwald
    huaynaGrad.addColorStop(0.4, '#047857');
    huaynaGrad.addColorStop(0.7, '#15803d');
    huaynaGrad.addColorStop(1.0, '#166534');
    ctx.fillStyle = huaynaGrad;
    ctx.beginPath();
    ctx.moveTo(hpX - 220, hpY + 360);
    ctx.bezierCurveTo(hpX - 180, hpY + 220, hpX - 120, hpY + 90, hpX - 15, hpY);
    ctx.bezierCurveTo(hpX + 15, hpY, hpX + 60, hpY + 80, hpX + 110, hpY + 200);
    ctx.bezierCurveTo(hpX + 140, hpY + 260, hpX + 180, hpY + 310, hpX + 240, hpY + 360);
    ctx.closePath();
    ctx.fill();

    // Steile Granitfelsklippen an der Ostwand des Huayna Picchu
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
    ctx.lineWidth = 2.5;
    for (let s = -80; s <= 90; s += 25) {
      ctx.beginPath();
      ctx.moveTo(hpX + s * 0.7, hpY + 80 + Math.abs(s) * 1.2);
      ctx.lineTo(hpX + s * 1.1, hpY + 280);
      ctx.stroke();
    }

    // 3. Die Inka-Terrassen (Andenes de Machu Picchu)
    const terraces = [
      { y: height * 0.45, h: 36, insetL: 80, insetR: 120 },
      { y: height * 0.50, h: 42, insetL: 40, insetR: 80 },
      { y: height * 0.56, h: 48, insetL: 20, insetR: 40 },
      { y: height * 0.63, h: 56, insetL: 0, insetR: 20 },
      { y: height * 0.71, h: 68, insetL: -20, insetR: 0 },
      { y: height * 0.80, h: 80, insetL: -40, insetR: -20 },
      { y: height * 0.90, h: 90, insetL: -60, insetR: -40 }
    ];

    for (let tIdx = 0; tIdx < terraces.length; tIdx++) {
      const terr = terraces[tIdx];
      // Steile Trockenstein-Stützmauer (Inca Dry Stone Retaining Wall)
      const wallGrad = ctx.createLinearGradient(0, terr.y, 0, terr.y + terr.h);
      wallGrad.addColorStop(0, '#94a3b8');
      wallGrad.addColorStop(0.5, '#64748b');
      wallGrad.addColorStop(1, '#334155');
      ctx.fillStyle = wallGrad;
      ctx.beginPath();
      ctx.moveTo(terr.insetL, terr.y + terr.h);
      ctx.lineTo(terr.insetL + 25, terr.y + 12);
      ctx.lineTo(width - terr.insetR - 25, terr.y + 12);
      ctx.lineTo(width - terr.insetR, terr.y + terr.h);
      ctx.closePath();
      ctx.fill();

      // Trockensteinquader-Fugen
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1.2;
      for (let bx = terr.insetL + 30; bx < width - terr.insetR - 30; bx += 38) {
        ctx.beginPath();
        ctx.moveTo(bx, terr.y + 12);
        ctx.lineTo(bx + (tIdx % 2 === 0 ? 4 : -4), terr.y + terr.h);
        ctx.stroke();
      }

      // Saftig grüne Terrassen-Grasfläche oben (Anden-Hochlandgras)
      const grassGrad = ctx.createLinearGradient(0, terr.y, 0, terr.y + 16);
      grassGrad.addColorStop(0, '#84cc16'); // Frischgrün durch Regen
      grassGrad.addColorStop(0.6, '#4d7c0f');
      grassGrad.addColorStop(1.0, '#3f6212');
      ctx.fillStyle = grassGrad;
      ctx.beginPath();
      ctx.moveTo(terr.insetL + 15, terr.y + 12);
      ctx.lineTo(terr.insetL + 35, terr.y);
      ctx.lineTo(width - terr.insetR - 15, terr.y);
      ctx.lineTo(width - terr.insetR - 30, terr.y + 12);
      ctx.closePath();
      ctx.fill();
    }

    // 4. Typische Inka-Steinhäuser mit Satteldach & trapezförmigen Öffnungen
    const drawIncaHouse = (hx, hy, scale, hasRoof) => {
      ctx.save();
      ctx.translate(hx, hy);
      ctx.scale(scale, scale);

      // Massives Granitmauerwerk
      const houseGrad = ctx.createLinearGradient(-35, -30, 35, 30);
      houseGrad.addColorStop(0, '#cbd5e1');
      houseGrad.addColorStop(0.6, '#64748b');
      houseGrad.addColorStop(1.0, '#475569');
      ctx.fillStyle = houseGrad;

      // Giebelwand
      ctx.beginPath();
      ctx.moveTo(-32, 28);
      ctx.lineTo(-32, -18);
      ctx.lineTo(0, -42);
      ctx.lineTo(32, -18);
      ctx.lineTo(32, 28);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Typische trapezförmige Inka-Tür (unten breiter als oben)
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.moveTo(-10, 28);
      ctx.lineTo(-7, 2);
      ctx.lineTo(7, 2);
      ctx.lineTo(10, 28);
      ctx.closePath();
      ctx.fill();

      // Trapezförmige Nischen/Fenster
      ctx.beginPath();
      ctx.moveTo(-24, -4);
      ctx.lineTo(-22, -16);
      ctx.lineTo(-14, -16);
      ctx.lineTo(-12, -4);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(12, -4);
      ctx.lineTo(14, -16);
      ctx.lineTo(22, -16);
      ctx.lineTo(24, -4);
      ctx.closePath();
      ctx.fill();

      // Strohgedecktes Andendach (Ichu-Grasdach)
      if (hasRoof) {
        const thatchGrad = ctx.createLinearGradient(0, -52, 0, -18);
        thatchGrad.addColorStop(0, '#d97706');
        thatchGrad.addColorStop(0.7, '#b45309');
        thatchGrad.addColorStop(1.0, '#92400e');
        ctx.fillStyle = thatchGrad;
        ctx.beginPath();
        ctx.moveTo(-42, -15);
        ctx.lineTo(0, -52);
        ctx.lineTo(42, -15);
        ctx.lineTo(32, -22);
        ctx.lineTo(0, -45);
        ctx.lineTo(-32, -22);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#78350f';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      ctx.restore();
    };

    // Steinhäuser der Inka-Zitadelle
    drawIncaHouse(380, height * 0.48, 0.9, true);
    drawIncaHouse(490, height * 0.49, 0.85, false);
    drawIncaHouse(980, height * 0.52, 1.0, false);
    drawIncaHouse(1480, height * 0.53, 0.95, true);
    drawIncaHouse(1960, height * 0.56, 1.1, true);
    drawIncaHouse(2080, height * 0.58, 0.95, false);

    // ==========================================
    // EASTER EGG #1: Sonnentempel von Machu Picchu (Torreón) (+6300)
    // (x: 1240, y: height * 0.46)
    // ==========================================
    const egg1X = 1240;
    const egg1Y = height * 0.46;
    ctx.save();
    const torGrad = ctx.createLinearGradient(egg1X - 45, egg1Y - 40, egg1X + 45, egg1Y + 40);
    torGrad.addColorStop(0, '#f8fafc');
    torGrad.addColorStop(0.4, '#cbd5e1');
    torGrad.addColorStop(0.8, '#64748b');
    torGrad.addColorStop(1.0, '#334155');
    ctx.fillStyle = torGrad;

    // Halbrunde organische Tempelwand
    ctx.beginPath();
    ctx.ellipse(egg1X, egg1Y + 12, 42, 28, 0, 0, Math.PI);
    ctx.lineTo(egg1X + 42, egg1Y - 24);
    ctx.ellipse(egg1X, egg1Y - 24, 42, 20, 0, 0, Math.PI, true);
    ctx.lineTo(egg1X - 42, egg1Y + 12);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Heiliges Sonnenwendfenster (Solstice Window)
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.moveTo(egg1X - 12, egg1Y - 8);
    ctx.lineTo(egg1X - 9, egg1Y - 24);
    ctx.lineTo(egg1X + 9, egg1Y - 24);
    ctx.lineTo(egg1X + 12, egg1Y - 8);
    ctx.closePath();
    ctx.fill();

    // Goldene Strahlenaura der Inka-Sonne
    const sunPulse = (Math.sin(t * 3.6) + 1) * 0.5;
    const sunGrad = ctx.createRadialGradient(egg1X, egg1Y - 16, 4, egg1X, egg1Y - 16, 68);
    sunGrad.addColorStop(0, `rgba(255, 255, 255, ${0.9 + sunPulse * 0.1})`);
    sunGrad.addColorStop(0.35, `rgba(254, 240, 138, ${0.65 + sunPulse * 0.35})`);
    sunGrad.addColorStop(0.75, `rgba(245, 158, 11, ${0.3 + sunPulse * 0.25})`);
    sunGrad.addColorStop(1.0, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(egg1X, egg1Y - 16, 68, 0, Math.PI * 2);
    ctx.fill();

    // Goldener Inka-Sonnenschein-Ring
    ctx.strokeStyle = `rgba(254, 240, 138, ${0.55 + sunPulse * 0.45})`;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(egg1X, egg1Y - 16, 45, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // ==========================================
    // EASTER EGG #2: Heiliger Intihuatana-Sonnensitz (+5800)
    // (x: 720, y: height * 0.38)
    // ==========================================
    const egg2X = 720;
    const egg2Y = height * 0.38;
    ctx.save();
    const intGrad = ctx.createLinearGradient(egg2X - 45, egg2Y - 30, egg2X + 45, egg2Y + 40);
    intGrad.addColorStop(0, '#e2e8f0');
    intGrad.addColorStop(0.5, '#94a3b8');
    intGrad.addColorStop(1.0, '#475569');
    ctx.fillStyle = intGrad;
    ctx.beginPath();
    ctx.moveTo(egg2X - 44, egg2Y + 28);
    ctx.lineTo(egg2X - 28, egg2Y - 8);
    ctx.lineTo(egg2X + 28, egg2Y - 8);
    ctx.lineTo(egg2X + 44, egg2Y + 28);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Der senkrecht gemeißelte Intihuatana-Säulenstein
    ctx.fillStyle = '#64748b';
    ctx.fillRect(egg2X - 8, egg2Y - 32, 16, 24);
    ctx.strokeStyle = '#1e293b';
    ctx.strokeRect(egg2X - 8, egg2Y - 32, 16, 24);

    // Astronomisches Sonnensitz-Glühen
    const intiPulse = (Math.sin(t * 4.2) + 1) * 0.5;
    const intiAura = ctx.createRadialGradient(egg2X, egg2Y - 22, 4, egg2X, egg2Y - 22, 54);
    intiAura.addColorStop(0, `rgba(254, 240, 138, ${0.85 + intiPulse * 0.15})`);
    intiAura.addColorStop(0.5, `rgba(234, 179, 8, ${0.45 + intiPulse * 0.3})`);
    intiAura.addColorStop(1.0, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = intiAura;
    ctx.beginPath();
    ctx.arc(egg2X, egg2Y - 22, 54, 0, Math.PI * 2);
    ctx.fill();

    // Sonnenuhr-Krone
    ctx.strokeStyle = `rgba(254, 240, 138, ${0.6 + intiPulse * 0.4})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(egg2X, egg2Y - 22, 38, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // ==========================================
    // EASTER EGG #3: Terrassen-Inka-Lama (+5400)
    // (x: 1720, y: height * 0.64)
    // ==========================================
    const egg3X = 1720;
    const egg3Y = height * 0.64;
    ctx.save();
    ctx.translate(egg3X, egg3Y);

    const llamaChew = Math.sin(t * 3.8) * 3;
    const llamaHeadY = -34 + Math.sin(t * 2.2) * 2;

    // Beine des Lamas
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(-22, 8, 7, 26);
    ctx.fillRect(-10, 8, 7, 26);
    ctx.fillRect(8, 8, 7, 26);
    ctx.fillRect(20, 8, 7, 26);
    ctx.fillStyle = '#475569';
    ctx.fillRect(-22, 32, 7, 4);
    ctx.fillRect(-10, 32, 7, 4);
    ctx.fillRect(8, 32, 7, 4);
    ctx.fillRect(20, 32, 7, 4);

    // Flauschiger Lama-Körper
    const llamaGrad = ctx.createLinearGradient(-30, -10, 30, 15);
    llamaGrad.addColorStop(0, '#ffffff');
    llamaGrad.addColorStop(0.7, '#f1f5f9');
    llamaGrad.addColorStop(1.0, '#cbd5e1');
    ctx.fillStyle = llamaGrad;
    ctx.beginPath();
    ctx.roundRect(-28, -12, 54, 24, 12);
    ctx.fill();

    // Peruanische Decke
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(-12, -12, 24, 14);
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(-8, -12, 16, 4);
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(-12, 0, 24, 3);

    // Lama-Hals
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.moveTo(-18, -8);
    ctx.lineTo(-24, llamaHeadY + 8);
    ctx.lineTo(-12, llamaHeadY + 8);
    ctx.lineTo(-6, -8);
    ctx.closePath();
    ctx.fill();

    // Lama-Kopf
    ctx.beginPath();
    ctx.ellipse(-26 + llamaChew * 0.4, llamaHeadY, 14, 10, -0.2, 0, Math.PI * 2);
    ctx.fill();

    // Ohren
    ctx.beginPath();
    ctx.ellipse(-20, llamaHeadY - 14, 4, 9, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(-14, llamaHeadY - 13, 4, 8, 0.35, 0, Math.PI * 2);
    ctx.fill();

    // Quasten
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(-20, llamaHeadY - 6, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(-14, llamaHeadY - 5, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Schnauze & Auge
    ctx.fillStyle = '#64748b';
    ctx.beginPath();
    ctx.arc(-36 + llamaChew * 0.5, llamaHeadY + 2, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(-28, llamaHeadY - 2, 2, 0, Math.PI * 2);
    ctx.fill();

    // Schwänzchen
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.arc(28, -6, 5, 0, Math.PI * 2);
    ctx.fill();

    // Glanz-Aura
    const llamaPulse = (Math.sin(t * 3.4) + 1) * 0.5;
    ctx.strokeStyle = `rgba(254, 240, 138, ${0.45 + llamaPulse * 0.45})`;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(0, 0, 48, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();

    // 5. Vordergrund: Tropische Anden-Nebelfarne & Bromelien
    const drawAndeanFern = (fx, fy, scale, flip) => {
      ctx.save();
      ctx.translate(fx, fy);
      if (flip) ctx.scale(-1, 1);
      ctx.scale(scale, scale);

      ctx.fillStyle = '#064e3b';
      for (let i = 0; i < 9; i++) {
        const fAngle = -0.7 + i * 0.16;
        ctx.beginPath();
        ctx.ellipse(Math.cos(fAngle) * 54, Math.sin(fAngle) * 42, 54, 11, fAngle, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = '#22c55e';
      for (let i = 0; i < 7; i++) {
        const fAngle = -0.6 + i * 0.18;
        ctx.beginPath();
        ctx.ellipse(Math.cos(fAngle) * 44, Math.sin(fAngle) * 32, 42, 8, fAngle, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = '#ec4899';
      ctx.beginPath();
      ctx.arc(8, -14, 6, 0, Math.PI * 2);
      ctx.arc(-14, 6, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.arc(8, -14, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    drawAndeanFern(85, height * 0.72, 1.25, false);
    drawAndeanFern(165, height * 0.88, 1.15, false);
    drawAndeanFern(width - 95, height * 0.70, 1.30, true);
    drawAndeanFern(width - 175, height * 0.86, 1.20, true);

    ctx.restore();
  }

  _renderPetraJordan(ctx, width, height, t) {
    ctx.save();

    // 1. Dramatischer Wüsten-Abendhimmel & Schlucht-Lichteinfall (Warm Desert Sky & Sun)
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
    skyGrad.addColorStop(0, '#451a03'); // Tiefes Dämmerungs-Braunrot
    skyGrad.addColorStop(0.25, '#7c2d12');
    skyGrad.addColorStop(0.50, '#c2410c'); // Glühendes Wüstenorange
    skyGrad.addColorStop(0.75, '#ea580c');
    skyGrad.addColorStop(1, '#fef08a'); // Warmes Wüstengold am Horizont
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // Glühende Wüstensonne zwischen den Felsenschluchten
    const sunX = width * 0.50;
    const sunY = height * 0.16;
    const sunGlow = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, 320);
    sunGlow.addColorStop(0, 'rgba(255, 253, 231, 0.95)');
    sunGlow.addColorStop(0.3, 'rgba(254, 215, 170, 0.55)');
    sunGlow.addColorStop(0.7, 'rgba(251, 146, 60, 0.22)');
    sunGlow.addColorStop(1, 'rgba(234, 88, 12, 0)');
    ctx.fillStyle = sunGlow;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 320, 0, Math.PI * 2);
    ctx.fill();

    // Sonnenstrahlen (God Rays), die in die Siq-Schlucht scheinen
    ctx.save();
    ctx.globalAlpha = 0.12;
    for (let r = 0; r < 7; r++) {
      const rayAngle = -0.45 + r * 0.15 + Math.sin(t * 0.5 + r) * 0.02;
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.moveTo(sunX, sunY);
      ctx.lineTo(sunX + Math.sin(rayAngle - 0.06) * height * 1.5, sunY + Math.cos(rayAngle - 0.06) * height * 1.5);
      ctx.lineTo(sunX + Math.sin(rayAngle + 0.06) * height * 1.5, sunY + Math.cos(rayAngle + 0.06) * height * 1.5);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    // 2. Weit entfernte rosarote Sandsteinmassive des Wadi Rum & Siq
    const drawDistantSandstoneMountains = () => {
      ctx.fillStyle = '#9a3412';
      ctx.beginPath();
      ctx.moveTo(0, height * 0.42);
      ctx.lineTo(width * 0.15, height * 0.32);
      ctx.lineTo(width * 0.32, height * 0.38);
      ctx.lineTo(width * 0.50, height * 0.29);
      ctx.lineTo(width * 0.68, height * 0.36);
      ctx.lineTo(width * 0.85, height * 0.30);
      ctx.lineTo(width, height * 0.40);
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();
    };
    drawDistantSandstoneMountains();

    // 3. Zentrale monumentale Felswand (Hintergrund von Al-Khazneh)
    const facadeWallGrad = ctx.createLinearGradient(0, height * 0.15, 0, height);
    facadeWallGrad.addColorStop(0, '#7f1d1d'); // Nabatäisches Rosarot / Purpur
    facadeWallGrad.addColorStop(0.35, '#991b1b');
    facadeWallGrad.addColorStop(0.70, '#b91c1c');
    facadeWallGrad.addColorStop(1, '#9a3412');
    ctx.fillStyle = facadeWallGrad;
    ctx.fillRect(width * 0.32, height * 0.14, width * 0.38, height * 0.86);

    // Geologische Sandstein-Schichten / Sedimentbänder an der zentralen Wand
    const strataColors = ['#f87171', '#fb923c', '#e11d48', '#b45309', '#fca5a5', '#be123c'];
    ctx.save();
    ctx.globalAlpha = 0.22;
    for (let s = 0; s < 18; s++) {
      const sy = height * 0.15 + s * (height * 0.045);
      ctx.fillStyle = strataColors[s % strataColors.length];
      ctx.beginPath();
      ctx.moveTo(width * 0.32, sy);
      for (let sx = width * 0.32; sx <= width * 0.70; sx += 40) {
        ctx.lineTo(sx, sy + Math.sin(sx * 0.02 + s) * 7);
      }
      ctx.lineTo(width * 0.70, sy + 18);
      ctx.lineTo(width * 0.32, sy + 18);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    // 4. Das monumentale Schatzhaus von Petra (Al-Khazneh Fassade)
    // Zentriert um x = 1210 (Breite ca. 680, links ~870, rechts ~1550)
    const cx = 1210;
    const facadeTop = height * 0.18;
    const groundY = height * 0.85;

    // Felsaussparung / Tiefe Nische
    ctx.fillStyle = '#450a0a';
    ctx.fillRect(cx - 330, facadeTop + 10, 660, groundY - facadeTop);

    // Grundkörper der rosafarbenen Fassade
    const facadeGrad = ctx.createLinearGradient(0, facadeTop, 0, groundY);
    facadeGrad.addColorStop(0, '#fca5a5'); // Helles sonnenbeschienenes Rosarot
    facadeGrad.addColorStop(0.3, '#f87171');
    facadeGrad.addColorStop(0.7, '#e11d48');
    facadeGrad.addColorStop(1, '#9f1239'); // Edles nabatäisches Felsenrot
    ctx.fillStyle = facadeGrad;

    // --- OBERES GESCHOSS (Attika & Tholos mit Urne des Pharao) ---
    const upperY = height * 0.24;
    const upperHeight = height * 0.26;

    // Hauptgesims des oberen Geschosses
    ctx.fillStyle = '#fecdd3';
    ctx.fillRect(cx - 310, upperY + upperHeight - 14, 620, 14);
    ctx.fillStyle = '#e11d48';
    ctx.fillRect(cx - 315, upperY + upperHeight, 630, 8);

    // Linker und rechter Pavillon mit gebrochenem Giebel (Broken Pediments)
    const drawPavilion = (px, isLeft) => {
      ctx.save();
      ctx.translate(px, upperY);
      if (!isLeft) ctx.scale(-1, 1);

      // Pavillon-Hintergrund
      ctx.fillStyle = '#fda4af';
      ctx.fillRect(-110, 30, 110, upperHeight - 30);

      // Säulen des Pavillons
      ctx.fillStyle = '#ffe4e6';
      ctx.fillRect(-105, 45, 16, upperHeight - 45);
      ctx.fillRect(-35, 45, 16, upperHeight - 45);

      // Gebrochener Dreiecksgiebel (Schrägdach)
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.moveTo(-115, 30);
      ctx.lineTo(-5, -25);
      ctx.lineTo(-5, 0);
      ctx.lineTo(-115, 30);
      ctx.closePath();
      ctx.fill();

      // Akroterion / Nabatäischer Siegesengel-Relief
      ctx.fillStyle = '#fecdd3';
      ctx.beginPath();
      ctx.arc(-112, 24, 7, 0, Math.PI * 2);
      ctx.fill();

      // Nische mit Reliefstatue
      ctx.fillStyle = '#881337';
      ctx.beginPath();
      ctx.ellipse(-70, upperHeight * 0.55, 18, 36, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fca5a5';
      ctx.beginPath();
      ctx.ellipse(-70, upperHeight * 0.55, 10, 28, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };
    drawPavilion(cx - 190, true);
    drawPavilion(cx + 190, false);

    // Zentraler Rundtempel (Tholos)
    const tholosX = cx;
    const tholosY = upperY + 22;
    const tholosW = 150;
    const tholosH = upperHeight - 22;

    // Tholos-Rückwand mit Nische
    ctx.fillStyle = '#4c0519';
    ctx.fillRect(tholosX - tholosW / 2, tholosY, tholosW, tholosH);

    // Tholos-Säulen
    ctx.fillStyle = '#ffe4e6';
    const tholosCols = [-60, -25, 25, 60];
    tholosCols.forEach(colOffset => {
      ctx.fillRect(tholosX + colOffset - 7, tholosY + 12, 14, tholosH - 12);
      // Kapitelle
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(tholosX + colOffset - 10, tholosY + 8, 20, 6);
      ctx.fillStyle = '#ffe4e6';
    });

    // Tholos-Gesims & Kegeldach
    ctx.fillStyle = '#fda4af';
    ctx.fillRect(tholosX - tholosW / 2 - 8, tholosY, tholosW + 16, 12);

    // Kegeldach
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.moveTo(tholosX - 70, tholosY);
    ctx.lineTo(tholosX, tholosY - 44);
    ctx.lineTo(tholosX + 70, tholosY);
    ctx.closePath();
    ctx.fill();

    // ==========================================
    // EASTER EGG 1: AL-KHAZNEH URNE DES PHARAO
    // Zentriert exakt bei x: 1210, y: height * 0.28 (+6400)
    // ==========================================
    const urnX = cx; // 1210
    const urnY = height * 0.28;
    ctx.save();
    ctx.translate(urnX, urnY);

    const urnPulse = (Math.sin(t * 3.6) + 1) * 0.5;

    // Sockel der Urne
    ctx.fillStyle = '#fecdd3';
    ctx.fillRect(-22, 16, 44, 10);
    ctx.fillStyle = '#fb7185';
    ctx.fillRect(-16, 10, 32, 6);

    // Urnenkörper (Kugelförmige nabatäische Schatzurne)
    const urnGrad = ctx.createRadialGradient(-5, -6, 4, 0, 0, 24);
    urnGrad.addColorStop(0, '#fef08a'); // Goldener Glanz aus dem Inneren
    urnGrad.addColorStop(0.4, '#fbbf24');
    urnGrad.addColorStop(0.75, '#f43f5e');
    urnGrad.addColorStop(1, '#9f1239');
    ctx.fillStyle = urnGrad;
    ctx.beginPath();
    ctx.ellipse(0, -2, 22, 26, 0, 0, Math.PI * 2);
    ctx.fill();

    // Verzierter Urnenhals & Deckel mit Knauf
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(-10, -32, 20, 8);
    ctx.beginPath();
    ctx.arc(0, -36, 7, 0, Math.PI * 2);
    ctx.fill();

    // Urnen-Henkel (seitliche Griffe)
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(-22, -4, 9, Math.PI * 0.5, Math.PI * 1.6);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(22, -4, 9, -Math.PI * 0.6, Math.PI * 0.5);
    ctx.stroke();

    // Legendäre Kugeleinschlag-Spuren der Beduinen (Schatzsuche-Schäden)
    ctx.fillStyle = '#450a0a';
    ctx.beginPath();
    ctx.arc(-6, -2, 2.5, 0, Math.PI * 2);
    ctx.arc(8, 4, 2, 0, Math.PI * 2);
    ctx.arc(2, -10, 2, 0, Math.PI * 2);
    ctx.fill();

    // Magische Schatz-Aura
    ctx.strokeStyle = `rgba(254, 240, 138, ${0.4 + urnPulse * 0.55})`;
    ctx.lineWidth = 3;
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 16 + urnPulse * 12;
    ctx.beginPath();
    ctx.arc(0, -4, 38 + urnPulse * 6, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.restore();

    // --- UNTERES GESCHOSS (Hexastyl-Tempelvorhalle mit Säulen & Portal) ---
    const lowerY = height * 0.50;
    const lowerHeight = groundY - lowerY;

    // Großes Hauptgesims & Architrav
    ctx.fillStyle = '#fda4af';
    ctx.fillRect(cx - 325, lowerY - 24, 650, 24);
    // Rosetten & Fries
    ctx.fillStyle = '#be123c';
    for (let rx = cx - 305; rx <= cx + 305; rx += 28) {
      ctx.beginPath();
      ctx.arc(rx, lowerY - 12, 4.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Zentraler Dreiecksgiebel (Pediment über den 4 Mittelsäulen)
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.moveTo(cx - 210, lowerY - 24);
    ctx.lineTo(cx, lowerY - 82);
    ctx.lineTo(cx + 210, lowerY - 24);
    ctx.closePath();
    ctx.fill();

    // Giebelfeld-Relief (Medusenhaupt / floraler Nabataean Reliefkranz)
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(cx, lowerY - 46, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#881337';
    ctx.beginPath();
    ctx.arc(cx, lowerY - 46, 5, 0, Math.PI * 2);
    ctx.fill();

    // Dunkler, geheimnisvoller Säulenvorhallen-Hintergrund
    ctx.fillStyle = '#4c0519';
    ctx.fillRect(cx - 300, lowerY, 600, lowerHeight);

    // Monumentales Hauptportal (Eingang in den Fels)
    const portalW = 120;
    const portalH = lowerHeight * 0.72;
    const portalX = cx - portalW / 2;
    const portalY = lowerY + lowerHeight - portalH;

    // Portalrahmen
    ctx.fillStyle = '#fb7185';
    ctx.fillRect(portalX - 14, portalY - 16, portalW + 28, portalH + 16);

    // Abyssisches Schwarz des Tempelinneren
    ctx.fillStyle = '#170505';
    ctx.fillRect(portalX, portalY, portalW, portalH);

    // Zartes Fackelflackern im tiefen Inneren des Schatzhauses
    const torchPulse = (Math.sin(t * 5.2) + Math.cos(t * 8.3) + 2) * 0.25;
    const torchGlow = ctx.createRadialGradient(cx, portalY + portalH * 0.6, 5, cx, portalY + portalH * 0.6, 75);
    torchGlow.addColorStop(0, `rgba(251, 146, 60, ${0.45 * torchPulse})`);
    torchGlow.addColorStop(0.6, `rgba(225, 29, 72, ${0.20 * torchPulse})`);
    torchGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = torchGlow;
    ctx.fillRect(portalX, portalY, portalW, portalH);

    // Die 6 monumentalen korinthischen Säulen der Schatzhaus-Front
    const lowerColumns = [
      cx - 265, cx - 175, cx - 85,
      cx + 85,  cx + 175, cx + 265
    ];

    lowerColumns.forEach(colX => {
      // Säulenschaft mit rosafarbenem Marmorverlauf
      const colGrad = ctx.createLinearGradient(colX - 15, 0, colX + 15, 0);
      colGrad.addColorStop(0, '#fecdd3');
      colGrad.addColorStop(0.3, '#ffffff'); // Glanzkante
      colGrad.addColorStop(0.7, '#fca5a5');
      colGrad.addColorStop(1, '#e11d48'); // Schattierung
      ctx.fillStyle = colGrad;
      ctx.fillRect(colX - 15, lowerY, 30, lowerHeight);

      // Kanneluren (Vertikale Rillen)
      ctx.strokeStyle = '#fda4af';
      ctx.lineWidth = 1.5;
      [-8, -2, 4].forEach(off => {
        ctx.beginPath();
        ctx.moveTo(colX + off, lowerY);
        ctx.lineTo(colX + off, lowerY + lowerHeight);
        ctx.stroke();
      });

      // Korinthisches Kapitell mit Akanthusblättern
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(colX - 22, lowerY - 6, 44, 10);
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(colX - 14, lowerY - 4, 6, 0, Math.PI * 2);
      ctx.arc(colX + 14, lowerY - 4, 6, 0, Math.PI * 2);
      ctx.fill();

      // Säulenbasis (Attische Basis)
      ctx.fillStyle = '#f43f5e';
      ctx.fillRect(colX - 20, lowerY + lowerHeight - 12, 40, 12);
      ctx.fillStyle = '#e11d48';
      ctx.fillRect(colX - 24, lowerY + lowerHeight - 6, 48, 6);
    });

    // Tempeltreppe / Stylobat vor dem Schatzhaus
    for (let st = 0; st < 5; st++) {
      const stepY = lowerY + lowerHeight + st * 6;
      ctx.fillStyle = st % 2 === 0 ? '#fda4af' : '#fb7185';
      ctx.fillRect(cx - 330 - st * 8, stepY, 660 + st * 16, 6);
    }

    // ==========================================
    // 5. RECHTE SCHLUCHTWAND (SIQ) &
    // EASTER EGG 2: GEHEIME FELSENGRAB-KRYPTA
    // Zentriert exakt bei x: 1720, y: height * 0.65 (+5900)
    // ==========================================
    const drawSiqRightCliff = () => {
      ctx.fillStyle = '#7f1d1d';
      ctx.beginPath();
      ctx.moveTo(width * 0.68, 0);
      ctx.bezierCurveTo(width * 0.66, height * 0.35, width * 0.62, height * 0.65, width * 0.64, height);
      ctx.lineTo(width, height);
      ctx.lineTo(width, 0);
      ctx.closePath();
      ctx.fill();

      // Felsstrukturen und schroffe Vorsprünge
      const cliffGrad = ctx.createLinearGradient(width * 0.64, 0, width, 0);
      cliffGrad.addColorStop(0, '#991b1b');
      cliffGrad.addColorStop(0.3, '#be123c');
      cliffGrad.addColorStop(0.7, '#881337');
      cliffGrad.addColorStop(1, '#450a0a');
      ctx.fillStyle = cliffGrad;
      ctx.beginPath();
      ctx.moveTo(width * 0.69, 0);
      ctx.bezierCurveTo(width * 0.67, height * 0.38, width * 0.64, height * 0.68, width * 0.66, height);
      ctx.lineTo(width, height);
      ctx.lineTo(width, 0);
      ctx.closePath();
      ctx.fill();
    };
    drawSiqRightCliff();

    // Geheime Felsengrab-Krypta
    const tombX = 1720;
    const tombY = height * 0.65;
    ctx.save();
    ctx.translate(tombX, tombY);

    const tombPulse = (Math.sin(t * 3.8) + 1) * 0.5;

    // Steil gemeißelter Grabrahmen mit Stufenzinnen (Nabatäische Krähenstaffeln / Merlons)
    ctx.fillStyle = '#fca5a5';
    // Treppenförmiger Giebel
    ctx.fillRect(-64, -72, 128, 14);
    // Treppenstufen
    [-46, -30, -14, 2, 18, 34].forEach(sx => {
      ctx.fillRect(sx, -84, 12, 12);
    });

    // Grabfassade
    ctx.fillStyle = '#fb7185';
    ctx.fillRect(-58, -58, 116, 116);

    // Krypta-Portal (Bogenförmiger dunkler Eingang)
    ctx.fillStyle = '#1c0505';
    ctx.beginPath();
    ctx.arc(0, -6, 26, Math.PI, 0);
    ctx.lineTo(26, 56);
    ctx.lineTo(-26, 56);
    ctx.closePath();
    ctx.fill();

    // Mystische nabatäische Aramaic-Glyphen über der Pforte (Goldglühend)
    ctx.strokeStyle = `rgba(254, 240, 138, ${0.65 + tombPulse * 0.35})`;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-32, -42);
    ctx.lineTo(-18, -42);
    ctx.lineTo(-25, -28);
    ctx.moveTo(-10, -42);
    ctx.lineTo(10, -42);
    ctx.lineTo(0, -28);
    ctx.moveTo(18, -42);
    ctx.lineTo(32, -42);
    ctx.lineTo(25, -28);
    ctx.stroke();

    // Flackernde Öllampe an der Felswand
    ctx.fillStyle = '#b45309';
    ctx.fillRect(36, 0, 14, 6); // Wandhalter
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.arc(46, -4, 6, 0, Math.PI);
    ctx.fill();

    // Lampe Flamme
    const flameYOffset = Math.sin(t * 12) * 2;
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.ellipse(46, -10 + flameYOffset, 4, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.ellipse(46, -9 + flameYOffset, 2, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Magische Krypta-Glanz-Aura
    ctx.strokeStyle = `rgba(251, 191, 36, ${0.4 + tombPulse * 0.5})`;
    ctx.lineWidth = 3;
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(0, 0, 48, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.restore();

    // ==========================================
    // 6. LINKE SCHLUCHTWAND (SIQ) &
    // EASTER EGG 3: WÜSTENBEDUINEN-DROMEDAR
    // Zentriert exakt bei x: 620, y: height * 0.70 (+5500)
    // ==========================================
    const drawSiqLeftCliff = () => {
      ctx.fillStyle = '#7f1d1d';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(width * 0.32, 0);
      ctx.bezierCurveTo(width * 0.34, height * 0.35, width * 0.38, height * 0.65, width * 0.36, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();

      // Schattierte Felsüberhänge
      const cliffGrad = ctx.createLinearGradient(0, 0, width * 0.36, 0);
      cliffGrad.addColorStop(0, '#450a0a');
      cliffGrad.addColorStop(0.4, '#881337');
      cliffGrad.addColorStop(0.8, '#be123c');
      cliffGrad.addColorStop(1, '#991b1b');
      ctx.fillStyle = cliffGrad;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(width * 0.30, 0);
      ctx.bezierCurveTo(width * 0.32, height * 0.38, width * 0.35, height * 0.68, width * 0.33, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();
    };
    drawSiqLeftCliff();

    // Wüstenbeduinen-Dromedar
    const camelX = 620;
    const camelY = height * 0.70;
    ctx.save();
    ctx.translate(camelX, camelY);

    const camelChew = Math.sin(t * 3.5) * 3;
    const camelTail = Math.sin(t * 2.8) * 0.15;

    // Beduinen-Teppich auf dem Wüstenboden
    ctx.fillStyle = '#991b1b';
    ctx.beginPath();
    ctx.ellipse(0, 52, 68, 16, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.ellipse(0, 52, 54, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // Antiker Beduinen-Wasserkrug (Tonkrug neben dem Dromedar)
    ctx.fillStyle = '#c2410c';
    ctx.beginPath();
    ctx.ellipse(-52, 42, 9, 14, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ea580c';
    ctx.fillRect(-54, 25, 7, 5);

    // Dromedar-Beine (angewinkelt liegend / ruhend)
    ctx.fillStyle = '#b45309';
    // Hinterbein
    ctx.beginPath();
    ctx.ellipse(32, 34, 18, 9, 0.3, 0, Math.PI * 2);
    ctx.fill();
    // Vorderbein
    ctx.beginPath();
    ctx.ellipse(-26, 36, 18, 8, -0.3, 0, Math.PI * 2);
    ctx.fill();

    // Dromedar-Körper (Weiches Sandkamelfell)
    const camelGrad = ctx.createRadialGradient(0, 0, 8, 0, 10, 48);
    camelGrad.addColorStop(0, '#fef3c7');
    camelGrad.addColorStop(0.35, '#fde68a');
    camelGrad.addColorStop(0.75, '#d97706');
    camelGrad.addColorStop(1, '#92400e');
    ctx.fillStyle = camelGrad;
    ctx.beginPath();
    ctx.ellipse(0, 16, 42, 24, 0, 0, Math.PI * 2);
    ctx.fill();

    // Der markante Höcker des Dromedars
    ctx.beginPath();
    ctx.ellipse(4, -8, 20, 24, 0.1, 0, Math.PI * 2);
    ctx.fill();

    // Bunter Beduinen-Sattel & bestickte Schabracke
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(-14, -2, 28, 18);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-12, 1, 24, 4);
    ctx.fillRect(-12, 9, 24, 4);
    ctx.fillStyle = '#2563eb';
    ctx.fillRect(-10, 5, 20, 3);
    // Fransen
    ctx.fillStyle = '#fbbf24';
    for (let fr = -12; fr <= 12; fr += 4) {
      ctx.fillRect(fr, 16, 2.5, 5);
    }

    // Schwanz mit Quaste
    ctx.save();
    ctx.translate(40, 16);
    ctx.rotate(camelTail);
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(8, 12, 6, 24);
    ctx.stroke();
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.arc(6, 26, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Dromedar-Hals (Geschwungener langer Wüstenkamelhals)
    ctx.fillStyle = '#d97706';
    ctx.beginPath();
    ctx.moveTo(-28, 18);
    ctx.quadraticCurveTo(-48, -4, -42, -26);
    ctx.lineTo(-30, -28);
    ctx.quadraticCurveTo(-34, -2, -18, 16);
    ctx.closePath();
    ctx.fill();

    // Dromedar-Kopf
    ctx.save();
    ctx.translate(-40, -32);

    // Schädel
    ctx.fillStyle = '#fde68a';
    ctx.beginPath();
    ctx.ellipse(0, 0, 15, 11, -0.3, 0, Math.PI * 2);
    ctx.fill();

    // Schnauze mit Kauschlag
    ctx.beginPath();
    ctx.ellipse(-14 + camelChew * 0.4, 4 + camelChew * 0.2, 10, 7, -0.1, 0, Math.PI * 2);
    ctx.fill();

    // Nüstern
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.arc(-20 + camelChew * 0.4, 4, 2, 0, Math.PI * 2);
    ctx.fill();

    // Kamel-Auge mit langen Wüstenwimpern
    ctx.fillStyle = '#1e1b4b';
    ctx.beginPath();
    ctx.arc(-4, -3, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-7, -6);
    ctx.lineTo(-2, -6);
    ctx.stroke();

    // Ohr
    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.ellipse(7, -10, 4, 8, 0.4, 0, Math.PI * 2);
    ctx.fill();

    // Buntes Beduinen-Halfter mit Troddeln
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 12, 0.2, 1.8);
    ctx.stroke();
    // Blaue Schutzperle / Troddel
    ctx.fillStyle = '#06b6d4';
    ctx.beginPath();
    ctx.arc(-10, 10, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // Glanz-Aura des Beduinen-Dromedars
    const camelPulse = (Math.sin(t * 3.4) + 1) * 0.5;
    ctx.strokeStyle = `rgba(254, 240, 138, ${0.45 + camelPulse * 0.45})`;
    ctx.lineWidth = 3;
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.arc(0, 4, 52, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.restore();

    // 7. Schluchtboden & Wüstendünen im Vordergrund (Sandy Gorge Floor)
    const sandFloorGrad = ctx.createLinearGradient(0, height * 0.82, 0, height);
    sandFloorGrad.addColorStop(0, '#f59e0b');
    sandFloorGrad.addColorStop(0.4, '#d97706');
    sandFloorGrad.addColorStop(1, '#92400e');
    ctx.fillStyle = sandFloorGrad;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.84);
    ctx.bezierCurveTo(width * 0.25, height * 0.86, width * 0.50, height * 0.83, width * 0.75, height * 0.86);
    ctx.lineTo(width, height * 0.84);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Verwehte Sandrippeln und Geröllsteine im Siq
    ctx.fillStyle = '#b45309';
    for (let rip = 0; rip < 24; rip++) {
      const rx = (rip * 105 + (rip % 3) * 35) % width;
      const ry = height * 0.86 + (rip % 5) * (height * 0.024);
      ctx.beginPath();
      ctx.ellipse(rx, ry, 28, 4, 0.08, 0, Math.PI * 2);
      ctx.fill();
    }

    // Wüsten-Kies & Sandsteinbrocken
    const drawDesertRock = (rx, ry, rSize) => {
      ctx.fillStyle = '#78350f';
      ctx.beginPath();
      ctx.arc(rx, ry, rSize, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(rx - rSize * 0.3, ry - rSize * 0.3, rSize * 0.4, 0, Math.PI * 2);
      ctx.fill();
    };
    drawDesertRock(width * 0.22, height * 0.91, 14);
    drawDesertRock(width * 0.26, height * 0.93, 8);
    drawDesertRock(width * 0.78, height * 0.92, 16);
    drawDesertRock(width * 0.82, height * 0.94, 9);
    drawDesertRock(width * 0.48, height * 0.95, 11);

    ctx.restore();
  }

  _renderStatueOfLiberty(ctx, width, height, t) {
    ctx.save();

    // 1. New York Harbor Dämmerungshimmel mit Dunst & Sonnenlicht
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.72);
    skyGrad.addColorStop(0, '#0f172a'); // Tiefes Schieferblau
    skyGrad.addColorStop(0.28, '#1e3a5f');
    skyGrad.addColorStop(0.55, '#ea580c'); // Warmes New Yorker Morgen-/Abendrot
    skyGrad.addColorStop(0.82, '#f59e0b');
    skyGrad.addColorStop(1, '#fef08a'); // Goldener Dunsthorizont
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // Sanfte Morgensonne hinter Manhattan
    const sunX = width * 0.74;
    const sunY = height * 0.38;
    const sunGlow = ctx.createRadialGradient(sunX, sunY, 15, sunX, sunY, 280);
    sunGlow.addColorStop(0, 'rgba(255, 253, 231, 0.92)');
    sunGlow.addColorStop(0.3, 'rgba(254, 215, 170, 0.45)');
    sunGlow.addColorStop(0.7, 'rgba(251, 146, 60, 0.18)');
    sunGlow.addColorStop(1, 'rgba(234, 88, 12, 0)');
    ctx.fillStyle = sunGlow;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 280, 0, Math.PI * 2);
    ctx.fill();

    // ==========================================
    // 2. MANHATTAN SKYLINE IM DUNST &
    // EASTER EGG 3: EMPIRE STATE WOLKENKRATZERSPITZE
    // Zentriert exakt bei x: 1820, y: height * 0.38 (+5600)
    // ==========================================
    const drawManhattanSkyline = () => {
      ctx.save();
      // Hintergrund-Skyline (sehr weit entfernt im Dunst)
      ctx.fillStyle = 'rgba(71, 85, 105, 0.45)';
      const distantBuildings = [
        { x: width * 0.52, w: 45, h: height * 0.26 },
        { x: width * 0.55, w: 35, h: height * 0.31 },
        { x: width * 0.57, w: 50, h: height * 0.28 },
        { x: width * 0.60, w: 40, h: height * 0.35 },
        { x: width * 0.63, w: 55, h: height * 0.30 },
        { x: width * 0.66, w: 42, h: height * 0.33 },
        { x: width * 0.70, w: 60, h: height * 0.37 },
        { x: width * 0.74, w: 48, h: height * 0.42 },
        { x: width * 0.88, w: 52, h: height * 0.32 },
        { x: width * 0.92, w: 65, h: height * 0.28 },
        { x: width * 0.96, w: 55, h: height * 0.25 }
      ];
      distantBuildings.forEach(b => {
        ctx.fillRect(b.x, height * 0.68 - b.h, b.w, b.h);
      });

      // Mittlere Skyline (Lower Manhattan & One World Trade Center)
      ctx.fillStyle = 'rgba(30, 41, 59, 0.78)';
      // One World Trade Center Turm
      const owtcX = width * 0.67;
      const owtcH = height * 0.44;
      ctx.fillRect(owtcX, height * 0.68 - owtcH, 52, owtcH);
      // Antennenspitze
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(owtcX + 26, height * 0.68 - owtcH);
      ctx.lineTo(owtcX + 26, height * 0.68 - owtcH - 65);
      ctx.stroke();

      // Weitere Wolkenkratzer
      const midBuildings = [
        { x: width * 0.58, w: 48, h: height * 0.29 },
        { x: width * 0.61, w: 60, h: height * 0.34 },
        { x: width * 0.64, w: 54, h: height * 0.36 },
        { x: width * 0.71, w: 46, h: height * 0.38 },
        { x: width * 0.83, w: 58, h: height * 0.34 },
        { x: width * 0.87, w: 62, h: height * 0.30 }
      ];
      midBuildings.forEach(b => {
        ctx.fillRect(b.x, height * 0.68 - b.h, b.w, b.h);
      });

      // Zarte beleuchtete Fenster der Wolkenkratzer
      ctx.fillStyle = 'rgba(254, 240, 138, 0.55)';
      for (let wIdx = 0; wIdx < 85; wIdx++) {
        const wx = width * 0.58 + (wIdx * 17) % (width * 0.38);
        const wy = height * 0.35 + (wIdx * 19) % (height * 0.30);
        ctx.fillRect(wx, wy, 2.5, 4);
      }

      ctx.restore();
    };
    drawManhattanSkyline();

    // Easter Egg 3: Manhattan Empire State Wolkenkratzerspitze
    const empireX = 1820;
    const empireY = height * 0.38;
    ctx.save();
    ctx.translate(empireX, empireY);

    const empirePulse = (Math.sin(t * 3.6) + 1) * 0.5;

    // Turmkörper des Wolkenkratzers
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-32, 20, 64, height * 0.32);
    // Art-Deco Stufenverjüngung
    ctx.fillStyle = '#334155';
    ctx.fillRect(-24, 0, 48, 22);
    ctx.fillRect(-16, -18, 32, 20);
    ctx.fillRect(-9, -32, 18, 16);

    // Art-Deco Kuppel & Mast
    ctx.fillStyle = '#cbd5e1';
    ctx.beginPath();
    ctx.arc(0, -32, 9, Math.PI, 0);
    ctx.fill();

    // Gewaltige Antennenspitze
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, -32);
    ctx.lineTo(0, -82);
    ctx.stroke();

    // Rote & weiße Flugwarn-Blinklichter an der Spitze
    const beaconFlash = (Math.sin(t * 7) + 1) * 0.5;
    ctx.fillStyle = `rgba(239, 68, 68, ${0.4 + beaconFlash * 0.6})`;
    ctx.beginPath();
    ctx.arc(0, -82, 4 + beaconFlash * 2, 0, Math.PI * 2);
    ctx.fill();

    // Goldene Fensterraster
    ctx.fillStyle = '#fef08a';
    for (let row = 0; row < 6; row++) {
      ctx.fillRect(-20, 28 + row * 16, 8, 8);
      ctx.fillRect(-4, 28 + row * 16, 8, 8);
      ctx.fillRect(12, 28 + row * 16, 8, 8);
    }

    // Magische Art-Deco Aura
    ctx.strokeStyle = `rgba(254, 240, 138, ${0.4 + empirePulse * 0.5})`;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.arc(0, -20, 52, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.restore();

    // 3. New York Harbor Meeresbucht & Wasserfläche
    const waterY = height * 0.66;
    const waterGrad = ctx.createLinearGradient(0, waterY, 0, height);
    waterGrad.addColorStop(0, '#0e7490'); // Cyanblau im Morgenlicht
    waterGrad.addColorStop(0.35, '#155e75');
    waterGrad.addColorStop(0.70, '#0f3a4b');
    waterGrad.addColorStop(1, '#082f49');
    ctx.fillStyle = waterGrad;
    ctx.fillRect(0, waterY, width, height - waterY);

    // Sanfte Wasserwellen & goldene Lichtreflexe
    ctx.fillStyle = 'rgba(254, 240, 138, 0.28)';
    for (let wave = 0; wave < 32; wave++) {
      const wx = (wave * 90 + Math.sin(t * 1.5 + wave) * 20) % width;
      const wy = waterY + 12 + (wave % 7) * ((height - waterY) * 0.12);
      const wLen = 35 + (wave % 4) * 25;
      ctx.fillRect(wx, wy, wLen, 2.5);
    }

    // ==========================================
    // 4. EASTER EGG 2: STATEN ISLAND FÄHRE
    // Zentriert exakt bei x: 480, y: height * 0.72 (+6000)
    // ==========================================
    const ferryX = 480;
    const ferryY = height * 0.72;
    ctx.save();
    ctx.translate(ferryX, ferryY);

    const ferryBob = Math.sin(t * 2.2) * 2.5;
    const ferryPulse = (Math.sin(t * 3.4) + 1) * 0.5;

    // Bugwelle / Kielwasser (Weißer Schaum)
    ctx.fillStyle = 'rgba(240, 249, 255, 0.65)';
    ctx.beginPath();
    ctx.moveTo(-115, 20);
    ctx.lineTo(125, 20);
    ctx.lineTo(140, 26);
    ctx.lineTo(-135, 26);
    ctx.closePath();
    ctx.fill();

    // Leichte Schiffsbewegung
    ctx.translate(0, ferryBob);

    // Markanter oranger Doppelend-Rumpf der Staten Island Ferry
    const hullGrad = ctx.createLinearGradient(0, 0, 0, 22);
    hullGrad.addColorStop(0, '#f97316'); // Leuchtendes Orange
    hullGrad.addColorStop(0.6, '#ea580c');
    hullGrad.addColorStop(1, '#c2410c');
    ctx.fillStyle = hullGrad;
    ctx.beginPath();
    ctx.moveTo(-110, 0);
    ctx.lineTo(110, 0);
    ctx.lineTo(95, 18);
    ctx.lineTo(-95, 18);
    ctx.closePath();
    ctx.fill();

    // Dunkler Unterwasserpass
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-92, 16, 184, 4);

    // Weißer Passagier-Deckaufbau (Doppelstöckig)
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(-90, -18, 180, 18);
    ctx.fillRect(-70, -32, 140, 14);

    // Blaue Zierlinie der Stadt New York (NYC Blue Stripe)
    ctx.fillStyle = '#1d4ed8';
    ctx.fillRect(-88, -2, 176, 3.5);

    // Dunkle Passagierfensterreihen
    ctx.fillStyle = '#1e293b';
    for (let win = -80; win <= 80; win += 16) {
      ctx.fillRect(win, -14, 10, 8);
    }
    for (let win2 = -60; win2 <= 60; win2 += 18) {
      ctx.fillRect(win2, -28, 11, 7);
    }

    // Steuerhäuser an beiden Enden (Doppelendfähre)
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(-65, -42, 18, 10);
    ctx.fillRect(47, -42, 18, 10);

    // Schornsteine mit Rauchfahne
    ctx.fillStyle = '#f97316';
    ctx.fillRect(-12, -44, 10, 13);
    ctx.fillRect(2, -44, 10, 13);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-12, -44, 10, 3);
    ctx.fillRect(2, -44, 10, 3);

    // Zarter Schornsteinrauch
    ctx.fillStyle = 'rgba(226, 232, 240, 0.45)';
    ctx.beginPath();
    ctx.arc(8 + Math.sin(t * 3) * 4, -50, 5, 0, Math.PI * 2);
    ctx.arc(14 + Math.sin(t * 3) * 6, -56, 7, 0, Math.PI * 2);
    ctx.fill();

    // US-Flagge am Heck
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-85, -18);
    ctx.lineTo(-85, -34);
    ctx.stroke();
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(-84, -34, 12, 7);
    ctx.fillStyle = '#1d4ed8';
    ctx.fillRect(-84, -34, 5, 4);

    // Magische Fähren-Glanz-Aura
    ctx.strokeStyle = `rgba(251, 146, 60, ${0.45 + ferryPulse * 0.45})`;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#ea580c';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.arc(0, -6, 64, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.restore();

    // 5. Liberty Island & Sternförmiger Sockel (Fort Wood & Pedestal)
    const statueBaseX = 1220;
    const baseGroundY = height * 0.76;

    // Liberty Island Landmasse / Uferbefestigung
    ctx.fillStyle = '#1e3a2b';
    ctx.beginPath();
    ctx.ellipse(statueBaseX, baseGroundY + 12, 280, 36, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#475569'; // Granitquai
    ctx.beginPath();
    ctx.ellipse(statueBaseX, baseGroundY + 8, 260, 24, 0, 0, Math.PI * 2);
    ctx.fill();

    // Sternförmige Festungsmauern von Fort Wood (11-zackige Bastion)
    ctx.fillStyle = '#64748b';
    ctx.beginPath();
    ctx.moveTo(statueBaseX - 160, baseGroundY);
    ctx.lineTo(statueBaseX - 120, baseGroundY - 26);
    ctx.lineTo(statueBaseX - 80, baseGroundY);
    ctx.lineTo(statueBaseX, baseGroundY - 26);
    ctx.lineTo(statueBaseX + 80, baseGroundY);
    ctx.lineTo(statueBaseX + 120, baseGroundY - 26);
    ctx.lineTo(statueBaseX + 160, baseGroundY);
    ctx.lineTo(statueBaseX + 180, baseGroundY + 16);
    ctx.lineTo(statueBaseX - 180, baseGroundY + 16);
    ctx.closePath();
    ctx.fill();

    // Der steinerne Sockel (Richard Morris Hunt Pedestal)
    const pedW = 130;
    const pedH = height * 0.22;
    const pedTopY = baseGroundY - pedH;

    const pedGrad = ctx.createLinearGradient(statueBaseX - pedW / 2, 0, statueBaseX + pedW / 2, 0);
    pedGrad.addColorStop(0, '#78716c');
    pedGrad.addColorStop(0.3, '#d6d3d1');
    pedGrad.addColorStop(0.7, '#a8a29e');
    pedGrad.addColorStop(1, '#57534e');
    ctx.fillStyle = pedGrad;
    ctx.fillRect(statueBaseX - pedW / 2, pedTopY, pedW, pedH);

    // Balkone & Gesimse des Sockels
    ctx.fillStyle = '#e7e5e4';
    ctx.fillRect(statueBaseX - pedW / 2 - 14, pedTopY - 10, pedW + 28, 12);
    ctx.fillRect(statueBaseX - pedW / 2 - 10, pedTopY + pedH * 0.45, pedW + 20, 10);
    ctx.fillRect(statueBaseX - pedW / 2 - 18, baseGroundY - 18, pedW + 36, 18);

    // Klassische Halbsäulen auf dem Sockel
    ctx.fillStyle = '#d6d3d1';
    [-42, -14, 14, 42].forEach(colOff => {
      ctx.fillRect(statueBaseX + colOff - 5, pedTopY + 8, 10, pedH * 0.40);
    });

    // ==========================================
    // 6. DIE FREIHEITSSTATUE (LADY LIBERTY) &
    // EASTER EGG 1: GOLDENE FREIHEITSFACKEL
    // Zentriert exakt bei x: 1300, y: height * 0.18 (+6500)
    // ==========================================
    const libertyX = statueBaseX;
    const libertyFeetY = pedTopY - 10;
    const libertyH = height * 0.38;

    ctx.save();

    // Bronzener Statuenfuß / Sockelaufsatz
    ctx.fillStyle = '#134e4a';
    ctx.fillRect(libertyX - 35, libertyFeetY - 8, 70, 8);

    // Patiniertes Kupfergrün (Verdigris Turquoise Palette)
    const robeGrad = ctx.createLinearGradient(libertyX - 45, 0, libertyX + 45, 0);
    robeGrad.addColorStop(0, '#0f766e'); // Schattengrün
    robeGrad.addColorStop(0.3, '#2dd4bf'); // Helles sonnenbeschienenes Türkisgrün
    robeGrad.addColorStop(0.7, '#14b8a6');
    robeGrad.addColorStop(1, '#042f2e');
    ctx.fillStyle = robeGrad;

    // Fließende antike Robe (Chiton / Himation)
    ctx.beginPath();
    ctx.moveTo(libertyX - 36, libertyFeetY - 8);
    ctx.lineTo(libertyX - 28, libertyFeetY - libertyH * 0.55);
    ctx.lineTo(libertyX - 20, libertyFeetY - libertyH * 0.78);
    ctx.lineTo(libertyX + 22, libertyFeetY - libertyH * 0.78);
    ctx.lineTo(libertyX + 32, libertyFeetY - libertyH * 0.55);
    ctx.lineTo(libertyX + 38, libertyFeetY - 8);
    ctx.closePath();
    ctx.fill();

    // Tief skulptierte Faltenwürfe der Robe
    ctx.strokeStyle = '#042f2e';
    ctx.lineWidth = 2.5;
    [-18, -6, 8, 20].forEach(fX => {
      ctx.beginPath();
      ctx.moveTo(libertyX + fX, libertyFeetY - libertyH * 0.72);
      ctx.quadraticCurveTo(libertyX + fX + 4, libertyFeetY - libertyH * 0.35, libertyX + fX * 1.2, libertyFeetY - 10);
      ctx.stroke();
    });

    // Linker Arm mit der Gesetzestafel (Tabula Ansata)
    ctx.fillStyle = '#14b8a6';
    ctx.beginPath();
    ctx.moveTo(libertyX - 22, libertyFeetY - libertyH * 0.76);
    ctx.lineTo(libertyX - 48, libertyFeetY - libertyH * 0.62);
    ctx.lineTo(libertyX - 38, libertyFeetY - libertyH * 0.52);
    ctx.lineTo(libertyX - 16, libertyFeetY - libertyH * 0.66);
    ctx.closePath();
    ctx.fill();

    // Gesetzestafel (Inschrift JULY IV MDCCLXXVI)
    ctx.fillStyle = '#2dd4bf';
    ctx.fillRect(libertyX - 52, libertyFeetY - libertyH * 0.64, 18, 28);
    ctx.strokeStyle = '#0f766e';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(libertyX - 52, libertyFeetY - libertyH * 0.64, 18, 28);
    ctx.fillStyle = '#042f2e';
    ctx.fillRect(libertyX - 49, libertyFeetY - libertyH * 0.58, 12, 3);
    ctx.fillRect(libertyX - 49, libertyFeetY - libertyH * 0.52, 12, 3);

    // Kopf & Nacken der Freiheitsstatue
    const headY = libertyFeetY - libertyH * 0.85;
    ctx.fillStyle = '#2dd4bf';
    // Nacken
    ctx.fillRect(libertyX - 7, headY + 8, 14, 16);
    // Gesicht & Profil
    ctx.beginPath();
    ctx.ellipse(libertyX, headY, 13, 17, 0, 0, Math.PI * 2);
    ctx.fill();

    // Gewelltes Haar & Stirnkranz
    ctx.fillStyle = '#0f766e';
    ctx.beginPath();
    ctx.arc(libertyX, headY - 4, 14, Math.PI * 0.8, Math.PI * 2.2);
    ctx.fill();

    // Die 7 Strahlen der Strahlenkrone (Seven Spikes of Liberty)
    ctx.strokeStyle = '#2dd4bf';
    ctx.lineWidth = 3.5;
    for (let sp = 0; sp < 7; sp++) {
      const spAngle = -Math.PI * 0.85 + sp * (Math.PI * 0.70 / 6);
      ctx.beginPath();
      ctx.moveTo(libertyX + Math.cos(spAngle) * 12, headY - 6 + Math.sin(spAngle) * 12);
      ctx.lineTo(libertyX + Math.cos(spAngle) * 28, headY - 6 + Math.sin(spAngle) * 28);
      ctx.stroke();
    }

    // Rechter ausgestreckter Arm (emporgereckt zur Fackel)
    ctx.fillStyle = '#14b8a6';
    ctx.beginPath();
    ctx.moveTo(libertyX + 18, libertyFeetY - libertyH * 0.75);
    ctx.lineTo(1300 - 8, height * 0.22);
    ctx.lineTo(1300 + 8, height * 0.22);
    ctx.lineTo(libertyX + 28, libertyFeetY - libertyH * 0.70);
    ctx.closePath();
    ctx.fill();

    ctx.restore();

    // ==========================================
    // EASTER EGG 1: GOLDENE FREIHEITSFACKEL
    // Zentriert exakt bei x: 1300, y: height * 0.18 (+6500)
    // ==========================================
    const torchX = 1300;
    const torchY = height * 0.18;
    ctx.save();
    ctx.translate(torchX, torchY);

    const torchPulse = (Math.sin(t * 3.8) + 1) * 0.5;

    // Fackelgriff & Zierbalustrade
    ctx.fillStyle = '#0f766e';
    ctx.fillRect(-6, 12, 12, 24);
    // Galerierand / Balkon um die Flamme
    ctx.fillStyle = '#2dd4bf';
    ctx.fillRect(-16, 6, 32, 7);
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(-14, 4, 28, 3);

    // Die lodernde 24-Karat Goldflamme der Freiheitsstatue
    const flameFlicker = Math.sin(t * 14) * 2;
    const flameGrad = ctx.createRadialGradient(-2, -6, 2, 0, 0, 22);
    flameGrad.addColorStop(0, '#ffffff'); // Heißer weißer Kern
    flameGrad.addColorStop(0.25, '#fef08a'); // Strahlendes Gold
    flameGrad.addColorStop(0.65, '#f59e0b');
    flameGrad.addColorStop(1, '#ea580c'); // Loderndes Amber-Orange
    ctx.fillStyle = flameGrad;

    ctx.beginPath();
    ctx.moveTo(-12, 4);
    ctx.quadraticCurveTo(-18, -12, -4, -22 + flameFlicker);
    ctx.quadraticCurveTo(0, -32 + flameFlicker * 1.5, 6, -24 + flameFlicker);
    ctx.quadraticCurveTo(16, -14, 12, 4);
    ctx.closePath();
    ctx.fill();

    // Glanzlichter auf dem Blattgold
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(0, -10 + flameFlicker * 0.5, 5, 10, -0.2, 0, Math.PI * 2);
    ctx.fill();

    // Strahlende Freiheits-Lichtaura
    ctx.strokeStyle = `rgba(254, 240, 138, ${0.45 + torchPulse * 0.55})`;
    ctx.lineWidth = 3;
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 22 + torchPulse * 16;
    ctx.beginPath();
    ctx.arc(0, -8, 44 + torchPulse * 6, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.restore();

    // 7. Hafen-Möwen & schwimmende Bojen im Vordergrund
    const drawSeagull = (gx, gy, scale) => {
      ctx.save();
      ctx.translate(gx, gy);
      ctx.scale(scale, scale);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(-8, 0, 9, Math.PI * 1.1, Math.PI * 1.9);
      ctx.arc(8, 0, 9, Math.PI * 1.1, Math.PI * 1.9);
      ctx.stroke();
      ctx.restore();
    };
    drawSeagull(width * 0.28, height * 0.46 + Math.sin(t * 1.8) * 8, 1.2);
    drawSeagull(width * 0.35, height * 0.42 + Math.sin(t * 2.1) * 7, 0.9);
    drawSeagull(width * 0.88, height * 0.52 + Math.sin(t * 1.6) * 6, 1.1);

    // Rote & grüne Schifffahrtsbojen
    const drawBuoy = (bx, by, isGreen) => {
      ctx.save();
      ctx.translate(bx, by + Math.sin(t * 2.5 + bx) * 3);
      ctx.fillStyle = isGreen ? '#10b981' : '#ef4444';
      ctx.beginPath();
      ctx.moveTo(-7, 4);
      ctx.lineTo(7, 4);
      ctx.lineTo(4, -14);
      ctx.lineTo(-4, -14);
      ctx.closePath();
      ctx.fill();
      // Blinkendes Signallicht
      const bFlash = (Math.sin(t * 6 + bx) + 1) * 0.5;
      ctx.fillStyle = isGreen ? `rgba(52, 211, 153, ${0.3 + bFlash * 0.7})` : `rgba(248, 113, 113, ${0.3 + bFlash * 0.7})`;
      ctx.beginPath();
      ctx.arc(0, -16, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };
    drawBuoy(width * 0.18, height * 0.79, false);
    drawBuoy(width * 0.82, height * 0.82, true);

    ctx.restore();
  }

  _renderEiffelTowerParis(ctx, width, height, t) {
    ctx.save();

    // 1. Romantischer Pariser Nachthimmel (Midnight Paris Sky)
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.75);
    skyGrad.addColorStop(0, '#030712'); // Fast schwarzes Mitternachtsblau
    skyGrad.addColorStop(0.35, '#091328');
    skyGrad.addColorStop(0.70, '#111e38');
    skyGrad.addColorStop(0.92, '#1e293b');
    skyGrad.addColorStop(1, '#2a2238'); // Pariser Stadtnacht-Dunst (Warm Twilight Glow)
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // Warme goldene Lichtkuppel der Stadt Paris am Horizont
    const cityGlow = ctx.createRadialGradient(width * 0.50, height * 0.65, 50, width * 0.50, height * 0.65, width * 0.55);
    cityGlow.addColorStop(0, 'rgba(251, 191, 36, 0.22)');
    cityGlow.addColorStop(0.4, 'rgba(245, 158, 11, 0.12)');
    cityGlow.addColorStop(0.8, 'rgba(180, 83, 9, 0.04)');
    cityGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = cityGlow;
    ctx.fillRect(0, height * 0.25, width, height * 0.55);

    // Funkelnde Sterne am Pariser Nachthimmel
    ctx.fillStyle = '#ffffff';
    for (let s = 0; s < 55; s++) {
      const sx = (s * 137 + 55) % width;
      const sy = (s * 89 + 25) % (height * 0.45);
      const sAlpha = 0.35 + Math.sin(t * 3 + s) * 0.35;
      ctx.globalAlpha = Math.max(0, sAlpha);
      ctx.beginPath();
      ctx.arc(sx, sy, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1.0;

    // 2. Pariser Haussmann-Altbauten & Ufersilhouetten (Links und Rechts im Hintergrund)
    const drawHaussmannRow = (startX, endX, isLeft) => {
      ctx.save();
      const buildingCount = 5;
      const bWidth = (endX - startX) / buildingCount;

      for (let b = 0; b < buildingCount; b++) {
        const bx = startX + b * bWidth;
        const bHeight = height * (0.24 + (b % 3) * 0.04);
        const by = height * 0.70 - bHeight;

        // Fassade aus Pariser Kalkstein (Pierre de Paris bei Nacht)
        const bGrad = ctx.createLinearGradient(bx, by, bx + bWidth, by);
        bGrad.addColorStop(0, '#1e293b');
        bGrad.addColorStop(0.5, '#334155');
        bGrad.addColorStop(1, '#1e293b');
        ctx.fillStyle = bGrad;
        ctx.fillRect(bx, by, bWidth - 4, bHeight);

        // Mansarddach aus Zink/Schiefer
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.moveTo(bx - 3, by);
        ctx.lineTo(bx + 8, by - 24);
        ctx.lineTo(bx + bWidth - 12, by - 24);
        ctx.lineTo(bx + bWidth - 1, by);
        ctx.closePath();
        ctx.fill();

        // Dachgauben (Lucarnes)
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(bx + bWidth * 0.3, by - 16, 7, 10);
        ctx.fillRect(bx + bWidth * 0.6, by - 16, 7, 10);

        // Erleuchtete Altbau-Fenster mit warmem Pariser Wohnungslicht
        for (let fl = 0; fl < 4; fl++) {
          const fy = by + 18 + fl * 24;
          for (let win = 0; win < 3; win++) {
            const wx = bx + 8 + win * (bWidth * 0.28);
            const isLit = (b + fl + win) % 2 === 0 || (b * 3 + fl) % 5 === 0;
            ctx.fillStyle = isLit ? 'rgba(254, 240, 138, 0.85)' : '#0f172a';
            ctx.fillRect(wx, fy, 8, 14);

            // Französischer schmiedeeiserner Balkon
            ctx.strokeStyle = '#475569';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(wx - 2, fy + 8, 12, 8);
          }
        }
      }
      ctx.restore();
    };
    drawHaussmannRow(0, width * 0.35, true);
    drawHaussmannRow(width * 0.65, width, false);

    // ==========================================
    // 3. SEINE-FLUSS (WASSERFLÄCHE BEI NACHT) &
    // EASTER EGG 2: SEINE-BATEAU MOUCHE
    // Zentriert exakt bei x: 520, y: height * 0.74 (+6100)
    // ==========================================
    const seineY = height * 0.68;
    const seineGrad = ctx.createLinearGradient(0, seineY, 0, height);
    seineGrad.addColorStop(0, '#091e30'); // Dunkelblau-grün der Seine
    seineGrad.addColorStop(0.35, '#0d283e');
    seineGrad.addColorStop(0.70, '#081726');
    seineGrad.addColorStop(1, '#030a12');
    ctx.fillStyle = seineGrad;
    ctx.fillRect(0, seineY, width, height - seineY);

    // Goldene Lichtspiegelungen des Eiffelturms & der Straßenlaternen auf den Seine-Wellen
    ctx.save();
    for (let refl = 0; refl < 45; refl++) {
      const rx = width * 0.35 + (refl * 26) % (width * 0.30) + Math.sin(t * 2 + refl) * 12;
      const ry = seineY + 14 + (refl % 9) * ((height - seineY) * 0.10);
      const rLen = 22 + (refl % 5) * 18;
      const rAlpha = 0.20 + Math.sin(t * 3.5 + refl) * 0.18;
      ctx.fillStyle = `rgba(254, 240, 138, ${rAlpha})`;
      ctx.fillRect(rx - rLen / 2, ry, rLen, 2.5);
    }
    ctx.restore();

    // Easter Egg 2: Pariser Seine-Bateau Mouche (Ausflugsboot)
    const bateauX = 520;
    const bateauY = height * 0.74;
    ctx.save();
    ctx.translate(bateauX, bateauY);

    const bateauBob = Math.sin(t * 2.4) * 2.2;
    const bateauPulse = (Math.sin(t * 3.6) + 1) * 0.5;

    // Schaumiges Kielwasser auf der Seine
    ctx.fillStyle = 'rgba(224, 242, 254, 0.60)';
    ctx.beginPath();
    ctx.moveTo(-120, 18);
    ctx.lineTo(130, 18);
    ctx.lineTo(145, 24);
    ctx.lineTo(-140, 24);
    ctx.closePath();
    ctx.fill();

    ctx.translate(0, bateauBob);

    // Schlanker Schiffsrumpf des Bateau Mouche (Weiß & Marineblau)
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.moveTo(-115, 0);
    ctx.lineTo(115, 0);
    ctx.lineTo(95, 16);
    ctx.lineTo(-95, 16);
    ctx.closePath();
    ctx.fill();

    // Weißes Oberdeck
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(-92, -8, 184, 8);

    // Panorama-Glasdach der Passagierkabine
    const glassGrad = ctx.createLinearGradient(0, -22, 0, -8);
    glassGrad.addColorStop(0, 'rgba(254, 240, 138, 0.95)'); // Warm erleuchteter Innenraum
    glassGrad.addColorStop(1, 'rgba(251, 191, 36, 0.65)');
    ctx.fillStyle = glassGrad;
    ctx.fillRect(-78, -22, 156, 14);

    // Fensterpfosten
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 1.5;
    for (let post = -70; post <= 70; post += 14) {
      ctx.beginPath();
      ctx.moveTo(post, -22);
      ctx.lineTo(post, -8);
      ctx.stroke();
    }

    // Romantische Pariser Festbeleuchtung / Lichterkette an der Reling
    const lightColors = ['#fef08a', '#f43f5e', '#38bdf8', '#4ade80', '#fbbf24'];
    for (let lit = -85; lit <= 85; lit += 10) {
      const col = lightColors[Math.abs(lit) % lightColors.length];
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(lit, -25 + Math.sin(lit * 0.2) * 2, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Steuerstand & Scheinwerfer des Bootes
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(80, -26, 16, 12);
    // Scheinwerferstrahl nach vorne über das Seine-Wasser
    const boatBeam = ctx.createLinearGradient(96, -20, 240, -10);
    boatBeam.addColorStop(0, 'rgba(255, 255, 255, 0.75)');
    boatBeam.addColorStop(0.3, 'rgba(254, 240, 138, 0.40)');
    boatBeam.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = boatBeam;
    ctx.beginPath();
    ctx.moveTo(96, -20);
    ctx.lineTo(240, -32);
    ctx.lineTo(240, 8);
    ctx.closePath();
    ctx.fill();

    // Französische Trikolore am Heck (Blau-Weiß-Rot)
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-90, -8);
    ctx.lineTo(-90, -28);
    ctx.stroke();
    ctx.fillStyle = '#1d4ed8'; // Blau
    ctx.fillRect(-89, -28, 4, 7);
    ctx.fillStyle = '#ffffff'; // Weiß
    ctx.fillRect(-85, -28, 4, 7);
    ctx.fillStyle = '#ef4444'; // Rot
    ctx.fillRect(-81, -28, 4, 7);

    // Magische Bateau-Mouche Glanzaura
    ctx.strokeStyle = `rgba(251, 191, 36, ${0.45 + bateauPulse * 0.45})`;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.arc(0, -6, 68, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.restore();

    // ==========================================
    // 4. DER GOLDEN ILLUMINIERTE EIFFELTURM (PARIS) &
    // EASTER EGG 1: EIFFELTURM-LEUCHTTURM AN DER SPITZE
    // Zentriert exakt bei x: 1460, y: height * 0.15 (+6600)
    // ==========================================
    const tx = 1460;
    const towerBaseY = height * 0.70;
    const towerH = height * 0.58;
    const topY = towerBaseY - towerH; // ca. height * 0.12

    ctx.save();

    // Sanfte goldene Aura um den gesamten Eiffelturm
    const towerGlow = ctx.createRadialGradient(tx, towerBaseY - towerH * 0.5, 40, tx, towerBaseY - towerH * 0.5, 280);
    towerGlow.addColorStop(0, 'rgba(254, 240, 138, 0.28)');
    towerGlow.addColorStop(0.4, 'rgba(251, 191, 36, 0.16)');
    towerGlow.addColorStop(0.8, 'rgba(217, 119, 6, 0.05)');
    towerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = towerGlow;
    ctx.fillRect(tx - 300, topY - 50, 600, towerH + 80);

    // --- BASIS & MONUMENTALER BOGEN (1. STOCK) ---
    // Linker und Rechter Pfeilerfuss (Pilier Nord, Sud, Est, Ouest)
    const baseW = 280;
    const p1W = 180;
    const p1Y = towerBaseY - towerH * 0.28;

    // Pfeilergrundkörper (Golden erleuchteter Schmiedeeisen-Stahl)
    ctx.strokeStyle = '#fbbf24';
    ctx.fillStyle = '#b45309';
    ctx.lineWidth = 3;

    // Linker Pfeiler
    ctx.beginPath();
    ctx.moveTo(tx - baseW / 2, towerBaseY);
    ctx.lineTo(tx - p1W / 2, p1Y);
    ctx.lineTo(tx - p1W / 2 + 32, p1Y);
    ctx.lineTo(tx - baseW / 2 + 54, towerBaseY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Rechter Pfeiler
    ctx.beginPath();
    ctx.moveTo(tx + baseW / 2, towerBaseY);
    ctx.lineTo(tx + p1W / 2, p1Y);
    ctx.lineTo(tx + p1W / 2 - 32, p1Y);
    ctx.lineTo(tx + baseW / 2 - 54, towerBaseY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Der weltberühmte monumentale Rundbogen unter der 1. Etage
    ctx.strokeStyle = '#fde047';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(tx, towerBaseY + 12, 105, Math.PI, 0);
    ctx.stroke();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(tx, towerBaseY + 12, 118, Math.PI, 0);
    ctx.stroke();

    // Diagonales Fachwerk im Bogen & Pfeilern
    ctx.strokeStyle = 'rgba(254, 240, 138, 0.75)';
    ctx.lineWidth = 1.5;
    for (let diag = 0; diag < 8; diag++) {
      const dy1 = towerBaseY - diag * ((towerBaseY - p1Y) / 8);
      const dy2 = dy1 - 15;
      // Linke Streben
      ctx.beginPath();
      ctx.moveTo(tx - baseW / 2 + diag * 5, dy1);
      ctx.lineTo(tx - p1W / 2 + diag * 2, dy2);
      ctx.stroke();
      // Rechte Streben
      ctx.beginPath();
      ctx.moveTo(tx + baseW / 2 - diag * 5, dy1);
      ctx.lineTo(tx + p1W / 2 - diag * 2, dy2);
      ctx.stroke();
    }

    // 1. PLATTFORM (Erste Etage)
    ctx.fillStyle = '#fde047';
    ctx.fillRect(tx - p1W / 2 - 8, p1Y - 10, p1W + 16, 10);
    ctx.fillStyle = '#78350f';
    ctx.fillRect(tx - p1W / 2 - 4, p1Y - 6, p1W + 8, 4);

    // --- 2. STOCKWERK (MITTELTEIL) ---
    const p2W = 100;
    const p2Y = towerBaseY - towerH * 0.58;

    // Pfeiler zur 2. Etage
    ctx.fillStyle = '#b45309';
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(tx - p1W / 2 + 10, p1Y - 10);
    ctx.lineTo(tx - p2W / 2, p2Y);
    ctx.lineTo(tx + p2W / 2, p2Y);
    ctx.lineTo(tx + p1W / 2 - 10, p1Y - 10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Fachwerk der 2. Etage
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 1.5;
    for (let fl2 = 0; fl2 < 7; fl2++) {
      const my1 = p1Y - 10 - fl2 * ((p1Y - p2Y - 10) / 7);
      const my2 = my1 - 12;
      ctx.beginPath();
      ctx.moveTo(tx - 45 + fl2 * 4, my1);
      ctx.lineTo(tx + 45 - fl2 * 4, my2);
      ctx.moveTo(tx + 45 - fl2 * 4, my1);
      ctx.lineTo(tx - 45 + fl2 * 4, my2);
      ctx.stroke();
    }

    // 2. PLATTFORM (Zweite Etage)
    ctx.fillStyle = '#fde047';
    ctx.fillRect(tx - p2W / 2 - 6, p2Y - 8, p2W + 12, 8);
    ctx.fillStyle = '#78350f';
    ctx.fillRect(tx - p2W / 2 - 3, p2Y - 5, p2W + 6, 3);

    // --- 3. STOCKWERK & SPITZE (TURMSÄULE BIS ZUR KUPPEL) ---
    const p3W = 28;
    const p3Y = topY + 32;

    // Aufstrebende Turmsäule
    ctx.fillStyle = '#d97706';
    ctx.strokeStyle = '#fde047';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(tx - p2W / 2 + 12, p2Y - 8);
    ctx.lineTo(tx - p3W / 2, p3Y);
    ctx.lineTo(tx + p3W / 2, p3Y);
    ctx.lineTo(tx + p2W / 2 - 12, p2Y - 8);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // 3. PLATTFORM (Dritte Etage / Kuppel)
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(tx - 24, p3Y - 6, 48, 6);

    // Laternenkuppel & Funkmast
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(tx, p3Y - 6, 12, Math.PI, 0);
    ctx.fill();

    // Gewaltige Antennenspitze
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(tx, p3Y - 18);
    ctx.lineTo(tx, topY - 14);
    ctx.stroke();

    // Das berühmte 20.000-Lichter-Glitzer-Funkeln (Scintillement der Eiffelturm-Illumination)
    ctx.fillStyle = '#ffffff';
    for (let glitz = 0; glitz < 38; glitz++) {
      const gProgress = (glitz / 38);
      const gy = towerBaseY - gProgress * (towerBaseY - topY);
      const maxSpread = (baseW * 0.45) * (1 - gProgress * 0.85);
      const gx = tx + ((glitz * 43) % (maxSpread * 2)) - maxSpread;
      const gFlash = Math.sin(t * 12 + glitz * 1.7);
      if (gFlash > 0.45) {
        ctx.beginPath();
        ctx.arc(gx, gy, 1.8 + gFlash * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();

    // ==========================================
    // EASTER EGG 1: EIFFELTURM-LEUCHTTURM AN DER SPITZE
    // Zentriert exakt bei x: 1200, y: height * 0.15 (+6600)
    // ==========================================
    const beaconX = tx; // 1200
    const beaconY = height * 0.15;
    ctx.save();
    ctx.translate(beaconX, beaconY);

    const beaconPulse = (Math.sin(t * 3.8) + 1) * 0.5;

    // Leuchtturm-Gehäuse an der Spitze
    ctx.fillStyle = '#fde047';
    ctx.beginPath();
    ctx.arc(0, 0, 16, 0, Math.PI * 2);
    ctx.fill();

    // Strahlende Doppel-Fresnel-Linse
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, 0, 8, 0, Math.PI * 2);
    ctx.fill();

    // Rotierende Scheinwerfer-Strahlen des Leuchtturms
    const rotSpeed = t * 1.6;
    for (let bSide = 0; bSide < 2; bSide++) {
      const bAngle = rotSpeed + bSide * Math.PI;
      const beamGrad = ctx.createRadialGradient(0, 0, 4, Math.cos(bAngle) * 160, Math.sin(bAngle) * 160, 160);
      beamGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      beamGrad.addColorStop(0.3, 'rgba(254, 240, 138, 0.65)');
      beamGrad.addColorStop(0.7, 'rgba(251, 191, 36, 0.25)');
      beamGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(bAngle - 0.14) * 220, Math.sin(bAngle - 0.14) * 220);
      ctx.lineTo(Math.cos(bAngle + 0.14) * 220, Math.sin(bAngle + 0.14) * 220);
      ctx.closePath();
      ctx.fill();
    }

    // Magische Leuchtturm-Aura
    ctx.strokeStyle = `rgba(254, 240, 138, ${0.45 + beaconPulse * 0.55})`;
    ctx.lineWidth = 3;
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 24 + beaconPulse * 16;
    ctx.beginPath();
    ctx.arc(0, 0, 44 + beaconPulse * 8, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.restore();

    // ==========================================
    // 5. SEINE-UFERQUAI IM VORDERGRUND &
    // EASTER EGG 3: HISTORISCHE PARISER STRASSENLATERNE
    // Zentriert exakt bei x: 1840, y: height * 0.68 (+5700)
    // ==========================================
    // Steinerne Uferbalustrade der Seine
    const quayY = height * 0.72;
    ctx.fillStyle = '#334155';
    ctx.fillRect(width * 0.68, quayY, width * 0.32, height - quayY);
    ctx.fillStyle = '#475569';
    ctx.fillRect(width * 0.68, quayY - 14, width * 0.32, 14);

    // Balustraden-Säulchen
    ctx.fillStyle = '#64748b';
    for (let bal = width * 0.70; bal <= width; bal += 28) {
      ctx.fillRect(bal, quayY, 10, 22);
    }
    ctx.fillRect(width * 0.68, quayY + 22, width * 0.32, 8);

    // Easter Egg 3: Historische Pariser Straßenlaterne (Schmiedeeiserne Gaslaterne)
    const lampX = 1840;
    const lampY = height * 0.68;
    ctx.save();
    ctx.translate(lampX, lampY);

    const lampPulse = (Math.sin(t * 3.4) + 1) * 0.5;

    // Laternenmast aus dunklem Pariser Gusseisen (Vert de Paris / Gusseisen)
    ctx.fillStyle = '#0f172a';
    // Sockel
    ctx.fillRect(-12, 18, 24, 28);
    // Kannelierter Mast
    ctx.fillRect(-5, -60, 10, 78);
    // Zierschwünge
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(-14, -50, 10, 0, Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(14, -50, 10, 0, Math.PI);
    ctx.stroke();

    // 4-eckiges Pariser Laternenglas (Lanternenkopf)
    const lanternY = -85;
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-18, lanternY + 24, 36, 6); // Boden
    ctx.fillRect(-22, lanternY - 10, 44, 8); // Dachkrone

    // Dachspitze mit Knauf
    ctx.beginPath();
    ctx.moveTo(-20, lanternY - 10);
    ctx.lineTo(0, lanternY - 26);
    ctx.lineTo(20, lanternY - 10);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, lanternY - 28, 4, 0, Math.PI * 2);
    ctx.fill();

    // Golden strahlende Gaslampe / Leuchtkörper
    const lampLight = ctx.createRadialGradient(0, lanternY + 8, 4, 0, lanternY + 8, 38);
    lampLight.addColorStop(0, '#ffffff'); // Heißer Glühstrumpf
    lampLight.addColorStop(0.3, '#fef08a');
    lampLight.addColorStop(0.7, '#f59e0b');
    lampLight.addColorStop(1, 'rgba(234, 88, 12, 0)');
    ctx.fillStyle = lampLight;
    ctx.beginPath();
    ctx.arc(0, lanternY + 8, 38, 0, Math.PI * 2);
    ctx.fill();

    // Laternen-Glasstreben
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(-16, lanternY - 4, 32, 28);
    ctx.beginPath();
    ctx.moveTo(0, lanternY - 4);
    ctx.lineTo(0, lanternY + 24);
    ctx.stroke();

    // Romantischer Lichtkegel auf den Quai-Boden
    const poolGrad = ctx.createRadialGradient(0, 40, 10, 0, 40, 95);
    poolGrad.addColorStop(0, 'rgba(254, 240, 138, 0.45)');
    poolGrad.addColorStop(0.6, 'rgba(251, 191, 36, 0.20)');
    poolGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = poolGrad;
    ctx.beginPath();
    ctx.ellipse(0, 42, 95, 30, 0, 0, Math.PI * 2);
    ctx.fill();

    // Magische Laternen-Glanzaura
    ctx.strokeStyle = `rgba(254, 240, 138, ${0.45 + lampPulse * 0.45})`;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(0, lanternY + 8, 52, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.restore();

    ctx.restore();
  }

  _renderStonehenge(ctx, width, height, t) {
    ctx.save();

    // ==========================================
    // 1. DÜSTERER MYSTISCHER HIMMEL MIT NEBELBÄNKEN
    // ==========================================
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.72);
    skyGrad.addColorStop(0, '#0f172a');     // Tiefes, unheilvolles Nachtgrau
    skyGrad.addColorStop(0.35, '#1e293b');  // Düsteres Schiefergrau
    skyGrad.addColorStop(0.65, '#334155');  // Nebelgetränkter Horizont
    skyGrad.addColorStop(1.0, '#475569');   // Bodendunst
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // Fahle mystische Sonnenscheibe / Mondschein hinter dichten Wolken
    const sunGrad = ctx.createRadialGradient(width * 0.50, height * 0.32, 10, width * 0.50, height * 0.32, 280);
    sunGrad.addColorStop(0, 'rgba(241, 245, 249, 0.40)');
    sunGrad.addColorStop(0.25, 'rgba(203, 213, 225, 0.22)');
    sunGrad.addColorStop(0.60, 'rgba(148, 163, 184, 0.08)');
    sunGrad.addColorStop(1, 'rgba(15, 23, 42, 0)');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(width * 0.50, height * 0.32, 280, 0, Math.PI * 2);
    ctx.fill();

    // ==========================================
    // 2. WEITE NEBLIGE EBENE VON SALISBURY (GRAS- & MOORLAND)
    // ==========================================
    // Ferne neblige Hügelkette
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.62);
    for (let x = 0; x <= width; x += 100) {
      const y = height * 0.62 + Math.sin(x * 0.003 + 0.5) * 25 + Math.cos(x * 0.006) * 15;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Mittlere Hügel & Heideland
    ctx.fillStyle = '#1c2826';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.66);
    for (let x = 0; x <= width; x += 80) {
      const y = height * 0.66 + Math.sin(x * 0.004 + 1.2) * 20;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Vordergrund-Ebene (Moorgras & feuchter Heideboden)
    const groundGrad = ctx.createLinearGradient(0, height * 0.68, 0, height);
    groundGrad.addColorStop(0, '#192b1f');
    groundGrad.addColorStop(0.4, '#142319');
    groundGrad.addColorStop(1, '#0d1710');
    ctx.fillStyle = groundGrad;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.69);
    for (let x = 0; x <= width; x += 60) {
      const y = height * 0.69 + Math.sin(x * 0.005 + 2.1) * 12;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Grasbüschel-Struktur
    ctx.strokeStyle = '#273f2e';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 90; i++) {
      const gx = (i * 29 + Math.sin(i) * 15) % width;
      const gy = height * 0.72 + (i * 17) % (height * 0.26);
      ctx.beginPath();
      ctx.moveTo(gx, gy);
      ctx.lineTo(gx - 4 + Math.sin(i * 3) * 6, gy - 8 - Math.cos(i) * 6);
      ctx.stroke();
    }

    // ==========================================
    // 3. DER PRÄHISTORISCHE STEINKREIS (STONEHENGE MEGALITHS)
    // ==========================================
    const drawStone = (sx, sy, sw, sh, isLintel = false) => {
      ctx.save();
      if (!isLintel) {
        ctx.fillStyle = 'rgba(5, 10, 8, 0.45)';
        ctx.beginPath();
        ctx.ellipse(sx + sw * 0.4, sy + sh + 4, sw * 0.8, 12, 0.1, 0, Math.PI * 2);
        ctx.fill();
      }

      const stoneGrad = ctx.createLinearGradient(sx, sy, sx + sw, sy + sh);
      stoneGrad.addColorStop(0, '#64748b');
      stoneGrad.addColorStop(0.35, '#475569');
      stoneGrad.addColorStop(0.70, '#334155');
      stoneGrad.addColorStop(1.0, '#1e293b');
      ctx.fillStyle = stoneGrad;

      ctx.beginPath();
      ctx.moveTo(sx + 4, sy);
      ctx.lineTo(sx + sw - 3, sy + 2);
      ctx.lineTo(sx + sw + 2, sy + sh - 4);
      ctx.lineTo(sx + sw - 2, sy + sh);
      ctx.lineTo(sx - 3, sy + sh - 2);
      ctx.lineTo(sx - 2, sy + 6);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = 'rgba(203, 213, 225, 0.25)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = 'rgba(74, 95, 68, 0.35)';
      ctx.beginPath();
      ctx.arc(sx + sw * 0.35, sy + sh * 0.65, sw * 0.3, 0, Math.PI * 2);
      ctx.arc(sx + sw * 0.65, sy + sh * 0.82, sw * 0.25, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(15, 23, 42, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(sx + sw * 0.45, sy + sh * 0.25);
      ctx.lineTo(sx + sw * 0.52, sy + sh * 0.55);
      ctx.lineTo(sx + sw * 0.38, sy + sh * 0.78);
      ctx.stroke();

      ctx.restore();
    };

    // Äußerer Steinkreis
    drawStone(360, height * 0.52, 45, 120);
    drawStone(520, height * 0.50, 48, 130);
    drawStone(1880, height * 0.50, 50, 132);
    drawStone(2040, height * 0.52, 46, 122);

    // Hufeisen-Trilithonen
    drawStone(750, height * 0.42, 65, 185);
    drawStone(870, height * 0.41, 68, 190);
    drawStone(730, height * 0.37, 225, 46, true);

    drawStone(1480, height * 0.41, 68, 190);
    drawStone(1600, height * 0.42, 65, 185);
    drawStone(1460, height * 0.37, 225, 46, true);

    drawStone(1110, height * 0.35, 75, 230);
    drawStone(1260, height * 0.34, 78, 235);
    drawStone(1090, height * 0.30, 265, 52, true);

    drawStone(640, height * 0.48, 52, 150);
    drawStone(1010, height * 0.46, 56, 160);
    drawStone(1390, height * 0.46, 58, 162);
    drawStone(1760, height * 0.48, 54, 152);

    // ==========================================
    // EASTER EGG 1: HEILIGER DRUIDEN-ALTARSTEIN
    // ==========================================
    const altarX = 1200;
    const altarY = height * 0.58;
    ctx.save();
    ctx.translate(altarX, altarY);

    const altarPulse = (Math.sin(t * 3.2) + 1) * 0.5;

    const altarGrad = ctx.createLinearGradient(-80, -25, 80, 25);
    altarGrad.addColorStop(0, '#64748b');
    altarGrad.addColorStop(0.5, '#475569');
    altarGrad.addColorStop(1, '#1e293b');
    ctx.fillStyle = altarGrad;
    ctx.beginPath();
    ctx.roundRect(-85, -20, 170, 42, [12, 14, 10, 16]);
    ctx.fill();
    ctx.strokeStyle = 'rgba(203, 213, 225, 0.4)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.strokeStyle = `rgba(147, 197, 253, ${0.45 + altarPulse * 0.55})`;
    ctx.shadowColor = '#60a5fa';
    ctx.shadowBlur = 12 + altarPulse * 14;
    ctx.lineWidth = 2.5;

    ctx.beginPath();
    ctx.arc(-25, 0, 10, 0, Math.PI * 1.5);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(25, 0, 10, Math.PI * 0.5, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, -6, 8, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();

    // ==========================================
    // EASTER EGG 2: MYSTISCHER MEGALITHEN-DECKSTEIN
    // ==========================================
    const lintelPulse = (Math.sin(t * 2.8 + 1.5) + 1) * 0.5;
    ctx.save();
    ctx.strokeStyle = `rgba(253, 224, 71, ${0.35 + lintelPulse * 0.45})`;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 14;
    ctx.strokeRect(730, height * 0.37 - 2, 225, 50);
    ctx.restore();

    // ==========================================
    // EASTER EGG 3: KELTISCHER RABE IM NEBEL
    // ==========================================
    const ravenX = 1720;
    const ravenY = height * 0.42;
    ctx.save();
    ctx.translate(ravenX, ravenY);

    const ravenHop = Math.sin(t * 4.0) * 2.5;
    ctx.translate(0, ravenHop);

    ctx.fillStyle = '#090d16';
    ctx.beginPath();
    ctx.ellipse(0, 0, 16, 10, -0.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(12, -7, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.moveTo(18, -8);
    ctx.lineTo(27, -5);
    ctx.lineTo(17, -3);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#ef4444';
    ctx.shadowColor = '#f87171';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.arc(14, -8, 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#090d16';
    ctx.beginPath();
    ctx.moveTo(-12, 2);
    ctx.lineTo(-26, 10);
    ctx.lineTo(-14, 7);
    ctx.closePath();
    ctx.fill();

    ctx.restore();

    // ==========================================
    // 4. SANFTE BODENNEBEL-SCHLEIER AM STEINFUSS
    // ==========================================
    for (let j = 0; j < 5; j++) {
      const fogY = height * (0.64 + j * 0.06);
      const fogGrad = ctx.createLinearGradient(0, fogY - 30, 0, fogY + 30);
      fogGrad.addColorStop(0, 'rgba(226, 232, 240, 0)');
      fogGrad.addColorStop(0.5, `rgba(226, 232, 240, ${0.08 + j * 0.02})`);
      fogGrad.addColorStop(1, 'rgba(226, 232, 240, 0)');
      ctx.fillStyle = fogGrad;
      ctx.fillRect(0, fogY - 30, width, 60);
    }

    ctx.restore();
  }

  _renderLeaningTowerPisa(ctx, width, height, t) {
    ctx.save();

    // ==========================================
    // 1. STRAHLEND BLAUER ITALIENISCHER TOSKANA-HIMMEL
    // ==========================================
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.72);
    skyGrad.addColorStop(0, '#0284c7');    // Kräftiges Mittelmeerblau
    skyGrad.addColorStop(0.35, '#38bdf8'); // Toskanisches Himmelblau
    skyGrad.addColorStop(0.70, '#7dd3fc'); // Azurblau am Horizont
    skyGrad.addColorStop(1.0, '#bae6fd');  // Zarter Dunst über der Ebene
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // Warme mediterrane Sonne hinter leichten Wolken
    const sunGrad = ctx.createRadialGradient(width * 0.75, height * 0.22, 10, width * 0.75, height * 0.22, 180);
    sunGrad.addColorStop(0, 'rgba(255, 255, 255, 0.75)');
    sunGrad.addColorStop(0.25, 'rgba(254, 240, 138, 0.45)');
    sunGrad.addColorStop(0.70, 'rgba(253, 224, 71, 0.10)');
    sunGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(width * 0.75, height * 0.22, 180, 0, Math.PI * 2);
    ctx.fill();

    // Zarte, sonnendurchflutete Schleierwolken
    ctx.fillStyle = 'rgba(255, 255, 255, 0.32)';
    for (let c = 0; c < 5; c++) {
      const cx = (width * 0.15 + c * 480) % width;
      const cy = height * 0.12 + Math.sin(c * 1.5) * 35;
      ctx.beginPath();
      ctx.ellipse(cx, cy, 140, 26, 0.04, 0, Math.PI * 2);
      ctx.fill();
    }

    // ==========================================
    // 2. DIE WUNDERWIESE (PIAZZA DEI MIRACOLI)
    // ==========================================
    // Ferne toskanische Hügelkette (Monte Pisano)
    ctx.fillStyle = '#64748b';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.68);
    for (let x = 0; x <= width; x += 100) {
      const y = height * 0.68 + Math.sin(x * 0.003 + 0.8) * 22;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Frischer, saftig grüner Rasen der Piazza dei Miracoli
    const lawnGrad = ctx.createLinearGradient(0, height * 0.70, 0, height);
    lawnGrad.addColorStop(0, '#22c55e');
    lawnGrad.addColorStop(0.35, '#16a34a');
    lawnGrad.addColorStop(1.0, '#15803d');
    ctx.fillStyle = lawnGrad;
    ctx.fillRect(0, height * 0.70, width, height * 0.30);

    // Pflastersteinwege & Marmor-Bordsteine
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.ellipse(width * 0.5, height * 0.88, width * 0.45, 38, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = lawnGrad;
    ctx.beginPath();
    ctx.ellipse(width * 0.5, height * 0.88, width * 0.44, 34, 0, 0, Math.PI * 2);
    ctx.fill();

    // ==========================================
    // 3. DER DOM ZU PISA (DUOMO DI SANTA MARIA ASSUNTA)
    // ==========================================
    const duomoBaseX = 820;
    const duomoBaseY = height * 0.72;

    ctx.save();
    // Dom-Schatten
    ctx.fillStyle = 'rgba(15, 23, 42, 0.25)';
    ctx.beginPath();
    ctx.ellipse(duomoBaseX, duomoBaseY + 6, 260, 24, 0, 0, Math.PI * 2);
    ctx.fill();

    // Dom-Langhaus (Weißer Carrara-Marmor & graue Granitbänder)
    const marbleGrad = ctx.createLinearGradient(duomoBaseX - 220, 0, duomoBaseX + 220, 0);
    marbleGrad.addColorStop(0, '#f8fafc');
    marbleGrad.addColorStop(0.5, '#ffffff');
    marbleGrad.addColorStop(1.0, '#e2e8f0');
    ctx.fillStyle = marbleGrad;
    ctx.fillRect(duomoBaseX - 200, duomoBaseY - 140, 400, 140);
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.strokeRect(duomoBaseX - 200, duomoBaseY - 140, 400, 140);

    // Romanische Säulenarkaden der Dom-Fassade
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    for (let tier = 0; tier < 3; tier++) {
      const ty = duomoBaseY - 45 - tier * 38;
      ctx.fillStyle = '#f1f5f9';
      ctx.fillRect(duomoBaseX - 190, ty, 380, 6);
      for (let col = 0; col < 14; col++) {
        const cx = duomoBaseX - 180 + col * 27;
        ctx.beginPath();
        ctx.moveTo(cx, ty);
        ctx.lineTo(cx, ty + 32);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx + 13.5, ty + 10, 10, Math.PI, 0);
        ctx.stroke();
      }
    }

    // EASTER EGG 2: MARMORKUPPEL DES DOMS ZU PISA
    const domeY = duomoBaseY - 140;
    const domePulse = (Math.sin(t * 3.4) + 1) * 0.5;

    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(duomoBaseX - 70, domeY - 40, 140, 40);
    ctx.strokeRect(duomoBaseX - 70, domeY - 40, 140, 40);

    const domeGrad = ctx.createRadialGradient(duomoBaseX - 15, domeY - 70, 10, duomoBaseX, domeY - 50, 75);
    domeGrad.addColorStop(0, '#ffffff');
    domeGrad.addColorStop(0.5, '#f1f5f9');
    domeGrad.addColorStop(0.85, '#cbd5e1');
    domeGrad.addColorStop(1.0, '#94a3b8');
    ctx.fillStyle = domeGrad;
    ctx.beginPath();
    ctx.ellipse(duomoBaseX, domeY - 40, 65, 50, 0, Math.PI, 0);
    ctx.fill();
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(duomoBaseX - 10, domeY - 105, 20, 20);
    ctx.strokeStyle = `rgba(250, 204, 21, ${0.75 + domePulse * 0.25})`;
    ctx.shadowColor = '#eab308';
    ctx.shadowBlur = 10 + domePulse * 8;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(duomoBaseX, domeY - 105);
    ctx.lineTo(duomoBaseX, domeY - 125);
    ctx.moveTo(duomoBaseX - 7, domeY - 118);
    ctx.lineTo(duomoBaseX + 7, domeY - 118);
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.restore();

    // ==========================================
    // 4. DER SCHIEFE TURM VON PISA (CAMPANILE)
    // ==========================================
    const towerX = 1510;
    const towerY = height * 0.72;
    const leanAngle = 0.075;

    ctx.save();
    ctx.translate(towerX, towerY);
    ctx.rotate(leanAngle);

    const towerW = 100;
    const towerH = height * 0.58;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.35)';
    ctx.beginPath();
    ctx.ellipse(0, 10, towerW * 0.75, 18, 0, 0, Math.PI * 2);
    ctx.fill();

    const tierH = towerH / 7.2;
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.fillRect(-towerW * 0.5, -tierH, towerW, tierH);
    ctx.strokeRect(-towerW * 0.5, -tierH, towerW, tierH);

    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    for (let r = 0; r < 5; r++) {
      const rx = -towerW * 0.4 + r * (towerW * 0.2);
      ctx.beginPath();
      ctx.moveTo(rx, -tierH * 0.5);
      ctx.lineTo(rx + 8, -tierH * 0.75);
      ctx.lineTo(rx + 16, -tierH * 0.5);
      ctx.lineTo(rx + 8, -tierH * 0.25);
      ctx.closePath();
      ctx.stroke();
    }

    for (let g = 1; g <= 5; g++) {
      const gy = -tierH - g * (tierH * 0.95);
      const gh = tierH * 0.95;
      const gw = towerW * (1.0 - g * 0.02);

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-gw * 0.5, gy, gw, gh);
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 2;
      ctx.strokeRect(-gw * 0.5, gy, gw, gh);

      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(-gw * 0.5 - 4, gy + gh - 6, gw + 8, 6);

      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 1.6;
      const colCount = 8;
      for (let c = 0; c < colCount; c++) {
        const colX = -gw * 0.44 + c * (gw * 0.88 / (colCount - 1));
        ctx.beginPath();
        ctx.moveTo(colX, gy + 4);
        ctx.lineTo(colX, gy + gh - 6);
        ctx.stroke();
        if (c < colCount - 1) {
          const nextX = -gw * 0.44 + (c + 1) * (gw * 0.88 / (colCount - 1));
          ctx.beginPath();
          ctx.arc((colX + nextX) * 0.5, gy + 11, (nextX - colX) * 0.5, Math.PI, 0);
          ctx.stroke();
        }
      }
    }

    // ==========================================
    // EASTER EGG 1: SCHIEFE GLOCKENSTUBE AN DER TURMSPITZE
    // ==========================================
    const belfryY = -towerH * 0.95;
    const belfryH = tierH * 1.15;
    const belfryW = towerW * 0.82;
    const belfryPulse = (Math.sin(t * 3.6) + 1) * 0.5;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-belfryW * 0.5, belfryY, belfryW, belfryH);
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.strokeRect(-belfryW * 0.5, belfryY, belfryW, belfryH);

    for (let b = 0; b < 3; b++) {
      const bx = -belfryW * 0.3 + b * (belfryW * 0.3);
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.roundRect(bx - 8, belfryY + 6, 16, belfryH - 12, [6, 6, 2, 2]);
      ctx.fill();

      const bellSwing = Math.sin(t * 4.0 + b) * 0.2;
      ctx.save();
      ctx.translate(bx, belfryY + 12);
      ctx.rotate(bellSwing);
      ctx.fillStyle = '#d97706';
      ctx.beginPath();
      ctx.moveTo(-5, 0);
      ctx.lineTo(5, 0);
      ctx.lineTo(7, 12);
      ctx.lineTo(-7, 12);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    ctx.strokeStyle = `rgba(234, 179, 8, ${0.45 + belfryPulse * 0.55})`;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#eab308';
    ctx.shadowBlur = 12 + belfryPulse * 8;
    ctx.strokeRect(-belfryW * 0.52, belfryY - 6, belfryW * 1.04, 7);
    ctx.shadowBlur = 0;

    ctx.restore();

    // ==========================================
    // EASTER EGG 3: GALILEIS FALLVERSUCH-BRONZEKUGEL
    // ==========================================
    const ballX = 1420;
    const ballY = height * 0.44;
    const ballPulse = (Math.sin(t * 3.8 + 2.0) + 1) * 0.5;

    ctx.save();
    ctx.translate(ballX, ballY);

    const fallDrift = (t * 22) % 36;
    ctx.translate(0, fallDrift);

    const ballGrad = ctx.createRadialGradient(-3, -3, 2, 0, 0, 14);
    ballGrad.addColorStop(0, '#fef08a');
    ballGrad.addColorStop(0.35, '#f59e0b');
    ballGrad.addColorStop(0.75, '#b45309');
    ballGrad.addColorStop(1.0, '#78350f');
    ctx.fillStyle = ballGrad;
    ctx.beginPath();
    ctx.arc(0, 0, 13, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = `rgba(253, 224, 71, ${0.45 + ballPulse * 0.55})`;
    ctx.lineWidth = 2.0;
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 14;
    ctx.stroke();

    ctx.restore();

    ctx.restore();
  }

  _renderEasterIslandMoai(ctx, width, height, t) {
    ctx.save();

    // ==========================================
    // 1. DÜSTERER STÜRMISCHER GEWITTERHIMMEL ÜBER DEM SÜDPAZIFIK
    // ==========================================
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.65);
    skyGrad.addColorStop(0, '#0f172a');    // Unheilvolles Nachtschwarz-Grau
    skyGrad.addColorStop(0.35, '#1e1b4b'); // Dunkelviolette Sturmfront
    skyGrad.addColorStop(0.70, '#312e81'); // Indigo Gewitterwolken
    skyGrad.addColorStop(1.0, '#334155');  // Horizont-Schleier
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // Aufziehende gewaltige Kumulus-Gewitterwolken
    for (let c = 0; c < 8; c++) {
      const cx = (c * 340 + Math.sin(c * 2) * 60) % width;
      const cy = height * 0.16 + (c % 3) * 45;
      const cloudGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, 180);
      cloudGrad.addColorStop(0, 'rgba(51, 65, 85, 0.65)');
      cloudGrad.addColorStop(0.5, 'rgba(30, 41, 59, 0.45)');
      cloudGrad.addColorStop(1, 'rgba(15, 23, 42, 0)');
      ctx.fillStyle = cloudGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 180, 0, Math.PI * 2);
      ctx.fill();
    }

    // ==========================================
    // 2. DER WEITE PAZIFISCHE OZEAN & STÜRMISCHE BRANDUNG
    // ==========================================
    const seaGrad = ctx.createLinearGradient(0, height * 0.50, 0, height * 0.68);
    seaGrad.addColorStop(0, '#0c4a6e');    // Tiefes Ozeanblau
    seaGrad.addColorStop(0.5, '#075985');  // Tosende Wellen
    seaGrad.addColorStop(1.0, '#0284c7');  // Küstengischt
    ctx.fillStyle = seaGrad;
    ctx.fillRect(0, height * 0.50, width, height * 0.20);

    // Schäumende weiße Wellenkämme am Ozean-Horizont
    ctx.strokeStyle = 'rgba(241, 245, 249, 0.65)';
    ctx.lineWidth = 2.0;
    for (let w = 0; w < 12; w++) {
      const wy = height * (0.52 + w * 0.012);
      ctx.beginPath();
      for (let wx = 0; wx <= width; wx += 80) {
        const waveH = Math.sin(wx * 0.015 + t * 3.5 + w) * 4;
        if (wx === 0) ctx.moveTo(wx, wy + waveH);
        else ctx.lineTo(wx, wy + waveH);
      }
      ctx.stroke();
    }

    // ==========================================
    // 3. KARGE VULKANGRASEBENE (RAPA NUI HÜGELLANDSCHAFT)
    // ==========================================
    // Hintergrund-Vulkanhügel (Rano Raraku)
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.58);
    for (let x = 0; x <= width; x += 120) {
      const y = height * 0.58 + Math.sin(x * 0.002 + 1.1) * 35 + Math.cos(x * 0.005) * 15;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Windgepeitschtes ocker-grünes Tussock-Gras
    const grassGrad = ctx.createLinearGradient(0, height * 0.64, 0, height);
    grassGrad.addColorStop(0, '#3f6212');  // Olivgrün
    grassGrad.addColorStop(0.35, '#365314'); // Dunkles Tussock-Gras
    grassGrad.addColorStop(1.0, '#1a2e05');  // Feuchter vulkanischer Basaltboden
    ctx.fillStyle = grassGrad;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.65);
    for (let x = 0; x <= width; x += 80) {
      const y = height * 0.65 + Math.sin(x * 0.003 + 2.4) * 20;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Grasbüschel & vulkanische Basaltbrocken
    ctx.strokeStyle = '#4d7c0f';
    ctx.lineWidth = 1.6;
    for (let g = 0; g < 80; g++) {
      const gx = (g * 31 + Math.sin(g) * 15) % width;
      const gy = height * 0.72 + (g * 19) % (height * 0.25);
      ctx.beginPath();
      ctx.moveTo(gx, gy);
      ctx.lineTo(gx - 6 + Math.sin(g * 2 + t * 4) * 5, gy - 10);
      ctx.stroke();
    }

    // ==========================================
    // 4. DIE AHU-TONGARIKI STEINPLATTFORM (ZEREMONIELLER SOCKEL)
    // ==========================================
    const ahuY = height * 0.68;
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(400, ahuY, 1600, 36);
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(400, ahuY, 1600, 36);

    // Steinquader-Fugen auf der Plattform
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2;
    for (let f = 450; f < 2000; f += 90) {
      ctx.beginPath();
      ctx.moveTo(f, ahuY);
      ctx.lineTo(f, ahuY + 36);
      ctx.stroke();
    }

    // ==========================================
    // 5. DIE MONUMENTALEN MOAI-STATUEN (VULKANTUFF-MEGALITHEN)
    // ==========================================
    const drawMoai = (mx, my, mw, mh, hasPukao = false) => {
      ctx.save();

      // Schlagschatten der Moai-Statue auf der Plattform
      ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
      ctx.beginPath();
      ctx.ellipse(mx + mw * 0.35, my + mh + 4, mw * 0.7, 14, 0, 0, Math.PI * 2);
      ctx.fill();

      // Moai-Körper / Büste (Vulkanischer Tuffstein)
      const stoneGrad = ctx.createLinearGradient(mx - mw * 0.5, my, mx + mw * 0.5, my + mh);
      stoneGrad.addColorStop(0, '#94a3b8');   // Fahl beleuchtete Kante
      stoneGrad.addColorStop(0.35, '#64748b'); // Verwitterter Tuffstein
      stoneGrad.addColorStop(0.70, '#475569'); // Steinschattierung
      stoneGrad.addColorStop(1.0, '#334155');  // Tiefschatten
      ctx.fillStyle = stoneGrad;

      // 1. Torso & Schultern
      const torsoH = mh * 0.45;
      const torsoY = my + mh - torsoH;
      ctx.beginPath();
      ctx.moveTo(mx - mw * 0.55, my + mh);
      ctx.lineTo(mx - mw * 0.45, torsoY);
      ctx.lineTo(mx + mw * 0.45, torsoY);
      ctx.lineTo(mx + mw * 0.55, my + mh);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Eingemeißelte Hände / Arme auf dem Bauch
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(mx - mw * 0.35, torsoY + 20);
      ctx.lineTo(mx - mw * 0.20, my + mh - 12);
      ctx.lineTo(mx, my + mh - 12);
      ctx.moveTo(mx + mw * 0.35, torsoY + 20);
      ctx.lineTo(mx + mw * 0.20, my + mh - 12);
      ctx.lineTo(mx, my + mh - 12);
      ctx.stroke();

      // 2. Monumentaler Moai-Kopf
      const headH = mh * 0.60;
      const headY = my;
      ctx.beginPath();
      ctx.moveTo(mx - mw * 0.42, headY + 8);
      ctx.lineTo(mx - mw * 0.40, torsoY);
      ctx.lineTo(mx + mw * 0.40, torsoY);
      ctx.lineTo(mx + mw * 0.42, headY + 8);
      ctx.lineTo(mx + mw * 0.30, headY);
      ctx.lineTo(mx - mw * 0.30, headY);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // 3. Markantes Gesicht (Tiefe Augenhöhlen, Hakennase, Kinn)
      // Tief liegende Augenhöhlen
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.roundRect(mx - mw * 0.32, headY + headH * 0.22, mw * 0.26, 12, 3);
      ctx.roundRect(mx + mw * 0.06, headY + headH * 0.22, mw * 0.26, 12, 3);
      ctx.fill();

      // Ausgeprägte, stoische Hakennase
      ctx.fillStyle = '#64748b';
      ctx.beginPath();
      ctx.moveTo(mx - 5, headY + headH * 0.18);
      ctx.lineTo(mx + 5, headY + headH * 0.18);
      ctx.lineTo(mx + 9, headY + headH * 0.54);
      ctx.lineTo(mx - 9, headY + headH * 0.54);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Feste, verschlossene Lippen
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(mx - mw * 0.22, headY + headH * 0.66);
      ctx.lineTo(mx + mw * 0.22, headY + headH * 0.66);
      ctx.stroke();

      // Ausladendes, mächtiges Kinn
      ctx.fillStyle = '#475569';
      ctx.beginPath();
      ctx.moveTo(mx - mw * 0.28, headY + headH * 0.75);
      ctx.lineTo(mx + mw * 0.28, headY + headH * 0.75);
      ctx.lineTo(mx + mw * 0.18, torsoY + 4);
      ctx.lineTo(mx - mw * 0.18, torsoY + 4);
      ctx.closePath();
      ctx.fill();

      // Typische langgezogene Moai-Ohren
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.moveTo(mx - mw * 0.42, headY + headH * 0.20);
      ctx.lineTo(mx - mw * 0.46, headY + headH * 0.65);
      ctx.moveTo(mx + mw * 0.42, headY + headH * 0.20);
      ctx.lineTo(mx + mw * 0.46, headY + headH * 0.65);
      ctx.stroke();

      // Roter zylindrischer Schlackenstein (Pukao-Kopfputz)
      if (hasPukao) {
        const pukaoW = mw * 0.75;
        const pukaoH = headH * 0.32;
        const pukaoY = headY - pukaoH + 6;

        const pukaoGrad = ctx.createLinearGradient(mx - pukaoW * 0.5, pukaoY, mx + pukaoW * 0.5, pukaoY + pukaoH);
        pukaoGrad.addColorStop(0, '#f87171');
        pukaoGrad.addColorStop(0.4, '#dc2626');
        pukaoGrad.addColorStop(1.0, '#7f1d1d');
        ctx.fillStyle = pukaoGrad;
        ctx.beginPath();
        ctx.roundRect(mx - pukaoW * 0.5, pukaoY, pukaoW, pukaoH, [8, 8, 4, 4]);
        ctx.fill();
        ctx.strokeStyle = '#450a0a';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Oberer Pukao-Knoten
        ctx.beginPath();
        ctx.arc(mx, pukaoY - 4, pukaoW * 0.22, Math.PI, 0);
        ctx.fill();
        ctx.stroke();
      }

      ctx.restore();
    };

    // Die Reihe der Moai-Ahnenstatuen
    drawMoai(620, ahuY - 210, 68, 210, false);
    drawMoai(900, ahuY - 235, 75, 235, false);
    drawMoai(1200, ahuY - 265, 85, 265, true); // Haupt-Moai mit rotem Pukao
    drawMoai(1500, ahuY - 230, 74, 230, false);
    drawMoai(1780, ahuY - 205, 66, 205, false);

    // ==========================================
    // EASTER EGG 1: ZEREMONIELLER MOAI-KOPFSCHMUCK PUKAO
    // Zentriert beim Haupt-Moai bei x: 1200, y: height * 0.28 (+6900)
    // ==========================================
    const pukaoPulse = (Math.sin(t * 3.8) + 1) * 0.5;
    ctx.save();
    ctx.strokeStyle = `rgba(239, 68, 68, ${0.45 + pukaoPulse * 0.55})`;
    ctx.lineWidth = 3.0;
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 14 + pukaoPulse * 10;
    ctx.strokeRect(1200 - 36, height * 0.28 - 25, 72, 45);
    ctx.restore();

    // ==========================================
    // EASTER EGG 2: GEHEIMES VOGELMANN-PETROGLYPH (TANGATA MANU)
    // Zentriert bei x: 580, y: height * 0.62 (+6400)
    // ==========================================
    const birdPulse = (Math.sin(t * 3.2 + 1.2) + 1) * 0.5;
    ctx.save();
    ctx.translate(580, height * 0.62);

    // Vogelmann-Symbolik (Vogelkopf, Schnabel & menschlicher Körper in Stein)
    ctx.strokeStyle = `rgba(56, 189, 248, ${0.45 + birdPulse * 0.55})`;
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 12 + birdPulse * 8;
    ctx.lineWidth = 2.5;

    // Kurviger Schnabel & Vogelkopf
    ctx.beginPath();
    ctx.arc(0, -12, 10, 0, Math.PI * 1.5);
    ctx.moveTo(0, -22);
    ctx.lineTo(16, -18);
    ctx.lineTo(4, -12);
    // Körper & Ei-Symbol
    ctx.moveTo(0, -2);
    ctx.lineTo(-12, 14);
    ctx.lineTo(12, 14);
    ctx.closePath();
    ctx.stroke();

    ctx.restore();

    // ==========================================
    // EASTER EGG 3: AHU-TONGARIKI AHNEN-STEINPLATTFORM
    // Zentriert bei x: 1820, y: height * 0.68 (+6000)
    // ==========================================
    const ahuPulse = (Math.sin(t * 3.0 + 2.4) + 1) * 0.5;
    ctx.save();
    ctx.strokeStyle = `rgba(250, 204, 21, ${0.45 + ahuPulse * 0.55})`;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#eab308';
    ctx.shadowBlur = 12;
    ctx.strokeRect(1820 - 45, height * 0.68 - 4, 90, 42);
    ctx.restore();

    ctx.restore();
  }

  _renderTowerBridgeLondon(ctx, width, height, t) {
    ctx.save();

    // ==========================================
    // 1. VIKTORIANISCHER LONDONER ABENDHIMMEL
    // ==========================================
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.70);
    skyGrad.addColorStop(0, '#090d16');    // Tiefes Londoner Nachthimmel-Blau
    skyGrad.addColorStop(0.35, '#1e1b4b'); // Dunkelviolette Dämmerung
    skyGrad.addColorStop(0.70, '#1e293b'); // Warm beleuchteter Stadtdunst
    skyGrad.addColorStop(1.0, '#334155');  // Horizont über den Dächern
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // Sanfter Mondschein & Londoner Abenddunst
    const moonGrad = ctx.createRadialGradient(width * 0.22, height * 0.18, 10, width * 0.22, height * 0.18, 160);
    moonGrad.addColorStop(0, 'rgba(255, 255, 255, 0.70)');
    moonGrad.addColorStop(0.25, 'rgba(254, 240, 138, 0.35)');
    moonGrad.addColorStop(0.65, 'rgba(253, 224, 71, 0.08)');
    moonGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = moonGrad;
    ctx.beginPath();
    ctx.arc(width * 0.22, height * 0.18, 160, 0, Math.PI * 2);
    ctx.fill();

    // ==========================================
    // 2. DIE THEMSE (RIVER THAMES) MIT LICHTSPIEGELUNGEN
    // ==========================================
    const thamesGrad = ctx.createLinearGradient(0, height * 0.68, 0, height);
    thamesGrad.addColorStop(0, '#0f172a');  // Tiefes Flusswasser
    thamesGrad.addColorStop(0.4, '#1e293b'); // Reflektierende Wasserfläche
    thamesGrad.addColorStop(1.0, '#0b1329'); // Uferschatten
    ctx.fillStyle = thamesGrad;
    ctx.fillRect(0, height * 0.68, width, height * 0.32);

    // Goldene und königsblaue Lichtspiegelungen der Brücke auf den Wellen
    for (let rw = 0; rw < 22; rw++) {
      const rwy = height * (0.71 + rw * 0.013);
      const rwAlpha = 0.22 + Math.sin(t * 3.0 + rw) * 0.12;
      const rGrad = ctx.createLinearGradient(width * 0.35, 0, width * 0.65, 0);
      rGrad.addColorStop(0, 'rgba(254, 240, 138, 0)');
      rGrad.addColorStop(0.25, `rgba(254, 240, 138, ${rwAlpha})`);
      rGrad.addColorStop(0.50, `rgba(56, 189, 248, ${rwAlpha * 0.8})`);
      rGrad.addColorStop(0.75, `rgba(254, 240, 138, ${rwAlpha})`);
      rGrad.addColorStop(1, 'rgba(254, 240, 138, 0)');
      ctx.fillStyle = rGrad;
      ctx.fillRect(width * 0.25, rwy, width * 0.50, 3.5);
    }

    // ==========================================
    // 3. DIE VIKTORIANISCHE TOWER BRIDGE
    // Nordturm bei ca. x: 920, Südturm bei ca. x: 1480
    // ==========================================
    const tNorthX = 920;
    const tSouthX = 1480;
    const bridgeY = height * 0.62;
    const towerBaseY = height * 0.72;
    const towerH = height * 0.52;
    const towerW = 140;

    // Funktion zum Zeichnen eines Tower-Bridge-Turms (Portland-Stein & Neugotik)
    const drawTower = (tx, isNorth = false) => {
      ctx.save();

      // Pfeilerfundament in der Themse (Granitsockel)
      ctx.fillStyle = '#334155';
      ctx.beginPath();
      ctx.ellipse(tx, towerBaseY + 6, towerW * 0.85, 22, 0, 0, Math.PI * 2);
      ctx.fill();

      // Haupt-Turmkörper (Portland-Sandstein mit Granitverblendung)
      const stoneGrad = ctx.createLinearGradient(tx - towerW * 0.5, 0, tx + towerW * 0.5, 0);
      stoneGrad.addColorStop(0, '#94a3b8');   // Helle Kante
      stoneGrad.addColorStop(0.35, '#cbd5e1'); // Viktorianischer Werkstein
      stoneGrad.addColorStop(0.70, '#64748b'); // Schattenseite
      stoneGrad.addColorStop(1.0, '#475569');
      ctx.fillStyle = stoneGrad;
      ctx.fillRect(tx - towerW * 0.5, towerBaseY - towerH, towerW, towerH);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(tx - towerW * 0.5, towerBaseY - towerH, towerW, towerH);

      // Großer neugotischer Bogen über der Fahrbahn
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.roundRect(tx - towerW * 0.35, bridgeY - 75, towerW * 0.70, 75, [25, 25, 0, 0]);
      ctx.fill();
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Beleuchtete Bogenfenster im Obergeschoss
      for (let win = 0; win < 2; win++) {
        const wx = tx - 30 + win * 60;
        const wy = towerBaseY - towerH + 60;
        ctx.fillStyle = '#fef08a';
        ctx.shadowColor = '#facc15';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.roundRect(wx - 14, wy, 28, 48, [12, 12, 2, 2]);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Zinnenkranz & Ecktürmchen (Turrets)
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(tx - towerW * 0.54, towerBaseY - towerH - 8, towerW * 1.08, 10);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.strokeRect(tx - towerW * 0.54, towerBaseY - towerH - 8, towerW * 1.08, 10);

      // Die 4 neugotischen Zier-Glockenhelme (Eckspitzen)
      const turretPositions = [-towerW * 0.44, towerW * 0.44];
      for (let tp of turretPositions) {
        const px = tx + tp;
        const py = towerBaseY - towerH - 8;
        // Ziertürmchen-Schaft
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(px - 14, py - 32, 28, 32);
        ctx.strokeRect(px - 14, py - 32, 28, 32);

        // Glockenhelm-Spitze (Kupfer/Zink/Schiefer)
        const helmGrad = ctx.createLinearGradient(px - 14, py - 32, px + 14, py - 78);
        helmGrad.addColorStop(0, '#0284c7'); // Typisches Tower-Bridge-Königsblau
        helmGrad.addColorStop(0.5, '#0369a1');
        helmGrad.addColorStop(1.0, '#0c4a6e');
        ctx.fillStyle = helmGrad;
        ctx.beginPath();
        ctx.moveTo(px - 16, py - 32);
        ctx.lineTo(px, py - 78);
        ctx.lineTo(px + 16, py - 32);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      ctx.restore();
    };

    // --- HOCHLIEGENDE FUSSGÄNGERSTEGE (HIGH-LEVEL WALKWAYS) ---
    const walkwayY = towerBaseY - towerH + 28;
    ctx.save();
    // Steg 1 & Steg 2
    for (let wk = 0; wk < 2; wk++) {
      const wy = walkwayY + wk * 24;
      ctx.fillStyle = '#0284c7'; // Königsblau gestrichener Stahl
      ctx.fillRect(tNorthX + towerW * 0.45, wy, (tSouthX - tNorthX) - towerW * 0.90, 16);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.strokeRect(tNorthX + towerW * 0.45, wy, (tSouthX - tNorthX) - towerW * 0.90, 16);

      // Erleuchtete Fenster im Steg
      ctx.fillStyle = '#fef08a';
      ctx.shadowColor = '#fde047';
      ctx.shadowBlur = 8;
      for (let fw = tNorthX + towerW * 0.52; fw < tSouthX - towerW * 0.52; fw += 32) {
        ctx.fillRect(fw, wy + 3, 16, 10);
      }
      ctx.shadowBlur = 0;
    }
    ctx.restore();

    // Beide Türme zeichnen
    drawTower(tNorthX, true);
    drawTower(tSouthX, false);

    // --- BRÜCKENFAHRBAHN & KLAPPBRÜCKE (BASCULES) ---
    ctx.save();
    // Brückenträger
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(0, bridgeY, width, 18);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, bridgeY, width, 18);

    // Hängebrücken-Ketten zu den Ufern (Königsblaue Bogen-Stahlketten)
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.72);
    ctx.quadraticCurveTo(tNorthX * 0.5, bridgeY - 35, tNorthX - towerW * 0.45, towerBaseY - towerH * 0.65);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(tSouthX + towerW * 0.45, towerBaseY - towerH * 0.65);
    ctx.quadraticCurveTo(width - (width - tSouthX) * 0.5, bridgeY - 35, width, height * 0.72);
    ctx.stroke();

    // Hängebrücken-Vertikalstreben
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
    ctx.lineWidth = 2;
    for (let sx = 60; sx < tNorthX - towerW * 0.5; sx += 40) {
      ctx.beginPath();
      ctx.moveTo(sx, bridgeY);
      ctx.lineTo(sx, bridgeY - 25);
      ctx.stroke();
    }
    for (let sx = tSouthX + towerW * 0.5 + 40; sx < width - 60; sx += 40) {
      ctx.beginPath();
      ctx.moveTo(sx, bridgeY);
      ctx.lineTo(sx, bridgeY - 25);
      ctx.stroke();
    }
    ctx.restore();

    // ==========================================
    // EASTER EGG 1: VIKTORIANISCHER TURM-GLOCKENHELM
    // Zentriert beim Nordturm bei x: 940, y: height * 0.22 (+7000)
    // ==========================================
    const turretPulse = (Math.sin(t * 3.6) + 1) * 0.5;
    ctx.save();
    ctx.strokeStyle = `rgba(250, 204, 21, ${0.45 + turretPulse * 0.55})`;
    ctx.lineWidth = 3.0;
    ctx.shadowColor = '#eab308';
    ctx.shadowBlur = 14 + turretPulse * 10;
    ctx.strokeRect(940 - 32, height * 0.22 - 35, 64, 60);
    ctx.restore();

    // ==========================================
    // EASTER EGG 2: IKONISCHER ROTER LONDONER DOPPELDECKERBUS (ROUTEMASTER)
    // Fährt auf der Brücke bei x: 1680, y: height * 0.62 (+6500)
    // ==========================================
    const busX = 1680;
    const busY = bridgeY - 14;
    ctx.save();
    ctx.translate(busX, busY);

    const busPulse = (Math.sin(t * 4.2) + 1) * 0.5;

    // Roter Bus-Körper (Doppelstock)
    ctx.fillStyle = '#dc2626'; // Ikonisches Londoner Rot
    ctx.beginPath();
    ctx.roundRect(-42, -38, 84, 38, [6, 8, 2, 2]);
    ctx.fill();
    ctx.strokeStyle = '#991b1b';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Scheinwerfer-Glanz
    ctx.strokeStyle = `rgba(253, 224, 71, ${0.45 + busPulse * 0.55})`;
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 12;
    ctx.strokeRect(-45, -40, 90, 42);
    ctx.shadowBlur = 0;

    // Untere und obere Fensterreihe
    ctx.fillStyle = '#fef08a'; // Warm erleuchtete Fenster
    for (let w = 0; w < 4; w++) {
      const wx = -34 + w * 18;
      // Oberdeck
      ctx.fillRect(wx, -34, 14, 10);
      // Unterdeck
      ctx.fillRect(wx, -18, 14, 10);
    }

    // Bus-Räder
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(-26, 0, 7, 0, Math.PI * 2);
    ctx.arc(26, 0, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // ==========================================
    // EASTER EGG 3: HISTORISCHES THEMSE-KLAPPTRIEBWERK
    // Zentriert bei x: 1200, y: height * 0.72 (+6100)
    // ==========================================
    const enginePulse = (Math.sin(t * 3.2 + 1.8) + 1) * 0.5;
    ctx.save();
    ctx.strokeStyle = `rgba(56, 189, 248, ${0.45 + enginePulse * 0.55})`;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 12;
    ctx.strokeRect(1200 - 45, height * 0.72 - 12, 90, 36);
    ctx.restore();

    ctx.restore();
  }

  _renderGrazerUhrturm(ctx, width, height, t) {
    ctx.save();

    // 1. Morgen- & Alpenhimmel über Graz (Styrian Morning Sky)
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.75);
    skyGrad.addColorStop(0, '#38bdf8');   // Frisches Steirisches Himmelblau
    skyGrad.addColorStop(0.35, '#7dd3fc');
    skyGrad.addColorStop(0.65, '#fde68a'); // Sanftes Morgengold über den Alpen
    skyGrad.addColorStop(1.0, '#e2e8f0');  // Talnebel über der Mur
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // Sanfte Morgensonne
    const sunGrad = ctx.createRadialGradient(width * 0.72, height * 0.22, 10, width * 0.72, height * 0.22, 160);
    sunGrad.addColorStop(0, 'rgba(254, 240, 138, 0.85)');
    sunGrad.addColorStop(0.35, 'rgba(253, 224, 71, 0.40)');
    sunGrad.addColorStop(1, 'rgba(254, 240, 138, 0)');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(width * 0.72, height * 0.22, 160, 0, Math.PI * 2);
    ctx.fill();

    // 2. Weit entfernte steirische Alpenberge & Schöckl
    const mountainGrad = ctx.createLinearGradient(0, height * 0.28, 0, height * 0.60);
    mountainGrad.addColorStop(0, '#64748b');
    mountainGrad.addColorStop(1, '#94a3b8');
    ctx.fillStyle = mountainGrad;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.52);
    ctx.lineTo(240, height * 0.42);
    ctx.lineTo(520, height * 0.46);
    ctx.lineTo(840, height * 0.38); // Schöckl-Gipfel
    ctx.lineTo(1120, height * 0.45);
    ctx.lineTo(1480, height * 0.39);
    ctx.lineTo(1820, height * 0.47);
    ctx.lineTo(2140, height * 0.41);
    ctx.lineTo(width, height * 0.50);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // 3. Altstadt Graz Dächerpanorama & Mur-Fluss
    ctx.fillStyle = '#b91c1c'; // Ziegelrote Dächer der Grazer Altstadt (UNESCO Welterbe)
    for (let rx = 0; rx < width; rx += 70) {
      const roofH = 45 + Math.sin(rx * 0.05) * 15;
      const roofY = height * 0.58 + Math.cos(rx * 0.03) * 12;
      ctx.beginPath();
      ctx.moveTo(rx, roofY);
      ctx.lineTo(rx + 35, roofY - roofH);
      ctx.lineTo(rx + 70, roofY);
      ctx.closePath();
      ctx.fillStyle = rx % 140 === 0 ? '#991b1b' : (rx % 210 === 0 ? '#c2410c' : '#b91c1c');
      ctx.fill();

      // Kleine Kirchtürmchen & Gauben
      if (rx % 280 === 70) {
        ctx.fillStyle = '#0f766e'; // Patinagrüne Kirchturmspitze
        ctx.beginPath();
        ctx.moveTo(rx + 25, roofY - roofH);
        ctx.lineTo(rx + 35, roofY - roofH - 45);
        ctx.lineTo(rx + 45, roofY - roofH);
        ctx.closePath();
        ctx.fill();
      }
    }

    // Die Mur (Flussbett im Morgennebel)
    const murGrad = ctx.createLinearGradient(0, height * 0.65, 0, height * 0.72);
    murGrad.addColorStop(0, '#0284c7');
    murGrad.addColorStop(0.5, '#38bdf8');
    murGrad.addColorStop(1, '#0369a1');
    ctx.fillStyle = murGrad;
    ctx.beginPath();
    ctx.ellipse(width * 0.38, height * 0.68, width * 0.42, 28, -0.05, 0, Math.PI * 2);
    ctx.fill();

    // 4. Der Schlossberg (Grüner Felsmassiv-Hügel)
    const hillGrad = ctx.createLinearGradient(0, height * 0.45, 0, height);
    hillGrad.addColorStop(0, '#15803d'); // Frisches Schlossberg-Grün
    hillGrad.addColorStop(0.4, '#166534');
    hillGrad.addColorStop(0.8, '#14532d');
    hillGrad.addColorStop(1.0, '#0f172a');
    ctx.fillStyle = hillGrad;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.82);
    ctx.quadraticCurveTo(width * 0.25, height * 0.65, width * 0.50, height * 0.48);
    ctx.quadraticCurveTo(width * 0.75, height * 0.62, width, height * 0.78);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Schlossberg Felsen & Terrassen-Mauern (Bastei)
    ctx.fillStyle = '#78716c';
    ctx.beginPath();
    ctx.roundRect(860, height * 0.58, 680, 48, [8, 8, 0, 0]);
    ctx.fill();
    ctx.strokeStyle = '#57534e';
    ctx.lineWidth = 3;
    ctx.stroke();

    // 5. DER GRAZER UHRTURM (Zentriert bei x: 1200)
    const tx = 1200;
    const towerW = 180;
    const towerH = 260;
    const towerBaseY = height * 0.60;
    const towerTopY = towerBaseY - towerH;

    // Turmschaft (Ocker-weißer Renaissancemauerwerk-Verputz)
    const wallGrad = ctx.createLinearGradient(tx - towerW * 0.5, 0, tx + towerW * 0.5, 0);
    wallGrad.addColorStop(0, '#fef9c3'); // Helle Morgensonnenseite
    wallGrad.addColorStop(0.4, '#fef08a');
    wallGrad.addColorStop(0.75, '#eab308');
    wallGrad.addColorStop(1.0, '#ca8a04'); // Schattenseite
    ctx.fillStyle = wallGrad;
    ctx.fillRect(tx - towerW * 0.5, towerTopY, towerW, towerH);
    ctx.strokeStyle = '#854d0e';
    ctx.lineWidth = 3;
    ctx.strokeRect(tx - towerW * 0.5, towerTopY, towerW, towerH);

    // Eckquaderung (Rustika-Ecksteine)
    ctx.fillStyle = '#d97706';
    for (let ey = towerTopY; ey < towerBaseY - 20; ey += 26) {
      ctx.fillRect(tx - towerW * 0.5, ey, 16, 12);
      ctx.fillRect(tx + towerW * 0.5 - 16, ey, 16, 12);
    }

    // Hölzerner Wehrgang / Umgang (Charakteristischer Holzbalkon unter der Traufe)
    const balconyY = towerTopY - 14;
    const balconyW = towerW + 48;
    ctx.fillStyle = '#78350f'; // Dunkles historisches Gebälk
    ctx.fillRect(tx - balconyW * 0.5, balconyY, balconyW, 24);
    ctx.strokeStyle = '#451a03';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(tx - balconyW * 0.5, balconyY, balconyW, 24);

    // Holzgeländer-Stützen
    for (let bx = tx - balconyW * 0.5 + 8; bx < tx + balconyW * 0.5; bx += 18) {
      ctx.fillStyle = '#92400e';
      ctx.fillRect(bx, balconyY + 4, 6, 16);
    }

    // Pyramiden-Walmdach (Markantes steiles Ziegeldach)
    const roofTipY = balconyY - 130;
    const roofGrad = ctx.createLinearGradient(tx - balconyW * 0.55, 0, tx + balconyW * 0.55, 0);
    roofGrad.addColorStop(0, '#dc2626');
    roofGrad.addColorStop(0.4, '#b91c1c');
    roofGrad.addColorStop(0.8, '#7f1d1d');
    roofGrad.addColorStop(1.0, '#450a0a');
    ctx.fillStyle = roofGrad;
    ctx.beginPath();
    ctx.moveTo(tx - balconyW * 0.55, balconyY);
    ctx.lineTo(tx, roofTipY);
    ctx.lineTo(tx + balconyW * 0.55, balconyY);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#450a0a';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Turmspitze: Glockentürmchen & Wetterhahn (Uhrturm-Hahn)
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(tx - 10, roofTipY - 30, 20, 30);
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(tx, roofTipY - 35, 10, 0, Math.PI * 2);
    ctx.fill();
    // Wetterfahne / Hahn
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(tx, roofTipY - 45);
    ctx.lineTo(tx, roofTipY - 25);
    ctx.lineTo(tx + 18, roofTipY - 35);
    ctx.stroke();

    // 6. DAS RIESIGE ZIFFERBLATT DES GRAZER UHRTURMS (Durchmesser > 5 Meter)
    const clockY = towerTopY + 110;
    const clockR = 64;

    // Weißer Zifferblatt-Hintergrund mit Goldrand
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(tx, clockY, clockR, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 5;
    ctx.stroke();

    // Schwarzer Stundenring
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(tx, clockY, clockR - 8, 0, Math.PI * 2);
    ctx.stroke();

    // Römische Ziffern-Striche
    for (let h = 0; h < 12; h++) {
      const angle = (h * Math.PI) / 6;
      const x1 = tx + Math.cos(angle) * (clockR - 10);
      const y1 = clockY + Math.sin(angle) * (clockR - 10);
      const x2 = tx + Math.cos(angle) * (clockR - 18);
      const y2 = clockY + Math.sin(angle) * (clockR - 18);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // DIE BERÜHMTEN VERTAUSCHTEN ZEIGER:
    // Der GROSSE Zeiger zeigt die Stunden! (Historische Grazer Besonderheit)
    const hourAngle = (Math.PI / 1.7) + Math.sin(t * 0.05) * 0.02; // zeigt ca. auf 4-5 Uhr
    const minuteAngle = (-Math.PI / 2.8) + Math.sin(t * 0.2) * 0.05; // kleiner Zeiger zeigt Minuten

    // Großer Zeiger (Stunden) - lang und verziert
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 4.5;
    ctx.beginPath();
    ctx.moveTo(tx, clockY);
    ctx.lineTo(tx + Math.cos(hourAngle) * 46, clockY + Math.sin(hourAngle) * 46);
    ctx.stroke();

    // Kleiner Zeiger (Minuten) - kurz
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(tx, clockY);
    ctx.lineTo(tx + Math.cos(minuteAngle) * 26, clockY + Math.sin(minuteAngle) * 26);
    ctx.stroke();

    // Zeigernabe / Mittelpunkt
    ctx.fillStyle = '#ca8a04';
    ctx.beginPath();
    ctx.arc(tx, clockY, 6, 0, Math.PI * 2);
    ctx.fill();

    // 7. HISTORISCHE WAPPEN: Steirischer Panther & Doppeladler
    ctx.fillStyle = '#15803d'; // Grüner Wappenschild (Steiermark)
    ctx.beginPath();
    ctx.roundRect(tx - 24, clockY + 70, 48, 42, [4, 4, 18, 18]);
    ctx.fill();
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Weißer Steirischer Panther
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(tx, clockY + 86, 10, 0, Math.PI * 2);
    ctx.fill();

    // ==========================================
    // EASTER EGG 1: GROSSES ZIFFERBLATT MIT VERTAUSCHTEN ZEIGERN
    // Zentriert bei x: 1200, y: height * 0.45 (+7100)
    // ==========================================
    const dialPulse = (Math.sin(t * 3.4) + 1) * 0.5;
    ctx.save();
    ctx.strokeStyle = `rgba(234, 179, 8, ${0.45 + dialPulse * 0.55})`;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#eab308';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.arc(1200, height * 0.45, 68, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // ==========================================
    // EASTER EGG 2: HISTORISCHER WEHRGANG-ERKER
    // Zentriert bei x: 920, y: height * 0.35 (+6600)
    // ==========================================
    const walkwayPulse = (Math.sin(t * 3.0 + 1.2) + 1) * 0.5;
    ctx.save();
    ctx.strokeStyle = `rgba(56, 189, 248, ${0.40 + walkwayPulse * 0.60})`;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 12;
    ctx.strokeRect(920 - 45, height * 0.35 - 20, 90, 40);
    ctx.restore();

    // ==========================================
    // EASTER EGG 3: GRAZER SCHLOSSBERG-HUND & STEIRISCHER PANTHER
    // Zentriert bei x: 1540, y: height * 0.65 (+6200)
    // ==========================================
    const dogPulse = (Math.sin(t * 3.2 + 2.4) + 1) * 0.5;
    ctx.save();
    ctx.strokeStyle = `rgba(74, 222, 128, ${0.40 + dogPulse * 0.60})`;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#4ade80';
    ctx.shadowBlur = 12;
    ctx.strokeRect(1540 - 40, height * 0.65 - 25, 80, 50);
    ctx.restore();

    ctx.restore();
  }

  _renderImWeltall(ctx, width, height, t) {
    ctx.save();

    // 1. Tiefschwarzer interstellarer Kosmos mit violett-blauem Farbverlauf
    const spaceGrad = ctx.createLinearGradient(0, 0, width, height);
    spaceGrad.addColorStop(0, '#030712');
    spaceGrad.addColorStop(0.35, '#0f172a');
    spaceGrad.addColorStop(0.70, '#1e1b4b');
    spaceGrad.addColorStop(1.0, '#090d16');
    ctx.fillStyle = spaceGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Kosmische Leuchtnebel (Glowing Interstellar Nebulae)
    const neb1 = ctx.createRadialGradient(width * 0.35, height * 0.40, 40, width * 0.35, height * 0.40, 480);
    neb1.addColorStop(0, 'rgba(217, 70, 239, 0.45)');
    neb1.addColorStop(0.45, 'rgba(168, 85, 247, 0.22)');
    neb1.addColorStop(0.80, 'rgba(99, 102, 241, 0.08)');
    neb1.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = neb1;
    ctx.beginPath();
    ctx.arc(width * 0.35, height * 0.40, 480, 0, Math.PI * 2);
    ctx.fill();

    const neb2 = ctx.createRadialGradient(width * 0.75, height * 0.65, 30, width * 0.75, height * 0.65, 420);
    neb2.addColorStop(0, 'rgba(56, 189, 248, 0.40)');
    neb2.addColorStop(0.50, 'rgba(14, 165, 233, 0.18)');
    neb2.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = neb2;
    ctx.beginPath();
    ctx.arc(width * 0.75, height * 0.65, 420, 0, Math.PI * 2);
    ctx.fill();

    // 3. Glühender Gasplanet mit Planetenringen (Gas Giant with rings)
    const px = width * 0.82;
    const py = height * 0.30;
    const pr = 110;

    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(-0.35);
    ctx.strokeStyle = 'rgba(253, 224, 71, 0.45)';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.ellipse(0, 0, pr * 2.1, pr * 0.42, 0, Math.PI, Math.PI * 2);
    ctx.stroke();

    const planetGrad = ctx.createRadialGradient(pr * 0.3, -pr * 0.3, 10, 0, 0, pr);
    planetGrad.addColorStop(0, '#fef08a');
    planetGrad.addColorStop(0.45, '#f59e0b');
    planetGrad.addColorStop(0.85, '#b45309');
    planetGrad.addColorStop(1, '#451a03');
    ctx.fillStyle = planetGrad;
    ctx.beginPath();
    ctx.arc(0, 0, pr, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(254, 240, 138, 0.65)';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.ellipse(0, 0, pr * 2.1, pr * 0.42, 0, 0, Math.PI);
    ctx.stroke();
    ctx.restore();

    // 4. Glänzende ferne Sterne
    for (let s = 0; s < 120; s++) {
      const sx = ((s * 173) % width);
      const sy = ((s * 281) % height);
      const sr = (s % 3 === 0) ? 2.5 : 1.2;
      ctx.fillStyle = (s % 5 === 0) ? '#38bdf8' : ((s % 7 === 0) ? '#fef08a' : '#ffffff');
      ctx.beginPath();
      ctx.arc(sx, sy, sr, 0, Math.PI * 2);
      ctx.fill();
    }

    // ==========================================
    // EASTER EGG 1: ALIEN-UFO-AUFKLÄRER (x: 820, y: height * 0.32)
    // ==========================================
    const ufoPulse = (Math.sin(t * 3.6) + 1) * 0.5;
    ctx.save();
    ctx.strokeStyle = `rgba(56, 189, 248, ${0.45 + ufoPulse * 0.55})`;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.ellipse(820, height * 0.32, 60, 24, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // ==========================================
    // EASTER EGG 2: GLÜHENDER KOMETENSCHWEIF (x: 1680, y: height * 0.28)
    // ==========================================
    const cometPulse = (Math.sin(t * 3.2 + 1.2) + 1) * 0.5;
    ctx.save();
    ctx.strokeStyle = `rgba(244, 114, 182, ${0.40 + cometPulse * 0.60})`;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#f472b6';
    ctx.shadowBlur = 14;
    ctx.strokeRect(1680 - 45, height * 0.28 - 25, 90, 50);
    ctx.restore();

    // ==========================================
    // EASTER EGG 3: FUNKELNDER SUPERNOVA-PULSAR (x: 1200, y: height * 0.58)
    // ==========================================
    const pulsarPulse = (Math.sin(t * 4.0 + 2.4) + 1) * 0.5;
    ctx.save();
    ctx.strokeStyle = `rgba(250, 204, 21, ${0.45 + pulsarPulse * 0.55})`;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(1200, height * 0.58, 48, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    ctx.restore();
  }

  _renderWien(ctx, width, height, t) {
    ctx.save();

    // 1. Wiener Regentag-Himmel (Wiener Schnürlregen & graublaues Himmelslicht)
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.70);
    skyGrad.addColorStop(0, '#475569');   // Tiefere Regenwolken
    skyGrad.addColorStop(0.45, '#64748b'); // Schiefergrau
    skyGrad.addColorStop(0.80, '#94a3b8'); // Helle Regenlichtung
    skyGrad.addColorStop(1.0, '#cbd5e1');  // Nassglänzender Dunsthorizont
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Barocke Wiener Stadt-Silhouette & Stephansdom (Steffl)
    const domX = 1100;
    const domBaseY = height * 0.62;
    const domTipY = height * 0.12;

    // Domturm-Schaft (Gotischer Werkstein)
    ctx.fillStyle = '#334155';
    ctx.fillRect(domX - 45, domTipY + 90, 90, domBaseY - (domTipY + 90));
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(domX - 45, domTipY + 90, 90, domBaseY - (domTipY + 90));

    // Steffl-Turmspitze (Schlanker gotischer Helm)
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.moveTo(domX - 40, domTipY + 90);
    ctx.lineTo(domX, domTipY);
    ctx.lineTo(domX + 40, domTipY + 90);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Stephansdom buntes Ziegeldach mit Wappen & Zickzack-Muster
    ctx.fillStyle = '#0f766e';
    ctx.beginPath();
    ctx.moveTo(domX - 45, domBaseY - 60);
    ctx.lineTo(domX - 220, domBaseY - 140);
    ctx.lineTo(domX - 220, domBaseY);
    ctx.lineTo(domX - 45, domBaseY);
    ctx.closePath();
    ctx.fill();

    // Stephansdom Zickzack-Muster
    for (let z = 0; z < 5; z++) {
      ctx.strokeStyle = z % 2 === 0 ? '#f59e0b' : '#ffffff';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(domX - 200 + z * 30, domBaseY - 50);
      ctx.lineTo(domX - 185 + z * 30, domBaseY - 90);
      ctx.lineTo(domX - 170 + z * 30, domBaseY - 50);
      ctx.stroke();
    }

    // 3. Wiener Prachtbauten (Ringstraßen-Stil & Barock-Paläste)
    for (let bx = 0; bx < width; bx += 180) {
      if (Math.abs(bx - domX) < 160) continue;
      const bH = 140 + Math.sin(bx * 0.04) * 40;
      const bY = domBaseY - bH;
      const bW = 140;

      ctx.fillStyle = bx % 360 === 0 ? '#e2e8f0' : '#cbd5e1';
      ctx.fillRect(bx, bY, bW, bH);
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.strokeRect(bx, bY, bW, bH);

      if (bx % 360 === 0) {
        ctx.fillStyle = '#0d9488'; // Patinagrüne Kuppel
        ctx.beginPath();
        ctx.arc(bx + bW * 0.5, bY, 42, Math.PI, 0);
        ctx.fill();
        ctx.strokeStyle = '#115e59';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      for (let wy = bY + 20; wy < domBaseY - 20; wy += 32) {
        for (let wx = bx + 16; wx < bx + bW - 16; wx += 28) {
          ctx.fillStyle = '#fef08a';
          ctx.fillRect(wx, wy, 16, 22);
        }
      }
    }

    // 4. Wiener Riesenrad im Prater (Rechts bei ca. x: 1720)
    const radX = 1720;
    const radY = height * 0.38;
    const radR = 90;

    ctx.save();
    ctx.translate(radX, radY);
    ctx.rotate(t * 0.15);
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, 0, radR, 0, Math.PI * 2);
    ctx.stroke();

    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#94a3b8';
    for (let sp = 0; sp < 15; sp++) {
      const ang = (sp * Math.PI * 2) / 15;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(ang) * radR, Math.sin(ang) * radR);
      ctx.stroke();

      ctx.fillStyle = '#b91c1c';
      ctx.fillRect(Math.cos(ang) * radR - 8, Math.sin(ang) * radR - 5, 16, 10);
    }
    ctx.restore();

    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(radX, radY);
    ctx.lineTo(radX - 55, domBaseY);
    ctx.moveTo(radX, radY);
    ctx.lineTo(radX + 55, domBaseY);
    ctx.stroke();

    // 5. Nassglänzendes Wiener Kopfsteinpflaster mit Regen-Reflexionen
    const groundGrad = ctx.createLinearGradient(0, domBaseY, 0, height);
    groundGrad.addColorStop(0, '#334155');
    groundGrad.addColorStop(0.5, '#1e293b');
    groundGrad.addColorStop(1.0, '#0f172a');
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, domBaseY, width, height - domBaseY);

    ctx.fillStyle = 'rgba(254, 240, 138, 0.18)';
    for (let pz = 0; pz < 18; pz++) {
      const px = (pz * 139) % width;
      const py = domBaseY + 30 + (pz * 29) % (height - domBaseY - 60);
      ctx.beginPath();
      ctx.ellipse(px, py, 65, 12, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // 6. Historischer Wiener Fiaker (Kutsche bei ca. x: 620)
    ctx.save();
    ctx.translate(620, height * 0.72);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-35, -25, 70, 25);
    ctx.beginPath();
    ctx.arc(10, -25, 22, Math.PI, 0);
    ctx.fill();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(-22, 5, 14, 0, Math.PI * 2);
    ctx.arc(22, 5, 14, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = '#78350f';
    ctx.fillRect(-75, -20, 35, 22);
    ctx.fillRect(-85, -35, 16, 25);
    ctx.restore();

    // ==========================================
    // EASTER EGG 1: STEPHANSDOM SÜDTURM STEFFL (x: 1100, y: height * 0.25)
    // ==========================================
    const stefflPulse = (Math.sin(t * 3.4) + 1) * 0.5;
    ctx.save();
    ctx.strokeStyle = `rgba(250, 204, 21, ${0.45 + stefflPulse * 0.55})`;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 14;
    ctx.strokeRect(domX - 35, height * 0.25 - 45, 70, 90);
    ctx.restore();

    // ==========================================
    // EASTER EGG 2: WIENER RIESENRAD IM PRATER (x: 1720, y: height * 0.38)
    // ==========================================
    const radPulse = (Math.sin(t * 3.2 + 1.2) + 1) * 0.5;
    ctx.save();
    ctx.strokeStyle = `rgba(239, 68, 68, ${0.45 + radPulse * 0.55})`;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.arc(1720, height * 0.38, 92, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // ==========================================
    // EASTER EGG 3: TRADITIONELLER WIENER FIAKER (x: 620, y: height * 0.72)
    // ==========================================
    const fiakerPulse = (Math.sin(t * 3.0 + 2.4) + 1) * 0.5;
    ctx.save();
    ctx.strokeStyle = `rgba(56, 189, 248, ${0.45 + fiakerPulse * 0.55})`;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 14;
    ctx.strokeRect(620 - 55, height * 0.72 - 35, 110, 50);
    ctx.restore();

    ctx.restore();
  }

  _renderMohnblumen(ctx, width, height, t) {
    ctx.save();

    // 1. Malerischer Sonnenuntergangshimmel (Goldene Abendsonne über dem Meer)
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.45);
    skyGrad.addColorStop(0, '#ea580c');    // Tieforange Abendglut oben
    skyGrad.addColorStop(0.35, '#f97316'); // Warmes Rotorange
    skyGrad.addColorStop(0.70, '#fbbf24'); // Goldener Horizont
    skyGrad.addColorStop(1.0, '#fed7aa');  // Sanfter Dunst über dem Meer
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Weites Meer am Horizont mit Sonnenreflexions-Spur
    const seaY = height * 0.16;
    const seaH = height * 0.16;
    const seaGrad = ctx.createLinearGradient(0, seaY, 0, seaY + seaH);
    seaGrad.addColorStop(0, '#38bdf8');
    seaGrad.addColorStop(0.5, '#0284c7');
    seaGrad.addColorStop(1.0, '#0369a1');
    ctx.fillStyle = seaGrad;
    ctx.fillRect(0, seaY, width, seaH);

    // Sonnenreflexion auf dem Wasser
    const sunX = 775;
    const sunY = height * 0.14;
    const reflectGrad = ctx.createRadialGradient(sunX, seaY + seaH * 0.35, 5, sunX, seaY + seaH * 0.35, 140);
    reflectGrad.addColorStop(0, 'rgba(254, 240, 138, 0.95)');
    reflectGrad.addColorStop(0.4, 'rgba(251, 191, 36, 0.65)');
    reflectGrad.addColorStop(1, 'rgba(251, 191, 36, 0)');
    ctx.fillStyle = reflectGrad;
    ctx.fillRect(sunX - 140, seaY, 280, seaH);

    // Glitzernde Meereswellen im Gegenlicht
    for (let wy = seaY + 8; wy < seaY + seaH - 4; wy += 9) {
      const wSpan = 60 + Math.sin(wy * 0.3 + t * 2) * 35;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(sunX - wSpan, wy);
      ctx.lineTo(sunX + wSpan, wy);
      ctx.stroke();
    }

    // Die leuchtende Abendsonne
    const sunGlow = ctx.createRadialGradient(sunX, sunY, 15, sunX, sunY, 120);
    sunGlow.addColorStop(0, '#ffffff');
    sunGlow.addColorStop(0.2, '#fef08a');
    sunGlow.addColorStop(0.6, 'rgba(251, 146, 60, 0.55)');
    sunGlow.addColorStop(1, 'rgba(251, 146, 60, 0)');
    ctx.fillStyle = sunGlow;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 120, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#fffbeb';
    ctx.beginPath();
    ctx.arc(sunX, sunY, 32, 0, Math.PI * 2);
    ctx.fill();

    // 3. Sanfte sanftwellige Sommer-Hügel & Grasland
    // Hügelkette Ferne
    ctx.fillStyle = '#854d0e';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.30);
    ctx.bezierCurveTo(width * 0.3, height * 0.24, width * 0.7, height * 0.34, width, height * 0.28);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Hügelkette Mittelgrund (warmes Oliv/Ockergelb)
    const midGrad = ctx.createLinearGradient(0, height * 0.30, 0, height);
    midGrad.addColorStop(0, '#a16207');
    midGrad.addColorStop(0.4, '#ca8a04');
    midGrad.addColorStop(1.0, '#4d7c0f');
    ctx.fillStyle = midGrad;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.36);
    ctx.bezierCurveTo(width * 0.35, height * 0.42, width * 0.65, height * 0.32, width, height * 0.38);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // 4. Gewundener Feldweg hinunter zum Meer
    ctx.fillStyle = '#fde68a';
    ctx.beginPath();
    ctx.moveTo(width * 0.44, height * 0.33);
    ctx.bezierCurveTo(width * 0.41, height * 0.50, width * 0.46, height * 0.70, width * 0.35, height);
    ctx.lineTo(width * 0.52, height);
    ctx.bezierCurveTo(width * 0.53, height * 0.70, width * 0.47, height * 0.50, width * 0.48, height * 0.33);
    ctx.closePath();
    ctx.fill();

    // 5. Rustikaler Holzzaun (Pfähle & Latten auf der linken Seite und entlang des Weges)
    const fencePosts = [
      { x: 120, y: height * 0.74, h: 120 },
      { x: 230, y: height * 0.72, h: 110 },
      { x: 350, y: height * 0.70, h: 105 },
      { x: 470, y: height * 0.68, h: 95 },
      { x: 580, y: height * 0.64, h: 85 },
      { x: 670, y: height * 0.58, h: 75 },
      { x: 740, y: height * 0.52, h: 65 }
    ];

    // Zaunquerlatten
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 6;
    ctx.beginPath();
    for (let i = 0; i < fencePosts.length - 1; i++) {
      const p1 = fencePosts[i];
      const p2 = fencePosts[i+1];
      ctx.moveTo(p1.x, p1.y - p1.h * 0.65);
      ctx.lineTo(p2.x, p2.y - p2.h * 0.65);
      ctx.moveTo(p1.x, p1.y - p1.h * 0.35);
      ctx.lineTo(p2.x, p2.y - p2.h * 0.35);
    }
    ctx.stroke();

    // Zaunpfosten
    for (let fp of fencePosts) {
      ctx.fillStyle = '#92400e';
      ctx.fillRect(fp.x - 7, fp.y - fp.h, 14, fp.h);
      ctx.strokeStyle = '#451a03';
      ctx.lineWidth = 2;
      ctx.strokeRect(fp.x - 7, fp.y - fp.h, 14, fp.h);
      // Pfostenkopf
      ctx.fillStyle = '#b45309';
      ctx.beginPath();
      ctx.moveTo(fp.x - 8, fp.y - fp.h);
      ctx.lineTo(fp.x, fp.y - fp.h - 8);
      ctx.lineTo(fp.x + 8, fp.y - fp.h);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    // 6. Das Mohnblumenfeld: unzählige rote Blüten mit Stielen
    const poppyColors = ['#ef4444', '#dc2626', '#b91c1c', '#f87171'];
    // Hintergrund-Mohnblumen (kleinere Tupfen)
    for (let mx = 40; mx < width; mx += 36) {
      const my = height * 0.42 + Math.sin(mx * 0.03) * (height * 0.12) + (mx % 7) * 14;
      if (my > height * 0.88) continue;
      const pCol = poppyColors[mx % poppyColors.length];
      const pSize = 7 + (mx % 5) * 2;
      ctx.fillStyle = pCol;
      ctx.beginPath();
      ctx.arc(mx, my, pSize, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#1e1b4b';
      ctx.beginPath();
      ctx.arc(mx, my, pSize * 0.35, 0, Math.PI * 2);
      ctx.fill();
    }

    // Vordergrund-Mohnblumen (rechte Bildhälfte prachtvoll detailliert)
    const fgPoppies = [
      { x: 1100, y: height * 0.76, r: 32 },
      { x: 1220, y: height * 0.72, r: 38 },
      { x: 1350, y: height * 0.76, r: 52 }, // Riesen-Mohnblüte (Easter Egg 2)
      { x: 1480, y: height * 0.70, r: 42 },
      { x: 1620, y: height * 0.74, r: 46 },
      { x: 1760, y: height * 0.68, r: 36 },
      { x: 920, y: height * 0.82, r: 28 },
      { x: 820, y: height * 0.78, r: 25 },
      { x: 1420, y: height * 0.86, r: 44 },
      { x: 1560, y: height * 0.88, r: 40 }
    ];

    for (let p of fgPoppies) {
      // Grüner Stiel
      ctx.strokeStyle = '#3f6212';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y + p.r * 0.3);
      ctx.quadraticCurveTo(p.x - 12, p.y + p.r * 1.4, p.x + 8, height);
      ctx.stroke();

      // Blütenblätter
      for (let a = 0; a < 5; a++) {
        const angle = (a / 5) * Math.PI * 2 + Math.sin(t * 1.5 + p.x) * 0.05;
        const petalX = p.x + Math.cos(angle) * (p.r * 0.45);
        const petalY = p.y + Math.sin(angle) * (p.r * 0.35);
        ctx.fillStyle = a % 2 === 0 ? '#ef4444' : '#dc2626';
        ctx.beginPath();
        ctx.ellipse(petalX, petalY, p.r * 0.55, p.r * 0.45, angle, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#991b1b';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // Samtige schwarze Blütenmitte mit gelbem Pollenkranz
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 0.28, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#fef08a';
      for (let s = 0; s < 8; s++) {
        const sa = (s / 8) * Math.PI * 2;
        ctx.beginPath();
        ctx.arc(p.x + Math.cos(sa) * (p.r * 0.22), p.y + Math.sin(sa) * (p.r * 0.22), 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // ==========================================
    // EASTER EGG 1: GOLDENE ABENDSONNE ÜBER DEM MEER (x: 775, y: height * 0.14)
    // ==========================================
    const sunPulse = (Math.sin(t * 3.2) + 1) * 0.5;
    ctx.save();
    ctx.strokeStyle = `rgba(250, 204, 21, ${0.45 + sunPulse * 0.55})`;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(775, height * 0.14, 48, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // ==========================================
    // EASTER EGG 2: LEUCHTENDE RIESEN-MOHNBLÜTE (x: 1350, y: height * 0.76)
    // ==========================================
    const poppyPulse = (Math.sin(t * 3.4 + 1.2) + 1) * 0.5;
    ctx.save();
    ctx.strokeStyle = `rgba(239, 68, 68, ${0.45 + poppyPulse * 0.55})`;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(1350, height * 0.76, 58, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // ==========================================
    // EASTER EGG 3: RUSTIKALER HOLZZAUN AM MEERESWEG (x: 350, y: height * 0.72)
    // ==========================================
    const fencePulse = (Math.sin(t * 3.0 + 2.4) + 1) * 0.5;
    ctx.save();
    ctx.strokeStyle = `rgba(217, 119, 6, ${0.45 + fencePulse * 0.55})`;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#d97706';
    ctx.shadowBlur = 14;
    ctx.strokeRect(350 - 55, height * 0.72 - 40, 110, 80);
    ctx.restore();

    ctx.restore();
  }

  _renderDieBurg(ctx, width, height, t) {
    ctx.save();

    // 1. Sandsturm-Himmel & ferne dunstige Bergkämme
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.65);
    skyGrad.addColorStop(0, '#78350f');   // Dunkler, staubiger Wüstensturmhimmel
    skyGrad.addColorStop(0.35, '#b45309'); // Ocker-Bernstein Sturmzone
    skyGrad.addColorStop(0.70, '#d97706'); // Leuchtender Sanddunst
    skyGrad.addColorStop(1.0, '#fef3c7');  // Sandiger Horizont
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // Ferne Bergketten im Sanddunst
    ctx.fillStyle = 'rgba(120, 53, 15, 0.45)';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.45);
    ctx.lineTo(width * 0.25, height * 0.35);
    ctx.lineTo(width * 0.50, height * 0.42);
    ctx.lineTo(width * 0.85, height * 0.32);
    ctx.lineTo(width, height * 0.40);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // 2. Schroffe Felsen und Schluchten unter der Burg
    const rockGrad = ctx.createLinearGradient(0, height * 0.40, 0, height);
    rockGrad.addColorStop(0, '#57534e');
    rockGrad.addColorStop(0.5, '#44403c');
    rockGrad.addColorStop(1.0, '#292524');
    ctx.fillStyle = rockGrad;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.55);
    ctx.lineTo(width * 0.22, height * 0.48);
    ctx.lineTo(width * 0.38, height * 0.58);
    ctx.lineTo(width * 0.52, height * 0.52);
    ctx.lineTo(width * 0.82, height * 0.56);
    ctx.lineTo(width, height * 0.62);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Vertikale Felsstruktur & Klüfte
    for (let rx = 60; rx < width - 60; rx += 90) {
      ctx.strokeStyle = '#1c1917';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(rx, height * 0.56);
      ctx.lineTo(rx + (Math.sin(rx) * 25), height);
      ctx.stroke();
    }

    // 3. Mächtige Burgmauer und Wehranlagen
    const wallBaseY = height * 0.55;
    ctx.fillStyle = '#78716c';
    ctx.fillRect(width * 0.22, wallBaseY - 140, width * 0.60, 140);
    ctx.strokeStyle = '#292524';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(width * 0.22, wallBaseY - 140, width * 0.60, 140);

    // Zinnen auf der Burgmauer
    for (let zx = width * 0.22; zx < width * 0.82; zx += 32) {
      ctx.fillStyle = '#78716c';
      ctx.fillRect(zx, wallBaseY - 162, 18, 22);
      ctx.strokeRect(zx, wallBaseY - 162, 18, 22);
    }

    // 4. Hauptgebäude (Palas) mit Fachwerkerkern und Steildächern
    const palasX = 660;
    const palasY = height * 0.38;
    ctx.fillStyle = '#a8a29e';
    ctx.fillRect(palasX - 160, palasY, 320, wallBaseY - palasY);
    ctx.strokeRect(palasX - 160, palasY, 320, wallBaseY - palasY);

    // Spitzgiebeldach Palas (Dunkle Dachziegel)
    ctx.fillStyle = '#7f1d1d';
    ctx.beginPath();
    ctx.moveTo(palasX - 180, palasY);
    ctx.lineTo(palasX - 40, palasY - 110);
    ctx.lineTo(palasX + 180, palasY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Fachwerk & Fenster
    ctx.strokeStyle = '#451a03';
    ctx.lineWidth = 3;
    for (let fwy = palasY + 20; fwy < wallBaseY - 20; fwy += 35) {
      ctx.strokeRect(palasX - 140, fwy, 280, 2);
    }
    for (let fwx = palasX - 120; fwx < palasX + 140; fwx += 45) {
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(fwx, palasY + 28, 16, 22);
      ctx.strokeRect(fwx, palasY + 28, 16, 22);
    }

    // 5. Hoher runder Bergfried-Hauptturm (Easter Egg 1: x: 1220, y: height * 0.22)
    const bergX = 1220;
    const bergY = height * 0.12;
    const bergW = 105;
    const bergH = wallBaseY - bergY;

    // Turmschaft
    const bergGrad = ctx.createLinearGradient(bergX - bergW * 0.5, 0, bergX + bergW * 0.5, 0);
    bergGrad.addColorStop(0, '#57534e');
    bergGrad.addColorStop(0.4, '#a8a29e');
    bergGrad.addColorStop(1.0, '#44403c');
    ctx.fillStyle = bergGrad;
    ctx.fillRect(bergX - bergW * 0.5, bergY, bergW, bergH);
    ctx.strokeStyle = '#1c1917';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(bergX - bergW * 0.5, bergY, bergW, bergH);

    // Wehrgang / Zinnenkranz am Bergfried
    ctx.fillStyle = '#78716c';
    ctx.fillRect(bergX - bergW * 0.58, bergY - 24, bergW * 1.16, 26);
    ctx.strokeRect(bergX - bergW * 0.58, bergY - 24, bergW * 1.16, 26);

    for (let bz = bergX - bergW * 0.58; bz < bergX + bergW * 0.58; bz += 22) {
      ctx.fillRect(bz, bergY - 42, 12, 18);
      ctx.strokeRect(bz, bergY - 42, 12, 18);
    }

    // Kegeldach / Turmhelm Bergfried
    ctx.fillStyle = '#7f1d1d';
    ctx.beginPath();
    ctx.moveTo(bergX - bergW * 0.52, bergY - 42);
    ctx.lineTo(bergX, bergY - 110);
    ctx.lineTo(bergX + bergW * 0.52, bergY - 42);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // 6. Festes Burgtor mit Zwillingstürmen & Zugbrücke (Easter Egg 2: x: 1010, y: height * 0.64)
    const gateX = 1010;
    const gateY = height * 0.56;

    // Zwillings-Flankierungstürme
    [-65, 65].forEach(dx => {
      const twX = gateX + dx;
      ctx.fillStyle = '#78716c';
      ctx.fillRect(twX - 28, gateY - 50, 56, 120);
      ctx.strokeRect(twX - 28, gateY - 50, 56, 120);

      // Spitzhelm Zwillings-Turm
      ctx.fillStyle = '#991b1b';
      ctx.beginPath();
      ctx.moveTo(twX - 32, gateY - 50);
      ctx.lineTo(twX, gateY - 105);
      ctx.lineTo(twX + 32, gateY - 50);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    });

    // Torbogen & Fallgitter
    ctx.fillStyle = '#1c1917';
    ctx.beginPath();
    ctx.arc(gateX, gateY + 20, 34, Math.PI, 0);
    ctx.lineTo(gateX + 34, gateY + 70);
    ctx.lineTo(gateX - 34, gateY + 70);
    ctx.closePath();
    ctx.fill();

    // Fallgitter-Gitterstäbe
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 3;
    for (let gx = gateX - 26; gx <= gateX + 26; gx += 13) {
      ctx.beginPath();
      ctx.moveTo(gx, gateY);
      ctx.lineTo(gx, gateY + 70);
      ctx.stroke();
    }

    // 7. Mittelalterliche Steinbrücke über die Schlucht (Easter Egg 3: x: 820, y: height * 0.85)
    const bridgeGrad = ctx.createLinearGradient(0, height * 0.70, 0, height);
    bridgeGrad.addColorStop(0, '#a8a29e');
    bridgeGrad.addColorStop(1.0, '#57534e');
    ctx.fillStyle = bridgeGrad;
    ctx.beginPath();
    ctx.moveTo(gateX - 45, gateY + 70);
    ctx.bezierCurveTo(900, height * 0.76, 750, height * 0.85, 620, height);
    ctx.lineTo(760, height);
    ctx.bezierCurveTo(860, height * 0.85, 960, height * 0.76, gateX + 45, gateY + 70);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#292524';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Brücken-Steinbrüstung
    ctx.strokeStyle = '#44403c';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(gateX - 45, gateY + 68);
    ctx.bezierCurveTo(900, height * 0.75, 750, height * 0.84, 620, height - 2);
    ctx.stroke();

    // ==========================================
    // EASTER EGG 1: HOHER RUNDER BERGFRIED-HAUPTTURM (x: 1220, y: height * 0.22)
    // ==========================================
    const bergPulse = (Math.sin(t * 3.4) + 1) * 0.5;
    ctx.save();
    ctx.strokeStyle = `rgba(250, 204, 21, ${0.45 + bergPulse * 0.55})`;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(1220, height * 0.22, 58, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // ==========================================
    // EASTER EGG 2: FESTES BURGTOR MIT ZUGBRÜCKE & ZWILLINGS-TÜRMEN (x: 1010, y: height * 0.64)
    // ==========================================
    const gatePulse = (Math.sin(t * 3.2 + 1.2) + 1) * 0.5;
    ctx.save();
    ctx.strokeStyle = `rgba(239, 68, 68, ${0.45 + gatePulse * 0.55})`;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(1010, height * 0.64, 55, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // ==========================================
    // EASTER EGG 3: MITTELALTERLICHE STEINBRÜCKE ÜBER DIE SCHLUCHT (x: 820, y: height * 0.85)
    // ==========================================
    const bridgePulse = (Math.sin(t * 3.0 + 2.4) + 1) * 0.5;
    ctx.save();
    ctx.strokeStyle = `rgba(56, 189, 248, ${0.45 + bridgePulse * 0.55})`;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 14;
    ctx.strokeRect(820 - 65, height * 0.85 - 40, 130, 80);
    ctx.restore();

    ctx.restore();
  }

  _renderToskana(ctx, width, height, t) {
    ctx.save();

    // 1. Zarter, sonniger toskanischer Himmel mit Regenlicht
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.55);
    skyGrad.addColorStop(0, '#7dd3fc');    // Helles Himmelsblau
    skyGrad.addColorStop(0.40, '#bae6fd'); // Zarter Dunst
    skyGrad.addColorStop(0.75, '#e0f2fe'); // Weißlich-helles Regenlicht
    skyGrad.addColorStop(1.0, '#fed7aa');  // Warme toskanische Horizont-Aura
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // Ferne dunstige Hügelzüge & Apenninen-Berge
    ctx.fillStyle = 'rgba(148, 163, 184, 0.45)';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.38);
    ctx.bezierCurveTo(width * 0.25, height * 0.32, width * 0.65, height * 0.36, width, height * 0.30);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // 2. Sanft wellige Hügellandschaft (Val d'Orcia in Ocker & Zartgrün)
    // Mittlerer Hügelzug (Oliv- & Ockertöne)
    const midHillGrad = ctx.createLinearGradient(0, height * 0.35, 0, height * 0.65);
    midHillGrad.addColorStop(0, '#a3e635');
    midHillGrad.addColorStop(0.5, '#65a30d');
    midHillGrad.addColorStop(1.0, '#ca8a04');
    ctx.fillStyle = midHillGrad;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.48);
    ctx.bezierCurveTo(width * 0.30, height * 0.40, width * 0.70, height * 0.46, width, height * 0.42);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Vordergrund-Hügel: Goldene Weizenfelder (leuchtendes Ockergelb)
    const fgHillGrad = ctx.createLinearGradient(0, height * 0.50, 0, height);
    fgHillGrad.addColorStop(0, '#fbbf24');
    fgHillGrad.addColorStop(0.4, '#f59e0b');
    fgHillGrad.addColorStop(1.0, '#d97706');
    ctx.fillStyle = fgHillGrad;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.62);
    ctx.bezierCurveTo(width * 0.35, height * 0.50, width * 0.65, height * 0.54, width, height * 0.58);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // 3. Weinreben & terrassierte Hänge auf der rechten Seite (Easter Egg 3: x: 1280, y: height * 0.62)
    ctx.strokeStyle = '#4d7c0f';
    ctx.lineWidth = 4;
    for (let r = 0; r < 6; r++) {
      const ry = height * 0.56 + r * 28;
      ctx.beginPath();
      ctx.moveTo(width * 0.58, ry);
      ctx.bezierCurveTo(width * 0.72, ry + 15, width * 0.88, ry + 10, width * 0.98, ry + 25);
      ctx.stroke();
    }

    // 4. Gewundene Zypressen-Allee & Zypressen
    const cypresses = [
      { x: 580, y: height * 0.44, h: 140, w: 26 },
      { x: 630, y: height * 0.42, h: 165, w: 28 }, // Schlanke Hügel-Zypresse (Easter Egg 2)
      { x: 1080, y: height * 0.43, h: 145, w: 26 },
      { x: 1140, y: height * 0.41, h: 175, w: 30 },
      { x: 1210, y: height * 0.46, h: 135, w: 24 }
    ];

    for (let c of cypresses) {
      // Stamm
      ctx.fillStyle = '#451a03';
      ctx.fillRect(c.x - 3, c.y, 6, 25);

      // Schlanke flammenförmige Zypressen-Krone
      const cGrad = ctx.createLinearGradient(c.x - c.w * 0.5, 0, c.x + c.w * 0.5, 0);
      cGrad.addColorStop(0, '#052e16');
      cGrad.addColorStop(0.4, '#166534');
      cGrad.addColorStop(1.0, '#14532d');
      ctx.fillStyle = cGrad;
      ctx.beginPath();
      ctx.moveTo(c.x, c.y - c.h);
      ctx.bezierCurveTo(c.x + c.w * 0.6, c.y - c.h * 0.6, c.x + c.w * 0.5, c.y, c.x, c.y);
      ctx.bezierCurveTo(c.x - c.w * 0.5, c.y, c.x - c.w * 0.6, c.y - c.h * 0.6, c.x, c.y - c.h);
      ctx.closePath();
      ctx.fill();
    }

    // 5. Traditionelles toskanisches Landgut (Podere) (Easter Egg 1: x: 860, y: height * 0.44)
    const villaX = 860;
    const villaY = height * 0.38;
    const villaW = 160;
    const villaH = 85;

    // Sandstein-Mauerwerk
    const wallGrad = ctx.createLinearGradient(villaX - villaW * 0.5, 0, villaX + villaW * 0.5, 0);
    wallGrad.addColorStop(0, '#d4a373');
    wallGrad.addColorStop(0.5, '#e5c29f');
    wallGrad.addColorStop(1.0, '#c19a6b');
    ctx.fillStyle = wallGrad;
    ctx.fillRect(villaX - villaW * 0.5, villaY, villaW, villaH);
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 2;
    ctx.strokeRect(villaX - villaW * 0.5, villaY, villaW, villaH);

    // Terrakotta-Dach (Walmdach mit toskanischen Dachziegeln)
    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.moveTo(villaX - villaW * 0.55, villaY);
    ctx.lineTo(villaX - villaW * 0.25, villaY - 32);
    ctx.lineTo(villaX + villaW * 0.25, villaY - 32);
    ctx.lineTo(villaX + villaW * 0.55, villaY);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Schornsteine
    ctx.fillStyle = '#9a3412';
    ctx.fillRect(villaX - 35, villaY - 44, 12, 16);
    ctx.fillRect(villaX + 25, villaY - 44, 12, 16);

    // Fenster mit Holzläden
    for (let wy = villaY + 16; wy < villaY + villaH - 16; wy += 30) {
      for (let wx = villaX - villaW * 0.35; wx <= villaX + villaW * 0.35; wx += 42) {
        // Fensteröffnung
        ctx.fillStyle = '#1c1917';
        ctx.fillRect(wx - 7, wy, 14, 18);
        // Fensterläden
        ctx.fillStyle = '#15803d';
        ctx.fillRect(wx - 13, wy, 5, 18);
        ctx.fillRect(wx + 8, wy, 5, 18);
      }
    }

    // Eingangstor mit Rundbogen
    ctx.fillStyle = '#451a03';
    ctx.beginPath();
    ctx.arc(villaX, villaY + villaH - 12, 14, Math.PI, 0);
    ctx.lineTo(villaX + 14, villaY + villaH);
    ctx.lineTo(villaX - 14, villaY + villaH);
    ctx.closePath();
    ctx.fill();

    // ==========================================
    // EASTER EGG 1: TOSKANISCHES STEINHAUS-PODERE (x: 860, y: height * 0.44)
    // ==========================================
    const villaPulse = (Math.sin(t * 3.4) + 1) * 0.5;
    ctx.save();
    ctx.strokeStyle = `rgba(250, 204, 21, ${0.45 + villaPulse * 0.55})`;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 16;
    ctx.strokeRect(villaX - villaW * 0.55, villaY - 36, villaW * 1.1, villaH + 40);
    ctx.restore();

    // ==========================================
    // EASTER EGG 2: SCHLANKE HÜGEL-ZYPRESSEN (x: 600, y: height * 0.42)
    // ==========================================
    const cypressPulse = (Math.sin(t * 3.2 + 1.2) + 1) * 0.5;
    ctx.save();
    ctx.strokeStyle = `rgba(34, 197, 94, ${0.45 + cypressPulse * 0.55})`;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#22c55e';
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(600, height * 0.42, 55, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // ==========================================
    // EASTER EGG 3: SONNENBESCHIENENE WEINBERGE & OLIVENHAINE (x: 1280, y: height * 0.62)
    // ==========================================
    const vinePulse = (Math.sin(t * 3.0 + 2.4) + 1) * 0.5;
    ctx.save();
    ctx.strokeStyle = `rgba(234, 179, 8, ${0.45 + vinePulse * 0.55})`;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#eab308';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.arc(1280, height * 0.62, 58, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    ctx.restore();
  }

  _renderHerbst(ctx, width, height, t) {
    ctx.save();

    // 1. Warmer goldener Nachmittagshimmel im Herbst
    const sky = ctx.createLinearGradient(0, 0, 0, height * 0.72);
    sky.addColorStop(0, '#9a3412');
    sky.addColorStop(0.35, '#c2410c');
    sky.addColorStop(0.65, '#ea580c');
    sky.addColorStop(0.85, '#f59e0b');
    sky.addColorStop(1.0, '#fef08a');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    // Herbstsonne tief am Horizont
    const sunGrad = ctx.createRadialGradient(width * 0.42, height * 0.32, 10, width * 0.42, height * 0.32, 160);
    sunGrad.addColorStop(0, 'rgba(254, 240, 138, 0.95)');
    sunGrad.addColorStop(0.3, 'rgba(251, 191, 36, 0.65)');
    sunGrad.addColorStop(0.7, 'rgba(245, 158, 11, 0.25)');
    sunGrad.addColorStop(1.0, 'rgba(245, 158, 11, 0)');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(width * 0.42, height * 0.32, 160, 0, Math.PI * 2);
    ctx.fill();

    // 2. Entfernte herbstliche Waldhügelkette
    ctx.fillStyle = '#7c2d12';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.52);
    for (let x = 0; x <= width; x += 60) {
      const hY = height * 0.48 + Math.sin(x * 0.003 + 0.4) * 35 + Math.cos(x * 0.008) * 15;
      ctx.lineTo(x, hY);
    }
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // 3. Mittlere Hügel mit buntem Mischwald (Rot, Orange, Ocker, Goldgelb)
    const midGrad = ctx.createLinearGradient(0, height * 0.45, 0, height);
    midGrad.addColorStop(0, '#b45309');
    midGrad.addColorStop(0.5, '#92400e');
    midGrad.addColorStop(1.0, '#78350f');
    ctx.fillStyle = midGrad;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.60);
    for (let x = 0; x <= width; x += 50) {
      const mY = height * 0.56 + Math.sin(x * 0.004 + 1.8) * 45 + Math.sin(x * 0.012) * 18;
      ctx.lineTo(x, mY);
    }
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Baumkronen im Mittelgrund
    const canopyColors = ['#dc2626', '#b91c1c', '#ea580c', '#d97706', '#ca8a04', '#eab308', '#991b1b', '#7c2d12'];
    for (let x = 30; x < width; x += 85) {
      const cy = height * 0.52 + Math.sin(x * 0.004 + 1.8) * 35;
      const cRadius = 38 + Math.sin(x * 0.03) * 14;
      const col = canopyColors[Math.abs(Math.floor(x * 7)) % canopyColors.length];
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(x, cy, cRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    // 4. Vordergrund: Herbstlicher Waldweg, Waldboden & Laubbett
    const groundGrad = ctx.createLinearGradient(0, height * 0.65, 0, height);
    groundGrad.addColorStop(0, '#78350f');
    groundGrad.addColorStop(0.4, '#451a03');
    groundGrad.addColorStop(1.0, '#291102');
    ctx.fillStyle = groundGrad;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.70);
    ctx.bezierCurveTo(width * 0.35, height * 0.64, width * 0.65, height * 0.74, width, height * 0.68);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Waldweg
    ctx.fillStyle = '#a16207';
    ctx.beginPath();
    ctx.moveTo(width * 0.48, height * 0.68);
    ctx.bezierCurveTo(width * 0.50, height * 0.78, width * 0.54, height * 0.88, width * 0.60, height);
    ctx.lineTo(width * 0.44, height);
    ctx.bezierCurveTo(width * 0.40, height * 0.88, width * 0.44, height * 0.78, width * 0.46, height * 0.68);
    ctx.closePath();
    ctx.fill();

    // ==========================================
    // EASTER EGG 1: MÄCHTIGE GOLDENE ALTEICHE (x: 780, y: height * 0.38)
    // ==========================================
    const oakX = 780;
    const oakY = height * 0.42;
    // Gekrümmter mächtiger Stamm
    ctx.fillStyle = '#3c1806';
    ctx.beginPath();
    ctx.moveTo(oakX - 32, height * 0.76);
    ctx.quadraticCurveTo(oakX - 16, oakY + 60, oakX - 22, oakY);
    ctx.lineTo(oakX + 22, oakY);
    ctx.quadraticCurveTo(oakX + 16, oakY + 60, oakX + 36, height * 0.76);
    ctx.closePath();
    ctx.fill();

    // Mächtige goldene Eichenkrone mit vielen Schichten
    const oakClusters = [
      { dx: 0, dy: -65, r: 85, color: '#facc15' },
      { dx: -70, dy: -45, r: 75, color: '#ea580c' },
      { dx: 70, dy: -45, r: 75, color: '#eab308' },
      { dx: -45, dy: -95, r: 65, color: '#f59e0b' },
      { dx: 45, dy: -95, r: 65, color: '#d97706' },
      { dx: -90, dy: -15, r: 55, color: '#dc2626' },
      { dx: 90, dy: -15, r: 55, color: '#ca8a04' },
      { dx: 0, dy: -125, r: 50, color: '#fef08a' }
    ];
    for (let cl of oakClusters) {
      ctx.fillStyle = cl.color;
      ctx.beginPath();
      ctx.arc(oakX + cl.dx, oakY + cl.dy, cl.r, 0, Math.PI * 2);
      ctx.fill();
    }

    const oakPulse = (Math.sin(t * 3.4) + 1) * 0.5;
    ctx.save();
    ctx.strokeStyle = `rgba(250, 204, 21, ${0.45 + oakPulse * 0.55})`;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(oakX, oakY - 60, 110, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // ==========================================
    // EASTER EGG 2: KUNTERBUNTER RASCHELNDER LAUBHAUFEN (x: 1350, y: height * 0.72)
    // ==========================================
    const pileX = 1350;
    const pileY = height * 0.72;
    // Laubhaufen Hügel
    const pileGrad = ctx.createRadialGradient(pileX, pileY + 25, 10, pileX, pileY + 25, 95);
    pileGrad.addColorStop(0, '#f97316');
    pileGrad.addColorStop(0.4, '#ea580c');
    pileGrad.addColorStop(0.7, '#b91c1c');
    pileGrad.addColorStop(1.0, '#78350f');
    ctx.fillStyle = pileGrad;
    ctx.beginPath();
    ctx.ellipse(pileX, pileY + 20, 100, 48, 0, 0, Math.PI * 2);
    ctx.fill();

    // Einzelne sichtbare Blätter im Laubhaufen
    const leafScatters = [
      { dx: -45, dy: 10, col: '#facc15', r: 12 },
      { dx: -20, dy: -12, col: '#dc2626', r: 14 },
      { dx: 15, dy: -8, col: '#ea580c', r: 13 },
      { dx: 45, dy: 12, col: '#f59e0b', r: 11 },
      { dx: -60, dy: 22, col: '#b91c1c', r: 10 },
      { dx: 60, dy: 24, col: '#ca8a04', r: 12 },
      { dx: 0, dy: 15, col: '#fef08a', r: 11 }
    ];
    for (let ls of leafScatters) {
      ctx.fillStyle = ls.col;
      ctx.beginPath();
      ctx.ellipse(pileX + ls.dx, pileY + ls.dy, ls.r, ls.r * 0.55, 0.4, 0, Math.PI * 2);
      ctx.fill();
    }

    const pilePulse = (Math.sin(t * 3.2 + 1.2) + 1) * 0.5;
    ctx.save();
    ctx.strokeStyle = `rgba(249, 115, 22, ${0.45 + pilePulse * 0.55})`;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#f97316';
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(pileX, pileY, 105, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // ==========================================
    // EASTER EGG 3: HERBSTLICHES WALDPILZ-NEST & KASTANIEN (x: 420, y: height * 0.75)
    // ==========================================
    const mushX = 420;
    const mushY = height * 0.75;

    // Moosiger Waldholzbalken / Stumpf
    ctx.fillStyle = '#27272a';
    ctx.fillRect(mushX - 45, mushY + 15, 90, 24);
    ctx.fillStyle = '#15803d';
    ctx.fillRect(mushX - 42, mushY + 13, 84, 5);

    // Fliegenpilze (Rote Kappen mit weißen Tupfen)
    const mushrooms = [
      { dx: -22, dy: 12, r: 20, stemH: 22 },
      { dx: 6, dy: 6, r: 26, stemH: 28 },
      { dx: 28, dy: 16, r: 16, stemH: 18 }
    ];
    for (let m of mushrooms) {
      // Pilzstiel
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(mushX + m.dx - 4, mushY + m.dy, 8, m.stemH);
      // Rote Kappe
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.arc(mushX + m.dx, mushY + m.dy, m.r, Math.PI, 0);
      ctx.closePath();
      ctx.fill();
      // Weiße Tupfen
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(mushX + m.dx, mushY + m.dy - m.r * 0.55, 3, 0, Math.PI * 2);
      ctx.arc(mushX + m.dx - m.r * 0.5, mushY + m.dy - m.r * 0.25, 2.5, 0, Math.PI * 2);
      ctx.arc(mushX + m.dx + m.r * 0.5, mushY + m.dy - m.r * 0.25, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    const mushPulse = (Math.sin(t * 3.0 + 2.4) + 1) * 0.5;
    ctx.save();
    ctx.strokeStyle = `rgba(239, 68, 68, ${0.45 + mushPulse * 0.55})`;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.arc(mushX, mushY, 95, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    ctx.restore();
  }

  _renderSchneefall(ctx, width, height, t) {
    ctx.save();

    // 1. Frostiger Winter-Dämmerungshimmel
    const sky = ctx.createLinearGradient(0, 0, 0, height * 0.75);
    sky.addColorStop(0, '#1e293b');
    sky.addColorStop(0.35, '#334155');
    sky.addColorStop(0.70, '#64748b');
    sky.addColorStop(0.90, '#94a3b8');
    sky.addColorStop(1.0, '#e2e8f0');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    // Kühle verschneite Wintersonne / fahles Licht
    const sunGrad = ctx.createRadialGradient(width * 0.55, height * 0.28, 10, width * 0.55, height * 0.28, 140);
    sunGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    sunGrad.addColorStop(0.3, 'rgba(224, 242, 254, 0.60)');
    sunGrad.addColorStop(0.7, 'rgba(186, 230, 253, 0.20)');
    sunGrad.addColorStop(1.0, 'rgba(186, 230, 253, 0)');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(width * 0.55, height * 0.28, 140, 0, Math.PI * 2);
    ctx.fill();

    // 2. Entfernte schneebedeckte Bergmassive (Alpengipfel)
    const mtnGrad = ctx.createLinearGradient(0, height * 0.25, 0, height * 0.55);
    mtnGrad.addColorStop(0, '#f8fafc');
    mtnGrad.addColorStop(0.5, '#cbd5e1');
    mtnGrad.addColorStop(1.0, '#94a3b8');
    ctx.fillStyle = mtnGrad;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.50);
    const peaks = [
      { x: width * 0.08, y: height * 0.26 },
      { x: width * 0.18, y: height * 0.38 },
      { x: width * 0.28, y: height * 0.22 },
      { x: width * 0.38, y: height * 0.35 },
      { x: width * 0.50, y: height * 0.20 },
      { x: width * 0.62, y: height * 0.34 },
      { x: width * 0.74, y: height * 0.24 },
      { x: width * 0.86, y: height * 0.36 },
      { x: width * 0.96, y: height * 0.28 },
      { x: width, y: height * 0.42 }
    ];
    for (let p of peaks) {
      ctx.lineTo(p.x, p.y);
    }
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Schattierungen an den Felsgraten
    ctx.fillStyle = 'rgba(71, 85, 105, 0.35)';
    ctx.beginPath();
    ctx.moveTo(width * 0.28, height * 0.22);
    ctx.lineTo(width * 0.32, height * 0.46);
    ctx.lineTo(width * 0.28, height * 0.46);
    ctx.closePath();
    ctx.fill();

    // 3. Mittlere sanfte Schneehügel
    const hillGrad = ctx.createLinearGradient(0, height * 0.45, 0, height * 0.75);
    hillGrad.addColorStop(0, '#f1f5f9');
    hillGrad.addColorStop(0.5, '#e2e8f0');
    hillGrad.addColorStop(1.0, '#cbd5e1');
    ctx.fillStyle = hillGrad;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.55);
    for (let x = 0; x <= width; x += 50) {
      const hy = height * 0.52 + Math.sin(x * 0.003 + 0.8) * 40 + Math.cos(x * 0.007) * 18;
      ctx.lineTo(x, hy);
    }
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Verschneite Tannen im Mittelgrund
    for (let tx = 40; tx < width; tx += 65) {
      const ty = height * 0.50 + Math.sin(tx * 0.003 + 0.8) * 35;
      const th = 55 + Math.sin(tx * 0.05) * 18;
      const tw = th * 0.42;

      // Stamm
      ctx.fillStyle = '#451a03';
      ctx.fillRect(tx - 3, ty, 6, 12);

      // Nadelstufen
      for (let s = 0; s < 3; s++) {
        const sy = ty - 8 - s * (th * 0.28);
        const sw = tw * (1 - s * 0.25);
        ctx.fillStyle = '#064e3b';
        ctx.beginPath();
        ctx.moveTo(tx, sy - th * 0.32);
        ctx.lineTo(tx + sw, sy);
        ctx.lineTo(tx - sw, sy);
        ctx.closePath();
        ctx.fill();

        // Dicke Schneeschicht auf den Nadeln
        ctx.fillStyle = '#f8fafc';
        ctx.beginPath();
        ctx.moveTo(tx, sy - th * 0.32);
        ctx.lineTo(tx + sw * 0.85, sy - 3);
        ctx.lineTo(tx - sw * 0.85, sy - 3);
        ctx.closePath();
        ctx.fill();
      }
    }

    // 4. Vordergrund: Tiefe Schneedecke & zugefrorener Eispfad
    const fgSnow = ctx.createLinearGradient(0, height * 0.65, 0, height);
    fgSnow.addColorStop(0, '#f8fafc');
    fgSnow.addColorStop(0.3, '#f1f5f9');
    fgSnow.addColorStop(0.7, '#e2e8f0');
    fgSnow.addColorStop(1.0, '#cbd5e1');
    ctx.fillStyle = fgSnow;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.68);
    ctx.bezierCurveTo(width * 0.35, height * 0.62, width * 0.68, height * 0.72, width, height * 0.66);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Glatteis-Reflexionen / Frost
    ctx.fillStyle = 'rgba(165, 243, 252, 0.45)';
    ctx.beginPath();
    ctx.ellipse(width * 0.32, height * 0.82, 140, 28, -0.12, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // ==========================================
    // EASTER EGG 1: VERSCHNEITE BLOCKHÜTTE MIT KAMINRAUCH (x: 920, y: height * 0.48)
    // ==========================================
    const cabinX = 920;
    const cabinY = height * 0.44;
    const cabinW = 160;
    const cabinH = 95;

    // Blockbalken-Wände
    ctx.fillStyle = '#78350f';
    ctx.fillRect(cabinX - cabinW * 0.5, cabinY, cabinW, cabinH);
    ctx.strokeStyle = '#451a03';
    ctx.lineWidth = 2;
    ctx.strokeRect(cabinX - cabinW * 0.5, cabinY, cabinW, cabinH);

    // Horizontale Balkenlinien
    ctx.fillStyle = '#92400e';
    for (let by = cabinY + 12; by < cabinY + cabinH; by += 14) {
      ctx.beginPath();
      ctx.moveTo(cabinX - cabinW * 0.5, by);
      ctx.lineTo(cabinX + cabinW * 0.5, by);
      ctx.stroke();
    }

    // Gemütlich warm leuchtendes Fenster
    ctx.fillStyle = '#fef08a';
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 16;
    ctx.fillRect(cabinX - 35, cabinY + 28, 28, 28);
    ctx.shadowBlur = 0;
    ctx.strokeStyle = '#451a03';
    ctx.strokeRect(cabinX - 35, cabinY + 28, 28, 28);

    // Holztür mit Schneebesen
    ctx.fillStyle = '#451a03';
    ctx.fillRect(cabinX + 22, cabinY + 26, 26, cabinH - 26);

    // Satteldach mit dicker Schneedecke
    ctx.fillStyle = '#451a03';
    ctx.beginPath();
    ctx.moveTo(cabinX - cabinW * 0.58, cabinY);
    ctx.lineTo(cabinX, cabinY - 42);
    ctx.lineTo(cabinX + cabinW * 0.58, cabinY);
    ctx.closePath();
    ctx.fill();

    // Dicke weiche Schneekappe auf dem Dach
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(cabinX - cabinW * 0.62, cabinY + 4);
    ctx.quadraticCurveTo(cabinX - cabinW * 0.3, cabinY - 32, cabinX, cabinY - 48);
    ctx.quadraticCurveTo(cabinX + cabinW * 0.3, cabinY - 32, cabinX + cabinW * 0.62, cabinY + 4);
    ctx.lineTo(cabinX + cabinW * 0.56, cabinY + 8);
    ctx.lineTo(cabinX, cabinY - 36);
    ctx.lineTo(cabinX - cabinW * 0.56, cabinY + 8);
    ctx.closePath();
    ctx.fill();

    // Schornstein mit rauchendem Kamin
    ctx.fillStyle = '#57534e';
    ctx.fillRect(cabinX + 32, cabinY - 55, 16, 26);
    // Kaminrauch steigt auf
    const smokePhase = t * 2.2;
    for (let s = 0; s < 4; s++) {
      const smY = cabinY - 65 - s * 22;
      const smX = cabinX + 40 + Math.sin(smokePhase + s) * 12 + s * 8;
      const smR = 10 + s * 6;
      ctx.fillStyle = `rgba(241, 245, 249, ${0.55 - s * 0.12})`;
      ctx.beginPath();
      ctx.arc(smX, smY, smR, 0, Math.PI * 2);
      ctx.fill();
    }

    const cabinPulse = (Math.sin(t * 3.4) + 1) * 0.5;
    ctx.save();
    ctx.strokeStyle = `rgba(250, 204, 21, ${0.45 + cabinPulse * 0.55})`;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 16;
    ctx.strokeRect(cabinX - cabinW * 0.60, cabinY - 50, cabinW * 1.2, cabinH + 55);
    ctx.restore();

    // ==========================================
    // EASTER EGG 2: LUSTIGER SCHNEEMANN MIT ZYLINDER (x: 1380, y: height * 0.68)
    // ==========================================
    const smX = 1380;
    const smY = height * 0.68;

    // 3 Schneekugeln
    // Untere Kugel
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(smX, smY + 36, 42, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(203, 213, 225, 0.6)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Mittlere Kugel
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(smX, smY - 8, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Kopf
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(smX, smY - 45, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Kohleaugen & Lächeln
    ctx.fillStyle = '#18181b';
    ctx.beginPath();
    ctx.arc(smX - 7, smY - 49, 3, 0, Math.PI * 2);
    ctx.arc(smX + 7, smY - 49, 3, 0, Math.PI * 2);
    ctx.arc(smX - 8, smY - 38, 2, 0, Math.PI * 2);
    ctx.arc(smX - 3, smY - 36, 2, 0, Math.PI * 2);
    ctx.arc(smX + 3, smY - 36, 2, 0, Math.PI * 2);
    ctx.arc(smX + 8, smY - 38, 2, 0, Math.PI * 2);
    ctx.fill();

    // Knallrote Möhrennase
    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.moveTo(smX, smY - 44);
    ctx.lineTo(smX + 22, smY - 41);
    ctx.lineTo(smX, smY - 39);
    ctx.closePath();
    ctx.fill();

    // Schwarzer Zylinder mit rotem Band
    ctx.fillStyle = '#18181b';
    ctx.fillRect(smX - 26, smY - 68, 52, 6); // Hutkrempe
    ctx.fillRect(smX - 16, smY - 96, 32, 28); // Hutkörper
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(smX - 16, smY - 73, 32, 5); // Rotes Band

    // Roter Schal
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(smX - 18, smY - 26, 36, 8);
    ctx.fillRect(smX + 8, smY - 26, 10, 26); // Wehendes Schal-Ende

    // Ast-Arme
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(smX - 28, smY - 12);
    ctx.lineTo(smX - 58, smY - 28);
    ctx.moveTo(smX + 28, smY - 12);
    ctx.lineTo(smX + 62, smY - 34);
    ctx.stroke();

    const smPulse = (Math.sin(t * 3.2 + 1.2) + 1) * 0.5;
    ctx.save();
    ctx.strokeStyle = `rgba(56, 189, 248, ${0.45 + smPulse * 0.55})`;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(smX, smY - 10, 85, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // ==========================================
    // EASTER EGG 3: GLITZERNDE EIS-KRISTALL-TANNE (x: 540, y: height * 0.52)
    // ==========================================
    const treeX = 540;
    const treeY = height * 0.52;
    const treeH = 140;

    // Massiver Tannenstamm
    ctx.fillStyle = '#451a03';
    ctx.fillRect(treeX - 7, treeY, 14, 25);

    // Kristallene, tief verschneite Tannenschichten
    for (let i = 0; i < 4; i++) {
      const ly = treeY - i * 28;
      const lw = 65 - i * 11;

      // Nadelzweige
      ctx.fillStyle = '#064e3b';
      ctx.beginPath();
      ctx.moveTo(treeX, ly - 42);
      ctx.lineTo(treeX + lw, ly);
      ctx.lineTo(treeX - lw, ly);
      ctx.closePath();
      ctx.fill();

      // Schneekruste & glitzernde Eiszapfen
      ctx.fillStyle = '#f0fdf4';
      ctx.beginPath();
      ctx.moveTo(treeX, ly - 42);
      ctx.lineTo(treeX + lw * 0.85, ly - 5);
      ctx.lineTo(treeX - lw * 0.85, ly - 5);
      ctx.closePath();
      ctx.fill();

      // Hängende Eiszapfen
      ctx.fillStyle = 'rgba(186, 230, 253, 0.85)';
      for (let ic = -lw * 0.7; ic <= lw * 0.7; ic += 18) {
        ctx.beginPath();
        ctx.moveTo(treeX + ic - 3, ly);
        ctx.lineTo(treeX + ic, ly + 14);
        ctx.lineTo(treeX + ic + 3, ly);
        ctx.closePath();
        ctx.fill();
      }
    }

    const treePulse = (Math.sin(t * 3.0 + 2.4) + 1) * 0.5;
    ctx.save();
    ctx.strokeStyle = `rgba(147, 197, 253, ${0.45 + treePulse * 0.55})`;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#93c5fd';
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(treeX, treeY - 55, 95, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    ctx.restore();
  }

  _renderChina(ctx, width, height, t) {
    ctx.save();

    // 1. Dramatischer chinesischer Berggewitter-Himmel
    const sky = ctx.createLinearGradient(0, 0, 0, height * 0.72);
    sky.addColorStop(0, '#0f172a');
    sky.addColorStop(0.35, '#1e1b4b');
    sky.addColorStop(0.65, '#312e81');
    sky.addColorStop(0.85, '#4338ca');
    sky.addColorStop(1.0, '#6366f1');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    // Ferner Dunst & Schleier über den Gipfeln
    const mistGrad = ctx.createLinearGradient(0, height * 0.25, 0, height * 0.55);
    mistGrad.addColorStop(0, 'rgba(199, 210, 254, 0.15)');
    mistGrad.addColorStop(0.5, 'rgba(165, 180, 252, 0.35)');
    mistGrad.addColorStop(1.0, 'rgba(147, 197, 253, 0.10)');
    ctx.fillStyle = mistGrad;
    ctx.fillRect(0, height * 0.25, width, height * 0.30);

    // 2. Majestätische Karstfelsen-Türme in der Ferne (Guilin Karstberge)
    const farKarst = ctx.createLinearGradient(0, height * 0.15, 0, height * 0.65);
    farKarst.addColorStop(0, '#1e1b4b');
    farKarst.addColorStop(0.5, '#312e81');
    farKarst.addColorStop(1.0, '#1e293b');
    ctx.fillStyle = farKarst;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.60);
    const karstPillars = [
      { x: width * 0.05, topY: height * 0.22, w: 90 },
      { x: width * 0.16, topY: height * 0.18, w: 110 },
      { x: width * 0.27, topY: height * 0.28, w: 85 },
      { x: width * 0.38, topY: height * 0.16, w: 130 },
      { x: width * 0.52, topY: height * 0.24, w: 100 },
      { x: width * 0.64, topY: height * 0.15, w: 120 },
      { x: width * 0.76, topY: height * 0.25, w: 95 },
      { x: width * 0.88, topY: height * 0.18, w: 115 },
      { x: width * 0.98, topY: height * 0.22, w: 90 }
    ];
    for (let kp of karstPillars) {
      ctx.lineTo(kp.x - kp.w * 0.5, height * 0.65);
      ctx.quadraticCurveTo(kp.x - kp.w * 0.3, kp.topY, kp.x, kp.topY - 12);
      ctx.quadraticCurveTo(kp.x + kp.w * 0.3, kp.topY, kp.x + kp.w * 0.5, height * 0.65);
    }
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // 3. Mittlere Hügelkette mit Kiefern und Bambus
    const midGrad = ctx.createLinearGradient(0, height * 0.45, 0, height * 0.75);
    midGrad.addColorStop(0, '#064e3b');
    midGrad.addColorStop(0.5, '#065f46');
    midGrad.addColorStop(1.0, '#022c22');
    ctx.fillStyle = midGrad;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.64);
    for (let x = 0; x <= width; x += 45) {
      const my = height * 0.58 + Math.sin(x * 0.003 + 1.2) * 35 + Math.cos(x * 0.009) * 16;
      ctx.lineTo(x, my);
    }
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // 4. Gewundener Fluss / Li-Fluss im Tal
    const riverGrad = ctx.createLinearGradient(0, height * 0.66, 0, height);
    riverGrad.addColorStop(0, '#0d9488');
    riverGrad.addColorStop(0.5, '#0f766e');
    riverGrad.addColorStop(1.0, '#115e59');
    ctx.fillStyle = riverGrad;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.72);
    ctx.bezierCurveTo(width * 0.35, height * 0.68, width * 0.65, height * 0.78, width, height * 0.70);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // ==========================================
    // EASTER EGG 1: KAISERLICHE GOLDENE PAGODE (x: 880, y: height * 0.40)
    // ==========================================
    const pagX = 880;
    const pagY = height * 0.35;
    const pagW = 120;
    const pagH = 160;

    // Mehrstöckige Pagode (4 Stockwerke mit geschwungenen Traufen)
    for (let fl = 0; fl < 4; fl++) {
      const fy = pagY + pagH - fl * 36;
      const fw = pagW * (1 - fl * 0.16);
      const fh = 32;

      // Rote Holzpfeiler / Wände
      ctx.fillStyle = '#b91c1c';
      ctx.fillRect(pagX - fw * 0.42, fy - fh, fw * 0.84, fh);
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(pagX - fw * 0.42, fy - fh, fw * 0.84, fh);

      // Goldene Fensteröffnungen
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(pagX - 8, fy - fh + 6, 16, 20);

      // Geschwungenes Pagodendach mit nach oben gebogenen Ecken
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.moveTo(pagX - fw * 0.65, fy - fh + 4);
      ctx.quadraticCurveTo(pagX - fw * 0.4, fy - fh - 14, pagX, fy - fh - 18);
      ctx.quadraticCurveTo(pagX + fw * 0.4, fy - fh - 14, pagX + fw * 0.65, fy - fh + 4);
      ctx.lineTo(pagX + fw * 0.58, fy - fh + 8);
      ctx.quadraticCurveTo(pagX + fw * 0.35, fy - fh - 8, pagX, fy - fh - 12);
      ctx.quadraticCurveTo(pagX - fw * 0.35, fy - fh - 8, pagX - fw * 0.58, fy - fh + 8);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Pagoden-Spitze (Goldene Turmspitze / Stupa-Pinnacle)
    const spireY = pagY + pagH - 4 * 36 - 18;
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.moveTo(pagX, spireY - 32);
    ctx.lineTo(pagX + 6, spireY);
    ctx.lineTo(pagX - 6, spireY);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.arc(pagX, spireY - 32, 5, 0, Math.PI * 2);
    ctx.fill();

    const pagPulse = (Math.sin(t * 3.4) + 1) * 0.5;
    ctx.save();
    ctx.strokeStyle = `rgba(250, 204, 21, ${0.45 + pagPulse * 0.55})`;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(pagX, pagY + 70, 110, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // ==========================================
    // EASTER EGG 2: TRADITIONELLER ROTER LAMPION-PAVILLON (x: 1360, y: height * 0.62)
    // ==========================================
    const pavX = 1360;
    const pavY = height * 0.62;
    const pavW = 100;
    const pavH = 75;

    // Holzbasis / Steinpodest
    ctx.fillStyle = '#78350f';
    ctx.fillRect(pavX - pavW * 0.5, pavY + pavH - 14, pavW, 14);

    // 4 Rote Lacksäulen
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(pavX - pavW * 0.42, pavY, 8, pavH - 14);
    ctx.fillRect(pavX - pavW * 0.15, pavY, 7, pavH - 14);
    ctx.fillRect(pavX + pavW * 0.10, pavY, 7, pavH - 14);
    ctx.fillRect(pavX + pavW * 0.35, pavY, 8, pavH - 14);

    // Geschwungenes Pavillondach
    ctx.fillStyle = '#ea580c';
    ctx.beginPath();
    ctx.moveTo(pavX - pavW * 0.62, pavY + 4);
    ctx.quadraticCurveTo(pavX - pavW * 0.35, pavY - 24, pavX, pavY - 28);
    ctx.quadraticCurveTo(pavX + pavW * 0.35, pavY - 24, pavX + pavW * 0.62, pavY + 4);
    ctx.lineTo(pavX + pavW * 0.55, pavY + 8);
    ctx.quadraticCurveTo(pavX + pavW * 0.3, pavY - 16, pavX, pavY - 20);
    ctx.quadraticCurveTo(pavX - pavW * 0.3, pavY - 16, pavX - pavW * 0.55, pavY + 8);
    ctx.closePath();
    ctx.fill();

    // Leuchtende Rote Lampions (hängend)
    const lanterns = [-pavW * 0.35, 0, pavW * 0.35];
    for (let lx of lanterns) {
      // Faden
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pavX + lx, pavY);
      ctx.lineTo(pavX + lx, pavY + 12);
      ctx.stroke();

      // Roter Lampion-Körper
      ctx.fillStyle = '#ef4444';
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.ellipse(pavX + lx, pavY + 22, 10, 13, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Goldene Streifen
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pavX + lx - 10, pavY + 22);
      ctx.lineTo(pavX + lx + 10, pavY + 22);
      ctx.stroke();
    }

    const pavPulse = (Math.sin(t * 3.2 + 1.2) + 1) * 0.5;
    ctx.save();
    ctx.strokeStyle = `rgba(239, 68, 68, ${0.45 + pavPulse * 0.55})`;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(pavX, pavY + 25, 100, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // ==========================================
    // EASTER EGG 3: URALTE STEINKARST-KLIPPEN & BAMBUS (x: 480, y: height * 0.55)
    // ==========================================
    const rockX = 480;
    const rockY = height * 0.55;

    // Mächtiger Karstfelsenfelsen
    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.moveTo(rockX - 65, rockY + 85);
    ctx.lineTo(rockX - 45, rockY - 45);
    ctx.lineTo(rockX, rockY - 65);
    ctx.lineTo(rockX + 45, rockY - 40);
    ctx.lineTo(rockX + 60, rockY + 85);
    ctx.closePath();
    ctx.fill();

    // Bambushalm-Büschel auf dem Felsen
    ctx.strokeStyle = '#16a34a';
    ctx.lineWidth = 3.5;
    for (let b = -30; b <= 30; b += 14) {
      const bTopY = rockY - 85 - Math.abs(b) * 0.5;
      ctx.beginPath();
      ctx.moveTo(rockX + b, rockY - 30);
      ctx.quadraticCurveTo(rockX + b + 6, (rockY - 30 + bTopY) * 0.5, rockX + b + 12, bTopY);
      ctx.stroke();

      // Bambusblätter
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.ellipse(rockX + b + 14, bTopY - 6, 12, 4, 0.4, 0, Math.PI * 2);
      ctx.ellipse(rockX + b + 8, bTopY + 2, 10, 3, -0.3, 0, Math.PI * 2);
      ctx.fill();
    }

    const rockPulse = (Math.sin(t * 3.0 + 2.4) + 1) * 0.5;
    ctx.save();
    ctx.strokeStyle = `rgba(34, 197, 94, ${0.45 + rockPulse * 0.55})`;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#22c55e';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.arc(rockX, rockY, 105, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    ctx.restore();
  }

  _renderJuliusCaesar(ctx, width, height, t) {
    ctx.save();

    // 1. Erhabener mediterraner Abendhimmel (Goldene & Purpurne Töne)
    const sky = ctx.createLinearGradient(0, 0, 0, height * 0.75);
    sky.addColorStop(0, '#31103f');    // Tiefes römisches Kaiserpurpur
    sky.addColorStop(0.35, '#581c87'); // Edles Violett
    sky.addColorStop(0.65, '#991b1b'); // Römisches Legionärs-Rot
    sky.addColorStop(0.85, '#d97706'); // Warmes Abendgold
    sky.addColorStop(1.0, '#fde047');  // Strahlendes Mittelmeerlicht
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    // 2. Ferne mediterrane Hügelkette & Zypressen
    const hillGrad = ctx.createLinearGradient(0, height * 0.45, 0, height * 0.70);
    hillGrad.addColorStop(0, '#14532d');
    hillGrad.addColorStop(0.6, '#064e3b');
    hillGrad.addColorStop(1.0, '#022c22');
    ctx.fillStyle = hillGrad;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.65);
    for (let x = 0; x <= width; x += 40) {
      const hy = height * 0.56 + Math.sin(x * 0.002 + 0.5) * 40 + Math.cos(x * 0.006) * 15;
      ctx.lineTo(x, hy);
    }
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Zypressen-Silhouetten in der Ferne
    ctx.fillStyle = '#064e3b';
    for (let cx = 120; cx < width; cx += 220) {
      const cy = height * 0.54 + Math.sin(cx * 0.002 + 0.5) * 35;
      ctx.beginPath();
      ctx.ellipse(cx, cy - 25, 12, 38, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Antiker römischer Marmorboden / Forum-Terrasse
    const floorGrad = ctx.createLinearGradient(0, height * 0.68, 0, height);
    floorGrad.addColorStop(0, '#cbd5e1'); // Heller Marmor
    floorGrad.addColorStop(0.5, '#94a3b8');
    floorGrad.addColorStop(1.0, '#64748b');
    ctx.fillStyle = floorGrad;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.68);
    ctx.lineTo(width, height * 0.68);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Marmorplatten-Fugen
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1.5;
    for (let lx = 0; lx <= width; lx += 140) {
      ctx.beginPath();
      ctx.moveTo(lx, height * 0.68);
      ctx.lineTo(lx - 80, height);
      ctx.stroke();
    }

    // 4. Zentrales Marmorpodest / Herrschersockel (x: 1200)
    const podX = width * 0.5;
    const podY = height * 0.64;
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(podX - 220, podY - 50, 440, 50);
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(podX - 250, podY, 500, 35);
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(podX - 220, podY - 50, 440, 50);

    // Römischer Adler & Lorbeergirlande am Sockel
    ctx.fillStyle = '#d97706';
    ctx.font = 'bold 22px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('S • P • Q • R', podX, podY - 18);

    // Römische Marmorsäulen links und rechts
    const columns = [podX - 340, podX - 480, podX + 340, podX + 480];
    for (let colX of columns) {
      // Säulenschaft
      const colGrad = ctx.createLinearGradient(colX - 25, 0, colX + 25, 0);
      colGrad.addColorStop(0, '#e2e8f0');
      colGrad.addColorStop(0.4, '#ffffff');
      colGrad.addColorStop(1, '#94a3b8');
      ctx.fillStyle = colGrad;
      ctx.fillRect(colX - 22, height * 0.22, 44, height * 0.46);

      // Säulenkapitell (Korinthisch / Ionisch) & Basis
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(colX - 30, height * 0.20, 60, 20);
      ctx.fillRect(colX - 28, height * 0.66, 56, 18);
    }

    // Purpurner Baldachin / Kaiserlicher Vorhang
    ctx.fillStyle = '#7e22ce';
    ctx.beginPath();
    ctx.moveTo(podX - 280, height * 0.16);
    ctx.quadraticCurveTo(podX, height * 0.24, podX + 280, height * 0.16);
    ctx.lineTo(podX + 290, height * 0.38);
    ctx.quadraticCurveTo(podX + 260, height * 0.32, podX + 230, height * 0.40);
    ctx.lineTo(podX - 230, height * 0.40);
    ctx.quadraticCurveTo(podX - 260, height * 0.32, podX - 290, height * 0.38);
    ctx.closePath();
    ctx.fill();

    // ==========================================
    // EASTER EGGS HINT CIRCLES / SYMBOLS
    // ==========================================
    // 1. Lorbeerkrone des Cäsar (x: 1200, y: height * 0.38)
    const egg1Pulse = (Math.sin(t * 3.4) + 1) * 0.5;
    ctx.save();
    ctx.strokeStyle = `rgba(250, 204, 21, ${0.45 + egg1Pulse * 0.55})`;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(podX, height * 0.38, 105, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // 2. Kaiserliches Zepter der Macht (x: 1380, y: height * 0.46)
    const egg2Pulse = (Math.sin(t * 3.1 + 1.2) + 1) * 0.5;
    ctx.save();
    ctx.strokeStyle = `rgba(249, 115, 22, ${0.45 + egg2Pulse * 0.55})`;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#f97316';
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(podX + 180, height * 0.46, 95, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // 3. Antike Senats-Schriftrolle (x: 1020, y: height * 0.48)
    const egg3Pulse = (Math.sin(t * 3.0 + 2.4) + 1) * 0.5;
    ctx.save();
    ctx.strokeStyle = `rgba(56, 189, 248, ${0.45 + egg3Pulse * 0.55})`;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(podX - 180, height * 0.48, 95, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    ctx.restore();
  }
}










