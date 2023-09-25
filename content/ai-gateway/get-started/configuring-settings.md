---
title: Observe and control
pcx_content_type: get-started
weight: 3
---

# Observe and control

Now that your application is connected to the AI Gateway, you should be able to see see requests coming in through your [Cloudflare Dashboard - AI Gateway](https://dash.cloudflare.com/?to=/:account/ai/ai-gateway/general). This guide shows you what data you can expect to see and what settings to configure for better control.

---

## Analytics
On the first page of your AI Gateway dashboar you'll see metrics on requests, tokens, caching, errors, and cost. You can filter these metrics by time and provider-type.

{{<Aside type="note">}}

The cost metric is an estimation based on the number of tokens sent and received in requests. If you stream responses, we use a tokenizer package to estimate the number of tokens used in order to calculate the cost. The cost metric is meant to be a helpful estimation to analyze and predict cost trends, but you should always refer to your provider dashboard to see an accurate cost number.

{{</Aside>}}

---

## Logging
The second tab in the dashboard will take you to the logging page. Here you can see individual requests, such as the prompt, response, provider, timestamps, and whether the request was successful, cached, or if there was an error.

---

## Settings
On the third tab of the dashboard, you can see settings for your gateway.

### Caching
You can enable caching so requests are served from our cache rather than the original provider. This can help you keep costs down and provide faster responses for your users.

You can define the **Time to Live** (TTL) for caching, which is how long the cache is kept for before needing to query the original API again. For example, if I set a TTL of 1 hour, it means that a request is kept in the cache for an hour. Within that hour, an identical request will be served from the cache instead of the original API. After an hour, the cache expires and the request will go to the original API for a "more recent" response and that response will repopulate the cache for the next hour.

{{<Aside type="note">}}

Caching currently only works for identical requests. This is helpful for use cases when there are limited prompt options - for example, a support bot that asks "How can I help you?" and lets the user select an answer from a limited set of options works well with the current caching configuration.
We plan on adding semantic search for caching in the future to improve cache hit rates.

{{</Aside>}}

### Rate limiting
Rate limiting is helpful when you want to control the traffic your application gets. If you are concerned about expensive bills or suspicious activity, rate limiting can help cap your spending or activity by limiting requests.

You can define rate limits as the number of requests that get sent in a specific time frame. For example, I can limit my application to 100 requests per 60s.

You can also select if you would like a **fixed** or **sliding** rate limiting technique. With rate limiting, we allow a certain number of requests within a window of time. If it's fixed, the window would be based on time, so there would be no more than x requests in a 10min window (for example). If it's sliding, it means that we would check that there are no more than x requests in the last 10 minutes. 

To illustrate this, let's say you had a limit of 10 requests per 10 minutes, starting at 12:00 so the window is 12:00-12:10, 12:10-12:20, etc. If you sent 10 requests at 12:09  and 10 requests at 12:11, all 20 requests would be successful in a fixed window strategy, but would fail in a sliding window strategy (only the first 10 requests would be successful). 

### Editing your gateway
You can also rename your gateway or the endpoint. Please note that by editing your gateway endpoint (not the gateway name in the dashboard), you'll need to update the endpoints in your code to reflect the updated changes.