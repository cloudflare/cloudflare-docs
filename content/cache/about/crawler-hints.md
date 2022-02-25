---
pcx-content-type: concept
---

# Crawler Hints

Crawler Hints aims to increase the proportion of relevant crawls and limit crawls that do not find fresh content to reduce the need for repeated crawls.

Search engines and similar services operate massive networks of bots that crawl the Internet to identify the content most relevant to a user query. Content on the web is always changing though, and search engine crawlers must continually wander the Internet and guess how frequently they should check a site for content updates.

With Crawler Hints, Cloudflare can proactively tell a crawler about the best time to index or when content changes. Additionally, Crawler Hints supports [IndexNow](https://www.indexnow.org/), which allows websites to notify search engines whenever content on their website content is created, updated, or deleted.

To enable Crawler Hints, refer to [Enable Crawler Hints](/how-to/enable-crawler-hints).
