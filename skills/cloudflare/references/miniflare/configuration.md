# Configuration

## Script Loading

**Inline:**
```js
new Miniflare({ modules: true, script: `export default { ... }` });
```

**File-based:**
```js
new Miniflare({ scriptPath: "worker.js" });
```

**Multi-module auto-crawl:**
```js
new Miniflare({
  scriptPath: "src/index.js",
  modules: true,
  modulesRules: [
    { type: "ESModule", include: ["**/*.js"] },
    { type: "Text", include: ["**/*.txt"] },
  ],
});
```

**Explicit modules:**
```js
new Miniflare({
  modules: [
    { type: "ESModule", path: "src/index.js" },
    { type: "Text", path: "data.txt" },
  ],
});
```

## Compatibility

```js
new Miniflare({
  compatibilityDate: "2021-11-23",
  compatibilityFlags: ["formdata_parser_supports_files"],
  upstream: "https://example.com",
});
```

## Server Options

```js
new Miniflare({
  port: 8787,
  host: "127.0.0.1",
  https: true, // Self-signed cert
  httpsKeyPath: "./key.pem",
  httpsCertPath: "./cert.pem",
});
```

**Request.cf:**
```js
cf: true,        // Fetch from Cloudflare
cf: "cf.json",   // Load from file
cf: false,       // Disable
```

## Storage Bindings

**KV:**
```js
kvNamespaces: ["TEST_NAMESPACE", "CACHE"],
kvPersist: "./kv-data", // Optional: persist to disk
```

**R2:**
```js
r2Buckets: ["BUCKET", "IMAGES"],
r2Persist: "./r2-data",
```

**Durable Objects:**
```js
modules: true,
durableObjects: {
  COUNTER: "Counter", // className
  API_OBJECT: { className: "ApiObject", scriptName: "api-worker" },
},
durableObjectsPersist: "./do-data",
```

**D1:**
```js
d1Databases: ["DB"],
d1Persist: "./d1-data",
```

**Cache:**
```js
cache: true, // Default
cachePersist: "./cache-data",
cacheWarnUsage: true,
```

## Bindings

**Environment variables:**
```js
bindings: {
  SECRET_KEY: "my-secret-value",
  API_URL: "https://api.example.com",
  DEBUG: true,
},
```

**WASM:**
```js
wasmBindings: { ADD_MODULE: "./add.wasm" },
```

**Text/Data blobs:**
```js
textBlobBindings: { TEXT: "./data.txt" },
dataBlobBindings: { DATA: "./data.bin" },
```

**Queue producers:**
```js
queueProducers: ["QUEUE"],
```

## Multiple Workers

```js
new Miniflare({
  host: "0.0.0.0",
  port: 8787,
  kvPersist: true,
  
  workers: [
    {
      name: "main-worker",
      kvNamespaces: { DATA: "shared-data" },
      serviceBindings: {
        API: "api-worker",
        async EXTERNAL(request) {
          return new Response("External response");
        },
      },
      modules: true,
      script: `export default { ... }`,
    },
    {
      name: "api-worker",
      kvNamespaces: { DATA: "shared-data" }, // Shared
      script: `addEventListener("fetch", ...)`,
    },
  ],
});
```

## Routing

```js
workers: [
  {
    name: "api",
    scriptPath: "./api/worker.js",
    routes: ["http://127.0.0.1/api/*", "api.example.com/*"],
  },
  {
    name: "web",
    scriptPath: "./web/worker.js",
    routes: ["example.com/*"],
  },
],
```

Update `/etc/hosts`: `127.0.0.1 api.example.com`

## Advanced

**Logging:**
```js
import { Log, LogLevel } from "miniflare";
new Miniflare({ log: new Log(LogLevel.DEBUG) }); // DEBUG, INFO, WARN, ERROR
```

**Live reload:**
```js
liveReload: true, // Auto-reload HTML on worker reload
```

**Workers Site:**
```js
sitePath: "./public",
siteInclude: ["**/*.html", "**/*.css"],
siteExclude: ["node_modules/**"],
```

## CLI Options

Miniflare doesn't read `wrangler.toml` - configure via API. For wrangler.toml configs, manually translate to Miniflare options.

See [api.md](./api.md) for full API reference.
