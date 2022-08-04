---
pcx-content-type: concept
title: Private networks
weight: 5
meta:
  title: Connect private networks
---

# Connect private networks

You can connect private networks and the services running in those networks to Cloudflare using [Cloudflare Tunnel](/cloudflare-one/glossary/#cloudflare-tunnel). End users can then connect to those resources using the [WARP client](/cloudflare-one/connections/connect-devices/warp/). When users connect to an IP made available through Cloudflare Tunnel, WARP sends their connection through Cloudflare's network to the corresponding tunnel.

Cloudflare Tunnel relies on a piece of software, `cloudflared`, to create those connections. Administrators define the IPs available in that environment and associate them with the tunnel. Users in your organization can then reach the service by [enrolling](/cloudflare-one/connections/connect-devices/warp/deployment/) into your organization's Cloudflare Zero Trust account and using the WARP client.

To connect a private network to Cloudflare's edge, follow the guide below. You can also check out our [tutorial](/cloudflare-one/tutorials/warp-to-tunnel/).

## Before you start

*   [Install](/cloudflare-one/connections/connect-apps/install-and-setup/installation/) `cloudflared`.
*   [Set up HTTP filtering](/cloudflare-one/policies/filtering/initial-setup/http/).
*   [Create device enrollment rules](/cloudflare-one/connections/connect-devices/warp/warp-settings/#device-enrollment-permissions) to determine which devices can enroll to your Zero Trust organization.
*   [Install the WARP client](/cloudflare-one/connections/connect-devices/warp/) on the devices you want to allow into your network.
*   (optional) [Integrate your preferred identity provider](/cloudflare-one/identity/idp-integration/) with Cloudflare Zero Trust.

## Create a tunnel to connect your network

1.  Authenticate `cloudflared` with the command below. The command will launch a browser window where you will be prompted to log in with your Cloudflare account and pick any zone you have added to Cloudflare.

    ```bash
    $ cloudflared login
    ```

1.  Create a tunnel with a user-friendly name to identify your network or environment.

    ```bash
    $ cloudflared tunnel create acme-network
    ```

1.  Finally, configure your tunnel with the IP/CIDR range of your private network. By doing this, you are creating a private network and making the WARP client aware that any requests to this IP range need to be routed to your new tunnel.

    ```bash
    $ cloudflared tunnel route ip add 10.0.0.0/8 acme-network
    ```

1.  Confirm the routes enrolled with the following command:

    ```bash
    $ cloudflared tunnel route ip show
    ```

1.  Next, create a [configuration file](/cloudflare-one/connections/connect-apps/configuration/local-management/configuration-file/) for the tunnel. The configuration file will be structured as follows:

    ```txt
    tunnel: <Tunnel-UUID>
    credentials-file: /root/.cloudflared/credentials-file.json
    warp-routing:
        enabled: true
    ```

1.  Run the tunnel. Traffic inside of your organization coming from enrolled WARP clients will be sent to this instance when the destination is your private IP range.

        $ cloudflared tunnel run acme-network

## (optional) Ensure that traffic can reach your network

By default, Cloudflare Zero Trust [excludes traffic](/cloudflare-one/connections/connect-devices/warp/exclude-traffic/split-tunnels/) to a specific set of destinations from WARP encryption. If you have not changed your default Split Tunnel settings, you can skip this step. If you have altered this configuration, for example by adding or removing entries to the Exclude list or by setting Split Tunnels mode to **Include**, make sure that traffic to the IP/CIDR you are associating with your private network is set to be encrypted by WARP.

To check that, navigate to **Settings** > **Network** > **Split Tunnels** on the Zero Trust Dashboard, and click **Manage**.

*   If you are using the feature in **Exclude** mode, the IP ranges you see listed are those that Cloudflare excludes from WARP encryption by default. If your network's IP/CIDR range is listed on this page, delete it.
*   If you are using the feature in **Include** mode, the IP ranges you see listed are the only one Cloudflare is encrypting through WARP. Add your network's IP/CIDR range to the list.

## Configure devices to connect to your network

1.  On the devices you want to connect to your network, install the Cloudflare root certificate. This step is optional if TLS decryption under **Settings** > **Network** > **Firewall** is disabled for this device. You can find the certificate under **Settings** > **Devices** > **Certificates** and follow [these instructions](/cloudflare-one/connections/connect-devices/warp/install-cloudflare-cert/).

1.  Next, [log in](/cloudflare-one/connections/connect-devices/warp/deployment/) to the WARP client with Cloudflare for Teams on each of the devices you want to connect.
    *   For desktop clients, go to **Account** > **Login with Cloudflare for Teams** and enter your organization's [team name](/cloudflare-one/glossary/#team-name).
    *   For mobile clients, open the *1.1.1.1 Faster Internet* application, tap the Menu button, go to **Accounts** and enter your organization's [team name](/cloudflare-one/glossary/#team-name).

Users will now be able to reach any HTTP or TCP-based service on your network by navigating to any IP address in the range you have specified. Users can also visit `https://help.teams.cloudflare.com/` to ensure that:

*   The page returns **Your network is fully protected**.
*   Both **WARP** and **Gateway Proxy** are enabled in the **HTTP filtering** section.
*   The team name matches the expected organization. This team name must belong to the same Cloudflare account from which the tunnel is running.
