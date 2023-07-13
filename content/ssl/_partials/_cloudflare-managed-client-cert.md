---
_build:
  publishResources: false
  render: never
  list: never
---

{{<Aside type="warning">}}
By default, API Shield mTLS uses client certificates issued by a Cloudflare Managed CA. Cloudflare generates a unique CA for each account.

If you need to use certificates issued by another CA, you can use the API to [bring your own CA for API Shield mTLS](/ssl/client-certificates/byo-ca-api-shield/).
{{</Aside>}}