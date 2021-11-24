---
updated: 2021-03-23
category: 🌐 Connections
difficulty: Advanced
pcx-content-type: tutorial
---

# Connect from WARP to a private network on Cloudflare using Cloudflare Tunnel

You can use [Cloudflare Tunnel](/connections/connect-apps) to connect applications and services to Cloudflare's network. Cloudflare Tunnel relies on a piece of software, `cloudflared`, to create those connections.

You can create and configure Cloudflare Tunnel connections to [support multiple HTTP origins](/tutorials/multi-origin) or [multiple protocols simultaneously](/tutorials/gitlab). You can also use Cloudflare Tunnel to connect any service that relies on a TCP-based protocol to Cloudflare's network. Users in your organization can then reach the service by enrolling into your organization's Cloudflare for Teams account and using the WARP agent.

Once enrolled, user endpoints will be able to connect to private [RFC 1918](https://tools.ietf.org/html/rfc1918) IP space and other ranges that you control. Applications running on those endpoints will be able to reach those private IPs as well in a private network model. Coming soon, administrators will be able to build Zero Trust rules to determine who within your organization can reach those IPs.

**🗺️ This tutorial covers how to:**

* Start a secure, outbound-only, connection from a machine to Cloudflare
* Assign the machine an IP that can consist of an RFC 1918 IP address or range
* Connect to that private IP space from an enrolled WARP agent without client-side configuration changes
* Connect using any TCP-based protocol

**⏲️ Time to complete:** 45 minutes

## Install `cloudflared`

Start by [downloading and installing](/connections/connect-apps/install-and-setup) the Cloudflare Tunnel daemon, `cloudflared`. On Mac, you can do so by running the following `brew` command. If you do not have Homebrew, follow the [documentation](https://docs.brew.sh/Installation) to install it.

`$ brew install cloudflare/cloudflare/cloudflared`

Once installed, run the following command in your Terminal to authenticate this instance of `cloudflared` into your Cloudflare account.

`$ cloudflared login`

The command will launch a browser window and prompt you to login with your Cloudflare account. Choose a website that you have added into your account. This will authenticate your instance of `cloudflared` to your Cloudflare account; you will be able to create a Tunnel for any site, not just the site selected.

![Choose Site](../static/secure-origin-connections/share-new-site/pick-site.png)

Once you click one of the sites in your account, Cloudflare will download a certificate file, called `cert.pem` to authenticate this instance of `cloudflared`. The `cert.pem` file uses a certificate to authenticate your instance of `cloudflared` and includes an API key for your account to perform actions like DNS record changes.

You can now use `cloudflared` to control Cloudflare Tunnel connections in your Cloudflare account.

![Download Cert](../static/secure-origin-connections/share-new-site/cert-download.png)

<Aside>
  If you already have `cloudflared` installed, make sure it's updated to the latest version before you continue with the tutorial. Some commands may not run with older versions of `cloudflared`. 
</Aside>

## Create a Tunnel

You can now [create a Tunnel](/connections/connect-apps/create-tunnel) that will connect `cloudflared` to Cloudflare's edge.

Begin by [creating a Tunnel](/connections/connect-apps/create-tunnel) with an associated name. This example uses the name `grafana`.

```bash
cloudflared tunnel create grafana
```

![Create Tunnel](../static/secure-origin-connections/warp-to-tunnel/create-tunnel.png)

You can confirm the ID of the Tunnel by running the following command.

```bash
cloudflared tunnel list
```

![List Tunnel](../static/secure-origin-connections/warp-to-tunnel/list-tunnel.png)

Next, you will need to create a route. Routes map a Tunnel ID to a CIDR range that you specify. You can use private IP space specified by [RFC 1918](https://tools.ietf.org/html/rfc1918) or other routes. The private IP space specified should match the private IP space of your subnet or environment where Cloudflare Tunnel will send connections.

This example tells Cloudflare Tunnel that, for users in this organization, connections to `100.64.0.0/10` should be served by this Tunnel. For the purposes of this tutorial, Grafana is running in a Digital Ocean environment where a virtual interface has been applied that will send traffic bound for localhost to `100.64.0.1`.

```bash
cloudflared tunnel route ip add 100.64.0.0/10 8e343b13-a087-48ea-825f-9783931ff2a5
```

![Route Add](../static/secure-origin-connections/warp-to-tunnel/route-add.png)

Similar to the `list` command, you can confirm the routes enrolled with the following command.

```bash
cloudflared tunnel route ip show
```

![IP List](../static/secure-origin-connections/warp-to-tunnel/ip-list.png)

## Configure and run the Tunnel

Next, create a configuration file for the Tunnel. The following template contains the required fields but can be further modified as needed.

```yaml
tunnel: 8e343b13-a087-48ea-825f-9783931ff2a5
credentials-file: /root/.cloudflared/8e343b13-a087-48ea-825f-9783931ff2a5.json
warp-routing:
  enabled: true
```

You can now run the Tunnel. The command below will connect this instance of `cloudflared` to Cloudflare's network. Traffic inside of your organization, from enrolled WARP agents, will be sent to this instance when the destination is this private IP range.

```bash
cloudflared tunnel run grafana
```

This example runs it from the command-line but we recommend running `cloudflared` [as a service](/connections/connect-apps/run-tunnel/run-as-service#create-route-and-configure-the-tunnel) for long-lived connections.

![Config File](../static/secure-origin-connections/warp-to-tunnel/config-file.png)

## Route private IP ranges through WARP

<Aside>

Make sure **HTTP traffic filtering** is enabled. This lets Cloudflare proxy your private IP ranges to corresponding Cloudflare Tunnels.

</Aside>

Users can reach this private service by logging into their Cloudflare for Teams account and the WARP agent.

By default, Cloudflare WARP excludes traffic bound for RFC 1918 space and certain other routes as part of its [Split Tunnel feature](/tutorials/split-tunnel). To use this feature the IPs that you specified for your Tunnel must be included which will send traffic for those destinations through the WARP agent and to the Tunnel.

1. On the Teams Dashboard, navigate to **Settings > Network**.

1. Click **Manage**. The IP ranges listed are those that Cloudflare excludes by default. Choose the range being used for this private connection and delete it.

![Split Tunnel](../static/secure-web-gateway/split-tunnel/split-tunnel-entries.png)

## Integrate your identity provider

Users can now connect over this private network by [enrolling their devices into the WARP agent](/connections/connect-devices/warp) in the same account as the Cloudflare Tunnel configuration. They must use the `Gateway with WARP` mode.

You can begin to [enroll devices](/connections/connect-devices/warp/deployment) by determining which users are allowed to enroll.

Navigate to the `Settings` section of the Cloudflare for Teams dashboard and select `Authentication`. Cloudflare for Teams will automatically create a "One-time PIN" option which will rely on your user's emails. You can begin using the one-time PIN option immediately or you can also integrate your corporate [identity provider](/identity/idp-integration).

## Determine which devices can enroll

Next, build a rule to decide which devices can enroll in your account. 

1. Navigate to **Settings > Devices > Device enrollment**.

1. Click **Manage**.

1. Click **Add a rule**.

    ![Device Enrollment](../static/secure-web-gateway/block-football/device-enrollment-add-rule.png)

    Determine who is allowed to enroll by using criteria including Access groups, groups from your identity provider, email domain, or named users. This example allows any user with a `@cloudflare.com` account to enroll.

    ![Allow Cloudflare users](../static/secure-web-gateway/block-football/allow-cf-users.png)

1. Click **Save**.

Your rule will now be visible under the **Device enrollment rules** list.

## Configure the Cloudflare certificate

To inspect traffic, Cloudflare Gateway requires that a [certificate be installed](/connections/connect-devices/warp/install-cloudflare-cert) on enrolled devices. You can also distribute this certificate through an MDM provider. The example below describes the manual distribution flow.

To download the Cloudflare certificate:
* Follow the link provided in [these instructions](/connections/connect-devices/warp/install-cloudflare-cert).
* Find the certificate in the Teams Dashboard, by navigating to **Settings > Devices > Certificates**.

## Enable the Cloudflare proxy

Once the certificate has been installed, you can configure Gateway to inspect HTTP traffic. To do so, navigate to **Settings > Network**. Toggle **Proxy** to *Enabled*. This will tell Cloudflare to begin proxying any traffic from enrolled devices, except the traffic excluded using the [split tunnel](/connections/connect-devices/warp/exclude-traffic) settings.

Next, enable TLS decryption. This will tell Cloudflare to begin decrypting traffic for inspection from enrolled devices, except the traffic excluded from inspection.

![Policy settings](../static/secure-web-gateway/block-football/enable-proxy-decrypt.png)

## Enroll a device

1. Follow the [instructions](/connections/connect-devices/warp/deployment) to install the WARP client depending on your device type. Cloudflare Gateway does not need a special version of the client.

1. Once the client is installed, click the gear icon.

    ![WARP](../static/secure-web-gateway/secure-dns-devices/warp.png)

1. Under the **Account** tab, click **Login with Cloudflare for Teams**.

    ![Account View](../static/secure-web-gateway/secure-dns-devices/account-view.png)

1. Input your [team name](/glossary#team-name). You can find it on the Teams Dashboard under **Settings > General**.

    ![Team Name](../static/secure-web-gateway/secure-dns-devices/org-name.png)

The user will be prompted to login with the identity provider configured in Cloudflare Access. Once authenticated, the client will update to `Teams` mode. You can click the gear to toggle between DNS filtering or full proxy. In this use case, you must toggle to `Gateway with WARP`. These settings can be configured globally for an organization through a device management platform.

![Confirm WARP](../static/secure-web-gateway/block-football/warp-mode.png)

## Connect via WARP

Once enrolled, they will be able to connect to the private IPs configured for HTTP traffic in this example or arbitrary TCP traffic.

![Private IP](../static/secure-origin-connections/warp-to-tunnel/connect-private-ip.png)
