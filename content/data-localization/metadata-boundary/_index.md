---
pcx_content_type: concept
title: Customer Metadata Boundary
weight: 3
---

# Customer Metadata Boundary


The Customer Metadata Boundary, as part of the Data Localization Suite, ensures that any customer end user traffic metadata that identifies that customer (that is, contains that customer's Account ID) stays in the EU or in the US, depending on the region the customer selects. That means, for example, that if a customer selects the EU Customer Metadata Boundary, metadata will only be sent to our core data center in the EU and not our core data center in the US.

The table below details the products available for Customer Metadata Boundary, the products that work with some caveats, the products that cannot be used, and the products that are not  eligible for Customer Metadata Boundary. 

{{<table-wrap>}}

Product works with no caveats | Product works with some caveats| Product cannot be used | Product is not applicable/eligible
---|---|---|---
Caching / content delivery / CDN | DDoS protection | Cloudflare for Teams: Access, Gateway, Browser Isolation |
WAF / L7 Firewall | Bot Management | Networking services: Magic Transit, Magic WAN, Magic Firewall, Network Interconnect, Argo Smart Routing | 
SSL / SSL for SaaS | Load Balancing | Developer platform: Workers.dev, Workers KV, Cloudflare Pages, Stream |
DNS | | Consumer products: 1.1.1.1, Warp, Registrar | 
Rate Limiting | | Logpull. Customers can still get their logs via Logpush, and later this year we will enable pushing logs to R2 storage in the EU. | 
Waiting Room | | API Discovery and Abuse Detection |
Stream Delivery | | | 
Spectrum | | | 
Workers when used as part of a zone | | | 

{{</table-wrap>}}