---
pcx-content-type: reference
title: Removing a domain from Cloudflare
weight: 4
---

# Removing a domain from Cloudflare

## Before removing your domain

If you are an Enterprise customer, please contact your Customer Success Manager to change/cancel your subscriptions, upgrade/downgrade plans and for account deletions.

If you experience website issues, we recommend [temporarily pausing Cloudflare](/fundamentals/get-started/basic-tasks/manage-domains/pause-cloudflare) first and evaluating your website's performance.

If you still want to remove your domain from Cloudflare, you should do the following:

### Outside of Cloudflare

When you remove a domain from Cloudflare, it also prevents your domain from using Cloudflare for DNS resolution.

To avoid DNS errors, update your nameservers at your domain registrar to use nameservers not owned by Cloudflare. You will also need to [disable DNSSEC](/dns/additional-options/dnssec/) by removing the **DS record** at your registrar (if enabled).

Before you remove your domain, we recommend that you confirm [your nameservers are no longer pointing to Cloudflare](https://support.cloudflare.com/hc/articles/4426809598605).

### Within Cloudflare

Before you remove your domain from Cloudflare, you need to:

* [Disable DNSSEC](/dns/additional-options/dnssec/) within the Cloudflare dashboard (and the remove the DS record at your registrar)
* [Cancel active add-on subscriptions](/fundamentals/account-and-billing/account-maintenance/cancel-subscription/) (your plan will be cancelled automatically)
* If you use Cloudflare Registrar:
  * [Disable domain auto-renewal](/registrar/account-options/renew-domains/) or
  * [Transfer your domain out of Cloudflare](/registrar/account-options/transfer-out-from-cloudflare/)

## Remove a domain activated in Cloudflare

If DNSSEC is activated via Cloudflare, remove the DS record from the registrar configuration in the Cloudflare dashboard > **DNS** before removing your Cloudflare domain.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), select your account, and select the domain you wish to delete.

2. Cancel DNSSEC if you have it enabled.

3. Remove all domain auto-renew and/or other paid plan extensions.

4. At your domain's registrar, change the nameservers away from Cloudflare.

5. After the nameserver change propagates, log in to Cloudflare and select the domain you wish to delete.

6. Within **Overview**, select **Advanced Actions** > **Remove Site from Cloudflare**. Select **Confirm** to proceed.

## Related resources

* [Removing Cloudflare subscriptions](/fundamentals/account-and-billing/account-maintenance/cancel-subscription/)
* [Changing your Cloudflare plan type](https://support.cloudflare.com/hc/en-us/articles/360033922371)
* [Cancel a Cloudflare account](/fundamentals/account-and-billing/account-maintenance/delete-account/)
