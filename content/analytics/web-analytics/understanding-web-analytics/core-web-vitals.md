---
pcx_content_type: concept
title: Core Web Vitals
weight: 6
---

# Core Web Vitals

[Core Web Vitals](https://www.cloudflare.com/learning/performance/what-are-core-web-vitals/) are high-level metrics designed by Google to capture the user experience. Three core Web Vitals metrics are measured: Largest Contentful Paint, First Input Delay, and Cumulative Layout Shift. Each of these metrics is automatically assigned a rating of Good, Needs Improvement, or Poor based on the industry standard methodology and testing designed by Google. Page load time statistics are supplemented by First Paint and First Contentful Paint.

{{<Aside type="note">}}

Core Web Vitals is currently only supported in Chromium browsers, with Safari and Firefox coming soon.

{{</Aside>}}

## Web Analytics Vitals Explorer

Vitals Explorer enables you to easily pinpoint which elements in a web page are affecting the user’s experience while browsing your website, in a visual form.
To find Vitals Explorer:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2. Select the **Analytics & Logs** drop-down and choose **Web Analytics**.
3. Select your website and select **Core Web Vitals**.

Vitals Explorer is divided into three main sections, each one with information about a specific feature that affects user experience:

- [Largest Contentful Paint (LCP)](https://web.dev/optimize-lcp/): Measures perceived load speed by the user. It returns how long the main content of the page takes to be loaded.
- [First Input Delay (FID)](https://web.dev/optimize-fid/): Measures how fast a website is to respond to the first user input.
- [Cumulative Layout Shift (CLS)](https://web.dev/optimize-cls/): Measures visual stability, that is, if there are shifts in the page layout as the various elements are being loaded into view.

Each of these metrics represents an impact to the user experience, which is quantified and graded by Web Analytics.

Cloudflare Web Analytics offers interactive exploration in Core Web Vitals by allowing you to filter data by Country, Host, Path, Referrer, Device Type, Browser, or Operating System, and identify which users are the most impacted.

Below each graph, the Debug View section has the top five elements with a negative impact on each metric. Selecting the elements shown in the data table gives you more details about them.

Each table — LCP, FID, and CLS — also shows you the performance of these elements in the 75th percentile (P75) at a glance. Selecting in each row of the table lets you expand the element and have access to more information, including P50, P90 and P99 metrics.

These numbers refer to how an element performs relatively to others in your page. For example, if an element takes 3,900 ms to load and is in the 75 percentile, this means that it is slower to load than 75% of the elements in your page.

![Debug View page](/analytics/static/images/web-analytics/core-web-vitals-debug-view.png)

## Information collected

Web Analytics uses its lightweight JavaScript beacon to collect the information Vitals Explorer uses. It does not use any client-side state, such as cookies or `localStorage`, to collect usage metrics. Vitals Explorer also does not fingerprint individuals via their IP address, User Agent string, or any other data.

### Common data collected for all Core Web Vitals metrics

- **Element**: A CSS selector representing the DOM node. With this string, you can use `document.querySelector(<element_name>)` in the dev console of your browser to find out which DOM node has a negative impact on your scores/values.
- **Path**: The URL path at the time the Core Web Vitals are captured.
- **Value**: [The metric value](https://web.dev/cls/#layout-shift-score) for each Core Web Vitals. This value is in milliseconds for LCP or FID and a score for CLS.

### Additional data collected for Largest Contentful Paint

- **URL**: The source URL (such as image, text, web fonts).
- **Size**: The source object's size in bytes.

### Additional data collected for First Input Delay

- **Name**: The type of event captured (such as mousedown, keydown, pointerdown).

### Additional data collected for Cumulative Layout Shift

Layout information is a JSON value that includes width, height, x axis position, y axis position, left, right, top, and bottom. These values represent the layout shifts that happen on the page.

- **CurrentRect**: Captures the layout information of the DOM element with the largest area, after the shift in the page has occurred. This JSON value is shown as **Current** in the **Debug View** section. To access it, scroll to the **Cumulative Layout Shifts (CLS)** graphic > **Debug View**. Select any element from that table to access the **Layout Shifts** section, where **Current** is presented.

- **PreviousRect**: Captures the layout information of the DOM element with the largest area, before the shift in the page has occurred. This JSON value is shown as **Previous** in the **Debug View** section. To access it, scroll to the **Cumulative Layout Shifts (CLS)** graphic > **Debug View**. Select any element from that table to access the **Layout Shifts** section, where **Previous** is presented.