---
order: 3
---

# Curl + Quiche

Homebrew formula for curl + quiche to easily build and test HTTP/3 on MacOS.

## Requirements

Install homebrew from [brew.sh](https://brew.sh).

## Build

This will replace your current curl installation.
Run the following commands to install required dependencies and to build curl with quiche support.

- Uninstall curl if you already have:

  ```sh
  $ brew remove -f curl
  ```

- Build curl with quiche:

  ```sh
  $ brew install -s https://raw.githubusercontent.com/cloudflare/homebrew-cloudflare/master/curl.rb
  ```

At the end curl binary will be installed on "/usr/local/opt/curl/bin",
so you need to add to your $PATH

Check if curl with H3 support is built properly:

```sh
$ curl --help | egrep 'alt-svc|http3'
    --alt-svc <file name> Enable alt-svc with this cache file
    --http3         Use HTTP v3
```

Now, you can try curl on any H3 enabled sites.

```sh
$ curl --http3 https://cloudflare-quic.com
$ curl --http3 https://blog.cloudflare.com
```
