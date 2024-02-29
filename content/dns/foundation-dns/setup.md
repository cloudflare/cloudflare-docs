---
pcx_content_type: how-to
title: Setup
weight: 3
---

# Set up advanced nameservers

Advanced nameservers included with Foundation DNS are an opt-in configuration. Consider the sections below to understand how you can enable advanced nameservers.

Having advanced namservers configured is a requirement for you to have access to the new [GraphQL DNS analytics](/dns/foundation-dns/graphql-analytics/).

## Enable on a zone

To enable advanced nameservers on an existing or new zone:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account and domain.
2. Go to **DNS** > **Records**
3. For **Advanced nameservers**, select **Enable**
5. The **Cloudflare nameservers** card will display the values for your advanced nameservers `NS` records.
6. This step depends on whether you are using [Cloudflare Registrar](/registrar/):
    - If you are using Cloudflare Registrar, [contact Cloudflare Support](/support/contacting-cloudflare-support/) to have your nameservers updated.
    - If you are using a different registrar or if your zone is delegated to a parent zone, manually update your nameservers.

To manually update your nameservers:

1. Log in to the admin account for your domain registrar or the DNS configuration of the parent zone.
2. Replace your existing authoritative nameservers by the advanced namservers provided by Cloudflare, or update the `NS` records in the parent of your zone with the advanced nameservers names.

{{<Aside type="warning">}}
Make sure the values for your assigned nameservers are copied exactly.
{{</Aside>}}

## Set as default for new zones

**DNS Zone Dafaults** allow you to specify which configurations will be automatically enabled to new zones added to your account.

To select advanced namerserver as default:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Go to **Manage Account** > **Configurations** > **DNS Settings**
3. Select **Configure defaults**
4. For **Nameserver assignment method** choose **Cloudflare advanced nameservers**
5. Select (TBD)**Save** to confirm.

All new zones added to your account will be automatically assigned advanced nameservers. This can be changed later, for each zone, from **DNS** > **Settings**.