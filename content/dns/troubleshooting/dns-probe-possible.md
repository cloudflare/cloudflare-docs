---
title: DNS_PROBE_POSSIBLE
pcx_content_type: troubleshooting
weight: 2
meta:
  title: Fix DNS_PROBE_POSSIBLE
---

# Fix DNS_PROBE_POSSIBLE

If you or your visitors experience `DNS_PROBE_POSSIBLE` errors after you [activate your domain on Cloudflare](/dns/zone-setups/full-setup/setup/), review your DNS records in Cloudflare.

{{<Aside type="note">}}

If your domain is added to Cloudflare by a hosting partner, manage your DNS records via the hosting partner.

{{</Aside>}}

## Background

`DNS_PROBE_POSSIBLE` means that the resolver could not find DNS records for the requested hostname.

Though visitors sometimes encounter this error — or similarly worded messages from Safari, Edge, or Firefox — because of network or local DNS issues, it might point to an issue with your DNS records in Cloudflare.

## Possible solutions

If you experience `DNS_PROBE_POSSIBLE` errors with a newly activated domain, review your DNS settings in the Cloudflare dashboard.

Check your expected root domain (`example.com`) and any active subdomains (`www.example.com` or `blog.example.com`). If they do not resolve correctly, you may need to add a root domain record or a subdomain record in Cloudflare DNS.

If you have the correct records set up, make sure those records are also pointing to the correct origin IP address.

After making changes to your DNS records, you may need to wait a few minutes for those changes to take effect.