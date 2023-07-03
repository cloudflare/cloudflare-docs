---
title: Cloudflare Tunnel
pcx_content_type: reference
---

# Cloudflare Tunnel

Magic WAN can be used together with [Cloudflare Tunnel](/cloudflare-one/connections/connect-apps/#cloudflare-tunnel) for easy access between your networks and applications.

By default, TCP, UDP and ICMP traffic routed through Magic WAN tunnels and destined to routes behind Cloudflare Tunnel will be proxied/filtered through [Cloudflare Gateway](/cloudflare-one/policies/filtering/).

If overlapping routes exist in your Magic WAN and Cloudflare Tunnel routing configurations, Cloudflare Tunnel routes will take precedence. This is true regardless of the health status of your tunnels.

However, if overlapping routes exist in your Magic WAN and Cloudflare Tunnel routing configurations in the default Tunnel `vnet`, outbound connections from within that network will not work. This happens because Cloudflare Tunnel does not support outbound connections.