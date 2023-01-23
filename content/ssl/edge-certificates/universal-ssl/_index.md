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

For setup details, refer to [Enable Universal SSL](/ssl/edge-certificates/universal-ssl/enable-universal-ssl/).

{{<Aside type="note">}}

For sites that require an SSL certificate prior to migrating traffic to Cloudflare or need to disable certain cipher suites, purchase an [advanced certificate](/ssl/edge-certificates/advanced-certificate-manager/) or upload a [custom certificate](/ssl/edge-certificates/custom-certificates/) before proxying traffic to Cloudflare.

{{</Aside>}}

## Availability

{{<feature-table id="ssl.universal_certificates">}}

## Backup certificates

For more details, refer to [backup certificates](/ssl/edge-certificates/backup-certificates/).