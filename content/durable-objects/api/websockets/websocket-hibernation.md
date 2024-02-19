---
title: WebSocket Hibernation
pcx_content_type: configuration
weight: 3
---

# WebSocket Hibernation

The WebSockets API allows a Durable Object that is not currently running an event handler (such as handling a WebSocket message, HTTP request, or [alarms](/durable-objects/api/alarms/)) to be removed from memory while keeping its WebSockets connected ("hibernation").

A Durable Object that hibernates will not incur billable [Duration (GB-sec) charges](/durable-objects/platform/pricing/). For applications with many long-lived Durable Objects and periodic WebSocket messages or events, using WebSocket Hibernation can measurably reduce billable duration.

The WebSockets API includes:

* Cloudflare-specific extensions to the web standard WebSocket API.
* Related methods on the [`state`](/durable-objects/api/websockets/#state-methods) of the Durable Object.
* [Handler methods](/durable-objects/api/websockets/#handler-methods) that a Durable Object can implement for processing WebSocket events.

The WebSocket API enables you to terminate (not proxy) WebSocket connections within a Durable Object, and push messages to all connected clients based on state stored within the [Transactional Storage API](/durable-objects/api/transactional-storage-api/), HTTP fetches to external services, and/or data stored in [R2](/r2/) and [Workers KV](/kv/api/).

For WebSocket proxy use-cases, refer to the [standard WebSocket API documentation](/workers/examples/websockets/#write-a-websocket-client).

If an event occurs for a hibernated Durable Object's corresponding handler method, it will return to memory. This will call the Durable Object's constructor, so it is best to minimize work in the constructor when using WebSocket hibernation.

{{<Aside type="warning" header="Support for local development">}}

Prior to `wrangler@3.13.2`, and Miniflare `v3.20231016.0` WebSockets did not hibernate when using local development environments such as `wrangler dev` or Miniflare.

If you are using older versions, note that while hibernatable WebSocket events such as [`webSocketMessage()`](/durable-objects/api/websockets/#websocketmessage) will still be delivered, the Durable Object will never be evicted from memory.

{{</Aside>}}