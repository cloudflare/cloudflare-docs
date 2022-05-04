---
pcx-content-type: configuration
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

{{<Aside type="note" header="Open server ports and blocked traffic">}}

Due to the nature of Cloudflare's Anycast network, ports other than `80` and `443` will be open so that Cloudflare can serve traffic for other customers on these ports.

The above firewall rule will block traffic at the application layer (layer 7 in the [OSI model](https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/)), preventing HTTP/HTTPS requests over non-standard ports from reaching the origin server.

{{</Aside>}}
