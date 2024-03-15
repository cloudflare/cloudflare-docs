---
pcx_content_type: how-to
title: Virtual networks
weight: 5
---

# Virtual networks

{{<details header="Feature availability">}}

| [WARP modes](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-modes/) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| -- | -- |
| <ul><li> Gateway with WARP</li><li> Secure Web Gateway without DNS filtering </li></ul>| <ul><li>All plans</li></ul>  |

| System   | Availability |
| ---------| -------------|
| Windows  | ✅           |
| macOS    | ✅           |
| Linux    | ✅           |
| iOS      | ✅           |
| Android  | ✅           |
| ChromeOS | ✅           |

{{</details>}}

{{<render file="tunnel/_virtual-networks-intro.md" productFolder="cloudflare-one">}}

## Use cases

Here are a few scenarios where virtual networks may prove useful:

- Manage production and staging environments that use the same address space.
- Manage acquisitions or mergers between organizations that use the same address space.
- Allow IT professional services to access their customer's network for various administration and management purposes.
- Allow developers or homelab users to deterministically route traffic through their home network to enforce additional security controls.
- Guarantee additional segmentation (beyond just policy enforcement) between networks and resources for security reasons, while keeping all configuration within a single Cloudflare account.

## Prerequisites

- [Install `cloudflared`](/cloudflare-one/connections/connect-networks/get-started/create-local-tunnel/#1-download-and-install-cloudflared) on each private network.
- [Deploy the WARP client](/cloudflare-one/connections/connect-devices/warp/deployment/) on user devices.

## Create a virtual network

The following example demonstrates how to add two overlapping IP routes to Cloudflare (`10.128.0.1/32` staging and `10.128.0.1/32` production).
{{<tabs labels="Dashboard | CLI">}}
{{<tab label="dashboard" no-code="true">}}

To route overlapping IPs over virtual networks:

1. First, create two unique virtual networks:
    1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Settings** > **WARP Client**.
    2. Find the **Virtual networks** setting and select **Manage**.
    3. Select **Create virtual network**.
    4. Name your virtual network `staging-vnet` and select **Save**.
    5. Repeat Steps 1a-1d to create another virtual network called `production-vnet`.
2. Next, create a Cloudflare Tunnel for each private network:
    1. Go to **Networks** > **Tunnels**.
    2. Select **Create a tunnel**.
    3. Name your tunnel `Staging tunnel` and select **Save tunnel**.
    4. Install the connector within your staging environment.
    5. In the **Private Network** tab, add `10.128.0.1/32`.
    6. Select **Additional settings**. Under **Virtual networks**, select _staging-vnet_.
    7. Save the tunnel.
    8. Repeat Steps 2a-2g to create another tunnel called `Production tunnel`. Be sure to install the connector within your production environment and assign the route to _production-vnet_.

We now have two overlapping IP addresses routed over `staging-vnet` and `production-vnet` respectively. You can use the Cloudflare WARP client to [switch between virtual networks](#connect-to-a-virtual-network).

{{</tab>}}
{{<tab label="cli" no-code="true">}}

To route overlapping IPs over virtual networks:

1. Create a tunnel for each private network:

    1. Within your staging environment, authenticate `cloudflared`:

        ```sh
        $ cloudflared login
        ```

    2. Create a tunnel to connect your staging network to Cloudflare.

        ```sh
        $ cloudflared tunnel create staging-tunnel
        ```

    3. Within your production environment, authenticate `cloudflared`:

        ```sh
        $ cloudflared login
        ```

    4. Create a tunnel to connect your production network to Cloudflare.

        ```sh
        $ cloudflared tunnel create production-tunnel
        ```

The following steps may be executed from any `cloudflared` instance.

2. Create two unique virtual networks.

    ```sh
    $ cloudflared tunnel vnet add staging-vnet
    $ cloudflared tunnel vnet add production-vnet
    ```

3. Before moving on, run the following command to verify that your newly created virtual networks are listed correctly:

    ```sh
    $ cloudflared tunnel vnet list
    ```

{{<Aside type="note" header="Default virtual network">}}

All accounts come pre-configured with a virtual network named `default`. You can choose a new default by typing `cloudflared tunnel vnet update --default <virtual-network-name>`.

{{</Aside>}}

4. Configure your tunnels with the IP/CIDR range of your private networks, and assign the tunnels to their respective virtual networks.

    ```sh
    $ cloudflared tunnel route ip add --vnet staging-vnet 10.128.0.3/32 staging-tunnel
    $ cloudflared tunnel route ip add --vnet production-vnet 10.128.0.3/32 production-tunnel
    ```

{{<Aside type="note">}}

If no `--vnet` option is specified, the tunnel will be assigned to the default virtual network; this applies to any pre-existing private networks in your account.

{{</Aside>}}

5. Verify that the IP routes are listed correctly:

    ```sh
    $ cloudflared tunnel route ip list
    ```

We now have two overlapping IP addresses routed over `staging-vnet` and `production-vnet` respectively.

6. Within your staging environment, create a [configuration file](/cloudflare-one/connections/connect-networks/configure-tunnels/local-management/configuration-file/) for `staging-tunnel`. The configuration file will be structured as follows:

    ```txt
    tunnel: <Tunnel-UUID>
    credentials-file: /root/.cloudflared/credentials-file.json
    warp-routing:
        enabled: true
    ```

7. Run your tunnel.

    ```sh
    $ cloudflared tunnel run staging-tunnel
    ```

8. Within your production environment, repeat Steps 6 and 7 for `production-tunnel`.

You can use now the Cloudflare WARP client to [switch between virtual networks](#connect-to-a-virtual-network).

{{</tab>}}
{{</tabs>}}

## Delete a virtual network

{{<tabs labels="Dashboard | CLI">}}
{{<tab label="dashboard" no-code="true">}}

To delete a virtual network:

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Networks** > **Tunnels** and ensure that no IP routes are assigned to the virtual network you are trying to delete. If your virtual network is in use, delete the route or reassign it to a different virtual network.

2. Next, go to **Settings** > **WARP Client**.

3. Find the **Virtual networks** setting and select **Manage**.

4. Select the three-dot menu for your virtual network and select **Delete**.

You can optionally delete the tunnel associated with your virtual network.

{{</tab>}}
{{<tab label="cli" no-code="true">}}

To delete a virtual network:

1. Delete all IP routes in the virtual network. For example,

    ```sh
    $ cloudflared tunnel route ip delete --vnet staging-vnet 10.128.0.3/32
    ```

2. (Optional) Delete the tunnel associated with the virtual network.

    ```sh
    $ cloudflared tunnel delete staging-tunnel
    ```

3. Delete the virtual network.

    ```sh
    $ cloudflared tunnel vnet delete staging-vnet
    ```

You can verify that the virtual network was successfully deleted by typing `cloudflared tunnel vnet list`.

{{</tab>}}
{{</tabs>}}

## Connect to a virtual network

### Windows, macOS, and Linux

1. Open the WARP client.
2. Go to **Settings** > **Gateway with WARP** > **Virtual Networks**.
3. Choose the virtual network you want to connect to, for example `staging-vnet`.

When you visit `10.128.0.3/32`, WARP will route your request to the staging environment.

### iOS, Android, and ChromeOS

1. Launch the Cloudflare One Agent app.
2. Go to **Advanced** > **Connection options** > **Virtual networks**.
3. Choose the virtual network you want to connect to, for example `staging-vnet`.

When you visit `10.128.0.3/32`, WARP will route your request to the staging environment.