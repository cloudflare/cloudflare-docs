# Response

## Constructor

```js
let response = new Response(body, init)
```

### Parameters

<Definitions>

- `body` <PropMeta>optional</PropMeta>

  - An object that defines the body text for the response. Can be `null` or any one of the following types:

    - <TypeLink href="https://developer.mozilla.org/en-US/docs/Web/API/BufferSource">BufferSource</TypeLink> &nbsp;
    - <TypeLink href="https://developer.mozilla.org/en-US/docs/Web/API/FormData">FormData</TypeLink> &nbsp;
    - <TypeLink href="https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream">ReadableStream</TypeLink> &nbsp;
    - <TypeLink href="https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams">URLSearchParams</TypeLink> &nbsp;
    - <TypeLink href="https://developer.mozilla.org/en-US/docs/Web/API/USVString">USVString</TypeLink>    &nbsp;

- `init` <PropMeta>optional</PropMeta>

  - An `options` object that contains custom settings to apply to the response.

</Definitions>

Valid options for the `options` object include:
<Definitions>

  - `status` <Type>int</Type>
    - The status code for the response, such as `200`.

  - `statusText` <Type>string</Type>
    - The status message associated with the status code, like, `OK`.

  - `headers` <TypeLink href="/runtime-apis/request#parameters">Headers</TypeLink> | <TypeLink href="https://developer.mozilla.org/en-US/docs/Web/API/ByteString">ByteString</TypeLink>
    - Any headers to add to your response that are contained within a [`Headers`](/runtime-apis/request#parameters) object or object literal of [`ByteString`](https://developer.mozilla.org/en-US/docs/Web/API/ByteString) key/value pairs.

</Definitions>

## Properties

<Definitions>

- `body` <TypeLink href="/apis/streams">Readable Stream</TypeLink>
  - A simple getter to get the body contents.
- `bodyUsed` <Type>boolean</Type>
  - A boolean indicating if the body was used in the response.
- `headers` <TypeLink href="/runtime-apis/request#parameters">Headers</TypeLink>
  - The headers for the request.
- `ok` <Type>boolean</Type>
  - A boolean indicating if the response was successful (status in the range 200-299).
- `redirected` <Type>boolean</Type>
  - A boolean indicating if the response is the result of a redirect. If so, its URL list has more than one entry.
- `status` <Type>int</Type>
  - The status code of the response (for example, `200` to indicate success).
- `statusText` <Type>string</Type>
  - The status message corresponding to the status code (for example, `OK` for `200`).
- `url` <Type>string</Type>
  - The URL of the response. The value is the final URL obtained after any redirects.

<!-- What type is this? WebSocket? -->
- `webSocket`
  - This is present in successful WebSocket handshake responses. For example, if a client sends a WebSocket upgrade request to an origin and a worker intercepts the request and then forwards it to the origin and the origin replies with a successful WebSocket upgrade response, the worker sees `response.webSocket`. This establishes a WebSocket connection proxied through a worker. Note that you cannot intercept data flowing over a WebSocket connection.

</Definitions>

## Methods

### Instance methods

<Definitions>

- `clone()` <TypeLink href="#response">Response</TypeLink>
  - Creates a clone of a [`Response`]("#response") object.

- `redirect()` <TypeLink href="#response">Response</TypeLink>
  - Creates a new response with a different URL.

</Definitions>

### Additional instance methods

`Response` implements the [`Body`](https://developer.mozilla.org/en-US/docs/Web/API/Body) mixin of the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), and therefore `Response` instances additionally have the following methods available:

<Definitions>

- <Code>arrayBuffer()</Code> <TypeLink href="https://developer.mozilla.org/en-US/docs/Web/API/ArrayBuffer">Promise{`<ArrayBuffer>`}</TypeLink>

  - Takes a [`Response`](#response) stream, reads it to completion, and returns a promise that resolves with an [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/ArrayBuffer).

- <Code>formData()</Code> <TypeLink href="https://developer.mozilla.org/en-US/docs/Web/API/FormData">Promise{`<FormData>`}</TypeLink>

  - Takes a [`Response`](#response) stream, reads it to completion, and returns a promise that resolves with a [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) object.

- <Code>json()</Code> <TypeLink href="https://developer.mozilla.org/en-US/docs/Web/">Promise{`<JSON>`}</TypeLink>

  - Takes a [`Response`](#response) stream, reads it to completion, and returns a promise that resolves with the result of parsing the body text as [`JSON`](https://developer.mozilla.org/en-US/docs/Web/)

- <Code>text()</Code> <TypeLink href="https://developer.mozilla.org/en-US/docs/Web/API/USVString">Promise{`<USVString>`}</TypeLink>

  - Takes a [`Response`](#response) stream, reads it to completion, and returns a promise that resolves with a [`USVString`](https://developer.mozilla.org/en-US/docs/Web/API/USVString) (text).

</Definitions>

--------------------------------

## See also

- [Examples: Modify response](/examples/modify-response)
- [Examples: Conditional response](/examples/conditional-response)
- [Reference: `Request`](/runtime-apis/request)
