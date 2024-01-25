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
| UK | &#x2705;{{<fnref num="25">}} | &#x2705; | Can use EU metadata boundary. |
| Canada | &#x2705;{{<fnref num="25">}} | &#x2705; | ✘ |
| Australia | &#x2705;{{<fnref num="25">}} | &#x2705; | ✘ |
| Japan | &#x2705;{{<fnref num="25">}} | &#x2705; | ✘ |
| India | &#x2705;{{<fnref num="25">}} | &#x2705; | ✘ |
| ISO 27001 Certified European Union | &#x2705;{{<fnref num="25">}} | &#x2705; | Can use EU metadata boundary. |
| Germany | &#x2705;{{<fnref num="25">}} | &#x2705; | Can use EU metadata boundary. |
| Singapore | &#x2705;{{<fnref num="25">}} | &#x2705; | ✘ |
| South Korea | &#x2705;{{<fnref num="25">}} | &#x2705; | ✘ |

Overview by product-behavior is summarized in the following table. Below you can find the table legend to help you read the table:

✅ Product works with no caveats <br>
🚧 Product can be used with some caveats <br>
✘ Product cannot be used <br>
⚫️ Not applicable

{{<tabs labels="Application Performance | Application Security | Developer Platform | Network Services | Platform | Zero Trust">}}
{{<tab label="application performance" no-code="true">}}

 Product | Geo Key Manager | Regional Services | Customer Metadata Boundary |
| --- | --- | --- | --- |
| Caching/CDN | ✅ | ✅ | ✅ |
| Cache Reserve | ⚫️ | 🚧{{<fnref num="29">}} | ✅ |
| DNS | ⚫️ | ⚫️ | 🚧{{<fnref num="1">}} |
| Image Resizing | ✅ | ✘ | 🚧{{<fnref num="1">}} |
| Load Balancing | ✅ | ✅ | 🚧{{<fnref num="1">}} |
| Onion Routing | ✘ | ✘ | ✘ |
| Orange-to-Orange (O2O) | ✘ | ✘ | ✘ |
| Stream Delivery | ✅ | ✅ | ✅ |
| Tiered Caching | ✅ | 🚧{{<fnref num="2">}} | 🚧{{<fnref num="30">}} |
| Waiting Room | ⚫️ | ✅ | ✅ |
| Zaraz | ✅ | ✅ | ✅ |

{{</tab>}}
{{<tab label="application security" no-code="true">}}

| Product | Geo Key Manager | Regional Services | Customer Metadata Boundary |
| --- | --- | --- | --- |
| Advanced Certificate Manager | ⚫️ | ⚫️ | ⚫️ |
| Advanced DDoS Protection | ✅ | ✅ | 🚧{{<fnref num="3">}} |
| API Shield | ✅ | ✅ | ✘{{<fnref num="4">}} |
| Bot Management | ✅ | ✅ | 🚧{{<fnref num="5">}} |
| DNS Firewall | ⚫️ | ⚫️ | 🚧{{<fnref num="1">}} |
| Page Shield | ✅ | ✅ | ✅ |
| Rate Limiting | ✅ | ✅ | 🚧{{<fnref num="1">}} |
| SSL | ✅ | ✅ | ✅ |
| Cloudflare for SaaS | ✘ | ✅ | ✅ |
| Turnstile | ⚫️ | ✘ | ✅ |
| WAF/L7 Firewall | ✅ | ✅ | ✅ |
| DMARC Management | ⚫️ | ⚫️ | ✅ |

{{</tab>}}
{{<tab label="developer platform" no-code="true">}}

| Product | Geo Key Manager | Regional Services | Customer Metadata Boundary |
| --- | --- | --- | --- |
| Cloudflare Images | ⚫️ | ✘ | ✘ |
| Cloudflare Pages | ✘ | ✅{{<fnref num="11">}} | 🚧{{<fnref num="1">}} |
| Durable Objects | ⚫️ | ✅{{<fnref num="7">}} | 🚧{{<fnref num="1">}} |
| Email Routing | ⚫️ | ⚫️ | ✅ |
| R2 | ✅{{<fnref num="27">}} | ✅{{<fnref num="8">}} | ✅{{<fnref num="28">}} |
| Stream | ⚫️ | ✘ | ✘ |
| Workers (deployed on a Zone) | ✅ | ✅ | 🚧{{<fnref num="1">}} |
| Workers KV | ⚫️ | ✘ | ✘ |
| Workers.dev | ✘ | ✘ | ✘ |

