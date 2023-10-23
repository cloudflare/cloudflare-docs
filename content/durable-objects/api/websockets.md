---
title: WebSockets
pcx_content_type: configuration
---

# WebSockets

## Background

WebSockets are long-lived TCP connections that enable bi-directional, real-time communication between client and server.

[Durable Objects](/durable-objects/) support WebSockets — your Durable Object can act as a single point-of-coordination for WebSocket sessions, giving you full control over messages sent to and from clients, allowing you to build applications like chat rooms and multiplayer games.

For more information beyond the API reference, refer to [Use WebSockets in Durable Objects](/durable-objects/learning/websockets/).

## WebSocket Methods

### accept

{{<definitions>}}

- {{<code>}}accept(){{</code>}}

  - Accepts the WebSocket connection and begins terminating requests for the WebSocket on Cloudflare's global network. This effectively enables the Workers runtime to begin responding to and handling WebSocket requests.

{{</definitions>}}

### addEventListener

{{<definitions>}}

- {{<code>}}addEventListener(event{{<param-type>}}WebSocketEvent{{</param-type>}}, callbackFunction{{<param-type>}}Function{{</param-type>}}){{</code>}}

  - Add callback functions to be executed when an event has occurred on the WebSocket.

{{</definitions>}}

#### Parameters

{{<definitions>}}

