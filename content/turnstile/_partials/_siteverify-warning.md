---
_build:
  publishResources: false
  render: never
  list: never
---

{{<Aside type="warning" header="Warning">}}
It is critical to enforce Turnstile tokens with the siteverify API. The Turnstile token could be invalid, expired, or already redeemed. Not verifying the token will leave major vulnerabilities in your implementation.
{{</Aside>}}