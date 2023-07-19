---
title: Get the Roughtime
pcx_content_type: how-to
weight: 2
meta:
  title: Get the Roughtime from Cloudflare
---

# Get the Roughtime

The "Hello, world!" of Roughtime is very simple: the client sends a request over UDP to the server and the server responds with a signed timestamp.

You just need the server's address and public key to run the protocol:

- **Server address**: `roughtime.cloudflare.com:2002` (resolves to an IP address in our [anycast IP range](https://www.cloudflare.com/learning/cdn/glossary/anycast-network/)). You can use either IPv4 or IPv6.
- **Public key**: `gD63hSj3ScS+wuOeGrubXlq35N1c5Lby/S+T7MNTjxo=`

To get started, download and run Cloudflare's [Go client](https://github.com/cloudflare/roughtime):

```go
go get -u github.com/cloudflare/roughtime
go install github.com/cloudflare/roughtime...
getroughtime -ping roughtime.cloudflare.com:2002 -pubkey gD63hSj3ScS+wuOeGrubXlq35N1c5Lby/S+T7MNTjxo=
```

## Beta notice

Cloudflare Roughtime is currently in beta. As such, our root public key may
change in the future. We will keep this page up-to-date with the most current public key. 

You can also obtain it programmatically using DNS. For example:

```sh
$ dig TXT roughtime.cloudflare.com | grep -oP 'TXT\s"\K.*?(?=")'
```

## Next steps

Beyond just getting the Roughtime from Cloudflare, you may want to use it to [keep your clock in sync](/time-services/roughtime/recipes/).