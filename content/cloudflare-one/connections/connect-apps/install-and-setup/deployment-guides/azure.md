---
pcx-content-type: how-to
title: Azure
weight: 8
---

# Deploy `cloudflared` in Azure

The purpose of this guide is to walk through some best practices for accessing private resources on AWS by deploying Cloudflare's lightweight connector, `cloudflared`. 

We will walk through how to initialize a service on a Linux VM in Azure, and route to it from another VM running `cloudflared`. This deployment guide does not take into account routing beyond basic security groups and default VPCs.

## Prerequisites

- Navigate to the [Zero Trust Dashboard](https://dash.teams.cloudflare.com/) and create a Cloudflare Zero Trust account.
- [Enroll an end-user device](/cloudflare-one/connections/connect-devices/warp/warp-settings/#device-enrollment-permissions) into your Cloudflare Zero Trust account.

## Create your environment

Make sure you sign up for Azure and create a new subscription.

1. First, create your first resource group.

    ![Azure group](/cloudflare-one/static/documentation/connections/connect-apps/azure-1.png)

1. In addition, create your first keypair as well. You will be using the keypair to SSH into your Virtual Machine.

    ![Azure keypair](/cloudflare-one/static/documentation/connections/connect-apps/azure-2.png)

1. Next, define your inbound and outbound ports to the VM. If these ports are not configured properly, the solution will not function as intended. For testing purposes, we will leave access open.

    ![Azure keypair](/cloudflare-one/static/documentation/connections/connect-apps/azure-3.png)

Create two Ubuntu 20.04 LTS VMs, and make sure you record their internal IP addresses. Azure by default uses the `10.0.0.0/8` subnet.

## Deploy `cloudflared`

1. SSH into your AWS instance using the command line.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">cd Downloads</span></div></span></span></span></code></pre>{{</raw>}}
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ssh -i &ltprivate key path&gt azureuser@20.115.124.241</span></div></span></span></span></code></pre>{{</raw>}}

1. Run `sudo su` to gain full admin rights to the Virtual Machine.

1. Install `cloudflared` on your instance. In this example, we are running a Debian-based instance, so download the Debian build of `cloudflared`:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb</span></div></span></span></span></code></pre>{{</raw>}}
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dpkg -i cloudflared-linux-amd64.deb</span></div></span></span></span></code></pre>{{</raw>}}

1.  Run the following command to authenticate `cloudflared` with your Cloudflare account. The command will launch a browser window where you will be prompted to log in with your Cloudflare account and pick any zone you have added to Cloudflare.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">cloudflared tunnel login</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

1.  Create a tunnel.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">cloudflared tunnel create Azure-01</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

{{<render file="_cloudflared-cloud-deployment.md">}}