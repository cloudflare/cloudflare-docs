---
pcx_content_type: concept
title: Crawler Hints
---

# Crawler Hints

Crawler Hints aims to increase the proportion of relevant crawls and limit crawls that do not find fresh content to reduce the need for repeated crawls.

## Background

Search engines and similar services operate massive networks of bots that crawl the Internet to identify the content most relevant to a user query. Content on the web is always changing though, and search engine crawlers must continually wander the Internet and guess how frequently they should check a site for content updates.

With Crawler Hints, Cloudflare can proactively tell a crawler about the best time to index or when content changes. Additionally, Crawler Hints supports [IndexNow](https://www.indexnow.org/), which allows websites to notify search engines whenever content on their website content is created, updated, or deleted. Crawler Hints uses cache-status `MISS` to determine when content has likely been updated and sends it to IndexNow's crawler. If an asset's response has an HTTP status code greater than 4xx, the Crawler hints will not report that to [IndexNow](https://www.indexnow.org/).

## Benefits

For a website owner, Crawler Hints ensures that search engines and other bot-powered experiences have the freshest version of your content, translating into happier users and ultimately influencing search rankings. 

Crawler Hints also means less traffic hitting your origin, improving resource consumption, site performance, and environmental impact.

## Availability

{{<feature-table id="cache.crawler_hints">}}

## Enable Crawler Hints

1.  Log in to your [Cloudflare dashboard](https://dash.cloudflare.com) and select your domain.
2.  Go to **Caching** > **Configuration**.
3.  Enable **Crawler Hints**.

After enabling Crawler Hints, Cloudflare will begin sending hints to search engines about when they should crawl particular parts of your website.

## Prevent indexing for a specific page

When enabled, Crawler Hints is a global setting for your entire website. You can stop a specific page from being indexed by either:

* Having the origin server send through the header `X-Robots-Tag: noindex` on any pages that should not be indexed.
* Including `<meta name="robots" content="noindex, nofollow" />` in the HTML of any pages that should not be indexed.
* Creating a [Response header Transform Rule](/rules/transform/response-header-modification/) in Cloudflare to add the `X-Robots-Tag: noindex` header instead of doing it from the origin server.
