---
_build:
  publishResources: false
  render: never
  list: never
---

{{<Aside type="warning">}}

Note that if you have multiple `A/AAAA` records on the same name and at least one of them is proxied, Cloudflare will treat all `A/AAAA` records on this name as being proxied.

{{</Aside>}}