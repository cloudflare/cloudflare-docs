---
pcx_content_type: reference
title: Encryption modes
weight: 2
meta:
    description: Encryption modes allow you to control how Cloudflare connects to your origin web server and how certificates presented by your origin are validated.
---

# Encryption modes

The modes listed below control the scheme (`http://` or `https://`) that Cloudflare uses to connect to your origin web server and how SSL certificates presented by your origin will be validated.

If possible, Cloudflare strongly recommends using [**Full**](/ssl/origin-configuration/ssl-modes/full/) or [**Full (strict)**](/ssl/origin-configuration/ssl-modes/full-strict/) modes to prevent malicious connections to your origin.

For more details about how your encryption mode fits into the bigger picture of SSL/TLS protection, refer to [Get started](/ssl/get-started/).

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
