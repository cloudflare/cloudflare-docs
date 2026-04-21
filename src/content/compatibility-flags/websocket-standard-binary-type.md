---
_build:
  publishResources: false
  render: never
  list: never

name: "WebSocket standard binary type"
sort_date: "2026-03-17"
enable_date: "2026-03-17"
enable_flag: "websocket_standard_binary_type"
disable_flag: "no_websocket_standard_binary_type"
---

This flag controls the default value of the [`binaryType`](/workers/runtime-apis/websockets/#binarytype) property on `WebSocket`, which in turn controls how binary frames are delivered to the `message` event. With the flag active, `binaryType` defaults to `"blob"` and binary frames arrive as [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob) objects, matching the [WebSocket specification](https://websockets.spec.whatwg.org/) and standard browser behavior. Without the flag, `binaryType` defaults to `"arraybuffer"` and binary frames arrive as [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer), matching the runtime's historical behavior.

The `binaryType` property itself is available on every `WebSocket` regardless of the flag. Assigning a value overrides the default for that specific WebSocket:

```js
const resp = await fetch("https://example.com", {
  headers: { Upgrade: "websocket" },
});
const ws = resp.webSocket;

// Opt back into ArrayBuffer delivery before calling accept().
ws.binaryType = "arraybuffer";
ws.accept();

ws.addEventListener("message", (event) => {
  // event.data is an ArrayBuffer for binary frames.
});
```

If you are not ready to migrate and want to keep `ArrayBuffer` as the default for every WebSocket in your Worker, add the `no_websocket_standard_binary_type` flag to your [Wrangler configuration file](/workers/wrangler/configuration/).

This flag has no effect on the Durable Object hibernatable WebSocket [`webSocketMessage`](/durable-objects/best-practices/websockets/) handler, which always receives binary data as `ArrayBuffer`.
