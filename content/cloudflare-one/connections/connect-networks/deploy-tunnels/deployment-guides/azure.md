---
pcx_content_type: how-to
title: Azure
weight: 3
---

# Deploy `cloudflared` in Azure

The purpose of this guide is to walk through some best practices for accessing private resources on Azure by deploying Cloudflare's lightweight connector, `cloudflared`.

We will walk through how to initialize a service on a Linux VM in Azure, and route to it from another VM running `cloudflared`. This deployment guide does not take into account routing beyond basic security groups and default VPCs.

## Prerequisites

- In [Zero Trust](https://one.dash.cloudflare.com/), create a Cloudflare Zero Trust account.
- [Enroll an end-user device](/cloudflare-one/connections/connect-devices/warp/deployment/manual-deployment/) into your Cloudflare Zero Trust account.

## Create your environment

Make sure you sign up for Azure and create a new subscription.

1. First, create your first resource group.

   ![Azure group](/images/cloudflare-one/connections/connect-apps/azure-1.png)

1. In addition, create your first keypair as well. You will be using the keypair to SSH into your Virtual Machine.

   ![Azure keypair](/images/cloudflare-one/connections/connect-apps/azure-2.png)

1. Next, define your inbound and outbound ports to the VM. If these ports are not configured properly, the solution will not function as intended. For testing purposes, we will leave access open.

   ![Azure keypair](/images/cloudflare-one/connections/connect-apps/azure-3.png)

Create two Ubuntu 20.04 LTS VMs, and make sure you record their internal IP addresses. Azure by default uses the `10.0.0.0/8` subnet.

## Deploy `cloudflared`

1. SSH into your Azure instance using the command line.

   ```sh
   $ cd Downloads
   ```

   ```sh
   $ ssh -i <private key path> azureuser@20.115.124.241
   ```

1. Run `sudo su` to gain full admin rights to the Virtual Machine.

1. Install `cloudflared` on your instance. In this example, we are running a Debian-based instance, so use the Debian package of `cloudflared`:

   {{<render file="tunnel/_cloudflared-debian-install.md">}}

1. Run the following command to authenticate `cloudflared` with your Cloudflare account. The command will launch a browser window where you will be prompted to log in with your Cloudflare account and pick any zone you have added to Cloudflare.

   ```sh
   $ cloudflared tunnel login
   ```

1. Create a tunnel.

   ```sh
   $ cloudflared tunnel create Azure-01
   ```

## Complete tunnel configuration

1. Make a directory for your configuration file.

    ```sh
    $ mkdir /etc/cloudflared
    ```

    ```sh
    $ cd /etc/cloudflared
    ```

2. Build a configuration file. Before moving forward and entering vim, copy your Tunnel ID and credentials path to a notepad.

    ```sh
    $ vim config.yml
    ```

3. Type `i` to begin editing the file and copy-paste the following settings in it.

    ```text
    tunnel: <Tunnel ID/name>
    credentials-file: /root/.cloudflared/<Tunnel ID>.json
    protocol: quic
    warp-routing:
       enabled: true
    logfile: /var/log/cloudflared.log
    #cloudflared to the origin debug
    loglevel: debug
    #cloudflared to cloudflare debug
    transport-loglevel: info
    ```

4. Press `esc` and then enter `:x` to save and exit.

5. Run `cloudflared` as a service.

```sh
$ cloudflared service install
```

```sh
$ systemctl start cloudflared
```

```sh
$ systemctl status cloudflared
```

Next, visit Zero Trust and ensure your new tunnel shows as **active**. Optionally, begin creating [Access policies](/cloudflare-one/policies/access/) to secure your private resources.
