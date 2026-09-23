/* Xiangras PWA service worker — cache shell for offline browse */
const CACHE = "xiangras-v3";
const ASSETS = [
  "./",
  "./index.html",
  "./menu.html",
  "./404.html",
  "./styles.css",
  "./script.js",
  "./manifest.json",
  "./robots.txt",
  "./sitemap.xml"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE; }).map(function (k) {
          return caches.delete(k);
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  const req = event.request;
  if (req.method !== "GET") return;

  event.respondWith(
    caches.match(req).then(function (cached) {
      const fetched = fetch(req)
        .then(function (res) {
          if (res && res.status === 200 && req.url.startsWith(self.location.origin)) {
            const copy = res.clone();
            caches.open(CACHE).then(function (cache) {
              cache.put(req, copy);
            });
          }
          return res;
        })
        .catch(function () {
          return cached || caches.match("./index.html");
        });
      return cached || fetched;
    })
  );
});
