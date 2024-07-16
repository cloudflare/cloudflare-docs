---
title: Functions
pcx_content_type: reference
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

```sql
lower(http.host) == "www.cloudflare.com"
```

Transformation functions that do not take arrays as an argument type require the `[*]` index notation. Refer to [Arrays](/ruleset-engine/rules-language/values/#arrays) for more information.

The Rules language supports these transformation functions:

{{<definitions>}}

- <code id="function-any">{{<name>}}any{{</name>}}({{<type>}}Array{{</type>}}\<{{<param-type>}}Boolean{{</param-type>}}\>)</code> {{<type>}}Boolean{{</type>}}

  - Returns <code>true</code> when the comparison operator in the argument returns `true` for <em>any</em> of the values in the argument array. Returns <code>false</code> otherwise.

  - <em>Example:</em>
    <br />

    <code class="InlineCode" style="width:100%">
      any(url_decode(http.request.body.form.values[*])[*] contains "an xss attack")
    </code>

- <code id="function-all">{{<name>}}all{{</name>}}({{<type>}}Array{{</type>}}\<{{<param-type>}}Boolean{{</param-type>}}\>)</code> {{<type>}}Boolean{{</type>}}

  - Returns <code>true</code> when the comparison operator in the argument returns `true` for <em>all</em> values in the argument array. Returns <code>false</code> otherwise.

  - <em>Example:</em>
    <br />

    `all(http.request.headers["content-type"][*] == "application/json")`

- <code id="function-concat">{{<name>}}concat{{</name>}}({{<type>}}String | Integer | bytes | Array elements{{</type>}})</code> {{<type>}}String{{</type>}}

  - Takes a comma-separated list of values. Concatenates the argument values into a single String.

  - For example, `concat("String1", " ", "String", 2)` will return `"String1 String2"`.

- <code id="function-decode_base64">{{<name>}}decode_base64{{</name>}}(source{{<param-type>}}String{{</param-type>}})</code> {{<type>}}String{{</type>}}

  - Decodes a Base64-encoded String specified in `source`.

  - `source` must be a field, that is, it cannot be a literal String.

  - <em>Example:</em>
  <br/>
  With the following HTTP request header: `client_id: MTIzYWJj`,<br/>
  `(any(decode_base64(http.request.headers["client_id"][*])[*] eq "123abc"))` would return `true`.

{{<Aside type="warning">}}
You can only use the `decode_base64()` function in [header modification rules](/rules/transform/), [custom rules](/waf/custom-rules/), and [rate limiting rules](/waf/rate-limiting-rules/).
{{</Aside>}}

- <code id="function-ends_with">{{<name>}}ends_with{{</name>}}(source{{<param-type>}}String{{</param-type>}}, substring{{<param-type>}}String{{</param-type>}})</code> {{<type>}}Boolean{{</type>}}

  - Returns `true` when the source ends with a given substring. Returns `false` otherwise. The source cannot be a literal value (like `"foo"`).

  - For example, if `http.request.uri.path` is `"/welcome.html"`, then `ends_with(http.request.uri.path, ".html")` will return `true`.

- <code id="function-len">{{<name>}}len{{</name>}}({{<type>}}String | bytes{{</type>}})</code> {{<type>}}Integer{{</type>}}

  - Returns the byte length of a String or Bytes field.

  - For example, if `http.host` is `"example.com"`, then `len(http.host)` will return `11`.

- <code id="function-lookup_json_integer">{{<name>}}lookup_json_integer{{</name>}}(field{{<param-type>}}String{{</param-type>}}, key{{<param-type>}}String | Integer{{</param-type>}} [, key{{<param-type>}}String | Integer{{</param-type>}}, ...])</code> {{<type>}}Integer{{</type>}}

  - Returns the integer value associated with the supplied `key` in `field`.<br/>
  The `field` must be a string representation of a valid JSON document.<br/>
  The `key` can be an attribute name, a zero-based position number in a JSON array, or a combination of these two options (as extra function parameters), while following the hierarchy of the JSON document to obtain a specific integer value.<br>
  Note: This function only works for plain integers. For example, it will not work for floating numbers with a zero decimal part such as `42.0`.

  - _Examples:_

    A) Given the following JSON object contained in the `http.request.body.raw` field:<br/>
    `{ "record_id": "aed53a", "version": 2 }`<br/>
    Then `lookup_json_integer(http.request.body.raw, "version")` will return `2`.

    B) Given the following nested object:<br/>
    `{ "product": { "id": 356 } }`<br/>
    Then `lookup_json_integer(http.request.body.raw, "product", "id")` will return `356`.

    C) Given the following JSON array at the root level:<br/>
    `["first_item", -234]`<br/>
    Then `lookup_json_integer(http.request.body.raw, 1)` will return `-234`.

    D) Given the following array in a JSON object attribute:<br/>
    `{ "network_ids": [123, 456] }`<br/>
    Then `lookup_json_integer(http.request.body.raw, "network_ids", 0)` will return `123`.

    E) Given the following root-level array of JSON objects:<br/>
    `[{ "product_id": 123 }, { "product_id": 456 }]`<br/>
    Then `lookup_json_integer(http.request.body.raw, 1, "product_id")` will return `456`.

