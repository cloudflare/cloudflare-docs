---
title: Overview
pcx_content_type: overview
layout: list
weight: 2
meta:
  title: Railgun (deprecated)
---

{{<deprecated>}} Railgun {{</deprecated>}}

{{<render file="_railgun-deprecation-notice.md">}}

Railgun creates a persistent TCP connection between Cloudflare’s edge and the origin, which provides various benefits such as performance improvements and connectivity management. Railgun is configured using two components: the sender and the listener. The sender, automatically configured at every Cloudflare data center, establishes a persistent connection with the listener, installed at the origin server. Each component keeps track of the most recently requested version of a page. 

## Railgun's evolution

Since Railgun’s launch, Cloudflare has released several products in different areas that better address the problems that Railgun set out to solve. In the table below, you can find more information about how to reproduce the functionality of Railgun using newer Cloudflare solutions. 

| Use case | Railgun solution | Improved Cloudflare solution |
| --- | --- | --- | 
| Performance | Railgun can transmit the difference between dynamic page requests, but not necessarily over the fastest Internet path. | <ul><li>[Argo Smart Routing](/argo-smart-routing/) routes requests over the most efficient path, avoiding any network congestion.</li></ul> |
| Connectivity and IP Management | Railgun listeners can front multiple origin servers simultaneously, reducing the need for more IP management.</br></br>Redundant Railgun listeners can be deployed for increased fault tolerance. | <ul><li>[Cloudflare Tunnel](/cloudflare-one/connections/connect-networks/) securely connects your origin servers to Cloudflare without a publicly routable IP address.</li><li>[Cloudflare Load Balancing](/load-balancing/) distributes traffic across your servers, which reduces server strain and latency.</li><li>[Cloudflare Aegis](/fundamentals/get-started/task-guides/origin-health/enterprise/) are dedicated IPs between Cloudflare and your origin. This allows you to lock down your services and applications at an IP level and build a protected environment that is application aware, protocol aware, and even IP-aware.</li><li>[Cloudflare Network Interconnect (CNI)](/network-interconnect/) allows you to connect your network infrastructure directly with Cloudflare – rather than using the public Internet.</li></ul> |
| Reduce egress fees to Cloudflare | In some cases, Railgun compression can reduce egress. | <ul><li>[Cloudflare R2](/r2/) allows users to store large amounts of unstructured data.</li><li>[Cloudflare Tiered Cache](/cache/how-to/tiered-cache/) uses the size of Cloudflare's network to reduce requests to customer origins by dramatically increasing cache hit ratios.</li><li>[Bandwidth Alliance](https://blog.cloudflare.com/empowering-customers-with-the-bandwidth-alliance/) a collective group of cloud and storage providers who have agreed to waive or steeply discount egress costs for mutual customers.</li></ul> |