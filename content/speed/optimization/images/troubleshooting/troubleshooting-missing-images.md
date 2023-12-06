---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200169906-Troubleshooting-missing-images
title: Troubleshooting missing images
---

# Troubleshooting missing images

If images are missing from your website, other Cloudflare features may be interferring with those images.

To troubleshoot:

1. Perform one of the following actions:
    
    - [Purge cache](/cache/how-to/purge-cache) for the URL of the missing image file.
    - [Temporarily pause Cloudflare](/fundamentals/setup/manage-domains/pause-cloudflare/).
    - Disable [Rocket Loader](/speed/optimization/content/rocket-loader/enable/).
    - Disable [Mirage](/speed/optimization/images/mirage/#enable-mirage).
2. Retest the image load in a private browser tab.
3. If the issue is not fixed, try another of the actions suggested in Step 1.