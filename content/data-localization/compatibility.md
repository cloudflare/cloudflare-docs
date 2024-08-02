---
title: Product compatibility
pcx_content_type: reference
weight: 3
meta:
  title: Cloudflare product compatibility
---

# Cloudflare product compatibility

The table below provides a summary of the Data Localization Suite product's behavior with Cloudflare products. Refer to the table legend for guidance on interpreting the table.

✅ Product works with no caveats <br>
🚧 Product can be used with some caveats <br>
✘ Product cannot be used <br>
⚫️ Not applicable

## Application Performance

 Product | Geo Key Manager | Regional Services | Customer Metadata Boundary |
| --- | --- | --- | --- |
| Caching/CDN | ✅ | ✅ | ✅ |
| Cache Reserve | ⚫️ | 🚧{{<fnref num="29">}} | ✅ |
| DNS | ⚫️ | ⚫️ | 🚧{{<fnref num="32">}} |
| HTTP/3 (with QUIC)  | ⚫️ | ✘ | ⚫️ |
| Image Resizing | ✅ | ✘ | 🚧{{<fnref num="1">}} |
| Load Balancing | ✅ | ✅ | 🚧{{<fnref num="1">}} |
| Onion Routing | ✘ | ✘ | ✘ |
| Orange-to-Orange (O2O) | ✘ | ✘ | ✘ |
| Stream Delivery | ✅ | ✅ | ✅ |
| Tiered Caching | ✅ | 🚧{{<fnref num="2">}} | 🚧{{<fnref num="30">}} |
| Trace | ✘ | ✘ | ✘ |
| Waiting Room | ⚫️ | ✅ | ✅ |
| Zaraz | ✅ | ✅ | ✅ |

---

## Application Security

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

---

## Developer Platform

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

---

## Network Services

| Product | Geo Key Manager | Regional Services | Customer Metadata Boundary |
| --- | --- | --- | --- |
| Argo Smart Routing | ✅ | ✘{{<fnref num="9">}} | ✘{{<fnref num="10">}} |
| Static IP/BYOIP | ⚫️ | ✅{{<fnref num="26">}} | ⚫️ |
| Magic Firewall | ⚫️ | ⚫️ | ✅ |
| Magic Transit | ⚫️ | ⚫️ | 🚧{{<fnref num="1">}} |
| Magic WAN | ⚫️ | ⚫️ | ✅ |
| Spectrum | ✅ | ✅ | ✅ |

---

## Platform

| Product | Geo Key Manager | Regional Services | Customer Metadata Boundary |
| --- | --- | --- | --- |
| Logpull | ⚫️ | ⚫️ | 🚧{{<fnref num="12">}} |
| Logpush | ⚫️ | ✅ | 🚧{{<fnref num="13">}} |

---

## Zero Trust

| Product | Geo Key Manager | Regional Services | Customer Metadata Boundary |
| --- | --- | --- | --- |
| Access | 🚧{{<fnref num="14">}} | 🚧{{<fnref num="15">}} | 🚧{{<fnref num="16">}} |
| Browser Isolation | ⚫️ | 🚧{{<fnref num="17">}} | ✅ |
| CASB | ⚫️ | ⚫️ | ✘ |
| Cloudflare Tunnel | ⚫️ | 🚧{{<fnref num="18">}} | ⚫️ |
| DLP | ⚫️{{<fnref num="19">}} | ⚫️{{<fnref num="19">}} | 🚧{{<fnref num="31">}} |
| Gateway | 🚧{{<fnref num="20">}} | 🚧{{<fnref num="21">}} | 🚧{{<fnref num="22">}} |
| WARP | ⚫️ | ⚫️ | 🚧{{<fnref num="1">}} |

