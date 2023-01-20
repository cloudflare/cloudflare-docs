---
_build:
  publishResources: false
  render: never
  list: never
---

By default, Cloudflare [Universal SSL certificates](/ssl/edge-certificates/universal-ssl/) only cover your root domain and one level of subdomain.

| Hostname | Covered by Universal certificate? |
| --- | --- |
| `example.com` | Yes |
| `www.example.com` | Yes |
| `docs.example.com` | Yes |
| `dev.docs.example.com` | No |
| `test.dev.api.example.com` | No |