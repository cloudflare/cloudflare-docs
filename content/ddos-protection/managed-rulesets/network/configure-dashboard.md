---
title: Configure the Managed Ruleset in the dashboard
pcx-content-type: how-to
weight: 2
meta:
  title: Configure Network-layer DDoS Attack Protection in the dashboard
---

# Configure Network-layer DDoS Attack Protection in the dashboard

You can customize the **action** and **sensitivity** of the rules in the Network-layer DDoS Attack Protection Managed Ruleset in the following ways:

- [Override all the rules in the ruleset](#override-all-the-rules-in-the-ruleset)
- [Override one or more rules](#override-one-or-more-rules)

You define overrides for the Network-layer DDoS Attack Protection Managed Ruleset at the account level. Tag and rule overrides have greater priority than ruleset overrides.

For more information on the available parameters and allowed values, refer to [Managed Ruleset parameters](/ddos-protection/managed-rulesets/network/override-parameters/).

## Override all the rules in the ruleset

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2.  In the account home page, open **Firewall Rulesets** and go to **DDoS**.
3.  Click **Deploy a DDoS override**.
4.  In **Set scope**, specify if you wish to apply the override to all incoming packets or to a subset of the packets.
5.  If you are creating an override for a subset of the incoming packets, define the expression that matches the incoming packets you wish to target in the override, using either the Rule Builder or the Expression Editor.
6.  Click **Next**, and click **Next** again.
7.  Enter a name for your override in **Rule description**.
8.  To always apply a given action for all the rules in the ruleset, select an action in **Ruleset action**.
9.  To set the sensitivity for all the rules in the ruleset, select a sensitivity level in **Ruleset sensitivity**.
10. To save and deploy the override, click **Deploy**. If you are not ready to deploy your override, click **Save as Draft**.

## Override one or more rules

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.

2.  In the account home page, open **Firewall Rulesets** and go to **DDoS**.

3.  Click **Deploy a DDoS override**.

4.  In **Set scope**, specify if you wish to apply the override to all incoming packets or to a subset of the packets.

5.  If you are creating an override for a subset of the incoming packets, define the expression that matches the incoming packets you wish to target in the override, using either the Rule Builder or the Expression Editor.

6.  Click **Next**.

7.  Search for the rules you wish to override using the available filters. You can search for tags.

8.  To override a single rule, select the desired value for a field in the displayed dropdowns next to the rule.

    To configure more than one rule, select the rules using the row checkboxes and update the fields for the selected rules using the dropdowns displayed before the table. You can also configure all the rules with a given tag. For more information, refer to [Configure rules in bulk in a Managed Ruleset](/waf/managed-rulesets/deploy-zone-dashboard#configure-rules-in-bulk-in-a-managed-ruleset).

9.  Click **Next**.

10. Enter a name for your override in **Rule description**.

11. To save and deploy the override, click **Deploy**. If you are not ready to deploy your override, click **Save as Draft**.
