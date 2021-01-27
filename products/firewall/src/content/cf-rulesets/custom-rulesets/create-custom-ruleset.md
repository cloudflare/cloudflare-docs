---
title: Create a custom ruleset
alwaysopen: true
order: 751
---

# Create a custom ruleset

<Aside type='warning' header='Important'>

This feature is part of an early access experience for selected customers.

</Aside>

The following POST request creates a new custom ruleset.

```json
curl -X POST "https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets" \
    -d '{
            "name": "Custom Ruleset 1",
            "description": "My First Custom Ruleset",
            "kind": "custom"
        }'

```

The response returns the `id` of the new custom ruleset:

```json
{
  "result": {
    "id": "f82ccda3d21f4a02825d3fe45b5e1c10",
    "name": "Custom Ruleset 1",
    "description": "My First Custom Ruleset",
    "kind": "custom",
    "version": "1",
    "last_updated": "2020-11-09T10:27:30.636197Z",
    "phase": "http_request_main"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

To add rules to the new custom ruleset, see [add rules to a custom ruleset](/cf-rulesets/custom-rulesets/add-rules-ruleset/).