---
pcx_content_type: how-to
title: Configure tunnel endpoints
weight: 1
meta:
    description: Cloudflare recommends two tunnels for each ISP and network location router combination, one per Cloudflare endpoint. Learn how to configure IPsec or GRE tunnels.
---



{{<render file="_tunnel-endpoints.md" withParameters="`169.254.244.0/20`;;Magic Transit;;**Magic Transit** > **Manage Magic Transit configuration** > **Configure**;;/magic-transit/reference/ipsec/">}}


## Next steps

Now that you have set up your tunnel endpoints, you need to configure [static routes](/magic-transit/how-to/configure-static-routes/) to route your traffic through Cloudflare