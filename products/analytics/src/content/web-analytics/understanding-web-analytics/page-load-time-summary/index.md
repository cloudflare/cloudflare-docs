---
order: 42
pcx-content-type: reference
---

# Page load time summary

* Page load - The total amount of time required to load the page.
* DNS (`domainLookupEnd` - `domainLookupStart`) - How long a DNS query takes. This could appear as zero for reused connections or content stored in the local cache (memory or disk).
* TCP (`connectEnd` - `connectStart`) - How long it takes to establish a TCP connection with the server. If using HTTPS, this process includes TLS negotiation time.
* Request (`responseStart` - `requestStart`) - The time elapsed between making an HTTP request and receiving the first byte of the response.
* Response (`responseEnd` - `responseStart`) - The time elapsed between the first byte and the last byte of the received response. Think of this as a resource download time.
* Processing (`domComplete` - `domInteractive`) - How long it took to render the page. This includes loading any resources that block page rendering, including images, scripts, and style sheets. If this number is big, optimize your document architecture, resource size, or configure settings in the Cloudflare Speed app, such as Auto Minify the source code. This document process can be drilled down more with `domInteractive`, `domContentLoadedEventStart`, `domContentLoadedEventEnd`, and `domComplete`.
* Load Event (`loadEventEnd` - `loadEventStart`) - An event triggered by the browser when a document and its resources finish loading. The Load Event duration may be a useful metric if you have additional functions or any logic for the load event.

![Web Analytics page load time](../../../static/images/dash-web_analytics-page_load_time.png)