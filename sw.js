// 🔹 Offline caching (existing install/fetch handlers)
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('quick-list-cache').then(function(cache) {
      return cache.addAll([
        'index.html',
        'manifest.json',
        'sw.js',
        // Add other files if needed (CSS, JS, icons, etc.)
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

// 🔹 Push Notification handler (new part)
self.addEventListener('push', function(event) {
  const data = event.data.json(); // assumes server sends JSON with `title` and `body`
  const { title, body } = data;

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: 'https://yoylecookie.github.io/Quick-List/logo.png',
      badge: 'https://yoylecookie.github.io/Quick-List/logo.png'
    })
  );
});