{{</tab>}}
{{<tab label="network services" no-code="true">}}

| Product | Geo Key Manager | Regional Services | Customer Metadata Boundary |
| --- | --- | --- | --- |
| Argo Smart Routing | ✅ | ✘{{<fnref num="9">}} | ✘{{<fnref num="10">}} |
| BYOIP | ⚫️ | ✅{{<fnref num="26">}} | ⚫️ |
| Magic Firewall | ⚫️ | ⚫️ | 🚧{{<fnref num="1">}} |
| Magic Transit | ⚫️ | ⚫️ | 🚧{{<fnref num="1">}} |
| Magic WAN | ⚫️ | ⚫️ | 🚧{{<fnref num="1">}} |
| Spectrum | ✅ | ✅ | 🚧{{<fnref num="1">}} |

{{</tab>}}
{{<tab label="platform" no-code="true">}}

| Product | Geo Key Manager | Regional Services | Customer Metadata Boundary |
| --- | --- | --- | --- |
| Logpull | ⚫️ | ⚫️ | 🚧{{<fnref num="12">}} |
| Logpush | ⚫️ | ✅ | 🚧{{<fnref num="13">}} |

{{</tab>}}
{{<tab label="zero trust" no-code="true">}}

| Product | Geo Key Manager | Regional Services | Customer Metadata Boundary |
| --- | --- | --- | --- |
| Access | 🚧{{<fnref num="14">}} | 🚧{{<fnref num="15">}} | 🚧{{<fnref num="16">}} |
| Area 1 | ⚫️ | ✅{{<fnref num="23">}} | 🚧{{<fnref num="24">}} |
| Browser Isolation | ⚫️ | 🚧{{<fnref num="17">}} | ✅ |
| CASB | ⚫️ | ⚫️ | ✘ |
| Cloudflare Tunnel | ⚫️ | 🚧{{<fnref num="18">}} | ⚫️ |
| DLP | ⚫️{{<fnref num="19">}} | ⚫️{{<fnref num="19">}} | 🚧{{<fnref num="31">}} |
| Gateway | 🚧{{<fnref num="20">}} | 🚧{{<fnref num="21">}} | 🚧{{<fnref num="22">}} |
| WARP | ⚫️ | ⚫️ | 🚧{{<fnref num="1">}} |

{{</tab>}}
{{</tabs>}}

