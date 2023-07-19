---
pcx_content_type: reference
title: Gateway DNS records
weight: 1
---

# Gateway DNS records

Once you [create a gateway](/web3/how-to/manage-gateways/#create-a-gateway), Cloudflare automatically creates and adds records to your Cloudflare DNS so your gateway can receive and route traffic appropriately:

- **Ethereum gateways**: Creates a [proxied](/dns/manage-dns-records/reference/proxied-dns-records/) `CNAME` record pointing your hostname to `ethereum.cloudflare.com`.
- **IPFS gateways**: Creates a [proxied](/dns/manage-dns-records/reference/proxied-dns-records/) `CNAME` record pointing your hostname to `ipfs.cloudflare.com` and a `TXT` record with the value specified for its [DNSLink](/web3/ipfs-gateway/concepts/dnslink/#how-is-it-used-with-cloudflare).
- **Polygon gateways**: Creates a [proxied](/dns/manage-dns-records/reference/proxied-dns-records/) `CNAME` record pointing your hostname to `polygon.cloudflare.com`.

These records cannot be edited within Cloudflare DNS. To make edits, you will have to [edit the gateway configuration](/web3/how-to/manage-gateways/#edit-a-gateway) itself.

## Existing DNS records

When you [create a gateway](/web3/how-to/manage-gateways/#create-a-gateway) using a hostname with pre-existing DNS records, Cloudflare automatically overwrites your existing records to make them apply to your Web3 gateway.