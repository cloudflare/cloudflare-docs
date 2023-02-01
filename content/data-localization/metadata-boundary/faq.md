---
title: FAQ
pcx_content_type: FAQ
weight: 2
---

# FAQ

## What data is covered by the Customer Metadata Boundary?

Nearly all end user metadata is covered by the Customer Metadata Boundary. This includes all of the end user data for which Cloudflare is a processor, as defined in the [Cloudflare Privacy Policy](https://www.cloudflare.com/privacypolicy/). Cloudflare is a data processor of Customer Logs, which are defined as end user logs that we make available to our customers via the dashboard or other online interfaces. End users are those who access or use our customers’ domains, networks, websites, application programming interfaces, and applications.

Specific examples of this data include all of the analytics in our dashboard and APIs on requests, responses, and security products associated and all of the logs received through Logpush.

## What data is not covered by the Customer Metadata Boundary?

Some of the data for which Cloudflare is a controller, as defined in the [Cloudflare Privacy Policy](https://www.cloudflare.com/privacypolicy/).

Some examples:

- Customer account data (for example, name and billing information).
- Customer configuration data (for example, the content of Firewall Rules).
- Metadata that is “operational” in nature —  data needed for Cloudflare to properly operate our network. This includes metadata such as:
    - System data generated for debugging (for example, application logs from internal systems, core dumps).
    - Networking flow data (for example, sFlow from our routers), including data on DDoS attacks.

## Who can use the Customer Metadata Boundary?

Currently, this is available for Enterprise customers as part of the Data Localization Suite.

The Customer Metadata Boundary is for customers who want to limit personal data transfer outside the EU or the US (depending on the customer’s selected region). These customers should already be using Regional Services, which ensures that traffic content is only ever decrypted within the geographic region specified by the customer.

## What are the analytics products available for Metadata Boundary?

HTTP and Firewall analytics are available. At the moment, there are no analytics available for Workers, DNS, Network Analytics, Load Balancing and Rate Limiting.
