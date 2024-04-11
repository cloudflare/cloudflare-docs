---
title: In-memory state in a Durable Object
pcx_content_type: concept
weight: 1
---

# In-memory state in a Durable Object

In-memory state means that each Durable Object has one active instance at any particular time. All requests sent to that Durable Object are handled by that same instance. You can store some state in memory.

Variables in a Durable Object will maintain state as long as your Durable Object is not evicted from memory.

A common pattern is to initialize a Durable Object from [persistent storage](/durable-objects/api/transactional-storage-api/) and set instance variables the first time it is accessed. Since future accesses are routed to the same Durable Object, it is then possible to return any initialized values without making further calls to persistent storage.

```js
export class Counter {
  constructor(state, env) {
    this.state = state;
    // `blockConcurrencyWhile()` ensures no requests are delivered until
    // initialization completes.
    this.state.blockConcurrencyWhile(async () => {
      let stored = await this.state.storage.get("value");
      // After initialization, future reads do not need to access storage.
      this.value = stored || 0;
    });
  }

  // Handle HTTP requests from clients.
  async fetch(request) {
    // use this.value rather than storage
  }
}
```

A given instance of a Durable Object may share global memory with other instances defined in the same Worker code.

In the example above, using a global variable `value` instead of the instance variable `this.value` would be incorrect. Two different instances of `Counter` will each have their own separate memory for `this.value`, but might share memory for the global variable `value`, leading to unexpected results. Because of this, it is best to avoid global variables.

{{<Aside type="note" header="Built-in caching">}}

The Durable Object's storage has a built-in in-memory cache of its own. If you use `get()` to retrieve a value that was read or written recently, the result will be instantly returned from cache. Instead of writing initialization code like above, you could use `get("value")` whenever you need it, and rely on the built-in cache to make this fast. Refer to the [Build a counter example](/durable-objects/examples/build-a-counter/) to learn more about this approach.

However, in applications with more complex state, explicitly storing state in your Object may be easier than making transactional storage API calls on every access. Depending on the configuration of your project, write your code in the way that is easiest for you.

{{</Aside>}}

## `state.blockConcurrencyWhile()` method

The `state.blockConcurrencyWhile()` method guarantees ordering, blocking concurrency within an object while the critical section is running.

`state.blockConcurrencyWhile(callback)` has a return type of `Promise<T>`, where `T` is the return type of `callback`. The method executes a callback (which may be `async`) while blocking any other events from being delivered to the object until the callback completes.

This allows you to execute code that performs I/O (such as a `fetch()`) with the guarantee that the object's state will not unexpectedly change as a result of concurrent events. All events that were not explicitly initiated as part of the callback itself will be blocked.

Events that will be blocked include new incoming requests and responses to outgoing requests (such as `fetch()`) that were initiated outside of the callback. Once the callback completes, these events will be delivered.

`state.blockConcurrencyWhile()` is useful within the constructor of your object to perform initialization that must occur before any requests are delivered. This method may also be useful outside of the constructor. For example, if you want to run a sequence of storage operations and want to avoid concurrent actions changing the status of the storage, run your sequence of operations inside the `state.blockConcurrencyWhile()` callback.

If the callback throws an exception, the object will be terminated and reset. This ensures that the object cannot be left stuck in an uninitialized state if something fails unexpectedly. To avoid this behavior, enclose the body of your callback in a `try...catch` block to ensure it cannot throw an exception.

`state.blockConcurrencyWhile()` takes effect right away, pausing everything else, other than the currently executing event and any I/O started from within the `state.blockConcurrencyWhile()` callback. The value returned by the callback becomes the value returned by `state.blockConcurrencyWhile()` itself.

To simulate eviction, use `state.blockConcurrencyWhile()`. Inside the callback, throw an exception. Throwing an exception causes the system to recreate the in-memory object, without affecting the durable storage. Uncaught exceptions inside the `state.blockConcurrencyWhile()` will break the actor.

To help prevent deadlocks in your critical section, there is a 30s timeout on the callback passed into `state.blockConcurrencyWhile`. When this timeout is exceeded, your Durable Object will be reset. It is generally good practice to have your critical section in `blockConcurrencyWhile()` be as brief as possible.