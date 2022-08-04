---
pcx_content_type: how-to
title: Add a custom domain to a branch
---

# Add a custom domain to a branch

In this guide, you will learn how to add a custom domain (`staging.example.com`) that will point to a specific branch (`staging`) on your Pages project.

This will allow you to have a custom domain that will always show the latest build for a specific branch on your Pages project.

{{<Aside type= "note">}}

Currently, this setup is only supported when using Cloudflare DNS.

If you attempt to follow this guide using an external DNS provider, your custom alias will be sent to the production branch of your Pages project.

{{</Aside>}}

First, make sure that you have a successful deployment on the branch you would like to set up a custom domain for.

Next, add a custom domain under your Pages project for your desired custom domain, for example, `staging.example.com`.

![Follow the instructions below to access the custom domains overview in the Pages dashboard.](/pages/how-to/media/pages_custom_domain-1.png)

To do this:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2. In Account Home, go to **Pages**.
3. Select your project.
4. Select **Custom domains** > **Setup a custom domain**.
5. Input the domain you would like to use, such as `staging.example.com`
6. Select **Continue** > **Activate domain**

![After selecting your custom domain, you will be asked to activate it.](/pages/how-to/media/pages_custom_domain-2.png)

After activating your custom domain, go to [DNS](https://dash.cloudflare.com/?to=/:account/:zone/dns) for the `example.com` zone and find the `CNAME` record with the name `staging` and change the target to include your branch alias.

In this instance, change `your-project.pages.dev` to `staging.your-project.pages.dev`.

![After activating your custom domain, change the CNAME target to include your branch name.](/pages/how-to/media/pages_custom_domain-3.png)

Now the `staging` branch of your Pages project will be available on `staging.example.com`.