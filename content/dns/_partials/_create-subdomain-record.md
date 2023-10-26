---
_build:
  publishResources: false
  render: never
  list: never
---

Most subdomains serve a specific purpose within the overall context of your website. For example, `blog.example.com` might be your blog, `support.example.com` could be your customer help portal, and `store.example.com` would be your e-commerce site.

## Subdomain records

To create a new subdomain, you would first add the subdomain content at your host.

Then, you would create a corresponding [`A`, `AAAA`, or `CNAME` record](/dns/manage-dns-records/how-to/create-dns-records/) for that subdomain (`blog`, `store`).

{{<example>}}

| Type | Name  | IPv4 address | Proxy status |
| ---- | ----- | ------------ | ------------ |
| A    | `www` | `192.0.2.1`  | Proxied      |

{{</example>}}