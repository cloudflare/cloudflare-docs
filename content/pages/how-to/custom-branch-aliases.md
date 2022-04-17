---
pcx-content-type: how-to
title: Adding custom branch aliases
---

# Adding custom branch aliases

In this tutorial, you will learn how to add a custom branch alias (`staging.example.com`) that will point to a specific branch (`staging`) on your pages project.

{{<Aside type= "note">}}

At the moment, this setup is only supported when using Cloudflare DNS.

If you attempt to follow this tutorial using an external DNS provider, your custom alias will be sent to the production branch of the Pages project.

{{</Aside>}}

Firstly, make sure that you've made a commit on the branch you'd like to set up an alias for - this will prompt a build in pages.

Next, add a custom domain under your Pages project for `staging.example.com`.

![Pages Custom Domains Overview](../media/pages_custom_domain-1.png)

To do this:

1.  Go to **Pages** [in the dashboard](https://dash.cloudflare.com/?to=/:account/pages/).
2.  Select your project.
3.  Click on **Custom domains** and then **Setup a custom domain**
4.  Input the domain you'd like to use as the custom branch alias, such as `staging.example.com`
5.  Click on **Continue** and then **Activate domain**

![Pages Custom Domains Activation](../media/pages_custom_domain-2.png)

After doing this, you'll want to go into the [DNS settings](https://dash.cloudflare.com/?to=/:account/:zone/dns) for the
`example.com` zone and change the `staging` record's value to include our branch alias.

In this instance, we'll want to change `your-project.pages.dev` to `staging.your-project.pages.dev`.

Now the `staging` branch of your Pages project will be available on `staging.example.com`.