---
title: Overview
pcx_content_type: concept
weight: 1
meta:
  title: Data Localization Suite
---

# Data Localization Suite

The Data Localization Suite (DLS) is a collection of tools that enable customers to choose the location where Cloudflare inspects and stores data, while maintaining the security and performance benefits of our global network.

{{<Aside type="note">}}

This feature is available as a paid add-on for customers on the Enterprise plan. Reach out to your Customer Success Manager for more information.

{{</Aside>}}

The Data Localization Suite consists of the following products:

- [Key Management](/data-localization/key-management/)
- [Regional Services](/data-localization/regional-services/)
- [Customer Metadata Boundary](/data-localization/metadata-boundary/)

Support by product and region is summarized in the following table:

| Region | Geo Key Manager | Regional Services | Customer Metadata Boundary |
| --- | --- | --- | --- |
| US | &#x2705; | &#x2705; | &#x2705; |
| EU | &#x2705; | &#x2705; | &#x2705; |
| UK | &#x2705;[^25] | &#x2705; | Can use EU metadata boundary. |
| Canada | &#x2705;[^25] | &#x2705; | ✘ |
| Australia | &#x2705;[^25] | &#x2705; | ✘ |
| Japan | &#x2705;[^25] | &#x2705; | ✘ |
| India | &#x2705;[^25] | &#x2705; | ✘ |
| ISO 27001 Certified European Union | &#x2705;[^25] | &#x2705; | Can use EU metadata boundary. |
| Germany | &#x2705;[^25] | &#x2705; | Can use EU metadata boundary. |
| Singapore | &#x2705;[^25] | &#x2705; | ✘ |
| South Korea | &#x2705;[^25] | &#x2705; | ✘ |

Overview by product-behavior is summarized in the following table. Below you can find the table legend to help you read the table:

✅ Product works with no caveats <br>
🚧 Product can be used with some caveats <br>
✘ Product cannot be used <br>
⚫️ Not applicable

| Suite/Category | Product | Geo Key Manager | Regional Services | Customer Metadata Boundary |
| --- | --- | --- | --- | --- |
| Application Performance | Caching/CDN | ✅ | ✅ | ✅ |
| | Cache Reserve | ⚫️ | 🚧[^8] | ✅ | 
| | DNS | ⚫️ | ⚫️ | 🚧[^1] | 
| | Image Resizing | ✅ | ✅ | 🚧[^1] |
| | Load Balancing | ✅ | ✅ | 🚧[^1] |
| | Stream Delivery | ✅ | ✅ | ✅ |
| | Tiered Caching | ✅ | 🚧[^2] | 🚧[^2] |
| | Waiting Room | ⚫️ | ✅ | ✅ |
| | Zaraz | ✅ | ✅ | ✅ |
| | Email Routing | ⚫️ | ⚫️ | ✅ |
| Application Security | Advanced Certificate Manager | ⚫️ | ⚫️ | ⚫️ |
| | Advanced DDoS Protection | ✅ | ✅ | 🚧[^3] |
| | API Shield | ✅ | ✅ | ✘[^4] |
| | Bot Management | ✅ | ✅ | 🚧[^5] |
| | DNS Firewall | ⚫️ | ⚫️ | 🚧[^1] |
| | Page Shield | ✅ | ✅ | ✅ |
| | Rate Limiting | ✅ | ✅ | 🚧[^1] |
| | SSL | ✅ | ✅ | ✅ |
| | Cloudflare for SaaS | ✘ | ✅ | ✅ |
| | Turnstile | ⚫️ | ✘ | ✅ |
| | WAF/L7 Firewall | ✅ | ✅ | ✅ |
| | DMARC Management | ⚫️ | ⚫️ | ✅ | 
| Developer Platform | Cloudflare Images | ⚫️ | ✘ | ✘ |
| | Cloudflare Pages | ✘ | ✅[^11] | ✘ |
| | Durable Objects | ⚫️ | ✅[^7] | 🚧[^1] |
| | R2 | ⚫️ | 🚧[^8] | ✅ |
| | Stream | ⚫️ | ✘ | ✘ |
| | Workers (deployed on a Zone) | ✅ | ✅ | 🚧[^1] |
| | Workers KV | ⚫️ | ✘ | ✘ |
| | Workers.dev | ✘ | ✘ | ✘ |
| Network Services | Argo Smart Routing | ✅ | ✘[^9] | ✘[^10] |
| | BYOIP | ⚫️ | ✅ | ⚫️ |
| | Magic Firewall | ⚫️ | ⚫️ | 🚧[^1] |
| | Magic Transit | ⚫️ | ⚫️ | 🚧[^1] |
| | Magic WAN | ⚫️ | ⚫️ | 🚧[^1] |
| | Spectrum | ✅ | ✅ | 🚧[^1] |
| Platform | Logpull | ⚫️ | ✅ | 🚧[^12] |
| | Logpush | ⚫️ | ✅ | 🚧[^13] |
| [Zero Trust](/data-localization/how-to/zero-trust/) | Access | 🚧[^14] | 🚧[^15] | 🚧[^16] |
| | Area 1 | ⚫️ | ✅[^23] | 🚧[^24] |
| | Browser Isolation | ⚫️ | 🚧[^17] | ✅ |
| | CASB | ⚫️ | ⚫️ | ✘ |
| | Cloudflare Tunnel | ⚫️ | 🚧[^18] | ⚫️ |
| | DLP | ⚫️[^19] | ⚫️[^19] | ✘ |
| | Gateway | 🚧[^20] | 🚧[^21] | 🚧[^22] |
| | WARP | ⚫️ | ⚫️ | 🚧[^1] |

