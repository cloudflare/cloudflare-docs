---
title: Analytics
pcx_content_type: how-to
meta:
    description: Use Magic Transit's different analytic options for an overview of the performance of your sites, or to troubleshoot potential issues.
---

# Analytics

Magic Transit customers can follow the troubleshooting steps listed below to gather information at the beginning of a troubleshooting process, then move to more detailed network data collection and analysis to identify the root cause of a problem.

- Analyze network traffic data overtime in [Magic Transit Network Analytics](#magic-transit-network-analytics)
- Perform more detailed troubleshooting with:
    - [Traceroutes](#traceroutes)
    - [Packet captures](#packet-captures)

## Magic Transit Network Analytics

Network Analytics provides detailed analytics on Magic Transit traffic over time. Customers can filter data on specific traffic characteristics and view traffic analytics over time.

Refer to [Magic Transit Network Analytics](/magic-transit/analytics/network-analytics/) to learn more.

## Traceroutes

Traceroutes provide a hop by hop breakdown of the Internet path network traffic follows as it traverses from Cloudflare’s network to a customer’s network.

Refer to [traceroutes](/magic-transit/analytics/traceroutes/) to learn more.

## Packet captures

Packet captures allow customers to analyze the raw packet data that a customer is sending and receiving from Cloudflare’s network.

Refer to [packet captures](/magic-firewall/packet-captures/) to learn more.

## Query Analytics with GraphQL

GraphQL Analytics provides customers with a GraphQL API that they can query to receive raw JSON data of their Magic WAN traffic analytics. This data can be ingested into a SIEM or other tool and analyzed further.

- [Querying Magic Transit tunnel bandwidth analytics with GraphQL](/magic-transit/analytics/query-bandwidth/)
- [Querying Magic Transit tunnel health check results with GraphQL](/magic-transit/analytics/query-tunnel-health/)