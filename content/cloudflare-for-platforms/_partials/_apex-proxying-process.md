---
_build:
  publishResources: false
  render: never
  list: never
---

With [apex proxying](/cloudflare-for-platforms/cloudflare-for-saas/start/advanced-settings/apex-proxying/), SaaS customers need to create an `A` record for their hostname that points to the IP prefix allocated to the SaaS provider's account.

```txt
example.com.  60  IN  A   192.0.2.1
```

{{<Aside type="note">}}

For [BYOIP](/byoip/) customers, Cloudflare automatically adds your IP(s) automatically to the apex proxying IP set during onboarding.

{{</Aside>}}