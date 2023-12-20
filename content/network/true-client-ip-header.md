---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/206776727-Understanding-the-True-Client-IP-Header
title: Understanding the True-Client-IP Header
---

# Understanding the True-Client-IP Header

Enabling the True-Client-IP Header adds the [`True-Client-IP` header](/fundamentals/reference/http-request-headers/#true-client-ip-enterprise-plan-only) to all requests to your origin server, which includes the end user’s IP address.

## Availability

{{<feature-table id="network.true_client_ip_header">}}

## Add True-Client-IP Header

The recommended procedure to access client IP information is to [enable the **Add visitor location headers** Managed Transform](/rules/transform/managed-transforms/reference/#add-visitor-location-headers).

{{<Aside type="note">}}

In order to use this data, you will need to then retrieve it from the [`True-Client-IP` header](/fundamentals/reference/http-request-headers/#cf-ipcountry).

{{</Aside>}}