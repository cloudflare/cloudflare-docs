---
pcx_content_type: configuration
title: Durable Objects
---

<!-- 

Do not write on this page. Make edits to the /durable-objects/get-started doc instead.

-->

# Durable Objects

Durable Objects are available to anyone with a Workers paid subscription. Enable Durable Objects for your account by logging into the [Cloudflare dashboard](https://dash.cloudflare.com/) > going to **Workers & Pages** > selecting your Worker and in **Metrics**, opting in to pricing.

## Background

Durable Objects provide low-latency coordination and consistent permanent storage for the Workers platform. A given namespace can support essentially unlimited Durable Objects, with each Object having access to a transactionally consistent key-value storage API.

Durable Objects consist of a class that defines a template for creating Durable Objects, and a Workers script that instantiates and uses those Durable Objects. The class and the Workers script are linked together with a binding.

Learn more about [using Durable Objects](/durable-objects/).

---

## Durable Object class definition

```js
export class DurableObject {
  constructor(state, env) {}

  async fetch(request) {}
}
```

{{<definitions>}}

### Parameters

- `env`
  - Contains environment bindings configured for the Worker script, such as KV namespaces, secrets, and other Durable Object namespaces. Note that in traditional Workers (not using Modules syntax), these same bindings appear as global variables within the Workers script. Workers that export Durable Object classes always use the Modules syntax and have bindings delivered to the constructor rather than placed in global variables.

- `state`

  - Passed from the runtime to provide access to the Durable Object's storage as well as various metadata about the Object.

#### Properties of `state`

- `state.id` {{<type>}}DurableObjectId{{</type>}}

  - The ID of this Durable Object. It can be converted into a hex string using its `toString()` method. Inside a Durable Object, the `state.id.name` property is not defined. If you need access to the name, explicitly pass it in the fetch request to the Durable Object, for example, a query parameter in the URL.

- `state.waitUntil`

  - While `waitUntil` is available within a Durable Object, it has no effect. Refer to [Durable Object Lifespan](#durable-object-lifespan) for more information.

- `state.storage`

  - Contains methods for accessing persistent storage via the transactional storage API. Refer to [Transactional Storage API](#transactional-storage-api) for a detailed reference.

- {{<code>}}state.blockConcurrencyWhile(callback{{<param-type>}}Function(){{</param-type>}}){{</code>}} : {{<type>}}Promise{{</type>}}

  - Executes `callback()` (which may be `async`) while blocking any other events from being delivered to the object until the callback completes. This allows you to execute some code that performs I/O (such as a `fetch()`) with the guarantee that the object's state will not unexpectedly change as a result of concurrent events. All events that were not explicitly initiated as part of the callback itself will be blocked. This includes not only new incoming requests, but also responses to outgoing requests (such as `fetch()`) that were initiated outside of the callback. Once the callback completes, these events will be delivered.

    `state.blockConcurrencyWhile()` is especially useful within the constructor of your Object to perform initialization that must occur before any requests are delivered.

    If the callback throws an exception, the Object will be terminated and reset. This ensures that the Object cannot be left stuck in an uninitialized state if something fails unexpectedly. To avoid this behavior, wrap the body of your callback in a `try`/`catch` block to ensure it cannot throw an exception.

    The value returned by the callback becomes the value returned by `blockConcurrencyWhile()` itself.

{{</definitions>}}

### Durable Object lifespan

A Durable Object remains active until all asynchronous I/O, including Promises, within the Durable Object has resolved. This is true for all HTTP and/or WebSocket connections, except for failure scenarios, which may include unhandled runtime exceptions or exceeding the [CPU limit](/workers/platform/limits/#durable-objects).

From a Workers perspective, this is similar to enqueuing tasks with [`FetchEvent.waitUntil`](/workers/runtime-apis/fetch-event/). For example, in order to send a POST request without delaying a `Response`, a Worker script may include the following code:

```js
---
filename: worker.mjs
highlight: [5]
---
export default {
  fetch(req, env, ctx) {
    // Send a non-blocking POST request.
    // ~> Completes before the Worker exits.
    ctx.waitUntil(
      fetch('https://.../logs', {
        method: 'POST',
        body: JSON.stringify({
          url: req.url,
          // ...
        }),
      })
    );

    return new Response('OK');
  },
};
```

The same functionality can be achieved in a Durable Object, simply by omitting the call to `ctx.waitUntil()` for the POST request. The request will complete before the Durable Object exits:

```js
---
filename: durable.mjs
highlight: [6]
---
export class Example {
  fetch(req) {
    // NOTE: Omits `await` intentionally.
    // ~> Does not block `Response` output
    // ~> Will still wait for POST to complete
    fetch('https://.../logs', {
      method: 'POST',
      body: JSON.stringify({
        url: req.url,
        // ...
      }),
    });

    return new Response('OK');
  }
}
```

### In-memory state

A Durable Object may be evicted from memory any time, causing a loss of all transient (in-memory) state. To persistently store state your Durable Object might need in the future, use the [transactional storage API](/workers/runtime-apis/durable-objects/#transactional-storage-api).

A Durable Object is given 30 seconds of additional CPU time for every request it processes, including WebSocket messages. In the absence of failures, in-memory state should not be reset after less than 10 seconds of inactivity.

### Transactional storage API

The transactional storage API is accessible via [the `state.storage` object](#durable-object-class-definition) passed to the Durable Object constructor.

#### Methods

Each method is implicitly wrapped inside a transaction, such that its results are atomic and isolated from all other storage operations, even when accessing multiple key-value pairs.

{{<definitions>}}

- {{<code>}}get(key{{<param-type>}}string{{</param-type>}}, options{{<param-type>}}Object{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} : {{<type>}}Promise\<any>{{</type>}}

  - Retrieves the value associated with the given key. The type of the returned value will be whatever was previously written for the key, or undefined if the key does not exist.<br><br>

  **Supported options:**

- {{<code>}}allowConcurrency{{</code>}}{{<param-type>}}boolean{{</param-type>}}

    - By default, the system will pause delivery of I/O events to the object while a storage operation is in progress, in order to avoid unexpected race conditions. Pass `allowConcurrency: true` to opt out of this behavior and allow concurrent events to be delivered.

- {{<code>}}noCache{{</code>}}{{<param-type>}}boolean{{</param-type>}}

    - If true, then the key/value will not be inserted into the in-memory cache. If the key is already in the cache, the cached value will be returned, but its last-used time will not be updated. Use this when you expect this key will not be used again in the near future. This flag is only a hint: it will never change the semantics of your code, but it may affect performance.

- {{<code>}}get(keys{{<param-type>}}Array\<string>{{</param-type>}}, options{{<param-type>}}Object{{</param-type>}}){{</code>}} : {{<type>}}Promise\<Map\<string, any>\>{{</type>}}

  - Retrieves the values associated with each of the provided keys. The type of each returned value in the [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) will be whatever was previously written for the corresponding key. Results in the Map will be sorted in increasing order of their UTF-8 encodings, with any requested keys that do not exist being omitted. Supports up to 128 keys at a time.

  <br/>**Supported options:**

    Same as `get(key, options)`, above.

- {{<code>}}put(key{{<param-type>}}string{{</param-type>}}, value{{<param-type>}}any{{</param-type>}}, options{{<param-type>}}Object{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} : {{<type>}}Promise{{</type>}}

  - Stores the value and associates it with the given key. The value can be any type supported by the [structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), which is true of most types. Keys are limited to a max size of 2048 bytes and values are limited to 128 KiB (131072 bytes).<br><br>

  **Supported options:**

- {{<code>}}allowUnconfirmed{{</code>}}{{<param-type>}}boolean{{</param-type>}}

    - By default, the system will pause outgoing network messages from the Durable Object until all previous writes have been confirmed flushed to disk. If the write fails, the system will reset the Object, discard all outgoing messages, and respond to any clients with errors instead. This way, Durable Objects can continue executing in parallel with a write operation, without having to worry about prematurely confirming writes, because it is impossible for any external party to observe the Object's actions unless the write actually succeeds. After any write, subsequent network messages may be slightly delayed. Some applications may consider it acceptable to communicate on the basis of unconfirmed writes. Some programs may prefer to allow network traffic immediately. In this case, set `allowUnconfirmed()` to `true` to opt out of the default behavior. Refer to [Durable Objects: Easy, Fast, Correct — Choose three](https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/) blog post to learn more.

- {{<code>}}noCache{{</code>}}{{<param-type>}}boolean{{</param-type>}}

    - If true, then the key/value will be discarded from memory as soon as it has completed writing to disk. Use `noCache()` if the key will not be used again in the near future. This flag is only a hint: it will never change the semantics of your code, but it may affect performance. In particular, if you `get()` the key before the write to disk has completed, the copy from the write buffer will be returned, thus ensuring consistency with the latest call to `put()`.

{{<Aside type="note" header="Automatic write coalescing">}}
If you invoke `put()` (or `delete()`) multiple times without performing any `await`s in the meantime, the operations will automatically be combined and submitted atomically. In case of a machine failure, either all of the writes will have been stored to disk or none of them will have.
{{</Aside>}}

{{<Aside type="note" header="Write buffer behavior">}}
The `put()` method returns a `Promise`, but most applications can discard this promise without `await`ing it. The `Promise` usually completes immediately, because `put()` writes to an in-memory write buffer that is flushed to disk asynchronously. However, if an application performs a very large number of `put()`s without waiting for any I/O, the write buffer could theoretically grow large enough to cause the isolate to exceed its 128MB memory limit. To avoid this scenario, such applications should `await` the `Promise`s returned by `put()`. The system will then apply backpressure onto the application, slowing it down so that the write buffer has time to flush. Note that these `await`s will disable automatic write coalescing.
{{</Aside>}}

- {{<code>}}put(entries{{<param-type>}}Object{{</param-type>}}, options{{<param-type>}}Object{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} : {{<type>}}Promise{{</type>}}

  - Takes an Object and stores each of its keys and values to storage. Each value can be any type supported by the [structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), which is true of most types. Supports up to 128 key-value pairs at a time. Each key is limited to a maximum size of 2048 bytes and each value is limited to 128 KiB (131072 bytes).

  <br/>**Supported options:** Same as `put(key, value, options)`, above.

- {{<code>}}delete(key{{<param-type>}}string{{</param-type>}}){{</code>}} : {{<type>}}Promise\<boolean>{{</type>}}

  - Deletes the key and associated value. Returns `true` if the key existed or `false` if it did not.

  <br/>**Supported options:** Same as `put()`, above.

- {{<code>}}delete(keys{{<param-type>}}Array\<string>{{</param-type>}}, options{{<param-type>}}Object{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} : {{<type>}}Promise\<number>{{</type>}}

  - Deletes the provided keys and their associated values. Supports up to 128 keys at a time. Returns a count of the number of key-value pairs deleted.

<br/>**Supported options:** Same as `put()`, above.

- {{<code>}}list(){{</code>}} : {{<type>}}Promise\<Map\<string, any>\>{{</type>}}

  - Returns all keys and values associated with the current Durable Object in ascending sorted order based on the keys' UTF-8 encodings. The type of each returned value in the [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) will be whatever was previously written for the corresponding key. Be aware of how much data may be stored in your Durable Object before calling this version of `list` without options because all the data will be loaded into the Durable Object's memory, potentially hitting its [limit](/workers/platform/limits/). If that is a concern, pass options to `list` as documented below.

- {{<code>}}list(options{{<param-type>}}Object{{</param-type>}}){{</code>}} : {{<type>}}Promise\<Map\<string, any>\>{{</type>}}

  - Returns keys and values associated with the current Durable Object according to the parameters in the provided options object.

<br/>**Supported options:**

- {{<code>}}start{{</code>}}{{<param-type>}}string{{</param-type>}}

  - Key at which the list results should start, inclusive.

- {{<code>}}startAfter{{</code>}}{{<param-type>}}string{{</param-type>}}

  - Key after which the list results should start, exclusive. Cannot be used simultaneously with `start`.

- {{<code>}}end{{</code>}}{{<param-type>}}string{{</param-type>}}

  - Key at which the list results should end, exclusive.

- {{<code>}}prefix{{</code>}}{{<param-type>}}string{{</param-type>}}

  - Restricts results to only include key-value pairs whose keys begin with the prefix.

- {{<code>}}reverse{{</code>}}{{<param-type>}}boolean{{</param-type>}}

  - If true, return results in descending order instead of the default ascending order.
  - Note that enabling this does not change the meaning of `start`, `startKey`, or `endKey`. `start` still defines the smallest key in lexicographic order that can be returned (inclusive), effectively serving as the endpoint for a reverse-order list. `end` still defines the largest key in lexicographic order that the list should consider (exclusive), effectively serving as the starting point for a reverse-order list.

- {{<code>}}limit{{</code>}}{{<param-type>}}number{{</param-type>}}

  - Maximum number of key-value pairs to return.

- {{<code>}}allowConcurrency{{</code>}}{{<param-type>}}boolean{{</param-type>}}

  - Same as the option to `get()`, above.

- {{<code>}}noCache{{</code>}}{{<param-type>}}boolean{{</param-type>}}

  - Same as the option to `get()`, above.

- {{<code>}}transaction(closure{{<param-type>}}Function(txn){{</param-type>}}){{</code>}} : {{<type>}}Promise{{</type>}}

  - Runs the sequence of storage operations called on `txn` in a single transaction that either commits successfully or aborts.

      <aside class="DocsMarkdown--aside" role="note" data-type="note">
        {{<markdown>}}Explicit transactions are no longer necessary. Any series of write operations with no intervening `await` will automatically be submitted atomically, and the system will prevent concurrent events from executing while `await`ing a read operation (unless you use `allowConcurrency: true`). Therefore, a series of reads followed by a series of writes (with no other intervening I/O) are automatically atomic and behave like a transaction.{{</markdown>}}
      </aside>

- {{<code>}}txn{{</code>}}

  - Provides access to the `put()`, `get()`, `delete()` and `list()` methods documented above to run in the current transaction context. In order to get transactional behavior within a transaction closure, you must call the methods on the `txn` object instead of on the top-level `state.storage` object.<br><br>Also supports a `rollback()` function that ensures any changes made during the transaction will be rolled back rather than committed. After `rollback()` is called, any subsequent operations on the `txn` object will fail with an exception. `rollback()` takes no parameters and returns nothing to the caller.

- {{<code>}}deleteAll(){{</code>}} : {{<type>}}Promise{{</type>}}

  - Deletes all keys and associated values, effectively deallocating all storage used by the Durable Object. In the event of a failure while the `deleteAll()` operation is still in flight, it may be that only a subset of the data is properly deleted.

<br/>**Supported options:** Same as `put()`, above.

- {{<code>}}getAlarm(){{</code>}} : {{<type>}}Promise\<Number | null>{{</type>}}

  - Retrieves the current alarm time (if set) as integer milliseconds since epoch. The alarm is considered to be set if it has not started, or if it has failed and any retry has not begun. If no alarm is set, `getAlarm()` returns null.

<br/>**Supported options:** Like `get()` above, but without `noCache()`.

- {{<code>}}setAlarm(scheduledTime{{<param-type>}}Date | number{{</param-type>}}){{</code>}} : {{<type>}}Promise{{</type>}}

  - Sets the current alarm time, accepting either a JS Date, or integer milliseconds since epoch.

    If `setAlarm()` is called with a time equal to or before `Date.now()`,  the alarm will be scheduled for asynchronous execution in the immediate future. If the alarm handler is currently executing in this case, it will not be canceled. Alarms can be set to millisecond granularity and will usually execute within a few milliseconds after the set time, but can be delayed by up to a minute due to maintenance or failures while failover takes place.

**Supported options:** Like `put()` above, but without `noCache()`.

- {{<code>}}deleteAlarm(){{</code>}} : {{<type>}}Promise{{</type>}}

  - Deletes the alarm if one exists. Does not cancel the alarm handler if it is currently executing.

<br/>**Supported options:** Like `put()` above, but without `noCache()`.

- {{<code>}}sync(){{</code>}} : {{<type>}}Promise{{</type>}}

  - Synchronizes any pending writes to disk.

    This is similar to normal behavior from automatic write coalescing. If there are any pending writes in the write buffer (including those submitted with `allowUnconfirmed`), the returned promise will resolve when they complete. If there are no pending writes, the returned promise will be already resolved.

**Supported options:** None.

{{</definitions>}}

### `alarm()` handler method

The system calls the `alarm()` handler method when a scheduled alarm time is reached. The `alarm()` handler has guaranteed at-least-once execution and will be retried upon failure using exponential backoff, starting at 2 seconds delay for up to 6 retries. Retries will be performed if the method fails with an uncaught exception. Calling `deleteAlarm()` inside the `alarm()` handler may prevent retries on a best-effort basis, but is not guaranteed.

The method takes no parameters, does not return a result, and can be `async`.

#### How to use the `alarm()` handler method

In your Durable Object, the `alarm()` handler will be called when the alarm executes. Call `state.storage.setAlarm()` from anywhere in your Durable Object, and pass in a time for the alarm to run at. Use `state.storage.getAlarm()` to retrieve the currently set alarm time.

The example below implements an `alarm()` handler that wakes the Durable Object up once every 10 seconds to batch requests to a single Durable Object. The `alarm()` handler will delay processing until there is enough work in the queue.

```js
export default {
  async fetch(request, env) {
    let id = env.BATCHER.idFromName("foo");
    return await env.BATCHER.get(id).fetch(request);
  },
};

const SECONDS = 1000;

export class Batcher {
  constructor(state, env) {
    this.state = state;
    this.storage = state.storage;
    this.state.blockConcurrencyWhile(async () => {
      let vals = await this.storage.list({ reverse: true, limit: 1 });
      this.count = vals.size == 0 ? 0 : parseInt(vals.keys().next().value);
    });
  }
  async fetch(request) {
    this.count++;

    // If there is no alarm currently set, set one for 10 seconds from now
    // Any further POSTs in the next 10 seconds will be part of this batch.
    let currentAlarm = await this.storage.getAlarm();
    if (currentAlarm == null) {
      this.storage.setAlarm(Date.now() + 10 * SECONDS);
    }

    // Add the request to the batch.
    await this.storage.put(this.count, await request.text());
    return new Response(JSON.stringify({ queued: this.count }), {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });
  }
  async alarm() {
    let vals = await this.storage.list();
    await fetch("http://example.com/some-upstream-service", {
      method: "POST",
      body: Array.from(vals.values()),
    });
    await this.storage.deleteAll();
    this.count = 0;
  }
}
```

The `alarm()` handler will be called once every 10 seconds. If an unexpected error terminates the Durable Object, the `alarm()` handler will be re-instantiated on another machine. Following a short delay, the `alarm()` handler will run from the beginning on the other machine.

### `fetch()` handler method

The system calls the `fetch()` method of a Durable Object namespace when an HTTP request is sent to the Object. These requests are not sent from the public Internet, but from other [Workers using a Durable Object namespace binding](#access-a-durable-object-from-a-worker).

The method takes a [`Request`](/workers/runtime-apis/request/) as the parameter and returns a [`Response`](/workers/runtime-apis/response/) (or a `Promise` for a `Response`).

If the method fails with an uncaught exception, the exception will be thrown into the calling Worker that made the `fetch()` request.

#### {{<beta>}}WebSockets Hibernation API{{</beta>}}

Durable Objects WebSockets support includes Cloudflare-specific extensions to the standard WebSocket interface, related methods on the `state` object, and handler methods that a Durable Object can implement for processing WebSocket events.

The Hibernation API allows a Durable Object that is not currently running an event handler, such as handling a WebSocket message, HTTP request, or [alarm](/durable-objects/api/alarms-in-durable-objects/), to be removed from memory while keeping its WebSockets connected ("hibernation").

{{<Aside type="note">}}

A Durable Object that hibernates will not incur billable [Duration (GB-sec) charges](/workers/platform/pricing/#durable-objects). For applications with many long-lived Durable Objects and periodic WebSocket messages or events, using the Hibernation APIs can measurably reduce billable duration.

{{</Aside>}}

If an event occurs for a hibernated Durable Object's corresponding handler method, it will return to memory. This will call the Durable Object's constructor, so it is best to minimize work in the constructor when using WebSocket hibernation.

[Code updates](/durable-objects/platform/known-issues/#global-uniqueness) will disconnect all WebSockets.

#### WebSocket extensions

- {{<code>}}webSocket.serializeAttachment(value{{<param-type>}}any{{</param-type>}}){{</code>}} : {{<type>}}void{{</type>}}

  - Keeps a copy of `value` in memory (not on disk) such that it will survive hibernation. The value can be any type supported by the [structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), which is true of most types.
  - If you modify `value` after calling this method, those changes will not be retained unless you call this method again. The serialized size of `value` is limited to 2048 bytes, otherwise this method will throw an error. If you need larger values to survive hibernation, use the [transactional storage api](/workers/runtime-apis/durable-objects/#transactional-storage-api) and pass the corresponding key to this method so it can be retrieved later.

- {{<code>}}webSocket.deserializeAttachment(){{</code>}} : {{<type>}}any{{</type>}}

  - Retrieve the most recent value passed to `serializeAttachment`, or null if none exists.

#### `state` methods for WebSockets

- {{<code>}}state.acceptWebSocket(ws{{<param-type>}}WebSocket{{</param-type>}}, tags{{<param-type>}}Array\<string>{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} : {{<type>}}void{{</type>}}

  - Adds a WebSocket to the set attached to this object. `ws.accept()` must NOT have been called separately. Once called, any incoming messages will be delivered by calling the Durable Object's `webSocketMessage()` handler, and `webSocketClose()` will be invoked upon disconnect. After calling `state.acceptWebSocket(ws)`, the WebSocket is accepted. Therefore, you can use its `send()` and `close()` methods to send messages. Its `addEventListener()` method won't ever receive any events as they'll be delivered to the Durable Object. `tags` are optional string tags which can be used to look up the WebSocket with `getWebSockets()`. Each tag is limited to 256 characters, and each WebSocket is limited to 10 tags associated with it.
  - This API permits a maximum of 32,768 WebSocket connections per Durable Object instance, but the CPU and memory usage of a given workload may further limit the practical number of simultaneous connections.

- {{<code>}}state.getWebSockets(tag{{<param-type>}}string{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} : {{<type>}}Array\<WebSocket>{{</type>}}

  - Gets an array of accepted WebSockets matching the given tag. Disconnected WebSockets are automatically removed from the list. Calling `getWebSockets()` with no `tag` argument will return all WebSockets.

- {{<code>}}state.setWebSocketAutoResponse(webSocketRequestResponsePair{{<param-type>}}WebSocketRequestResponsePair{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} : {{<type>}}void{{</type>}}

  - Sets an application level auto-response that doesn't wake hibernated WebSockets. `state.setWebSocketAutoResponse` receives `WebSocketRequestResponsePair(request{{<param-type>}}string{{</param-type>}}, response{{<param-type>}}string{{</param-type>}})` as an argument, enabling any WebSocket that was accepted via `state.acceptWebSocket()` belonging to this object to automatically reply with `response` when it receives the specified `request`. `setWebSocketAutoResponse()` is preferable to setting up a server for static ping/pong messages because `setWebSocketAutoResponse()` handles application level ping/pongs without waking the websocket from hibernation, thereby preventing unnecessary duration charges.
  - Both `request` and `response` are limited to 2048 characters each.
  - If `state.setWebSocketAutoResponse()` is set without any argument, it will remove any previously set auto-response configuration. Doing so, will stop an actor from replying with `response` for a `request`. It will also stop updating the last timestamp of a `request`, but if there was any auto-response timestamp set, it will remain accessible with `state.getWebSocketAutoResponseTimestamp()`.

- {{<code>}}state.getWebSocketAutoResponse(){{</code>}} : {{<type>}}Object | null{{</type>}}

  - Gets the `WebSocketRequestResponsePair(request{{<param-type>}}string{{</param-type>}}, response{{<param-type>}}string{{</param-type>}})` currently set, or `null` if there's none. Each `WebSocketRequestResponsePair(request{{<param-type>}}string{{</param-type>}}, response{{<param-type>}}string{{</param-type>}})` object provides methods for `getRequest()` and  `getResponse()`.

- {{<code>}}state.getWebSocketAutoResponseTimestamp(ws{{<param-type>}}WebSocket{{</param-type>}}){{</code>}} : {{<type>}}Date | null{{</type>}}

  - Gets the most recent `Date` when the WebSocket received an auto-response request, or `null` if the given WebSocket never received an auto-response request.

#### `webSocketMessage()` handler method

The system calls the `webSocketMessage()` method when an accepted WebSocket receives a message. The method is not called for WebSocket control frames; the system will respond to an incoming [WebSocket protocol ping](https://www.rfc-editor.org/rfc/rfc6455#section-5.5.2) automatically without interrupting hibernation. The method takes `(ws: WebSocket, message: String | ArrayBuffer)` as parameters. It does not return a result and can be `async`.

#### `webSocketClose()` handler method

The system calls the `webSocketClose()` method when a WebSocket is closed. The method takes `(ws: WebSocket, code: number, reason: string, wasClean: boolean)` as parameters. `wasClean` is true if the connection closed cleanly, false otherwise. The method does not return a result and can be `async`.

#### `webSocketError()` handler method

The system calls the `webSocketError()` method for any non-disconnection related errors. The method takes `(ws: WebSocket, error: any)` as parameters. It does not return a result and can be `async`.

---

## Access a Durable Object from a Worker

To access a Durable Object from a Worker, you must first configure the Worker with a binding for a Durable Object namespace. The namespace is, in turn, configured to use a particular class and controls access to instances of that class.

Namespace bindings allow you to generate Object IDs and connect to Objects.

### Generate IDs randomly

```js
let id = OBJECT_NAMESPACE.newUniqueId();
```

The `newUniqueId()` method on a Durable Object namespace creates a new Object ID randomly. This method will never return the same ID twice, and thus, it is guaranteed that the Object does not yet exist and has never existed at the time the method returns.

When generating an ID randomly, you need to store the ID somewhere to be able to reach the same object again in the future. For example, you can store the ID in Workers KV, in an external database, or in a cookie in the user's browser.

Unique IDs are unguessable, therefore, you can use unique IDs in URL-based access control.

To store the ID in external storage, use its `toString()` method to convert it into a hexadecimal string and `OBJECT_NAMESPACE.idFromString()` to convert the string back into an ID later.

{{<Aside type="note" header="Unique IDs perform best">}}

When you construct a new unique ID, the system knows that the same ID will not be generated by another Worker running on the other side of the world at the same time. Therefore, you can instantiate the Object nearby without waiting for any round-the-world synchronization. Whenever you have a convenient place to store the ID, it is recommended to use randomly-generated IDs for best performance.

{{</Aside>}}

### Derive IDs from names

```js
let id = OBJECT_NAMESPACE.idFromName(name);
```

#### Parameters

{{<definitions>}}

- `name` {{<type>}}string{{</type>}}
  - The Object name, an arbitrary string from which the ID is derived.

{{</definitions>}}

This method derives a unique object ID from the given name string. It will always return the same ID when given the same name as input.

{{<Aside type="note" header="Name-derived IDs require global lookups at creation">}}

The first time you access a Durable Object based on an ID derived from a name, the system does not know anything about the Object. It is possible that a Worker on the opposite side of the world could have coincidentally decided to access the same Object at the same time. To guarantee that only one instance of the Object is created worldwide, the system must check whether the Object has been created anywhere else. Due to the inherent limit of the speed of light, this round-the-world check can take up to a few hundred milliseconds. After this check, the Object will be instantiated near where it was first requested.

After the object has been accessed the first time, location information will be cached around the world so that subsequent lookups can be faster.

{{</Aside>}}

### Parse previously-created IDs from strings

```js
let id = OBJECT_NAMESPACE.idFromString(hexId);
```

#### Parameters

{{<definitions>}}

- `hexId` {{<type>}}string{{</type>}}
  - An ID string constructed by calling the `toString()` method of an existing ID.

{{</definitions>}}

This method parses an ID that was previously stringified. This is useful in particular with IDs created using `newUniqueId()`, as these IDs need to be stored somewhere, probably as a string.

A stringified object ID is a 64-digit hexadecimal number. However, not all 64-digit hex numbers are valid IDs. This method will throw if it is passed an ID that was not originally created by `newUniqueId()` or `idFromName()`. It will also throw if the ID was originally created for a different namespace.

### Obtain an Object stub

```js
let stub = OBJECT_NAMESPACE.get(id);
```

#### Parameters

{{<definitions>}}

- `id` {{<type>}}DurableObjectId{{</type>}}
  - An ID constructed using `newUniqueId()`, `idFromName()`, or `idFromString()` on this namespace.

{{</definitions>}}

This method constructs an Object stub, which is a local client that provides access to a remote Durable Object.

If the remote Object does not already exist, it will be created. Thus, there will always be an Object accessible from the stub.

This method always returns the stub immediately, before it has connected to the remote object. This allows you to begin making requests to the object right away, without waiting for a network round trip.

#### Provide a location hint

Durable Objects do not currently move between geographical regions after they are created<sup>1</sup>. By default, Durable Objects are created close to the first client that accesses them via `GET`. To manually create Durable Objects in another location, provide an optional `locationHint` parameter to `GET`. Only the first call to `GET` for a particular object will respect the hint.

```js
let stub = OBJECT_NAMESPACE.get(id, { locationHint: 'enam' });
```

The following `locationHint`s are supported. Note that hints are a best effort and not a guarantee. Durable Objects do not currently run in all of the locations below. The closest nearby region will be used until those locations are fully supported.

| Location Hint Parameter  | Location              |
| ------------------------ | --------------------- |
| wnam                     | Western North America |
| enam                     | Eastern North America |
| sam                      | South America         |
| weur                     | Western Europe        |
| eeur                     | Eastern Europe        |
| apac                     | Asia-Pacific          |
| oc                       | Oceania               |
| afr                      | Africa                |
| me                       | Middle East           |

<sup>1</sup> Dynamic relocation of existing Durable Objects is planned for the future.

### Restrict objects to a jurisdiction

Durable Objects can be created so that they only run and store data within a specific jurisdiction to comply with local regulations such as the [GDPR](https://gdpr-info.eu/) or [FedRAMP](https://blog.cloudflare.com/cloudflare-achieves-fedramp-authorization/). To use a jurisdiction, first create a jursidictional subnamespace:

```js
let subnamespace = OBJECT_NAMESPACE.jurisdiction('eu');
```

A jurisdictional subnamespace works exactly like a normal Durable Object namespace (`OBJECT_NAMESPACE` above), except that IDs created within them permanently encode the jurisdiction that was used to create the subnamespace. Additionally, the `idFromString` and `get` methods will throw an exception if the IDs passed into them are not within the subnamespace's jurisdiction. Once you have a subnamespace you can use all of the namespace methods documented above.

To create a new Object ID that will only run and persist data within the jurisdiction:

```js
let id = subnamespace.newUniqueId();
```

To derive a unique object ID from the given name string that will only run and persist data within the jurisdiction:

```js
let id = subnamespace.idFromName(name);
```

{{<Aside type="note" header="IDs derived from the same name but different jurisdictions will differ">}}

Because the jurisdiction is encoded permanently in the Object ID, it is possible to have the same name represent different objects in different jurisdictions. For example: `OBJECT_NAMESPACE.idFromName('my-name')` and `OBJECT_NAMESPACE.jurisdiction('eu').idFromName('my-name')` represent different objects. They will have their own transient (in-memory) and persistent state, and will likely run in different geographical regions.

This may be counterintuitive at first, but it would be impossible to enforce two different non-overlapping jurisdictions for a single name. The key insight to remember is that Durable Object namespaces operate on IDs, not names, and the jurisdiction is a permanent part of the ID.

{{</Aside>}}

To parse a previously-created ID from a string:

```js
let id = subnamespace.idFromString(id);
```

To obtain an object stub:

```js
let stub = subnamespace.get(id)
```

While you cannot use an ID from a different jurisdiction in a subnamespace's `idFromString` or `get` methods, you can use any valid ID in the top-level namespace's methods. Object IDs created with a jurisdiction will still only run and persist data within the jurisdiction.

```js
let id = subnamespace.idFromName(name);

// This is valid.
OBJECT_NAMESPACE.idFromString(id.toString())

// And so is this.
OBJECT_NAMESPACE.get(id)
```

Your Workers may still access Objects constrained to a jurisdiction from anywhere in the world. The jurisdiction constraint only controls where the Durable Object itself runs and persists data. Consider using [Regional Services](https://blog.cloudflare.com/introducing-regional-services/) to control the regions from which Cloudflare responds to requests.

The currently supported jurisdictions are `eu` (the European Union) and `fedramp` (FedRAMP).

{{<Aside type="note" header="ID logging">}}

Object IDs will be logged outside of the specified jurisdiction for billing and debugging purposes.

{{</Aside>}}

## Object stubs

A Durable Object stub is a client object used to send requests to a remote Durable Object.

A stub is created using `OBJECT_NAMESPACE.get(id)` (above).

Stubs implement E-order semantics. When you make multiple calls to the same stub, it is guaranteed that the calls will be delivered to the remote Object in the order in which you made them. This ordering guarantee often makes many distributed programming problems easier. However, due to random network disruptions or other transient issues, a stub may become disconnected from its remote Object. A disconnected stub is a permanently broken stub. In this scenario, all in-flight calls and future calls will fail with exceptions. To make new requests to the Durable Object, you must call `OBJECT_NAMESPACE.get(id)` again to get a new stub, keeping in mind that there are no ordering guarantees between requests to the new stub versus the old one. If ordering is not a concern, you can create a new stub for every request.

{{<Aside type="note" header="E-order">}}

E-order is a concept deriving from the [E distributed programming language](<https://en.wikipedia.org/wiki/E_(programming_language)>). E-order is implemented by the [Cap'n Proto](https://capnproto.org) distributed object-capability RPC protocol, which Cloudflare Workers uses for internal communications.

{{</Aside>}}

### Send HTTP requests

```js
let response = await stub.fetch(request);
let response = await stub.fetch(url, options);
```

The `fetch()` method of a stub has the exact same signature as the [global `fetch`](/workers/runtime-apis/fetch/). However, instead of sending an HTTP request to the Internet, the request is always sent to the Durable Object to which the stub points.

Any uncaught exceptions thrown by the Durable Object's `fetch()` handler will be propagated to the caller's `fetch()` promise. Furthermore, if an uncaught exception is thrown by the Durable Object's `fetch()` handler, then the exception propagated to the caller's `fetch()` promise will include a property `.remote`, which will be set to `True`. If the caller's `fetch()` failed as a result of being unable to reach the Durable Object, the exception thrown to the caller's `fetch()` will not have the `.remote` property, indicating the exception was not generated remotely.

## List Durable Objects

The Cloudflare REST API supports retrieving a [list of Durable Objects](/api/operations/durable-objects-namespace-list-objects) within a namespace and a [list of namespaces](/api/operations/durable-objects-namespace-list-namespaces) associated with an account.

## Related resources

- [Learn how to use Durable Objects](/durable-objects/)
