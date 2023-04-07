---
_build:
  publishResources: false
  render: never
  list: never
---

{{<definitions>}}

To create an account subscription, send a [POST](/api/operations/account-subscriptions-create-subscription) request to the `/accounts/<ACCOUNT_ID>/subscriptions` endpoint and include the following values:

- `rate_plan` {{<type>}}object{{</type>}}
    
    - Contains the account subscription corresponding to a specific add-on service. For a list of available values, refer to [Available subscriptions](/tenant/reference/subscriptions/).

- `component_values` {{<type>}}array{{</type>}}

    - Additional services depending on your reseller agreement, such as additional origins for load balancing or additional seats for Cloudflare Zero Trust. If not included, the subscription includes the default values associated with each purchase.

- `frequency` {{<type>}}string{{</type>}}

    - How often the subscription is renewed automatically (defaults to `"monthly"`)

{{</definitions>}}

```bash
---
header: Request
---
curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/subscriptions' \
-H 'Content-Type: application/json' \
-H 'x-auth-email: <EMAIL>' \
-H 'x-auth-key: <API_KEY>' \
-d '{
   "rate_plan": {
      "id": "<rate plan name>"
   }
}'
```