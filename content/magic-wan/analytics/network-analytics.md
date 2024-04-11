---
title: Network Analytics
pcx_content_type: how-to
weight: 2
meta:
  title: Magic WAN Network Analytics
---

# Magic WAN Network Analytics

Magic WAN customers can view their real-time and historical network data in Network Analytics. Customers can see their network data in a time series that shows Magic WAN traffic (in packets or bytes) over time, and can filter the time series data by different types of packet characteristics.

To start using Network Analytics:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Select **Analytics & Logs** > **Network Analytics**.
3. You will have access to an overview of your Magic WAN network traffic data.

Refer to [Network Analytics](/analytics/network-analytics/) to learn more.

## Network traffic data filters

Customers can filter the data in Network Analytics on different packet characteristics including:

- Source and destination IP address
- Source and destination IP prefix
- Source and destination port
- Magic Tunnel (IPsec or GRE)
- ASN
- Protocol
- Cloudflare mitigation system applied
- TTL
- TCP Flags

## Magic Tunnel traffic analytics

1. Go to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Select **Analytics & Logs** > **Network Analytics**.
3. In the **All Traffic** tab, scroll to **Top Insights** to access the **Source tunnel** and **Destination tunnel** panels. Here you can examine information from your top tunnels by traffic volume.
4. You can also apply filters to adjust the scope of information displayed. Scroll to **All traffic** > **Add filter**.
5. In the **New filter** popover, choose what type of data you want to display from the left dropdown menu, an operator from the middle dropdown menu, and an action from the right dropdown menu. For example:

    ```txt
    <DESTINATION_TUNNELS> | _equals_ | <NAME_OF_YOUR_TUNNEL>
    ```

    This lets you examine traffic from specific Source tunnels and/or Destination tunnels.

## Feature notes

- For Magic Transit customers, `Non-tunnel traffic` will often represent traffic from the public Internet or traffic via [CNIs](/network-interconnect/).
- For Magic WAN customers, `Non-tunnel traffic` refers to traffic outside of GRE or IPsec tunnels. This can include traffic from:
    - [WARP](/cloudflare-one/connections/connect-devices/warp/)
    - [CNIs](/network-interconnect/)
    - Traffic destined for the public Internet via [Gateway](/cloudflare-one/policies/gateway/)
    - Traffic destined for applications behind [Cloudflare Tunnel](/cloudflare-one/connections/connect-networks/)

The label `Non-Tunnel traffic` is a placeholder, and more specific labels will be applied to this category of traffic in the near future.