---
title: How Queues Works
pcx_content_type: concept
weight: 1
---

# How Queues works

Cloudflare Queues is great at decoupling components of applications, like the checkout and order fulfillment services for an ecommerce site. Decoupled services are easier to reason about, deploy, and implement, allowing you to ship features that delight your customers without worrying about synchronizing complex deployments. Queues also allow you to batch and buffer calls to downstream services and APIs.

There are four major concepts to understand with Queues:

1. [Queues](#what-is-a-queue)
2. [Producers](#producers)
3. [Consumers](#consumers)
4. [Messages](#messages)

## What is a Queue

A queue is the core concept underpinning Cloudflare Queues: a queue can be thought of as a buffer or list that automatically scales as messages are written to it, and allows a consumer to pull messages from that same queue.

Queues are designed to be reliable, and messages written to a queue should never be lost once the write succeeds. Similarly, messages are not deleted from a queue until the [consumer](#consumer) has successfully consumed the message.

Developers can create multiple queues, and creating multiple queues can be useful to:

* Separate different use-cases and processing requirements: for example, a logging queue vs. a password reset queue. 
* Horizontally scale your overall throughput (messages per second) by using multiple queues to scale out
* Configure different batching strategies for each consumer connected to a queue.

## Producers

A producer is the term for a client that is publishing or _producing_ messages on to a queue.

A queue can have multiple producers: for example, you may have multiple Workers writing events or logs to a shared queue based on incoming HTTP requests from users. There is no limit to the total number of producers associated with a queue.

## Consumers

A consumer is the term for a client that is subscribing to or _consuming_ messages from a queue.

Importantly, each queue can only have one active consumer: this allows Cloudflare Queues to achieve "at least once" delivery and minimize the risk of duplicate messages beyond that.

## Messages

A message is the object you are producing to, and consuming from, a queue. Any serializable object can be published to a queue: for most developers, this means either simple strings or JSON objects.

Messages themselves can be batched when delivered to the consumer, and messages within a batch are treated as "all or nothing" when determining retries. If the "last" message in a batch fails to be processed, the entire batch will be retried.
