---
title: "Web Analytics improved soft navigation tracking for Single Page Applications (SPAs)"
description: "Monitor your complex web applications with greater accuracy, thanks to the new native Soft Navigation API"
date: 2026-08-21
products:
  - web-analytics
---

Cloudflare Web Analytics (Real User Monitoring) is rolling out accuracy improvements to client-side soft navigations.

**This may alter the volume of pageviews reported in the dashboard and GraphQL due to improved accuracy.** The extent of which depends on your front-end web architecture and visitor traffic patterns.

Soft navigations are predominantly used by Single Page Applications (SPAs)—such as React-, Angular-, Vue-, or Svelte-based websites—to avoid fully unloading the current page and rendering the next from scratch as visitors navigate around, however any client-side navigation (e.g. those intercepted by [the Navigation API](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API)) counts so websites may experience soft navigation activity regardless of web framework choice when such APIs are used in the implementation.

The main improvement comes from [Google Chrome's new Soft Navigation API](https://developer.chrome.com/docs/web-platform/soft-navigations) which provides the ability to natively track [Largest Contentful Paint (LCP)](/web-analytics/data-metrics/core-web-vitals/#core-web-vitals-metrics) on soft navigations, removing a blindspot in perceived loading speed across pageviews.

We've extended our `navigationType` values to segment these different types of navigations:

| `navigationType` | New? | Description |
| ---------------- | ---- | ----------- |
| `navigate` | ❌ | Hard navigations that traditional websites (or "Multi Page Applications") perform when clicking links or submitting forms |
| `soft-navigation` | ✅ | Where [the new Soft Navigation API](https://developer.chrome.com/docs/web-platform/soft-navigations) is available and a visitor makes a client-side navigation, we track these events |
| `routing-apis` | ✅ | Where the native Soft Navigation API is unavailable (e.g. Safari, Firefox, older Chromium-based browsers), we fallback to tracking soft navigations using [the Navigation API](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API) or [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API). We cannot collect LCP for these, but the other Core Web Vitals are present. |

Prior to this change, we only used History API and all navigations were bucketed into `navigate`.

For more information, refer to the [Navigation Types](/web-analytics/data-metrics/dimensions/#navigation-types) and [Web Analytics SPA](/web-analytics/get-started/web-analytics-spa/) documentation pages.
