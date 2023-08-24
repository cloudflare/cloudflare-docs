---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: productName
---

# GRE and IPsec tunnel analytics

[Network Analytics](/analytics/network-analytics/) gives you real-time visibility into $1 traffic entering and leaving Cloudflare’s network through GRE or IPsec tunnels. Start by inspecting information from the source and destination tunnel panels in Network Analytics to learn more about your data.

Source / destination tunnel data in Network Analytics includes:

- A list of your top tunnels by traffic volume.
- Source and destination IP addresses, ports, and protocols of tunnel traffic.
- Samples of all GRE or IPsec tunnel traffic entering or leaving Cloudflare’s network.
- Mitigations applied (DDoS, Magic Firewall, etc.) to traffic entering Cloudflare.

## Access tunnel analytics

1. Go to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Select **Analytics & Logs** > **Network Analytics**.
3. In the **All Traffic** tab, scroll to **Top Insights** to access the **Source tunnel** and **Destination tunnel** panels. Here you can examine information from your top tunnels by traffic volume.
4. You can also apply filters to adjust the scope of information displayed. Scroll to **All traffic** > **Add filter**.
5. In the **New filter** popover, choose what type of data you want to display from the left dropdown menu, an operator from the middle dropdown menu, and an action from the right dropdown menu. For example:

    ```txt
    <DESTINATION_TUNNELS> | _equals_ | <NAME_OF_YOUR_TUNNEL>
    ```

    This lets you examine traffic from specific Source tunnels and/or Destination tunnels.

## Feature Notes:

- For Magic Transit customers, `Non-tunnel traffic` will often represent traffic from the public Internet or traffic via [CNIs](/network-interconnect/).
- For Magic WAN customers, `Non-tunnel traffic` refers to traffic outside of GRE or IPsec tunnels. This can include traffic from:
    - [WARP](/cloudflare-one/connections/connect-devices/warp/)
    - [CNIs](/network-interconnect/)
    - Traffic destined for the public Internet via [Gateway](/cloudflare-one/policies/gateway/)
    - Traffic destined for applications behind [Cloudflare Tunnel](/cloudflare-one/connections/connect-networks/)

The label `Non-Tunnel traffic` is a placeholder, and more specific labels will be applied to this category of traffic in the near future.