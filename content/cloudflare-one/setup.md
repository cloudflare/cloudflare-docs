---
pcx_content_type: get-started
title: Get started
weight: 2
---

# Get started

This guide covers the recommended steps to start securing your users and devices with Cloudflare Zero Trust.

{{<Aside type="note">}}
To get started with a specific use case, refer to our [learning paths](/cloudflare-one/learning-paths/).
{{</Aside>}}

## Prerequisites

Sign up for a [Cloudflare account](https://dash.cloudflare.com/sign-up).

## Create a Zero Trust organization

{{<render file=_choose-team-name.md productFolder="cloudflare-one">}}

Welcome to Cloudflare Zero Trust! You can now explore a list of one-click actions we have designed to help you kickstart your Zero Trust experience.

## Install the WARP client on your devices

If you want to enable security features such as Browser Isolation, HTTP filtering, AV scanning, and device posture, or connect networks to Cloudflare, here are the next steps you need to take:

1. **Set up a login method.** Configure [One-time PIN](/cloudflare-one/identity/one-time-pin/) or connect a [third-party identity provider](/cloudflare-one/identity/idp-integration/) in Zero Trust. This is the login method your users will utilize when authenticating to add a new device to your Zero Trust setup.

2. **Next, define [device enrollment permissions](/cloudflare-one/connections/connect-devices/warp/deployment/device-enrollment/)**. Create device enrollment rules to define which users in your organization should be able to connect devices to your organization's Zero Trust setup. As you create your rule, you will be asked to select which login method you would like users to authenticate with.

3. **Install the [Cloudflare root certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/) on your devices.** Advanced security features including HTTP traffic inspection require users to install and trust the Cloudflare root certificate on their machine or device. If you are installing certificates manually on all your devices, these steps will need to be performed on each new device that is to be subject to HTTP filtering.

4. **Download and deploy the WARP client to your devices**. Choose one of the [different ways](/cloudflare-one/connections/connect-devices/warp/deployment/) to deploy the WARP client, depending on what works best for your organization.

5. **Log in to your organization's Cloudflare Zero Trust instance from your devices**. On your device, go to the Settings section in the WARP client and insert your organization's team name.

Your devices are now connected to Cloudflare Zero Trust through the WARP client. You can go to **My Team** > **Devices** to find a list of your enrolled devices, when they were last seen, and the WARP client version they are running.

Next, [enforce security policies](/cloudflare-one/policies/) on your traffic and access requests.
