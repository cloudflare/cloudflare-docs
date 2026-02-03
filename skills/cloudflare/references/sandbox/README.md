# Cloudflare Sandbox SDK

Secure isolated code execution in containers on Cloudflare's edge. Run untrusted code, manage files, expose services, integrate with AI agents.

**Use cases**: AI code execution, interactive dev environments, data analysis, CI/CD, code interpreters, multi-tenant execution.

## Architecture

- Each sandbox = Durable Object + Container
- Persistent across requests (same ID = same sandbox)
- Isolated filesystem/processes/network
- Configurable sleep/wake for cost optimization

## Quick Start

```typescript
import { getSandbox, proxyToSandbox, type Sandbox } from '@cloudflare/sandbox';
export { Sandbox } from '@cloudflare/sandbox';

type Env = { Sandbox: DurableObjectNamespace<Sandbox>; };

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // CRITICAL: proxyToSandbox MUST be called first for preview URLs
    const proxyResponse = await proxyToSandbox(request, env);
    if (proxyResponse) return proxyResponse;

    const sandbox = getSandbox(env.Sandbox, 'my-sandbox');
    const result = await sandbox.exec('python3 -c "print(2 + 2)"');
    return Response.json({ output: result.stdout });
  }
};
```

**wrangler.jsonc**:
```jsonc
{
  "name": "my-sandbox-worker",
  "main": "src/index.ts",
  "compatibility_date": "2024-01-01",
  
  "containers": [{
    "class_name": "Sandbox",
    "image": "./Dockerfile",
    "instance_type": "lite",        // lite | standard | heavy
    "max_instances": 5
  }],
  
  "durable_objects": {
    "bindings": [{ "class_name": "Sandbox", "name": "Sandbox" }]
  },
  
  "migrations": [{
    "tag": "v1",
    "new_sqlite_classes": ["Sandbox"]
  }]
}
```

**Dockerfile**:
```dockerfile
FROM docker.io/cloudflare/sandbox:latest
RUN pip3 install --no-cache-dir pandas numpy matplotlib
EXPOSE 8080 3000  # Required for wrangler dev
```

## Core APIs

- `getSandbox(namespace, id, options?)` → Get/create sandbox
- `sandbox.exec(command, options?)` → Execute command
- `sandbox.readFile(path)` / `writeFile(path, content)` → File ops
- `sandbox.startProcess(command, options)` → Background process
- `sandbox.exposePort(port, options)` → Get preview URL
- `sandbox.createSession(options)` → Isolated session

## Critical Rules

- ALWAYS call `proxyToSandbox()` first
- Same ID = reuse sandbox
- Use `/workspace` for persistent files
- `normalizeId: true` for preview URLs
- Retry on `CONTAINER_NOT_READY`

## Resources

- [Configuration](./configuration.md) - Config, CLI, environment
- [API Reference](./api.md) - Programmatic API, testing
- [Patterns](./patterns.md) - Common workflows, CI/CD
- [Gotchas](./gotchas.md) - Issues, limits, best practices
- [Official Docs](https://developers.cloudflare.com/sandbox/)
