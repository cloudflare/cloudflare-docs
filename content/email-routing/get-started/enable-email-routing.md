---
title: Enable Email Routing
pcx-content-type: get-started
weight: 1
---

# Enable Email Routing

{{<Aside type="warning" header="Important">}}

Enabling Email Routing adds the appropriate MX records to your DNS settings in order for the service to work. You can [change these MX records](/email-routing/get-started/settings) at any time; however, depending on how you configure them, Email Routing might stop working.

{{</Aside>}}

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Go to **Email**, and click **Get started**.
3. In **Custom address**, enter the custom email address you want to use (for example, `my-new-email@example.com`).
4. In **Destination address**, enter the full email address you want your emails to be forwarded to — for example, `your-name@gmail.com`.

  {{<Aside type="note">}}Email Routing will only process the most recent email rule per custom address. Other destination addresses will not receive your forwarded emails.{{</Aside>}}

5. Click **Create and continue**.
6. Cloudflare will send a verification email to the address provided in the **Destination address** field. You must verify your email address before being able to proceed.
7. In the verification email Cloudflare sent you, click **Verify email address** > **Go to Email Routing** to activate Email Routing.
8. Your Destination address should now show **Verified**, under **Status**. Click **Continue**.
9. Cloudflare needs to add the relevant MX and TXT records to DNS records for Email Routing to work. This step is automatic and is only needed the first time you configure Email Routing. It is meant to ensure you have the proper records configured in your zone. Click **Add records and finish**.

Email Routing is now enabled. You can add other custom addresses to your account. 

{{<Aside type="note">}}

When Email Routing is configured and running, no other email services can be active in the domain you are configuring. If there are other MX records already configured in DNS, Cloudflare will ask you if you wish to delete them. If you do not delete existing MX records, Email Routing will not be enabled.

{{</Aside>}}

## Test your Email Routing configuration

To test that your configuration is working properly, send an email to the custom address [you set up in the dashboard](#enable-email-routing). You should send your test email from a different address than the one you specified as the destination address. For example, if you set up `your-name@gmail.com` as the destination address, do not send your test email from that same Gmail account. Some email providers will discard what they interpret as an incoming duplicate email and will not show it in your inbox, making it seem like Email Routing is not working properly.

## DMARC enforcing

Email Routing enforces Domain-based Message Authentication, Reporting & Conformance (DMARC). Depending on the sender's DMARC policy, Email Routing will reject emails when there is an authentication failure. Refer to [dmarc.org](https://dmarc.org/) for more information on this protocol.