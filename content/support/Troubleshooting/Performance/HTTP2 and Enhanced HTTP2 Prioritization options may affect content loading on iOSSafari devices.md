---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/4402614758925-HTTP-2-and-Enhanced-HTTP-2-Prioritization-options-may-affect-content-loading-on-iOS-Safari-devices
title: HTTP2 and Enhanced HTTP2 Prioritization options may affect content loading on iOSSafari devices
---

# HTTP/2 and Enhanced HTTP/2 Prioritization options may affect content loading on iOS/Safari devices



## Problem Description

Some visitors using iOS/Safari browsers may notice not being able to load the site properly, such as images not displaying or content taking too long to load.

___

## What does HTTP/2 Prioritization do?

With HTTP/2, by default, Cloudflare follows the order requested by the browser. This ordering varies from browser to browser and causes a significant difference in performance.

With Enhanced HTTP/2 Prioritization enabled, resources are delivered in the optimal order for the fastest experience across all browsers. This option optimizes the order of resource delivery, independent of the browser.

___

## Workaround

Make sure **Enhanced HTTP/2 Prioritization** is enabled at **Speed** > **Optimization** > **Protocols**.

The speed of loading web content from the user’s perspective is dependent on the order in which the resources load. The greatest improvements will be experienced by visitors using Safari and Edge browsers. In some cases, this may not occur.

If you are seeing the behavior on iOS or Safari devices, disable **Enhanced HTTP/2 Prioritization**.

On occasion, this option can sometimes re-enable automatically if **HTTP/2** feature on the **Network** app is enabled. You may need to disable **HTTP/2** feature first.
