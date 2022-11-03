---
pcx_content_type: concept
title: Origin Rules
weight: 6
layout: single
meta:
  title: Origin Rules (beta)
---

{{<beta>}} Origin Rules {{</beta>}}

Origin Rules allow you to customize where the incoming traffic will go and with which parameters. Currently you can perform the following overrides:

* [Host header](/rules/origin-rules/features/#host-header): Overrides the `Host` header of incoming requests.
* [Server Name Indication (SNI)](/rules/origin-rules/features/#server-name-indication-sni): Overrides the Server Name Indication (SNI) value of incoming requests.
* [DNS record](/rules/origin-rules/features/#dns-record): Overrides the resolved hostname of incoming requests.
* [Destination port](/rules/origin-rules/features/#destination-port): Overrides the resolved destination port of incoming requests.

The Origin Rule expression will determine when these overrides will be applied.

## Availability

{{<table-wrap>}}
|                           | Free | Pro | Business | Enterprise |
|---------------------------|:----:|:---:|:--------:|:----------:|
| Number of Origin Rules    |   {{<plan-info id="rules.origin_rules.rules.free">}} |  {{<plan-info id="rules.origin_rules.rules.pro">}} |       {{<plan-info id="rules.origin_rules.rules.biz">}} |                 {{<plan-info id="rules.origin_rules.rules.ent">}} |
| Override Host header      |   {{<plan-info id="rules.origin_rules.override_host_header.free">}} |  {{<plan-info id="rules.origin_rules.override_host_header.pro">}} |       {{<plan-info id="rules.origin_rules.override_host_header.biz">}} |                 {{<plan-info id="rules.origin_rules.override_host_header.ent">}} |
| Override SNI              |   {{<plan-info id="rules.origin_rules.override_sni.free">}} |  {{<plan-info id="rules.origin_rules.override_sni.pro">}} |       {{<plan-info id="rules.origin_rules.override_sni.biz">}} |                 {{<plan-info id="rules.origin_rules.override_sni.ent">}} |
| Override DNS record       |   {{<plan-info id="rules.origin_rules.override_dns_record.free">}} |  {{<plan-info id="rules.origin_rules.override_dns_record.pro">}} |       {{<plan-info id="rules.origin_rules.override_dns_record.biz">}} |                 {{<plan-info id="rules.origin_rules.override_dns_record.ent">}} |
| Override destination port |   {{<plan-info id="rules.origin_rules.override_destination_port.free">}} |  {{<plan-info id="rules.origin_rules.override_destination_port.pro">}} |       {{<plan-info id="rules.origin_rules.override_destination_port.biz">}} |                 {{<plan-info id="rules.origin_rules.override_destination_port.ent">}} |

{{</table-wrap>}}

## Execution order

{{<render file="_product_execution_order.md">}}

## Important remarks

If you override the hostname with an Origin Rule (via Host header override or DNS record override) and add a header override to your load balancer configuration, the Origin Rule will take precedence over the load balancer configuration.

Like [Page Rules](https://support.cloudflare.com/hc/articles/218411427), an Origin Rule performing a Host header override will update the SNI value of the original request to the same value of the Host header. To set an SNI value different from the Host header override, add an SNI override in the same Origin Rule or create a separate Origin Rule for this purpose.