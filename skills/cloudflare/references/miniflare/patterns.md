# Testing Patterns

## Basic Test Setup (node:test)

```js
import assert from "node:assert";
import test, { after, before } from "node:test";
import { Miniflare } from "miniflare";

let mf;

before(async () => {
  mf = new Miniflare({
    modules: true,
    scriptPath: "src/index.js",
    kvNamespaces: ["TEST_KV"],
    bindings: { API_KEY: "test-key" },
  });
  await mf.ready;
});

test("fetch returns hello", async () => {
  const res = await mf.dispatchFetch("http://localhost/");
  assert.strictEqual(await res.text(), "Hello World");
});

test("kv operations", async () => {
  const kv = await mf.getKVNamespace("TEST_KV");
  await kv.put("key", "value");
  
  const res = await mf.dispatchFetch("http://localhost/kv");
  assert.strictEqual(await res.text(), "value");
});

after(async () => {
  await mf.dispose();
});
```

## Build Before Tests

```js
import { spawnSync } from "node:child_process";

before(() => {
  spawnSync("npx wrangler build", { shell: true, stdio: "pipe" });
});
```

## Testing Durable Objects

```js
test("durable object state", async () => {
  const ns = await mf.getDurableObjectNamespace("COUNTER");
  const id = ns.idFromName("test-counter");
  const stub = ns.get(id);
  
  const res1 = await stub.fetch("http://localhost/increment");
  assert.strictEqual(await res1.text(), "1");
  
  const res2 = await stub.fetch("http://localhost/increment");
  assert.strictEqual(await res2.text(), "2");
  
  // Direct storage access
  const storage = await mf.getDurableObjectStorage(id);
  const count = await storage.get("count");
  assert.strictEqual(count, 2);
});
```

## Testing Queue Handlers

```js
test("queue message processing", async () => {
  const worker = await mf.getWorker();
  
  const result = await worker.queue("my-queue", [
    { id: "msg1", timestamp: new Date(), body: { userId: 123 }, attempts: 1 },
  ]);
  
  assert.strictEqual(result.outcome, "ok");
  
  // Verify side effects
  const kv = await mf.getKVNamespace("QUEUE_LOG");
  const log = await kv.get("msg1");
  assert.ok(log);
});
```

## Testing Scheduled Events

```js
test("scheduled cron handler", async () => {
  const worker = await mf.getWorker();
  
  const result = await worker.scheduled({
    scheduledTime: new Date("2024-01-01T00:00:00Z"),
    cron: "0 0 * * *",
  });
  
  assert.strictEqual(result.outcome, "ok");
});
```

## Isolated Test Data

```js
describe("user tests", () => {
  let mf;
  
  beforeEach(async () => {
    mf = new Miniflare({
      scriptPath: "worker.js",
      kvNamespaces: ["USERS"],
      // In-memory: no persist
    });
  });
  
  afterEach(async () => {
    await mf.dispose();
  });
  
  test("create user", async () => {
    // Fresh KV per test
  });
});
```

## Mock External Services

```js
new Miniflare({
  workers: [
    {
      name: "main",
      serviceBindings: { EXTERNAL_API: "mock-api" },
      script: `/* main worker */`,
    },
    {
      name: "mock-api",
      script: `
        addEventListener("fetch", (event) => {
          event.respondWith(Response.json({ mocked: true }));
        })
      `,
    },
  ],
});
```

## Shared Storage Between Workers

```js
new Miniflare({
  kvPersist: "./data",
  workers: [
    { name: "writer", kvNamespaces: { DATA: "shared" }, script: `...` },
    { name: "reader", kvNamespaces: { DATA: "shared" }, script: `...` },
  ],
});
```

## Test Utils Pattern

```js
// test-utils.js
export async function createTestWorker(overrides = {}) {
  const mf = new Miniflare({
    scriptPath: "dist/worker.js",
    kvNamespaces: ["TEST_KV"],
    bindings: { ENVIRONMENT: "test", ...overrides.bindings },
    ...overrides,
  });
  await mf.ready;
  return mf;
}

// test.js
test("my test", async () => {
  const mf = await createTestWorker({ bindings: { CUSTOM: "value" } });
  try {
    const res = await mf.dispatchFetch("http://localhost/");
    assert.ok(res.ok);
  } finally {
    await mf.dispose();
  }
});
```

## Error Handling Tests

```js
test("handles 404", async () => {
  const res = await mf.dispatchFetch("http://localhost/not-found");
  assert.strictEqual(res.status, 404);
});

test("handles invalid input", async () => {
  const res = await mf.dispatchFetch("http://localhost/api", {
    method: "POST",
    body: "invalid json",
  });
  assert.strictEqual(res.status, 400);
});
```

## CI Integration

Use in-memory storage (omit persist options) for CI speed. Use `dispatchFetch` instead of HTTP server to avoid port conflicts.

See [gotchas.md](./gotchas.md) for troubleshooting common issues.
