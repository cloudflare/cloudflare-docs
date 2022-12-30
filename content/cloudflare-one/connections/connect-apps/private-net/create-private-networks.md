---
pcx_content_type: how-to
title: Create private networks
weight: 5
---

# Create private networks with Cloudflare WARP

With Cloudflare Zero Trust, you can create a private network between any two or more devices running Cloudflare WARP. This means that you can have a private network between your phone and laptop without ever needing to be connected to the same physical network. If you already have an existing Zero Trust deployment, you can also enable this feature to add device-to-device connectivity to your private network with the click of a button. This will allow you to connect to any service that relies on TCP, UDP, or ICMP-based protocols through Cloudflare’s network. Users in your organization can reach these services by enrolling into your organization's Zero Trust account. 

Once enrolled, each device is assigned a virtual IP address in the 100.64/10 range which will allow users or systems to address these devices directly. Administrators will then be able to build Zero Trust policies to determine who within your organization can reach those virtual IPs.

This tutorial covers how to: 

- Define which devices should be allowed to enroll into your Zero Trust organization
- Install Cloudflare WARP and start enrolling devices
- Enable WARP-to-WARP connectivity to establish a virtual network between your devices
- Manage Split Tunnel preferences for the WARP client to determine what traffic should be routed to the Cloudflare Global Network
- Create Zero Trust security policies to restrict access
- Connect to virtual IP spaces from WARP devices without any client-side configuration changes

**Time to complete**: 30 minutes

## Define a device enrollment policy

1. Log in to the [Cloudflare Zero Trust dashboard](https://one.dash.cloudflare.com/) and select your account.
2. Navigate to **Settings** > **WARP Client**.
3. In **Device enrollment permissions**, select **Manage**.
4. Select **Add a rule** and determine who is allowed to enroll by using criteria including Access groups, groups from your identity provider, email domain, or named users.
5. Select **Save**.

Your rule will now be visible under the Device enrollment rules list.

## Prerequisite

Install the Cloudflare WARP client by following the [instructions](/cloudflare-one/connections/connect-devices/warp/deployment/) depending on your device type. 
​​
## Enroll a device

1. Once the WARP client is installed, select the gear icon.
2. Under preferences, select **Account** > **Login with Cloudflare Zero Trust**.
3. Input your [team name](/cloudflare-one/glossary/#team-name). You can locate it on the Zero Trust Dashboard under **Settings** > **General**.

If you have already set up an identity provider in Cloudflare Access, the user will be prompted to login using this method. If you have not set up an Identity Provider, you can get started with a one-time pin which is enabled by default. Once authenticated, the client will update to our Zero Trust mode. You can select the gear to toggle between DNS filtering or full proxy. 

## Enable the WARP-to-WARP configuration

1. Go to **Settings** > **Network**.
2. Enable **Proxy**.
3. Enable **Warp-to-Warp**.

This will instruct Cloudflare to begin proxying any traffic from enrolled devices, except the traffic excluded using the split tunnel settings.

## Configure Split Tunnel preferences

1. Go to **Settings** > **WARP Client**.
2. In **Split Tunnel settings**, select **Manage**.
3. Remove the 100.64/10 range from your Split Tunnel exclude list.

This will instruct WARP to begin proxying any traffic destined for a 100.64/10 IP address to Cloudflare for routing and policy enforcement. 

## Connect via WARP

Once enrolled, your users and services will be able to connect to the virtual IPs configured for TCP, UDP, or ICMP-based traffic.

Optionally, you can create Zero Trust policies in the Gateway Network rule builder by blocking the 100.64/10 IP space and creating identity based rules around the virtual IPs you wish to allow users to access. 
