---
pcx_content_type: configuration
title: Reserved Methods
weight: 2
meta:
  title: Workers RPC — Reserved Methods
  description: Reserved methods with special behavior that are treated differently.
---

# Reserved Methods

Some method names are reserved or have special semantics.

## Special Methods

For backwards compatibility, when extending `WorkerEntrypoint` or `DurableObject`, the following method names have special semantics. Not that this does *not* apply to `RpcTarget`. On `RpcTarget`, these methods work like any other RPC method.

### `fetch()`

The `fetch()` method is treated specially — it can only be used to handle an HTTP request — equivalent to the [fetch handler](/workers/runtime-apis/handlers/fetch/).

You may implement a `fetch()` method in your class that extends `WorkerEntrypoint` — but it must accept only one parameter of type [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request), and must return an instance of [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response), or a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) of one.

On the client side, `fetch()` called on a service binding or Durable Object stub works like the standard global `fetch()`. That is, the caller may pass one or two parameters to `fetch()`. If the caller does not simply pass a single `Request` object, then a new `Request` is implicitly constructed, passing the parameters to its constructor, and that request is what is actually sent to the server.

Some properties of `Request` control the behavior of `fetch()` on the client side and are not actually sent to the server. For example, the property `redirect: "auto"` (which is the default) instructs `fetch()` that if the server returns a redirect response, it should automatically be followed, resulting in an HTTP request to the public internet. Again, this behavior is according to the Fetch API standard. In short, `fetch()` doesn't have RPC semantics, it has Fetch API semantics.

### `connect()`

The `connect()` method of the `WorkerEntrypoint` class is reserved for opening a socket-like connection to your Worker. This is currently not implemented or supported — though you can [open a TCP socket from a Worker](/workers/runtime-apis/tcp-sockets/) or connect directly to databases over a TCP socket with [Hyperdrive](/hyperdrive/get-started/).

## Disallowed Method Names

The following method (or proprety) names may not be used as RPC methods on any RPC type (including `WorkerEntrypoint`, `DurableObject`, and `RpcTarget`):

* `dup`: This is reserved for duplicating a stub. Refer to the [RPC Lifecycle](/workers/runtime-apis/rpc/lifecycle) docs to learn more about `dup()`.
* `constructor`: This name has special meaning for JavaScript classes. It is not intended to be called as a method, so it is not allowed over RPC.

The following methods are disallowed only on `WorkerEntrypoint` and `DurableObject`, but allowed on `RpcTarget`. These methods have historically had special meaning to Durable Objects, where they are used to handle certain system-generated events.

* `alarm`
* `webSocketMessage`
* `webSocketClose`
* `webSocketError`
