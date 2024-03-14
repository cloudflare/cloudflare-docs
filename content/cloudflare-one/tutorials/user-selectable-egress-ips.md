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

This tutorial gives administrators an easy way to allow their users to change their egress IP address between any of your assigned dedicated egress IP addresses. Your users can choose which egress IP to use by switching virtual networks directly from in the WARP client.

Changing egress IPs can be useful in quality assurance (QA) and other similar scenarios in which users both use their local egress location and either switch to or simulate other remote locations.

{{<tutorial>}}

{{<tutorial-prereqs>}}

Make sure you have:

- [Deployed the WARP client](/cloudflare-one/connections/connect-devices/warp/deployment/) on your users' devices.
- [Installed `cloudflared`](/cloudflare-one/connections/connect-networks/get-started/create-local-tunnel/) on your private networks.
- Received multiple [dedicated egress IP addresses](/cloudflare-one/policies/gateway/egress-policies/dedicated-egress-ips/).

{{</tutorial-prereqs>}}

{{<tutorial-step title="Connect your private networks">}}

{{</tutorial-step>}}

{{<tutorial-step title="Create virtual networks">}}

First, create a virtual network for the dedicated egress IP you want your users to egress from. For example, you can create a virtual network for a specific office location.

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

{{</tutorial-step>}}

{{<tutorial-step title="Create an egress policy">}}

Next, assign dedicated egress IPs to each virtual network using Gateway egress policies.

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Gateway** > **Egress Policies**.
2. Select **Add a policy**.
3. Name your policy. We recommend including the country or region traffic will egress from.
4. Add the following expression.

    | Selector        | Operator | Value         |
    | --------------- | -------- | ------------- |
    | Virtual Network | is       | _<VNET_NAME>_ |

5. In **Select an egress IP**, choose **Use dedicated Cloudflare egress IPs**. Choose the dedicated IPv4 and IPv6 addresses you want traffic to egress with.
6. Select **Create policy**.

{{</tutorial-step>}}

{{<tutorial-step title="Test virtual network egress">}}

1. On your user's machine, log in to your Zero Trust organization in the WARP client.
2. In a terminal, run the following command to check the default egress IP address.

    ```sh
    $ curl ifconfig.me -4
    ```

    The command should output your organization's default egress IP.

3. In the WARP client, select the gear icon > **Virtual Networks**. Choose the virtual network you created.
4. Check the egress IP address again by running the command from Step 1. The command should output the IP address specified in your egress policy.

While your users are connected to this virtual network, their traffic will route via the dedicated egress IP specified. You can repeat this tutorial to create separate virtual networks for each dedicated egress IP assigned to your account.

{{</tutorial-step>}}

{{</tutorial>}}
