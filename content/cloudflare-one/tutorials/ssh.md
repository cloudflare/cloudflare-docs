---
updated: 2022-07-12
category: 🔐 Zero Trust
pcx_content_type: tutorial
title: Connect through Cloudflare Access over SSH
---

# Connect through Cloudflare Access over SSH

You can connect to machines over SSH using Cloudflare's Zero Trust platform.

**🗺️ This walkthrough covers how to:**

- Build a policy in Cloudflare Access to secure the machine
- Connect a machine to Cloudflare's network using an SSH connection
- Connect from a client machine

**⏲️ Time to complete:**

30 minutes

## Before you start

1.  [Add a website to Cloudflare](/fundamentals/get-started/setup/add-site/)

---

## Create a Zero Trust policy

1. To create a new application, go to the Zero Trust dashboard. From the sidebar, select the **Applications** page. Select **Add an application**.
![Location of 'Add an application' button above Application list](/cloudflare-one/static/zero-trust-security/ssh/app-list.png)

1. On the next page, choose **Self-hosted**.

1. Within **Application Domain**, input a subdomain. This will be the hostname where your application will be available to users.

1. Create rules to control who can reach the application.

1. To save the policy, select **Save**. You can edit the policy later to change allowed users or authentication providers.

## Install `cloudflared` on the server

Cloudflare Tunnel creates a secure, outbound-only, connection between this machine and Cloudflare's network. With an outbound-only model, you can prevent any direct access to this machine and lock down any externally exposed points of ingress. And with that, no open firewall ports.

Cloudflare Tunnel is made possible through a lightweight daemon from Cloudflare called `cloudflared`. Download and then install `cloudflared` with the commands below. You can find instructions for installing `cloudflared` on other operating systems [here](/cloudflare-one/connections/connect-apps/install-and-setup/installation/). The release history can be found [here](https://github.com/cloudflare/cloudflared/releases).

For example, `cloudflared` can be installed on Debian and its derivatives with these commands:

```sh
$ sudo wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
$ sudo dpkg -i ./cloudflared-linux-amd64.deb
```

## Authenticate `cloudflared`

Run the following command on the server to authenticate cloudflared into your Cloudflare account.

```sh
$ cloudflared tunnel login
```

`cloudflared` will open a browser window and prompt you to login to your Cloudflare account. If you are working on a machine that does not have a browser, or a browser window does not launch, you can copy the URL from the command-line output and visit the URL in a browser on any machine.

Choose any hostname presented in the list. Cloudflare will issue a certificate scoped to your account. You do not need to pick the specific hostname where you will serve the Tunnel.

## Create a Tunnel

Next, [create a Tunnel](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/#set-up-a-tunnel-locally-cli-setup) on the server with the command below.

```sh
$ cloudflared tunnel create <NAME>
```

Replacing `<NAME>` with a name for the Tunnel. This name can be any value. A single Tunnel can also serve traffic for multiple hostnames to multiple services in your environment, including a mix of connection types like SSH and HTTP.

The command will output an ID for the Tunnel and generate an associated credentials file. At any time you can list the Tunnels in your account with the following command.

```sh
$ cloudflared tunnel list
```

## Configure the Tunnel

You can now [configure the Tunnel](/cloudflare-one/connections/connect-apps/configuration/) to serve traffic.

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

You can now create a DNS record that will route traffic to this Tunnel. Multiple DNS records can point to a single Tunnel and will send traffic to the configured service as long as the hostname is defined with an [ingress rule](/cloudflare-one/connections/connect-apps/configuration/local-management/ingress/).

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account. Select your domain and go to **DNS**.

2. Select **Add record**. Choose `CNAME` as the record type. For **Name**, choose the hostname where you want to create a Tunnel. This should match the hostname of the Access policy.

3. For **Target**, input the ID of your Tunnel followed by `.cfargotunnel.com`. For example:
  
  ```txt
    6ff42ae2-765d-4adf-8112-31c55c1551ef.cfargotunnel.com
  ```

4. Select **Save**.

## Run the Tunnel

You can now run the Tunnel to connect the target service to Cloudflare. Use the following command to run the Tunnel, replacing `<NAME>` with the name created for your Tunnel.

```sh
$ cloudflared tunnel run <NAME>
```

We recommend that you run `cloudflared` [as a service](/cloudflare-one/connections/connect-apps/run-tunnel/as-a-service/) that is configured to launch on start.

## Connect from a client machine

### Native Terminal

You can now connect from a client machine using `cloudflared`.

This example uses a macOS laptop. On macOS, you can install `cloudflared` with the following command using Homebrew.

```sh
$ brew install cloudflare/cloudflare/cloudflared
```

While you need to install `cloudflared`, you do not need to wrap your SSH commands in any unique way. Instead, you will need to make a one-time change to your SSH configuration file.

```sh
$ vim ~/.ssh/config
```

Input the following values; replacing `azure.widgetcorp.tech` with the hostname you created.

```txt
Host azure.widgetcorp.tech
  ProxyCommand /usr/local/bin/cloudflared access ssh --hostname %h
```

You can now test the SSH flow by running a command to reach the service. When the command is run, `cloudflared` will launch a browser window to prompt you to authenticate with your identity provider before establishing the connection from your terminal.

### Browser-rendered terminal

Cloudflare can render an SSH client in your browser without the need for client software or end user configuration changes.

1. In the Zero Trust dashboard, go to **Access** > **Applications**.

1. Choose your application and go to **Edit** > **Settings**.

1. In **Additional settings**, select _SSH_ from the **Browser Rendering** drop-down menu.

Once enabled, when users authenticate and visit the URL of the application, Cloudflare will render a terminal in their browser.
