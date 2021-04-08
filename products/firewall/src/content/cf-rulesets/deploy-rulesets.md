---
title: Deploy rulesets
type: overview
order: 740
---

# Deploy rulesets

<Aside type='warning' header='Important'>

This feature is part of an early access experience for selected customers.

</Aside>

Use the [Rulesets API](/cf-rulesets/rulesets-api) to deploy or execute a ruleset. Add a rule with `"action": "execute"` to a Phase, specifying the Ruleset ID as an action parameter. This rule executes the ruleset. Use a separate rule for each ruleset you want to deploy.

A rule that deploys a ruleset consists of:

* The **ID of the ruleset** you want to deploy.
* An **expression**.
* An **action**. To deploy a ruleset, set the action to execute. The rules in the ruleset are executed when a request satisfies the expression.

<Aside type='warning' header='Important'>

When deploying a ruleset to a Phase at the **account** level, use the expression to define the hosts the ruleset applies to. The only field you can use in a rule expression to deploy a ruleset in a Phase at the account level is `cf.zone.name`. The following operators are valid: `equals`, `not equals`, `contains`, `does not contain`, `is in`, `is not in`.

When deploying a ruleset to a Phase at the **zone** level, you must set the expression to `true`. 

</Aside>


## Example

The following example deploys a Managed Ruleset to the `http_request_firewall_managed` Phase of a given zone (`{zone-id}`).

When deploying to a zone-level Phase, you must set `expression` to `true`, since the zone scope is already defined in the endpoint.

```json
---
header: Request
---
curl -X PUT \
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED" \
"https://api.cloudflare.com/client/v4/zones/{zone-id}/rulesets/phases/http_request_firewall_managed/entrypoint" \
-d '{
  "rules": [
    {
      "action": "execute",
      "action_parameters": {
        "id": "{cloudflare-managed-ruleset-id}"
      },
      "expression": "true",
      "description": "Execute Cloudflare Managed Ruleset on my zone ruleset"
    }
  ]
}'
```

```json
---
header: Response
---
{
  "result": {
    "id": "{zone-level-phase-ruleset-id}",
    "name": "Zone-level Ruleset 1",
    "description": "",
    "kind": "zone",
    "version": "latest",
    "rules": [
      {
        "id": "{rule-id}",
        "version": "1",
        "action": "execute",
        "action_parameters": {
          "id": "{cloudflare-managed-ruleset-id}",
          "version": "3"
        },
        "expression": "true",
        "description": "Execute Cloudflare Managed Ruleset on my zone ruleset",
        "last_updated": "2021-03-18T18:08:14.003361Z",
        "ref": "{ruleset-ref}",
        "enabled": true
      }
    ],
    "last_updated": "2021-03-18T18:08:14.003361Z",
    "phase": "http_request_firewall_managed"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

Check [Work with Managed Rulesets](/cf-rulesets/managed-rulesets) and [Work with custom rulesets](/cf-rulesets/custom-rulesets) for more information on working with Managed Rulesets and custom rulesets.

For more information on the available API endpoints for editing and deploying rulesets, check [Update and deploy rulesets](/cf-rulesets/rulesets-api/update).

For examples of deploying rulesets, see [Workflow examples](/cf-rulesets/common-use-cases).
