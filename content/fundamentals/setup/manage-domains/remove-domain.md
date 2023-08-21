---
pcx_content_type: reference
title: Remove a domain
weight: 3
meta:
    title: Remove a domain from Cloudflare
---

# Remove a domain

You can remove domains from Cloudflare if needed.

However, Cloudflare will still retain your configuration history for 18 months, which is the default retention period for the zone's [audit logs](/fundamentals/account-and-billing/account-security/review-audit-logs/). 

## Before removing your domain

If you experience website issues, we recommend [temporarily pausing Cloudflare](/fundamentals/get-started/basic-tasks/manage-domains/pause-cloudflare/) to evaluate your website's performance.

If you need to re-add the domain in a different account, make sure the current settings have been saved. For example, you may [Import and export DNS records](/dns/manage-dns-records/how-to/import-and-export/).

### Actions outside of Cloudflare

* When you remove a domain from Cloudflare, it also prevents your domain from using Cloudflare for DNS resolution. To avoid DNS errors, update your nameservers at your domain registrar to use nameservers not owned by Cloudflare.

    * Refer to [Check if your nameservers are pointing to Cloudflare](https://support.cloudflare.com/hc/articles/4426809598605) to confirm that your nameservers no longer point to Cloudflare.

* At your registrar, make sure you do not have a **DS** DNS record. This record enables [DNSSEC](/dns/dnssec/) and could prevent your DNS records from being changed.

### Actions within Cloudflare

* [Cancel active add-on subscriptions](/fundamentals/account-and-billing/account-maintenance/cancel-subscription/).

* [Delete all the Logpush jobs for that domain](/logs/tutorials/examples/example-logpush-curl/#step-4---delete-a-job)

* If you use Cloudflare Registrar:

    * [Disable domain auto-renewal](/registrar/account-options/renew-domains/) or [transfer your domain out of Cloudflare](/registrar/account-options/transfer-out-from-cloudflare/).

    * If enabled, disable DNSSEC. In your domain dashboard, go to **DNS** > **Settings**. Within **DNSSEC**, select **Disable DNSSEC**. Select **Confirm**.

## Remove a domain activated in Cloudflare

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.

2. On the **Overview** page, find **Advanced Actions** and then select **Remove Site from Cloudflare**.

    ![Remove site from Cloudflare is an option under Advanced Actions](/images/fundamentals/get-started/remove-domain.png)

    {{<Aside type="note">}}If you are using an Enterprise domain, [change your domain plan](/fundamentals/account-and-billing/account-maintenance/change-plan/#change-plan-type) to **Free**, which will give you access to **Remove Site from Cloudflare**.<br/><br/>If this does not work, contact your Customer Success Manager.
    {{</Aside>}}

3. Select **Confirm**.
