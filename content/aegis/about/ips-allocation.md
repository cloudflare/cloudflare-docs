---
title: IPs allocation
pcx_content_type: concept
weight: 2
meta:
  title: Aegis IPs allocation
---

# How Aegis IPs are allocated

Cloudflare Aegis supports both IPv4 and IPv6 addresses.

IPv6 address ranges are deployed globally, meaning your Aegis IPv6 addresses can be used for connections from Cloudflare to your origin servers across all Cloudflare data centers.

For IPv4 addresses, you should work with your account team to choose the locations where each IP should be deployed. Ideally, your Aegis IPv4 addresses should be placed near your origin servers and adjusted to the amount of traffic expected for each region.

{{<Aside type="warning">}}
If you are using [Regional Services](/data-localization/regional-services/), you should take this into consideration when allocating Aegis IPv4. Traffic will egress from the specified locations as long as you have Aegis IPs provisioned in those locations.
{{</Aside>}}

Refer to [connection forwarding](/aegis/about/connection-forwarding/) to understand how requests are processed when reaching different Cloudflare data centers.
