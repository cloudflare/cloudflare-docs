---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: path
---

## Change health check target

### API 

You can configure the tunnel health check target IP address by updating your [GRE tunnels](/api/operations/magic-gre-tunnels-update-gre-tunnel) or [IPsec tunnels](/api/operations/magic-ipsec-tunnels-update-ipsec-tunnel).

Example:

```bash
curl --request PUT \
  --url https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/gre_tunnels/{tunnel_id} \
  --header 'Content-Type: application/json' \
  --header 'X-Auth-Email: ' \
  --data '{
  "health_check": {
    "target": "172.64.240.253"
  }
```

### Dashboard

You can also configure the tunnel health check target IP address in the Cloudflare dashboard, by changing the [**Health check target**]($1) to _Custom_, and configuring the IP address for your tunnel health check target to be one from within the prefix range `172.64.240.252/30`.