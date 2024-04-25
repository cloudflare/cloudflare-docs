---
title: Create Durable Object stubs and send requests
pcx_content_type: concept
weight: 2
---

# Create Durable Object stubs and send requests

A Durable Object stub is a client Object used to send requests to a remote Durable Object.

`OBJECT_NAMESPACE.get(id)` creates a Durable Object.

Durable Objects implement E-order semantics. When you make multiple calls to the same Durable Object, it is guaranteed that the calls will be delivered to the remote Durable Object in the order in which you made them. E-order semantics makes many distributed programming problems easier.

However, due to random network disruptions or other transient issues, a Durable Object stub may become disconnected from its remote Durable Object. A disconnected stub is permanently broken. In this scenario, all in-flight calls and future calls will fail with [exceptions](/durable-objects/observability/troubleshooting/).

To make new requests to the Durable Object, you must call `OBJECT_NAMESPACE.get(id)` again to get a new Durable Object stub. There are no ordering guarantees between requests to the new stub compared to the old one. If ordering is not a concern, you can create a new Durable Object for every request.

{{<Aside type="note" header="E-order">}}

E-order is a concept deriving from the [E distributed programming language](<https://en.wikipedia.org/wiki/E_(programming_language)>). E-order is implemented by the [Cap'n Proto](https://capnproto.org) distributed object-capability RPC protocol, which Cloudflare Workers uses for internal communications.

{{</Aside>}}

## Get a Durable Object stub

```js
let durableObjectStub = OBJECT_NAMESPACE.get(id);
```

### Parameters

{{<definitions>}}

- `id` {{<type>}}DurableObjectId{{</type>}}
  - An ID constructed using `newUniqueId()`, `idFromName()`, or `idFromString()` on this Durable Object namespace. For details, refer to [Access a Durable Object](/durable-objects/best-practices/access-durable-objects-from-a-worker/#generate-ids-randomly) .

  - This method constructs an Object, which is a local client that provides access to a remote Object.

  - If the remote Object does not already exist, it will be created. Thus, there will always be an Object accessible from the stub.

  - This method always returns the Object immediately, before it has connected to the remote Object. This allows you to begin making requests to the Object right away, without waiting for a network round trip.

{{</definitions>}}

## Call a Durable Object

You can call a Durable Object by:

- [Sending HTTP requests](/durable-objects/best-practices/create-durable-object-stubs-and-send-requests/#send-http-requests) to a Durable Object's `fetch()` handler.
- Invoking [Remote Procedure Call (RPC)](/workers/runtime-apis/rpc/) methods defined on a Durable Object class (available for Workers with a [compatibility date greater than or equal to `2024-04-03`](/workers/configuration/compatibility-dates/#durable-object-stubs-and-service-bindings-support-rpc)).
- Using the [WebSocket API](/durable-objects/reference/websockets/).

### Call RPC methods

To use RPC, a Durable Objects class must extend the built-in type `DurableObject`. Then, public methods on a Durable Objects class are exposed as [RPC methods](/workers/runtime-apis/rpc/), which you can call from a Durable Object stub in a Worker. All RPC calls are [asynchronous](/workers/runtime-apis/rpc/lifecycle/), accept and return [serializable types](/workers/runtime-apis/rpc/), and [propagate exceptions](/workers/runtime-apis/rpc/error-handling/) to the caller without a stack trace. Refer to [Workers RPC](/workers/runtime-apis/rpc/) for complete details.

```ts
import { DurableObject } from "cloudflare:workers";

export class Counter extends DurableObject {

	async increment(amount = 1) {
    let value: number = (await this.ctx.storage.get("value")) || 0;
    value += amount;
    this.ctx.storage.put("value", value);
    return value;
  }
}
```

```ts
// A Worker calling a Durable Object
let durableObjectStub = env.COUNTERS.get(id);
let response = await durableObjectStub.increment();
```

{{<Aside type="note">}}

When you write a Worker that does not extend the [`DurableObject` class](/workers/configuration/compatibility-dates/#durable-object-stubs-and-service-bindings-support-rpc), the `ctx` object in your Durable Object is instead called `state`, and is provided as the first argument to the constructor, but not set as a property of your class.

With RPC, the `DurableObject` superclass defines `ctx` and `env` as class properties. What was previously called `state` is now called `ctx` when you extend the `DurableObject` class.

This naming change from `state` to `ctx` was made both to ensure consistency between `DurableObject` and `WorkerEntrypoint`, and to avoid setting the false expectation that directly mutating the value of `state` would persist data.

{{</Aside>}}

Refer to [Build a Counter](/durable-objects/examples/build-a-counter/) for a full example.

### Send HTTP requests

```js
let response = await durableObjectStub.fetch(request);
// Alternatively, passing a URL directly:
let response = await durableObjectStub.fetch(url, options);
```

The `url` passed to the `fetch()` handler of your Durable Object must be a well-formed URL, but does not have to be a publicly-resolvable hostname. You can:

* Pass the client `Request` directly into the `fetch()` handler as is.
* Use an internal URL scheme, such as `http://do/some-path`, as the `url` parameter in the `fetch()` handler. This allows you to construct your own path or query parameter based approach to sharing state between your client-facing Worker and your Durable Object.
* Alternatively, you can construct your own [`Request` object](/workers/runtime-apis/request/), which allows you to use a [`Headers`](/workers/runtime-apis/headers/) object to pass in key-value pairs, representing data you wish to pass to your Durable Objects.

The example below shows you how to construct your own `Request` object:

```ts
// Constructing a new Request and passing metadata to the Durable Object via headers
let doReq = new Request("http://do/write", { headers: { "user-id": userId }})
let resp = await durableObjectStub.fetch(doReq)

// Alternatively, using URL query params or paths
let resp = await durableObjectStub.fetch(`http://do/write?userId=${userId}`)
```

{{<Aside type="note">}}

To understand how exceptions are thrown from within a Durable Object, refer to the [Error handling](/durable-objects/best-practices/error-handling/) documentation.

{{</Aside>}}

## List Durable Objects

The Cloudflare REST API supports retrieving a [list of Durable Objects](/api/operations/durable-objects-namespace-list-objects) within a Durable Object namespace and a [list of namespaces](/api/operations/durable-objects-namespace-list-namespaces) associated with an account.

