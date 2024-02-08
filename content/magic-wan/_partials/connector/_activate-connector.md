---
_build:
  publishResources: false
  render: never
  list: never
---

The Magic WAN Connector is shipped to you deactivated, and will only establish a connection to the Cloudflare network when it is activated. Cloudflare recommends leaving it deactivated until you are ready to establish the connection.

When the Connector is first activated, one of the ports must be connected to the Internet through a device that supports DHCP. This is required so that the Connector can reach the Cloudflare global network and download the required configurations that you set up in the [Site configuration](#create-a-site) step.

{{<Aside type="warning">}}Remember to connect Magic WAN Connector through a route that supports DHCP for its first connection to the Internet. Otherwise, Connector will not work.{{</Aside>}}

When you are ready to connect your Magic WAN Connector to the Cloudflare network:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **Magic WAN** > **Configuration** > **Connectors**.
3. Find the Connector you want to activate, select the three dots next to it > **Edit**. Make sure you verify the serial number to choose the right connector you want to activate.
4. In the new window, the **Status** dropdown will show as **Deactivated**. Select it to change the status to **Activated**.
5. The **Interrupt service window** is the time period when the Magic WAN Connector software can update, which may result in interruption to existing connections. Choose a time period to minimize disruption to your sites.
5. Select **Update**.