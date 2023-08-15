---
pcx_content_type: reference
title: Off (no encryption)
weight: 1
meta:
    title: Off - SSL/TLS encryption modes
---

# Off - SSL/TLS encryption modes

Setting your encryption mode to **Off (not recommended)** redirects any HTTPS request to plaintext HTTP.

```mermaid
    flowchart LR
        accTitle: No SSL/TLS Encryption
        accDescr: With an encryption mode of Off, your application does not encrypt traffic between the visitor and Cloudflare or between Cloudflare and your server.
        A[Browser] <--Unencrypted--> B((Cloudflare))<--Unencrypted--> C[(Origin server)]
```

## Use when

Cloudflare does not recommend setting your encryption mode to **Off**.

## Required setup

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}
 
{{<render file="_change-encryption-mode-dash.md">}}
 
{{</tab>}}
{{<tab label="api" no-code="true">}}
 
{{<render file="_change-encryption-mode-api.md">}}
 
{{</tab>}}
{{</tabs>}}

## Limitations

When you set your encryption mode to **Off**, your application:

- Leaves your visitors and your application [vulnerable to attacks](https://www.cloudflare.com/learning/ssl/why-use-https/).
- Will be marked as "not secure" by Chrome and other browsers, reducing visitor trust.
- Will be penalized in [SEO rankings](https://webmasters.googleblog.com/2014/08/https-as-ranking-signal.html).

### Incompatible settings

When you set your SSL/TLS encryption mode to **Off**, you will not see the options for [**Always Use HTTPS**](/ssl/edge-certificates/additional-options/always-use-https/) or [**Onion Routing**](https://support.cloudflare.com/hc/articles/203306930).

{{<render file="_ssl-mode-no-aop.md">}}
<br/>