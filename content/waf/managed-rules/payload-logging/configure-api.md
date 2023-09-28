---
title: Configure payload logging via API
pcx_content_type: how-to
weight: 4
meta:
  title: Configure payload logging for a managed ruleset via API
---

# Configure payload logging for a managed ruleset via API

You can use the [Rulesets API](https://api.cloudflare.com/) to configure payload logging for a managed ruleset.

## Configure and enable payload logging

To configure:

1.  Use the [Update rule in ruleset](/ruleset-engine/rulesets-api/update-rule/) API method to update the rule that executes the managed ruleset.

2.  In the configuration of the rule that executes the managed ruleset, include a `matched_data` object in `action_parameters` to configure payload logging.

    The `matched_data` object has the following structure:

    ```json
    ---
    highlight: 3-5
    ---
    "action_parameters": {
      // ...
      "matched_data": {
        "public_key": "<PUBLIC_KEY_VALUE>"
      }
    }
    ```

    Replace `<PUBLIC_KEY_VALUE>` with the public key you want to use for payload logging.

You can generate a public key [in the command line](/waf/managed-rules/payload-logging/command-line/generate-key-pair/) or [in the Cloudflare dashboard](/waf/managed-rules/payload-logging/configure/).

### Example

The following example updates rule `{rule_id_1}` that executes the Cloudflare Managed Ruleset for zone `{zone_id}`, configuring payload logging with the provided public key.

```bash
---
header: Request
highlight: 9-11
---
curl --request PATCH \
"https://api.cloudflare.com/client/v4/zone/{zone_id}/rulesets/{ruleset_id}/rules/{rule_id_1}" \
--header "Authorization: Bearer <API_TOKEN>" \
--data '{
  "action": "execute",
  "action_parameters": {
    "id": "<CLOUDFLARE_MANAGED_RULESET_ID>",
    "matched_data": {
      "public_key": "<YOUR_PUBLIC_KEY>"
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
    "id": "<ZONE_LEVEL_RULESET_ID>",
    "name": "Zone-level Ruleset 1",
    "description": "",
    "kind": "zone",
    "version": "3",
    "rules": [
      {
        "id": "<RULE_ID_1>",
        "version": "1",
        "action": "execute",
        "action_parameters": {
          "id": "<CLOUDFLARE_MANAGED_RULESET_ID>",
          "version": "latest",
          "matched_data": {
            "public_key": "<YOUR_PUBLIC_KEY>"
          }
        },
        "expression": "true",
        "description": "Executes the Cloudflare Managed Ruleset",
        "last_updated": "2021-06-28T18:08:14.003361Z",
        "ref": "<RULE_REF_1>",
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

For more information on deploying managed rulesets via API, refer to [Deploy a managed ruleset](/ruleset-engine/managed-rulesets/deploy-managed-ruleset/) in the Ruleset Engine documentation.

***

## Disable payload logging

To disable payload logging for a managed ruleset:

1.  Use the [Update rule in ruleset](/ruleset-engine/rulesets-api/update-rule/) API method to update the rule that executes the managed ruleset.

2.  Modify the rule definition so that there is no `matched_data` object in `action_parameters`.

The following example rule executes a managed ruleset with payload logging disabled:

```json
{
  "action": "execute",
  "action_parameters": {
    "id": "<MANAGED_RULESET_ID>"
  },
  "expression": "true",
  "description": ""
}
```
