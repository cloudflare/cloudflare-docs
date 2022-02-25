---
title: Always Online
pcx-content-type: concept
---

# Always Online

Observe the following best practices when enabling Always Online with Internet Archive integration.

*   **Allow requests from Cloudflare IP addresses.** Origin servers for domains [proxied through Cloudflare](/dns/manage-dns-records/reference/proxied-dns-records) receive requests from Cloudflare IP addresses. To avoid blocking these requests, follow the guidelines for [allowing Cloudflare IP addresses](https://support.cloudflare.com/hc/articles/201897700). When you observe the Always Online banner while your origin web server is online, your origin web server or hosting provider is likely blocking or rate limiting Cloudflare requests.
*   **Configure your origin server’s Cache Control header.** To ensure Always Online caches resources for your site, do not set your origin server’s Cache Control header to `no-cache`, `must-revalidate`, or `max-age=0`.
*   **Consider potential conflicts with Cloudflare features that transform URIs.** Always Online Beta with Internet Archive integration may cause issues with Page Rules and other Cloudflare features that transform URIs due to the way the Internet Archive crawls pages to archive. Specifically, some redirects that take place at the edge may cause the Internet Archive's crawler not to archive the target URL. Before enabling Origin Cache Control, review [how Cloudflare caches resources by default](/cache/about/default-cache-behavior/) as well as any Page Rules you have configured so that you can avoid these issues. If you experience problems, disable Always Online Beta.

Do not use Always Online with:

*   [Custom Hostnames (SSL for SaaS)](/ssl/ssl-for-saas)
*   API traffic
*   An [IP Access Rule](https://support.cloudflare.com/hc/articles/217074967) or [Firewall Rule](https://support.cloudflare.com/hc/articles/360016473712) that blocks the United States or
*   A [Cache Everything Page Rule](/cache/how-to/create-page-rules/#cache-everything) that configures an Edge Cache TTL lower than the Always Online crawl frequency pertaining to your domain plan type.
*   Bypass Cache page rules. Always Online ignores Bypass Cache page rules and serves Always Online cached assets.

## Limitations

There are limitations with the Always Online functionality:

1.  Always Online is not immediately active for sites recently added due to:
    *   DNS record propagation, which can take 24-72 hours
    *   Always Online has not initially crawled the website
2.  Cloudflare cannot show private content behind logins or handle form submission (POSTs) if your origin web server is offline.

Always Online does not trigger for HTTP response codes such as [404](https://support.cloudflare.com/hc/articles/115003014512#code_404), [503](https://support.cloudflare.com/hc/articles/115003011431#503error), or [500](https://support.cloudflare.com/hc/articles/115003011431#500error) errors such as database connection errors or internal server errors.
