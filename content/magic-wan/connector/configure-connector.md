---
pcx_content_type: how-to
title: Configure Magic WAN Connector (beta)
weight: 1
---

# Configure Magic WAN Connector (beta)

## Prerequisites

You need [Magic WAN](/magic-wan/get-started/) to be able to use the Magic WAN Connector (beta). The Magic WAN Connector (beta) can function as your primary edge device for your network, or be deployed in-line with existing network gear.

Refer to the following steps to configure your Magic WAN Connector (beta).

## 1. Purchase a Magic WAN Connector device

Contact your account representative to learn more about purchasing options for the Magic WAN Connector (beta) device.

## 2. Define a site configuration

Sites represent the local network where you have installed your Magic WAN Connector (beta) - for example, a branch office location.

To add a site:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Navigate to **Magic WAN** > **Sites**.
3. The list of sites will be empty if this is your first time adding a site. Select **Add site** to create a new one and start the configuration wizard.
4. Add a name and description for your new site. 
5. Under **Connector**, select **Add Connector**. This will show a list of Magic WAN Connector devices associated with your account.
6. Choose from the list the correct Connector corresponding to the site you are creating, and select **Add Connector**.
    1. (Optional) Under the Connector view, you can also define a **service interrupt window** for your Site. This is the time period when the Magic WAN Connector software can update, which may result in interruption to existing connections.
7. Select **Next** to proceed to configuring your network.
8. Under **WAN configuration**, select **Create**.
    1. Enter a descriptive name for your WAN.
    2. (Optional) Specify a VLAN ID and port for your WAN.
    3. Specify whether the WAN IP should be DHCP or static IP. If you choose a static IP, you also need to specify the static IP and gateway IP addresses.
9. Repeat this process to define your LAN configuration.
10. Select **Save and exit** to finish your configuration. Tunnels and static routes will be automatically created and associated with your Site once the Magic WAN Connector boots up (refer to the next step).

## 3. Set up your Magic WAN Connector (beta)

The Magic WAN Connector (beta) will only establish a connection to the Cloudflare network when it is activated, so we recommend leaving it deactivated until you are ready to establish the connection.

When the Connector is first activated, one of the ports must be connected to the Internet through a route that supports DHCP. This is required so that the Connector can reach the Cloudflare global network and download the required configurations that you set up in the **Site configuration** step.

When you are ready to connect your Magic WAN Connector (beta) to the Cloudflare network, the first step is to navigate to the Cloudflare dashboard and activate the Connector:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **Magic WAN** > **Configuration** > **Connectors**.
3. Find the Connector you want to activate, and select **Edit**. Make sure you verify the serial number to choose the right connector you want to activate.
4. In the new window, the **Status** dropdown will show as **Inactive**. Select it to change the status to **Activated**.
5. Select **Update**.

{{<Aside type="note">}}
 If your final network configuration is based on a static IP address without a route to the Internet that has DHCP enabled:

1. Wait 60 seconds
2. Remove the route to the Internet with DHCP.
3. Adjust your physical connections as required in order to match the configuration specified in the *Site configuration* step (for example, static IP WAN plugged into physical port with no DHCP connection)
4. Power cycle the Connector.

{{</Aside>}}
