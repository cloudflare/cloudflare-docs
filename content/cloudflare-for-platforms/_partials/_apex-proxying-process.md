---
_build:
  publishResources: false
  render: never
  list: never
---

With [apex proxying](/cloudflare-for-platforms/cloudflare-for-saas/start/advanced-settings/apex-proxying/), SaaS customers need to create an `A` record for their hostname that points to the IP prefix allocated to the SaaS provider's account.

Note that BYOIP customers will see their IP(s) automatically added to the apex proxying IP set when they're onboarded and should not need to create this record.

```txt
example.com.  60  IN  A   192.0.2.1
```
