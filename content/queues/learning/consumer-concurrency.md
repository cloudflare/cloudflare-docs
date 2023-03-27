---
title: Consumer concurrency
pcx_content_type: concept
weight: 4
---

# Consumer concurrency 

Consumer concurrency allows a [consumer Worker](/queues/learning/how-queues-works/#consumers) processing messages from a queue to automatically scale out horizontally to keep up with the rate that messages are being written to a queue.

In many systems, the rate at which you write messages to a queue can easily exceed the rate at which a single consumer can read and process those same messages. This is often because your consumer might be parsing message contents, writing to storage or a database, or making third-party (upstream) API calls.

Note that queue producers are always scalable, up to the [maximum supported messages-per-second](/queues/platform/limits/) (per queue) limit.

## Enable concurrency

{{<Aside type="warning">}}

Queue consumers will soon automatically scale up concurrently as a queues' backlog grows in order to keep overall message processing latency down. Concurrency will be enabled on all existing queues by 2023-03-28.

**To opt-out, or to configure a fixed maximum concurrency**, set `max_concurrency = 1` in your `wrangler.toml` file or via [the queues dashboard](https://dash.cloudflare.com/?to=/:account/queues).

**To opt-in to concurrency, you do not need to take any action**: your consumer will begin to scale out as needed to keep up with your message backlog. It will scale back down as the backlog shrinks, and/or if a consumer starts to generate a higher rate of errors. To learn more about how consumers scale, refer to the [consumer concurrency](/queues/learning/consumer-concurrency/) documentation.

{{</Aside>}}

By default, all queues have concurrency enabled. Queue consumers will automatically scale up [to the maximum concurrent invocations](/queues/platform/limits/) as needed to manage a queue's backlog and/or error rates. 

## How concurrency works 

The number of consumers concurrently invoked for a queue will autoscale based on several factors, including:

* The number of messages in the queue (backlog) and its rate of growth.
* The ratio of failed (versus successful) invocations.
* The value of `max_concurrency` set for that consumer.

Where possible, Queues will optimize for keeping your backlog from growing exponentialy, in order to minimize scenarios where the backlog of messages in a queue grows to the point that they would reach the [message retention limit](/queues/platform/limits/) before being processed.

### Example

If you are writing 100 messages/second to a queue with a single concurrent consumer that takes 5 seconds to process a batch of 100 messages, the number of messages in-flight will continue to grow at a rate faster than your consumer can keep up.

In this scenario, Queues will notice the growing backlog and will scale the number of concurrent consumer Workers invocations up to a steady-state of (approximately) five (5) until the rate of incoming messages decreases, the consumer processes messages faster, or the consumer begins to generate errors.

## Limit concurrency

{{<Aside type="warning" header="Recommended concurrency setting">}}

Cloudflare recommends leaving the maximum concurrency unset, which will allow your queue consumer to scale up as much as possible. Setting a fixed number means that your consumer will only ever scale up to that maximum, even as Queues increases the maximum supported invocations over time.

{{</Aside>}}

If you have a workflow that is limited by an upstream API and/or system, you may prefer for your backlog to grow, trading off increased overall latency in order to avoid overwhelming an upstream system.

Concurrency settings can be configured in each projects' `wrangler.toml` file and/or the Cloudflare dashboard. To set concurrency settings in the Cloudflare dashboard:

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Select the **Workers** dropdown > **Queues**.
3. Select your queue > **Settings**.
4. Set **Maximum consumer invocations** to a value between `1` and `10`. This value represents the maximum number of concurrent consumer invocations available to your queue.

To remove a fixed maximum value, select **auto (recommended)**.

Note that if you are writing messages to a queue faster than you can process them, messages may eventually reach the [maximum retention period](/queues/platform/limits/) set for that queue. Individual messages that reach that limit will expire from the queue and be deleted.

### Set concurrency settings via `wrangler.toml`

{{<Aside type="note">}}

Ensure you are using the latest version of [wrangler](/workers/wrangler/install-and-update/). Support for configuring the maximum concurrency of a queue consumer is currently only supported in `wrangler@beta` (`wrangler@0.0.0-ace46939` or greater). 

{{</Aside>}}

To set a fixed maximum number of concurrent consumer invocations for a given queue, configure a `max_concurrency` in your `wrangler.toml` file:

```toml
---
filename: wrangler.toml
---
[[queues.consumers]]
  queue = "my-queue"
  max_concurrency = 1
```

To remove the limit, remove the `max_concurrency` setting from the `[[queues.consumers]]` configuration for a given queue and call `wrangler publish` to push your configuration update. 

<!-- Not yet available but will be very soon 
### wrangler CLI

```sh
# where `N` is a positive integer between 1 and 10
$ wrangler queues consumer update <script-name> --max-concurrency=N
```

To remove the limit and allow Queues to scale your consumer to the maximum number of invocations, call `consumer update`  without any flags:

```sh
# Call update without passing a flag to allow concurrency to scale to the maximum
$ wrangler queues consumer update <script-name>
```
-->
## Billing

When multiple consumer Workers are invoked, each Worker invocation incurs [duration costs](https://developers.cloudflare.com/workers/platform/pricing/#workers).

* If you intend to process all messages written to a queue, _the effective overall cost is the same_, even with concurrency enabled.
* Enabling concurrency simply brings those costs forward, and can help prevent messages from reaching the [message retention limit](/queues/platform/limits/).

A consumer Worker that takes 2 seconds ([256 GB-seconds](/workers/platform/pricing/#workers-unbound-billing-examples)) to process a batch of messages will incur the same overall costs to process 50 million (50,000,000) messages, whether it does so concurrently (faster) or individually (slower).
