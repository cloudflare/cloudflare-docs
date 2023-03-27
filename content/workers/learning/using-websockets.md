---
pcx_content_type: concept
title: Using WebSockets
weight: 13
---

# Using WebSockets

WebSockets allow you to communicate in real time with your Cloudflare Workers serverless functions. In this guide, you will learn the basics of WebSockets on Cloudflare Workers, both from the perspective of writing WebSocket servers in your Workers functions, as well as connecting to and working with those WebSocket servers as a client.

WebSockets are open connections sustained between the client and the origin server. Inside a WebSocket connection, the client and the origin can pass data back and forth without having to reestablish sessions. This makes exchanging data within a WebSocket connection fast. WebSockets are often used for real-time applications such as live chat and gaming.

{{<Aside type="note">}}

WebSockets utilize a simple event-based system for receiving and sending messages, much like the Workers' runtime model of responding to events.

{{</Aside>}}

## Writing a WebSocket Server

WebSocket servers in Cloudflare Workers allow you to receive messages from a client in real time. This guide will show you how to set up a WebSocket server in Workers.

A client can make a WebSocket request in the browser by instantiating a new instance of `WebSocket`, passing in the URL for your Workers function:

```js
// In client-side JavaScript, connect to your Workers function using WebSockets:
const websocket = new WebSocket('wss://example-websocket.signalnerve.workers.dev');
```

{{<Aside type="note">}}

For more details about creating and working with WebSockets in the client, refer to [Writing a WebSocket client](#writing-a-websocket-client).

{{</Aside>}}

When an incoming WebSocket request reaches the Workers function, it will contain an `Upgrade` header, set to the string value `websocket`. Check for this header before continuing to instantiate a WebSocket:

```js
async function handleRequest(request) {
  const upgradeHeader = request.headers.get('Upgrade');
  if (!upgradeHeader || upgradeHeader !== 'websocket') {
    return new Response('Expected Upgrade: websocket', { status: 426 });
  }
}
```

After you have appropriately checked for the `Upgrade` header, you can create a new instance of `WebSocketPair`, which contains server and client WebSockets. One of these WebSockets should be handled by the Workers function and the other should be returned as part of a `Response` with the [`101` status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/101), indicating the request is switching protocols:

```js
async function handleRequest(request) {
  const upgradeHeader = request.headers.get('Upgrade');
  if (!upgradeHeader || upgradeHeader !== 'websocket') {
    return new Response('Expected Upgrade: websocket', { status: 426 });
  }

  const webSocketPair = new WebSocketPair();
  const client = webSocketPair[0],
    server = webSocketPair[1];

  return new Response(null, {
    status: 101,
    webSocket: client,
  });
}
```

The `WebSocketPair` constructor returns an Object, with the `0` and `1` keys each holding a `WebSocket` instance as its value. It is common to grab the two WebSockets from this pair using [`Object.values`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Object/values) and [ES6 destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment), as seen in the below example.

In order to begin communicating with the `client` WebSocket in your Worker, call `accept` on the `server` WebSocket. This will tell the Workers runtime that it should listen for WebSocket data and keep the connection open with your `client` WebSocket:

```js
async function handleRequest(request) {
  const upgradeHeader = request.headers.get('Upgrade');
  if (!upgradeHeader || upgradeHeader !== 'websocket') {
    return new Response('Expected Upgrade: websocket', { status: 426 });
  }

  const webSocketPair = new WebSocketPair();
  const [client, server] = Object.values(webSocketPair);

  server.accept();

  return new Response(null, {
    status: 101,
    webSocket: client,
  });
}
```

WebSockets emit a number of [Events](/workers/runtime-apis/websockets/#events) that can be connected to using `addEventListener`. The below example hooks into the `message` event and emits a `console.log` with the data from it:

```js
async function handleRequest(request) {
  const upgradeHeader = request.headers.get('Upgrade');
  if (!upgradeHeader || upgradeHeader !== 'websocket') {
    return new Response('Expected Upgrade: websocket', { status: 426 });
  }

  const webSocketPair = new WebSocketPair();
  const [client, server] = Object.values(webSocketPair);

  server.accept();
  server.addEventListener('message', event => {
    console.log(event.data);
  });

  return new Response(null, {
    status: 101,
    webSocket: client,
  });
}
```

### Connecting to the WebSocket server from a client

Writing WebSocket clients that communicate with your Workers function is a two-step process: first, create the WebSocket instance, and then attach event listeners to it:

```js
const websocket = new WebSocket('wss://websocket-example.signalnerve.workers.dev');
websocket.addEventListener('message', event => {
  console.log('Message received from server');
  console.log(event.data);
});
```

WebSocket clients can send messages back to the server using the [`send`](/workers/runtime-apis/websockets/#send) function:

```js
websocket.send('MESSAGE');
```

When the WebSocket interaction is complete, the client can close the connection using [`close`](/workers/runtime-apis/websockets/#close):

```js
websocket.close();
```

For an example of this in practice, refer to the [`websocket-template`](https://github.com/cloudflare/websocket-template) to get started with WebSockets.

## Writing a WebSocket client

Cloudflare Workers supports the `new WebSocket(url)` constructor. A Worker can establish a WebSocket connection to a remote server in the same manner as the client implementation described above.

Additionally, Cloudflare supports establishing WebSocket connections by making a fetch request to a URL with the `Upgrade` header set.

```js
async function websocket(url) {
  // Make a fetch request including `Upgrade: websocket` header.
  // The Workers Runtime will automatically handle other requirements
  // of the WebSocket protocol, like the Sec-WebSocket-Key header.
  let resp = await fetch(url, {
    headers: {
      Upgrade: 'websocket',
    },
  });

  // If the WebSocket handshake completed successfully, then the
  // response has a `webSocket` property.
  let ws = resp.webSocket;
  if (!ws) {
    throw new Error("server didn't accept WebSocket");
  }

  // Call accept() to indicate that you'll be handling the socket here
  // in JavaScript, as opposed to returning it on to a client.
  ws.accept();

  // Now you can send and receive messages like before.
  ws.send('hello');
  ws.addEventListener('message', msg => {
    console.log(msg.data);
  });
}
```

## WebSocket compression

Cloudflare Workers provides experimental support for WebSocket compression via the `web_socket_compression` compatibility flag. Refer to [Experimental Changes](/workers/platform/compatibility-dates/#experimental-changes) for more information.

Without this compatibility flag, the Workers runtime will strip or ignore the `Sec-WebSocket-Extensions: permessage-deflate` header on all inbound and outbound WebSocket requests.

## Durable Objects and WebSocket state

If your application needs to coordinate among multiple WebSocket connections, such as a chat room or game match, you will need to create a Durable Object so clients send messages to a single-point-of-coordination. Durable Objects are a coordinated state tool for Cloudflare Workers, which are often used in parallel with WebSockets to persist state over multiple clients and connections. Refer to [Durable Objects](/workers/learning/using-durable-objects/) to get started.
