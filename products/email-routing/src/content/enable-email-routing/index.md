---
order: 1
pcx-content-type: how-to
---

# Enable Email Routing

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain. Go to **Email**.
1. If this is your first time opening the Email app, you will be presented with an explanation of what Email Routing is. Click **Configure Email Routing** to start.

  <Aside type="note">

  This guided experience is only available when Email Routing is not configured in the zone you are in.

  </Aside>

1. In **Custom addresses**, click **Create address**. Enter the email alias you want to use in the **Custom address** field (like `my-new-email`).
1. In the **Destination address** field, enter the full email address you want your emails to be forwarded to — like `your-name@gmail.com`.
1. Click Save.

Cloudflare will send you a verification email to the address provided in the **Destination address** field. You must click **Verify email address** in the verification email address to activate Email Routing.