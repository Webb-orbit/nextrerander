const addResourcesToCache = async (resources) => {
  const cache = await caches.open("v1");
  await cache.addAll(resources);
};

self.addEventListener("install", (event) => {
  event.waitUntil(
    addResourcesToCache([
      '/', '/hello.js', '/offline.html'
    ]),
  );
});

const putInCache = async (request, response) => {
  const cache = await caches.open("v1");
  await cache.put(request, response);
};

const cacheFirst = async ({ request, fallbackUrl }) => {
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }
  try {
    const responseFromNetwork = await fetch(request);
    putInCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
  } catch (error) {
    const fallbackResponse = await caches.match(fallbackUrl);
    if (fallbackResponse) {
      return fallbackResponse;
    }
  }
};

self.addEventListener("fetch", (event) => {
  if (event.request.method === 'GET') {
    event.respondWith(
      cacheFirst({
        request: event.request,
        fallbackUrl: "/offline.html",
      }),
    );
  }
});
// http://localhost:3000/doc/671f7235a0e16867e402db28?