---
pcx_content_type: how-to
title: Migrate to new account
weight: 4
meta:
    title: Migrate subdomain to a new account
---

# Migrate subdomain to a new account

When using a [subdomain setup](/dns/zone-setups/subdomain-setup/), you can have your child subdomain as a separate zone within the same account as the parent domain or within a different account.

If you have already [created a standalone subdomain zone](/dns/zone-setups/subdomain-setup/setup/) within the same account, you still can move it to a separate account.

1. [Add the subdomain](/fundamentals/setup/account-setup/add-site/) to a new Cloudflare account.
2. In the original subdomain zone, [export](/dns/manage-dns-records/how-to/import-and-export/#export-records) the DNS records.
3. Review the exported records, delete any unnecessary ones, and [import](/dns/manage-dns-records/how-to/import-and-export/#import-records) them into the new subdomain zone.
4. Update the `NS` records in the parent zone to refer to the newly assigned nameservers of the child zone.