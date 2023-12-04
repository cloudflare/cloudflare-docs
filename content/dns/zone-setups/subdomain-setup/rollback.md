---
pcx_content_type: how-to
title: Rollback
weight: 5
meta:
    title: Rollback subdomain setup
---

# Rollback subdomain setup

Refer to the following process to understand how you can rollback a [subdomain setup](/dns/zone-setups/subdomain-setup/) and recreate the corresponding subdomain DNS records in an existing parent zone within Cloudflare.

## Before you begin

- This guide assumes both your child domain (`blog.example.com`) and its parent domain (`example.com`) are in Cloudflare.
- In the child zone, review and [export](/dns/manage-dns-records/how-to/import-and-export/#export-records) the DNS records.

{{<Aside type="warning" header="Important">}}
This process may incur in downtime, as it is not possible to add address records (`A`/`AAAA`) while still having [corresponding `NS` records at the same name](/dns/manage-dns-records/troubleshooting/existing-ns-record/) within the parent zone.
{{</Aside>}}

## Steps

1. (Optional) In the parent zone, migrate over any settings - [WAF custom rules](/waf/custom-rules/), [Rules](/rules/), [Workers](/workers/), and more - that might be needed for the child domain.
2. (Optional) If necessary, [order an advanced SSL certificate](/ssl/edge-certificates/advanced-certificate-manager/) that covers the child domain and any deeper subdomains.
3. In the parent zone, go to **DNS** > **Records**.
4. Delete one of the `NS` records defined for the child domain.
5. Edit the remaining `NS` record to create the subdomain address record.
6. [Import](/dns/manage-dns-records/how-to/import-and-export/#import-records) the records you had obtained [before you began](#before-you-begin).