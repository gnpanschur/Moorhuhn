// Moorhuhn Progressive Web App Service Worker
const CACHE_NAME = 'moorhuhn-pwa-v3';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './cover.jpg',
  './voegel/Moor/Moor1.png',
  './voegel/Moor/Moor2.png',
  './voegel/Taube-animation/Taube1.png',
  './voegel/Taube-animation/Taube2.png',
  './voegel/Taube-animation/Taube3.png',
  './voegel/vogel-animation/storch1.png',
  './voegel/vogel-animation/storch2.png',
  './voegel/vogel-animation/storch3.png'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;

  // Network-first strategy for navigation / document requests to always receive latest updates
  if (e.request.mode === 'navigate' || e.request.destination === 'document') {
    e.respondWith(
      fetch(e.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
          return response;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // Network-first for all other assets with cache fallback
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
