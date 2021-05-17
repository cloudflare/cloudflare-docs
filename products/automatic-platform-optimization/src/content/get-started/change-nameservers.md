---
title: Change nameservers
order: 6
---

# Change nameservers

Updating your domain to use Cloudflare's nameservers is a critical step to ensure Cloudflare can optimize and protect your site. Nameservers are your primary DNS controller and identify the location of your domain on the Internet.

Domain registrars can take up to 24 hours to process the nameserver updates. You will receive an email from Cloudflare once your site is activated.

## Lookup domain name registration

1. Visit [WHOIS](https://lookup.icann.org/) to look up your domain name registration.
1. In the text field, enter your domain name without `https://www.` and select **Lookup**.
1. From **Domain Information**, make note of the nameserver information that displays. You will update those nameservers to point to Cloudflare.

We recommend keeping this browser tab or window open and opening a new tab or window for the next section.

## Create the custom nameserver with Cloudflare

1. In a new browser tab or window, log into your Cloudflare dashboard.
1. Select your domain from the dropdown.
1. Select the **DNS** tile.
1. From the **Custom Nameservers** section, select **Add Custom Nameservers**.
1. Enter the nameserver information from Step 3 of Lookup domain name registration. Cloudflare assigns an IPv4 or IPv6 to your nameservers.

We recommend keeping this browser tab or window open and opening a new tab or window for the next section.

## Update your nameserver with your domain registrar

1. Log in to the administrator account for your domain registrar.
1. Navigate to DNS Management.
1. Locate your nameserver information. Your nameservers should match the information from Step 3 of Lookup domain name registration.
1. Replace the existing nameserver information with the Cloudflare nameservers from Step 4 of Create the custom nameserver with Cloudflare.

<Aside type="note">

You may be prompted to confirm the nameserver change with your domain registrar. Confirm or continue after making the update.

</Aside>
