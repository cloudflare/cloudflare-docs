---
pcx_content_type: concept
title: Regional Services
weight: 2
---

# Regional Services

Regional Services gives you the ability to accommodate regional restrictions by choosing which subset of data centers decrypt and service HTTPS traffic.

Regional Services proceeds and processes traffic within certain regions for customers who have to meet regional compliance or have preferences for maintaining regional control over their data. Examples of use cases could be a customer that needs to accommodate regional restrictions like GDPR (General Data Protection Regulation), or customers that are bound by agreement with their own customers that include geographic restrictions on data flows or data processing.

With Regional Services, TLS is only terminated inside the configured region. For example, if a hostname is configured to regionalize to the EU, any HTTPS request from the US will route to the EU. 

For more details about the products that are compatible with Regional Services, refer to the [Overview section](/data-localization/). If you have purchased these products as part of your Enterprise subscription plan, Cloudflare will only terminate TLS connections for these products in the geographic region you have configured for Regional Services.
