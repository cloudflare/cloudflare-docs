---
pcx_content_type: configuration
title: Connect (TCP Socket API)
weight: 4
---

# connect()

The `connect()` API provides a programming interface for creating an outbound [TCP connection](https://www.cloudflare.com/learning/ddos/glossary/tcp-ip/) from a Cloudflare Worker. It returns a TCP socket, with both a [readable](/workers/runtime-apis/streams/readablestream/) and [writable](/workers/runtime-apis/streams/writablestream/) stream of data, allowing you to read and write data on an ongoing basis, as long as the connection remains open.

Many application-layer protocols are built on top of TCP, and require an underlying TCP socket API in order to work, including SSH, MQTT, SMTP, FTP, IRC, and most database wire protocols including MySQL, PostgreSQL, MongoDB and more. `connect()` is the lower-level API that allows these protocols to work on Cloudflare Workers.

`connect()` is provided as a [Runtime API](/workers/runtime-apis/), and is accessed by importing the `connect` function from `cloudflare:sockets`, akin to how one imports built-in modules in Node.js. A simple example of creating a TCP socket, writing to it, and returning the readable side of the socket as a response, is shown below:


```typescript
import { connect } from 'cloudflare:sockets';

const connectionUrl = "<URL>";

export default {
  async fetch(req, env) {

    try {
      const socket = connect(connectionUrl);

      const writer = socket.writable.getWriter()
      const encoder = new TextEncoder();
      const encoded = encoder.encode(url.pathname + "\r\n");
      await writer.write(encoded);

      return new Response(socket.readable, { headers: { "Content-Type": "text/plain" } });
    } catch (error) {
      return new Response("Socket connection failed: " + error, { status: 500 });
    }
  }
};
```

## Syntax and Types

{{<definitions>}}

- {{<code>}}connect(address: {{<type-link href="/workers/runtime-apis/connect/#socketaddress">}}SocketAddress{{</type-link>}} | string, options?: {{<prop-meta>}}optional{{</prop-meta>}} {{<type-link href="/workers/runtime-apis/connect/#socketoptions">}}SocketOptions{{</type-link>}}){{</code>}} : {{<type-link href="/workers/runtime-apis/connect/#socket">}}`Socket`{{</type-link>}}
  - `connect()` accepts either a URL string or [`SocketAddress`](/workers/runtime-apis/connect/#socketaddress) to define the hostname and port number to connect to, and an optional configuration object, [`SocketOptions`](/workers/runtime-apis/connect/#socketoptions). It returns an instance of a [`Socket`](/workers/runtime-apis/connect/#socket).
{{</definitions>}}

### `SocketAddress`

{{<definitions>}}

- `hostname` {{<type>}}string{{</type>}}
  - The hostname to connect to. Ex: `cloudflare.com`.

- `port` {{<type>}}number{{</type>}}
  - The port number to connect to. Ex: `5432`.

{{</definitions>}}

### `SocketOptions`

{{<definitions>}}

- `secureTransport` {{<type>}}"off" | "on" | "starttls"{{</type>}} — Defaults to `off`
  - Specifies whether or not to use [TLS](https://www.cloudflare.com/learning/ssl/transport-layer-security-tls/) when creating the TCP socket.
  - `off` — do not use TLS.
  - `on` — use TLS.
  - `starttls` — do not use TLS initially, but allow the socket to be upgraded to use TLS by calling [`startTls()`](/workers/runtime-apis/connect/#how-to-implement-the-starttls-pattern).

- `allowHalfOpen` {{<type>}}boolean{{</type>}} — Defaults to `false`
  - Defines whether the writable side of the TCP socket will automatically close on EOF. When set to `false`, the writable side of the TCP socket will automatically close on EOF. When set to `true`, the writable side of the TCP socket will remain open on EOF.
  - This option allows for interoperability with TCP socket implementations in Node.js and Deno, which currently behave differently.

{{</definitions>}}

### `Socket`

{{<definitions>}}

- {{<code>}}readable(){{</code>}} : {{<type-link href="/workers/runtime-apis/streams/readablestream/">}}ReadableStream{{</type-link>}}
  - Returns the readable side of the TCP socket.

- {{<code>}}writeable(){{</code>}} : {{<type-link href="/workers/runtime-apis/streams/writeable/">}}WriteableStream{{</type-link>}}
  - Returns the writable side of the TCP socket.

- `closed()` {{<type>}}`Promise<void>`{{</type>}}
  - TODO

- `close()` {{<type>}}`Promise<void>`{{</type>}}
  - Closes the TCP socket. If [`allowHalfOpen`](/workers/runtime-apis/connect/#socketoptions) is set to `true`, only the writeable side of the socket will be closed, and the readable side of the socket will remain readable.

- {{<code>}}startTls(options?: {{<prop-meta>}}optional{{</prop-meta>}} {{<type-link href="/workers/runtime-apis/connect/#tlsoptions">}}TlsOptions{{</type-link>}}){{</code>}} : {{<type-link href="/workers/runtime-apis/connect/#socket">}}Socket{{</type-link>}}
  - Upgrades an insecure socket to a secure one that uses TLS, returning a new [Socket](/workers/runtime-apis/connect#socket). Note that in order to call `startTls()`, you must set [`secureTransport`](/workers/runtime-apis/connect/#socketoptions) to `starttls` when initially calling `connect()` to create the socket.

{{</definitions>}}

### `TlsOptions`

{{<definitions>}}

- `expectedServerHostname` {{<type>}}string{{</type>}}
  - TODO

{{</definitions>}}

## How to implement the startTLS pattern

Many TCP-based systems, including databases and email servers, require that clients use a pattern called StartTLS when connecting. In this pattern, the client first creates an insecure TCP socket, without TLS, and then "upgrades" it to a secure TCP socket, that uses TLS. The `connect()` API simplifies this by providing a method, `startTls()`, which returns a new `Socket` instance that uses TLS:

```typescript
import { connect } from "cloudflare:sockets"

const address = {
  hostname: "example-postgres-db.com",
  port: 5432
};
const socket = connect(address, { secureTransport: "starttls" });
const secureSocket = socket.startTls();
```

Note the following:

- `startTls()` can only be called if `secureTransport` is set to `starttls` when creating the initial TCP socket.
- Once `startTls()` is called, the initial socket is closed and no longer usable. In the example above, one would would use the newly created `secureSocket`.

### Considerations

- TCP sockets must be created within the [`fetch()` handler](/workers/get-started/guide/#3-write-code) of a Worker. TCP sockets cannot be created in global scope and shared across requests. 