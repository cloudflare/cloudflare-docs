---
title: Configure in the dashboard
pcx_content_type: how-to
weight: 2
meta:
  title: Configure HTTP DDoS Attack Protection in the dashboard
---

# Configure HTTP DDoS Attack Protection in the dashboard

Configure the HTTP DDoS Attack Protection managed ruleset by defining [overrides](/ruleset-engine/managed-rulesets/override-managed-ruleset/) in the Cloudflare dashboard. DDoS overrides allow you to customize the **action** and **sensitivity** of one or more rules in the managed ruleset.

For more information on the available parameters and allowed values, refer to [Ruleset parameters](/ddos-protection/managed-rulesets/http/override-parameters/).

{{<Aside type="note" header="Number of available overrides">}}
If you are an Enterprise customer with the Advanced DDoS Protection subscription, you can define up to 10 overrides. These overrides can have a custom expression so that the override only applies to a subset of incoming requests. If you do not have the Advanced DDoS Protection subscription, you can only deploy one override which will always apply to all incoming requests.

If you cannot deploy any additional overrides, consider editing an existing override to adjust rule configuration.
{{</Aside>}}

## Create a DDoS override

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and website.

2. Go to **Security** > **DDoS**.

3. Next to **HTTP DDoS attack protection**, select **Deploy a DDoS override**.

4. Enter a descriptive name for the override in **Override name**.

5. If you are an Enterprise customer with the Advanced DDoS Protection subscription:

    1. Under **Override scope**, review the scope of the override — by default, all incoming requests for the current zone.
    2. If necessary, select **Edit scope** and configure the [custom filter expression](/ddos-protection/managed-rulesets/http/override-expressions/) that will determine the override scope.

6. Depending on what you wish to override, refer to the following sections (you can perform both configurations on the same override):

    <details><summary>Configure all the rules in the ruleset (ruleset override)</summary><div>

    1. To always apply a given action for all the rules in the ruleset, select an action in **Ruleset action**.
    2. To set the sensitivity level for all the rules in the ruleset, select a value in **Ruleset sensitivity**.

    </div></details>

    <details><summary>Configure one or more rules</summary><div>

    1. Under **Rule configuration**, select **Browse rules**.

    2. Search for the rules you wish to configure using the available filters. You can search by [tag](/ddos-protection/managed-rulesets/http/rule-categories/) (also known as category).

    3. To configure a single rule, select the desired value for a field in the displayed dropdowns next to the rule.

        To configure more than one rule, select the rules using the row checkboxes and update the fields for the selected rules using the dropdowns displayed before the table. You can also configure all the rules with a given tag. For more information, refer to [Configure rules in bulk in a managed ruleset](/waf/managed-rules/deploy-zone-dashboard/#configure-rules-in-bulk-in-a-managed-ruleset).

    4. Select **Next**.

    </div></details>

    {{<Aside type="note" header="Notes">}}
* Tag and rule overrides have priority over ruleset overrides.
* {{<render file="managed-rulesets/_read-only-rules-note.md">}}
    {{</Aside>}}


7. Select **Save**.

{{<render file="managed-rulesets/_delete-override.md" withParameters="select your account and website;;**Security** > **DDoS**">}}
