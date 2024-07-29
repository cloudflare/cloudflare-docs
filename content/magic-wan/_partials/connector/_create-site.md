---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: wan;;lan;;noConnectorShows
---

### 1. Create a site

Sites represent the local network where you have installed your Magic WAN Connector — for example, a branch office location.

You need to create a site and set up all the settings associated with it before you can connect your Magic WAN Connector to the Internet.

To add a site:

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **Magic WAN** > **Sites**.
3. Select **Create** to create a new site and start the configuration wizard.
4. Add a name and description for your new site.
5. (Optional) In **Site location**, you can add the geographical coordinates for your site. If you add geographical coordinates, your site will show up in the [Site Analytics overview map](/magic-wan/analytics/site-analytics/).
6. Under **Connector**, select **Add Connector**. This will show you a list of Magic WAN Connector devices associated with your account. $3
7. If you have more than one Connector, choose the one that corresponds to the site you are creating. Connectors are identified by a serial number, also known as a service tag. Use this information to choose the right Connector. Select **Add Connector** when you are ready to proceed.
8. The Connector will be added to your site with an **Interrupt window** defined. The interrupt window is the time period when the Magic WAN Connector software can update, which may result in interruption to existing connections. You can change this later. Refer to [Interrupt window](/magic-wan/configuration/connector/maintenance/interrupt-service-window/) for more details on how to define when the Connector can update its systems.
9. Select **Next** to proceed to creating your WAN and LAN networks.

{{</tab>}}
{{<tab label="api" no-code="true">}}

{{<render file="connector/_account-id-api-key" >}}

Create a `POST` request [using the API](/api/operations/magic-sites-create-site) to create a site.

Example:

```bash
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/sites \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{
  "site": {
    "description": "<SITE_DESCRIPTION>",
    "name": "<SITE_NAME>"
  }
}'
```

If you created your site successfully, you should receive a message similar to the following:

