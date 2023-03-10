---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/6701306098829-iCloud-Custom-Email-Domains
title: iCloud Custom Email Domains
---

# iCloud Custom Email Domains



## Overview

With [iCloud Custom Email Domain](https://support.apple.com/kb/HT212514), you can now purchase a custom domain right from iCloud Settings through Cloudflare and have it automatically set up with your iCloud Mail account. It’s great if you want to create a custom email domain for you or your family, such as @examplefamily.com.

You will need an active iCloud+ subscription to add a custom email domain.

___

## Purchase custom email domain

If you want to buy a custom email domain, go to your [iCloud](https://www.icloud.com/settings/) settings and scroll down to “Custom Email Domain”.

___

## Log in to Cloudflare

Once you have bought a custom email domain, you can manage your domain and other options through the [Cloudflare Dashboard](https://dash.cloudflare.com/login).

### Signing in with Apple

If you had signed up with Apple, signing into Cloudflare is as easy as clicking the “Sign in with Apple” button.

### Signing in with Cloudflare

If you had signed up with Cloudflare, signing into Cloudflare can be done with your email and password.

___

## Billing information

### Supported payment methods

For domain registration, Cloudflare supports the following payment methods:

-   Credit Card
-   PayPal
-   Apple Pay (available if you have a wallet with a valid payment method and are using an iOS device or Safari on macOS)

For domain renewals, Apple Pay does not currently support recurring payments. You can either add another payment method (Credit Card or PayPal) for automatic renewals or log into [your account](https://support.cloudflare.com/hc/en-us/articles/6701306098829-iCloud-Custom-Email-Domains#log-in) near the renewal date and use Apple Pay.

### Local currency price estimates

Users may see a price estimate in both U.S. Dollars and a local currency. This is only an estimate based on the current exchange rate.

The final payment will be charged in US dollars.

___

## Email issues

### Email issues

If you are not receiving emails intended for your new email address, review your DNS records in the Cloudflare dashboard:

1.  Log into the [Cloudflare dashboard](https://support.cloudflare.com/hc/en-us/articles/6701306098829-iCloud-Custom-Email-Domains#log-in).
2.  Go to **DNS**.
3.  Your domain should have records similar to the following:

![Your iCloud custom email domain should have a specific set of records created by default.](/support/static/icloud-custom-domain-dns-example.png)

If your domain has records similar to those listed above and you are still experiencing problems with your new email address, contact [Apple Support](https://support.apple.com/).

___

## Domain website

If you try to visit your new domain, your browser will show an error or empty page.

That’s because there’s more to setting up a website than purchasing a domain name (which you just did) and setting up email records (which we just did for you). 

If you want your domain to be a fully functioning website, you will need to:

1.  **Build your website**: Either using [Cloudflare Pages](/pages/), a website builder, or files hosted on a server.
2.  **Update your Cloudflare DNS**: To direct visitors looking for your domain name to the actual content on your website ([detailed guide](/dns/manage-dns-records/how-to/create-root-domain/)).

___

## Landing Page

After you buy a domain through iCloud, Cloudflare Registrar automatically enables a landing page for it. This temporary page informs your visitors that you still do not have a website. This feature is only available to new domain registrations, when you buy a domain through an Apple device.

### Disable Landing Page

If you do not want to have Landing Page enabled:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2.  Select **Registrar** > **Manage domains**.
3.  Find the domain you want to disable Landing Page for, and select **Manage** > **Configuration**.
4.  Scroll to Landing Page and select **Disable**.

You now have Landing Page disabled. The page can also be re-enabled through the same process.

{{<Aside type="note">}}
Customers must disable the landing page before they can add DNS records
to point to a new website.
{{</Aside>}}