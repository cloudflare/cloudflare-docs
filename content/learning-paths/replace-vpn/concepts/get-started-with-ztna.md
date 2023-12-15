---
title: Get started with ZTNA
pcx_content_type: overview
weight: 7
layout: learning-unit
---

In the remaining modules, you will learn how to replace your existing VPN provider with Cloudflare Zero Trust product components. Your users will run the WARP endpoint client on their devices, and you will run either Cloudflare Tunnel or the Cloudflare WARP Connector in your network or on your application servers. By the end of this module, users will be able to connect to private resources (not exposed to the Internet) via TCP/UDP/ICMP and your administrators will be able to layer policy to set rules based on identity, device posture, and other factors.

![How ZTNA connects a user device to a private network application](/images/cloudflare-one/zero-trust-security/ztna-overview.png)

{{<Aside type="note">}}
This module focuses explicitly on client-based remote access to internal services. If you are looking for clientless or Zero Trust Web Access functionality, refer to our Zero Trust Web Applications (ZTWA) learning path.
{{</Aside>}}

## Prerequisites

To make the most of this implementation guide, make sure that you have the following:

- A device that can run [WARP](/cloudflare-one/connections/connect-devices/warp/download-warp/), Cloudflare's endpoint agent.
- A private network with applications or services that are available locally or via a VPN.
- A host server that can run the lightweight Cloudflare Tunnel daemon process, connect to the Internet on the [required ports](/cloudflare-one/connections/connect-networks/deploy-tunnels/tunnel-with-firewall/), and connect locally to the private network applications.
- (Optional) A [Linux host server](/cloudflare-one/connections/connect-devices/warp/download-warp/#linux) that can run the Cloudflare WARP Connector, requisite for server-initiated traffic flows, SCCM, AD updates, and devops workflows.