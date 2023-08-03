---
pcx_content_type: reference
title: Dimensions
weight: 8
---

# Dimensions

Dimensions are the labels used to describe different types of metrics or data. For example, _Referer_ is the data collected from external links referring visits to a page, while _Browser_ shows which browsers accessed your website.

Below you will find a list of the different dimensions you can use to filter Web Analytics:

- _Country_: The visitor's country.
- _Host_: The domain of the site's URL.
- _Path_: The links within your site referring visits to a page.
- _Referer_: The external links referring visits to a page. You can access `referer host` data on the dashboard. Additionally, you can access data for the `referer path` from the GraphQL API.
- _Device type_: The device visitors use to access a page (for example, desktop, mobile, or tablet).
- _Browser_: The web browser visitors use to access a page.
- _Operating system_: The operating system visitors use to access a page.
- _Site_: The website's domain name. Used for high-level segmentation of data. For example, you can use it for a particular zone or gray-clouded website.
- _Exclude Bots_: Exclude bot traffic from the dataset. With this dimension set to `Yes`, the resulting dataset will be a closer representation of real user traffic.

![Web Analytics dimensions page](/images/analytics/web-analytics/dash-web_analytics-dimensions.png)