---
pcx_content_type: how-to
title: Understand test results
weight: 3
---

## Understand test results

The test result page shows you how your website performed regarding several key industry metrics. Some of these metrics are presented for synthetic tests and the real user monitoring, and others only apply to synthetic tests or only to real user monitoring.

### Synthetic tests and real user monitoring metrics

These metrics are presented for the synthetic tests and they are also collected as part of the real user data.

Metric | Definition
------ | --------
Time to First Byte ([TTFB](https://web.dev/ttfb/)) | Measures the time between the request for a resource and when the first byte of a response begins to arrive.
First Contentful Paint ([FCP](https://web.dev/first-contentful-paint/)) |  Measures the time from when the page starts loading to when any part of the page's content is rendered on the screen.
Largest Contentful Paint ([LCP](https://web.dev/lcp/)) | [CP reports the render time of the largest image or text block visible within the viewport.
Cumulative Layout Shift ([CLS](https://web.dev/cls/)) | Measures the largest burst of layout shift scores for every unexpected layout shift that occurs during the entire lifespan of a page.

### Synthetic tests metrics

These metrics result from the synthetic tests. 

Metric | Definition
------ | --------
Time to Interactive ([TTI](https://web.dev/tti/)) | Measures the time from when the page starts loading to when its main sub-resources have loaded and it is capable of reliably responding to user input quickly.
Total Blocking Time ([TBT](https://web.dev/tbt/)) | Measures the total amount of time between First Contentful Paint (FCP) and Time to Interactive (TTI) where the main thread was blocked for long enough to prevent input responsiveness.
[Speed index](https://web.dev/speed-index/) | Measures how quickly content is visually displayed during page load.

### Real user monitoring metrics

These metrics are collected as part of the real user data, as they require real user interaction with a page.

Metric | Definition
------ | --------
Interaction to Next Paint ([INP](https://web.dev/inp/)) |  Aims to represent a page's overall responsiveness by measuring all click, tap, and keyboard interactions made with a page.
First input delay ([FID](https://web.dev/fid/)) | Measures the time from when a user first interacts with a page to the time when the browser is actually able to begin processing event handlers in response to that interaction.