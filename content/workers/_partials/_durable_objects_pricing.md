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
| Requests<sup>1</sup> | 1 million, + $0.15/million                        |
| Duration<sup>2</sup> | 400,000 GB-s, + $12.50/million GB-s<sup>3,4</sup> |

{{</table-wrap>}}

<sup>1</sup> Requests include all incoming HTTP requests, WebSocket messages, and alarm invocations. There is no charge for outgoing WebSocket messages, nor for incoming [WebSocket protocol pings](https://www.rfc-editor.org/rfc/rfc6455#section-5.5.2).

<sup>2</sup> Application level auto-response messages handled by [`state.setWebSocketAutoResponse()`](/durable-objects/api/websockets/) will not incur additional wall-clock time, and so they will not be charged.

<sup>3</sup> Duration is billed in wall-clock time as long as the Object is active, but is shared across all requests active on an Object at once. Once your Object finishes responding to all requests, it will stop incurring duration charges. Calling `accept()` on a WebSocket in an Object will incur duration charges for the entire time the WebSocket is connected. If you prefer, use [`state.acceptWebSocket()`](/durable-objects/api/websockets/#state-methods-for-websockets) instead, which will stop incurring duration charges once all event handlers finish running.

<sup>4</sup> Duration billing charges for the 128 MB of memory your Durable Object is allocated, regardless of actual usage. If your account creates many instances of a single Durable Object class, Durable Objects may run in the same isolate on the same physical machine and share the 128 MB of memory. These Durable Objects are still billed as if they are allocated a full 128 MB of memory.