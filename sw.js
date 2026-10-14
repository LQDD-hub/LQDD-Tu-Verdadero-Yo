const CACHE_NAME = "lqdd-tvy-shell-v131";
const BASE = "/LQDD-Tu-Verdadero-Yo/";
const CORE = [BASE, BASE + "index.html", BASE + "manifest.webmanifest", BASE + "logo-lqdd.png", BASE + "audio/misterio/%E7%AD%89%E5%BE%85%E9%BB%8E%E6%98%8E.mp3", BASE + "audio/revelacion/Triumph%20des%20%C3%89toiles.mp3", BASE + "audio/legendaria/L%27Appel%20du%20Roi.mp3", BASE + "audio/Soft%20Piano%20Bloom.mp3"];
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
self.addEventListener("push", event => {
 let data={};try{data=event.data?event.data.json():{}}catch(_){}
 event.waitUntil(self.registration.showNotification(data.title||"¡Tu duelo LQDD ha terminado!",{
  body:data.body||"Tu rival ha completado la partida. Pulsa para ver el resultado.",
  icon:"./logo-lqdd.png",badge:"./logo-lqdd.png",tag:data.tag||"lqdd-duel-result",
  data:{url:data.url||"./"}
 }));
});
self.addEventListener("notificationclick", event => {
 event.notification.close();
 const target=new URL(event.notification.data?.url||"./",self.location.origin).href;
 event.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(list=>{
  for(const client of list){if(client.url.startsWith(self.location.origin)&&"focus" in client){client.navigate(target);return client.focus();}}
  return self.clients.openWindow?self.clients.openWindow(target):undefined;
 }));
});
