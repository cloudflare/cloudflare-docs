---
updated: 2024-03-18
category: 🔐 Zero Trust
difficulty: Intermediate
pcx_content_type: tutorial
title: Use virtual networks to change user egress IPs
---

# Use virtual networks to change user egress IPs

{{<Aside type="note">}}

Only available on Enterprise plans.

{{</Aside>}}

This tutorial gives administrators an easy way to allow their users to change their egress IP address between any of your assigned dedicated egress IP addresses. Your users can choose which egress IP to use by switching virtual networks directly from in the WARP client.

Changing egress IPs can be useful in quality assurance (QA) and other similar scenarios in which users both use their local egress location and either switch to or simulate other remote locations.

{{<tutorial>}}

{{<tutorial-prereqs>}}

Make sure you have:

- [Deployed the WARP client](/cloudflare-one/connections/connect-devices/warp/deployment/) on your users' devices.
- [Configured tunnels](/cloudflare-one/connections/connect-networks/private-net/cloudflared/) to connect your private network to Cloudflare. This tutorial assumes you have:
  - Created two tunnels [through the dashboard](/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/).
  - Routed `10.0.0.0/8` through one tunnel.
  - Routed `192.168.88.0/24` through the other tunnel.
- Received multiple [dedicated egress IP addresses](/cloudflare-one/policies/gateway/egress-policies/dedicated-egress-ips/).

{{</tutorial-prereqs>}}

{{<tutorial-step title="Create a virtual network for each egress route">}}

First, create [virtual networks](/cloudflare-one/connections/connect-networks/private-net/cloudflared/tunnel-virtual-networks/) corresponding to your dedicated egress IPs.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Settings** > **WARP Client**.
2. In **Network locations**, go to **Virtual networks** and select **Manage**.
3. Select **Create virtual network**.
4. Name your virtual network. We recommend using a name related to the location of the corresponding dedicated egress IP. For example, if your users will egress from the Americas, you can name the virtual network `vnet-AMER`.
5. Select **Save**.
6. Repeat Steps 3-5 for each dedicated egress IP you want users to switch between. For example, you can create another virtual network called `vnet-EMEA` for egress from Europe, the Middle East, and Africa.

{{</tab>}}

{{<tab label="api" no-code="true">}}

1. Create a [virtual network](/cloudflare-one/connections/connect-networks/private-net/cloudflared/tunnel-virtual-networks/) corresponding to one of your dedicated egress IPs. We recommend using a name related to the location of the corresponding dedicated egress IP. For example, if your users will egress from the Americas, you can name the virtual network `vnet-AMER`.

    ```bash
    curl https://api.cloudflare.com/client/v4/accounts/{account_id}/teamnet/virtual_networks \
      --header "Authorization: Bearer <API_TOKEN>" \
      --header 'Content-Type: application/json' \
      --data '{
      "comment": "Virtual network to egress from the Americas",
      "is_default": false,
      "name": "vnet-AMER"
    }'
    ```

    For more information, refer to [Create a virtual network](/api/operations/tunnel-virtual-network-create-a-virtual-network).

2. Repeat Step 1 for each dedicated egress IP you want users to switch between. For example, you can create another virtual network called `vnet-EMEA` for egress from Europe, the Middle East, and Africa.

{{</tab>}}
{{</tabs>}}

{{</tutorial-step>}}

{{<tutorial-step title="Assign each virtual network to each tunnel">}}

After creating your virtual networks, route your private network CIDRs over each virtual network. This ensures that users can reach all services on your network regardless of which egress IP they use.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. Go to **Networks** > **Tunnels**.
2. Select your tunnel routing `10.0.0.0/8`, then select **Configure**.
3. Go to **Private Network**. Select the `10.0.0.0/8` route.
4. In **Additional settings**, choose your first virtual network. For example, `vnet-AMER`.
5. Select **Save private network**.
6. To route `10.0.0.0/8` over another virtual network, select **Add a private network**.
7. In **CIDR**, enter `10.0.0.0/8`. In **Additional settings**, choose your second virtual network. For example, `vnet-EMEA`.
8. Select **Save private network**.
9. Repeat Steps 6-8 for each virtual network you created.
10. Return to **Networks** > **Tunnels**. Repeat Steps 2-9 for each private network tunnel route.

{{</tab>}}

{{<tab label="api" no-code="true">}}

1. Assign your first virtual network to your private network route. For example, assign `vnet-AMER` to your tunnel that routes `10.0.0.0/8`:

    ```bash
    curl --request PATCH \
    https:https://api.cloudflare.com/client/v4/accounts/{account_id}/teamnet/routes/{route_id} \
      --header "Authorization: Bearer <API_TOKEN>" \
      --header 'Content-Type: application/json' \
      --data '{
      "network": "10.0.0.0/8",
      "tunnel_id": <TUNNEL_UUID>,
      "virtual_network_id": <VNET_AMER_UUID>
    }'
    ```

    For more information, refer to [Update a tunnel route](/api/operations/tunnel-route-update-a-tunnel-route).

