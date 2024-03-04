---
title: About
pcx_content_type: concept
weight: 2
meta:
  title: About Cloudlfare Network Interconnect
---

# About Cloudlfare Network Interconnect

Cloudflare supports a variety of options to connect your network to Cloudflare:

- Enterprise Network Interconnect (ENI) for Magic WAN and Magic Transit
- Classic Network Interconnect for Magic Transit (Classic CNI)
- Cloud Network Interconnect (Cloud CNI) for Magic WAN and Magic Transit
- Peering via either an internet exchange, or a private network interconnect (PNI).

Below is a brief overview of the options to help you decide which method best fits your network.

Network Interconnect Mode | Use cases | Capabilities
--- | --- | ---
Enterprise Network Interconnect (ENI) | Use for Magic WAN and/or Magic Transit, interconnecting directly with on-premises locations. |  &#x2022; 1, 10, 100 Gbps <br>  &#x2022; Available at ENI capable Cloudflare edge locations <br>  &#x2022; No tunnel required <br>  &#x2022; Self-service via Dashboard in less than 3 minutes
Classic Network Interconnect (Classic CNI) | Use for Magic Transit, interconnecting directly or virtually (via a partner) with on-premises locations. |  &#x2022; 10, 100 Gbps <br>  &#x2022; Available at classic CNI capable Cloudflare edge locations <br>  &#x2022; Overlay GRE tunnel required for egress <br>  &#x2022; BGP route reflector signaling <br>  &#x2022; Contact Implementation Manager
Cloud Network Interconnect (Cloud CNI) | Use for Magic WAN and/or Magic Transit, interconnecting directly with major cloud service provider virtual networks / VPCs. |  &#x2022; Speed depends on cloud provider <br>  &#x2022; Available at Cloud CNI capable Cloudflare edge locations <br>  &#x2022; Contact Implementation Manager
Peering, or private network interconnect (PNI) | Use for connecting your users to any Cloudflare services, via a more direct, performant and potentially cost-effective network path. |  &#x2022; Speed depends on IX or PNI <br>  &#x2022; Available at PNI capable Cloudflare edge locations (PNI) and any Internet Exchange (IX) where Cloudflare peer today. <br>  &#x2022; Contact [peering@cloudflare.com](peering@cloudflare.com)