---
title: Functions
pcx-content-type: reference
weight: 7
meta:
  title: Functions reference
---

# Functions reference

The Cloudflare Rules language provides functions for manipulating and validating values in an expression:

- [Transformation functions](#transformation-functions) manipulate values extracted from an HTTP request.
- The [HMAC validation function](#hmac-validation) tests the validity of an HMAC token. Use it to write expressions that target requests based on the presence of a valid HMAC token.

## Transformation functions

The Rules language supports several functions that transform values extracted from HTTP requests. A common use case for transformation functions is the conversion of a string of characters to uppercase or lowercase, since by default, string evaluation is case sensitive.

For example, the `lower()` function converts all uppercase characters in a string to lowercase.

In the expression below, the`lower()` function transforms `http.host` values to lowercase so that they match the target value `"www.cloudflare.com"`:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sql" language="sql"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">lower</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-plain">http</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">host</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;www.cloudflare.com&quot;</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Transformation functions that do not take arrays as an argument type require the `[*]` special index notation. Refer to [Arrays](/ruleset-engine/rules-language/values/#arrays) for more information.

The Rules language supports these transformation functions:

{{<definitions>}}

- <code>any({{<type>}}Array{{</type>}}\<{{<param-type>}}Boolean{{</param-type>}}\>)</code> {{<type>}}Boolean{{</type>}}

  - Returns <code>true</code> when the comparison operator in the argument returns `true` for <em>any</em> of the values in the argument array. Returns <code>false</code> otherwise.

  - <em>Example:</em>
    <br />

    <code class="InlineCode" style="width:100%">
      any(url_decode(http.request.body.form.values[*])[*] contains "an xss attack")
    </code>

- <code>all({{<type>}}Array{{</type>}}\<{{<param-type>}}Boolean{{</param-type>}}\>)</code> {{<type>}}Boolean{{</type>}}

  - Returns <code>true</code> when the comparison operator in the argument returns `true` for <em>all</em> values in the argument array. Returns <code>false</code> otherwise.

  - <em>Example:</em>
    <br />

    `all(http.request.headers['content-type'][*] == "application/json")`

- <code>concat({{<type>}}String | Integer | bytes | Array elements{{</type>}})</code> {{<type>}}String{{</type>}}

  - Takes a comma-separated list of values. Concatenates the argument values into a single String.

  - <em>Example:</em>
    <br />

    `concat("String1"," ","String",2) == "String1 String2"`

- <code>ends\_with(source{{<param-type>}}String{{</param-type>}}, substring{{<param-type>}}String{{</param-type>}})</code> {{<type>}}Boolean{{</type>}}

  - Returns `true` when the source ends with a given substring. Returns `false` otherwise. The source cannot be a literal value (for example, `"foo"`).

  - *Example:*<br />
    If `http.request.uri.path` is `"/welcome.html"`, then `ends_with(http.request.uri.path, ".html")` will return `true`.

{{<Aside type="warning">}}
The `ends_with()` function is not available in [Firewall Rules](/firewall/).
{{</Aside>}}

- <code>len({{<type>}}String | bytes{{</type>}})</code> {{<type>}}Integer{{</type>}}

  - Returns the byte length of a String or Bytes field.

  - <em>Example:</em>
    <br />

    `len(http.host)`

- <code>lower({{<type>}}String{{</type>}})</code> {{<type>}}String{{</type>}}

  - Converts a string field to lowercase. Only uppercase ASCII bytes are converted. All other bytes are unaffected.

  - <em>Example:</em>
    <br />

    `lower(http.host) == "www.cloudflare.com"`

- <code>regex\_replace(source{{<param-type>}}String{{</param-type>}}, regular\_expression{{<param-type>}}String{{</param-type>}}, replacement{{<param-type>}}String{{</param-type>}})</code> {{<type>}}String{{</type>}}

    - Replaces a part of a source string matched by a regular expression with a replacement string, returning the result. The replacement string can contain references to regular expression capture groups.

    - *Examples:*

      Literal match replace:<br />
      `regex_replace("/foo/bar", "/bar$", "/baz") == "/foo/baz"`

      If there is no match, the input string does not change:<br />
      `regex_replace("/x", "^/y$", "/mumble") == "/x"`

      Match is case sensitive by default:<br />
      `regex_replace("/foo", "^/FOO$", "/x") == "/foo"`

      When there are multiple matches, only one replacement occurs (the first one):<br />
      `regex_replace("/a/a", "/a", "/b") == "/b/a"`

      Escape a `$` in the replacement string by prefixing it with another `$`:<br />
      `regex_replace("/b", "^/b$", "/b$$") == "/b$"`

      Replace with capture groups:<br />
      `regex_replace("/foo/a/path", "^/foo/([^/]*)/(.*)$", "/bar/${2}/${1}") == "/bar/path/a/"`

{{<Aside type="warning">}}
You can only use the `regex_replace()` function in [rewrite expressions of Transform Rules](/rules/transform/). Additionally, the first argument must be a field under `http.request.headers` or `http.request.uri`.
{{</Aside>}}

- <code>remove\_bytes({{<type>}}bytes{{</type>}})</code> {{<type>}}bytes{{</type>}}

  - Returns a new byte array with all the occurrences of the given bytes removed.

  - <em>Example:</em>
    <br />

    `remove_bytes(http.host, "\x2e\x77") == "cloudflarecom"`

- <code>starts\_with(source{{<param-type>}}String{{</param-type>}}, substring{{<param-type>}}String{{</param-type>}})</code> {{<type>}}Boolean{{</type>}}

  - Returns `true` when the source starts with a given substring. Returns `false` otherwise. The source cannot be a literal value (for example, `"foo"`).

  - *Example:*<br />
    If `http.request.uri.path` is `"/blog/first-post"`, then `starts_with(http.request.uri.path, "/blog")` will return `true`.

{{<Aside type="warning">}}
The `starts_with()` function is not available in [Firewall Rules](/firewall/).
{{</Aside>}}

- <code>to\_string({{<type>}}Integer | Boolean | IP address{{</type>}})</code> {{<type>}}String{{</type>}}

  - Returns the string representation of an Integer, Boolean, or IP address value.

  - *Examples:*
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">to_string(cf.bot_management.score) == '5'</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">to_string(ssl) == 'true'</span></div></span></span></span></code></pre>{{</raw>}}

{{<Aside type="warning">}}
You can only use the `to_string()` function in [rewrite expressions of Transform Rules](/rules/transform/).
{{</Aside>}}

- <code>upper({{<type>}}String{{</type>}})</code> {{<type>}}String{{</type>}}

  - Converts a string field to uppercase. Only lowercase ASCII bytes are converted. All other bytes are unaffected.

  - <em>Example:</em>
    <br />

    <code>upper(http.host) == "WWW.CLOUDFLARE.COM"</code>

- <code>url\_decode({{<type>}}String{{</type>}})</code> {{<type>}}String{{</type>}}

  - Decodes a URL formatted string, as in the following:

    - — <code>%20</code> and <code>+</code> decode to space characters <code> </code>

    - — <code>%E4%BD</code> decodes to <code>ä½ </code>

  - <em>Example:</em>
    <br />
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">any(url_decode(http.request.body.form.values[*])[*] contains &quot;an xss attack&quot;)</span></div></span></span></span></code></pre>{{</raw>}}

{{</definitions>}}

## Magic Firewall Functions

- <code>bit\_slice({{<type>}}String{{</type>}}, {{<type>}}Number{{</type>}}, {{<type>}}Number{{</type>}})</code> {{<type>}}Number{{</type>}}

  - Select a slice of contiguous bits from a string field. This is primarily intended for use with <code>ip</code> and <code>tcp</code>.
  - The slice can be no longer than 31 bits, but multiple calls can be joined together via a logical expression.
  - Use of structure fields is preferred over this mechanism.

## HMAC validation

{{<Aside type="warning" header="Important">}}

Access to the HMAC validation function requires a Cloudflare Pro, Business, or Enterprise plan.

{{</Aside>}}

### Overview

You can validate hash-based message authentication code (HMAC) tokens in a rule expression by using the `is_timed_hmac_valid_v0()` function, which has this signature:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-java" language="java"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">is_timed_hmac_valid_v0</span><span class="CodeBlock--token-punctuation">(</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-generics CodeBlock--token-punctuation">&lt</span><span class="CodeBlock--token-generics CodeBlock--token-class-name">String</span><span class="CodeBlock--token-generics"> literal as </span><span class="CodeBlock--token-generics CodeBlock--token-class-name">Key</span><span class="CodeBlock--token-generics CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-generics CodeBlock--token-punctuation">&lt</span><span class="CodeBlock--token-generics CodeBlock--token-class-name">String</span><span class="CodeBlock--token-generics"> field as </span><span class="CodeBlock--token-generics CodeBlock--token-class-name">MessageMAC</span><span class="CodeBlock--token-generics CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-generics CodeBlock--token-punctuation">&lt</span><span class="CodeBlock--token-generics CodeBlock--token-class-name">Integer</span><span class="CodeBlock--token-generics"> literal as ttl</span><span class="CodeBlock--token-generics CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-generics CodeBlock--token-punctuation">&lt</span><span class="CodeBlock--token-generics CodeBlock--token-class-name">Integer</span><span class="CodeBlock--token-generics"> as currentTimeStamp</span><span class="CodeBlock--token-generics CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-operator">&lt</span><span class="CodeBlock--token-class-name">Optional</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-class-name">Integer</span><span class="CodeBlock--token-plain"> literal as lengthOfSeparator</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-keyword">default</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-number">0</span><span class="CodeBlock--token-operator">&gt</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-generics CodeBlock--token-punctuation">&lt</span><span class="CodeBlock--token-generics CodeBlock--token-class-name">Optional</span><span class="CodeBlock--token-generics"> </span><span class="CodeBlock--token-generics CodeBlock--token-class-name">String</span><span class="CodeBlock--token-generics"> literal as flags</span><span class="CodeBlock--token-generics CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-operator">-&gt</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-generics CodeBlock--token-punctuation">&lt</span><span class="CodeBlock--token-generics CodeBlock--token-class-name">Bool</span><span class="CodeBlock--token-generics"> as result</span><span class="CodeBlock--token-generics CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

The `is_timed_hmac_valid_v0()` function has these parameter definitions:

{{<definitions>}}

- _Key_ {{<type>}}String literal{{</type>}}

  - Specifies the secret cryptographic key for validating the HMAC.

- _MessageMAC_ {{<type>}}String{{</type>}}

  - Contains a concatenation of these HMAC elements: _message_, _separator_, _timestamp_, _mac_. For a definition and an example, refer to [MessageMAC](#messagemac).

- _ttl_ {{<type>}}Integer literal{{</type>}}

  - Defines the time-to-live for the HMAC token, expressed in seconds. Determines how long the token is valid, relative to the time it was issued.

- _currentTimeStamp_ {{<type>}}Integer{{</type>}}

  - Represents the Unix timestamp when Cloudflare received the request, expressed in seconds. Pass the `http.request.timestamp.sec` field as an approximate value to this argument.

- _lengthOfSeparator_ {{<type>}}Integer literal{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Specifies the length of the _separator_ between the _timestamp_ and the _message_ in the _MessageMAC_. Expressed in bytes, with a default value of 0.

- _flags_ {{<type>}}String literal{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - When you set this optional argument to `'s'`, the function expects the value of the base64-encoded _mac_ in the _MessageMAC_ argument to use the URL-safe character set with no padding.

  - When you do **not** set the value of _flags_ to `'s'`, you must URL encode the base64 value for _mac_ in the _MessageMAC_ argument.

{{</definitions>}}

### Usage

The `is_timed_hmac_valid_v0()` function uses the supplied _Key_ to generate a message authentication code (MAC) from the _message_ and the _timestamp_ regions of the MessageMAC. When the generated MAC matches the _mac_ region of the MessageMAC and the token has not expired, the HMAC is valid and the function returns `true`.

For example, the following expression matches requests to `download.example.com` that do not include valid HMAC tokens:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-java" language="java"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">http</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">host </span><span class="CodeBlock--token-operator">==</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;download.example.com&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">and not </span><span class="CodeBlock--token-function">is_timed_hmac_valid_v0</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-string">&quot;mysecretkey&quot;</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> http</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">request</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">uri</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-number">100000</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> http</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">request</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">timestamp</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">sec</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-number">8</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

For examples of rules that use HMAC validation, refer to [Firewall Rules: Common use cases](/firewall/recipes/).

### MessageMAC

A valid MessageMAC satisfies the regular expression
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-java" language="java"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">+</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">*</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-plain">\d</span><span class="CodeBlock--token-punctuation">{</span><span class="CodeBlock--token-number">10</span><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-operator">-</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-punctuation">{</span><span class="CodeBlock--token-number">43</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

and is composed of these parentheses-delimited expressions:

<table>
  <thead>
    <tr>
      <th>Expression</th>
      <th style="width:50%">Description</th>
      <th>Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td valign="top"><code>(.+)</code></td>
      <td>The <em>message</em> to validate.</td>
      <td valign="top"><nlineCode">/download/cat.jpg</code></td>
    </tr>
    <tr>
      <td valign="top"><code>(.*)</code></td>
      <td>The <em>separator</em> between message and timestamp, commonly a parameter name.</td>
      <td valign="top"><nlineCode">&verify=</code></td>
    </tr>
    <tr>
      <td valign="top"><code>(\d{10})</code></td>
      <td>The 10-digit Unix <em>timestamp</em> when the MAC was issued, expressed in seconds.</td>
      <td valign="top"><nlineCode">1484063137</code></td>
    </tr>
    <tr>
      <td valign="top"><code>(.{43,})</code></td>
      <td><p>A base64-encoded version of the <em>MAC</em>. When you do not set the value of the <em>urlSafe</em> argument in the HMAC validation function to <code>'s'</code>, you must URL encode the base64 value for <em>mac</em>.</p>
      <p>When the base64 MAC encoding is URL-safe, the value for <em>mac</em> contains 43 bytes. Otherwise, the value will be 44 bytes or more, because of URL encoding.</p></td>
      <td valign="top"><nlineCode">IaLGSmELTvlhfd0ItdN6PhhHTFhzx<br />73EX8uy%2FcSDiIU%3D</code></td>
    </tr>
  </tbody>
</table>

For details on generating a MessageMAC, refer to [Implement token creation](https://support.cloudflare.com/hc/articles/115001376488#6P9Gz7kmyxQrpL6r6iPKQR).

## HMAC validation examples

{{<Aside type="warning" header="Important">}}

When you do not use the optional _flags_ argument for `is_timed_hmac_valid_v0()`, you must URL encode the base64 value for _mac_ in the _MessageMAC_ argument.

For more information, refer to [HMAC Validation: Overview](#overview).

{{</Aside>}}

### Simple case

Consider the case where the MessageMAC is contained entirely within a single field, as in this example URI path:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-http" language="http"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">/download/cat.jpg?verify=1484063787-IaLGSmELTvlhfd0ItdN6PhhHTFhzx73EX8uy%2FcSDiIU%3D</span></div></span></span></span></code></pre>{{</raw>}}

Note how the URI maps to the elements of the MessageMAC:

- _message_: `/download/cat.jpg`
- _separator_: `?verify=`
- _timestamp_: `1484063787`
- _mac_: `IaLGSmELTvlhfd0ItdN6PhhHTFhzx73EX8uy%2FcSDiIU%3D`

When the MessageMAC is contained entirely within a single field such as `http.request.uri`, using the validation function is straightforward. Pass the name of the field to the _MessageMAC_ argument:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-java" language="java"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">is_timed_hmac_valid_v0</span><span class="CodeBlock--token-punctuation">(</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-string">&quot;mysecretkey&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  http</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">request</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">uri</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-number">100000</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  http</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">request</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">timestamp</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">sec</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-number">8</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

### Concatenated MessageMAC argument

To compose a MessageMAC from more than one field, use the `concat()` function.

This example constructs the MessageMAC by concatenating the request URI and two header fields:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-java" language="java"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">is_timed_hmac_valid_v0</span><span class="CodeBlock--token-punctuation">(</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-string">&quot;mysecretkey&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-function">concat</span><span class="CodeBlock--token-punctuation">(</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    http</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">request</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">uri</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    http</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">request</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">headers</span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-string">&quot;timestamp&quot;</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-number">0</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-string">&quot;-&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    http</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">request</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">headers</span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-string">&quot;mac&quot;</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-number">0</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-number">100000</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  http</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">request</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">timestamp</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">sec</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-number">0</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

For more on `concat()` usage, refer to [Transformation functions](#transformation-functions).
