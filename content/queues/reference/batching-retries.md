---
title: Batching and Retries
pcx_content_type: concept
weight: 3
---

# Batching and Retries

## Batching

When configuring a [consumer Worker](/queues/learning/how-queues-works#consumers) for a queue, you can also define how messages are batched as they are delivered.

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

## Explicit acknowledgement

You can acknowledge individual messages with a batch by explicitly acknowledging each message as it is processed. Messages that are explicitly acknowledged will not be re-delivered, even if your queue consumer fails on a subsequent message and/or fails to return successfully when processing a batch.

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
header: index.js 
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

## Retries

When a message is failed to be delivered, the default behaviour is to retry delivery three times before marking the delivery as failed (refer to [Dead Letter Queues](#dead-letter-queues)). You can set `max_retries` (defaults to 3) when configuring your consumer, but in most cases we recommend leaving this as the default.

{{<Aside type="note">}}

Each retry counts as an additional read operation per [Queues pricing](/queues/platform/pricing/).

{{</Aside>}}

When a single message within a batch fails to be delivered, the entire batch is retried, unless you have [explicitly acknowledged](#explicit-acknowledgement) a message (or messages) within that batch. For example, if a batch of 10 messages is delivered, but the 8th message fails to be delivered, all 10 messages will be retried and thus redelivered to your consumer in full.

{{<Aside type="warning" header="Retried messages and consumer concurrency">}}

Retrying messages with `.retry()` or calling `.retryAll()` on a batch will cause the consumer to autoscale down if consumer concurrency is enabled. Refer to [Consumer concurrency](/queues/learning/consumer-concurrency/) to learn more. 

{{</Aside>}}

## Dead Letter Queues

A Dead Letter Queue (DLQ) is a common concept in a messaging system, and represents where messages are sent when a delivery failure occurs with a consumer after `max_retries` is reached. A Dead Letter Queue is just like any other queue, and can be produced to and consumed from independently. 

With Cloudflare Queues, a Dead Letter Queue is configured as part of your consumer. For example, the following consumer configuration would send messages to our DLQ named `"my-other-queue"` after retrying delivery (by default, 3 times):

```toml
---
filename: wrangler.toml
---
[[queues.consumers]]
  queue = "my-queue"
  dead_letter_queue = "my-other-queue"
```

To process messages placed on your DLQ, you need to set up a consumer associated with that queue. Messages delivered to a DLQ without an active consumer will persist for four (4) days before being deleted from the queue.
