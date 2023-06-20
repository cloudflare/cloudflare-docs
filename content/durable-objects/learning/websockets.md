---
pcx_content_type: concept
title: WebSockets in Durable Objects
---


# WebSockets in Durable Objects

As part of Durable Objects, Workers can act as WebSocket endpoints – including as a client or as a server. Previously, Workers could proxy WebSocket connections on to a back-end server, but could not speak the protocol directly.

While technically any Worker can speak WebSocket in this way, WebSockets are most useful when combined with Durable Objects. When a client connects to your application using a WebSocket, you need a way for server-generated events to be sent back to the existing socket connection. Without Durable Objects, there is no way to send an event to the specific Worker holding a WebSocket. With Durable Objects, you can forward the WebSocket to an Object. Messages can then be addressed to that Object by its unique ID, and the Object can then forward those messages down the WebSocket to the client.

Durable Objects can use the web standard APIs described in [Using WebSockets](/workers/learning/using-websockets/). When using a Durable Object to terminate a WebSocket (as opposed to using it as a WebSocket client) the [WebSockets Hibernation API](/workers/runtime-apis/durable-objects/#websockets-hibernation-api) has significant advantages and should be preferred over the web standard APIs. For an example of WebSockets in action within Durable Objects, review the [example chat application](https://github.com/cloudflare/workers-chat-demo) or the [example chat application using the Hibernation API](https://github.com/cloudflare/workers-chat-demo/tree/hibernation).