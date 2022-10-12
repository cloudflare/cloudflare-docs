---
pcx_content_type: configuration
title: Durable Objects
---

# Durable Objects

Durable Objects are available to anyone with a Workers paid subscription. You can enable them for your account in [the Cloudflare dashboard](https://dash.cloudflare.com/) by navigating to “Workers” and opting in to pricing.

## Background

Durable Objects provide low-latency coordination and consistent storage for the Workers platform. A given namespace can support essentially unlimited Durable Objects, with each Object having access to a transactionally consistent key-value storage API.

Durable Objects consist of two components: a class that defines a template for creating Durable Objects and a Workers script that instantiates and uses those Durable Objects. The class and the Workers script are linked together with a binding.

Learn more about [using Durable Objects](/workers/learning/using-durable-objects/).

---

## Durable Object class definition

```js
export class DurableObject {
  constructor(state, env) {}

  async fetch(request) {}
}
```

{{<definitions>}}

- `state`

  - Passed from the runtime to provide access to the Durable Object's storage as well as various metadata about the Object.

- `state.id` {{<type>}}DurableObjectId{{</type>}}

  - The ID of this Durable Object. It can be converted into a hex string using its `.toString()` method.

- `state.waitUntil`

  - While `waitUntil` is available within a Durable Object, it has no effect. Refer to [Durable Object Lifespan](#durable-object-lifespan) for more information.

- `state.storage`

  - Contains methods for accessing persistent storage via the transactional storage API. Refer to [Transactional Storage API](#transactional-storage-api) for a detailed reference.

- {{<code>}}state.blockConcurrencyWhile(callback{{<param-type>}}Function(){{</param-type>}}){{</code>}} {{<type>}}Promise{{</type>}}

  - Executes `callback()` (which may be `async`) while blocking any other events from being delivered to the object until the callback completes. This allows you to execute some code that performs I/O (such as a `fetch()`) with the guarantee that the object's state will not unexpectedly change as a result of concurrent events. All events that were not explicitly initiated as part of the callback itself will be blocked. This includes not only new incoming requests, but also responses to outgoing requests (such as `fetch()`) that were initiated outside of the callback. Once the callback completes, these events will be delivered.

    `state.blockConcurrencyWhile()` is especially useful within the constructor of your Object to perform initialization that must occur before any requests are delivered.

    If the callback throws an exception, the Object will be terminated and reset. This ensures that the Object cannot be left stuck in an uninitialized state if something fails unexpectedly. To avoid this behavior, wrap the body of your callback in a `try`/`catch` block to ensure it cannot throw an exception.

    The value returned by the callback becomes the value returned by `blockConcurrencyWhile()` itself.

- `env`
  - Contains environment bindings configured for the Worker script, such as KV namespaces, secrets, and other Durable Object namespaces. Note that in traditional Workers (not using Modules syntax), these same bindings appear as global variables within the Workers script. Workers that export Durable Object classes always use the Modules syntax and have bindings delivered to the constructor rather than placed in global variables.

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

A Durable Object may be evicted from memory any time, causing a loss of all transient (in-memory) state. To persistently store state your Durable Object might need in the future, use the Transactional Storage API.

A Durable Object is given 30 seconds of additional CPU time for every request it processes, including WebSocket messages. In the absence of failures, in-memory state should not be reset after less than 30 seconds of inactivity.

### Transactional storage API

The transactional storage API is accessible via [the `state.storage` object](#durable-object-class-definition) passed to the Durable Object constructor.

#### Methods

Each method is implicitly wrapped inside a transaction, such that its results are atomic and isolated from all other storage operations, even when accessing multiple key-value pairs.

{{<definitions>}}

- {{<code>}}get(key{{<param-type>}}string{{</param-type>}}, options{{<param-type>}}Object{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} {{<type>}}Promise\<any>{{</type>}}

  - Retrieves the value associated with the given key. The type of the returned value will be whatever was previously written for the key, or undefined if the key does not exist.<br><br>

    **Supported options:**

    - {{<code>}}allowConcurrency{{<param-type>}}boolean{{</param-type>}}{{</code>}}

      - By default, the system will pause delivery of I/O events to the object while a storage operation is in progress, in order to avoid unexpected race conditions. Pass `allowConcurrency: true` to opt out of this behavior and allow concurrent events to be delivered.

    - {{<code>}}noCache{{<param-type>}}boolean{{</param-type>}}{{</code>}}

      - If true, then the key/value will not be inserted into the in-memory cache. If the key is already in the cache, the cached value will be returned, but its last-used time will not be updated. Use this when you expect this key will not be used again in the near future. This flag is only a hint: it will never change the semantics of your code, but it may affect performance.

- {{<code>}}get(keys{{<param-type>}}Array\<string>{{</param-type>}}, options{{<param-type>}}Object{{</param-type>}}){{</code>}} {{<type>}}Promise\<Map\<string, any>>{{</type>}}

  - Retrieves the values associated with each of the provided keys. The type of each returned value in the [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) will be whatever was previously written for the corresponding key. Results in the Map will be sorted in increasing order of their UTF-8 encodings, with any requested keys that do not exist being omitted. Supports up to 128 keys at a time.

    **Supported options:**

    Same as `get(key, options)`, above.

- {{<code>}}put(key{{<param-type>}}string{{</param-type>}}, value{{<param-type>}}any{{</param-type>}}, options{{<param-type>}}Object{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} {{<type>}}Promise{{</type>}}

  - Stores the value and associates it with the given key. The value can be any type supported by the [structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), which is true of most types. Keys are limited to a max size of 2048 bytes and values are limited to 128 KiB (131072 bytes).<br><br>

    **Supported options:**

    - {{<code>}}allowUnconfirmed{{<param-type>}}boolean{{</param-type>}}{{</code>}}

      - By default, the system will pause outgoing network messages from the Durable Object until all previous writes have been confirmed flushed to disk. In the unlikely event that the write fails, the system will reset the Object, discard all outgoing messages, and respond to any clients with errors instead. This way, Durable Objects can continue executing in parallel with a write operation, without having to worry about prematurely confirming writes, because it is impossible for any external party to observe the Object's actions unless the write actually succeeds. However, this does mean that after any write, subsequent network messages may be slightly delayed. Some applications may consider it acceptable to communicate on the basis of unconfirmed writes and may prefer to allow network traffic immediately. In this case, set `allowUnconfirmed` to `true` to opt out of the default behavior. Refer to [this blog post for an in-depth discussion](https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/).

    - {{<code>}}noCache{{<param-type>}}boolean{{</param-type>}}{{</code>}}

      - If true, then the key/value will be discarded from memory as soon as it has completed writing to disk. Use this when you expect this key will not be used again in the near future. This flag is only a hint: it will never change the semantics of your code, but it may affect performance. In particular, if you `get()` the key before the write to disk has completed, the copy from the write buffer will be returned, thus ensuring consistency with the latest call to `put()`.

{{<Aside type="note" header="Automatic write coalescing">}}
If you invoke `put()` (or `delete()`) multiple times without performing any `await`s in the meantime, the operations will automatically be combined and submitted atomically. That is, even in the case of a machine failure, either all of the writes will have been stored to disk or none of them will have.
{{</Aside>}}

{{<Aside type="note" header="Write buffer behavior">}}
The `put()` method returns a `Promise`, but most applications can discard this promise without `await`ing it. The `Promise` usually completes immediately, because `put()` writes to an in-memory write buffer that is flushed to disk asynchronously. However, if an application performs a very large number of `put()`s without waiting for any I/O, the write buffer could theoretically grow large enough to cause the isolate to exceed its 128MB memory limit. To avoid this scenario, such applications should `await` the `Promise`s returned by `put()`. The system will then apply backpressure onto the application, slowing it down so that the write buffer has time to flush. Note that these `await`s will disable automatic write coalescing.
{{</Aside>}}

- {{<code>}}put(entries{{<param-type>}}Object{{</param-type>}}, options{{<param-type>}}Object{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} {{<type>}}Promise{{</type>}}

  - Takes an Object and stores each of its keys and values to storage. Each value can be any type supported by the [structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), which is true of most types. Supports up to 128 key-value pairs at a time. Each key is limited to a maximum size of 2048 bytes and each value is limited to 128 KiB (131072 bytes).

    **Supported options:** Same as `put(key, value, options)`, above.

- {{<code>}}delete(key{{<param-type>}}string{{</param-type>}}){{</code>}} {{<type>}}Promise\<boolean>{{</type>}}

  - Deletes the key and associated value. Returns `true` if the key existed or `false` if it did not.

    **Supported options:** Same as `put()`, above.

- {{<code>}}delete(keys{{<param-type>}}Array\<string>{{</param-type>}}, options{{<param-type>}}Object{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} {{<type>}}Promise\<number>{{</type>}}

  - Deletes the provided keys and their associated values. Supports up to 128 keys at a time. Returns a count of the number of key-value pairs deleted.

    **Supported options:** Same as `put()`, above.

- {{<code>}}list(){{</code>}} {{<type>}}Promise\<Map\<string, any>>{{</type>}}

  - Returns all keys and values associated with the current Durable Object in ascending sorted order based on the keys' UTF-8 encodings. The type of each returned value in the [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) will be whatever was previously written for the corresponding key. Be aware of how much data may be stored in your Durable Object before calling this version of `list` without options because all the data will be loaded into the Durable Object's memory, potentially hitting its [limit](/workers/platform/limits/). If that is a concern, pass options to `list` as documented below.

- {{<code>}}list(options{{<param-type>}}Object{{</param-type>}}){{</code>}} {{<type>}}Promise\<Map\<string, any>>{{</type>}}

  - Returns keys associated with the current Durable Object according to the parameters in the provided options object.

    **Supported options:**

    - {{<code>}}start{{<param-type>}}string{{</param-type>}}{{</code>}}

      - Key at which the list results should start, inclusive.

    - {{<code>}}startAfter{{<param-type>}}string{{</param-type>}}{{</code>}}

      - Key after which the list results should start, exclusive. Cannot be used simultaneously with `start`.

    - {{<code>}}end{{<param-type>}}string{{</param-type>}}{{</code>}}

      - Key at which the list results should end, exclusive.

    - {{<code>}}prefix{{<param-type>}}string{{</param-type>}}{{</code>}}

      - Restricts results to only include key-value pairs whose keys begin with the prefix.

    - {{<code>}}reverse{{<param-type>}}boolean{{</param-type>}}{{</code>}}

      - If true, return results in descending order instead of the default ascending order.
      - Note that enabling this does not change the meaning of `start`, `startKey`, or `endKey`. `start` still defines the smallest key in lexicographic order that can be returned (inclusive), effectively serving as the endpoint for a reverse-order list. `end` still defines the largest key in lexicographic order that the list should consider (exclusive), effectively serving as the starting point for a reverse-order list.

    - {{<code>}}limit{{<param-type>}}number{{</param-type>}}{{</code>}}

      - Maximum number of key-value pairs to return.

    - {{<code>}}allowConcurrency{{<param-type>}}boolean{{</param-type>}}{{</code>}}

      - Same as the option to `get()`, above.

    - {{<code>}}noCache{{<param-type>}}boolean{{</param-type>}}{{</code>}}

      - Same as the option to `get()`, above.

- {{<code>}}transaction(closure{{<param-type>}}Function(txn){{</param-type>}}){{</code>}} {{<type>}}Promise{{</type>}}

  - Runs the sequence of storage operations called on `txn` in a single transaction that either commits successfully or aborts.

      <aside class="DocsMarkdown--aside" role="note" data-type="note">
        {{<markdown>}}Explicit transactions are no longer necessary. Any series of write operations with no intervening `await` will automatically be submitted atomically, and the system will prevent concurrent events from executing while `await`ing a read operation (unless you use `allowConcurrency: true`). Therefore, a series of reads followed by a series of writes (with no other intervening I/O) are automatically atomic and behave like a transaction.{{</markdown>}}
      </aside>

  - {{<code>}}txn{{</code>}}

    - Provides access to the `put()`, `get()`, `delete()` and `list()` methods documented above to run in the current transaction context. In order to get transactional behavior within a transaction closure, you must call the methods on the `txn` object instead of on the top-level `state.storage` object.<br><br>Also supports a `rollback()` function that ensures any changes made during the transaction will be rolled back rather than committed. After `rollback()` is called, any subsequent operations on the `txn` object will fail with an exception. `rollback()` takes no parameters and returns nothing to the caller.

- {{<code>}}deleteAll(){{</code>}} {{<type>}}Promise{{</type>}}

  - Deletes all keys and associated values, effectively deallocating all storage used by the Durable Object. In the event of a failure while the `deleteAll()` operation is still in flight, it may be that only a subset of the data is properly deleted.

    **Supported options:** Same as `put()`, above.

- {{<code>}}getAlarm(){{</code>}} {{<type>}}Promise\<Number | null>{{</type>}}

  - Retrieves the current alarm time (if set) as integer milliseconds since epoch. The alarm is considered to be set if it has not started, or if it has failed and any retry has not begun. If no alarm is set, `getAlarm()` returns null.

    **Supported options:** Like `get()` above, but without `noCache`.

- {{<code>}}setAlarm(scheduledTime{{<param-type>}}Date | number{{</param-type>}}){{</code>}} {{<type>}}Promise{{</type>}}

  - Sets the current alarm time, accepting either a JS Date, or integer milliseconds since epoch.

    If `setAlarm()` is called with a time equal to or before `Date.now()`,  the alarm will be scheduled for asynchronous execution in the immediate future. If the alarm handler is currently executing in this case, it will not be canceled. Alarms can be set to millisecond granularity and will usually execute within a few milliseconds after the set time, but can be delayed by up to a minute due to maintenance or failures while failover takes place.

    **Supported options:** Like `put()` above, but without `noCache`.

- {{<code>}}deleteAlarm(){{</code>}} {{<type>}}Promise{{</type>}}

  - Deletes the alarm if one exists. Does not cancel the alarm handler if it is currently executing.

    **Supported options:** Like `put()` above, but without `noCache`.

{{</definitions>}}

### `alarm()` handler method

The system calls the `alarm()` handler method when a scheduled alarm time is reached. The `alarm()` handler has guaranteed at-least-once execution and will be retried upon failure using exponential backoff, starting at 2 seconds delay for up to 6 retries. Retries will be performed if the method fails with an uncaught exception.

The method takes no parameters, does not return a result, and can be `async`.

### `fetch()` handler method

The system calls the `fetch()` method of a Durable Object namespace when an HTTP request is sent to the Object. These requests are not sent from the public Internet, but from other [Workers using a Durable Object namespace binding](#accessing-a-durable-object-from-a-worker).

The method takes a [`Request`](/workers/runtime-apis/request/) as the parameter and returns a [`Response`](/workers/runtime-apis/response/) (or a `Promise` for a `Response`).

If the method fails with an uncaught exception, the exception will be thrown into the calling Worker that made the `fetch()` request.

---

## Accessing a Durable Object from a Worker

To access a Durable Object from a Worker, you must first configure the Worker with a binding for a Durable Object namespace. The namespace is, in turn, configured to use a particular class and controls access to instances of that class.

Namespace bindings have two jobs: generating Object IDs and connecting to Objects.

### Generating IDs randomly

```js
let id = OBJECT_NAMESPACE.newUniqueId();
```

The `newUniqueId()` method on a Durable Object namespace creates a new Object ID randomly. This method will never return the same ID twice, and thus, it is guaranteed that the Object does not yet exist and has never existed at the time the method returns.

When generating an ID randomly, you need to store the ID somewhere in order to be able to reach the same object again in the future. You could, for example, store the ID in Workers KV, in an external database, or in a cookie in the user's browser.

Unique IDs are unguessable, therefore they can be used in URL-based access control.

To store the ID in external storage, use its `.toString()` method to convert it into a hexadecimal string and `OBJECT_NAMESPACE.idFromString()` to convert the string back into an ID later.

#### Restricting objects to a jurisdiction

Durable Objects can be created so that they only run and store data within a specific jurisdiction to comply with local regulations. You must specify the jurisdiction when generating the Durable Object's ID.

```js
let id = OBJECT_NAMESPACE.newUniqueId({ jurisdiction: 'eu' });
```

The `jurisdiction` option for the `newUniqueId()` method creates a new Object ID that will only run and persist data within the European Union. The jurisdiction feature is useful for building applications that are compliant with regulations such as the [GDPR](https://gdpr-info.eu/). Jurisdiction constraints can only be used with IDs created by `newUniqueId()` and are not currently compatible with IDs created by `idFromName(name)`.

{{<Aside type="note" header="ID logging">}}

Object IDs will be logged outside of the EU even if you specify a jurisdiction.

{{</Aside>}}

Your Workers may still access Objects constrained to a jurisdiction from anywhere in the world. The jurisdiction constraint only controls where the Durable Object itself runs and persists data. Consider using [Regional Services](https://blog.cloudflare.com/introducing-regional-services/) to control the regions from which Cloudflare responds to requests.

The only jurisdiction currently supported is `eu` (the European Union).

{{<Aside type="note" header="Unique IDs perform best">}}

When you construct a new unique ID, the system knows that the same ID will not be generated by another Worker running on the other side of the world at the same time. Therefore, the Object can be instantiated nearby without waiting for any round-the-world synchronization. Whenever you have a convenient place to store the ID, it is recommended to use randomly-generated IDs for best performance.

{{</Aside>}}

### Deriving IDs from names

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

### Parsing previously-created IDs from strings

```js
let id = OBJECT_NAMESPACE.idFromString(hexId);
```

#### Parameters

{{<definitions>}}

- `hexId` {{<type>}}string{{</type>}}
  - An ID string constructed by calling the `.toString()` method of an existing ID.

{{</definitions>}}

This method parses an ID that was previously stringified. This is useful in particular with IDs created using `newUniqueId()`, as these IDs need to be stored somewhere, probably as a string.

A stringified object ID is a 64-digit hexadecimal number. However, not all 64-digit hex numbers are valid IDs. This method will throw if it is passed an ID that was not originally created by `newUniqueId()` or `idFromName()`. It will also throw if the ID was originally created for a different namespace.

### Obtaining an Object stub

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

## Object stubs

A Durable Object stub is a client object used to send requests to a remote Durable Object.

A stub is created using `OBJECT_NAMESPACE.get(id)` (above).

Stubs implement E-order semantics. When you make multiple calls to the same stub, it is guaranteed that the calls will be delivered to the remote Object in the order in which you made them. This ordering guarantee often makes many distributed programming problems easier. However, there is a cost: due to random network disruptions or other transient issues, a stub may become disconnected from its remote Object. Once a stub is disconnected, it is permanently broken, and all in-flight calls and future calls will fail with exceptions. To make new requests to the Durable Object, you must call `OBJECT_NAMESPACE.get(id)` again to get a new stub, keeping in mind that there are no ordering guarantees between requests to the new stub versus the old one. If ordering is not a concern, you can create a new stub for every request.

{{<Aside type="note" header="E-order">}}

E-order is a concept deriving from the [E distributed programming language](<https://en.wikipedia.org/wiki/E_(programming_language)>). E-order is implemented by the [Cap'n Proto](https://capnproto.org) distributed object-capability RPC protocol, which Cloudflare Workers uses for internal communications.

{{</Aside>}}

### Sending HTTP requests

```js
let response = await stub.fetch(request);
let response = await stub.fetch(url, options);
```

The `fetch()` method of a stub has the exact same signature as the [global `fetch`](/workers/runtime-apis/fetch/). However, instead of sending an HTTP request to the Internet, the request is always sent to the Durable Object to which the stub points.

Any uncaught exceptions thrown by the Durable Object's `fetch()` handler will be propagated to the caller's `fetch()` promise. Furthermore, if an uncaught exception is thrown by the Durable Object's `fetch()` handler, then the exception propagated to the caller's `fetch()` promise will include a property `.remote`, which will be set to `True`. If the caller's `fetch()` failed as a result of being unable to reach the Durable Object, the exception thrown to the caller's `fetch()` will not have the `.remote` property, indicating the exception was not generated remotely.

## Listing Durable Objects

The Cloudflare REST API supports retrieving a [list of Durable Objects](https://api.cloudflare.com/#durable-objects-namespace-list-objects) within a namespace and a [list of namespaces](https://api.cloudflare.com/#durable-objects-namespace-list-namespaces) associated with an account.

## Related resources

- [Learn how to use Durable Objects](/workers/learning/using-durable-objects/)
