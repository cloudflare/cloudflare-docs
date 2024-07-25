---
pcx_content_type: how-to
title: DHCP static address reservation
---

# DHCP static address reservation

If you configure your Connector to be a DHCP server, you can also assign IP addresses to specific devices on your network. To reserve IP addresses:

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. Configure your Connector to be a [DHCP server](/magic-wan/configuration/connector/network-options/dhcp/dhcp-server/).
2. Select **Add DHCP Reservation**.
3. In **Hardware Address** enter the [MAC address](https://en.wikipedia.org/wiki/MAC_address) for the device you want a specific IP address for.
4. In **IP Address**, enter the IP address for that device.
5. (Optional) If you need to reserve more IP addresses, select **Add DHCP Reservation** as many times as needed, and enter the new values.

{{</tab>}}
{{<tab label="api" no-code="true">}}

{{<render file="connector/_account-id-api-key" >}}

Create a [`PUT` request](/api/operations/magic-site-lans-update-lan) to update the LAN where you want to reserve addresses:

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
        "reservations": {
          "<HARDWARE_MAC_ADDRESS>": "<IP_ADDRESS>",
          "<HARDWARE_MAC_ADDRESS_2>": "<IP_ADDRESS>"
        }
      }
    }
  }
}'
```

{{</tab>}}
{{</tabs>}}

