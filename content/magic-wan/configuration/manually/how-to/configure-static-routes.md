---
title: Configure static routes
pcx_content_type: how-to
weight: 2
meta:
    description: Magic WAN uses a static configuration to route your traffic through anycast tunnels from Cloudflare’s global network to your locations.
---


{{<render file="static-routes/_static-routes1.md" productFolder="magic-transit" withParameters="Magic WAN;;/magic-wan/reference/tunnels/;;/magic-wan/reference/traffic-steering/;;The maximum number of routes you can have with the same priority is 64.">}}

{{<render file="static-routes/_static-routes3.md" productFolder="magic-transit" withParameters="**Magic WAN** > **Configuration**;;/magic-wan/configuration/manually/how-to/configure-tunnels/;;When using Magic WAN and Cloudflare Tunnel together, remember to consider the IP ranges utilized in the static routes of Cloudflare Tunnel when selecting static routes for Magic WAN. For more information, refer to [Cloudflare Tunnel](/magic-wan/zero-trust/cloudflare-tunnel/).<br><br>">}}