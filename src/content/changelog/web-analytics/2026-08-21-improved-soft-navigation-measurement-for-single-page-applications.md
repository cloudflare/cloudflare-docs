---
title: "Web Analytics improves soft navigation measurement for Single Page Applications (SPAs)"
description: "Cloudflare Web Analytics now uses the native Soft Navigation API (where available) to more accurately measure pageviews and Core Web Vitals for Single Page Applications. Pageview counts may increase as a result."
date: 2026-08-21
products:
  - web-analytics
---

Cloudflare Web Analytics (Real User Monitoring) is rolling out accuracy improvements to client-side soft navigations.

**This change may alter the volume of reported pageviews and visits in the dashboard and GraphQL API. The reported Largest Contentful Paint (LCP) metric may also fluctuate.** The extent of these variances depend on your front-end architecture and visitor traffic patterns.

Single Page Applications (SPAs)—such as websites built with React, Angular, Vue, or Svelte—predominantly use soft navigations. Soft navigations avoid fully unloading the current page and rendering the next one from scratch as visitors navigate.

Any client-side navigation counts as a soft navigation, including navigations intercepted by [the Navigation API](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API) or triggered by [the History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API). This means a non-SPA website can have soft navigation activity if its implementation uses these APIs.

The main improvement comes from [Google Chrome's new Soft Navigation API](https://developer.chrome.com/docs/web-platform/soft-navigations). It natively measures [Largest Contentful Paint (LCP)](/web-analytics/data-metrics/core-web-vitals/#core-web-vitals-metrics) on soft navigations, removing a blind spot in perceived loading speed across pageviews.

We've extended our `navigationType` values to segment these different types of navigations:

| `navigationType` | New? | Description |
| ---------------- | ---- | ----------- |
| `navigate` | ❌ | Hard navigations that traditional websites (or "Multi Page Applications") perform when clicking links or submitting forms |
| `soft-navigation` | ✅ | Where [the new Soft Navigation API](https://developer.chrome.com/docs/web-platform/soft-navigations) is available and a visitor makes a client-side navigation, we record these events |
| `routing-apis` | ✅ | Where the native Soft Navigation API is unavailable (e.g. Safari, Firefox, older Chromium-based browsers), we fallback to measuring soft navigations using [the Navigation API](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API) or [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API). We cannot collect LCP for these, but the other Core Web Vitals are present. |

Prior to this change, we only used History API and all navigations were bucketed into `navigate`.

For more information, refer to the [Navigation Types](/web-analytics/data-metrics/dimensions/#navigation-types) and [Web Analytics SPA](/web-analytics/get-started/web-analytics-spa/) documentation pages.
