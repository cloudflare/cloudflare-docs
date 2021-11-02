---
pcx-content-type: how-to
---

# Confirm DNS records

After creating your email alias and verifying your destination address, you need to add the relevant MX and TXT records to DNS records for Email Routing to work. This is only needed the first time you configure Email Routing and is meant to ensure you have the proper records configured in your zone.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain. Go to **Email**. 
1. If this is your first time configuring Email Routing, click **Add records automatically** in the **Email DNS records** card.

<Aside type="note">

When Email Routing is configured and running, no other email services can be active for this domain. If other MX records are already configured in DNS, the user is offered the opportunity to delete them. Not deleting existing MX records means that Email Routing will not be enabled.

</Aside>