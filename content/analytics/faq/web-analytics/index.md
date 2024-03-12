---
pcx_content_type: faq
title: Web Analytics FAQs
weight: 7
structured_data: true
---

# Web Analytics FAQ

Below you will find answers to our most commonly asked questions. If you cannot find the answer you are looking for, refer to the [community page](https://community.cloudflare.com/) to explore more resources.

- [Errors](#errors)
- [Setup](#setup)
- [Functionality](#functionality)

## Errors

{{<faq-item>}}
{{<faq-question level=3 text="When I add the beacon to my website and load the webpage, I see an error that includes `is not allowed by Access-Control-Allow-Origin` (CORS). What is happening?" >}}

{{<faq-answer>}}

This error usually occurs when the hostname of the site loading the analytics does not match the name of the analytics site configured in the dashboard. Double-check that they are identical.

Cloudflare matches hostnames based on a postfix. For example, if you set up analytics for `example.com`, we will allow analytics from `www.example.com`, `blog.staging.example.com`, and `fooexample.com`. However, we will not allow analytics from `example.com.br`.

You may also see this error if the site does not send a `Referer` or `Origin` header. The `Referer` header is required (do not try to use the `Referrer-policy` header instead). We have a change in-flight now that only the `Origin` header will be required – we believe there is no way to disable that in the browser.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=3 text="The analytics beacon is blocked by ad-blockers (including adblockplus, Brave, DuckDuckGo extension, etc). Why is that?" >}}

{{<faq-answer>}}

Cloudflare is aware that the analytics beacon is blocked by these services.

While Cloudflare Web Analytics uses a JavaScript beacon, Cloudflare’s edge analytics cannot be blocked because we can measure every request that is received. Edge analytics are available to any customer who proxies traffic through Cloudflare. Currently, users on Pro, Business, and Enterprise plans get advanced web analytics powered by our edge logs.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=3 text="Why am I not seeing all the metrics for single-page application (SPA) or multiple-page application (MPA)?" >}}

{{<faq-answer>}}

Every route change that occurs in the single-page app will send the measurement of the route before the route is changed to the beacon endpoint. The measurement for the last route change will be sent whenever the user leaves the tab or closes the browser window. That will trigger `visibilityState` to a hidden state. Whenever that happens, Beacon JS sends the payload using the [Navigator.sendBeacon method](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon) that should not be cancelled even when the browser window is closed. However, due to compatibility, old browsers would fallback to using AJAX (`XmlHttpRequest`), which can be cancelled when the browser window is closed, so the last payload that gets sent to the beacon endpoint can be lost. Also, due to various network conditions, there can be data loss when the payload is sent to the beacon endpoint.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=3 text="For the same site, why would I see more data reported with an automatic setup?" >}}

{{<faq-answer>}}

Unless you are using Rules to control which pages to be measured, using [automatic setup] will inject the JS snippet on all pages (sub-domains) under the zone.

If you used a [manual setup] instead, only those pages that render the JS snippet will be reported.

{{<Aside type="note">}}

Since only one JS snippet can be rendered and used per page, you cannot have multiple snippets on the same page.

{{</Aside>}}

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=3 text="My website is proxied through Cloudflare, but Web Analytic's automatic setup is not working." >}}

{{<faq-answer>}}

If you have a `Cache-Control` header set to `public, no-transform`, Cloudflare proxy will not be able to modify the original payload of the website. Therefore, the Beacon script will not be automatically injected to your site, and Web Analytics will not work. Refer to [Origin cache control](/cache/concepts/cache-control/) for more information. 

{{</faq-answer>}}
{{</faq-item>}}

---

## Setup

{{<faq-item>}}
{{<faq-question level=3 text="I am proxying my site through Cloudflare. Should I manually add the JS beacon?" >}}

{{<faq-answer>}}

You can, but you do not have to. Cloudflare Web Analytics is designed primarily for customers who do not use Cloudflare's proxy to measure their web traffic.

