---
updated: 2022-07-14
category: 🔐 Zero Trust
difficulty: Advanced
pcx-content-type: tutorial
title: Configure Zero Trust Network Access in Cloudflare Zero Trust
---

# Configure Zero Trust Network Access in Cloudflare Zero Trust

In this tutorial we will cover how to configure a Zero Trust Private Network in Cloudflare Zero Trust by combining device enrollment rules, Cloudflare Tunnels, and identity-based network policies.

**🗺️ This tutorial covers how to:**

- Create device enrollment rules and connect a device to Zero Trust
- Connect your private network server to Cloudflare's edge using Cloudflare Tunnels
- Create identity-aware network policies

**⏲️Time to complete:**

45 minutes

## Prerequisites

- A Zero Trust account setup
- The [WARP client](/cloudflare-one/connections/connect-devices/warp/) installed on a device and enrolled in a Zero Trust instance
- Admin access to server with Internet access

---

## Device enrollment

To start, enroll your devices into the WARP client. The WARP client is responsible for forwarding your traffic to Cloudflare and eventually to your private network.

1. Define [device enrollment rules](/cloudflare-one/connections/connect-devices/warp/warp-settings/#device-enrollment-permissions) under **Settings** > **Devices** > **Device enrollment permissions** > **Manage**.

    In this example, we require that users have a hard key inserted and are connecting from the United States.

    ![Example device enrollment rules requiring US-based users with hardware authentication keys](/cloudflare-one/static/zero-trust-security/ztna/device-enrollment-rules.png)

2. To enroll your device into your Zero Trust account, select the WARP client, and select **Settings** > **Account** > **Login with Cloudflare Zero Trust**.

3. To forward traffic to Cloudflare, enable the WARP client on the device.

## Server configuration

Next, you will need to configure your private network server to connect to Cloudflare’s edge using Cloudflare Tunnel. This will establish a secure outbound connection to Cloudflare.

1. Identify the server you want to use to securely make your private network available to users. This can be the origin server directly, a jumphost, or load balancer.

2. If your server or network has a firewall, follow [this guide](/cloudflare-one/connections/connect-devices/warp/deployment/firewall/) to open up the correct ports and IP addresses. Only outbound openings are required. You do not need to open any inbound holes in your firewall.

3. [Install `cloudflared`](/cloudflare-one/connections/connect-apps/install-and-setup/installation/) on the server.

4. Authenticate `cloudflared` on the server by running the following command, then follow the prompt to authenticate via URL provided.

    ```sh
    $ cloudflared tunnel login
    ```

5. Create a tunnel for the device:

    ```sh
    $ cloudflared tunnel create <TUNNEL NAME>
    ```

6. To find your tunnel ID, run `cloudflared tunnel list`. Create a YAML config file for the tunnel with the following configuration:

    ```txt
    tunnel: <YOUR TUNNEL ID>
    credentials-file: /root/.cloudflared/<YOUR TUNNEL ID>.json
    warp-routing:
      enabled: true
    ```

7. Run the tunnel:

    ```sh
    $ cloudflared tunnel run <TUNNEL NAME>
    ```

![Example terminal running cloudflared tunnel](/cloudflare-one/static/zero-trust-security/ztna/run-tunnel.png)

## Network configuration

Finally, you will need to establish the private RFC 1918 IP address or range that you would like to advertise to Cloudflare, as well as set the identity policies determining which users can access that particular IP or range.

1. Route the private IP addresses of your server’s network to Cloudflare, where:

    - `10.0.0.0/8` is the IP or CIDR range of your server
    - `8e343b13-a087-48ea-825f-9783931ff2a5` is your tunnel ID

    ```sh
    $ cloudflared tunnel route ip add 10.0.0.0/8 8e343b13-a087-48ea-825f-9783931ff2a5
    ```

2. Log in to your [Zero Trust dashboard](https://dash.teams.cloudflare.com/), select your account, and go to **Gateway** > **Policies**.

3. [Create a network policy](/cloudflare-one/policies/filtering/network-policies/) to allow traffic from specific users to reach that application. For example:

    | Selector       | Operator      | Value           | Action |
    |----------------|---------------|-----------------|--------|
    | Destination IP | in            | `10.0.0.0/8`    | Allow  |
    | User Email     | matches regex | `*@example.com` |        |

4. Create a second network policy to block all traffic to the IP range that was routed. For example:

    | Selector       | Operator      | Value           | Action |
    |----------------|---------------|-----------------|--------|
    | Destination IP | in            | `10.0.0.0/8`    | Block  |

5. To verify you do not have the desired target private IP range in the Split Tunnel configuration menu, go to **Settings** > **Network** > **Split Tunnels**.

Your setup is now complete. For more in-depth information on how identity-aware network policies work, read our [dedicated documentation page](/cloudflare-one/policies/filtering/network-policies/).
