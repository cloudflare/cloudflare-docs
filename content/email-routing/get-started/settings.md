---
title: Settings
pcx-content-type: reference
weight: 4
meta:
    title: Email Routing settings page
---

# Settings

This section displays the DNS records needed for Email Routing to work. If the DNS records are correctly configured, you will see a green `Email DNS records configured` message. Click **View DNS records** for a list of the required MX records Email Routing is using.

You can also unlock your DNS records to make additional changes or disable Email Routing, or lock your DNS records.

## Misconfigured Email Routing records

Email Routing warns you when your DNS records are not properly configured. When this happens, Email Routing also shows which records are required, and which records you will have to delete (if any) to activate the service.

To activate Email Routing and clean your DNS records, click **Enable Email Routing**. Email Routing will guide you through this process.

## Disable Email Routing

Email Routing provides two options for disabling the service:

- **Delete and Disable**: This option will immediately disable Email Routing and remove its MX records. Your custom email addresses will stop working, and your email will not be routed to its final destination.
- **Unlock and keep DNS records**: (Advanced) This option is recommended if you plan to migrate to another provider. It allows you to add new MX records before disabling the service. Email Routing will stop working when you change your MX records.

### Delete and disable Email Routing

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Go to **Email** > **Settings**.
3. Click **Start disabling** > **Delete and Disable**. Email Routing will show you the list of records associated with your account that will be deleted.
4. Click **Delete records**.

Email Routing is now disabled for your account and will stop forwarding email. To enable the service again, click **Enable Email Routing** and follow the wizard.

### Unlock and keep DNS records

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Go to **Email** > **Settings**.
3. Click **Start disabling** > **Unlock records and continue**.
4. Click **Edit records on DNS**.

You now have the option to edit your DNS records to migrate your service to another provider.

{{<Aside type="warning">}}
Changing your DNS records will make Email Routing stop working. If you changed your mind and want to keep Email Routing working with your account, click **Lock DNS records**.
{{</Aside>}}