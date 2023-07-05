---
title: Enable Managed Rulesets
pcx_content_type: how-to
---

# Enable managed rulesets

With [managed rulesets](/ruleset-engine/managed-rulesets/), you can quickly deploy rules maintained by Cloudflare, and you can use Magic Firewall to control which rules are enabled.

{{<Aside type="note" header="Note:">}}

Before you can begin using managed rulesets with Magic Firewall, your account must first be entitled to use managed rulesets. Contact your account team for access.

{{</Aside>}}

To enable or disable a rule, you can specify which properties should be overridden. The overrides occur in the Managed phase, root kind ruleset. Currently, you can only have one rule in the root ruleset, but a single rule can contain multiple overrides.

You have multiple options for enabling rules:

- Select an individual rule and enable it.
- Enable multiple rules by enabling by category in the `magic-transit-phase`.
- Enable an entire ruleset.

## API

### 1. Create a Managed phase Managed kind ruleset

To create a managed ruleset, you must first build a request with the following:

- `managed_ruleset_id`: The ID of the Managed phase Managed kind ruleset that contains the rule you want to enable.
- `managed_rule_id`: The ID of the rule you want to enable.

Additionally, you need the properties you want to override. The properties you can override include:

- `enabled`: This value can be set to `true` or `false`. When set to `true`, the rule matches packets and applies the rule's default action if the action is not overridden. When set to `false`, the rule is disabled and does not match any packets.
- `action`: The value can be set to `log` so the rule only produces logs instead of applying the rule's default action.

The `enabled` and `action` properties for a rule are set in the Managed phase Managed kind ruleset. All rules in the Managed phase are currently disabled by default.

The example below contains a request for a Managed phase Managed Kind ruleset.

```bash
---
header: Example request - Create a Managed phase Managed Kind ruleset
---
curl POST https://api.cloudflare.com/client/v4/accounts/{account_id}/rulesets
--header 'X-Auth-Email: <EMAIL>' \
--header 'X-Auth-Key: <API_KEY>' \
--header "Content-Type:application/json" \
--data '{
  "name": "execute ruleset",
  "description": "Ruleset containing execute rules",
  "kind": "root",
  "phase": "magic_transit_managed",
  "rules": [
    {
      "expression": "true",
      "action": "execute",
      "description": "Enable one rule ",
      "action_parameters": {
        "id": "<MANAGED_RULESET_ID>",
        "version": "latest",
        "overrides": {
          "rules": [
            {
              "id": "<MANAGED_RULE_ID>",
              "enabled": true,
              "action": "log"
            }
          ]
        }
      }
    }
  ]
}'
```

### 2. Patch a Managed phase Managed kind ruleset

To ensure a root kind ruleset only contains one rule, patch the rule to enable new managed rules.

Building off the example from the previous step, the example below enables a category to select multiple rules instead of a single rule. The category will be set to `log` mode, which means the rule can produce logs but will not accept or drop packets.

```bash
---
header: Example request - Patch a Managed phase Managed kind ruleset
---
curl --request PATCH \
https://api.staging.cloudflare.com/client/v4/accounts/{account_id}/rulesets/{root_kind_ruleset}/rules/{root_kind_rule} \
--header 'X-Auth-Email: <EMAIL>' \
--header 'X-Auth-Key: <API_KEY>' \
--header "Content-Type:application/json" \
--data ' {
  "expression": "true",
  "action": "execute",
  "action_parameters": {
    "id": "<MANAGED_RULESET_ID>",
    "version": "latest",
    "overrides": {
      "rules": [
        {
          "id": "<MANAGED_RULE_ID>",
          "enabled": true
        }
      ],
      "categories": [
        {
          "category": "simple",
          "enabled": true
        }
      ]
    }
  }
}'
```

### 3. Enable all rules

To enable the complete ruleset or enable all rules, send the request below.

```bash
---
header: Example request to enable all rules
---
curl --request PATCH \
https://api.staging.cloudflare.com/client/v4/accounts/{account_id}{account_id}/rulesets/{root_kind_ruleset}/rules/{root_kind_rule} \
--header 'X-Auth-Email: <EMAIL>' \
--header 'X-Auth-Key: <API_KEY>' \
--header "Content-Type:application/json" \
--data ' {
  "expression": "true",
  "action": "execute",
  "action_parameters": {
    "id": "<MANAGED_RULESET_ID>",
    "version": "latest",
    "overrides": {
      "enabled": true
    }
  }
}'
```

### 4. Delete a ruleset

To delete a ruleset, refer to [Delete a rule in a ruleset](/ruleset-engine/rulesets-api/delete-rule/).

## Cloudflare dashboard

You can also use the dashboard to enable managed rulesets.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2. Go to **Magic Firewall** > **Managed rules**.
3. Select **Deploy managed ruleset**.
4. The page will refresh and show you rulesets configured by Cloudflare that are available to your account. Choose the ruleset you want with **Select ruleset**. If you do not see the ruleset you want, contact your account manager to get a list of all Magic Firewall Managed rulesets.
5. Under **Ruleset configuration**, configure the **Ruleset action** from the drop-down menu. Cloudflare recommends you change this setting to **Log** to evaluate how the ruleset impacts your traffic before deciding on an action. For more information, refer to [Override a managed ruleset](/ruleset-engine/managed-rulesets/override-managed-ruleset/).
6. Still under **Ruleset configuration**, choose _Enabled_ from the dropdown-menu for the **Ruleset status**. This will apply an override to the default status of all the rules in the ruleset.
7. Select **Deploy** to deploy the Magic Firewall Managed ruleset with no rule-level overrides.

### Add rule-level overrides

Applying a rule-level override allows you to customize the behavior of the managed ruleset. If you implemented Cloudflare’s above recommendation for the ruleset configuration, the rules will be set to a **Log** action and an **Enabled** status.

On the other hand, if you did not apply Cloudflare’s recommendation in the previous step, the ruleset is implemented with all its defaults applied.

To add rule-level overrides in the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2. Go to **Magic Firewall** > **Managed rules**.
3. In front of **Magic Firewall Managed ruleset**, select **Manage**.
4. Select **Browse rules**.
5. In the rule you need to change, select an **Action** from the drop-down to change its action, or use the toggle to disable or enable the rule.
6. Select **Next**.
7. Select **Save**.

The Cloudflare dashboard should now show you the rule-level override you have set. 

### Delete Magic Firewall managed ruleset.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2. Go to **Magic Firewall** > **Managed rules**.
3. Select **Manage**.
4. Select **Delete deployment**.

Your Magic Firewall managed ruleset is now deleted.