- <code id="function-lookup_json_string">{{<name>}}lookup_json_string{{</name>}}(field{{<param-type>}}String{{</param-type>}}, key{{<param-type>}}String | Integer{{</param-type>}} [, key{{<param-type>}}String | Integer{{</param-type>}}, ...])</code> {{<type>}}String{{</type>}}

  - Returns the string value associated with the supplied `key` in `field`.<br/>
  The `field` must be a string representation of a valid JSON document.<br/>
  The `key` can be an attribute name, a zero-based position number in a JSON array, or a combination of these two options (as extra function parameters), while following the hierarchy of the JSON document to obtain a specific value.

  - _Examples:_

    A) Given the following JSON object contained in the `http.request.body.raw` field:<br/>
    `{ "company": "cloudflare", "product": "rulesets" }`<br/>
    Then `lookup_json_string(http.request.body.raw, "company") == "cloudflare"` will return `true`.

    B) Given the following nested object:<br/>
    `{ "network": { "name": "cloudflare" } }`<br/>
    Then `lookup_json_string(http.request.body.raw, "network", "name") == "cloudflare"` will return `true`.

    C) Given the following JSON array at the root level:<br/>
    `["other_company", "cloudflare"]`<br/>
    Then `lookup_json_string(http.request.body.raw, 1) == "cloudflare"` will return `true`.

    D) Given the following array in a JSON object attribute:<br/>
    `{ "networks": ["other_company", "cloudflare"] }`<br/>
    Then `lookup_json_string(http.request.body.raw, "networks", 1) == "cloudflare"` will return `true`.

    E) Given the following root-level array of JSON objects:<br/>
    `[{ "network": "other_company" }, { "network": "cloudflare" }]`<br/>
    Then `lookup_json_string(http.request.body.raw, 1, "network") == "cloudflare"` will return `true`.

- <code id="function-lower">{{<name>}}lower{{</name>}}({{<type>}}String{{</type>}})</code> {{<type>}}String{{</type>}}

  - Converts a string field to lowercase. Only uppercase ASCII bytes are converted. All other bytes are unaffected.

  - For example, if `http.host` is `"WWW.cloudflare.com"`, then `lower(http.host) == "www.cloudflare.com"` will return `true`.

- <code id="function-regex_replace">{{<name>}}regex_replace{{</name>}}(source{{<param-type>}}String{{</param-type>}}, regular\_expression{{<param-type>}}String{{</param-type>}}, replacement{{<param-type>}}String{{</param-type>}})</code> {{<type>}}String{{</type>}}

    - Replaces a part of a source string matched by a regular expression with a replacement string, returning the result. The replacement string can contain references to regular expression capture groups.

    - _Examples:_

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

      Create capture groups by putting part of the regular expression in parentheses. Then, reference a capture group using `${<num>}` in the replacement string, where `<num>` is the number of the capture group.

{{<Aside type="warning">}}
You can only use the `regex_replace()` function in rewrite expressions of [Transform Rules](/rules/transform/) and target URL expressions of [dynamic URL redirects](/rules/url-forwarding/single-redirects/).
{{</Aside>}}

