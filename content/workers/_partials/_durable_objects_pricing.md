---
_build:
  publishResources: false
  render: never
  list: never
---

[Durable Objects](/durable-objects/) are only available on the [Workers Paid plan](/workers/platform/pricing/#workers).

{{<table-wrap>}}

|          | Paid plan                                         |
| -------- | ------------------------------------------------- |
| Requests               | 1 million, + $0.15/million<br> Includes HTTP requests, RPC sessions<sup>1</sup>, WebSocket messages<sup>2</sup>, and alarm invocations                      |
| Duration<sup>3</sup>                    | 400,000 GB-s, + $12.50/million GB-s<sup>4,5</sup> |

{{</table-wrap>}}

<sup>1</sup> Each [RPC session](/workers/runtime-apis/rpc/lifecycle/) is billed as one request to your Durable Object. Every [RPC method call](/durable-objects/best-practices/create-durable-object-stubs-and-send-requests/#call-rpc-methods) on a [Durable Objects stub](/durable-objects/best-practices/create-durable-object-stubs-and-send-requests/#get-a-durable-object-stub) is its own RPC session and therefore a single billed request.

RPC method calls can return objects (stubs) extending [`RpcTarget`](/workers/runtime-apis/rpc/lifecycle/#lifetimes-memory-and-resource-management) and invoke calls on those stubs. Subsequent calls on the returned stub are part of the same RPC session and are not billed as separate requests. For example:

```js
let durableObjectStub = OBJECT_NAMESPACE.get(id); // retrieve Durable Object stub
using foo = await durableObjectStub.bar(); // billed as a request
await foo.baz(); // treated as part of the same RPC session created by calling bar(), not billed as a request
await durableObjectStub.cat(); // billed as a request
```

<sup>2</sup> A request is needed to create a WebSocket connection. There is no charge for outgoing WebSocket messages, nor for incoming [WebSocket protocol pings](https://www.rfc-editor.org/rfc/rfc6455#section-5.5.2). For compute requests billing-only, a 20:1 ratio is applied to incoming WebSocket messages to factor in smaller messages for real-time communication. For example, 100 WebSocket incoming messages would be charged as 5 requests for billing purposes. The 20:1 ratio does not affect Durable Object metrics and analytics, which reflect actual usage.

<sup>3</sup> Application level auto-response messages handled by [`state.setWebSocketAutoResponse()`](/durable-objects/api/websockets/) will not incur additional wall-clock time, and so they will not be charged.

<sup>4</sup> Duration is billed in wall-clock time as long as the Object is active, but is shared across all requests active on an Object at once. Once your Object finishes responding to all requests, it will stop incurring duration charges. Calling `accept()` on a WebSocket in an Object will incur duration charges for the entire time the WebSocket is connected. If you prefer, use [`state.acceptWebSocket()`](/durable-objects/api/websockets/#state-methods-for-websockets) instead, which will stop incurring duration charges once all event handlers finish running.

<sup>5</sup> Duration billing charges for the 128 MB of memory your Durable Object is allocated, regardless of actual usage. If your account creates many instances of a single Durable Object class, Durable Objects may run in the same isolate on the same physical machine and share the 128 MB of memory. These Durable Objects are still billed as if they are allocated a full 128 MB of memory.