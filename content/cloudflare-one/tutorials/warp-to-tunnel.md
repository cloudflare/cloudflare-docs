---
updated: 2022-07-15
category: 🌐 Connections
difficulty: Advanced
pcx_content_type: tutorial
title: Connect from WARP to a private network on Cloudflare using Cloudflare Tunnel
---

# Connect from WARP to a private network on Cloudflare using Cloudflare Tunnel

You can use [Cloudflare Tunnel](/cloudflare-one/connections/connect-apps/) to connect applications and services to Cloudflare's network. Cloudflare Tunnel relies on a piece of software, `cloudflared`, to create those connections.

You can create and configure Cloudflare Tunnel connections to [support multiple HTTP origins](/cloudflare-one/tutorials/multi-origin/) or [multiple protocols simultaneously](/cloudflare-one/tutorials/gitlab/). You can also use Cloudflare Tunnel to connect any service that relies on a TCP-based protocol to Cloudflare's network. Users in your organization can then reach the service by enrolling into your organization's Zero Trust account and using the WARP agent.

Once enrolled, user endpoints will be able to connect to private [RFC 1918](https://tools.ietf.org/html/rfc1918) IP space and other ranges that you control. Applications running on those endpoints will be able to reach those private IPs as well in a private network model. Coming soon, administrators will be able to build Zero Trust rules to determine who within your organization can reach those IPs.

**This tutorial covers how to:**

- Start a secure, outbound-only, connection from a machine to Cloudflare
- Assign the machine an IP that can consist of an RFC 1918 IP address or range
- Connect to that private IP space from an enrolled WARP agent without client-side configuration changes
- Connect using any TCP-based protocol

**Time to complete:** 45 minutes

---

## Install `cloudflared`

1. [Download and install](/cloudflare-one/connections/connect-apps/install-and-setup/installation/) the Cloudflare Tunnel daemon, `cloudflared`.

2. Run the following command in your Terminal to authenticate this instance of `cloudflared` into your Cloudflare account.

   ```sh
   $ cloudflared login
   ```

   The command will launch a browser window and prompt you to login with your Cloudflare account. Choose a website that you have added into your account. This will authenticate your instance of `cloudflared` to your Cloudflare account &mdash; you will be able to create a Tunnel for any site, not just the site selected.

3. Once you select one of the sites in your account, Cloudflare will download a certificate file called `cert.pem` to authenticate this instance of `cloudflared`. The `cert.pem` file uses a certificate to authenticate your instance of `cloudflared` and includes an API key for your account to perform actions like DNS record changes.

You can now use `cloudflared` to control Cloudflare Tunnel connections in your Cloudflare account.

{{<Aside>}}
If you already have `cloudflared` installed, make sure to update to the latest version before you continue with the tutorial. Some commands may not run with older versions of `cloudflared`.
{{</Aside>}}

## Create a Tunnel

You can now [create a Tunnel](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/local/) that will connect `cloudflared` to Cloudflare's edge.

1. Begin by creating a Tunnel with an associated name. This example uses the name `grafana`.

   ```sh
   $ cloudflared tunnel create grafana
   ```

   You can confirm the ID of the Tunnel by running the following command.

   ```sh
   $ cloudflared tunnel list
   ```

2. Create a route. Routes map a Tunnel ID to a CIDR range that you specify. You can use private IP space specified by [RFC 1918](https://tools.ietf.org/html/rfc1918) or other routes. The private IP space specified should match the private IP space of your subnet or environment where Cloudflare Tunnel will send connections.

   This example tells Cloudflare Tunnel that, for users in this organization, connections to `100.64.0.0/10` should be served by this Tunnel. For the purposes of this tutorial, Grafana is running in a DigitalOcean environment where a virtual interface has been applied that will send traffic bound for localhost to `100.64.0.1`.

   ```sh
   $ cloudflared tunnel route ip add 100.64.0.0/10 8e343b13-a087-48ea-825f-9783931ff2a5
   ```

3. Similar to the `list` command, you can confirm the routes enrolled with the following command.

   ```sh
   $ cloudflared tunnel route ip show
   ```

   ![Terminal listing example route enrollments](/cloudflare-one/static/secure-origin-connections/warp-to-tunnel/ip-list.png)

## Configure and run the Tunnel

1. Create a configuration file for the tunnel in the `.cloudflared` default directory. The following template contains the required fields but can be further modified as needed.

   ```yaml
   tunnel: 8e343b13-a087-48ea-825f-9783931ff2a5
   credentials-file: /root/.cloudflared/8e343b13-a087-48ea-825f-9783931ff2a5.json
   warp-routing:
   enabled: true
   ```

2. You can now run the Tunnel. The command below will connect this instance of `cloudflared` to Cloudflare's network. Traffic inside of your organization, from enrolled WARP agents, will be sent to this instance when the destination is this private IP range.

   ```sh
   $ cloudflared tunnel run grafana
   ```

This example runs it from the command-line but we recommend running `cloudflared` [as a service](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/local/as-a-service/) for long-lived connections.

## Route private IP ranges through WARP

{{<Aside>}}

Make sure **HTTP traffic filtering** is enabled. This lets Cloudflare proxy your private IP ranges to corresponding Cloudflare Tunnels.

{{</Aside>}}

Users can reach this private service by logging in to their Zero Trust account and the WARP client.

By default, Cloudflare WARP excludes traffic bound for RFC 1918 space and certain other routes as part of its [Split Tunnel feature](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/). To use this feature the IPs that you specified for your Tunnel must be included which will send traffic for those destinations through the WARP client and to the Tunnel.

1. Ensure that your [Split Tunnels mode](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/) is set to **Exclude IPs and domains**.

2. In the list of Split Tunnels entries, choose the range being used for this private connection and delete it. For example, if your network uses the default AWS range of `172.31.0.0/16`, delete `172.16.0.0/12`.

3. Re-add IP/CIDR ranges that are not explicitly used by your private network. For the AWS example above, you would add new entries for `172.16.0.0/13`, `172.24.0.0/14`, `172.28.0.0/15`, and `172.30.0.0/16`.

## Integrate your identity provider

Users can now connect over this private network by [enrolling their devices into the WARP agent](/cloudflare-one/connections/connect-devices/warp/) in the same account as the Cloudflare Tunnel configuration. They must use _Gateway with WARP_ mode.

You can begin to [enroll devices](/cloudflare-one/connections/connect-devices/warp/deployment/) by determining which users are allowed to enroll.

In Zero Trust, select your account and go to **Settings** > **Authentication**. Cloudflare Zero Trust will automatically create a "One-time PIN" option which will rely on your user's emails. You can begin using the one-time PIN option immediately or integrate your corporate [identity provider](/cloudflare-one/identity/idp-integration/).

## Determine which devices can enroll

1. Go to **Settings** > **WARP Client**.

2. Within **Device enrollment permissions**, select **Manage**.

3. Select **Add a rule**.

   Determine who is allowed to enroll by using criteria including Access groups, groups from your identity provider, email domain, or named users. This example allows any user with a `@cloudflare.com` account to enroll.

   ![Example device enrollment config to allow Cloudflare users](/cloudflare-one/static/secure-web-gateway/block-football/allow-cf-users.png)

4. Select **Save**.

Your rule will now be visible under the **Device enrollment rules** list.

## Enable the Cloudflare proxy

1. Go to **Settings** > **Network**.

2. Enable **Proxy**.

This will tell Cloudflare to begin proxying any traffic from enrolled devices, except the traffic excluded using the [split tunnel](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/) settings.

## (Optional) Enable HTTPS inspection

1. [Install the Cloudflare certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/) on your devices.

    Installing the certificate is not a requirement for private network routing. However, the certificate allows Cloudflare Gateway to inspect and secure HTTPS traffic to your private network. You can distribute this certificate through the WARP client, use an MDM tool, or install it manually.

2. Go to **Settings** > **Network** and enable **TLS decryption**.

   This will tell Cloudflare to begin decrypting traffic for inspection from enrolled devices, except the traffic excluded from inspection.

## Enroll a device

1. Follow the [instructions](/cloudflare-one/connections/connect-devices/warp/deployment/) to install the WARP client depending on your device type. Cloudflare Gateway does not need a special version of the client.

2. Once the client is installed, select the gear icon.

3. Under the **Account** tab, select **Login with Cloudflare Zero Trust**.

4. Input your [team name](/cloudflare-one/glossary/#team-name). You can find it in Zero Trust under **Settings** > **General**.

The user will be prompted to login with the identity provider configured in Cloudflare Access. Once authenticated, the client will update to Teams mode. You can select the gear to toggle between DNS filtering or full proxy. In this use case, you must select _Gateway with WARP_. These settings can be configured globally for an organization through a device management platform.

## Connect via WARP

Once enrolled, your users will be able to connect to the private IPs configured for HTTP traffic in this example or arbitrary TCP traffic.
