# Require specific HTTP headers

Many organizations qualify traffic based on the presence of specific HTTP request headers.

Use the Firewall Rules [HTTP header fields](https://developers.cloudflare.com/firewall/cf-firewall-language/fields#http-header-fields) to target requests with specific headers.

This example uses the `http.headers.names` field to look for the presence of an X-CSRF-Token header. The `lower()` [transformation function](https://developers.cloudflare.com/firewall/cf-firewall-language/functions#transformation-functions) converts the value to lowercase so that the expression is case insensitive.

When the X-CSRF-Token header is missing, Cloudflare blocks the request:

<table>
  <thead>
  <tr>
    <th>Expression</th>
    <th>Action</th>
  </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>not any(lower(http.request.headers.names[*])[*] contains "x-csrf-token") and (http.request.full_uri eq "https://www.example.com/somepath")</code></td>
      <td><em>Block</em></td>
    </tr>
  </tbody>
</table>
