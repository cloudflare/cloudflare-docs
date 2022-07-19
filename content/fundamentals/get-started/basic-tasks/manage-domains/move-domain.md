---
pcx-content-type: reference
title: Moving domains between Cloudflare accounts
weight: 2
---

# Moving domains between Cloudflare accounts

You will have to move or transfer domains from one Cloudflare account to another if:

* you manage a multi-user organization and need to segment domain access by user,
* you receive a `Cloudflare is already hosting under a different account` error, or
* you lose access to your Email address or Cloudflare account.

However, if you have two-factor authentication (2FA) enabled and access to backup codes, you can use those codes to access your Cloudflare account.

## Requirements

To transfer a domain from one Cloudflare account to another, you will need access to your domain registrar and at least one Cloudflare account associated with the domain.

## Transfer your domain

{{<Aside type="warning">}}

Before transferring an active Cloudflare domain to another Cloudflare account, you must remove any DNSSEC configurations and [add-ons or subscriptions](/fundamentals/account-and-billing/account-maintenance/cancel-subscription/).

{{</Aside>}}

If you lose access to the email address associated with your Cloudflare account and do not have backup codes, you will need to manually transfer your domain to a new Cloudflare account. For example, if you register the domain `myzone.com` using `test@example.com` and lose access to that Email account, you will need to create a new Cloudflare account using a new Email address, such as `test1@example.com`, and add `myzone.com` to the new account.

The domain transfer process depends on your DNS settings. If Cloudflare is your authoritative DNS provider (i.e., your domain nameservers point to Cloudflare), you must:

1. Create a new Cloudflare account or log in to a desired existing Cloudflare account.
2. Add the domain to the account (as if you were adding it for the first time).
3. Log in to your domain registrar account and update the nameservers to the newly provided Cloudflare nameservers.
4. To finalize the nameserver update, select **Re-check now** in the Overview dashboard.

If you still have access to your previous Cloudflare account, you can copy over the Cloudflare account settings manually. Reissuing [SSL/TLS certificates](https://developers.cloudflare.com/ssl/edge-certificates) is required as well as [recreating and validating DNS records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records) when transferring domains between Cloudflare accounts.

Once the nameserver change has been recognized by the Cloudflare network, the previous zone will be marked as _Status: Moved Away_ and the domain status in the new account will change to _Status: Active_. After 7 days in the _Moved_ state, the zone will change to _Deleted_. And finally, if a zone remains in the _Deleted_ state for 7 days, it will be permanently removed from your account.

## Related resources

* [Securing user access with two-factor authentication](https://support.cloudflare.com/hc/en-us/articles/200167906-Securing-user-access-with-two-factor-authentication-2FA-)
* [Change your authoritative nameservers](/dns/zone-setups/full-setup/setup/)
* [Get started with SSL/TLS](/ssl/get-started/)
* [Manage DNS records in Cloudflare](/dns/manage-dns-records/how-to/create-dns-records/)
