---
title: Batching, Retries and Delays
pcx_content_type: concept
weight: 2
---

# Batching, Retries and Delays

## Batching

When configuring a [consumer Worker](/queues/reference/how-queues-works#consumers) for a queue, you can also define how messages are batched as they are delivered.

Batching can:

1. Reduce the total number of times your consumer Worker needs to be invoked (which can reduce costs).
2. Allow you to batch messages when writing to an external API or service (reducing writes).
3. Disperse load over time, especially if your producer Workers are associated with user-facing activity.

There are two ways to configure how messages are batched. You configure batching when connecting your consumer Worker to a queue.

* `max_batch_size` - The maximum size of a batch delivered to a consumer (defaults to 10 messages).
* `max_batch_timeout` - the _maximum_ amount of time the queue will wait before delivering a batch to a consumer (defaults to 5 seconds)

Both `max_batch_size` and `max_batch_timeout` work together. Whichever limit is reached first will trigger the delivery of a batch.

For example, a `max_batch_size = 30` and a `max_batch_timeout = 10` means that if 30 messages are written to the queue, the consumer will deliver a batch of 30 messages. However, if it takes longer than 10 seconds for those 30 messages to be written to the queue, then the consumer will get a batch of messages that contains however many messages were on the queue at the time (somewhere between 1 and 29, in this case).

When determining what size and timeout settings to configure, you will want to consider latency (how long can you wait to receive messages?), overall batch size (when writing to external systems), and cost (fewer-but-larger batches).

### Batch settings

The following batch-level settings can be configured to adjust how Queues delivers batches to your configured consumer.

{{<table-wrap>}}

| Setting                                   | Default       | Minimum      | Maximum       |
| ----------------------------------------- | ------------- | ------------ | ------------- |
| Maximum Batch Size `max_batch_size`       | 10 messages   | 1 message    | 100 messages  |
| Maximum Batch Timeout `max_batch_timeout` | 5 seconds     | 0 seconds    | 30 seconds    |
  
{{</table-wrap>}}

## Explicit acknowledgement and retries

You can acknowledge individual messages within a batch by explicitly acknowledging each message as it is processed. Messages that are explicitly acknowledged will not be re-delivered, even if your queue consumer fails on a subsequent message and/or fails to return successfully when processing a batch.

* Each message can be acknowledged as you process it within a batch, and avoids the entire batch from being re-delivered if your consumer throws an error during batch processing.
* Acknowledging individual messages is useful when you are calling external APIs, writing messages to a database, or otherwise performing non-idempotent (state changing) actions on individual messages.

To explicitly acknowledge a message as delivered, call the `ack()` method on the message. 

```ts
---
header: index.js 
---
export default {
  async queue(batch: MessageBatch, env: Env, ctx: ExecutionContext) {
    for (const msg of batch.messages) {

      // TODO: do something with the message
      // Explicitly acknowledge the message as delivered
      msg.ack()

    }
  },
};
```

You can also call `retry()` to explicitly force a message to be redelivered in a subsequent batch. This is referred to as "negative acknowledgement". This can be particularly useful when you want process the rest of the messages in that batch without throwing an error that would force the entire batch to be redelivered.

```ts
---
header: index.ts
---
export default {
  async queue(batch: MessageBatch, env: Env, ctx: ExecutionContext) {
    for (const msg of batch.messages) {

      // TODO: do something with the message that fails
      msg.retry()

    }
  },
};
```
You can also acknowledge or negatively acknowledge messages at a batch level with `ackAll()` and `retryAll()`. Calling `ackAll()` on the batch of messages (`MessageBatch`) delivered to your consumer Worker has the same behaviour as a consumer Worker that successfully returns (does not throw an error).

Note that calls to `ack()`, `retry()` and their `ackAll()` / `retryAll` equivalents follow the below precedence rules:

* If you call `ack()` on a message, subsequent calls to `ack()` or `retry()` are silently ignored.
* If you call `retry()` on a message and then call `ack()`: the `ack()` is ignored. The first method call wins in all cases.
* If you call either `ack()` or `retry()` on a single message, and then either/any of `ackAll()` or `retryAll()` on the batch, the call on the single message takes precedence. That is, the batch-level call does not apply to that message (or messages, if multiple calls were made).

## Delivery failure

When a message is failed to be delivered, the default behaviour is to retry delivery three times before marking the delivery as failed. You can set `max_retries` (defaults to 3) when configuring your consumer, but in most cases we recommend leaving this as the default.

Messages that reach the configured maximum retries will be deleted from the queue, or if a [dead-letter queue](/queues/configuration/dead-letter-queues/) (DLQ) is configured, written to the DLQ instead.

{{<Aside type="note">}}

Each retry counts as an additional read operation per [Queues pricing](/queues/platform/pricing/).

{{</Aside>}}

When a single message within a batch fails to be delivered, the entire batch is retried, unless you have [explicitly acknowledged](#explicit-acknowledgement-and-retries) a message (or messages) within that batch. For example, if a batch of 10 messages is delivered, but the 8th message fails to be delivered, all 10 messages will be retried and thus redelivered to your consumer in full.

{{<Aside type="warning" header="Retried messages and consumer concurrency">}}

Retrying messages with `.retry()` or calling `.retryAll()` on a batch will cause the consumer to autoscale down if consumer concurrency is enabled. Refer to [Consumer concurrency](/queues/configuration/consumer-concurrency/) to learn more. 

{{</Aside>}}

## Delay messages

When publishing messages to a queue, or when [marking a messsage or batch for retry](#explicit-acknowledgement-and-retries), you can choose to delay messages from being processed for a period of time.

Delaying messages allows you to defer tasks until later, and/or respond to backpressure when consuming from a queue. For example, if an upstream API you are calling to returns a `HTTP 429: Too Many Requests`, you can delay messages to slow down how quickly you are consuming them before they are re-processed.

{{<Aside type="note">}}

Configuring delivery and retry delays via the `wrangler` CLI requires `wrangler` version `3.38.0` or greater. Use `npx wrangler@latest` to always use the latest version of `wrangler`.

{{</Aside>}}

### Delay on send

To delay a message or batch of messages when sending to a queue, you can provide a `delaySeconds` parameter when sending a message.

```ts
// Delay a singular message by 600 seconds (10 minutes)
await env.YOUR_QUEUE.send(message, { delaySeconds: 600 })

// Delay a batch of messages by 300 seconds (5 minutes)
await env.YOUR_QUEUE.sendBatch(messages, { delaySeconds: 300 })

// Do not delay this message.
// If there is a global delay configured on the queue, ignore it.
await env.YOUR_QUEUE.sendBatch(messages, { delaySeconds: 0 })
```

You can also configure a default, global delay on a per-queue basis by passing `--delivery-delay-secs` when creating a queue via the `wrangler` CLI:

```sh
# Delay all messages by 5 minutes as a default
$ npx wrangler queues create $QUEUE_NAME --delivery-delay-secs=300
```

### Delay on retry

When [consuming messages from a queue](/queues/reference/how-queues-works/#consumers), you can choose to [explicitly mark messages to be retried](#explicit-acknowledgement-and-retries). Messages can be retried and delayed individually, or as an entire batch.

To delay an individual message within a batch:

```ts
---
header: index.ts
---
export default {
  async queue(batch: MessageBatch, env: Env, ctx: ExecutionContext) {
    for (const msg of batch.messages) {
      // Mark for retry and delay a singular message
      // by 3600 seconds (1 hour)
      msg.retry({delaySeconds: 3600})

    }
  },
};
```

To delay a batch of messages:

```ts
---
header: index.ts
---
export default {
  async queue(batch: MessageBatch, env: Env, ctx: ExecutionContext) {
    // Mark for retry and delay a batch of messages
    // by 600 seconds (10 minutes)
    batch.retryAll({ delaySeconds: 600 })
  },
};
```

You can also choose to set a default retry delay to any messages that are retried due to either implicit failure or when calling `retry()` explicitly. This is set at the consumer level, and is supported in both push-based (Worker) and pull-based (HTTP) consumers.

Delays can be configured via the `wrangler` CLI:

```sh
# Push-based consumers
# Delay any messages that are retried by 60 seconds (1 minute) by default.
$ npx wrangler@latest queues consumer worker add $QUEUE_NAME $WORKER_SCRIPT_NAME --retry-delay-secs=60

# Pull-based consumers
# Delay any messages that are retried by 60 seconds (1 minute) by default.
$ npx wrangler@latest queues consumer http add $QUEUE_NAME --retry-delay-secs=60
```

Delays can also be configured in [`wrangler.toml`](/workers/wrangler/configuration/#queues) with the `delivery_delay` setting for producers (when sending) and/or the `retry_delay` (when retrying) per-consumer:

```toml
---
header: wrangler.toml
---
[[queues.producers]]
  binding = "<BINDING_NAME>"
  queue = "<QUEUE_NAME>"
  delivery_delay = 60 # delay every message delivery by 1 minute

[[queues.consumers]]
  queue = "my-queue"
  retry_delay = 300 # delay any retried message by 5 minutes before re-attempting delivery
```

If you use both the `wrangler` CLI and `wrangler.toml` to change the settings associated with a queue or a queue consumer, the most recent configuration change will take effect.

Refer to the [Queues REST API documentation](/api/operations/queue-v2-list-queue-consumers) to learn how to configure message delays and retry delays programmatically.

## Apply a backoff algorithm

You can apply a backoff algorithm to increasingly delay messages based on the current number of attempts to deliver the message.

Each message delivered to a consumer includes an `attempts` property that tracks the number of delivery attempts made.

For example, to generate an [exponential backoff](https://en.wikipedia.org/wiki/Exponential_backoff) for a message, you can create a helper function that calculates this for you: 

```ts
const calculateExponentialBackoff = (attempts: number, baseDelaySeconds: number) => { return baseDelaySeconds**attempts }
```

In your consumer, you then pass the value of `msg.attempts` and your desired delay factor as the argument to `delaySeconds` when calling `retry()` on an individual message:

```ts
---
header: index.ts
---

const BASE_DELAY_SECONDS = 30;

export default {
  async queue(batch: MessageBatch, env: Env, ctx: ExecutionContext) {
    for (const msg of batch.messages) {
      // Mark for retry and delay a singular message
      // by 3600 seconds (1 hour)
      msg.retry({delaySeconds: calculateExponentialBackoff(msg.attempts, BASE_DELAY_SECONDS)})

    }
  },
};
```

## Related

* Review the [JavaScript API](/queues/configuration/javascript-apis/) documentation for Queues.
* Learn more about [How Queues Works](/queues/reference/how-queues-works/).
* Understand the [metrics available](/queues/observability/metrics/) for your queues, including backlog and delayed message counts.
