---
pcx_content_type: tutorial
title: Cloud-based Virtual Machines
---

# Cloud-based Virtual Machines

This tutorial provides an overview of how you can use a cloud-based virtual machine with Magic WAN.

## Cloudflare setup

Before you begin, [create an IPsec tunnel](/magic-wan/configure-tunnels/) and [configure your static routes](/magic-wann/configure-static-routes/).

## Set up the Virtual Machine (VM)

You can use either a Google Cloud or Azure virtual machine with Magic WAN to configure IPsec traffic. The list below is a high level outline of the steps you will need to take to set up the virtual machine and connect with Magic WAN.

1. Create the virtual machine.
2. Create a public IP for the VPN gateway.
3. Create a public IP for the VM’s NIC.
4. Associate the public IP with the VM’s NIC.
5. Create the VPN gateway.
6. Create the IPsec connection.
7. Disable anti-replay protection.

For more information on how to complete the tasks above, refer to the [Google Cloud](https://cloud.google.com/vpc/docs/create-modify-vpc-networks) or [Azure](https://learn.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-about-vpngateways) documentation.

## IPsec configuration template

For an example of a working IPsec tunnel configuration established between a Linux machine running strongSwan and Cloudflare’s Magic service, refer to the [strongSwan template](/magic-wan/tutorials/strongswan).