## Common Use Cases

### Stateful Backend (Session-based)

```typescript
import { Container } from "@cloudflare/containers";

export class SessionBackend extends Container {
  defaultPort = 3000;
  sleepAfter = "30m";
}

export default {
  async fetch(request: Request, env: Env) {
    const { sessionId } = await request.json();
    // Each session gets dedicated container instance
    const container = env.SESSION_BACKEND.getByName(sessionId);
    return container.fetch(request);
  }
}
```

### Short-Lived Code Execution

```typescript
export class CodeSandbox extends Container {
  defaultPort = 8080;
  sleepAfter = "5m";  // Quick cleanup
}

export default {
  async fetch(request: Request, env: Env) {
    const { code, executionId } = await request.json();
    
    const container = env.CODE_SANDBOX.getByName(executionId);
    await container.startAndWaitForPorts({
      startOptions: {
        envVars: {
          USER_CODE: Buffer.from(code).toString('base64'),
          TIMEOUT: "3