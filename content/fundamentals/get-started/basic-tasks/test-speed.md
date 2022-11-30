---
pcx_content_type: how-to
title: Test speed
weight: 5
---

# Test speed

Cloudflare offers several tools to test the speed of your website, as well as the speed of your Internet connection.

---

## Test website speed

### Using Cloudflare

Once your domain is [active on Cloudflare](/fundamentals/get-started/setup/add-site/), you can run speed tests within the [Cloudflare dashboard](https://dash.cloudflare.com/?to=/:account/:zone/speed).

This speed test will provide information about critical loading times, performance with and without [Cloudflare's proxy](/fundamentals/get-started/concepts/how-cloudflare-works/), and recommended optimizations.

If you experience any issues, make sure you are not blocking specific [user agents](/fundamentals/get-started/reference/cloudflare-site-crawling/#other-situations).

### Using third-party tools

If your domain is not yet active on Cloudflare or you want to measure the before and after improvements of using Cloudflare, Cloudflare recommends using the following third-party tools:

- [GTmetrix](https://gtmetrix.com/)
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/)
- [WebPageTest](https://www.webpagetest.org/)

If you use these third-party tools, you should do the following to test website speed:

1. [Pause Cloudflare](/fundamentals/get-started/basic-tasks/manage-domains/pause-cloudflare/) to remove performance and caching benefits.
2. Run a speed test.
3. Unpause Cloudflare.
4. Run a speed test[^1].
5. Run a second speed test to get your baseline performance with Cloudflare.


[^1]: The results of your first speed test with Cloudflare will likely contain uncached results, which will provide inaccurate results.<br/><br/>One of the key ways Cloudflare speeds up your site is through [caching](/fundamentals/get-started/concepts/how-cloudflare-works/#performance), which will appear in the results of the second test.

### Improve speed

Based on the results of these speed tests, you may want to explore other ways to [optimize your site speed](/learning-paths/optimize-site-speed/) using Cloudflare.

{{<Aside type="note">}}

Cloudflare does not consider Time to First Byte (TTFB) the most important measure of page load speed. If you are concerned about a slower TTFB while using Cloudflare, refer to our blog post about [Cloudflare and TTFB](http://blog.cloudflare.com/ttfb-time-to-first-byte-considered-meaningles/).

{{</Aside>}}

---

## Test Internet speed

To test the speed of your home network connection (download, update, packet loss, ping measurements, and more), visit [speed.cloudflare.com](https://speed.cloudflare.com).