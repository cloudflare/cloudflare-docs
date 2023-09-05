---
title: Create Durable Object stubs
pcx_content_type: concept
weight: 16
---

# Create Durable Object stubs

A Durable Object stub is a client Object used to send requests to a remote Durable Object.

`OBJECT_NAMESPACE.get(id)` creates a Durable Object.

Durable Objects implement E-order semantics. When you make multiple calls to the same Durable Object, it is guaranteed that the calls will be delivered to the remote Durable Object in the order in which you made them. E-order semantics makes many distributed programming problems easier. 

However, due to random network disruptions or other transient issues, a Durable Object stub may become disconnected from its remote Durable Object. A disconnected stub is permanently broken. In this scenario, all in-flight calls and future calls will fail with [exceptions](/durable-objects/platform/troubleshooting/). 

To make new requests to the Durable Object, you must call `OBJECT_NAMESPACE.get(id)` again to get a new Durable Object stub. There are no ordering guarantees between requests to the new stub compared to the old one. If ordering is not a concern, you can create a new Durable Object for every request.

{{<Aside type="note" header="E-order">}}

E-order is a concept deriving from the [E distributed programming language](<https://en.wikipedia.org/wiki/E_(programming_language)>). E-order is implemented by the [Cap'n Proto](https://capnproto.org) distributed object-capability RPC protocol, which Cloudflare Workers uses for internal communications.

{{</Aside>}}

## 1. Obtain a Durable Object stub

```js
let durableObjectStub = OBJECT_NAMESPACE.get(id);
```

### Parameters

{{<definitions>}}

- `id` {{<type>}}DurableObjectId{{</type>}}
  - An ID constructed using `newUniqueId()`, `idFromName()`, or `idFromString()` on this Durable Object namespace.

  - This method constructs an Object, which is a local client that provides access to a remote Object.

  - If the remote Object does not already exist, it will be created. Thus, there will always be an Object accessible from the stub.

  - This method always returns the Object immediately, before it has connected to the remote Object. This allows you to begin making requests to the Object right away, without waiting for a network round trip.

{{</definitions>}}

## 2. Send HTTP requests

```js
let response = await durableObjectStub.fetch(request);
let response = await durableObjectStub.fetch(url, options);
```

The `fetch()` method of a stub has the exact same signature as the global [`fetch()`](/workers/runtime-apis/fetch/). However, instead of sending an HTTP request to the Internet, the request is always sent to the Durable Object to which the Object points.

Any uncaught exceptions thrown by the Durable Object's `fetch()` handler will be propagated to the caller's `fetch()` promise. 

If an uncaught exception is thrown by the Durable Object's `fetch()` handler, then the exception propagated to the caller's `fetch()` promise will include a `.remote` property, which will be set to `True`. 

If the caller's `fetch()` failed as a result of being unable to reach the Durable Object, the exception thrown to the caller's `fetch()` will not have the `.remote` property, indicating the exception was not generated remotely.

## 3. List Durable Objects

The Cloudflare REST API supports retrieving a [list of Durable Objects](/api/operations/durable-objects-namespace-list-objects) within a Durable Object namespace and a [list of namespaces](/api/operations/durable-objects-namespace-list-namespaces) associated with an account.


