---
pcx_content_type: concept
title: Data Loss Prevention
weight: 5
---

# Data Loss Prevention

{{<Aside type="note">}}
Available as an add-on to Zero Trust Enterprise plans.
{{</Aside>}}

{{<glossary-definition term_id="Cloudflare Data Loss Prevention (DLP)">}}

## Data in transit

{{<Aside type="note">}}
DLP requires [TLS decryption](/cloudflare-one/policies/gateway/http-policies/tls-decryption/) for visibility into data in transit. The depth of visibility varies for each site or application.
{{</Aside>}}

Data Loss Prevention complements [Secure Web Gateway](/cloudflare-one/policies/gateway/) to detect sensitive data transferred in HTTP requests. DLP scans the entire HTTP body, which may include [uploaded or downloaded files](#supported-file-types), chat messages, forms, and other web content. DLP does not scan non-HTTP traffic such as email, nor does it scan any traffic that bypasses Cloudflare Gateway (for example, traffic that matches a [Do Not Inspect](/cloudflare-one/policies/gateway/http-policies/#do-not-inspect) policy.

To get started, refer to [Scan HTTP traffic with DLP](/cloudflare-one/policies/data-loss-prevention/dlp-policies/).

## Data at rest

Data Loss Prevention complements [Cloudflare CASB](/cloudflare-one/applications/scan-apps/) to detect sensitive data stored in your SaaS applications. Unlike [data in transit scans](#data-in-transit) which read files sent through Cloudflare Gateway, CASB retrieves files directly via the API. Therefore, Gateway and WARP settings (such as [Do Not Inspect](/cloudflare-one/policies/gateway/http-policies/#do-not-inspect) policies and [Split Tunnel](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/) configurations) will not affect data at rest scans.

To get started, refer to [Scan SaaS applications with DLP](/cloudflare-one/applications/scan-apps/casb-dlp/).

## Supported file types

### Formats

DLP supports scanning the following file types:

- Text and CSV
- Microsoft Office 2007 and later (`.docx`, `.xlsx,` `.pptx`), including Microsoft 365
- PDF
- ZIP files containing the above

### Size

The maximum file size is 100 MB. Size limitation is assessed against the file after unzipping. ZIP files can be recursively compressed a maximum of 10 times.
