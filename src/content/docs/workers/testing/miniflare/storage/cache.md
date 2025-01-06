---
order: 4
title: ✨ Cache
---

- [Cache Reference](/workers/runtime-apis/cache)
- [How the Cache works](/workers/reference/how-the-cache-works/#cache-api)
  (note that cache using `fetch` is unsupported)

## Default Cache

Access to the default cache is enabled by default:

```js
addEventListener("fetch", (e) => {
	e.respondWith(caches.default.match("http://miniflare.dev"));
});
```

## Named Caches

You can access a namespaced cache using `open`. Note that you cannot name your
cache `default`, trying to do so will throw an error:

```js
await caches.open("cache_name");
```

## Persistence

By default, cached data is stored in memory. It will persist between reloads,
but not different `Miniflare` instances. To enable
persistence to the file system, specify the cache persistence option:

```js
const mf = new Miniflare({
	cachePersist: true, // Defaults to ./.mf/cache
	cachePersist: "./data", // Custom path
});
```

## Manipulating Outside Workers

For testing, it can be useful to put/match data from cache outside a Worker. You
can do this with the `getCaches` method:

```js {23,24,25,26,27,28,29,30,31,32}
import { Miniflare, Response } from "miniflare";

const mf = new Miniflare({
	modules: true,
	script: `
  export default {
    async fetch(request) {
      const url = new URL(request.url);
      const cache = caches.default;
      if(url.pathname === "/put") {
        await cache.put("https://miniflare.dev/", new Response("1", {
          headers: { "Cache-Control": "max-age=3600" },
        }));
      }
      return cache.match("https://miniflare.dev/");
    }
  }
  `,
});
let res = await mf.dispatchFetch("http://localhost:8787/put");
console.log(await res.text()); // 1

const caches = await mf.getCaches(); // Gets the global caches object
const cachedRes = await caches.default.match("https://miniflare.dev/");
console.log(await cachedRes.text()); // 1

await caches.default.put(
	"https://miniflare.dev",
	new Response("2", {
		headers: { "Cache-Control": "max-age=3600" },
	}),
);
res = await mf.dispatchFetch("http://localhost:8787");
console.log(await res.text()); // 2
```

## Disabling

Both default and named caches can be disabled with the `disableCache` option.
When disabled, the caches will still be available in the sandbox, they just
won't cache anything. This may be useful during development:

```js
const mf = new Miniflare({
	cache: false,
});
```
