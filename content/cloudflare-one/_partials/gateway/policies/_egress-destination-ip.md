---
_build:
  publishResources: false
  render: never
  list: never
---

| Policy name                 | Selector       | Operator | Value             | Egress method                   |
| --------------------------- | -------------- | -------- | ----------------- | ------------------------------- |
| Access third-party provider | Destination IP | is       | `198.51.100.158` | Dedicated Cloudflare egress IPs |

| Primary IPv4 address | IPv6 address    |
| -------------------- | --------------- |
| `203.0.113.88`       | `2001:db8::/32` |
