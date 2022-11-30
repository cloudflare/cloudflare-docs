---
pcx_content_type: concept
title: Crawler Hints
---

# Crawler Hints

Crawler Hints aims to increase the proportion of relevant crawls and limit crawls that do not find fresh content to reduce the need for repeated crawls.

## Background

Search engines and similar services operate massive networks of bots that crawl the Internet to identify the content most relevant to a user query. Content on the web is always changing though, and search engine crawlers must continually wander the Internet and guess how frequently they should check a site for content updates.

With Crawler Hints, Cloudflare can proactively tell a crawler about the best time to index or when content changes. Additionally, Crawler Hints supports [IndexNow](https://www.indexnow.org/), which allows websites to notify search engines whenever content on their website content is created, updated, or deleted.

## Benefits

For a website owner, Crawler Hints ensures that search engines and other bot-powered experiences have the freshest version of your content, translating into happier users and ultimately influencing search rankings. 

Crawler Hints also means less traffic hitting your origin, improving resource consumption, site performance, and environmental impact.

## How to enable

To enable Crawler Hints, refer to [Enable Crawler Hints](/cache/how-to/enable-crawler-hints/).
