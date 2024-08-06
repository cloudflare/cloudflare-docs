---
pcx_content_type: configuration
title: Caching
weight: 2
meta:
  description: Override caching settings on a per-request basis.
---

# Caching

Enable and customize your gateway cache to serve requests directly from Cloudflare’s cache, instead of the original model provider, for faster requests and cost savings.

{{<Aside type="note">}}

Caching currently only works for identical requests. This is helpful for use cases when there are limited prompt options - for example, a support bot that asks "How can I help you?" and lets the user select an answer from a limited set of options works well with the current caching configuration.
We plan on adding semantic search for caching in the future to improve cache hit rates.

{{</Aside>}}

## Default configuration

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To set the default caching configuration in the dashboard:

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Select **AI** > **AI Gateway**.
3. Select **Settings**.
4. Enable **Cache Responses**.
5. Change the default caching to whatever value you prefer.

{{</tab>}}
{{<tab label="api" no-code="true">}}

To set the default caching configuration using the API:

1. [Create an API token](/fundamentals/api/get-started/create-token/) with the following permissions:
  - `AI Gateway - Read`
  - `AI Gateway - Edit`

2. Get your [Account ID](/fundamentals/setup/find-account-and-zone-ids/).
3. Using that API token and Account ID, send a [`POST` request](/api/operations/aig-config-create-gateway) to create a new Gateway and include a value for the `cache_ttl`.

{{</tab>}}
{{</tabs>}}

This caching behavior will be uniformly applied to all requests that support caching. If you need to modify the cache settings for specific requests, you have the flexibility to override this setting on a per-request basis.

To check whether a response comes from cache or not, **cf-aig-cache-status** will be designated as `HIT` or `MISS`.

## Per-request caching

In order to override the default cache behavior defined on the settings tab, you can, on a per-request basis, set headers for the following options:

### Skip cache (cf-skip-cache)

Skip cache refers to bypassing the cache and fetching the request directly from the original provider, without utilizing any cached copy.

You can use the header **cf-skip-cache** to bypass the cached version of the request.

As an example, when submitting a request to OpenAI, include the header in the following manner:

```bash
---
header: Request skipping the cache
---

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai/chat/completions \
  --header 'Authorization: Bearer $TOKEN' \
  --header 'Content-Type: application/json' \
  --header 'cf-skip-cache: true' \
  --data ' {
   		 "model": "gpt-4o-mini",
   		 "messages": [
   			 {
   				 "role": "user",
   				 "content": "how to build a wooden spoon in 3 short steps? give as short as answer as possible"
   			 }
   		 ]
   	 }
'
```

### Cache TTL (cf-cache-ttl)

Cache TTL, or Time To Live, is the duration a cached request remains valid before it expires and requires refreshing from the original source. You can use **cf-cache-ttl** to set the desired caching duration in milliseconds.

For example, if you set a TTL of one hour, it means that a request is kept in the cache for an hour. Within that hour, an identical request will be served from the cache instead of the original API. After an hour, the cache expires and the request will go to the original API for a more recent response, and that response will repopulate the cache for the next hour.

As an example, when submitting a request to OpenAI, include the header in the following manner:

```bash
---
header: Request to be cached for an hour
---

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai/chat/completions \
  --header 'Authorization: Bearer $TOKEN' \
  --header 'Content-Type: application/json' \
  --header 'cf-cache-ttl: 3600000' \
  --data ' {
   		 "model": "gpt-4o-mini",
   		 "messages": [
   			 {
   				 "role": "user",
   				 "content": "how to build a wooden spoon in 3 short steps? give as short as answer as possible"
   			 }
   		 ]
   	 }
'
```

### Custom cache key (cf-aig-cache-key)

Custom cache keys let you override the default cache key in order to precisely set the cacheability setting for any resource. To override the default cache key, you can use the header **cf-aig-cache-key**.

When you use the **cf-aig-cache-key** header for the first time, you will receive a response from the provider. Subsequent requests with the same header will return the cached response. If the **cf-cache-ttl** header is used, responses will be cached according to the specified Cache Time To Live. Otherwise, responses will be cached according to the cache settings in the dashboard. If caching is not enabled for the gateway, responses will be cached for 5 minutes by default.

As an example, when submitting a request to OpenAI, include the header in the following manner:

```bash
---
header: Request with custom cache key
---

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai/chat/completions \
  --header 'Authorization: Bearer {openai_token}' \
  --header 'Content-Type: application/json' \
  --header 'cf-aig-cache-key: responseA' \
  --data ' {
   		 "model": "gpt-4o-mini",
   		 "messages": [
   			 {
   				 "role": "user",
   				 "content": "how to build a wooden spoon in 3 short steps? give as short as answer as possible"
   			 }
   		 ]
   	 }
'
```
