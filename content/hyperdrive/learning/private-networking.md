---
pcx_content_type: concept
title: Private network connectivity
weight: 5
---

# Private network connectivity

Hyperdrive can connect to databases that are not reachable over the public Internet through native integrations with [Cloudflare Tunnel]() and [Magic WAN]() (IPSec and GRE).

## Set up private networking

There are two

### cloudflared

TODO - intro, link to cloudflared docs, etc

For example, if `cloudflared` is running on the same machine as your database server, and your databaes is listening on `127.0.0.1` (loopback/localhost), then you should create a tunnel and add a route as follows:

```sh
$ cloudflared tunnel create hyperdrive-example
$ cloudflared tunnel route ip add 127.0.0.0/32
```

If you are running a proxy instance and/or your database is listening on a non-local port, you will need to add a route to the IP address your database is listening on. The machine `cloudflared` is running on should be able to route to that address.

You will need to set `warp-routing` to `true`:

```toml
---
filename: tunnel/config/here
---

tunnel: 59d5cec5-4a16-4301-8421-5e166ffb8333
credentials-file: /Users/malonso/.cloudflared/59d5cec5-4a16-4301-8421-5e166ffb8333.json
warp-routing:
    enabled: true
```

Create a Hyperdrive configuration that connects to that endpoint:

```sh
$ npx wrangler hyperdrive create private-hyperdrive --private-network --connection-string="postgres://user:password@IP_ADDRESS:PORT/database_name"
```


### Magic WAN

You can use [Magic WAN](/magic-wan/) to connect to existing networks, including VPC networks in legacy cloud providers and on-prem, over IPSec (VPN) or GRE tunnels.

1. Set up Magic WAN
2. Establish an IPSec or GRE tunnel between Magic WAN and the remote network(s).
3. Validate that you can reach the IP address of your database over Magic WAN.

Once you have done this, you can set up Hyperdrive...

## Next steps

- Refer to the list of [supported database integrations](/workers/databases/connecting-to-databases/) to understand other ways to connect to existing databases.
- Learn more about how to use the [Socket API](/workers/runtime-apis/tcp-sockets) in a Worker.
- Understand the [protocols supported by Workers](/workers/reference/protocols/).
