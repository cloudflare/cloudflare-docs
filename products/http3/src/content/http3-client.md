---
order: 1
---

# Quiche HTTP/3 client

Quiche is Cloudflare's own implementation of the QUIC transport protocol and HTTP/3 as specified by the IETF. It contains a simple HTTP/3 client developed and supported by us, and is the easiest way to experiment with our edge QUIC implementation.

## Installing from source

```sh
$ git clone --recursive https://github.com/cloudflare/quiche.git
$ cd quiche
$ cargo build --examples
$ cd target/debug/examples
```

## Using the quiche http3-client

The quiche http3-client can be used to issue HTTP/3 requests to a target URL. This will perform the QUIC handshake and if successful issue the request. By default, http3-client only logs the response body to standard out. You can control log visibility using the RUST_LOG environment variable `e.g. RUST_LOG=info;` either export this or pass it directly into the command. The info log level shows some basic information about interactions, trace shows a lot of information including transmission (tx) and reception (rx) of QUIC frames.

```sh
$ RUST_LOG="info" ./http3-client https://cloudflare-quic.com
```

You can also try requesting a larger file:

```sh
$ RUST_LOG=info ./http3-client https://probe.cloudflareboltprobes.com/objects/30k.png
```

## Can I use clients other than quiche?

Yes, users can use HTTP/3 clients from other companies. Our server implementation of HTTP/3 & QUIC has no affinity or dependency on the client.
