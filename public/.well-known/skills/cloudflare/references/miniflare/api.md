# Programmatic API

## Miniflare Class

```typescript
class Miniflare {
  constructor(options: MiniflareOptions);
  ready: Promise<void>;
  dispose(): Promise<void>;
  setOptions(options: MiniflareOptions): Promise<void>;
  
  // Event dispatching
  dispatchFetch(url: string, init?: RequestInit): Promise<Response>;
  getWorker(): Promise<Worker>;
  
  // Bindings access
  getBindings(): Promise<Record<string, any>>;
  getKVNamespace(name: string): Promise<KVNamespace>;
  getR2Bucket(name: string): Promise<R2Bucket>;
  getDurableObjectNamespace(name: string): Promise<DurableObjectNamespace>;
  getDurableObjectStorage(id: DurableObjectId): Promise<DurableObjectStorage>;
  getD1Database(name: string): Promise<D1Database>;
  getCaches(): Promise<CacheStorage>;
  getQueueProducer(name: string): Promise<QueueProducer>;
}
```

## Event Dispatching

**Fetch (no HTTP server):**
```js
const res = await mf.dispatchFetch("http://localhost:8787/path", {
  method: "POST",
  headers: { "Authorization": "Bearer token" },
  body: JSON.stringify({ data: "value" }),
});
```

**Custom Host routing:**
```js
const res = await mf.dispatchFetch("http://localhost:8787/", {
  headers: { "Host": "api.example.com" },
});
```

**Scheduled:**
```js
const worker = await mf.getWorker();
const result = await worker.scheduled({ cron: "30 * * * *" });
// result: { outcome: "ok", noRetry: false }
```

**Queue:**
```js
const worker = await mf.getWorker();
const result = await worker.queue("queue-name", [
  { id: "msg1", timestamp: new Date(), body: "data", attempts: 1 },
]);
// result: { outcome: "ok", retryAll: false, ackAll: false, ... }
```

## Bindings Access

**Environment variables:**
```js
const bindings = await mf.getBindings();
console.log(bindings.SECRET_KEY);
```

**KV:**
```js
const ns = await mf.getKVNamespace("TEST_NAMESPACE");
await ns.put("key", "value");
const value = await ns.get("key");
```

**R2:**
```js
const bucket = await mf.getR2Bucket("BUCKET");
await bucket.put("file.txt", "content");
const object = await bucket.get("file.txt");
```

**Durable Objects:**
```js
const ns = await mf.getDurableObjectNamespace("COUNTER");
const id = ns.idFromName("test");
const stub = ns.get(id);
const res = await stub.fetch("http://localhost/");

// Access storage directly:
const storage = await mf.getDurableObjectStorage(id);
await storage.put("key", "value");
```

**D1:**
```js
const db = await mf.getD1Database("DB");
await db.exec(`CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT)`);
await db.prepare("INSERT INTO users (name) VALUES (?)").bind("Alice").run();
```

**Cache:**
```js
const caches = await mf.getCaches();
const defaultCache = caches.default;
await defaultCache.put("http://example.com", new Response("cached"));
```

**Queue producer:**
```js
const producer = await mf.getQueueProducer("QUEUE");
await producer.send({ body: "message data" });
```

## Lifecycle

**Reload:**
```js
await mf.setOptions({
  scriptPath: "worker.js",
  bindings: { VERSION: "2.0" },
});
```

**Watch (manual):**
```js
import { watch } from "fs";

const config = { scriptPath: "worker.js" };
const mf = new Miniflare(config);

watch("worker.js", async () => {
  console.log("Reloading...");
  await mf.setOptions(config);
});
```

**Cleanup:**
```js
await mf.dispose();
```

See [configuration.md](./configuration.md) for all constructor options.
