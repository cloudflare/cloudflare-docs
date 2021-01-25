---
title: PUT example
alwaysopen: true
order: 785
---

# PUT example

<Aside type='warning' header='Important'>

This feature is part of an early access experience for selected customers.

</Aside>

## Create Version

Use the request to modify an existing root ruleset. This creates a new version of the root rulelset.

```bash
PUT /rulesets/{root-ruleset-id}
```

You can only update the root ruleset owned by your account.

### Request

The following request modifies a root ruleset to deploy a managed ruleset.

```bash
curl -X PUT \
"https://api.cloudflare.com/client/v4/accounts/{account_id}/rulesets/{root_ruleset_id}" --data '
{
  "description": "My Root ruleset deploying managed ruleset", 
  "rules": [
    {
      "action": "execute",
      "expression": "cf.zone.name eq \"example.com\"", 
      "action_parameters":
      {
        "id": "{managedRulesetID}"
      }
    }]
}'
```

### Response

```json
{
  "result":
  {
    "id": "{root_ruleset_id}",
    "name": "Example ruleset",
    "description": "My Root ruleset deploying managed ruleset"
    "kind": "root",
    "version": "2",
    "rules": [
      {
        "id": "rule-id",
        "version": "2",
        "action": "execute",
        "action_parameters":
        {
          "id": "{managedRulesetID}",
          "version": "latest"
        },
        "expression": "cf.zone.name eq \"example.com\",
        "last_updated": "2020-10-20T22:21:57.943241Z",
        "ref": "reference-id",
        "enabled": true
      }
    ],
    "last_updated": "2020-07-20T10:44:29.124515Z"
  }
}

```