# Require specific HTTP ports

By default, Cloudflare allows requests on a number of different HTTP ports (see [_Identifying network ports compatible with Cloudflare's proxy_](https://support.cloudflare.com/hc/en-us/articles/200169156-Identifying-network-ports-compatible-with-Cloudflare-s-proxy) on the Cloudflare support site).

You can target requests based on their HTTP port with the `cf.edge.server_port` [dynamic field](/cf-firewall-language/fields/#dynamic-fields).

Use the `in` [comparison operator](/cf-firewall-language/operators/#comparison-operators) to target a set of ports.

This example blocks requests to `www.example.com` that are not on ports 80 or 443:

<table>
  <thead>
  <tr>
    <th>Expression</th>
    <th>Action</th>
  </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>host eq "www.example.com" and not cf.edge.server_port in {'{80 443}'}</code></td>
      <td><em>Block</em></td>
    </tr>
  </tbody>
</table>
