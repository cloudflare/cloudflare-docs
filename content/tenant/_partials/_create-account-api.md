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
    - Information related to the tenant unit.

    - `id` {{<type>}}string{{</type>}}
        - (optional) ID of the unit to create this account on. Needs to be specified if user administers multiple tenants. Unit ID is the `unit_tag` from your [tenant details](/tenant/how-to/get-tenant-details/).

### Know-Your-Customer (optional)

All KYC parameters are text fields, have a 120 character limit, and are optional unless enforced by the Tenant.

- `business_name` {{<type>}}string{{</type>}}

    - (optional) The name of the business associated with this account.

- `business_address` {{<type>}}string{{</type>}}

    - (optional) The address of the business associated with this account.

- `business_email` {{<type>}}string{{</type>}}

    - (optional) The email of the business associated with this account.

- `business_phone` {{<type>}}string{{</type>}}

    - (optional) The phone number of the business associated with this account.

- `external_metadata` {{<type>}}string{{</type>}}

    - (optional) External metadata for this account.

{{</definitions>}}

```bash
---
header: Request
---
curl "https://api.cloudflare.com/client/v4/accounts" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{
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
    "name": "<ACCOUNT_NAME>",
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
curl "https://api.cloudflare.com/client/v4/accounts" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{
  "name": "<ACCOUNT_NAME>",
  "type": "standard",
  "unit": {
    "id": "1a2b3c4d5e6f7g8h"
  }
}'
```

A request with a unit ID and KYC:

```bash
---
header: Request
---
curl "https://api.cloudflare.com/client/v4/accounts" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{
  "name": "<ACCOUNT_NAME>",
  "type": "standard",
  "business_name": "Cloudflare",
  "business_email": "email@business.com",
  "business_address": "San Francisco",
  "business_phone": "1234567890",
  "external_metadata": "{'\''testKey'\'': '\''testValue'\''}",
  "unit": {
    "id": "1a2b3c4d5e6f7g8h"
  }
}'
```