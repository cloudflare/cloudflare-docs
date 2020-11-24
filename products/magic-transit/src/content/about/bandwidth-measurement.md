---
order: 4
---

# Bandwidth measurement

Cloudflare measures Magic Transit usage based on the 95th percentile of clean bandwidth for your network. "Clean bandwidth" refers to the egress traffic routed to your network after all DDoS mitigation and firewall functions are applied, so this usage measurement explicitly does not include attack traffic that is blocked at Cloudflare's edge.

To measure 95th percentile bandwidth, Cloudflare records egress bandwidth usage at five minute intervals, sorts these measurements in descending order, and discards the top 5% of recorded measurements. The highest remaining value constitutes the 95th percentile bandwidth measurement for that time period.

