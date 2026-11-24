// PoongYub service worker: เปิดเร็ว + ใช้ได้ตอนเน็ตหลุด
const V = 'py-v1';
const CORE = ['./', 'index.html', 'shim.js', 'config.js', 'plus.js', 'loy.js', 'manifest.webmanifest', 'icon-192.png', 'poong-head.webp', 'poong-welcome.webp'];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return; // Firebase/Google/AI ไม่แคช
  const isPage = e.request.mode === 'navigate' || /\.(html|js)$/.test(u.pathname) || u.pathname.endsWith('/');
  if (isPage) { // network-first: ได้โค้ดใหม่ทันทีที่อัปเดต
    e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(V).then(x => x.put(e.request, c)); return r; }).catch(() => caches.match(e.request, { ignoreSearch: true })));
  } else { // cache-first: รูป, json
    e.respondWith(caches.match(e.request).then(m => m || fetch(e.request).then(r => { const c = r.clone(); caches.open(V).then(x => x.put(e.request, c)); return r; })));
  }
});
