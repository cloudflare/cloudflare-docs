---
title: Network Analytics
pcx_content_type: how-to
weight: 2
meta:
  title: Magic Transit Network Analytics
---

# Magic Transit Network Analytics

[Network Analytics](/analytics/network-analytics/) gives you real-time visibility into Magic Transit traffic entering and leaving Cloudflare’s network through {{<glossary-tooltip term_id="GRE tunnel">}}GRE{{</glossary-tooltip>}} or {{<glossary-tooltip term_id="IPsec tunnel">}}IPsec{{</glossary-tooltip>}} tunnels. Start by inspecting information from the source and destination tunnel panels in Network Analytics to learn more about your data.

Source/destination tunnel data in Network Analytics includes:

- A list of your top tunnels by traffic volume.
- Source and destination {{<glossary-tooltip term_id="IP address">}}IP addresses{{</glossary-tooltip>}}, ports, and protocols of tunnel traffic.
- Samples of all GRE or IPsec tunnel traffic entering or leaving Cloudflare’s network.
- Mitigations applied (such as DDoS and Magic Firewall) to traffic entering Cloudflare.

## Access Magic Tunnel analytics

{{<render file="analytics/_network-analytics.md" productFolder="magic-wan">}}