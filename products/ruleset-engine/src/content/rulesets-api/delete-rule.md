---
pcx-content-type: reference
order: 787
type: overview
---

# Delete a rule in a ruleset

Deletes a single rule in a ruleset at the account or zone level.

Use one of the following API endpoints:

| Operation | Method + Endpoint |
|-----------|-------------------|
| [Delete an individual rule][dr-account] (account) | `DELETE /accounts/{account-id}/rulesets/{ruleset-id}/rules/{rule-id}` |
| Delete an individual rule (zone) | `DELETE /zones/{zone-id}/rulesets/{ruleset-id}/rules/{rule-id}` |

[dr-account]: https://api.cloudflare.com/#account-rulesets-delete-an-individual-rule

If the delete operation succeeds, the API method call returns a `200 OK` HTTP status code with the complete ruleset in the response body.

## Example

The following example deletes rule `{rule-id-1}` belonging to ruleset `{ruleset-id}`.

<details open>
<summary>Request</summary>
<div>

```json
curl -X DELETE \
  -H "X-Auth-Email: user@example.com" \
  -H "X-Auth-Key: REDACTED" \
  "https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets/{ruleset-id}/rules/{rule-id-1}"
```

</div>
</details>

<details>
<summary>Response</summary>
<div>

```json
{
  "result": {
    "id": "{ruleset-id}",
    "name": "Custom Ruleset 1",
    "description": "My first custom ruleset",
    "kind": "custom",
    "version": "12",
    "rules": [
      {
        "id": "{rule-id-2}",
        "version": "2",
        "action": "js_challenge",
        "expression": "(ip.geoip.country eq \"GB\" or ip.geoip.country eq \"FR\") or cf.threat_score > 0",
        "description": "challenge GB and FR or based on IP Reputation",
        "last_updated": "2021-07-22T12:54:58.144683Z",
        "ref": "{rule-ref-2}",
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
