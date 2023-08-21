---
pcx_content_type: reference
title: Redirect one domain to another
weight: 4
---

# Redirect one domain to another

If you have an alias domain that only forwards traffic to another domain, you can set up redirects directly within Cloudflare.

1. [Add](/fundamentals/get-started/basic-tasks/manage-domains/#add-a-domain-to-cloudflare) your alias domain (for example, `previous.com`) to Cloudflare.

2. Make sure that your alias domain has a proxied [DNS A or CNAME record](/dns/manage-dns-records/how-to/create-dns-records/) that properly resolves DNS queries. You may also want to include a record for the `www` subdomain.

    | **Type** | **Name** | **IPv4 address** | **Proxy status** |
    | -------- | -------- | ---------------- | ---------------- |
    | A        | `@`      | `192.0.2.1`      | Proxied          |
    | A        | `www`    | `192.0.2.1`      | Proxied          |

3. Use [Bulk redirects](/rules/url-forwarding/bulk-redirects/) to forward traffic from your alias domain to your other domain. Select **Include subdomains** and **Subpath matching** to cover your entire alias domain (for example, `www.previous.com` and `www.previous.com/examples`).

    | **Source URL** | **Target URL**    | **Status** | **Selected parameters**                     |
    | -------------- | ----------------- | ---------- | ------------------------------------------- |
    | `previous.com` | `https://new.com` | 301        | _Include subdomains_ and _Subpath matching_ |
