---
pcx-content-type: concept
title: DNSLink
weight: 4
---

# DNSLink

When you upload anything to the [IPFS](/web3/ipfs-gateway/concepts/ipfs/), that item gets a unique content identifier (CID) similar to `QmdbaSQbGU6Wo9i5LyWWVLuU8g6WrYpWh2K4Li4QuuE8Fr`.

Such a long CID can cause issues when you want others to be able to access a website hosted over IPFS (`https://cloudflare-ipfs.com/ipfs/QmdbaSQbGU6Wo9i5LyWWVLuU8g6WrYpWh2K4Li4QuuE8Fr`). It is a similar problem to websites in general, where end users would have difficulty remembering an IP address (`192.0.2.1`) instead of a domain name (`google.com`).

The problem is solved the same way, via a DNS record. To make a website hosted over IPFS more accessible, you can put your entire website inside of a directory and create a **DNSLink** record for that CID. End users can then make requests to a URL like `https://cloudflare-ipfs.com/ipns/index.html` and have their requests translated to the correct CID in the background.

DNSLink records also help with content maintenance. When a new version of your website is ready to be published, you can update your DNSLink DNS record to point to the new CID and the gateway will start serving the new version automatically.