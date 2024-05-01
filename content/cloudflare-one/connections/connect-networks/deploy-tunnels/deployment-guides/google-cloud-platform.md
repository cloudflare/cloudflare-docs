---
pcx_content_type: how-to
title: GCP
weight: 5
---

# Deploy `cloudflared` in GCP

This guide covers how to connect a Google Cloud Project (GCP) virtual machine to Cloudflare  using our lightweight connector, `cloudflared`.

We will deploy:

- A Google Cloud Project (GCP) virtual machine that runs a basic HTTP server.
- A Cloudflare Tunnel that allows users to connect to the service via either a public hostname or a private IP address.

### Prerequisites

To complete the following procedure, you will need to:

- [Add a website to Cloudflare](/fundamentals/setup/manage-domains/add-site/)
- [Deploy the WARP client](/cloudflare-one/connections/connect-devices/warp/deployment/manual-deployment/) on an end-user device

## 1. Create a VM instance in GCP

1. In your [Google Cloud Console](https://console.cloud.google.com/), [create a new project](https://developers.google.com/workspace/guides/create-project).
2. Go to **Compute Engine** > **VM instances**.
3. Select **Create instance**.
4. Name your VM instance. In this example we will name it `http-test-server`.
5. Configure the VM instance with your desired operating system and specifications. For this example, you can use the following settings:

    - **Machine family:** General Purpose
    - **Series:** E2
    - **Machine type:** e2-micro
    - **Boot disk image:** Debian GNU/Linux 12
    - **Firewalls**: Allow HTTP and HTTPS traffic

6. Under **Advanced options** > **Management** > **Automation**, add the following startup script. This example deploys a basic Apache web server on port `80`.

    ```bash
    #!/bin/bash
    apt update
    apt -y install apache2
    cat <<EOF > /var/www/html/index.html
    <html><body><h1>Hello Cloudflare!</h1>
    <p>This page was created from a startup script for a Cloudflare demo.</p>
    </body></html>
    EOF
    ```

7. Select **Create**.

8. The operating system automatically starts the Apache HTTP server. To verify that the server is running:

    1. Copy the **External IP** for the VM instance.
    2. Open a browser and go to `http://<EXTERNAL IP>`. You should see the **Hello Cloudflare!** test page.

9. To login to the VM instance, open the dropdown next to **SSH** and select _Open in browser window_.

## 2. Create a Cloudflare Tunnel

Next, we will create a Cloudflare Tunnel in Zero Trust and run the tunnel on the VM.

1. Log in to [Zero Trust](https://one.dash.cloudflare.com) and go to **Networks** > **Tunnels**.

2. Select **Create a tunnel**.

3. Choose **Cloudflared** for the connector type and select **Next**.

4. Enter a name for your tunnel (for example, `gcp-tunnel`).

5. Select **Save tunnel**.

6. Under **Choose your environment**, select **Debian**. Copy the command shown in the dashboard and paste it into your GCP VM terminal.

7. Once the command has finished running, your connector will appear in Zero Trust.

8. Select **Next**.

## 3. Connect using a public hostname

To configure a public hostname route for your Cloudflare Tunnel:

1. In the **Public Hostname** tab, enter a hostname for the application (for example, `hellocloudflare.<your-domain>.com`).
2. Under **Service**, enter `http://localhost:80`.
3. Select **Save hostname**.
4. To test, open a browser and go to `http://hellocloudflare.<your-domain>.com`. You should see the **Hello Cloudflare!** test page.

You can optionally [create an Access application](/cloudflare-one/applications/configure-apps/self-hosted-apps/) to control who can access the service via its public hostname.

### Related resources

- [Public hostnames](/cloudflare-one/connections/connect-networks/routing-to-tunnel/)
- [Origin configuration](/cloudflare-one/connections/connect-networks/configure-tunnels/origin-configuration/)

## 4. Connect using a private IP

To configure a private network route for your Cloudflare Tunnel:

1. In the **Private Network** tab, enter the **Internal IP** of your GCP VM instance (for example, `10.0.0.2`).
2. In your [Split Tunnel configuration](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/#add-a-route), make sure the internal IP is routing through WARP. For example, if you are using Split Tunnels in Exclude mode, delete `10.0.0.0/8`.  We recommend re-adding the IPs that are not explicitly used by your GCP VM -- you can use [this calculator](https://www.procustodibus.com/blog/2021/03/wireguard-allowedips-calculator/) to determine which IP addresses to re-add.
3. To test, [log in to the WARP client](/cloudflare-one/connections/connect-devices/warp/deployment/manual-deployment/). Open a terminal window and run the following command:

    ```sh
    $ curl 10.0.0.2
    <html><body><h1>Hello Cloudflare!</h1>
    <p>This page was created from a startup script for a Cloudflare demo.</p>
    </body></html>
    ```

You can optionally [create Gateway network policies](/cloudflare-one/connections/connect-networks/private-net/cloudflared/#4-recommended-filter-network-traffic-with-gateway) to control who can access the VM via its private IP.

### Related resources

- [Connect over SSH](/cloudflare-one/connections/connect-networks/use-cases/ssh/)

## GCP firewall configuration

By default, GCP denies all ingress traffic and allows all egress traffic (refer to [Implied rules](https://cloud.google.com/firewall/docs/firewalls#default_firewall_rules)). The default VPC network also comes with [pre-configured rules](https://cloud.google.com/firewall/docs/firewalls#more_rules_default_vpc) which allow certain types of ingress traffic.

To secure your VM instance, you can [configure your VPC firewall rules](https://cloud.google.com/firewall/docs/using-firewalls) to deny all ingress traffic and allow only egress traffic. The general steps are as follows:

1. Create a firewall rule to deny all egress traffic.
2. Create a higher priority firewall rule that allows egress traffic to the [Cloudflare Tunnel IP addresses](/cloudflare-one/connections/connect-networks/deploy-tunnels/tunnel-with-firewall/#required-for-tunnel-operation).
3. If needed, create additional rules to allow specific egress traffic.
4. Delete any unnecessary ingress rules. Note that if you delete the default `allow-ssh` rule, you will be unable to SSH back into the VM.
5. Verify that you can still access the service through Cloudflare Tunnel via its [public hostname](#3-connect-using-a-public-hostname) or [private IP](#4-connect-using-a-private-ip).
6. Verify that the service is no longer accessible from outside the tunnel via its external IP. For example, if you go to `http://<EXTERNAL IP>` the test page should no longer load.
