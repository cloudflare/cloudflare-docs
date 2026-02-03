# Configuration

## Wrangler Setup

```toml
name = "my-agents-app"

[[durable_objects.bindings]]
name = "MyAgent"
class_name = "MyAgent"

[[migrations]]
tag = "v1"
new_sqlite_classes = ["MyAgent"]

[ai]
binding = "AI"
```

```jsonc
{
  "durable_objects": {
    "bindings": [
      {"name": "MyAgent", "class_name": "MyAgent"}
    ]
  },
  "migrations": [
    {"tag": "v1", "new_sqlite_classes": ["MyAgent"]}
  ],
  "ai": {
    "binding": "AI"
  }
}
```

## Environment Bindings

```typescript
interface Env {
  AI?: Ai;                              // Workers AI
  MyAgent?: DurableObjectNamespace<MyAgent>;
  DB?: D1Database;                      // D1 database
  KV?: KVNamespace;                     // KV storage
  R2?: R2Bucket;                        // R2 bucket
  OPENAI_API_KEY?: string;              // Secrets
  QUEUE?: Queue;                        // Queues
}
```

## Deployment

```bash
# Local dev
npx wrangler dev

# Deploy production
npx wrangler deploy

# Set secrets
npx wrangler secret put OPENAI_API_KEY
```

## Agent Routing

```typescript
export default {
  async fetch(request: Request, env: Env) {
    const id = env.MyAgent.idFromName("user-123");
    const stub = env.MyAgent.get(id);
    return stub.fetch(request);
  }
}
```

## Email Routing

Configure email routing in dashboard to deliver emails to agent:

```
Destination: Workers with Durable Objects
Worker: my-agents-app
```

## AI Gateway (Optional)

```typescript
// Enable caching/routing through AI Gateway
const response = await this.env.AI.run(
  "@cf/meta/llama-3.1-8b-instruct",
  { prompt },
  {
    gateway: {
      id: "my-gateway-id",
      skipCache: false,
      cacheTtl: 3600
    }
  }
);
```
