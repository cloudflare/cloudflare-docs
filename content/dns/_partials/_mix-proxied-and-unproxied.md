---
_build:
  publishResources: false
  render: never
  list: never
---

{{<Aside type="warning">}}

Note that if you have multiple `A/AAAA` records on the same name and at least one of them is proxied, Cloudflare will respond queries with the proxied address and the unproxied record will not be returned.

{{</Aside>}}