const ROUTES = {
  ABOUT: '/about',
  ERROR_500: '/500',
  FORUM: '/forum',
  GAME: '/game',
  GAME_START: '/game/start',
  LEADERBOARD: '/leaderboard',
  LOGIN: '/sign-in',
  MAIN: '/',
  PROFILE: '/profile',
  PROFILE_AVATAR: '/profile/changeAvatar',
  PROFILE_PASSWORD: '/profile/changePassword',
  REGISTRATION: '/sign-up',
  TOPIC_FORUM: '/forum/*',
  TOPIC_NEW: '/forum/new',
};


const CACHE_NAME = 'cache-v1'

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => cache.addAll(Object.values(ROUTES)))
      .catch(console.error)
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response
      }
      
      return fetch(event.request).then(response => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, response.clone())
            return response
          })
        }
      )
    })
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          return caches.delete(cacheName)
        })
      )
    })
  )
})