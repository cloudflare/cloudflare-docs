---
pcx_content_type: configuration
title: Require specific HTTP ports
---

# Require specific HTTP ports

By default, Cloudflare allows requests on a number of different HTTP ports (refer to [Network ports](/fundamentals/get-started/reference/network-ports/).

You can target requests based on their HTTP port with the [`cf.edge.server_port`](/ruleset-engine/rules-language/fields/#field-cf-edge-server_port) dynamic field. Use the `in` [comparison operator](/ruleset-engine/rules-language/operators/#comparison-operators) to target a set of ports.

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

Alternatively, if you are using [WAF managed rules](https://support.cloudflare.com/hc/articles/200172016) and you do not need to specify a custom expression, enable rule ID 100015: "Anomaly:Port - Non Standard Port (not 80 or 443)" to block all requests to your zone on non-standard HTTP ports.

{{<Aside type="note" header="Open server ports and blocked traffic">}}

{{<render file="_open-ports-blocked-traffic.md">}}

Firewall rules and WAF managed rules can block traffic at the application layer (layer 7 in the [OSI model](https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/)), preventing HTTP/HTTPS requests over non-standard ports from reaching the origin server.

{{</Aside>}}
