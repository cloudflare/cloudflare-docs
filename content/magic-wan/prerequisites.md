---
title: Prerequisites
pcx_content_type: reference
weight: 2
---

# Prerequisites

Before you can begin using Magic WAN, verify that you meet Cloudflare's onboarding requirements.

## Use compatible tunnel endpoint routers

Magic WAN relies [on GRE](/magic-wan/reference/tunnels/) and [IPsec tunnels](/magic-wan/reference/tunnels/#ipsec-tunnels) to transmit packets from Cloudflare’s global network to your origin network. To ensure compatibility with Magic WAN, the routers at your tunnel endpoints must:

- Allow configuration of at least one tunnel per Internet service provider (ISP).
- Support maximum segment size (MSS) clamping.
- Support the configuration parameters for IPsec mentioned in [GRE and IPsec tunnels](/magic-wan/reference/tunnels/#supported-configuration-parameters).

{{<render file="_maximum-segment-size.md" productFolder="magic-transit" withParameters="Magic WAN;;To accommodate the additional header data, **you must set the MSS value to 1436 bytes at your tunnel interfaces** (not the physical interfaces).">}}

{{<render file="_router-vendor-guidelines-mss-settings-origin.md" productFolder="magic-transit">}}
