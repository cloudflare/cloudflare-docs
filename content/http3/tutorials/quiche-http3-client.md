---
pcx-content-type: configuration
---

# Quiche HTTP/3 client

Quiche is Cloudflare's own implementation of the QUIC transport protocol and HTTP/3 as specified by the IETF. It contains a simple HTTP/3 client developed and supported by Cloudflare and it is the easiest way to experiment with our edge QUIC implementation. You can use clients other than quiche because Cloudflare's server implementation of HTTP/3 and QUIC has interoperability with a wide range of clients from other projects.

## Install from source

```sh
$ git clone --recursive https://github.com/cloudflare/quiche.git
$ cd quiche/tools/apps
$ cargo build
$ cd target/debug/
```

## Use quiche-client

The quiche-client can be used to issue HTTP/3 requests to a target URL. This will perform the QUIC handshake and, if successful, issue the request. By default, quiche-client only logs the response body to standard out. You can control log visibility using the RUST\_LOG environment variable `e.g. RUST_LOG=info;`, which you can export pass directly into the command. `info` level logging contains basic information about interactions. `trace` level logging contains detailed information including transmission (tx) and reception (rx) of QUIC frames. Be sure to use these logging options if you encounter any issues connecting to a server.

```sh
$ RUST_LOG="info" ./quiche-client https://cloudflare-quic.com
```

You can also try requesting a larger file.

```sh
$ RUST_LOG=info ./quiche-client https://probe.cloudflareboltprobes.com/objects/30k.png
```
