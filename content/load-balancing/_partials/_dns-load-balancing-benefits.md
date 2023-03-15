---
_build:
  publishResources: false
  render: never
  list: never
---

If your load balancer is attached to a hostname used for an [`MX` or `SRV` record](/load-balancing/additional-options/additional-dns-records/) — and not an `A`, `AAAA`, or `CNAME` record — its proxy mode should be **DNS-only**.