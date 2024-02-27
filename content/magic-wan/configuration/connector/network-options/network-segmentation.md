---
pcx_content_type: how-to
title: Network segmentation
---

# Network segmentation

You can define policies in your Connector to allow traffic to flow between your LANs without it leaving your local premises. These policies can be created for specific subnets, and link two LANs.

Creating these policies to segment your network means traffic will flow locally and bypass Cloudflare. As a best practice for security, we recommend sending all traffic through Cloudflare's network for Zero Trust security filtering. Use these policies with care and only for scenarios where you have a hard requirement for LAN to LAN traffic flows.

The following guide assumes you have already created a site and configured your Connector. To learn how to create a site and configure your Connector, refer to [Configure hardware Connector](/magic-wan/configuration/connector/configure-hardware-connector/) or [Configure virtual connector](/magic-wan/configuration/connector/configure-virtual-connector/), depending on the type of Magic WAN Connector you have on your premises.

## Create a policy

Follow the steps below to create a new LAN policy to segment your network. Only the fields marked **required** are mandatory.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2. Select **Magic WAN** > **Sites**.
3. Select the site you want to configure > **Edit**.
4. Go to **Network**, and scroll down to **LAN configuration**.
5. Select **LAN policies** > **Create Policy**.
6. In **Policy name**, enter a descriptive name for the policy you are creating.
7. From the drop-down menu **LAN 1**, select your origin LAN.
8. (Optional) Specify a subnet for your first LAN in **Subnets**.
9. (Optional) In **Ports** specify the TCP/UDP ports you want to use. Add a comma to separate each of the ports.
10. In **LAN 2**, select the destination LAN and repeat the above process to configure it.
11. (Optional) Select the type of traffic you want to keep local. You can choose **TCP**, **UDP**, and **ICMP**. You can also select **Any** to choose all types of traffic.
12. Select **Create policy**.

The new policy will ensure that traffic between the specified LANs flows locally, bypassing Cloudflare.

## Edit a policy

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2. Select **Magic WAN** > **Sites**.
3. Select the site you want to configure > **Edit**.
4. Go to **Network**, and scroll down to **LAN configuration**.
5. Select **LAN policies**.
6. Select the policy you need to edit > **Edit**.
7. Make your changes, and select **Update policy**.

## Delete a policy

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2. Select **Magic WAN** > **Sites**.
3. Select the site you want to configure > **Edit**.
4. Go to **Network**, and scroll down to **LAN configuration**.
5. Select **LAN policies**.
6. Select the policy you need to edit > **Edit**.
7. Select **Delete**.
8. Select **I understand that deleting a policy is permanent** in the dialog box > **Delete**.