---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/217720788-Troubleshooting-issues-sharing-to-Facebook
title: Issues sharing to Facebook
weight: 2
---

# Issues sharing to Facebook

Cloudflare does not block or challenge requests from Facebook by default. However, a post of a website to Facebook returns an _Attention Required_ error in the following situations:

- You have globally set the [security level](/waf/tools/security-level/) to _I'm Under Attack_.
- There is a [configuration rule](/rules/configuration-rules/) or [page rule](/rules/page-rules/) setting the security level to _I'm Under Attack_.
- There is a [custom rule](/waf/custom-rules/) with a challenge or block action that includes a Facebook IP address.

A country challenge can block a Facebook IP address. Facebook is known to crawl from both the US and Ireland.

## Resolution

To resolve issues sharing to Facebook, do one of the following:

- Remove the corresponding IP, ASN, or country custom rule that challenges or blocks Facebook IPs.
- Create a [skip rule](/waf/custom-rules/skip/) for ASNs `AS32934` and `AS63293` (use the _Skip_ action and configure the rule to skip **Security Level**).
- Review existing configuration rules and page rules and make sure they are not affecting requests from Facebook IPs.

If you experience issues with Facebook sharing, you can re-scrape pages via the **Fetch New Scrape Information** option on Facebook's Object Debugger. Facebook [provides an API](https://developers.facebook.com/docs/sharing/opengraph/using-objects) to help update a large number of resources.

If you continue to have issues, you can [contact Cloudflare Support](/support/contacting-cloudflare-support/) with the URLs of your website that cannot share to Facebook, and confirming that you have re-scraped the URLs.
