---
title: Configure in the dashboard
pcx_content_type: how-to
weight: 2
meta:
  title: Configure HTTP DDoS Attack Protection in the dashboard
---

# Configure HTTP DDoS Attack Protection in the dashboard

You can customize the **action** and **sensitivity** of the rules in the HTTP DDoS Attack Protection managed ruleset in the following ways:

- [Configure all the rules in the ruleset](#configure-all-the-rules-in-the-ruleset)
- [Configure one or more rules](#configure-one-or-more-rules)

Tag and rule configurations have greater priority than ruleset configurations.

For more information on the available parameters and allowed values, refer to [Managed ruleset parameters](/ddos-protection/managed-rulesets/http/override-parameters/).

{{<Aside type="warning" header="Important note for API users">}}
{{<render file="_ddos-custom-expressions-api-only.md">}}
{{</Aside>}}

## Configure all the rules in the ruleset

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and website.

1. Go to **Security** > **DDoS**.

1. Next to **HTTP DDoS attack protection**, select **Configure**.

1. In **Ruleset configuration**, select the action and sensitivity values for all the rules in the HTTP DDoS Attack Protection managed ruleset.

    ![Configuring the action and sensitivity of all the rules in the HTTP DDoS managed ruleset.](/ddos-protection/static/ddos/ddos-configure-ruleset.png)

1. Select **Save**.

## Configure one or more rules

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and website.

1. Go to **Security** > **DDoS**.

1. Next to **HTTP DDoS attack protection**, select **Configure**.

1. In **Rule configuration**, select **Browse rules**.

1. Search for the rules you wish to configure using the available filters. You can search for tags.

    ![Configuring the action and sensitivity of specific rules in the HTTP DDoS managed ruleset.](/ddos-protection/static/ddos/ddos-configure-rules.png)

1. To configure a single rule, select the desired value for a field in the displayed dropdowns next to the rule.

    To configure more than one rule, select the rules using the row checkboxes and update the fields for the selected rules using the dropdowns displayed before the table. You can also configure all the rules with a given tag. For more information, refer to [Configure rules in bulk in a managed ruleset](/waf/managed-rulesets/deploy-zone-dashboard/#configure-rules-in-bulk-in-a-managed-ruleset).

1. Select **Next** and then select **Save**.
