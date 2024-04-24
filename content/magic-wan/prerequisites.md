---
title: Prerequisites
pcx_content_type: reference
weight: 2
---

# Prerequisites

Magic WAN is an Enterprise-only product. [Contact Cloudflare](https://www.cloudflare.com/magic-wan/) to acquire Magic WAN. If you plan on using Magic WAN Connector to automatically onboard your locations to Cloudflare, you will need to purchase Magic WAN first.

The preferred way to onboard your network locations to Cloudflare One is through [Magic WAN Connector](/magic-wan/configuration/connector/). The list of prerequisites below is only for customers planning to connect manually to Cloudflare with a third-party device.

## Use compatible tunnel endpoint routers

Magic WAN relies on {{<glossary-tooltip term_id="GRE tunnel" link="/magic-wan/reference/tunnels/">}}GRE{{</glossary-tooltip>}} and {{<glossary-tooltip term_id="IPsec tunnel" link="/magic-wan/reference/tunnels/#ipsec-tunnels">}}IPsec tunnels{{</glossary-tooltip>}} to transmit packets from Cloudflare’s global network to your origin network. To ensure compatibility with Magic WAN, the routers at your tunnel endpoints must:

- Allow configuration of at least one tunnel per Internet service provider (ISP).
- Support {{<glossary-tooltip term_id="maximum segment size (MSS)">}}maximum segment size (MSS){{</glossary-tooltip>}} clamping.
- Support the configuration parameters for IPsec mentioned in [IPsec tunnels](/magic-wan/reference/tunnels/#supported-configuration-parameters).

{{<render file="prerequisites/_maximum-segment-size.md" productFolder="magic-transit" withParameters="Magic WAN;;To accommodate the additional header data, **you must set the MSS value to 1436 bytes at your tunnel interfaces** (not the physical interfaces).">}}

{{<render file="prerequisites/_router-vendor-guidelines-mss-settings-origin.md" productFolder="magic-transit">}}
