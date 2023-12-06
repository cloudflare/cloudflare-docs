---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200169906-Troubleshooting-missing-images
title: Troubleshooting missing images
---

# Troubleshooting missing images

## Overview

If images are missing from your website, perform the following steps while retesting the image load in a private browser tab after each step:

-   [Purge cache for the URL](/cache/how-to/purge-cache) of the missing image file.
-   [Temporarily pause Cloudflare](/support/troubleshooting/general-troubleshooting/gathering-information-for-troubleshooting-sites/).
-   In the Cloudflare dashboard:
    -   Disable **Rocket Loader** in the **Speed app** > **Optimization**. Scroll down until you find **Rocket Loader**.
    -   Disable **Mirage** in the **Speed app** > **Optimization**. Scroll down until you find **Mirage**.

{{<Aside type="note">}}
**Mirage** is only available for domains on a paid Cloudflare plan.
{{</Aside>}}

-   [Inform Cloudflare support](/support/contacting-cloudflare-support/) of the issue and request assistance.

___

## Related resources

-   [What does Rocket Loader do?](/speed/optimization/content/rocket-loader/)
-   [What does Mirage do?](/speed/optimization/images/mirage/)
