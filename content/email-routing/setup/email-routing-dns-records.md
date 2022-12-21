---
title: DNS records
pcx_content_type: reference
weight: 2
meta:
    title: Email DNS records
---

# DNS records

You can check the status of your DNS records in the **Settings** section of Email Routing. This section also allows you to troubleshoot any potential problems you might have with DNS records.

## Email DNS records

Check the status of your account's DNS records in the **Email DNS records** card:

* **Email DNS records configured** - DNS records are properly configured.
* **Email DNS records misconfigured** - There is a problem with your accounts DNS records. Select **Enable Email Routing** to [start troubleshooting problems](/email-routing/troubleshooting/).

### Start disabling

When you successfully configure Email Routing, your DNS records will be locked and the dashboard will show a **Start disabling** button in the Email DNS records card. This locked status is the recommended setting by Cloudflare. It means that the DNS records required for Email Routing to work are locked and can only be changed if you disable Email Routing on your domain.

If you need to delete Email Routing or migrate to another provider, select **Start disabling**. Refer to [Disable Email Routing](/email-routing/setup/disable-email-routing/) for more information.

### Lock DNS records

Depending on your zone configuration, you might have your DNS records unlocked. This will also be true if, for some reason, you have unlocked your DNS records. Select **Lock DNS records** to lock your DNS records and protect them from being accidentally changed or deleted. 

## View DNS records

Select **View DNS records** for a list of the required `MX` and sender policy framework (SPF) records Email Routing is using. 

If you are having trouble with your account's DNS records, refer to the [Troubleshooting](/email-routing/troubleshooting/) section.
