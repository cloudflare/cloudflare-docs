---
trigger: always_on
---

# New Routes for the DashButton component

- The DashButton routes are like so: <DashButton url="/?to=/:account/<something-here>” />

These are the routes we need to add to add to the file src/content/dash-routes/core-manually-defined.json

The main parent for these routes is "Networking".

- Overview: /magic-networks/overview
- Insights
    - Network analytics: /networking-insights/analytics/network-analytics/transport-analytics/all-traffic
    - Network health: /networking-insights/health/network-health
    - Network flow: /networking-insights/analytics/network-analytics/flow-analytics
- Connectors: /magic-networks/connections/tunnels
- Interconnects: /interconnects
- Routes: /magic-networks/routes/route-config
- Firewall policies: /network-security/magic_firewall/custom
- L3/4 DDoS protection: /network-security/ddos
- IP addresses
    - BYOIP: /ip-addresses/ip-prefixes
    - Leased IPs: /ip-addresses/leased-ips
    - Address maps: /ip-addresses/proxy-ips
- Internal DNS: /internal-dns/internal-zones
- DNS Firewall
    - Clusters: /dns-firewall/clusters
    - Analytics: /dns-firewall/analytics
- Cloud Integrations: /mcn/integrations


This is the format of the json file:

[
	{
		"name": "Account home",
		"deeplink": "/?to=/:account/home",
		"parent": ["Analytics & logs", "Log Explorer"]
	},
]

The parent tells you where the route belongs to.