---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200170036-What-does-Server-Side-Excludes-SSE-do-
title: What does Server Side Excludes (SSE) do?
---

# What does Server Side Excludes (SSE) do?



## Overview

If there is sensitive content on your website that you want visible to real visitors, but that you want to hide from suspicious visitors, wrap the content with Cloudflare Server-Side Excludes (SSE) tags. 

To enable SSE:

1.  Log into the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account and domain.
2.  Go to **Scrape Shield**.
3.  For **Server-side Excludes**, change the toggle to be **Enabled**.

To exclude content from suspicious visitors, wrap the content in the following SSE tags: <!--sse--><!--/sse-->

For example: <!--sse--> Bad visitors won't see my phone number, 555-555-5555 <!--/sse-->

{{<Aside type="note">}}
SSE only will work with HTML. If you have HTML minification enabled, you
won\'t see the SSE tags in your HTML source when it\'s served through
Cloudflare. SSE will still function in this case, as Cloudflare\'s HTML
minification and SSE functionality occur on-the-fly as the resource
moves through our network to the visitor\'s computer.
{{</Aside>}}