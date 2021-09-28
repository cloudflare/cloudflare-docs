---
title: Set WordPress rules to Block
pcx-content-type: configuration
alwaysopen: true
order: 771
---

# Use tag overrides to set WordPress rules to Block

Follow the steps below to create a rule that executes a Managed Ruleset and defines an override for rules with a specific tag.

1. [Add a rule](/basic-operations/deploy-rulesets) to a phase entry point ruleset that executes a Managed Ruleset.
1. [Configure a tag override](/managed-rulesets/override-managed-ruleset) that sets a specified action for all rules with a given tag.

The example below uses the [Update ruleset](/rulesets-api/update) operation to perform the two steps in a single `PUT` request.

* Add a rule to the ruleset of the `http_request_firewall_managed` phase that applies the **Cloudflare Managed Ruleset**.
* Override rules with the `wordpress` tag to set the action to `block`. All other rules use the default action provided by the ruleset issuer.

<details>
<summary>Example: Use tag overrides to set WordPress rules to Block at the zone level</summary>
<div>

```json
curl -X PUT \
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED" \
"https://api.cloudflare.com/client/v4/zones/{zone-id}/rulesets/phases/http_request_firewall_managed/entrypoint" \
-d '{
  "rules": [
    {
      "action": "execute",
      "expression": "true",
      "action_parameters": {
        "id": "{managed-ruleset-id}",
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
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED" \
"https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets/phases/http_request_firewall_managed/entrypoint" \
-d '{
  "rules": [
    {
      "action": "execute",
      "expression": "cf.zone.name eq \"example.com\"",
      "action_parameters": {
        "id": "{managed-ruleset-id}",
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
