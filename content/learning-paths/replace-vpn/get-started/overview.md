---
title: Overview
pcx_content_type: overview
weight: 1
layout: learning-unit
---

In this learning path, you will learn how to replace your existing VPN provider with Cloudflare Zero Trust product components. Your users will run the WARP endpoint client on their devices, and you will run either Cloudflare Tunnel or Cloudflare WARP Connector in your network or on your application servers. After deploying Zero Trust, users will be able to connect to private resources (not exposed to the Internet) via TCP/UDP/ICMP, and administrators will be able to control access to these resources based on user identity, device posture, and other factors.

![How Cloudflare connects a user device to a private network application](/images/reference-architecture/cloudflare-one-reference-architecture-images/cf1-ref-arch-10.svg)

This guide will highlight best practices to follow and other decisions to consider when planning your deployment. Additionally, each module will include links to the key resources and how-to pages needed to get your deployment up and running.

{{<Aside type="note">}}
This learning path focuses on client-based remote access to internal services. If you are looking for clientless or Zero Trust Web Access functionality, refer to our [Deploy Zero Trust Web Access](/learning-paths/zero-trust-web-access/) learning path.
{{</Aside>}}
