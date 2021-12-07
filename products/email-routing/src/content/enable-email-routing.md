---
title: Get started
order: 1
pcx-content-type: how-to
---

# Enable Email Routing

To enable Email Routing, create a custom email address for your domain, and link it to a destination address. This forms a **rule**. You can toggle rules on or off from the Cloudflare dashboard.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
1. Go to **Email**.
1. If this is your first time opening the Email app, you will be presented with an explanation of what Email Routing is. Click **Configure Email Routing** to start.
1. In **Custom addresses**, click **Create address**. Enter the email address you want to use in **Custom address** (for example, `my-new-email`).
1. In **Destination address**, enter the full email address you want your emails to be forwarded to — for example, `your-name@gmail.com`.

  <Aside type="note">

  Email Routing will only process the most recent rule per custom address. Other destination addresses will not receive your forwarded emails.

  </Aside>

1. Click **Save**.

Cloudflare will send a verification email to the address provided in the **Destination address** field. You must click **Verify email address** in the verification email to activate Email Routing.

## Confirm DNS records

After creating your custom email and verifying your destination address, Cloudflare needs to add the relevant MX and TXT records to DNS records for Email Routing to work. This step is automatic and is only needed the first time you configure Email Routing. It is meant to ensure you have the proper records configured in your zone.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
1. Go to **Email**.
1. If this is your first time configuring Email Routing, click **Add records automatically** in the **Email DNS records** card.

<Aside type="note">

When Email Routing is configured and running, no other email services can be active in the domain you are configuring. If there are other MX records already configured in DNS, Cloudflare will ask you if you wish to delete them. If you do not delete existing MX records, Email Routing will not be enabled.

</Aside>