---
pcx_content_type: how-to
title: Configuration
weight: 3
---

# Configure Magic WAN Connector

## Prerequisites

1. You need to purchase [Magic WAN](https://www.cloudflare.com/magic-wan/) before you can purchase and use the Magic WAN Connector. The Magic WAN Connector can function as your primary edge device for your network, or be deployed in-line with existing network gear.

2. You also need to purchase Magic WAN Connector before you can start configuring your settings in the Cloudflare dashboard. Contact your account representative to learn more about purchasing options for the Magic WAN Connector device. After buying Magic WAN Connector, the device will be registered with your Cloudflare account and show up in your Cloudflare dashboard.

---

## 1. Configure Cloudflare dashboard settings

### Create a site

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
8. Select **Next** to proceed.

### Create a WAN

1. In **WAN configuration**, select **Create**. You can create one or more [wide area network (WAN)](https://www.cloudflare.com/learning/network-layer/what-is-a-wan/). Configuring multiple WANs will create multiple {{<glossary-tooltip term_id="IPsec tunnel">}}IPsec{{</glossary-tooltip>}} tunnels. This allows the Connector to failover between circuits according to their {{<glossary-tooltip term_id="tunnel health-check" link="/magic-wan/reference/tunnel-health-checks/">}}health{{</glossary-tooltip>}}.
2. In **Network name**, enter a descriptive name for your WAN.
3. **Physical port** refers to the physical Magic WAN Connector Ethernet port that you are using for your WAN. The ports are labeled `GE1`, `GE2`, `GE3`, `GE4`, `GE5`, and `GE6`. Choose the number corresponding to the port that you are using in Connector.
4. In **Priority**, choose the priority for your WAN. Lower numbers have higher priority. Refer to {{<glossary-tooltip term_id="traffic steering" link="/magic-wan/reference/traffic-steering/">}}Traffic steering{{</glossary-tooltip>}} to learn more about how Cloudflare calculates priorities.
5. **Addressing**: Specify whether the WAN IP is fetched from a DHCP server or if it is a static IP. If you choose a static IP, you also need to specify the static IP and gateway addresses.

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
3. **Physical port** refers to the physical Magic WAN Connector Ethernet port that you are using for your LAN. The ports are labeled `GE1`, `GE2`, `GE3`, `GE4`, `GE5`, and `GE6`. Choose a number corresponding to the port that you are using in Connector.
4. **Overlay subnet** is the subnet behind Magic WAN Connector. This should match the static address if you choose to set up your Connector with a static address.
5. In **Addressing** define if the IP address for the Connector is fetched from a DHCP server, or if it is a static address:
    1. **DHCP**: Choose this option if the IP address for your Connector is fetched from a DHCP server.
    2. **Static**: Choose this option if your Connector needs a static address. Enter the IP address in **Static address**. When you use a static address, you can also set up the Connector to be a [DHCP server](#dhcp-server).
6. Select **Save**.
7. Select **Save and exit** to finish your configuration. Tunnels and {{<glossary-tooltip term_id="static route">}}static routes{{</glossary-tooltip>}} will be automatically created and associated with your site once the Magic WAN Connector boots up (refer to the next step).


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

## 2. Set up your Magic WAN Connector

The Magic WAN Connector is shipped to you deactivated, and will only establish a connection to the Cloudflare network when it is activated. Cloudflare recommends leaving it deactivated until you are ready to establish the connection.

### Device installation

There are several deployment options for Magic WAN Connector. Connector can act like a DHCP server for your local network, or integrate with your local set up and have static IP addresses assigned to it.

LAN to LAN communication in Magic WAN Connector is not yet supported. If you have a LAN set up on port one of Magic WAN Connector and need to communicate with the LAN set up behind LAN port two, packets will be routed through Cloudflare first before reaching their destination.

#### Firewall settings required

If there is a firewall deployed upstream of the Magic WAN Connector, configure the firewall to allow the following traffic:

- **UDP/53 (DNS destination IP 1.1.1.1)**: Needed to allow DNS traffic to Cloudflare DNS servers. Cloudflare uses this port for DNS lookups of control plane API endpoints.
- **TCP/443**: The Connector will open outbound HTTPS connections over this port for control plane operations.
- **UDP/4500 (destination IP 162.159.64.1)**: Needed for Connector's initialization and discovery traffic through outbound connections.
- **UDP/4500 (destination IP - Cloudflare Anycast IPs)**: Needed for the Cloudflare {{<glossary-tooltip term_id="anycast" link="/magic-wan/configuration/manually/how-to/configure-tunnels/">}}Anycast IPs{{</glossary-tooltip>}} assigned to your account for tunnel outbound connections. This traffic is tunnel traffic.
- **TCP/7844, UDP/7844 Outbound connections**: This is for debugging facilities in the connector.

### Device activation

When the Connector is first activated, one of the ports must be connected to the Internet through a device that supports DHCP. This is required so that the Connector can reach the Cloudflare global network and download the required configurations that you set up in the [Site configuration](#2-define-a-site-configuration) step.

{{<Aside type="warning">}}Remember to connect Magic WAN Connector through a route that supports DHCP for its first connection to the Internet. Otherwise, Connector will not work.{{</Aside>}}

When you are ready to connect your Magic WAN Connector to the Cloudflare network:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **Magic WAN** > **Configuration** > **Connectors**.
3. Find the Connector you want to activate, select the three dots next to it > **Edit**. Make sure you verify the serial number to choose the right connector you want to activate.
4. In the new window, the **Status** dropdown will show as **Deactivated**. Select it to change the status to **Activated**.
5. The **Interrupt service window** is the time period when the Magic WAN Connector software can update, which may result in interruption to existing connections. Choose a time period to minimize disruption to your sites.
5. Select **Update**.

{{<Aside type="note">}}
 If your final network configuration is based on a static IP address without a route to the Internet that has DHCP enabled:

1. Wait 60 seconds.
2. Unplug the physical connection to the Internet-connected device which provides DHCP.
3. Adjust your physical connections as required to match the configuration specified in the [Site configuration](#2-define-a-site-configuration) step (for example, static IP WAN plugged into physical port with no DHCP connection).
4. Power cycle the Connector.

{{</Aside>}}

---

## IP sec tunnels and static routes

Magic WAN Connector automatically creates [IPsec tunnels](/magic-wan/configuration/manually/how-to/configure-tunnels/#add-tunnels) and [static routes](/magic-wan/configuration/manually/how-to/configure-static-routes/) for you. You cannot configure these manually.

To check the IPsec tunnels and static routes created by your Magic Wan Connector:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **Magic WAN** > **Sites**.
3. Select the name of the site for which you want to check the Connector's IPsec tunnels and static routes, and select **Edit**.
4. Select **Tunnels** to check IPsec tunnels, and **Routes** for the static routes.

---

## Maintenance

After setting up your Magic WAN Connector, there are a few settings you can change in the Cloudflare dashboard. You can also check your Magic WAN [Connector's heartbeat](/magic-wan/configuration/connector/device-information/#heartbeat).

{{<Aside type="note">}}[ICMP traffic](https://www.cloudflare.com/learning/ddos/glossary/internet-control-message-protocol-icmp/) is routed through the Internet and bypasses [Cloudflare Gateway](/cloudflare-one/policies/gateway/). This enables you to ping resources on the Internet from the Magic WAN connector directly, which can be useful for debugging.{{</Aside>}}

### Deactivate Magic WAN Connector

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **Magic WAN** > **Configuration** > **Connectors**.
3. Find the Connector you want to deactivate, select the three dots next to it > **Edit**.
4. In Status, select _Deactivated_ from the dropdown.
5. Select **Update**.

### Change the Interrupt service Window

The interrupt service window defines when Magic WAN Connector can update its systems. When Magic WAN Connector is updating, this may result in an interruption to existing connections. Set up a time window that minimizes disruption to your sites.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **Magic WAN** > **Configuration** > **Connectors**.
3. Find the Connector you want to deactivate, select the three dots next to it > **Edit**.
4. In **Interrupt service window**, select the most appropriate time for the Connector to update its systems.