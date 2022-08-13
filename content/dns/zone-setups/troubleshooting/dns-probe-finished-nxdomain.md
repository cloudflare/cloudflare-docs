---
title: DNS_PROBE_FINISHED_NXDOMAIN
pcx_content_type: reference
weight: 2
meta:
  title: DNS_PROBE_FINISHED_NXDOMAIN - Troubleshooting zone setups
---

# DNS_PROBE_FINISHED_NXDOMAIN

If you or your visitors experience `DNS_PROBE_FINISHED_NXDOMAIN` errors after you [activate your domain on Cloudflare](/dns/zone-setups/full-setup/setup/), review your DNS records in Cloudflare.

{{<Aside type="note">}}

If your domain is added to Cloudflare by a hosting partner, manage your DNS records via the hosting partner.

{{</Aside>}}

## Background

`DNS_PROBE_FINISHED` means that the DNS request for a resource timed out and `NXDOMAIN` stands for non-existent domain. Together, these messages mean that the DNS query for a specific resource could not locate an associated domain.

Though visitors sometimes encounter this error — or similarly worded messages from Safari, Edge, or Firefox — because of network or local DNS issues, it might point to an issue with your DNS records in Cloudflare.

## Potential solutions

If you experience `DNS_PROBE_FINISHED_NXDOMAIN` errors with a newly activated domain, review your DNS settings in the Cloudflare dashboard.

Check your expected root domain (`example.com`) and any active subdomains (`www.example.com` or `blog.example.com`). If they do not resolve correctly, you may need to add a [root domain record](/dns/manage-dns-records/how-to/create-root-domain/) or a [subdomain record](/dns/manage-dns-records/how-to/create-subdomain/) in Cloudflare DNS.

If you have the correct records set up, make sure those records are also pointing to the correct origin IP address.

After making changes to your DNS records, you may need to wait a few minutes for those changes to take effect.

{{<Aside type="note">}}

For additional troubleshooting help, refer to our [Community troubleshooting guide](https://community.cloudflare.com/t/community-tip-fixing-the-dns-probe-finished-nxdomain-error/42818).

{{</Aside>}}
