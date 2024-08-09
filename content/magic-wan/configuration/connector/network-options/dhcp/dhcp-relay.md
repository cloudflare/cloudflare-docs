---
pcx_content_type: how-to
title: DHCP relay
---

# DHCP relay

DHCP Relay provides a way for DHCP clients to communicate with DHCP servers that are not available on the same local subnet/broadcast domain. When you enable DHCP Relay, Magic WAN Connector forwards DHCP discover messages to a predefined DHCP server, and routes the responses back to the original device that sent the discover message.

```mermaid
flowchart LR
accTitle: An example of Connector in DHCP Relay mode
    a(Magic WAN Connector) --> b(Internet) --> c(DHCP server)

    subgraph Customer site
    d[LAN 1] <--> a
    e[LAN 2] <--> a
    end

    c --> a
    classDef orange fill:#f48120,color: black
    class a orange
```
_The above graph shows Connector sending DHCP discover messages to a DHCP server offsite._

To configure DHCP relay:

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **Magic WAN** > **Sites**.
3. Select your site > **Edit**.
4. Select **Network**.
5. In **LAN configuration**, select the LAN where you need to configure DHCP relay.
6. Select **Edit**.
7. Select **This is a DHCP Relay**.
8. In **Upstream DHCP server addresses**, enter the IP address of your DHCP server.
9. (Optional) If you need to add more DHCP server addresses, select **Add upstream DHCP server address** as many times as needed, and enter the new values.

{{</tab>}}
{{<tab label="api" no-code="true">}}

{{<render file="connector/_account-id-api-key" >}}

Create a [`PUT` request](/api/operations/magic-site-lans-update-lan) to update the LAN where you want to enable DHCP relay:

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
      "dhcp_relay": {
        "server_addresses": [
          "192.0.2.1"
        ]
      }
    }
  }
}'
```

{{</tab>}}
{{</tabs>}}