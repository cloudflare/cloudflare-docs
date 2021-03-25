---
order: 12
---

# Cloudflare Argo Tunnel

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>

Access lets you control who can reach your website. Cloudflare handles the requests based on your Access policies to evaluate user credentials. To ensure that Cloudflare proxies all traffic, lock down your origin to only accept Cloudflare IPs.

![Access Generic](../static/summary/network-diagram.png)

Keep on-premise applications off of the Internet by leveraging Cloudflare Argo Tunnel. Some organizations need to keep applications or tools off the internet, only allowing teams access through a VPN. With Access and Argo Tunnel, you can avoid the hassle of a VPN yet keep applications off the internet.

## Using Cloudflare's Argo Tunnel to secure on-premise applications

Argo Tunnel offers an easy way to securely expose web servers to the internet without opening firewall ports and configuring ACLs (Access Control Libraries). Argo Tunnel ensures that requests route through Cloudflare before reaching the web server, so that you are certain that attack traffic is stopped by Cloudflare’s WAF and Unmetered DDoS mitigation and authenticated with Access by enabling these features on your account.

Argo Tunnel relies on the `cloudflared` daemon to create a persistent connection between your web server and the Cloudflare network. Once the daemon is running and you have the Tunnel configured, you can lock down the web server to external requests to only allow connections from Cloudflare.

Argo Tunnel is free with the purchase of Argo Smart Routing. Argo Smart Routing can be purchased in the Cloudflare dashboard and costs $5/month plus 10 cents per GB. Cloudflare only charges for Argo routing; there is no charge for the count of tunnels used.

### Set up Argo Tunnel

Before setting up Argo Tunnel, be sure you have the following:

* A [Cloudflare account](https://dash.cloudflare.com/login)
* The [`cloudflared` daemon](https://developers.cloudflare.com/argo-tunnel/downloads/)
* An [active zone on Cloudflare](https://support.cloudflare.com/hc/en-us/articles/201720164-Step-2-Create-a-Cloudflare-account-and-add-a-website)
* An active subscription to Argo. You can enable your subscription in the Cloudflare dashboard in the **Traffic** tab

To set up Argo Tunnel, begin by using Argo Smart Routing:

1. On your Cloudflare dashboard, select the **Traffic** app.
1. Click **Enable App**, and follow the instructions to set up usage-based billing.

    Argo Tunnel uses Argo Smart Routing to route traffic over the fastest path within the Cloudflare network between the user and the datacenter closest to your origin.

    **Note**: To enable Argo Smart Routing, enterprise customers must contact their Cloudflare representative.

1. [Follow these instructions to install `cloudflared`](https://developers.cloudflare.com/argo-tunnel/downloads/).

    The `cloudflared` daemon runs Argo Tunnel. It is available for amd64, x86, and ARMv6 machines in binary, `.deb`, and `.rpm` types. The code for the `cloudflared` client is [available on GitHub](https://github.com/cloudflare/cloudflared).

1. Type this command in a terminal window to check the `cloudflared` version:

    ```bash
    $ cloudflared --version
    cloudflared version 2019.2.1 (built 2019-02-28-0010 UTC)
    ```

    **Note:** You must issue this command from the path where you installed the `.deb` or `.rpm` package (Linux), or where you used Homebrew (macOS). If you did not install these packages, change to the directory where you extracted `cloudflared`.

1. Log in to your Cloudflare account from `cloudflared`.

    **Note:** Use the same username and password you use to log in to the Cloudflare dashboard.

1. Run the following command to open a login page in your browser:

    ```bash
    $ cloudflared tunnel login
    ```

    A browser window opens at the following URL:

    ```txt
    https://dash.cloudflare.com/argotunnel?callback=https%3A%2F%2Flogin.cloudflarewarp.com%2FA5XXPKA6S5N5YWMTOXRKVWPRPE7BHG3MFRCDZES7UBZU7SWQFF4KA4PWMGL5GXJ
    ```

    If the browser fails to automatically open, copy and paste the URL into your browser’s address bar.

1. Locate the domain that represents your server and select its name in the table.

    A list of domains associated with your account displays. Argo Tunnel connects your machine to the Cloudflare network by associating it with a hostname in your Cloudflare account.

    Once you select the domain, `cloudflared` automatically installs a certificate to authenticate your machine to the Cloudflare network for the specific hostname.

    When `cloudflared` installs the certificate, a success message displays in your browser, and you can start using `cloudflared` and Argo Tunnel.

    **Note:** The certificate consists of three components bundled into a single PEM file. One of those components is the API key from the user who authenticated. If this user leaves the Cloudflare account or their permissions change, you must render that API key invalid, which causes the tunnel to fail to authenticate. You must generate a new certificate.

    **Tip:** Sometimes firewalls or unusual network configuration can prevent `cloudflared` from automatically installing the certificate. If this occurs, your browser downloads the certificate as a file named `cert.pem`, and displays in your browser’s download window. Move that `cert.pem` file from your designated downloads folder to the `~/.cloudflared folder`. In a terminal window, copy and paste the following command to move the certificate to the `.cloudflared` directory on your system:

    ```bash
    $ mv cert.pem ~/.cloudflared/cert.pem
    ```

1. Test the configuration by typing the selected hostname in your browser address bar.

    Access to the Tunnel is permitted over both HTTP and HTTPS, though you can easily redirect all HTTP traffic to HTTPS with Cloudflare.On success, the content is served from your local web server.

You can now proceed to use your on-premise application from any location without a VPN.

**Note:** If the connection does not succeed, use [these guides and references for Argo Tunnel and cloudflared](https://developers.cloudflare.com/argo-tunnel/reference/) for troubleshooting.