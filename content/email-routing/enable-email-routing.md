---
title: Get started
order: 1
pcx-content-type: get-started
---

# Enable Email Routing

To enable Email Routing, create a custom email address for your domain, and link it to a destination address. This forms a **rule**. You can toggle rules on or off from the Cloudflare dashboard.

Destination addresses are shared at the account level and can be reused with any other domain in your account. This means the same destination address will be available to different domains in your account.

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2.  Go to **Email**.
3.  If this is your first time opening the Email app, you will be presented with an explanation of what Email Routing is. Click **Configure Email Routing** to start.
4.  In **Custom addresses**, click **Create address**. Enter the email address you want to use in **Custom address** (for example, `my-new-email`).
5.  In **Destination address**, enter the full email address you want your emails to be forwarded to — for example, `your-name@gmail.com`.

  <Aside type="note">

Email Routing will only process the most recent rule per custom address. Other destination addresses will not receive your forwarded emails.

  </Aside>

1.  Click **Save**.

Cloudflare will send a verification email to the address provided in the **Destination address** field. You must click **Verify email address** in the verification email to activate Email Routing.

## Confirm DNS records

After creating your custom email and verifying your destination address, Cloudflare needs to add the relevant MX and TXT records to DNS records for Email Routing to work. This step is automatic and is only needed the first time you configure Email Routing. It is meant to ensure you have the proper records configured in your zone.

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2.  Go to **Email**.
3.  If this is your first time configuring Email Routing, click **Add records automatically** in the **Email DNS records** card.

<Aside type="note">

When Email Routing is configured and running, no other email services can be active in the domain you are configuring. If there are other MX records already configured in DNS, Cloudflare will ask you if you wish to delete them. If you do not delete existing MX records, Email Routing will not be enabled.

</Aside>

## Test your configuration

To test that your configuration is working properly, send an email to the custom address [you set up in the dashboard](#enable-email-routing). You should send your test email from a different address than the one you specified as the destination address. For example, if you set up `my-account@gmail.com` as the destination address, do not send your test email from that same Gmail account.

Some email providers will discard what they interpret as an incoming duplicate email and will not show it in your inbox, making it seem like Email Routing is not working properly.

## DMARC enforcing

Email Routing enforces Domain-based Message Authentication, Reporting & Conformance (DMARC). Depending on the sender's DMARC policy, Email Routing will reject emails when there is an authentication failure. Refer to [dmarc.org](https://dmarc.org/) for more information on this protocol.
