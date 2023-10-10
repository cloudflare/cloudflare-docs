---
pcx_content_type: concept
title: JSON Web Tokens Validation
weight: 5
---

# JSON Web Tokens Validation

JSON Web Tokens (JWTs) are often used as part of an authentication component on many web applications today. Since JWTs are crucial to identifying users and their access, ensuring the token’s integrity is important.

API Shield’s JWT Validation stops JWT replay attacks and JWT tampering by cryptographically verifying incoming JWTs before they are passed to your API origin. JWT Validation will also stop requests with expired tokens or tokens that are not yet valid.

## Availability

JWT Validation is currently in a closed beta and is only available for Enterprise customers. If you would like to be included in the beta, contact your account team.

## Limitations

Currently, the following limitations are in place while we operate the closed beta:
1. JWT Validation configuration is only available via API today. For help configuring JWT Validation using the Cloudflare API, refer to [configuring JWT Validation](/api-shield/security/jwt-validation/configure/).
2. JWT Validation only operates on JWTs sent in client request headers. If your clients send in JWTs in cookies or `POST` bodies, direct that feedback to your account team.
3. There can only be a single JWT Validation configuration per zone.
We intend to remove these limitations in the near future.
4. JWT Validation only operates for endpoints (host, method, and path) added to [Endpoint Management](/api-shield/management-and-monitoring/). 

{{<Aside type="note">}}
Refer to [configuring JWT Validation](/api-shield/security/jwt-validation/configure/) for more specific limitations around JWT claim support and supported encryption algorithms.
{{</Aside>}}