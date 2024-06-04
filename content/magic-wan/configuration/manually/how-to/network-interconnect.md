---
title: Network Interconnect (CNI)
pcx_content_type: concept
weight: 3
meta:
  title: Network Interconnect and Magic WAN
---

# Network Interconnect and Magic WAN

Cloudflare Network Interconnect (CNI) allows you to connect your network infrastructure directly with Cloudflare – rather than using the public Internet – for a more reliable and secure experience. With CNI, you can bring Cloudflare’s full suite of network functions to your physical network edge.

When working with Magic WAN and Cloudflare Network Interconnect (CNI), there are a few guidelines you should follow.

## Express CNI

With Express CNI you can use the Cloudflare dashboard to provision a connection to Cloudflare in three minutes or less. This type of connection supports IP packets with 1500 bytes, both for ingress and egress traffic.

For the time being, Express CNI does not support BGP. You need to create policy-based routes to ensure traffic is routed correctly. You also need to implement tracking of network traffic to ensure that the CNI and Cloudflare data center is functioning properly.

{{Aside type="note"}}Do not use Magic WAN Connector with Express CNI. You can use the Connector with a [Public Peering](/network-interconnect/pni-and-peering/) or a [Private Network Interconnection (PNI)](/network-interconnect/pni-and-peering/) if needed.

## Classic CNI

With Classic CNI you need to [set up an onboarding process](/network-interconnect/classic-cni/) with Cloudflare. There is no self-serving option through the dashboard.

Magic WAN only supports GRE tunnels over CNI. You will need to set your {{<glossary-tooltip term_id="maximum segment size (MSS)">}}MSS clamp{{</glossary-tooltip>}} size to 1476 bytes to accommodate overhead from additional headers. These are used to backhaul data from the data center where traffic is ingested — close to the end user — to the facility with the CNI link.

Magic WAN with Classic CNI does not support BGP for the private encapsulated traffic. You need to create policy-based routes to ensure traffic is routed correctly. Classic CNI does support BGP for the outer GRE packet, and this can be used for re-routing the tunnel over a backup CNI in the event of an issue with the primary.

## Health checks

Bidirectional health checks do not work when you use CNI to onboard your traffic to Cloudflare. You will need to resort to the [legacy health check system](/magic-wan/configuration/manually/how-to/configure-tunnels/#legacy-health-checks-system).
