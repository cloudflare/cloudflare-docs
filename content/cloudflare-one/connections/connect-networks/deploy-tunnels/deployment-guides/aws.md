---
pcx_content_type: how-to
title: AWS
weight: 2
---

# Deploy `cloudflared` in AWS

The purpose of this guide is to walk through some best practices for accessing private resources on AWS by deploying Cloudflare's lightweight connector, `cloudflared`.

We will walk through how to initialize a service on a Linux VM in AWS, and route to it from another VM running cloudflared. This deployment guide does not take into account routing beyond basic security groups and default VPCs.

## Prerequisites

- In [Zero Trust](https://one.dash.cloudflare.com/), create a Cloudflare Zero Trust account.
- [Enroll an end-user device](/cloudflare-one/connections/connect-devices/warp/deployment/manual-deployment/) into your Cloudflare Zero Trust account.

## Create your environment

1. From the AWS console, go to **Build a Solution** and select **Launch a Virtual Machine with EC2**.

   ![AWS console](/images/cloudflare-one/connections/connect-apps/aws-console.png)

1. Next, select the appropriate AMI. In this instance, we are using Ubuntu 18.0.

   ![AWS console](/images/cloudflare-one/connections/connect-apps/aws-step-2.png)

1. When selecting your instance type, choose `t2.micro`. This type is available for the free tier.

1. Select **Next: Configure Instance Details**.

1. Because we are leaving this device on the default VPC, you will not need to make any changes in the next couple of steps, nor will you need to add additional storage or tags. Select **Next: Add Storage**, and then select **Next: Add Tags**.

   ![AWS console](/images/cloudflare-one/connections/connect-apps/aws-step-3.png)

1. Next, advance to **Security Group Settings** and add two policies:

   - Ensure SSH is only accessible from your IP to prevent it being publicly accessible.
   - Allow traffic from `172.31.0.0/16`, which is the default internal IP range that AWS will give your device.

1. Deploy two `t2.micro` devices, and then build a key pair. You will need to [download the `.pem` file](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/install-cloudflare-cert/) in order to use SSH in the next steps.

1. Finally, make sure you locate the Public IPv4 DNS address inside the instance summary on the AWS console. You will need that parameter as well in order to use SSH.

![AWS console](/images/cloudflare-one/connections/connect-apps/aws-step-4.png)

The next step is to build out and route a service.

## Deploy `cloudflared`

Now that we have EC2 up and running in AWS, you can log in to your instance.

1. SSH into your AWS instance using the command line.

   ```sh
   $ cd Downloads
   ```

   ```sh
   $ ssh -i "TestKeyPair.pem" ubuntu@ec2-44-202-59-16.compute-1.amazonaws.com
   ```

1. Run `sudo su` to gain full admin rights to the Virtual Machine.

1. Run `apt install wget` to install any relevant dependencies for your new instance.

1. Install `cloudflared` on your instance. In this example, we are running a Debian-based instance, so download the Debian build of `cloudflared`:

   ```sh
   $ wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
   ```

   ```sh
   $ dpkg -i cloudflared-linux-amd64.deb
   ```

1. Run the following command to authenticate `cloudflared` with your Cloudflare account. The command will launch a browser window where you will be prompted to log in with your Cloudflare account and pick any zone you have added to Cloudflare.

   ```sh
   $ cloudflared tunnel login
   ```

1. Create a tunnel.

   ```sh
   $ cloudflared tunnel create AWS-01
   ```

1. Route your tunnel. In this example, we will expose the smallest range available. We can add more IP routes later if necessary.

   ```sh
   $ cloudflared tunnel route ip add 172.31.0.0/16 AWS-01
   ```

{{<render file="_cloudflared-cloud-deployment.md">}}
