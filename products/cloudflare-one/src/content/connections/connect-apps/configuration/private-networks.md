---
order: 4
pcx-content-type: concept
title: "Private networks"
---

# Connect private networks

You can connect private networks and the services running in those networks to Cloudflare using [Cloudflare Tunnel](/glossary#cloudflare-tunnel). End users can then connect to those resources using the [WARP client](/connections/connect-devices/warp) by first authenticating into your organization's account. When users connect to an IP made available through Cloudflare Tunnel, WARP sends their connection through Cloudflare's network to the corresponding tunnel.

Cloudflare Tunnel relies on a piece of software, `cloudflared`, to create those connections. Administrators define the IPs available in that environment and associate them with the Tunnel. Users in your organization can then reach the service by enrolling into your organization's Cloudflare for Teams account and using the WARP agent.

Once enrolled, user endpoints will be able to connect to private [RFC 1918](https://tools.ietf.org/html/rfc1918) IP space and other ranges that you control. Applications running on those endpoints will be able to reach those private IPs as well in a private network model.
Cloudflare Tunnel relies on a piece of software, `cloudflared`, to create those connections.

To connect a private network to Cloudflare's edge, follow the guide below. You can also check out our [tutorial](/tutorials/warp-to-tunnel).

## Before you start

* [Install](/connections/connect-apps/install-and-setup/installation) `cloudflared` on your network.
* [Enable HTTP filtering](/policies/filtering/http-policies) by turning on the **Proxy** switch under **Settings** > **Network** > **L7 Firewall**.
* [Create device enrollment rules](/connections/connect-devices/warp/warp-settings#device-enrollment-permissions) to determine which devices can enroll to your Teams organization.
* [Install the WARP client](/connections/connect-devices/warp) on the devices you want to allow into your network.
* (optional) [Integrate your preferred identity provider](/identity/idp-integration) with Cloudflare for Teams. 

## Create a tunnel to connect your network

1. Authenticate `cloudflared` with the command below, which will launch a browser window and prompt you to log in with your Cloudflare account:

    ```bash
    $ cloudflared login
    ```
1. Next, you’ll create a tunnel with a user-friendly name to identify your network or environment. 

    ```bash
    $ cloudflared tunnel create acme-network
    ```

1. Finally, configure your tunnel with the IP/CIDR range of your private network. By doing this, you’re making the Cloudflare WARP agent aware that any requests to this IP range need to be routed to our new tunnel. 

    ```bash
    $ cloudflared tunnel route ip add 192.168.0.1/32
    ```
1. Confirm the routes enrolled with the following command:

    ```bash
    $ cloudflared tunnel route ip show
    ```

1. Next, create a configuration file for the tunnel. In this example, 

    ```txt
    tunnel: <Tunnel-UUID>
    credentials-file: /root/.cloudflared/credentials-file.json
    warp-routing:
    enabled: true
    ```

1. Run the Tunnel. Traffic inside of your organization, from enrolled WARP agents, will be sent to this instance when the destination is this private IP range:

    ```
    $ cloudflared tunnel run acme-network
    ```

## Allow users to connect to your network

On the Teams Dashboard, navigate to **Settings** > **Network** > **Split Tunnels** and click **Manage**.
* If you are using the feature in **Exclude** mode, the IP ranges you see listed are those that Cloudflare excludes from WARP encryption by default. If your network's IP/CIDR range is listed on this page, delete it.
* If you are using the feature in **Include** mode, the IP ranges you see listed are the only one Cloudflare is encrypting through WARP. Add your network's IP/CIDR range to the list.

## Configure devices to connect to your network

1. On the devices you want to connect to your network, install the Cloudflare root certificate. Find the certificate under **Settings** > **Devices** > **Certificates** and follow [these instructions](/connections/connect-devices/warp/install-cloudflare-cert).

1. Next, log in to the WARP client with Cloudflare for Teams on each of the devices you want to connect.
    * For desktop clients, go to **Account** > **Login with Cloudflare for Teams** and enter your organization's [team name](/glossary#team-name).
    * For mobile clients, open the *1.1.1.1 Faster Internet* application, tap the Menu button, go to **Accounts** and enter your organization's [team name](/glossary#team-name).

Users will now be able to reach resources on your network by navigating to any IP address in the range you have specified.
