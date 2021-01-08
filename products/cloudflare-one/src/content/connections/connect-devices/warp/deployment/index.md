---
order: 1
---

# Deployment

The Cloudflare WARP client can be deployed via a device management platform like JAMF or InTune or through end user self-enrollment.

To get started, you'll first need to create a **device enrollment policy** in your Teams dashboard. The device enrollment policy will determine who can enroll a device into your organization. To do so:

1. In your [Teams dashboard](https://dash.teams.cloudflare.com/), navigate to **My Teams** > **Devices**.

1. Under **Device Settings**, create a [device enrollment policy](connections/connect-devices/warp/device-enrollment) to define who can connect a device to your organization.

1. Once your device enrollment policy is set up, configure [filtering policies](/policies/filtering) for your organization. If you are configuring [HTTP policies](/policies/filtering/http-policies), make sure to deploy the [root certificate](/connections/connect-devices/install-cloudflare-cert.md) to your devices. 

1. As a last step, verify your devices meet the WARP [system requirements](../system-requirements) for installation.

You're now ready to follow the deployment instructions for your devices.

<DirectoryListing path="/connections/warp/deployment"/>