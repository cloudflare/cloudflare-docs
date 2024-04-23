---
title: Dead Letter Queues
pcx_content_type: concept
weight: 3
---

# Dead Letter Queues

A Dead Letter Queue (DLQ) is a common concept in a messaging system, and represents where messages are sent when a delivery failure occurs with a consumer after `max_retries` is reached. A Dead Letter Queue is like any other queue, and can be produced to and consumed from independently.

With Cloudflare Queues, a Dead Letter Queue is defined within your [consumer configuration](/queues/reference/configuration/). Messages are delivered to the DLQ when they reach the configured retry limit for the consumer. Without a DLQ configured, messages that reach the retry limit are deleted permanently.

For example, the following consumer configuration would send messages to our DLQ named `"my-other-queue"` after retrying delivery (by default, 3 times):

```toml
---
filename: wrangler.toml
---
[[queues.consumers]]
  queue = "my-queue"
  dead_letter_queue = "my-other-queue"
```

You can also configure a DLQ when creating a consumer from the command-line using `wrangler`:

```sh
$ wrangler queues consumer add $QUEUE_NAME $SCRIPT_NAME --dead-letter-queue=$NAME_OF_OTHER_QUEUE
```

To process messages placed on your DLQ, you need to [configure a consumer](/queues/reference/configuration/) for that queue as you would with any other queue.

Messages delivered to a DLQ without an active consumer will persist for four (4) days before being deleted from the queue.
