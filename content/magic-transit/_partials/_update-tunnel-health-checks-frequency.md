---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: healthChecksUrl
---

## Update health check frequency

By default, Cloudflare servers send [health checks]($1) to each GRE, CNI, or IPsec tunnel endpoint you configure to receive traffic from Magic Transit and Magic WAN. You can configure this frequency [via the API](https://developers.cloudflare.com/api/operations/magic-gre-tunnels-update-gre-tunnel) to suit your use case. For example, if you are connecting a lower-traffic site for which you do not need immediate failover and would rather receive a lower volume of health check traffic, you should set the frequency to `low`. On the other hand, if you are connecting a site that is extremely sensitive to any issues, and you want a faster failover at the earliest sign of a potential problem, you should set this to `high`.

Available options are `low`, `mid`, and `high`.

Here is an example of how you would adjust health check frequency to `low`:

```bash
curl --request PUT \
  --url https://api.cloudflare.com/client/v4/accounts/<account_identifier>/magic/gre_tunnels/<tunnel_identifier> \
  --header 'Content-Type: application/json' \
  --header 'X-Auth-Email: <YOUR_EMAIL> ' \
  --data ‘'{"health_check": {"rate":"low"}}'’
```