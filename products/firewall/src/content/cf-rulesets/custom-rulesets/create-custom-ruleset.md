---
title: Create a custom ruleset
alwaysopen: true
order: 761
---

# Create a custom ruleset

<Aside type='warning' header='Important'>

This feature is part of an early access experience for selected customers.

</Aside>

The following `POST` request creates a new custom ruleset. Set the `kind` field to `custom` and specify the name of the Phase where you want to create the custom ruleset in the `phase` field.

```json
---
header: Request
---
curl -X POST \
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED" \
"https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets" \
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

After creating a custom ruleset, you can [add rules to a custom ruleset](/cf-rulesets/custom-rulesets/add-rules-ruleset).