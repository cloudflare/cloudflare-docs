---
title: Batching and Retries
pcx_content_type: overview
weight: 3
layout: list
---

# Batching and Retries

## Batching

When configuring a [consumer Worker](https://developers.cloudflare.com/queues/learning/how-queues-works#consumers) for a queue, you can also define how messages are batched as they are delivered.

Batching can:

1. Reduce the total number of times your consumer Worker needs to be invoked (which can reduce costs).
2. Allow you to batch messages when writing to an external API or service (reducing writes).
3. Disperse load over time, especially if your producer Workers are associated with user-facing activity.

There are two ways to configure how messages are batched. You configure batching when connecting your consumer Worker to a queue.

* `max_batch_size` - The maximum size of a batch delivered to a consumer (defaults to 10 messages).
* `max_batch_timeout` - the _maximum_ amount of time the queue will wait before delivering a batch to a consumer (defaults to 5 seconds)

Both `max_batch_size` and `max_batch_timeout` work together. Whichever limit is reached first will trigger the delivery of a batch.

For example, a `max_batch_size = 30` and a `max_batch_timeout = 10` means that if 30 messages are written to the queue, we'll deliver a batch of 30 messages. However, if it takes longer than 10 seconds for those 30 messages to be written to the queue, then the consumer will get a batch of messages that contains however many messages were on the queue at the time (somewhere between 1 and 29, in this case).

When determining what size and timeout settings to configure, you will want to take into account latency (how long can you wait to receive messages?), overall batch size (when writing to external systems), and cost (fewer-but-larger batches). 

## Retries

When a message is failed to be delivered, the default behaviour is to retry delivery three times before marking the delivery is failed (see [Dead Letter Queues](#dead-letter-queues)). You can set `max_retries` (defaults to 3) when configuring your consumer, but in most cases we recommend leaving this as the default.

{{<Aside type="note">}}

Each retry counts as an additional "read" operation per [Queues pricing](https://developers.cloudflare.com/queues/pricing).

{{</Aside>}}

**Note**: When a single message within a batch fails to be delivered, the entire batch is retried. For example, if a batch of 10 messages is delivered, but the 8th message fails to be delivered, all 10 messages will be retried and thus re-delivered to your consumer in full.

## Dead Letter Queues

A Dead Letter Queue, or "DLQ", is a common concept in a messaging system, and represents where messages are sent when a delivery failure occurs with a consumer after `max_retries` is reached. A Dead Letter Queue is just like any other queue, and can be produced to and consumed from independently. 

With Cloudflare Queues, a Dead Letter Queue is configured as part of your consumer. For example, the following consumer configuration would send messages to our DLQ named "my-other-queue" after retrying delivery (by default, 3 times):

```toml
[[queues.consumers]]
  queue = "my-queue"
  dead_letter_queue = "my-other-queue"
```

**Importantly, in order to process messages placed on our DLQ, you need to set up a consumer associated with that queue as well**. Messages otherwise delivered to a DLQ without an active consumer will persist for four (4) days before being deleted from the queue.
