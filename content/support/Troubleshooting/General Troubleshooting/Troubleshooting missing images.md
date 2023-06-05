---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200169906-Troubleshooting-missing-images
title: Troubleshooting missing images
---

# Troubleshooting missing images



## Overview

If images are missing from your website, perform the following steps while retesting the image load in a private browser tab after each step:

-   [Purge cache for the URL](https://support.cloudflare.com/hc/articles/200169246#h_fb40387b-d068-4c38-96fc-29d05d35e81e) of the missing image file.
-   [Temporarily pause Cloudflare](https://support.cloudflare.com/hc/articles/203118044#h_8654c523-e31e-4f40-a3c7-0674336a2753).
-   In the Cloudflare dashboard:
    -   Disable **Rocket Loader** in the **Speed app** > **Optimization**. Scroll down until you find **Rocket Loader**.
    -   Disable **Mirage** in the **Speed app** > **Optimization**. Scroll down until you find **Mirage**.

{{<Aside type="note">}}
**Mirage** is only available for domains on a paid Cloudflare plan.
{{</Aside>}}

-   [Inform Cloudflare support](https://support.cloudflare.com/hc/articles/200172476) of the issue and request assistance.

___

## Related resources

-   [What does Rocket Loader do?](https://support.cloudflare.com/hc/articles/200168056)[](https://support.cloudflare.com/hc/articles/200403554)
-   [What does Mirage do?](https://support.cloudflare.com/hc/articles/200403554)
