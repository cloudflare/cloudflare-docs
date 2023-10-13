---
pcx_content_type: concept
title: Durable Objects with WebSockets
---

# Use Durable Objects with WebSockets

[WebSockets](/durable-objects/api/websockets/) allow real time communication between a client and server. Both Cloudflare Durable Objects and Workers can act as WebSocket endpoints – either as a client or as a server.

If your application needs to coordinate among multiple WebSocket connections, such as a chat room or game match, you will need clients to send messages to a single-point-of-coordination on a server. 

Durable Objects provide a single-point-of-coordination for [Cloudflare Workers](/workers/), and are often used in parallel with WebSockets to persist state over multiple clients and connections.

While there are other use cases for using Workers exclusively with WebSockets, WebSockets are most useful when combined with Durable Objects. 

When a client connects to your application using a WebSocket, you need a way for server-generated messages to be sent using the existing socket connection. Multiple clients can establish a WebSocket connection with a specific Durable Object addressed by its [unique ID](/durable-objects/how-to/access-durable-object-from-a-worker/#1-create-durable-object-ids). The Durable Object can then send messages to each client over the WebSocket connection.

Durable Objects can use the web standard APIs described in the [WebSockets](/durable-objects/api/websockets/) API reference. Refer to [Cloudflare Edge Chat Demo](https://github.com/cloudflare/workers-chat-demo) for an example using Durable Objects with WebSockets.

{{<Aside type="warning" header="WebSockets disconnection">}}

Code updates will disconnect all WebSockets. If you deploy a new version of a Worker, every Durable Object is restarted. Any connections to old Durable Objects will be disconnected.

{{</Aside>}}

## WebSocket Hibernation

When using a Durable Object on the server side of a WebSocket connection, consider using the [Hibernatable WebSockets API](/durable-objects/api/websockets/).

The Hibernatable WebSockets API allows a Durable Object that is not currently running an event handler (such as handling a WebSocket message, HTTP request, or [alarms](/durable-objects/api/alarms/)) to be removed from memory while keeping its WebSockets connected ("hibernation").

A Durable Object that hibernates will not incur billable [Duration (GB-sec) charges](/durable-objects/platform/pricing/). For applications with many long-lived Durable Objects and periodic WebSocket messages or events, using the Hibernatable WebSockets API can measurably reduce billable duration.

The Hibernatable WebSockets API includes:

* Cloudflare-specific extensions to the web standard WebSocket API.
* Related methods on the `state` of the Durable Object.
* Handler methods that a Durable Object can implement for processing WebSocket events.

The Hibernatable WebSocket API enables you to terminate (not proxy) WebSocket connections within a Durable Object, and push messages to all connected clients based on state stored within the [Transactional Storage API](/durable-objects/api/transactional-storage-api/), HTTP fetches to external services, and/or data stored in [R2](/r2/) and [Workers KV](/kv/api/).

For WebSocket proxy use-cases, refer to the [standard WebSocket API documentation](/workers/examples/websockets/#write-a-websocket-client).

If an event occurs for a hibernated Durable Object's corresponding handler method, it will return to memory. This will call the Durable Object's constructor, so it is best to minimize work in the constructor when using WebSocket hibernation.

{{<Aside type="warning" header="Support for local development">}}

WebSockets do not hibernate when using local development environments such as `wrangler dev` or Miniflare. Hibernatable WebSocket events such as `webSocketMessage()` will be delivered, but your Durable Object will never be evicted from memory. Hibernation will be fully supported in local development for General Availability (GA). Use `wrangler dev --remote` or deploy a test/staging Durable Object namespace to production when debugging state management issues.

{{</Aside>}}
