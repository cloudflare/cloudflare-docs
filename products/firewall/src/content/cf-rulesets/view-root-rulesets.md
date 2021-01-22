---
title: View root rulesets
alwaysopen: true
order: 720
---

# View the root rulest

<Aside type='warning' header='Important'>

This feature is part of an early access experience for selected customers.

</Aside>

**Before you begin**

* Fetch your available rulesets. See [View rulesets](/cf-rulesets/view-rulesets/).
* Identify your root ruleset. The `kind` field value for the root ruleset is `root`.
* Identify the `id` of your root ruleset. You will use this to view and edit your root ruleset.

## View all versions of your root ruleset

Use the `/rulesets` endpoint to view the version history for your root ruleset.

```json
curl -X GET "https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets/{root-ruleset-id}"

```

The response does not display the rules in the root ruleset but displays the description, which is an optional parameter. Cloudflare recommends including a description when you modify rules and rulesets.

```json
{
  "result": [
    {
      "id": "{root-policy-id}",
      "name": "Root Policy for my account",
      "description": "Root Policy",
      "kind": "root",
      "version": "1",
      "last_updated": "2020-10-23T09:48:10.118954Z",
      "phase": "http_request_main"
    },
    {
      "id": "{root-policy-id}",
      "name": "Root Policy for my account",
      "description": "My Root ruleset deploying managed ruleset",
      "kind": "root",
      "version": "2",
      "last_updated": "2020-10-23T10:54:26.827344Z",
      "phase": "http_request_main"
    },
    {
      "id": "{root-policy-id}",
      "name": "Root Policy for my account",
      "description": "My Root ruleset - deleted deployment of managed rules",
      "kind": "root",
      "version": "3",
      "last_updated": "2020-10-27T11:50:37.99917Z",
      "phase": "http_request_main"
    },
  ]
}
```

## View a specific version of your root ruleset

Use the `/rulesets` endpoint to view the rules in a specific version of your root ruleset.

```json
curl -X GET "https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets/{root-ruleset-id}/versions/{version-number}"
```

The response displays the following information:
* The root ruleset, indicated by `kind: root`.
* An array of the rules that deploy managed and custom rulesets.

```json
{
    "id": "{root-ruleset-id}",
    "name": "Root Ruleset for my account",
    "kind": "root",
    "version": "6",
    "rules": [
      {
        "id": "{root-deploy-cf-owasp-id}",
        "version": "1",
        "action": "execute",
        "action_parameters": {
          "id": "{cf-owasp-ruleset-id}",
          "version": "latest"
        },
        "expression": "cf.zone.name eq  \"example.com\"",
        "description": "Cloudflare OWASP Ruleset  - example.com",
        "last_updated": "2020-11-20T20:08:06.877779Z",
        "ref": "{root-deploy-cf-owasp-id}",
        "enabled": true
      },
      {
        "id": "{root-rule-id-deploy-custom-ruleset-2}",
        "version": "1",
        "action": "execute",
        "action_parameters": {
          "id": "{custom-ruleset-2-id}",
          "version": "latest"
        },
        "expression": "cf.zone.name eq  \"example.com\"",
        "description": "Custom Ruleset 2 - example.com",
        "last_updated": "2020-11-20T20:08:06.877779Z",
        "ref": "{root-rule-id-deploy-custom-ruleset-2}",
        "enabled": true
      },
      {
        "id": "{root-deploy-cf-managed-id}",
        "version": "1",
        "action": "execute",
        "action_parameters": {
          "id": "{cloudflare-managed-ruleset-id}",
          "version": "latest",
          "overrides": {
            "categories": [
              {
                "category": "joomla",
                "action": "block"
              }
            ]
          }
        },
        "expression": "cf.zone.name eq  \"example.com\"",
        "description": "Cloudflare Managed Ruleset  - example.com",
        "last_updated": "2020-11-20T20:08:06.877779Z",
        "ref": "{root-deploy-cf-managed-id}",
        "enabled": true
      }
    ]  }}
    ```