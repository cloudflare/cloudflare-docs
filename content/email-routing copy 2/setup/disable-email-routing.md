---
title: Disable Email Routing
pcx_content_type: reference
weight: 3
---

# Disable Email Routing

Email Routing provides two options for disabling the service:

- **Delete and Disable**: This option will immediately disable Email Routing and remove its `MX` records. Your custom email addresses will stop working, and your email will not be routed to its final destination.
- **Unlock and keep DNS records**: (Advanced) This option is recommended if you plan to migrate to another provider. It allows you to add new `MX` records before disabling the service. Email Routing will stop working when you change your `MX` records.

## Delete and disable Email Routing

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Go to **Email** > **Email Routing** > **Settings**.
3. Select **Start disabling** > **Delete and Disable**. Email Routing will show you the list of records associated with your account that will be deleted.
4. Select **Delete records**.

Email Routing is now disabled for your account and will stop forwarding email. To enable the service again, select **Enable Email Routing** and follow the wizard.

## Unlock and keep DNS records

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Go to **Email** > **Email Routing** > **Settings**.
3. Select **Start disabling** > **Unlock records and continue**.
4. Select **Edit records on DNS**.

You now have the option to edit your DNS records to migrate your service to another provider.

{{<Aside type="warning">}}
Changing your DNS records will make Email Routing stop working. If you changed your mind and want to keep Email Routing working with your account, select **Lock DNS records**.
{{</Aside>}}