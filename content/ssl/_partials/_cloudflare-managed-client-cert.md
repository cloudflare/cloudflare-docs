---
_build:
  publishResources: false
  render: never
  list: never
---

{{<Aside type="warning" header="Important">}}
You can only use API Shield with a certificate authority (CA) that is fully managed by Cloudflare. Cloudflare generates a unique CA for each account.

If you need to use certificates issued by another CA, use [Cloudflare Access](/cloudflare-one/identity/devices/access-integrations/mutual-tls-authentication/) to upload your own CA.
{{</Aside>}}