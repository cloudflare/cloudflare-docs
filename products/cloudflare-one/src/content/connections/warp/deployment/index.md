---
order: 1
---

# Getting started

 <Aside>

 Before you start, make sure **Cloudflare Access** and **Cloudflare Gateway** are set up. 

 </Aside>

To get started with the WARP client, you'll first need to create a **device enrollment policy** in your Teams dashboard. To do so:

1. In your [Teams dashboard](https://dash.teams.cloudflare.com/), navigate to **My Teams** > **Devices**.
1. Under **Device Settings**, create a [device enrollment policy](/identity/devices/device-enrollment) to define who can connect a device to your organization.

Once your device enrollment policy is set up, configure [filtering policies](/policies/filtering) for your organization. If you are configuring [HTTP policies](/policies/filtering/http-policies), make sure to deploy the [root certificate](/connections/connecting-to-gateway/install-cloudflare-cert) to your devices. 

As a last step, verify your devices meet the WARP [system requirements](../system-requirements) for installation.

You're now ready to follow the deployment instructions for your devices:

<DirectoryListing path="/connections/warp/deployment"/>