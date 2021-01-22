---
title: Deploy a managed ruleset with ruleset, category, and rule overrides
alwaysopen: true
order: 774
---

# Deploy a managed ruleset with ruleset, category, and rule overrides

<Aside type='warning' header='Important'>

This feature is part of an early access experience for selected customers.

</Aside>

Customize the deployment of managed rulesets with a combination of ruleset overrides, category overrides, and rule overrides in your root ruleset.

1. [Create a root ruleset](/cf-rulesets/configure-root-ruleset/) if you do not already have one.
1. [Add a rule](/cf-rulesets/deploy-rulesets) to your root ruleset to deploy a managed ruleset.
1. [Configure a ruleset override](/cf-rulesets/managed-rulesets/override-managed-ruleset) that disables all rules in the managed ruleset.
1. [Configure a category override](/cf-rulesets/managed-rulesets/override-managed-ruleset) that sets an action for rules tagged with a category.
1. [Configure a rule override](/cf-rulesets/managed-rulesets/override-managed-ruleset) that sets an action for the rules you want to deploy.

The request below uses the [modify ruleset](/cf-rulesets/rulesets-api/put/) operation to execute the following in a single PUT request:

* Add a rule to the root ruleset that applies the **Cloudflare Managed Ruleset** to requests for example.com.
* Use category overrides to enable rules in the WordPress and Drupal categories and set their actions to `log`.
* Add a rule override that enables a single rule.

```json
curl -s -X PUT "https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets/{root-ruleset-id}"  
--data '
{
    "description": "My Root ruleset with ruleset, category and rule overrides",
    "rules": [
        {
            "action": "execute",
            "expression": "cf.zone.name eq \"example.com\"", 
            "action_parameters": {
                "id": "{managed_Ruleset_id}",
                "overrides": {
                    "rulesets": [
                        {
                            "enabled": "false"
                        }],
                    "categories": [
                    {
                        "category": "wordpress",
                        "action": "log"
                    },
                    {
                        "category": "drupal",
                        "action": "log"
                    }],
                    "rules": [
                        {
                            "id": "{rule-id}",
                            "action": "block"
                        }]
                }
            }
        }]
}'

```

* `"ruleset": {"id": "{managed_ruleset_id}"}` adds a rule to the root ruleset that applies the Cloudflare Managed Ruleset to requests for `example.com`.
* `"overrides": {"rulesets": {"enabled": false}}` defines an override at the ruleset level to disable all rules in the managed ruleset.
* `"overrides": {"category": wordpress", "action": "log"}` defines an override at the category level to enable rules tagged with `wordpress` and sets their action to `log`.
* `"overrides": {"rules": [{"id": "{rule-id}", "action": "block"}]}` defines an override at the rule level that enables one individual rule and sets the action to `block`.