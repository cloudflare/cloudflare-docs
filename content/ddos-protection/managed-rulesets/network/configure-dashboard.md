---
title: Configure in the dashboard
pcx_content_type: how-to
weight: 2
meta:
  title: Configure Network-layer DDoS Attack Protection in the dashboard
---

# Configure Network-layer DDoS Attack Protection in the dashboard

You can customize the **action** and **sensitivity** of the rules in the Network-layer DDoS Attack Protection managed ruleset in the following ways:

- [Override all the rules in the ruleset](#override-all-the-rules-in-the-ruleset)
- [Override one or more rules](#override-one-or-more-rules)

You define overrides for the Network-layer DDoS Attack Protection managed ruleset at the account level. Tag and rule overrides have greater priority than ruleset overrides.

For more information on the available parameters and allowed values, refer to [Ruleset parameters](/ddos-protection/managed-rulesets/network/override-parameters/).

## Override all the rules in the ruleset

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. In the account home page, open **L3/4 DDoS** and go to **Network-layer DDoS Protection**.
3. Select **Deploy a DDoS override**.
4. In **Set scope**, specify if you wish to apply the override to all incoming packets or to a subset of the packets.
5. If you are creating an override for a subset of the incoming packets, define the [custom expression](/ddos-protection/managed-rulesets/network/override-expressions/) that matches the incoming packets you wish to target in the override, using either the Rule Builder or the Expression Editor.
6. Select **Next**, and then select **Next** again.
7. Enter a name for your override in **Rule description**.
8. To always apply a given action for all the rules in the ruleset, select an action in **Ruleset action**.
9. To set the sensitivity level for all the rules in the ruleset, select a value in **Ruleset sensitivity**.
10. To save and deploy the override, select **Deploy**. If you are not ready to deploy your override, select **Save as Draft**.

## Override one or more rules

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.

2. In the account home page, open **L3/4 DDoS** and go to **Network-layer DDoS Protection**.

3. Select **Deploy a DDoS override**.

4. In **Set scope**, specify if you wish to apply the override to all incoming packets or to a subset of the packets.

5. If you are creating an override for a subset of the incoming packets, define the [custom expression](/ddos-protection/managed-rulesets/network/override-expressions/) that matches the incoming packets you wish to target in the override, using either the Rule Builder or the Expression Editor.

6. Select **Next**.

7. Search for the rules you wish to override using the available filters. You can search for tags.

8. To override a single rule, select the desired value for a field in the displayed dropdowns next to the rule.

    To configure more than one rule, select the rules using the row checkboxes and update the fields for the selected rules using the dropdowns displayed before the table. You can also configure all the rules with a given tag. For more information, refer to [Configure rules in bulk in a managed ruleset](/waf/managed-rules/deploy-zone-dashboard/#configure-rules-in-bulk-in-a-managed-ruleset).

9. Select **Next**.

10. Enter a name for your override in **Rule description**.

11. To save and deploy the override, select **Deploy**. If you are not ready to deploy your override, select **Save as Draft**.
