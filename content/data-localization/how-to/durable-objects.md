---
title: Durable Objects
pcx_content_type: how-to
weight: 7
---

# Durable Objects

In the following sections, we will give you some details about how to configure Durable Objects with Regional Services and Customer Metadata Boundary.

## Regional Services

To configure Regional Services for hostnames [proxied](/dns/manage-dns-records/reference/proxied-dns-records/) through Cloudflare and ensure that processing of a Durable Object (DO) occurs only in-region, follow these steps:

1. Follow the steps in the Durable Objects [Get Started](/durable-objects/get-started/) guide.
2. [Restrict Durable Objects to a jurisdiction](/durable-objects/reference/data-location/#restrict-durable-objects-to-a-jurisdiction), in order to control where the DO itself runs and persists data, by creating a jurisidictional subnamespace in your Worker’s code.
3. Follow the [Workers guide](/data-localization/how-to/workers/#regional-services) to configure a custom domain with Regional Services, in order to control the regions from which Cloudflare responds to requests.

## Customer Metadata Boundary

DO Logs and Analytics are not available outside the US region when using Customer Metadata Boundary. With Customer Metadata Boundary set to `EU`, **Workers & Pages** > **Workers** > **Metrics** tab related to DO in the zone dashboard will not be populated.

Refer to the [Durable Objects documentation](/durable-objects/) for more information.