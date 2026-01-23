# Gotchas & Best Practices

## Common Issues

### Container Not Ready
**Error**: `CONTAINER_NOT_READY`  
**Cause**: Container still provisioning (first request or after sleep)  
**Fix**: Retry after 2-3s

```typescript
async function execWithRetry(sandbox, cmd) {
  for (let i = 0; i < 3; i++) {
    try {
      return await sandbox.exec(cmd);
    } catch (e) {
      if (e.code === 'CONTAINER_NOT_READY') {
        await new Promise(r => setTimeout(r, 2000));
        continue;
      }
      throw e;
    }
  }
}
```

### Port Exposure Fails in Dev
**Error**: "Connection refused: container port not found"  
**Cause**: Missing `EXPOSE` directive in Dockerfile  
**Fix**: Add `EXPOSE <port>` to Dockerfile (only needed for `wrangler dev`, production auto-exposes)

### Preview URLs Not Working
**Checklist**:
1. Custom domain configured? (not `.workers.dev`)
2. Wildcard DNS set up? (`*.domain.com → worker.domain.com`)
3. `normalizeId: true` in getSandbox?
4. `proxyToSandbox()` called first in fetch?

### Slow First Request
**Cause**: Cold start (container provisioning)  
**Solutions**:
- Use `sleepAfter` instead of creating new sandboxes
- Pre-warm with cron triggers
- Set `keepAlive: true` for critical sandboxes

### File Not Persisting
**Cause**: Files in `/tmp` or other ephemeral paths  
**Fix**: Use `/workspace` for persistent files

## Performance Optimization

### Sandbox ID Strategy

```typescript
// ❌ BAD: Creates new sandbox every time (slow, expensive)
const sandbox = getSandbox(env.Sandbox, `user-${Date.now()}`);

// ✅ GOOD: Reuse sandbox per user
const sandbox = getSandbox(env.Sandbox, `user-${userId}`);

// ✅ GOOD: Reuse for temporary tasks
const sandbox = getSandbox(env.Sandbox, 'shared-runner');
```

### Sleep Configuration

```typescript
// Cost-optimized: Sleep after 30min inactivity
const sandbox = getSandbox(env.Sandbox, 'id', {
  sleepAfter: '30m',
  keepAlive: false
});

// Always-on (higher cost, faster response)
const sandbox = getSandbox(env.Sandbox, 'id', {
  keepAlive: true
});
```

### Increase max_instances for High Traffic

```jsonc
{
  "containers": [{
    "class_name": "Sandbox",
    "max_instances": 50  // Allow 50 concurrent sandboxes
  }]
}
```

## Security Best Practices

### Sandbox Isolation
- Each sandbox = isolated container (filesystem, network, processes)
- Use unique sandbox IDs per tenant for multi-tenant apps
- Sandboxes cannot communicate directly

### Input Validation

```typescript
// ❌ DANGEROUS: Command injection
const result = await sandbox.exec(`python3 -c "${userCode}"`);

// ✅ SAFE: Write to file, execute file
await sandbox.writeFile('/workspace/user_code.py', userCode);
const result = await sandbox.exec('python3 /workspace/user_code.py');
```

### Resource Limits

```typescript
// Timeout long-running commands
const result = await sandbox.exec('python3 script.py', {
  timeout: 30000  // 30 seconds
});
```

### Secrets Management

```typescript
// ❌ NEVER hardcode secrets
const token = 'ghp_abc123';

// ✅ Use environment secrets
const token = env.GITHUB_TOKEN;

// Pass to sandbox via exec env
const result = await sandbox.exec('git clone ...', {
  env: { GIT_TOKEN: token }
});
```

### Preview URL Security
Preview URLs include auto-generated tokens:
```
https://8080-sandbox-abc123def456.yourdomain.com
```
Token changes on each expose operation, preventing unauthorized access.

## Limits

- **Instance types**: lite (256MB), standard (512MB), heavy (1GB)
- **Default timeout**: 120s for exec operations
- **First deploy**: 2-3 min for container provisioning
- **Cold start**: 2-3s when waking from sleep

## Production Guide

See: https://developers.cloudflare.com/sandbox/guides/production-deployment/

## Resources

- [Official Docs](https://developers.cloudflare.com/sandbox/)
- [API Reference](https://developers.cloudflare.com/sandbox/api/)
- [Examples](https://github.com/cloudflare/sandbox-sdk/tree/main/examples)
- [npm Package](https://www.npmjs.com/package/@cloudflare/sandbox)
- [Discord Support](https://discord.cloudflare.com)
