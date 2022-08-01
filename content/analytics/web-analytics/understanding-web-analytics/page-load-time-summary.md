---
pcx_content_type: reference
title: Page load time summary
weight: 10
---

# Page load time summary

Page load time summary gives you an overview of how long your web page takes to load, broken down by area. To access Page load time:

1. Go to [Web Analytics](https://dash.cloudflare.com/?to=/:account/web-analytics) from your account home page, and choose a website.
2. Select **Page load time**.

Below is a list of all the components you can inspect:

- **Page load**: The total amount of time required to load the page.
- **DNS** (`domainLookupEnd` - `domainLookupStart`): How long a DNS query takes. This could appear as zero for reused connections or content stored in the local cache (memory or disk).
- **TCP** (`connectEnd` - `connectStart`): How long it takes to establish a TCP connection with the server. If using HTTPS, this process includes TLS negotiation time.
- **Request** (`responseStart` - `requestStart`): The time elapsed between making an HTTP request and receiving the first byte of the response.
- **Response** (`responseEnd` - `responseStart`): The time elapsed between the first byte and the last byte of the received response. Think of this as a resource download time.
- **Processing** (`domComplete` - `domInteractive`): How long it took to render the page. This includes loading any resources that block page rendering, including images, scripts, and style sheets. If this number is big, optimize your document architecture, resource size, or configure settings in the Cloudflare Speed app, such as Auto Minify the source code. This document process can be drilled down more with `domInteractive`, `domContentLoadedEventStart`, `domContentLoadedEventEnd`, and `domComplete`.
- **Load Event** (`loadEventEnd` - `loadEventStart`): An event triggered by the browser when a document and its resources finish loading. The Load Event duration may be a useful metric if you have additional functions or any logic for the load event.

![Web Analytics load time summary page](/analytics/static/images/web-analytics/dash-web_analytics-page_load_time.png)

## Data collected for Paint Timings

To make Web Analytics work, Cloudflare collects several types of data points. These are the additional data points collected for Paint Timings:

- **First Paint**: The time between navigation and when the browser renders the first pixels to the screen.
- **First Contentful Paint**: Time when the browser renders the first bit of content from the DOM.