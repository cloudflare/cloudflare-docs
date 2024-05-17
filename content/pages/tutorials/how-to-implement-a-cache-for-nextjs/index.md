---
updated: 2024-05-16
pcx_content_type: tutorial
content_type: 📝 Tutorial
difficulty: Beginner
title: How to implement a cache for Next.js apps on Cloudflare Pages
---

# How to Implement a Cache for Next.js Apps on Cloudflare Pages

## Introduction

Recently, Next.js has introduced caching mechanisms primarily supported on Vercel. However, thanks to the [`next-on-pages`](https://github.com/cloudflare/next-on-pages/blob/main/packages/next-on-pages/docs/caching.md) package, some of these caching mechanisms can also be used on Cloudflare. The extended [`fetch`](https://nextjs.org/docs/app/api-reference/functions/fetch) and [`unstable_cache`](https://nextjs.org/docs/app/api-reference/functions/unstable_cache) functions, which utilize the [data cache](https://nextjs.org/docs/app/building-your-application/caching#data-cache) mechanism, can work with Cloudflare's Cache API or Workers KV. One downside is that you can only use one of them (Cache API or Worker KV) for your entire project.

In this tutorial, you will implement a basic cache based on the `next-on-pages` adapters, enabling you to leverage both Cache API and Workers KV simultaneously in your Next.js projects. This approach allows you to explicitly control the caching behavior while maintaining the benefits Next.js development tooling such as [HMR](https://nextjs.org/docs/architecture/fast-refresh). Note that this tutorial does not cover creating a full [cache handler](https://nextjs.org/docs/app/api-reference/next-config-js/incrementalCacheHandlerPath) for Next.js.

## Prerequisites

- [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed.
- Basic understanding of Cloudflare Pages and Next.js caching concepts is assumed.

## Setup

### Create a new Next.js project via `create-cloudflare` CLI

Create your Next.js project using your preferred package manager. If you have an existing project, update or install the necessary dependencies introduced in the recent versions of `next-on-pages` to [setup bindings](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-nextjs-site/#set-up-bindings-for-local-development) for local development.

```sh
$ npm create cloudflare@latest my-next-app -- --framework=next
```

### Create KV namespace

1. You can create a KV namespace using the [Wrangler CLI](https://developers.cloudflare.com/kv/get-started/#create-a-kv-namespace-via-wrangler). You can give any name to the namespace:

```sh
$ wrangler kv:namespace create <YOUR_NAMESPACE>
```

2. Add the KV binding to your already created `wrangler.toml` file with the generated ID from the output of the previous command. The binding name will be `KV_CACHE`:

```diff
---
filename: wrangler.toml
highlight: [2-4]
---
# ...
+ kv_namespaces = [
+    { binding = "KV_CACHE", id = "<YOUR_ID>" }
+ ]
```

### Setup development environment

The latest `next-on-pages` package provides a local development cloudflare integration for Next.js projects. However, at the time of writing this tutorial, there isn't a way to persist Cache API data between requests using `next dev`. The [cf-bindings-proxy](https://github.com/james-elicx/cf-bindings-proxy) package provides a way to persist the data between requests in development mode, access bindings, and can also be used with other JavaScript frameworks.

Install the `cf-bindings-proxy` package using your preferred package manager:

```sh
$ npm i cf-bindings-proxy
```

Update the `package.json`:

```diff
---
filename: package.json
highlight: 10
---
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "pages:build": "npx @cloudflare/next-on-pages",
  "preview": "npm run pages:build && wrangler pages dev",
  "deploy": "npm run pages:build && wrangler pages deploy",
  "cf-typegen": "wrangler types --env-interface CloudflareEnv env.d.ts",
+ "dev:proxy": "cf-bindings-proxy"
}
```

### Run development mode

You need to run two commands. The first one is to start the `cf-bindings-proxy` server and the second one starts the Next.js development server.

```sh
# Run the proxy server
$ npm run dev:proxy
```

```sh
# Run the Next.js development server
$ npm run dev
```

## Implement adapters for Cache API and Workers KV

You will implement the adapters for Cache API and Workers KV based on [`next-on-pages` adapters](https://github.com/cloudflare/next-on-pages/tree/2d55e8ffb6a7bc779cb962582e76bc5f6fa3005f/packages/next-on-pages/templates/cache) with additional changes.

### Shape of the cache entry

```ts
---
filename: src/lib/cache/base-cache.ts
---
export type CacheEntry = {
  value: unknown;
  ttl: number;
  swr: number;
  lastModified: number;
};
```

### Create an abstract cache class

Create an abstract cache class that will be extended by the Cache API and Worker KV adapters.

1. The `BaseCache` class will have three methods that will be implemented by the Cache API and KV adapters.
2. The `buildCacheKey` method that is necessary because the `.put` method from Cache API requires a URL.
3. There are also `deserialize` and `serialize` methods needed to store and retrieve the cache entry.

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
---
filename: src/lib/cache/base-cache.js
highlight: [5-31]
---
import { getRequestContext } from "@cloudflare/next-on-pages";

export class BaseCache {
  // These are the methods that the adapters will implement
  get(key) {
    /* Should Implement method */
  }
  set(key, value) {
    /* Should Implement method */
  }
  delete(key) {
    /* Should Implement method */
  }

  // Cache key must be a URL since Cache API requires it.
  // https://github.com/cloudflare/next-on-pages/blob/2d55e8ffb6a7bc779cb962582e76bc5f6fa3005f/packages/next-on-pages/templates/cache/adaptor.ts#L237
  public buildCacheKey(key) {
    return `https://CACHE_CF.local/entry/${key}`;
  }

	// These are the basic serialization/deserialization methods
  public deserialize(entry) {
    try {
      return JSON.parse(entry)
    } catch (e) {
      return null;
    }
  }
  public serialize(entry) {
    return JSON.stringify(entry);
  }
}
```

{{</tab>}}
{{<tab label="ts">}}

```ts
---
filename: src/lib/cache/base-cache.ts
highlight: [12-32]
---
import { getRequestContext } from "@cloudflare/next-on-pages";

export type CacheEntry = {
  value: unknown;
  ttl: number;
  swr: number;
  lastModified: number;
};

export abstract class BaseCache {
  // These are the abstract methods that the adapters will implement
  public abstract get(key: string): Promise<CacheEntry | null>;
  public abstract set(key: string, value: CacheEntry): Promise<void>;
  public abstract delete(key: string): Promise<void>;

  // Cache key must be a URL since Cache API requires it.
  // https://github.com/cloudflare/next-on-pages/blob/2d55e8ffb6a7bc779cb962582e76bc5f6fa3005f/packages/next-on-pages/templates/cache/adaptor.ts#L237
  public buildCacheKey(key: string) {
    return `https://CACHE_CF.local/entry/${key}`;
  }

	// These are the basic serialization/deserialization methods
  public deserialize(entry: string): CacheEntry | null {
    try {
      return JSON.parse(entry) as CacheEntry;
    } catch (e) {
      return null;
    }
  }
  public serialize(entry: CacheEntry) {
    return JSON.stringify(entry);
  }
}
```

{{</tab>}}
{{</tabs>}}

### Additional methods

With these basic methods, you can now create more complex methods. The `cache` method retrieves a value from the cache or generates a new one if the cache is missing or expired. It first checks the cache entry's validity based on `ttl` (time-to-live) and `swr` (stale-while-revalidate) parameters. If valid, it returns the cached value; if stale, it updates the cache asynchronously; if expired or missing, it generates a new value, updates the cache asynchronously, and returns the new value. This ensures efficient data retrieval and freshness.

The use of `waitUntil` from the request context is useful to handle non-blocking operations. In older `next-on-pages` versions, you couldn’t get access to the execution context as easily. You'd need to use the `internal_runWithWaitUntil` [function](https://github.com/vercel/next.js/issues/50522#issuecomment-1838593482) from Next.js or `waitUntil` function from the [@vercel/functions](https://vercel.com/docs/functions/functions-api-reference#waituntil) package.

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
---
filename: src/lib/cache/base-cache.js
highlight: [33-102]
---
import { getRequestContext } from "@cloudflare/next-on-pages";

export class BaseCache {
  // These are the methods that the adapters will implement
  get(key) {
    /* Should Implement method */
  }
  set(key, value) {
    /* Should Implement method */
  }
  delete(key) {
    /* Should Implement method */
  }

  // Cache key should be a URL in Cache API
  // https://github.com/cloudflare/next-on-pages/blob/2d55e8ffb6a7bc779cb962582e76bc5f6fa3005f/packages/next-on-pages/templates/cache/adaptor.ts#L237
  buildCacheKey(key) {
    return `https://CACHE_CF.local/entry/${key}`;
  }

  deserialize(entry) {
    try {
      return JSON.parse(entry);
    } catch (e) {
      return null;
    }
  }

  serialize(entry) {
    return JSON.stringify(entry);
  }

  async storeCacheEntry(key, result, ttl, swr) {
    await this.set(key, {
      value: result,
      ttl,
      swr,
      lastModified: Date.now(),
    }).catch((err) => {
      console.error("[Cache]: Failed to cache result", key, err);
    });
  }

  // Retrieve or generate a value, caching the result
  async cache(getValue, key, ttl, swr) {
    const cacheEntry = await this.get(key);
    if (cacheEntry) {
      const { shouldRevalidate, blocking } = this.determineRevalidation(
        cacheEntry,
        { ttl, swr },
      );
      if (!shouldRevalidate) {
        // Cache HIT: return cached value
        return cacheEntry.value;
      }
      if (!blocking) {
        // Cache STALE: revalidate asynchronously
        const reqCtx = getRequestContext().ctx;
        reqCtx.waitUntil(
          getValue().then(async (newValue) =>
            this.storeCacheEntry(key, newValue, ttl, swr),
          ),
        );
        return cacheEntry.value;
      }
    }
    // Cache EXPIRED or MISS: revalidate synchronously
    const newValue = await getValue();
    const reqCtx = getRequestContext().ctx;
    // asynchronous cache set
    reqCtx.waitUntil(this.storeCacheEntry(key, newValue, ttl, swr));
    return newValue;
  }

  // Determine if a cache entry should be revalidated
  determineRevalidation(cacheEntry, currentCacheOptions) {
    const { lastModified, ttl: cachedTtl, swr: cachedSwr } = cacheEntry;
    const { ttl, swr } = currentCacheOptions;
    const now = Date.now();
    const age = now - lastModified;
    const maxStaleTime = ttl + swr;

    // If the cache options (TTL or SWR) have changed, mark for revalidation
    let shouldRevalidate = cachedTtl !== ttl || cachedSwr !== swr;
    let blocking = false;

    if (age <= ttl * 1000) {
      // Cache hit: cache entry is fresh
      shouldRevalidate = false;
    } else if (age > ttl * 1000 && age <= maxStaleTime * 1000) {
      // Cache stale: the cache entry is stale but within the SWR period
      shouldRevalidate = true;
    } else if (age > maxStaleTime * 1000) {
      // Cache expired: The cache entry has exceeded the maximum age (TTL + SWR)
      // In practice, this case might rarely be reached as cache API or KV return null for expired entries
      shouldRevalidate = true;
      blocking = true;
    }

    return { shouldRevalidate, blocking };
  }
}
```

{{</tab>}}
{{<tab label="ts">}}

```ts
---
filename: src/lib/cache/base-cache.ts
highlight: [34-114]
---
import { getRequestContext } from "@cloudflare/next-on-pages";

export type CacheEntry = {
  value: unknown;
  ttl: number;
  swr: number;
  lastModified: number;
};

export abstract class BaseCache {
  // These are the abstract methods that the adapters will implement
  public abstract get(key: string): Promise<CacheEntry | null>;
  public abstract set(key: string, value: CacheEntry): Promise<void>;
  public abstract delete(key: string): Promise<void>;

  // Cache key must be a URL since Cache API requires it.
  // https://github.com/cloudflare/next-on-pages/blob/2d55e8ffb6a7bc779cb962582e76bc5f6fa3005f/packages/next-on-pages/templates/cache/adaptor.ts#L237
  public buildCacheKey(key: string) {
    return `https://CACHE_CF.local/entry/${key}`;
  }

  // These are the basic serialization/deserialization methods
  public deserialize(entry: string): CacheEntry | null {
    try {
      return JSON.parse(entry) as CacheEntry;
    } catch (e) {
      return null;
    }
  }
  public serialize(entry: CacheEntry) {
    return JSON.stringify(entry);
  }

  private async storeCacheEntry<T>(
    key: string,
    result: T,
    ttl: number,
    swr: number,
  ) {
    await this.set(key, {
      value: result,
      ttl,
      swr,
      lastModified: Date.now(),
    }).catch((err) => {
      console.error("[Cache]: Failed to cache result", key, err);
    });
  }

  // Retrieve or generate a value, caching the result
  public async cache<T>(
    getValue: () => Promise<T>,
    key: string,
    ttl: number,
    swr: number,
  ): Promise<T> {
    const cacheEntry = await this.get(key);
    if (cacheEntry) {
      const { shouldRevalidate, blocking } = this.determineRevalidation(
        cacheEntry,
        { ttl, swr },
      );
      if (!shouldRevalidate) {
        // Cache HIT: return cached value
        return cacheEntry.value as T;
      }
      if (!blocking) {
        // Cache STALE: revalidate asynchronously
        const reqCtx = getRequestContext().ctx;
        reqCtx.waitUntil(
          getValue().then(async (newValue) =>
            this.storeCacheEntry(key, newValue, ttl, swr),
          ),
        );
        return cacheEntry.value as T;
      }
    }
    // Cache EXPIRED or MISS: revalidate synchronously
    const newValue = await getValue();
    const reqCtx = getRequestContext().ctx;
    // Asynchronous cache set
    reqCtx.waitUntil(this.storeCacheEntry(key, newValue, ttl, swr));
    return newValue;
  }

  // Determine if a cache entry should be revalidated
  private determineRevalidation(
    cacheEntry: CacheEntry,
    currentCacheOptions: { ttl: number; swr: number },
  ): { shouldRevalidate: boolean; blocking: boolean } {
    const { lastModified, ttl: cachedTtl, swr: cachedSwr } = cacheEntry;
    const { ttl, swr } = currentCacheOptions;
    const now = Date.now();
    const age = now - lastModified;
    const maxStaleTime = ttl + swr;

    // If the cache options (TTL or SWR) have changed, mark for revalidation
    let shouldRevalidate = cachedTtl !== ttl || cachedSwr !== swr;
    let blocking = false;

    if (age <= ttl * 1000) {
      // Cache hit: cache entry is fresh
      shouldRevalidate = false;
    } else if (age > ttl * 1000 && age <= maxStaleTime * 1000) {
      // Cache stale: the cache entry is stale but within the SWR period
      shouldRevalidate = true;
    } else if (age > maxStaleTime * 1000) {
      // Cache expired: The cache entry has exceeded the maximum age (TTL + SWR)
      // In practice, this case might rarely be reached as cache API or KV return null for expired entries
      shouldRevalidate = true;
      blocking = true;
    }
    return { shouldRevalidate, blocking };
  }
}
```

{{</tab>}}
{{</tabs>}}

### Implement Cache API and Workers KV adapters

For the cache adapters you'll need these two classes that implement the `get` , `set`, and `delete` methods.

When using Cache API, [`caches`](https://developers.cloudflare.com/workers/runtime-apis/cache/) , on a Next.js project in development mode, the stored data does not get persisted, resulting in cache misses on every `match`. The `cf-bindings-proxy` package provides a way to interface with `caches` persistently. That’s why it’s used in the `CacheApiAdapter` class.

If you need a more sophisticated error handling, you could add it.

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
---
filename: src/lib/cache/cache-api.js
---
import { BaseCache } from "./base-cache";
import { cacheApi } from "cf-bindings-proxy";

export class CacheApiAdapter extends BaseCache {
  CACHE_NAME = "__cache-api";

  async get(key) {
    const dataCache = await cacheApi(this.CACHE_NAME);
    const value = await dataCache
      .match(this.buildCacheKey(key))
      .then((response) => (response ? response.text() : null))
      .catch((err) => {
        console.error("[Cache API]: Failed to get entry", key, err);
        return null;
      });
    return value ? this.deserialize(value) : null;
  }

  async set(key, value) {
    const dataCache = await cacheApi(this.CACHE_NAME);
    const cacheEntry = this.serialize(value);
    const response = new Response(cacheEntry, {
      headers: new Headers({
        "Cache-Control": `s-maxage=${value.ttl + value.swr}`,
      }),
    });
    await dataCache.put(this.buildCacheKey(key), response).catch((err) => {
      console.error("[Cache API]: Failed to set entry", key, err);
    });
  }

  async delete(key) {
    const dataCache = await cacheApi(this.CACHE_NAME);
    await dataCache.delete(this.buildCacheKey(key)).catch((err) => {
      console.error("[Cache API]: Failed to delete entry", key, err);
    });
  }
}
```

{{</tab>}}
{{<tab label="ts">}}

```ts
---
filename: src/lib/cache/cache-api.ts
---
import type { Response as ResponseCF } from "@cloudflare/workers-types";
import { BaseCache, type CacheEntry } from "./base-cache";
import { cacheApi } from "cf-bindings-proxy";

export class CacheApiAdapter extends BaseCache {
  private CACHE_NAME = "__cache-api";

  public async get(key: string): Promise<CacheEntry | null> {
    const dataCache = await cacheApi(this.CACHE_NAME);
    const value = await dataCache
      .match(this.buildCacheKey(key))
      .then((response) => (response ? response.text() : null))
      .catch((err) => {
        console.error("[Cache API]: Failed to get entry", key, err);
        return null;
      });
    return value ? this.deserialize(value) : null;
  }

  public async set(key: string, value: CacheEntry): Promise<void> {
    const dataCache = await cacheApi(this.CACHE_NAME);
    const cacheEntry = this.serialize(value);
    const response = new Response(cacheEntry, {
      headers: new Headers({
        "Cache-Control": `s-maxage=${value.ttl + value.swr}`,
      }),
    }) as unknown as ResponseCF;
    await dataCache.put(this.buildCacheKey(key), response).catch((err) => {
      console.error("[Cache API]: Failed to set entry", key, err);
    });
  }

  public async delete(key: string): Promise<void> {
    const dataCache = await cacheApi(this.CACHE_NAME);
    await dataCache.delete(this.buildCacheKey(key)).catch((err) => {
      console.error("[Cache API]: Failed to delete entry", key, err);
    });
  }
}
```

{{</tab>}}
{{</tabs>}}

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
---
filename: src/lib/cache/kv.js
---
import { BaseCache } from "./base-cache";
import { getRequestContext } from "@cloudflare/next-on-pages";

export class KVCacheAdapter extends BaseCache {
  async get(key) {
    const kv = getRequestContext().env.KV_CACHE;
    const value = await kv.get(this.buildCacheKey(key)).catch((err) => {
      console.error("[KV]: Failed to get entry", key, err);
      return null;
    });
    return value ? this.deserialize(value) : null;
  }

  async set(key, value) {
    const kv = getRequestContext().env.KV_CACHE;
    const cacheEntry = this.serialize(value);
    return kv
      .put(this.buildCacheKey(key), cacheEntry, {
        expirationTtl: value.ttl + value.swr,
      })
      .catch((err) => {
        console.error("[KV]: Failed to set entry", key, err);
      });
  }

  async delete(key) {
    const kv = getRequestContext().env.KV_CACHE;
    return kv.delete(this.buildCacheKey(key)).catch((err) => {
      console.error("[KV]: Failed to delete entry", key, err);
    });
  }
}
```

{{</tab>}}
{{<tab label="ts">}}

```ts
---
filename: src/lib/cache/kv.ts
---
import { BaseCache, type CacheEntry } from "./base-cache";
import { getRequestContext } from "@cloudflare/next-on-pages";

export class KVCacheAdapter extends BaseCache {
  public async get(key: string): Promise<CacheEntry | null> {
    const kv = getRequestContext().env.KV_CACHE;
    const value = await kv.get(this.buildCacheKey(key)).catch((err) => {
      console.error("[KV]: Failed to get entry", key, err);
      return null;
    });
    return value ? this.deserialize(value) : null;
  }

  public async set(key: string, value: CacheEntry): Promise<void> {
    const kv = getRequestContext().env.KV_CACHE;
    const cacheEntry = this.serialize(value);
    return kv
      .put(this.buildCacheKey(key), cacheEntry, {
        expirationTtl: value.ttl + value.swr,
      })
      .catch((err) => {
        console.error("[KV]: Failed to set entry", key, err);
      });
  }

  public async delete(key: string): Promise<void> {
    const kv = getRequestContext().env.KV_CACHE;
    return kv.delete(this.buildCacheKey(key)).catch((err) => {
      console.error("[KV]: Failed to delete entry", key, err);
    });
  }
}
```

{{</tab>}}
{{</tabs>}}

### Create cache functions

This cache function has a similar API to the [cachified](https://github.com/epicweb-dev/cachified) package.

You'll also define an invalidation mechanism. In this case, it simply purges the cache key.

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
---
filename: src/lib/cache/functions/cache-cf.js
---
import { KVCacheAdapter } from "../kv";
import { CacheApiAdapter } from "../cache-api";

const kv = new KVCacheAdapter();
const cacheApi = new CacheApiAdapter();

export async function cacheCf({ key, getValue, ttl, swr = 0 }, strategy) {
  const dataCache = getDataCacheCf(strategy);
  return dataCache.cache(getValue, key, ttl, swr);
}

/**
 * Get the cache adapter based on the strategy
 * @param {'kv'|'cache-api'} adapter
 * @returns {KVCacheAdapter | CacheApiAdapter}
 */
export function getDataCacheCf(adapter) {
  return adapter === "kv" ? kv : cacheApi;
}

/**
 * Invalidate the cache entry
 * @param {string} key
 * @param {'kv'|'cache-api'} strategy
 * @returns {Promise<void>}
 */
export async function invalidateCacheCf(key, strategy) {
  const dataCache = getDataCacheCf(strategy);
  await dataCache.delete(key);
}
```

{{</tab>}}
{{<tab label="ts">}}

```ts
---
filename: src/lib/cache/functions/cache-cf.ts
---
import { KVCacheAdapter } from "../kv";
import { CacheApiAdapter } from "../cache-api";

const kv = new KVCacheAdapter();
const cacheApi = new CacheApiAdapter();
type CallbackNoArgs<T> = () => Promise<T>;

type Options<T> = {
  key: string;
  getValue: CallbackNoArgs<T>;
  ttl: number;
  swr?: number;
};

export async function cacheCf<T>(
  { key, getValue, ttl, swr = 0 }: Options<T>,
  strategy: "kv" | "cache-api" = "kv",
): Promise<T> {
  // You can include validation logic for ttl and swr values.
  // E.g., KV minimum ttl is 60 seconds
  const dataCache = getDataCacheCf(strategy);
  return dataCache.cache(getValue, key, ttl, swr) as Promise<T>;
}

export function getDataCacheCf(adapter: "kv" | "cache-api") {
  return adapter === "kv" ? kv : cacheApi;
}

export async function invalidateCacheCf(
  key: string,
  strategy: "kv" | "cache-api",
) {
  const dataCache = getDataCacheCf(strategy);
  await dataCache.delete(key);
}
```

{{</tab>}}
{{</tabs>}}

## Server components and server actions example use case

In a Next.js project, the cache functions can be used in server components, server actions, or route APIs with a good developer experience. One limitation of the implemented cache functions is that you can't use them with [`revalidateTag`](https://nextjs.org/docs/app/api-reference/functions/revalidateTag), but you can use them with [`revalidatePath`](https://nextjs.org/docs/app/api-reference/functions/revalidatePath).

This example fetches a random Hacker News story and displays the title. It also revalidates the story on demand when using the form via server actions.

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
---
filename: src/app/page.jsx
---
import { revalidatePath } from "next/cache";
import { cacheCf, invalidateCacheCf } from "@/lib/cache/functions/cache-cf";

export const runtime = "edge";

async function getRandomStory() {
  return fetch("https://hacker-news.firebaseio.com/v0/newstories.json", {
    next: { revalidate: 0 },
  })
    .then((response) => response.json())
    .then(async (storyIds) => {
      const randomIdx = Math.floor(Math.random() * storyIds.length);
      const storyId = storyIds[randomIdx];
      return fetch(
        `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`,
        { next: { revalidate: 0 } },
      )
        .then((response) => response.json())
        .then((story) => {
          return story.title
        });
    });
}

async function getRandomHN_cacheCf() {
  return cacheCf(
    {
      key: "random-hn",
      async getValue() {
        const story = await getRandomStory();
        return { story };
      },
      ttl: 20,
      swr: 40,
    },
    "kv",
  );
}

async function refetchRandomHN() {
  "use server";
  await invalidateCacheCf("random-hn", "kv");
  revalidatePath("/");
}

export default async function Home() {
  const start = Date.now();
  const { story } = await getRandomHN_cacheCf();
  const duration = Date.now() - start;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <p>news: {story}</p>
      <p>duration: {duration}ms</p>
      <form action={refetchRandomHN}>
        <button className="border-2 rounded-xl px-2 py-1">invalidate</button>
      </form>
    </main>
  );
}
```

{{</tab>}}
{{<tab label="ts">}}

```ts
---
filename: src/app/page.tsx
---
import { revalidatePath } from "next/cache";
import { cacheCf, invalidateCacheCf } from "@/lib/cache/functions/cache-cf";

export const runtime = "edge";

async function getRandomStory() {
  return fetch("https://hacker-news.firebaseio.com/v0/newstories.json", {
    next: { revalidate: 0 },
  })
    .then((response) => response.json())
    .then(async (storyIds: any) => {
      const randomIdx = Math.floor(Math.random() * storyIds.length);
      const storyId = storyIds[randomIdx];
      return fetch(
        `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`,
        { next: { revalidate: 0 } },
      )
        .then((response) => response.json())
        .then((story: any) => {
          return story.title as string;
        });
    });
}

async function getRandomHN_cacheCf() {
  return cacheCf(
    {
      key: "random-hn",
      async getValue() {
        const story = await getRandomStory();
        return { story };
      },
      ttl: 20,
      swr: 40,
    },
    "kv",
  );
}

async function refetchRandomHN() {
  "use server";
  await invalidateCacheCf("random-hn", "kv");
  revalidatePath("/");
}

export default async function Home() {
  const start = Date.now();
  const { story } = await getRandomHN_cacheCf();
  const duration = Date.now() - start;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <p>news: {story}</p>
      <p>duration: {duration}ms</p>
      <form action={refetchRandomHN}>
        <button className="border-2 rounded-xl px-2 py-1">invalidate</button>
      </form>
    </main>
  );
}
```

{{</tab>}}
{{</tabs>}}