---
title: Configure email rules and addresses
pcx-content-type: how-to
weight: 2
---

# Routes

The Routes page is divided into three main configuration sections:

- Custom addresses
- Catch-all address
- Destination addresses

Each section lets you configure different aspects of Email Routing.

{{<Aside type="note" header="Note">}}

A custom address and destination address form an email rule. You can enable, disable, and delete email rules.

{{</Aside>}}

## Custom addresses

In this section you can create, enable, disable, and edit custom addresses. To add new custom addresses:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Go to **Email** > **Routes**.
3. Click **Create address**.
4. In **Custom address**, enter the custom email address you want to use (for example, `my-new-email`).
5. In the **Action** drop-down menu, choose what this email rule should do. You can choose between _Send to_ or _Drop_. Refer to [Email rule actions](#email-rule-actions) for more information.
6. In **Destination address**, choose the email address you want your emails to be forwarded to — for example, `your-name@gmail.com`. You can only choose from destination addresses you have already verified. To add new destination addresses, refer to [Destination addresses](#destination-addresses).

{{<Aside type="note">}}
If you have more than one destination address linked to the same custom address, Email Routing will only process the most recent rule. This means only the most recent pair of custom address and destination address (rule) will receive your forwarded emails. To avoid this, do not link more than one destination address to the same custom address.
{{</Aside>}}

### Email rule actions

When creating an email rule, you must specify an **Action**:

- _Send to_: Emails will be routed to your **Destination address**. This is the default action.
- _Drop_: Deletes emails sent to the **Custom address** without routing them. This can be useful if you want to make an email address appear valid for privacy reasons.

{{<Aside type="note">}}

To prevent spamming unintended recipients, all email rules are automatically disabled until the destination address is validated by the user.

{{</Aside>}}

### Disable an email rule

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Go to **Email** > **Routes**.
3. In **Custom addresses**, identify the email rule you want to pause, and toggle the status button to **Disabled**.

Your email rule is now disabled and will not forward emails to a destination address. To forward emails again, toggle the email rule status button to **Active**.

### Edit custom addresses

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Go to **Email** > **Routes**.
3. In **Custom addresses**, identify the email rule you want to edit, and click **Edit**.
4. Make the appropriate changes to this custom address.

## Catch-all address

When you enable this feature, Cloudflare will catch variations of email addresses to make them valid for the specified domain. For example, if you created an email rule for `info@example.com` and a sender accidentally types `ifno@example.com`, the email will still be correctly handled if you have **Catch-all** addresses enabled.

You must also [specify a rule **Action**](#email-rule-actions) for Catch-all addresses.

## Destination addresses

This section lets you manage your destination addresses, and lists all email addresses already verified, as well as email addresses pending verification. You can resend verification emails or delete destination addresses.

Destination addresses are shared at the account level, and can be reused with any other domain in your account. This means the same destination address will be available to different domains in your account.

To prevent spam, email rules do not become active until after the destination address has been verified. Cloudflare sends a verification email to destination addresses specified in Custom addresses. You have to click **Verify email address** in that email to activate a destination address.

{{<Aside type="note">}}

Deleting a destination address automatically disables all email rules that use that email address as destination.

{{</Aside>}}

