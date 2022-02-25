---
pcx-content-type: concept
title: About Web Analytics
weight: 3
---

# About Web Analytics

Cloudflare Web Analytics helps you understand the performance of your web pages as experienced by your site visitors.

To enable Web Analytics, Cloudflare writes and injects a piece of JavaScript code (also known as a beacon) that collects certain pieces of information into your web pages. More specifically, this beacon collects metrics using the Performance API, which is available in all major web browsers.

Web Analytics supports Adaptive Bit Rate (ABR). Cloudflare's servers will select the best resolution for each chart or table depending on the size of the data, the date range, your network connection, and other factors. For more information, refer to [Explaining Cloudflare's ABR Analytics](https://blog.cloudflare.com/explaining-cloudflares-abr-analytics/).

The data displayed in Web Analytics is real user monitoring (RUM). For more information, refer to [Real User Monitoring](https://en.wikipedia.org/wiki/Real_user_monitoring).

{{<Aside type="note">}}

Web Analytics now includes the functionality formerly enabled through Browser Insights.

{{</Aside>}}
