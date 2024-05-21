---
pcx_content_type: configuration
title: Rate limiting
weight: 3
---

# Rate limiting

Rate limiting controls the traffic that reaches your application, which prevents expensive bills and suspicious activity.

## Parameters

You can define rate limits as the number of requests that get sent in a specific time frame. For example, I can limit my application to 100 requests per 60s.

You can also select if you would like a **fixed** or **sliding** rate limiting technique. With rate limiting, we allow a certain number of requests within a window of time. If it's fixed, the window would be based on time, so there would be no more than x requests in a 10 minute window (for example). If it's sliding, there would be no more than x requests in the last 10 minutes.

To illustrate this, let's say you had a limit of 10 requests per 10 minutes, starting at 12:00 so the fixed window is 12:00-12:10, 12:10-12:20, etc. If you sent 10 requests at 12:09 and 10 requests at 12:11, all 20 requests would be successful in a fixed window strategy, but would fail in a sliding window strategy since there were >10 requests in the last 10 minutes.

## Default configuration

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To set the default rate limiting configuration in the dashboard:

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com/).
2. Go to **AI** > **AI Gateway**.
3. Go to **Settings**.
4. For **Rate-limiting**, switch the toggle to **On**.
5. Adjust the rate, time period, and rate limting method as desired.

{{</tab>}}
{{<tab label="api" no-code="true">}}

To set the default rate limiting configuration using the API:

1. [Create an API token](/fundamentals/api/get-started/create-token/) with the following permissions:
  - `AI Gateway - Read`
  - `AI Gateway - Edit`

2. Get your [Account ID](/fundamentals/setup/find-account-and-zone-ids/).
3. Using that API token and Account ID, send a [`POST` request](/api/operations/aig-config-create-gateway) to create a new Gateway and include a value for the `rate_limiting_interval`, `rate_limiting_limit`, and `rate_limiting_technique`.

{{</tab>}}
{{</tabs>}}

This rate limiting behavior will be uniformly applied to all requests for that gateway.