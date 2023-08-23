---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: healthChecksUrl;;addTunnelsPath
---

## Update health check frequency

By default, Cloudflare servers send [health checks]($1) to each GRE, CNI, or IPsec tunnel endpoint you configure to receive traffic from Magic Transit and Magic WAN. You can configure this frequency [via the API](/api/operations/magic-gre-tunnels-update-gre-tunnel) to suit your use case. For example, if you are connecting a lower-traffic site for which you do not need immediate failover and would rather receive a lower volume of health check traffic, you should set the frequency to `low`. On the other hand, if you are connecting a site that is extremely sensitive to any issues, and you want a more proactive failover at the earliest sign of a potential problem, you should set this to `high`.

Available options are `low`, `mid`, and `high`.


{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}
 
1. Refer to [Add tunnels]($2) to learn how to create or edit your tunnel.
2. Change the **Health check rate** to your desired rate. For example, _Low_.
3. Save your changes.
 
{{</tab>}}
{{<tab label="api" no-code="true">}}
 
Here is an example of how you would adjust health check frequency to `low`. Note that this command applies to GRE, IPsec and CNI tunnels:

```bash
curl --request PUT \
https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/gre_tunnels/{tunnel_id} \
--header 'Content-Type: application/json' \
--header 'X-Auth-Email: <YOUR_EMAIL> ' \
--data '{
  "health_check": {"rate":"low"}
  }'
```

Refer to the API documentation for more information on how to [update a GRE](/api/operations/magic-gre-tunnels-update-gre-tunnel), [IPsec](/api/operations/magic-ipsec-tunnels-update-ipsec-tunnel) or [CNI](/api/operations/magic-interconnects-update-interconnect) tunnel.
 
{{</tab>}}
{{</tabs>}}