---
pcx_content_type: how-to
title: Run Speed test
weight: 2
---

# Run Speed test

## Run Synthetic test

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and domain.

2. Go to **Speed** > **Speed Test**, and enter the URL, subdomain or path you want to test. Then, select **Run test**. 

3. After the test finishes running, you will get a Lighthouse score and you will have access to the list of the tests run. The test result page will give you details regarding the performance of your website, both for the desktop and mobile versions. Refer to [Understand test results](/fundamentals/speed/speed-test/run-speed-test/#understand-test-results) for more information.

4. (Optional) Cloudflare Speed might show you a **Recommendation** section, depending on the results from testing your website. **Recommendation** gives you information on Cloudflare features or products that will help you improve the performance of your website.

## Enable real user monitoring (RUM)

1. Once a speed test has been run, you can enable RUM data in the test results page. In **Real user measurements**, select **Enable Rum for free**. 
You can always manage your website preferences in the **Web Analytics** section in the dashboard which also uses RUM data.

2. Once RUM data is running on your site, you can access **Real user measurements** on your test results page. Usually it takes less than five minutes to see the data coming in, but it will depend on traffic. 

3. Refer to [Understand test results](/fundamentals/speed/speed-test/run-speed-test/#understand-test-results) for more information about the results provided by real user data.

## Understand test results

The test result page shows you how your website performed regarding several key industry metrics. Some of these metrics are presented for synthetic tests and the real user monitoring, and others only apply to synthetic tests or only to real user monitoring.

### Synthetic tests and real user monitoring metrics

These metrics are presented for the synthetic tests and they are also collected as part of the real user data.

#### Time to First Byte (TTFB)

[TTFB measures](https://web.dev/ttfb/) the time between the request for a resource and when the first byte of a response begins to arrive.

#### First Contentful Paint (FCP)

[FCP measures](https://web.dev/first-contentful-paint/) the time from when the page starts loading to when any part of the page's content is rendered on the screen.

#### Largest Contentful Paint (LCP)

[LCP reports](https://web.dev/lcp/) the render time of the largest image or text block visible within the viewport.

#### Cumulative Layout Shift (CLS)

[CLS is a measure](https://web.dev/cls/) of the largest burst of layout shift scores for every unexpected layout shift that occurs during the entire lifespan of a page.

### Synthetic tests metrics

These metrics result from the synthetic tests. 

#### Time to Interactive (TTI)

[TTI metric](https://web.dev/tti/) measures the time from when the page starts loading to when its main sub-resources have loaded and it is capable of reliably responding to user input quickly.

#### Total Blocking Time (TBT)

[TBT measures](https://web.dev/tbt/) the total amount of time between First Contentful Paint (FCP) and Time to Interactive (TTI) where the main thread was blocked for long enough to prevent input responsiveness.

#### Speed index

[Speed index](https://web.dev/speed-index/) measures how quickly content is visually displayed during page load.

### Real user monitoring metrics

These metrics are collected as part of the real user data, as they require real user interaction with a page.

#### Interaction to Next Paint (INP)

[INP aims to represent](https://web.dev/inp/) a page's overall responsiveness by measuring all click, tap, and keyboard interactions made with a page.

#### First input delay (FID)

[FID measures](https://web.dev/fid/) the time from when a user first interacts with a page to the time when the browser is actually able to begin processing event handlers in response to that interaction.

## Quotas

Quota limits for the number of tests you can run are currently the following:

Plan | Number of tests
---- | ----
Free | 5
Pro  | 10
Business | 20
Enterprise | 50