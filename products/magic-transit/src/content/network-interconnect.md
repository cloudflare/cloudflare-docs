---
title: Network Interconnect
order: 3
pcx-content-type: tutorial
---

# Network Interconnect and Magic Transit

Cloudflare Network Interconnect (CNI) allows you to connect your network infrastructure directly with Cloudflare – rather than using the public Internet – for a more reliable and secure experience.

Use Cloudflare Network Interconnect with Magic Transit to decrease jitter, drive throughput improvements, and harden infrastructure to attack.

For more information about Network Interconnect, refer to the [Network Interconnect documentation](https://developers.cloudflare.com/network-interconnect/).

## Guidelines

When working with Magic Transit and CNI, observe these guidelines:

- You must implement MSS clamping because Cloudflare Network Interconnect does not support 1500 byte packets.

- Set the MSS clamp size to 1332 bytes to accommodate the additional overhead from the Foo-over-UDP (FOU) protocol and IPv6. These are used to backhaul data from the data center where traffic is ingested — close to the end user — to the facility with the CNI link.

- Cloudflare Network Interconnect does not process outgoing traffic from your data centers. Egress traffic returns to end users through direct server return (DSR) not through Cloudflare. For this reason, CNI cannot replace your existing transit providers.
