---
_build:
  publishResources: false
  render: never
  list: never

name: "WebSocket auto-reply to close"
sort_date: "2026-03-10"
enable_date: "2026-04-07"
enable_flag: "web_socket_auto_reply_to_close"
disable_flag: "web_socket_manual_reply_to_close"
---

When a server sends a WebSocket Close frame, the Workers runtime now automatically sends a reciprocal Close frame and transitions `readyState` to `CLOSED` before firing the `close` event. This matches the [WebSocket spec](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/close_event) and browser behavior.

Previously, receiving a server-initiated Close frame left the WebSocket in `CLOSING` and required the application to call `close()` itself. With this flag active, you no longer need to call `close()` in your `close` event handler. The runtime handles the close handshake automatically.

```js
const [client, server] = Object.values(new WebSocketPair());
server.accept();

server.addEventListener("close", (event) => {
  // readyState is already CLOSED — no need to call server.close().
  console.log(server.readyState); // WebSocket.CLOSED
  console.log(event.code); // 1000
  console.log(event.wasClean); // true
}, { once: true });
```

If you do still call `close()` inside the handler, the call is silently ignored. This means existing code that manually replies to Close frames will not break when you update your compatibility date.

The automatic close behavior can interfere with WebSocket proxying. When a Worker proxies between a client and a backend, the old behavior allowed the Worker to observe a backend Close frame without the runtime tearing down the connection, giving the Worker time to coordinate a clean close on the client side. To support this pattern, the `accept()` method now accepts an option `allowHalfOpen`. Call `ws.accept({ allowHalfOpen: true })` to restore the old half-open behavior regardless of the compatibility flag.

```js
const [client, server] = Object.values(new WebSocketPair());

// Opt into half-open mode for proxying
server.accept({ allowHalfOpen: true });

server.addEventListener("close", (event) => {
  // With allowHalfOpen true, readyState is still CLOSING here,
  // giving you time to coordinate the close on the other side.
  console.log(server.readyState); // WebSocket.CLOSING

  // Manually close when ready.
  server.close(1000, "done");
}, { once: true });
```

Note that there is no corresponding option to the `WebSocket` constructor. WebSockets constructed with `new WebSocket` will always auto-reply to closes after this flag takes effect. WebSockets constructed this way are automatically "accepted", so there is no opportunity to pass the option to `accept()`. If you are creating a WebSocket with `new WebSocket`, but you need half-open behavior, you will need to switch to using `fetch()` instead.

```js
// This does not allow half-open:
let ws = new WebSocket("wss://example.com");

// But you can do this instead:
let resp = await fetch("https://example.com", {
  headers: { "Upgrade": "websocket" }
});
if (!resp.webSocket) {
  throw new Error("WebSocket handshake not accepted");
}
let ws = resp.webSocket;
ws.accept({ allowHalfOpen: true });
```

For more information, refer to the [WebSocket API documentation](/workers/runtime-apis/websockets/).
