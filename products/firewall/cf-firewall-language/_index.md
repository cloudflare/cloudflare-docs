---
title: Firewall Rules language
alwaysopen: true
weight: 150
---

### Fields

When an HTTP request reaches Cloudflare’s edge, we create a table of field–value pairs against which to match expressions. This table exists for as long as the current request is being processed.

Field values come from a variety of sources:

- **Primitive properties** obtained directly from the request (`http.request.uri.path`, for example).
- **Derived values** resulting from a transformation, composition, or basic operation. For example, the transformation `lower(http.request.uri.patch)` converts the value of `http.request.uri.path` to lowercase.
- **Computed values** that are the product of a lookup, computation, or other intelligence. For example, Cloudflare uses a machine learning process to dynamically calculate threat scores, represented by the `cf.threat_score`field.

#### Standard fields

Standard fields generally adopt the naming convention of the analogous [Wireshark display fields](https://www.wireshark.org/docs/wsug_html_chunked/ChWorkBuildDisplayFilterSection.html); however, there are some subtle differences:

- Wireshark supports [CIDR (Classless Inter-Domain Routing) notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) for expressing IP address ranges in equality comparisons (`ip.src == 1.2.3.0/24`, for example); Cloudflare does not. Use the `in` comparison operator to evaluate a range of addresses using CIDR notation. <br />Example:<br />`ip.src in {1.2.3.0/24 4.5.6.0/24}`.
- In Wireshark, `ssl` is a protocol field containing hundreds of other fields of various types that are available for comparison in multiple ways. However, in Firewall Rules `ssl` is a single boolean field that indicates whether the connection from the client to Cloudflare is encrypted.
- Cloudflare does not support the `slice` operator.

These are the standard fields supported by Firewall Rules:

<table>
<thead>
    <tr>
      <td><strong>Field Name</strong></td>
      <td><strong>Type</strong></td>
      <td colspan="2"><strong>Description</strong></td>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td valign="top">http.cookie</td>
      <td valign="top">String</td>
      <td colspan="2">Entire cookie as a string Example value:
      <code>session=8521F670545D7865F79C3D7BEDC29CCE;-background=light</code></td>
    </tr>
    <tr>
      <td valign="top">http.host</td>
      <td valign="top">String</td>
      <td colspan="2">The host name used in the full request URI Example value:
      <code>www.example.org</code></td>
    </tr>
    <tr>
      <td valign="top">http.referer</td>
      <td valign="top">String</td>
      <td colspan="2">The HTTP referer header Example value: <code>Referer:
      https://developer.example.org/en-US/docs/Web/JavaScript</code></td>
    </tr>
    <tr>
      <td valign="top">http.request.full_uri</td>
      <td valign="top">String</td>
      <td colspan="2">The full URI as received by the web server (does not include
      <code>#fragment</code>, which is not sent to web servers) Example value:
      <code>htt&shy;ps://www.example.org/articles/index?section=539061&amp;expand=comments</code></td>
    </tr>
    <tr>
      <td valign="top">http.request.method</td>
      <td valign="top">String</td>
      <td colspan="2">The HTTP method, in uppercase Example value: <code>GET</code></td>
    </tr>
    <tr>
      <td valign="top">http.request.uri</td>
      <td valign="top">String</td>
      <td colspan="2">The absolute URI of the request Example value:
      <code>/articles/index?section=539061&amp;expand=comments</code></td>
    </tr>
    <tr>
      <td valign="top">http.request.uri.path</td>
      <td valign="top">String</td>
      <td colspan="2">The path of the request Example value: <code>/articles/index</code></td>
    </tr>
    <tr>
      <td valign="top">http.request.uri.query</td>
      <td valign="top">String</td>
      <td colspan="2">The whole query string, minus the <code>?</code> delimiter Example
      value: <code>section=539061&amp;expand=comments</code></td>
    </tr>
    <tr>
      <td valign="top">http.user_agent</td>
      <td valign="top">String</td>
      <td colspan="2">The HTTP user agent Example value: <code>Mozilla/5.0 (X11; Linux
      x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36
      </code></td>
    </tr>
    <tr>
      <td valign="top">http.request.version</td>
      <td valign="top">Number</td>
      <td colspan="2">
        The version of the protocol used for the request
        <p>This can be useful when different checks are required for different versions
        of the protocol. Example Values: - <code>HTTP/1.1</code> - <code>HTTP/3</code></p>
      </td>
    </tr>
    <tr>
      <td valign="top">http.x_forwarded_for</td>
      <td valign="top">String</td>
      <td colspan="2">The full X-Forwarded-For HTTP header Example value:
      <code>X-Forwarded-For: 203.0.113.195, 70.41.3.18</code></td>
    </tr>
    <tr>
      <td valign="top">ip.src</td>
      <td valign="top">IP Address</td>
      <td colspan="2">The client TCP IP address, which may be adjusted to reflect the
      real client IP of the original client as applicable (i.e. using HTTP headers like
      <code>X-Forwarded-For</code> or <code>X-Real-IP</code>) Example value:
      <code>93.184.216.34</code></td>
    </tr>
    <tr>
      <td valign="top">ip.geoip.asnum</td>
      <td valign="top">Number</td>
      <td colspan="2">The 16- or 32-bit integer representing the Autonomous System (AS)
      number associated with the request</td>
    </tr>
    <tr>
      <td valign="top">ip.geoip.continent</td>
      <td valign="top">String</td>
      <td colspan="2">
        The continent code for this location Possible codes are:
        <ul>
          <li>AF &#8211; Africa</li>
          <li>AN &#8211; Antarctica</li>
          <li>AS &#8211; Asia</li>
          <li>EU &#8211; Europe</li>
          <li>NA &#8211; North America</li>
          <li>OC &#8211; Oceania</li>
          <li>SA &#8211; South America</li>
          <li>T1 &#8211; Tor network</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td valign="top">ip.geoip.country</td>
      <td valign="top">String</td>
      <td colspan="2">The 2-letter country code in <a href=
      "https://www.iso.org/obp/ui/#search/code/">ISO 3166-1 Alpha 2</a> format. Example
      value: <code>GB</code></td>
    </tr>
    <tr>
      <td valign="top">ip.geoip.subdivision_1_iso_code</td>
      <td valign="top">String</td>
      <td colspan="2">The ISO 3166-2 code for the first level region associated with the
      IP address. If the actual value is not available, this field will contain an empty
      string. Example value: <code>GB-ENG</code></td>
    </tr>
    <tr>
      <td valign="top">ip.geoip.subdivision_2_iso_code</td>
      <td valign="top">String</td>
      <td colspan="2">The ISO 3166-2 code for the second level region associated with the
      IP address. If the actual value is not available, this field will contain an empty
      string. Example value: <code>GB-SWK</code></td>
    </tr>
    <tr>
      <td valign="top">Ip.geoip.is_in_european_union</td>
      <td valign="top">Boolean</td>
      <td colspan="2"><code>True</code> when the request originates from an EU
      country</td>
    </tr>
    <tr>
      <td valign="top">ssl</td>
      <td valign="top">Boolean</td>
      <td colspan="2"><code>True</code> when the HTTP connection to the client is
      encrypted</td>
    </tr>
    </tbody>
  </table>

#### Argument and value fields for URIs

The following fields represent the URI arguments and values associated with an HTTP request. Many of these fields return arrays containing the respective values.

<table>
<thead>
    <tr>
      <td><strong>Field Name</strong></td>
      <td><strong>Type</strong></td>
      <td colspan="2"><strong>Description</strong></td>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td valign="top">http.request.uri.args</td>
      <td valign="top">Map &lt;Array&gt; &lt;String&gt;</td>
      <td colspan="2">
        HTTP URI arguments represented in a map (or associative array)
        <p>If an argument is repeated, then the array will contain multiple items in the
        order they appear in the request. Values are not pre-processed and retain the
        case used in the request.</p>
        <p>Decoding: no decoding Non-ascii: preserved</p>
        <p>Example:
        <code>any(http.request.uri.args["search"][*] == "red+apples")</code></p>
        <p>Example value:
        <code>{'{"search": ["red+apples"]}'}</code></p>
      </td>
    </tr>
    <tr>
      <td valign="top">http.request.uri.args. names</td>
      <td valign="top">Array &lt;String&gt;</td>
      <td colspan="2">
        Names of arguments in the HTTP URI query string
        <p>Names are not pre-processed and retain the case used in the request.</p>
        <p>If a name is repeated, then the array will contain multiple items in the order
        they appear in the request. Decoding: no decoding is performed Non-ascii:
        preserved</p>
        <p>Example:
        <code>any(http.request.uri.args.names[*] == "search")</code></p>
        <p>Example value:
        <code>["search"]</code></p>
      </td>
    </tr>
    <tr>
      <td valign="top">http.request.uri.args. values</td>
      <td valign="top">Array &lt;String&gt;</td>
      <td colspan="2">
        Values of arguments in the HTTP URI query string
        <p>Values are not pre-processed and retain the case used in the request. They are
        in the same order as in the request. Duplicated values are listed multiple times.
        Decoding: no decoding Non-ascii: preserved</p>
        <p>Example:
        <code>any(http.request.uri.args.values[*] == "red+apples")</code></p>
        <p>Example value:
        <code>["red+apples"]</code></p>
      </td>
    </tr>
    </tbody>
  </table>



#### Header fields

The following fields represent the header for an HTTP request. These fields return arrays containing the respective values.

<table>
<thead>
    <tr>
      <td><strong>Field Name</strong></td>
      <td><strong>Type</strong></td>
      <td colspan="2"><strong>Description</strong></td>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td valign="top">http.request.headers</td>
      <td valign="top">Map &lt;Array&gt; &lt;String&gt;</td>
      <td colspan="2">
        <p>HTTP request headers represented in a map (or associative array). If headers
        are repeated, then the array will contain multiple items in the order they appear
        in the request. The keys will be converted to lowercase. Decoding: no decoding
        Whitespace: preserved Non-ascii: preserved</p>
        <p>Example:
        <code>any(http.request.headers["content-type"][*] ==
        "application/json")</code></p>
        <p>Example value:
        <code>{'{ "content-type": ["application/json"] }'}</code></p>
      </td>
    </tr>
    <tr>
      <td valign="top">http.request.headers. names</td>
      <td valign="top">Array &lt;String&gt;</td>
      <td colspan="2">
        Names of headers in the HTTP request.
        <p>The names are not pre-processed and retain the case used in the request. The
        order of header names is not guaranteed but will match
        <code>http.request.headers. values</code>. Duplicate headers are listed multiple
        times. Decoding: no decoding Whitespace: preserved Non-ascii: preserved</p>
        <p>Example:
        <code>any(http.request.headers.names[*] == "content-type")</code></p>
        <p>Example value:
        <code>["content-type"]</code></p>
      </td>
    </tr>
    <tr>
      <td valign="top">http.request.headers.values</td>
      <td valign="top">&lt;Array&gt; &lt;String&gt;</td>
      <td colspan="2">
        <p>Values of headers in the HTTP request. Values are not pre-processed and retain
        the case used in the request. The order of header values is not guaranteed but
        will match <code>http.request.headers. names</code>. Duplicate headers are listed
        multiple times. Decoding: no decoding Whitespace: preserved Non-ascii:
        preserved</p>
        <p>Example:
        <code>any(http.request.headers.values[*] == "application/json")</code></p>
        <p>Example value:
        <code>["application/json"]</code></p>
      </td>
    </tr>
    <tr>
      <td valign="top">http.request.headers. truncated</td>
      <td valign="top">Boolean</td>
      <td colspan="2">
        Returns <code>true</code> when HTTP request contained too many headers;
        otherwise, returns <code>false</code>.
        <p>If <code>true,</code> <code>http.request.headers</code>,
        <code>http.request.headers.names</code>, and
        <code>http.request.headers.values</code> may not contain all of the headers sent
        in the HTTP request.</p>
      </td>
    </tr>
    </tbody>
  </table>



#### Body fields (Enterprise plans only)

The following fields represent the body for an HTTP request. These fields return arrays containing the respective values. Body fields are only available to Enterprise plans.

<table>
<thead>
    <tr>
      <td><strong>Field Name</strong></td>
      <td><strong>Type</strong></td>
      <td colspan="2"><strong>Description</strong></td>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td valign="top">http.request.body. raw</td>
      <td valign="top">String</td>
      <td colspan="2">
        String representing the unaltered HTTP request body.
        <p>The return value may be truncated if the value of
        <code>http.request.body.truncated</code> is <code>true</code>.</p>
        <p>Decoding: no decoding
        Whitespace: preserved
        Non-ascii: preserved</p>
      </td>
    </tr>
    <tr>
      <td valign="top">http.request.body.truncated</td>
      <td valign="top">Boolean</td>
      <td colspan="2">
        Returns <code>true</code> if the HTTP request body was too long; otherwise,
        returns <code>false</code>.
        <p>When true, <code>http.request.body.\*</code> fields may not contain all of the
        HTTP request body.</p>
      </td>
    </tr>
    <tr>
      <td valign="top">http.request.body.form</td>
      <td valign="top">Map &lt;Array&gt;&lt;String&gt;</td>
      <td colspan="2">
        <p>HTTP body represented in a map (or associative array). Populated if the
        Content-Type header is <code>application/x-www-form- urlencoded</code>. The
        values are not pre-processed and retain the case used in the request. If a field
        is repeated, then the array will contain multiple items in the order they are in
        the request. The return value may be truncated if
        <code>http.request.body.truncated</code> is <code>true</code>.</p>
        <p>Decoding: no decoding
        Whitespace: preserved
        Non-ascii: preserved</p>
        <p>Example:
        <code>any(http.request.body.form["username"][*] == "admin")</code></p>
        <p>Example value:
        <code>{'{ "username": ["admin"] }'}</code></p>
      </td>
    </tr>
    <tr>
      <td valign="top">http.request.body. form.names</td>
      <td valign="top">Array &lt;String&gt;</td>
      <td colspan="2">
        Names of form fields in the HTTP request
        <p>Names are not pre-processed and retain the case found in the request. They are
        listed in the same order as in the request. Duplicate names are listed multiple
        times. The return value may be truncated if
        <code>http.request.body.truncated</code> is <code>true</code>.</p>
        <p>Decoding: no decoding
        Whitespace: preserved
        Non-ascii: preserved</p>
        <p>Example:
        <code>any(http.request.body.form.names[*] == "username")</code></p>
        <p>Example value:
        <code>["username"]</code></p>
      </td>
    </tr>
    <tr>
      <td valign="top">http.request.body. form.values</td>
      <td valign="top">Array &lt;String&gt;</td>
      <td colspan="2">
        <p>Values of form fields in the HTTP request. The values are not pre-processed
        and retain the case used in the request. They are in the same order as in the
        request. Duplicated values are listed multiple times. The return value may be
        truncated if <code>http.request.body.truncated</code> is <code>true</code>.</p>
        <p>Decoding: no decoding
        Whitespace: preserved
        Non-ascii: preserved</p>
        <p>Example:
        <code>any(http.request.body.form.values[*] == "admin")</code></p>
        <p>Example value:
        <code>["admin"]</code></p>
      </td>
    </tr>
    </tbody>
  </table>


#### Dynamic fields

In addition to the standard fields outlined above, Cloudflare supports the following dynamic fields, representing intelligence about the potential threat posed by the request:

<table>
<thead>
    <tr>
      <td><strong>Field Name</strong></td>
      <td><strong>Type</strong></td>
      <td colspan="2"><strong>Description</strong></td>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td valign="top">cf.bot_management.verified_bot (Enterprise plans only)</td>
      <td valign="top">Boolean</td>
      <td colspan="2">When this field is <code>true</code>, Cloudflare has determined the
      request originates from a known bot or crawler, regardless of good or bad
      intent.</td>
    </tr>
    <tr>
      <td valign="top">cf.threat_score</td>
      <td valign="top">Number</td>
      <td colspan="2">
        <p>Represents a Cloudflare threat score from 0&#8211;100, where 0 indicates low
        risk. Values above 10 may represent spammers or bots, and values above 40
        identify bad actors on the internet. It is rare to see values above 60. A common
        recommendation is to challenge requests with a score above 10 and to block those
        above 50.</p>
      </td>
    </tr>
    <tr>
      <td valign="top">cf.edge.server_port</td>
      <td valign="top">Number</td>
      <td colspan="2">This is the port number at which Cloudflare's network received the
      request. Useful for specifying traffic on a specific port. The value is a port
      number in the range <em>1-65535.</em></td>
    </tr>
    <tr>
      <td valign="top">cf.client.bot</td>
      <td valign="top">Boolean</td>
      <td colspan="2">Identifies whether a client is a known good bot. When traffic comes
      from a good bot, cf.client.bot is set to true.</td>
    </tr>
    <tr>
      <td valign="top">cf.worker.upstream_zone</td>
      <td valign="top">String</td>
      <td colspan="2">Identifies whether a request comes from a worker or not. If a request comes from a worker this field will hold the name the zone for this worker. Otherwise cf.worker.upstream_zone will be empty</td>
    </tr>
    </tbody>
  </table>

---

### Operators

#### Comparison operators

This table lists supported comparison operators. Since some operators only support specific data types, the list is broken down by data type.

<table>
<thead>
    <tr>
      <td colspan="7"><strong>Comparison Operators Supported in Firewall
      Rules</strong></td>
    </tr>
    <tr>
      <td></td>
      <td colspan="2"><strong>Operator Notation</strong></td>
      <td colspan="3"><strong>Data Types Supported</strong></td>
      <td rowspan="2"><strong>Example (operator in bold)</strong></td>
    </tr>
    <tr>
      <td></td>
      <td><strong>English</strong></td>
      <td><strong>C-like</strong></td>
      <td><strong>String</strong></td>
      <td><strong>IP</strong></td>
      <td><strong>Number</strong></td>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td><strong>Equal</strong></td>
      <td><code>eq</code></td>
      <td><code>==</code></td>
      <td>&#10004;</td>
      <td>&#10004;</td>
      <td>&#10004;</td>
      <td><code>http.request.uri.path <strong>eq</strong> "/articles/2008/"</code></td>
    </tr>
    <tr>
      <td><strong>Not equal</strong></td>
      <td><code>ne</code></td>
      <td><code>!=</code></td>
      <td>&#10004;</td>
      <td>&#10004;</td>
      <td>&#10004;</td>
      <td><code>ip.src <strong>ne</strong> 93.184.216.0</code></td>
    </tr>
    <tr>
      <td><strong>Less than</strong></td>
      <td><code>lt</code></td>
      <td><code>&lt;
      </code></td>
      <td>&#10004;</td>
      <td>&#10060;</td>
      <td>&#10004;</td>
      <td><code>cf.threat_score <strong>lt</strong> 10</code></td>
    </tr>
    <tr>
      <td><strong>Less than or equal</strong></td>
      <td><code>le</code></td>
      <td><code>&lt;=</code></td>
      <td>&#10004;</td>
      <td>&#10060;</td>
      <td>&#10004;</td>
      <td><code>cf.threat_score <strong>le</strong> 20</code></td>
    </tr>
    <tr>
      <td><strong>Greater than</strong></td>
      <td><code>gt</code></td>
      <td><code>&gt;</code></td>
      <td>&#10004;</td>
      <td>&#10060;</td>
      <td>&#10004;</td>
      <td><code>cf.threat_score <strong>gt</strong> 25</code></td>
    </tr>
    <tr>
      <td><strong>Greater than or equal</strong></td>
      <td><code>ge</code></td>
      <td><code>&gt;=</code></td>
      <td>&#10004;</td>
      <td>&#10060;</td>
      <td>&#10004;</td>
      <td><code>cf.threat_score <strong>ge</strong> 60</code></td>
    </tr>
    <tr>
      <td><strong>Exactly contains</strong></td>
      <td><code>contains</code></td>
      <td></td>
      <td>&#10004;</td>
      <td>&#10060;</td>
      <td>&#10060;</td>
      <td><code>http.request.uri.path <strong>contains</strong> "/articles/"</code></td>
    </tr>
    <tr>
      <td><strong>Matches Google re2 regular expression</strong></td>
      <td><code>matches</code></td>
      <td><code>~</code></td>
      <td>&#10004;</td>
      <td>&#10060;</td>
      <td>&#10060;</td>
      <td><code>http.request.uri.path <strong>matches</strong>
      "^/articles/200[7-8]/$"</code></td>
    </tr>
    <tr>
      <td><strong>Value is in set of values</strong></td>
      <td><code>in</code></td>
      <td></td>
      <td>&#10004;</td>
      <td>&#10004;</td>
      <td>&#10004;</td>
      <td><code>ip.src <strong>in</strong> {'{ 93.184.216.0 93.184.216.1 }'}</code></td>
    </tr>
    </tbody>
  </table>


#### Logical operators

Firewall Rules supports the following logical operators:

<table>
<thead>
    <tr>
      <td colspan="5"><strong>Logical Operators Supported in Firewall Rules</strong></td>
    </tr>
    <tr>
      <td></td>
      <td>
        <strong>English</strong>
        <p><strong>Notation</strong></p>
      </td>
      <td>
        <strong>C-like</strong>
        <p><strong>Notation</strong></p>
      </td>
      <td><strong>Example (operator in bold)</strong></td>
      <td><strong>Order of Precedence</strong></td>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td><strong>Logical NOT</strong></td>
      <td><code>not</code></td>
      <td><code>!</code></td>
      <td><code><strong>not</strong> ( http.host eq "www.cloudflare.com" and ip.src in
      93.184.216.0/24 )</code></td>
      <td>1</td>
    </tr>
    <tr>
      <td><strong>Logical AND</strong></td>
      <td><code>and</code></td>
      <td><code>&amp;&amp;</code></td>
      <td><code>http.host eq "www.cloudflare.com" <strong>and</strong> ip.src in
      93.184.216.0/24</code></td>
      <td>2</td>
    </tr>
    <tr>
      <td><strong>Logical XOR (Exclusive OR)</strong></td>
      <td><code>xor</code></td>
      <td><code>^^</code></td>
      <td><code>http.host eq "www.cloudflare.com" <strong>xor</strong> ip.src in
      93.184.216.0/24</code></td>
      <td>3</td>
    </tr>
    <tr>
      <td><strong>Logical OR</strong></td>
      <td><code>or</code></td>
      <td><code>||</code></td>
      <td><code>http.host eq "www.cloudflare.com" <strong>or</strong> ip.src in
      93.184.216.0/24</code></td>
      <td>4</td>
    </tr>
    </tbody>
  </table>

#### Order of evaluation and precedence for logical operators

Note in the above table that each logical operator is associated with an **order of precedence**, which determines the order in which the operators are evaluated. When writing compound expressions, it is important to be aware of the precedence of logical operators so that your expression is evaluated the way you expect.

For example, consider the following generic expression (operators are in bold for clarity):

<code>Expression1 <strong>and</strong> Expression2 <strong>or</strong> Expression3</code>

Without precedence, this compound expression is ambiguous – it’s not clear which of the two interpretations is correct:

1. Match when Expression 1 and Expression 2 are both true or when Expression 3 is true.
2. Match when Expression 1 is true and either Expression 2 or Expression 3 is true.

However, since the logical `AND` operator has precedence over logical `OR`, we know the `AND` operator must be evaluated first. Thus, Interpretation 1 is correct.

---

### Grouping symbols

An advantage of the Expression Editor is that it supports **parentheses** as grouping symbols, so you can explicitly group expressions that should be evaluated together:

    (Expression1 and Expression2) or Expression3

In this case, the addition of parentheses does not change how the compound expression is evaluated; it simply reinforces what we established earlier with operator precedence. However, because parentheses unambiguously call out which logical operators to evaluate first, you are less likely to make errors if you use them when writing your own compound expressions.

You can also use parentheses to \_force \_the order of evaluation. Consider the following example, which forces the logical `OR` operator to be evaluated before the logical `AND`:

    Expression1 and (Expression2 or Expression3)

Without parentheses, the logical `AND` operator would take precedence.

You can nest expressions grouped by parentheses inside other groups to create very precise but complex expressions, such as in this example for a rule designed to block access to a domain (parentheses and logical operators in bold):

```bash
(
 (http.host eq "api.example.com" and http.request.uri.path eq "/api/v2/auth") or
 (http.host matches "^(www|store|blog)\.example.com" and http.request.uri.path contains "wp-login.php") or 
 ip.geoip.country in {"CN" "TH" "US" "ID" "KR" "MY" "IT" "SG" "GB"} or 
 ip.geoip.asnum in {12345 54321 11111}
) and not ip.src in {11.22.33.0/24}
```

Note that when evaluating the precedence of logical operators, parentheses inside strings are ignored, such as those in the following regular expression, drawn from the example above:

```bash
"^(www|store|blog)\.example\.com"
```

Grouping expressions to force precedence is an extremely powerful tool. Currently, only the Expression Editor and the Cloudflare API support this feature; the Expression Builder does not.

---

### Values

#### Working with String values

**Evaluation of expressions using String values is case-sensitive**, so you may need to write more than one simple expression to capture variants. Cloudflare Business and Enterprise customers can use the _matches_ operator with a [Google RE2 regular expression](https://support.google.com/a/answer/1371417?hl=en) to capture multiple variations of a string pattern with a single expression.

#### Escaping characters in values

**You must manually escape the backslash (\\) and double quote (") characters with a backslash when using them as part of a literal value in an expression**. You can automatically escape these characters in the Expression Builder, which prepends a backslash so that `\` and `"` become`\\` and `\"`, respectively.

The following image highlights how double quotes used in a literal value are automatically escaped to `\"` in the Expression Builder:

![](../images/firewall-rules-language1.png)

In the **Expression Preview**, note the double quotes that delimit the string value itself. The first and last quotes in <code>"token-type=\"JWT\"")</code> are not escaped, because they are not part of the literal value.

#### Working with boolean values

**Simple expressions using boolean fields do not require any operator notation**, and they do not require a value. Simply asserting the field on its own is sufficient, as in the following `ssl` example:

`ssl`

Yes, this is a valid simple expression that matches requests where the value of the `ssl` field is `true`.

Use the boolean `not` operator to match requests where `ssl` is `false`:

`not ssl`

#### Transformation functions

The Firewall Rules Language supports a number of functions that transform values extracted from HTTP requests. For example, the `lower()` function takes a string as an argument and converts all uppercase characters to lowercase. In the expression below, the`lower()` function is used to transform `http.host` values to lowercase so that they can be compared to the target value `"www.cloudflare.com"`.

`lower(http.host) == "www.cloudflare.com"`

This example illustrates a common use case for transformation functions – creating case-insensitive expressions. The use of the transformation function effectively overrides Firewall Rules’ otherwise case-sensitive evaluation of strings.

##### Supported transformation functions

Firewall Rules supports the following transformation functions.

<table>
<thead>
  <tr>
   <td><strong>Name</strong>
   </td>
   <td><strong>Argument Type</strong>
   </td>
   <td><strong>Return Type</strong>
   </td>
   <td colspan="2" ><strong>Notes</strong>
   </td>
  </tr>
  </thead>
  <tbody>
  <tr>
   <td valign="top"> <code>any()</code>
   </td>
   <td valign="top"> Array
&lt;Boolean>
   </td>
   <td valign="top"> Boolean
   </td>
   <td colspan="2" ><p>Uses the <code>[*]</code> array operator, which takes each value in the array field and returns an array of those values.

The <code>any()</code> function returns <code>true</code> if the comparison operator in the argument returns <code>true</code> for <strong><em>any</em></strong> of the values in the array. Returns <code>false</code> otherwise.
</p>
Example:<br />
<code>any(http.request.headers.values[*] contains "foo") </code>

   </td>
  </tr>
  <tr>
   <td valign="top"> <code>all()</code>
   </td>
   <td valign="top"> Array
&lt;Boolean>
   </td>
   <td valign="top"> Boolean
   </td>
   <td colspan="2" ><p>Uses the <code>[*]</code> array operator, which takes each value in the array field and returns an array of those values.

The<code> all()</code> function returns <code>true</code> if the comparison operator in the argument returns <code>true</code> for <strong><em>all</em></strong> of the values in the array. Returns <code>false</code> otherwise.
</p>
Example:<br />

<code>all(http.request.
Headers['content-type'][*] == "application/json")</code>

   </td>
  </tr>
  <tr>
   <td valign="top"> <code>len()</code>
   </td>
   <td valign="top"> String,
Bytes
   </td>
   <td valign="top"> int
   </td>
   <td colspan="2" ><p>Returns the byte length of a String or Bytes field.
</p>
Example:<br />
<code>len(http.host)</code>

   </td>
  </tr>
  <tr>
   <td valign="top"><code>lower()</code>
   </td>
   <td valign="top"> String
   </td>
   <td valign="top"> String
   </td>
   <td colspan="2" ><p>Converts a string field to lowercase. Only uppercase ASCII bytes are converted; all other bytes are unaffected.
</p>
Example:<br />
<code>lower(http.host) == "www.cloudflare.com"</code>

   </td>
  </tr>
  <tr>
   <td valign="top"> <code>upper()</code>
   </td>
   <td valign="top"> String
   </td>
   <td valign="top"> String
   </td>
   <td colspan="2" ><p>Converts a string field to uppercase. Only lowercase ASCII bytes are converted; all other bytes are unaffected.
</p>
Example:<br />
<code>upper(http.host) == "WWW.CLOUDFLARE.COM"</code>

   </td>
  </tr>
  <tr>
   <td valign="top"> <code>url_decode()</code>
   </td>
   <td valign="top"> String
   </td>
   <td valign="top"> String
   </td>
   <td colspan="2" ><p>Decodes a URL formatted string.For example:
<ul>
<li><code>'%20</code>' and <code>'+'</code>decode  to <code>''</code> (space characters)</li>
<li><code>'%E4%BD%A0'</code> decodes to  <code>'你'</code>
</li>
</ul>
</p>
Example:<br />
<pre>
<code>any(url_decode(http.request.body.form.values[*])[*] contains "an xss attack")</code></pre>
   </td>
  </tr>
  </tbody>
</table>
