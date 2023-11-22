---
pcx_content_type: how-to
title: Rollback
weight: 5
meta:
    title: Rollback subdomain setup
---

# Rollback subdomain setup

When using a [subdomain setup](/dns/zone-setups/subdomain-setup/), you can have your child domain as a separate zone within the same account as the parent domain or within a different account.

If you no longer want to manage the child domain as a separate zone, you can rollback the delegation and recreate the corresponding subdomain DNS records through the following steps:

{{<Aside type="warning" header="Note">}}
This process may incur in downtime, as it is not possible to add address records (`A`/`AAAA`) on names that already have a corresponding `NS` record.
{{</Aside>}}

1. (Optional) In the parent zone, migrate over any settings ([WAF custom rules](/waf/custom-rules/), [Rules](/rules/), [Workers](/workers/), and more) that might be needed for the child domain.
2. (Optional) If needed, [order an advanced SSL certificate](/ssl/edge-certificates/advanced-certificate-manager/) that covers the child domain and any deeper subdomains (if present).
3. In the child zone, [export](/dns/manage-dns-records/how-to/import-and-export/#export-records) DNS records.
4. In the parent zone, go to **DNS** > **Records**.
5. Delete one of the `NS` records defined for the child domain.
6. Edit the remaining `NS` record to create the subdomain address record.
7. [Import](/dns/manage-dns-records/how-to/import-and-export/#import-records) the records you had obtained from step 1 into the parent zone.