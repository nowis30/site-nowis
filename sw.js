// Service Worker de la PWA Héritier Millionnaire
// Stratégie: precache statique + cache-first pour navigation, avec fallback hors-ligne.
const VERSION = 'v2';
const STATIC_CACHE = `static-${VERSION}`;
const ASSETS = [
	'/',
	'/index.html',
	'/offline.html',
	'/telechargement.html',
	'/manifest.json',
	'/icons/icon.svg',
	'/icons/icon-192.png',
	'/icons/icon-512.png',
	'/icons/icon-512-maskable.png'
];

self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(STATIC_CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
	);
});

self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('static-') && k !== STATIC_CACHE).map(k => caches.delete(k))))
			.then(() => self.clients.claim())
	);
});

// Network + fallback offline pour navigations
self.addEventListener('fetch', event => {
	const req = event.request;
	if (req.mode === 'navigate') {
		event.respondWith(
			fetch(req).catch(() => caches.match('/offline.html'))
		);
		return;
	}
	// Cache-first pour assets
	event.respondWith(
		caches.match(req).then(cached => cached || fetch(req).then(res => {
			// Mise en cache opportuniste (GET uniquement, statut OK)
			if (req.method === 'GET' && res.status === 200 && res.type === 'basic') {
				const copy = res.clone();
				caches.open(STATIC_CACHE).then(cache => cache.put(req, copy));
			}
			return res;
		}).catch(() => cached))
	);
});
