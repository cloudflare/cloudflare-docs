---
title: DNS records
pcx_content_type: reference
weight: 2
meta:
    title: Email DNS records
---

# DNS records

You can check the status and a list of your DNS records in the Settings section of Email Routing. This section also allows you to troubleshoot any potential problems you might have with DNS records.

## Email DNS records

In the Email DNS records card you can check the status of your account's DNS records: 

* **Email DNS records configured** - DNS records are properly configured.
* **Email DNS records misconfigured** - There is a problem with your accounts DNS records. Select **Enable Email Routing** to [start troubleshooting for problems](/email-routing/troubleshooting/).

## Locked DNS records

To avoid email routing problems, Cloudflare recommends that you have your account's DNS records locked. This means that the DNS records required for Email Routing to work will be locked and can only be changed if you disable Email Routing on your domain.

When you successfully configure Email Routing, the Email DNS records card will show a **Start disabling** button, with a `MX records locked` message. Depending on your zone configuration, however, you might also have a **Lock DNS records** button, which means your DNS records are unlocked and can be changed.

## Start disabling

The **Start disabling** button allows you to delete Email Routing from your account or keep your records and migrate to another provider. Refer to [Disable Email Routing](/email-routing/setup/disable-email-routing/) for more information.

{{<Aside type="note">}}This button is onlw shown when you have the DNS records for your account locked.{{</Aside>}}

## View DNS records

Select the **View DNS records** button for a list of the required `MX` and sender policy framework (SPF) records Email Routing is using. If you are having trouble with your account's DNS records, refer to the [Troubleshooting](/email-routing/troubleshooting/) section.
