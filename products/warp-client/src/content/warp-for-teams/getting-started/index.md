---
order: 2
---

# Getting started

 <Aside>

 Make sure [Cloudflare Access](https://developers.cloudflare.com/access/getting-started/access-setup) and [Cloudflare Gateway](https://developers.cloudflare.com/gateway/getting-started/onboarding-gateway/) are set up. 

 </Aside>

To get started with the WARP Client, you'll first need to create a **device enrollment policy** in your Teams dashboard. To do so:

1. In your [Teams dashboard](http://dash.teams.cloudflare.com/), navigate to **My Teams** > **Devices**.
1. Under **Device Settings**, create a device enrollment [policy](https://developers.cloudflare.com/access/getting-started/policies) to define who can connect a device to your organization.

Once your device enrollment policy is set up, configure [Gateway policies](https://developers.cloudflare.com/gateway/reference/policy) for your organization. If you are configuring <a href="https://developers.cloudflare.com/gateway/getting-started/configuring-http-policy">HTTP policies</a>, make sure to deploy the <a href="https://developers.cloudflare.com/gateway/connecting-to-gateway/install-cloudflare-cert">root certificate</a> to your devices. 

As a last step, verify your devices meet the WARP [system requirements](/requirements) for installation.

You're now ready to follow the deployment instructions for your devices:

* [Windows](/teams/Windows-Teams/)
* [macOS](/teams/macOS-Teams/)
* [iOS](/teams/iOS-Teams/)
* [Android](/teams/android-Teams/)