---
hidden: true
title: Use cases
order: 100
---

# What you can do with Argo Tunnel

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>

## Replace your corporate VPN

You can use a combination of Tunnel and Access to lock down an internal application without the use of a VPN.

First, before creating a tunnel to your application, [create an Access policy](https://developers.cloudflare.com/access/setting-up-access/) for the application. You can do this in the [Access tab of the Cloudflare dashboard](https://dash.cloudflare.com/?zone=access).

Now you can start a tunnel on the web server to expose the application through the internet behind Cloudflare. The Access policy you created in the previous step will require any visitors to authenticate before they reach the application. Because the server is running behind Tunnel and all ports are closed on your server, you are guaranteed that any visitors to the application have passed through Cloudflare and authenticated with Access.

Lastly, if your application runs legacy programs, you can block common exploits by turning on the Web Application Firewall in the [Firewall tab of the Cloudflare dashboard](https://dash.cloudflare.com/?zone=firewall).

## Exposing a local development environment from your computer

While you are developing applications it can be useful to share a link with collaborators or for testing on other screens and devices.

To do this, [download](../downloads/) the Mac, Linux or Windows version of Tunnel and start a tunnel from your laptop pointed at the local address of your development environment.

## Webhooks in development environments

When developing an application that uses webhooks (such as building an app for [GitHub](https://developer.github.com/webhooks/), [Slack](https://api.slack.com/incoming-webhooks) or [Stripe](https://stripe.com/docs/webhooks)) you can use Tunnel to run a webhook endpoint from your local environment. Once you run Tunnel on your computer, Tunnel will expose a public URL that you can set as your webhook endpoint. Tunnel will forward all requests to that endpoint to your local development environment.
