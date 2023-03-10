---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/115004555148-Understanding-Billing-for-Add-on-Services
title: Understanding Billing for Add-on Services
---

# Understanding Billing for Add-on Services

## Overview

For some Cloudflare subscriptions and services, you will be charged based on how much a feature was used during your previous billing period. This differs from other services, which are a prepaid flat fee for the upcoming month (e.g. plans, page rules, etc.).

For example, if your billing date is March 15 and you enabled Cloudflare Workers in the dashboard on March 1, your March 15 invoice will include the Workers charges from March 1-15. The next invoice on April 15 will include charges for Workers usage between March 16 and April 15.

{{<Aside type="note">}}
The pricing structure varies based on the service being used.
{{</Aside>}}

Please review the product-specific pages for details on pricing and charges:

-   [Argo](https://support.cloudflare.com/hc/en-us/articles/115000224192)
-   [Cloudflare Access](https://support.cloudflare.com/hc/en-us/articles/360007897072)
-   [Load Balancing](https://support.cloudflare.com/hc/en-us/articles/115005254367)
-   [Cloudflare Rate Limiting](https://support.cloudflare.com/hc/en-us/articles/115000272247)
-   [Cloudflare Stream](https://support.cloudflare.com/hc/en-us/articles/360016450871)
-   [Cloudflare Workers and Workers KV](https://developers.cloudflare.com/workers/about/pricing/)

___

## Usage-Based billing notifications

{{<Aside type="note">}}
The usage-based billing alerts feature is currently in beta and only
available to some Cloudflare users.
{{</Aside>}}

To monitor the usage of Cloudflare add-ons, you can enable email notifications. When enabled, you will receive a notification to the billing email address on file when the traffic, queries, requests, or minutes watched exceed your desired threshold.

{{<Aside type="note">}}
The email notifications are for informational purposes only. Actual
usage and billing may vary. Your monthly invoice is the most reliable
source for billing information.
{{</Aside>}}

For help creating usage-based billing alerts, refer to our [Notifications documentation](https://developers.cloudflare.com/fundamentals/notifications/create-notifications/). For the _Event Type_ of your notification, you would select **Usage-Based Billing**.
