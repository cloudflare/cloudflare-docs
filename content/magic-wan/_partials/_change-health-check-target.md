---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: path
---

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. Refer to [Add tunnels]($1) to learn how to create or edit your tunnel.
2. Change the **Health check target** to _Custom_.
3. Configure the IP address for your tunnel health check target to be one from within the prefix range `172.64.240.252/30`.
4. Save your changes.
 
{{</tab>}}
{{<tab label="api" no-code="true">}}
 
You can configure the tunnel health check target IP address by updating your [GRE tunnels](/api/operations/magic-gre-tunnels-update-gre-tunnel) or [IPsec tunnels](/api/operations/magic-ipsec-tunnels-update-ipsec-tunnel).

Example:

```bash
curl --request PUT \
  --url https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/gre_tunnels/{tunnel_id} \
  --header 'Content-Type: application/json' \
  --header 'X-Auth-Email: <YOUR_EMAIL>' \
  --data '{
  "health_check": {
    "target": "172.64.240.253"
  }
```
 
{{</tab>}}
{{</tabs>}}