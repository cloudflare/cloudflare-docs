---
pcx_content_type: reference
title: Manage subdomains
weight: 3
---

# Manage subdomains

Once you have [added your domain to Cloudflare](/fundamentals/get-started/setup/add-site/) and [updated your nameservers](/dns/zone-setups/full-setup/), you also might want to set up a subdomain.

Most subdomains serve a specific purpose within the overall context of your website. For example, `blog.example.com` might be your blog, `support.example.com` could be your customer help portal, and `store.example.com` would be your e-commerce site.

## Create a subdomain

If you have already added a subdomain at your host, create a corresponding [DNS A or CNAME record](/dns/manage-dns-records/how-to/create-dns-records/) for that subdomain (`blog`, `store`).

## Set up redirects

### Redirect a subdomain to root domain

Sometimes, you might want to create a subdomain (`www.example.com`) that simply redirects traffic to your root domain (`example.com`).

1.  Create a [proxied DNS A record](/dns/manage-dns-records/how-to/create-dns-records/) for your subdomain. This record can point to any IP address since all traffic will be redirected prior to reaching the address.

    | **Type** | **Name** | **IPv4 address** | **Proxy status** |
    | -------- | -------- | ---------------- | ---------------- |
    | A        | `www`    | `192.0.2.1`      | Proxied          |

2.  Use [Bulk redirects](/rules/bulk-redirects/) to forward traffic from your subdomain to your root domain. You will likely want to include **Subpath matching** and **Preserve path suffix** to ensure requests to `www.example.com/examples` go to `example.com/examples`.

    | **Source URL**    | **Target URL**        | **Status** | **Selected parameters**                       |
    | ----------------- | --------------------- | ---------- | --------------------------------------------- |
    | `www.example.com` | `https://example.com` | 301        | _Subpath matching_ and _Preserve path suffix_ |

### Redirect root domain to a subdomain

Sometimes, you might want all traffic to your root domain (`example.com`) to actually go to a subdomain (`www.example.com`).

1.  If you have already added that subdomain at your host, create a corresponding [DNS A or CNAME record](/dns/manage-dns-records/how-to/create-dns-records/) for that subdomain.

2.  Create a proxied DNS A record for your root domain. This record can point to any IP address since all traffic will be redirected prior to reaching the address.

    | **Type** | **Name** | **IPv4 address** | **Proxy status** |
    | -------- | -------- | ---------------- | ---------------- |
    | A        | `@`      | `192.0.2.1`      | Proxied          |

3.  Use [Bulk redirects](/rules/bulk-redirects/) to forward traffic from your root domain to your subdomain. You will likely want to include **Subpath matching** and **Preserve path suffix** to ensure requests to `example.com/examples` go to `www.example.com/examples`.

    | **Source URL** | **Target URL**            | **Status** | **Selected parameters**                       |
    | -------------- | ------------------------- | ---------- | --------------------------------------------- |
    | `example.com`  | `https://www.example.com` | 301        | _Subpath matching_ and _Preserve path suffix_ |

## SSL/TLS for subdomains

{{<render file="../../dns/_partials/_ssltls-subdomains.md">}}

## Customize subdomain behavior

{{<render file="../../dns/_partials/_subdomain-customization.md">}}
