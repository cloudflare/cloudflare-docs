---
title: Deploy a custom ruleset from your root ruleset
alwaysopen: true
order: 753
---

# Deploy a custom ruleset from your root ruleset

<Aside type='warning' header='Important'>

This feature is part of an early access experience for selected customers.

</Aside>

**Before you begin**:
* Create a root ruleset if you do not already have one.
* Create a custom ruleset.
* Fetch the IDs of the root and custom rulesets you want to deploy.
* Fetch the rules in your root ruleset. You must include all existing rules you want to keep when you execute the request to deploy the custom ruleset.

The PUT request deploys custom rulesets. The request creates rules in the root ruleset that executes rules in the custom ruleset when zone names match `example.com`.

```json
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets/{root-ruleset-id}" \
    -d'
{
     "rules": [{
                    "action":"execute",
                    "description":"Add custom ruleset",
                    "expression": "cf.zone.name == \"example.com\"",
                    "action_parameters": {
                        "id":"{custom-ruleset-id}"
                     }
    },
		{
                "id": "{existing-root-rule-id-1}"
     },
  	{
                "id": "{existing-root-rule-id-2}"
     }]
}'
```

The response displays the rules in your root ruleset.

```json
{
  "result": {
    "id": "{root-ruleset-id}",
    "name": "Root Ruleset for my account",
    "description":"Add custom ruleset",
    "kind": "root",
    "version": "3",
    "rules": [
      {
        "id": "{root-rule-id}",
        "version": "1",
        "action": "execute",
        "action_parameters": {
          "id": "{custom-ruleset-id}",
          "version": "latest"
        },
        "expression": "cf.zone.name == \"example.com\"",
        "last_updated": "2020-11-09T10:32:14.135697Z",
        "ref": "{root-rule-id}",
        "enabled": true
      },
      {
        "id": "{existing-root-rule-id-1}",
        "version": "1",
        "action": "execute",
        "action_parameters": {
          "id": "{id-of-ruleset-that-existing-rule-id-1-deploys}",
          "version": "latest"
        },
        "expression": "cf.zone.name eq  \"example.com\"",
        "last_updated": "2020-11-20T15:51:49.180378Z",
        "ref": "{existing-root-rule-id-1}",
        "enabled": true
      },
      {
        "id": "{existing-root-rule-id-2}",
        "version": "1",
        "action": "execute",
        "action_parameters": {
          "id": "{id-of-ruleset-that-existing-rule-id-2-deploys}",
          "version": "latest"
        },
        "expression": "cf.zone.name eq  \"example.com\"",
        "last_updated": "2020-11-20T15:50:29.861157Z",
        "ref": "{existing-root-rule-id-2}",
        "enabled": true
      }
    ]
  }
}
```