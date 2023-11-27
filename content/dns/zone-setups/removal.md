---
title: Domain removal
pcx_content_type: concept
weight: 8
---

# Domain removal

If domains remain in the [Pending Nameserver Update](/dns/zone-setups/reference/domain-status/#pending-nameserver-update) or [Moved](/dns/zone-setups/reference/domain-status/#moved) status for too long, Cloudflare automatically [removes them](/dns/zone-setups/troubleshooting/domain-deleted/) from your account and the Cloudflare network.

You can also [manually remove a domain](/fundamentals/setup/manage-domains/remove-domain/) from Cloudflare.

If you need to re-add a domain to your account, follow the [regular onboarding flow](/fundamentals/setup/account-setup/add-site/).

{{<Aside type="warning" header="Purged zones">}}

By default, seven days after the removal, your zone will be automatically purged. In this case, even if you re-add the domain to the same Cloudflare account, the zone settings will not be restored. Refer to [zone statuses](/dns/zone-setups/reference/domain-status/) for more details.

{{</Aside>}}