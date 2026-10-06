// Moor/moor.js

const MOOR_IMAGES = [
    'Moor/Moor1.png',
    'Moor/Moor2.png'
];

function spawnMoor() {
    const moor = document.createElement('img');
    let currentFrame = 0;

    moor.src = MOOR_IMAGES[currentFrame];
    moor.className = 'flying-moor';

    // Flügelschlag-Animation: Bild alle 150ms wechseln
    const wingInterval = setInterval(() => {
        currentFrame = (currentFrame + 1) % MOOR_IMAGES.length;
        moor.src = MOOR_IMAGES[currentFrame];
    }, 150);

    // Zufällige Flugparameter berechnen
    const startLeftToRight = Math.random() > 0.5;
    const maxY = window.innerHeight / 2 - 100; // Nur obere Hälfte des Bildschirms
    const startY = Math.random() * Math.max(maxY, 10) + 10;
    const flightDuration = (Math.random() * 3 + 4) * 1000; // 4 bis 7 Sekunden

    // Startposition setzen
    moor.style.top = startY + 'px';
    moor.style.transition = `transform ${flightDuration}ms linear`;

    // Annahme: Bilder schauen nach LINKS.
    // Von links nach rechts → spiegeln (scaleX(-1))
    if (startLeftToRight) {
        moor.style.left = '-150px';
        moor.style.transform = 'translateX(0px) scaleX(-1)';
    } else {
        moor.style.right = '-150px';
        moor.style.transform = 'translateX(0px) scaleX(1)';
    }

    document.body.appendChild(moor);

    // Kurz warten (Reflow erzwingen), bevor die Endposition gesetzt wird
    setTimeout(() => {
        if (startLeftToRight) {
            moor.style.transform = `translateX(${window.innerWidth + 300}px) scaleX(-1)`;
        } else {
            moor.style.transform = `translateX(-${window.innerWidth + 300}px) scaleX(1)`;
        }
    }, 50);

    // Aufräumen, wenn der Flug vorbei ist
    setTimeout(() => {
        clearInterval(wingInterval);
        moor.remove();

        // Nächstes Moorhuhn planen
        scheduleNextMoor();
    }, flightDuration + 100);
}

function scheduleNextMoor() {
    // Moorhuhn erscheint zufällig alle 45 bis 90 Sekunden
    const nextAppearance = (Math.random() * 45 + 45) * 1000;
    setTimeout(spawnMoor, nextAppearance);
}

// Skript starten, sobald die Seite geladen ist
window.addEventListener('load', () => {
    // Leicht verzögert starten
    setTimeout(scheduleNextMoor, 10000);
});
