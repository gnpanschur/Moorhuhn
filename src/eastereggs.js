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

    if (theme === "summer") {
      this.eggs.push({
        id: "windmill",
        x: 350,
        y: screenHeight * 0.45,
        radius: 100,
        hits: 0,
        maxHits: 3,
        reward: 200,
        popupText: "WINDMÜHLEN-STURM! +200",
      });
      this.eggs.push({
        id: "scarecrow",
        x: 1200,
        y: screenHeight * 0.72,
        radius: 90,
        hits: 0,
        maxHits: 2,
        reward: 100,
        popupText: "VOGELSCHEUCHE! +100",
      });
      this.eggs.push({
        id: "outhouse",
        x: 1850,
        y: screenHeight * 0.76,
        radius: 90,
        hits: 0,
        maxHits: 1,
        reward: 75,
        popupText: "PLUMPSKLO-HUHN! +75",
      });
    } else if (theme === "winter") {
      this.eggs.push({
        id: "snowman",
        x: 500,
        y: screenHeight * 0.72,
        radius: 95,
        hits: 0,
        maxHits: 3,
        reward: 150,
        popupText: "SCHNEEMANN-BOMBE! +150",
      });
      this.eggs.push({
        id: "chimney",
        x: 1550,
        y: screenHeight * 0.48,
        radius: 85,
        hits: 0,
        maxHits: 3,
        reward: 200,
        popupText: "WEIHNACHTS-HUHN! +200",
      });
    } else if (theme === "beach") {
      this.eggs.push({
        id: "coconuts",
        x: 610,
        y: screenHeight * 0.42,
        radius: 95,
        hits: 0,
        maxHits: 3,
        reward: 120,
        popupText: "KOKOSNUSS-BONUS! +120",
      });
      this.eggs.push({
        id: "bottle",
        x: 1400,
        y: screenHeight * 0.62,
        radius: 85,
        hits: 0,
        maxHits: 1,
        reward: 100,
        popupText: "FLASCHENPOST! +100",
      });
    } else if (theme === "forest") {
      this.eggs.push({
        id: "hollowtree",
        x: 720,
        y: screenHeight * 0.6,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 125,
        popupText: "BAUMHÖHLEN-EULE! +125",
      });
      this.eggs.push({
        id: "mushroom",
        x: 1600,
        y: screenHeight * 0.8,
        radius: 90,
        hits: 0,
        maxHits: 1,
        reward: 80,
        popupText: "ZAUBERPILZ! +80",
      });
    } else if (theme === "spooky") {
      this.eggs.push({
        id: "tombstone",
        x: 350,
        y: screenHeight * 0.76,
        radius: 95,
        hits: 0,
        maxHits: 1,
        reward: 250,
        popupText: "GEISTER-BESCHWÖRUNG! +250",
      });
      this.eggs.push({
        id: "weathervane",
        x: 770,
        y: screenHeight * 0.25,
        radius: 85,
        hits: 0,
        maxHits: 1,
        reward: 100,
        popupText: "WETTERHAHN! +100",
      });
    } else if (theme === "aquarium") {
      this.eggs.push({
        id: "shipwreck",
        x: 450,
        y: screenHeight * 0.65,
        radius: 110,
        hits: 0,
        maxHits: 3,
        reward: 200,
        popupText: "PIRATEN-SCHATZ! +200",
      });
      this.eggs.push({
        id: "anemone",
        x: 1750,
        y: screenHeight * 0.75,
        radius: 95,
        hits: 0,
        maxHits: 1,
        reward: 150,
        popupText: "KORALLEN-HUHN! +150",
      });
    } else if (theme === "city") {
      this.eggs.push({
        id: "billboard",
        x: 1400,
        y: screenHeight * 0.3,
        radius: 100,
        hits: 0,
        maxHits: 3,
        reward: 250,
        popupText: "METROPOLIS-NEON! +250",
      });
      this.eggs.push({
        id: "bridgetower",
        x: 950,
        y: screenHeight * 0.55,
        radius: 90,
        hits: 0,
        maxHits: 1,
        reward: 150,
        popupText: "BRÜCKEN-LICHT! +150",
      });
    } else if (theme === "farm") {
      this.eggs.push({
        id: "tractor",
        x: 1620,
        y: screenHeight * 0.76,
        radius: 110,
        hits: 0,
        maxHits: 3,
        reward: 225,
        popupText: "TRAKTOR-MOTOR! +225",
      });
      this.eggs.push({
        id: "haybales",
        x: 420,
        y: screenHeight * 0.72,
        radius: 100,
        hits: 0,
        maxHits: 2,
        reward: 150,
        popupText: "HEUHAUFEN-HUHN! +150",
      });
      this.eggs.push({
        id: "barnvane",
        x: 540,
        y: screenHeight * 0.22,
        radius: 85,
        hits: 0,
        maxHits: 1,
        reward: 175,
        popupText: "GOLDENER WETTERHAHN! +175",
      });
    } else if (theme === "castle") {
      this.eggs.push({
        id: "castlebell",
        x: 1280,
        y: screenHeight * 0.42,
        radius: 100,
        hits: 0,
        maxHits: 3,
        reward: 250,
        popupText: "BURGTOR-GLOCKE! +250",
      });
      this.eggs.push({
        id: "knightarmor",
        x: 1720,
        y: screenHeight * 0.48,
        radius: 90,
        hits: 0,
        maxHits: 2,
        reward: 180,
        popupText: "RITTERRÜSTUNG-BONUS! +180",
      });
      this.eggs.push({
        id: "dragonshield",
        x: 1450,
        y: screenHeight * 0.32,
        radius: 90,
        hits: 0,
        maxHits: 1,
        reward: 200,
        popupText: "DRACHEN-WAPPEN! +200",
      });
    } else if (theme === "egypt") {
      this.eggs.push({
        id: "sphinx",
        x: 350,
        y: screenHeight * 0.42,
        radius: 110,
        hits: 0,
        maxHits: 3,
        reward: 300,
        popupText: "SPHINX-RÄTSEL! +300",
      });
      this.eggs.push({
        id: "pyramidtop",
        x: 1240,
        y: screenHeight * 0.28,
        radius: 100,
        hits: 0,
        maxHits: 2,
        reward: 200,
        popupText: "PYRAMIDEN-SPITZE! +200",
      });
      this.eggs.push({
        id: "obelisk",
        x: 1850,
        y: screenHeight * 0.52,
        radius: 90,
        hits: 0,
        maxHits: 1,
        reward: 250,
        popupText: "OBELISKEN-SCHATZ! +250",
      });
    } else if (theme === "rome") {
      this.eggs.push({
        id: "colosseum",
        x: 880,
        y: screenHeight * 0.35,
        radius: 120,
        hits: 0,
        maxHits: 3,
        reward: 350,
        popupText: "KOLOSSEUM-TRIUMPH! +350",
      });
      this.eggs.push({
        id: "caesar",
        x: 1400,
        y: screenHeight * 0.72,
        radius: 95,
        hits: 0,
        maxHits: 2,
        reward: 220,
        popupText: "CAESAR-KRANZ! +220",
      });
      this.eggs.push({
        id: "spqreagle",
        x: 1620,
        y: screenHeight * 0.55,
        radius: 95,
        hits: 0,
        maxHits: 1,
        reward: 280,
        popupText: "SPQR-ADLER! +280",
      });
    } else if (theme === "gaul") {
      this.eggs.push({
        id: "cauldron",
        x: 1300,
        y: screenHeight * 0.64,
        radius: 110,
        hits: 0,
        maxHits: 3,
        reward: 400,
        popupText: "ZAUBERTRANK-KESSEL! +400",
      });
      this.eggs.push({
        id: "wildboar",
        x: 1620,
        y: screenHeight * 0.76,
        radius: 100,
        hits: 0,
        maxHits: 2,
        reward: 300,
        popupText: "WILDSCHWEIN-SPIESS! +300",
      });
      this.eggs.push({
        id: "menhir",
        x: 1040,
        y: screenHeight * 0.7,
        radius: 90,
        hits: 0,
        maxHits: 1,
        reward: 350,
        popupText: "HÜTTEN-MENHIR! +350",
      });
    } else if (theme === "palace") {
      // Imperial Crown (Central Golden Palace Domes)
      this.eggs.push({
        id: "empresscrown",
        x: 1200,
        y: screenHeight * 0.25,
        radius: 140,
        hits: 0,
        maxHits: 3,
        reward: 450,
        popupText: "KAISERIN-KRONE! +450",
      });
      // Left Palace Fountain
      this.eggs.push({
        id: "palacefountain",
        x: 750,
        y: screenHeight * 0.65,
        radius: 120,
        hits: 0,
        maxHits: 2,
        reward: 350,
        popupText: "PALAST-FOUNTAIN! +350",
      });
      // Right Palace Fountain / Statue
      this.eggs.push({
        id: "phoenixstatue",
        x: 1850,
        y: screenHeight * 0.6,
        radius: 120,
        hits: 0,
        maxHits: 1,
        reward: 400,
        popupText: "GOLDENE PHÖNIX-STATUE! +400",
      });
    } else if (theme === "moorland") {
      // Thatched Hut Chimney Smoke (Right side hut)
      this.eggs.push({
        id: "hutsmoke",
        x: 1850,
        y: screenHeight * 0.32,
        radius: 110,
        hits: 0,
        maxHits: 3,
        reward: 350,
        popupText: "SCHILFHÜTTEN-RAUCH! +350",
      });
      // Gnarled Tree Owl Nest (Left side twisted trees)
      this.eggs.push({
        id: "gnarledtree",
        x: 420,
        y: screenHeight * 0.42,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 250,
        popupText: "KNORRENBAUM-EULE! +250",
      });
      // Swamp Waterhole Will-o'-the-Wisp (Lower center swamp pool)
      this.eggs.push({
        id: "swampwillop",
        x: 1380,
        y: screenHeight * 0.72,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 400,
        popupText: "SUMPF-IRRLICHT! +400",
      });
    } else if (theme === "dragon_valley") {
      // Dragon Cave Glowing Eyes (Right side cave opening)
      this.eggs.push({
        id: "dragoncave",
        x: 1720,
        y: screenHeight * 0.32,
        radius: 120,
        hits: 0,
        maxHits: 3,
        reward: 450,
        popupText: "DRACHENHÖHLEN-AUGE! +450",
      });
      // Smoking Volcano Crater (Left background peak)
      this.eggs.push({
        id: "volcanoerupt",
        x: 620,
        y: screenHeight * 0.28,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 350,
        popupText: "VULKAN-AUSBRUCH! +350",
      });
      // Giant Dinosaur Skeleton Skull (Foreground left bones)
      this.eggs.push({
        id: "dinoskeleton",
        x: 350,
        y: screenHeight * 0.78,
        radius: 110,
        hits: 0,
        maxHits: 1,
        reward: 300,
        popupText: "DINO-SKELETT! +300",
      });
    } else if (theme === "jungle_ruins") {
      // Golden Sun Disc on Aztec pyramid top
      this.eggs.push({
        id: "sundisc",
        x: 1540,
        y: screenHeight * 0.28,
        radius: 120,
        hits: 0,
        maxHits: 3,
        reward: 500,
        popupText: "AZTEKEN-SONNENSCHEIBE! +500",
      });
      // Carved Stone Idol statue in foreground
      this.eggs.push({
        id: "stoneidol",
        x: 1880,
        y: screenHeight * 0.76,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 350,
        popupText: "GÖTZEN-STEINSTATUE! +350",
      });
      // Rainforest Cave Portal entrance
      this.eggs.push({
        id: "caveportal",
        x: 320,
        y: screenHeight * 0.58,
        radius: 110,
        hits: 0,
        maxHits: 1,
        reward: 400,
        popupText: "REGENWALD-HÖHLENPORTAL! +400",
      });
    } else if (theme === "medieval_fortress") {
      // Golden Bell on central main tower
      this.eggs.push({
        id: "mainbell",
        x: 720,
        y: screenHeight * 0.22,
        radius: 110,
        hits: 0,
        maxHits: 3,
        reward: 550,
        popupText: "HAUPTTURM-GLOCKE! +550",
      });
      // Waving Knight Banner on battlements
      this.eggs.push({
        id: "knightbanner",
        x: 1350,
        y: screenHeight * 0.35,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 400,
        popupText: "RITTER-BANNER! +400",
      });
      // Drawbridge Chain Mechanism
      this.eggs.push({
        id: "drawbridgechain",
        x: 770,
        y: screenHeight * 0.68,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 350,
        popupText: "ZUGBRÜCKEN-KETTE! +350",
      });
    } else if (theme === "military_base") {
      // Rotating Radar Dish Antenna
      this.eggs.push({
        id: "radar",
        x: 1100,
        y: screenHeight * 0.28,
        radius: 120,
        hits: 0,
        maxHits: 3,
        reward: 600,
        popupText: "RADAR-SCHÜSSEL! +600",
      });
      // Stealth Black Military Helicopter on Helipad
      this.eggs.push({
        id: "stealthcopter",
        x: 1850,
        y: screenHeight * 0.65,
        radius: 120,
        hits: 0,
        maxHits: 2,
        reward: 450,
        popupText: "TARNKAPPEN-HELIKOPTER! +450",
      });
      // Guard Watchtower Searchlight
      this.eggs.push({
        id: "watchtower",
        x: 1720,
        y: screenHeight * 0.25,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 400,
        popupText: "WACHTURM-SUCHSCHEINWERFER! +400",
      });
    } else if (theme === "atlantis") {
      // Poseidon's Trident
      this.eggs.push({
        id: "trident",
        x: 1720,
        y: screenHeight * 0.28,
        radius: 120,
        hits: 0,
        maxHits: 3,
        reward: 650,
        popupText: "POSEIDONS-DREIZACK! +650",
      });
      // Atlantis Treasure Chest
      this.eggs.push({
        id: "treasurechest",
        x: 520,
        y: screenHeight * 0.72,
        radius: 120,
        hits: 0,
        maxHits: 2,
        reward: 500,
        popupText: "ATLANTIS-SCHATZTRUHE! +500",
      });
      // Giant Clam Pearl
      this.eggs.push({
        id: "giantpearl",
        x: 220,
        y: screenHeight * 0.78,
        radius: 110,
        hits: 0,
        maxHits: 1,
        reward: 450,
        popupText: "RIESEN-MUSCHEL-PERLE! +450",
      });
    } else if (theme === "alpine_meadow") {
      // Golden Alpine Cowbell on grazing cow
      this.eggs.push({
        id: "cowbell",
        x: 720,
        y: screenHeight * 0.72,
        radius: 110,
        hits: 0,
        maxHits: 3,
        reward: 700,
        popupText: "ALM-KUHGLOCKE! +700",
      });
      // Alpine Summit Cross on mountain peak
      this.eggs.push({
        id: "summitcross",
        x: 1100,
        y: screenHeight * 0.22,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 500,
        popupText: "ALPEN-GIPFELKREUZ! +500",
      });
      // Alpine Chalet Chimney Smoke
      this.eggs.push({
        id: "chaletchimney",
        x: 1820,
        y: screenHeight * 0.38,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 450,
        popupText: "ALMHÜTTEN-SCHORNSTEIN! +450",
      });
    } else if (theme === "elven_kingdom") {
      // Giant glowing magic flower
      this.eggs.push({
        id: "magicflower",
        x: 400,
        y: screenHeight * 0.78,
        radius: 120,
        hits: 0,
        maxHits: 3,
        reward: 750,
        popupText: "ZAUBERBLÜTEN-GLOW! +750",
      });
      // Elven Crystal Waterfall
      this.eggs.push({
        id: "elfenwaterfall",
        x: 1080,
        y: screenHeight * 0.45,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 550,
        popupText: "ELFEN-KRISTALLFALL! +550",
      });
      // Treetop Palace Spire Golden Crown
      this.eggs.push({
        id: "canopypalace",
        x: 1760,
        y: screenHeight * 0.22,
        radius: 110,
        hits: 0,
        maxHits: 1,
        reward: 500,
        popupText: "BAUMKRONEN-KRISTALLKRONE! +500",
      });
    } else if (theme === "wild_west") {
      // Saloon swinging doors
      this.eggs.push({
        id: "saloondoor",
        x: 650,
        y: screenHeight * 0.58,
        radius: 110,
        hits: 0,
        maxHits: 3,
        reward: 800,
        popupText: "SALOON-FLÜGELTÜR! +800",
      });
      // Golden Sheriff Star Badge
      this.eggs.push({
        id: "sheriffstar",
        x: 1450,
        y: screenHeight * 0.35,
        radius: 100,
        hits: 0,
        maxHits: 2,
        reward: 600,
        popupText: "SHERIFF-STERN! +600",
      });
      // Prospector Gold Chest
      this.eggs.push({
        id: "goldchest",
        x: 1850,
        y: screenHeight * 0.75,
        radius: 110,
        hits: 0,
        maxHits: 1,
        reward: 550,
        popupText: "GOLDGRÄBER-SCHATZTRUHE! +550",
      });
    } else if (theme === "mars_colony") {
      // Glass Dome Habitat Plasma
      this.eggs.push({
        id: "domedisplay",
        x: 650,
        y: screenHeight * 0.42,
        radius: 120,
        hits: 0,
        maxHits: 3,
        reward: 850,
        popupText: "KUPPEL-ENERGIE-PLASMA! +850",
      });
      // Mars Rover Radar Dish
      this.eggs.push({
        id: "roverradar",
        x: 1380,
        y: screenHeight * 0.62,
        radius: 100,
        hits: 0,
        maxHits: 2,
        reward: 650,
        popupText: "MARS-ROVER-RADAR! +650",
      });
      // Solar Fusion Module
      this.eggs.push({
        id: "solarpanel",
        x: 1850,
        y: screenHeight * 0.6,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 600,
        popupText: "SOLAR-FUSIONS-MODUL! +600",
      });
    } else if (theme === "candy_planet") {
      // Gingerbread Castle / House
      this.eggs.push({
        id: "gingerbread",
        x: 650,
        y: screenHeight * 0.52,
        radius: 120,
        hits: 0,
        maxHits: 3,
        reward: 900,
        popupText: "LEBKUCHENHAUS-GLOCKE! +900",
      });
      // Giant Candy Cane Spiral
      this.eggs.push({
        id: "candycane",
        x: 1450,
        y: screenHeight * 0.38,
        radius: 100,
        hits: 0,
        maxHits: 2,
        reward: 700,
        popupText: "ZUCKERSTANGEN-WIRBEL! +700",
      });
      // Lemonade Geyser / River Splash
      this.eggs.push({
        id: "lemonadegyre",
        x: 1850,
        y: screenHeight * 0.72,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 650,
        popupText: "LIMONADEN-GEYSIR! +650",
      });
    } else if (theme === "night_fair") {
      // Illuminated Ferris Wheel Center
      this.eggs.push({
        id: "ferriswheel",
        x: 500,
        y: screenHeight * 0.45,
        radius: 120,
        hits: 0,
        maxHits: 3,
        reward: 1000,
        popupText: "RIESENRAD-LICHTERZAUBER! +1000",
      });
      // Popcorn Machine Stall
      this.eggs.push({
        id: "popcornstand",
        x: 1250,
        y: screenHeight * 0.65,
        radius: 100,
        hits: 0,
        maxHits: 2,
        reward: 750,
        popupText: "POPCORN-MASCHINEN-EXPLOSION! +750",
      });
      // Roller Coaster Loop Track
      this.eggs.push({
        id: "rollercoaster",
        x: 1850,
        y: screenHeight * 0.38,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 700,
        popupText: "ACHTERBAHN-NEONBLITZ! +700",
      });
    } else if (theme === "riverbank") {
      // Old Stone Arch Bridge
      this.eggs.push({
        id: "stonebridge",
        x: 1200,
        y: screenHeight * 0.45,
        radius: 120,
        hits: 0,
        maxHits: 3,
        reward: 1050,
        popupText: "STEINBOGENBRÜCKEN-GLOCKE! +1050",
      });
      // Grazing White Sheep
      this.eggs.push({
        id: "sheepsbell",
        x: 650,
        y: screenHeight * 0.72,
        radius: 100,
        hits: 0,
        maxHits: 2,
        reward: 800,
        popupText: "UFER-GLOCKENSCHAF! +800",
      });
      // River Ripple Splash
      this.eggs.push({
        id: "riverripple",
        x: 1850,
        y: screenHeight * 0.78,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 750,
        popupText: "FLUSS-WASSERFALL-BONUS! +750",
      });
    } else if (theme === "floating_islands") {
      // Steampunk Brass Windmill
      this.eggs.push({
        id: "steampunkwindmill",
        x: 650,
        y: screenHeight * 0.28,
        radius: 110,
        hits: 0,
        maxHits: 3,
        reward: 1100,
        popupText: "STEAMPUNK-WINDMÜHLE! +1100",
      });
      // Steam Engine Pressure Valve
      this.eggs.push({
        id: "steamengine",
        x: 1400,
        y: screenHeight * 0.42,
        radius: 100,
        hits: 0,
        maxHits: 2,
        reward: 850,
        popupText: "DAMPFMASCHINEN-VENTIL! +850",
      });
      // Cable Car Gondola
      this.eggs.push({
        id: "cablecar",
        x: 1000,
        y: screenHeight * 0.35,
        radius: 90,
        hits: 0,
        maxHits: 1,
        reward: 800,
        popupText: "SEILBAHN-GONDEL-BONUS! +800",
      });
    } else if (theme === "pirate_nest") {
      // 1. Pirate Tavern Skull Sign
      this.eggs.push({
        id: "tavernsign",
        x: 550,
        y: screenHeight * 0.38,
        radius: 110,
        hits: 0,
        maxHits: 3,
        reward: 1200,
        popupText: "TAVERNEN-TOTENKOPF-SCHILD! +1200",
      });
      // 2. Anchored Galleon Cannon Shot
      this.eggs.push({
        id: "galleoncannon",
        x: 1350,
        y: screenHeight * 0.42,
        radius: 100,
        hits: 0,
        maxHits: 2,
        reward: 950,
        popupText: "GALEONEN-KANONENSCHUSS! +950",
      });
      // 3. Treasure Island Chest
      this.eggs.push({
        id: "treasurechest",
        x: 2050,
        y: screenHeight * 0.68,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 900,
        popupText: "SCHATZINSEL-TRUHE! +900",
      });
    } else if (theme === "junkyard") {
      // 1. Industrial Crane Magnet
      this.eggs.push({
        id: "cranemagnet",
        x: 650,
        y: screenHeight * 0.28,
        radius: 110,
        hits: 0,
        maxHits: 3,
        reward: 1250,
        popupText: "INDUSTRIEKRAN-MAGNET! +1250",
      });
      // 2. Smoking Oil Barrel
      this.eggs.push({
        id: "oilbarrel",
        x: 1250,
        y: screenHeight * 0.68,
        radius: 100,
        hits: 0,
        maxHits: 2,
        reward: 950,
        popupText: "RAUCHENDES-ÖLFASS! +950",
      });
      // 3. Washing Machine Drum
      this.eggs.push({
        id: "washingmachine",
        x: 1950,
        y: screenHeight * 0.72,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 900,
        popupText: "WASCHMASCHINEN-TROMMEL! +900",
      });
    } else if (theme === "autumn_orchard") {
      // 1. Red Tractor Horn
      this.eggs.push({
        id: "tractor",
        x: 1800,
        y: screenHeight * 0.48,
        radius: 110,
        hits: 0,
        maxHits: 3,
        reward: 1300,
        popupText: "TRAKTOR-HUPE! +1300",
      });
      // 2. Apple Harvest Crates
      this.eggs.push({
        id: "applecrates",
        x: 2000,
        y: screenHeight * 0.75,
        radius: 100,
        hits: 0,
        maxHits: 2,
        reward: 1000,
        popupText: "HOLZKISTEN-APFELRAUSCH! +1000",
      });
      // 3. Autumn Leaf Pile Swirl
      this.eggs.push({
        id: "leafpile",
        x: 600,
        y: screenHeight * 0.78,
        radius: 110,
        hits: 0,
        maxHits: 1,
        reward: 950,
        popupText: "LAUBHAUFEN-WIRBEL! +950",
      });
    } else if (theme === "cyberpunk") {
      // 1. Cyber-Cafe Neon Sign
      this.eggs.push({
        id: "cybercafesign",
        x: 350,
        y: screenHeight * 0.25,
        radius: 110,
        hits: 0,
        maxHits: 3,
        reward: 1350,
        popupText: "CYBER-CAFE NEONSCHILD! +1350",
      });
      // 2. Flying Speeder / Taxi
      this.eggs.push({
        id: "flyingtaxi",
        x: 1450,
        y: screenHeight * 0.22,
        radius: 100,
        hits: 0,
        maxHits: 2,
        reward: 1100,
        popupText: "SPEEDER-FLUGTAXI! +1100",
      });
      // 3. Street Level Ramen Bar
      this.eggs.push({
        id: "ramenbar",
        x: 750,
        y: screenHeight * 0.55,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 950,
        popupText: "RAMEN-BAR-BONUS! +950",
      });
    } else if (theme === "enchanted_forest") {
      // 1. Ancient Treehouse Lantern
      this.eggs.push({
        id: "treehouselantern",
        x: 1850,
        y: screenHeight * 0.28,
        radius: 110,
        hits: 0,
        maxHits: 3,
        reward: 1400,
        popupText: "BAUMHAUS-LATERNE! +1400",
      });
      // 2. Bioluminescent Mushroom Cluster
      this.eggs.push({
        id: "glowingmushroom",
        x: 2100,
        y: screenHeight * 0.78,
        radius: 100,
        hits: 0,
        maxHits: 2,
        reward: 1150,
        popupText: "LEUCHT-PILZ-ZAUBER! +1150",
      });
      // 3. Floating Wisp Irrlicht
      this.eggs.push({
        id: "floatingwisp",
        x: 450,
        y: screenHeight * 0.32,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 1000,
        popupText: "SCHWEBENDES-IRRLICHT! +1000",
      });
    } else if (theme === "savannah") {
      // 1. Burning Sun in Haze
      this.eggs.push({
        id: "burningsun",
        x: 1200,
        y: screenHeight * 0.26,
        radius: 120,
        hits: 0,
        maxHits: 3,
        reward: 1500,
        popupText: "BRENNENDE SONNE! +1500",
      });
      // 2. Acacia Tree Bird Nest
      this.eggs.push({
        id: "acacianest",
        x: 350,
        y: screenHeight * 0.45,
        radius: 100,
        hits: 0,
        maxHits: 2,
        reward: 1200,
        popupText: "AKAZIENBAUM-VOGELNEST! +1200",
      });
      // 3. Zebra & Giraffe Migration Herd
      this.eggs.push({
        id: "savannahherd",
        x: 1850,
        y: screenHeight * 0.65,
        radius: 110,
        hits: 0,
        maxHits: 1,
        reward: 1000,
        popupText: "ZEBRA & GIRAFFEN-HERDE! +1000",
      });
    } else if (theme === "graveyard") {
      // 1. Full Moon Glow
      this.eggs.push({
        id: "fullmoon",
        x: 1320,
        y: screenHeight * 0.25,
        radius: 120,
        hits: 0,
        maxHits: 3,
        reward: 1600,
        popupText: "DER GROSSE VOLLMOND! +1600",
      });
      // 2. Weathered Angel Statue
      this.eggs.push({
        id: "angelstatue",
        x: 1850,
        y: screenHeight * 0.52,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 1300,
        popupText: "VERWITTERTE ENGELSSTATUE! +1300",
      });
      // 3. Crooked Tombstone Ghost
      this.eggs.push({
        id: "tombstoneghost",
        x: 450,
        y: screenHeight * 0.72,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 1100,
        popupText: "SCHIEFER GRABSTEIN-GEIST! +1100",
      });
    } else if (theme === "harbor") {
      // 1. Giant Gantry Container Crane
      this.eggs.push({
        id: "gantrycrane",
        x: 650,
        y: screenHeight * 0.28,
        radius: 120,
        hits: 0,
        maxHits: 3,
        reward: 1700,
        popupText: "RIESIGER CONTAINERKRAN! +1700",
      });
      // 2. Cargo Ship Foghorn
      this.eggs.push({
        id: "cargoship",
        x: 1750,
        y: screenHeight * 0.52,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 1400,
        popupText: "FRACHTSCHIFF-NEBELHORN! +1400",
      });
      // 3. Colorful Container Stack
      this.eggs.push({
        id: "containerstack",
        x: 350,
        y: screenHeight * 0.72,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 1150,
        popupText: "BUNTER CONTAINER-STAPEL! +1150",
      });
    } else if (theme === "arcade") {
      // 1. Glittering Disco Ball
      this.eggs.push({
        id: "discoball",
        x: 1200,
        y: screenHeight * 0.16,
        radius: 120,
        hits: 0,
        maxHits: 3,
        reward: 1800,
        popupText: "GLITZERNDE DISKOKUGEL! +1800",
      });
      // 2. Flashing Arcade Cabinet
      this.eggs.push({
        id: "arcadecabinet",
        x: 1750,
        y: screenHeight * 0.55,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 1500,
        popupText: "BLINKENDER ARCADE-AUTOMAT! +1500",
      });
      // 3. Retro Wall Neon Sign
      this.eggs.push({
        id: "neonsign",
        x: 450,
        y: screenHeight * 0.28,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 1200,
        popupText: "RETRO-NEONRÖHRE! +1200",
      });
    } else if (theme === "clock_canyon") {
      // 1. Giant Grandfather Clock
      this.eggs.push({
        id: "grandfatherclock",
        x: 1850,
        y: screenHeight * 0.45,
        radius: 120,
        hits: 0,
        maxHits: 3,
        reward: 1900,
        popupText: "RIESIGE STANDUHR! +1900",
      });
      // 2. Floating Dali Pendulum
      this.eggs.push({
        id: "dalipendulum",
        x: 1200,
        y: screenHeight * 0.35,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 1600,
        popupText: "SCHWEBENDES DALI-PENDEL! +1600",
      });
      // 3. Brass Cog Wheel
      this.eggs.push({
        id: "brasscog",
        x: 350,
        y: screenHeight * 0.72,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 1250,
        popupText: "MESSING-ZAHNRAD! +1250",
      });
    } else if (theme === "arctic") {
      // 1. Arctic Snow Igloo
      this.eggs.push({
        id: "igloo",
        x: 1850,
        y: screenHeight * 0.72,
        radius: 120,
        hits: 0,
        maxHits: 3,
        reward: 2000,
        popupText: "ARKTISCHES IGLU! +2000",
      });
      // 2. Waddling Penguin
      this.eggs.push({
        id: "penguin",
        x: 450,
        y: screenHeight * 0.76,
        radius: 100,
        hits: 0,
        maxHits: 2,
        reward: 1700,
        popupText: "VORBEIMARSCHIERENDER PINGUIN! +1700",
      });
      // 3. Floating Ice Floe
      this.eggs.push({
        id: "icefloe",
        x: 1100,
        y: screenHeight * 0.68,
        radius: 110,
        hits: 0,
        maxHits: 1,
        reward: 1300,
        popupText: "TREIBENDE EISSCHOLLE! +1300",
      });
    } else if (theme === "haunted_manor") {
      // 1. Stormy Lightning Flash
      this.eggs.push({
        id: "lightning",
        x: 1200,
        y: screenHeight * 0.2,
        radius: 120,
        hits: 0,
        maxHits: 3,
        reward: 2100,
        popupText: "ZUCKENDER WETTERBLITZ! +2100",
      });
      // 2. Overgrown Ivy Spire Tower
      this.eggs.push({
        id: "ivytower",
        x: 1750,
        y: screenHeight * 0.45,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 1800,
        popupText: "SPUKHAUS-EFEUTURM! +1800",
      });
      // 3. Broken Stained Window
      this.eggs.push({
        id: "brokenwindow",
        x: 550,
        y: screenHeight * 0.55,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 1400,
        popupText: "ZERBROCHENES SCHLOSSFENSTER! +1400",
      });
    } else if (theme === "rooftop_garden") {
      // 1. Skyline Cocktail Bar
      this.eggs.push({
        id: "cocktailbar",
        x: 350,
        y: screenHeight * 0.48,
        radius: 120,
        hits: 0,
        maxHits: 3,
        reward: 2200,
        popupText: "SKYLINE-COCKTAIL-BAR! +2200",
      });
      // 2. Rooftop Sunbed Deckchair
      this.eggs.push({
        id: "sunbed",
        x: 1250,
        y: screenHeight * 0.72,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 1900,
        popupText: "DACHTERRASSE-LIEGESTUHL! +1900",
      });
      // 3. Exotic Potted Plant
      this.eggs.push({
        id: "flowerpot",
        x: 1850,
        y: screenHeight * 0.75,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 1500,
        popupText: "EXOTISCHER BLUMENTOPF! +1500",
      });
    } else if (theme === "drive_in_cinema") {
      // 1. Giant Outdoor Movie Screen
      this.eggs.push({
        id: "moviescreen",
        x: 1000,
        y: screenHeight * 0.35,
        radius: 120,
        hits: 0,
        maxHits: 3,
        reward: 2300,
        popupText: "KINO-LEINWAND FLICKER-BONUS! +2300",
      });
      // 2. Neon 50s Snackbar / Diner
      this.eggs.push({
        id: "snackbar",
        x: 2000,
        y: screenHeight * 0.62,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 2000,
        popupText: "NEON-SNACKBAR POPCORN-BONUS! +2000",
      });
      // 3. 50s Classic Oldtimer Car
      this.eggs.push({
        id: "classiccar",
        x: 600,
        y: screenHeight * 0.82,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 1600,
        popupText: "50er OLDTIMER TAILFIN-BONUS! +1600",
      });
    } else if (theme === "crystal_cave") {
      // 1. Giant Glowing Crystal Geode Cluster
      this.eggs.push({
        id: "giantcrystal",
        x: 1350,
        y: screenHeight * 0.58,
        radius: 120,
        hits: 0,
        maxHits: 3,
        reward: 2400,
        popupText: "RIESEN-KRISTALL-GEODE! +2400",
      });
      // 2. Ceiling Hanging Stalactite
      this.eggs.push({
        id: "stalactite",
        x: 650,
        y: screenHeight * 0.25,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 2100,
        popupText: "STALAKTITEN-ECHO-BONUS! +2100",
      });
      // 3. Glowing Underground Crystal Lake
      this.eggs.push({
        id: "crystallake",
        x: 2050,
        y: screenHeight * 0.72,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 1700,
        popupText: "KRISTALLSEE-REFLEXION! +1700",
      });
    } else if (theme === "grand_canyon") {
      // 1. Canyon Eagle's Nest on Pinnacle
      this.eggs.push({
        id: "eaglesnest",
        x: 500,
        y: screenHeight * 0.58,
        radius: 120,
        hits: 0,
        maxHits: 3,
        reward: 2500,
        popupText: "CANYON-ADLERHORST-BONUS! +2500",
      });
      // 2. Colorado River Winding Bend
      this.eggs.push({
        id: "coloradoriver",
        x: 1250,
        y: screenHeight * 0.78,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 2200,
        popupText: "COLORADO-RIVER-STRÖMUNG! +2200",
      });
      // 3. Canyon Skywalk Glass Observation Deck
      this.eggs.push({
        id: "skywalkplateau",
        x: 1900,
        y: screenHeight * 0.58,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 1800,
        popupText: "SKYWALK-PLATEAU-AUSSICHT! +1800",
      });
    } else if (theme === "ghost_ship") {
      // 1. Spectral Cannon on Deck
      this.eggs.push({
        id: "ghostcannon",
        x: 1800,
        y: screenHeight * 0.75,
        radius: 120,
        hits: 0,
        maxHits: 3,
        reward: 2600,
        popupText: "GEISTER-KANONENSCHUSS! +2600",
      });
      // 2. Cursed Ghost Ship Wheel
      this.eggs.push({
        id: "shipwheel",
        x: 880,
        y: screenHeight * 0.7,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 2300,
        popupText: "VERFLUCHTES STEUERRAD! +2300",
      });
      // 3. Glowing Ghost Lantern on Mast
      this.eggs.push({
        id: "ghostlantern",
        x: 1280,
        y: screenHeight * 0.28,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 1900,
        popupText: "GEISTERLATERNE-SCHIMMER! +1900",
      });
    } else if (theme === "construction_site") {
      // 1. Giant Yellow Tower Crane Jib
      this.eggs.push({
        id: "towercrane",
        x: 1650,
        y: screenHeight * 0.18,
        radius: 120,
        hits: 0,
        maxHits: 3,
        reward: 2700,
        popupText: "TURMDREHKRAN-BONUS! +2700",
      });
      // 2. Rotating Orange Cement Mixer
      this.eggs.push({
        id: "cementmixer",
        x: 550,
        y: screenHeight * 0.72,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 2400,
        popupText: "BETONMISCHER-DREHUNG! +2400",
      });
      // 3. Pneumatic Jackhammer on Steel Beam
      this.eggs.push({
        id: "jackhammer",
        x: 1950,
        y: screenHeight * 0.78,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 2000,
        popupText: "PRESSLUFTHAMMER-SCHLAG! +2000",
      });
    } else if (theme === "western_mine") {
      // 1. Gold Ore Cart on Rails
      this.eggs.push({
        id: "minecart",
        x: 550,
        y: screenHeight * 0.76,
        radius: 120,
        hits: 0,
        maxHits: 3,
        reward: 2800,
        popupText: "GOLDLOREN-ROLLEN! +2800",
      });
      // 2. Wooden Conveyor Belt Flywheel
      this.eggs.push({
        id: "conveyor",
        x: 1700,
        y: screenHeight * 0.45,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 2500,
        popupText: "FÖRDERBAND-SCHWUNGRAD! +2500",
      });
      // 3. TNT Dynamite Crate
      this.eggs.push({
        id: "dynamite",
        x: 1050,
        y: screenHeight * 0.78,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 2100,
        popupText: "DYNAMITKISTEN-EXPLOSION! +2100",
      });
    } else if (theme === "toy_box") {
      // 1. Wooden Toy Train Locomotive
      this.eggs.push({
        id: "toytrain",
        x: 1000,
        y: screenHeight * 0.7,
        radius: 120,
        hits: 0,
        maxHits: 3,
        reward: 2900,
        popupText: "HOLZ-MODELLEISENBAHN! +2900",
      });
      // 2. Stacked Wooden Block Castle Tower
      this.eggs.push({
        id: "blocktower",
        x: 400,
        y: screenHeight * 0.55,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 2600,
        popupText: "BAUKLOTZTUM-EINSTURZ! +2600",
      });
      // 3. Cardboard Hanging Cloud Cutout
      this.eggs.push({
        id: "cardboardcloud",
        x: 1750,
        y: screenHeight * 0.22,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 2200,
        popupText: "PAPP-WOLKENKULISSE! +2200",
      });
    } else if (theme === "bamboo_valley") {
      // 1. Traditional Asian Pagoda Temple
      this.eggs.push({
        id: "pagoda",
        x: 1800,
        y: screenHeight * 0.35,
        radius: 120,
        hits: 0,
        maxHits: 3,
        reward: 3000,
        popupText: "PAGODEN-TEMPEL-BONUS! +3000",
      });
      // 2. Red Arched Moon Bridge over Koi Pond
      this.eggs.push({
        id: "koibridge",
        x: 950,
        y: screenHeight * 0.65,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 2700,
        popupText: "KOI-TEICH-BRÜCKE! +2700",
      });
      // 3. Dense Bamboo Forest Stalks
      this.eggs.push({
        id: "bamboogrove",
        x: 450,
        y: screenHeight * 0.52,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 2300,
        popupText: "BAMBUS-HAIN-RAUSCHEN! +2300",
      });
    } else if (theme === "vampire_castle") {
      // 1. Imposing Gothic Castle Spires
      this.eggs.push({
        id: "vampireturret",
        x: 900,
        y: screenHeight * 0.28,
        radius: 120,
        hits: 0,
        maxHits: 3,
        reward: 3100,
        popupText: "GOTISCHER-SCHLOSSTURM-BONUS! +3100",
      });
      // 2. Flying Vampiric Bat Swarm
      this.eggs.push({
        id: "batswarm",
        x: 1850,
        y: screenHeight * 0.22,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 2800,
        popupText: "FLEDERMAUSSCHWARM-FLATTERN! +2800",
      });
      // 3. Carpathian Misty Pine Forest
      this.eggs.push({
        id: "pineforest",
        x: 400,
        y: screenHeight * 0.72,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 2400,
        popupText: "KARPATEN-NEBELWALD! +2400",
      });
    } else if (theme === "subway_station") {
      // 1. Einfahrender U-Bahn-Zug
      this.eggs.push({
        id: "subwaytrain",
        x: 1750,
        y: screenHeight * 0.65,
        radius: 120,
        hits: 0,
        maxHits: 3,
        reward: 3200,
        popupText: "EINFAHRENDER U-BAHN-ZUG! +3200",
      });
      // 2. Leuchtende Werbetafel
      this.eggs.push({
        id: "billboard",
        x: 850,
        y: screenHeight * 0.35,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 2900,
        popupText: "LEUCHTENDE WERBETAFEL! +2900",
      });
      // 3. U-Bahn-Gleis-Signal
      this.eggs.push({
        id: "subwaysignal",
        x: 350,
        y: screenHeight * 0.58,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 2500,
        popupText: "U-BAHN-GLEIS-SIGNAL! +2500",
      });
    } else if (theme === "cloud_castle") {
      // 1. Goldenes Wolkentor
      this.eggs.push({
        id: "goldengate",
        x: 1200,
        y: screenHeight * 0.45,
        radius: 120,
        hits: 0,
        maxHits: 3,
        reward: 3300,
        popupText: "GOLDENES WOLKENTOR! +3300",
      });
      // 2. Erleuchteter Regenbogen
      this.eggs.push({
        id: "rainbowarch",
        x: 600,
        y: screenHeight * 0.3,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 3000,
        popupText: "ERLEUCHTETER REGENBOGEN! +3000",
      });
      // 3. Wolkenturm-Spitze
      this.eggs.push({
        id: "cloudturret",
        x: 1800,
        y: screenHeight * 0.35,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 2600,
        popupText: "WOLKENTURM-SPITZE! +2600",
      });
    } else if (theme === "mystic_mangrove") {
      // 1. Verschlungene Mangrovenwurzel
      this.eggs.push({
        id: "mangroveroot",
        x: 1450,
        y: screenHeight * 0.65,
        radius: 120,
        hits: 0,
        maxHits: 3,
        reward: 3400,
        popupText: "VERSCHLUNGENE MANGROVENWURZEL! +3400",
      });
      // 2. Sumpfiges Irrlicht
      this.eggs.push({
        id: "swamplantern",
        x: 750,
        y: screenHeight * 0.42,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 3100,
        popupText: "SUMPFIGES IRRLICHT! +3100",
      });
      // 3. Versunkene Ruinensteine
      this.eggs.push({
        id: "mangroveruins",
        x: 300,
        y: screenHeight * 0.72,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 2700,
        popupText: "VERSUNKENE RUINENSTEINE! +2700",
      });
    } else if (theme === "outer_space") {
      // 1. Vorbeifliegendes Raumschiff
      this.eggs.push({
        id: "spaceshuttle",
        x: 1200,
        y: screenHeight * 0.68,
        radius: 120,
        hits: 0,
        maxHits: 3,
        reward: 3500,
        popupText: "VORBEIFLIEGENDES RAUMSCHIFF! +3500",
      });
      // 2. Andromeda-Spiralgalaxie
      this.eggs.push({
        id: "andromedanebula",
        x: 1720,
        y: screenHeight * 0.38,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 3200,
        popupText: "ANDROMEDA-GALAXIE! +3200",
      });
      // 3. Schwebende Raumstation
      this.eggs.push({
        id: "spacestation",
        x: 450,
        y: screenHeight * 0.3,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 2800,
        popupText: "SCHWEBENDE RAUMSTATION! +2800",
      });
    } else if (theme === "colosseum_arena") {
      // 1. Gladiatoren-Goldhelm
      this.eggs.push({
        id: "gladiatorhelmet",
        x: 520,
        y: screenHeight * 0.82,
        radius: 80,
        hits: 0,
        maxHits: 3,
        reward: 3600,
        popupText: "GLADIATOREN-GOLDHELM! +3600",
      });
      // 2. Kaiserliche Loge
      this.eggs.push({
        id: "imperialbox",
        x: 1200,
        y: screenHeight * 0.4,
        radius: 95,
        hits: 0,
        maxHits: 2,
        reward: 3300,
        popupText: "KAISERLICHE LOGE! +3300",
      });
      // 3. Marmor-Ehrensäule
      this.eggs.push({
        id: "marblecolumn",
        x: 1880,
        y: screenHeight * 0.45,
        radius: 85,
        hits: 0,
        maxHits: 1,
        reward: 2900,
        popupText: "MARMOR-EHRENSÄULE! +2900",
      });
    } else if (theme === "ski_resort") {
      // 1. Schneekanone-Power
      this.eggs.push({
        id: "snowcannon",
        x: 440,
        y: screenHeight * 0.72,
        radius: 85,
        hits: 0,
        maxHits: 3,
        reward: 3700,
        popupText: "SCHNEEKANONE-POWER! +3700",
      });
      // 2. Sessellift-Gondel
      this.eggs.push({
        id: "chairlift",
        x: 1350,
        y: screenHeight * 0.28,
        radius: 75,
        hits: 0,
        maxHits: 2,
        reward: 3400,
        popupText: "SESSELLIFT-GONDEL! +3400",
      });
      // 3. Skihütten-Kamin
      this.eggs.push({
        id: "skihut",
        x: 1920,
        y: screenHeight * 0.52,
        radius: 95,
        hits: 0,
        maxHits: 1,
        reward: 3000,
        popupText: "SKIHÜTTEN-KAMIN! +3000",
      });
    } else if (theme === "iceland_geysir") {
      // 1. Riesen-Geysir Eruption
      this.eggs.push({
        id: "giantgeysir",
        x: 1200,
        y: screenHeight * 0.4,
        radius: 110,
        hits: 0,
        maxHits: 3,
        reward: 3800,
        popupText: "RIESEN-GEYSIR ERUPTION! +3800",
      });
      // 2. Heiße Schwefelquelle
      this.eggs.push({
        id: "hotspring",
        x: 1450,
        y: screenHeight * 0.74,
        radius: 95,
        hits: 0,
        maxHits: 2,
        reward: 3500,
        popupText: "HEISSE SCHWEFELQUELLE! +3500",
      });
      // 3. Moosiger Basaltfelsen
      this.eggs.push({
        id: "basaltcolumns",
        x: 2050,
        y: screenHeight * 0.65,
        radius: 85,
        hits: 0,
        maxHits: 1,
        reward: 3100,
        popupText: "MOOSIGER BASALTFELSEN! +3100",
      });
    } else if (theme === "giant_bakery") {
      // 1. Riesen-Mehlsack-Explosion
      this.eggs.push({
        id: "floursacks",
        x: 960,
        y: screenHeight * 0.78,
        radius: 95,
        hits: 0,
        maxHits: 3,
        reward: 3900,
        popupText: "MEHLSACK-EXPLOSION! +3900",
      });
      // 2. Glühender Backofen
      this.eggs.push({
        id: "glowingoven",
        x: 480,
        y: screenHeight * 0.48,
        radius: 105,
        hits: 0,
        maxHits: 2,
        reward: 3600,
        popupText: "GLÜHENDER BACKOFEN! +3600",
      });
      // 3. Teigkessel-Rührwerk
      this.eggs.push({
        id: "doughvat",
        x: 1420,
        y: screenHeight * 0.62,
        radius: 95,
        hits: 0,
        maxHits: 1,
        reward: 3200,
        popupText: "TEIGKESSEL-RÜHRWERK! +3200",
      });
    } else if (theme === "arcade_chip") {
      // 1. Hochleistungs-Prozessor (CPU Overclock)
      this.eggs.push({
        id: "cpu_overclock",
        x: 820,
        y: screenHeight * 0.36,
        radius: 105,
        hits: 0,
        maxHits: 3,
        reward: 4000,
        popupText: "CPU OVERCLOCK ÜBERLASTUNG! +4000",
      });
      // 2. Glühender Riesen-Kondensator
      this.eggs.push({
        id: "giant_capacitor",
        x: 1880,
        y: screenHeight * 0.54,
        radius: 95,
        hits: 0,
        maxHits: 2,
        reward: 3700,
        popupText: "KONDENSATOR-ENTLADUNG! +3700",
      });
      // 3. Quanten-Datenbus
      this.eggs.push({
        id: "quantum_bus",
        x: 1360,
        y: screenHeight * 0.72,
        radius: 90,
        hits: 0,
        maxHits: 1,
        reward: 3300,
        popupText: "QUANTEN-DATENBUS TURBO! +3300",
      });
    } else if (theme === "sakura_park") {
      // 1. Traditionelle rote Brücke (Taiko-bashi)
      this.eggs.push({
        id: "red_bridge",
        x: 1420,
        y: screenHeight * 0.65,
        radius: 105,
        hits: 0,
        maxHits: 2,
        reward: 4100,
        popupText: "ROTE MONDBRÜCKE! +4100",
      });
      // 2. Uralte Steinlaterne (Toro)
      this.eggs.push({
        id: "stone_lantern",
        x: 320,
        y: screenHeight * 0.7,
        radius: 90,
        hits: 0,
        maxHits: 1,
        reward: 3800,
        popupText: "ERLEUCHTETE STEINLATERNE! +3800",
      });
      // 3. Goldener Kaiser-Koi im Teich
      this.eggs.push({
        id: "golden_koi",
        x: 1720,
        y: screenHeight * 0.82,
        radius: 85,
        hits: 0,
        maxHits: 1,
        reward: 3400,
        popupText: "GOLDENER KAISER-KOI! +3400",
      });
    } else if (theme === "formula1_track") {
      // 1. F1-Startampel über der Geraden
      this.eggs.push({
        id: "f1_start_lights",
        x: 880,
        y: screenHeight * 0.26,
        radius: 100,
        hits: 0,
        maxHits: 2,
        reward: 4200,
        popupText: "LIGHTS OUT AND AWAY WE GO! +4200",
      });
      // 2. Vorbeizischender Bolide
      this.eggs.push({
        id: "f1_race_car",
        x: 1560,
        y: screenHeight * 0.74,
        radius: 105,
        hits: 0,
        maxHits: 1,
        reward: 3900,
        popupText: "SCHNELLSTE RUNDE! +3900",
      });
      // 3. Reifenstapel-Schikane
      this.eggs.push({
        id: "f1_tire_barrier",
        x: 200,
        y: screenHeight * 0.82,
        radius: 95,
        hits: 0,
        maxHits: 1,
        reward: 3500,
        popupText: "REIFENSTAPEL BOUNCER! +3500",
      });
    } else if (theme === "coral_reef_lowtide") {
      // 1. Riesiger Sonnen-Seestern im Gezeitentümpel
      this.eggs.push({
        id: "sun_starfish",
        x: 420,
        y: screenHeight * 0.82,
        radius: 95,
        hits: 0,
        maxHits: 1,
        reward: 4300,
        popupText: "GOLDENER SONNEN-SEESTERN! +4300",
      });
      // 2. Perlen-Riesenmuschel
      this.eggs.push({
        id: "giant_clam",
        x: 1780,
        y: screenHeight * 0.76,
        radius: 95,
        hits: 0,
        maxHits: 2,
        reward: 4000,
        popupText: "PERLEN-RIESENMUSCHEL! +4000",
      });
      // 3. Kreischende Küstenmöwe
      this.eggs.push({
        id: "coastal_seagull",
        x: 880,
        y: screenHeight * 0.22,
        radius: 85,
        hits: 0,
        maxHits: 1,
        reward: 3600,
        popupText: "KREISCHENDE KÜSTENMÖWE! +3600",
      });
    } else if (theme === "artist_studio") {
      // 1. Meisterwerk auf der Staffelei
      this.eggs.push({
        id: "easel_masterpiece",
        x: 1080,
        y: screenHeight * 0.52,
        radius: 100,
        hits: 0,
        maxHits: 2,
        reward: 4400,
        popupText: "MEISTERWERK VOLLENDET! +4400",
      });
      // 2. Antike Marmor-Büste
      this.eggs.push({
        id: "marble_bust",
        x: 520,
        y: screenHeight * 0.44,
        radius: 90,
        hits: 0,
        maxHits: 1,
        reward: 4100,
        popupText: "ANTIKER MARMOR-KLASSIKER! +4100",
      });
      // 3. Bunte Farbpalette mit Pinseln
      this.eggs.push({
        id: "paint_palette",
        x: 500,
        y: screenHeight * 0.88,
        radius: 95,
        hits: 0,
        maxHits: 1,
        reward: 3700,
        popupText: "FARBSPRITZER-FEUERWERK! +3700",
      });
    } else if (theme === "pixel_desert") {
      // 1. Blockiger 8-Bit Kaktus
      this.eggs.push({
        id: "pixel_cactus",
        x: 420,
        y: screenHeight * 0.65,
        radius: 95,
        hits: 0,
        maxHits: 1,
        reward: 4500,
        popupText: "8-BIT PIXEL-KAKTUS! +4500",
      });
      // 2. Pixelige Retro-Sonne
      this.eggs.push({
        id: "pixel_sun",
        x: 1400,
        y: screenHeight * 0.24,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 4200,
        popupText: "RETRO BLOCK-SONNE! +4200",
      });
      // 3. Geheimnisvoller Retro-Block
      this.eggs.push({
        id: "pixel_mystery_box",
        x: 1560,
        y: screenHeight * 0.8,
        radius: 90,
        hits: 0,
        maxHits: 1,
        reward: 3800,
        popupText: "GEHEIMER RETRO-BLOCK! +3800",
      });
    } else if (theme === "giza_pyramids") {
      // 1. Pyramiden von Gizeh
      this.eggs.push({
        id: "giza_great_pyramid",
        x: 680,
        y: screenHeight * 0.35,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 4600,
        popupText: "MYSTERIUM DER PYRAMIDEN! +4600",
      });
      // 2. Große Sphinx-Statue
      this.eggs.push({
        id: "giza_sphinx_statue",
        x: 1100,
        y: screenHeight * 0.42,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 4300,
        popupText: "DAS RÄTSEL DER SPHINX! +4300",
      });
      // 3. Uralte Hieroglyphen-Wand
      this.eggs.push({
        id: "giza_hieroglyph_wall",
        x: 1560,
        y: screenHeight * 0.5,
        radius: 110,
        hits: 0,
        maxHits: 1,
        reward: 3900,
        popupText: "URALTE HIEROGLYPHEN ENTHÜLLT! +3900",
      });
    } else if (theme === "soccer_stadium") {
      // 1. Tornetz ins Kreuzeck
      this.eggs.push({
        id: "stadium_goal_net",
        x: 160,
        y: screenHeight * 0.76,
        radius: 105,
        hits: 0,
        maxHits: 2,
        reward: 4700,
        popupText: "TOR-KREUZECK! TOR DES MONATS! +4700",
      });
      // 2. Riesiger Flutlichtmast
      this.eggs.push({
        id: "stadium_floodlight",
        x: 1750,
        y: screenHeight * 0.2,
        radius: 110,
        hits: 0,
        maxHits: 1,
        reward: 4300,
        popupText: "FLUTLICHT-POWER! +4300",
      });
      // 3. Meisterpokal an der Trainerbank
      this.eggs.push({
        id: "stadium_dugout_trophy",
        x: 1400,
        y: screenHeight * 0.88,
        radius: 95,
        hits: 0,
        maxHits: 1,
        reward: 4000,
        popupText: "MEISTERPOKAL ENTHÜLLT! +4000",
      });
    } else if (theme === "prairie_tornado") {
      // 1. Auge des Tornados
      this.eggs.push({
        id: "tornado_vortex",
        x: 680,
        y: screenHeight * 0.42,
        radius: 120,
        hits: 0,
        maxHits: 2,
        reward: 4800,
        popupText: "IM AUGE DES TORNADOS! +4800",
      });
      // 2. Sturm-Windrad
      this.eggs.push({
        id: "prairie_windmill",
        x: 1120,
        y: screenHeight * 0.55,
        radius: 95,
        hits: 0,
        maxHits: 1,
        reward: 4400,
        popupText: "STURM-WINDRAD DREHT DURCH! +4400",
      });
      // 3. Wetterhahn der Scheune
      this.eggs.push({
        id: "prairie_barn_weathercock",
        x: 1540,
        y: screenHeight * 0.65,
        radius: 110,
        hits: 0,
        maxHits: 1,
        reward: 4000,
        popupText: "WETTERHAHN ENTFLOGEN! +4000",
      });
    } else if (theme === "retro_living_room") {
      // 1. Vintage-Röhrenfernseher
      this.eggs.push({
        id: "retro_crt_tv",
        x: 1650,
        y: screenHeight * 0.4,
        radius: 100,
        hits: 0,
        maxHits: 2,
        reward: 4600,
        popupText: "RÖHRENFERNSEHER EINGESCHALTET! +4600",
      });
      // 2. Drehender Plattenspieler
      this.eggs.push({
        id: "vinyl_turntable",
        x: 1880,
        y: screenHeight * 0.44,
        radius: 90,
        hits: 0,
        maxHits: 1,
        reward: 4200,
        popupText: "70ER GROOVY PLATTE DREHT SICH! +4200",
      });
      // 3. Knisterndes Kaminfeuer
      this.eggs.push({
        id: "cozy_fireplace",
        x: 320,
        y: screenHeight * 0.6,
        radius: 110,
        hits: 0,
        maxHits: 1,
        reward: 3900,
        popupText: "KAMINFEUER KNISTERT GEMÜTLICH! +3900",
      });
    } else if (theme === "comic_drawing_board") {
      // 1. Auslaufendes Tintenfass (2 Treffer)
      this.eggs.push({
        id: "comic_ink_jar",
        x: 480,
        y: screenHeight * 0.74,
        radius: 100,
        hits: 0,
        maxHits: 2,
        reward: 4800,
        popupText: "TINTENFASS EXPLODIERT! +4800",
      });
      // 2. Riesen-Radiergummi (1 Treffer)
      this.eggs.push({
        id: "comic_giant_eraser",
        x: 1820,
        y: screenHeight * 0.76,
        radius: 95,
        hits: 0,
        maxHits: 1,
        reward: 4300,
        popupText: "RADIERGUMMI RADIERT ALLES WEG! +4300",
      });
      // 3. Comic-Sprechblase mit 'POW!' (1 Treffer)
      this.eggs.push({
        id: "comic_speech_bubble",
        x: 1280,
        y: screenHeight * 0.28,
        radius: 105,
        hits: 0,
        maxHits: 1,
        reward: 4000,
        popupText: "POW! COMIC-SPRECHBLASE! +4000",
      });
    } else if (theme === "venice_canals") {
      // 1. Verzierte Rialto-Fußgängerbrücke (2 Treffer)
      this.eggs.push({
        id: "venice_bridge",
        x: 1250,
        y: screenHeight * 0.45,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 4900,
        popupText: "RIALTO-BRÜCKE ERLEUCHTET! +4900",
      });
      // 2. Venezianische Gondel am Holzpfahl (1 Treffer)
      this.eggs.push({
        id: "venice_gondola",
        x: 520,
        y: screenHeight * 0.78,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 4400,
        popupText: "GONDEL-SERENADE! O SOLE MIO! +4400",
      });
      // 3. Historischer Palazzo-Balkon (1 Treffer)
      this.eggs.push({
        id: "venice_palazzo_balcony",
        x: 1880,
        y: screenHeight * 0.38,
        radius: 95,
        hits: 0,
        maxHits: 1,
        reward: 4100,
        popupText: "PALAZZO-BALKON BLUMENZAUBER! +4100",
      });
    } else if (theme === "skatepark") {
      // 1. Riesen-Beton-Halfpipe (2 Treffer)
      this.eggs.push({
        id: "skate_halfpipe",
        x: 1100,
        y: screenHeight * 0.68,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 5000,
        popupText: "HALFPIPE 900-SPIN TRICK! +5000",
      });
      // 2. Graffiti-Mural-Wand (1 Treffer)
      this.eggs.push({
        id: "skate_graffiti_wall",
        x: 420,
        y: screenHeight * 0.44,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 4500,
        popupText: "GRAFFITI MASTERPIECE! +4500",
      });
      // 3. Grind-Rail mit Skateboard (1 Treffer)
      this.eggs.push({
        id: "skate_rail",
        x: 1820,
        y: screenHeight * 0.72,
        radius: 95,
        hits: 0,
        maxHits: 1,
        reward: 4200,
        popupText: "KICKFLIP BOARD-SLIDE! +4200",
      });
    } else if (theme === "aurora_borealis") {
      // 1. Polarlicht-Schleier (2 Treffer)
      this.eggs.push({
        id: "aurora_sky_curtain",
        x: 1200,
        y: screenHeight * 0.22,
        radius: 120,
        hits: 0,
        maxHits: 2,
        reward: 5100,
        popupText: "AURORA BOREALIS FLACKERT! +5100",
      });
      // 2. Beleuchtetes Schnee-Iglu (1 Treffer)
      this.eggs.push({
        id: "aurora_igloo",
        x: 480,
        y: screenHeight * 0.75,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 4600,
        popupText: "WARMES IGLU-FEUER! +4600",
      });
      // 3. Verschneite Polartanne mit Rentier (1 Treffer)
      this.eggs.push({
        id: "aurora_pine_reindeer",
        x: 1880,
        y: screenHeight * 0.65,
        radius: 95,
        hits: 0,
        maxHits: 1,
        reward: 4300,
        popupText: "SKANDINAVISCHES RENTIER! +4300",
      });
    } else if (theme === "mad_scientist_lab") {
      // 1. Riesige Tesla-Spule (2 Treffer)
      this.eggs.push({
        id: "lab_tesla_coil",
        x: 650,
        y: screenHeight * 0.42,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 5200,
        popupText: "TESLA-BLITZENTLADUNG! +5200",
      });
      // 2. Blubberndes Reagenzglas & Giftflasche (1 Treffer)
      this.eggs.push({
        id: "lab_bubbling_flask",
        x: 1250,
        y: screenHeight * 0.72,
        radius: 95,
        hits: 0,
        maxHits: 1,
        reward: 4700,
        popupText: "GIFTGRÜNE CHEMIE-EXPLOSION! +4700",
      });
      // 3. Frankenstein-Hauptschalter (1 Treffer)
      this.eggs.push({
        id: "lab_power_switch",
        x: 1850,
        y: screenHeight * 0.55,
        radius: 90,
        hits: 0,
        maxHits: 1,
        reward: 4400,
        popupText: "FRANKENSTEIN-STROMSTOSS! +4400",
      });
    } else if (theme === "taj_mahal") {
      // 1. Taj-Mahal-Marmorkuppel (2 Treffer)
      this.eggs.push({
        id: "taj_mahal_dome",
        x: 1200,
        y: screenHeight * 0.32,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 5300,
        popupText: "WEISSE MARMORKUPPEL ERSTRAHLT! +5300",
      });
      // 2. Spiegelndes Wasserbecken (1 Treffer)
      this.eggs.push({
        id: "taj_mahal_reflecting_pool",
        x: 1200,
        y: screenHeight * 0.78,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 4800,
        popupText: "LOTUS-WASSER-SPIEGELUNG! +4800",
      });
      // 3. Exotischer Lotus-Garten (1 Treffer)
      this.eggs.push({
        id: "taj_mahal_lotus_garden",
        x: 480,
        y: screenHeight * 0.7,
        radius: 95,
        hits: 0,
        maxHits: 1,
        reward: 4500,
        popupText: "INDISCHE LOTUSBLÜTE! +4500",
      });
    } else if (theme === "hanging_gardens_babylon") {
      // 1. Babylonischer Stufen-Wasserfall (2 Treffer)
      this.eggs.push({
        id: "babylon_waterfall",
        x: 1200,
        y: screenHeight * 0.54,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 5400,
        popupText: "PLÄTSCHERNDER TERRASSEN-WASSERFALL! +5400",
      });
      // 2. Antikes Ziegelrelief-Tor (1 Treffer)
      this.eggs.push({
        id: "babylon_ishtar_gate",
        x: 580,
        y: screenHeight * 0.65,
        radius: 95,
        hits: 0,
        maxHits: 1,
        reward: 4900,
        popupText: "BLAUES ISHTAR-ZIEGELTOR ERSTRAHLT! +4900",
      });
      // 3. Hängende Königspalmen & Oase (1 Treffer)
      this.eggs.push({
        id: "babylon_hanging_palms",
        x: 1820,
        y: screenHeight * 0.4,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 4600,
        popupText: "HÄNGENDE GÄRTEN DER SEMIRAMIS! +4600",
      });
    } else if (theme === "zeus_statue_olympia") {
      // 1. Goldener Zeus-Blitzkeil (2 Treffer)
      this.eggs.push({
        id: "zeus_lightning_bolt",
        x: 1200,
        y: screenHeight * 0.35,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 5500,
        popupText: "GÖTTLICHER ZEUS-BLITZKEIL! +5500",
      });
      // 2. Kolossaler Elfenbeinthron (1 Treffer)
      this.eggs.push({
        id: "zeus_golden_throne",
        x: 1200,
        y: screenHeight * 0.68,
        radius: 105,
        hits: 0,
        maxHits: 1,
        reward: 5000,
        popupText: "ELFENBEIN- & GOLDTHRON ERSTRAHLT! +5000",
      });
      // 3. Olympische Sieger-Nike (1 Treffer)
      this.eggs.push({
        id: "zeus_nike_statue",
        x: 1420,
        y: screenHeight * 0.42,
        radius: 95,
        hits: 0,
        maxHits: 1,
        reward: 4700,
        popupText: "OLYMPISCHE SIEGER-NIKE! +4700",
      });
    } else if (theme === "lighthouse_alexandria") {
      // 1. Loderndes Leuchtfeuer an der Turmspitze (2 Treffer)
      this.eggs.push({
        id: "alexandria_beacon_fire",
        x: 1200,
        y: screenHeight * 0.22,
        radius: 105,
        hits: 0,
        maxHits: 2,
        reward: 5600,
        popupText: "LODERNDES LEUCHTFEUER VON ALEXANDRIA! +5600",
      });
      // 2. Mächtiger Pharos-Turm (1 Treffer)
      this.eggs.push({
        id: "alexandria_pharos_tower",
        x: 1200,
        y: screenHeight * 0.48,
        radius: 110,
        hits: 0,
        maxHits: 1,
        reward: 5100,
        popupText: "MÄCHTIGER PHAROS-TURM ERSTRAHLT! +5100",
      });
      // 3. Antike Mittelmeer-Galeere / Trireme (1 Treffer)
      this.eggs.push({
        id: "alexandria_trireme_ship",
        x: 550,
        y: screenHeight * 0.68,
        radius: 95,
        hits: 0,
        maxHits: 1,
        reward: 4800,
        popupText: "ANTIKE MITTELMEER-GALEERE! +4800",
      });
    } else if (theme === "colossus_rhodes") {
      // 1. Strahlendes Helios-Sonnendiadem (2 Treffer)
      this.eggs.push({
        id: "rhodes_sun_diadem",
        x: 1200,
        y: screenHeight * 0.22,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 5700,
        popupText: "STRAHLENDES HELIOS-SONNENDIADEM! +5700",
      });
      // 2. Lodernde Koloss-Fackel (1 Treffer)
      this.eggs.push({
        id: "rhodes_torch_flame",
        x: 1380,
        y: screenHeight * 0.28,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 5200,
        popupText: "LODERNDE KOLOSS-FACKEL! +5200",
      });
      // 3. Rhodisches Hafenboot (1 Treffer)
      this.eggs.push({
        id: "rhodes_harbor_boat",
        x: 1200,
        y: screenHeight * 0.72,
        radius: 95,
        hits: 0,
        maxHits: 1,
        reward: 4900,
        popupText: "RHODISCHES HAFENBOOT! +4900",
      });
    } else if (theme === "mausoleum_halicarnassus") {
      // 1. Pyramiden-Quadriga von Mausolos (2 Treffer)
      this.eggs.push({
        id: "halicarnassus_pyramid_quadriga",
        x: 1200,
        y: screenHeight * 0.22,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 5800,
        popupText: "PYRAMIDEN-QUADRIGA VON MAUSOLOS! +5800",
      });
      // 2. Amazonen-Relieffries (1 Treffer)
      this.eggs.push({
        id: "halicarnassus_amazon_frieze",
        x: 1200,
        y: screenHeight * 0.58,
        radius: 105,
        hits: 0,
        maxHits: 1,
        reward: 5300,
        popupText: "AMAZONEN-MARMORFRIES ERSTRAHLT! +5300",
      });
      // 3. Mausolos-Marmorstatue (1 Treffer)
      this.eggs.push({
        id: "halicarnassus_mausolos_statue",
        x: 880,
        y: screenHeight * 0.48,
        radius: 95,
        hits: 0,
        maxHits: 1,
        reward: 4900,
        popupText: "KÖNIGLICHE MAUSOLOS-STATUE! +4900",
      });
    } else if (theme === "artemis_temple_ephesus") {
      // 1. Kultstatue der Artemis von Ephesos (2 Treffer)
      this.eggs.push({
        id: "artemis_cult_statue",
        x: 1200,
        y: screenHeight * 0.42,
        radius: 105,
        hits: 0,
        maxHits: 2,
        reward: 5900,
        popupText: "KULTSTATUE DER ARTEMIS VON EPHESOS! +5900",
      });
      // 2. Opulenter Opferaltar (1 Treffer)
      this.eggs.push({
        id: "artemis_sacrificial_altar",
        x: 1200,
        y: screenHeight * 0.72,
        radius: 105,
        hits: 0,
        maxHits: 1,
        reward: 5400,
        popupText: "OPULENTER HEILIGER ARTEMIS-ALTAR! +5400",
      });
      // 3. Skulptierte Marmorsäule / Columna Caelata (1 Treffer)
      this.eggs.push({
        id: "artemis_column_frieze",
        x: 740,
        y: screenHeight * 0.52,
        radius: 95,
        hits: 0,
        maxHits: 1,
        reward: 5000,
        popupText: "SKULPTIERTE MARMORSÄULE (COLUMNA CAELATA)! +5000",
      });
    } else if (theme === "chichen_itza") {
      // 1. Gefiederte Schlange Kukulkan auf der Pyramide (2 Treffer)
      this.eggs.push({
        id: "kukulkan_feathered_serpent",
        x: 1200,
        y: screenHeight * 0.28,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 6000,
        popupText: "GEFIEDERTE SCHLANGE KUKULKAN! +6000",
      });
      // 2. Steinerner Schlangenkopf an der Treppenbasis (1 Treffer)
      this.eggs.push({
        id: "chichen_serpent_head_stair",
        x: 1050,
        y: screenHeight * 0.68,
        radius: 95,
        hits: 0,
        maxHits: 1,
        reward: 5500,
        popupText: "STEINERNER SCHLANGENKOPF DER MAYA! +5500",
      });
      // 3. Heiliger Quetzal-Vogel im dichten Dschungel (1 Treffer)
      this.eggs.push({
        id: "chichen_jungle_quetzal",
        x: 420,
        y: screenHeight * 0.44,
        radius: 90,
        hits: 0,
        maxHits: 1,
        reward: 5100,
        popupText: "HEILIGER QUETZAL-DSCHUNGELVOGEL! +5100",
      });
    } else if (theme === "christ_redeemer_rio") {
      // 1. Segnende Hand von Christus (2 Treffer)
      this.eggs.push({
        id: "rio_christ_blessing_hand",
        x: 1390,
        y: screenHeight * 0.32,
        radius: 105,
        hits: 0,
        maxHits: 2,
        reward: 6100,
        popupText: "SEGNENDE HAND VON CHRISTUS! +6100",
      });
      // 2. Zuckerhut-Seilbahn (Bondinho do Pão de Açúcar) (1 Treffer)
      this.eggs.push({
        id: "rio_sugarloaf_cable_car",
        x: 1880,
        y: screenHeight * 0.44,
        radius: 95,
        hits: 0,
        maxHits: 1,
        reward: 5600,
        popupText: "ZUCKERHUT-SEILBAHN (BONDINHO)! +5600",
      });
      // 3. Corcovado-Aussichtsplattform & Panorama (1 Treffer)
      this.eggs.push({
        id: "rio_corcovado_viewpoint",
        x: 1200,
        y: screenHeight * 0.72,
        radius: 110,
        hits: 0,
        maxHits: 1,
        reward: 5200,
        popupText: "CORCOVADO-AUSSICHTSPLATTFORM! +5200",
      });
    } else if (theme === "great_wall_china") {
      // 1. Kaiserlicher Signalfeuerturm auf dem Bergkamm (2 Treffer)
      this.eggs.push({
        id: "great_wall_beacon_tower",
        x: 1220,
        y: screenHeight * 0.35,
        radius: 105,
        hits: 0,
        maxHits: 2,
        reward: 6200,
        popupText: "KAISERLICHER SIGNALFEUERTURM ENTFACHT! +6200",
      });
      // 2. Goldener Drachen-Wachturm am Gebirgspass (1 Treffer)
      this.eggs.push({
        id: "great_wall_dragon_watchtower",
        x: 1850,
        y: screenHeight * 0.42,
        radius: 95,
        hits: 0,
        maxHits: 1,
        reward: 5700,
        popupText: "GOLDENER DRACHEN-WACHTURM DER MAUER! +5700",
      });
      // 3. Uraltes Mauer-Zickzack-Tor im Bergnebel (1 Treffer)
      this.eggs.push({
        id: "great_wall_zigzag_gate",
        x: 540,
        y: screenHeight * 0.58,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 5300,
        popupText: "MYSTISCHES ZICKZACK-MAUERTOR! +5300",
      });
    } else if (theme === "machu_picchu") {
      // 1. Sonnentempel von Machu Picchu (Torreón) (2 Treffer)
      this.eggs.push({
        id: "machu_sun_temple",
        x: 1240,
        y: screenHeight * 0.46,
        radius: 105,
        hits: 0,
        maxHits: 2,
        reward: 6300,
        popupText: "HEILIGER SONNENTEMPEL DER INKA! +6300",
      });
      // 2. Heiliger Intihuatana-Sonnensitz (1 Treffer)
      this.eggs.push({
        id: "machu_intihuatana_stone",
        x: 720,
        y: screenHeight * 0.38,
        radius: 95,
        hits: 0,
        maxHits: 1,
        reward: 5800,
        popupText: "INTIHUATANA-STEIN DER SONNENWENDE! +5800",
      });
      // 3. Terrassen-Inka-Lama (1 Treffer)
      this.eggs.push({
        id: "machu_terrace_llama",
        x: 1720,
        y: screenHeight * 0.64,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 5400,
        popupText: "FLAUSCHIGES INKA-TERRASSEN-LAMA! +5400",
      });
    } else if (theme === "petra_jordan") {
      // 1. Al-Khazneh Urne des Pharao auf dem Tholos (2 Treffer)
      this.eggs.push({
        id: "petra_pharaoh_urn",
        x: 1210,
        y: screenHeight * 0.28,
        radius: 105,
        hits: 0,
        maxHits: 2,
        reward: 6400,
        popupText: "AL-KHAZNEH URNE DES PHARAO! +6400",
      });
      // 2. Geheime Felsengrab-Krypta im Felsportal (1 Treffer)
      this.eggs.push({
        id: "petra_secret_tomb",
        x: 1720,
        y: screenHeight * 0.65,
        radius: 95,
        hits: 0,
        maxHits: 1,
        reward: 5900,
        popupText: "GEHEIME NABATÄER-FELSENKRYPTA! +5900",
      });
      // 3. Wüstenbeduinen-Dromedar am Siq (1 Treffer)
      this.eggs.push({
        id: "petra_bedouin_camel",
        x: 620,
        y: screenHeight * 0.7,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 5500,
        popupText: "TREUES BEDUINEN-WÜSTENDROMEDAR! +5500",
      });
    } else if (theme === "statue_of_liberty") {
      // 1. Goldene Freiheitsfackel hoch über New York (2 Treffer)
      this.eggs.push({
        id: "liberty_golden_torch",
        x: 1300,
        y: screenHeight * 0.18,
        radius: 105,
        hits: 0,
        maxHits: 2,
        reward: 6500,
        popupText: "ERLEUCHTET DIE WELT! GOLDENE FACKEL! +6500",
      });
      // 2. Gelb-orange Staten Island Fähre im Hafen (1 Treffer)
      this.eggs.push({
        id: "liberty_staten_ferry",
        x: 480,
        y: screenHeight * 0.72,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 6000,
        popupText: "STATEN ISLAND FÄHRE IM HAFEN! +6000",
      });
      // 3. Manhattan Skyline Wolkenkratzerspitze im Dunst (1 Treffer)
      this.eggs.push({
        id: "liberty_skyline_empire",
        x: 1820,
        y: screenHeight * 0.38,
        radius: 95,
        hits: 0,
        maxHits: 1,
        reward: 5600,
        popupText: "MANHATTAN EMPIRE SKYLINE SPITZE! +5600",
      });
    } else if (theme === "eiffel_tower_paris") {
      // 1. Goldener rotierender Leuchtturm an der Eiffelturm-Spitze (2 Treffer)
      this.eggs.push({
        id: "eiffel_summit_beacon",
        x: 1460,
        y: screenHeight * 0.15,
        radius: 105,
        hits: 0,
        maxHits: 2,
        reward: 6600,
        popupText: "EIFFELTURM-LEUCHTTURM AN DER SPITZE! +6600",
      });
      // 2. Romantisches Seine-Ausflugsboot / Bateau Mouche (1 Treffer)
      this.eggs.push({
        id: "eiffel_seine_bateau",
        x: 520,
        y: screenHeight * 0.74,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 6100,
        popupText: "PARISER SEINE-BATEAU MOUCHE! +6100",
      });
      // 3. Historische schmiedeeiserne Pariser Gaslaterne am Seine-Ufer (1 Treffer)
      this.eggs.push({
        id: "eiffel_paris_lamppost",
        x: 1840,
        y: screenHeight * 0.68,
        radius: 95,
        hits: 0,
        maxHits: 1,
        reward: 5700,
        popupText: "HISTORISCHE PARISER STRASSENLATERNE! +5700",
      });
    } else if (theme === "stonehenge") {
      // 1. Heiliger Druiden-Altarstein der Sonnenwende (2 Treffer)
      this.eggs.push({
        id: "stonehenge_altar_stone",
        x: 1200,
        y: screenHeight * 0.58,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 6700,
        popupText: "HEILIGER DRUIDEN-ALTARSTEIN ENTFACHT! +6700",
      });
      // 2. Megalithischer Deckstein (Trilithon-Lintel) (1 Treffer)
      this.eggs.push({
        id: "stonehenge_trilithon_lintel",
        x: 820,
        y: screenHeight * 0.38,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 6200,
        popupText: "MYSTISCHER MEGALITHEN-DECKSTEIN! +6200",
      });
      // 3. Keltischer Rabe im Nebel (1 Treffer)
      this.eggs.push({
        id: "stonehenge_celtic_raven",
        x: 1720,
        y: screenHeight * 0.42,
        radius: 95,
        hits: 0,
        maxHits: 1,
        reward: 5800,
        popupText: "KELTISCHER RABE IM NEBEL AUFGESTIEGEN! +5800",
      });
    } else if (theme === "leaning_tower_pisa") {
      // 1. Schiefe Glockenstube an der Turmspitze (2 Treffer)
      this.eggs.push({
        id: "pisa_belfry_summit",
        x: 1510,
        y: screenHeight * 0.16,
        radius: 105,
        hits: 0,
        maxHits: 2,
        reward: 6800,
        popupText: "SCHIEFE GLOCKENSTUBE AN DER TURMSPITZE! +6800",
      });
      // 2. Marmorkuppel des Doms zu Pisa (1 Treffer)
      this.eggs.push({
        id: "pisa_duomo_dome",
        x: 820,
        y: screenHeight * 0.52,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 6300,
        popupText: "MARMORKUPPEL DES DOMS ZU PISA! +6300",
      });
      // 3. Galileis legendäre Fallversuchs-Bronzekugel (1 Treffer)
      this.eggs.push({
        id: "pisa_galileo_cannonball",
        x: 1420,
        y: screenHeight * 0.44,
        radius: 95,
        hits: 0,
        maxHits: 1,
        reward: 5900,
        popupText: "GALILEIS HISTORISCHE FALLVERSUCHS-KUGEL! +5900",
      });
    } else if (theme === "easter_island_moai") {
      // 1. Zeremonieller Moai-Kopfschmuck Pukao (2 Treffer)
      this.eggs.push({
        id: "moai_pukao_topknot",
        x: 1200,
        y: screenHeight * 0.28,
        radius: 105,
        hits: 0,
        maxHits: 2,
        reward: 6900,
        popupText: "ROTER MOAI-PUKAO KOPFSCHMUCK ENTFACHT! +6900",
      });
      // 2. Geheimes Vogelmann-Petroglyph (Tangata Manu) (1 Treffer)
      this.eggs.push({
        id: "moai_birdman_petroglyph",
        x: 580,
        y: screenHeight * 0.62,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 6400,
        popupText: "MYSTISCHES VOGELMANN-PETROGLYPH! +6400",
      });
      // 3. Heilige Ahu-Tongariki Ahnen-Steinplattform (1 Treffer)
      this.eggs.push({
        id: "moai_ahu_altar_platform",
        x: 1820,
        y: screenHeight * 0.68,
        radius: 95,
        hits: 0,
        maxHits: 1,
        reward: 6000,
        popupText: "AHU-TONGARIKI AHNEN-STEINPLATTFORM! +6000",
      });
    } else if (theme === "tower_bridge_london") {
      // 1. Viktorianischer Turm-Glockenhelm (2 Treffer)
      this.eggs.push({
        id: "tower_bridge_north_turret",
        x: 940,
        y: screenHeight * 0.22,
        radius: 105,
        hits: 0,
        maxHits: 2,
        reward: 7000,
        popupText: "VIKTORIANISCHE TOWER-BRIDGE SPITZE! +7000",
      });
      // 2. Ikonischer roter Londoner Doppeldeckerbus (1 Treffer)
      this.eggs.push({
        id: "tower_bridge_red_bus",
        x: 1680,
        y: screenHeight * 0.62,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 6500,
        popupText: "ROTER LONDONER DOPPELDECKERBUS! +6500",
      });
      // 3. Historisches Brücken-Klapptriebwerk am Themsepfeiler (1 Treffer)
      this.eggs.push({
        id: "tower_bridge_bascule_engine",
        x: 1200,
        y: screenHeight * 0.72,
        radius: 95,
        hits: 0,
        maxHits: 1,
        reward: 6100,
        popupText: "HISTORISCHES THEMSETRIEBWERK AKTIVIERT! +6100",
      });
    } else if (theme === "grazer_uhrturm") {
      // 1. Großes Zifferblatt mit den berühmten vertauschten Zeigern (2 Treffer)
      this.eggs.push({
        id: "uhrturm_reversed_clock",
        x: 1200,
        y: screenHeight * 0.45,
        radius: 105,
        hits: 0,
        maxHits: 2,
        reward: 7100,
        popupText: "VERTAUSCHTE UHRZEIGER DES GRAZER UHRTURMS! +7100",
      });
      // 2. Historischer hölzerner Wehrgang-Erker unter der Dachkante (1 Treffer)
      this.eggs.push({
        id: "uhrturm_wooden_walkway",
        x: 920,
        y: screenHeight * 0.35,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 6600,
        popupText: "SCHLOSSBERG-WEHRGANG DER GRAZER BASTION! +6600",
      });
      // 3. Grazer Schlossberg-Hund & Steirischer Panther Wappen (1 Treffer)
      this.eggs.push({
        id: "uhrturm_castle_dog_panther",
        x: 1540,
        y: screenHeight * 0.65,
        radius: 95,
        hits: 0,
        maxHits: 1,
        reward: 6200,
        popupText: "DER LEGENDÄRE GRAZER SCHLOSSBERG-HUND! +6200",
      });
    } else if (theme === "im_weltall") {
      // 1. Geheimer außerirdischer UFO-Aufklärer im Kosmos (2 Treffer)
      this.eggs.push({
        id: "space_alien_scout",
        x: 820,
        y: screenHeight * 0.32,
        radius: 105,
        hits: 0,
        maxHits: 2,
        reward: 7200,
        popupText: "AUSSERIRDISCHER UFO-SCOUT GEKAPERT! +7200",
      });
      // 2. Glühender interstellarer Kometenschweif (1 Treffer)
      this.eggs.push({
        id: "space_blazing_comet",
        x: 1680,
        y: screenHeight * 0.28,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 6700,
        popupText: "GLÜHENDER INTERSTELLARER KOMET! +6700",
      });
      // 3. Funkelnder kosmischer Supernova-Pulsar (1 Treffer)
      this.eggs.push({
        id: "space_supernova_pulsar",
        x: 1200,
        y: screenHeight * 0.58,
        radius: 95,
        hits: 0,
        maxHits: 1,
        reward: 6300,
        popupText: "PULSIERENDE KOSMISCHE SUPERNOVA! +6300",
      });
    } else if (theme === "wien") {
      // 1. Stephansdom Südturm-Steffl (2 Treffer)
      this.eggs.push({
        id: "wien_stephansdom_steffl",
        x: 1100,
        y: screenHeight * 0.25,
        radius: 105,
        hits: 0,
        maxHits: 2,
        reward: 7300,
        popupText: "STEPHANSDOM SÜDTURM STEFFL! +7300",
      });
      // 2. Wiener Riesenrad im Prater (1 Treffer)
      this.eggs.push({
        id: "wien_riesenrad_gondel",
        x: 1720,
        y: screenHeight * 0.38,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 6800,
        popupText: "WIENER RIESENRAD IM PRATER! +6800",
      });
      // 3. Traditioneller Wiener Fiaker (1 Treffer)
      this.eggs.push({
        id: "wien_fiaker_kutsche",
        x: 620,
        y: screenHeight * 0.72,
        radius: 95,
        hits: 0,
        maxHits: 1,
        reward: 6400,
        popupText: "TRADITIONELLER WIENER FIAKER! +6400",
      });
    } else if (theme === "mohnblumen") {
      // 1. Goldene Abendsonne über dem Meer (2 Treffer)
      this.eggs.push({
        id: "mohnblumen_abendsonne",
        x: 775,
        y: screenHeight * 0.14,
        radius: 105,
        hits: 0,
        maxHits: 2,
        reward: 7400,
        popupText: "GOLDENE ABENDSONNE ÜBER DEM MEER! +7400",
      });
      // 2. Prachtvolle Riesen-Mohnblüte im Vordergrund (1 Treffer)
      this.eggs.push({
        id: "mohnblumen_riesen_bluete",
        x: 1350,
        y: screenHeight * 0.76,
        radius: 110,
        hits: 0,
        maxHits: 1,
        reward: 6900,
        popupText: "LEUCHTENDE RIESEN-MOHNBLÜTE! +6900",
      });
      // 3. Historischer Holzzaun am Feldweg (1 Treffer)
      this.eggs.push({
        id: "mohnblumen_holzzaun",
        x: 350,
        y: screenHeight * 0.72,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 6500,
        popupText: "RUSTIKALER HOLZZAUN AM MEERESWEG! +6500",
      });
    } else if (theme === "die_burg") {
      // 1. Hoher runder Bergfried-Hauptturm (2 Treffer)
      this.eggs.push({
        id: "burg_bergfried_turm",
        x: 1220,
        y: screenHeight * 0.22,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 7500,
        popupText: "HOHER RITTERLICHER BERGFRIED! +7500",
      });
      // 2. Festes Burgtor mit Zugbrücke & Zwillings-Türmen (1 Treffer)
      this.eggs.push({
        id: "burg_festes_tor",
        x: 1010,
        y: screenHeight * 0.64,
        radius: 105,
        hits: 0,
        maxHits: 1,
        reward: 7000,
        popupText: "BEFESTIGTES BURGTOR MIT ZUGBRÜCKE! +7000",
      });
      // 3. Mittelalterliche Steinbrücke über die Schlucht (1 Treffer)
      this.eggs.push({
        id: "burg_steinbruecke",
        x: 820,
        y: screenHeight * 0.85,
        radius: 95,
        hits: 0,
        maxHits: 1,
        reward: 6600,
        popupText: "HISTORISCHE STEINBRÜCKE ÜBER DIE SCHLUCHT! +6600",
      });
    } else if (theme === "toskana") {
      // 1. Toskanisches Steinhaus-Podere (2 Treffer)
      this.eggs.push({
        id: "toskana_steinhaus_podere",
        x: 860,
        y: screenHeight * 0.44,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 7600,
        popupText: "TRADITIONELLES TOSKANISCHES LANDGUT! +7600",
      });
      // 2. Schlanke Hügel-Zypressen (1 Treffer)
      this.eggs.push({
        id: "toskana_zypressen",
        x: 600,
        y: screenHeight * 0.42,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 7100,
        popupText: "MAJESTÄTISCHE TOSKANA-ZYPRESSEN! +7100",
      });
      // 3. Sonnenbeschienene Weinberge & Olivenhaine (1 Treffer)
      this.eggs.push({
        id: "toskana_weinberge",
        x: 1280,
        y: screenHeight * 0.62,
        radius: 105,
        hits: 0,
        maxHits: 1,
        reward: 6700,
        popupText: "SONNIGE WEINBERGE DES VAL D'ORCIA! +6700",
      });
    } else if (theme === "herbst") {
      // 1. Mächtige goldene Alteiche (2 Treffer)
      this.eggs.push({
        id: "herbst_goldene_eiche",
        x: 780,
        y: screenHeight * 0.38,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 7700,
        popupText: "PRACHTVOLLE GOLDENE ALTEICHE! +7700",
      });
      // 2. Kunterbunter raschelnder Laubhaufen (1 Treffer)
      this.eggs.push({
        id: "herbst_laubhaufen",
        x: 1350,
        y: screenHeight * 0.72,
        radius: 105,
        hits: 0,
        maxHits: 1,
        reward: 7200,
        popupText: "KUNTERBUNTER RASCHELNDER LAUBHAUFEN! +7200",
      });
      // 3. Herbstliches Waldpilz-Nest & Kastanien (1 Treffer)
      this.eggs.push({
        id: "herbst_pilznest",
        x: 420,
        y: screenHeight * 0.75,
        radius: 95,
        hits: 0,
        maxHits: 1,
        reward: 6800,
        popupText: "HERBSTLICHES WALDPILZ-NEST & KASTANIEN! +6800",
      });
    } else if (theme === "schneefall") {
      // 1. Verschneite Blockhütte mit Kaminrauch (2 Treffer)
      this.eggs.push({
        id: "schneefall_blockhuette",
        x: 920,
        y: screenHeight * 0.48,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 7800,
        popupText: "GEMÜTLICHE BLOCKHÜTTE IM SCHNEESTURM! +7800",
      });
      // 2. Lustiger Schneemann mit Zylinder & Möhrennase (1 Treffer)
      this.eggs.push({
        id: "schneefall_schneemann",
        x: 1380,
        y: screenHeight * 0.68,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 7300,
        popupText: "LUSTIGER SCHNEEMANN MIT ZYLINDER! +7300",
      });
      // 3. Glitzernde Eis-Kristall-Tanne (1 Treffer)
      this.eggs.push({
        id: "schneefall_kristalltanne",
        x: 540,
        y: screenHeight * 0.52,
        radius: 105,
        hits: 0,
        maxHits: 1,
        reward: 6900,
        popupText: "GLITZERNDE EIS-KRISTALL-TANNE! +6900",
      });
    } else if (theme === "china") {
      // 1. Kaiserliche Goldene Pagode (2 Treffer)
      this.eggs.push({
        id: "china_goldene_pagode",
        x: 880,
        y: screenHeight * 0.40,
        radius: 110,
        hits: 0,
        maxHits: 2,
        reward: 7900,
        popupText: "KAISERLICHE GOLDENE PAGODE! +7900",
      });
      // 2. Traditioneller Roter Lampion-Pavillon (1 Treffer)
      this.eggs.push({
        id: "china_lampion_pavillon",
        x: 1360,
        y: screenHeight * 0.62,
        radius: 100,
        hits: 0,
        maxHits: 1,
        reward: 7400,
        popupText: "TRADITIONELLER ROTER LAMPION-PAVILLON! +7400",
      });
      // 3. Uralte Steinkarst-Klippen & Bambus (1 Treffer)
      this.eggs.push({
        id: "china_karst_bambus",
        x: 480,
        y: screenHeight * 0.55,
        radius: 105,
        hits: 0,
        maxHits: 1,
        reward: 7000,
        popupText: "MYSTISCHE KARSTBERGE VON GUILIN! +7000",
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
      ctx.shadowColor = "#ffd700";
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
            y: egg.y,
          };
        } else {
          return {
            triggered: false,
            partial: true,
            x: egg.x,
            y: egg.y,
          };
        }
      }
    }
    return false;
  }
}
