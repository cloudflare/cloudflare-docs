---
_build:
  publishResources: false
  render: never
  list: never
---

{{<definitions>}}

To create an account using the API, make a `POST` request to the `/accounts` endpoint and include the following values:

- `name` {{<type>}}string{{</type>}}

    - The name of the account that is displayed in the Cloudflare dashboard.

- `type` {{<type>}}enum{{</type>}}

    - Valid values are `standard` (default) and `enterprise`. For self-serve customers, use `standard`. For enterprise customers, use `enterprise`.

- `unit` {{<type>}}object{{</type>}}
    - Information related to the tenant unit

    - `id` {{<type>}}string{{</type>}}
        - (optional) ID of the unit to create this account on. Needs to be specified if user administers multiple tenants. Unit ID is the `unit_tag` from your [tenant details](/tenant/how-to/get-tenant-details/).

{{</definitions>}}

```bash
---
header: Request
---
curl -X POST 'https://api.cloudflare.com/client/v4/accounts' \
-H 'Content-Type: application/json' \
-H 'x-auth-email: <EMAIL>' \
-H 'x-auth-key: <API_KEY>' \
-d '{
    "name": "<ACCOUNT_NAME>",
    "type": "standard"
    }'
```

A successful request will return an HTTP status of `200` and the following response body:

```json
---
header: Response
---
{
  "result": {
    "id": "2bab6ace8c72ed3f09b9eca6db1396bb",
    "name": "<Account Name>",
    "type": "standard",
    "settings": {
      "enforce_twofactor": false
    }
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

A request with a unit ID:

```bash
---
header: Request
---
curl -X POST 'https://api.cloudflare.com/client/v4/accounts' \
-H 'Content-Type: application/json' \
-H 'x-auth-email: <EMAIL>' \
-H 'x-auth-key: <API_KEY>' \
-d '{
    "name": "<ACCOUNT_NAME>",
    "type": "standard",
    "unit": {
      "id": "1a2b3c4d5e6f7g8h",
    }
    }'
```