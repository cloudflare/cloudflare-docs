---
title: Creating rules
order: 40
---

# Creating Load Balancing rules

## Overview

Create and manage [Load Balancing rules](/understand-basics/load-balancing-rules) in the **Custom Rules** page, which is part of the Create/Edit Load Balancer workflow in the **Traffic** app.

Create a Load Balancing rule in the Cloudflare dashboard via the following:

1. [Create a new rule](#create-a-new-load-balancing-rule)
1. [Build an expression for the rule](#build-a-load-balancing-expression)
1. [Save the rule and the load balancer configuration](#save-a-load-balancing-rule-and-configuration)

---

## Create a new Load Balancing rule

1. Log in to your Cloudflare Account and click the site to manage.

1. In the Cloudflare dashboard, click the **Traffic** app, then select the **Load Balancing** tab.

  ![Load Balancing tab in the Traffic app](../../static/images/load-balancing-tab.png)

1. To add a rule to an existing load balancer, click the **Edit** link associated with that specific load balancer. Otherwise, click **Create Load Balancer** and follow the workflow in [_Create a load balancer in the Cloudflare dashboard_](/create-load-balancer-ui).
  
  The **Edit Load Balancer** page displays:

  ![Edit Load Balancer page in Traffic app](../../static/images/edit-load-balancer-hostname.png)

1. In the breadcrumb links for the Edit Load Balancer workflow, click **Custom Rules**.

  The **Custom Rules** card displays:
  ![Edit Load Balancer page in Traffic app](../../static/images/edit-load-balancer-custom-rules.png)

1. Click **Create Custom Rule**.

1. In the **Create Custom Rule** dialog that appears, supply a descriptive name via the **Rule name** input. The example below uses "Select pool by URI path and query."

  ![Screenshot, Create Custom Rule dialog](../../static/images/create-custom-rule.png)

After creating a rule, [build a Load Balancing expression](#build-a-load-balancing-expression) that defines when the rule triggers.

---

## Build a Load Balancing expression

1. In the **Create Custom Rule** Expression builder, under **When incoming requests match…**, use the **Field** drop-down list to choose an HTTP property. This example uses _URI path_. For more details, see [_Supported fields and operators_](/understand-basics/load-balancing-rules/reference).

  ![Screenshot, Create Custom Rule dialog, choose Field](../../static/images/create-custom-rule-field.png)

1. To select a comparison operator, use the **Operator** drop-down list. This example uses the `contains` operator.

1. Enter the value to match. When the field represents an enumeration, **Value** is a drop-down list. Otherwise, **Value** is a text input. The example below matches requests where the URI path contains `/content`:

  ![Screenshot, Create Custom Rule dialog, choose Value](../../static/images/create-custom-rule-value.png)

1. [Optional] To create a compound expression using logical operators, click the **And** or **Or** button.

  A new expression displays. Edit the expression. The below example uses the `and` operator and adds the requirement that the URI query string contain `webserver`:

  ![Screenshot, Create Custom Rule dialog, add logical operator](../../static/images/create-custom-rule-compound-expression.png)

1. Continue editing the expression as necessary.

1. Choose a Load Balancing action of either **Respond with fixed response** or **Override** a current Load Balancer setting when the rule matches.

1. [Optional] Click **Add another action**.

After configuring a Load Balancing action, [save the Load Balancing rule and configuration](#save-a-load-balancing-rule-and-configuration).

---

## Save a Load Balancing rule and configuration

<Aside type='warning' header='Warning'>

Unless you save **not only** the new rule **but also** the load balancer configuration, your rule and any configuration changes are lost.

</Aside>

1. In the **Create Custom Rule** dialog, click **Deploy**. If unready to deploy your rule, click **Save as draft**.

  The **Custom Rules** card displays, and your new rule is listed:

  ![Screenshot, Custom Rules list](../../static/images/custom-rules-list.png)

1. Click **Next** and review your changes:

    ![Screenshot, Edit Load Balancer, Review](../../static/images/edit-load-balancer-review.png)

1. Click **Save**.

When the save completes, the **Load Balancing** page displays.
