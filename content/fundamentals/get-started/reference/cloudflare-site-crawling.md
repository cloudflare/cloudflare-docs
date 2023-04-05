---
pcx_content_type: reference
title: When does Cloudflare crawl my site?
---

# When does Cloudflare crawl my site?

Cloudflare may crawl or make HTTP requests to your site to make sure its protected and performing properly.

## Crawling situations

### Specific products

Cloudflare will crawl your site when you have specific products enabled:

* [**Always Online**](/cache/about/always-online/)
    * *User-Agent*: `Mozilla/5.0 (compatible; CloudFlare-AlwaysOnline/1.0; +http://www.cloudflare.com/always-online)`
* [**SSL/TLS recommender**](/ssl/origin-configuration/ssl-tls-recommender/)
    * *User-Agent*: `Cloudflare-SSLDetector`
    * This crawler ignores your `robots.txt` file unless there are rules explicitly targeting the user agent.
* [**Load balancing monitors**](/load-balancing/understand-basics/monitors/)
    * *User-Agent*: `Mozilla/5.0 (compatible; Cloudflare-Traffic-Manager/1.0; +https://www.cloudflare.com/traffic-manager/; pool-id: <POOLID>)`
* [**Health checks**](/health-checks/)
    * *User-Agent*: `Mozilla/5.0 (compatible; Cloudflare-Traffic-Manager/1.0; +https://www.cloudflare.com/traffic-manager/; healthcheck-id: <HEALTHCHECK_ID>)`
* [**Security Insights**](/security-center/tasks/review-insights/)
    * *User-Agent*: `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36 (compatible; +https://developers.cloudflare.com/security-center/)`

### Other situations

Cloudflare will also crawl your site in other, specific situations:

* **Speed tests**
    * *User-Agent*: `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36 PTST/190628.140653`
    * *Triggered when*: You launch a speed test from within [the Cloudflare dashboard](https://support.cloudflare.com/hc/articles/5550125973005).
* **Support diagnostics**: 
    * *User-Agent*: `Cloudflare-diagnostics`
    * *Triggered when*: Cloudflare support engineers perform error checks and by continuous monitoring used to raise intelligent alerts in the Cloudflare dashboard.
* **Certificate validation**: 
    * *User-Agent*: `Cloudflare Custom Hostname Verification`
    * *Triggered when*: You choose to validate a custom hostname certificate with a [DCV HTTP token](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/http/).
