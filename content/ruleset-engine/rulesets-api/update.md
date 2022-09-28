---
pcx_content_type: reference
type: overview
title: Update and deploy rulesets
weight: 6
layout: list
---

# Update and deploy rulesets

You can use the API to update **basic properties** of a ruleset (currently only the description) and the **list of rules** in the ruleset.

Use one of the following API endpoints:

| Operation | Method + Endpoint |
|-----------|-------------------|
| [Update account ruleset][ur-account] | `PUT /accounts/<ACCOUNT_ID>/rulesets/<RULESET_ID>` |
| [Update zone ruleset][ur-zone] | `PUT /zones/<ZONE_ID>/rulesets/<RULESET_ID>` |
| [Update account entry point ruleset][uep-account] | `PUT /accounts/<ACCOUNT_ID>/rulesets/phases/<PHASE_NAME>/entrypoint` |
| [Update zone entry point ruleset][uep-zone] | `PUT /zones/<ZONE_ID>/rulesets/phases/<PHASE_NAME>/entrypoint` |

[ur-account]: https://api.cloudflare.com/#account-rulesets-update-account-ruleset
[ur-zone]: https://api.cloudflare.com/#zone-rulesets-update-a-zone-ruleset
[uep-account]: https://api.cloudflare.com/#account-rulesets-update-entrypoint-ruleset
[uep-zone]: https://api.cloudflare.com/#zone-rulesets-update-entrypoint-ruleset

{{<Aside type="warning" header="Important">}}

You cannot update the name of the ruleset or its type. Do not include these fields in the `data` field of your `PUT` request.

{{</Aside>}}

## Example - Set the rules of a ruleset

Use this API method to set the rules of a ruleset. You must include all the rules you want to associate with the ruleset in every request.

<details open>
<summary>Request</summary>
<div>

```json
curl -X PUT \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/<RULESET_ID>" \
-H "Authorization: Bearer <API_TOKEN>" \
-d '{
  "rules": [
    {
      "action": "execute",
      "action_parameters": {
        "id": "<MANAGED_RULESET_ID>"
      },
      "expression": "true"
    }
  ]
}'
```

</div>
</details>

<details>
<summary>Response</summary>
<div>

```json
{
  "result": {
    "id": "<RULESET_ID>",
    "name": "Zone-level phase entry point",
    "description": "This ruleset executes a Managed Ruleset.",
    "kind": "zone",
    "version": "4",
    "rules": [
      {
        "id": "<RULE_ID>",
        "version": "2",
        "action": "execute",
        "expression": "true",
        "action_parameters": {
          "id": "<MANAGED_RULESET_ID>"
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

</div>
</details>

## Example - Deploy a ruleset

To deploy a ruleset, create a rule with `"action": "execute"` that executes the ruleset, and add the ruleset ID to the `action_parameters` field in the `id` parameter.

The following example deploys a Managed Ruleset to the zone-level `http_request_firewall_managed` phase of a zone (`<ZONE_ID>`).

<details open>
<summary>Request</summary>
<div>

```json
curl -X PUT \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/phases/http_request_firewall_managed/entrypoint" \
-H "Authorization: Bearer <API_TOKEN>" \
-d '{
  "rules": [
    {
      "action": "execute",
      "action_parameters": {
        "id": "<MANAGED_RULESET_ID>"
      },
      "expression": "true",
      "description": "Execute Cloudflare Managed Ruleset on my phase entry point"
    }
  ]
}'
```

</div>
</details>

<details>
<summary>Response</summary>
<div>

```json
{
  "result": {
    "id": "<ZONE_PHASE_RULESET_ID>",
    "name": "Zone-level phase entry point",
    "description": "",
    "kind": "zone",
    "version": "4",
    "rules": [
      {
        "id": "<RULE_ID_1>",
        "version": "1",
        "action": "execute",
        "action_parameters": {
          "id": "<MANAGED_RULESET_ID>",
          "version": "latest"
        },
        "expression": "true",
        "description": "Execute Cloudflare Managed Ruleset on my phase entry point",
        "last_updated": "2021-03-21T11:02:08.769537Z",
        "ref": "<RULE_REF_1>",
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

</div>
</details>

For more information on deploying rulesets, check [Deploy rulesets](/ruleset-engine/basic-operations/deploy-rulesets/).

## Example - Update ruleset description

You can use this API method to update the description of an existing ruleset or phase entry point.

{{<Aside type="warning" header="Important">}}

You cannot update the description or the rules in a Managed Ruleset. You can only [define overrides](/ruleset-engine/managed-rulesets/override-managed-ruleset/) to customize the ruleset behavior.

{{</Aside>}}

<details open>
<summary>Request</summary>
<div>

```json
curl -X PUT \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/<RULESET_ID>" \
-H "Authorization: Bearer <API_TOKEN>" \
-d '{
  "description": "My updated phase entry point"
}'
```

</div>
</details>

The response includes the complete ruleset definition, including all the rules.

<details>
<summary>Response</summary>
<div>

```json
{
  "result": {
    "id": "<RULESET_ID>",
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

</div>
</details>
