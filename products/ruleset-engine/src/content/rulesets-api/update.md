---
pcx-content-type: reference
alwaysopen: true
order: 785
---

# Update and deploy rulesets

You can use the API to update **basic properties** of a ruleset (currently only the description) and the **list of rules** in the ruleset.

To update a ruleset at the account or zone level, use one of the following API endpoints:

```bash
---
header: Account-level endpoint
---
PUT /accounts/{account-id}/rulesets/{ruleset-id}
```

```bash
---
header: Zone-level endpoint
---
PUT /zones/{zone-id}/rulesets/{ruleset-id}
```

Alternatively, you can use one of the following endpoints when updating a phase entry point ruleset:

```bash
---
header: Account-level phase endpoint
---
PUT /accounts/{account-id}/rulesets/phases/{phase-name}/entrypoint
```

```bash
---
header: Zone-level phase endpoint
---
PUT /zones/{zone-id}/rulesets/phases/{phase-name}/entrypoint
```

<Aside type='warning' header='Important'>

You cannot update the name of the ruleset or its type. Do not include these fields in the `data` field of your `PUT` request.

</Aside>

## Example - Set the rules of a ruleset

Use this API method to set the rules of a ruleset. You must include all the rules you want to associate with the ruleset in every request.

```json
---
header: Request
---
curl -X PUT \
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED" \
"https://api.cloudflare.com/client/v4/zones/{zone-id}/rulesets/{ruleset-id}" \
-d '{
  "rules": [
    {
      "action": "execute",
      "action_parameters": {
        "id": "{managed-ruleset-id}"
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
    "name": "Zone-level phase entry point",
    "description": "This ruleset executes a Managed Ruleset.",
    "kind": "zone",
    "version": "4",
    "rules": [
      {
        "id": "{rule-id}",
        "version": "2",
        "action": "execute",
        "expression": "true",
        "action_parameters": {
          "id": "{managed-ruleset-id}"
        },
        "last_updated": "2021-03-17T15:42:37.917815Z"
      }
    ],
    "last_updated": "2021-03-17T15:42:37.917815Z",
    "phase": "http_request_firewall_managed"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

## Example - Deploy a ruleset

To deploy a ruleset, create a rule with `"action": "execute"` that executes the ruleset, and add the ruleset ID to the `action_parameters` field in the `id` parameter.

The following example deploys a Managed Ruleset to the zone-level `http_request_firewall_managed` phase of a zone (`{zone-id}`).

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
        "id": "{managed-ruleset-id}"
      },
      "expression": "true",
      "description": "Execute Cloudflare Managed Ruleset on my phase entry point"
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
    "id": "{phase-ruleset-id}",
    "name": "Zone-level phase entry point",
    "description": "",
    "kind": "zone",
    "version": "4",
    "rules": [
      {
        "id": "{rule-id-1}",
        "version": "1",
        "action": "execute",
        "action_parameters": {
          "id": "{managed-ruleset-id}",
          "version": "latest"
        },
        "expression": "true",
        "description": "Execute Cloudflare Managed Ruleset on my phase entry point",
        "last_updated": "2021-03-21T11:02:08.769537Z",
        "ref": "{rule-ref-1}",
        "enabled": true
      }
    ],
    "last_updated": "2021-03-21T11:02:08.769537Z",
    "phase": "http_request_firewall_managed"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

For more information on deploying rulesets, check [Deploy rulesets](/basic-operations/deploy-rulesets).

## Example - Update ruleset description

You can use this API method to update the description of an existing ruleset or phase entry point.

<Aside type='warning' header='Important'>

You cannot update the description or the rules in a Managed Ruleset. You can only [define overrides](/managed-rulesets/override-managed-ruleset) to customize the ruleset behavior.

</Aside>

```json
---
header: Request
---
curl -X PUT \
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED" \
"https://api.cloudflare.com/client/v4/zones/{zone-id}/rulesets/{ruleset-id}" \
-d '{ 
  "description": "My updated phase entry point"
}'
```

```json
---
header: Response
---
{
  "result": {
    "id": "{ruleset-id}",
    "name": "Zone entry point",
    "description": "My updated phase entry point",
    "kind": "zone",
    "version": "4",
    "rules": [
      // (...)
    ],
    "last_updated": "2021-03-30T10:49:11.006109Z",
    "phase": "http_request_firewall_managed"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

The response includes the complete ruleset definition, including all the rules.
