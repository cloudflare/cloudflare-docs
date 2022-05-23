---
title: Phases list
pcx-content-type: reference
weight: 1
---

# Phases list

## Network layer

Network-layer phases apply to received packets at the edge.

{{<table-wrap>}}

Phase name      | Used in product/feature
----------------|-------------------------------------
`ddos_l4`       | [Network-layer DDoS Attack Protection](/ddos-protection/managed-rulesets/network/configure-api/)
`magic_transit` | [Magic Firewall](/magic-firewall/reference/examples/)

{{</table-wrap>}}

## Application layer

Application-layer phases apply to received requests at the edge.

### Request phases

The phases execute in the order they appear in the table.

{{<table-wrap>}}

| Phase name | Used in product/feature |
|---|---|
| `http_request_sanitize` | [URL normalization](/rules/normalization/) |
| `http_request_transform` | [URL Rewrite Rules](/rules/transform/url-rewrite/create-api/) |
| `ddos_l7`* | [HTTP DDoS Attack Protection](/ddos-protection/managed-rulesets/http/configure-api/) |
| `http_request_firewall_custom` | [Web Application Firewall (WAF)](/waf/custom-rules/create-api/) |
| `http_ratelimit` | [Rate limiting rules](/waf/rate-limiting-rules/create-api/) |
| `http_request_firewall_managed` | [Web Application Firewall (WAF)](/waf/managed-rulesets/deploy-api/) |
| `http_request_sbfm` | [Super Bot Fight Mode](/bots/get-started/pro/) |
| `http_request_redirect` | [Bulk Redirects](/rules/bulk-redirects/create-api/) |
| _N/A_ (internal phase) | [Managed Transforms](/rules/transform/managed-transforms/) |
| `http_request_late_transform` | [HTTP Request Header Modification Rules](/rules/transform/request-header-modification/create-api/) |

{{</table-wrap>}}

\* _This phase is for configuration purposes only — the corresponding rules will not be executed at this stage in the request handling process._

### Response phases

The phases execute in the order they appear in the table.

{{<table-wrap>}}

| Phase name | Used in product/feature |
|---|---|
| _N/A_ (internal phase) | [Managed Transforms](/rules/transform/managed-transforms/) |
| `http_response_headers_transform` | [HTTP Response Header Modification Rules](/rules/transform/response-header-modification/create-api/) |
| `http_response_firewall_managed` | [Cloudflare Sensitive Data Detection](/waf/managed-rulesets/) (Data Loss Prevention) |
| `http_log_custom_fields` | [Logpush custom fields](/logs/reference/logpush-api-configuration/custom-fields/) |

{{</table-wrap>}}