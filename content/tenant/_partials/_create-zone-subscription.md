---
_build:
  publishResources: false
  render: never
  list: never
---

{{<definitions>}}

To create a zone subscription, typically used to upgrade a zone's plan from `PARTNERS_FREE` to a paid [Zone plan](/tenant/reference/subscriptions/#zone-plans), send a [POST](/api/operations/zone-subscription-create-zone-subscription) request to the `/zones/{zone_id}/subscription` endpoint and include the following values:

- `rate_plan` {{<type>}}object{{</type>}}

    - Contains the zone plan corresponding to what customers would order in the dashboard. For a list of available values, refer to [Zone subscriptions](/tenant/reference/subscriptions/#zone-plans).

- `component_values` {{<type>}}array{{</type>}}

    - Additional services depending on your reseller agreement, such as additional `page_rules`.

- `frequency` {{<type>}}string{{</type>}}

    - How often the subscription is renewed automatically (defaults to `"monthly"`).

{{</definitions>}}

```bash
---
header: Request (without `component_values`)
---
curl 'https://api.cloudflare.com/client/v4/zones/{zone_id}/subscription' \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
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
curl 'https://api.cloudflare.com/client/v4/zones/{zone_id}/subscription' \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "rate_plan": {
    "id": "PARTNERS_BIZ"
  },
  "component_values": [
    {
      "name": "page_rules",
      "value": 50
    }
  ]
}
```