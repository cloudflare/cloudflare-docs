---
updated: 2024-02-07
category: 🔐 Zero Trust
difficulty: Intermediate
pcx_content_type: tutorial
title: Allow your users to change their egress IP address using Virtual Networks and Egress Policies
---

# Allow your users to change their egress IP address using Virtual Networks and Egress Policies

{{<Aside type="note">}}

Only available on Enterprise plans.

{{</Aside>}}

This tutorial gives administrators an easy way to allow their end-users to change their egress IP address between any of your assigned Dedicated Egress IP addresses directly from their user interface. This is valuable in QA and other similar scenarios in which users need to constantly switch between their local egress, and imitating the behavior or specific other egress locations.

{{<tutorial>}}

{{<tutorial-prereqs>}}

Make sure you have:

- [Deployed the WARP client](/cloudflare-one/connections/connect-devices/warp/deployment/) on your users' devices
- [Set up `cloudflared`](/cloudflare-one/connections/connect-networks/get-started/create-local-tunnel/) on your local device (steps 1 and 2)
- Received multiple [dedicated egress IP addresses](/cloudflare-one/policies/gateway/egress-policies/dedicated-egress-ips/)

{{</tutorial-prereqs>}}

{{<tutorial-step title="Create a virtual network">}}

1. Use `cloudflared` to create a [virtual network](/cloudflare-one/connections/connect-networks/private-net/cloudflared/tunnel-virtual-networks/).

    ```sh
    $ cloudflared tunnel vnet add <VNET_NAME>
    ```

2. Assign an IP route to the virtual network.

    ```sh
    $ cloudflared tunnel route ip add --vnet <VNET_NAME> <ip_range>
    ```

{{</tutorial-step>}}

{{<tutorial-step title="Create an egress policy">}}

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Gateway** > **Egress Policies**.
2. Select **Add a policy**.
3. Name your policy. We recommend including the country or region traffic will egress from.
4. Add the following expression.

    | Selector        | Operator | Value         |
    | --------------- | -------- | ------------- |
    | Virtual Network | is       | `<VNET_NAME>` |

5. In **Select an egress IP**, select **Use dedicated Cloudflare egress IPs**. Choose the dedicated IPv4 and IPv6 addresses you want traffic to egress with.

{{</tutorial-step>}}

{{<tutorial-step title="Test your egress policy">}}

1. On your user's machine, log in to Zero Trust in the WARP client.
2. Check the default egress IP address.

    ```sh
    $ curl ifconfig.me -4
    ```

3. In the WARP client, select the gear icon > **Virtual Networks** > _<VNET_NAME>_.
4. Check the egress IP address again.

    ```sh
    $ curl ifconfig.me -4
    ```

The traffic should be routed via the egress IP specified in the egress policy.

{{</tutorial-step>}}

{{</tutorial>}}
