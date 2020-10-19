---
title: About
order: 200
---

# About Cloudflare Firewall Rules

## Flexibility and control

**Cloudflare Firewall Rules** is a flexible and intuitive framework for filtering HTTP requests. It gives you fine-grained control over which requests reach your applications.

Cloudflare already offers a number of firewall tools that allow you to restrict access to applications. These are based on IP address, CIDR block, autonomous system number (ASN), country rules, and HTTP user-agent. Meanwhile, Zone Lockdown provides a tool for defining which IP addresses can access a given URI. And our Web Application Firewall (WAF) uses managed rulesets to offer a wide range of protection against known vulnerabilities and suspicious behavior.

Firewall Rules complements these tools by allowing you to create rules that combine these techniques. For example, rather than managing 3 independent rules in 3 different places, you can easily create a single firewall rule that blocks traffic to a URI when the request comes from a particular IP and the user-agent matches a specific string or a pattern. Once you are satisfied with the rule, you can deploy it yourself, immediately.

Fundamentally, Firewall Rules gives you the power to proactively inspect incoming site traffic and automatically respond to threats. You define **expressions** that tell Cloudflare what to look for and specify the appropriate **action** to take when those criteria are satisfied. It is a simple concept, but like the Wireshark Display Filter language that inspired our own expression language, it is extremely powerful and allows organizations to rapidly adapt to a constantly evolving threat landscape.

## Working with Firewall Rules

You can configure Firewall Rules not only from the Cloudflare **Firewall** app and the Cloudflare API but also through Terraform (see _[Getting Started with Terraform](https://blog.cloudflare.com/getting-started-with-terraform-and-cloudflare-part-1/)_). However, the **Firewall Rules** panel in the Firewall app provides the most intuitive interface for building, deploying, and managing firewall rules.

### The Rules List

The **Rules List** gives you a snapshot of recent activity and allows you to manage firewall rules in a single convenient location (see image below).

![](../images/firewall-rules-introduction-1.png)

### The Expression Builder

Both the **Create Firewall** and **Edit Firewall** panels include the visual **Expression Builder** (outlined below, in orange), which is an excellent tool to start with.

![](../images/firewall-rules-introduction-2.png)

### The Expression Editor

Advanced users will appreciate the **Expression Editor** (shown below), which trades the visual simplicity of the builder for the raw power of the Cloudflare Firewall Rules Language. It offers access to advanced features, such as grouping symbols, for constructing highly sophisticated, targeted rules.

![](../images/firewall-rules-introduction-3.png)

Power users, particularly those who develop large numbers of firewall rules, and developers can use the Cloudflare API to programmatically manage Firewall Rules (see _[Manage rules via the API](/api/)_).

## Entitlements

Cloudflare Firewall Rules is available to all customers. Keep in mind that the number of firewall rules you can have active on your account is based on your type of plan, as is support for the _Log_ action and support for regular expressions. The table below outlines the entitlements and features available with each customer plan.

<TableWrap><table>

<thead>
<tr>
<td><strong>Customer Plan</strong></td>
<td><strong>Entitlements (Active Rules)</strong></td>
<td><strong>Supported Actions</strong></td>
<td><strong>Regular Expression Support?</strong></td>
</tr>
</thead>
<tbody>
<tr>
<td>Free</td>
<td>5</td>
<td>All except <em>Log</em></td>
<td>No</td>
</tr>
<tr>
<td>Pro</td>
<td>20</td>
<td>All except <em>Log</em></td>
<td>No</td>
</tr>
<tr>
<td>Business</td>
<td>100</td>
<td>All except <em>Log</em></td>
<td>Yes</td>
</tr>
<tr>
<td>Enterprise</td>
<td>1000</td>
<td>All</td>
<td>Yes</td>
</tr>
</tbody>

  </table>
</TableWrap>

## Get started

Unless you are already an advanced user, we recommend you first learn about the _[Expressions](/firewall/cf-firewall-rules/fields-and-expressions/)_ and _[Actions](/firewall/cf-firewall-rules/actions/)_ topics and then move on to the _[Create, edit, and delete rules](/firewall/cf-dashboard/create-edit-delete-rules/)_ topic. Those eager to dive straight into the technical details should see _[Firewall Rules language](/firewall/cf-firewall-language/)_.
