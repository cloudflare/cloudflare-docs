---
pcx_content_type: concept
title: Custom nameservers
weight: 4
---

# Custom nameservers

With custom (or vanity) nameservers, a domain can use Cloudflare DNS without using Cloudflare-branded nameservers. For instance, you can configure `ns1.example.com` and `ns2.example.com` as nameservers for `example.com`.

To use custom nameservers, a zone must be using Cloudflare as [Primary (Full setup)](/dns/zone-setups/full-setup/) or [Secondary](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/) DNS provider.

## Configuration scope

{{<directory-listing showDescriptions=true char_limit=400 >}}

## Availability

- Zone custom nameservers are available for zones on Business or Enterprise plans. Via API or on the dashboard.
- Account custom nameservers are available for customers on Business (after [contacting Cloudflare Support](/support/contacting-cloudflare-support/)) or Enterprise plans. Once configured, account custom nameservers can be used by all zones in the account, regardless of the zone plan. Via API only.
- Tenant custom nameservers, if created by the tenant owner, will be available to all zones belonging to any account that is part of the tenant. Via API only.

## Restrictions

Custom nameservers are organized in different sets (`ns_set`). Each namesever set must have at least two and no more than five custom nameserver names.