---
title: Always Online
pcx_content_type: concept
---

# Always Online

Observe the following best practices when enabling Always Online with Internet Archive integration.

- **Allow requests from the Internet Archive IP addresses.** Origin servers receive requests from the Internet Archive IPs. Make sure you are not blocking requests from the Internet Archive IP range:  `207.241.224.0/20` and `208.70.24.0/21`.
- **Be aware that the Internet Archive does not consider your origin server’s cache-control header.** When the Internet Archive is crawling sites, it will crawl sites regardless of their cache-control, since the Internet Archive does not cache assets, but archives them.
- **Consider potential conflicts with Cloudflare features that transform URIs.** Always Online with Internet Archive integration may cause issues with Page Rules and other Cloudflare features that transform URIs due to the way the Internet Archive crawls pages to archive. Specifically, some redirects that take place at the edge may cause the Internet Archive's crawler not to archive the target URL. Before enabling Origin Cache Control, review [how Cloudflare caches resources by default](/cache/about/default-cache-behavior/) as well as any Page Rules you have configured so that you can avoid these issues. If you experience problems, disable Always Online.
- **Make sure you do not block Known Bots or Verified Bots via a firewall rule.** If you block either of these bot lists, the Internet Archive will not be able to crawl.

Do not use Always Online with:

- API traffic.
- An [IP Access rule](/waf/tools/ip-access-rules/) or [firewall rule](/firewall/) that blocks the United States or
- Bypass Cache page rules. Always Online ignores Bypass Cache page rules and serves Always Online cached assets.

## Limitations

There are limitations with the Always Online functionality:

1.  Always Online is not immediately active for sites recently added due to:
    - DNS record propagation, which can take 24-72 hours
    - Always Online has not initially crawled the website
2.  Cloudflare cannot show private content behind logins or handle form submission (POSTs) if your origin web server is offline.

Always Online does not trigger for HTTP response codes such as [404](https://support.cloudflare.com/hc/articles/115003014512#code_404), [503](https://support.cloudflare.com/hc/articles/115003011431#503error), or [500](https://support.cloudflare.com/hc/articles/115003011431#500error) errors such as database connection errors or internal server errors.

## Frequently asked questions

1. How can I know if a page has been crawled?
    - You can go to the [Internet Archive](https://web.archive.org/) and search for the page URL to see if it has been crawled or not.
    - You can also check this via the [Internet Archive Availability API](https://archive.org/help/wayback_api.php).

2. Why were not pages x, y and z crawled?
    - Since Cloudflare only requests to crawl the most popular pages on the site, it is possible that there will be missing pages. If you really want to archive a page, then you can visit the [Internet Archive](https://web.archive.org/save) save page and ask them to crawl a particular page.

3. What IP addresses do we need to whitelist to make sure crawling works?
    - IP Range: `207.241.224.0/20` and `208.70.24.0/21`. Note that this ip range belongs to Internet Archive and NOT Cloudflare, since it is the Internet Archive that does the crawling.

4. What user agent should the origin expect to see?
    - Currently the Internet Archive uses: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/605.1.15 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/605.1.15`.
