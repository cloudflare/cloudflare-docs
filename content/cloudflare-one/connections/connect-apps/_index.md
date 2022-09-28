---
pcx_content_type: concept
title: Cloudflare Tunnel
weight: 1
layout: single
---

# Cloudflare Tunnel

Cloudflare Tunnel provides you with a secure way to connect your resources to Cloudflare without a publicly routable IP address. With Tunnel, you do not send traffic to an external IP — instead, a lightweight daemon in your infrastructure (`cloudflared`) creates outbound-only connections to Cloudflare’s edge. Cloudflare Tunnel can connect HTTP web servers, [SSH servers](/cloudflare-one/connections/connect-apps/use_cases/ssh/), [remote desktops](/cloudflare-one/connections/connect-apps/use_cases/rdp/), and other protocols safely to Cloudflare. This way, your origins can serve traffic through Cloudflare without being vulnerable to attacks that bypass Cloudflare.

## How it works

Cloudflared establishes outbound connections (tunnels) between your resources and the Cloudflare edge. Tunnels are persistent objects that route traffic to DNS records. Within the same tunnel, you can run as many `cloudflared` processes (connectors) as needed. These processes will establish connections to the Cloudflare edge and send traffic to the nearest Cloudflare data center.

![How an HTTP request reaches a resource connected with Cloudflare Tunnel](/cloudflare-one/static/documentation/connections/connect-apps/handshake.jpg)