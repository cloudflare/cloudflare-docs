---
updated: 2021-06-18
category: 🔐 Zero Trust
difficulty: Advanced
pcx-content-type: tutorial
title: Render a VNC client in browser
---

# Render a VNC client in browser

Cloudflare can render a Virtual Network Computer (VNC) terminal in your browser without any client software or configuration required.

Administrators can use Cloudflare Tunnel to connect a VNC host to Cloudflare’s network. Using Cloudflare Access, you can apply Zero Trust policies to determine who can access your VNC server. Cloudflare’s network will then enforce the Zero Trust policies and, when a user is allowed, render the client in the browser.

**🗺️ This walkthrough covers how to:**

*   Install and run a Cloudflare Tunnel on a Linux virtual machine
*   Install and configure VNC on a Linux virtual machine
*   Build a Zero Trust policy to determine who can reach the host
*   Render the VNC server in your browser

**⏲️ Time to complete:**

10 minutes

{{<Aside>}}

There are a number of VNC versions, deployments and instances. This tutorial focuses on configuring a Tight VNC server on an Azure hosted Linux virtual machine. For help with other configurations, please post your questions in our [community](https://community.cloudflare.com/t/feedback-for-browser-vnc/280619/3).

{{</Aside>}}

## Before you start

1.  [Add a website to Cloudflare](https://support.cloudflare.com/hc/en-us/articles/201720164-Creating-a-Cloudflare-account-and-adding-a-website)
2.  [Enable Cloudflare Zero Trust on your account](/cloudflare-one/setup/)
3.  [Connect your identity provider to Cloudflare Zero Trust](/cloudflare-one/identity/idp-integration/)

## Configure VNC on your virtual machine

This section covers how to install a VNC server with TightVNC and the Gnome User Interface. If you already have a VNC server installed, you can skip this step.

1.  Open a terminal window for your VM.

2.  Run the following commands to install the VNC software.

    ```bash
    $ sudo apt-get update
    ```

    ```bash
    $ sudo apt-get install gnome-core
    ```

    ```bash
    $ sudo apt install tightvncserver
    ```

    ```bash
    $ sudo apt-get install gnome-panel
    ```

    ```bash
    $ sudo apt-get install ubuntu-gnome-desktop
    ```

3.  Once installed, you can create the VNC server instance with the following command:

    ```bash
    $ sudo tightvncserver
    ```

    ![VNC password](/cloudflare-one/static/zero-trust-security/vnc-client-in-browser/vnc-password.png)

4.  Select a password for the VNC server. This password will be used during login for your browser VNC server.

5.  Run the following command, which will take you to your VNC server configuration directory.

    ```bash
    $ cd .vnc
    ```

6.  Open your `xstartup` file.

    ```bash
    $ vim xstartup
    ```

7.  Update the file to the following configuration (this is for demonstration purposes, browser based VNC will work with most configurations):

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

    ![VNC xstartup file](/cloudflare-one/static/zero-trust-security/vnc-client-in-browser/vnc-xstartup.png)

8.  Run the following command to create your VNC server:

    ```bash
    $ vncserver
    ```

At this point, you have a VNC server ready to test with browser-based VNC. We recommend performing a brief test with an existing VNC browser to verify any missing packages or configuration changes that might need to be made before continuing. Once your VNC server appears as desired, continue with your setup.

## Configure Cloudflare Tunnel on your machine

1.  Follow [these instructions](/cloudflare-one/connections/connect-apps/install-and-setup/installation/#build-from-source) to install `cloudflared`

2.  Authenticate `cloudflared` with the command:

    ```bash
    $ cloudflared tunnel login
    ```

3.  Create a Tunnel with the command:

    ```bash
    $ cloudflared tunnel create <NAME>
    ```

4.  Create a Tunnel configuration file with the command:

    ```bash
    $ vim config.yml
    ```

5.  Add the following configuration to your configuration file.

    ```txt
    tunnel: <NAME>
    ingress:
    - hostname: vnc.kennyatx.com
      service: tcp://localhost:5901
    - service: http_status:404
    ```

    As you do that, replace the `hostname` value with the domain you wish to use to expose your VNC server in the browser. Also, replace `5901` with the port your VNC server is running on. To get a list of ports, run `sudo ss -lnpt` and look for `VNC` to get the value that should be specified in your configuration file.

6.  [Route your Tunnel](/cloudflare-one/connections/connect-apps/routing-to-tunnel/dns/) to your website.

7.  Run your Tunnel:

    ```bash
    $ cloudflared tunnel --config path/config.yaml run <NAME>
    ```

    ![Run Tunnel](/cloudflare-one/static/zero-trust-security/vnc-client-in-browser/vnc-run-tunnel.png)

8.  Follow [this guide](/cloudflare-one/connections/connect-apps/configuration/ports-and-ips/) to open outbound connections for Cloudflare Tunnel if you have a firewall enabled.

At this point you have a running VNC server and a Cloudflare Tunnel on your machine ready to accept inbound VNC requests.

## Create a Zero Trust VNC application

The last step is to create a Zero Trust application to run your VNC server in the Browser.

1.  Open your [Zero Trust Dashboard](https://dash.teams.cloudflare.com) and go to the **Access > Applications** tab.

2.  Click **Add an application**.

3.  Select **Self-hosted**.

4.  Name the application and set the domain to which you would like to expose the VNC server:

    ![Name application](/cloudflare-one/static/zero-trust-security/vnc-client-in-browser/vnc-domain-application.png)

5.  Add a Zero Trust policy. In this example we are only allowing users with emails ending in `@example.com`.

    ![Create policy](/cloudflare-one/static/zero-trust-security/vnc-client-in-browser/vnc-policy.png)

6.  In **`cloudflared` settings**, set **Application Type** to be *VNC*.

And now you are ready to use the VNC terminal directly in the browser. Users will first see a login screen with your configured identity providers:

![VNC login screen](/cloudflare-one/static/zero-trust-security/vnc-client-in-browser/vnc-login-screen.png)

After successful authentication, they may be prompted to enter the VNC server’s password:

![VNC password prompt](/cloudflare-one/static/zero-trust-security/vnc-client-in-browser/vnc-server-password.png)

Then your user will be directed into your VNC server:

![VNC server](/cloudflare-one/static/zero-trust-security/vnc-client-in-browser/vnc-server.png)

You’ve now successfully deployed a Zero Trust VNC server in the browser. You can define granular access controls across each individual VNC instance.
