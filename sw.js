// Offline: alla appens filer sparas i telefonen. Ingen data skickas någonstans.
const CACHE = 'personalliggare-30968757';
const FILES = ['./', './index.html', './pc.html', './manifest.webmanifest', './manifest-pc.webmanifest', './icon-192.png', './icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
// Påminnelser i bakgrunden (Android/Chrome): läser bara datum utan namn
function remGet() { return new Promise(res => { try { const r = indexedDB.open('personalliggare', 1); r.onupgradeneeded = () => r.result.createObjectStore('kv');
  r.onsuccess = () => { const db = r.result; const g = db.transaction('kv', 'readonly').objectStore('kv').get('reminders'); g.onsuccess = () => res({ db, val: g.result }); g.onerror = () => res({}); }; r.onerror = () => res({}); } catch (e) { res({}); } }); }
async function checkReminders() {
  const { db, val } = await remGet(); if (!db || !val || !val.on || !val.items) return;
  const n = new Date(); const t = Math.round((Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()) - Date.UTC(1899, 11, 30)) / 864e5);
  const notified = new Set(val.notified || []); const active = val.items.filter(i => i.from <= t); const fresh = active.filter(i => !notified.has(i.k));
  try { if (self.navigator.setAppBadge) { if (active.length) await self.navigator.setAppBadge(active.length); else await self.navigator.clearAppBadge(); } } catch (e) {}
  if (fresh.length) await self.registration.showNotification('Personalliggare', { body: fresh.length === 1 ? 'En behörighet går snart ut eller har gått ut. Öppna appen för att se vilken.' : fresh.length + ' behörigheter går snart ut eller har gått ut. Öppna appen för att se vilka.', tag: 'personalliggare', icon: 'icon-192.png' });
  val.notified = active.map(i => i.k); db.transaction('kv', 'readwrite').objectStore('kv').put(val, 'reminders');
}
self.addEventListener('periodicsync', e => { if (e.tag === 'reminders') e.waitUntil(checkReminders()); });
self.addEventListener('notificationclick', e => { e.notification.close(); e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => cs.length ? cs[0].focus() : self.clients.openWindow('./'))); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(hit => {
    const net = fetch(e.request).then(r => { if (r.ok) { const cp = r.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); } return r; }).catch(() => hit);
    return hit || net;
  }));
});
