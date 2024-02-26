---
type: example
summary: Build a WebSocket server using WebSocket Hibernation on Durable Objects and Workers.
tags:
  - Durable Objects
pcx_content_type: example
title: Build a WebSocket server with WebSocket Hibernation
weight: 3
layout: example
---

This example is similar to the [Build a WebSocket server](/durable-objects/examples/websocket-server) example, but uses the WebSocket Hibernation API. The WebSocket Hibernation API should be preferred for WebSocket server applications built on Durable Objects, since it significantly decreases duration charge, and provides additional features that pair well with WebSocket applications. For more information, refer to [Use Durable Objects with WebSockets](/durable-objects/reference/websockets/).

{{<Aside type="note">}}

WebSocket Hibernation is unavailable for outgoing WebSocket use-cases. Hibernation is only supported when the Durable Object acts as a server. For use-cases where outgoing WebSockets are required, refer to [Writing a WebSocket client](/workers/examples/websockets/#write-a-websocket-client).

{{</Aside>}}


{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
---
filename: index.js
---
// Worker
export default {
  async fetch(request, env) {
    // The example refers to the same Durable Object instance,
    // since it hardcodes the name "foo".
    let id = env.WEBSOCKET_HIBERNATION_SERVER.idFromName("foo");
    let stub = env.WEBSOCKET_HIBERNATION_SERVER.get(id);

    // Forward the request to the Durable Object.
    return await stub.fetch(request);
  }
};

// Durable Object
export class WebSocketHibernationServer {
  constructor(state, env) {
    this.state = state;
  }

  // Handle HTTP requests from clients.
  async fetch(request) {
    if (request.url.endsWith("/websocket")) {
      // Expect to receive a WebSocket Upgrade request.
      // If there is one, accept the request and return a WebSocket Response.
      const upgradeHeader = request.headers.get('Upgrade');
      if (!upgradeHeader || upgradeHeader !== 'websocket') {
        return new Response('Durable Object expected Upgrade: websocket', { status: 426 });
      }

      // Creates two ends of a WebSocket connection.
      const webSocketPair = new WebSocketPair();
      const [client, server] = Object.values(webSocketPair);

      // Calling `acceptWebSocket()` informs the runtime that this WebSocket is to begin terminating
      // request within the Durable Object. It has the effect of "accepting" the connection,
      // and allowing the WebSocket to send and receive messages.
      // Unlike `ws.accept()`, `state.acceptWebSocket(ws)` informs the Workers Runtime that the websocket
      // is "hibernatable", so the runtime does not need to pin this Durable Object to memory while
      // the connection is open. During periods of inactivity, the Durable Object can be evicted
      // from memory, but the WebSocket connection will remain open. If at some later point the
      // WebSocket receives a message, the runtime will recreate the Durable Object
      // (run the `constructor`) and deliver the message to the appropriate handler.
      this.state.acceptWebSocket(server);

      return new Response(null, {
        status: 101,
        webSocket: client,
      });
    } else if (request.url.endsWith("/getCurrentConnections")) {
      // Retrieves all currently connected websockets accepted via `acceptWebSocket()`.
      let numConnections = this.state.getWebSockets().length;
      if (numConnections == 1) {
        return new Response(`There is ${numConnections} WebSocket client connected to this Durable Object instance.`);
      }
      return new Response(`There are ${numConnections} WebSocket clients connected to this Durable Object instance.`);
    }

    // Unknown path, reply with usage info.
    return new Response(`
This Durable Object supports the following endpoints:
  /websocket
    - Creates a WebSocket connection, any messages sent to it are echoed with a prefix.
  /getCurrentConnections
    - A regular HTTP GET endpoint that returns the number of currently connected WebSocket clients.
`)
  }

  async webSocketMessage(ws, message) {
    // Upon receiving a message from the client, reply with the same message,
    // but will prefix the message with "[Durable Object]: ".
    ws.send(`[Durable Object]: ${message}`);
  }

  async webSocketClose(ws, code, reason, wasClean) {
    // If the client closes the connection, we will close it too.
    ws.close(code, "Durable Object is closing WebSocket");
  }
}
```

{{</tab>}}
{{<tab label="ts">}}

```ts
---
filename: index.ts
---
export interface Env {
  WEBSOCKET_HIBERNATION_SERVER: DurableObjectNamespace;
}

// Worker
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // This example will always refer to the same Durable Object instance,
    // since the name "foo" is hardcoded.
    let id: DurableObjectId = env.WEBSOCKET_HIBERNATION_SERVER.idFromName("foo");
    let stub: DurableObjectStub = env.WEBSOCKET_HIBERNATION_SERVER.get(id);

    // Forward the request to the Durable Object and wait for the Response.
    return await stub.fetch(request);
  }
};

