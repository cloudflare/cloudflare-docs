---
pcx_content_type: reference
title: Dimensions
weight: 4
---

# Dimensions

Dimensions are the labels used to describe different types of metrics or data. For example, **Referer** is the data collected from external links referring visits to a page, while **Browser** shows which browsers accessed your website.

Below you will find a list of the different dimensions you can use to filter Web Analytics:

- **Country**: The visitor's country.
- **Host**: The domain of the site's URL.
- **Path**: The links within your site referring visits to a page.
- **Referer**: The external links referring visits to a page. You can access `referer host` data on the dashboard. Additionally, you can access data for the `referer path` from the GraphQL API.
- **Device type**: The device visitors use to access a page (for example, desktop, mobile, or tablet).
- **Browser**: The web browser visitors use to access a page.
- **Operating system**: The operating system visitors use to access a page.
- **Site**: The website's domain name. Used for high-level segmentation of data. For example, you can use it for a particular zone or gray-clouded website.
- **Exclude Bots**: Exclude bot traffic from the dataset. With this dimension set to `Yes`, the resulting dataset will be a closer representation of real user traffic.

![Web Analytics dimensions page](/images/web-analytics/dash-web_analytics-dimensions.png)