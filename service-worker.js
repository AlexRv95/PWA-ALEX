const CACHE_NAME = 'pwa-basic-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo.png'
];

// Instalación del Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Archivos en caché');
      return cache.addAll(urlsToCache);
    })
  );
});

// Activación del Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Cache antiguo eliminado:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Intercepción de solicitudes
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
