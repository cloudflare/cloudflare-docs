---
pcx_content_type: configuration
title: Reserved Methods
meta:
  title: Workers RPC — Reserved Methods
  description: Reserved methods with special behavior that are treated differently
---

# Reserved Methods

When extending `RpcTarget`, `WorkerEntrypoint`, and `DurableObject`, the following methods are reserved and cannot be redefined as RPC methods.

## `fetch()`

The `fetch()` method is treated specially — it can only be used to handle an HTTP request — equivalent to the [fetch handler](/workers/runtime-apis/handlers/fetch/).

You may implement a `fetch()` method in your class that extends `WorkerEntrypoint` — but it must accept only one parameter of type [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request), and must return an instance of [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response).

The caller may pass one or two parameters to `fetch()`. If the caller does not simply pass a single Request object, then a new Request is implicitly constructed, passing the parameters to its constructor, and that request is what is actually sent to the server.

Some properties of Request control the behavior of fetch() on the client side and are not actually sent to the server. For example, the property `redirect: "auto"` (which is the default) instructs `fetch()` that if the server returns a redirect response, it should automatically be followed, resulting in an HTTP request to the public internet. The point is, fetch() makes an HTTP request according to the Fetch API standard.

## `connect()`

The `connect()` method of the `WorkerEntrypoint` class is reserved for opening a socket-like connection to your Worker. This is currently not implemented or supported — though you can [open a TCP socket from a Worker](/workers/runtime-apis/tcp-sockets/) or connect directly to databases over a TCP socket with [Hyperdrive](/hyperdrive/get-started/).

### `dup()`

The `dup()` method on the `WorkerEntrypoint` class is reserved as a special built-in method used to explicitly manage the lifecycle of stubs. Refer to the [RPC Lifecycle](/workers/runtime-apis/rpc/lifecycle) docs to learn more about `dup()`.