- <code id="function-remove_bytes">{{<name>}}remove_bytes{{</name>}}({{<type>}}bytes{{</type>}})</code> {{<type>}}bytes{{</type>}}

  - Returns a new byte array with all the occurrences of the given bytes removed.

  - For example, if `http.host` is `"www.cloudflare.com"`, then `remove_bytes(http.host, "\x2e\x77")` will return `"cloudflarecom"`.

- <code id="function-starts_with">{{<name>}}starts_with{{</name>}}(source{{<param-type>}}String{{</param-type>}}, substring{{<param-type>}}String{{</param-type>}})</code> {{<type>}}Boolean{{</type>}}

  - Returns `true` when the source starts with a given substring. Returns `false` otherwise. The source cannot be a literal value (like `"foo"`).

  - For example, if `http.request.uri.path` is `"/blog/first-post"`, then `starts_with(http.request.uri.path, "/blog")` will return `true`.

- <code id="function-substring">{{<name>}}substring{{</name>}}(field{{<param-type>}}String | Bytes{{</param-type>}}, start{{<param-type>}}Integer{{</param-type>}} [, end{{<param-type>}}Integer{{</param-type>}}])</code> {{<type>}}String{{</type>}}

  - Returns part of the `field` value (the value of a String or Bytes [field](/ruleset-engine/rules-language/fields/)) from the `start` byte index up to (but excluding) the `end` byte index. The first byte in `field` has index `0`. If you do not provide the optional `end` index, the function returns the part of the string from `start` index to the end of the string.

  - The `start` and `end` indexes can be negative integer values, which allows you to access characters from the end of the string instead of the beginning.

  - *Examples:*

    ```txt
    // If http.request.body.raw is "asdfghjk":

    substring(http.request.body.raw, 2, 5)   will return "dfg"
    substring(http.request.body.raw, 2)      will return "dfghjk"
    substring(http.request.body.raw, -2)     will return "jk"
    substring(http.request.body.raw, 0, -2)  will return "asdfgh"
    ```

- <code id="function-to_string">{{<name>}}to_string{{</name>}}({{<type>}}Integer | Boolean | IP address{{</type>}})</code> {{<type>}}String{{</type>}}

  - Returns the string representation of an Integer, Boolean, or IP address value.

  - *Examples:*

    ```txt
    // If cf.bot_management.score is 5:
    to_string(cf.bot_management.score)   will return "5"

    // If ssl is true:
    to_string(ssl)                       will return "true"
    ```

{{<Aside type="warning">}}
You can only use the `to_string()` function in rewrite expressions of [Transform Rules](/rules/transform/) and target URL expressions of [dynamic URL redirects](/rules/url-forwarding/single-redirects/).
{{</Aside>}}

- <code id="function-upper">{{<name>}}upper{{</name>}}({{<type>}}String{{</type>}})</code> {{<type>}}String{{</type>}}

  - Converts a string field to uppercase. Only lowercase ASCII bytes are converted. All other bytes are unaffected.

  - For example, if `http.host` is`"www.cloudflare.com"`, then `upper(http.host)` will return `"WWW.CLOUDFLARE.COM"`.

- <code id="function-url_decode">{{<name>}}url_decode{{</name>}}(source{{<param-type>}}String{{</param-type>}}[, options{{<param-type>}}String{{</param-type>}}])</code> {{<type>}}String{{</type>}}

  - Decodes a URL-formatted string defined in `source`, as in the following:

    - `%20` and `+` decode to a space character (` `).

    - `%E4%BD` decodes to `ä½`.

  - The `source` must be a field, that is, it cannot be a literal string.

  - The `options` parameter is optional. You must provide any options as a single string wrapped in quotes, such as `"r"` or `"ur"`. The available options are the following:

      - `r`: Applies recursive decoding. For example, `%2520` will be decoded twice (recursively) to a space character (` `).
      - `u`: Enables Unicode percent decoding. The result will be encoded in UTF-8. For example, `"%u2601"` would be decoded to a cloud emoji (`☁️`) encoded in UTF-8 (`"\xe2\x98\x81"`, with a size of 3 bytes).

  - <em>Examples:</em>
    <br />

    ```txt
    url_decode("John%20Doe")   will return "John Doe"
    url_decode("John+Doe")     will return "John Doe"
    url_decode("%2520")        will return "%20"
    url_decode("%2520", "r")   will return " "

    // Using url_decode() with the any() function:
    any(url_decode(http.request.body.form.values[*])[*] contains "an xss attack")
    ```

