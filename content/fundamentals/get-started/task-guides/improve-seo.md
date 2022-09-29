---
pcx_content_type: reference
title: Improve SEO
weight: 1
---

# Improve SEO

The goal of Search Engine Optimization (SEO) is to get your website to rank higher on various search engine providers (Google, Bing, etc.).

In practice, SEO is primarily about quality content, user experience, and not making things more difficult for search engine crawlers. While Cloudflare cannot write quality content for you, our service can help with user experience — especially related to [site speed](https://www.cloudflare.com/learning/performance/how-website-speed-boosts-seo/) — and search crawlers.

{{<Aside type="note" header="Tip:">}}

For general guidelines around SEO, refer to [Google's recommendations](https://developers.google.com/search/docs/advanced/guidelines/overview).

{{</Aside>}}

## SEO improvements with Cloudflare

Several Cloudflare features improve Search Engine site rankings. However, meaningful and regularly updated site content is still crucial to improving SEO.

### Increase site speed

Since at least 2010, Google has publicly stated that [site speed affects your Google ranking](https://webmasters.googleblog.com/2010/04/using-site-speed-in-web-search-ranking.html).

Cloudflare offers multiple features to [optimize site performance](/learning-paths/optimize-site-speed/).

### Enable HTTPS

Since search engines use HTTPS as [a ranking signal](https://webmasters.googleblog.com/2014/08/https-as-ranking-signal.html), HTTPS is vital for SEO.

To make sure your domain is accessible over HTTPS:

1.  Get an [SSL/TLS certificate](/ssl/get-started/) for your domain.
2.  [Redirect visitors](/ssl/edge-certificates/encrypt-visitor-traffic/) to the HTTPS version of your domain.

### Enable Crawler Hints

With [Crawler Hints](/cache/about/crawler-hints/), search engines and other bot-powered experiences have the freshest version of your content, translating into happier users and ultimately influencing search rankings. 

### Enable Automatic Signed Exchanges (SXGs)

Automatic Signed Exchanges (SXGs) is an open web platform specification developed by Google to verify a cached version of a website.

When you enable [signed exchanges](https://support.cloudflare.com/hc/articles/4411075595661), your site will load faster when linked to from a site supporting SXG. Since many search engines use page load times to determine search result ranking, SXGs can provide an SEO boost.

## Troubleshooting

Depending on your domain's security settings, you might accidentally block search engine crawlers.

If you notice SEO issues, make sure your:

- [Firewall rules](/firewall/known-issues-and-faq/#caution-about-potentially-blocking-bots) are allowing **Verified Bots**.
- [Rate limiting rules](/waf/rate-limiting-rules/) (new version only) are allowing **Verified Bots**.
- [Bot protection](/bots/concepts/bot/#verified-bots) settings are not blocking **Verified Bots**.

If you still notice issues with search engine crawlers, refer to our [Troubleshooting guide](https://support.cloudflare.com/hc/articles/200169806).

## Common misconceptions

The following characteristics do not affect your domain's SEO:

- **Changing your nameservers**: Using Cloudflare's nameservers does not affect your domain's SEO.
- **Server location**: According to Google, [server location](http://www.seroundtable.com/seo-geo-location-server-google-17468.html) is not important for SEO.
- **Sites sharing IP addresses**: Search engines do not generally penalize domains using shared IP addresses unless several of these sites are malicious or spammy.
- **Cloudflare caching**: When Cloudflare caches your content, it actually speeds up content delivery and only improves SEO. Our caching does not create duplicate content, rewrite URLs, or create additional subdomains.
