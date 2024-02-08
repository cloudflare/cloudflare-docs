---
pcx_content_type: concept
title: Caching
meta:
  description: Override caching settings on a per-request basis.
---

# Caching

When caching is enabled, you’ll be able to serve requests directly from Cloudflare’s cache, instead of the original model provider, for faster requests and cost savings.
### Default caching configuration

To activate caching, simply click the "Enable" button in the settings tab. Once activated, you can customize the caching duration for your requests, choosing a timeframe anywhere between 1 minute and 1 year. Alternatively, you can specify the exact number of seconds for caching.

It's important to note that this caching behavior will be uniformly applied to all requests that support caching. If you need to modify the cache settings for specific requests, you have the flexibility to override this setting on a per-request basis.

## Caching configuration override

In order to override the default cache behavior defined on the settings tab, you can, on a per-request basis, set headers for the following options:

* ### Skip cache (cf-skip-cache)

Skip cache refers to bypassing the cache and fetching the request directly from the original provider, without utilizing any cached copy.

You can use the header **cf-skip-cache** to bypass the cached version of the request.

As an example, when submitting a request to OpenAI, include the header in the following manner:

```bash
---
header: Request
---

curl https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/openai/chat/completions -X POST \
  --header 'Authorization: Bearer $TOKEN' \
  --header 'Content-Type: application/json' \
  --header 'cf-skip-cache: true' \
  --data ' {
   		 "model": "gpt-3.5-turbo",
   		 "messages": [
   			 {
   				 "role": "user",
   				 "content": "how to build a wooden spoon in 3 short steps? give as short as answer as possible"
   			 }
   		 ]
   	 }
'
```

* ### Cache TTL (cf-cache-ttl)

Cache TTL, or Time To Live, is the duration a cached request remains valid before it expires and requires refreshing from the original source. You can use **cf-cache-ttl** to set the desired caching duration in seconds.

As an example, when submitting a request to OpenAI, include the header in the following manner:

```bash
---
header: Request
---

curl https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/openai/chat/completions -X POST \
  --header 'Authorization: Bearer $TOKEN' \
  --header 'Content-Type: application/json' \
  --header 'cf-cache-ttl: 60' \
  --data ' {
   		 "model": "gpt-3.5-turbo",
   		 "messages": [
   			 {
   				 "role": "user",
   				 "content": "how to build a wooden spoon in 3 short steps? give as short as answer as possible"
   			 }
   		 ]
   	 }
'
```