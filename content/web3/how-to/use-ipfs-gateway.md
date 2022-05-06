---
pcx-content-type: how-to
title: Use IPFS Gateway
weight: 2
---

# Use the IPFS Gateway

Once you [create a new IPFS Gateway](/web3/how-to/manage-gateways/#create-a-gateway), you can get data from the IPFS network by using a URL.

## Reading from the network

Every time you access a piece of content through Cloudflare's IPFS Gateway, you need a URL with two parts: the gateway hostname and the request path.

If you are using the Cloudflare IPFS Gateway, your gateway hostname will be `cloudflare-ipfs.com` and the request path will vary based on the type of content you are serving.

If a request path is `/ipfs/<CID_HASH>`, that tells the gateway that you want the content with the CID that immediately follows. Because the content is addressed by CID, the gateway's response is immutable and will never change. An example would be https://cloudflare-ipfs.com/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/wiki/, which is a mirror of Wikipedia and an immutable `/ipfs/` link.

If a request path is `/ipns/<DOMAIN>`, that tells the gateway that you want it to lookup the CID associated with a given domain in DNS and then serve whatever content corresponds to the CID it happens to find. Because DNS can change over time, so will the gateway's response. An example would be https://cloudflare-ipfs.com/ipns/ipfs.io/, which is IPFS's marketing site and can be changed at any time by modifying the [DNSLink record](/web3/ipfs-gateway/concepts/dnslink/) associated with the `ipfs.io` domain.

## Writing to the network

Cloudflare's IPFS Gateway is currently limited to read-only access.