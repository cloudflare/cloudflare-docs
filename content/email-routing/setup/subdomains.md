---
title: Subdomains
pcx_content_type: how-to
weight: 5
---

# Subdomains

Email Routing is a [zone-level](/fundamentals/concepts/accounts-and-zones/#zones) feature. A zone has a top-level domain (the same as the zone name) and it can have subdomains (managed under the DNS feature.) As an example, you can have the `example.com` zone, and then the `mail.example.com` and `corp.example.com` sub-domains under it.

You can use Email Routing with any subdomain of any zone in your account. Follow these steps to add Email Routing features to a new subdomain:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and zone.
2. Go to **Email** > **Email Routing** > **Settings** and click **Add subdomain**.

Once the subdomain is added and the DNS records are configured, you can see it in the **Settings** list under the **Subdomains** section.

Now you can go to **Email** > **Email Routing** > **Routing rules** and create new custom addresses that will show you the option of using either the top domain of the zone or any other configured subdomain.