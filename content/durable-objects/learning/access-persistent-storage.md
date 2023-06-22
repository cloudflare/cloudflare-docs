---
title: Access persistent storage from a Durable Object
pcx_content_type: concept
weight: 16
---

# Persistent Storage from a Durable Object

Durable Objects gain access to a persistent [transactional storage API](/durable-objects/api/transactional-storage-api/) via the first parameter passed to the Durable Object constructor. 

While access to a Durable Object is single-threaded, request executions can still interleave with each other when they wait on I/O, such as when waiting on the promises returned by persistent storage methods or `fetch` requests.

```js
export class DurableObjectExample {
  constructor(state, env) {
    this.state = state;
  }

  async fetch(request) {
    let ip = request.headers.get("CF-Connecting-IP");
    let data = await request.text();
    let storagePromise = this.state.storage.put(ip, data);
    await storagePromise;
    return new Response(ip + " stored " + data);
  }
}
```

The Durable Objects [transactional storage API](/durable-objects/api/transactional-storage-api/) employs several techniques to help you avoid common storage bugs:

- Each individual storage operation is strictly ordered with respect to all others. Even if the operation completes asynchronously (requiring you to `await` a promise), results will always be accurate as of the time the operation was invoked.

- A Durable Object can process multiple concurrent requests. However, when a storage operation is in progress (such as, when you use `await` to receive the result of a `get()`), delivery of concurrent events will be paused. Pausing ensures that the state of the Object cannot unexpectedly change while a read operation is in-flight, which would otherwise make it challenging to keep in-memory state properly synchronized with on-disk state. If desired, you can bypass this behavior by using the option [`allowConcurrency: true`](/durable-objects/api/transactional-storage-api/#methods).

- If multiple write operations are performed consecutively without using `await`, then the write operations will automatically be merged and applied atomically. In case of a machine failure, either all operations will have been stored to disk, or none.

- Write operations are queued to a write buffer, allowing calls like `put()` and `delete()` to complete immediately from the application's point of view. However, when the application initiates an outgoing network message (such as responding to a request, or invoking `fetch()`), the network request will be held until all previous writes are confirmed to be durable. This ensures that an application cannot accidentally confirm a write prematurely. If desired, you can bypass this behavior by using the option [`allowUnconfirmed: true`](/durable-objects/api/transactional-storage-api/#methods).

- The transactional storage API implements in-memory caching layer to improve performance. Reads that hit cache will return instantly, without context-switching to another thread. When reading or writing a value where caching is not worthwhile, you may use the option [`noCache: true`](/durable-objects/api/transactional-storage-api/#methods). `noCache: true` only affects performance, not the behavior.

For more discussion about these features, refer to the [Durable Objects: Easy, Fast, Correct – Choose Three](https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/) blog post.