---
pcx-content-type: reference
title: Create root domain
weight: 3
---

# Create a root domain record

When you add a domain to Cloudflare, you may also need to create a DNS record for your root domain (`example.com`).

To do this, you would create a corresponding [`A`, `AAAA`, or `CNAME` record](/dns/manage-dns-records/how-to/create-dns-records/) for your root domain (specified by using `@` for the **Name**).

{{<example>}}

| Type | Name  | IPv4 address | Proxy status |
| ---- | ----- | ------------ | ------------ |
| A    | `@` | `192.0.2.1`  | Proxied      |

{{</example>}}

## Domain redirects

Once you create a domain, you may want to route that traffic to other places.

For more guidance, refer to [Redirect domain to subdomain](/fundamentals/get-started/basic-tasks/manage-subdomains/#redirect-root-domain-to-a-subdomain) or [Redirect one domain to another](/fundamentals/get-started/basic-tasks/manage-domains/#redirect-one-domain-to-another).

## Get free SSL certificates

Cloudflare offers free, unshared, publicy trusted [Universal SSL certificates](/ssl/edge-certificates/universal-ssl/) to all Cloudflare domains.