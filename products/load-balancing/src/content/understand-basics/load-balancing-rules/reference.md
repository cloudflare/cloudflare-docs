---
title: Supported fields and operators
order: 50
type: table
---

# Supported fields and operators

## Fields

<table style="width:100%">
  <thead>
    <tr>
      <th style="width:20%">Name in Expression Builder</th>
      <th style="width:30%">Field</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>HTTP version</td>
      <td valign="top"><code>http.request.version</code><br /><Type>Number</Type></td>
      <td>
        <p>Represents the version of the HTTP protocol used. Use this field when you require different checks for different versions.
        </p>
        <p>Example Values:
          <ul>
              <li><code class="InlineCode">HTTP/1.1</code></li>
              <li><code class="InlineCode">HTTP/3</code></li>
          </ul>
        </p>
      </td>
    </tr>
    <tr>
      <td>IP address</td>
      <td valign="top"><code>ip.src</code><br /><Type>IP&nbsp;address</Type></td>
      <td>
         <p>Represents the client TCP IP address, which may be adjusted to reflect the actual address of the client by using, for example, HTTP headers such as
         <code class="InlineCode">X-Forwarded-For</code> or <code class="InlineCode">X-Real-IP</code>.
         </p>
         <p>Example value:
         <br /><code class="InlineCode">93.184.216.34</code>
         </p>
      </td>
    </tr>
    <tr>
      <td>URI</td>
      <td valign="top"><code>http.request.uri</code><br /><Type>String</Type></td>
      <td>
        <p>Represents the absolute URI of the request.</p>
        <p>Example value:
        <br /><code class="InlineCode">/articles/index?section=539061&expand=comments</code>
        </p>
      </td>
    </tr>
    <tr>
      <td>URI path</td>
      <td valign="top"><code>http.request.uri.path</code><br /><Type>String</Type></td>
      <td>
        <p>Represents the URI path of the request.</p>
        <p>Example value:<br />
        <code class="InlineCode">/articles/index</code>
        </p>
      </td>
    </tr>
    <tr>
      <td>URI query string</td>
      <td valign="top"><code class>http.request.uri.query</code><br /><Type>String</Type></td>
      <td>
        <p>Represents the entire query string, without the <code class="InlineCode">?</code> delimiter.
        </p>
        <p>Example value:
        <br /><code class="InlineCode">section=539061&expand=comments</code>
        </p>
      </td>
    </tr>
  </tbody>
</table>

## Operators

### Comparison operators

<TableWrap style='width:100%'>
  <table style='width:100%'>
    <thead>
    <tr>
        <th>Name</th>
        <th>Operator Notation</th>
        <th colspan="3" style="text-align:center">Supported Data Types</th>
        <th>Example (operator in bold)</th>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <th>String</th>
        <th>IP</th>
        <th>Rules list</th>
        <th></th>
    </tr>
    </thead>
    <tbody>
      <tr>
        <td>Equal</td>
        <td><code class="InlineCode">eq</code></td>
        <td>&#x2705;</td>
        <td>&#x2705;</td>
        <td>&#x2705;</td>
        <td>
          <code class="InlineCode">http.request.uri.path <strong>eq</strong> "/articles/2008/"</code>
        </td>
      </tr>
      <tr>
        <td>Not equal</td>
        <td><code class="InlineCode">ne</code></td>
        <td>&#x2705;</td>
        <td>&#x2705;</td>
        <td>&#x2705;</td>
        <td>
          <code class="InlineCode">ip.src <strong>ne</strong> 93.184.216.0</code>
        </td>
      </tr>
      <tr>
        <td>Exactly<br />contains</td>
        <td><code class="InlineCode">contains</code></td>
        <td>&#x2705;</td>
        <td>&#10060;</td>
        <td>&#10060;</td>
        <td>
          <code class="InlineCode">http.request.uri.path <strong>contains</strong> "/articles/"</code>
        </td>
      </tr>
      <tr>
        <td>Matches<br />RE2 regex</td>
        <td><code class="InlineCode">matches</code></td>
        <td>&#x2705;</td>
        <td>&#10060;</td>
        <td>&#10060;</td>
        <td>
          <code class="InlineCode">http.request.uri.path <strong>matches</strong> "^/articles/200[7-8]/$"</code>
        </td>
      </tr>
      <tr>
        <td>Value is in <br />a set of values</td>
        <td><code class="InlineCode">in</code></td>
        <td>&#x2705;</td>
        <td>&#x2705;</td>
        <td>&#x2705;</td>
        <td>
          <code class="InlineCode">ip.src <strong>in</strong> {'{ 93.184.216.0 93.184.216.1 }'}</code>
        </td>
      </tr>
    </tbody>
  </table>
</TableWrap>

