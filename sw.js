const CACHE_NAME = 'arianit-v1';
// Shto këtu të gjitha skedarët që dëshiron të punojnë offline
const ASSETS_TO_CACHE = [
  'index.html',
  'Images/KALKULO1.png',
  // Shto imazhet e tjera lokale këtu
];

// Instalimi dhe Ruajtja e Skedarëve (Caching)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Aktivizimi dhe pastrimi i cache-it të vjetër
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Strategjia: Shërbe nga Cache, nëse s'ka, merr nga Rrjeti
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
