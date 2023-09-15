---
pcx_content_type: navigation
type: overview
title: Security
weight: 3
layout: list
---

# Security

Cloudflare offers the following features to help secure your APIs:

{{<directory-listing>}}

## Example Cloudflare solutions

Cloudflare's API Shield — together with other compatible Cloudflare products — helps protect your API from the issues detailed in the [OWASP&reg; API Security Top 10](https://owasp.org/www-project-api-security/).

The following table provides examples of how you might match Cloudflare products to OWASP vulnerabilities:

| OWASP issue | Example Cloudflare solution |
| ----------- | ------------------- |
| Broken Object Level Authorization | [Sequence Mitigation], [Schema Validation], [JWT Validation], [Rate Limiting] |
| Broken Authentication | [mTLS](/api-shield/security/mtls/), [JWT Validation], [Leaked Credential Checks](/waf/exposed-credentials-check/), [Bot Management] |
| Broken Object Property Level Authorization | [Schema Validation], [JWT Validation] |
| Unrestricted Resource Consumption | [Rate Limiting], [Sequence Mitigation], [Bot Management], [GraphQL Query Protection] |
| Broken Function Level Authorization | [Schema Validation], [JWT Validation] |
| Unrestricted Access to Sensitive Business Flows | [Sequence Mitigation], [Bot Management], [GraphQL Query Protection] |
| Server Side Request Forgery | [Schema Validation], [WAF Managed Rules], [WAF Custom Rules](/waf/custom-rules/)
| Security Misconfiguration | [Sequence Mitigation], [Schema Validation], [WAF Managed Rules], [GraphQL Query Protection]
| Improper Inventory Management | [Discovery](/api-shield/security/api-discovery/), [Schema Learning](/api-shield/management-and-monitoring/#endpoint-schema-learning) |
| Unsafe Consumption of APIs | [JWT Validation], [WAF Managed Rules] |

[Schema Validation]: /api-shield/security/schema-validation/
[Sequence Mitigation]: /api-shield/security/sequence-mitigation/
[JWT Validation]: /api-shield/security/jwt-validation/
[GraphQL Query Protection]: /api-shield/security/graphql-protection/
[Bot Management]: /bots/
[Rate Limiting]: /waf/rate-limiting-rules/
[WAF Managed Rules]: /waf/managed-rules/