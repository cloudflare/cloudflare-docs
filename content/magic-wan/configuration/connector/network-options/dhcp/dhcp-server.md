---
pcx_content_type: how-to
title: DHCP server
---

# DHCP server

When you use a static IP address, Magic WAN Connector can also act as a DHCP server in your network. To enable this feature:

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **Magic WAN** > **Sites**.
3. Select your site > **Edit**.
4. Select **Network**.
5. In **LAN configuration**, select the LAN where you want to enable DHCP server.
6. Select **Edit**.
7. Under **Static addressing**, select **This is a DHCP Server**. You also have to specify:
    - The DNS server address
    - The DHCP pool start
    - The DHCP pool end

    For example:

    <div class="medium-img">

    ![An example of how to configure you Magic WAN Connector LAN](/images/magic-wan/connector/lan-static.png)

    </div>

{{</tab>}}
{{<tab label="api" no-code="true">}}

{{<render file="connector/_account-id-api-key" >}}

Create a [`PUT` request](/api/operations/magic-site-lans-update-lan) to update the LAN where you want to enable DHCP server:

Example:

```bash
curl --request PUT \
https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/sites/{site_id}/lans/{lan_id} \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{
  "lan": {
    "static_addressing": {
      "dhcp_server": {
        "dhcp_pool_end": "<IP_ADDRESS>",
        "dhcp_pool_start": "<IP_ADDRESS>",
        "dns_server": "<IP_ADDRESS>"
      }
    }
  }
}'
```

{{</tab>}}
{{</tabs>}}