---
title: Prerequisites
pcx_content_type: reference
weight: 2
---

# Prerequisites

Before you can begin using Magic WAN, verify that you meet Cloudflare's onboarding requirements. 

{{<Aside type="note">}}Skip the list of prerequisites below if you use [Magic WAN Connector](/magic-wan/connector/) to onboard your network locations to Cloudflare.{{</Aside>}}

## Use compatible tunnel endpoint routers

Magic WAN relies on {{<glossary-tooltip term_id="GRE tunnel" link="/magic-wan/reference/tunnels/">}}GRE{{</glossary-tooltip>}} and {{<glossary-tooltip term_id="IPsec tunnel" link="/magic-wan/reference/tunnels/#ipsec-tunnels">}}IPsec tunnels{{</glossary-tooltip>}} to transmit packets from Cloudflare’s global network to your origin network. To ensure compatibility with Magic WAN, the routers at your tunnel endpoints must:

- Allow configuration of at least one tunnel per Internet service provider (ISP).
- Support {{<glossary-tooltip term_id="maximum segment size (MSS)">}}maximum segment size (MSS){{</glossary-tooltip>}} clamping.
- Support the configuration parameters for IPsec mentioned in [IPsec tunnels](/magic-wan/reference/tunnels/#supported-configuration-parameters).

{{<render file="_maximum-segment-size.md" productFolder="magic-transit" withParameters="Magic WAN;;To accommodate the additional header data, **you must set the MSS value to 1436 bytes at your tunnel interfaces** (not the physical interfaces).">}}

{{<render file="_router-vendor-guidelines-mss-settings-origin.md" productFolder="magic-transit">}}
