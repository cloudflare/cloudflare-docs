---
pcx_content_type: reference
type: overview
title: Delete a rule in a ruleset
weight: 9
layout: list
---

# Delete a rule in a ruleset

Deletes a single rule in a ruleset at the account or zone level.

Use one of the following API endpoints:

| Operation                                    | Method + Endpoint                                                     |
| -------------------------------------------- | --------------------------------------------------------------------- |
| [Delete an account ruleset rule][dr-account] | `DELETE /accounts/{account_id}/rulesets/{ruleset_id}/rules/{rule_id}` |
| [Delete a zone ruleset rule][dr-zone]        | `DELETE /zones/{zone_id}/rulesets/{ruleset_id}/rules/{rule_id}`       |

[dr-account]: /api/operations/deleteAccountRulesetRule
[dr-zone]: /api/operations/deleteZoneRulesetRule

If the delete operation succeeds, the API method call returns a `200 OK` HTTP status code with the complete ruleset in the response body.

## Example

The following example deletes rule `{rule_id_1}` belonging to ruleset `{ruleset_id}`.

<details open>
<summary>Request</summary>
<div>

```bash
curl --request DELETE \
https://api.cloudflare.com/client/v4/accounts/{account_id}/rulesets/{ruleset_id}/rules/{rule_id_1} \
--header "Authorization: Bearer <API_TOKEN>"
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
    "name": "Custom Ruleset 1",
    "description": "My first custom ruleset",
    "kind": "custom",
    "version": "12",
    "rules": [
      {
        "id": "<RULE_ID_2>",
        "version": "2",
        "action": "js_challenge",
        "expression": "(ip.geoip.country eq \"GB\" or ip.geoip.country eq \"FR\") or cf.threat_score > 0",
        "description": "challenge GB and FR or based on IP Reputation",
        "last_updated": "2021-07-22T12:54:58.144683Z",
        "ref": "<RULE_REF_2>",
        "enabled": true
      }
    ],
    "last_updated": "2021-07-22T12:54:58.144683Z",
    "phase": "http_request_firewall_custom"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

</div>
</details>

The response includes the complete ruleset after deleting the rule.
