---
title: Prerequisites
pcx_content_type: tutorial
weight: 3
---

# Prerequisites

Before you can begin using Magic Transit, verify that you meet Cloudflare's onboarding requirements.

{{<render file="_prerequisites-routercompat-letterauth-irr.md">}}

{{<render file="_maximum-segment-size.md" withParameters="/magic-transit/static/mss-values-and-packet.png;;Magic Transit;;To accommodate the additional header data, you must set the MSS value to 1436 bytes at your physical egress interfaces — not the tunnel interfaces. For Magic Transit egress traffic, the MSS should be set via the tunnel’s interface for egress traffic.">}}

{{<render file="_max-segment-ipsec-clamp-aside.md">}}

{{<render file="_clear-dont-fragment.md">}}

{{<render file="_router-vendor-guidelines-mss-settings-origin.md" withParameters="Run the following command on the servers egressing the prefixes you want to add to Magic Transit to verify that your routers have the correct MSS setting (1436 bytes) at your origin.">}}
