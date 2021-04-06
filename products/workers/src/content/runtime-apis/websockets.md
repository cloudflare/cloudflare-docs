# WebSockets

## Background

WebSockets allow you to communicate in real-time with your Cloudflare Workers serverless functions.

## Constructor

```js
// { 0: <Websocket>, 1: <Websocket> }
let websocketPair = new WebsocketPair()
```

The WebsocketPair returned from this constructor is an Object, with two WebSockets at keys `0` and `1`. 

You can easily retrieve both WebSockets from the WebsocketPair using `Object.values`:

```js
let websocketPair = Object.values(new WebsocketPair())
```

These WebSockets are commonly referred to as `client` and `server`. In the below example, we use ES6 destructuring of the above array to retrieve the WebSockets as `client` and `server`:

```js
let [client, server] = Object.values(new WebsocketPair())
```

## Methods

### accept

<Definitions>

- <Code>accept()</Code>

    - Accepts the Websocket connection and begins terminating requests for the WebSocket at Cloudflare's edge. This effectively enables the Workers runtime to begin responding to and handling WebSocket requests.

</Definitions>

### addEventListener

<Definitions>

- <Code>addEventListener(event<ParamType>WebSocketEvent</ParamType>, callbackFunction<ParamType>Function</ParamType>)</Code>

    - Add callback functions to be executed when an event has occurred on the WebSocket.


</Definitions>

#### Parameters

<Definitions>

- `event` <TypeLink href="#events">WebSocketEvent</TypeLink>
    - The WebSocket event (see "Events" below) to listen to.

- <Code>callbackFunction(message<TypeLink href="#message">Message</TypeLink>) <Type>Function</Type></Code>
    - A function to be called when the Websocket responds to a specific event.

</Definitions>

### close

- <Code>close()</Code>

Close the WebSocket connection.

### send

- <Code>send(message<ParamType>string</ParamType>)</Code>

Send a message to the other WebSocket in this WebSocket pair.

#### Parameters

<Definitions>

- <Code>message<ParamType>string</ParamType></Code>
  - The message to send down the WebSocket connection to the corresponding client. This should be a string or something coercible into a string; for instance, strings and numbers will be simply cast into strings, but objects and arrays should be cast to JSON strings using `JSON.stringify`, and parsed in the client.

</Definitions>

## Events

- `close`

An event indicating the WebSocket has closed.

- `error`

An event indicating there was an error with the WebSocket.

- `message`

An event indicating a new message received from the client, including the data passed by the client.

- `open`

An event indicating the WebSocket has successfully opened.

## Types

### Message

<Definitions>

- `data` <Type>any</Type> - The data passed back from the other WebSocket in your pair.
- `type` <Type>string</Type> - Defaults to `message`.

</Definitions>

## See also

- [Mozilla Developer Network's (MDN) documentation on the WebSocket class](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [Our WebSocket template for building applications on Workers using WebSockets](https://github.com/cloudflare/websocket-template)