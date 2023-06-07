---
pcx_content_type: reference
title: Legacy gateway migration
weight: 4
---

# Legacy gateway migration

As announced in [our blog post](https://blog.cloudflare.com/ea-web3-gateways/), Cloudflare is deprecating legacy hostnames that point to our public gateway endpoints at `cloudflare-eth.com` and `cloudflare-ipfs.com`.

If you created a hostname pointing to these gateways during the [private beta](https://blog.cloudflare.com/announcing-web3-gateways/), you should migrate to use our new Web3 gateways to avoid a disruption in service.

---

## Migration guide

The migration is a simple process.

First, create a [Cloudflare account](/fundamentals/account-and-billing/account-setup/create-account/).

Then create a new [Web3 custom gateway](/web3/how-to/manage-gateways/#create-a-gateway) with your existing hostname.

Alternatively, you could also create a [Web3 custom gateway](/web3/how-to/manage-gateways/#create-a-gateway) for a new hostname and then modify your application to use your newly created hostname ([IPFS](/web3/how-to/use-ipfs-gateway/) or [Ethereum](/web3/how-to/use-ethereum-gateway/)).
