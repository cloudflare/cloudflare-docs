# Queues Configuration

## Create Queue

```bash
wrangler queues create my-queue
wrangler queues create my-queue --retention-period-hours=336  # 14 days
wrangler queues create my-queue --delivery-delay-secs=300
```

## Producer Binding

**wrangler.jsonc:**
```jsonc
{
  "queues": {
    "producers": [
      {
        "queue": "my-queue-name",
        "binding": "MY_QUEUE",
        "delivery_delay": 60  // Optional: default delay in seconds
      }
    ]
  }
}
```

**wrangler.toml:**
```toml
[[queues.producers]]
queue = "my-queue-name"
binding = "MY_QUEUE"
delivery_delay = 60
```

## Consumer Configuration (Push-based)

**wrangler.jsonc:**
```jsonc
{
  "queues": {
    "consumers": [
      {
        "queue": "my-queue-name",
        "max_batch_size": 10,           // 1-100, default 10
        "max_batch_timeout": 5,         // 0-60s, default 5
        "max_retries": 3,               // default 3, max 100
        "dead_letter_queue": "my-dlq",  // optional
        "retry_delay": 300              // optional: delay retries in seconds
      }
    ]
  }
}
```

**wrangler.toml:**
```toml
[[queues.consumers]]
queue = "my-queue-name"
max_batch_size = 10
max_batch_timeout = 5
max_retries = 3
dead_letter_queue = "my-dlq"
retry_delay = 300
```

## Consumer Configuration (Pull-based)

**wrangler.jsonc:**
```jsonc
{
  "queues": {
    "consumers": [
      {
        "queue": "my-queue-name",
        "type": "http_pull",
        "visibility_timeout_ms": 5000,  // default 30000, max 12h
        "max_retries": 5,
        "dead_letter_queue": "my-dlq"
      }
    ]
  }
}
```

## TypeScript Types

```typescript
interface Env {
  MY_QUEUE: Queue<MessageBody>;
  ANALYTICS_QUEUE: Queue<AnalyticsEvent>;
}

interface MessageBody {
  id: string;
  action: 'create' | 'update' | 'delete';
  data: Record<string, any>;
}

export default {
  async queue(batch: MessageBatch<MessageBody>, env: Env): Promise<void> {
    for (const msg of batch.messages) {
      console.log(msg.body.action);
      msg.ack();
    }
  }
} satisfies ExportedHandler<Env>;
```

## CLI Commands

```bash
# Consumer management
wrangler queues consumer add my-queue my-worker --batch-size=50 --max-retries=5
wrangler queues consumer http add my-queue
wrangler queues consumer worker remove my-queue my-worker
wrangler queues consumer http remove my-queue

# Queue operations
wrangler queues list
wrangler queues pause my-queue
wrangler queues resume my-queue
wrangler queues purge my-queue
wrangler queues delete my-queue
```
