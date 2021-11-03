---
order: 1
pcx-content-type: how-to
---

# Enable Email Routing

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain. Go to **Email**.
1. If this is your first time opening the Email app, you will be presented with an explanation of what Email Routing is. Click **Configure Email Routing** to start.
1. In **Custom addresses**, click **Create address**. Enter the email alias you want to use in the **Custom address** field (for example, `my-new-email`).
1. In **Destination address**, enter the full email address you want your emails to be forwarded to — for example, `your-name@gmail.com`.
1. Click **Save**.

Cloudflare will send you a verification email to the address provided in the Destination address field. You must click **Verify email address** in the verification email address to activate Email Routing.

## Confirm DNS records

After creating your email alias and verifying your destination address, Cloudflare needs to add the relevant  MX and TXT records to DNS records for Email Routing to work. This step is automatic and is only needed the first time you configure Email Routing. It is meant to ensure you have the proper records configured in your zone.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain. Go to **Email**. 
1. If this is your first time configuring Email Routing, click **Add records automatically** in the **Email DNS records** card.

<Aside type="note">

When Email Routing is configured and running, no other email services can be active for this domain. If other MX records are already configured in DNS, the user is offered the opportunity to delete them. Not deleting existing MX records means that Email Routing will not be enabled.

</Aside>