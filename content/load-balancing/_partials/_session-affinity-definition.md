---
_build:
  publishResources: false
  render: never
  list: never
---

When you enable session affinity, your load balancer directs all requests from a particular end user to a specific origin server. This continuity preserves information about the user session — such as items in their shopping cart — that might otherwise be lost if requests were spread out among multiple servers.

Session affinity can also help reduce network requests, leading to savings for customers with usage-based billing.

{{<Aside type="warning" header="Important">}}

Cloudflare only supports cookie-based session affinity. Other methods, such as TCP session affinity, are not supported.

{{</Aside>}}