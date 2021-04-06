---
order: 9
---

# Using WebSockets

<Aside type="warning">

We're looking for developers to experiment with WebSockets support in Cloudflare Workers, but WebSocket support generally remains in early access. Details such as pricing and limits are not yet available.

</Aside>

WebSockets allow you to communicate in real-time with your Cloudflare Workers serverless functions. In this guide, you'll learn the basics of WebSockets on Cloudflare Workers, both from the perspective of _writing_ WebSocket servers in your Workers functions, as well as connecting to and working with those WebSocket servers as a _client_.

<Aside>WebSockets utilize a simple event-based system for receiving and sending messages, much like the Workers' runtime model of responding to events.</Aside>

## Writing a WebSocket Server

WebSocket servers in Cloudflare Workers allow you to receive messages from a client in real-time. This brief guide will show you how to set up a WebSocket server in Workers.

A client can make a WebSocket request in the browser by instantiating a new instance of `WebSocket`, passing in the URL for your Workers function:

```js
const websocket = new WebSocket("wss://example-websocket.signalnerve.workers.dev)
```

<Aside>
For more details about creating and working with WebSockets in the client, see "Writing a WebSocket client".
</Aside>

When an incoming WebSocket request reaches the Workers function, it will contain an `Upgrade` header, set to the string value `websocket`. Check for this header before continuing to instantiate a WebSocket:

```js
async function handleRequest(request) {
  const upgradeHeader = request.headers.get("Upgrade")
  if (!upgradeHeader || upgradeHeader !== "websocket") {
    return new Response("Expected websocket", { status: 400 })
  }
}
```

Once you've appropriately checked for the `Upgrade` header, you can create a new instance of WebSocketPair, which contains _server_ and _client_ WebSockets. One of these WebSockets should be handled by the Workers function (which we'll do shortly), and the other should be returned as part of a `Response` with status 101, indicating the "Switching protocols" response:

```js
async function handleRequest(request) {
  const upgradeHeader = request.headers.get("Upgrade")
  if (!upgradeHeader || upgradeHeader !== "websocket") {
    return new Response("Expected websocket", { status: 400 })
  }

  const webSocketPair = new WebSocketPair()
  const client, server = webSocketPair[0], webSocketPair[1]

  return new Response(null, {
    status: 101,
    webSocket: client
  })
}
```

<Aside>
The WebsocketPair returned from this constructor is an Object, with two WebSockets at keys `0` and `1`. It's common to grab the two WebSockets from this pair using `Object.values` and ES6 destructuring, as seen in the below example:

```js
let [client, server] = Object.values(new WebsocketPair())
```
</Aside>

With your `client` Websocket returned back to the client, you now need to handle the `server` WebSocket. To begin receiving messages on your Workers function, call `accept` on the `server` WebSocket:

```js
const [client, server] = Object.values(new WebSocketPair())
server.accept()
```

WebSockets emit a number of [Events](/workers/runtime-apis/websockets#events) that can be connected to using `addEventListener`. In the below example, we hook into the `message` event and emit a `console.log` with the data from it:

```js
server.addEventListener("message", message => {
  console.log(message.data)
})
```

## Writing a WebSocket Client

Writing WebSocket clients that communicate with your Workers function is a two-step process: first, create the WebSocket instance, and then attach events to it, just like we did on the server:

```js
const websocket = new WebSocket("wss://websocket-example.signalnerve.workers.dev)
websocket.addEventListener("message", message => {
  console.log("Message received from server")
  console.log(message.data)
})
```

For an example of this in practice, see the [`websocket-template`](https://github.com/cloudflare/websocket-template) that we provide to get started with WebSockets. 

## Durable Objects and WebSocket state

WebSockets are effectively stateless, meaning that they can't practically be used for full applications or anything that requires broader coordination of states between clients. 

The solution to this is _Durable Objects_, our coordinated state tool for Cloudflare Workers, which is often used in parallel with WebSockets to effectively allow WebSockets to be re-instantiated with persistent state over multiple clients and connections. Check out our [Durable Objects](/learning/using-durable-objects) learning page to get started.