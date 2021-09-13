---
pcx-content-type: configuration
alwaysopen: true
order: 774
---

# Deploy a Managed Ruleset with ruleset, tag, and rule overrides

Customize the execution of Managed Rulesets with a combination of ruleset overrides, tag overrides, and rule overrides in your phase entry point ruleset.

1. [Add a rule](/basic-operations/deploy-rulesets) to a phase entry point ruleset to execute a Managed Ruleset.
1. [Configure a ruleset override](/managed-rulesets/override-managed-ruleset) that disables all rules in the Managed Ruleset.
1. [Configure a tag override](/managed-rulesets/override-managed-ruleset) that sets an action for rules with a given tag.
1. [Configure a rule override](/managed-rulesets/override-managed-ruleset) that sets an action for the rules you want to execute.

The request below uses the [Update ruleset](/rulesets-api/update) operation to execute the following in a single `PUT` request:

* Add a rule to the `http_request_firewall_managed` phase entry point ruleset that executes a Managed Ruleset.
* Use category overrides to enable rules with `wordpress` and `drupal` tags and set their actions to `log`.
* Add a rule override that enables a single rule.

<details>
<summary>Example: Execute a Managed Ruleset at the zone level with overrides</summary>
<div>

In this example:

* `"id": "{managed-ruleset-id}"` adds a rule to the `http_request_firewall_managed` phase entry point ruleset to execute a Managed Ruleset for requests addressed to a zone (`{zone-id}`).
* `"enabled": false` defines an override at the ruleset level to disable all rules in the Managed Ruleset.
* `"categories": [{"category": "wordpress", "action": "log", "enabled": true}, {"category": "drupal", "action": "log", "enabled": true}]` defines an override at the tag level to enable rules tagged with `wordpress` or `drupal` and sets their action to `log`.
* `"rules": [{"id": "{rule-id}", "action": "block", "enabled": true}]` defines an override at the rule level that enables one individual rule and sets the action to `block`.

```json
curl -X PUT \
"https://api.cloudflare.com/client/v4/zones/{zone-id}/rulesets/phases/http_request_firewall_managed/entrypoint" \
-d '{
  "rules": [
    {
      "action": "execute",
      "expression": "true", 
      "action_parameters": {
        "id": "{managed-ruleset-id}",
        "overrides": {
          "enabled": false,
          "categories": [
            {
              "category": "wordpress",
              "action": "log",
              "enabled": true
            },
            {
              "category": "drupal",
              "action": "log",
              "enabled": true              
            }
          ],
          "rules": [
            {
              "id": "{rule-id}",
              "action": "block",
              "enabled": true
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
<summary>Example: Execute a Managed Ruleset at the account level with overrides</summary>
<div>

In this example:

* `"id": "{managed-ruleset-id}"` adds a rule to the `http_request_firewall_managed` phase entry point ruleset that executes a Managed Ruleset for requests addressed to `example.com`.
* `"enabled": false` defines an override at the ruleset level to disable all rules in the Managed Ruleset.
* `"categories": [{"category": "wordpress", "action": "log", "enabled": true}, {"category": "drupal", "action": "log", "enabled": true}]` defines an override at the tag level to enable rules tagged with `wordpress` or `drupal` and sets their action to `log`.
* `"rules": [{"id": "{rule-id}", "action": "block", "enabled": true}]` defines an override at the rule level that enables one individual rule and sets the action to `block`.

```json
curl -X PUT \
"https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets/phases/http_request_firewall_managed/entrypoint" \
-d '{
  "rules": [
    {
      "action": "execute",
      "expression": "cf.zone.name eq \"example.com\"", 
      "action_parameters": {
        "id": "{managed-ruleset-id}",
        "overrides": {
          "enabled": false,
          "categories": [
            {
              "category": "wordpress",
              "action": "log",
              "enabled": true
            },
            {
              "category": "drupal",
              "action": "log",
              "enabled": true
            }
          ],
          "rules": [
            {
              "id": "{rule-id}",
              "action": "block",
              "enabled": true
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
