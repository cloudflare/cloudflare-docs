---
title: Configure tunnel endpoints
pcx_content_type: how-to
weight: 1
meta:
    description: Cloudflare recommends two tunnels for each ISP and network location router combination, one per Cloudflare endpoint. Learn how to configure IPsec or GRE tunnels.
---

{{<render file="_tunnel-endpoints.md" productFolder="magic-transit" withParameters="`169.254.244.0/20` (this address space is also a [link-local address](https://en.wikipedia.org/wiki/Link-local_address));;Magic WAN;;**Magic WAN** > **Manage Magic WAN configuration** > **Configure**;;/magic-wan/reference/ipsec/">}}

## Next steps

Now that you have set up your tunnel endpoints, you need to configure [static routes](/magic-wan/get-started/configure-static-routes/) to route your traffic through Cloudflare