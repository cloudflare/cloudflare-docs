---
pcx_content_type: configuration
title: Compatible Types
meta:
  title: Workers RPC — Compatible Types
  description: JavaScript types that are compatible with the Workers RPC system
---

# Compatible Types

## Basic types

Nearly all types that are [Structured Cloneable](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm#supported_types) can be used as a parameter or return value of an RPC method. This includes, most basic "value" types in JavaScript, including objects, arrays, strings and numbers.

As an exception to Structured Clone, application-defined classes (or objects with custom prototypes) cannot be passed over RPC, except as described below.

The RPC system also supports a number of types that are not Structured Cloneable, including:

- Functions, which are replaced by stubs that call back to the sender.
- Application-define classes that extend `RpcTarget`, which are similarly replaced by stubs.
- [ReadableStream](/workers/runtime-apis/streams/readablestream/) and [WriteableStream](/workers/runtime-apis/streams/writablestream/), with automatic streaming flow control.
- [Request](/workers/runtime-apis/request/) and [Response](/workers/runtime-apis/response/), for conveniently representing HTTP messages.

## Functions

You can send a function over RPC. When you do so, the function is replaced by a "stub". The recipient can call the stub like a function, but doing so makes a new RPC back to the place where the function originated.

### Return functions from RPC methods

{{<render file="_service-binding-rpc-functions-example.md" productFolder="workers">}}

### Send functions as parameters of RPC methods

You can also send a function in the parameters of an RPC. This enables the "server" to call back to the "client", reversing the direction of the relationship.

Because of this, the words "client" and "server" can be ambiguous when talking about RPC. The "server" is a Durable Object or WorkerEntrypoint, and the "client" is the Worker that invoked the server via a binding. But, RPCs can flow both ways between the two. When talking about an individual RPC, you should instead use the words "caller" and "callee".

## Class Instances

To use an instance of a class that you define as a parameter or return value of an RPC method, you must extend the built-in `RpcTarget` class.

Consider the following example:

```toml
---
filename: wrangler.toml
---
name = "counter"
main = "./src/counter.js"
```

```js
---
filename: counter.js
---
import { WorkerEntrypoint, RpcTarget } from "cloudflare:workers";

class Counter extends RpcTarget {
  #value = 0;

  increment(amount) {
    this.#value += amount;
    return this.#value;
  }

  get value() {
    return this.#value;
  }
}

export class CounterService extends WorkerEntrypoint {
  async newCounter() {
    return new Counter();
  }
}
```

The method `increment` can be called directly by the client, as can the public property `value`:

```toml
---
filename: wrangler.toml
---
name = "client-worker"
main = "./src/clientWorker.js"
services = [
  { binding = "COUNTER_SERVICE", service = "counter", entrypoint = "CounterService" }
]
```

```js
---
filename: clientWorker.js
---
export default {
  async fetch(request, env) {
    using counter = await env.COUNTER_SERVICE.newCounter();

    await counter.increment(2);   // returns 2
    await counter.increment(1);   // returns 3
    await counter.increment(-5);  // returns -2

    const count = await counter.value;  // returns -2

    return new Response(count);
  }
}
```

{{<Aside type="note" description="The `using` declaration">}}
Refer to [Explicit Resource Management](/workers/runtime-apis/rpc/lifecycle) to learn more about the `using` declaration shown in the example above.
{{</Aside>}}

Classes that extend `RpcTarget` work a lot like functions: the object itself is not serialized, but is instead replaced by a stub. In this case, the stub itself is not callable, but its methods are. Calling any method on the stub actually makes an RPC back to the original object, where it was created.

As shown above, you can also access properties of classes. Properties behave like RPC methods that don't take any arguments — you await the property to asynchronously fetch its current value. Note that the act of awaiting the property (which, behind the scenes, calls `.then()` on it) is what causes the property to be fetched. If you do not use `await` when accessing the property, it will not be fetched.

{{<Aside type="note" description="Returning class instances is more efficient than returning objects with many functions">}}
While it's possible to define a similar interface to the caller using an object that contains many functions, this is less efficient. If you return an object that contains five functions, then you are creating five stubs. If you return a class instance, where the class declares five methods, you are only returning a single stub. Returning a single stub is often more efficient and easier to reason about. Moreover, when returning a plain object (not a class), non-function properties of the object will be transmitted at the time the object itself is transmitted; they cannot be fetched asynchronously on-demand.
{{</Aside>}}

{{<Aside type="note" description="Why not use Structured Clone semantics for classes">}}
Classes which do not inherit `RpcTarget` cannot be sent over RPC at all. This differs from Structured Clone, which defines application-defined classes as clonable. Why the difference? By default, the Structured Clone algorithm simply ignores an object's class entirely. So, the recipient receives a plain object, containing the original object's instance properties but entirely missing its original type. This behavior is rarely useful in practice, and could be confusing if the developer had intended the class to be treated as an `RpcTarget`. So, Workers RPC has chosen to disallow classes that are not `RpcTarget`s, to avoid any confusion.
{{</Aside>}}

## ReadableStream, WriteableStream, Request and Response

You can send and receive [`ReadableStream`](/workers/runtime-apis/streams/readablestream/), [`WriteableStream`](/workers/runtime-apis/streams/writablestream/), [`Request`](/workers/runtime-apis/request/), and [`Response`](/workers/runtime-apis/response/) using RPC methods. When doing so, bytes in the body are automatically streamed with appropriate flow control.

Only [byte-oriented streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_byte_streams) are supported. (Streams with an underlying byte source of `type: "bytes"`)

In all cases, ownership of the stream is transferred to the recipient. The sender can no longer read/write the stream after sending it. If the sender wishes to keep its own copy, it can use the [`tee()` method of `ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/tee) or the [`clone()` method of `Request` or `Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response/clone). Keep in mind that doing this may force the system to buffer bytes and lose the benefits of flow control.