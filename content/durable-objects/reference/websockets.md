---
pcx_content_type: concept
title: Durable Objects with WebSockets
weight: 3
---

# Use Durable Objects with WebSockets

[WebSockets](/durable-objects/api/websockets/) allow real time communication between a client and server. Both Cloudflare Durable Objects and Workers can act as WebSocket endpoints – either as a client or as a server.

If your application needs to coordinate among multiple WebSocket connections, such as a chat room or game match, you will need clients to send messages to a single-point-of-coordination on a server.

Durable Objects provide a single-point-of-coordination for [Cloudflare Workers](/workers/), and are often used in parallel with WebSockets to persist state over multiple clients and connections.

While there are other use cases for using Workers exclusively with WebSockets, WebSockets are most useful when combined with Durable Objects.

When a client connects to your application using a WebSocket, you need a way for server-generated messages to be sent using the existing socket connection. Multiple clients can establish a WebSocket connection with a specific Durable Object addressed by its [unique ID](/durable-objects/configuration/access-durable-object-from-a-worker/#1-create-durable-object-ids). The Durable Object can then send messages to each client over the WebSocket connection.

Durable Objects can use the web standard APIs described in [WebSockets API](/durable-objects/api/websockets/). Refer to [Cloudflare Edge Chat Demo](https://github.com/cloudflare/workers-chat-demo) for an example using Durable Objects with WebSockets.

{{<Aside type="warning" header="WebSockets disconnection">}}

Code updates will disconnect all WebSockets. If you deploy a new version of a Worker, every Durable Object is restarted. Any connections to old Durable Objects will be disconnected.