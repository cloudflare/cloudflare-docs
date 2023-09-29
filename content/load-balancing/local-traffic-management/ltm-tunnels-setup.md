---
pcx_content_type: how-to
title: Set up LTM with Tunnel
weight: 2
---

# Set up LTM with Cloudflare Tunnel

Consider the following steps to learn how to configure Cloudflare local traffic management (LTM) solution, using [Cloudflare Tunnel](/cloudflare-one/connections/connect-networks/) as the off-ramp to securely connect to your private/internal services.

## 1. Configure a Cloudflare tunnel with an assigned VNet

The specific configuration steps can vary depending on your infrastructure and services you are looking to connect.
If you are not familiar with Cloudflare Tunnel, the pages linked on each step provide more guidance.

1. [Create a tunnel](/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/#1-create-a-tunnel).
2. [Deploy the tunnel](/cloudflare-one/connections/connect-networks/deploy-tunnels/) to connect to the data center hosting the origin servers.
3. [Create a virtual network](/cloudflare-one/connections/connect-networks/private-net/tunnel-virtual-networks/).

```sh
$ cloudflared tunnel vnet add <VNET_NAME>
```

4. Assign the virtual network and IP range to the tunnel you created in step 1.

```sh
$ cloudflared tunnel route ip add --vnet <VNET_NAME> <IP_RANGE> <TUNNEL_NAME>
```

## 2. Configure Cloudflare Load Balancing

Once you have Cloudflare tunnels with associated virtual networks (VNETs) configured, the VNETs can be specified for each origin when you [create or edit a pool](/load-balancing/how-to/create-pool/#create-a-pool). This will enable Cloudflare load balancers to use the correct tunnel and securely reach the private IP origins.

1. [Create the Load Balancing monitor](/load-balancing/how-to/create-monitor/) according to your needs.
2. [Create the origin pool](/load-balancing/how-to/create-pool/) specifying your private origin IP addresses and corresponding virtual networks.

{{<Aside type="note">}}

* Currently, Cloudflare does not support entering the same origin IP addresses more than once, even when using different virtual networks.
* All origins with private IPs must have `virtual_network_id` specified.

{{</Aside>}}

You can create the origin pool via the API or on the dashboard.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

{{<render file="_pool-create.md">}}

{{</tab>}}
{{<tab label="api" no-code="true">}}

To get a list of your current virtual networks, use the [List virtual networks](/api/operations/tunnel-virtual-network-list-virtual-networks) API operation.

Enable virtual/private IP support by adding the `virtual_network_id` field to the origins in you API request. Refer to the [Cloudflare Load Balancer API documentation](/api/operations/account-load-balancer-pools-create-pool) for more information on how to create a pool using the API.

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

3. [Create the load balancer](/load-balancing/how-to/create-load-balancer/), specifying the pool and monitor you created in the previous steps, as well as the desired load-balancing method.