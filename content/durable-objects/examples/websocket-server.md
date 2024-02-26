---
type: example
summary: Build a WebSocket server using Durable Objects and Workers.
tags:
  - Durable Objects
pcx_content_type: example
title: Build a WebSocket server 
weight: 3
layout: example
---

This example shows how to build a WebSocket server using Durable Objects and Workers. The example exposes two endpoints, one to create new WebSockets, and another to check how many WebSockets are currently connected. For more information, refer to [Use Durable Objects with WebSockets](/durable-objects/reference/websockets/).

{{<Aside type="warning">}}

WebSocket connections pin your Durable Object to memory, and so duration charges will be incurred so long as the WebSocket is connected (regardless of activity). To avoid duration charges during periods of inactivity, use the [WebSocket Hibernation API](/durable-objects/examples/websocket-hibernation-server), which only charges for duration when JS is actively executing.

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
    // This example will always refer to the same Durable Object instance,
    // since it hardcodes the name "foo".
    let id = env.WEBSOCKET_SERVER.idFromName("foo");
    let stub = env.WEBSOCKET_SERVER.get(id);

    // Forward the request to the Durable Object.
    return await stub.fetch(request);
  }
};

// Durable Object
export class WebSocketServer {
  constructor(state, env) {
    this.state = state;

    // This is reset whenever the constructor runs because
    // regular WebSockets do not survive Durable Object resets.
    // WebSockets accepted via the Hibernation API can survive
    // a certain type of eviction, but this example will not cover that here.
    this.currentlyConnectedWebSockets = 0;
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

      // Calling `accept()` informs the runtime that this WebSocket is to begin terminating
      // request within the Durable Object. It has the effect of "accepting" the connection,
      // and allowing the WebSocket to send and receive messages.
      server.accept();
      this.currentlyConnectedWebSockets += 1;

      // Upon receiving a message from the client, the server replies with the same message,
      // but will prefix the message with "[Durable Object]: ".
      server.addEventListener('message', event => {
        server.send(`[Durable Object]: ${event.data}`);
      });

      // If the client closes the connection, the runtime will also close the connection.
      server.addEventListener('close', cls => {
        this.currentlyConnectedWebSockets -= 1;
        server.close(cls.code, "Durable Object is closing WebSocket");
      });

      return new Response(null, {
        status: 101,
        webSocket: client,
      });
    } else if (request.url.endsWith("/getCurrentConnections")) {
      if (this.currentlyConnectedWebSockets == 1) {
        return new Response(`There is ${this.currentlyConnectedWebSockets} WebSocket client connected to this Durable Object instance.`);
      }
      return new Response(`There are ${this.currentlyConnectedWebSockets} WebSocket clients connected to this Durable Object instance.`);
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
}
```

{{</tab>}}
{{<tab label="ts">}}

```ts
---
filename: index.ts
---
export interface Env {
  WEBSOCKET_SERVER: DurableObjectNamespace;
}

// Worker
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // This example will refer to the same Durable Object instance,
    // since the name "foo" is hardcoded.
    let id: DurableObjectId = env.WEBSOCKET_SERVER.idFromName("foo");
    let stub: DurableObjectStub = env.WEBSOCKET_SERVER.get(id);

    // Forward the request to the Durable Object and wait for the Response.
    return await stub.fetch(request);
  },
};

// Durable Object
export class WebSocketServer {
  state: DurableObjectState;
  currentlyConnectedWebSockets: number;

  constructor(state: DurableObjectState, env: Env) {
    this.state = state;
    // This is reset whenever the constructor runs because
    // regular WebSockets do not survive Durable Object resets.
    //
    // WebSockets accepted via the Hibernation API can survive
    // a certain type of eviction, but we won't cover that here.
    this.currentlyConnectedWebSockets = 0;
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

      // Calling `accept()` tells the runtime that this WebSocket is to begin terminating
      // request within the Durable Object. It has the effect of "accepting" the connection,
      // and allowing the WebSocket to send and receive messages.
      server.accept();
      this.currentlyConnectedWebSockets += 1;

      // Upon receiving a message from the client, we will reply with the same message,
      // but will prefix the message with "[Durable Object]: ".
      server.addEventListener('message', (event: MessageEvent) => {
        server.send(`[Durable Object]: ${event.data}`);
      });

      // If the client closes the connection, the runtime will close the connection too.
      server.addEventListener('close', (cls: CloseEvent) => {
        this.currentlyConnectedWebSockets -= 1;
        server.close(cls.code, "Durable Object is closing WebSocket");
      });

      return new Response(null, {
        status: 101,
        webSocket: client,
      });
    } else if (request.url.endsWith("/getCurrentConnections")) {
      if (this.currentlyConnectedWebSockets == 1) {
        return new Response(`There is ${this.currentlyConnectedWebSockets} WebSocket client connected to this Durable Object instance.`);
      }
      return new Response(`There are ${this.currentlyConnectedWebSockets} WebSocket clients connected to this Durable Object instance.`);
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
}
```

{{</tab>}}
{{</tabs>}}

Finally, configure your `wrangler.toml` file to include a Durable Object [binding](/durable-objects/get-started/#5-configure-durable-object-bindings) and [migration](/durable-objects/reference/durable-objects-migrations/) based on the namespace and class name chosen previously.

```toml
---
filename: wrangler.toml
---
name = "websocket-server"

[[durable_objects.bindings]]
name = "WEBSOCKET_SERVER"
class_name = "WebSocketServer"

[[migrations]]
tag = "v1"
new_classes = ["WebSocketServer"]
```
### Related resources

- [Durable Objects: Edge Chat Demo](https://github.com/cloudflare/workers-chat-demo).