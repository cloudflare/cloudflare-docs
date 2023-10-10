---
title: Configure in the dashboard
pcx_content_type: how-to
weight: 2
meta:
  title: Configure Network-layer DDoS Attack Protection in the dashboard
---

# Configure Network-layer DDoS Attack Protection in the dashboard

Configure the Network-layer DDoS Attack Protection managed ruleset by defining [overrides](/ruleset-engine/managed-rulesets/override-managed-ruleset/) in the Cloudflare dashboard. DDoS overrides allow you to customize the **action** and **sensitivity** of one or more rules in the managed ruleset.

You define overrides for the Network-layer DDoS Attack Protection managed ruleset at the account level.

For more information on the available parameters and allowed values, refer to [Ruleset parameters](/ddos-protection/managed-rulesets/network/override-parameters/).

## Create a DDoS override

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to Account Home > **L3/4 DDoS** > **Network-layer DDoS Protection**.
3. Select **Deploy a DDoS override**.
4. In **Set scope**, specify if you wish to apply the override to all incoming packets or to a subset of the packets.
5. If you are creating an override for a subset of the incoming packets, define the [custom expression](/ddos-protection/managed-rulesets/network/override-expressions/) that matches the incoming packets you wish to target in the override, using either the Rule Builder or the Expression Editor.
6. Select **Next**.

7. Depending on what you wish to override, refer to the following sections (you can perform both configurations on the same override):

    <details><summary>Configure all the rules in the ruleset (ruleset override)</summary><div>

    1. Select **Next**.
    2. Enter a name for your override in **Execution name**.
    3. To always apply a given action for all the rules in the ruleset, select an action in **Ruleset action**.
    4. To set the sensitivity level for all the rules in the ruleset, select a value in **Ruleset sensitivity**.

    </div></details>

    <details><summary>Configure one or more rules</summary><div>

    1. Search for the rules you wish to override using the available filters. You can search for tags.

    2. To override a single rule, select the desired value for a field in the displayed dropdowns next to the rule.

        To configure more than one rule, select the rules using the row checkboxes and update the fields for the selected rules using the dropdowns displayed before the table. You can also configure all the rules with a given tag. For more information, refer to [Configure rules in bulk in a managed ruleset](/waf/managed-rules/deploy-zone-dashboard/#configure-rules-in-bulk-in-a-managed-ruleset).

    3. Select **Next**.

    4. Enter a name for your override in **Execution name**.

    </div></details>

    {{<Aside type="note" header="Notes">}}
* Tag and rule overrides have priority over ruleset overrides.
* {{<render file="managed-rulesets/_read-only-rules-note.md">}}
    {{</Aside>}}

8. To save and deploy the override, select **Deploy**. If you are not ready to deploy your override, select **Save as Draft**.

{{<render file="managed-rulesets/_delete-override.md" withParameters="select your account;;Account Home > **L3/4 DDoS** > **Network-layer DDoS Protection**">}}
