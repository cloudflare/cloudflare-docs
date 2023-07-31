---
pcx_content_type: reference
title: Browser compatibility
weight: 6
meta:
    description: Review information about browser compatibility for the different Cloudflare SSL/TLS offerings.
---

# Browser compatibility

Cloudflare attempts to provide compatibility for as wide a range of user agents (browsers, API clients, etc.) as possible. However, the specific set of supported clients can vary depending on the different SSL/TLS certificate types, your visitor's browser compliance to modern standards, and the certificate authority (CA) that issues the certificate.

## Universal SSL

{{<Aside type="warning" header="Important">}}

Cloudflare Universal SSL only supports browsers and API clients that use the [Server Name Indication (SNI)](https://www.cloudflare.com/learning/ssl/what-is-sni/) extension to the TLS protocol.

{{</Aside>}}

Universal SSL certificates issued for Free plan zones require user agents that send Server Name Indication (SNI) and support the Elliptic Curve Digital Signature Algorithm (ECDSA).

## Non-SNI support

| Feature/Product                  | Custom (Legacy IP) | Custom Certificates | Advanced Certificates | Cloudflare for SaaS |
| -------------------------------- | ------------------ | ------------------- | --------------------- | ------------ |
| Clients without SNI              | ✅                 | ❌                  | ❌                    | ❌           |

{{<Aside type="note" header="Note">}}

SNI extensions to the TLS protocol were standardized in 2003. However, some browsers and operating systems only implemented this extension when TLS 1.1 was released in 2006 (or 2011 for mobile browsers). If your visitors use devices that have not been updated since 2011, they may not have SNI support.

{{</Aside>}}
