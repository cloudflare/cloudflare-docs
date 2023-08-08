---
pcx_content_type: how-to
title: Tunnel Virtual Networks
weight: 5
---

# Tunnel Virtual Networks

[Cloudflare Tunnel](/cloudflare-one/connections/connect-networks/) supports the creation and configuration of virtual networks. Tunnel Virtual Networks allow you to manage different private networks which have overlapping IP ranges.

For example, an organization may want to expose two distinct virtual private cloud (VPC) networks which they consider to be “production” and “staging”. However, if the two private networks happened to receive the same RFC 1918 IP assignment, there may be two different resources with the same IP address. By creating two separate virtual networks, you can deterministically route traffic to duplicative private addresses like `10.128.0.1/32` staging and `10.128.0.1/32` production. End users would then select which network to connect to by accessing their WARP client settings.

## Prerequisites

- [Install `cloudflared`](/cloudflare-one/connections/connect-networks/install-and-setup/tunnel-guide/local/#1-download-and-install-cloudflared) on each private network.

{{<render file="_warp-to-tunnel-client.md">}}

## Route IPs over virtual networks

The following example demonstrates how to add two overlapping IP routes to Cloudflare.

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
 
## Enable virtual networks

1. Within your staging environment, create a [configuration file](/cloudflare-one/connections/connect-networks/install-and-setup/tunnel-guide/local/local-management/configuration-file/) for `staging-tunnel`. The configuration file will be structured as follows:
   
    ```txt
    tunnel: <Tunnel-UUID>
    credentials-file: /root/.cloudflared/credentials-file.json
    warp-routing:
        enabled: true
    ```

2. Run your tunnel.

    ```sh
    $ cloudflared tunnel run staging-tunnel
    ```

3. Within your production environment, repeat Steps 1 and 2 for `production-tunnel`.

You can use now the Cloudflare WARP client to [switch between virtual networks](#connect-to-a-virtual-network).

## Connect to a virtual network

1. Open the WARP client on your device.

2. Go to **Settings** > **Gateway with WARP** > **Virtual Networks**.

3. Choose the virtual network you want to connect to, for example `staging-vnet`.

Now when you visit `10.128.0.3/32`, WARP routes your request to the staging environment.

## Delete a virtual network

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
