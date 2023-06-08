---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: param1
---

{{<Aside type="note">}}

When you [add records to Cloudflare DNS](/dns/manage-dns-records/how-to/create-dns-records/), those records should be [DNS-only (unproxied)](/dns/manage-dns-records/reference/proxied-dns-records/#dns-only-records) until $1 verifies your domain. Then, you can switch your DNS records to **Proxied**.

{{</Aside>}}