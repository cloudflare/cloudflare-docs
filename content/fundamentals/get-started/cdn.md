---
pcx-content-type: concept
title: Cloudflare's CDN
weight: 0
---

# Cloudflare's CDN

Cloudflare’s Content Delivery Network (CDN) is a geographically distributed group of servers that ensure fast delivery of Internet content, including HTML pages, JavaScript files, stylesheets, and images. Caching static resources at Cloudflare reduces your server load and bandwidth, with no extra charges for bandwidth spikes.

{{<Aside type="note" header="Note:">}}

Cloudflare does not require an extra CDN subdomain or hostname, and you do not need to change your URLs.

{{</Aside>}}

There are many reasons to use [Cloudflare’s CDN](https://www.cloudflare.com/features-cdn) for your site:

*   **User Experience**: Without Cloudflare’s CDN, visitors geographically distant from your origin web server experience slow page loads. [Cloudflare’s Anycast network](https://www.cloudflare.com/learning/cdn/glossary/anycast-network/) brings content geographically closer to your visitors to reduce page load and latency.

*   **Traffic surges**: Due to a major news release or online event, sudden [influxes of traffic](https://support.cloudflare.com/hc/en-us/articles/200172906-What-should-I-do-if-I-m-expecting-a-surge-or-spike-in-traffic-) to your site can overload your origin web server. Cloudflare’s CDN serves your cached content to remove load from your origin web server.

*   **DDoS Protection**: [Distributed Denial of Service (DDoS)](https://www.cloudflare.com/ddos/) attacks disrupt websites by flooding their infrastructure with traffic. Cloudflare’s CDN has a network capacity 15 times bigger than the largest DDoS attack ever recorded and handles modern DDoS to ensure your website stays online.

## Cache

Cloudflare makes customer websites faster by storing a copy of the website’s content on the servers of our globally distributed data centers.

For more information about caching, refer to the [Cache documentation](/cache/).
