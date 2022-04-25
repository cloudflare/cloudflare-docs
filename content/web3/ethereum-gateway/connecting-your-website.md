---
pcx-content-type: tutorial
title: Connecting your Website
weight: 4
---

# Connecting your Website

> To improve our service, the Ethereum gateway has moved to a Private Beta.
> During this period, we are not offering self-provisioning of SSL cerificates.
> You [can register](https://forms.gle/3c2xAzawnDcqWzgN7) to get notified once this service opens up.

You can connect your own domain name to <https://cloudflare-eth.com> to allow
Ethereum network access from your own domain. This means that anyone can send
the HTTP (JSON RPC) queries as given in [Interacting with the Ethereum
Gateway](/web3/ethereum-gateway/interacting-with-the-eth-gateway/)
to your own domain. To do this, you should replace `https://cloudflare-eth.com`
with your domain, e.g. `myethereumgateway.xyz`, as the target of the HTTP
query.
