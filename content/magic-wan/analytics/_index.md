---
title: Analytics
pcx_content_type: reference
weight: 8
meta:
    description: Use Magic WAN's different analytic options for an overview of the performance of your sites, or to troubleshoot potential issues.
---

# Analytics

Magic WAN customers can follow the troubleshooting steps listed below to gather information at the beginning of a troubleshooting process, then move to more detailed network data collection and analysis to identify the root cause of a problem.

- Overview in [Magic WAN Site Analytics](#magic-wan-site-analytics)
- Analyze network traffic data overtime in [Magic WAN Network Analytics](#magic-wan-network-analytics)
- Perform more detailed troubleshooting with:
    - [Traceroutes](#traceroutes)
    - [Packet captures](#packet-captures)

## Magic WAN Site Analytics

Magic WAN Site Analytics provides an overview of the connectivity status and traffic analytics of all Magic WAN sites. This is a great place to start if you receive an alert, need to begin the Magic WAN troubleshooting process, or are performing routine monitoring.

Refer to [Magic WAN Site Analytics](/magic-wan/analytics/site-analytics/) to learn more.

## Magic WAN Network Analytics

Network Analytics provides detailed analytics on Magic WAN traffic over time. Customers can filter data on specific traffic characteristics and view traffic analytics over time.

Refer to [Magic WAN Network Analytics](/magic-wan/analytics/network-analytics/) to learn more.

## Traceroutes

Traceroutes provide a hop by hop breakdown of the Internet path network traffic follows as it traverses from Cloudflare’s network to a customer’s network.

Refer to [Traceroutes](/magic-wan/analytics/traceroutes/) to learn more.

## Packet captures

Packet captures allow customers to analyze the raw packet data that a customer is sending and receiving from Cloudflare’s network.

Refer to [packet captures](/magic-firewall/packet-captures/) to learn more.

## Query Analytics with GraphQL

GraphQL Analytics provides customers with a GraphQL API that they can query to receive raw JSON data of their Magic WAN traffic analytics. This data can be ingested into a SIEM or other tool and analyzed further.

- [Querying Magic WAN tunnel bandwidth analytics with GraphQL](/magic-wan/analytics/query-bandwidth/)
- [Querying Magic WAN tunnel health check results with GraphQL](/magic-wan/analytics/query-tunnel-health/)