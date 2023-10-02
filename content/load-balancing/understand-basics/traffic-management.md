---
pcx_content_type: concept
title: Local Traffic Management
weight: 17
---

# Local Traffic Management

Local Traffic Management enables you to load balance traffic within a data center between your servers, eliminating the need for hardware appliances and allowing you to move infrastructure to the cloud to benefit from elastic scalability and reliability. Local Traffic Management has the ability to support virtual IPs, private IPs, and public IPs as origin values in a customer data center.

## Set up

To be able to connect to private IP origins, Cloudflare Load Balancers require a [Cloudflare tunnel](/cloudflare-one/connections/connect-networks/) with an associated [virtual network](/cloudflare-one/connections/connect-networks/private-net/tunnel-virtual-networks/). These virtual networks should then be assigned to the private IP origins.

{{<Aside type="note">}}

Cloudflare does not currently support entering the same IP addresses, even when using different virtual networks.

{{</Aside>}}

You can configure the origin pool via the API or on the dashboard.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

Once you have Cloudflare tunnels with associated virtual networks configured, you can select them on the respective **Virtual Network** field displayed for each origin when you [create or edit a pool](/load-balancing/pools/create-pool/#create-a-pool).

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

## Health monitor support

Traffic steering decisions or failover relies on the health information of IPs and pools. Local Traffic Management supports health monitors on your virtual and private IPs.

Before, you could only enter tunnel addresses in your load balancer and configure health monitor requests to your tunnels. Now, you have the ability to input your IPs directly as origins within your load balancer and set up health monitors for them instead of only the tunnels. You will be able to leverage existing health monitoring to your virtual and private IPs, along with the current functionality of public IPs. 

Health monitors automatically work once the origin and VNet Tunnel association is configured. Cloudflare determines the health of the Tunnel and the private targets.

## Off-ramps

You can use off-ramps to create a direct and secure way to connect into your networks that are not publicly available. Different architectures require different types of security implementations, which is why Cloudflare Load Balancing will integrate multiple off-ramps to the customer network to ensure that it is ready to handle customer requirements and integrations.

### Use cases

**Any requests originating from the public Internet and directed to a private/internal service address that is not publicly available or accessible.**

You can route requests from the Internet to your internal services on internal IPs, such as accounting or production automation systems, using Cloudflare Tunnels.

**Customers want the ability to intelligently route traffic.**

This will allow customers to benefit from failover for their private traffic and have the ability to monitor the health these targets directly rather than load balancing to a tunnel and monitoring the health of the tunnel itself. 

You can input your private targets in the same manner as you do today with public IPs, only needing to specify a VNet which is already configured with your tunnels and can utilize all of our applicable steering methods. You can monitor the health of these targets directly rather than only the tunnel health and leverage simple steering that Tunnels offers today.

### Support

Today, Local Traffic Management supports Tunnels off-ramps. In the future, we plan to support GRE Tunnels and IPSec Tunnels.
