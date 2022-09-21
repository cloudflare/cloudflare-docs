---
pcx_content_type: tutorial
title: Railgun and load balancers
weight: 6
meta:
    title: Best practices for Railgun and a Load Balancer
---

# Best practices for Railgun and a load balancer

If you are looking to use Cloudflare Railgun to optimize the load times of dynamic (non-cached) content and you currently use a load balancer, a firewall, or a NAT scheme in front of your application, review the following configurations and best practices associated with each setup.

## Single origin, multiple web servers, single Railgun listener

![Diagram describing how a single Railgun client should be placed in front of the load balancer, firewall or NAT.](/railgun/static/single-railgun-listener.png)

This setup is Cloudlfare's recommended configuration.

Cloudflare strongly encourages the installation of the Railgun client (`rg-listener`) "in front of" the load balancer/firewall/NAT scheme, as shown in illustration above.

When activation the Railgun client, you must specify in the `railgun.conf` file, for the `activation.railgun_host` setting, the public IP address of the server it is installed on (`3.3.3.3` in the example). Thus, all requests that cannot be served from Cloudflare's edge servers will be forwarded to `3.3.3.3` via `rg-sender`, instead of your origin (`1.1.1.1` in the example).

Each request received by the server at `3.3.3.3` on port `2408` will then be processed by the `rg-listener` service. `rg-listener` will check the process's host header and forward it (by default) to the IP address of your origin server's hostname, according to your Cloudflare DNS configuration. `rg-listener` sends this request with the HTTP header `CF-ORIGIN-IP`. The `rg-listener` strips out this header when forwarding requests to your origin over HTTPS.

Railgun keeps a persistent and encrypted connection open on port `2408`. This is why Cloudflare recommends this setup.

Placing Railgun in front of other network equipment:

- Allows load balancers to correctly distribute web requests to web servers in the same way as they would without Railgun being used for the domain.
- Allows a firewall to analyze the unencrypted traffic for threats in the same way as it would without Railgun being used for the domain.
- Allows a NAT device to handle web requests in the same way as it would without Railgun being used for the domain.

If connectivity to the `rg-listener` cannot be established from the Cloudflare edge servers, Cloudflare will automatically fallback to sending the request directly to your origin (`1.1.1.1`) over HTTP 1.1. Dynamic content compression will be disabled.

## Single origin, multiple web servers, multiple Railgun listeners

![It is also possible to have multiple Railgun listeners behind the load balancer, and have Railgun accelerate dynamic content.](/railgun/static/multiple-railgun-listeners.png)

It is also possible to put multiple `rg-listeners` behind the load balancer and have Railgun accelerate dynamic content. This setup provides additional fault tolerance for the Railgun service.

For this configuration to work you need to:

* Create a single Railgun server in your Cloudflare dashboard
* Install the `rg-listener` service on all your web servers (from the example above, `2.2.2.1`, `2.2.2.2`, `2.2.2.3`) and activate them all using the same Railgun activation token.

Within each of the `railgun.conf` files, you will also need to specify the public IP address of the load balancer (`1.1.1.1`) as the `activation.railgun_host`.

Cloudflare advises experienced systems administrators and engineers to use this setup when the benefits of maintaining content compression when running in a degraded state (due to server or `rg-listener` failure) is important. However, running Railgun behind a load balancer/firewall/NAT could:

- Add complexity to the network device configuration, as traffic inbound on port `2408` needs to be distributed across the `rg-listeners`.
- Prevent a load balancer from distributing requests correctly, as all requests will be routed from the load balancer to the Railgun listeners in layer 4 (TCP) mode. The traffic can not be decrypted until it reaches the servers. 
- Prevent the firewall from analyzing incoming traffic, as all inbound traffic from Cloudflare is encrypted with the Railgun's certificate.
- Mean the web servers need more resources to accommodate running the Railgun listener clients.

Also, note that the server firewalls will need to be modified to allow traffic inbound on port `2408` as well as ensure that connectivity with an instance of Memcached can be established.

Having Railgun installed behind a load balancer requires that the `railgun-nat.conf` file (found in the Railgun directory) is modified to ensure that each of the `rg-listeners` knows where to forward requests to. By default, each client will forward the request to the `CF-ORIGIN-IP` (`1.1.1.1`) which may work, but it is more likely you will want the request to be processed by the web server on the same server as the `rg-listener` that received the request.

![Example of how to configure the railgun-nat config file.](/railgun/static/railgun-nat.png)

The `railgun-nat.conf` file overrides the default behavior. You can either add each of your hostnames with an appropriate IP address (in our example, the localhost IP) or simply uncomment `default=127.0.0.1`. The default value here tells `rg-listener` that any request for a hostname not defined in the file should be forwarded to this IP.

It is also recommended that a single centralized Memcached instance is used by all of the servers running `rg-listener` - ideally in an [high-availability clustered configuration](https://en.wikipedia.org/wiki/High-availability_cluster) for maximum uptime. Many hosting providers offer their own high-availability in-memory caching services that support Memcached, so you do not have to build and maintain your own cluster. This will help to improve cache hit rates when `rg-listener` queries for a previously compressed version of an object to create deltas from.