{{<fnsection>}}
{{<fnentry num="1">}}Logs / Analytics not available outside US region when using Customer Metadata Boundary.{{</fnentry>}}
{{<fnentry num="2">}}Regular and Custom Tiered Cache works; Smart Tiered Caching not available with Regional Services.{{</fnentry>}}
{{<fnentry num="3">}}Network Analytics (including DoS analytics) will not be sent outside the region. However, these are only viewable today in US region.{{</fnentry>}}
{{<fnentry num="4">}}API shield will not yet work with Customer Metadata Boundary enabled outside of US region.{{</fnentry>}}
{{<fnentry num="5">}}Some advanced Enterprise features, including the [Anomaly Detection engine](/bots/concepts/bot-score/#anomaly-detection), are not available.{{</fnentry>}}
{{<fnentry num="7">}}[Jurisdiction restrictions for Durable Objects](/durable-objects/reference/data-location/#restrict-durable-objects-to-a-jurisdiction).{{</fnentry>}}
{{<fnentry num="8">}}Only when using a [Custom Domain](/r2/buckets/public-buckets/#connect-a-bucket-to-a-custom-domain) set to a region and using [jurisdictions with the S3 API](/r2/reference/data-location/#using-jurisdictions-with-the-s3-api).{{</fnentry>}}
{{<fnentry num="9">}}Argo cannot be used with Regional Services.{{</fnentry>}}
{{<fnentry num="10">}}Argo cannot be used with Customer Metadata Boundary.{{</fnentry>}}
{{<fnentry num="11">}}Only when using [Custom Domain](/pages/configuration/custom-domains/) set to a region.{{</fnentry>}}
{{<fnentry num="12">}}Logpull not available when using Customer Metadata Boundary outside US region. Logs may be stored and retrieved with [Logs Engine](https://blog.cloudflare.com/announcing-logs-engine/) which is adding region support in 2024.{{</fnentry>}}
{{<fnentry num="13">}}Logpush available with Customer Metadata Boundary for HTTP requests and Firewall events. Please contact your Customer Success Manager if you need to push another dataset.{{</fnentry>}}
{{<fnentry num="14">}}Access App SSL keys can use Geo Key Manager. [Access JWT](/cloudflare-one/identity/authorization-cookie/validating-json/) is not yet localized.{{</fnentry>}}
{{<fnentry num="15">}}Can be localized to US FedRAMP region only. More regions coming in 2024.{{</fnentry>}}
{{<fnentry num="16">}}Customer Metadata Boundary can be used to limit data transfer outside region, but Access User Logs will not be available outside US region.{{</fnentry>}}
{{<fnentry num="17">}}Currently may only be used with US FedRAMP region.{{</fnentry>}}
{{<fnentry num="18">}}Only US FedRAMP region.{{</fnentry>}}
{{<fnentry num="19">}}Uses Gateway HTTP and CASB.{{</fnentry>}}
{{<fnentry num="20">}}You can [bring your own certificate](https://blog.cloudflare.com/bring-your-certificates-cloudflare-gateway/) to Gateway but these cannot yet be restricted to a specific region.{{</fnentry>}}
{{<fnentry num="21">}}Gateway HTTP supports Regional Services. Gateway DNS does not yet support regionalization. <br> ICMP proxy and WARP-to-WARP proxy are not available to Regional Services users.{{</fnentry>}}
{{<fnentry num="22">}}Gateway HTTP and Gateway Network can be used with Customer Metadata Boundary and logs are available via Logpush (logs are still not available in the dashboard when setting the region to the EU).{{</fnentry>}}
{{<fnentry num="23">}}[US, EU and India regions](/email-security/deployment/). <br> For Area 1, this is called the **Processing &amp; Inspection Boundary**.{{</fnentry>}}
{{<fnentry num="24">}}Email metadata (`subject`, `from:`, `to:`) can only be stored in US. <br> Customers have the option to obfuscate  metadata from being viewed by Cloudflare. <br> Email message bodies are only stored for emails that are marked with a disposition (like `MALICIOUS` or `SPAM`).{{</fnentry>}}
{{<fnentry num="25">}}Only supported in [Geo Key Manager v2](/ssl/edge-certificates/geokey-manager/).{{</fnentry>}}
{{<fnentry num="26">}}BYOIP can be used with the legacy Spectrum setup.{{</fnentry>}}
{{<fnentry num="27">}}Only when using a Custom Domain and a [Custom Certificate](/r2/reference/data-security/#encryption-in-transit) or [Keyless SSL](/data-localization/key-management/keyless-ssl/).{{</fnentry>}}
{{<fnentry num="28">}}R2 Dashboard [Metrics and Analytics](/r2/reference/metrics-analytics/) are populated. Additionally, [Jurisdictional Restrictions](/r2/reference/data-location/#jurisdictional-restrictions) guarantee objects in a bucket are stored within a specific jurisdiction.{{</fnentry>}}
{{<fnentry num="29">}}You cannot yet specify region location for object storage itself.{{</fnentry>}}
{{<fnentry num="30">}}Regular/Generic and Custom Tiered Cache works; Smart Tiered Caching does not work with Customer Metadata Boundary (CMB). <br> With CMB set to EU, the Zone Dashboard **Caching** > **Tiered Cache** > **Smart Tiered Caching** option will not populate the Dashboard Analytics.{{</fnentry>}}
{{<fnentry num="31">}}DLP is part of Gateway HTTP, however, [DLP datasets](/cloudflare-one/policies/data-loss-prevention/datasets/#use-dlp-datasets) are not available outside US region when using Customer Metadata Boundary.{{</fnentry>}}
{{</fnsection>}}
