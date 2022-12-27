---
title: Set WordPress rules to Block
pcx_content_type: configuration
weight: 2
meta:
  title: Use tag overrides to set WordPress rules to Block
---

# Use tag overrides to set WordPress rules to Block

Follow the steps below to create a rule that executes a managed ruleset and defines an override for rules with a specific tag.

1.  [Add a rule](/ruleset-engine/basic-operations/deploy-rulesets/) to a phase entry point ruleset that executes a managed ruleset.
2.  [Configure a tag override](/ruleset-engine/managed-rulesets/override-managed-ruleset/) that sets a specified action for all rules with a given tag.

The example below uses the [Update ruleset](/ruleset-engine/rulesets-api/update/) operation to perform the two steps in a single `PUT` request.

*   Add a rule to the ruleset of the `http_request_firewall_managed` phase that applies the **Cloudflare Managed Ruleset**.
*   Override rules with the `wordpress` tag to set the action to `block`. All other rules use the default action provided by the ruleset issuer.

<details>
<summary>Example: Use tag overrides to set WordPress rules to Block at the zone level</summary>
<div>

```json
curl -X PUT \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/phases/http_request_firewall_managed/entrypoint" \
-H "Authorization: Bearer <API_TOKEN>" \
-d '{
  "rules": [
    {
      "action": "execute",
      "expression": "true",
      "action_parameters": {
        "id": "<MANAGED_RULESET_ID>",
        "overrides": {
          "categories": [
            {
              "category": "wordpress",
              "action": "block"
            }
          ]
        }
      }
    }
  ]
}'
```

</div>
</details>

<details>
<summary>Example: Use tag overrides to set WordPress rules to Block at the account level</summary>
<div>

```json
curl -X PUT \
"https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/rulesets/phases/http_request_firewall_managed/entrypoint" \
-H "Authorization: Bearer <API_TOKEN>" \
-d '{
  "rules": [
    {
      "action": "execute",
      "expression": "cf.zone.name eq \"example.com\"",
      "action_parameters": {
        "id": "<MANAGED_RULESET_ID>",
        "overrides": {
          "categories": [
            {
              "category": "wordpress",
              "action": "block"
            }
          ]
        }
      }
    }
  ]
}'
```

</div>
</details>
