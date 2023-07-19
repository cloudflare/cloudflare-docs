---
pcx_content_type: reference
title: Supported fields and operators
weight: 51
---

# Supported fields and operators

The fields available for load balancing rules depend on whether Cloudflare proxies the traffic going through your load balancer.

If you use the wrong set of fields, you might see unexpected behavior from load balancing rules. For best results, use the fields associated with your traffic's proxy status.

| Field Set | Section in Expression Builder | Description |
| --- | --- | --- |
| [Fields supported regardless of proxy](#fields-supported-regardless-of-proxy) | `BOTH` | The values that are always accessible regardless of whether the load balancer is proxied or not. |
| [Proxied-only fields](#proxied-only-fields) | `PROXIED ONLY` | The values accessible only when the load balancer's traffic is proxied. |
| [Unproxied-only fields](#unproxied-only-fields) | `NON-PROXIED ONLY` | The values accessible only when the load balancer's traffic is not proxied (DNS-only traffic). |

![Choose load balancer fields based on the proxy status header](/images/load-balancing/proxy-status.png)

For a step-by-step guide for creating a rule using the UI's Expression Builder, see [Create a load balancing rule](/load-balancing/additional-options/load-balancing-rules/create-rules/). Note that there are a few fields that are still API-only and not present in the UI.

## Fields supported regardless of proxy

Regardless of whether your traffic is proxied, you have access to the following fields:

<table style="width:100%">
  <thead>
    <tr>
      <th style="width:40%">Field</th>
      <th style="width:20%">Name in Expression Builder</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr id="field-cf-load-balancer-name">
      <td valign="top"><code>cf.load_balancer.name</code><br />{{<type>}}Bytes{{</type>}}</td>
      <td><code>Load Balancer Name</code></td>
      <td>
        <p>Represents the name of the load balancer executing these rules.</p>
         <p>Example value:
         <br /><code class="InlineCode">lb.example.com</code>
        </p>
      </td>
    </tr>
    <tr id="field-cf-load-balancer-region">
      <td valign="top"><code>cf.load_balancer.region</code><br />{{<type>}}Bytes{{</type>}}</td>
      <td><code>Load Balancer Region</code></td>
      <td>
        <p>Provides the <a href="/load-balancing/reference/region-mapping-api/#list-of-load-balancer-regions">region name</a> of the data center processing the request.</p>
         <p>Example value:
         <br /><code class="InlineCode">ENAM</code>
        </p>
      </td>
    </tr>
    <tr id="field-ip-src">
      <td valign="top"><code>ip.src</code><br />{{<type>}}IP&nbsp;address{{</type>}}</td>
      <td><code>IP Source Address</code></td>
      <td>
        <p>If proxied, this field provides the client TCP IP address, which may be adjusted to reflect the actual address of the client by using HTTP headers such as <code>X-Forwarded-For</code> or <code>X-Real-IP</code>.</p>
        <p>If unproxied (DNS-only), this field provides the ECS source address, if available. If not available, it provides the client resolver IP address.</p>
        <p><strong>Deprecation Warning:</strong> In the future, this field will always be set to the client resolver IP address for unproxied requests. To check for the presence of ECS and use the ECS IP, see the fields <a href="#field-dns-rr-opt-client"><code>dns.rr.opt.client</code></a> and <a href="#field-dns-rr-opt-client-addr"><code>dns.rr.opt.client.addr</code></a>, respectively.</p>
         <p>Example value:
         <br /><code class="InlineCode">1.2.3.4</code>
        </p>
      </td>
    </tr>
  </tbody>
</table>

## Proxied-only fields

If your traffic is proxied through Cloudflare, you have access to all the fields listed under [Fields supported regardless of proxy](#fields-supported-regardless-of-proxy) in addition to the following fields:

Many of these fields are referenced from the [Rules language documentation](/ruleset-engine/rules-language/fields/).

<table style="width:100%">
  <thead>
    <tr>
      <th style="width:40%">Field</th>
      <th style="width:20%">Name in Expression Builder</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr id="field-http-cookie">
      <td valign="top"><a href="/ruleset-engine/rules-language/fields/#field-http-cookie"><code>http.cookie</code></a><br />{{<type>}}String{{</type>}}</td>
      <td>(API-only)</td>
      <td>
        <p>Represents the entire cookie as a string.</p>
        <p>Example value:
        <br /><code class="InlineCode">session=8521F670545D7865F79C3D7BEDC29CCE;-background=light</code>
        </p>
      </td>
    </tr>
    <tr id="field-http-host">
      <td valign="top"><a href="/ruleset-engine/rules-language/fields/#field-http-host"><code>http.host</code></a><br />{{<type>}}String{{</type>}}</td>
      <td>(API-only)</td>
      <td>
        <p>Represents the hostname used in the full request URI.
        </p>
        <p>Example value:
        <br /><code class="InlineCode">www.example.org</code>
        </p>
      </td>
    </tr>
    <tr id="field-http-referer">
      <td valign="top"><a href="/ruleset-engine/rules-language/fields/#field-http-referer"><code>http.referer</code></a><br />{{<type>}}String{{</type>}}</td>
      <td>(API-only)</td>
      <td>
        <p>Represents the HTTP Referer request header, which contains the address of the web page that linked to the currently requested page.
        </p>
        <p>Example value:
        <br /><code class="InlineCode">Referer: htt&shy;ps://developer.example.org/en-US/docs/Web/JavaScript</code>
        </p>
      </td>
    </tr>
    <tr id="field-http-request-headers">
      <td valign="top"><a href="/ruleset-engine/rules-language/fields/#field-http-request-headers"><code>http.request.headers</code></a><br />{{<type>}}Map&lt;String&gt;&lt;Array&gt;{{</type>}}</td>
      <td><code>Header</code></td>
      <td>
        <p>Represents HTTP request headers as a Map (or associative array).</p>
        <p>The keys of the associative array are the names of HTTP request headers <strong>converted to lowercase</strong>.</p>
        <p>When there are repeating headers, the array includes them in the order they appear in the request.</p>
        <p><em><em>Decoding:</em></em> no decoding performed
        <br /><em>Whitespace:</em> preserved
        <br /><em>Non-ASCII:</em> preserved
        </p>
        <p>Example:
        <br /><code class="InlineCode">any(http.request.headers["content-type"][*] == "application/json")</code>
        </p>
        <p>Example value:
        <br /><code class="InlineCode">{"content-type": ["application/json"]}</code>
        </p>
      </td>
    </tr>
    <tr id="field-http-request-method">
      <td valign="top"><a href="/ruleset-engine/rules-language/fields/#field-http-request-method"><code>http.request.method</code></a><br />{{<type>}}String{{</type>}}</td>
      <td><code>Request Method</code></td>
      <td>
        <p>Represents the HTTP method, returned as a string of uppercase characters.
        </p>
        <p>Example value:
        <br /><code class="InlineCode">GET</code>
        </p>
      </td>
    </tr>
    <tr id="field-http-request-timestamp-sec">
      <td valign="top"><a href="/ruleset-engine/rules-language/fields/#field-http-request-timestamp-sec"><code>http.request.timestamp.sec</code></a><br />{{<type>}}Integer{{</type>}}</td>
      <td><code>Timestamp</code></td>
      <td>
        <p>Represents the timestamp when Cloudflare received the request, expressed as Unix time in seconds. This value is 10 digits long.
        </p>
        <p>Example value:
        <br /><code class="InlineCode">1484063137</code>
        </p>
      </td>
    </tr>
    <tr id="field-http-request-uri">
      <td valign="top"><a href="/ruleset-engine/rules-language/fields/#field-http-request-uri"><code>http.request.uri</code></a><br />{{<type>}}String{{</type>}}</td>
      <td><code>URI</code></td>
      <td>
        <p>Represents the URI path and query string of the request.
        </p>
        <p>Example value:
        <br /><code class="InlineCode">/articles/index?section=539061&expand=comments</code>
        </p>
      </td>
    </tr>
    <tr id="field-http-request-uri-args">
      <td valign="top"><a href="/ruleset-engine/rules-language/fields/#field-http-request-uri-args"><code>http.request.uri.args</code></a><br />{{<type>}}Map&lt;String&gt;&lt;Array&gt;{{</type>}}</td>
      <td>(API-only)</td>
      <td>
        <p>Represents the HTTP URI arguments associated with a request as a Map (associative array).
        </p>
        <p>When an argument repeats, then the array contains multiple items in the order they appear in the request.
        </p>
        <p>The values are not pre-processed and retain the original case used in the request.</p>
        <p><em>Decoding:</em> no decoding performed
        <br /><em>Non-ASCII:</em> preserved
        </p>
        <p>Example:
        <br /><code class="InlineCode">any(http.request.uri.args["search"][*] == "red+apples")</code>
        </p>
        <p>Example value:
        <br /><code class="InlineCode">{"search": ["red+apples"]}</code>
        </p>
      </td>
    </tr>
    <tr id="field-http-request-uri-args-names">
      <td valign="top"><a href="/ruleset-engine/rules-language/fields/#field-http-request-uri-args-names"><code>http.request.uri.args.names</code></a><br />{{<type>}}Array&lt;String>{{</type>}}</td>
      <td>(API-only)</td>
      <td>
        <p>Represents the names of the arguments in the HTTP URI query string. The names are not pre-processed and retain the original case used in the request.
        </p>
        <p>When a name repeats, the array contains multiple items in the order that they appear in the request.
        </p>
        <p><em>Decoding:</em> no decoding performed
        <br /><em>Non-ASCII:</em> preserved
        </p>
        <p>Example:
        <br /><code class="InlineCode">any(http.request.uri.args.names[*] == "search")</code>
        </p>
        <p>Example value:
        <br /><code class="InlineCode">["search"]</code>
        </p>
      </td>
    </tr>
    <tr id="field-http-request-uri-args-values">
      <td valign="top"><a href="/ruleset-engine/rules-language/fields/#field-http-request-uri-args-values"><code>http.request.uri.args.values</code></a><br />{{<type>}}Array&lt;String>{{</type>}}</td>
      <td>(API-only)</td>
      <td>
        <p>Represents the values of arguments in the HTTP URI query string. The values are not pre-processed and retain the original case used in the request. They are in the same order as in the request.
        </p>
        <p>Duplicated values are listed multiple times.
        </p>
        <p><em>Decoding:</em> no decoding performed
        <br /><em>Non-ASCII:</em> preserved
        </p>
        <p>Example:
        <br /><code class="InlineCode">any(http.request.uri.args.values[*] == "red+apples")</code>
        </p>
        <p>Example value:
        <br /><code class="InlineCode">["red+apples"]</code>
        </p>
      </td>
    </tr>
    <tr id="field-http-request-uri-path">
      <td valign="top"><a href="/ruleset-engine/rules-language/fields/#field-http-request-uri-path"><code>http.request.uri.path</code></a><br />{{<type>}}String{{</type>}}</td>
      <td><code>URI Path</code></td>
      <td>
        <p>Represents the URI path of the request.
        </p>
        <p>Example value:
        <br /><code class="InlineCode">/articles/index</code>
        </p>
      </td>
    </tr>
    <tr id="field-http-request-uri-query">
      <td valign="top"><a href="/ruleset-engine/rules-language/fields/#field-http-request-uri-query"><code>http.request.uri.query</code></a><br />{{<type>}}String{{</type>}}</td>
      <td><code>URI Query</code></td>
      <td>
        <p>Represents the entire query string, without the <code class="InlineCode">?</code> delimiter.
        </p>
        <p>Example value:
        <br /><code class="InlineCode">section=539061&expand=comments</code>
        </p>
      </td>
    </tr>
    <tr id="field-http-request-version">
      <td valign="top"><a href="/ruleset-engine/rules-language/fields/#field-http-request-version"><code>http.request.version</code></a><br />{{<type>}}String{{</type>}}</td>
      <td><code>HTTP Version</code></td>
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
  </tbody>
</table>

## Unproxied-only fields

If your traffic is not proxied through Cloudflare, you have access to all the fields listed under [Fields supported regardless of proxy](#fields-supported-regardless-of-proxy) in addition to the following fields:

<table style="width:100%">
  <thead>
    <tr>
      <th style="width:40%">Field</th>
      <th style="width:20%">Name in Expression Builder</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr id="field-dns-qry-name">
      <td valign="top"><code>dns.qry.name</code><br />{{<type>}}Bytes{{</type>}}</td>
      <td><code>Query Name</code></td>
      <td>
        <p>Represents the query name asked.</p>
         <p>Example value:
         <br /><code class="InlineCode">example.com.</code>
         </p>
      </td>
    </tr>
    <tr id="field-dns-qry-name-len">
      <td valign="top"><code class>dns.qry.name.len</code><br />{{<type>}}Integer{{</type>}}</td>
      <td><code>Query Name Length</code></td>
      <td>
        <p>Represents the length in bytes of the query name.
        </p>
         <p>Example value:
         <br /><code class="InlineCode">123</code>
         </p>
      </td>
    </tr>
    <tr id="field-dns-qry-qu">
      <td valign="top"><code>dns.qry.qu</code><br />{{<type>}}Boolean{{</type>}}</td>
      <td><code>Question</code></td>
      <td>
        <p>When <code>true</code>, this field indicates that the received DNS message was a question.</p>
      </td>
    </tr>
    <tr id="field-dns-qry-type">
      <td valign="top"><code>dns.qry.type</code><br />{{<type>}}Integer{{</type>}}</td>
      <td><code>Query Type</code></td>
      <td>
        <p>Represents the numeric value of the <a href= "https://en.wikipedia.org/wiki/List_of_DNS_record_types">DNS query type</a>.
        </p>
        <p>Example Values:</p>
          <ul>
              <li><code class="InlineCode">1</code>&nbsp;(A record)</li>
              <li><code class="InlineCode">28</code>&nbsp;(AAAA record)</li>
          </ul>
      </td>
    </tr>
    <tr id="field-dns-rr-opt-client">
      <td valign="top"><code class>dns.rr.opt.client</code><br />{{<type>}}Boolean{{</type>}}</td>
       <td>(API-only)</td>
      <td>
        <p>When <code>true</code>, this field indicates that the EDNS Client Subnet (ECS) address was sent with the DNS request.
        </p>
      </td>
    </tr>
    <tr id="field-dns-rr-opt-client-addr">
      <td valign="top"><code class>dns.rr.opt.client.addr</code><br />{{<type>}}String{{</type>}}</td>
      <td>(API-only)</td>
      <td>
        <p>If present, this field represents the ECS address sent with the DNS request.
        </p>
         <p>Example value:
         <br /><code class="InlineCode">1.2.3.0</code>
         </p>
      </td>
    </tr>
  </tbody>
</table>

## Operators and grouping symbols

- **Comparison operators** specify how values defined in an expression must relate to the actual HTTP request value for the expression to return true.

- **Logical operators** combine two expressions to form a compound expression and use order of precedence to determine how an expression is evaluated.

- **Grouping symbols** allow you to organize expressions, enforce operator precedence, and nest expressions.

For examples and usage, refer to [Operators and grouping symbols](/ruleset-engine/rules-language/operators/) in the Rules language documentation.
