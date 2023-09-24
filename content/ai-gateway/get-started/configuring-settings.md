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
Rate limiting is helpful when you want to control the amount of traffic your application gets. If you are concerned about expensive bills, rate limiting can help cap your spending by limiting requests.

You can define rate limits as the number of requests that get sent in a specific time frame. For example, I can limit my application to 100 requests per minute.

### Editing your gateway
You can also rename your gateway or the endpoint. Please note that by editing your gateway endpoint (not the gateway name in the dashboard), you'll need to update the endpoints in your code to reflect the updated changes.