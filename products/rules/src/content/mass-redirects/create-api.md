---
order: 6
pcx-content-type: how-to
---

# Create Mass Redirects via API

To create Mass Redirects via API, you must:

1. Create a Mass Redirect List via API.
1. Add items (URL redirects) to the list created in step 1.
1. Create a Mass Redirect Rule via API, which enables the list created in step 1.

## 1. Create a Mass Redirect List via API

Use the [Create list](https://api.cloudflare.com/#rules-lists-create-list) operation to create a new Mass Redirect List. The list `kind` must be `redirect`.

```json
curl -X POST \
"https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/rules/lists" \
-H "X-Auth-Email: <EMAIL>" \
-H "X-Auth-Key: <KEY>" \
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

Use the [Create list items](https://api.cloudflare.com/#rules-lists-create-list-items) operation to add URL redirect items to the list:

```json
curl -X POST \
"https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/rules/lists/f848b6ccb07647749411f504d6f88794/items" \
-H "X-Auth-Email: <EMAIL>" \
-H "X-Auth-Key: <KEY>" \
-d '[
  {
    "redirect": {
      "source_url": "example.com/blog/",
      "target_url": "https://example.com/blog/latest"
    },
  },
  {
    "redirect": {
      "source_url": "example.net/",
      "target_url": "https://example.net/under-construction.html",
      "status_code": 307
    },
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
-H "X-Auth-Email: <EMAIL>" \
-H "X-Auth-Key: <KEY>"
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

## 3. Create a Mass Redirect Rule via API

Since Mass Redirect Lists are just containers of URL redirects, you have to enable the URL redirects in the list by creating a Mass Redirect Rule.

Add Mass Redirect Rules to the ruleset entry point of the `http_request_redirect` phase at the account level. Refer to the [Rulesets API](https://developers.cloudflare.com/ruleset-engine/rulesets-api) documentation for more information on [creating a ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/create) and supplying a list of rules for the ruleset.

In a Mass Redirect Rule you must:
* Set `action` to `redirect`
* Define an `action_parameters` object with additional configuration settings — refer to [JSON objects: Mass Redirect Rule](#) for details.

The following request creates a phase entry point ruleset for the `http_request_redirect` phase at the account level, and defines a single redirect rule:

```json
curl -X POST "https://api.cloudflare.com/client/v4/account/<ACCOUNT_ID>/rulesets" \
-H "X-Auth-Key: <KEY>" \
-H "X-Auth-Email: <EMAIL>" \
-d '{
  "name": "My redirect ruleset",
  "kind": "root",
  "phase": "http_request_redirect",
  "rules": [
    {
      "expression": "http.request.full_uri in $redirect_list",
      "description": "Mass Redirect rule.",
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
        "expression": "http.request.full_uri in $redirect_list",
        "description": "Mass Redirect rule.",
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
    "phase": "http_request_transform"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```
