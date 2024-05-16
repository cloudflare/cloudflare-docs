---
pcx_content_type: how-to
title: AWS
weight: 2
meta:
   title: Deploy cloudflared in AWS
---

# Deploy `cloudflared` in AWS

This guide covers how to connect an Amazon Web Services (AWS) virtual machine to Cloudflare using our lightweight connector, `cloudflared`.

We will deploy:

- An EC2 virtual machine that runs a basic HTTP server.
- A Cloudflare Tunnel that allows users to connect to the service via either a public hostname or a private IP address.

### Prerequisites

To complete the following procedure, you will need to:

- [Add a website to Cloudflare](/fundamentals/setup/manage-domains/add-site/)
- [Deploy the WARP client](/cloudflare-one/connections/connect-devices/warp/deployment/manual-deployment/) on an end-user device

## 1. Create a VM instance in AWS

1. From the AWS console, go to **Compute** > **EC2** > **Instances**

2. Select **Launch instance**.

3. Name your VM instance. In this example we will name it `http-test-server`.

4. For **Amazon Machine Image (AMI)* choose your desired operating system and specifications. For this example, we will use _Ubuntu Server 24.04 LTS (HVM), SSD Volume Type_.

5. For **Instance type:**, you can select _t2.micro_ which is available on the free tier.

6. In **Key pair (login)**, create a new key pair to use for SSH. You will need to download the `.pem` file onto your local machine.

7. In **Network settings**, select **Create security group**.

8. Turn on the following security group rules:
    - **Allow SSH traffic from _My IP_** to prevent the instance from being publicly accessible.
    - **Allow HTTPS traffic from the internet**
    - **Allow HTTP traffic from the internet**

9. Select **Launch instance**.

10. Once the instance is up and running, go to the **Instances** summary page and copy its **Public IPv4 DNS** hostname (for example, `ec2-44-202-59-16.compute-1.amazonaws.com`).

11. To log in to the instance over SSH, open a terminal and run the following commands:

  ```sh
  $ cd Downloads
  ```

  ```
  chmod 400 "YourKeyPair.pem"
  ```

  ```sh
  $ ssh -i "YourKeyPair.pem" ubuntu@ec2-44-202-59-16.compute-1.amazonaws.com
  ```

12. Run `sudo su` to gain full admin rights to the instance.

13. For testing purposes, you can deploy a basic Apache web server on port `80`:

  ```bash
  apt update
  apt -y install apache2
  cat <<EOF > /var/www/html/index.html
  <html><body><h1>Hello Cloudflare!</h1>
  <p>This page was created for a Cloudflare demo.</p>
  </body></html>
  EOF
  ```

14. To verify that the Apache server is running, open a browser and go to `http://ubuntu@ec2-44-202-59-16.compute-1.amazonaws.com` (make sure to connect over `http`, not `https`). You should see the **Hello Cloudflare!** test page.

## 2. Create a Cloudflare Tunnel

Next, we will create a Cloudflare Tunnel in Zero Trust and run the tunnel on the VM.

1. Log in to [Zero Trust](https://one.dash.cloudflare.com) and go to **Networks** > **Tunnels**.

2. Select **Create a tunnel**.

3. Choose **Cloudflared** for the connector type and select **Next**.

4. Enter a name for your tunnel (for example, `aws-tunnel`).

5. Select **Save tunnel**.

6. Under **Choose your environment**, select **Debian**. Copy the command shown in the dashboard and run it on your AWS instance.

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

1. In the **Private Network** tab, enter the **Private IPv4 address** of your AWS instance (for example, `172.31.19.0`).
2. In your [Split Tunnel configuration](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/#add-a-route), make sure the internal IP is routing through WARP. For example, if you are using Split Tunnels in Exclude mode, delete `172.16.0.0/12`.  We recommend re-adding the IPs that are not explicitly used by your AWS instance -- you can use [this calculator](https://www.procustodibus.com/blog/2021/03/wireguard-allowedips-calculator/) to determine which IP addresses to re-add.
3. To test on a user device:
    1. [Log in to the WARP client](/cloudflare-one/connections/connect-devices/warp/deployment/manual-deployment/).
    2. Open a terminal window and connect to the service using its private IP:

      ```sh
      $ curl 172.31.19.0
      <html><body><h1>Hello Cloudflare!</h1>
      <p>This page was created for a Cloudflare demo.</p>
      </body></html>
      ```

You can optionally [create Gateway network policies](/cloudflare-one/connections/connect-networks/private-net/cloudflared/#4-recommended-filter-network-traffic-with-gateway) to control who can access the instance via its private IP.

### Related resources

- [Connect over SSH](/cloudflare-one/connections/connect-networks/use-cases/ssh/)

## Firewall configuration