- `event` {{<type-link href="#events">}}WebSocketEvent{{</type-link>}}

  - The WebSocket event (refer to [Events](/workers/runtime-apis/websockets/#events)) to listen to.

- {{<code>}}callbackFunction(message{{<type-link href="#message">}}Message{{</type-link>}}){{</code>}} {{<type>}}Function{{</type>}}

  - A function to be called when the WebSocket responds to a specific event.

{{</definitions>}}

### close

{{<definitions>}}

- {{<code>}}close(code{{<param-type>}}number{{</param-type>}}, reason{{<param-type>}}string{{</param-type>}}){{</code>}}

  - Close the WebSocket connection.

{{</definitions>}}

#### Parameters

{{<definitions>}}

- {{<code>}}code{{<param-type>}}integer{{</param-type>}}{{</code>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - An integer indicating the close code sent by the server. This should match an option from the [list of status codes](https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#status_codes) provided by the WebSocket spec.

- {{<code>}}reason{{<param-type>}}string{{</param-type>}}{{</code>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - A human-readable string indicating why the WebSocket connection was closed.

{{</definitions>}}

### send

{{<definitions>}}

- {{<code>}}send(message{{<param-type>}}string{{</param-type>}} | {{<param-type>}}ArrayBuffer{{</param-type>}} | {{<param-type>}}ArrayBufferView{{</param-type>}}){{</code>}}

  - Send a message to the other WebSocket in this WebSocket pair.

{{</definitions>}}

#### Parameters

{{<definitions>}}

- {{<code>}}message{{<param-type>}}string{{</param-type>}}{{</code>}}

  - The message to send down the WebSocket connection to the corresponding client. This should be a string or something coercible into a string; for example, strings and numbers will be simply cast into strings, but objects and arrays should be cast to JSON strings using <code>JSON.stringify</code>, and parsed in the client.

{{</definitions>}}

{{<heading-pill style="beta" heading="h3">}}serializeAttachment{{</heading-pill>}}

{{<definitions>}}

- {{<code>}}serializeAttachment(value{{<param-type>}}any{{</param-type>}}){{</code>}} : {{<type>}}void{{</type>}}
  - This method is part of the [Hibernatable WebSockets API](/durable-objects/learning/websockets/#websocket-hibernation).

  - Keeps a copy of `value` in memory (not on disk) to survive hibernation. The value can be any type supported by the [structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), which is true of most types.
  
  - If you modify `value` after calling this method, those changes will not be retained unless you call this method again. The serialized size of `value` is limited to 2,048 bytes, otherwise this method will throw an error. If you need larger values to survive hibernation, use the [Transactional Storage API](/durable-objects/api/transactional-storage-api/) and pass the corresponding key to this method so it can be retrieved later.

{{</definitions>}}

{{<heading-pill style="beta" heading="h3">}}deserializeAttachment{{</heading-pill>}}

{{<definitions>}}

- {{<code>}}deserializeAttachment(){{</code>}} : {{<type>}}any{{</type>}}
  - This method is part of the [Hibernatable WebSockets API](/durable-objects/learning/websockets/#websocket-hibernation).

  - Retrieves the most recent value passed to `serializeAttachment()`, or `null` if none exists.

{{</definitions>}}

{{<heading-pill style="beta" heading="h2">}}State Methods{{</heading-pill>}}

These methods are part of the [Hibernatable WebSockets API](/durable-objects/learning/websockets/#websocket-hibernation).

### acceptWebSocket

{{<definitions>}}

- {{<code>}}acceptWebSocket(ws{{<param-type>}}WebSocket{{</param-type>}}, tags{{<param-type>}}Array\<string>{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} : {{<type>}}void{{</type>}}

  - Adds a WebSocket to the set attached to this Durable Object. `ws.accept()` must not have been called separately. Once called, any incoming messages will be delivered by calling the Durable Object's `webSocketMessage()` handler, and `webSocketClose()` will be invoked upon disconnect. 
  
  - After calling `state.acceptWebSocket(ws)`, the WebSocket is accepted. Therefore, you can use its `send()` and `close()` methods to send messages. Its `addEventListener()` method will not ever receive any events as they will be delivered to the Durable Object. 
  
  - `tags` are optional string tags used to look up the WebSocket with `getWebSockets()`. Each tag is limited to 256 characters, and each WebSocket is limited to 10 tags associated with it.
  
  - The Hibernatable WebSockets API permits a maximum of 32,768 WebSocket connections per Durable Object instance, but the CPU and memory usage of a given workload may further limit the practical number of simultaneous connections.

{{</definitions>}}

### getWebSockets

{{<definitions>}}

- {{<code>}}getWebSockets(tag{{<param-type>}}string{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} : {{<type>}}Array\<WebSocket>{{</type>}}

  - Gets an array of accepted WebSockets matching the given tag. Disconnected WebSockets <sup>1</sup> are automatically removed from the list. Calling `getWebSockets()` with no `tag` argument will return all WebSockets.

  - <sup>1</sup> `getWebSockets()` may still return websockets even after `ws.close()` has been called. For example, if your server-side WebSocket (the Durable Object) sends a close, but does not receive one back (and has not detected a disconnect from the client), then the connection is in the `CLOSING` "readyState". The client might send more messages, so the WebSocket is technically not disconnected.

{{</definitions>}}

### setWebSocketAutoResponse

{{<definitions>}}

- {{<code>}}setWebSocketAutoResponse(webSocketRequestResponsePair{{<param-type>}}WebSocketRequestResponsePair{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}}: {{<type>}}void{{</type>}}

  - Sets an application level auto response that does not wake hibernated WebSockets. 
  
  - `state.setWebSocketAutoResponse` receives {{<code>}}WebSocketRequestResponsePair(request{{<param-type>}}string{{</param-type>}}, response{{<param-type>}}string{{</param-type>}}){{</code>}} as an argument, enabling any WebSocket that was accepted via `state.acceptWebSocket()` belonging to this Object to automatically reply with `response` when it receives the specified `request`. 

  - `setWebSocketAutoResponse()` is preferable to setting up a server for static ping/pong messages because `setWebSocketAutoResponse()` handles application level ping/pongs without waking the WebSocket from hibernation, preventing unnecessary duration charges.

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

{{<heading-pill style="beta" heading="h2">}}Handler Methods{{</heading-pill>}}

These methods are part of the [Hibernatable WebSockets API](/durable-objects/learning/websockets/#websocket-hibernation).

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

## WebSocketEvent

{{<definitions>}}

- {{<code>}}close{{</code>}}
  - An event indicating the WebSocket has closed.

- {{<code>}}error{{</code>}}
  - An event indicating there was an error with the WebSocket.

- {{<code>}}message{{</code>}}
  - An event indicating a new message received from the client, including the data passed by the client.

{{</definitions>}}

## Types

### Message

{{<definitions>}}

- `data` {{<type>}}any{{</type>}} - The data passed back from the other WebSocket in your pair.
- `type` {{<type>}}string{{</type>}} - Defaults to `message`.

{{</definitions>}}

---

## Related resources

- [Mozilla Developer Network's (MDN) documentation on the WebSocket class](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [Our WebSocket template for building applications on Workers using WebSockets](https://github.com/cloudflare/websocket-template)
