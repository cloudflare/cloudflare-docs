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

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **Magic WAN** > **Sites**.
3. Select **Create** to create a new site and start the configuration wizard.
4. Add a name and description for your new site.
5. Under **Connector**, select **Add Connector**. This will show you a list of Magic WAN Connector devices associated with your account. $3
6. If you have more than one Connector, choose the one that corresponds to the site you are creating. Connectors are identified by a serial number, also known as a service tag. Use this information to choose the right Connector. Select **Add Connector** when you are ready to proceed.
7. The Connector will be added to your site with an **Interrupt service window** defined. This is the time period when the Magic WAN Connector software can update, which may result in interruption to existing connections. You can change this later. Refer to [Interrupt Service Window](/magic-wan/configuration/connector/maintenance/interrupt-service-window/) for more details.
8. Select **Next** to proceed to creating your WAN and LAN networks.

### 2. Create a WAN

1. In **WAN configuration**, select **Create**. You can create one or more [wide area networks (WANs)](https://www.cloudflare.com/learning/network-layer/what-is-a-wan/). Configuring multiple WANs will create multiple {{<glossary-tooltip term_id="IPsec tunnel">}}IPsec{{</glossary-tooltip>}} tunnels. This allows the Connector to failover between circuits according to their {{<glossary-tooltip term_id="tunnel health-check" link="/magic-wan/reference/tunnel-health-checks/">}}health{{</glossary-tooltip>}}.
2. In **Network name**, enter a descriptive name for your WAN.
3. In **VLAN ID**, specify a [VLAN ID](/magic-wan/configuration/connector/reference/#vlan-id) to create virtual LANs.
4. **Physical port** $1
5. In **Priority**, choose the priority for your WAN. Lower numbers have higher priority. Refer to {{<glossary-tooltip term_id="traffic steering" link="/magic-wan/reference/traffic-steering/">}}Traffic steering{{</glossary-tooltip>}} to learn more about how Cloudflare calculates priorities.
6. **Addressing**: Specify whether the WAN IP is fetched from a DHCP server or if it is a static IP. If you choose a static IP, you also need to specify the static IP and gateway addresses.

  <div class="medium-img">

  ![An example of how to configure you Magic WAN Connector WAN](/images/magic-wan/connector/wan-config.png)

  </div>

7. Select **Save** when you are finished.

### 3. Create a LAN

1. In **LAN configuration**, select **Create**.
2. Enter a descriptive name for your LAN in **Network name**.
3. In **VLAN ID**, specify a [VLAN ID](/magic-wan/configuration/connector/reference/#vlan-id) to create virtual LANs.
4. **Physical port** $2
5. **Overlay subnet** is the subnet behind Magic WAN Connector. This should match the static address if you choose to set up your Connector with a static address.
6. In **Addressing** define if the IP address for the Connector is fetched from a DHCP server, or if it is a static address:
    - **DHCP**: Choose this option if the IP address for your Connector is fetched from a DHCP server.
    - **Static**: Choose this option if your Connector needs a static address. Enter the IP address in **Static address**. When you use a static address, you can also set up the Connector to be a [DHCP server](/magic-wan/configuration/connector/dhcp/dhcp-server/).
7. Select **Save**.
8. Select **Save and exit** to finish your configuration. Tunnels and {{<glossary-tooltip term_id="static route">}}static routes{{</glossary-tooltip>}} will be automatically created and associated with your site once the Magic WAN Connector boots up (refer to the next step).

#### DHCP options

Magic WAN Connector supports different types of DHCP configurations. Connector can:

- Connect to a DHCP server or use a static IP address instead of connecting to a DHCP server.
- Act as a [DHCP server](/magic-wan/configuration/connector/dhcp/dhcp-server/).
- Use [DHCP relay](/magic-wan/configuration/connector/dhcp/dhcp-relay/) to connect to a DHCP server outside the location your Magic WAN Connector is in.
- [Reserve IP addresses](/magic-wan/configuration/connector/dhcp/dhcp-static-address-reservation/) for specific devices on your network.

Refer to [DHCP options](/magic-wan/configuration/connector/dhcp/) to learn more.