---
_build:
  publishResources: false
  render: never
  list: never
---

{{<Aside type="warning">}}

Client certificates are validated by a CA set on account level. This means that (a) if you [bring your own CA](/ssl/client-certificates/byo-ca-api-shield/), you can associate it with hosts in different zones and, (b) if you use Cloudflare Managed CA, this is the default behaviour. Client certificates can be shared like this as long as the zones are under the same account.

{{</Aside>}}