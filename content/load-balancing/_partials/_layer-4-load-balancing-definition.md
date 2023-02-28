---
_build:
  publishResources: false
  render: never
  list: never
---

Layer 4 load balancers route traffic by forwarding traffic to certain ports or IP addresses.

Cloudflare currently only supports layer 4 load balancing as part of [Cloudflare Spectrum](/spectrum/about/load-balancer/).

{{<Aside type="note">}}

Since Spectrum operates at the TCP level, it does not have the information to support features like [session affinity](/load-balancing/understand-basics/session-affinity/), [custom rules](/load-balancing/additional-options/load-balancing-rules/), or caching.

{{</Aside>}}