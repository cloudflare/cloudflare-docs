---
pcx_content_type: how-to
title: Setup <TBD>
weight: 3
---

# Foundation DNS configuration

Advanced nameservers included with Foundation DNS are an opt-in configuration. Consider the sections below to understand how you can enable advanced nameservers.

Advanced nameservers enablement will also affect your zone access to the new GraphQL analytics.

## Enable advanced nameservers on a zone

To enable advanced namerservers on an existing or new zone:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account and domain.
2. Go to **DNS** > **Records**
3. For (TBD) **Cloudflare nameservers**, select (TBD) **Configure**
4. Select (TBD) **Advanced nameservers**
5. On **DNS** > **Records**, the **Cloudflare nameservers** card will display the values for your advanced nameservers `NS` records.
6. If you are using [Cloudflare Registrar](/registrar/), your nameservers will be updated automatically. If you are using a different registrar or if your zone is delegated to a parent zone, manually update your `NS` records.

To manually update your nameservers:
1. Log in to the admin account for your domain registrar or parent zone.
2. Replace your existing authoritative nameservers by the advanced namservers provided by Cloudflare or update the `NS` records with the advanced nameservers names.

{{<Aside type="warning">}}
Make sure the values for your assigned nameservers are copied exactly.
{{</Aside>}}

## Set advanced nameservers as default

## Use GraphQL analytics