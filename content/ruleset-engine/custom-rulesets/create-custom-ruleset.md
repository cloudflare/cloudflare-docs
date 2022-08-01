---
title: Create a custom ruleset
pcx_content_type: how-to
weight: 2
---

# Create a custom ruleset

Use the [Create account ruleset](https://api.cloudflare.com/#account-rulesets-create-account-ruleset) API operation to create a custom ruleset, making sure that you:

* Set the `kind` field to `custom`.
* Specify the name of the phase where you want to create the custom ruleset in the `phase` field.

## Example

The following request creates a new custom ruleset:

```json
---
header: Request
---
curl "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/rulesets" \
-H "Authorization: Bearer <API_TOKEN>" \
-d '{
  "name": "Custom Ruleset 1",
  "description": "My First Custom Ruleset",
  "kind": "custom",
  "phase": "http_request_firewall_custom"
}'
```

The response includes the ruleset ID of the new custom ruleset in the `id` field:

```json
---
header: Response
---
{
  "result": {
    "id": "f82ccda3d21f4a02825d3fe45b5e1c10",
    "name": "Custom Ruleset 1",
    "description": "My First Custom Ruleset",
    "kind": "custom",
    "version": "1",
    "last_updated": "2021-03-09T10:27:30.636197Z",
    "phase": "http_request_firewall_custom"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

You can include a list of rules in the custom ruleset creation request. If you have not added any rules, refer to [Add rules to a custom ruleset](/ruleset-engine/custom-rulesets/add-rules-ruleset/) for more information.
