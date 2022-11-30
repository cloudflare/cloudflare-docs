---
title: Renew domains
pcx_content_type: how-to
meta:
  title: Renew domains with Cloudflare Registrar
---

# Renew domains with Cloudflare Registrar

## Automatic renewal of domain

Cloudflare Registrar enrolls your domain to auto-renew by default. Unlike other registrars, your domain will only renew at the list price set by the registry. When a domain has the auto-renew setting turned on, Cloudflare will attempt to automatically renew the domain prior to expiration.

There is no guarantee that the renewal will succeed. Renewals may fail for various reasons, including billing failures and registry downtime. While Cloudflare will make several attempts to renew, it is strongly recommended you frequently review your account to ensure your domains have been renewed.

If you decide you no longer need the domain, [disable auto-renew for your domain](#set-up-automatic-renewals). Once disabled, your domain will not renew upon expiration.

{{<Aside type="note" header="Note">}}

The first auto-renew attempt will occur approximately 30 days prior to expiration. If you wish to disable auto-renew, do so at least 30 days prior to the expiration date.

{{</Aside>}}

You can continue to keep your domain registered with Cloudflare for the time remaining until the expiration date. If you decide you want to keep the domain, enable auto-renew at any time prior to expiration.

## Set up automatic renewals

If you want your domains to renew automatically, keep the default settings for your domain (**Auto Renew** should be set to **On**). To find this setting:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Select **Domain Registration** > **Manage Domains**.
3. Find the domain you want to automatically renew, and make sure the **Auto-renew** toggle is enabled.

Cloudflare attempts to renew these domains automatically 30 days before their expiration date. Several more attempts are made if the first attempt fails. The last attempt to renew is made on the day before expiration. You can also [manually renew](#renew-a-domain-manually) a domain at any time.

If multiple domains are auto-renewed on the same date, only one charge will be made to the primary payment method.

If the renewal fails, you will receive an email notification and Cloudflare will try to renew the domain three additional times. If these attempts fail, you must manually renew your domain.

{{<Aside type="note">}}

If you want to delete your domain from Cloudflare, **disable** Auto-Renew first.

{{</Aside>}}

## Renew a domain manually

You can renew a domain at any time. To renew a domain registered with Cloudflare:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Select **Domain Registration** > **Manage Domains**.
3. Find the domain you want to renew and select **Manage**.
4. In **Registration** select **Renew/Extend Domain**.
5. In the **Renew for** drop-down menu, choose a number of years to renew your domain (up to 10 years).
6. Select **Renew** and then **Purchase**.

Once Cloudflare validates your payment, the status of your domain changes to **Renewal Pending**. After the renewal is finished, the status changes back to **Active**.

## Renewal notifications

Once a domain is registered, Registrar sends the following expiration notices to the Super Admin of the domain:

* A monthly email listing all domains set to renew automatically within the next 45 days.
* A monthly email listing all domains expiring in the next 60-90 days.

In addition to the Super Admin, the following expiration notices are sent to the WHOIS Registrant contact associated with the domain:

* A weekly email listing all domains expiring within the next month.
* A daily email listing all domains expiring in seven days.
* An email one day after a domain expires.
* An email 20 days after the expiration date.

{{<Aside type="note">}}

If you do not renew your domain before the expiration date, your domain will enter a Redemption Grace Period (RGP) for 30 days. These domains are not deleted and you can restore them to your account, but restoration may require an additional fee. You cannot transfer domains during the RGP.

All renewals are final and Cloudflare will not issue refunds.

When renewing a domain, additional years are always added to the current expiration date regardless of when the renewal takes place.

{{</Aside>}}
