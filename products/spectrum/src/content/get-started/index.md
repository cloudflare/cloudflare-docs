---
order: 
pcx-content-type: tutorial
---

# Get started

Spectrum is available on all paid plans. Pro and Business support selected protocols only, whereas Enterprise supports all TCP and UDP based traffic.

If you have feedback, [let us know](https://community.cloudflare.com/c/security/spectrum).

## Add your application

1. Log in to the Cloudflare dashboard.
1. Click **Spectrum**.
1. Click **Create an Application**. If this is your first time using Spectrum, the **Create an Application** modal appears.
1. Under **Domain**, enter the domain that will use Spectrum.
1. Under **Edge Port**, enter the port Cloudflare should use your application.
1. Under **Origin**, enter your application's origin IP and port.
1. If your application requires the client IP and supports [Proxy Protocol](https://www.haproxy.com/blog/haproxy/proxy-protocol/), enable **Proxy Protocols**. Proxy Protocol is a method for a proxy like Cloudflare to send the client IP to the origin application.
1. Click **Add**.

You can now proxy traffic through Cloudflare without additional configuration. As you run traffic through Cloudflare, you will see the last minute of traffic from **Spectrum** in the dashboard.

## View traffic 

To view traffic running through Cloudflare, click **Spectrum** from your dashboard.