Existing Cloudflare customers can access analytics collected from our edge on the **Analytics** tab of the dashboard. You can also enable Web Analytics to measure performance using JavaScript.

Using a domain proxied through Cloudflare with [automatic setup] will report stats back to your own domain's `/cdn-cgi/rum` endpoint. If you have installed JS snippet yourself (a [manual setup]), it will report back to `cloudflareinsights.com/cdn-cgi/rum` endpoint.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=3 text="Can I add Web Analytics to my site using a tag manager like Google Tag Manager (GTM)?" >}}

{{<faq-answer>}}

Yes. Instead of embedding the script using a tag manager as shown here:

```html
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "$SITE_TOKEN"}'></script>
```

Add the following script:

```html
<script defer src='https://static.cloudflareinsights.com/beacon.min.js?token=$SITE_TOKEN'></script>
```

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=3 text="Can I use the same JS Snippet for a different domain?" >}}

{{<faq-answer>}}

No. However, if the apex domain (also known as "root domain" or "naked domain") is the same, you can use the same site tag. For example, if you have provided us a hostname `example.com` when registering a site, you can use the JS snippet from that site for `abc.example.com` and `def.example.com` since they use the same apex domain. When payload gets sent to the beacon endpoint, we validate the hostname with postfix matching, so if your domain shares the same apex domain, that would work.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=3 text="Can I use automatic setup with a DNS-only domain (CNAME setup)?" >}}

{{<faq-answer>}}

No, you can only use the [automatic setup] with JS snippet injection if traffic to your domain is proxied through Cloudflare (orange-clouded).

If you have a DNS-only domain, you will have to do a [manual setup] instead.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=3 text="What prevents the JS Snippet from being added to a page?" >}}

{{<faq-answer>}}

{{<render file="_web-analytics-troubleshooting.md">}}

{{</faq-answer>}}
{{</faq-item>}}

---

## Functionality

{{<faq-item>}}
{{<faq-question level=3 text="Can I see server-side analytics by URL?" >}}

{{<faq-answer>}}

Web Analytics only displays client-side analytics. All Cloudflare customers who proxy their traffic also get analytics based on traffic at their edge.

Currently, users on Pro, Business, and Enterprise plans get advanced HTTP traffic analytics, which is the only way to see features like a breakdown of traffic by URL based on server-side analytics.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=3 text="Can I use Web Analytics with AMP?" >}}

{{<faq-answer>}}

Not yet, but we plan to support AMP soon.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=3 text="What is the period of time I can access data in Web Analytics?" >}}

{{<faq-answer>}}

Currently, you can access data for the previous six months.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=3 text="Does Cloudflare Web Analytics support UTM parameters?" >}}

{{<faq-answer>}}

Not yet. UTM parameters are special query string parameters that can help track where traffic is coming from.
Currently, Cloudflare Web Analytics do not log query strings to avoid collecting potentially sensitive data, but we may add support for this in the future.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=3 text="Does Web Analytics support custom events?" >}}

{{<faq-answer>}}

Not yet, but we may add support for this in the future.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=3 text="Can I track more than one website with Web Analytics?" >}}

{{<faq-answer>}}

Yes. Right now there is a soft limit of ten sites per account, but that can be adjusted by contacting Cloudflare support.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=3 text="When does the beacon send metrics to the `/cdn-cgi/rum/` endpoint?" >}}

{{<faq-answer>}}

For traditional websites, not Single Page Applications (SPAs), the Web Analytics beacon reports to the `/cdn-cgi/rum/` endpoint when the page has finished loading (load event) and when the user leaves the page. For Single Page Applications, additional metrics are sent for every route change to capture the page load event.

[manual setup]: /analytics/web-analytics/getting-started/#sites-not-proxied-through-cloudflare
[automatic setup]: /analytics/web-analytics/getting-started/#sites-proxied-through-cloudflare

{{</faq-answer>}}
{{</faq-item>}}