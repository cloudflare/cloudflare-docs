---
pcx_content_type: how-to
title: DHCP relay
---

# DHCP relay

DHCP Relay provides a way for DHCP clients to communicate with DHCP servers that are not available on the same local subnet/broadcast domain. When you enable DHCP Relay, Magic WAN Connector forwards DHCP discover messages to a predefined DHCP server, and routes the responses back to the original device that sent the discover message.

To configure DHCP relay:

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **Magic WAN** > **Sites**.
3. Select your site > **Edit**.
4. Select **Network**.
5. In **LAN configuration**, select the LAN where you need to configure DHCP relay.
6. Select **Edit**.
7. In **Addressing**, make sure you choose **Static** and enter a static IP address for your Connector.
8. Select **This is a DHCP Relay**.
9. In **Upstream DHCP server addresses**, enter the IP address of your DHCP server.
10. (Optional) If you need to add more DHCP server addresses, select **Add upstream DHCP server address** as many times as needed, and enter the new values.

{{</tab>}}
{{<tab label="api" no-code="true">}}

{{<render file="connector/_account-id-api-key" >}}

{{</tab>}}
{{</tabs>}}



Create a `POST` request [using the API](/api/operations/magic-wan-connectors-lans-create-lan) to create a LAN.

The following parameters are optional:
- [`nat`](/magic-wan/configuration/connector/network-options/nat-subnet/)
- [`routed_subnets`](/magic-wan/configuration/connector/network-options/routed-subnets/)
- [`dhcp_server`](/magic-wan/configuration/connector/network-options/dhcp/dhcp-server/)
- [`dhcp_relay`](/magic-wan/configuration/connector/network-options/dhcp/dhcp-relay/)

Example:

```bash
curl --request POST \
  --url https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/sites/{site_id}/lans \
  --header 'Content-Type: application/json' \
  --header 'X-Auth-Email: <EMAIL>' \
  --header 'X-Auth-Key: <API_KEY>' \
  --data '{
  "lan": {
    "description": "string",
    "ha_link": true,
    "nat": {
      "static_prefix": "192.0.2.0/24"
    },
    "physport": 1,
    "routed_subnets": [
      {
        "nat": {
          "static_prefix": "192.0.2.0/24"
        },
        "next_hop": "192.0.2.1",
        "prefix": "192.0.2.0/24"
      }
    ],
    "static_addressing": {
      "address": "192.0.2.0/24",
      "dhcp_relay": {
        "server_addresses": [
          "192.0.2.1"
        ]
      },
      "dhcp_server": {
        "dhcp_pool_end": "192.0.2.1",
        "dhcp_pool_start": "192.0.2.1",
        "dns_server": "192.0.2.1",
        "reservations": {
          "00:11:22:33:44:55": "192.0.2.100",
          "AA:BB:CC:DD:EE:FF": "192.168.1.101"
        }
      },
      "secondary_address": "192.0.2.0/24",
      "virtual_address": "192.0.2.0/24"
    },
    "vlan_tag": 0
  }
}'
```