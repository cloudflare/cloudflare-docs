---
order: 640
---

# Functions

The Cloudflare Firewall Rules language provides functions for manipulating and validating values in an expression:

- [Transformation functions](#transformation-functions) manipulate values extracted from an HTTP request.
- The [HMAC Validation function](#hmac-validation) tests the validity of an HMAC token. Use it to write expressions that target requests based on the presence of a valid HMAC token.

## Transformation functions

The Cloudflare Firewall Rules language supports several functions that transform values extracted from HTTP requests. A common use case for transformation functions is the conversion of a string of characters to uppercase or lowercase, since by default, string evaluation is case sensitive.

For example, the `lower()` function converts all uppercase characters in a string to lowercase.

In the expression below, the`lower()` function transforms `http.host` values to lowercase so that they match the target value `"www.cloudflare.com"`:

```sql
lower(http.host) == "www.cloudflare.com"
```

Transformation functions that take arrays as an argument type require the `[*]` index operator, which returns an array of values for each field.

The Cloudflare Firewall Rules language supports these transformation functions:

<Definitions>

- <code>any(<Type>Array</Type>{'<'}<ParamType>Boolean</ParamType>{'>'})</code> <Type>Boolean</Type>

  - Returns <code class="InlineCode">true</code> when the comparison operator in the argument returns `true` for <em>any</em> of the values in the argument array. Returns <code class="InlineCode">false</code> otherwise.
  
  - <em>Example:</em><br />

    <code class='InlineCode' style='width:100%'>
    any(url_decode(http.request.body.form.values[*])[*] contains "an xss attack")
    </code>

- <code>any(<Type>Array</Type>{'<'}<ParamType>Boolean</ParamType>{'>'})</code> <Type>Boolean</Type>

  - Returns <code class="InlineCode">true</code> when the comparison operator in the argument returns `true` for <em>all</em> of the values in the argument array. Returns <code class="InlineCode">false</code> otherwise.

  - <em>Example:</em><br />

    <code class="InlineCode">all(http.request.headers['content-type'][*] == "application/json")</code>

- <code>concat(<Type>String | Integer | bytes | Array elements</Type>)</code> <Type>String</Type>

  - Takes a comma-separated list of values. Concatenates the argument values into a single String.

  - <em>Example:</em><br />

    <code class="InlineCode">concat("String1"," ","String",2) == "String1 String2"</code>

- <code>len(<Type>String | bytes</Type>)</code> <Type>Integer</Type>

  - Returns the byte length of a String or Bytes field.

  - <em>Example:</em><br />

    <code class="InlineCode">len(http.host)</code>

- <code>lower(<Type>String</Type>)</code> <Type>String</Type>

  - Converts a string field to lowercase. Only uppercase ASCII bytes are converted. All other bytes are unaffected.

  - <em>Example:</em><br />

    <code class="InlineCode">lower(http.host) == "www.cloudflare.com"</code>

- <code>upper(<Type>String</Type>)</code> <Type>String</Type>

  - Converts a string field to uppercase. Only uppercase ASCII bytes are converted. All other bytes are unaffected.

  - <em>Example:</em><br />

    <code class="InlineCode">upper(http.host) == "WWW.CLOUDFLARE.COM"</code>

- <code>url_decode(<Type>String</Type>)</code> <Type>String</Type>

  - Decodes a URL formatted string, as in the following:

    - <code class="InlineCode">%20</code> and <code class="InlineCode">+</code> decode to space characters <code class="InlineCode"> </code>

    - <code class="InlineCode">%E4%BD</code> decodes to  <code class="InlineCode">ä½ </code>

  - <em>Example:</em><br />

    <code class="InlineCode">any(url_decode(http.request.body.form.values[*])[*] contains "an xss attack")</code>

</Definitions>

## Magic Firewall Functions

- <code>bit_slice(<Type>String</Type>, <Type>Number</Type>, <Type>Number</Type>)</code> <Type>Number</Type>

  - Select a slice of contiguous bits from a string field.  This is primarily intended for use with <code class="InlineCode">ip</code> and <code class="InlineCode">tcp</code>.
  - The slice can be no longer than 31 bits, but multiple calls can be joined together via a logical expression.
  - Use of structure fields is preferred over this mechanism. 

## HMAC validation

<Aside type='warning' header='Important'>

Access to the HMAC validation function requires a Cloudflare Pro, Business, or Enterprise plan.

</Aside>

### Overview

You can validate hash-based message authentication code (HMAC) tokens in a Firewall Rules expression by using the `is_timed_hmac_valid_v0()` function, which has this signature:

```java
is_timed_hmac_valid_v0(
   <String literal as Key>,
   <String field as MessageMAC>,
   <Integer literal as ttl>,
   <Integer as currentTimeStamp>,
   <Optional Integer literal as lengthOfSeperator, default: 0>,
   <Optional String literal as flags>
) -> <Bool as result>
```

The `is_timed_hmac_valid_v0()` function has these parameter definitions:

<Definitions>

- _Key_ <Type>String literal</Type>

  - Specifies the secret cryptographic key for validating the HMAC.

- _MessageMAC_ <Type>String</Type>

  - Contains a concatenation of these HMAC elements: _message_, _separator_, _timestamp_, _mac_. For a definition and an example, see [_MessageMAC_](#messagemac).

- _ttl_ <Type>Integer literal</Type>

  - Defines the time-to-live for the HMAC token, expressed in seconds. Determines how long the token is valid, relative to the time it was issued.

- _currentTimeStamp_ <Type>Integer</Type>

  - Represents the Unix timestamp when Cloudflare received the request, expressed in seconds. Pass the `http.request.timestamp.sec` field as an approximate value to this argument.

- _lengthOfSeparator_ <Type>Integer literal</Type> <PropMeta>optional</PropMeta>

  - Specifies the length of the _separator_ between the _timestamp_ and the _message_ in the _MessageMAC_. Expressed in bytes, with a default value of 0.

- _flags_ <Type>String literal</Type> <PropMeta>optional</PropMeta>

  -  When you set this optional argument to `` `s` ``, the function expects the value of the base64-encoded _mac_ in the _MessageMAC_ argument to use the URL-safe character set with no padding.

  -  When you do **not** set the value of _flags_ to `'s'`, you must URL encode the base64 value for _mac_ in the _MessageMAC_ argument.

</Definitions>

### Usage

The `is_timed_hmac_valid_v0()` function uses the supplied _Key_ to generate a message authentication code (MAC) from the _message_ and the _timestamp_ regions of the MessageMAC. When the generated MAC matches the _mac_ region of the MessageMAC and the token has not expired, the HMAC is valid and the function returns `true`.

For example, the following expression matches requests to `download.example.com` that do not include valid HMAC tokens:

```java
http.host = "download.example.com"
AND not is_timed_hmac_valid_v0("mysecretkey", http.request.uri, 100000, http.request.timestamp.sec, 8)
```

To review examples of firewall rules that use HMAC validation, see [_Common use cases_](/recipes/).

### MessageMAC

A valid MessageMAC satisfies the regular expression

```java
(.+)(.*)(\d{10})-(.{43,})
```

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
      <td>The <em>message</em> to validate</td>
      <td valign="top"><code class="InlineCode">/download/cat.jpg</code></td>
    </tr>
    <tr>
      <td valign="top"><code>(.*)</code></td>
      <td>The <em>separator</em> between message and timestamp, commonly a parameter name</td>
      <td valign="top"><code class="InlineCode">&verify=</code></td>
    </tr>
    <tr>
      <td valign="top"><code>(\d{'{10}'})</code></td>
      <td>The 10-digit Unix <em>timestamp</em> when the MAC was issued, expressed in seconds</td>
      <td valign="top"><code class="InlineCode">1484063137</code></td>
    </tr>
    <tr>
      <td valign="top"><code>(.{'{43,}'})</code></td>
      <td><p>A base64-encoded version of the <em>MAC</em>. When you do not set the value of the <em>urlSafe</em> argument in the HMAC validation function to <code class="InlineCode">s</code>, you must URL encode the base64 value for <em>mac</em>.</p>
      <p>When the base64 MAC encoding is URL-safe, the value for <em>mac</em>contains 43 bytes. Otherwise, the value will be 44 bytes or more, because of URL encoding.</p></td>
      <td valign="top"><code class="InlineCode">IaLGSmELTvlhfd0ItdN6PhhHTFhzx<br />73EX8uy%2FcSDiIU%3D</code></td>
    </tr>
  </tbody>
</table>

For details on generating a MessageMAC, see [_Implement token creation_](https://support.cloudflare.com/hc/en-us/articles/115001376488-Configuring-Token-Authentication#6P9Gz7kmyxQrpL6r6iPKQR)

## HMAC validation examples

<Aside type='warning' header='Important'>

When you do not use the optional _flags_ argument for `_is_timed_hmac_valid()`, you must URL encode the base64 value for _mac_ in the _MessageMAC_ argument.

For more, see [HMAC Validation: Overview](#overview).

</Aside>

#### Simple case

Consider the case where the MessageMAC is contained entirely within a single field, as in this example URI path:

```http
/download/cat.jpg?verify=1484063787-IaLGSmELTvlhfd0ItdN6PhhHTFhzx73EX8uy%2FcSDiIU%3D
```

Note how the URI maps to the elements of the MessageMac:

- _message_: `/download/cat.jpg`
- _separator_: `?verify=`
- _timestamp_: `1484063787`
- _mac_: `IaLGSmELTvlhfd0ItdN6PhhHTFhzx73EX8uy%2FcSDiIU%3D`

When the MessageMac is contained entirely within a single field such as `http.request.uri`, using the validation function is straightforward. Simply pass the name of the field to the _MessageMAC_ argument:

```java
is_timed_hmac_valid_v0(
    "mysecretkey",
    http.request.uri,
    100000,
    http.request.timestamp.sec,
    8
)
```

#### Concatenated MessageMAC argument

To compose a MessageMAC from more than one field, use the `concat()` function.

This example constructs the MessageMAC by concatenating the request URI and two header fields:

```java
is_timed_hmac_valid_v0(
    "mysecretkey",
    concat(
        http.request.uri,
        http.request.headers["timestamp"][0],
        "-",
        http.request.headers["MAC"]),
    100000,
    http.request.timestamp.sec,
    0
)
```

For more on `concat()` usage, see [_Transformation functions_](#transformation-functions).
