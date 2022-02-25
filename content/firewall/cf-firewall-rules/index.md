---
title: About
pcx-content-type: concept
weight: 201
meta:
  title: About Cloudflare Firewall Rules
---

# About Cloudflare Firewall Rules

## Flexibility and control

**Cloudflare Firewall Rules** is a flexible and intuitive framework for filtering HTTP requests. It gives you fine-grained control over which requests reach your applications.

Firewall Rules allows you to create rules combining several conditions. For example, you can create a single Firewall Rule that blocks traffic to a URI when the request comes from a particular IP and the user-agent matches a specific string or a pattern. Once you are satisfied with the rule, you can deploy it yourself, immediately.

Fundamentally, Firewall Rules gives you the power to proactively inspect incoming site traffic and automatically respond to threats. You define **expressions** that tell Cloudflare what to look for and specify the appropriate **action** to take when those criteria are satisfied.

To write Firewall Rule expressions, use the Rules language, a powerful expression language inspired in the Wireshark Display Filter language. Even though Cloudflare Firewall Rules is not based on the [Ruleset Engine](/ruleset-engine/), Firewall Rules expressions use the same syntax of the Cloudflare Rules language.

For more information on rule expressions and the available operators, fields, and functions, refer to [Rules language](/ruleset-engine/rules-language).

## Working with Firewall Rules

To configure Firewall Rules from the Cloudflare dashboard, use the **Firewall Rules** tab in the **Firewall** app. For more, refer to [Manage rules in the Cloudflare dashboard](/firewall/cf-dashboard/).

To configure Firewall Rules with the Cloudflare API, use the Firewall Rules API. Use the Cloudflare Filters API to manage expressions. For more information, refer to [Manage rules via the APIs](/firewall/api/).

You can also manage Firewall Rules through Terraform. For more, refer to [Getting Started with Terraform](https://blog.cloudflare.com/getting-started-with-terraform-and-cloudflare-part-1/).

### Firewall Rules tab

The **Rules List** gives you a snapshot of recent activity and allows you to manage Firewall Rules in a single convenient location.

![Firewall Rules tab](/firewall/static/cf-firewall-rules-panel.png)

#### Challenge Solve Rate (CSR)

The **Rules List** displays each rule's **CSR** (Challenge Solve Rate), which is the percentage of issued challenges that were solved. This metric applies to rules configured with *Legacy CAPTCHA* or *JS Challenge* actions, and it is calculated as follows:

<p><var>CSR</var> = <var>number of challenges solved</var> / <var>number of challenges issued</var></p>

Hover over the CSR to reveal the number of issued and solved CAPTCHA challenges:

![Revealing the number of issued vs. solved CAPTCHA challenges](/firewall/static/firewall-rules-csr-hover.png)

A low CSR means that Cloudflare is issuing a low number of CAPTCHA challenges to actual humans, since these are the solved challenges.

You should aim for a low Challenge Solve Rate. Review the CSR of your CAPTCHA rules periodically and adjust them if necessary:

*   If the rate is higher than expected, for example regarding a Bot Management rule, consider relaxing the rule criteria so that you issue fewer challenges to human visitors.
*   If the rate is 0%, no CAPTCHA challenges are being solved. This means that you have no human visitors whose requests match the rule filter. Consider changing the rule action to *Block*.

<Aside type="warning" header="Important">

Currently, Cloudflare does not calculate the CSR of Managed Challenges.

For customers on a Free plan, any rules configured with the *Legacy CAPTCHA* action will use Managed Challenges. For more information, refer to [Understanding Cloudflare Captchas and Challenge Passage](https://support.cloudflare.com/hc/articles/200170136#managed-challenge).

</Aside>

### Firewall Rules APIs

Power users, particularly those who develop large numbers of Firewall Rules, can use the Cloudflare API to programmatically manage Firewall Rules. Refer to [Manage rules via the API](/firewall/api/) for more information.

## Entitlements

Cloudflare Firewall Rules is available to all customers. However, the number of active Firewall Rules you can have and support for the *Log* action and regular expressions depend on your Cloudflare plan.

This table outlines the Firewall Rules features and entitlements available with each customer plan:

<TableWrap>
<table>
<thead>
<tr>
  <td></td>
  <td colspan="4" style="text-align:center"><strong>Cloudflare plan</strong></td>
</tr>
<tr>
  <td><strong>Feature</strong></td>
  <td><strong>Free</strong></td>
  <td><strong>Pro</strong></td>
  <td><strong>Business</strong></td>
  <td><strong>Enterprise</strong></td>
</tr>
</thead>
<tbody>
<tr>
  <td>Active rules</td>
  <td>5</td>
  <td>20</td>
  <td>100</td>
  <td>1000</td>
</tr>
<tr>
  <td>Supported actions</td>
  <td>All except <em>Log</em></td>
  <td>All except <em>Log</em></td>
  <td>All except <em>Log</em></td>
  <td>All</td>
</tr>
<tr>
  <td>Regular expression support</td>
  <td>No</td>
  <td>No</td>
  <td>Yes</td>
  <td>Yes</td>
</tr>
<tr>
  <td>Number of <a href='/cf-firewall-rules/rules-lists'>IP Lists</a></td>
  <td>1</td>
  <td>10</td>
  <td>10</td>
  <td>10</td>
</tr>
</tbody>
</table>
</TableWrap>

## Get started

Unless you are already an advanced user, refer to [Expressions](/ruleset-engine/rules-language/expressions) and [Actions](/firewall/cf-firewall-rules/actions/) to learn more about the basic elements of Firewall Rules.

To get started building your own Firewall Rules, refer to [Manage Firewall Rules in the dashboard](/firewall/cf-dashboard/create-edit-delete-rules/).

Those eager to dive straight into the technical details can refer to these topics:

*   [Common use cases](/firewall/recipes/)
*   [Manage Firewall Rules via the APIs](/firewall/api/)
*   [Cloudflare Rules language](/ruleset-engine/rules-language)
