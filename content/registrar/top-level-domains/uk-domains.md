---
pcx_content_type: how-to
title: .UK domains
weight: 3
meta:
    title: Learn how to manage a .UK domain with Cloudflare.
---

# .UK domains

## How to transfer a .UK domain to Cloudflare

Cloudflare currently supports the transfer of `.uk`, `co.uk`, `org.uk`, and `me.uk` domains. To transfer a `.uk` domain to Cloudflare from another registrar follow these steps:

1. Log in go the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Select **Domain Registration** > **Transfer Domains**. Cloudflare will show you a list of domains that are eligible for transfer (see below for restrictions). If you do not see your domain, [add the domain you want to transfer](/fundamentals/setup/account-setup/add-site/) to your Cloudflare account before you try to transfer your `.uk` domain.
3. Select the domains you wish to transfer.
4. Proceed to checkout. Note that there is no fee to transfer a `.uk` domain and an additional year is NOT added during the transfer process.
5. After checkout, request your current registrar to update the [IPS tag](https://en.wikipedia.org/wiki/Internet_Provider_Security) to `CLOUDFLARE`. If the transfer is not completed within 24 hours, ask your registrar again to update the IPS tag. The transfer will be automatically canceled if not completed within 30 days.
6. Cloudflare will receive a notice once your registrar updates the IPS tag. After that, we will finish transferring your domain.

{{<Aside type="warning" header="Warning">}}

If you request your current registrar to update the IPS tag before completing the checkout process, the transfer request will be automatically rejected. You must complete the checkout process before requesting the IPS tag update.

For security reasons, domains transferred to Cloudflare Registrar are locked for 60 days before they can be transferred out to another Registrar.

{{</Aside>}}

## Transfer a .UK domain to another registrar

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Go to **Domain Registration** > **Manage Domains**.
3. Find the domain you want to transfer, and select **Manage**.
4. Select **Configuration** > **Unlock**.
5. Enter the IPS tag of the registrar you wish to transfer to.

Your new registrar is responsible for accepting the transfer. Cloudflare has no visibility into why a transfer might not be accepted by the new registrar.

{{<Aside type="note">}}

If you do not know the IPS tag, contact your new registrar for instructions. Your new registrar may require you to follow some additional steps before starting the transfer process.

{{</Aside>}}

