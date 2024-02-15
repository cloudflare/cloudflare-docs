---
pcx_content_type: how-to
title: Network segmentation
weight: 1
---

# Network segmentation

You can define policies in your Connector to allow traffic to flow between your LANs without it leaving your local premises. These policies can be created for specific subnets, and link two LANs.

Creating these policies to segment your network means traffic will flow locally and bypass Cloudflare. As a best practice for security, we recommend sending all traffic through Cloudflare’s network for Zero Trust security filtering. Use these policies judiciously and only for scenarios where you have a hard requirement for LAN to LAN traffic flows.

The following guide assumes you have already created a site and configured your Connector. To learn how to create a site and configure your Connector, refer to [Configure hardware Connector](/magic-wan/configuration/connector/configure-hardware-connector/) or [Configure virtual connector](/magic-wan/configuration/connector/configure-virtual-connector/), depending on the type of Magic WAN Connector you have on your premises.

## Create a policy

Follow the steps below to create a new LAN policy to segment your network. Only the fields marked **required** are mandatory.

Log in to the Cloudflare dashboard, and select your account.
Select Magic WAN > Sites.
Select the site you want to configure > Edit.
Go to Network, and scroll down to LAN configuration.
Select LAN policies > Create Policy.
In Policy name, enter a descriptive name for the policy you are creating.
From the dropdown menu LAN 1, select your origin LAN.
(Optional) Specify a subnet for your first LAN in Subnets.
(Optional) In Ports specify the TCP/UDP ports you want to use. Add a comma to separate each of the ports you want to use.
In LAN 2, select the destination LAN and repeat the above process to configure it.
(Optional) Select the type of traffic you want to keep local. You can choose TCP, UDP, and ICMP. You can also select Any to choose all types of traffic.
Select Create policy.
