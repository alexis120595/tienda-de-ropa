const CACHE_NAME = 'vivere-v1'

// Archivos esenciales para cachear en la instalación
const PRECACHE_URLS = [
  '/',
  '/manifest.json',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
]

// Instalación: cachear recursos esenciales
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS)
    })
  )
  self.skipWaiting()
})

// Activación: limpiar caches anteriores
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    })
  )
  self.clients.claim()
})

// Fetch: Network first, fallback to cache
self.addEventListener('fetch', (event) => {
  // Solo cachear requests GET
  if (event.request.method !== 'GET') return

  // No cachear requests de API
  if (event.request.url.includes('/api/')) return

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clonar la respuesta para guardar en cache
        const responseClone = response.clone()
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone)
        })
        return response
      })
      .catch(() => {
        // Si falla la red, buscar en cache
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse
          // Fallback a la página principal para navegación
          if (event.request.mode === 'navigate') {
            return caches.match('/')
          }
        })
      })
  )
})
