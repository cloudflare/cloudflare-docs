---
pcx_content_type: reference
title: Domain statuses
---

# Domain statuses

Once you [add a domain](/fundamentals/get-started/setup/add-site/) to Cloudflare on a full or partial setup, it moves through several statuses:

- **Setup**: You initiated but did not finish the signup process.

- **Pending Nameserver Update**: If your domain is not activated, it will be deleted automatically after 62 days.

  - [_Full setups_](/dns/zone-setups/full-setup/): You have either not changed your authoritative nameservers at your registrar or your change has not yet been authenticated.
  - [_Partial setups_](/dns/zone-setups/partial-setup/): You have either not added the verification TXT record to your authoritative DNS or that record has not yet been authenticated.

  {{<Aside type="warning">}}
  Pending zones cannot be used to [proxy traffic to Cloudflare](/dns/manage-dns-records/reference/proxied-dns-records/#pending-domains).
  {{</Aside>}}

- **Active**: Cloudflare has authenticated your nameserver changes or verification TXT record and you can proxy domain traffic through Cloudflare.

- **Moved**: Your domain has failed multiple DNS checks, indicating that your authoritative DNS no longer points to Cloudflare nameservers. The domain will be deleted automatically after 7 days, unless there is an active plan subscription.

- **Deleted**: This domain has been archived. You can re-add the domain to Cloudflare by following the [regular onboarding flow](/fundamentals/get-started/setup/add-site/).

If your domain's status changes, you will receive an email at the address associated with your account.

## Domain removal

If domains remain in the **Pending Nameserver Update** or **Moved** status for too long, Cloudflare automatically removes them from your account and the Cloudflare network.

If you want to manually remove a domain from Cloudflare, follow the instructions in our [Knowledgebase](https://support.cloudflare.com/hc/articles/360033554252).

If you need to re-add a domain to your account, follow the [regular onboarding flow](/fundamentals/get-started/setup/add-site/).
