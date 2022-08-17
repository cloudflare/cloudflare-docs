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

| Operation                                         | Method + Endpoint                                                     |
| ------------------------------------------------- | --------------------------------------------------------------------- |
| [Delete an individual rule][dr-account] (account) | `DELETE /accounts/<ACCOUNT_ID>/rulesets/<RULESET_ID>/rules/<RULE_ID>` |
| Delete an individual rule (zone)                  | `DELETE /zones/<ZONE_ID>/rulesets/<RULESET_ID>/rules/<RULE_ID>`       |

[dr-account]: https://api.cloudflare.com/#account-rulesets-delete-an-individual-rule

If the delete operation succeeds, the API method call returns a `200 OK` HTTP status code with the complete ruleset in the response body.

## Example

The following example deletes rule `<RULE_ID_1>` belonging to ruleset `<RULESET_ID>`.

<details open>
<summary>Request</summary>
<div>

```bash
curl -X DELETE \
"https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/rulesets/<RULESET_ID>/rules/<RULE_ID_1>" \
-H "Authorization: Bearer <API_TOKEN>"
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
