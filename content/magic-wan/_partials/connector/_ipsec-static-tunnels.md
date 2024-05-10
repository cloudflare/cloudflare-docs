---
_build:
  publishResources: false
  render: never
  list: never
---

Magic WAN Connector automatically creates [IPsec tunnels](/magic-wan/reference/tunnels/#ipsec-tunnels) and [static routes](/magic-wan/reference/traffic-steering/) for you. You cannot configure these manually.

To check the IPsec tunnels and static routes created by your Magic WAN Connector:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **Magic WAN** > **Sites**.
3. Select the name of the site for which you want to check the Connector's IPsec tunnels and static routes, and select **Edit**.
4. Select **Tunnels** to check IPsec tunnels, and **Routes** for the static routes.