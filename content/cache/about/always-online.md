---
title: Always Online
pcx_content_type: concept
---

# Always Online

Cloudflare’s Always Online feature is now integrated with the [Internet Archive](https://archive.org/) so that visitors can access a portion of your website even when your origin server is unreachable and a Cloudflare-cached version is unavailable. When your origin is unreachable, Always Online checks Cloudflare’s cache for a stale or expired version of your website. If a version does not exist, Cloudflare goes to the Internet Archive to fetch and serve static portions of your website.

When you enable Always Online with Internet Archive integration, Cloudflare shares your hostname and popular URL paths with the archive so that the Internet Archive’s crawler stores the pages you want archived. When submitting targets to the crawler, Cloudflare identifies the most popular URLs found among GET requests that returned a 200 HTTP status code in the previous five hours.

Note that Cloudflare does not save a copy of every page of your website, and it cannot serve dynamic content while your origin is offline. If the requested page is not in the Internet Archive's Wayback Machine, the visitor sees the actual error page caused by the offline origin web server.

When the Internet Archive integration is enabled, Cloudflare tells the Internet Archive what pages to crawl and how often. The pages to crawl, as previously mentioned, are the most popular URLs that were successfully visited in the last five hours. The crawling intervals, to ensure stability of service, are limited by Cloudflare. Limits vary according to your Cloudflare plan.

## Availability

{{<feature-table id="cache.always_online">}}

## Visitor Experience

When Always Online with Internet Archive integration is enabled, visitors see a banner at the top of the web page explaining they are visiting an archived version of the website. Visitors can select the Refresh button to check whether the origin has recovered and fresh content is available.

When a visitor requests content for an offline website, Cloudflare returns an HTTP response status code in the range [520–527](https://support.cloudflare.com/hc/en-us/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#:~:text=Error%20520%20occurs%20when%20the,or%20unexpected%20response%20to%20Cloudflare.&text=Contact%20your%20hosting%20provider%20or%20site%20administrator%20and%20request%20a,Origin%20web%20server%20application%20crashes), depending on the issue. These status codes indicate that the origin is unreachable.

When the Internet Archive integration is enabled, Cloudflare checks the archive and serves the most recently archived version of the page.

Visitors who interact with dynamic parts of a website, such as a shopping cart or comment box, will see an error page caused by the offline origin web server.

To enable Always Online, see [Enable Always Online](/cache/how-to/enable-always-online/).
