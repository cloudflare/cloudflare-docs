---
pcx_content_type: concept
title: Quick Tunnels
weight: 5
---

# Quick Tunnels

Developers can use the TryCloudflare tool to experiment with Cloudflare Tunnel without adding a site to Cloudflare's DNS. TryCloudflare will launch a process that generates a random subdomain on `trycloudflare.com`. Requests to that subdomain will be proxied through the Cloudflare network to your web server running on localhost.

## Use TryCloudflare

1.  Follow [these instructions](/cloudflare-one/connections/connect-networks/downloads/) to install `cloudflared`. If you have an older copy, update to 2020.5.1 or later.
1.  Launch a web server that is available over localhost to `cloudflared`.
1.  Run the following terminal command to start a free tunnel.

```sh
$ cloudflared tunnel --url http://localhost:8080
```

`cloudflared` will generate a random subdomain when connecting to the Cloudflare network and print it in the terminal for you to use and share. The output will serve traffic from the server on your local machine to the public Internet, using Cloudflare's Argo Smart Routing, at a public URL.

{{<Aside type="note">}}
TryCloudflare quick tunnels are currently not supported if a `config.yaml` configuration file is present in the `.cloudflared` directory. It may be necessary to rename that file temporarily to use the feature.
{{</Aside>}}

## FAQ

### What are some example use cases for TryCloudflare?

- Create a web server for a project on your laptop that you want to share with others on different networks
- Test browser compatibility for a new site by creating a free Tunnel and testing the link in different browsers
- Run speed tests from different regions by using a tool like Pingdom or WebPageTest to connect to the randomly-generated subdomain created by TryCloudflare

### Why does Cloudflare provide this service for free?

- We want more users to experience the speed and security improvements of Cloudflare Tunnel (and Argo Smart Routing). We hope you test it with TryCloudflare and decide to add it to your production sites.
- Cloudflare’s features historically require you to own a domain, set that domain’s DNS to Cloudflare’s nameservers, and configure its DNS records before you can begin to use any services. We hope to make more and more of our products available to trial without that burden.
- We don’t guarantee any SLA or uptime of TryCloudflare - we plan to test new Cloudflare Tunnel features and improvements on these free tunnels. This provides us with a group of connections to test before we deploy to production customers. Free tunnels are meant to be used for testing and development, not for deploying a production website.

### Limits

- Quick Tunnels are subject to a limit on the number of concurrent requests that can be proxied at any point in time. Currently, this limit is 200 in-flight requests. If a Quick Tunnel hits this limit the HTTP response returned will have a 429 status code.
This limit only applies to QuickTunnels and users see this limit being hit should instead create a Cloudflare account and configure a Cloudflare Tunnel.

### Legal

Your installation of cloudflared software constitutes a symbol of your signature indicating that you accept the terms of the [Cloudflare License](/cloudflare-one/connections/connect-networks/downloads/license/), [Terms](https://www.cloudflare.com/terms/) and [Privacy Policy](https://www.cloudflare.com/privacypolicy/).
