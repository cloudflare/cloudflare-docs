# Gotchas & Limits

## Limits

- **Max 8 tags per Worker**
- **Upload session JWT valid 1 hour**
- **Completion token valid 1 hour**
- **No limits on Workers per namespace** (unlike regular Workers)
- **User Workers run in untrusted mode** (no `request.cf` access)
- **Outbound Workers don't intercept DO/mTLS fetch**

## Security

### User Worker Restrictions
- Run in untrusted mode
- No access to `request.cf` object
- Automatic isolation from other customers
- Never share cache

### Outbound Worker Gaps
- Doesn't intercept Durable Object fetch
- Doesn't intercept mTLS binding fetch
- Plan accordingly for complete egress control

### Asset Isolation
Assets shared across namespace by hash. For strict isolation:
```typescript
const hash = sha256(accountId + fileContents).slice(0, 32);
```

Never expose upload JWTs to clients.

## Error Handling

### Worker Not Found
```typescript
try {
  const userWorker = env.DISPATCHER.get(name);
  return await userWorker.fetch(request);
} catch (e) {
  if (e.message.startsWith("Worker not found")) {
    return new Response("Worker not found", { status: 404 });
  }
  return new Response(e.message, { status: 500 });
}
```

### Limit Violations
```typescript
try {
  return await userWorker.fetch(request);
} catch (e) {
  if (e.message.includes("CPU time limit")) {
    env.ANALYTICS.writeDataPoint({
      indexes: [workerName],
      blobs: ["cpu_limit_exceeded"],
    });
    return new Response("CPU limit exceeded", { status: 429 });
  }
  throw e;
}
```

## Troubleshooting

### Hostname Routing Issues
- Use `*/*` wildcard route to avoid DNS proxy issues
- Orange-to-orange: Customer proxied through CF → your CF domain
- Wildcard works regardless of proxy settings

### Binding Preservation
- Use `keep_bindings` to avoid losing existing bindings on update
- Document which resources bound to which Workers

### Tag Filtering
- URL encode tags: `tags=production%3Ayes`
- Avoid special chars: `,` and `&`

### Deploy Failures
- ES modules require multipart form upload
- Must specify `main_module` in metadata
- File type: `application/javascript+module`

### Static Assets
- Hash must be first 16 bytes (32 hex chars) of SHA-256
- Upload must happen within 1 hour of session creation
- Deploy must happen within 1 hour of upload completion
- Base64 encode file contents for upload

## TypeScript Types

```typescript
interface Env {
  DISPATCHER: DispatchNamespace;
  ROUTING_KV: KVNamespace;
  CUSTOMERS_KV: KVNamespace;
  ANALYTICS: AnalyticsEngineDataset;
}

interface DispatchNamespace {
  get(
    name: string,
    options?: Record<string, unknown>,
    config?: {
      limits?: {
        cpuMs?: number;
        subRequests?: number;
      };
      outbound?: Record<string, unknown>;
    }
  ): Fetcher;
}

interface Fetcher {
  fetch(request: Request): Promise<Response>;
}
```

## Common Mistakes

1. **Creating namespace per customer** → Use one namespace per environment
2. **Not handling Worker not found** → Always catch and handle gracefully
3. **Forgetting `keep_bindings`** → Existing bindings lost on update
4. **Not tagging Workers** → Can't bulk delete/filter
5. **Exposing upload JWTs** → Keep server-side only
6. **No limit tracking** → Use Analytics Engine for violations
7. **Not using wildcard routes** → Hit route limits, DNS issues
8. **Assuming DO/mTLS interception** → Outbound Worker doesn't catch these

See [README.md](./README.md), [configuration.md](./configuration.md), [api.md](./api.md), [patterns.md](./patterns.md)
