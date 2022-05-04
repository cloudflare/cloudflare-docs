---
pcx-content-type: how-to
title: Curl + Quiche
---

# Curl + Quiche

Follow the guidelines below to build and test HTTP/3 on MacOS.

## Requirements

Install homebrew from [brew.sh](https://brew.sh).

## Build

This process replaces your current curl installation. Run the following commands to install required dependencies and build curl with quiche support.

### Uninstall curl

```sh
$ brew remove -f curl
```

### Build curl with quiche

```sh
$ curl -O https://raw.githubusercontent.com/cloudflare/homebrew-cloudflare/master/curl.rb
$ brew install --HEAD -s curl.rb
```

When the build is finished, curl binary will be installed on `/usr/local/opt/curl/bin`. You will need to add to your `$PATH`.

### Verify curl with H3 support built properly

```sh
$ curl -V | egrep -i 'alt-svc|http3'
Features: __alt-svc__ AsynchDNS brotli HSTS HTTP2 __HTTP3__ HTTPS-proxy IDN IPv6 Largefile libz NTLM NTLM_WB PSL SSL UnixSockets zstd
```

Try curl on any HTTP/3 enabled sites using the commands below.

```sh
$ curl --http3 https://cloudflare-quic.com
$ curl --http3 https://blog.cloudflare.com
```
