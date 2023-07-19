---
pcx_content_type: reference
title: Reference
weight: 2
---

# Reference

## Verify that AMP Real URL is working

After the feature is enabled, it takes Google AMP Cache about a week to detect and serve the new URL. After this period of time, visit your AMP pages from Google search results on Chrome for Android, and you should be able to see your actual URL. You can also go to `https://<YOUR_DOMAIN>/cdn-fpw/sxg/cert.pem.msg` to verify that the feature is working. If the page does not return a `404` error and instead prompts you to download a certificate, AMP Real URL is working.

## Search Console errors

Even when the Search Console (AMP Pages) is returning a `The dates for the signed exchange are invalid` error message, Google can still parse the signed exchange and treat it like normal HTML. In the case of an AMP page, Google should fall back to treat it like it would treat a regular AMP page. This should not be a problem.
