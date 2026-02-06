# Workerd Patterns

## Multi-Service Architecture
```capnp
const config :Workerd.Config = (
  services = [
    (name = "frontend", worker = (
      modules = [(name = "index.js", esModule = embed "frontend/index.js")],
      compatibilityDate = "2024-01-15",
      bindings = [(name = "API", service = "api")]
    )),
    
    (name = "api", worker = (
      modules = [(name = "index.js", esModule = embed "api/index.js")],
      compatibilityDate = "2024-01-15",
      bindings = [
        (name = "DB", service = "postgres"),
        (name = "CACHE", kvNamespace = "kv"),
      ]
    )),
    
    (name = "postgres", external = (address = "db.internal:5432", http = ())),
    (name = "kv", disk = (path = "/var/kv", writable = true)),
  ],
  
  sockets = [(name = "http", address = "*:8080", http = (), service = "frontend")]
);
```

## Durable Objects
```capnp
const config :Workerd.Config = (
  services = [
    (name = "app", worker = (
      modules = [
        (name = "index.js", esModule = embed "index.js"),
        (name = "room.js", esModule = embed "room.js"),
      ],
      compatibilityDate = "2024-01-15",
      bindings = [(name = "ROOMS", durableObjectNamespace = "Room")],
      durableObjectNamespaces = [(className = "Room", uniqueKey = "v1")],
      durableObjectStorage = (localDisk = "/var/do")
    ))
  ],
  sockets = [(name = "http", address = "*:8080", http = (), service = "app")]
);
```

## Dev vs Prod Configs
```capnp
const devWorker :Workerd.Worker = (
  modules = [(name = "index.js", esModule = embed "src/index.js")],
  compatibilityDate = "2024-01-15",
  bindings = [
    (name = "API_URL", text = "http://localhost:3000"),
    (name = "DEBUG", text = "true"),
  ]
);

const prodWorker :Workerd.Worker = (
  inherit = "dev-service",
  bindings = [
    (name = "API_URL", text = "https://api.prod.com"),
    (name = "DEBUG", text = "false"),
  ]
);
```

## HTTP Reverse Proxy
```capnp
const config :Workerd.Config = (
  services = [
    (name = "proxy", worker = (
      serviceWorkerScript = embed "proxy.js",
      compatibilityDate = "2024-01-15",
      bindings = [(name = "BACKEND", service = "backend")]
    )),
    (name = "backend", external = (address = "internal:8080", http = ()))
  ],
  sockets = [(name = "http", address = "*:80", http = (), service = "proxy")]
);
```

## Local Development

### Using Wrangler
```bash
export MINIFLARE_WORKERD_PATH="/path/to/workerd"
wrangler dev
```

### Direct Workerd
```bash
workerd serve config.capnp --socket-addr http=*:3000 --verbose
```

### Environment Variables
```capnp
bindings = [
  (name = "DATABASE_URL", fromEnvironment = "DATABASE_URL"),
  (name = "API_KEY", fromEnvironment = "API_KEY"),
]
```

```bash
export DATABASE_URL="postgres://..."
export API_KEY="secret"
workerd serve config.capnp
```

## Testing

### Test Config
```capnp
const testWorker :Workerd.Worker = (
  modules = [
    (name = "index.js", esModule = embed "src/index.js"),
    (name = "test.js", esModule = embed "tests/test.js"),
  ],
  compatibilityDate = "2024-01-15"
);
```

```bash
workerd test config.capnp
workerd test config.capnp --test-only=test.js
```

## Production Deployment

### Systemd
```ini
# /etc/systemd/system/workerd.service
[Unit]
Description=workerd runtime
After=network-online.target
Requires=workerd.socket

[Service]
Type=exec
ExecStart=/usr/bin/workerd serve /etc/workerd/config.capnp --socket-fd http=3
Restart=always
User=nobody
NoNewPrivileges=true

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/workerd.socket
[Socket]
ListenStream=0.0.0.0:80

[Install]
WantedBy=sockets.target
```

### Docker
```dockerfile
FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y ca-certificates
COPY workerd /usr/local/bin/
COPY config.capnp /etc/workerd/
COPY src/ /etc/workerd/src/
EXPOSE 8080
CMD ["workerd", "serve", "/etc/workerd/config.capnp"]
```

### Compiled Binary
```bash
workerd compile config.capnp myConfig -o production-server
./production-server
```

## Best Practices

1. **Use ES modules** over service worker syntax
2. **Explicit bindings** - no global namespace assumptions
3. **Type safety** - define `Env` interfaces
4. **Service isolation** - split concerns
5. **Pin compat date** in production after testing
6. **Use ctx.waitUntil()** for background tasks
7. **Handle errors gracefully** with try/catch
8. **Configure resource limits** on caches/storage

## Error Handling Pattern
```javascript
export default {
  async fetch(request, env, ctx) {
    try {
      return await handleRequest(request, env);
    } catch (error) {
      console.error("Request failed", error);
      return new Response("Internal Error", {status: 500});
    }
  }
};
```

## Logging Pattern
```javascript
export default {
  async fetch(request, env, ctx) {
    console.log("Request", {method: request.method, url: request.url});
    
    ctx.waitUntil(
      logToAnalytics(request, env)
    );
    
    return new Response("OK");
  }
};
```

See [configuration.md](./configuration.md) for config syntax, [api.md](./api.md) for runtime APIs, [gotchas.md](./gotchas.md) for common errors.
