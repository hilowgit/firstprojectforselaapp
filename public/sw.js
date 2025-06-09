
const CACHE_NAME = 'educational-center-v1';
const urlsToCache = [
  '/',
  '/index.html',
  // أضف هنا مسارات الملفات الرئيسية الأخرى إذا أردت
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // يرجع من الكاش إذا وجد
        }
        return fetch(event.request); // وإلا يطلبه من الشبكة
      })
  );
});
