---
pcx-content-type: how-to
title: Domain management
---

# Domain management

You can manage your domain from the **Overview** page. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and domain.

## Domain status

When your domain is registered with Cloudflare, you can review your domain status in the **Overview** pane. Scroll down to **Domain Registration** to review the current expiration date. Click **Manage domain** to review the Auto-Renew status for your domain.

## Edit WHOIS records

Cloudflare redacts WHOIS information from your domain by default. However, we do store the authentic WHOIS record for your domain. You may edit the WHOIS contact data for any domain. To do that:

1.  Make sure you are [logged in to the Cloudflare dashboard](https://dash.cloudflare.com/login) and have selected your account and domain.
2.  From **Overview**, scroll down to **Manage domain**.
3.  Select the domain you want to edit and click **Manage** > **Contacts**.
4.  Click **Edit** in any of the contacts you previously set up. This allows you to update the contact information for the selected domain only. It will not update the contact information for other domains within the account.

Refer to [Registrant contact updates](/registrar/account-options/domain-contact-updates/) for more information.

## Edit Default Contact information

The first time you transfer or register a new domain, a Default Contact is created. That contact information may be used for future transfers and registrations. The contact data may be updated at any time in the dashboard. Updating the Default Contact data will not update the contact information for any domains in the account. This Default Contact data is only used to prepopulate contact information for new registrations and transfers.

To edit the Default Contact information:

1.  Make sure you are [logged in to the Cloudflare dashboard](https://dash.cloudflare.com/login) and have selected your account and domain.
2.  From **Overview**, scroll down to **Manage domain**.
3.  In the **Default Contact** card, click **Edit**.

## Automatic renewal of domain

Cloudflare Registrar enrolls your domain to auto-renew by default. Unlike other registrars, your domain will only renew at the list price set by the registry. When a domain has the auto-renew setting turned on, Cloudflare will attempt to automatically renew the domain prior to expiration.

There is no guarantee that the renewal will succeed. Renewals may fail for various reasons, including billing failures and registry downtime. While we will make several attempts to renew, we strongly recommend you frequently review your account to ensure your domains have been renewed.

If you decide you no longer need the domain, [disable auto-renew for your domain](/registrar/account-options/renew-domains/#set-up-automatic-renewals). Once disabled, your domain will not renew upon expiration.

{{<Aside type="note" header="Note">}}

The first auto-renew attempt will occur approximately 30 days prior to expiration. If you wish to disable auto-renew, do so at least 30 days prior to the expiration date.

{{</Aside>}}

You can continue to keep your domain registered with Cloudflare for the time remaining on the expiration date. If you decide you want to keep the domain, enable auto-renew at any time prior to your expiration.

For more details on renewals, refer to [Renew domains](/registrar/account-options/renew-domains/).
