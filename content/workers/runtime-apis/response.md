---
pcx_content_type: configuration
title: Response
meta:
  description: Interface that represents an HTTP response.
---

# Response

The `Response` interface represents an HTTP response and is part of the Fetch API.

---

## Constructor

```js
let response = new Response(body, init);
```

### Parameters

{{<definitions>}}

- `body` {{<prop-meta>}}optional{{</prop-meta>}}

  - An object that defines the body text for the response. Can be `null` or any one of the following types:

    - {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/API/BufferSource">}}BufferSource{{</type-link>}}
    - {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/API/FormData">}}FormData{{</type-link>}}
    - {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream">}}ReadableStream{{</type-link>}}
    - {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams">}}URLSearchParams{{</type-link>}}
    - {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String">}}USVString{{</type-link>}}

- `init` {{<prop-meta>}}optional{{</prop-meta>}}

  - An `options` object that contains custom settings to apply to the response.

{{</definitions>}}

Valid options for the `options` object include: {{<definitions>}}

- `cf` {{<type>}}any | null{{</type>}}
  - An object that contains Cloudflare-specific information. This object is not part of the Fetch API standard and is only available in Cloudflare Workers. This field is only used by consumers of the Response for informational purposes and does not have any impact on Workers behavior.
- `encodeBody` {{<type>}}string{{</type>}}
  - Workers have to compress data according to the `content-encoding` header when transmitting, to serve data that is already compressed, this property has to be set to `"manual"`, otherwise the default is `"automatic"`.
- `headers` {{<type-link href="/runtime-apis/request#parameters">}}Headers{{</type-link>}} | {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String">}}ByteString{{</type-link>}}
  - Any headers to add to your response that are contained within a [`Headers`](/workers/runtime-apis/request/#parameters) object or object literal of [`ByteString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) key-value pairs.
- `status` {{<type>}}int{{</type>}}
  - The status code for the response, such as `200`.
- `statusText` {{<type>}}string{{</type>}}
  - The status message associated with the status code, such as, `OK`.
- `webSocket` {{<type>}}WebSocket | null{{</type>}}
  - This is present in successful WebSocket handshake responses. For example, if a client sends a WebSocket upgrade request to an origin and a Worker intercepts the request and then forwards it to the origin and the origin replies with a successful WebSocket upgrade response, the Worker sees `response.webSocket`. This establishes a WebSocket connection proxied through a Worker. Note that you cannot intercept data flowing over a WebSocket connection.

{{</definitions>}}

## Properties

{{<definitions>}}

- `response.body` {{<type-link href="/runtime-apis/streams">}}Readable Stream{{</type-link>}}
  - A getter to get the body contents.
- `response.bodyUsed` {{<type>}}boolean{{</type>}}
  - A boolean indicating if the body was used in the response.
- `response.headers` {{<type-link href="/runtime-apis/request#parameters">}}Headers{{</type-link>}}
  - The headers for the response.
- `response.ok` {{<type>}}boolean{{</type>}}
  - A boolean indicating if the response was successful (status in the range `200`-`299`).
- `response.redirected` {{<type>}}boolean{{</type>}}
  - A boolean indicating if the response is the result of a redirect. If so, its URL list has more than one entry.
- `response.status` {{<type>}}int{{</type>}}
  - The status code of the response (for example, `200` to indicate success).
- `response.statusText` {{<type>}}string{{</type>}}
  - The status message corresponding to the status code (for example, `OK` for `200`).
- `response.url` {{<type>}}string{{</type>}}
  - The URL of the response. The value is the final URL obtained after any redirects.
- `response.webSocket` {{<type>}}WebSocket?{{</type>}}
  - This is present in successful WebSocket handshake responses. For example, if a client sends a WebSocket upgrade request to an origin and a Worker intercepts the request and then forwards it to the origin and the origin replies with a successful WebSocket upgrade response, the Worker sees `response.webSocket`. This establishes a WebSocket connection proxied through a Worker. Note that you cannot intercept data flowing over a WebSocket connection.

{{</definitions>}}

## Methods

### Instance methods

{{<definitions>}}

- `clone()` : {{<type-link href="#response">}}Response{{</type-link>}}

  - Creates a clone of a [`Response`](#response) object.

- `json()` : {{<type-link href="#response">}}Response{{</type-link>}}

  - Creates a new response with a JSON-serialized payload.

- `redirect()` : {{<type-link href="#response">}}Response{{</type-link>}}

  - Creates a new response with a different URL.

{{</definitions>}}

### Additional instance methods

`Response` implements the [`Body`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#body) mixin of the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), and therefore `Response` instances additionally have the following methods available:

{{<definitions>}}

- {{<code>}}arrayBuffer(){{</code>}} : {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer">}}Promise\<ArrayBuffer>{{</type-link>}}

  - Takes a [`Response`](#response) stream, reads it to completion, and returns a promise that resolves with an [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer).

- {{<code>}}formData(){{</code>}} : {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/API/FormData">}}Promise\<FormData>{{</type-link>}}

  - Takes a [`Response`](#response) stream, reads it to completion, and returns a promise that resolves with a [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) object.

- {{<code>}}json(){{</code>}} : {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/">}}Promise\<JSON>{{</type-link>}}

  - Takes a [`Response`](#response) stream, reads it to completion, and returns a promise that resolves with the result of parsing the body text as [`JSON`](https://developer.mozilla.org/en-US/docs/Web/).

- {{<code>}}text(){{</code>}} : {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String">}}Promise\<USVString>{{</type-link>}}

  - Takes a [`Response`](#response) stream, reads it to completion, and returns a promise that resolves with a [`USVString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) (text).

{{</definitions>}}

### Set the `Content-Length` header

The `Content-Length` header will be automatically set by the runtime based on whatever the data source for the `Response` is. Any value manually set by user code in the `Headers` will be ignored. To have a `Content-Length` header with a specific value specified, the `body` of the `Response` must be either a `FixedLengthStream` or a fixed-length value just as a string or `TypedArray`.

A `FixedLengthStream` is an identity `TransformStream` that permits only a fixed number of bytes to be written to it.

```js
  const { writable, readable } = new FixedLengthStream(11);

  const enc = new TextEncoder();
  const writer = writable.getWriter();
  writer.write(enc.encode("hello world"));
  writer.end();

  return new Response(readable);
```

Using any other type of `ReadableStream` as the body of a response will result in chunked encoding being used.

---

## Related resources

- [Examples: Modify response](/workers/examples/modify-response/)
- [Examples: Conditional response](/workers/examples/conditional-response/)
- [Reference: `Request`](/workers/runtime-apis/request/)
- Write your Worker code in [ES modules syntax](/workers/reference/migrate-to-module-workers/) for an optimized experience.
