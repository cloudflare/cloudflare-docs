---
pcx_content_type: concept
title: Data Loss Prevention
layout: single
weight: 5
---

# Data Loss Prevention

Cloudflare Data Loss Prevention (DLP) allows you to scan your web traffic and SaaS applications for the presence of sensitive data such as social security numbers and credit card numbers.

## Data-in-transit

Data Loss Prevention complements [Secure Web Gateway](/cloudflare-one/policies/gateway/) to detect sensitive data transferred in HTTP requests. DLP scans the entire HTTP body, which may include [uploaded or downloaded files](#supported-file-types), chat messages, forms, and other web content. Visibility varies depending on the site or application. DLP does not scan non-HTTP traffic such as email, nor does it scan any traffic that bypasses Cloudflare Gateway (for example, traffic that matches a [_Do Not Inspect_](/cloudflare-one/policies/gateway/http-policies/#do-not-inspect) rule).

To get started, refer to [Scan HTTP traffic with DLP](/cloudflare-one/policies/data-loss-prevention/dlp-policies/).

## Data-at-rest

Data Loss Prevention complements [Cloudflare CASB](/cloudflare-one/applications/scan-apps/) to detect sensitive data stored in your SaaS applications. Unlike [data-in-transit scans](#data-in-transit) which read files sent through Cloudflare Gateway, CASB retrieves files directly via API. Therefore, Gateway and WARP settings (such as [_Do Not Inspect_](/cloudflare-one/policies/gateway/http-policies/#do-not-inspect) and [Split Tunnel](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/) rules) will not affect data-at-rest scans.

To get started, refer to our [CASB documentation](/cloudflare-one/applications/scan-apps/casb-dlp/).

## Supported file types

### Formats

- Text and CSV
- Microsoft Office 2007 and later (`.docx`, `.xlsx,` `.pptx`)
- PDF
- ZIP files containing the above

### Size

The maximum file size is 100 MB. Size limitation is assessed against the file after unzipping. ZIP files can be recursively compressed a maximum of 10 times.

## Feature availability

Data Loss Prevention is available as an add-on to Zero Trust Enterprise plans.
