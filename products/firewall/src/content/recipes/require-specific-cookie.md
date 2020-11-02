# Require a specific cookie

To secure a sensitive area such as a development area, you can share a cookie with trusted individuals and then filter requests so that only users with that cookie can access your site.

Use `http.cookie` [field](https://developers.cloudflare.com/firewall/cf-firewall-language/fields#standard-fields) to target requests based on the presence of a specific cookie.

This example comprises two rules:

- The first rule targets requests to dev.www.foo that have a specific cookie key, `devaccess`. As long as the value of the cookie key contains one of three authorized users, _james_, _matt_, or _michael_, the expression matches and the request is allowed.
- The second rule blocks all access to `dev.www.example.com`.

Since the _Allow_ action has precedence over _Block_, Cloudflare grants access to requests that satisfy Rule 1 and blocks all other requests to `dev.www.example.com`:

<table>
  <thead>
  <tr>
    <th>Execution order</th>
    <th>Expression</th>
    <th>Action</th>
  </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td><code>(http.cookie contains "devaccess=james" or http.cookie contains "devaccess=matt" or http.cookie contains "devaccess=michael") and http.host eq "dev.www.example.com")</code></td>
      <td><em>Block</em></td>
    </tr>
    <tr>
      <td>2</td>
      <td><code>http.host eq "dev.www.example.com"</code></td>
      <td><em>Block</em></td>
    </tr>
  </tbody>
</table>
