---
_build:
  publishResources: false
  render: never
  list: never
---

If you have another *A* or *AAAA* record in your Cloudflare **DNS** or your Cloudflare **Load Balancer** provides another origin in the same pool, **Zero-Downtime Failover** automatically retries requests to your origin even before a Load Balancing decision is made.

Zero-downtime failover will trigger a single retry only if there is another healthy origin in the origin pool and a [521, 522, or 523 error code](/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-5xx-errors/#error-521-web-server-is-down) is occuring. No other error codes will trigger a zero-downtime failover operation.