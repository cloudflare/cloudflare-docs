---
pcx-content-type: concept
title: Universal SSL
weight: 1
---

# Universal SSL

{{<render file="_universal-ssl-definition.md">}}

\
For setup details, refer to [Enable Universal SSL](/ssl/edge-certificates/universal-ssl/enable-universal-ssl/).

{{<Aside type="note">}}

For sites that require an SSL certificate prior to migrating traffic to Cloudflare or need to disable certain cipher suites, purchase an [advanced certificate](/ssl/edge-certificates/advanced-certificate-manager/) or upload a [custom certificate](/ssl/edge-certificates/custom-certificates/) before proxying traffic to Cloudflare.

{{</Aside>}}

## Backup certificates

Depending on your plan, Cloudflare may issue a backup Universal certificate automatically for your domain.

Backup certificates are wrapped with a different private key and issued from a different Certificate Authority than the primary certificate.

For additional details, refer to the [introductory blog post](https://blog.cloudflare.com/introducing-backup-certificates/).