---
title: Preview rules
pcx_content_type: concept
type: table
weight: 3
layout: list
meta:
  title: Preview firewall rules
---

# Preview firewall rules

{{<content-column>}}

The expression of a firewall rule can become quite complex. In this situation, you should test your firewall rule before deploying it to ensure that the rule will behave as expected.

Rule Preview helps you understand the potential impact of a firewall rule, by testing the rule against a sample drawn from the last 72 hours of traffic. Rule Preview is built into the firewall rules Expression Editor so that you can test a rule as you edit it.

{{<Aside type="warning">}}

Rule Preview is only available to customers on an Enterprise plan.

{{</Aside>}}

## Test a firewall rule with Rule Preview

1. Locate the desired rule in the rules list and select **Edit** (wrench icon).
2. Select **Test rule** to trigger the test.

![The Test Rule button next to the Action drop-down list allows you to check the traffic that would be affected by the current firewall rule](/firewall/static/firewall-rules-preview-1.png)

The results of the test are displayed in a plot that simulates how many of the total requests in the last 72 hours would have matched the tested expression.

In this screenshot, a rule that matches all User-Agents that contain the string `Mozilla` would block about 8% of requests to the zone:

![Example chart of a rule preview operation, stating that about 8% of the zone requests would be blocked by the current rule](/firewall/static/cf-firewall-rules-preview-rule-plot-chart.png)

## Important notes

**Consider the results of Firewall Preview an _indication_ of traffic levels**, not an exact calculation. The sample rate can be as little as 1% of your total traffic.

**Rule Preview does not take into account other firewall rules** that you have already configured. In effect, Rule Preview tests a single firewall rule in isolation. Security events or any other rules with a higher priority that may have blocked or challenged a request are ignored.

**You cannot test firewall rules that reference [IP Lists](/fundamentals/global-configurations/lists/ip-lists/)**.

**Cloudflare does not store the entirety of requests, so only a limited number of fields are available to Rule Preview**. The table below lists the fields that Rule Preview supports (green cells), broken down by operator. Fields and operators that are not supported are not included in this table.

{{</content-column>}}

{{<table-wrap style="width:100%">}}

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
          <strong>AS Number</strong><br/>
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
          <strong>Country</strong><br/>
          <strong><code class="InlineCode">ip.geoip.country</code></strong>
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
          <strong>Hostname</strong><br/>
          <strong><code class="InlineCode">http.host</code></strong>
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
          <strong>IP Address</strong><br/>
          <strong><code class="InlineCode">ip.src</code></strong>
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
          <strong>Referer</strong><br/>
          <strong><code class="InlineCode">http.referer</code></strong>
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
          <strong>Request method</strong><br/>
          <strong><code class="InlineCode">http.request.method</code></strong>
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
          <strong>SSL</strong><br/>
          <strong><code class="InlineCode">ssl</code></strong>
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
          <strong>URI</strong><br/>
          <strong><code class="InlineCode">http.request.uri</code></strong>
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
          <strong>URI path</strong><br/>
          <strong><code class="InlineCode">http.request.uri.path</code></strong>
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
          <strong>URI query string</strong><br/>
          <strong><code class="InlineCode">http.request.uri.query</code></strong>
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
          <strong>User agent</strong><br/>
          <strong><code class="InlineCode">http.user_agent</code></strong>
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
{{</table-wrap>}}
