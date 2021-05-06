---
order: 9
---

# Using WebSockets

<Aside type="warning">

Details such as pricing and limits on Websockets are not yet available. We're looking for developers to experiment with WebSocket support in Cloudflare Workers, but WebSocket support generally remains in early access.

</Aside>

WebSockets allow you to communicate in real-time with your Cloudflare Workers serverless functions. In this guide, you'll learn the basics of WebSockets on Cloudflare Workers, both from the perspective of _writing_ WebSocket servers in your Workers functions, as well as connecting to and working with those WebSocket servers as a _client_.

WebSockets are open connections sustained between the client and the origin server. Inside a WebSocket connection, the client and the origin can pass data back and forth without having to reestablish sessions. This makes exchanging data within a WebSocket connection fast. WebSockets are often used for real-time applications such as live chat and gaming.

<Aside>WebSockets utilize a simple event-based system for receiving and sending messages, much like the Workers' runtime model of responding to events.</Aside>

## Writing a WebSocket Server

WebSocket servers in Cloudflare Workers allow you to receive messages from a client in real-time. This brief guide will show you how to set up a WebSocket server in Workers.

A client can make a WebSocket request in the browser by instantiating a new instance of `WebSocket`, passing in the URL for your Workers function:

```js
// In client-side JavaScript, connect to your Workers function using WebSockets
const websocket = new WebSocket("wss://example-websocket.signalnerve.workers.dev")
```

<Aside>
For more details about creating and working with WebSockets in the client, see <a href="#writing-a-websocket-client">"Writing a WebSocket client"</a>.
</Aside>

When an incoming WebSocket request reaches the Workers function, it will contain an `Upgrade` header, set to the string value `websocket`. Check for this header before continuing to instantiate a WebSocket:

```js
async function handleRequest(request) {
  const upgradeHeader = request.headers.get("Upgrade")
  if (!upgradeHeader || upgradeHeader !== "websocket") {
    return new Response("Expected Upgrade: websocket", { status: 426 })
  }
}
```

Once you've appropriately checked for the `Upgrade` header, you can create a new instance of `WebSocketPair`, which contains _server_ and _client_ WebSockets. One of these WebSockets should be handled by the Workers function (which we'll do shortly), and the other should be returned as part of a `Response` with status 101, indicating the "Switching protocols" response:

```js
async function handleRequest(request) {
  const upgradeHeader = request.headers.get("Upgrade")
  if (!upgradeHeader || upgradeHeader !== "websocket") {
    return new Response("Expected Upgrade: websocket", { status: 426 })
  }

  const webSocketPair = new WebSocketPair()
  const client = webSocketPair[0], server = webSocketPair[1]

  return new Response(null, {
    status: 101,
    webSocket: client
  })
}
```

An Object is returned from the `WebSocketPair` constructor, with the `0` and `1` keys each holding a `WebSocket` instance as its value. It's common to grab the two WebSockets from this pair using [`Object.values`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Object/values) and [ES6 destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment), as seen in the below example.

In order to begin communicating with the `client` WebSocket in your Worker, call `accept` on the `server` WebSocket. This will tell the Workers runtime that it should listen for WebSocket data and keep the connection open with your `client` WebSocket:

```js
async function handleRequest(request) {
  const upgradeHeader = request.headers.get("Upgrade")
  if (!upgradeHeader || upgradeHeader !== "websocket") {
    return new Response("Expected Upgrade: websocket", { status: 426 })
  }

  const webSocketPair = new WebSocketPair()
  const [client, server] = Object.values(webSocketPair)

  server.accept()

  return new Response(null, {
    status: 101,
    webSocket: client
  })
}
```

WebSockets emit a number of [Events](/workers/runtime-apis/websockets#events) that can be connected to using `addEventListener`. In the below example, we hook into the `message` event and emit a `console.log` with the data from it:

```js
async function handleRequest(request) {
  const upgradeHeader = request.headers.get("Upgrade")
  if (!upgradeHeader || upgradeHeader !== "websocket") {
    return new Response("Expected Upgrade: websocket", { status: 426 })
  }

  const webSocketPair = new WebSocketPair()
  const [client, server] = Object.values(webSocketPair)

  server.accept()
  server.addEventListener("message", event => {
    console.log(event.data)
  })

  return new Response(null, {
    status: 101,
    webSocket: client
  })
}
```

## Writing a WebSocket Client

Writing WebSocket clients that communicate with your Workers function is a two-step process: first, create the WebSocket instance, and then attach event listeners to it, just like we did on the server:

```js
const websocket = new WebSocket("wss://websocket-example.signalnerve.workers.dev")
websocket.addEventListener("message", event => {
  console.log("Message received from server")
  console.log(event.data)
})
```

WebSocket clients can send messages back to the server using the [`send`](/runtime-apis/websockets#send) function:

```js
websocket.send("MESSAGE")
```

When the WebSocket interaction is complete, the client can close the connection using [`close`](/runtime-apis/websockets#close):

```js
websocket.close()
```

For an example of this in practice, see the [`websocket-template`](https://github.com/cloudflare/websocket-template) that we provide to get started with WebSockets.

## Durable Objects and WebSocket state

If your application needs to coordinate among multiple WebSocket connections, such as a chat room or game match, you'll need to create a _Durable Object_ so clients send messages to a single-point-of-coordination. Durable Objects are a coordinated state tool for Cloudflare Workers, which are often used in parallel with WebSockets to persist state over multiple clients and connections. Check out our [Durable Objects](/learning/using-durable-objects) learning page to get started.
