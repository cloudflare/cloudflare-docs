---
pcx_content_type: configuration
title: Compatible Types
meta:
  title: Workers RPC — Compatible Types
  description: JavaScript types that are compatible with the Workers RPC system
---

# Compatible Types

## Basic types

Nearly all types that are [Structured Cloneable](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm#supported_types) can be used as a parameter or return value of an RPC method. This includes, but is not limited to:

- Objects, arrays, strings and numbers
- Functions
- ReadableStream, WriteableStream, Request and Response objects.

Instances of classes that you define (those with a custom prototype) are the one exception to this rule — they are only compatible if they extend the `RpcTarget` class. If you attempt to send a class instance over RPC that does not extend `RpcTarget`, this will throw an exception.

The RPC system also supports the following types that are not Structured Cloneable:

- TODO

## Functions

### Return functions from RPC methods

{{<render file="_service-binding-rpc-functions-example.md" productFolder="workers">}}

### Send functions as parameters of RPC methods

You can also send a function in the parameters of an RPC. This enables the "server" to call back to the "client", reversing the direction of the relationship.

Because of this, the words "client" and "server" can be ambiguous when talking about RPC. The "server" is a Durable Object or WorkerEntrypoint, and the "client" is the Worker that invoked the server via a binding. But, RPCs can flow both ways between the two. When talking about an individual RPC, you should instead use the words "caller" and "callee".

### Return objects with methods
<!-- TODO: Should we more loudly point people to use classes here? -->

You can return objects from RPC methods that have methods that can be called by the client Worker. This allows you to provide the caller with a remote object that it can perform work with, and provide interfaces that are simple to work with, like [Durable Objects](/durable-objects), even if your state lives elsewhere, outside of Cloudflare.

Consider the following example:

```js
---
filename: company.js
---
import { WorkerEntrypoint } from "cloudflare:workers";

export class Company extends WorkerEntrypoint {
  async getCompanyByName(id) {
    // TODO: Maybe show example here that doesn't use D1 — to illustrate point about
    // how to use this to provide an SDK-like interface for remote state that is outside of DO/D1/etc..
    const stmt = this.env.DB.prepare("SELECT * FROM Customers WHERE CompanyName = ?!").bind(id);
    const values = await stmt.first();
    return {
      ...values,
      sendEmail: () => {
        //...
      }
  }
}
```

And then calls as an async method:

```js
---
filename: clientWorker.js
---
export default {
  async fetch(request, env) {
    const company = await env.COMPANY.getCompanyByName(name);
    await company.sendEmail();
    return new Response("Email sent!");
  }
}
```

## Class Instances

Objects which are instances of user-defined classes, with custom prototypes, can only be used as a parameter or return value of an RPC method if they extend the built-in `RpcTarget` class. Attempting to send a class instance that does not extend `RpcTarget` will throw an exception.

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
Refer to [Explicit Resource Management](/workers/runtime-apis/rpc/lifecycle) to learn  more about the `using` declaration shown in the example above.
{{</Aside>}}

Classes that extend `RpcTarget` work a lot like functions: the object itself is not serialized, but is instead replaced by a stub. In this case, the stub itself is not callable, but its methods are. Calling any method on the stub actually makes an RPC back to the original object, where it was created.

As shown above, you can also access properties of classes. Properties are sort of like RPC methods that don't take any arguments. You can simply await a property to asynchronously fetch its current value. Note that the act of awaiting the property (which, behind the scenes, calls `.then()` on it) is what initiates the property fetch; if you don't await it, it won't be fetched.

Returning a class instance may be compared against returning an object containing several functions. Both ways can be used to create similar interfaces from the caller's point of view. However, if you return an object containing, say, five functions, then you are creating five stubs. If you return a class instance, where the class declares five methods, you are only returning a single stub. Returning a single stub is often more efficient and easier to reason about. Additionally, when returning an object, non-function properties of the object will be transmitted at the time the object itself is transmitted; they cannot be fetched asynchronously on-demand.

## ReadableStream, WriteableStream, Request, Response

You can send and receive [`ReadableStream`](/workers/runtime-apis/streams/readablestream/), [`WriteableStream`](/workers/runtime-apis/streams/writablestream/), [`Request`](/workers/runtime-apis/request/), and [`Response`](/workers/runtime-apis/response/) using RPC methods. When doing so, bytes in the body are automatically streamed with appropriate flow control.

Only byte-oriented streams are supported. TODO — explain clearly.

In all cases, ownership of the stream is transferred to the recipient. The sender can no longer read/write the stream after sending it. If the sender wishes to keep its own copy, it can use the [`tee()` method of `ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/tee) or the [`clone()` method of `Request` or `Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response/clone). Keep in mind that doing this may force the system to buffer bytes and lose the benefits of flow control.