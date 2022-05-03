---
pcx-content-type: concept
title: DNSLink
weight: 3
---

# DNSLink

When you upload anything to the [IPFS](/web3/gateways/concepts/ipfs/), that item gets a unique content identifier (CID) similar to `QmdbaSQbGU6Wo9i5LyWWVLuU8g6WrYpWh2K4Li4QuuE8Fr`. 

That content identifier might be fine for a picture or other asset used internally, but it can cause issues if you want others to be able to access a website hosted over IPFS (`https://cloudflare-ipfs.com/ipfs/QmdbaSQbGU6Wo9i5LyWWVLuU8g6WrYpWh2K4Li4QuuE8Fr` would be difficult to remember). It's a similar problem to remembering an IP address (`192.0.2.1`) instead of a domain name (`google.com`).

The problem is solved the same way, via a DNS record. To make a website hosted over IPFS more accesible, you can put your entire website insides of a directory and create a DNSLink record for that CID. 

This way, when a gateway gets a request for `https://example.com/index.html`, the
gateway can lookup the CID of the directory from example.com's DNS and then
serve the file `index.html` from that directory. When a new version is ready to
be published, the site owner updates their DNSLink DNS record to contain the new
CID and the gateway will start serving the new version automatically.