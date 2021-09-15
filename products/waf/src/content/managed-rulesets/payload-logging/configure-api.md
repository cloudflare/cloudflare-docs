---
title: Configure payload logging via API
pcx-content-type: how-to
order: 3
---

# Configure payload logging for a Managed Ruleset via API

You can use the [Rulesets API](https://api.cloudflare.com/) to configure payload logging for a Managed Ruleset.

## Configure and enable payload logging

To configure:

1. Use the [Update rule in ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/update-rule) API method to update the rule that executes the Managed Ruleset.

1. In the configuration of the rule that executes the Managed Ruleset, include a `matched_data` object in `action_parameters` to configure payload logging.

    The `matched_data` object has the following structure:

    ```json
    ---
    highlight: [3,4,5]
    ---
    "action_parameters": {
      // ...
      "matched_data": {
        "public_key": "<PUBLIC_KEY_VALUE>"
      }
    }
    ```

    Replace `<PUBLIC_KEY_VALUE>` with the public key you want to use for payload logging.

You can generate a public key [in the command line](/managed-rulesets/payload-logging/command-line/generate-key-pair) or [in the Cloudflare dashboard](/managed-rulesets/payload-logging/configure).

### Example

The following example updates rule `{rule-id-1}` that executes the Cloudflare Managed Ruleset for zone `{zone-id}`, configuring payload logging with the provided public key.

```json
---
header: Request
highlight: [9,10,11]
---
curl -X PATCH \
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED" \
"https://api.cloudflare.com/client/v4/zone/{zone-id}/rulesets/{ruleset-id}/rules/{rule-id-1}" \
-d '{
  "action": "execute",
  "action_parameters": {
    "id": "{cloudflare-managed-ruleset-id}",
    "matched_data": {
      "public_key": "{your-public-key}"
    }
  },
  "expression": "true",
  "description": "Executes the Cloudflare Managed Ruleset"
}'
```

The response includes the complete ruleset after updating the rule.

```json
---
header: Response
---
{
  "result": {
    "id": "{zone-level-phase-ruleset-id}",
    "name": "Zone-level Ruleset 1",
    "description": "",
    "kind": "zone",
    "version": "3",
    "rules": [
      {
        "id": "{rule-id-1}",
        "version": "1",
        "action": "execute",
        "action_parameters": {
          "id": "{cloudflare-managed-ruleset-id}",
          "version": "latest",
          "matched_data": {
            "public_key": "{your-public-key}"
          }
        },
        "expression": "true",
        "description": "Executes the Cloudflare Managed Ruleset",
        "last_updated": "2021-06-28T18:08:14.003361Z",
        "ref": "{ruleset-ref-1}",
        "enabled": true
      },
      // ...
    ],
    "last_updated": "2021-06-28T18:08:14.003361Z",
    "phase": "http_request_firewall_managed"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

For more information on deploying Managed Rulesets via API, see [Deploy a Managed Ruleset](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/deploy-managed-ruleset) in the Ruleset Engine documentation.

---

## Disable payload logging

To disable payload logging for a Managed Ruleset:

1. Use the [Update rule in ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/update-rule) API method to update the rule that executes the Managed Ruleset.

1. Modify the rule definition so that there is no `matched_data` object in `action_parameters`.

The following example rule executes a Managed Ruleset with payload logging disabled:

```json
{
  "action": "execute",
  "action_parameters": {
    "id": "{managed-ruleset-id}"
  },
  "expression": "true",
  "description": ""
}
```
