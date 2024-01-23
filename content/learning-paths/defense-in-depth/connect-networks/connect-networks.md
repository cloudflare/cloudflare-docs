---
title: Connect networks to Cloudflare
pcx_content_type: overview
weight: 1
layout: learning-unit
---

Similar to the network onboarding practices in the Replace Your VPN documentation, there are a number of ways to ‘on-ramp’ your network traffic to the Cloudflare edge. In this context, you will be sourcing traffic from devices that would otherwise go to the Internet through a default route. Relevant targets for this may be branch offices, network subnets that need a secure path to the Internet, or anywhere that you control the Internet paths for groups of machines. The two primary ways to source multi-device traffic to the Cloudflare network is by using Magic WAN or the WARP Connector.
