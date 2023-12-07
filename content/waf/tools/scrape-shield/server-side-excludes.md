---
pcx_content_type: concept
source: https://support.cloudflare.com/hc/en-us/articles/200170036-What-does-Server-Side-Excludes-SSE-do-
title: Server-side Excludes (SSE)
weight: 2
---

# Server-side Excludes (SSE)

If there is sensitive content on your website that you want visible to real visitors, but that you want to hide from suspicious visitors, wrap the content with Cloudflare Server-side Excludes (SSE) tags.

## Set up

### Enable

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To enable **Server-side Excludes** in the dashboard:

1.  Log into the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2.  Select your account and website.
3.  Go to **Scrape Shield**.
4.  For **Server-side**, switch the toggle to **On**.

{{</tab>}}
{{<tab label="api" no-code="true">}}

To enable **Server-side Excludes** with the API, send a [`PATCH`](/api/operations/zone-settings-change-server-side-exclude-setting) request with the `value` parameter set to `"on"`.

{{</tab>}}
{{</tabs>}}

{{<render file="_configuration-rule-promotion.md" productFolder="rules">}}

### Exclude content

Once you have enabled **Server-side Excludes**, you need to wrap your content in specific SSE tags.

```
<!--sse--><!--/sse-->
```

```
<!--sse-->Bad visitors cannot see my phone number, 555-555-5555<!--/sse-->
```

{{<Aside type="note">}}

If you use [HTML minification](/speed/optimization/content/auto-minify/), you may not be able to see the SSE tags in your HTML source code.

However, SSE will still function correctly since Cloudflare applies both it and minification as the resource
moves through our network to the visitor's computer.

{{</Aside>}}

## Limitations

SSE only works with HTML.