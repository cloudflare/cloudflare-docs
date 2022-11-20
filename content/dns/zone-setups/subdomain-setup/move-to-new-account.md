---
pcx_content_type: how-to
title: Migrate to new account
weight: 3
meta:
    title: Migrate subdomain to a new account
---

# Migrate subdomain to a new account

When using a [subdomain setup](/dns/zone-setups/subdomain-setup/), you can have your child subdomain as a separate zone within the same account as the parent domain or within a different account.

If you have already [created a standalone subdomain zone](/dns/zone-setups/subdomain-setup/setup/) within the same account, you still can move it to a separate account.

1. [Add the subdomain](/fundamentals/get-started/setup/add-site/) to a new Cloudflare account.
2. Import all DNS records. Cloudflare recommends [exporting](/dns/manage-dns-records/how-to/import-and-export/#export-records) records from the parent domain, deleting all unnecessary records, and then [importing](/dns/manage-dns-records/how-to/import-and-export/#import-records) the records into your new zone.
3. Update the `NS` records in the parent zone to refer to the newly assigned nameservers of the child zone.