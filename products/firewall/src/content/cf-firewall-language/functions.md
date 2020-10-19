---
order: 640
---

# Functions

The Cloudflare Firewall Rules language provides functions for manipulating and validating values in an expression:

- [Transformation functions](#transformation-functions) manipulate values extracted from an HTTP request.
- The [HMAC Validation function](#hmac-validation) tests the validity of an HMAC token. Use it write expressions that target requests based on the presence of a valid HMAC token.

## Transformation functions

The Cloudflare Firewall Rules language supports several functions that transform values extracted from HTTP requests. A common use case for transformation functions is the conversion of a string of characters to uppercase or lowercase, since by default, string evaluation is case sensitive.

For example, the `lower()` function converts all uppercase characters in a string to lowercase.

In the expression below, the`lower()` function transforms `http.host` values to lowercase so that they match the target value `"www.cloudflare.com"`:

```sql
lower(http.host) == "www.cloudflare.com"
```

Transformation functions that take arrays as an argument type require the `[*]` index operator, which returns an array of values for each field.

The Cloudflare Firewall Rules language supports these transformation functions:

<TableWrap>
  <table style="width: 100%;">
  <thead>
    <tr>
      <td>
         <strong>Name</strong>
      </td>
      <td>
         <strong>Argument Type</strong>
      </td>
      <td>
         <strong>Return Type</strong>
      </td>
      <td colspan="2" >
         <strong>Notes</strong>
      </td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
         <code>any()</code>
      </td>
      <td>
         Array&lt;Boolean&gt;
      </td>
      <td>
         Boolean
      </td>
      <td colspan="2" >
         <p>Returns <code>true</code> if the comparison operator in the argument returns <code>true</code> for <strong><em>any</em></strong> of the values in the array. Returns <code>false</code> otherwise.
         </p>
         <p>Example:
         <br /><code>any(url_decode(http.request.body.form.values[*])[*] contains "an xss attack")</code>
         </p>
      </td>
    </tr>
    <tr>
      <td>
         <code>all()</code>
      </td>
      <td>
         Array&lt;Boolean>
      </td>
      <td>
         Boolean
      </td>
      <td colspan="2" >
         <p>Returns <code>true</code> if the comparison operator in the argument returns <code>true</code> for <strong><em>all</em></strong> of the values in the array. Returns <code>false</code> otherwise.
         </p>
         <p>Example:
         <br /><code>all(http.request.headers['content-type'][*] == "application/json")</code>
         </p>
      </td>
    </tr>
    <tr>
      <td>
         <code>concat(<em>comma-separated arguments</em>)</code>
      </td>
      <td>
         String, Integer, bytes, elements from arrays
      </td>
      <td>
         String
      </td>
      <td colspan="2" >
         <p>Concatenates a comma-separated list of arguments into a single String.
         </p>
         <p>Example:
         <br /><code>concat("String1"," ","String",2) == "String1 String2"</code>
         </p>
      </td>
    </tr>
    <tr>
      <td>
         <code>len()</code>
      </td>
      <td>
         String, Bytes
      </td>
      <td>
         Integer
      </td>
      <td colspan="2" >
         <p>Returns the byte length of a String or Bytes field.
         </p>
         <p>Example:
         <br /><code>len(http.host)</code>
         </p>
      </td>
    </tr>
    <tr>
      <td>
         <code>lower()</code>
      </td>
      <td>
         String
      </td>
      <td>
         String
      </td>
      <td colspan="2" >
         <p>Converts a string field to lowercase. Only uppercase ASCII bytes are converted; all other bytes are unaffected.
         </p>
         <p>Example:
         <br /><code>lower(http.host) == "www.cloudflare.com"</code>
         </p>
      </td>
    </tr>
    <tr>
      <td>
         <code>upper()</code>
      </td>
      <td>
         String
      </td>
      <td>
         String
      </td>
      <td colspan="2" >
         <p>Converts a string field to uppercase. Only lowercase ASCII bytes are converted; all other bytes are unaffected.</p>
         <p>Example:
         <br /><code>upper(http.host) == "WWW.CLOUDFLARE.COM"</code></p>
      </td>
    </tr>
    <tr>
      <td>
          <code>url_decode()</code>
      </td>
      <td>
          String
      </td>
      <td>
          String
      </td>
      <td colspan="2" >
        <p>Decodes a URL formatted string, as in the following:
          <ul>
              <li><code>%20</code> and <code>+</code> decode  to <code> </code> (space characters)</li>
              <li><code>%E4%BD%A</code> decodes to  <code>你</code></li>
          </ul>
        </p>
        <p>Example:
          <br />
          <code>any(url_decode(http.request.body.form.values[*])[*] contains "an xss attack")</code>
        </p>
      </td>
    </tr>
  </tbody>
</table>
</TableWrap>

## HMAC validation

<Aside>

Access to the HMAC validation function requires a Cloudflare Pro, Business, or Enterprise plan.

</Aside>

### Overview

You can validate hash-based message authentication code (HMAC) tokens in a Firewall Rules expression by using the `is_timed_hmac_valid_v0()` function, which has the following signature:

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

and these argument definitions:

<TableWrap>
  <table style="width: 100%">
  <thead>
    <tr>
      <td>Argument</td>
      <td>Type</td>
      <td>Description</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>_Key_</td>
      <td>String literal</td>
      <td>Specifies the secret cryptographic key for validating the HMAC.</td>
    </tr>
    <tr>
      <td>_MessageMAC_</td>
      <td>String</td>
      <td>
        Contains a concatenation of the following HMAC elements: _message_,
        _separator_, _timestamp_, _mac_. For a specification and example see
        [_MessageMAC_](#messagemac).
      </td>
    </tr>
    <tr>
      <td>_ttl_</td>
      <td>Integer literal</td>
      <td>
        <p>
          Defines the time-to-live for the HMAC token, expressed in seconds.
        </p>
        <p>
          Determines how long the token is valid, relative to the time it was
          issued.
        </p>
      </td>
    </tr>
    <tr>
      <td>_currentTimeStamp_</td>
      <td>Integer</td>
      <td>
        <p>
          Represents the Unix timestamp when Cloudflare received the request,
          expressed in seconds.
        </p>
        <p>
          Pass the `http.request.timestamp.sec` field as an approximate value to
          this argument.
        </p>
      </td>
    </tr>
    <tr>
      <td>_lengthOfSeparator_</td>
      <td>Integer literal</td>
      <td>
        <p>
          Optional argument that specifies the length of the _separator_ between
          the _timestamp_ and the _message_ in the _MessageMAC_.
        </p>
        <p>Expressed in bytes, with a default value of 0.</p>
      </td>
    </tr>
    <tr>
      <td>_flags_</td>
      <td>String literal</td>
      <td>
        <p>
          When you set this optional argument to `` `s` ``, the function expects
          the value of the base64-encoded _mac_ in the _MessageMAC_ argument to
          use the URL-safe character set with no padding.
        </p>
        <p>
          When you do **not** set the value of _flags_ to `` `s` ``, you must
          URL encode the base64 value for _mac_ in the _MessageMAC_ argument.
        </p>
      </td>
    </tr>
  </tbody>
</table>
</TableWrap>

The `is_timed_hmac_valid_v0()` function uses the supplied _Key_ to generate a message authentication code (MAC) from the _message_ and the _timestamp_ regions of the MessageMAC. If the generated MAC matches the _mac_ region of the MessageMAC and the token has not expired, the HMAC is valid and the function returns `true`.

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

<TableWrap>
<table style="width: 100%;">
  <thead>
    <tr>
      <td><strong>Expression</strong></td>
      <td><strong>Description</strong></td>
      <td><strong>Example</strong></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>(.+)</code></td>
      <td>The <em>message</em> to validate</td>
      <td><code>/download/cat.jpg</code></td>
    </tr>
    <tr>
      <td><code>(.*)</code></td>
      <td>The <em>separator</em> between message and timestamp, commonly a parameter name</td>
      <td><code>&verify=</code></td>
    </tr>
    <tr>
      <td><code>(\d{'{10}'})</code></td>
      <td>The 10-digit Unix <em>timestamp</em> when the MAC was issued, expressed in seconds</td>
      <td><code>1484063137</code></td>
    </tr>
    <tr>
      <td><code>(.{'{43,}'})</code></td>
      <td><p>A base64-encoded version of the <em>MAC</em>. When you do not set the value of the <em>urlSafe</em> argument in the HMAC validation function to <code>s</code>, you must URL encode the base64 value for <em>mac</em>.</p>
      <p>When the base64 MAC encoding is URL-safe, the value for <em>mac</em>contains 43 bytes. Otherwise, the value will be 44 bytes or more, because of URL encoding.</p>
</td>
      <td><code>IaLGSmELTvlhfd0ItdN6PhhHTFhzx<br />73EX8uy%2FcSDiIU%3D</code></td>
    </tr>
  </tbody>
</table>
</TableWrap>

For details on generating a MessageMAC, see [_Implement token creation_](https://support.cloudflare.com/hc/en-us/articles/115001376488-Configuring-Token-Authentication#6P9Gz7kmyxQrpL6r6iPKQR)

### Validation function examples

<Aside type='note'>

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
