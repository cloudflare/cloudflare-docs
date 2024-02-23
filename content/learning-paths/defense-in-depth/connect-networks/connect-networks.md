---
title: Connect networks to Cloudflare
pcx_content_type: learning-unit
weight: 1
layout: learning-unit
---

Similar to the network onboarding practices in the [Replace your VPN](/learning-paths/replace-vpn/connect-devices/) implementation guide, there are a number of ways to on-ramp your network traffic to the Cloudflare global network. In this context, you will source traffic from devices that would otherwise go to the Internet through a default route. Relevant targets for this may be branch offices, network subnets that need a secure path to the Internet, or anywhere that you control the Internet paths for groups of machines. The three primary ways to source multi-device traffic to the Cloudflare network is by using upstream DNS for a whole network (forwarding DNS queries to the Cloudflare Gateway resolver from your router or firewall), Magic WAN, and the WARP Connector (for all-ports traffic proxy).

Next, you will learn how to decide which network on-ramp to use.
