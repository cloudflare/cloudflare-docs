---
updated: 2021-04-15
category: 🔐 Zero Trust
pcx-content-type: tutorial
---

# Render an SSH client in a browser

Cloudflare can render an SSH client in your browser without the need for client software or end user configuration changes.

Administrators can deploy Cloudflare Tunnel to connect one or more machines available over SSH to Cloudflare's network. Zero Trust rules can then be applied and enforced at Cloudflare's edge. When users authenticate through those rules, they can start an SSH session in their browser.

**🗺️ This walkthrough covers how to:**

* Render a terminal in your browser for SSH connections

**⏲️ Time to complete:**

30 minutes

## Before you start

1. [Add a website to Cloudflare](https://support.cloudflare.com/hc/en-us/articles/201720164-Creating-a-Cloudflare-account-and-adding-a-website)
1. [Connect your machine to Cloudflare](/tutorials/ssh) and apply Zero Trust rules

---

## Create a Zero Trust policy

First, navigate to the Cloudflare for Teams dashboard to create a new application. Select the `Applications` page from the sidebar. Click **Add application**.

![App List](../static/zero-trust-security/ssh/app-list.png)

Choose **Self-hosted** on the next page.

![Add App](../static/zero-trust-security/ssh/add-app.png)

Input a subdomain where your application will be available to users.

![Configure](../static/zero-trust-security/ssh/configure-app.png)

Next, create rules that control who can reach the application.

![Add Rules](../static/zero-trust-security/ssh/app-rules.png)

Finally, click **Save** to save the policy. You can return to edit the policy to make changes to who should be allowed or to choose what authentication providers can be used.

![Save](../static/zero-trust-security/ssh/save-app.png)

## Install `cloudflared`

Cloudflare Tunnel creates a secure, outbound-only, connection between this machine and Cloudflare's network. With an outbound-only model, you can  prevent any direct access to this machine and lock down any externally exposed points of ingress. And with that, no open firewall ports.

Cloudflare Tunnel is made possible through a lightweight daemon from Cloudflare called `cloudflared`. Download and then install `cloudflared` with the commands below. You can find releases for other operating systems [here](https://github.com/cloudflare/cloudflared/releases).

```sh
$ sudo wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
$ sudo dpkg -i ./cloudflared-linux-amd64.deb
```

## Authenticate `cloudflared`

Run the following command to authenticate cloudflared into your Cloudflare account.

```sh
$ cloudflared tunnel login
```

`cloudflared` will open a browser window and prompt you to login to your Cloudflare account. If you are working on a machine that does not have a browser, or a browser window does not launch, you can copy the URL from the command-line output and visit the URL in a browser on any machine.

Choose any hostname presented in the list. Cloudflare will issue a certificate scoped to your account. You do not need to pick the specific hostname where you will serve the Tunnel.

## Create a Tunnel

Next, [create a Tunnel](/connections/connect-apps/create-tunnel) with the command below.

```sh
$ cloudflared tunnel create <NAME>
```

Replacing `<NAME>` with a name for the Tunnel. This name can be any value. A single Tunnel can also serve traffic for multiple hostnames to multiple services in your environment, including a mix of connection types like SSH and HTTP.

The command will output an ID for the Tunnel and generate an associated credentials file. At any time you can list the Tunnels in your account with the following command.

```sh
$ cloudflared tunnel list
```

## Configure the Tunnel

You can now [configure the Tunnel](/connections/connect-apps/configuration) to serve traffic.

Create a `YAML` file that `cloudflared` can reach. By default, `cloudflared` will look for the file in the same folder where `cloudflared` has been installed.

```sh
$ vim ~/.cloudflared/config.yml
```

Next, configure the Tunnel, replacing the example ID below with the ID of the Tunnel created above. Additionally, replace the hostname in this example with the hostname of the application configured with Cloudflare Access.

```yaml
tunnel: 6ff42ae2-765d-4adf-8112-31c55c1551ef
credentials-file: /root/.cloudflared/6ff42ae2-765d-4adf-8112-31c55c1551ef.json

ingress:
  - hostname: azure.widgetcorp.tech
    service: ssh://localhost:22
  - service: http_status:404
  # Catch-all rule, which responds with 404 if traffic doesn't match any of
  # the earlier rules
```

## Route to the Tunnel

You can now create a DNS record that will route traffic to this Tunnel. Multiple DNS records can point to a single Tunnel and will send traffic to the service configured as long as the hostname is defined with an [ingress rule](/connections/connect-apps/configuration/ingress).

Navigate to `dash.cloudflare.com` and choose the hostname where you want to create a Tunnel. This should match the hostname of the Access policy. Click **+ Add record**.

![DNS List](../static/zero-trust-security/ssh/dns-list.png)

Select `CNAME` as the record type. For the target, input the ID of your Tunnel followed by `cfargotunnel.com`. In this example, the target would be:

`6ff42ae2-765d-4adf-8112-31c55c1551ef.cfargotunnel.com`

Click **Save**.

![Add DNS](../static/zero-trust-security/ssh/add-dns.png)

## Run the Tunnel

You can now run the Tunnel to connect the target service to Cloudflare. Use the following command to run the Tunnel, replacing `<NAME>` with the name created for your Tunnel.

```sh
cloudflared tunnel run <NAME>
```

We recommend that you run `cloudflared` [as a service](/connections/connect-apps/run-tunnel/run-as-service) that is configured to launch on start.

## Connect from a browser-rendered terminal

Cloudflare can render an SSH client in your browser without the need for client software or end user configuration changes.

To enable this feature, navigate to the **Access > Applications** page in the Teams Dashboard. Click **Edit** and select the **Settings** tab. In the **`cloudflared` settings** card, select *SSH* from the **Browser Rendering** drop-down menu.

![Auto Auth](../static/documentation/applications/ssh-browser-rendering.png)

Once enabled, when users authenticate and visit the URL of the application, Cloudflare will render a terminal in their browser.

<iframe
  src="https://iframe.videodelivery.net/9e62cddf4ac40dc7237f4136f946fa12"
  style="border: none;"
  height="200"
  width="400"
  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
  allowfullscreen="true"
></iframe>

## Recommended: enable short-lived certificates

Cloudflare's browser-based terminal does not access the device's certificate store to gather SSH keys. Instead, users can input a username and password for password-based authentication or paste their private key. The terminal is rendered entirely in the user's browser - Cloudflare never stores or has access to the private key.

Alternatively, your team can configure short-lived certificates as a more secure, SSO-integrated, session authentication method. Cloudflare will gather the identity from the token issued by the user's login and issue a short-lived certificate for that user. The SSH server can then use that certificate to start the session.

Follow the instructions [here](/identity/users/short-lived-certificates) to configure short-lived certificate authentication.
