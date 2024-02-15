---
title: Zone removal
pcx_content_type: concept
weight: 8
---

# Zone removal

If domains on Free zones remain in the [Pending](/dns/zone-setups/reference/domain-status/#pending) or [Moved](/dns/zone-setups/reference/domain-status/#moved) status for too long, Cloudflare automatically removes them from your account and the Cloudflare network. Refer to [zone statuses](/dns/zone-setups/reference/domain-status/) for more details.

You can also [manually remove a domain](/fundamentals/setup/manage-domains/remove-domain/) from Cloudflare.

If you need to re-add a domain to your account, follow the [regular onboarding flow](/fundamentals/setup/manage-domains/add-site/).

{{<Aside type="warning" header="Purged zones">}}

By default, your zone will be automatically purged seven days after the removal. In this case, even if you re-add the domain to the same Cloudflare account, none of the zone settings are expected to be restored. Refer to [zone statuses](/dns/zone-setups/reference/domain-status/) for more details.

{{</Aside>}}