- <code id="function-uuidv4">{{<name>}}uuidv4{{</name>}}({{<type>}}Bytes{{</type>}})</code> {{<type>}}String{{</type>}}

  - Generates a random UUIDv4 (Universally Unique Identifier, version 4) based on the given argument (a source of randomness). To obtain an array of random bytes, use the [`cf.random_seed`](/ruleset-engine/rules-language/fields/#field-cf-random_seed) field.

  - For example, `uuidv4(cf.random_seed)` will return a UUIDv4 similar to `49887398-6bcf-485f-8899-f15dbef4d1d5`.

{{<Aside type="warning">}}
You can only use the `uuidv4()` function in [rewrite expressions of Transform Rules](/rules/transform/).
{{</Aside>}}

{{</definitions>}}

## Magic Firewall Functions

{{<definitions>}}

- <code id="function-bit_slice">{{<name>}}bit_slice{{</name>}}(protocol {{<type>}}String{{</type>}}, offset_start {{<type>}}Number{{</type>}}, offset_end {{<type>}}Number{{</type>}})</code> {{<type>}}Number{{</type>}}

  - This function looks for matches on a given slice of bits.
  - The offset starts on the given protocol header. For example, to match on the first bit of payload for a UDP packet, you must set `offset_start` to `64`.
  - This is primarily intended for use with `ip`, `udp`, and `tcp`.
  - The slice (`offset_end` — `offset_start`) cannot be longer than 32 bits, but multiple calls can be joined together via logical expressions.
  - The `bit_slice` offset cannot exceed 2,040 bits.

{{</definitions>}}

## HMAC validation

{{<Aside type="warning" header="Important">}}

Access to the HMAC validation function requires a Cloudflare Pro, Business, or Enterprise plan.

{{</Aside>}}

### Overview

You can validate hash-based message authentication code (HMAC) tokens in a rule expression by using the `is_timed_hmac_valid_v0()` function, which has this signature:

```java
is_timed_hmac_valid_v0(
  <String literal as Key>,
  <String field as MessageMAC>,
  <Integer literal as ttl>,
  <Integer as currentTimeStamp>,
  <Optional Integer literal as lengthOfSeparator, default: 0>,
  <Optional String literal as flags>
) -> <Bool as result>
```

The `is_timed_hmac_valid_v0()` function has these parameter definitions:

{{<definitions>}}

- <code>{{<name>}}Key{{</name>}}</code> {{<type>}}String literal{{</type>}}

  - Specifies the secret cryptographic key for validating the HMAC.

- <code>{{<name>}}MessageMAC{{</name>}}</code> {{<type>}}String{{</type>}}

  - Contains a concatenation of these HMAC elements: `message`, `separator`, `timestamp`, `mac`. For a definition and an example, refer to [MessageMAC](#messagemac).

- <code>{{<name>}}ttl{{</name>}}</code> {{<type>}}Integer literal{{</type>}}

  - Defines the time-to-live for the HMAC token, expressed in seconds. Determines how long the token is valid, relative to the time it was issued.

- <code>{{<name>}}currentTimeStamp{{</name>}}</code> {{<type>}}Integer{{</type>}}

  - Represents the UNIX timestamp when Cloudflare received the request, expressed in seconds. Pass the `http.request.timestamp.sec` field as an approximate value to this argument.

- <code>{{<name>}}lengthOfSeparator{{</name>}}</code> {{<type>}}Integer literal{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Specifies the length of the `separator` between the `timestamp` and the `message` in the `MessageMAC`. Expressed in bytes, with a default value of `0`.

- <code>{{<name>}}flags{{</name>}}</code> {{<type>}}String literal{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - When you set this optional argument to `'s'`, the function expects the value of the Base64-encoded `mac` in the `MessageMAC` argument to use the URL-safe character set with no padding.

  - When you do **not** set the value of `flags` to `'s'`, you must URL encode the Base64 value for `mac` in the `MessageMAC` argument.

{{</definitions>}}

### Usage

The `is_timed_hmac_valid_v0()` function uses the supplied _Key_ to generate a message authentication code (MAC) from the `message` and the `timestamp` regions of the MessageMAC. When the generated MAC matches the `mac` region of the MessageMAC and the token has not expired, the HMAC is valid and the function returns `true`.

For example, the following expression matches requests to `downloads.example.com` that do not include valid HMAC tokens:

```java
http.host == "downloads.example.com"
and not is_timed_hmac_valid_v0("mysecretkey", http.request.uri, 100000, http.request.timestamp.sec, 8)
```

For examples of rules that use HMAC validation, refer to [Configure token authentication](/waf/custom-rules/use-cases/configure-token-authentication/) in the WAF documentation.

### MessageMAC

A valid MessageMAC satisfies the following regular expression:

```txt
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
      <td>The <code>message</code> to validate.</td>
      <td valign="top"><code>/download/cat.jpg</code></td>
    </tr>
    <tr>
      <td valign="top"><code>(.*)</code></td>
      <td>The <code>separator</code> between message and timestamp, commonly a parameter name.</td>
      <td valign="top"><code>&verify=</code></td>
    </tr>
    <tr>
      <td valign="top"><code>(\d{10})</code></td>
      <td>The 10-digit UNIX <code>timestamp</code> when the MAC was issued, expressed in seconds.</td>
      <td valign="top"><code>1484063137</code></td>
    </tr>
    <tr>
      <td valign="top"><code>(.{43,})</code></td>
      <td><p>A Base64-encoded version of the <code>mac</code>. When you do not set the value of the <code>urlSafe</code> argument in the HMAC validation function to <code>'s'</code>, you must URL-encode the Base64 value for <code>mac</code>.</p>
      <p>When the Base64 MAC encoding is URL-safe, the <code>mac</code> value contains 43 bytes. Otherwise, the value will be 44 bytes or more, because of URL encoding.</p></td>
      <td valign="top"><code>IaLGSmELTvlhfd0ItdN6PhhHTFhzx<br />73EX8uy%2FcSDiIU%3D</code></td>
    </tr>
  </tbody>
</table>

For details on generating a MessageMAC, refer to [HMAC token generation](/waf/custom-rules/use-cases/configure-token-authentication/#hmac-token-generation).

## HMAC validation examples

{{<Aside type="warning" header="Important">}}

When you do not use the optional `flags` argument for `is_timed_hmac_valid_v0()`, you must URL-encode the Base64 value for `mac` in the `MessageMAC` argument.

For more information, refer to [HMAC Validation: Overview](#overview).

{{</Aside>}}

### MessageMAC in a single field

Consider the case where the MessageMAC is contained entirely within a single field, as in this example URI path:

```txt
/download/cat.jpg?verify=1484063787-IaLGSmELTvlhfd0ItdN6PhhHTFhzx73EX8uy%2FcSDiIU%3D
```

Note how the URI maps to the elements of the MessageMAC:

Element     | Value
------------|---------------------------------------------------
`message`   | `/download/cat.jpg`
`separator` | `?verify=` (with length `8`)
`timestamp` | `1484063787`
`mac`       | `IaLGSmELTvlhfd0ItdN6PhhHTFhzx73EX8uy%2FcSDiIU%3D`

When the MessageMAC is contained entirely within a single field such as `http.request.uri`, pass the field name to the `MessageMAC` argument of the HMAC validation function:

```java
is_timed_hmac_valid_v0(
  "mysecretkey",
  http.request.uri,
  100000,
  http.request.timestamp.sec,
  8
)
```

### Concatenated MessageMAC argument

To compose a MessageMAC from more than one field, use the [`concat()`](#function-concat) function.

This example constructs the value of the `MessageMAC` argument by concatenating the request URI and two header fields:

```java
is_timed_hmac_valid_v0(
  "mysecretkey",
  concat(
    http.request.uri,
    http.request.headers["timestamp"][0],
    "-",
    http.request.headers["mac"][0]),
  100000,
  http.request.timestamp.sec,
  0
)
```
