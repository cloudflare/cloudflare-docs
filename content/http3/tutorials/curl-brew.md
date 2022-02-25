---
pcx-content-type: how-to
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
$ curl --help all | egrep 'alt-svc|http3'
    --alt-svc <file name> Enable alt-svc with this cache file
    --http3         Use HTTP v3
```

Try curl on any HTTP/3 enabled sites using the commands below.

```sh
$ curl --http3 https://cloudflare-quic.com
$ curl --http3 https://blog.cloudflare.com
```
