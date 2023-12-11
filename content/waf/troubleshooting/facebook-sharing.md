---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/217720788-Troubleshooting-issues-sharing-to-Facebook
title: Issues sharing to Facebook
---

# Issues sharing to Facebook

Cloudflare does not block or challenge requests from Facebook by default. However, a post of a website to Facebook returns an _Attention Required_ error in the following situations:

-   The security level is set to [I'm Under Attack](/waf/tools/security-level/) globally or via [Rules](/rules).
-   There is a [custom rule](/waf/custom-rules/) challenging or block that includes a Facebook IP address.

A country challenge can block a Facebook IP addresses. Facebook is known to crawl from both the US and Ireland.

## Resolution

To resolve issues sharing to Facebook, either:

-   Remove the corresponding IP, ASN, or Country [WAF custom rule](/waf/custom-rules/) that challenges or blocks Facebook IPs.
-   Allow `AS32934` and `AS63293` in your [IP Access rules](/waf/tools/ip-access-rules/) to override challenges, blocks, and Under Attack challenges.

If you experience issues with Facebook sharing, you can re-scrape pages via the **Fetch New Scrape Information** option on Facebook's Object Debugger. Facebook [provides an API](https://developers.facebook.com/docs/sharing/opengraph/using-objects) to help update a large number of resources.

You can [contact Cloudflare Support](/support/contacting-cloudflare-support/) with the URLs of your website that cannot share to Facebook and confirmation you have re-scraped the URLs if you continue to have issues.
