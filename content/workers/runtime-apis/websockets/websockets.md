---
pcx_content_type: configuration
title: WebSockets
---

# WebSockets

## Background

WebSockets allow you to communicate in real time with your Cloudflare Workers serverless functions.

When using WebSockets with Durable Objects, we recommend using the [Hibernatable WebSockets API](/durable-objects/api/hibernatable-websockets-api/) which adds additional extensions to the standard `WebSocket` object.

## Constructor

```js
// { 0: <WebSocket>, 1: <WebSocket> }
let websocketPair = new WebSocketPair();
```

The WebSocketPair returned from this constructor is an Object, with two WebSockets at keys `0` and `1`.

These WebSockets are commonly referred to as `client` and `server`. The below example combines `Object.values` and ES6 destructuring to retrieve the WebSockets as `client` and `server`:

```js
let [client, server] = Object.values(new WebSocketPair());
```

## Methods

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

  - The WebSocket event (refer to [Events](/workers/runtime-apis/websockets/websockets/#events)) to listen to.

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

  Send a message to the other WebSocket in this WebSocket pair.

{{</definitions>}}

#### Parameters

{{<definitions>}}

- {{<code>}}message{{<param-type>}}string{{</param-type>}}{{</code>}}

  - The message to send down the WebSocket connection to the corresponding client. This should be a string or something coercible into a string; for example, strings and numbers will be simply cast into strings, but objects and arrays should be cast to JSON strings using <code>JSON.stringify</code>, and parsed in the client.

{{</definitions>}}

---

## Events

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
