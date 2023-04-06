---
pcx_content_type: how-to
title: First-time setup
weight: 1
meta:
  title: Set up WARP for your organization
---

# Set up WARP for your organization

This is a high-level, step-by-step walkthrough on how to get started with WARP in your organization. From downloading the client to sending the first queries to Cloudflare's edge, here is a guide on how to do it for the first time.

## Gateway with WARP (default)

This mode enables our complete suite of [device security features](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-modes).

### 1. Create a Cloudflare Zero Trust account.

The [Cloudflare Zero Trust home](https://one.dash.cloudflare.com/) will be your go-to place to check device connectivity data, as well as create Secure Web Gateway and Zero Trust policies for your organization.

As you complete the [Cloudflare Zero Trust onboarding](/cloudflare-one/setup/), you will be asked to create a [team name](/cloudflare-one/glossary/#team-name) for your organization. You will need the team name when you deploy the WARP client on your devices; it will allow your users to connect to your organization's Cloudflare Zero Trust instance.

### 2. Set up a login method.

Configure [One-time PIN](/cloudflare-one/identity/one-time-pin/) or connect a [third-party identity provider](/cloudflare-one/identity/idp-integration/) in Zero Trust. This is the login method your users will utilize when authenticating to add a new device to your Cloudflare Zero Trust setup.

### 3. Next, define device enrollment permissions.

Create [device enrollment rules](/cloudflare-one/connections/connect-devices/warp/deployment/manual-deployment/#set-device-enrollment-permissions) to define which users in your organization should be able to connect devices to your organization's Cloudflare Zero Trust setup. As you create your rule, you will be asked to select which login method you would like users to authenticate with.

### 4. Install the Cloudflare root certificate on your devices.

Advanced security features including HTTP traffic inspection require users to install and trust the [Cloudflare root certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/) on their machine or device. If you are installing certificates manually on all your devices, these steps will need to be performed on each new device that is to be subject to HTTP filtering.

### 5. Download and deploy the WARP client to your devices.

Choose one of the [different ways](/cloudflare-one/connections/connect-devices/warp/deployment/) to deploy the WARP client, depending on what works best for your organization.

### 6. Log in to your organization's Cloudflare Zero Trust instance from your devices.

Once the WARP client is installed on the device, [log in to your Zero Trust organization](/cloudflare-one/connections/connect-devices/warp/deployment/manual-deployment/). If you have already set up an identity provider in Cloudflare Access, the user will be prompted to authenticate using this method. If you have not set up an identity provider, the user can authenticate with a [one-time pin](/cloudflare-one/identity/one-time-pin/) which is enabled by default.

Next, build [Secure Web Gateway policies](/cloudflare-one/policies/filtering/) to filter DNS, HTTP, and Network traffic on your devices.

## Gateway with DoH

This mode is best suited for organizations that only want to apply DNS filtering to outbound traffic from their company devices. It does not enable advanced HTTP filtering features such as HTTP policies, identity-based policies, device posture checks, or Browser Isolation.

### 1. Create a Cloudflare Zero Trust account.

Zero Trust will be your go-to place to check device connectivity data, as well as create Secure Web Gateway and Zero Trust policies for your organization.

As you complete the [Cloudflare Zero Trust onboarding](/cloudflare-one/setup/), you will be asked to create a [team name](/cloudflare-one/glossary/#team-name) for your organization. You will need the team name when you deploy the WARP client on your devices; it will allow your users to connect to your organization's Cloudflare Zero Trust instance.

### 2. Set up a login method.

Configure [One-time PIN](/cloudflare-one/identity/one-time-pin/) or connect a [third-party identity provider](/cloudflare-one/identity/idp-integration/) in Zero Trust. This is the login method your users will utilize when authenticating to add a new device to your Cloudflare Zero Trust setup.

### 3. Next, define device enrollment permissions.

Create [device enrollment rules](/cloudflare-one/connections/connect-devices/warp/deployment/manual-deployment/#set-device-enrollment-permissions) to define which users in your organization should be able to connect devices to your organization's Cloudflare Zero Trust setup. As you create your rule, you will be asked to select which login method you would like users to authenticate with.

### 4. (optional) Add a DNS location to Gateway.

The WARP client will direct DoH queries to a default DNS endpoint when enrolled to your Zero Trust organization. If you need to direct these queries to a separate DNS endpoint, [add a DNS location](/cloudflare-one/connections/connect-devices/agentless/dns/locations/) to Gateway. Gateway will assign a [DoH subdomain](/cloudflare-one/glossary/#doh-subdomain) to that location, which you can add when deploying the WARP client to your devices.

### 5. Download and deploy the WARP client to your devices.

Choose one of the [different ways](/cloudflare-one/connections/connect-devices/warp/deployment/) to deploy the WARP client, depending on what works best for your organization.

Next, create [DNS policies](/cloudflare-one/policies/filtering/dns-policies/) to control how DNS queries from your devices get resolved.
