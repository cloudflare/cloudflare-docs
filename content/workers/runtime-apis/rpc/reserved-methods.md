---
pcx_content_type: configuration
title: Reserved Methods
meta:
  title: Workers RPC — Reserved Methods
  description: Reserved methods with special behavior that are treated differently
---

# Reserved Methods

## `fetch()`

The `fetch()` method of the `WorkerEntrypoint` class is treated specially — it can only be used to handle an HTTP request — equivalent to the [fetch handler](/workers/runtime-apis/handlers/fetch/).

You may implement a `fetch()` method in your class that extends `WorkerEntrypoint` — but it must accept only one parameter of type [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request), and must return an instance of [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response).

The caller may pass one or two parameters to `fetch()`. If the caller does not simply pass a single Request object, then a new Request is implicitly constructed, passing the parameters to its constructor, and that request is what is actually sent to the server.

Some properties of Request control the behavior of fetch() on the client side and are not actually sent to the server. For example, the property `redirect: "auto"` (which is the default) instructs `fetch()` that if the server returns a redirect response, it should automatically be followed, resulting in an HTTP request to the public internet. The point is, fetch() makes an HTTP request according to the Fetch API standard.

## `connect()`

The `connect()` method of the `WorkerEntrypoint` class is reserved for opening a socket-like connection to your Worker. This is currently not implemented or supported — though you can [open a TCP socket from a Worker](/workers/runtime-apis/tcp-sockets/) or connect directly to databases over a TCP socket with [Hyperdrive](/hyperdrive/get-started/).

### `dup()`

Sometimes, you need to pass a stub to a function which will dispose the stub when it is done, but you also want to keep the stub for later use. To solve this problem, you can "dup" the stub:

```js
let stub = await env.SOME_SERVICE.getThing();

// Create a duplicate.
let stub2 = stub.dup();

// Call some function that will dispose the stub.
await func(stub);

// stub2 is still valid
```

You can think of `dup()` like the [Unix system call of the same name](https://man7.org/linux/man-pages/man2/dup.2.html): it creates a new handle pointing at the same target, which must be independently closed (disposed).

If the instance of the [`RpcTarget` class](/workers/runtime-apis/rpc/compatible-types) that the stubs point to has a disposer, the disposer will only be invoked when all duplicates have been disposed. However, this only applies to duplicates that originate from the same stub. If the same instance of `RpcTarget` is passed over RPC multiple times, a new stub is created each time, and these are not considered duplicates of each other. Thus, the disposer will be invoked once for each time the `RpcTarget` was sent.

In order to avoid this situation, you can manually create a stub locally, and then pass the stub across RPC multiple times. When passing a stub over RPC, ownership of the stub transfers to the recipient, so you must make a `dup()` for each time you send it:\

```js
import {RpcTarget,RpcStub} from "cloudflare:workers";

class Foo extends RpcTarget {
  // ...
}

let obj = new Foo();
let stub = new RpcStub(obj);
await rpc1(stub.dup());  // sends a dup of `stub`
await rpc2(stub.dup());  // sends another dup of `stub`
stub[Symbol.dispose]();  // disposes the original stub

// obj's disposer will be called when the other two stubs
// are disposed remotely.
```