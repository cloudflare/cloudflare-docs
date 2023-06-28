---
pcx_content_type: configuration
title: TCP sockets
---

# TCP sockets

The Workers runtime provides the `connect()` API for creating outbound [TCP connections](https://www.cloudflare.com/learning/ddos/glossary/tcp-ip/) from Workers.

Many application-layer protocols are built on top of the Transmission Control Protocol (TCP). These application-layer protocols, including SSH, MQTT, SMTP, FTP, IRC, and most database wire protocols including MySQL, PostgreSQL, MongoDB, require an underlying TCP socket API in order to work.

## `connect()`

The `connect()` function returns a TCP socket, with both a [readable](/workers/runtime-apis/streams/readablestream/) and [writable](/workers/runtime-apis/streams/writablestream/) stream of data. This allows you to read and write data on an ongoing basis, as long as the connection remains open.

`connect()` is provided as a [Runtime API](/workers/runtime-apis/), and is accessed by importing the `connect` function from `cloudflare:sockets`. This process is similar to how one imports built-in modules in Node.js. Refer to the following codeblock for an example of creating a TCP socket, writing to it, and returning the readable side of the socket as a response:

```typescript
import { connect } from 'cloudflare:sockets';

export default {
  async fetch(req: Request) {
    const gopherAddr = { hostname: "gopher.floodgap.com", port: 70 };
    const url = new URL(req.url);

    try {
      const socket = connect(gopherAddr);

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

{{<definitions>}}

- {{<code>}}connect(address: {{<type-link href="/workers/runtime-apis/tcp-sockets/#socketaddress">}}SocketAddress{{</type-link>}} | string, options?: {{<prop-meta>}}optional{{</prop-meta>}} {{<type-link href="/workers/runtime-apis/tcp-sockets/#socketoptions">}}SocketOptions{{</type-link>}}){{</code>}} : {{<type-link href="/workers/runtime-apis/tcp-sockets/#socket">}}`Socket`{{</type-link>}}
  - `connect()` accepts either a URL string or [`SocketAddress`](/workers/runtime-apis/tcp-sockets/#socketaddress) to define the hostname and port number to connect to, and an optional configuration object, [`SocketOptions`](/workers/runtime-apis/tcp-sockets/#socketoptions). It returns an instance of a [`Socket`](/workers/runtime-apis/tcp-sockets/#socket).
{{</definitions>}}

### `SocketAddress`

{{<definitions>}}

- `hostname` {{<type>}}string{{</type>}}
  - The hostname to connect to. Example: `cloudflare.com`.

- `port` {{<type>}}number{{</type>}}
  - The port number to connect to. Example: `5432`.

{{</definitions>}}

### `SocketOptions`

{{<definitions>}}

- `secureTransport` {{<type>}}"off" | "on" | "starttls"{{</type>}} — Defaults to `off`
  - Specifies whether or not to use [TLS](https://www.cloudflare.com/learning/ssl/transport-layer-security-tls/) when creating the TCP socket.
  - `off` — Do not use TLS.
  - `on` — Use TLS.
  - `starttls` — Do not use TLS initially, but allow the socket to be upgraded to use TLS by calling [`startTls()`](/workers/runtime-apis/tcp-sockets/#how-to-implement-the-starttls-pattern).

- `allowHalfOpen` {{<type>}}boolean{{</type>}} — Defaults to `false`
  - Defines whether the writable side of the TCP socket will automatically close on end-of-file (EOF). When set to `false`, the writable side of the TCP socket will automatically close on EOF. When set to `true`, the writable side of the TCP socket will remain open on EOF.
  - This option is similar to that offered by the Node.js [`net` module](https://nodejs.org/api/net.html) and allows interoperability with code which utilizes it.

{{</definitions>}}

### `Socket`

{{<definitions>}}

- {{<code>}}readable{{</code>}} : {{<type-link href="/workers/runtime-apis/streams/readablestream/">}}ReadableStream{{</type-link>}}
  - Returns the readable side of the TCP socket.

- {{<code>}}writable{{</code>}} : {{<type-link href="/workers/runtime-apis/streams/writablestream/">}}WritableStream{{</type-link>}}
  - Returns the writable side of the TCP socket.

- `closed` {{<type>}}`Promise<void>`{{</type>}}
  - This promise is resolved when the socket is closed and is rejected if the socket encounters an error.

- `close()` {{<type>}}`Promise<void>`{{</type>}}
  - Closes the TCP socket. Both the readable and writable streams are forcibly closed.

- {{<code>}}startTls(){{</code>}} : {{<type-link href="/workers/runtime-apis/tcp-sockets/#socket">}}Socket{{</type-link>}}
  - Upgrades an insecure socket to a secure one that uses TLS, returning a new [Socket](/workers/runtime-apis/tcp-sockets#socket). Note that in order to call `startTls()`, you must set [`secureTransport`](/workers/runtime-apis/tcp-sockets/#socketoptions) to `starttls` when initially calling `connect()` to create the socket.

{{</definitions>}}

## Opportunistic TLS (StartTLS)

Many TCP-based systems, including databases and email servers, require that clients use opportunistic TLS (otherwise known as [StartTLS](https://en.wikipedia.org/wiki/Opportunistic_TLS)) when connecting. In this pattern, the client first creates an insecure TCP socket, without TLS, and then upgrades it to a secure TCP socket, that uses TLS. The `connect()` API simplifies this by providing a method, `startTls()`, which returns a new `Socket` instance that uses TLS:

```typescript
import { connect } from "cloudflare:sockets"

const address = {
  hostname: "example-postgres-db.com",
  port: 5432
};
const socket = connect(address, { secureTransport: "starttls" });
const secureSocket = socket.startTls();
```

- `startTls()` can only be called if `secureTransport` is set to `starttls` when creating the initial TCP socket.
- Once `startTls()` is called, the initial socket is closed and can no longer be read from or written to. In the example above, anytime after `startTls()` is called, you would use the newly created `secureSocket`. Any existing readers and writers based off the original socket will no longer work. You must create new readers and writers from the newly created `secureSocket`.
- `startTls()` should only be called once on an existing socket.

## Handle errors

To handle errors when creating a new TCP socket, reading from a socket, or writing to a socket, wrap these calls inside `try..catch` blocks. The following example opens a connection to Google.com, initiates a HTTP request, and returns the response. If any of this fails and throws an exception, it returns a `500` response:

```typescript
import { connect } from 'cloudflare:sockets';
const connectionUrl = { hostname: "google.com", port: 80 };
export interface Env { }
export default {
  async fetch(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    try {
      const socket = connect(connectionUrl);
      const writer = socket.writable.getWriter();
      const encoder = new TextEncoder();
      const encoded = encoder.encode("GET / HTTP/1.0\r\n\r\n");
      await writer.write(encoded);
      
      return new Response(socket.readable, { headers: { "Content-Type": "text/plain" } });
    } catch (error) {
      return new Response(`Socket connection failed: ${error}`, { status: 500 });
    }
  }
};
```

## Close TCP connections

You can close a TCP connection by calling `close()` on the socket. This will close both the readable and writable sides of the socket.

```typescript
import { connect } from "cloudflare:sockets"

const socket = connect({ hostname: "my-url.com", port: 70 });
const reader = socket.readable.getReader();
socket.close();

// After close() is called, you can no longer read from the readable side of the socket
const reader = socket.readable.getReader(); // This fails
```

## Considerations
 
- Outbound TCP sockets to [Cloudflare IP ranges](https://www.cloudflare.com/ips/) are temporarily blocked, but will be re-enabled shortly.
- TCP sockets cannot be created in global scope and shared across requests. You should always create TCP sockets within a handler (ex: [`fetch()`](/workers/get-started/guide/#3-write-code), [`scheduled()`](/workers/runtime-apis/scheduled-event/), [`queue()`](/queues/platform/javascript-apis/#consumer)) or [`alarm()`](/workers/runtime-apis/durable-objects/#alarm-handler-method).
- Each open TCP socket counts towards the maximum number of [open connections](/workers/platform/limits/#simultaneous-open-connections) that can be simultaneously open.
- By default, Workers cannot create outbound TCP connections on port `25` to send email to SMTP mail servers. [Cloudflare Email Workers](/email-routing/email-workers/) provides APIs to process and forward email.

## Troubleshooting

Below is a description of common error messages you may see when working with TCP Sockets, what they mean and how to solve them.

### `proxy request failed, cannot connect to the specified address`

Your socket is connecting to an address that was disallowed. Examples include Cloudflare IPs, localhost, and private network IPs.

If you need to connect to addresses on port 80 or 443 to make HTTP requests, consider instead using `fetch`.

### `TCP Loop detected`

Your socket is connecting back to the Worker that initiated the outbound connection. In other words, it is connecting back to itself. This is currently not supported. Get in touch with us if this is something you require.

### `Connections to port 25 are prohibited`

Your socket is connecting to an address on port 25. This is usually the port used for SMTP mail servers. Workers cannot create outbound connections on port `25`. Consider using [Cloudflare Email Workers](/email-routing/email-workers/) instead.
