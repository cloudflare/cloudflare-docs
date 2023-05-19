---
title: Non-SNI support
pcx_content_type: troubleshooting
weight: 3
---

# Non-SNI support

If your visitors use older devices/browsers and do not have [Server Name Indication (SNI)](https://www.cloudflare.com/learning/ssl/what-is-sni/) support, they may get `common name mismatch` errors when trying to access your website or application.

To avoid these situations, you can:

1. Use [Custom certificates](/ssl/edge-certificates/custom-certificates/uploading/) with **Legacy** Client Support.

    {{<render file="_custom-certificates-management.md">}}

2. (Paid plans only) [Contact Cloudflare Support](/support/troubleshooting/general-troubleshooting/contacting-cloudflare-support) to enable **Dedicated IP** for your zone.