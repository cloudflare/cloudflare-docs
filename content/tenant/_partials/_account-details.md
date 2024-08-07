---
_build:
  publishResources: false
  render: never
  list: never
---

{{<definitions>}}

To retrieve a list of accounts associated with a Tenant details, send a `GET` request to the `/tenants/{tenant_id}/accounts` endpoint. You can find the Tenant tag and all Tenants associated with the user with the [**Tenant Details**](/tenant/how-to/get-tenant-details/) API. The Tenant Accounts API also requires pagination passed as query parameters:

- `page` {{<type>}}number{{</type>}}

    - Page number of accounts list response, indexed from 1

- `per_page` {{<type>}}number{{</type>}}

    - Number of accounts to display per page

- `order` {{<type>}}string{{</type>}}
    - (optional) Order by a specific column, has to be a valid top-level key from the response

  - `direction` {{<type>}}number{{</type>}}
    - (optional) 0 for ascending or 1 for descending, is 0 by default

{{</definitions>}}

```bash
---
header: Request
---
curl "https://api.cloudflare.com/client/v4/tenants/{tenant_id}/accounts?page=1&per_page=10" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>"
```

A successful request will return an HTTP status of `200` and a response body containing account information and feature flags for all accounts managed by the Tenant.