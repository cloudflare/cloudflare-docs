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
  - Created two tunnels [through the dashboard](/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/) or [migrated legacy tunnels](/cloudflare-one/connections/connect-networks/do-more-with-tunnels/migrate-legacy-tunnels/).
  - Routed `10.0.0.0/8` through one tunnel.
  - Routed `192.168.88.0/24` through the other tunnel.
- Received multiple [dedicated egress IP addresses](/cloudflare-one/policies/gateway/egress-policies/dedicated-egress-ips/).

{{</tutorial-prereqs>}}

{{<tutorial-step title="Create a virtual network for each egress route">}}

First, create [virtual networks](/cloudflare-one/connections/connect-networks/private-net/cloudflared/tunnel-virtual-networks/) corresponding to your dedicated egress IPs.

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Settings** > **WARP Client**.
2. In **Network locations**, go to **Virtual networks** and select **Manage**.
3. Select **Create virtual network**.
4. Name your virtual network. We recommend using a name related to the location of the corresponding dedicated egress IP. For example, if your users will egress from North America, you can name the virtual network `vnet-AMER`.
5. Select **Save**.
6. Repeat Steps 3-5 for each dedicated egress IP you want users to switch between. For example, you can create another virtual network called `vnet-EMEA` for egress from Europe.

{{</tutorial-step>}}

{{<tutorial-step title="Assign each virtual network to each tunnel">}}

After creating your virtual networks, assign each virtual network to your tunnels routing your private network.

1. Go to **Networks** > **Tunnels**.
2. Select your tunnel routing `10.0.0.0/8`, then select **Configure**.
3. Go to **Private Network**. Select your first `10.0.0.0/8` route.
4. In **Additional settings**, choose your first virtual network. For example, `vnet-AMER`.
5. Select **Save private network**.
6. To additional virtual networks to the tunnel, select **Add a private network**.
7. In **CIDR**, enter `10.0.0.0/8`. In **Additional settings**, choose your second virtual network. For example, `vnet-EMEA`.
8. Select **Save private network**.
9. Repeat Steps 6-8 for each virtual network you created.
10. Return to **Networks** > **Tunnels**. Repeat Steps 2-9 for each tunnel route.

Each tunnel connected to your private network should have each of your virtual networks assigned to it. For example, if you have tunnels routing `10.0.0.0/8` and `192.168.88.0/24`, both tunnels should have `vnet-AMER` and `vnet-EMEA` assigned.

{{</tutorial-step>}}

{{<tutorial-step title="Create virtual network egress policies">}}

Next, assign your dedicated egress IPs to each virtual network using Gateway egress policies.

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

{{</tutorial-step>}}

{{<tutorial-step title="Test virtual network egress">}}

1. On your user's machine, log in to your Zero Trust organization in the WARP client.
2. In a terminal, run the following command to check the default egress IP address.

    ```sh
    $ curl ifconfig.me -4
    ```

    The command should output your organization's default egress IP.

3. In the WARP client, select the gear icon > **Virtual Networks**. Choose a virtual network you created.
4. Check the egress IP address by running `curl ifconfig.me -4` again. The command should output the IP address specified in your egress policy.

While your users are connected to a virtual network, their traffic will route via the dedicated egress IP specified. You can repeat these steps to test that each virtual network is egressing from the correct IP.

{{</tutorial-step>}}

{{</tutorial>}}
