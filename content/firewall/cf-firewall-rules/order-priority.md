---
pcx_content_type: concept
title: Order and priority
weight: 3
---

# Order and priority

## Overview

Cloudflare Firewall Rules is part of a larger evaluation chain for HTTP requests, as illustrated in the diagram below. For example, Firewall Rules only evaluates requests that first clear IP Access rules. If a request is blocked by a rule at any stage in the chain, Cloudflare does not evaluate the request further.

![Flow chart of request evaluation at Cloudflare for security products that are not powered by the Ruleset Engine](/firewall/static/firewall-rules-order-and-priority-1.png)

{{<Aside type="warning" header="Important">}}

- You can use [IP Access rules](/waf/tools/ip-access-rules/) to allowlist requests under certain conditions, effectively excluding these requests from all security checks. However, allowing a given country code will not bypass [WAF Managed Rules](/waf/managed-rules/) or [WAF managed rules (previous version)](https://support.cloudflare.com/hc/articles/200172016).

- The execution order diagram does not include products powered by the [Ruleset Engine](/ruleset-engine/) like the [WAF](/waf/) or [Transform Rules](/rules/transform/).

{{</Aside>}}

By default, Cloudflare evaluates firewall rules in **list order**, where rules are evaluated in the order they appear in the firewall rules list. List ordering is convenient when working with small numbers of rules because you can manage their order by dragging and dropping them into position. However, as the number of rules grows, managing rules in list order becomes difficult. This is where priority order comes into play.

When **priority ordering** is enabled, Cloudflare evaluates firewall rules in order of their **priority number**, starting with the lowest. If a request matches two rules with the same priority, action precedence is used to resolve the tie. In this case, only the action of the rule with the highest precedence is executed, unless that action is _Log_ or _Bypass_ (refer to [Firewall rules actions](/firewall/cf-firewall-rules/actions/#supported-actions) for details). Priority ordering makes it a lot easier to manage large numbers of firewall rules, and once the number of rules passes 200, Cloudflare requires it.

## Managing rule evaluation by list order

Users with relatively small numbers of firewall rules (no more than 200) will find that list ordering is enabled by default. When list ordering is enabled, the rules list allows you to drag and drop firewall rules into position, as shown below:

![Animation of a firewall rule being moved into a new position in the rules list to reorder it](/firewall/static/firewall-rules-order-and-priority-2.gif)

Once there are more than 200 total rules, including inactive rules, you must manage evaluation using priority ordering. When you cross this threshold, the firewall rules interface automatically switches to priority ordering.

## Managing rule evaluation by priority order

Although priority ordering is enabled automatically when the number of active and inactive firewall rules exceeds 200, you can manually enable priority ordering at any time from the rules list.

Cloudflare Firewall Rules does not impose default priorities, and you are not required to set a priority for every rule.

### Enable priority ordering

To manually enable priority ordering:

1. Above the rules list, select **Ordering**.
2. Select _Priority Numbers_.

Once priority ordering is enabled, you can set a priority number for each firewall rule.

### Set rule priority

To set the priority number for a firewall rule:

1. Locate the desired rule in the rules list and select **Edit** (wrench icon).

2. In the **Edit firewall rule** panel, enter a positive integer value in **Priority**.

    ![Editing a firewall rule in the dashboard to define its Priority value](/firewall/static/firewall-rules-order-and-priority-4.png)

3. Select **Save**.

The **Priority** column in the rules list displays the priority value for each rule.

![When using priority order, the Firewall rules tab displays the priority of each rule (if any) in the first column of the rules list](/firewall/static/firewall-rules-order-and-priority-5.png)

## Working with priority ordering

Cloudflare has designed priority ordering to be extremely flexible. This flexibility is particularly useful for managing large rulesets programmatically via the Cloudflare API. Use the Update firewall rules command to set the `priority` property. Refer to [Cloudflare API: Firewall rules](/api/operations/firewall-rules-list-firewall-rules) for details.

While your priority numbering scheme can be arbitrary, keep the following in mind:

- **The evaluation sequence starts from the lowest priority number** and goes to the highest.
- **Rules without a priority number are evaluated last**, in order of their action precedence. For example, a rule with the _Log_ action is evaluated before a rule that has the _Block_ action. For more on action precedence, refer to [Firewall rules actions](/firewall/cf-firewall-rules/actions/).
- **Avoid using the number `1` as a priority** so that you can easily maintain and modify rule order.
- **Consider grouping ranges of priority numbers into categories** that have some meaning for your deployment. Here are some examples:

    - 5000-9999: Trusted IP addresses
    - 10000-19999: Blocking rules for bad crawlers
    - 20000-29999: Blocking rules for abusive users/spam
