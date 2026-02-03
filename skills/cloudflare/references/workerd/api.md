# Workerd APIs

## Worker Code (JS/TS)

### ES Modules (Recommended)
```javascript
export default {
  async fetch(request, env, ctx) {
    // env: bindings, ctx: ExecutionContext
    const value = await env.KV.get("key");
    const response = await env.API.fetch(request);
    
    ctx.waitUntil(logRequest(request));  // Background task
    return new Response("OK");
  },
  
  async adminApi(request, env, ctx) {   // Named entrypoint
    return new Response("Admin");
  },
  
  async queue(batch, env, ctx) {        // Queue consumer
    for (const msg of batch.messages) {
      await processMessage(msg.body);
    }
  },
  
  async scheduled(event, env, ctx) {    // Cron
    ctx.waitUntil(runTask(env));
  }
};
```

### TypeScript Types
```typescript
interface Env {
  API: Fetcher;
  CACHE: KVNamespace;
  STORAGE: R2Bucket;
  ROOMS: DurableObjectNamespace;
  API_KEY: string;
  CONFIG: {apiUrl: string};
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const data = await env.CACHE.get("key");
    return new Response(data);
  }
};
```

### Service Worker Syntax
```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // Bindings as globals
  const value = await KV.get("key");
  return new Response("OK");
}
```

### Durable Objects
```javascript
export class Room {
  constructor(state, env) {
    this.state = state;
    this.env = env;
  }
  
  async fetch(request) {
    const url = new URL(request.url);
    
    if (url.pathname === "/state") {
      const value = await this.state.storage.get("counter");
      return new Response(value || "0");
    }
    
    if (url.pathname === "/increment") {
      const value = (await this.state.storage.get("counter")) || 0;
      await this.state.storage.put("counter", value + 1);
      return new Response(String(value + 1));
    }
    
    return new Response("Not found", {status: 404});
  }
}
```

### RPC Between Services
```javascript
// Caller
export default {
  async fetch(request, env, ctx) {
    const user = await env.AUTH.validateToken(request.headers.get("Authorization"));
    return new Response(`Hello ${user.name}`);
  }
};

// Callee
export default {
  async validateToken(token) {
    return {id: 123, name: "Alice"};  // Return structured data
  }
};
```

## Web Platform APIs

### Fetch
- `fetch()`, `Request`, `Response`, `Headers`
- `AbortController`, `AbortSignal`

### Streams
- `ReadableStream`, `WritableStream`, `TransformStream`
- Byte streams, BYOB readers

### Web Crypto
- `crypto.subtle` (encrypt/decrypt/sign/verify)
- `crypto.randomUUID()`, `crypto.getRandomValues()`

### Encoding
- `TextEncoder`, `TextDecoder`
- `atob()`, `btoa()`

### Web Standards
- `URL`, `URLSearchParams`
- `Blob`, `File`, `FormData`
- `WebSocket`, `EventSource` (SSE)
- `HTMLRewriter`

### Performance
- `performance.now()`, `performance.timeOrigin`
- `setTimeout()`, `setInterval()`, `queueMicrotask()`

### Console
- `console.log()`, `console.error()`, `console.warn()`

### Node.js Compat (`nodejs_compat` flag)
- `node:*` imports
- `process.env`, `Buffer`
- Subset of Node.js APIs

## CLI Commands

### Serve
```bash
workerd serve config.capnp [constantName]
workerd serve config.capnp --socket-addr http=*:3000
workerd serve config.capnp --socket-fd http=3       # Systemd
workerd serve config.capnp --verbose
workerd serve config.capnp --compat-date=2024-01-15
```

### Compile
```bash
workerd compile config.capnp constantName -o binary
./binary
```

### Test
```bash
workerd test config.capnp
workerd test config.capnp --test-only=my-test.js
```

## Wrangler Integration
```bash
export MINIFLARE_WORKERD_PATH="/path/to/workerd"
wrangler dev
```

**wrangler.toml**:
```toml
name = "my-worker"
main = "src/index.js"
compatibility_date = "2024-01-15"
compatibility_flags = ["nodejs_compat"]

[[kv_namespaces]]
binding = "CACHE"
id = "abc123"

[[r2_buckets]]
binding = "STORAGE"
bucket_name = "my-bucket"

[[durable_objects.bindings]]
name = "ROOMS"
class_name = "Room"
script_name = "my-worker"
```

## C++ Embedder API
Not covered here. See [workerd source](https://github.com/cloudflare/workerd) for embedding runtime in C++ applications.

See [patterns.md](./patterns.md) for usage examples, [configuration.md](./configuration.md) for config details.
