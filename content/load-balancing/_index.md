---
title: Overview
pcx_content_type: overview
weight: 1
meta:
  title: Cloudflare Load Balancing
---

# Cloudflare Load Balancing

Cloudflare Load Balancing allows you to distribute traffic across your servers, which reduces server strain and latency and improves the experience for end users.

## Benefits

Cloudflare Load Balancing provides several benefits:

*   **Load balancing and failover**: Distribute traffic evenly across your healthy servers, automatically failing over when a server is unhealthy or unresponsive.
*   **Active health checks**: Monitor your servers at configurable intervals and across multiple data centers to look for specific status codes, response text, and timeouts.
*   **Intelligent routing**: Choose whether to distribute requests based on server latency, a visitor's geographic region, or even a visitor's GPS coordinates.
*   **Customized setup**: Create custom rules (or reuse monitors and pools across multiple load balancers) to adjust routing according to the characteristics of each request.

{{<Aside type="note" header="Note">}}

If you are only interested in monitoring server health — and not in distributing traffic according to server health — check out our [standalone Health Checks](https://support.cloudflare.com/hc/articles/4404867308429).

{{</Aside>}}

## Availability

Cloudflare Load Balancing is available as an add-on feature for any type of account. The exact number of load balancers, origin servers, and monitors depend on your plan type.

## Next steps

{{<button-group>}}
  {{<button type="primary" href="/load-balancing/get-started/">}}Get started{{</button>}}
  {{<button type="secondary" href="/load-balancing/understand-basics/">}}Learn more{{</button>}}
{{</button-group>}}
