---
title: Deploy Managed Rulesets for a zone
pcx-content-type: how-to
order: 21
---

# Deploy Managed Rulesets for a zone in the dashboard

You can enable and configure Managed Rulesets for a zone in the **Managed Rules** tab of the Firewall app.

![Managed Rules tab of Firewall app](../images/waf-managed-rules-tab.png)

## Enable or disable a Managed Ruleset

<Aside type="note">

You many not be able to configure the status of certain Managed Rulesets.

</Aside>

In the Web Application Firewall (WAF) interface, click the toggle on the right of a Managed Ruleset to enable or disable all the rules in that ruleset.

## Configure a Managed Ruleset

<Aside type="note">

Some Managed Rulesets may not allow custom configuration, depending on your Cloudflare plan.

</Aside>

### Configure field values for all the rules

To configure rule field values for all the rules in a Managed Ruleset:

1. Navigate to **Firewall** > **Managed Rules**.

1. On the right of the Managed Ruleset you want to configure, click **Configure**.

1. Under **Ruleset configuration**, set one or more rule fields from the available values in the drop-down lists.

    For example, select the action to perform for all the rules in the ruleset from the **Ruleset Action** drop-down list.

    ![Configure Managed Ruleset](../images/waf-configure-ruleset.png)

1. Click **Save**.

### View the rules of a Managed Ruleset

You can browse the available rules in a Managed Ruleset and search for individual rules or tags.

Use the available filters in the Browse Managed Ruleset interface.

To view the rules of a Managed Ruleset:

1. Open the **Firewall Rules** tab of the **Firewall** tile.

1. On the right of the Managed Ruleset you want to browse, click **Configure**.

1. Click **Browse Rules**.

    The Browse Managed Ruleset interface displays.

    ![Browse rules in Managed Ruleset](../images/waf-browse-rules.png)

### Configure a single rule in a Managed Ruleset

You can configure one or more rules in the Browse Managed Ruleset interface.

Do the following:

1. Search for a rule using the available filters. You can search for tags.

1. Find the rule you want to configure in the results list.

1. In the result line for the rule you want to change, select the desired value for a field in the displayed drop-down lists. For example, select the rule action in the **Action** dropdown.

    In some Managed Rulesets, you can also change the status of a rule using the toggle available on the right.

    ![Browse rules in Managed Ruleset](../images/waf-browse-rules.png)

1. Click **Next**.

    The Configure Managed Ruleset interface displays, listing the configuration you just defined.

1. Click **Save**.

### Configure rules in bulk in a Managed Ruleset

You can configure several rules at once in the Browse Managed Ruleset interface.

Do the following:

1. Enter search terms in the available input to find the rules you want to configure. You can search for tags.

    ![Select tag when browsing a Managed Ruleset](../images/waf-selected-tag.png)

1. In the results list, click the checkbox on the left of all the rules you want to configure.

    Alternatively, click a tag name under the search input to filter the rules with that tag, and then click the checkboxes for the rules you want to configure.

1. Update one or more fields for the selected rules using the drop-down lists displayed in the top right corner of the table.

    ![Configure Managed Ruleset rules in bulk](../images/waf-modify-selected-rules.png)

1. Click **Next**.

    <Aside type='note' header='Note'>

    If you selected a tag, you get a dialog asking you if any new rules with the selected tag should be configured with the field values you selected.

    Select **Do not apply to new rules** to apply your configurations to the selected rules only.

    Select **Apply to new rules** if you want to apply your configurations to any new rules with the select tag.

    </Aside>

1. Click **Save**.

## Phases of deployed Managed Rulesets

When you enable a Managed Ruleset under **Web Application Firewall (WAF)**, you are deploying that Managed Ruleset to the zone-level `http_request_firewall_managed` phase.

Other Managed Rulesets, like DDoS Managed Rulesets, are deployed to a different phase. Check the specific Managed Ruleset documentation for details.

For more information on phases, see [Phases](https://developers.cloudflare.com/firewall/cf-rulesets#phases).
