---
title: Deploy a custom ruleset
alwaysopen: true
order: 763
---

# Deploy a custom ruleset

<Aside type='warning' header='Important'>

This feature is part of an early access experience for selected customers.

</Aside>

Before you begin:

1. Obtain the name of the Phase where you want to deploy the custom ruleset.
1. [Create a custom ruleset](/cf-rulesets/custom-rulesets/create-custom-ruleset) and keep the ID of the new custom ruleset.
1. [Fetch the rules already present in the Phase ruleset](/cf-rulesets/view-rulesets#view-the-rules-included-in-a-ruleset). You must include all existing rules you want to keep when you execute the request to deploy the custom ruleset.

Execute a `PUT` request to deploy the custom ruleset. The request creates rules in the `http_request_firewall_custom` Phase that executes the rules in the custom ruleset when the zone name matches `example.com`.

```json
---
header: Request
---
curl -X PUT \
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED" \
"https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets/phases/http_request_firewall_custom/entrypoint" \
-d '{
  "rules": [
    {
      "action":"execute",
      "description":"Add custom ruleset",
      "expression": "cf.zone.name == \"example.com\"",
      "action_parameters": {
        "id":"{custom-ruleset-id}"
      }
    },
    {
      "id": "{existing-phase-rule-id-1}"
    },
    {
      "id": "{existing-phase-rule-id-2}"
    }
  ]
}'
```

The response displays the rules in your Phase.

```json
---
header: Response
---
{
  "result": {
    "id": "{account-phase-ruleset-id}",
    "name": "http_request_firewall_custom Phase Ruleset for my account",
    "description":"Add custom ruleset",
    "kind": "root",
    "version": "3",
    "rules": [
      {
        "id": "{phase-rule-id}",
        "version": "1",
        "action": "execute",
        "action_parameters": {
          "id": "{custom-ruleset-id}",
          "version": "latest"
        },
        "expression": "cf.zone.name == \"example.com\"",
        "last_updated": "2021-03-18T18:35:14.135697Z",
        "ref": "{root-rule-id}",
        "enabled": true
      },
      {
        "id": "{existing-phase-rule-id-1}",
        "version": "1",
        "action": "execute",
        "action_parameters": {
          "id": "{id-of-ruleset-that-existing-rule-id-1-deploys}",
          "version": "latest"
        },
        "expression": "cf.zone.name eq  \"example.com\"",
        "last_updated": "2021-03-16T15:51:49.180378Z",
        "ref": "{existing-phase-rule-ref-1}",
        "enabled": true
      },
      {
        "id": "{existing-phase-rule-id-2}",
        "version": "1",
        "action": "execute",
        "action_parameters": {
          "id": "{id-of-ruleset-that-existing-rule-id-2-deploys}",
          "version": "latest"
        },
        "expression": "cf.zone.name eq  \"example.com\"",
        "last_updated": "2021-03-16T15:50:29.861157Z",
        "ref": "{existing-phase-rule-ref}",
        "enabled": true
      }
    ],
    "last_updated": "2021-03-18T18:35:14.135697Z",
    "phase": "http_request_firewall_custom"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```
