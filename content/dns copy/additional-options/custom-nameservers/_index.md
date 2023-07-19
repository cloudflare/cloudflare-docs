---
pcx_content_type: concept
title: Custom nameservers
weight: 2
layout: single
---

# Custom nameservers

With custom (or vanity) nameservers, a domain can use Cloudflare DNS without using Cloudflare branded nameservers. For instance, you can configure `ns1.example.com` and `ns2.example.com` as nameservers for `example.com`.

## Configuration scope

{{<directory-listing showDescriptions=true char_limit=400 >}}

## Availability

- Zone custom nameservers are available for zones on Business or Enterprise plans. Via API or on the Dashboard.
- Account custom nameservers are available for zones on Business (after [contacting Cloudflare Support](/support/troubleshooting/general-troubleshooting/contacting-cloudflare-support/)) or Enterprise plans. Via API only.
- Tenant custom nameservers, if created by the tenant owner, will be available to any account that is part of the tenant. Via API only.

## Restrictions

Custom nameservers are organized in different sets (`ns_set`). Each namesever set must have at least two and no more than five custom nameserver names.