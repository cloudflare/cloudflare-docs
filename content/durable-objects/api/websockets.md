---
title: WebSockets
pcx_content_type: concept
weight: 3
---

# WebSockets

## Background 

WebSockets are long-lived TCP connections that enable bi-directional, real-time communication between client and server.

Durable Objects support the Workers Runtime [WebSocket API](/workers/runtime-apis/websockets/). Your Durable Object can act as a single point-of-coordination for WebSocket sessions, giving you full control over messages sent to and from clients, allowing you to build applications like chat rooms and multiplayer games.

For more information beyond the API reference, refer to the [Build a WebSocket server](/durable-objects/examples/websocket-server/) example.

## WebSocket Hibernation API

In addition to [Workers WebSocket API](/workers/runtime-apis/websockets/), Durable Objects WebSocket Hibernation API includes the below extensions to standard WebSocket API, state methods, and handler methods. 

The WebSocket Hibernation API allows a Durable Object that is not currently running an event handler (such as [handling a WebSocket message](/durable-objects/api/websockets/#websocketmessage), HTTP request, or [alarms](/durable-objects/api/alarms/)) to be removed from memory while keeping its WebSockets connected ("hibernation"). This reduces duration charges that would otherwise be incurred during periods of inactivity.

To learn more about WebSocket Hibernation, refer to [Build a WebSocket server with WebSocket Hibernation](/durable-objects/examples/websocket-hibernation-server/) example.

## Extensions to WebSocket API

### serializeAttachment

{{<definitions>}}

- {{<code>}}serializeAttachment(value{{<param-type>}}any{{</param-type>}}){{</code>}} : {{<type>}}void{{</type>}}

  - Keeps a copy of `value` in memory (not on disk) to survive hibernation. The value can be any type supported by the [structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), which is true of most types.

  - If you modify `value` after calling this method, those changes will not be retained unless you call this method again. The serialized size of `value` is limited to 2,048 bytes, otherwise this method will throw an error. If you need larger values to survive hibernation, use the [Transactional Storage API](/durable-objects/api/transactional-storage-api/) and pass the corresponding key to this method so it can be retrieved later.

{{</definitions>}}

### deserializeAttachment

{{<definitions>}}

- {{<code>}}deserializeAttachment(){{</code>}} : {{<type>}}any{{</type>}}

  - Retrieves the most recent value passed to `serializeAttachment()`, or `null` if none exists.

{{</definitions>}}

## State Methods

### acceptWebSocket

{{<definitions>}}

- {{<code>}}acceptWebSocket(ws{{<param-type>}}WebSocket{{</param-type>}}, tags{{<param-type>}}Array\<string>{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} : {{<type>}}void{{</type>}}

  - Adds a WebSocket to the set attached to this Durable Object. `ws.accept()` must not have been called separately. Once called, any incoming messages will be delivered by calling the Durable Object's `webSocketMessage()` handler, and `webSocketClose()` will be invoked upon disconnect.

  - After calling `state.acceptWebSocket(ws)`, the WebSocket is accepted. Therefore, you can use its `send()` and `close()` methods to send messages. Its `addEventListener()` method will not ever receive any events as they will be delivered to the Durable Object.

  - `tags` are optional string tags used to look up the WebSocket with `state.getWebSockets()`. Each tag is limited to 256 characters, and each WebSocket is limited to 10 tags associated with it.

  - The WebSocket Hibernation API permits a maximum of 32,768 WebSocket connections per Durable Object instance, but the CPU and memory usage of a given workload may further limit the practical number of simultaneous connections.

{{</definitions>}}

### getWebSockets

{{<definitions>}}

- {{<code>}}getWebSockets(tag{{<param-type>}}string{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} : {{<type>}}Array\<WebSocket>{{</type>}}

  - Gets an array of accepted WebSockets matching the given tag. Disconnected WebSockets <sup>1</sup> are automatically removed from the list. Calling `state.getWebSockets()` with no `tag` argument will return all WebSockets.

  - <sup>1</sup> `state.getWebSockets()` may still return websockets even after `ws.close()` has been called. For example, if your server-side WebSocket (the Durable Object) sends a close, but does not receive one back (and has not detected a disconnect from the client), then the connection is in the `CLOSING` "readyState". The client might send more messages, so the WebSocket is technically not disconnected.

{{</definitions>}}

### getTags

{{<definitions>}}

- {{<code>}}getTags(ws{{<param-type>}}WebSocket{{</param-type>}}){{</code>}} : {{<type>}}Array\<string>{{</type>}}

  - Returns an Array of tags associated with the given WebSocket. Throws an error if you have not called `state.acceptWebSocket()` on the given WebSocket.

{{</definitions>}}

### setWebSocketAutoResponse

{{<definitions>}}

- {{<code>}}setWebSocketAutoResponse(webSocketRequestResponsePair{{<param-type>}}WebSocketRequestResponsePair{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}}: {{<type>}}void{{</type>}}

  - Sets an application level auto response that does not wake hibernated WebSockets.

  - `state.setWebSocketAutoResponse` receives {{<code>}}WebSocketRequestResponsePair(request{{<param-type>}}string{{</param-type>}}, response{{<param-type>}}string{{</param-type>}}){{</code>}} as an argument, enabling any WebSocket that was accepted via `state.acceptWebSocket()` belonging to this Object to automatically reply with `response` when it receives the specified `request`.

  - `state.setWebSocketAutoResponse()` is preferable to setting up a server for static ping/pong messages because `state.setWebSocketAutoResponse()` handles application level ping/pongs without waking the WebSocket from hibernation, preventing unnecessary duration charges.

  - Both `request` and `response` are limited to 2,048 characters each.

  - If `state.setWebSocketAutoResponse()` is set without any argument, it will remove any previously set auto-response configuration. Setting `state.setWebSocketAutoResponse()` without any argument will stop a Durable Object from replying with `response` for a `request`. It will also stop updating the last timestamp of a `request`, but if there was any auto-response timestamp set, it will remain accessible with `state.getWebSocketAutoResponseTimestamp()`.

{{</definitions>}}

### getWebSocketAutoResponse

{{<definitions>}}

- {{<code>}}getWebSocketAutoResponse(){{</code>}} : {{<type>}}Object | null{{</type>}}

  - Gets the {{<code>}}WebSocketRequestResponsePair(request{{<param-type>}}string{{</param-type>}}, response{{<param-type>}}string{{</param-type>}}){{</code>}} currently set, or `null` if there is none.

  - Each {{<code>}}WebSocketRequestResponsePair(request{{<param-type>}}string{{</param-type>}}, response{{<param-type>}}string{{</param-type>}}){{</code>}} Object provides methods for `getRequest()` and  `getResponse()`.

{{</definitions>}}

### getWebSocketAutoResponseTimestamp

{{<definitions>}}

- {{<code>}}getWebSocketAutoResponseTimestamp(ws{{<param-type>}}WebSocket{{</param-type>}}){{</code>}} : {{<type>}}Date | null{{</type>}}

  - Gets the most recent `Date` when the WebSocket received an auto-response request, or `null` if the given WebSocket never received an auto-response request.

{{</definitions>}}

### setHibernatableWebSocketEventTimeout

{{<definitions>}}

- {{<code>}}setHibernatableWebSocketEventTimeout(timeout{{<param-type>}}number{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} : {{<type>}}void{{</type>}}

  - Sets the maximum amount of milliseconds a WebSocket event (refer to the handler methods below) can run for.
  - If `0`, or no value is given for the `timeout`, the previously set timeout (if any) will be unset.
  - The maximum value of `timeout` is 604,800,000 ms (7 days).

{{</definitions>}}

### getHibernatableWebSocketEventTimeout

{{<definitions>}}

- {{<code>}}getHibernatableWebSocketEventTimeout(){{</code>}} : {{<type>}}number | null{{</type>}}

  - Gets the currently set hibernatable WebSocket event timeout if any had been set with `state.setHibernatableWebSocketEventTimeout()`.

{{</definitions>}}

## Handler Methods

### webSocketMessage

{{<definitions>}}

- {{<code>}}webSocketMessage(ws{{<param-type>}}WebSocket{{</param-type>}}, message{{<param-type>}}String | ArrayBuffer{{</param-type>}}){{</code>}} : {{<type>}}void{{</type>}}

  - Called by the system when an accepted WebSocket receives a message.

  - This method can be `async`.

  - This method is not called for WebSocket control frames. The system will respond to an incoming [WebSocket protocol ping](https://www.rfc-editor.org/rfc/rfc6455#section-5.5.2) automatically without interrupting hibernation.

{{</definitions>}}

### webSocketClose

{{<definitions>}}

- {{<code>}}webSocketClose(ws{{<param-type>}}WebSocket{{</param-type>}}, code{{<param-type>}}number{{</param-type>}}, reason{{<param-type>}}string{{</param-type>}}, wasClean{{<param-type>}}boolean{{</param-type>}}){{</code>}} : {{<type>}}void{{</type>}}

  - Called by the system when a WebSocket is closed. `wasClean()` is true if the connection closed cleanly, false otherwise.

  - This method can be `async`.

{{</definitions>}}

### webSocketError

{{<definitions>}}

- {{<code>}}webSocketError(ws{{<param-type>}}WebSocket{{</param-type>}}, error{{<param-type>}}any{{</param-type>}}){{</code>}} : {{<type>}}void{{</type>}}

  - Called by the system when any non-disconnection related errors occur.

  - This method can be `async`.

{{</definitions>}}

---

## Related resources

- Refer to [Build a WebSocket server](/durable-objects/examples/websocket-server/) to learn more about building a WebSocket server using Durable Objects and Workers.
- For more information beyond the API reference [Durable Objects with WebSockets](/durable-objects/reference/websockets/).
- [Mozilla Developer Network's (MDN) documentation on the WebSocket class](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket).
- [Cloudflare's WebSocket template for building applications on Workers using WebSockets](https://github.com/cloudflare/websocket-template).