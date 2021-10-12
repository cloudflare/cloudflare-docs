---
pcx-content-type: how-to
alwaysopen: true
order: 763
---

# Deploy a custom ruleset

Before you begin:

1. Obtain the name of the phase where you want to deploy the custom ruleset.
1. [Create a custom ruleset](/custom-rulesets/create-custom-ruleset) and keep the ID of the new custom ruleset.
1. [Fetch the rules already present in the phase entry point ruleset](/basic-operations/view-rulesets#view-the-rules-included-in-a-ruleset). You must include in the `PUT` request all existing rules you want to keep.

Issue a `PUT` request that adds a rule to execute the custom ruleset when the zone name matches `example.com`.

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
      "description":"Execute custom ruleset",
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

The response displays the rules in your phase.

```json
---
header: Response
---
{
  "result": {
    "id": "{account-phase-ruleset-id}",
    "name": "http_request_firewall_custom phase entry point ruleset for my account",
    "description": "Execute several rulesets",
    "kind": "root",
    "version": "3",
    "rules": [
      {
        "id": "{phase-rule-id}",
        "version": "1",
        "action": "execute",
        "description":"Execute custom ruleset",
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
          "id": "{id-of-ruleset-executed-by-existing-rule-id}",
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
          "id": "{id-of-ruleset-executed-by-existing-rule-id-2}",
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
