---
title: Analytics
pcx_content_type: reference
weight: 7
meta:
    description: Use Magic WAN's different analytic options for an overview of the performance of your sites, or to troubleshoot potential issues.
---

# Analytics

Magic WAN customers can follow the troubleshooting steps listed below to begin broad information gathering at the beginning of the troubleshooting process, and move onto more detailed network data collection and analysis to identify the root cause of a problem.

- Overview in [Magic WAN site analytics](#)
- Analyze network traffic data overtime in [Network Analytics](#)
- Perform more detailed troubleshooting with:
    - Traceroutes
    - Packet captures

## Magic WAN site analytics

Magic WAN site analytics provides an overview of the connectivity status and traffic analytics of all Magic WAN sites. This is a great place to start if you receive an alert, need to begin the Magic WAN troubleshooting process, or are performing routine monitoring.

Refer to [Magic WAN site analytics](#) to learn more.

## Magic WAN network Analytics

Network Analytics provides detailed analytics on Magic WAN traffic over time. Customers can filter data on specific traffic characteristics and view traffic analytics over time.

Refer to [Magic WAN network Analytics](#) to learn more.

## Traceroutes

Traceroutes provide a hop by hop breakdown of the Internet path network traffic follows as it traverses from Cloudflare’s network to a customer’s network.

Refer to [traceroutes](#) to learn more.

## Packet captures

Packet captures allow customers to analyze the raw packet data that a customer is sending and receiving from Cloudflare’s network.

Refer to [packet captures](/magic-firewall/packet-captures/) to learn more.

## Query Analytics with GraphQL

GraphQL Analytics provides customers with a GraphQL API that they can query to receive raw JSON data of their Magic WAN traffic analytics. This data can be ingested into a SIEM or other tool and analyzed further

- [Querying Magic WAN tunnel bandwidth analytics with GraphQL](/magic-wan/analytics/query-bandwidth/)
- [Querying Magic WAN tunnel health check results with GraphQL](/magic-wan/analytics/query-tunnel-health/)
