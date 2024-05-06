---
title: Network Analytics
pcx_content_type: how-to
weight: 2
meta:
  title: Magic WAN Network Analytics
---

# Magic WAN Network Analytics

Magic WAN customers can view their real-time and historical network data in Network Analytics. Customers can see their network data in a time series that shows Magic WAN traffic (in {{<glossary-tooltip term_id="data packet">}}packets{{</glossary-tooltip>}} or bytes) over time, and can filter the time series data by different types of packet characteristics.

To start using Network Analytics:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Select **Analytics & Logs** > **Network Analytics**.
3. You will have access to an overview of your Magic WAN network traffic data.

Refer to [Network Analytics](/analytics/network-analytics/) to learn more.

## Network traffic data filters

Customers can filter the data in Network Analytics on different packet characteristics including:

- Source and destination {{<glossary-tooltip term_id="IP address">}}IP address{{</glossary-tooltip>}}
- Source and destination IP {{<glossary-tooltip term_id="prefix">}}prefix{{</glossary-tooltip>}}
- Source and destination port
- Magic Tunnel ({{<glossary-tooltip term_id="IPsec tunnel">}}IPsec{{</glossary-tooltip>}} or {{<glossary-tooltip term_id="GRE tunnel">}}GRE{{</glossary-tooltip>}})
- {{<glossary-tooltip term_id="autonomous system numbers (ASNs)">}}ASN{{</glossary-tooltip>}}
- Protocol
- Cloudflare mitigation system applied
- {{<glossary-tooltip term_id="time-to-live (TTL)">}}TTL{{</glossary-tooltip>}}
- TCP Flags

## Magic Tunnel traffic analytics

{{<render file="analytics/_network-analytics.md">}}