---
pcx_content_type: reference
title: JavaScript APIs
weight: 5
meta:
  title: Cloudflare Queues - JavaScript APIs
---

# JavaScript APIs

Cloudflare Queues is integrated with [Cloudflare Workers](/workers). To send and receive messages, you must use a Worker.

A Worker that can send messages to a Queue is a producer Worker, while a Worker that can receive messages from a Queue is a consumer Worker. It is possible for the same Worker to be a producer and consumer, if desired.

In the future, we expect to support other APIs, such as HTTP endpoints to send or receive messages. If you have any feedback about these APIs, please [contact us](mailto:queues@cloudflare.com) and we would be happy to hear from you.

## Producer

These APIs allow a producer Worker to send messages to a Queue.

An example of writing a single message to a Queue:

```ts
type Environment = {
  readonly MY_QUEUE: Queue;
};

export default {
  async fetch(req: Request, env: Environment): Promise<Response> {
    await env.MY_QUEUE.send({
      url: req.url,
      method: req.method,
      headers: Object.fromEntries(req.headers),
    });
    return new Response('Sent!');
  },
};
```

The Queues API also supports writing multiple messages at once:

```ts
const sendResultsToQueue = async (results: Array<any>, env: Environment) => {
  const batch: MessageSendRequest[] = results.map((value) => ({
    body: JSON.stringify(value),
  }));
  await env.queue.sendBatch(batch);
};
```

### `Queue`

A binding that allows a producer to send messages to a Queue.

```ts
interface Queue<Body = any> {
  send(body: Body): Promise<void>;
  sendBatch(messages: Iterable<MessageSendRequest<Body>>): Promise<void>;
}
```

{{<definitions>}}

- {{<code>}}send(body{{<param-type>}}any{{</param-type>}}){{</code>}} {{<type>}}Promise\<void>{{</type>}}

  - Sends a message to the Queue. The body can be any type supported by the [structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm#supported_types), as long as its size is less than 128 KB.
  - When the promise resolves, the message is confirmed to be written to disk.

- {{<code>}}sendBatch(body{{<param-type>}}Iterable\<MessageSendRequest\<any\>>{{</param-type>}}){{</code>}} {{<type>}}Promise\<void>{{</type>}}

  - Sends a batch of messages to the Queue. Each item in the provided [Iterable](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html) must be supported by the [structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm#supported_types). A batch can contain up to 100 messages, though items are limited to 128 KB each, and the total size of the array cannot exceed 256 KB.
  - When the promise resolves, the messages are confirmed to be written to disk.

{{</definitions>}}

### `MessageSendRequest`

A wrapper type used for sending message batches.

```ts
type MessageSendRequest<Body = any> = {
  body: Body;
};
```

{{<definitions>}}

- {{<code>}}body{{<param-type>}}any{{</param-type>}}{{</code>}}

  - The body of the message.
  - The body can be any type supported by the [structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm#supported_types), as long as its size is less than 128 KB.

{{</definitions>}}

## Consumer

These APIs allow a consumer Worker to consume messages from a Queue.

To define a consumer Worker, add a `queue` function to the default export of the Worker. This will allow it to receive messages from the Queue.

By default, all messages in the batch will be acknowledged as soon as all of the following conditions are met:

1. The `queue` function has returned.
2. If the `queue` function returned a promise, the promise has resolved.
3. Any promises passed to `waitUntil()` have resolved.

If the `queue` function throws, or the promise returned by it or any of the promises passed to `waitUntil()` were rejected, then the entire batch will be considered a failure and will be retried according to the consumer's retry settings.

```ts
export default {
  async queue(
    batch: MessageBatch,
    env: Environment,
    ctx: ExecutionContext
  ): Promise<void> {
    for (const message of batch.messages) {
      console.log('Received', message);
    }
  },
};
```

The `env` and `ctx` fields are as [documented in the Workers docs](/workers/learning/migrating-to-module-workers/).

Or alternatively, a queue consumer can be written using service worker syntax:

```js
addEventListener('queue', (event) => {
	event.waitUntil(handleMessages(event));
});
```

In service worker syntax, `event` provides the same fields and methods as `MessageBatch`, as defined below, in addition to [`waitUntil()`](https://developer.mozilla.org/en-US/docs/Web/API/ExtendableEvent/waitUntil).

### `MessageBatch`

A batch of messages that are sent to a consumer Worker.

```ts
interface MessageBatch<Body = any> {
  readonly queue: string;
  readonly messages: Message<Body>[];
  ackAll(): void;
  retryAll(): void;
}
```

{{<definitions>}}

- {{<code>}}queue{{<param-type>}}string{{</param-type>}}{{</code>}}

  - The name of the Queue that belongs to this batch.

- {{<code>}}messages{{<param-type>}}Message[]{{</param-type>}}{{</code>}}

  - An array of messages in the batch. Ordering of messages is best effort -- not guaranteed to be exactly the same as the order in which they were published. If you are interested in guaranteed FIFO ordering, please [email the Queues team](mailto:queues@cloudflare.com).

- {{<code>}}ackAll() {{<type>}}void{{</type>}}{{</code>}}

  - Marks every message as successfully delivered, regardless of whether your `queue()` consumer handler returns successfully or not. 

- {{<code>}}retryAll() {{<type>}}void{{</type>}}{{</code>}}

  - Marks every message to be retried in the next batch.

{{</definitions>}}

### `Message`

A message that is sent to a consumer Worker.

```ts
interface Message<Body = any> {
  readonly id: string;
  readonly timestamp: Date;
  readonly body: Body;
  ack(): void;
  retry(): void;
}
```

{{<definitions>}}

- {{<code>}}id{{<param-type>}}string{{</param-type>}}{{</code>}}

  - A unique, system-generated ID for the message.

- {{<code>}}timestamp{{<param-type>}}Date{{</param-type>}}{{</code>}}

  - A timestamp when the message was sent.

- {{<code>}}body{{<param-type>}}any{{</param-type>}}{{</code>}}

  - The body of the message.
  - The body can be any type supported by the [structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm#supported_types), as long as its size is less than 128 KB.

- {{<code>}}ack() {{<type>}}void{{</type>}}{{</code>}}

  - Marks a message as successfully delivered, regardless of whether your `queue()` consumer handler returns successfully or not. 

- {{<code>}}retry() {{<type>}}void{{</type>}}{{</code>}}

  - Marks a message to be retried in the next batch.

{{</definitions>}}
