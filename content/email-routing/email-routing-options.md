---
pcx-content-type: reference
title: Email Routing options
weight: 3
---

# Email Routing options

Email Routing main page is divided into four sections:

*   Custom address rules
*   Catch-all
*   DNS
*   Verified emails

## Custom addresses

In this section you can create as many custom email addresses as you want for your domain. Each of those custom addresses is then linked to a destination address, forming a **rule**. You can toggle a rule on or off.

Note that if you have more than one destination address linked to the same custom address, Email Routing will only process the most recent rule. This means only the most recent pair of custom address and destination address (rule) will receive your forwarded emails. To avoid this, do not link more than one destination address to the same custom address.

When creating a rule, you must specify an **Action**:

*   *Send to*: Emails will be routed to your **Destination address**. This is the default action.
*   *Drop*: Accepts emails but deletes them without routing to the specified **Destination address**. This can be useful if you want to make an email address appear valid for privacy reasons.

<Aside type="note">

All rules are automatically disabled until the destination address is validated by the user. This is to prevent spamming unintended recipients.

</Aside>

## Catch-all address

This feature enables Cloudflare to “catch” every variation of email addresses to make them valid for the specified domain. For example, if you created a rule for `john@yourdomain.com` and a sender accidentally types `jonh@yourdomain.com`, the email will still be correctly handled if you have **Catch-all** addresses enabled.

You must also specify an **Action** for Catch-all:

*   *Send to*: Emails will be routed to your **Destination address**. This is the default action.
*   *Drop*: Accepts emails but deletes them without routing to the specified **Destination address**. This can be useful if you want to make an email address appear valid for privacy reasons.

## Email DNS records

This section will display all the DNS records needed for Email Routing to work. You can check which records you need to add or remove, and this step can be done automatically by clicking **Add records automatically**. Cloudflare also shows you the correct DNS records in case you want to add or remove them manually. This is also where you can confirm if there are any conflicts that may result in unexpected behaviors.

## Verified emails

In this section there is a list of destination addresses that have already been verified. You can resend verification emails or delete destination addresses.

To prevent spam, Email Routing rules do not become active until after the destination address has been verified. Cloudflare sends a verification email to destination addresses specified in Custom addresses, where you need to click **Verify email address**.

<Aside type="note">

Deleting a destination address automatically disables all routing rules that use that email address as destination.

</Aside>
