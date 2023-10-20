---
pcx_content_type: how-to
title: Set up private IPs with Tunnel
weight: 2
---

# Set up private IPs with Cloudflare Tunnel

Consider the following steps to learn how to configure Cloudflare local traffic management (LTM) solution, using [Cloudflare Tunnel](/cloudflare-one/connections/connect-networks/) as the off-ramp to securely connect to your private/internal services.

## 1. Configure a Cloudflare tunnel with an assigned virtual network

The specific configuration steps can vary depending on your infrastructure and services you are looking to connect. If you are not familiar with Cloudflare Tunnel, the pages linked on each step provide more guidance.

1. [Create a tunnel](/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/#1-create-a-tunnel).
2. [Deploy the tunnel](/cloudflare-one/connections/connect-networks/deploy-tunnels/) to connect to the data center hosting the origin servers.
3. Create a [virtual network](/cloudflare-one/connections/connect-networks/private-net/cloudflared/tunnel-virtual-networks/) and assign it to the tunnel you configured in the previous steps.

{{<tabs labels="Dashboard | CLI">}}
{{<tab label="dashboard" no-code="true">}}

To create a virtual network:

1. Within the [Zero Trust dashboard](https://one.dash.cloudflare.com), go to **Settings** > **WARP Client** and find the **Virtual networks** setting.
2. Select **Add new** or **Manage** > **Create virtual network** to create virtual networks.
3. Define your virtual network name and select **Save**.

To assign the virtual network to the tunnel:

1. Go to **Access** > **Tunnels**.
2. Select the tunnel you created in the previous steps and select **Configure**.
3. Under **Private Network**, select **Add a private network**.
4. Specify an IP range under **CIDR** and select the virtual network under **Additional settings**.
5. Select **Save private network**.

{{</tab>}}
{{<tab label="cli" no-code="true">}}

To create a virtual network:

```sh
$ cloudflared tunnel vnet add <VNET_NAME>
```

To assign the virtual network to the tunnel:

```sh
$ cloudflared tunnel route ip add --vnet <VNET_NAME> <IP_RANGE> <TUNNEL_NAME>
```

{{</tab>}}
{{</tabs>}}

## 2. Configure Cloudflare Load Balancing

Once you have Cloudflare tunnels with associated virtual networks (VNets) configured, the VNets can be specified for each origin when you [create or edit a pool](/load-balancing/pools/create-pool/#create-a-pool). This will enable Cloudflare load balancers to use the correct tunnel and securely reach the private IP origins.

1. [Create the Load Balancing monitor](/load-balancing/monitors/create-monitor/) according to your needs.
2. [Create the origin pool](/load-balancing/pools/create-pool/) specifying your private origin IP addresses and corresponding virtual networks.

{{<Aside type="note">}}

* Currently, Cloudflare does not support entering the same origin IP addresses more than once, even when using different virtual networks.
* All origins with private IPs must have `virtual_network_id` specified.

{{</Aside>}}

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
  https://api.cloudflare.com/client/v4/accounts/<account_id>/load_balancers/pools/<pool_id> \
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

3. [Create the load balancer](/load-balancing/load-balancers/create-load-balancer/), specifying the pool and monitor you created in the previous steps, as well as the desired load-balancing method.