---
title: Best practices
pcx_content_type: overview
weight: 3
layout: learning-unit
---

Most customers have a heterogenous private application portfolio; some are home-built, some are internal managed services, some have SSO integrations available, and some rely on HTML or other forms of authentication. With that in mind, we recommend that you mix-and-match [onboarding solutions](/learning-paths/zero-trust-web-access/migrate-applications/integrated-sso/#potential-solutions) to fit the needs of each individual application. As shown in the table below, you can bucket applications into a series of stack-ranked categories that prioritize ease of implementation and total organizational impact.

| Application type | Recommendation | Outcome |
| ---------------- | ---------------| ------- |
| Private web apps without integrated SSO | [Present applications exclusively on Cloudflare domains.](#present-applications-exclusively-on-cloudflare-domains) | Users access applications on new domains delegated to Cloudflare and instantly apply SSO through Cloudflare integration. |
| Private web apps with integrated SSO | **If SSO configuration is possible:** [Present applications exclusively on Cloudflare domains.](#present-applications-exclusively-on-cloudflare-domains) <br> **If SSO configuration is not possible:** Present applications on existing internal domains with identical external domains delegated to Cloudflare | Users access internal web services on the same or new domains from Cloudflare. If configured, the SSO provider transparently redirects users from internal domains to Cloudflare authoritative external domains. |
| New critical internal applications being developed | [Present applications exclusively on Cloudflare domains.](#present-applications-exclusively-on-cloudflare-domains) | Developers can programmatically generate (or be given) new public hostnames on Cloudflare to represent the redirects for their application in SAML or OIDC integrations. |
| New microservices being developed | [Present applications exclusively on Cloudflare domains.](#present-applications-exclusively-on-cloudflare-domains) <br> Optionally, [consume the Access JWT](/learning-paths/zero-trust-web-access/migrate-applications/consume-jwt/#consume-the-cloudflare-jwt) as authentication in internal applications. | Developers can inject the JWT authorization mechanism directly into the codebase of their application and [use Terraform](/learning-paths/zero-trust-web-access/terraform/) to automatically build Cloudflare hostnames and policies for their applications. |
| Internal API endpoints (including internal applications with dependencies on external/internal APIs) | Present internal APIs on Cloudflare domains, and build Access policies that accept [service tokens](/cloudflare-one/identity/service-tokens/) alongside user-oriented policies. | Automated systems can authenticate via a [service token in the request header](/cloudflare-one/identity/service-tokens/#connect-your-service-to-access), while end users continue to login through their IdP. |
