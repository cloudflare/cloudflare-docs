# Require specific HTTP ports

By default, Cloudflare allows requests on a number of different HTTP ports (see _[Identifying network ports compatible with Cloudflare's proxy](https://support.cloudflare.com/hc/en-us/articles/200169156-Identifying-network-ports-compatible-with-Cloudflare-s-proxy)_ on the Cloudflare support site).

You can target requests based on their HTTP port with the `cf.edge.server_port` [dynamic field](/firewall/cf-firewall-language/fields/#dynamic-fields).

Use the `in` [comparison operator](/firewall/cf-firewall-language/operators/#comparison-operators) to target a set of ports.

This example blocks requests to www.example.com that are not on ports 80 or 443.

<TableWrap>

| Expression                                                              | Action |
| ----------------------------------------------------------------------- | ------ |
| `host eq "www.example.com" and not cf.edge.server_port in {'{80 443}'}` | Block  |

</TableWrap>
