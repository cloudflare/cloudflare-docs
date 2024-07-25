---
title: Network Interconnect (CNI)
pcx_content_type: concept
weight: 10
meta:
  title: Network Interconnect and Magic Transit
---

# Network Interconnect and Magic Transit

Cloudflare Network Interconnect (CNI) allows you to connect your network infrastructure directly with Cloudflare – rather than using the public Internet – for a more reliable and secure experience. With CNI, you can bring Cloudflare’s full suite of network functions to your physical network edge.

Use Cloudflare Network Interconnect with Magic Transit to improve throughput and harden infrastructure to attack.

## Guidelines

When working with Magic Transit and CNI, there are a few guidelines you should follow.

### Express CNI

With [Express CNI](/network-interconnect/express-cni/) you can use the Cloudflare dashboard to provision a connection to Cloudflare in three minutes or less. This type of connection supports IP packets with 1,500 bytes, both for ingress and egress traffic.

For the time being, Express CNI does not support BGP. If your use case calls for BGP anycast prefix withdrawal or BGP based connection failover, you need to use [Classic CNI](/network-interconnect/classic-cni/) with a Magic Transit GRE tunnel.

### Classic CNI

With Classic CNI you need to [set up an onboarding process](/network-interconnect/classic-cni/) with Cloudflare. There is no self-serving option through the dashboard.

With Classic CNI, you can create:
- **GRE tunnels over CNI**: For ingress and egress traffic. You will need to set your MSS clamp size to 1,476 bytes to accommodate overhead from additional headers. These are used to backhaul data from the data center where traffic is ingested — close to the end user — to the facility with the CNI link.
- **CNI connections without GRE tunnels**: For ingress traffic from Cloudflare to customer device. There is no need to set {{<glossary-tooltip term_id="maximum segment size (MSS)">}}MSS clamping{{</glossary-tooltip>}}, as this supports IP packets with 1,500 bytes.

For more information about Network Interconnect, refer to the [Cloudflare Network Interconnect documentation](/network-interconnect/).