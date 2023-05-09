---
pcx_content_type: concept
title: Custom nameservers
weight: 2
---

# Custom nameservers

With custom (or vanity) nameservers, a domain can use Cloudflare DNS without using the hostnames of Cloudflare-assigned nameservers. For instance, you can configure `ns1.example.com` and `ns2.example.com` as nameservers for `example.com`.

{{<Aside type="note">}}

When using [subdomain support](/dns/zone-setups/subdomain-setup/), a parent and child zone cannot share the same nameserver names.

{{</Aside>}}

## Configuration scope

{{<directory-listing showDescriptions=true char_limit=300 >}}

## Availability

Cloudflare domains on Business or Enterprise plans can set Custom Nameservers at Cloudflare:

- Enterprise plans:
  - Create account-level nameservers via the [API](/api/operations/account-level-custom-nameservers-list-account-custom-nameservers)
  - Create zone-level nameservers via the dashboard or [API](/api/operations/zone-edit-zone)
- Business plans:
  - Create account-level nameservers via the [API](/api/operations/account-level-custom-nameservers-add-account-custom-nameserver) (after [contacting Cloudflare Support](https://support.cloudflare.com/hc/articles/200172476))
  - Create zone-level nameservers via the dashboard or [API](/api/operations/zone-edit-zone)

## Restrictions

For both account-level and zone-level custom nameservers, you have to configure at least two custom nameservers and no more than five.