---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/203020124-Recovering-from-a-hacked-site
title: Recovering from a hacked site
---

# Recovering from a hacked site

If your website has been hacked recently, review the recommended steps below to recover a hacked website and prevent future hacks.

## Recovering from an attack

To recover from an attack, reach out to your hosting provider to request:

- Details about the hack, including how they believe the site was hacked.
- That your hosting provider remove any malicious content placed on your website.

Once the hack has been resolved, you should resolve site warnings in [Google Webmaster Tools](https://www.google.com/webmasters/tools) and resubmit your site for Google’s review.

---

## Preventing and mitigating the risks of a future hack

To prevent the risk of a hacked site:

- Activate Cloudflare's [WAF managed rules](/waf/managed-rules/) so they can challenge or block known malicious behavior.
- If you use a Content Management System (CMS), make sure you have the most recent version installed (CMS platforms push out updates to address known vulnerabilities).
- If you use plugins, make sure they are updated.
- If you have an admin login page, protect it with Cloudflare's [Rate limiting rules](/waf/rate-limiting-rules/) or a [Cloudflare Access policy](/cloudflare-one/policies/access/).
- Use a backup service so you can avoid losing valid content. 
