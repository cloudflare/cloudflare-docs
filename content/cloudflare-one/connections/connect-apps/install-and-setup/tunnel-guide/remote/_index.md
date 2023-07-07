---
title: Via the dashboard
pcx_content_type: how-to
weight: 1
layout: single
---

# Set up a tunnel through the dashboard

Follow this step-by-step guide to get your first tunnel up and running using Zero Trust.

## Prerequisites

Before you start, make sure you:

- [Add a website to Cloudflare](/fundamentals/get-started/setup/add-site/).
- [Change your domain nameservers to Cloudflare](/dns/zone-setups/full-setup/setup/).

## 1. Create a tunnel

1. Log in to [Zero Trust](https://one.dash.cloudflare.com) and go to **Access** > **Tunnels**.

2. Select **Create a tunnel**.

3. Enter a name for your tunnel. We suggest choosing a name that reflects the type of resources you want to connect through this tunnel (for example, `enterprise-VPC-01`).

4. Select **Save tunnel**.

5. Next, you will need to install `cloudflared` and run it. To do so, check that the environment under **Choose an environment** reflects the operating system on your machine, then copy the command in the box below and paste it into a terminal window. Run the command.

6. Once the command has finished running, your connector will appear in Zero Trust.

   ![Connector appearing in the UI after cloudflared has run](/images/cloudflare-one/connections/connect-apps/connector.png)

7. Select **Next**.

The next steps depend on whether you want to [connect an application](#2-connect-an-application) or [connect a network](#3-connect-a-network).

## 2. Connect an application

Follow these steps to connect an application through your tunnel. If you are looking to connect a network, skip to the [Connect a network section](#3-connect-a-network).

1. In the **Public Hostnames** tab, choose an application from the drop-down menu and specify any subdomain or path information.

2. Specify a service, for example `https://localhost:8000`.

3. Under **Additional application settings**, specify any parameters you would like to add to your tunnel configuration.

4. Select **Save `<tunnel-name>`**.

## 3. Connect a network

Follow these steps to connect a private network through your tunnel.

1. In the **Private Networks** tab, add an IP or CIDR.

2. Select **Save `<tunnel-name>`**.

## 4. View your tunnel

After saving the tunnel, you will be redirected to the **Tunnels** page. Look for your new tunnel to be listed along with its active connector.

![Tunnel appearing in the Tunnels table](/images/cloudflare-one/connections/connect-apps/tunnel-table.png)

{{<Aside type="note" header="Troubleshooting">}}

If you run into issues while setting up your tunnel, refer to the [troubleshooting FAQ](/cloudflare-one/faq/cloudflare-tunnels-faq/#how-can-i-troubleshoot-a-tunnel-that-was-configured-from-zero-trust).

{{</Aside>}}
