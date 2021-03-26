---
order: 1
---

# Quiche HTTP/3 client

Quiche is Cloudflare's own implementation of the QUIC transport protocol and HTTP/3 as specified by the IETF. It contains a simple HTTP/3 client developed and supported by us, and is the easiest way to experiment with our edge QUIC implementation.

## Installing from source

```sh
$ git clone --recursive https://github.com/cloudflare/quiche.git
$ cd quiche/tools/apps
$ cargo build
$ cd target/debug/
```

## Using quiche-client

The quiche-client can be used to issue HTTP/3 requests to a target URL. This will perform the QUIC handshake and if successful issue the request. By default, quiche-client only logs the response body to standard out. You can control log visibility using the RUST_LOG environment variable `e.g. RUST_LOG=info;`. Either export this or pass it directly into the command. `info` level logging contains basic information about interactions. `trace` level logging contains detailed information including transmission (tx) and reception (rx) of QUIC frames; be sure to use this if you encounter any strangeness connecting to a server.

```sh
$ RUST_LOG="info" ./quiche-client https://cloudflare-quic.com
```

You can also try requesting a larger file:

```sh
$ RUST_LOG=info ./quiche-client https://probe.cloudflareboltprobes.com/objects/30k.png
```

## Can I use clients other than quiche?

Yes, our server implementation of HTTP/3 & QUIC has interoperability with a wide range of clients from other projects.
