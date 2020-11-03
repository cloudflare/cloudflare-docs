---
order: 1
---

# TryCloudflare

TryCloudflare is a tool that allows developers to experiment with Argo Tunnel without adding a site to Cloudflare's DNS.

TryCloudflare will launch a process that generates a random subdomain on `trycloudflare.com`. Requests to that subdomain will be proxied through the Cloudflare network to your web server running on localhost.

## Using TryCloudflare
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

## Example use cases for TryCloudflare
With TryCloudflare, you can:
* Create a web server for a project on your laptop that you want to share with others on different networks.

* Test browser compatibility for a new site by creating a free Argo Tunnel and testing the link in different browsers.

* Run speed tests from different regions by using a tool like Pingdom or WebPageTest to connect to the randomly-generated subdomain created by TryCloudflare

## Why does Cloudflare provide this service for free?

<Aside>

Free tunnels are meant to be used for testing and development, not for deploying a production website. We don’t guarantee any SLA or uptime of TryCloudflare.
</Aside>

* With TryCloudflare, we hope you experience the speed and security improvements of Argo Tunnel (and Argo Smart Routing) and decide to add it to your production sites.

* With TryCloudflare, we hope to make more and more of our products available for trial without you necessarily owning a domain, or having to set that domain's DNS to Cloudflare's nameserver.

* With TryCloudflare, we plan to test new Argo Tunnel features and improvements. This provides us with a group of connections to test before we deploy to production customers.


## Legal
Your installation of `cloudflared` software constitutes a symbol of your signature indicating that you accept the terms of the [Cloudflare License](/license/), [Terms](https://www.cloudflare.com/terms/) and [Privacy Policy](https://www.cloudflare.com/privacypolicy/).
