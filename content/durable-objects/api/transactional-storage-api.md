---
title: Transactional Storage API
pcx_content_type: concept
weight: 16
---

# Transactional Storage API

The Transactional Storage API allows you to achieve consistent key-value storage. 

Durable Objects gain access to a persistent Transactional Storage API via `state`, the first parameter passed to the Durable Object constructor. 

While access to a Durable Object instance is single-threaded, request executions can still interleave with each other when they wait on I/O, such as when waiting on the promises returned by persistent storage methods or `fetch()` requests.

The following code snippet shows you how to store and retrieve data using the Transactional Storage API.

```js
export class Counter {
  constructor(state, env) {
    this.state = state;
  }

  async fetch(request) {
    let url = new URL(request.url);

    // retrieve data
    let value = (await this.state.storage.get("value")) || 0; 

    // increment counter and get a new value
    value += 1; 

    // store data
    await this.state.storage.put("value", value); 

    return new Response(value);
  }
}
```

## Methods

The Transactional Storage API comes with several methods.

Each method is implicitly wrapped inside a transaction, such that its results are atomic and isolated from all other storage operations, even when accessing multiple key-value pairs.

{{<definitions>}}

- {{<code>}}get(key{{<param-type>}}string{{</param-type>}}, options{{<param-type>}}Object{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} : {{<type>}}Promise\<any>{{</type>}}

  - Retrieves the value associated with the given key. The type of the returned value will be whatever was previously written for the key, or undefined if the key does not exist.

  **Supported options:**

- {{<code>}}allowConcurrency{{</code>}}{{<param-type>}}boolean{{</param-type>}}

    - By default, the system will pause delivery of I/O events to the Object while a storage operation is in progress, in order to avoid unexpected race conditions. Pass `allowConcurrency: true` to opt out of this behavior and allow concurrent events to be delivered.

- {{<code>}}noCache{{</code>}}{{<param-type>}}boolean{{</param-type>}}

    - If true, then the key/value will not be inserted into the in-memory cache. If the key is already in the cache, the cached value will be returned, but its last-used time will not be updated. Use this when you expect this key will not be used again in the near future. This flag is only a hint. This flag will never change the semantics of your code, but it may affect performance.

- {{<code>}}get(keys{{<param-type>}}Array\<string>{{</param-type>}}, options{{<param-type>}}Object{{</param-type>}}){{</code>}} : {{<type>}}Promise\<Map\<string, any>\>{{</type>}}

  - Retrieves the values associated with each of the provided keys. The type of each returned value in the [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) will be whatever was previously written for the corresponding key. Results in the `Map` will be sorted in increasing order of their UTF-8 encodings, with any requested keys that do not exist being omitted. Supports up to 128 keys at a time.

  <br/>**Supported options:** Same as `get(key, options)`, above.

- {{<code>}}put(key{{<param-type>}}string{{</param-type>}}, value{{<param-type>}}any{{</param-type>}}, options{{<param-type>}}Object{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} : {{<type>}}Promise{{</type>}}

  - Stores the value and associates it with the given key. The value can be any type supported by the [structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), which is true of most types. Keys are limited to a max size of 2,048 bytes and values are limited to 128 KiB (131,072 bytes).<br><br>

  **Supported options:**

- {{<code>}}allowUnconfirmed{{</code>}}{{<param-type>}}boolean{{</param-type>}}

    - By default, the system will pause outgoing network messages from the Durable Object until all previous writes have been confirmed flushed to disk. If the write fails, the system will reset the Object, discard all outgoing messages, and respond to any clients with errors instead. 
    
    - This way, Durable Objects can continue executing in parallel with a write operation, without having to worry about prematurely confirming writes, because it is impossible for any external party to observe the Object's actions unless the write actually succeeds. 
    
    - After any write, subsequent network messages may be slightly delayed. Some applications may consider it acceptable to communicate on the basis of unconfirmed writes. Some programs may prefer to allow network traffic immediately. In this case, set `allowUnconfirmed()` to `true` to opt out of the default behavior. 

- {{<code>}}noCache{{</code>}}{{<param-type>}}boolean{{</param-type>}}

    - If true, then the key/value will be discarded from memory as soon as it has completed writing to disk. 
    
    - Use `noCache()` if the key will not be used again in the near future. `noCache()` will never change the semantics of your code, but it may affect performance. 
    
    - If you use `get()` to retrieve the key before the write has completed, the copy from the write buffer will be returned, thus ensuring consistency with the latest call to `put()`.

{{<Aside type="note" header="Automatic write coalescing">}}
If you invoke `put()` (or `delete()`) multiple times without performing any `await` in the meantime, the operations will automatically be combined and submitted atomically. In case of a machine failure, either all of the writes will have been stored to disk or none of the writes will have been stored to disk.
{{</Aside>}}

{{<Aside type="note" header="Write buffer behavior">}}
The `put()` method returns a `Promise`, but most applications can discard this promise without using `await`. The `Promise` usually completes immediately, because `put()` writes to an in-memory write buffer that is flushed to disk asynchronously. However, if an application performs a large number of `put()` without waiting for any I/O, the write buffer could theoretically grow large enough to cause the isolate to exceed its 128 MB memory limit. To avoid this scenario, such applications should use `await` on the `Promise` returned by `put()`. The system will then apply backpressure onto the application, slowing it down so that the write buffer has time to flush. Using `await` will disable automatic write coalescing.
{{</Aside>}}

- {{<code>}}put(entries{{<param-type>}}Object{{</param-type>}}, options{{<param-type>}}Object{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} : {{<type>}}Promise{{</type>}}

  - Takes an Object and stores each of its keys and values to storage. 
  - Each value can be any type supported by the [structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), which is true of most types. 
  - Supports up to 128 key-value pairs at a time. Each key is limited to a maximum size of 2,048 bytes and each value is limited to 128 KiB (131,072 bytes).

  <br/>**Supported options:** Same as `put(key, value, options)`, above.

- {{<code>}}delete(key{{<param-type>}}string{{</param-type>}}){{</code>}} : {{<type>}}Promise\<boolean>{{</type>}}

  - Deletes the key and associated value. Returns `true` if the key existed or `false` if it did not.

  <br/>**Supported options:** Same as `put()`, above.

- {{<code>}}delete(keys{{<param-type>}}Array\<string>{{</param-type>}}, options{{<param-type>}}Object{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} : {{<type>}}Promise\<number>{{</type>}}

  - Deletes the provided keys and their associated values. Supports up to 128 keys at a time. Returns a count of the number of key-value pairs deleted.

<br/>**Supported options:** Same as `put()`, above.

- {{<code>}}list(){{</code>}} : {{<type>}}Promise\<Map\<string, any>\>{{</type>}}

  - Returns all keys and values associated with the current Durable Object in ascending sorted order based on the keys' UTF-8 encodings. 
  
  - The type of each returned value in the [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) will be whatever was previously written for the corresponding key. 
  
  - Be aware of how much data may be stored in your Durable Object before calling this version of `list` without options because all the data will be loaded into the Durable Object's memory, potentially hitting its [limit](/durable-objects/platform/limits/). If that is a concern, pass options to `list` as documented below.

- {{<code>}}list(options{{<param-type>}}Object{{</param-type>}}){{</code>}} : {{<type>}}Promise\<Map\<string, any>\>{{</type>}}

  - Returns keys and values associated with the current Durable Object according to the parameters in the provided options Object.

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
  - Enabling `reverse` does not change the meaning of `start`, `startKey`, or `endKey`. `start` still defines the smallest key in lexicographic order that can be returned (inclusive), effectively serving as the endpoint for a reverse-order list. `end` still defines the largest key in lexicographic order that the list should consider (exclusive), effectively serving as the starting point for a reverse-order list.

- {{<code>}}limit{{</code>}}{{<param-type>}}number{{</param-type>}}

  - Maximum number of key-value pairs to return.

- {{<code>}}allowConcurrency{{</code>}}{{<param-type>}}boolean{{</param-type>}}

  - Same as the option to `get()`, above.

- {{<code>}}noCache{{</code>}}{{<param-type>}}boolean{{</param-type>}}

  - Same as the option to `get()`, above.

- {{<code>}}transaction(closure{{<param-type>}}Function(txn){{</param-type>}}){{</code>}} : {{<type>}}Promise{{</type>}}

  - Runs the sequence of storage operations called on `txn` in a single transaction that either commits successfully or aborts.

  - Explicit transactions are no longer necessary. Any series of write operations with no intervening `await` will automatically be submitted atomically, and the system will prevent concurrent events from executing while `await` a read operation (unless you use `allowConcurrency: true`). Therefore, a series of reads followed by a series of writes (with no other intervening I/O) are automatically atomic and behave like a transaction.

- {{<code>}}txn{{</code>}}

  - Provides access to the `put()`, `get()`, `delete()` and `list()` methods documented above to run in the current transaction context. In order to get transactional behavior within a transaction closure, you must call the methods on the `txn` Object instead of on the top-level `state.storage` Object.<br><br>Also supports a `rollback()` function that ensures any changes made during the transaction will be rolled back rather than committed. After `rollback()` is called, any subsequent operations on the `txn` Object will fail with an exception. `rollback()` takes no parameters and returns nothing to the caller.

- {{<code>}}deleteAll(){{</code>}} : {{<type>}}Promise{{</type>}}

  - Deletes all keys and associated values, effectively deallocating all storage used by the Durable Object. In the event of a failure while the `deleteAll()` operation is still in flight, it may be that only a subset of the data is properly deleted.

<br/>**Supported options:** Same as `put()`, above.

- {{<code>}}getAlarm(){{</code>}} : {{<type>}}Promise\<Number | null>{{</type>}}

  - Retrieves the current alarm time (if set) as integer milliseconds since epoch. The alarm is considered to be set if it has not started, or if it has failed and any retry has not begun. If no alarm is set, `getAlarm()` returns `null`.

<br/>**Supported options:** Like `get()` above, but without `noCache()`.

- {{<code>}}setAlarm(scheduledTime{{<param-type>}}Date | number{{</param-type>}}){{</code>}} : {{<type>}}Promise{{</type>}}

  - Sets the current alarm time, accepting either a JavaScript `Date`, or integer milliseconds since epoch.

    <br/> If `setAlarm()` is called with a time equal to or before `Date.now()`, the alarm will be scheduled for asynchronous execution in the immediate future. If the alarm handler is currently executing in this case, it will not be canceled. Alarms can be set to millisecond granularity and will usually execute within a few milliseconds after the set time, but can be delayed by up to a minute due to maintenance or failures while failover takes place.

**Supported options:** Like `put()` above, but without `noCache()`.

- {{<code>}}deleteAlarm(){{</code>}} : {{<type>}}Promise{{</type>}}

  - Deletes the alarm if one exists. Does not cancel the alarm handler if it is currently executing.

<br/>**Supported options:** Like `put()` above, but without `noCache()`.

- {{<code>}}sync(){{</code>}} : {{<type>}}Promise{{</type>}}

  - Synchronizes any pending writes to disk.

  - This is similar to normal behavior from automatic write coalescing. If there are any pending writes in the write buffer (including those submitted with `allowUnconfirmed()`), the returned promise will resolve when they complete. If there are no pending writes, the returned promise will be already resolved.

**Supported options:** None.

{{</definitions>}}

### Related resources

- [Durable Objects: Easy, Fast, Correct – Choose Three](https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/).
- [Hibernatable WebSockets API](/durable-objects/api/hibernatable-websockets-api/).