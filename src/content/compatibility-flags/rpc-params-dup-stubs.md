---
_build:
  publishResources: false
  render: never
  list: never

name: "Duplicate stubs in RPC params instead of transferring ownership"
sort_date: "2026-01-20"
enable_date: "2026-01-20"
enable_flag: "rpc_params_dup_stubs"
disable_flag: "rpc_params_transfer_stubs"
---

Changes the ownership semantics of RPC stubs embedded in the parameters of an RPC call, fixing compatibility issues with [Cap'n Web](https://github.com/cloudflare/capnweb).

When the [Workers RPC system](/workers/runtime-apis/rpc/) was first introduced, RPC stubs that were embedded in the params or return value of some other call had their ownership transferred. That is, the original stub was implicitly disposed, with a duplicate stub being delivered to the destination.

This turns out to compose poorly with another rule: in the callee, any stubs received in the params of a call are automatically disposed when the call returns. These two rules combine to mean that if you proxy a call -- i.e. the implementation of an RPC just makes another RPC call passing along the same params -- then any stubs in the params get disposed twice. Worse, if the eventual recipient of the stub wants to keep a duplicate past the end of the call, this may not work because the copy of the stub in the proxy layer gets disposed anyway, breaking the connection.

For this reason, the pure-JS implementation of Cap'n Web switched to saying that stubs in params do NOT transfer ownership -- they are simply duplicated. This compat flag fixes the Workers Runtime built-in RPC to match Cap'n Web behavior.

One common use case that this fixes is clients that subscribe to callbacks from a Durable Object via Cap'n Web. In this use case, the client app passes a callback function over a Cap'n Web WebSocket to a stateless Worker, which in turn forwards the stub over Workers RPC to a Durable Object. The Durable Object stores a [`dup()`](/workers/runtime-apis/rpc/lifecycle/#the-dup-method) of the stub in order to call it back later to notify the client of events. Unfortunately, before this flag, this didn't work: as soon as the subscribe function itself returned, the Cap'n Web stub in the stateless worker would be disposed (because it was a parameter to a call that returned, and it was not `dup()`ed within the context of the stateless worker). Hence, when the Durable Object later tried to call the subscription callback, it would receive "Error: RPC stub used after being disposed", despite the fact that it had carefully `dup()`ed the stub at its end.
