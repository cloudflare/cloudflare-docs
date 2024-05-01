---
pcx_content_type: navigation
title: Analytics
weight: 3
layout: wide
---

# Analytics

To access analytics for your DNS Firewall, use the [Cloudflare API](/api/operations/dns-firewall-analytics-table).

Alternatively, [set up Logpush](/logs/about/) to deliver [DNS Firewall logs](/logs/reference/log-fields/account/dns_firewall_logs/) to a storage service, SIEM, or log management provider.

## Response reasons

When analyzing why Cloudflare DNS Firewall responded in one way or another to a specific query, consider the `responseReason` log field.

The following table provides a description for each of the values that might be returned as a response reason:

{{<table-wrap>}}

| Value     | Description                                                                                                                                |
|-------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| `success`                 | Response was successfully served, either from Cloudflare cache or forwarded from the upstream.|
| `upstream_failure`        | Response could not be fetched from the upstream due to the upstream failing to respond.|
| `upstream_servfail`       | Response could not be fetched from the upstream due to the upstream responding with `SERVFAIL`.|
| `invalid_query`           | Query is invalid and cannot be processed.|
| `any_type_blocked`        | Query of type `ANY` was blocked according to your [DNS Firewall settings](/dns/dns-firewall/setup/) ([RFC 8482](https://www.rfc-editor.org/rfc/rfc8482.html)).|
| `rate_limit`              | Query was rate limited according to your [DNS Firewall settings](/dns/dns-firewall/setup/).|
| `chaos_success`           | Response for [Chaos class](https://en.wikipedia.org/wiki/Chaosnet) was successfully served.|
| `attack_mitigation_block` | Query was blocked as part of [random prefix attack mitigation](/dns/dns-firewall/random-prefix-attacks/).|
| `unknown`                 | There was an unknown error.|

{{</table-wrap>}}