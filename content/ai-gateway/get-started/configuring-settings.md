---
title: Observe and control
pcx_content_type: get-started
weight: 3
---

# Observe and control

Now that your application is connected to the AI Gateway, you should be able to see requests coming in through your [Cloudflare Dashboard - AI Gateway](https://dash.cloudflare.com/?to=/:account/ai/ai-gateway/general). This guide shows you what data you can expect to see and what settings to configure for better control.

---

## Analytics

Your AI Gateway dashboard shows metrics on requests, tokens, caching, errors, and cost. You can filter these metrics by time and provider-type.

{{<Aside type="note">}}

The cost metric is an estimation based on the number of tokens sent and received in requests. **We currently only calculate costs for OpenAI GPT.** If you stream responses, we use a tokenizer package to estimate the number of tokens used in order to calculate the cost. The cost metric is meant to be a helpful estimation to analyze and predict cost trends, but you should always **refer to your provider dashboard to see an accurate cost number.**

{{</Aside>}}

### Using GraphQL

You can use GraphQL to query your usage data outside of the AI Gateway dashboard. See the example query below. You will need to use your Cloudflare token when making the request, and change {account_id} to match your account tag.

```bash
---
header: Request
---
curl --request POST \
  --url https://api.cloudflare.com/client/v4/graphql \
  --header 'Authorization: Bearer TOKEN \
  --header 'Content-Type: application/json' \
  --data '{
    "query": "query{\n  viewer {\n	accounts(filter: { accountTag: \"{account_id}\" }) {\n	requests: aiGatewayRequestsAdaptiveGroups(\n    	limit: $limit\n    	filter: { datetimeHour_geq: $start, datetimeHour_leq: $end }\n    	orderBy: [datetimeMinute_ASC]\n  	) {\n    	count,\n    	dimensions {\n        	model,\n        	provider,\n        	gateway,\n        	ts: datetimeMinute\n    	}\n    	\n  	}\n    	\n	}\n  }\n}",
    "variables": {
   	 "limit": 1000,
   	 "start": "2023-09-01T10:00:00.0Z",
   	 "end": "2023-09-30T10:00:00.0Z",
   	 "orderBy": "date_ASC"
    }
}'
```

---

## Logging

Your AI Gateway dashboard also shows individual requests, such as the prompt, response, provider, timestamps, and whether the request was successful, cached, or if there was an error.

---

## Settings

On the third tab of the dashboard, you can see settings for your gateway.

### Caching

You can enable caching so requests are served from our cache rather than the original provider. This can help you keep costs down and provide faster responses for your users.

For more details, refer to [Caching](/ai-gateway/configuration/caching/).

### Rate limiting

Rate limiting controls the traffic that reaches your application, which prevents expensive bills and suspicious activity.

For more details, refer to [Rate limiting](/ai-gateway/configuration/rate-limiting/).

### Editing your gateway

You can also delete and rename your gateway or the endpoint. Please note that by editing your gateway endpoint (not the gateway name in the dashboard), you'll need to update the endpoints in your code to reflect the updated changes.

Deleting your gateway is permanent and can not be undone.
