---
order: 1
---

# Getting started

<Aside>

Spectrum is available on all paid plans. Pro and Business support selected protocols only, whereas Enterprise supports all TCP and UDP based traffic.

If you have feedback, let us know: [community.cloudflare.com/spectrum](https://community.cloudflare.com/c/security/spectrum). Steps to get started are below.
</Aside>

## Step One: Add your application

Login to the Cloudflare dashboard. You will now have a new app in the nav bar called Spectrum. Click on it.

Click on the button at the top right that says ‘Create an Application’

In the first field, enter the domain the application will be on.

In the field titled Edge Port, type in which port Cloudflare should listen on for your application.

In the next row, enter the origin IP and port of your application.

Proxy Protocol is a method for a proxy like Cloudflare to send the client IP to the origin application. Enable it if your application requires the true client IP and supports [Proxy Protocol.](https://www.haproxy.com/blog/haproxy/proxy-protocol/)

Now click Add

## Step Two: Done!

You’re now ready to proxy traffic through Cloudflare, no further configuration necessary. As you run traffic through Cloudflare, you will see the last minute of traffic in the Spectrum app in the dashboard.
