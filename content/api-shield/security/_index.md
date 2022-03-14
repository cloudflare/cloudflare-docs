---
pcx-content-type: navigation
type: overview
title: Security
weight: 1
layout: list
---

# Security

Cloudflare offers the following features to help secure your APIs: 
{{<directory-listing>}}

## OWASP alignment

Cloudflare's API Shield — together with other compatible Cloudflare products — helps protect your API from the issues detailed in [OWASP's API Security Top 10](https://owasp.org/www-project-api-security/):

| OWASP issue | Cloudflare solution |
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
| Insufficient Logging & Monitoring| [Discovery SIEM integration](/logs/get-started/enable-destinations/) |


[Schema Validation]: /api-shield/security/schema-validation/
[Anomaly Detection]: /api-shield/security/sequential-abuse-detection/
[Sensitive Data Detection (Beta)]: https://blog.cloudflare.com/data-loss-prevention/
[Rate Limiting]: /waf/custom-rules/rate-limiting/
