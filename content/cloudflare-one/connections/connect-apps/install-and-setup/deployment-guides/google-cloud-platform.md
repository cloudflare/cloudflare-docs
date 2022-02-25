---
pcx-content-type: how-to
title: Deploy  in GCPPrerequisitesCreate your environmentDeploying
weight: 8
---

# Deploy `cloudflared` in GCP

The purpose of this guide is to walk through some best practices for accessing private resources on Google Cloud Platform (GCP) by deploying Cloudflare's lightweight connector, `cloudflared`.

# Prerequisites

*   Navigate to the [Zero Trust Dashboard](https://dash.teams.cloudflare.com/) and create a Cloudflare Zero Trust account.
*   [Enroll an end-user device](/cloudflare-one/connections/connect-devices/warp/warp-settings/#device-enrollment-permissions) into your Cloudflare Zero Trust account.

# Create your environment

To start, you will need to navigate to the Google Cloud Console and create a project. This project will contain all of your future Google Cloud resources, including the VM instances you will create in this process.

1.  From the Cloud Console, navigate to **Compute Engine**.

2.  Under Compute Engine, select **VM Instances**.

3.  In the main window, select **Create Instance**.

4.  Name your VM Instance. In this example, we will name it GCP-01.

5.  Configure your VM Instance. The following settings are recommended to get started:

    <Aside type='note'>
    We support a number of operating systems and versions, so make a selection based on your requirements.
    </Aside>

    *   **Machine Family:** General Purpose
    *   **Series:** E2
    *   **Machine Type:** e2-micro
    *   **Boot Disk:** Debian GNU/Linux 10
    *   **Firewall:** Allow HTTP/HTTPS traffic (if necessary)
    *   **Networking, Disks, Security, Management, Sole-Tenancy:** Management

6.  Add a startup script for testing access. Here is an example:

    ```sh
    #!/bin/bash
    apt update
    apt -y install apache2
    cat <<EOF > /var/www/html/index.html
    <html><body><h1>Hello Cloudflare!</h1>
    <p>This page was created from a startup script for a Cloudflare demo.</p>
    </body></html>
    EOF
    ```

7.  Spin up your VM Instance by clicking **Create**.

# Deploying `cloudflared`

Now that you have your Virtual Machine up and running in GCP, you can login into your VM instance by selecting **SSH** in the **Connect** column of our VM Instance table.

1.  Run `sudo su` to gain full admin rights to the Virtual Machine.

2.  Run `apt install wget` to install any relevant dependencies for our fresh Virtual Machine.

3.  Next, install `cloudflared` on your Virtual Machine. In this example, we are running a Debian-based VM Instance, so you will first download the debian build of `cloudflared`.

    ```sh
    wget <https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64>
    mv ./cloudflared-linux-amd64 /usr/local/bin/cloudflared
    chmod a+x /usr/local/bin/cloudflared
    ```

4.  Run the following command to ensure you have the most updated `cloudflared` version. The command should auto-run after pasting.

    ```sh
    cloudflared update
    ```

5.  Run the following command to authenticate `cloudflared` with your Cloudflare account. The command will launch a browser window where you will be prompted to log in with your Cloudflare account and pick any zone you have added to Cloudflare.

    ```sh
    $ cloudflared tunnel login
    ```

6.  Create a tunnel.

    ```sh
    $ cloudflared tunnel create GCP-01`
    ```

7.  Route your tunnel. In this example, we will expose the smallest range available. We can add more IP routes later if necessary.

    ```sh
    cloudflared tunnel route ip add 10.128.0.4/32 GCP-01
    ```

8.  Make a directory for your configuration file.

    ```sh
    mkdir /etc/cloudflared
    ```

    ```sh
    cd /etc/cloudflared
    ```

9.  Build our configuration file. Before moving forward and entering vim, copy your Tunnel ID and credentials path to a notepad.

    ```sh
    vim config.yml
    ```

10. Hit `i` to begin editing the file and copy-paste the following settings in it.

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

11. Hit `space` and then type `:x` to save and exit.

12. Run `cloudflared` as a service.

```sh
cloudflared service install
```

```sh
systemctl start cloudflared
```

```sh
systemctl status cloudflared
```

Next, visit the Zero Trust dashboard and ensure your new tunnel shows as **active**. Optionally, begin creating [Zero Trust policies](/cloudflare-one/policies/zero-trust/) to secure your private resources.
