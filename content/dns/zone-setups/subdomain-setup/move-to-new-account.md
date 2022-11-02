---
pcx_content_type: how-to
title: Migrate to new account
weight: 3
meta:
    title: Migrate subdomain to a new account
---

# Migrate subdomain to a new account

When using a [subdomain setup](/dns/zone-setups/subdomain-setup/), you can have your child subdomain as a separate zone within the same account as the parent domain or within a different account.

If you have already [created a standalone subdomain](/dns/zone-setups/subdomain-setup/setup/) within the same account, you still can move it to a separate account.

1. If your parent domain is active, first move the child subdomain back under the parent domain.
2. [Add the subdomain](/fundamentals/get-started/setup/add-site/) to a new Cloudflare account.
3. Create the subdomain's `CNAME` or `A` record within the new Cloudflare account.
4. Update the `NS` records for the subdomain to refer to the new nameservers corresponding to the new Cloudflare account.
5. Delete the subdomain's CNAME or A record within the previous Cloudflare account.