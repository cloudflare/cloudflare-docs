---
pcx-content-type: configuration
title: Require specific HTTP ports
---

# Require specific HTTP ports

By default, Cloudflare allows requests on a number of different HTTP ports (refer to [Network ports](/fundamentals/get-started/network-ports/).

You can target requests based on their HTTP port with the `cf.edge.server_port` [dynamic field](/ruleset-engine/rules-language/fields/#dynamic-fields).

Use the `in` [comparison operator](/ruleset-engine/rules-language/operators/#comparison-operators) to target a set of ports.

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
      <td>
        <code>http.host eq "www.example.com" and not cf.edge.server_port in {80 443}</code>
      </td>
      <td>
        <em>Block</em>
      </td>
    </tr>
  </tbody>
</table>

{{<Aside type="note" header="Note on cf.edge.server_port field">}}
Useful for specifying traffic on a specific port. The value is a port number in the range 1-65535. Due to the nature Cloudflare anycast network, ports should be opened in order for Cloudflare to serve traffic for other customers. Cloudflare will still listen for traffic on those ports, but as long as the rule is in place we will block traffic from reaching to the origin over layer 7 when we receive these requests.
{{</Aside>}}
