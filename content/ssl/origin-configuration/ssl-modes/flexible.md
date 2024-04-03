---
pcx_content_type: reference
title: Flexible
weight: 2
meta:
    title: Flexible - SSL/TLS encryption modes
---

# Flexible - SSL/TLS encryption modes

Setting your encryption mode to **Flexible** makes your site partially secure. Cloudflare allows HTTPS connections between your visitor and Cloudflare, but all connections between Cloudflare and your origin are made through HTTP. As a result, an SSL certificate is not required on your origin.

```mermaid
flowchart LR
    accTitle: Flexible SSL/TLS Encryption
    accDescr: With an encryption mode of Flexible, your application encrypts traffic between the visitor and Cloudflare, but not between Cloudflare and your server.
    A[Browser] <--Encrypted--> B((Cloudflare))<--Unencrypted--> C[(Origin server)]
```

## Use when

Choose this option when you cannot set up an SSL certificate on your origin or your origin does not support SSL/TLS.

## Required setup

### Prerequisites

{{<render file="_ssl-mode-errors.md">}}

### Process

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}
 
{{<render file="_change-encryption-mode-dash.md">}}
 
{{</tab>}}
{{<tab label="api" no-code="true">}}
 
{{<render file="_change-encryption-mode-api.md">}}
 
{{</tab>}}
{{</tabs>}}

## Limitations

Flexible mode is only supported for HTTPS connections on port 443 (default port). Other ports using HTTPS will fall back to [**Full** mode](/ssl/origin-configuration/ssl-modes/full/).

If your application contains sensitive information (personalized data, user login), use [**Full**](/ssl/origin-configuration/ssl-modes/full/) or [**Full (Strict)**](/ssl/origin-configuration/ssl-modes/full-strict/) modes instead.

{{<render file="_ssl-mode-no-aop.md">}}
<br/>