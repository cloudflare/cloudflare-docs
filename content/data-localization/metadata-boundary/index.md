---
pcx_content_type: concept
title: Customer Metadata Boundary
weight: 3
---

# Customer Metadata Boundary

## What is the Customer Metadata Boundary?

The Customer Metadata Boundary, as part of the Data Localization Suite, ensures that any customer end user traffic metadata that identifies that customer (that is, contains that customer's Account ID) stays in the EU or in the US, depending on the region the customer selects. That means, for example, that if a customer selects the EU Customer Metadata Boundary, metadata will only be sent to our core data center in the EU and not our core data center in the US.

## What Cloudflare products are included in the Customer Metadata Boundary?

Our application performance and security services products are included. This includes:

- Caching / content delivery / CDN
- WAF / L7 Firewall
- DDoS protection*
- Bot Management*
- SSL / SSL for SaaS
- DNS
- Load Balancing*
- Rate Limiting
- Waiting Room
- Stream Delivery
- Spectrum
- Workers when used as part of a zone

* Products with an asterisk may be used, but with some caveats, which can be discussed with our Solutions Engineers.

## What products are not included in the Customer Metadata Boundary?

- Cloudflare for Teams: Access, Gateway, Browser Isolation
- Networking services: Magic Transit, Magic WAN, Magic Firewall, Network Interconnect, Argo Smart Routing
- Developer platform: Workers.dev, Workers KV, Cloudflare Pages, Stream
- Consumer products: 1.1.1.1, Warp, Registrar

## What data is covered by the Customer Metadata Boundary?

Nearly all end user metadata is covered by the Customer Metadata Boundary. This includes all of the end user data for which Cloudflare is a processor, as defined in the [Cloudflare Privacy Policy](https://www.cloudflare.com/privacypolicy/). Cloudflare is a data processor of Customer Logs, which are defined as end user logs that we make available to our customers via the dashboard or other online interfaces. End users are those who access or use our customers’ domains, networks, websites, application programming interfaces, and applications.

Specific examples of this data include all of the analytics in our dashboard and APIs on requests, responses, and security products associated and all of the logs received through Logpush.

## What data is not covered by the Customer Metadata Boundary?

Some of the data for which Cloudflare is a controller, as defined in the [Cloudflare Privacy Policy](https://www.cloudflare.com/privacypolicy/). Some examples:

- Customer account data (for example, name and billing information)
- Customer configuration data (for example, the content of Firewall Rules)
- Metadata that is “operational” in nature —  data needed for Cloudflare to properly operate our network. This includes metadata such as:
    - System data generated for debugging (for example, application logs from internal systems, core dumps)
    - Networking flow data (for example, sFlow from our routers), including data on DDoS attacks

## Who can use the Customer Metadata Boundary?

Currently, this is available for Enterprise customers as part of the Data Localization Suite.

The Customer Metadata Boundary is for customers who want to limit personal data transfer outside the EU or the US (depending on the customer’s selected region). These customers should already be using [Regional Services](https://blog.cloudflare.com/introducing-regional-services/), which ensures that traffic content is only ever decrypted within the geographic region specified by the customer.

## How can I enable the Customer Metadata Boundary?

To enable Customer Metadata Boundary on your account, contact your CSM/Account team.

Currently, the Metadata Boundary can only be enabled by Cloudflare for an entire account . If you only want the Metadata Boundary applied to some zones but not other zones in the same account, you will have to move those zones to a new account.