---
_build:
  publishResources: false
  render: never
  list: never

name: "Setters/getters on API object prototypes"
sort_date: "2022-01-31"
enable_date: "2022-01-31"
enable_flag: "workers_api_getters_setters_on_prototype"
disable_flag: "workers_api_getters_setters_on_instance"
---

Originally, properties on Workers API objects were defined as instance properties as opposed to prototype properties. This broke subclassing at the JavaScript layer, preventing a subclass from correctly overriding the superclass getters/setters. This flag controls the breaking change made to set those getters/setters on the prototype template instead.

This changes applies to:

- `AbortSignal`
- `AbortController`
- `Blob`
- `Body`
- `DigestStream`
- `Event`
- `File`
- `Request`
- `ReadableStream`
- `ReadableStreamDefaultReader`
- `ReadableStreamBYOBReader`
- `Response`
- `TextDecoder`
- `TextEncoder`
- `TransformStream`
- `URL`
- `WebSocket`
- `WritableStream`
- `WritableStreamDefaultWriter`
