# Workerd Gotchas

## Configuration Errors

### Missing Compat Date
❌ **Wrong**:
```capnp
const worker :Workerd.Worker = (
  serviceWorkerScript = embed "worker.js"
)
```

✅ **Correct**:
```capnp
const worker :Workerd.Worker = (
  serviceWorkerScript = embed "worker.js",
  compatibilityDate = "2024-01-15"  # Always set!
)
```

### Wrong Binding Type
❌ **Wrong** - text returns string:
```capnp
(name = "CONFIG", text = '{"key":"value"}')  # String, not parsed
```

✅ **Correct** - json returns object:
```capnp
(name = "CONFIG", json = '{"key":"value"}')  # Parsed object
```

### Service vs Namespace
❌ **Wrong** - just a Fetcher:
```capnp
(name = "ROOM", service = "room-service")
```

✅ **Correct** - Durable Object namespace:
```capnp
(name = "ROOM", durableObjectNamespace = "Room")
```

### Module Name Mismatch
❌ **Wrong** - import fails:
```capnp
modules = [(name = "src/index.js", esModule = embed "src/index.js")]
```

✅ **Correct** - use simple names:
```capnp
modules = [(name = "index.js", esModule = embed "src/index.js")]
```

## Network Access

### No Global Outbound
❌ **Wrong** - may fail without config:
```javascript
await fetch("https://api.example.com")
```

✅ **Correct** - configure network service:
```capnp
services = [
  (name = "internet", network = (allow = ["public"])),
  (name = "worker", worker = (
    ...,
    bindings = [(name = "API", service = "internet")]
  ))
]
```

Or use external service:
```capnp
bindings = [
  (name = "API", service = (
    name = "api-backend",
    external = (address = "api.com:443", http = (style = tls))
  ))
]
```

## Debugging Issues

### Worker Not Responding
Check:
1. Socket config: `address = "*:8080"`, service name matches
2. Worker has `fetch()` handler
3. Port available
4. Service name in socket matches service definition

### Binding Not Found
Check:
1. Binding name in config matches code (`env.BINDING` or global)
2. Service exists in config
3. ES module vs service worker syntax (env vs global)

### Module Not Found
Check:
1. Module name in config matches import path
2. `embed` path correct
3. ES module syntax valid (no CommonJS in `.mjs`)

### Compatibility Errors
Check:
1. `compatibilityDate` set
2. API available on that date ([docs](https://developers.cloudflare.com/workers/configuration/compatibility-dates/))
3. Required flags enabled (`compatibilityFlags`)

## Performance Issues

### High Memory Usage
Try:
1. V8 flags: `v8Flags = ["--max-old-space-size=2048"]`
2. Reduce cache limits: `memoryCache.limits.maxTotalValueSize`
3. Profile with `--verbose` logging

### Slow Startup
Try:
1. Compile binary: `workerd compile config.capnp name -o binary`
2. Check module count (many imports slow startup)
3. Review compatibility flags (some have perf impact)

### Request Timeouts
Check:
1. External service connectivity
2. Network service DNS resolution
3. TLS handshake issues (`tlsOptions`)

## Build Issues

### Cap'n Proto Errors
- Install Cap'n Proto tools: `brew install capnp` / `apt install capnproto`
- Check schema import path: `using Workerd = import "/workerd/workerd.capnp";`
- Validate with: `capnp compile -I. config.capnp`

### Embed Path Issues
- Paths relative to config file location
- Use absolute paths if needed: `embed "/full/path/file.js"`
- Check file exists before running

### V8 Flags Warning
**Warning**: V8 flags (`v8Flags`) can break everything. Use only if necessary and test thoroughly. Not supported in production Cloudflare Workers.

## Security Gotchas

### Hardcoded Secrets
❌ **Never** hardcode:
```capnp
(name = "API_KEY", text = "sk-1234567890")
```

✅ **Use env vars**:
```capnp
(name = "API_KEY", fromEnvironment = "API_KEY")
```

### Overly Broad Network Access
❌ **Too permissive**:
```capnp
network = (allow = ["*"])  # Everything
```

✅ **Restrictive**:
```capnp
network = (allow = ["public"], deny = ["local"])
```

### Extractable Keys
❌ **Extractable keys risky**:
```capnp
cryptoKey = (extractable = true, ...)
```

✅ **Non-extractable**:
```capnp
cryptoKey = (extractable = false, ...)
```

## Compatibility Changes

### Breaking Change Migration
When updating `compatibilityDate`:
1. Review [compatibility dates docs](https://developers.cloudflare.com/workers/configuration/compatibility-dates/)
2. Check flags enabled between old/new date
3. Test locally with new date
4. Update code for breaking changes
5. Deploy with new date

### Version Mismatch
Workerd version = max compat date supported. If `compatibilityDate = "2025-01-01"` but workerd is v1.20241201.0, it fails. Update workerd binary.

## Troubleshooting Steps

1. **Enable verbose logging**: `workerd serve config.capnp --verbose`
2. **Check logs**: Look for error messages, stack traces
3. **Validate config**: `capnp compile -I. config.capnp`
4. **Test bindings**: Log `Object.keys(env)` to verify
5. **Check versions**: Workerd version vs compat date
6. **Isolate issue**: Minimal repro config
7. **Review schema**: [workerd.capnp](https://github.com/cloudflare/workerd/blob/main/src/workerd/server/workerd.capnp)

See [configuration.md](./configuration.md) for config details, [patterns.md](./patterns.md) for working examples, [api.md](./api.md) for runtime APIs.
