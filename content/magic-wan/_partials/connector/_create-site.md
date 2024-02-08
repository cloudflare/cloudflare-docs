---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: wan;;lan
---

Sites represent the local network where you have installed your Magic WAN Connector — for example, a branch office location.

You need to create a site and set up all the settings associated with it before you can connect your Magic WAN Connector to the Internet.

To add a site:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **Magic WAN** > **Sites**.
3. Select **Create** to create a new site and start the configuration wizard.
4. Add a name and description for your new site.
5. Under **Connector**, select **Add Connector**. This will show you a list of Magic WAN Connector devices associated with your account. You need to have bought a Connector already for it to show up here. Refer to [Prerequisites](#prerequisites) if no Connector shows in this list.
6. If you have more than one Connector, choose the one that corresponds to the site you are creating. Connectors are identified by a serial number, also known as a service tag. Use this information to choose the right Connector. Select **Add Connector** when you are ready to proceed.
7. The Connector will be added to your site with an **Interrupt service window** defined. This is the time period when the Magic WAN Connector software can update, which may result in interruption to existing connections. You can change this later. Refer to [Device activation](#device-activation) for more details.
8. Select **Next** to proceed to creating your WAN and LAN networks.

### Create a WAN

1. In **WAN configuration**, select **Create**. You can create one or more [wide area network (WAN)](https://www.cloudflare.com/learning/network-layer/what-is-a-wan/). Configuring multiple WANs will create multiple {{<glossary-tooltip term_id="IPsec tunnel">}}IPsec{{</glossary-tooltip>}} tunnels. This allows the Connector to failover between circuits according to their {{<glossary-tooltip term_id="tunnel health-check" link="/magic-wan/reference/tunnel-health-checks/">}}health{{</glossary-tooltip>}}.
2. In **Network name**, enter a descriptive name for your WAN.
3. In **VLAN ID**, specify a [VLAN ID](/magic-wan/configuration/connector/reference/#vlan-id) to create virtual LANs.
4. **Physical port** $1
5. In **Priority**, choose the priority for your WAN. Lower numbers have higher priority. Refer to {{<glossary-tooltip term_id="traffic steering" link="/magic-wan/reference/traffic-steering/">}}Traffic steering{{</glossary-tooltip>}} to learn more about how Cloudflare calculates priorities.
6. **Addressing**: Specify whether the WAN IP is fetched from a DHCP server or if it is a static IP. If you choose a static IP, you also need to specify the static IP and gateway addresses.

  <div class="medium-img">

  ![An example of how to configure you Magic WAN Connector WAN](/images/magic-wan/connector/wan-config.png)

  </div>

6. Select **Save** when you are finished.

### Create a LAN

Magic WAN Connector supports different types of DHCP configurations. You can define that Magic WAN Connector should:
- Connect to a DHCP server.
- Use a static IP address instead of connecting to a DHCP server.
- Act as a DHCP server.
- Use DHCP relay to connect to a DHCP server outside the location your Magic WAN Connector is in.

To create a LAN:

1. In **LAN configuration**, select **Create**.
2. Enter a descriptive name for your LAN in **Network name**.
3. In **VLAN ID**, specify a [VLAN ID](/magic-wan/configuration/connector/reference/#vlan-id) to create virtual LANs.
4. **Physical port** $2
5. **Overlay subnet** is the subnet behind Magic WAN Connector. This should match the static address if you choose to set up your Connector with a static address.
6. In **Addressing** define if the IP address for the Connector is fetched from a DHCP server, or if it is a static address:
    1. **DHCP**: Choose this option if the IP address for your Connector is fetched from a DHCP server.
    2. **Static**: Choose this option if your Connector needs a static address. Enter the IP address in **Static address**. When you use a static address, you can also set up the Connector to be a [DHCP server](#dhcp-server).
7. Select **Save**.
8. Select **Save and exit** to finish your configuration. Tunnels and {{<glossary-tooltip term_id="static route">}}static routes{{</glossary-tooltip>}} will be automatically created and associated with your site once the Magic WAN Connector boots up (refer to the next step).


#### DHCP server

When you use a static IP address, Magic WAN Connector can also act as a DHCP server in your network. To enable this feature:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **Magic WAN** > **Sites**.
3. Select your site > **Edit**.
4. Select **Network**.
5. In **LAN configuration**, select the LAN where you want to enable DHCP server.
6. Select **Edit**.
7. Under **Addressing**, select **Static**, and enter the static IP address for your Connector.
8. Select **This is a DHCP Server**. You also have to specify:
    1. The DNS server address
    2. The DHCP pool start
    3. The DHCP pool end

    For example:

    <div class="medium-img">

    ![An example of how to configure you Magic WAN Connector LAN](/images/magic-wan/connector/lan-static.png)

    </div>

#### DHCP static address reservation

If you configure your Connector to be a DHCP server, you can also assign IP addresses to specific devices on your network. To reserve IP addresses:

1. Configure your Connector to be a [DHCP server](#dhcp-server).
2. Select **Add DHCP Reservation**.
3. In **Hardware Address** enter the [MAC address](https://en.wikipedia.org/wiki/MAC_address) for the device you want a specific IP address for.
4. In **IP Address**, enter the IP address for that device.
5. (Optional) If you need to reserve more IP addresses, select **Add DHCP Reservation** as many times as needed, and enter the new values.

#### DHCP relay

DHCP Relay provides a way for DHCP clients to communicate with DHCP servers that are not available on the same local subnet/broadcast domain. When you enable DHCP Relay, Magic WAN Connector forwards DHCP discover messages to a predefined DHCP server, and routes the responses back to the original device that sent the discover message.

To configure DHCP relay:

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