---
order: 4
---

# Connecting to Gateway

You can secure your internet-bound traffic by connecting to Gateway in two ways:

1. [With the Cloudflare WARP client](/connecting-to-gateway/with-client). You can download the latest version for your operating system, and configure the client to send DNS queries to Gateway for policy enforcement. If your subscription supports HTTP traffic filtering, you can enroll users and devices in your Gateway organization through the client, and configure L7 firewall rules to enforce HTTP policies in the L7 cloud firewall.

2. [Without the Cloudflare WARP client](/connecting-to-gateway/without-client). Cloudflare Gateway supports a variety of client configurations and operating systems, as well as DNS over HTTPS. You can configure your native operating system or browser to use Cloudflare Gateway as your upstream recursive resolver for DNS policy enforcement.
