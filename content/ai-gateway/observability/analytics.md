---
title: Analytics and logging
pcx_content_type: reference
---

# Analytics and logging

{{<render file="_analytics-overview.md">}}
<br/>

## View analytics

{{<tabs labels="Dashboard | GraphQL">}}
{{<tab label="dashboard" no-code="true">}}

{{<render file="_analytics-dashboard.md">}}

{{</tab>}}
{{<tab label="graphql" no-code="true">}}

You can use GraphQL to query your usage data outside of the AI Gateway dashboard. See the example query below. You will need to use your Cloudflare token when making the request, and change `{account_id}` to match your account tag.

```bash
---
header: Request
---
curl https://api.cloudflare.com/client/v4/graphql \
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

{{</tab>}}
{{</tabs>}}

{{<render file="_analytics-warning.md">}}

## Logging

Your AI Gateway dashboard also shows real-time logs of individual requests, such as the prompt, response, provider, timestamps, and whether the request was successful, cached, or if there was an error. These logs do not persist and are deleted after 24 hours.
