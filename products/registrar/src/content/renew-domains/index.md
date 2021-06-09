---
order: 10
pcx-content-type: how-to
title: Domain renewal
---

# Renew domains with Cloudflare Registrar

Once you have registered a domain with Cloudflare Registrar, you can renew that domain from within the Cloudflare dashboard.

## Set up automatic renewals

If you want your domains to renew automatically, keep the default settings for your domain (**Auto Renew** should be set to **On**). 

Cloudflare renews these domains automatically 30 days before their expiration date. You can also [manually renew](#renew-a-domain-manually) a domain at any time.

If the renewal fails, you will receive an email notification and Cloudflare will try to renew the domain **three** additional times. If these attempts fail, you must manually renew your domain.

<Aside type='note'>

If you want to delete your domain from Cloudflare, disable <strong>Auto Renew</strong> on your domain within Registrar.

</Aside>

## Renew a domain manually

You can renew a domain at any time. To renew a domain registered with Cloudflare:
1. Log into your Cloudflare account and select your domain.
1. For **Domain Registration**, click **Manage domain**.
1. For **Registration**, click **Add years**.
1. For **Renew for**, choose a number of years to renew your domain (up to 10 years).
1. Click **Renew**.
1. Click **Purchase**.

Once Cloudflare validates your payment, your domain moves to a status of **Renewal Pending**. The status changes back to **Active** once we finish the renewal.

## Renewal notifications

Once a domain is registered, Registrar sends the following expiration notices to the domain's associated email address:
- A monthly email listing all domains set to renew automatically within the next 45 days
- A weekly email listing all domains expiring within the next month
- A daily email listing all domains expiring within the next week
- An email one day after a domain expires

## Notes on renewals

If you do not renew your domain before the expiration date, your domain will enter a Redemption Grace Period (RGP) for 30 days. These domains are not deleted and you can restore them to your account, but restoration may require an additional fee. You cannot transfer domains during the RGP.

All renewals are final and Cloudflare will not issue refunds.

When renewing a domain, additional years are always added to the current expiration date regardless of when the renewal takes place.