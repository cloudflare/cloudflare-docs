---
pcx_content_type: how-to
title: Manage accounts
weight: 1
---

# Manage accounts

{{<render file="_account-preamble.md">}}

## Create account

{{<render file="_account-preamble.md">}}

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}
 
{{<render file="_create-account-dash.md">}}
 
{{</tab>}}
{{<tab label="api" no-code="true">}}
 
{{<render file="_create-account-api.md">}}
 
{{</tab>}}
{{</tabs>}}

## Fetch account

When you create an account with the Tenant API, your Cloudflare user owns that account from creation, ongoing management, and finally deletion.

To view any accounts owned by your Cloudflare user, send a [`GET`](/api/operations/accounts-list-accounts) request to the `/accounts` endpoint.

You will get back a list of all the accounts you have created plus any accounts your user already had access to.

```bash
---
header: Request
---
curl -X GET https://api.cloudflare.com/client/v4/accounts \
-H 'x-auth-email: <EMAIL>' \
-H 'x-auth-key: <API_KEY>' \
```

```json
---
header: Response
---
{
  "result": [
    {
      "id": "a34bd6cc645a31486aa2ef71f1b9afb6",
      "name": "My Personal Account",
      "settings": {
        "enforce_twofactor": false
      }
    },
    {
      "id": "1b16db169c9cb7853009857198fae1b9",
      "name": "Created Account",
      "settings": {
        "enforce_twofactor": false
      }
    }
  ],
  "result_info": {
    "page": 1,
    "per_page": 20,
    "total_pages": 1,
    "count": 2,
    "total_count": 2
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

## Update account

To update an account, send a [`PUT`](/api/operations/accounts-update-account) request to the `/accounts/<ACCOUNT_ID>` endpoint.

## Delete account

To delete an account you have created, send a `DELETE` request to the `/accounts/<ACCOUNT_ID>` endpoint.

Account deletion is permanent and will delete any zones or other resources under the account.

```bash
---
header: Request
---
curl -X DELETE https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID> \
-H 'x-auth-email: <EMAIL>' \
-H 'x-auth-key: <API_KEY>' \
```

A successful request will return the id to confirm the operation:

```json
---
header: Response
---
{
  "result": {
    "id": "1b16db169c9cb7853009857198fae1b9"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```