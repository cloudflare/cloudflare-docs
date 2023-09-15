---
pcx_content_type: concept
title: Subdomain setup
weight: 3
layout: single
---

# Subdomain setup

When you use a subdomain setup, you can manage the Cloudflare settings for one or more subdomains separately from those associated with your apex domain.

![Screenshot showing a zone with a parent domain and a child subdomain](/images/dns/subdomain-zone.png)

You might use this when you want to share **access** to a specific subdomain's settings with different teams, but have stricter controls on your apex domain. For example, this setup could allow your documentation team to manage the Cloudflare settings for `docs.example.com`, while preventing them from adjusting any settings on `example.com`.

Subdomain setups are also useful when different subdomains require entirely different settings. For example, you may have different requirements for `docs.example.com`, `blog.example.com`, and `community.example.com` (as well as different teams that need to manage the settings independently).

## How to

{{<directory-listing>}}

## Availability

{{<feature-table id="dns.subdomain_setup">}}

## Notes

If the parent domain's SSL/TLS certificate explicitly lists the child subdomain and is created after the child subdomain's SSL/TLS certificate, the parent domain's certificate will take precedence over the child domain's certificate.

For example, if `example.com` [created an advanced certificate](/ssl/edge-certificates/advanced-certificate-manager/manage-certificates/) that directly listed `docs.example.com`, visitors to `docs.example.com` might see the SSL/TLS certificate for `example.com`.