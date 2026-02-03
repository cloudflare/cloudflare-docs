# Cloudflare Queues

Flexible message queuing for async task processing with guaranteed at-least-once delivery and configurable batching.

## Overview

Queues provide:
- At-least-once delivery guarantee
- Push-based (Worker) and pull-based (HTTP) consumers
- Configurable batching and retries
- Dead Letter Queues (DLQ)
- Delays up to 12 hours

**Use cases:** Async processing, API buffering, rate limiting, event workflows, deferred jobs

## Quick Start

```bash
wrangler queues create my-queue
wrangler queues consumer add my-queue my-worker
```

```typescript
// Producer
await env.MY_QUEUE.send({ userId: 123, action: 'notify' });

// Consumer
export default {
  async queue(batch: MessageBatch, env: Env): Promise<void> {
    for (const msg of batch.messages) {
      await process(msg.body);
      msg.ack();
    }
  }
};
```

## Core Operations

| Operation | Purpose | Limit |
|-----------|---------|-------|
| `send(body, options?)` | Publish message | 128 KB |
| `sendBatch(messages)` | Bulk publish | 100 msgs/256 KB |
| `message.ack()` | Acknowledge success | - |
| `message.retry(options?)` | Retry with delay | - |
| `batch.ackAll()` | Ack entire batch | - |

## Architecture

```
[Producer Worker] → [Queue] → [Consumer Worker/HTTP] → [Processing]
```

- Max 10,000 queues per account
- 5,000 msgs/second per queue
- 4-14 day retention (configurable)

## In This Reference

- [configuration.md](./configuration.md) - wrangler.jsonc setup, producer/consumer config, DLQ
- [api.md](./api.md) - Send/batch methods, queue handler, ack/retry, pull API
- [patterns.md](./patterns.md) - Async tasks, buffering, rate limiting, event workflows
- [gotchas.md](./gotchas.md) - Idempotency, retry limits, content types, cost optimization

## See Also

- [workers](../workers/) - Worker runtime for producers/consumers
- [r2](../r2/) - Process R2 event notifications via queues
- [d1](../d1/) - Batch write to D1 from queue consumers
