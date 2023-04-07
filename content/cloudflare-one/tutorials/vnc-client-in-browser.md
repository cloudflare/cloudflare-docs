---
updated: 2022-07-15
category: 🔐 Zero Trust
difficulty: Advanced
pcx_content_type: tutorial
title: Render a VNC client in browser
---

# Render a VNC client in browser

Cloudflare can render a Virtual Network Computer (VNC) terminal in your browser without any client software or configuration required.

Administrators can use Cloudflare Tunnel to connect a VNC host to Cloudflare’s network. Using Cloudflare Access, you can apply Zero Trust policies to determine who can access your VNC server. Cloudflare’s network will then enforce the Zero Trust policies and, when a user is allowed, render the client in the browser.

**This walkthrough covers how to:**

- Install and run a Cloudflare Tunnel on a Linux virtual machine
- Install and configure VNC on a Linux virtual machine
- Build a Zero Trust policy to determine who can reach the host
- Render the VNC server in your browser

**Time to complete:**

10 minutes

{{<Aside type="note">}}

There are a number of VNC versions, deployments, and instances. This tutorial focuses on configuring a Tight VNC server on an Azure hosted Linux virtual machine (VM). For help with other configurations, post your questions in our [community](https://community.cloudflare.com/t/feedback-for-browser-vnc/280619/3).

{{</Aside>}}

## Before you start

1. [Add a website to Cloudflare.](/fundamentals/get-started/setup/add-site/)
2. [Enable Cloudflare Zero Trust on your account.](/cloudflare-one/setup/)
3. [Connect your identity provider to Cloudflare Zero Trust.](/cloudflare-one/identity/idp-integration/)

---

## Configure VNC on your virtual machine

This section covers how to install a VNC server with TightVNC and the Gnome User Interface. If you already have a VNC server installed, you can skip this step.

1. Open a terminal window for your VM.

2. To install the VNC software, run the following commands:

   ```sh
   $ sudo apt-get update

   $ sudo apt-get install gnome-core gnome-panel ubuntu-gnome-desktop tightvncserver
   ```

3. Once installed, you can create the VNC server instance with the following command:

   ```sh
   $ sudo tightvncserver
   ```

4. Select a password for the VNC server. This password will be used during login for your browser VNC server.

5. Run the following command, which will take you to your VNC server configuration directory.

   ```sh
   $ cd .vnc
   ```

6. Open your `xstartup` file.

   ```sh
   $ vim xstartup
   ```

7. Update the file to the following configuration (this is for demonstration purposes — browser-based VNC will work with most configurations):

   ```txt
   xsetroot -solid grey
   x-terminal-emulator -geometry 80x24+10+10 -ls -title "$VNCDESKTOP Desktop" &
   #x-window-manager &

   # Fix to make GNOME work
   export XKL_XMODMAP_DISABLE=1
   /etc/X11/Xsession

   #gnome-session &
   gnome-panel &
   nautilus &
   ```

8. To create your VNC server, run the following command:

   ```sh
   $ vncserver
   ```

At this point, you have a VNC server ready to test with browser-based VNC. We recommend performing a brief test with an existing VNC browser to verify any missing packages or configuration changes that might need to be made before continuing. Once your VNC server appears as desired, continue with your setup.

## Configure Cloudflare Tunnel on your machine

1. Follow [these instructions](/cloudflare-one/connections/connect-apps/install-and-setup/installation/) to install `cloudflared`.

2. Authenticate `cloudflared` with the command:

   ```sh
   $ cloudflared tunnel login
   ```

3. Create a Tunnel with the command:

   ```sh
   $ cloudflared tunnel create <NAME>
   ```

4. Create a Tunnel configuration file with the command:

   ```sh
   $ vim config.yml
   ```

5. Add the following configuration to your configuration file.

   ```txt
   tunnel: <NAME>
   ingress:
   - hostname: vnc.kennyatx.com
     service: tcp://localhost:5901
   - service: http_status:404
   ```

   As you do that, replace `<HOSTNAME>` with the domain you wish to use to expose your VNC server in the browser. Also, replace `5901` with the port your VNC server is running on. To get a list of ports, run `sudo ss -lnpt` and look for `VNC` to get the value that should be specified in your configuration file.

6. [Route your Tunnel](/cloudflare-one/connections/connect-apps/routing-to-tunnel/dns/) to your website.

7. Run your Tunnel:

   ```sh
   $ cloudflared tunnel --config path/config.yaml run <NAME>
   ```

8. Follow [this guide](/cloudflare-one/connections/connect-apps/do-more-with-tunnels/ports-and-ips/) to open outbound connections for Cloudflare Tunnel if you have a firewall enabled.

At this point you have a running VNC server and a Cloudflare Tunnel on your machine ready to accept inbound VNC requests.

## Create a Zero Trust VNC application

The last step is to create a Zero Trust application to run your VNC server in the Browser.

1. Open [Zero Trust](https://one.dash.cloudflare.com) and go to **Access > Applications**.

2. Select **Add an application** and choose **Self-hosted**.

3. Name the application and set the domain to which you would like to expose the VNC server.

   ![Example domain name input for VNC application](/cloudflare-one/static/zero-trust-security/vnc-client-in-browser/vnc-domain-application.png)

4. Add an Allow or Block policy. In this example, we are only allowing users with emails ending in `@example.com`.

   ![Example Zero Trust policy input for VNC application](/cloudflare-one/static/zero-trust-security/vnc-client-in-browser/vnc-policy.png)

{{<Aside type="note">}}
Service Auth and Bypass policies are not supported for browser-based VNC applications.
{{</Aside>}}

5. In **Additional settings**, set **Browser rendering** to _VNC_.

Users will see a login screen with your configured identity providers. After successful authentication, they may be prompted to enter the VNC server’s password.

You can define granular access controls across each individual VNC instance.
