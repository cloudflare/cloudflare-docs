# Block Microsoft Exchange Autodiscover requests

In some cases, Microsoft Exchange Autodiscover service requests can be “noisy,” triggering large numbers of HTTP 404 (Page Not Found) errors.

This example uses the `matches` [comparison operator](/cf-firewall-language/operators/#comparison-operators) and a regular expression to block `autodiscover.xml` and `autodiscover.src` requests:

<table>
  <thead>
  <tr>
    <th>Expression</th>
    <th>Action</th>
  </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>http.request.uri.path matches "/autodiscover.(xml|src)$"</code></td>
      <td><em>Block</em></td>
    </tr>
  </tbody>
</table>
