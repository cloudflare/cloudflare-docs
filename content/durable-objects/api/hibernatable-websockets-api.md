---
title: Hibernatable WebSockets API
pcx_content_type: concept
weight: 16
---

{{<beta>}}Hibernatable WebSockets API{{</beta>}}

The Hibernatable WebSockets API allows a Durable Object that is not currently running an event handler (such as handling a WebSocket message, HTTP request, or [alarms](/durable-objects/api/alarms-in-durable-objects/)) to be removed from memory while keeping its WebSockets connected ("hibernation").

Durable Objects WebSockets support includes:

* Cloudflare-specific extensions to the standard WebSocket interface.
* Related methods on the `state` of the Durable Object. 
* Handler methods that a Durable Object can implement for processing WebSocket events.

The Hibernatable WebSocket API enables you to terminate (not proxy) WebSocket connections within a Durable Object, and push messages to all connected clients based on state stored within the [Transactional Storage API](/durable-objects/api/transactional-storage-api/), HTTP fetches to external services, and/or data stored in [R2](/r2/) and [Workers KV](/workers/runtime-apis/kv/).

For WebSocket proxy use-cases, refer to the [standard WebSocket API documentation](/workers/runtime-apis/websockets/use-websockets/#write-a-websocket-client).

{{<Aside type="note">}}

A Durable Object that hibernates will not incur billable [Duration (GB-sec) charges](/durable-objects/platform/pricing/). For applications with many long-lived Durable Objects and periodic WebSocket messages or events, using the Hibernatable WebSockets API can measurably reduce billable duration.

{{</Aside>}}

If an event occurs for a hibernated Durable Object's corresponding handler method, it will return to memory. This will call the Durable Object's constructor, so it is best to minimize work in the constructor when using WebSocket hibernation.

{{<Aside type="warning" header="WebSockets disconnection">}}

Code updates will disconnect all WebSockets. If you deploy a new version of a Worker, every Durable Object is restarted. Any connections to old Durable Objects will be disconnected.

{{</Aside>}}

{{<Aside type="warning" header="Support for local development">}}

WebSockets do not hibernate when using local development environments such as `wrangler dev` or Miniflare. Hibernatable WebSocket events such as `webSocketMessage()` will be delivered, but your Durable Object will never be evicted from memory. Hibernation will be fully supported in local development for General Availability (GA). Use `wrangler dev --remote` or deploy a test/staging Durable Object namespace to production when debugging state management issues.
{{</Aside>}}

## WebSocket extensions

{{<definitions>}}

- {{<code>}}WebSocket.serializeAttachment(value{{<param-type>}}any{{</param-type>}}){{</code>}} : {{<type>}}void{{</type>}}

  - Keeps a copy of `value` in memory (not on disk) to survive hibernation. The value can be any type supported by the [structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), which is true of most types.
  
  - If you modify `value` after calling this method, those changes will not be retained unless you call this method again. The serialized size of `value` is limited to 2,048 bytes, otherwise this method will throw an error. If you need larger values to survive hibernation, use the [Transactional Storage API](/durable-objects/api/transactional-storage-api/) and pass the corresponding key to this method so it can be retrieved later.

- {{<code>}}WebSocket.deserializeAttachment(){{</code>}} : {{<type>}}any{{</type>}}

  - Retrieves the most recent value passed to `serializeAttachment`, or `null` if none exists.

## `state` methods for WebSockets

- {{<code>}}state.acceptWebSocket(ws{{<param-type>}}WebSocket{{</param-type>}}, tags{{<param-type>}}Array\<string>{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} : {{<type>}}void{{</type>}}

  - Adds a WebSocket to the set attached to this Durable Object. `ws.accept()` must not have been called separately. Once called, any incoming messages will be delivered by calling the Durable Object's `webSocketMessage()` handler, and `webSocketClose()` will be invoked upon disconnect. 
  
  - After calling `ws.accept()`, the WebSocket is accepted. Therefore, you can use its `send()` and `close()` methods to send messages. Its `addEventListener()` method will not ever receive any events as they will be delivered to the Durable Object. 
  
  - `tags` are optional string tags used to look up the WebSocket with `getWebSockets()`. Each tag is limited to 256 characters, and each WebSocket is limited to 10 tags associated with it.
  
  - The Hibernatable WebSockets API permits a maximum of 32,768 WebSocket connections per Durable Object instance, but the CPU and memory usage of a given workload may further limit the practical number of simultaneous connections.

- {{<code>}}state.getWebSockets(tag{{<param-type>}}string{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} : {{<type>}}Array\<WebSocket>{{</type>}}

  - Gets an array of accepted WebSockets matching the given tag. Disconnected WebSockets <sup>1</sup> are automatically removed from the list. Calling `getWebSockets()` with no `tag` argument will return all WebSockets.

  - <sup>1</sup> `getWebSockets()` may still return websockets even after `ws.close()` has been called. For example, if your server-side WebSocket (the Durable Object) sends a close, but does not receive one back (and has not detected a disconnect from the client), then the connection is in the `CLOSING` "readyState". The client might send more messages, so the WebSocket is technically not disconnected.

- {{<code>}}state.setWebSocketAutoResponse(webSocketRequestResponsePair{{<param-type>}}WebSocketRequestResponsePair{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}}: {{<type>}}void{{</type>}}

  - Sets an application level auto response that does not wake hibernated WebSockets. 
  
  - `state.setWebSocketAutoResponse` receives {{<code>}}WebSocketRequestResponsePair(request{{<param-type>}}string{{</param-type>}}, response{{<param-type>}}string{{</param-type>}}){{</code>}} as an argument, enabling any WebSocket that was accepted via `state.acceptWebSocket()` belonging to this Object to automatically reply with `response` when it receives the specified `request`. 

  - `setWebSocketAutoResponse()` is preferable to setting up a server for static ping/pong messages because `setWebSocketAutoResponse()` handles application level ping/pongs without waking the WebSocket from hibernation, preventing unnecessary duration charges.

  - Both `request` and `response` are limited to 2,048 characters each.

  - If `state.setWebSocketAutoResponse()` is set without any argument, it will remove any previously set auto-response configuration. Setting `state.setWebSocketAutoResponse()` without any argument will stop a Durable Object from replying with `response` for a `request`. It will also stop updating the last timestamp of a `request`, but if there was any auto-response timestamp set, it will remain accessible with `state.getWebSocketAutoResponseTimestamp()`.

- {{<code>}}state.getWebSocketAutoResponse(){{</code>}} : {{<type>}}Object | null{{</type>}}

  - Gets the {{<code>}}WebSocketRequestResponsePair(request{{<param-type>}}string{{</param-type>}}, response{{<param-type>}}string{{</param-type>}}){{</code>}} currently set, or `null` if there is none. 

  - Each {{<code>}}WebSocketRequestResponsePair(request{{<param-type>}}string{{</param-type>}}, response{{<param-type>}}string{{</param-type>}}){{</code>}} Object provides methods for `getRequest()` and  `getResponse()`.

- {{<code>}}state.getWebSocketAutoResponseTimestamp(ws{{<param-type>}}WebSocket{{</param-type>}}){{</code>}} : {{<type>}}Date | null{{</type>}}

  - Gets the most recent `Date` when the WebSocket received an auto-response request, or `null` if the given WebSocket never received an auto-response request.

### `webSocketMessage()` handler method

The system calls the `webSocketMessage()` method when an accepted WebSocket receives a message. 

The method is not called for WebSocket control frames. The system will respond to an incoming [WebSocket protocol ping](https://www.rfc-editor.org/rfc/rfc6455#section-5.5.2) automatically without interrupting hibernation. The method takes `(ws: WebSocket, message: String | ArrayBuffer)` as parameters. It does not return a result and can be `async`.

### `webSocketClose()` handler method

The system calls the `webSocketClose()` method when a WebSocket is closed. The method takes `(ws: WebSocket, code: number, reason: string, wasClean: boolean)` as parameters. `wasClean()` is true if the connection closed cleanly, false otherwise. The method does not return a result and can be `async`.

### `webSocketError()` handler method

The system calls the `webSocketError()` method for any non-disconnection related errors. The method takes `(ws: WebSocket, error: any)` as parameters. It does not return a result and can be `async`.

---

{{</definitions>}}


