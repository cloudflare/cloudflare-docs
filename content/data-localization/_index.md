---
title: Overview
pcx_content_type: concept
weight: 1
meta:
  title: Data Localization Suite
---

# Data Localization Suite

The Data Localization Suite is a set of products that helps customers who want to maintain local control over their traffic while retaining the security benefits of a global network.

The Data Localization Suite consists of the following products for your Enterprise zones:

- Regional Services
- Customer Metadata Boundary
- Geo Key Manager and Keyless SSL Services

Support by product and region is summarized here:

| Region | Geo Key Manager | Regional Services | Metadata Boundary |
| --- | --- | --- | --- |
| US | &#x2705; | &#x2705; | &#x2705; |
| EU | &#x2705; | &#x2705; | &#x2705; |
| UK | EU-only | &#x2705; | Can use EU metadata boundary. |
| Canada | &#10060; | &#x2705; | &#10060; |
| Australia | &#10060; | &#x2705; | &#10060; |
| Japan |  | &#10060; | |
| India | &#10060; | &#10060; | &#10060; |


## Products that are not available with the Data Localization Suite

The following products may not be used when with the Data Localization Suite:

- Argo Smart Routing: Not available with Regional Services.
- Logpull: Logpull is not available when using the Metadata Boundary. Customers can still get their logs via Logpush, and later this year we will enable pushing logs to R2 storage in the EU.
- API Discovery and Abuse Detection: Is not available when using the Metadata Boundary.
