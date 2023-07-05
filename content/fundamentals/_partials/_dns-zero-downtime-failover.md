---
_build:
  publishResources: false
  render: never
  list: never
---

If you have another *A* or *AAAA* record in your Cloudflare **DNS** or your Cloudflare **Load Balancer** provides another origin in the same pool, **Zero-Downtime Failover** automatically retries requests to your origin even before a Load Balancing decision is made.

Cloudflare currently retries only once for HTTP [521](/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-5xx-errors/#error-521-web-server-is-down), [522](/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-5xx-errors/#error-522-connection-timed-out), and [523](/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-5xx-errors/#error-523-origin-is-unreachable) response codes.
