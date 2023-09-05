---
title: Cloudflare Tunnel
pcx_content_type: reference
---

# Cloudflare Tunnel

Magic WAN can be used together with [Cloudflare Tunnel](/cloudflare-one/connections/connect-networks/) for easy access between your networks and applications.

By default, TCP, UDP, and ICMP traffic routed through Magic WAN tunnels and destined to routes behind Cloudflare Tunnel will be proxied/filtered through [Cloudflare Gateway](/cloudflare-one/policies/gateway/).

If you have overlapping routes in your Magic WAN and Cloudflare Tunnel routing configurations, Cloudflare Tunnel routes will take precedence. This is true regardless of the [health status of your tunnels](/magic-wan/reference/probe-construction/#health-state-and-prioritization).

However, if you have overlapping routes in your Magic WAN and Cloudflare Tunnel routing configurations in the default [Tunnel virtual network](/cloudflare-one/connections/connect-networks/private-net/tunnel-virtual-networks/), outbound connections from within that network will not work. This happens because Cloudflare Tunnel does not support outbound connections.