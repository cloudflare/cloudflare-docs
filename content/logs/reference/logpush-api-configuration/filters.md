---
pcx-content-type: how-to
title: Filters
weight: 40
---

# Filters

The following table represents the comparison operators that are supported and example values. Filters are added as escaped JSON strings formatted as `{\"key\":\"<field>\",\"operator\":\"<comparison_operator>\",\"value\":\"<value>\"}`.

- Fields specify properties associated with an event.

- Comparison operators define how values must relate to actual request data for an expression to return true.

- Values represent the data associated with fields. When evaluating a rule, Cloudflare compares these values with the actual data obtained from the request.

Filters can be connected using `AND`, `OR` logical operators.

{{<table-wrap style="width:100%">}}

<table style='width:100%'>
  <thead>
   <tr>
      <th>Name</th>
      <th colspan="2" style="text-align:center">Operator Notation</th>
      <th colspan="3" style="text-align:center">Supported Data Types</th>
      <th></th>
   </tr>
   <tr>
      <td></td>
      <th>English</th>
      <th>C-like</th>
      <th>String</th>
      <th>Int</th>
      <th>Bool</th>
      <th>Array</th>
      <th>Object</th>
      <th>Example (operator in bold)</th>
   </tr>
  </thead>
  <tbody>
    <tr>
      <td>Equal</td>
      <td><code class="InlineCode">eq</code></td>
      <td><code class="InlineCode">==</code></td>
      <td>&#x2705;</td>
      <td>&#x2705;</td>
      <td>&#x2705;</td>
      <td>&#10060;</td>
      <td>&#10060;</td>
      <td>
         <code class="InlineCode">{\"key\":\"ClientRequestHost\",\"operator\":\"<strong>eq</strong>\",\"value\":\"theburritobot.com\"}</code>
      </td>
     </tr>
    <tr>
      <td>Not equal</td>
      <td><code class="InlineCode">!eq</code></td>
      <td><code class="InlineCode">!=</code></td>
      <td>&#x2705;</td>
      <td>&#x2705;</td>
      <td>&#x2705;</td>
      <td>&#10060;</td>
      <td>&#10060;</td>
      <td>
         <code class="InlineCode">{\"key\":\"ClientCountry\",\"operator\":\"<strong>!eq</strong>\",\"value\":\"ca\"}</code>
      </td>
    </tr>
    <tr>
      <td>Less than</td>
      <td><code class="InlineCode">lt</code></td>
      <td><code class="InlineCode">&lt;</code></td>
      <td>&#10060;</td>
      <td>&#x2705;</td>
      <td>&#10060;</td>
      <td>&#10060;</td>
      <td>&#10060;</td>
      <td>
         <code class="InlineCode">{\"key\":\"BotScore\",\"operator\":\"<strong>lt</strong>\",\"value\":\"30\"}</code>
      </td>
   </tr>
   <tr>
      <td>Less than<br />or equal</td>
      <td><code class="InlineCode">lte</code></td>
      <td><code class="InlineCode">&lt;=</code></td>
      <td>&#10060;</td>
      <td>&#x2705;</td>
      <td>&#10060;</td>
      <td>&#10060;</td>
      <td>&#10060;</td>
      <td>
         <code class="InlineCode">{\"key\":\"BotScore\",\"operator\":\"<strong>lte</strong>\",\"value\":\"30\"}</code>
      </td>
    </tr>
    <tr>
      <td>Greater than</td>
      <td><code class="InlineCode">gt</code></td>
      <td><code class="InlineCode">></code></td>
      <td>&#10060;</td>
      <td>&#x2705;</td>
      <td>&#10060;</td>
      <td>&#10060;</td>
      <td>&#10060;</td>
      <td>
         <code class="InlineCode">{\"key\":\"BotScore\",\"operator\":\"<strong>gt</strong>\",\"value\":\"30\"}</code>
      </td>
    </tr>
    <tr>
      <td>Greater than<br />or equal</td>
      <td><code class="InlineCode">gte</code></td>
      <td><code class="InlineCode">&gt;=</code></td>
      <td>&#10060;</td>
      <td>&#x2705;</td>
      <td>&#10060;</td>
      <td>&#10060;</td>
      <td>&#10060;</td>
      <td>
         <code class="InlineCode">{\"key\":\"BotScore\",\"operator\":\"<strong>gte</strong>\",\"value\":\"30\"}</code>
      </td>
    </tr>
    <tr>
      <td>Starts<br />with</td>
      <td><code class="InlineCode">startsWith</code></td>
      <td><code class="InlineCode"></code></td>
      <td>&#x2705;</td>
      <td>&#10060;</td>
      <td>&#10060;</td>
      <td>&#10060;</td>
      <td>&#10060;</td>
      <td>
         <code class="InlineCode">{\"key\":\"ClientRequestPath\",\"operator\":\"<strong>startsWith</strong>\",\"value\":\"/foo\"}</code>
      </td>
    </tr>
    <tr>
      <td>Ends<br />with</td>
      <td><code class="InlineCode">endsWith</code></td>
      <td><code class="InlineCode"></code></td>
      <td>&#x2705;</td>
      <td>&#10060;</td>
      <td>&#10060;</td>
      <td>&#10060;</td>
      <td>&#10060;</td>
      <td>
         <code class="InlineCode">{\"key\":\"ClientRequestPath\",\"operator\":\"<strong>endsWith</strong>\",\"value\":\"/foo\"}</code>
      </td>
    </tr>
    <tr>
      <td>Does not<br />start with</td>
      <td><code class="InlineCode">!startsWith</code></td>
      <td><code class="InlineCode"></code></td>
      <td>&#x2705;</td>
      <td>&#10060;</td>
      <td>&#10060;</td>
      <td>&#10060;</td>
      <td>&#10060;</td>
      <td>
         <code class="InlineCode">{\"key\":\"ClientRequestPath\",\"operator\":\"<strong>!startsWith</strong>\",\"value\":\"/foo\"}</code>
      </td>
    </tr>
    <tr>
      <td>Does not<br />end with</td>
      <td><code class="InlineCode">!endsWith</code></td>
      <td><code class="InlineCode"></code></td>
      <td>&#x2705;</td>
      <td>&#10060;</td>
      <td>&#10060;</td>
      <td>&#10060;</td>
      <td>&#10060;</td>
      <td>
         <code class="InlineCode">{\"key\":\"ClientRequestPath\",\"operator\":\"<strong>!endsWith</strong>\",\"value\":\"/foo\"}</code>
      </td>
    </tr>
    <tr>
      <td>Contains</td>
      <td><code class="InlineCode">contains</code></td>
      <td><code class="InlineCode">~</code></td>
      <td>&#x2705;</td>
      <td>&#10060;</td>
      <td>&#10060;</td>
      <td>&#x2705;</td>
      <td>&#10060;</td>
      <td>
         <code class="InlineCode">{\"key\":\"ClientRequestPath\",\"operator\":\"<strong>contains</strong>\",\"value\":\"/static\"}</code>
      </td>
    </tr>
    <tr>
      <td>Does not<br />contain</td>
      <td><code class="InlineCode">!contains</code></td>
      <td><code class="InlineCode"></code></td>
      <td>&#x2705;</td>
      <td>&#10060;</td>
      <td>&#10060;</td>
      <td>&#x2705;</td>
      <td>&#10060;</td>
      <td>
         <code class="InlineCode">{\"key\":\"ClientRequestPath\",\"operator\":\"<strong>!contains</strong>\",\"value\":\"/static\"}</code>
      </td>
    </tr>
    <tr>
      <td>Value is in<br />a set of values</td>
      <td><code class="InlineCode">in</code></td>
      <td><code class="InlineCode"></code></td>
      <td>&#x2705;</td>
      <td>&#x2705;</td>
      <td>&#10060;</td>
      <td>&#x2705;</td>
      <td>&#10060;</td>
      <td>
         <code class="InlineCode">{\"key\":\"EdgeResponseStatus\",\"operator\":\"<strong>in</strong>\",\"value\":[200,201]}</code>
      </td>
    </tr>
    <tr>
      <td>Value is not<br />in a set of values</td>
      <td><code class="InlineCode">!in</code></td>
      <td><code class="InlineCode"></code></td>
      <td>&#x2705;</td>
      <td>&#x2705;</td>
      <td>&#10060;</td>
      <td>&#x2705;</td>
      <td>&#10060;</td>
      <td>
         <code class="InlineCode">{\"key\":\"EdgeResponseStatus\",\"operator\":\"<strong>!in</strong>\",\"value\":[200,201]}</code>
      </td>
    </tr>
  </tbody>
</table>
{{</table-wrap>}}

The filter field has limits of approximately 30 operators and 1000 bytes. Anything exceeding this value will return an error.

{{<Aside type="note" header="Note">}}
We do not support filtering on the following data types: objects, array[int], array[object].
{{</Aside>}}

For the Firewall events dataset, we do not support filtering on the following fields: Kind, MatchIndex, Metadata, OriginatorRayID, RuleID, Source.

For the Gateway HTTP dataset, we do not support filtering on the following fields: Downloaded File Names, Uploaded File Names.