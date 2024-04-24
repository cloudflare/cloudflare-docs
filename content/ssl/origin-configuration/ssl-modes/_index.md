---
pcx_content_type: reference
title: Encryption modes
weight: 1
meta:
    description: Encryption modes allow you to control how Cloudflare connects to your origin web server and how certificates presented by your origin are validated.
---

# Encryption modes

{{<render file="_encryption-mode-definition.md">}}
<br/>

If possible, Cloudflare strongly recommends using [**Full**](/ssl/origin-configuration/ssl-modes/full/) or [**Full (strict)**](/ssl/origin-configuration/ssl-modes/full-strict/) modes to prevent malicious connections to your origin.

For more details on how encryption modes fit into the bigger picture of Cloudflare SSL/TLS protection, refer to [Concepts](/ssl/concepts/#ssltls-certificate).

{{<Aside type="note" header="Tip:">}}

If you are not sure which encryption mode to use, enable the [SSL/TLS Recommender](/ssl/origin-configuration/ssl-tls-recommender/).

{{</Aside>}}

## Available encryption modes

{{<directory-listing showDescriptions=true char_limit=300 >}}

## Update your encryption mode

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}
 
{{<render file="_change-encryption-mode-dash.md">}}
 
{{</tab>}}
{{<tab label="api" no-code="true">}}
 
{{<render file="_change-encryption-mode-api.md">}}
 
{{</tab>}}
{{</tabs>}}

{{<render file="_configuration-rule-promotion.md" productFolder="rules">}}