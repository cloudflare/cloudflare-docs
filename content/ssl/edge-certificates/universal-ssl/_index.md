---
pcx_content_type: concept
title: Universal SSL
weight: 1
meta:
    title: Free Universal SSL/TLS certificates
---

# Universal SSL

{{<render file="_universal-ssl-definition.md">}}
<br/>

{{<render file="_validation-level-intro.md" withParameters="Universal certificates">}}. For setup details, refer to [Enable Universal SSL](/ssl/edge-certificates/universal-ssl/enable-universal-ssl/).

{{<Aside type="note">}}

If your website or application requires an SSL certificate prior to migrating traffic to Cloudflare, or if you need to [customize cipher suites](/ssl/reference/cipher-suites/customize-cipher-suites/), refer to [Advanced](/ssl/edge-certificates/advanced-certificate-manager/) or [Custom](/ssl/edge-certificates/custom-certificates/) certificates.

{{</Aside>}}

## Availability

{{<feature-table id="ssl.universal_certificates">}}

## Backup certificates

For more details, refer to [backup certificates](/ssl/edge-certificates/backup-certificates/).
