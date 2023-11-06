---
pcx_content_type: troubleshooting
title: Enhanced HTTP/2 Prioritization negatively affects iOS/Safari devices
layout: list
---

# Enhanced HTTP/2 Prioritization negatively affects iOS/Safari devices

Occasionally, [Enhanced HTTP/2 Prioritization](/speed/optimization/protocol/enhanced-http2-prioritization/) can negatively affect the experience of visitors using iOS or Safari browsers.

These visitors may notice not being able to load the site properly, such as images not displaying or content taking too long to load.

## Solution

If visitors using iOS or Safari browsers are experiencing issues with your site loading properly, try [disabling Enhanced HTTP/2 Prioritization](/speed/optimization/protocol/enhanced-http2-prioritization/#enable-enhanced-http2-prioritization).

{{<Aside type="note">}}

Sometimes, [HTTP/2](/support/network/understanding-cloudflare-http2-and-http3-support/#http2) will cause **Enhanced HTTP/2 Prioritization** to be re-enabled automatically.

If you notice this happening, also disable **HTTP/2**.

{{</Aside>}}