// Durable Object
export class WebSocketHibernationServer {
  state: DurableObjectState;

  constructor(state: DurableObjectState, env: Env) {
    this.state = state;
  }

  // Handle HTTP requests from clients.
  async fetch(request: Request): Promise<Response> {
    if (request.url.endsWith("/websocket")) {
      // Expect to receive a WebSocket Upgrade request.
      // If there is one, accept the request and return a WebSocket Response.
      const upgradeHeader = request.headers.get('Upgrade');
      if (!upgradeHeader || upgradeHeader !== 'websocket') {
        return new Response('Durable Object expected Upgrade: websocket', { status: 426 });
      }

      // Creates two ends of a WebSocket connection.
      const webSocketPair = new WebSocketPair();
      const [client, server] = Object.values(webSocketPair);

      // Calling `acceptWebSocket()` tells the runtime that this WebSocket is to begin terminating
      // request within the Durable Object. It has the effect of "accepting" the connection,
      // and allowing the WebSocket to send and receive messages.
      // Unlike `ws.accept()`, `state.acceptWebSocket(ws)` informs the Workers Runtime that the websocket
      // is "hibernatable", so the runtime does not need to pin this Durable Object to memory while
      // the connection is open. During periods of inactivity, the Durable Object can be evicted
      // from memory, but the WebSocket connection will remain open. If at some later point the
      // WebSocket receives a message, the runtime will recreate the Durable Object
      // (run the `constructor`) and deliver the message to the appropriate handler.
      this.state.acceptWebSocket(server);

      return new Response(null, {
        status: 101,
        webSocket: client,
      });
    } else if (request.url.endsWith("/getCurrentConnections")) {
      // Retrieves all currently connected websockets accepted via `acceptWebSocket()`.
      let numConnections: number = this.state.getWebSockets().length;
      if (numConnections == 1) {
        return new Response(`There is ${numConnections} WebSocket client connected to this Durable Object instance.`);
      }
      return new Response(`There are ${numConnections} WebSocket clients connected to this Durable Object instance.`);
    }

    // Unknown path, reply with usage info.
    return new Response(`
This Durable Object supports the following endpoints:
  /websocket
    - Creates a WebSocket connection, any messages sent to it are echoed with a prefix.
  /getCurrentConnections
    - A regular HTTP GET endpoint that returns the number of currently connected WebSocket clients.
`)
  }

  async webSocketMessage(ws: WebSocket, message: ArrayBuffer | string) {
    // Upon receiving a message from the client, reply with the same message,
    // but will prefix the message with "[Durable Object]: ".
    ws.send(`[Durable Object]: ${message}`);
  }

  async webSocketClose(ws: WebSocket, code: number, reason: string, wasClean: boolean) {
    // If the client closes the connection, the runtime will invoke the webSocketClose() handler.
    ws.close(code, "Durable Object is closing WebSocket");
  }
}
```

{{</tab>}}
{{</tabs>}}

Finally, configure your `wrangler.toml` file to include a Durable Object [binding](/durable-objects/get-started/#5-configure-durable-object-bindings) and [migration](/durable-objects/reference/durable-objects-migrations/) based on the namespace and class name chosen previously.

```toml
---
filename: wrangler.toml
---
name = "websocket-hibernation-server"

[[durable_objects.bindings]]
name = "WEBSOCKET_HIBERNATION_SERVER"
class_name = "WebSocketHibernationServer"

[[migrations]]
tag = "v1"
new_classes = ["WebSocketHibernationServer"]
```
### Related resources

- [Durable Objects: Edge Chat Demo with Hibernation](https://github.com/cloudflare/workers-chat-demo/tree/hibernation).