---
pcx-content-type: reference
title: When does Cloudflare crawl my site?
---

# When does Cloudflare crawl my site?

Cloudflare may crawl or make HTTP requests to your site to make sure its protected and performing properly.

## Crawling situations

### Specific products

Cloudflare will crawl your site when you have specific products enabled:

* [**Always Online**](/cache/about/always-online/)
    * *User agent*: `Mozilla/5.0 (compatible; CloudFlare-AlwaysOnline/1.0; +http://www.cloudflare.com/always-online)`
* [**SSL/TLS recommender**](/ssl/origin-configuration/ssltls-recommender/)
    * *User agent*: `Cloudflare-SSLDetector` 
    * This crawler ignores your `robots.txt` file unless there are rules explicitly targeting the user agent.
* [**Load balancing monitors**](/load-balancing/understand-basics/monitors/)
    * *User agent*: `Mozilla/5.0 (compatible; Cloudflare-Traffic-Manager/1.0; +https://www.cloudflare.com/traffic-manager/; pool-id: <POOLID>)`

### Other situations

Cloudflare will also crawl your site in other, specific situations:

* **Speed tests**
    * *User agent*: `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36 PTST/190628.140653`
    * Triggered when you launch a speed test from within [the Cloudflare dashboard](https://support.cloudflare.com/hc/articles/200172856) or at https://www.cloudflare.com/lp/can-your-website-be-faster/.
* **Support diagnostics**: 
    * *User agent*: `Cloudflare-diagnostics`
    * Triggered when Cloudflare support engineers perform error checks and by continuous monitoring used to raise intelligent alerts in the Cloudflare dashboard.