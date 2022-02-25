---
pcx-content-type: concept
title: Order and priority
weight: 231
---

# Order and priority

import firewallRulesOrderAndPriority2 from '../images/firewall-rules-order-and-priority-2.gif'
import firewallRulesOrderAndPriority3 from '../images/firewall-rules-order-and-priority-3.gif'

## Overview

Cloudflare Firewall Rules is part of a larger evaluation chain for HTTP requests, as illustrated in the diagram below (click the image to view a larger version). For example, Firewall Rules only evaluates requests that first clear IP Access Rules. If a request is blocked by a rule at any stage in the chain, Cloudflare does not evaluate the request further.

![Firewall Rules order and priority](/firewall/static/firewall-rules-order-and-priority-1.png)

<Aside type="warning" header="Important">

*   The execution order diagram does not include products powered by the [Ruleset Engine](/ruleset-engine/) like the [WAF](/waf/) or [Transform Rules](/rules/transform).

*   You can use [IP Access Rules](https://support.cloudflare.com/hc/articles/217074967) to allowlist requests under certain conditions, effectively excluding these requests from all security checks. However, allowing a given country code will not bypass the [Cloudflare Web Application Firewall (WAF)](/waf/).

</Aside>

By default, Cloudflare evaluates Firewall Rules in **list order**, where rules are evaluated in the order they appear in the Firewall Rules **Rules List**. List ordering is convenient when working with small numbers of rules because you can manage their order by dragging and dropping them into position. However, as the number of rules grows, managing rules in list order becomes difficult. This is where priority order comes into play.

When **priority ordering** is enabled, Cloudflare evaluates Firewall Rules in order of their **priority number**, starting with the lowest. If a request matches two rules with the same priority, action precedence is used to resolve the tie. In this case, only the action of the rule with the highest precedence is executed, unless that action is *Log* or *Bypass* (refer to [Firewall Rules actions](/firewall/cf-firewall-rules/actions/#supported-actions) for details). Priority ordering makes it a lot easier to manage large numbers of Firewall Rules, and once the number of rules passes 200, Cloudflare requires it.

## Managing rule evaluation by list order

Users with relatively small numbers of Firewall Rules (no more than 200) will find that list ordering is enabled by default. When list ordering is enabled, the **Rules List** allows you to drag and drop Firewall Rules into position, as shown below:

<img src={firewallRulesOrderAndPriority2} />

Once there are more than 200 total rules, including inactive rules, you must manage evaluation using priority ordering. When you cross this threshold, the Firewall Rules interface automatically switches to priority ordering.

## Managing rule evaluation by priority order

Although priority ordering is enabled automatically when the number of active and inactive Firewall Rules exceeds 200, you can manually enable priority ordering at any time from the **Rules List**. To manually enable priority ordering, click **Ordering** and then select the **Priority Numbers** radio button, as shown below:

<img src={firewallRulesOrderAndPriority3} />

Once priority ordering is enabled, you can set a priority number for each Firewall Rule.

To set the priority number for a Firewall Rule, follow these steps:

1.  Locate the desired rule in the **Rules List** and click the associated **Edit** button (wrench icon).

    The **Edit Firewall Rule** panel will open.

2.  Locate the **Priority** field and enter a positive integer value.

![Edit Firewall Rule page](/firewall/static/firewall-rules-order-and-priority-4.png)

1.  Click **Save** to commit your changes and return to the **Rules List**.

The **Priority** column displays the priority value for each rule.

![Firewall Rules tab](/firewall/static/firewall-rules-order-and-priority-5.png)

<Aside type='note' header='Note'>

Firewall Rules does not impose default priorities, and you are not required to set a priority for every rule.

</Aside>

## Working with priority ordering

Cloudflare has designed priority ordering to be extremely flexible. This flexibility is particularly useful for managing large rulesets programmatically via the Cloudflare API. Use the Update Firewall Rules command to set the `priority` property. Refer to [Cloudflare API: Firewall Rules](https://api.cloudflare.com/#firewall-rules-properties) for details.

While your priority numbering scheme can be arbitrary, keep the following in mind:

*   **The evaluation sequence starts from the lowest priority number** and goes to the highest.
*   **Rules without a priority number are evaluated last**, in order of their action precedence. For example, a rule with the *Log* action is evaluated before a rule that has the *Block* action. For more on action precedence, refer to [Firewall Rules actions](/firewall/cf-firewall-rules/actions/).
*   **Avoid using the number 1 as a priority** so that you can easily maintain and modify rule order.
*   **Consider grouping ranges of priority numbers into categories** that have some meaning for your deployment. Here are some examples:
    *   5000-9999: Trusted IP addresses
    *   10000-19999: Blocking rules for bad crawlers
    *   20000-29999: Blocking rules for abusive users/spam
