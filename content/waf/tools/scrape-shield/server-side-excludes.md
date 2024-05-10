---
pcx_content_type: concept
source: https://support.cloudflare.com/hc/en-us/articles/200170036-What-does-Server-Side-Excludes-SSE-do-
title: Server-side Excludes (SSE)
weight: 2
---

{{<heading-pill style="deprecated">}} Server-side Excludes (SSE) {{</heading-pill>}}

If there is sensitive content on your website that you want visible to real visitors, but that you want to hide from suspicious visitors, wrap the content with Cloudflare Server-side Excludes (SSE) tags.

{{<Aside type="warning" header="Deprecation notice">}}
Server-side Excludes (SSE) is deprecated and will be removed on 2024-06-14. After this date, SSE will no longer be available via the Cloudflare dashboard, API, or Terraform.

If you are experiencing unmitigated bot attacks or content scraping, we recommend transitioning to our Enterprise-grade [Bot Management](/bots/get-started/bm-subscription/) or our self-serve [Super Bot Fight Mode](/bots/get-started/pro/) solutions. These services are specifically designed to provide superior security in handling bot attacks and other security threats.
{{</Aside>}}

## Set up

### 1. Turn on SSE

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

{{<render file="tools/_sse-instructions-dash.md" withParameters="on;;On">}}

{{</tab>}}
{{<tab label="api" no-code="true">}}

{{<render file="tools/_sse-instructions-api.md" withParameters="on">}}

{{</tab>}}
{{</tabs>}}

{{<render file="_configuration-rule-promotion.md" productFolder="rules">}}

### 2. Exclude content

Once you have turned on **Server-side Excludes**, you need to wrap your content in specific SSE tags.

```txt
<!--sse--><!--/sse-->
```

For example:

```txt
<!--sse-->Bad visitors cannot see my phone number, 555-555-5555<!--/sse-->
```

{{<Aside type="note">}}

If you use [HTML minification](/speed/optimization/content/auto-minify/), you may not be able to see the SSE tags in your HTML source code.

However, SSE will still function correctly since Cloudflare applies both it and minification as the resource
moves through our network to the visitor's computer.

{{</Aside>}}

## Turn off SSE

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

{{<render file="tools/_sse-instructions-dash.md" withParameters="off;;Off">}}

{{</tab>}}
{{<tab label="api" no-code="true">}}

{{<render file="tools/_sse-instructions-api.md" withParameters="off">}}

{{</tab>}}
{{</tabs>}}

## Limitations

SSE only works with HTML.
