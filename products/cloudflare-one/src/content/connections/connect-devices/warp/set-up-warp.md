---
order: 0
pcx-content-type: how-to
title: First-time setup
---

# Set up WARP for your organization

This is a high-level, step-by-step walkthrough on how to get started with WARP in your organization. From downloading the client to sending the first queries to Cloudflare's edge, here is a guide on how to do it for the first time.

## Gateway with WARP (default)

### 1. Create a Cloudflare for Teams account.

The Cloudflare for Teams Dashboard will be your go-to place to check device connectivity data, as well as create Secure Web Gateway and Zero Trust policies for your organization. 

As you complete the [Teams onboarding](/setup), you will be asked to create a [team name](/glossary#team-name) for your organization. You will need the team name when you deploy the WARP client on your devices; it will allow your users to connect to your organization's Cloudflare for Teams instance.

### 2. Set up a login method.

Configure [One-time PIN](/identity/one-time-pin) or connect a [third-party identity provider](/identity/idp-integration) on the Teams Dashboard. This is the login method your users will utilize when authenticating to add a new device to your Teams setup.

### 3. Next, define [device enrollment permissions](/connections/connect-devices/warp/warp-settings#device-enrollment-permissions).

Create device enrollment rules to define which users in your organization should be able to connect devices to your organization's Teams setup. As you create your rule, you will be asked to select which login method you would like users to authenticate with.

### 4. Install the [Cloudflare root certificate](/connections/connect-devices/warp/install-cloudflare-cert) on your devices.

Advanced security features including HTTP traffic inspection require users to install and trust the Cloudflare root certificate on their machine or device. If you are installing certificates manually on all your devices, these steps will need to be performed on each new device that is to be subject to HTTP filtering.

### 5. Download and deploy the WARP client to your devices.

Choose one of the [different ways](/connections/connect-devices/warp/deployment) to deploy the WARP client, depending on what works best for your organization.

### 6. Enable the Proxy setting in the Teams Dashboard.

Navigate to **Settings** > **Network** and enable the **Proxy** setting. This will allow you to start routing your HTTP traffic to Gateway.  

### 7. Go through this checklist.

To begin inspecting DNS and HTTP traffic on your devices, you need to ensure all of the following:

* Your devices have the WARP client installed and connected.
* The [Cloudflare root certificate](/connections/connect-devices/warp/install-cloudflare-cert) has been installed on your devices.
* The [proxy setting](/connections/connect-devices/warp/warp-settings#enable-proxy) has been enabled on the Cloudflare for Teams Dashboard.

## Gateway with DoH

This mode is best suited for organizations that only want to apply DNS filtering to outbound traffic from their company devices. It does not enable advanced HTTP filtering features such as HTTP policies, identity-based policies, device posture checks, or Browser Isolation.

### 1. Create a Cloudflare for Teams account.

The Cloudflare for Teams Dashboard will be your go-to place to check device connectivity data, as well as create Secure Web Gateway and Zero Trust policies for your organization. 

As you complete the [Teams onboarding](/setup), you will be asked to create a [team name](/glossary#team-name) for your organization. You will need the team name when you deploy the WARP client on your devices; it will allow your users to connect to your organization's Cloudflare for Teams instance.

### 2. Set up a login method.

Configure [One-time PIN](/identity/one-time-pin) or connect a [third-party identity provider](/identity/idp-integration) on the Teams Dashboard. This is the login method your users will utilize when authenticating to add a new device to your Teams setup.

### 3. Next, define [device enrollment permissions](/connections/connect-devices/warp/warp-settings#device-enrollment-permissions).

Create device enrollment rules to define which users in your organization should be able to connect devices to your organization's Teams setup. As you create your rule, you will be asked to select which login method you would like users to authenticate with.

### 4. Add a [location](/connections/connect-networks/locations) to Gateway. 

Add your office as a location on Gateway. Gateway will assign a [DoH subdomain](/glossary#doh-subdomain) to that location — you will then need this value when deploying the WARP client to your devices.

### 5. Download and deploy the WARP client to your devices.

Choose one of the [different ways](/connections/connect-devices/warp/deployment) to deploy the WARP client, depending on what works best for your organization.
