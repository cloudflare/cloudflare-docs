---
pcx_content_type: reference
title: Legacy gateway migration
weight: 4
---

# Legacy gateway migration

As announced in [our blog post](https://blog.cloudflare.com/ea-web3-gateways/), Cloudflare is deprecating our legacy gateway endpoints at `cloudflare-eth.com` and `cloudflare-ipfs.com`.

If you were using one of these gateways during the [private beta](https://blog.cloudflare.com/announcing-web3-gateways/), you should migrate to use our new Web3 gateways to avoid a disruption in service.

---

## Migration guide

The migration is a simple, three-step process:

1. Create a [Cloudflare account](/learning-paths/get-started/#account-setup).
2. Create a new [Web3 custom gateway](/web3/how-to/manage-gateways/#create-a-gateway).
3. Modify your application to use your newly created hostname ([IPFS](/web3/how-to/use-ipfs-gateway/) or [Ethereum](/web3/how-to/use-ethereum-gateway/)).