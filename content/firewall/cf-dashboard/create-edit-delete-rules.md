---
title: Create, edit, and delete rules
pcx-content-type: how-to
weight: 311
---

# Create, edit, and delete rules

A firewall rule has two main attributes: an **expression** and an **action**.

When an incoming HTTP request matches a firewall rule expression, Cloudflare performs the specified action. For more information, refer to [Expressions](/ruleset-engine/rules-language/expressions/) and [Actions](/firewall/cf-firewall-rules/actions/).

## Expression Builder and Editor

{{<Aside type="warning" header="Important">}}

Firewall rule expressions have a 4 KB limit (approximately 4,000 text characters).

{{</Aside>}}

In the Cloudflare dashboard, there are two options for editing expressions.

The **Expression Builder** allows you to create expressions using drop-down lists and emphasizes an intuitive visual approach to creating firewall rules:

![The Expression Builder interface used to visually define expressions](/firewall/static/firewall-rules-expression-builder-0.png)

The **Expression Editor** is a text-only interface that supports advanced features, such as grouping symbols and functions for transforming and validating values:

![The Expression Editor used to enter advanced expressions](/firewall/static/firewall-rules-expression-editor-0.png)

Both interfaces are available in the **Create firewall rule** page. This article focuses on using the Expression Builder. For more on using the advanced Expression Editor, refer to [Edit rule expressions](/firewall/cf-dashboard/expression-preview-editor/).

## Create a firewall rule

{{<Aside type="note" header="Note">}}

Create a firewall rule based on the filters and exclusions you select within Firewall Analytics by clicking **Create firewall rule** in **Security** > **Overview**.

{{</Aside>}}

To create a new firewall rule:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and website.

1. Navigate to **Security** > **WAF** > **Firewall rules**.

1. Click **Create a firewall rule**.

1. In the **Create firewall rule** page that displays, use the **Rule name** input to supply a descriptive name.

1. Under **When incoming requests match**, use the **Field** drop-down list to choose an HTTP property. For each request, the value of the property you choose for **Field** is compared to the value you specify for **Value**.

    ![Example firewall rule expression with a selected field, operator, and value](/firewall/static/firewall-rules-expression-builder-value.png)

1. Use the **Operator** drop-down list to choose a comparison operator. For an expression to match, the value of the request **Field** and the value specified in the **Value** input must satisfy the comparison operator.

1. Next, specify the value to match. If the value is an enumeration, then the **Value** control will be a drop-down list. Otherwise, it will be a text input.

1. Select an action for your rule in the **Action** drop-down list.

1. To save and deploy your rule, click **Deploy**. If you are not ready to deploy your rule, click **Save as draft**.

After you choose an option, you return to the rules list, which displays your new rule. If you choose to deploy your new rule, the toggle switch associated with the rule will be _On_. If you save the rule as a draft, the toggle will be _Off_. Use the toggle to enable or disable your firewall rule.

## Manage rules

Use the available options in the rules list to manage firewall rules.

![The rules list interface in the dashboard where you can manage firewall rules](/firewall/static/cf-firewall-rules-list.png)

### Edit rule

Click the **Edit** button (wrench icon) located on the right of your rule in the rules list to open the **Edit firewall rule** panel and make the changes you want.

### Enable or disable rule

Use the toggle switch associated with a firewall rule to enable or disable it.

### Delete rule

To delete an existing rule from the **Firewall rules** panel, use the **Delete** button (**X** icon) associated with the rule you want to remove.

In the confirmation dialog that appears, click **Delete** to confirm and complete the operation.

### Order rules

By default, Cloudflare evaluates firewall rules in **list order**, where rules are evaluated in the order they appear in the rules list. When list ordering is enabled, the rules list allows you to drag and drop firewall rules into position, as shown below.

![Animation of a user dragging and dropping a rule in the rules list to reorder it](/firewall/static/firewall-rules-expression-builder-10.gif)

Once there are more than 200 total rules (including inactive rules), you must manage evaluation using **priority ordering**, in which Cloudflare evaluates firewall rules in order of their **priority number**, starting with the lowest. When you cross this threshold, the firewall rules interface automatically switches to priority ordering. For more on working with priority ordering, refer to [Order and priority](/firewall/cf-firewall-rules/order-priority/).

## Test firewall rules with Rule Preview

Rule Preview allows customers on an Enterprise plan to understand the potential impact of a new firewall rule, by testing it against a sample of requests drawn from the last 72 hours of traffic. 

Rule Preview is built into the **Create firewall rule** and **Edit firewall rule** panels so that you can test a rule as you edit it. For more information, refer to [Preview rules](/firewall/cf-dashboard/rule-preview/).
