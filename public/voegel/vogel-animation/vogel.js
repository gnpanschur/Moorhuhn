// vogel-animation/vogel.js

// Hier trägst du die Dateinamen deiner Bilder ein
const BIRD_IMAGES = [
    'vogel-animation/storch1.png',
    'vogel-animation/storch2.png',
    'vogel-animation/storch3.png'
];

function spawnBird() {
    const bird = document.createElement('img');
    let currentFrame = 0;
    
    bird.src = BIRD_IMAGES[currentFrame];
    bird.className = 'flying-bird';

    // Flügelschlag-Animation: Bild alle 250ms wechseln
    const wingInterval = setInterval(() => {
        currentFrame = (currentFrame + 1) % BIRD_IMAGES.length;
        bird.src = BIRD_IMAGES[currentFrame];
    }, 250);

    // Zufällige Flugparameter berechnen
    const startLeftToRight = Math.random() > 0.5; // 50/50 Chance für die Richtung
    const maxY = window.innerHeight / 2 - 200; // Nur obere Hälfte des Bildschirms
    const startY = Math.random() * Math.max(maxY, 10) + 10;
    const flightDuration = (Math.random() * 4 + 8) * 1000; // 8 bis 12 Sekunden

    // Startposition setzen
    bird.style.top = startY + 'px';
    bird.style.transition = `transform ${flightDuration}ms linear`;

    // Annahme: Deine Vogelbilder schauen nach LINKS. 
    // Wenn er von links nach rechts fliegt, müssen wir ihn spiegeln (scaleX(-1)).
    if (startLeftToRight) {
        bird.style.left = '-100px'; // Startet außerhalb des linken Randes
        bird.style.transform = 'translateX(0px) scaleX(-1)';
    } else {
        bird.style.right = '-100px'; // Startet außerhalb des rechten Randes
        bird.style.transform = 'translateX(0px) scaleX(1)';
    }

    document.body.appendChild(bird);

    // Wichtig: Kurz warten (Reflow erzwingen), bevor die Endposition gesetzt wird
    setTimeout(() => {
        if (startLeftToRight) {
            // Fliegt ganz nach rechts aus dem Bild
            bird.style.transform = `translateX(${window.innerWidth + 200}px) scaleX(-1)`;
        } else {
            // Fliegt ganz nach links aus dem Bild
            bird.style.transform = `translateX(-${window.innerWidth + 200}px) scaleX(1)`;
        }
    }, 50);

    // Aufräumen, wenn der Flug vorbei ist
    setTimeout(() => {
        clearInterval(wingInterval); // Flügelschlag stoppen
        bird.remove(); // Vogel aus dem HTML entfernen
        
        // Nächsten Vogel planen
        scheduleNextBird();
    }, flightDuration + 100);
}

function scheduleNextBird() {
    // Der Vogel erscheint zufällig alle 60 bis 120 Sekunden
    const nextAppearance = (Math.random() * 60 + 60) * 1000; 
    setTimeout(spawnBird, nextAppearance);
}

// Skript starten, sobald die Seite geladen ist
window.addEventListener('load', () => {
    scheduleNextBird();
});
