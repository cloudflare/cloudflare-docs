---
pcx_content_type: how-to
title: Set up LTM with Tunnels
weight: 2
---

# Set up LTM with Cloudflare Tunnels

To be able to connect to private IP origins, Cloudflare Load Balancers require a [Cloudflare tunnel](/cloudflare-one/connections/connect-networks/) with an associated [virtual network](/cloudflare-one/connections/connect-networks/private-net/tunnel-virtual-networks/). These virtual networks should then be assigned to the private IP origins.

{{<Aside type="note">}}

Cloudflare does not currently support entering the same IP addresses, even when using different virtual networks.

{{</Aside>}}

You can configure the origin pool via the API or on the dashboard.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

Once you have Cloudflare tunnels with associated virtual networks configured, you can select them on the respective **Virtual Network** field displayed for each origin when you [create or edit a pool](/load-balancing/how-to/create-pool/#create-a-pool).

{{<Aside type="warning">}}

All origins with private IPs must have `virtual_network_id` specified.

{{</Aside>}}

{{</tab>}}
{{<tab label="api" no-code="true">}}

To get a list of your current virtual networks, use the [List virtual networks](/api/operations/tunnel-virtual-network-list-virtual-networks) API operation.

Enable Virtual IP support by adding the `virtual_network_id` field to the origins in you API request. Refer to the [Cloudflare Load Balancer API documentation](/api/operations/account-load-balancer-pools-create-pool) for more information on creating a pool using the API.

Consider the following example for updating an existing Load Balancer pool with a Virtual IP origin using cURL. 

{{<Aside type="warning">}}

All origins with private IPs must have `virtual_network_id` specified.

{{</Aside>}}

```bash
$ curl --request PATCH \
  --url https://api.cloudflare.com/client/v4/accounts/<account_id>/load_balancers/pools/<pool_id> \
  --header 'Content-Type: application/json' \
  --header 'X-Auth-Email: <email>' \
  --header 'X-Auth-Key: <key>' \
  --data '{
	"origins": [
		{
			"name": "origin-1",
			"address": "10.0.0.1",
			"enabled": true,
			"weight": 1,
			"virtual_network_id": "a5624d4e-044a-4ff0-b3e1-e2465353d4b4"
		}
	]
}'
```

{{</tab>}}
{{</tabs>}}