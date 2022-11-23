---
pcx_content_type: navigation
type: overview
title: Security
weight: 1
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
| Broken Object Level Authorization | [Schema Validation] |
| Broken User Authentication | [mTLS](/api-shield/security/mtls/), [Anomaly Detection], [Rate Limiting], [Leaked Credential Checks](/waf/exposed-credentials-check/) |
| Excessive Data Exposure | [Schema Validation], [Sensitive Data Detection (Beta)] |
| Lack of Resources & Rate Limiting | [Anomaly Detection], [Rate Limiting], [DDoS Protection](/ddos-protection/) |
| Broken Function Level Authorization| [Schema Validation] |
| Mass Assignment| [Schema Validation], [Anomaly Detection], [Rate Limiting] |
| Security Misconfiguration| [Schema Validation], [Sensitive Data Detection (Beta)] |
| Injection| [Schema Validation], [WAF Rulesets](/waf/managed-rulesets/) |
| Improper Assets Management| [Discovery](/api-shield/security/api-discovery/) |
| Insufficient Logging & Monitoring| [Discovery SIEM integration](/logs/get-started/enable-destinations/), [Management and Monitoring](/api-shield/management-and-monitoring/)|


[Schema Validation]: /api-shield/security/schema-validation/
[Anomaly Detection]: /api-shield/security/sequential-abuse-detection/
[Sensitive Data Detection (Beta)]: https://blog.cloudflare.com/data-loss-prevention/
[Rate Limiting]: /waf/rate-limiting-rules/
