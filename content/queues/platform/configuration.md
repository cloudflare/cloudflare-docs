---
pcx_content_type: reference
title: Configuration
weight: 6
meta:
  title: Cloudflare Queues - Configuration
---

# Configuration

Cloudflare Queues can be configured using [Wrangler](/workers/wrangler/install-and-update/), the command-line interface for Cloudflare's Developer Platform, which includes [Workers](/workers/), [R2](/r2/), and other developer products.

Each Worker has a `wrangler.toml` configuration file that specifies environment variables, triggers, and resources, such as a Queue. To enable Worker-to-resource communication, you must set up a [binding](/workers/configuration/bindings/) in your Worker project's `wrangler.toml` file.

Use the options below to configure your Queue.

{{<Aside type="note">}}

Below are options for Queues, refer to the Wrangler documentation for a full reference of [`wrangler.toml`](/workers/wrangler/configuration/).

{{</Aside>}}

## Producer

To enable Producer Worker to Queue communication, set up a binding in your `wrangler.toml` file. These options should be used when a Worker wants to send messages to a Queue.

```toml
[[queues.producers]]
  queue = "my-queue"
  binding = "MY_QUEUE"
```

{{<definitions>}}

- {{<code>}}queue{{</code>}} {{<type>}}string{{</type>}}

  - The name of the Queue.

- {{<code>}}binding{{</code>}} {{<type>}}string{{</type>}}

  - The name of the binding, which is a JavaScript variable.

{{</definitions>}}

## Consumer

To enable Consumer Worker to Queue communication, set up a binding in your `wrangler.toml` file. These options should be used when a Worker wants to receive messages from a Queue.

```toml
[[queues.consumers]]
  queue = "my-queue"
  max_batch_size = 10
  max_batch_timeout = 30
  max_retries = 10
  dead_letter_queue = "my-queue-dlq"
```

Refer to [Limits](/queues/platform/limits) to review the maximum values for each of these options.

{{<definitions>}}

- {{<code>}}queue{{</code>}} {{<type>}}string{{</type>}}

  - The name of the Queue.

- {{<code>}}max_batch_size{{</code>}} {{<type>}}number{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The maximum number of messages allowed in each batch.

- {{<code>}}max_batch_timeout{{</code>}} {{<type>}}number{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The maximum number of seconds to wait until a batch is full.

- {{<code>}}max_retries{{</code>}} {{<type>}}number{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The maximum number of retries for a message, if it fails or [`retryAll()`](/queues/platform/javascript-apis/#messagebatch) is invoked.

- {{<code>}}dead_letter_queue{{</code>}} {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The name of another Queue to send a message if it fails processing at least `max_retries` times.
  - If a `dead_letter_queue` is not defined, messages that repeatedly fail processing will eventually be discarded.
  - If there is no Queue with the specified name, it will be created automatically.

- {{<code>}}max_concurrency{{</code>}} {{<type>}}number{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The maximum number of concurrent consumers allowed to run at once. Leaving this unset will mean that the number of invocations will scale to the [currently supported maximum](/queues/platform/limits/).
  - Refer to [Consumer concurrency](/queues/learning/consumer-concurrency/) for more information on how consumers autoscale, particularly when messages are retried.

{{</definitions>}}
