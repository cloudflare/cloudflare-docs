---
order: 4
title: "✉️ WebSockets"
---

- [WebSockets Reference](/workers/runtime-apis/websockets)
- [Using WebSockets](/workers/examples/websockets/)

## Server

Miniflare will always upgrade Web Socket connections. The Worker must respond
with a status `101 Switching Protocols` response including a `webSocket`. For
example, the Worker below implements an echo WebSocket server:

```js
export default {
	fetch(request) {
		const [client, server] = Object.values(new WebSocketPair());

		server.accept();
		server.addEventListener("message", (event) => {
			server.send(event.data);
		});

		return new Response(null, {
			status: 101,
			webSocket: client,
		});
	},
};
```

When using `dispatchFetch`, you are responsible for handling WebSockets by using
the `webSocket` property on `Response`. As an example, if the above worker
script was stored in `echo.mjs`:

```js {13-17}
import { Miniflare } from "miniflare";

const mf = new Miniflare({
	modules: true,
	scriptPath: "echo.mjs",
});

const res = await mf.dispatchFetch("https://example.com", {
	headers: {
		Upgrade: "websocket",
	},
});
const webSocket = res.webSocket;
webSocket.accept();
webSocket.addEventListener("message", (event) => {
	console.log(event.data);
});

webSocket.send("Hello!"); // Above listener logs "Hello!"
```
