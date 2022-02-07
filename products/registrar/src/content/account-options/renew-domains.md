---
title: Renew domains
pcx-content-type: how-to
---

# Renew domains with Cloudflare Registrar

Once you have registered a domain with Cloudflare Registrar, you can renew that domain from within the Cloudflare dashboard.

## Set up automatic renewals

If you want your domains to renew automatically, keep the default settings for your domain (**Auto Renew** should be set to **On**). To find this setting:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select the account and domain you want to renew.
1. From **Overview**, scroll down to **Domain Registration** and select **Manage domain**.
1. Find the domain you want to set up and make sure the **Auto Renew** toggle is enabled.

Cloudflare renews these domains automatically 30 days before their expiration date. You can also [manually renew](#renew-a-domain-manually) a domain at any time.

If the renewal fails, you will receive an email notification and Cloudflare will try to renew the domain three additional times. If these attempts fail, you must manually renew your domain.

<Aside type="note">

If you want to delete your domain from Cloudflare, **disable** Auto-Renew first.

</Aside>

## Renew a domain manually

You can renew a domain at any time. To renew a domain registered with Cloudflare:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select the account and domain you want to renew.
1. From **Overview**, scroll down to **Domain Registration** and click **Manage domain**.
1. Find the domain you want to renew and click **Manage**.
1. In **Registration** > **Domain Registration**, click **Add years**.
1. In the **Renew for** drop-down menu, choose a number of years to renew your domain (up to 10 years).
1. Select **Renew** > **Purchase**.

Once Cloudflare validates your payment, the status of your domain changes to **Renewal Pending**. After the renewal is finished, the status changes back to **Active**.

## Renewal notifications

Once a domain is registered, Registrar sends the following expiration notices to the email address associated with the domain:
- A monthly email listing all domains set to renew automatically within the next 45 days.
- A monthly email listing all domains expiring in the next 60-90 days.
- A weekly email listing all domains expiring within the next month.
- A daily email listing all domains expiring in seven days.
- An email one day after a domain expires.
- An email 20 days after the expiration date.

<Aside type="note">

If you do not renew your domain before the expiration date, your domain will enter a Redemption Grace Period (RGP) for 30 days. These domains are not deleted and you can restore them to your account, but restoration may require an additional fee. You cannot transfer domains during the RGP.

All renewals are final and Cloudflare will not issue refunds.

When renewing a domain, additional years are always added to the current expiration date regardless of when the renewal takes place.

</Aside>