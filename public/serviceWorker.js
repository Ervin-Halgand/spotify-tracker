let cacheData = "appV1";

this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                '/static/js/main.chunk.js',
                '/static/js/0.chunk.js',
                '/static/js/bundle.js',
                '/index.html',
                '/login',
                '/',
            ])
        })
    )
})

this.addEventListener("fetch", (event) => {
    if (!navigator.onLine)
        event.respondWith(async function () {
            try {
                var res = await fetch(event.request);
                var cache = await caches.open('cache');
                cache.put(event.request.url, res.clone());
                return res;
            }
            catch (error) {
                return caches.match(event.request);
            }
        }());
})