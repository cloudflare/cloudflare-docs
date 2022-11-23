---
pcx_content_type: how-to
title: Use IPFS gateway
weight: 2
---

# Use the IPFS gateway

Once you have an IPFS gateway — meaning that you [create a new gateway](/web3/how-to/manage-gateways/#create-a-gateway) with a `target` of **IPFS** — you can get data from the IPFS network by using a URL.

## Read from the network

Every time you access a piece of content through Cloudflare's IPFS Gateway, you need a URL with two parts: the gateway hostname and the request path.

### Gateway hostname

Your gateway hostname will be the **Hostname** value you supplied when you [created the gateway](/web3/how-to/manage-gateways/#create-a-gateway).

### Request path

The request path will vary based on the type of content you are serving.

If a request path is `/ipfs/<CID_HASH>`, that tells the gateway that you want the content with the Content Identifier (CID) that immediately follows. Because the content is addressed by CID, the gateway's response is immutable and will never change. An example would be `https://cloudflare-ipfs.com/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/wiki/`, which is a mirror of Wikipedia and an immutable `/ipfs/` link.

If a request path is `/ipns/<DOMAIN>`, that tells the gateway that you want it to lookup the CID associated with a given domain in DNS and then serve whatever content corresponds to the CID it happens to find. Because DNS can change over time, so will the gateway's response. An example would be `https://cloudflare-ipfs.com/ipns/ipfs.tech/`, which is IPFS's marketing site and can be changed at any time by modifying the [DNSLink record](/web3/ipfs-gateway/concepts/dnslink/) associated with the `ipfs.tech` domain.

## Write to the network

Cloudflare's IPFS Gateway is currently limited to read-only access.