---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200170036-What-does-Server-Side-Excludes-SSE-do-
title: What does Server-side Excludes (SSE) do?
---

# What does Server-side Excludes (SSE) do?

If there is sensitive content on your website that you want visible to real visitors, but that you want to hide from suspicious visitors, wrap the content with Cloudflare Server-side Excludes (SSE) tags.

## Enable Server-side Excludes

To enable Server-side on your website:

1.  Log into the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2.  Select your account and website.
3.  Go to **Scrape Shield**.
4.  For **Server-side**, switch the toggle to **On**.

{{<render file="_configuration-rule-promotion.md" productFolder="rules">}}

Then, to exclude content from suspicious visitors, wrap the content in the following SSE tags:

```
<!--sse--><!--/sse-->
```

For example: `<!--sse-->` Bad visitors won't see my phone number, 555-555-5555 `<!--/sse-->`

{{<Aside type="note">}}
SSE only will work with HTML. If you have HTML minification enabled, you
won't see the SSE tags in your HTML source when it's served through
Cloudflare. SSE will still function in this case, as Cloudflare's HTML
minification and SSE functionality occur on-the-fly as the resource
moves through our network to the visitor's computer.
{{</Aside>}}
