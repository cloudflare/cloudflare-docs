---
pcx_content_type: reference
title: Configuration
weight: 6
meta:
  title: Cloudflare Queues - Configuration
---

# Configuration

Cloudflare Queues can be configured using [Wrangler](/workers/wrangler/get-started/), the command-line interface for Cloudflare's Developer Platform, which includes [Workers](/workers/), [R2](/r2/), and other developer products.

Each Worker has a `wrangler.toml` configuration file that specifies environment variables, triggers, and resources, such as a Queue. Use the options below to configure your Queue.

{{<Aside type="note">}}

Below are options for Queues, refer to the Wrangler documentation for a full reference of [`wrangler.toml`](/workers/wrangler/configuration/).

{{</Aside>}}

## Producer

These options should be used when a Worker wants to send messages to a Queue.

```toml
[[queues.producers]]
  queue = "my-queue"
  binding = "MY_QUEUE"
```

{{<definitions>}}

- {{<code>}}queue{{<param-type>}}string{{</param-type>}}{{</code>}}

  - The name of the Queue.

- {{<code>}}binding{{<param-type>}}string{{</param-type>}}{{</code>}}

  - The name of the binding, which is a JavaScript variable.

{{</definitions>}}

## Consumer

These options should be used when a Worker wants to receive messages from a Queue.

```toml
[[queues.consumers]]
  queue = "my-queue"
  max_batch_size = 10
  max_batch_timeout = 30
  max_retries = 10
  dead_letter_queue = "my-queue-dlq"
```

{{<definitions>}}

- {{<code>}}queue{{<param-type>}}string{{</param-type>}}{{</code>}}

  - The name of the Queue.

- {{<code>}}max_batch_size{{<param-type>}}number{{</param-type>}}{{</code>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The maximum number of messages allowed in each batch.

- {{<code>}}max_batch_timeout{{<param-type>}}number{{</param-type>}}{{</code>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The maximum number of seconds to wait until a batch is full.

- {{<code>}}max_retries{{<param-type>}}number{{</param-type>}}{{</code>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The maximum number of retries for a message, if it fails or [`retryAll()`](/queues/javascript-apis/#messagebatch) is invoked.

- {{<code>}}dead_letter_queue{{<param-type>}}string{{</param-type>}}{{</code>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The name of another Queue to send a message if it fails and cannot be delivered. If one is not defined, messages will be discarded.
  - If there is no Queue with the specified name, it will be created automatically.

{{</definitions>}}
