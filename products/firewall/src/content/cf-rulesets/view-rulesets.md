---
order: 710
---

# View rulesets

<Aside type='warning' header='Important'>

This feature is part of an early access experience for selected customers.

</Aside>

## View all rulesets

Use the `/rulesets` endpoint to view your root ruleset, custom rulesets, and a list of managed rulesets that you are entitled to deploy.

```
curl -X GET "https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets"

```

The response displays the following rulesets:
* Managed rulesets you can use indicated by `kind: managed` 
* Root ruleset, if configured, indicated by `kind: root`.
  To create a root ruleset, see [configure the root ruleset for your account](/cf-rulesets/configure-root-ruleset/).
* Custom rulesets, if configured, indicated by `kind: custom`.

```json
    {
      "id": "{Cloudflare_managed_ruleset_id}",
      "name": "Cloudflare Managed Ruleset",
      "description": "Created by the Cloudflare security team, this ruleset is designed to provide fast and effective protection for all your applications. It is frequently updated to cover new vulnerabilities and reduce false positives",
      "kind": "managed",
      "shareable_entitlement_name": "fw_global_rulesets_read_managed_allowed",
      "version": "3",
      "last_updated": "2020-10-08T16:37:33.758753Z",
      "phase": "http_request_main"
    },
    {
      "id": "{Cloudflare_owasp_ruleset_id)",
      "name": "Cloudflare OWASP Core Ruleset",
      "description": "Cloudflare's implementation of the Open Web Application Security Project (OWASP) ModSecurity Core Rule Set. We routinely monitor for updates from OWASP based on the latest version available from the official code repository",
      "kind": "managed",
      "shareable_entitlement_name": "fw_global_rulesets_read_managed_allowed",
      "version": "4",
      "last_updated": "2020-10-08T16:38:09.370328Z",
      "phase": "http_request_main"
    },
    {
      "id": "{root-ruleset-id}",
      "name": "My account root ruleset",
      "kind": "root",
      "version": "1",
      "last_updated": "2020-10-09T09:05:39.938107Z",
      "phase": "http_request_main"
    }
    {
      "id": "{custom-ruleset-id}",
      "name": "Custom Ruleset 1",
      "kind": "custom",
      "version": "2",
      "last_updated": "2020-11-10T11:24:06.869326Z",
      "phase": "http_request_main"
    }

```

## View the rules in a ruleset

Use the following endpoint to view the rules in a ruleset.

```
/rulesets/{ruleset-id}/versions/{version-number}

```

You can view all versions of your root ruleset and custom rulesets, but you can only view the most recent version of managed rulesets.

## View the rules in a custom  ruleset

The example below fetches version two of a custom ruleset.

```
curl -X GET "https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets/{custom-ruleset-id}/versions/2"

```

The response lists the rules in your custom ruleset.

```json
  "result": {
    "id": "{custom-ruleset-id}",
    "name": "Custom Ruleset 1",
    "kind": "custom",
    "version": "2",
    "rules": [
      {
        "id": "{custom-rule-id}",
        "version": "1",
        "action": "challenge",
        "expression": "not http.request.uri.path matches \"^/api/.*$\"",
        "last_updated": "2020-11-10T11:24:06.869326Z",
        "ref": "{custom-rule-id}",
        "enabled": true
      }
    ]
  }

```

## View the rules in a managed ruleset

The example below fetches version three of a managed ruleset.

```
curl -X GET "https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets/{managed-ruleset-id}/versions/3"

```

The response lists the rules, including their associated categories. The following code displays one of the rules in a managed ruleset.

```json
  "result": {
    "id": "{managed-ruleset-id}",
    "name": "Managed Ruleset name",
    "kind": "managed",
    "shareable_entitlement_name": "cf_ruleset_name",
    "version": "3",
    "rules": [
        {
        "id": "{managed-rule-id}",
        "version": "2",
        "action": "block",
        "categories": [
          "deserialization",
          "drupal",
          "magento",
          "php"
        ],
        "description": "Drupal, Magento, PHP - Deserialization",
        "last_updated": "2020-11-05T18:02:53.922856Z",
        "ref": "{managed-rule-id}",
        "enabled": true
      }]}
```

## View managed rules tagged with a category

Use the following endpoint to fetch a list of rules in a managed ruleset tagged with a specific category.

```bash
/rulesets/{managed-ruleset-id}/{version-number}/by_category/{category-name}

```

The example below fetches the rules tagged with the `dos` category in two of a managed ruleset.

```bash
curl -X GET \
    "https://api.cloudflare.com/client/v4/accounts/{account_id}/rulesets/{ruleset-id}/versions/2/by_category/dos"

```

The response shows the managed ruleset but only displays rules tagged with the `dos` category:

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
          "dos",
          "header",
          "microsoft-iis"
        ],
        "last_updated": "2020-10-12T09:01:43.772617Z",
        "ref": "{ref-id}",
        "enabled": true
      }
    ]
  }
}
```