{{<fnsection>}}
{{<fnentry num="1">}}Logs / Analytics not available outside US region when using Customer Metadata Boundary.{{</fnentry>}}
{{<fnentry num="2">}}Regular and Custom Tiered Cache works; Smart Tiered Caching not available with Regional Services.{{</fnentry>}}
{{<fnentry num="3">}}Adaptive DDoS Protection is only supported for US CMB.{{</fnentry>}}
{{<fnentry num="4">}}API shield will not yet work with Customer Metadata Boundary enabled outside of US region.{{</fnentry>}}
{{<fnentry num="5">}}Some advanced Enterprise features, including the [Anomaly Detection engine](/bots/concepts/bot-score/#anomaly-detection), are not available.{{</fnentry>}}
{{<fnentry num="7">}}[Jurisdiction restrictions for Durable Objects](/durable-objects/reference/data-location/#restrict-durable-objects-to-a-jurisdiction).{{</fnentry>}}
{{<fnentry num="8">}}Only when using a [Custom Domain](/r2/buckets/public-buckets/#connect-a-bucket-to-a-custom-domain) set to a region and using [jurisdictions with the S3 API](/r2/reference/data-location/#using-jurisdictions-with-the-s3-api).{{</fnentry>}}
{{<fnentry num="9">}}Argo cannot be used with Regional Services.{{</fnentry>}}
{{<fnentry num="10">}}Argo cannot be used with Customer Metadata Boundary.{{</fnentry>}}
{{<fnentry num="11">}}Only when using [Custom Domain](/pages/configuration/custom-domains/) set to a region.{{</fnentry>}}
{{<fnentry num="12">}}Logpull not available when using Customer Metadata Boundary outside US region. Logs may be stored and retrieved with [Logs Engine](https://blog.cloudflare.com/announcing-logs-engine/) which is adding region support in 2025.{{</fnentry>}}
{{<fnentry num="13">}}Logpush available with Customer Metadata Boundary for [these datasets](/data-localization/metadata-boundary/logpush-datasets/). Contact your Customer Success Manager if you need another dataset.{{</fnentry>}}
{{<fnentry num="14">}}Access App SSL keys can use Geo Key Manager. [Access JWT](/cloudflare-one/identity/authorization-cookie/validating-json/) is not yet localized.{{</fnentry>}}
{{<fnentry num="15">}}Can be localized to US FedRAMP region only. More regions coming in 2024.{{</fnentry>}}
{{<fnentry num="16">}}Customer Metadata Boundary can be used to limit data transfer outside region, but Access User Logs will not be available outside US region.{{</fnentry>}}
{{<fnentry num="17">}}Currently may only be used with US FedRAMP region.{{</fnentry>}}
{{<fnentry num="18">}}Only US FedRAMP region.{{</fnentry>}}
{{<fnentry num="19">}}Uses Gateway HTTP and CASB.{{</fnentry>}}
{{<fnentry num="20">}}You can [bring your own certificate](https://blog.cloudflare.com/bring-your-certificates-cloudflare-gateway/) to Gateway but these cannot yet be restricted to a specific region.{{</fnentry>}}
{{<fnentry num="21">}}Gateway HTTP supports Regional Services. Gateway DNS does not yet support regionalization. <br> ICMP proxy and WARP-to-WARP proxy are not available to Regional Services users.{{</fnentry>}}
{{<fnentry num="22">}}Dashboard Analytics and Logs are empty when using CMB outside the US region. Use Logpush instead.{{</fnentry>}}
{{<fnentry num="26">}}Static IP/BYOIP can be used with the legacy Spectrum setup.{{</fnentry>}}
{{<fnentry num="27">}}Only when using a Custom Domain and a [Custom Certificate](/r2/reference/data-security/#encryption-in-transit) or [Keyless SSL](/data-localization/key-management/keyless-ssl/).{{</fnentry>}}
{{<fnentry num="28">}}R2 Dashboard [Metrics and Analytics](/r2/platform/metrics-analytics/) are populated. Additionally, [Jurisdictional Restrictions](/r2/reference/data-location/#jurisdictional-restrictions) guarantee objects in a bucket are stored within a specific jurisdiction.{{</fnentry>}}
{{<fnentry num="29">}}You cannot yet specify region location for object storage itself.{{</fnentry>}}
{{<fnentry num="30">}}Regular/Generic and Custom Tiered Cache works; Smart Tiered Caching does not work with Customer Metadata Boundary (CMB). <br> With CMB set to EU, the Zone Dashboard **Caching** > **Tiered Cache** > **Smart Tiered Caching** option will not populate the Dashboard Analytics.{{</fnentry>}}
{{<fnentry num="31">}}DLP is part of Gateway HTTP, however, [DLP datasets](/cloudflare-one/policies/data-loss-prevention/datasets/#use-dlp-datasets) are not available outside US region when using Customer Metadata Boundary.{{</fnentry>}}
{{<fnentry num="32">}}Dashboard Analytics are empty when using CMB outside the US region. Use Logpush instead.{{</fnentry>}}
{{</fnsection>}}
