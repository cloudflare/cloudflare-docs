---
title: Deploy in the dashboard for a zone
pcx_content_type: how-to
weight: 5
meta:
  title: Deploy a Managed Ruleset in the dashboard for a zone
---

# Deploy a Managed Ruleset in the dashboard for a zone

You can deploy and configure Managed Rulesets for a zone in **Security** > **WAF** > **Managed rules**.

To deploy a Managed Ruleset for several Enterprise domains in your account, refer to [Deploy a Managed Ruleset in the dashboard for an account](/waf/managed-rulesets/deploy-account-dashboard/).

![Example Managed Rules configuration in the Managed rules tab under Security > WAF. There is a configured rule for executing the Cloudflare Managed Ruleset, and there are two Managed Rulesets available for deployment.](/waf/static/waf-managed-rules-tab.png)

## Deploy a Managed Ruleset

To deploy a Managed Ruleset with the default configuration, under **Managed Rulesets** select **Deploy** next to a Managed Ruleset. This operation will deploy the Managed Ruleset for the current zone.

To configure a ruleset before deploying it, select **Configure** instead of **Deploy** and define the ruleset configuration. For more information on the available settings, refer to [Configure a Managed Ruleset](#configure-a-managed-ruleset).

When you deploy a Managed Ruleset, the WAF adds an _Execute_ rule, displayed in **Managed rules**, that deploys the Managed Ruleset.

## Enable or disable a Managed Ruleset

Select the **Enabled** toggle next to a Managed Ruleset to enable or disable it.

## Configure a Managed Ruleset

Configure a Managed Ruleset to:

- Define specific field values for one or more rules (for example, configure a rule with an action different from the action configured by Cloudflare).
- Disable one or more rules.
- Specify a custom filter expression to apply the rules in the ruleset to a subset of incoming requests.

To skip one or more rules or WAF Managed Rulesets, [add a WAF exception](/waf/managed-rulesets/waf-exceptions/).

{{<Aside type="note">}}

Some Managed Rulesets may not allow custom configuration, depending on your Cloudflare plan.

{{</Aside>}}

### Configure field values for all the rules

To configure rule field values for all the rules in a Managed Ruleset:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and domain.

2. Go to **Security** > **WAF** > **Managed rules**.

3. Next to the _Execute_ rule that deploys the Managed Ruleset you want to configure, select **Edit**.

4. Under **Ruleset configuration**, set one or more rule fields from the available values in the drop-down lists.

    For example, select the action to perform for all the rules in the ruleset from the **Ruleset action** drop-down list.

    ![The Configure Managed Ruleset page displaying the available options to override all the rules in the ruleset. In the displayed Managed Ruleset you can override the ruleset action.](/waf/static/waf-configure-ruleset.png)

5. (Optional) To apply the rules in the ruleset to a subset of incoming requests instead of all requests, [set the scope using a custom filter expression](#specify-a-custom-expression-for-the-ruleset).

6. Select **Save**.

### View the rules of a Managed Ruleset

You can browse the available rules in a Managed Ruleset and search for individual rules or tags.

Use the available filters in the Browse Managed Ruleset interface.

To view the rules of a Managed Ruleset:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and domain.

2. Go to **Security** > **WAF** > **Managed rules**.

3. Next to the _Execute_ rule that deploys the Managed Ruleset you want to browse, select **Edit**.

4. Select **Browse rules**.

    ![The Browse rules page displaying the list of rules in the Cloudflare Managed Ruleset](/waf/static/waf-browse-rules.png)

### Configure a single rule in a Managed Ruleset

{{<render file="_managed-ruleset-configure-single-rule.md">}}

### Configure rules in bulk in a Managed Ruleset

{{<render file="_managed-ruleset-configure-rules-in-bulk.md">}}

### Specify a custom expression for the ruleset

To apply the rules in the ruleset to a subset of incoming requests, specify a custom filter expression for the rule that executes the Managed Ruleset.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and domain.

2. Go to **Security** > **WAF** > **Managed rules**.

3. Next to the _Execute_ rule that deploys the Managed Ruleset, select **Edit**.

4. Select **Edit filter**.

5. Under **Set Scope**, select **Custom filter expression**.

6. Under **When incoming requests match**, define the scope for all the rules in the ruleset using a custom filter expression. Use the Expression Builder or the Expression Editor for defining the expression. For more information, refer to [Edit rule expressions](/firewall/cf-dashboard/edit-expressions/).

7. Select **Next**, and then select **Save**.