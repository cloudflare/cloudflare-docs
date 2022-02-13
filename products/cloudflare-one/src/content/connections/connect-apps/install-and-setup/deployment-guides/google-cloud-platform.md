---
order: 7
pcx-content-type: how-to
---

# Deploy `cloudflared` in GCP

The purpose of this guide is to walk through some best practices for accessing private resources on GCP by deploying our lightweight connector, `cloudflared`.


# Prerequisites

- If you haven’t created a Cloudflare Zero Trust account, navigate to the dashboard to get started.
- If you haven’t enrolled an end-user device into your Cloudflare Zero Trust account, navigate to the Cloudflare WARP download to get started.


# Create your environment

To start, we’ll navigate to the Google Cloud Console and create a project. This project will contain all of our future Google Cloud resources, including our VM instances we’ll create in this guide.

1. From the Cloud Console, navigate to**Compute Engine**

   - Under Compute Engine, select**VM Instances**
   - In the main window, select**Create Instance**

2. Name your VM Instance

   - In this example, I’ll name mine GCP-01

3. Configure your VM Instance. We recommend the following to get started:

   - **Machine Family:** General Purpose

   - **Series:** E2

   - **Machine Type:** e2-micro

   - **Boot Disk:** Debian GNU/Linux 10

     - Note: We support a number of OS/Version so make a selection based on your environmental requirements

   - **Firewall:** Allow HTTP/HTTPS traffic (if necessary)

   - **Networking, Disks, Security, Management, Sole-Tenancy:** Management

     - Add a startup script for testing access. Here is an example:

       - ```sh
        #! /bin/bash
        apt update
        apt -y install apache2
        cat <<EOF > /var/www/html/index.html
        <html><body><h1>Hello Cloudflare!</h1>
        <p>This page was created from a startup script for a Cloudflare demo.</p>
        </body></html>
        EOF
        ```

4. Spin up your VM Instance by clicking**Create**

# Deploying `cloudflared`

Now that we have our VM up and running in GCP we can login into our VM instance by selecting**SSH**in the Connect column of our VM Instance table

1. Type sudo su to gain full admin rights to the Virtual Machine

2. Install any relevant dependencies for our fresh Virtual Machine

   - Run `apt install wget`

3. Install `cloudflared` on our Virtual Machine

   - In this example, we are running a Debian-based VM Instance

     - Download the debian build of `cloudflared`

       - wget <https://github.com/cloudflare/cloudflared/releases/download/2021.8.0/cloudflared-linux-amd64>

         - `mv ./cloudflared-linux-amd64 /usr/local/bin/cloudflared`
         - `chmod a+x /usr/local/bin/cloudflared`
         - `cloudflared update`
         - Note: This should auto-run after pasting
         - Note: Don't forget to hit enter when you see `cloudflared` update to get the latest version

4. Authenticate `cloudflared` to with your Cloudflare account

   - `cloudflared tunnel login`

     - You may have to open the link in a separate window to authenticate to your Cloudflare Zero Trust account

5. Create your Tunnel

   - `cloudflared tunnel create GCP-01`

6. Route your Tunnel

   - `cloudflared tunnel route ip add 10.128.0.4/32 GCP-01`

     - In this example, we will expose the smallest range available and later we can add more IP routes if necessary

7. Make a directory for your configuration file

   - `mkdir /etc/cloudflared`
   - `cd cloudflared`

8. Build our configuration file

   - Note: Before moving forward, copy your tunnel_id and credentials path to notepad before entering vim

   - `vim config.yml`

     - Hit `i` to begin editing in VIM

       - ```text
       tunnel: <Tunnel ID/name>
       credentials-file: /root/.cloudflared/<Tunnel ID>.json
       protocol: quic
       warp-routing:
         enabled: true
       logfile: /var/log/cloudflared.log
       #cloudflared to the origin debug
       loglevel: debug
       #cloudflared to cloudflare debug
       transport-loglevel: debug
       ```

   - Hit `space` and then `:x` to save and exit

9. Run `cloudflared` as a service

   - `cloudflared service install`
   - `systemctl start cloudflared`
   - `systemctl status cloudflared`


Next, visit the Zero Trust dashboard and ensure your new Tunnel shows as `active` and optionally begin creating Zero Trust policies to secure your private resources
