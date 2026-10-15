// Taube-animation/taube.js

// Dateinamen der Tauben-Bilder
const TAUBE_IMAGES = [
    'Taube-animation/Taube1.png',
    'Taube-animation/Taube2.png',
    'Taube-animation/Taube3.png'
];

function spawnTaube() {
    const taube = document.createElement('img');
    let currentFrame = 0;

    taube.src = TAUBE_IMAGES[currentFrame];
    taube.className = 'flying-taube';

    // Flügelschlag-Animation: Bild alle 120ms wechseln (Tauben schlagen etwas schneller)
    const wingInterval = setInterval(() => {
        currentFrame = (currentFrame + 1) % TAUBE_IMAGES.length;
        taube.src = TAUBE_IMAGES[currentFrame];
    }, 100);

    // Zufällige Flugparameter berechnen
    const startLeftToRight = Math.random() > 0.5;
    const maxY = window.innerHeight / 2 - 150; // Nur obere Hälfte des Bildschirms
    const startY = Math.random() * Math.max(maxY, 10) + 10;
    const flightDuration = (Math.random() * 4 + 5) * 1000; // 5 bis 9 Sekunden (langsamer)

    // Startposition setzen
    taube.style.top = startY + 'px';
    taube.style.transition = `transform ${flightDuration}ms linear`;

    // Taube-Bilder schauen nach LINKS.
    // Von links nach rechts → spiegeln (scaleX(-1))
    if (startLeftToRight) {
        taube.style.left = '-120px';
        taube.style.transform = 'translateX(0px) scaleX(-1)';
    } else {
        taube.style.right = '-120px';
        taube.style.transform = 'translateX(0px) scaleX(1)';
    }

    document.body.appendChild(taube);

    // Kurz warten (Reflow erzwingen), bevor die Endposition gesetzt wird
    setTimeout(() => {
        if (startLeftToRight) {
            taube.style.transform = `translateX(${window.innerWidth + 200}px) scaleX(-1)`;
        } else {
            taube.style.transform = `translateX(-${window.innerWidth + 200}px) scaleX(1)`;
        }
    }, 50);

    // Aufräumen, wenn der Flug vorbei ist
    setTimeout(() => {
        clearInterval(wingInterval);
        taube.remove();

        // Nächste Taube planen
        scheduleNextTaube();
    }, flightDuration + 100);
}

function scheduleNextTaube() {
    // Taube erscheint zufällig alle 50 bis 100 Sekunden
    const nextAppearance = (Math.random() * 50 + 50) * 1000;
    setTimeout(spawnTaube, nextAppearance);
}

// Skript starten, sobald die Seite geladen ist
window.addEventListener('load', () => {
    // Leicht verzögert starten, damit sie nicht gleichzeitig mit dem Storch erscheint
    setTimeout(scheduleNextTaube, 5000);
});
