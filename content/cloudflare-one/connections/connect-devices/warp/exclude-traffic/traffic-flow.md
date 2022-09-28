---
pcx_content_type: reference
layout: list
title: Traffic flow (concept)
weight: 1
---

# Traffic flow from WARP to Tunnel

When you send traffic from WARP through a Cloudflare Tunnel, Cloudflare evaluates each request and routes it according to the following traffic flow.

<div class="mermaid">
flowchart TD
A[WARP User requests resource] --> B[WARP Agent catches DNS request by running local DNS proxy]
B -- Domain does not match Local Domain Fallback --> C{CF resolves query according to Gateway DNS policies}
B -- Domain matches Local Domain Fallback --> D["WARP Agent proxies DNS traffic to specified or default IP resolver (likely home ISP)"]
D -- Resolver IP included in Split Tunnel configuration --> E[Query sent via WARP transit tunnel to be resolved]
D -- Resolver IP not included in Split Tunnel configuration --> F{Query sent to resolver IP outside WARP agent} 
E -- Matches CF Gateway block policy --> G{Traffic blocked by CF}
E -- "Passes CF Gateway network policies (allowed or unblocked)" --> H[Evaluated by Cloudflare Tunnel routes]
H -- Tunnel routes do not include resolver IP --> I{CF Gateway proxies query to resolver IP via normal WARP egress route}
H -- Tunnel routes include resolver IP --> J[Cloudflare Tunnel advertises route that includes Resolver IP]
J --> K[Traffic sent via Cloudflared Tunnel to private resolver IP and resolution returned to Cloudflare]
K --> L{Traffic transits WARP and user connects to application}
</div>