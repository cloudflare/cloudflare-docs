---
pcx_content_type: reference
title: Remove a domain
weight: 3
meta:
  title: Remove a domain from Cloudflare
---

# Remove a domain

## Before removing your domain

If you are an Enterprise customer, contact your Customer Success Manager to change/cancel your subscriptions, upgrade/downgrade plans and delete accounts.

If you experience website issues, we recommend [temporarily pausing Cloudflare](/fundamentals/get-started/basic-tasks/manage-domains/pause-cloudflare/) to evaluate your website's performance.

### Actions outside of Cloudflare

- When you remove a domain from Cloudflare, it also prevents your domain from using Cloudflare for DNS resolution. To avoid DNS errors, update your nameservers at your domain registrar to use nameservers not owned by Cloudflare.

  - Refer to [Check if your nameservers are pointing to Cloudflare](https://support.cloudflare.com/hc/articles/4426809598605) to confirm that your nameservers no longer point to Cloudflare.

- At your registrar, make sure you do not have a **DS** DNS record. This record enables [DNSSEC](/dns/additional-options/dnssec/) and could prevent your DNS records from being changed.

### Actions within Cloudflare

- [Cancel active add-on subscriptions](/fundamentals/account-and-billing/account-maintenance/cancel-subscription/).

- If you use Cloudflare Registrar:

  - [Disable domain auto-renewal](/registrar/account-options/renew-domains/) or [transfer your domain out of Cloudflare](/registrar/account-options/transfer-out-from-cloudflare/).

  - If enabled, disable DNSSEC. In your domain dashboard, go to **DNS**. Within **DNSSEC**, select **Disable DNSSEC**. Select **Confirm**.

## Remove a domain activated in Cloudflare

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.

2. On the **Overview** page, find **Advanced Actions** and then select **Remove Site from Cloudflare**.

   ![Remove site from Cloudflare is an option under Advanced Actions](/fundamentals/static/images/get-started/remove-domain.png)

3. Select **Confirm**.
