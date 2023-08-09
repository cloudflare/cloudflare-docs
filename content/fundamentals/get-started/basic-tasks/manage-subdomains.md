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

### Redirect a subdomain to the apex domain

{{<render file="_redirect-subdomain-to-root.md">}}

### Redirect the apex domain to a subdomain

{{<render file="_redirect-root-to-subdomain.md">}}

## SSL/TLS for subdomains

{{<render file="_ssltls-subdomains.md" productFolder="dns" >}}

## Customize subdomain behavior

{{<render file="_subdomain-customization.md" productFolder="dns" >}}
