---
title: Create a custom ruleset
pcx-content-type: how-to
alwaysopen: true
order: 761
---

# Create a custom ruleset

The following `POST` request creates a new custom ruleset. Set the `kind` field to `custom` and specify the name of the phase where you want to create the custom ruleset in the `phase` field.

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

You can include a list of rules in the custom ruleset creation request. However, if you have not added any rules, see how to [add rules to a custom ruleset](/custom-rulesets/add-rules-ruleset).
