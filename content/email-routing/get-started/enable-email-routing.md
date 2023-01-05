---
title: Enable Email Routing
pcx_content_type: get-started
weight: 1
---

# Enable Email Routing

{{<Aside type="warning" header="Important">}}

Enabling Email Routing adds the appropriate `MX` records to the DNS settings of your zone in order for the service to work. You can [change these `MX` records](/email-routing/setup/email-routing-dns-records/) at any time. However, depending on how you configure them, Email Routing might stop working.

{{</Aside>}}

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Go to **Email** > **Email Routing** and select **Get started**.
3. In **Custom address**, enter the custom email address you want to use (for example, `my-new-email@example.com`).
4. In **Destination address**, enter the full email address you want your emails to be forwarded to — for example, `your-name@gmail.com`.

  {{<Aside type="note">}}If you have several destination addresses linked to the same custom email address (rule), Email Routing will only process the most recent rule. To avoid this, do not link several destination addresses to the same custom address.{{</Aside>}}

5. Select **Create and continue**.
6. Cloudflare will send a verification email to the address provided in the **Destination address** field. You must verify your email address before being able to proceed.
7. In the verification email Cloudflare sent you, select **Verify email address** > **Go to Email Routing** to activate Email Routing.
8. Your Destination address should now show **Verified**, under **Status**. Select **Continue**.
9. Cloudflare needs to add the relevant `MX` and `TXT` records to DNS records for Email Routing to work. This step is automatic and is only needed the first time you configure Email Routing. It is meant to ensure you have the proper records configured in your zone. Select **Add records and finish**.

Email Routing is now enabled. You can add other custom addresses to your account. 

{{<Aside type="note">}}

When Email Routing is configured and running, no other email services can be active in the domain you are configuring. If there are other `MX` records already configured in DNS, Cloudflare will ask you if you wish to delete them. If you do not delete existing `MX` records, Email Routing will not be enabled.

{{</Aside>}}