---
pcx-content-type: how-to
title: GCP
weight: 8
---

# Deploy `cloudflared` in GCP

The purpose of this guide is to walk through some best practices for accessing private resources on Google Cloud Platform (GCP) by deploying Cloudflare's lightweight connector, `cloudflared`.

# Prerequisites

- Navigate to the [Zero Trust Dashboard](https://dash.teams.cloudflare.com/) and create a Cloudflare Zero Trust account.
- [Enroll an end-user device](/cloudflare-one/connections/connect-devices/warp/warp-settings/#device-enrollment-permissions) into your Cloudflare Zero Trust account.

# Create your environment

To start, you will need to navigate to the Google Cloud Console and create a project. This project will contain all of your future Google Cloud resources, including the VM instances you will create in this process.

1.  From the Cloud Console, navigate to **Compute Engine**.

1.  Under Compute Engine, select **VM Instances**.

1.  In the main window, select **Create Instance**.

1.  Name your VM Instance. In this example, we will name it GCP-01.

1.  Configure your VM Instance. The following settings are recommended to get started:

    {{<Aside type="note">}}

    We support a number of operating systems and versions, so make a selection based on your requirements.
    {{</Aside>}}

    - **Machine Family:** General Purpose
    - **Series:** E2
    - **Machine Type:** e2-micro
    - **Boot Disk:** Debian GNU/Linux 10
    - **Firewall:** Allow HTTP/HTTPS traffic (if necessary)
    - **Networking, Disks, Security, Management, Sole-Tenancy:** Management

1.  Add a startup script for testing access. Here is an example:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment CodeBlock--token-unselectable">#!/bin/bash</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">apt update</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">apt -y install apache2</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">cat &lt&ltEOF &gt /var/www/html/index.html</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lthtml&gt&ltbody&gt&lth1&gtHello Cloudflare!&lt/h1&gt</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&ltp&gtThis page was created from a startup script for a Cloudflare demo.&lt/p&gt</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt/body&gt&lt/html&gt</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">EOF</span></div></span></span></span></code></pre>{{</raw>}}

1.  Spin up your VM Instance by clicking **Create**.

# Deploying `cloudflared`

Now that you have your Virtual Machine up and running in GCP, you can login into your VM instance by selecting **SSH** in the **Connect** column of our VM Instance table.

1.  Run `sudo su` to gain full admin rights to the Virtual Machine.

1.  Run `apt install wget` to install any relevant dependencies for our fresh Virtual Machine.

1.  Next, install `cloudflared` on your Virtual Machine. In this example, we are running a Debian-based VM Instance, so you will first download the debian build of `cloudflared`.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">wget &lthttps://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64&gt</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">mv ./cloudflared-linux-amd64 /usr/local/bin/cloudflared</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">chmod a+x /usr/local/bin/cloudflared</span></div></span></span></span></code></pre>{{</raw>}}

1.  Run the following command to ensure you have the most updated `cloudflared` version. The command should auto-run after pasting.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">cloudflared update</span></div></span></span></span></code></pre>{{</raw>}}

1.  Run the following command to authenticate `cloudflared` with your Cloudflare account. The command will launch a browser window where you will be prompted to log in with your Cloudflare account and pick any zone you have added to Cloudflare.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">cloudflared tunnel login</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

1.  Create a tunnel.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">cloudflared tunnel create GCP-01`</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

1.  Route your tunnel. In this example, we will expose the smallest range available. We can add more IP routes later if necessary.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">cloudflared tunnel route ip add 10.128.0.4/32 GCP-01</span></div></span></span></span></code></pre>{{</raw>}}

{{<render file="_cloudflared-cloud-deployment.md">}}