---
pcx-content-type: how-to
title: Transfer a .UK domain to Cloudflare
weight: 6
---

# Transfer a .UK domain to Cloudflare

## Prerequisites

- The domain must not be locked or suspended.
- There must be an active zone [for the domain](/fundamentals/get-started/setup/add-site/) in your Cloudflare account.
- The domain must have [Cloudflare nameservers](/dns/zone-setups/full-setup/).
- The domain must not be expiring within the next 10 days.

---

## How to transfer a .UK domain to Cloudflare

Cloudflare currently supports the transfer of `.uk`, `co.uk`, `org.uk`, and `me.uk` domains. To transfer a `.uk` domain to Cloudflare from another registrar follow these steps:

1. Log in go the [Cloudflare dashboard](https://dash.cloudflare.com/), select your account and click the **Registrar** tab.
2. Select **Transfer**. Cloudflare will show you a list of domains that are eligible for transfer (see below for restrictions). If you do not see your domain, [add the domain you want to transfer](/fundamentals/get-started/setup/add-site/) to your Cloudflare account before you try to transfer your `.uk` domain.
3. Select the domains you wish to transfer.
4. Proceed to checkout. Note that there is no fee to transfer a `.uk` domain and an additional year is NOT added during the transfer process.
5. After checkout, request your current registrar to update the IPS tag to `CLOUDFLARE`. The tag must be updated within seven days of completing the checkout process or the transfer will fail.
6. Cloudflare will receive a notice once your registrar updates the IPS tag. After that, we will finish transferring your domain.

{{<Aside type="warning" header="Warning">}}

If you request your current registrar to update the IPS tag before completing the checkout process, the transfer request will be automatically rejected. You must complete the checkout process before requesting the IPS tag update.

For security reasons, domains transferred to Cloudflare Registrar are locked for 60 days before they can be transferred out to another Registrar.

{{</Aside>}}

## Possible reasons a transfer may fail or be rejected

- The domain is locked or suspended.
- The nameservers were updated after the checkout process.
- The IPS tag update was made more than seven days after the checkout process.
