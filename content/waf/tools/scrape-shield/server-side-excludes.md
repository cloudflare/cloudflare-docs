---
pcx_content_type: concept
source: https://support.cloudflare.com/hc/en-us/articles/200170036-What-does-Server-Side-Excludes-SSE-do-
title: Server-side Excludes (SSE)
weight: 2
---

# Server-side Excludes (SSE)

If there is sensitive content on your website that you want visible to real visitors, but that you want to hide from suspicious visitors, wrap the content with Cloudflare Server-side Excludes (SSE) tags.

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