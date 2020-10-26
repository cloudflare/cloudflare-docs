---
title: "1: Provisioning resources"
order: 0
---

# Step 1: Provisioning resources

All the API calls described in this tutorial use the Cloudflare client v4 interface at `https://api.cloudflare.com/client/v4`. API requests are authenticated in the same manner using a Cloudflare user's email and API key as the `x-auth-email` and `x-auth-key` headers. Your Cloudflare user must be active, verified, and enabled by Cloudflare to use these provisioning specific endpoints.

More details about making Cloudflare API calls can be found in our general api docs [here](https://api.cloudflare.com/#getting-started-endpoints).

## Creating an account

Each customer or team that uses Cloudflare should have their own account. This ensures proper security and access of resources. Each account acts as a container of zones and other resources. Depending on your needs you may even provision multiple accounts for a single customer or team.

To create an account, make a `POST` API request to the `/accounts` endpoint.

Required values:

Name (string): The name of the account that is displayed in the Cloudflare dashboard

Type (enum): Valid values are `standard` (default) and `enterprise`. For self-serve customers, use `standard`. For enterprise customers, use `enterprise`.

Example:
```bash
curl -X POST https://api.cloudflare.com/client/v4/accounts -H 'Content-Type: application/json' -H 'x-auth-email: <x-auth-email>' -H 'x-auth-key: <x-auth-key>' \
-d '{ "name": "<Account Name>", \
      "type": "standard" }'
```

A successful request will return with an HTTP status of 200 and the following response body:

```json
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

## Fetching accounts

You own the account lifecycle from creation, ongoing management, and finally deletion. To see the newly created account, make a `GET /accounts` request:

```bash
curl -X GET https://api.cloudflare.com/client/v4/accounts -H 'x-auth-email: <x-auth-email>' -H 'x-auth-key: <x-auth-key>'
```
<Aside type="note">

__Note:__ This endpoint is the same as documented in our [API docs](https://api.cloudflare.com/#accounts-list-accounts). The same filters can be used for created accounts.

</Aside>

You will get back a list of all the accounts you have created plus any accounts your user already had access to:

```json
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

Now that we have created an account, in the next step we will give another person access to the account.

### (Optional) Deleting accounts

If for any reason you need to delete an account you created, then call `DELETE /accounts/:account_id`.

**WARNING:** Account deletion is permanent and will delete any zones or other resources under the account.

```bash
curl -X DELETE https://api.cloudflare.com/client/v4/accounts/<account_id> -H 'x-auth-email: <x-auth-email>' -H 'x-auth-key: <x-auth-key>'
```

A successful request will return the id to confirm the operation:

```json
{
    "result": {
        "id": "1b16db169c9cb7853009857198fae1b9"
    },
    "success": true,
    "errors": [],
    "messages": []
}
```

--------------------------------

## Continue the tutorial

Learn how to manage how external customers access Cloudflare.

<p><Link to="/tutorial/user-access" className="Button Button-is-docs-primary">Step 2: User access</Link></p>
