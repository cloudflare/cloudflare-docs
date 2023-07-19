---
title: How Queues Works
pcx_content_type: concept
weight: 1
---

# How Queues works

Cloudflare Queues is a flexible messaging queue that allows you to queue messages for asynchronous processing. Message queues are great at decoupling components of applications, like the checkout and order fulfillment services for an e-commerce site. Decoupled services are easier to reason about, deploy, and implement, allowing you to ship features that delight your customers without worrying about synchronizing complex deployments. Queues also allow you to batch and buffer calls to downstream services and APIs.

There are four major concepts to understand with Queues:

1. [Queues](#what-is-a-queue)
2. [Producers](#producers)
3. [Consumers](#consumers)
4. [Messages](#messages)

## What is a queue

A queue is a buffer or list that automatically scales as messages are written to it, and allows a consumer Worker to pull messages from that same queue.

Queues are designed to be reliable, and messages written to a queue should never be lost once the write succeeds. Similarly, messages are not deleted from a queue until the [consumer](#consumers) has successfully consumed the message.

Developers can create multiple queues. Creating multiple queues can be useful to:

* Separate different use-cases and processing requirements: for example, a logging queue vs. a password reset queue.
* Horizontally scale your overall throughput (messages per second) by using multiple queues to scale out.
* Configure different batching strategies for each consumer connected to a queue.

For most applications, a single producer Worker per queue, with a single consumer Worker consuming messages from that queue allows you to logically separate the processing for each of your queues.

## Producers

A producer is the term for a client that is publishing or producing messages on to a queue. A producer is configured by [binding](/workers/configuration/bindings/) a queue to a Worker and writing messages to the queue by calling that binding.

For example, if we bound a queue named `my-first-queue` to a binding of `MY_FIRST_QUEUE`, messages can be written to the queue by calling `send()` on the binding:

```ts
type Environment = {
  readonly MY_FIRST_QUEUE: Queue;
};

export default {
  async fetch(req: Request, env: Environment): Promise<Response> {
    let message = {
      url: req.url,
      method: req.method,
      headers: Object.fromEntries(req.headers),
    };
    await env.MY_FIRST_QUEUE.send(message); // This will throw an exception if the send fails for any reason
  },
};
```

A queue can have multiple producer Workers. For example, you may have multiple producer Workers writing events or logs to a shared queue based on incoming HTTP requests from users. There is no limit to the total number of producer Workers that can write to a single queue.

Additionally, multiple queues can be bound to a single Worker. That single Worker can decide which queue to write to (or write to multiple) based on any logic you define in your code.

## Consumers

### Create a consumer

A consumer is the term for a client that is subscribing to or _consuming_ messages from a queue. In its most basic form, a consumer is defined by creating a `queue` handler in a Worker:

```ts
export default {
  async queue(batch: MessageBatch<Error>, env: Environment): Promise<void> {
    // Do something with messages in the batch
    // i.e. write to R2 storage, D1 database, or POST to an external API
    // You can also iterate over each message in the batch by looping over batch.messages
  },
};
```

You then connect that consumer to a queue with `wrangler queues consumer <queue-name> <worker-script-name>` or by defining a `[[queues.consumers]]` configuration in your `wrangler.toml` manually:

```toml
---
filename: wrangler.toml
---
[[queues.consumers]]
  queue = "<your-queue-name>"
  max_batch_size = 100 # optional
  max_batch_timeout = 30 # optional
```

Importantly, each queue can only have one active consumer. This allows Cloudflare Queues to achieve at least once delivery and minimize the risk of duplicate messages beyond that.

{{<Aside type="note" header="Best practice">}}

Configure a single consumer per queue. This both logically separates your queues, and ensures that errors (failures) in processing messages from one queue do not impact your other queues.

{{</Aside>}}

Notably, you can use the same consumer with multiple queues. The queue handler that defines your consumer Worker will be invoked by the queues it is connected to.

* The `MessageBatch` that is passed to your `queue` handler includes a `queue` property with the name of the queue the batch was read from.
* This can reduce the amount of code you need to write, and allow you to process messages based on the name of your queues.

For example, a consumer configured to consume messages from multiple queues would resemble the following:

```ts
export default {
  async queue(batch: MessageBatch<Error>, env: Environment): Promise<void> {
    // MessageBatch has a `queue` property we can switch on
    switch (batch.queue) {
      case 'log-queue':
        // Write the batch to R2
        break;
      case 'debug-queue':
        // Write the message to the console or to another queue
        break;
      case 'email-reset':
        // Trigger a password reset email via an external API
        break;
      default:
      // Handle messages we haven't mentioned explicitly (write a log, push to a DLQ)
    }
  },
};
```
### Remove a consumer

To remove a queue from your project, run `wrangler queues consumer remove <queue-name> <script-name>` and then remove the desired queue below the `[[queues.consumers]]` in `wrangler.toml` file.

## Messages

A message is the object you are producing to and consuming from a queue. Any serializable object can be published to a queue: for most developers, this means either simple strings or JSON objects.

Messages themselves can be batched when delivered to the consumer, and messages within a batch are treated as all or nothing when determining retries. If the last message in a batch fails to be processed, the entire batch will be retried.
