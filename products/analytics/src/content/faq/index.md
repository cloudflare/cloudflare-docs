---
title: FAQ
order: 40
---

# FAQs

## Web Analytics FAQ

### When I add the beacon to my website and load the webpage, I see an error that includes "is not allowed by Access-Controll-Allow-Origin" (CORS). What's happening?

This error usually occurs when the hostname of the site loading the analytics does not match the name of the analytics site configured in the dashboard. Double-check that they are identical. 

Cloudflare matches hostnames based on a postfix. For example, if you set up analytics for "example.com", we'll allow analytics from "www.example.com," "blog.staging.example.com," and "fooexample.com." However, we won't allow analytics from "example.com.br."

You may also see this error if the site does not send a "Referer" or "Origin" header. The "Referer" header is required (don't try to use the "Referrer-policy" header instead). We have a change in-flight now that only the "Origin" header will be required – we believe there is no way to disable that in the browser.

### Can I track more than one website with Web Analytics?

Yes. Right now there's a soft limit of 10 sites per account, but that can be adjusted by contacting Cloudflare support.

### The analytics beacon is blocked by ad-blockers (including adblockplus, Brave, DuckDuckGo extension, etc). Why is that?

Cloudflare is aware that the analytics beacon is blocked by these services.

While Cloudflare Web Analytics uses a JS beacon, Cloudflare’s edge analytics can't be blocked because we can measure every request that's received. Edge analytics are available to any customer who "orange clouds" and proxies traffic through Cloudflare. Currently, users on Pro, Business, and Enterprise plans get advanced web analytics powered by our edge logs.

### If I'm proxying my site through Cloudflare already, should I manually add the JS beacon?

You can, but you don't have to. 

Existing Cloudflare customers can access analytics collected from our edge on the "Analytics" tab of the dashboard. You can also enable Browser Insights to measure performance using JavaScript.

Cloudflare Web Analytics is designed primarily for customers who do not use Cloudflare's proxy to measure their web traffic. However, in the future we may add the option for orange-cloud users to automatically add the beacon if they'd like to measure web traffic using the beacon. 

### Can I see server-side analytics by URL?
Web Analytics only displays client-side analytics. All Cloudflare customers who proxy their traffic also get analytics based on traffic at their edge.

Currently users on Pro, Business, and Enterprise plans get advanced HTTP traffic analytics, which is the only way to see features like a breakdown of traffic by URL based on server-side analytics. 

### Can I use Web Analytics with AMP?
Not yet, but we plan to support AMP soon. 
 
### Can I add Web Analytics to my site using a tag manager like Google Tag Manager (GTM)?
Yes. Instead of embedding the script using a tag manager as shown here:
```bash
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "$SITE_TOKEN"}'></script>
```

Add the following script:
```bash
<script defer src='https://static.cloudflareinsights.com/beacon.min.js?token=$SITE_TOKEN'></script>
```

### Does Cloudflare Web Analytics support UTM parameters?
Not yet. UTM parameters are special query string parameters that can help track where traffic is coming from. 
Currently Cloudflare Web Analytics don't log query strings to avoid collecting potentially sensitive data, but we may add support for this in the future.

### Does Web Analytics support custom events?
Not yet, but we may add support for this in the future.
  
### I'm not seeing all the metrics for SPA (or even MPA). Why is that?
Every route change that occurs in the single-page app will send the measurement of the route before the route is changed to the beacon endpoint. The measurement for the last route change will be sent whenever the user leaves the tab or closes the browser window. That will trigger visibilityState to a hidden state. Whenever that happens, Beacon JS sends the payload using the [Navigator.sendBeacon method](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon) that should not be cancelled even when the browser window is closed. However, due to compatibility, old browsers would fallback to using Ajax (XmlHttpRequest), which can be cancelled when the browser window is closed, so the last payload that gets sent to the beacon endpoint can be lost. Also, due to various network conditions, there can be data loss when the payload is sent to the beacon endpoint. 

### Can I use the same JS Snippet for a different domain? 
No. However, if the root domain is the same, you can use the same site tag. For example, if you have provided us a hostname "example.com" when registering a site, you can use the JS Snippet from that site for "abc.example.com" and "def.example.com" since they use the same root domain. When payload gets sent to the beacon endpoint, we validate the hostname with postfix matching, so if your domain shares the same root domain, that would work. 

### If I'm orange-clouded, can Web Analytics load the script and report stats back to my own domain (using /cdn-cgi/, for example)?
Not yet, but we may add support for this in the future.
