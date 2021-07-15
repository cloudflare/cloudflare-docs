---
order: 1
pcx-content-type: how-to
---

# Deployment

The Cloudflare WARP client can be deployed via a device management platform like JAMF or InTune or through end user self-enrollment.

To get started, create a **device enrollment policy** in your Teams dashboard. The device enrollment policy will determine who can enroll a device into your organization. To do so:

1. Set up a [team domain](/glossary#team-domain). You can find your team domain under **Settings > General > Team domain**.

1. On your [Teams dashboard](https://dash.teams.cloudflare.com/), navigate to **My Team** > **Devices**.

1. Under **Device enrollment**, create a [device enrollment policy](/connections/connect-devices/warp/device-enrollment) to define who can connect a device to your organization.

1. Once your device enrollment policy is set up, configure [Secure Web Gateway policies](/policies/filtering) for your organization. If you are configuring [HTTP policies](/policies/filtering/http-policies), make sure to deploy the [root certificate](/connections/connect-devices/warp/install-cloudflare-cert) to your devices. 

1. As a last step, verify your devices meet the WARP [system requirements](../download-warp) for installation.

You're now ready to follow the deployment instructions for your devices.

<DirectoryListing path="/connections/warp/deployment"/>
