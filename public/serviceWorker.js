let cacheData = "appV1";

this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                '/static/js/main.chunk.js',
                '/static/js/0.chunk.js',
                '/static/js/bundle.js',
                '/static/js/vendors~main.chunk.js',
                '/index.html',
                '/login',
                '/font/Baloo2-Bold.ttf',
                '/font/Baloo2-ExtraBold.ttf',
                '/font/Baloo2-Medium.ttf',
                '/font/Baloo2-Regular.ttf',
                '/font/Baloo2-SemiBold.ttf',
                '/images/spotify-logo.png',
                '/images/background-bottom.svg',
                '/images/background-top.svg',
                '/images/note-musics.svg',
                '/images/icon-genre.svg',
                '/images/icon-artist.svg',
                '/images/icon-music.svg'
            ])
        })
    )
})

this.addEventListener("fetch", (event) => {
    if (!navigator.onLine)
        event.respondWith(
            caches.match(event.request).then((res) => {
                if (res)
                    return res
                let requesturl = event.request.clone();
                fetch(requesturl);
            })
        )
})