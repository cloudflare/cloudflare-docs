---
pcx-content-type: reference
title: Remove a domain from Cloudflare
weight: 3
---

# Remove a domain from Cloudflare

## Before removing your domain

If you are an Enterprise customer, contact your Customer Success Manager to change/cancel your subscriptions, upgrade/downgrade plans and delete accounts.

If you experience website issues, we recommend [temporarily pausing Cloudflare](/fundamentals/get-started/basic-tasks/manage-domains/pause-cloudflare) to evaluate your website's performance.

### Actions outside of Cloudflare

* When you remove a domain from Cloudflare, it also prevents your domain from using Cloudflare for DNS resolution. To avoid DNS errors, update your nameservers at your domain registrar to use nameservers not owned by Cloudflare.

    * You can [confirm your nameservers no longer point to Cloudflare](https://support.cloudflare.com/hc/articles/4426809598605).

* If enabled, disable [DNSSEC](/dns/additional-options/dnssec/) by removing the **DS** record at your registrar.

### Actions within Cloudflare

* [Cancel active add-on subscriptions](/fundamentals/account-and-billing/account-maintenance/cancel-subscription/).

* If you use Cloudflare Registrar:

    * [Disable domain auto-renewal](/registrar/account-options/renew-domains/) or [transfer your domain out of Cloudflare](/registrar/account-options/transfer-out-from-cloudflare/).

    * If enabled, disable DNSSEC. In your domain dashboard, go to **DNS**. Within **DNSSEC**, select **Disable DNSSEC**. Select **Confirm**.

## Remove a domain activated in Cloudflare

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.

2. Within **Overview**, select **Advanced Actions** > **Remove Site from Cloudflare**. Select **Confirm**.

## Related resources

* [Removing Cloudflare subscriptions](/fundamentals/account-and-billing/account-maintenance/cancel-subscription/)
* [Changing your Cloudflare plan type](https://support.cloudflare.com/hc/en-us/articles/360033922371)
* [Cancel a Cloudflare account](/fundamentals/account-and-billing/account-maintenance/delete-account/)
