---
pcx_content_type: how-to
title: Set up LTM with Magic WAN
weight: 3
---

# Set up LTM with Magic WAN

Consider the following steps to learn how to configure Cloudflare local traffic management (LTM) solution, using [Magic WAN](/magic-wan/) as the on-ramp and off-ramp to securely connect to your private or internal services. This is currently an API only feature.

## 1. Configure a virtual network for Magic Wan

1. Create and [configure virtual networks](/cloudflare-one/connections/connect-networks/private-net/cloudflared/tunnel-virtual-networks/#create-a-virtual-network) using either the Cloudflare UI or the Cloudflare API.

2. Set your virtual network as the default. Your load balancer will use the `default` virtual network. In the [API](/api/operations/tunnel-virtual-network-create-a-virtual-network), specify the default virtual network by setting `is_default_network = true`.

3. Retrieve the ID of the virtual network you created. To get the VNET ID, send a `GET` request to the following API endpoint:

```txt
https://api.cloudflare.com/client/v4/accounts/{account_id}/teamnet/virtual_networks?is_default=true
```

The VNET ID value will be used to ensure that your load balancer is properly integrated with the specified virtual network.

## 2. Configure an Account Load Balancer

1. Once you have your [VNets configured](/load-balancing/local-traffic-management/ltm-magic-wan/#1-configure-a-virtual-network-for-magic-wan), you need to make sure that the [pools](/load-balancing/pools/create-pool/) you will be using with your load balancer are configured with the default VNet value in the **Virtual Network** field.

2. Next, create an Account Load Balancer by sending a `POST` request to the following API endpoint. The request body should be structured similarly to a Zone Load Balancer. Refer to the [Cloudflare API documentation](/api/operations/load-balancers-create-load-balancer#request-body) for details on the required fields and their formats. Make sure that the pools you are using in your load balancer have the default VNET configured (previous step).

```txt
https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/load_balancers/
```

To retrieve a list of all created Account Load Balancers, send a `GET` request to the same endpoint.

3. The `tunnel_id` parameter of the created Load Balancer is necessary for subsequent requests, so make sure to save the `tunnel_id` when you receive it in the response of the `POST` request. You can also retrieve the `tunnel_id` from the `GET` request if you need it for future operations.

## 3. Deploy route to access LB

To access the new load balancer, you need to create a tunnel route. This will be done automatically for you, but in case you would need to create one yourself or add an additional one, you need to:

1. Use the `tunnel_id` of the Account Load Balancer, retrieved in the previous step. By using the `tunnel_id` of the Account Load Balancer and assigning a private network IP we are making the Load Balancer available at that IP address on the associated virtual network.

2. To create a route for your Load Balancer, send a [`POST`](/api/operations/tunnel-route-create-a-tunnel-route) request to following endpoint with this sample body:

```bash
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/teamnet/routes \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{
"comment": "Example comment - account load balancing",
  "network": "<DEFAULT_VNET>,
  "tunnel_id": "<TUNNEL_ID>"
}'
```

After completing these steps, the load balancer should be deployed with the selected private IP address and available to traffic on the same virtual network.