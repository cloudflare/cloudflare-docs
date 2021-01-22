---
title: GET examples
alwaysopen: true
order: 783
---

# GET examples

<Aside type='warning' header='Important'>

This feature is part of an early access experience for selected customers.

</Aside>

* [List Rulesets](#list-rulesets)
* [Get Ruleset](#get-ruleset)
* [Get Version of Ruleset](#get-version-of-ruleset)

## List Rulesets

```bash
GET accounts/{account_id}/rulesets
```

Returns the latest version of all rulesets owned by the account and any managed rulesets the account is entitled to use.

Results are sorted by Ruleset ID in ascending order.

### Request

```bash
curl -X GET \
     -H "X-Auth-Email: user@cloudflare.com" \
     -H "X-Auth-Key: REDACTED" \
     "https://api.cloudflare.com/client/v4/accounts/{account_id}/rulesets"
```

### Response

```json
{
  "result": [
    {
      "id": "managed_ruleset_id",
      "name": "Cloudflare managed ruleset",
      "kind": "managed",
      "version": "1",
      "last_updated": "2020-07-17T15:42:37.917815Z"
    },
    {
      "id": "root_ruleset_id",
      "name": "My root ruleset",
      "kind": "root",
      "version": "1",
      "last_updated": "2020-07-17T16:01:43.997713Z"
    }
  ]
}
```

## Get Ruleset

```bash
GET  accounts/{account_id}/rulesets/{ruleset_id}
```

Returns the ruleset with the specified Ruleset ID.

The API returns a HTTP Status Code 404 under these conditions:

* When a ruleset cannot be found.
* When the specified ruleset is not a managed ruleset the calling account is entitled to deploy.

### Request

```bash
curl -X GET \
     -H "X-Auth-Email: user@cloudflare.com" \
     -H "X-Auth-Key: REDACTED" \
  "https://api.cloudflare.com/client/v4/accounts/{account_id}/rulesets/{ruleset_id}"
```

### Response

```json
{
  "result": [
    {
      "id": "{ruleset_id}",
      "name": "Example ruleset",
      "kind": "managed",
      "version": "1",
      "last_updated": "2020-07-17T15:42:37.917815Z"
    }
  ],
  "success": true,
  "errors": [],
  "messages": []
}
```

## Get Version of Ruleset

```bash
accounts/{account_id}/rulesets/{ruleset-id}/versions/{version-number}
```

Returns the version of a ruleset with the specified Ruleset ID and version number. This command only works for the most recent version of a managed ruleset. However, you can fetch older versions of your root ruleset and your custom rulesets.

### Request

```bash
curl -X GET \
     -H "X-Auth-Email: user@cloudflare.com" \
     -H "X-Auth-Key: REDACTED" \
  "https://api.cloudflare.com/client/v4/accounts/{account_id}/rulesets/{ruleset-id}/versions/1"
```

### Response

```json
{
  "result": {
    "id": "{ruleset_id}",
    "name": "Example ruleset",
    "kind": "managed",
    "version": "1",
    "rules": [
      {
        "id": "{rule_id}",
        "version": "1",
        "action": "log",
        "expression": "cf.zone.name eq \"example.com\" ",
        "last_updated": "2020-07-17T15:42:37.917815Z"
      }
    ],
    "last_updated": "2020-07-17T15:42:37.917815Z"
  }
}
```

## View rules tagged with a category

```bash
accounts/{account_id}/rulesets/{ruleset-id}/versions/{version-number}
```

Fetches a list of rules in a managed ruleset tagged with a specific category. This command only works for the most recent version of a ruleset.

### Request

```bash
curl -X GET \
      -H "X-Auth-Email: user@cloudflare.com" \
      -H "X-Auth-Key: REDACTED" \
    "https://api.cloudflare.com/client/v4/accounts/{account_id}/rulesets/{ruleset-id}/versions/2/by_category/drupal"

```

### Response

```json
{
  "result": {
    "id": "{ruleset_id}",
    "name": "Cloudflare Managed Ruleset",
    "description": "Created by the Cloudflare security team",
    "kind": "managed",
    "shareable_entitlement_name": "fw_global_rulesets_read_managed_allowed",
    "version": "2",
    "rules": [
      {
        "id": "{rule_id}",
        "version": "1",
        "action": "log",
        "categories": [
          "dos",
          "drupal",
          "wordpress"
        ],
        "last_updated": "2020-10-12T09:01:43.772617Z",
        "ref": "{ref-id}",
        "enabled": true
      },
      {
        "id": "{rule_id}",
        "version": "1",
        "action": "block",
        "categories": [
          "command-injection",
          "drupal"
        ],
        "last_updated": "2020-10-12T09:01:43.772617Z",
        "ref": "{ref-id}",
        "enabled": true
      }
    ]
  }
}
```