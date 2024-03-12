---
updated: 2024-03-11
category: 🔐 Zero Trust
difficulty: Intermediate
pcx_content_type: tutorial
title: Use virtual networks to change user egress IPs
---

# Use virtual networks to change user egress IPs

{{<Aside type="note">}}

Only available on Enterprise plans.

{{</Aside>}}

This tutorial gives administrators an easy way to allow their users to change their egress IP address between any of your assigned dedicated egress IP addresses directly from their WARP client. Changing egress IPs may be useful in quality assurance (QA) and other similar scenarios in which users both use their local egress location and either switch to or simulate other remote locations.

{{<tutorial>}}

{{<tutorial-prereqs>}}

Make sure you have:

- [Deployed the WARP client](/cloudflare-one/connections/connect-devices/warp/deployment/) on your users' devices.
- [Set up a tunnel using `cloudflared`](/cloudflare-one/connections/connect-networks/get-started/create-local-tunnel/) on your local device.
- Received multiple [dedicated egress IP addresses](/cloudflare-one/policies/gateway/egress-policies/dedicated-egress-ips/).

{{</tutorial-prereqs>}}

{{<tutorial-step title="Create a virtual network">}}

1. In a terminal, use `cloudflared` to create a [virtual network](/cloudflare-one/connections/connect-networks/private-net/cloudflared/tunnel-virtual-networks/).

    ```sh
    $ cloudflared tunnel vnet add <VNET_NAME>
    ```

2. Configure your virtual network to use the entire private IP range and assign the corresponding tunnel.

    ```sh
    $ cloudflared tunnel route ip add --vnet <VNET_NAME> 10.0.0.0/8 <TUNNEL_NAME>
    ```

    ```sh
    $ cloudflared tunnel route ip add --vnet <VNET_NAME> 192.168.88.0/24 <TUNNEL_NAME>
    ```

3. Repeat Steps 1-2 for each dedicated egress IP you would like to use. For example, you can create separate virtual networks for your users in North America and in Europe.

{{</tutorial-step>}}

{{<tutorial-step title="Create an egress policy">}}

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Gateway** > **Egress Policies**.
2. Select **Add a policy**.
3. Name your policy. We recommend including the country or region traffic will egress from.
4. Add the following expression.

    | Selector        | Operator | Value         |
    | --------------- | -------- | ------------- |
    | Virtual Network | is       | _<VNET_NAME>_ |

5. In **Select an egress IP**, choose **Use dedicated Cloudflare egress IPs**. Choose the dedicated IPv4 and IPv6 addresses you want traffic to egress with.

{{</tutorial-step>}}

{{<tutorial-step title="Test your egress policy">}}

1. On your user's machine, log in to Zero Trust in the WARP client.
2. In a terminal, run the following command to check the default egress IP address.

    ```sh
    $ curl ifconfig.me -4
    ```

3. In the WARP client, select the gear icon > **Virtual Networks**. Choose the virtual network you created.
4. Check the egress IP address again by running the command from Step 1. Traffic should be routed via the egress IP specified in the egress policy.

You can repeat this tutorial to create separate virtual networks for each dedicated egress IP assigned to your account.

{{</tutorial-step>}}

{{</tutorial>}}
