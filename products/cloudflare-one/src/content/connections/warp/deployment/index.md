---
order: 1
---

# Getting started

 <Aside>

 Before you start, make sure **Cloudflare Access** and **Cloudflare Gateway** are set up. 

 </Aside>

To get started with the WARP Client, you'll first need to create a **device enrollment policy** in your Teams dashboard. To do so:

1. In your [Teams dashboard](https://dash.teams.cloudflare.com/), navigate to **My Teams** > **Devices**.
1. Under **Device Settings**, create a device enrollment [policy](https://developers.cloudflare.com/access/getting-started/policies) to define who can connect a device to your organization.

Once your device enrollment policy is set up, configure [Gateway policies](https://developers.cloudflare.com/gateway/reference/policy) for your organization. If you are configuring <a href="https://developers.cloudflare.com/gateway/getting-started/configuring-http-policy">HTTP policies</a>, make sure to deploy the <a href="https://developers.cloudflare.com/gateway/connecting-to-gateway/install-cloudflare-cert">root certificate</a> to your devices. 

As a last step, verify your devices meet the WARP [system requirements](../system-requirements) for installation.

You're now ready to follow the deployment instructions for your devices:

<DirectoryListing path="/connections/warp/deployment"/>