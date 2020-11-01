---
title: Preview rules
type: table
order: 330
---

# Preview rules

<ContentColumn>

## Overview

Cloudflare Firewall Rules provides a powerful and flexible platform for filtering HTTP requests and protecting your site amid an evolving threat landscape. However, the same power and flexibility that allows you to tailor Firewall Rules to your specific application and environment can also introduce complexity. In these cases, it is critical that you have a way to test a firewall rule before deploying it so that you can ensure the rule will behave the way you expect.

To help customers understand the potential impact of a rule, Cloudflare has built **Rule Preview**. With the click of a button, Rule Preview allows you to test a firewall rule against a sample drawn from the last 72 hours of traffic. Rule Preview is built into the **Firewall Rules Expression Editor** so that you can test a rule as you edit it.

<Aside type='warning' header='Important'>

Rule Preview requires access to an Cloudflare Enterprise plan.

</Aside>

## Use Rule Preview

To test a firewall rule with Rule Preview:

1. Locate the desired rule in the **Rules List** and click the associated **Edit** button (wrench icon). The **Edit Firewall Rule** panel will open.
1. Click **Test rule** to trigger the test.

![Expression Builder Test Rule button](../images/firewall-rules-preview-1.png)

The results of the test are displayed in a plot that simulates how many of the total requests in the last 72 hours would have matched the tested expression.

In this screenshot, a rule that matches all User-Agents that contain the string `Mozilla` would block about 8% of requests to the zone:

![Example rule preview results chart](../images/cf-firewall-rules-preview-rule-plot-chart.png)

## Important Notes

**Consider the results of Firewall Preview an _indication_ of traffic levels**, not an exact calculation. The sample rate can be as little as 1% of your total traffic.

**Rule Preview does not take into account other Cloudflare firewall rules** that you have already configured. In effect, Rule Preview tests a single firewall rule in isolation. Firewall Events or any other rules with a higher priority that may have blocked or challenged a request are ignored.

**Cloudflare does not store the entirety of requests, so only a limited number of fields are available to Rule Preview**. The table below lists the fields that Rule Preview supports (green cells), broken down by operator. Fields and operators that are not supported are not included in this table.

</ContentColumn>

<TableWrap style="width:100%">
<table style="width: 100%">
   <thead>
      <tr>
        <td></td>
        <td><strong>Equal</strong></td>
        <td><strong>Not equal</strong></td>
        <td><strong>Greater than</strong></td>
        <td><strong>Less than</strong></td>
        <td><strong>Greater than or equal</strong></td>
        <td><strong>Less than or equal</strong></td>
        <td><strong>In</strong></td>
        <td><strong>Contains</strong></td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <strong>AS Number</strong>
          <p />
          <strong><code class="InlineCode">ip.geoip.asnum</code></strong>
        </td>
        <td>&#x2705;</td>
        <td>&#x2705;</td>
        <td>&#x2705;</td>
        <td>&#x2705;</td>
        <td>&#x2705;</td>
        <td>&#x2705;</td>
        <td>&#x2705;</td>
        <td>❌</td>
      </tr>
      <tr>
        <td>
          <strong
            >Country
            <p />
            <code class="InlineCode">ip.geoip.country</code></strong
          >
        </td>
        <td>&#x2705;</td>
        <td>&#x2705;</td>
        <td>❌</td>
        <td>❌</td>
        <td>❌</td>
        <td>❌</td>
        <td>&#x2705;</td>
        <td>❌</td>
      </tr>
      <tr>
        <td>
          <strong
            >Hostname
            <p />
            <code class="InlineCode">http.host</code></strong
          >
        </td>
        <td>&#x2705;</td>
        <td>&#x2705;</td>
        <td>❌</td>
        <td>❌</td>
        <td>❌</td>
        <td>❌</td>
        <td>&#x2705;</td>
        <td>&#x2705;</td>
      </tr>
      <tr>
        <td>
          <strong
            >IP Address
            <p />
            <code class="InlineCode">ip.src</code></strong
          >
        </td>
        <td>&#x2705;</td>
        <td>&#x2705;</td>
        <td>❌</td>
        <td>❌</td>
        <td>❌</td>
        <td></td>
        <td>&#x2705;</td>
        <td>❌</td>
      </tr>
      <tr>
        <td>
          <strong
            >Referer
            <p />
            <code class="InlineCode">http.referer</code></strong
          >
        </td>
        <td>&#x2705;</td>
        <td>&#x2705;</td>
        <td>❌</td>
        <td>❌</td>
        <td>❌</td>
        <td>❌</td>
        <td>❌</td>
        <td>&#x2705;</td>
      </tr>
      <tr>
        <td>
          <strong
            >Request method
            <p />
            <code class="InlineCode">Http.request. method</code></strong
          >
        </td>
        <td>&#x2705;</td>
        <td>&#x2705;</td>
        <td>❌</td>
        <td>❌</td>
        <td>❌</td>
        <td>❌</td>
        <td>&#x2705;</td>
        <td>❌</td>
      </tr>
      <tr>
        <td>
          <strong
            >SSL
            <p />
            <code class="InlineCode">ssl</code></strong
          >
        </td>
        <td>&#x2705;</td>
        <td>❌</td>
        <td>❌</td>
        <td>❌</td>
        <td>❌</td>
        <td>❌</td>
        <td>❌</td>
        <td>❌</td>
      </tr>
      <tr>
        <td>
          <strong
            >URI
            <p />
            <code class="InlineCode">http.request.uri</code></strong
          >
        </td>
        <td>&#x2705;</td>
        <td>&#x2705;</td>
        <td>❌</td>
        <td>❌</td>
        <td>❌</td>
        <td>❌</td>
        <td>❌</td>
        <td>❌</td>
      </tr>
      <tr>
        <td>
          <strong
            >URI path
            <p />
            <code class="InlineCode">http.request.uri.path</code></strong
          >
        </td>
        <td>&#x2705;</td>
        <td>&#x2705;</td>
        <td>❌</td>
        <td>❌</td>
        <td>❌</td>
        <td>❌</td>
        <td>&#x2705;</td>
        <td>&#x2705;</td>
      </tr>
      <tr>
        <td>
          <strong
            >URI query string
            <p />
            <code class="InlineCode">http.request.uri.query</code></strong
          >
        </td>
        <td>&#x2705;</td>
        <td>&#x2705;</td>
        <td>❌</td>
        <td>❌</td>
        <td>❌</td>
        <td>❌</td>
        <td>❌</td>
        <td>&#x2705;</td>
      </tr>
      <tr>
        <td>
          <strong
            >User agent
            <p />
            <code class="InlineCode">http.user_agent</code></strong
          >
        </td>
        <td>&#x2705;</td>
        <td>&#x2705;</td>
        <td>❌</td>
        <td>❌</td>
        <td>❌</td>
        <td>❌</td>
        <td>❌</td>
        <td>&#x2705;</td>
      </tr>
    </tbody>
  </table>
</TableWrap>