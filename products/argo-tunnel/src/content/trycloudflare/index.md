---
order: 100
hidden: true
---

# TryCloudflare

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>

Developers can use the TryCloudflare tool to experiment with Argo Tunnel without adding a site to Cloudflare's DNS. TryCloudflare will launch a process that generates a random subdomain on `trycloudflare.com`. Requests to that subdomain will be proxied through the Cloudflare network to your web server running on localhost.

### Using TryCloudflare
1. Follow the instructions [here](/getting-started/installation) to install `cloudflared`. If you have an older copy, update to 2019.4.0 or later.
2. Launch a web server that is available over localhost to `cloudflared`.
3. Run the following terminal command to start a free tunnel.

```sh
$ cloudflared tunnel
```

The command above will default to port 8080; you can specify an alternate port with the --url flag.

```sh
$ cloudflared tunnel --url http://localhost:7000
```

`cloudflared` will generate a random subdomain when connecting to the Cloudflare network and print it in the terminal for you to use and share. The output will serve traffic from the server on your local machine to the public internet, using Cloudflare's Argo Smart Routing, at a public URL.

### FAQ

#### What are some example use cases for TryCloudflare?
* Create a web server for a project on your laptop that you want to share with others on different networks
* Test browser compatibility for a new site by creating a free Argo Tunnel and testing the link in different browsers
* Run speed tests from different regions by using a tool like Pingdom or WebPageTest to connect to the randomly-generated subdomain created by TryCloudflare

#### Why does Cloudflare provide this service for free?
* We want more users to experience the speed and security improvements of Argo Tunnel (and Argo Smart Routing). We hope you test it with TryCloudflare and decide to add it to your production sites.
* Cloudflare’s features historically require you to own a domain, set that domain’s DNS to Cloudflare’s nameservers, and configure its DNS records before you can begin to use any services. We hope to make more and more of our products available to trial without that burden.
* We don’t guarantee any SLA or uptime of TryCloudflare - we plan to test new Argo Tunnel features and improvements on these free tunnels. This provides us with a group of connections to test before we deploy to production customers. Free tunnels are meant to be used for testing and development, not for deploying a production website.

#### Legal
Your installation of cloudflared software constitutes a symbol of your signature indicating that you accept the terms of the [Cloudflare License](https://developers.cloudflare.com/argo-tunnel/license/), [Terms](https://www.cloudflare.com/terms/) and [Privacy Policy](https://www.cloudflare.com/privacypolicy/).
