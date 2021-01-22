---
title: Enable only Joomla rules
alwaysopen: true
order: 772
---

# Use category overrides to enable Joomla rules

<Aside type='warning' header='Important'>

This feature is part of an early access experience for selected customers.

</Aside>

Use the [Rulesets API](/cf-rulesets/rulesets-api) to deploy managed rulesets and override its behavior. This ensures that **only rules in a specific category are enabled**. By default, enabled rules run with actions set by the ruleset issuer in the managed ruleset.

Follow the steps below to deploy managed rulesets that enable rules tagged with the Joomla category.

1. [Create a root ruleset](/cf-rulesets/configure-root-ruleset/) if you do not already have one.
1. [Add a rule](/cf-rulesets/deploy-rulesets) to your root ruleset that deploys a managed ruleset.
1. [Configure a ruleset override](/cf-rulesets/managed-rulesets/override-managed-ruleset) that disables all rules in the managed ruleset.
1. Configure a category override that enables only rules that are tagged with the category that you want to use.

Category overrides take precedence over ruleset overrides. Only the rules in the specified category are enabled, and all other rules are disabled.

The example below uses the [Modify ruleset](/cf-rulesets/rulesets-api/put/) endpoint to deploy the Cloudflare Managed Ruleset with only Joomla rules enabled. Note that the `name` and `kind` fields are omitted from the request because they are immutable.

```json
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets/{root-ruleset-id}" --data '
{
    "description": "Root ruleset deploying managed ruleset with Joomla category override",
    "rules": [
        {
            "action": "execute",
            "expression": "cf.zone.name eq \"example.com\"", "action_parameters": {
                "id": "{managed_Ruleset_id}",
                "overrides": {
                    "rulesets": [
                        {
                            "enabled": "false"
                        }],
                    "categories": [
                    {
                        "category": "joomla",
                        "action": "block"
                    }]
                }
            }
        }]
}'

```

* `"id": "{managed_ruleset_id}"` adds a rule to the root ruleset that applies the Cloudflare Managed Ruleset to requests for `example.com`.
* `"overrides": {"rulesets": {"enabled": false}}` defines an override at the ruleset level that disables all rules in the managed ruleset.
* `"overrides": {"category": joomla", "action": "block"}` defines an override at the category level that enables the Joomla rules and sets the action to `block`.

You can add more than one category override to a rule in your root ruleset.
In the example below, a PUT request adds two overrides to the deployment of a managed ruleset (`managed_ruleset_ID`) from a root ruleset. Note that the `name` and `kind` fields are omitted from the request because they are immutable.

```json
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets/{root-ruleset-id}" -d '
{
    "description": "Disable managed rulesets and add 2 category overrides",
    "rules": [{
        "action": "execute",
        "expression": "cf.zone.name contains \"/example.com/\"",
        "action_parameters:" {
            "id": "{managed_Ruleset_id}",
            "overrides": {
                "rulesets": [
                    {
                    "enabled": false
                    }],
                "categories": [
                    {
                    "category": "joomla",
                    "enabled": true,
                    "action": "log"
                    },
                    {
                    "category": "wordpress",
                    "enabled": false
                    }]
            }
        }
    }],
}'
```

The order of the overrides in the root ruleset affects whether rules in the deployed managed ruleset are enabled or disabled. Overrides placed later in the list take precedence over earlier overrides. Consider four rules from the managed ruleset in the code above that have different combinations of `category` tags. The following table shows the status of the rules after the overrides.

<table>
  <thead>
    <tr>
      <td><strong>Rule in managed ruleset</strong></td>
      <td><strong>Categories</strong></td>
      <td><strong>Rule status after overrides</strong></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ManagedRule1</td>
      <td>drupal, dos</td>
      <td>disabled</td>
    </tr>
    <tr>
      <td>ManagedRule2</td>
      <td>drupal, dos, joomla</td>
       <td>enabled</td>
    </tr>
    <tr>
      <td>ManagedRule3</td>
      <td>dos, joomla, wordpress</td>
      <td>disabled</td>
    </tr>
    <tr>
      <td>ManagedRule4</td>
      <td>drupal, wordpress</td>
      <td>disabled</td>
    </tr>
    <tr>
      <td>ManagedRule5</td>
      <td>(no category tags)</td>
      <td>disabled</td>
    </tr>
  </tbody>
</table>