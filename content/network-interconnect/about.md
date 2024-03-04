---
title: About
pcx_content_type: concept
weight: 2
meta:
  title: About Cloudlfare Network Interconnect
---

# About Cloudflare Network Interconnect

Cloudflare supports a variety of options to connect your network to Cloudflare:

- Enterprise Network Interconnect (ENI) for Magic WAN and Magic Transit.
- Classic Network Interconnect for Magic Transit (Classic CNI).
- Cloud Network Interconnect (Cloud CNI) for Magic WAN and Magic Transit.
- Peering via either an internet exchange, or a private network interconnect (PNI).

Below is a brief overview of the options to help you decide which method best fits your network.

Network interconnect mode | Use cases | Capabilities
--- | --- | ---
[Enterprise Network Interconnect (ENI)](/network-interconnect/enterprise-network-interconnect/) | Use for Magic WAN and/or Magic Transit, interconnecting directly with on-premises locations. |  - 1, 10, 100 Gbps <br>  - Available at ENI capable Cloudflare edge locations <br>  - No tunnel required <br>  - Self-service via Dashboard in less than 3 minutes
[Classic Network Interconnect (Classic CNI)](/network-interconnect/classic-network-interconnect/) | Use for Magic Transit, interconnecting directly or virtually (via a partner) with on-premises locations. |  - 10, 100 Gbps <br>  - Available at classic CNI capable Cloudflare edge locations <br>  - Overlay GRE tunnel required for egress <br>  - BGP route reflector signaling <br>  - Contact Implementation Manager
[Cloud Network Interconnect (Cloud CNI)](/network-interconnect/cloud-network-interconnect/) | Use for Magic WAN and/or Magic Transit, interconnecting directly with major cloud service provider virtual networks / VPCs. |  - Speed depends on cloud provider <br>  - Available at Cloud CNI capable Cloudflare edge locations <br>  - Contact Implementation Manager
Peering, or private network interconnect (PNI) | Use for connecting your users to any Cloudflare services, via a more direct, performant and potentially cost-effective network path. |  - Speed depends on IX or PNI <br>  - Available at PNI capable Cloudflare edge locations (PNI) and any Internet Exchange (IX) where Cloudflare peer today. <br>  - Contact `peering@cloudflare.com`