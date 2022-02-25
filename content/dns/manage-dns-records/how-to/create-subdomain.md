---
pcx-content-type: reference
title: Create a subdomain
weight: 3
---

# Create a subdomain

Most subdomains serve a specific purpose within the overall context of your website. For example, `blog.example.com` might be your blog, `support.example.com` could be your customer help portal, and `store.example.com` would be your e-commerce site.

## Subdomain records

To create a new subdomain, you would first add the subdomain content at your host.

Then, you would create a corresponding [A, AAAA, or CNAME record](/dns/manage-dns-records/how-to/create-dns-records/) for that subdomain (`blog`, `store`).

{{<example>}}

| Type | Name | IPv4 address | Proxy status |
| --- | --- | --- | --- |
| A | `www` | `192.0.2.1`| Proxied |

{{</example>}}

## Subdomain redirects

For more guidance on redirecting a subdomain — either to your main domain or another location — refer to [Set up subdomain redirects](/fundamentals/get-started/basic-tasks/manage-subdomains#set-up-redirects).

## SSL/TLS for subdomains

If your main domain is using Cloudflare's [Universal SSL certificate](/ssl/edge-certificates/universal-ssl), that certificate also covers all first-level subdomains (`blog.example.com`).

For deeper subdomains (`dev.blog.example.com`), use a [different type of certificate](/ssl/edge-certificates/universal-ssl/limitations#full-setup).

## Customize subdomain behavior

If you want to customize Cloudflare settings for individual subdomains, your approach will vary depending on your plan.

Enterprise customers can set up custom settings and access for a specific subdomain within Cloudflare with [Subdomain support](https://support.cloudflare.com/hc/articles/360026440252).

All other customers can set up subdomain-specific [Page Rules](https://support.cloudflare.com/hc/articles/218411427) to alter Cloudflare settings.

If you want a subdomain's DNS settings managed totally outside of Cloudflare — meaning this subdomain can be managed by individuals without access to your Cloudflare account — refer to [Delegating subdomains outside of Cloudflare](https://support.cloudflare.com/hc/articles/360021357131).
