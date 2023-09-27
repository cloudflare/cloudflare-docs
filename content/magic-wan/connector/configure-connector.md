---
pcx_content_type: how-to
title: Configuration
weight: 1
---

# Configure Magic WAN Connector (beta)

## Prerequisites

You need [Magic WAN](/magic-wan/get-started/) to be able to use the Magic WAN Connector (beta). The Magic WAN Connector can function as your primary edge device for your network, or be deployed in-line with existing network gear.

Refer to the following steps to configure your Magic WAN Connector.

## 1. Purchase a Magic WAN Connector device

Contact your account representative to learn more about purchasing options for the Magic WAN Connector device. After buying Magic WAN Connector, the device will be registered with your Cloudflare account and show up in your Cloudflare dashboard. 

## 2. Define a site configuration

Sites represent the local network where you have installed your Magic WAN Connector — for example, a branch office location.

To add a site:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **Magic WAN** > **Sites**.
3. Select **Create** to create a new site and start the configuration wizard.
4. Add a name and description for your new site. 
5. Under **Connector**, select **Add Connector**. This will show you a list of Magic WAN Connector devices associated with your account.
6. Choose from the list the Connector corresponding to the site you are creating. Connectors are identified by a serial number, also known as a service tag. Select **Add Connector** when you are ready to proceed.
7. The Connector will be added to your site with an **Interrupt service window** defined. This is the time period when the Magic WAN Connector software can update, which may result in interruption to existing connections. You can change this later. Refer to [Set up your Magic WAN Connector](#3-set-up-your-magic-wan-connector) for more details.
8. Select **Next** to proceed.
9. Under **WAN configuration**, select the three dots in the **Default WAN interface** > **Edit** to configure your WAN (you should only have one WAN interface in this list):
    1. **Network name**: Enter a descriptive name for your WAN.
    2. **(Optional) VLAN ID**: Specify a VLAN ID and port for your WAN.
    3. **Physical port**: This refers to the physical Magic WAN Connector port that you are using for your WAN.
    4. **Addressing**: Specify whether the WAN IP should be fetched from a DHCP server or if it is a static IP. If you choose a static IP, you also need to specify the static IP and gateway IP addresses.

    <div class="medium-img">

    ![An example of how to configure you Magic WAN Connector WAN](/images/magic-wan/connector/wan-config.png)

    </div>

10. Select **Save** when you are finished.

11. In **LAN configuration**, select **Create**, and repeat the process to define your LAN:
    1. **Network name**: Enter a descriptive name for your LAN.
    2. **(Optional) VLAN ID**: Specify a VLAN ID and port for your LAN.
    3. **Physical port**: This refers to the physical Magic WAN Connector port's number that you are using for your LAN.
    4. **Overlay subnet**: The subnet behind Magic WAN Connector. This should match the static address if you choose to set up your Connector with a static address.
    5. **Addressing**: Specify if your IP address should be fetched from a DHCP server, or if it is a static address.
    6. **(Optional) This is a DHCP Server**: Enable this to set up the Connector as a DHCP server. If you enable this option, you will also have to specify:
        - The DNS server address
        - The DHCP pool start
        - The DHCP pool end

    For example:

    <div class="medium-img">

    ![An example of how to configure you Magic WAN Connector LAN](/images/magic-wan/connector/lan-config.png)

    </div>

12. Select **Save** when you are finished.

13. Select **Save and exit** to finish your configuration. Tunnels and static routes will be automatically created and associated with your site once the Magic WAN Connector boots up (refer to the next step).

## 3. Set up your Magic WAN Connector

The Magic WAN Connector is shipped to you deactivated, and will only establish a connection to the Cloudflare network when it is activated. Cloudflare recommends leaving it deactivated until you are ready to establish the connection.

### Device installation

There are several deployment options for Magic WAN Connector. Connector can act like a DCHP server for your local network, or integrate with your local set up and have static IP addresses assigned to it.

If there is a firewall deployed upstream of the Magic WAN Connector, configure it to allow traffic on ports `443` and `4500`. This is needed to allow Magic WAN Connector's initiation traffic with Cloudflare.

{{<Aside type="note">}}LAN to LAN communication in Magic WAN Connector is not yet supported. If you have a LAN set up on port one of Magic WAN Connector and need to communicate with the LAN set up behind LAN port two, packets will be routed through Cloudflare first before reaching their destination.{{</Aside>}}

### Device activation

When the Connector is first activated, one of the ports must be connected to the Internet through a route that supports DHCP. This is required so that the Connector can reach the Cloudflare global network and download the required configurations that you set up in the [Site configuration](#2-define-a-site-configuration) step.

When you are ready to connect your Magic WAN Connector to the Cloudflare network:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **Magic WAN** > **Configuration** > **Connectors**.
3. Find the Connector you want to activate, and select **Edit**. Make sure you verify the serial number to choose the right connector you want to activate.
4. In the new window, the **Status** dropdown will show as **Deactivated**. Select it to change the status to **Activated**.
5. The **Interrupt service window** is the time period when the Magic WAN Connector software can update, which may result in interruption to existing connections. Choose a time period to minimize disruption to your sites.
5. Select **Update**.

{{<Aside type="note">}}
 If your final network configuration is based on a static IP address without a route to the Internet that has DHCP enabled:

1. Wait 60 seconds.
2. Remove the route to the Internet with DHCP.
3. Adjust your physical connections as required to match the configuration specified in the *Site configuration* step (for example, static IP WAN plugged into physical port with no DHCP connection).
4. Power cycle the Connector.

{{</Aside>}}