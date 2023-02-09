---
pcx_content_type: reference
title: AMP Real URL
weight: 2
---

# AMP Real URL

Cloudflare AMP Real URL leverages signed exchanges to authenticate content when served from Google’s AMP cache. When a supported crawler is detected, AMP Real URL will create a signed exchange for content that is requested from your domain. When using a supported Chromium browser, the page is validated using a signed exchange and is displayed on the user’s device with the original URL of your site.
 
## Difference between AMP Real URL and AMP

Without AMP Real URL, clicking on a search result for an AMP page takes visitors to a cached page served from `google.com/amp/`. AMP Real URL allows mobile browsers to show the actual URL of your website while still serving the content from Google’s AMP cache. This is accomplished through signed exchanges. AMP Real URL only works on pages that are compatible with the AMP specification, and only applies to visitors coming from Chrome on Android at this time. 

Showing the actual URL to your website's visitors offers several advantages:

* **Brand fidelity**: Visitors to your site see your brand, not Google’s, at the top of all your pages.
* **More accurate analytics**: Keeping AMP and non-AMP content in the same domain facilitates more accurate analytics attribution.
* **Reduced bounce rates**: Showing your actual URL may encourage users to remain on your site, instead of returning to the search results page.
* **Security**: AMP Real URL uses signed exchanges to sign your AMP pages with a publicly verifiable certificate, ensuring no one can add, remove, or modify your content.

## Availability

{{<feature-table id="speed.amp">}}