---
title: Configure Local Domain Fallback
pcx_content_type: overview
weight: 6
layout: learning-unit
---

{{<render file="warp/_local-domains-description.md" productFolder="cloudflare-one">}}

When WARP is turned on, by default all DNS requests go to Cloudflare's DNS resolver. Devices will no longer be able to connect to any internal server names or domains that do not resolve on the public Internet.

## Add a domain

{{<render file="warp/_add-local-domain.md" productFolder="cloudflare-one">}}