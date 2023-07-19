---
pcx_content_type: concept
title: Universal Path gateway
weight: 5
---

# Universal Path gateway

When you set up a Universal Path gateway — a gateway without a *DNSLink* record — you are creating an unrestricted gateway that allows users to access any content hosted on the IPFS network.

This differs from a [restricted gateway](/web3/ipfs-gateway/concepts/dnslink/), which restricts the gateway to a particular piece of content (either a specific Content Identifier (CID) or an Interplanetary Name Service (IPNS) hostname).

## How is it used with Cloudflare?

You can add a Universal Path gateway just as you would [create any gateway](/web3/how-to/manage-gateways/).

Likely, you will also want to add items to the [gateway blocklist](/web3/how-to/manage-gateways/#update-blocklist), which allows you to block content access through the Universal Path gateway for one or more:

- CIDs (`QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB`)
- IPFS content (`/ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG/readme`)
- IPNS content paths (`/ipns/example.com`)

{{<Aside type="note">}}

This feature is limited to specific plans. For more detail, refer to [Limits](/web3/reference/limits/).

{{</Aside>}}