---
pcx_content_type: reference
title: JavaScript APIs
weight: 5
meta:
  title: Cloudflare Queues - JavaScript APIs
---

# JavaScript APIs

Cloudflare Queues is integrated with [Cloudflare Workers](/workers). To send and receive messages, you must use a Worker. A Worker can send messages to a Queue, known as a producer Worker, or receive messages from a Queue, refered to as a consumer Worker.

In the future, we expect to support other APIs, such as HTTP endpoints to send or receive messages. If you have any feedback about these APIs, please [contact us](mailto:queues@cloudflare.com) and we would be happy to hear from you.

## Producer

These APIs allow a producer Worker to send messages to a Queue.

```ts
type Environment = {
  readonly MY_QUEUE: Queue;
};

export default {
  async fetch(request: Request, env: Environment) {
    await env.MY_QUEUE.send({
      url: request.url,
      method: request.method,
      headers: Object.fromEntries(request.headers),
    });
    return new Response("Sent!");
  },
};
```

### `Queue`

A binding that allows a producer to send messages to a Queue.

```ts
interface Queue<Body = any> {
  send(body: Body): Promise<void>;
}
```

{{<definitions>}}

- {{<code>}}send(body{{<param-type>}}any{{</param-type>}}){{</code>}} {{<type>}}Promise\<void>{{</type>}}

  - Sends a message to the Queue. The body can be any type supported by the [structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm#supported_types), as long as its size is less than 128 KB.
  - When the promise resolves, the message is confirmed to be written to disk.

{{</definitions>}}

## Consumer

These APIs allow a consumer Worker to consume messages from a Queue.

```ts
export default {
  async queue(batch: MessageBatch, env: Environment) {
    for (const message of batch.messages) {
      console.log("Received", message);
    }
  },
};
```

### `MessageBatch`

A batch of messages that are sent to a consumer Worker.

```ts
interface MessageBatch<Body = any> {
  readonly queue: string;
  readonly messages: Message<Body>[];
  retryAll(): void;
}
```

{{<definitions>}}

- {{<code>}}queue{{<param-type>}}string{{</param-type>}}{{</code>}}

  - The name of the queue that belongs to this batch.

- {{<code>}}messages{{<param-type>}}Message[]{{</param-type>}}{{</code>}}

  - An array of messages in the batch. Ordering of messages is not guaranteed.

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

- {{<code>}}retry() {{<type>}}void{{</type>}}{{</code>}}

  - Marks the message to be retried in the next batch.

{{</definitions>}}
