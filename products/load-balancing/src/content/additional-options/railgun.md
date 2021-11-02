---
order: 1
pcx-content-type: how-to
title: Railgun
---

# Use a load balancer with Railgun

[**Railgun**](https://developers.cloudflare.com/railgun) is a web proxy system that allows dynamic content for a website — such as news sites or personalized content — to be cached while also allowing changes to the site to take effect almost instantly. Railgun is currently available to customers with a Business or Enterprise plan or via one of Cloudflare’s Optimised Partners.

By adding a load balancer to Railgun, you speed up connections between Cloudflare data centers and DNS origin servers so that uncacheable requests have minimal latency.

<Aside type="note">

For additional guidance and diagrams, refer to [Best practices for Railgun with a Load Balancer](https://support.cloudflare.com/hc/articles/200168346).

</Aside>

## Set up Railgun in front of a load balancer

We recommend that you put Railgun in front of your load balancer so the load balancer can handle HTTP connections normally. This option provides a much simpler setup because it is difficult to load balancing long-lived TLS connections between the sender and listener.

Use the same load balancer settings as if Railgun were not in place. For example, enable HTTP keep-alive connections and set them to a 90-second timeout, since Railgun is working as an HTTP reverse proxy.

## Set up Railgun behind a load balancer

Though Railgun's optimal placing is in front of your load balancer, you can also put Railgun behind a load balancer.

Observe the following guidelines to avoid interruptions with site traffic:

1. Use the `railgun-nat.conf` configuration file to set the internal addresses of the hosts Railgun will be optimizing (`localhost:8080`, for example). This is important to avoid looping the request outbound to the internet and back to the load balancer only to be forwarded to the origin.
1. Ensure no firewall rules are in place that will interfere with traffic between the listener and the origin server.
1. Ensure port 2408 is open and passed through the load balancer so that it does not interfere with the TLS connection between the listener and sender.
