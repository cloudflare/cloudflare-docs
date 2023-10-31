---
_build:
  publishResources: false
  render: never
  list: never
---

{{<Aside type="warning">}}
Gateway ignores trailing forward slashes (`/`) in URLs. For example, `https://example.com` and `https://example.com/` will count as the same URL and may return a duplicate error.
{{</Aside>}}
