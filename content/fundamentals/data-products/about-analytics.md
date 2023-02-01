---
pcx_content_type: reference
title: About Cloudflare Analytics
weight: 1
meta:
    title: A quick overview of Cloudflare Analytics
---

# About Cloudflare Analytics

In an effort to make analytics an ubiquitous component of all Cloudflare's products, Cloudflare has implemented, and continues to evolve, several ways in which customers can access and gain insights from Internet properties on Cloudflare.

You can access root-level analytics that give you an overview of metadata related to your Cloudflare account, analytics related to specific properties and products, and the GraphQL API that gives you more control over how you visualize the analytics and log information available on the Cloudflare dashboard.

In a small number of cases, the analytics provided on the Cloudflare dashboard and GraphQL Analytics API are based on a sample — a subset of the dataset. In these cases, [Cloudflare Analytics returns an estimate derived from the sampled value](https://developers.cloudflare.com/analytics/graphql-api/sampling/). For example, suppose that during an attack the sampling rate is 10% and 5,000 events are sampled. Cloudflare will estimate 50,000 total events (5,000 × 10) and report this value in Analytics.

Refer to [Types of analytics](/fundamentals/data-products/types-of-analytics/) for more information regarding this subject.



## How Cloudflare captures and processes analytics data

The underlying datasets that Cloudflare Analytics captures and processes share the following characteristics:

* All metrics reflect traffic proxied through the Cloudflare network (also known as orange-clouded), as configured via DNS records in the Cloudflare DNS app. Note that for a [CNAME setup](/dns/zone-setups/partial-setup/), Cloudflare is unable to offer DNS metrics.
* Cloudflare does not count traffic for unproxied DNS records. However, if your site is not proxied through Cloudflare but Cloudflare is your authoritative DNS server, then we are able to collect DNS metrics.
* Cloudflare can only proxy information for traffic targeting [specific ports](/fundamentals/get-started/reference/network-ports/).
* In determining the originating country, Cloudflare uses the IP address associated with each request. Learn about [Configuring Cloudflare IP Geolocation](https://support.cloudflare.com/hc/articles/200168236).

## Apparent data discrepancies

It is possible that your Cloudflare metrics do not fully align with data for the same site as reported by other analytics sources, such as Google Analytics and web server logs.

Once Cloudflare identifies a unique IP address for a request, we identify such request as a visit. Therefore, the number of visitors Cloudflare Analytics shows is probably higher than what other analytics services may report.

For example, Google Analytics and other web-based analytics programs use JavaScript on the web browser to track visitors. As a result, Google Analytics does not record threats, bots, and automated crawlers because those requests typically do not trigger JavaScript. Also, these services do not track visitors who disable JavaScript on their browser or who leave a page before it fully loads.

Finally, it is likely that unique visitor data from the Cloudflare Analytics app is greater than your search analytics unique pageviews. This is because pageviews reflect when someone visits a page via a web browser and loads the entire page. However, when another site or service like a bot, plugin, or API is consuming partial content from your site (but not loading a full page), this counts as a unique visitor in Cloudflare and not as a pageview.

## About missing metrics

You may not be seeing metrics on Cloudflare Analytics for the following reasons:

* You only recently signed up for Cloudflare. Metrics are delayed 24 hours for domains on a free Cloudflare plan.
* If you signed up directly with Cloudflare, your nameservers might not be pointing to Cloudflare at your registrar just yet. Registrars can take 24-72 hours to update their nameservers. Metrics will not start gathering until we detect the nameservers pointing to Cloudflare.
* If you signed up through a Cloudflare [hosting partner option](https://www.cloudflare.com/partners/), something might not be configured correctly. Contact the hosting partner for support.
* Some browser extensions designed to block ads may prevent analytics from loading. To address this issue, disable the ad block extension or allow `cloudflare.com` on it.


## Data Retention

Regarding the time of data retention, that depends on the Cloudflare product and features that you've enabled, and also from the zone plan choosed.

In Network Analytics v2 dashboard, the range of historical data you can query is 120 days. When you select Previous 30 minutes, the Network Analytics card will show the data from the last 30 minutes, refreshing every 20 seconds.  Learn more about [how to adjust the time range](https://developers.cloudflare.com/analytics/network-analytics/configure/time-range/).

However, when you are using the [Logpull API](https://developers.cloudflare.com/logs/logpull/understanding-the-basics/#data-retention-period), you can query for logs starting from 1 minute in the past (relative to the actual time that you make the query) and go back at least 3 days and up to 7 days.

When using [Workers](https://developers.cloudflare.com/workers/learning/metrics-and-analytics/#metrics-retention), the script metrics can be inspected for up to three months in the past in maximum increments of one week, and on the zone analytics, the data can be scoped by time range within the last 30 days.

For the Security Events the historical time depends on the zone plan, which means that for a free plan the data it's only available for the last 24 hours, but for Enterprise you can check the data up to 30 days. Check all the [historical time per plan](https://developers.cloudflare.com/waf/security-events/#availability).

If you are trying to collect the data more than that times, we can recommend you to explore the [Clouflare Logpush](https://developers.cloudflare.com/logs/about/) available only for Enterprise plans. In addition, [Workers Trace Events Logpush](https://developers.cloudflare.com/workers/platform/logpush/) is available on the [Workers Paid plan](https://developers.cloudflare.com/workers/platform/pricing/).






{{<Aside type="note">}}Activations through a hosting partner works via a [CNAME setup](/dns/zone-setups/partial-setup/) on the `www` record. If most of your traffic actually goes to `domain.com`, [forward your traffic](/rules/url-forwarding/bulk-redirects/) from `domain.com` to `www.domain.com`.{{</Aside>}}
