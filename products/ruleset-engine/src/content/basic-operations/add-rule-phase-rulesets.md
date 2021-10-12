---
pcx-content-type: how-to
type: overview
order: 2
---

# Add rules to phase entry point rulesets

A phase entry point ruleset contains an ordered list of rules that run in that phase. A rule in an entry point ruleset can execute a different ruleset. You can have entry point rulesets for each phase at the account level and at the zone level.

To add one or more rules to a phase entry point ruleset, use the [Update ruleset](/rulesets-api/update) method of the [Rulesets API](/rulesets-api). When you add a rule to an entry point ruleset, the entry point ruleset is created automatically if it does not exist. This API method requires that you include in the request all rules you want to keep in the ruleset, or else they will be removed.

If you are adding a **single** rule to a ruleset, consider using the [Add rule to ruleset](/rulesets-api/add-rule) API method instead. In this case, the request only includes the definition of the new rule.

<Aside type="note" header="Creating an entry point ruleset">

Instead of relying on the automatic creation of an entry point ruleset, you can also create this ruleset explicitly using the [Create ruleset](/rulesets-api/create) method.

</Aside>

---

## Examples

<details>
<summary>Example: Set the rules of a phase entry point ruleset at the zone level</summary>
<div>

The following example sets the rules of a phase entry point ruleset at the zone level for the `http_request_firewall_managed` phase using the [Update ruleset](/rulesets-api/update) API method.

```json
---
header: Request
---
curl -X PUT \
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED" \
"https://api.cloudflare.com/client/v4/zones/{zone-id}/phases/http_request_firewall_managed/entrypoint" \
-d '{
  "rules": [
    {
      "action": "execute",
      "action_parameters": {
        "id": "{managed-ruleset-id-1}"
      },
      "expression": "true"
    },
    {
      "action": "execute",
      "action_parameters": {
        "id": "{managed-ruleset-id-2}"
      },
      "expression": "true"
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
    "id": "{ruleset-id}",
    "name": "Default",
    "description": "",
    "kind": "zone",
    "version": "1",
    "rules": [
      {
        "id": "{rule-id-1}",
        "version": "1",
        "action": "execute",
        "expression": "true",
        "action_parameters": {
          "id": "{managed-ruleset-id-1}"
        },
        "last_updated": "2021-06-17T15:42:37.917815Z"
      },
      {
        "id": "{rule-id-2}",
        "version": "1",
        "action": "execute",
        "expression": "true",
        "action_parameters": {
          "id": "{managed-ruleset-id-2}"
        },
        "last_updated": "2021-06-17T15:42:37.917815Z"
      }
    ],
    "last_updated": "2021-06-17T15:42:37.917815Z",
    "phase": "http_request_firewall_managed"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

</div>
</details>

<details>
<summary>Example: Add a single rule to a phase entry point ruleset at the zone level</summary>
<div>

The following example adds a single rule to a phase entry point ruleset (with ID `{ruleset-id}`) at the zone level using the [Add rule to ruleset](/rulesets-api/add-rule) API method.

```json
---
header: Request
---
curl -X POST \
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED" \
"https://api.cloudflare.com/client/v4/zone/{zone-id}/rulesets/{ruleset-id}/rules" \
-d '{
  "action": "execute",
  "action_parameters": {
    "id": "{managed-ruleset-id}"
  },
  "expression": "true"
}'
```

```json
---
header: Response
---
{
  "result": {
    "id": "{ruleset-id}",
    "name": "Zone-level phase entry point ruleset",
    "description": "",
    "kind": "root",
    "version": "2",
    "rules": [
      {
        "id": "{existing-rule-id}",
        "version": "1",
        "action": "execute",
        "expression": "true",
        "action_parameters": {
          "id": "{another-managed-ruleset-id}"
        },
        "last_updated": "2021-03-17T15:42:37.917815Z"
      },
      {
        "id": "{new-rule-id}",
        "version": "1",
        "action": "execute",
        "expression": "true",
        "action_parameters": {
          "id": "{managed-ruleset-id}"
        },
        "last_updated": "2021-06-30T15:42:37.917815Z"
      }
    ],
    "last_updated": "2021-06-30T15:42:37.917815Z",
    "phase": "http_request_firewall_managed"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

</div>
</details>

## Next steps

To deploy a ruleset in a phase, add a rule that executes that ruleset to the entry point ruleset. For more information, see [Deploy rulesets](/basic-operations/deploy-rulesets).
