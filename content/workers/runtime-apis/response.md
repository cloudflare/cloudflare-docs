---
pcx-content-type: configuration
title: Response
---

# Response

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
    - {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/API/USVString">}}USVString{{</type-link>}}

- `init` {{<prop-meta>}}optional{{</prop-meta>}}

  - An `options` object that contains custom settings to apply to the response.

{{</definitions>}}

Valid options for the `options` object include: {{<definitions>}}

- `status` {{<type>}}int{{</type>}}

  - The status code for the response, such as `200`.

- `statusText` {{<type>}}string{{</type>}}

  - The status message associated with the status code, such as, `OK`.

- `headers` {{<type-link href="/runtime-apis/request#parameters">}}Headers{{</type-link>}} | {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/API/ByteString">}}ByteString{{</type-link>}}
  - Any headers to add to your response that are contained within a [`Headers`](/workers/runtime-apis/request/#parameters) object or object literal of [`ByteString`](https://developer.mozilla.org/en-US/docs/Web/API/ByteString) key-value pairs.

{{</definitions>}}

## Properties

{{<definitions>}}

- `body` {{<type-link href="/runtime-apis/streams">}}Readable Stream{{</type-link>}}
  - A simple getter to get the body contents.
- `bodyUsed` {{<type>}}boolean{{</type>}}
  - A boolean indicating if the body was used in the response.
- `encodeBody` {{<type>}}string{{</type>}}
  - Workers have to compress data according to the `content-encoding` header when transmitting, to serve data that is already compressed, this property has to be set to `"manual"`, otherwise the default is `"auto"`.
- `headers` {{<type-link href="/runtime-apis/request#parameters">}}Headers{{</type-link>}}
  - The headers for the response.
- `ok` {{<type>}}boolean{{</type>}}
  - A boolean indicating if the response was successful (status in the range `200`-`299`).
- `redirected` {{<type>}}boolean{{</type>}}
  - A boolean indicating if the response is the result of a redirect. If so, its URL list has more than one entry.
- `status` {{<type>}}int{{</type>}}
  - The status code of the response (for example, `200` to indicate success).
- `statusText` {{<type>}}string{{</type>}}
  - The status message corresponding to the status code (for example, `OK` for `200`).
- `url` {{<type>}}string{{</type>}}
  - The URL of the response. The value is the final URL obtained after any redirects.

<!-- What type is this? WebSocket? -->

- `webSocket`
  - This is present in successful WebSocket handshake responses. For example, if a client sends a WebSocket upgrade request to an origin and a worker intercepts the request and then forwards it to the origin and the origin replies with a successful WebSocket upgrade response, the Worker sees `response.webSocket`. This establishes a WebSocket connection proxied through a Worker. Note that you cannot intercept data flowing over a WebSocket connection.

{{</definitions>}}

## Methods

### Instance methods

{{<definitions>}}

- `clone()` {{<type-link href="#response">}}Response{{</type-link>}}

  - Creates a clone of a [`Response`](#response) object.

- `json()` {{<type-link href="#response">}}Response{{</type-link>}}
  
  - Creates a new response with a JSON-serialized payload.
  
- `redirect()` {{<type-link href="#response">}}Response{{</type-link>}}
  
  - Creates a new response with a different URL.

{{</definitions>}}

### Additional instance methods

`Response` implements the [`Body`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#body) mixin of the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), and therefore `Response` instances additionally have the following methods available:

{{<definitions>}}

- {{<code>}}arrayBuffer(){{</code>}} {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer">}}Promise{`<ArrayBuffer>`}{{</type-link>}}

  - Takes a [`Response`](#response) stream, reads it to completion, and returns a promise that resolves with an [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer).

- {{<code>}}formData(){{</code>}} {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/API/FormData">}}Promise{`<FormData>`}{{</type-link>}}

  - Takes a [`Response`](#response) stream, reads it to completion, and returns a promise that resolves with a [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) object.

- {{<code>}}json(){{</code>}} {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/">}}Promise{`<JSON>`}{{</type-link>}}

  - Takes a [`Response`](#response) stream, reads it to completion, and returns a promise that resolves with the result of parsing the body text as [`JSON`](https://developer.mozilla.org/en-US/docs/Web/).

- {{<code>}}text(){{</code>}} {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/API/USVString">}}Promise{`<USVString>`}{{</type-link>}}

  - Takes a [`Response`](#response) stream, reads it to completion, and returns a promise that resolves with a [`USVString`](https://developer.mozilla.org/en-US/docs/Web/API/USVString) (text).

{{</definitions>}}

---

## Related resources

- [Examples: Modify response](/workers/examples/modify-response/)
- [Examples: Conditional response](/workers/examples/conditional-response/)
- [Reference: `Request`](/workers/runtime-apis/request/)
