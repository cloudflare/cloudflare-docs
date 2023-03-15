---
_build:
  publishResources: false
  render: never
  list: never

name: "WebSocket Compression"
sort_date: "2023-03-14"
experimental: true
enable_flag: "web_socket_compression"
---

The Workers runtime did not support WebSocket compression when the initial WebSocket implementation was released. Historically, the runtime has stripped or ignored the `Sec-WebSocket-Extensions` header -- but is now capable of fully complying with the WebSocket Compression RFC. Since many clients are likely sending `Sec-WebSocket-Extensions: permessage-deflate` to their Workers today (`new WebSocket(url)` automatically sets this in browsers), we have decided to maintain prior behavior if this flag is absent. It will likely be enabled by a compatibility date in the future.

If the flag is present, the Workers runtime is capable of using WebSocket Compression on both inbound and outbound WebSocket connections.

Like browsers, calling `new WebSocket(url)` in a Worker will automatically set the `Sec-WebSocket-Extensions: permessage-deflate` header. If you are using the non-standard `fetch()` API to obtain a WebSocket, you can include the `Sec-WebSocket-Extensions` header with value `permessage-deflate` and include any of the compression parameters defined in [RFC-7692](https://datatracker.ietf.org/doc/html/rfc7692#section-7).