[^1]:Logs / Analytics not available outside US region when using Customer Metadata Boundary.
[^2]:Regular and Custom Tiered Cache works; Smart Tiered Caching not available with Regional Services.
[^3]:Network Analytics (including DoS analytics) will not be sent outside the region. However, these are only viewable today in US region.
[^4]:API shield will not yet work with Customer Metadata Boundary enabled outside of US region.
[^5]:Some advanced Enterprise features, including the [Anomaly Detection engine](/bots/concepts/bot-score/#anomaly-detection), are not available.
[^6]:Cannot be used with Customer Metadata Boundary outside of US region.
[^7]:[Jurisdiction restrictions for Durable Objects](/durable-objects/platform/data-location/#restrict-durable-objects-to-a-jurisdiction).
[^8]:You can not yet specify region location for object storage; this is expected in 2023.
[^9]:Argo cannot be used with Regional Services.
[^10]:Argo cannot be used with Customer Metadata Boundary.
[^11]:Only when using Custom Domain set to a region.
[^12]:Logpull not available when using Customer Metadata Boundary outside US region. Logs may be stored and retrieved with [Logs Engine](https://blog.cloudflare.com/announcing-logs-engine/) which is adding region support in 2023.
[^13]:Logpush available with Customer Metadata Boundary for HTTP requests and Firewall events. Please contact your Customer Success Manager if you need to push another dataset.
[^14]:Access App SSL keys can use Geo Key Manager. [Access JWT](/cloudflare-one/identity/authorization-cookie/validating-json/) is not yet localized.
[^15]:Can be localized to US FedRAMP region only. More regions coming in 2023.
[^16]:Customer Metadata Boundary can be used to limit data transfer outside region, but Access User Logs will not be available outside US region.
[^17]:Currently may only be used with US FedRAMP region.
[^18]:Only US FedRAMP region.
[^19]:Uses Gateway and CASB.
[^20]:You can [bring your own certificate](https://blog.cloudflare.com/bring-your-certificates-cloudflare-gateway/) to Gateway but these cannot yet be restricted to a specific region.
[^21]:Gateway HTTP supports Regional Services. Gateway DNS does not yet support regionalization. <br> ICMP proxy and WARP-to-WARP proxy are not available to Regional Services users.
[^22]:Gateway HTTP and Gateway Network can be used with Customer Metadata Boundary and logs are available via Logpush (logs are still not available in the dashboard when setting the region to the EU).
[^23]:[US, EU and India regions](/email-security/deployment/). <br> For Area 1, this is called the **Processing & Inspection Boundary**.
[^24]:Email metadata (`subject`, `from:`, `to:`) can only be stored in US. <br> Customers have the option to obfuscate  metadata from being viewed by Cloudflare. <br> Email message bodies are only stored for emails that are marked with a disposition (like `MALICIOUS` or `SPAM`).
[^25]: Only supported in [Geo Key Manager v2](/ssl/edge-certificates/geokey-manager/).
