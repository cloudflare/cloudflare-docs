---
title: Analytics
pcx_content_type: how-to
weight: 7
meta:
    title: How to view GRE and IPsec tunnel analytics
---

# GRE and IPsec tunnel analytics

## Query analytics with GraphQL

You can query Magic Transit analytics using GraphQL. Review the topics below to learn more:

{{<directory-listing>}}

## Access Magic Transit analytics in the dashboard

[Network Analytics](/analytics/network-analytics/) gives you real-time visibility into Magic Transit traffic entering and leaving Cloudflare’s network through {{<glossary-tooltip term_id="GRE tunnel">}}GRE{{</glossary-tooltip>}} or {{<glossary-tooltip term_id="IPsec tunnel">}}IPsec{{</glossary-tooltip>}} tunnels. Start by inspecting information from the source and destination tunnel panels in Network Analytics to learn more about your data.

Source / destination tunnel data in Network Analytics includes:

- A list of your top tunnels by traffic volume.
- Source and destination {{<glossary-tooltip term_id="IP address">}}IP addresses{{</glossary-tooltip>}}, ports, and protocols of tunnel traffic.
- Samples of all GRE or IPsec tunnel traffic entering or leaving Cloudflare’s network.
- Mitigations applied (DDoS, Magic Firewall, etc.) to traffic entering Cloudflare.

## Access Magic Tunnel analytics

{{<render file="_network-analytics.md" productFolder="magic-wan">}}