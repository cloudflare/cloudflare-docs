---
pcx_content_type: configuration
title: Stop R-U-Dead-Yet? (R.U.D.Y.) attacks
---

# Stop R-U-Dead-Yet? (R.U.D.Y.) attacks

R-U-Dead-Yet (R.U.D.Y.) attacks accomplish denial of service (DoS) by submitting long form fields. Use custom rules to stop these attacks by blocking requests that do not have a legitimate session cookie.

This example combines three expressions to target HTTP `POST` requests that do not contain a legitimate authenticated session cookie:

- The first expression uses the [`http.request.uri.path`](/ruleset-engine/rules-language/fields/#field-http-request-uri-path) field to target the paths to secure from R.U.D.Y.:

    ```txt
    http.request.uri.path matches "(comment|conversation|event|poll)/create"
    ```

- The second uses a regular expression to match the format of a legitimate `auth_session` cookie. The `not` operator targets requests where that cookie is not formatted correctly:

    ```txt
    not http.cookie matches "auth_session=[0-9a-zA-Z]{32}-[0-9]{10}-[0-9a-z]{6}"
    ```

- The third expression targets HTTP `POST` requests:

    ```txt
    http.request.method eq "POST"
    ```

The three expressions are combined into a compound expression using the `and` operator. When an HTTP `POST` request to any of the specified URIs does not contain a properly formatted `auth_session` cookie, Cloudflare blocks the request:

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
          (http.request.method eq "POST" and http.request.uri.path matches "(comment|conversation|event|poll)/create" and not http.cookie matches "auth_session=[0-9a-zA-Z]{32}-[0-9]{10}-[0-9a-z]{6}")
        </code>
      </td>
      <td>
        <em>Block</em>
      </td>
    </tr>
  </tbody>
</table>

{{<Aside type="note">}}
The [`matches`](/ruleset-engine/rules-language/operators/#comparison-operators) operator requires a Cloudflare Business or Enterprise plan.
{{</Aside>}}


