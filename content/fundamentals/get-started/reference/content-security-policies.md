---
pcx_content_type: reference
title: Content Security Policies (CSPs)
meta:
  title: Content Security Policies (CSPs) and Cloudflare
---

# Content Security Policies (CSPs) and Cloudflare

A **Content Security Policy (CSP)** is an added layer of security that helps detect and mitigate certain types of attacks, including:

* Content/code injection
* Cross-site scripting (XSS)
* Embedding malicious resources
* Malicious iframes (clickjacking)

To learn more about configuring a CSP in general, refer to the [Mozilla documentation](https://developer.mozilla.org/docs/web/http/csp).

## Using a CSP with Cloudflare

Cloudflare’s [CDN](/cache/) is compatible with CSP.

Cloudflare does not:

* Modify CSP headers from the origin web server.
* Require changes to acceptable sources for first or third-party content.
* Modify URLs (besides adding the [`/cdn-cgi/` endpoint](/fundamentals/get-started/reference/cdn-cgi-endpoint/)).
* Interfere with locations specified in your CSP.

### Product requirements

To use certain Cloudflare features, however, you may need to update the headers in your CSP:

| Feature(s) | Updated headers |
| --- | --- |
| [Rocket Loader](/speed/optimization/content/rocket-loader/), [Mirage](/speed/optimization/images/mirage/) | `script-src 'self' ajax.cloudflare.com;` |
| [Cloudflare Apps](https://support.cloudflare.com/hc/articles/115000304631), [Scrape Shield](https://support.cloudflare.com/hc/articles/200171036) | `script-src 'self' 'unsafe-inline'`|
| [Web Analytics](/analytics/web-analytics) | `script-src static.cloudflareinsights.com; connect-src cloudflareinsights.com` |
| [Bot products](/bots/) | Refer to [JavaScript detections and CSPs](/bots/reference/javascript-detections/#if-you-have-a-content-security-policy-csp).|
| [Page Shield](/page-shield/) | Refer to [Page Shield CSP Header format](/page-shield/reference/csp-header/). |
| [Zaraz](/zaraz/) | No updates required ([details](https://blog.cloudflare.com/cloudflare-zaraz-supports-csp/)).|
| [Turnstile](/turnstile/) | Refer to [Turnstile FAQ](/turnstile/frequently-asked-questions/#how-does-content-security-policy-need-to-be-configured-for-turnstile).|