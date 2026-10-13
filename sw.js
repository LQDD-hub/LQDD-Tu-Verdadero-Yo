const CACHE_NAME = "lqdd-tvy-shell-v57";
const BASE = "/LQDD-Tu-Verdadero-Yo/";
const CORE = [BASE, BASE + "index.html", BASE + "manifest.webmanifest", BASE + "logo-lqdd.png", BASE + "audio/Soft%20Piano%20Bloom.mp3"];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  const url = new URL(req.url);
  if (url.pathname.includes("/videos/") || url.pathname.includes("/img/")) return;
  event.respondWith(fetch(req).then(response => {
    if (response && response.ok && (req.mode === "navigate" || CORE.some(path => url.pathname === path))) {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
    }
    return response;
  }).catch(() => caches.match(req).then(cached => cached || caches.match(BASE))));
});