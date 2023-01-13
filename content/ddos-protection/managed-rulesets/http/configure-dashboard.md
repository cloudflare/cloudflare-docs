---
title: Configure in the dashboard
pcx_content_type: how-to
weight: 2
meta:
  title: Configure HTTP DDoS Attack Protection in the dashboard
---

# Configure HTTP DDoS Attack Protection in the dashboard

Configure the HTTP DDoS Attack Protection managed ruleset by defining [overrides](/ruleset-engine/managed-rulesets/override-managed-ruleset/) in the Cloudflare dashboard. DDoS overrides allow you to customize the **action** and **sensitivity** of one or more rules in the managed ruleset.

If you are an Enterprise customer with the Advanced DDoS Protection subscription, you can define a custom expression for each override so that the override only applies to a subset of incoming requests. If you do not have the Advanced DDoS Protection subscription, you can only create one override which will always apply to all incoming requests.

For more information on the available parameters and allowed values, refer to [Managed ruleset parameters](/ddos-protection/managed-rulesets/http/override-parameters/).

## Create a DDoS override

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and website.

2. Go to **Security** > **DDoS**.

3. Next to **HTTP DDoS attack protection**, select **Deploy a DDoS override**.

    ![The DDoS L7 managed ruleset override configuration page in the Cloudflare dashboard.](/ddos-protection/static/ddos/ddos-configure-override.png)

4. Enter a descriptive name for the override in **Override name**.

5. If you are an Enterprise customer with the Advanced DDoS Protection subscription:

    1. Under **Override scope**, review the scope of the override — by default, all incoming requests for the current zone.
    2. If necessary, select **Edit scope** and configure the [custom filter expression](/ddos-protection/managed-rulesets/http/override-expressions/) that will determine the override scope.

6. Depending on what you wish to override, refer to the following sections (you can perform both configurations on the same override):

    <details><summary>Configure all the rules in the ruleset</summary><div>

    Under **Ruleset configuration**, select the action and sensitivity values for all the rules in the HTTP DDoS Attack Protection managed ruleset.

    ![Ruleset configuration page for a DDoS override in the Cloudflare dashboard.](/ddos-protection/static/ddos/ddos-configure-ruleset.png)

    </div></details>

    <details><summary>Configure one or more rules</summary><div>

    1\. Under **Rule configuration**, select **Browse rules**.

    2\. Search for the rules you wish to configure using the available filters. You can search by [tag](/ddos-protection/managed-rulesets/http/rule-categories/) (also known as category).

    ![Configuring the action and sensitivity of specific rules in the HTTP DDoS managed ruleset.](/ddos-protection/static/ddos/ddos-configure-rules.png)

    3\. To configure a single rule, select the desired value for a field in the displayed dropdowns next to the rule.

    To configure more than one rule, select the rules using the row checkboxes and update the fields for the selected rules using the dropdowns displayed before the table. You can also configure all the rules with a given tag. For more information, refer to [Configure rules in bulk in a managed ruleset](/waf/managed-rules/deploy-zone-dashboard/#configure-rules-in-bulk-in-a-managed-ruleset).

    {{<Aside type="note">}}Tag and rule configurations have greater priority than ruleset configurations.{{</Aside>}}

    4\. Select **Next**.

    </div></details>

7. Select **Save**.

## Delete a DDoS override

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and website.
2. Go to **Security** > **DDoS**.
3. Under **HTTP DDoS attack protection**, select **Edit** next to the DDoS override you wish to delete.
4. Select **Delete deployment**, and then select **Delete deployment** to confirm the operation.
