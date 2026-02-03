# Wrangler Programmatic API

Node.js APIs for testing and development.

## unstable_startWorker (Testing)

Starts Worker with real local bindings for integration tests.

```typescript
import { unstable_startWorker } from "wrangler";
import { describe, it, before, after } from "node:test";
import assert from "node:assert";

describe("worker", () => {
  let worker;
  
  before(async () => {
    worker = await unstable_startWorker({ config: "wrangler.jsonc" });
  });
  
  after(async () => {
    await worker.dispose();
  });
  
  it("responds with 200", async () => {
    const response = await worker.fetch("http://example.com");
    assert.strictEqual(response.status, 200);
  });
});
```

Options: `config`, `environment`, `persist`, `bundle`

## getPlatformProxy

Emulate bindings in Node.js without starting Worker.

```typescript
import { getPlatformProxy } from "wrangler";

const { env, dispose, caches } = await getPlatformProxy<Env>({
  configPath: "wrangler.jsonc",
  environment: "production",
  persist: { path: ".wrangler/state" }
});

// Use bindings
const value = await env.MY_KV.get("key");
await env.DB.prepare("SELECT * FROM users").all();
await env.ASSETS.put("file.txt", "content");

// Platform APIs
await caches.default.put("https://example.com", new Response("cached"));

await dispose();
```

### Use Cases

**Unit Tests**
```typescript
const { env, dispose } = await getPlatformProxy();

describe("database", () => {
  after(async () => await dispose());
  
  it("inserts user", async () => {
    const result = await env.DB.prepare(
      "INSERT INTO users (name) VALUES (?)"
    ).bind("Alice").run();
    assert.strictEqual(result.meta.changes, 1);
  });
});
```

**Scripts**
```typescript
const { env, dispose } = await getPlatformProxy({
  persist: { path: ".wrangler/state" }
});

await env.DB.batch([
  env.DB.prepare("CREATE TABLE users (id INTEGER PRIMARY KEY)"),
  env.DB.prepare("INSERT INTO users (id) VALUES (1)")
]);

await dispose();
```

## Type Generation

```bash
wrangler types
```

Creates `worker-configuration.d.ts`:

```typescript
interface Env {
  MY_KV: KVNamespace;
  DB: D1Database;
  API_KEY: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const value = await env.MY_KV.get("key");  // Type-safe
    return Response.json({ value });
  }
} satisfies ExportedHandler<Env>;
```

## unstable_dev (Legacy)

Use `unstable_startWorker` instead.

```typescript
import { unstable_dev } from "wrangler";

const worker = await unstable_dev("src/index.ts", {
  config: "wrangler.jsonc"
});

const response = await worker.fetch();
await worker.stop();
```

## Best Practices

- Use `unstable_startWorker` for integration tests (tests full Worker)
- Use `getPlatformProxy` for unit tests (tests individual functions)
- Enable `persist: true` for debugging (state survives runs)
- Run `wrangler types` after config changes
- Always `dispose()` to prevent resource leaks

## See Also

- [README.md](./README.md) - CLI commands
- [configuration.md](./configuration.md) - Config
- [patterns.md](./patterns.md) - Testing patterns
