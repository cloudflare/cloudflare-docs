---
title: Network Interconnect
pcx_content_type: tutorial
weight: 10
meta:
  title: Network Interconnect and Magic Transit
---

# Network Interconnect and Magic Transit

Cloudflare Network Interconnect (CNI) allows you to connect your network infrastructure directly with Cloudflare – rather than using the public Internet – for a more reliable and secure experience.

Use Cloudflare Network Interconnect with Magic Transit to decrease jitter, drive throughput improvements, and harden infrastructure to attack.

For more information about Network Interconnect, refer to the [Network Interconnect documentation](/network-interconnect/).

## Guidelines

When working with Magic Transit and CNI, observe these guidelines:

- You must implement MSS clamping because Cloudflare Network Interconnect does not support 1500 byte packets.

- Set the MSS clamp size to 1332 bytes to accommodate the additional overhead from the Foo-over-UDP (FOU) protocol and IPv6. These are used to backhaul data from the data center where traffic is ingested — close to the end user — to the facility with the CNI link.

- When Magic Transit egress traffic is enabled, your egress traffic will flow through CNI and out via Cloudflare.
