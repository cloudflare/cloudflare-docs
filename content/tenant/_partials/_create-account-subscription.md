---
_build:
  publishResources: false
  render: never
  list: never
---

{{<definitions>}}

To create an account subscription, send a [POST](https://api.cloudflare.com/#account-subscriptions-create-subscription) request to the `/accounts/<ACCOUNT_ID>/subscriptions` endpoint and include the following values:

- `rate_plan` {{<type>}}object{{</type>}}
    
    - Contains the account subscription corresponding to a specific add-on service. For a list of available values, refer to [Available subscriptions](/tenant/reference/subscriptions/).

{{</definitions>}}

```sh
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