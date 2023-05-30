---
pcx_content_type: concept
title: Custom nameservers
weight: 2
---

# Custom nameservers

With custom (or vanity) nameservers, a domain can use Cloudflare DNS without using Cloudflare branded nameservers. For instance, you can configure `ns1.example.com` and `ns2.example.com` as nameservers for `example.com`.

## Configuration scope

{{<directory-listing showDescriptions=true char_limit=300 >}}

## Availability

- Zone-level custom nameservers are available for zones on Business or Enterprise plans. Via API or on the Dashboard.
- Account-level custom  nameservers are available for zones on Business (after [contacting Cloudflare Support](https://support.cloudflare.com/hc/articles/200172476)) or Enterprise plans. Via API only.
- Tenant-level custom nameservers, if created by the tenant owner, will be available to any account that is part of the tenant. Via API only.

## Restrictions

For all levels of custom nameservers, you have to configure at least two and no more than five custom nameserver names per nameserver set.