---
pcx_content_type: configuration
title: Require a valid HMAC token
---

# Require a valid HMAC token

Use the Rules language [`is_timed_hmac_valid_v0()`](/ruleset-engine/rules-language/functions/#hmac-validation) HMAC validation function to validate hash-based message authentication code (HMAC) tokens in a custom rule expression.

{{<Aside type="note">}}
Access to the HMAC validation function requires a Cloudflare Pro, Business, or Enterprise plan.
{{</Aside>}}

This example uses HMAC token authentication to protect a static private asset hosted by `example.com`.

The `http.request.uri` for this example is:

```txt
/download/cat.jpg?verify=1484063787-9JQB8vP1z0yc5DEBnH6JGWM3mBmvIeMrnnxFi3WtJLE%3D
```

Where:

- `/download/cat.jpg?` represents the path to the asset — the HMAC _message_ to authenticate.
- `?verify=` is the _separator_ between the path to the asset and the timestamp when the HMAC token was issued.
- `1484063787` represents the _timestamp_ when the token was issued, expressed as Unix time in seconds.
- `9JQB8vP1z0yc5DEBnH6JGWM3mBmvIeMrnnxFi3WtJLE%3D` is a Base64-encoded _MAC_.

The following custom rule blocks requests to `example.com` that do not include a valid HMAC.

The rule supplies the value of the secret key shared between the website and Cloudflare as the first argument to the [`is_timed_hmac_valid_v0()`](/ruleset-engine/rules-language/functions/#hmac-validation) HMAC validation function, and uses the value of `http.request.uri` for the [MessageMAC](/ruleset-engine/rules-language/functions/#messagemac):

<table>
  <thead>
    <tr>
      <th>Expression</th>
      <th style="width:20%">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>
          (http.host eq "downloads.example.com" and not is_timed_hmac_valid_v0("secretKey",
          http.request.uri, 10800, http.request.timestamp.sec, 8))
        </code>
      </td>
      <td>
        <em>Block</em>
      </td>
    </tr>
  </tbody>
</table>

The `is_timed_hmac_valid_v0()` function compares the value of a MAC generated using `secretKey` to the value encoded in `http.request.uri`.

If the MAC values match and

```txt
http.request.timestamp.sec < (timestamp-issued + 10800)
```

then the token is valid and the function returns `true`.

Since the expression in this example uses the `not` operator, it only matches when the HMAC token is _not_ valid. When the token is not valid, the Cloudflare triggers the action and blocks the request.

{{<Aside type="warning" header="Important">}}

When you do not use the optional `flags` argument for `is_timed_hmac_valid_v0()`, you must URL encode the Base64 value for `mac` in the `MessageMAC` argument.

For more information, refer to [Functions: HMAC Validation](/ruleset-engine/rules-language/functions/#hmac-validation).

{{</Aside>}}

## Protecting several paths using the same secret

You can use the same secret key to protect several URI paths.

This is illustrated in the example above, where `http.request.uri` is passed as the `MessageMAC` argument to the validation function.

Since `http.request.uri` includes the path to the asset and that value is extracted for each request, the validation function evaluates all request URIs to `downloads.example.com` using the same secret key.

Note that while you can use the same secret key to authenticate several paths, you must generate an HMAC token for each unique message you want to authenticate.
