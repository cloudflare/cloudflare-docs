---
pcx_content_type: reference
title: Create zone apex record
weight: 3
---

# Create a record on your zone apex

When you add a domain to Cloudflare, you may also need to create a DNS record on your zone apex (`example.com`).

To do this, create a corresponding [`A`, `AAAA`, or `CNAME` record](/dns/manage-dns-records/how-to/create-dns-records/) using `@` for the **Name**.

{{<example>}}

| Type | Name  | IPv4 address | Proxy status |
| ---- | ----- | ------------ | ------------ |
| A    | `@` | `192.0.2.1`  | Proxied      |

{{</example>}}

## Domain redirects

Once you create a domain, you may want to route that traffic to other places.

For more guidance, refer to [Redirect domain to subdomain](/fundamentals/get-started/basic-tasks/manage-subdomains/#redirect-the-apex-domain-to-a-subdomain) or [Redirect one domain to another](/fundamentals/get-started/basic-tasks/manage-domains/redirect-domain/).

## Get free SSL certificates

Cloudflare offers free, unshared, publicy trusted [Universal SSL certificates](/ssl/edge-certificates/universal-ssl/) to all Cloudflare domains.