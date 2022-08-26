---
_build:
  publishResources: false
  render: never
  list: never
---

{{<definitions>}}

To create an account, make a `POST` request to the `/accounts` endpoint and include the following values:

- `name` {{<type>}}string{{</type>}}
    
    - The name of the account that is displayed in the Cloudflare dashboard.

- `type` {{<type>}}enum{{</type>}}

    - Valid values are `standard` (default) and `enterprise`. For self-serve customers, use `standard`. For enterprise customers, use `enterprise`.

{{</definitions>}}

```sh
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