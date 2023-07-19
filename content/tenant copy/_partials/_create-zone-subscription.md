---
_build:
  publishResources: false
  render: never
  list: never
---

{{<definitions>}}

To create a zone subscription, send a [POST](/api/operations/zone-subscription-create-zone-subscription) request to the `/zones/<ZONE_ID>/subscription` endpoint and include the following values:

- `rate_plan` {{<type>}}object{{</type>}}

    - Contains the zone plan corresponding to what customers would order in the dashboard. For a list of available values, refer to [Zone subscriptions](/tenant/reference/subscriptions/#zone-plans).

- `component_values` {{<type>}}array{{</type>}}

    - Additional services depending on your reseller agreement, such as additional `page_rules`.

- `frequency` {{<type>}}string{{</type>}}

    - How often the subscription is renewed automatically (defaults to `"monthly"`)

{{</definitions>}}

```bash
---
header: Request (without `component_values`)
---
curl -X POST 'https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/subscription' \
-H 'Content-Type: application/json' \
-H 'x-auth-email: <EMAIL>' \
-H 'x-auth-key: <API_KEY>' \
-d '{
   "rate_plan": {
      "id": "<RATE_PLAN>"
   },
   "frequency": "annual"
}'
```

```bash
---
header: Request (with `component_values`)
---
curl -X POST 'https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/subscription' \
-H 'Content-Type: application/json' \
-H 'x-auth-email: <EMAIL>' \
-H 'x-auth-key: <API_KEY>' \
-d '{
    "rate_plan":{
        "id":"PARTNERS_BIZ"
    },
    "component_values":[
        {
        "name": "page_rules",
        "value": 50
        }
    ]
}
```