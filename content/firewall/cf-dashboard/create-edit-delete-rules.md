---
title: Create, edit, and delete rules
pcx_content_type: how-to
weight: 1
---

# Create, edit, and delete rules

A firewall rule has two main attributes: an **expression** and an **action**.

When an incoming HTTP request matches a firewall rule expression, Cloudflare performs the specified action. For more information, refer to [Expressions](/ruleset-engine/rules-language/expressions/) and [Actions](/firewall/cf-firewall-rules/actions/).

Firewall rule expressions have a 4 KB limit (approximately 4,000 text characters). This limit applies whether you use the visual Expression Builder or edit your expression manually in the Expression Editor.

## Create a firewall rule

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and website.

2. Go to **Security** > **WAF** > **Firewall rules**.

3. Select **Create a firewall rule**.

4. In the **Create firewall rule** page that displays, use the **Rule name** input to supply a descriptive name.

5. Under **When incoming requests match**, use the **Field** drop-down list to choose an HTTP property (refer to [Fields reference](/ruleset-engine/rules-language/fields/) for details). For each request, the value of the property you choose for **Field** is compared to the value you specify for **Value**.

    Alternatively, use the [Expression Editor](/firewall/cf-dashboard/edit-expressions/#expression-editor) to define the rule expression.

    ![Example firewall rule expression with a selected field, operator, and value](/firewall/static/firewall-rules-expression-builder-value.png)

6. Use the **Operator** drop-down list to choose a comparison operator. For an expression to match, the value of the request **Field** and the value specified in the **Value** input must satisfy the comparison operator.

7. Next, specify the value to match. If the value is an enumeration, then the **Value** control will be a drop-down list. Otherwise, it will be a text input.

8. To add a new sub-expression to the rule expression, select **And** or **Or** next to **Value**.

9. Select an action for your rule in the **Action** drop-down list.

10. To save and deploy your rule, select **Deploy**. If you are not ready to deploy your rule, select **Save as draft**.

After you choose an option, you return to the rules list, which displays your new rule.

## Manage rules

Use the available options in the rules list to manage firewall rules.

![The rules list interface in the dashboard where you can manage firewall rules](/firewall/static/cf-firewall-rules-list.png)

### Edit rule

Select **Edit** (wrench icon) located on the right of your rule in the rules list to open the **Edit firewall rule** panel and make the changes you want.

### Enable or disable rule

Use the toggle switch associated with a firewall rule to enable or disable it.

### Delete rule

1. Next to the rule you want to delete, select **Delete** (**X** icon).
2. In the confirmation dialog, select **Delete** to complete the operation.

### Order rules

By default, Cloudflare evaluates firewall rules in **list order**, where rules are evaluated in the order they appear in the rules list. When list ordering is enabled, the rules list allows you to drag and drop firewall rules into position, as shown below.

![Animation of a user dragging and dropping a rule in the rules list to reorder it](/firewall/static/firewall-rules-expression-builder-10.gif)

Once there are more than 200 total rules (including inactive rules), you must manage evaluation using **priority ordering**, in which Cloudflare evaluates firewall rules in order of their **priority number**, starting with the lowest. When you cross this threshold, the firewall rules interface automatically switches to priority ordering. For more on working with priority ordering, refer to [Order and priority](/firewall/cf-firewall-rules/order-priority/).

## Test firewall rules with Rule Preview

Rule Preview allows customers on an Enterprise plan to understand the potential impact of a new firewall rule, by testing it against a sample of requests drawn from the last 72 hours of traffic.

Rule Preview is built into the **Create firewall rule** and **Edit firewall rule** panels so that you can test a rule as you edit it. For more information, refer to [Preview rules](/firewall/cf-dashboard/rule-preview/).