2. Repeat this process for each virtual network you created. For example:

    ```bash
    curl --request PATCH \
    https:https://api.cloudflare.com/client/v4/accounts/{account_id}/teamnet/routes/{route_id} \
      --header "Authorization: Bearer <API_TOKEN>" \
      --header 'Content-Type: application/json' \
      --data '{
      "network": "10.0.0.0/8",
      "tunnel_id": <TUNNEL_UUID>,
      "virtual_network_id": <VNET_EMEA_UUID>
    }'
    ```

3. Repeat Steps 1-2 for each private network tunnel route.

{{</tab>}}
{{</tabs>}}

Each tunnel connected to your private network should have each of your virtual networks assigned to it. For example, if you have tunnels routing `10.0.0.0/8` and `192.168.88.0/24`, both tunnels should have the `vnet-AMER` and `vnet-EMEA` virtual networks assigned.

| Tunnel       | CIDR              | Virtual network |
|--------------|-------------------|-----------------|
| **Tunnel 1** | `10.0.0.0/8`      | `vnet-AMER`     |
|              | `10.0.0.0/8`      | `vnet-EMEA`     |
| **Tunnel 2** | `192.168.88.0/24` | `vnet-AMER`     |
|              | `192.168.88.0/24` | `vnet-EMEA`     |

{{</tutorial-step>}}

{{<tutorial-step title="Create virtual network egress policies">}}

Next, assign your dedicated egress IPs to each virtual network using Gateway egress policies.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Gateway** > **Egress Policies**.
2. Select **Add a policy**.
3. Name your policy. We recommend including the country or region traffic will egress from.
4. Add the virtual network with the _Virtual Network_ selector. For example:

    | Selector        | Operator | Value       |
    | --------------- | -------- | ----------- |
    | Virtual Network | is       | _vnet-AMER_ |

5. In **Select an egress IP**, choose **Use dedicated Cloudflare egress IPs**. Choose the dedicated IPv4 and IPv6 addresses you want traffic to egress with.
6. Select **Create policy**.
7. Repeat Steps 1-6 to create a separate egress policy for each virtual network you created.

{{</tab>}}

{{<tab label="api" no-code="true">}}

1. Add a Gateway egress policy that matches the corresponding virtual network. For example:

    ```bash
    curl https://api.cloudflare.com/client/v4/accounts/{account_id}/gateway/rules \
      --header "Authorization: Bearer <API_TOKEN>" \
      --header 'Content-Type: application/json' \
      --data '{
      "action": "egress",
      "description": "Egress via North America by connecting to vnet-AMER",
      "enabled": true,
      "filters": [
      "egress"
      ],
      "name": "Egress AMER vnet",
      "precedence": 0,
      "traffic": "net.vnet_id == <VNET_AMER_UUID>",
      "rule_settings": {
        "egress": {
          "ipv6": <DEDICATED_IPV6_ADDRESS>,
          "ipv4": <DEDICATED_IPV4_ADDRESS>,
          "ipv4_fallback": <SECONDARY_DEDICATED_IPV6_ADDRESS>
          }
      }
    }'
    ```

    For more information, refer to [Create a Zero Trust Gateway rule](/api/operations/zero-trust-gateway-rules-create-zero-trust-gateway-rule).

2. Repeat Step 1 to create an egress policy for each virtual network you created.

{{</tab>}}
{{</tabs>}}

Each policy you create should correspond to a different primary dedicated egress IP.

{{</tutorial-step>}}

{{<tutorial-step title="Test virtual network egress">}}

{{<details header="Windows, macOS, and Linux" open="true">}}

1. On your user's device, log in to your Zero Trust organization in the WARP client.
2. In a terminal, run the following command to check the default egress IP address.

    ```sh
    $ curl ifconfig.me -4
    ```

    The command should output your organization's default egress IP.

3. In the WARP client, select the gear icon > **Virtual Networks**. Choose a virtual network you created.
4. Check the egress IP address by running `curl ifconfig.me -4` again. The command should output the IP address specified in your egress policy.

{{</details>}}

{{<details header="iOS and Android">}}

1. On your user's device, log in to your Zero Trust organization in the Cloudflare One Agent app.
2. In a browser, go to [ifconfig.me](https://ifconfig.me/). Your organization's default egress IP should appear in **IP Address**.
3. In Cloudflare One Agent, go to **Advanced** > **Connection options** > **Virtual networks**. Choose a virtual network you created.
4. Check the egress IP address by reloading the browser page from Step 1. The IP address specified in your egress policy should appear in **IP Address**.

{{</details>}}

While your users are connected to a virtual network, their traffic will route via the dedicated egress IP specified. You can repeat these steps to test that each virtual network is egressing from the correct IP.

{{</tutorial-step>}}

{{</tutorial>}}
