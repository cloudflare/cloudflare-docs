---
order: 38
pcx-content-type: concept
---

# Data origin and collection

Web Analytics relies on the `performance.getEntriesByType('navigation')` object to collect metrics about page load performance. If Navigation Timing Level 2 is not supported, then [performance.timing (Level 1)](https://developer.mozilla.org/en-US/docs/Web/API/Performance/timing) is used.

Refer to the [W3C Processing Model](https://www.w3.org/TR/navigation-timing-2/#processing-model) for a visual depiction of the sequence of timing events for web page loads.

## Data collection and reporting
Web Analytics collects the minimum amount of information - timing metrics - to show customers how their websites perform. Cloudflare does not track individual end users across our customers’ Internet properties.

The Web Analytics performance beacon loads from [https://static.cloudflareinsights.com/beacon.min.js](https://static.cloudflareinsights.com/beacon.min.js) and uses a third-party domain so that the script is cached across website loads. You may need to update your [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) settings to load this script.

Web Analytics does not insert the beacon on every page load. Instead, it inserts a beacon in a random sample of web pages and uses the information collected to estimate your web pages’ traffic and performance. You cannot change the sampling rate at this time.

Beacon data is sent back to `https://<yourdomainname>/cdn-cgi/beacon/performance`. Core Web Vital metrics are reported when the `visibilityState` is hidden for the first time after the page load event is triggered.