---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: healthChecksUrl;;addTunnelsPath
---

By default, Cloudflare servers send {{<glossary-tooltip term_id="tunnel health-check" link="$1">}}health checks{{</glossary-tooltip>}} to each {{<glossary-tooltip term_id="GRE tunnel">}}GRE{{</glossary-tooltip>}}, CNI, or {{<glossary-tooltip term_id="IPsec tunnel">}}IPsec{{</glossary-tooltip>}} tunnel endpoint you configure to receive traffic from Magic Transit and Magic WAN. You can configure this frequency via the dashboard or [the API](/api/operations/magic-gre-tunnels-update-gre-tunnel) to suit your use case. For example, if you are connecting a lower-traffic site for which you do not need immediate failover and would rather receive a lower volume of health check traffic, you should set the frequency to `low`. On the other hand, if you are connecting a site that is extremely sensitive to any issues, and you want a more proactive failover at the earliest sign of a potential problem, you should set this to `high`.

Available options are `low`, `mid`, and `high`.


{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. Refer to [Add tunnels]($2) to learn how to create or edit your tunnel.
2. Change the **Health check rate** to your desired rate. For example, _Low_.
3. Save your changes.

{{</tab>}}
{{<tab label="api" no-code="true">}}

You can adjust the health check frequency by updating your [GRE](/api/operations/magic-gre-tunnels-update-gre-tunnel), [IPsec](/api/operations/magic-ipsec-tunnels-update-ipsec-tunnel), or [CNI](/api/operations/magic-interconnects-update-interconnect) tunnels.

Below is an example of how to adjust tunnel health check frequency to `low`. Note that this command applies to GRE, IPsec and CNI tunnels:

```bash
curl --request PUT \
https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/gre_tunnels/{tunnel_id} \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{
  "health_check": {"rate":"low"}
}'
```

{{</tab>}}
{{</tabs>}}