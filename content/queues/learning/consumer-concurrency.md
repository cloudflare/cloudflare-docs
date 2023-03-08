---
title: Consumer Concurrency
pcx_content_type: concept
weight: 4
---

# Consumer Concurrency 

Consumer concurrency allows a [consumer Worker](/queues/learning/how-queues-works/#consumers) processing messages from a queue to automatically scale out horizontally in order to keep up with the rate that messages are being written to a queue.

In many systems, the rate at which you write messages to a queue can easily exceed the rate at which a single consumer can read and process those same messages. This is often because your consumer might be parsing message contents, writing to storage or a database, or making third-party (upstream) API calls.

Queue producers are always scalable, up to the [maximum supported messages-per-second](/queues/platform/limits/) (per queue) limit.

## Configuring concurrency

Queues exposes two per-consumer properties for configuring concurrency:

* `concurrency_enabled` (boolean) - set this to `true`, leave this unset, or set it to `null` to enable concurrency, which is the default.
* `max_concurrency` (integer) - accepts a value between `1` and `10`. Leaving this unset, or setting it to `null`, will allow your consumer to scale up to the maximum.

Concurrency settings can be configured in each projects' `wrangler.toml`, via `wrangler queues consumer update <queue-name>`, and/or via the [Queues dashboard](https://dash.cloudflare.com/?to=/:account/queues).

## How concurrency works 

The number of consumers concurrently invoked for a queue will autoscale based on several factors, including:

* The number of messages in the queue (backlog)
* The rate of failed (vs. successful) invocations
* The value of `max_concurrency` set for that consumer

### Example

If you are writing 100 messages/sec to a queue with a single concurrent consumer that takes 5 seconds to process a batch of 100 messages, the number of messages in-flight will continue to grow at a rate faster than your consumer can keep up.

In this instance, Queues will notice the growing backlog and will scale the number of concurrent consumer Workers invocations up to a steady-state of (approximately) five (5) until the rate of incoming messages decreases, the consumer processes messages faster, or the consumer begins to generate errors.


## Limiting concurrency

If you have a workflow that is limited by an upstream API and/or system, you may prefer to your backlog to grow, trading off increased overall latency in order to avoid overwhelming an upstream system.

* To limit the number of concurrent consumer invocations, you can set `max_concurrency` to a fixed integer. Queues will scale the number of consumers up to that number as needed, but no higher.
* To disable concurrency entirely, you can set `concurrency_enabled: false` (opt-in). This is effectively the same as setting `max_concurrency: 1`.

Note that if you are writing messages to a queue faster than you can process them, messages may eventually reach the [maximum retention period](/queues/platform/limits/) set for that queue. Individual messages that reach that limit (by default, 4 days) will expire from the queue and be deleted.

## Billing

When multiple consumer Workers are invoked, each Worker invocation incurs [duration costs](https://developers.cloudflare.com/workers/platform/pricing/#workers).

* If you intend to process all messages written to a queue, _the effective overall cost is the same_, even with concurrency enabled.
* Enabling concurrency simply brings those costs forward, and can help prevent messages from reaching the [message retention limit](/queues/platform/limits/).

A consumer Worker that takes 2-seconds ([256 GB-seconds](https://developers.cloudflare.com/workers/platform/pricing/#workers-unbound-billing-examples)) to process a batch of messages will incur the same overall costs to process 50-million (50,000,000) messages, whether it does so concurrently (faster) or individually (slower).