```json
{
  "result": {
    "site": {
      "id": "<SITE_ID>",
      "name": "<SITE_NAME>",
      "description": "<SITE_DESCRIPTION>",
      "connector_id": null,
      "secondary_connector_id": null,
      "ha_mode": false
    }
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

Take note of the site `id` parameter, as you will need it to create WANs and LANs.

{{</tab>}}
{{</tabs>}}

### 2. Create a WAN

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. In **WAN configuration**, select **Create**. You can create one or more [wide area networks (WANs)](https://www.cloudflare.com/learning/network-layer/what-is-a-wan/). Configuring multiple WANs will create multiple {{<glossary-tooltip term_id="IPsec tunnel">}}IPsec{{</glossary-tooltip>}} tunnels. This allows the Connector to failover between circuits according to their {{<glossary-tooltip term_id="tunnel health-check" link="/magic-wan/reference/tunnel-health-checks/">}}health{{</glossary-tooltip>}}.
2. In **Interface name**, enter a descriptive name for your WAN.
3. **Interface number** $1
4. In **VLAN ID**, enter a number between `0` and `4094` to specify a [VLAN ID](/magic-wan/configuration/connector/reference/#vlan-id).
5. In **Priority**, choose the priority for your WAN. Lower numbers have higher priority. Refer to {{<glossary-tooltip term_id="traffic steering" link="/magic-wan/reference/traffic-steering/">}}Traffic steering{{</glossary-tooltip>}} to learn more about how Cloudflare calculates priorities.
6. **Addressing**: Specify whether the WAN IP is fetched from a DHCP server or if it is a static IP. If you choose a static IP, you also need to specify the static IP and gateway addresses.

  <div class="medium-img">

  ![An example of how to configure you Magic WAN Connector WAN](/images/magic-wan/connector/wan-config.png)

  </div>

7. Select **Save** when you are finished.

{{</tab>}}
{{<tab label="api" no-code="true">}}

{{<render file="connector/_account-id-api-key" >}}

Create a `POST` request [using the API](/api/operations/magic-site-wans-create-wan) to create a WAN.

The `static_addressing` object is optional. Omit it if you are using DHCP. If you are using static addressing, add the `secondary_address` parameter when your site is in high availability (HA) mode.

Example:

```bash
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/sites/{site_id}/wans \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{
  "wan": {
    "description": "<YOUR_WAN_NAME>",
    "physport": 1,
    "priority": 0,
    "vlan_tag": 0
  }
}'
```

{{</tab>}}
{{</tabs>}}

### 3. Create a LAN

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. In **LAN configuration**, select **Create**.
2. Enter a descriptive name for your LAN in **Interface name**.
3. **Interface number** $2
4. In **VLAN ID**, specify a [VLAN ID](/magic-wan/configuration/connector/reference/#vlan-id) to create virtual LANs.
5. In **Static addressing** > **Static address** give your Connector's LAN interface its IP address. You can also enable the following options if they suit your use case:
    - **This is a DHCP server**: If your Connector is a [DHCP server](/magic-wan/configuration/connector/network-options/dhcp/dhcp-server/).
    - **This is a DHCP relay**: If your Connector is a [DHCP relay](/magic-wan/configuration/connector/network-options/dhcp/dhcp-relay/).
6. (Optional) In **Directly attached subnet** > **Static NAT prefix**, enter a CIDR prefix to enable NAT (network address translation). The prefix you enter here should be the same size as the prefix entered in **Static addressing**. For example, both networks have a subnet mask of `/24`: `192.168.100.0/24` and `10.10.100.0/24`.
7. (Optional) If your LAN contains additional subnets behind a layer 3 router, select **Add routed subnet** under **Routed subnets** to add them:
    - **Prefix**: The CIDR prefix for the subnet behind the L3 router.
    - **Next hop**:  The address of the L3 router to which the Connector should forward packets for this subnet.
    - **Static NAT prefix**: Optional setting. If you want to enable NAT for a routed subnet, supply an "external" prefix for the overlay-facing side of the NAT to use. It must be the same size as **Prefix**.

        Refer to [Routed subnets](/magic-wan/configuration/connector/network-options/routed-subnets/) for more information.

8. Select **Save**.
9. Select **Save and exit** to finish your configuration. Tunnels and {{<glossary-tooltip term_id="static route">}}static routes{{</glossary-tooltip>}} will be automatically created and associated with your site once the Magic WAN Connector boots up (refer to the next step).

{{</tab>}}
{{<tab label="api" no-code="true">}}

{{<render file="connector/_account-id-api-key" >}}

Create a `POST` request [using the API](/api/operations/magic-site-lans-create-lan) to create a LAN.

Example:

```bash
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/sites/{site_id}/lans \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{
  "lan": {
    "description": "<YOUR_LAN_NAME>",
    "physport": 2,
    "static_addressing": {
      "address": "172.16.14.0/24"
    },
    "vlan_tag": 0
  }
}'
```

{{</tab>}}
{{</tabs>}}

#### Network segmentation

After setting up your LANs, you can configure your Connector to enable communication between them without traffic leaving your premises. Refer to [Network segmentation](/magic-wan/configuration/connector/network-options/network-segmentation/) for more information.

#### DHCP options

Magic WAN Connector supports different types of DHCP configurations. Connector can:

- Connect to a DHCP server or use a static IP address instead of connecting to a DHCP server.
- Act as a [DHCP server](/magic-wan/configuration/connector/network-options/dhcp/dhcp-server/).
- Use [DHCP relay](/magic-wan/configuration/connector/network-options/dhcp/dhcp-relay/) to connect to a DHCP server outside the location your Magic WAN Connector is in.
- [Reserve IP addresses](/magic-wan/configuration/connector/network-options/dhcp/dhcp-static-address-reservation/) for specific devices on your network.

Refer to [DHCP options](/magic-wan/configuration/connector/network-options/dhcp/) to learn more.