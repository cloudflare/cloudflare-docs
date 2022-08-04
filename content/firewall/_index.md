---
title: Overview
pcx_content_type: overview
weight: 1
meta:
  title: Cloudflare Firewall Rules
---

# Cloudflare Firewall Rules

Cloudflare Firewall Rules allows you to create rules that inspect incoming traffic and block, challenge, log, or allow specific requests.

## Main features

* **Rule-based protection**: Use pre-defined rulesets provided by Cloudflare, or define your own firewall rules. Create rules in the Cloudflare dashboard or via API.
* **Complex custom rules**: Each rule's expression can reference multiple fields from all the available HTTP request parameters and fields, allowing you to create complex rules.

## Availability

Cloudflare Firewall Rules is available to all customers. However, the number of active firewall rules you can have and support for the *Log* action and regular expressions depend on your Cloudflare plan.

This table outlines the Firewall Rules features and entitlements available with each customer plan:

{{<table-wrap>}}
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
  <td>1,000</td>
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
  <td>Number of <a href='/firewall/cf-firewall-rules/rules-lists/'>IP Lists</a></td>
  <td>1</td>
  <td>10</td>
  <td>10</td>
  <td>10</td>
</tr>
</tbody>
</table>
{{</table-wrap>}}

## Next steps

* Unless you are already an advanced user, refer to [Expressions](/ruleset-engine/rules-language/expressions/) and [Actions](/firewall/cf-firewall-rules/actions/) to learn more about the basic elements of firewall rules.

* To get started building your own firewall rules, refer to one of the following pages:

    * [Manage firewall rules in the dashboard](/firewall/cf-dashboard/create-edit-delete-rules/)
    * [Manage firewall rules via the APIs](/firewall/api/)

* You can also manage firewall rules through Terraform. For more information, refer to [Getting Started with Terraform](https://blog.cloudflare.com/getting-started-with-terraform-and-cloudflare-part-1/).

## Related resources 

For additional information, refer to the following pages:

* [Common use cases for firewall rules](/firewall/recipes/)
* [Cloudflare Rules language](/ruleset-engine/rules-language/)
