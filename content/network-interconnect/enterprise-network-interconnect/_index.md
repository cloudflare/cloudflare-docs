---
title: Enterprise Network Interconnect
pcx_content_type: concept
weight: 3
---

# Enterprise Network Interconnect

Enterprise Network Interconnect (ENI) allows you to connect your network infrastructure directly with Cloudflare – rather than using the public Internet – for a more reliable and secure experience.

Connecting to Cloudflare directly with a ENI reduces latency, makes your network more stable by bypassing Internet performance potential bottlenecks, and may even reduce your ISP bandwidth bills. ENI also gives you more control over how Cloudflare routes traffic back to your network.

The use case for Enterprise CNI is Magic Transit or Magic WAN. If you have publicly routable origins that are behind Magic Transit over an Enterprise CNI, then all Cloudflare services that work with public origins will run over the CNI (for example, Load Balancer, WAF, Cache, etc).

In the Cloudflare dashboard you can find Cloudflare's nearest Cloudflare data center, and order a physical ENI connection with speeds up to 100 gigabits per second, as well as create a Letter of Authorization (LoA).