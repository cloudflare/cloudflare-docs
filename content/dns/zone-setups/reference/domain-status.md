---
pcx_content_type: reference
title: Zone statuses
---

# Zone statuses

Refer to the following sections for information on the different zone statuses that you can find after you [add your website or application](/fundamentals/setup/account-setup/add-site/) to Cloudflare.

If your zone status changes, you will receive an email at the address associated with your account.

## Setup
You initiated but did not finish the signup process.

## Pending Nameserver Update

Cloudflare responds to DNS queries for pending zones on the assigned Cloudflare nameserver IPs, but your zone is still not active and is subject to the limitations listed below.

### Causes

  - [_Full setups_](/dns/zone-setups/full-setup/): You have either not changed your authoritative nameservers at your registrar or your change has not yet been authenticated.
  - [_Partial setups_](/dns/zone-setups/partial-setup/): You have either not added the verification TXT record to your authoritative DNS or that record has not yet been authenticated.

### Limitations

  - Pending zones cannot be used to [proxy traffic to Cloudflare](/dns/manage-dns-records/reference/proxied-dns-records/#pending-domains).
  - If your domain is on the Free plan, it will be deleted automatically if not activated within 28 days. Any pending zone with a paid plan (Pro, Business, Enterprise) will remain pending until the plan is removed or the domain is activated or [removed from Cloudflare](/fundamentals/setup/manage-domains/remove-domain/).

## Active

Cloudflare has authenticated your [nameserver changes](/dns/zone-setups/full-setup/setup/#update-your-nameservers) or [verification TXT record](/dns/zone-setups/partial-setup/setup/#verify-ownership-for-your-domain) and you can proxy domain traffic through Cloudflare.

## Moved

Your domain has failed multiple DNS checks, indicating that your authoritative DNS no longer points to Cloudflare nameservers. The domain will be deleted automatically after 7 days, unless there is an active plan subscription.

## Deleted

This domain has been archived. Cloudflare still responds to DNS queries for deleted zones on the assigned Cloudflare nameserver IPs (for non-deleted DNS records) and you can re-add the domain to Cloudflare by following the [regular onboarding flow](/fundamentals/setup/account-setup/add-site/).

After being deleted for seven days, a zone is automatically [purged](#purged).

## Purged

After a zone is deleted for seven days, it will be purged. Cloudflare does not respond to DNS queries for purged zones and, unlike [deleted zones](#deleted), this status cannot be reverted. In this case, even if you re-add the domain to the same Cloudflare account, the zone settings will not be restored.