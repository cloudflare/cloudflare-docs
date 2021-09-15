---
pcx-content-type: how-to
type: overview
order: 3
---

# Deploy rulesets

Use the [Rulesets API](/rulesets-api) to deploy a ruleset. To deploy a ruleset, add a rule with `"action": "execute"` to a phase entry point ruleset, specifying the ruleset ID to execute as an action parameter. Use a separate rule for each ruleset you want to deploy.

A rule that executes a ruleset consists of:

* The **ID of the ruleset** you want to execute.
* An **expression**.
* An **action**. Set the action to `execute`. The rules in the ruleset execute when a request satisfies the expression.

<Aside type='note'>

To apply a rule to every request in a phase at the **zone** level, set the rule expression to `true`.

</Aside>

## Example

The following example deploys a Managed Ruleset to the `http_request_firewall_managed` phase of a given zone (`{zone-id}`) by adding a rule that executes the Managed Ruleset.

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

See [Work with Managed Rulesets](/managed-rulesets) and [Work with custom rulesets](/custom-rulesets) for more information.

For more information on the available API endpoints for editing and deploying rulesets, refer to [Update and deploy rulesets](/rulesets-api/update).

For examples of deploying rulesets, see [Workflow examples](/common-use-cases).
