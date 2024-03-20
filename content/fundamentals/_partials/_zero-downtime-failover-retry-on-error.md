---
_build:
  publishResources: false
  render: never
  list: never
---

Zero-downtime failover will trigger a single retry only if there is another healthy origin in the origin pool and a [521, 522, or 523 error code](/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-5xx-errors/#error-521-web-server-is-down) is occuring. No other error codes will trigger a zero-downtime failover operation.