---
pcx_content_type: how-to
title: Rollback
weight: 5
meta:
    title: Rollback NS delegation
---

# Rollback NS delegation

When using a [subdomain setup](/dns/zone-setups/subdomain-setup/), you can have your child domain as a separate zone within the same account as the parent domain or within a different account.

If both your parent and child domains are in the same Cloudflare account and you no longer want to manage the child domain as a separate zone, you can rollback the NS delegation and recreate the corresponding subdomain DNS records through the following steps:

{{<Aside type="warning" header="Note">}}
This process may incur in downtime, as it is not possible to add address records (`A`/`AAAA`) on names that already have a corresponding `NS` record.
{{</Aside>}}

1. In your child domain, [export](/dns/manage-dns-records/how-to/import-and-export/#export-records) DNS records.
2. In the parent domain, go to **DNS** > **Records**.
3. Delete one of the `NS` records defined for the child domain.
4. Edit the remaining `NS` record to create the subdomain address record.
5. [Import](/dns/manage-dns-records/how-to/import-and-export/#import-records) the records you had obtained from step 1 into the parent zone.
6. Also migrate over any settings ([WAF custom rules](/waf/custom-rules/), [Rules](/rules/), [Workers](/workers/), and more) that might be needed for the child domain.
7. If needed, [order an advanced SSL certificate](/ssl/edge-certificates/advanced-certificate-manager/) that covers the child subdomain and any deeper subdomains (if present).