---
pcx-content-type: concept
title: IPFS Pinning
weight: 3
---

# IPFS Pinning

To free up storage space, the [IPFS](/web3/concepts/ipfs/) periodically deletes data that it no longer needs from IPFS nodes. 

An IPFS node can protect data from this process — known as garbage collection — by **pinning** data. Pinning tells IPRS to always keep a given object somewhere (by default, on the current node).

There are also pinning services to pin data, enabling the data to persist in IPFS without the user running
IPFS nodes of their own for pinning. Cloudflare does not currently support pinning natively, but we recommend [Pinata](https://docs.pinata.cloud/) as a pinning service.

## Open vs restricted

When you set up an IPFS gateway, you can choose whether your gateway should be open or restricted.

In both cases, anyone can access the content served by your gateway (so long as they have the link). However, a restricted gateway will only serve pinned content.

An open gateway, by contrast, serves any content available (not just pinned content). This setting promotes wide accessibility, but can lead to higher usage costs and potentially include malicious content.