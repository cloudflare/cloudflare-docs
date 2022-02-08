---
order: 6
pcx-content-type: how-to
---

# Create Bulk Redirects via API

To create Bulk Redirects via API, you must:

1. Create a Bulk Redirect List via API.
1. Add items (URL Redirects) to the list created in step 1.
1. Create a Bulk Redirect Rule via API, which enables the list created in step 1.

The API token used in API requests to manage Bulk Redirects objects (lists, list items, and rules) must have at least the following permissions:

* Account Rulesets: Edit
* Account Filter Lists: Edit

## 1. Create a Bulk Redirect List via API

Use the [Create list](https://api.cloudflare.com/#rules-lists-create-list) operation to create a new Bulk Redirect List. The list `kind` must be `redirect`.

```json
curl "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/rules/lists" \
-H "Authorization: Bearer <API_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "name": "my_redirect_list",
  "description": "My redirect list.",
  "kind": "redirect"
}'
```

The response will be similar to the following:

```json
{
  "result": {
    "id": "f848b6ccb07647749411f504d6f88794",
    "name": "my_redirect_list",
    "description": "My redirect list.",
    "kind": "redirect",
    "num_items": 0,
    "num_referencing_filters": 0,
    "created_on": "2021-10-28T09:11:42Z",
    "modified_on": "2021-10-28T09:11:42Z"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

For more information on list operations, refer to the [Rules Lists API](https://developers.cloudflare.com/firewall/api/cf-lists) documentation.

## 2. Add items to the list

Use the [Create list items](https://api.cloudflare.com/#rules-lists-create-list-items) operation to add URL Redirect items to the list:

```json
curl "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/rules/lists/f848b6ccb07647749411f504d6f88794/items" \
-H "Authorization: Bearer <API_TOKEN>" \
-H "Content-Type: application/json" \
-d '[
  {
    "redirect": {
      "source_url": "example.com/blog/",
      "target_url": "https://example.com/blog/latest"
    }
  },
  {
    "redirect": {
      "source_url": "example.net/",
      "target_url": "https://example.net/under-construction.html",
      "status_code": 307
    }
  }
]'
```

The response will be similar to the following:

```json
{
  "result": {
    "operation_id": "92558f8b296d4dbe9d0419e0e53f6622"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

This is an asynchronous operation. The response will contain an `operation_id` which you will use to check if the operation completed successfully using the [Get bulk operation](https://api.cloudflare.com/#rules-lists-get-bulk-operation) method:

```bash
curl "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/rules/lists/bulk_operations/92558f8b296d4dbe9d0419e0e53f6622" \
-H "Authorization: Bearer <API_TOKEN>"
```

If the operation already completed successfully, the response will be similar to the following:

```json
{
  "result": {
    "id": "92558f8b296d4dbe9d0419e0e53f6622",
    "status": "completed",
    "completed": "2021-10-28T09:15:42Z"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

## 3. Create a Bulk Redirect Rule via API

Since Bulk Redirect Lists are just containers of URL Redirects, you have to enable the URL Redirects in the list by creating a Bulk Redirect Rule.

Add Bulk Redirect Rules to the entry point ruleset of the `http_request_redirect` phase at the account level. Refer to the [Rulesets API](https://developers.cloudflare.com/ruleset-engine/rulesets-api) documentation for more information on [creating a ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/create) and supplying a list of rules for the ruleset.

A Bulk Redirect Rule must have:

* `action` set to `redirect`
* An `action_parameters` object with additional configuration settings — refer to [API JSON objects: Bulk Redirect Rule](/bulk-redirects/reference/json-objects#bulk-redirect-rule) for details.

The following request of the [Create account ruleset](https://api.cloudflare.com/#account-rulesets-create-account-ruleset) operation creates a phase entry point ruleset for the `http_request_redirect` phase at the account level, and defines a single redirect rule. Use this operation if you have not created a phase entry point ruleset for the `http_request_redirect` phase yet.

```json
curl "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/rulesets" \
-H "Authorization: Bearer <API_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "name": "My redirect ruleset",
  "kind": "root",
  "phase": "http_request_redirect",
  "rules": [
    {
      "expression": "http.request.full_uri in $my_redirect_list",
      "description": "Bulk Redirect rule.",
      "action": "redirect",
      "action_parameters": {
        "from_list": {
          "name": "my_redirect_list",
          "key": "http.request.full_uri"
        }
      }
    }
  ]
}'
```

The response will be similar to the following:

```json
{
  "result": {
    "id": "528f4f03bf0da53a29907199625867be",
    "name": "My redirect ruleset",
    "kind": "root",
    "version": "1",
    "rules": [
      {
        "id": "8da312df846b4258a05bcd454ea943be",
        "version": "1",
        "expression": "http.request.full_uri in $my_redirect_list",
        "description": "Bulk Redirect rule.",
        "action": "redirect",
        "action_parameters": {
          "from_list": {
            "name": "my_redirect_list",
            "key": "http.request.full_uri"
          }
        },
        "last_updated": "2021-10-28T09:20:42Z",
      }
    ],
    "last_updated": "2021-10-28T09:20:42Z",
    "phase": "http_request_redirect"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

If there is already a phase entry point ruleset for the `http_request_redirect` phase, use the [Update account ruleset](https://api.cloudflare.com/#account-rulesets-update-account-ruleset) operation instead, like in the following example:

```json
curl -X PUT \
"https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/rulesets/<RULESET_ID>" \
-H "Authorization: Bearer <API_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "name": "My redirect ruleset",
  "kind": "root",
  "phase": "http_request_redirect",
  "rules": [
    {
      "expression": "http.request.full_uri in $my_redirect_list_2",
      "description": "Bulk Redirect rule 1",
      "action": "redirect",
      "action_parameters": {
        "from_list": {
          "name": "my_redirect_list_1",
          "key": "http.request.full_uri"
        }
      }
    },
    {
      "expression": "http.request.full_uri in $my_redirect_list_2",
      "description": "Bulk Redirect rule 2",
      "action": "redirect",
      "action_parameters": {
        "from_list": {
          "name": "my_redirect_list_2",
          "key": "http.request.full_uri"
        }
      }
    }
  ]
}'
```

The response will be similar to the following:

```json
{
  "result": {
    "id": "67013aa153df4e5fbda92f92bc979331",
    "name": "default",
    "description": "",
    "kind": "root",
    "version": "2",
    "rules": [
      {
        "id": "8be62ab2ef9a4a41af30c24ff8e73e41",
        "version": "1",
        "action": "redirect",
        "action_parameters": {
          "from_list": {
            "name": "my_redirect_list_1",
            "key": "http.request.full_uri"
          }
        },
        "expression": "http.request.full_uri in $my_redirect_list_1",
        "description": "Bulk Redirect rule 1",
        "last_updated": "2021-12-03T15:38:51.658387Z",
        "ref": "8be62ab2ef9a4a41af30c24ff8e73e41",
        "enabled": true
      },
      {
        "id": "97e38797fb2b4b22a4919800f1318a5c",
        "version": "1",
        "action": "redirect",
        "action_parameters": {
          "from_list": {
            "name": "my_redirect_list_2",
            "key": "http.request.full_uri"
          }
        },
        "expression": "http.request.full_uri in $my_redirect_list_2",
        "description": "Bulk Redirect rule 2",
        "last_updated": "2021-12-03T15:38:51.658387Z",
        "ref": "97e38797fb2b4b22a4919800f1318a5c",
        "enabled": true
      }
    ],
    "last_updated": "2021-12-03T15:38:51.658387Z",
    "phase": "http_request_redirect"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```
