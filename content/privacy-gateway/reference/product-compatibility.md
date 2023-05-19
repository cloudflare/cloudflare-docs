---
title: Product compatibility
pcx_content_type: reference
weight: 1
---

# Cloudflare product compatibility

When [using Privacy Gateway](/privacy-gateway/get-started/), the majority of Cloudflare products will be compatible with your application.

However, the following products are not compatible:

- [API Shield](/api-shield/): [Schema Validation](/api-shield/security/schema-validation/) and [API discovery](/api-shield/security/api-discovery/) are not possible since Cloudflare cannot see the request URLs.
- [Cache](/cache/): Caching of application content is no longer possible since each between client and gateway is end-to-end encrypted.
- [WAF](/waf/): Rules implemented based on request content are not supported since Cloudflare cannot see the request or response content.