---
title: Deploy a Managed Ruleset with ruleset, tag, and rule overrides
alwaysopen: true
order: 774
---

# Deploy a Managed Ruleset with ruleset, tag, and rule overrides

<Aside type='warning' header='Important'>

This feature is part of an early access experience for selected customers.

</Aside>

Customize the deployment of Managed Rulesets with a combination of ruleset overrides, tag overrides, and rule overrides in your root ruleset.

1. [Add a rule](/cf-rulesets/deploy-rulesets) to a Phase to deploy a Managed Ruleset.
1. [Configure a ruleset override](/cf-rulesets/managed-rulesets/override-managed-ruleset) that disables all rules in the Managed Ruleset.
1. [Configure a tag override](/cf-rulesets/managed-rulesets/override-managed-ruleset) that sets an action for rules with a given tag.
1. [Configure a rule override](/cf-rulesets/managed-rulesets/override-managed-ruleset) that sets an action for the rules you want to deploy.

The request below uses the [Update ruleset](/cf-rulesets/rulesets-api/update/) operation to execute the following in a single PUT request:

* Add a rule to the ruleset of a Phase that applies the **Cloudflare Managed Ruleset** to requests for `example.com`.
* Use category overrides to enable rules with `wordpress` and `drupal` tags and set their actions to `log`.
* Add a rule override that enables a single rule.

```json
curl -s -X PUT \
"https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets/{root-ruleset-id}"  
-d '{
    "rules": [
    {
        "action": "execute",
        "expression": "cf.zone.name eq \"example.com\"", 
        "action_parameters": {
            "id": "{managed-ruleset-id}",
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

* `"ruleset": {"id": "{managed-ruleset-id}"}` adds a rule to the Phase ruleset that applies the Cloudflare Managed Ruleset to requests for `example.com`.
* `"overrides": {"rulesets": {"enabled": false}}` defines an override at the ruleset level to disable all rules in the Managed Ruleset.
* `"overrides": {"category": wordpress", "action": "log"}` defines an override at the tag level to enable rules tagged with `wordpress` and sets their action to `log`.
* `"overrides": {"rules": [{"id": "{rule-id}", "action": "block"}]}` defines an override at the rule level that enables one individual rule and sets the action to `block`.
