// Core Game Loop & State Manager for Moorhuhn
import { soundEngine } from './audio.js';
import { GraphicsRenderer } from './graphics.js';
import { ParticleSystem } from './particles.js';
import { Chicken } from './chicken.js';
import { EasterEggManager } from './eastereggs.js';

export const LEVEL_CONFIGS = [
  { 
    id: 1, 
    name: 'Sommer auf dem Bauernhof', 
    theme: 'summer', 
    targetScore: 1700, 
    timeLimit: 100, 
    desc: 'Klassische Bauernhof-Wiese mit Windmühle',
    easterEggs: ['Windmühlen-Sturm (+200)', 'Vogelscheuche (+100)', 'Plumpsklo-Huhn (+75)']
  },
  { 
    id: 2, 
    name: 'Winter-Wunderland', 
    theme: 'winter', 
    targetScore: 2000, 
    timeLimit: 100, 
    desc: 'Verschneite Berge & Schneemann-Überraschungen',
    easterEggs: ['Schneemann-Bombe (+150)', 'Weihnachts-Huhn (+200)']
  },
  { 
    id: 3, 
    name: 'Tropischer Strand', 
    theme: 'beach', 
    targetScore: 2300, 
    timeLimit: 100, 
    desc: 'Sandstrand, Palmen & Meeresrauschen',
    easterEggs: ['Kokosnuss-Bonus (+120)', 'Flaschenpost (+100)']
  },
  { 
    id: 4, 
    name: 'Sonnige Waldlichtung', 
    theme: 'forest', 
    targetScore: 2600, 
    timeLimit: 100, 
    desc: 'Blühende Blumenwiese im Mittags-Sonnenschein & Schmetterlinge',
    easterEggs: ['Baumhöhlen-Eule (+125)', 'Zauberpilz (+80)']
  },
  { 
    id: 5, 
    name: 'Spukschloss bei Nacht', 
    theme: 'spooky', 
    targetScore: 2900, 
    timeLimit: 100, 
    desc: 'Gotisches Schloss, Vollmond & Geisterhühner',
    easterEggs: ['Geister-Beschwörung (+250)', 'Wetterhahn (+100)']
  },
  { 
    id: 6, 
    name: 'Wasser-Aquarium Welt', 
    theme: 'aquarium', 
    targetScore: 3200, 
    timeLimit: 100, 
    desc: 'Unterwasser-Aquarium mit Korallen, Taucherhühnern & Schatzkisten',
    easterEggs: ['Piraten-Schatz (+200)', 'Korallen-Huhn (+150)']
  },
  { 
    id: 7, 
    name: 'Großstadt Metropolis', 
    theme: 'city', 
    targetScore: 3500, 
    timeLimit: 100, 
    desc: 'Sonnige Skylines, Wolkenkratzer & Tauben-Schwärme am Mittag',
    easterEggs: ['Metropolis-Neon (+250)', 'Brücken-Licht (+150)']
  },
  { 
    id: 8, 
    name: 'Auf einer alten Farm', 
    theme: 'farm', 
    targetScore: 3800, 
    timeLimit: 100, 
    desc: 'Alte Scheune, Heuballen, Traktor & rustikales Bauernhof-Flair',
    easterEggs: ['Traktor-Motor (+225)', 'Heuhaufen-Huhn (+150)', 'Goldener Wetterhahn (+175)']
  },
  { 
    id: 9, 
    name: 'Königliche Ritterburg', 
    theme: 'castle', 
    targetScore: 4100, 
    timeLimit: 100, 
    desc: 'Mittelalterliche Ritterburg, Burgzinnen & romantisches Abendlicht',
    easterEggs: ['Burgtor-Glocke (+250)', 'Ritterrüstung-Bonus (+180)', 'Drachen-Wappen (+200)']
  },
  { 
    id: 10, 
    name: 'Geheimnisvolles Ägypten', 
    theme: 'egypt', 
    targetScore: 4400, 
    timeLimit: 100, 
    desc: 'Monumentale Pyramiden, Wüstensand, Pharaonen-Schätze & die Sphinx',
    easterEggs: ['Sphinx-Rätsel (+300)', 'Pyramiden-Spitze (+200)', 'Obelisken-Schatz (+250)']
  },
  { 
    id: 11, 
    name: 'Das Antike Rom', 
    theme: 'rome', 
    targetScore: 4700, 
    timeLimit: 100, 
    desc: 'Kolosseum, römische Säulen, Streitwagen & kaiserliche Triumphbögen',
    easterEggs: ['Kolosseum-Triumph (+350)', 'Caesar-Kranz (+220)', 'SPQR-Adler (+280)']
  },
  { 
    id: 12, 
    name: 'Das Gallische Dorf', 
    theme: 'gaul', 
    targetScore: 5000, 
    timeLimit: 100, 
    desc: 'Gallische Strohhütten, Zaubertrank-Kessel, Wildschweine & goldene Abendsonne',
    easterEggs: ['Zaubertrank-Kessel (+400)', 'Wildschwein-Spieß (+300)', 'Hütten-Menhir (+350)']
  },
  { 
    id: 13, 
    name: 'Anwesen der Goldenen Kaiserin', 
    theme: 'palace', 
    targetScore: 5300, 
    timeLimit: 100, 
    desc: 'Vor dem goldenen Palast, kaiserliche Gärten, goldene Statuen & königlicher Prunk',
    easterEggs: ['Kaiserin-Krone (+450)', 'Palast-Fountain (+350)', 'Goldene Phönix-Statue (+400)']
  },
  { 
    id: 14, 
    name: 'Die windige Moorlandschaft', 
    theme: 'moorland', 
    targetScore: 5600, 
    timeLimit: 100, 
    desc: 'Das klassische Setting mit sumpfigen Wasserlöchern, schilfgedeckten Hütte, verbogenen Knorrenbäumen und nebligen Dunstfeldern am Boden.',
    easterEggs: ['Schilfhütten-Rauch (+350)', 'Knorrenbaum-Eule (+250)', 'Sumpf-Irrlicht (+400)']
  },
  { 
    id: 15, 
    name: 'Das Drachen-Tal', 
    theme: 'dragon_valley', 
    targetScore: 5900, 
    timeLimit: 100, 
    desc: 'Eine raue Vulkanlandschaft mit rauchenden Kratern, Lavaströmen, riesigen Knochen im Gras und einer Drachenhöhle im Hintergrund.',
    easterEggs: ['Drachenhöhlen-Auge (+450)', 'Vulkan-Ausbruch (+350)', 'Dino-Skelett (+300)']
  },
  { 
    id: 16, 
    name: 'Die Dschungel-Ruine', 
    theme: 'jungle_ruins', 
    targetScore: 6200, 
    timeLimit: 100, 
    desc: 'Ein mystischer Regenwald mit bemoosten Pyramidenruinen, riesigen Lianen, Steinstatuen und geheimnisvollen Höhleneingängen (Golden Hour).',
    easterEggs: ['Azteken-Sonnenscheibe (+500)', 'Götzen-Steinstatue (+350)', 'Regenwald-Höhlenportal (+400)']
  },
  { 
    id: 17, 
    name: 'Die Ritterburg im Mittelalter', 
    theme: 'medieval_fortress', 
    targetScore: 6500, 
    timeLimit: 100, 
    desc: 'Eine imposante Festung mit hohen Mauern, Türmen, Zinnen, einem Burggraben und wehenden Flaggen im Wind (Golden Hour).',
    easterEggs: ['Hauptturm-Glocke (+550)', 'Ritter-Banner (+400)', 'Zugbrücken-Kette (+350)']
  },
  { 
    id: 18, 
    name: 'Die Geheime Militärbasis', 
    theme: 'military_base', 
    targetScore: 6800, 
    timeLimit: 100, 
    desc: 'Ein abgezäuntes Areal mit Radaranlagen, Baracken, riesigen Tarnkappen-Helikoptern und Wachtürmen (Mittagssonnenlicht).',
    easterEggs: ['Radar-Schüssel (+600)', 'Tarnkappen-Helikopter (+450)', 'Wachturm-Suchscheinwerfer (+400)']
  },
  { 
    id: 19, 
    name: 'Die Unterwasser-Kulisse (Atlantis)', 
    theme: 'atlantis', 
    targetScore: 7100, 
    timeLimit: 100, 
    desc: 'Korallenriffe, antike versunkene Säulengänge, Blasen, die nach oben steigen, und Taucher- & Fisch-Hühner in der versunkenen Stadt Atlantis.',
    easterEggs: ['Poseidons-Dreizack (+650)', 'Atlantis-Schatztruhe (+500)', 'Riesen-Muschel-Perle (+450)']
  },
  { 
    id: 20, 
    name: 'Die Sommer-Alm in den Alpen', 
    theme: 'alpine_meadow', 
    targetScore: 7400, 
    timeLimit: 100, 
    desc: 'Eine saftige Bergwiese mit grasenden Kühen, einer Holzhütte im Hintergrund und imposanten, schroffen Felsenmassiven (Tageslicht).',
    easterEggs: ['Alm-Kuhglocke (+700)', 'Alpen-Gipfelkreuz (+500)', 'Almhütten-Schornstein (+450)']
  },
  { 
    id: 21, 
    name: 'Das Elfen-Königreich', 
    theme: 'elven_kingdom', 
    targetScore: 7700, 
    timeLimit: 100, 
    desc: 'Eine verträumte Kulisse mit riesigen leuchtenden Blumen, Wasserfällen, die in kristallklare Seen stürzen, und filigranen Baumkronen-Palästen (Tageslicht).',
    easterEggs: ['Zauberblüten-Glow (+750)', 'Elfen-Kristallfall (+550)', 'Baumkronen-Kristallkrone (+500)']
  },
  { 
    id: 22, 
    name: 'Der wilde Westen', 
    theme: 'wild_west', 
    targetScore: 8000, 
    timeLimit: 100, 
    desc: 'Eine staubige Western-Main-Street mit Saloon, Sheriff-Büro, hölzernen Veranden, rollenden Steppenläufern & Kakteen (Mittagszeit).',
    easterEggs: ['Saloon-Flügeltür (+800)', 'Sheriff-Stern (+600)', 'Goldgräber-Schatztruhe (+550)']
  },
  { 
    id: 23, 
    name: 'Die Mars-Kolonie', 
    theme: 'mars_colony', 
    targetScore: 8300, 
    timeLimit: 100, 
    desc: 'Rote Felsenlandschaft, gläserne Kuppelbauten, futuristische Rover, Solarpanels und im Hintergrund der Sternenhimmel mit der Erde.',
    easterEggs: ['Kuppel-Energie-Plasma (+850)', 'Mars-Rover-Radar (+650)', 'Solar-Fusions-Modul (+600)']
  },
  { 
    id: 24, 
    name: 'Der Süßigkeiten-Planet', 
    theme: 'candy_planet', 
    targetScore: 8600, 
    timeLimit: 100, 
    desc: 'Eine komplett essbare Welt aus riesigen Zuckerstangen, Lebkuchenhäusern, schokoladenbraunen Hügeln und Flüssen aus Limonade.',
    easterEggs: ['Lebkuchenhaus-Glocke (+900)', 'Zuckerstangen-Wirbel (+700)', 'Limonaden-Geysir (+650)']
  },
  { 
    id: 25, 
    name: 'Der Jahrmarkt bei Nacht', 
    theme: 'night_fair', 
    targetScore: 8900, 
    timeLimit: 100, 
    desc: 'Bunte, blinkende Fahrgeschäfte (Riesenrad, Achterbahn), Popcorn-Stände, Lichterketten und eine ausgelassene, leicht schummrige Atmosphäre.',
    easterEggs: ['Riesenrad-Lichterzauber (+1000)', 'Popcorn-Maschinen-Explosion (+750)', 'Achterbahn-Neonblitz (+700)']
  },
  { 
    id: 26, 
    name: 'Das idyllische Flussufer', 
    theme: 'riverbank', 
    targetScore: 9200, 
    timeLimit: 100, 
    desc: 'Ein breiter Fluss, der sich durch die Landschaft schlängelt. Im Hintergrund eine alte Steinbogenbrücke und weidende Schafe am Ufer (Mittagszeit).',
    easterEggs: ['Steinbogenbrücken-Glocke (+1050)', 'Ufer-Glockenschaf (+800)', 'Fluss-Wasserfall-Bonus (+750)']
  },
  { 
    id: 27, 
    name: 'Die fliegenden Inseln', 
    theme: 'floating_islands', 
    targetScore: 9500, 
    timeLimit: 100, 
    desc: 'Mehrere kleine, in der Luft schwebende Landmassen, verbunden durch Ketten und Seilbahnen, mit Windmühlen und Dampfmaschinen (Mittag).',
    easterEggs: ['Steampunk-Windmühle (+1100)', 'Dampfmaschinen-Druckventil (+850)', 'Seilbahn-Gondel (+800)']
  },
  { 
    id: 28, 
    name: 'Das Piraten-Nest', 
    theme: 'pirate_nest', 
    targetScore: 9800, 
    timeLimit: 100, 
    desc: 'Ein karibischer Strand mit Palmen, einer Piraten-Taverne, ankernden Galeonen im Hintergrund und einer kleinen Schatzinsel.',
    easterEggs: ['Tavernen-Totenkopf-Schild (+1200)', 'Galeonen-Kanonenschuss (+950)', 'Schatzinsel-Truhe (+900)']
  },
  { 
    id: 29, 
    name: 'Das Schrottplatz-Chaos', 
    theme: 'junkyard', 
    targetScore: 10100, 
    timeLimit: 100, 
    desc: 'Ein riesiger Berg aus alten Autos, Waschmaschinen und Metallteilen, dazwischen rauchende Fässer und ein großer Industriekran im Hintergrund (Mittagssonnenlicht).',
    easterEggs: ['Industriekran-Magnet (+1250)', 'Rauchendes-Ölfass (+950)', 'Waschmaschinen-Trommel (+900)']
  },
  { 
    id: 30, 
    name: 'Der Obstgarten im Herbst', 
    theme: 'autumn_orchard', 
    targetScore: 10400, 
    timeLimit: 100, 
    desc: 'Ein herbstlicher Garten voller Apfelbäume, mit Holzkisten voller Ernte, einem Laubhaufen und einem alten Traktor im Hintergrund (Mittagssonne).',
    easterEggs: ['Traktor-Hupe (+1300)', 'Holzkisten-Apfelrausch (+1000)', 'Laubhaufen-Wirbel (+950)']
  },
  { 
    id: 31, 
    name: 'Die Cyberpunk-Metropole', 
    theme: 'cyberpunk', 
    targetScore: 10700, 
    timeLimit: 100, 
    desc: 'Eine nächtliche, neonbeleuchtete Großstadt voller Hologramme, fliegender Autos (Speeder) in den oberen Ebenen und regennassen Straßen.',
    easterEggs: ['Cyber-Cafe Neonschild (+1350)', 'Speeder-Flugtaxi (+1100)', 'Ramen-Bar-Bonus (+950)']
  },
  { 
    id: 32, 
    name: 'Der verwunschene Zauberwald', 
    theme: 'enchanted_forest', 
    targetScore: 11000, 
    timeLimit: 100, 
    desc: 'Uralte, knorrige Bäume mit leuchtenden Pilzen, mystischem Nebel, schwebenden Irrlichtern und kleinen Baumhäusern.',
    easterEggs: ['Baumhaus-Laterne (+1400)', 'Leucht-Pilz-Zauber (+1150)', 'Schwebendes-Irrlicht (+1000)']
  },
  { 
    id: 33, 
    name: 'Die afrikanische Savanne', 
    theme: 'savannah', 
    targetScore: 11300, 
    timeLimit: 100, 
    desc: 'Endlose Graslandschaften, vereinzelte Akazienbäume, eine brennende Sonne im Dunst, und im Hintergrund ziehen Zebras oder Giraffen vorbei.',
    easterEggs: ['Brennende Sonne (+1500)', 'Akazienbaum-Vogelnest (+1200)', 'Zebra & Giraffen-Herde (+1000)']
  },
  { 
    id: 34, 
    name: 'Der Friedhof im Mondlicht', 
    theme: 'graveyard', 
    targetScore: 11600, 
    timeLimit: 100, 
    desc: 'Ein schauriger Friedhof mit schiefen Grabsteinen, alten verwitterten Engelskulpturen, knorrigen kahlen Bäumen und einem großen Vollmond im Hintergrund.',
    easterEggs: ['Der Große Vollmond (+1600)', 'Verwitterte Engelsstatue (+1300)', 'Schiefer Grabstein-Geist (+1100)']
  },
  { 
    id: 35, 
    name: 'Der Hafen bei Nacht', 
    theme: 'harbor', 
    targetScore: 11900, 
    timeLimit: 100, 
    desc: 'Große Frachtschiffe, riesige Containerkräne, gestapelte bunte Container, Flutlichter und das Glitzern des Wassers im Hafenbecken.',
    easterEggs: ['Riesiger Containerkran (+1700)', 'Frachtschiff-Nebelhorn (+1400)', 'Bunter Container-Stapel (+1150)']
  },
  { 
    id: 36, 
    name: 'Die 80er-Jahre-Arcade-Halle', 
    theme: 'arcade', 
    targetScore: 12200, 
    timeLimit: 100, 
    desc: 'Ein buntes Retro-Interieur mit blinkenden Spielautomaten (Pixel-Optik), Neonröhren, Postern und Diskokugeln.',
    easterEggs: ['Glitzernde Diskokugel (+1800)', 'Blinkender Arcade-Automat (+1500)', 'Retro-Neonröhre (+1200)']
  },
  { 
    id: 37, 
    name: 'Der Uhren-Canyon', 
    theme: 'clock_canyon', 
    targetScore: 12500, 
    timeLimit: 100, 
    desc: 'Eine wüstenartige Landschaft, in der riesige antike Standuhren, Zahnräder und Pendel in der Landschaft verstreut liegen.',
    easterEggs: ['Riesige Standuhr (+1900)', 'Schwebendes Dali-Pendel (+1600)', 'Messing-Zahnrad (+1250)']
  },
  { 
    id: 38, 
    name: 'Die arktische Eislandschaft', 
    theme: 'arctic', 
    targetScore: 12800, 
    timeLimit: 100, 
    desc: 'Eine weiße Schneelandschaft mit riesigen Gletschern, treibenden Eisschollen, Iglus und herumlatschenden Pinguinen oder Eisbären.',
    easterEggs: ['Arktisches Iglu (+2000)', 'Vorbeimarschierender Pinguin (+1700)', 'Treibende Eisscholle (+1300)']
  },
  { 
    id: 39, 
    name: 'Das verwunschene Herrenhaus', 
    theme: 'haunted_manor', 
    targetScore: 13100, 
    timeLimit: 100, 
    desc: 'Ein altes, verlassenes viktorianisches Spukschloss mit zerbrochenen Fenstern, Efeu an den Wänden und zuckenden Blitzen am Himmel.',
    easterEggs: ['Zuckender Wetterblitz (+2100)', 'Spukhaus-Efeuturm (+1800)', 'Zerbrochenes Schlossfenster (+1400)']
  },
  { 
    id: 40, 
    name: 'Der urbane Dachgarten', 
    theme: 'rooftop_garden', 
    targetScore: 13400, 
    timeLimit: 100, 
    desc: 'Die Dachterrasse eines modernen Wolkenkratzers mit Liegestühlen, Blumentöpfen, einer Bar und dem Panorama einer glitzernden Großstadt bei Sonnenuntergang.',
    easterEggs: ['Skyline-Cocktail-Bar (+2200)', 'Dachterrasse-Liegestuhl (+1900)', 'Exotischer Blumentopf (+1500)']
  },
  { 
    id: 41, 
    name: 'Das Autokino der 50er', 
    theme: 'drive_in_cinema', 
    targetScore: 13700, 
    timeLimit: 100, 
    desc: 'Eine große Leinwand im Freien, davor parkende Oldtimer, ein beleuchtetes Kassenhäuschen und eine neonleuchtende Snackbar.',
    easterEggs: ['Große Kino-Leinwand (+2300)', 'Neonleuchtende Snackbar (+2000)', 'Classic 50s Oldtimer (+1600)']
  },
  { 
    id: 42, 
    name: 'Die Kristallhöhle', 
    theme: 'crystal_cave', 
    targetScore: 14000, 
    timeLimit: 100, 
    desc: 'Ein unterirdisches Wunderland voller riesiger, leuchtender Edelsteine, stalaktitischen Felsen und kristallklarem Wasser.',
    easterEggs: ['Riesen-Kristall-Geode (+2400)', 'Stalaktiten-Echo (+2100)', 'Kristallsee-Reflexion (+1700)']
  },
  { 
    id: 43, 
    name: 'Der Grand Canyon', 
    theme: 'grand_canyon', 
    targetScore: 14300, 
    timeLimit: 100, 
    desc: 'Gewaltige, rotbraune Felsenschluchten mit tiefen Abgründen, schroffen Felsvorsprüngen und einem Fluss ganz unten im Tal.',
    easterEggs: ['Canyon-Adlerhorst (+2500)', 'Colorado River Biegung (+2200)', 'Canyon-Skywalk Plateau (+1800)']
  },
  { 
    id: 44, 
    name: 'Das Geister-Piratenschiff', 
    theme: 'ghost_ship', 
    targetScore: 14600, 
    timeLimit: 100, 
    desc: 'Das Deck eines riesigen, verfluchten Segelschiffs bei Nacht, mit zerrissenen Segeln, Geisterlichtern und stürmischer See.',
    easterEggs: ['Geister-Schiffskanone (+2600)', 'Verfluchtes Steuerrad (+2300)', 'Geisterlaterne am Mast (+1900)']
  },
  { 
    id: 45, 
    name: 'Die Baustelle im Rohbau', 
    theme: 'construction_site', 
    targetScore: 14900, 
    timeLimit: 100, 
    desc: 'Stahlträger, Gerüste, Betonmischer, Kräne und offene Wände eines Hochhauses im Bau mit Blick auf den Stadtverkehr.',
    easterEggs: ['Turmdrehkran (+2700)', 'Betonmischer-Trommel (+2400)', 'Stahlträger-Presslufthammer (+2000)']
  },
  { 
    id: 46, 
    name: 'Die verlassene Western-Mine', 
    theme: 'western_mine', 
    targetScore: 15200, 
    timeLimit: 100, 
    desc: 'Ein verrosteter Lorengleis-Eingang in den Berg, alte Holzhütten, ein Förderband und staubiger Schotterboden.',
    easterEggs: ['Goldlore auf Schienen (+2800)', 'Förderband-Motor (+2500)', 'Dynamitkiste in der Mine (+2100)']
  },
  { 
    id: 47, 
    name: 'Der Spielzeug-Karton', 
    theme: 'toy_box', 
    targetScore: 15500, 
    timeLimit: 100, 
    desc: 'Eine Kulisse, die wie eine riesige Modelleisenbahn oder ein aus Pappe gebasteltes Kinderzimmer aussieht – mit Bauklötzen, Holzspielzeug und gemalten Wolken.',
    easterEggs: ['Holz-Modelleisenbahn (+2900)', 'Bunter Bauklotzturm (+2600)', 'Papp-Wolkenkulisse (+2200)']
  },
  { 
    id: 48, 
    name: 'Das Bambus-Tal in Asien', 
    theme: 'bamboo_valley', 
    targetScore: 15800, 
    timeLimit: 100, 
    desc: 'Dichte, grüne Bambuswälder, traditionelle Pagoden mit geschwungenen Dächern, kleine Brücken über Koi-Teiche und sanfter Nebel.',
    easterEggs: ['Asiatische Pagode (+3000)', 'Mondbrücke über Koi-Teich (+2700)', 'Bambus-Hain (+2300)']
  },
  { 
    id: 49, 
    name: 'Das Vampir-Schloss', 
    theme: 'vampire_castle', 
    targetScore: 16100, 
    timeLimit: 100, 
    desc: 'Eine gotische Festung auf einer steilen Felsspitze, umgeben von schier endlosen, dunklen Tannenwäldern und dickem Nebel.',
    easterEggs: ['Gotischer Schlossturm (+3100)', 'Vampir-Fledermausschwarm (+2800)', 'Karpaten-Nebelwald (+2400)']
  },
  { 
    id: 50, 
    name: 'Der U-Bahnhof / Tunnel', 
    theme: 'subway_station', 
    targetScore: 16400, 
    timeLimit: 100, 
    desc: 'Ein unterirdischer Bahnhof mit gefliesten Wänden, den Gleisen im Vordergrund, Werbetafeln und einer einfahrenden U-Bahn.',
    easterEggs: ['Einfahrender U-Bahn-Zug (+3200)', 'Leuchtende Werbetafel (+2900)', 'U-Bahn-Gleis-Signal (+2500)']
  },
  { 
    id: 51, 
    name: 'Das schwebende Wolken-Schloss', 
    theme: 'cloud_castle', 
    targetScore: 16700, 
    timeLimit: 100, 
    desc: 'Ein Palast, der komplett aus fluffigen weißen Wolken gebaut ist, mit Regenbögen im Hintergrund und goldenen Toren.',
    easterEggs: ['Goldenes Wolkentor (+3300)', 'Erleuchteter Regenbogen (+3000)', 'Wolkenturm-Spitze (+2600)']
  },
  { 
    id: 52, 
    name: 'Die mystische Mangrove', 
    theme: 'mystic_mangrove', 
    targetScore: 17000, 
    timeLimit: 100, 
    desc: 'Ein sumpfiges Küstengebiet mit verschlungenen Baumwurzeln, die ins Wasser ragen, trübem Wasser und geheimnisvollen Schatten.',
    easterEggs: ['Verschlungene Mangrovenwurzel (+3400)', 'Sumpfiges Irrlicht (+3100)', 'Versunkene Ruinensteine (+2700)']
  },
  { 
    id: 53, 
    name: 'Im Weltall', 
    theme: 'outer_space', 
    targetScore: 17300, 
    timeLimit: 100, 
    desc: 'Raumschiffe fliegen vorbei, Partikel Sterne kommen entgegen. Galaxien, Andromedanebel.',
    easterEggs: ['Vorbeifliegendes Raumschiff (+3500)', 'Andromeda-Galaxie (+3200)', 'Schwebende Raumstation (+2800)']
  },
  { 
    id: 54, 
    name: 'Das antike Rom (Kolosseum)', 
    theme: 'colosseum_arena', 
    targetScore: 17600, 
    timeLimit: 100, 
    desc: 'Die Arena des Kolosseums mit sandigem Boden, steinernen Rängen voller Zuschauer im Hintergrund und mächtigen Marmorsäulen.',
    easterEggs: ['Gladiatoren-Goldhelm (+3600)', 'Kaiserliche Loge (+3300)', 'Marmor-Ehrensäule (+2900)']
  },
  { 
    id: 55, 
    name: 'Das Skigebiet im Winter', 
    theme: 'ski_resort', 
    targetScore: 17900, 
    timeLimit: 100, 
    desc: 'Eine Skipiste mit Sesselliften, Skihütten, Schneekanonen, verschneiten Tannen und Skifahrern im Hintergrund.',
    easterEggs: ['Schneekanone-Power (+3700)', 'Sessellift-Gondel (+3400)', 'Skihütten-Kamin (+3000)']
  },
  { 
    id: 56, 
    name: 'Die isländische Geysir-Landschaft', 
    theme: 'iceland_geysir', 
    targetScore: 18200, 
    timeLimit: 100, 
    desc: 'Moosbewachsene Lavafelder, dampfende heiße Quellen, sprudelnde Geysire, die regelmäßig Wasser in die Luft spucken, und dramatische Wolken.',
    easterEggs: ['Riesen-Geysir Eruption (+3800)', 'Heiße Schwefelquelle (+3500)', 'Moosiger Basaltfelsen (+3100)']
  },
  { 
    id: 57, 
    name: 'Die Großbäckerei (Riesen-Backstube)', 
    theme: 'giant_bakery', 
    targetScore: 18500, 
    timeLimit: 100, 
    desc: 'Eine surreal große Küche mit riesigen Mehl-Säcken, überdimensionalen Öfen, dampfenden Teigkesseln und Förderbändern für Brot.',
    easterEggs: ['Riesen-Mehlsack-Explosion (+3900)', 'Glühender Backofen (+3600)', 'Teigkessel-Rührwerk (+3200)']
  },
  { 
    id: 58, 
    name: 'Innenleben des Mainboards', 
    theme: 'arcade_chip', 
    targetScore: 18800, 
    timeLimit: 100, 
    desc: 'Eine futuristische Welt im Inneren eines Computerchips mit leuchtenden Leiterbahnen, Kondensator-Türmen und pulsierenden Datenströmen.',
    easterEggs: ['Hochleistungs-Prozessor (+4000)', 'Glühender Riesen-Kondensator (+3700)', 'Quanten-Datenbus (+3300)']
  },
  { 
    id: 59, 
    name: 'Der japanische Kirschblüten-Park', 
    theme: 'sakura_park', 
    targetScore: 19100, 
    timeLimit: 100, 
    desc: 'Ein idyllischer Garten zur Frühlingszeit mit rosa blühenden Kirschbäumen (Sakura), traditionellen roten Brücken und Steinlaternen.',
    easterEggs: ['Traditionelle rote Brücke (+4100)', 'Uralte Steinlaterne (+3800)', 'Goldener Kaiser-Koi (+3400)']
  },
  { 
    id: 60, 
    name: 'Die Formel-1-Start-Ziel-Gerade', 
    theme: 'formula1_track', 
    targetScore: 19400, 
    timeLimit: 100, 
    desc: 'Eine Rennstrecke mit Boxengasse, Tribünen voller Fans, Startampeln, Reifenstapeln und rasant vorbeizischenden Rennwagen bei Regen.',
    easterEggs: ['F1-Startampel (+4200)', 'Vorbeizischender Bolide (+3900)', 'Reifenstapel-Schikane (+3500)']
  },
  { 
    id: 61, 
    name: 'Das Korallenriff bei Ebbe', 
    theme: 'coral_reef_lowtide', 
    targetScore: 19700, 
    timeLimit: 100, 
    desc: 'Ein flaches Küstengebiet mit freiliegenden Korallen, glitzernden Gezeiten-Tümpeln, Seesternen und schreienden Möwen am Himmel.',
    easterEggs: ['Riesiger Sonnen-Seestern (+4300)', 'Perlen-Riesenmuschel (+4000)', 'Kreischende Küstenmöwe (+3600)']
  },
  { 
    id: 62, 
    name: 'Das antike Künstleratelier', 
    theme: 'artist_studio', 
    targetScore: 20000, 
    timeLimit: 100, 
    desc: 'Ein chaotischer Raum voller Leinwände, Staffeleien, Farbtöpfen, antiken Statuen und einem großen Atelierfenster mit Blick auf Paris.',
    easterEggs: ['Meisterwerk auf Staffelei (+4400)', 'Antike Marmor-Büste (+4100)', 'Bunte Farbpalette (+3700)']
  },
  { 
    id: 63, 
    name: 'Die Retro-Pixel-Wüste', 
    theme: 'pixel_desert', 
    targetScore: 20300, 
    timeLimit: 100, 
    desc: 'Pixelwelt: Eine rein 8-Bit-inspirierte Kulisse mit blockartigen Kakteen, einer pixeligen Block-Sonne und flachen Bergen im NES-Stil.',
    easterEggs: ['Blockiger 8-Bit Kaktus (+4500)', 'Pixelige Retro-Sonne (+4200)', 'Geheimnisvoller Retro-Block (+3800)']
  },
  { 
    id: 64, 
    name: 'Das alte Ägypten (Pyramiden)', 
    theme: 'giza_pyramids', 
    targetScore: 20600, 
    timeLimit: 100, 
    desc: 'Wüstensand, die großen Pyramiden von Giza und die Sphinx im Hintergrund, dazu Hieroglyphen-Wände und gleißende Wüstensonne.',
    easterEggs: ['Pyramiden von Gizeh (+4600)', 'Große Sphinx-Statue (+4300)', 'Uralte Hieroglyphen-Wand (+3900)']
  },
  { 
    id: 65, 
    name: 'Das Fußballstadion', 
    theme: 'soccer_stadium', 
    targetScore: 20900, 
    timeLimit: 100, 
    desc: 'Ein riesiges Flutlichtstadion mit grünem Rasen, Toren, Trainerbänken und vollbesetzten Zuschauerrängen mit Bannern.',
    easterEggs: ['Tornetz-Kreuzeck (+4700)', 'Flutlicht-Pylone (+4300)', 'Meister-Pokal an der Trainerbank (+4000)']
  },
  { 
    id: 66, 
    name: 'Der herbeiwehende Tornado', 
    theme: 'prairie_tornado', 
    targetScore: 21200, 
    timeLimit: 100, 
    desc: 'Eine weite amerikanische Ebene, in der am Horizont ein gewaltiger Wirbelsturm aufzieht, während Blitze den Himmel erhellen.',
    easterEggs: ['Auge des Tornados (+4800)', 'Sturm-Windrad (+4400)', 'Wetterhahn der Scheune (+4000)']
  },
  { 
    id: 67, 
    name: 'Das gemütliche Wohnzimmer', 
    theme: 'retro_living_room', 
    targetScore: 21500, 
    timeLimit: 100, 
    desc: 'Retro 70er: Eine gemütliche Stube mit orangefarbener Blümchentapete, schwerem Holzsofa, Röhrenfernseher, Plattenspieler und Kaminfeuer.',
    easterEggs: ['Vintage-Röhrenfernseher (+4600)', 'Drehender Plattenspieler (+4200)', 'Knisterndes Kaminfeuer (+3900)']
  },
  { 
    id: 68, 
    name: 'Das Comic-Zeichenbrett', 
    theme: 'comic_drawing_board', 
    targetScore: 21800, 
    timeLimit: 100, 
    desc: 'Ein riesiges weißes Blatt Papier, auf dem mit Tinte eine Landschaft skizziert wird – mit Bleistiftlinien und Radierspuren.',
    easterEggs: ['Auslaufendes Tintenfass (+4800)', 'Riesen-Radiergummi (+4300)', 'Comic-Sprechblase (+4000)']
  },
  { 
    id: 69, 
    name: 'Die venezianische Kanallandschaft', 
    theme: 'venice_canals', 
    targetScore: 22100, 
    timeLimit: 100, 
    desc: 'Eine romantische Wasserstraße mit historischen Palazzi, Gondeln an Holzpfählen und einer verzierten Fußgängerbrücke.',
    easterEggs: ['Verzierte Rialto-Brücke (+4900)', 'Venezianische Gondel (+4400)', 'Historischer Palazzo-Balkon (+4100)']
  },
  { 
    id: 70, 
    name: 'Der Skatepark', 
    theme: 'skatepark', 
    targetScore: 22400, 
    timeLimit: 100, 
    desc: 'Eine urbane Anlage mit Beton-Halfpipes, Rails, Graffiti-Wänden, Skatern und einer Skyline im späten Abendlicht.',
    easterEggs: ['Riesen-Beton-Halfpipe (+5000)', 'Graffiti-Mural-Wand (+4500)', 'Grind-Rail mit Skateboard (+4200)']
  },
  { 
    id: 71, 
    name: 'Die Polarlichter-Nacht (Aurora Borealis)', 
    theme: 'aurora_borealis', 
    targetScore: 22700, 
    timeLimit: 100, 
    desc: 'Eine dunkle Schneelandschaft in Skandinavien, über deren Himmel grüne und violette Polarlichter wabern.',
    easterEggs: ['Polarlicht-Schleier (+5100)', 'Beleuchtetes Schnee-Iglu (+4600)', 'Verschneite Polartanne (+4300)']
  },
  { 
    id: 72, 
    name: 'Das Labor eines verrückten Professors', 
    theme: 'mad_scientist_lab', 
    targetScore: 23000, 
    timeLimit: 100, 
    desc: 'Blubbernde Reagenzgläser, riesige Tesla-Spulen mit elektrischen Funken, Laborbänke voll Chemie und grüne Flüssigkeiten in Glasbehältern.',
    easterEggs: ['Riesige Tesla-Spule (+5200)', 'Blubberndes Reagenzglas (+4700)', 'Frankenstein-Hauptschalter (+4400)']
  },
  { 
    id: 73, 
    name: 'Das indische Taj Mahal', 
    theme: 'taj_mahal', 
    targetScore: 23300, 
    timeLimit: 100, 
    desc: 'Ein prachtvoller, weißer Marmorpalast im Hintergrund, davor spiegelnde Wasserbecken und exotische Gärten.',
    easterEggs: ['Taj-Mahal-Marmorkuppel (+5300)', 'Spiegelndes Wasserbecken (+4800)', 'Exotischer Lotus-Garten (+4500)']
  },
  { 
    id: 74, 
    name: 'Die hängenden Gärten von Babylon', 
    theme: 'hanging_gardens_babylon', 
    targetScore: 23600, 
    timeLimit: 100, 
    desc: 'Stufenförmige Terrassenbauten mit üppiger, tropischer Vegetation, plätschernden Wasserfällen und antiken Ziegelmauern in der Wüstensonne.',
    easterEggs: ['Babylonischer Stufen-Wasserfall (+5400)', 'Antikes Ziegelrelief-Tor (+4900)', 'Hängende Königspalmen & Oase (+4600)']
  },
  { 
    id: 75, 
    name: 'Die Zeusstatue von Olympia', 
    theme: 'zeus_statue_olympia', 
    targetScore: 23900, 
    timeLimit: 100, 
    desc: 'Das Innere eines prunkvollen griechischen Tempels mit riesigen ionischen Säulen, goldenen Verzierungen und einer kolossalen Zeus-Statue im Hintergrund.',
    easterEggs: ['Goldener Zeus-Blitzkeil (+5500)', 'Kolossaler Elfenbeinthron (+5000)', 'Olympische Sieger-Nike (+4700)']
  },
  { 
    id: 76, 
    name: 'Der Leuchtturm von Alexandria', 
    theme: 'lighthouse_alexandria', 
    targetScore: 24200, 
    timeLimit: 100, 
    desc: 'Eine mächtige antike Hafenfestung auf einer Insel, mit einer lodernden Flamme an der Spitze und Segelschiffen im blauen Mittelmeer.',
    easterEggs: ['Loderndes Leuchtfeuer (+5600)', 'Mächtiger Pharos-Turm (+5100)', 'Antike Mittelmeer-Galeere (+4800)']
  },
  { 
    id: 77, 
    name: 'Der Koloss von Rhodos', 
    theme: 'colossus_rhodes', 
    targetScore: 24500, 
    timeLimit: 100, 
    desc: 'Eine gigantische Bronzestatue des Sonnengottes Helios, die mit gespreizten Beinen über der Hafeneinfahrt thront, während unten kleine Boote vorbeifahren.',
    easterEggs: ['Helios-Sonnendiadem (+5700)', 'Lodernde Koloss-Fackel (+5200)', 'Hafeneinfahrt-Boot (+4900)']
  },
  { 
    id: 78, 
    name: 'Das Mausoleum von Halikarnassos', 
    theme: 'mausoleum_halicarnassus', 
    targetScore: 24800, 
    timeLimit: 100, 
    desc: 'Ein prachtvolles weißes Grabmal mit Reliefs, Statuen und einer stufenförmigen Pyramidenkrone unter einem dramatischen Abendhimmel.',
    easterEggs: ['Pyramiden-Quadriga (+5800)', 'Amazonen-Relieffries (+5300)', 'Mausolos-Marmorstatue (+4900)']
  },
  { 
    id: 79, 
    name: 'Der Artemistempel in Ephesos', 
    theme: 'artemis_temple_ephesus', 
    targetScore: 25100, 
    timeLimit: 100, 
    desc: 'Ein gigantischer, heiliger Wald aus über hundert reich geschmückten Marmorsäulen, davor opulente Altäre und antike Opferstätten.',
    easterEggs: ['Kultstatue der Artemis (+5900)', 'Opulenter Opferaltar (+5400)', 'Relief-Marmorsäule (+5000)']
  },
  { 
    id: 80, 
    name: 'Chichen Itza (Die Kukulkan-Pyramide)', 
    theme: 'chichen_itza', 
    targetScore: 25400, 
    timeLimit: 100, 
    desc: 'Die Maya-Pyramide inmitten des tiefen, dichten Dschungels von Yucatán, mit steinernen Schlangenkopf-Treppen und tropischen Vögeln.',
    easterEggs: ['Gefiederte Schlange Kukulkan (+6000)', 'Steinerner Schlangenkopf (+5500)', 'Heiliger Quetzal-Vogel (+5100)']
  },
  { 
    id: 81, 
    name: 'Christus der Erlöser (Rio de Janeiro)', 
    theme: 'christ_redeemer_rio', 
    targetScore: 25700, 
    timeLimit: 100, 
    desc: 'Die weltberühmte Statue hoch oben auf dem Corcovado, mit einem atemberaubenden Blick auf den Zuckerhut und die Bucht von Rio im Hintergrund.',
    easterEggs: ['Segnende Hand von Christus (+6100)', 'Zuckerhut-Seilbahn (+5600)', 'Corcovado-Aussichtsplattform (+5200)']
  },
  { 
    id: 82, 
    name: 'Die Chinesische Mauer (Große Mauer)', 
    theme: 'great_wall_china', 
    targetScore: 26000, 
    timeLimit: 100, 
    desc: 'Ein endloser, steinernen Zickzack-Wall, der sich über grüne, nebelverhangene Bergketten und Wachtürme schlängelt.',
    easterEggs: ['Kaiserlicher Signalfeuerturm (+6200)', 'Goldener Drachen-Wachturm (+5700)', 'Uraltes Mauer-Zickzack-Tor (+5300)']
  },
  { 
    id: 83, 
    name: 'Machu Picchu (Die Inka-Stadt)', 
    theme: 'machu_picchu', 
    targetScore: 26300, 
    timeLimit: 100, 
    desc: 'Die geheimnisvolle Steinstadt hoch oben in den peruanischen Anden, umgeben von steilen, nebelverhangenen Urwaldgipfeln und terrassierten Hängen.',
    easterEggs: ['Sonnentempel von Machu Picchu (+6300)', 'Heiliger Intihuatana-Sonnensitz (+5800)', 'Terrassen-Inka-Lama (+5400)']
  },
  { 
    id: 84, 
    name: 'Petra (Das Schatzhaus in Jordanien)', 
    theme: 'petra_jordan', 
    targetScore: 26600, 
    timeLimit: 100, 
    desc: 'Eine in rosafarbene Felswände gemeißelte antike nabatäische Fassade mit riesigen Säulen und geheimnisvollen Höhleneingängen.',
    easterEggs: ['Al-Khazneh Urne des Pharao (+6400)', 'Geheime Felsengrab-Krypta (+5900)', 'Wüstenbeduinen-Dromedar (+5500)']
  },
  { 
    id: 85, 
    name: 'Die Freiheitsstatue (New York Harbor)', 
    theme: 'statue_of_liberty', 
    targetScore: 26900, 
    timeLimit: 100, 
    desc: 'Die grüne Kupferstatue auf ihrem Sockel, im Hintergrund die Skyline von Manhattan im Dunst und vorbeiziehende Fähren.',
    easterEggs: ['Goldene Freiheitsfackel (+6500)', 'Staten Island Fähre (+6000)', 'Manhattan Empire State Spitze (+5600)']
  },
  { 
    id: 86, 
    name: 'Der Eiffelturm (Paris bei Nacht)', 
    theme: 'eiffel_tower_paris', 
    targetScore: 27200, 
    timeLimit: 100, 
    desc: 'Das eiserne Pariser Wahrzeichen, das im Dunkeln golden funkelt, davor die von Laternen erleuchteten Ufer der Seine und schicke Altbauten.',
    easterEggs: ['Goldener Eiffelturm-Leuchtturm (+6600)', 'Romantisches Seine-Ausflugsboot (+6100)', 'Erleuchtete Pariser Straßenlaterne (+5700)']
  },
  { 
    id: 87, 
    name: 'Stonehenge (England bei Nebel)', 
    theme: 'stonehenge', 
    targetScore: 27500, 
    timeLimit: 100, 
    desc: 'Ein mystischer prähistorischer Steinkreis auf einer weiten, nebligen Ebene, über der eine düstere, mystische Stimmung liegt.',
    easterEggs: ['Druidischer Sonnenwende-Altarstein (+6700)', 'Schwebende megalithische Deckplatte (+6200)', 'Keltischer Rabe im Nebel (+5800)']
  },
  { 
    id: 88, 
    name: 'Der Schiefe Turm von Pisa', 
    theme: 'leaning_tower_pisa', 
    targetScore: 27800, 
    timeLimit: 100, 
    desc: 'Der berühmte, schiefe Glockenturm aus weißem Marmor, flankiert vom Dom und dem blauen italienischen Himmel.',
    easterEggs: ['Schiefe Glockenstube an der Turmspitze (+6800)', 'Marmorkuppel des Doms zu Pisa (+6300)', 'Galileos Fallversuch-Kugel (+5900)']
  },
  { 
    id: 89, 
    name: 'Die Moai-Statuen auf der Osterinsel', 
    theme: 'easter_island_moai', 
    targetScore: 28100, 
    timeLimit: 100, 
    desc: 'Gigantische, rätselhafte Steinköpfe, die auf einer kargen Grasinsel dem weiten Pazifischen Ozean und stürmischen Wolken entgegenschauen.',
    easterEggs: ['Zeremonieller Moai-Kopfschmuck Pukao (+6900)', 'Geheimes Vogelmann-Petroglyph (Tangata Manu) (+6400)', 'Ahu-Tongariki Ahnen-Steinplattform (+6000)']
  },
  { 
    id: 90, 
    name: 'Die Tower Bridge (London)', 
    theme: 'tower_bridge_london', 
    targetScore: 28400, 
    timeLimit: 100, 
    desc: 'Die imposante viktorianische Klappbrücke über der Themse, mit den charakteristischen Zwillings-Türmen und roten Doppeldeckerbussen im Hintergrund.',
    easterEggs: ['Viktorianischer Nordturm-Glockenhelm (+7000)', 'Ikonischer roter Londoner Doppeldeckerbus (+6500)', 'Historisches Brücken-Klapptriebwerk (+6100)']
  },
  { 
    id: 91, 
    name: 'Grazer Uhrturm: Über Graz (Österreich)', 
    theme: 'grazer_uhrturm', 
    targetScore: 28700, 
    timeLimit: 100, 
    desc: 'Der markante Uhrturm auf dem Grazer Schlossberg hoch über der Mur und den roten Dächern der Altstadt, berühmt für seine vertauschten Uhrzeiger und die am blauen Himmel vorbeiziehenden Wolken.',
    easterEggs: ['Großes Zifferblatt mit vertauschten Zeigern (+7100)', 'Historischer hölzerner Wehrgang-Erker (+6600)', 'Grazer Schlossberg-Hund & Steirischer Panther (+6200)']
  },
  { 
    id: 92, 
    name: 'Das Weltall', 
    theme: 'im_weltall', 
    targetScore: 29000, 
    timeLimit: 100, 
    desc: 'Tief im unendlichen Kosmos: Glänzende Nebel und Sterne fliegen einem im Hyperspace entgegen, während Moorhühner durch die Galaxie schweben.',
    easterEggs: ['Geheimer Alien-UFO-Aufklärer (+7200)', 'Glühender Kometenschweif (+6700)', 'Funkelnder Supernova-Pulsar (+6300)']
  },
  { 
    id: 93, 
    name: 'Wien', 
    theme: 'wien', 
    targetScore: 29300, 
    timeLimit: 100, 
    desc: 'Die prunkvolle Bundeshauptstadt Wien im charmanten Schnürlregen: Stephansdom, imperiale Prachtbauten und barocke Eleganz an der Donau.',
    easterEggs: ['Stephansdom Südturm-Steffl (+7300)', 'Wiener Riesenrad im Prater (+6800)', 'Traditioneller Wiener Fiaker (+6400)']
  },
  { 
    id: 94, 
    name: 'Mohnblumen', 
    theme: 'mohnblumen', 
    targetScore: 29600, 
    timeLimit: 100, 
    desc: 'Ein malerisches Mohnblumenfeld im warmen goldenen Abendlicht am Meer, mit sanft herabsegelnden roten Blütenblättern.',
    easterEggs: ['Goldene Abendsonne über dem Meer (+7400)', 'Prachtvolle Riesen-Mohnblüte (+6900)', 'Historischer Holzzaun am Feldweg (+6500)']
  },
  { 
    id: 95, 
    name: 'Die Burg', 
    theme: 'die_burg', 
    targetScore: 29900, 
    timeLimit: 100, 
    desc: 'Eine wehrhafte mittelalterliche Ritterburg auf schroffen Felszinnen, umtost von einem mächtigen Sandsturm.',
    easterEggs: ['Hoher runder Bergfried-Hauptturm (+7500)', 'Festes Burgtor mit Zugbrücke & Zwillings-Türmen (+7000)', 'Mittelalterliche Steinbrücke über die Schlucht (+6600)']
  },
  { 
    id: 96, 
    name: 'Toskana', 
    theme: 'toskana', 
    targetScore: 30200, 
    timeLimit: 100, 
    desc: 'Sanft geschwungene Hügel, Zypressen und ein traditionelles toskanisches Landgut unter ziehenden Wolken und einem erfrischenden Sommerregen.',
    easterEggs: ['Toskanisches Steinhaus-Podere (+7600)', 'Schlanke Hügel-Zypressen (+7100)', 'Sonnenbeschienene Weinberge & Olivenhaine (+6700)']
  },
  { 
    id: 97, 
    name: 'Der Herbst', 
    theme: 'herbst', 
    targetScore: 30500, 
    timeLimit: 100, 
    desc: 'Ein prächtiger, goldener Herbstwald: Bunte Blätter segeln sanft von den Bäumen herab über rauschende Wipfel, Pilze und warmes goldenes Herbstlicht.',
    easterEggs: ['Mächtige goldene Alteiche (+7700)', 'Kunterbunter raschelnder Laubhaufen (+7200)', 'Herbstliches Waldpilz-Nest & Kastanien (+6800)']
  },
  { 
    id: 98, 
    name: 'Schneefall', 
    theme: 'schneefall', 
    targetScore: 30800, 
    timeLimit: 100, 
    desc: 'Eine zauberhafte Winterlandschaft im dichten Schneefall: Verschneite Nadelwälder, Eisgipfel und eine gemütliche Holzhütte unter tanzenden Schneeflocken.',
    easterEggs: ['Verschneite Blockhütte mit Kaminrauch (+7800)', 'Lustiger Schneemann mit Zylinder (+7300)', 'Glitzernde Eis-Kristall-Tanne (+6900)']
  },
  { 
    id: 99, 
    name: 'China', 
    theme: 'china', 
    targetScore: 31100, 
    timeLimit: 100, 
    desc: 'Majestätische traditionelle chinesische Berglandschaft: Pagoden, geschwungene Dächer und Reisterrassen unter ziehenden Wolken und dramatisch aufzuckenden Blitzen.',
    easterEggs: ['Kaiserliche Goldene Pagode (+7900)', 'Traditioneller Roter Lampion-Pavillon (+7400)', 'Uralte Steinkarst-Klippen & Bambus (+7000)']
  },
  { 
    id: 100, 
    name: 'Julius Cäsar', 
    theme: 'julius_caesar', 
    targetScore: 31400, 
    timeLimit: 100, 
    desc: 'Ein älterer Herrscher mit Lorbeerkrone und purpurnem Gewand thront auf einem Marmorsockel in einer mediterranen Landschaft. In seiner Rechten hält er ein Zepter, während seine Linke eine Schriftrolle umschließt. Links und rechts des Podests haben sich Soldaten in Rüstungen und Zivilisten versammelt. Die Szenerie strahlt eine mächtige, antike und erhabene Atmosphäre aus.',
    easterEggs: ['Goldene Lorbeerkrone des Cäsar (+8000)', 'Kaiserliches Zepter der Macht (+7500)', 'Antike Senats-Schriftrolle (+7100)']
  }
];

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.graphics = new GraphicsRenderer();
    this.particles = new ParticleSystem();
    this.easterEggs = new EasterEggManager();

    this.virtualWidth = 2400;
    this.screenHeight = 800;
    this.screenWidth = window.innerWidth;

    this.state = 'MENU';
    this.currentLevelIndex = 0;
    this.gameMode = 'campaign';
    this.difficulty = 'normal';

    this.score = 0;
    this.timeLeft = 100;
    this.shotsFired = 0;
    this.hits = 0;
    this.combo = 0;
    this.maxCombo = 0;
    this.lastHitTime = 0;
    this.comboTimeout = 2000;
    this.easterEggsDiscovered = 0;

    this.ammo = 8;
    this.maxAmmo = 8;
    this.isReloading = false;

    this.cameraX = 600;
    this.targetCameraX = 600;
    this.mouseX = 0;
    this.mouseY = 0;

    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchStartCameraX = 0;
    this.isTouchDragging = false;
    this.touchMoved = false;
    this.lastTouchTime = 0;
    this.panLeftActive = false;
    this.panRightActive = false;

    this.chickens = [];
    this.maxChickens = 14;

    this.lastFrameTime = 0;
    this.animTime = 0;
    this.recoilY = 0;
    this.lastPopupTime = 0;

    this.progress = this._loadProgress();

    this._bindEvents();
    this._resizeCanvas();
  }

  _loadProgress() {
    try {
      const saved = localStorage.getItem('moorhuhn_progress');
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return { unlockedLevel: 1, highScores: {}, totalKills: 0 };
  }

  _saveProgress() {
    try {
      localStorage.setItem('moorhuhn_progress', JSON.stringify(this.progress));
    } catch(e) {}
  }

  resetHighscores() {
    this.progress.highScores = {};
    this.progress.totalKills = 0;
    this._saveProgress();
  }

  _resizeCanvas() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.canvas.width = this.screenWidth;
    this.canvas.height = this.screenHeight;
  }

  _bindEvents() {
    window.addEventListener('resize', () => this._resizeCanvas());

    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      const edgeThreshold = 0.15 * this.screenWidth;
      if (this.mouseX < edgeThreshold) {
        const factor = 1 - (this.mouseX / edgeThreshold);
        this.targetCameraX -= factor * 22;
      } else if (this.mouseX > this.screenWidth - edgeThreshold) {
        const factor = (this.mouseX - (this.screenWidth - edgeThreshold)) / edgeThreshold;
        this.targetCameraX += factor * 22;
      }

      this.targetCameraX = Math.max(0, Math.min(this.virtualWidth - this.screenWidth, this.targetCameraX));
    });

    window.addEventListener('mousedown', (e) => {
      if (this.state !== 'PLAYING') return;
      if (Date.now() - this.lastTouchTime < 600) return; // Prevent ghost click after touch
      if (e.button === 0) {
        this.shoot();
      } else if (e.button === 2) {
        this.reload();
      }
    });

    const isInteractiveUI = (target) => {
      return target && target.closest && target.closest('.hud-pill, .screen-modal, .reload-btn, #ammo-touch-zone, .mobile-pan-btn, .minimap-bar');
    };

    // Touch Support for Mobile / Android / Tablet
    window.addEventListener('touchstart', (e) => {
      this.lastTouchTime = Date.now();
      if (this.state !== 'PLAYING') return;
      if (isInteractiveUI(e.target)) return;

      // Two-Finger Tap: Instant Reload!
      if (e.touches.length === 2) {
        e.preventDefault();
        this.reload();
        if (navigator.vibrate) navigator.vibrate([30, 40, 30]);
        this.isTouchDragging = false;
        this.touchMoved = false;
        return;
      }

      if (e.touches.length === 1) {
        const t = e.touches[0];
        this.touchStartX = t.clientX;
        this.touchStartY = t.clientY;
        this.touchStartCameraX = this.targetCameraX;
        this.isTouchDragging = false;
        this.touchMoved = false;
        this.mouseX = t.clientX;
        this.mouseY = t.clientY;
      }
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
      if (this.state !== 'PLAYING') return;
      if (isInteractiveUI(e.target)) return;
      if (e.touches.length !== 1) return;

      const t = e.touches[0];
      const dx = t.clientX - this.touchStartX;
      const dy = t.clientY - this.touchStartY;

      // If finger moved more than 10px, treat as panorama swipe/drag
      if (!this.touchMoved && Math.hypot(dx, dy) > 10) {
        this.touchMoved = true;
        this.isTouchDragging = true;
      }

      if (this.isTouchDragging) {
        e.preventDefault();
        const swipeFactor = 1.6;
        this.targetCameraX = Math.max(0, Math.min(this.virtualWidth - this.screenWidth, this.touchStartCameraX - dx * swipeFactor));
        this.mouseX = t.clientX;
        this.mouseY = t.clientY;
      }
    }, { passive: false });

    window.addEventListener('touchend', (e) => {
      if (this.state !== 'PLAYING') return;
      if (isInteractiveUI(e.target)) return;

      // Tap-To-Shoot: If it was a quick touch without dragging -> Instant Shot!
      if (!this.isTouchDragging && !this.touchMoved) {
        e.preventDefault();
        this.shoot(this.touchStartX, this.touchStartY);
        if (navigator.vibrate) navigator.vibrate(25);
      }

      this.isTouchDragging = false;
      this.touchMoved = false;
    }, { passive: false });

    window.addEventListener('contextmenu', (e) => e.preventDefault());

    window.addEventListener('keydown', (e) => {
      if (e.code === 'KeyR' || e.code === 'Space') {
        if (this.state === 'PLAYING') this.reload();
      } else if (e.code === 'Escape') {
        if (this.state === 'PLAYING') this.pauseGame();
        else if (this.state === 'PAUSED') this.resumeGame();
      } else if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        this.targetCameraX = Math.max(0, this.targetCameraX - 150);
      } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        this.targetCameraX = Math.min(this.virtualWidth - this.screenWidth, this.targetCameraX + 150);
      }
    });
  }

  startLevel(levelIndex = 0, mode = 'campaign', difficulty = 'normal') {
    soundEngine.init();
    this.currentLevelIndex = levelIndex;
    this.gameMode = mode;
    this.difficulty = difficulty;

    const levelCfg = LEVEL_CONFIGS[this.currentLevelIndex];
    this.timeLeft = levelCfg.timeLimit;
    if (difficulty === 'easy') this.timeLeft = 130;
    if (difficulty === 'crazy') this.timeLeft = 75;

    this.score = 0;
    this.targetScoreReached = false;
    this.shotsFired = 0;
    this.hits = 0;
    this.combo = 0;
    this.maxCombo = 0;
    this.easterEggsDiscovered = 0;
    this.ammo = this.maxAmmo;
    this.isReloading = false;
    this.lastPopupTime = Date.now();

    this.chickens = [];
    this.particles.reset();
    this.graphics.clearDecals();
    this.easterEggs.initLevel(levelCfg.theme, this.virtualWidth, this.screenHeight);
    this.particles.initWeather(levelCfg.theme, this.virtualWidth, this.screenHeight);

    for (let i = 0; i < 10; i++) {
      this._spawnRandomChicken();
    }

    this.chickens.push(new Chicken({
      x: 300,
      y: 120,
      type: 'balloon',
      depth: 1,
      direction: 1
    }));

    soundEngine.startThemeAmbient(levelCfg.theme);
    this.state = 'PLAYING';

    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      if (this.state === 'PLAYING') {
        this.timeLeft -= 1;
        if (this.timeLeft <= 0) {
          this.endGame();
        }
      }
    }, 1000);
  }

  pauseGame() {
    if (this.state === 'PLAYING') this.state = 'PAUSED';
  }

  resumeGame() {
    if (this.state === 'PAUSED') this.state = 'PLAYING';
  }

  shoot(customX = null, customY = null) {
    if (this.isReloading) return;

    if (this.ammo <= 0) {
      soundEngine.playEmptyClick();
      return;
    }

    if (customX !== null && customY !== null) {
      this.mouseX = customX;
      this.mouseY = customY;
    }

    this.ammo -= 1;
    this.shotsFired += 1;
    this.recoilY = 12;

    soundEngine.playShot();

    const shotWorldX = this.mouseX + this.cameraX;
    const shotWorldY = this.mouseY;

    this.particles.spawnMuzzleSpark(shotWorldX, shotWorldY);
    this.particles.spawnSmoke(shotWorldX, shotWorldY);
    this.graphics.addDecal(shotWorldX, shotWorldY);

    let hitSomething = false;
    const sortedChickens = [...this.chickens].sort((a, b) => b.depth - a.depth);

    for (let ch of sortedChickens) {
      const res = ch.checkHit(shotWorldX, shotWorldY);
      if (res && res.hit) {
        hitSomething = true;
        this.hits += 1;

        const now = Date.now();
        if (now - this.lastHitTime < this.comboTimeout) {
          this.combo += 1;
        } else {
          this.combo = 1;
        }
        this.lastHitTime = now;
        if (this.combo > this.maxCombo) this.maxCombo = this.combo;

        const comboMult = Math.min(4, Math.floor((this.combo - 1) / 2) + 1);
        const finalPts = res.points * comboMult;
        this.score += finalPts;

        soundEngine.playSquawk(res.squawk);

        let featherColor = '#8B4513';
        if (res.type === 'golden') featherColor = 'gold';
        if (res.type === 'ghost') featherColor = 'ghost';
        if (res.type === 'dove') featherColor = '#FFFFFF';

        this.particles.spawnFeathers(shotWorldX, shotWorldY, featherColor, res.type === 'popup' ? 25 : 14);

        let label = res.points > 0 ? `+${finalPts}` : `${finalPts}`;
        if (comboMult > 1 && res.points > 0) label += ` (x${comboMult})`;
        this.particles.addScorePopup(shotWorldX, shotWorldY, label, finalPts < 0 ? '#ef4444' : '#FFD700', res.type === 'popup' ? 36 : 28);

        if (res.type === 'dove' || res.type === 'owl') {
          soundEngine.playPenalty();
        }

        break;
      }
    }

    if (!hitSomething) {
      const eggRes = this.easterEggs.checkShot(shotWorldX, shotWorldY);
      if (eggRes) {
        soundEngine.playEasterEgg();
        if (eggRes.triggered) {
          this.score += eggRes.reward;
          this.easterEggsDiscovered += 1;
          this.particles.addScorePopup(eggRes.x, eggRes.y, eggRes.popupText, '#38bdf8', 32);
          this.particles.spawnFeathers(eggRes.x, eggRes.y, 'gold', 25);
        } else {
          this.particles.addScorePopup(eggRes.x, eggRes.y, 'TREFFER!', '#facc15', 22);
        }
      } else if (this.currentLevelConfig && this.currentLevelConfig.theme === 'alpine_meadow' && shotWorldY > 320) {
        soundEngine.playCowMecker();
        if (Math.random() < 0.6) {
          this.particles.addScorePopup(shotWorldX, shotWorldY, 'Muuuh! 🐮', '#84cc16', 22);
        }
      }
    }

    this._checkTargetScoreReach(shotWorldX, shotWorldY);
  }

  _checkTargetScoreReach(shotX, shotY) {
    if (!this.targetScoreReached && this.currentLevelConfig) {
      if (this.score >= this.currentLevelConfig.targetScore) {
        this.targetScoreReached = true;
        soundEngine.playEasterEgg();
        
        const burstX = shotX || this.virtualWidth * 0.5;
        const burstY = shotY || this.screenHeight * 0.3;
        this.particles.spawnFireworks(burstX, burstY);
        this.particles.spawnFireworks(this.virtualWidth * 0.25, this.screenHeight * 0.25);
        this.particles.spawnFireworks(this.virtualWidth * 0.75, this.screenHeight * 0.25);

        this.particles.addScorePopup(this.virtualWidth * 0.5, this.screenHeight * 0.2, `🎆 LEVEL ${this.currentLevelConfig.id} ERFOLGREICH! 🎆`, '#facc15', 44);
      }
    }
  }

  reload() {
    if (this.isReloading || this.ammo === this.maxAmmo) return;
    this.isReloading = true;
    soundEngine.playReload();

    setTimeout(() => {
      this.ammo = this.maxAmmo;
      this.isReloading = false;
    }, 600);
  }

  _spawnRandomChicken() {
    const theme = LEVEL_CONFIGS[this.currentLevelIndex].theme;
    const depth = Math.floor(Math.random() * 3) + 1;
    let type = 'medium';

    if (depth === 1) type = 'far';
    if (depth === 3) type = 'close';

    const rand = Math.random();
    if (rand < 0.08 || (theme === 'dragon_valley' && rand < 0.12) || (theme === 'military_base' && rand < 0.14)) type = 'turbo';
    else if (rand < 0.14 || (theme === 'jungle_ruins' && rand < 0.18)) type = 'golden';
    else if (rand < 0.22 || (theme === 'dragon_valley' && rand < 0.26) || (theme === 'medieval_fortress' && rand < 0.28) || (theme === 'military_base' && rand < 0.32)) type = 'helmet';
    else if (rand < 0.28 && (theme === 'spooky' || theme === 'moorland' || theme === 'dragon_valley' || theme === 'jungle_ruins')) type = 'ghost';
    else if (rand < 0.35 || (theme === 'city' && rand < 0.5) || (theme === 'moorland' && rand < 0.45) || (theme === 'jungle_ruins' && rand < 0.45)) type = Math.random() > 0.5 ? 'dove' : 'owl';

    const yPos = 80 + Math.random() * (this.screenHeight * 0.55);
    const startX = Math.random() > 0.5 ? -40 : this.virtualWidth + 40;

    let outfit = (type === 'helmet' ? 'helmet' : 'none');
    if ((theme === 'aquarium' || theme === 'atlantis') && Math.random() < 0.6) outfit = 'scuba';
    else if (Math.random() < 0.15) outfit = 'eggshell';

    const chicken = new Chicken({
      x: startX,
      y: yPos,
      type: type,
      depth: depth,
      outfit: outfit,
      direction: startX < 0 ? 1 : -1
    });

    this.chickens.push(chicken);
  }

  _spawnPopupChicken() {
    const popX = 200 + Math.random() * (this.virtualWidth - 400);
    const targetY = this.screenHeight - 160;
    const startY = this.screenHeight + 120;

    const popupChicken = new Chicken({
      x: popX,
      y: startY,
      targetY: targetY,
      startY: startY,
      type: 'popup',
      depth: 4
    });

    this.chickens.push(popupChicken);
  }

  endGame() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    soundEngine.stopThemeAmbient();
    soundEngine.playFanfare();

    const levelCfg = LEVEL_CONFIGS[this.currentLevelIndex];
    const isSuccess = this.score >= levelCfg.targetScore;

    if (isSuccess && this.gameMode === 'campaign') {
      if (this.currentLevelIndex + 1 >= this.progress.unlockedLevel) {
        this.progress.unlockedLevel = Math.min(LEVEL_CONFIGS.length, this.currentLevelIndex + 2);
      }
    }

    const prevHigh = this.progress.highScores[levelCfg.id] || 0;
    if (this.score > prevHigh) {
      this.progress.highScores[levelCfg.id] = this.score;
    }
    this.progress.totalKills += this.hits;
    this._saveProgress();

    this.state = 'LEVEL_COMPLETE';
  }

  update(timestamp) {
    const dt = (timestamp - this.lastFrameTime) / 1000;
    this.lastFrameTime = timestamp;
    this.animTime += dt;

    if (this.panLeftActive) {
      this.targetCameraX = Math.max(0, this.targetCameraX - 25);
    }
    if (this.panRightActive) {
      this.targetCameraX = Math.min(this.virtualWidth - this.screenWidth, this.targetCameraX + 25);
    }

    this.cameraX += (this.targetCameraX - this.cameraX) * 0.12;

    if (this.recoilY > 0) this.recoilY *= 0.8;

    if (this.state === 'PLAYING') {
      const now = Date.now();
      if (this.combo > 0 && now - this.lastHitTime >= this.comboTimeout) {
        this.combo = 0;
      }

      if (this.chickens.length < this.maxChickens && Math.random() < 0.05) {
        this._spawnRandomChicken();
      }

      if (now - this.lastPopupTime > 9000 + Math.random() * 5000) {
        const activePopup = this.chickens.find(c => c.type === 'popup' && c.state !== 'fled');
        if (!activePopup) {
          this._spawnPopupChicken();
          this.lastPopupTime = now;
        }
      }

      for (let i = this.chickens.length - 1; i >= 0; i--) {
        const ch = this.chickens[i];
        ch.update(this.virtualWidth, this.screenHeight);
        if (ch.state === 'fled') {
          this.chickens.splice(i, 1);
        }
      }

      this.particles.update(this.virtualWidth, this.screenHeight);
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.screenWidth, this.screenHeight);

    const levelCfg = LEVEL_CONFIGS[this.currentLevelIndex];

    this.ctx.save();
    this.ctx.translate(-this.cameraX, this.recoilY);

    this.graphics.renderBackground(this.ctx, levelCfg.theme, this.virtualWidth, this.screenHeight, this.animTime);

    this.easterEggs.renderHints(this.ctx, this.animTime);

    const sortedChickens = [...this.chickens].sort((a, b) => a.depth - b.depth);
    for (let ch of sortedChickens) {
      this.graphics.renderChicken(this.ctx, ch, this.animTime);
    }

    this.particles.render(this.ctx, 0);

    this.ctx.restore();

    if (this.state === 'PLAYING') {
      this.graphics.renderCrosshair(this.ctx, this.mouseX, this.mouseY, this.recoilY > 2, this.ammo);
    }
  }

  loop(timestamp) {
    this.update(timestamp);
    this.render();
    requestAnimationFrame((t) => this.loop(t));
  }

  run() {
    requestAnimationFrame((t) => this.loop(t));
  }
}
