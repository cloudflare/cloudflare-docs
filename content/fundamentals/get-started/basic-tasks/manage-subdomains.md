---
pcx-content-type: reference
title: Manage subdomains
weight: 2
---

# Manage subdomains

Once you have [added your domain to Cloudflare](https://support.cloudflare.com/hc/articles/201720164#2YulMb5YJTVnMxgAgNWdS2) and [updated your nameservers](/dns/zone-setups/full-setup), you also might want to set up a subdomain.

Most subdomains serve a specific purpose within the overall context of your website. For example, `blog.example.com` might be your blog, `support.example.com` could be your customer help portal, and `store.example.com` would be your e-commerce site.

## Create a subdomain

If you have already added a subdomain at your host, create a corresponding [DNS A or CNAME record](/dns/manage-dns-records/how-to/create-dns-records) for that subdomain (`blog`, `store`).

## Set up redirects

### Redirect a subdomain to root domain

Sometimes, you might want to create a subdomain (`www.example.com`) that simply redirects traffic to your root domain (`example.com`).

1.  Create a [proxied DNS A record](/dns/manage-dns-records/how-to/create-dns-records) for your subdomain. This record can point to any IP address since all traffic will be redirected prior to reaching the address.

         {{<example>}}

    | **Type** | **Name** | **IPv4 address** | **Proxy status** |
    | -------- | -------- | ---------------- | ---------------- |
    | A        | `www`    | `192.0.2.1`      | Proxied          |

         {{</example>}}

2.  Use [Bulk redirects](/rules/bulk-redirects) to forward traffic from your subdomain to your root domain. You will likely want to include **Subpath matching** and **Preserve path suffix** to ensure requests to `www.example.com/examples` go to `example.com/examples`.

         {{<example>}}

    | **Source URL**    | **Target URL**        | **Status** | **Selected parameters**                       |
    | ----------------- | --------------------- | ---------- | --------------------------------------------- |
    | `www.example.com` | `https://example.com` | 301        | _Subpath matching_ and _Preserve path suffix_ |

         {{</example>}}

### Redirect root domain to a subdomain

Sometimes, you might want all traffic to your root domain (`example.com`) to actually go to a subdomain (`www.example.com`).

1.  If you have already added that subdomain at your host, create a corresponding [DNS A or CNAME record](/dns/manage-dns-records/how-to/create-dns-records) for that subdomain.

2.  Create a proxied DNS A record for your root domain. This record can point to any IP address since all traffic will be redirected prior to reaching the address.

         {{<example>}}

    | **Type** | **Name** | **IPv4 address** | **Proxy status** |
    | -------- | -------- | ---------------- | ---------------- |
    | A        | `@`      | `192.0.2.1`      | Proxied          |

         {{</example>}}

3.  Use [Bulk redirects](/rules/bulk-redirects) to forward traffic from your root domain to your subdomain. You will likely want to include **Subpath matching** and **Preserve path suffix** to ensure requests to `example.com/examples` go to `www.example.com/examples`.

         {{<example>}}

    | **Source URL** | **Target URL**            | **Status** | **Selected parameters**                       |
    | -------------- | ------------------------- | ---------- | --------------------------------------------- |
    | `example.com`  | `https://www.example.com` | 301        | _Subpath matching_ and _Preserve path suffix_ |

         {{</example>}}

## SSL/TLS for subdomains

If your main domain is using Cloudflare's [Universal SSL certificate](/ssl/edge-certificates/universal-ssl), that certificate also covers all first-level subdomains (`blog.example.com`).

For deeper subdomains (`dev.blog.example.com`), use a [different type of certificate](/ssl/edge-certificates/universal-ssl/limitations#full-setup).

## Customize subdomain behavior

If you want to customize Cloudflare settings for individual subdomains, your approach will vary depending on your plan.

Enterprise customers can set up custom settings and access for a specific subdomain within Cloudflare with [Subdomain support](https://support.cloudflare.com/hc/articles/360026440252).

All other customers can set up subdomain-specific [Page Rules](https://support.cloudflare.com/hc/articles/218411427) to alter Cloudflare settings.

If you want a subdomain's DNS settings managed totally outside of Cloudflare — meaning this subdomain can be managed by individuals without access to your Cloudflare account — refer to [Delegating subdomains outside of Cloudflare](https://support.cloudflare.com/hc/articles/360021357131).
